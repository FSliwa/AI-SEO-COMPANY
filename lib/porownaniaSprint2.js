// Sprint 2 (E1a, 22.11.2026): dwie nowe strony porownawcze VS dla /porownania/[slug]:
//   - P13_SHOPIFY_WOO:    /porownania/shopify-vs-woocommerce-seo (9 kryteriow)
//   - P14_AHREFS_SEMRUSH: /porownania/ahrefs-vs-semrush-narzedzia-seo (9 kryteriow)
// Czysty ESM z importami wzglednymi (.js) bez aliasu @/, dokladny kontrakt PorownanieLayout.

import { hrefJesliOpublikowana } from './publikacja.js';
import { AUDYT, AUTORYTET, CENY, POROWNYWARKA_CWV, ROBOTY_AI, WIDOCZNOSC } from './narzedziaLiczby.js';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

function zdanieJesli(href, zdanie) {
  const h = hrefJesliOpublikowana(href);
  return h ? zdanie(h) : '';
}

// --- P13: Shopify vs WooCommerce pod SEO i AI ----------------------------------------------------

const WIERSZE_TCO_SHOPIFY_WOO = [
  {
    id: 'tco-shopify-basic',
    scenariusz: 'Shopify Basic / Grow + 4-6 płatnych aplikacji SEO, filtrów i B2B',
    start: '3 500 - 12 000 zł netto (konfiguracja motywu Liquid 2.0 i integracji)',
    miesiecznie: 'ok. 350 - 950 zł / mies. (abonament $29-$79 przy płatności rocznej + aplikacje z App Store + ewentualna prowizja bramki spoza Shopify Payments)',
    razem24: 'ok. 11 900 - 34 800 zł netto w 24 mies.',
    uwagi: 'Zero administracji serwerem i automatyczny CDN, ale brak możliwości usunięcia prefiksów /collections/ i /products/ oraz ograniczona edycja checkoutu poza planem Plus ($2 300/mies.)',
  },
  {
    id: 'tco-woo',
    scenariusz: 'WooCommerce na WordPressie + hosting zarządzany z Redis + wtyczki PL',
    start: '5 000 - 16 000 zł netto (lekki motyw blokowy, HPOS, integracje kurierów i ERP)',
    miesiecznie: 'ok. 250 - 700 zł / mies. (hosting NVMe/Redis, odnowienia wtyczek kurierskich i WPML, 1-2 h opieki technicznej nad aktualizacjami)',
    razem24: 'ok. 11 000 - 32 800 zł netto w 24 mies.',
    uwagi: '100% własności bazy MySQL, pełna kontrola permalinków, pól B2B (NIP na fakturze) i JSON-LD bez opłat od obrotu na rzecz platformy sklepowej',
  },
  {
    id: 'tco-headless',
    scenariusz: 'Front B2B / katalog w Next.js + silnik koszyka (Headless) lub strona ofertowa B2B bez koszyka',
    start: `Strona B2B w Next.js od ${fmt(CENY.strona.pln)} zł netto (lub 0 zł na starcie w Booster Packu)`,
    miesiecznie: `W Booster Packu ${fmt(CENY.boosterPack.pln)} zł netto / mies. (min. ${CENY.boosterPack.umowaMiesiecy} mies. z pełnym SEO i serwerem)`,
    razem24: 'Indywidualnie przy Headless e-commerce; dla katalogu B2B bez koszyka najniższe koszty utrzymania',
    uwagi: 'Często firmy hurtowe nie potrzebują koszyka detalicznego, lecz szybkiego katalogu produktowego z formularzem wyceny i kartami PDF',
  },
];

export const P13_SHOPIFY_WOO = {
  slug: 'shopify-vs-woocommerce-seo',
  title: 'Shopify vs WooCommerce pod SEO: URL, szybkość i koszty',
  description: 'Shopify czy WooCommerce pod SEO? Porównanie adresów URL, Core Web Vitals, danych Product, hreflang, botów AI i kosztów wtyczek w 24 mies.',
  h1: 'Shopify vs WooCommerce pod SEO i AI: architektura URL, szybkość i koszty w 24 miesiące',
  okruszek: 'Shopify vs WooCommerce pod SEO',
  nazwaKarty: 'Shopify vs WooCommerce pod SEO i AI',
  teaser: 'Zamknięty SaaS ze sztywnymi katalogami /collections/ i /products/ na szybkim CDN kontra otwarty WooCommerce z pełną kontrolą permalinków, checkoutu B2B i bazy danych.',
  kryteria: '9 kryteriów',
  decyzja: { pytanie: 'Shopify czy WooCommerce pod pozycjonowanie sklepu?', skrot: 'Sztywne ścieżki URL i koszt aplikacji kontra własny serwer, HPOS i pełna kontrola kodu' },
  tag: 'Porównanie platform e-commerce pod SEO i GEO',
  ujawnienie: `Pozycjonujemy sklepy na obu silnikach (w pakietach SEO od ${fmt(CENY.seoStandard.pln)} zł netto miesięcznie), a dla firm B2B z katalogiem bez koszyka budujemy szybkie serwisy w Next.js. Nie pobieramy prowizji afiliacyjnych od Shopify ani autorów wtyczek WooCommerce.`,
  zrodlaDanych: 'Dane: oficjalna dokumentacja i cennik Shopify (Pricing, Shopify Markets, URL structure, robots.txt.liquid), dokumentacja WooCommerce (Permalinks, Structured Data, HPOS) oraz Google Search Central (Product structured data, Core Web Vitals). Stan odczytu: 22.11.2026.',
  answer: 'Shopify wygrywa szybkością serwera CDN na starcie, automatycznym hreflang w Shopify Markets i brakiem opieki nad aktualizacjami PHP - to bezpieczny wybór dla marek D2C sprzedających za granicę. WooCommerce wygrywa elastycznością SEO i B2B: pozwala dowolnie kształtować adresy URL bez wymuszonych katalogów /collections/ i /products/, modyfikować checkout (np. walidację NIP) bez planu za $2 300/mies. i trzymać pełną bazę na własnym serwerze.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabela-shopify-vs-woocommerce',
  tableCaption: 'Shopify a WooCommerce pod kątem SEO technicznego, AI i kosztów: 9 kryteriów (stan: listopad 2026)',
  tablePrzypis: 'Źródła: Shopify Help Center & Developer Docs (shopify.com/pricing, shopify.dev), WooCommerce Documentation (woocommerce.com/documentation) oraz Google Search Central (odczyt 22.11.2026). Znaki towarowe należą do ich właścicieli.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'shopify', label: 'Shopify (zamknięty SaaS e-commerce)' },
    { key: 'woocommerce', label: 'WooCommerce (open-source na WordPressie)' },
  ],
  rows: [
    {
      id: 'architektura-url',
      kryterium: 'Struktura adresów URL kategorii, produktów i bloga',
      shopify: 'Sztywne prefiksy systemowe /collections/, /products/, /pages/ oraz /blogs/news/, których nie zmienisz; wymaga też pilnowania linków wewnętrznych w motywie Liquid, żeby karty kolekcji linkowały wprost do /products/slug zamiast duplikatu /collections/.../products/slug',
      woocommerce: 'Pełna kontrola w Ustawienia -> Bezpośrednie odnośniki: własne bazy kategorii i produktów, zagnieżdżone drzewa podkategorii (np. /kategoria/podkategoria/) oraz blog na tej samej strukturze bez narzuconego /blogs/',
    },
    {
      id: 'ttfb-cwv',
      kryterium: 'Czas odpowiedzi serwera (TTFB) i mobilne Core Web Vitals',
      shopify: 'Globalna sieć brzegowa CDN (infrastruktura Cloudflare) i szybki serwerowy HTML z szablonów Liquid; głównym zagrożeniem dla mobilnego INP i LCP jest instalowanie kilkunastu zewnętrznych aplikacji wstrzykujących skrypty do storefrontu',
      woocommerce: 'Zależy od hostingu i konfiguracji: z tabelami zamówień HPOS (domyślnymi od WooCommerce 8.2), pamięcią obiektową Redis i cache strony z pominięciem ciasteczek koszyka osiąga świetne TTFB; tani współdzielony hosting i ciężki motyw z 30 wtyczkami psują LCP i INP',
    },
    {
      id: 'indeksacja-filtry',
      kryterium: 'Nawigacja fasetowa (filtry kolorów, rozmiarów, parametrów B2B)',
      shopify: 'Filtrowanie oparte na tagach (/collections/buty/czarne+skorzane) łatwo mnoży tysiące cienkich stron indeksowalnych; natywne filtry Storefront Filtering oparte na parametrach ?filter.* wymagają spójnych reguł canonical i ostrożności w robots.txt.liquid',
      woocommerce: 'Dowolna strategia SEO dla filtrów: statyczne, indeksowalne landing page pod frazy z długiego ogona (np. marka + parametr) przy jednoczesnym noindex/canonical dla wielokrotnych kombinacji sortowania i cen',
    },
    {
      id: 'dane-product',
      kryterium: 'Dane strukturalne JSON-LD (Product, Offer, Merchant listing)',
      shopify: 'Nowoczesne motywy Online Store 2.0 generują podstawowy obiekt Product przez filtr Liquid structured_data, ale pełne pola Merchant Center (GTIN/EAN, koszt dostawy shippingDetails, zwroty hasMerchantReturnPolicy, warianty B2B) często wymagają edycji kodu Liquid lub płatnej aplikacji',
      woocommerce: 'Rdzeń WooCommerce (klasa WC_Structured_Data) generuje JSON-LD dla Product, Offer i ocen, a darmowe lub jednorazowe rozszerzenia SEO (Rank Math, Yoast WooCommerce) oraz filtry PHP pozwalają dopisać dowolny atrybut bez miesięcznego abonamentu',
    },
    {
      id: 'wielojezycznosc-hreflang',
      kryterium: 'Sprzedaż międzynarodowa, waluty i tagi hreflang',
      shopify: 'Bardzo wygodny moduł Shopify Markets: podkatalogi językowe (/de/, /en/), subdomeny lub domeny krajowe z automatycznymi wzajemnymi tagami hreflang i osobnymi mapami XML; darmowa aplikacja Translate & Adapt tłumaczy automatycznie do 2 języków',
      woocommerce: 'Pełna swoboda z WPML (WooCommerce Multilingual) lub Polylang for WooCommerce: tłumaczenie slugów produktów, atrybutów i kategorii w stałej rocznej licencji, choć konfiguracja wielu walut i stawek VAT wymaga więcej pracy wdrożeniowej',
    },
    {
      id: 'checkout-b2b',
      kryterium: 'Modyfikacja koszyka, checkoutu i funkcji B2B (np. NIP, ceny hurtowe)',
      shopify: 'Szybki jednokrokowy checkout, ale głęboka przebudowa kroków zamówienia (Checkout Extensibility) i natywne katalogi B2B są zarezerwowane głównie dla planu Shopify Plus (od ok. $2 300/mies.); w niższych planach pole NIP wymaga obejść lub aplikacji',
      woocommerce: 'Otwarty kod koszyka i zamówienia na każdym planie hostingowym: walidacja numeru NIP w bazie GUS/VIES, odroczone płatności dla stałych kontrahentów, paczkomaty i polskie systemy ERP bez przechodzenia na plan korporacyjny',
    },
    {
      id: 'boty-ai-llms',
      kryterium: 'Dostęp robotów AI (OAI-SearchBot, PerplexityBot) i plik /llms.txt',
      shopify: 'Treść opisów i cen trafia w czystym HTML z Liquid do robotów wyszukiwarek AI; edycja robots.txt odbywa się przez szablon robots.txt.liquid, natomiast wystawienie własnego pliku tekstowego bezpośrednio pod adresem głównym /llms.txt jest zablokowane architekturą SaaS (wymaga przekierowania lub warstwy Cloudflare)',
      woocommerce: 'Pełny dostęp do katalogu głównego domeny i reguł serwera: w minutę wystawisz fizyczny lub dynamiczny plik /llms.txt z listą kluczowych kategorii i kontrolujesz dostęp botów AI w robots.txt oraz zaporze WAF',
    },
    {
      id: 'koszty-24m',
      kryterium: 'Struktura kosztów w skali 24 miesięcy (aplikacje, prowizje, serwer)',
      shopify: 'Stały abonament w USD ($29 Basic, $79 Grow, $299 Advanced miesięcznie przy rozliczeniu rocznym; $39/$105/$399 miesięcznie bez zobowiązania) + miesięczne subskrypcje aplikacji z App Store + dodatkowa opłata transakcyjna, jeśli nie korzystasz z Shopify Payments',
      woocommerce: 'Oprogramowanie na licencji GPL za 0 zł; płacisz za wybrany hosting, roczne licencje wybranych wtyczek i opiekę programisty bez prowizji procentowej na rzecz producenta silnika sklepowego (płacisz wyłącznie prowizję operatora płatności)',
    },
    {
      id: 'wlasnosc-migracja',
      kryterium: 'Własność danych i ryzyko uzależnienia od dostawcy (lock-in)',
      shopify: 'Kod backendu należy do Shopify: wyeksportujesz produkty, klientów i zamówienia do plików CSV lub przez API, ale szablon Liquid i logikę aplikacji przy zmianie silnika trzeba zbudować od nowa',
      woocommerce: '100% własności plików PHP, mediów i bazy MySQL - cały sklep przeniesiesz między dowolnymi serwerami w Polsce lub w chmurze w ciągu jednego okienka serwisowego',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Shopify czy WooCommerce pod SEO: porównanie w 9 kryteriach',
      html: '<p>Wybór między Shopify a WooCommerce rzadko rozstrzyga się na poziomie „która platforma lepiej pozycjonuje się w Google”, bo w top 3 wyników dla konkurencyjnych fraz produktowych stoją sklepy na obu silnikach. Różnica wychodzi przy skalowaniu katalogu powyżej kilkuset indeksów, rozbudowie filtrów kategorii oraz liczeniu miesięcznych opłat za aplikacje i bramki płatności.</p>',
      tabela: 'glowna',
    },
    {
      id: 'architektura-url-duplikaty',
      h2: 'Architektura URL i wewnętrzna duplikacja produktów: najważniejsza różnica techniczna',
      html: [
        '<p>W dokumentacji Shopify struktura katalogów jest stała: każda kategoria ma w adresie <code>/collections/</code>, każdy produkt <code>/products/</code>, a strona informacyjna <code>/pages/</code>. Samo istnienie angielskiego słowa w adresie URL nie blokuje wysokich pozycji w polskim czy niemieckim Google, natomiast <strong>błędem motywów Shopify są linki przez kolekcję</strong> prowadzące do produktów.</p>',
        '<p>Domyślnie wiele szablonów generuje na listach kategorii odnośniki typu <code>sklep.pl/collections/buty-zimowe/products/model-x</code>, podczas gdy tag <code>rel="canonical"</code> wskazuje na <code>sklep.pl/products/model-x</code>. Jeśli produkt należy do pięciu kolekcji, Googlebot marnuje budżet indeksowania na pięć niekanonicznych adresów URL, a sygnały linkowania wewnętrznego przechodzą przez canonical zamiast trafiać bezpośrednio w docelowy adres produktu. Podczas audytu SEO sklepu na Shopify zazwyczaj w pierwszym tygodniu upraszczamy w kodzie Liquid wywołanie <code>product.url | within: collection</code> do czystego <code>product.url</code>.</p>',
        '<p>W <strong>WooCommerce</strong> problem sztywnych prefiksów nie występuje - w ustawieniach bezpośrednich odnośników zmienisz <code>/product-category/</code> na <code>/kategoria/</code> lub zbudujesz hierarchię <code>/odziez-robocza/kurtki-odblaskowe/</code>. Trzeba jednak uważać w drugą stronę: agresywne usuwanie bazy kategorii wtyczkami przy tysiącach produktów potrafi spowolnić tabelę reguł przepisywania WordPressa (<code>wp_options -> rewrite_rules</code>) i powodować konflikty 404 przy identycznych slugach wpisów blogowych i podkategorii.</p>',
      ].join(''),
    },
    {
      id: 'szybkosc-hpos-cwv',
      h2: 'Szybkość ładowania (TTFB i Core Web Vitals): chmura Shopify kontra WooCommerce z HPOS',
      html: [
        '<p>Przez lata WooCommerce przegrywał z Shopify szybkością bazy danych przy dużym ruchu, ponieważ zapisywał każde zamówienie razem z wpisami blogowymi i produktami we wspólnych tabelach <code>wp_posts</code> oraz <code>wp_postmeta</code>. Od wersji WooCommerce 8.2 domyślnym standardem jest <strong>High-Performance Order Storage (HPOS)</strong>, który wydziela zamówienia do czterech dedykowanych, indeksowanych tabel (<code>_wc_orders</code> i powiązanych). W połączeniu z pamięcią obiektową <strong>Redis</strong> i pamięcią podręczną strony na poziomie serwera (Nginx FastCGI / LiteSpeed / Cloudflare APO) dobrze wdrożony WooCommerce ładuje karty kategorii w ułamku sekundy.</p>',
        '<p>Na <strong>Shopify</strong> infrastrukturę serwerową i globalny CDN dostajesz od pierwszego dnia bez zatrudniania administratora. Wąskim gardłem bywa za to <strong>sklep z aplikacjami</strong>: dołożenie osobnej wtyczki do wyskakujących okienek, programu lojalnościowego, recenzji ze zdjęciami, czatu, licznika czasu i dosprzedaży potrafi wstrzyknąć kilkaset kilobajtów zewnętrznego JavaScriptu i zepchnąć mobilny wskaźnik <strong>INP powyżej progu 200 ms</strong>.</p>',
        zdanieJesli('/narzedzia/test-core-web-vitals-porownanie', (h) => `<p>Realne wyniki polowe obu sklepów z ostatnich ${POROWNYWARKA_CWV.dniCrux} dni danych Chrome UX Report zestawisz obok siebie w naszej ${a(h, 'darmowej porównywarce Core Web Vitals (VS)')}.</p>`),
      ].join(''),
    },
    {
      id: 'koszty-24-miesiace',
      h2: 'Koszt sklepu i dodatków SEO w 24 miesiące: policz aplikacje i prowizje bramek',
      html: [
        '<p>Porównując sam cennik planów Shopify (<strong>Basic $29/mies.</strong>, <strong>Grow $79/mies.</strong>, <strong>Advanced $299/mies.</strong> przy rozliczeniu rocznym albo odpowiednio <strong>$39 / $105 / $399</strong> w rozliczeniu miesięcznym - odczyt z <code>shopify.com/pricing</code> 22.11.2026) z darmową wtyczką WooCommerce, łatwo pominąć ukryte składniki obu modeli:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-tco-shopify-woo',
        caption: 'Orientacyjny koszt utrzymania i rozbudowy sklepu w skali 24 miesięcy (kwoty netto)',
        columns: [
          { key: 'scenariusz', label: 'Model sklepu' },
          { key: 'start', label: 'Wdrożenie startowe' },
          { key: 'miesiecznie', label: 'Koszty stałe / mies.' },
          { key: 'razem24', label: 'Suma orientacyjna w 24 mies.' },
          { key: 'uwagi', label: 'Kluczowe konsekwencje dla SEO i biznesu' },
        ],
        rows: WIERSZE_TCO_SHOPIFY_WOO,
        przypis: 'Źródła: publiczny cennik Shopify w USD (shopify.com/pricing, stan na 22.11.2026, bez podatku VAT), typowe koszty hostingu zarządzanego WooCommerce w Polsce oraz cennik AI SEO COMPANY dla serwisów B2B w Next.js.',
      },
      htmlPo: [
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>Niezależnie od tego, czy Twój sklep stoi dziś na Shopify, czy na WooCommerce, błędy indeksacji, kanonikali i danych strukturalnych sprawdzisz bezpłatnie w naszym ${a(h, 'darmowym audycie SEO')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-shopify-kiedy-woocommerce',
      h2: 'Werdykt: który silnik sklepu wybrać w 2026 roku?',
      html: [
        '<ul>',
        '<li><strong>Wybierz Shopify, gdy:</strong> budujesz markę produktową D2C (moda, kosmetyki, suplementy, gadżety), chcesz szybko wystartować na kilku rynkach zagranicznych z automatycznym <code>hreflang</code> w Shopify Markets i nie masz w zespole osoby technicznej do pilnowania aktualizacji WordPressa i serwera.</li>',
        '<li><strong>Wybierz WooCommerce, gdy:</strong> prowadzisz sprzedaż B2B lub techniczną z rozbudowanym drzewem kategorii i filtrów parametrów, potrzebujesz pełnej swobody w polskim checkoucie (walidacja NIP, integracje z Subiektem/Optimą/Enovą, nietypowe gabaryty kurierskie) oraz nie chcesz płacić miesięcznych subskrypcji w dolarach za każdą funkcję i zewnętrzną bramkę płatności.</li>',
        '<li><strong>Rozważ Next.js bez koszyka (lub Headless), gdy:</strong> sprzedajesz maszyny, komponenty przemysłowe albo usługi hurtowe wyłącznie na zapytanie ofertowe - wtedy ciężki silnik koszyka spowalnia stronę bez korzyści sprzedażowej.</li>',
        '</ul>',
        zdanieJesli('/porownania/nextjs-vs-wordpress-seo', (h) => `<p>Jeśli prowadzisz firmę B2B bez sprzedaży koszykowej, zobacz też nasze porównanie ${a(h, 'Next.js vs WordPress pod SEO i AI')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Najczęstsze pytania o SEO na Shopify i WooCommerce',
  faq: [
    {
      question: 'Czy w Shopify da się usunąć /collections/ i /products/ z adresów URL?',
      answer: 'Nie w standardowej architekturze sklepu Shopify (Online Store). Ścieżki /collections/, /products/, /pages/ oraz /blogs/ są na stałe wpisane w routing platformy. Jedynym sposobem na całkowicie dowolne adresy URL z backendem Shopify jest budowa osobnego frontu Headless (np. w Next.js lub Hydrogen) komunikującego się przez Storefront API, co opłaca się dopiero przy większej skali sprzedaży.',
    },
    {
      question: 'Jak naprawić duplikację adresów produktów w kolekcjach Shopify?',
      answer: 'W plikach szablonu motywu Liquid (najczęściej card-product.liquid lub product-grid-item.liquid) należy zamienić link generowany filtrem product.url | within: collection na bezpośredni atrybut product.url. Dzięki temu każda lista produktów linkuje prosto do kanonicznego adresu /products/nazwa-produktu zamiast tworzyć wielokrotne adresy z nazwą kolekcji w środku.',
    },
    {
      question: 'Czy WooCommerce jest za wolny pod Core Web Vitals przy kilku tysiącach produktów?',
      answer: 'Sam silnik nie jest za wolny, o ile włączysz tabele zamówień HPOS, użyjesz serwera z pamięcią obiektową Redis (zamiast taniego hostingu współdzielonego), skonfigurujesz cache strony dla niezalogowanych użytkowników i zrezygnujesz z ciężkich wizualnych kreatorów stron na rzecz lekkiego motywu blokowego.',
    },
    {
      question: 'Która platforma lepiej współpracuje z wyszukiwarkami AI (ChatGPT, Perplexity, Google AI Overviews)?',
      answer: 'Obie platformy renderują opisy produktów, ceny i dane strukturalne Product po stronie serwera (Liquid w Shopify, PHP w WooCommerce), więc roboty OAI-SearchBot i PerplexityBot odczytują pełną kartę towaru bez uruchamiania JavaScriptu. Przewagą WooCommerce jest łatwe dodanie własnego pliku /llms.txt w głównym katalogu domeny oraz pełna edycja grafu JSON-LD bez dodatkowych opłat.',
    },
  ],
  sources: [
    { url: 'https://www.shopify.com/pricing', nazwa: 'Shopify: Plan tiers & monthly/annual pricing (Basic, Grow, Advanced, Plus)', data: '2026-11-22' },
    { url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview', nazwa: 'Shopify Help Center: Improving search engine optimization (URL structure, canonical tags, sitemaps)', data: '2026-11-22' },
    { url: 'https://shopify.dev/docs/storefronts/themes/seo', nazwa: 'Shopify Developer Docs: Theme SEO best practices, structured_data filter & robots.txt.liquid', data: '2026-11-22' },
    { url: 'https://help.shopify.com/en/manual/international/pricing-and-domains/domains', nazwa: 'Shopify Help Center: International domains, subfolders & automatic hreflang tags in Shopify Markets', data: '2026-11-22' },
    { url: 'https://woocommerce.com/document/permalinks/', nazwa: 'WooCommerce Documentation: Configuring product and category permalinks', data: '2026-11-22' },
    { url: 'https://woocommerce.com/document/high-performance-order-storage/', nazwa: 'WooCommerce Documentation: High-Performance Order Storage (HPOS) database architecture', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/appearance/structured-data/product', nazwa: 'Google Search Central: Product structured data (Product snippet & Merchant listing JSON-LD)', data: '2026-11-22' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (POROWNYWARKA_CWV.dniCrux = 28, CENY: seoStandard od 1 900 zł, strona od 5 900 zł, Booster Pack 2 500 zł)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Prowadzisz sklep na Shopify lub WooCommerce i tracisz ruch przez błędy indeksacji filtrów? Zamów audyt i plan naprawczy w 24 h',
    plan: 'standard',
    linki: [
      { tekst: 'Sprawdź pakiety pozycjonowania od 1 900 zł netto', href: '/cennik-pozycjonowania' },
      { tekst: 'Przetestuj sklep za darmo w audycie SEO (49 reguł)', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Porównanie Shopify i WooCommerce pod kątem SEO i wyszukiwarek AI' }],
};

// --- P14: Ahrefs vs Semrush vs darmowy zestaw narzedzi SEO ---------------------------------------

const WIERSZE_BUDZET_NARZEDZIA = [
  {
    id: 'budzet-free',
    profil: 'Mała firma usługowa lub B2B (1 własna domena, 1 rynek, brak specjalisty SEO na etacie)',
    zestaw: 'Darmowy stos: Google Search Console + Bing Webmaster Tools + darmowe narzędzia AI SEO COMPANY',
    kosztRoczn: '0 zł / rok',
    uzasadnienie: 'Widzisz 100% własnych zapytań i kliknięć w GSC, linki w Bing, błędy techniczne w 49 regułach, wynik autorytetu z Common Crawl i widoczność w AI bez płacenia za funkcje agencyjne',
  },
  {
    id: 'budzet-inhouse',
    profil: 'Dział marketingu in-house lub e-commerce (1-3 domeny, regularna publikacja 4-10 treści miesięcznie)',
    zestaw: '1 płatna licencja (Ahrefs Lite $129/mies. lub Semrush Pro $139,95/mies.) + GSC',
    kosztRoczn: 'ok. 5 200 - 6 800 zł netto / rok (zależnie od rozliczenia rocznego lub miesięcznego i kursu USD)',
    uzasadnienie: 'Ahrefs przyspiesza analizę linków konkurencji i luk treściowych, a Semrush daje w jednym abonamencie codzienny monitoring 500 fraz i podgląd reklam Google Ads konkurentów',
  },
  {
    id: 'budzet-agencja',
    profil: 'Firma, która chce gotowych wdrożeń zamiast samodzielnej nauki narzędzi (brak czasu w zespole)',
    zestaw: `Współpraca z agencją (np. nasz pakiet SEO Standard od ${fmt(CENY.seoStandard.pln)} zł netto/mies.)`,
    kosztRoczn: `od ${fmt(CENY.seoStandard.pln * 12)} zł netto / rok (umowa miesięczna, w cenie praca zespołu, treści, linki i panel klienta 24/7)`,
    uzasadnienie: 'Zamiast wydawać 500-1 000 zł/mies. na sam dostęp do wykresów, których nikt nie wdraża, przeznaczasz budżet na realne poprawki kodu, pisanie podstron i pozyskiwanie odnośników',
  },
];

export const P14_AHREFS_SEMRUSH = {
  slug: 'ahrefs-vs-semrush-narzedzia-seo',
  title: 'Ahrefs vs Semrush vs darmowe narzędzia SEO: ceny 2026',
  description: 'Ahrefs czy Semrush w 2026? Jawne progi cenowe, limity kredytów, dane linków i fraz oraz kiedy małej firmie B2B wystarczą darmowe narzędzia SEO.',
  h1: 'Ahrefs vs Semrush a darmowy zestaw narzędzi SEO: porównanie funkcji i kosztów (2026)',
  okruszek: 'Ahrefs vs Semrush vs darmowe SEO',
  nazwaKarty: 'Ahrefs vs Semrush vs darmowe narzędzia SEO',
  teaser: 'Dwa największe kombajny SEO na świecie kontra bezpłatne dane z pierwszej ręki (Search Console, Bing, Common Crawl i CrUX). Porównujemy cenniki w USD, limity kredytów i realną przydatność dla firmy B2B.',
  kryteria: '9 kryteriów',
  decyzja: { pytanie: 'Kupić Ahrefs, Semrush czy zostać przy darmowych narzędziach?', skrot: 'Indeks linków i kredyty w Ahrefs, monitoring i PPC w Semrush albo 0 zł w zestawie GSC + narzędzia własne' },
  tag: 'Porównanie narzędzi i budżetu SEO',
  ujawnienie: 'Korzystamy na co dzień z płatnych baz danych SEO oraz API, a jednocześnie udostępniamy własny zestaw bezpłatnych narzędzi diagnostycznych i prowadzimy pakiety SEO. Nie umieszczamy na tej stronie linków afiliacyjnych do Ahrefs ani Semrush. Nazwy Ahrefs i Semrush są znakami towarowymi odpowiednich podmiotów, a porównanie opiera się wyłącznie na ich publicznie ogłoszonych cennikach i dokumentacji.',
  zrodlaDanych: `Dane: publiczne cenniki Ahrefs (ahrefs.com/pricing) i Semrush (semrush.com/pricing), dokumentacja Google Search Console i Bing Webmaster Tools oraz parametry darmowych narzędzi AI SEO COMPANY (graf Common Crawl ${AUTORYTET.wydanie}, CrUX API, ${AUDYT.regul} reguł audytu). Stan odczytu: 22.11.2026.`,
  answer: 'Ahrefs i Semrush to profesjonalne platformy do badania konkurencji: Ahrefs wyróżnia się szybkim indeksem linków zwrotnych (od $129/mies. w planie Lite plus wąski plan Starter za $29/mies.), a Semrush łączy SEO z analizą reklam Google Ads i codziennym monitoringiem pozycji (od $139,95/mies. w planie Pro). Jeśli jednak prowadzisz jedną firmową stronę B2B i nie masz na etacie specjalisty SEO, na start wystarczy darmowy zestaw: Google Search Console, Bing Webmaster Tools i nasze bezpłatne narzędzia techniczne.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabela-ahrefs-semrush-free',
  tableCaption: 'Ahrefs, Semrush i darmowy zestaw narzędzi SEO: porównanie w 9 kryteriach (stan na 22.11.2026)',
  tablePrzypis: 'Źródła: publiczne strony cennikowe ahrefs.com/pricing oraz semrush.com/pricing (kwoty netto w USD przed podatkiem VAT, odczyt 22.11.2026), dokumentacja Google Search Console i Bing Webmaster Tools oraz specyfikacja narzędzi AI SEO COMPANY (lib/narzedziaLiczby.js). Nie łączy nas stosunek partnerski z Ahrefs ani Semrush.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'ahrefs', label: 'Ahrefs' },
    { key: 'semrush', label: 'Semrush' },
    { key: 'darmowe', label: 'Darmowy zestaw (GSC + Bing + narzędzia AI SEO)' },
  ],
  rows: [
    {
      id: 'cennik-miesieczny',
      kryterium: 'Publiczne progi cenowe (płatność miesięczna, netto bez VAT, stan 22.11.2026)',
      ahrefs: 'Starter $29/mies. (tylko miesięcznie, wąski pakiet startowy), Lite $129/mies., Standard $249/mies., Advanced $449/mies., Enterprise wycena roczna; rabat do ok. 17% przy płatności rocznej od planu Lite',
      semrush: 'Pro $139,95/mies., Guru $249,95/mies., Business $499,95/mies.; rabat do ok. 17% przy rozliczeniu rocznym (Pro ok. $117,33/mies., Guru ok. $208,33/mies.)',
      darmowe: '0 zł (Google Search Console, Bing Webmaster Tools, Google Keyword Planner oraz 9 bezpłatnych narzędzi i 13 szablonów PDF na naszej stronie)',
    },
    {
      id: 'limity-kredyty',
      kryterium: 'System kredytów raportowych i stanowiska użytkowników',
      ahrefs: '1 użytkownik w cenie bazowej; w planach Starter i Lite obowiązuje miesięczny limit kredytów na otwierane raporty, natomiast od planu Standard ($249/mies.) raporty objęte są nielimitowanym fair-use',
      semrush: '1 użytkownik w cenie bazowej; brak kredytów za kliknięcie raportu w głównych modułach SEO, za to sztywne limity dzienne zapytań i projektów (5 projektów w Pro, 15 w Guru, 40 w Business)',
      darmowe: 'Brak limitu użytkowników we własnych usługach Search Console i Bing; w naszych narzędziach przejrzyste dzienne limity na adres IP bez zakładania konta',
    },
    {
      id: 'dane-wlasnej-domeny',
      kryterium: 'Dokładność danych o ruchu z Google na Twojej własnej stronie',
      ahrefs: 'Estymacja modelowa na podstawie pozycji śledzonych fraz z bazy i średniego CTR (można podpiąć własne GSC w Ahrefs Webmaster Tools)',
      semrush: 'Estymacja modelowa ruchu organicznego i płatnego na bazie obserwowanych słów kluczowych (możliwość podpięcia GSC i GA4 do projektu)',
      darmowe: 'Dane źródłowe z pierwszej ręki w Google Search Console: rzeczywiste wyświetlenia, kliknięcia i zapytania użytkowników z ostatnich 16 miesięcy (z zastrzeżeniem progów prywatności dla rzadkich fraz)',
    },
    {
      id: 'analiza-linkow',
      kryterium: 'Baza linków zwrotnych (backlinks) i porównanie z konkurencją',
      ahrefs: 'Bardzo szybki komercyjny crawler linków (AhrefsBot), historia przyrostu i utraty domen odsyłających, filtry anchorów oraz raport Link Intersect do szukania miejsc publikacji',
      semrush: 'Rozbudowany moduł Backlink Analytics i Backlink Audit ze wskaźnikiem Authority Score, porównaniem do kilku domen konkurentów i wbudowanym narzędziem outreachowym',
      darmowe: `Podgląd własnych linków w GSC i Bing Webmaster Tools oraz nasz bezpłatny miernik autorytetu 0-100 oparty na publicznym grafie Common Crawl (${ fmt(AUTORYTET.domenWGrafie) } domen, porównanie z maks. ${AUTORYTET.konkurentow} konkurentami bez pełnej listy pojedynczych URL-i)`,
    },
    {
      id: 'badanie-fraz',
      kryterium: 'Badanie słów kluczowych konkurencji (Keyword Gap)',
      ahrefs: 'Keywords Explorer z estymacją kliknięć, trudnością KD opartą na profilach linkowych TOP 10 i szybkim podglądem wszystkich fraz, na które rankuje dowolny konkurent',
      semrush: 'Keyword Magic Tool z klasyfikacją intencji wyszukiwania (informacyjna, komercyjna, transakcyjna), Keyword Gap dla kilku konkurentów naraz i historią SERP od planu Guru',
      darmowe: 'Google Search Console pokazuje frazy, na które już się wyświetlasz, a Planer słów kluczowych Google Ads daje wolumeny i stawki CPC (bez aktywnej kampanii pokazuje przedziały; nie wyciąga pełnej listy fraz obcej domeny)',
    },
    {
      id: 'audyt-techniczny',
      kryterium: 'Techniczny audyt strony i Core Web Vitals',
      ahrefs: 'Site Audit w chmurze (również w darmowym wariancie Ahrefs Webmaster Tools dla zweryfikowanych własnych domen z limitem podstron), renderowanie JS i wykresy struktury wewnętrznej',
      semrush: 'Site Audit (do 100 000 stron miesięcznie w planie Pro) ze sprawdzaniem indeksacji, hreflang, duplikatów i wewnętrznego linkowania',
      darmowe: `Nasz darmowy audyt SEO sprawdza do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach (wynik 1-100), porównywarka CWV zestawia 28-dniowe dane CrUX dwóch domen, a tester sprawdza dostęp ${ROBOTY_AI.botow} robotów AI w robots.txt`,
    },
    {
      id: 'reklamy-ppc',
      kryterium: 'Podgląd płatnych kampanii Google Ads (PPC) konkurencji',
      ahrefs: 'Podstawowy podgląd płatnych słów kluczowych i historii reklam tekstowych w Site Explorerze, mniejszy nacisk na narzędzia stricte mediowe',
      semrush: 'Mocna strona platformy: szczegółowa historia kreacji reklamowych Google Ads i PLA (Shopping), estymacja budżetów CPC konkurentów i analiza słów wykluczających',
      darmowe: 'Centrum przejrzystości reklam Google (Google Ads Transparency Center) pozwala ręcznie podejrzeć aktywne kreacje dowolnego reklamodawcy za darmo, bez gotowych tabel fraz konkurenta',
    },
    {
      id: 'widocznosc-ai',
      kryterium: 'Pomiar widoczności w wyszukiwarkach AI (ChatGPT, Perplexity, AI Overviews)',
      ahrefs: 'Śledzenie obecności przeglądów AI w SERP oraz dodatkowe moduły monitoringu marki (część funkcji rozliczana osobno ponad bazowy abonament)',
      semrush: 'Śledzenie funkcji SERP (AI Overviews) w Position Trackingu oraz osobno wyceniane pakiety i dodatki do monitorowania odpowiedzi modeli językowych',
      darmowe: `Raport generatywnej AI w Search Console (łączne wyświetlenia w AI Overviews/AI Mode) oraz nasza darmowa sprawdzarka zadająca ${WIDOCZNOSC.pytan} pytania w ${WIDOCZNOSC.silnikow} źródłach AI naraz`,
    },
    {
      id: 'dla-kogo',
      kryterium: 'Kiedy zakup ma największy zwrot z inwestycji',
      ahrefs: 'Agencje SEO, zespoły link buildingu i content marketingu pracujące codziennie na profilach linkowych i lukach treściowych wielu konkurentów',
      semrush: 'Zespoły marketingowe łączące pod jednym dachem SEO, kampanie Google Ads (SEM) i codzienny monitoring setek fraz na jednym koncie',
      darmowe: 'Właściciele firm B2B i usługowych z jedną domeną, którzy potrzebują uczciwej diagnozy stanu strony przed zleceniem prac lub prowadzą podstawowe SEO samodzielnie',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Ahrefs vs Semrush a darmowy zestaw SEO: zestawienie 9 kryteriów',
      html: '<p>Większość porównań w sieci zestawia ze sobą wyłącznie Ahrefs i Semrush, bo programy partnerskie obu narzędzi lub recenzje pisane przez agencje pomijają najważniejsze pytanie właściciela małej firmy: <strong>czy przy jednej domenie potrzebujesz płatnego kombajnu SEO</strong> za 500-1 000 zł miesięcznie? Poniższa tabela porównuje obie komercyjne platformy z zestawem bezpłatnych narzędzi pierwszoźródłowych.</p>',
      tabela: 'glowna',
    },
    {
      id: 'skad-biora-sie-roznice-w-liczbach',
      h2: 'Dlaczego Ahrefs, Semrush i Search Console pokazują zupełnie inne liczby ruchu?',
      html: [
        '<p>Częsty powód nieporozumień przy audytach brzmi: „w Ahrefs nasza strona ma 180 wejść miesięcznie, w Semrush 310, a w Google Search Console widzimy 940 kliknięć”. Żadne z tych narzędzi nie kłamie - one mierzą inne zjawiska:</p>',
        '<ul>',
        '<li><strong>Google Search Console (dane rzeczywiste):</strong> rejestruje prawdziwe wyświetlenia i kliknięcia w wyszukiwarce Google dla Twojej zweryfikowanej domeny. Uwzględnia zapytania wielowyrazowe i lokalne, których nie ma w żadnej komercyjnej bazie słów kluczowych.</li>',
        '<li><strong>Ahrefs i Semrush (estymacja ze słownika fraz):</strong> odpytują cyklicznie wybraną pulę milionów fraz w danym kraju, sprawdzają na której pozycji stoi Twoja domena i mnożą miesięczny wolumen frazy przez szacunkowy współczynnik klikalności (CTR) dla danej pozycji. W niszach B2B, przemyśle i usługach lokalnych modele zewnętrzne potrafią zaniżać realny ruch organiczny kilkukrotnie.</li>',
        '<li><strong>Metryki autorytetu (DR vs AS vs nasz wynik Common Crawl):</strong> Domain Rating (Ahrefs) i Authority Score (Semrush) to autorskie skale 0-100 każdego producenta. Google nie używa żadnej z nich w swoim algorytmie rankingowym. Nasz bezpłatny miernik również liczy własną skalę 0-100, ale z otwartego grafu linków Common Crawl - bez przypisywania się do wskaźników firm trzecich.</li>',
        '</ul>',
        zdanieJesli('/porownania/dr-vs-da-vs-autorytet-common-crawl', (h) => `<p>Szczegółowe różnice matematyczne między tymi wskaźnikami rozpisaliśmy w osobnym porównaniu ${a(h, 'Domain Rating vs Domain Authority vs wynik z Common Crawl')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-ahrefs-kiedy-semrush',
      h2: 'Ahrefs czy Semrush: kiedy wybrać który kombajn, gdy masz zespół SEO?',
      html: [
        '<p>Jeżeli masz w firmie osobę, która spędza nad SEO co najmniej kilka godzin tygodniowo, wybór między dwoma liderami rynku sprowadza się do stylu pracy i modelu rozliczeń:</p>',
        '<ul>',
        '<li><strong>Ahrefs wygrywa przy link buildingu i szybkiej analizie treści konkurencji:</strong> interfejs Site Explorera pozwala błyskawicznie prześwietlić, które dokładnie podstrony konkurenta zbierają najwięcej ruchu i skąd prowadzą do nich linki redakcyjne. Trzeba jednak pilnować cennika: w tańszym planie <strong>Lite ($129/mies.)</strong> obowiązuje limit kredytów raportowych na użytkownika, więc przy intensywnym przeklikiwaniu filtrów pełną swobodę daje dopiero plan <strong>Standard ($249/mies.)</strong>. Plan <strong>Starter ($29/mies.)</strong> służy jedynie do sporadycznego podglądu przy bardzo małej puli kredytów.</li>',
        '<li><strong>Semrush wygrywa, gdy łączysz SEO z Google Ads i codziennym śledzeniem pozycji:</strong> już w planie <strong>Pro ($139,95/mies.)</strong> śledzisz codziennie 500 słów kluczowych z podziałem na lokalizacje miejskie oraz analizujesz reklamy tekstowe i produktowe konkurentów w Google Ads. Dane historyczne i rozbudowany Content Marketing Toolkit odblokowuje plan <strong>Guru ($249,95/mies.)</strong>.</li>',
        '<li><strong>Darmowe wersje dla właściciela własnej domeny:</strong> zanim kupisz pełny pakiet, pamiętaj, że Ahrefs oferuje bezpłatne <em>Ahrefs Webmaster Tools</em> (po weryfikacji własnej domeny przez GSC daje dostęp do audytu technicznego i podglądu własnych linków bez podglądu konkurencji), a Semrush pozwala na bardzo ograniczoną liczbę darmowych zapytań dziennie po rejestracji.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'matematyka-budzetu-b2b',
      h2: 'Matematyka budżetu w małej firmie B2B: narzędzie za $130-$250 czy realne wdrożenia?',
      html: [
        '<p>W firmach usługowych i produkcyjnych najczęściej widzimy ten sam scenariusz: zarząd wykupuje roczny abonament profesjonalnego narzędzia SEO za równowartość 6 000 - 12 000 zł netto, po czym po dwóch tygodniach nikt do niego nie zagląda, bo same wykresy nie napiszą podstrony ofertowej, nie poprawią czasu odpowiedzi serwera ani nie zdobędą publikacji branżowej.</p>',
      ].join(''),
      tabela: {
        id: 'tabela-budzet-narzedzia-seo',
        caption: 'Dobór zestawu narzędzi SEO do skali firmy i zasobów zespołu (stan: listopad 2026)',
        columns: [
          { key: 'profil', label: 'Sytuacja firmy' },
          { key: 'zestaw', label: 'Rekomendowane rozwiązanie' },
          { key: 'kosztRoczn', label: 'Roczny koszt netto' },
          { key: 'uzasadnienie', label: 'Dlaczego to się spina finansowo' },
        ],
        rows: WIERSZE_BUDZET_NARZEDZIA,
        przypis: `Źródła: cenniki Ahrefs i Semrush (odczyt 22.11.2026) oraz cennik pakietów AI SEO COMPANY (SEO Standard od ${fmt(CENY.seoStandard.pln)} zł netto/mies.).`,
      },
      htmlPo: [
        zdanieJesli('/narzedzia', (h) => `<p>Wszystkie nasze kalkulatory, sprawdzarki i szablony PDF bez rejestracji znajdziesz w hubie ${a(h, 'darmowe narzędzia SEO i AI')}.</p>`),
        zdanieJesli('/porownania/seo-in-house-czy-agencja', (h) => `<p>Pełne porównanie kosztów własnego etatu i licencji z abonamentem zewnętrznym opisaliśmy w zestawieniu ${a(h, 'SEO in-house czy agencja')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o Ahrefs, Semrush i darmowe narzędzia SEO',
  faq: [
    {
      question: 'Czy da się skutecznie pozycjonować firmową stronę bez płatnego Ahrefsa i Semrusha?',
      answer: 'Przy jednej lokalnej lub niszowej stronie B2B - na etapie startu jak najbardziej. Google Search Console pokazuje dokładne zapytania, strony i pozycje z prawdziwej wyszukiwarki, Bing Webmaster Tools udostępnia bezpłatny podgląd linków przychodzących i skaner techniczny, a nasz darmowy audyt weryfikuje 49 reguł technicznych, treściowych i AI. Płatne narzędzia stają się niezbędne wtedy, gdy chcesz masowo analizować frazy i profil linkowy kilkunastu konkurentów.',
    },
    {
      question: 'Co daje darmowe Ahrefs Webmaster Tools w porównaniu z pełnym planem Lite?',
      answer: 'Ahrefs Webmaster Tools (AWT) jest bezpłatne dla właścicieli stron, którzy potwierdzą prawa do domeny np. przez Google Search Console. Pozwala przeskanować własną witrynę w module Site Audit i przejrzeć linki przychodzące oraz frazy wyłącznie dla własnej domeny. Nie pozwala natomiast wpisać adresu konkurenta ani badać nowych słów kluczowych w Keywords Explorerze - te funkcje wymagają płatnej subskrypcji.',
    },
    {
      question: 'Na co uważać przy zakupie planu Ahrefs Starter za $29 lub Lite za $129?',
      answer: 'Na system kredytów raportowych oraz liczbę użytkowników. Bazowy plan obejmuje jednego użytkownika, a w niższych progach każde otwarcie nowego raportu, zastosowanie filtra lub eksport danych w wybranych narzędziach zużywa pulę miesięcznych kredytów. Przed zakupem rocznym warto przetestować plan miesięczny przez 30 dni i sprawdzić realne zużycie w swoim zespole.',
    },
    {
      question: 'Czy w pakietach pozycjonowania AI SEO COMPANY muszę osobno kupować dostęp do narzędzi SEO?',
      answer: 'Nie. W ramach naszych pakietów abonamentowych (od 1 900 zł netto miesięcznie w SEO Standard) wszystkie koszty narzędzi analitycznych, crawlerów i cotygodniowych zapytań API do modeli AI pokrywa nasza agencja. Ty otrzymujesz gotowe wnioski, wdrożone treści i całodobowy dostęp do panelu klienta połączonego z Twoją własną usługą Search Console i GA4.',
    },
  ],
  sources: [
    { url: 'https://ahrefs.com/pricing', nazwa: 'Ahrefs Pricing: oficjalny cennik planów Starter, Lite, Standard, Advanced i zasady kredytów', data: '2026-11-22' },
    { url: 'https://ahrefs.com/webmaster-tools', nazwa: 'Ahrefs Webmaster Tools: zakres bezpłatnego dostępu dla zweryfikowanych właścicieli domen', data: '2026-11-22' },
    { url: 'https://www.semrush.com/pricing/', nazwa: 'Semrush Pricing: oficjalny cennik planów Pro, Guru i Business oraz limitów projektów', data: '2026-11-22' },
    { url: 'https://search.google.com/search-console/about', nazwa: 'Google Search Console: oficjalne narzędzie diagnostyki indeksacji i skuteczności w Google', data: '2026-11-22' },
    { url: 'https://www.bing.com/webmasters/about', nazwa: 'Bing Webmaster Tools: bezpłatna analiza linków zwrotnych, Site Scan i protokół IndexNow', data: '2026-11-22' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: 'Common Crawl Web Graphs: publiczny graf linków wykorzystywany w naszym mierniku autorytetu', data: '2026-11-22' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (AUDYT: 25 podstron, 49 reguł; AUTORYTET: cc-main-2026-aug-sep-oct, 134 979 706 domen; WIDOCZNOSC: 3 pytania, 5 silników; CENY: SEO Standard od 1 900 zł netto)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Zamiast kupować kolejną subskrypcję SaaS, sprawdź swoją stronę za darmo albo zleć wdrożenia w umowie miesięcznej',
    plan: 'standard',
    linki: [
      { tekst: 'Otwórz darmowy audyt SEO (ocena 1-100 w 49 regułach)', href: '/narzedzia/audyt-seo' },
      { tekst: 'Sprawdź autorytet domeny z grafu Common Crawl za 0 zł', href: '/narzedzia/autorytet-domeny' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Porównanie narzędzi SEO: Ahrefs, Semrush i darmowy zestaw analityczny' }],
};

export const porownaniaSprint2 = [P13_SHOPIFY_WOO, P14_AHREFS_SEMRUSH];

export default porownaniaSprint2;
