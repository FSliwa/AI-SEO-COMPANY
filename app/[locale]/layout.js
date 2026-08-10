import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import CookiesBanner from '@/components/CookiesBanner';

export const metadata = {
  metadataBase: new URL('https://www.ai-seo-company.pl/'),
  title: 'Agencja SEO Warszawa | Pozycjonowanie Stron | AI SEO COMPANY',
  description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe, które sprzedają. Kompleksowe pozycjonowanie stron, audyt SEO i web design.',
  icons: {
    icon: [
      { url: '/ai-seo-company-logotyp.svg?v=2', type: 'image/svg+xml', sizes: 'any' }
    ],
    shortcut: '/ai-seo-company-logotyp.svg?v=2',
    apple: '/ai-seo-company-logotyp.svg?v=2',
  },
  openGraph: {
    title: 'Agencja SEO Warszawa | Pozycjonowanie i Web Design',
    description: 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe zoptymalizowane pod konwersję, audyt SEO i wysokie pozycje w Google.',
    url: 'https://www.ai-seo-company.pl/',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://www.ai-seo-company.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI SEO COMPANY | Agencja SEO Warszawa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agencja SEO Warszawa | Pozycjonowanie i Web Design',
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
      'telephone': '+48518815055',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'ul. Grzybowska 12/14 lok. B-3',
        'addressLocality': 'Warszawa',
        'postalCode': '00-132',
        'addressCountry': 'PL'
      },
      'vatID': 'PL5253090237',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00'
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
      'name': 'AI SEO COMPANY | Agencja SEO Warszawa',
      'publisher': {
        '@id': 'https://www.ai-seo-company.pl/#organization'
      },
      'inLanguage': 'pl-PL'
    }
  ]
};

import Script from 'next/script';

import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/ai-seo-company-logotyp.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {/* Consent Mode v2 defaults. This must execute before the gtag library
            loads, otherwise Analytics writes _ga cookies on first paint —
            before the banner has been answered, which art. 173 of the Polish
            electronic communications law does not allow. The banner calls
            gtag('consent','update',…) once the user decides. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVVRW8FP30"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WVVRW8FP30');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookiesBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
