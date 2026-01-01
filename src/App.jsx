import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <header className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Mijn Portfolio</h1>
            <ul className="flex gap-6">
              <li>
                <a href="#persoonlijk" className="hover:text-blue-400 transition-colors">
                  Persoonlijk
                </a>
              </li>
              <li>
                <a href="#professioneel" className="hover:text-blue-400 transition-colors">
                  Professioneel
                </a>
              </li>
              <li>
                <a href="#ontwerp" className="hover:text-blue-400 transition-colors">
                  Ontwerp
                </a>
              </li>
              <li>
                <a href="#code" className="hover:text-blue-400 transition-colors">
                  Code
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-16">
          <section className="text-center mb-24">
            <h2 className="text-5xl font-bold mb-6">
              Mijn Groei Reis
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Een visuele weergave van mijn persoonlijke, professionele en
              vakinhoudelijke groei tijdens het teamproject.
            </p>
          </section>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="container mx-auto px-6 py-8 text-center text-slate-400">
          <p>Signatuur Opdracht - 2025</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <GrowthCard
        id="persoonlijk"
        title="Persoonlijke Groei"
        description="Mijn ontwikkeling als individu tijdens het project."
        color="from-purple-500 to-pink-500"
      />
      <GrowthCard
        id="professioneel"
        title="Professionele Groei"
        description="Mijn groei in samenwerking en communicatie."
        color="from-blue-500 to-cyan-500"
      />
      <GrowthCard
        id="ontwerp"
        title="Ontwerp Groei"
        description="Mijn vooruitgang in design en visueel denken."
        color="from-orange-500 to-yellow-500"
      />
      <GrowthCard
        id="code"
        title="Code Groei"
        description="Mijn technische ontwikkeling en programmeervaardigheden."
        color="from-green-500 to-emerald-500"
      />
    </div>
  );
}

function GrowthCard({ id, title, description, color }) {
  return (
    <a
      href={`#${id}`}
      className="group block p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} mb-4`} />
      <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400">
        {description}
      </p>
    </a>
  );
}

export default App;
