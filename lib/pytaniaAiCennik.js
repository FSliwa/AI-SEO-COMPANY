// F2 (22.11.2026): Spoke huba GEO /pozycjonowanie-w-ai/cennik w dokladnym formacie lib/pytaniaAi.js
// (renderowany przez components/ai/SpokeAiLayout.jsx). Czysty ESM bez JSX, importy wzgledne (.js).
// Zasady: zero zmyslonych stawek cudzych agencji, kazda liczba z naszego cennika (CENY) lub pomiaru
// wlasnego (4-5.11.2026), zero dlugich myslnikow, brak powtorzen zdan >= 8 slow miedzy answer, lead i FAQ.

import { PUBLIKACJA, SPRAWDZARKA_DZIALA } from './publikacja.js';
import { CENY, WIDOCZNOSC } from './narzedziaLiczby.js';

export const A_CENNIK = '/pozycjonowanie-w-ai/cennik';

const HUB = '/pozycjonowanie-w-ai';
const A2 = '/pozycjonowanie-w-ai/chatgpt';
const A5 = '/pozycjonowanie-w-ai/audyt-widocznosci';
const SPRAWDZARKA = '/sprawdz-widocznosc-w-ai';
const CENNIK_SEO = '/cennik-pozycjonowania';
const N_LLMS = '/narzedzia/generator-llms-txt';
const N_ROBOTY = '/narzedzia/tester-robotow-ai-robots-txt';

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const DEFAULT_TITLE = 'Cennik pozycjonowania w AI (GEO): koszty i modele 2026';
const DEFAULT_DESC = 'Ile kosztuje pozycjonowanie w AI (GEO)? 3 modele rozliczeń, realne składowe kosztów oraz nasze stawki: audyt 990 zł netto, pakiety od 1 900 zł.';

export const pytanieAiCennik = {
  slug: 'cennik',
  typ: 'artykul',
  okruszek: 'Cennik pozycjonowania w AI',
  tag: 'Pozycjonowanie w AI · koszty i modele 2026',
  title: PUBLIKACJA[A_CENNIK]?.tytul ?? DEFAULT_TITLE,
  description: PUBLIKACJA[A_CENNIK]?.opis ?? DEFAULT_DESC,
  h1: 'Ile kosztuje pozycjonowanie w AI (GEO): modele rozliczeń i nasz cennik w 2026',
  answer: `W AI SEO COMPANY jednorazowy audyt widoczności w AI (30 pytań w 4 silnikach i plan na 90 dni) kosztuje ${fmt(CENY.audytAi.pln)} zł netto i pomniejsza pierwszą fakturę abonamentową. Stałe działania GEO prowadzimy jako dodatek +490 zł netto/mies. do pakietu SEO Standard (od ${fmt(CENY.seoStandard.pln)} zł netto/mies.) albo w cenie pakietu SEO Premium (${fmt(CENY.seoPremium.pln)} zł netto/mies.) z umową miesięczną.`,
  lead: [
    'Firmy pytające o koszt ',
    { a: 'pozycjonowania w AI (GEO)', href: HUB },
    ' dostają dziś na rynku zupełnie nieporównywalne wyceny, bo pod tą samą nazwą bywa sprzedawany zarówno automatyczny zrzut kilku promptów, jak i pełna przebudowa treści oraz wzmianek zewnętrznych. Poniżej rozkładamy na czynniki pierwsze trzy rynkowe modele rozliczeń, pokazujemy realny koszt zapytań API i podajemy pełną tabelę naszych stawek.',
  ],
  spisTresci: true,
  hero: [
    { tekst: `Zamów audyt AI za ${fmt(CENY.audytAi.pln)} zł netto`, kontakt: true, plan: 'audyt-ai', cta: 'geo_cennik_hero_audyt', glowny: true },
    { tekst: 'Przejdź do tabeli naszych stawek', href: '#nasze-stawki', cta: 'geo_cennik_hero_tabela' },
  ],
  sections: [
    {
      id: 'trzy-modele-rozliczen',
      h2: '3 rynkowe modele rozliczeń usług GEO w 2026 roku',
      bloki: [
        { p: ['Ponieważ optymalizacja pod odpowiedzi modeli językowych (ChatGPT, Gemini, Perplexity i przeglądów AI w Google) wyrosła na styku technicznego SEO, content marketingu i digital PR, wykonawcy rozliczają ją w trzech wyraźnie różnych formułach. Przed porównaniem kwot na fakturze warto sprawdzić, który z tych modeli w ogóle wyceniasz:'] },
        {
          tabela: {
            id: 'tabela-modele-rynku-geo',
            caption: 'Trzy spotykane na rynku modele wyceny pozycjonowania w AI (GEO) w 2026 roku',
            columns: [
              { key: 'model', label: 'Model rozliczenia' },
              { key: 'coObejmuje', label: 'Za co faktycznie płacisz' },
              { key: 'kiedyMaSens', label: 'Dla kogo to dobry wybór' },
              { key: 'ryzyko', label: 'Na co uważać przed podpisem' },
            ],
            rows: [
              {
                id: 'model-audyt',
                model: '1. Jednorazowy audyt widoczności w AI',
                coObejmuje: 'Ułożenie koszyka pytań zakupowych, pomiar bazowy w kilku silnikach, lista cytowanych stron trzecich, weryfikacja dostępności HTML/robots.txt i plan wdrożeniowy',
                kiedyMaSens: 'Firmy z własnym działem marketingu lub dev, które chcą diagnozy i listy miejsc do zdobycia wzmianek bez stałego abonamentu',
                ryzyko: 'Audyt złożony wyłącznie z kilku ręcznych zrzutów ekranu z prywatnego okna czatu bez listy źródeł i bez weryfikacji technicznej strony',
              },
              {
                id: 'model-modul-seo',
                model: '2. Moduł GEO w abonamencie SEO',
                coObejmuje: 'Wspólny budżet na indeksację w Google i Bing, podstrony usług i cenników, wizytówkę Google, dane strukturalne @graph, wzmianki oraz cotygodniowy monitoring pytań',
                kiedyMaSens: 'Większość małych i średnich firm B2B oraz usługowych - nie płacisz podwójnie za tę samą pracę nad stroną i autorytetem domeny',
                ryzyko: 'Dopłata za sam wykres z narzędzia monitorującego bez żadnych realnych publikacji ani poprawek na stronie w kolejnym miesiącu',
              },
              {
                id: 'model-pr-entity',
                model: '3. Osobny projekt PR / Entity / Content',
                coObejmuje: 'Kampanie publikacji zewnętrznych w mediach branżowych, raporty z własnymi danymi, rozbudowa profili w międzynarodowych katalogach (np. Clutch, Sortlist) i porównań produktowych',
                kiedyMaSens: 'Większe marki SaaS, e-commerce i B2B, które mają już uporządkowane techniczne SEO i własny zespół contentowy, a walczą o udział głosu poza własną domeną',
                ryzyko: 'Kupowanie pakietów tanich artykułów sponsorowanych na portalach wielotematycznych, których modele AI w ogóle nie cytują w odpowiedziach',
              },
            ],
            przypis: 'Opracowanie własne AI SEO COMPANY (listopad 2026). Zgodnie z art. 16 u.z.n.k. opisujemy konstrukcję modeli bez podawania niezweryfikowanych stawek innych agencji.',
          },
        },
        {
          p: [
            'Google w oficjalnej dokumentacji przypomina, że do pojawienia się w przeglądach AI (AI Overviews) oraz trybie AI nie istnieją osobne płatne zgłoszenia ani specjalne znaczniki - fundamentem pozostaje zaindeksowana, pomocna strona zgodna z zasadami wyszukiwarki. Z tego powodu dla większości firm B2B najzdrowszy finansowo jest model drugi, czyli połączenie klasycznego SEO i GEO w jednym pakiecie.',
          ],
        },
      ],
    },
    {
      id: 'co-sklada-sie-na-koszt',
      h2: 'Co realnie składa się na koszt GEO - a za co nie warto przepłacać',
      bloki: [
        { p: ['Wokół kosztów monitorowania ChatGPT i Perplexity narosło wiele mitów, szczególnie tam, gdzie osobne licencje zagranicznych platform analitycznych kosztują kilkaset dolarów miesięcznie. Rozdzielmy surowy koszt technologii od pracy specjalistów:'] },
      ],
      podsekcje: [
        {
          id: 'koszt-api-pomiaru',
          h3: '1. Koszt zapytań API do 4-5 silników AI (jest niski i policzalny)',
          bloki: [
            { p: ['W naszych rozliczeniach produkcyjnych DataForSEO LLM Responses API z 4 listopada 2026 pojedyncze zapytanie do modelu ChatGPT z aktywnym wyszukiwaniem w sieci kosztowało ok. 0,0296-0,0302 USD, a zapytanie do Perplexity ok. 0,0064-0,0068 USD. Odpytanie stałego koszyka 30 pytań raz w tygodniu w obu tych silnikach to wydatek rzędu kilku dolarów miesięcznie za same tokeny i wywołania sieciowe.'] },
            { p: ['Wniosek dla zamawiającego jest prosty: wysoka cena usługi GEO nie powinna być tłumaczona „drogim dostępem do sztucznej inteligencji”. Płacisz za dobór właściwych pytań zakupowych, interpretację źródeł i przede wszystkim za wdrożenie zmian na stronie oraz poza nią.'] },
          ],
        },
        {
          id: 'koszt-pracy-wdrozeniowej',
          h3: '2. Pięć prac wdrożeniowych, które pochłaniają realne godziny zespołu',
          bloki: [
            {
              lista: [
                ['Przebudowa podstron pod bezpośrednie odpowiedzi i tabele: w naszym pomiarze API z 4-5.11.2026 przy pytaniach o ceny i porównania ChatGPT podał 31 linków i wszystkie prowadziły do konkretnych stron www (cenników, porównań i poradników), a 0 do Map Google. Napisanie rzetelnej podstrony cennikowej lub porównawczej z weryfikacją faktów zajmuje wielokrotnie więcej czasu niż wygenerowanie ogólnego wpisu blogowego.'],
                ['Profil Firmy w Google i spójność danych NAP: w tym samym pomiarze przy bezpośrednich prośbach o polecenie wykonawcy aż 59 z 62 linków w odpowiedziach ChatGPT prowadziło do wyszukiwania w Mapach Google. Dopracowanie kategorii, usług, postów i procesu opinii pracuje jednocześnie na Local Pack i polecenia w czacie.'],
                ['Dane strukturalne JSON-LD (@graph) i czysty serwerowy HTML: uporządkowanie węzłów Organization, LocalBusiness, Service, Product oraz FAQPage bez konfliktów wtyczek oraz upewnienie się, że cenniki i parametry techniczne są widoczne w pierwszym odpowiedzi HTTP bez wykonywania JavaScriptu.'],
                ['Konfiguracja dostępu robotów AI, IndexNow i pliku /llms.txt: odblokowanie OAI-SearchBot, PerplexityBot i Claude-SearchBot w robots.txt oraz zaporze WAF serwera, wdrożenie natychmiastowego powiadamiania Bing przez IndexNow i utrzymanie aktualnego spisu najważniejszych adresów w /llms.txt.'],
                ['Zdobywanie wzmianek w cytowanych źródłach zewnętrznych: ręczna analiza domen, z których Perplexity i Gemini czerpią wiedzę w Twojej niszy (katalogi B2B, rankingi, portale branżowe), oraz publikacja merytorycznych materiałów i profili firmy.'],
              ],
            },
            {
              warunek: N_ROBOTY,
              p: [
                'Dwie rzeczy techniczne sprawdzisz samodzielnie za 0 zł jeszcze przed zleceniem prac: dostęp 12 crawlerów zweryfikujesz w ',
                { a: 'testerze robotów AI i robots.txt', href: N_ROBOTY },
                ', a plik indeksowy wygenerujesz w ',
                { a: 'darmowym generatorze llms.txt', href: N_LLMS },
                '.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'nasze-stawki',
      h2: 'Jawny cennik pozycjonowania w AI (GEO) w AI SEO COMPANY',
      bloki: [
        { p: ['Wszystkie nasze stawki publikujemy otwarcie - bez widełek zależnych od wielkości przychodu klienta i bez umów wiążących na 12-24 miesiące w pakietach Standard oraz Premium:'] },
        {
          tabela: {
            id: 'tabela-cennik-geo-ai-seo',
            caption: 'Zestawienie stawek usług widoczności w AI (GEO) i pakietów łączonych SEO + AI (kwoty netto, listopad 2026)',
            columns: [
              { key: 'usluga', label: 'Usługa / Wariant' },
              { key: 'cena', label: 'Cena netto (PL / EUR)' },
              { key: 'umowa', label: 'Zobowiązanie' },
              { key: 'zakres', label: 'Co dokładnie otrzymujesz' },
            ],
            rows: [
              {
                id: 'geo-free',
                usluga: 'Darmowa sprawdzarka widoczności w AI',
                cena: '0 zł / 0 €',
                umowa: `Bez konta (do ${WIDOCZNOSC.limitIp} domen / IP / dobę)`,
                zakres: `Automatyczna próbka ${WIDOCZNOSC.pytan} pytań w ${WIDOCZNOSC.silnikow} źródłach AI naraz, wynik 0-100 oraz podgląd 5 wymienionych firm i 5 cytowanych domen`,
              },
              {
                id: 'geo-audyt',
                usluga: 'Jednorazowy audyt widoczności w AI (GEO)',
                cena: `${fmt(CENY.audytAi.pln)} zł / ${CENY.audytAi.eur} €`,
                umowa: 'Jednorazowo (zaliczane w 100% na 1. miesiąc abonamentu)',
                zakres: '30 uzgodnionych pytań klientów w ChatGPT, Perplexity, Gemini i AI Overviews, pełna macierz cytowanych źródeł i konkurentów, weryfikacja techniczna botów AI, plan 10 działań na 90 dni + 45 min omówienia',
              },
              {
                id: 'geo-standard-plus',
                usluga: 'SEO Standard + moduł monitoringu i działań AI',
                cena: `od ${fmt(CENY.seoStandard.pln)} zł + 490 zł = 2 390 zł / mies. (450 € + 115 € = 565 €)`,
                umowa: 'Umowa miesięczna, wypowiedzenie 1 mies.',
                zakres: 'Pełne SEO strony i wizytówki Google (do 20 fraz, 2 treści, 2 linki/mies.) + cotygodniowy pomiar 30 pytań w 4 silnikach AI w panelu 24/7 + 2 dedykowane działania pod AI miesięcznie',
              },
              {
                id: 'geo-premium',
                usluga: 'Pakiet SEO Premium (pełne SEO + GEO w cenie)',
                cena: `${fmt(CENY.seoPremium.pln)} zł / mies. (${CENY.seoPremium.eur} €)`,
                umowa: 'Umowa miesięczna, wypowiedzenie 1 mies.',
                zakres: 'Kompleksowe SEO techniczne, CRO mobilne, do 50 fraz, 4 rozbudowane treści i 4 linki/mies., wizytówka Google oraz cotygodniowy monitoring 30 pytań w AI bez dodatkowej dopłaty',
              },
              {
                id: 'geo-booster',
                usluga: 'Booster Pack (nowa strona w Next.js za 0 zł na starcie + SEO)',
                cena: `${fmt(CENY.boosterPack.pln)} zł / mies. (${CENY.boosterPack.eur} €)`,
                umowa: `Min. ${CENY.boosterPack.umowaMiesiecy} mies., potem miesięczna`,
                zakres: 'Budowa ultraszybkiej strony w Next.js z czystym HTML i JSON-LD pod Googlebota i boty AI za 0 zł opłaty startowej, hosting, SSL, Mapy Google i pełna obsługa SEO',
              },
            ],
            przypis: 'Źródło: publiczny cennik AI SEO COMPANY (lib/narzedziaLiczby.js oraz components/GeoPageClient.jsx, stan na 22.11.2026). Do kwot netto doliczany jest podatek VAT zgodnie z krajem siedziby.',
          },
        },
        {
          p: [
            'Szczegółowy przebieg samego badania 30 pytań znajdziesz na podstronie ',
            { a: 'audyt widoczności w AI', href: A5 },
            ', wyniki naszych eksperymentów na żywych modelach w poradniku ',
            { a: 'pozycjonowanie w ChatGPT', href: A2 },
            ', a pełne porównanie pakietów na stronie ',
            { a: 'cennik pozycjonowania', href: CENNIK_SEO },
            '.',
          ],
        },
        ...(SPRAWDZARKA_DZIALA
          ? [{ p: ['Zanim wydasz złotówkę, sprawdź obecny punkt startu w 2 minuty w naszej ', { a: 'darmowej sprawdzarce widoczności w AI', href: SPRAWDZARKA }, '.'] }]
          : []),
      ],
    },
    {
      id: 'pytania-weryfikacyjne',
      h2: '7 pytań weryfikacyjnych przed zakupem usługi GEO w dowolnej agencji',
      bloki: [
        { p: ['Zanim podpiszesz umowę na „pozycjonowanie w ChatGPT” lub „optymalizację AEO/GEO”, zadaj wykonawcy siedem konkretnych pytań i poproś o odpowiedź w treści oferty:'] },
        {
          tabela: {
            id: 'tabela-weryfikacja-oferty-geo',
            caption: 'Lista kontrolna kupującego przed zleceniem usługi pozycjonowania w AI (GEO)',
            columns: [
              { key: 'pytanie', label: 'Pytanie do wykonawcy' },
              { key: 'zdrowaOdpowiedz', label: 'Bezpieczna, rzetelna odpowiedź' },
              { key: 'czerwonaFlaga', label: 'Czerwona flaga (sygnał ostrzegawczy)' },
            ],
            rows: [
              {
                id: 'wer-1',
                pytanie: '1. Jak dokładnie mierzycie widoczność w AI?',
                zdrowaOdpowiedz: 'Stała, uzgodniona lista 20-50 pytań odpytywana cyklicznie przez API w tych samych modelach z zapisem pełnych odpowiedzi i cytowanych URL-i',
                czerwonaFlaga: 'Pojedynczy zrzut ekranu z prywatnego konta ChatGPT pracownika agencji (zniekształcony historią rozmów)',
              },
              {
                id: 'wer-2',
                pytanie: '2. Czy obiecujecie gwarancję polecenia na 1. miejscu w ChatGPT?',
                zdrowaOdpowiedz: 'Wprost mówimy, że odpowiedzi LLM są niedeterministyczne - rozliczamy się z konkretnych wdrożeń i trendu odsetka wzmianek',
                czerwonaFlaga: 'Gwarancja stałego miejsca nr 1 w odpowiedziach ChatGPT lub Gemini wpisana na slajdzie sprzedażowym',
              },
              {
                id: 'wer-3',
                pytanie: '3. Co fizycznie powstaje w ramach miesięcznego abonamentu?',
                zdrowaOdpowiedz: 'Konkretna liczba rozbudowanych podstron/tabel, poprawek JSON-LD, aktualizacji wizytówki i wzmianek w zewnętrznych źródłach',
                czerwonaFlaga: 'Wyłącznie „monitoring promptów” i automatycznie generowany raport PDF bez żadnych wdrożeń',
              },
              {
                id: 'wer-4',
                pytanie: '4. Jak traktujecie plik /llms.txt w strategii?',
                zdrowaOdpowiedz: 'Jako uporządkowany dodatek pomocniczy po zapewnieniu indeksacji HTML i dostępu OAI-SearchBot w robots.txt',
                czerwonaFlaga: 'Sprzedawanie wgrania pliku llms.txt za kilka tysięcy złotych jako „tajnego kodu dającego pozycje w Google AI”',
              },
              {
                id: 'wer-5',
                pytanie: '5. Skąd pozyskujecie zewnętrzne wzmianki o marce?',
                zdrowaOdpowiedz: 'Z katalogów branżowych, portali i zestawień, które w pomiarze faktycznie pojawiają się w przypisach Perplexity i ChatGPT',
                czerwonaFlaga: 'Zamknięte zaplecza PBN i masowe artykuły z linkami kupowanymi na wagę (sprzeczne z zasadami spamu Google)',
              },
              {
                id: 'wer-6',
                pytanie: '6. Kto jest właścicielem kont analitycznych i napisanych treści?',
                zdrowaOdpowiedz: 'Search Console, GA4, Bing Webmaster Tools i wizytówka stoją na koncie klienta, a prawa majątkowe do tekstów przechodzą po opłaceniu faktury',
                czerwonaFlaga: 'Panel i dane na koncie agencji oraz usuwanie opublikowanych materiałów lub linków po wypowiedzeniu umowy',
              },
              {
                id: 'wer-7',
                pytanie: '7. Jaki jest minimalny czas trwania umowy i okres wypowiedzenia?',
                zdrowaOdpowiedz: 'Umowa miesięczna (lub krótki próg 3 mies. wyłącznie przy budowie nowej strony w cenie pakietu) i jasne 1-miesięczne wypowiedzenie',
                czerwonaFlaga: 'Sztywny kontrakt na 12-24 miesiące z karą umowną za wcześniejsze rozwiązanie',
              },
            ],
            przypis: 'Na podstawie wytycznych Google Search Central („Do you need an SEO?” oraz „Optimizing for generative AI features”, odczyt 22.11.2026).',
          },
        },
      ],
    },
  ],
  faqTytul: 'Najczęstsze pytania o cennik i opłacalność GEO',
  faq: [
    {
      id: 'dlaczego-geo-razem-z-seo',
      question: 'Dlaczego bardziej opłaca się łączyć GEO z pakietem SEO niż kupować je osobno?',
      answer: [
        'Ponieważ około 80% fundamentów technicznych i treściowych pokrywa się w obu kanałach: indeksacja w Google i Bing, szybki serwerowy HTML, rozbudowane strony usługowe i cennikowe, spójne dane firmy w Mapach Google oraz wzmianki w wiarygodnych serwisach zewnętrznych. Kupując osobny abonament GEO u drugiego wykonawcy, płacisz dwa razy za audyt i edycję tych samych podstron.',
      ],
    },
    {
      id: 'czy-kwota-audytu-990-zl-wraca',
      question: 'Jak działa zaliczenie 990 zł netto za audyt widoczności w AI na poczet abonamentu?',
      answer: [
        'Jeśli po otrzymaniu raportu z badania 30 pytań zdecydujesz się na stałą współpracę w pakiecie SEO Standard (z modułem AI) lub SEO Premium, pierwszą fakturę abonamentową pomniejszamy o pełne 990 zł netto. Diagnoza otwierająca współpracę kosztuje Cię wtedy efektywnie 0 zł, a jeżeli wolisz wdrożyć plan własnymi siłami - zatrzymujesz kompletny dokument bez dalszych zobowiązań.',
      ],
    },
    {
      id: 'dlaczego-nie-podajecie-cen-konkurencji',
      question: 'Dlaczego nie publikujecie tabeli z cennikami konkretnych konkurencyjnych agencji GEO?',
      answer: [
        'Większość agencji nie publikuje wiążących, porównywalnych cenników usług AI o identycznej liczbie pytań, silników i wdrożeń treściowych, a przypisywanie konkurentom szacunkowych kwot wprowadzałoby zamawiających w błąd i naruszało zasady rzetelnej reklamy porównawczej (art. 16 ustawy o zwalczaniu nieuczciwej konkurencji). Zamiast zgadywać cudze stawki, podajemy co do złotówki własny cennik i listę 7 pytań do weryfikacji każdej oferty.',
      ],
    },
    {
      id: 'kiedy-widac-efekty-wydatkow-na-geo',
      question: 'Po jakim czasie inwestycja w widoczność w AI przynosi mierzalny wzrost wzmianek?',
      answer: [
        'Poprawki techniczne (odblokowanie OAI-SearchBot w zaporze WAF, zgłoszenie podstron cennikowych i porównawczych przez IndexNow, uzupełnienie usług w Profilu Firmy w Google) potrafią zmienić odpowiedzi wyszukiwania w ChatGPT i Perplexity w ciągu 2-6 tygodni. Budowa zewnętrznego autorytetu w katalogach B2B i publikacjach branżowych to proces rozłożony na 3-6 miesięcy, który śledzisz tydzień po tygodniu w panelu klienta.',
      ],
    },
  ],
  cta: {
    tytul: 'Zacznij od policzalnej diagnozy na 30 pytaniach Twoich klientów',
    tekst: `Napisz, czym zajmuje się Twoja firma i na jakim rynku działasz. Przygotujemy listę 30 pytań zakupowych, sprawdzimy ChatGPT, Perplexity, Gemini i AI Overviews za ${fmt(CENY.audytAi.pln)} zł netto - a przy przejściu na pakiet miesięczny odliczymy tę kwotę w całości od pierwszego rachunku.`,
    przyciski: [
      { tekst: `Zamów audyt AI za ${fmt(CENY.audytAi.pln)} zł netto`, kontakt: true, plan: 'audyt-ai', cta: 'geo_cennik_cta_audyt', glowny: true },
      { tekst: 'Porównaj pełne pakiety SEO', href: CENNIK_SEO, cta: 'geo_cennik_cta_pakiety' },
    ],
  },
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', nazwa: 'Google Search Central: Optimizing for generative AI features (brak płatnych zgłoszeń i specjalnych wymogów poza dobrym SEO)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO? (pytania weryfikacyjne i ocena porad AEO/GEO)', data: '2026-11-22' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot a widoczność w ChatGPT search)', data: '2026-11-22' },
    { url: 'https://dataforseo.com/apis/ai-optimization-api', nazwa: 'DataForSEO AI Optimization / LLM Responses API: dokumentacja i model rozliczeń zapytań API', data: '2026-11-22' },
  ],
  dane: [
    'lib/narzedziaLiczby.js (CENY: audytAi 990 zł / 235 €, seoStandard od 1 900 zł / 450 €, seoPremium 2 500 zł / 590 €, boosterPack 2 500 zł / 590 €)',
    'lib/pytaniaAi.js (A2: pomiar 59/62 linków do Map i 31/31 linków cenowych do stron www z 4-5.11.2026; A5: koszt API DataForSEO z 4.11.2026 i dopłata +490 zł)',
  ],
  updated: '2026-11-22',
  opublikowano: null,
  aiQuestions: [
    { id: 'Q07', pytanie: 'Ile kosztuje pozycjonowanie w AI (GEO) i ChatGPT w Polsce w 2026 roku?' },
  ],
};

export const pytaniaAiCennik = [pytanieAiCennik];

export default pytanieAiCennik;
