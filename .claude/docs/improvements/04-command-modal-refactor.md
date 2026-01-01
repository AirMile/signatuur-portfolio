# Command Modal Refactor Plan

## Goal
Replace all plain text confirmations ("Type yes to continue") with AskUserQuestion modals.

## Baseline Pattern (from CLAUDE.md)

```yaml
options:
  - label: "[Best option] (Recommended)", description: "..."
  - label: "[Option 2]", description: "..."
  - label: "Explain question", description: "Explain what this means"
multiSelect: true  # false only for yes/no confirmations
```

---

## Commands to Refactor

### Priority 1: High Usage Commands

| Command | Issues Found | Lines |
|---------|-------------|-------|
| **1-plan.md** | ✅ DONE - All checkpoints converted to modals | - |
| **2-code.md** | "Wait for valid input" without modal | 159, 165, 171, 177, 245 |
| **3-verify.md** | "Wait for user input" without modal | 189, 212, 1802, 1816 |

### Priority 2: Medium Usage Commands

| Command | Issues Found | Lines |
|---------|-------------|-------|
| **debug.md** | "Wait for confirmation" without modal | 55 |
| **4-refine.md** | "Wait for valid input" | 161 |
| **edit.md** | "Type name to confirm" | 270 |
| **create.md** | ✅ DONE - Confirmations converted to modals | - |

### Priority 3: Lower Usage Commands

| Command | Issues Found | Lines |
|---------|-------------|-------|
| **brainstorm.md** | "Wait for responses/confirmation" | 47, 59, 131 |
| **critique.md** | "Wait for responses/confirmation" | 63, 77, 176 |
| **idea.md** | "Wait for responses" | 32 |

---

## Refactor Tasks per Command

### 1. style.md (3 issues)

**Line 428:** Replace plain text checkpoint
```markdown
# FROM:
Is this correct? Type "yes" to continue, "no" to adjust.

# TO:
Use **AskUserQuestion** tool:
- header: "Confirm Changes"
- question: "Are these changes correct?"
- options:
  - label: "Yes, apply (Recommended)", description: "Apply the changes"
  - label: "No, adjust", description: "I want to modify something"
- multiSelect: false
```

**Line 459:** Replace workflow checkpoint
**Line 1002:** Replace final confirmation

---

### 2. 2-code.md (5 issues)

**Lines 159-177:** Replace input validation waits with modals
```markdown
# FROM:
→ Stop and wait for valid input

# TO:
Use **AskUserQuestion** tool:
- header: "Input Required"
- question: "[Specific question]"
- options: [context-specific suggestions]
- multiSelect: false
```

---

### 3. 3-verify.md (4 issues)

**Lines 189, 212:** Replace input waits
**Lines 1802, 1816:** Replace manual solution input requests

---

### 4. debug.md (1 issue)

**Line 55:** Add modal for confirmation

---

### 5. 4-refine.md (1 issue)

**Line 161:** Replace input validation

---

### 6. edit.md (1 issue)

**Line 270:** Replace name confirmation with modal

---

### 7. create.md (2 issues)

**Lines 54, 77:** Add confirmation modals

---

### 8. brainstorm.md (3 issues)

**Lines 47, 59, 131:** Replace waits with modals

---

### 9. critique.md (3 issues)

**Lines 63, 77, 176:** Replace waits with modals

---

### 10. idea.md (1 issue)

**Line 32:** Replace response wait with modal

---

### 11. 1-plan.md (5 issues - partially done)

**Remaining:**
- Line 2022: Replace "Type '1' to retry" with modal
- Line 2105: Update best practices text
- Line 2152: Update checkpoint discipline text
- Line 2185: Remove "Type yes" instruction
- Line 2195: Update to match new modal approach

---

## Execution Order

1. **style.md** - High visibility, 3 clear issues
2. **2-code.md** - Core workflow, 5 issues
3. **3-verify.md** - Core workflow, 4 issues
4. **1-plan.md** - Finish remaining 5 issues
5. **debug.md** - 1 issue
6. **4-refine.md** - 1 issue
7. **edit.md** - 1 issue
8. **create.md** - 2 issues
9. **brainstorm.md** - 3 issues
10. **critique.md** - 3 issues
11. **idea.md** - 1 issue

---

## Total: 11 commands, ~29 issues

**Estimated effort:** 2-3 sessions to complete all refactoring
