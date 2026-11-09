import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { STRONY_EN } from './lib/stronyEn';

const intl = createMiddleware(routing);

// 9.11.2026: strony z lib/stronyEn.js pod trasami [slug] mają slug EN inny niż PL. Szablon
// /en/comparisons/[slug] przyjąłby też slug PL (/en/comparisons/pozycjonowanie-za-efekt-czy-abonament
// = ta sama strona pod drugim adresem), więc taki adres przekierowujemy 308 na adres EN jednym
// skokiem. To samo dla pełnej ścieżki PL pod /en (/en/porownania/... -> /en/comparisons/...).
const PREFIKSY_EN = { '/porownania/': '/comparisons/', '/pozycjonowanie-w-ai/': '/ai-search-optimization/', '/narzedzia/': '/tools/' };
const SLUG_PL_POD_EN = new Map();
for (const [pl, { en }] of Object.entries(STRONY_EN)) {
  SLUG_PL_POD_EN.set(`/en${pl}`, `/en${en}`);
  for (const [pPl, pEn] of Object.entries(PREFIKSY_EN)) {
    if (!pl.startsWith(pPl)) continue;
    const naiwny = `/en${pEn}${pl.slice(pPl.length)}`;
    if (naiwny !== `/en${en}`) SLUG_PL_POD_EN.set(naiwny, `/en${en}`);
  }
}

// 5.11.2026 (PLAN-v2 rozdz. 7, T1; TS-06): next-intl przekierowuje adresy z obcym slugiem
// (np. /en/pozycjonowanie-w-ai -> /en/ai-search-optimization, /seo-pricing ->
// /cennik-pozycjonowania) kodem 307, czyli TYMCZASOWO: Google zostawia stary adres w indeksie
// i nie przenosi sygnalow. Te przekierowania sa trwale z natury (kanonizacja sluga), wiec
// zamieniamy 307 na 308.
// WARUNEK (T1a, BL-01): strony tylko-PL maja w i18n/routing.js slug EN = slug PL (zwykly string),
// a strona robi notFound() dla 'en'. Inaczej ta zamiana utrwalilaby 308 -> 404
// (/en/sprawdz-widocznosc-w-ai -> /en/ai-visibility-check). Nowa strona tylko-PL = wpis
// w lib/publikacja.js i prefiks w lib/plOnly.js, nigdy slug EN w routingu.
// Reguly /pl/* zostaja w next.config.mjs (dzialaja przed middleware).
// Nazwa middleware.js zostaje (bez zmiany na proxy.js) - ostrzezenie Next 16 w logu buildu
// jest znane i nie blokuje.
export default function middleware(request) {
  const sciezka = request.nextUrl.pathname.replace(/\/+$/, '');
  const cel = SLUG_PL_POD_EN.get(sciezka);
  if (cel && cel !== sciezka) {
    const url = request.nextUrl.clone();
    url.pathname = cel;
    return NextResponse.redirect(url, 308);
  }
  const response = intl(request);
  const location = response.headers.get('location');
  if (response.status === 307 && location) {
    const trwale = NextResponse.redirect(location, 308);
    response.headers.forEach((value, key) => {
      if (key !== 'location') trwale.headers.set(key, value);
    });
    return trwale;
  }
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`, `apple-touch-icon.png`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
