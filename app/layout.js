import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import CookiesBanner from '@/components/CookiesBanner';

export const metadata = {
  title: 'Agencja brandingu i web design Warszawa | AI SEO COMPANY',
  description: 'Projektujemy marki i strony, które sprzedają. Branding, web design i SEO w jednym zespole. Zobacz portfolio i cennik.',
  keywords: 'agencja seo, branding, web design, strony next.js, pozycjonowanie warszawa',
  icons: {
    icon: '/AI SEO COMPANY Logotyp.svg',
    shortcut: '/AI SEO COMPANY Logotyp.svg',
    apple: '/AI SEO COMPANY Logotyp.svg',
  },
  openGraph: {
    title: 'AI SEO COMPANY — Branding, Web Design & SEO Studio',
    description: 'Projektujemy marki i strony internetowe w Next.js zoptymalizowane pod konwersję i wyniki organiczne.',
    url: 'https://ase-bot.live',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/AI SEO COMPANY Logotyp.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
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
