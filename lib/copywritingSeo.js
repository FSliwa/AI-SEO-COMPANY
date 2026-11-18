// Treść strony /copywriting-seo (PL). 18.11.2026, zadanie airSlate "nowa-copywriting".
// Wersja EN: lib/copywritingSeo.en.js (własny tekst pod frazę "SEO copywriting", te same fakty).
//
// Oferta (sprawdzona w kodzie 18.11.2026): copywriting NIE jest sprzedawany osobno. Treści są częścią
// pakietów SEO: components/Pricing.jsx i lib/translations.js (SEO Standard od 1 900 zł netto: do 20 fraz,
// 2 treści i 2 linki miesięcznie; SEO Premium 2 500 zł netto: do 50 fraz, 4 treści, 4 linki; Booster Pack
// 2 500 zł netto z nową stroną, umowa min. 3 miesiące, bez liczby treści w cenniku). Ceny: CENY z
// lib/narzedziaLiczby.js. Audyt jest w cenie każdego pakietu (FAQ cennika).
//
// Znaczniki w tekście: [[/sciezka-pl|tekst linku]] -> link wewnętrzny (klucz routingu PL; w EN adres EN).
// Źródła zewnętrzne tylko z listy ZRODLA (odczyt 2026-11-18).

import { CENY, cena } from './narzedziaLiczby';

export const SCIEZKA = '/copywriting-seo';
export const DATA_AKTUALIZACJI = '2026-11-18';

export const TITLE = 'Copywriting SEO: teksty w pakiecie SEO od 1 900 zł netto';
export const DESCRIPTION = 'Copywriting SEO w pakiecie pozycjonowania: 2 lub 4 treści miesięcznie z briefem, weryfikacją faktów i raportem w panelu. Cennik i darmowe szablony.';

const SEO_STANDARD = `${cena('seoStandard')} netto`;
const SEO_PREMIUM = `${cena('seoPremium')} netto`;

export const PL = {
  breadcrumb: 'Copywriting SEO',
  tag: 'Copywriting SEO · treści w pakiecie SEO',
  h1: 'Copywriting SEO: teksty pod frazę, intencję i sprzedaż',
  odpowiedz:
    `Copywriting SEO to pisanie tekstów, które odpowiadają na pytania klientów i jednocześnie pozycjonują stronę w Google. U nas nie jest osobną usługą: teksty wchodzą w pakiety SEO. SEO Standard od ${SEO_STANDARD} miesięcznie obejmuje 2 treści, a SEO Premium za ${SEO_PREMIUM} 4 treści. Każdy tekst powstaje z briefu, pod jedną frazę i jeden adres URL.`,
  wstep:
    'Nie dostaniesz od nas cennika za tekst ani jednorazowego zlecenia. Dostajesz treści zaplanowane razem z audytem, linkami i panelem klienta, w którym widzisz, co zostało zrobione.',
  ctaGlowny: 'Zapytaj o pakiet z treściami',
  ctaDrugi: 'Zobacz, ile treści w pakiecie',
  ctaOdpowiedz: 'Odpowiedź w 24 h w dni robocze',

  sekcje: {
    czym: {
      id: 'czym-jest-copywriting-seo',
      h2: 'Czym jest copywriting SEO i czym różni się od zwykłego copywritingu',
      akapity: [
        'Zwykły copywriting ma przekonać czytelnika i skłonić go do działania. Copywriting SEO robi to samo, ale tekst musi też zostać znaleziony: odpowiada na konkretne zapytanie, ma jedną frazę główną i adres, który nie konkuruje z inną podstroną. Google pisze wprost, że liczy się treść tworzona dla ludzi, a nie pod wyszukiwarkę, więc w praktyce obie dyscypliny się zbliżają.',
      ],
      tabela: {
        id: 'copywriting-a-copywriting-seo',
        caption: 'Copywriting reklamowy a copywriting SEO',
        kolumny: ['Kryterium', 'Copywriting reklamowy', 'Copywriting SEO'],
        wiersze: [
          ['Punkt wyjścia', 'Produkt i przekaz marki', 'Zapytanie klienta i jego intencja'],
          ['Co sprawdzamy przed pisaniem', 'Ofertę konkurencji i ton marki', 'Pierwszych 5 wyników w Google dla frazy'],
          ['Długość tekstu', 'Zależy od formatu', 'Tyle, ile potrzeba do pełnej odpowiedzi; Google nie ma preferowanej liczby słów'],
          ['Słowa kluczowe', 'Nie wpływają na plan tekstu', 'Fraza główna i warianty w tytule, H1, nagłówkach i pierwszych zdaniach, bez upychania'],
          ['Miara sukcesu', 'Reakcja odbiorcy', 'Wyświetlenia, kliknięcia i pozycje w Search Console oraz zapytania z formularza'],
          ['Po publikacji', 'Zwykle koniec pracy', 'Pomiar i aktualizacja, gdy tekst traci pozycje'],
        ],
        przypis: 'Zestawienie opisuje naszą metodę pracy, a nie wynik badania. Brak preferowanej liczby słów: Google, źródło 1.',
      },
    },
    cena: {
      id: 'ile-kosztuje-copywriting-seo',
      h2: 'Ile kosztuje copywriting SEO u nas',
      akapity: [
        'Nie sprzedajemy copywritingu SEO osobno ani w cenie za tekst. Treści są częścią pakietów pozycjonowania, razem z audytem, linkami i panelem klienta, bo tekst działa dopiero razem ze stroną, która dobrze się ładuje i jest indeksowana. Poniżej dane z naszego cennika, ceny netto (+23% VAT).',
      ],
      tabela: {
        id: 'tresci-w-pakietach',
        caption: 'Treści w pakietach SEO AI SEO COMPANY (stan na 18.11.2026)',
        kolumny: ['Pakiet', 'Cena netto miesięcznie', 'Frazy', 'Treści miesięcznie', 'Linki miesięcznie', 'Umowa'],
        wiersze: [
          ['SEO Standard', `od ${cena('seoStandard')}`, 'do 20', '2', '2', 'miesięczna'],
          ['SEO Premium', cena('seoPremium'), 'do 50', '4', '4', 'miesięczna'],
        ],
        przypis: 'Źródło: nasz cennik pozycjonowania. Audyt techniczny jest w cenie każdego pakietu. Booster Pack (2 500 zł netto z nową stroną WWW, umowa min. 3 miesiące) nie podaje w cenniku liczby treści.',
      },
      akapityPo: [
        'Cennik podaje liczbę treści w miesiącu, a nie liczbę znaków. Objętość i rodzaj tekstu (artykuł, strona usługi, opis kategorii) wynikają z briefu dla danej frazy, więc zapytaj o nie przed podpisaniem umowy. Jeśli potrzebujesz jednego tekstu na zamówienie, nie mamy takiej oferty.',
      ],
    },
    proces: {
      id: 'jak-powstaje-tekst',
      h2: 'Jak powstaje tekst: od frazy do publikacji',
      wstep: 'Każdy tekst przechodzi te same sześć kroków. Pierwsze trzy to przygotowanie, bo zły brief nie naprawi się w trakcie pisania.',
      kroki: [
        ['Fraza i intencja.', 'Jedna grupa fraz o tej samej intencji to jeden adres URL. Sprawdzamy, czy inna podstrona nie walczy już o te słowa, bo dwie strony na tę samą frazę osłabiają się nawzajem.'],
        ['Analiza wyników.', 'Otwieramy pierwszych pięć wyników w Google dla frazy: co pokrywają wszyscy, a czego brakuje. To punkt wyjścia, a nie wzór do skopiowania.'],
        ['Brief.', 'Cel, odbiorca, konspekt nagłówków z pytań klientów, linki wewnętrzne i ton. Szablon takiego briefu publikujemy za darmo (niżej).'],
        ['Tekst z odpowiedzią na początku.', 'Pierwszy akapit odpowiada wprost na pytanie, dalej idą dane, przykłady i źródła przy każdym fakcie. Taką odpowiedź łatwo zacytować także asystentom AI, o czym piszemy w opisie [[/pozycjonowanie-w-ai|pozycjonowania w AI]].'],
        ['Odbiór i publikacja.', 'Sprawdzamy fakty, jeden H1, title i opis, linki wewnętrzne w obie strony, dane strukturalne, autora i datę aktualizacji.'],
        ['Pomiar.', 'Pozycje i kliknięcia w Search Console, a każde działanie w dzienniku prac w panelu klienta, z datą i liczbą godzin.'],
      ],
    },
    szablony: {
      id: 'brief-i-plan-tresci',
      h2: 'Brief i plan treści: darmowe szablony naszej metody',
      wstep: 'Metodę możesz sprawdzić bez rozmowy z nami. Te same dokumenty, z których korzystamy przy tekstach, są dostępne jako szablony PDF:',
      lista: [
        '[[/narzedzia/brief-dla-copywritera|Brief dla copywritera]] w 10 częściach: cel, fraza i intencja, analiza TOP 5, konspekt, linki, ton i checklista odbioru tekstu.',
        '[[/narzedzia/content-plan|Content plan]] z kalendarzem publikacji na 3 miesiące, backlogiem tematów i pomiarem w Search Console.',
        '[[/narzedzia/dobor-slow-kluczowych|Dobór słów kluczowych]]: źródła fraz, intencja, klastry po wynikach Google, mapa podstron i kanibalizacja.',
      ],
    },
    nieWystarczy: {
      id: 'kiedy-tekst-nie-wystarczy',
      h2: 'Kiedy sam tekst nie wystarczy',
      akapity: [
        'Nawet dobry tekst nie naprawi strony, która wolno się ładuje albo nie jest indeksowana, i nie zastąpi linków z innych serwisów. Dlatego zaczynamy od audytu, a treści prowadzimy w ramach [[/pozycjonowanie-stron-internetowych|pozycjonowania stron]]. Jeśli nie wiesz, który pakiet ma sens, sprawdź [[/cennik-pozycjonowania|cennik pozycjonowania]].',
      ],
    },
  },

  zrodlaNaglowek: 'Źródła',
  zrodla: [
    { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=pl', nazwa: 'Google Search Central: Tworzenie pomocnych, wiarygodnych treści stawiających ludzi na pierwszym miejscu', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=pl', nazwa: 'Google Search Central: Zasady dotyczące spamu (upychanie słów kluczowych, masowe generowanie treści)', data: '2026-11-18' },
  ],

  faqTytul: 'Pytania o copywriting SEO',
  faq: [
    {
      id: 'co-to-jest-copywriting-seo',
      question: 'Co to jest copywriting SEO?',
      answer: 'Copywriting SEO to pisanie tekstów, które odpowiadają na zapytanie klienta, a przy tym mają szansę pojawić się wysoko w Google. Tekst powstaje pod jedną frazę główną i jedną intencję, z pytaniami klientów w nagłówkach i źródłami przy faktach.',
    },
    {
      id: 'seo-a-copywriting',
      question: 'Czym różni się SEO od copywritingu?',
      answer: 'SEO zajmuje się tym, żeby strona była znajdowana: technika, linki, struktura i treści. Copywriting zajmuje się samym tekstem i jego skutecznością u czytelnika. Copywriting SEO łączy oba: tekst ma przekonywać i jednocześnie odpowiadać na zapytanie, które ludzie wpisują w Google.',
    },
    {
      id: 'ile-kosztuje-copywriting-seo-faq',
      question: 'Ile kosztuje copywriting SEO?',
      answer: `U nas treści są w pakietach pozycjonowania: SEO Standard od ${cena('seoStandard')} netto miesięcznie obejmuje 2 treści, SEO Premium za ${cena('seoPremium')} netto 4 treści (ceny netto, +23% VAT). Osobnego cennika za tekst nie prowadzimy. Szczegóły są w cenniku pozycjonowania.`,
    },
    {
      id: 'ile-slow-ma-miec-tekst-seo',
      question: 'Ile słów powinien mieć tekst SEO?',
      answer: 'Tyle, ile trzeba, żeby w pełni odpowiedzieć na pytanie. Google zaznacza, że nie ma preferowanej liczby słów, a pisanie pod z góry założoną długość to sygnał ostrzegawczy. Widełki ustalamy z analizy pierwszych pięciu wyników dla frazy, jako punkt odniesienia, a nie cel do wyrobienia.',
    },
    {
      id: 'same-teksty-bez-pozycjonowania',
      question: 'Czy można zamówić same teksty bez pozycjonowania?',
      answer: 'Nie. Nie mamy oferty jednorazowych tekstów ani cennika za znak. Treści są częścią pakietów SEO, razem z audytem, linkami i panelem klienta. Jeśli chcesz pisać samodzielnie, pobierz darmowy [[/narzedzia/brief-dla-copywritera|brief dla copywritera]] i [[/narzedzia/content-plan|content plan]].',
    },
  ],

  ctaKoniec: 'Chcesz wiedzieć, które teksty i ile ich potrzebuje Twoja strona? Napisz, a odpowiemy w ciągu 24 godzin w dni robocze.',
  ctaKoniecPrzycisk: 'Zapytaj o pakiet z treściami',

  service: {
    name: 'Copywriting SEO w pakietach pozycjonowania',
    description: 'Treści SEO w pakietach pozycjonowania: 2 treści miesięcznie w SEO Standard i 4 w SEO Premium, pisane z briefu pod jedną frazę i jeden adres URL, ze sprawdzeniem faktów.',
    serviceType: 'SEO copywriting',
    oferty: [
      { name: 'SEO Standard: pakiet z 2 treściami miesięcznie', price: CENY.seoStandard.pln, currency: 'PLN' },
      { name: 'SEO Premium: pakiet z 4 treściami miesięcznie', price: CENY.seoPremium.pln, currency: 'PLN' },
    ],
  },
};
