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
    updated: '2026-11-05',
    // Treść opiera się na strukturze raportu z playbooka SEO (zał. E) i na demo panelu klienta;
    // bez liczb rynkowych, więc bez listy źródeł na stronie.
    sources: [],
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
    h1: 'Sprawdź autorytet domeny za darmo: Domain Rating (DR) i porównanie z konkurencją',
    opublikowano: null, updated: '2026-11-09',
    sources: [
      { url: 'https://docs.ahrefs.com/en/api/reference/public/get-domain-rating-free', nazwa: 'Ahrefs API: Domain rating free (bezpłatny endpoint, wymagany podpis „Domain Rating by Ahrefs”)', data: '2026-11-09' },
      { url: 'https://ahrefs.com/legal/domain-rating-license', nazwa: 'Ahrefs: Domain Rating License', data: '2026-11-09' },
    ],
  },
  {
    slug: 'kalkulator-strat-seo', typ: 'narzedzie', okruszek: 'Kalkulator strat bez SEO',
    h1: 'Kalkulator: ile zysku tracisz bez SEO i widoczności w AI',
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

// --- Hub: 4 karty (teksty z briefu N1 p. 3; karta sprawdzarki „wkrótce” do T0.2) ---------------
// Liczby: limit 10/IP/dobę generatora = app/api/llms-txt/route.js; 3 firmy/IP/dobę i dane
// usuwane po 60 dniach = components/AiCheckerClient.jsx; liczba punktów checklisty = lib/agencySwitch.js.
// Nowe aplikacje (9.11.2026) pokazujemy w hubie dopiero po publikacji, bez zapowiedzi „Wkrótce”.
const KARTY_PO_PUBLIKACJI = new Set(['audyt-seo', 'autorytet-domeny', 'kalkulator-strat-seo', 'makieta-redesignu']);

export function kartyHuba() {
  return [
    {
      id: 'generator-llms-txt',
      sekcja: 'narzedzia',
      nazwa: 'Generator llms.txt',
      opis: 'Tworzy plik llms.txt z mapy Twojej strony i sprawdza, czy GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot mają do niej dostęp. Wynik w kilkanaście sekund, bez rejestracji. Do 10 sprawdzeń dziennie z jednego adresu IP.',
      href: hrefJesliOpublikowana('/narzedzia/generator-llms-txt'),
      cta: 'Wygeneruj llms.txt',
    },
    {
      id: 'sprawdzarka-ai',
      sekcja: 'narzedzia',
      nazwa: 'Sprawdź, czy ChatGPT poleca Twoją firmę',
      opis: 'Zadajemy ChatGPT z wyszukiwaniem, Gemini, Perplexity, Claude i przeglądowi AI w Google trzy pytania, jakie zadają Twoi klienci, i pokazujemy, czy pada nazwa firmy i z jakich stron modele korzystają. Do 2 firm dziennie z jednego adresu IP.',
      href: hrefSprawdzarki(),
      cta: 'Sprawdź za darmo',
    },
    {
      id: 'audyt-seo',
      sekcja: 'narzedzia',
      nazwa: 'Darmowy audyt SEO',
      opis: 'Sprawdza do 25 podstron, robots.txt, mapę strony, szybkość na telefonie i dostęp botów AI. Ocena 1-100 i lista błędów z instrukcją naprawy. Do 5 audytów dziennie z jednego adresu IP.',
      href: hrefJesliOpublikowana('/narzedzia/audyt-seo'),
      cta: 'Sprawdź swoją stronę',
    },
    {
      id: 'autorytet-domeny',
      sekcja: 'narzedzia',
      nazwa: 'Autorytet domeny (DR)',
      opis: 'Domain Rating z bazy Ahrefs w kilka sekund, bez rejestracji, i porównanie z maksymalnie trzema konkurentami.',
      href: hrefJesliOpublikowana('/narzedzia/autorytet-domeny'),
      cta: 'Sprawdź DR',
    },
    {
      id: 'kalkulator-strat-seo',
      sekcja: 'narzedzia',
      nazwa: 'Kalkulator strat bez SEO i AI',
      opis: 'Z Twoich danych i badań CTR liczy, ile zysku miesięcznie trafia do konkurencji, gdy nie ma Cię w TOP 3 Google i w odpowiedziach AI.',
      href: hrefJesliOpublikowana('/narzedzia/kalkulator-strat-seo'),
      cta: 'Policz stratę',
    },
    {
      id: 'makieta-redesignu',
      sekcja: 'narzedzia',
      nazwa: 'Makieta nowej strony',
      opis: 'Wpisz adres strony, a AI zaprojektuje z jej treści nową stronę główną na komputer i telefon. Do 2 makiet dziennie z jednego adresu IP.',
      href: hrefJesliOpublikowana('/narzedzia/makieta-redesignu'),
      cta: 'Zobacz makietę',
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
export const FAQ_HUBA = [
  {
    id: 'czy-narzedzia-sa-darmowe',
    question: 'Czy narzędzia są naprawdę darmowe?',
    answer: 'Tak. Generator llms.txt i sprawdzarka działają bez opłat i bez zakładania konta. Dzienne limity na jeden adres IP (10 sprawdzeń w generatorze, 2 firmy w sprawdzarce) chronią przed nadużyciami i kosztami zapytań do modeli. Wzory PDF wysyłamy e-mailem i nie zapisujemy adresu na listę mailingową.',
  },
  {
    id: 'jakie-dane-podaje',
    question: 'Jakie dane podaję i co się z nimi dzieje?',
    answer: 'Generator potrzebuje tylko adresu strony i nie zapisuje wyniku. Sprawdzarka prosi o nazwę firmy, branżę, miasto i e-mail, żeby przygotować i wysłać wynik, a dane usuwa po 60 dniach. Przy wzorach podajesz tylko e-mail. Szczegóły są w <a href="/cookies" style="text-decoration:underline">polityce prywatności</a>.',
  },
  {
    id: 'czy-narzedzia-zastepuja-audyt-seo',
    question: 'Czy narzędzia zastępują audyt SEO?',
    answer: 'Nie. Narzędzia sprawdzają pojedyncze elementy: plik llms.txt, dostęp botów AI i to, czy modele wymieniają firmę w kilku pytaniach. <a href="/audyt-seo" style="text-decoration:underline">Audyt SEO</a> obejmuje całą stronę: indeksację, treści, linki, szybkość i konkurencję, a jego wynikiem jest lista zmian z priorytetami.',
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
// link do strony audytu (chronionej) tylko z S1.
export function faqRaportu() {
  const sprawdzarka = hrefSprawdzarki();
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
      answer: 'Nie. Raport z narzędzia pokazuje widoczność i pozycje, ale nie mówi, ile zapytań przyszło z Google, co agencja zrobiła i dlaczego wynik się zmienił. Dane z narzędzi są dobrym załącznikiem do raportu, a nie jego treścią.',
    },
    {
      id: 'darmowy-raport-seo-strony',
      question: 'Gdzie dostanę darmowy raport SEO mojej strony?',
      answer: `Jeśli chcesz ocenić stronę, a nie pracę agencji, potrzebujesz audytu SEO. Zakres i cenę audytu opisujemy na stronie <a href="/audyt-seo" style="text-decoration:underline">audytu SEO</a>.${sprawdzarka ? ` Bezpłatnie możesz od razu <a href="${sprawdzarka}" style="text-decoration:underline">sprawdzić, czy ChatGPT poleca Twoją firmę</a>.` : ''}`,
    },
  ];
}
