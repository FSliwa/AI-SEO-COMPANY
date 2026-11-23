import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

// Zrodla z kodu i z ruchu zmierzonego Playwrightem 18.11.2026 (RAPORT c-daty-slug): kazdy wpis ma
// uzasadnienie w komentarzu. Skrypty i style inline sa potrzebne (Next.js wstrzykuje skrypty
// startowe, layout ma inline gtag, komponenty uzywaja style={{}}), wiec 'unsafe-inline' zostaje
// do czasu przejscia na nonce.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  // (19.11.2026: 'unsafe-eval' usuniete razem ze sceną Spline, byl wymagany tylko przez jej runtime.)
  // www.googletagmanager.com: gtag/js
  // (layout.js). googleads.g.doubleclick.net, www.googleadservices.com, www.google.com: skrypty
  // Google Ads ladowane przez gtag po zgodzie (conversion + remarketing).
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com",
  "style-src 'self' 'unsafe-inline'",
  // Piksele Google Analytics i Ads (obrazy 1x1): zrodla zmierzone po zgodzie na cookies oraz
  // wg przewodnika Google dla tagu (developers.google.com/tag-platform/security/guides/csp).
  // www.google.<TLD>: Google wybiera domene kraju (u nas zmierzone .pl); gosc z innego kraju
  // moze dac pojedyncze naruszenie dla jego TLD.
  "img-src 'self' data: blob: https://panel.ai-seo-company.pl https://www.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://ad.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://www.google.com https://www.google.pl https://*.analytics.google.com https://google.com",
  "font-src 'self'",
  // panel.ai-seo-company.pl: formularze (checklista, szablony, narzedzia, monitoring audytu).
  // Reszta: wysylka zdarzen GA4 (region1.google-analytics.com, region1.analytics.google.com),
  // Ads (pagead2.googlesyndication.com, www.google.com/ccm, ad.doubleclick.net, stats.g.doubleclick.net).
  // (19.11.2026: www.gstatic.com usuniete razem ze sceną Spline, to byl dekoder Draco jej runtime.)
  "connect-src 'self' https://panel.ai-seo-company.pl https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://ad.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://www.google.com https://www.google.pl https://google.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 5.11.2026 (PLAN-v2 rozdz. 7, TS11; TS-11): bez naglowka X-Powered-By: Next.js. Nic nie
  // zyskujemy na ujawnianiu frameworka, a skanery dostaja go za darmo.
  poweredByHeader: false,
  turbopack: {
    root: path.resolve('.'),
  },
  experimental: {
    // 5.11.2026 (PLAN-v2 rozdz. 7, „404”; TS-12, BL-05): app/global-not-found.js obsluguje
    // adresy, ktore nie pasuja do zadnej trasy (/nie-istnieje-123, /en/xyz). Bez tej flagi
    // Next oddawal domyslna strone 404 bez lang, bez H1 i bez jednego linku, a wariant
    // z [...rest] + not-found renderowal nawigacje dopiero po hydracji i wolal funkcje przy
    // kazdym skanie botow. Flaga jest eksperymentalna (Next 16.2.12): przy aktualizacji Next
    // (SA17) sprawdzic curlem, ze /nie-istnieje-123 dalej ma H1 i linki w HTML z serwera.
    globalNotFound: true,
  },
  // Security headers PageSpeed flagged as missing (23.08.2026). Bez egzekwowanego
  // Content-Security-Policy: serwis laduje scene 3D i stylizuje prawie kazdy element inline, wiec
  // scisla polityka zgasilaby hero od razu po wdrozeniu.
  // 18.11.2026 (decyzja C5, audyt produkcji S-37): najpierw Content-Security-Policy-Report-Only
  // (CSP_REPORT_ONLY nizej, bez wplywu na dzialanie strony). Raportow nie wysylamy nigdzie
  // (brak report-uri / report-to): naruszenia widac tylko w konsoli przegladarki. Egzekwowanie
  // (zmiana klucza na Content-Security-Policy) dopiero po okresie obserwacji i po sprawdzeniu
  // konsoli na wszystkich typach stron; przy zmianie zrodel (nowy skrypt, font, ramka, API)
  // zaktualizowac liste nizej.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // The apex and www already redirect to HTTPS with a permanent 308;
          // this removes the first insecure hop for returning visitors.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          // Nothing on the site is meant to be framed elsewhere.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // allow-popups rather than plain same-origin: bare same-origin severs
          // window.opener, which would break any third-party popup flow added
          // later (payments, OAuth) for no gain here.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          // 5.11.2026 (TS11; TS-11): serwis nie uzywa kamery, mikrofonu, geolokalizacji,
          // platnosci ani USB (w kodzie brak <iframe>, getUserMedia, geolocation,
          // PaymentRequest). Widget wideo-rozmowy albo platnosci w przyszlosci = poluzowac tutaj.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' }
        ]
      },
      // Pliki z /public szly z domyslnym `max-age=0, must-revalidate`, wiec
      // przegladarka odpytywala serwer o kazdy obraz i o wideo przy kazdym
      // wejsciu. Odpowiedzia bylo zwykle 304, ale to i tak pelny czas podrozy
      // dla kilkunastu zasobow na kazdej podstronie. Optymalizator obrazow
      // dziedziczy naglowek po pliku zrodlowym, wiec ta regula naprawia
      // rowniez odpowiedzi /_next/image.
      // Uwaga: te sciezki sa niezmienne z nazwy - podmiana grafiki wymaga
      // nowej nazwy pliku albo parametru wersji.
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      // Checklista PDF z poradnika /zmiana-agencji-seo (link przychodzi e-mailem): poza indeksem Google.
      {
        source: '/pliki/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Cache-Control', value: 'public, max-age=3600' }
        ]
      },
      {
        source: '/projects/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/certificates/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      // Media lezace bezposrednio w korzeniu /public - poprzednia regula ich nie
      // objela, wiec /og-image.jpg wciaz szlo z max-age=0. Wzorzec dopasowuje
      // wylacznie jeden segment sciezki, zeby nie zlapac tras aplikacji.
      // Uwaga: te pliki sa niezmienne z nazwy - podmiana wymaga nowej nazwy.
      {
        source: '/:file(og-image\\.jpg|ai-seo-company-logotyp[^/]*\\.(?:png|svg))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },

  async redirects() {
    return [
      // 6.11.2026: publikacja huba /narzedzia (lib/publikacja.js, partia 3). Dawny plan zakladal
      // osobna sekcje /szablony - jej adresy prowadza do huba i jego podstron.
      { source: '/szablony', destination: '/narzedzia#szablony', permanent: true },
      { source: '/szablony/:slug', destination: '/narzedzia/:slug', permanent: true },
      // 22.11.2026: intuicyjne aliasy slugow narzedzi i szablonow (1 skok bezposrednio do celu, takze z /pl/).
      { source: '/narzedzia/sprawdz-autorytet-domeny', destination: '/narzedzia/autorytet-domeny', permanent: true },
      { source: '/pl/narzedzia/sprawdz-autorytet-domeny', destination: '/narzedzia/autorytet-domeny', permanent: true },
      { source: '/en/tools/website-authority-checker', destination: '/en/tools/domain-authority-checker', permanent: true },
      { source: '/en/tools/content-plan-generator', destination: '/en/tools/content-calendar-template', permanent: true },
      { source: '/narzedzia/checklista-eeat', destination: '/narzedzia/checklista-e-e-a-t', permanent: true },
      { source: '/pl/narzedzia/checklista-eeat', destination: '/narzedzia/checklista-e-e-a-t', permanent: true },
      { source: '/narzedzia/szablon-badania-slow-kluczowych', destination: '/narzedzia/dobor-slow-kluczowych', permanent: true },
      { source: '/pl/narzedzia/szablon-badania-slow-kluczowych', destination: '/narzedzia/dobor-slow-kluczowych', permanent: true },
      { source: '/narzedzia/przyklady-schema-markup', destination: '/narzedzia/dane-strukturalne-json-ld', permanent: true },
      { source: '/pl/narzedzia/przyklady-schema-markup', destination: '/narzedzia/dane-strukturalne-json-ld', permanent: true },
      // 5.11.2026 (PLAN-v2 rozdz. 7, VAPP; TS-08 po weryfikacji, zamiast lataki T7 z noindex):
      // alias produkcyjny ai-seo-company.vercel.app odpowiadal 200 kopia calego serwisu
      // (canonical na www, bez noindex). noindex + canonical do innego adresu to sprzeczne
      // sygnaly (jak w artykulach jednojezycznych nizej), wiec jedno trwale przekierowanie na
      // www, ze sciezka i query. Pierwsza regula: host wygrywa z kazda regula sciezki, wiec
      // alias nigdy nie oddaje tresci ani wlasnych przekierowan (cele wzgledne nizej
      // zostawalyby na hoscie aliasu). Stary adres na aliasie (np. /en/blog/<slug PL>) ma
      // 2 skoki: alias -> www, potem regula www - akceptowane, alias nie ma linkow.
      // Tylko dokladny host aliasu - www i podglady *.vercel.app (git-…) bez zmian.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ai-seo-company.vercel.app' }],
        destination: 'https://www.ai-seo-company.pl/:path*',
        permanent: true,
      },
      // 5.11.2026 (audyt techniczny planu z filmu): artykuly jednojezyczne odpowiadaly 200 takze
      // w drugim jezyku (6-3583 slow, noindex + canonical + hreflang do wersji istniejacej) -
      // sprzeczne sygnaly. Jedno trwale przekierowanie do jedynej wersji (takze z /pl/..., zeby nie
      // bylo dwoch skokow przez regule '/pl/:path*'). Lista = plOnly/enOnly w lib/blogPosts.js;
      // nowy artykul jednojezyczny = nowy slug tutaj.
      ...['wyniki-wdrozen-seo-2026', 'rodo-na-stronie-internetowej', 'mailchimp-vs-getresponse', 'konfiguracja-zdarzen-gtm-ga4-poradnik', 'jak-zoptymalizowac-strone-pod-google-ai-overviews', 'agencja-seo-czy-google-ads', 'google-ai-mode-jak-sie-pojawic', 'landing-page-tworzenie-cms-hosting-cena', 'bing-webmaster-tools-indexnow-chatgpt', 'seo-techniczne-dane-strukturalne-javascript-hreflang']
        .map((s) => ({ source: `/en/blog/${s}`, destination: `/blog/${s}`, permanent: true })),
      ...['seo-for-saas-startups-playbook', 'multi-location-seo-scale-local-visibility', 'best-marketing-attribution-tools-for-2026', 'how-long-does-seo-take']
        .flatMap((s) => [`/blog/${s}`, `/pl/blog/${s}`].map((source) => ({ source, destination: `/en/blog/${s}`, permanent: true }))),
      // Slug PL artykulu o lukach: middleware next-intl dawal 307
      // (temporary) - Google nie przenosi sygnalow. Jawna regula przed
      // middleware daje trwale 308.
      {
        source: '/blog/content-gap-analysis',
        destination: '/blog/analiza-luk-contentowych',
        permanent: true,
      },
      // Ten sam przypadek co wyzej: klucz trasy jest angielski, publiczny adres
      // polski. Bez tej reguly next-intl oddawal 307 (tymczasowe), wiec stary
      // adres zostawal w indeksie i nie przekazywal sygnalow.
      {
        source: '/blog/technical-seo-audit-checklist',
        destination: '/blog/audyt-techniczny-seo',
        permanent: true,
      },
      // Warianty /pl/* dla obu artykulow MUSZA stac przed ogolna regula
      // '/pl/:path*' nizej - inaczej powstaje lancuch dwuskokowy
      // (/pl/... -> 308 -> /blog/<klucz> -> 308 -> /blog/<slug-pl>),
      // ktory playbook 4.6 wyklucza. Tu jeden skok prosto do celu.
      {
        source: '/pl/blog/content-gap-analysis',
        destination: '/blog/analiza-luk-contentowych',
        permanent: true,
      },
      {
        source: '/pl/blog/technical-seo-audit-checklist',
        destination: '/blog/audyt-techniczny-seo',
        permanent: true,
      },
      // 5.11.2026 (PLAN-v2 6.19 i 6.25; BL-12, SA-04, CS-05): stare adresy /pl/blog/* wskazuja
      // WPROST cel koncowy, tak jak dwie reguly wyzej. Bez nich: /pl/... -> 308 /blog/<stary> ->
      // 308 <cel> (2 skoki). Zasada: kazda regula /pl/<stary-slug> = ten sam cel co regula
      // /<stary-slug> nizej; przy zmianie celu tamtej zmienic tez te.
      // Cel artykulu cenowego = wariant C z 6.25 (artykul zostaje). Wariant A (G1/D14:
      // 308 artykulu na /cennik-pozycjonowania) zmienia cel tutaj i w regule
      // '/blog/ile-kosztuje-pozycjonowanie-2026' nizej.
      {
        source: '/pl/blog/ile-kosztuje-pozycjonowanie-2026',
        destination: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
        permanent: true,
      },
      {
        source: '/pl/blog/audyt-seo-cena-2026-ile-zaplacisz-w-polsce',
        destination: '/audyt-seo',
        permanent: true,
      },
      {
        source: '/pl/blog/biblioteka',
        destination: '/blog',
        permanent: true,
      },
      // /pl and /pl/* never exist as pages (defaultLocale 'pl' is unprefixed,
      // localePrefix 'as-needed'). The next-intl middleware strips the prefix
      // with a temporary 307, so Google keeps the /pl/ URLs indexed. These two
      // rules run BEFORE middleware and make the redirect permanent (308).
      // Segment-based matching: '/pl/:path*' only matches when the first full
      // segment is exactly 'pl' - a hypothetical '/pliki' would NOT match.
      {
        source: '/pl',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pl/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/blog/ile-kosztuje-pozycjonowanie-2026',
        destination: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
        permanent: true,
      },
      // 5.11.2026 (PLAN-v2 6.19, AU1; MSA-02, SA-04, CS-05): stary wpis o cenie audytu
      // prowadzil do artykulu o cenach pozycjonowania, a fraza „audyt seo cena” nalezy do
      // /audyt-seo (tam jest sekcja „Audyt SEO: cena i warianty”). Cel = strona uslugi.
      {
        source: '/blog/audyt-seo-cena-2026-ile-zaplacisz-w-polsce',
        destination: '/audyt-seo',
        permanent: true,
      },
      // 5.11.2026 (PLAN-v2 6.25; SA-12, MSA-16, CS-14, decyzje-blog nr 36-37): „biblioteka”
      // dublowala /blog (18 z 19 linkow wspolnych). Trasa znika z routingu, sitemapy i llms.txt;
      // stare adresy jednym skokiem na liste artykulow.
      {
        source: '/blog/biblioteka',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/blog/library',
        destination: '/en/blog',
        permanent: true,
      },
      // EN Blog URL fixes for Google Search Console (Permanent 308 Redirects)
      // 5.11.2026: cel wprost /en/blog (bylo /en/blog/library, ktory sam przekierowuje -
      // zostalby lancuch 2 skokow).
      {
        source: '/en/blog/biblioteka',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog/jak-pozyskiwac-opinie-google-poradnik',
        destination: '/en/blog/how-to-get-google-reviews',
        permanent: true,
      },
      {
        source: '/en/blog/seo-lokalne-dla-firm-w-warszawie',
        destination: '/en/blog/local-seo-for-companies',
        permanent: true,
      },
      // 18.11.2026 (decyzja C6, audyt produkcji S-44): angielski adres bez polskiego wyrazu
      // „porownanie”. Jedno trwale przekierowanie (308) prosto na nowy adres; wersja PL
      // (/blog/vwo-vs-optimizely-porownanie) bez zmian.
      {
        source: '/en/blog/vwo-vs-optimizely-porownanie',
        destination: '/en/blog/vwo-vs-optimizely-comparison',
        permanent: true,
      },
      {
        source: '/en/blog/core-web-vitals-a-pozycje-google',
        destination: '/en/blog/core-web-vitals-google-rankings',
        permanent: true,
      },
      {
        source: '/en/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026',
        destination: '/en/blog/canonical-tag-seo-guide-2026',
        permanent: true,
      },
      {
        source: '/en/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
        destination: '/en/blog/how-much-does-seo-cost-pricing-packages-2026',
        permanent: true,
      },
      // The two consolidated pricing articles were only redirected on /blog/…,
      // so their /en/ counterparts stayed live, served Polish copy and carried
      // no canonical at all. Same destination as the Polish rule, English slug.
      {
        source: '/en/blog/ile-kosztuje-pozycjonowanie-2026',
        destination: '/en/blog/how-much-does-seo-cost-pricing-packages-2026',
        permanent: true,
      },
      // 5.11.2026 (AU1, MSA-02): jak wersja PL - na strone audytu SEO, nie na artykul cenowy.
      {
        source: '/en/blog/audyt-seo-cena-2026-ile-zaplacisz-w-polsce',
        destination: '/en/seo-audit',
        permanent: true,
      },
      {
        source: '/en/blog/link-building-b2b-dla-marketerow-strategie-i-checklista',
        destination: '/en/blog/b2b-link-building-strategies-checklist',
        permanent: true,
      },
      {
        source: '/en/blog/ile-kosztuje-strona-www-dla-firmy-ceny',
        destination: '/en/blog/how-much-does-a-business-website-cost-pricing',
        permanent: true,
      },
      {
        source: '/en/analiza-konkurencji-seo-przewodnik',
        destination: '/en/blog/seo-competitor-analysis-step-by-step-guide',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
