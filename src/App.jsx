import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';

import { ProgressBar } from './components/ProgressBar';
import { TimelineNav } from './components/TimelineNav';
import { TimelineSection } from './components/TimelineSection';
import { TimelineItem } from './components/TimelineItem';
import { ContentCard } from './components/ContentCard';
import { Wrench, TrendingUp, Lightbulb, BookOpen } from 'lucide-react';

const SECTIONS = [
  {
    id: 'intro',
    title: 'Introductie',
    period: null,
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: 'tle1',
    title: 'TLE 1',
    period: 'Periode 1',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tle2',
    title: 'TLE 2',
    period: 'Periode 2',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'toekomst',
    title: 'Toekomst',
    period: null,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <ProgressBar />
      <TimelineNav sections={SECTIONS} activeIndex={activeIndex} />

      <TimelineSection
        id="intro"
        title="Mijn Groei Portfolio"
        color="from-slate-500 to-slate-700"
      >
        <p className="max-w-2xl text-center text-xl text-slate-300">
          Welkom! Ik ben [JOUW NAAM] en dit is mijn portfolio over persoonlijke
          groei. Hier deel ik mijn ervaringen uit twee periodes van teamwerk,
          wat ik heb geleerd, en waar ik naartoe wil groeien.
        </p>
      </TimelineSection>

      <TimelineSection
        id="tle1"
        title="TLE 1"
        period="Periode 1"
        color="from-purple-500 to-pink-500"
      >
        {/* Intro text */}
        <p className="mb-12 max-w-3xl text-lg text-slate-300">
          Tijdens de eerste periode heb ik gewerkt aan [PROJECT NAAM]. Hier laat
          ik zien wat ik heb geleerd en hoe ik ben gegroeid.
        </p>

        {/* Timeline items - placeholder images, user will add real ones */}
        <div className="mb-16 space-y-16">
          <TimelineItem
            image="/images/tle1-1.jpg"
            date="September 2025"
            title="[Titel moment 1]"
            description="[Beschrijf wat je hier hebt geleerd of gedaan. Voeg details toe over de context en je rol.]"
            index={0}
            tags={['Toolkit']}
          />
          <TimelineItem
            image="/images/tle1-2.jpg"
            date="Oktober 2025"
            title="[Titel moment 2]"
            description="[Beschrijf een ander belangrijk moment. Focus op je groei en samenwerking.]"
            index={1}
            tags={['Groei']}
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
              [Welke theorie en methoden heb je geleerd? Hoe heb je ze
              toegepast?]
            </p>
          </ContentCard>
          <ContentCard
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            title="Groei"
            color="from-purple-500 to-pink-500"
          >
            <p>
              [Wat zijn je plus- en verbeterpunten? Welke rol speelde je in het
              team?]
            </p>
          </ContentCard>
        </div>
      </TimelineSection>

      <TimelineSection
        id="tle2"
        title="TLE 2"
        period="Periode 2"
        color="from-blue-500 to-cyan-500"
      >
        {/* Intro text */}
        <p className="mb-12 max-w-3xl text-lg text-slate-300">
          In de tweede periode heb ik gewerkt aan [PROJECT NAAM]. Hier laat ik
          zien hoe ik ben gegroeid ten opzichte van TLE 1.
        </p>

        {/* Timeline items */}
        <div className="mb-16 space-y-16">
          <TimelineItem
            image="/images/tle2-1.jpg"
            date="November 2025"
            title="[Titel moment 1]"
            description="[Beschrijf wat je hier hebt geleerd of gedaan. Laat zien hoe je bent gegroeid sinds TLE 1.]"
            index={0}
            tags={['Toolkit', 'Groei']}
          />
          <TimelineItem
            image="/images/tle2-2.jpg"
            date="December 2025"
            title="[Titel moment 2]"
            description="[Beschrijf een ander belangrijk moment. Focus op je SMART actiepunten en hoe je die hebt toegepast.]"
            index={1}
            tags={['Groei']}
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
              [Welke nieuwe theorie en methoden heb je geleerd? Hoe verhoudt dit
              zich tot TLE 1?]
            </p>
          </ContentCard>
          <ContentCard
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            title="Groei"
            color="from-blue-500 to-cyan-500"
          >
            <p>
              [Hoe heb je je SMART actiepunten uit TLE 1 toegepast? Wat zijn je
              nieuwe inzichten?]
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
          Mijn visie op de toekomst en hoe het nachtkastboek mijn kijk op het
          vakgebied heeft beinvloed.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard
            icon={<BookOpen className="h-6 w-6 text-white" />}
            title="Nachtkastboek"
            color="from-green-500 to-emerald-500"
          >
            <p>
              [Welk boek heb je gelezen? Welke inzichten heb je eruit gehaald?]
            </p>
          </ContentCard>
          <ContentCard
            icon={<Lightbulb className="h-6 w-6 text-white" />}
            title="Ontwikkelplan"
            color="from-green-500 to-emerald-500"
          >
            <p>
              [Hoe wil je je in de toekomst verder ontwikkelen? Wat zijn je
              concrete doelen?]
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
