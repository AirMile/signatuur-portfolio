# Session Tracking voor Command Workflows

> **Plan Versie:** 4.0 (na recommendations review)
> **Geschatte effort:** 3-4 dagen
> **Confidence:** 9/10

---

## Probleem

Wanneer een chat eindigt (door compact of door de sessie te sluiten) tijdens een command workflow:
- Gaat de voortgang verloren
- Weet Claude niet waar je was gebleven
- Moet je context opnieuw opbouwen of helemaal opnieuw beginnen

**Scope:** Alle commands met FASE-gebaseerde workflows.

---

## Oplossing

Een persistent session tracking systeem dat:
1. Automatisch workflow-voortgang bijhoudt in markdown files
2. Bij command start checkt of er lopende sessies zijn
3. Gebruiker laat kiezen: doorgaan, nieuwe starten, of bekijk alle
4. Context en beslissingen bewaart voor resume
5. Sessies verwijdert bij completion (geen archivering)

---

## Architectuur

### File Structuur

```
.claude/
├── sessions/
│   ├── 1-plan/
│   │   └── current.md
│   ├── 2-code/
│   │   └── current.md
│   ├── debug/
│   │   └── current.md
│   └── ... (andere commands)
```

**Single session per command:** Eén `current.md` per command type.
**Voltooide sessies:** Direct verwijderd (geen archive).

---

### Session File Format (3 secties)

```markdown
# Session: {command-name}

## Metadata
- **Started**: {YYYY-MM-DD HH:mm} (via Time MCP)
- **Last Updated**: {YYYY-MM-DD HH:mm} (via Time MCP)
- **Task Summary**: {one-line beschrijving}

## Current Position
- **FASE**: {nummer} - {naam}
- **Step**: {huidige stap}

## Context

### FASE 1: {fase-naam}
- {vrije tekst: bevindingen, beslissingen}
- {aangemaakte/gewijzigde files}

### FASE 2: {fase-naam}
- {vrije tekst per fase}
- ...

### FASE 3: {fase-naam}
(nog niet bereikt)
```

**Voorbeeld /debug sessie:**
```markdown
# Session: debug

## Metadata
- **Started**: 2025-12-29 14:30
- **Last Updated**: 2025-12-29 15:45
- **Task Summary**: Fix JWT expiry bug in auth

## Current Position
- **FASE**: 2 - Investigation
- **Step**: Analyzing middleware chain

## Context

### FASE 1: Problem Definition
- TypeError in auth.ts:42
- Login fails after JWT token expires
- User report: kan niet meer inloggen na 1 uur

### FASE 2: Investigation
- Onderzocht: middleware chain, token validation
- Beslissing: JWT refresh implementeren
- Files bekeken: src/auth.ts, src/middleware/jwt.ts
```

---

### Waarom deze 3 secties?

| # | Sectie | Doel |
|---|--------|------|
| 1 | **Metadata** | Wanneer gestart, wat is de taak |
| 2 | **Current Position** | FASE en stap - waar ben je |
| 3 | **Context** | FASE-secties met vrije tekst per fase |

**Resume Instructions vervalt:** De laatste FASE-sectie bevat al de recente context.

---

### Time MCP Gebruik

Voor alle timestamps wordt de Time MCP server gebruikt:

```markdown
## Timestamp ophalen

Gebruik: mcp__time__get_current_time met timezone "Europe/Amsterdam"

Resultaat: "2025-12-29T13:51:03+01:00"
Formatteren naar: "2025-12-29 13:51"
```

**Toepassing:**
- Started field: volledige timestamp
- Last Updated: bij elke session update

---

## Implementatie Plan

### Fase 1: Core Infrastructure (1-2 dagen)

#### 1.1 Session File Operations

```markdown
## Session File Operations

### Create Session
1. Check if `.claude/sessions/{command}/current.md` exists
   - If exists: ask user to resume or replace
2. Get current time via Time MCP
3. Write session file to `.claude/sessions/{command}/current.md`

### Read Session
1. Read file
2. Parse markdown sections
3. Validate required fields exist
4. Return session object

### Update Session
1. Read current content
2. Get current time via Time MCP
3. Update specific sections
4. Update "Last Updated" timestamp
5. Write file

### Delete Session
1. Remove file
```

#### 1.2 Schema Validation

```markdown
## Session Validation

### Required Fields
- Started: must exist
- Last Updated: must exist
- Task Summary: must be non-empty
- Current Position.FASE: must be number

### On Parse Error
1. Log error with filename
2. Mark session as CORRUPTED in memory
3. Don't show in session list
4. Offer cleanup option to user
```

---

### Fase 2: Inline Session Check (1 dag)

#### 2.1 Session Check (inline bij command start)

Elke command checkt automatisch bij start of er een sessie is. Geen aparte FASE 0 - dit gebeurt transparant voordat FASE 1 begint.

```markdown
## Inline Session Check

### Bij command start:
1. Check of `.claude/sessions/{command}/current.md` bestaat

**Indien GEEN sessie:**
- Maak nieuwe sessie aan
- Vraag user om taak beschrijving
- Start FASE 1

**Indien WEL sessie:**
Toon met AskUserQuestion:
```
Er is een openstaande sessie voor /{command}:
**{task-summary}** (FASE {X}, {days} dagen geleden)

1. Hervatten
2. Nieuwe sessie starten (verwijdert huidige)
```

### Bij resume:
1. Laad session file
2. Lees laatste FASE-sectie in Context voor recente info
3. Bij oude sessie (>7 dagen): toon warning
4. Spring naar opgeslagen FASE

### Bij nieuwe sessie (met bestaande):
1. Delete oude `current.md`
2. Maak nieuwe sessie aan
3. Start FASE 1
```

#### 2.2 Commands met Session Tracking

| Command | Session Folder |
|---------|----------------|
| /1-plan | `.claude/sessions/1-plan/` |
| /2-code | `.claude/sessions/2-code/` |
| /3-verify | `.claude/sessions/3-verify/` |
| /4-refine | `.claude/sessions/4-refine/` |
| /5-refactor | `.claude/sessions/5-refactor/` |
| /debug | `.claude/sessions/debug/` |
| /owasp | `.claude/sessions/owasp/` |
| /analyze | `.claude/sessions/analyze/` |
| /review-other | `.claude/sessions/review-other/` |
| /style | `.claude/sessions/style/` |

---

### Fase 3: Update Triggers (1 dag)

#### 3.1 Update Pattern

```markdown
## Update Trigger Pattern

### Bij elke FASE transitie (MANDATORY)
Na voltooien van FASE X, VOOR start van FASE X+1:

1. Get current time via Time MCP
2. Update Current Position:
   - FASE: {nieuwe fase nummer}
   - Step: "Starting FASE {X+1}"
3. Update Last Updated timestamp
4. Maak nieuwe FASE-sectie in Context:
   ```markdown
   ### FASE {X+1}: {naam}
   - {eerste bevindingen}
   ```

### Bij belangrijke gebeurtenissen
Wanneer iets relevants gebeurt (beslissing, finding, file change):

1. Append aan huidige FASE-sectie in Context
2. Update Last Updated timestamp
```

#### 3.2 Session Tracking Guide (centraal in CLAUDE.md)

**Eén sectie in CLAUDE.md voor alle commands.** Geen aparte instructies per SKILL.md.

```markdown
## Session Tracking

Session files: `.claude/sessions/{command}/current.md`

### Bij FASE transitie:
1. Update Current Position
2. Maak nieuwe FASE-sectie in Context

### Context schrijven (per FASE):
**WEL:**
- Specifieke taak/vraag
- Beslissingen + waarom
- Gevonden resultaten
- Files aangepast

**NIET:**
- Hoe de command werkt (staat in SKILL.md)
- FASE beschrijvingen (staat in SKILL.md)
```

---

### Fase 4: Completion & Cleanup (halve dag)

#### 4.1 Session Completion

```markdown
## Bij Command Completion

1. Delete session file:
   - Remove `.claude/sessions/{command}/current.md`

2. Toon completion message:
   "Session completed and cleaned up."
```

#### 4.2 Oude Sessions

```markdown
## Oude Session Handling

### Bij resume van oude sessie (>7 dagen):
Toon warning:

⚠️ Deze sessie is {X} dagen oud.
Context en beslissingen kunnen verouderd zijn.

Wil je:
1. Toch doorgaan (review context eerst)
2. Verwijderen en nieuwe sessie starten
```

#### 4.3 Corrupt Files (deferred)

Bij parse error: toon simpele error message en vraag user om `current.md` te verwijderen.
Geen speciale cleanup logic voor MVP.

---

## Update Moments Samenvatting

| Moment | Wat updaten |
|--------|-------------|
| Session start | Create `current.md`, Metadata (via Time MCP) |
| FASE transitie | Current Position, nieuwe FASE-sectie in Context, Last Updated |
| Belangrijke gebeurtenis | Append aan huidige FASE-sectie, Last Updated |
| Command voltooid | Delete `current.md` |

---

## Implementatie Volgorde

### Dag 1-2: Core Infrastructure
1. [ ] Session file operations (`current.md`)
   - [ ] Create, Read, Update, Delete
   - [ ] Time MCP integration
2. [ ] Inline session check prototype in /debug

### Dag 3: Uitrol
3. [ ] Inline session check naar alle commands
4. [ ] Session Tracking Guide toevoegen aan CLAUDE.md

### Dag 4: Completion & Testing
5. [ ] Completion & cleanup
6. [ ] Testing & documentation

---

## Success Criteria

- [ ] Session resume werkt betrouwbaar met single session (`current.md`)
- [ ] Time MCP wordt correct gebruikt voor timestamps
- [ ] Alle commands hebben inline session check
- [ ] CLAUDE.md heeft Session Tracking Guide
- [ ] Context bevat FASE-secties met vrije tekst per fase
- [ ] Oude sessions (>7 dagen) tonen warning

---

## Open Items (v2)

1. **Cross-command linking** - Sessions verbinden across pipeline
2. **Session analytics** - Hoe vaak wordt resume gebruikt?
3. **Multi-session** - Indien nodig later toevoegen

---

## Beslissingen Log (v4.0)

| # | Vraag | Beslissing |
|---|-------|------------|
| 1 | Context format | FASE-secties (vrije tekst per fase) |
| 2 | File format | Markdown |
| 3 | Session architecture | Single session (`current.md`) |
| 4 | Documentation | Centraal in CLAUDE.md |
| 5 | Deletion | Permanent delete |
| 6 | Session check | Inline (geen FASE 0) |
| 7 | Timestamps | Alleen Time MCP |
| 8 | Secties | 3 (Metadata, Position, Context) |
| 9 | Edge cases | Deferred |
| 10 | FASE ID | By number |
