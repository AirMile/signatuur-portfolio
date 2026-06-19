# Signatuur Portfolio - Miles Zeilstra

Mijn persoonlijke groeiportfolio voor de Signatuuropdracht. Ik laat zien hoe ik me als Creatief Technoloog heb ontwikkeld over vier TLE-periodes. De rode draad komt uit mijn nachtkastboek The Subtle Art of Not Giving a F\*ck: bewust kiezen waar je je aandacht aan besteedt.

## Bekijken

Live website: https://signatuur-portfolio.vercel.app/

Lokaal draaien:

```bash
npm install
npm run dev      # dev-server op localhost:5173
npm run build    # productie-build naar dist/
npm run preview  # preview van de productie-build
```

## Inhoud

De site is een doorlopend scrollverhaal met zes secties:

- Introductie: wie ik ben en hoe ik naar mijn eigen groei kijk.
- TLE 1: mental health app. Werken met hypotheses, onderzoeksvragen en feedback.
- TLE 2: Natuurmoment, een foto-bingo webapp. Doorzettingsvermogen en een project echt afmaken.
- TLE 3: SonarPoppy, een ethisch AI-aanbevelingssysteem als REST API. Mijn werk aan het scoringsalgoritme.
- TLE 4: Impakt, een React Native app. Verantwoordelijkheden verdelen en het team zelfstandiger maken.
- Toekomst: inzichten uit mijn nachtkastboeken en mijn plan voor de stage en daarna.

## Tech Stack

- React 19 en Vite 7
- Tailwind CSS v4
- Motion (Framer Motion) voor animaties
- Lenis voor smooth scroll
- React Router DOM v7
- Lucide React voor iconen

## Structuur

- `src/data/content.json`: alle teksten van het portfolio op een plek.
- `src/components/`: de losse onderdelen zoals timeline, toolkit, groei, reflecties en roadmap.
- `src/App.jsx`: zet de secties in elkaar.
