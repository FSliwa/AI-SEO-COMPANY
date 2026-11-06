// Silnik porównań (PLAN-v2 7 SIL, 6.0, 6.1–6.4, 6.14; TS-03, CB-08, CB-15; wdrożenie 5.11.2026).
// Jedno źródło treści dla /porownania (hub) i /porownania/[slug]: strona, karta huba, ItemList,
// JSON-LD (ComparisonSchema) i FAQPage (AppleFaq) biorą dane stąd, więc nie mogą się rozjechać.
//
// Czysty ESM z importami względnymi (bez aliasu @/): działa w Next, w sitemapie i w testach node.
// Publikację strony włącza wyłącznie lib/publikacja.js (rejestr PUBLIKACJA); wpis tutaj bez flagi
// w rejestrze nie trafi do generateStaticParams (parametryPl), sitemapy ani huba.
//
// Pola wpisu (CB-08, brief P1 p. 15):
//   slug, title (50–60 zn., bez „| AI SEO COMPANY”), description (≤ 150 zn.), h1 (jedno na stronie)
//   okruszek     - 3. poziom okruszków i BreadcrumbList (Strona główna › Porównania › okruszek)
//   nazwaKarty   - tytuł karty w hubie i nazwa w ItemList
//   teaser       - 1–2 zdania na kartę huba, INNE niż answer (brief huba p. 2.3, playbook 5.5)
//   kryteria     - liczba kryteriów tabeli na karcie huba
//   decyzja      - wiersz tabeli „Przed jaką decyzją stoisz?” w hubie
//   tag, ujawnienie, zrodlaDanych - nad i pod H1 (pasek autora i źródeł)
//   answer       - „Krótka odpowiedź” (AnswerBox, 40–60 słów, HTML)
//   published, updated - datePublished / dateModified w JSON-LD i data w <Byline />.
//                  updated zmieniać TYLKO przy realnej zmianie treści (CLAUDE.md); ta sama data
//                  musi być w LASTMOD (lib/lastmod.js) dla adresu strony.
//   columns, rows, tableCaption, tablePrzypis, tableId - tabela główna (CompareTable z <caption>)
//   sections[]   - { id, h2, html, tabela?: 'glowna' | { id, caption, columns, rows, przypis },
//                    htmlPo?, uwaga?, checklista?, h3?: [{ id, h3, html, tabela?, htmlPo? }] }
//                  id stałe (kotwice), hierarchia H1 → H2 → H3 bez przeskoków.
//   faqTytul, faq[] - { question, answer } (AppleFaq generuje FAQPage)
//   sources[]    - { url, nazwa, data } renderowane w <Zrodla /> (tylko źródła bez nazw agencji:
//                  art. 16 UZNK; nazwy i URL-e agencji są w zrodlaWewnetrzne, NIE renderowane)
//   zrodlaWewnetrzne[] - pliki i adresy, z których pochodzą liczby (dla audytu, poza HTML)
//   aiQuestions[] - pytania z koszyka AI (PLAN-v2 9.6, skille/ai-visibility/koszyk-30-pytan.csv)
//   cta          - { tekst, plan|null, linki: [{ tekst, href }] }; plan = data-plan w <a href="#kontakt">
//   about        - pole about w JSON-LD Article
//
// Linki do stron z rejestru publikacji idą przez hrefJesliOpublikowana (reguła 6.0). Zdanie,
// którego jedynym celem jest link do nieopublikowanej strony, znika w całości (bez placeholderów,
// playbook 5.5), a nie zostaje jako tekst bez linku.
//
// Tabela z nazwami agencji (brief P1 p. 8.3) świadomie NIE jest w kodzie: decyzja D3 i art. 16 UZNK.

import { hrefJesliOpublikowana } from './publikacja';
import { PANEL_DEMO_URL } from './panel';
import { CHECKLIST_COUNT } from './agencySwitch';

const BASE = 'https://www.ai-seo-company.pl';

// --- Pomocnicze ------------------------------------------------------------------------------

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const ax = (href, tekst) => `<a href="${href}" rel="noopener">${tekst}</a>`;

/** Zdanie z linkiem do strony z rejestru publikacji albo '' (strona jeszcze nie zwraca 200). */
function zdanieJesli(href, zdanie) {
  const h = hrefJesliOpublikowana(href);
  return h ? zdanie(h) : '';
}

const liczba = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const zl = (n) => `${liczba(n)} zł`;

// --- P2: pomiar źródeł przeglądu AI a TOP 10 (CB-05) -------------------------------------------
// JEDNO pole danych do podmiany. Dziś: pojedynczy pomiar z dane/serp.json (4.11.2026, 18:48),
// 20 fraz z listą źródeł przeglądu AI, bez „aeo” (status celny, nie marketing), przeliczenie
// skille/content-brief-porownania/dane/aio-vs-top10.json. Po skrypcie MS1 (3 migawki 20 fraz
// w różne dni, PLAN-v2 8.1 W2) wpisać typ: 'mediana', medianę w procent i cytowania, zakres
// procentów, daty pomiarów - tekst sekcji, wiersz tabeli 8 kryteriów i przypis zmienią się same.
// Krótka odpowiedź P2 mówi „co czwarta domena” (PLAN-v2 6.2): po MS1 sprawdzić, czy nadal pasuje.
export const POMIAR_AIO = {
  typ: 'pojedynczy', // 'pojedynczy' | 'mediana'
  daty: ['2026-11-04'],
  frazSprawdzonych: 30,
  frazZPrzegladem: 30,
  frazPorownanych: 20,
  cytowan: 141,
  domen: 85,
  wTop10: 40,
  procent: 28,
  zakresProcent: null, // np. '24–31' po MS1
  youtube: 5, // fraz (z 20), w których youtube.com był źródłem przeglądu AI
  // „seo vs geo”: źródła przeglądu AI obecne w TOP 10 w trzech pobraniach 4–5.11.2026
  // (dane/serp.json 18:48: 5/9, serp-4.json 20:27: 0/9, serp-12-2026-11-05.json: 0/9).
  seoVsGeo: { min: 0, max: 5, z: 9, pobran: 3 },
};

function dataPl(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${Number(m[3])}.${m[2]}.${m[1]}` : iso;
}

function tekstPomiaru(p) {
  const kiedy = p.typ === 'mediana'
    ? `W dniach ${p.daty.map(dataPl).join(', ')} sprawdzaliśmy`
    : `${Number(p.daty[0].slice(8, 10))} listopada 2026 sprawdziliśmy`;
  const wynik = p.typ === 'mediana'
    ? `Mediana z ${p.daty.length} pomiarów: ze ${liczba(p.cytowan)} cytowań (${p.domen} domen) tylko ${p.wTop10}, czyli ${p.procent}% (zakres ${p.zakresProcent}%), pochodziło z domen obecnych w TOP 10.`
    : `Ze ${liczba(p.cytowan)} cytowań (${p.domen} domen) tylko ${p.wTop10}, czyli ${p.procent}%, pochodziło z domen obecnych w TOP 10.`;
  return `${kiedy} w Google (Polska, komputer, dane DataForSEO) ${p.frazSprawdzonych} fraz z naszej branży. Przegląd AI pojawił się przy ${p.frazZPrzegladem === p.frazSprawdzonych ? 'wszystkich' : p.frazZPrzegladem}. Przy ${p.frazPorownanych} z nich porównaliśmy jego źródła z pierwszą dziesiątką wyników organicznych. ${wynik} Wysoka pozycja pomaga, ale nie wystarcza.`;
}

function zastrzezeniePomiaru(p) {
  return p.typ === 'mediana'
    ? `Mediana z ${p.daty.length} pomiarów (${p.daty.map(dataPl).join(', ')}), jedna lokalizacja i jedno urządzenie. Wyniki Google i przeglądu AI zmieniają się z dnia na dzień. Aktualizujemy co miesiąc.`
    : `Jeden pomiar (${dataPl(p.daty[0])}), jedna lokalizacja i jedno urządzenie. Wyniki Google i przeglądu AI zmieniają się z dnia na dzień. Aktualizujemy co miesiąc.`;
}

// --- Hub /porownania (PLAN-v2 6.1, brief-hub-porownania.md) ------------------------------------

const P3_OPUBLIKOWANE = () => Boolean(hrefJesliOpublikowana('/porownania/seo-czy-google-ads'));

export const HUB = {
  sciezka: '/porownania',
  title: 'Porównania przed wyborem agencji SEO i modelu współpracy',
  // Recenzja 6.11.2026: opis i lead wymieniały „SEO czy Google Ads”, choć P3 czeka na D9.
  // Getter: wersja z P3 dopiero, gdy P3 jest opublikowane (lib/publikacja.js).
  get description() {
    return P3_OPUBLIKOWANE()
      ? 'Za efekt czy abonament, SEO czy GEO, SEO czy Google Ads: porównania z danymi, źródłami i datą aktualizacji. Bez ocen na oko.'
      : 'Za efekt czy abonament, SEO czy GEO: porównania z danymi, źródłami i datą aktualizacji. Bez ocen na oko.';
  },
  h1: 'Porównania przed wyborem agencji SEO i modelu współpracy',
  // Lead zamiast AnswerBox (6.1); tekst z briefu huba p. 4.
  get lead() {
    return P3_OPUBLIKOWANE()
      ? 'Zanim podpiszesz umowę z agencją SEO, warto rozstrzygnąć trzy sprawy: jak się rozliczać, w które kanały inwestować i czy oprócz Google liczy się już widoczność w ChatGPT. Każde porównanie poniżej ma tabelę, źródła i datę aktualizacji. Jesteśmy agencją SEO, więc przy każdym porównaniu piszemy wprost, co sami sprzedajemy.'
      : 'Zanim podpiszesz umowę z agencją SEO, warto rozstrzygnąć dwie sprawy: jak się rozliczać i czy oprócz Google liczy się już widoczność w ChatGPT. Każde porównanie poniżej ma tabelę, źródła i datę aktualizacji. Jesteśmy agencją SEO, więc przy każdym porównaniu piszemy wprost, co sami sprzedajemy.';
  },
  // = dzień wdrożenia partii 1 (W3, 23–27.11.2026); Integracja ustawia tę samą datę w LASTMOD.
  // Integracja 5.11.2026: robocza data wdrożenia partii 1 = LASTMOD (lib/lastmod.js); poprawić na dzień wdrożenia w obu miejscach.
  published: '2026-11-06',
  updated: '2026-11-06',
  cta: { tekst: 'Masz ofertę innej agencji? Porównamy ją z naszą w 24 h w dni robocze', plan: 'przeglad-agencji' },
};

/**
 * Akapit metody (brief huba p. 7). Wymienia tylko źródła opublikowanych porównań: dane z kampanii
 * Google Ads dopiero z P3; danych z naszej Search Console żadne porównanie dziś nie używa (D10/D12),
 * więc ich nie wymieniamy. Zdanie „nie porównujemy się z nazwanymi agencjami” usunąć, jeśli D3 = nazwy.
 */
export function akapitMetodyHuba() {
  const zrodla = ['cenników i regulaminów agencji', 'wyników Google pobranych przez DataForSEO', 'naszych testów odpowiedzi modeli AI'];
  if (hrefJesliOpublikowana('/porownania/seo-czy-google-ads')) zrodla.push('danych z naszej kampanii Google Ads');
  const lista = `${zrodla.slice(0, -1).join(', ')} i ${zrodla[zrodla.length - 1]}`;
  return `Każde porównanie powstaje z danych, które da się sprawdzić: ${lista}. Pod każdą tabelą podajemy źródło i datę. Nie przyznajemy gwiazdek ani ocen jakości i nie porównujemy się z nazwanymi agencjami. Dane odświeżamy co najmniej raz na kwartał, a datę aktualizacji widzisz przy każdym porównaniu.`;
}

// --- P1: za efekt czy abonament (PLAN-v2 6.3; brief P1 z 5.11; CB-02, CB-03, CB-13, CB-14) -----

const P1 = {
  slug: 'pozycjonowanie-za-efekt-czy-abonament',
  title: 'Pozycjonowanie za efekt czy abonament? Porównanie 2026',
  description: 'Za efekt czy abonament? Porównanie w 10 kryteriach, modele rozliczeń 17 agencji, koszt przy 20 frazach i zapisy umowy do sprawdzenia.',
  h1: 'Pozycjonowanie za efekt czy abonament: co wybrać w 2026?',
  okruszek: 'Za efekt czy abonament',
  nazwaKarty: 'Pozycjonowanie za efekt czy abonament',
  teaser: 'Ile agencji w Polsce rozlicza się za wynik, ile kosztuje każdy model przy 20 frazach i które zapisy umowy sprawdzić przed podpisem.',
  kryteria: '10 kryteriów',
  decyzja: { pytanie: 'Płacić agencji za pozycje czy za pracę?', skrot: 'Za efekt obniża koszt startu, abonament obejmuje cały serwis' },
  tag: 'Porównanie modeli rozliczeń',
  zrodlaDanych: 'Dane: cenniki, regulaminy i opisy współpracy 17 agencji SEO (stan na 25.10.2026), wyniki Google pobrane przez DataForSEO (4–5.11.2026).',
  // CB-03 (54 słowa): 17 = 5 + 11 + 1.
  answer: 'Dla większości małych i średnich firm lepszy jest abonament albo model mieszany. Rozliczenie za efekt obniża koszt na starcie, ale płacisz za pozycje fraz z umowy, nie za zapytania od klientów, a rachunek rośnie razem z wynikami. Z 17 sprawdzonych agencji 5 uzależnia część wynagrodzenia od wyniku, 11 nie, a jedna nie podaje modelu.',
  // = dzień wdrożenia partii 1 (W3); Integracja ustawia tę samą datę w LASTMOD.
  // Integracja 5.11.2026: robocza data wdrożenia partii 1 = LASTMOD (lib/lastmod.js); poprawić na dzień wdrożenia w obu miejscach.
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-10-kryteriow',
  tableCaption: 'Pozycjonowanie za efekt, abonament i model mieszany: porównanie w 10 kryteriach (stan: listopad 2026)',
  tablePrzypis: 'Źródło: opracowanie AI SEO COMPANY na podstawie cenników i regulaminów 17 agencji SEO (stan na 25.10.2026).',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'efekt', label: 'Za efekt' },
    { key: 'abonament', label: 'Abonament' },
    { key: 'mieszany', label: 'Model mieszany' },
  ],
  // Brief P1 p. 8.1 (źródła komórek w zrodlaWewnetrzne).
  rows: [
    { kryterium: 'Za co płacisz', efekt: 'Za wynik: najczęściej dni lub miesiące fraz w TOP 10, rzadziej ruch albo konwersje; zwykle obok opłaty stałej', abonament: 'Za uzgodniony zakres prac: audyt, technika, treści, linki, wizytówka', mieszany: 'Opłata stała za prace + premia za uzgodniony wynik' },
    { kryterium: 'Kto wybiera frazy', efekt: 'Zwykle agencja proponuje listę do umowy; ryzyko fraz o małym popycie', abonament: 'Ustalacie razem i zmieniacie w trakcie', mieszany: 'Cele premiowane w umowie, reszta elastycznie' },
    { kryterium: 'Koszt, gdy wyniki rosną', efekt: 'Rośnie z liczbą fraz w TOP 10, do limitu, jeśli jest w umowie', abonament: 'Stały', mieszany: 'Stały + premia z limitem' },
    { kryterium: 'Koszt, gdy wyników nie ma', efekt: 'Niski: opłata stała, jeśli jest', abonament: 'Pełny', mieszany: 'Opłata stała' },
    { kryterium: 'Zakres pracy', efekt: 'Skupiony na frazach z umowy', abonament: 'Cały serwis: technika, treści, linki, wizytówka', mieszany: 'Cały serwis z naciskiem na cele premiowane' },
    { kryterium: 'Pomiar', efekt: 'Pozycja w narzędziu agencji; wynik zależy od lokalizacji i urządzenia', abonament: 'Raport prac + KPI: ruch, zapytania', mieszany: 'KPI z Twoich kont (Search Console, GA4) wpisane do umowy' },
    { kryterium: 'Umowa', efekt: 'W naszej próbie także umowy 12+ miesięcy przy niskich budżetach', abonament: 'Od miesięcznej do 36 miesięcy; wypowiedzenie 1–3 miesiące, jeśli agencja je publikuje', mieszany: 'Jak abonament' },
    { kryterium: 'Widoczność w AI (ChatGPT, przegląd AI)', efekt: 'Poza rozliczeniem: liczy się pozycja w zwykłych wynikach', abonament: 'Może być w zakresie prac (np. pomiar co tydzień)', mieszany: 'Może być jednym z celów' },
    { kryterium: 'Co zostaje po zakończeniu', efekt: 'Zależy od umowy; w naszej próbie jedna agencja utrzymuje linki tylko w czasie umowy', abonament: 'Zależy od umowy: sprawdź zapis o treściach, linkach i kontach', mieszany: 'Jak abonament' },
    { kryterium: 'Dla kogo', efekt: 'Lokalna firma z kilkoma frazami o znanej wartości, która chce ograniczyć ryzyko startu', abonament: 'Firma, która rozwija cały serwis i mierzy zapytania', mieszany: 'Firma, która chce przewidywalnego kosztu i wspólnego celu z agencją' },
  ],
  sections: [
    {
      id: 'czym-sie-roznia',
      h2: 'Czym różnią się oba modele',
      html: [
        '<p>W modelu <strong>rozliczenia za efekt</strong> płacisz za osiągnięty wynik, najczęściej za frazy, które w dniu pomiaru są na pierwszej stronie Google. Zwykle obok tej części jest opłata stała. Hasła „płatność za efekt” i „pozycjonowanie za efekty” oznaczają w ofertach to samo.</p>',
        '<p>W <strong>abonamencie</strong> płacisz stałą kwotę za uzgodniony zakres prac: audyt, poprawki techniczne, treści, linki i prowadzenie wizytówki Google. Kwota nie zależy od tego, ile fraz jest w danym miesiącu wysoko.</p>',
        '<p><strong>Model mieszany</strong> łączy oba podejścia: opłata stała pokrywa pracę, a premia albo rekompensata zależy od celu zapisanego w umowie. Różnica między modelami sprowadza się do tego, kto ponosi ryzyko startu i co dokładnie trafia na fakturę.</p>',
      ].join(''),
      h3: [
        {
          id: 'co-to-jest-efekt',
          h3: 'Co agencje nazywają „efektem”',
          html: [
            '<p>„Efekt” w umowie może znaczyć trzy różne rzeczy:</p>',
            '<ul><li>pozycję frazy w pierwszej dziesiątce albo pierwszej trójce, liczoną za każdy dzień albo według stanu z jednego dnia w miesiącu;</li><li>ruch z bezpłatnych wyników wyszukiwania;</li><li>konwersje, czyli formularze, telefony albo zakupy.</li></ul>',
            '<p>W naszej próbie 17 agencji są oba warianty z opłatą stałą: dopłata za każdy dzień, w którym fraza jest w TOP 10, z limitem miesięcznym, oraz stała podstawa plus wynagrodzenie za konwersje, których wartość ustala się przed startem. Poza próbą trafiliśmy na ofertę, w której pozycję sprawdza się raz w miesiącu, w ostatni dzień roboczy. Zanim podpiszesz umowę, zapytaj, czy pozycja jest liczona codziennie, czy z jednego dnia, kto ją mierzy i z jakiej lokalizacji.</p>',
          ].join(''),
        },
      ],
    },
    {
      id: 'porownanie-10-kryteriow',
      h2: 'Pozycjonowanie za efekt czy abonament: porównanie w 10 kryteriach',
      tabela: 'glowna',
      htmlPo: [
        '<p>Rozliczenie za efekt przenosi ryzyko startu na agencję: dopóki fraz nie ma na pierwszej stronie, płacisz mało albo nic. Abonament przenosi na Ciebie inne ryzyko, czyli słabej pracy, za którą płacisz tyle samo co za dobrą.</p>',
        '<p>Dlatego w obu modelach najważniejsze są dwie rzeczy: pomiar z Twoich kont (Search Console, GA4) i umowa, która pozwala odejść, gdy wyniki nie przychodzą.</p>',
      ].join(''),
    },
    {
      id: 'jak-rozliczaja-sie-agencje',
      h2: 'Jak rozliczają się agencje w Polsce: 17 ofert',
      // Akapit 9.1 w brzmieniu CB-13 (bez zdania „modelu tylko za pozycje nie znaleźliśmy”).
      html: '<p>Sprawdziliśmy cenniki, regulaminy i opisy współpracy 17 agencji SEO działających w Polsce (stan na 25.10.2026). 11 z nich rozlicza się bez komponentu za efekt (abonament, pula godzin albo projekt), pięć uzależnia część wynagrodzenia od wyniku – w czterech opisanych przypadkach obok opłaty stałej – a jedna nie podaje modelu rozliczeń. Model „płacisz wyłącznie za frazy na 1. stronie” istnieje, ale poza naszą próbą: wśród wyników Google dla frazy „pozycjonowanie za efekt” 5.11.2026 była oferta 99 lub 149 zł netto miesięcznie za frazę, rozliczana według pozycji z ostatniego dnia roboczego miesiąca. Okres wypowiedzenia publikuje tylko 6 z 17 agencji: cztery podają około miesiąca, dwie trzy miesiące.</p>',
      tabela: {
        id: 'tabela-17-agencji',
        caption: 'Modele rozliczeń i warunki 17 agencji SEO w Polsce (stan na 25.10.2026)',
        columns: [{ key: 'cecha', label: 'Cecha' }, { key: 'liczba', label: 'Liczba agencji z 17' }],
        rows: [
          { cecha: 'Rozlicza się bez komponentu za efekt (abonament, pula godzin, projekt)', liczba: '11' },
          { cecha: 'Uzależnia część wynagrodzenia od wyniku (za efekt, success fee, KPI)', liczba: '5' },
          { cecha: '…w tym opisana opłata stała + część zmienna', liczba: '4' },
          { cecha: 'Nie podaje modelu rozliczenia', liczba: '1' },
          { cecha: 'Publicznie krytykuje albo odrzuca rozliczanie za pozycje', liczba: 'co najmniej 6' },
          { cecha: 'Publikuje cenę „od” albo widełki', liczba: '12' },
          { cecha: 'Publikuje okres wypowiedzenia', liczba: '6 (4 × ok. 1 miesiąc, 2 × 3 miesiące)' },
        ],
        przypis: 'Metoda: strony ofertowe, cenniki, OWU i regulaminy agencji oraz profile w katalogach, sprawdzone 25.10.2026. Nie oceniamy jakości usług. Jesteśmy jedną z agencji na rynku: AI SEO COMPANY nie jest wliczona do 17.',
        minWidth: 420,
      },
      htmlPo: '<p>Próba: 7 dużych agencji z pierwszej dziesiątki wyników Google na frazę „agencja seo”, 3 marki jednej grupy kapitałowej, 3 agencje, które najmocniej sprzedają pozycjonowanie w AI, 2 firmy najbliższe nam modelem współpracy i 2 liderzy wyników w Mapach Google w Warszawie.</p>',
    },
    {
      id: 'koszt-20-fraz',
      h2: 'Ile kosztuje każdy model: przykład dla 20 fraz',
      html: [
        '<p>Koszt w modelu za efekt liczymy wzorem: koszt = S + n × s, gdzie S to opłata stała, n to liczba fraz z umowy na pierwszej stronie Google w dniu pomiaru, a s to stawka za frazę. Abonament to stała kwota A. Założenia przykładu:</p>',
        '<ul>',
        '<li>czysty model za efekt: S = 0 zł, s = 99 albo 149 zł netto miesięcznie za frazę (oferta z pierwszej dziesiątki wyników Google dla frazy „pozycjonowanie za efekt”, sprawdzona 5.11.2026; minimum 4 frazy, pomiar w ostatni dzień roboczy miesiąca);</li>',
        '<li>model mieszany: S = 300 zł, s = 100 zł (ilustracja; opłatę stałą 300 zł podaje w opublikowanym przykładzie jedna z agencji z naszej próby);</li>',
        `<li>abonament: A = ${zl(1900)} netto, czyli nasz pakiet SEO Standard (do 20 fraz, 2 treści i 2 linki miesięcznie).</li>`,
        '</ul>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-20-fraz',
        caption: 'Miesięczny koszt pozycjonowania w zależności od liczby fraz na 1. stronie Google (zł netto, stan: listopad 2026)',
        columns: [
          { key: 'n', label: 'Fraz na 1. stronie (n)' },
          { key: 'e99', label: 'Za efekt, 99 zł za frazę' },
          { key: 'e149', label: 'Za efekt, 149 zł za frazę' },
          { key: 'mix', label: 'Mieszany: 300 zł + 100 zł za frazę (ilustracja)' },
          { key: 'abo', label: 'Abonament SEO Standard w AI SEO COMPANY (1 900 zł netto, stała kwota)' },
        ],
        // Wyliczone ze wzoru (S + n × s); progi sprawdzone w CB-13.
        rows: [0, 4, 6, 10, 13, 16, 20].map((n) => ({
          id: `n-${n}`,
          n: String(n),
          e99: zl(n * 99),
          e149: zl(n * 149),
          mix: zl(300 + n * 100),
          abo: zl(1900),
        })),
        przypis: 'Modele obejmują różny zakres prac. Stawki 99 i 149 zł za frazę oraz 499 zł ryczałtu pochodzą z oferty sprawdzonej 5.11.2026.',
      },
      h3: [
        {
          id: 'prog-oplacalnosci',
          h3: 'Próg opłacalności: kiedy za efekt wychodzi drożej',
          // Akapit 9.2 (brief P1 z 5.11): 19 × 99 = 1 881; 12 × 149 = 1 788; (1 900 − 300) / 100 = 16;
          // 6 × 99 = 594 > 499; 4 × 149 = 596 > 499.
          html: '<p>Model za efekt jest tańszy od abonamentu, dopóki S + n × s &lt; A. Przy stawce 99 zł za frazę i abonamencie 1 900 zł próg wypada przy 19 frazach na 1. stronie, przy stawce 149 zł przy 12, a w modelu mieszanym z opłatą stałą 300 zł i stawką 100 zł przy 16. Powyżej progu płacisz więcej niż w abonamencie, a agencja nadal pracuje tylko nad frazami z umowy. Ten sam dostawca, który liczy 99 lub 149 zł za frazę, oferuje stałą opłatę 499 zł miesięcznie, czyli rozliczenie za efekt wychodzi u niego drożej już przy 6 albo 4 frazach. Dlatego w modelu za efekt pilnuj limitu miesięcznego.</p>',
        },
      ],
    },
    {
      id: 'pozycja-to-nie-klikniecia',
      h2: 'Pozycja to nie kliknięcia: co zmienia przegląd AI',
      // 9.3-A w brzmieniu CB-14 (bez danych z naszej Search Console: D10/D12).
      html: [
        '<p>Pozycja w pierwszej dziesiątce nie gwarantuje ruchu. 4 listopada 2026 sprawdziliśmy 30 fraz z branży SEO (Google, Polska, komputer, dane DataForSEO): przy każdej Google pokazał przegląd AI z gotową odpowiedzią i własną listą źródeł. Klient może więc dostać odpowiedź, zanim kliknie którykolwiek wynik. Dlatego w umowie lepiej rozliczać zapytania od klientów niż pozycje fraz.</p>',
        zdanieJesli('/porownania/seo-vs-geo', (h) => `<p>Czym praca nad obecnością w takich odpowiedziach różni się od klasycznego pozycjonowania, opisujemy w porównaniu ${a(h, 'SEO a GEO')}.</p>`),
        zdanieJesli('/porownania/seo-czy-google-ads', (h) => `<p>Jeśli rozważasz reklamy zamiast pozycjonowania, zobacz porównanie ${a(h, 'SEO czy Google Ads')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-za-efekt',
      h2: 'Kiedy wybrać rozliczenie za efekt',
      html: [
        '<p>Rozliczenie za efekt ma sens, gdy spełniasz większość tych warunków:</p>',
        '<ul>',
        '<li>masz 3–10 fraz o znanej wartości, sprawdzonych w Planerze słów kluczowych Google Ads;</li>',
        '<li>prowadzisz usługę lokalną, w której kilka fraz przynosi większość zapytań;</li>',
        '<li>umowa ma limit miesięcznej opłaty;</li>',
        '<li>pozycje są mierzone na Twoim koncie Search Console, a nie tylko w narzędziu agencji;</li>',
        '<li>nie ma opłaty za wyjście, a treści i linki zostają u Ciebie po zakończeniu współpracy.</li>',
        '</ul>',
        '<p>Jeśli frazy z umowy nie mają popytu, wysoka pozycja nie przyniesie klientów, a faktura i tak przyjdzie.</p>',
      ].join(''),
    },
    {
      id: 'kiedy-abonament',
      h2: 'Kiedy wybrać abonament',
      html: [
        '<p>Pozycjonowanie w abonamencie lepiej pasuje, gdy:</p>',
        '<ul>',
        '<li>rozwijasz cały serwis: technikę, treści, wizytówkę Google i linki;</li>',
        '<li>mierzysz zapytania z formularzy i telefonów w GA4, a nie same pozycje;</li>',
        '<li>chcesz zmieniać listę fraz w trakcie, gdy zobaczysz, które przynoszą klientów;</li>',
        '<li>zależy Ci na widoczności w odpowiedziach ChatGPT i w przeglądzie AI, której model za efekt zwykle nie obejmuje.</li>',
        '</ul>',
        `<p>Warunek: jawny zakres prac i comiesięczna lista zmian. U nas postęp i dziennik prac widać w ${a('/panel-klienta', 'panelu klienta z pomiarem co tydzień')}.</p>`,
      ].join(''),
    },
    {
      id: 'model-mieszany',
      h2: 'Model mieszany: abonament z premią albo z celem',
      html: [
        '<p>Model mieszany występuje w dwóch wariantach:</p>',
        '<ul><li>opłata stała za pracę i premia za uzgodniony wynik, z górnym limitem premii;</li><li>abonament z celem zapisanym w umowie i rekompensatą, jeśli cel nie zostanie osiągnięty.</li></ul>',
        // Ujawnienie 9.4; zgodne z components/FairDeal.jsx (top3Rules) i sekcją #cel-top-3 na cenniku.
        `<p>Sami jesteśmy agencją, więc mamy interes w tym porównaniu. Nasz model to abonament z celem: umowa miesięczna, frazy lokalne wpisane do umowy, cel TOP 3 w 2–3 miesiące mierzony w Google Search Console i w Mapach, a jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł. Nie gwarantujemy pozycji nr 1: Google w poradniku „Czy potrzebujesz specjalisty SEO?” zaznacza, że nikt nie może jej zagwarantować. Wyjątki i sposób pomiaru opisują ${a('/cennik-pozycjonowania#cel-top-3', 'zasady celu TOP 3')}.</p>`,
      ].join(''),
    },
    {
      id: 'umowa',
      h2: 'Umowa: 6 zapisów do sprawdzenia przed podpisem',
      html: [
        '<ol>',
        '<li>Okres umowy i wypowiedzenie: na jak długo, z jakim terminem i w jakiej formie można ją wypowiedzieć.</li>',
        '<li>Opłaty aktywacyjne i opłaty za wcześniejsze wyjście.</li>',
        '<li>Kto mierzy efekt i skąd: narzędzie, lokalizacja, urządzenie i dzień pomiaru.</li>',
        '<li>Limit miesięcznej opłaty w modelu za efekt.</li>',
        '<li>Własność treści, linków i kont: Search Console, GA4, wizytówka Google.</li>',
        '<li>Automatyczne przedłużenie umowy po okresie początkowym.</li>',
        '</ol>',
        '<p>Warunki wypowiedzenia podaje na stronie tylko 6 z 17 agencji z naszej próby, więc zwykle trzeba o nie zapytać wprost. W ogólnych warunkach jednej z agencji umowa po okresie początkowym sama przechodzi w bezterminową, a przy wcześniejszym wypowiedzeniu klient płaci opłatę aktywacyjną z cennika.</p>',
        `<p>Jak przejąć konta i dane przy zmianie wykonawcy, opisujemy w poradniku ${a('/zmiana-agencji-seo', 'jak zmienić agencję SEO bez kar')}. Nasze warunki to ${a('/cennik-pozycjonowania#uczciwa-umowa', 'sześć zasad uczciwej umowy')}.</p>`,
      ].join(''),
      // YMYL-P (PLAN-v2 6.3, przegląd prawny D5): dopisek do czasu ramki „Sekcję o umowie sprawdził…”.
      uwaga: 'To nie jest porada prawna. Przy umowie na dużą kwotę pokaż ją prawnikowi.',
      checklista: {
        naglowek: `Pobierz checklistę ${CHECKLIST_COUNT} punktów: co sprawdzić w umowie i co zabrać od agencji (PDF)`,
        plan: 'checklista_umowa_porownanie',
        idPrefiks: 'cl-p1',
      },
    },
    {
      id: 'bez-umowy-terminowej',
      // AV-12 (64 zn.).
      h2: 'Pozycjonowanie bez umowy terminowej: jak działa umowa miesięczna',
      html: [
        '<p>Umowa miesięczna to zwykle umowa bez określonego końca, którą wypowiadasz z miesięcznym wyprzedzeniem, często e-mailem. Pozycjonowanie bez umowy terminowej nie oznacza pracy bez umowy: zakres, cena i zasady wyjścia nadal są na piśmie, tylko nie wiążą Cię na rok czy dwa. Agencja musi wtedy co miesiąc pokazywać postęp, bo klient może odejść, gdy go nie widzi.</p>',
        `<p>U nas tak działają pakiety SEO Standard i SEO Premium, bez opłat za wyjście; Booster Pack z nową stroną wymaga minimum 3 miesięcy. Co zabrać od agencji przed wypowiedzeniem i jak wysłać samo wypowiedzenie, opisujemy w poradniku ${a('/zmiana-agencji-seo', 'o wypowiedzeniu umowy z agencją SEO')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o rozliczenie za efekt',
  // Brief P1 p. 11 (wersje 5.11); FAQ 3 = CB-13, FAQ 8 = CB-03 (59 słów + link do #cel-top-3).
  // FAQ 1: „za ten sam zakres pracy” zamienione (CB-13: modele obejmują różny zakres prac).
  // FAQ 6: bez „nad wynikami” (CB-14: zapisane SERP-y nie mają pozycji bloku przeglądu AI).
  faq: [
    {
      question: 'Czy pozycjonowanie za efekt się opłaca?',
      answer: 'Opłaca się, gdy frazy z umowy mają realny popyt i przynoszą zapytania, a umowa ma limit miesięczny. Policz próg: przy stawce 99 zł netto za frazę na 1. stronie Google model za efekt jest tańszy od abonamentu za 1 900 zł do 19 fraz, przy 149 zł do 12 fraz. Powyżej progu rachunek przewyższa abonament.',
    },
    {
      question: 'Co agencje nazywają „efektem” w umowie?',
      answer: 'Najczęściej pozycję frazy w TOP 10 lub TOP 3, liczoną za każdy dzień albo za stan z jednego dnia w miesiącu, np. ostatniego dnia roboczego. Rzadziej ruch z wyników organicznych albo konwersje, na przykład formularz lub telefon. Przed podpisaniem sprawdź, kto mierzy pozycję, jakim narzędziem i z jakiej lokalizacji, oraz czy umowa ma limit miesięcznej opłaty.',
    },
    {
      question: 'Czy przy rozliczeniu za efekt płaci się opłatę stałą?',
      answer: 'Zależy od oferty. W naszym zestawieniu 17 agencji pięć uzależnia część wynagrodzenia od wyniku i w czterech opisanych przypadkach łączy to z opłatą stałą. Na rynku są też oferty bez opłaty stałej, na przykład 99 lub 149 zł netto miesięcznie za każdą frazę, która w ostatni dzień roboczy miesiąca jest na 1. stronie Google.',
    },
    {
      question: 'Czy można pozycjonować stronę bez długiej umowy?',
      answer: 'Tak. Część agencji pracuje na umowach bezterminowych z miesięcznym wypowiedzeniem: w naszym zestawieniu cztery z 17 publikują wypowiedzenie około miesiąca, dwie podają trzy miesiące, a reszta go nie ujawnia. U nas SEO Standard i Premium to umowa miesięczna, wypowiadana e-mailem, bez opłat za wyjście.',
    },
    {
      question: 'Jak sprawdzić, czy agencja nie wybrała łatwych fraz?',
      answer: 'Poproś o wolumen każdej frazy z umowy według Planera słów kluczowych Google Ads i porównaj listę z zapytaniami, na które masz już wyświetlenia w Search Console. Fraza bez wolumenu albo z nazwą Twojej firmy wchodzi do TOP 10 niemal sama, więc nie powinna być podstawą rozliczenia.',
    },
    {
      question: 'Czy model za efekt obejmuje widoczność w ChatGPT i przeglądzie AI?',
      answer: 'Zwykle nie, bo rozlicza pozycję w zwykłych wynikach Google. Tymczasem 4.11.2026 przegląd AI pojawił się we wszystkich 30 sprawdzonych przez nas frazach z branży SEO, a jego źródła to nie zawsze strony z pierwszej dziesiątki. Widoczność w AI mierz osobno, na stałej liście pytań.',
    },
    {
      question: 'Ile kosztuje pozycjonowanie w abonamencie?',
      answer: `W naszym zestawieniu 12 z 17 agencji podaje cenę „od”: od 490 zł netto miesięcznie za pakiet obejmujący tylko wizytówkę Google do 4 000 zł netto i więcej za stałą obsługę serwisu. Nasz pakiet SEO Standard kosztuje 1 900 zł netto miesięcznie. Szczegóły znajdziesz w ${a('/cennik-pozycjonowania', 'cenniku pozycjonowania')}.`,
    },
    {
      question: 'Po jakim czasie widać efekty pozycjonowania?',
      answer: `Agencje z naszego zestawienia zapowiadają pierwsze efekty zwykle po 3–6 miesiącach, więc w modelu za efekt pierwsze miesiące kosztują zwykle mniej. U nas celem jest TOP 3 dla fraz lokalnych z umowy w 2–3 miesiące. Jeśli po 3 miesiącach celu nie ma, kolejny miesiąc pracujemy za 0 zł (wyjątki: nowa domena, ręczna kara Google, zmiany na stronie bez nas; ${a('/cennik-pozycjonowania#cel-top-3', 'zasady celu TOP 3')}).`,
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO?', data: '2026-11-05' },
    { url: 'https://ads.google.com/home/tools/keyword-planner/', nazwa: 'Google Ads: Planer słów kluczowych', data: '2026-11-04' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: wyniki Google (Polska, komputer) dla 30 fraz z branży SEO', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'analiza-konkurencji-2026-10-25/profile/*.md, sekcja 4 „Cennik i warunki” (17 profili, 25.10.2026): 11 / 5 / 4 / 1 / ≥ 6 / 12 / 6 (CB-02)',
    'grupatense.md:55–62 (stała + dni w TOP 10 z limitem; 300 zł + 400 zł; 12+ mies.; linki tylko w czasie umowy), artefakt.md:51 (stała + konwersje)',
    'verseo.md, sekcja 4 (OWU §IX.1 przekształcenie w bezterminową, §IX.4 opłata aktywacyjna przy wcześniejszym wypowiedzeniu)',
    'pozycjonowaniestron.md, sekcja 4 i seogroup.md (umowy do 36 miesięcy)',
    'https://dotspice.com/pozycjonowanie/ (curl 5.11.2026: 99/149 zł netto za frazę, min. 4 frazy, ostatni dzień roboczy, SEO Cloud 499 zł); serp-11-2026-11-05.json poz. 6 — nazwa dostawcy dopiero po D3',
    'dane/serp.json (4.11.2026): przegląd AI na 30/30 fraz; aio-vs-top10.json (źródła przeglądu AI a TOP 10)',
    'components/FairDeal.jsx (top3Rules), components/Pricing.jsx:49 (SEO Standard: do 20 fraz, 2 treści, 2 linki)',
  ],
  aiQuestions: ['Q09', 'Q13'],
  cta: {
    tekst: 'Prześlij ofertę albo umowę obecnej agencji. Sprawdzimy ją według 10 kryteriów z tej strony',
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'Porównaj z naszym cennikiem: SEO od 1 900 zł netto/mies., umowa miesięczna', href: '/cennik-pozycjonowania' }],
  },
  about: [
    { '@type': 'Thing', name: 'Pozycjonowanie za efekt' },
    { '@type': 'Thing', name: 'Abonament SEO' },
  ],
};

// --- P2: SEO a GEO (PLAN-v2 6.2; brief P2 z 5.11; CB-04, CB-05, CB-17) ---------------------------
// „Generative Engine Optimization” pada w widocznej treści RAZ, z linkiem do huba GEO
// (/pozycjonowanie-w-ai), bo to fraza huba (260/mies., frazy.csv:103; kanibalizacja, playbook 3.2).
// Dlatego akapit CB-04 i FAQ 4 opisują rozwinięcie po polsku, a pracę z arXiv cytujemy numerem.
// Sprawdzarka (/sprawdz-widocznosc-w-ai) NIE jest linkowana do T0.2 (dziś 503); bez VideoObject.

const P2 = {
  slug: 'seo-vs-geo',
  title: 'SEO vs GEO: czym się różnią i od czego zacząć w 2026',
  description: 'GEO to optymalizacja pod odpowiedzi ChatGPT, Gemini i przeglądu AI w Google. Porównanie z SEO w 8 kryteriach i nasz pomiar źródeł AI.',
  h1: 'SEO a GEO: różnice, wspólne fundamenty i kolejność działań',
  okruszek: 'SEO a GEO',
  nazwaKarty: 'SEO a GEO',
  teaser: 'Czym optymalizacja pod ChatGPT i przegląd AI różni się od klasycznego SEO i dlaczego tylko co czwarta domena cytowana przez AI jest w TOP 10.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Czy ChatGPT i przegląd AI wymagają osobnej pracy?', skrot: 'Fundamenty wspólne, miara sukcesu inna' },
  tag: 'Porównanie: SEO i pozycjonowanie w AI',
  zrodlaDanych: 'Dane: wyniki Google dla 30 fraz z branży SEO (DataForSEO, 4.11.2026), testy odpowiedzi modeli AI (4–5.11.2026).',
  // PLAN-v2 6.2 (53 słowa); „co czwarta” potwierdzić medianą z MS1 przed publikacją (CB-05).
  answer: `SEO to praca nad pozycją strony w wynikach Google, a GEO (${a('/pozycjonowanie-w-ai', 'Generative Engine Optimization')}) nad tym, czy ChatGPT, Gemini, Perplexity i przegląd AI w Google wymieniają Twoją firmę w odpowiedzi. Fundamenty są wspólne, ale w naszym pomiarze tylko co czwarta domena cytowana w przeglądzie AI była też w TOP 10 tej samej frazy.`,
  // Integracja 5.11.2026: robocza data wdrożenia partii 1 = LASTMOD (lib/lastmod.js); poprawić na dzień wdrożenia w obu miejscach.
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-8-kryteriow',
  tableCaption: 'SEO i GEO: porównanie w 8 kryteriach (listopad 2026)',
  tablePrzypis: `Źródła: nasz pomiar źródeł przeglądu AI (Google, Polska, komputer, DataForSEO, ${dataPl(POMIAR_AIO.daty[POMIAR_AIO.daty.length - 1])}) i nasz cennik (listopad 2026).`,
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'seo', label: 'SEO' },
    { key: 'geo', label: 'GEO' },
  ],
  rows: [
    { kryterium: 'Cel', seo: 'Pozycja strony i kliknięcie z wyników wyszukiwania', geo: 'Wzmianka lub cytat firmy w odpowiedzi modelu AI' },
    { kryterium: 'Gdzie działa', seo: 'Google i Bing: wyniki organiczne i Mapy', geo: 'ChatGPT, Perplexity, Gemini, Copilot oraz przegląd AI i tryb AI w Google' },
    { kryterium: 'Miara sukcesu', seo: 'Pozycja, CTR, kliknięcia, zapytania z formularza i telefonu', geo: 'Odsetek odpowiedzi z nazwą firmy, cytowane adresy URL, miejsce na liście poleceń' },
    { kryterium: 'Narzędzia pomiaru', seo: 'Google Search Console, GA4, monitoring pozycji', geo: 'Stała lista pytań zadawanych modelom co tydzień, ruch z serwisów AI w GA4' },
    { kryterium: 'Co wpływa na wynik', seo: 'Treść odpowiadająca intencji, technika, linki, wizytówka', geo: 'Wzmianki w źródłach, które czytają modele (katalogi, media, fora, wideo), bezpośrednie odpowiedzi z liczbami, spójne dane firmy, a przy przeglądzie AI także indeksacja w Google' },
    { kryterium: 'Stabilność', seo: 'Pozycje zmieniają się w dniach i tygodniach', geo: 'Odpowiedzi różnią się między zapytaniami i tygodniami; ta sama prośba może dać inną listę firm' },
    { kryterium: 'Źródła wyniku', seo: 'TOP 10 jednej frazy', geo: `W naszym pomiarze ${POMIAR_AIO.procent}% cytowań w przeglądzie AI pochodziło z domen z TOP 10 tej samej frazy` },
    { kryterium: 'Koszt u nas', seo: 'Pakiety SEO od 1 900 zł netto miesięcznie', geo: 'Audyt AI 990 zł netto; pomiar i działania w SEO Premium albo +490 zł netto miesięcznie do SEO Standard' },
  ],
  sections: [
    {
      id: 'co-to-jest-geo',
      h2: 'Co to jest GEO',
      html: [
        '<p>GEO to optymalizacja pod wyszukiwarki generatywne, czyli praca nad tym, żeby modele AI z dostępem do internetu wymieniały Twoją firmę i cytowały Twoją stronę, gdy odpowiadają na pytania klientów. W SEO celem jest miejsce na liście wyników i kliknięcie. W GEO liczy się, czy model w ogóle wspomni o firmie, w jakim kontekście i z jakim źródłem.</p>',
        '<p>Dotyczy to ChatGPT z wyszukiwaniem, Perplexity, Gemini i Copilota, a w Google także przeglądu AI i trybu AI. Każde z tych narzędzi korzysta z innych źródeł, więc obecność w jednym nie gwarantuje obecności w pozostałych.</p>',
        `<p>Jak wygląda ta praca u nas, opisujemy na stronie ${a('/pozycjonowanie-w-ai', 'pozycjonowanie w AI (GEO)')}.</p>`,
      ].join(''),
      h3: [
        {
          id: 'dwa-znaczenia',
          h3: 'GEO ma w marketingu dwa znaczenia',
          // CB-04 (korekta: listopad 2023 = arXiv 2311.09735; Perplexity 10 źródeł, nie 8);
          // rozwinięcie skrótu opisane po polsku (patrz komentarz nad P2).
          html: [
            `<p>Skrót GEO bywa mylący. W marketingu od lat oznacza działania geolokalizacyjne: geotargetowanie reklam i pozycjonowanie lokalne. Od listopada 2023 roku, po publikacji pracy naukowej o wyszukiwarkach generatywnych (${ax('https://arxiv.org/abs/2311.09735', 'arXiv 2311.09735')}), coraz częściej znaczy optymalizację pod odpowiedzi modeli AI. Mylą się nawet same modele: w naszych testach z 4 i 5 listopada 2026 model GPT-4.1 mini (OpenAI, przez API, z włączonym wyszukiwaniem) dwa razy opisał GEO jako marketing geolokalizacyjny i nie podał źródła, a Perplexity odpowiedział poprawnie i podał 10 źródeł. Na tej stronie GEO zawsze oznacza optymalizację pod odpowiedzi AI.</p>`,
            '<p>Jeśli prowadzisz firmę lokalną, dotyczą Cię oba znaczenia: klienci szukają Cię w Mapach Google, a część z nich pyta też modele AI, kogo wybrać.</p>',
          ].join(''),
        },
        {
          id: 'skroty',
          h3: 'AEO, AIO, LLMO i AI SEO: czy to to samo?',
          html: '<p>Wszystkie te skróty dotyczą tego samego zjawiska: firma ma się pojawić w odpowiedzi modelu, a nie tylko na liście linków. AEO, czyli Answer Engine Optimization, jest starsze od GEO i powstało przy fragmentach z odpowiedzią w Google i asystentach głosowych. AIO i LLMO to nowsze nazwy, a „AI SEO” to określenie handlowe, którego używają agencje, także my.</p>',
          tabela: {
            id: 'tabela-seo-geo-aeo',
            caption: 'SEO, GEO i AEO: czym się różnią (listopad 2026)',
            columns: [
              { key: 'cecha', label: 'Cecha' },
              { key: 'seo', label: 'SEO' },
              { key: 'geo', label: 'GEO' },
              { key: 'aeo', label: 'AEO' },
            ],
            rows: [
              { cecha: 'Co oznacza', seo: 'Optymalizacja pod wyszukiwarki', geo: 'Optymalizacja pod wyszukiwarki generatywne, czyli modele AI', aeo: 'Optymalizacja pod silniki odpowiedzi' },
              { cecha: 'Cel', seo: 'Pozycja w wynikach', geo: 'Wzmianka w odpowiedzi modelu', aeo: 'Bezpośrednia odpowiedź: fragment, asystent głosowy, odpowiedź AI' },
              { cecha: 'Kiedy termin się przyjął', seo: 'Od lat 90.', geo: 'Od 2023 roku (praca naukowa o GEO)', aeo: 'Wcześniej niż GEO, przy fragmentach z odpowiedzią i asystentach głosowych' },
              { cecha: 'Uwaga', seo: '–', geo: 'AIO, LLMO i „AI SEO” to w praktyce synonimy', aeo: 'W Google sam skrót „aeo” prowadzi do statusu celnego Upoważnionego Przedsiębiorcy' },
            ],
            przypis: 'Status celny przy zapytaniu „aeo”: wyniki Google (Polska, komputer, DataForSEO) z 4.11.2026.',
          },
        },
      ],
    },
    {
      id: 'porownanie-8-kryteriow',
      h2: 'SEO vs GEO w 8 kryteriach',
      tabela: 'glowna',
      htmlPo: '<p>Wniosek z tabeli: fundamenty są wspólne, ale miara sukcesu jest inna. Strona, która nie jest zaindeksowana albo nie odpowiada wprost na pytanie, nie trafi ani do wyników, ani do odpowiedzi modelu. Za to wysoka pozycja nie daje pewności, że model wymieni firmę, bo modele korzystają też z katalogów, mediów, forów i wideo.</p>',
    },
    {
      id: 'nasz-pomiar',
      h2: 'Nasz pomiar: skąd przegląd AI bierze źródła',
      html: [
        `<p>${tekstPomiaru(POMIAR_AIO)}</p>`,
        '<p>Metoda: dla każdej frazy zapisaliśmy listę źródeł przeglądu AI i domeny z pierwszej dziesiątki wyników bezpłatnych. Adresy przekierowań Google rozwinęliśmy do domen, a pojedyncze wyniki, których nie dało się rozwinąć, pominęliśmy. Frazę „aeo” wyłączyliśmy, bo Google łączy ją ze statusem celnym, a nie z marketingiem.</p>',
        `<p>Wynik jest zmienny. Dla frazy „seo vs geo” w ${POMIAR_AIO.seoVsGeo.pobran} pobraniach z 4 i 5 listopada od ${POMIAR_AIO.seoVsGeo.min} do ${POMIAR_AIO.seoVsGeo.max} z ${POMIAR_AIO.seoVsGeo.z} źródeł przeglądu AI było w TOP 10, choć same źródła przeglądu się nie zmieniły. YouTube był wśród źródeł przy ${POMIAR_AIO.youtube} z ${POMIAR_AIO.frazPorownanych} fraz, więc film też może trafić do odpowiedzi.</p>`,
      ].join(''),
      tabela: {
        id: 'tabela-pomiar-aio',
        caption: `Źródła przeglądu AI a TOP 10 tej samej frazy (Google, Polska, komputer, ${POMIAR_AIO.typ === 'mediana' ? 'mediana z pomiarów' : dataPl(POMIAR_AIO.daty[0])})`,
        columns: [{ key: 'miara', label: 'Miara' }, { key: 'wartosc', label: 'Wartość' }],
        rows: [
          { miara: 'Fraz sprawdzonych', wartosc: String(POMIAR_AIO.frazSprawdzonych) },
          { miara: 'Fraz z przeglądem AI', wartosc: String(POMIAR_AIO.frazZPrzegladem) },
          { miara: 'Fraz porównanych (z listą źródeł, bez „aeo”)', wartosc: String(POMIAR_AIO.frazPorownanych) },
          { miara: 'Cytowań w przeglądach AI', wartosc: liczba(POMIAR_AIO.cytowan) },
          { miara: 'Różnych domen wśród cytowań', wartosc: String(POMIAR_AIO.domen) },
          { miara: 'Cytowań z domen obecnych w TOP 10 tej samej frazy', wartosc: `${POMIAR_AIO.wTop10} (${POMIAR_AIO.procent}%${POMIAR_AIO.zakresProcent ? `, zakres ${POMIAR_AIO.zakresProcent}%` : ''})` },
        ],
        przypis: zastrzezeniePomiaru(POMIAR_AIO),
        minWidth: 420,
      },
    },
    {
      id: 'co-dziala-w-obu',
      h2: 'Co działa w obu: indeksacja, encja marki, odpowiedzi do zacytowania',
      html: [
        '<ul>',
        '<li>Indeksacja. Google pisze, że źródłem w przeglądzie AI może być strona zaindeksowana i kwalifikująca się do wyświetlenia w wynikach z fragmentem tekstu. ChatGPT z wyszukiwaniem i Perplexity też czytają strony z sieci, więc poprawna technika i indeksacja w Google i Bing to punkt wyjścia.</li>',
        '<li>Encja marki. Ta sama nazwa, adres i opis firmy na stronie, w wizytówce Google i w katalogach. W naszym teście z 4.11.2026 Perplexity, zapytany o agencję SEO w Warszawie, cytował katalogi firm: Clutch, Sortlist i DesignRush.</li>',
        '<li>Odpowiedzi do zacytowania. Nagłówek w formie pytania, a pod nim akapit, który odpowiada wprost, z liczbą i źródłem. Taki fragment łatwo wyciąć i zacytować, zarówno w wynikach Google, jak i w odpowiedzi modelu.</li>',
        '<li>Dostęp botów. Roboty wyszukiwarek AI (OAI-SearchBot, PerplexityBot, Claude-SearchBot) i Googlebot muszą dostać stronę bez blokady w pliku robots.txt i w zaporze serwera.</li>',
        '</ul>',
        `<p>Te same działania to fundament, na którym opieramy ${a('/pozycjonowanie-stron-internetowych', 'pozycjonowanie stron')}, dlatego przy ograniczonym budżecie nie trzeba wybierać jednego albo drugiego.</p>`,
      ].join(''),
    },
    {
      id: 'czego-nie-robic',
      h2: 'Czego nie robić „pod GEO”',
      html: [
        '<ul>',
        '<li>Nie upychaj fraz ani nazw modeli w tekście. Model streszcza sens strony, więc liczy się jasna odpowiedź, a nie liczba powtórzeń.</li>',
        '<li>Nie traktuj pliku llms.txt jako sposobu na pozycję w Google. Google nie wymienia go wśród warunków, które strona musi spełnić, żeby trafić do przeglądu AI, więc nie zastąpi indeksacji.</li>',
        '<li>Nie kupuj wzmianek, opinii ani linków w pakietach. Google opisuje takie działania w zasadach dotyczących spamu, a fałszywe opinie to także ryzyko prawne.</li>',
        '<li>Nie publikuj w dużej skali tekstów wygenerowanych przez AI bez redakcji. Masowe tworzenie treści bez wartości dla czytelnika Google traktuje jako spam, niezależnie od tego, czy pisał je człowiek, czy model.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'od-czego-zaczac',
      h2: 'Kiedy zacząć od GEO, a kiedy od SEO',
      html: '<p>Kolejność zależy od tego, gdzie dziś szukają Cię klienci i czy Twoja strona jest już w indeksie Google.</p>',
      tabela: {
        id: 'tabela-od-czego-zaczac',
        caption: 'Od czego zacząć: SEO czy GEO (listopad 2026)',
        columns: [
          { key: 'sytuacja', label: 'Sytuacja firmy' },
          { key: 'start', label: 'Zacznij od' },
          { key: 'dlaczego', label: 'Dlaczego' },
        ],
        rows: [
          { sytuacja: 'Firma usługowa działająca w jednym mieście', start: 'SEO lokalne i wizytówka Google, GEO jako pomiar', dlaczego: 'Klienci szukają w Mapach; według raportu Senuto „AI Overviews w Polsce” (v2.0, 27.11.2025, 17,8 mln fraz) przegląd AI pojawia się przy 28,95% wszystkich fraz, ale tylko przy 6,08% fraz o intencji lokalnej' },
          { sytuacja: 'Firma B2B, usługa doradcza, SaaS', start: 'SEO i GEO równolegle', dlaczego: 'Klient pyta modele o porównania i rekomendacje; Perplexity cytuje katalogi branżowe' },
          { sytuacja: 'Nowa domena bez historii', start: 'SEO techniczne i indeksacja', dlaczego: 'Bez indeksacji nie ma czego cytować' },
          { sytuacja: 'Strona z ruchem, ale bez wzmianek w AI', start: 'GEO: wzmianki w źródłach cytowanych przez modele', dlaczego: 'Pozycje już są, brakuje obecności w źródłach' },
        ],
        przypis: 'Źródło danych o intencji lokalnej: Senuto, „AI Overviews w Polsce – 18M słów kluczowych”, v2.0, aktualizacja 27.11.2025 (odczyt 5.11.2026).',
      },
      // PLAN-v2 6.2: P2 → P3 („SEO czy Google Ads”) dopiero po publikacji P3.
      htmlPo: zdanieJesli('/porownania/seo-czy-google-ads', (h) => `<p>Jeśli zamiast SEO albo GEO rozważasz płatne reklamy, zobacz porównanie ${a(h, 'SEO czy Google Ads')}.</p>`),
    },
    {
      id: 'jak-mierzyc-geo',
      h2: 'Jak mierzyć GEO',
      html: [
        '<p>Widoczności w AI nie sprawdzisz jednym pytaniem, bo odpowiedzi zmieniają się między zapytaniami i tygodniami. Działa stała metoda:</p>',
        '<ol>',
        '<li>Lista 20–50 pytań, które zadają Twoi klienci, zapisana raz i niezmieniana między pomiarami.</li>',
        '<li>Te same pytania co tydzień w czterech źródłach: ChatGPT z wyszukiwaniem, Perplexity, Gemini i przegląd AI w Google.</li>',
        '<li>Trzy miary: odsetek odpowiedzi z nazwą lub stroną firmy, adresy cytowanych podstron i domeny, z których modele biorą wiedzę.</li>',
        '<li>Ruch z chatgpt.com i perplexity.ai w Google Analytics 4 jako sygnał, że odpowiedzi prowadzą na stronę.</li>',
        '</ol>',
        `<p>Sam pomiar nie musi być drogi: dane dla 30 pytań co tydzień w ChatGPT i Perplexity kosztują nas około 5 USD miesięcznie (ceny API DataForSEO, listopad 2026). Wyniki takiego pomiaru zobaczysz w zakładce „Widoczność w AI” w ${a(PANEL_DEMO_URL, 'demo panelu klienta')}.</p>`,
        zdanieJesli('/pozycjonowanie-w-ai/chatgpt', (h) => `<p>Skąd ChatGPT bierze firmy, które poleca, opisujemy w poradniku ${a(h, 'pozycjonowanie w ChatGPT')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o SEO i GEO',
  // Brief P2 p. 10; FAQ 6 = CB-17; FAQ 4 bez rozwinięcia po angielsku (patrz komentarz nad P2);
  // FAQ 7 bez zdania o sprawdzarce (T0.2).
  faq: [
    {
      question: 'Czym różni się SEO od GEO?',
      answer: 'SEO poprawia pozycję strony w wynikach wyszukiwania, a GEO zwiększa szansę, że model AI wymieni lub zacytuje firmę w odpowiedzi. W SEO mierzysz pozycje i kliknięcia w Search Console, w GEO odsetek odpowiedzi z nazwą firmy na stałej liście pytań. Fundamenty są wspólne: indeksacja, dobre treści i wzmianki o firmie.',
    },
    {
      question: 'Czy GEO zastąpi SEO?',
      answer: 'Nie, bo odpowiedzi AI w dużej części korzystają ze stron, które wyszukiwarki już zaindeksowały. Zmienia się za to miara sukcesu: 4.11.2026 przegląd AI pojawił się przy wszystkich 30 sprawdzonych przez nas frazach z branży SEO, więc sama pozycja daje mniej kliknięć niż dawniej.',
    },
    {
      question: 'Czy SEO ma jeszcze sens w 2026 roku?',
      answer: 'Tak. Google pokazuje w przeglądzie AI jako źródła strony zaindeksowane i kwalifikujące się do wyświetlenia z fragmentem, a ChatGPT z wyszukiwaniem również czyta strony z sieci. Bez SEO technicznego i dobrych treści model nie ma czego zacytować. Zmienia się raczej to, co mierzysz.',
    },
    {
      question: 'Co to jest GEO w SEO?',
      answer: 'W marketingu skrót GEO ma dwa znaczenia. Dawniej oznaczał działania lokalne, czyli geotargetowanie i SEO lokalne. Od 2023 roku coraz częściej oznacza optymalizację pod odpowiedzi modeli AI, czyli pod wyszukiwarki generatywne. Mylą się nawet same modele: w naszych dwóch testach z 4 i 5.11.2026 GPT-4.1 mini opisał GEO jako marketing geolokalizacyjny.',
    },
    {
      question: 'Czy AEO, AIO i LLMO to to samo co GEO?',
      answer: 'W praktyce tak: AEO, AIO, LLMO i AI SEO opisują pracę nad obecnością firmy w odpowiedziach generowanych przez AI. Różnią się akcentem, nie metodą. Uwaga przy wyszukiwaniu: sam skrót „AEO” Google kojarzy ze statusem celnym Upoważnionego Przedsiębiorcy, a nie z marketingiem.',
    },
    {
      question: 'Ile kosztuje GEO?',
      answer: 'Audyt widoczności w AI kosztuje u nas 990 zł netto i jest zaliczany na pierwszy miesiąc abonamentu. Stały pomiar i działania są w SEO Premium albo kosztują 490 zł netto miesięcznie jako dopłata do SEO Standard. Na rynku w październiku 2026 audyty GEO kosztowały 790–9 000 zł netto, a stała obsługa od 990 zł miesięcznie albo od 900 zł jako dopłata.',
    },
    {
      question: 'Jak sprawdzić, czy ChatGPT poleca moją firmę?',
      answer: 'Zadaj ChatGPT, Perplexity i Gemini kilka pytań, które zadają Twoi klienci, i sprawdź, czy w odpowiedziach pada nazwa albo strona firmy. Rób to co tydzień na tej samej liście pytań, bo odpowiedzi się zmieniają. Pełny pomiar na 30 pytaniach w czterech źródłach obejmuje nasz audyt widoczności w AI.',
    },
  ],
  sources: [
    { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal i in., praca naukowa wprowadzająca pojęcie GEO, arXiv 2311.09735 (listopad 2023)', data: '2026-11-05' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-05' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: zasady dotyczące spamu w wyszukiwarce Google', data: '2026-11-05' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI: roboty OpenAI (OAI-SearchBot, GPTBot)', data: '2026-11-05' },
    { url: 'https://insight.senuto.com/aio-report-2/', nazwa: 'Senuto: AI Overviews w Polsce – 18M słów kluczowych, v2.0 (27.11.2025)', data: '2026-11-05' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: wyniki Google (Polska, komputer) dla 30 fraz z branży SEO', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'skille/content-brief-porownania/dane/aio-vs-top10.json (przeliczenie 20 fraz bez „aeo”: 141 cytowań, 85 domen, 40 w TOP 10 = 28,4%; youtube.com w 5 z 20) — CB-05',
    'dane/serp.json 18:48, serp-4.json 20:27, serp-12-2026-11-05.json („seo vs geo”: 5/9, 0/9, 0/9)',
    'skille/content-brief-porownania/dane/llm-3.json, llm-5.json (GPT-4.1 mini: GEO = geolokalizacja, 0 źródeł), llm-6.json (Perplexity: 10 źródeł) — CB-04',
    'dane/llm.json (4.11.2026): Perplexity, pytanie o agencję SEO w Warszawie → clutch.co, sortlist.com, designrush.com (PLAN-v2 3.4)',
    'analiza-konkurencji-2026-10-25/profile/rynek.md, tabela 1.4 (GEO: audyt 790–9 000 zł, abonament od 990 zł, dopłata od 900 zł) — CB-17',
    'components/GeoPageClient.jsx (990 zł, 490 zł, SEO Premium); PLAN-v2 1.1 pkt 10 (pomiar AI ok. 5 USD/mies. bez Gemini)',
  ],
  aiQuestions: ['Q25'],
  cta: {
    tekst: 'Zamów audyt widoczności w AI (990 zł netto)',
    plan: 'audyt-ai',
    linki: [{ tekst: 'Zobacz, jak prowadzimy pozycjonowanie w AI', href: '/pozycjonowanie-w-ai' }],
  },
  about: {
    '@type': 'DefinedTerm',
    name: 'Generative Engine Optimization',
    alternateName: ['GEO', 'AEO', 'AIO', 'LLMO'],
    description: 'Optymalizacja obecności firmy w odpowiedziach modeli AI i przeglądów AI w wyszukiwarkach.',
  },
};

// --- P3: SEO czy Google Ads (PLAN-v2 6.4; brief P3 z 5.11; CB-06, CB-07) -------------------------
// Za flagą (lib/publikacja.js, opublikowana: false) do decyzji D9 i eksportu z konta Ads 230-348-6643.
// Bez zdania o udziale w wyświetleniach (tylko z eksportu Filipa) i bez liczby leadów (D9).
// Bez kwot w USD i bez zwrotu „dla tych samych fraz” (CB-07).

// Akapit 9.2 briefu P3: TYLKO po rozszerzeniu zgody D9 o datę zatrzymania kampanii (bez przyczyny).
// Po zgodzie wkleić na początek sekcji 'po-wylaczeniu' (P3.sections) i zaktualizować `updated`.
export const AKAPIT_P3_PO_ZGODZIE_D9 = '<p>Nasza kampania przestała się wyświetlać 12 października 2026. Od tego dnia ruch z reklam wynosi zero: płatne kliknięcia nie zostawiają po sobie pozycji ani treści. To, co zostaje, to strona i jej widoczność w wynikach organicznych, którą budujemy osobno.</p>';

const P3 = {
  slug: 'seo-czy-google-ads',
  title: 'SEO czy Google Ads? Koszty, czas efektu i kiedy łączyć',
  description: 'Pozycjonowanie czy Google Ads: koszt kliknięcia z naszej kampanii (7,92 zł), czas do efektu i co zostaje po wyłączeniu budżetu. Kiedy łączyć.',
  h1: 'SEO czy Google Ads: co wybrać i kiedy łączyć oba kanały',
  okruszek: 'SEO czy Google Ads',
  nazwaKarty: 'SEO czy Google Ads',
  teaser: 'Koszt kliknięcia z naszej kampanii, czas do pierwszych zapytań i to, co zostaje po wyłączeniu budżetu.',
  kryteria: '9 kryteriów',
  decyzja: { pytanie: 'Reklamy czy pozycjonowanie?', skrot: 'Ads od razu, SEO na stałe; najczęściej oba' },
  tag: 'Porównanie kanałów',
  zrodlaDanych: 'Dane: nasza kampania Google Ads (26.09–11.10.2026), Planer słów kluczowych przez DataForSEO (4.11.2026), wyniki Google dla 30 fraz (4.11.2026).',
  // PLAN-v2 6.4 (51 słów).
  answer: 'Google Ads daje kliknięcia od pierwszego dnia, ale tylko dopóki płacisz: nasza kampania kosztowała średnio 7,92 zł za kliknięcie (26.09–11.10.2026). SEO daje pierwsze zmiany zwykle po 4–8 tygodniach, za to ruch nie znika po wyłączeniu budżetu. Małej firmie usługowej najczęściej opłaca się połączenie: Ads na start, SEO na stały dopływ zapytań.',
  // Data = dzień publikacji P3 (po D9); dziś = data partii 1, do zmiany przy przełączeniu flagi.
  published: '2026-11-23',
  updated: '2026-11-23',
  tableId: 'tabela-9-kryteriow',
  tableCaption: 'SEO i Google Ads: porównanie w 9 kryteriach (dane z listopada 2026)',
  tablePrzypis: 'Źródła: nasza kampania Google Ads (26.09–11.10.2026), Planer słów kluczowych Google Ads przez DataForSEO (4.11.2026), przeliczenie po kursie średnim NBP 3,9097 zł (tabela 215/A/NBP/2026).',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'seo', label: 'SEO (pozycjonowanie)' },
    { key: 'ads', label: 'Google Ads' },
  ],
  rows: [
    { kryterium: 'Za co płacisz', seo: 'Za pracę: technika, treści, linki, wizytówka; kliknięcia z wyników organicznych są bezpłatne', ads: 'Za każde kliknięcie (aukcja) i ewentualnie za obsługę kampanii' },
    { kryterium: 'Pierwsze efekty', seo: 'Zwykle po 4–8 tygodniach pierwsze zmiany widoczności', ads: 'Od emisji reklamy, po jej zatwierdzeniu' },
    { kryterium: 'Po wyłączeniu budżetu', seo: 'Pozycje słabną stopniowo; treści i linki zostają', ads: 'Kliknięcia z reklam znikają od razu' },
    { kryterium: 'Koszt kliknięcia', seo: '0 zł za samo kliknięcie', ads: 'U nas średnio 7,92 zł (26.09–11.10.2026, limit stawki 18 zł); Planer dla fraz z branży SEO: ok. 37–81 zł' },
    { kryterium: 'Kontrola', seo: 'O kolejności decyduje Google', ads: 'Wybierasz frazy, budżet, godziny i lokalizację' },
    { kryterium: 'Zasięg fraz', seo: 'Jedna strona może zbierać ruch z wielu wariantów pytań', ads: 'Każde kliknięcie kosztuje, budżet wyznacza zasięg' },
    { kryterium: 'Pomiar', seo: 'Search Console i GA4', ads: 'Konto Google Ads i GA4' },
    { kryterium: 'Ryzyko', seo: 'Czas, aktualizacje algorytmu', ads: 'Rosnące stawki, zależność od budżetu' },
    { kryterium: 'Odpowiedzi AI', seo: 'Treści mogą być cytowane w przeglądzie AI i ChatGPT', ads: 'Reklama nie poprawia wyników organicznych ani cytowań' },
  ],
  sections: [
    {
      id: 'czym-sie-roznia',
      h2: 'Pozycjonowanie a Google Ads: czym się różnią',
      html: [
        '<p>Pozycjonowanie (SEO) to praca nad stroną, jej treścią i linkami, żeby Google pokazywał ją wysoko w bezpłatnych wynikach. Za samo kliknięcie w taki wynik nie płacisz. Google Ads to aukcja: płacisz za każde kliknięcie w reklamę, a reklama znika, gdy kończy się budżet.</p>',
        '<p>Ujawniamy interes: prowadzimy pozycjonowanie, nie prowadzimy kampanii Google Ads dla klientów. Nasze dane o Ads pochodzą z promocji własnej strony, więc opisujemy je z perspektywy reklamodawcy, a nie sprzedawcy reklam.</p>',
      ].join(''),
      h3: [
        {
          id: 'slowniczek',
          h3: 'SEO, SEM i PPC: słowniczek',
          html: [
            '<ul>',
            '<li>SEO (pozycjonowanie): praca nad bezpłatnymi wynikami wyszukiwania.</li>',
            '<li>SEM (marketing w wyszukiwarkach): całość działań w wyszukiwarce, czyli pozycjonowanie i płatne reklamy razem.</li>',
            '<li>PPC (pay per click): model płatności za kliknięcie, w którym rozlicza się między innymi Google Ads.</li>',
            '</ul>',
            '<p>„SEO czy SEM” to więc nie wybór między dwiema usługami, tylko między częścią a całością. Pytając o „SEO vs SEM”, ludzie zwykle mają na myśli wybór między pozycjonowaniem a reklamami.</p>',
          ].join(''),
        },
      ],
    },
    {
      id: 'porownanie-9-kryteriow',
      h2: 'SEO vs Google Ads w 9 kryteriach',
      tabela: 'glowna',
      htmlPo: '<p>Najważniejsza różnica nie dotyczy ceny kliknięcia, tylko tego, co zostaje po zakończeniu wydatków. W reklamie płacisz za dostęp do klienta tak długo, jak trwa kampania. W pozycjonowaniu płacisz za pracę, której efekt, czyli treści, linki i widoczność, zostaje po stronie firmy.</p>',
    },
    {
      id: 'koszt-klikniecia',
      h2: 'Ile kosztuje kliknięcie w Google Ads: dane z naszej kampanii',
      // CB-07 (korekta): bez „w całej Polsce” i bez zdania o udziale w wyświetleniach.
      html: '<p>Promowaliśmy naszą stronę w Google Ads na frazy związane z pozycjonowaniem stron. Od 26 września do 11 października 2026 kampania zebrała 213 kliknięć za 1 687,82 zł, czyli średnio 7,92 zł za kliknięcie, w trybie maksymalizacji liczby kliknięć z limitem stawki 18 zł. Planer słów kluczowych podaje dla fraz z naszej branży znacznie wyższe średnie stawki: ok. 37 zł dla „pozycjonowanie stron cennik”, 50 zł dla „agencja seo” i 81 zł dla „pozycjonowanie za efekt” (po kursie NBP z 4.11.2026).</p>',
      tabela: {
        id: 'tabela-cpc-planer',
        caption: 'Średnie stawki za kliknięcie w Planerze słów kluczowych dla fraz z branży SEO (4.11.2026)',
        columns: [{ key: 'fraza', label: 'Fraza' }, { key: 'stawka', label: 'Średnia stawka za kliknięcie' }],
        rows: [
          { fraza: 'pozycjonowanie stron cennik', stawka: 'ok. 37 zł' },
          { fraza: 'agencja seo', stawka: 'ok. 50 zł' },
          { fraza: 'pozycjonowanie za efekt', stawka: 'ok. 81 zł' },
        ],
        przypis: 'Źródło: Planer słów kluczowych Google Ads przez DataForSEO (Polska, 4.11.2026); stawki przeliczone na złote po kursie średnim NBP 3,9097 zł (tabela 215/A/NBP/2026 z 4.11.2026).',
        minWidth: 420,
      },
      htmlPo: [
        '<p>Cena kliknięcia wynika z aukcji: Google bierze pod uwagę stawkę i jakość reklamy, więc ta sama fraza może kosztować różnych reklamodawców różnie. Do kosztu kliknięć dochodzi obsługa kampanii, jeśli zlecasz ją agencji: w naszej próbie 17 agencji ceny obsługi zaczynały się od 600 zł miesięcznie albo wynosiły 14–20% budżetu (stan na 25.10.2026).</p>',
        zdanieJesli('/porownania/pozycjonowanie-za-efekt-czy-abonament', (h) => `<p>Koszt pozycjonowania zależy z kolei od modelu rozliczenia, co opisujemy w porównaniu ${a(h, 'rozliczenie za efekt czy abonament')}.</p>`),
      ].join(''),
    },
    {
      id: 'czas-do-efektu',
      h2: 'Czas do pierwszych zapytań',
      html: [
        '<p>Reklama w Google Ads może zacząć się wyświetlać zaraz po zatwierdzeniu, a Google sprawdza większość reklam w ciągu jednego dnia roboczego. Pierwsze kliknięcia przychodzą więc zwykle w pierwszych dniach kampanii, jeśli budżet i stawki pozwalają reklamie wygrywać aukcje.</p>',
        '<p>W pozycjonowaniu pierwsze zmiany widoczności widać u nas zwykle po 4–8 tygodniach, gdy Google przecrawluje poprawki i nowe treści. Celem dla uzgodnionych fraz lokalnych jest TOP 3 w 2–3 miesiące, a przy nowej domenie bez historii trwa to dłużej.</p>',
      ].join(''),
    },
    {
      id: 'po-wylaczeniu',
      h2: 'Co zostaje po wyłączeniu budżetu',
      html: [
        '<p>Kliknięcia z reklam kończą się w dniu, w którym kampania przestaje się wyświetlać. Nie zostaje po nich ani pozycja, ani treść: płacisz za dostęp do klienta, a nie za rozwój strony.</p>',
        '<p>Po pozycjonowaniu zostaje to, co powstało w trakcie pracy: poprawiona strona, treści, linki i prowadzona wizytówka Google. Bez dalszej pracy pozycje mogą z czasem słabnąć, bo konkurencja nie stoi w miejscu, ale nie znikają z dnia na dzień.</p>',
      ].join(''),
    },
    {
      id: 'przeglad-ai-i-reklamy',
      h2: 'Przegląd AI i reklamy w wynikach Google w 2026',
      html: [
        '<p>4 listopada 2026 sprawdziliśmy w Google 30 fraz z branży SEO (Polska, komputer, dane DataForSEO). Przegląd AI pojawił się przy wszystkich 30, a reklamy tylko przy 4. W naszej branży wynik bezpłatny częściej konkuruje więc z odpowiedzią AI niż z reklamą.</p>',
        `<p>Reklama nie poprawia pozycji w bezpłatnych wynikach ani szans na cytat w przeglądzie AI. Na obecność w odpowiedziach AI pracuje się treścią i wzmiankami o firmie${zdanieJesli('/porownania/seo-vs-geo', (h) => `, co opisujemy w porównaniu ${a(h, 'SEO i GEO')}`)}.</p>`,
      ].join(''),
    },
    {
      id: 'kiedy-co-wybrac',
      h2: 'Kiedy wybrać Google Ads, kiedy SEO, a kiedy łączyć',
      tabela: {
        id: 'tabela-kiedy-co-wybrac',
        caption: 'Google Ads, SEO czy oba kanały: wybór według sytuacji firmy',
        columns: [
          { key: 'sytuacja', label: 'Sytuacja' },
          { key: 'wybierz', label: 'Wybierz' },
          { key: 'dlaczego', label: 'Dlaczego' },
        ],
        rows: [
          { sytuacja: 'Nowa firma, potrzebujesz zapytań w tym miesiącu', wybierz: 'Google Ads + start SEO', dlaczego: 'Ads daje ruch od razu, SEO buduje stały kanał' },
          { sytuacja: 'Sezonowa usługa (np. klimatyzacja latem)', wybierz: 'Ads w sezonie, SEO 2–3 miesiące przed sezonem', dlaczego: 'Reklamę włączasz i wyłączasz, a treść musi zdążyć się zaindeksować' },
          { sytuacja: 'Usługa lokalna z ograniczonym budżetem', wybierz: 'SEO lokalne i wizytówka Google', dlaczego: 'Kliknięcia z Map i wyników organicznych są bezpłatne' },
          { sytuacja: 'Testujesz nową usługę albo cenę', wybierz: 'Google Ads', dlaczego: 'Po 2–4 tygodniach wiesz, które frazy dają zapytania' },
          { sytuacja: 'Wysokie stawki w branży (prawo, medycyna, finanse)', wybierz: 'SEO + mały budżet Ads na frazy z najwyższą konwersją', dlaczego: 'Każde kliknięcie jest drogie, ruch organiczny obniża średni koszt zapytania' },
        ],
      },
      htmlPo: `<p>Jeśli działasz lokalnie w Warszawie, zobacz, jak prowadzimy ${a('/seo-lokalne-warszawa', 'SEO lokalne')}. Przed startem kampanii albo pozycjonowania warto też sprawdzić stronę: ${a('/audyt-seo', 'audyt SEO w 3–5 dni')} pokaże, co blokuje jej widoczność.</p>`,
    },
    {
      id: 'budzet-na-start',
      h2: 'Jak policzyć budżet na start',
      html: [
        '<p>Do obu kanałów wystarczą trzy proste rachunki:</p>',
        '<ul><li>liczba kliknięć = budżet / średni koszt kliknięcia;</li><li>liczba zapytań = kliknięcia × odsetek wizyt, które kończą się formularzem albo telefonem;</li><li>koszt zapytania = budżet / liczba zapytań.</li></ul>',
        '<p>Przykład: kwota naszego pakietu SEO Standard, 1 900 zł, wydana w całości na reklamy przy średnim koszcie 7,92 zł kupuje około 240 kliknięć w miesiącu. Ile z nich zamieni się w zapytania, zależy od strony i oferty. Ten odsetek odczytasz w GA4 dopiero wtedy, gdy formularz, telefon i e-mail są mierzone jako zdarzenia, więc ustaw pomiar przed startem kampanii. Bez niego nie policzysz kosztu zapytania ani w Ads, ani w SEO.</p>',
        `<p>Drugą stronę rachunku, czyli ${a('/cennik-pozycjonowania', 'ile kosztuje pozycjonowanie')}, sprawdzisz w naszym cenniku.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o SEO i Google Ads',
  // Brief P3 p. 10; FAQ 6 = CB-06; FAQ 5 bez przypisania niższego CPC limitowi stawki (CB-07).
  faq: [
    {
      question: 'Co jest tańsze: SEO czy Google Ads?',
      answer: 'Na start tańsze bywa Google Ads, bo płacisz tylko za kliknięcia i możesz zacząć od małego budżetu. W dłuższym okresie zwykle wygrywa SEO, bo kliknięcia z wyników organicznych są bezpłatne. Przykład: 1 900 zł miesięcznie przy naszym średnim koszcie kliknięcia 7,92 zł to około 240 kliknięć z reklam.',
    },
    {
      question: 'Co działa szybciej?',
      answer: 'Google Ads. Reklama zaczyna się wyświetlać po zatwierdzeniu, zwykle w ciągu jednego dnia roboczego, a SEO daje pierwsze zmiany widoczności po 4–8 tygodniach, gdy Google przecrawluje poprawki i nowe treści. Przy nowej stronie albo sezonowej usłudze rozsądnie jest zacząć od reklam i równolegle budować SEO.',
    },
    {
      question: 'Czy reklamy Google Ads poprawiają pozycje w SEO?',
      answer: 'Nie. Google nie przyjmuje opłat za wyższe pozycje w wynikach bezpłatnych, a reklamy wyświetla osobno. Ads pomaga SEO pośrednio: pokazuje, które frazy dają zapytania, zanim zainwestujesz w treści pod nie, i podpowiada, jakie nagłówki klienci klikają.',
    },
    {
      question: 'Czy Google Ads opłaca się małej firmie?',
      answer: 'Opłaca się, gdy koszt pozyskania klienta jest niższy niż zysk z niego. Podziel budżet przez koszt kliknięcia, a liczbę kliknięć pomnóż przez odsetek zapytań i sprzedaży. Bez pomiaru zapytań w GA4 lub Google Ads tego nie policzysz, więc ustaw go przed startem kampanii, nie po.',
    },
    {
      question: 'Ile płaci się za kliknięcie w Google Ads?',
      answer: 'Tyle, ile wynika z aukcji, więc nie ma jednego cennika. W naszej kampanii na frazy o pozycjonowaniu stron średni koszt kliknięcia wyniósł 7,92 zł (213 kliknięć za 1 687,82 zł, 26.09–11.10.2026). Planer słów kluczowych podaje dla fraz z tej branży średnio od ok. 37 do 81 zł; nasza kampania miała limit stawki 18 zł.',
    },
    {
      question: 'Czym się różni SEO od SEM?',
      answer: 'SEO to część SEM. SEM (marketing w wyszukiwarkach) obejmuje zarówno pozycjonowanie, czyli pracę nad bezpłatnymi wynikami, jak i płatne reklamy, np. Google Ads rozliczane za kliknięcie (PPC). Dlatego pytanie „SEO czy SEM” zwykle oznacza w praktyce „pozycjonowanie czy reklamy Google”.',
    },
    {
      question: 'Czy warto płacić za reklamę na frazę, na której jestem w TOP 3?',
      answer: 'Czasem tak: reklama nad wynikiem organicznym zajmuje więcej miejsca i chroni przed konkurencją licytującą Twoją markę. Sprawdź to testem: wyłącz reklamę na 2–4 tygodnie i porównaj łączną liczbę kliknięć i zapytań z obu źródeł w Search Console, Google Ads i GA4.',
    },
  ],
  sources: [
    { url: 'https://support.google.com/google-ads/answer/1722120?hl=pl', nazwa: 'Pomoc Google Ads: proces weryfikacji reklam', data: '2026-11-05' },
    { url: 'https://business.google.com/pl/resources/articles/google-ads-cost/', nazwa: 'Google: ile kosztuje reklama w Google Ads', data: '2026-11-05' },
    { url: 'https://www.google.com/search/howsearchworks/', nazwa: 'Google: jak działa wyszukiwarka (brak opłat za pozycje w wynikach bezpłatnych)', data: '2026-11-05' },
    { url: 'https://ads.google.com/home/tools/keyword-planner/', nazwa: 'Google Ads: Planer słów kluczowych', data: '2026-11-04' },
    { url: 'https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-11-04/?format=json', nazwa: 'NBP: kurs średni USD, tabela 215/A/NBP/2026 z 4.11.2026', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'Konto Google Ads 230-348-6643 (notatka ai-seo-conversion-oct-2026): 26.09–11.10.2026, 213 kliknięć, 1 687,82 zł, CPC 7,92 zł; Max Clicks, limit 18 zł (pl-search-bidding-gate) — liczby potwierdza Filip eksportem przed publikacją',
    'frazy.csv:26, :2, :125 (CPC 9,49 / 12,67 / 20,82 USD) × NBP 3,9097 = 37,10 / 49,54 / 81,40 zł (skille/content-brief-porownania/dane/nbp-usd-2026-11-04.json)',
    'profile foxstrategy.md, artefakt.md, sunrisesystem.md, verseo.md, widoczni.md (obsługa Ads: od 600 zł albo 14–20% budżetu, 25.10.2026)',
    'dane/serp.json (4.11.2026): ai_overview 30/30, paid 4/30',
    'components/PricingClient.jsx (pierwsze zmiany po 4–8 tygodniach; cel TOP 3 w 2–3 miesiące); /audyt-seo (od 1 490 zł netto, curl 5.11.2026)',
  ],
  aiQuestions: ['Q15'],
  cta: {
    tekst: 'Zapytaj o audyt SEO (od 1 490 zł netto)',
    plan: null, // CB-15: opcja „audyt” w formularzu tylko przy ENTRY_OFFER; bez data-plan = cta_click
    linki: [
      { tekst: 'Sprawdź, ile kosztuje pozycjonowanie Twojej strony', href: '/cennik-pozycjonowania' },
      { tekst: 'Audyt SEO w 3–5 dni', href: '/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Search engine optimization' },
    { '@type': 'Thing', name: 'Google Ads' },
  ],
};

// --- P6: jak wybrać agencję SEO (PLAN-v2 6.14, zał. G.3; AV-21 z korektą) ------------------------
// Partia 4 (W12), za bramką. Bez nazw i domen 17 agencji w HTML, bez wiersza naszej firmy w tabeli.
// Liczby zbiorcze z analiza-konkurencji-2026-10-25 (profile + raport.html) - odświeżyć przed publikacją.
// Linki do S2 i P4 pominięte (strony niezbudowane, zbudowana: false w rejestrze).

const P6 = {
  slug: 'jak-wybrac-agencje-seo',
  title: 'Jak wybrać agencję SEO? 12 pytań przed podpisaniem umowy',
  description: 'Jak wybrać agencję SEO: 12 pytań o raporty, konta Google, umowę i pomiar w AI. Dobre odpowiedzi i czerwone flagi, bez rankingu na oko.',
  h1: 'Jak wybrać agencję SEO: 12 pytań przed podpisaniem umowy',
  okruszek: 'Jak wybrać agencję SEO',
  nazwaKarty: 'Jak wybrać agencję SEO: 12 pytań',
  teaser: 'O co zapytać agencję przed podpisem umowy, jak odróżnić konkretną odpowiedź od ogólnika i co publikuje 17 sprawdzonych agencji.',
  kryteria: '12 pytań',
  decyzja: { pytanie: 'Jak sprawdzić agencję przed podpisaniem umowy?', skrot: '12 pytań: konta, umowa, raporty i pomiar w AI' },
  tag: 'Poradnik wyboru agencji',
  ujawnienie: 'Piszemy jako agencja SEO; nie oceniamy innych firm z nazwy.',
  zrodlaDanych: 'Dane: strony ofertowe, cenniki i regulaminy 17 agencji SEO (stan na 25.10.2026), wyniki Google (DataForSEO, 4.11.2026).',
  // PLAN-v2 6.14 (50 słów).
  answer: 'Agencję SEO wybieraj po tym, co sprawdzisz przed umową: czy pokaże przykładowy raport albo demo panelu, czy konta Google, treści i linki zostaną Twoje, jaki jest okres wypowiedzenia, czy mierzy zapytania, a nie same pozycje, i czy podaje cenę przed rozmową. Poniżej 12 pytań z dobrymi odpowiedziami i czerwonymi flagami.',
  // = dzień wdrożenia partii 4 (W12, 25–29.01.2027); do potwierdzenia przy publikacji.
  published: '2027-01-25',
  updated: '2027-01-25',
  tableId: 'tabela-12-pytan',
  tableCaption: '12 pytań do agencji SEO: dobra odpowiedź i czerwona flaga',
  tablePrzypis: 'Opracowanie AI SEO COMPANY na podstawie warunków umów i skarg klientów opisanych w naszej analizie rynku z 25.10.2026 oraz poradnika Google „Czy potrzebujesz specjalisty SEO?”.',
  columns: [
    { key: 'pytanie', label: 'Pytanie do agencji' },
    { key: 'dobra', label: 'Dobra odpowiedź' },
    { key: 'flaga', label: 'Czerwona flaga' },
  ],
  rows: [
    { id: 'raport', pytanie: 'Czy pokażecie przykładowy raport albo demo panelu?', dobra: 'Raport z prawdziwego miesiąca z ukrytymi danymi klienta albo demo panelu bez logowania', flaga: '„Raport zobaczysz po podpisaniu umowy”' },
    { id: 'konta', pytanie: 'Na czyich kontach będą Search Console, GA4, wizytówka Google i konto reklamowe?', dobra: 'Na Twoich; agencja dostaje tylko uprawnienia', flaga: 'Konta zakładane na e-mail agencji albo pod jej kontem menedżera' },
    { id: 'tresci-linki', pytanie: 'Czyje będą treści i linki po zakończeniu współpracy?', dobra: 'Treści przechodzą na Ciebie na piśmie, linki zostają', flaga: 'Linki „wynajmowane” na czas umowy i usuwane po odejściu' },
    { id: 'okres', pytanie: 'Na jak długo jest umowa i jaki jest okres wypowiedzenia?', dobra: 'Umowa miesięczna albo bezterminowa z miesięcznym wypowiedzeniem, bez opłat za wyjście', flaga: '12–24 miesiące z automatycznym przedłużeniem i trzymiesięcznym wypowiedzeniem' },
    { id: 'pomiar', pytanie: 'Co będziecie mierzyć co miesiąc?', dobra: 'Zapytania z formularzy i telefonów oraz kliknięcia z Twojej Search Console i GA4, obok pozycji', flaga: 'Sama lista pozycji z narzędzia agencji' },
    { id: 'cena', pytanie: 'Ile kosztuje współpraca i co dokładnie obejmuje?', dobra: 'Cena podana przed rozmową albo w ofercie razem z zakresem: frazy, treści, linki, godziny', flaga: '„Cena po rozmowie” bez zakresu w ofercie' },
    { id: 'frazy', pytanie: 'Jakie frazy będziecie raportować lub rozliczać?', dobra: 'Lista fraz z wolumenem z Planera słów kluczowych i zapytaniami z Twojej Search Console', flaga: 'Frazy bez wolumenu albo z nazwą firmy, które wchodzą do TOP 10 same' },
    { id: 'gwarancja', pytanie: 'Czy gwarantujecie pierwsze miejsce w Google?', dobra: 'Nie; zamiast gwarancji opis prac i tego, jak będzie mierzony postęp', flaga: 'Gwarancja „TOP 1” albo pozycji w 30 dni' },
    { id: 'kto', pytanie: 'Kto konkretnie będzie pracował nad moją stroną?', dobra: 'Imienny specjalista i bezpośredni kontakt z nim', flaga: 'Tylko infolinia albo opiekun zmieniany bez uprzedzenia' },
    { id: 'zmiany', pytanie: 'Co zmienicie na stronie i czy będę to akceptować?', dobra: 'Lista zmian przed wdrożeniem, Twoja akceptacja i dziennik prac', flaga: 'Zmiany bez informacji i dostęp do strony bez ustalonych zasad' },
    { id: 'ai', pytanie: 'Jak mierzycie widoczność w ChatGPT i przeglądzie AI?', dobra: 'Stała lista pytań, nazwane modele, pomiar co tydzień albo co miesiąc', flaga: 'Obietnica „poleceń w ChatGPT” bez metody pomiaru' },
    { id: 'brak-postepu', pytanie: 'Co się stanie, jeśli po 3 miesiącach nie będzie postępu?', dobra: 'Cel zapisany w umowie i konsekwencja, np. zmiana planu albo rekompensata', flaga: 'Brak celu i brak możliwości wyjścia przed końcem umowy' },
  ],
  sections: [
    {
      id: 'pytania-do-agencji',
      h2: '12 pytań do agencji SEO',
      html: '<p>Zadaj te pytania na pierwszej rozmowie albo poproś o odpowiedzi na piśmie. Dobra agencja odpowie konkretnie i pokaże dokument, raport albo zrzut ekranu. Ogólniki i obietnice bez warunków to sygnał, żeby dopytać albo szukać dalej.</p>',
      tabela: 'glowna',
    },
    {
      id: 'co-sprawdzilismy',
      // AV-21 (korekta, 57 zn.).
      h2: 'Co sprawdziliśmy u 17 agencji SEO: cena, panel, umowa, AI',
      html: '<p>Przed napisaniem tego poradnika przejrzeliśmy strony ofertowe, cenniki, regulaminy i profile w katalogach 17 agencji SEO działających w Polsce. Nie oceniamy ich jakości i nie podajemy nazw: liczby pokazują, czego możesz się spodziewać, zanim zadasz pierwsze pytanie.</p>',
      tabela: {
        id: 'tabela-17-agencji-wybor',
        caption: 'Co publikują agencje SEO: 4 liczby z próby 17 agencji (stan na 25.10.2026)',
        columns: [{ key: 'cecha', label: 'Co sprawdziliśmy' }, { key: 'liczba', label: 'Liczba agencji z 17' }],
        rows: [
          { id: 'cena', cecha: 'Cena „od” albo widełki na stronie', liczba: '12' },
          { id: 'panel', cecha: 'Panel klienta z logowaniem', liczba: '4 (publiczne demo bez logowania: 0)' },
          { id: 'umowa', cecha: 'Okres wypowiedzenia podany na stronie', liczba: '6 (4 × ok. 1 miesiąc, 2 × 3 miesiące)' },
          { id: 'ai', cecha: 'Osobna usługa widoczności w AI (GEO)', liczba: '13' },
        ],
        przypis: 'Źródło: strony ofertowe, cenniki, regulaminy i OWU 17 agencji SEO działających w Polsce oraz ich profile w katalogach, sprawdzone 25.10.2026 (opracowanie AI SEO COMPANY). AI SEO COMPANY nie jest wliczona do 17. Nie oceniamy jakości usług.',
        minWidth: 420,
      },
      htmlPo: '<p>Wniosek: większość agencji podaje cenę wyjściową i sprzedaje pracę nad widocznością w AI, ale tylko mniejszość publikuje warunki wypowiedzenia, a panelu żadnej z nich nie da się obejrzeć bez logowania. Dlatego pytania z tabeli wyżej warto zadać każdej agencji, także tej, która ma jawny cennik.</p>',
    },
    {
      id: 'umowa',
      h2: 'Umowa: 6 zapisów, które chronią firmę',
      html: [
        '<ol>',
        '<li>Czas nieokreślony albo krótki okres początkowy i wypowiedzenie nie dłuższe niż miesiąc, które możesz wysłać e-mailem.</li>',
        '<li>Brak opłat aktywacyjnych i opłat za wcześniejsze wyjście, a jeśli są, kwota wpisana wprost.</li>',
        '<li>Search Console, GA4, wizytówka Google, konto reklamowe i domena na Twojej firmie; agencja ma tylko uprawnienia.</li>',
        '<li>Przeniesienie praw autorskich do treści na Ciebie. Wymaga ono formy pisemnej i obejmuje tylko pola eksploatacji wymienione w umowie (art. 41 i 53 ustawy o prawie autorskim).</li>',
        '<li>Linki zdobyte w trakcie współpracy zostają po jej zakończeniu, a ich lista jest częścią raportu.</li>',
        '<li>Zakres prac i raportowanie: co miesiąc lista wykonanych zmian i wyniki z Twoich kont.</li>',
        '</ol>',
        '<p>Jeśli umowa ma okres próbny, sprawdź, co dzieje się po jego końcu. Klienci opisują na forach prawnych umowy, które po dwóch miesiącach testu same przechodziły na 12 miesięcy bez możliwości wypowiedzenia.</p>',
        `<p>Jak wyjść z obecnej umowy i co zabrać od agencji, opisujemy w poradniku o ${a('/zmiana-agencji-seo', 'zmianie agencji SEO')}.</p>`,
      ].join(''),
      // YMYL-P (PLAN-v2 6.14, D5).
      uwaga: 'To nie jest porada prawna. Przy umowie na dużą kwotę pokaż ją prawnikowi.',
    },
    {
      id: 'raporty-i-konta',
      h2: 'Raporty i dostęp do kont',
      html: [
        '<p>Raport miesięczny powinien odpowiadać na trzy pytania: co agencja zrobiła, co się zmieniło w wynikach i co zrobi w kolejnym miesiącu. Liczby mają pochodzić z Twojej Search Console i GA4, a nie tylko z narzędzia agencji, bo tylko wtedy sprawdzisz je bez pośredników.</p>',
        '<p>W raporcie szukaj zapytań od klientów (formularze, telefony, e-maile), kliknięć z Google i listy zmian na stronie. Same pozycje fraz bez ruchu i zapytań mówią niewiele, zwłaszcza gdy przy frazie pojawia się przegląd AI.</p>',
        `<p>U nas te dane są w ${a('/panel-klienta', 'panelu klienta')}, a jego działanie sprawdzisz bez logowania w ${a(PANEL_DEMO_URL, 'demo panelu')}.</p>`,
      ].join(''),
    },
    {
      id: 'ile-kosztuje',
      h2: 'Ile kosztuje agencja SEO',
      html: [
        '<p>W naszej próbie 12 z 17 agencji podaje na stronie cenę „od” albo widełki. Najniższa kwota, 490 zł netto miesięcznie, dotyczy pakietu obejmującego samą wizytówkę Google. Według zestawienia ofert agencji, które NapoleonCat opublikował we wrześniu 2026, typowy budżet SEO małej i średniej firmy to 2 000–3 500 zł miesięcznie.</p>',
        `<p>Porównując oferty, sprawdzaj, co dokładnie dostajesz za tę kwotę: ile fraz, tekstów i linków miesięcznie, jak wygląda raport i jaki jest okres wypowiedzenia. Nasz pakiet SEO Standard kosztuje 1 900 zł netto miesięcznie i obejmuje do 20 fraz, 2 treści i 2 linki w miesiącu; pozostałe pakiety są w ${a('/cennik-pozycjonowania', 'cenniku pozycjonowania')}.</p>`,
      ].join(''),
    },
    {
      id: 'agencja-czy-freelancer',
      h2: 'Agencja czy freelancer',
      html: [
        '<p>Freelancer bywa tańszy. Według danych platformy Useme średnie zlecenie SEO rozliczone przez nią w 2025 roku wyniosło 2 050 zł. W globalnym zestawieniu Ahrefs (439 dostawców, aktualizacja 08.2024) agencje brały średnio 3 209 USD miesięcznie, a freelancerzy 1 349 USD.</p>',
        '<p>Ważniejsze od ceny są trzy sprawy: kto zastąpi wykonawcę w czasie urlopu lub choroby, czy konta i dane zostaną po Twojej stronie oraz czy umowa i raport są równie konkretne jak w agencji. Pytania z tabeli wyżej działają przy obu wyborach.</p>',
      ].join(''),
    },
    {
      id: 'jak-sprawdzic-agencje',
      h2: 'Jak sprawdzić agencję w Google i w ChatGPT',
      html: [
        '<ul>',
        '<li>Opinie w Mapach Google: ich liczba, daty i to, czy agencja odpowiada na krytyczne opinie.</li>',
        '<li>Profile w katalogach firm, np. Clutch, z opiniami klientów, których tożsamość da się sprawdzić.</li>',
        '<li>Widoczność samej agencji: czy jej strona jest w wynikach na frazy, które sprzedaje.</li>',
        '<li>Odpowiedzi AI: zapytaj ChatGPT i Perplexity o agencję z nazwy i sprawdź, na jakie strony się powołują. Jeśli agencja sprzedaje widoczność w AI, poproś o jej własny pomiar.</li>',
        '</ul>',
        // Sprawdzarka: działa po T0.2 (klucze DataForSEO w panelu); P6 wychodzi w W12.
        `<p>Ten sam test zrobisz dla własnej firmy: ${a('/sprawdz-widocznosc-w-ai', 'bezpłatna sprawdzarka widoczności w AI')} pokaże, czy ChatGPT wymienia Cię w odpowiedziach.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o wybór agencji SEO',
  // PLAN-v2 zał. G.3: 5 FAQ dosłownie (bez dopisków o źródłach - źródła są w sekcji „Źródła”).
  faq: [
    {
      question: 'Ile kosztuje agencja SEO?',
      answer: 'Według zestawienia kb.pl (cennik z 2022 r., tekst z 2023 r.) najmniejsze pakiety kosztowały 500–2 000 zł, a średnie 2 000–10 000 zł miesięcznie, więc porównuj aktualne cenniki. Patrz na zakres, nie na kwotę: liczbę fraz, treści i linków w miesiącu oraz okres wypowiedzenia. U nas pakiety zaczynają się od 1 900 zł netto.',
    },
    {
      question: 'Jakie zapisy w umowie z agencją SEO są niebezpieczne?',
      answer: 'Uważaj na umowy na 12–24 miesiące z automatycznym przedłużeniem, wypowiedzenie dłuższe niż miesiąc, linki „wynajmowane” na czas umowy i brak zapisu, że konta Google, treści i linki należą do Ciebie. Każdy z tych zapisów utrudnia zmianę agencji, gdy wyniki nie przychodzą.',
    },
    {
      question: 'Czy agencja SEO może zagwarantować pierwsze miejsce w Google?',
      answer: 'Nie. Google pisze w poradniku dla właścicieli stron, że nikt nie może zagwarantować pierwszej pozycji w rankingu. Agencja może obiecać zakres prac, sposób pomiaru i termin raportu. Jeśli oferta gwarantuje „TOP 1” albo pozycje w 30 dni, zapytaj, dla jakich fraz i co się stanie, gdy wynik nie przyjdzie.',
    },
    {
      question: 'Jak sprawdzić agencję SEO przed podpisaniem umowy?',
      answer: 'Poproś o wzór umowy i listę kont oraz danych, które zostaną po Twojej stronie. Przeczytaj opinie w Google i na Clutch, a w ChatGPT zapytaj o agencję z nazwy i zobacz, z jakich źródeł model korzysta. Dobra agencja pokaże też, jak wyglądał pierwszy miesiąc pracy u podobnego klienta.',
    },
    {
      question: 'Czy warto wybrać agencję, która zajmuje się też widocznością w AI?',
      answer: 'Tak, jeśli Twoi klienci pytają o usługi w ChatGPT albo widzą przegląd AI w Google. W naszej próbie przegląd AI był nad wynikami dla 30 z 30 sprawdzonych fraz (Google PL, 4.11.2026). Zapytaj agencję, jak mierzy widoczność w AI: ile pytań, w których modelach i jak często.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO?', data: '2026-11-05' },
    { url: 'https://kb.pl/ceny/uslugi-biznesowe/cena-pozycjonowania-stron-www-zobacz-ile-kosztuje-pozycjonowanie-w-google/', nazwa: 'kb.pl: cena pozycjonowania stron www (cennik z 2022 r., tekst z 2023 r.)', data: '2026-10-25' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: ile kosztuje zatrudnienie agencji SEO (11.09.2026)', data: '2026-10-25' },
    { url: 'https://useme.com/pl/blog/ile-zaplacic-freelancerowi/', nazwa: 'Useme: ile zapłacić freelancerowi (dane z rozliczeń 2025)', data: '2026-10-25' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO pricing (439 dostawców, aktualizacja 08.2024)', data: '2026-10-25' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: wyniki Google (Polska, komputer) dla 30 fraz z branży SEO', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'analiza-konkurencji-2026-10-25/profile/*.md sekcja 4 (cena „od” albo widełki: 12 z 17; wypowiedzenie: 6 z 17, 4 × ok. 1 mies., 2 × 3 mies.; CB-02)',
    'analiza-konkurencji-2026-10-25/raport.html („Pełny panel z logowaniem mają 4 z 17”; „Nikt z 17 firm nie ma publicznego demo”); profile sekcja 7',
    'Oferta AI: tabela „AI i GEO: kto co sprzedaje” w raport.html = 13 firm z produktem AI, 4 bez (zgodne z profilami, sekcja 1 „AI/GEO”); podsumowanie raportu mówi „12 z 17” — rozbieżność do potwierdzenia przez Filipa',
    'rynek.md 2.1 (okres testowy 2 mies. → 12 mies., forumprawne.org [A]), 2.2 (art. 53 i 41 ust. 2 pr. aut.; linki wynajmowane), 1.1 (kb.pl, NapoleonCat, Useme, Ahrefs)',
    'ks.md sekcja 4 (Starter lokalny 490 zł: tylko wizytówka + opinie)',
    'dane/serp.json (4.11.2026): przegląd AI na 30/30 fraz',
  ],
  aiQuestions: ['Q10', 'Q11'],
  cta: {
    tekst: 'Prześlij ofertę agencji SEO, którą rozważasz. Sprawdzimy ją według 12 pytań z tej strony',
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'Zobacz nasz cennik i warunki umowy', href: '/cennik-pozycjonowania' }],
  },
  about: [{ '@type': 'Thing', name: 'Wybór agencji SEO' }],
};

// Kolejność = kolejność kart w hubie i pozycji w ItemList.
export const porownania = [P1, P2, P3, P6];

export function porownanieBySlug(slug) {
  return porownania.find((p) => p.slug === slug) ?? null;
}

export function urlPorownania(p) {
  return `${BASE}/porownania/${p.slug}`;
}
