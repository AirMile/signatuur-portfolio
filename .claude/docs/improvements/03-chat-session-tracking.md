# Chat Session Tracking (Extension)

> **Version:** 2.0
> **Builds on:** 02-session-tracking.md (command sessions)
> **Status:** Design

---

## Problem

1. **Free chats are lost** - research, questions, exploration outside commands
2. **After command completion context is gone** - command session is deleted
3. **Cannot continue after command** - no place to store follow-up discussion

---

## Solution: Two-Layer System

```
┌─────────────────────────────────────────────────────────┐
│  CHAT SESSION (outer layer)                             │
│  └→ .claude/sessions/.chat/current-{id}.md               │
│                                                         │
│  Contains:                                              │
│  - Free chat context                                    │
│  - Command summaries                                    │
│  - Discussion after command completion                  │
├─────────────────────────────────────────────────────────┤
│  COMMAND SESSIONS (nested, unchanged)                   │
│  └→ .claude/sessions/{command}/current.md               │
│                                                         │
│  Contains:                                              │
│  - FASE tracking                                        │
│  - Resume logic                                         │
│  - Deleted after completion, summary → chat session     │
└─────────────────────────────────────────────────────────┘
```

---

## Architecture

### File Structure

```
.claude/sessions/
├── chat/
│   ├── current-a1b2c3.md             # Active chat 1
│   ├── current-x7y8z9.md             # Active chat 2
│   ├── portfolio-planning.md         # Saved session
│   └── ...
├── 1-plan/                           # Command sessions (unchanged)
│   └── current.md
├── 2-code/
│   └── current.md
└── ...
```

**Two layers:**
- `chat/current-{id}.md` → outer chat session
- `{command}/current.md` → command-specific FASE tracking

---

### Chat Session File Format

```markdown
# Chat: {generated-title}

## Metadata
- **Session ID**: {6-char-id}
- **Started**: {YYYY-MM-DD HH:mm}
- **Last Updated**: {YYYY-MM-DD HH:mm}
- **Status**: active | completed

## Context

### {HH:mm} - {subtopic}
- {free text}

### {HH:mm} - /1-plan: {task}
**Summary:**
- Type: {classification}
- Decisions: {key decisions}
- Output: {generated files}

### {HH:mm} - Follow-up discussion
- {context after command completion}
```

---

## Complete Flow

### 1. Chat Start (automatic)

```
1. Generate session ID (6 random characters)
2. Create .claude/sessions/.chat/current-{id}.md
3. Generate title from first question
4. Start tracking
```

### 2. Free Chat

```
At important moments:
→ Append entry to Context section
→ Update Last Updated timestamp
```

### 3. Command Start (e.g., /1-plan)

```
1. Command session: .claude/sessions/1-plan/current.md (existing system)
2. FASE tracking works as always
3. Resume logic unchanged
```

### 4. Command Completion

```
1. Command session deleted (as now)
2. Summary → chat session added:

   ### {HH:mm} - /1-plan: {task}
   **Summary:**
   - Type: New Feature
   - Decisions: Grid layout, mobile-first
   - Output: .claude/plans/feature-x.md

3. Modal: "Continue with this chat or end?"
   ├→ Continue: chat session stays open
   └→ End: → /save modal
```

### 5. Continue Discussion (optional)

```
After command completion you can continue:
→ Free context is added to chat session
→ Can start another command (cycle repeats)
```

### 6. Chat End (/save)

```
Modal:
○ Save as: "{generated-title}" (Recommended)
○ Save with different name
○ Delete

On save: current-{id}.md → {name}.md
On delete: delete file
```

---

## Example Session

```markdown
# Chat: Portfolio feature planning

## Metadata
- **Session ID**: a1b2c3
- **Started**: 2025-12-30 14:30
- **Last Updated**: 2025-12-30 16:45
- **Status**: active

## Context

### 14:30 - Layout research
- Question: which layout for portfolio?
- Researched: grid vs masonry vs flexbox
- Decision: CSS Grid for main layout

### 14:50 - /1-plan: Portfolio grid component
**Summary:**
- Type: New Feature
- Complexity: Medium
- Decisions:
  - Grid with 3 columns desktop
  - Card component for items
  - Lightbox for detail view
- Output: .claude/plans/portfolio-grid.md

### 15:30 - Implementation questions
- Question: what about lazy loading?
- Decision: Use Intersection Observer
- Extra requirement added to plan

### 15:45 - /2-code: Portfolio grid
**Summary:**
- Files created: src/components/PortfolioGrid.jsx
- Tests: 5 passed
- Notes: No lazy loading yet

### 16:30 - Follow-up discussion
- Question: add animations?
- Decision: Motion library, fade-in effect
- TODO: implement later with /4-refine
```

---

## Integration with Commands

### Changes to command completion

At command completion (in each command SKILL.md):

```markdown
## On Completion

1. Delete command session: `.claude/sessions/{command}/current.md`
2. Write summary to chat session:
   - Timestamp
   - Command name + task
   - Key decisions
   - Output files
3. Show modal: "Continue with this chat or end?"
```

### Commands that need updating

All commands with session tracking:
- /1-plan, /2-code, /3-verify, /4-refine, /5-refactor
- /debug, /owasp, /analyze
- /review-other, /style

---

## Command: /save

Closes the chat session with choice modal.

**When to use:**
- After command completion (if you choose "End")
- After free chat discussion
- When you're done with this conversation

**Flow:**
```
1. Find current-{session-id}.md
2. Show modal:

   "What do you want to do with this chat session?"

   ○ Save as: "portfolio-feature-planning" (Recommended)
   ○ Save with different name
   ○ Delete (don't save)

3. Execute:
   - Save: rename file
   - Delete: delete file
```

---

## CLAUDE.md Update

Replace current Session Tracking section:

```markdown
## Session Tracking

Two-layer system for workflow persistence.

### Chat Sessions (outer layer)
Location: `.claude/sessions/.chat/current-{id}.md`

**Automatic:** Each chat gets a session file with auto-generated title.

**Contains:** Free chat context + command summaries + follow-up discussion.

**End:** `/save` shows modal: save (with name) or delete.

### Command Sessions (nested)
Location: `.claude/sessions/{command}/current.md`

**On command start:** Check for existing session → offer resume.

**FASE tracking:** Metadata + Current Position + Context per FASE.

**On completion:**
1. Summary → chat session
2. Delete command session
3. Modal: "Continue or end?"

**Timestamps:** Use `mcp__time__get_current_time("Europe/Amsterdam")`.
```

---

## Implementation Order

### Step 1: CLAUDE.md update
- [x] New Session Tracking section

### Step 2: /save command
- [x] Create `.claude/commands/save.md`

### Step 3: Command completion update
- [x] Update all commands with:
  - Write summary to chat session
  - "Continue or end?" modal

---

## Success Criteria

- [ ] Chat sessions are automatically tracked
- [ ] Multiple chats can be open in parallel (multi-chat support)
- [ ] Command summaries are written to chat session
- [ ] After command completion you can continue discussion
- [ ] /save shows modal with save/delete choice
- [ ] Command resume keeps working (unchanged)

---

## VSCode Blur Workaround

### Problem

In the VSCode extension, the background gets blurred when a modal appears. This makes it impossible to read the context you need to make a decision in the modal.

### Solution

Write relevant context to the session file **BEFORE** the modal appears:

```
1. Generate context (e.g., plan, design, options)
2. Write context to appropriate session file:
   - During command: .claude/sessions/{command}/current.md
   - During free chat: .claude/sessions/.chat/current-{id}.md
3. Show modal
4. User opens session file in separate tab to read context
5. User makes choice in modal
```

### Implementation

**In commands** - write to command session file:
All commands that show modals with context-dependent choices:

| Command | Modal | Context to session |
|---------|-------|-------------------|
| /1-plan | "Approve plan?" | Plan content |
| /analyze | "Which approach?" | Analysis results |
| /debug | "Which fix?" | Fix options |
| /brainstorm | "Apply technique?" | Current ideas |

**In free chat** - write to chat session file:
When showing modals during free conversation (not inside a command), write context to the chat session:

| Situation | Modal | Context to session |
|-----------|-------|-------------------|
| Design discussion | "Which option?" | Options summary |
| Research findings | "Proceed with this?" | Findings |
| Any decision point | User choice needed | Relevant context |

### Session File as Reference

The session file serves as:
1. **Backup** - context is not lost
2. **Reference** - readable during modal
3. **History** - decisions + context preserved
