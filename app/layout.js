import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: 'Agencja brandingu i web design Warszawa | AI SEO COMPANY',
  description: 'Projektujemy marki i strony, które sprzedają. Branding, web design i SEO w jednym zespole. Zobacz portfolio i cennik — wyceń projekt online.',
  keywords: ['agencja SEO', 'branding Warszawa', 'tworzenie stron www', 'pozycjonowanie stron', 'identyfikacja wizualna', 'agencja cennik'],
  metadataBase: new URL('https://ase-bot.live'),
  openGraph: {
    title: 'Agencja brandingu i web design Warszawa | AI SEO COMPANY',
    description: 'Projektujemy marki i strony, które sprzedają. Branding, web design i SEO w jednym zespole. Zobacz portfolio i cennik.',
    url: 'https://ase-bot.live',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'AI SEO COMPANY',
    'url': 'https://ase-bot.live',
    'description': 'Agencja brandingu, web designu i pozycjonowania SEO dla rosnących marek.',
    'priceRange': '1900 zł - 2500 zł',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Warszawa',
      'addressCountry': 'PL',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '48',
    },
  };

  return (
    <html lang="pl" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
