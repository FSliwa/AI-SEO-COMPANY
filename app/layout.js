import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import CookiesBanner from '@/components/CookiesBanner';

export const metadata = {
  metadataBase: new URL('https://www.ai-seo-company.pl'),
  title: 'Agencja SEO Warszawa | Pozycjonowanie Stron — AI SEO COMPANY',
  description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe, które sprzedają. Kompleksowe pozycjonowanie stron, audyt SEO i web design.',
  icons: {
    icon: '/ai-seo-company-logotyp.svg',
    shortcut: '/ai-seo-company-logotyp.svg',
    apple: '/ai-seo-company-logotyp.svg',
  },
  openGraph: {
    title: 'Agencja SEO Warszawa — AI SEO COMPANY | Branding & Web Design',
    description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe zoptymalizowane pod konwersję, audyt SEO i wysokie pozycje w Google.',
    url: 'https://www.ai-seo-company.pl',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://www.ai-seo-company.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI SEO COMPANY — Agencja SEO Warszawa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agencja SEO Warszawa — AI SEO COMPANY',
    description: 'Nowoczesna agencja SEO Warszawa. Strony i pozycjonowanie, które budują sprzedaż.',
    images: ['https://www.ai-seo-company.pl/og-image.jpg'],
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.ai-seo-company.pl/#organization',
      'name': 'AI SEO COMPANY',
      'alternateName': 'Agencja SEO Warszawa AI SEO COMPANY',
      'description': 'Nowoczesna agencja SEO Warszawa. Projektujemy wyszukiwalne strony internetowe, przeprowadzamy profesjonalny audyt SEO i realizujemy skuteczne pozycjonowanie stron.',
      'url': 'https://www.ai-seo-company.pl',
      'logo': 'https://www.ai-seo-company.pl/ai-seo-company-logotyp-v2.svg',
      'image': 'https://www.ai-seo-company.pl/ai-seo-company-logotyp-v2.png',
      'email': 'kontakt@ai-seo-company.pl',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'ul. Grzybowska',
        'addressLocality': 'Warszawa',
        'postalCode': '00-844',
        'addressCountry': 'PL'
      },
      'vatID': 'PL5253090237',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '38',
        'bestRating': '5',
        'worstRating': '1'
      },
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': 'Warszawa i Polska'
      },
      'priceRange': '$$$'
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.ai-seo-company.pl/#website',
      'url': 'https://www.ai-seo-company.pl',
      'name': 'AI SEO COMPANY — Agencja SEO Warszawa',
      'publisher': {
        '@id': 'https://www.ai-seo-company.pl/#organization'
      },
      'inLanguage': 'pl-PL'
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/ai-seo-company-logotyp.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <CookiesBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
