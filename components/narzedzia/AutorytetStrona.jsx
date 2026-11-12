// Strona aplikacji: Autorytet domeny (/narzedzia/autorytet-domeny, /en/tools/domain-authority-checker). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
// 12.11.2026 (decyzja właściciela: bez klucza i bez konta u dostawcy): wynik to NASZA metryka 0-100 (wzór cc-hcpr-v1)
// z publicznego grafu linków Common Crawl, nie Domain Rating Ahrefs ani Domain Authority Moz. Nie sugerujemy
// powiązania z Common Crawl, Ahrefs ani Moz (ToU CC pkt 2(i)). Fakty o danych, wzorze, kalibracji i korelacji:
// prace-2026-11-12/autorytet-cc/dane/RAPORT.md (§1 wydanie, §4 wzór, §5 kalibracja i rozkład, §6 Moz Top 500).
// Weryfikacja 12.11.2026 (autorytet-cc/weryfikacja): Spearman z liczbą domen linkujących Moz = 0,575 dla rangi
// efektywnej i 0,569 dla zaokrąglonego wyniku, z DA 0,367 / 0,363, stąd w treści „około 0,57” i „około 0,37”.
// Percentyl = odsetek domen .pl z gorszą pozycją, nie z niższym wynikiem (przy wyniku 9 percentyl to 51-56).
// Notatka wydania CC (135,0 mln domen, 1,8 mld krawędzi, crawle CC-MAIN-2026-34/39/43) i strona Moz o DA: odczyt 12.11.2026.
// Opis DR: help.ahrefs.com (odczyt 11.11.2026). Jak podnieść autorytet: playbook SEO §6.1-6.3 i §7.2.
// Progi poziomów (< 10, 10-24, 25-44, 45-69, ≥ 70) = propozycja z dane/RAPORT.md §11; panel musi używać tych samych.

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import AutorytetClient from './AutorytetClient';

const AHREFS_DR = 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr';
const MOZ_DA = 'https://moz.com/learn/seo/domain-authority';
const MOZ_TOP = 'https://moz.com/top500';
const AKSJOMATY = 'https://arxiv.org/abs/1308.2140';
const zewn = { target: '_blank', rel: 'noopener', style: s.podkreslenie };
const pl = (n) => n.toLocaleString('pl-PL');
const en = (n) => n.toLocaleString('en-GB');

// Z-07: zrzut przykładowego wyniku z trybu demonstracyjnego (12.11.2026, bez ręcznych poprawek; wynik,
// pozycja w grafie, percentyl .pl i porównanie z 3 konkurentami, bez formularza raportu). Domeny są fikcyjne
// (przyklad-firmy.pl, konkurent-a/b/c.pl bez rekordów NS i bez miejsca w grafie; EN: *.example), a liczby to
// mediany z danych dla danego wyniku. Podpis mówi to wprost.
const ZRZUT = {
  pl: { src: '/images/narzedzia/przyklady/autorytet-domeny-przykladowy-wynik.webp', width: 1200, height: 1261 },
  en: { src: '/images/narzedzia/przyklady/domain-authority-checker-example-result.webp', width: 1200, height: 1261 },
};
const schemaZrzutu = (z) => ({ url: z.src, width: z.width, height: z.height });

// Z-03: Autorytet nie ma listy w lib/narzedzia/poradniki.js, więc pozycje podajemy tutaj (tytuły z lib/blogPosts.js).
const PORADNIKI_AUTORYTETU = [
  { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', pl: ['Linkowanie B2B: strategie link buildingu i checklista', 'jak zdobywać linki w B2B i co sprawdzić przed publikacją'], en: ['B2B Link Building for Marketers: Strategies and Checklist', 'how to earn links in B2B and what to check before you publish'] },
  { href: '/blog/analiza-konkurencji-seo-przewodnik', pl: ['Analiza konkurencji SEO: przewodnik z przykładem 17 agencji', 'jak wybrać konkurentów do porównania i co u nich sprawdzić'], en: ['SEO Competitor Analysis: A Step-by-Step Guide', 'how to pick the competitors to compare and what to check'] },
  { href: '/pozycjonowanie-w-ai/chatgpt', pl: ['Pozycjonowanie w ChatGPT: skąd bierze firmy, które poleca', 'wzmianki o marce, które budują autorytet, liczą się też w odpowiedziach AI'], en: ['ChatGPT optimization: where ChatGPT finds the companies it recommends', 'brand mentions that build authority also count in AI answers'] },
];

// Kalibracja z dane/RAPORT.md §5 (wydanie cc-main-2026-aug-sep-oct): wynik i miejsce wśród domen .pl.
const PRZYKLADY = [
  { id: 'google', domena: 'google.com', wynik: 100, miejscePl: null },
  { id: 'wikipedia', domena: 'wikipedia.org', wynik: 99, miejscePl: null },
  { id: 'onet', domena: 'onet.pl', wynik: 92, miejscePl: 3 },
  { id: 'allegro', domena: 'allegro.pl', wynik: 91, miejscePl: 5 },
  { id: 'wp', domena: 'wp.pl', wynik: 87, miejscePl: 10 },
  { id: 'olx', domena: 'olx.pl', wynik: 84, miejscePl: 35 },
  { id: 'mbank', domena: 'mbank.pl', wynik: 82, miejscePl: 62 },
  { id: 'xkom', domena: 'x-kom.pl', wynik: 68, miejscePl: 509 },
  { id: 'decathlon', domena: 'decathlon.pl', wynik: 64, miejscePl: 1735 },
  { id: 'rossmann', domena: 'rossmann.pl', wynik: 52, miejscePl: 7939 },
];

// --- Autorytet domeny ----------------------------------------------------------------------------

const FAQ_AUTORYTETU = [
  { id: 'czy-to-dr-albo-da', question: 'Czy to Domain Rating Ahrefs albo Domain Authority Moz?', answer: 'Nie. To nasz własny wynik autorytetu domeny. Liczymy go z publicznego grafu linków Common Crawl według jawnego wzoru, który opisujemy na tej stronie. Domain Rating to metryka Ahrefs, a Domain Authority metryka Moz: obie powstają z ich własnych baz linków i według ich wzorów. Nie korzystamy z danych Ahrefs ani Moz, a Common Crawl nie liczy tego wyniku i nie odpowiada za niego.' },
  { id: 'skad-dane', question: 'Skąd bierzecie dane i czy wysyłacie gdzieś moją domenę?', answer: `Dane pochodzą z grafu linków między domenami, który Common Crawl publikuje za darmo. Obecne wydanie (${AUTORYTET.wydanie}) obejmuje crawle z okresu ${AUTORYTET.okres.pl}. Przeliczony wynik trzymamy we własnym magazynie danych, więc wpisana domena nie trafia do żadnej zewnętrznej firmy.` },
  { id: 'jaki-wynik-jest-dobry', question: 'Jaki wynik autorytetu jest dobry?', answer: 'Zależy od konkurencji. W tym wydaniu około 60% domen .pl ma 10 punktów lub mniej, ponad 30 punktów ma około 5%, a ponad 50 mniej niż 1%. Nowe i lokalne strony mają zwykle poniżej 10 punktów (nasze cztery domeny testowe mają po 9), ugruntowane małe firmy z naszej losowej próby miały od kilkunastu do około 40, a sklep, który walczy o ogólnopolskie frazy, porównuje się z dużo mocniejszymi domenami. Dobry wynik to taki, który nie odstaje od firm z pierwszej dziesiątki Google na Twoje frazy, dlatego porównanie z maksymalnie trzema konkurentami jest za darmo.' },
  { id: 'porownanie-bez-emaila', question: 'Czy porównanie z konkurencją wymaga e-maila?', answer: 'Nie. Wynik Twojej domeny i porównanie z maksymalnie trzema konkurentami widzisz od razu, bez rejestracji i bez e-maila. E-mail jest potrzebny tylko wtedy, gdy chcesz dostać raport z planem działania.' },
  { id: 'inny-niz-dr', question: 'Dlaczego mój wynik jest inny niż DR albo DA?', answer: 'Bo to inna miara z innych danych. Ahrefs i Moz mają własne roboty i bazy linków i liczą coś innego niż my: DR opiera się na liczbie i sile domen linkujących, DA to model przewidujący pozycje. My liczymy pozycję domeny w grafie Common Crawl. Na 441 domenach z listy Top 500 Moz korelacja rang naszego wyniku z liczbą domen linkujących według Moz wynosi około 0,57, a z DA około 0,37. Wyniki nie przeliczają się jeden na drugi.' },
  { id: 'wynik-zero', question: 'Dlaczego moja domena ma 0 albo nie ma jej w grafie?', answer: 'Najczęściej to nowa domena albo taka, do której nie linkuje żadna strona odwiedzona przez robota Common Crawl w okresie, który obejmuje wydanie. Drugi przypadek: domena jest w grafie, ale żadna inna domena do niej nie linkuje. W obu sytuacjach wynik to 0. Gdy zdobędziesz linki z innych stron, pojawią się w kolejnym wydaniu grafu.' },
  { id: 'domeny-linkujace', question: 'Co znaczy liczba domen linkujących i czy to pełna lista linków zwrotnych?', answer: 'Dla domen .pl pokazujemy, z ilu różnych domen prowadzi co najmniej jeden link do Twojej domeny, oraz pięć najmocniejszych z nich według naszego wyniku. Liczymy to z tego samego grafu Common Crawl, z jednego kwartalnego crawla i tylko spośród domen, które robot widział, więc to dolna granica, a nie pełny indeks linków zwrotnych. Nie znamy adresów podstron, tekstów linków ani atrybutów dofollow i nie porównujemy liczby z narzędziami komercyjnymi, bo każde ma inną bazę. Link z własnych subdomen nie liczy się jako osobna domena. Dla domen spoza .pl liczby nie podajemy.' },
  { id: 'jak-czesto', question: 'Jak często wynik się zmienia?', answer: 'Z każdym wydaniem grafu, a nie z dnia na dzień. Każde wydanie obejmuje trzy miesiące crawlowania, więc nowy link widać w wyniku z opóźnieniem od kilku tygodni do kilku miesięcy. Wynik tej samej domeny może się też przesunąć o kilka punktów między wydaniami, bo zmienia się liczba domen w grafie. Dlatego przy wyniku zawsze podajemy wydanie danych.' },
  { id: 'jak-podniesc', question: 'Jak podnieść autorytet domeny?', answer: 'Zdobywając linki z serwisów, które same są mocne i powiązane z Twoją branżą: publikacje w mediach branżowych oparte na własnych danych, materiały, które inni chętnie cytują, wzmianki o firmie zamienione w linki i odzyskane linki do usuniętych podstron. Masowe linki ze słabych stron niewiele tu dają, bo wynik bierze słabszy z dwóch sygnałów, a ryzyko kary Google jest realne.' },
  { id: 'ccbot', question: 'Czy blokada robota CCBot w robots.txt obniża wynik?', answer: 'Nie. Wynik liczymy z linków, które prowadzą do Twojej domeny z innych stron, więc blokada robota Common Crawl na Twojej stronie go nie obniża. Znaczenie ma to, czy robot odwiedza strony, które do Ciebie linkują.' },
  { id: 'pozycje-google', question: 'Czy autorytet domeny wpływa na pozycje w Google?', answer: 'Google nie używa naszego wyniku ani żadnej innej miary autorytetu z narzędzi SEO. Wynik pokazuje, jak mocno domena jest osadzona w sieci linków, a linki są jednym z czynników rankingu Google. To wskaźnik, a nie przyczyna pozycji.' },
  { id: 'ile-domen', question: 'Ile domen mogę sprawdzić?', answer: `Do ${AUTORYTET.limitIp} domen dziennie z jednego adresu IP. Każda domena liczy się osobno: sprawdzenie własnej domeny z trzema konkurentami to cztery domeny. Pod wynikiem pokazujemy, ile sprawdzeń zostało na dziś.` },
  { id: 'czy-zapisujecie-wyniki', question: 'Czy zapisujecie wyniki?', answer: 'Sprawdzenie zapisujemy w naszym panelu, żeby liczyć dzienny limit i móc wysłać raport, o który poprosisz. Nie publikujemy listy sprawdzonych domen ani ich wyników.' },
  { id: 'autorytet-a-widocznosc-w-ai', question: 'Czy autorytet domeny ma znaczenie dla widoczności w AI?', answer: 'Modele AI nie korzystają z naszego wyniku. Te same działania, które go podnoszą, czyli publikacje w mediach branżowych i wzmianki o marce, zwiększają jednak szansę, że ChatGPT czy Gemini wymienią Twoją firmę. Czy już to robią, sprawdzisz w naszym darmowym narzędziu do widoczności w AI.' },
];

export function AutorytetStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AutorytetEn />;
  return (
    <Uklad
      slug="autorytet-domeny"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Sprawdzanie autorytetu domeny',
        description: 'Bezpłatne sprawdzenie autorytetu domeny: wynik 0-100 AI SEO COMPANY obliczony z publicznego grafu linków Common Crawl, miejsce wśród domen .pl i porównanie z maksymalnie trzema konkurentami bez e-maila.',
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.pl),
        featureList: [`Wynik autorytetu domeny 0-100 z grafu linków Common Crawl (wydanie ${AUTORYTET.wydanie})`, `Miejsce i percentyl wśród ${pl(AUTORYTET.domenPl)} domen .pl`, `Porównanie z maksymalnie ${AUTORYTET.konkurentow} konkurentami bez e-maila`, 'Opis poziomu i różnicy do najmocniejszego konkurenta', 'Raport z planem działania e-mailem', `Do ${AUTORYTET.limitIp} domen dziennie bez rejestracji`],
      }}
      lead="Sprawdź autorytet domeny za darmo: wynik 0‑100 z publicznego grafu linków Common Crawl, miejsce wśród domen .pl i porównanie z maksymalnie trzema konkurentami. Bez rejestracji i bez e-maila."
      narzedzie={<AutorytetClient />}
      odpowiedz={`Autorytet domeny to ocena, jak mocno strona jest osadzona w sieci linków, w skali od 0 do 100. Nasze narzędzie liczy go z publicznego grafu linków Common Crawl (${pl(AUTORYTET.domenWGrafie)} domen, crawle z okresu ${AUTORYTET.okres.pl}): im bliżej domeny są inne strony w tej sieci i im mocniejsze domeny do niej linkują, tym wyższy wynik. To nasza metryka, a nie Domain Rating Ahrefs ani Domain Authority Moz. Wynik i porównanie z konkurentami widzisz od razu i za darmo.`}
      faq={FAQ_AUTORYTETU}
      tytulFaq="Pytania o autorytet domeny"
    >
      <CoDostajesz
        odRazu={[
          'Wynik autorytetu domeny w skali 0-100 z grafu linków Common Crawl',
          `Miejsce i percentyl wśród ${pl(AUTORYTET.domenPl)} domen .pl oraz pozycję w całym grafie`,
          'Porównanie z maksymalnie trzema konkurentami na jednym wykresie',
          'Dla domen .pl: liczbę domen linkujących i pięć najmocniejszych, także u konkurentów',
          'Poziom autorytetu i różnicę do najmocniejszego konkurenta',
          'Licznik sprawdzeń na dziś i link do wyniku do skopiowania',
        ]}
        poEmailu={[
          'Raport z wynikiem, porównaniem i numerem wydania danych',
          'Plan działania w kolejności: od czego zacząć zdobywanie linków przy Twoim wyniku',
          'Jakich linków unikać, żeby nie ryzykować kary Google',
        ]}
        przypis="E-mail niczego nie odblokowuje na stronie: cały wynik widzisz bez niego. Przy każdym wyniku podajemy źródło danych i wydanie grafu."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.pl}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Sprawdzanie autorytetu domeny: przykładowy wynik 23 na 100 z miejscem wśród domen .pl i porównaniem z trzema konkurentami na wykresie słupkowym"
            podpis="Przykładowy wynik w trybie demonstracyjnym: domeny przyklad-firmy.pl i konkurent-a.pl, konkurent-b.pl, konkurent-c.pl są fikcyjne, a liczby pokazują typowe wartości dla takich wyników, nie dane prawdziwych stron. Wynik i porównanie widzisz bez e-maila; e-mailem wysyłamy raport z planem działania. Zrzut z 12.11.2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="co-to-jest-autorytet-domeny" tytul="Co to jest autorytet domeny">
        <p style={s.akapit}>Autorytet domeny to umowna miara siły strony w sieci linków. Link z innej strony działa jak rekomendacja: im więcej mocnych stron prowadzi do Twojej domeny, tym łatwiej wyszukiwarce uznać ją za wiarygodne źródło. Google nie publikuje własnej liczby autorytetu, dlatego branża SEO korzysta z miar narzędzi, a każde liczy ją z własnej bazy linków.</p>
        <p style={s.akapit}>Nasz wynik liczymy sami z publicznego grafu linków Common Crawl. To liczba od 0 do 100: im wyżej, tym bliżej centrum sieci jest domena i tym mocniejsze domeny do niej linkują. Wynik 0 oznacza, że w danych nie ma żadnych linków do domeny albo że domeny w ogóle nie ma w grafie.</p>
        <p style={s.akapit}>Przy wyniku pokazujemy też miejsce domeny wśród {pl(AUTORYTET.domenPl)} domen .pl w grafie i jej percentyl, czyli jaki odsetek domen .pl ma w grafie gorszą pozycję. Dla domen w innych końcówkach podajemy pozycję w całym grafie, który liczy {pl(AUTORYTET.domenWGrafie)} domen.</p>
      </Sekcja>

      <Sekcja id="jak-liczymy-wynik" tytul="Jak liczymy wynik z danych Common Crawl">
        <p style={s.akapit}>Common Crawl to amerykańska fundacja non-profit, która regularnie pobiera publiczne strony internetowe i udostępnia dane za darmo. Z linków znalezionych na tych stronach buduje graf: węzłem jest domena, a połączeniem link z jednej domeny do drugiej. Obecne wydanie, {AUTORYTET.wydanie}, powstało z trzech crawli z okresu {AUTORYTET.okres.pl}, ma {pl(AUTORYTET.domenWGrafie)} domen i {AUTORYTET.krawedzi.pl} połączeń między nimi. Plik z pozycjami domen opublikowano 22.10.2026. Źródło: <a href={AUTORYTET.notatka} {...zewn}>notatka wydania Common Crawl</a>.</p>
        <p style={s.akapit}>Dla każdej domeny Common Crawl podaje dwie pozycje w rankingu, a my zamieniamy je na wynik w czterech krokach:</p>
        <ol style={s.lista}>
          <li><strong>Centralność harmoniczna (harmonic centrality).</strong> Dla każdej domeny sumuje się odwrotności odległości od wszystkich innych domen, liczonych w przejściach po linkach. Wysoko jest domena, do której z większości sieci prowadzą krótkie ścieżki. Farma linków nie skraca tych ścieżek, więc trudno nią podbić tę pozycję. Według badania Boldiego i Vigny <a href={AKSJOMATY} {...zewn}>„Axioms for Centrality”</a> to jedyna z porównanych tam miar, która spełnia wszystkie trzy proponowane aksjomaty.</li>
          <li><strong>PageRank.</strong> Link z domeny, do której sama prowadzi dużo linków, waży więcej. Ta miara lepiej oddaje liczbę i siłę linków, ale łatwiej ją zawyżyć linkami ze spamu.</li>
          <li><strong>Słabszy z dwóch sygnałów.</strong> Bierzemy gorszą z dwóch pozycji. Spam podnosi PageRank, ale nie centralność. Jeden link z bardzo centralnej strony podnosi centralność, ale nie PageRank. Wysoki wynik dostaje tylko domena, której oba sygnały są mocne.</li>
          <li><strong>Skala 0-100.</strong> Pozycję r zamieniamy na wynik = 100 × (1 − (log r / log r0)³), gdzie r0 to liczba domen, do których prowadzi co najmniej jeden link ({pl(AUTORYTET.r0)} w tym wydaniu). Pozycja 1 000 to 95 punktów, 100 tysięcy to 76, a milion to 59.</li>
        </ol>
        <p style={s.akapit}>Skala jest logarytmiczna i im wyżej, tym trudniej: na dole skali 10 punktów to mniej więcej dwa razy lepsza pozycja w grafie, między 40 a 60 punktów 2,5-3 razy na każde 10 punktów, a między 80 a 90 prawie 10 razy. Wzór ma wersję {AUTORYTET.wzor}. Gdy go zmienimy, nowa wersja dostanie nowy numer.</p>
        <p style={s.akapit}>Common Crawl nie liczy tego wyniku i nie odpowiada za niego; korzystamy z danych, które publikuje dla wszystkich. Domenę sprawdzamy w naszej kopii przeliczonych danych, więc adres, który wpiszesz, nie trafia do zewnętrznej firmy.</p>
      </Sekcja>

      <Sekcja id="autorytet-a-dr-i-da" tytul="Czym różni się od Domain Rating Ahrefs i Domain Authority Moz">
        <CompareTable
          id="tabela-autorytet-dr-da"
          caption="Nasz wynik autorytetu, Domain Rating Ahrefs i Domain Authority Moz"
          columns={[
            { key: 'cecha', label: 'Cecha' },
            { key: 'my', label: 'Nasz wynik' },
            { key: 'dr', label: 'Domain Rating (Ahrefs)' },
            { key: 'da', label: 'Domain Authority (Moz)' },
          ]}
          rows={[
            { id: 'kto', cecha: 'Kto liczy', my: 'AI SEO COMPANY', dr: 'Ahrefs', da: 'Moz' },
            { id: 'dane', cecha: 'Dane o linkach', my: `publiczny graf Common Crawl, ${pl(AUTORYTET.domenWGrafie)} domen`, dr: 'własna baza linków Ahrefs', da: 'własna baza linków Moz' },
            { id: 'co', cecha: 'Co mierzy', my: 'pozycję domeny w grafie: centralność harmoniczna i PageRank, słabszy z dwóch', dr: 'unikalne domeny linkujące i ich własny DR', da: 'model uczenia maszynowego, głównie z danych o linkach, przewiduje zdolność do zajmowania pozycji' },
            { id: 'skala', cecha: 'Skala', my: '0-100, logarytmiczna', dr: '0-100, logarytmiczna', da: '1-100' },
            { id: 'aktualnosc', cecha: 'Aktualność', my: `wydania grafu, każde z 3 miesięcy crawlowania (teraz: ${AUTORYTET.okres.pl})`, dr: 'według Ahrefs na bieżąco', da: 'według aktualizacji indeksu Moz' },
          ]}
          przypis={<>Źródła: <a href={AHREFS_DR} {...zewn}>Ahrefs Help, „What is Domain Rating (DR)”</a> (odczyt 11.11.2026), <a href={MOZ_DA} {...zewn}>Moz, „What is Domain Authority”</a> i <a href={AUTORYTET.zrodlo} {...zewn}>Common Crawl, Web Graphs</a> (odczyt 12.11.2026).</>}
        />
        <p style={s.akapit}>Sprawdziliśmy, jak nasz wynik zgadza się z danymi Moz na jego liście 500 najpopularniejszych domen (<a href={MOZ_TOP} {...zewn}>Moz Top 500</a>, 441 dopasowanych domen, 12.11.2026). Korelacja rang Spearmana z liczbą domen linkujących według Moz wynosi około 0,57, a z samym DA około 0,37. To zgodność umiarkowana: miary układają domeny podobnie, ale nie tak samo. Sam PageRank zgadzał się z Moz lepiej (0,72), ale małym polskim domenom z linkami ze spamu dawał zawyżone wyniki, więc nie używamy go samodzielnie. Zgodności w środku skali, gdzie jest większość firm, jeszcze nie zmierzyliśmy.</p>
        <p style={s.akapit}>Różnice widać na czterech domenach z naszych testów, w tym na naszej ai-seo-company.pl: wszystkie mają u nas po 9 punktów, a ich DR według pomiarów Ahrefs z 11.11.2026 wynosił od 0 do 54, zależnie od domeny i wersji DR. Dwie z nich zawdzięczały wysoki DR linkom ze spamu. Dlatego nie przeliczaj naszego wyniku na DR ani DA. Porównuj domeny w jednej metryce i przy kolejnych pomiarach trzymaj się tej samej.</p>
      </Sekcja>

      <Sekcja id="jak-czytac-wynik" tytul="Jak czytać wynik na tle konkurencji">
        <p style={s.akapit}>Sama liczba niewiele mówi. Wynik 25 może być mocny dla gabinetu w średnim mieście i słaby dla sklepu, który walczy o ogólnopolskie frazy. Dlatego narzędzie od razu porównuje Cię z maksymalnie trzema konkurentami, bez e-maila.</p>
        <h3 style={s.h3}>Kogo wpisać jako konkurenta</h3>
        <p style={s.akapit}>Firmy, które są w pierwszej dziesiątce Google na Twoje najważniejsze frazy, a nie największe marki z branży. Wpisz frazę, po której klienci Cię szukają, i weź domeny z pierwszych wyników, pomijając portale i katalogi. Jeśli konkurujesz lokalnie, porównuj się z firmami z tego samego miasta.</p>
        <h3 style={s.h3}>Poziomy wyniku</h3>
        <ul style={s.lista}>
          <li><strong>0-9, bardzo niski:</strong> typowy dla nowych i małych stron. Około 60% domen .pl w grafie ma 10 punktów lub mniej.</li>
          <li><strong>10-24, niski:</strong> domena ma już linki, ale niewiele z mocnych serwisów. Często wystarcza na frazy lokalne i niszowe.</li>
          <li><strong>25-44, średni:</strong> solidna pozycja w sieci linków. Ponad 30 punktów ma około 5% domen .pl.</li>
          <li><strong>45-69, wysoki:</strong> mocna pozycja, poziom znanych firm i dużych sklepów. Ponad 50 punktów ma mniej niż 1% domen .pl.</li>
          <li><strong>70-100, bardzo wysoki:</strong> największe serwisy. Powyżej 70 punktów jest około 340 domen .pl.</li>
        </ul>
        <p style={s.przypis}>Progi poziomów są nasze, ustalone na rozkładzie wyników domen .pl w wydaniu {AUTORYTET.wydanie}. Traktuj je orientacyjnie: rozstrzyga porównanie z konkurentami.</p>
        <h3 style={s.h3}>Przykładowe wyniki dla orientacji</h3>
        <CompareTable
          id="tabela-przyklady-autorytetu"
          caption={`Wynik autorytetu wybranych domen, wydanie ${AUTORYTET.wydanie}`}
          columns={[
            { key: 'domena', label: 'Domena' },
            { key: 'wynik', label: 'Wynik' },
            { key: 'miejsce', label: 'Miejsce wśród domen .pl' },
          ]}
          rows={PRZYKLADY.map((x) => ({ id: x.id, domena: x.domena, wynik: String(x.wynik), miejsce: x.miejscePl ? `${pl(x.miejscePl)}.` : 'nie dotyczy' }))}
          przypis="Źródło: nasze obliczenia z grafu linków Common Crawl, 12.11.2026."
        />
        <p style={s.akapit}>Duże sklepy wypadają u nas niżej niż portale: x-kom.pl i mediaexpert.pl mają 67-68, a rossmann.pl 52, choć to znane marki z dużą liczbą linków. Ich słabszym sygnałem jest centralność, a wynik bierze słabszy sygnał. Jeśli porównujesz się ze sklepem, pamiętaj, że jego przewaga w linkach może być większa, niż pokazuje wynik.</p>
        <h3 style={s.h3}>Jak opisujemy różnicę do najmocniejszego konkurenta</h3>
        <ul style={s.lista}>
          <li><strong>Masz najwyższy wynik:</strong> pod względem linków te firmy Cię nie wyprzedzają. Przewagę budujesz treścią i linkami do stron, które mają sprzedawać.</li>
          <li><strong>Do 5 pkt różnicy:</strong> o pozycjach częściej decydują treść i dopasowanie strony do pytania niż sam profil linków.</li>
          <li><strong>Od 5 do 20 pkt:</strong> wyraźna przewaga konkurenta w linkach. Potrzebujesz linków z serwisów branżowych i mediów, nie tylko lepszej treści.</li>
          <li><strong>Ponad 20 pkt:</strong> skala jest logarytmiczna, więc to praca na miesiące. Zacznij od fraz, na które konkurent nie ma mocnych podstron.</li>
        </ul>
        <p style={s.przypis}>Progi 5 i 20 pkt też są nasze i orientacyjne. To punkt startu do decyzji o linkach, nie prognoza pozycji.</p>
      </Sekcja>

      <Sekcja id="jak-podniesc-autorytet-domeny" tytul="Jak podnieść autorytet domeny">
        <p style={s.akapit}>Kolejność poniżej pochodzi z naszego playbooka SEO, według którego pracujemy z klientami: od działań, które dają najwięcej przy najmniejszym ryzyku.</p>
        <h3 style={s.h3}>Taktyki w kolejności opłacalności</h3>
        <ol style={s.lista}>
          <li><strong>Digital PR na własnych danych.</strong> Raport, badanie albo zestawienie z danych firmy, zaproponowane mediom branżowym i ogólnym. Daje linki najwyższej jakości i wzmianki o marce, które liczą się też w odpowiedziach AI.</li>
          <li><strong>Materiały, do których linkuje się samo.</strong> Kalkulatory, narzędzia, zestawienia i szablony zdobywają linki bez wysyłania próśb.</li>
          <li><strong>Wzmianki bez linku.</strong> Znajdź strony, które piszą o Twojej firmie, ale nie linkują, i poproś o link. To najskuteczniejsza prośba w całym outreachu.</li>
          <li><strong>Odzyskiwanie linków.</strong> Linki, które prowadzą do stron z błędem 404, np. po zmianie strony, przekieruj na właściwe adresy albo poproś o poprawkę.</li>
          <li><strong>Publikacje gościnne i partnerstwa, ale wybiórczo.</strong> Tylko w serwisach, które mają prawdziwy ruch z Twojego tematu.</li>
        </ol>
        <p style={s.akapit}>Firmy lokalne mają dodatkowe źródła linków: sponsoring, lokalne media, organizacje branżowe i partnerów biznesowych. Profil firmy w Google i katalogi z identyczną nazwą, adresem i telefonem budują podstawę, choć same linki z nich są słabe.</p>
        <h3 style={s.h3}>Jak ocenić link, zanim go zdobędziesz</h3>
        <ul style={s.lista}>
          <li>Serwis ma ruch z Google na frazy z Twojej branży.</li>
          <li>Jest tematycznie powiązany z tym, co robisz.</li>
          <li>Link stoi w treści artykułu, a nie w stopce czy pasku bocznym.</li>
          <li>Serwis nie jest katalogiem, który sprzedaje linki każdemu.</li>
        </ul>
        <p style={s.akapit}>Unikaj zapleczy (PBN), masowych wymian i systemów wymiany linków oraz komentarzy na forach w dużej skali. Ryzyko kary jest realne, a wartość takich linków bliska zeru. Wysoki wynik serwisu, który sprzedaje publikacje, też niczego nie gwarantuje: sprawdź go tutaj i zobacz, czy ma prawdziwy ruch.</p>
        <h3 style={s.h3}>Co mierzyć</h3>
        <ul style={s.lista}>
          <li>Liczbę domen linkujących do stron, które mają sprzedawać, a nie do całego serwisu.</li>
          <li>Wzmianki o marce i liczbę wyszukiwań jej nazwy: to dobre przybliżenie autorytetu.</li>
          <li>Ruch z pozyskanych publikacji.</li>
        </ul>
        <p style={s.akapit}>Nasz wynik sprawdzaj po każdym nowym wydaniu danych, z tą samą listą konkurentów. Nowe linki pojawiają się w nim z opóźnieniem: robot Common Crawl musi najpierw odwiedzić stronę z linkiem, a graf obejmuje trzy miesiące crawlowania.</p>
      </Sekcja>

      <Sekcja id="jak-uzyc-wyniku" tytul="Do czego użyć wyniku">
        <ul style={s.lista}>
          <li>Porównaj swój wynik z firmami, które są w TOP 10 na Twoje najważniejsze frazy. Duża różnica oznacza, że sama treść może nie wystarczyć.</li>
          <li>Sprawdzaj wynik po każdym wydaniu grafu. Spadek przy tej samej liczbie domen w grafie zwykle oznacza utracone linki, np. po zamknięciu serwisu partnera.</li>
          <li>Przy wyborze miejsc na publikacje sprawdzaj wynik serwisu: link z mocnej, powiązanej tematycznie strony jest wart więcej niż dziesiątki słabych.</li>
          <li>Po migracji strony albo zmianie domeny porównaj wynik z wydaniem sprzed zmiany. Spadek to sygnał, że część linków prowadzi do nieistniejących adresów.</li>
        </ul>
      </Sekcja>

      <Sekcja id="domeny-linkujace" tytul="Domeny linkujące: co pokazujemy i jak to czytać">
        <p style={s.akapit}>Dla domen .pl obok wyniku pokazujemy liczbę domen linkujących, czyli różnych domen, z których prowadzi co najmniej jeden link do Twojej. Nie liczymy samych linków: sto linków z jednego serwisu to jedna domena. Pokazujemy też pięć najmocniejszych domen linkujących, ułożonych według naszego wyniku, a przy konkurentach tę samą liczbę w tabeli porównania.</p>
        <p style={s.akapit}>Skala jest bardzo rozpięta. W tym wydaniu 129 587 domen .pl nie ma żadnego linku, a prawie co druga z pozostałych (44%) ma tylko jedną domenę linkującą. Największe portale mają ich dziesiątki tysięcy. Dlatego samą liczbę czytaj razem z wynikiem: dwadzieścia kilka domen z farmy tanich domen daje liczbę, ale nie daje mocy, a wynik to widzi. Zajrzyj w pięć najmocniejszych: jeśli to strony, które znasz i którym ufasz, profil jest zdrowy; jeśli same przypadkowe adresy, liczba niewiele znaczy.</p>
        <p style={s.akapit}>Co ważne, to nie jest pełny indeks linków zwrotnych. Dane pochodzą z jednego kwartalnego crawla Common Crawl i obejmują tylko domeny, które robot odwiedził, więc prawdziwa liczba jest zwykle wyższa. Nie znamy adresów podstron, tekstów linków ani atrybutów dofollow i nie podajemy liczb dla domen spoza .pl. Nie porównuj liczby z wynikami komercyjnych narzędzi, bo każde ma własną bazę.</p>
      </Sekcja>

      <Sekcja id="czego-nie-pokazuje" tytul="Ograniczenia: czego wynik nie pokazuje">
        <ul style={s.lista}>
          <li><strong>Stan z wydania, nie z dziś.</strong> Dane obejmują crawle z okresu {AUTORYTET.okres.pl}. Link zdobyty dziś zobaczysz najwcześniej w kolejnym wydaniu grafu.</li>
          <li><strong>Nowych domen nie ma w grafie.</strong> Domena, do której nie linkuje żadna strona odwiedzona przez robota Common Crawl, dostaje 0 i oznaczenie „brak w grafie”.</li>
          <li><strong>Bez pełnej listy linków.</strong> Dla domen .pl pokazujemy liczbę domen linkujących i pięć najmocniejszych, ale to dolna granica z jednego crawla, a nie pełny indeks. Nie znamy adresów podstron, tekstów linków ani atrybutów dofollow i nie zgadujemy tych danych. Dla domen spoza .pl liczby nie podajemy.</li>
          <li><strong>Robot nie widzi całej sieci.</strong> Linki ze stron, których robot Common Crawl nie odwiedził, nie liczą się w wyniku.</li>
          <li><strong>Małe domeny słabo się różnią.</strong> Wiele małych stron ma podobną pozycję, więc dostaje ten sam wynik. Nasze cztery domeny testowe mają po 9 punktów, choć ich profile linków się różnią.</li>
          <li><strong>Duże sklepy wypadają niżej.</strong> Część znanych marek e-commerce ma u nas 49-68 punktów, mniej niż wskazywałaby ich liczba linków.</li>
          <li><strong>Domeny spoza .pl tylko z czołówki.</strong> Przechowujemy wszystkie domeny .pl, a z pozostałych tylko pierwsze {pl(AUTORYTET.limitInnych)} pozycji w grafie. Dla innych domen spoza .pl pokazujemy „≤ {AUTORYTET.maksPozaZbiorem}”.</li>
          <li><strong>Domena, nie podstrona.</strong> Wynik opisuje całą domenę. Subdomeny, np. blog.firma.pl, liczą się razem z domeną firma.pl, bo tak łączy je graf Common Crawl.</li>
          <li><strong>Wskaźnik, nie przyczyna.</strong> Google nie używa naszego wyniku. O pozycji konkretnej podstrony decydują też linki do niej i jej treść.</li>
          <li><strong>Limit.</strong> Do {AUTORYTET.limitIp} domen dziennie z jednego adresu IP. Każdy konkurent liczy się jako jedna domena.</li>
        </ul>
        <p style={s.akapit}>Pełny profil linków, czyli kto do Ciebie linkuje, które linki są ryzykowne i czego brakuje względem konkurentów, analizujemy w ramach <Link href="/pozycjonowanie-stron-internetowych" style={s.podkreslenie}>pozycjonowania stron</Link>. Technikę i treść własnej strony sprawdzisz w <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>darmowym audycie SEO</Link>.</p>
      </Sekcja>

      <Poradniki pozycje={PORADNIKI_AUTORYTETU} />
      <PozostaleNarzedzia bez="/narzedzia/autorytet-domeny" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_AUTORYTETU_EN = [
  { id: 'is-it-dr-or-da', question: 'Is this Ahrefs Domain Rating or Moz Domain Authority?', answer: 'No. It is our own domain authority score. We calculate it from the public Common Crawl link graph with an open formula that we describe on this page. Domain Rating is an Ahrefs metric and Domain Authority is a Moz metric: both come from their own link databases and their own formulas. We do not use Ahrefs or Moz data, and Common Crawl does not calculate this score and is not responsible for it.' },
  { id: 'where-is-the-data-from', question: 'Where does the data come from, and do you send my domain anywhere?', answer: `The data comes from the graph of links between domains that Common Crawl publishes for free. The current release (${AUTORYTET.wydanie}) covers crawls from ${AUTORYTET.okres.en}. We keep the calculated scores in our own data store, so the domain you enter is not passed to any outside company.` },
  { id: 'what-is-a-good-score', question: 'What is a good authority score?', answer: 'It depends on your competitors. In this release about 60% of .pl domains score 10 points or less, about 5% score more than 30 and less than 1% score more than 50. New and local websites usually score below 10 (our four test domains score 9 each), established small businesses in our random sample scored from the low teens to about 40, and a shop competing for nationwide keywords compares itself with much stronger domains. A good score is one that does not fall behind the companies in Google’s top 10 for your keywords, which is why the comparison with up to three competitors is free.' },
  { id: 'comparison-without-email', question: 'Does the competitor comparison require an email?', answer: 'No. You see your domain’s score and the comparison with up to three competitors right away, with no sign-up and no email. You only need an email if you want the report with an action plan.' },
  { id: 'linking-domains', question: 'What does the number of linking domains mean, and is it a full backlink list?', answer: 'For .pl domains we show how many different domains have at least one link to your domain, and the five strongest of them by our score. We count it from the same Common Crawl graph, from one quarterly crawl and only among domains the robot saw, so it is a lower bound and not a full backlink index. We do not know page addresses, anchor texts or dofollow attributes, and we do not compare the number with commercial tools, because each has its own database. A link from your own subdomains does not count as a separate domain. We do not give the number for domains outside .pl.' },
  { id: 'different-from-dr', question: 'Why is my score different from DR or DA?', answer: 'Because it is a different measure based on different data. Ahrefs and Moz have their own crawlers and link databases and measure something other than we do: DR is based on the number and strength of linking domains, and DA is a model that predicts rankings. We measure a domain’s position in the Common Crawl graph. On 441 domains from the Moz Top 500 list, the rank correlation of our score with the number of linking domains according to Moz is about 0.57, and with DA about 0.37. The scores do not convert into one another.' },
  { id: 'score-zero', question: 'Why does my domain score 0 or is not in the graph?', answer: 'Most often it is a new domain, or one that no page visited by the Common Crawl robot during the release period links to. The second case: the domain is in the graph, but no other domain links to it. In both cases the score is 0. Once you earn links from other websites, they will show up in the next release of the graph.' },
  { id: 'how-often', question: 'How often does the score change?', answer: 'With every release of the graph, not from day to day. Each release covers three months of crawling, so a new link shows up in the score with a delay of a few weeks to a few months. The score of the same domain may also shift by a few points between releases, because the number of domains in the graph changes. That is why we always show the data release next to the score.' },
  { id: 'how-to-increase', question: 'How do I increase domain authority?', answer: 'By earning links from sites that are strong themselves and related to your industry: trade media coverage based on your own data, resources that others like to cite, mentions of your company turned into links, and recovered links to deleted pages. Mass links from weak sites do little here, because the score takes the weaker of two signals, and the risk of a Google penalty is real.' },
  { id: 'ccbot', question: 'Does blocking the CCBot robot in robots.txt lower the score?', answer: 'No. We calculate the score from links that point to your domain from other websites, so blocking the Common Crawl robot on your own website does not lower it. What matters is whether the robot visits the pages that link to you.' },
  { id: 'google-rankings', question: 'Does domain authority affect Google rankings?', answer: 'Google does not use our score or any other authority measure from SEO tools. The score shows how firmly a domain is embedded in the web of links, and links are one of Google’s ranking factors. It is an indicator, not the cause of a ranking.' },
  { id: 'how-many-domains', question: 'How many domains can I check?', answer: `Up to ${AUTORYTET.limitIp} domains per day from one IP address. Each domain counts separately: checking your own domain with three competitors uses four. Below the result we show how many checks you have left today.` },
  { id: 'do-you-store-results', question: 'Do you store the results?', answer: 'We record the check in our panel to count the daily limit and to send the report you ask for. We do not publish a list of the domains checked or their scores.' },
  { id: 'authority-and-ai-visibility', question: 'Does domain authority matter for AI visibility?', answer: 'AI models do not use our score. But the same work that raises it, coverage in trade media and brand mentions, makes it more likely that ChatGPT or Gemini will name your business. You can check whether they already do with our free AI visibility tool.' },
];

function AutorytetEn() {
  return (
    <Uklad
      locale="en"
      slug="autorytet-domeny"
      tag="Free tool"
      schema={{
        name: 'Domain authority checker',
        description: 'A free domain authority checker: a 0-100 score calculated by AI SEO COMPANY from the public Common Crawl link graph, the domain’s position in the graph and a comparison with up to three competitors, no email needed.',
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.en),
        featureList: [`A 0-100 domain authority score from the Common Crawl link graph (release ${AUTORYTET.wydanie})`, `Rank and percentile among ${en(AUTORYTET.domenPl)} .pl domains`, `A comparison with up to ${AUTORYTET.konkurentow} competitors, no email needed`, 'A description of your level and your gap to the strongest competitor', 'A report with an action plan by email', `Up to ${AUTORYTET.limitIp} domains per day, no sign-up`],
      }}
      lead="A free domain authority checker: a 0‑100 score from the public Common Crawl link graph, your position in the graph and a comparison with up to three competitors in one step. No sign-up and no email."
      narzedzie={<AutorytetClient />}
      odpowiedz={`Domain authority is a rating of how firmly a website is embedded in the web of links, on a scale from 0 to 100. Our domain authority checker calculates it from the public Common Crawl link graph (${en(AUTORYTET.domenWGrafie)} domains, crawls from ${AUTORYTET.okres.en}): the closer other websites are to a domain in this network and the stronger the domains linking to it, the higher the score. It is our own metric, not Ahrefs Domain Rating or Moz Domain Authority. You see the score and the competitor comparison right away and for free.`}
      faq={FAQ_AUTORYTETU_EN}
      tytulFaq="Questions about domain authority"
    >
      <CoDostajesz
        locale="en"
        odRazu={[
          'Your domain authority score on a 0-100 scale from the Common Crawl link graph',
          `Your rank and percentile among ${en(AUTORYTET.domenPl)} .pl domains and your position in the whole graph`,
          'A comparison with up to three competitors on one chart',
          'For .pl domains: the number of linking domains and the five strongest, for competitors too',
          'Your authority level and your gap to the strongest competitor',
          'A counter of today’s checks and a link to the result you can copy',
        ]}
        poEmailu={[
          'A report with the score, the comparison and the data release',
          'An action plan in order: where to start earning links at your score',
          'Which links to avoid so that you do not risk a Google penalty',
        ]}
        przypis="The email does not unlock anything on the page: you see the whole result without it. Every score comes with its data source and the graph release."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.en}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Domain authority checker: an example score of 23 out of 100 with the position in the link graph and a comparison with three competitors on a bar chart"
            podpis="An example result in demo mode: your-company.example and the competitor domains are fictional, and the numbers show typical values for such scores, not data for real websites. You see the result and the comparison without an email; by email we send a report with an action plan. Screenshot from November 12, 2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="what-is-domain-authority" tytul="What is domain authority">
        <p style={s.akapit}>Domain authority is a conventional measure of a website’s strength in the web of links. A link from another website works like a recommendation: the more strong websites point to your domain, the easier it is for a search engine to treat it as a trustworthy source. Google does not publish its own authority number, so the SEO industry relies on measures from tools, and each tool calculates it from its own link database.</p>
        <p style={s.akapit}>We calculate our score ourselves from the public Common Crawl link graph. It is a number from 0 to 100: the higher it is, the closer the domain is to the centre of the network and the stronger the domains linking to it. A score of 0 means that the data contains no links to the domain or that the domain is not in the graph at all.</p>
        <p style={s.akapit}>Next to the score we also show the domain’s rank among the {en(AUTORYTET.domenPl)} .pl domains in the graph and its percentile, that is the share of .pl domains with a worse position in the graph. For domains with other endings we give the position in the whole graph, which has {en(AUTORYTET.domenWGrafie)} domains.</p>
      </Sekcja>

      <Sekcja id="how-we-calculate-the-score" tytul="How we calculate the score from Common Crawl data">
        <p style={s.akapit}>Common Crawl is a US non-profit foundation that regularly crawls public web pages and makes the data available for free. From the links found on those pages it builds a graph: a node is a domain and an edge is a link from one domain to another. The current release, {AUTORYTET.wydanie}, was built from three crawls from {AUTORYTET.okres.en} and has {en(AUTORYTET.domenWGrafie)} domains and {AUTORYTET.krawedzi.en} edges between them. The file with domain positions was published on 22 October 2026. Source: <a href={AUTORYTET.notatka} {...zewn}>Common Crawl release note</a>.</p>
        <p style={s.akapit}>For every domain Common Crawl gives two ranking positions, and we turn them into a score in four steps:</p>
        <ol style={s.lista}>
          <li><strong>Harmonic centrality.</strong> For every domain, the inverse distances from all other domains, counted in hops along links, are added up. A domain that most of the network reaches by short paths ranks high. A link farm does not shorten those paths, so it is hard to inflate this position with one. According to Boldi and Vigna’s study <a href={AKSJOMATY} {...zewn}>“Axioms for Centrality”</a>, it is the only measure compared there that satisfies all three proposed axioms.</li>
          <li><strong>PageRank.</strong> A link from a domain that itself receives many links weighs more. This measure reflects the number and strength of links better, but it is easier to inflate with spam links.</li>
          <li><strong>The weaker of the two signals.</strong> We take the worse of the two positions. Spam raises PageRank but not centrality. A single link from a very central website raises centrality but not PageRank. Only a domain with both signals strong gets a high score.</li>
          <li><strong>A 0-100 scale.</strong> We turn the position r into a score = 100 × (1 − (log r / log r0)³), where r0 is the number of domains with at least one incoming link ({en(AUTORYTET.r0)} in this release). Position 1,000 is 95 points, 100,000 is 76 and one million is 59.</li>
        </ol>
        <p style={s.akapit}>The scale is logarithmic and gets harder towards the top: at the bottom, 10 points mean roughly a twice better position in the graph, between 40 and 60 points 2.5-3 times for every 10 points, and between 80 and 90 almost 10 times. The formula has the version {AUTORYTET.wzor}. If we change it, the new version will get a new number.</p>
        <p style={s.akapit}>Common Crawl does not calculate this score and is not responsible for it; we use the data it publishes for everyone. We look the domain up in our own copy of the calculated data, so the address you enter is not passed to an outside company.</p>
      </Sekcja>

      <Sekcja id="authority-vs-dr-and-da" tytul="How it differs from Ahrefs Domain Rating and Moz Domain Authority">
        <CompareTable
          id="table-authority-dr-da"
          caption="Our authority score, Ahrefs Domain Rating and Moz Domain Authority"
          columns={[
            { key: 'cecha', label: 'Feature' },
            { key: 'my', label: 'Our score' },
            { key: 'dr', label: 'Domain Rating (Ahrefs)' },
            { key: 'da', label: 'Domain Authority (Moz)' },
          ]}
          rows={[
            { id: 'who', cecha: 'Calculated by', my: 'AI SEO COMPANY', dr: 'Ahrefs', da: 'Moz' },
            { id: 'data', cecha: 'Link data', my: `the public Common Crawl graph, ${en(AUTORYTET.domenWGrafie)} domains`, dr: 'Ahrefs’ own link database', da: 'Moz’s own link database' },
            { id: 'what', cecha: 'What it measures', my: 'the domain’s position in the graph: harmonic centrality and PageRank, the weaker of the two', dr: 'unique linking domains and their own DR', da: 'a machine learning model, mainly based on link data, that predicts the ability to rank' },
            { id: 'scale', cecha: 'Scale', my: '0-100, logarithmic', dr: '0-100, logarithmic', da: '1-100' },
            { id: 'freshness', cecha: 'Freshness', my: `graph releases, each covering 3 months of crawling (now: ${AUTORYTET.okres.en})`, dr: 'continuous, according to Ahrefs', da: 'with Moz index updates' },
          ]}
          przypis={<>Sources: <a href={AHREFS_DR} {...zewn}>Ahrefs Help, “What is Domain Rating (DR)”</a> (accessed 11 November 2026), <a href={MOZ_DA} {...zewn}>Moz, “What is Domain Authority”</a> and <a href={AUTORYTET.zrodlo} {...zewn}>Common Crawl, Web Graphs</a> (accessed 12 November 2026).</>}
        />
        <p style={s.akapit}>We checked how our score agrees with Moz data on its list of the 500 most popular domains (<a href={MOZ_TOP} {...zewn}>Moz Top 500</a>, 441 matched domains, 12 November 2026). The Spearman rank correlation with the number of linking domains according to Moz is about 0.57, and with DA alone about 0.37. That is moderate agreement: the measures order domains similarly, but not in the same way. PageRank alone agreed with Moz better (0.72), but it gave inflated scores to small Polish domains with spam links, so we do not use it on its own. We have not yet measured the agreement in the middle of the scale, where most businesses are.</p>
        <p style={s.akapit}>Four domains from our tests, including our own ai-seo-company.pl, show the difference: all of them score 9 with us, while their DR according to Ahrefs measurements from 11 November 2026 ranged from 0 to 54, depending on the domain and the DR version. Two of them owed their high DR to spam links. So do not convert our score into DR or DA. Compare domains using one metric and stick to it in later checks.</p>
      </Sekcja>

      <Sekcja id="how-to-read-the-result" tytul="How to read the result against competitors">
        <p style={s.akapit}>The number alone says little. A score of 25 can be strong for a clinic in a mid-sized city and weak for a shop competing for nationwide keywords. That is why the tool compares you with up to three competitors right away, with no email.</p>
        <h3 style={s.h3}>Who to enter as a competitor</h3>
        <p style={s.akapit}>The companies in Google’s top 10 for your most important keywords, not the biggest brands in your industry. Search for the phrase customers use to find you and take the domains from the first results, skipping portals and directories. If you compete locally, compare yourself with companies in the same city.</p>
        <h3 style={s.h3}>Score levels</h3>
        <ul style={s.lista}>
          <li><strong>0-9, very low:</strong> typical of new and small websites. About 60% of .pl domains in the graph score 10 points or less.</li>
          <li><strong>10-24, low:</strong> the domain already has links, but few from strong sites. Often enough for local and niche keywords.</li>
          <li><strong>25-44, medium:</strong> a solid position in the web of links. About 5% of .pl domains score more than 30 points.</li>
          <li><strong>45-69, high:</strong> a strong position, the level of well-known companies and large shops. Less than 1% of .pl domains score more than 50 points.</li>
          <li><strong>70-100, very high:</strong> the largest websites. About 340 .pl domains score more than 70 points.</li>
        </ul>
        <p style={s.przypis}>The level thresholds are ours, set on the distribution of .pl domain scores in the {AUTORYTET.wydanie} release. Treat them as a guide: the comparison with competitors is what decides.</p>
        <h3 style={s.h3}>Example scores for reference</h3>
        <CompareTable
          id="table-authority-examples"
          caption={`Authority score of selected domains, release ${AUTORYTET.wydanie}`}
          columns={[
            { key: 'domena', label: 'Domain' },
            { key: 'wynik', label: 'Score' },
            { key: 'miejsce', label: 'Rank among .pl domains' },
          ]}
          rows={PRZYKLADY.map((x) => ({ id: x.id, domena: x.domena, wynik: String(x.wynik), miejsce: x.miejscePl ? en(x.miejscePl) : 'not applicable' }))}
          przypis="Source: our calculations from the Common Crawl link graph, 12 November 2026."
        />
        <p style={s.akapit}>Large shops come out lower with us than portals: x-kom.pl and mediaexpert.pl score 67-68 and rossmann.pl 52, although they are well-known brands with many links. Their weaker signal is centrality, and the score takes the weaker signal. If you compare yourself with a shop, keep in mind that its lead in links may be bigger than the score shows.</p>
        <h3 style={s.h3}>How we describe your gap to the strongest competitor</h3>
        <ul style={s.lista}>
          <li><strong>You have the highest score:</strong> on links these companies are not ahead of you. You build an edge with content and with links to the pages that sell.</li>
          <li><strong>A gap of up to 5 points:</strong> content and how well a page matches the question decide rankings more often than the link profile.</li>
          <li><strong>5 to 20 points:</strong> a clear advantage in links for the competitor. You need links from industry sites and media, not only better content.</li>
          <li><strong>More than 20 points:</strong> the scale is logarithmic, so this takes months. Start with keywords for which the competitor has no strong pages.</li>
        </ul>
        <p style={s.przypis}>The 5 and 20 point thresholds are also ours and approximate. They are a starting point for decisions about links, not a ranking forecast.</p>
      </Sekcja>

      <Sekcja id="how-to-increase-domain-authority" tytul="How to increase domain authority">
        <p style={s.akapit}>The order below comes from our SEO playbook, which we follow with clients: from the actions that bring the most at the lowest risk.</p>
        <h3 style={s.h3}>Tactics in order of return</h3>
        <ol style={s.lista}>
          <li><strong>Digital PR based on your own data.</strong> A report, study or ranking from company data, offered to trade and general media. It brings the highest quality links and brand mentions, which also count in AI answers.</li>
          <li><strong>Resources that earn links on their own.</strong> Calculators, tools, benchmarks and templates earn links without outreach.</li>
          <li><strong>Unlinked mentions.</strong> Find pages that mention your company without linking to it and ask for a link. It is the most effective request in all outreach.</li>
          <li><strong>Link recovery.</strong> Redirect links that point to 404 pages, for example after a redesign, to the right addresses, or ask for a correction.</li>
          <li><strong>Guest posts and partnerships, but selectively.</strong> Only on sites with real traffic on your topic.</li>
        </ol>
        <p style={s.akapit}>Local businesses have extra link sources: sponsorships, local media, trade organisations and business partners. A Google Business Profile and directories with an identical name, address and phone number build the base, although the links from them are weak.</p>
        <h3 style={s.h3}>How to judge a link before you get it</h3>
        <ul style={s.lista}>
          <li>The site gets Google traffic for keywords from your industry.</li>
          <li>It is related to what you do.</li>
          <li>The link sits in the body of an article, not in the footer or sidebar.</li>
          <li>The site is not a directory that sells links to anyone.</li>
        </ul>
        <p style={s.akapit}>Avoid link networks (PBN), mass link exchanges and link exchange systems, and forum comments at scale. The risk of a penalty is real and the value of such links is close to zero. A high score on a site that sells posts guarantees nothing either: check it here and see whether it has real traffic.</p>
        <h3 style={s.h3}>What to measure</h3>
        <ul style={s.lista}>
          <li>The number of domains linking to the pages that sell, not to the whole site.</li>
          <li>Brand mentions and searches for your company name: a good proxy for authority.</li>
          <li>Traffic from the publications you earned.</li>
        </ul>
        <p style={s.akapit}>Check our score after every new data release, with the same list of competitors. New links show up in it with a delay: the Common Crawl robot first has to visit the page with the link, and the graph covers three months of crawling.</p>
      </Sekcja>

      <Sekcja id="how-to-use-the-result" tytul="How to use the result">
        <ul style={s.lista}>
          <li>Compare your score with companies that rank in the top 10 for your most important keywords. A big gap means content alone may not be enough.</li>
          <li>Check the score after every graph release. A drop while the number of domains in the graph stays similar usually means lost links, for example after a partner’s site shuts down.</li>
          <li>When choosing places to publish, check the site’s score: a link from a strong, thematically related site is worth more than dozens of weak ones.</li>
          <li>After a website migration or a domain change, compare the score with the release from before. A drop signals that some links point to addresses that no longer exist.</li>
        </ul>
      </Sekcja>

      <Sekcja id="linking-domains-explained" tytul="Linking domains: what we show and how to read it">
        <p style={s.akapit}>For .pl domains we show, next to the score, the number of linking domains: different domains with at least one link to yours. We do not count links themselves: a hundred links from one site are one domain. We also show the five strongest linking domains, ordered by our score, and the same number for competitors in the comparison table.</p>
        <p style={s.akapit}>The range is very wide. In this release 129,587 .pl domains have no link at all, and almost every second one of the rest (44%) has just one linking domain. The biggest portals have tens of thousands. So read the number together with the score: twenty-odd domains from a farm of cheap domains give a count but no strength, and the score sees that. Look at the five strongest: if they are sites you know and trust, the profile is healthy; if they are random addresses, the number means little.</p>
        <p style={s.akapit}>Importantly, this is not a full backlink index. The data comes from one quarterly Common Crawl crawl and covers only domains the robot visited, so the real number is usually higher. We do not know page addresses, anchor texts or dofollow attributes, and we do not give numbers for domains outside .pl. Do not compare the number with commercial tools, because each has its own database.</p>
      </Sekcja>

      <Sekcja id="what-the-tool-does-not-show" tytul="Limits: what the score does not show">
        <ul style={s.lista}>
          <li><strong>The state of a release, not of today.</strong> The data covers crawls from {AUTORYTET.okres.en}. A link you earn today will show up in the next graph release at the earliest.</li>
          <li><strong>New domains are not in the graph.</strong> A domain that no page visited by the Common Crawl robot links to gets 0 and the label “not in the graph”.</li>
          <li><strong>No full list of links.</strong> For .pl domains we show the number of linking domains and the five strongest, but this is a lower bound from one crawl, not a full index. We do not know page addresses, anchor texts or dofollow attributes, and we do not guess them. We do not give the number for domains outside .pl.</li>
          <li><strong>The robot does not see the whole web.</strong> Links from pages the Common Crawl robot did not visit do not count in the score.</li>
          <li><strong>Small domains differ little.</strong> Many small websites have a similar position, so they get the same score. Our four test domains all score 9, although their link profiles differ.</li>
          <li><strong>Large shops come out lower.</strong> Some well-known e-commerce brands score 49-68 with us, less than their number of links would suggest.</li>
          <li><strong>Domains outside .pl from the top only.</strong> We keep all .pl domains, and from the rest only the top {en(AUTORYTET.limitInnych)} positions in the graph. For other domains outside .pl we show “≤ {AUTORYTET.maksPozaZbiorem}”.</li>
          <li><strong>A domain, not a page.</strong> The score describes the whole domain. Subdomains such as blog.company.com count together with company.com, because that is how the Common Crawl graph groups them.</li>
          <li><strong>An indicator, not a cause.</strong> Google does not use our score. The ranking of a specific page also depends on the links to it and its content.</li>
          <li><strong>A limit.</strong> Up to {AUTORYTET.limitIp} domains per day from one IP address. Each competitor counts as one domain.</li>
        </ul>
        <p style={s.akapit}>We analyse the full link profile, that is who links to you, which links are risky and what you lack compared with competitors, as part of our <Link href="/pozycjonowanie-stron-internetowych" style={s.podkreslenie}>SEO services</Link>. You can check the technical side and content of your own website in the <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>free SEO audit</Link>.</p>
      </Sekcja>

      <Poradniki pozycje={PORADNIKI_AUTORYTETU} locale="en" />
      <PozostaleNarzedzia bez="/narzedzia/autorytet-domeny" locale="en" />
    </Uklad>
  );
}
