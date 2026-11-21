// P10-P12: trzy strony porównawcze z klastra CMS / technologia strony pod SEO i AI (21.11.2026):
//   - P10_NEXT_WP:     Next.js vs WordPress pod SEO i AI (9 kryteriów)
//   - P11_WEBFLOW_WP:  Webflow vs WordPress pod SEO (8 kryteriów)
//   - P12_KOD_KREATOR: Strona kodowana czy kreator WWW pod SEO (8 kryteriów)
// Czysty ESM z importami względnymi (.js) bez aliasu @/, żeby działał w Next.js, sitemapie i testach Node.

import { hrefJesliOpublikowana } from './publikacja.js';
import { AUDYT, CENY } from './narzedziaLiczby.js';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

function zdanieJesli(href, zdanie) {
  const h = hrefJesliOpublikowana(href);
  return h ? zdanie(h) : '';
}

// --- P10: Next.js vs WordPress pod SEO i AI ------------------------------------------------------

const WIERSZE_TCO_NEXT_WP = [
  {
    id: 'tco-wp',
    model: 'WordPress z gotowym builderem i wtyczkami pro',
    start: '3 500 - 8 000 zł netto',
    utrzymanie: '250 - 650 zł / mies. (hosting, licencje WPML/cache/WAF, 1-2 h opieki dev)',
    razem24: '9 500 - 23 600 zł netto',
    uwagi: 'Ryzyko regresji Core Web Vitals i konfliktów po aktualizacjach PHP lub wtyczek',
  },
  {
    id: 'tco-next-solo',
    model: 'Dedykowana strona w Next.js (wdrożenie jednorazowe)',
    start: `od ${fmt(CENY.strona.pln)} zł netto`,
    utrzymanie: '0 - 90 zł / mies. (hosting edge/VPS, 0 zł za licencje wtyczek i języki)',
    razem24: '5 900 - 8 060 zł netto (bez abonamentu SEO)',
    uwagi: 'Pełna własność repozytorium Git; pozycjonowanie i treści zamawiasz osobno',
  },
  {
    id: 'tco-next-booster',
    model: 'Next.js w naszym pakiecie Booster Pack (WWW + SEO)',
    start: '0 zł opłaty startowej za budowę strony',
    utrzymanie: `${fmt(CENY.boosterPack.pln)} zł netto / mies. (umowa min. ${CENY.boosterPack.umowaMiesiecy} mies., potem miesięczna)`,
    razem24: `${fmt(CENY.boosterPack.pln * 3)} zł netto za pierwsze 3 mies. (strona + pełne SEO + SSL/serwer)`,
    uwagi: 'W cenie projekt UX/UI w Next.js, opieka techniczna, treści, linki, Mapy Google i panel 24/7',
  },
];

export const P10_NEXT_WP = {
  slug: 'nextjs-vs-wordpress-seo',
  title: 'Next.js vs WordPress pod SEO i AI: porównanie 2026',
  description: 'Next.js czy WordPress pod SEO w 2026? Porównanie w 9 kryteriach: Core Web Vitals, bezpieczeństwo wtyczek, JSON-LD, boty AI i koszt w 24 mies.',
  h1: 'Next.js vs WordPress pod SEO i wyszukiwarki AI: porównanie architektury i kosztów (2026)',
  okruszek: 'Next.js vs WordPress pod SEO',
  nazwaKarty: 'Next.js vs WordPress pod SEO i AI',
  teaser: 'Statyczny i serwerowy HTML bez wtyczek PHP kontra najpopularniejszy CMS na świecie. Porównujemy Core Web Vitals, bezpieczeństwo, boty AI i pełny koszt w 24 miesiące.',
  kryteria: '9 kryteriów',
  decyzja: { pytanie: 'Next.js czy WordPress pod pozycjonowanie?', skrot: 'Core Web Vitals, bezpieczeństwo wtyczek, edycja treści i koszt 24 mies.' },
  tag: 'Porównanie technologii strony pod SEO i GEO',
  ujawnienie: `Projektujemy strony firmowe w Next.js (od ${fmt(CENY.strona.pln)} zł netto albo za 0 zł na starcie w pakiecie Booster Pack) i jednocześnie pozycjonujemy serwisy klientów na WordPressie. Dlatego wprost pokazujemy sytuacje, w których klasyczny WordPress nadal jest rozsądniejszym wyborem.`,
  zrodlaDanych: `Dane: Google Search Central (Core Web Vitals i JavaScript SEO), HTTP Archive Web Almanac (CMS i CrUX), raporty bezpieczeństwa Patchstack, dokumentacja crawlerów OpenAI oraz nasz audyt ai-seo-company.pl (${AUDYT.stron} podstron, ${AUDYT.regul} reguł, wynik 95/100 z 18.11.2026).`,
  answer: 'Sam wybór Next.js albo WordPressa nie daje wyższych pozycji z automatu, bo Google ocenia treść, intencję i linki. Next.js wygrywa technicznie w firmach B2B i wielojęzycznych: serwuje gotowy HTML z CDN dla Googlebota i botów AI, ułatwia utrzymanie LCP <= 2,5 s i INP <= 200 ms oraz eliminuje luki we wtyczkach PHP. WordPress wygrywa tam, gdzie redakcja codziennie publikuje dziesiątki wpisów w edytorze blokowym bez udziału programisty.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-nextjs-vs-wordpress',
  tableCaption: 'Next.js (App Router, SSG/SSR) a WordPress (PHP + wtyczki): porównanie w 9 kryteriach SEO i AI',
  tablePrzypis: 'Źródła: Google Search Central (Core Web Vitals, JavaScript SEO Basics), HTTP Archive Web Almanac (rozdział CMS, dane polowe CrUX), Patchstack State of WordPress Security, OpenAI Platform Docs (Crawlers) oraz pomiar własny AI SEO COMPANY (21.11.2026). Znaki towarowe należą do ich właścicieli.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'nextjs', label: 'Next.js (SSG / SSR / App Router)' },
    { key: 'wordpress', label: 'WordPress (PHP + motyw i wtyczki)' },
  ],
  rows: [
    {
      id: 'html-boty',
      kryterium: 'Dostarczanie HTML dla Googlebota, OAI-SearchBot i PerplexityBot',
      nextjs: 'Gotowy HTML wygenerowany przy buildzie (SSG/ISR) lub na serwerze (SSR) trafia prosto z CDN; boty wyszukiwarek i AI czytają pełną treść w pierwszym żądaniu HTTP bez wykonywania JS',
      wordpress: 'Serwerowy HTML z PHP czytelny dla Google i botów AI, o ile działa pamięć podręczna strony (page cache), a wtyczki zabezpieczające nie wycinają botów AI kodem 403',
    },
    {
      id: 'cwv',
      kryterium: 'Core Web Vitals na telefonie (LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 - 75. percentyl CrUX)',
      nextjs: 'Wysoki pułap na starcie: automatyczna optymalizacja obrazów (WebP/AVIF, wymiary przeciw CLS), fontów i podział kodu JS per trasa; React Server Components ograniczają blokowanie wątku głównego (INP)',
      wordpress: 'W danych HTTP Archive (CrUX) ok. 45-50% mobilnych witryn WordPress zalicza komplet CWV przez ciężkie kreatory wizualne (Elementor, Divi) i nadmiar skryptów; lekki motyw Gutenberg na dobrym cache osiąga wysokie wyniki',
    },
    {
      id: 'bezpieczenstwo',
      kryterium: 'Powierzchnia ataku i aktualizacje bezpieczeństwa',
      nextjs: 'Brak PHP, panelu /wp-login.php i publicznej bazy MySQL po stronie frontu oraz zero zewnętrznych wtyczek CMS; aktualizacje zależności odbywają się w repozytorium Git przed wdrożeniem',
      wordpress: 'Według raportów Patchstack ponad 90% wykrywanych luk w ekosystemie WordPress pochodzi z zewnętrznych wtyczek (kolejne 7-8% z motywów); wymaga stałych aktualizacji, kopii zapasowych i zapory WAF',
    },
    {
      id: 'jsonld-hreflang',
      kryterium: 'Kontrola nad JSON-LD, hreflang, sitemap.xml i /llms.txt',
      nextjs: '100% kontroli w kodzie: typowane grafy schema.org bez duplikatów, dwukierunkowy hreflang z x-default z jednego słownika tras, segmentowane mapy XML i natywny endpoint /llms.txt',
      wordpress: 'Szybka konfiguracja podstawowa we wtyczkach (Rank Math, Yoast, WPML, Polylang), ale nakładające się rozszerzenia potrafią dublować węzły JSON-LD i rozjeżdżać adresy kanoniczne między językami',
    },
    {
      id: 'edycja-tresci',
      kryterium: 'Codzienna edycja treści przez zespół nietechniczny',
      nextjs: 'Wymaga podpięcia bezgłowego CMS-a (Sanity, Strapi, Payload albo WordPress w trybie Headless) lub pracy na plikach MDX/Git; bez panelu CMS zmiany wprowadza opiekun techniczny lub agencja',
      wordpress: 'Natywny edytor blokowy Gutenberg znany większości marketerów i redaktorów; dodanie artykułu, kategorii, przekierowania lub nowego autora trwa kilka minut bez angażowania programisty',
    },
    {
      id: 'narzedzia-interaktywne',
      kryterium: 'Własne kalkulatory, konfiguratory i programmatic SEO',
      nextjs: 'Pełne środowisko React i API Routes w tym samym projekcie: interaktywne kalkulatory B2B, sprawdzarki i tysiące podstron danych ładują się natychmiast bez ramek iframe',
      wordpress: 'Wymaga pisania dedykowanych wtyczek PHP/JS albo instalacji ciężkich rozszerzeń formularzy, które często ładują swoje arkusze stylów i skrypty na każdej podstronie serwisu',
    },
    {
      id: 'koszt-startu',
      kryterium: 'Próg wejścia i koszt budowy strony',
      nextjs: `Wyższy przy pojedynczym zleceniu software house'u; u nas strona w Next.js kosztuje od ${fmt(CENY.strona.pln)} zł netto osobno lub 0 zł na starcie w pakiecie Booster Pack (${fmt(CENY.boosterPack.pln)} zł netto/mies., min. ${CENY.boosterPack.umowaMiesiecy} mies.)`,
      wordpress: 'Niski przy prostym wdrożeniu na gotowym motywie, natomiast rzetelny projekt B2B na czystym Gutenbergu bez ciężkiego page buildera kosztuje porównywalnie do strony pisanej w kodzie',
    },
    {
      id: 'tco-24m',
      kryterium: 'Koszt utrzymania i opieki technicznej w 24 miesiące (TCO)',
      nextjs: 'Bardzo niski koszt stały: hosting edge/CDN zwykle 0-90 zł/mies., brak corocznych subskrypcji za wtyczki wielojęzyczne, cache i bezpieczeństwo oraz brak awarii po autoaktualizacjach',
      wordpress: 'Hosting zarządzany + odnowienia płatnych wtyczek (cache, wielojęzyczność, kopie, builder) + 1-3 h pracy programisty miesięcznie na bezpieczne testy aktualizacji składają się na stały koszt operacyjny',
    },
    {
      id: 'lock-in',
      kryterium: 'Własność kodu i niezależność od dostawcy (vendor lock-in)',
      nextjs: 'Otwarty framework MIT (React / Node.js): repozytorium Git przeniesiesz między Vercel, Cloudflare, AWS lub własnym serwerem VPS z Dockerem bez przepisywania strony',
      wordpress: 'Otwarty kod GPL i baza MySQL możliwe do przeniesienia na dowolny hosting PHP, choć odejście od kreatorów opartych na shortcode\'ach (Elementor, Divi, WPBakery) wymaga przebudowy szablonów',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Next.js czy WordPress pod SEO i boty AI: 9 kryteriów technicznych',
      html: '<p>W dyskusjach o wyborze systemu pod pozycjonowanie często mieszają się dwie rzeczy: możliwości samego silnika oraz sposób, w jaki przeciętna agencja wdraża stronę. Czysty WordPress bez ociężałych kreatorów potrafi rankować znakomicie, a źle napisana aplikacja React (renderowana wyłącznie w przeglądarce klienta - CSR) potrafi ukryć treść przed botami AI. Poniższa tabela porównuje nowoczesny Next.js z App Routerem (SSG/SSR) z typowym wdrożeniem WordPressa w firmie B2B lub usługowej.</p>',
      tabela: 'glowna',
    },
    {
      id: 'cwv-boty-ai-nasz-wynik',
      h2: 'Core Web Vitals, nie-javascriptowe boty AI i nasz wynik 95/100 na żywej domenie',
      html: [
        '<p>Dokumentacja Google Search Central stawia twarde progi dla 75. percentyla realnych użytkowników w raporcie Chrome UX Report (CrUX): <strong>LCP do 2,5 s</strong>, <strong>INP do 200 ms</strong> oraz <strong>CLS do 0,1</strong>. W zbiorczych danych HTTP Archive (Web Almanac) mobilne strony na WordPressie osiągają pełne zaliczenie Core Web Vitals wyraźnie rzadziej (około 45-50% domen) niż architektury statyczne i zamknięte platformy CDN. Głównym winowajcą nie jest sam język PHP, lecz nakładanie na siebie wizualnego page buildera, kilkunastu wtyczek marketingowych i nieprzyciętych skryptów blokujących główny wątek procesora telefonu przy pierwszym dotknięciu ekranu (metryka INP).</p>',
        '<p>Druga różnica ujawniła się wraz z wyszukiwarkami opartymi na modelach językowych. O ile Googlebot posiada rozbudowaną kolejkę renderowania Chromium (Web Rendering Service), o tyle crawlery AI - w tym <code>OAI-SearchBot</code> (ChatGPT), <code>PerplexityBot</code> oraz <code>ClaudeBot</code> - pobierają surową odpowiedź HTTP i <strong>nie wykonują kodu JavaScript po stronie przeglądarki</strong>. W Next.js z generowaniem statycznym (SSG) i komponentami serwerowymi (React Server Components) bot dostaje w ułamku sekundy czysty, semantyczny HTML z tabelami, nagłówkami i blokiem <code>JSON-LD</code>, bez ryzyka, że treść schowa się za pustym kontenerem <code>&lt;div id="root"&gt;</code> albo wygaśnie pamięć podręczna PHP.</p>',
        `<p>Nie piszemy tego teoretycznie: sama witryna <code>www.ai-seo-company.pl</code> działa na Next.js. W publicznym przebiegu naszego audytu z 18 listopada 2026 (${AUDYT.stron} podstron sprawdzonych w ${AUDYT.regul} regułach) uzyskała łączny wynik <strong>95/100</strong> oraz <strong>0 błędów</strong> - w tym <strong>100/100 w SEO technicznym</strong>, <strong>100/100 w treści</strong> i <strong>100/100 w gotowości na AI</strong>.</p>`,
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>Swoją obecną witrynę na WordPressie lub Next.js możesz przetestować dokładnie tą samą listą ${AUDYT.regul} reguł w naszym ${a(h, 'darmowym audycie SEO')}.</p>`),
        zdanieJesli('/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml', (h) => `<p>Z kolei różnice w tym, jak poszczególne roboty czytają pliki sterujące dostępem i mapy adresów, omawiamy w porównaniu ${a(h, 'llms.txt vs robots.txt vs sitemap.xml')}.</p>`),
      ].join(''),
    },
    {
      id: 'koszt-24-miesiace',
      h2: 'Pełny koszt posiadania strony (TCO) w 24 miesiące: wtyczki i opieka a czysty kod',
      html: [
        '<p>Wycena na fakturze startowej rzadko pokazuje, ile strona firmowa kosztuje przez kolejne dwa lata. W ekosystemie WordPress do samego wdrożenia dochodzą odnawiane co roku licencje (wtyczka wielojęzyczna, optymalizacja cache, formularze, kopie zapasowe) oraz stały dyżur programisty, bo według wieloletnich raportów Patchstack ponad 90% luk bezpieczeństwa w WordPressie znajduje się w zewnętrznych wtyczkach. W Next.js front nie ma bazy SQL ani wtyczek PHP, więc koszty utrzymania ograniczają się do hostingu CDN i rozbudowy treści.</p>',
        '<p>Poniższe zestawienie porównuje trzy realne ścieżki budżetowe dla małej i średniej firmy B2B w horyzoncie 24 miesięcy (kwoty orientacyjne netto w Polsce):</p>',
      ].join(''),
      tabela: {
        id: 'tabela-tco-nextjs-wp',
        caption: 'Porównanie orientacyjnego kosztu budowy i utrzymania strony w 24 miesiące (netto)',
        columns: [
          { key: 'model', label: 'Ścieżka wdrożenia' },
          { key: 'start', label: 'Koszt startowy (budowa)' },
          { key: 'utrzymanie', label: 'Utrzymanie techniczne / mies.' },
          { key: 'razem24', label: 'Koszt w skali 24 mies. / progu umowy' },
          { key: 'uwagi', label: 'Co zawiera i na co uważać' },
        ],
        rows: WIERSZE_TCO_NEXT_WP,
        przypis: `Źródła: widełki rynkowe utrzymania WordPress w Polsce oraz cennik AI SEO COMPANY (strona w Next.js od ${fmt(CENY.strona.pln)} zł netto; Booster Pack ${fmt(CENY.boosterPack.pln)} zł netto/mies. przy umowie na min. ${CENY.boosterPack.umowaMiesiecy} mies.).`,
      },
      htmlPo: [
        zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>Szczegóły naszej architektury bez wtyczek, standardu WCAG 2.2 AA i warunków pakietu Booster Pack znajdziesz na stronie ${a(h, 'projektowanie stron internetowych w Next.js')}.</p>`),
        zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Zanim podejmiesz decyzję o migracji z WordPressa, możesz w 1-3 minuty wygenerować podgląd nowej strony głównej na komputer i telefon w narzędziu ${a(h, 'darmowa makieta redesignu strony z AI')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-wordpress-kiedy-nextjs',
      h2: 'Uczciwa rekomendacja: kiedy zostać na WordPressie, a kiedy przejść na Next.js',
      html: [
        '<p>Żadna technologia nie wygrywa w każdym scenariuszu biznesowym. Oto prosty podział, którym kierujemy się przy audytach przedwdrożeniowych:</p>',
        '<ul>',
        '<li><strong>WordPress jest lepszym wyborem, gdy:</strong> prowadzisz portal redakcyjny, magazyn branżowy lub rozbudowany blog, na którym kilku redaktorów codziennie publikuje i formatuje wpisy w Gutenbergu; budujesz sklep WooCommerce korzystający z gotowych polskich integracji kurierskich i księgowych przy ograniczonym budżecie startowym; albo chcesz samodzielnie instalować rozszerzenia bez kontaktu z zespołem technicznym (pod warunkiem trzymania liczby wtyczek poniżej kilkunastu i używania lekkiego motywu blokowego zamiast ciężkiego page buildera).</li>',
        '<li><strong>Next.js wygrywa zdecydowanie, gdy:</strong> strona ma generować zapytania B2B lub usługowe z Google i wyszukiwarek AI, działać w kilku językach (np. PL, EN, DE) z bezbłędnym <code>hreflang</code> bez opłat licencyjnych, udostępniać interaktywne kalkulatory lub narzędzia lead magnetowe oraz utrzymać zielone Core Web Vitals na telefonie przez lata bez łatania dziurawych wtyczek.</li>',
        '<li><strong>Wariant pośredni (Headless WordPress + Next.js):</strong> sprawdza się wtedy, gdy redakcja nie chce rezygnować z panelu WordPressa do pisania artykułów, ale publiczny front dla użytkowników i robotów ma być serwowany statycznie przez Next.js z ukrytym panelem administracyjnym na osobnej subdomenie.</li>',
        '</ul>',
        zdanieJesli('/porownania/webflow-vs-wordpress-seo', (h) => `<p>Jeżeli obok Next.js rozważasz również zamkniętą platformę wizualną, zobacz nasze osobne zestawienie ${a(h, 'Webflow vs WordPress pod SEO')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Najczęstsze pytania o Next.js i WordPress pod kątem SEO',
  faq: [
    {
      question: 'Czy samo przepisanie strony z WordPressa na Next.js podniesie pozycje w Google?',
      answer: 'Samo przepisanie kodu przy tej samej treści i strukturze linków rzadko daje skok o kilkanaście pozycji, jeśli stary WordPress był już poprawnie zaindeksowany i szybki. Realny wzrost wynika z usunięcia wąskich gardeł: poprawy mobilnego LCP i INP powyżej progów Core Web Vitals, uporządkowania architektury URL-i i danych strukturalnych JSON-LD, eliminacji przestojów oraz rozbudowy podstron ofertowych i narzędziowych.',
    },
    {
      question: 'Czy React i Next.js nie utrudniają indeksowania przez JavaScript?',
      answer: 'Problem pustego HTML dotyczy aplikacji SPA renderowanych wyłącznie w przeglądarce (np. czysty Vite/Create React App bez SSR). Next.js domyślnie generuje pełny kod HTML na serwerze lub w trakcie buildu (SSG/SSR), dzięki czemu Googlebot, Bingbot, OAI-SearchBot i PerplexityBot otrzymują gotowy dokument tekstowy dokładnie tak samo pewnie jak z klasycznego serwera HTML.',
    },
    {
      question: 'Jak edytować teksty i dodawać wpisy blogowe na stronie w Next.js?',
      answer: 'Są dwa sprawdzone modele: podłączenie lekkiego panelu Headless CMS (np. Sanity, Payload, Strapi albo WordPress używany wyłącznie jako zaplecze treści), w którym edytor wypełnia pola formularza jak w zwykłym CMS-ie, albo publikacja bezpośrednio przez zespół SEO w ramach abonamentu (tak pracujemy w pakietach SEO Standard, SEO Premium i Booster Pack - dostarczamy gotowe, wdrożone podstrony i artykuły).',
    },
    {
      question: 'Czy podczas migracji z WordPressa na Next.js stracę wypracowane pozycje i linki?',
      answer: 'Nie, jeśli migracja zachowuje dotychczasowe adresy URL jeden do jednego albo wdraża kompletną mapę stałych przekierowań 301/308 na poziomie konfiguracji Next.js i serwera brzegowego. Przed przełączeniem domeny zgrywamy wszystkie adresy z Google Search Console, mapy witryny i historii linków zwrotnych, żeby żaden podlinkowany adres nie zwrócił błędu 404.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Wskaźniki Core Web Vitals a wyniki wyszukiwania Google (LCP, INP, CLS)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: Podstawy SEO w JavaScripcie (renderowanie SSR/SSG a CSR)', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: rozdział Content Management Systems (udział CMS i wyniki CrUX)', data: '2026-11-21' },
    { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (udział wtyczek i motywów w lukach bezpieczeństwa)', data: '2026-11-21' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot)', data: '2026-11-21' },
    { url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata', nazwa: 'Next.js Documentation: Metadata Files, JSON-LD and Sitemaps (App Router)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/audytPrzyklad.js (przebieg audytu www.ai-seo-company.pl z 18.11.2026: 25 podstron, 49 reguł, wynik 95/100, 0 błędów)',
    'lib/narzedziaLiczby.js (AUDYT, CENY: strona od 5 900 zł netto, Booster Pack 2 500 zł netto/mies. przy min. 3 mies.)',
    'app/[locale]/projektowanie-stron-internetowych/page.js (FAQ i parametry Next.js / Booster Pack)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Chcesz przenieść stronę z WordPressa na szybki Next.js za 0 zł na starcie w Booster Pack? Wycenimy migrację w 24 h',
    plan: 'booster',
    linki: [
      { tekst: 'Zobacz projektowanie stron w Next.js i Booster Pack', href: '/projektowanie-stron-internetowych' },
      { tekst: 'Wygeneruj darmową makietę nowej strony w 1-3 minuty', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Porównanie Next.js i WordPress pod kątem SEO i wyszukiwarek AI' }],
};

// --- P11: Webflow vs WordPress pod SEO -----------------------------------------------------------

const WIERSZE_KOSZT_WEBFLOW_WP = [
  {
    id: 'koszt-wf-1',
    scenariusz: 'Webflow CMS (1 język, płatność roczna)',
    licencje24: 'ok. 2 200 - 3 800 zł (plan CMS $23/mies. lub Business $39/mies. × 24 mies.)',
    wielojezycznosc24: '0 zł (tylko jeden rynek językowy)',
    opieka24: 'Niska: brak aktualizacji PHP i wtyczek po stronie serwera',
  },
  {
    id: 'koszt-wf-3',
    scenariusz: 'Webflow CMS + 2 dodatkowe języki ze zlokalizowanymi URL-ami (PL + EN + DE)',
    licencje24: 'ok. 2 200 - 3 800 zł za sam plan bazowy Site Plan',
    wielojezycznosc24: 'ok. 5 500 - 5 800 zł dopłaty (Localization Advanced $29/mies. × 2 języki × 24 mies. = $1 392)',
    opieka24: 'W tańszym pakiecie Essential ($9/język/mies.) nie przetłumaczysz slugów URL pod lokalne frazy',
  },
  {
    id: 'koszt-wp-3',
    scenariusz: 'WordPress + WPML / Polylang Pro (PL + EN + DE)',
    licencje24: 'ok. 1 200 - 3 000 zł (hosting zarządzany + odnowienia 2-3 wtyczek premium w 24 mies.)',
    wielojezycznosc24: 'ok. 850 zł na 2 lata (licencja WPML Multilingual CMS €99/rok bez dopłat za kolejny język)',
    opieka24: 'Wymaga stałego budżetu na bezpieczne aktualizacje PHP/wtyczek i kontrolę wydajności bazy',
  },
  {
    id: 'koszt-next-3',
    scenariusz: 'Własna strona Next.js w Booster Pack AI SEO COMPANY (PL + EN + DE)',
    licencje24: `0 zł za budowę na starcie; abonament ${fmt(CENY.boosterPack.pln)} zł netto/mies. (min. ${CENY.boosterPack.umowaMiesiecy} mies.) z pełnym SEO`,
    wielojezycznosc24: '0 zł dopłaty SaaS za każdy kolejny język i zlokalizowane ścieżki URL (next-intl w kodzie)',
    opieka24: 'Serwer, SSL, opieka techniczna, treści, linki i pełna własność kodu Git po stronie klienta',
  },
];

export const P11_WEBFLOW_WP = {
  slug: 'webflow-vs-wordpress-seo',
  title: 'Webflow vs WordPress pod SEO: koszty, limity i szybkość',
  description: 'Webflow czy WordPress pod pozycjonowanie? Porównanie URL, kolekcji CMS, wielojęzyczności hreflang, szybkości CDN i pełnego kosztu w 24 mies.',
  h1: 'Webflow vs WordPress pod SEO: struktura URL, limity CMS, hreflang i koszt w 24 miesiące',
  okruszek: 'Webflow vs WordPress pod SEO',
  nazwaKarty: 'Webflow vs WordPress pod SEO',
  teaser: 'Zamknięty wizualny SaaS na szybkim CDN kontra otwarty system z pełną swobodą adresów URL. Sprawdzamy sztywne ścieżki kolekcji, dopłaty za języki i eksport bazy.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Webflow czy WordPress pod pozycjonowanie?', skrot: 'Zagnieżdżenie URL, dopłaty za hreflang, limity CMS i własność bazy' },
  tag: 'Porównanie platform CMS pod SEO',
  ujawnienie: `Optymalizujemy pod SEO zarówno serwisy na Webflow, jak i na WordPressie, a nowe strony dla klientów budujemy w czystym Next.js (w pakiecie Booster Pack za 0 zł opłaty startowej). Nie otrzymujemy prowizji partnerskich od Webflow ani dostawców wtyczek WordPress.`,
  zrodlaDanych: 'Dane: dokumentacja i cennik Webflow (Site Plans, Localization, CMS Limits, Code Export), HTTP Archive Web Almanac (wyniki CrUX dla CMS), Patchstack oraz Google Search Central (hreflang i przekierowania). Stan: 21.11.2026.',
  answer: 'Webflow wygrywa szybkością hostingu CDN na starcie i brakiem aktualizacji wtyczek PHP, dlatego dobrze sprawdza się na jednojęzycznych stronach SaaS i usługowych do kilkuset podstron. WordPress wygrywa elastycznością architektury SEO: pozwala budować wielopoziomowe adresy URL, nie nakłada sztywnych limitów kolekcji ani miesięcznych dopłat za każdy język ze zlokalizowanym slugiem URL i daje pełną własność bazy danych.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-webflow-vs-wordpress',
  tableCaption: 'Webflow a WordPress pod kątem pozycjonowania: porównanie w 8 kryteriach technicznych i kosztowych',
  tablePrzypis: 'Źródła: Webflow Help Center (CMS Collections, Localization, Code Export, cennik w USD przy rozliczeniu rocznym, odczyt 21.11.2026), HTTP Archive Web Almanac (CMS CrUX), Google Search Central (wersje językowe stron). Znaki towarowe należą do ich właścicieli.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'webflow', label: 'Webflow (zamknięty SaaS + wizualny CMS)' },
    { key: 'wordpress', label: 'WordPress (open-source PHP + MySQL)' },
  ],
  rows: [
    {
      id: 'struktura-url',
      kryterium: 'Struktura adresów URL i zagnieżdżanie katalogów w CMS',
      webflow: 'Sztywny płaski schemat kolekcji /kolekcja/wpis: nie zbudujesz natywnie wielopoziomowej ścieżki dynamicznej typu /uslugi/warszawa/audyt-seo w jednej kolekcji bez osobnych kolekcji lub reverse proxy',
      wordpress: 'Pełna swoboda permalinków, hierarchicznych podstron, własnych typów wpisów (CPT) i taksonomii o dowolnej głębokości zagnieżdżenia katalogów',
    },
    {
      id: 'hreflang-wielojezycznosc',
      kryterium: 'Wielojęzyczność, lokalizowane slugi URL i koszt hreflang',
      webflow: 'Płatny dodatek Webflow Localization liczony osobno za każdy język: plan Essential ($9/mies./język) nie tłumaczy slugów URL; zlokalizowane adresy URL wymagają planu Advanced ($29/mies./język przy płatności rocznej)',
      wordpress: 'Wtyczki WPML lub Polylang obsługują dowolną liczbę języków, pełne tłumaczenie slugów URL, subdomeny lub osobne domeny krajowe w jednej stałej opłacie rocznej bez dopłat od każdego języka',
    },
    {
      id: 'szybkosc-cdn',
      kryterium: 'Szybkość serwera, CDN i Core Web Vitals bez ręcznego strojenia',
      webflow: 'Globalny hosting AWS + Fastly CDN w cenie planu i czysty wygenerowany kod HTML/CSS; ponad 70% mobilnych witryn Webflow zalicza Core Web Vitals w danych polowych HTTP Archive (CrUX)',
      wordpress: 'Zależy od dyscypliny wdrożenia: średnia dla całego ekosystemu to ok. 45-50% na mobile przez ciężkie motywy, ale dobrze skonfigurowany Gutenberg z Redis i CDN bez trudu dorównuje Webflow',
    },
    {
      id: 'utrzymanie-wtyczki',
      kryterium: 'Aktualizacje wtyczek, awarie i bezpieczeństwo serwera',
      webflow: 'Zero administracji serwerem i łatania wtyczek PHP - certyfikat SSL, ochronę infrastruktury i dostępność utrzymuje dostawca platformy',
      wordpress: 'Pełna odpowiedzialność właściciela za aktualizacje rdzenia, motywu i wtyczek oraz kopie zapasowe (ponad 90% luk bezpieczeństwa WordPressa dotyczy wtyczek firm trzecich)',
    },
    {
      id: 'eksport-wlasnosc',
      kryterium: 'Limity kolekcji CMS, eksport kodu i przenaszalność bazy',
      webflow: 'Limity rekordów i list zależne od planu (np. maks. 10 zagnieżdżonych list kolekcji na stronę); funkcja Code Export pobiera wyłącznie statyczny HTML/CSS/JS, a kolekcje CMS wyeksportujesz tylko do płaskiego CSV',
      wordpress: 'Brak sztucznych limitów liczby wpisów, kategorii i relacji poza wydajnością Twojego serwera; kod PHP i pełną bazę MySQL przeniesiesz w całości do każdego dostawcy hostingu',
    },
    {
      id: 'przekierowania-301',
      kryterium: 'Zarządzanie przekierowaniami 301 i nagłówkami HTTP',
      webflow: 'Wygodny wbudowany panel przekierowań 301 z prostymi regułami grupującymi; masowy import z CSV, zaawansowane wyrażenia regularne lub niestandardowe nagłówki HTTP wymagają planu wyższego lub warstwy Cloudflare',
      wordpress: 'Darmowy import i eksport tysięcy przekierowań regex z pliku CSV we wtyczkach (Redirection, Rank Math) albo bezpośrednio w konfiguracji serwera Nginx / .htaccess bez narzutu aplikacji',
    },
    {
      id: 'boty-ai',
      kryterium: 'Czytelność dla botów AI (OAI-SearchBot, PerplexityBot) i /llms.txt',
      webflow: 'Czysty serwerowy HTML dobrze czytany przez crawlery AI (o ile kluczowa treść nie jest ukryta w skryptach zewnętrznych); brak własnego kodu backendowego utrudnia automatyczne generowanie dynamicznych plików tekstowych z bazy',
      wordpress: 'Serwerowy HTML czytelny dla robotów AI i pełny dostęp do systemu plików oraz reguł rewrite pod automatyczny plik /llms.txt i niestandardowe kanały danych; wymaga sprawdzenia, czy WAF nie blokuje botów AI',
    },
    {
      id: 'tco-24m',
      kryterium: 'Całkowity koszt posiadania (TCO) w skali 24 miesięcy',
      webflow: 'Przewidywalny dla małej strony w 1 języku, lecz szybko rośnie przy kolejnych wersjach językowych, płatnych stanowiskach Workspace i zewnętrznych dodatkach do filtrowania kolekcji (np. Jetboost)',
      wordpress: 'Niższy koszt licencji przy wielu językach i rozbudowanych katalogach treści, ale wymaga wliczenia regularnych godzin opieki technicznej nad aktualizacjami',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Webflow czy WordPress pod pozycjonowanie: 8 kryteriów decyzyjnych',
      html: '<p>Zespoły marketingowe często przechodzą z WordPressa na Webflow, bo mają dość psucia się strony po aktualizacji wtyczek i wolnego panelu Elementora. Od strony czystej szybkości ładowania taka zmiana niemal zawsze pomaga. Niespodzianki pojawiają się kilka miesięcy później - gdy dział SEO próbuje ułożyć głęboką strukturę katalogów usług lokalnych albo uruchomić trzy wersje językowe ze zlokalizowanymi adresami URL. Zobacz pełne zestawienie obu platform.</p>',
      tabela: 'glowna',
    },
    {
      id: 'url-kolekcje-hreflang',
      h2: 'Dwie pułapki skalowania SEO w Webflow: płaskie URL-e kolekcji i rachunek za hreflang',
      html: [
        '<p>Pierwsze ograniczenie konstrukcyjne Webflow dotyczy architektury adresów URL w CMS-ie. Dla zwykłych stron statycznych możesz tworzyć foldery, ale każda kolekcja CMS narzuca dwupoziomowy adres <code>domena.pl/nazwa-kolekcji/slug-wpisu</code>. Jeśli firma usługowa chce zbudować logiczny klaster tematyczny typu <code>/uslugi/warszawa/projektowanie-stron</code> oraz <code>/uslugi/krakow/projektowanie-stron</code> oparty na jednej wspólnej kolekcji, natywny routing Webflow na to nie pozwala bez rozbijania bazy na sztuczne kolekcje lub stawiania zewnętrznego serwera proxy (Cloudflare Workers). W WordPressie taki układ permalinków ustawiasz w kilkanaście minut.</p>',
        '<p>Druga różnica to matematyka wielojęzyczności (<code>hreflang</code>). Podstawowy dodatek <strong>Webflow Localization Essential ($9/mies. za każdy język przy płatności rocznej)</strong> tłumaczy treść na stronie, ale <strong>nie pozwala przetłumaczyć samego adresu URL (sluga)</strong> - angielska i niemiecka podstrona dziedziczą polski człon adresu lub angielski wzorzec bazowy. Żeby odblokować zlokalizowane slugi URL (kluczowe dla fraz w Google EN i DE) oraz automatyczny routing, musisz przejść na <strong>Localization Advanced za $29/mies. od każdego dodatkowego języka</strong>:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-webflow-wp',
        caption: 'Porównanie kosztów licencji i wielojęzyczności w horyzoncie 24 miesięcy (1 język vs 3 języki: PL + EN + DE)',
        columns: [
          { key: 'scenariusz', label: 'Konfiguracja platformy' },
          { key: 'licencje24', label: 'Plan bazowy / hosting (24 mies.)' },
          { key: 'wielojezycznosc24', label: 'Dopłata za wielojęzyczność i URL-e (24 mies.)' },
          { key: 'opieka24', label: 'Konsekwencje operacyjne i SEO' },
        ],
        rows: WIERSZE_KOSZT_WEBFLOW_WP,
        przypis: 'Przeliczenie orientacyjne po kursie ok. 4,00 zł/USD i 4,25 zł/EUR według publicznego cennika Webflow (rozliczenie roczne, odczyt 21.11.2026), cennika WPML oraz cennika AI SEO COMPANY.',
      },
    },
    {
      id: 'trzecia-droga-nextjs',
      h2: 'Kiedy wybrać Webflow, kiedy WordPress, a kiedy własny kod bez dopłat za języki',
      html: [
        '<ul>',
        '<li><strong>Wybierz Webflow, jeśli:</strong> masz zespół projektantów lub marketera znającego Webflow Designer, działasz na jednym rynku językowym, serwis liczy do kilkudziesięciu lub kilkuset podstron o prostej strukturze <code>/blog/wpis</code> i chcesz zapomnieć o aktualizacjach PHP.</li>',
        '<li><strong>Wybierz WordPress, jeśli:</strong> budujesz rozbudowany serwis treściowy z wieloma poziomami kategorii, potrzebujesz pełnej przenaszalności bazy danych MySQL między hostingami albo prowadzisz kilka wersji językowych przy niskim budżecie na subskrypcje SaaS.</li>',
        '</ul>',
      ].join(''),
      h3: [
        {
          id: 'alternatywa-nextjs-booster',
          h3: 'Trzecia alternatywa dla firm B2B: dedykowany Next.js w Booster Pack (0 zł dopłat za locale i pełna własność w Git)',
          html: [
            `<p>Wiele firm wybiera Webflow wyłącznie dlatego, że chce uciec od awaryjnych wtyczek WordPressa i zachować wysokie wyniki Core Web Vitals, nie wiedząc, że zamienia wtyczki na zamknięty abonament SaaS bez eksportu dynamicznego CMS-a. W naszym modelu łączymy zalety obu światów: budujemy dedykowaną stronę w <strong>Next.js</strong> na repozytorium <strong>Git / Vercel</strong> należącym do klienta, gdzie dodanie wersji EN, DE czy dowolnego zagnieżdżenia adresów URL kosztuje <strong>0 zł miesięcznej dopłaty licencyjnej</strong>.</p>`,
            `<p>W pakiecie <strong>Booster Pack (${fmt(CENY.boosterPack.pln)} zł netto/mies., umowa na minimum ${CENY.boosterPack.umowaMiesiecy} miesiące)</strong> indywidualnie zaprojektowaną stronę w Next.js otrzymujesz za <strong>0 zł opłaty startowej</strong> razem z serwerem, SSL, pełnym pozycjonowaniem technicznym i treściowym, prowadzeniem Wizytówki Google oraz panelem klienta 24/7.</p>`,
            zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>Porównaj wdrożenie jednorazowe (od ${fmt(CENY.strona.pln)} zł netto) z modelem abonamentowym na stronie ${a(h, 'projektowanie stron internetowych')}.</p>`),
            zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Układ nowej strony głównej dla swojej firmy sprawdzisz od ręki i bez karty w naszym narzędziu: ${a(h, 'darmowa makieta nowej strony z AI')}.</p>`),
            zdanieJesli('/porownania/nextjs-vs-wordpress-seo', (h) => `<p>Dokładne zestawienie techniczne samego frameworka z ekosystemem PHP przeczytasz w artykule ${a(h, 'Next.js vs WordPress pod SEO i AI')}.</p>`),
          ].join(''),
        },
      ],
    },
  ],
  faqTytul: 'Pytania o wybór między Webflow a WordPressem pod SEO',
  faq: [
    {
      question: 'Czy Google faworyzuje strony na Webflow względem WordPressa ze względu na czystszy kod?',
      answer: 'Google nie przyznaje punktów za samą nazwę CMS-a. Przewaga Webflow widoczna w statystykach HTTP Archive wynika z tego, że platforma wymusza globalny CDN i nie pozwala zainstalować dwudziestu konfliktujących wtyczek PHP. Jeżeli strona na WordPressie używa lekkiego motywu i spełnia progi Core Web Vitals (LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1), obie platformy startują w rankingu z tej samej pozycji.',
    },
    {
      question: 'Czy mogę wyeksportować całą stronę z blogiem z Webflow i przenieść ją na własny serwer?',
      answer: 'Tylko częściowo. Funkcja Code Export w płatnych planach Workspace eksportuje statyczne szablony HTML, CSS, JS oraz obrazy, ale nie eksportuje dynamicznego silnika CMS, wyszukiwarki ani obsługi formularzy. Wpisy blogowe i kolekcje musisz pobrać osobno jako plik CSV i zaimportować do nowego systemu (np. WordPress lub Next.js).',
    },
    {
      question: 'Dlaczego tańszy plan Webflow Localization ($9/mies.) nie wystarcza pod zagraniczne SEO?',
      answer: 'Ponieważ plan Essential nie umożliwia tłumaczenia samych końcówek adresów URL (slugów) podstron i elementów kolekcji - zagraniczna wersja zostaje ze słowami kluczowymi z języka bazowego w adresie (np. /en/cennik-pozycjonowania zamiast /en/seo-pricing). Pełna lokalizacja adresów URL wymaga planu Localization Advanced ($29/mies. za każdy dodatkowy język przy rozliczeniu rocznym).',
    },
    {
      question: 'Jak zachować pozycje przy przenosinach między WordPressem a Webflow lub Next.js?',
      answer: 'Kluczowe jest zebranie pełnej listy zaindeksowanych adresów z Google Search Console oraz narzędzia crawlerskiego i zmapowanie każdej zmiany struktury URL przekierowaniem 301 jeden do jednego. Szczególną uwagę trzeba zwrócić na wymuszone prefiksy kolekcji Webflow (np. zmiana /wpis-blogowy/ z WordPressa na /blog/wpis-blogowy w Webflow).',
    },
  ],
  sources: [
    { url: 'https://webflow.com/pricing', nazwa: 'Webflow Pricing: Site Plans & Localization Add-on (Essential vs Advanced)', data: '2026-11-21' },
    { url: 'https://help.webflow.com/hc/en-us/articles/33961266466707-Code-export', nazwa: 'Webflow Help Center: Code export (ograniczenia eksportu kolekcji CMS i formularzy)', data: '2026-11-21' },
    { url: 'https://help.webflow.com/hc/en-us/articles/33961311441555-Intro-to-Webflow-Localization', nazwa: 'Webflow Help Center: Intro to Webflow Localization & localized URLs', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: Content Management Systems (porównanie CrUX CWV między platformami)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Informowanie Google o zlokalizowanych wersjach strony (hreflang)', data: '2026-11-21' },
    { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (udział wtyczek w podatnościach ekosystemu WP)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (CENY: strona od 5 900 zł netto, Booster Pack 2 500 zł netto/mies. min. 3 mies.)',
    'i18n/routing.js (przykład wielojęzycznego routingu PL/EN/DE w Next.js bez opłat per locale)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Szukasz szybkości Webflow bez sztywnych URL-i i dopłat za języki? Zobacz stronę w Next.js w pakiecie Booster Pack',
    plan: 'booster',
    linki: [
      { tekst: 'Sprawdź projektowanie stron w Next.js (0 zł na start w Booster Pack)', href: '/projektowanie-stron-internetowych' },
      { tekst: 'Zobacz darmową makietę nowej strony swojej firmy w 1-3 min', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Porównanie Webflow i WordPress pod kątem SEO' }],
};

// --- P12: Strona kodowana czy kreator WWW pod SEO ------------------------------------------------

const WIERSZE_KOSZT_KOD_KREATOR = [
  {
    id: 'kreator-saas',
    opcja: 'Kreator SaaS (np. Wix, Squarespace) + płatne dodatki',
    start: '0 zł (samodzielne wyklikanie szablonu przez właściciela)',
    miesiecznie: '80 - 320 zł / mies. (abonament platformy + aplikacje formularzy, rezerwacji lub tłumaczeń)',
    wlasnoscPo24m: '0% własności kodu: po zakończeniu subskrypcji strona znika z sieci, a migracja wymaga budowy od zera',
  },
  {
    id: 'kodowana-solo',
    opcja: 'Własna strona kodowana w Next.js (zakup jednorazowy)',
    start: `od ${fmt(CENY.strona.pln)} zł netto`,
    miesiecznie: '0 - 90 zł / mies. za serwer brzegowy / VPS (brak prowizji i dopłat za aplikacje)',
    wlasnoscPo24m: '100% własności repozytorium Git, szablonów, danych strukturalnych i treści u klienta',
  },
  {
    id: 'kodowana-booster',
    opcja: 'Strona kodowana w Next.js w pakiecie Booster Pack (WWW + SEO)',
    start: '0 zł opłaty na wejściu za projekt i kodowanie strony',
    miesiecznie: `${fmt(CENY.boosterPack.pln)} zł netto / mies. (umowa min. ${CENY.boosterPack.umowaMiesiecy} mies.: strona + serwer + pełne SEO + Mapy Google)`,
    wlasnoscPo24m: '100% kont Google od 1. dnia po stronie Twojej firmy oraz stały wzrost ruchu i zapytań bez limitów kreatora',
  },
];

export const P12_KOD_KREATOR = {
  slug: 'strona-kodowana-czy-kreator-seo',
  title: 'Strona kodowana czy kreator WWW? Porównanie pod SEO',
  description: 'Własna strona kodowana (Next.js) czy kreator SaaS (Wix, Squarespace) pod SEO? Własność kodu, INP na telefonie, boty AI i koszty w 24 mies.',
  h1: 'Własna strona kodowana (Next.js) czy kreator WWW (Wix, Squarespace): co wybrać pod SEO i AI w 2026?',
  okruszek: 'Strona kodowana czy kreator WWW',
  nazwaKarty: 'Strona kodowana czy kreator WWW pod SEO',
  teaser: 'Szybki start metodą „przeciągnij i upuść” w abonamencie SaaS kontra własny kod bez limitów platformy. Porównujemy własność kodu, INP na telefonie, HTML dla botów AI i koszt w 24 miesiące.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Własna strona kodowana czy kreator WWW?', skrot: 'Przenaszalność kodu, INP na telefonie, boty AI i skala B2B' },
  tag: 'Porównanie architektury strony WWW pod SEO',
  ujawnienie: `Tworzymy dedykowane strony kodowane w Next.js (osobno od ${fmt(CENY.strona.pln)} zł netto oraz za 0 zł na starcie w pakiecie Booster Pack). Dlatego otwarcie wskazujemy moment, w którym tani kreator SaaS w zupełności wystarczy małej firmie i nie warto jeszcze przepłacać za indywidualne wdrożenie.`,
  zrodlaDanych: `Dane: Google Search Central (Core Web Vitals, JavaScript SEO), HTTP Archive Web Almanac (CMS i CrUX), dokumentacja techniczna Wix i Squarespace (eksport danych, URL-e), dokumentacja crawlerów OpenAI/Anthropic/Perplexity oraz nasz pomiar ai-seo-company.pl (95/100 w ${AUDYT.regul} regułach, 18.11.2026).`,
  answer: 'Współczesne kreatory SaaS (Wix, Squarespace) pozwalają ustawić podstawowe meta tagi, mapę strony i SSL, więc na prostą wizytówkę lokalną o niskiej konkurencji w zupełności wystarczają. Własna strona kodowana (np. w Next.js) wygrywa, gdy firma rośnie: daje 100% własności i przenaszalności kodu, pełną kontrolę nad wagą JS i mobilnym INP <= 200 ms, czysty HTML dla nie-javascriptowych botów AI oraz możliwość wdrażania kalkulatorów i wielu języków bez zamknięcia w cudzym ekosystemie.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-kod-vs-kreator',
  tableCaption: 'Własna strona kodowana (Next.js) a kreator WWW w modelu SaaS (Wix, Squarespace): 8 kryteriów SEO i biznesowych',
  tablePrzypis: 'Źródła: Google Search Central (Core Web Vitals i JavaScript SEO), HTTP Archive Web Almanac (dane CrUX dla platform SaaS), Wix Help Center (Exporting or Embedding Your Wix Site), Squarespace Help Center (Exporting your site), dokumentacja crawlerów OpenAI i Perplexity (odczyt 21.11.2026). Znaki towarowe należą do ich właścicieli.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'kodowana', label: 'Własna strona kodowana (np. Next.js)' },
    { key: 'kreator', label: 'Kreator WWW w modelu SaaS (Wix, Squarespace)' },
  ],
  rows: [
    {
      id: 'wlasnosc-migracja',
      kryterium: 'Własność kodu i przenaszalność strony przy zmianie dostawcy',
      kodowana: 'Pełna własność kodu źródłowego, szablonów i treści w repozytorium Git; zmiana hostingu lub agencji SEO nie wymaga budowania witryny od nowa',
      kreator: 'Brak eksportu kodu źródłowego strony: po przerwaniu opłacania abonamentu witryna przestaje działać, a przejście na inną platformę oznacza ręczne odtworzenie całego projektu (poza częściowym eksportem wpisów CSV/XML)',
    },
    {
      id: 'js-inp-lcp',
      kryterium: 'Waga paczek JavaScript oraz mobilne INP i LCP (75. percentyl CrUX)',
      kodowana: 'Wysyłasz do przeglądarki wyłącznie kod użyty na danej podstronie; komponenty serwerowe ułatwiają utrzymanie INP <= 200 ms i LCP <= 2,5 s na przeciętnych telefonach z Androidem',
      kreator: 'Dostawcy mocno poprawili bazowy SSR i obrazy (ok. 65-75% zaliczeń CWV w HTTP Archive), ale współdzielonego silnika JS kreatora ani ciężkich widżetów ze sklepu aplikacji nie odchudzisz z poziomu kodu',
    },
    {
      id: 'html-boty-ai',
      kryterium: 'Czysty serwerowy HTML dla OAI-SearchBot, PerplexityBot i Claude-SearchBot',
      kodowana: 'Semantyczny, lekki HTML z serwera (<table>, <article>, pełny JSON-LD) oraz swobodna publikacja plików w katalogu głównym domeny (np. /llms.txt, własne nagłówki HTTP i reguły robots.txt)',
      kreator: 'Tekst główny jest renderowany serwerowo, lecz głębokie zagnieżdżenie kontenerów kreatora, widżety aplikacji doczytywane po stronie klienta i brak pełnego dostępu do katalogu głównego ograniczają optymalizację pod AI',
    },
    {
      id: 'narzedzia-programmatic',
      kryterium: 'Dedykowane kalkulatory, narzędzia SEO i programmatic landing pages',
      kodowana: 'Brak barier: własne kalkulatory wycen, darmowe audyty, porównywarki i setki dynamicznych stron lokalnych lub produktowych działają natywnie w tym samym kodzie i arkuszu stylów',
      kreator: 'Ograniczenie do gotowych bloków i sklepu aplikacji (lub osadzania zewnętrznych ramek iframe, które psują CLS i nie budują pełnej wartości semantycznej podstrony w Google)',
    },
    {
      id: 'hreflang-skalowanie',
      kryterium: 'Skalowanie na rynki zagraniczne i pełny hreflang',
      kodowana: 'Pełna kontrola nad przetłumaczonymi ścieżkami URL, kanonicznością, mapami witryn dla każdego języka i znacznikami hreflang + x-default bez abonamentu od liczby słów',
      kreator: 'Wix posiada własny moduł wielojęzyczny, natomiast w Squarespace wielojęzyczność z automatycznym hreflang opiera się standardowo na płatnej integracji Weglot rozliczanej od limitu słów i języków',
    },
    {
      id: 'kontrola-url-schema',
      kryterium: 'Architektura adresów URL, kody HTTP i rozbudowane dane strukturalne',
      kodowana: 'Dowolna hierarchia folderów URL, pełna kontrola nad kodami 301/308/410 oraz ręcznie walidowane grafy JSON-LD (Organization, Service, FAQPage, Product) bez nadmiarowych pól',
      kreator: 'Część typów treści podlega narzuconym prefiksom ścieżek (np. /post/ lub struktury sklepowe), a edycja niestandardowego schema.org i reguł serwerowych podlega ograniczeniom panelu SaaS',
    },
    {
      id: 'czas-edycja',
      kryterium: 'Czas startu od zera i samodzielna edycja metodą drag-and-drop',
      kodowana: 'Wymaga zaprojektowania i zakodowania przez specjalistów (u nas interaktywna makieta AI w 1-3 minuty, makieta docelowa w 7 dni); rozbudowę prowadzi zespół techniczny lub podpięty panel CMS',
      kreator: 'Najszybszy samodzielny start: właściciel firmy bez wiedzy programistycznej może w jeden weekend wyklikać i opublikować estetyczną stronę wizytówkową z gotowego szablonu',
    },
    {
      id: 'koszt-24m',
      kryterium: 'Rachunek ekonomiczny w 24 miesiące (wynajem SaaS vs własny zasób)',
      kodowana: `Jednorazowo od ${fmt(CENY.strona.pln)} zł netto (i groszowy hosting) albo 0 zł opłaty startowej w Booster Pack (${fmt(CENY.boosterPack.pln)} zł netto/mies., min. ${CENY.boosterPack.umowaMiesiecy} mies.) - budujesz trwały majątek firmy`,
      kreator: 'Niski próg wejścia co miesiąc, ale płatne dodatki z App Marketu podnoszą rachunek, a po 24 miesiącach opłat nadal wynajmujesz nieprzenoszalny szablon',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Własna strona kodowana czy kreator WWW: porównanie w 8 punktach',
      html: '<p>Stare powiedzenie sprzed dekady, że „strony z kreatora w ogóle nie indeksują się w Google”, jest dziś nieprawdziwe - zarówno Wix, jak i Squarespace generują poprawny kod HTML dla prostych podstron i osiągają solidne bazowe wyniki w HTTP Archive. Prawdziwa granica przebiega gdzie indziej: dotyczy <strong>własności kodu przy zmianie wykonawcy</strong>, <strong>kontroli nad ciężarem JavaScriptu po dodaniu widżetów</strong> oraz <strong>czytelności dla botów wyszukiwarek AI</strong>. Zobacz szczegółowe porównanie.</p>',
      tabela: 'glowna',
    },
    {
      id: 'boty-ai-inp-wlasnosc',
      h2: 'Dlaczego firmy B2B wyrastają z kreatorów: boty AI bez JS, mobilny INP i koszt migracji',
      html: [
        '<p>W praktyce audytowej widzimy trzy konkretne momenty, w których zamknięty kreator SaaS zaczyna hamować pozyskiwanie klientów z wyszukiwarek:</p>',
        '<ol>',
        '<li><strong>Crawlery AI czytają surowy HTML, a nie ciężkie widżety klienckie:</strong> roboty odpowiadające za cytowania w odpowiedziach AI - takie jak <code>OAI-SearchBot</code>, <code>PerplexityBot</code> i <code>Claude-SearchBot</code> - pobierają dokument HTML z serwera bez uruchamiania rozbudowanych skryptów w przeglądarce. Gdy cennik, tabela porównawcza albo FAQ są ładowane z zewnętrznej aplikacji sklepowej kreatora po stronie klienta, bot AI widzi jedynie szkielet kontenerów. Na własnej stronie w Next.js (nasza domena <code>www.ai-seo-company.pl</code> uzyskała <strong>95/100</strong> i <strong>100/100 w gotowości na AI</strong> w audycie 49 reguł z 18.11.2026) każda tabela i sekcja przychodzi w czystym HTML z serwera, a plik <code>/llms.txt</code> wystawiasz bezpośrednio w katalogu głównym.</li>',
        '<li><strong>Szklany sufit optymalizacji INP i LCP na telefonie:</strong> w kreatorze nie usuniesz nieużywanych modułów z głównego runtime\'u platformy. Wystarczy dołożyć czat, kalendarz rezerwacji, baner cookies i zewnętrzny skrypt analityczny, żeby interaktywność na telefonie (<code>INP</code>) przekroczyła próg 200 ms - a bez dostępu do bundlera nie rozdzielisz ładowania tych skryptów tak precyzyjnie jak w <code>next/script</code> i React Server Components.</li>',
        '<li><strong>Podatek od przeprowadzki przy zmianie skali:</strong> ani Wix, ani Squarespace nie pozwalają pobrać gotowego kodu strony i wgrać go na własny serwer (oficjalna dokumentacja obu platform wprost potwierdza brak pełnego eksportu witryny). Gdy po dwóch latach pozycjonowania zechcesz dobudować nietypowe narzędzie dla klientów albo wyjść na trzy rynki europejskie, musisz sfinansować budowę nowej strony od zera i ręcznie zmapować przekierowania 301 ze starych prefiksów typu <code>/post/</code>.</li>',
        '</ol>',
        zdanieJesli('/narzedzia/checklista-migracji-strony', (h) => `<p>Jeśli już dziś planujesz wyjście z zamkniętego kreatora bez utraty wypracowanych pozycji, pobierz naszą bezpłatną ${a(h, 'checklistę migracji strony z wzorem mapy przekierowań 301')}.</p>`),
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>To, co na Twojej obecnej stronie z kreatora widzą Google PageSpeed oraz boty AI, sprawdzisz bez rejestracji w ${a(h, 'darmowym audycie SEO')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-kreator-kiedy-kod',
      h2: 'Kiedy kreator WWW w zupełności wystarczy, a kiedy opłaca się strona kodowana w Booster Pack',
      html: [
        '<p>Nie każda firma potrzebuje od pierwszego dnia indywidualnej inżynierii frontendowej:</p>',
        '<ul>',
        '<li><strong>Zostań przy kreatorze WWW (Wix, Squarespace), gdy:</strong> testujesz nowy pomysł na usługę przez pierwsze miesiące, prowadzisz jednoosobową działalność lokalną (gabinet, fotograf, mała gastronomia, portfolio) z 5-8 podstronami, nie planujesz rozbudowanego bloga eksperckiego ani wersji obcojęzycznych, a głównym źródłem klientów jest dobrze prowadzona Wizytówka Google w Mapach.</li>',
        '<li><strong>Wybierz stronę kodowaną (Next.js), gdy:</strong> działasz w konkurencyjnej branży B2B lub usługowej, każdy pozyskany klient przynosi od kilku do kilkudziesięciu tysięcy złotych przychodu, planujesz systematyczne pozycjonowanie w Google i AI, chcesz publikować własne narzędzia lub kalkulatory i zależy Ci na tym, by wypracowana strona była 100-procentową własnością Twojej spółki.</li>',
        '</ul>',
        '<p>Najczęstszą barierą przed wyborem strony kodowanej jest jednorazowy wydatek na starcie. Dlatego zestawiliśmy wszystkie trzy modele finansowania w horyzoncie 24 miesięcy:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-kod-kreator',
        caption: 'Porównanie modelu abonamentowego kreatora SaaS z własną stroną kodowaną w Next.js (24 miesiące)',
        columns: [
          { key: 'opcja', label: 'Model budowy strony' },
          { key: 'start', label: 'Wkład na starcie' },
          { key: 'miesiecznie', label: 'Koszt miesięczny' },
          { key: 'wlasnoscPo24m', label: 'Co zostaje w firmie po 24 miesiącach' },
        ],
        rows: WIERSZE_KOSZT_KOD_KREATOR,
        przypis: `Źródła: przedziały cenowe planów biznesowych kreatorów SaaS z płatnymi dodatkami oraz cennik AI SEO COMPANY (strona w Next.js od ${fmt(CENY.strona.pln)} zł netto; pakiet Booster Pack ${fmt(CENY.boosterPack.pln)} zł netto/mies., min. ${CENY.boosterPack.umowaMiesiecy} mies.). Znaki towarowe należą do ich właścicieli.`,
      },
      htmlPo: [
        zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>Dokładny zakres prac projektowych, kodowania w Next.js i pozycjonowania w ramach jednego abonamentu opisujemy na podstronie ${a(h, 'projektowanie stron internetowych dla firm')}.</p>`),
        zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Chcesz najpierw zobaczyć, jak Twoja obecna witryna z kreatora mogłaby wyglądać po przepisaniu na nowoczesny układ? Wpisz jej adres w narzędziu ${a(h, 'makieta nowej strony z AI za darmo')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o strony kodowane i kreatory WWW pod kątem pozycjonowania',
  faq: [
    {
      question: 'Czy Google obniża pozycje strony tylko dlatego, że stoi na Wix lub Squarespace?',
      answer: 'Nie. Algorytmy Google nie karzą domeny za korzystanie z kreatora SaaS, a przedstawiciele Google Search Central wielokrotnie potwierdzali, że małe firmy mogą skutecznie rankować na popularnych kreatorach. Ograniczenia wychodzą na jaw dopiero przy silnej konkurencji: trudniej odchudzić wspólny kod JavaScript pod mobilne Core Web Vitals, zbudować niestandardową architekturę URL-i, wdrożyć własne interaktywne narzędzia czy zachować stronę przy zmianie operatora.',
    },
    {
      question: 'Czy mogę pobrać pliki HTML/CSS swojej strony z Wix albo Squarespace i przenieść je na własny hosting?',
      answer: 'Nie. Zarówno Wix, jak i Squarespace to zamknięte platformy chmurowe (SaaS) - żaden z tych systemów nie udostępnia eksportu działającego kodu źródłowego witryny ani szablonów graficznych. Przy rezygnacji z abonamentu możesz wyeksportować jedynie wybrane dane tekstowe (np. produkty do CSV lub podstawowy plik XML wpisów w Squarespace), a całą warstwę wizualną trzeba zbudować od podstaw.',
    },
    {
      question: 'Ile trwa budowa dedykowanej strony kodowanej w porównaniu z kreatorem?',
      answer: 'Samodzielne wyklikanie prostej wizytówki w kreatorze zajmuje weekend, ale rzadko uwzględnia architekturę słów kluczowych, dane strukturalne i optymalizację konwersji. W naszym pakiecie Booster Pack pierwszą makietę wizualną UX/UI przygotowujemy w 7 dni, a przed rozmową możesz w 1-3 minuty wygenerować wstępną makietę AI na bazie swojej obecnej domeny.',
    },
    {
      question: 'Czy przy stronie kodowanej w Next.js jestem uzależniony od jednej agencji?',
      answer: 'Nie, ponieważ Next.js i React to otwarty standard branżowy (licencja MIT), który zna tysiące programistów frontendowych w Polsce i na świecie. Kod źródłowy w czystym repozytorium Git nie jest przywiązany do zamkniętego panelu jednego dostawcy, a konta Google Search Console, Google Analytics 4 i domena od pierwszego dnia należą bezpośrednio do Twojej firmy.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Wskaźniki Core Web Vitals (progi LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: Podstawy SEO w JavaScripcie', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: Content Management Systems (udział i wyniki CrUX kreatorów SaaS)', data: '2026-11-21' },
    { url: 'https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere', nazwa: 'Wix Help Center: Exporting or Embedding Your Wix Site Elsewhere (brak eksportu kodu witryny)', data: '2026-11-21' },
    { url: 'https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site', nazwa: 'Squarespace Help Center: Exporting your site (zakres i ograniczenia eksportu XML/CSV)', data: '2026-11-21' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (pobieranie HTML przez OAI-SearchBot)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/audytPrzyklad.js (wynik 95/100 i 100/100 w kategorii AI dla www.ai-seo-company.pl na Next.js z 18.11.2026)',
    'lib/narzedziaLiczby.js (CENY: strona od 5 900 zł netto, Booster Pack 2 500 zł netto/mies. min. 3 mies., MAKIETA: 1-3 minuty)',
    'components/Pricing.jsx (parametry pakietu Booster Pack: makieta 7 dni, 0 zł dopłat)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Wyrosłeś z ograniczeń kreatora WWW? Odbierz dedykowaną stronę w Next.js za 0 zł na starcie w pakiecie Booster Pack',
    plan: 'booster',
    linki: [
      { tekst: 'Zobacz projektowanie stron w Next.js i warunki Booster Pack', href: '/projektowanie-stron-internetowych' },
      { tekst: 'Wygeneruj darmową makietę nowej strony w 1-3 minuty', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Strona kodowana a kreator stron WWW pod kątem SEO' }],
};
