import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve('.'),
  },
  // Security headers PageSpeed flagged as missing (23.08.2026). Deliberately
  // WITHOUT Content-Security-Policy: this site loads a third-party 3D scene and
  // styles nearly every element inline, so a strict policy would blank the hero
  // the moment it shipped. CSP belongs in a separate, report-only rollout.
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
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // allow-popups rather than plain same-origin: bare same-origin severs
          // window.opener, which would break any third-party popup flow added
          // later (payments, OAuth) for no gain here.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' }
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
        source: '/:file(og-image\\.jpg|black-hole-[^/]+\\.(?:mp4|webm|jpg|webp)|ai-seo-company-logotyp[^/]*\\.(?:png|svg))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },

  async redirects() {
    return [
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
      {
        source: '/blog/audyt-seo-cena-2026-ile-zaplacisz-w-polsce',
        destination: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
        permanent: true,
      },
      // EN Blog URL fixes for Google Search Console (Permanent 308 Redirects)
      {
        source: '/en/blog/biblioteka',
        destination: '/en/blog/library',
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
      {
        source: '/en/blog/audyt-seo-cena-2026-ile-zaplacisz-w-polsce',
        destination: '/en/blog/how-much-does-seo-cost-pricing-packages-2026',
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
