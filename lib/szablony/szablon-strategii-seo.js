// Szablon strategii SEO na 12 miesięcy (11.11.2026): /narzedzia/szablon-strategii-seo
// i /en/tools/seo-strategy-template. Kontrakt danych: lib/szablony/README.md.
// PDF: public/pliki/szablon-strategii-seo.pdf (PL) i seo-strategy-template.pdf (EN),
// źródła HTML w scripts/szablony/pdf/. Liczby w przykładach są oznaczone jako przykładowe;
// zdania o zasadach Google pochodzą ze stron w zrodla (odczyt 11.11.2026).

const ZRODLA_GOOGLE = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO?', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Search Console Help: generative AI performance report (impressions in AI Overviews and AI Mode, since 31.08.2026)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Creating helpful, reliable, people-first content', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/13965727', nazwa: 'Google Analytics Help: Conversions vs. key events', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/updates', nazwa: 'Google Search Central: Latest Google Search Documentation updates (FAQ rich result, 2026)', data: '2026-11-11' },
  { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals', data: '2026-11-11' },
];

export default {
  slug: 'szablon-strategii-seo',
  sciezkaEn: '/tools/seo-strategy-template',
  plik: 'strategia-seo',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'strategia seo', en: 'seo strategy template' },
  frazyDodatkowe: {
    pl: ['plan seo', 'strategia seo wzór', 'szablon strategii seo'],
    en: ['seo plan template', 'seo proposal template'],
  },
  seo: {
    pl: {
      tytul: 'Strategia SEO: szablon strategii SEO na 12 miesięcy (PDF)',
      opis: 'Strategia SEO w jednym dokumencie: cele, frazy i podstrony, plan treści na kwartały, technika, linki, AI i budżet. Darmowy szablon PDF do wypełnienia.',
    },
    en: {
      tytul: 'SEO Strategy Template: Free 12-Month SEO Plan (PDF)',
      opis: 'Free SEO strategy template: a one-page summary and a 12-month SEO plan with goals, keyword clusters, a quarterly roadmap, AI search, KPIs and budget.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Szablon strategii SEO',
    tag: 'Szablon PDF do pobrania',
    h1: 'Szablon strategii SEO: strategia SEO i plan na 12 miesięcy',
    lead: 'Strategia SEO to dokument, który przekłada cele firmy na konkretne frazy, podstrony, treści i prace techniczne na 12 miesięcy oraz mówi, jak zmierzysz efekt w zapytaniach od klientów, a nie tylko w ruchu. Nasz szablon ma podsumowanie na jednej stronie, mapę czterech kwartałów oraz pola na budżet, ryzyka i role.',
    karta: {
      nazwa: 'Szablon strategii SEO (PDF)',
      opis: 'Strategia SEO na 12 miesięcy w jednym dokumencie: cele, klastry fraz, plan treści, technika, linki, widoczność w AI i budżet.',
      cta: 'Pobierz szablon',
    },
    sekcje: [
      {
        id: 'czym-jest-strategia-seo',
        h2: 'Czym jest strategia SEO, a czym plan SEO',
        html: `<p>Strategia SEO odpowiada na trzy pytania: po co firma pozycjonuje stronę, na jakich tematach chce wygrywać i po czym pozna, że to działa. Plan SEO to jej rozpisanie w czasie: kto, co i do kiedy robi w kolejnych miesiącach. Audyt poprzedza strategię: diagnozuje stronę i daje listę problemów, z której strategia wybiera te ważne dla celu.</p>
<p>Bez strategii pozycjonowanie zamienia się w listę zadań bez kolejności. Zespół pisze artykuły, bo „trzeba pisać”, poprawia błędy, bo pokazało je narzędzie, i zdobywa linki do przypadkowych podstron. Po roku trudno powiedzieć, co z tego przyniosło klientów.</p>
<p>Dobra strategia mieści się w jednym dokumencie, który da się przeczytać w kwadrans. Szczegóły – listy fraz, kalendarz publikacji, zadania techniczne – trzymasz w załącznikach i aktualizujesz co miesiąc. Sam rdzeń zmieniasz rzadko: przy przeglądzie kwartalnym albo gdy zmieni się cel firmy.</p>`,
        tabela: {
          id: 'tabela-dokumenty-seo',
          caption: 'Cztery dokumenty SEO i to, czym się różnią',
          columns: [
            { key: 'dokument', label: 'Dokument' },
            { key: 'pytanie', label: 'Na jakie pytanie odpowiada' },
            { key: 'zmiana', label: 'Jak często się zmienia' },
          ],
          rows: [
            { dokument: 'Audyt SEO', pytanie: 'Co jest nie tak ze stroną i co poprawić', zmiana: 'Pełny na starcie, potem przegląd co kwartał i po każdej dużej zmianie strony' },
            { dokument: 'Strategia SEO', pytanie: 'Po co pozycjonujemy, na jakich tematach wygrywamy i jak to zmierzymy', zmiana: 'Przegląd co kwartał, nowa wersja raz w roku' },
            { dokument: 'Plan SEO (mapa kwartałów)', pytanie: 'Kto, co i do kiedy robi w kolejnych miesiącach', zmiana: 'Aktualizacja co miesiąc' },
            { dokument: 'Raport SEO', pytanie: 'Co dała praca w danym miesiącu i co dalej', zmiana: 'Co miesiąc' },
          ],
        },
      },
      {
        id: 'co-zawiera-szablon',
        h2: 'Co zawiera szablon strategii SEO: 12 części',
        html: `<p>Szablon prowadzi od celu do budżetu. Każda część odpowiada na jedno pytanie i ma wskazane źródło danych, więc wiesz, co przygotować przed wypełnianiem. Część pierwszą, podsumowanie, wypełniasz na końcu.</p>`,
        tabela: {
          id: 'tabela-czesci-szablonu',
          caption: '12 części szablonu strategii SEO',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'pytanie', label: 'Na jakie pytanie odpowiada' },
            { key: 'dane', label: 'Skąd wziąć dane' },
          ],
          rows: [
            { czesc: '1. Strategia na jednej stronie', pytanie: 'Co chcemy osiągnąć w 12 miesięcy i jak to zmierzymy', dane: 'Wypełniasz na końcu, ze wszystkich części' },
            { czesc: '2. Cele biznesowe i cele SEO', pytanie: 'Ile zapytań albo sprzedaży ma dać wyszukiwarka', dane: 'Sprzedaż, CRM, GA4' },
            { czesc: '3. Stan wyjściowy', pytanie: 'Gdzie jesteśmy dziś', dane: 'Google Search Console, GA4, wizytówka Google' },
            { czesc: '4. Klastry fraz i podstrony docelowe', pytanie: 'Na jakich tematach wygrywamy i którą podstroną', dane: 'Search Console, autosugestie Google, pytania klientów, narzędzie do fraz, konkurencja' },
            { czesc: '5. Plan treści na kwartały', pytanie: 'Co powstaje, co aktualizujemy, co łączymy', dane: 'Klastry fraz, luki w treściach' },
            { czesc: '6. Priorytety techniczne', pytanie: 'Co blokuje indeksowanie i wygodę użytkownika', dane: 'Audyt SEO, raport Indeksowanie stron w GSC' },
            { czesc: '7. SEO lokalne', pytanie: 'Jak wygrać w Mapach i wynikach lokalnych', dane: 'Wizytówka Google, pomiar pozycji w siatce punktów' },
            { czesc: '8. Linki', pytanie: 'Skąd i do których podstron zdobywać odnośniki', dane: 'Profil linków, analiza konkurencji' },
            { czesc: '9. Widoczność w AI (GEO)', pytanie: 'Czy ChatGPT i przegląd AI w Google wymieniają firmę', dane: 'Stały zestaw pytań klientów' },
            { czesc: '10. Mapa kwartałów', pytanie: 'Co robimy w każdym kwartale i po czym poznamy sukces', dane: 'Części 4–9' },
            { czesc: '11. Pomiar, raportowanie i ryzyka', pytanie: 'Co, jak często i komu raportujemy, co może pójść źle', dane: 'GA4, GSC, panel albo dashboard' },
            { czesc: '12. Odpowiedzialności i budżet', pytanie: 'Kto robi co i ile to kosztuje', dane: 'Umowa, zasoby firmy' },
          ],
        },
        htmlPo: `<p>Kolejność ma znaczenie. Najpierw cele i stan wyjściowy, potem frazy i podstrony, na końcu harmonogram i budżet. Jeśli zaczniesz od listy artykułów, łatwo dopasujesz cele do pomysłów, a nie odwrotnie.</p>`,
      },
      {
        id: 'cele',
        h2: 'Cele strategii SEO: zapytania od klientów, nie sam ruch',
        html: `<p>Cel biznesowy brzmi jak cel zarządu: więcej klientów z danej usługi, wejście do nowego miasta, niższy koszt pozyskania klienta. Cel SEO przekłada go na to, co da się zmierzyć w wyszukiwarce. Najlepiej na zapytania od klientów z wyników organicznych – formularz, telefon, e-mail – bo sam ruch nie płaci faktur. W sklepie internetowym będzie to przychód z ruchu organicznego, a w firmie B2B zapytania, które dział sprzedaży uznał za wartościowe.</p>
<p>Zapytania mierzysz w GA4 jako zdarzenia kluczowe. Google opisuje je jako zdarzenia, które mierzą działania szczególnie ważne dla sukcesu firmy; dawniej nazywano je w Analytics konwersjami. Jeśli zdarzenia kluczowe nie są skonfigurowane, pierwszym zadaniem strategii jest pomiar, a dopiero potem treści.</p>
<h3>Przykład strategii SEO: łańcuch celów (liczby przykładowe)</h3>
<p>Firma remontowa z Warszawy chce więcej zleceń na remonty łazienek. W szablonie łańcuch celów wygląda tak:</p>
<ol>
<li><strong>Cel biznesowy:</strong> więcej zleceń na remonty łazienek w Warszawie w drugim półroczu.</li>
<li><strong>Cel SEO (wynik):</strong> np. 25 zapytań miesięcznie z wyników organicznych w IV kwartale, mierzonych w GA4.</li>
<li><strong>Cel pośredni:</strong> wzrost kliknięć z fraz bez nazwy firmy na stronę usługi i podstrony dzielnic, rok do roku w Search Console.</li>
<li><strong>Cel działań:</strong> strona usługi w TOP 3 dla uzgodnionej listy fraz i wizytówka w TOP 3 w większości punktów siatki w obsługiwanych dzielnicach.</li>
</ol>
<p>Każdy poziom ma liczbę, źródło i termin. Wartości ustal na podstawie stanu wyjściowego i historii sprzedaży – liczby z przykładu są tylko ilustracją. Pozycja jest tu celem pomocniczym: pokazuje, czy prace idą w dobrą stronę, ale strategię rozliczasz z zapytań. Punkt odniesienia da <a href="/narzedzia/kalkulator-strat-seo">kalkulator strat SEO</a>: na podstawie liczby wyszukiwań, konwersji i wartości klienta szacuje, ile zysku miesięcznie trafia do konkurencji, gdy nie ma Cię w TOP 3.</p>`,
      },
      {
        id: 'stan-wyjsciowy',
        h2: 'Stan wyjściowy: co spisać z Search Console i GA4',
        html: `<p>Bez punktu startu nie ocenisz po roku, czy strategia zadziałała. Zrób zrzut danych przed pierwszą zmianą na stronie i zapisz go w szablonie z datą. Najlepiej z ostatnich 12 miesięcy, żeby widzieć sezonowość.</p>
<ul>
<li><strong>Search Console:</strong> kliknięcia i wyświetlenia bez zapytań o markę, podstrony z największą liczbą kliknięć, frazy na pozycjach 4–20 (najszybsze do podciągnięcia), liczba stron niezaindeksowanych i powody z raportu Indeksowanie stron.</li>
<li><strong>GA4:</strong> zdarzenia kluczowe z kanału Organic Search miesiąc po miesiącu, strony wejścia z tych sesji, udział telefonów w ruchu.</li>
<li><strong>Wizytówka Google:</strong> kategoria główna, liczba i średnia ocena opinii, pozycja w Mapach na najważniejsze frazy w kilku punktach obsługiwanego obszaru.</li>
<li><strong>Widoczność w AI:</strong> 20–30 pytań, które zadają klienci, sprawdzonych w ChatGPT, Gemini, Perplexity i przeglądzie AI w Google. Zapisz, czy padła nazwa firmy i kogo polecono zamiast niej.</li>
<li><strong>Konkurencja:</strong> 3–5 firm, które najczęściej widzisz nad sobą w wynikach i w odpowiedziach AI.</li>
</ul>
<p>Jeśli brakuje Ci danych w którymś punkcie, wpisz „brak” zamiast zgadywać. Brak danych to też informacja – i zwykle pierwsze zadanie w planie.</p>`,
      },
      {
        id: 'klastry-fraz',
        h2: 'Klastry fraz i podstrony docelowe',
        html: `<p>Frazy zbieraj z czterech źródeł: Search Console (zapytania z wyświetleniami i frazy na pozycjach 4–20), autosugestie i „Podobne pytania” w Google, frazy konkurencji oraz pytania, które klienci zadają handlowcom i obsłudze. Pytania klientów najlepiej pokazują intencję.</p>
<p>Klaster to grupa fraz o tej samej intencji, którą obsłuży jedna podstrona. Czy dwie frazy należą do jednego klastra, sprawdzisz w Google: jeśli w ich TOP 10 powtarza się co najmniej 4–5 tych samych adresów (40–50%), wystarczy jedna podstrona. „Remont łazienki Warszawa”, „firma od remontu łazienki” i „remont łazienki cennik” mogą trafić na jedną stronę usługi z cennikiem, jeśli Google pokazuje dla nich podobne wyniki. Gdy na „ile kosztuje remont łazienki” Google wyświetla głównie poradniki z widełkami cen, to osobny klaster i osobny artykuł. Tak samo pytania poradnikowe, np. „jak wybrać płytki do łazienki”.</p>
<p>Zasada w szablonie: jeden klaster, jedna podstrona docelowa. Dwie podstrony walczące o te same frazy osłabiają się nawzajem (kanibalizacja). Jeśli takie już masz, zapisz w planie ich połączenie i przekierowanie 301. Strona usługi jest centrum klastra: artykuły poradnikowe linkują do niej, a ona do nich. Treści pisz dla ludzi, nie dla robota: Google zaznacza, że jego systemy mają premiować pomocne, wiarygodne informacje tworzone z myślą o użytkownikach.</p>`,
        tabela: {
          id: 'tabela-klastry',
          caption: 'Przykład mapy klastrów (wypełniony fragment szablonu)',
          columns: [
            { key: 'klaster', label: 'Klaster' },
            { key: 'intencja', label: 'Intencja' },
            { key: 'podstrona', label: 'Podstrona docelowa' },
            { key: 'dzialanie', label: 'Działanie' },
            { key: 'priorytet', label: 'Priorytet' },
          ],
          rows: [
            { klaster: 'Remont łazienki Warszawa', intencja: 'Zakup usługi', podstrona: 'Strona usługi /remont-lazienki', dzialanie: 'Rozbudowa: cennik, realizacje, FAQ', priorytet: 'Wysoki' },
            { klaster: 'Ile kosztuje remont łazienki', intencja: 'Informacja o kosztach (poradnik)', podstrona: 'Nowy artykuł z widełkami cen', dzialanie: 'Nowa treść z linkiem do strony usługi', priorytet: 'Wysoki' },
            { klaster: 'Remont łazienki w dzielnicach', intencja: 'Zakup lokalny', podstrona: 'Podstrony dzielnic', dzialanie: 'Tylko z unikalną treścią i realizacjami z dzielnicy', priorytet: 'Średni' },
            { klaster: 'Wybór płytek i armatury', intencja: 'Poradnik', podstrona: 'Istniejący wpis na blogu', dzialanie: 'Aktualizacja i link do strony usługi', priorytet: 'Niski' },
          ],
        },
        htmlPo: `<p>Priorytet ustal według dwóch kryteriów: jak blisko zakupu jest intencja i jak blisko TOP 10 jesteś dziś. Strona usługi na 8. pozycji szybciej da wynik niż nowy poradnik pisany od zera. Przy dłuższej liście oceń każde zadanie w skali 1–10 pod kątem wpływu na zapytania, pewności i łatwości wdrożenia, a kolejność wyznacz iloczynem tych ocen (metoda ICE).</p>
<h3>Strony z jednego wzoru</h3>
<p>Jeśli klienci szukają tej samej usługi w wielu wariantach – w różnych miastach, dla różnych branż albo w porównaniach „X czy Y” – możesz zaplanować serię stron z jednego wzoru. Każda musi mieć własne dane: realizacje, ceny, zdjęcia, odpowiedzi na lokalne pytania. Strony kierowane na kolejne miasta, które tylko prowadzą użytkownika do jednej strony, Google wymienia w zasadach dotyczących spamu jako nadużycie stron przejściowych. Publikuj je partiami i sprawdzaj w Search Console, ile z nich trafia do indeksu.</p>`,
      },
      {
        id: 'plan-seo-12-miesiecy',
        h2: 'Plan SEO na 12 miesięcy: mapa kwartałów',
        html: `<p>Mapa kwartałów to serce szablonu. Każdy kwartał ma jeden główny cel i zadania w czterech obszarach. Kolejność wynika z zależności: najpierw pomiar i technika, bo bez nich treści i linki pracują gorzej.</p>`,
        tabela: {
          id: 'tabela-mapa-kwartalow',
          caption: 'Przykładowa mapa kwartałów w szablonie strategii SEO',
          columns: [
            { key: 'kwartal', label: 'Kwartał i cel' },
            { key: 'tresci', label: 'Treści' },
            { key: 'technika', label: 'Technika' },
            { key: 'lokalne', label: 'Lokalne i linki' },
            { key: 'ai', label: 'AI (GEO)' },
            { key: 'miara', label: 'Miara sukcesu' },
          ],
          rows: [
            { kwartal: 'Q1 (mies. 1–3): fundament i pomiar', tresci: 'Strony usług z klastrów o najwyższym priorytecie', technika: 'Indeksowanie, przekierowania, szybkość, dane strukturalne', lokalne: 'Wizytówka: kategorie, usługi, zdjęcia; spójne dane firmy w katalogach', ai: 'Pomiar startowy na stałym zestawie pytań', miara: 'Zdarzenia kluczowe działają, błędy krytyczne usunięte' },
            { kwartal: 'Q2 (mies. 4–6): rozbudowa treści', tresci: 'Artykuły do klastrów poradnikowych, FAQ na stronach usług', technika: 'Linkowanie wewnętrzne, kwartalny przegląd crawlerem, poprawki z Search Console', lokalne: 'Pierwsze linki z branżowych i lokalnych źródeł', ai: 'Odpowiedzi wprost na pytania klientów w treściach', miara: 'Wzrost kliknięć z fraz bez marki' },
            { kwartal: 'Q3 (mies. 7–9): autorytet', tresci: 'Treści eksperckie, dane własne, opisy realizacji', technika: 'Kwartalny przegląd crawlerem, Core Web Vitals, nowe błędy', lokalne: 'Linki do stron usług, plan zbierania opinii', ai: 'Wzmianki o firmie w źródłach, które cytują asystenci AI', miara: 'Wzrost zapytań z wyników organicznych' },
            { kwartal: 'Q4 (mies. 10–12): skalowanie i przegląd', tresci: 'Aktualizacja najlepszych treści, nowe klastry', technika: 'Pełny audyt kontrolny', lokalne: 'Kontynuacja linków, podstrony lokalne z własną treścią', ai: 'Porównanie z pomiarem startowym', miara: 'Realizacja celu SEO na rok, gotowy plan na kolejny rok' },
          ],
        },
        htmlPo: `<p>Traktuj mapę jako ramę, nie sztywny harmonogram. Jeśli w pierwszym kwartale okaże się, że strona ma poważny problem z indeksowaniem, technika dostaje więcej czasu, a treści przesuwają się o miesiąc. Każdą zmianę zapisz w szablonie z datą i powodem – po roku to najlepsza ściąga przy planowaniu kolejnego.</p>
<p>Jeśli dane nie podpowiadają inaczej, zacznij od takiego podziału czasu w kwartale: ok. 40% na treści (nowe i aktualizacje), 30% na technikę, 20% na linki i wzmianki, 10% na testy. Gdy strona ma duże zaległości techniczne, odwróć proporcje treści i techniki na kwartał albo dwa.</p>`,
      },
      {
        id: 'technika-lokalne-linki',
        h2: 'Technika, SEO lokalne i linki: jak ustalić priorytety',
        html: `<h3>Priorytety techniczne</h3>
<p>Do strategii trafiają tylko te poprawki, które blokują cel: strony usług poza indeksem, błędy przekierowań po migracji, wolne ładowanie na telefonach, zduplikowane treści. Szybkość oceniaj na danych od użytkowników: według web.dev dobry wynik to LCP do 2,5 s, INP do 200 ms i CLS do 0,1. Pełną listę z audytu trzymaj w załączniku. W szablonie każda poprawka ma podstronę, której dotyczy, właściciela i termin.</p>
<h3>SEO lokalne</h3>
<p>Jeśli obsługujesz klientów w konkretnym mieście, wizytówka Google to osobny tor pracy. Zapisz kategorię główną, listę usług, plan zbierania opinii i obszary, w których mierzysz pozycje. Pomiar z jednego miejsca, np. z biura, pokazuje wynik tylko w tym punkcie. Lepiej sprawdzać siatkę punktów rozłożonych na mapie obsługiwanego obszaru.</p>
<h3>Linki</h3>
<p>Zamiast samej liczby linków na miesiąc wpisz, do których podstron mają prowadzić i z jakich źródeł: organizacje branżowe, partnerzy, media lokalne i branżowe, sponsoring, publikacje oparte na własnych danych. Link z tematycznie bliskiej strony do strony usługi zwykle wnosi więcej niż kilka przypadkowych wpisów na blogach. Nie kupuj linków: Google zalicza kupowanie i sprzedawanie linków wpływających na pozycje do spamu.</p>`,
      },
      {
        id: 'widocznosc-w-ai',
        h2: 'Widoczność w AI (GEO) jako część strategii SEO',
        html: `<p>Część klientów pyta o usługi ChatGPT albo czyta przegląd AI w Google zamiast listy wyników. Dlatego szablon ma osobną część na widoczność w AI, czyli GEO. To nie jest oddzielna strategia. Według Google nie ma dodatkowych wymagań, żeby strona pojawiła się w przeglądach AI albo w trybie AI: musi być zaindeksowana i móc wyświetlać się w wyszukiwarce z fragmentem. Nie trzeba też tworzyć nowych plików ani specjalnych danych strukturalnych.</p>
<p>W praktyce GEO dokłada do SEO trzy rzeczy: odpowiedzi wprost na pytania klientów w treściach (najlepiej osobna sekcja albo podstrona na każde ważne pytanie), spójne informacje o firmie w wielu źródłach (wizytówka, katalogi, media) i regularny pomiar. Pomiar musi być osobny, bo Google wlicza kliknięcia z funkcji AI do zwykłego raportu Skuteczność w Search Console (typ wyszukiwania „Internet”), a osobny raport o skuteczności w generatywnej AI (od 31.08.2026) pokazuje tylko wyświetlenia. Sygnałem, że nad wynikami pojawia się przegląd AI, bywa spadek CTR przy stałej pozycji na frazach informacyjnych. W szablonie wpisujesz stały zestaw pytań, narzędzia AI, które sprawdzasz, i częstotliwość pomiaru. Jak pracujemy nad tym u klientów, opisujemy na stronie <a href="/pozycjonowanie-w-ai">pozycjonowanie w AI</a>.</p>`,
      },
      {
        id: 'pomiar-ryzyka-budzet',
        h2: 'Pomiar, raportowanie, ryzyka i budżet',
        html: `<p>Strategia bez rytmu przeglądów szybko staje się dokumentem z szuflady. W szablonie ustalasz, co mierzysz, jak często i kto dostaje wyniki.</p>`,
        tabela: {
          id: 'tabela-rytm-pomiaru',
          caption: 'Rytm pomiaru i raportowania',
          columns: [
            { key: 'co', label: 'Co' },
            { key: 'kiedy', label: 'Jak często' },
            { key: 'zrodlo', label: 'Źródło' },
            { key: 'kto', label: 'Kto dostaje' },
          ],
          rows: [
            { co: 'Pozycje fraz z uzgodnionej listy i udział w widoczności wobec 3–5 konkurentów', kiedy: 'Co tydzień, w raporcie co miesiąc', zrodlo: 'Tracker pozycji (własne pozycje także w Search Console)', kto: 'Zespół SEO' },
            { co: 'Widoczność w odpowiedziach AI', kiedy: 'Co tydzień albo co miesiąc, zawsze te same pytania', zrodlo: 'Stały zestaw pytań klientów', kto: 'Zespół SEO, marketing' },
            { co: 'Zapytania z wyników organicznych, kliknięcia bez marki (także rok do roku)', kiedy: 'Co miesiąc', zrodlo: 'GA4, Search Console', kto: 'Właściciel, marketing' },
            { co: 'Przegląd strategii i mapy kwartałów', kiedy: 'Co kwartał', zrodlo: 'Wszystkie części szablonu', kto: 'Właściciel, zespół SEO' },
            { co: 'Podsumowanie roku i plan na kolejny', kiedy: 'Raz w roku', zrodlo: 'Porównanie ze stanem wyjściowym', kto: 'Zarząd' },
          ],
        },
        htmlPo: `<h3>Ryzyka</h3>
<p>Wpisz, co może zatrzymać wyniki i jak zareagujesz: brak dostępu do programisty, migracja strony, aktualizacja algorytmu, wolna akceptacja treści, nowy konkurent w Mapach. Zapisz też oczekiwania. Google wprost pisze, że nikt nie może zagwarantować pierwszego miejsca w jego wynikach. Pozycja może więc być celem pomocniczym, ale główny cel formułuj jako wzrost zapytań i kliknięć, a nie konkretne miejsce „na zawsze”.</p>
<h3>Odpowiedzialności i budżet</h3>
<p>Przy każdym obszarze wpisz osobę po stronie firmy i po stronie agencji. W budżecie rozdziel stałą obsługę, treści, linki, prace programistyczne, SEO lokalne, widoczność w AI i narzędzia – tak jak w części 12. Dla orientacji: u nas abonament SEO Standard kosztuje 1 900 zł netto miesięcznie (do 20 fraz, 2 treści i 2 linki), SEO Premium 2 500 zł netto (do 50 fraz, 4 treści i 4 linki), a cotygodniowy pomiar widoczności w AI razem z działaniami pod AI to dopłata 490 zł netto miesięcznie do SEO Standard. W SEO Premium są w cenie. Pełne zestawienie znajdziesz w <a href="/cennik-pozycjonowania">cenniku pozycjonowania</a>.</p>`,
      },
      {
        id: 'jak-wypelnic',
        h2: 'Jak wypełnić szablon strategii SEO krok po kroku',
        html: `<ol>
<li><strong>Zbierz stan wyjściowy.</strong> Wyeksportuj dane z Search Console i GA4 za 12 miesięcy, sprawdź wizytówkę Google i odpowiedzi AI na pytania klientów. Zapisz datę pomiaru.</li>
<li><strong>Przełóż cel biznesowy na cel SEO.</strong> Wpisz cel firmy jednym zdaniem i zamień go na liczbę zapytań z wyników organicznych, z terminem i źródłem pomiaru.</li>
<li><strong>Pogrupuj frazy w klastry.</strong> Każdemu klastrowi przypisz intencję i jedną podstronę docelową. Zaznacz, czy podstrona jest do stworzenia, rozbudowy czy połączenia.</li>
<li><strong>Wybierz priorytety: technika, SEO lokalne, linki i AI.</strong> Z audytu przenieś tylko poprawki, które blokują cel. Dopisz plan dla wizytówki, źródła linków i stały zestaw pytań do pomiaru w AI.</li>
<li><strong>Rozpisz plan treści i mapę kwartałów.</strong> Przypisz każdą treść do klastra, a każdemu kwartałowi daj jeden cel, zadania w czterech obszarach i miarę sukcesu.</li>
<li><strong>Ustal pomiar, ryzyka, role i budżet.</strong> Wpisz, co mierzysz i jak często, kto odpowiada za każdy obszar i ile na niego wydajesz.</li>
<li><strong>Wypełnij podsumowanie na jednej stronie.</strong> Zbierz najważniejsze ustalenia w części 1 i od razu umów termin pierwszego przeglądu kwartalnego.</li>
</ol>`,
      },
      {
        id: 'najczestsze-bledy',
        h2: 'Najczęstsze błędy w strategii SEO',
        html: `<ul>
<li><strong>Cel „więcej ruchu”</strong> bez liczby zapytań, terminu i źródła pomiaru.</li>
<li><strong>Lista fraz bez przypisanych podstron:</strong> kilka podstron walczy o te same zapytania i żadna nie wygrywa.</li>
<li><strong>Seria stron różniących się tylko nazwą miasta:</strong> bez własnych treści nie pomagają klientom, a Google opisuje takie strony w zasadach dotyczących spamu.</li>
<li><strong>Plan treści oderwany od klastrów:</strong> artykuły na tematy, których nikt nie szuka albo które nie prowadzą do usługi.</li>
<li><strong>Technika „na później”:</strong> nowe treści trafiają na stronę, której Google nie indeksuje poprawnie.</li>
<li><strong>Brak stanu wyjściowego:</strong> po roku nie ma z czym porównać wyników.</li>
<li><strong>Strategia napisana raz i odłożona:</strong> bez przeglądu kwartalnego plan rozjeżdża się z rzeczywistością.</li>
<li><strong>Pominięcie widoczności w AI:</strong> firma jest w Google, a asystenci AI polecają konkurencję.</li>
</ul>
<p>Jeśli wolisz, żeby strategię przygotował i prowadził zespół, który robi to na co dzień, zobacz, jak wygląda nasze <a href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Strategia SEO – wzór do wypełnienia (podgląd szablonu)',
      opis: 'Poniżej pełna treść szablonu. Możesz przepisać ją do własnego dokumentu albo pobrać PDF z miejscem na wpisy.',
      html: `<h3>Część 1. Strategia na jednej stronie</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Firma i adres strony</td><td>…</td></tr>
<tr><td>Okres strategii</td><td>od … do …</td></tr>
<tr><td>Cel biznesowy (jedno zdanie)</td><td>…</td></tr>
<tr><td>Cel SEO: zapytania z wyników organicznych miesięcznie w IV kwartale</td><td>…</td></tr>
<tr><td>Trzy najważniejsze klastry fraz i ich podstrony</td><td>1. … 2. … 3. …</td></tr>
<tr><td>Główny cel każdego kwartału</td><td>Q1 … Q2 … Q3 … Q4 …</td></tr>
<tr><td>Największe ryzyko i reakcja</td><td>…</td></tr>
<tr><td>Budżet miesięczny</td><td>…</td></tr>
<tr><td>Właściciel strategii po stronie firmy</td><td>…</td></tr>
<tr><td>Termin pierwszego przeglądu kwartalnego</td><td>…</td></tr>
</tbody></table>
<h3>Część 2. Cele biznesowe i cele SEO</h3>
<table><thead><tr><th>Poziom</th><th>Cel</th><th>Wartość docelowa</th><th>Źródło pomiaru</th><th>Termin</th></tr></thead><tbody>
<tr><td>Cel biznesowy</td><td>…</td><td>…</td><td>Sprzedaż, CRM</td><td>…</td></tr>
<tr><td>Cel SEO (zapytania)</td><td>…</td><td>…</td><td>GA4, zdarzenia kluczowe</td><td>…</td></tr>
<tr><td>Cel pośredni (kliknięcia bez marki)</td><td>…</td><td>…</td><td>Search Console</td><td>…</td></tr>
<tr><td>Cel działań (pozycje, Mapy, AI)</td><td>…</td><td>…</td><td>Tracker, siatka, pytania AI</td><td>…</td></tr>
</tbody></table>
<h3>Część 3. Stan wyjściowy (data pomiaru: …)</h3>
<table><thead><tr><th>Wskaźnik</th><th>Wartość dziś</th><th>Źródło</th></tr></thead><tbody>
<tr><td>Kliknięcia z fraz bez marki, ostatnie 12 miesięcy</td><td>…</td><td>Search Console</td></tr>
<tr><td>Zapytania z kanału Organic Search miesięcznie</td><td>…</td><td>GA4</td></tr>
<tr><td>Podstrony z największą liczbą kliknięć</td><td>…</td><td>Search Console</td></tr>
<tr><td>Frazy na pozycjach 4–20</td><td>…</td><td>Search Console</td></tr>
<tr><td>Strony niezaindeksowane i główne powody</td><td>…</td><td>Search Console</td></tr>
<tr><td>Udział telefonów w ruchu z wyszukiwarki</td><td>…</td><td>GA4</td></tr>
<tr><td>Pozycja wizytówki w Mapach</td><td>…</td><td>Pomiar w siatce punktów</td></tr>
<tr><td>Opinie w wizytówce: liczba i średnia ocena</td><td>…</td><td>Wizytówka Google</td></tr>
<tr><td>Odpowiedzi AI z nazwą firmy (na ile pytań)</td><td>…</td><td>Stały zestaw pytań klientów</td></tr>
<tr><td>Główni konkurenci w wynikach i w AI</td><td>…</td><td>Wyniki Google, odpowiedzi AI</td></tr>
</tbody></table>
<h3>Część 4. Klastry fraz i podstrony docelowe</h3>
<table><thead><tr><th>Klaster</th><th>Przykładowe frazy</th><th>Intencja</th><th>Podstrona docelowa</th><th>Działanie (nowa / rozbudowa / połączenie)</th><th>Priorytet</th></tr></thead><tbody>
<tr><td>1. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>2. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>3. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>4. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 5. Plan treści na kwartały</h3>
<table><thead><tr><th>Kwartał</th><th>Nowe treści</th><th>Aktualizacje i połączenia</th><th>Klaster</th><th>Odpowiedzialny</th></tr></thead><tbody>
<tr><td>Q1</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q2</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q3</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q4</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 6. Priorytety techniczne</h3>
<ul>
<li>☐ Strony usług są w indeksie (raport Indeksowanie stron)</li>
<li>☐ Przekierowania 301 bez łańcuchów i pętli</li>
<li>☐ Core Web Vitals na telefonach: LCP do 2,5 s, INP do 200 ms, CLS do 0,1</li>
<li>☐ Tagi kanoniczne, bez zduplikowanych treści</li>
<li>☐ Dane strukturalne zgodne z treścią: organizacja lub firma lokalna, okruszki</li>
<li>☐ Linkowanie wewnętrzne do stron usług</li>
<li>☐ Inne: … (podstrona, właściciel, termin)</li>
</ul>
<h3>Część 7. SEO lokalne</h3>
<ul>
<li>☐ Kategoria główna i dodatkowe w wizytówce Google: …</li>
<li>☐ Usługi i opisy uzupełnione w wizytówce</li>
<li>☐ Plan zbierania opinii: kto prosi, kiedy, jakim kanałem</li>
<li>☐ Nazwa, adres i telefon spójne w katalogach</li>
<li>☐ Obszary pomiaru w siatce punktów: …</li>
</ul>
<h3>Część 8. Linki</h3>
<table><thead><tr><th>Podstrona docelowa</th><th>Typ źródła</th><th>Przykładowe źródła</th><th>Liczba na kwartał</th><th>Odpowiedzialny</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 9. Widoczność w AI (GEO)</h3>
<table><thead><tr><th>Pytanie klienta</th><th>ChatGPT</th><th>Gemini</th><th>Perplexity</th><th>Przegląd AI w Google</th><th>Kogo polecono zamiast nas</th></tr></thead><tbody>
<tr><td>1. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
<tr><td>2. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
<tr><td>3. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
</tbody></table>
<p>Częstotliwość pomiaru: … Liczba pytań w zestawie: …</p>
<h3>Część 10. Mapa kwartałów</h3>
<table><thead><tr><th>Kwartał</th><th>Cel kwartału</th><th>Treści</th><th>Technika</th><th>Lokalne i linki</th><th>AI (GEO)</th><th>Miara sukcesu</th></tr></thead><tbody>
<tr><td>Q1</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q2</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q3</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q4</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 11. Pomiar, raportowanie i ryzyka</h3>
<table><thead><tr><th>Co mierzymy</th><th>Jak często</th><th>Źródło</th><th>Kto dostaje</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<table><thead><tr><th>Ryzyko</th><th>Prawdopodobieństwo (niskie / średnie / wysokie)</th><th>Reakcja</th><th>Kto pilnuje</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Część 12. Odpowiedzialności i budżet</h3>
<table><thead><tr><th>Obszar</th><th>Osoba w firmie</th><th>Osoba w agencji</th><th>Budżet miesięczny</th></tr></thead><tbody>
<tr><td>Stała obsługa SEO</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Treści</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Linki</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Prace programistyczne</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>SEO lokalne</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Widoczność w AI</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Narzędzia</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><strong>Razem</strong></td><td></td><td></td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Pobierz szablon strategii SEO (PDF)',
      opis: 'Wyślemy PDF z 12 częściami szablonu, mapą kwartałów i podsumowaniem na jednej stronie. Wydrukuj go albo dopisz ustalenia w dowolnym edytorze PDF.',
      etykieta: 'Twój adres e-mail',
      przycisk: 'Wyślij szablon PDF',
      przedmiot: 'szablon strategii SEO',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do szablonu strategii SEO w PDF przyjdzie w ciągu minuty.',
    },
    faq: [
      {
        question: 'Czym różni się strategia SEO od planu SEO?',
        answer: 'Strategia mówi, po co pozycjonujesz stronę, na jakich tematach chcesz wygrywać i jak zmierzysz efekt. Plan SEO rozpisuje ją w czasie: kto, co i do kiedy robi w kolejnych miesiącach. Strategię zmieniasz rzadko, przy przeglądzie kwartalnym albo gdy zmieni się cel firmy. Plan aktualizujesz co miesiąc, bo zadania się kończą, przesuwają i dochodzą nowe.',
      },
      {
        question: 'Na jaki okres przygotować strategię SEO?',
        answer: 'Najczęściej na 12 miesięcy z przeglądem co kwartał. Rok pozwala przejść od poprawek technicznych przez treści do budowania autorytetu i porównać wynik z tym samym okresem rok wcześniej. Krótszy plan zwykle kończy się, zanim treści i linki zaczną pracować. Ustal też, po czym poznasz postęp w pierwszych miesiącach, np. po działającym pomiarze i usuniętych błędach.',
      },
      {
        question: 'Czy szablon nadaje się dla małej firmy?',
        answer: 'Tak. Mała firma lokalna może pominąć rozbudowany plan treści i skupić się na stronach usług, wizytówce Google i opiniach. Wypełnij te części, które dotyczą Twojej sytuacji, a resztę oznacz jako „nie dotyczy”. Ważne, żeby zostały cele, stan wyjściowy, klastry z podstronami i mapa kwartałów, bo bez nich trudno ocenić, czy praca daje efekt.',
      },
      {
        question: 'Kto powinien przygotować strategię: firma czy agencja?',
        answer: 'Najlepiej obie strony razem. Firma wnosi cele, wiedzę o klientach, marże i budżet. Agencja albo specjalista SEO wnosi analizę fraz, techniki i konkurencji. Dokument powinien należeć do firmy i zostać u niej także po zmianie wykonawcy. Jeśli dostajesz od agencji ofertę, możesz porównać jej zawartość z 12 częściami szablonu i dopytać o brakujące elementy.',
      },
      {
        question: 'Jak często aktualizować strategię SEO?',
        answer: 'Rdzeń strategii, czyli cele i klastry, przeglądaj co kwartał, a nową wersję przygotuj raz w roku na podstawie porównania ze stanem wyjściowym. Plan treści i zadania techniczne aktualizuj co miesiąc, razem z raportem. Każdą zmianę zapisz w dokumencie z datą i powodem, żeby po roku było jasne, co zmieniono i dlaczego.',
      },
      {
        question: 'Czy w strategii uwzględniać ChatGPT i przegląd AI w Google?',
        answer: 'Tak, jako część strategii SEO, a nie osobny projekt. Według Google strona nie musi spełniać dodatkowych wymagań, żeby pojawić się w przeglądach AI – obowiązują te same dobre praktyki SEO. Warto jednak mierzyć, czy asystenci AI wymieniają firmę na stały zestaw pytań klientów, i dodać do planu treści odpowiedzi wprost na te pytania.',
      },
    ],
    zrodla: ZRODLA_GOOGLE,
    powiazane: [
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'Pozycjonowanie stron internetowych', opis: 'jak prowadzimy strategię i plan SEO dla klientów' },
      { href: '/cennik-pozycjonowania', tekst: 'Cennik pozycjonowania', opis: 'pakiety SEO i dodatki do wpisania w budżet strategii' },
      { href: '/pozycjonowanie-w-ai', tekst: 'Pozycjonowanie w AI', opis: 'widoczność firmy w ChatGPT, Gemini i przeglądzie AI w Google' },
      { href: '/porownania/seo-vs-geo', tekst: 'SEO vs GEO', opis: 'czym się różnią i od czego zacząć' },
      { href: '/narzedzia/szablon-analizy-konkurencji-seo', tekst: 'Szablon analizy konkurencji SEO', opis: 'dane do stanu wyjściowego i klastrów fraz (części 3 i 4)' },
      { href: '/narzedzia/content-plan', tekst: 'Content plan', opis: 'harmonogram publikacji do planu treści (część 5)' },
      { href: '/narzedzia/raport-seo', tekst: 'Wzór raportu SEO', opis: 'miesięczny raport, który rozlicza strategię' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Dobór słów kluczowych: szablon', opis: 'klastry fraz i mapa podstron, zanim ustalisz cele' },
      { href: '/narzedzia/linkowanie-wewnetrzne', tekst: 'Plan linkowania wewnętrznego', opis: 'linki do stron usług z zaplanowanymi tekstami kotwic' },
      { href: '/narzedzia/zapytanie-ofertowe-seo', tekst: 'Zapytanie ofertowe na SEO: wzór', opis: 'porównaj oferty agencji, zanim zlecisz strategię' },
    ],
    kroki: [
      { name: 'Zbierz stan wyjściowy', text: 'Wyeksportuj dane z Search Console i GA4 za 12 miesięcy, sprawdź wizytówkę Google i odpowiedzi AI na pytania klientów. Zapisz datę pomiaru.' },
      { name: 'Przełóż cel biznesowy na cel SEO', text: 'Wpisz cel firmy jednym zdaniem i zamień go na liczbę zapytań z wyników organicznych, z terminem i źródłem pomiaru.' },
      { name: 'Pogrupuj frazy w klastry', text: 'Każdemu klastrowi przypisz intencję i jedną podstronę docelową. Zaznacz, czy podstrona jest do stworzenia, rozbudowy czy połączenia.' },
      { name: 'Wybierz priorytety: technika, SEO lokalne, linki i AI', text: 'Z audytu przenieś tylko poprawki, które blokują cel. Dopisz plan dla wizytówki, źródła linków i stały zestaw pytań do pomiaru w AI.' },
      { name: 'Rozpisz plan treści i mapę kwartałów', text: 'Przypisz każdą treść do klastra, a każdemu kwartałowi daj jeden cel, zadania w czterech obszarach i miarę sukcesu.' },
      { name: 'Ustal pomiar, ryzyka, role i budżet', text: 'Wpisz, co mierzysz i jak często, kto odpowiada za każdy obszar i ile na niego wydajesz.' },
      { name: 'Wypełnij podsumowanie na jednej stronie', text: 'Zbierz najważniejsze ustalenia w części 1 i od razu umów termin pierwszego przeglądu kwartalnego.' },
    ],
    plikNazwa: 'Szablon strategii SEO na 12 miesięcy (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'SEO strategy template',
    tag: 'Free PDF template',
    h1: 'SEO strategy template: plan your next 12 months of SEO',
    lead: 'An SEO strategy template is a fill-in document that turns business goals into target keywords, pages, content and technical fixes for the next 12 months, and spells out how you will measure success in leads, not just traffic. Ours includes a one-page summary, a quarterly roadmap, and fields for budget, risks and owners.',
    karta: {
      nazwa: 'SEO strategy template (PDF)',
      opis: 'A 12-month SEO strategy in one document: goals, keyword clusters, content plan, technical SEO, links, AI search visibility and budget.',
      cta: 'Get the template',
    },
    sekcje: [
      {
        id: 'seo-strategy-vs-seo-plan',
        h2: 'SEO strategy vs. SEO plan: what is the difference?',
        html: `<p>An SEO strategy answers three questions: why the business invests in organic search, which topics it needs to win, and how it will know the work is paying off. An SEO plan is the schedule that follows from it: who does what, and by when, over the coming months. An SEO audit comes before the strategy. It diagnoses the site, and the strategy picks the issues that actually matter for the goal.</p>
<p>Without a strategy, SEO turns into a to-do list with no order. The team publishes posts because "we should be blogging," fixes whatever a crawler flags, and builds links to random pages. A year later, nobody can say which of it brought in customers.</p>
<p>A good strategy fits in a document you can read in fifteen minutes. The details, such as keyword lists, the publishing calendar and the technical backlog, live in appendices that you update monthly. The core changes rarely: at the quarterly review, or when the business goal changes.</p>`,
        tabela: {
          id: 'table-seo-documents',
          caption: 'Four SEO documents and how they differ',
          columns: [
            { key: 'document', label: 'Document' },
            { key: 'question', label: 'Question it answers' },
            { key: 'change', label: 'How often it changes' },
          ],
          rows: [
            { document: 'SEO audit', question: 'What is wrong with the site and what to fix', change: 'A full audit at the start, then a quarterly check and after every major site change' },
            { document: 'SEO strategy', question: 'Why we do SEO, which topics we win and how we measure it', change: 'Reviewed quarterly, rewritten yearly' },
            { document: 'SEO plan (quarterly roadmap)', question: 'Who does what, and by when', change: 'Updated monthly' },
            { document: 'SEO report', question: 'What the work delivered this month and what comes next', change: 'Monthly' },
          ],
        },
      },
      {
        id: 'whats-inside',
        h2: 'What is inside this SEO strategy template: 12 parts',
        html: `<p>The template walks you from the goal to the budget. Each part answers one question and lists where the data comes from, so you know what to pull together before you start. You fill in part one, the summary, last.</p>`,
        tabela: {
          id: 'table-template-parts',
          caption: 'The 12 parts of the SEO strategy template',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'question', label: 'Question it answers' },
            { key: 'data', label: 'Where the data comes from' },
          ],
          rows: [
            { part: '1. One-page strategy', question: 'What we want to achieve in 12 months and how we will measure it', data: 'Filled in last, from all other parts' },
            { part: '2. Business goals and SEO goals', question: 'How many leads or sales search should deliver', data: 'Sales data, CRM, GA4' },
            { part: '3. Baseline', question: 'Where we are today', data: 'Google Search Console, GA4, Google Business Profile' },
            { part: '4. Keyword clusters and target pages', question: 'Which topics we win, and with which page', data: 'Search Console, Google autocomplete, customer questions, a keyword tool, competitors' },
            { part: '5. Content plan by quarter', question: 'What we create, update or merge', data: 'Keyword clusters, content gaps' },
            { part: '6. Technical priorities', question: 'What blocks indexing and user experience', data: 'SEO audit, the Page indexing report in Search Console' },
            { part: '7. Local SEO', question: 'How we win in Maps and local results', data: 'Google Business Profile, grid-based rank tracking' },
            { part: '8. Link building', question: 'Where links come from and which pages they point to', data: 'Backlink profile, competitor research' },
            { part: '9. AI search visibility (GEO)', question: 'Do ChatGPT and Google AI Overviews mention the business?', data: 'A fixed set of customer questions' },
            { part: '10. Quarterly roadmap', question: 'What happens each quarter and how we define success', data: 'Parts 4 to 9' },
            { part: '11. Measurement, reporting and risks', question: 'What we report, how often, to whom, and what could go wrong', data: 'GA4, Search Console, a client portal or dashboard' },
            { part: '12. Owners and budget', question: 'Who does what and what it costs', data: 'Contract, internal resources' },
          ],
        },
        htmlPo: `<p>The order matters. Goals and baseline first, then keywords and pages, and only then the schedule and budget. If you start with a list of blog post ideas, you end up bending the goals to fit the ideas instead of the other way around.</p>`,
      },
      {
        id: 'goals',
        h2: 'Setting SEO goals: leads first, traffic second',
        html: `<p>A business goal sounds like something the leadership team would say: more customers for a specific service, entering a new city, a lower cost per acquisition. An SEO goal translates it into something you can measure in search. Ideally, that is leads from organic search (form fills, calls, emails), because traffic on its own does not pay the bills. For an online store, it is revenue from organic search; for a B2B company, leads your sales team has qualified.</p>
<p>In GA4 you track leads as key events. Google defines a key event as an event that measures an action particularly important to the success of your business; Analytics used to call these conversions. If key events are not set up yet, measurement is the first task in your strategy, before any content work.</p>
<h3>Worked example: a goal chain (illustrative numbers)</h3>
<p>A home renovation company wants more bathroom remodeling jobs. In the template, its goal chain looks like this:</p>
<ol>
<li><strong>Business goal:</strong> more bathroom remodeling jobs in the second half of the year.</li>
<li><strong>SEO goal (outcome):</strong> for example, 25 leads per month from organic search in Q4, tracked as key events in GA4.</li>
<li><strong>Leading indicator:</strong> year-over-year growth in non-branded clicks to the service page and the neighborhood pages in Search Console.</li>
<li><strong>Activity goal:</strong> the service page in the top 3 for an agreed keyword list, and the Business Profile in the top 3 across most points of the map grid in the areas the company serves.</li>
</ol>
<p>Every level gets a number, a data source and a deadline. Base the targets on your baseline and sales history; the numbers above are only an illustration. Rankings are a supporting target here: they show whether the work is heading the right way, but the strategy is judged on leads. For a reference point, the <a href="/en/tools/seo-loss-calculator">SEO loss calculator</a> uses search volume, conversion rate and customer value to estimate how much monthly profit goes to competitors while you are not in the top 3.</p>`,
      },
      {
        id: 'baseline',
        h2: 'Baseline: what to record from Search Console and GA4',
        html: `<p>Without a starting point, you cannot tell a year from now whether the strategy worked. Take a snapshot before you change anything on the site and record it in the template with a date. Use the last 12 months so seasonality is visible.</p>
<ul>
<li><strong>Search Console:</strong> non-branded clicks and impressions, the pages with the most clicks, queries ranking in positions 4 to 20 (the quickest wins), and the number of non-indexed pages with the reasons from the Page indexing report.</li>
<li><strong>GA4:</strong> key events from the Organic Search channel month by month, the landing pages for those sessions, and the share of mobile traffic.</li>
<li><strong>Google Business Profile:</strong> primary category, review count and average rating, and Maps rankings for your main keywords at several points across your service area.</li>
<li><strong>AI search visibility:</strong> 20 to 30 questions your customers actually ask, checked in ChatGPT, Gemini, Perplexity and Google AI Overviews. Note whether your business was named, and who was recommended instead.</li>
<li><strong>Competitors:</strong> the 3 to 5 businesses you most often see above you in search results and in AI answers.</li>
</ul>
<p>If you have no data for one of these, write "none" instead of guessing. Missing data is a finding too, and usually the first task in the plan.</p>`,
      },
      {
        id: 'keyword-clusters',
        h2: 'Keyword clusters and target pages',
        html: `<p>Collect keywords from four sources: Search Console (queries with impressions and those ranking in positions 4 to 20), Google autocomplete and "People also ask," competitor keywords, and the questions customers ask your sales and support teams. Customer questions show intent most clearly.</p>
<p>A cluster is a group of keywords with the same intent that one page can serve. To check whether two keywords belong together, search for both: if at least 4 or 5 of the top 10 URLs are the same (40–50%), one page is enough. "Bathroom remodel near me," "bathroom remodeling contractor" and "bathroom remodeling company" can land on a single service page with pricing if Google shows similar results for them. If "how much does a bathroom remodel cost" brings up mostly guides with price ranges, it is a separate cluster and a separate article. The same goes for how-to questions such as "how to choose bathroom tiles."</p>
<p>The rule in the template: one cluster, one target page. Two pages competing for the same queries weaken each other (keyword cannibalization). If you already have pages like that, plan to merge them with a 301 redirect. The service page is the hub of its cluster: guides link to it, and it links back to them. And write for people, not for crawlers: Google says its ranking systems aim to prioritize helpful, reliable information created to benefit people.</p>`,
        tabela: {
          id: 'table-clusters',
          caption: 'Example cluster map (a filled-in part of the template)',
          columns: [
            { key: 'cluster', label: 'Cluster' },
            { key: 'intent', label: 'Intent' },
            { key: 'page', label: 'Target page' },
            { key: 'action', label: 'Action' },
            { key: 'priority', label: 'Priority' },
          ],
          rows: [
            { cluster: 'Bathroom remodeling (service)', intent: 'Hire a contractor', page: 'Service page /bathroom-remodeling', action: 'Expand: pricing, project photos, FAQ', priority: 'High' },
            { cluster: 'How much a bathroom remodel costs', intent: 'Research costs (guide)', page: 'New article with price ranges', action: 'New content linking to the service page', priority: 'High' },
            { cluster: 'Bathroom remodeling by neighborhood', intent: 'Hire locally', page: 'Neighborhood pages', action: 'Only with unique content and local projects', priority: 'Medium' },
            { cluster: 'Choosing tiles and fixtures', intent: 'Learn', page: 'Existing blog post', action: 'Refresh and link to the service page', priority: 'Low' },
          ],
        },
        htmlPo: `<p>Set priorities using two questions: how close is the intent to a purchase, and how close to the top 10 are you today? A service page sitting at position 8 will move the needle faster than a brand-new guide written from scratch. With a longer list, score each task from 1 to 10 for impact on leads, confidence and ease, and rank by the product of the three scores (the ICE method).</p>
<h3>Pages built from one pattern</h3>
<p>If customers search for the same service in many variants (different cities, different industries, or "X vs. Y" comparisons), you can plan a series of pages built from one pattern. Each page needs its own data: projects, prices, photos, answers to local questions. Google's spam policies list pages targeted at specific regions or cities that funnel users to one page as doorway abuse. Publish such pages in batches and check in Search Console how many of them get indexed.</p>`,
      },
      {
        id: 'quarterly-roadmap',
        h2: '12-month SEO plan template: the quarterly roadmap',
        html: `<p>The roadmap is the heart of the template. Each quarter gets one main objective and tasks in four workstreams. The order follows dependencies: tracking and technical fixes come first, because content and links underperform without them.</p>`,
        tabela: {
          id: 'table-roadmap',
          caption: 'Sample quarterly roadmap from the SEO strategy template',
          columns: [
            { key: 'quarter', label: 'Quarter and objective' },
            { key: 'content', label: 'Content' },
            { key: 'technical', label: 'Technical' },
            { key: 'local', label: 'Local and links' },
            { key: 'ai', label: 'AI search (GEO)' },
            { key: 'success', label: 'Success measure' },
          ],
          rows: [
            { quarter: 'Q1 (months 1–3): foundations and tracking', content: 'Service pages for the highest-priority clusters', technical: 'Indexing, redirects, page speed, structured data', local: 'Business Profile: categories, services, photos; consistent business details in directories', ai: 'Baseline run on a fixed question set', success: 'Key events tracked, critical errors fixed' },
            { quarter: 'Q2 (months 4–6): content build-out', content: 'Articles for informational clusters, FAQs on service pages', technical: 'Internal linking, quarterly crawl, fixes from Search Console', local: 'First links from industry and local sources', ai: 'Direct answers to customer questions in your content', success: 'Growth in non-branded clicks' },
            { quarter: 'Q3 (months 7–9): authority', content: 'Expert content, first-party data, project write-ups', technical: 'Quarterly crawl, Core Web Vitals, new errors', local: 'Links to service pages, a review collection plan', ai: 'Mentions in sources that AI assistants cite', success: 'Growth in organic leads' },
            { quarter: 'Q4 (months 10–12): scale and review', content: 'Refresh top performers, add new clusters', technical: 'Full follow-up audit', local: 'Ongoing link building, local pages with their own content', ai: 'Compare against the baseline run', success: 'Annual SEO goal achieved, next year’s plan ready' },
          ],
        },
        htmlPo: `<p>Treat the roadmap as a frame, not a fixed schedule. If Q1 reveals a serious indexing problem, technical work gets more time and content slips by a month. Log every change in the template with a date and a reason; a year later, that log is the best input for planning the next one.</p>
<p>Unless your data suggests otherwise, start with this split of effort per quarter: about 40% content (new pieces and updates), 30% technical work, 20% links and mentions, and 10% experiments. If the site carries a lot of technical debt, swap the content and technical shares for a quarter or two.</p>`,
      },
      {
        id: 'technical-local-links',
        h2: 'Technical SEO, local SEO and link building priorities',
        html: `<h3>Technical priorities</h3>
<p>Only fixes that block the goal belong in the strategy: service pages missing from the index, broken redirects after a migration, slow mobile load times, duplicate content. Judge speed on real-user data: according to web.dev, a good result is LCP within 2.5 s, INP of 200 ms or less and CLS of 0.1 or less. Keep the full audit list in an appendix. In the template, each fix gets the page it affects, an owner and a deadline.</p>
<h3>Local SEO</h3>
<p>If you serve customers in a specific city or region, your Google Business Profile is a separate workstream. Record the primary category, your services, a plan for collecting reviews, and the areas where you track rankings. A ranking check from a single spot, such as your office, only tells you how you rank at that spot. A grid of points spread across your service area tells you much more.</p>
<h3>Link building</h3>
<p>Instead of a monthly link count, write down which pages the links should point to and where they will come from: industry associations, partners, local and trade media, sponsorships, content built on your own data. A link from a closely related site to a service page usually does more than a handful of random blog mentions. Do not buy links: Google's spam policies treat buying or selling links for ranking purposes as link spam.</p>`,
      },
      {
        id: 'ai-search-visibility',
        h2: 'AI search visibility (GEO) in your SEO strategy',
        html: `<p>Some customers now ask ChatGPT about services or read Google's AI Overview instead of scrolling the results. That is why the template has a dedicated part for AI search visibility, also called GEO. It is not a separate strategy. Google says there are no additional requirements to appear in AI Overviews or AI Mode: a page needs to be indexed and eligible to be shown in Search with a snippet. You do not need new files or special structured data either.</p>
<p>In practice, GEO adds three things on top of SEO: direct answers to customer questions in your content (ideally a section or a page for each important question), consistent information about your business across many sources (Business Profile, directories, media), and regular measurement. Measurement has to be separate, because Google counts clicks from AI features in the regular Performance report in Search Console, under the "Web" search type, and the separate generative AI performance report (since August 31, 2026) shows impressions only. A falling click-through rate at a stable position on informational queries can signal that an AI Overview now sits above the results. In the template you list a fixed set of questions, the AI tools you check and how often. Our <a href="/en/ai-search-optimization">AI search optimization</a> page explains how we handle this for clients.</p>`,
      },
      {
        id: 'measurement-risks-budget',
        h2: 'Measurement, reporting, risks and budget',
        html: `<p>A strategy without a review rhythm ends up in a drawer. In the template, you decide what you measure, how often, and who sees the results.</p>`,
        tabela: {
          id: 'table-reporting-cadence',
          caption: 'Measurement and reporting cadence',
          columns: [
            { key: 'what', label: 'What' },
            { key: 'when', label: 'How often' },
            { key: 'source', label: 'Source' },
            { key: 'who', label: 'Who gets it' },
          ],
          rows: [
            { what: 'Rankings for the agreed keyword list and share of voice against 3–5 competitors', when: 'Weekly, monthly in the report', source: 'A rank tracker (your own rankings also in Search Console)', who: 'SEO team' },
            { what: 'Visibility in AI answers', when: 'Weekly or monthly, always the same questions', source: 'Fixed set of customer questions', who: 'SEO team, marketing' },
            { what: 'Organic leads and non-branded clicks (also year over year)', when: 'Monthly', source: 'GA4, Search Console', who: 'Owner, marketing' },
            { what: 'Strategy and roadmap review', when: 'Quarterly', source: 'All parts of the template', who: 'Owner, SEO team' },
            { what: 'Annual summary and next year’s plan', when: 'Yearly', source: 'Comparison with the baseline', who: 'Leadership' },
          ],
        },
        htmlPo: `<h3>Risks</h3>
<p>List what could stall results and how you will respond: no developer time, a site migration, an algorithm update, slow content approvals, a new competitor in Maps. Set expectations too. Google states plainly that no one can guarantee a #1 ranking. Rankings can be a supporting target, but frame the main goal as growth in leads and clicks, not a specific position held forever.</p>
<h3>Owners and budget</h3>
<p>For each workstream, name one person on your side and one on the agency side. Split the budget into ongoing SEO, content, links, development work, local SEO, AI search visibility and tools, as in part 12. For reference, our SEO Standard plan is €450 net per month (up to 20 keywords, 2 pieces of content and 2 links), SEO Premium is €590 net (up to 50 keywords, 4 pieces of content and 4 links), and weekly AI visibility tracking together with AI-focused work is a €115 net per month add-on to SEO Standard. Both are included in SEO Premium. The full breakdown is on our <a href="/en/seo-pricing">SEO pricing</a> page.</p>`,
      },
      {
        id: 'how-to-fill-in',
        h2: 'How to fill in the template, step by step',
        html: `<ol>
<li><strong>Capture your baseline.</strong> Export 12 months of Search Console and GA4 data, check your Google Business Profile, and run your customer questions through AI assistants. Write down the date.</li>
<li><strong>Turn the business goal into an SEO goal.</strong> State the business goal in one sentence, then convert it into a number of organic leads with a deadline and a data source.</li>
<li><strong>Group keywords into clusters.</strong> Give each cluster an intent and one target page, and mark whether the page needs to be created, expanded or merged.</li>
<li><strong>Choose technical, local, link and AI priorities.</strong> Carry over only the audit fixes that block the goal, then add your Business Profile plan, link sources and a fixed question set for AI tracking.</li>
<li><strong>Plan content and build the quarterly roadmap.</strong> Assign every piece of content to a cluster, and give each quarter one objective, tasks in four workstreams and a success measure.</li>
<li><strong>Set measurement, risks, owners and budget.</strong> Decide what you track and how often, who owns each workstream, and what you spend on it.</li>
<li><strong>Write the one-page summary.</strong> Pull the key decisions into part 1 and book the first quarterly review right away.</li>
</ol>`,
      },
      {
        id: 'common-mistakes',
        h2: 'Common SEO strategy mistakes',
        html: `<ul>
<li><strong>"More traffic" as the goal,</strong> with no lead target, deadline or data source.</li>
<li><strong>Keywords without assigned pages:</strong> several pages compete for the same queries, and none of them wins.</li>
<li><strong>A series of pages that differ only by city name:</strong> without their own content they do not help customers, and Google describes such pages in its spam policies.</li>
<li><strong>A content plan disconnected from clusters:</strong> posts on topics nobody searches for, or that never lead to a service.</li>
<li><strong>Technical SEO "later":</strong> new content goes onto a site Google cannot index properly.</li>
<li><strong>No baseline:</strong> after a year, there is nothing to compare results against.</li>
<li><strong>Write once, never revisit:</strong> without a quarterly review, the plan drifts away from reality.</li>
<li><strong>Ignoring AI search:</strong> you rank in Google, but AI assistants recommend your competitors.</li>
</ul>
<p>If you would rather have a team that does this every day build and run the strategy, see how our <a href="/en/seo-services">SEO services</a> work.</p>`,
      },
    ],
    podglad: {
      h2: 'Template preview: every part of the SEO plan',
      opis: 'Below is the full content of the template. Copy it into your own document, or get the PDF with space to write.',
      html: `<h3>Part 1. One-page strategy</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>Company and website</td><td>…</td></tr>
<tr><td>Strategy period</td><td>from … to …</td></tr>
<tr><td>Business goal (one sentence)</td><td>…</td></tr>
<tr><td>SEO goal: organic leads per month in Q4</td><td>…</td></tr>
<tr><td>Top three keyword clusters and their pages</td><td>1. … 2. … 3. …</td></tr>
<tr><td>Main objective for each quarter</td><td>Q1 … Q2 … Q3 … Q4 …</td></tr>
<tr><td>Biggest risk and response</td><td>…</td></tr>
<tr><td>Monthly budget</td><td>…</td></tr>
<tr><td>Strategy owner on the company side</td><td>…</td></tr>
<tr><td>Date of the first quarterly review</td><td>…</td></tr>
</tbody></table>
<h3>Part 2. Business goals and SEO goals</h3>
<table><thead><tr><th>Level</th><th>Goal</th><th>Target</th><th>Data source</th><th>Deadline</th></tr></thead><tbody>
<tr><td>Business goal</td><td>…</td><td>…</td><td>Sales data, CRM</td><td>…</td></tr>
<tr><td>SEO goal (leads)</td><td>…</td><td>…</td><td>GA4 key events</td><td>…</td></tr>
<tr><td>Leading indicator (non-branded clicks)</td><td>…</td><td>…</td><td>Search Console</td><td>…</td></tr>
<tr><td>Activity goal (rankings, Maps, AI)</td><td>…</td><td>…</td><td>Rank tracker, map grid, AI questions</td><td>…</td></tr>
</tbody></table>
<h3>Part 3. Baseline (date: …)</h3>
<table><thead><tr><th>Metric</th><th>Value today</th><th>Source</th></tr></thead><tbody>
<tr><td>Non-branded clicks, last 12 months</td><td>…</td><td>Search Console</td></tr>
<tr><td>Organic Search leads per month</td><td>…</td><td>GA4</td></tr>
<tr><td>Pages with the most clicks</td><td>…</td><td>Search Console</td></tr>
<tr><td>Queries in positions 4–20</td><td>…</td><td>Search Console</td></tr>
<tr><td>Non-indexed pages and main reasons</td><td>…</td><td>Search Console</td></tr>
<tr><td>Mobile share of search traffic</td><td>…</td><td>GA4</td></tr>
<tr><td>Business Profile ranking in Maps</td><td>…</td><td>Grid-based rank tracking</td></tr>
<tr><td>Business Profile reviews: count and average rating</td><td>…</td><td>Google Business Profile</td></tr>
<tr><td>AI answers that name the business (out of how many questions)</td><td>…</td><td>Fixed set of customer questions</td></tr>
<tr><td>Main competitors in search and AI</td><td>…</td><td>Google results, AI answers</td></tr>
</tbody></table>
<h3>Part 4. Keyword clusters and target pages</h3>
<table><thead><tr><th>Cluster</th><th>Sample keywords</th><th>Intent</th><th>Target page</th><th>Action (new / expand / merge)</th><th>Priority</th></tr></thead><tbody>
<tr><td>1. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>2. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>3. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>4. …</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 5. Content plan by quarter</h3>
<table><thead><tr><th>Quarter</th><th>New content</th><th>Updates and merges</th><th>Cluster</th><th>Owner</th></tr></thead><tbody>
<tr><td>Q1</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q2</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q3</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q4</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 6. Technical priorities</h3>
<ul>
<li>☐ Service pages are indexed (Page indexing report)</li>
<li>☐ 301 redirects without chains or loops</li>
<li>☐ Core Web Vitals on mobile: LCP up to 2.5 s, INP up to 200 ms, CLS up to 0.1</li>
<li>☐ Canonical tags, no duplicate content</li>
<li>☐ Structured data that matches the page: organization or local business, breadcrumbs</li>
<li>☐ Internal links to service pages</li>
<li>☐ Other: … (page, owner, deadline)</li>
</ul>
<h3>Part 7. Local SEO</h3>
<ul>
<li>☐ Primary and secondary Business Profile categories: …</li>
<li>☐ Services and descriptions completed in the profile</li>
<li>☐ Review plan: who asks, when, through which channel</li>
<li>☐ Consistent name, address and phone number across directories</li>
<li>☐ Areas covered by grid-based rank tracking: …</li>
</ul>
<h3>Part 8. Link building</h3>
<table><thead><tr><th>Target page</th><th>Source type</th><th>Example sources</th><th>Links per quarter</th><th>Owner</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 9. AI search visibility (GEO)</h3>
<table><thead><tr><th>Customer question</th><th>ChatGPT</th><th>Gemini</th><th>Perplexity</th><th>Google AI Overviews</th><th>Who was recommended instead</th></tr></thead><tbody>
<tr><td>1. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
<tr><td>2. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
<tr><td>3. …</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>…</td></tr>
</tbody></table>
<p>Check frequency: … Number of questions in the set: …</p>
<h3>Part 10. Quarterly roadmap</h3>
<table><thead><tr><th>Quarter</th><th>Objective</th><th>Content</th><th>Technical</th><th>Local and links</th><th>AI search (GEO)</th><th>Success measure</th></tr></thead><tbody>
<tr><td>Q1</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q2</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q3</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Q4</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 11. Measurement, reporting and risks</h3>
<table><thead><tr><th>What we measure</th><th>How often</th><th>Source</th><th>Who gets it</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<table><thead><tr><th>Risk</th><th>Likelihood (low / medium / high)</th><th>Response</th><th>Owner</th></tr></thead><tbody>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>
<h3>Part 12. Owners and budget</h3>
<table><thead><tr><th>Workstream</th><th>Company owner</th><th>Agency owner</th><th>Monthly budget</th></tr></thead><tbody>
<tr><td>Ongoing SEO</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Content</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Link building</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Development work</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Local SEO</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>AI search visibility</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Tools</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><strong>Total</strong></td><td></td><td></td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Get the template (PDF)',
      opis: 'We will email you a PDF with all 12 parts, the quarterly roadmap and the one-page summary. Print it, or add your notes in any PDF editor.',
      etykieta: 'Your email address',
      przycisk: 'Email me the PDF template',
      przedmiot: 'the SEO strategy template',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the SEO strategy template PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'What is the difference between an SEO strategy and an SEO plan?',
        answer: 'The strategy explains why you invest in SEO, which topics you need to win and how you will measure results. The SEO plan turns it into a schedule: who does what, and by when, month by month. The strategy changes rarely, at quarterly reviews or when the business goal shifts. The plan changes every month, as tasks get done, slip or get added.',
      },
      {
        question: 'How long should an SEO strategy cover?',
        answer: 'Usually 12 months, with a review every quarter. A full year lets you move from technical fixes to content to authority building, and compare results with the same period a year earlier. A shorter plan tends to end before content and links start working. Also decide how you will judge progress in the first months, for example working lead tracking and fixed critical errors.',
      },
      {
        question: 'Can I use this as an SEO proposal template?',
        answer: 'Partly. An SEO proposal is a sales document an agency sends before the contract, while this template is the working plan you agree on together and keep if you change agencies. That said, the 12 parts make a good checklist for writing or reviewing a proposal: if goals, a baseline, keyword-to-page mapping or a reporting cadence are missing, ask about them before you sign.',
      },
      {
        question: 'Does this SEO strategy template work for a small business?',
        answer: 'Yes. A small local business can skip the larger content plan and focus on service pages, its Google Business Profile and reviews. Fill in the parts that apply and mark the rest "not applicable." Keep the goals, the baseline, the clusters with target pages and the quarterly roadmap, because without them it is hard to tell whether the work is paying off.',
      },
      {
        question: 'How often should I update my SEO strategy?',
        answer: 'Review the core, meaning goals and clusters, every quarter, and write a new version once a year based on a comparison with your baseline. Update the content plan and technical tasks monthly, alongside the report. Log every change with a date and a reason, so that a year later it is clear what changed and why.',
      },
      {
        question: 'Should an SEO strategy include ChatGPT and Google AI Overviews?',
        answer: 'Yes, as part of your SEO strategy rather than a separate project. Google says there are no additional requirements to appear in AI Overviews, and the usual SEO best practices still apply. It is still worth tracking whether AI assistants name your business for a fixed set of customer questions, and adding direct answers to those questions to your content plan.',
      },
    ],
    zrodla: ZRODLA_GOOGLE,
    powiazane: [
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'SEO services', opis: 'how we build and run SEO strategies for clients' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO pricing', opis: 'plans and add-ons to put into your strategy budget' },
      { href: '/pozycjonowanie-w-ai', tekst: 'AI search optimization', opis: 'getting your business mentioned in ChatGPT, Gemini and Google AI Overviews' },
      { href: '/porownania/seo-vs-geo', tekst: 'SEO vs GEO', opis: 'how they differ and where to start' },
      { href: '/narzedzia/szablon-analizy-konkurencji-seo', tekst: 'SEO competitor analysis template', opis: 'input for your baseline and keyword clusters (parts 3 and 4)' },
      { href: '/narzedzia/content-plan', tekst: 'Content calendar template', opis: 'a publishing schedule for your content plan (part 5)' },
      { href: '/narzedzia/raport-seo', tekst: 'SEO report template', opis: 'the monthly report that tracks the strategy' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Keyword research template', opis: 'keyword clusters and a keyword map before you set goals' },
      { href: '/narzedzia/linkowanie-wewnetrzne', tekst: 'Internal linking template', opis: 'links to your service pages with planned anchor text' },
      { href: '/narzedzia/zapytanie-ofertowe-seo', tekst: 'SEO RFP template', opis: 'compare agency proposals before you commission a strategy' },
    ],
    kroki: [
      { name: 'Capture your baseline', text: 'Export 12 months of Search Console and GA4 data, check your Google Business Profile, and run your customer questions through AI assistants. Write down the date.' },
      { name: 'Turn the business goal into an SEO goal', text: 'State the business goal in one sentence, then convert it into a number of organic leads with a deadline and a data source.' },
      { name: 'Group keywords into clusters', text: 'Give each cluster an intent and one target page, and mark whether the page needs to be created, expanded or merged.' },
      { name: 'Choose technical, local, link and AI priorities', text: 'Carry over only the audit fixes that block the goal, then add your Business Profile plan, link sources and a fixed question set for AI tracking.' },
      { name: 'Plan content and build the quarterly roadmap', text: 'Assign every piece of content to a cluster, and give each quarter one objective, tasks in four workstreams and a success measure.' },
      { name: 'Set measurement, risks, owners and budget', text: 'Decide what you track and how often, who owns each workstream, and what you spend on it.' },
      { name: 'Write the one-page summary', text: 'Pull the key decisions into part 1 and book the first quarterly review right away.' },
    ],
    plikNazwa: 'SEO strategy template: 12-month SEO plan (PDF)',
  },
};
