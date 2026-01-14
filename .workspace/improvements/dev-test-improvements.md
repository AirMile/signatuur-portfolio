# Verbeteringsplan: dev/test.md

**Aangemaakt:** 2026-01-10
**Status:** Gepland

## Samenvatting

Dit document bevat geplande verbeteringen voor `/dev:test` command.

## Prioriteit 1: Hoog Impact

### 1.1 Auto-Browser Launch

**Impact:** Hoog | **Effort:** Laag

**Huidige situatie:**

- User moet handmatig browser openen
- Moet zelf navigeren naar juiste pagina

**Oplossing:**
Voeg automatische browser launch toe in FASE 0:

```markdown
### Auto-Launch Browser

After loading test checklist:

\`\`\`bash

# Open browser at correct URL

start http://localhost:5173/{feature-path}

# Or with specific browser

start chrome http://localhost:5173/{feature-path}
\`\`\`

**Determine feature-path from:**

1. Read 01-define.md for route/page info
2. Extract from feature name (contact-form -> /contact)
3. Ask user if unclear
```

**Implementatie locatie:** FASE 0, na checklist load

---

### 1.2 Screenshot Capture bij Failures

**Impact:** Hoog | **Effort:** Gemiddeld

**Huidige situatie:**

- Alleen tekstuele feedback
- Geen visuele referentie

**Oplossing:**
Voeg screenshot instructies toe bij failures:

```markdown
### Screenshot Capture

When user reports FAIL:

1. **Ask for screenshot:**
   "Kun je een screenshot maken van het probleem?"

2. **Save location:**
   .workspace/features/{feature}/screenshots/

3. **Naming convention:**
   {item-number}-{timestamp}.png
   Example: 3-20260110-143022.png

4. **Include in test results:**
   Reference screenshots in 03-test-results.md
```

**Optional automation (future):**

- Browser extension voor 1-click capture
- Clipboard paste support

**Implementatie locatie:** FASE 1, bij feedback parsing

---

### 1.3 Test Mode Indicator UI

**Impact:** Gemiddeld-Hoog | **Effort:** Gemiddeld

**Huidige situatie:**

- Geen visuele indicatie dat testing actief is
- User kan vergeten welke stap ze testen

**Oplossing:**
Suggest test overlay component:

```markdown
### Test Mode Overlay (Recommended)

Add a test indicator component:

\`\`\`tsx
// src/components/dev/TestModeIndicator.tsx
export function TestModeIndicator({
featureName,
currentStep
}: Props) {
if (process.env.NODE_ENV !== 'development') return null;

return (
<div className="fixed top-0 right-0 bg-yellow-400 p-2 z-50">
TEST MODE: {featureName}
<br />
Step: {currentStep}
</div>
);
}
\`\`\`

**Usage:**

- Add to app during testing
- Shows current test step
- Remove after testing complete
```

**Implementatie locatie:** Best Practices sectie, als aanbeveling

---

## Prioriteit 2: Gemiddeld Impact

### 2.1 Lighthouse Audit bij Completion

**Impact:** Hoog | **Effort:** Laag-Gemiddeld

**Huidige situatie:**

- Geen automatische quality checks

**Oplossing:**
Voeg FASE 7 toe (na completion):

```markdown
### FASE 7: Automated Quality Checks (NEW)

After all manual tests pass:

1. **Run Lighthouse audit:**
   \`\`\`bash
   npx lighthouse http://localhost:5173/{page} --output=json --output-path=.workspace/features/{feature}/lighthouse.json
   \`\`\`

2. **Check scores:**
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 80
   - SEO: > 80 (if applicable)

3. **Report:**
   Add scores to 03-test-results.md:
   \`\`\`markdown
   ## Lighthouse Scores
   | Category       | Score | Status |
   | -------------- | ----- | ------ |
   | Performance    | 92    | PASS   |
   | Accessibility  | 95    | PASS   |
   | Best Practices | 87    | PASS   |
   | SEO            | 100   | PASS   |
   \`\`\`
```

**Implementatie locatie:** Nieuwe FASE 7, na FASE 6

---

### 2.2 Accessibility Audit (axe-core)

**Impact:** Hoog | **Effort:** Laag

**Huidige situatie:**

- Geen accessibility verificatie

**Oplossing:**
Voeg a11y check toe in FASE 7:

```markdown
### Accessibility Audit

Run axe-core scan:

**Browser method:**

1. Install axe DevTools browser extension
2. Open DevTools -> axe tab
3. Click "Scan ALL of my page"
4. Report critical/serious issues

**CLI method (optional):**
\`\`\`bash
npx axe http://localhost:5173/{page} --exit
\`\`\`

**Categorize issues:**

- Critical: Must fix before completion
- Serious: Should fix
- Moderate/Minor: Nice to have
```

**Implementatie locatie:** FASE 7, na Lighthouse

---

### 2.3 Console Log Export

**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**

- User moet handmatig console checken
- Geen export functionaliteit

**Oplossing:**
Voeg console export instructies toe:

```markdown
### Console Log Export

When debugging issues:

1. **Open DevTools Console (F12)**
2. **Right-click in console**
3. **Select "Save as..."**
4. **Save to:** .workspace/features/{feature}/console-{timestamp}.log

**Parse log for:**

- Errors (red)
- Warnings (yellow)
- Failed network requests
```

**Implementatie locatie:** FASE 1b, bij debug analysis

---

### 2.4 Broken Link Checker

**Impact:** Gemiddeld | **Effort:** Laag-Gemiddeld

**Huidige situatie:**

- Geen link verificatie

**Oplossing:**
Voeg link check toe in FASE 7:

```markdown
### Broken Link Check

After feature complete:

\`\`\`bash
npx broken-link-checker http://localhost:5173/{page} --recursive
\`\`\`

**Report format:**
| URL | Status | Location |
|-----|--------|----------|
| /about | 404 | Header nav |
| /api/data | 500 | Dashboard |

**Fix priority:**

- Internal links: High
- External links: Medium
- Anchor links: Low
```

**Implementatie locatie:** FASE 7, als laatste check

---

## Prioriteit 3: Laag-Gemiddeld Impact

### 3.1 React State Snapshots

**Impact:** Gemiddeld | **Effort:** Gemiddeld

**Huidige situatie:**

- Geen state capture bij bugs

**Oplossing:**
Voeg React DevTools instructies toe:

```markdown
### React State Debugging

When state-related bug suspected:

1. **Open React DevTools**
2. **Select component**
3. **Click "Copy" on state/props**
4. **Paste in feedback:**
   \`\`\`
   3:FAIL state incorrect
   State: { count: 0, expected: 5 }
   \`\`\`

**Helps identify:**

- State not updating
- Wrong initial state
- Props not passed correctly
```

**Implementatie locatie:** FASE 1b, bij debug analysis

---

### 3.2 Video Recording

**Impact:** Gemiddeld | **Effort:** Hoog

**Huidige situatie:**

- Geen video capture

**Oplossing:**
Voeg video instructies toe:

```markdown
### Video Recording (Optional)

For complex interaction bugs:

**Browser method:**

1. Open DevTools -> Performance tab
2. Click record
3. Perform action
4. Stop recording
5. Export as JSON

**Screen recording:**

- Windows: Win+G (Game Bar)
- Mac: Cmd+Shift+5
- Save to: .workspace/features/{feature}/videos/

**When useful:**

- Race conditions
- Animation timing issues
- Multi-step interactions
```

**Implementatie locatie:** FASE 3, voor complexe issues

---

### 3.3 Network Request Analysis

**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**

- Network tab genoemd maar niet uitgelegd

**Oplossing:**
Voeg gedetailleerde network instructies toe:

```markdown
### Network Analysis

When API-related issue:

1. **Open Network tab (F12)**
2. **Filter by Fetch/XHR**
3. **Reproduce the issue**
4. **For failed request, report:**
   - URL
   - Status code
   - Response body (if any)
   - Request payload

**Export:**

- Right-click -> Copy as cURL
- Paste in feedback

**Common issues:**

- 401: Auth token expired
- 404: Wrong endpoint
- 500: Server error
- CORS: Missing headers
```

**Implementatie locatie:** FASE 1b, bij debug analysis

---

## Prioriteit 4: Laag Impact

### 4.1 Multi-Browser Testing

**Impact:** Laag-Gemiddeld | **Effort:** Hoog

- Test in Chrome, Firefox, Safari
- BrowserStack/Sauce Labs integration
- Defer tot cross-browser issues arise

### 4.2 Mobile Viewport Testing

**Impact:** Laag-Gemiddeld | **Effort:** Gemiddeld

- DevTools device emulation
- Real device testing
- Touch event simulation

### 4.3 Network Throttling

**Impact:** Laag | **Effort:** Low

- Simulate slow connections
- DevTools -> Network -> Throttling
- Test loading states

### 4.4 Performance Profiling Dashboard

**Impact:** Laag | **Effort:** Hoog

- Component render times
- Memory usage
- Defer tot performance issues arise

---

## Implementatie Volgorde

1. **Week 1:** 1.1 Auto-browser launch, 2.3 Console export
2. **Week 2:** 1.2 Screenshots, 2.1 Lighthouse
3. **Week 3:** 2.2 Accessibility, 2.4 Link checker
4. **Week 4:** 1.3 Test indicator, 3.1 State snapshots
5. **Later:** Video, Multi-browser, Performance

---

## Updated Workflow

```
FASE 0: Load Context + Auto-launch browser
FASE 1: Parse Feedback + Screenshot capture
FASE 1b: Debug Analysis (console, network, state)
FASE 2: Categorize Issues
FASE 3: Fix Loop
FASE 4: Re-test Checklist
FASE 5: Re-test Loop
FASE 6: Completion + Backlog sync
FASE 7: Quality Checks (NEW)
  ├── Lighthouse audit
  ├── Accessibility audit
  └── Broken link check
```

---

## Quick Reference Commands

```bash
# Lighthouse audit
npx lighthouse http://localhost:5173/{page} --view

# Accessibility check
npx axe http://localhost:5173/{page}

# Broken links
npx broken-link-checker http://localhost:5173 -ro

# Screenshot (PowerShell)
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.Screen]::PrimaryScreen | ...
```

---

## Notities

- Auto-browser launch is quick win met grote UX impact
- Screenshots maken debug VEEL sneller
- Lighthouse/a11y audits vangen issues die manual testing mist
- Video recording is overkill voor meeste cases
- Focus op snelle feedback loops
