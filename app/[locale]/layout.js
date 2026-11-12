import '../globals.css';
import '../wyglad.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { DEFAULT_ROBOTS } from '@/lib/blogPosts';
import CookiesBanner from '@/components/CookiesBanner';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import AttributionCapture from '@/components/AttributionCapture';
import RuchUzytkownika from '@/components/RuchUzytkownika';
import WebVitals from '@/components/WebVitals';
import NewsletterPopupLoader from '@/components/NewsletterPopupLoader';

// Google tag konta Google Ads 230-348-6643. Identyfikator jest publiczny (widać go
// w HTML każdej strony z tagiem), więc może być w kodzie; zmienna środowiskowa
// pozwala go podmienić bez commitu, np. przy zmianie konta.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18426058950';

// Druga właściwość GA4 (552660385, G-85M09H5733) należy do konta Google, które jest
// właścicielem konta Google Ads 230-348-6643, więc łączy się z Ads bezpośrednio
// (pierwsza, G-WVVRW8FP30, leży na innym loginie i takiego linku nie dostanie).
// Pierwsza zostaje na stronie; gtag wysyła każde zdarzenie do obu konfiguracji.
const GA4_ADS_ID = process.env.NEXT_PUBLIC_GA4_ADS_ID || 'G-85M09H5733';


// Wersja EN grafu: te same encje, angielskie pola tekstowe. Wczesniej /en
// serwowal polski opis Organization i polska nazwe WebSite.
// 14.10.2026: nazwa WebSite nie jest juz tlumaczona - to nazwa marki, a nie
// tekst. Jedna encja #website miala dwie nazwy (PL i EN), obie ze sloganem.
// Z tego samego powodu znika nadpisanie alternateName organizacji.
function localizedJsonLd(locale) {
  if (locale !== 'en') return jsonLdDataPl;
  const data = JSON.parse(JSON.stringify(jsonLdDataPl));
  for (const node of data['@graph']) {
    if (node['@id'] === 'https://www.ai-seo-company.pl/#organization') {
      // 5.11.2026 (PLAN-v2 6.24, E1; AV-05 po weryfikacji): zdanie encji EN, to samo co na
      // /en/about-us i w profilach EN. Pomiar AI tylko w SEO Premium - nie „każdy klient”.
      node.description = 'AI SEO COMPANY is a Warsaw-based SEO and AI search optimization (GEO) agency for small and medium businesses: website and Google Business Profile SEO, SEO audits, Next.js websites and, in SEO Premium, weekly visibility tracking in ChatGPT, Perplexity, Gemini and Google AI Overviews. Every client gets a 24/7 client portal, a monthly contract and transparent pricing from €450 net a month.';
      // Te same tematy co w wersji PL, po angielsku (zasada tej funkcji: angielskie pola tekstowe).
      node.knowsAbout = ['Search engine optimization', 'AI search optimization (GEO, Generative Engine Optimization)', 'Local SEO', 'SEO audit', 'Web design'];
      if (node.areaServed && node.areaServed.name) node.areaServed.name = 'Warsaw and Poland';
    }
    if (node['@type'] === 'WebSite') {
      if (node.inLanguage) node.inLanguage = 'en-US';
    }
  }
  return data;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Rewalidacja co godzine - tresc marketingowa zmienia sie deployami.
export const revalidate = 3600;

// Blok Open Graph byl statyczny i wspolny dla calego serwisu: og:url wskazywal
// strone glowna na 50 z 52 podstron, og:title i og:description dziedziczyly opis
// strony glownej po polsku (takze na /en), a og:locale zawsze mowil pl_PL.
// Teraz layout ustawia tylko to, co faktycznie jest wspolne - obraz, nazwe
// serwisu i locale zalezny od jezyka. og:title, og:description i og:url celowo
// nie sa tu ustawiane: bez nich scrapery biora tytul i opis z metadanych danej
// strony, czyli dokladnie te, ktore sa dla niej napisane.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    metadataBase: new URL('https://www.ai-seo-company.pl/'),
    title: isEn
      ? 'SEO Company, Marketing Agency | Search Engine Optimization'
      : 'Agencja SEO Warszawa | Pozycjonowanie Stron | AI SEO COMPANY',
    description: isEn
      ? 'Modern SEO agency from Warsaw. We design websites that sell, run professional SEO audits and deliver measurable search engine optimization.'
      : 'Nowoczesna agencja SEO Warszawa. Projektujemy marki i strony internetowe, które sprzedają. Kompleksowe pozycjonowanie stron, audyt SEO i web design.',
    // 5.11.2026 (PLAN-v2 rozdz. 7, FAV; BL-10 po weryfikacji): iOS nie używa ikony SVG, a
    // /favicon.ico i /apple-touch-icon.png zwracały 404. Oba pliki w public/ są wygenerowane
    // z public/ai-seo-company-logotyp-v2.png (białe tło). SVG zostaje ikoną dla przeglądarek,
    // które go obsługują; ICO dla starszych klientów i czystych logów.
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/ai-seo-company-logotyp.svg?v=2', type: 'image/svg+xml', sizes: 'any' }
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      siteName: 'AI SEO COMPANY',
      locale: isEn ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: 'https://www.ai-seo-company.pl/og-image.jpg',
          width: 1024,
          height: 1024,
          alt: isEn ? 'AI SEO COMPANY | SEO Agency Warsaw' : 'AI SEO COMPANY | Agencja SEO Warszawa',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://www.ai-seo-company.pl/og-image.jpg'],
    },
    // 14.10.2026: bez tej reguly Google moze pokazac podglad obrazu tylko
    // w rozmiarze domyslnym; 'large' to samo zezwolenie na duzy podglad,
    // obrazu nie tworzy. Duza karta Discover wymaga obrazu >= 1200 px, ktory
    // nie jest logo. Taki obraz maja dzis tylko dane strukturalne czesci
    // artykulow (BlogPosting.image): w tresci artykulow nie ma <img>, a
    // og:image to ogolna grafika z logo (1024 px). Duza karta jest wiec
    // mozliwa, ale niepewna. Nie zmienia indeksowania ani snippetow
    // tekstowych. Artykuly nadpisuja robots przez articleRobots, ktory zwraca
    // te sama stala (lib/blogPosts.js).
    robots: DEFAULT_ROBOTS,
  };
}

const jsonLdDataPl = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.ai-seo-company.pl/#organization',
      'name': 'AI SEO COMPANY',
      // The brand and the registered firm differ; both belong in the graph so the
      // entity resolves against public registers as well as the brand name.
      'legalName': 'AI SIGNALS COMPANY Prosta Spółka Akcyjna',
      // 14.10.2026: usuniety alternateName 'Agencja SEO Warszawa AI SEO COMPANY'
      // (fraza, a nie nazwa firmy). Google: Organization ma miec ten sam name
      // i alternateName co nazwa witryny (WebSite nizej nie ma alternateName).
      'identifier': [
        { '@type': 'PropertyValue', 'propertyID': 'KRS', 'value': '0001239983' },
        { '@type': 'PropertyValue', 'propertyID': 'REGON', 'value': '544761611' }
      ],
      // 5.11.2026 (PLAN-v2 6.24, E1; AV-05 po weryfikacji): jedno zdanie encji (59 słów) w JSON-LD,
      // public/llms.txt, pierwszym akapicie /o-nas i w profilach Clutch, Sortlist, LinkedIn - modele
      // AI składają encję z powtarzalnego opisu, a dotąd każde miejsce mówiło co innego. Zmiana
      // dotyczy tylko <script> (strażnik fraz go pomija); title i description strony głównej bez zmian.
      'description': 'AI SEO COMPANY to agencja SEO i pozycjonowania w AI (GEO) z Warszawy dla małych i średnich firm: pozycjonowanie stron i wizytówek Google, audyty SEO, strony w Next.js oraz, w SEO Premium, cotygodniowy pomiar widoczności w ChatGPT, Perplexity, Gemini i przeglądach AI Google. Każdy klient ma panel klienta 24/7, umowę miesięczną i jawny cennik od 1 900 zł netto miesięcznie.',
      'url': 'https://www.ai-seo-company.pl/',
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
      // 14.10.2026: punkt adresowy budynku Grzybowska 12/14 z rejestru GUGiK
      // (usluga UUG, stan 14.10.2026; rejestr nie geokoduje lokalu B-3).
      // 7 miejsc po przecinku: Google wymaga co najmniej 5, a 21.00000 JSON
      // zapisalby jako 21. Przy zmianie siedziby zmienic address i geo razem.
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 52.2370497,
        'longitude': 20.9999951
      },
      // 14.10.2026: bylo 'vatID': 'PL5253090237', ale VIES zwraca dla tego
      // numeru isValid: false, a spolki nie ma w wykazie VAT MF. NIP z KRS
      // (ten sam co w stopce) to taxID. vatID przywrocic dopiero, gdy VIES
      // potwierdzi rejestracje VAT-UE.
      'taxID': '5253090237',
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
      'priceRange': '$$$',
      // 5.11.2026 (PLAN-v2 6.24, E1; AV-04 po weryfikacji): założyciel jako odwołanie do węzła
      // Person z /o-nas (AUTHOR_ID w components/about/AboutAuthor.jsx - tamten plik jest
      // 'use client', więc stałej nie importujemy do layoutu serwerowego, tylko powtarzamy adres).
      'founder': { '@id': 'https://www.ai-seo-company.pl/o-nas#filip-sliwa' },
      // Rozwinięcie skrótu GEO (AV-19): bez niego modele czytają „GEO” jako geotargetowanie.
      'knowsAbout': [
        'Pozycjonowanie stron',
        'Pozycjonowanie w AI (GEO, Generative Engine Optimization)',
        'SEO lokalne',
        'Audyt SEO',
        'Projektowanie stron internetowych'
      ],
      // 4.11.2026: profile firmy poza stroną (modele AI i Google łączą je w jedną encję).
      // 5.11.2026 (AV-04): + Clutch (profil cytowany przez Perplexity). Nazwę wyświetlaną
      // „AI SEO COMPANY” (nazwa prawna w danych firmy) na obu profilach ustawia Filip (E1).
      // Kolejne adresy dopisywać w dniu, w którym zwracają 200 i mają nazwę „AI SEO COMPANY”:
      // LinkedIn firmy, kanał YouTube, Wikidata, Profil Firmy w Google (też jako hasMap, GBP-SA).
      'sameAs': [
        'https://www.sortlist.co.uk/agency/ai-signals-company',
        'https://clutch.co/profile/ai-signals-company-prosta-sp-ka-akcyjna'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.ai-seo-company.pl/#website',
      'url': 'https://www.ai-seo-company.pl/',
      // 14.10.2026: bylo 'AI SEO COMPANY | Agencja SEO Warszawa'. Google
      // (Search Central, nazwy witryn) chce krotkiej nazwy marki bez sloganu,
      // spojnej z og:site_name i Organization.name na wszystkich jezykach.
      'name': 'AI SEO COMPANY',
      'publisher': {
        '@id': 'https://www.ai-seo-company.pl/#organization'
      },
      'inLanguage': 'pl-PL'
    }
  ]
};

import KursorWgTla from '@/components/KursorWgTla';
import PetleWidoczne from '@/components/PetleWidoczne';
import Typografia from '@/components/Typografia';
import Script from 'next/script';

import { Geist, Geist_Mono, Inter, Space_Grotesk } from 'next/font/google';

// 6.11.2026 (wyglad z makiety, DESIGN.md): Geist zamiast Inter + Space Grotesk.
// Podzbior latin-ext jest konieczny - Inter ladowany tylko z 'latin' nie mial
// polskich liter i "ą ę ł ż" rysowal font zastepczy. Stare zmienne --font-inter
// i --font-space wskazuja na Geist w app/wyglad.css, wiec reguly globals.css
// i style w komponentach dzialaja bez zmian.
const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-geist-mono', display: 'swap' });
// 7.11.2026: hero strony glownej 1:1 z produkcja (robot 3D) - jego teksty zostaja
// w Inter i Space Grotesk. Zmienne --font-inter/--font-space przepina na nie
// app/wyglad.css tylko wewnatrz .hero.
const interHero = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter-oryg', display: 'swap' });
const spaceHero = Space_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-space-oryg', display: 'swap' });

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Statyczne generowanie + ISR: bez tego next-intl czyta naglowki
  // zadania i kazda strona renderuje sie na kazde wejscie
  // (cache-control: no-store, TTFB 0,5-2 s - audyt 24.08).
  setRequestLocale(locale);
  const messages = await getMessages();

  // Preload sceny 3D hero przeniesiony do app/[locale]/page.js: tylko strona
  // glowna ma hero, a stad 4,9 MB leciało z fetchPriority=high na KAZDEJ
  // podstronie - takze na landingach kampanii Ads (/cennik-pozycjonowania,
  // /audyt-seo, ...), gdzie nikt tego pliku nie uzywa (Lighthouse 22.09).

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/ai-seo-company-logotyp.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedJsonLd(locale)) }}
        />
        {/* Consent Mode v2 defaults. This must execute before the gtag library
            loads, otherwise Analytics writes _ga cookies on first paint –
            before the banner has been answered, which art. 173 of the Polish
            electronic communications law does not allow. The banner calls
            gtag('consent','update',…) once the user decides. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            /* RODO obowiązuje terytorialnie, więc blankietowe „denied" kosztowało
               pomiar konwersji wszędzie tam, gdzie nie jest wymagane. EOG + UK +
               Szwajcaria zachowują restrykcyjny domyślny stan i czekają na baner;
               pozostałe regiony startują z granted. */
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500,
              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','IS','GB','CH']
            });
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
              functionality_storage: 'granted',
              security_storage: 'granted'
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

            /* Tylko domena produkcyjna. Podglądy *.vercel.app wysyłały dane do
               produkcyjnego Ads i GA4 (Tag diagnostics, 24.09.2026), a localhost
               mógłby dopisać konwersję testową do konta. Bez config zdarzenia
               nie mają celu; konwersję Ads osobno blokuje flaga w Contact.jsx. */
            window.__aiscTracking = /^(www\\.)?ai-seo-company\\.pl$/.test(location.hostname);
            if (window.__aiscTracking) {
              gtag('config', 'G-WVVRW8FP30');
              gtag('config', '${GA4_ADS_ID}');
              gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });
            }
          `}
        </Script>
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${interHero.variable} ${spaceHero.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <KursorWgTla />
          <PetleWidoczne />
          <Typografia />
          {/* Baner zgody pierwszy w DOM (05.10.2026). Stal za <main> i <footer>,
              wiec z klawiatury "Odrzuc opcjonalne" wypadalo dopiero po 62-64 Tab
              na stronie glownej (48-54 na podstronach). Baner jest position:
              fixed, wiec kolejnosc w DOM nie zmienia wygladu, a fokusu nie
              przejmuje - po zmianie to 2.-3. Tab (symulacja w DOM, 390/1440 px).
              Plywajacy przycisk zgody wychodzi portalem na koniec body
              (CookiesBanner.jsx). Wewnatrz RuchUzytkownika, zeby wjazd banera
              i skala okna preferencji tez respektowaly "ogranicz ruch". */}
          <RuchUzytkownika>
            <CookiesBanner />
            {children}
          </RuchUzytkownika>
          <AnalyticsEvents />
          {/* 5.11.2026 (RUM, TS-01): Core Web Vitals tylko do GA4 547365077. */}
          <WebVitals />
          <AttributionCapture />
          {/* 12.11.2026: popup z lead magnetem (lib/popupOferty.js). Poza <main> i bez HTML z serwera
              (renderuje null do wyzwolenia), więc odcisk stron do lastmod się nie zmienia. */}
          <NewsletterPopupLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
