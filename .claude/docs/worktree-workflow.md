# Worktree Workflow Guide

## Setup Overzicht

| Map | Branch | Doel |
|-----|--------|------|
| `claude-code-setup` | `main` | Skills/commands ontwikkelen |
| `school-website` | `feature/session-tracking` | Testen van skills |

Beide mappen delen dezelfde git database (worktree), dus commits zijn direct zichtbaar zonder push/pull.

---

## Dagelijkse Workflows

### Updates van main → feature (testen)

Wanneer je wijzigingen in `claude-code-setup` wilt testen in `school-website`:

```bash
# In school-website
git merge main
```

---

### Wijzigingen van feature → main (publiceren)

#### Methode 1: Via cherry-pick (enkele commits)

```bash
# 1. In school-website: commit je wijzigingen
git add .claude/
git commit -m "Update skill X"

# 2. Noteer de commit hash
git log -1 --oneline
# Output: abc1234 Update skill X

# 3. In claude-code-setup: cherry-pick
cd ../claude-code-setup
git cherry-pick abc1234
```

#### Methode 2: Via merge (alle wijzigingen)

```bash
# In claude-code-setup
git merge feature/session-tracking
```

#### Methode 3: Direct pushen naar remote main

```bash
# In school-website - push feature branch naar remote main
git push origin feature/session-tracking:main

# Daarna in claude-code-setup (om lokaal te updaten)
cd ../claude-code-setup
git pull origin main
```

---

## Handige Git Commando's

```bash
# Bekijk alle worktrees
git worktree list

# Bekijk verschil tussen branches
git diff main..feature/session-tracking

# Bekijk commits die in feature zitten maar niet in main
git log main..feature/session-tracking --oneline

# Bekijk commits die in main zitten maar niet in feature
git log feature/session-tracking..main --oneline
```

---

## Tips

1. **Test altijd eerst** in `school-website` voordat je naar `main` merged
2. **Commit messages**: Wees specifiek over welke skill je aanpast
3. **Kleine commits**: Liever meerdere kleine commits dan één grote
4. **Sync regelmatig**: Merge `main` regelmatig naar je feature branch om conflicts te voorkomen

---

## Troubleshooting

### "Cannot checkout main - already checked out"

Dit is normaal bij worktrees. Gebruik cherry-pick of merge in plaats van checkout.

### Merge conflicts

```bash
# Bekijk welke files in conflict zijn
git status

# Na handmatig oplossen
git add <conflicted-files>
git commit
```

### Worktree verwijderen

```bash
# In de HOOFD repository (claude-code-setup)
git worktree remove ../school-website
```
