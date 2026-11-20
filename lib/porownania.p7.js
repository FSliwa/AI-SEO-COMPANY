// P7-P9: trzy nowe strony porównawcze „VS” oparte w 100% na własnych danych empirycznych i źródłach pierwotnych (19.11.2026):
//   - P7: Ahrefs DR vs Moz DA vs Common Crawl (nasz pomiar korelacji na 441 domenach z Moz Top 500 z 12.11.2026
//         oraz test 4 domen z wynikiem 9 vs DR 0-54 z 11.11.2026; pełne zastrzeżenie o braku powiązania z Ahrefs/Moz/CC)
//   - P8: llms.txt vs robots.txt vs sitemap.xml (nasz test 119 żądań HTTP z 17 User-Agentami z 5.11.2026,
//         analiza Ahrefs 137 000 domen i dokumentacja Google Search Central oraz OpenAI)
//   - P9: Specjalista SEO na etacie (in-house) czy agencja SEO (ustawowy narzut ZUS płatnika ~20,48%, zestawienie NapoleonCat
//         z 11.09.2026 oraz nasz jawny cennik 1 900 / 2 500 zł netto)

import { hrefJesliOpublikowana } from './publikacja';
import { AUTORYTET, GENERATOR } from './narzedziaLiczby';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

function zdanieJesli(href, zdanie) {
  const h = hrefJesliOpublikowana(href);
  return h ? zdanie(h) : '';
}

// --- P7: Ahrefs DR vs Moz DA vs Common Crawl ----------------------------------------------------

export const P7_METRYKI = {
  slug: 'ahrefs-dr-vs-moz-da-vs-common-crawl',
  title: 'Ahrefs DR vs Moz DA vs Common Crawl: porównanie metryk',
  description: 'Ahrefs DR, Moz DA i wynik 0-100 z grafu Common Crawl: dane, wzór, korelacja na 441 domenach i koszty. Tabela z datą aktualizacji.',
  h1: 'Ahrefs Domain Rating (DR) vs Moz Domain Authority (DA) vs Common Crawl: co naprawdę mierzą?',
  okruszek: 'Ahrefs DR vs Moz DA vs Common Crawl',
  nazwaKarty: 'Ahrefs DR vs Moz DA vs Common Crawl',
  teaser: 'Trzy skale od 0 do 100, trzy różne bazy linków i trzy różne wzory. Sprawdziliśmy korelację na 441 domenach i rozjazd wyników na żywych stronach.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Ahrefs DR, Moz DA czy wynik z Common Crawl?', skrot: 'Baza linków, jawność wzoru, koszt i korelacja' },
  tag: 'Porównanie metryk autorytetu domeny',
  ujawnienie: 'Piszemy jako twórcy bezpłatnej sprawdzarki autorytetu 0-100 na publicznym grafie Common Crawl. Nie jesteśmy powiązani z Ahrefs, Moz ani Common Crawl i nie używamy danych Ahrefs ani Moz.',
  zrodlaDanych: `Dane: dokumentacja Ahrefs DR i Moz DA, wydanie Common Crawl ${AUTORYTET.wydanie} (135,0 mln domen, 1,8 mld krawędzi) oraz nasz test korelacji na 441 domenach z Moz Top 500 (12.11.2026).`,
  answer: 'Żadnej z tych metryk nie używa Google w swoim algorytmie. Ahrefs Domain Rating (DR) mierzy siłę profilu linków w komercyjnym indeksie Ahrefs, Moz Domain Authority (DA) to model uczenia maszynowego przewidujący pozycje w SERP, a nasz wynik 0-100 liczy pozycję domeny w otwartym grafie Common Crawl (135 mln domen) jawnym wzorem min(harmonic centrality, PageRank). Liczb z różnych narzędzi nie wolno porównywać wprost.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-dr-da-cc',
  tableCaption: 'Ahrefs DR, Moz DA i wynik z grafu Common Crawl: 8 kryteriów technicznych i kosztowych',
  tablePrzypis: `Źródła: Ahrefs Help („What is Domain Rating”), Moz („What is Domain Authority”), Common Crawl Web Graphs (${AUTORYTET.wydanie}, odczyt 12.11.2026) oraz nasz pomiar własny. Znaki towarowe należą do ich właścicieli.`,
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'dr', label: 'Ahrefs Domain Rating (DR)' },
    { key: 'da', label: 'Moz Domain Authority (DA)' },
    { key: 'cc', label: 'Nasz wynik z Common Crawl (cc-hcpr-v1)' },
  ],
  rows: [
    { id: 'uzywa-google', kryterium: 'Czy Google używa tej liczby w rankingu?', dr: 'Nie (metryka zewnętrzna Ahrefs)', da: 'Nie (metryka zewnętrzna Moz)', cc: 'Nie (metryka zewnętrzna liczona z otwartego grafu)' },
    { id: 'co-mierzy', kryterium: 'Co dokładnie mierzy skala 0-100?', dr: 'Względną siłę profilu linków dofollow prowadzących do domeny', da: 'Model ML przewidujący, jak często domena wygrywa w wynikach wyszukiwania', cc: 'Zakotwiczenie domeny w sieci linków: minimum z percentyla harmonic centrality i PageRank' },
    { id: 'baza', kryterium: 'Źródło danych o linkach', dr: 'Własny komercyjny crawler AhrefsBot', da: 'Własny komercyjny indeks linków Moz (DotBot)', cc: `Publiczny graf domen Common Crawl (${AUTORYTET.wydanie}: 135,0 mln domen, 1,8 mld krawędzi)` },
    { id: 'wzor', kryterium: 'Jawność wzoru obliczeń', dr: 'Opis ogólny (iteracyjny podział siły przez liczbę linków wychodzących); wagi zamknięte', da: 'Zamknięty model uczenia maszynowego (kilkanaście sygnałów, m.in. Linking Root Domains)', cc: '100% otwarty wzór cc-hcpr-v1 opisany publicznie na stronie narzędzia' },
    { id: 'odswiezanie', kryterium: 'Częstotliwość aktualizacji', dr: 'Bieżąca w indeksie chmurowym Ahrefs', da: 'Bieżąca w indeksie Moz', cc: 'Kwartalna razem z nowym wydaniem grafu Common Crawl (3 miesiące crawlu)' },
    { id: 'poziom-url', kryterium: 'Szczegóły pojedynczych linków (anchory, nofollow, podstrony)', dr: 'Tak, w płatnych planach (i dla własnej domeny w AWT)', da: 'Tak, w Link Explorerze Moz', cc: 'Nie - graf domenowy pokazuje siłę domeny i liczbę domen linkujących (.pl) bez atrybutów HTML' },
    { id: 'odpornosc', kryterium: 'Odporność na sztuczne farmy linków', dr: 'Własne filtry spamu Ahrefs; podatny na manipulacje tanimi linkami wielopoziomowymi', da: 'Score Spam Score i model ML redukujący skoki z pojedynczych katalogów', cc: 'Funkcja min(HC, PR): sam skok jednego sygnału z zamkniętego koła linków nie zawyża wyniku' },
    { id: 'koszt', kryterium: 'Koszt szybkiego porównania z 3 konkurentami', dr: 'Darmowy pojedynczy odczyt w Website Authority Checkerze; porównania seryjne w planach płatnych', da: 'Limit darmowych zapytań po założeniu konta Moz', cc: `0 zł, bez konta i bez e-maila (do ${AUTORYTET.limitIp} domen dziennie na IP)` },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Trzy metryki 0-100 w jednej tabeli: DR, DA i Common Crawl',
      html: '<p>Właściciele firm i marketerzy często traktują „autorytet domeny” jak jedną urzędową ocenę strony. W rzeczywistości każdy dostawca liczy własną liczbę na własnym wycinku internetu. Poniższa tabela zestawia różnice konstrukcyjne między Ahrefs DR, Moz DA i naszym otwartym wskaźnikiem <code>cc-hcpr-v1</code>.</p>',
      tabela: 'glowna',
    },
    {
      id: 'nasz-pomiar-441-domen',
      h2: 'Nasz pomiar na 441 domenach z Moz Top 500 i rozjazd na małych stronach',
      html: [
        '<p>12 listopada 2026 zestawiliśmy nasz wskaźnik policzony na wydaniu <code>cc-main-2026-aug-sep-oct</code> z publiczną listą Moz Top 500 (udało się jednoznacznie dopasować <strong>441 domen głównych</strong>). Korelacja rangowa Spearmana pokazała dokładnie, dlaczego tych liczb nie przelicza się jeden do jednego:</p>',
        '<ul>',
        '<li>korelacja naszego wyniku <code>min(HC, PR)</code> z <strong>liczbą domen linkujących według Moz</strong> wyniosła <strong>0,57</strong>;</li>',
        '<li>korelacja naszego wyniku z <strong>Moz Domain Authority (DA)</strong> wyniosła <strong>0,37</strong>;</li>',
        '<li>sam surowy PageRank w grafie Common Crawl osiągnął z Moz DA korelację <strong>0,72</strong>, ale celowo ograniczyliśmy go przez <code>min(harmonic centrality, PageRank)</code>, bo sam PageRank łatwiej nabić wąską grupą wzajemnie linkujących zaplecz.</li>',
        '</ul>',
        '<p>Równie wyraźny rozjazd widać na małych i średnich domenach. 11 listopada 2026 sprawdziliśmy <strong>cztery znane nam domeny usługowe</strong>, które w naszym grafie miały dokładnie <strong>9 punktów</strong> każda. W darmowym checkerze Ahrefs te same cztery domeny miały tego samego dnia DR od <strong>0 do 54</strong>, bo AhrefsBot widzi mniejsze katalogi i podstrony częściej niż kwartalny crawl Common Crawl, a DR nie przycina wyniku drugim sygnałem centralności.</p>',
        zdanieJesli('/narzedzia/autorytet-domeny', (h) => `<p>Własną domenę i do trzech konkurentów w tej samej metodzie sprawdzisz od razu w naszej bezpłatnej ${a(h, 'sprawdzarce autorytetu domeny')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-ktore-narzedzie',
      h2: 'Kiedy patrzeć na DR, kiedy na DA, a kiedy wystarczy otwarty graf',
      html: [
        '<ul>',
        '<li><strong>Szybki, darmowy punkt odniesienia bez konta:</strong> użyj tego samego narzędzia dla swojej domeny i 3 konkurentów z pierwszej dziesiątki Google. Liczy się odstęp między Wami w jednej metodzie, nie sama cyfra.</li>',
        '<li><strong>Audyt pojedynczych linków, anchorów i toksycznych przekierowań:</strong> potrzebujesz pełnego indeksu URL-i (Ahrefs, Semrush, Majestic albo raport Linki w Google Search Console dla własnej witryny).</li>',
        '<li><strong>Ocena portalu przed publikacją artykułu sponsorowanego lub PR:</strong> nigdy nie kupuj publikacji wyłącznie „pod DR 50+”. Sprawdź realny ruch organiczny portalu, widoczność jego artykułów w Google oraz to, czy link zostanie oznaczony zgodnie z zasadami Google (<code>rel="sponsored"</code> dla płatnych emisji).</li>',
        '</ul>',
        zdanieJesli('/link-building', (h) => `<p>Jak oceniamy portale przed pozyskaniem odnośnika w praktyce, opisujemy na stronie usługi ${a(h, 'link building w pakietach SEO')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o Ahrefs DR, Moz DA i Common Crawl',
  faq: [
    {
      question: 'Czy wyższy DR albo DA automatycznie podniesie moje pozycje w Google?',
      answer: 'Nie. Przedstawiciele Google wielokrotnie potwierdzali, że wyszukiwarka nie korzysta z metryk DR ani DA. Sztuczne podbijanie DR tanimi linkami z katalogów lub przekierowań często nie daje ani jednego nowego kliknięcia w Search Console, a może naruszyć zasady Google dotyczące spamu w linkach.',
    },
    {
      question: 'Dlaczego moja strona ma DR 25 w Ahrefs, a w Common Crawl tylko 9 punktów?',
      answer: 'Obie liczby powstają z innych baz i według innej skali. Kwartalny graf Common Crawl obejmuje 135 mln domen, ale widzi węższą próbkę podstron niż komercyjny crawler Ahrefs, a nasz wzór bierze mniejszą z dwóch miar centralności. Porównuj się zawsze z konkurentami wewnątrz jednego narzędzia.',
    },
    {
      question: 'Gdzie sprawdzę prawdziwe linki, które widzi sam Google?',
      answer: 'Dla własnej zweryfikowanej domeny jedynym źródłem z pierwszej ręki jest bezpłatny raport „Linki” w Google Search Console (pokazuje najczęściej linkowane podstrony, domeny odsyłające i teksty kotwic, choć nie wystawia żadnej oceny 0-100).',
    },
    {
      question: 'Czy blokada bota CCBot na mojej stronie obniży mój wynik w Common Crawl?',
      answer: 'Nie. Wynik w grafie domenowym pochodzi z odnośników umieszczonych na innych stronach, które linkują do Twojej domeny. Zablokowanie CCBot we własnym pliku robots.txt nie kasuje linków przychodzących z zewnątrz.',
    },
  ],
  sources: [
    { url: 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr', nazwa: 'Ahrefs Help Center: What is Domain Rating (DR)?', data: '2026-11-12' },
    { url: 'https://moz.com/learn/seo/domain-authority', nazwa: 'Moz: What is Domain Authority (DA)?', data: '2026-11-12' },
    { url: 'https://moz.com/top500', nazwa: 'Moz Top 500 Websites (próba porównawcza 441 dopasowanych domen)', data: '2026-11-12' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: `Common Crawl: Host- and Domain-Level Web Graphs (${AUTORYTET.wydanie})`, data: '2026-11-12' },
    { url: 'https://arxiv.org/abs/1308.2140', nazwa: 'Paolo Boldi, Sebastiano Vigna: Axioms for Centrality (Internet Mathematics, 2014)', data: '2026-11-12' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Zasady dotyczące spamu (spam w linkach i rel="sponsored")', data: '2026-11-19' },
  ],
  zrodlaWewnetrzne: ['components/narzedzia/AutorytetStrona.jsx (kalibracja 441 domen Moz Top 500 z 12.11.2026 i test 4 domen z 11.11.2026)', 'lib/narzedziaLiczby.js (AUTORYTET)'],
  aiQuestions: [],
  cta: {
    tekst: 'Chcesz sprawdzić profil linków i technikę swojej domeny na tle konkurentów z TOP 10?',
    plan: 'audyt',
    linki: [
      { tekst: 'Sprawdź autorytet domeny za darmo (0-100)', href: '/narzedzia/autorytet-domeny' },
      { tekst: 'Zobacz zakres pełnego audytu SEO', href: '/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Metryki autorytetu domeny w SEO' }],
};

// --- P8: llms.txt vs robots.txt vs sitemap.xml --------------------------------------------------

export const P8_PLIKI = {
  slug: 'llms-txt-vs-robots-txt-vs-sitemap-xml',
  title: 'llms.txt vs robots.txt vs sitemap.xml: różnice i role',
  description: 'Czym różnią się llms.txt, robots.txt i sitemap.xml: co blokuje boty AI, co pomaga w indeksacji Google i co pokazał nasz test 17 botów.',
  h1: 'llms.txt vs robots.txt vs sitemap.xml: który plik za co odpowiada w Google i AI?',
  okruszek: 'llms.txt vs robots.txt vs sitemap.xml',
  nazwaKarty: 'llms.txt vs robots.txt vs sitemap.xml',
  teaser: 'Jeden plik steruje dostępem robotów, drugi podaje adresy do indeksacji, a trzeci jest dobrowolnym spisem w Markdown. Zobacz, co naprawdę czytają Google i boty AI.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'llms.txt, robots.txt czy sitemap.xml?', skrot: 'Kontrola botów AI, indeksacja Google i realne wsparcie' },
  tag: 'Porównanie plików technicznych SEO i GEO',
  ujawnienie: 'Udostępniamy darmowy generator llms.txt, dlatego otwarcie piszemy, że sam plik llms.txt nie poprawia pozycji w Google i nie zastępuje robots.txt ani mapy strony.',
  zrodlaDanych: 'Dane: RFC 9309 (robots.txt), sitemaps.org, llmstxt.org (v2), Google Search Central, OpenAI Docs, analiza Ahrefs (137 000 domen) oraz nasz test 119 żądań HTTP (5.11.2026).',
  answer: 'Te trzy pliki pełnią zupełnie różne funkcje i nie zastępują się nawzajem. Plik robots.txt mówi robotom wyszukiwarek i AI, których ścieżek nie wolno pobierać; sitemap.xml zgłasza kanoniczne adresy URL i daty aktualizacji do indeksacji w Google i Bing; natomiast llms.txt to nieobowiązkowa propozycja spisu najważniejszych podstron w formacie Markdown, której wyszukiwarka Google oficjalnie nie używa.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-llms-robots-sitemap',
  tableCaption: 'Porównanie plików robots.txt, sitemap.xml i llms.txt w 8 kryteriach (stan: listopad 2026)',
  tablePrzypis: 'Źródła: RFC 9309, Google Search Central (robots.txt, sitemaps, AI features), OpenAI Crawler Docs, llmstxt.org v2 oraz Ahrefs (analiza 137 000 domen, odczyt 5.11.2026).',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'robots', label: 'robots.txt' },
    { key: 'sitemap', label: 'sitemap.xml' },
    { key: 'llms', label: 'llms.txt' },
  ],
  rows: [
    { id: 'rola', kryterium: 'Główna funkcja techniczna', robots: 'Zezwala lub zabrania botom pobierania wskazanych ścieżek serwisu', sitemap: 'Lista kanonicznych adresów URL przeznaczonych do zaindeksowania z datą modyfikacji', llms: 'Zwięzły spis najważniejszych podstron z opisami dla modeli językowych i asystentów' },
    { id: 'format', kryterium: 'Format i lokalizacja', robots: 'Zwykły tekst (RFC 9309), zawsze w katalogu głównym /robots.txt', sitemap: 'XML (protokół sitemaps.org), np. /sitemap.xml zgłaszany w GSC i BWT', llms: 'Markdown (propozycja v2 z llmstxt.org), /llms.txt lub podkatalog np. /docs/llms.txt' },
    { id: 'google', kryterium: 'Czy wyszukiwarka Google z niego korzysta?', robots: 'Tak - fundament kontroli crawlowania Googlebota i Google-Extended', sitemap: 'Tak - podstawowe źródło odkrywania URL-i i sygnał daty zmian', llms: 'Nie - Google Search Central potwierdza, że wyszukiwarka nie używa llms.txt' },
    { id: 'boty-ai', kryterium: 'Wpływ na ChatGPT, Perplexity i Claude', robots: 'Kluczowy: blokada OAI-SearchBot lub PerplexityBot wyklucza stronę z odpowiedzi wyszukiwania', sitemap: 'Pośredni, ale silny: zasila indeksy Google i Bing (wraz z IndexNow), z których czerpią modele', llms: 'Pomocniczy dla narzędzi programistycznych i agentów; brak potwierdzenia wpływu na ranking w ChatGPT' },
    { id: 'blokowanie', kryterium: 'Czy potrafi zablokować dostęp lub wyindeksować stronę?', robots: 'Blokuje pobieranie przez boty indeksujące/trenujące (do wyindeksowania z Google służy meta noindex)', sitemap: 'Nie blokuje niczego', llms: 'Nie ma żadnej mocy blokowania botów' },
    { id: 'adopcja', kryterium: 'Skala wdrożeń i standard', robots: 'Standard branżowy od 1994 r. (RFC 9309 z 2022 r.)', sitemap: 'Standard wspierany przez Google, Bing i inne wyszukiwarki od 2005 r.', llms: 'Wczesna propozycja: obecna na ok. 28% ze 137 000 zbadanych większych domen (analiza Ahrefs)' },
    { id: 'ryzyko', kryterium: 'Najgroźniejszy błąd wdrożeniowy', robots: 'Przypadkowe Disallow: / albo blokada OAI-SearchBot przy chęci obecności w ChatGPT', sitemap: 'Umieszczanie w mapie stron z błędem 404, przekierowaniem 301 albo tagiem noindex', llms: 'Wierzenie, że samo wgranie llms.txt naprawi zablokowany robots.txt lub brak treści w HTML' },
    { id: 'priorytet', kryterium: 'Kolejność wdrożenia na stronie firmowej', robots: '1. obowiązkowo na starcie', sitemap: '2. obowiązkowo na starcie + zgłoszenie w GSC i Bing Webmaster Tools', llms: '3. opcjonalny dodatek (kilka minut pracy po uporządkowaniu pierwszych dwóch)' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'robots.txt, sitemap.xml i llms.txt: porównanie w 8 punktach',
      html: '<p>Wokół pliku <code>llms.txt</code> narosło wiele mitów - łącznie z twierdzeniem, że to „nowy robots.txt dla sztucznej inteligencji”. Tabela pokazuje stan faktyczny wynikający ze specyfikacji i dokumentacji dostawców wyszukiwarek oraz modeli.</p>',
      tabela: 'glowna',
    },
    {
      id: 'nasz-test-17-botow',
      h2: 'Co pokazał nasz test 119 żądań HTTP dla 17 User-Agentów (5.11.2026)',
      html: [
        '<p>Budując diagnostykę dostępu robotów AI, 5 listopada 2026 przetestowaliśmy na żywo <strong>7 produkcyjnych stron</strong>, wysyłając do każdej zapytania z <strong>17 różnymi nagłówkami User-Agent</strong> (łącznie <strong>119 żądań HTTP</strong>, w tym <code>OAI-SearchBot</code>, <code>GPTBot</code>, <code>ChatGPT-User</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code>, <code>Google-Extended</code> i <code>Bingbot</code>). Dwa wnioski praktyczne są ważniejsze niż sama edycja plików tekstowych:</p>',
        '<ul>',
        '<li><strong>Zapory WAF/CDN potrafią wyciąć boty AI mimo otwartego <code>robots.txt</code>:</strong> niektóre konfiguracje serwerowe przepuszczają zwykłą przeglądarkę i Googlebota, ale zwracają kod <code>403</code> lub stronę z wyzwaniem bezpieczeństwa dla botów AI. Sam odczyt pliku <code>robots.txt</code> tego nie wykryje.</li>',
        '<li><strong>Rozdzielenie treningu od wyszukiwania odbywa się wyłącznie w <code>robots.txt</code>:</strong> w ekosystemie OpenAI możesz zablokować <code>GPTBot</code> (zbieranie danych treningowych) i jednocześnie zostawić otwarty <code>OAI-SearchBot</code> (indeksowanie pod wyszukiwarkę ChatGPT). Plik <code>llms.txt</code> nie obsługuje takich reguł.</li>',
        '</ul>',
        zdanieJesli('/narzedzia/generator-llms-txt', (h) => `<p>Dostęp ${GENERATOR.botowAi} botów AI i Bingbota w swoim <code>robots.txt</code> oraz gotowy szkic pliku Markdown wygenerujesz bez rejestracji w naszym ${a(h, 'darmowym generatorze llms.txt')}.</p>`),
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>Z kolei błędy 404 i przekierowania zaszyte w <code>sitemap.xml</code> automatycznie wyłapuje nasz ${a(h, 'darmowy audyt SEO')}.</p>`),
      ].join(''),
    },
    {
      id: 'jak-skonfigurowac-razem',
      h2: 'Praktyczny zestaw dla firmy usługowej lub B2B w 3 krokach',
      html: [
        '<ol>',
        '<li><strong>Uporządkuj <code>/robots.txt</code>:</strong> zostaw pełny dostęp do stron ofertowych, poradników, obrazów i arkuszy stylów dla <code>Googlebot</code>, <code>Bingbot</code>, <code>OAI-SearchBot</code>, <code>PerplexityBot</code> i <code>Claude-SearchBot</code>; na dole wskaż pełny adres <code>Sitemap: https://twojadomena.pl/sitemap.xml</code>.</li>',
        '<li><strong>Oczyść <code>/sitemap.xml</code>:</strong> zostaw w niej wyłącznie adresy zwracające kod <code>200</code>, z self-referencing canonicalem i bez dyrektywy <code>noindex</code>, a następnie zgłoś mapę w Google Search Console i Bing Webmaster Tools.</li>',
        '<li><strong>Dodaj zwięzły <code>/llms.txt</code> jako uporządkowany spis:</strong> wypisz w nim nazwę firmy, jednozdaniowy opis działalności oraz pogrupowane linki do kluczowych usług, cennika i dokumentacji z krótkim opisem przy każdym łączu.</li>',
        '</ol>',
      ].join(''),
    },
  ],
  faqTytul: 'Najczęstsze pytania o llms.txt, robots.txt i sitemap.xml',
  faq: [
    {
      question: 'Czy mogę wgrać llms.txt zamiast sitemap.xml?',
      answer: 'Nie. Google i Bing używają mapy witryny XML do systematycznego odkrywania podstron i śledzenia dat ich aktualizacji. Zastąpienie sitemap.xml plikiem llms.txt pogorszy odkrywanie nowych podstron w klasycznych wyszukiwarkach, z których korzystają także modele AI.',
    },
    {
      question: 'Co się stanie, jeśli zablokuję bota w robots.txt, ale podam link w llms.txt?',
      answer: 'Bot respektujący standard RFC 9309 (np. OAI-SearchBot czy PerplexityBot) posłucha zakazu z pliku robots.txt i nie pobierze zablokowanej ścieżki. Obecność adresu w pliku llms.txt nie znosi blokady z robots.txt.',
    },
    {
      question: 'Czy robots.txt gwarantuje, że podstrona zniknie z wyników Google?',
      answer: 'Nie. Zablokowanie adresu w robots.txt zabrania jedynie pobrania zawartości strony; jeśli prowadzą do niej inne linki, Google nadal może pokazywać sam adres URL w wynikach. Do pewnego wykluczenia podstrony z indeksu służy znacznik meta robots noindex na stronie dostępnej dla robota.',
    },
    {
      question: 'Czy potrzebuję osobnego pliku llms-full.txt?',
      answer: 'W firmie usługowej lub małym B2B zwykle nie. Zwyczajowy plik llms-full.txt (cała treść dokumentacji w jednym pliku Markdown, spoza głównej specyfikacji llmstxt.org) przydaje się głównie twórcom bibliotek programistycznych i API, których dokumentację czytają edytory kodu.',
    },
  ],
  sources: [
    { url: 'https://www.rfc-editor.org/rfc/rfc9309.html', nazwa: 'IETF RFC 9309: Robots Exclusion Protocol (standard pliku robots.txt)', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', nazwa: 'Google Search Central: Informacje o mapach witryn (sitemap.xml)', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: Funkcje AI a Twoja witryna', data: '2026-11-18' },
    { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file (specyfikacja formatu v2)', data: '2026-11-05' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)', data: '2026-11-05' },
    { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What Is llms.txt? (analiza 137 000 domen i stanowisko Google)', data: '2026-11-05' },
  ],
  zrodlaWewnetrzne: ['components/narzedzia/GeneratorLlmsTxt.jsx (test 119 żądań HTTP z 17 User-Agentami z 5.11.2026)', 'lib/narzedzia.js (FAQ_GENERATORA)'],
  aiQuestions: [],
  cta: {
    tekst: 'Chcesz sprawdzić w minutę swój robots.txt, mapę strony i gotowość witryny na boty AI?',
    plan: 'audyt-ai',
    linki: [
      { tekst: 'Uruchom darmowy generator llms.txt i test botów AI', href: '/narzedzia/generator-llms-txt' },
      { tekst: 'Przeskanuj sitemap.xml i technikę w darmowym audycie SEO', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Pliki techniczne robots.txt, sitemap.xml i llms.txt' }],
};

// --- P9: Specjalista SEO w firmie (in-house) czy agencja SEO ------------------------------------

// Ustawowy narzut składek ZUS po stronie pracodawcy przy umowie o pracę w Polsce (emerytalna 9,76%,
// rentowa 6,50%, wypadkowa standardowa 1,67%, Fundusz Pracy 2,45%, FGŚP 0,10% = 20,48%, bez PPK).
const NARZUT_PRACODAWCY = 1.2048;
const SCENARIUSZE_ETATU = [
  { rola: 'Młodszy / samodzielny specjalista SEO (scenariusz dolny)', brutto: 8000, narzedzia: 900 },
  { rola: 'Doświadczony specjalista SEO (scenariusz środkowy)', brutto: 12000, narzedzia: 1400 },
  { rola: 'Starszy specjalista / SEO Manager (scenariusz górny)', brutto: 16000, narzedzia: 1800 },
];

const wierszeEtatu = SCENARIUSZE_ETATU.map((s, idx) => {
  const kosztPlacy = Math.round(s.brutto * NARZUT_PRACODAWCY);
  const razem = kosztPlacy + s.narzedzia;
  return {
    id: `etat-${idx}`,
    rola: s.rola,
    brutto: `${fmt(s.brutto)} zł`,
    pracodawca: `${fmt(kosztPlacy)} zł`,
    narzedzia: `${fmt(s.narzedzia)} zł`,
    razem: `${fmt(razem)} zł / mies.`,
  };
});

export const P9_INHOUSE = {
  slug: 'seo-w-firmie-czy-agencja-seo',
  title: 'Specjalista SEO na etacie czy agencja SEO? Koszty 2026',
  description: 'In-house SEO czy agencja SEO: pełny koszt etatu z ZUS i narzędziami a abonament 1 900-2 500 zł netto, zastępstwo, kompetencje i konta.',
  h1: 'Specjalista SEO w firmie (in-house) czy agencja SEO: pełny rachunek kosztów i ryzyk',
  okruszek: 'In-house SEO czy agencja',
  nazwaKarty: 'Specjalista SEO w firmie czy agencja SEO',
  teaser: 'Pełny koszt pracodawcy z ZUS i licencjami narzędziowymi na tle stałego abonamentu agencji - oraz kiedy własny etat zaczyna wygrywać.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Specjalista SEO na etacie czy agencja?', skrot: 'Pełny koszt pracodawcy, narzędzia, zespół i próg skali' },
  tag: 'Porównanie modeli organizacji SEO',
  ujawnienie: 'Prowadzimy agencję SEO, dlatego wprost pokazujemy próg skali, powyżej którego własny specjalista in-house w firmie staje się lepszą inwestycją niż zewnętrzny abonament.',
  zrodlaDanych: 'Dane: stawki składek ZUS płatnika (zus.pl, 20,48% narzutu na UoP bez PPK), zestawienie rynkowe NapoleonCat (11.09.2026) oraz nasz cennik pozycjonowania (19.11.2026).',
  answer: 'Dla małej i średniej firmy agencja SEO kosztuje kilkukrotnie mniej niż własny etat, bo w abonamencie 1 900-2 500 zł netto miesięcznie dostajesz technikę, copywriting, link building i opłacone narzędzia bez narzutu ZUS i ryzyka rotacji jednej osoby. Własny specjalista in-house zaczyna wygrywać dopiero w dużych serwisach (duży e-commerce, marketplace, SaaS lub grupa domen), gdzie SEO wymaga 160 godzin pracy wewnątrz produktu co miesiąc.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-inhouse-agencja',
  tableCaption: 'Specjalista SEO w firmie (in-house) a agencja SEO: porównanie w 8 kryteriach',
  tablePrzypis: 'Źródła: zestawienie „Agencja, freelancer czy etat” w artykule NapoleonCat z 11.09.2026, zasady składek ZUS po stronie pracodawcy (zus.pl, odczyt 19.11.2026) oraz cennik AI SEO COMPANY.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'inhouse', label: 'Własny specjalista SEO (in-house)' },
    { key: 'agencja', label: 'Agencja SEO (abonament)' },
  ],
  rows: [
    { id: 'koszt-m', kryterium: 'Miesięczny koszt całkowity dla firmy', inhouse: 'Pensja brutto × ok. 1,2048 (składki pracodawcy na UoP) + płatne narzędzia + budżet na treści i linki', agencja: 'Stała faktura netto: u nas 1 900 zł (SEO Standard) albo 2 500 zł (SEO Premium) z treściami i linkami w cenie' },
    { id: 'narzedzia', kryterium: 'Licencje narzędzi SEO (crawler, baza linków, monitoring)', inhouse: 'Opłacasz osobno po stronie firmy (zwykle kilkaset do blisko 2 000 zł netto/mies.)', agencja: 'Wliczone po stronie agencji; u nas dodatkowo panel klienta 24/7 bez dopłat' },
    { id: 'kompetencje', kryterium: 'Pokrycie kompetencji (kod, treści, PR/linki, AI)', inhouse: 'Jedna osoba rzadko łączy programowanie Next.js/CWV, redakcję tekstów i outreach jednocześnie', agencja: 'Podział ról w zespole: audyt i kod, copywriting z briefem, link building oraz pomiar AI' },
    { id: 'znajomosc', kryterium: 'Znajomość produktu i szybkość komunikacji wewnętrznej', inhouse: 'Bardzo wysoka: obecność na codziennych spotkaniach zespołu produktowego i sprzedaży', agencja: 'Mniejsza niż na etacie - wymaga dobrego briefu na starcie i stałego właściciela kontaktu po stronie klienta' },
    { id: 'czas-startu', kryterium: 'Czas uruchomienia prac', inhouse: 'Rekrutacja i wdrożenie trwają zwykle od 1 do 3 miesięcy', agencja: 'Start w ciągu kilku dni roboczych od podpisania umowy i przekazania dostępów' },
    { id: 'ciaglosc', kryterium: 'Urlop, zwolnienie lekarskie i odejście z pracy', inhouse: 'Odejście jedynego specjalisty zatrzymuje proces na czas nowej rekrutacji', agencja: 'Ciągłość procesu i udokumentowany dziennik prac po stronie zespołu' },
    { id: 'elastycznosc', kryterium: 'Elastyczność kosztowa i wyjście', inhouse: 'Stały koszt etatu i ustawowy okres wypowiedzenia (1-3 miesiące na UoP)', agencja: 'U nas umowa miesięczna (poza Booster Pack: min. 3 mies.); konta Google od pierwszego dnia należą do Ciebie' },
    { id: 'kiedy', kryterium: 'Dla jakiej skali biznesu pasuje najlepiej?', inhouse: 'Duże serwisy (tysiące podstron), zespoły produktowe SaaS i firmy wydające na SEO > 12-15 tys. zł miesięcznie', agencja: 'Firmy usługowe, B2B i lokalne oraz średnie serwisy szukające przewidywalnego kosztu' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'In-house SEO czy agencja SEO: 8 kryteriów decyzyjnych',
      html: '<p>Zatrudnienie specjalisty na wyłączność daje pełną dyspozycyjność 160 godzin w miesiącu, ale oznacza też, że jedna osoba ma jednocześnie pisać teksty, poprawiać Core Web Vitals, zdobywać linki i konfigurować analitykę. Zobacz zestawienie obu modeli.</p>',
      tabela: 'glowna',
    },
    {
      id: 'pelny-koszt-etatu',
      h2: 'Ile naprawdę kosztuje etat SEO w Polsce: symulacja z ZUS i narzędziami',
      html: [
        '<p>Porównując pensję brutto z ogłoszenia o pracę z fakturą od agencji, łatwo pominąć dwa stałe składniki: <strong>ustawowe składki ZUS finansowane przez pracodawcę</strong> przy umowie o pracę (9,76% emerytalna + 6,50% rentowa + 1,67% wypadkowa standardowa + 2,45% Fundusz Pracy + 0,10% FGŚP = <strong>20,48% ponad kwotę brutto</strong>, nie licząc ewentualnych wpłat PPK) oraz <strong>niezbędny pakiet narzędzi</strong> (crawler techniczny, baza słów kluczowych i linków zwrotnych, monitoring pozycji).</p>',
        '<p>Poniższa tabela pokazuje trzy orientacyjne scenariusze budżetowe (to ilustracja matematyczna kosztu pracodawcy, a nie raport płacowy konkretnej firmy):</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-etatu',
        caption: 'Orientacyjny miesięczny koszt stanowiska SEO na umowie o pracę + narzędzia (bez budżetu na zewnętrzne publikacje i copywriting)',
        columns: [
          { key: 'rola', label: 'Scenariusz stanowiska' },
          { key: 'brutto', label: 'Pensja brutto' },
          { key: 'pracodawca', label: 'Koszt płacy z ZUS (× 1,2048)' },
          { key: 'narzedzia', label: 'Pakiet narzędzi SEO (orientacyjnie)' },
          { key: 'razem', label: 'Razem koszt stały / mies.' },
        ],
        rows: wierszeEtatu,
        przypis: 'Obliczenie własne na podstawie ustawowych stóp składek ZUS płatnika (zus.pl, 20,48% bez PPK; przy kontrakcie B2B mnożnik ZUS nie występuje, a strony ustalają kwotę netto na fakturze). Nawet powyżej tego kosztu firma musi jeszcze doliczyć budżet na zewnętrzne publikacje link buildingowe i wsparcie programisty.',
      },
      htmlPo: [
        '<p>Dla porównania nasz pakiet <strong>SEO Standard (1 900 zł netto/mies.)</strong> obejmuje audyt techniczny, do 20 fraz, 2 gotowe treści i 2 linki miesięcznie, a <strong>SEO Premium (2 500 zł netto/mies.)</strong> do 50 fraz, 4 treści, 4 linki oraz cotygodniowy pomiar widoczności w AI. Przy budżecie poniżej 10 000 zł miesięcznie etat pochłania całą kwotę na samo wynagrodzenie, nie zostawiając środków na publikacje zewnętrzne i treści.</p>',
        zdanieJesli('/porownania/agencja-seo-czy-freelancer', (h) => `<p>Trzecią opcją między etatem a agencją jest niezależny wykonawca rozliczany godzinowo - przeliczenie budżetu na godziny znajdziesz w porównaniu ${a(h, 'freelancer SEO czy agencja SEO')}.</p>`),
      ].join(''),
    },
    {
      id: 'model-hybrydowy',
      h2: 'Kiedy wygrywa własny specjalista, a kiedy model hybrydowy',
      html: [
        '<p>Własny etat lub model mieszany (osoba od marketingu wewnątrz firmy + agencja SEO od techniki, linków i pomiaru) sprawdza się najlepiej w trzech sytuacjach:</p>',
        '<ul>',
        '<li><strong>Duży produkt cyfrowy lub wielotysięczny katalog:</strong> zmiany w architekturze URL-i, filtrach i szablonach wchodzą w każdym sprincie deweloperskim i wymagają codziennej obecności na spotkaniach zespołu IT.</li>',
        '<li><strong>Wąska branża regulowana lub inżynieryjna:</strong> merytoryczne artykuły musi pisać lub autoryzować wewnętrzny ekspert, podczas gdy agencja dostarcza mapę klastrów, briefy SEO, dane strukturalne i dystrybucję linków.</li>',
        '<li><strong>Wiele rynków językowych naraz:</strong> koordynacja tłumaczy, wsparcia klienta i oferty w kilku krajach wymaga wewnętrznego właściciela projektu po stronie firmy.</li>',
        '</ul>',
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o wybór między specjalistą SEO w firmie a agencją',
  faq: [
    {
      question: 'Przy jakim budżecie miesięcznym warto zatrudnić własnego specjalistę SEO?',
      answer: 'Zwykle dopiero wtedy, gdy całkowity budżet firmy na organiczny wzrost przekracza 14 000-18 000 zł miesięcznie. Taka kwota pozwala pokryć wynagrodzenie doświadczonej osoby, licencje narzędziowe oraz realny budżet wykonawczy na linki zewnętrzne, treści i prace programistyczne.',
    },
    {
      question: 'Czy można łączyć wewnętrznego marketera z agencją SEO?',
      answer: 'Tak, to często najzdrowszy układ w firmach B2B. Osoba wewnątrz firmy pilnuje wiedzy produktowej, zdjęć z realizacji i szybkiej akceptacji tematów, a agencja odpowiada za audyt techniczny, strategię klastrów, pozyskiwanie linków, monitoring AI i narzędzia.',
    },
    {
      question: 'Jak zabezpieczyć firmę, żeby przy współpracy z agencją cała wiedza i dane zostały u nas?',
      answer: 'Dopilnuj trzech zasad od pierwszego dnia: Google Search Console, Google Analytics 4 i Profil Firmy w Google zakładane są na koncie Twojej firmy (agencja ma dostęp menedżera), publikowane treści przechodzą z majątkowymi prawami autorskimi, a linki nie pochodzą z „wynajmowanych” zaplecz usuwanych po wypowiedzeniu umowy.',
    },
    {
      question: 'Co wybrać na start dla nowej strony firmowej z 15-30 podstronami?',
      answer: 'Zewnętrzny abonament albo jednorazowy audyt z planem treści. Na 20-stronicowym serwisie pełnoetatowy specjalista SEO po uporządkowaniu techniki nie będzie miał pracy na 160 godzin miesięcznie bez dodatkowego budżetu na redakcję i publikacje zewnętrzne.',
    },
  ],
  sources: [
    { url: 'https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne', nazwa: 'Zakład Ubezpieczeń Społecznych (ZUS): wysokość składek na ubezpieczenia społeczne finansowanych przez płatnika', data: '2026-11-19' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: Ile kosztuje zatrudnienie agencji SEO - agencja, freelancer czy etat (11.09.2026)', data: '2026-10-25' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO?', data: '2026-11-05' },
  ],
  zrodlaWewnetrzne: ['components/Pricing.jsx (pakiety SEO Standard 1 900 zł i SEO Premium 2 500 zł netto)', 'lib/porownania.p4.js (stawki NapoleonCat 11.09.2026)'],
  aiQuestions: [],
  cta: {
    tekst: 'Chcesz policzyć na swojej domenie, jaki zakres prac miesięcznie ma realny sens?',
    plan: 'standard',
    linki: [
      { tekst: 'Porównaj pakiety SEO Standard i SEO Premium', href: '/cennik-pozycjonowania' },
      { tekst: 'Pobierz wzór zapytania ofertowego (RFP) dla agencji SEO', href: '/narzedzia/zapytanie-ofertowe-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'In-house SEO a agencja SEO' }],
};
