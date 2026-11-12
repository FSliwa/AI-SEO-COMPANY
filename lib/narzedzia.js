// Hub „Narzędzia i szablony” (/narzedzia) i jego strony (PLAN-v2 6.9–6.11; CB-13, CS-03, CB-09,
// CB-18, CB-07, CB-08, CB-17; 5.11.2026). Partia 3 (W9), za bramką lib/publikacja.js: dopóki flaga
// opublikowana = false, hub i strony dają 404, a linki do nich renderują się jako zwykły tekst.
//
// Jeden hub zamiast dwóch (/narzedzia + /szablony, CB-13/CS-03): szablony mieszkają pod
// /narzedzia/<slug> i w sekcji #szablony huba. 308 /szablony -> /narzedzia#szablony dopiero w dniu
// publikacji partii 3 (next.config.mjs, Integracja).
//
// Tytuły i opisy (title/meta) NIE są tutaj: jedno źródło = PUBLIKACJA w lib/publikacja.js
// (wpisPublikacji(sciezka).tytul / .opis), z którego korzystają też nawigacja i llms.txt.
// Ten plik importują tylko komponenty serwerowe i page.js (do bundla klienta trafiają propsy).

import { hrefJesliOpublikowana, wpisPublikacji, SPRAWDZARKA_DZIALA } from './publikacja';
import { CHECKLIST_COUNT } from './agencySwitch';
import { sectionId } from './anchors';
import { ZRODLA_KALKULATORA } from './kalkulatorStrat';

import { SZABLONY } from './szablony';
import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, WIDOCZNOSC, listaSilnikow } from './narzedziaLiczby';
export const BASE = 'https://www.ai-seo-company.pl';
export const SCIEZKA_HUBA = '/narzedzia';

// Sprawdzarka widoczności w AI (T0.2): na produkcji 5.11.2026 API panelu (/api/ai-check) zwraca 503,
// bo w Vercel panelu brak kluczy DataForSEO. Do naprawy karta huba ma stan „wkrótce” bez linku,
// a N1 i S1 nie linkują do sprawdzarki (CB-07, CB-13). Po T0.2 (curl POST /api/ai-check ≠ 503)
// zmienić na true - karty i linki włączą się same. Sama strona /sprawdz-widocznosc-w-ai działa (200).
// Integracja 5.11.2026: flaga jest jedna, w lib/publikacja.js (tu tylko reeksport).
export { SPRAWDZARKA_DZIALA };
export const SCIEZKA_SPRAWDZARKI = '/sprawdz-widocznosc-w-ai';

/** href sprawdzarki albo null (reguła 6.0: null = zwykły tekst bez <a>). */
export function hrefSprawdzarki() {
  return SPRAWDZARKA_DZIALA ? SCIEZKA_SPRAWDZARKI : null;
}

// Audyt widoczności w AI za 990 zł: A5 (partia 2), a do jej publikacji sekcja cen huba GEO.
export function hrefAudytuAi() {
  return hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci') ?? `/pozycjonowanie-w-ai#${sectionId('ileKosztuje', 'pl')}`;
}

// Okruszki: jedna etykieta rodzica na N1 i S1 (PLAN-v2 6.10: „Strona główna › Narzędzia › …”).
export const RODZIC_OKRUSZKOW = { href: SCIEZKA_HUBA, pl: 'Narzędzia', en: 'Tools' };

// Strony pod /narzedzia/[slug]. Każdy wpis: sources[] (URL + data odczytu) i updated (PLAN-v2 6.0).
// opublikowano = data pierwszego wdrożenia (datePublished w JSON-LD). Integracja wpisuje ją
// w dniu publikacji partii 3 (ta sama data co pierwszy LASTMOD); do tego czasu null.
// updated = data ostatniej realnej zmiany treści; widoczna data i dateModified biorą LASTMOD.
export const STRONY_NARZEDZI = [
  {
    slug: 'generator-llms-txt',
    typ: 'narzedzie',
    okruszek: 'Generator llms.txt',
    h1: 'Generator llms.txt i test dostępu botów AI do Twojej strony',
    opublikowano: null,
    updated: '2026-11-05',
    sources: [
      { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file, v2 (specyfikacja formatu)', data: '2026-11-05' },
      { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What is llms.txt (analiza 137 000 domen, wypowiedź Johna Muellera)', data: '2026-11-05' },
      { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)', data: '2026-11-05' },
      { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google: Google-Extended w dokumentacji crawlerów', data: '2026-11-05' },
      { url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', nazwa: 'Anthropic: ClaudeBot, Claude-SearchBot i Claude-User', data: '2026-11-05' },
      { url: 'https://docs.perplexity.ai/guides/bots', nazwa: 'Perplexity: PerplexityBot i Perplexity-User', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/wordpress-seo/', nazwa: 'Katalog wtyczek WordPress.org: Yoast SEO (wersja 28.8)', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/seo-by-rank-math/', nazwa: 'Katalog wtyczek WordPress.org: Rank Math SEO (wersja 1.0.281)', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/all-in-one-seo-pack/', nazwa: 'Katalog wtyczek WordPress.org: All in One SEO (wersja 5.0.5)', data: '2026-11-05' },
    ],
  },
  {
    slug: 'raport-seo',
    typ: 'szablon',
    okruszek: 'Raport SEO',
    h1: 'Raport SEO: co powinien zawierać i wzór do pobrania',
    opublikowano: null,
    updated: '2026-11-11',
    // Struktura raportu z playbooka SEO (zał. E) i demo panelu klienta. 11.11.2026: fakty o Google
    // (filtr marki, 16 miesięcy danych, zgoda w GA4, przegląd od AI w GSC, progi CWV, Profil Firmy)
    // ze źródłami poniżej; kolejność = kolejność nazw EN w lib/narzedziaGeneratorRaport.en.js
    // i lib/narzedzia.en.js (STRONY_EN['raport-seo'].zrodla).
    sources: [
      { url: 'https://support.google.com/analytics/answer/13965727', nazwa: 'Pomoc Google Analytics: zdarzenia kluczowe', data: '2026-11-11' },
      { url: 'https://support.google.com/analytics/answer/11161109', nazwa: 'Pomoc Google Analytics: modelowanie behawioralne w trybie zgody (zdarzenia osób bez zgody i progi ruchu)', data: '2026-11-11' },
      { url: 'https://developers.google.com/search/blog/2025/11/search-console-branded-filter', nazwa: 'Google Search Central: filtr zapytań z marką w Search Console (20.11.2025, aktualizacja 11.03.2026)', data: '2026-11-11' },
      { url: 'https://support.google.com/analytics/answer/13682862', nazwa: 'Pomoc Google Analytics: raport Zapytania (Search Console przechowuje dane z ostatnich 16 miesięcy)', data: '2026-11-11' },
      { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: funkcje AI w wyszukiwarce a Twoja witryna (dane w raporcie Skuteczność)', data: '2026-11-11' },
      { url: 'https://support.google.com/business/answer/9918094', nazwa: 'Pomoc Profilu Firmy w Google: skuteczność profilu (połączenia, wskazówki dojazdu, kliknięcia prowadzące do witryny)', data: '2026-11-11' },
      { url: 'https://status.search.google.com/', nazwa: 'Google Search Status Dashboard: potwierdzone aktualizacje rankingu', data: '2026-11-11' },
      { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals (progi LCP, INP i CLS, 75. percentyl)', data: '2026-11-11' },
      { url: 'https://support.google.com/webmasters/answer/7440203?hl=pl', nazwa: 'Pomoc Search Console: raport Indeksowanie stron', data: '2026-11-11' },
      { url: 'https://developers.google.com/speed/docs/insights/v5/about', nazwa: 'Google: PageSpeed Insights (dane laboratoryjne z Lighthouse i dane od użytkowników z CrUX)', data: '2026-11-11' },
    ],
  },
];

// 9.11.2026: cztery darmowe aplikacje z bramką e-mail (StronyAplikacji.jsx, backend w panelu
// /api/narzedzia/*). Za bramką publikacji do wdrożenia panelu i kluczy API (AHREFS_API_KEY,
// PAGESPEED_API_KEY, saldo DataForSEO i Anthropic).
const ZRODLO_PSI = { url: 'https://developers.google.com/speed/docs/insights/v5/about', nazwa: 'Google: PageSpeed Insights API v5 (Lighthouse i dane Chrome UX Report)', data: '2026-11-09' };
STRONY_NARZEDZI.push(
  {
    slug: 'audyt-seo', typ: 'narzedzie', okruszek: 'Darmowy audyt SEO',
    h1: 'Darmowy audyt SEO strony: ocena 1-100 i lista błędów do naprawy',
    opublikowano: null, updated: '2026-11-09',
    sources: [
      ZRODLO_PSI,
      { url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro', nazwa: 'Google Search Central: wprowadzenie do robots.txt', data: '2026-11-09' },
      { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)', data: '2026-11-09' },
    ],
  },
  {
    slug: 'autorytet-domeny', typ: 'narzedzie', okruszek: 'Autorytet domeny',
    // 12.11.2026: wynik z grafu linków Common Crawl zamiast DR Ahrefs (decyzja właściciela: bez klucza i konta).
    h1: 'Sprawdź autorytet domeny za darmo: wynik 0‑100 z grafu linków i porównanie z konkurencją', // 0‑100: twardy łącznik, bez łamania
    opublikowano: null, updated: '2026-11-12',
    sources: [
      { url: 'https://data.commoncrawl.org/projects/hyperlinkgraph/cc-main-2026-aug-sep-oct/index.html', nazwa: 'Common Crawl: grafy hostów i domen z crawli sierpień-październik 2026 (wydanie cc-main-2026-aug-sep-oct, 135,0 mln domen, 1,8 mld krawędzi)', data: '2026-11-12' },
      { url: 'https://commoncrawl.org/web-graphs', nazwa: 'Common Crawl: Web Graphs (wydania grafu i rankingi domen: harmonic centrality i PageRank)', data: '2026-11-12' },
      { url: 'https://commoncrawl.org/terms-of-use', nazwa: 'Common Crawl: Terms of Use (wersja z 7.03.2024)', data: '2026-11-12' },
      { url: 'https://arxiv.org/abs/1308.2140', nazwa: 'Paolo Boldi, Sebastiano Vigna: Axioms for Centrality (arXiv:1308.2140, Internet Mathematics 2014)', data: '2026-11-12' },
      { url: 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr', nazwa: 'Ahrefs Help: What is Domain Rating (DR)', data: '2026-11-11' },
      { url: 'https://moz.com/learn/seo/domain-authority', nazwa: 'Moz: What is Domain Authority', data: '2026-11-12' },
      { url: 'https://moz.com/top500', nazwa: 'Moz: Top 500 domen (porównanie z naszym wynikiem na 441 dopasowanych domenach)', data: '2026-11-12' },
    ],
  },
  {
    slug: 'kalkulator-strat-seo', typ: 'narzedzie', okruszek: 'Kalkulator strat bez SEO',
    h1: 'Kalkulator SEO: ile zysku tracisz bez SEO i widoczności w AI', // 12.11.2026: + „SEO” (intencja „kalkulator seo”), reszta bez zmian
    opublikowano: null, updated: '2026-11-09',
    sources: ZRODLA_KALKULATORA,
  },
  {
    slug: 'makieta-redesignu', typ: 'narzedzie', okruszek: 'Makieta nowej strony',
    h1: 'Makieta nowej strony z AI: zobacz redesign swojej strony za darmo',
    opublikowano: null, updated: '2026-11-09',
    sources: [],
  },
);

// 11.11.2026: szablony do pobrania (lib/szablony/*.js) jako strony /narzedzia/<slug>.
STRONY_NARZEDZI.push(
  ...SZABLONY.map((d) => ({ slug: d.slug, typ: 'szablon', okruszek: d.pl.okruszek, h1: d.pl.h1, opublikowano: d.opublikowano ?? null, updated: d.updated, sources: d.pl.zrodla || [] }))
);

export function stronaNarzedzia(slug) {
  return STRONY_NARZEDZI.find((s) => s.slug === slug) || null;
}

/** Title i meta strony z rejestru publikacji (jedno źródło prawdy). */
export function metaStrony(sciezka) {
  const w = wpisPublikacji(sciezka);
  return { title: w?.tytul ?? undefined, description: w?.opis ?? undefined };
}

// 11.11.2026: wszystkie szablony PDF (także wzór raportu SEO) wysyła panel przez /api/szablony
// (repo panelu: lib/szablony.ts, lista dozwolonych plików; ChecklistForm z propem plik).
export const ENDPOINT_SZABLONOW = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/szablony`;
export const ENDPOINT_WZORU_RAPORTU = ENDPOINT_SZABLONOW;

// --- Hub: karty narzędzi i szablonów ------------------------------------------------------------
// S1-poprawki Z-H5, Z-H6 (12.11.2026): kolejność audyt → widoczność w AI → kalkulator → makieta →
// generator llms.txt → autorytet (najszersza fraza pierwsza), grupa 'seo' | 'ai' (dwa H3 w hubie),
// odRazu / poEmailu = co narzędzie pokazuje bez e-maila i po nim (stan po decyzjach właściciela
// z 12.11: Z-W9 5 firm i 5 domen przed bramką, Z-K5/K6/K7 kalkulator bez bramki, autorytet
// z porównaniem bez e-maila). Liczby: lib/narzedziaLiczby.js (limity = panel wspolne.ts LIMITY,
// generator = app/api/llms-txt/route.js). Liczba punktów checklisty = lib/agencySwitch.js.
// Nowe aplikacje (9.11.2026) pokazujemy w hubie dopiero po publikacji, bez zapowiedzi „Wkrótce”.
const KARTY_PO_PUBLIKACJI = new Set(['audyt-seo', 'autorytet-domeny', 'kalkulator-strat-seo', 'makieta-redesignu']);

export function kartyHuba() {
  return [
    {
      id: 'audyt-seo',
      sekcja: 'narzedzia',
      grupa: 'seo',
      nazwa: 'Darmowy audyt SEO',
      opis: `Sprawdza do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach: technika, treść, szybkość na telefonie i gotowość na AI. Ocena 1-100 i lista błędów z instrukcją naprawy. Do ${AUDYT.limitIp} audytów dziennie z jednego adresu IP.`,
      odRazu: `ocena 1-100, wynik ${AUDYT.kategorii} kategorii, 4 wyniki PageSpeed Insights na telefonie i 3 najważniejsze problemy z instrukcją naprawy`,
      poEmailu: 'wszystkie problemy z adresami podstron i raport, który przekażesz programiście',
      href: hrefJesliOpublikowana('/narzedzia/audyt-seo'),
      cta: 'Sprawdź swoją stronę',
    },
    {
      id: 'sprawdzarka-ai',
      sekcja: 'narzedzia',
      grupa: 'ai',
      nazwa: 'Widoczność w AI: sprawdź, czy ChatGPT poleca Twoją firmę',
      opis: `Sprawdzamy, czy ${listaSilnikow('pl')} wymieniają Twoją firmę w odpowiedziach na ${WIDOCZNOSC.pytan} pytania klientów, i pokazujemy, z jakich stron korzystają modele. Do ${WIDOCZNOSC.limitIp} firm dziennie z jednego adresu IP.`,
      odRazu: `ocena 0-100, siatka „wymieniona / niewymieniona” dla każdego silnika i pytania, ${WIDOCZNOSC.przedBramka.firm} firm, które modele wymieniają, i ${WIDOCZNOSC.przedBramka.domen} najczęściej cytowanych domen`,
      poEmailu: 'pełne odpowiedzi modeli, wszystkie wymienione firmy, źródła przy każdej odpowiedzi i raport na skrzynkę',
      href: hrefSprawdzarki(),
      cta: 'Sprawdź za darmo',
    },
    {
      id: 'kalkulator-strat-seo',
      sekcja: 'narzedzia',
      grupa: 'seo',
      nazwa: 'Kalkulator strat bez SEO i AI',
      opis: 'Z Twoich danych, badań CTR w Google i badań kliknięć z odpowiedzi AI liczy, ile zysku miesięcznie trafia do konkurencji, gdy nie ma Cię w TOP 3 Google i w odpowiedziach AI. Wynik od razu, w przeglądarce.',
      odRazu: 'cały wynik na żywo: strata w Google i w odpowiedziach AI, liczba klientów miesięcznie oraz koszt SEO (pakiet z cennika albo Twoja kwota) i miesiąc zwrotu',
      poEmailu: 'zestawienie z założeniami i źródłami na skrzynkę (wynik widzisz bez tego)',
      href: hrefJesliOpublikowana('/narzedzia/kalkulator-strat-seo'),
      cta: 'Policz stratę',
    },
    {
      id: 'makieta-redesignu',
      sekcja: 'narzedzia',
      grupa: 'seo',
      nazwa: 'Makieta nowej strony',
      opis: `Wpisz adres strony, a AI w ${MAKIETA.minut} minuty zaprojektuje z jej treści nową stronę główną na komputer i telefon. Pierwszy ekran od razu, bez konta. Do ${MAKIETA.limitIp} makiet dziennie z jednego adresu IP.`,
      odRazu: 'zrzut obecnej strony głównej obok pierwszego ekranu nowej: nagłówka z menu i sekcji powitalnej',
      poEmailu: 'cała makieta (4-6 sekcji i stopka) na komputer i telefon oraz link ważny 60 dni',
      href: hrefJesliOpublikowana('/narzedzia/makieta-redesignu'),
      cta: 'Zobacz makietę',
    },
    {
      id: 'generator-llms-txt',
      sekcja: 'narzedzia',
      grupa: 'ai',
      nazwa: 'Generator llms.txt',
      opis: `Tworzy cały plik llms.txt z mapy strony, z sekcjami i opisem każdego linku, i sprawdza dostęp ${GENERATOR.botow} botów AI, m.in. GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot. Bez rejestracji i e-maila. Do ${GENERATOR.limitIp} sprawdzeń dziennie z jednego adresu IP.`,
      odRazu: `cały plik llms.txt do pobrania, ocena istniejącego pliku i test ${GENERATOR.botow} botów AI`,
      poEmailu: null,
      href: hrefJesliOpublikowana('/narzedzia/generator-llms-txt'),
      cta: 'Wygeneruj llms.txt',
    },
    {
      id: 'autorytet-domeny',
      sekcja: 'narzedzia',
      grupa: 'seo',
      nazwa: 'Autorytet domeny',
      // Z-D1 pkt 4 (12.11.2026); porównanie bez e-maila = decyzja właściciela. Wynik z grafu Common Crawl, nie DR.
      opis: `Wynik autorytetu domeny 0-100 z publicznego grafu linków Common Crawl, miejsce wśród domen .pl i porównanie z maksymalnie trzema konkurentami. Bez rejestracji, do ${AUTORYTET.limitIp} sprawdzeń dziennie z jednego adresu IP.`,
      odRazu: `wynik 0-100 Twojej domeny, miejsce wśród domen .pl i porównanie z maksymalnie ${AUTORYTET.konkurentow} konkurentami`,
      poEmailu: 'raport z planem działań na skrzynkę',
      href: hrefJesliOpublikowana('/narzedzia/autorytet-domeny'),
      cta: 'Sprawdź autorytet',
    },
    {
      id: 'wzor-raportu-seo',
      sekcja: 'szablony',
      nazwa: 'Wzór raportu SEO (PDF)',
      opis: 'Pięć sekcji miesięcznego raportu z przykładami: wynik względem celu, przyczyny, wykonane prace, plan i ryzyka. Wysyłamy e-mailem.',
      href: hrefJesliOpublikowana('/narzedzia/raport-seo'),
      cta: 'Zobacz, co zawiera raport',
    },
    {
      id: 'checklista-zmiany-agencji',
      sekcja: 'szablony',
      nazwa: 'Checklista zmiany agencji SEO (PDF)',
      opis: `${CHECKLIST_COUNT} punkty: konta Google, domena, treści, linki i dane, które trzeba odebrać od poprzedniej agencji. Wysyłamy e-mailem.`,
      href: '/zmiana-agencji-seo#checklista',
      cta: 'Pobierz checklistę',
    },
    // 11.11.2026: szablony z lib/szablony (karta dopiero po publikacji strony).
    ...SZABLONY.map((d) => ({ id: `szablon-${d.slug}`, sekcja: 'szablony', nazwa: d.pl.karta.nazwa, opis: d.pl.karta.opis, href: hrefJesliOpublikowana(`/narzedzia/${d.slug}`), cta: d.pl.karta.cta, poPublikacji: true })),
  ].filter((k) => (!KARTY_PO_PUBLIKACJI.has(k.id) && !k.poPublikacji) || k.href);
}

// --- FAQ (gotowe teksty z briefów; FAQPage z AppleFaq) -----------------------------------------

// Hub: brief N1 p. 3 (FAQ 3, dodane 5.11). Link „audyt SEO” tylko z huba (strona chroniona).
// S1-poprawki Z-H4 (12.11.2026): FAQ 3 → 6, liczby ze stałych (lib/narzedziaLiczby.js). Autorytet
// domeny pojawia się w odpowiedziach dopiero po publikacji jego strony (ten sam warunek co karta).
// Kolejność i treść = lib/narzedzia.en.js faqHubaL (EN).
export const AUTORYTET_OPUBLIKOWANY = Boolean(hrefJesliOpublikowana('/narzedzia/autorytet-domeny'));
const SILNIKI_FAQ = WIDOCZNOSC.grok ? 'ChatGPT, Gemini, Perplexity, Claude, Grok i Google' : 'ChatGPT, Gemini, Perplexity, Claude i Google';

export const FAQ_HUBA = [
  {
    id: 'czy-narzedzia-sa-darmowe',
    question: 'Czy narzędzia są naprawdę darmowe?',
    answer: `Tak. Wszystkie narzędzia działają bez opłat i bez zakładania konta. Dzienne limity na jeden adres IP chronią przed nadużyciami i kosztami zapytań do modeli: ${AUDYT.limitIp} audytów SEO, ${WIDOCZNOSC.limitIp} firmy w sprawdzarce widoczności w AI, ${MAKIETA.limitIp} makiety${AUTORYTET_OPUBLIKOWANY ? `, ${AUTORYTET.limitIp} sprawdzeń autorytetu domeny` : ''} i ${GENERATOR.limitIp} sprawdzeń w generatorze llms.txt. Kalkulator liczy wynik w Twojej przeglądarce. Wzory PDF wysyłamy e-mailem i nie zapisujemy adresu na listę mailingową.`,
  },
  {
    id: 'jakie-dane-podaje',
    question: 'Jakie dane podaję i co się z nimi dzieje?',
    answer: 'Audyt SEO, makieta i generator llms.txt potrzebują tylko adresu strony. Sprawdzarka widoczności w AI prosi o nazwę firmy i branżę, a miasto i stronę możesz dodać. Kalkulator liczy w przeglądarce i niczego nie wysyła, dopóki nie poprosisz o zestawienie e-mailem. E-mail podajesz tylko wtedy, gdy chcesz pełny wynik, raport na skrzynkę albo wzór PDF. Zapisane wyniki usuwamy po 60 dniach, a generator llms.txt niczego nie zapisuje. Szczegóły są w <a href="/cookies" style="text-decoration:underline">polityce prywatności</a>.',
  },
  {
    id: 'czy-narzedzia-zastepuja-audyt-seo',
    question: 'Czy narzędzia zastępują audyt SEO?',
    answer: `Nie. Darmowy audyt sprawdza automatycznie próbkę do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach, a pozostałe narzędzia pojedyncze elementy: obecność w odpowiedziach AI, plik llms.txt, wygląd strony głównej. <a href="/audyt-seo" style="text-decoration:underline">Audyt SEO</a> obejmuje całą stronę: indeksację, treści, linki, szybkość i konkurencję, a jego wynikiem jest lista zmian z priorytetami.`,
  },
  {
    id: 'skad-dane',
    question: 'Skąd narzędzia biorą dane?',
    answer: `Audyt czyta Twoją stronę naszym robotem AISEOCompanyAudit i pobiera wynik z Google PageSpeed Insights. Sprawdzarka pyta na żywo ${SILNIKI_FAQ} przez ich API. Kalkulator liczy z Twoich liczb i z badań, które podajemy na jego stronie ze źródłem i datą odczytu. Makietę projektuje model Claude z treści Twojej strony. Generator czyta mapę strony i robots.txt.${AUTORYTET_OPUBLIKOWANY ? ' Autorytet domeny to nasz wynik 0-100 liczony z publicznego grafu linków Common Crawl.' : ''}`,
  },
  {
    id: 'czego-nie-zrobia',
    question: 'Czego darmowe narzędzia nie zrobią?',
    answer: `Nie sprawdzają ${AUTORYTET_OPUBLIKOWANY ? 'poszczególnych linków prowadzących do strony (autorytet domeny to jedna liczba)' : 'linków prowadzących do strony'}, fraz, pozycji w Google ani danych z Search Console. Audyt bierze próbkę do ${AUDYT.stron} podstron, a sprawdzarka zadaje ${WIDOCZNOSC.pytan} pytania, więc wynik to migawka, a nie pełny obraz. Pełny obraz daje audyt SEO albo audyt widoczności w AI.`,
  },
  {
    id: 'od-czego-zaczac',
    question: 'Od którego narzędzia zacząć?',
    answer: 'Od darmowego audytu SEO: pokaże, czy strona nie ma błędów, które przeszkadzają Google i botom AI. Potem sprawdź widoczność w AI, a kalkulatorem policz, ile te braki mogą kosztować. Makieta przyda się, gdy planujesz nową stronę.',
  },
];

// N1: brief N1 p. 2 (FAQ 5). Odpowiedź 2 uzupełniona o podkatalogi: specyfikacja v2 (llmstxt.org,
// odczyt 5.11.2026) dopuszcza /docs/llms.txt dla adresów pod tą ścieżką. Odpowiedź 3: llms-full.txt
// to zwyczaj, nie część specyfikacji (nie ma go na llmstxt.org).
export const FAQ_GENERATORA = [
  {
    id: 'llms-txt-a-robots-txt',
    question: 'Czy llms.txt zastępuje robots.txt?',
    answer: 'Nie. robots.txt mówi botom, czego nie wolno pobierać, i boty wyszukiwarek oraz AI go respektują. llms.txt to dobrowolny spis najważniejszych podstron w formacie Markdown, bez mocy blokowania. Jeśli w robots.txt zablokujesz OAI-SearchBot, żaden llms.txt nie sprawi, że ChatGPT zacytuje Twoją stronę.',
  },
  {
    id: 'gdzie-umiescic-llms-txt',
    question: 'Gdzie umieścić plik llms.txt?',
    answer: 'W katalogu głównym domeny, tak żeby otwierał się pod adresem twojadomena.pl/llms.txt i zwracał kod 200 jako zwykły tekst. Specyfikacja dopuszcza też plik w podkatalogu, np. /docs/llms.txt, ale opisuje on tylko adresy pod tą ścieżką. Plik za przekierowaniem łatwo przeoczyć. Po wdrożeniu otwórz adres w przeglądarce i sprawdź go w generatorze.',
  },
  {
    id: 'llms-txt-a-llms-full-txt',
    question: 'Czym różni się llms.txt od llms-full.txt?',
    answer: 'llms.txt to spis: tytuły podstron z linkami i krótkimi opisami. llms-full.txt to zwyczajowa nazwa pliku z pełną treścią tych podstron w jednym dokumencie Markdown; specyfikacja llmstxt.org go nie opisuje. Pełna wersja ma sens przy dokumentacji technicznej, z której korzystają asystenci programistów. Dla strony firmowej z kilkudziesięcioma podstronami wystarczy spis.',
  },
  {
    id: 'czy-blokowac-gptbot',
    question: 'Czy blokować GPTBot w robots.txt?',
    answer: 'To decyzja biznesowa. GPTBot zbiera dane do trenowania modeli OpenAI, a OAI-SearchBot indeksuje strony na potrzeby wyszukiwania w ChatGPT. Możesz zablokować pierwszego i wpuścić drugiego. Jeśli zależy Ci na obecności w odpowiedziach ChatGPT, nie blokuj OAI-SearchBot.',
  },
  {
    id: 'czy-google-uzywa-llms-txt',
    question: 'Czy Google używa llms.txt?',
    answer: 'Nie w wyszukiwarce. Przedstawiciele Google mówili publicznie, że plik nie służy do wyszukiwania, a dostęp Gemini do treści kontroluje się wpisem Google-Extended w robots.txt. llms.txt nie poprawi pozycji w Google ani nie zapewni miejsca w przeglądzie AI.',
  },
];

// S1: brief S1 (FAQ 4). Odpowiedź 4 bez zdania o sprawdzarce, dopóki API nie działa (CB-07);
// link do strony audytu (chronionej) tylko z S1. 11.11.2026: odpowiedzi 3 i 4 wydłużone do 40-80 słów,
// odpowiedź 4 linkuje do darmowego audytu /narzedzia/audyt-seo (przez bramkę publikacji).
export function faqRaportu() {
  const sprawdzarka = hrefSprawdzarki();
  const darmowyAudyt = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  return [
    {
      id: 'co-to-jest-raport-seo',
      question: 'Co to jest raport SEO?',
      answer: 'Raport SEO to dokument, w którym agencja albo specjalista pokazuje, co dało pozycjonowanie w danym okresie: zapytania od klientów, ruch z Google, pozycje fraz i wykonane prace. Nie myl go z audytem SEO, czyli jednorazową diagnozą strony z listą błędów do naprawy.',
    },
    {
      id: 'jak-czesto-raport-seo',
      question: 'Jak często agencja powinna wysyłać raport SEO?',
      answer: 'Raz w miesiącu wystarczy na syntezę, bo efekty SEO zmieniają się w tygodniach, a nie w dniach. Dane bieżące, takie jak pozycje i zapytania, powinny być dostępne stale w panelu albo dashboardzie. Porównuj miesiące rok do roku, żeby nie pomylić sezonowości z efektem pracy.',
    },
    {
      id: 'raport-z-narzedzia',
      question: 'Czy raport z narzędzia, np. Senuto, wystarczy?',
      answer: 'Nie. Raport z narzędzia pokazuje widoczność i pozycje, ale nie mówi, ile zapytań przyszło z Google, co agencja zrobiła i dlaczego wynik się zmienił. Każde narzędzie liczy też widoczność po swojemu, na własnej bazie fraz, więc jego wykresu nie porównasz wprost z innym źródłem. Dane z narzędzi są dobrym załącznikiem do raportu, a nie jego treścią.',
    },
    {
      id: 'darmowy-raport-seo-strony',
      question: 'Gdzie dostanę darmowy raport SEO mojej strony?',
      answer: `Jeśli chcesz ocenić stronę, a nie pracę agencji, potrzebujesz audytu SEO.${darmowyAudyt ? ` Stronę sprawdzisz w naszym <a href="${darmowyAudyt}" style="text-decoration:underline">darmowym audycie SEO</a>: do 25 podstron, ocena od 1 do 100 i lista błędów z instrukcją naprawy.` : ''} Pełny audyt wykonywany przez specjalistę obejmuje całą stronę: indeksację, treści, linki, szybkość i konkurencję. Zakres i cenę opisujemy na stronie <a href="/audyt-seo" style="text-decoration:underline">audytu SEO</a>.${sprawdzarka ? ` Bezpłatnie możesz też <a href="${sprawdzarka}" style="text-decoration:underline">sprawdzić, czy ChatGPT poleca Twoją firmę</a>.` : ''}`,
    },
  ];
}
