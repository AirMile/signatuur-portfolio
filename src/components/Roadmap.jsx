/**
 * Roadmap — toont het ontwikkelplan als mini-tijdlijn i.p.v. icoon-kaart.
 *
 * Een ontwikkelplan is letterlijk een opeenvolging in de tijd, dus tonen we
 * het als verbonden stippen op een verticale lijn. De eerste stap ('Nu') is
 * gevuld, latere stappen zijn hol — visueel: hier sta ik, daar ga ik heen.
 *
 * props:
 *  - steps: array van { phase, text }
 */
export function Roadmap({ steps }) {
  return (
    <div className="rounded-2xl border border-[var(--color-mid-gray)]/20 bg-[var(--color-light-gray)] p-6">
      <p className="text-xs font-semibold tracking-wider text-[var(--color-accent-toekomst)] uppercase">
        Ontwikkelplan
      </p>

      <ol className="mt-5 space-y-6">
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          return (
            <li key={step.phase} className="relative flex gap-4 pb-1">
              {/* Verbindingslijn naar de volgende stap */}
              {!isLast && (
                <span className="absolute top-4 left-[7px] h-full w-px bg-[var(--color-mid-gray)]/30" />
              )}
              {/* Stip — gevuld voor 'Nu', hol voor latere stappen */}
              <span
                className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--color-accent-toekomst)] ${
                  isFirst
                    ? 'bg-[var(--color-accent-toekomst)]'
                    : 'bg-[var(--color-light-gray)]'
                }`}
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold tracking-wider text-[var(--color-accent-toekomst)] uppercase">
                  {step.phase}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
