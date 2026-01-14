# Verbeteringsplan: dev/backlog.md

**Aangemaakt:** 2026-01-10
**Status:** Gepland

## Samenvatting

Dit document bevat geplande verbeteringen voor `/dev:backlog` command.

## Prioriteit 1: Kritisch

### 1.1 Framework Auto-Detectie

**Impact:** Hoog | **Effort:** Laag

**Huidige situatie:**

- Backlog veronderstelt React SPA
- Geen detectie voor Next.js, Remix, etc.

**Oplossing:**

- FASE 0: Scan package.json voor framework dependencies
- Detecteer: next, remix, @sveltejs/kit, nuxt
- Output: "Framework detected: [React SPA|Next.js|Remix]"
- Pas workflow aan op basis van framework

**Implementatie locatie:** FASE 0, na scenario check

---

### 1.2 Package.json Dependency Analyse

**Impact:** Hoog | **Effort:** Gemiddeld

**Huidige situatie:**

- Geen automatische feature suggesties uit dependencies

**Oplossing:**

- Parse dependencies uit package.json
- Map naar feature types:
  - stripe/paypal → INTEGRATION feature
  - @tanstack/react-query → API feature
  - motion/framer-motion → UI feature
- Auto-suggest features in FASE 1

**Implementatie locatie:** FASE 1, voor feature extraction

---

### 1.3 Route-Mapping van Project

**Impact:** Hoog | **Effort:** Gemiddeld

**Huidige situatie:**

- Features worden handmatig geëxtraheerd

**Oplossing:**

- Scan src/ folder structuur
- Detecteer bestaande routes/pages
- Pre-populate feature lijst met bestaande componenten
- Voeg "existing" marker toe

**Implementatie locatie:** FASE 1, als pre-analysis stap

---

## Prioriteit 2: Hoog

### 2.1 GitHub Issues Sync

**Impact:** Hoog | **Effort:** Hoog

**Huidige situatie:**

- Output alleen naar .workspace/backlog.md

**Oplossing:**

- Voeg optie toe: "--sync-issues"
- Genereer GitHub issues via gh CLI
- Map features naar issues met labels (MVP, Phase2, type)
- Bi-directional sync (issues ↔ backlog)

**Implementatie locatie:** FASE 4, als output optie

---

### 2.2 RICE/MoSCoW Prioritering

**Impact:** Hoog | **Effort:** Laag

**Huidige situatie:**

- Simpele MVP/Phase2/Phase3 prioritering

**Oplossing:**

- Voeg AskUserQuestion toe in FASE 3:
  - "MoSCoW method" - Must/Should/Could/Won't
  - "RICE method" - Reach/Impact/Confidence/Effort
  - "Simple (current)" - MVP/Phase2/Phase3
- Pas output format aan per methode

**Implementatie locatie:** FASE 3, voor priority assignment

---

### 2.3 Cirkeldetectie Automatie

**Impact:** Gemiddeld | **Effort:** Gemiddeld

**Huidige situatie:**

- Detecteert circulaire dependencies maar vraagt user

**Oplossing:**

- Auto-suggest break points
- Algoritme: vind kleinste feature om te splitsen
- Toon concrete suggestie: "Split feature X into X-core en X-extended"

**Implementatie locatie:** FASE 2, na dependency mapping

---

## Prioriteit 3: Gemiddeld

### 3.1 State Management Detection

**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**

- Geen detectie van bestaande state patterns

**Oplossing:**

- Scan voor Redux/Zustand/Jotai/Context usage
- Voeg als "existing infrastructure" toe
- Suggest API features die state nodig hebben

**Implementatie locatie:** FASE 1, bij dependency analyse

---

### 3.2 Component Granulariteit Guidance

**Impact:** Gemiddeld | **Effort:** Laag

**Huidige situatie:**

- Best practice sectie is algemeen

**Oplossing:**

- Voeg decision tree toe:
  - Is het reusable? → FEATURE
  - Alleen styling? → UI
  - Core business logic? → FEATURE
  - External service? → INTEGRATION

**Implementatie locatie:** Best Practices sectie

---

### 3.3 Git History Analysis

**Impact:** Gemiddeld | **Effort:** Hoog

**Huidige situatie:**

- Geen analyse van bestaande commits

**Oplossing:**

- Parse git log voor feature patterns
- Detecteer recent gewijzigde areas
- Suggest features gebaseerd op commit messages

**Implementatie locatie:** FASE 0, als optionele analyse

---

## Prioriteit 4: Laag

### 4.1 Team Ownership Assignment

**Impact:** Laag | **Effort:** Laag

- Optioneel: voeg team member assignment toe per feature
- Relevant voor team projecten

### 4.2 Risk/Complexity Scoring

**Impact:** Laag | **Effort:** Gemiddeld

- Voeg complexity score (1-5) per feature
- Auto-flag high complexity features
- Suggest splitting als score > 4

---

## Implementatie Volgorde

1. **Week 1:** 1.1 Framework detectie, 2.2 Prioriteringsmethoden
2. **Week 2:** 1.2 Package.json analyse, 1.3 Route-mapping
3. **Week 3:** 2.1 GitHub Issues, 2.3 Cirkeldetectie
4. **Later:** State detection, Git history, Team ownership

---

## Notities

- Alle wijzigingen moeten backwards-compatible zijn
- Bestaande workflow moet blijven werken
- Nieuwe features zijn opt-in waar mogelijk
