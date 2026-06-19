/**
 * EndpointList — toont features als API-endpoints (docs-stijl).
 *
 * Vervangt de generieke icoon-kaarten in TLE 3: de inhoud (een REST API)
 * bepaalt de vorm. Eén verticale lijst met method-badges + monospace routes,
 * gescheiden door hairlines.
 *
 * props:
 *  - endpoints: array van { method, route, title, description }
 */

// Semantische method-kleuren, gemapt op bestaande accent-tokens.
const METHOD_COLOR = {
  GET: 'var(--color-accent-tle3)', // teal — lezen
  POST: 'var(--color-accent-tle2)', // blauw — aanmaken
  PUT: 'var(--color-accent-tle1)', // paars — vervangen
  PATCH: 'var(--color-accent-tle4)', // amber — wijzigen
};

export function EndpointList({ endpoints }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-mid-gray)]/20 bg-[var(--color-light-gray)]">
      {endpoints.map((endpoint) => (
        <div
          key={endpoint.route}
          className="border-t border-[var(--color-mid-gray)]/20 p-5 first:border-t-0 sm:flex sm:items-start sm:gap-5"
        >
          {/* Method + route — de "signatuur" van het endpoint */}
          <div className="flex shrink-0 items-center gap-3 sm:w-64">
            <span
              className="rounded-md px-2 py-0.5 [font-family:var(--font-mono)] text-xs font-semibold tracking-wide text-[var(--color-light)]"
              style={{ backgroundColor: METHOD_COLOR[endpoint.method] }}
            >
              {endpoint.method}
            </span>
            <code className="[font-family:var(--font-mono)] text-sm text-[var(--color-dark)]">
              {endpoint.route}
            </code>
          </div>

          {/* Titel + beschrijving */}
          <div className="mt-3 sm:mt-0">
            <h4 className="font-semibold text-[var(--color-dark)]">
              {endpoint.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
              {endpoint.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
