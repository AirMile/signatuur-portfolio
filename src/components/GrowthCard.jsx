import { Plus, Minus, Dot, Target } from 'lucide-react';

/**
 * GrowthCard — toont groei/houding als gestructureerde +/− i.p.v. paragraaf.
 *
 * Het beoordelingsmodel levert steeds dezelfde structuur op: een sterkte
 * (pluspunt), een verbeterpunt en soms een reflectie. Die maken we expliciet
 * met semantische markers, zodat een lezer in één oogopslag ziet wat sterk is
 * en wat groeit. Sluit aan op de 'f*cks verdelen'-narratief.
 *
 * props:
 *  - label:  eyebrow-label (bv. 'Groei' of 'Houding & feedback')
 *  - items:  array van { type: 'plus' | 'minus' | 'note' | 'smart', title, description }
 *  - accent: CSS-kleur voor het eyebrow-label (sectie-accent)
 */

// Marker per type: icoon + kleur. Groen = sterkte, amber = verbeterpunt, grijs = reflectie,
// teal + target = SMART-actiepunt (springt eruit als belangrijkste groei-bewijs).
const MARKER = {
  plus: { Icon: Plus, color: 'var(--color-accent-toekomst)' },
  minus: { Icon: Minus, color: 'var(--color-accent-tle4)' },
  note: { Icon: Dot, color: 'var(--color-mid-gray)' },
  smart: { Icon: Target, color: 'var(--color-accent-tle3)' },
};

export function GrowthCard({ label, items, accent = 'var(--color-mid-gray)' }) {
  return (
    <div className="rounded-2xl border border-[var(--color-mid-gray)]/15 bg-[var(--color-light)] p-6 shadow-[var(--shadow-md)] transition-shadow transition-transform duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
      <p
        className="text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ color: accent }}
      >
        {label}
      </p>

      <ul className="mt-4 space-y-4">
        {items.map((item) => {
          const { Icon, color } = MARKER[item.type] ?? MARKER.note;
          return (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  color,
                  backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
                }}
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-dark)]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--color-body)]">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
