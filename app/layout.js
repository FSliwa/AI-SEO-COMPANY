import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import CookiesBanner from '@/components/CookiesBanner';

export const metadata = {
  title: 'Agencja SEO Warszawa | Branding, Web Design & Pozycjonowanie — AI SEO COMPANY',
  description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe, które sprzedają. Kompleksowe pozycjonowanie stron, audyt SEO i web design.',
  keywords: 'agencja seo, agencja seo warszawa, pozycjonowanie stron internetowych, pozycjonowanie stron, audyt seo, projektowanie stron internetowych, seo lokalne, pozycjonowanie lokalne, optymalizacja seo, cennik pozycjonowania, ile kosztuje pozycjonowanie, agencja marketingowa',
  icons: {
    icon: '/AI SEO COMPANY Logotyp.svg',
    shortcut: '/AI SEO COMPANY Logotyp.svg',
    apple: '/AI SEO COMPANY Logotyp.svg',
  },
  openGraph: {
    title: 'Agencja SEO Warszawa — AI SEO COMPANY | Branding, Web Design & Pozycjonowanie',
    description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe zoptymalizowane pod konwersję, audyt SEO i wysokie pozycje w Google.',
    url: 'https://ase-bot.live',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': 'AI SEO COMPANY',
  'description': 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe zoptymalizowane pod konwersję i pozycjonowanie stron internetowych w Google.',
  'url': 'https://ase-bot.live',
  'logo': 'https://ase-bot.live/AI%20SEO%20COMPANY%20Logotyp.svg',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Warszawa',
    'addressCountry': 'PL'
  },
  'serviceType': [
    'Agencja SEO Warszawa',
    'Pozycjonowanie stron internetowych',
    'Audyt SEO',
    'Projektowanie stron internetowych',
    'SEO lokalne',
    'Optymalizacja SEO',
    'Agencja marketingowa'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/AI SEO COMPANY Logotyp.svg" type="image/svg+xml" />
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
