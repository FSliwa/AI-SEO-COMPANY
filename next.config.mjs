import path from 'path';

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
    ]
  },
};

export default nextConfig;
