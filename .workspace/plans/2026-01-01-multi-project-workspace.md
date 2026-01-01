# Plan: Multi-Project Workspace Setup

**Datum:** 2026-01-01
**Status:** draft

## Doel

Centraliseer herbruikbare Claude Code configuratie in `C:\Projects\claude-config\` met NTFS junctions voor shared folders, zodat commands/agents/resources/scripts tussen projecten gedeeld worden terwijl project-specifieke configuratie (CLAUDE.md, docs/, research/) lokaal blijft.

## Context

Het huidige school-website project heeft een complete `.claude/` setup met commands, agents, resources en scripts die generiek genoeg zijn om in meerdere projecten te gebruiken. Door deze configuratie te centraliseren kunnen nieuwe projecten direct van deze workflow profiteren zonder duplicatie.

### Bestaande Patronen

**Huidige school-website structuur:**
- `.claude/agents/` - 67 agent definitiebestanden (plan-web-*, owasp-*, debug-*, etc.)
- `.claude/commands/` - 22 command workflows (1-plan, 2-code, setup, commit, etc.)
- `.claude/resources/` - Gedeelde resources
- `.claude/scripts/` - Utility scripts
- `.claude/CLAUDE.md` - Project-specifieke configuratie
- `.claude/docs/` - Gegenereerde documentatie
- `.claude/research/` - Research findings
- `.workspace/sessions/` - Session tracking (sinds 2025-12-31)

**Git repository status:**
- school-website: bestaande repo met feature branch
- .gitignore: excludes node_modules, dist, .vscode, session tracking

### Research Highlights

**NTFS Junction Best Practices:**
- Gebruik `mklink /J` voor directory junctions (geen admin rights nodig)
- Removal: alleen `rmdir` (niet `del /s` - voorkomt accidental deletion van targets)
- Git 2.19+ respecteert junctions als symlinks, clean -dfx is veilig
- OneDrive synct geen junctions (master moet buiten OneDrive)

**VS Code Integration:**
- File watching werkt door junctions heen
- Optioneel `watcherExclude` indien performance issues
- No-Verify tool ziet junctions als normale directories

**Windows Specifics:**
- Junctions werken alleen voor directories (niet files)
- Relatieve en absolute paths beide ondersteund
- Overleven directory renames als absolute paths gebruikt

## Stappen

- [ ] **Stap 1: Maak Master Repository**
  Maak centrale configuratie repository met shared content
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `C:\Projects\claude-config\` (nieuwe folder)
    - `C:\Projects\claude-config\README.md`
    - `C:\Projects\claude-config\.gitignore`

- [ ] **Stap 2: Kopieer Shared Content**
  Verplaats deelbare folders naar master repository
  - Risico: MEDIUM
  - Effort: M
  - Bestanden:
    - `claude-config\agents\` (67 bestanden van school-website)
    - `claude-config\commands\` (22 bestanden)
    - `claude-config\resources\` (alle bestanden)
    - `claude-config\scripts\` (alle bestanden)

- [ ] **Stap 3: Maak CLAUDE.base.md Template**
  Creëer template voor nieuwe projecten vanuit huidige CLAUDE.md
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `claude-config\CLAUDE.base.md` (template zonder project-specifieke sectie)
    - Behoud: User Preferences, Language Policy, Communication Style, Output Formatting, Smart Suggestions, Command Execution Rules, Token Efficiency, Session Tracking
    - Verwijder: Workspace Purpose, Project (Test Case) sectie

- [ ] **Stap 4: Maak settings.json Template**
  Creëer shared settings template
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `claude-config\settings.json` (gedeelde defaults)

- [ ] **Stap 5: Verwijder Gekopieerde Content uit school-website**
  Cleanup school-website na copy naar master
  - Risico: HIGH
  - Effort: S
  - Bestanden:
    - Verwijder: `school-website\.claude\agents\`
    - Verwijder: `school-website\.claude\commands\`
    - Verwijder: `school-website\.claude\resources\`
    - Verwijder: `school-website\.claude\scripts\`
    - Behoud: `CLAUDE.md`, `docs\`, `research\`, `settings.local.json`

- [ ] **Stap 6: Maak NTFS Junctions in school-website**
  Link naar master repository met directory junctions
  - Risico: HIGH
  - Effort: M
  - Bestanden:
    - Junction: `school-website\.claude\agents` → `C:\Projects\claude-config\agents`
    - Junction: `school-website\.claude\commands` → `C:\Projects\claude-config\commands`
    - Junction: `school-website\.claude\resources` → `C:\Projects\claude-config\resources`
    - Junction: `school-website\.claude\scripts` → `C:\Projects\claude-config\scripts`

- [ ] **Stap 7: Test Claude Code Werking**
  Verifieer dat alle commands en agents werken via junctions
  - Risico: MEDIUM
  - Effort: M
  - Test cases:
    - `/setup` command leest CLAUDE.md correct
    - `/commit` command werkt
    - `/1-plan` spawnt agents correct
    - File operations via junctions werken
    - Git status toont junctions correct

- [ ] **Stap 8: Update .gitignore Bestanden**
  Configureer git om junctions correct te behandelen
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `school-website\.gitignore`: behoud bestaande, geen junction-specifieke excludes nodig
    - `claude-config\.gitignore`: basis template voor master repo

- [ ] **Stap 9: Initialiseer claude-config Git Repository**
  Maak master repo als standalone versioned project
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `git init` in `C:\Projects\claude-config\`
    - Initial commit met alle shared content
    - README.md met usage instructies

- [ ] **Stap 10: Maak /project-new Command**
  Automatiseer nieuwe project setup met junctions
  - Risico: MEDIUM
  - Effort: L
  - Bestanden:
    - `.claude\commands\project-new.md`
  - Functionaliteit:
    - Accepteer project naam als parameter
    - Maak `C:\Projects\[naam]\` folder
    - Maak `.claude\` subfolder
    - Maak 4 junctions naar claude-config
    - Kopieer .gitignore template
    - Git init
    - Spawn /setup voor CLAUDE.md personalisatie
    - Optioneel: open in VS Code

- [ ] **Stap 11: Maak /project-remove Command**
  Veilige junction removal zonder target deletion
  - Risico: HIGH
  - Effort: M
  - Bestanden:
    - `.claude\commands\project-remove.md`
  - Functionaliteit:
    - Valideer dat pad junctions bevat
    - Verwijder junctions met `rmdir` (niet `del /s`)
    - Vraag bevestiging voor folder deletion
    - Safety checks tegen accidental master deletion

- [ ] **Stap 12: Maak /project-list Command**
  Overzicht van alle projects met junction status
  - Risico: LOW
  - Effort: S
  - Bestanden:
    - `.claude\commands\project-list.md`
  - Functionaliteit:
    - Scan `C:\Projects\` voor folders met `.claude\agents` junction
    - Toon project naam, path, junction targets
    - Detect broken junctions

- [ ] **Stap 13: Update /setup Command**
  Gebruik CLAUDE.base.md als template
  - Risico: MEDIUM
  - Effort: M
  - Bestanden:
    - `.claude\commands\setup.md` (update bestaand)
  - Wijzigingen:
    - Lees `C:\Projects\claude-config\CLAUDE.base.md`
    - Voeg project-specifieke sectie toe na interactie
    - Schrijf naar lokale `.claude\CLAUDE.md`

## Afhankelijkheden

| Package/Tool | Versie | Doel |
|--------------|--------|------|
| Git | 2.19+ | Respecteert junctions als symlinks |
| Windows NTFS | N/A | Junction support (mklink /J) |
| Claude Code | Current | Command execution framework |

## Risico's & Mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Git clean -dfx verwijdert junction targets | HIGH | Git 2.19+ respecteert junctions; test eerst in school-website |
| Accidental deletion van master via junction | HIGH | Gebruik alleen `rmdir` voor junction removal, nooit `del /s`; /project-remove command met safety checks |
| OneDrive synct master repo | MEDIUM | Plaats claude-config buiten OneDrive sync folders (C:\Projects is OK) |
| Broken junctions na path changes | MEDIUM | Gebruik absolute paths voor junctions; /project-list detecteert broken junctions |
| VS Code file watching performance | LOW | Voeg `watcherExclude` toe aan settings indien nodig |
| Settings merge conflict | LOW | settings.local.json overschrijft master settings.json |
| Command updates niet zichtbaar in open projects | LOW | Restart Claude Code of reload VS Code na command updates |

## Bronnen

### Documentatie
- [Git Symlinks/Junctions Support](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coresymlinks) - Git 2.19+ behavior
- [NTFS Junctions Overview](https://docs.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions) - Windows junction documentation
- [mklink Command Reference](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/mklink) - Junction creation syntax

### Voorbeelden
- School Website .claude structure - Bestaande opzet als referentie
- Claude Code commands pattern - Bestaande /setup, /commit als template

### Referenties
- `.workspace/sessions/chats/2025-12-31-workspace-symlink-planning.md` - Research findings
- `.claude/CLAUDE.md` - Huidige configuratie als basis voor CLAUDE.base.md

## Notities

**Waarom junctions en geen symlinks:**
- Junctions vereisen geen admin rechten
- Junctions zijn Windows-native en stabieler voor directories
- Git 2.19+ behandelt junctions correct als symlinks

**Project-specifiek vs Shared:**
- SHARED (via junctions): agents/, commands/, resources/, scripts/
- LOKAAL (per project): CLAUDE.md, docs/, research/, settings.local.json, .workspace/

**Migration strategy:**
- school-website is eerste (test case)
- Nieuwe projecten gebruiken /project-new
- Bestaande projecten: manuele migratie met deze stappen als checklist

**Command execution flow:**
1. /project-new [naam] → creates structure → calls /setup
2. /setup → reads CLAUDE.base.md → customizes → writes local CLAUDE.md
3. /project-list → shows all projects with junction status
4. /project-remove [naam] → safe cleanup

**Git repository structuur:**
```
claude-config/          (standalone repo, shared config)
  ├── agents/
  ├── commands/
  ├── resources/
  ├── scripts/
  ├── CLAUDE.base.md
  ├── settings.json
  └── README.md

school-website/         (project repo, local + junctions)
  ├── .claude/
  │   ├── agents/       → junction naar claude-config
  │   ├── commands/     → junction naar claude-config
  │   ├── resources/    → junction naar claude-config
  │   ├── scripts/      → junction naar claude-config
  │   ├── CLAUDE.md     (local, project-specific)
  │   ├── docs/         (local, generated)
  │   └── research/     (local)
  └── .workspace/
      └── sessions/     (local, runtime data)
```

**Testing checklist voor Stap 7:**
- [ ] `/1-plan` kan agents spawnen
- [ ] Agents kunnen commands lezen
- [ ] /setup werkt met CLAUDE.base.md
- [ ] Git status toont junctions als changed files (eerste keer)
- [ ] Git add/commit behandelt junctions correct
- [ ] File edits via junction reflecteren in master
- [ ] No-Verify tool werkt door junctions
