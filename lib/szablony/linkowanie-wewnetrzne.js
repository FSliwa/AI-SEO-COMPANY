// Plan linkowania wewnętrznego (11.11.2026): /narzedzia/linkowanie-wewnetrzne
// i /en/tools/internal-linking-template. Kontrakt danych: lib/szablony/README.md.
// PDF: public/pliki/plan-linkowania-wewnetrznego.pdf (PL) i internal-linking-template.pdf (EN),
// źródła HTML w scripts/szablony/pdf/. Progi i terminy zgodne z checklistą SEO (A7, B10, B11)
// i playbookiem (4.1, 4.6, 5.2, 5.3). Zdania o zasadach Google pochodzą ze stron w zrodla
// (odczyt 11.11.2026). Adresy w przykładach (firma remontowa) są przykładowe.

const ZRODLA_GOOGLE = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable', nazwa: 'Google Search Central: Link best practices for Google', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO Starter Guide', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: How to specify a canonical URL with rel="canonical" and other methods', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', nazwa: 'Google Search Central: What is a sitemap', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/breadcrumb', nazwa: 'Google Search Central: Breadcrumb (BreadcrumbList) structured data', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links', nazwa: 'Google Search Central: Qualify your outbound links to Google', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/9049606', nazwa: 'Search Console Help: Links report', data: '2026-11-11' },
  // Zdanie o botach AI bez JavaScriptu (sekcja o technice linków): pomiar Vercel z 17.12.2024.
  { url: 'https://vercel.com/blog/the-rise-of-the-ai-crawler', nazwa: 'Vercel: The rise of the AI crawler (December 2024)', data: '2026-11-11' },
];

export default {
  slug: 'linkowanie-wewnetrzne',
  sciezkaEn: '/tools/internal-linking-template',
  plik: 'linkowanie-wewnetrzne',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'linkowanie wewnętrzne', en: 'internal linking strategy' },
  frazyDodatkowe: {
    pl: ['linki wewnętrzne', 'linkowanie wewnętrzne seo', 'linki wewnętrzne seo'],
    en: ['internal linking', 'internal linking audit', 'internal linking template'],
  },
  seo: {
    pl: {
      tytul: 'Linkowanie wewnętrzne: plan i audyt linków (szablon PDF)',
      opis: 'Linkowanie wewnętrzne krok po kroku: mapa klastrów, plan linków z tekstami kotwic, słownik anchorów i audyt stron osieroconych. Darmowy szablon PDF.',
    },
    en: {
      tytul: 'Internal Linking Strategy Template: Free PDF Plan and Audit',
      opis: 'Free internal linking strategy template: map hubs and spokes, plan links with anchor text and run a quarterly internal linking audit for orphan pages.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Plan linkowania wewnętrznego',
    tag: 'Szablon PDF do pobrania',
    h1: 'Linkowanie wewnętrzne: plan i audyt linków w jednym szablonie',
    lead: 'Linkowanie wewnętrzne to odnośniki między podstronami jednej witryny: pomagają Google znaleźć strony i zrozumieć, o czym są, a klientom dojść do oferty. Nasz szablon PDF prowadzi przez priorytety stron, słownik anchorów, mapę klastrów, plan nowych linków i kwartalny audyt stron osieroconych.',
    karta: {
      nazwa: 'Plan linkowania wewnętrznego (PDF)',
      opis: 'Priorytety stron, słownik anchorów, mapa klastrów, plan nowych linków i kwartalny audyt stron osieroconych w jednym szablonie do wypełnienia.',
      cta: 'Pobierz szablon',
    },
    sekcje: [
      {
        id: 'czym-jest-linkowanie-wewnetrzne',
        h2: 'Czym jest linkowanie wewnętrzne i po co je planować',
        html: `<p>Linkowanie wewnętrzne to wszystkie odnośniki, które prowadzą z jednej podstrony Twojej witryny na inną: menu, okruszki, linki w treści, bloki „zobacz też” i stopka. Linki zewnętrzne prowadzą do innych domen, a link building to zdobywanie linków z cudzych stron do Twojej. Linki wewnętrzne masz w pełni pod kontrolą, dlatego to jedna z najtańszych dźwigni SEO na własnej stronie.</p>
<p>Według dokumentacji Google linki wewnętrzne pracują na trzy sposoby. Po pierwsze, Google znajduje strony głównie przez linki z tych, które już odwiedził. Po drugie, używa linków jako sygnału przy ocenie, o czym jest strona, a tekst linku mówi jemu i użytkownikowi, czego się spodziewać po kliknięciu. Po trzecie, każda strona, na której Ci zależy, powinna mieć link z co najmniej jednej innej strony w witrynie. Strona bez takiego linku to strona osierocona: Google znajdzie ją tylko przez mapę witryny albo linki z zewnątrz, a klient zwykle w ogóle do niej nie trafi.</p>
<p>Plan linkowania wewnętrznego porządkuje to, co na większości stron dzieje się przypadkiem. Autor artykułu linkuje do tego, co akurat pamięta, menu rośnie latami, a najważniejsze strony usług mają mniej linków niż stary wpis z bloga. Szablon zamienia to w listę decyzji: które strony są najważniejsze, które strony do nich prowadzą, jakim tekstem i kiedy sprawdzasz, czy nic się nie zepsuło.</p>`,
        tabela: {
          id: 'tabela-rodzaje-linkow',
          caption: 'Rodzaje linków wewnętrznych: co dają i na co uważać',
          columns: [
            { key: 'rodzaj', label: 'Rodzaj linku' },
            { key: 'gdzie', label: 'Gdzie stoi' },
            { key: 'daje', label: 'Co daje' },
            { key: 'uwaga', label: 'Na co uważać' },
          ],
          rows: [
            { rodzaj: 'Menu główne', gdzie: 'Na każdej stronie', daje: 'Drogę do najważniejszych sekcji z każdego miejsca witryny', uwaga: 'Tylko strony, których klienci naprawdę szukają; zbyt rozbudowane menu rozmywa wybór' },
            { rodzaj: 'Okruszki (breadcrumbs)', gdzie: 'Nad treścią', daje: 'Miejsce strony w strukturze i link do strony nadrzędnej', uwaga: 'Google zaleca typową ścieżkę użytkownika, a nie kopię struktury adresu URL' },
            { rodzaj: 'Linki w treści', gdzie: 'W akapitach', daje: 'Najwięcej kontekstu: tekst linku i zdanie wokół niego opisują stronę docelową', uwaga: 'Opisowy tekst linku, bez kilku linków stojących jeden obok drugiego' },
            { rodzaj: 'Bloki „powiązane”', gdzie: 'Pod treścią', daje: 'Połączenia między stronami jednego klastra', uwaga: 'Dobór według tematu, a nie „najnowsze wpisy”' },
            { rodzaj: 'Stopka', gdzie: 'Na każdej stronie', daje: 'Stały dostęp do kontaktu, regulaminów i kluczowych usług', uwaga: 'Nie zastąpi linków w treści; długa lista fraz w stopce nie pomaga klientom' },
          ],
        },
      },
      {
        id: 'co-zawiera-szablon',
        h2: 'Co zawiera szablon planu linkowania wewnętrznego: 8 części',
        html: `<p>Szablon prowadzi od stanu wyjściowego, przez decyzje o priorytetach i konkretne linki, do pomiaru. Każda część odpowiada na jedno pytanie i ma wskazane źródło danych, więc przed wypełnianiem wiesz, co przygotować.</p>`,
        tabela: {
          id: 'tabela-czesci-szablonu',
          caption: '8 części szablonu planu linkowania wewnętrznego',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'pytanie', label: 'Na jakie pytanie odpowiada' },
            { key: 'dane', label: 'Skąd wziąć dane' },
          ],
          rows: [
            { czesc: '1. Stan wyjściowy', pytanie: 'Ile stron ma witryna, ile jest osieroconych, ile linków prowadzi do błędów i przekierowań', dane: 'Crawler, mapa witryny, raport Linki w Search Console, darmowy audyt SEO' },
            { czesc: '2. Priorytety stron', pytanie: 'Które strony mają dostać najwięcej linków', dane: 'Oferta firmy, zdarzenia kluczowe w GA4, Search Console' },
            { czesc: '3. Słownik anchorów', pytanie: 'Który tekst linku należy do której strony', dane: 'Frazy główne stron z części 2' },
            { czesc: '4. Mapa klastrów', pytanie: 'Który hub łączy się z którymi stronami powiązanymi', dane: 'Klastry fraz ze strategii SEO albo content planu' },
            { czesc: '5. Plan nowych linków', pytanie: 'Skąd, dokąd i jakim tekstem linkujesz', dane: 'Części 2, 3 i 4' },
            { czesc: '6. Audyt kwartalny', pytanie: 'Co zepsuło się od ostatniego przeglądu', dane: 'Crawler, Search Console' },
            { czesc: '7. Strony osierocone', pytanie: 'Podlinkować, połączyć, usunąć czy wyłączyć z indeksu', dane: 'Części 1 i 6, Search Console' },
            { czesc: '8. Pomiar efektu i wnioski', pytanie: 'Czy nowe linki pomogły stronom docelowym i co robisz w kolejnym kwartale', dane: 'Raporty Linki i Skuteczność w Search Console' },
          ],
        },
        htmlPo: `<p>Części 1–5 wypełniasz przy pierwszym planie i aktualizujesz, gdy dochodzą nowe strony. Części 6–8 to stały rytm: przegląd co kwartał, a przy dużych zmianach, takich jak nowe menu, migracja czy nowa sekcja bloga, od razu po wdrożeniu. Jeśli masz już <a href="/narzedzia/szablon-strategii-seo">strategię SEO</a> z klastrami fraz, część 4 przepisujesz z niej. Nowe treści z <a href="/narzedzia/content-plan">content planu</a> trafiają do części 5 w dniu publikacji.</p>`,
      },
      {
        id: 'hub-i-strony-powiazane',
        h2: 'Linkowanie wewnętrzne SEO: model huba i stron powiązanych',
        html: `<p>Model, który sprawdza się na stronie firmowej, w sklepie i na blogu, to hub i strony powiązane. Hub to strona, która najpełniej odpowiada na temat i najczęściej sprzedaje: strona usługi, kategoria w sklepie albo przewodnik po temacie. Strony powiązane rozwijają jego części: koszty, porównania, poradniki, realizacje i pytania klientów.</p>
<p>Zasady, które stosujemy u klientów i na własnej stronie:</p>
<ul>
<li><strong>Hub linkuje do każdej strony powiązanej</strong>, a każda strona powiązana linkuje do huba.</li>
<li><strong>Każda nowa treść dostaje link do huba i do 2–4 stron powiązanych</strong> z tego samego klastra, a hub dostaje do niej link zwrotny w dniu publikacji.</li>
<li><strong>Strony biznesowo najważniejsze mają najwięcej linków przychodzących.</strong> Jeśli stary wpis z bloga ma więcej linków niż strona usługi, plan to odwraca.</li>
<li><strong>Ważne strony są najwyżej 3 kliknięcia od strony głównej.</strong> To ten sam próg, którego używa nasza <a href="/narzedzia/checklista-seo">checklista SEO</a> w punkcie B10.</li>
</ul>
<p>Klaster to grupa fraz o tej samej intencji, którą obsługuje jedna podstrona. Dlatego w mapie klastrów każdy hub ma swoją frazę główną, a żadna strona powiązana nie celuje w tę samą frazę. Jeśli dwie strony walczą o jedno zapytanie (kanibalizacja), linki wewnętrzne tego nie naprawią. Najpierw połącz strony, potem planuj linki.</p>`,
        tabela: {
          id: 'tabela-mapa-klastra',
          caption: 'Przykład mapy klastra: firma remontowa z Warszawy (adresy przykładowe)',
          columns: [
            { key: 'strona', label: 'Strona' },
            { key: 'rola', label: 'Rola' },
            { key: 'linkuje', label: 'Linkuje do' },
            { key: 'dostaje', label: 'Dostaje linki z' },
            { key: 'anchor', label: 'Tekst linku do tej strony' },
          ],
          rows: [
            { strona: '/remont-lazienki', rola: 'Hub (strona usługi)', linkuje: 'Każdej strony klastra i kontaktu', dostaje: 'Menu, strona główna, wszystkie strony klastra', anchor: '„remont łazienki w Warszawie”' },
            { strona: '/blog/ile-kosztuje-remont-lazienki', rola: 'Strona powiązana: koszty', linkuje: 'Hub, poradnik o płytkach, realizacja z Mokotowa', dostaje: 'Hub, poradnik o remoncie w bloku', anchor: '„ile kosztuje remont łazienki”' },
            { strona: '/blog/remont-lazienki-w-bloku', rola: 'Strona powiązana: poradnik', linkuje: 'Hub, artykuł o kosztach', dostaje: 'Hub, poradnik o płytkach', anchor: '„remont łazienki w bloku krok po kroku”' },
            { strona: '/blog/jak-wybrac-plytki-do-lazienki', rola: 'Strona powiązana: poradnik', linkuje: 'Hub, poradnik o remoncie w bloku', dostaje: 'Hub, artykuł o kosztach', anchor: '„jak wybrać płytki do łazienki”' },
            { strona: '/realizacje/lazienka-mokotow', rola: 'Strona powiązana: realizacja', linkuje: 'Hub', dostaje: 'Hub, artykuł o kosztach', anchor: '„remont łazienki na Mokotowie: realizacja”' },
          ],
        },
        htmlPo: `<h3>Serie stron z jednego wzoru</h3>
<p>Firmy, które budują wiele stron z jednego wzoru, takich jak strony miast, branż, porównań albo wzorów dokumentów, potrzebują huba, który linkuje do każdej z nich. Bez niego strony serii szybko stają się osierocone: są w mapie witryny, ale nikt nie trafia do nich z menu ani z treści. Minimum to hub z listą stron serii, pogrupowaną tak, jak szuka klient, np. według województw albo kategorii. Każda strona serii linkuje z powrotem do huba i do 2–3 najbliższych stron, np. sąsiednich miast. Linki nie uratują jednak stron, które różnią się tylko nazwą miasta: każda strona serii potrzebuje własnych danych.</p>`,
      },
      {
        id: 'tekst-linku',
        h2: 'Tekst linku (anchor): jak go dobrać',
        html: `<p>Tekst linku, czyli anchor, to słowa, które użytkownik klika. Google pisze, że dobry anchor jest opisowy, w miarę zwięzły i związany ze stroną, na której stoi. Odradza ogólne teksty w rodzaju „kliknij tutaj” i upychanie w linku wszystkich słów kluczowych strony docelowej. Upychanie słów kluczowych narusza zasady Google dotyczące spamu. Liczy się też zdanie wokół linku: słowa przed linkiem i po nim dają dodatkowy kontekst.</p>
<p>W szablonie prowadzisz słownik anchorów (część 3). Dla każdej ważnej strony zapisujesz anchor główny, zwykle bliski jej frazie głównej, i kilka wariantów, które pasują do zdań w różnych tekstach. Jedna zasada jest twarda: ten sam tekst linku nigdy nie prowadzi do dwóch różnych stron. Jeśli „cennik” w jednym artykule prowadzi do cennika usług, a w innym do cennika produktów, ani użytkownik, ani wyszukiwarka nie wiedzą, która strona odpowiada na to hasło.</p>`,
        tabela: {
          id: 'tabela-teksty-linkow',
          caption: 'Przykłady tekstów linku do strony /remont-lazienki',
          columns: [
            { key: 'tekst', label: 'Tekst linku' },
            { key: 'ocena', label: 'Ocena' },
            { key: 'dlaczego', label: 'Dlaczego' },
          ],
          rows: [
            { tekst: '„kliknij tutaj”, „więcej”, „czytaj dalej”', ocena: 'Zły', dlaczego: 'Ogólny: nie mówi, dokąd prowadzi. Google podaje „kliknij tutaj” jako zły przykład' },
            { tekst: '„remont łazienki w Warszawie”', ocena: 'Dobry (anchor główny)', dlaczego: 'Opisowy, zwięzły i zgodny z tematem strony docelowej' },
            { tekst: '„zobacz, jak prowadzimy remont łazienki”', ocena: 'Dobry (wariant)', dlaczego: 'Naturalny w zdaniu i nadal mówi, o czym jest strona' },
            { tekst: '„remont łazienki Warszawa tanio remont łazienek cennik”', ocena: 'Zły', dlaczego: 'Upchane frazy; Google zalicza upychanie słów kluczowych do spamu' },
            { tekst: '„tutaj przeczytasz wszystko o tym, ile kosztuje i jak długo trwa remont łazienki w bloku i w domu”', ocena: 'Zły', dlaczego: 'Za długi; link przestaje być czytelny' },
            { tekst: '„remont łazienki” raz do /remont-lazienki, raz do wpisu na blogu', ocena: 'Zły', dlaczego: 'Jeden anchor, dwie strony docelowe: sprzeczny sygnał' },
          ],
        },
        htmlPo: `<p>Przy linkach z obrazka rolę tekstu linku pełni atrybut alt obrazka. Google używa go jako anchoru, więc nie zostawiaj go pustego. Nie stawiaj też kilku linków jeden obok drugiego: czytelnikowi trudniej je rozróżnić, a każdy z nich traci zdanie, które go opisuje.</p>`,
      },
      {
        id: 'liczba-glebokosc-technika',
        h2: 'Ile linków, gdzie je wstawić i jak, żeby Google je odczytał',
        html: `<h3>Ile linków na stronę</h3>
<p>Nie ma idealnej liczby linków na stronę. Google pisze to wprost i dodaje, że jeśli wydaje Ci się, że linków jest za dużo, to pewnie jest ich za dużo. W praktyce trzymamy się modelu huba: w treści każdego artykułu link do huba i 2–4 linki do stron powiązanych. Ważniejsze od liczby jest to, czy link pomaga czytelnikowi zrobić następny krok.</p>
<h3>Głębokość i nawigacja</h3>
<p>Każda ważna strona powinna być osiągalna najwyżej w 3 kliknięciach od strony głównej. Menu i okruszki dają ścieżkę do każdej sekcji, a linki w treści skracają drogę do stron usług. Okruszki według Google powinny pokazywać typową ścieżkę użytkownika do strony, a nie kopiować strukturę adresu URL. Możesz je oznaczyć danymi strukturalnymi BreadcrumbList.</p>
<h3>Linki, które Google odczyta</h3>
<ul>
<li><strong>Element &lt;a&gt; z atrybutem href.</strong> Google nie wyodrębnia niezawodnie adresów z elementów &lt;a&gt; bez href ani z linków zrobionych przez onclick albo &lt;span&gt;. Linki wstawiane przez JavaScript są w porządku, jeśli powstaje z nich zwykły element &lt;a href&gt;.</li>
<li><strong>Adres kanoniczny w linku.</strong> Google zaleca, żeby w obrębie witryny linkować do adresu kanonicznego, a nie do duplikatu, np. adresu z parametrem. Więcej o tym w poradniku o <a href="/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026">tagu kanonicznym</a>.</li>
<li><strong>Adres docelowy, nie przekierowanie.</strong> Po zmianie adresu popraw link u źródła, tak jak w punkcie A7 checklisty SEO. Przekierowanie zostaw dla linków z zewnątrz i starych zakładek.</li>
<li><strong>Bez rel="nofollow" w linkach do ważnych stron.</strong> Google opisuje ten atrybut przy linkach wychodzących. Gdy robot ma nie pobierać jakiegoś adresu w Twojej witrynie, Google odsyła do reguły disallow w robots.txt.</li>
<li><strong>Najważniejsze linki w HTML z serwera.</strong> Google zwykle renderuje JavaScript, ale część botów AI go nie uruchamia, więc linki z menu i treści warto mieć w kodzie, który wysyła serwer.</li>
</ul>
<p>Mapa witryny nie zastępuje linków. Google pisze, że przy dobrze podlinkowanej stronie zwykle znajdzie większość podstron, a mapa pomaga szczególnie dużym i nowym witrynom. W dużych serwisach trudniej dopilnować, żeby każda strona miała link z innej strony, i właśnie tam najczęściej pojawiają się strony osierocone.</p>`,
      },
      {
        id: 'audyt-linkowania-wewnetrznego',
        h2: 'Audyt linkowania wewnętrznego co kwartał: kryteria',
        html: `<p>Linkowanie wewnętrzne psuje się po cichu: ktoś zmienia adres strony, usuwa wpis, przebudowuje menu albo dodaje filtr, który tworzy setki nowych adresów. Dlatego szablon ma kwartalny przegląd z tymi samymi kryteriami za każdym razem, żeby wyniki dało się porównać.</p>
<p>Potrzebujesz trzech źródeł. Crawler, np. Screaming Frog albo Seobility, przejdzie stronę jak robot i pokaże głębokość, linki do błędów i przekierowań oraz strony z mapy witryny, do których nie prowadzi żaden link. Raport Linki w Search Console pokaże, które strony są najczęściej linkowane w obrębie witryny. To próbka, a tabele mają limit 1000 wierszy, więc traktuj ją jako kontrolę, a nie pełną listę. Szybki test zrobisz w naszym <a href="/narzedzia/audyt-seo">darmowym audycie SEO</a>: sprawdza do 25 podstron i pokazuje zepsute linki wewnętrzne, łańcuchy przekierowań i podstrony z błędem 4xx/5xx.</p>`,
        tabela: {
          id: 'tabela-kryteria-audytu',
          caption: 'Kryteria kwartalnego audytu linkowania wewnętrznego',
          columns: [
            { key: 'kryterium', label: 'Kryterium' },
            { key: 'zasada', label: 'Zasada zaliczenia' },
            { key: 'jak', label: 'Jak sprawdzić' },
          ],
          rows: [
            { kryterium: 'Strony osierocone', zasada: 'Każda ważna strona ma link z co najmniej jednej innej strony', jak: 'Crawler: adresy z mapy witryny, do których nie prowadzi żaden link' },
            { kryterium: 'Głębokość', zasada: 'Ważne strony najwyżej 3 kliknięcia od strony głównej', jak: 'Crawler: raport głębokości (crawl depth)' },
            { kryterium: 'Linki do błędów', zasada: 'Zero linków wewnętrznych do stron 4xx i 5xx', jak: 'Crawler albo darmowy audyt SEO' },
            { kryterium: 'Linki przez przekierowania', zasada: 'Link wskazuje adres docelowy, bez 301 po drodze', jak: 'Crawler; darmowy audyt pokazuje łańcuchy przekierowań' },
            { kryterium: 'Adresy kanoniczne', zasada: 'Linki prowadzą do adresów kanonicznych, nie do duplikatów', jak: 'Crawler: porównaj adres w linku z tagiem canonical strony docelowej' },
            { kryterium: 'Strony najważniejsze', zasada: 'Strony z priorytetem 1 są w czołówce najczęściej linkowanych', jak: 'Raport Linki w Search Console wobec części 2 szablonu' },
            { kryterium: 'Anchory', zasada: 'Opisowe; jeden anchor prowadzi do jednej strony', jak: 'Eksport anchorów z crawlera wobec słownika anchorów' },
            { kryterium: 'Format linków', zasada: 'Element &lt;a href&gt;, bez onclick i &lt;span&gt;', jak: 'Źródło strony albo wyrenderowany HTML w Sprawdzeniu adresu URL' },
            { kryterium: 'Skrajności', zasada: 'Brak ważnych stron z jednym linkiem przychodzącym i stron przeładowanych linkami w treści', jak: 'Crawler: liczba linków przychodzących i wychodzących na stronę' },
            { kryterium: 'nofollow wewnętrzny', zasada: 'Linki do ważnych stron bez rel="nofollow"', jak: 'Crawler: filtr linków wewnętrznych z nofollow' },
          ],
        },
        htmlPo: `<p>Każdy punkt, który nie przechodzi, trafia do części 5 (plan nowych linków) albo 7 (strony osierocone) z adresem, osobą odpowiedzialną i terminem. Pełny audyt techniczny, w którym linkowanie jest jednym z obszarów, opisujemy na stronie <a href="/audyt-seo">audytu SEO</a>. Audyt jest w każdym pakiecie pozycjonowania, a jako osobna usługa kosztuje od 1 490 zł netto.</p>`,
      },
      {
        id: 'strony-osierocone',
        h2: 'Strony osierocone: podlinkować, połączyć czy usunąć',
        html: `<p>Stronę osieroconą znajdziesz, porównując dwie listy: adresy z mapy witryny (albo z eksportu z CMS) i adresy, do których crawler doszedł po linkach. To, co jest tylko w mapie, nie ma linku z żadnej innej strony. Drugi trop to Search Console: strony z wyświetleniami, których crawler nie znalazł, zwykle też są osierocone.</p>
<p>Nie każdą taką stronę warto ratować. Decyzję podejmij według tego, co strona daje dziś i co może dać po podlinkowaniu:</p>`,
        tabela: {
          id: 'tabela-decyzje-osierocone',
          caption: 'Strony osierocone: decyzje',
          columns: [
            { key: 'sytuacja', label: 'Sytuacja' },
            { key: 'decyzja', label: 'Decyzja' },
            { key: 'co', label: 'Co zrobić' },
          ],
          rows: [
            { sytuacja: 'Strona usługi, kategoria albo treść z wyświetleniami lub frazami na pozycjach 4–20', decyzja: 'Podlinkuj', co: 'Link z huba i z 2–4 tematycznie bliskich stron; starą treść przy okazji zaktualizuj' },
            { sytuacja: 'Kilka słabych stron o tym samym temacie', decyzja: 'Połącz', co: 'Zostaw najlepszą, pozostałe przekieruj 301, popraw linki u źródła, stare adresy usuń z mapy witryny' },
            { sytuacja: 'Strona bez ruchu, bez linków z zewnątrz i bez wartości dla firmy', decyzja: 'Usuń', co: 'Kod 410 albo 301 do strony nadrzędnej; usuń adres z mapy witryny' },
            { sytuacja: 'Strona potrzebna ludziom, ale nie w wynikach, np. podziękowanie po formularzu', decyzja: 'Wyłącz z indeksu', co: 'noindex i usunięcie z mapy witryny; link tylko tam, gdzie jest potrzebny' },
          ],
        },
        htmlPo: `<p>Zasada z naszego playbooka: strony osierocone sprawdzamy co kwartał, a każda strona poza indeksem ma tam być z decyzji, a nie przez przypadek. Zapisz decyzję w części 7 szablonu z datą, żeby przy kolejnym przeglądzie nie analizować tych samych adresów od nowa.</p>`,
      },
      {
        id: 'najczestsze-bledy',
        h2: 'Najczęstsze błędy w linkowaniu wewnętrznym',
        html: `<ul>
<li><strong>Najwięcej linków dostają przypadkowe strony.</strong> Najnowsze wpisy albo stary poradnik zbierają linki z całego bloga, a strona usługi ma ich kilka. Na naszym blogu blok powiązanych artykułów pokazywał kiedyś dwa najnowsze wpisy, więc 19 z 20 artykułów linkowało do tych samych dwóch, a poradnik o tagu kanonicznym miał tylko 3 linki z treści. Od 20.10.2026 każdy wpis ma ręcznie dobraną listę artykułów z tego samego tematu.</li>
<li><strong>Ogólne teksty linków</strong>, takie jak „kliknij tutaj”, „więcej” czy „tutaj”.</li>
<li><strong>Ten sam anchor do różnych stron</strong> albo dwie strony, które walczą o tę samą frazę.</li>
<li><strong>Linki do przekierowań i błędów</strong> po zmianie adresów, zwłaszcza po przenosinach strony. Pomoże <a href="/narzedzia/checklista-migracji-strony">checklista migracji strony</a>.</li>
<li><strong>Linki tylko w menu i stopce.</strong> Są potrzebne, ale nie dają kontekstu zdania. Strony usług potrzebują też linków z treści.</li>
<li><strong>Linki, których Google nie odczyta</strong>, np. przyciski na JavaScripcie bez atrybutu href.</li>
<li><strong>Nowa treść bez linków przychodzących.</strong> Artykuł linkuje do huba, ale hub i inne strony klastra nie linkują do artykułu.</li>
<li><strong>Plan zrobiony raz.</strong> Bez kwartalnego audytu linki rozjeżdżają się z nową strukturą strony.</li>
</ul>
<p>Jeśli wolisz, żeby linkowanie wewnętrzne, treści i technikę prowadził zespół, który robi to na co dzień, zobacz nasze <a href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</a>. W ramach stałej obsługi poprawiamy też architekturę linkowania wewnętrznego. O zdobywaniu linków z innych stron piszemy w poradniku <a href="/blog/link-building-b2b-dla-marketerow-strategie-i-checklista">link building B2B</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Plan linkowania wewnętrznego – wzór do wypełnienia (podgląd szablonu)',
      opis: 'Poniżej pełna treść szablonu. Możesz przepisać ją do arkusza albo pobrać PDF z miejscem na wpisy.',
      html: `<h3>Część 1. Stan wyjściowy (data pomiaru: …)</h3>
<table><thead><tr><th>Wskaźnik</th><th>Wartość dziś</th><th>Źródło</th></tr></thead><tbody>
<tr><td>Adresy w mapie witryny</td><td>…</td><td>sitemap.xml</td></tr>
<tr><td>Adresy znalezione po linkach (kod 200, indeksowalne)</td><td>…</td><td>Crawler</td></tr>
<tr><td>Strony osierocone (tylko w mapie witryny)</td><td>…</td><td>Crawler i mapa witryny</td></tr>
<tr><td>Linki wewnętrzne do stron 4xx/5xx</td><td>…</td><td>Crawler albo darmowy audyt SEO</td></tr>
<tr><td>Linki wewnętrzne przez przekierowania</td><td>…</td><td>Crawler (darmowy audyt pokaże łańcuchy przekierowań)</td></tr>
<tr><td>Ważne strony głębiej niż 3 kliknięcia</td><td>…</td><td>Crawler</td></tr>
<tr><td>Strony z priorytetem 1 wśród najczęściej linkowanych</td><td>… z …</td><td>Raport Linki w Search Console</td></tr>
</tbody></table>
<h3>Część 2. Priorytety stron</h3>
<table><thead><tr><th>Adres</th><th>Typ (usługa, kategoria, hub, artykuł)</th><th>Klaster</th><th>Priorytet (1–3)</th><th>Linki przychodzące dziś</th><th>Cel</th><th>Głębokość</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<p>Priorytet 1: strony usług, kategorie i treści, które przynoszą zapytania. Priorytet 2: strony wspierające sprzedaż. Priorytet 3: pozostałe.</p>
<h3>Część 3. Słownik anchorów</h3>
<table><thead><tr><th>Strona docelowa</th><th>Anchor główny</th><th>Dozwolone warianty</th><th>Nie używać (należy do innej strony)</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 4. Mapa klastrów</h3>
<table><thead><tr><th>Klaster i hub</th><th>Strona powiązana</th><th>Hub → strona</th><th>Strona → hub</th><th>Linki do 2–4 stron klastra</th></tr></thead><tbody>
<tr><td>Klaster: … Hub: …</td><td>1. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>2. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>3. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>4. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Część 5. Plan nowych linków</h3>
<table><thead><tr><th>Nr</th><th>Strona źródłowa</th><th>Strona docelowa</th><th>Tekst linku (anchor)</th><th>Miejsce (treść, menu, okruszki, stopka)</th><th>Wdrożone</th><th>Data</th></tr></thead><tbody>
<tr><td>1</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
<tr><td>2</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
<tr><td>3</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
</tbody></table>
<h3>Część 6. Audyt kwartalny (kwartał: …)</h3>
<ul>
<li>☐ Każda ważna strona ma link z co najmniej jednej innej strony (brak stron osieroconych)</li>
<li>☐ Ważne strony najwyżej 3 kliknięcia od strony głównej</li>
<li>☐ Zero linków wewnętrznych do stron 4xx i 5xx</li>
<li>☐ Linki wskazują adres docelowy, bez przekierowań po drodze</li>
<li>☐ Linki prowadzą do adresów kanonicznych</li>
<li>☐ Strony z priorytetem 1 w czołówce najczęściej linkowanych (raport Linki)</li>
<li>☐ Anchory opisowe; jeden anchor = jedna strona docelowa</li>
<li>☐ Linki jako element &lt;a href&gt;, widoczne w HTML</li>
<li>☐ Brak ważnych stron z jednym linkiem przychodzącym i stron przeładowanych linkami</li>
<li>☐ Linki do ważnych stron bez rel="nofollow"</li>
</ul>
<h3>Część 7. Strony osierocone i decyzje</h3>
<table><thead><tr><th>Adres</th><th>Skąd wiemy (mapa witryny, Search Console, CMS)</th><th>Decyzja (podlinkuj, połącz 301, usuń 410, noindex)</th><th>Skąd link albo dokąd 301</th><th>Kto i do kiedy</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 8. Pomiar efektu i wnioski</h3>
<table><thead><tr><th>Strona docelowa</th><th>Data wdrożenia linków</th><th>Linki przychodzące przed / po</th><th>Kliknięcia z Google 28 dni przed / po</th><th>Średnia pozycja przed / po</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>… / …</td><td>… / …</td><td>… / …</td></tr>
<tr><td>…</td><td>…</td><td>… / …</td><td>… / …</td><td>… / …</td></tr>
</tbody></table>
<table><thead><tr><th>Wnioski z przeglądu i zadania na kolejny kwartał</th><th>Kto</th><th>Do kiedy</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Pobierz plan linkowania wewnętrznego (PDF)',
      opis: 'Wyślemy PDF z 8 częściami szablonu: stan wyjściowy, priorytety stron, słownik anchorów, mapa klastrów, plan nowych linków, audyt kwartalny, strony osierocone oraz pomiar i wnioski. Wydrukuj go albo wypełnij w edytorze PDF.',
      etykieta: 'Twój adres e-mail',
      przycisk: 'Wyślij szablon PDF',
      przedmiot: 'plan linkowania wewnętrznego',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do planu linkowania wewnętrznego w PDF przyjdzie w ciągu minuty.',
    },
    faq: [
      {
        question: 'Czym różni się linkowanie wewnętrzne od link buildingu?',
        answer: 'Linkowanie wewnętrzne to odnośniki między podstronami Twojej własnej witryny: menu, okruszki, linki w treści i stopka. Link building to zdobywanie linków z innych domen do Twojej strony. Linki wewnętrzne masz w pełni pod kontrolą i możesz je zmienić w kilka minut. Linki z zewnątrz trzeba zdobyć, ale nie warto ich kierować na strony, do których nie prowadzi żaden link wewnętrzny.',
      },
      {
        question: 'Ile linków wewnętrznych powinna mieć strona?',
        answer: 'Nie ma jednej właściwej liczby. Google pisze wprost, że idealna liczba linków na stronę nie istnieje, a jeśli linków wydaje się za dużo, to pewnie tak jest. Praktyczna zasada: artykuł linkuje do huba swojego tematu i do 2–4 stron powiązanych, a strona usługi dostaje najwięcej linków przychodzących ze wszystkich stron w klastrze. Ważniejsze od liczby są opisowy tekst linku i jego miejsce w zdaniu.',
      },
      {
        question: 'Co to jest strona osierocona i jak ją znaleźć?',
        answer: 'To strona, do której nie prowadzi żaden link z innej strony w witrynie. Google może ją znaleźć tylko przez mapę witryny albo linki z zewnątrz, a użytkownik zwykle w ogóle do niej nie trafi. Znajdziesz ją, porównując adresy z mapy witryny z adresami, które crawler znalazł po linkach. Drugi trop to strony z wyświetleniami w Search Console, których crawler nie znalazł.',
      },
      {
        question: 'Czy linki w menu i stopce wystarczą?',
        answer: 'Zwykle nie. Linki w menu i stopce dają drogę do ważnych stron z każdego miejsca witryny, ale nie mają kontekstu zdania, które opisuje stronę docelową. Google zwraca uwagę, że liczą się też słowa przed linkiem i po nim. Dlatego strony usług i huby tematów powinny dostawać także linki z treści artykułów, realizacji i poradników z tego samego klastra.',
      },
      {
        question: 'Jak często robić audyt linkowania wewnętrznego?',
        answer: 'Co kwartał oraz po każdej większej zmianie: migracji, przebudowie menu, zmianie adresów albo dodaniu nowej sekcji. Przy każdym przeglądzie sprawdzaj te same kryteria, żeby wyniki dało się porównać: strony osierocone, głębokość, linki do błędów i przekierowań, adresy kanoniczne i anchory. Szybki test do 25 podstron zrobisz w darmowym audycie SEO, a pełny przegląd crawlerem.',
      },
      {
        question: 'Czy anchor musi zawierać frazę kluczową strony docelowej?',
        answer: 'Nie musi, ale powinien jasno mówić, o czym jest strona docelowa. Najczęściej anchor główny jest bliski frazie głównej, a warianty pasują do różnych zdań. Unikaj upychania wielu fraz w jednym linku: Google zalicza upychanie słów kluczowych do spamu. Trzymaj się też zasady, że ten sam tekst linku zawsze prowadzi do tej samej strony.',
      },
    ],
    zrodla: ZRODLA_GOOGLE,
    powiazane: [
      { href: '/narzedzia/checklista-seo', tekst: 'Checklista SEO', opis: '50 punktów kontrolnych, w tym linki wewnętrzne (A7, B10, B11)' },
      { href: '/narzedzia/audyt-seo', tekst: 'Darmowy audyt SEO', opis: 'zepsute linki wewnętrzne i łańcuchy przekierowań na 25 podstronach' },
      { href: '/narzedzia/content-plan', tekst: 'Content plan', opis: 'harmonogram nowych treści, które trafiają do planu linków' },
      { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', tekst: 'Tag kanoniczny w praktyce', opis: 'do którego adresu linkować, gdy strona ma duplikaty' },
      { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', tekst: 'Link building B2B', opis: 'jak zdobywać linki z innych stron do stron usług' },
    ],
    kroki: [
      { name: 'Zapisz stan wyjściowy', text: 'Przejdź stronę crawlerem, porównaj wynik z mapą witryny i zapisz liczbę stron osieroconych, linków do błędów i przekierowań oraz stron głębiej niż 3 kliknięcia.' },
      { name: 'Wybierz strony priorytetowe', text: 'Wpisz strony usług, kategorie i treści, które przynoszą zapytania, i nadaj im priorytet od 1 do 3. Zapisz, ile linków przychodzących mają dziś.' },
      { name: 'Uzupełnij słownik anchorów', text: 'Każdej stronie z części 2 przypisz anchor główny i warianty. Ten sam tekst linku nie może prowadzić do dwóch różnych stron.' },
      { name: 'Narysuj mapę klastrów', text: 'Dla każdego tematu wpisz hub i jego strony powiązane. Zaznacz, których linków brakuje: z huba do strony, ze strony do huba i między stronami klastra.' },
      { name: 'Rozpisz plan nowych linków', text: 'Dla każdego brakującego linku wpisz stronę źródłową, docelową, tekst linku ze słownika i miejsce. Zacznij od linków do stron z priorytetem 1.' },
      { name: 'Wdróż linki i zmierz efekt', text: 'Zaznacz wdrożone linki z datą. Porównaj w Search Console 28 dni przed wdrożeniem z 28 dniami po ponownym odwiedzeniu stron przez Google.' },
      { name: 'Powtarzaj audyt co kwartał', text: 'Sprawdź te same kryteria w części 6 i zdecyduj o stronach osieroconych w części 7: podlinkować, połączyć, usunąć albo wyłączyć z indeksu.' },
    ],
    plikNazwa: 'Plan linkowania wewnętrznego: szablon i audyt (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'Internal linking template',
    tag: 'Free PDF template',
    h1: 'Internal linking strategy template: plan and audit your internal links',
    lead: 'An internal linking strategy decides which pages on your site link to which, and with what anchor text, so Google can find and understand your pages and visitors can reach your services. This free template walks you through page priorities, an anchor text register, a hub-and-spoke map, a link plan and a quarterly audit for orphan pages.',
    karta: {
      nazwa: 'Internal linking template (PDF)',
      opis: 'Page priorities, an anchor text register, a hub-and-spoke map, a link plan and a quarterly orphan page audit in one fill-in template.',
      cta: 'Get the template',
    },
    sekcje: [
      {
        id: 'what-is-internal-linking',
        h2: 'What internal linking is and why it needs a plan',
        html: `<p>Internal linking covers every link that takes a visitor from one page of your site to another: the main menu, breadcrumbs, links in the body copy, “related” blocks and the footer. External links point to other domains, and link building means earning links from other sites to yours. Internal links are fully under your control, which makes them one of the cheapest SEO levers you have.</p>
<p>Google’s documentation describes three ways internal links work. First, Google finds pages mainly through links from pages it has already crawled. Second, it uses links as a signal of what a page is about, and the anchor text tells both Google and the reader what to expect after the click. Third, every page you care about should have a link from at least one other page on your site. A page without one is an orphan page: Google can only find it through your sitemap or external links, and visitors usually never reach it.</p>
<p>An internal linking strategy fixes what happens by accident on most sites. Authors link to whatever they remember, the menu grows for years, and the most important service pages end up with fewer links than an old blog post. The template turns that into a list of decisions: which pages matter most, which pages link to them, with what anchor text, and when you check that nothing has broken.</p>`,
        tabela: {
          id: 'table-link-types',
          caption: 'Types of internal links: what they do and what to watch',
          columns: [
            { key: 'type', label: 'Link type' },
            { key: 'where', label: 'Where it sits' },
            { key: 'does', label: 'What it does' },
            { key: 'watch', label: 'What to watch' },
          ],
          rows: [
            { type: 'Main menu', where: 'On every page', does: 'A path to the key sections from anywhere on the site', watch: 'Only pages customers actually look for; an overloaded menu dilutes the choice' },
            { type: 'Breadcrumbs', where: 'Above the content', does: 'Shows where the page sits and links to its parent page', watch: 'Google recommends a typical user path rather than a copy of the URL structure' },
            { type: 'In-content links', where: 'In paragraphs', does: 'The most context: the anchor text and its sentence describe the target page', watch: 'Descriptive anchor text, no links chained next to each other' },
            { type: '“Related” blocks', where: 'Below the content', does: 'Connects pages within one cluster', watch: 'Pick by topic, not “latest posts”' },
            { type: 'Footer', where: 'On every page', does: 'Constant access to contact, legal pages and key services', watch: 'It doesn’t replace in-content links; a long keyword list in the footer doesn’t help customers' },
          ],
        },
      },
      {
        id: 'whats-inside',
        h2: 'What is inside this internal linking template: 8 parts',
        html: `<p>The template takes you from a baseline, through decisions about priorities and specific links, to measurement. Each part answers one question and lists where the data comes from, so you know what to pull together before you start.</p>`,
        tabela: {
          id: 'table-template-parts',
          caption: 'The 8 parts of the internal linking template',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'question', label: 'Question it answers' },
            { key: 'data', label: 'Where the data comes from' },
          ],
          rows: [
            { part: '1. Baseline', question: 'How many pages the site has, how many are orphans, how many links point to errors and redirects', data: 'A crawler, your XML sitemap, the Links report in Search Console, the free SEO audit' },
            { part: '2. Page priorities', question: 'Which pages should get the most links', data: 'Your offer, key events in GA4, Search Console' },
            { part: '3. Anchor text register', question: 'Which anchor text belongs to which page', data: 'The primary keyword of each page in part 2' },
            { part: '4. Hub-and-spoke map', question: 'Which hub connects to which spoke pages', data: 'Keyword clusters from your SEO strategy or content calendar' },
            { part: '5. Link plan', question: 'From where, to where and with what anchor text you link', data: 'Parts 2, 3 and 4' },
            { part: '6. Quarterly audit', question: 'What has broken since the last review', data: 'A crawler, Search Console' },
            { part: '7. Orphan pages', question: 'Link it, merge it, remove it or keep it out of the index', data: 'Parts 1 and 6, Search Console' },
            { part: '8. Results and next steps', question: 'Did the new links help the target pages, and what comes next quarter', data: 'The Links and Performance reports in Search Console' },
          ],
        },
        htmlPo: `<p>You fill in parts 1 to 5 when you build the first plan and update them as new pages appear. Parts 6 to 8 are the ongoing rhythm: a review every quarter, and straight after any big change such as a new menu, a migration or a new blog section. If you already have an <a href="/en/tools/seo-strategy-template">SEO strategy</a> with keyword clusters, copy part 4 from it. New pieces from your <a href="/en/tools/content-calendar-template">content calendar</a> go into part 5 on the day they are published.</p>`,
      },
      {
        id: 'hub-and-spoke',
        h2: 'Internal linking strategy: the hub-and-spoke model',
        html: `<p>The model that works for a company website, an online store and a blog alike is hub and spokes. The hub is the page that covers the topic most fully and sells most often: a service page, a store category or a topic guide. Spoke pages expand on its parts: costs, comparisons, how-to guides, case studies and customer questions.</p>
<p>The rules we apply for clients and on our own site:</p>
<ul>
<li><strong>The hub links to every spoke</strong>, and every spoke links back to the hub.</li>
<li><strong>Every new piece links to its hub and to 2–4 related spokes</strong> in the same cluster, and the hub gets a link to the new piece on the day it goes live.</li>
<li><strong>Your most important business pages get the most internal links.</strong> If an old blog post has more links than a service page, the plan reverses that.</li>
<li><strong>Key pages sit no more than 3 clicks from the homepage.</strong> It’s the same threshold our <a href="/en/tools/seo-checklist">SEO checklist</a> uses in check B10.</li>
</ul>
<p>A cluster is a group of keywords with the same intent, served by one page. That is why every hub in the map has its own primary keyword and no spoke targets the same one. If two pages compete for one query (keyword cannibalization), internal links won’t fix it. Merge the pages first, then plan the links.</p>`,
        tabela: {
          id: 'table-cluster-map',
          caption: 'Example cluster map: a renovation company in Warsaw (example URLs)',
          columns: [
            { key: 'page', label: 'Page' },
            { key: 'role', label: 'Role' },
            { key: 'linksTo', label: 'Links to' },
            { key: 'linkedFrom', label: 'Gets links from' },
            { key: 'anchor', label: 'Anchor text for this page' },
          ],
          rows: [
            { page: '/bathroom-renovation', role: 'Hub (service page)', linksTo: 'Every page in the cluster and the contact page', linkedFrom: 'Menu, homepage, every page in the cluster', anchor: '“bathroom renovation in Warsaw”' },
            { page: '/blog/bathroom-renovation-cost', role: 'Spoke: costs', linksTo: 'Hub, tile guide, Mokotów case study', linkedFrom: 'Hub, apartment renovation guide', anchor: '“how much a bathroom renovation costs”' },
            { page: '/blog/apartment-bathroom-renovation', role: 'Spoke: how-to guide', linksTo: 'Hub, cost article', linkedFrom: 'Hub, tile guide', anchor: '“renovating a bathroom in an apartment block, step by step”' },
            { page: '/blog/how-to-choose-bathroom-tiles', role: 'Spoke: how-to guide', linksTo: 'Hub, apartment renovation guide', linkedFrom: 'Hub, cost article', anchor: '“how to choose bathroom tiles”' },
            { page: '/projects/bathroom-mokotow', role: 'Spoke: case study', linksTo: 'Hub', linkedFrom: 'Hub, cost article', anchor: '“bathroom renovation in Mokotów: case study”' },
          ],
        },
        htmlPo: `<h3>Page series built from one template</h3>
<p>Businesses that build many pages from one template, such as city pages, industry pages, comparisons or document templates, need a hub that links to every one of them. Without it, series pages quickly become orphans: they are in the sitemap, but nobody reaches them from the menu or the content. The minimum is a hub that lists the series, grouped the way customers search, for example by region or category. Each series page links back to the hub and to its 2–3 nearest neighbours, such as nearby cities. Links won’t rescue pages that differ only by the city name, though: every page in a series needs its own data.</p>`,
      },
      {
        id: 'anchor-text',
        h2: 'Anchor text: how to choose it',
        html: `<p>Anchor text is the clickable text of a link. Google says good anchor text is descriptive, reasonably concise and relevant to the page it sits on. It warns against generic text such as “click here” and against cramming every keyword related to the target page into the link. Keyword stuffing violates Google’s spam policies. The sentence around the link matters too: the words before and after it add context.</p>
<p>In the template you keep an anchor text register (part 3). For each important page, note a primary anchor, usually close to its primary keyword, and a few variants that fit naturally into different sentences. One rule is strict: the same anchor text never points to two different pages. If “pricing” leads to your service prices in one article and to product prices in another, neither readers nor search engines can tell which page answers that term.</p>`,
        tabela: {
          id: 'table-anchor-examples',
          caption: 'Anchor text examples for the /bathroom-renovation page',
          columns: [
            { key: 'text', label: 'Anchor text' },
            { key: 'verdict', label: 'Verdict' },
            { key: 'why', label: 'Why' },
          ],
          rows: [
            { text: '“click here”, “more”, “read more”', verdict: 'Bad', why: 'Generic: it doesn’t say where the link goes. Google lists “click here” as a bad example' },
            { text: '“bathroom renovation in Warsaw”', verdict: 'Good (primary anchor)', why: 'Descriptive, concise and on topic for the target page' },
            { text: '“see how we run a bathroom renovation”', verdict: 'Good (variant)', why: 'Reads naturally in a sentence and still says what the page is about' },
            { text: '“bathroom renovation Warsaw cheap bathroom renovations prices”', verdict: 'Bad', why: 'Stuffed keywords; Google counts keyword stuffing as spam' },
            { text: '“here you can read everything about how much a bathroom renovation in a flat or a house costs and how long it takes”', verdict: 'Bad', why: 'Too long; the link stops being readable' },
            { text: '“bathroom renovation” pointing once to /bathroom-renovation and once to a blog post', verdict: 'Bad', why: 'One anchor, two targets: a conflicting signal' },
          ],
        },
        htmlPo: `<p>For image links, the image’s alt attribute works as the anchor text. Google uses it that way, so don’t leave it empty. Also avoid chaining links next to each other: readers find them harder to tell apart, and each link loses the sentence that describes it.</p>`,
      },
      {
        id: 'number-depth-technical',
        h2: 'How many links, where to place them and how to make sure Google can read them',
        html: `<h3>How many links per page</h3>
<p>There is no ideal number of links per page. Google says so directly, and adds that if you think there are too many, there probably are. In practice we follow the hub-and-spoke model: in the body of every article, a link to the hub and 2–4 links to related spokes. What matters more than the count is whether the link helps the reader take the next step.</p>
<h3>Click depth and navigation</h3>
<p>Every important page should be reachable within 3 clicks of the homepage. The menu and breadcrumbs provide a path to each section, and in-content links shorten the way to your service pages. Google recommends that breadcrumbs reflect a typical user path to the page rather than mirror the URL structure. You can mark them up with BreadcrumbList structured data.</p>
<h3>Links Google can read</h3>
<ul>
<li><strong>An &lt;a&gt; element with an href attribute.</strong> Google can’t reliably extract URLs from &lt;a&gt; elements without href, or from links built with onclick or &lt;span&gt;. Links inserted with JavaScript are fine as long as they end up as a regular &lt;a href&gt; element.</li>
<li><strong>The canonical URL in the link.</strong> Google recommends linking to the canonical URL within your site rather than to a duplicate, such as a URL with a parameter. Our <a href="/en/blog/canonical-tag-seo-guide-2026">canonical tag guide</a> covers this in detail.</li>
<li><strong>The final URL, not a redirect.</strong> When a URL changes, fix the link at the source, as in check A7 of the SEO checklist. Keep the redirect for external links and old bookmarks.</li>
<li><strong>No rel="nofollow" on links to important pages.</strong> Google describes this attribute in the context of outbound links. When you don’t want Google to fetch a URL on your own site, it points you to a disallow rule in robots.txt instead.</li>
<li><strong>Key links in the HTML your server sends.</strong> Google usually renders JavaScript, but some AI bots don’t run it, so keep menu and in-content links in the server-sent HTML.</li>
</ul>
<p>An XML sitemap doesn’t replace links. Google says that if your pages are properly linked, it can usually discover most of your site, and that a sitemap helps most on large and new sites. On large sites it is harder to make sure every page is linked from at least one other page, and that is exactly where orphan pages tend to appear.</p>`,
      },
      {
        id: 'internal-linking-audit',
        h2: 'Quarterly internal linking audit: criteria',
        html: `<p>Internal linking breaks quietly: someone changes a URL, deletes a post, rebuilds the menu or adds a filter that creates hundreds of new URLs. That is why the template includes a quarterly internal linking audit with the same criteria every time, so you can compare the results.</p>
<p>You need three sources. A crawler such as Screaming Frog or Seobility walks your site like a search bot and shows click depth, links to errors and redirects, and sitemap URLs that no link points to. The Links report in Search Console shows which pages are linked most often within your site. It is a sample, and its tables are limited to 1,000 rows, so treat it as a cross-check rather than a complete list. For a quick check, our <a href="/en/tools/free-seo-audit">free SEO audit</a> covers up to 25 pages and flags broken internal links, redirect chains and pages returning 4xx/5xx errors.</p>`,
        tabela: {
          id: 'table-audit-criteria',
          caption: 'Quarterly internal linking audit criteria',
          columns: [
            { key: 'criterion', label: 'Criterion' },
            { key: 'pass', label: 'Pass rule' },
            { key: 'how', label: 'How to check' },
          ],
          rows: [
            { criterion: 'Orphan pages', pass: 'Every important page has a link from at least one other page', how: 'Crawler: sitemap URLs that no link points to' },
            { criterion: 'Click depth', pass: 'Important pages within 3 clicks of the homepage', how: 'Crawler: crawl depth report' },
            { criterion: 'Links to errors', pass: 'Zero internal links to 4xx and 5xx pages', how: 'Crawler or the free SEO audit' },
            { criterion: 'Links through redirects', pass: 'Links point to the final URL, with no 301 on the way', how: 'Crawler; the free audit flags redirect chains' },
            { criterion: 'Canonical URLs', pass: 'Links point to canonical URLs, not duplicates', how: 'Crawler: compare the linked URL with the target’s canonical tag' },
            { criterion: 'Priority pages', pass: 'Priority 1 pages are among the most linked pages', how: 'Links report in Search Console against part 2 of the template' },
            { criterion: 'Anchor text', pass: 'Descriptive; one anchor points to one page', how: 'Anchor export from the crawler against the anchor text register' },
            { criterion: 'Link format', pass: 'An &lt;a href&gt; element, no onclick or &lt;span&gt; links', how: 'Page source, or the rendered HTML in URL Inspection' },
            { criterion: 'Extremes', pass: 'No important pages with a single incoming link, no pages overloaded with in-content links', how: 'Crawler: incoming and outgoing links per page' },
            { criterion: 'Internal nofollow', pass: 'Links to important pages without rel="nofollow"', how: 'Crawler: filter internal links with nofollow' },
          ],
        },
        htmlPo: `<p>Every check that fails goes into part 5 (link plan) or part 7 (orphan pages) with a URL, an owner and a due date. We describe a full technical audit, with internal linking as one of its areas, on our <a href="/en/seo-audit">SEO audit</a> page. The audit is included in every SEO plan, and as a standalone service it starts at €350 net.</p>`,
      },
      {
        id: 'orphan-pages',
        h2: 'Orphan pages: link them, merge them or remove them',
        html: `<p>To find orphan pages, compare two lists: the URLs in your XML sitemap (or a CMS export) and the URLs a crawler reached by following links. Anything that appears only in the sitemap has no link from any other page. The second clue is Search Console: pages with impressions that the crawler didn’t find are usually orphans too.</p>
<p>Not every orphan is worth saving. Decide based on what the page delivers today and what it could deliver once it is linked:</p>`,
        tabela: {
          id: 'table-orphan-decisions',
          caption: 'Orphan pages: decisions',
          columns: [
            { key: 'situation', label: 'Situation' },
            { key: 'decision', label: 'Decision' },
            { key: 'action', label: 'What to do' },
          ],
          rows: [
            { situation: 'A service page, category or article with impressions or keywords in positions 4–20', decision: 'Link it', action: 'Add a link from the hub and from 2–4 closely related pages; refresh old content while you are at it' },
            { situation: 'Several weak pages on the same topic', decision: 'Merge', action: 'Keep the best one, 301 the rest, fix links at the source and remove old URLs from the sitemap' },
            { situation: 'A page with no traffic, no external links and no business value', decision: 'Remove', action: 'Return 410 or 301 to the parent page; remove the URL from the sitemap' },
            { situation: 'A page people need but search results don’t, such as a form thank-you page', decision: 'Keep out of the index', action: 'Add noindex and remove it from the sitemap; link to it only where needed' },
          ],
        },
        htmlPo: `<p>A rule from our playbook: we check for orphan pages every quarter, and every page kept out of the index is there by decision, not by accident. Record the decision in part 7 of the template with a date, so the next review doesn’t analyse the same URLs from scratch.</p>`,
      },
      {
        id: 'common-mistakes',
        h2: 'Common internal linking mistakes',
        html: `<ul>
<li><strong>Random pages get the most links.</strong> The latest posts or an old guide collect links from across the blog, while the service page has a handful. On our own blog, the related-articles block once showed the two newest posts, so 19 of 20 articles linked to the same two, and our canonical tag guide had only 3 in-content links. Since 20 October 2026, every post has a hand-picked list of articles on the same topic.</li>
<li><strong>Generic anchor text</strong> such as “click here”, “more” or “here”.</li>
<li><strong>The same anchor pointing to different pages</strong>, or two pages competing for the same keyword.</li>
<li><strong>Links to redirects and errors</strong> after URL changes, especially after a site move. Our <a href="/en/tools/website-migration-checklist">website migration checklist</a> helps here.</li>
<li><strong>Links only in the menu and footer.</strong> They are needed, but they carry no sentence context. Service pages also need links from the body copy.</li>
<li><strong>Links Google can’t read</strong>, such as JavaScript buttons without an href attribute.</li>
<li><strong>New content with no incoming links.</strong> The article links to the hub, but neither the hub nor other cluster pages link back to it.</li>
<li><strong>A plan made once.</strong> Without a quarterly audit, links drift away from the site’s new structure.</li>
</ul>
<p>If you would rather have a team that does this every day handle internal linking, content and technical SEO, see our <a href="/en/seo-services">SEO services</a>. As part of ongoing work, we also improve internal linking architecture. For earning links from other sites, read our <a href="/en/blog/b2b-link-building-strategies-checklist">B2B link building guide</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Internal linking template: what you fill in (preview)',
      opis: 'Below is the full content of the template. You can copy it into a spreadsheet or download the PDF with space to write.',
      html: `<h3>Part 1. Baseline (date measured: …)</h3>
<table><thead><tr><th>Metric</th><th>Value today</th><th>Source</th></tr></thead><tbody>
<tr><td>URLs in the XML sitemap</td><td>…</td><td>sitemap.xml</td></tr>
<tr><td>URLs found by following links (200, indexable)</td><td>…</td><td>Crawler</td></tr>
<tr><td>Orphan pages (sitemap only)</td><td>…</td><td>Crawler and sitemap</td></tr>
<tr><td>Internal links to 4xx/5xx pages</td><td>…</td><td>Crawler or the free SEO audit</td></tr>
<tr><td>Internal links through redirects</td><td>…</td><td>Crawler (the free audit flags redirect chains)</td></tr>
<tr><td>Important pages deeper than 3 clicks</td><td>…</td><td>Crawler</td></tr>
<tr><td>Priority 1 pages among the most linked pages</td><td>… of …</td><td>Links report in Search Console</td></tr>
</tbody></table>
<h3>Part 2. Page priorities</h3>
<table><thead><tr><th>URL</th><th>Type (service, category, hub, article)</th><th>Cluster</th><th>Priority (1–3)</th><th>Incoming links today</th><th>Target</th><th>Click depth</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<p>Priority 1: service pages, categories and content that bring in leads. Priority 2: pages that support sales. Priority 3: everything else.</p>
<h3>Part 3. Anchor text register</h3>
<table><thead><tr><th>Target page</th><th>Primary anchor</th><th>Allowed variants</th><th>Don’t use (belongs to another page)</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 4. Hub-and-spoke map</h3>
<table><thead><tr><th>Cluster and hub</th><th>Spoke page</th><th>Hub → spoke</th><th>Spoke → hub</th><th>Links to 2–4 cluster pages</th></tr></thead><tbody>
<tr><td>Cluster: … Hub: …</td><td>1. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>2. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>3. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td></td><td>4. …</td><td>☐</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Part 5. Link plan</h3>
<table><thead><tr><th>No.</th><th>Source page</th><th>Target page</th><th>Anchor text</th><th>Placement (body, menu, breadcrumbs, footer)</th><th>Live</th><th>Date</th></tr></thead><tbody>
<tr><td>1</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
<tr><td>2</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
<tr><td>3</td><td>…</td><td>…</td><td>…</td><td>…</td><td>☐</td><td>…</td></tr>
</tbody></table>
<h3>Part 6. Quarterly audit (quarter: …)</h3>
<ul>
<li>☐ Every important page has a link from at least one other page (no orphan pages)</li>
<li>☐ Important pages within 3 clicks of the homepage</li>
<li>☐ Zero internal links to 4xx and 5xx pages</li>
<li>☐ Links point to the final URL, with no redirects on the way</li>
<li>☐ Links point to canonical URLs</li>
<li>☐ Priority 1 pages among the most linked pages (Links report)</li>
<li>☐ Descriptive anchor text; one anchor = one target page</li>
<li>☐ Links are &lt;a href&gt; elements, present in the HTML</li>
<li>☐ No important pages with a single incoming link, no pages overloaded with links</li>
<li>☐ Links to important pages without rel="nofollow"</li>
</ul>
<h3>Part 7. Orphan pages and decisions</h3>
<table><thead><tr><th>URL</th><th>How we know (sitemap, Search Console, CMS)</th><th>Decision (link, merge with 301, remove with 410, noindex)</th><th>Link from / 301 to</th><th>Owner and due date</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 8. Results and next steps</h3>
<table><thead><tr><th>Target page</th><th>Date links went live</th><th>Incoming links before / after</th><th>Google clicks, 28 days before / after</th><th>Average position before / after</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>… / …</td><td>… / …</td><td>… / …</td></tr>
<tr><td>…</td><td>…</td><td>… / …</td><td>… / …</td><td>… / …</td></tr>
</tbody></table>
<table><thead><tr><th>Review findings and tasks for next quarter</th><th>Owner</th><th>Due date</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Get the internal linking template (PDF)',
      opis: 'We will email you the PDF with all 8 parts: baseline, page priorities, anchor text register, hub-and-spoke map, link plan, quarterly audit, orphan pages, and results and next steps. Print it or fill it in with any PDF editor.',
      etykieta: 'Your email address',
      przycisk: 'Email me the template (PDF)',
      przedmiot: 'the internal linking template',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the internal linking template PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'What is the difference between internal linking and link building?',
        answer: 'Internal linking means the links between pages on your own site: the menu, breadcrumbs, in-content links and the footer. Link building means earning links from other domains to your site. Internal links are fully under your control and you can change them in minutes. External links take effort to earn, so it makes little sense to point them at pages that no internal link leads to.',
      },
      {
        question: 'How many internal links should a page have?',
        answer: 'There is no single right number. Google says plainly that there is no ideal number of links per page, and that if it feels like too many, it probably is. A practical rule: an article links to the hub of its topic and to 2–4 related spokes, while the service page gets the most incoming links from every page in its cluster. Descriptive anchor text and placement in a sentence matter more than the count.',
      },
      {
        question: 'What is an orphan page and how do I find one?',
        answer: 'It is a page that no other page on your site links to. Google can only find it through your sitemap or external links, and visitors usually never reach it. To find orphans, compare the URLs in your XML sitemap with the URLs a crawler reached by following links. Another clue is pages with impressions in Search Console that the crawler didn’t find.',
      },
      {
        question: 'Are menu and footer links enough?',
        answer: 'Usually not. Menu and footer links give every page a path to your key pages, but they lack the sentence context that describes the target. Google points out that the words before and after a link matter too. That is why service pages and topic hubs should also get links from the body copy of articles, case studies and guides in the same cluster.',
      },
      {
        question: 'How often should I run an internal linking audit?',
        answer: 'Every quarter, and after every major change: a migration, a menu rebuild, URL changes or a new site section. Use the same criteria each time so you can compare results: orphan pages, click depth, links to errors and redirects, canonical URLs and anchor text. You can run a quick check of up to 25 pages with the free SEO audit and a full review with a crawler.',
      },
      {
        question: 'Does anchor text have to include the target page’s keyword?',
        answer: 'Not necessarily, but it should make clear what the target page is about. Most often the primary anchor is close to the page’s primary keyword, and variants fit different sentences. Avoid cramming several keywords into one link: Google treats keyword stuffing as spam. Also stick to the rule that the same anchor text always points to the same page.',
      },
    ],
    zrodla: ZRODLA_GOOGLE,
    powiazane: [
      { href: '/narzedzia/checklista-seo', tekst: 'SEO checklist', opis: '50 checks, including internal links (A7, B10, B11)' },
      { href: '/narzedzia/audyt-seo', tekst: 'Free SEO audit', opis: 'broken internal links and redirect chains across 25 pages' },
      { href: '/narzedzia/content-plan', tekst: 'Content calendar template', opis: 'the publishing schedule that feeds new pages into your link plan' },
      { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', tekst: 'Canonical tag guide', opis: 'which URL to link to when a page has duplicates' },
      { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', tekst: 'B2B link building', opis: 'how to earn links from other sites to your service pages' },
    ],
    kroki: [
      { name: 'Record your baseline', text: 'Crawl the site, compare the result with your XML sitemap and note the number of orphan pages, links to errors and redirects, and pages deeper than 3 clicks.' },
      { name: 'Pick your priority pages', text: 'List service pages, categories and content that bring in leads, and give each a priority from 1 to 3. Note how many incoming links each has today.' },
      { name: 'Fill in the anchor text register', text: 'Give each page from part 2 a primary anchor and variants. The same anchor text must never point to two different pages.' },
      { name: 'Draw the hub-and-spoke map', text: 'For each topic, enter the hub and its spokes. Mark the missing links: hub to spoke, spoke to hub and between pages in the cluster.' },
      { name: 'Write the link plan', text: 'For every missing link, enter the source page, target page, anchor text from the register and placement. Start with links to priority 1 pages.' },
      { name: 'Ship the links and measure', text: 'Tick off each link that goes live and date it. In Search Console, compare 28 days before the change with 28 days after Google has recrawled the source pages.' },
      { name: 'Repeat the audit every quarter', text: 'Run the same checks in part 6 and decide on orphan pages in part 7: link them, merge them, remove them or keep them out of the index.' },
    ],
    plikNazwa: 'Internal linking strategy template and audit (PDF)',
  },
};
