import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';

import { ProgressBar } from './components/ProgressBar';
import { TimelineSection } from './components/TimelineSection';
import { TimelineItem } from './components/TimelineItem';
import { EndpointList } from './components/EndpointList';
import { ScoreExplain } from './components/ScoreExplain';
import { ReflectionBlock } from './components/ReflectionBlock';
import { ToolkitCard } from './components/ToolkitCard';
import { GrowthCard } from './components/GrowthCard';
import { Roadmap } from './components/Roadmap';
import { ScrollBackground } from './components/ScrollBackground';
import content from './data/content.json';

const SECTIONS = [
  {
    id: 'intro',
    title: 'Introductie',
    color: 'from-[var(--gradient-intro-from)] to-[var(--gradient-intro-to)]',
  },
  {
    id: 'tle1',
    title: 'TLE 1',
    color: 'from-[var(--gradient-tle1-from)] to-[var(--gradient-tle1-to)]',
  },
  {
    id: 'tle2',
    title: 'TLE 2',
    color: 'from-[var(--gradient-tle2-from)] to-[var(--gradient-tle2-to)]',
  },
  {
    id: 'tle3',
    title: 'TLE 3',
    color: 'from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]',
  },
  {
    id: 'tle4',
    title: 'TLE 4',
    color: 'from-[var(--gradient-tle4-from)] to-[var(--gradient-tle4-to)]',
  },
  {
    id: 'toekomst',
    title: 'Toekomst',
    color:
      'from-[var(--gradient-toekomst-from)] to-[var(--gradient-toekomst-to)]',
  },
];

// Sectie-accentkleuren per id (presentatie, geen content).
const SECTION_ACCENTS = {
  tle1: 'var(--color-accent-tle1)',
  tle2: 'var(--color-accent-tle2)',
  tle3: 'var(--color-accent-tle3)',
  tle4: 'var(--color-accent-tle4)',
  toekomst: 'var(--color-accent-toekomst)',
};

// Genummerde eyebrow-meta per sectie, afgeleid uit SECTIONS (nummer + label).
// De intro is de hero en krijgt geen genummerde eyebrow.
const SECTION_META = SECTIONS.reduce((acc, section, i) => {
  acc[section.id] = {
    number: String(i).padStart(2, '0'),
    eyebrow: section.title,
    accent: SECTION_ACCENTS[section.id],
  };
  return acc;
}, {});

/**
 * TleRubricSection — gedeelde layout voor TLE 1, 2 en 4: intro-tekst,
 * twee timeline-items en de rubric-rij (Toolkit + Groei). Content komt uit
 * content.json; kleuren (gradient/accent) blijven props omdat dat presentatie is.
 */
function TleRubricSection({ id, data, gradient }) {
  const meta = SECTION_META[id];
  return (
    <TimelineSection
      id={id}
      title={data.title}
      color={gradient}
      sectionNumber={meta.number}
      eyebrow={meta.eyebrow}
      accent={meta.accent}
    >
      <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
        {data.intro}
      </p>

      <div className="mb-16 space-y-16">
        {data.timeline.map((item, i) => (
          <TimelineItem
            key={i}
            image={item.image}
            date={item.date}
            title={item.title}
            description={item.description}
            index={i}
            disableParallax={item.disableParallax}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <ToolkitCard accent={meta.accent} tools={data.toolkit.tools}>
          {data.toolkit.body}
        </ToolkitCard>
        <GrowthCard
          label={data.growth.label}
          items={data.growth.items}
          accent={meta.accent}
        />
      </div>
    </TimelineSection>
  );
}

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
    <div className="relative min-h-screen text-[var(--color-dark)]">
      <a
        href="#hoofdinhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-light-gray)] focus:px-4 focus:py-2 focus:text-[var(--color-dark)] focus:shadow-lg"
      >
        {content.ui.skipLink}
      </a>
      <ScrollBackground />
      <ProgressBar color={SECTIONS[activeIndex].color} />
      <main id="hoofdinhoud" tabIndex={-1} className="outline-none">
        <TimelineSection
          id="intro"
          title={content.intro.title}
          titleAs="h1"
          color="from-[var(--gradient-intro-from)] to-[var(--gradient-intro-to)]"
          isHero
          eyebrow={content.intro.eyebrow}
        >
          {content.intro.meta && (
            <p className="text-base font-medium text-[var(--color-dark)]">
              {content.intro.meta}
            </p>
          )}
          <p className="max-w-3xl text-left text-base text-[var(--color-body)] md:text-xl">
            {content.intro.body}
          </p>
        </TimelineSection>

        <TleRubricSection
          id="tle1"
          data={content.tle1}
          gradient="from-[var(--gradient-tle1-from)] to-[var(--gradient-tle1-to)]"
        />

        <TleRubricSection
          id="tle2"
          data={content.tle2}
          gradient="from-[var(--gradient-tle2-from)] to-[var(--gradient-tle2-to)]"
        />

        <TimelineSection
          id="tle3"
          title={content.tle3.title}
          color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
          sectionNumber={SECTION_META.tle3.number}
          eyebrow={SECTION_META.tle3.eyebrow}
          accent={SECTION_META.tle3.accent}
        >
          {/* Intro */}
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            {content.tle3.intro}
          </p>

          {/* Timeline items */}
          <div className="mb-16 space-y-16">
            {content.tle3.timeline.map((item, i) => (
              <TimelineItem
                key={i}
                image={item.image}
                date={item.date}
                title={item.title}
                description={item.description}
                index={i}
              />
            ))}
          </div>

          {/* Wat ik bouwde — endpoints + score-opbouw als één API-docs-blok
              op gedeelde breedte, zodat beide netjes uitlijnen i.p.v. een
              smalle lijst met lege ruimte ernaast. */}
          <div className="mb-16 max-w-3xl space-y-10">
            <div>
              <h3 className="mb-6 text-xl font-semibold text-[var(--color-dark)]">
                {content.ui.tle3BuiltHeading}
              </h3>
              <EndpointList endpoints={content.tle3.endpoints} />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-[var(--color-accent-tle3)] uppercase">
                {content.ui.tle3ScoreHeading}
              </p>
              <ScoreExplain
                route={content.tle3.scoreExplain.route}
                example={content.tle3.scoreExplain.example}
                steps={content.tle3.scoreExplain.steps}
                finalScore={content.tle3.scoreExplain.finalScore}
                note={content.tle3.scoreExplain.note}
              />
            </div>
          </div>

          {/* Reflectie — editorial blokken (beoordelingsmodel) */}
          <div className="grid gap-8 md:grid-cols-3">
            {content.tle3.reflections.map((block, i) => (
              <ReflectionBlock
                key={i}
                label={block.label}
                title={block.title}
                body={block.body}
              />
            ))}
          </div>
        </TimelineSection>

        <TleRubricSection
          id="tle4"
          data={content.tle4}
          gradient="from-[var(--gradient-tle4-from)] to-[var(--gradient-tle4-to)]"
        />

        <TimelineSection
          id="toekomst"
          title={content.toekomst.title}
          color="from-[var(--gradient-toekomst-from)] to-[var(--gradient-toekomst-to)]"
          sectionNumber={SECTION_META.toekomst.number}
          eyebrow={SECTION_META.toekomst.eyebrow}
          accent={SECTION_META.toekomst.accent}
        >
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            {content.toekomst.intro}
          </p>

          {/* Nachtkastboeken (links, gestapeld) + ontwikkelplan (rechts) */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="grid gap-6">
              {content.toekomst.reflections.map((block, i) => (
                <ReflectionBlock
                  key={i}
                  label={block.label}
                  title={block.title}
                  body={block.body}
                  accent="var(--color-accent-toekomst)"
                  card
                />
              ))}
            </div>

            <Roadmap steps={content.toekomst.roadmap} />
          </div>
        </TimelineSection>

        <footer className="container mx-auto border-t border-[var(--color-mid-gray)]/30 px-6 py-8 text-center text-[var(--color-body)]">
          <p>{content.ui.footer}</p>
        </footer>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-light)] text-[var(--color-dark)]">
      <span className="text-8xl font-bold text-[var(--color-body)]/40">
        {content.notFound.code}
      </span>
      <h1 className="text-2xl font-bold">{content.notFound.title}</h1>
      <p className="text-[var(--color-body)]">{content.notFound.text}</p>
      <a
        href="/"
        className="rounded-full bg-[var(--color-light-gray)] px-6 py-2 text-sm font-medium hover:bg-[var(--color-mid-gray)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
      >
        {content.notFound.backLabel}
      </a>
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
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
