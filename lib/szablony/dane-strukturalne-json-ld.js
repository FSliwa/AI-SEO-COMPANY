// Dane strukturalne: wzory JSON-LD (11.11.2026): /narzedzia/dane-strukturalne-json-ld
// i /en/tools/schema-markup-examples. Kontrakt danych: lib/szablony/README.md.
// PDF: public/pliki/wzory-danych-strukturalnych.pdf (PL) i schema-markup-examples.pdf (EN),
// źródła HTML w scripts/szablony/pdf/ (generowane z WZORY poniżej, jedno źródło kodu).
// Klaster (frazy.csv:352–353, PLAN-v2 wiersz 109): „schema org”, „dane strukturalne”, „json-ld”
// przechodzą z niezbudowanego /blog/dane-strukturalne-schema-org na tę stronę; przyszły generator
// schema będzie osobnym narzędziem.
// Fakty o Google wyłącznie ze stron z pola zrodla (odczyt 11.11.2026). Ważne zmiany sprawdzone
// w changelogu Google: wynik FAQ niepokazywany od 7.05.2026 (dokumentacja usunięta w czerwcu 2026),
// HowTo wycofane 13.09.2023, sitelinks search box usunięty 29.11.2024, okruszki tylko na
// komputerach od 22.01.2025. Do przeglądów AI Google nie wymaga specjalnych danych strukturalnych.
// Wartości w wzorach (twojadomena.pl, 00-001, +48 22 000 00 00) są przykładowe i do podmiany.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Kod JSON-LD w jednej linii (spacje po przecinkach), żeby dał się skopiować z <code> bez <pre>.
const kod = (o) => `<p><code>${esc(JSON.stringify(o, null, 1).replace(/\n\s*/g, ' '))}</code></p>`;

const PL_DOMENA = 'https://www.twojadomena.pl';
const EN_DOMENA = 'https://www.example.com';

// Wzory JSON-LD: jedno źródło dla strony i dla PDF (scripts/szablony/pdf/*.html).
export const WZORY = {
  pl: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${PL_DOMENA}/#organizacja`,
      name: 'Nazwa Firmy',
      legalName: 'Nazwa Firmy Sp. z o.o.',
      url: `${PL_DOMENA}/`,
      logo: `${PL_DOMENA}/logo.png`,
      description: 'Jedno zdanie o tym, czym zajmuje się firma.',
      email: 'kontakt@twojadomena.pl',
      telephone: '+48 22 000 00 00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Przykładowa 1',
        addressLocality: 'Warszawa',
        postalCode: '00-001',
        addressCountry: 'PL',
      },
      taxID: '0000000000',
      vatID: 'PL0000000000',
      sameAs: ['https://www.linkedin.com/company/nazwa-firmy', 'https://www.facebook.com/nazwafirmy'],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Nazwa Firmy',
      alternateName: 'NF',
      url: `${PL_DOMENA}/`,
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'Plumber',
      '@id': `${PL_DOMENA}/#firma`,
      name: 'Nazwa Firmy',
      url: `${PL_DOMENA}/`,
      image: `${PL_DOMENA}/zdjecia/siedziba.jpg`,
      logo: `${PL_DOMENA}/logo.png`,
      telephone: '+48 22 000 00 00',
      email: 'kontakt@twojadomena.pl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Przykładowa 1',
        addressLocality: 'Warszawa',
        postalCode: '00-001',
        addressCountry: 'PL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 52.231812, longitude: 21.006012 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
      ],
      priceRange: '150-400 zł',
      sameAs: ['https://www.facebook.com/nazwafirmy'],
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${PL_DOMENA}/` },
        { '@type': 'ListItem', position: 2, name: 'Usługi', item: `${PL_DOMENA}/uslugi` },
        { '@type': 'ListItem', position: 3, name: 'Hydraulik awaryjny' },
      ],
    },
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Tytuł artykułu taki jak w nagłówku H1',
      image: [`${PL_DOMENA}/blog/okladka-16x9.jpg`, `${PL_DOMENA}/blog/okladka-1x1.jpg`],
      datePublished: '2026-11-11T08:00:00+01:00',
      dateModified: '2026-11-11T08:00:00+01:00',
      author: [
        { '@type': 'Person', name: 'Jan Kowalski', jobTitle: 'Specjalista SEO', url: `${PL_DOMENA}/autorzy/jan-kowalski` },
      ],
      publisher: { '@type': 'Organization', name: 'Nazwa Firmy', url: `${PL_DOMENA}/` },
    },
    profilePage: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateModified: '2026-11-11T08:00:00+01:00',
      mainEntity: {
        '@type': 'Person',
        name: 'Jan Kowalski',
        jobTitle: 'Specjalista SEO',
        description: 'Jedno lub dwa zdania o doświadczeniu i specjalizacji autora.',
        image: `${PL_DOMENA}/autorzy/jan-kowalski.jpg`,
        worksFor: { '@type': 'Organization', name: 'Nazwa Firmy', url: `${PL_DOMENA}/` },
        knowsAbout: ['SEO techniczne', 'dane strukturalne'],
        sameAs: ['https://www.linkedin.com/in/twoj-profil'],
      },
    },
    product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Nazwa produktu',
      image: [`${PL_DOMENA}/produkty/nazwa-produktu-1x1.jpg`],
      description: 'Krótki opis produktu taki jak na karcie.',
      sku: 'SKU-0001',
      brand: { '@type': 'Brand', name: 'Marka' },
      offers: {
        '@type': 'Offer',
        url: `${PL_DOMENA}/produkty/nazwa-produktu`,
        price: 149.99,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
      },
    },
  },
  en: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${EN_DOMENA}/#organization`,
      name: 'Your Company',
      legalName: 'Your Company LLC',
      url: `${EN_DOMENA}/`,
      logo: `${EN_DOMENA}/logo.png`,
      description: 'One sentence about what your company does.',
      email: 'hello@example.com',
      telephone: '+1 217 555 0100',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '100 Example Avenue',
        addressLocality: 'Springfield',
        addressRegion: 'IL',
        postalCode: '62701',
        addressCountry: 'US',
      },
      taxID: '00-0000000',
      sameAs: ['https://www.linkedin.com/company/your-company', 'https://www.facebook.com/yourcompany'],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Your Company',
      alternateName: 'YC',
      url: `${EN_DOMENA}/`,
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'Plumber',
      '@id': `${EN_DOMENA}/#business`,
      name: 'Your Company',
      url: `${EN_DOMENA}/`,
      image: `${EN_DOMENA}/photos/storefront.jpg`,
      logo: `${EN_DOMENA}/logo.png`,
      telephone: '+1 217 555 0100',
      email: 'hello@example.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '100 Example Avenue',
        addressLocality: 'Springfield',
        addressRegion: 'IL',
        postalCode: '62701',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 39.781721, longitude: -89.650148 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
      ],
      priceRange: '$$',
      sameAs: ['https://www.facebook.com/yourcompany'],
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${EN_DOMENA}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${EN_DOMENA}/services` },
        { '@type': 'ListItem', position: 3, name: 'Emergency plumbing' },
      ],
    },
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Article title, same as the H1',
      image: [`${EN_DOMENA}/blog/cover-16x9.jpg`, `${EN_DOMENA}/blog/cover-1x1.jpg`],
      datePublished: '2026-11-11T08:00:00-06:00',
      dateModified: '2026-11-11T08:00:00-06:00',
      author: [
        { '@type': 'Person', name: 'Jane Doe', jobTitle: 'SEO Specialist', url: `${EN_DOMENA}/authors/jane-doe` },
      ],
      publisher: { '@type': 'Organization', name: 'Your Company', url: `${EN_DOMENA}/` },
    },
    profilePage: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateModified: '2026-11-11T08:00:00-06:00',
      mainEntity: {
        '@type': 'Person',
        name: 'Jane Doe',
        jobTitle: 'SEO Specialist',
        description: 'One or two sentences about the author’s experience and focus.',
        image: `${EN_DOMENA}/authors/jane-doe.jpg`,
        worksFor: { '@type': 'Organization', name: 'Your Company', url: `${EN_DOMENA}/` },
        knowsAbout: ['technical SEO', 'structured data'],
        sameAs: ['https://www.linkedin.com/in/your-profile'],
      },
    },
    product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Product name',
      image: [`${EN_DOMENA}/products/product-name-1x1.jpg`],
      description: 'A short product description, as on the product page.',
      sku: 'SKU-0001',
      brand: { '@type': 'Brand', name: 'Brand' },
      offers: {
        '@type': 'Offer',
        url: `${EN_DOMENA}/products/product-name`,
        price: 39.99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
  },
};

const W = WZORY;

const ZRODLA = [
  ['https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', 'Google Search Central: wprowadzenie do danych strukturalnych (formaty, JSON-LD, case studies)', 'Google Search Central: Introduction to structured data markup in Google Search'],
  ['https://developers.google.com/search/docs/appearance/structured-data/sd-policies', 'Google Search Central: ogólne wskazówki dotyczące danych strukturalnych', 'Google Search Central: General structured data guidelines'],
  ['https://developers.google.com/search/docs/appearance/structured-data/search-gallery', 'Google Search Central: dane strukturalne obsługiwane przez wyszukiwarkę Google', 'Google Search Central: Structured data markup that Google Search supports'],
  ['https://developers.google.com/search/docs/appearance/structured-data/organization', 'Google Search Central: dane strukturalne Organization', 'Google Search Central: Organization structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/local-business', 'Google Search Central: dane strukturalne LocalBusiness', 'Google Search Central: Local business (LocalBusiness) structured data'],
  ['https://developers.google.com/search/docs/appearance/site-names', 'Google Search Central: nazwy witryn i dane WebSite', 'Google Search Central: Site names in Google Search (WebSite structured data)'],
  ['https://developers.google.com/search/docs/appearance/structured-data/breadcrumb', 'Google Search Central: dane strukturalne BreadcrumbList', 'Google Search Central: Breadcrumb (BreadcrumbList) structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/article', 'Google Search Central: dane strukturalne Article (dobre praktyki dla autora)', 'Google Search Central: Article structured data (author markup best practices)'],
  ['https://developers.google.com/search/docs/appearance/structured-data/profile-page', 'Google Search Central: dane strukturalne ProfilePage', 'Google Search Central: Profile page (ProfilePage) structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/product-snippet', 'Google Search Central: fragment produktu (Product, Review, Offer)', 'Google Search Central: Product snippet (Product, Review, Offer) structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/merchant-listing', 'Google Search Central: karty sprzedawcy (merchant listing)', 'Google Search Central: Merchant listing (Product, Offer) structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/review-snippet', 'Google Search Central: fragment opinii (opinie o własnej firmie)', 'Google Search Central: Review snippet structured data (self-serving reviews)'],
  ['https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript', 'Google Search Central: generowanie danych strukturalnych w JavaScript', 'Google Search Central: Generate structured data with JavaScript'],
  ['https://developers.google.com/search/docs/appearance/ai-features', 'Google Search Central: funkcje AI w wyszukiwarce a Twoja witryna', 'Google Search Central: AI features and your website'],
  ['https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', 'Google Search Central: optymalizacja pod generatywne funkcje AI (mity: llms.txt, schema)', 'Google Search Central: Optimizing for generative AI features on Search (mythbusting)'],
  ['https://developers.google.com/search/docs/fundamentals/creating-helpful-content', 'Google Search Central: pomocne, wiarygodne treści (autorzy, E-E-A-T)', 'Google Search Central: Creating helpful, reliable, people-first content (authorship, E-E-A-T)'],
  ['https://developers.google.com/search/updates', 'Google Search Central: zmiany w dokumentacji (FAQ 2026, okruszki 2025, sitelinks search box 2024)', 'Google Search Central: Latest documentation updates (FAQ 2026, breadcrumbs 2025, sitelinks search box 2024)'],
  ['https://developers.google.com/search/blog/2023/08/howto-faq-changes', 'Google Search Central Blog: zmiany w wynikach HowTo i FAQ (2023)', 'Google Search Central Blog: Changes to HowTo and FAQ rich results (2023)'],
  ['https://schema.org/LocalBusiness', 'schema.org: LocalBusiness i jego podtypy', 'schema.org: LocalBusiness and its subtypes'],
];

const GBP_PL = { url: 'https://support.google.com/business/answer/7091?hl=pl', nazwa: 'Pomoc Profilu Firmy w Google: poprawianie pozycji w lokalnych wynikach wyszukiwania', data: '2026-11-11' };
const GBP_EN = { url: 'https://support.google.com/business/answer/7091?hl=en', nazwa: 'Google Business Profile Help: Tips to improve your local ranking on Google', data: '2026-11-11' };

export default {
  slug: 'dane-strukturalne-json-ld',
  sciezkaEn: '/tools/schema-markup-examples',
  plik: 'dane-strukturalne',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'dane strukturalne', en: 'schema markup examples' },
  frazyDodatkowe: {
    pl: ['schema org', 'json-ld', 'dane strukturalne google', 'schema organization', 'schema local business', 'dane strukturalne seo'],
    en: ['local business schema', 'json-ld examples', 'organization schema example', 'local business schema example', 'faq schema'],
  },
  seo: {
    pl: {
      tytul: 'Dane strukturalne: wzory JSON-LD schema.org do skopiowania',
      opis: 'Dane strukturalne JSON-LD dla firmy: 7 wzorów schema.org (Organization, LocalBusiness, Article, Product i inne), zasady Google na 2026 i PDF.',
    },
    en: {
      tytul: 'Schema Markup Examples: 7 JSON-LD Templates to Copy (PDF)',
      opis: 'Schema markup examples in JSON-LD: Organization, LocalBusiness, WebSite, Breadcrumb, Article, Person and Product, plus Google’s 2026 rules and a free PDF.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Dane strukturalne JSON-LD',
    tag: 'Szablon PDF do pobrania',
    h1: 'Dane strukturalne: 7 wzorów JSON-LD schema.org dla firmy',
    lead: 'Dane strukturalne to kod JSON-LD, który słownikiem schema.org mówi Google wprost, co jest na stronie: firma z adresem, artykuł z autorem albo produkt z ceną. Dzięki nim strona może kwalifikować się do wyników rozszerzonych, ale Google ich nie gwarantuje. Poniżej 7 wzorów do skopiowania, aktualne zasady Google i karta wdrożenia w PDF.',
    karta: {
      nazwa: 'Dane strukturalne: wzory JSON-LD (PDF)',
      opis: 'Siedem gotowych wzorów schema.org: Organization, LocalBusiness, WebSite, okruszki, Article, autor i Product, z kartą danych firmy i dziennikiem testów.',
      cta: 'Pobierz wzory',
    },
    sekcje: [
      {
        id: 'czym-sa-dane-strukturalne',
        h2: 'Czym są dane strukturalne i co dają w Google',
        html: `<p>Dane strukturalne to opis strony zapisany w ustalonym formacie, który maszyna odczyta bez zgadywania. Zamiast liczyć, że wyszukiwarka sama znajdzie w stopce adres firmy, podajesz go wprost: to jest nazwa, to ulica, to kod pocztowy, a to telefon. Nazwy typów i właściwości pochodzą ze słownika schema.org, wspólnego projektu wyszukiwarek. Google opisuje dane strukturalne jako wyraźne wskazówki o znaczeniu strony.</p>
<p>Co z tego masz? Po pierwsze, strona może kwalifikować się do wyników rozszerzonych: ceny i dostępności produktu, okruszków nad tytułem czy logo w panelu wiedzy. Po drugie, Google łatwiej łączy stronę z firmą, autorem albo produktem, o których mowa. W dokumentacji Google przytacza firmy, które to zmierzyły. Rotten Tomatoes oznaczył 100 000 stron i zanotował o 25% wyższy CTR na stronach z danymi strukturalnymi niż na stronach bez nich.</p>
<p>Dwie rzeczy warto wiedzieć od początku. Poprawny kod nie gwarantuje wyniku rozszerzonego: Google sam decyduje, co pokazać, zależnie od zapytania, urządzenia i lokalizacji użytkownika. Dane muszą też opisywać to, co widzi czytelnik. Oznaczanie treści niewidocznych na stronie albo nieprawdziwych opinii może skończyć się ręcznym działaniem. Takie działanie odbiera stronie kwalifikację do wyników rozszerzonych, ale według Google nie zmienia jej pozycji w zwykłych wynikach.</p>
<h3>JSON-LD, mikrodane czy RDFa?</h3>
<p>Google obsługuje trzy formaty i każdy jest dla niego równie dobry, jeśli kod jest poprawny. Zaleca jednak JSON-LD, bo najłatwiej go wdrożyć i utrzymać. JSON-LD to osobny blok <code>&lt;script type="application/ld+json"&gt;</code> w kodzie strony, niezależny od tekstu. Mikrodane i RDFa to atrybuty dopisane do znaczników HTML, więc zmiana wyglądu strony łatwo je psuje. Wszystkie wzory na tej stronie są w JSON-LD.</p>
<p>Google odczyta też JSON-LD wstawiony przez JavaScript, np. przez Google Tag Manager albo widżet w CMS. Przy produktach ostrzega jednak, że dane generowane dynamicznie mogą sprawić, że roboty zakupowe będą odwiedzać stronę rzadziej i mniej niezawodnie. Dlatego cenę i dostępność najlepiej mieć w HTML wysłanym przez serwer.</p>`,
      },
      {
        id: 'ktore-dane-strukturalne',
        h2: 'Które dane strukturalne wdrożyć: 7 typów schema.org dla firmy',
        html: `<p>Nie musisz oznaczać wszystkiego. Dla strony firmowej, sklepu albo bloga zwykle wystarczy siedem typów ze słownika schema.org. Każdy ma swoje miejsce: dane firmy na stronie głównej, okruszki na podstronach, artykuł na wpisie blogowym. Tabela pokazuje, gdzie wstawić dany typ, co może dać w Google i bez których właściwości kod w ogóle nie kwalifikuje się do funkcji w wynikach.</p>`,
        tabela: {
          id: 'tabela-typy-danych-strukturalnych',
          caption: '7 typów danych strukturalnych: gdzie je wstawić i co mogą dać w Google',
          columns: [
            { key: 'typ', label: 'Typ schema.org' },
            { key: 'gdzie', label: 'Gdzie wstawić' },
            { key: 'efekt', label: 'Co może dać w Google' },
            { key: 'wymagane', label: 'Właściwości wymagane przez Google' },
          ],
          rows: [
            { typ: 'Organization', gdzie: 'Strona główna albo „O nas”', efekt: 'Logo i dane firmy w panelu wiedzy, odróżnienie firmy od innych o podobnej nazwie', wymagane: 'Brak. Zalecane m.in. name, url, logo, address, telephone, sameAs' },
            { typ: 'LocalBusiness (podtyp, np. Dentist, Plumber)', gdzie: 'Strona główna firmy z jedną siedzibą albo strona każdej placówki', efekt: 'Godziny, adres i telefon w panelu wiedzy o firmie', wymagane: 'name, address' },
            { typ: 'WebSite', gdzie: 'Tylko strona główna', efekt: 'Preferowana nazwa witryny nad wynikiem wyszukiwania', wymagane: 'name, url' },
            { typ: 'BreadcrumbList', gdzie: 'Każda podstrona oprócz głównej', efekt: 'Ścieżka okruszków nad tytułem (tylko na komputerach)', wymagane: 'itemListElement: co najmniej dwa ListItem z position, name i item' },
            { typ: 'Article', gdzie: 'Wpis na blogu, poradnik, aktualność', efekt: 'Tytuł, obraz i data w funkcjach artykułów, autor powiązany z treścią', wymagane: 'Brak. Zalecane headline, image, datePublished, dateModified, author' },
            { typ: 'ProfilePage z Person', gdzie: 'Strona autora albo eksperta', efekt: 'Autor jako konkretna osoba; w serwisach społecznościowych także funkcja „Dyskusje i fora”', wymagane: 'mainEntity, a w nim name' },
            { typ: 'Product z Offer', gdzie: 'Karta produktu w sklepie', efekt: 'Cena, dostępność i oceny przy wyniku produktu', wymagane: 'Fragment produktu: name i jedno z offers, review, aggregateRating. Karta sprzedawcy: name, image, offers' },
          ],
          przypis: 'Wymagane właściwości według dokumentacji Google Search Central (odczyt 11.11.2026). Brak wymaganej właściwości oznacza brak kwalifikacji do wyniku rozszerzonego. Google woli mniej właściwości, ale kompletnych i prawdziwych, niż wiele niepełnych.',
        },
        htmlPo: `<p>Czego brakuje w tabeli? FAQPage i HowTo. Oba typy nadal są w słowniku schema.org, ale Google nie pokazuje już wyników rozszerzonych z ich danych (szczegóły niżej, w sekcji o FAQ i AI). Typ Service, który często widać na stronach usług, nie daje osobnego wyniku rozszerzonego. Google może jednak ogólnie korzystać z danych schema.org i właściwości sameAs, więc nie musisz go usuwać, jeśli opisuje to, co widać na stronie.</p>
<p>Tak to wygląda u nas: na ai-seo-company.pl każda strona ma blok firmy (LocalBusiness) i WebSite, strony usług dodatkowo Service i BreadcrumbList, a strona <a href="/o-nas">O nas</a> blok Person założyciela. Tak w praktyce wyglądają dane strukturalne Google na stronie firmy usługowej: kilka typów, każdy z danymi widocznymi na stronie.</p>`,
      },
      {
        id: 'schema-organization',
        h2: 'Schema Organization i WebSite: wzór dla strony głównej',
        html: `<p>Schema Organization mówi Google, kim jest firma: jak się nazywa, gdzie ma siedzibę, jak się z nią skontaktować i które profile w sieci do niej należą. Google nie wymaga tu żadnej właściwości. Zaleca dodać wszystkie, które pasują do firmy, a zwłaszcza przydatne klientom: nazwę, adres albo telefon jako dowód działalności w realnym świecie oraz adres strony i logo jako obecność w sieci.</p>
<p>Blok wstaw na stronie głównej albo na jednej stronie o firmie, np. „O nas”. Nie musisz powtarzać go na każdej podstronie. Jeśli firma przyjmuje klientów w lokalu albo działa na określonym obszarze, użyj zamiast niego podtypu LocalBusiness z następnej sekcji. To też Organization, tylko dokładniejszy.</p>
<h3>Wzór JSON-LD: Organization</h3>
${kod(W.pl.organization)}
<h3>Co oznaczają pola</h3>
<ul>
<li><strong>@id</strong> – stały identyfikator firmy w Twoich danych, np. adres strony z dopiskiem <code>#organizacja</code>. Inne bloki mogą wskazać tę samą firmę przez <code>{"@id": "…"}</code>, bez kopiowania całego opisu.</li>
<li><strong>name i legalName</strong> – nazwa, której używasz na stronie i w wizytówce, oraz pełna nazwa z rejestru, jeśli jest inna. Google prosi, żeby name było takie samo jak nazwa witryny w WebSite.</li>
<li><strong>logo</strong> – adres pliku z logo, co najmniej 112 × 112 pikseli, dostępny dla Googlebota (niezablokowany w robots.txt).</li>
<li><strong>sameAs</strong> – adresy profili firmy w innych serwisach: LinkedIn, Facebook, YouTube, katalog branżowy. Tylko profile, które naprawdę należą do firmy.</li>
<li><strong>taxID i vatID</strong> – NIP w taxID. Jeśli firma ma numer VAT UE, możesz podać go w vatID z prefiksem PL. Google nazywa numer VAT ważnym sygnałem zaufania, bo użytkownik sprawdzi go w publicznym rejestrze.</li>
</ul>
<h3>Wzór JSON-LD: WebSite (nazwa witryny)</h3>
<p>WebSite podpowiada Google, jaką nazwę witryny pokazać nad wynikiem wyszukiwania. Wymagane są dwie właściwości, name i url, a blok wstawiasz tylko na stronie głównej. Krótszą wersję nazwy albo skrót podaj w alternateName. Google bierze pod uwagę także tytuł i nagłówki strony głównej, więc używaj tej samej nazwy wszędzie.</p>
${kod(W.pl.website)}
<p>Pole wyszukiwania pod wynikiem (sitelinks search box) zniknęło z Google, a jego dokumentację usunięto w listopadzie 2024 roku. Fragment <code>potentialAction</code> z <code>SearchAction</code> w bloku WebSite nic dziś w Google nie daje.</p>`,
      },
      {
        id: 'schema-local-business',
        h2: 'Schema LocalBusiness: dane strukturalne firmy lokalnej',
        html: `<p>LocalBusiness to dane strukturalne dla firmy z lokalem albo obszarem działania: gabinetu, warsztatu, restauracji, kancelarii, hydraulika. W poradnikach znajdziesz go też jako „schema local business”. Google wymaga dwóch właściwości: nazwy (name) i adresu (address). Zaleca m.in. telefon, adres strony, godziny otwarcia, współrzędne i przedział cen. LocalBusiness jest podtypem Organization, więc możesz w nim użyć też pól z poprzedniej sekcji, np. logo, sameAs i NIP.</p>
<p>Użyj najdokładniejszego typu, jaki pasuje do firmy. schema.org ma dziesiątki podtypów, np. Dentist, Plumber, Electrician, AutoRepair, HairSalon, AccountingService, Restaurant. Firma, która świadczy kilka rodzajów usług, może podać kilka typów w tablicy, np. <code>"@type": ["Electrician", "Plumber"]</code>. Właściwości additionalType Google tu nie obsługuje. Gdy żaden podtyp nie pasuje, zostaje ogólny LocalBusiness.</p>
<h3>Wzór JSON-LD: LocalBusiness (hydraulik w Warszawie)</h3>
${kod(W.pl.localBusiness)}
<h3>Zasady, o których najczęściej się zapomina</h3>
<ul>
<li><strong>NAP jak w wizytówce.</strong> Nazwa, adres i telefon w kodzie powinny być identyczne z tymi na stronie i w Profilu Firmy w Google. Tak pracujemy przy SEO lokalnym: jeden zapis NAP jest źródłem dla strony, wizytówki, katalogów i danych strukturalnych.</li>
<li><strong>Telefon z kodem kraju</strong>, np. +48 22 000 00 00. Google prosi o kod kraju i numer kierunkowy.</li>
<li><strong>Współrzędne z dokładnością co najmniej 5 miejsc po przecinku</strong> w geo.latitude i geo.longitude. Skopiujesz je z Map Google: kliknij prawym przyciskiem miejsce firmy na mapie.</li>
<li><strong>Godziny w formacie 24-godzinnym</strong> (opens, closes) i dni tygodnia po angielsku: Monday… Sunday. Sezonowe zamknięcie opisz datami validFrom i validThrough.</li>
<li><strong>priceRange krótszy niż 100 znaków</strong>, np. „$$” albo „150-400 zł”. Dłuższego Google nie pokaże.</li>
<li><strong>Bez własnych ocen w gwiazdkach.</strong> aggregateRating i review w LocalBusiness są tylko dla serwisów, które zbierają opinie o innych firmach. Jeśli firma sama kontroluje opinie o sobie, jej strony z LocalBusiness albo Organization nie kwalifikują się do gwiazdek. Opinie klientów zbieraj w Profilu Firmy w Google.</li>
<li><strong>Jedna placówka, jeden blok.</strong> Google prosi, żeby każdą lokalizację opisać osobnym LocalBusiness, najlepiej na jej własnej stronie z adresem i godzinami.</li>
</ul>
<p>Dane strukturalne nie zastąpią wizytówki. W lokalnych wynikach Google bierze pod uwagę trafność, odległość i rozpoznawalność firmy, a do tej ostatniej liczy m.in. linki i opinie. Jak nad tym pracujemy, opisujemy na stronach <a href="/pozycjonowanie-wizytowki-google">pozycjonowanie wizytówki Google</a> i <a href="/seo-lokalne-warszawa">SEO lokalne w Warszawie</a>.</p>`,
      },
      {
        id: 'article-person',
        h2: 'Article i Person: dane strukturalne autora treści',
        html: `<p>Article oznacza wpis na blogu, poradnik albo aktualność. Google nie wymaga w nim żadnej właściwości, ale zaleca tytuł (headline), obraz, datę publikacji i aktualizacji oraz autora. Daty i autor w kodzie mają zgadzać się z tym, co widać na stronie, a obraz ma dotyczyć treści artykułu.</p>
<p>Najwięcej błędów jest w polu author. Google zaleca: każdego autora jako osobny obiekt, typ Person dla ludzi i Organization dla firm, a w name samo imię i nazwisko, bez stanowiska, tytułu naukowego i słów „autor:”. Stanowisko wpisz w jobTitle. Do tego url albo sameAs, czyli link do strony autora.</p>
<h3>Wzór JSON-LD: Article z autorem</h3>
${kod(W.pl.article)}
<h3>Wzór JSON-LD: strona autora (ProfilePage i Person)</h3>
<p>Strona autora to miejsce, do którego prowadzi author.url. ProfilePage mówi Google, że strona dotyczy jednej osoby, a zagnieżdżony Person opisuje, kim ona jest. Wymagane są mainEntity i name. Google wymienia artykuły jako typ, który może wskazywać takie strony profilowe.</p>
${kod(W.pl.profilePage)}
<p>Po co to firmie? Google pyta w swoich wskazówkach o treściach, czy czytelnik od razu widzi, kto jest autorem, i czy podpis prowadzi do informacji o nim. Według Google jasne autorstwo jest zgodne z koncepcją E-E-A-T, czyli doświadczenia, wiedzy, autorytetu i wiarygodności. Samo E-E-A-T nie jest jednak konkretnym czynnikiem rankingowym, a kod nie doda autorowi doświadczenia. Najpierw musi istnieć prawdziwa strona z biogramem, zdjęciem i specjalizacją. Zmyślone profile autorów Google uznaje za oszustwo.</p>
<p>U nas wygląda to tak: strona <a href="/o-nas">O nas</a> ma blok Person założyciela z jobTitle, worksFor i knowsAbout, zgodny z tym, co jest napisane na stronie.</p>`,
      },
      {
        id: 'breadcrumblist-product',
        h2: 'BreadcrumbList i Product: okruszki i karta produktu',
        html: `<p>BreadcrumbList opisuje miejsce strony w strukturze serwisu: Strona główna › Usługi › Hydraulik awaryjny. Google wymaga listy co najmniej dwóch elementów ListItem. Każdy ma pozycję (position), nazwę (name) i adres (item). Ostatni element może nie mieć adresu, wtedy Google użyje adresu bieżącej strony. Ścieżka w kodzie powinna odpowiadać okruszkom widocznym na stronie.</p>
<p>Od stycznia 2025 roku Google pokazuje okruszki w wynikach tylko na komputerach, bo na małych ekranach były przycinane. Dane nadal warto mieć: działają w wynikach na komputerach i porządkują opis struktury serwisu.</p>
<h3>Wzór JSON-LD: BreadcrumbList</h3>
${kod(W.pl.breadcrumb)}
<h3>Wzór JSON-LD: Product z ofertą</h3>
<p>Product to dane karty produktu. Do fragmentu produktu w wynikach Google wymaga nazwy (name) i jednej z trzech właściwości: oferty (offers), opinii (review) albo oceny zbiorczej (aggregateRating). Sklep, w którym da się kupić produkt, może kwalifikować się też do kart sprzedawcy (merchant listings). Tam wymagane są name, image i offers, a waluta jest obowiązkowa. W ofercie podaj cenę jako liczbę, walutę w kodzie ISO 4217 (PLN) i dostępność, np. InStock.</p>
${kod(W.pl.product)}
<p>Cena, dostępność i oceny w kodzie muszą zgadzać się z tym, co widzi klient na karcie produktu, i z plikiem produktowym w Merchant Center. Typowy problem: promocja zmienia cenę na stronie, a JSON-LD generowany z innego pola zostaje przy starej. Jeśli podajesz priceValidUntil, pilnuj daty: z datą z przeszłości fragment produktu może się nie wyświetlić.</p>`,
      },
      {
        id: 'faq-schema-howto-ai',
        h2: 'FAQ schema, HowTo i AI: czego dane strukturalne już nie dają',
        html: `<p>Wiele poradników wciąż poleca FAQPage i HowTo jako prosty sposób na większy wynik w Google. To nieaktualne. Google od kilku lat upraszcza stronę wyników i wycofuje kolejne wyniki rozszerzone. Zanim dopiszesz kod, sprawdź jego status w tabeli.</p>`,
        tabela: {
          id: 'tabela-status-funkcji-google',
          caption: 'Status wybranych funkcji Google z danych strukturalnych (stan na 11.11.2026)',
          columns: [
            { key: 'funkcja', label: 'Funkcja w Google' },
            { key: 'status', label: 'Status' },
            { key: 'odKiedy', label: 'Od kiedy' },
            { key: 'kod', label: 'Co zrobić z kodem' },
          ],
          rows: [
            { funkcja: 'Wynik rozszerzony FAQ (FAQPage)', status: 'Nie jest pokazywany; dokumentację usunięto w czerwcu 2026', odKiedy: '7 maja 2026 (wcześniej, od sierpnia 2023, tylko znane serwisy rządowe i medyczne)', kod: 'Nie dodawaj dla efektu w wynikach; istniejącego nie musisz pilnie usuwać' },
            { funkcja: 'Wynik rozszerzony HowTo', status: 'Wycofany na telefonach i komputerach', odKiedy: '13 września 2023', kod: 'Jak wyżej' },
            { funkcja: 'Pole wyszukiwania w linkach do podstron (SearchAction w WebSite)', status: 'Wycofane, dokumentację usunięto', odKiedy: '29 listopada 2024 (data usunięcia dokumentacji)', kod: 'Niepotrzebne w Google; WebSite zostaw dla nazwy witryny' },
            { funkcja: 'Okruszki (BreadcrumbList)', status: 'Działają tylko na komputerach', odKiedy: '22 stycznia 2025', kod: 'Zostaw i utrzymuj' },
            { funkcja: 'Przeglądy AI i tryb AI', status: 'Nie wymagają specjalnych danych strukturalnych', odKiedy: 'Dokumentacja Google o funkcjach AI', kod: 'Pilnuj zgodności danych z tekstem strony' },
          ],
          przypis: 'Źródło: changelog dokumentacji Google Search Central, blog Google z 8.08.2023 (aktualizacja 14.09.2023) i strony o funkcjach AI. Daty sprawdzone 11.11.2026.',
        },
        htmlPo: `<p>Co z istniejącym kodem FAQPage? Przy ograniczeniu z 2023 roku Google napisał, że nieużywane dane strukturalne nie szkodzą wyszukiwarce, ale też nie dają widocznego efektu. Nie musisz więc w pośpiechu usuwać FAQPage. Nie dopisuj go jednak w nadziei na rozwinięte pytania pod wynikiem. Same pytania i odpowiedzi na stronie zostaw, jeśli pomagają czytelnikom.</p>
<p>Z AI jest podobnie. Google pisze wprost, że do pojawienia się w przeglądach AI i w trybie AI nie trzeba żadnych specjalnych danych strukturalnych schema.org ani nowych plików. W przewodniku po optymalizacji pod generatywne AI wymienia „przesadne skupienie na danych strukturalnych” wśród rzeczy, które można zignorować, ale radzi dalej ich używać, bo dają kwalifikację do wyników rozszerzonych. Wśród dobrych praktyk dla funkcji AI Google wymienia za to zgodność danych strukturalnych z widocznym tekstem strony.</p>
<p>Tak samo traktuj plik llms.txt: wyszukiwarka Google go nie używa, ale może się przydać innym usługom. Przygotujesz go w naszym <a href="/narzedzia/generator-llms-txt">generatorze llms.txt</a>. Jak budujemy widoczność firmy w ChatGPT i przeglądach AI, opisujemy na stronie <a href="/pozycjonowanie-w-ai">pozycjonowanie w AI</a>.</p>`,
      },
      {
        id: 'wdrozenie-i-test',
        h2: 'Jak wdrożyć i przetestować dane strukturalne',
        html: `<p>Kod JSON-LD wstawiasz w sekcji head albo body strony. W WordPressie, Shopify czy Wix zwykle robi to wtyczka SEO albo ustawienia motywu: wpisujesz dane w formularzu, a wtyczka generuje kod. Sprawdź jednak, czy motyw i wtyczka nie dodają dwóch różnych bloków o tej samej firmie, np. z inną nazwą albo starym telefonem.</p>
<p>Każdą zmianę sprawdź w trzech krokach:</p>
<ol>
<li><strong>Test wyników z elementami rozszerzonymi</strong> (Rich Results Test) – pokazuje typy, które dają wyniki rozszerzone w Google. Popraw wszystkie błędy krytyczne. Ostrzeżenia nie odbierają kwalifikacji, ale warto je poprawić.</li>
<li><strong>Walidator schema.org</strong> (validator.schema.org) – sprawdza składnię i wszystkie typy, także te, których Test wyników rozszerzonych nie pokazuje, np. Service.</li>
<li><strong>Sprawdzenie adresu URL w Search Console</strong> po publikacji – pokazuje, jak stronę widzi Googlebot. Strona nie może być zablokowana w robots.txt, znacznikiem noindex ani logowaniem.</li>
</ol>
<p>Potem obserwuj raporty wyników z elementami rozszerzonymi w Search Console, zwłaszcza po pierwszym wdrożeniu i po każdej zmianie szablonu. Liczba prawidłowych elementów powinna rosnąć, a nieprawidłowych nie. Google przypomina, że dane mogą zepsuć się już po wdrożeniu, np. przez błąd w szablonie albo na serwerze.</p>
<h3>Najczęstsze błędy w danych strukturalnych</h3>
<ul>
<li>Błąd składni JSON: przecinek po ostatnim elemencie, brak cudzysłowu, typograficzne cudzysłowy „ ” wklejone z edytora tekstu. Jeden taki błąd unieważnia cały blok.</li>
<li>Wartości zostawione ze wzoru: twojadomena.pl, 00-001, +48 22 000 00 00.</li>
<li>Oznaczone treści, których nie ma na stronie: godziny, cena albo opinie widoczne tylko w kodzie.</li>
<li>Własne opinie o firmie w aggregateRating na stronie tej firmy.</li>
<li>Kilku autorów w jednym polu name albo nazwa firmy w author.name.</li>
<li>Logo mniejsze niż 112 × 112 px albo zablokowane w robots.txt.</li>
<li>Dwa bloki o tej samej firmie z różnymi danymi (motyw i wtyczka).</li>
<li>Typ ogólny tam, gdzie jest dokładniejszy: Organization zamiast LocalBusiness dla gabinetu, LocalBusiness zamiast Dentist.</li>
</ul>
<p>Część tych błędów wychwyci nasz <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a>: sprawdza, czy strona główna ma dane Organization albo LocalBusiness i czy bloki JSON-LD dają się odczytać. Szerszą listę kontroli znajdziesz w <a href="/blog/audyt-techniczny-seo">poradniku audytu technicznego SEO</a> i w punkcie D5 <a href="/narzedzia/checklista-seo">checklisty SEO</a>. Jeśli wolisz zlecić przegląd i wdrożenie, dane strukturalne są częścią naszego <a href="/audyt-seo">audytu SEO</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Wzory danych strukturalnych do wypełnienia (podgląd szablonu)',
      opis: 'Poniżej pełna treść szablonu PDF. Możesz korzystać z niej od razu albo pobrać PDF z polami do wpisania, mapą typów i dziennikiem testów.',
      html: `<h3>Część 1. Dane firmy: jedno źródło dla kodu, strony i wizytówki</h3>
<table><thead><tr><th>Pole</th><th>Właściwość schema.org</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Nazwa firmy (jak w Profilu Firmy w Google)</td><td>name</td><td>…</td></tr>
<tr><td>Pełna nazwa z rejestru, jeśli inna</td><td>legalName</td><td>…</td></tr>
<tr><td>Typ firmy: najdokładniejszy podtyp LocalBusiness albo Organization</td><td>@type</td><td>…</td></tr>
<tr><td>Ulica i numer</td><td>address.streetAddress</td><td>…</td></tr>
<tr><td>Kod pocztowy i miejscowość</td><td>address.postalCode, address.addressLocality</td><td>…</td></tr>
<tr><td>Kraj (kod ISO)</td><td>address.addressCountry</td><td>PL</td></tr>
<tr><td>Telefon z kodem kraju</td><td>telephone</td><td>+48 …</td></tr>
<tr><td>E-mail</td><td>email</td><td>…</td></tr>
<tr><td>Adres strony głównej</td><td>url</td><td>https://…</td></tr>
<tr><td>Logo, min. 112 × 112 px</td><td>logo</td><td>https://…</td></tr>
<tr><td>Współrzędne, min. 5 miejsc po przecinku</td><td>geo.latitude, geo.longitude</td><td>…, …</td></tr>
<tr><td>Godziny otwarcia</td><td>openingHoursSpecification</td><td>pn–pt … sob … nd …</td></tr>
<tr><td>Przedział cen, poniżej 100 znaków</td><td>priceRange</td><td>…</td></tr>
<tr><td>NIP i numer VAT UE</td><td>taxID, vatID</td><td>…</td></tr>
<tr><td>Profile firmy w innych serwisach</td><td>sameAs</td><td>1. … 2. … 3. …</td></tr>
</tbody></table>
<h3>Część 2. Mapa typów na stronie</h3>
<table><thead><tr><th>Rodzaj strony</th><th>Adres na Twojej stronie</th><th>Typy JSON-LD</th><th>Wdrożone</th><th>Test bez błędów</th></tr></thead><tbody>
<tr><td>Strona główna</td><td>/</td><td>Organization albo LocalBusiness, WebSite</td><td>☐</td><td>☐</td></tr>
<tr><td>O nas, kontakt</td><td>…</td><td>Organization albo LocalBusiness, jeśli nie ma ich na stronie głównej</td><td>☐</td><td>☐</td></tr>
<tr><td>Strona placówki</td><td>…</td><td>LocalBusiness osobno dla każdej lokalizacji, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Strona usługi</td><td>…</td><td>BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Wpis na blogu</td><td>…</td><td>Article, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Strona autora</td><td>…</td><td>ProfilePage z Person</td><td>☐</td><td>☐</td></tr>
<tr><td>Karta produktu</td><td>…</td><td>Product z Offer, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Część 3. Wzory JSON-LD do podmiany</h3>
<p>Każdy wzór wklej w znacznik <code>&lt;script type="application/ld+json"&gt;</code> i podmień wartości przykładowe na dane z części 1. Pola, które nie dotyczą firmy, usuń razem z przecinkiem.</p>
<p><strong>3.1 Organization</strong> – strona główna albo „O nas”. Wymagane: brak.</p>
${kod(W.pl.organization)}
<p><strong>3.2 WebSite</strong> – tylko strona główna. Wymagane: name, url.</p>
${kod(W.pl.website)}
<p><strong>3.3 LocalBusiness (tu: Plumber)</strong> – strona główna albo strona placówki. Wymagane: name, address.</p>
${kod(W.pl.localBusiness)}
<p><strong>3.4 BreadcrumbList</strong> – każda podstrona. Wymagane: co najmniej dwa ListItem.</p>
${kod(W.pl.breadcrumb)}
<p><strong>3.5 Article</strong> – wpis na blogu. Wymagane: brak; author jako osobny Person.</p>
${kod(W.pl.article)}
<p><strong>3.6 ProfilePage z Person</strong> – strona autora. Wymagane: mainEntity, name.</p>
${kod(W.pl.profilePage)}
<p><strong>3.7 Product z Offer</strong> – karta produktu. Wymagane: name i offers (karta sprzedawcy także image).</p>
${kod(W.pl.product)}
<h3>Część 4. Lista kontrolna przed publikacją</h3>
<ul>
<li>☐ Test wyników z elementami rozszerzonymi bez błędów krytycznych</li>
<li>☐ Walidator schema.org bez błędów składni</li>
<li>☐ Każda wartość z kodu jest widoczna na stronie: nazwa, adres, godziny, cena, autor</li>
<li>☐ Nazwa, adres i telefon identyczne w kodzie, na stronie i w Profilu Firmy w Google</li>
<li>☐ Wymagane właściwości wypełnione, żadnych wartości ze wzoru (twojadomena.pl, 00-001)</li>
<li>☐ Najdokładniejszy pasujący typ, np. Dentist zamiast LocalBusiness</li>
<li>☐ Brak własnych ocen w gwiazdkach w LocalBusiness i Organization</li>
<li>☐ Logo i obrazy dostępne dla Googlebota, niezablokowane w robots.txt</li>
<li>☐ Jeden blok na firmę: motyw i wtyczka nie dublują danych</li>
<li>☐ Strona bez noindex, bez blokady w robots.txt i bez logowania</li>
<li>☐ Po publikacji: Sprawdzenie adresu URL w Search Console</li>
<li>☐ Termin następnego przeglądu: po każdej zmianie danych firmy, cen albo szablonu strony</li>
</ul>
<h3>Część 5. Dziennik testów</h3>
<table><thead><tr><th>Data</th><th>Adres strony</th><th>Narzędzie</th><th>Błędy i ostrzeżenia</th><th>Poprawka, kto</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>Test wyników rozszerzonych / walidator / Sprawdzenie adresu URL</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 6. Czego nie wdrażać dla efektu w Google (stan na 11.11.2026)</h3>
<ul>
<li>☐ FAQPage: wynik rozszerzony FAQ nie jest pokazywany od 7 maja 2026</li>
<li>☐ HowTo: wycofane 13 września 2023</li>
<li>☐ SearchAction w WebSite: pole wyszukiwania wycofane, dokumentację usunięto 29 listopada 2024</li>
<li>☐ Własne opinie w aggregateRating na stronie firmy: brak gwiazdek dla opinii o sobie</li>
<li>☐ Specjalne znaczniki „pod AI”: Google nie wymaga ich do przeglądów AI ani trybu AI</li>
</ul>`,
    },
    formularz: {
      h2: 'Pobierz wzory danych strukturalnych (PDF)',
      opis: 'Wyślemy PDF z kartą danych firmy, mapą typów dla podstron, 7 wzorami JSON-LD do podmiany, listą kontrolną przed publikacją i dziennikiem testów.',
      etykieta: 'Twój adres e-mail',
      przycisk: 'Wyślij wzory PDF',
      przedmiot: 'wzory danych strukturalnych',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do wzorów danych strukturalnych w PDF przyjdzie w ciągu minuty.',
    },
    faq: [
      {
        question: 'Co to są dane strukturalne?',
        answer: 'Dane strukturalne to opis zawartości strony w standardowym formacie, najczęściej JSON-LD, z nazwami typów i właściwości ze słownika schema.org. Mówią wyszukiwarce wprost, że na stronie jest np. firma z adresem, artykuł z autorem albo produkt z ceną. Google używa ich, żeby lepiej zrozumieć stronę i ocenić, czy kwalifikuje się ona do wyników rozszerzonych, np. okruszków albo ceny przy produkcie.',
      },
      {
        question: 'Czy dane strukturalne poprawiają pozycję w Google?',
        answer: 'Dokumentacja Google nie obiecuje wyższych pozycji. Dane strukturalne pomagają zrozumieć stronę i dają kwalifikację do wyników rozszerzonych, ale Google nie gwarantuje ich wyświetlenia. Efekt widać raczej w wyglądzie wyniku i liczbie kliknięć: Google przytacza np. Rotten Tomatoes, gdzie strony z danymi strukturalnymi miały o 25% wyższy CTR. Pozycje budujesz treścią, techniką i linkami, a dane strukturalne je uzupełniają.',
      },
      {
        question: 'JSON-LD czy mikrodane: co wybrać?',
        answer: 'JSON-LD. Google obsługuje też mikrodane i RDFa i traktuje wszystkie trzy formaty jednakowo, jeśli kod jest poprawny. Zaleca jednak JSON-LD, bo najłatwiej go wdrożyć i utrzymać: blok stoi osobno od treści, więc zmiana wyglądu strony go nie psuje. Google odczyta też JSON-LD wstawiony przez JavaScript, np. przez Google Tag Manager, choć dane produktów lepiej mieć w HTML wysłanym przez serwer.',
      },
      {
        question: 'Czy FAQ schema jeszcze działa?',
        answer: 'Nie w wynikach Google. Wynik rozszerzony z danych FAQPage nie jest pokazywany od 7 maja 2026 roku, a w czerwcu Google usunął jego dokumentację. Wcześniej, od 2023 roku, pojawiał się tylko przy znanych serwisach rządowych i medycznych. Istniejący kod nie szkodzi, więc nie musisz go pilnie usuwać, ale nie dodawaj go dla efektu w wynikach. Same pytania i odpowiedzi zostaw, jeśli pomagają czytelnikom.',
      },
      {
        question: 'Czy dane strukturalne są potrzebne do przeglądów AI w Google?',
        answer: 'Nie. Google pisze, że do pojawienia się w przeglądach AI i w trybie AI nie trzeba żadnych specjalnych danych strukturalnych schema.org ani dodatkowych plików. Strona musi być zaindeksowana i kwalifikować się do wyświetlenia z fragmentem. Google radzi jednak dalej używać danych strukturalnych, bo dają kwalifikację do wyników rozszerzonych, i pilnować, żeby zgadzały się z tekstem widocznym na stronie.',
      },
      {
        question: 'Ile typów danych strukturalnych potrzebuje mała firma?',
        answer: 'Zwykle trzech albo czterech: LocalBusiness lub Organization i WebSite na stronie głównej, BreadcrumbList na podstronach oraz Article na wpisach, jeśli firma prowadzi bloga. W sklepie dochodzi Product na kartach produktów. Lepiej mieć mniej typów z kompletnymi i prawdziwymi danymi, niż oznaczać wszystko. Google pisze, że kompletne i dokładne właściwości są ważniejsze niż ich liczba.',
      },
    ],
    zrodla: [...ZRODLA.slice(0, 18).map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })), GBP_PL, { url: ZRODLA[18][0], nazwa: ZRODLA[18][1], data: '2026-11-11' }],
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Darmowy audyt SEO', opis: 'sprawdza dane firmy na stronie głównej i błędy w blokach JSON-LD' },
      { href: '/narzedzia/checklista-seo', tekst: 'Checklista SEO', opis: '50 punktów kontrolnych, w tym dane strukturalne (punkt D5)' },
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Pozycjonowanie wizytówki Google', opis: 'Profil Firmy, Mapy i spójne dane NAP' },
      { href: '/audyt-seo', tekst: 'Audyt SEO', opis: 'przegląd techniki strony razem z wdrożeniem danych strukturalnych' },
      { href: '/pozycjonowanie-w-ai', tekst: 'Pozycjonowanie w AI', opis: 'widoczność firmy w ChatGPT, Gemini i przeglądach AI w Google' },
      { href: '/narzedzia/checklista-wizytowki-google', tekst: 'Checklista wizytówki Google', opis: 'te same dane NAP w Profilu Firmy i na stronie' },
      { href: '/narzedzia/checklista-e-e-a-t', tekst: 'Checklista E-E-A-T', opis: 'autorzy, reputacja i zaufanie, które opisują znaczniki Person i Organization' },
    ],
    kroki: [
      { name: 'Spisz dane firmy w jednym miejscu', text: 'Wypełnij część 1: nazwa, adres i telefon dokładnie jak w Profilu Firmy w Google, a do tego logo, godziny, NIP i profile w innych serwisach.' },
      { name: 'Przypisz typy do rodzajów stron', text: 'W części 2 zaznacz, które typy JSON-LD trafią na stronę główną, strony placówek, usług, wpisy, strony autorów i karty produktów.' },
      { name: 'Skopiuj wzór i podmień wartości', text: 'Weź wzór z części 3, wpisz dane z części 1 i usuń pola, które nie dotyczą firmy. Nie zostawiaj żadnej wartości przykładowej.' },
      { name: 'Wstaw kod na stronie', text: 'Wklej blok w znacznik script typu application/ld+json w head albo body strony lub wpisz dane we wtyczce SEO. Sprawdź, czy motyw nie dodaje drugiego bloku.' },
      { name: 'Przetestuj przed publikacją', text: 'Sprawdź kod w Teście wyników z elementami rozszerzonymi i w walidatorze schema.org, popraw błędy krytyczne i przejdź listę kontrolną z części 4.' },
      { name: 'Sprawdź w Search Console i zapisz wynik', text: 'Po publikacji użyj Sprawdzenia adresu URL, a potem obserwuj raporty wyników rozszerzonych. Każdy test wpisz do dziennika w części 5.' },
    ],
    plikNazwa: 'Dane strukturalne: wzory JSON-LD schema.org (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'Schema markup examples',
    tag: 'Free PDF template',
    h1: 'Schema markup examples: 7 JSON-LD templates for your business',
    lead: 'These schema markup examples are ready-to-edit JSON-LD blocks for the seven types most businesses need: Organization, LocalBusiness, WebSite, BreadcrumbList, Article, Person and Product. Schema markup uses the schema.org vocabulary to tell Google what a page is about. It can make a page eligible for rich results, but Google never guarantees them.',
    karta: {
      nazwa: 'Schema markup examples (PDF)',
      opis: 'Seven ready-to-edit JSON-LD templates: Organization, LocalBusiness, WebSite, breadcrumbs, Article, author and Product, with a business data sheet and test log.',
      cta: 'Get the templates',
    },
    sekcje: [
      {
        id: 'what-is-schema-markup',
        h2: 'What schema markup is and what it does in Google',
        html: `<p>Schema markup, or structured data, describes a page in a fixed format that a machine can read without guessing. Instead of hoping a search engine spots your address in the footer, you state it outright: this is the name, this is the street, this is the postcode, this is the phone number. The type and property names come from schema.org, a vocabulary maintained jointly by the search engines. Google describes structured data as explicit clues about the meaning of a page.</p>
<p>What do you get out of it? First, the page can become eligible for rich results: product price and availability, breadcrumbs above the title, or your logo in a knowledge panel. Second, Google can more easily connect the page with the business, author or product it mentions. Google’s documentation cites businesses that measured the effect. Rotten Tomatoes marked up 100,000 pages and saw a 25% higher click-through rate on pages with structured data than on pages without it.</p>
<p>Two things to know from the start. Valid code doesn’t guarantee a rich result: Google decides what to show based on the query, the device and the user’s location. And the markup must describe what readers can see. Marking up hidden content or fake reviews can lead to a manual action. That action removes the page’s eligibility for rich results, but according to Google it doesn’t affect how the page ranks in regular web results.</p>
<h3>JSON-LD, Microdata or RDFa?</h3>
<p>Google supports all three formats and treats them as equally fine, as long as the markup is valid. It recommends JSON-LD, though, because it is the easiest to implement and maintain. JSON-LD is a separate <code>&lt;script type="application/ld+json"&gt;</code> block in the page code, kept apart from the visible text. Microdata and RDFa are attributes added to HTML tags, so a redesign can easily break them. All the schema markup examples on this page use JSON-LD.</p>
<p>Google can also read JSON-LD injected with JavaScript, for example through Google Tag Manager or a CMS widget. For products, however, it warns that dynamically generated markup can make Shopping crawls less frequent and less reliable. Keep price and availability in the HTML your server sends.</p>`,
      },
      {
        id: 'which-schema-types',
        h2: 'Which structured data to add: 7 schema.org types for a business',
        html: `<p>You don’t need to mark up everything. A business website, an online store or a blog usually needs seven types from the schema.org vocabulary. Each has its place: business details on the home page, breadcrumbs on subpages, Article on blog posts. The table shows where each type goes, what it can do in Google, and which properties are required before the markup is eligible for any search feature. The JSON-LD examples in the next sections follow the same order.</p>`,
        tabela: {
          id: 'table-schema-types',
          caption: '7 structured data types: where they go and what they can do in Google',
          columns: [
            { key: 'typ', label: 'schema.org type' },
            { key: 'gdzie', label: 'Where to add it' },
            { key: 'efekt', label: 'What it can do in Google' },
            { key: 'wymagane', label: 'Properties Google requires' },
          ],
          rows: [
            { typ: 'Organization', gdzie: 'Home page or About page', efekt: 'Logo and business details in the knowledge panel; telling your business apart from others with similar names', wymagane: 'None. Recommended include name, url, logo, address, telephone, sameAs' },
            { typ: 'LocalBusiness (a subtype such as Dentist or Plumber)', gdzie: 'Home page of a single-location business, or each location’s page', efekt: 'Opening hours, address and phone in the business knowledge panel', wymagane: 'name, address' },
            { typ: 'WebSite', gdzie: 'Home page only', efekt: 'Your preferred site name above the search result', wymagane: 'name, url' },
            { typ: 'BreadcrumbList', gdzie: 'Every page except the home page', efekt: 'Breadcrumb trail above the title (desktop only)', wymagane: 'itemListElement: at least two ListItems with position, name and item' },
            { typ: 'Article', gdzie: 'Blog post, guide, news item', efekt: 'Title, image and date in article features; author linked to the content', wymagane: 'None. Recommended headline, image, datePublished, dateModified, author' },
            { typ: 'ProfilePage with Person', gdzie: 'Author or expert page', efekt: 'The author as a specific person; on community sites also the Discussions and Forums feature', wymagane: 'mainEntity with name' },
            { typ: 'Product with Offer', gdzie: 'Product page in an online store', efekt: 'Price, availability and ratings on the product result', wymagane: 'Product snippet: name plus one of offers, review, aggregateRating. Merchant listing: name, image, offers' },
          ],
          przypis: 'Required properties as listed in Google Search Central documentation (checked on 11 November 2026). A missing required property means the page isn’t eligible for that rich result. Google prefers fewer but complete and accurate properties over many incomplete ones.',
        },
        htmlPo: `<p>What’s missing from the table? FAQPage and HowTo. Both types still exist in the schema.org vocabulary, but Google no longer shows rich results based on them (details in the FAQ schema section below). The Service type, common on service pages, doesn’t produce a rich result of its own. Google can still make general use of schema.org data and the sameAs property, so there’s no need to remove it as long as it describes what’s on the page.</p>
<p>Here’s how we do it on ai-seo-company.pl: every page carries a business block (LocalBusiness) and WebSite, service pages add Service and BreadcrumbList, and our <a href="/en/about-us">About us</a> page carries a Person block for the founder. A few types, each with details that readers can see on the page.</p>`,
      },
      {
        id: 'organization-schema-example',
        h2: 'Organization schema example (with WebSite) for your home page',
        html: `<p>Organization schema tells Google who the business is: its name, where it’s based, how to contact it and which profiles on the web belong to it. Google doesn’t require any property here. It recommends adding every property that applies, especially ones that help users: name, address or phone as proof of a real-world presence, and url and logo as proof of an online one.</p>
<p>Add the block to your home page or to a single page about the business, such as About us. You don’t need it on every page. If customers visit your premises, or you serve a defined area, use a LocalBusiness subtype from the next section instead. It is still an Organization, just a more specific one.</p>
<h3>JSON-LD example: Organization</h3>
${kod(W.en.organization)}
<h3>What the fields mean</h3>
<ul>
<li><strong>@id</strong> – a stable identifier for the business in your markup, such as your URL plus <code>#organization</code>. Other blocks can point to the same business with <code>{"@id": "…"}</code> instead of repeating the whole description.</li>
<li><strong>name and legalName</strong> – the name you use on the website and in your business profile, plus the registered legal name if it’s different. Google asks for name to match the site name you use in WebSite.</li>
<li><strong>logo</strong> – the URL of your logo file, at least 112 × 112 pixels, crawlable by Googlebot (not blocked in robots.txt).</li>
<li><strong>sameAs</strong> – your business profiles on other sites: LinkedIn, Facebook, YouTube, an industry directory. Only profiles that genuinely belong to the business.</li>
<li><strong>taxID and vatID</strong> – your tax ID, matching the country in your address. In the EU you can add your VAT number in vatID. Google calls the VAT number an important trust signal, because users can look it up in public registries.</li>
</ul>
<h3>JSON-LD example: WebSite (site name)</h3>
<p>WebSite tells Google which site name to show above your search results. It needs two properties, name and url, and goes on the home page only. Put a shorter name or acronym in alternateName. Google also looks at the title and headings of your home page, so use the same name everywhere.</p>
${kod(W.en.website)}
<p>The sitelinks search box is gone from Google, and its documentation was removed in November 2024. A <code>potentialAction</code> with <code>SearchAction</code> in the WebSite block no longer does anything in Google.</p>`,
      },
      {
        id: 'local-business-schema',
        h2: 'Local business schema example (LocalBusiness)',
        html: `<p>Local business schema is structured data for a business with premises or a service area: a dental practice, a garage, a restaurant, a law firm, a plumber. Google requires two properties: name and address. It recommends telephone, url, opening hours, geo coordinates and price range, among others. LocalBusiness is a subtype of Organization, so you can also use the fields from the previous section, such as logo, sameAs and tax ID.</p>
<p>Use the most specific type that fits. schema.org has dozens of subtypes, including Dentist, Plumber, Electrician, AutoRepair, HairSalon, AccountingService and Restaurant. A business that offers several kinds of service can list several types in an array, for example <code>"@type": ["Electrician", "Plumber"]</code>. Google doesn’t support additionalType here. If no subtype fits, plain LocalBusiness is fine.</p>
<h3>JSON-LD example: LocalBusiness (a plumber)</h3>
${kod(W.en.localBusiness)}
<h3>Rules that often get missed</h3>
<ul>
<li><strong>NAP matches your Business Profile.</strong> The name, address and phone number in your markup should be identical to those on the page and in your Google Business Profile. That’s how we run local SEO: one NAP record feeds the website, the profile, directories and structured data.</li>
<li><strong>Phone number with country code</strong>, for example +1 217 555 0100. Google asks for the country code and area code.</li>
<li><strong>Coordinates with at least 5 decimal places</strong> in geo.latitude and geo.longitude. You can copy them from Google Maps by right-clicking your location on the map.</li>
<li><strong>Times in 24-hour format</strong> (opens, closes) and days of the week as Monday… Sunday. Describe a seasonal closure with validFrom and validThrough dates.</li>
<li><strong>priceRange under 100 characters</strong>, such as “$$” or “$50-150”. Google won’t show a longer one.</li>
<li><strong>No star ratings about yourself.</strong> aggregateRating and review in LocalBusiness are only for sites that capture reviews about other businesses. If a business controls the reviews about itself, its pages with LocalBusiness or Organization markup aren’t eligible for review stars. Collect customer reviews on your Google Business Profile instead.</li>
<li><strong>One location, one block.</strong> Google asks you to define each location as its own LocalBusiness, ideally on its own page with address and opening hours.</li>
</ul>
<p>Structured data won’t replace your Business Profile. For local results Google weighs relevance, distance and prominence, and prominence takes into account things like links and reviews. See how we work on that on our <a href="/en/google-business-profile-optimization">Google Business Profile optimization</a> and <a href="/en/local-seo-warsaw">local SEO in Warsaw</a> pages.</p>`,
      },
      {
        id: 'article-person-schema',
        h2: 'Article and Person schema: marking up the author',
        html: `<p>Article covers blog posts, guides and news items. Google doesn’t require any property, but it recommends headline, image, publication and modification dates, and author. The dates and author in the markup should match what’s on the page, and the image should relate to the article.</p>
<p>Most mistakes are in the author field. Google recommends listing each author as a separate object, using Person for people and Organization for companies, and putting only the person’s name in name: no job title, no honorifics, no “posted by”. Put the job title in jobTitle. Add url or sameAs pointing to the author’s page.</p>
<h3>JSON-LD example: Article with an author</h3>
${kod(W.en.article)}
<h3>JSON-LD example: author page (ProfilePage and Person)</h3>
<p>The author page is where author.url leads. ProfilePage tells Google the page is about one person, and the nested Person describes who that is. mainEntity and name are required. Google names articles among the types that can link to profile pages like this.</p>
${kod(W.en.profilePage)}
<p>Why bother? Google’s guidance on helpful content asks whether it’s self-evident who wrote a page and whether bylines lead to more information about the author. According to Google, clear authorship aligns with E-E-A-T: experience, expertise, authoritativeness and trustworthiness. E-E-A-T itself isn’t a specific ranking factor, though, and markup won’t add experience the author doesn’t have. A real page with a bio, photo and areas of expertise has to exist first. Google treats fabricated author profiles as deception.</p>
<p>Here’s our own setup: the <a href="/en/about-us">About us</a> page has a Person block for the founder with jobTitle, worksFor and knowsAbout, matching what the page says.</p>`,
      },
      {
        id: 'breadcrumb-product-schema',
        h2: 'BreadcrumbList and Product: breadcrumbs and product pages',
        html: `<p>BreadcrumbList describes where a page sits in your site structure: Home › Services › Emergency plumbing. Google requires a list of at least two ListItem elements, each with position, name and item (the URL). The last item can skip the URL, in which case Google uses the URL of the current page. The trail in your markup should match the breadcrumbs shown on the page.</p>
<p>Since January 2025 Google shows breadcrumbs in search results on desktop only, because they were truncated on small screens. The markup is still worth keeping: it works in desktop results and keeps your site structure clearly described.</p>
<h3>JSON-LD example: BreadcrumbList</h3>
${kod(W.en.breadcrumb)}
<h3>JSON-LD example: Product with an Offer</h3>
<p>Product describes a product page. For a product snippet Google requires name plus one of three properties: offers, review or aggregateRating. A store where people can buy the product may also be eligible for merchant listings. Those require name, image and offers, and the currency is mandatory. In the offer, give the price as a number, the currency as an ISO 4217 code and the availability, such as InStock.</p>
${kod(W.en.product)}
<p>The price, availability and ratings in the markup must match what customers see on the product page and what’s in your Merchant Center feed. A typical problem: a sale changes the price on the page, while JSON-LD generated from a different field keeps the old one. If you use priceValidUntil, watch the date: with a date in the past, the product snippet may not show.</p>`,
      },
      {
        id: 'faq-schema-howto-ai',
        h2: 'FAQ schema, HowTo and AI: what structured data no longer does',
        html: `<p>Plenty of guides still recommend FAQ schema and HowTo as an easy way to get a bigger search result. That advice is out of date. Google has been simplifying its results pages for years and keeps retiring rich result types. Check the status in the table before you add code.</p>`,
        tabela: {
          id: 'table-google-feature-status',
          caption: 'Status of selected Google structured data features (as of 11 November 2026)',
          columns: [
            { key: 'funkcja', label: 'Google feature' },
            { key: 'status', label: 'Status' },
            { key: 'odKiedy', label: 'Since' },
            { key: 'kod', label: 'What to do with the code' },
          ],
          rows: [
            { funkcja: 'FAQ rich result (FAQPage)', status: 'No longer shown; documentation removed in June 2026', odKiedy: '7 May 2026 (from August 2023 limited to well-known government and health sites)', kod: 'Don’t add it for a search result; no rush to remove existing markup' },
            { funkcja: 'HowTo rich result', status: 'Retired on mobile and desktop', odKiedy: '13 September 2023', kod: 'Same as above' },
            { funkcja: 'Sitelinks search box (SearchAction in WebSite)', status: 'Retired; documentation removed', odKiedy: '29 November 2024 (documentation removed)', kod: 'Not needed for Google; keep WebSite for the site name' },
            { funkcja: 'Breadcrumbs (BreadcrumbList)', status: 'Desktop results only', odKiedy: '22 January 2025', kod: 'Keep and maintain' },
            { funkcja: 'AI Overviews and AI Mode', status: 'No special structured data required', odKiedy: 'Google’s AI features documentation', kod: 'Make sure the markup matches the visible text' },
          ],
          przypis: 'Sources: Google Search Central documentation changelog, Google’s blog post of 8 August 2023 (updated 14 September 2023) and the AI features documentation. Dates checked on 11 November 2026.',
        },
        htmlPo: `<p>What about existing FAQ schema? When Google limited FAQ results in 2023, it said that structured data that isn’t used doesn’t cause problems for Search, but has no visible effect either. So there’s no need to rush and remove FAQPage. Just don’t add it hoping for expandable questions under your result. Keep the questions and answers on the page if they help readers.</p>
<p>AI works the same way. Google states plainly that you don’t need any special schema.org structured data or new files to appear in AI Overviews or AI Mode. Its guide to optimizing for generative AI lists overfocusing on structured data among the things you can ignore, while advising you to keep using it because it makes pages eligible for rich results. Among the best practices for AI features, Google lists making sure your structured data matches the visible text on the page.</p>
<p>Treat llms.txt the same way: Google Search doesn’t use it, but other services might. You can build one with our <a href="/en/tools/llms-txt-generator">llms.txt generator</a>. For how we build a business’s visibility in ChatGPT and AI Overviews, see <a href="/en/ai-search-optimization">AI search optimization</a>.</p>`,
      },
      {
        id: 'implement-and-test',
        h2: 'How to add and test the schema markup examples',
        html: `<p>JSON-LD goes in the head or body of the page. On WordPress, Shopify or Wix an SEO plugin or the theme settings usually handle it: you fill in a form and the plugin writes the code. Check, though, that your theme and plugin don’t output two different blocks about the same business, for example with a different name or an old phone number.</p>
<p>Check every change in three steps:</p>
<ol>
<li><strong>Rich Results Test</strong> – shows the types that can produce rich results in Google. Fix every critical error. Warnings don’t affect eligibility, but they are worth fixing.</li>
<li><strong>Schema Markup Validator</strong> (validator.schema.org) – checks syntax and all types, including those the Rich Results Test doesn’t show, such as Service.</li>
<li><strong>URL Inspection in Search Console</strong> after publishing – shows how Googlebot sees the page. The page must not be blocked by robots.txt, a noindex tag or a login.</li>
</ol>
<p>Then monitor the rich result status reports in Search Console, especially after the first deployment and after any template change. Valid items should go up and invalid items shouldn’t. Google points out that markup can break after deployment, for example because of a templating or serving issue.</p>
<h3>The most common schema markup mistakes</h3>
<ul>
<li>JSON syntax errors: a comma after the last item, a missing quote, curly quotes “ ” pasted from a word processor. One error invalidates the whole block.</li>
<li>Placeholder values left in: example.com, 62701, +1 217 555 0100.</li>
<li>Marking up content that isn’t on the page: opening hours, prices or reviews that exist only in the code.</li>
<li>Reviews about your own business in aggregateRating on your own site.</li>
<li>Several authors in one name field, or the company name in author.name.</li>
<li>A logo smaller than 112 × 112 px, or blocked in robots.txt.</li>
<li>Two blocks about the same business with different details (theme plus plugin).</li>
<li>A generic type where a specific one exists: Organization instead of LocalBusiness for a clinic, LocalBusiness instead of Dentist.</li>
</ul>
<p>Our <a href="/en/tools/free-seo-audit">free SEO audit</a> catches some of these: it checks whether your home page has Organization or LocalBusiness markup and whether your JSON-LD blocks can be parsed. For a broader list of checks, see our <a href="/en/blog/technical-seo-audit-checklist">technical SEO audit checklist</a> and item D5 of the <a href="/en/tools/seo-checklist">SEO checklist</a>. If you’d rather have it reviewed and implemented for you, structured data is part of our <a href="/en/seo-audit">SEO audit</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Schema markup templates to fill in (template preview)',
      opis: 'Below is the full content of the PDF template. Use it straight away, or download the PDF with fill-in fields, a page-type map and a test log.',
      html: `<h3>Part 1. Business details: one source for the code, the website and your profile</h3>
<table><thead><tr><th>Field</th><th>schema.org property</th><th>Your entry</th></tr></thead><tbody>
<tr><td>Business name (as on your Google Business Profile)</td><td>name</td><td>…</td></tr>
<tr><td>Registered legal name, if different</td><td>legalName</td><td>…</td></tr>
<tr><td>Business type: the most specific LocalBusiness subtype, or Organization</td><td>@type</td><td>…</td></tr>
<tr><td>Street address</td><td>address.streetAddress</td><td>…</td></tr>
<tr><td>City, region and postcode</td><td>address.addressLocality, address.addressRegion, address.postalCode</td><td>…</td></tr>
<tr><td>Country (ISO code)</td><td>address.addressCountry</td><td>…</td></tr>
<tr><td>Phone with country code</td><td>telephone</td><td>+…</td></tr>
<tr><td>Email</td><td>email</td><td>…</td></tr>
<tr><td>Home page URL</td><td>url</td><td>https://…</td></tr>
<tr><td>Logo, at least 112 × 112 px</td><td>logo</td><td>https://…</td></tr>
<tr><td>Coordinates, at least 5 decimal places</td><td>geo.latitude, geo.longitude</td><td>…, …</td></tr>
<tr><td>Opening hours</td><td>openingHoursSpecification</td><td>Mon–Fri … Sat … Sun …</td></tr>
<tr><td>Price range, under 100 characters</td><td>priceRange</td><td>…</td></tr>
<tr><td>Tax ID and VAT number</td><td>taxID, vatID</td><td>…</td></tr>
<tr><td>Business profiles on other sites</td><td>sameAs</td><td>1. … 2. … 3. …</td></tr>
</tbody></table>
<h3>Part 2. Page-type map</h3>
<table><thead><tr><th>Page type</th><th>URL on your site</th><th>JSON-LD types</th><th>Added</th><th>Tested, no errors</th></tr></thead><tbody>
<tr><td>Home page</td><td>/</td><td>Organization or LocalBusiness, WebSite</td><td>☐</td><td>☐</td></tr>
<tr><td>About, contact</td><td>…</td><td>Organization or LocalBusiness, if not on the home page</td><td>☐</td><td>☐</td></tr>
<tr><td>Location page</td><td>…</td><td>LocalBusiness for each location, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Service page</td><td>…</td><td>BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Blog post</td><td>…</td><td>Article, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
<tr><td>Author page</td><td>…</td><td>ProfilePage with Person</td><td>☐</td><td>☐</td></tr>
<tr><td>Product page</td><td>…</td><td>Product with Offer, BreadcrumbList</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Part 3. JSON-LD templates to edit</h3>
<p>Paste each template into a <code>&lt;script type="application/ld+json"&gt;</code> tag and replace the example values with your details from part 1. Delete fields that don’t apply, together with their commas.</p>
<p><strong>3.1 Organization</strong> – home page or About page. Required: none.</p>
${kod(W.en.organization)}
<p><strong>3.2 WebSite</strong> – home page only. Required: name, url.</p>
${kod(W.en.website)}
<p><strong>3.3 LocalBusiness (here: Plumber)</strong> – home page or location page. Required: name, address.</p>
${kod(W.en.localBusiness)}
<p><strong>3.4 BreadcrumbList</strong> – every subpage. Required: at least two ListItems.</p>
${kod(W.en.breadcrumb)}
<p><strong>3.5 Article</strong> – blog post. Required: none; author as a separate Person.</p>
${kod(W.en.article)}
<p><strong>3.6 ProfilePage with Person</strong> – author page. Required: mainEntity, name.</p>
${kod(W.en.profilePage)}
<p><strong>3.7 Product with Offer</strong> – product page. Required: name and offers (merchant listings also image).</p>
${kod(W.en.product)}
<h3>Part 4. Pre-publication checklist</h3>
<ul>
<li>☐ Rich Results Test shows no critical errors</li>
<li>☐ Schema Markup Validator shows no syntax errors</li>
<li>☐ Every value in the code is visible on the page: name, address, hours, price, author</li>
<li>☐ Name, address and phone identical in the code, on the page and on your Google Business Profile</li>
<li>☐ Required properties filled in, no placeholder values left (example.com, 62701)</li>
<li>☐ The most specific matching type, such as Dentist rather than LocalBusiness</li>
<li>☐ No star ratings about yourself in LocalBusiness or Organization</li>
<li>☐ Logo and images crawlable by Googlebot, not blocked in robots.txt</li>
<li>☐ One block per business: theme and plugin don’t duplicate it</li>
<li>☐ Page has no noindex, isn’t blocked in robots.txt and isn’t behind a login</li>
<li>☐ After publishing: URL Inspection in Search Console</li>
<li>☐ Next review date: after any change to business details, prices or page templates</li>
</ul>
<h3>Part 5. Test log</h3>
<table><thead><tr><th>Date</th><th>Page URL</th><th>Tool</th><th>Errors and warnings</th><th>Fix, owner</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>Rich Results Test / Schema Markup Validator / URL Inspection</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 6. What not to add for an effect in Google (as of 11 November 2026)</h3>
<ul>
<li>☐ FAQPage: the FAQ rich result hasn’t been shown since 7 May 2026</li>
<li>☐ HowTo: retired on 13 September 2023</li>
<li>☐ SearchAction in WebSite: the sitelinks search box is retired, documentation removed on 29 November 2024</li>
<li>☐ Reviews about yourself in aggregateRating on your own site: no stars for self-serving reviews</li>
<li>☐ Special “AI” markup: Google doesn’t require it for AI Overviews or AI Mode</li>
</ul>`,
    },
    formularz: {
      h2: 'Get the schema markup templates (PDF)',
      opis: 'We will email you a PDF with a business data sheet, a page-type map, 7 JSON-LD templates to edit, a pre-publication checklist and a test log.',
      etykieta: 'Your email address',
      przycisk: 'Email me the PDF templates',
      przedmiot: 'the schema markup templates',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the schema markup templates PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'What is schema markup?',
        answer: 'Schema markup is structured data that describes a page in a standard format, usually JSON-LD, using type and property names from the schema.org vocabulary. It tells search engines outright that a page contains, say, a business with an address, an article with an author or a product with a price. Google uses it to understand the page and to decide whether it is eligible for rich results such as breadcrumbs or product prices.',
      },
      {
        question: 'Does schema markup improve Google rankings?',
        answer: 'Google’s documentation doesn’t promise higher rankings. Structured data helps Google understand a page and makes it eligible for rich results, but Google never guarantees they will show. The effect is more visible in how the result looks and how many clicks it gets: Google cites Rotten Tomatoes, whose pages with structured data had a 25% higher click-through rate. Rankings come from content, technical work and links; structured data supports them.',
      },
      {
        question: 'JSON-LD or Microdata: which should I use?',
        answer: 'JSON-LD. Google also supports Microdata and RDFa and treats all three formats as equally fine when the markup is valid. It recommends JSON-LD because it is the easiest to implement and maintain: the block sits apart from the content, so a redesign won’t break it. Google can also read JSON-LD injected with JavaScript, for example through Google Tag Manager, although product data is best kept in server-rendered HTML.',
      },
      {
        question: 'Does FAQ schema still work?',
        answer: 'Not in Google results. The FAQ rich result has not been shown since 7 May 2026, and Google removed its documentation in June 2026. From 2023 it had already been limited to well-known government and health websites. Existing FAQPage markup doesn’t cause problems, so there’s no need to rush and remove it, but don’t add it for a search result. Keep the questions and answers on the page if they help readers.',
      },
      {
        question: 'Do I need structured data for Google’s AI Overviews?',
        answer: 'No. Google says you don’t need any special schema.org structured data or extra files to appear in AI Overviews or AI Mode. The page has to be indexed and eligible to be shown with a snippet. Google still advises using structured data because it makes pages eligible for rich results, and making sure it matches the text that is visible on the page.',
      },
      {
        question: 'How many schema types does a small business need?',
        answer: 'Usually three or four: LocalBusiness or Organization plus WebSite on the home page, BreadcrumbList on subpages, and Article on blog posts if you publish them. An online store adds Product on product pages. Fewer types with complete, accurate details beat marking up everything. Google itself says that complete and accurate properties matter more than how many you provide.',
      },
    ],
    zrodla: [...ZRODLA.slice(0, 18).map(([url, , nazwa]) => ({ url, nazwa, data: '2026-11-11' })), GBP_EN, { url: ZRODLA[18][0], nazwa: ZRODLA[18][2], data: '2026-11-11' }],
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Free SEO audit', opis: 'checks your home page business markup and broken JSON-LD blocks' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO checklist', opis: '50 checks, including structured data (item D5)' },
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Google Business Profile optimization', opis: 'your profile, Google Maps and consistent NAP details' },
      { href: '/audyt-seo', tekst: 'SEO audit', opis: 'a technical review of your site, including structured data implementation' },
      { href: '/pozycjonowanie-w-ai', tekst: 'AI search optimization', opis: 'getting your business mentioned in ChatGPT, Gemini and Google AI Overviews' },
      { href: '/narzedzia/checklista-wizytowki-google', tekst: 'Local SEO checklist', opis: 'the same NAP data in your Google Business Profile and on your site' },
      { href: '/narzedzia/checklista-e-e-a-t', tekst: 'E-E-A-T checklist', opis: 'authors, reputation and trust behind your Person and Organization markup' },
    ],
    kroki: [
      { name: 'Collect your business details in one place', text: 'Fill in part 1: name, address and phone exactly as on your Google Business Profile, plus logo, opening hours, tax ID and profiles on other sites.' },
      { name: 'Assign types to page types', text: 'In part 2, mark which JSON-LD types go on your home page, location pages, service pages, blog posts, author pages and product pages.' },
      { name: 'Copy a template and replace the values', text: 'Take a template from part 3, enter your details from part 1 and delete fields that don’t apply. Leave no placeholder values behind.' },
      { name: 'Add the code to your page', text: 'Paste the block into a script tag of type application/ld+json in the head or body, or enter the details in your SEO plugin. Check your theme doesn’t add a second block.' },
      { name: 'Test before publishing', text: 'Run the code through the Rich Results Test and the Schema Markup Validator, fix critical errors and work through the checklist in part 4.' },
      { name: 'Check in Search Console and log the result', text: 'After publishing, use URL Inspection, then monitor the rich result reports. Record every test in the log in part 5.' },
    ],
    plikNazwa: 'Schema markup examples: JSON-LD templates (PDF)',
  },
};
