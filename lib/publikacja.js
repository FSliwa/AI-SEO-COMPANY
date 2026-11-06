// Bramka publikacji nowych stron (PLAN-v2 8.1, 8.2; fundament wdrożenia 5.11.2026).
// JEDNO źródło prawdy: czy strona z planu jest już publiczna. Czysty ESM bez importów
// i bez aliasu @/ - działa w komponentach serwerowych i klienckich, w sitemapie
// (lib/sitemapEntries.js) i w skryptach node.
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
export const SPRAWDZARKA_DZIALA = false;

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
    tytul: 'Darmowe narzędzia SEO i AI: llms.txt, ChatGPT, raport SEO',
    opis: 'Darmowe narzędzia i szablony SEO i AI od AI SEO COMPANY: generator llms.txt, sprawdzarka widoczności w AI, wzór raportu SEO i checklista.',
  },
  '/narzedzia/generator-llms-txt': {
    partia: 3, tydzien: 'W9', opublikowana: true, segment: 'narzedzia-szablony',
    tytul: 'Generator llms.txt za darmo i test dostępu botów AI',
    opis: 'Wygeneruj llms.txt z mapy strony i sprawdź, czy GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot mają dostęp. Za darmo, bez rejestracji.',
  },
  '/narzedzia/raport-seo': {
    partia: 3, tydzien: 'W9', opublikowana: false, segment: 'narzedzia-szablony',
    warunek: 'endpoint /api/wzor-raportu w repo panelu',
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
