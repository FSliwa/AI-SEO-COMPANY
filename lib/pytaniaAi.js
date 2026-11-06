// Spoke'i huba GEO pod /pozycjonowanie-w-ai/[slug] (PLAN-v2 6.5 A2, 6.7 A5, rozdz. 7 SIL;
// 5.11.2026, grupa „ai”). Jedno źródło treści stron: app/[locale]/pozycjonowanie-w-ai/[slug]/page.js
// renderuje wpis przez components/ai/SpokeAiLayout.jsx. Karty huba trzyma components/GeoPageClient.jsx.
//
// Strony są tylko po polsku i za bramką publikacji (lib/publikacja.js, partia 2 = W5): dopóki
// wpis rejestru ma opublikowana: false, trasa daje 404, a strony nie ma w sitemapie ani w llms.txt.
// title i description biorą się z rejestru publikacji (jedno źródło dla title, llms.txt i kart).
//
// Zasady treści (CLAUDE.md, PLAN-v2 6.0):
// - każda liczba ma w tekście datę i źródło (pomiar własny 4–5.11.2026 opisany pod tabelą A2);
// - nazw polecanych firm i innych agencji nie publikujemy (art. 16 UZNK); jedyne domeny w treści
//   to jflowlabs.pl, justidea.agency i sorank.com jako źródła Perplexity (AV-09, PLAN-v2 6.5);
// - 0 zdań ≥ 8 słów wspólnych między Krótką odpowiedzią, leadem i FAQ (SA-01);
// - FAQ 40–60 słów; FAQ A5 = zał. G.1 dosłownie; A2 bez pytania o cenę (jest w FAQ huba).
//
// Format treści (bez JSX, żeby dało się go testować w node i liczyć słowa):
//   segmenty: string | { a, href, kotwica? } | { warunek, tresc: [segmenty] }
//     - { a, href }: link warunkowy - cel przed publikacją (lib/publikacja.js) albo sprawdzarka
//       przed T0.2 renderuje się jako zwykły tekst bez <a> (reguła 6.0);
//     - kotwica: nazwa z lib/anchors.js (np. 'ileKosztuje' -> '#ile-kosztuje');
//     - { warunek: href, tresc }: fragment tylko wtedy, gdy cel istnieje (zdanie o generatorze
//       llms.txt nie może stać na stronie przed publikacją generatora).
//   bloki: { p }, { lista, numerowana? }, { tabela }, { obraz }, { wykres }; każdy blok może
//   mieć warunek (jak wyżej).
//
// Pola wpisu: slug, typ ('artykul' -> Article; 'usluga' -> Service 'geo-audyt'), okruszek, tag,
// title, description, h1, answer (Krótka odpowiedź), lead, sections, faq, faqTytul, cta, sources
// (URL + data odczytu, widoczne w sekcji „Źródła”), dane (pliki pomiaru - nie są renderowane),
// updated (data treści wpisu), opublikowano (data pierwszego wdrożenia - wpisuje Integracja przy
// publikacji; do tego czasu datePublished = LASTMOD), aiQuestions (pytania z koszyka 9.6).

import { PUBLIKACJA, SPRAWDZARKA_DZIALA } from './publikacja';

export const PREFIKS = '/pozycjonowanie-w-ai/';

// T0.2 (klucze DataForSEO w projekcie panelu): do tego czasu sprawdzarka zwraca 503, więc
// spoke'i nie linkują do niej (6.5, 6.7: „sprawdzarka bez <a> do T0.2”). Przełączyć na true,
// gdy POST /api/ai-check z pustym body zwraca 400 ORAZ na sprawdzarce stoi sekcja A3c
// „Jak mierzyć widoczność w AI: 5 metryk” z id = KOTWICA_METRYK (link z A5 prowadzi do niej).
// Integracja 5.11.2026: jedna flaga dla serwisu w lib/publikacja.js (tu tylko reeksport).
export { SPRAWDZARKA_DZIALA };
export const SPRAWDZARKA = '/sprawdz-widocznosc-w-ai';
export const KOTWICA_METRYK = 'ac-metryki';

const A2 = '/pozycjonowanie-w-ai/chatgpt';
const A5 = '/pozycjonowanie-w-ai/audyt-widocznosci';
const L1 = '/pozycjonowanie-wizytowki-google';
const N1 = '/narzedzia/generator-llms-txt';
const B1 = '/blog/bing-webmaster-tools-indexnow-chatgpt';
const HUB = '/pozycjonowanie-w-ai';

// Sekcja „Czy reklama w ChatGPT zastąpi pozycjonowanie?” (A2, H3 id="reklama", CB-10).
// Fakty o reklamach OpenAI (format, oznaczenie, dostępność w Polsce) wolno brać tylko z
// help.openai.com albo ads.openai.com z datą odczytu. Oba adresy są w danych planu
// (skille/content-brief-ai-uslugi/dane/weryf_serp_*_2026-11-05.json), ale 5.11.2026 zwracały
// 403 - treści źródła nie ma, więc sekcja jest wyłączona (null), a hub dostaje kartę 8b.
// Włączenie po odczycie strony OpenAI w dniu publikacji:
//   const REKLAMA_A2 = { id: 'reklama', h3: 'Czy reklama w ChatGPT zastąpi pozycjonowanie?',
//     bloki: [{ p: ['…ok. 120 słów, fakty tylko ze strony OpenAI z datą odczytu…'] }],
//     zrodlo: { url: 'https://help.openai.com/en/articles/20001047-ads-in-chatgpt', nazwa: 'OpenAI Help Center: Ads in ChatGPT', data: 'RRRR-MM-DD' } };
const REKLAMA_A2 = null;

const tytul = (sciezka) => PUBLIKACJA[sciezka]?.tytul;
const opis = (sciezka) => PUBLIKACJA[sciezka]?.opis;

export const pytaniaAi = [
  // --- A2 /pozycjonowanie-w-ai/chatgpt (PLAN-v2 6.5; brief A2 z korektami CB-01, CB-05, CB-10,
  // CB-11, CB-15, AV-09). Makieta 06 (Figma 10:111).
  {
    slug: 'chatgpt',
    typ: 'artykul',
    okruszek: 'Pozycjonowanie w ChatGPT',
    tag: 'Pozycjonowanie w AI · ChatGPT',
    title: tytul(A2),
    description: opis(A2),
    h1: 'Pozycjonowanie w ChatGPT: jak sprawić, żeby ChatGPT polecał Twoją firmę',
    // 58 słów, CB-01(ai) - PLAN-v2 6.5 dosłownie.
    answer: 'Pozycjonowanie w ChatGPT to praca nad źródłami, z których model składa odpowiedź, gdy szuka w sieci. W naszym teście z listopada 2026 ChatGPT poproszony o polecenie firmy podał 62 linki, z czego 59 prowadziło do Map Google. Przy pytaniach o ceny cytował strony www. Dlatego zaczynamy od Profilu Firmy w Google i strony z jasną ofertą i ceną.',
    lead: [
      'Pozycjonowanie w ChatGPT to jeden z elementów, które obejmuje ',
      { a: 'pozycjonowanie w AI', href: HUB },
      ' (GEO), czyli praca nad tym, żeby modele językowe wymieniały firmę w odpowiedziach. W tym poradniku zostajemy przy jednym modelu. Pokazujemy, co zobaczyliśmy w 20 odpowiedziach ChatGPT na pytania, które zadają klienci firm usługowych, i jakie 7 kroków z tego wynika.',
    ],
    spisTresci: true,
    sections: [
      {
        kotwica: 'zrodla', // lib/anchors.js: SEKCJE.zrodla -> id="zrodla" (karta 2 huba linkuje #zrodla)
        h2: 'Skąd ChatGPT bierze firmy, które poleca',
        bloki: [
          { p: ['ChatGPT nie trzyma gotowej listy firm do polecania. Odpowiedź powstaje za każdym razem od nowa: z wiedzy, której model nauczył się podczas treningu, albo z wyników wyszukiwania w sieci. Dla firmy usługowej liczy się głównie ten drugi tryb, bo tylko w nim pojawiają się aktualne nazwy, adresy i linki.'] },
        ],
        podsekcje: [
          {
            h3: 'Wiedza modelu a wyszukiwanie w ChatGPT',
            bloki: [
              { p: ['W naszym teście ChatGPT sięgał do sieci przy każdej prośbie o polecenie firmy i przy każdym pytaniu o cenę. Przy 4 pytaniach z prośbą o poradę, takich jak „jak sprawić, żeby ChatGPT polecał moją firmę” czy „jak zmienić agencję SEO”, odpowiadał z samej wiedzy modelu i nie podał ani jednego linku.'] },
              { p: ['Bez wyszukiwania rady były ogólne i chybione. Na pytanie, jak sprawić, żeby ChatGPT polecał firmę klientom, model zaproponował między innymi trenowanie modelu na danych firmy i pisanie promptów, które każą mu polecać firmę. Żadna z tych rzeczy nie zmienia odpowiedzi, którą zobaczy Twój klient.'] },
              { p: ['Dlatego pozycjonowanie w ChatGPT dotyczy trybu z wyszukiwaniem, który w materiałach anglojęzycznych nazywa się ChatGPT search, a w Polsce często po prostu wyszukiwarką ChatGPT. W tym trybie model najpierw szuka stron, a potem streszcza je w odpowiedzi, często z linkami do źródeł.'] },
            ],
          },
          {
            h3: 'Nasz test: 59 z 62 linków prowadziło do Map Google',
            bloki: [
              { p: ['Zadaliśmy ChatGPT pytania czterech typów: prośby o polecenie firmy, pytania o cenę, pytania o ranking albo konkretną funkcję usługi i prośby o poradę. Pytania dotyczyły agencji SEO, ale też stolarza na warszawskiej Woli, hydraulika w Krakowie i biura rachunkowego w Poznaniu. W każdej odpowiedzi policzyliśmy linki i sprawdziliśmy, dokąd prowadzą.'] },
              {
                wykres: {
                  tytul: 'Linki do Map Google w odpowiedziach ChatGPT według typu pytania',
                  slupki: [
                    { etykieta: 'Prośby o polecenie firmy', wartosc: 59, z: 62 },
                    { etykieta: 'Pytania o cenę, ranking i funkcję usługi', wartosc: 0, z: 31 },
                  ],
                  podpis: 'Pomiar AI SEO COMPANY, 4–5.11.2026; ChatGPT = gpt-4.1-mini z wyszukiwaniem, metoda pod tabelą.',
                },
              },
              {
                tabela: {
                  id: 'tabela-pomiaru',
                  caption: 'Linki w odpowiedziach ChatGPT i Perplexity według typu pytania, 4–5.11.2026',
                  columns: [
                    { key: 'typ', label: 'Typ pytania (przykłady)' },
                    { key: 'odp', label: 'Odpowiedzi' },
                    { key: 'linki', label: 'Linki' },
                    { key: 'mapy', label: 'Do Map Google' },
                    { key: 'inne', label: 'Pozostałe linki' },
                  ],
                  // CB-01: liczby odtworzone z plików pomiaru (dane niżej); 11 odpowiedzi = 10 pytań,
                  // bo pytanie o stolarza zadaliśmy 2 dni z rzędu.
                  rows: [
                    { id: 'polecenie', typ: 'Polecenie firmy: agencja SEO (5 pytań), pozycjonowanie wizytówek (2), stolarz na Woli (2 dni), hydraulik w Krakowie, biuro rachunkowe w Poznaniu', odp: '11 (10 pytań)', linki: '62', mapy: '59 (wyszukiwanie w Mapach Google)', inne: '3 strony agencji, w 2 pytaniach z prośbą o cenę' },
                    { id: 'cena', typ: 'Cena: pozycjonowanie, audyt SEO, za efekt czy abonament', odp: '3', linki: '15', mapy: '0', inne: 'cenniki i poradniki, w tym nasz cennik' },
                    { id: 'ranking', typ: 'Ranking agencji albo konkretna funkcja („która agencja co tydzień mierzy ChatGPT”)', odp: '2', linki: '16', mapy: '0', inne: 'rankingi i strony agencji' },
                    { id: 'porada', typ: 'Porada: „jak sprawić, żeby ChatGPT polecał”, „jak zmienić agencję”, „jak sprawdzić”', odp: '4', linki: '0', mapy: '0', inne: 'model nie wyszukiwał' },
                    { id: 'perplexity', typ: 'Perplexity (model sonar), wszystkie typy pytań', odp: '23', linki: '–', mapy: '0', inne: 'katalogi firm i artykuły odpowiadające na pytanie' },
                  ],
                  przypis: 'Metoda: pomiar AI SEO COMPANY z 4–5.11.2026 przez API DataForSEO LLM Responses. ChatGPT: model gpt-4.1-mini z wyszukiwaniem w sieci, lokalizacja wyszukiwania Warszawa (także przy pytaniach o Kraków i Poznań). Perplexity: model sonar. Jedna odpowiedź na pytanie; pytanie o stolarza zadaliśmy 4 i 5.11 i za każdym razem padło tych samych 5 firm. Linki do Map to adresy wyszukiwania google.com/maps/search z nazwą firmy, a nie adresy wizytówek. Pytanie o naszą firmę (5 linków, 0 do Map) pominęliśmy. Aplikacja ChatGPT może odpowiedzieć inaczej niż API.',
                },
              },
              { p: ['Przy poleceniu ChatGPT podawał nazwę firmy i adres, często też godziny otwarcia, a link prowadził do Map Google, gdzie klient widzi wizytówkę. Pomiar nie mówi, z jakich wszystkich źródeł model składa taki opis, więc nie twierdzimy, że Mapy są jedynym. Pokazuje za to, gdzie ląduje klient, który kliknie polecenie: na wizytówce firmy. Nazw polecanych firm nie publikujemy, bo to odpowiedzi modelu, a nie nasza ocena.'] },
            ],
          },
          {
            h3: 'Pytania o cenę i ranking: model cytuje strony www',
            bloki: [
              {
                p: [
                  'Obraz się odwraca, gdy klient pyta o pieniądze albo o porównanie. W 5 odpowiedziach na pytania o cenę, ranking agencji i konkretną funkcję usługi ChatGPT podał 31 linków i żaden nie prowadził do Map. Cytował cenniki, poradniki i rankingi, czyli zwykłe strony www. Przy pytaniu o ceny pozycjonowania w Polsce wśród 6 źródeł był nasz ',
                  { a: 'cennik pozycjonowania', href: '/cennik-pozycjonowania' },
                  ' (4.11.2026).',
                ],
              },
              { p: ['Wniosek dla firmy usługowej: wizytówka odpowiada na prośbę „poleć”, a strona z jawną ceną i opisem usługi na pytania „ile kosztuje” i „kto robi X”. Żeby model wymieniał Twoją firmę w obu sytuacjach, potrzebujesz obu.'] },
            ],
          },
        ],
      },
      {
        id: 'mapy-katalogi-bing',
        h2: 'Mapy, katalogi i Bing: źródła, które cytują modele',
        bloki: [
          { p: ['ChatGPT i Perplexity szukały w różnych miejscach. ChatGPT przy poleceniach odsyłał do Map Google. Perplexity w 23 odpowiedziach z tych samych dni nie podał ani jednego linku do Map. Przy pytaniu o agencję SEO dla firmy B2B w Warszawie cytował katalogi firm Clutch i Sortlist, a w innych odpowiedziach artykuły, które odpowiadają wprost na zadane pytanie.'] },
          // AV-09: liczby z pomiar-llm-2026-11-05.csv (26 odpowiedzi Perplexity = 23 z tabeli
          // + 3 pytania o ceny i porównania z innych pomiarów tego dnia, bez Q20).
          { p: ['Te same strony wracały w wielu odpowiedziach. W 26 odpowiedziach Perplexity z 4–5.11.2026 (23 z tabeli i 3 na dodatkowe pytania o ceny i porównania) jflowlabs.pl był źródłem w 8, justidea.agency w 6, a sorank.com w 5. To poradniki i opisy usług napisane pod konkretne pytanie, a nie katalogi.'] },
          { p: ['Trzecie źródło to zwykły indeks wyszukiwarek. Cenniki i poradniki, które cytował ChatGPT, model musiał najpierw znaleźć w sieci, więc strona, której wyszukiwarki nie zaindeksowały, nie trafi do takiej odpowiedzi. Dlatego poza Google warto zadbać o Bing: dodać stronę do Bing Webmaster Tools i zgłaszać nowe adresy protokołem IndexNow.'] },
        ],
      },
      {
        id: 'kroki',
        h2: 'Jak pozycjonować się w ChatGPT: 7 kroków',
        bloki: [
          { p: ['Kolejność wynika z pomiaru: najpierw to, co ChatGPT pokazuje przy poleceniu, potem to, co cytuje przy pytaniach o cenę, a na końcu pomiar, bez którego nie wiadomo, czy praca działa.'] },
        ],
        podsekcje: [
          {
            h3: '1. Spójny profil firmy w Mapach Google, Bing i Apple',
            bloki: [
              { p: ['Uzupełnij Profil Firmy w Google: kategorię główną i dodatkowe, listę usług z opisami, obszar działania, godziny otwarcia i zdjęcia. Te same dane wpisz w Bing Places i Apple Business Connect. Skoro ChatGPT przy poleceniu podaje adres i godziny, rozbieżne dane w różnych miejscach grożą tym, że model poda klientowi nieaktualne informacje. Opinie z opisem wykonanej usługi pomagają klientowi, który z odpowiedzi przejdzie do wizytówki.'] },
              { warunek: L1, p: ['U klientów zajmuje się tym nasze ', { a: 'pozycjonowanie wizytówki Google', href: L1 }, '.'] },
            ],
          },
          {
            h3: '2. Katalogi i rankingi, które cytują modele',
            bloki: [
              { p: ['Sprawdź, czy firma ma aktualny wpis w katalogach, które modele cytują w Twojej branży. Dla agencji marketingowych to między innymi Clutch i Sortlist, dla firm lokalnych katalogi branżowe i serwisy z opiniami. Wpis powinien mieć te same dane co wizytówka i opis usług słowami, których używają klienci. Do rankingów i zestawień typu „najlepsze firmy w mieście” warto trafiać przez realne realizacje i opinie, a nie przez wykupione miejsca.'] },
            ],
          },
          {
            h3: '3. Strona, która odpowiada wprost: usługa, cena, obszar',
            bloki: [
              { p: ['Przy pytaniach o cenę ChatGPT cytował cenniki i artykuły o kosztach, w tym nasz cennik z kwotami pakietów. Zrób osobną podstronę dla każdej usługi i każdego ważnego pytania klienta: co robisz, ile to kosztuje, gdzie działasz i ile trwa realizacja. Pod nagłówkiem w formie pytania daj krótki akapit z odpowiedzią, który da się zacytować bez reszty strony. Tak zbudowana jest też ta strona.'] },
            ],
          },
          {
            h3: '4. Dostęp botów: OAI-SearchBot w robots.txt i treść bez JavaScriptu',
            bloki: [
              { p: ['OpenAI używa kilku botów. OAI-SearchBot pobiera strony do wyszukiwania w ChatGPT, GPTBot zbiera treści, które mogą trafić do trenowania modeli, a ChatGPT-User otwiera stronę, gdy prosi o to użytkownik. Według dokumentacji OpenAI strona zablokowana dla OAI-SearchBot nie pojawia się w odpowiedziach wyszukiwania ChatGPT, poza zwykłymi linkami nawigacyjnymi (odczyt 5.11.2026).'] },
              { p: ['Sprawdź plik robots.txt: blokada GPTBot sygnalizuje, że treści nie mają trafiać do treningu, a blokada OAI-SearchBot wyłącza stronę z wyszukiwania w ChatGPT. To dwa osobne ustawienia. Sprawdź też, czy opis usług i ceny są w kodzie HTML strony, a nie pojawiają się dopiero po wykonaniu JavaScriptu.'] },
            ],
          },
          {
            h3: '5. Indeksacja w Google i Bing (IndexNow)',
            bloki: [
              { p: ['Strona, której nie ma w indeksie, nie trafi do cytowań. Sprawdź w Google Search Console, czy podstrony usług są zaindeksowane, dodaj stronę do Bing Webmaster Tools i wysyłaj nowe oraz zmienione adresy przez IndexNow. Ten protokół powiadamia Bing i inne obsługujące go wyszukiwarki o zmianie od razu, bez czekania na kolejną wizytę robota.'] },
              { warunek: B1, p: ['Konfigurację krok po kroku opisujemy w poradniku ', { a: 'Bing Webmaster Tools i IndexNow', href: B1 }, '.'] },
            ],
          },
          {
            h3: '6. Wzmianki tam, gdzie model już szuka',
            bloki: [
              { p: ['Zanim zaczniesz zdobywać wzmianki, sprawdź, gdzie ich szukać. Zadaj ChatGPT i Perplexity pytania, które zadają Twoi klienci, i spisz strony, które modele cytują. To lista miejsc, w których obecność ma sens: katalog, portal branżowy, artykuł porównawczy, lokalny serwis informacyjny. W panelu klienta taką listę dostajesz przy każdym cotygodniowym pomiarze.'] },
            ],
          },
          {
            h3: '7. Pomiar co tydzień, a nie jedno pytanie',
            bloki: [
              {
                p: [
                  'Jedna odpowiedź to próbka. W naszym teście powtórzone po dobie pytanie o stolarza dało te same firmy, ale po zmianach na stronie i w wizytówce chcesz widzieć trend, a nie pojedynczy zrzut ekranu. Mierz na stałym zestawie pytań, w tych samych modelach i co tydzień. U nas pierwszym krokiem jest ',
                  { a: 'audyt widoczności w AI', href: A5 },
                  ', a kolejne tygodnie widać w panelu klienta.',
                ],
              },
              { warunek: SPRAWDZARKA, p: ['Pierwszą próbkę zrobisz za darmo: ', { a: 'sprawdź, czy ChatGPT poleca Twoją firmę', href: SPRAWDZARKA }, '.'] },
            ],
          },
          ...(REKLAMA_A2 ? [REKLAMA_A2] : []),
        ],
      },
      {
        id: 'czy-warto-placic',
        h2: 'Czy warto płacić za pozycjonowanie w ChatGPT?',
        bloki: [
          // AV-09: akapit-odpowiedź 40–60 słów (Q23 z koszyka).
          { p: ['Warto, jeśli wykonawca zaczyna od pomiaru: pokazuje listę pytań Twoich klientów, wynik startowy w ChatGPT i innych modelach oraz strony, które modele cytują, a potem co miesiąc raportuje zmiany. Nie warto, jeśli ktoś gwarantuje, że ChatGPT zacznie polecać Twoją firmę. U nas audyt kosztuje 990 zł netto, a cotygodniowy pomiar to dopłata 490 zł netto miesięcznie do pakietu SEO Standard.'] },
          // Q23 Perplexity 5.11.2026 (skille/ai-visibility/surowe/q23_perplexity.json): 10 źródeł,
          // 6 z „pozycjonowanie-w-chatgpt” w adresie; rada = lista 30–100 pytań, pomiar, raport.
          { p: ['To samo pytanie zadaliśmy 5.11.2026 Perplexity. Model poradził, żeby przed podpisaniem umowy poprosić o listę 30–100 realnych pytań klientów, pomiar początkowy i miesięczny raport z cytowaniami, i ostrzegł przed gwarancjami rekomendacji. 6 z 10 źródeł tej odpowiedzi miało w adresie „pozycjonowanie-w-chatgpt”. To kolejny przykład, że Perplexity cytuje strony napisane pod konkretne pytanie.'] },
        ],
      },
      {
        id: 'jak-mierzyc',
        h2: 'Jak mierzyć widoczność w ChatGPT',
        bloki: [
          { p: ['Pomiar zaczyna się od listy pytań, nie od narzędzia. Spisz 20–50 pytań, które klienci zadają przed zakupem: prośby o polecenie, pytania o cenę i porównania, z Twoim miastem i usługami. Każde pytanie zadawaj w tych samych warunkach i zapisuj trzy rzeczy: czy pada nazwa albo strona firmy, kogo model poleca zamiast Ciebie i jakie strony cytuje.'] },
          {
            p: [
              'Odsetek odpowiedzi z Twoją marką to wynik, a lista cytowanych stron to plan pracy. Ręcznie da się to robić przy kilku pytaniach, ale kilkadziesiąt pytań w czterech źródłach co tydzień wymaga automatu. Tak działa ',
              { a: 'pomiar widoczności w AI w panelu klienta', href: '/panel-klienta' },
              '.',
            ],
          },
          {
            obraz: {
              src: '/images/panel/ai.webp',
              width: 1600,
              height: 1025,
              alt: 'Tabela w panelu klienta: odsetek odpowiedzi ChatGPT, Perplexity, Gemini i przeglądu AI w Google z nazwą firmy w kolejnych tygodniach',
              podpis: 'Zakładka „Widoczność w AI” w demo panelu klienta (fikcyjna Stolarnia Demo, dane przykładowe).',
            },
          },
        ],
      },
      {
        id: 'czego-nie-obiecujemy',
        h2: 'Czego nie da się kupić ani obiecać',
        bloki: [
          { p: ['Nie da się kupić gwarancji, że ChatGPT wymieni Twoją firmę, gdy klient poprosi o polecenie. Model sam wybiera źródła, a jego zachowanie zmienia się razem z kolejnymi wersjami modelu i wyszukiwania. Uczciwy wykonawca obiecuje więc pracę i pomiar: konkretne zmiany w wizytówce, na stronie i w katalogach oraz wynik na tych samych pytaniach tydzień po tygodniu.'] },
          { p: ['Pamiętaj też o różnicy między pomiarem a tym, co widzi klient. Odpowiedzi w naszym teście pochodzą z API, a klient w aplikacji ChatGPT może dostać inną listę, bo aplikacja bierze pod uwagę jego lokalizację i wcześniejsze rozmowy. Dlatego wynik pomiaru traktujemy jako trend, a nie jako ranking.'] },
        ],
      },
    ],
    faqTytul: 'Pytania o pozycjonowanie w ChatGPT',
    // Brief A2 (FAQ 1–5) z korektami: bez pytania o cenę (FAQ huba), FAQ 5 bez zdania o oznaczeniu
    // reklam (brak odczytu strony OpenAI, CB-10), FAQ 4 ze zdaniem o generatorze dopiero po N1.
    faq: [
      {
        id: 'czy-da-sie-wypozycjonowac-firme-w-chatgpt',
        question: 'Czy da się wypozycjonować firmę w ChatGPT?',
        answer: ['Da się zwiększyć szansę, ale nie da się jej zagwarantować. ChatGPT z wyszukiwaniem buduje odpowiedź ze stron, które znajdzie, więc pracujesz nad tym, żeby trafił na Twoją firmę: wizytówka Google, wpisy w katalogach, wzmianki w mediach i strona z jasnymi odpowiedziami. Efekt sprawdzasz pomiarem, bo odpowiedzi modelu zmieniają się w czasie.'],
      },
      {
        id: 'czy-chatgpt-korzysta-z-google',
        question: 'Czy ChatGPT korzysta z Google?',
        answer: ['Przy poleceniach firm odsyła do Google. W naszym teście ChatGPT linkował wtedy prawie wyłącznie do Map Google: 59 z 62 linków w 11 odpowiedziach (4–5.11.2026). Przy pytaniach o ceny i rankingi cytował zwykłe strony www. Dlatego zadbana wizytówka i strona zaindeksowana w Google i Bing pracują jednocześnie na wyniki wyszukiwarki i na odpowiedzi ChatGPT.'],
      },
      {
        id: 'jak-dlugo-trwa-pozycjonowanie-w-chatgpt',
        question: 'Jak długo trwa, zanim ChatGPT zacznie wymieniać firmę?',
        answer: ['To zależy od tempa, w jakim nowe informacje trafiają do źródeł modelu. Poprawiona wizytówka albo nowa podstrona zaindeksowana w wyszukiwarce bywa widoczna w odpowiedziach po kilku tygodniach, a wzmianki w mediach i katalogach działają w miesiącach. Pierwszy pomiar robimy przed zmianami, żeby było z czym porównać.'],
      },
      {
        id: 'czy-llms-txt-pomaga-w-chatgpt',
        question: 'Czy plik llms.txt pomaga w ChatGPT?',
        answer: [
          'Nie ma na to dowodu. Według analizy Ahrefs żaden duży dostawca modeli, w tym OpenAI, nie potwierdził, że jego boty korzystają z llms.txt. Dla ChatGPT ważniejsze jest, czy OAI-SearchBot ma dostęp do strony w robots.txt i czy treść widać w HTML bez JavaScriptu.',
          { warunek: N1, tresc: [' Jeśli mimo to chcesz mieć ten plik, przygotujesz go w naszym darmowym ', { a: 'generatorze llms.txt', href: N1 }, '.'] },
        ],
      },
      {
        // id 'reklama' zostaje na FAQ, dopóki nie ma sekcji H3 #reklama (REKLAMA_A2): link huba
        // do /pozycjonowanie-w-ai/chatgpt#reklama otwiera wtedy to pytanie zamiast pustej kotwicy.
        id: REKLAMA_A2 ? 'reklama-w-chatgpt-a-widocznosc' : 'reklama',
        question: 'Czy reklama w ChatGPT poprawi widoczność firmy w odpowiedziach?',
        answer: ['Nie licz na to. Reklama działa tylko w czasie kampanii, a płacąc za nią, nie zmieniasz stron, z których model składa odpowiedź. Wzmianka w katalogu, artykule albo rankingu, które ChatGPT znajduje w wyszukiwaniu, zostaje także po wyłączeniu budżetu. Dlatego przy pozycjonowaniu w ChatGPT pracujemy nad źródłami, a reklamę traktujemy jako osobny kanał.'],
      },
    ],
    // CTA z PLAN-v2 6.5: „Audyt widoczności w AI za 990 zł netto” -> hub #ile-kosztuje + <Contact />.
    // Bez nagłówka: H1/H2 „Audyt widoczności w AI” ma tylko A5 (6.7, CS-07).
    cta: {
      tytul: 'Chcesz wiedzieć, co ChatGPT mówi dziś o Twojej firmie?',
      tekst: 'W audycie zadajemy 30 pytań Twoich klientów czterem źródłom odpowiedzi: ChatGPT, Perplexity, Gemini i przeglądowi AI w Google. Dostajesz listę firm polecanych zamiast Ciebie, stron cytowanych przez modele i plan zmian.',
      przyciski: [
        { tekst: 'Audyt widoczności w AI za 990 zł netto', href: HUB, kotwica: 'ileKosztuje', cta: 'geo_spoke_audit', glowny: true },
        { tekst: 'Zapytaj o audyt', kontakt: true, plan: 'audyt-ai', cta: 'geo_spoke_kontakt' },
      ],
    },
    sources: [
      { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User)', data: '2026-11-05' },
      { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What Is llms.txt, and Should You Care About It?', data: '2026-11-04' },
    ],
    // Pliki pomiaru (względem plan-seo-film-2026-11-04/); nie są renderowane.
    dane: [
      'dane/llm.json (4.11.2026: Q01–Q06 ChatGPT i Perplexity)',
      'skille/ai-visibility/surowe/q07–q20, q23, q30 (4–5.11.2026)',
      'skille/content-brief-ai-uslugi/dane/llm1–llm7*.json (4–5.11.2026)',
      'skille/ai-visibility/pomiar-llm-2026-11-05.csv (26 odpowiedzi Perplexity, domeny źródeł)',
      'skille/content-brief-ai-uslugi/zweryfikowane.json CB-01 (liczenie linków)',
    ],
    updated: '2026-11-05',
    opublikowano: null,
    aiQuestions: [
      { id: 'Q08', pytanie: 'Jak sprawić, żeby ChatGPT polecał moją firmę? Co konkretnie zrobić krok po kroku?' },
      { id: 'Q23', pytanie: 'Czy warto płacić za pozycjonowanie w ChatGPT? Czy to w ogóle działa?' },
      { id: 'Q24', pytanie: 'Skąd ChatGPT bierze informacje o firmach, które poleca?' },
    ],
  },

  // --- A5 /pozycjonowanie-w-ai/audyt-widocznosci (PLAN-v2 6.7, zał. G.1; CS-07, AV-13 po korekcie).
  // Makieta 10 (nowa, wzorzec 06). Jedyny URL z H1/H2 „Audyt widoczności w AI”; porównanie
  // „jednorazowo a co tydzień” tylko tutaj (6.0a), 5 metryk tylko linkiem do sprawdzarki.
  {
    slug: 'audyt-widocznosci',
    typ: 'usluga',
    serviceSchema: 'geo-audyt', // components/ServiceSchema.jsx: Service + Offer 990 PLN (tylko PL)
    okruszek: 'Audyt widoczności w AI',
    tag: 'Pozycjonowanie w AI · audyt',
    title: tytul(A5),
    description: opis(A5),
    h1: 'Audyt widoczności w AI (GEO) i monitoring co tydzień',
    // 58 słów, PLAN-v2 6.7 dosłownie (fakty z cennika GEO: components/GeoPageClient.jsx).
    answer: 'Audyt widoczności w AI kosztuje u nas 990 zł netto jednorazowo i jest zaliczany na pierwszy miesiąc abonamentu. Zadajemy ChatGPT, Perplexity, Gemini i przeglądowi AI w Google 30 pytań Twoich klientów, sprawdzamy, czy wymieniają Twoją firmę i z jakich źródeł korzystają, a w raporcie dostajesz plan na 90 dni. Stały pomiar co tydzień kosztuje 490 zł netto miesięcznie.',
    lead: [
      'Audyt to pierwszy krok w ',
      { a: 'pozycjonowaniu w AI', href: HUB },
      ': zanim cokolwiek zmienimy, sprawdzamy, czy i jak modele mówią dziś o Twojej firmie. Raport dostajesz w ciągu 5 dni roboczych, a potem omawiamy go z Tobą.',
    ],
    hero: [
      { tekst: 'Zamów audyt za 990 zł netto', kontakt: true, plan: 'audyt-ai', cta: 'geo_audyt_hero', glowny: true },
      { tekst: 'Zobacz przykładowy wynik', href: '#przyklad', cta: 'geo_audyt_przyklad' },
    ],
    sections: [
      {
        id: 'co-sprawdzamy',
        h2: 'Co sprawdzamy: 30 pytań w 4 źródłach',
        bloki: [
          { p: ['Razem z Tobą układamy 30 pytań, które zadają Twoi klienci: prośby o polecenie firmy w Twoim mieście, pytania o cenę usługi i porównania z innymi rozwiązaniami. Każde pytanie zadajemy w czterech miejscach:'] },
          { lista: [['ChatGPT z wyszukiwaniem w sieci ustawionym na Twoje miasto'], ['Perplexity'], ['Gemini'], ['przegląd AI w wynikach Google']] },
          { p: ['Zapisujemy pełną treść odpowiedzi i strony, na które powołują się modele. W raporcie dostajesz:'] },
          {
            lista: [
              ['odsetek odpowiedzi, w których pada nazwa albo strona Twojej firmy, osobno dla każdego źródła'],
              ['5 firm, które modele polecają zamiast Ciebie'],
              ['listę stron cytowanych w odpowiedziach, czyli miejsc, w których warto mieć wzmiankę'],
              ['10 rekomendacji ułożonych w plan działań na 90 dni'],
              ['45 minut omówienia wyników'],
            ],
          },
          // Definicje 5 metryk są na sprawdzarce (A3c, po T0.2) - tu tylko link, bez kopiowania tekstu.
          { warunek: SPRAWDZARKA, p: ['Każdą odpowiedź oceniamy w pięciu metrykach, które opisujemy przy ', { a: 'darmowej sprawdzarce widoczności w AI', href: SPRAWDZARKA, kotwicaId: KOTWICA_METRYK }, '.'] },
          { p: ['Cztery źródła, bo modele szukają w różnych miejscach. W naszym teście z 4–5.11.2026 przy prośbach o polecenie firmy 59 z 62 linków w odpowiedziach ChatGPT prowadziło do Map Google, a Perplexity nie podał linku do Map w żadnej z 23 odpowiedzi.'] },
          { warunek: A2, p: ['Metodę i wnioski opisujemy w poradniku ', { a: 'jak sprawić, żeby ChatGPT polecał firmę', href: A2, kotwica: 'zrodla' }, '.'] },
        ],
        podsekcje: [
          {
            h3: 'Jak układamy 30 pytań',
            bloki: [
              { p: ['Pytania piszemy tak, jak zadaje je klient: pełnym zdaniem, z usługą i miastem albo dzielnicą, na przykład „Polecisz dobrego stolarza w Warszawie?”. Dzielimy je na trzy typy: prośby o polecenie, pytania o cenę i porównania. Proporcje ustalamy z Tobą, bo firma, do której klienci trafiają z Map, potrzebuje więcej pytań o polecenie, a firma z wyceną na stronie więcej pytań o cenę.'] },
              { p: ['Typy pytań dobieramy tak, żeby sprawdzić oba kanały: wizytówkę, do której ChatGPT odsyłał przy poleceniach, i stronę, którą cytował przy pytaniach o cenę. Jeśli model pomija Twoją firmę przy poleceniach, zaczynamy od wizytówki, a jeśli przy pytaniach o cenę, od strony.'] },
            ],
          },
        ],
      },
      {
        id: 'przyklad',
        h2: 'Przykładowy wynik z panelu klienta',
        bloki: [
          {
            obraz: {
              src: '/images/panel/ai.webp',
              width: 1600,
              height: 1025,
              alt: 'Zakładka Widoczność w AI w panelu klienta: odsetek odpowiedzi z nazwą firmy w ChatGPT, Perplexity, Gemini i przeglądzie AI w Google, tydzień po tygodniu',
              podpis: 'Demo panelu klienta dla fikcyjnej firmy Stolarnia Demo: 8 kolejnych tygodni pomiaru (dane przykładowe).',
            },
          },
          {
            p: [
              'Tak wygląda pomiar w panelu: wiersz to tydzień, kolumna to źródło odpowiedzi, a pod tabelą są pytania z ostatniego pomiaru z pełną treścią odpowiedzi. W audycie dostajesz pierwszy taki pomiar, a przy monitoringu z każdym tygodniem w panelu przybywa wiersz. Jak wygląda cały panel, zobaczysz bez logowania w ',
              { a: 'demo panelu klienta', href: '/panel-klienta' },
              '.',
            ],
          },
          { p: ['W wyniku patrz najpierw na źródło z najniższym odsetkiem, a potem na firmy polecane zamiast Ciebie. Jeśli te same firmy wracają w kilku źródłach, lista cytowanych stron pokazuje, w których katalogach, rankingach albo artykułach modele o nich czytają. Tam warto zdobyć wzmiankę o Twojej firmie.'] },
        ],
      },
      {
        id: 'monitoring',
        h2: 'Monitoring po audycie: dopłata 490 zł netto miesięcznie',
        bloki: [
          {
            p: [
              'Audyt pokazuje stan na dziś. Żeby widzieć, czy zmiany działają, te same 30 pytań trzeba zadawać regularnie. Monitoring to dopłata 490 zł netto miesięcznie do pakietu ',
              { a: 'SEO Standard', href: '/cennik-pozycjonowania' },
              ', czyli razem 2 390 zł netto miesięcznie, albo część pakietu SEO Premium (od 2 500 zł netto miesięcznie).',
            ],
          },
          { p: ['Sam audyt wystarczy, jeśli zmiany chcesz wprowadzić we własnym zakresie i sprawdzić efekt za kilka miesięcy. Monitoring ma sens, gdy zmiany wprowadzamy razem: po każdej nowej wzmiance, poprawce wizytówki czy nowej podstronie widzisz w panelu, czy odsetek odpowiedzi z Twoją firmą rośnie.'] },
          { p: ['W monitoringu dostajesz:'] },
          {
            lista: [
              ['pomiar 30 pytań co tydzień w czterech źródłach, z pełną treścią odpowiedzi w panelu'],
              ['2 działania miesięcznie pod AI, na przykład wzmiankę w cytowanym źródle albo treść, która odpowiada na pytanie klientów'],
              ['umowę miesięczną bez dodatkowych zobowiązań'],
            ],
          },
          // Koszt API: dane/koszty-dfs-workflow.csv (DataForSEO, 4.11.2026): ChatGPT z wyszukiwaniem
          // 0,0296–0,0302 USD, Perplexity 0,0064–0,0068 USD za odpowiedź.
          { p: ['Sama technika pomiaru jest tania: zapytanie przez API kosztuje około 0,030 USD za odpowiedź ChatGPT z wyszukiwaniem i 0,006 USD za odpowiedź Perplexity (DataForSEO, nasze rozliczenia z 4.11.2026). Płacisz więc przede wszystkim za ułożenie pytań, analizę odpowiedzi i działania, a nie za same zapytania.'] },
        ],
      },
      {
        id: 'audyt-a-sprawdzarka',
        h2: 'Audyt a darmowa sprawdzarka: 30 pytań zamiast 3',
        bloki: [
          {
            p: [
              'Na naszej stronie jest też ',
              { a: 'darmowa sprawdzarka widoczności w AI', href: SPRAWDZARKA },
              '. Odpowiada na pierwsze pytanie: czy modele w ogóle łączą Twoją firmę z branżą i miastem. Audyt odpowiada na kolejne: dlaczego tak jest i co zmienić.',
            ],
          },
          {
            tabela: {
              id: 'tabela-audyt-sprawdzarka',
              caption: 'Darmowa sprawdzarka i audyt widoczności w AI',
              columns: [
                { key: 'kryterium', label: 'Kryterium' },
                { key: 'sprawdzarka', label: 'Darmowa sprawdzarka' },
                { key: 'audyt', label: 'Audyt (990 zł netto)' },
              ],
              // Zakres sprawdzarki: components/AiCheckerClient.jsx (3 pytania, ChatGPT + Gemini,
              // 6 odpowiedzi, ok. 30 s, 3 firmy na IP na dobę). Zakres audytu: oferta GEO.
              rows: [
                { id: 'pytania', kryterium: 'Pytania', sprawdzarka: '3, ułożone automatycznie z branży i miasta', audyt: '30, ułożone z Tobą: Twoje usługi i miasta' },
                { id: 'zrodla', kryterium: 'Źródła odpowiedzi', sprawdzarka: 'ChatGPT z wyszukiwaniem i Gemini', audyt: 'ChatGPT, Perplexity, Gemini i przegląd AI w Google' },
                { id: 'wynik', kryterium: 'Wynik', sprawdzarka: 'w ilu z 6 odpowiedzi pada Twoja firma i jakie źródła podały modele', audyt: 'odsetek odpowiedzi z marką w każdym źródle, 5 firm polecanych zamiast Ciebie, cytowane strony' },
                { id: 'co-dalej', kryterium: 'Co dalej', sprawdzarka: 'ogólne wskazówki', audyt: '10 rekomendacji w planie na 90 dni i 45 minut omówienia' },
                { id: 'czas', kryterium: 'Czas', sprawdzarka: 'około 30 sekund', audyt: '5 dni roboczych' },
                { id: 'cena', kryterium: 'Cena', sprawdzarka: 'bezpłatnie, do 3 firm z jednego adresu IP na dobę', audyt: '990 zł netto, zaliczane na pierwszy miesiąc abonamentu' },
              ],
              przypis: 'Zakres sprawdzarki i audytu według naszej oferty, stan na 5.11.2026.',
            },
          },
          { p: ['Jeśli sprawdzarka pokazała, że modele nie wymieniają Twojej firmy, audyt powie, kogo polecają zamiast Ciebie i z jakich stron o tych firmach wiedzą.'] },
        ],
      },
    ],
    faqTytul: 'Pytania o audyt widoczności w AI',
    // PLAN-v2 zał. G.1, FAQ 1–4 dosłownie.
    faq: [
      {
        id: 'ile-trwa-audyt-widocznosci-w-ai',
        question: 'Ile trwa audyt widoczności w AI?',
        answer: ['Audyt trwa 5 dni roboczych od otrzymania listy usług i miast, w których chcesz być polecany. W tym czasie zadajemy 30 pytań ChatGPT, Perplexity, Gemini i przeglądowi AI w Google, zapisujemy odpowiedzi razem ze źródłami i przygotowujemy raport z planem działań na 90 dni.'],
      },
      {
        id: 'czym-audyt-rozni-sie-od-sprawdzarki',
        question: 'Czym audyt różni się od darmowej sprawdzarki?',
        answer: ['Sprawdzarka zadaje 3 pytania i pokazuje 6 odpowiedzi, więc daje próbkę. W audycie układamy 30 pytań z Twoimi usługami i miastami, sprawdzamy cztery źródła odpowiedzi i strony, z których modele biorą informacje. Na końcu dostajesz listę zmian z kolejnością, a nie sam wynik.'],
      },
      {
        id: 'czy-po-audycie-musze-kupic-abonament',
        question: 'Czy po audycie muszę kupić abonament?',
        answer: ['Nie. Audyt kosztuje 990 zł netto i jest osobną usługą. Jeśli potem wybierzesz abonament, kwotę audytu zaliczamy na pierwszy miesiąc. Stały pomiar co tydzień kosztuje 490 zł netto miesięcznie jako dopłata do SEO Standard albo jest w cenie SEO Premium.'],
      },
      {
        id: 'czy-gwarantujecie-polecenie-w-chatgpt',
        question: 'Czy gwarantujecie, że ChatGPT zacznie polecać moją firmę?',
        answer: ['Nie. Nikt nie kontroluje odpowiedzi modeli, więc nie obiecujemy cytowań ani miejsc na listach. Obiecujemy pomiar na tych samych 30 pytaniach co tydzień, pracę nad źródłami, z których modele korzystają, i raport, w którym widać, czy odsetek odpowiedzi z Twoją marką rośnie.'],
      },
    ],
    cta: {
      tytul: 'Zamów audyt widoczności w AI',
      tekst: 'Napisz w formularzu, jakie usługi oferujesz i w jakich miastach chcesz być polecany. Cena: 990 zł netto, zaliczana na pierwszy miesiąc, jeśli potem wybierzesz abonament.',
      przyciski: [
        { tekst: 'Zamów audyt za 990 zł netto', kontakt: true, plan: 'audyt-ai', cta: 'geo_audyt_cta', glowny: true },
      ],
    },
    // Liczby A5 to nasza oferta i nasz pomiar (opisany na A2) - bez źródeł zewnętrznych do listy.
    sources: [],
    dane: [
      'dane/koszty-dfs-workflow.csv (koszt odpowiedzi DataForSEO, 4.11.2026)',
      'components/GeoPageClient.jsx (oferta: 990 zł, 490 zł, Premium od 2 500 zł, 5 dni, 10 rekomendacji, 45 min)',
      'components/AiCheckerClient.jsx (zakres sprawdzarki)',
      'skille/content-brief-ai-uslugi/zweryfikowane.json CB-01 (59 z 62, Perplexity 0 z 23)',
    ],
    updated: '2026-11-05',
    opublikowano: null,
    aiQuestions: [
      { id: 'Q19', pytanie: 'Która agencja SEO co tydzień mierzy, czy ChatGPT i Gemini polecają firmę klienta?' },
      { id: 'Q07', pytanie: 'Polecisz agencję, która zajmuje się pozycjonowaniem w AI (GEO) w Warszawie? Ile to kosztuje?' },
    ],
  },
];

/** Wpis spoke'a po slugu albo undefined. */
export function wpisPytaniaAi(slug) {
  return pytaniaAi.find((p) => p.slug === slug);
}
