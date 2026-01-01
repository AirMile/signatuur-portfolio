# Portfolio Building System - Command Overzicht

> Een modulair command systeem voor het bouwen van je signatuur portfolio.
> Alle commands werken samen om een professionele, geanimeerde portfolio te creëren.

---

## Command Naamgeving

Alle commands hebben leesbare, beschrijvende namen. Bij autocomplete kunnen meerdere opties verschijnen - kies gewoon de juiste.

---

## Prioriteit Rangschikking

### 🔴 ESSENTIEEL (Eerst maken)
Commands die je direct nodig hebt om je portfolio op te bouwen.

### 🟡 BELANGRIJK (Daarna maken)
Commands die je portfolio naar een hoger niveau tillen.

### 🟢 NICE-TO-HAVE (Later maken)
Polish en extra features voor wanneer de basis staat.

---

## 🔴 ESSENTIEEL - Prioriteit 1

### 1. `/page`
**Doel:** Nieuwe pagina toevoegen met routing en navigatie.

| Aspect | Details |
|--------|---------|
| **Genereert** | React component, Route config, Nav link, Hero sectie |
| **Locatie** | `src/pages/[PageName].jsx` |
| **Voorbeeld** | `/page "Persoonlijke Groei" --hero=true` |

**Waarom essentieel:** Je hebt 4 groei-pagina's nodig (persoonlijk, professioneel, ontwerp, code).

---

### 2. `/section`
**Doel:** Content sectie toevoegen aan een bestaande pagina.

| Aspect | Details |
|--------|---------|
| **Genereert** | Section component, Layout (grid/flex/centered), Spacing |
| **Layouts** | `--layout=grid`, `--layout=centered`, `--layout=split` |
| **Voorbeeld** | `/section "Mijn Leerproces" --page=persoonlijk --layout=centered` |

**Waarom essentieel:** Elke pagina heeft meerdere secties nodig voor je verhaal.

---

### 3. `/timeline`
**Doel:** Tijdlijn component voor groei/ervaring visualisatie.

| Aspect | Details |
|--------|---------|
| **Genereert** | Timeline component, Timeline items, Animaties |
| **Orientatie** | `--orientation=vertical` of `--orientation=horizontal` |
| **Voorbeeld** | `/timeline "Groeipad" --page=persoonlijk --items=5` |

**Waarom essentieel:** Perfect voor het tonen van je groei over de 2 periodes.

---

### 4. `/theme`
**Doel:** Kleurenpalet en visuele identiteit configureren.

| Aspect | Details |
|--------|---------|
| **Genereert** | CSS custom properties, Tailwind theme config, Dark mode toggle |
| **Opties** | `--accent=purple`, `--generate-palette=true`, `--dark-mode` |
| **Voorbeeld** | `/theme --primary=#6366f1 --accent=#ec4899` |

**Waarom essentieel:** Je persoonlijke stijl is cruciaal voor een signatuur opdracht.

---

## 🟡 BELANGRIJK - Prioriteit 2

### 5. `/card`
**Doel:** Herbruikbare card component met hover effects.

| Aspect | Details |
|--------|---------|
| **Genereert** | Card component, Hover animaties, Variants |
| **Variants** | `project`, `skill`, `testimonial`, `stat` |
| **Voorbeeld** | `/card project --hover=lift --image=top` |

---

### 6. `/animate`
**Doel:** Motion animaties toevoegen aan bestaande elementen.

| Aspect | Details |
|--------|---------|
| **Genereert** | Motion wrapper, Animation config, Trigger setup |
| **Types** | `fade-in`, `slide-up`, `scale`, `stagger` |
| **Voorbeeld** | `/animate --target=.growth-cards --type=stagger --delay=0.1` |

---

### 7. `/skills`
**Doel:** Visuele skill weergave met levels.

| Aspect | Details |
|--------|---------|
| **Genereert** | Skill component, Progress bars/cards, Category filters |
| **Styles** | `bars`, `cards`, `radar`, `grid` |
| **Voorbeeld** | `/skills --style=bars --categories="Code,Design,Soft Skills"` |

---

### 8. `/blocks`
**Doel:** Content blokken toevoegen (tekst, quote, afbeelding, callout).

| Aspect | Details |
|--------|---------|
| **Genereert** | Content component naar type |
| **Types** | `text`, `quote`, `image`, `callout`, `code` |
| **Voorbeeld** | `/blocks --type=quote --author="Docent"` |

---

### 9. `/transition`
**Doel:** Page transitions tussen routes.

| Aspect | Details |
|--------|---------|
| **Genereert** | AnimatePresence wrapper, Transition config |
| **Presets** | `fade`, `slide`, `zoom`, `morph` |
| **Voorbeeld** | `/transition slide --direction=left --duration=0.3` |

---

### 10. `/project`
**Doel:** Project/case toevoegen aan portfolio.

| Aspect | Details |
|--------|---------|
| **Genereert** | Project data entry, Card, Detail pagina (optioneel) |
| **Opties** | `--tags`, `--featured`, `--case-study` |
| **Voorbeeld** | `/project "Team App" --tags="React,Tailwind" --featured` |

---

## 🟢 NICE-TO-HAVE - Prioriteit 3

### 11. `/scroll`
**Doel:** Scroll-gebaseerde animaties en parallax.

| Aspect | Details |
|--------|---------|
| **Genereert** | useScrollAnimation hook, Motion scroll config |
| **Types** | `parallax`, `reveal`, `progress-bar`, `sticky` |
| **Voorbeeld** | `/scroll parallax --speed=0.5 --target=hero-image` |

---

### 12. `/button`
**Doel:** Gestylde buttons met micro-interacties.

| Aspect | Details |
|--------|---------|
| **Genereert** | Button component, Hover/tap feedback, Loading states |
| **Styles** | `primary`, `secondary`, `ghost`, `outline` |
| **Voorbeeld** | `/button primary --icon=arrow-right --hover=slide` |

---

### 13. `/cursor`
**Doel:** Custom cursor effecten.

| Aspect | Details |
|--------|---------|
| **Genereert** | Cursor component, Hover detection, Motion tracking |
| **Effects** | `dot`, `ring`, `magnetic`, `trail` |
| **Voorbeeld** | `/cursor ring --expand-on-hover=true` |

---

### 14. `/quotes`
**Doel:** Feedback/testimonial sectie.

| Aspect | Details |
|--------|---------|
| **Genereert** | Testimonial cards, Carousel of grid, Data structuur |
| **Layouts** | `carousel`, `grid`, `featured` |
| **Voorbeeld** | `/quotes --layout=carousel --page=home` |

---

### 15. `/generate`
**Doel:** Generieke component generator.

| Aspect | Details |
|--------|---------|
| **Genereert** | Component file, Props interface, Optional animation |
| **Opties** | `--with-animation`, `--props="..."` |
| **Voorbeeld** | `/generate Badge --props="text,color,size"` |

---

### 16. `/study`
**Doel:** Uitgebreide case study pagina voor een project.

| Aspect | Details |
|--------|---------|
| **Genereert** | Gestructureerde pagina met standaard secties |
| **Secties** | Challenge, Process, Solution, Results, Learnings |
| **Voorbeeld** | `/study "Team Project" --sections="problem,process,solution,learnings"` |

---

### 17. `/export`
**Doel:** Portfolio exporteren als PDF voor offline delen.

| Aspect | Details |
|--------|---------|
| **Genereert** | Print-optimized PDF, QR code naar live site |
| **Opties** | `--pages`, `--quality`, `--include-contact` |
| **Voorbeeld** | `/export --pages="home,about,projects" --output="portfolio.pdf"` |

---

## Implementatie Volgorde

```
Week 1 - Basis Structuur
├── /page          ← Start hier
├── /section
├── /theme
└── /timeline

Week 2 - Content & Components
├── /card
├── /blocks
├── /skills
└── /project

Week 3 - Animaties & Polish
├── /animate
├── /transition
├── /scroll
└── /button

Week 4 - Extra Features
├── /cursor
├── /quotes
├── /study
└── /export
```

---

## Command Overzicht (Alfabetisch)

| Command | Categorie | Prioriteit |
|---------|-----------|------------|
| `/animate` | Animatie | 🟡 Belangrijk |
| `/blocks` | Content | 🟡 Belangrijk |
| `/button` | Component | 🟢 Nice-to-have |
| `/card` | Component | 🟡 Belangrijk |
| `/cursor` | Effect | 🟢 Nice-to-have |
| `/export` | Utility | 🟢 Nice-to-have |
| `/generate` | Utility | 🟢 Nice-to-have |
| `/page` | Structuur | 🔴 Essentieel |
| `/project` | Content | 🟡 Belangrijk |
| `/quotes` | Content | 🟢 Nice-to-have |
| `/scroll` | Animatie | 🟢 Nice-to-have |
| `/section` | Structuur | 🔴 Essentieel |
| `/skills` | Content | 🟡 Belangrijk |
| `/study` | Content | 🟢 Nice-to-have |
| `/theme` | Styling | 🔴 Essentieel |
| `/timeline` | Component | 🔴 Essentieel |
| `/transition` | Animatie | 🟡 Belangrijk |

---

*Dit document is gegenereerd op 2025-12-29 voor het School Website (Signatuur Portfolio) project.*
