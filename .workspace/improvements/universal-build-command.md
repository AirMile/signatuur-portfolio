# Plan: Universele Build Command

**Aangemaakt:** 2026-01-11
**Status:** Gepland
**Prioriteit:** Medium

## Samenvatting

Merge `game/build.md` functionaliteit in `dev/build.md` zodat één universele build command alle stacks ondersteunt via resources.

## Huidige Situatie

```
.claude/commands/
├── dev/
│   └── build.md          # Web (React, Laravel, Node)
└── game/
    └── build.md          # Godot alleen
```

**Probleem:** ~400 regels TDD cycle logica is gedupliceerd in beide files.

## Doel Situatie

```
.claude/commands/
└── dev/
    └── build.md          # Universeel (web + game)

.claude/resources/
├── testing/
│   ├── vitest-rtl.md     # ✅ Bestaat
│   ├── phpunit.md        # ✅ Bestaat
│   └── gut.md            # 🆕 Toe te voegen
└── patterns/
    ├── tdd-cycle.md      # ✅ Bestaat
    └── output-parsing.md # ✅ Bestaat
```

## Analyse

### Wat is identiek (kan delen)

| Component                 | Regels | Actie                 |
| ------------------------- | ------ | --------------------- |
| FASE 0: Load Context      | ~50    | Behouden              |
| FASE 1: Generate Tests    | ~80    | Template uit resource |
| FASE 2: TDD Cycle         | ~150   | Behouden              |
| FASE 3: Integration Tests | ~60    | Template uit resource |
| FASE 4: Checklist         | ~40    | Template uit resource |
| FASE 5: Completion        | ~80    | Behouden              |
| Ralph loop setup          | ~30    | Behouden              |

### Wat verschilt (conditionals nodig)

| Component      | Web                    | Game                       | Oplossing        |
| -------------- | ---------------------- | -------------------------- | ---------------- |
| Test command   | `npm run test`         | Godot headless             | In resource      |
| Test file ext  | `.test.tsx`            | `.gd`                      | In resource      |
| Checklist naam | `03-test-checklist.md` | `03-playtest.md`           | Conditional      |
| Playtest scene | -                      | `playtest_scene.tscn`      | `IF game` sectie |
| Debug listener | -                      | `debug_listener.gd`        | `IF game` sectie |
| MCP tools      | -                      | `create_scene`, `add_node` | `IF game` sectie |

### Game-specifieke toevoegingen (~120 regels)

1. **FASE 4b: Create Playtest Scene** (~80 regels)
   - MCP scene creation
   - Camera2D, PlayerSpawn, TestTarget, ArenaBounds
   - DebugListener node

2. **Debug hooks documentatie** (~40 regels)
   - `debug_*` signals pattern
   - Print statement format

## Implementatie Stappen

### Stap 1: Maak gut.md resource

**File:** `.claude/resources/testing/gut.md`

**Inhoud:**

- GUT test file structure
- Assertions (assert_eq, assert_signal_emitted, etc.)
- Mock objects (double, stub)
- Test commands (Godot headless)
- Output parsing rules

### Stap 2: Update stack-detection.md

Voeg toe:

```markdown
| **Engine**: Godot | game | gut.md |
```

### Stap 3: Merge game/build.md in dev/build.md

**Aanpassingen:**

1. **FASE 0 - Stack Detection:**

   ```
   IF **Engine**: exists → stack_type = "game"
   ```

2. **FASE 1 - Test Generation:**

   ```
   Laad template uit resource (gut.md voor game)
   ```

3. **FASE 4 - Checklist:**

   ```
   IF game:
     filename = "03-playtest.md"
     template = playtest checklist
   ELSE:
     filename = "03-test-checklist.md"
     template = browser test checklist
   ```

4. **FASE 4b - Playtest Scene (NIEUW):**
   ```
   IF game:
     Create playtest_scene.tscn via MCP
     Create debug_listener.gd
   ```

### Stap 4: Update setup.md Step 13.5

Voeg toe aan resources creation:

```
IF game project:
  Create .claude/resources/testing/gut.md
```

### Stap 5: Verwijder game/build.md

Na verificatie dat alles werkt.

## Geschatte Impact

| Metric               | Voor             | Na          |
| -------------------- | ---------------- | ----------- |
| Totaal regels        | 500 + 970 = 1470 | ~700        |
| Duplicatie           | ~400 regels      | 0           |
| Files te onderhouden | 2                | 1           |
| Resources            | 5                | 6 (+gut.md) |

## Risico's

| Risico                            | Mitigatie                       |
| --------------------------------- | ------------------------------- |
| Game-specifieke edge cases missen | Test met bestaand Godot project |
| Conditional spaghetti             | Max 3-4 `IF game` checks        |
| Breaking existing workflows       | Backup game/build.md eerst      |

## Test Plan

1. **Web frontend test:**
   - `/dev:build` op React project
   - Verify vitest-rtl.md geladen

2. **Web backend test:**
   - `/dev:build` op Laravel project
   - Verify phpunit.md geladen

3. **Game test:**
   - `/dev:build` op Godot project
   - Verify gut.md geladen
   - Verify playtest scene creation

## Beslissingen Nodig

- [ ] Moet `game/build.md` behouden blijven als alias/redirect?
- [ ] Moet `/game:build` blijven werken (symlink naar dev/build)?

## Notities

- Resources pattern werkt al goed voor web
- GUT testing patterns al gedocumenteerd in game/build.md
- Playtest scene creation gebruikt MCP tools die beschikbaar zijn
