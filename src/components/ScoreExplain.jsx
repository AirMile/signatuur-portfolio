import { motion, useReducedMotion } from 'motion/react';

/**
 * ScoreExplain — visuele hero voor de score-explain feature van TLE 3.
 *
 * Maakt het abstracte aanbevelingsconcept zichtbaar: hoe een finalScore stap
 * voor stap wordt opgebouwd (genre → CF → rawScore → feedback → bubble-filter).
 * Gestileerd als een donker "debug-panel" zodat het contrasteert met de lichte
 * endpoint-lijst en het middelpunt van de sectie wordt.
 *
 * props:
 *  - route:      string — het endpoint (mono, in de header)
 *  - example:    string — voorbeeldtrack waarvoor de score wordt opgebouwd
 *  - steps:      array van { label, value } — opeenvolgende rekenstappen
 *  - finalScore: string|number — de uiteindelijke score
 *  - note:       string — korte toelichting in de footer
 */
export function ScoreExplain({ route, example, steps, finalScore, note }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl bg-[var(--color-dark)] text-[var(--color-light)] shadow-xl">
      {/* Header — endpoint + voorbeeldtrack */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-[var(--color-accent-tle3)] px-2 py-0.5 [font-family:var(--font-mono)] text-xs font-semibold text-[var(--color-light)]">
            GET
          </span>
          <code className="[font-family:var(--font-mono)] text-sm text-white/80">
            {route}
          </code>
        </div>
        {example && (
          <div className="[font-family:var(--font-mono)] text-sm text-white/60">
            {example}
          </div>
        )}
      </div>

      {/* Body — stapsgewijze berekening */}
      <div className="space-y-2 px-6 py-6">
        <p className="mb-3 text-xs tracking-wider text-white/40 uppercase">
          Score-opbouw <span className="normal-case">(voorbeeld)</span>
        </p>
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-baseline justify-between gap-4 border-b border-white/5 py-1.5 last:border-b-0"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
          >
            <span className="[font-family:var(--font-mono)] text-sm text-white/70">
              {step.label}
            </span>
            <span className="shrink-0 [font-family:var(--font-mono)] text-sm font-medium text-white/90">
              {step.value}
            </span>
          </motion.div>
        ))}

        {/* finalScore — uitgelicht resultaat */}
        <div className="mt-4 flex items-baseline justify-between gap-4 rounded-lg bg-white/5 px-4 py-3">
          <span className="[font-family:var(--font-mono)] text-sm tracking-wider text-white/50 uppercase">
            finalScore
          </span>
          <span className="[font-family:var(--font-mono)] text-xl font-semibold text-[var(--color-accent-tle3)]">
            {finalScore}
          </span>
        </div>
      </div>

      {/* Footer — toelichting */}
      {note && (
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-sm leading-relaxed text-white/60">{note}</p>
        </div>
      )}
    </div>
  );
}
