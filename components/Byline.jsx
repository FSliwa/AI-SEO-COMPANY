'use client';

// Podpis autora i data aktualizacji (PLAN-v2 6.0; OP-14, MSA-13):
// „Opracował: Filip Śliwa, specjalista SEO · aktualizacja: 20 listopada 2026”.
// Data = LASTMOD z lib/lastmod.js (ta sama co lastmod w sitemapie i dateModified w JSON-LD),
// więc zmienia się tylko przy realnej zmianie treści - nigdy „dzisiaj” (CLAUDE.md).
// Import z lib/lastmod.js, NIE z lib/sitemapEntries.js: inaczej do bundla klienta trafia blogPosts.
// Bez wpisu w LASTMOD (np. nowa strona przed wdrożeniem) pokazuje samego autora.
// Domyślnie tylko PL: na /en zwraca null, chyba że takzeEn. Nie renderuje nagłówka.
//
// Użycie: <Byline sciezka="/porownania/seo-vs-geo" />  (sciezka = klucz z i18n/routing.js)
//         <Byline sciezka="/pozycjonowanie-w-ai" takzeEn />  albo z jawną datą: data="2026-11-20"

import { useLocale } from 'next-intl';
import { Link, getPathname } from '@/i18n/routing';
import { LASTMOD } from '@/lib/lastmod';

const BASE = 'https://www.ai-seo-company.pl';
const MIESIACE_PL = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const MIESIACE_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MIESIACE_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

// Formatowanie bez Intl: identyczny tekst na serwerze i w przeglądarce (bez błędu hydracji).
function formatujDate(iso, lang) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (!m) return null;
  const [, rok, mies, dzien] = m;
  const d = Number(dzien);
  const i = Number(mies) - 1;
  if (lang === 'de') return `${d}. ${MIESIACE_DE[i]} ${rok}`;
  return lang === 'en' ? `${MIESIACE_EN[i]} ${d}, ${rok}` : `${d} ${MIESIACE_PL[i]} ${rok}`;
}

function kluczLastmod(sciezka, lang) {
  if (!sciezka) return null;
  if (lang === 'pl') {
    if (LASTMOD[`${BASE}${sciezka}`]) return `${BASE}${sciezka}`;
    try {
      return `${BASE}${getPathname({ href: sciezka, locale: 'pl' })}`.replace(/\/$/, '');
    } catch {
      return `${BASE}${sciezka}`;
    }
  }
  // Klucz EN / DE = lokalizowany adres z prefiksem (np. /en/ai-search-optimization, /de/ki-suchoptimierung); strona główna = /en lub /de.
  try {
    return `${BASE}${getPathname({ href: sciezka, locale: lang })}`.replace(/\/$/, '');
  } catch {
    return null;
  }
}

const styl = { margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' };

export default function Byline({ sciezka, data, takzeEn = false, style }) {
  const lang = useLocale();
  const en = lang === 'en';
  const de = lang === 'de';
  if (en && !takzeEn) return null;

  const iso = data ?? LASTMOD[kluczLastmod(sciezka, lang)];
  const tekstDaty = formatujDate(iso, lang);

  return (
    <p className="byline" lang={de ? 'de' : undefined} style={style ? { ...styl, ...style } : styl}>
      {de ? 'Verfasst von: ' : en ? 'Prepared by: ' : 'Opracował: '}
      <Link href="/o-nas" style={{ color: 'inherit', textDecoration: 'underline' }}>Filip Śliwa</Link>
      {de ? ', SEO-Spezialist' : en ? ', SEO specialist' : ', specjalista SEO'}
      {tekstDaty && (
        <>
          {de ? ' · aktualisiert: ' : en ? ' · updated: ' : ' · aktualizacja: '}
          <time dateTime={iso.slice(0, 10)}>{tekstDaty}</time>
        </>
      )}
    </p>
  );
}
