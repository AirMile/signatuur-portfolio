# GitHub Issue: Modal Blur Obscures Relevant Context

**Repository:** https://github.com/anthropics/claude-code
**Category:** IDE extensions
**Priority:** Enhancement - Nice to have

---

## Problem Statement

When a modal dialog appears in the VSCode extension (e.g., review prompts, question dialogs), the text content above the modal is blurred/dimmed, making it harder to read.

This is problematic because the blurred text often contains relevant context needed to make an informed decision in the modal. For example, when asked "Does this design look good?", I need to reference the design details shown directly above the modal.

The current workflow requires me to read through the dimmed overlay, which strains the eyes and is less comfortable.

---

## Proposed Solution

I'd like the modal overlay to either:
1. Not blur/dim the background content at all
2. Have a setting to disable the blur effect: `"claude-code.modalBlurBackground": false`
3. Use a subtle dim instead of blur, keeping text readable
4. Allow scrolling the background content while the modal is open

The interface should keep context visible and readable when making decisions in modal dialogs.

---

## Alternative Solutions

Currently I work around this by reading through the dimmed/blurred overlay, which is possible but strains the eyes and is less comfortable.

I haven't found any setting to disable or reduce the dimming effect.

Other tools (like VS Code's native dialogs) often use lighter overlays or position modals in a way that doesn't obscure relevant content.

---

## Current Workaround

I've implemented a workaround in my Claude Code commands: before showing a modal that requires context review, the context is written to a session file first. I can then open the session file in a separate tab to reference it while the modal is open.

This works but adds friction. A native solution would be preferred.

---

## Priority

`Enhancement - Nice to have`

---

## Feature Category

`IDE extensions`

---

## Use Case Example

Example scenario:
1. I'm using Claude Code in VSCode to design a feature
2. Claude shows me a proposed design with file structure and format details
3. A review modal appears asking "Does this design look good? Implement or adjust?"
4. The design details I need to evaluate are now blurred behind the modal
5. I can't comfortably reference the specific format or structure while deciding
6. With this feature, I could read the full context while answering the modal
7. This would help me make better informed decisions without eye strain

---

## Additional Context

- This is especially problematic for longer outputs where the modal appears mid-content
- A toggleable setting would accommodate users who prefer the current blur aesthetic
- Consider adding screenshot when submitting

---

## Status

- [ ] Issue submitted to GitHub
- [ ] Screenshot attached
