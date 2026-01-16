import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';

import { ProgressBar } from './components/ProgressBar';
import { TimelineNav } from './components/TimelineNav';
import { TimelineSection } from './components/TimelineSection';
import { TimelineItem } from './components/TimelineItem';
import { ContentCard } from './components/ContentCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollBackground } from './components/ScrollBackground';
import { Wrench, TrendingUp, Lightbulb, BookOpen } from 'lucide-react';

const SECTIONS = [
  {
    id: 'intro',
    title: 'Introductie',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'tle1',
    title: 'TLE 1',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tle2',
    title: 'TLE 2',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'toekomst',
    title: 'Toekomst',
    color: 'from-green-500 to-emerald-500',
  },
];

function AppContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lenis = useLenis();

  // Track active section based on scroll position
  useLenis(({ scroll }) => {
    const viewportHeight = window.innerHeight;
    const scrollCenter = scroll + viewportHeight / 2;

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = document.getElementById(SECTIONS[i].id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = scroll + rect.top;
        if (scrollCenter >= sectionTop) {
          setActiveIndex(i);
          break;
        }
      }
    }
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lenis) return;

      const navigateToSection = (index) => {
        const clampedIndex = Math.max(0, Math.min(index, SECTIONS.length - 1));
        const sectionId = SECTIONS[clampedIndex].id;
        lenis.scrollTo(`#${sectionId}`, { duration: 1.2 });
      };

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          navigateToSection(activeIndex + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          navigateToSection(activeIndex - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lenis, activeIndex]);

  return (
    <div className="min-h-screen text-white">
      <ScrollBackground />
      <ProgressBar />
      <TimelineNav sections={SECTIONS} activeIndex={activeIndex} />

      <TimelineSection
        id="intro"
        title="Mijn Groei Portfolio"
        color="from-red-500 to-rose-600"
        background={<AnimatedBackground />}
      >
        <p className="max-w-2xl text-center text-xl text-slate-300">
          Welkom! Ik ben Miles en dit is mijn signatuur over persoonlijke en
          professionele groei. Elke dag werk ik aan een betere versie van
          mezelf. Hier deel ik mijn ontwikkeling als Creatief Technoloog door
          twee TLE-periodes heen.
        </p>
      </TimelineSection>

      <TimelineSection
        id="tle1"
        title="TLE 1"
        color="from-purple-500 to-pink-500"
      >
        {/* Intro text */}
        <p className="mb-12 max-w-3xl text-lg text-slate-300">
          Tijdens de eerste periode heb ik gewerkt aan een mental health app
          waarmee gebruikers meer inzicht krijgen in hun mentale gezondheid aan
          de hand van statistieken en een AI-gegenereerde diary input.
        </p>

        {/* Timeline items */}
        <div className="mb-16 space-y-16">
          <TimelineItem
            image="/images/tle1-1.jpg"
            date="September 2025"
            title="Hypotheses & Onderzoeksvragen"
            description="Ik heb geleerd om mijn aannames en ideeën om te zetten naar hypotheses en onderzoeksvragen. Door deze te formuleren en onderzoek te doen met bronnen en fieldresearch, kon ik mijn ideeën beter onderbouwen. Deze aanpak past goed bij mijn conceptuele denkstijl."
            index={0}
          />
          <TimelineItem
            image="/images/tle1-2.jpg"
            date="Oktober 2025"
            title="Feedback & Inzichten"
            description="Sem gaf feedback dat ik de code niet goed had afgestemd bij de overgang van testdata naar echte data. Jade merkte op dat ze niet altijd wist waar ik mee bezig was. Deze feedback liet me inzien dat ik duidelijker moet communiceren over mijn werk en code."
            index={1}
          />
        </div>

        {/* Rubric cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard
            icon={<Wrench className="h-6 w-6 text-white" />}
            title="Toolkit"
            color="from-purple-500 to-pink-500"
          >
            <p>
              Ik heb geleerd met hypotheses en onderzoeksvragen te werken,
              empathy maps en persona's te maken, en de MoSCoW-methode toe te
              passen. Ook het brainstormen via toekomstscenario's paste goed bij
              mij door mijn interesse in sci-fi en fantasy verhalen schrijven.
            </p>
          </ContentCard>
          <ContentCard
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            title="Groei"
            color="from-purple-500 to-pink-500"
          >
            <p>
              <strong>Pluspunt:</strong> Ik nam een creative director rol aan
              met conceptueel denken, assertieve houding, en UI/UX bijdragen.
              <br />
              <strong>Verbeterpunt:</strong> Doorzettingsvermogen bij technische
              setbacks. Bij tegenslag vertoonde ik vluchtgedrag en zocht ik
              andere taken om uit te voeren.
            </p>
          </ContentCard>
        </div>
      </TimelineSection>

      <TimelineSection
        id="tle2"
        title="TLE 2"
        color="from-blue-500 to-cyan-500"
      >
        {/* Intro text */}
        <p className="mb-12 max-w-3xl text-lg text-slate-300">
          In de tweede periode heb ik gewerkt aan Natuurmoment: een
          webapplicatie die 13-jarigen op een speelse manier de natuur in trekt
          met een foto-bingo en route-vragen. Hier laat ik zien hoe ik ben
          gegroeid.
        </p>

        {/* Timeline items */}
        <div className="mb-16 space-y-16">
          <TimelineItem
            image="/images/tle2-1.jpg"
            date="November 2025"
            title="Crazy 8's & Figma"
            description="Ik heb het spelconcept bedacht en uitgewerkt met Crazy 8's: een concept idee met verschillende versies van de interface. Daarna werkte ik de wireframes uit in Figma. De ontwerpgerichte SPRINT-aanpak paste goed bij mij: aannames maken en snel itereren."
            index={0}
            disableParallax
          />
          <TimelineItem
            image="/images/tle2-2.jpg"
            date="December 2025"
            title="Doorzettingsvermogen & Afmaken"
            description="Waar ik bij voorgaande CLE's en TLE 1 de laatste procenten liet liggen, heb ik bij TLE 2 het project écht over de streep getrokken. Ik heb alles nagelopen, kleine UI-dingen verbeterd, en edge cases getest. Een finished product waar ik trots op ben."
            index={1}
            disableParallax
          />
        </div>

        {/* Rubric cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard
            icon={<Wrench className="h-6 w-6 text-white" />}
            title="Toolkit"
            color="from-blue-500 to-cyan-500"
          >
            <p>
              Nieuwe tools: <strong>Figma</strong> voor UI/UX design,{' '}
              <strong>Crazy 8's</strong> om snel interface-variaties te
              schetsen, en de <strong>ontwerpgerichte SPRINT-aanpak</strong>.
              UI/UX design gaat me goed af; technische backend skills wil ik nog
              verder ontwikkelen.
            </p>
          </ContentCard>
          <ContentCard
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            title="Groei"
            color="from-blue-500 to-cyan-500"
          >
            <p>
              <strong>Doorzettingsvermogen:</strong> Ondanks negatieve gedachten
              elke dag naar school en productief. Van vluchtgedrag naar het
              project echt over de streep trekken.
              <br />
              <strong>Nieuw verbeterpunt:</strong> Code uitleggen. Henk-jan en
              Antwan bevestigden dit als mijn "missing link" als CMGT'er.
            </p>
          </ContentCard>
        </div>
      </TimelineSection>

      <TimelineSection
        id="toekomst"
        title="Toekomst"
        color="from-green-500 to-emerald-500"
      >
        <p className="mb-12 max-w-3xl text-lg text-slate-300">
          Mijn visie op de toekomst: elke dag een stap vooruit. Geïnspireerd
          door het Atomic Habits-concept geloof ik in kleine dagelijkse
          verbeteringen die samen grote impact maken.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard
            icon={<BookOpen className="h-6 w-6 text-white" />}
            title="Nachtkastboek: Hooked"
            color="from-green-500 to-emerald-500"
          >
            <p>
              <strong>Hooked: How to Build Habit-Forming Products</strong>{' '}
              leerde me niet alleen hoe je producten verslavend maakt, maar ook
              wat <em>slecht</em> design is. Ik pas dit toe door user
              experiences te streamlinen: zo min mogelijk pagina's, buttons op
              logische plekken, en de user path actief volgen om frustratie te
              voorkomen.
            </p>
          </ContentCard>
          <ContentCard
            icon={<Lightbulb className="h-6 w-6 text-white" />}
            title="Ontwikkelplan"
            color="from-green-500 to-emerald-500"
          >
            <p>
              <strong>TLE 3:</strong> Code begrijpen én uitleggen - mijn
              "missing link" als CMGT'er. Na elke feature tijd nemen om alles
              echt te snappen.
              <br />
              <strong>Lange termijn:</strong> Fullstack developer worden, TLE 4
              startup ervaring, en stage bij een agency om te ontdekken of dat
              bij mij past.
            </p>
          </ContentCard>
        </div>
      </TimelineSection>

      <footer className="container mx-auto border-t border-slate-700 px-6 py-8 text-center text-slate-400">
        <p>Signatuur Opdracht - 2026</p>
      </footer>
    </div>
  );
}

function App() {
  const lenisRef = useRef(null);

  // Sync Lenis with Motion's frame loop
  useEffect(() => {
    const animate = (data) => {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    };

    frame.update(animate, true);

    return () => cancelFrame(animate);
  }, []);

  return (
    <BrowserRouter>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <AppContent />
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
