# Feature Intent: Portfolio Timeline

## Overview

| Field | Value |
|-------|-------|
| **Feature Name** | timeline |
| **Task Type** | FEATURE |
| **Created** | 2025-12-30 |
| **Complexity** | 42/100 (SINGLE_TASK) |
| **Status** | Planning Complete |

## Description

Horizontale scroll-based timeline voor portfolio assessment (Signatuur). Toont ontwikkeling als Creatief Technoloog over drie periodes: TLE 1, TLE 2, en Toekomst. Elk tijdlijnpunt is een accordion item dat uitklapt met beschrijving en reflectie.

## Context

Dit is onderdeel van een schoolopdracht (Signatuur) waarbij de student beoordeeld wordt op:
- **5a. Toolkit**: Theorie en methoden geleerd in TLE 1+2
- **5b. Groei**: Reflectie op samenwerking, plus/minpunten, SMART actiepunten
- **5c. Toekomst**: Nachtkastboek inzichten, toekomstplan vakgebied

## Functional Requirements

### Layout
- Eén doorlopende horizontale timeline met 3 secties naast elkaar
- Secties: TLE 1 → TLE 2 → Toekomst
- Horizontale scroll-based navigatie (hele pagina scrollt horizontaal)
- Desktop-only (geen mobiele ondersteuning vereist)

### Categorieën
- **Toolkit**: Theorie, methoden, frameworks, technieken (blauw)
- **Groei**: Reflectie, plus/minpunten, samenwerking (paars/groen)
- **Projecten**: Concrete opdrachten en bijdragen (oranje)

### Interactie
- Items zijn klikbaar en klappen uit (accordion)
- Slechts één item tegelijk uitgeklapt
- Subtiele entrance animaties bij in-view komen (fade/slide)

### Content per item
- Titel
- Beschrijving
- Reflectie

### Data
- Hardcoded in component (geen externe bron)

## Data Model

```javascript
{
  id: string,           // Unique identifier (e.g., "tle1-toolkit-1")
  period: 'TLE1' | 'TLE2' | 'Toekomst',
  category: 'Toolkit' | 'Groei' | 'Projecten',
  title: string,        // Korte titel van het leermoment
  description: string,  // Beschrijving wat je hebt geleerd
  reflection: string    // Reflectie: wat zou je anders doen?
}
```

## Testable Requirements

| ID | Description | Category | Test Type | Passes |
|----|-------------|----------|-----------|--------|
| REQ-001 | Doorlopende horizontale timeline met 3 secties (TLE1 → TLE2 → Toekomst) | core | manual | false |
| REQ-002 | Items zijn klikbaar en klappen uit met beschrijving + reflectie | core | manual | false |
| REQ-003 | Items hebben kleurcodering per categorie (Toolkit/Groei/Projecten) | core | manual | false |
| REQ-004 | Subtiele entrance animaties bij in-view komen (fade/slide) | core | manual | false |
| REQ-005 | Data is hardcoded in component | core | automated_unit | false |
| REQ-006 | Elke sectie heeft duidelijke header (TLE 1 / TLE 2 / Toekomst) | ui | manual | false |
| REQ-007 | Uitgeklapte items tonen titel, beschrijving en reflectie | ui | manual | false |
| REQ-008 | Visuele scheiding tussen secties is duidelijk | ui | manual | false |
| REQ-009 | Desktop-only, geen mobiele ondersteuning vereist | edge_case | manual | false |
| REQ-010 | Lege sectie toont placeholder of wordt verborgen | edge_case | manual | false |
| REQ-011 | Slechts één item kan tegelijk uitgeklapt zijn (accordion) | edge_case | manual | false |
| REQ-012 | Horizontale scroll-based navigatie | core | manual | false |

## Constraints

- Desktop-only (geen responsive design voor mobiel)
- Data hardcoded (geen API/CMS integratie)
- Moet passen binnen bestaande dark theme (slate-800/900 kleuren)
- Gebruik bestaande stack: React 19, Tailwind CSS v4, Motion

## Success Criteria

1. Timeline toont alle 3 periodes (TLE 1, TLE 2, Toekomst) naast elkaar
2. Horizontaal scrollen navigeert door de timeline
3. Accordion items klappen correct uit (één tegelijk)
4. Categorie kleuren zijn duidelijk zichtbaar
5. Entrance animaties zijn subtiel en smooth
6. Past visueel bij bestaande GrowthCard styling

## Out of Scope

- Mobiele/responsive layout
- API/database integratie
- Admin interface voor content beheer
- Print styling
- Accessibility beyond basic keyboard navigation
