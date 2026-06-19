/**
 * ToolkitCard — toont een toolkit als tag-chips i.p.v. paragraaf.
 *
 * Een toolkit ís een verzameling tools/methodes, dus tonen we ze als losse
 * chips: scanbaar en visueel, in plaats van verstopt in een lopende zin.
 * Vervangt de generieke icoon-kaart in TLE 1/2/4.
 *
 * props:
 *  - accent:   CSS-kleur (bv. 'var(--color-accent-tle1)') — sectie-accent voor de chips
 *  - tools:    array van strings — de losse tools/methodes
 *  - label:    eyebrow-label (default 'Toolkit')
 *  - children: korte framing-zin onder de chips
 */
export function ToolkitCard({ accent, tools, label = 'Toolkit', children }) {
  return (
    <div className="rounded-2xl border border-[var(--color-mid-gray)]/15 bg-[var(--color-light)] p-6 shadow-[var(--shadow-md)] transition-shadow transition-transform duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
      <p
        className="text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ color: accent }}
      >
        {label}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <li
            key={tool}
            className="rounded-full border px-3 py-1 text-sm font-medium text-[var(--color-dark)]"
            style={{
              borderColor: `color-mix(in oklch, ${accent} 45%, transparent)`,
              backgroundColor: `color-mix(in oklch, ${accent} 10%, transparent)`,
            }}
          >
            {tool}
          </li>
        ))}
      </ul>

      {children ? (
        <div className="mt-4 text-sm leading-relaxed text-[var(--color-body)]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
