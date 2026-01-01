# Plan: /style Command Refactor

## Doel

Refactor `/style` om twee use cases te ondersteunen:
1. **Wijzigen** - Bestaande UI aanpassen (huidige functionaliteit)
2. **Genereren** - Nieuwe UI maken volgens styleguide (nieuwe functionaliteit)

---

## Huidige Structuur

```
/style
├── FASE 0: Styleguide Management
├── FASE 1: UI Identification
├── FASE 2: Change Specification
├── FASE 3: Component Location & Discovery
├── FASE 4: Implementation
└── FASE 5: Visual Testing
```

**Probleem:** Alles is gericht op "wijzigen", niet "genereren".

---

## Nieuwe Structuur

```
/style
├── FASE 0: Mode Selection (NIEUW)
│   ├── Mode A: Wijzigen (bestaande flow)
│   └── Mode B: Genereren (nieuwe flow)
│
├── FASE 1: Styleguide Management (was FASE 0)
│
├── [Als Mode A: Wijzigen]
│   ├── FASE 2a: UI Identification
│   ├── FASE 3a: Change Specification
│   ├── FASE 4a: Component Location
│   ├── FASE 5a: Implementation
│   └── FASE 6a: Visual Testing
│
└── [Als Mode B: Genereren]
    ├── FASE 2b: Generation Specification
    ├── FASE 3b: Method Selection
    ├── FASE 4b: Implementation
    └── FASE 5b: Visual Testing
```

---

## Nieuwe FASE 0: Mode Selection

```
Wat wil je doen?

1. Wijzigen - Bestaande UI aanpassen
2. Genereren - Nieuwe UI maken

Type nummer.
```

**Als "1. Wijzigen":** → Huidige flow (FASE 2a-6a)
**Als "2. Genereren":** → Nieuwe flow (FASE 2b-5b)

---

## Nieuwe Flow: Genereren (FASE 2b-5b)

### FASE 2b: Generation Specification

```
Wat wil je genereren?

1. Component - Button, Card, Form, etc.
2. Section - Hero, Features, Pricing, etc.
3. Page - Dashboard, Settings, Profile, etc.

Type nummer.
```

**Daarna:**

```
Beschrijf wat je wilt:
→ Kort en bondig, bijv. "dashboard met user stats en recente activiteit"
→ Of gedetailleerd met specifieke elementen
```

**Output:**

```
📋 GENERATION SPEC

| Field | Value |
|-------|-------|
| **Type** | {Component/Section/Page} |
| **Beschrijving** | {user input} |
| **Styleguide** | {loaded/not found} |

Gedetecteerde elementen:
- {element 1}
- {element 2}
- {element 3}

Klopt dit? (yes/no)
```

### FASE 3b: Method Selection

**Claude analyseert en detecteert of er methode-keuzes zijn:**

```
🔍 METHODE ANALYSE

[Als geen keuzes:]
Geen fundamentele methode-keuzes gedetecteerd.
→ Direct genereren met best practices.

[Als wel keuzes:]
Er zijn {N} verschillende aanpakken mogelijk:

┌─────────────────────────────────────────────────────────────┐
│ A) {Methode naam}                                           │
│    → {Korte beschrijving}                                   │
│    Complexity: ●●○○○                                        │
│    Past bij: {wanneer geschikt}                             │
├─────────────────────────────────────────────────────────────┤
│ B) {Methode naam}                                           │
│    → {Korte beschrijving}                                   │
│    Complexity: ●●●○○                                        │
│    Past bij: {wanneer geschikt}                             │
└─────────────────────────────────────────────────────────────┘

📌 Aanbeveling: Optie {X}
   {Reden}

🧪 Vergelijken: {Niet nodig / Aanbevolen}
   {Reden}

Wat wil je doen?
1. Implementeer {aanbevolen}
2. Implementeer {andere}
[Als vergelijken aanbevolen:]
3. Genereer beide (losse bestanden)
```

**Methode types die Claude kan detecteren:**

| Type | Voorbeelden |
|------|-------------|
| **Component approach** | Bestaande library vs custom components |
| **Layout approach** | CSS Grid vs Flexbox |
| **Data approach** | Static vs dynamic/fetched |
| **State approach** | Local state vs global store |
| **Styling approach** | Inline vs CSS modules vs Tailwind |

### FASE 4b: Implementation

```
🔧 GENERATING...

[Als 1 methode:]
Genereren met {methode naam}...

[Als meerdere methodes:]
Genereren variant A: {methode A}...
Genereren variant B: {methode B}...
```

**Output:**

```
✅ GENERATION COMPLETE

[Als 1 methode:]

| File | Purpose |
|------|---------|
| {path/file.tsx} | {description} |
| {path/file.css} | {description} |

[Als meerdere methodes:]

**Variant A: {methode naam}**

| File | Purpose |
|------|---------|
| {path/variant-a/file.tsx} | {description} |

**Variant B: {methode naam}**

| File | Purpose |
|------|---------|
| {path/variant-b/file.tsx} | {description} |

Vergelijk de varianten en kies welke je wilt gebruiken.
```

### FASE 5b: Visual Testing & Selection

```
📋 TESTING CHECKLIST

[Als 1 methode:]
- [ ] Component renders correct
- [ ] Styleguide tokens gebruikt
- [ ] Responsive op alle breakpoints
- [ ] Accessibility checks

[Als meerdere methodes:]
- [ ] Vergelijk beide varianten visueel
- [ ] Test interacties in beide
- [ ] Kies welke beter past

Test klaar?
→ "done" - klaar
→ "fix: [beschrijving]" - issue gevonden
→ "pick A" of "pick B" - kies variant (als meerdere)
```

**Als "pick A" of "pick B":**

```
✅ VARIANT {X} GEKOZEN

Variant {andere} bestanden verwijderd.
Variant {gekozen} behouden in {path}.
```

---

## Wijzigingen aan Bestaande Flow

### Verwijderen uit Restrictions

```diff
- **NOT for:**
- - New features (use /1-plan + /2-code)
```

### Toevoegen aan When to Use

```diff
+ **Works best with:**
+ - Styling changes (colors, spacing, fonts)
+ - Layout adjustments (component positions, structure)
+ - Component modifications (buttons, forms, inputs)
+ - UX flow tweaks (interactions, states, transitions)
+ + NEW: Generating new UI components/sections/pages following styleguide
```

---

## Voorbeelden Nieuwe Flow

### Voorbeeld 1: Simpele Component Genereren

```
/style

Mode: 2 (Genereren)
Styleguide: ✓ Loaded

Type: 1 (Component)
Beschrijving: "stat card met icon, getal en label"

Methode analyse: Geen keuzes nodig
→ Direct genereren

Output:
✓ src/components/StatCard/StatCard.tsx
✓ src/components/StatCard/StatCard.module.css
```

### Voorbeeld 2: Section met Methode Keuze

```
/style

Mode: 2 (Genereren)
Styleguide: ✓ Loaded

Type: 2 (Section)
Beschrijving: "pricing section met 3 tiers"

Methode analyse:
A) CSS Grid layout - Complexity ●●○○○
B) Flexbox layout - Complexity ●○○○○

Aanbeveling: B (simpeler voor 3 items)
Vergelijken: Niet nodig

User: 1 (implementeer aanbevolen)

Output:
✓ src/sections/Pricing/Pricing.tsx
✓ src/sections/Pricing/Pricing.module.css
```

### Voorbeeld 3: Page met Vergelijking

```
/style

Mode: 2 (Genereren)
Styleguide: ✓ Loaded

Type: 3 (Page)
Beschrijving: "admin dashboard met sidebar en content area"

Methode analyse:
A) Bestaande components - Complexity ●○○○○
B) Custom layout - Complexity ●●●○○

Vergelijken: Aanbevolen (layout keuze is visueel)

User: 3 (genereer beide)

Output:
✓ src/pages/Dashboard/variant-a/ (bestaande components)
✓ src/pages/Dashboard/variant-b/ (custom layout)

User test beide...

User: pick A

✓ Variant A behouden
✓ Variant B verwijderd
```

---

## Implementatie Stappen

### Fase 1: Basis Structuur
1. [ ] Nieuwe FASE 0: Mode Selection toevoegen
2. [ ] Bestaande fases renumberen (FASE 0 → FASE 1, etc.)
3. [ ] Branch logic na mode selection

### Fase 2: Generate Flow
4. [ ] FASE 2b: Generation Specification
5. [ ] FASE 3b: Method Selection met detection logic
6. [ ] FASE 4b: Implementation (single + multi variant)
7. [ ] FASE 5b: Testing & Selection

### Fase 3: Polish
8. [ ] Restrictions updaten
9. [ ] When to Use updaten
10. [ ] Examples toevoegen
11. [ ] Error handling voor generate flow

---

## Risico's & Mitigatie

| Risico | Mitigatie |
|--------|-----------|
| Command wordt te complex | Duidelijke mode split bij start |
| Generate flow te traag | Skip method selection als geen keuzes |
| Styleguide vereist voor genereren | Duidelijke foutmelding + redirect naar create |
| Variant vergelijking verwarrend | Duidelijke folder structuur + cleanup |

---

## Definitie of Done

- [ ] `/style` ondersteunt "wijzigen" mode (onveranderd)
- [ ] `/style` ondersteunt "genereren" mode (nieuw)
- [ ] Styleguide wordt gebruikt bij genereren
- [ ] Methode detectie werkt
- [ ] Variant vergelijking werkt
- [ ] Alle bestaande tests blijven werken
- [ ] Documentatie geüpdatet
