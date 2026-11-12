// Szablon doboru słów kluczowych (11.11.2026): /narzedzia/dobor-slow-kluczowych
// i /en/tools/keyword-research-template. Kontrakt danych: lib/szablony/README.md.
// PDF przez panel (id 'dobor-slow-kluczowych'): public/pliki/szablon-doboru-slow-kluczowych.pdf (PL)
// i keyword-research-template.pdf (EN), źródła HTML w scripts/szablony/pdf/.
// Frazy (Google Ads przez DataForSEO, 11.11.2026, prace-2026-11-11/szablony/nowe-tematy/dane/volume-*.tsv):
// PL „jak dobrać słowa kluczowe” 110/mies. (klaster ok. 650: jak dobierać słowa kluczowe 110, słowa
// kluczowe seo 110, analiza słów kluczowych 90, słowa kluczowe przykłady 90, kanibalizacja słów
// kluczowych 90, dobór słów kluczowych 50); EN „keyword research template” 110 (keyword mapping 170,
// keyword research checklist 70, keyword research process 70, keyword mapping template 50,
// how to do keyword research 880 tylko w treści). Odrzucone głowy: „keyword research” (PL SERP 10/10
// angielskich wyników), „słowa kluczowe” (intencja mieszana). Kanibalizacja: nie celujemy w „jak sprawdzić
// słowa kluczowe konkurencji” (szablon analizy konkurencji i /blog/analiza-konkurencji-seo-przewodnik)
// ani w „strategia seo” (szablon strategii).
// Metoda = playbook 3.1 (seedy z 4 źródeł, klastrowanie po SERP ≥ 40–50%, intencja z układu SERP,
// klaster → 1 URL), 3.2 (trudność względem własnego autorytetu, kanibalizacja co miesiąc), 2.2 (ICE
// w leadach); PLAN-v2 4.5 (jedna migawka SERP to szum: szarą strefę sprawdzać ponownie innego dnia);
// film airSlate F1 (autosugestie), F3 (dokładne brzmienie frazy w title/H1, ale klaster = 1 URL),
// F6 (pytania → odpowiedzi wprost, cytowane przez AI). Przykład (biuro rachunkowe) jest fikcyjny,
// a liczby w nim umowne. Zdania o zasadach Google: tylko ze stron z listy źródeł (odczyt 11.11.2026).
// PDF (5 stron A4, 8 części jak w podglądzie) generuje skrypt gen_pdf_html.py z folderu roboczego
// prace-2026-11-11/szablony/nowy-dobor-slow-kluczowych/skrypty (PL i EN z jednej struktury), druk: pdf.mjs (Playwright).

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: przewodnik SEO dla początkujących (słowa, których szukają użytkownicy, meta keywords, upychanie słów kluczowych, słowa kluczowe w adresie)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: zasady dotyczące spamu (upychanie słów kluczowych, strony przejściowe)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: tworzenie przydatnych, wiarygodnych treści przeznaczonych dla ludzi (brak preferowanej liczby słów)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: konsolidacja zduplikowanych adresów URL (przekierowania i canonical jako silne sygnały)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: funkcje AI w wyszukiwarce (przegląd AI, tryb AI) a Twoja witryna', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Pomoc Search Console: raport Skuteczność (kliknięcia, wyświetlenia, CTR, średnia pozycja)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/17011259', nazwa: 'Pomoc Search Console: wymiary raportu Skuteczność (zapytania anonimizowane, eksport zbiorczy)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/17010575', nazwa: 'Pomoc Search Console: rozbieżności w danych (tabela do 1000 wierszy)', data: '2026-11-11' },
  { url: 'https://support.google.com/google-ads/answer/7337243', nazwa: 'Pomoc Google Ads: Planer słów kluczowych (szacunki wyszukiwań, dane rozliczeniowe, frazy o bardzo małym wolumenie)', data: '2026-11-11' },
  { url: 'https://support.google.com/trends/answer/4365533', nazwa: 'Pomoc Google Trends: jak powstają dane (normalizacja do skali 0–100)', data: '2026-11-11' },
];

const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO Starter Guide (your readers’ search terms, meta keywords, keyword stuffing, keywords in URLs)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies (keyword stuffing, doorway abuse)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Creating helpful, reliable, people-first content (no preferred word count)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Consolidate duplicate URLs (redirects and rel="canonical" as strong signals)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website (AI Overviews, AI Mode)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search Console Help: Performance report overview (clicks, impressions, CTR, average position)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/17011259', nazwa: 'Search Console Help: Performance report dimensions (anonymized queries, bulk data export)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/17010575', nazwa: 'Search Console Help: Troubleshooting data discrepancies (1,000-row table limit)', data: '2026-11-11' },
  { url: 'https://support.google.com/google-ads/answer/7337243', nazwa: 'Google Ads Help: Use Keyword Planner (search estimates, billing setup, very low-volume keywords)', data: '2026-11-11' },
  { url: 'https://support.google.com/trends/answer/4365533', nazwa: 'Google Trends Help: FAQ about Google Trends data (normalized 0–100 scale)', data: '2026-11-11' },
];

// Kroki: te same w HowTo (schema) i w widocznej sekcji „jak-wypelnic” (schema tylko dla treści widocznej).
const KROKI_PL = [
  { name: 'Opisz firmę i cel', text: 'Wpisz usługi, obszar działania, język strony i to, czego nie sprzedajesz. Frazy spoza oferty odrzucisz od razu, zanim zaczniesz je liczyć.' },
  { name: 'Zbierz frazy z czterech źródeł', text: 'Search Console, pytania klientów, podpowiedzi Google z sekcją „Podobne pytania” oraz konkurencja z Planerem słów kluczowych. Na tym etapie tylko zapisuj, bez oceniania.' },
  { name: 'Uzupełnij wolumen i obecną pozycję', text: 'Przy każdej frazie wpisz liczbę wyszukiwań ze źródłem albo „brak danych” oraz pozycję i adres strony z Search Console.' },
  { name: 'Sprawdź intencję w wynikach Google', text: 'Zapisz, jakie strony są w TOP 10: usługi, poradniki, porównania, sklepy, Mapy, wideo, przegląd AI. Intencję czytaj z wyników, nie z brzmienia frazy.' },
  { name: 'Pogrupuj frazy w klastry', text: 'Porównaj TOP 10 par fraz. Cztery lub więcej wspólnych adresów to jeden klaster, zero lub jeden to osobne klastry. Szarą strefę sprawdź ponownie innego dnia.' },
  { name: 'Przypisz podstrony i priorytety', text: 'Każdemu klastrowi daj jeden adres, działanie i ocenę ICE. Najpierw klastry blisko zakupu i frazy, na które strona jest już na pozycjach 4–20.' },
  { name: 'Sprawdź kanibalizację i przekaż mapę dalej', text: 'Wpisz zapytania, na które wyświetla się kilka adresów, i decyzję dla każdego. Gotowe klastry przenieś do strategii SEO i content planu.' },
];

const KROKI_EN = [
  { name: 'Describe the business and the goal', text: 'List your services, service area, site language and what you do not sell. That lets you drop off-topic keywords before you spend time scoring them.' },
  { name: 'Collect seed keywords from four sources', text: 'Search Console, customer questions, Google autocomplete with People also ask, and competitors plus Keyword Planner. At this stage, just collect; do not judge.' },
  { name: 'Add search volume and current rankings', text: 'For each keyword, enter monthly searches with the source, or “no data”, plus your current position and ranking URL from Search Console.' },
  { name: 'Check search intent in Google', text: 'Note what ranks in the top 10: service pages, guides, comparisons, shops, the map pack, videos, an AI Overview. Read intent from the results, not from the wording.' },
  { name: 'Group keywords into clusters', text: 'Compare the top 10 results for pairs of keywords. Four or more shared URLs means one cluster; zero or one means separate clusters. Re-check the grey zone on another day.' },
  { name: 'Assign target pages and priorities', text: 'Give every cluster one URL, an action and an ICE score. Start with clusters close to a purchase and keywords where you already rank in positions 4–20.' },
  { name: 'Check for cannibalization and hand the map on', text: 'List queries where several of your URLs show up, with a decision for each. Move the finished clusters into your SEO strategy and content calendar.' },
];

const olKroki = (kroki) => `<ol>\n${kroki.map((k) => `<li><strong>${k.name}.</strong> ${k.text}</li>`).join('\n')}\n</ol>`;

const W5 = '<td>…</td><td>…</td><td>…</td><td>…</td><td>…</td>';

export default {
  slug: 'dobor-slow-kluczowych',
  sciezkaEn: '/tools/keyword-research-template',
  plik: 'dobor-slow-kluczowych',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'jak dobrać słowa kluczowe', en: 'keyword research template' },
  frazyDodatkowe: {
    pl: ['jak dobierać słowa kluczowe', 'słowa kluczowe seo', 'analiza słów kluczowych', 'słowa kluczowe przykłady', 'kanibalizacja słów kluczowych', 'dobór słów kluczowych'],
    en: ['keyword mapping', 'keyword research checklist', 'keyword research process', 'keyword mapping template', 'how to do keyword research'],
  },
  seo: {
    pl: {
      tytul: 'Jak dobrać słowa kluczowe: darmowy szablon mapy fraz (PDF)',
      opis: 'Jak dobrać słowa kluczowe krok po kroku: źródła fraz, intencja, klastry po wynikach Google, mapa podstron i kanibalizacja. Darmowy szablon PDF.',
    },
    en: {
      tytul: 'Keyword Research Template: Free Keyword Mapping PDF',
      opis: 'Free keyword research template: gather seed keywords, check search intent, cluster by shared Google results, build a keyword map and fix cannibalization.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Dobór słów kluczowych',
    tag: 'Szablon PDF do pobrania',
    h1: 'Jak dobrać słowa kluczowe: szablon doboru słów kluczowych i mapa fraz',
    lead: 'Jak dobrać słowa kluczowe? Zbierz frazy z Search Console, pytań klientów, podpowiedzi Google i od konkurencji, sprawdź intencję w wynikach, pogrupuj frazy w klastry po wspólnych adresach w TOP 10 i każdemu klastrowi przypisz jedną podstronę. Nasz szablon PDF prowadzi przez te kroki i kończy się gotową mapą słów kluczowych.',
    karta: {
      nazwa: 'Szablon doboru słów kluczowych (PDF)',
      opis: 'Od listy fraz do mapy podstron: cztery źródła słów kluczowych, intencja, klastry po wynikach Google, priorytety ICE i kontrola kanibalizacji.',
      cta: 'Pobierz szablon',
    },
    sekcje: [
      {
        id: 'slowa-kluczowe-seo',
        h2: 'Słowa kluczowe SEO: czym są i jakie mają rodzaje (przykłady)',
        html: `<p>Słowa kluczowe SEO to zapytania, które klienci wpisują w Google, gdy szukają tego, co sprzedajesz, albo odpowiedzi na swój problem. Rzadko są to pojedyncze słowa. Zwykle to frazy z kilku wyrazów, np. „biuro rachunkowe poznań” albo „ile kosztuje księgowość dla jdg”. W praktyce „słowo kluczowe” i „fraza kluczowa” znaczą to samo.</p>
<p>Dobór słów kluczowych nie kończy się na liście fraz. Lista ze stu zapytań nic nie mówi zespołowi, który ma pisać treści i poprawiać stronę. Wynikiem ma być mapa: które frazy obsługuje która podstrona, jaka jest ich intencja i co trzeba zrobić. Dopiero taka mapa zasila <a href="/narzedzia/szablon-strategii-seo">strategię SEO</a> i <a href="/narzedzia/content-plan">content plan</a>.</p>
<p>Google radzi w przewodniku SEO dla początkujących, żeby myśleć o słowach, których może szukać użytkownik, i pamiętać, że osoby znające temat używają innych słów niż nowicjusze. Księgowa wpisze „KPiR dla jdg”, a właściciel nowej firmy „jak prowadzić księgowość w małej firmie”. Dobra mapa obejmuje oba sposoby mówienia o tej samej potrzebie.</p>`,
        tabela: {
          id: 'tabela-rodzaje-slow-kluczowych',
          caption: 'Rodzaje słów kluczowych: przykłady dla biura rachunkowego z Poznania (firma przykładowa)',
          columns: [
            { key: 'rodzaj', label: 'Rodzaj frazy' },
            { key: 'przyklad', label: 'Przykład' },
            { key: 'intencja', label: 'Czego szuka klient' },
            { key: 'gdzie', label: 'Gdzie ją obsłużyć' },
          ],
          rows: [
            { rodzaj: 'Ogólna (krótka)', przyklad: 'biuro rachunkowe', intencja: 'Różnych rzeczy naraz: firm w okolicy, katalogów, definicji', gdzie: 'Zwykle za szeroka na start; obsługuje ją strona główna albo strona usługi' },
            { rodzaj: 'Lokalna', przyklad: 'biuro rachunkowe poznań', intencja: 'Firmy w swoim mieście', gdzie: 'Strona usługi z lokalną treścią i wizytówka Google' },
            { rodzaj: 'Z długiego ogona', przyklad: 'księgowość dla jednoosobowej działalności poznań', intencja: 'Konkretnej usługi dla siebie', gdzie: 'Podstrona usługi albo jej wyraźna sekcja' },
            { rodzaj: 'Pytanie o cenę', przyklad: 'ile kosztuje biuro rachunkowe dla jdg', intencja: 'Porównania cen przed decyzją', gdzie: 'Poradnik z widełkami cen i linkiem do cennika' },
            { rodzaj: 'Porównawcza', przyklad: 'biuro rachunkowe czy księgowość online', intencja: 'Wyboru między opcjami', gdzie: 'Artykuł porównawczy z tabelą' },
            { rodzaj: 'Poradnikowa', przyklad: 'ryczałt czy skala podatkowa', intencja: 'Wiedzy, jeszcze nie usługi', gdzie: 'Poradnik na blogu z linkiem do usługi' },
            { rodzaj: 'Z nazwą firmy', przyklad: '[nazwa biura] opinie', intencja: 'Konkretnej firmy (nawigacyjna)', gdzie: 'Strona o firmie, opinie, wizytówka; zwykle bez nowej treści' },
          ],
          przypis: 'Firma i frazy są przykładowe. Intencję każdej frazy sprawdzaj w wynikach Google, a nie po jej brzmieniu.',
        },
        htmlPo: `<p>Fraza z długiego ogona ma mniej wyszukiwań, ale zwykle jaśniejszą intencję i słabszą konkurencję. W małej firmie usługowej to często właśnie takie frazy przynoszą pierwsze zapytania od klientów, zanim strona wejdzie na frazy ogólne.</p>`,
      },
      {
        id: 'skad-brac-frazy',
        h2: 'Skąd brać słowa kluczowe: cztery źródła listy startowej',
        html: `<p>Zanim zaczniesz oceniać frazy, zbierz listę startową. Korzystaj z czterech źródeł naraz, bo każde widzi inny kawałek popytu.</p>
<ol>
<li><strong>Google Search Console.</strong> W raporcie Skuteczność otwórz kartę Zapytania i posortuj ją po wyświetleniach. Szukasz zapytań z wyświetleniami i bez kliknięć oraz fraz na pozycjach 4–20: Google już łączy z nimi Twoją stronę i niewiele jej brakuje. Tabela pokazuje najwyżej 1000 wierszy, a rzadkie zapytania są anonimizowane i pomijane. Przy większej stronie zawężaj dane filtrami, np. wyrażeniem regularnym. Najpełniejszą listę zapytań Google udostępnia w eksporcie zbiorczym danych (bulk data export).</li>
<li><strong>Pytania klientów.</strong> Zapisz, o co klienci pytają handlowców i obsługę oraz co piszą w formularzu kontaktowym. To najczystszy sygnał intencji i język, którego klienci używają naprawdę.</li>
<li><strong>Podpowiedzi Google.</strong> Wpisz nazwę usługi i zapisz autosugestie oraz pytania z sekcji „Podobne pytania”. Dopisz do usługi słowa „cena”, „jak”, „czy”, „dla” albo nazwę miasta i zobacz, jak Google rozwija zapytanie. Tak powstaje długi ogon, którego nie ma na żadnej gotowej liście.</li>
<li><strong>Konkurencja i narzędzie do fraz.</strong> Sprawdź, na jakie frazy są widoczni 3–5 Twoich głównych konkurentów, i rozszerz listę w narzędziu. Bezpłatny jest Planer słów kluczowych w Google Ads. Płatne narzędzia, np. Senuto, Semrush albo Ahrefs, dodają dane o frazach konkurentów i ich trudności.</li>
</ol>`,
        tabela: {
          id: 'tabela-zrodla-fraz',
          caption: 'Źródła słów kluczowych: co dają i na co uważać',
          columns: [
            { key: 'zrodlo', label: 'Źródło' },
            { key: 'daje', label: 'Co daje' },
            { key: 'uwaga', label: 'Ograniczenia' },
          ],
          rows: [
            { zrodlo: 'Google Search Console', daje: 'Prawdziwe zapytania, wyświetlenia, kliknięcia i pozycje Twojej strony', uwaga: 'Tylko frazy, przy których strona już się wyświetla; w tabeli do 1000 wierszy; rzadkie zapytania ukryte' },
            { zrodlo: 'Pytania klientów', daje: 'Język klientów i intencję zakupową', uwaga: 'Brak liczb; trzeba je zbierać na bieżąco' },
            { zrodlo: 'Autosugestie i „Podobne pytania”', daje: 'Długi ogon i pytania, które ludzie naprawdę wpisują', uwaga: 'Bez liczby wyszukiwań; wynik zależy od lokalizacji' },
            { zrodlo: 'Planer słów kluczowych (Google Ads)', daje: 'Szacunkową liczbę wyszukiwań miesięcznie i nowe pomysły na frazy', uwaga: 'Szacunki, nie dokładne liczby; wymaga konta z danymi rozliczeniowymi; nie pokazuje fraz o bardzo małej liczbie wyszukiwań' },
            { zrodlo: 'Google Trends', daje: 'Sezonowość i porównanie zainteresowania tematami', uwaga: 'Wartości względne w skali 0–100, nie liczba wyszukiwań' },
            { zrodlo: 'Płatne narzędzia SEO', daje: 'Frazy konkurentów, trudność, luki w treściach', uwaga: 'Własne szacunki narzędzia, różne od danych Google; koszt' },
          ],
        },
        htmlPo: `<p>„Brak danych” w narzędziu nie znaczy „nikt nie szuka”. Planer nie pokazuje fraz o bardzo małej liczbie wyszukiwań, a w niszach B2B i usługach lokalnych to często właśnie one dają zapytania. Jeśli fraza wraca w pytaniach klientów i w podpowiedziach Google, zostaw ją na liście z dopiskiem „brak danych”. Jak porównać się z konkurentami krok po kroku, pokazuje <a href="/narzedzia/szablon-analizy-konkurencji-seo">szablon analizy konkurencji SEO</a>, a jak znaleźć tematy, których brakuje na Twojej stronie, poradnik <a href="/blog/analiza-luk-contentowych">analiza luk contentowych</a>.</p>`,
      },
      {
        id: 'analiza-slow-kluczowych',
        h2: 'Analiza słów kluczowych: wolumen, intencja, trudność i wartość',
        html: `<p>Analiza słów kluczowych odpowiada na jedno pytanie: które frazy obsłużyć najpierw. Sam wolumen nie wystarczy. Fraza z dużą liczbą wyszukiwań może mieć intencję, której Twoja strona nie obsłuży, a fraza z kilkudziesięcioma wyszukiwaniami miesięcznie może przynosić klientów co tydzień. Szablon prowadzi przez sześć kryteriów. Wolumen, intencję i obecną pozycję wpisujesz przy każdej frazie (część 3), dopasowanie do oferty sprawdzasz już w metryczce (część 1), a bliskość zakupu i trudność trafiają do oceny ICE klastra (część 6).</p>`,
        tabela: {
          id: 'tabela-kryteria-oceny',
          caption: 'Kryteria oceny frazy w szablonie doboru słów kluczowych',
          columns: [
            { key: 'kryterium', label: 'Kryterium' },
            { key: 'pytanie', label: 'Pytanie' },
            { key: 'dane', label: 'Skąd dane' },
            { key: 'ocena', label: 'Jak ocenić' },
          ],
          rows: [
            { kryterium: 'Wolumen', pytanie: 'Ile osób szuka miesięcznie i czy popyt jest sezonowy?', dane: 'Planer słów kluczowych, wyświetlenia w Search Console, Google Trends', ocena: 'Liczba ze źródłem albo „brak danych”; patrz na 12 miesięcy, nie na jeden' },
            { kryterium: 'Intencja', pytanie: 'Czego szuka osoba, która wpisuje frazę?', dane: 'Typ stron w TOP 10, przegląd AI, Mapy, sklepy, wideo', ocena: 'Informacyjna, komercyjna, transakcyjna, lokalna albo nawigacyjna' },
            { kryterium: 'Bliskość zakupu', pytanie: 'Czy po tej frazie ktoś może zostać klientem?', dane: 'Pytania klientów, oferta, dane sprzedaży', ocena: '1–10: ile zapytań od klientów może dać (wpływ w ICE)' },
            { kryterium: 'Trudność', pytanie: 'Czy realnie wejdziesz do TOP 10?', dane: 'Kto jest w TOP 10, Twoje obecne pozycje, liczba Twoich treści w temacie', ocena: 'Względem własnej strony, nie tylko według wskaźnika z narzędzia; wysoka trudność obniża łatwość w ICE' },
            { kryterium: 'Obecna pozycja', pytanie: 'Czy strona już się wyświetla na tę frazę?', dane: 'Search Console', ocena: 'Pozycje 4–20 to najszybsze wygrane' },
            { kryterium: 'Dopasowanie do oferty', pytanie: 'Czy masz usługę albo wiedzę, która odpowiada na frazę?', dane: 'Oferta, eksperci w firmie', ocena: 'Frazy spoza oferty odrzuć, nawet z dużym wolumenem' },
          ],
        },
        htmlPo: `<h3>Kolejność: metoda ICE</h3>
<p>W szablonie każdy klaster dostaje trzy oceny w skali 1–10: wpływ (ile zapytań od klientów może dać, a nie ile ruchu), pewność (na ilu źródłach danych opierasz ocenę) i łatwość (ile pracy wymaga, czy potrzebny jest programista i jak mocne strony zajmują TOP 10). Iloczyn tych ocen wyznacza kolejność. Pewność obniżaj, gdy opierasz się na jednym źródle. Wartość frazy w złotych pomoże oszacować <a href="/narzedzia/kalkulator-strat-seo">kalkulator strat SEO</a>: z liczby wyszukiwań, konwersji i wartości klienta liczy, ile zysku trafia do konkurencji, gdy nie ma Cię w TOP 3.</p>
<p>Trudność oceniaj względem własnej strony. Witryna, która ma już kilka dobrych treści w temacie, może wejść na frazy, które narzędzie oznacza jako trudne. Jak dobierać słowa kluczowe dla nowej strony bez linków? Zacznij od długiego ogona i fraz lokalnych, a frazy ogólne zostaw na drugi etap.</p>`,
      },
      {
        id: 'intencja-i-klastry',
        h2: 'Intencja i klastry: grupuj frazy po wynikach Google, nie po podobieństwie słów',
        html: `<p>Intencję czytaj z wyników, a nie z brzmienia frazy. Wpisz frazę w Google i zobacz, co jest w pierwszej dziesiątce: strony usług, poradniki, porównania, sklepy, Mapy, wideo albo przegląd AI. Jeśli dla „biuro rachunkowe poznań” widzisz Mapy i strony biur, a dla „ile kosztuje biuro rachunkowe” poradniki z widełkami cen, to dwie różne intencje i dwie różne podstrony.</p>
<p>Do jednego klastra łącz frazy, dla których Google pokazuje podobne wyniki. Test jest prosty: porównaj TOP 10 dwóch fraz i policz wspólne adresy. Sprawdzaj w oknie prywatnym albo w narzędziu z tą samą lokalizacją. Wyniki zmieniają się z dnia na dzień, więc w przypadkach granicznych powtórz test innego dnia. Zanim połączysz albo usuniesz istniejące strony, oprzyj decyzję na 2–3 testach z różnych dni.</p>`,
        tabela: {
          id: 'tabela-test-wspolnych-wynikow',
          caption: 'Test wspólnych wyników: kiedy frazy trafiają na jedną podstronę',
          columns: [
            { key: 'wspolne', label: 'Wspólne adresy w TOP 10' },
            { key: 'znaczenie', label: 'Co to znaczy' },
            { key: 'decyzja', label: 'Decyzja w szablonie' },
          ],
          rows: [
            { wspolne: '4 lub więcej z 10 (40% i więcej)', znaczenie: 'Google traktuje frazy jako jedną potrzebę', decyzja: 'Jeden klaster i jedna podstrona; fraza z większym popytem zostaje główną' },
            { wspolne: '2–3 z 10', znaczenie: 'Szara strefa', decyzja: 'Porównaj typ stron w TOP 5 i powtórz test innego dnia; podobny format oznacza jeden klaster' },
            { wspolne: '0–1 z 10', znaczenie: 'Różne potrzeby', decyzja: 'Osobne klastry i osobne podstrony połączone linkami' },
          ],
          przypis: 'Próg 4 wspólnych adresów z 10 (40%) to dolna granica reguły roboczej 40–50% z naszej praktyki, a nie wartość podawana przez Google.',
        },
        htmlPo: `<p>Przykład (wynik umowny): „biuro rachunkowe poznań” i „biuro księgowe poznań” mają 7 wspólnych adresów, więc trafiają na jedną stronę usługi. „Biuro rachunkowe poznań” i „ryczałt czy skala podatkowa” nie mają żadnego wspólnego adresu, więc poradnik powstaje osobno i linkuje do usługi.</p>
<p>Grupowanie „na oko”, po podobieństwie słów, prowadzi do dwóch błędów. Albo powstaje kilka podobnych stron, które walczą o te same zapytania, albo na jedną stronę trafiają frazy o różnych intencjach i żadna z nich nie wygrywa.</p>`,
      },
      {
        id: 'mapa-slow-kluczowych',
        h2: 'Mapa słów kluczowych: jeden klaster, jedna podstrona',
        html: `<p>Mapa słów kluczowych to tabela, w której każdy wiersz to jeden klaster: fraza główna, frazy dodatkowe, intencja, adres podstrony docelowej, działanie i priorytet. Działanie to jedna z czterech decyzji: nowa podstrona, rozbudowa istniejącej, połączenie kilku stron albo bez zmian.</p>`,
        tabela: {
          id: 'tabela-mapa-slow-kluczowych',
          caption: 'Przykład mapy słów kluczowych (wypełniony fragment szablonu, firma przykładowa)',
          columns: [
            { key: 'klaster', label: 'Klaster' },
            { key: 'glowna', label: 'Fraza główna' },
            { key: 'dodatkowe', label: 'Frazy dodatkowe' },
            { key: 'intencja', label: 'Intencja' },
            { key: 'url', label: 'Podstrona' },
            { key: 'dzialanie', label: 'Działanie' },
            { key: 'priorytet', label: 'Priorytet' },
          ],
          rows: [
            { klaster: 'Biuro rachunkowe Poznań', glowna: 'biuro rachunkowe poznań', dodatkowe: 'biuro księgowe poznań, księgowość poznań', intencja: 'Lokalna, zakup', url: '/biuro-rachunkowe-poznan', dzialanie: 'Rozbudowa: zakres, cennik, opinie, FAQ', priorytet: 'Wysoki' },
            { klaster: 'Księgowość dla JDG', glowna: 'księgowość dla jdg', dodatkowe: 'biuro rachunkowe dla jdg, księgowość jednoosobowej działalności', intencja: 'Transakcyjna', url: '/ksiegowosc-jdg', dzialanie: 'Nowa podstrona', priorytet: 'Wysoki' },
            { klaster: 'Koszt biura rachunkowego', glowna: 'ile kosztuje biuro rachunkowe', dodatkowe: 'biuro rachunkowe cena, koszt księgowości', intencja: 'Komercyjna', url: '/blog/ile-kosztuje-biuro-rachunkowe', dzialanie: 'Nowy poradnik z widełkami i linkiem do cennika', priorytet: 'Średni' },
            { klaster: 'Forma opodatkowania', glowna: 'ryczałt czy skala podatkowa', dodatkowe: 'ryczałt czy podatek liniowy, co się bardziej opłaca', intencja: 'Informacyjna', url: '/blog/ryczalt-czy-skala', dzialanie: 'Nowy poradnik z linkiem do /ksiegowosc-jdg', priorytet: 'Średni' },
            { klaster: 'Zmiana biura', glowna: 'jak zmienić biuro rachunkowe', dodatkowe: 'zmiana biura rachunkowego w trakcie roku', intencja: 'Informacyjna, blisko zakupu', url: '/blog/zmiana-biura-rachunkowego', dzialanie: 'Nowy poradnik', priorytet: 'Niski' },
          ],
        },
        htmlPo: `<h3>Jak użyć mapy na stronie</h3>
<p>Frazę główną klastra wstaw w title, nagłówek H1 i pierwszy akapit podstrony, w dokładnym brzmieniu, jeśli brzmi naturalnie. Frazy dodatkowe wykorzystaj w nagłówkach H2 i w treści tam, gdzie pasują do sensu. Nie powtarzaj ich na siłę: Google zalicza upychanie słów kluczowych do spamu i jako przykład podaje bloki tekstu z listą miast i regionów, na które strona chce się wyświetlać. Meta tag keywords możesz pominąć, bo wyszukiwarka Google go nie używa.</p>
<p>Każdy wiersz mapy przekazujesz dalej. Nowe treści i aktualizacje trafiają do <a href="/narzedzia/content-plan">content planu</a>, a klastry z najwyższym priorytetem do strategii. Strony usług są centrum klastrów: poradniki linkują do nich, a one do poradników.</p>
<h3>Pytania klientów a odpowiedzi AI</h3>
<p>Frazy w formie pytań zapisz w mapie osobno. Na stronie odpowiedz na każde z nich wprost, w pierwszym akapicie pod nagłówkiem z pytaniem. Taką odpowiedź łatwo przytoczyć, także w przeglądzie AI w Google czy w ChatGPT. Google podaje, że do przeglądów AI i trybu AI nie trzeba spełniać dodatkowych wymagań poza dobrymi praktykami SEO, więc wystarczy ta sama mapa. Jak mierzymy, czy asystenci AI wymieniają firmę, opisujemy na stronie <a href="/pozycjonowanie-w-ai">pozycjonowanie w AI</a>.</p>`,
      },
      {
        id: 'kanibalizacja-slow-kluczowych',
        h2: 'Kanibalizacja słów kluczowych: jak ją znaleźć i naprawić',
        html: `<p>Kanibalizacja słów kluczowych to sytuacja, w której dwie lub więcej podstron tej samej witryny odpowiada na tę samą frazę, a Google pokazuje w wynikach raz jedną, raz drugą. Sygnały rozkładają się wtedy na kilka adresów i często żadna ze stron nie zajmuje tak wysokiej pozycji, jak mogłaby jedna mocna strona. Nie każde takie nakładanie się to problem: jeśli dwie strony razem zajmują wysokie pozycje i odpowiadają na różne potrzeby, zostaw je. Kanibalizacja najczęściej powstaje, gdy blog przez lata dopisuje artykuły na podobne tematy albo gdy strona usługi i wpis na blogu celują w tę samą frazę.</p>
<h3>Jak sprawdzić kanibalizację w Search Console</h3>
<ol>
<li>Otwórz raport Skuteczność. Domyślnie pokazuje ostatnie 3 miesiące i taki zakres wystarczy.</li>
<li>Dodaj filtr zapytania z frazą z mapy, np. „biuro rachunkowe poznań”.</li>
<li>Przejdź na kartę Strony. Jeśli widzisz dwa lub więcej adresów z wyświetleniami na to samo zapytanie, wpisz je do szablonu razem z kliknięciami i wyświetleniami.</li>
<li>Powtarzaj kontrolę co miesiąc dla fraz z najwyższym priorytetem.</li>
</ol>
<p>Drugim sygnałem są powtórzone tytuły na kilku podstronach. Wskazuje je nasz <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a>, który sprawdza do 25 podstron.</p>`,
        tabela: {
          id: 'tabela-kanibalizacja',
          caption: 'Kanibalizacja słów kluczowych: sytuacja i decyzja',
          columns: [
            { key: 'sytuacja', label: 'Sytuacja' },
            { key: 'decyzja', label: 'Decyzja' },
          ],
          rows: [
            { sytuacja: 'Dwie strony o tej samej intencji, jedna wyraźnie słabsza', decyzja: 'Połącz treści na mocniejszej stronie i ustaw przekierowanie 301 ze słabszej' },
            { sytuacja: 'Strona usługi i poradnik zamieniają się na jedną frazę', decyzja: 'Doprecyzuj obie: poradnik odpowiada na pytanie i linkuje do usługi, usługa nie powtarza treści poradnika' },
            { sytuacja: 'Ta sama treść pod kilkoma adresami (parametry, wersje do druku)', decyzja: 'Wskaż wersję główną tagiem canonical albo przekierowaniem' },
            { sytuacja: 'Linki wewnętrzne z frazą prowadzą do innej strony niż w mapie', decyzja: 'Zmień linki i ich teksty tak, żeby fraza prowadziła do strony z mapy' },
            { sytuacja: 'Krótka rotacja tuż po publikacji nowej treści', decyzja: 'Odczekaj kilka tygodni i sprawdź ponownie, zanim cokolwiek połączysz' },
          ],
        },
        htmlPo: `<p>Google opisuje przekierowanie i tag canonical jako silne sygnały przy wyborze adresu kanonicznego, a obecność w mapie witryny jako sygnał słaby. Zduplikowana treść sama w sobie nie narusza zasad dotyczących spamu, ale może pogarszać wrażenia użytkowników, a roboty wyszukiwarek mogą tracić zasoby na adresy, na których Ci nie zależy. Analiza kanibalizacji i pokrycia klastrów tematycznych jest częścią naszego <a href="/audyt-seo">audytu SEO strony</a>.</p>`,
      },
      {
        id: 'jak-wypelnic',
        h2: 'Jak wypełnić szablon doboru słów kluczowych krok po kroku',
        html: `<p>Jeśli zastanawiasz się, jak dobrać słowa kluczowe bez gubienia się w arkuszach, idź przez szablon po kolei. Ma osiem części. Najwięcej czasu zajmuje sprawdzanie wyników Google, bo intencję oceniasz dla każdej frazy, a test wspólnych wyników robisz dla każdej pary, co do której masz wątpliwości.</p>
${olKroki(KROKI_PL)}
<p>Gotowa mapa to dokument roboczy, a nie raport. Wracasz do niej co miesiąc przy kontroli kanibalizacji i co kwartał przy przeglądzie strategii.</p>`,
      },
      {
        id: 'najczestsze-bledy',
        h2: 'Najczęstsze błędy przy doborze słów kluczowych',
        html: `<ul>
<li><strong>Wybór fraz tylko po wolumenie.</strong> Duża fraza ogólna rzadko daje klientów małej firmie. Długi ogon z intencją zakupu daje ich częściej.</li>
<li><strong>Lista fraz bez przypisanych podstron.</strong> Bez mapy kilka stron zaczyna walczyć o te same zapytania.</li>
<li><strong>Intencja „z głowy”.</strong> Fraza brzmi jak zakupowa, a Google pokazuje poradniki. Strona usługi ma wtedy małe szanse na TOP 10.</li>
<li><strong>Osobna strona na każdy wariant frazy.</strong> „Biuro rachunkowe poznań” i „biuro księgowe poznań” to zwykle jeden klaster. Seria prawie identycznych stron tworzonych pod podobne zapytania, np. osobna strona na każde miasto, z której użytkownik trafia do tej samej oferty, to według zasad Google dotyczących spamu nadużycie stron przejściowych (doorway).</li>
<li><strong>Upychanie fraz.</strong> Powtarzanie tej samej frazy i listy miast w tekście męczy czytelnika, a Google zalicza je do spamu.</li>
<li><strong>Pisanie pod liczbę słów.</strong> Google pisze wprost, że nie ma preferowanej liczby słów. Długość tekstu wynika z tego, ile trzeba napisać, żeby odpowiedzieć na pytanie.</li>
<li><strong>Zmiana adresów URL dla frazy.</strong> Według Google słowa kluczowe w domenie albo ścieżce adresu same w sobie prawie nie wpływają na pozycje, a zmiana adresu wymaga przekierowań.</li>
<li><strong>Mapa zrobiona raz.</strong> Bez comiesięcznej kontroli kanibalizacji i kwartalnego przeglądu mapa szybko przestaje odpowiadać stronie.</li>
</ul>
<p>Jeśli wolisz, żeby dobór fraz i mapę przygotował zespół, który robi to na co dzień, zobacz, jak wygląda nasze <a href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</a>. W abonamencie SEO Standard (1 900 zł netto miesięcznie) prowadzimy do 20 fraz, a w SEO Premium (2 500 zł netto) do 50. Szczegóły znajdziesz w <a href="/cennik-pozycjonowania">cenniku pozycjonowania</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Szablon doboru słów kluczowych: wzór do wypełnienia (podgląd)',
      opis: 'Poniżej pełna treść szablonu. Możesz przepisać ją do arkusza albo pobrać PDF z miejscem na wpisy.',
      html: `<h3>Część 1. Metryczka i cel</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Firma i adres strony</td><td>…</td></tr>
<tr><td>Usługi lub produkty, na których zależy najbardziej</td><td>…</td></tr>
<tr><td>Obszar działania i język</td><td>…</td></tr>
<tr><td>Czego nie sprzedajemy (frazy do odrzucenia)</td><td>…</td></tr>
<tr><td>Cel: co ma dać ruch z Google (np. zapytania, sprzedaż)</td><td>…</td></tr>
<tr><td>Data, osoba wypełniająca</td><td>…</td></tr>
</tbody></table>
<h3>Część 2. Frazy startowe z czterech źródeł</h3>
<table><thead><tr><th>Źródło</th><th>Gdzie szukać</th><th>Frazy</th></tr></thead><tbody>
<tr><td>Search Console</td><td>Skuteczność → Zapytania: wyświetlenia bez kliknięć, pozycje 4–20</td><td>…</td></tr>
<tr><td>Pytania klientów</td><td>Sprzedaż, obsługa, formularz, e-maile</td><td>…</td></tr>
<tr><td>Podpowiedzi Google</td><td>Autosugestie, „Podobne pytania”, usługa + cena / jak / czy / miasto</td><td>…</td></tr>
<tr><td>Konkurencja i narzędzia</td><td>3–5 konkurentów, Planer słów kluczowych, narzędzie płatne</td><td>…</td></tr>
</tbody></table>
<h3>Część 3. Lista fraz z oceną</h3>
<table><thead><tr><th>Fraza</th><th>Wyszukiwania / mies. i źródło</th><th>Intencja</th><th>Co jest w TOP 10</th><th>Pozycja i adres (GSC)</th><th>Klaster</th></tr></thead><tbody>
<tr><td>…</td>${W5}</tr>
<tr><td>…</td>${W5}</tr>
<tr><td>…</td>${W5}</tr>
</tbody></table>
<p>Intencja: I – informacyjna, K – komercyjna, T – transakcyjna, L – lokalna, N – nawigacyjna. Brak liczby: wpisz „brak danych”.</p>
<h3>Część 4. Test wspólnych wyników</h3>
<table><thead><tr><th>Fraza A</th><th>Fraza B</th><th>Wspólne adresy w TOP 10</th><th>Data testu</th><th>Decyzja</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>… / 10</td><td>…</td><td>☐ jeden klaster ☐ osobne ☐ sprawdzić ponownie</td></tr>
<tr><td>…</td><td>…</td><td>… / 10</td><td>…</td><td>☐ jeden klaster ☐ osobne ☐ sprawdzić ponownie</td></tr>
</tbody></table>
<p>Reguła: 4 lub więcej z 10 → jeden klaster; 2–3 → porównaj typ stron w TOP 5 i powtórz test innego dnia; 0–1 → osobne klastry.</p>
<h3>Część 5. Mapa słów kluczowych</h3>
<table><thead><tr><th>Klaster</th><th>Fraza główna</th><th>Frazy dodatkowe</th><th>Intencja</th><th>Podstrona docelowa</th><th>Działanie (nowa / rozbudowa / połączenie / bez zmian)</th><th>Priorytet</th></tr></thead><tbody>
<tr><td>1. …</td>${W5}<td>…</td></tr>
<tr><td>2. …</td>${W5}<td>…</td></tr>
<tr><td>3. …</td>${W5}<td>…</td></tr>
</tbody></table>
<h3>Część 6. Priorytety ICE</h3>
<table><thead><tr><th>Klaster</th><th>Wpływ na zapytania (1–10)</th><th>Pewność (1–10)</th><th>Łatwość (1–10)</th><th>ICE (iloczyn)</th><th>Kolejność</th></tr></thead><tbody>
<tr><td>1. …</td>${W5}</tr>
<tr><td>2. …</td>${W5}</tr>
<tr><td>3. …</td>${W5}</tr>
</tbody></table>
<h3>Część 7. Kontrola kanibalizacji (co miesiąc)</h3>
<table><thead><tr><th>Zapytanie</th><th>Adresy z wyświetleniami (GSC → karta Strony)</th><th>Kliknięcia / wyświetlenia</th><th>Decyzja</th><th>Kto i do kiedy</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>☐ połączyć (301) ☐ rozdzielić intencje ☐ zmienić linki ☐ canonical</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>☐ połączyć (301) ☐ rozdzielić intencje ☐ zmienić linki ☐ canonical</td><td>…</td></tr>
</tbody></table>
<h3>Część 8. Lista kontrolna przed zamknięciem mapy</h3>
<ul>
<li>☐ Każda fraza ma źródło liczby wyszukiwań albo dopisek „brak danych”</li>
<li>☐ Intencja każdego klastra jest sprawdzona w wynikach Google</li>
<li>☐ Każdy klaster ma dokładnie jedną podstronę docelową</li>
<li>☐ Żadna podstrona nie jest przypisana do dwóch klastrów o tej samej intencji</li>
<li>☐ Frazy w formie pytań mają zaplanowaną odpowiedź wprost na stronie</li>
<li>☐ Klastry z priorytetem wysokim są w strategii SEO i content planie</li>
<li>☐ Termin pierwszej kontroli kanibalizacji: …</li>
</ul>`,
    },
    formularz: {
      h2: 'Pobierz szablon doboru słów kluczowych (PDF)',
      opis: 'Wyślemy PDF z ośmioma częściami: od fraz startowych z czterech źródeł po mapę słów kluczowych i kontrolę kanibalizacji. Wydrukuj go albo wypełnij w dowolnym edytorze PDF.',
      etykieta: 'Twój adres e-mail',
      przycisk: 'Wyślij szablon PDF',
      przedmiot: 'szablon doboru słów kluczowych',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do szablonu doboru słów kluczowych w PDF przyjdzie w ciągu minuty.',
    },
    faq: [
      {
        question: 'Ile słów kluczowych przypisać do jednej podstrony?',
        answer: 'Jedną frazę główną i tyle fraz dodatkowych, ile mieści się w tym samym klastrze. Liczba nie jest celem. Liczy się to, czy frazy mają tę samą intencję. Jeśli dla dwóch fraz Google pokazuje co najmniej 4 wspólne adresy w TOP 10, obsłuży je jedna podstrona. Frazy o innej intencji potrzebują osobnej strony, nawet jeśli brzmią podobnie.',
      },
      {
        question: 'Czym różni się słowo kluczowe od frazy kluczowej?',
        answer: 'W praktyce niczym: oba określenia oznaczają zapytanie wpisywane w wyszukiwarkę. „Słowo kluczowe” to dosłowne tłumaczenie angielskiego „keyword” i zwykle też oznacza kilka wyrazów, np. „biuro rachunkowe poznań”. Ważniejsze od nazwy jest rozróżnienie w mapie: każdy klaster ma jedną frazę główną, której używasz w title i H1, oraz frazy dodatkowe.',
      },
      {
        question: 'Skąd za darmo wziąć liczbę wyszukiwań frazy?',
        answer: 'Z Planera słów kluczowych w Google Ads. Pokazuje szacunkową liczbę wyszukiwań miesięcznie, ale wymaga konta z uzupełnionymi danymi rozliczeniowymi. Dla własnej strony masz wyświetlenia w Search Console, a sezonowość pokaże Google Trends, który podaje wartości względne od 0 do 100. Fraz o bardzo małej liczbie wyszukiwań Planer nie pokazuje, więc „brak danych” nie oznacza braku klientów.',
      },
      {
        question: 'Jak często aktualizować mapę słów kluczowych?',
        answer: 'Kanibalizację sprawdzaj co miesiąc w Search Console dla fraz z najwyższym priorytetem. Całą mapę przeglądaj co kwartał, razem ze strategią SEO: dopisz nowe zapytania z Search Console, przesuń priorytety i oznacz klastry, które mają już pozycje. Mapę zmieniasz też od razu, gdy firma dodaje usługę albo planuje nową stronę lub migrację.',
      },
      {
        question: 'Czy słowa kluczowe trzeba wpisywać w meta keywords?',
        answer: 'Nie. Wyszukiwarka Google nie używa meta tagu keywords, więc jego uzupełnianie nic nie daje. Frazę główną wstaw w title, nagłówek H1 i pierwszy akapit, a frazy dodatkowe tam, gdzie pasują w nagłówkach i treści. Nie powtarzaj ich na siłę, bo upychanie słów kluczowych Google zalicza do spamu, a czytelnika po prostu męczy.',
      },
      {
        question: 'Jak dobrać słowa kluczowe dla małej firmy lokalnej?',
        answer: 'Zacznij od usług połączonych z miastem lub dzielnicą, pytań, które klienci zadają przez telefon, i zapytań z Search Console. Takie frazy mają mało wyszukiwań, ale wyraźną intencję zakupu. Sprawdź, czy Google pokazuje dla nich Mapy: jeśli tak, oprócz strony usługi potrzebujesz dobrze prowadzonej wizytówki Google. Frazy ogólne bez miasta zostaw na później.',
      },
    ],
    zrodla: ZRODLA_PL,
    powiazane: [
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'Szablon strategii SEO', opis: 'klastry z mapy jako część 4 strategii na 12 miesięcy' },
      { href: '/narzedzia/content-plan', tekst: 'Content plan', opis: 'harmonogram publikacji dla klastrów z mapy' },
      { href: '/narzedzia/szablon-analizy-konkurencji-seo', tekst: 'Szablon analizy konkurencji SEO', opis: 'frazy i strony konkurentów jako czwarte źródło listy startowej' },
      { href: '/blog/content-gap-analysis', tekst: 'Analiza luk contentowych', opis: 'tematy, które mają konkurenci, a których brakuje na Twojej stronie' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'Pozycjonowanie stron internetowych', opis: 'dobór fraz, mapa i wdrożenie prowadzone przez nasz zespół' },
    ],
    kroki: KROKI_PL,
    plikNazwa: 'Szablon doboru słów kluczowych i mapa fraz (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'Keyword research template',
    tag: 'Free PDF template',
    h1: 'Keyword research template: from a seed list to a keyword map',
    lead: 'A keyword research template is a fill-in worksheet that takes you from a raw list of seed keywords to a keyword map: one cluster, one search intent and one target page per row. Ours walks you through four seed sources, clustering by shared Google results, ICE prioritization and a cannibalization check, in a free PDF.',
    karta: {
      nazwa: 'Keyword research template (PDF)',
      opis: 'From a keyword list to a page map: four seed sources, search intent, SERP-based clusters, ICE priorities and a cannibalization check.',
      cta: 'Get the template',
    },
    sekcje: [
      {
        id: 'what-are-keywords',
        h2: 'What keywords are, and the main types (with examples)',
        html: `<p>Keywords are the queries people type into Google when they look for what you sell or for an answer to their problem. They are rarely single words. Most are phrases of several words, such as “accountant leeds” or “how much does an accountant cost for a small business”.</p>
<p>Keyword research does not end with a list. A list of a hundred queries tells the people who write content and fix the site very little. What you need is a map: which keywords each page covers, what the intent is and what has to be done. That map is what feeds your <a href="/en/tools/seo-strategy-template">SEO strategy</a> and your <a href="/en/tools/content-calendar-template">content calendar</a>.</p>
<p>Google’s SEO Starter Guide suggests thinking about the words a user might search for, and remembering that people who know a topic well use different words from newcomers. An accountant might search for “accrual accounting for small business”, while a new business owner types “how to do my own bookkeeping”. A good keyword map covers both ways of describing the same need.</p>`,
        tabela: {
          id: 'table-keyword-types',
          caption: 'Types of keywords: examples for an accounting firm in Leeds (fictional business)',
          columns: [
            { key: 'type', label: 'Keyword type' },
            { key: 'example', label: 'Example' },
            { key: 'intent', label: 'What the searcher wants' },
            { key: 'where', label: 'Where to target it' },
          ],
          rows: [
            { type: 'Broad (short)', example: 'accountant', intent: 'Several things at once: local firms, directories, definitions', where: 'Usually too broad to start with; the home page or main service page covers it' },
            { type: 'Local', example: 'accountant leeds', intent: 'A firm in their city', where: 'A service page with local content, plus a Google Business Profile' },
            { type: 'Long-tail', example: 'accountant for self-employed tradesmen leeds', intent: 'A specific service for them', where: 'A dedicated service page or a clear section of one' },
            { type: 'Price question', example: 'how much does an accountant cost for a small business', intent: 'To compare prices before deciding', where: 'A guide with price ranges and a link to your pricing' },
            { type: 'Comparison', example: 'accountant vs accounting software', intent: 'To choose between options', where: 'A comparison article with a table' },
            { type: 'How-to', example: 'cash vs accrual accounting', intent: 'Knowledge, not a service yet', where: 'A blog guide that links to the service' },
            { type: 'Branded', example: '[firm name] reviews', intent: 'A specific business (navigational)', where: 'About page, reviews, Business Profile; usually no new content' },
          ],
          przypis: 'The business and keywords are illustrative. Always check each keyword’s intent in Google’s results, not by how it sounds.',
        },
        htmlPo: `<p>A long-tail keyword has fewer searches, but usually a clearer intent and weaker competition. For a small service business, these are often the keywords that bring in the first enquiries, long before the site can compete on broad terms.</p>`,
      },
      {
        id: 'seed-keyword-sources',
        h2: 'Where to find keywords: four seed sources',
        html: `<p>Before you score anything, build a seed list. Use all four sources at once, because each one sees a different slice of demand.</p>
<ol>
<li><strong>Google Search Console.</strong> In the Performance report, open the Queries tab and sort by impressions. Look for queries with impressions but no clicks, and keywords where you rank in positions 4–20: Google already associates your site with them, and you are not far off. The table shows at most 1,000 rows and rare queries are anonymized, so on a larger site export the data or narrow it down with a regular-expression filter.</li>
<li><strong>Customer questions.</strong> Write down what customers ask your sales and support teams, and what they write in your contact form. It is the clearest signal of intent, in the words customers actually use.</li>
<li><strong>Google autocomplete.</strong> Type your service into Google and record the suggestions and the People also ask questions. Add words like “cost”, “how”, “vs”, “for” or a city name, and see how Google extends the query. That is how you find long-tail keywords no ready-made list contains.</li>
<li><strong>Competitors and a keyword tool.</strong> Check which keywords 3–5 competitors are visible for, and expand the list in a tool. Google Ads Keyword Planner is free; paid tools such as Semrush or Ahrefs add data on competitors’ keywords and difficulty.</li>
</ol>`,
        tabela: {
          id: 'table-seed-sources',
          caption: 'Keyword sources: what they give you and what to watch out for',
          columns: [
            { key: 'source', label: 'Source' },
            { key: 'gives', label: 'What it gives you' },
            { key: 'limits', label: 'Limitations' },
          ],
          rows: [
            { source: 'Google Search Console', gives: 'Real queries, impressions, clicks and positions for your own site', limits: 'Only queries you already show up for; up to 1,000 rows in the table; rare queries hidden' },
            { source: 'Customer questions', gives: 'Customer language and purchase intent', limits: 'No numbers; you have to collect them continuously' },
            { source: 'Autocomplete and People also ask', gives: 'Long-tail keywords and questions people really type', limits: 'No search volume; results depend on location' },
            { source: 'Keyword Planner (Google Ads)', gives: 'Estimated monthly searches and new keyword ideas', limits: 'Estimates, not exact counts; requires an account with billing set up; very low-volume keywords are not shown' },
            { source: 'Google Trends', gives: 'Seasonality and how interest in topics compares', limits: 'Relative values on a 0–100 scale, not search counts' },
            { source: 'Paid SEO tools', gives: 'Competitor keywords, difficulty, content gaps', limits: 'The tool’s own estimates, which differ from Google’s data; cost' },
          ],
        },
        htmlPo: `<p>“No data” in a tool does not mean “nobody searches for it”. Keyword Planner hides very low-volume keywords, and in B2B niches and local services those are often the ones that bring leads. If a keyword keeps coming up in customer questions and in autocomplete, keep it on the list and mark it “no data”. To compare yourself with competitors step by step, use our <a href="/en/tools/competitor-analysis-template">competitor analysis template</a>; to find topics your site is missing, read our <a href="/en/blog/content-gap-analysis">content gap analysis</a> guide.</p>`,
      },
      {
        id: 'keyword-analysis',
        h2: 'Keyword analysis: volume, intent, difficulty and value',
        html: `<p>Keyword analysis answers one question: which keywords should you go after first? Search volume alone is not enough. A high-volume keyword may have an intent your site cannot serve, while one with a few dozen searches a month may bring in a customer every week. In the template, you score every keyword against six criteria.</p>`,
        tabela: {
          id: 'table-scoring-criteria',
          caption: 'How to score each keyword in the keyword research template',
          columns: [
            { key: 'criterion', label: 'Criterion' },
            { key: 'question', label: 'Question' },
            { key: 'data', label: 'Where the data comes from' },
            { key: 'score', label: 'How to score it' },
          ],
          rows: [
            { criterion: 'Volume', question: 'How many people search each month, and is demand seasonal?', data: 'Keyword Planner, Search Console impressions, Google Trends', score: 'A number with its source, or “no data”; look at 12 months, not one' },
            { criterion: 'Intent', question: 'What does the searcher want?', data: 'Page types in the top 10, AI Overview, map pack, shops, videos', score: 'Informational, commercial, transactional, local or navigational' },
            { criterion: 'Closeness to purchase', question: 'Could this search turn into a customer?', data: 'Customer questions, your offer, sales data', score: '1–10: how many leads it could bring (Impact in ICE)' },
            { criterion: 'Difficulty', question: 'Can you realistically reach the top 10?', data: 'Who ranks in the top 10, your current positions, how much you have published on the topic', score: 'Relative to your own site, not only a tool’s difficulty score' },
            { criterion: 'Current position', question: 'Does your site already show up for it?', data: 'Search Console', score: 'Positions 4–20 are the quickest wins' },
            { criterion: 'Fit with your offer', question: 'Do you have a service or expertise that answers it?', data: 'Your offer, in-house experts', score: 'Drop off-topic keywords, even high-volume ones' },
          ],
        },
        htmlPo: `<h3>Setting the order: the ICE method</h3>
<p>In the template, each cluster gets three scores from 1 to 10: Impact (how many leads it could bring, not how much traffic), Confidence (how many data sources back your estimate) and Ease (how much work it takes, and whether you need a developer). Multiply them, and the result sets the order. Lower Confidence when you rely on a single source. To put a money value on a keyword, try our <a href="/en/tools/seo-loss-calculator">SEO loss calculator</a>: from search volume, conversion rate and customer value, it estimates how much profit goes to competitors while you are not in the top 3.</p>
<p>Judge difficulty against your own site. A site that already has several strong pages on a topic can rank for keywords a tool labels as hard. A new site with no links should start with long-tail and local keywords and leave the broad terms for later.</p>`,
      },
      {
        id: 'search-intent-and-clusters',
        h2: 'Search intent and clusters: group keywords by SERP overlap',
        html: `<p>Read intent from the results, not from the wording. Search for the keyword and look at the top 10: service pages, guides, comparisons, shops, the map pack, videos or an AI Overview. If “accountant leeds” shows the map pack and firms’ websites, while “how much does an accountant cost” shows guides with price ranges, those are two different intents and two different pages.</p>
<p>Put keywords in the same cluster when Google shows similar results for them. The test is simple: compare the top 10 for two keywords and count the shared URLs. Check in a private window, or in a tool with a fixed location. Results change from day to day, so in borderline cases repeat the test on another day.</p>`,
        tabela: {
          id: 'table-serp-overlap',
          caption: 'The SERP overlap test: when keywords belong on one page',
          columns: [
            { key: 'shared', label: 'Shared URLs in the top 10' },
            { key: 'meaning', label: 'What it means' },
            { key: 'decision', label: 'Decision in the template' },
          ],
          rows: [
            { shared: '4 or more out of 10 (40% or more)', meaning: 'Google treats the keywords as one need', decision: 'One cluster and one page; the keyword with more demand becomes the primary keyword' },
            { shared: '2–3 out of 10', meaning: 'Grey zone', decision: 'Compare the page types in the top 5 and repeat the test on another day; a similar format means one cluster' },
            { shared: '0–1 out of 10', meaning: 'Different needs', decision: 'Separate clusters and separate pages, linked to each other' },
          ],
          przypis: 'The 40–50% overlap threshold is a working rule from our own practice, not a figure published by Google.',
        },
        htmlPo: `<p>An example (illustrative result): “accountant leeds” and “accounting firm leeds” share 7 URLs, so they go on one service page. “Accountant leeds” and “cash vs accrual accounting” share none, so the guide gets its own page and links to the service.</p>
<p>Grouping keywords by eye, based on similar wording, leads to one of two mistakes. Either you end up with several near-identical pages competing for the same queries, or you cram keywords with different intents onto one page and none of them wins.</p>`,
      },
      {
        id: 'keyword-mapping',
        h2: 'Keyword mapping: one cluster, one page',
        html: `<p>Keyword mapping turns clusters into a table where each row is one cluster: the primary keyword, secondary keywords, intent, the target URL, an action and a priority. The action is one of four decisions: create a new page, expand an existing one, merge several pages, or leave it as it is. The map section of the PDF works as a keyword mapping template you can copy into a spreadsheet.</p>`,
        tabela: {
          id: 'table-keyword-map',
          caption: 'Keyword map example (a filled-in part of the template, fictional business)',
          columns: [
            { key: 'cluster', label: 'Cluster' },
            { key: 'primary', label: 'Primary keyword' },
            { key: 'secondary', label: 'Secondary keywords' },
            { key: 'intent', label: 'Intent' },
            { key: 'url', label: 'Target page' },
            { key: 'action', label: 'Action' },
            { key: 'priority', label: 'Priority' },
          ],
          rows: [
            { cluster: 'Accountant Leeds', primary: 'accountant leeds', secondary: 'accounting firm leeds, accountants in leeds', intent: 'Local, purchase', url: '/accountant-leeds', action: 'Expand: scope, pricing, reviews, FAQ', priority: 'High' },
            { cluster: 'Self-employed accounting', primary: 'accountant for self-employed', secondary: 'self-employed accountant, accounting for freelancers', intent: 'Transactional', url: '/self-employed-accountant', action: 'New page', priority: 'High' },
            { cluster: 'Accountant cost', primary: 'how much does an accountant cost', secondary: 'accountant fees, accountant cost for small business', intent: 'Commercial', url: '/blog/how-much-does-an-accountant-cost', action: 'New guide with price ranges and a link to pricing', priority: 'Medium' },
            { cluster: 'Accounting methods', primary: 'cash vs accrual accounting', secondary: 'cash basis or accrual basis, which accounting method', intent: 'Informational', url: '/blog/cash-vs-accrual-accounting', action: 'New guide linking to /self-employed-accountant', priority: 'Medium' },
            { cluster: 'Switching accountants', primary: 'how to change accountants', secondary: 'switching accountants mid-year', intent: 'Informational, close to purchase', url: '/blog/how-to-change-accountants', action: 'New guide', priority: 'Low' },
          ],
        },
        htmlPo: `<h3>How to use the map on the page</h3>
<p>Put the cluster’s primary keyword in the title, the H1 and the first paragraph, in its exact wording if it reads naturally. Use secondary keywords in H2 headings and in the body where they fit the meaning. Do not force them in: Google treats keyword stuffing as spam, and gives blocks of text listing the cities and regions a page is trying to rank for as an example. You can skip the meta keywords tag, because Google Search does not use it.</p>
<p>Every row of the map feeds the next document. New content and updates go into your <a href="/en/tools/content-calendar-template">content calendar</a>, and the top-priority clusters go into your strategy. Service pages sit at the centre of their clusters: guides link to them, and they link back to the guides.</p>
<h3>Customer questions and AI answers</h3>
<p>Keep question-style keywords in a separate list. On the page, answer each one directly in the first paragraph under a heading that asks the question. An answer like that is easy to quote, including in Google’s AI Overviews and in ChatGPT. Google says there are no additional requirements to appear in AI Overviews or AI Mode beyond SEO best practices, so the same map does the job. How we track whether AI assistants mention a business is described on our <a href="/en/ai-search-optimization">AI search optimization</a> page.</p>`,
      },
      {
        id: 'keyword-cannibalization',
        h2: 'Keyword cannibalization: how to find and fix it',
        html: `<p>Keyword cannibalization happens when two or more pages on the same site target the same query and keep swapping places in the results. Neither page collects all the signals, so both rank lower than one strong page would. It usually builds up when a blog publishes similar articles over the years, or when a service page and a blog post chase the same keyword.</p>
<h3>How to check for cannibalization in Search Console</h3>
<ol>
<li>Open the Performance report. Its default view covers the last three months, which is enough.</li>
<li>Add a query filter with a keyword from your map, for example “accountant leeds”.</li>
<li>Switch to the Pages tab. If two or more URLs get impressions for the same query, enter them in the template with their clicks and impressions.</li>
<li>Repeat the check every month for your highest-priority keywords.</li>
</ol>
<p>Another signal is the same title tag on several pages. Our <a href="/en/tools/free-seo-audit">free SEO audit</a> flags duplicate titles across up to 25 pages.</p>`,
        tabela: {
          id: 'table-cannibalization',
          caption: 'Keyword cannibalization: situation and decision',
          columns: [
            { key: 'situation', label: 'Situation' },
            { key: 'decision', label: 'Decision' },
          ],
          rows: [
            { situation: 'Two pages with the same intent, one clearly weaker', decision: 'Merge the content into the stronger page and 301-redirect the weaker one' },
            { situation: 'A service page and a guide swap places for one keyword', decision: 'Sharpen both: the guide answers the question and links to the service; the service page does not repeat the guide' },
            { situation: 'The same content under several URLs (parameters, print versions)', decision: 'Point to the main version with a canonical tag or a redirect' },
            { situation: 'Internal links with the keyword point to a different page than the map says', decision: 'Change the links and their anchor text so the keyword points to the mapped page' },
            { situation: 'Brief swapping right after you publish new content', decision: 'Wait a few weeks and check again before merging anything' },
          ],
        },
        htmlPo: `<p>Google describes redirects and the canonical tag as strong signals when it picks a canonical URL, and sitemap inclusion as a weak one. Duplicate content on its own does not violate Google’s spam policies, but it confuses users and wastes crawling resources. Checking for cannibalization and topic cluster coverage is part of our <a href="/en/seo-audit">SEO audit</a>.</p>`,
      },
      {
        id: 'keyword-research-process',
        h2: 'The keyword research process: how to fill in the template',
        html: `<p>If you are wondering how to do keyword research without getting lost in spreadsheets, work through this keyword research template one part at a time. There are eight parts. Checking Google’s results takes the most time, because you judge intent for every keyword and run the overlap test for every pair you are unsure about.</p>
${olKroki(KROKI_EN)}
<p>The finished map is a working document, not a report. You come back to it every month for the cannibalization check, and every quarter when you review your strategy.</p>`,
      },
      {
        id: 'common-mistakes',
        h2: 'Common keyword research mistakes',
        html: `<ul>
<li><strong>Choosing keywords by volume alone.</strong> A big broad keyword rarely brings a small business customers. Long-tail keywords with purchase intent do so far more often.</li>
<li><strong>A keyword list with no target pages.</strong> Without a map, several pages end up competing for the same queries.</li>
<li><strong>Guessing the intent.</strong> The keyword sounds commercial, but Google shows guides. A service page then has little chance of reaching the top 10.</li>
<li><strong>A separate page for every keyword variant.</strong> “Accountant leeds” and “accounting firm leeds” are usually one cluster. A set of near-identical pages created to rank for similar queries, such as pages that differ only by city name, is what Google’s spam policies call doorway abuse.</li>
<li><strong>Keyword stuffing.</strong> Repeating the same phrase and lists of cities wears readers out, and Google classes it as spam.</li>
<li><strong>Writing to a word count.</strong> Google says plainly that it has no preferred word count. Length should follow from what it takes to answer the question.</li>
<li><strong>Changing URLs to add a keyword.</strong> According to Google, keywords in the domain name or URL path alone have hardly any effect on rankings, and a URL change needs redirects.</li>
<li><strong>A one-off map.</strong> Without a monthly cannibalization check and a quarterly review, the map soon stops matching the site.</li>
</ul>
<p>If you would rather have a team that does this every day handle your keyword research and mapping, see our <a href="/en/seo-services">SEO services</a>. Our SEO Standard plan (€450 net per month) covers up to 20 keywords, and SEO Premium (€590 net) up to 50. Full details are on our <a href="/en/seo-pricing">SEO pricing</a> page.</p>`,
      },
    ],
    podglad: {
      h2: 'Keyword research template: what is inside (preview)',
      opis: 'Below is the full content of the template. Copy it into a spreadsheet, or download the PDF with space to write.',
      html: `<h3>Part 1. Overview and goal</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>Business and website</td><td>…</td></tr>
<tr><td>Services or products that matter most</td><td>…</td></tr>
<tr><td>Service area and language</td><td>…</td></tr>
<tr><td>What we do not sell (keywords to drop)</td><td>…</td></tr>
<tr><td>Goal: what search traffic should deliver (e.g. leads, sales)</td><td>…</td></tr>
<tr><td>Date, completed by</td><td>…</td></tr>
</tbody></table>
<h3>Part 2. Seed keywords from four sources</h3>
<table><thead><tr><th>Source</th><th>Where to look</th><th>Keywords</th></tr></thead><tbody>
<tr><td>Search Console</td><td>Performance → Queries: impressions without clicks, positions 4–20</td><td>…</td></tr>
<tr><td>Customer questions</td><td>Sales, support, contact form, emails</td><td>…</td></tr>
<tr><td>Google autocomplete</td><td>Suggestions, People also ask, service + cost / how / vs / city</td><td>…</td></tr>
<tr><td>Competitors and tools</td><td>3–5 competitors, Keyword Planner, a paid tool</td><td>…</td></tr>
</tbody></table>
<h3>Part 3. Keyword list with scores</h3>
<table><thead><tr><th>Keyword</th><th>Monthly searches and source</th><th>Intent</th><th>What ranks in the top 10</th><th>Position and URL (GSC)</th><th>Cluster</th></tr></thead><tbody>
<tr><td>…</td>${W5}</tr>
<tr><td>…</td>${W5}</tr>
<tr><td>…</td>${W5}</tr>
</tbody></table>
<p>Intent: I – informational, C – commercial, T – transactional, L – local, N – navigational. No number available: write “no data”.</p>
<h3>Part 4. SERP overlap test</h3>
<table><thead><tr><th>Keyword A</th><th>Keyword B</th><th>Shared URLs in the top 10</th><th>Test date</th><th>Decision</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>… / 10</td><td>…</td><td>☐ one cluster ☐ separate ☐ re-check</td></tr>
<tr><td>…</td><td>…</td><td>… / 10</td><td>…</td><td>☐ one cluster ☐ separate ☐ re-check</td></tr>
</tbody></table>
<p>Rule: 4 or more out of 10 → one cluster; 2–3 → compare page types in the top 5 and repeat on another day; 0–1 → separate clusters.</p>
<h3>Part 5. Keyword map</h3>
<table><thead><tr><th>Cluster</th><th>Primary keyword</th><th>Secondary keywords</th><th>Intent</th><th>Target page</th><th>Action (new / expand / merge / keep)</th><th>Priority</th></tr></thead><tbody>
<tr><td>1. …</td>${W5}<td>…</td></tr>
<tr><td>2. …</td>${W5}<td>…</td></tr>
<tr><td>3. …</td>${W5}<td>…</td></tr>
</tbody></table>
<h3>Part 6. ICE priorities</h3>
<table><thead><tr><th>Cluster</th><th>Impact on leads (1–10)</th><th>Confidence (1–10)</th><th>Ease (1–10)</th><th>ICE (product)</th><th>Order</th></tr></thead><tbody>
<tr><td>1. …</td>${W5}</tr>
<tr><td>2. …</td>${W5}</tr>
<tr><td>3. …</td>${W5}</tr>
</tbody></table>
<h3>Part 7. Cannibalization check (monthly)</h3>
<table><thead><tr><th>Query</th><th>URLs with impressions (GSC → Pages tab)</th><th>Clicks / impressions</th><th>Decision</th><th>Owner and deadline</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>☐ merge (301) ☐ separate intents ☐ change links ☐ canonical</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>☐ merge (301) ☐ separate intents ☐ change links ☐ canonical</td><td>…</td></tr>
</tbody></table>
<h3>Part 8. Keyword research checklist before you close the map</h3>
<ul>
<li>☐ Every keyword has a source for its search volume, or is marked “no data”</li>
<li>☐ The intent of every cluster has been checked in Google’s results</li>
<li>☐ Every cluster has exactly one target page</li>
<li>☐ No page is assigned to two clusters with the same intent</li>
<li>☐ Question keywords have a planned direct answer on the page</li>
<li>☐ High-priority clusters are in the SEO strategy and the content calendar</li>
<li>☐ Date of the first cannibalization check: …</li>
</ul>`,
    },
    formularz: {
      h2: 'Get the keyword research template (PDF)',
      opis: 'We will email you a PDF with eight parts, from seed keywords in four sources to a keyword map and a cannibalization check. Print it, or fill it in with any PDF editor.',
      etykieta: 'Your email address',
      przycisk: 'Email me the PDF template',
      przedmiot: 'the keyword research template',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the keyword research template PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'How many keywords should one page target?',
        answer: 'One primary keyword, plus as many secondary keywords as fit in the same cluster. The number is not the goal; what matters is whether the keywords share an intent. If Google shows at least 4 of the same URLs in the top 10 for two keywords, one page can cover both. Keywords with a different intent need their own page, even if they sound alike.',
      },
      {
        question: 'What is the difference between keyword research and keyword mapping?',
        answer: 'Keyword research is collecting and scoring keywords: where they come from, how many people search for them, what intent they have and how hard they are. Keyword mapping is the next step: grouping those keywords into clusters and assigning each cluster to one page on your site, with an action and a priority. This template covers both, ending with the map.',
      },
      {
        question: 'Where can I get search volume for free?',
        answer: 'From Keyword Planner in Google Ads. It shows estimated monthly searches, but you need an account with billing information set up. For your own site, Search Console shows impressions, and Google Trends shows seasonality on a relative 0–100 scale rather than as search counts. Keyword Planner hides very low-volume keywords, so “no data” does not mean no customers.',
      },
      {
        question: 'How often should I update the keyword map?',
        answer: 'Check for cannibalization in Search Console every month for your highest-priority keywords. Review the whole map every quarter, together with your SEO strategy: add new queries from Search Console, move priorities and mark the clusters that already rank. Update the map straight away when the business adds a service or plans a new site or a migration.',
      },
      {
        question: 'Do I need to add keywords to the meta keywords tag?',
        answer: 'No. Google Search does not use the meta keywords tag, so filling it in achieves nothing. Put the primary keyword in the title, the H1 and the first paragraph, and use secondary keywords in headings and body copy where they fit. Do not force them in: Google treats keyword stuffing as spam, and readers simply find it tiring.',
      },
      {
        question: 'Can I use this keyword research template in Google Sheets?',
        answer: 'Yes. The PDF is laid out as tables, so each part becomes a sheet tab: seed keywords, the keyword list, the overlap test, the keyword map, ICE priorities and the cannibalization log. Keep the column order from the PDF, add a column for the date of each check, and use one source of truth per metric, for example Keyword Planner for volume and Search Console for positions.',
      },
    ],
    zrodla: ZRODLA_EN,
    powiazane: [
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'SEO strategy template', opis: 'your keyword clusters become part 4 of a 12-month strategy' },
      { href: '/narzedzia/content-plan', tekst: 'Content calendar template', opis: 'a publishing schedule for the clusters in your map' },
      { href: '/narzedzia/szablon-analizy-konkurencji-seo', tekst: 'SEO competitor analysis template', opis: 'competitors’ keywords and pages as your fourth seed source' },
      { href: '/blog/content-gap-analysis', tekst: 'Content gap analysis', opis: 'topics your competitors cover that your site is missing' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'SEO services', opis: 'keyword research, mapping and implementation done by our team' },
    ],
    kroki: KROKI_EN,
    plikNazwa: 'Keyword research template and keyword map (PDF)',
  },
};
