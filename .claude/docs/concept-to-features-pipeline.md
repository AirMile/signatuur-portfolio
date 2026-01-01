# Concept to Features Pipeline

Een reeks commands die een rauw idee transformeert naar implementation-ready features.

## Pipeline Overzicht

```
/idea → /critique → /brainstorm → /define → /map → /scope → /require → [implementation pipeline]
                          ↑            ↑         ↑       ↑
                          └─────────── /research ────────┘
                               (parallel, wanneer nodig)
```

### Hoofdlijn (sequentieel)

| Fase | Command | Input | Output | Status |
|------|---------|-------|--------|--------|
| 1. Articuleren | `/idea` | Ruw idee | Gestructureerd concept | Bestaat |
| 2. Valideren | `/critique` | Concept | Gevalideerd concept met feedback | Bestaat |
| 3. Verkennen | `/brainstorm` | Concept | Uitgebreid concept met variaties | Bestaat |
| 4. Beslissen | `/define` | Concept met open vragen | Concept met alle beslissingen | Te bouwen |
| 5. Mappen | `/map` | Defined concept | User journeys + epics | Te bouwen |
| 6. Prioriteren | `/scope` | Journeys/epics | Geprioriteerde MVP scope | Te bouwen |
| 7. Specificeren | `/require` | Scoped epics | Requirements + user stories | Te bouwen |

### Parallel Track

| Command | Doel | Wanneer | Status |
|---------|------|---------|--------|
| `/research` | Hypotheses opstellen en valideren via desk research | Op elk moment wanneer aannames gevalideerd moeten worden | Te bouwen |

---

## Bestaande Commands

### /idea
**Doel:** Vaag idee articuleren tot gestructureerd concept.

**Proces:** Guided questions om het idee helder te krijgen.

**Output:** Markdown document met core concept, doelgroep, scope, etc.

---

### /critique
**Doel:** Kritisch analyseren van een concept op zwaktes en risico's.

**Proces:** Gestructureerde kritiek-technieken toepassen.

**Output:** Gevalideerd concept met feedback verwerkt.

---

### /brainstorm
**Doel:** Creatief verkennen van variaties en alternatieven.

**Proces:** Interactieve brainstorm-technieken (Analogical Thinking, Role Playing, etc.)

**Output:** Uitgebreid concept met nieuwe inzichten en mogelijkheden.

---

## Te Bouwen Commands

### /research (parallel track)
**Doel:** Hypotheses en onderzoeksvragen opstellen, valideren via desk research.

**Waarom nodig:** Soms moet je aannames valideren voordat je verder gaat. Dit is geen vaste stap maar een tool die je inzet wanneer je vastloopt of kritieke aannames hebt.

**Wanneer inzetten:**
- Na `/brainstorm`: welke richting is het beste? (vergelijk opties)
- Na `/define`: hebben we de juiste keuzes gemaakt?
- Na `/scope`: bouwen we de juiste MVP?
- Bij technische onzekerheid: werkt X überhaupt?

**Kernmechaniek:**
- Identificeer aannames en onzekerheden in het huidige concept
- Formuleer onderzoeksvragen en hypotheses
- Voer desk research uit (bestaande games, technische docs, artikelen, etc.)
- Synthetiseer bevindingen tot actionable insights
- Update concept/beslissingen op basis van research

**Input:** Concept/document + specifieke vraag of onzekerheid

**Output:**
- Onderzoeksvragen en hypotheses
- Research bevindingen met bronnen
- Conclusies en aanbevelingen
- Eventueel: aangepast concept

**Voorbeeld onderzoeksvragen (Party Quest):**
```
## Onderzoeksvragen

### Technisch
- H1: iOS PWA push notifications werken betrouwbaar genoeg voor real-time game events
- H2: Clock synchronisatie tussen devices is mogelijk binnen 1 seconde nauwkeurigheid

### Game Design
- H3: Quest-verificatie via groepsstemming voelt eerlijk voor spelers
- H4: Currency-systeem vergelijkbaar met Valsspel werkt in een casual setting

### User Experience
- H5: Party games blijven leuk na 3+ drankjes als interacties simpel genoeg zijn
```

---

### /define
**Doel:** Open vragen en ambiguiteiten forceren tot concrete beslissingen.

**Waarom nodig:** Na brainstormen heb je vaak opties maar geen keuzes. Zonder beslissingen kun je niet mappen of scopeen.

**Kernmechaniek:**
- Identificeer alle open vragen in het concept
- Per beslissing: presenteer opties met trade-offs
- Forceer keuze met rationale
- Output: concept zonder "to be decided" items

**Input:** Concept met open vragen (bijv. output van `/brainstorm`)

**Output:** Fully defined concept — alle beslissingen gemaakt, rationale gedocumenteerd

**Voorbeeld transformatie:**
```
VOOR: "Teams kunnen bekend zijn OF je weet je team maar niet wie erbij zit"
NA: "Teams zijn bekend vanaf de start. Rationale: past bij laid-back complexiteit."
```

---

### /map
**Doel:** User journeys en epics in kaart brengen.

**Waarom nodig:** Voordat je kunt prioriteren moet je weten wat er allemaal is. Mapping dwingt je vanuit de gebruiker te denken.

**Kernmechaniek:**
- Identificeer alle user types/personas
- Map de journey per user type (stap voor stap)
- Groepeer gerelateerde functionaliteit in epics
- Visualiseer afhankelijkheden tussen epics

**Input:** Defined concept (output van `/define`)

**Output:**
- User journey maps per persona
- Epic overzicht met beschrijvingen
- Dependency diagram (wat moet eerst)

**Voorbeeld output structuur:**
```
## User Journeys

### Speler Journey
1. Ontvang invite link
2. Open PWA, voer naam in
3. Wacht op game start
4. Ontvang geheime rol
5. ...

## Epics

### Epic 1: Session Management
- Sessie aanmaken
- Join via code
- Wachtkamer
- Game starten

### Epic 2: Role Assignment
- ...
```

---

### /scope
**Doel:** MVP afbakenen en prioriteren.

**Waarom nodig:** Je kunt niet alles tegelijk bouwen. Scope dwingt harde keuzes over wat eerst komt.

**Kernmechaniek:**
- MoSCoW prioritering per epic (Must/Should/Could/Won't)
- Identify minimum viable product (wat is het absolute minimum?)
- Definieer release fases als relevant
- Check: lost MVP het kernprobleem op?

**Input:** Epics en journeys (output van `/map`)

**Output:**
- Geprioriteerde epic lijst met MoSCoW labels
- MVP definitie (must-haves only)
- Fase planning (MVP → v1.1 → v1.2 → later)

**Voorbeeld output structuur:**
```
## MVP Scope

### Must Have (zonder dit geen product)
- [ ] Epic 1: Session Management
- [ ] Epic 3: Basic Notifications
- [ ] Epic 5: End Reveal

### Should Have (maakt het goed)
- [ ] Epic 2: Currency System
- [ ] Epic 4: Team Mechanics

### Could Have (nice to have)
- [ ] Epic 6: Advanced Roles

### Won't Have (bewust niet in v1)
- [ ] Epic 7: Replay System
- [ ] Epic 8: Spectator Mode
```

---

### /require
**Doel:** Gedetailleerde requirements en user stories per epic.

**Waarom nodig:** Epics zijn te groot om te implementeren. Ze moeten opgebroken worden in concrete, actionable items.

**Kernmechaniek:**
- Per epic: break down in features
- Per feature:
  - Functionele requirements (wat moet het doen)
  - User story format (als gebruiker wil ik X zodat Y)
  - Acceptance criteria (wanneer is het klaar)
- Check: zijn requirements testbaar en eenduidig?

**Input:** Geprioriteerde epics (output van `/scope`)

**Output:** Requirements document met user stories, klaar voor implementation pipeline

**Voorbeeld output structuur:**
```
## Epic 1: Session Management

### Feature 1.1: Create Session
**User Story:** Als host wil ik een sessie aanmaken zodat vrienden kunnen joinen.

**Requirements:**
- Genereer unieke 6-character code
- Toon QR code + link
- Host wordt automatisch eerste speler

**Acceptance Criteria:**
- [ ] Code is uniek en 6 characters
- [ ] Link opent direct naar join pagina
- [ ] QR code scant naar zelfde link
```

---

## Pipeline Flow

```
        [Rauw idee]
             │
             ▼
         /idea ──────────► Gestructureerd concept
             │
             ▼
       /critique ────────► Gevalideerd concept
             │
             ▼
      /brainstorm ───────► Concept met variaties & inzichten
             │
             ├─────────────────────────────────────┐
             ▼                                     │
        /define ─────────► Concept met beslissingen│
             │                                     │
             ├─────────────────────────────────────┤
             ▼                                     │
          /map ──────────► User journeys + epics   │  /research
             │                                     │  (parallel)
             ├─────────────────────────────────────┤
             ▼                                     │
         /scope ─────────► Geprioriteerde MVP      │
             │                                     │
             ├─────────────────────────────────────┘
             ▼
       /require ─────────► Requirements + stories
             │
             ▼
    [Implementation Pipeline]
```

`/research` kan op elk punt ingezet worden om aannames te valideren.

## Notities

- Elke command kan standalone gebruikt worden, maar de waarde zit in de keten
- Output van elke command is input voor de volgende
- Commands zijn idempotent: je kunt ze opnieuw draaien met aangepaste input
- Focus op snelheid en flow — niet elk detail hoeft perfect in één keer
