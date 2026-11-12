// Bramka publikacji nowych stron (PLAN-v2 8.1, 8.2; fundament wdrożenia 5.11.2026).
// JEDNO źródło prawdy: czy strona z planu jest już publiczna. Czysty ESM bez aliasu @/
// - działa w komponentach serwerowych i klienckich, w sitemapie (lib/sitemapEntries.js)
// i w skryptach node. Jedyny import (12.11.2026, S1-poprawki Z-00): lib/narzedziaLiczby.js,
// też czysty ESM bez importów (liczby reguł i podstron audytu w meta), z rozszerzeniem .js dla node.
//
// Kto z tego korzysta:
// - strony: wymagajStronyPl() i metadataStronyPl() z lib/stronaPl.js (notFound() = 404 dla
//   nieopublikowanej), parametryPl() dla tras [slug] (generateStaticParams);
// - sitemapa: lib/sitemapEntries.js dopisuje opublikowaneSciezki() i pomija nieopublikowane;
// - linki: hrefJesliOpublikowana() - reguła 6.0 planu: link do celu, który nie zwraca 200,
//   renderujemy jako zwykły tekst bez <a> (w kartach także bez strzałki);
// - nawigacja, ItemList hubów, llms.txt: opublikowaneSciezki(prefiks) + wpisPublikacji().
//
// Istniejących stron NIE wpisujemy: ścieżka spoza rejestru jest opublikowana z definicji.
//
// 6.11.2026 (wieczor): na zgode Filipa „wypchnij wszystkie podstrony na produkcje” opublikowane
// P3, A2, A5, L1, hub /narzedzia, N1 i P6. Za bramka zostaja: S1 /narzedzia/raport-seo (formularz
// wysyla na panel /api/wzor-raportu, ktory zwraca 404) i B1 /blog/bing-webmaster-tools-indexnow-chatgpt
// (tresc mowi, ze dodalismy strone do Bing Webmaster Tools - to wciaz zadanie T0.4b).
// 11.11.2026: S1 /narzedzia/raport-seo opublikowana (formularz wysyla na panel /api/szablony).
//
// PUBLIKACJA KOLEJNEJ PARTII (poza kodem tego pliku): bramka 8.2 i zgoda Filipa na push,
// potem opublikowana: true tutaj, LASTMOD nowych URL-i = dzień wdrożenia (lib/lastmod.js),
// IndexNow, URL Inspection, zgłoszenie segmentu sitemapy w GSC i BWT. Sitemapa, nawigacja,
// karty hubów i linki przełączają się same po zmianie flagi.
//
// Pola wpisu:
//   partia      - numer partii z PLAN-v2 8.1 (1-5)
//   tydzien     - tydzień wydania z PLAN-v2 8.1 ('W3', 'W5'...)
//   opublikowana- true = strona publiczna (200, sitemapa, linki)
//   zbudowana   - domyślnie true; false = adres zarezerwowany, strony nie ma w kodzie.
//                 Taki adres nigdy nie jest linkowany ani zwracany, także w podglądzie.
//   segment     - segment sitemapy (musi się zgadzać z segmentOf w lib/sitemapEntries.js)
//   tytul, opis - title i meta z PLAN-v2 rozdz. 6 (llms.txt, nawigacja, karty hubów)
//   warunek     - dodatkowy warunek publikacji poza bramką 8.2 (opcjonalnie)

import { AUDYT } from './narzedziaLiczby.js';

// Podgląd stron nieopublikowanych: TYLKO lokalny build Integracji/Poprawek
// (NEXT_PUBLIC_PODGLAD_PARTII=1 npm run build). Nigdy w Vercel. Prefiks NEXT_PUBLIC_, żeby
// serwer i klient widziały tę samą wartość (inaczej błąd hydracji w linkach warunkowych).
export const PODGLAD_PARTII = process.env.NEXT_PUBLIC_PODGLAD_PARTII === '1';

// T0.2: sprawdzarka widoczności w AI (/sprawdz-widocznosc-w-ai) działa dopiero po naprawie kluczy
// DataForSEO w panelu (5.11.2026 POST panel /api/ai-check = 503). Jedna flaga dla całego serwisu
// (Integracja 5.11.2026; wcześniej 4 lokalne kopie): lib/narzedzia.js, lib/pytaniaAi.js
// i lib/blogCta.js ją reeksportują, components/GeoPageClient.jsx importuje. Przełączyć na true,
// gdy curl POST /api/ai-check z pustym body zwraca 400 (nie 503) ORAZ na sprawdzarce stoi sekcja
// A3c „Jak mierzyć widoczność w AI: 5 metryk” z id="ac-metryki" (link z A5 prowadzi do niej).
// Ta flaga nie zależy od PODGLAD_PARTII: podgląd nie naprawia API.
// 11.11.2026: panel z /api/narzedzia/widocznosc-ai wdrożony i sprawdzony na produkcji (5 silników).
export const SPRAWDZARKA_DZIALA = true;

export const PUBLIKACJA = {
  // --- Partia 1 (W3) ---------------------------------------------------------------------
  '/porownania': {
    partia: 1, tydzien: 'W3', opublikowana: true, segment: 'porownania',
    tytul: 'Porównania przed wyborem agencji SEO i modelu współpracy',
    // Recenzja 6.11.2026: bez „SEO czy Google Ads”, dopóki P3 nie jest opublikowane (po D9 dopisać
    // „, SEO czy Google Ads” po „SEO czy GEO”, tak jak getter HUB.description w lib/porownania.js).
    // 6.11.2026: P3 opublikowane razem z partiami 2-4 (zgoda Filipa „wypchnij wszystkie podstrony”).
    opis: 'Za efekt czy abonament, SEO czy GEO, SEO czy Google Ads: porównania z danymi, źródłami i datą aktualizacji. Bez ocen na oko.',
  },
  '/porownania/seo-vs-geo': {
    partia: 1, tydzien: 'W3', opublikowana: true, segment: 'porownania',
    tytul: 'SEO vs GEO: czym się różnią i od czego zacząć w 2026',
    opis: 'GEO to optymalizacja pod odpowiedzi ChatGPT, Gemini i przeglądu AI w Google. Porównanie z SEO w 8 kryteriach i nasz pomiar źródeł AI.',
  },
  '/porownania/pozycjonowanie-za-efekt-czy-abonament': {
    partia: 1, tydzien: 'W3', opublikowana: true, segment: 'porownania',
    tytul: 'Pozycjonowanie za efekt czy abonament? Porównanie 2026',
    opis: 'Za efekt czy abonament? Porównanie w 10 kryteriach, modele rozliczeń 17 agencji, koszt przy 20 frazach i zapisy umowy do sprawdzenia.',
  },
  // Wyjątek partii 1: bez D9 i eksportu z konta Ads hub startuje z 2 kartami
  // albo z robots index:false/follow:true do trzeciej karty (CB-09 wariant B) - decyzja przy wydaniu.
  '/porownania/seo-czy-google-ads': {
    partia: 1, tydzien: 'W3', opublikowana: true, segment: 'porownania',
    warunek: 'D9 + eksport udziału w wyświetleniach z konta Ads 230-348-6643 (Filip)',
    tytul: 'SEO czy Google Ads? Koszty, czas efektu i kiedy łączyć',
    opis: 'Pozycjonowanie czy Google Ads: koszt kliknięcia z naszej kampanii (7,92 zł), czas do efektu i co zostaje po wyłączeniu budżetu. Kiedy łączyć.',
  },

  // --- Partia 2 (W5) ---------------------------------------------------------------------
  '/pozycjonowanie-w-ai/chatgpt': {
    partia: 2, tydzien: 'W5', opublikowana: true, segment: 'ai-pl',
    tytul: 'Pozycjonowanie w ChatGPT: skąd bierze firmy, które poleca',
    opis: 'W naszym teście 59 z 62 linków w poleceniach ChatGPT prowadziło do Map Google. Skąd model bierze firmy i 7 kroków, żeby wymieniał Twoją.',
  },
  '/pozycjonowanie-w-ai/audyt-widocznosci': {
    partia: 2, tydzien: 'W5', opublikowana: true, segment: 'ai-pl',
    tytul: 'Audyt widoczności w AI: co dostajesz za 990 zł netto',
    opis: 'Audyt widoczności w AI: 30 pytań Twoich klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI Google, źródła cytowań i plan na 90 dni.',
  },
  '/pozycjonowanie-wizytowki-google': {
    partia: 2, tydzien: 'W5', opublikowana: true, segment: 'strony-pl',
    tytul: 'Pozycjonowanie wizytówki Google: cena i pomiar z 49 punktów',
    opis: 'Pozycjonowanie wizytówki Google: kategorie, opinie, posty i pomiar pozycji z 49 punktów w Mapach. Jawna cena i umowa miesięczna.',
  },

  // --- Partia 3 (W9) ---------------------------------------------------------------------
  // Przy publikacji partii 3 dodatkowo: 308 /szablony -> /narzedzia#szablony i
  // /szablony/:slug -> /narzedzia/:slug w next.config.mjs oraz wpis B1 w lib/blogPosts.js.
  '/narzedzia': {
    partia: 3, tydzien: 'W9', opublikowana: true, segment: 'narzedzia-szablony',
    // S1-poprawki Z-H1, Z-H2 (12.11.2026): audyt SEO w title i meta; „raport SEO” ma własną stronę
    // z frazą w title (/narzedzia/raport-seo). Autorytet domeny dopisać w dniu jego publikacji (Z-D1).
    tytul: 'Darmowe narzędzia SEO i AI: audyt SEO, widoczność w AI',
    opis: 'Darmowe narzędzia SEO i AI bez rejestracji: audyt SEO z oceną 1-100, widoczność w AI, kalkulator strat, makieta strony, generator llms.txt i szablony.',
  },
  '/narzedzia/generator-llms-txt': {
    partia: 3, tydzien: 'W9', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: 'Generator llms.txt za darmo i test dostępu botów AI',
    // Z-L2 (12.11.2026): wyróżniki (cały plik, opis każdego linku, 8 botów, bez e-maila); nazwy botów są w treści strony.
    opis: 'Wygeneruj llms.txt z mapy strony: cały plik z sekcjami i opisem każdego linku. Sprawdź też dostęp 8 botów AI. Za darmo, bez rejestracji i e-maila.',
  },
  // 9.11.2026: darmowe aplikacje z bramką e-mail. Warunek publikacji: wdrożony panel z trasami
  // /api/narzedzia/* (migracja 0011) i klucze: PAGESPEED_API_KEY (audyt),
  // ANTHROPIC_API_KEY z saldem (makieta), DataForSEO z saldem; zgoda Filipa na wdrożenie.
  '/narzedzia/audyt-seo': {
    partia: 6, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: 'Darmowy audyt SEO strony: ocena 1-100 i lista błędów',
    // Z-A1 (12.11.2026): liczby ze stałej AUDYT (lib/narzedziaLiczby.js), nie na sztywno.
    opis: `Sprawdź za darmo do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach: technika, treść, szybkość w PageSpeed i dostęp botów AI. Ocena SEO 1-100 i lista błędów, bez rejestracji.`,
    warunek: 'panel /api/narzedzia/audyt-seo + PAGESPEED_API_KEY',
  },
  '/narzedzia/autorytet-domeny': {
    partia: 6, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony', // opublikować po wysyłce shardów CC do Blob i wdrożeniu panelu
    // 12.11.2026 (decyzja właściciela): bez Ahrefs i bez klucza. Nasz wynik 0-100 z grafu linków Common Crawl,
    // panel czyta własne shardy z Blob. Publikacja = wdrożenie panelu z nową trasą i wysłane shardy (dane/RAPORT.md §8).
    tytul: 'Sprawdź autorytet domeny za darmo: wynik 0-100',
    opis: 'Sprawdź autorytet domeny za darmo: wynik 0-100 z grafu linków Common Crawl, miejsce wśród domen .pl i porównanie z 3 konkurentami, bez e-maila.',
    warunek: 'panel /api/narzedzia/autorytet na shardach Common Crawl w Blob (bez klucza zewnętrznego)',
  },
  '/narzedzia/kalkulator-strat-seo': {
    partia: 6, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    // 12.11.2026: „Kalkulator SEO” (intencja z SERP, zmiany.md Z-K7); wszystkie dotychczasowe słowa zostają.
    tytul: 'Kalkulator SEO: ile tracisz bez SEO i widoczności w AI',
    opis: 'Policz, ile zysku miesięcznie trafia do konkurencji, gdy nie ma Cię w TOP 3 Google i w odpowiedziach ChatGPT. Twoje dane, jawne założenia, wynik w widełkach.',
    warunek: 'panel /api/narzedzia/odblokuj (raport e-mailem)',
  },
  '/narzedzia/makieta-redesignu': {
    partia: 6, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    // Z-M1 (12.11.2026): obecna fraza na początku title, w meta „bez konta i karty” (wyróżnik, A4 §6).
    tytul: 'Makieta nowej strony z AI za darmo: redesign w 1-3 minuty',
    opis: 'Wpisz adres strony i zobacz w 1-3 minuty propozycję nowej strony głównej na komputer i telefon, zbudowaną z treści Twojej firmy. Bez konta i karty.',
    warunek: 'panel /api/narzedzia/makieta + ANTHROPIC_API_KEY z saldem',
  },
  '/narzedzia/raport-seo': {
    partia: 3, tydzien: 'W9', opublikowana: true, segment: 'narzedzia-szablony',
    warunek: 'endpoint /api/szablony w panelu i PDF wzor-raportu-seo (11.11.2026)',
    tytul: 'Raport SEO: co powinien zawierać? Wzór miesięczny w PDF',
    opis: 'Co powinien zawierać miesięczny raport SEO od agencji: 5 sekcji, metryki z GSC, GA4, Map i AI, czerwone flagi i wzór do pobrania w PDF.',
  },
  '/blog/bing-webmaster-tools-indexnow-chatgpt': {
    partia: 3, tydzien: 'W9', opublikowana: false, segment: 'blog-pl',
    warunek: 'T0.4b (BWT) + pomiar indeksacji W1–W8',
    tytul: 'Bing Webmaster Tools i IndexNow: konfiguracja pod ChatGPT',
    opis: 'Jak dodać stronę do Bing Webmaster Tools, wdrożyć IndexNow i sprawdzić indeksację. Dlaczego Bing ma znaczenie dla odpowiedzi ChatGPT.',
  },

  // --- Partia 4 (W12) --------------------------------------------------------------------
  '/porownania/jak-wybrac-agencje-seo': {
    partia: 4, tydzien: 'W12', opublikowana: true, segment: 'porownania',
    tytul: 'Jak wybrać agencję SEO? 12 pytań przed podpisaniem umowy',
    opis: 'Jak wybrać agencję SEO: 12 pytań o raporty, konta Google, umowę i pomiar w AI. Dobre odpowiedzi i czerwone flagi, bez rankingu na oko.',
  },

  // --- Zarezerwowane, NIEZBUDOWANE (zbudowana: false) -------------------------------------
  // Adresy z planu bez strony w kodzie. Nigdy nie są linkowane ani w sitemapie, także
  // w podglądzie. Zbudowanie strony = usunąć zbudowana: false (i dalej bramka jak wyżej).
  '/pozycjonowanie-w-ai/cennik': {
    partia: 2, tydzien: 'W5', opublikowana: false, zbudowana: false, segment: 'ai-pl',
    warunek: 'A6: tabela ≥ 8 agencji GEO z URL-em i datą w każdej komórce; bez niej partia 3 (W9)',
    tytul: 'Ile kosztuje pozycjonowanie w AI (GEO)? Ceny agencji 2026',
    opis: 'Ceny pozycjonowania w AI (GEO) w Polsce: audyt, abonament i dopłata do SEO. Tabela cen agencji ze źródłami i nasz cennik.',
  },
  '/raporty-ai': {
    partia: 4, tydzien: 'W12', opublikowana: false, zbudowana: false, segment: 'strony-pl',
    warunek: 'PR-A: 3 pełne okna 4-tygodniowe pomiaru koszyka i D4; nazwy firm tylko po D3',
    tytul: 'Raporty AI SEO COMPANY: dane o widoczności firm w AI',
    opis: 'Comiesięczny Indeks poleceń AI: kogo polecają ChatGPT, Perplexity i Gemini i z jakich źródeł korzystają. Metoda, archiwum i dane CSV.',
  },
  '/raporty-ai/indeks-polecen-ai': {
    partia: 4, tydzien: 'W12', opublikowana: false, zbudowana: false, segment: 'strony-pl',
    warunek: 'PR-A: 3 pełne okna 4-tygodniowe pomiaru koszyka i D4; nazwy firm tylko po D3',
    tytul: 'Indeks poleceń AI: kogo polecają ChatGPT i Perplexity',
    opis: 'Co miesiąc pytamy ChatGPT, Perplexity i Gemini o agencje SEO i GEO: jak często polecają firmy, jakie źródła cytują. Metoda i dane CSV.',
  },
  '/porownania/agencja-seo-czy-freelancer': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'porownania',
    warunek: 'P4: indeksacja partii 4 ≥ 80%',
    tytul: 'Agencja SEO czy freelancer? Koszty, ryzyka i umowa',
    opis: 'Agencja SEO czy freelancer: koszt miesięczny, zastępowalność, dostęp do kont, umowa i raportowanie. Tabela i pytania przed wyborem.',
  },
  '/porownania/ranking-agencji-seo': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'porownania',
    warunek: 'P5: D3 (ranking z nazwami) i prawnik; partia 4 albo 5',
    tytul: null,
    opis: null,
  },
  // 11.11.2026: szablony do pobrania (lib/szablony), PDF przez panel /api/szablony.
  '/narzedzia/checklista-seo': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Checklista SEO: 50 punktów kontrolnych + szablon PDF",
    opis: "Checklista SEO w 50 punktach: technika, on-page, SEO lokalne, gotowość na AI i pomiar. Z priorytetami, przykładem wypełnienia i darmowym PDF.",
  },
  '/narzedzia/content-plan': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Content plan: szablon PDF i harmonogram publikacji SEO",
    opis: "Content plan dla bloga i strony firmy: szablon PDF z kalendarzem publikacji na 3 miesiące, backlogiem tematów i pomiarem w Search Console.",
  },
  '/narzedzia/szablon-analizy-konkurencji-seo': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Szablon analizy konkurencji SEO: wzór do pobrania (PDF)",
    opis: "Szablon analizy konkurencji SEO dla 5 konkurentów: Google, Mapy, odpowiedzi AI, treści, technika, linki i oferta. Skala ocen 0–2, przykład i wzór PDF.",
  },
  '/narzedzia/szablon-strategii-seo': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Strategia SEO: szablon strategii SEO na 12 miesięcy (PDF)",
    opis: "Strategia SEO w jednym dokumencie: cele, frazy i podstrony, plan treści na kwartały, technika, linki, AI i budżet. Darmowy szablon PDF do wypełnienia.",
  },
  '/narzedzia/brief-strony-internetowej': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Brief strony internetowej: wzór z częścią SEO do pobrania",
    opis: "Brief strony internetowej w PDF: 12 części z pytaniami, mapa strony, część SEO i przekierowania. Zobacz, jak go wypełnić, żeby szybciej dostać wycenę.",
  },
  '/narzedzia/checklista-migracji-strony': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Migracja strony: checklista SEO i mapa przekierowań (PDF)",
    opis: "Migracja strony krok po kroku: checklista przed, w dniu i po wdrożeniu, zmiana domeny i hostingu, wzór mapy przekierowań 301 i darmowy szablon PDF.",
  },
  // 12.11.2026: 8 nowych szablonów (title i description = pole seo.pl w lib/szablony/<slug>.js;
  // przy zmianie poprawić oba miejsca). Formularz działa po wdrożeniu panelu z tymi id (lib/szablony.ts).
  '/narzedzia/dobor-slow-kluczowych': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Jak dobrać słowa kluczowe: darmowy szablon mapy fraz (PDF)",
    opis: "Jak dobrać słowa kluczowe krok po kroku: źródła fraz, intencja, klastry po wynikach Google, mapa podstron i kanibalizacja. Darmowy szablon PDF.",
  },
  '/narzedzia/brief-dla-copywritera': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Brief dla copywritera: szablon briefu SEO do pobrania (PDF)",
    opis: "Brief dla copywritera w 10 częściach: cel, fraza i intencja, analiza TOP 5, konspekt, linki, ton i checklista odbioru tekstu. Przykład i darmowy PDF.",
  },
  '/narzedzia/szablon-audytu-tresci': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Audyt treści: szablon PDF i content pruning krok po kroku",
    opis: "Audyt treści strony w 7 krokach: lista adresów, dane z Search Console i GA4, ocena jakości i decyzja dla każdej podstrony. Darmowy szablon PDF.",
  },
  '/narzedzia/linkowanie-wewnetrzne': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Linkowanie wewnętrzne: plan i audyt linków (szablon PDF)",
    opis: "Linkowanie wewnętrzne krok po kroku: mapa klastrów, plan linków z tekstami kotwic, słownik anchorów i audyt stron osieroconych. Darmowy szablon PDF.",
  },
  '/narzedzia/checklista-e-e-a-t': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "E-E-A-T: checklista 36 punktów i szablon PDF do pobrania",
    opis: "E-E-A-T w praktyce: checklista 36 punktów o zaufaniu, autorach, treści, reputacji i YMYL. Ze sposobem sprawdzenia, przykładem i darmowym PDF.",
  },
  '/narzedzia/dane-strukturalne-json-ld': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Dane strukturalne: wzory JSON-LD schema.org do skopiowania",
    opis: "Dane strukturalne JSON-LD dla firmy: 7 wzorów schema.org (Organization, LocalBusiness, Article, Product i inne), zasady Google na 2026 i PDF.",
  },
  '/narzedzia/checklista-wizytowki-google': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: "Jak założyć wizytówkę Google: checklista krok po kroku (PDF)",
    opis: "Jak założyć wizytówkę Google i przejść weryfikację: checklista 40 punktów, karta danych NAP, przykład wypełnienia i darmowy szablon PDF do druku.",
  },
  '/narzedzia/zapytanie-ofertowe-seo': {
    partia: 7, tydzien: 'W11', opublikowana: true, segment: 'narzedzia-szablony',
    warunek: 'panel: id zapytanie-ofertowe-seo w lib/szablony.ts + 2 PDF w public/pliki (11.11.2026)',
    tytul: "Zapytanie ofertowe na SEO: wzór do wysłania agencjom (PDF)",
    opis: "Zapytanie ofertowe na pozycjonowanie: co wpisać, jak je napisać krok po kroku i jak porównać oferty agencji SEO. Przykład i darmowy wzór w PDF.",
  },
  '/narzedzia/umowa-na-pozycjonowanie': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'narzedzia-szablony',
    warunek: 'S2: D5 (przegląd prawny wzoru umowy)',
    tytul: 'Umowa na pozycjonowanie: wzór z komentarzem (2026)',
    opis: 'Wzór umowy na pozycjonowanie strony z komentarzem: okres wypowiedzenia, kary, dostęp do kont, własność treści i linków. PDF i DOCX.',
  },
  '/blog/przeglad-od-ai-jak-trafic-do-zrodel': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'blog-pl',
    warunek: 'B2: test lokalizacji i replikacja PR-B (W6)',
    tytul: 'Przegląd od AI w Google: co to jest i jak trafić do źródeł',
    opis: 'Jak działa przegląd od AI (AI Overviews) w Google, skąd bierze źródła i jak do nich trafić. Nasz pomiar 95 fraz: źródła a TOP 10 wyników.',
  },
  '/pozycjonowanie-sklepu-internetowego': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'strony-pl',
    warunek: 'K1: D2 (e-commerce); w partii 5 K1 albo M1',
    tytul: 'Pozycjonowanie sklepu internetowego: zakres, cena i pomiar',
    opis: 'Pozycjonowanie sklepu na Shoperze, PrestaShop i WooCommerce: kategorie, filtry, karty produktów i dane strukturalne. Umowa miesięczna.',
  },
  '/pozycjonowanie-stron-mazowsze': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'strony-pl',
    warunek: 'M1: D8 (strony miast); w partii 5 K1 albo M1',
    tytul: 'Pozycjonowanie stron na Mazowszu: Siedlce, Płock, Legionowo',
    opis: 'Pozycjonowanie stron dla firm z Mazowsza: Siedlce, Płock, Legionowo, Pruszków, Piaseczno, Otwock. Zespół z Warszawy, umowa miesięczna.',
  },
  '/blog/reklamy-w-chatgpt': {
    partia: 5, tydzien: 'W15', opublikowana: false, zbudowana: false, segment: 'blog-pl',
    warunek: 'decyzja o usłudze kampanii ChatGPT Ads',
    tytul: 'Reklamy w ChatGPT (ChatGPT Ads): co wiemy i dla kogo są',
    opis: 'Reklamy w ChatGPT: co OpenAI ogłosiło o formatach, oznaczeniu i kierowaniu, czym różnią się od pozycjonowania w AI i kiedy je testować.',
  },
};

const HOST = /^https?:\/\/(?:www\.)?ai-seo-company\.pl(?=\/|$)/;

/**
 * Ścieżka bez kotwicy, parametrów i końcowego '/'. Pełny adres serwisu skraca do ścieżki;
 * adres innego hosta zwraca null (link zewnętrzny - bramka go nie dotyczy).
 */
function normalizuj(href) {
  if (typeof href !== 'string') return null;
  let s = href.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    if (!HOST.test(s)) return null;
    s = s.replace(HOST, '') || '/';
  }
  s = s.split('#')[0].split('?')[0];
  if (s.length > 1 && s.endsWith('/')) s = s.replace(/\/+$/, '') || '/';
  return s || '/';
}

/**
 * Czy strona jest publiczna (200, sitemapa, linki).
 * - ścieżka spoza rejestru (istniejące strony, linki zewnętrzne) -> true,
 * - wpis z zbudowana: false -> false zawsze (także w podglądzie),
 * - inaczej opublikowana === true albo PODGLAD_PARTII.
 * Przyjmuje href z kotwicą i parametrami: czyOpublikowana('/porownania/seo-vs-geo#zrodla').
 */
export function czyOpublikowana(href) {
  const sciezka = normalizuj(href);
  if (sciezka === null) return true;
  const wpis = PUBLIKACJA[sciezka];
  if (!wpis) return true;
  if (wpis.zbudowana === false) return false;
  return wpis.opublikowana === true || PODGLAD_PARTII;
}

/**
 * href (bez zmian, z kotwicą) albo null. Reguła 6.0: komponent renderuje null jako zwykły
 * tekst bez <a> (w kartach bez strzałki), np.
 *   const h = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt#zrodla');
 *   return h ? <Link href={h}>{tekst}</Link> : <span>{tekst}</span>;
 */
export function hrefJesliOpublikowana(href) {
  if (typeof href !== 'string' || !href) return null;
  return czyOpublikowana(href) ? href : null;
}

/** Posortowane ścieżki z rejestru, które przechodzą czyOpublikowana i zaczynają się od prefiksu. */
export function opublikowaneSciezki(prefiks = '') {
  return Object.keys(PUBLIKACJA)
    .filter((p) => p.startsWith(prefiks) && czyOpublikowana(p))
    .sort();
}

/**
 * Slugi opublikowanych stron bezpośrednio pod prefiksem (generateStaticParams, ItemList huba):
 * slugiOpublikowane('/porownania/') -> ['pozycjonowanie-za-efekt-czy-abonament', 'seo-vs-geo'].
 * Prefiks bez końcowego '/' dostaje go automatycznie; sam hub nie jest slugiem.
 */
export function slugiOpublikowane(prefiks) {
  const p = prefiks.endsWith('/') ? prefiks : `${prefiks}/`;
  return opublikowaneSciezki(p)
    .map((s) => s.slice(p.length))
    .filter((slug) => slug && !slug.includes('/'));
}

/** Wpis rejestru z polem sciezka i domyślnym zbudowana: true albo null (strona spoza rejestru). */
export function wpisPublikacji(href) {
  const sciezka = normalizuj(href);
  const wpis = sciezka === null ? undefined : PUBLIKACJA[sciezka];
  return wpis ? { sciezka, zbudowana: true, ...wpis } : null;
}
