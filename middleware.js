import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intl = createMiddleware(routing);

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
