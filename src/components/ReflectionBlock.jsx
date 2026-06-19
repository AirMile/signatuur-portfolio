/**
 * ReflectionBlock — rustig, typografisch reflectieblok.
 *
 * Bewust géén icoon-kaart: een editorial stijl (dunne accent-toplijn +
 * eyebrow-label + heading) geeft rust en ritme. De accentkleur is een prop,
 * zodat het blok zich aanpast aan de sectie waarin het staat (teal in TLE 3,
 * groen in Toekomst, ...).
 *
 * props:
 *  - label:    string — kort eyebrow-label (bv. "Nachtkastboek")
 *  - title:    string — kop van het blok
 *  - accent:   CSS-kleur voor lijn + label (default: TLE 3-teal)
 *  - card:     bool — render als lichte kaart i.p.v. bare editorial-blok
 *  - body:     string[] — paragrafen als HTML-strings (uit content.json);
 *              valt terug op children wanneer niet opgegeven
 *  - children: tekst-inhoud
 */
export function ReflectionBlock({
  label,
  title,
  accent = 'var(--color-accent-tle3)',
  card = false,
  body,
  children,
}) {
  const containerClass = card
    ? 'rounded-2xl border border-[var(--color-mid-gray)]/15 border-t-4 bg-[var(--color-light)] p-6 shadow-[var(--shadow-md)] transition-shadow transition-transform duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]'
    : 'border-t-2 pt-4';

  return (
    <div className={containerClass} style={{ borderTopColor: accent }}>
      <p
        className="text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ color: accent }}
      >
        {label}
      </p>
      <h4 className="mt-2 text-lg font-semibold text-[var(--color-dark)]">
        {title}
      </h4>
      <div className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
        {body
          ? body.map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))
          : children}
      </div>
    </div>
  );
}
