'use client';

import { useLocale } from 'next-intl';

const BASE = 'https://www.ai-seo-company.pl';

// Strony uslugowe publikowaly konkretne ceny, ale nie deklarowaly maszynowo ani
// jakiej uslugi dotycza, ani dla jakiego obszaru, ani za ile - w calym serwisie
// nie bylo ani jednego wezla Service, Offer czy Product. To nie generuje wyniku
// rozszerzonego, ale jest podstawowym budulcem grafu encji i tym, co czytaja
// wyszukiwarki oparte na modelach jezykowych.
//
// offers wypelniamy WYLACZNIE tam, gdzie kwota jest widoczna na stronie - dane
// strukturalne maja odpowiadac tresci, wiec strona bez cennika nie deklaruje ceny.
//
// 5.11.2026 (SCH1; MSA-06, OP-17, SA-06): oferty = tresc strony. Lista `oferty` zamiast
// jednego `cena`, gdy strona pokazuje kilka kwot. Pola oferty: pl/en (nazwa), cena/cenaEn,
// miesiecznie (UnitPriceSpecification z unitCode MON), od (cena "od": PriceSpecification
// z minPrice). Klucz z tylkoPl: true istnieje tylko po polsku - dla EN komponent zwraca null.
// Przy zmianie ceny na stronie zmienic ja tez tutaj (i LASTMOD strony w lib/lastmod.js).
const USLUGI = {
  // Kwoty: "Jako samodzielna usluga kosztuje od 1 490 zl netto" / "starts at €350 net"
  // (app/[locale]/audyt-seo/page.js, FAQ o cenie).
  'audyt-seo': {
    pl: { name: 'Audyt SEO', desc: 'Kompleksowy audyt SEO strony: analiza techniczna, indeksacja, Core Web Vitals, struktura nagłówków, frazy kluczowe i wytyczne UX.' },
    en: { name: 'SEO audit', desc: 'Comprehensive SEO audit: technical analysis, indexing, Core Web Vitals, heading structure, keyword research and UX guidelines.' },
    typ: 'SEO audit',
    url: { pl: `${BASE}/audyt-seo`, en: `${BASE}/en/seo-audit` },
    cena: null,
    oferty: [
      { pl: 'Audyt SEO jako samodzielna usługa', en: 'Standalone SEO audit', cena: 1490, cenaEn: 350, miesiecznie: false, od: true },
    ],
  },
  'pozycjonowanie': {
    pl: { name: 'Pozycjonowanie stron internetowych', desc: 'Profesjonalne pozycjonowanie stron internetowych dla firm B2B: optymalizacja techniczna, treść, link building i raportowanie.' },
    en: { name: 'Search engine optimization', desc: 'Professional search engine optimization for B2B companies: technical optimisation, content, link building and reporting.' },
    typ: 'Search engine optimization',
    url: { pl: `${BASE}/pozycjonowanie-stron-internetowych`, en: `${BASE}/en/seo-services` },
    cena: 1900,
    cenaEn: 450,
  },
  'cennik': {
    pl: { name: 'Pakiety pozycjonowania stron', desc: 'Cennik pozycjonowania stron: abonamentowe pakiety SEO Standard i SEO Premium z miesięczną subskrypcją i możliwością rezygnacji.' },
    en: { name: 'SEO packages', desc: 'SEO pricing: Standard and Premium subscription packages with monthly billing and cancellation at any time.' },
    typ: 'Search engine optimization',
    url: { pl: `${BASE}/cennik-pozycjonowania`, en: `${BASE}/en/seo-pricing` },
    cena: null,
    // Trzy karty cennika (components/Pricing.jsx, messages/*.json: standardPrice,
    // premiumPrice, boosterPrice): 1 900 / 2 500 / 2 500 zl netto mies., EN 450 / 590 / 590 EUR.
    oferty: [
      { pl: 'SEO Standard', en: 'SEO Standard', cena: 1900, cenaEn: 450, miesiecznie: true },
      { pl: 'SEO Premium', en: 'SEO Premium', cena: 2500, cenaEn: 590, miesiecznie: true },
      { pl: 'Booster Pack', en: 'Booster Pack', cena: 2500, cenaEn: 590, miesiecznie: true },
    ],
  },
  'seo-lokalne': {
    pl: { name: 'SEO lokalne w Warszawie', desc: 'Pozycjonowanie lokalne: optymalizacja Wizytówki Google, spójność NAP, strategia opinii i widoczność w Mapach Google.' },
    en: { name: 'Local SEO in Warsaw', desc: 'Local SEO: Google Business Profile optimisation, NAP consistency, review strategy and Google Maps visibility.' },
    typ: 'Local SEO',
    url: { pl: `${BASE}/seo-lokalne-warszawa`, en: `${BASE}/en/local-seo-warsaw` },
    cena: 1900,
    cenaEn: 450,
  },
  'web-design': {
    pl: { name: 'Projektowanie stron internetowych', desc: 'Projektowanie i wdrażanie stron internetowych: indywidualny projekt UX/UI, wersja mobilna i optymalizacja pod konwersję.' },
    en: { name: 'Web design', desc: 'Web design and development: bespoke UX/UI, responsive layouts and conversion optimisation.' },
    typ: 'Web design',
    url: { pl: `${BASE}/projektowanie-stron-internetowych`, en: `${BASE}/en/web-design` },
    cena: null,
    // Kwoty z FAQ strony (app/[locale]/projektowanie-stron-internetowych/page.js): strona
    // "od 5 900 zl netto" / "starts at €1,400 net" jednorazowo; Booster Pack 2 500 zl / 590 EUR mies.
    // (wczesniej deklarowalismy 1 900 zl, czyli cene pozycjonowania - MSA-06, OP-17).
    oferty: [
      { pl: 'Strona internetowa', en: 'Company website', cena: 5900, cenaEn: 1400, miesiecznie: false, od: true },
      { pl: 'Booster Pack', en: 'Booster Pack', cena: 2500, cenaEn: 590, miesiecznie: true },
    ],
  },
  // 4.11.2026: strona GEO pokazuje dwie ceny (audyt jednorazowy i doplata
  // miesieczna do Standard), wiec zamiast jednego `cena` ma liste `oferty`.
  // Kwoty jak w components/GeoPageClient.jsx (T.pl.offer / T.en.offer).
  'geo': {
    pl: { name: 'Pozycjonowanie w AI (GEO)', desc: 'Pozycjonowanie w AI: widoczność firmy w odpowiedziach ChatGPT, Gemini, Perplexity i przeglądów AI w Google, z cotygodniowym pomiarem w panelu klienta.' },
    en: { name: 'AI search optimization (GEO)', desc: 'AI search optimization: getting your company mentioned in ChatGPT, Gemini, Perplexity and Google AI overviews, measured weekly in the client portal.' },
    typ: 'Generative engine optimization',
    url: { pl: `${BASE}/pozycjonowanie-w-ai`, en: `${BASE}/en/ai-search-optimization` },
    cena: null,
    oferty: [
      { pl: 'Audyt widoczności w AI', en: 'AI visibility audit', cena: 990, cenaEn: 235, miesiecznie: false },
      { pl: 'Dopłata do SEO Standard: pomiar i działania pod AI', en: 'Add-on to SEO Standard: AI measurement and actions', cena: 490, cenaEn: 115, miesiecznie: true },
    ],
  },
  // Nowe strony z PLAN-v2 (tylko PL, za bramka publikacji lib/publikacja.js).
  // L1 (6.6; CB-02): wariant B ceny - pakiet SEO Standard od 1 900 zl netto mies. z wizytowka.
  // Opis z briefu L1; zdanie o 49 punktach usunac, jesli siatki nie ma w SEO Standard (CB-02).
  'wizytowka': {
    tylkoPl: true,
    pl: { name: 'Pozycjonowanie wizytówki Google', desc: 'Pozycjonowanie Profilu Firmy w Google: kategorie, usługi, opinie, posty i pomiar pozycji w Mapach Google z 49 punktów co 14 dni w panelu klienta.' },
    typ: 'Google Business Profile optimization',
    url: { pl: `${BASE}/pozycjonowanie-wizytowki-google` },
    cena: null,
    oferty: [
      { pl: 'SEO Standard z prowadzeniem wizytówki', cena: 1900, miesiecznie: true },
    ],
  },
  // A5 (6.7): audyt widocznosci w AI 990 zl netto jednorazowo (ta sama kwota co oferta 'geo').
  'geo-audyt': {
    tylkoPl: true,
    pl: { name: 'Audyt widoczności w AI', desc: 'Audyt widoczności firmy w AI: 30 pytań klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI w Google, źródła cytowań i plan działań na 90 dni.' },
    typ: 'Generative engine optimization audit',
    url: { pl: `${BASE}/pozycjonowanie-w-ai/audyt-widocznosci` },
    cena: null,
    oferty: [
      { pl: 'Audyt widoczności w AI', cena: 990, miesiecznie: false },
    ],
  },
};

export default function ServiceSchema({ variant }) {
  const lang = useLocale();
  const isEn = lang === 'en';
  const u = USLUGI[variant];
  if (!u) return null;
  if (u.tylkoPl && isEn) return null;

  const t = isEn ? u.en : u.pl;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${u.url[isEn ? 'en' : 'pl']}#service`,
    name: t.name,
    description: t.desc,
    serviceType: u.typ,
    url: u.url[isEn ? 'en' : 'pl'],
    provider: { '@id': `${BASE}/#organization` },
    areaServed: isEn
      ? { '@type': 'AdministrativeArea', name: 'Warsaw and Poland' }
      : { '@type': 'AdministrativeArea', name: 'Warszawa i Polska' },
    availableLanguage: ['pl', 'en'],
  };

  // Karty cennika i lista uslug w formularzu podaja na EN euro (450 / 590),
  // a nie zlote - dane strukturalne musza deklarowac to samo, co widzi
  // uzytkownik, inaczej Offer przeczy tresci strony.
  const kwota = isEn ? u.cenaEn : u.cena;
  const waluta = isEn ? 'EUR' : 'PLN';

  if (kwota) {
    jsonLd.offers = {
      '@type': 'Offer',
      priceCurrency: waluta,
      price: kwota,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: waluta,
        price: kwota,
        minPrice: kwota,
        unitCode: 'MON',
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: u.url[isEn ? 'en' : 'pl'],
    };
  }

  if (u.oferty) {
    jsonLd.offers = u.oferty.map((o) => {
      const cena = isEn ? o.cenaEn : o.cena;
      const offer = {
        '@type': 'Offer',
        name: isEn ? o.en : o.pl,
        priceCurrency: waluta,
        price: cena,
        availability: 'https://schema.org/InStock',
        url: u.url[isEn ? 'en' : 'pl'],
      };
      if (o.miesiecznie) {
        offer.priceSpecification = {
          '@type': 'UnitPriceSpecification',
          priceCurrency: waluta,
          price: cena,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        };
      } else if (o.od) {
        // Cena "od" (audyt, strona): kwota minimalna, ostateczna zalezy od zakresu.
        offer.priceSpecification = {
          '@type': 'PriceSpecification',
          minPrice: cena,
          priceCurrency: waluta,
          valueAddedTaxIncluded: false,
        };
      }
      return offer;
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
