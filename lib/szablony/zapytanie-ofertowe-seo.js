// Zapytanie ofertowe na SEO: wzór do wysłania agencjom (11.11.2026): /narzedzia/zapytanie-ofertowe-seo
// i /en/tools/seo-rfp-template. Kontrakt danych: lib/szablony/README.md.
// PDF: public/pliki/zapytanie-ofertowe-seo-wzor.pdf (PL) i seo-rfp-template.pdf (EN), źródła HTML
// w scripts/szablony/pdf/. Temat nr 7 z prace-2026-11-11/szablony/nowe-tematy/RAPORT.md (BOFU,
// uzupełnia /porownania/jak-wybrac-agencje-seo). Ograniczenia z badania: to nie dokument zamówień
// publicznych ani porada prawna, bez przykładowych cen agencji (tylko pola i link do cennika).
// Zdania o Google pochodzą ze stron w zrodla (odczyt 11.11.2026): do-i-need-seo (pytania do SEO,
// dostęp tylko do odczytu przy audycie, brak gwarancji 1. miejsca, odpowiedzialność właściciela,
// AEO/GEO zgodne z wytycznymi), uprawnienia Search Console, GA4 i Profilu Firmy, spam (kupowanie
// linków), funkcje AI (brak dodatkowych wymagań). Wagi kryteriów = propozycja AI SEO COMPANY.

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO?', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7687615?hl=pl', nazwa: 'Search Console – Pomoc: Zarządzanie właścicielami, użytkownikami i uprawnieniami', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/9305587?hl=pl', nazwa: 'Analytics – Pomoc: Zarządzanie dostępem i ograniczeniami dotyczącymi danych', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/3403100?hl=pl', nazwa: 'Profil Firmy w Google – Pomoc: Zarządzanie właścicielami i menedżerami profilu firmy', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/13965727', nazwa: 'Google Analytics Help: Conversions vs. key events', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-11' },
];

const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO?', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7687615', nazwa: 'Search Console Help: Managing owners, users, and permissions', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/9305587', nazwa: 'Analytics Help: Access and data-restriction management', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/3403100', nazwa: 'Google Business Profile Help: Manage your Business Profile owners & managers', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/13965727', nazwa: 'Google Analytics Help: Conversions vs. key events', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-11' },
];

export default {
  slug: 'zapytanie-ofertowe-seo',
  sciezkaEn: '/tools/seo-rfp-template',
  plik: 'zapytanie-ofertowe-seo',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'zapytanie ofertowe', en: 'seo rfp' },
  frazyDodatkowe: {
    pl: ['zapytanie ofertowe wzór', 'jak napisać zapytanie ofertowe', 'zapytanie ofertowe przykład', 'przykładowe zapytanie ofertowe', 'zapytanie ofertowe wzór pdf', 'zapytanie ofertowe strona internetowa'],
    en: ['seo request for proposal', 'seo rfp template', 'how to write an rfp'],
  },
  seo: {
    pl: {
      tytul: 'Zapytanie ofertowe na SEO: wzór do wysłania agencjom (PDF)',
      opis: 'Zapytanie ofertowe na pozycjonowanie: co wpisać, jak je napisać krok po kroku i jak porównać oferty agencji SEO. Przykład i darmowy wzór w PDF.',
    },
    en: {
      tytul: 'SEO RFP Template: How to Write an RFP for SEO Services (PDF)',
      opis: 'Free SEO RFP template (PDF): what to include in an SEO request for proposal, how to write it step by step, an example and a scoring sheet for proposals.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Zapytanie ofertowe na SEO',
    tag: 'Wzór PDF do pobrania',
    h1: 'Zapytanie ofertowe na SEO: wzór i przykład do wysłania agencjom',
    lead: 'Zapytanie ofertowe na SEO to dokument, który wysyłasz kilku agencjom, żeby dostać porównywalne oferty na ten sam zakres prac. Opisuje firmę, cel, stan strony, zakres, warunki współpracy i termin odpowiedzi. Nasz wzór w PDF ma gotowe pola, 12 pytań do agencji i tabelę do oceny ofert.',
    karta: {
      nazwa: 'Zapytanie ofertowe na SEO (PDF)',
      opis: 'Wzór zapytania ofertowego do agencji SEO: cel, stan wyjściowy, zakres prac, warunki współpracy, 12 pytań i tabela oceny ofert.',
      cta: 'Pobierz wzór',
    },
    sekcje: [
      {
        id: 'czym-jest-zapytanie-ofertowe',
        h2: 'Czym jest zapytanie ofertowe na SEO i kiedy je wysłać',
        html: `<p>Zapytanie ofertowe to prośba o przygotowanie oferty na warunkach, które opisujesz z góry. Przy wyborze agencji SEO pełni dwie role. Daje wszystkim agencjom te same informacje, więc ich oferty da się porównać. I zmusza firmę, żeby przed rozmowami sama ustaliła, czego oczekuje: jaki ma cel, ile może wydać i co chce zatrzymać po swojej stronie.</p>
<p>Bez zapytania każda agencja dopytuje o coś innego i wycenia coś innego. Jedna proponuje listę fraz i dwa teksty miesięcznie, druga audyt i rozliczenie za efekt, trzecia pakiet z kampanią Google Ads. Porównujesz wtedy trzy różne usługi, a nie trzy ceny tej samej usługi.</p>
<p>Zapytanie ofertowe warto wysłać, gdy wybierasz agencję pierwszy raz, zmieniasz obecną, wchodzisz na nowy rynek albo chcesz dodać do SEO widoczność w AI. Także przed nową stroną lub jej przebudową: Google pisze, że to dobry moment na zatrudnienie specjalisty SEO, i to im wcześniej, tym lepiej. Przy małym, jednorazowym zleceniu, np. samym audycie, wystarczy krótki e-mail z adresem strony i celem.</p>
<p><strong>Ważne:</strong> wzór jest przeznaczony dla firm, które same wybierają wykonawcę. To nie jest dokument w trybie zamówień publicznych ani wzór do projektów z dotacji, gdzie obowiązują osobne zasady i dokumenty. Nie jest też poradą prawną.</p>`,
        tabela: {
          id: 'tabela-dokumenty-wyboru-agencji',
          caption: 'Zapytanie ofertowe, brief, oferta i umowa: czym się różnią',
          columns: [
            { key: 'dokument', label: 'Dokument' },
            { key: 'kto', label: 'Kto przygotowuje' },
            { key: 'pytanie', label: 'Na jakie pytanie odpowiada' },
            { key: 'kiedy', label: 'Kiedy' },
          ],
          rows: [
            { dokument: 'Zapytanie ofertowe', kto: 'Firma', pytanie: 'Czego potrzebujemy i na jakich warunkach chcemy dostać ofertę', kiedy: 'Przed rozmowami z agencjami' },
            { dokument: 'Brief', kto: 'Firma, często razem z wykonawcą', pytanie: 'Jakie szczegóły są potrzebne do wykonania konkretnego projektu, np. nowej strony albo tekstu', kiedy: 'Przy zleceniu projektu' },
            { dokument: 'Oferta', kto: 'Agencja', pytanie: 'Co zrobi, w jakiej kolejności, za ile i jak zmierzy efekt', kiedy: 'W terminie podanym w zapytaniu' },
            { dokument: 'Umowa', kto: 'Obie strony', pytanie: 'Zakres, wynagrodzenie, okres wypowiedzenia, własność kont, treści i linków', kiedy: 'Po wyborze oferty' },
          ],
        },
        htmlPo: `<p>Jeśli zamawiasz nową stronę internetową, a nie samo pozycjonowanie, zamiast zapytania ofertowego na SEO użyj <a href="/narzedzia/brief-strony-internetowej">briefu strony internetowej</a>. Ma osobną część SEO i pytania o przekierowania starych adresów.</p>`,
      },
      {
        id: 'co-zawiera-zapytanie-ofertowe',
        h2: 'Co powinno zawierać zapytanie ofertowe na pozycjonowanie: 10 części',
        html: `<p>Wzór ma dziesięć części. Pierwsze pięć opisuje Twoją firmę i potrzeby. Kolejne pięć mówi agencji, na jakich warunkach chcesz współpracować i w jakiej formie ma odpowiedzieć. Google radzi sprawdzić, czy specjalista SEO pyta o to, co wyróżnia firmę, kim są jej konkurenci, jak wyniki wyszukiwania mogą jej pomóc i jak znajdują ją klienci. Dobre zapytanie ofertowe odpowiada na te pytania z góry.</p>`,
        tabela: {
          id: 'tabela-czesci-zapytania',
          caption: '10 części wzoru zapytania ofertowego na SEO',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'co', label: 'Co wpisać' },
            { key: 'po', label: 'Po co agencji ta informacja' },
          ],
          rows: [
            { czesc: '1. Firma i kontakt', co: 'Nazwa, adres strony, branża, obsługiwany obszar, osoba kontaktowa i osoba, która podejmuje decyzję', po: 'Wie, z kim rozmawia i kto wybiera' },
            { czesc: '2. Cel współpracy', co: 'Cel biznesowy na 12 miesięcy i to, jak go dziś mierzysz: zapytania od klientów, sprzedaż, rejestracje', po: 'Dobiera zakres do celu, a nie do pakietu' },
            { czesc: '3. Stan wyjściowy', co: 'System strony, liczba podstron, wersje językowe, dane z Search Console i GA4, wizytówka Google, dotychczasowe SEO, migracje i spadki', po: 'Ocenia, ile pracy wymaga start' },
            { czesc: '4. Rynek i konkurencja', co: 'Obszar, najważniejsze usługi lub kategorie, 3–5 konkurentów, wyróżniki firmy, skąd dziś przychodzą klienci', po: 'Sprawdza frazy i konkurencję przed wyceną' },
            { czesc: '5. Zakres prac', co: 'Obszary do wyceny w trzech kolumnach: w ofercie, opcjonalnie, poza zakresem', po: 'Wycenia to samo co inne agencje' },
            { czesc: '6. Zasoby po stronie firmy', co: 'Kto akceptuje zmiany, czy jest programista, kto dostarcza treści, czas reakcji', po: 'Planuje tempo i to, co zrobi sama' },
            { czesc: '7. Wymagania wobec współpracy', co: 'Konta Google na firmie, prawa do treści, linki zostają, okres wypowiedzenia, raport z Twoich danych', po: 'Zna warunki przed rozmową, a nie przy umowie' },
            { czesc: '8. Pytania do agencji', co: '10–12 pytań, na które agencja odpowiada na piśmie w ofercie', po: 'Daje odpowiedzi, które da się zestawić' },
            { czesc: '9. Forma oferty i wyceny', co: 'Cena netto miesięcznie, koszty jednorazowe, co obejmuje cena, model rozliczenia, plan pierwszych 3 miesięcy', po: 'Oferty mają ten sam układ' },
            { czesc: '10. Terminy i zasady wyboru', co: 'Termin pytań i ofert, rozmowy, data decyzji, kryteria oceny, poufność, brak zobowiązania do umowy', po: 'Wie, jak i kiedy wybierasz' },
          ],
        },
        htmlPo: `<p>Całość mieści się na trzech, czterech stronach. Dłuższe zapytanie rzadko daje lepsze oferty, za to wydłuża czas odpowiedzi. Szczegóły, np. pełną listę podstron albo eksport zapytań z Search Console, dołącz jako załącznik albo pokaż na rozmowie.</p>`,
      },
      {
        id: 'jak-napisac-zapytanie-ofertowe',
        h2: 'Jak napisać zapytanie ofertowe na SEO: 7 kroków',
        html: `<ol>
<li><strong>Ustal cel i budżet w firmie.</strong> Zanim napiszesz do agencji, uzgodnij wewnętrznie, co ma się zmienić w ciągu 12 miesięcy i ile możesz wydawać miesięcznie. Bez tego zapytanie będzie zbyt ogólne, a oferty – przypadkowe.</li>
<li><strong>Zbierz dane o stanie wyjściowym.</strong> Kliknięcia z Search Console i zapytania od klientów z GA4 za ostatnie 12 miesięcy, lista najważniejszych podstron, daty migracji i zmian strony, informacja o poprzednich agencjach. Szybki obraz techniki da <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a> z oceną 1–100.</li>
<li><strong>Opisz zakres prac.</strong> Dla każdego obszaru zaznacz, czy ma być w ofercie, czy opcjonalnie, czy jest poza zakresem.</li>
<li><strong>Wpisz warunki współpracy.</strong> Konta, prawa do treści, linki, okres wypowiedzenia i to, z jakich danych ma powstawać raport.</li>
<li><strong>Wybierz pytania do agencji.</strong> 10–12 pytań, na które chcesz dostać odpowiedź na piśmie, a nie tylko na rozmowie.</li>
<li><strong>Ustal formę oferty, terminy i kryteria.</strong> Jak ma wyglądać wycena, do kiedy czekasz na pytania i oferty, kiedy rozmowy i decyzja, według jakich kryteriów i wag wybierzesz.</li>
<li><strong>Wyślij to samo zapytanie 3–5 agencjom.</strong> Odpowiadaj na pytania wszystkim naraz, żeby każda agencja miała te same informacje.</li>
</ol>
<p>Na przygotowanie oferty daj agencjom co najmniej 7–10 dni roboczych. Rzetelna oferta wymaga przejrzenia strony, fraz i konkurencji, a to trwa dłużej niż wypełnienie cennika. Podaj też wcześniejszy termin na pytania – zwykle kilka dni po wysłaniu – i datę decyzji, żeby agencje wiedziały, kiedy się odezwiesz.</p>`,
      },
      {
        id: 'cel-stan-zakres',
        h2: 'Cel, stan wyjściowy i zakres: jak je opisać, żeby dostać konkretne oferty',
        html: `<h3>Cel: zapytania od klientów, nie „pierwsze miejsce”</h3>
<p>Napisz, jaki wynik biznesowy ma dać SEO i jak go dziś mierzysz. Zdanie „więcej zapytań od klientów o remont łazienki w Warszawie z wyników organicznych, dziś ok. … miesięcznie według GA4” mówi agencji więcej niż „chcemy być wysoko w Google”. Jeśli zapytań od klientów nie mierzysz, napisz to wprost. Ustawienie pomiaru w GA4 jako zdarzeń kluczowych będzie wtedy pierwszym zadaniem w każdej ofercie.</p>
<p>Nie proś o gwarancję pozycji. Google pisze, że nikt nie może zagwarantować pierwszego miejsca w rankingu, i radzi uważać na specjalistów, którzy to obiecują. Zamiast tego zapytaj, jakich wyników agencja się spodziewa, w jakim czasie i jak zmierzy postęp. To jedno z pytań, które Google wymienia w poradniku o wyborze specjalisty SEO.</p>
<h3>Stan wyjściowy: co udostępnić przed wyceną</h3>
<p>Im więcej agencja wie na starcie, tym mniej ogólników w ofercie. Opisz system strony (np. WordPress, Shopify, własny), liczbę podstron, wersje językowe, ostatnie migracje i spadki ruchu oraz to, czym zajmowała się poprzednia agencja. Dopisz, kto ma dostęp do kont i czy dane są kompletne. Brak danych to też informacja – wpisz „brak” zamiast zgadywać.</p>
<p>Jeśli chcesz, żeby agencje zajrzały do Search Console przed ofertą, dodaj je jako użytkowników z ograniczonym dostępem. Google radzi, żeby na etapie audytu dawać specjaliście SEO dostęp tylko do odczytu, bez prawa zapisu. Użytkownik z ograniczonym dostępem może przeglądać większość danych, ale nie zarządza usługą. W GA4 odpowiednikiem jest rola Przeglądający. Po wyborze oferty usuń dostęp agencjom, które odpadły.</p>
<h3>Zakres prac: trzy kolumny zamiast listy życzeń</h3>
<p>Typowe obszary to audyt i poprawki techniczne, strony usług lub kategorii, nowe treści, linki, SEO lokalne i wizytówka Google, widoczność w AI, pomiar i raportowanie oraz wsparcie przy migracji. Dla każdego zaznacz: w ofercie, opcjonalnie albo poza zakresem. Przy treściach i linkach poproś o liczbę miesięcznie i opis, co się za nią kryje. Inaczej jedna agencja wyceni rozbudowane poradniki, a druga krótkie wpisy, i obie napiszą „2 treści miesięcznie”.</p>
<p>Widoczność w AI wpisz jako część zakresu SEO, a nie osobny projekt. Według Google strona nie musi spełniać dodatkowych wymagań, żeby pojawić się w przeglądach AI – wystarczą podstawowe praktyki SEO. Google radzi też sprawdzić, czy porady agencji w zakresie usług „AEO” i „GEO” są zgodne z jego oficjalnymi wskazówkami. Zapytaj więc, jak agencja mierzy obecność firmy w odpowiedziach ChatGPT i w przeglądzie AI: ile pytań, w których narzędziach i jak często. Jak wygląda taki pomiar u nas, opisujemy przy <a href="/pozycjonowanie-w-ai/audyt-widocznosci">audycie widoczności w AI</a>.</p>`,
      },
      {
        id: 'warunki-i-pytania',
        h2: 'Warunki współpracy i pytania do agencji SEO',
        html: `<p>Warunki wpisane w zapytaniu ofertowym oszczędzają czas obu stronom. Agencja, która ich nie akceptuje, powie to przed rozmową, a nie przy podpisywaniu umowy. Najważniejsze z nich:</p>
<ul>
<li><strong>Konta na firmie.</strong> Search Console, GA4, Menedżer tagów, wizytówka Google i konto reklamowe należą do Ciebie, a agencja dostaje uprawnienia. W Search Console właściciel ma pełną kontrolę nad usługą i nadaje uprawnienia innym. W GA4 użytkownikami zarządza rola Administrator. W wizytówce zostań głównym właścicielem, a agencję dodaj jako menedżera: menedżer edytuje profil, ale nie może dodawać ani usuwać użytkowników.</li>
<li><strong>Prawa do treści.</strong> Teksty, zdjęcia i grafiki przygotowane w ramach współpracy przechodzą na Ciebie, a umowa wymienia pola eksploatacji.</li>
<li><strong>Linki zostają.</strong> Odnośniki zdobyte w trakcie współpracy nie znikają po jej zakończeniu, a ich lista jest częścią raportu. Agencja nie kupuje linków: Google zalicza kupowanie i sprzedawanie linków wpływających na pozycje do spamu.</li>
<li><strong>Okres wypowiedzenia.</strong> Wpisz, jakiego oczekujesz, np. miesięcznego, i czy akceptujesz automatyczne przedłużenie umowy.</li>
<li><strong>Raport z Twoich danych.</strong> Co miesiąc: co zrobiono, jak zmieniły się zapytania od klientów i kliknięcia w Twojej Search Console i GA4 oraz co dalej. Pozycje fraz obok tych danych, a nie zamiast nich.</li>
<li><strong>Zmiany na stronie po akceptacji.</strong> Lista zmian przed wdrożeniem i dziennik prac. Google przypomina, że za działania wynajętej firmy odpowiada właściciel strony.</li>
</ul>
<p>Co sprawdzić w umowie i jak odzyskać konta oraz dane od poprzedniego wykonawcy, opisujemy w poradniku o <a href="/zmiana-agencji-seo">zmianie agencji SEO</a>. Wzór nie jest poradą prawną: przy umowie na dużą kwotę pokaż ją prawnikowi.</p>
<h3>Pytania, na które agencja odpowiada na piśmie</h3>
<p>Część pytań pochodzi z poradnika Google o wyborze specjalisty SEO, część z naszego zestawienia <a href="/porownania/jak-wybrac-agencje-seo">12 pytań przed podpisaniem umowy z agencją SEO</a>. Wybierz 10–12 i poproś o odpowiedzi w ofercie, a nie dopiero na rozmowie:</p>
<ol>
<li>Jakich wyników spodziewacie się w naszym przypadku, w jakim czasie i jak je zmierzycie?</li>
<li>Co zrobicie w pierwszych trzech miesiącach i w jakiej kolejności?</li>
<li>Kto konkretnie będzie pracował nad naszą stroną i jak będziemy się kontaktować?</li>
<li>Czy pokażecie przykładowy raport albo demo panelu?</li>
<li>Jakie macie doświadczenie w naszej branży i na naszym rynku (miasto, kraj, języki)?</li>
<li>Czy stosujecie się do podstawowych zasad wyszukiwarki Google i skąd zdobywacie linki?</li>
<li>Czy będziemy akceptować zmiany na stronie przed wdrożeniem i czy dostaniemy listę wszystkich zmian?</li>
<li>Jak mierzycie widoczność w ChatGPT i w przeglądzie AI w Google?</li>
<li>Co dokładnie obejmuje cena: ile fraz, treści, linków lub godzin miesięcznie?</li>
<li>Na jak długo jest umowa, jaki jest okres wypowiedzenia i czy są opłaty przy wyjściu?</li>
<li>Co się stanie, jeśli po trzech miesiącach nie będzie postępu?</li>
<li>Czy możemy porozmawiać z obecnym albo byłym klientem?</li>
</ol>`,
      },
      {
        id: 'przykladowe-zapytanie-ofertowe',
        h2: 'Przykładowe zapytanie ofertowe na SEO: wypełniony fragment i e-mail',
        html: `<p>Poniżej fragment wzoru wypełniony dla fikcyjnej firmy remontowej z Warszawy. Liczby są przykładowe – wpisz własne z Search Console i GA4.</p>`,
        tabela: {
          id: 'tabela-przyklad-zapytania',
          caption: 'Przykład zapytania ofertowego na SEO (firma fikcyjna, liczby przykładowe)',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'wpis', label: 'Przykładowy wpis' },
          ],
          rows: [
            { czesc: 'Firma i kontakt', wpis: 'Firma remontowa, Warszawa i okolice, 12 osób. Kontakt: kierowniczka marketingu. Decyzję podejmuje właściciel.' },
            { czesc: 'Cel', wpis: 'Więcej zleceń na remonty łazienek i kuchni. Dziś ok. 8 zapytań od klientów miesięcznie z wyników organicznych (GA4: formularz i kliknięcia w numer telefonu). Prosimy o propozycję realnego celu na 12 miesięcy.' },
            { czesc: 'Stan wyjściowy', wpis: 'WordPress, ok. 40 podstron, tylko wersja polska. Ok. 300 kliknięć miesięcznie z fraz bez nazwy firmy (Search Console). Wizytówka Google: 46 opinii. W 2025 r. zmiana wyglądu strony bez mapy przekierowań, potem spadek ruchu.' },
            { czesc: 'Rynek i konkurencja', wpis: 'Warszawa i powiat piaseczyński. Priorytety: remont łazienki, remont kuchni, wykończenie mieszkań. Trzech konkurentów, których widzimy nad sobą w Mapach i w wynikach.' },
            { czesc: 'Zakres', wpis: 'W ofercie: audyt techniczny i naprawa przekierowań, strony usług, SEO lokalne, pomiar, raport. Opcjonalnie: treści poradnikowe, widoczność w AI. Poza zakresem: Google Ads, media społecznościowe.' },
            { czesc: 'Zasoby', wpis: 'Programista zewnętrzny, 4 godziny miesięcznie. Akceptacja treści: kierowniczka marketingu, do 5 dni roboczych.' },
            { czesc: 'Wymagania', wpis: 'Konta Google na firmie, treści i linki zostają u nas, wypowiedzenie miesięczne, raport z naszej Search Console i GA4.' },
            { czesc: 'Forma oferty', wpis: 'Cena netto miesięcznie, koszty jednorazowe osobno, plan pierwszych 3 miesięcy, odpowiedzi na 12 pytań. Do 4 stron A4 plus przykładowy raport.' },
            { czesc: 'Terminy', wpis: 'Pytania: do 5 dni od wysłania. Oferty: 10 dni roboczych od wysłania. Rozmowy z 2–3 agencjami w kolejnym tygodniu. Decyzja: do 4 tygodni od wysłania.' },
          ],
        },
        htmlPo: `<h3>Przykładowy e-mail z zapytaniem ofertowym</h3>
<p><em>Temat: Zapytanie ofertowe – pozycjonowanie strony [adres strony]</em></p>
<p>Dzień dobry, szukamy agencji, która od [miesiąc] poprowadzi pozycjonowanie naszej strony [adres]. W załączniku przesyłam zapytanie ofertowe z opisem firmy, celu, stanu strony i zakresu prac. To samo zapytanie wysyłamy do kilku agencji. Pytania prosimy kierować na ten adres do [data], a ofertę przesłać do [data]. Wybrane agencje zaprosimy na rozmowę w tygodniu od [data]. Zapytanie nie zobowiązuje nas do zawarcia umowy. Pozdrawiam, [imię i nazwisko, stanowisko, telefon]</p>
<p>Krótki e-mail i szczegóły w załączniku działają lepiej niż długa wiadomość: agencja przekaże PDF specjaliście, który przygotuje ofertę, a Ty masz pewność, że każdy dostał to samo.</p>`,
      },
      {
        id: 'jak-porownac-oferty',
        h2: 'Jak porównać oferty agencji SEO: kryteria, wagi i skala ocen',
        html: `<p>Gdy oferty przyjdą, oceń je w jednej tabeli. Każde kryterium ma wagę, a każda oferta dostaje za nie 0, 1 albo 2 punkty: 0 – brak odpowiedzi albo ogólnik, 1 – odpowiedź częściowa, 2 – konkretna odpowiedź z dowodem (raport, przykład, zapis w umowie). Wynik oferty to suma iloczynów wagi i oceny. Wagi poniżej to nasza propozycja. Zmień je, jeśli dla Twojej firmy coś jest ważniejsze, ale zrób to przed otwarciem ofert, a nie po.</p>`,
        tabela: {
          id: 'tabela-kryteria-ofert',
          caption: 'Kryteria oceny ofert SEO: waga, co sprawdzić i czerwona flaga',
          columns: [
            { key: 'kryterium', label: 'Kryterium' },
            { key: 'waga', label: 'Waga' },
            { key: 'co', label: 'Co sprawdzić w ofercie' },
            { key: 'flaga', label: 'Czerwona flaga' },
          ],
          rows: [
            { kryterium: 'Zrozumienie celu i plan na 3 miesiące', waga: '25%', co: 'Oferta odnosi się do Twojego celu i stanu wyjściowego, a plan ma kolejność i uzasadnienie', flaga: 'Ten sam pakiet dla każdego, bez słowa o Twojej stronie' },
            { kryterium: 'Zakres i to, co obejmuje cena', waga: '20%', co: 'Liczba fraz, treści, linków lub godzin miesięcznie, koszty jednorazowe, co jest poza zakresem', flaga: '„Kompleksowa obsługa” bez liczb' },
            { kryterium: 'Pomiar i raportowanie', waga: '15%', co: 'Raport z Twojej Search Console i GA4, zapytania od klientów obok pozycji, przykładowy raport', flaga: 'Sama lista pozycji z narzędzia agencji' },
            { kryterium: 'Warunki umowy i własność', waga: '15%', co: 'Konta na firmie, prawa do treści, linki zostają, okres wypowiedzenia', flaga: 'Długa umowa z automatycznym przedłużeniem, linki „wynajmowane”' },
            { kryterium: 'Zespół, doświadczenie, referencje', waga: '15%', co: 'Imienny specjalista, doświadczenie w branży i na rynku, kontakt do klienta', flaga: 'Brak osoby prowadzącej i referencji' },
            { kryterium: 'Widoczność w AI i zgodność z zasadami Google', waga: '10%', co: 'Metoda pomiaru w AI, powoływanie się na dokumentację Google, linki bez kupowania', flaga: 'Gwarancja TOP 1 albo „poleceń w ChatGPT” bez metody pomiaru' },
          ],
          przypis: 'Wagi i skala 0–2 to propozycja AI SEO COMPANY, a nie standard branżowy. Pytania o wyniki, doświadczenie, referencje, zmiany na stronie i gwarancje pozycji opierają się na poradniku Google „Czy potrzebujesz specjalisty SEO?” (odczyt 11.11.2026).',
        },
        htmlPo: `<h3>Jak porównać ceny ofert SEO</h3>
<p>Sprowadź każdą ofertę do kosztu 12 miesięcy: kwota miesięczna razy 12 plus koszty jednorazowe, np. audyt, wdrożenie czy opłata startowa. Dopiero wtedy porównuj. Przy rozliczeniu za efekt policz, ile zapłacisz, jeśli frazy z umowy wejdą do TOP 10, i sprawdź, czy klienci w ogóle ich szukają. Różnice między modelami opisujemy w porównaniu <a href="/porownania/pozycjonowanie-za-efekt-czy-abonament">pozycjonowanie za efekt czy abonament</a>.</p>
<p>Nie wybieraj automatycznie najtańszej oferty. Gdy różnica w cenie jest duża, zwykle różni się zakres: liczba treści, linków albo godzin pracy. Dopytaj o to na rozmowie i zapisz odpowiedź obok oceny. Ceny naszych pakietów i warunki umowy znajdziesz w <a href="/cennik-pozycjonowania">cenniku pozycjonowania</a>.</p>`,
      },
      {
        id: 'najczestsze-bledy',
        h2: 'Najczęstsze błędy w zapytaniach ofertowych na SEO',
        html: `<ul>
<li><strong>Brak celu.</strong> „Prosimy o wycenę pozycjonowania” bez informacji, co ma się zmienić i jak to mierzysz.</li>
<li><strong>Długa lista fraz zamiast celu.</strong> Agencja wyceni frazy, ale nie wiesz, czy przyniosą klientów. Lepiej opisać usługi i pytania klientów, a dobór fraz zostawić agencji do uzasadnienia w ofercie.</li>
<li><strong>Kopia wzoru z zamówień publicznych.</strong> Formularze i oświadczenia z przetargów nic nie mówią o SEO, a zniechęcają mniejsze agencje do odpowiedzi.</li>
<li><strong>Różne informacje dla różnych agencji.</strong> Odpowiedź udzielona tylko jednej agencji sprawia, że oferty przestają być porównywalne.</li>
<li><strong>Za krótki termin.</strong> Dwa dni na ofertę to zaproszenie do wysłania standardowego pakietu.</li>
<li><strong>Prośba o gwarancję TOP 1.</strong> Uczciwa agencja jej nie da, więc premiujesz tych, którzy obiecują więcej, niż mogą.</li>
<li><strong>Wysyłka do kilkunastu agencji.</strong> Nie przeczytasz rzetelnie tylu ofert i nie porozmawiasz z każdą. Lepiej 3–5 sprawdzonych firm.</li>
<li><strong>Pominięte warunki współpracy.</strong> Sprawa kont, treści i linków wychodzi na jaw dopiero przy umowie albo przy zmianie agencji.</li>
<li><strong>Brak informacji o budżecie.</strong> Jeśli masz górny limit, podaj go albo widełki. Agencje dopasują zakres, zamiast zgadywać.</li>
</ul>
<p>Jeśli najpierw chcesz wiedzieć, jaki zakres prac jest w ogóle potrzebny, zacznij od <a href="/audyt-seo">audytu SEO</a> albo rozpisz cele w <a href="/narzedzia/szablon-strategii-seo">szablonie strategii SEO</a>. Strategia daje gotowe odpowiedzi do części 2–5 zapytania ofertowego.</p>`,
      },
    ],
    podglad: {
      h2: 'Zapytanie ofertowe na SEO – wzór do wypełnienia (podgląd)',
      opis: 'Poniżej pełna treść wzoru. Możesz przepisać ją do własnego dokumentu albo pobrać PDF z polami do wypełnienia i tabelą oceny ofert.',
      html: `<h3>Część 1. Firma i kontakt</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Nazwa firmy i adres strony</td><td>…</td></tr>
<tr><td>Branża i główne usługi lub produkty</td><td>…</td></tr>
<tr><td>Wielkość firmy i obsługiwany obszar</td><td>…</td></tr>
<tr><td>Osoba kontaktowa (imię i nazwisko, stanowisko, e-mail, telefon)</td><td>…</td></tr>
<tr><td>Kto podejmuje decyzję o wyborze agencji</td><td>…</td></tr>
</tbody></table>
<h3>Część 2. Cel współpracy</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Cel biznesowy na 12 miesięcy (jedno zdanie)</td><td>…</td></tr>
<tr><td>Jak go dziś mierzymy (GA4, CRM, telefony)</td><td>…</td></tr>
<tr><td>Wartość dziś (np. zapytania od klientów z wyników organicznych miesięcznie)</td><td>…</td></tr>
<tr><td>Wartość docelowa albo „prosimy o propozycję”</td><td>…</td></tr>
<tr><td>Co będzie dla nas sukcesem po 3 miesiącach</td><td>…</td></tr>
</tbody></table>
<h3>Część 3. Stan wyjściowy</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>System strony (CMS), liczba podstron, wersje językowe</td><td>…</td></tr>
<tr><td>Kliknięcia z fraz bez nazwy firmy, ostatnie 12 miesięcy (Search Console)</td><td>…</td></tr>
<tr><td>Zapytania od klientów z wyników organicznych miesięcznie (GA4)</td><td>…</td></tr>
<tr><td>Wizytówka Google: kategoria główna, liczba opinii</td><td>…</td></tr>
<tr><td>Migracje, zmiany strony, spadki ruchu (z datami)</td><td>…</td></tr>
<tr><td>Dotychczasowe SEO: kto, jak długo, co robił</td><td>…</td></tr>
<tr><td>Dostęp dla agencji przed ofertą</td><td>☐ Search Console (ograniczony dostęp) ☐ GA4 (rola Przeglądający) ☐ bez dostępu</td></tr>
</tbody></table>
<h3>Część 4. Rynek i konkurencja</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Obszar działania: miasta, kraje, języki</td><td>…</td></tr>
<tr><td>Usługi lub kategorie w kolejności ważności</td><td>1. … 2. … 3. …</td></tr>
<tr><td>3–5 konkurentów z wyników Google i Map</td><td>…</td></tr>
<tr><td>Co wyróżnia naszą firmę</td><td>…</td></tr>
<tr><td>Jak dziś znajdują nas klienci</td><td>…</td></tr>
</tbody></table>
<h3>Część 5. Zakres prac do wyceny</h3>
<table><thead><tr><th>Obszar</th><th>W ofercie</th><th>Opcjonalnie</th><th>Poza zakresem</th></tr></thead><tbody>
<tr><td>Audyt SEO i plan naprawczy</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Poprawki techniczne (wdrożenie albo zalecenia dla programisty)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Strony usług lub kategorii</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Nowe treści (liczba miesięcznie: …)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Linki (liczba miesięcznie i rodzaj źródeł: …)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>SEO lokalne i wizytówka Google</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Widoczność w AI (ChatGPT, przegląd AI w Google)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Pomiar: zdarzenia kluczowe w GA4</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Raport miesięczny i spotkanie</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Wsparcie przy migracji albo nowej stronie</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Inne: …</td><td>☐</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Część 6. Zasoby po stronie firmy</h3>
<table><thead><tr><th>Pole</th><th>Do wpisania</th></tr></thead><tbody>
<tr><td>Kto akceptuje zmiany i treści, w jakim czasie</td><td>…</td></tr>
<tr><td>Programista: wewnętrzny, zewnętrzny albo brak; godziny miesięcznie</td><td>…</td></tr>
<tr><td>Kto pisze lub dostarcza treści i zdjęcia</td><td>…</td></tr>
<tr><td>Dostęp agencji do panelu strony i hostingu</td><td>☐ tak ☐ po akceptacji zmian ☐ nie</td></tr>
</tbody></table>
<h3>Część 7. Wymagania wobec współpracy</h3>
<ul>
<li>☐ Search Console, GA4, Menedżer tagów, wizytówka Google i konto reklamowe na firmie; agencja dostaje uprawnienia.</li>
<li>☐ Prawa autorskie do treści, zdjęć i grafik przechodzą na firmę (pola eksploatacji w umowie).</li>
<li>☐ Linki zdobyte w trakcie współpracy zostają po jej zakończeniu; lista linków w raporcie.</li>
<li>☐ Bez kupowania linków i innych praktyk niezgodnych z zasadami Google.</li>
<li>☐ Zmiany na stronie po naszej akceptacji; dziennik zmian.</li>
<li>☐ Raport co miesiąc z danych z naszej Search Console i GA4.</li>
<li>Oczekiwany okres wypowiedzenia: …</li>
<li>Inne wymagania: …</li>
</ul>
<h3>Część 8. Pytania do agencji (odpowiedzi w ofercie)</h3>
<ol>
<li>Jakich wyników spodziewacie się w naszym przypadku, w jakim czasie i jak je zmierzycie?</li>
<li>Co zrobicie w pierwszych trzech miesiącach i w jakiej kolejności?</li>
<li>Kto konkretnie będzie pracował nad naszą stroną i jak będziemy się kontaktować?</li>
<li>Czy pokażecie przykładowy raport albo demo panelu?</li>
<li>Jakie macie doświadczenie w naszej branży i na naszym rynku?</li>
<li>Czy stosujecie się do podstawowych zasad wyszukiwarki Google i skąd zdobywacie linki?</li>
<li>Czy będziemy akceptować zmiany przed wdrożeniem i czy dostaniemy listę wszystkich zmian?</li>
<li>Jak mierzycie widoczność w ChatGPT i w przeglądzie AI w Google?</li>
<li>Co dokładnie obejmuje cena: ile fraz, treści, linków lub godzin miesięcznie?</li>
<li>Na jak długo jest umowa, jaki jest okres wypowiedzenia i czy są opłaty przy wyjściu?</li>
<li>Co się stanie, jeśli po trzech miesiącach nie będzie postępu?</li>
<li>Czy możemy porozmawiać z obecnym albo byłym klientem?</li>
</ol>
<h3>Część 9. Forma oferty i wyceny (wypełnia agencja)</h3>
<table><thead><tr><th>Pole</th><th>Odpowiedź agencji</th></tr></thead><tbody>
<tr><td>Cena netto miesięcznie</td><td>…</td></tr>
<tr><td>Koszty jednorazowe (audyt, wdrożenie, opłata startowa)</td><td>…</td></tr>
<tr><td>Co obejmuje cena: frazy, treści, linki, godziny miesięcznie</td><td>…</td></tr>
<tr><td>Model rozliczenia: abonament, za efekt, mieszany</td><td>…</td></tr>
<tr><td>Okres umowy i okres wypowiedzenia</td><td>…</td></tr>
<tr><td>Plan pierwszych 3 miesięcy</td><td>…</td></tr>
<tr><td>Osoba prowadząca i sposób kontaktu</td><td>…</td></tr>
<tr><td>Przykładowy raport albo demo panelu</td><td>☐ załączony ☐ link: …</td></tr>
</tbody></table>
<p>Forma: PDF, do … stron A4, oferta ważna co najmniej … dni.</p>
<h3>Część 10. Terminy i zasady wyboru</h3>
<table><thead><tr><th>Etap</th><th>Termin</th></tr></thead><tbody>
<tr><td>Pytania od agencji</td><td>do …</td></tr>
<tr><td>Odpowiedzi dla wszystkich agencji</td><td>do …</td></tr>
<tr><td>Termin złożenia ofert</td><td>do …</td></tr>
<tr><td>Rozmowy z wybranymi agencjami</td><td>…</td></tr>
<tr><td>Decyzja i informacja dla wszystkich agencji</td><td>do …</td></tr>
</tbody></table>
<p>Kryteria oceny (waga): zrozumienie celu i plan na 3 miesiące …%, zakres i to, co obejmuje cena …%, pomiar i raportowanie …%, warunki umowy i własność …%, zespół, doświadczenie i referencje …%, widoczność w AI i zgodność z zasadami Google …%.</p>
<p>Zastrzeżenia: zapytanie nie zobowiązuje firmy do wyboru żadnej oferty ani do zawarcia umowy i nie jest przetargiem. Informacje z zapytania są poufne i służą tylko do przygotowania oferty. To samo zapytanie otrzymuje kilka agencji.</p>
<h3>Załącznik. Tabela oceny ofert (skala 0–2)</h3>
<table><thead><tr><th>Kryterium</th><th>Waga</th><th>Agencja A</th><th>Agencja B</th><th>Agencja C</th></tr></thead><tbody>
<tr><td>Zrozumienie celu i plan na 3 miesiące</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Zakres i to, co obejmuje cena</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Pomiar i raportowanie</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Warunki umowy i własność</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Zespół, doświadczenie, referencje</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Widoczność w AI i zgodność z zasadami Google</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><strong>Wynik (suma: waga × ocena)</strong></td><td>100%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Koszt 12 miesięcy (12 × cena miesięczna + koszty jednorazowe)</td><td></td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Pobierz wzór zapytania ofertowego (PDF)',
      opis: 'Wyślemy PDF z 10 częściami zapytania ofertowego, 12 pytaniami do agencji i tabelą oceny ofert. Wypełnij go w edytorze PDF albo przepisz do własnego dokumentu i wyślij agencjom.',
      etykieta: 'Twój adres e-mail',
      przycisk: 'Wyślij wzór PDF',
      przedmiot: 'wzór zapytania ofertowego na SEO',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do wzoru zapytania ofertowego w PDF przyjdzie w ciągu minuty.',
    },
    faq: [
      {
        question: 'Czym różni się zapytanie ofertowe od briefu?',
        answer: 'Zapytanie ofertowe wysyłasz kilku agencjom przed wyborem wykonawcy. Opisuje cel, stan wyjściowy, zakres i warunki, na jakich chcesz dostać ofertę, i pozwala porównać odpowiedzi. Brief przygotowujesz zwykle już dla wybranego wykonawcy i opisuje szczegóły konkretnego projektu, np. nowej strony albo artykułu. Przy SEO zapytanie ofertowe wystarczy na etapie wyboru, a szczegóły dopracujecie po podpisaniu umowy.',
      },
      {
        question: 'Do ilu agencji wysłać zapytanie ofertowe na SEO?',
        answer: 'Najczęściej wystarczy 3–5 agencji. Mniej niż trzy oferty trudno porównać, a kilkunastu nie przeczytasz rzetelnie i nie porozmawiasz z każdą. Wybierz firmy, które wcześniej sprawdziłeś: opinie w Google i katalogach, widoczność ich własnej strony, jawny cennik. Wszystkim wyślij to samo zapytanie, a odpowiedzi na pytania przekazuj wszystkim naraz, żeby oferty pozostały porównywalne.',
      },
      {
        question: 'Czy w zapytaniu ofertowym podawać budżet?',
        answer: 'Warto podać przynajmniej widełki albo górny limit miesięczny. Bez tej informacji agencje zgadują: jedna zaproponuje minimalny pakiet, inna rozbudowany zakres, i oferty trudno zestawić. Budżet nie musi być ostateczny. Możesz poprosić o dwa warianty, podstawowy i rozszerzony, z opisem, co zmienia się między nimi. Ceny naszych pakietów znajdziesz w cenniku pozycjonowania.',
      },
      {
        question: 'Ile czasu dać agencjom na przygotowanie oferty?',
        answer: 'Zwykle 7–10 dni roboczych, a przy dużym serwisie albo sklepie około dwóch tygodni. Rzetelna oferta SEO wymaga przejrzenia strony, fraz i konkurencji, czasem też danych z Search Console. Krótszy termin zachęca do wysłania standardowego pakietu. Podaj też wcześniejszy termin na pytania od agencji i datę decyzji, żeby wszyscy wiedzieli, kiedy się odezwiesz.',
      },
      {
        question: 'Czy zapytanie ofertowe zobowiązuje do podpisania umowy?',
        answer: 'Zapytanie ofertowe służy do zebrania ofert, a nie do zawarcia umowy. Żeby nie było wątpliwości, dopisz w nim wprost, że nie zobowiązuje Cię do wyboru żadnej oferty ani do podpisania umowy i nie jest przetargiem. Umowę podpisujesz dopiero z wybraną agencją, po uzgodnieniu jej treści. To nie jest porada prawna: przy większym zleceniu pokaż dokumenty prawnikowi.',
      },
      {
        question: 'Czy ten wzór nadaje się do zamówień publicznych albo projektu z dotacji?',
        answer: 'Nie. Wzór jest przeznaczony dla firm, które same wybierają agencję SEO. Zamawiający publiczni i firmy rozliczające projekty z dofinansowaniem mogą podlegać osobnym zasadom wyboru wykonawcy i wymaganym przez nie dokumentom. Część merytoryczną wzoru – cel, stan wyjściowy, zakres prac i pytania do agencji – możesz jednak wykorzystać do opisu przedmiotu zamówienia w tamtych dokumentach.',
      },
    ],
    zrodla: ZRODLA_PL,
    powiazane: [
      { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'Jak wybrać agencję SEO', opis: '12 pytań przed podpisaniem umowy: dobre odpowiedzi i czerwone flagi' },
      { href: '/cennik-pozycjonowania', tekst: 'Cennik pozycjonowania', opis: 'nasze pakiety, zakres i warunki umowy do porównania z ofertami' },
      { href: '/porownania/pozycjonowanie-za-efekt-czy-abonament', tekst: 'Pozycjonowanie za efekt czy abonament', opis: 'jak porównać oferty w różnych modelach rozliczenia' },
      { href: '/zmiana-agencji-seo', tekst: 'Zmiana agencji SEO', opis: 'jak przejąć konta, dane i linki od poprzedniej agencji' },
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'Szablon strategii SEO', opis: 'cele i zakres prac, które wpiszesz do zapytania ofertowego' },
    ],
    kroki: [
      { name: 'Ustal cel i budżet w firmie', text: 'Uzgodnij wewnętrznie, co ma się zmienić w ciągu 12 miesięcy i ile możesz wydawać miesięcznie na SEO.' },
      { name: 'Zbierz dane o stanie wyjściowym', text: 'Wpisz kliknięcia z Search Console i zapytania od klientów z GA4 za 12 miesięcy, najważniejsze podstrony, migracje i historię współpracy z agencjami.' },
      { name: 'Opisz zakres prac', text: 'Dla każdego obszaru, od techniki po widoczność w AI, zaznacz: w ofercie, opcjonalnie albo poza zakresem.' },
      { name: 'Wpisz warunki współpracy', text: 'Konta Google na firmie, prawa do treści, linki zostają po zakończeniu współpracy, okres wypowiedzenia, raport z Twoich danych.' },
      { name: 'Wybierz pytania do agencji', text: 'Wybierz 10–12 pytań, na które agencja ma odpowiedzieć na piśmie w ofercie.' },
      { name: 'Ustal formę oferty, terminy i kryteria', text: 'Opisz układ wyceny, termin pytań i ofert, datę decyzji oraz kryteria oceny z wagami.' },
      { name: 'Wyślij to samo zapytanie 3–5 agencjom', text: 'Wyślij identyczny dokument, odpowiadaj na pytania wszystkim naraz, a oferty oceń w tabeli ze skalą 0–2.' },
    ],
    plikNazwa: 'Zapytanie ofertowe na SEO: wzór do wysłania agencjom (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'SEO RFP template',
    tag: 'Free PDF template',
    h1: 'SEO RFP template: how to write a request for proposal for SEO services',
    lead: 'An SEO RFP (request for proposal) is a document you send to several agencies so that their proposals cover the same scope and can be compared side by side. It describes your business, goal, baseline, scope of work, contract terms and deadlines. Our free PDF template includes every field, 12 questions for agencies and a scoring sheet.',
    karta: {
      nazwa: 'SEO RFP template (PDF)',
      opis: 'A request for proposal for SEO agencies: goal, baseline, scope of work, contract terms, 12 questions and a proposal scoring sheet.',
      cta: 'Get the template',
    },
    sekcje: [
      {
        id: 'what-is-an-seo-rfp',
        h2: 'What is an SEO RFP and when should you send one?',
        html: `<p>A request for proposal asks suppliers to quote on terms you set out in advance. When you are choosing an SEO agency, it does two jobs. It gives every agency the same information, so their proposals can be compared. And it forces you to decide, before any sales call, what you actually want: the goal, the budget, and what has to stay on your side.</p>
<p>Without an RFP, each agency asks about different things and prices different things. One proposes a keyword list and two articles a month, another an audit with pay-for-results billing, a third a bundle with a Google Ads campaign. You end up comparing three different services rather than three prices for the same one.</p>
<p>Send an SEO RFP when you are hiring an agency for the first time, replacing your current one, entering a new market or adding AI search visibility to your SEO. Send one before a new website or a redesign, too: Google says that is a great time to hire an SEO, and the earlier, the better. For a small one-off job, such as an audit on its own, a short email with your site address and goal is enough.</p>
<p><strong>Important:</strong> this template is for private businesses that choose their own supplier. It is not a public-sector tender document or a template for grant-funded projects, which follow their own rules and paperwork. It is not legal advice either.</p>`,
        tabela: {
          id: 'table-agency-selection-documents',
          caption: 'RFP, brief, proposal and contract: how they differ',
          columns: [
            { key: 'document', label: 'Document' },
            { key: 'who', label: 'Who writes it' },
            { key: 'question', label: 'What it answers' },
            { key: 'when', label: 'When' },
          ],
          rows: [
            { document: 'RFP (request for proposal)', who: 'Your business', question: 'What we need and on what terms we want to receive proposals', when: 'Before talking to agencies' },
            { document: 'Brief', who: 'Your business, often with the supplier', question: 'The details needed to deliver a specific project, such as a new website or an article', when: 'When you commission a project' },
            { document: 'Proposal', who: 'The agency', question: 'What it will do, in what order, at what price and how it will measure results', when: 'By the deadline in the RFP' },
            { document: 'Contract', who: 'Both parties', question: 'Scope, fees, notice period, ownership of accounts, content and links', when: 'After you choose a proposal' },
          ],
        },
        htmlPo: `<p>If you are commissioning a new website rather than ongoing SEO, use our <a href="/en/tools/website-brief-template">website brief template</a> instead. It has its own SEO section and questions about redirecting old URLs.</p>`,
      },
      {
        id: 'what-to-include',
        h2: 'What to include in an SEO request for proposal: 10 parts',
        html: `<p>The template has ten parts. The first five describe your business and what you need. The next five tell the agency the terms you expect and how to respond. Google suggests checking whether an SEO asks what makes your business unique, who your competitors are, how search results can help and how your customers find you. A good SEO RFP answers those questions up front.</p>`,
        tabela: {
          id: 'table-rfp-parts',
          caption: 'The 10 parts of the SEO RFP template',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'what', label: 'What to fill in' },
            { key: 'why', label: 'Why the agency needs it' },
          ],
          rows: [
            { part: '1. Company and contact', what: 'Name, website, industry, area served, contact person and the person who makes the decision', why: 'Knows who it is talking to and who decides' },
            { part: '2. Goal', what: 'Your 12-month business goal and how you measure it today: leads, sales, sign-ups', why: 'Fits the scope to your goal, not to a package' },
            { part: '3. Baseline', what: 'CMS, number of pages, languages, Search Console and GA4 data, Google Business Profile, past SEO work, migrations and traffic drops', why: 'Can estimate how much work the start needs' },
            { part: '4. Market and competitors', what: 'Area, key services or categories, 3–5 competitors, what sets you apart, where customers come from today', why: 'Can check keywords and competitors before pricing' },
            { part: '5. Scope of work', what: 'Areas to price in three columns: required, optional, out of scope', why: 'Prices the same work as other agencies' },
            { part: '6. Your resources', what: 'Who approves changes, whether you have a developer, who supplies content, turnaround times', why: 'Can plan the pace and what it will handle itself' },
            { part: '7. Working requirements', what: 'Google accounts owned by you, content rights, links stay, notice period, reports from your own data', why: 'Knows your terms before the call, not at contract stage' },
            { part: '8. Questions for agencies', what: '10–12 questions the agency answers in writing in its proposal', why: 'Produces answers you can line up side by side' },
            { part: '9. Proposal and pricing format', what: 'Monthly fee excluding VAT, one-off costs, what the fee covers, billing model, a 3-month plan', why: 'Every proposal follows the same layout' },
            { part: '10. Timeline and selection', what: 'Deadline for questions and proposals, calls, decision date, scoring criteria, confidentiality, no obligation to sign', why: 'Knows how and when you will decide' },
          ],
        },
        htmlPo: `<p>The whole document fits on three or four pages. A longer RFP rarely brings better proposals, but it does slow down the replies. Put the details, such as a full page list or a Search Console query export, in an attachment or share them on the call.</p>`,
      },
      {
        id: 'how-to-write-an-seo-rfp',
        h2: 'How to write an RFP for SEO services in 7 steps',
        html: `<ol>
<li><strong>Agree on the goal and budget internally.</strong> Before you write to agencies, decide what should change over the next 12 months and what you can spend each month. Without that, the RFP will be too vague and the proposals random.</li>
<li><strong>Collect your baseline data.</strong> Clicks from Search Console and leads from GA4 for the last 12 months, your most important pages, dates of migrations and redesigns, and notes on previous agencies. Our <a href="/en/tools/free-seo-audit">free SEO audit</a> gives you a quick technical snapshot with a 1–100 score.</li>
<li><strong>Describe the scope of work.</strong> For each area, mark whether it is required, optional or out of scope.</li>
<li><strong>Set your working requirements.</strong> Accounts, content rights, links, notice period and the data the report must be based on.</li>
<li><strong>Pick your questions for agencies.</strong> 10–12 questions you want answered in writing, not just on a call.</li>
<li><strong>Define the proposal format, timeline and criteria.</strong> How pricing should be laid out, deadlines for questions and proposals, when calls and the decision happen, and which weighted criteria you will use.</li>
<li><strong>Send the same RFP to 3–5 agencies.</strong> Answer questions for everyone at once, so every agency works from the same information.</li>
</ol>
<p>Give agencies at least 7–10 working days to respond. A solid proposal means reviewing your site, keywords and competitors, which takes longer than filling in a price list. Also set an earlier deadline for questions, usually a few days after sending, and a decision date, so agencies know when to expect an answer.</p>`,
      },
      {
        id: 'goal-baseline-scope',
        h2: 'Goal, baseline and scope: how to describe them to get specific proposals',
        html: `<h3>Goal: leads, not "first place"</h3>
<p>State the business result SEO should deliver and how you measure it today. "More bathroom remodeling leads from organic search in our city, currently about … a month in GA4" tells an agency far more than "we want to rank high on Google." If you do not track leads yet, say so. Setting them up as key events in GA4 will then be the first task in every proposal.</p>
<p>Do not ask for guaranteed rankings. Google says no one can guarantee a #1 ranking on Google and warns against SEOs who claim to. Instead, ask what results the agency expects, in what timeframe and how it will measure progress. That is one of the questions Google itself lists in its guide to hiring an SEO.</p>
<h3>Baseline: what to share before agencies quote</h3>
<p>The more an agency knows at the start, the fewer generic promises its proposal contains. Describe your CMS (for example WordPress, Shopify or a custom build), the number of pages, languages, recent migrations and traffic drops, and what your previous agency did. Add who has access to which accounts and whether the data is complete. Missing data is information too: write "none" rather than guessing.</p>
<p>If you want agencies to look at Search Console before they quote, add them as restricted users. Google advises giving an SEO read access only at the audit stage, without write access. A restricted user can view most data but cannot manage the property. In GA4, the equivalent is the Viewer role. Once you have chosen, remove access for the agencies you did not hire.</p>
<h3>Scope: three columns instead of a wish list</h3>
<p>Typical areas are a technical audit and fixes, service or category pages, new content, links, local SEO and your Google Business Profile, AI search visibility, tracking and reporting, and support for a migration. For each one, mark required, optional or out of scope. For content and links, ask for a monthly number and a description of what it means. Otherwise one agency prices in-depth guides and another short posts, and both write "2 pieces of content a month."</p>
<p>Put AI search visibility inside the SEO scope rather than treating it as a separate project. Google says there are no additional requirements to appear in AI Overviews or AI Mode beyond SEO best practices. It also suggests checking whether an agency's "AEO" or "GEO" advice is aligned with its official guidance. So ask how the agency measures whether your business shows up in ChatGPT answers and Google AI Overviews: how many questions, in which tools and how often. Our own approach is described on the <a href="/en/ai-search-optimization/ai-visibility-audit">AI visibility audit</a> page.</p>`,
      },
      {
        id: 'terms-and-questions',
        h2: 'Working requirements and questions to ask SEO agencies',
        html: `<p>Terms written into the RFP save time on both sides. An agency that will not accept them can say so before the call rather than at contract stage. The most important ones:</p>
<ul>
<li><strong>Accounts owned by your business.</strong> Search Console, GA4, Google Tag Manager, your Business Profile and your ad account belong to you, and the agency gets permissions. In Search Console, an owner has full control of the property and grants access to others. In GA4, users are managed by the Administrator role. On your Business Profile, stay the primary owner and add the agency as a manager: managers can edit the profile but cannot add or remove users.</li>
<li><strong>Content rights.</strong> Copy, photos and graphics created during the engagement are transferred to you, and the contract spells out how.</li>
<li><strong>Links stay.</strong> Links earned during the engagement remain after it ends, and the link list is part of the report. The agency does not buy links: Google treats buying or selling links for ranking purposes as spam.</li>
<li><strong>Notice period.</strong> State what you expect, for example one month, and whether you accept automatic renewal.</li>
<li><strong>Reports from your own data.</strong> Every month: what was done, how leads and clicks changed in your Search Console and GA4, and what comes next. Rankings next to that data, not instead of it.</li>
<li><strong>Site changes only with approval.</strong> A list of changes before release and a change log. Google points out that you are responsible for the actions of any company you hire.</li>
</ul>
<p>What to check in the contract, and how to get your accounts and data back from a previous supplier, is covered in our guide to <a href="/en/switching-seo-agency">switching SEO agencies</a>. This template is not legal advice: for a large contract, have a lawyer review it.</p>
<h3>Questions the agency answers in writing</h3>
<p>Some of these come from Google's guide to hiring an SEO, others from our list of <a href="/en/comparisons/how-to-choose-an-seo-agency">12 questions to ask before you sign with an SEO agency</a>. Pick 10–12 and ask for the answers in the proposal, not just on the call:</p>
<ol>
<li>What results do you expect in our case, in what timeframe, and how will you measure them?</li>
<li>What will you do in the first three months, and in what order?</li>
<li>Who exactly will work on our site, and how will we communicate?</li>
<li>Can you show us a sample report or a demo of your client portal?</li>
<li>What experience do you have in our industry and our market (city, country, languages)?</li>
<li>Do you follow Google Search Essentials, and where do your links come from?</li>
<li>Will we approve site changes before release, and will we get a list of every change?</li>
<li>How do you measure visibility in ChatGPT and Google AI Overviews?</li>
<li>What exactly does the fee cover: how many keywords, pieces of content, links or hours a month?</li>
<li>How long is the contract, what is the notice period, and are there exit fees?</li>
<li>What happens if there is no progress after three months?</li>
<li>Can we speak to a current or former client?</li>
</ol>`,
      },
      {
        id: 'seo-rfp-example',
        h2: 'SEO RFP example: a filled-in extract and a cover email',
        html: `<p>Below is an extract of the template filled in for a fictional home renovation company serving one city and its suburbs. The numbers are examples only; use your own from Search Console and GA4.</p>`,
        tabela: {
          id: 'table-rfp-example',
          caption: 'SEO RFP example (fictional company, example numbers)',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'entry', label: 'Example entry' },
          ],
          rows: [
            { part: 'Company and contact', entry: 'Home renovation company, one city and its suburbs, 12 people. Contact: marketing manager. The owner makes the decision.' },
            { part: 'Goal', entry: 'More bathroom and kitchen remodeling jobs. Currently about 8 leads a month from organic search (GA4: form submissions and phone-number clicks). Please propose a realistic 12-month target.' },
            { part: 'Baseline', entry: 'WordPress, about 40 pages, one language. About 300 clicks a month from non-brand queries (Search Console). Business Profile with 46 reviews. Site redesign in 2025 without a redirect map, followed by a traffic drop.' },
            { part: 'Market and competitors', entry: 'The city and two neighbouring districts. Priorities: bathroom remodeling, kitchen remodeling, apartment finishing. Three competitors we see above us in Maps and organic results.' },
            { part: 'Scope', entry: 'Required: technical audit and redirect fixes, service pages, local SEO, tracking, reporting. Optional: how-to content, AI search visibility. Out of scope: Google Ads, social media.' },
            { part: 'Resources', entry: 'External developer, 4 hours a month. Content approval: marketing manager, within 5 working days.' },
            { part: 'Requirements', entry: 'Google accounts owned by us, content and links stay with us, one-month notice, reports from our Search Console and GA4.' },
            { part: 'Proposal format', entry: 'Monthly fee excluding VAT, one-off costs listed separately, a 3-month plan, answers to the 12 questions. Up to 4 A4 pages plus a sample report.' },
            { part: 'Timeline', entry: 'Questions: within 5 days of sending. Proposals: 10 working days after sending. Calls with 2–3 agencies the following week. Decision: within 4 weeks of sending.' },
          ],
        },
        htmlPo: `<h3>Sample cover email for your SEO RFP</h3>
<p><em>Subject: Request for proposal – SEO for [website]</em></p>
<p>Hello, we are looking for an agency to run SEO for our website [address] from [month]. Attached is our request for proposal with details of our business, goal, current site and scope of work. We are sending the same RFP to a few agencies. Please send any questions to this address by [date] and your proposal by [date]. We will invite shortlisted agencies to a call in the week of [date]. This request does not commit us to signing a contract. Best regards, [name, role, phone]</p>
<p>A short email with the details in an attachment works better than a long message: the agency can pass the PDF to the specialist who will write the proposal, and you know everyone received the same thing.</p>`,
      },
      {
        id: 'how-to-compare-proposals',
        h2: 'How to compare SEO proposals: criteria, weights and a scoring scale',
        html: `<p>When the proposals arrive, score them in one table. Each criterion has a weight, and each proposal gets 0, 1 or 2 points for it: 0 for no answer or a generic one, 1 for a partial answer, 2 for a specific answer backed by evidence (a report, an example, a contract clause). A proposal's score is the sum of weight times points. The weights below are our suggestion. Change them if something matters more to your business, but do it before you open the proposals, not after.</p>`,
        tabela: {
          id: 'table-proposal-criteria',
          caption: 'SEO proposal scoring criteria: weight, what to check and red flags',
          columns: [
            { key: 'criterion', label: 'Criterion' },
            { key: 'weight', label: 'Weight' },
            { key: 'check', label: 'What to check in the proposal' },
            { key: 'flag', label: 'Red flag' },
          ],
          rows: [
            { criterion: 'Understanding of the goal and a 3-month plan', weight: '25%', check: 'The proposal refers to your goal and baseline, and the plan has an order and a rationale', flag: 'The same package for everyone, nothing about your site' },
            { criterion: 'Scope and what the fee covers', weight: '20%', check: 'Keywords, content, links or hours per month, one-off costs, what is out of scope', flag: '"Full-service SEO" with no numbers' },
            { criterion: 'Tracking and reporting', weight: '15%', check: 'Reports from your Search Console and GA4, leads next to rankings, a sample report', flag: 'Only a ranking list from the agency’s own tool' },
            { criterion: 'Contract terms and ownership', weight: '15%', check: 'Accounts owned by you, content rights, links stay, notice period', flag: 'Long contract with automatic renewal, "rented" links' },
            { criterion: 'Team, experience and references', weight: '15%', check: 'A named specialist, experience in your industry and market, a client you can call', flag: 'No named lead and no references' },
            { criterion: 'AI search visibility and Google compliance', weight: '10%', check: 'A method for measuring AI visibility, references to Google documentation, no paid links', flag: 'A guaranteed #1 ranking or "ChatGPT recommendations" with no measurement method' },
          ],
          przypis: 'The weights and the 0–2 scale are a suggestion from AI SEO COMPANY, not an industry standard. The questions about results, experience, references, site changes and ranking guarantees are based on Google’s guide "Do you need an SEO?" (read on 11 Nov 2026).',
        },
        htmlPo: `<h3>How to compare SEO pricing</h3>
<p>Convert every proposal to a 12-month cost: the monthly fee times 12, plus one-off costs such as an audit, implementation or a setup fee. Only then compare. With pay-for-results billing, work out what you would pay if the contracted keywords reach the top 10, and check whether customers actually search for them. We explain the differences between the models in <a href="/en/comparisons/pay-for-results-vs-monthly-retainer">pay-for-results SEO vs. a monthly retainer</a>.</p>
<p>Do not automatically pick the cheapest proposal. When the price gap is large, the scope usually differs: the number of pieces of content, links or hours. Ask about it on the call and write the answer next to the score. Our own plans and contract terms are on our <a href="/en/seo-pricing">SEO pricing</a> page.</p>`,
      },
      {
        id: 'common-mistakes',
        h2: 'Common SEO RFP mistakes',
        html: `<ul>
<li><strong>No goal.</strong> "Please quote for SEO" with nothing about what should change or how you measure it.</li>
<li><strong>A long keyword list instead of a goal.</strong> The agency will price the keywords, but you will not know whether they bring customers. Describe your services and customer questions instead, and let the agency justify its keyword choice in the proposal.</li>
<li><strong>Copying a public-sector tender template.</strong> Procurement forms and declarations say nothing about SEO and put smaller agencies off replying.</li>
<li><strong>Different information for different agencies.</strong> An answer given to only one agency makes the proposals impossible to compare.</li>
<li><strong>A deadline that is too short.</strong> Two days for a proposal invites a standard package.</li>
<li><strong>Asking for a guaranteed #1 ranking.</strong> An honest agency will not give one, so you end up rewarding those who promise more than they can deliver.</li>
<li><strong>Sending it to a dozen agencies.</strong> You will not read that many proposals properly or talk to everyone. Three to five vetted firms is better.</li>
<li><strong>Leaving out working requirements.</strong> Questions about accounts, content and links only come up at contract stage, or when you switch agencies.</li>
<li><strong>No budget information.</strong> If you have an upper limit, give it or a range. Agencies will fit the scope to it instead of guessing.</li>
</ul>
<p>If you first need to know what scope of work is actually required, start with an <a href="/en/seo-audit">SEO audit</a> or set out your goals in our <a href="/en/tools/seo-strategy-template">SEO strategy template</a>. The strategy gives you ready answers for parts 2–5 of the RFP.</p>`,
      },
    ],
    podglad: {
      h2: 'SEO RFP template: full preview',
      opis: 'Below is the full content of the template. Copy it into your own document, or download the PDF with fill-in fields and the proposal scoring sheet.',
      html: `<h3>Part 1. Company and contact</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>Company name and website</td><td>…</td></tr>
<tr><td>Industry and main services or products</td><td>…</td></tr>
<tr><td>Company size and area served</td><td>…</td></tr>
<tr><td>Contact person (name, role, email, phone)</td><td>…</td></tr>
<tr><td>Who decides which agency to hire</td><td>…</td></tr>
</tbody></table>
<h3>Part 2. Goal</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>12-month business goal (one sentence)</td><td>…</td></tr>
<tr><td>How we measure it today (GA4, CRM, phone calls)</td><td>…</td></tr>
<tr><td>Current value (for example monthly leads from organic search)</td><td>…</td></tr>
<tr><td>Target value, or "please propose one"</td><td>…</td></tr>
<tr><td>What success looks like after 3 months</td><td>…</td></tr>
</tbody></table>
<h3>Part 3. Baseline</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>CMS, number of pages, languages</td><td>…</td></tr>
<tr><td>Non-brand clicks, last 12 months (Search Console)</td><td>…</td></tr>
<tr><td>Monthly leads from organic search (GA4)</td><td>…</td></tr>
<tr><td>Google Business Profile: primary category, number of reviews</td><td>…</td></tr>
<tr><td>Migrations, redesigns, traffic drops (with dates)</td><td>…</td></tr>
<tr><td>Previous SEO work: who, for how long, what they did</td><td>…</td></tr>
<tr><td>Access for agencies before they quote</td><td>☐ Search Console (restricted user) ☐ GA4 (Viewer role) ☐ no access</td></tr>
</tbody></table>
<h3>Part 4. Market and competitors</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>Area served: cities, countries, languages</td><td>…</td></tr>
<tr><td>Services or categories in order of importance</td><td>1. … 2. … 3. …</td></tr>
<tr><td>3–5 competitors from Google results and Maps</td><td>…</td></tr>
<tr><td>What sets our business apart</td><td>…</td></tr>
<tr><td>How customers find us today</td><td>…</td></tr>
</tbody></table>
<h3>Part 5. Scope of work to price</h3>
<table><thead><tr><th>Area</th><th>Required</th><th>Optional</th><th>Out of scope</th></tr></thead><tbody>
<tr><td>SEO audit and fix plan</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Technical fixes (implemented, or recommendations for our developer)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Service or category pages</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>New content (number per month: …)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Links (number per month and source types: …)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Local SEO and Google Business Profile</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>AI search visibility (ChatGPT, Google AI Overviews)</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Tracking: key events in GA4</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Monthly report and meeting</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Support for a migration or a new website</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Other: …</td><td>☐</td><td>☐</td><td>☐</td></tr>
</tbody></table>
<h3>Part 6. Our resources</h3>
<table><thead><tr><th>Field</th><th>Your answer</th></tr></thead><tbody>
<tr><td>Who approves changes and content, and how quickly</td><td>…</td></tr>
<tr><td>Developer: in-house, external or none; hours per month</td><td>…</td></tr>
<tr><td>Who writes or supplies content and photos</td><td>…</td></tr>
<tr><td>Agency access to the CMS and hosting</td><td>☐ yes ☐ after we approve changes ☐ no</td></tr>
</tbody></table>
<h3>Part 7. Working requirements</h3>
<ul>
<li>☐ Search Console, GA4, Tag Manager, Business Profile and ad account owned by our business; the agency gets permissions.</li>
<li>☐ Copyright in content, photos and graphics transferred to us, as set out in the contract.</li>
<li>☐ Links earned during the engagement stay after it ends; link list included in reports.</li>
<li>☐ No paid links or other practices that break Google's spam policies.</li>
<li>☐ Site changes only after our approval; change log kept.</li>
<li>☐ Monthly report based on our own Search Console and GA4 data.</li>
<li>Expected notice period: …</li>
<li>Other requirements: …</li>
</ul>
<h3>Part 8. Questions for agencies (answer in your proposal)</h3>
<ol>
<li>What results do you expect in our case, in what timeframe, and how will you measure them?</li>
<li>What will you do in the first three months, and in what order?</li>
<li>Who exactly will work on our site, and how will we communicate?</li>
<li>Can you show us a sample report or a demo of your client portal?</li>
<li>What experience do you have in our industry and our market?</li>
<li>Do you follow Google Search Essentials, and where do your links come from?</li>
<li>Will we approve changes before release, and will we get a list of every change?</li>
<li>How do you measure visibility in ChatGPT and Google AI Overviews?</li>
<li>What exactly does the fee cover: how many keywords, pieces of content, links or hours a month?</li>
<li>How long is the contract, what is the notice period, and are there exit fees?</li>
<li>What happens if there is no progress after three months?</li>
<li>Can we speak to a current or former client?</li>
</ol>
<h3>Part 9. Proposal and pricing format (completed by the agency)</h3>
<table><thead><tr><th>Field</th><th>Agency answer</th></tr></thead><tbody>
<tr><td>Monthly fee excluding VAT</td><td>…</td></tr>
<tr><td>One-off costs (audit, implementation, setup fee)</td><td>…</td></tr>
<tr><td>What the fee covers: keywords, content, links, hours per month</td><td>…</td></tr>
<tr><td>Billing model: retainer, pay for results, mixed</td><td>…</td></tr>
<tr><td>Contract term and notice period</td><td>…</td></tr>
<tr><td>Plan for the first 3 months</td><td>…</td></tr>
<tr><td>Account lead and how to reach them</td><td>…</td></tr>
<tr><td>Sample report or portal demo</td><td>☐ attached ☐ link: …</td></tr>
</tbody></table>
<p>Format: PDF, up to … A4 pages, valid for at least … days.</p>
<h3>Part 10. Timeline and selection</h3>
<table><thead><tr><th>Stage</th><th>Deadline</th></tr></thead><tbody>
<tr><td>Questions from agencies</td><td>by …</td></tr>
<tr><td>Answers shared with all agencies</td><td>by …</td></tr>
<tr><td>Proposal deadline</td><td>by …</td></tr>
<tr><td>Calls with shortlisted agencies</td><td>…</td></tr>
<tr><td>Decision and reply to every agency</td><td>by …</td></tr>
</tbody></table>
<p>Scoring criteria (weight): understanding of the goal and a 3-month plan …%, scope and what the fee covers …%, tracking and reporting …%, contract terms and ownership …%, team, experience and references …%, AI search visibility and Google compliance …%.</p>
<p>Terms: this request does not commit the company to accepting any proposal or signing a contract, and it is not a tender. The information in it is confidential and may be used only to prepare a proposal. Several agencies receive the same request.</p>
<h3>Appendix. Proposal scoring sheet (0–2 scale)</h3>
<table><thead><tr><th>Criterion</th><th>Weight</th><th>Agency A</th><th>Agency B</th><th>Agency C</th></tr></thead><tbody>
<tr><td>Understanding of the goal and a 3-month plan</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Scope and what the fee covers</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Tracking and reporting</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Contract terms and ownership</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Team, experience and references</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>AI search visibility and Google compliance</td><td>…%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><strong>Score (sum of weight × points)</strong></td><td>100%</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>12-month cost (12 × monthly fee + one-off costs)</td><td></td><td>…</td><td>…</td><td>…</td></tr>
</tbody></table>`,
    },
    formularz: {
      h2: 'Get the SEO RFP template (PDF)',
      opis: 'We will email you a PDF with all 10 parts of the RFP, 12 questions for agencies and the proposal scoring sheet. Fill it in with any PDF editor, or copy it into your own document and send it to agencies.',
      etykieta: 'Your email address',
      przycisk: 'Email me the PDF template',
      przedmiot: 'the SEO RFP template',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the SEO RFP template PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'What is the difference between an RFP and a brief?',
        answer: 'You send an RFP to several agencies before you choose one. It sets out your goal, baseline, scope and the terms on which you want proposals, so you can compare the replies. A brief usually goes to the supplier you have already chosen and covers the details of a specific project, such as a new website or an article. For SEO, the RFP is enough at the selection stage; you can work out the details after signing.',
      },
      {
        question: 'How many agencies should receive an SEO RFP?',
        answer: 'Three to five is usually right. Fewer than three proposals are hard to compare, and with a dozen you will not read them properly or talk to everyone. Choose agencies you have already checked: reviews on Google and directories, the visibility of their own website, published pricing. Send all of them the same RFP, and share answers to questions with everyone at once so the proposals stay comparable.',
      },
      {
        question: 'Should I include a budget in an SEO RFP?',
        answer: 'It helps to give at least a range or a monthly upper limit. Without it, agencies guess: one proposes a minimal package, another an extensive scope, and the proposals are hard to line up. The budget does not have to be final. You can ask for two options, a basic and an extended one, with a description of what changes between them. Our own plans are listed on our SEO pricing page.',
      },
      {
        question: 'How long should agencies have to respond?',
        answer: 'Usually 7–10 working days, or about two weeks for a large site or online store. A solid SEO proposal means reviewing your site, keywords and competitors, and sometimes your Search Console data. A shorter deadline encourages a standard package. Also set an earlier deadline for questions from agencies and a decision date, so everyone knows when to expect your answer.',
      },
      {
        question: 'Does sending an RFP commit me to signing a contract?',
        answer: 'An RFP is meant to collect proposals, not to conclude a contract. To avoid any doubt, state plainly that it does not commit you to accepting any proposal or signing a contract, and that it is not a tender. You sign a contract only with the agency you choose, once you have agreed its terms. This is not legal advice: for a larger engagement, have a lawyer review the documents.',
      },
      {
        question: 'Can I use this template for a public-sector tender or a grant-funded project?',
        answer: 'No. The template is for businesses that choose their SEO agency themselves. Public bodies and companies spending grant funding may be subject to their own supplier selection rules and required documents. You can still reuse the substance of this template, meaning the goal, baseline, scope of work and questions for agencies, to describe the work in those documents.',
      },
    ],
    zrodla: ZRODLA_EN,
    powiazane: [
      { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'How to choose an SEO agency', opis: '12 questions to ask before you sign: good answers and red flags' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO pricing', opis: 'our plans, scope and contract terms to compare with other proposals' },
      { href: '/porownania/pozycjonowanie-za-efekt-czy-abonament', tekst: 'Pay-for-results SEO vs. a monthly retainer', opis: 'how to compare proposals with different billing models' },
      { href: '/zmiana-agencji-seo', tekst: 'Switching SEO agencies', opis: 'how to take over your accounts, data and links from a previous agency' },
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'SEO strategy template', opis: 'the goals and scope you will copy into your RFP' },
    ],
    kroki: [
      { name: 'Agree on the goal and budget internally', text: 'Decide what should change over the next 12 months and what you can spend on SEO each month.' },
      { name: 'Collect your baseline data', text: 'Add Search Console clicks and GA4 leads for the last 12 months, your key pages, past migrations and your history with agencies.' },
      { name: 'Describe the scope of work', text: 'For each area, from technical SEO to AI search visibility, mark it as required, optional or out of scope.' },
      { name: 'Set your working requirements', text: 'Google accounts owned by you, content rights, links that stay after the engagement, notice period, reports from your own data.' },
      { name: 'Pick your questions for agencies', text: 'Choose 10–12 questions the agency must answer in writing in its proposal.' },
      { name: 'Define the proposal format, timeline and criteria', text: 'Describe the pricing layout, deadlines for questions and proposals, the decision date and weighted scoring criteria.' },
      { name: 'Send the same RFP to 3–5 agencies', text: 'Send an identical document, answer questions for everyone at once, and score the proposals on a 0–2 scale.' },
    ],
    plikNazwa: 'SEO RFP template: request for proposal for SEO services (PDF)',
  },
};
