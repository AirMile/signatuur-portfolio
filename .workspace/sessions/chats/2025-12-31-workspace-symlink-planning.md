# Chat: Workspace Symlink Planning

## Metadata
- **Saved**: 2025-12-31 20:30 CET

## Topics
- Mono-workspace herstructurering (Obsidian-achtige setup)
- Path analyse van alle 22 commands via parallelle agents
- Symlink vs mono-workspace refactor trade-offs
- Windows Developer Mode voor symlinks

## Key Findings

### Command Compatibiliteit Analyse

| Status | Commands | Issue Count |
|--------|----------|-------------|
| ✅ Ready | commit, edit, explore, idea | 0 |
| 🟡 Minor | debug, brainstorm, critique, review-other | 2-4 |
| 🟠 Medium | test-other, owasp, create, plan | 6-7 |
| 🔴 High | save, theme, setup, analyze, wireframe | 11-13 |
| 🔴 Critical | 1-plan, 2-code, 3-verify, 4-refine, 5-refactor | 13-57 |

**Totaal: 179+ hardcoded paden** die zouden breken in mono-workspace

### Twee pad-categorieën
- **Gedeeld** (`.claude/`): Blijft hetzelfde in mono-workspace
- **Project-specifiek** (`.workspace/`): Moet dynamisch worden → `projects/{project}/.workspace/`

## Decisions
- **Symlink-aanpak gekozen**: Minder werk dan 179+ paden refactoren
- **Developer Mode ingeschakeld**: Vereist voor symlinks zonder admin rechten
- **Nog te testen**: Symlink test na terminal herstart

## Next Steps
1. Terminal/VS Code herstarten (nieuwe sessie nodig voor Developer Mode rechten)
2. Symlink test opnieuw uitvoeren
3. Bij succes: workspace herstructureren met symlinks

## Symlink Test Command (voor nieuwe sessie)
```powershell
cd c:\Projects\school-website
New-Item -ItemType SymbolicLink -Path "test-symlink" -Target ".claude"
# Als dit werkt → symlinks zijn klaar voor gebruik
Remove-Item "test-symlink"
```

## Voorgestelde Structuur (bij succes)
```
c:\Projects\
├── .claude-shared/              ← centrale config
│   ├── commands/
│   ├── skills/
│   └── agents/
├── school-website/
│   ├── .claude/ → ../.claude-shared/  (symlink)
│   └── .workspace/                     (project-eigen)
└── techno-studio/
    ├── .claude/ → ../.claude-shared/  (symlink)
    └── .workspace/                     (project-eigen)
```
