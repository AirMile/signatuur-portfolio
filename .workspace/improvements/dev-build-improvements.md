# Verbeteringsplan: dev/build.md

**Aangemaakt:** 2026-01-10
**Status:** Gepland

## Samenvatting

Dit document bevat geplande verbeteringen voor `/dev:build` command.

## Prioriteit 1: Kritisch

### 1.1 Test Framework Setup Verificatie

**Impact:** Kritisch | **Effort:** Laag

**Huidige situatie:**

- build.md verwijst naar `npm run test`
- Geen check of Vitest daadwerkelijk geïnstalleerd is

**Oplossing:**
Voeg FASE 0 check toe:

````markdown
### Pre-flight Check

1. **Verify test framework:**
   - Check package.json voor vitest dependency
   - Check voor vitest.config.ts
   - If missing: Show setup instructions

2. **Required dependencies:**
   ```json
   {
     "devDependencies": {
       "vitest": "^2.1.0",
       "@testing-library/react": "^16.0.0",
       "@testing-library/user-event": "^14.5.0",
       "@testing-library/jest-dom": "^6.4.0",
       "jsdom": "^24.0.0"
     }
   }
   ```
````

3. **Required scripts:**
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage"
     }
   }
   ```

````

**Implementatie locatie:** FASE 0, voor Load Context

---

### 1.2 Playwright E2E Integration
**Impact:** Kritisch | **Effort:** Hoog

**Huidige situatie:**
- tests/e2e/ genoemd als optioneel
- Geen actual setup of instructies

**Oplossing:**
Voeg FASE 3 alternatief toe voor E2E tests:

```markdown
### E2E Test Option (Optional)

If feature requires E2E testing:

1. **Setup check:**
   - Check voor @playwright/test in devDependencies
   - Check voor playwright.config.ts

2. **E2E test file:**
   ```typescript
   // tests/e2e/{feature}.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('{Feature}', () => {
     test('should {requirement}', async ({ page }) => {
       await page.goto('/');
       // Test implementation
     });
   });
````

3. **Run command:**
   ```bash
   npx playwright test tests/e2e/{feature}.spec.ts
   ```

````

**Implementatie locatie:** FASE 3, als optionele sectie

---

### 1.3 TypeScript Type Checking
**Impact:** Hoog | **Effort:** Gemiddeld

**Huidige situatie:**
- Geen TypeScript verificatie in build proces

**Oplossing:**
Voeg type checking toe aan TDD cycle:

```markdown
### Pre-Implementation Type Check

Before GREEN phase:
1. Run: `npm run typecheck` (tsc --noEmit)
2. Fix any type errors before implementing
3. Ensures type-safe implementation

**Add to package.json:**
```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
````

````

**Implementatie locatie:** FASE 2, voor elke GREEN phase

---

## Prioriteit 2: Hoog

### 2.1 ESLint TypeScript Rules
**Impact:** Hoog | **Effort:** Gemiddeld

**Huidige situatie:**
- Geen lint check in build proces

**Oplossing:**
Voeg lint check toe:

```markdown
### Code Quality Check

After REFACTOR phase:
1. Run: `npm run lint`
2. Auto-fix: `npm run lint:fix`
3. Must pass before marking requirement complete

**Required ESLint plugins:**
- @typescript-eslint/eslint-plugin
- eslint-plugin-jsx-a11y
- eslint-plugin-import
````

**Implementatie locatie:** FASE 2, na elke REFACTOR

---

### 2.2 MSW Setup Verificatie

**Impact:** Hoog | **Effort:** Laag

**Huidige situatie:**

- MSW genoemd voor API mocking
- Geen setup instructies

**Oplossing:**
Voeg MSW setup check toe:

````markdown
### MSW Setup (for API features)

If feature involves API calls:

1. **Check dependencies:**
   ```json
   {
     "devDependencies": {
       "msw": "^2.4.0"
     }
   }
   ```
````

2. **Handler setup:**

   ```typescript
   // tests/mocks/handlers.ts
   import { http, HttpResponse } from 'msw';

   export const handlers = [
     http.get('/api/{endpoint}', () => {
       return HttpResponse.json({ data: 'mocked' });
     }),
   ];
   ```

3. **Test setup:**

   ```typescript
   // tests/setup.ts
   import { setupServer } from 'msw/node';
   import { handlers } from './mocks/handlers';

   export const server = setupServer(...handlers);

   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());
   ```

````

**Implementatie locatie:** FASE 1, bij test research

---

### 2.3 Bundle Size Checking
**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**
- Geen bundle size monitoring

**Oplossing:**
Voeg post-build check toe:

```markdown
### Bundle Size Check (FASE 5)

After build complete:
1. Run: `npm run build`
2. Analyze: `npm run build:analyze`
3. Check against budget:
   - Main bundle: < 200KB
   - Per-route chunks: < 50KB

**Setup:**
```bash
npm install -D vite-bundle-visualizer
````

```json
{
  "scripts": {
    "build:analyze": "vite build && vite-bundle-visualizer"
  }
}
```

````

**Implementatie locatie:** FASE 5, voor completion

---

## Prioriteit 3: Gemiddeld

### 3.1 Accessibility Testing
**Impact:** Gemiddeld | **Effort:** Gemiddeld

**Huidige situatie:**
- Geen accessibility tests

**Oplossing:**
Voeg axe-core testing toe:

```markdown
### Accessibility Tests

For UI components, add a11y tests:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
````

**Setup:**

```bash
npm install -D jest-axe @types/jest-axe
```

````

**Implementatie locatie:** FASE 2, bij component tests

---

### 3.2 Coverage Thresholds
**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**
- Geen coverage requirements

**Oplossing:**
Voeg coverage check toe:

```markdown
### Coverage Requirements

Minimum coverage per feature:
- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

**vitest.config.ts:**
```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});
````

````

**Implementatie locatie:** FASE 5, bij completion check

---

### 3.3 Snapshot Testing Option
**Impact:** Laag-Gemiddeld | **Effort:** Laag

**Huidige situatie:**
- Geen snapshot testing

**Oplossing:**
Voeg optional snapshot tests toe:

```markdown
### Snapshot Tests (Optional)

For stable UI components:

```typescript
it('should match snapshot', () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});
````

**When to use:**

- Stable UI components
- NOT for frequently changing components
- NOT for components with dynamic content

````

**Implementatie locatie:** FASE 2, als optionele test type

---

## Prioriteit 4: Laag

### 4.1 Visual Regression Testing
- Chromatic/Percy integration
- Screenshot comparison
- Defer tot design system stabiel is

### 4.2 Performance Testing
- Lighthouse CI in build
- Web Vitals monitoring
- Bundle analyzer thresholds

### 4.3 Storybook Auto-Generation
- Generate stories from components
- Integration with test runner
- Defer tot Storybook nodig is

---

## Implementatie Volgorde

1. **Week 1:** 1.1 Test framework check, 1.3 TypeScript check
2. **Week 2:** 2.1 ESLint rules, 2.2 MSW setup
3. **Week 3:** 1.2 Playwright E2E, 2.3 Bundle size
4. **Week 4:** 3.1 Accessibility, 3.2 Coverage
5. **Later:** Visual regression, Performance, Storybook

---

## Test Command Reference

```bash
# Unit tests
npm run test                    # Run all
npm run test -- --watch         # Watch mode
npm run test -- {file}          # Specific file
npm run test -- --coverage      # With coverage

# Type checking
npm run typecheck               # tsc --noEmit

# Linting
npm run lint                    # Check
npm run lint:fix                # Auto-fix

# E2E (optional)
npx playwright test             # Run all
npx playwright test --ui        # UI mode

# Build analysis
npm run build                   # Production build
npm run build:analyze           # Bundle visualizer
````

---

## Notities

- Test framework setup is BLOCKING - niets werkt zonder
- TypeScript check voorkomt runtime errors
- ESLint + a11y rules vangen veel bugs vroeg
- Coverage thresholds zijn guidelines, niet hard blocks
