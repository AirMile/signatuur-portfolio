import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';

import { ProgressBar } from './components/ProgressBar';
import { TimelineSection } from './components/TimelineSection';
import { TimelineItem } from './components/TimelineItem';
import { ContentCard } from './components/ContentCard';
import { ScrollBackground } from './components/ScrollBackground';
import {
  Wrench,
  TrendingUp,
  Lightbulb,
  BookOpen,
  KeyRound,
  SlidersHorizontal,
  Filter,
  Settings2,
  Microscope,
  Users,
} from 'lucide-react';

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
        Naar inhoud
      </a>
      <ScrollBackground />
      <ProgressBar color={SECTIONS[activeIndex].color} />
      <main id="hoofdinhoud" tabIndex={-1} className="outline-none">
        <TimelineSection
          id="intro"
          title="Mijn Groei Portfolio"
          titleAs="h1"
          color="from-[var(--gradient-intro-from)] to-[var(--gradient-intro-to)]"
        >
          <p className="max-w-2xl text-left text-base text-[var(--color-body)] md:text-xl">
            Welkom! Ik ben Miles en dit is mijn signatuur over persoonlijke en
            professionele groei. Elke dag werk ik aan een betere versie van
            mezelf. Hier deel ik mijn ontwikkeling als Creatief Technoloog door
            vier TLE-periodes heen.
          </p>
        </TimelineSection>

        <TimelineSection
          id="tle1"
          title="TLE 1"
          color="from-[var(--gradient-tle1-from)] to-[var(--gradient-tle1-to)]"
        >
          {/* Intro text */}
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            Tijdens de eerste periode heb ik gewerkt aan een mental health app
            waarmee gebruikers meer inzicht krijgen in hun mentale gezondheid
            aan de hand van statistieken en een AI-gegenereerde diary input.
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
              icon={<Wrench className="h-6 w-6 text-[var(--color-light)]" />}
              title="Toolkit"
              color="from-[var(--gradient-tle1-from)] to-[var(--gradient-tle1-to)]"
            >
              <p>
                Ik heb geleerd met hypotheses en onderzoeksvragen te werken,
                empathy maps en persona's te maken, en de MoSCoW-methode toe te
                passen. Ook het brainstormen via toekomstscenario's paste goed
                bij mij door mijn interesse in sci-fi en fantasy verhalen
                schrijven.
              </p>
            </ContentCard>
            <ContentCard
              icon={
                <TrendingUp className="h-6 w-6 text-[var(--color-light)]" />
              }
              title="Groei"
              color="from-[var(--gradient-tle1-from)] to-[var(--gradient-tle1-to)]"
            >
              <p>
                <strong>Pluspunt:</strong> Ik nam een creative director rol aan
                met conceptueel denken, assertieve houding, en UI/UX bijdragen.
                <br />
                <strong>Verbeterpunt:</strong> Doorzettingsvermogen bij
                technische setbacks. Bij tegenslag vertoonde ik vluchtgedrag en
                zocht ik andere taken om uit te voeren.
              </p>
            </ContentCard>
          </div>
        </TimelineSection>

        <TimelineSection
          id="tle2"
          title="TLE 2"
          color="from-[var(--gradient-tle2-from)] to-[var(--gradient-tle2-to)]"
        >
          {/* Intro text */}
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            In de tweede periode heb ik gewerkt aan Natuurmoment: een
            webapplicatie die 13-jarigen op een speelse manier de natuur in
            trekt met een foto-bingo en route-vragen. Hier laat ik zien hoe ik
            ben gegroeid.
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
              icon={<Wrench className="h-6 w-6 text-[var(--color-light)]" />}
              title="Toolkit"
              color="from-[var(--gradient-tle2-from)] to-[var(--gradient-tle2-to)]"
            >
              <p>
                Nieuwe tools: <strong>Figma</strong> voor UI/UX design,{' '}
                <strong>Crazy 8's</strong> om snel interface-variaties te
                schetsen, en de <strong>ontwerpgerichte SPRINT-aanpak</strong>.
                UI/UX design gaat me goed af; technische backend skills wil ik
                nog verder ontwikkelen.
              </p>
            </ContentCard>
            <ContentCard
              icon={
                <TrendingUp className="h-6 w-6 text-[var(--color-light)]" />
              }
              title="Groei"
              color="from-[var(--gradient-tle2-from)] to-[var(--gradient-tle2-to)]"
            >
              <p>
                <strong>Doorzettingsvermogen:</strong> Ondanks negatieve
                gedachten elke dag naar school en productief. Van vluchtgedrag
                naar het project echt over de streep trekken.
                <br />
                <strong>Nieuw verbeterpunt:</strong> Code uitleggen. Henk-jan en
                Antwan bevestigden dit als mijn "missing link" als CMGT'er.
              </p>
            </ContentCard>
          </div>
        </TimelineSection>

        <TimelineSection
          id="tle3"
          title="TLE 3 — SonarPoppy"
          color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
        >
          {/* Intro */}
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            Muziek-aanbevelingsbackend (REST API, Express 5 + MongoDB) voor
            SonarPoppy — een team van vier. Ik en Martijn als AI leads. Als AI
            lead bouwde ik vijf features rond het aanbevelingssysteem en
            verdiepte ik me in cosine similarity en collaborative filtering.
          </p>

          {/* Timeline items */}
          <div className="mb-16 space-y-16">
            <TimelineItem
              image="/images/tle3-1.jpg"
              date="TLE 3 · 2026"
              title="Score-explain in de praktijk"
              description="Per aanbeveling laat de API zien hoe de score is opgebouwd: genre-similarity, de collaborative filtering-bijdrage, weights en feedback-multipliers. Technisch het complexst, en het meest waardevol om aanbevelingen te kunnen verklaren en debuggen."
              index={0}
            />
            <TimelineItem
              image="/images/tle3-2.jpg"
              date="TLE 3 · 2026"
              title="De aanbevelingspipeline"
              description="De backend combineert smaakprofielen uit sliders met genre-, mood- en explicit-filters tot een gepersonaliseerde lijst. Score-weights zijn live aanpasbaar zonder herstart, handig voor A/B-testing."
              index={1}
            />
          </div>

          {/* 5 feature-cards */}
          <h3 className="mb-6 text-xl font-semibold text-[var(--color-dark)]">
            Wat ik bouwde
          </h3>
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ContentCard
              icon={<KeyRound className="h-6 w-6 text-[var(--color-light)]" />}
              title="Dual authentication"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
              variant="feature"
            >
              <p>
                JWT voor gebruikerssessies én API key-authenticatie voor
                machine-to-machine-calls — twee onafhankelijke auth-flows in één
                middleware-stack.
              </p>
            </ContentCard>
            <ContentCard
              icon={
                <SlidersHorizontal className="h-6 w-6 text-[var(--color-light)]" />
              }
              title="Slider-presets"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
              variant="feature"
            >
              <p>
                Smaakprofielen als stelbare sliders: gebruikers kiezen hun
                voorkeur voor energie, dansbaarheid en sfeer, waarna de backend
                de juiste aanbevelingsweights berekent.
              </p>
            </ContentCard>
            <ContentCard
              icon={<Filter className="h-6 w-6 text-[var(--color-light)]" />}
              title="Gefilterde aanbevelingen"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
              variant="feature"
            >
              <p>
                Pipeline die genre, mood en explicit-flag combineert om een
                gepersonaliseerde lijst te returnen — met paginering en
                cache-invalidatie bij config-wijzigingen.
              </p>
            </ContentCard>
            <ContentCard
              icon={<Settings2 className="h-6 w-6 text-[var(--color-light)]" />}
              title="Live scoring-config"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
              variant="feature"
            >
              <p>
                Admin-endpoint om score-weights live aan te passen zonder
                herstart — veranderingen worden direct zichtbaar in de
                aanbevelingen, handig voor A/B-testing.
              </p>
            </ContentCard>
            <ContentCard
              icon={
                <Microscope className="h-6 w-6 text-[var(--color-light)]" />
              }
              title="Score-explain"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
              variant="feature"
            >
              <p>
                Laat per aanbeveling zien hoe de score is opgebouwd:
                genre-similarity, collaborative filtering-bijdrage, weights en
                feedback-multipliers. Technisch het complexst, meest waardevol
                voor debugging.
              </p>
            </ContentCard>
          </div>

          {/* Reflectie — 3 cards (beoordelingsmodel) */}
          <div className="grid gap-6 md:grid-cols-3">
            <ContentCard
              icon={<Wrench className="h-6 w-6 text-[var(--color-light)]" />}
              title="Toolkit uitgebreid"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
            >
              <p>
                Verdieping in <strong>cosine similarity</strong> en{' '}
                <strong>collaborative filtering</strong>. Gestructureerd
                feature-per-feature werken met tests:{' '}
                <em>requirements → code → testen → refactoren</em> als vaste
                cyclus. AI als grafische rekenmachine — begrijpen wat eruit komt
                is de vaardigheid.
              </p>
            </ContentCard>
            <ContentCard
              icon={
                <TrendingUp className="h-6 w-6 text-[var(--color-light)]" />
              }
              title="Houding"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
            >
              <p>
                <strong>Pluspunt:</strong> Kritisch doorvragen werd positief
                ontvangen — het maakte het team scherper in keuzes.
                <br />
                <strong>Verbeterpunt:</strong> Te veel f*cks aan controle: te
                weinig tussendoor delen waar ik mee bezig was, en te vaak zelf
                de orde bewaken.
              </p>
            </ContentCard>
            <ContentCard
              icon={<Lightbulb className="h-6 w-6 text-[var(--color-light)]" />}
              title="Wat ik anders deed"
              color="from-[var(--gradient-tle3-from)] to-[var(--gradient-tle3-to)]"
            >
              <p>
                Halverwege bewust meer gaan communiceren — kort benoemen wat ik
                ging doen. Teamgenoten gaven aan dat ze daarna beter wisten waar
                ik stond. Het begin van loslaten.
              </p>
            </ContentCard>
          </div>
        </TimelineSection>

        <TimelineSection
          id="tle4"
          title="TLE 4 — Impakt"
          color="from-[var(--gradient-tle4-from)] to-[var(--gradient-tle4-to)]"
        >
          {/* Intro tekst */}
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            In TLE 4 testte ik mijn leerdoel echt. Het team wilde dat ik
            projectlead werd — maar mijn doel was juist het omgekeerde:
            verantwoordelijkheden verdelen. Naarmate iedereen in zijn rol
            groeide, hoefde ik alleen nog te bewaken dat mensen hun taken
            oppakten. Mijn trots dit semester is niet één feature, maar een team
            dat zelfstandiger werd. Manson in de praktijk: f*cks niet meer
            uitgeven aan controle, maar aan de groei van anderen.
          </p>

          {/* Timeline items */}
          <div className="mb-16 space-y-16">
            <TimelineItem
              image="/images/tle4-1.jpg"
              date="TLE 4 · 2026"
              title="Van prototype naar React Native"
              description="Ik begon met een prototype in Claude Design, zette dat op Vercel om mee te testen, en bouwde het om naar React Native met een nette mappenstructuur en tests (Jest, Playwright). Daardoor had het team een vliegende start — een solide fundament om op verder te bouwen."
              index={0}
            />
            <TimelineItem
              image="/images/tle4-2.jpg"
              date="TLE 4 · 2026"
              title="Het team zelfstandiger maken"
              description="Teamgenoten die in andere groepen stil bleven of niet de ruimte kregen, kwamen hier tot een betere versie van zichzelf. Door verantwoordelijkheden bewust te verdelen en de focus te bewaken groeide het team zelfstandiger. Een geslaagd experiment in loslaten."
              index={1}
            />
          </div>

          {/* Rubric cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard
              icon={<Wrench className="h-6 w-6 text-[var(--color-light)]" />}
              title="Toolkit"
              color="from-[var(--gradient-tle4-from)] to-[var(--gradient-tle4-to)]"
            >
              <p>
                <strong>React Native + Expo</strong> voor de app,{' '}
                <strong>Filament</strong> voor het admin-dashboard. Prototyping
                via <strong>Claude Design → Vercel → RN</strong>. Testing met{' '}
                <strong>Jest en Playwright</strong>. Methodisch: ik stelde de
                doelgroep-onderzoeken op zodat het team op echte input bouwde in
                plaats van aannames.
              </p>
            </ContentCard>
            <ContentCard
              icon={<Users className="h-6 w-6 text-[var(--color-light)]" />}
              title="Houding & feedback"
              color="from-[var(--gradient-tle4-from)] to-[var(--gradient-tle4-to)]"
            >
              <p>
                Teamgenoten waardeerden dat ik mensen erbij hield als de focus
                wegzakte. Verbeterpunt (opnieuw): zichtbaarheid. Na het splitsen
                van frontend en backend en een dagelijkse Miro-standup ging dat
                duidelijk beter.
                <br />
                <strong>Reflectie:</strong> mijn mening vaker constructief
                uitspreken bij onenigheid i.p.v. inslikken — dat is óók een f*ck
                waard.
              </p>
            </ContentCard>
          </div>
        </TimelineSection>

        <TimelineSection
          id="toekomst"
          title="Toekomst"
          color="from-[var(--gradient-toekomst-from)] to-[var(--gradient-toekomst-to)]"
        >
          <p className="mb-12 max-w-3xl text-lg text-[var(--color-body)]">
            Mijn visie op de toekomst: elke dag een stap vooruit. Geïnspireerd
            door het Atomic Habits-concept geloof ik in kleine dagelijkse
            verbeteringen die samen grote impact maken.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard
              icon={<BookOpen className="h-6 w-6 text-[var(--color-light)]" />}
              title="Nachtkastboek: Hooked"
              color="from-[var(--gradient-toekomst-from)] to-[var(--gradient-toekomst-to)]"
            >
              <p>
                <strong>Hooked: How to Build Habit-Forming Products</strong>{' '}
                leerde me niet alleen hoe je producten verslavend maakt, maar
                ook wat <em>slecht</em> design is. Ik pas dit toe door user
                experiences te streamlinen: zo min mogelijk pagina's, buttons op
                logische plekken, en de user path actief volgen om frustratie te
                voorkomen.
              </p>
            </ContentCard>
            <ContentCard
              icon={<Lightbulb className="h-6 w-6 text-[var(--color-light)]" />}
              title="Ontwikkelplan"
              color="from-[var(--gradient-toekomst-from)] to-[var(--gradient-toekomst-to)]"
            >
              <p>
                <strong>TLE 3:</strong> Code begrijpen én uitleggen - mijn
                "missing link" als CMGT'er. Na elke feature tijd nemen om alles
                echt te snappen.
                <br />
                <strong>Lange termijn:</strong> Fullstack developer worden, TLE
                4 startup ervaring, en stage bij een agency om te ontdekken of
                dat bij mij past.
              </p>
            </ContentCard>
          </div>
        </TimelineSection>

        <footer className="container mx-auto border-t border-[var(--color-mid-gray)]/30 px-6 py-8 text-center text-[var(--color-body)]">
          <p>Signatuur Opdracht - 2026</p>
        </footer>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-light)] text-[var(--color-dark)]">
      <span className="text-8xl font-bold text-[var(--color-body)]/40">
        404
      </span>
      <h1 className="text-2xl font-bold">Pagina niet gevonden</h1>
      <p className="text-[var(--color-body)]">Deze pagina bestaat niet.</p>
      <a
        href="/"
        className="rounded-full bg-[var(--color-light-gray)] px-6 py-2 text-sm font-medium hover:bg-[var(--color-mid-gray)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
      >
        Terug naar home
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
