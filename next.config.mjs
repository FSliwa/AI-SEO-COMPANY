import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve('.'),
  },
  async redirects() {
    return [
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
