// Lista źródeł pod treścią (PLAN-v2 6.0: liczby faktograficzne z datą i źródłem na stronie).
// Bez hooków: działa w komponentach serwerowych i klienckich.
//
//   <Zrodla zrodla={[{ url: 'https://developers.google.com/…', nazwa: 'Google Search Central: …', data: '2026-11-04' }]} />
//
// id domyślnie 'zrodla' (kotwica SEKCJE.zrodla w lib/anchors.js); strona, na której #zrodla
// jest zajęte (A2), podaje inne id. data: 'RRRR-MM-DD' (wyświetlane jako 4.11.2026) albo gotowy tekst.

function dataOdczytu(data) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data || '');
  return m ? `${Number(m[3])}.${m[2]}.${m[1]}` : data;
}

export default function Zrodla({ zrodla, id = 'zrodla', naglowek = 'Źródła' }) {
  if (!zrodla || zrodla.length === 0) return null;
  return (
    <section aria-labelledby={id} style={{ margin: '2.5rem 0 0' }}>
      <h2 id={id} style={{ fontSize: 'clamp(1.25rem, 2.6vw, 1.5rem)', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 0.9rem', color: 'var(--color-text-dark)', scrollMarginTop: '110px' }}>
        {naglowek}
      </h2>
      <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem', fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--color-text-main)' }}>
        {zrodla.map((z) => (
          <li key={z.url}>
            <a href={z.url} rel="noopener" style={{ color: 'var(--color-primary)', textDecoration: 'underline', overflowWrap: 'anywhere' }}>{z.nazwa}</a>
            {z.data && <> (odczyt: {dataOdczytu(z.data)})</>}
          </li>
        ))}
      </ol>
    </section>
  );
}
