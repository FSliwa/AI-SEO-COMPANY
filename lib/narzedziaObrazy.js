// Podglądy wyniku w kartach narzędzi huba /narzedzia i /en/tools.
// Analiza konkurencji (A2, tabela zbiorcza): hub miał 0 obrazów po H1 wobec mediany 39 u konkurentów.
//
// 18.11.2026 (mockupy): zamiast kadrów ze zrzutów ekranu każda karta ma ilustrację wyniku narysowaną w Figmie
// (plik „AI SEO COMPANY - mockupy narzędzi (hub)”, https://www.figma.com/design/vhopslbiCVIiaK30S06XeA, ramki
// 1440 x 900, PL i EN, tokeny z DESIGN.md, Geist i Geist Mono). To ilustracje na PRZYKŁADOWYCH danych w układzie
// prawdziwego wyniku (etykiety z komponentów *Client.jsx, liczby z lib/narzedziaDemo.js i policzStraty dla
// przykładu „remont” z lib/kalkulatorStrat.js), domeny zarezerwowane albo fikcyjne (example.com, *.example,
// przyklad-firmy.pl, konkurent-a/b/c.pl). Podpis pod obrazem mówi to wprost, alt opisuje ilustrację.
//
// Pliki: WebP q=85 w trzech szerokościach, 1440 x 900 (38-59 KB), 1080 x 675 (27-43 KB) i 720 x 450 (17-26 KB),
// podawane wprost przez srcSet (bez optymalizatora Next, żeby nie kompresować ich drugi raz). Ramka obrazu ma
// na komputerze 504 px: ekran 1x bierze 720, a 2x bierze 1080 (bez 1080 Chrome wybierałby 720 i obraz byłby
// miękki; pomiar 18.11.2026). /images/* ma cache immutable, więc po zmianie ramki w Figmie eksport idzie pod
// NOWĄ nazwę pliku, a stare pliki się usuwa.
//
// Klucz = id karty z kartyHuba() (lib/narzedzia.js); karta bez wpisu nie dostaje obrazu.

/** Wymiary pliku źródłowego (atrybuty width/height obrazu: proporcja 16:10 bez przesunięć układu). */
export const MINIATURA = { width: 1440, height: 900 };

const KATALOG = '/images/narzedzia/hub';

const PODPIS = {
  pl: 'Podgląd wyniku (przykładowe dane)',
  en: 'Result preview (example data)',
  de: 'Ergebnisvorschau (Beispieldaten)',
};

const ALIAS_DE_DO_ID = {
  'kostenloser-seo-audit': 'audyt-seo',
  'ki-sichtbarkeit-pruefen': 'sprawdzarka-ai',
  'seo-verlustrechner': 'kalkulator-strat-seo',
  'website-relaunch-mockup': 'makieta-redesignu',
  'llms-txt-generator': 'generator-llms-txt',
  'domain-authority-checker': 'autorytet-domeny',
  'ki-crawler-robots-txt-pruefen': 'tester-robotow-ai-robots-txt',
  'core-web-vitals-vergleich': 'test-core-web-vitals-porownanie',
  'geo-zitierbarkeit-pruefen': 'sprawdz-cytowalnosc-strony-ai',
  'weiterleitungen-hreflang-pruefen': 'sprawdz-przekierowania-hreflang',
  'indexnow-generator-bing-chatgpt-test': 'generator-indexnow-test-bing-chatgpt',
  'entity-graph-json-ld-validator': 'walidator-grafu-encji-json-ld',
  'lokales-seo-nap-qr-generator': 'audyt-lokalnego-seo-wizytowki',
};

/** Wpis jednej wersji językowej: plik bez końcówki „-720.webp” / „-1080.webp” / „-1440.webp” + tekst alternatywny. */
const wpis = (jezyk, plik, alt) => ({
  src: `${KATALOG}/${plik}-1440.webp`,
  srcSet: [720, 1080, 1440].map((w) => `${KATALOG}/${plik}-${w}.webp ${w}w`).join(', '),
  alt,
  podpis: PODPIS[jezyk],
});

export const OBRAZY_KART = {
  'audyt-seo': {
    pl: wpis('pl', 'darmowy-audyt-seo-podglad-wyniku', 'Ilustracja wyniku darmowego audytu SEO na przykładowych danych: ocena 71 na 100, paski kategorii (techniczne 84, treść 62, wydajność 68, gotowość na AI 70) i trzy najważniejsze problemy z wagą błędu albo ostrzeżenia'),
    en: wpis('en', 'free-seo-audit-result-preview', 'Illustration of a free SEO audit result with example data: a score of 71 out of 100, category bars (technical 84, content 62, performance 68, AI readiness 70) and the three top issues marked as an error or a warning'),
  },
  'sprawdzarka-ai': {
    pl: wpis('pl', 'widocznosc-w-ai-podglad-wyniku', 'Ilustracja wyniku sprawdzarki widoczności w AI na przykładowych danych: siatka pięciu silników (ChatGPT, Gemini, Perplexity, Claude, Przegląd AI w Google) i trzech pytań, firma wymieniona w 3 z 13 odpowiedzi oraz lista najczęściej cytowanych stron'),
    en: wpis('en', 'ai-visibility-check-result-preview', 'Illustration of an AI visibility check result with example data: a grid of five engines (ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews) and three questions, the business mentioned in 3 of 13 answers and a list of the most cited sites'),
  },
  'kalkulator-strat-seo': {
    pl: wpis('pl', 'kalkulator-strat-seo-podglad-wyniku', 'Ilustracja wyniku kalkulatora strat SEO dla przykładowej firmy remontowej: dane wejściowe, od 8987 zł do 17 408 zł utraconego zysku miesięcznie, podział na brak pozycji w Google i brak poleceń w AI oraz zwrot kosztu SEO między 3. a 6. miesiącem'),
    en: wpis('en', 'seo-loss-calculator-result-preview', 'Illustration of an SEO loss calculator result for a sample renovation company: the inputs, PLN 8,987 to PLN 17,408 of profit lost per month, the split between missing Google rankings and missing AI recommendations, and SEO cost payback between month 3 and month 6'),
  },
  'makieta-redesignu': {
    pl: wpis('pl', 'makieta-redesignu-podglad-wyniku', 'Ilustracja makiety redesignu na przykładowej stronie: okno przeglądarki podzielone suwakiem na wersję przed i po oraz nowa wersja strony na telefonie'),
    en: wpis('en', 'website-redesign-mockup-result-preview', 'Illustration of a redesign mockup for a sample website: a browser window split by a slider into the before and after versions, plus the new version on a phone'),
  },
  'generator-llms-txt': {
    pl: wpis('pl', 'generator-llms-txt-podglad-wyniku', 'Ilustracja wyniku generatora llms.txt na przykładowych danych: podgląd pliku z sekcjami i liniami linków, podsumowanie pliku, przycisk „Pobierz llms.txt” oraz test dostępu 8 botów (7 botów AI i Bingbot), z których 7 jest dozwolonych'),
    en: wpis('en', 'llms-txt-generator-result-preview', 'Illustration of an llms.txt generator result with example data: a file preview with sections and link lines, the file summary, a “Download llms.txt” button and the access test for 8 bots (7 AI bots and Bingbot), 7 of them allowed'),
  },
  'autorytet-domeny': {
    pl: wpis('pl', 'autorytet-domeny-podglad-wyniku', 'Ilustracja wyniku sprawdzania autorytetu domeny na fikcyjnych domenach: wskaźnik 23 na 100, poziom niski, 7 domen linkujących i paski porównania z 3 konkurentami (41, 12 i 35)'),
    en: wpis('en', 'domain-authority-checker-result-preview', 'Illustration of a domain authority checker result with fictional domains: a gauge at 23 out of 100, a low level, 7 linking domains and comparison bars for 3 competitors (41, 12 and 35)'),
  },
  'test-core-web-vitals-porownanie': {
    pl: wpis('pl', 'porownywarka-cwv-podglad-wyniku', 'Ilustracja wyniku porównywarki Core Web Vitals na przykładowych danych CrUX 28 dni: zestawienie LCP, INP i CLS Twojej strony (3,4 s), konkurenta (2,1 s) oraz architektury Next.js SSR (0,9 s) wraz z narzutem skryptów CMS i kosztem TCO'),
    en: wpis('en', 'core-web-vitals-comparison-result-preview', 'Illustration of a Core Web Vitals comparison result on sample 28-day CrUX data: mobile LCP, INP and CLS across your site (3.4 s), a competitor (2.1 s) and Next.js SSR architecture (0.9 s) with CMS script count and 24-month TCO savings'),
    de: wpis('de', 'core-web-vitals-vergleich-vorschau', 'Illustration des Core-Web-Vitals-Vergleichs mit 28-Tage-CrUX-Beispieldaten: LCP, INP und CLS Ihrer Website (3,4 s), eines Wettbewerbers (2,1 s) und einer Next.js-SSR-Architektur (0,9 s) samt CMS-Skripten und 24-Monats-TCO'),
  },
  'sprawdz-przekierowania-hreflang': {
    pl: wpis('pl', 'przekierowania-hreflang-podglad-wyniku', 'Ilustracja wyniku inspektora przekierowań 301, canonical i hreflang: tabela skoków 4 wariantów domeny (http, https, www), status zwrotności par językowych pl, en, de i x-default oraz gotowa reguła nginx.conf'),
    en: wpis('en', 'redirects-hreflang-checker-result-preview', 'Illustration of a 301 redirect, canonical and hreflang check result: hop trace across all 4 host variants (http, https, www), 4 of 4 reciprocal pl, en, de and x-default tags, and a ready 1-hop nginx.conf rule'),
    de: wpis('de', 'weiterleitungen-hreflang-vorschau', 'Illustration der 301-Weiterleitungs-, Canonical- und hreflang-Prüfung: Sprungkette aller 4 Host-Varianten (http, https, www), gegenseitige pl-, en-, de- und x-default-Tags sowie fertige nginx.conf-Regel'),
  },
  'audyt-lokalnego-seo-wizytowki': {
    pl: wpis('pl', 'lokalne-seo-nap-qr-podglad-wyniku', 'Ilustracja wyniku audytu lokalnego SEO i generatora QR: tabela porównania nazwy, adresu, telefonu i współrzędnych między HTML a LocalBusiness JSON-LD, wyliczenie brakujących 14 opinii 5 gwiazdek oraz wektorowy kod QR do pobrania'),
    en: wpis('en', 'local-seo-nap-qr-result-preview', 'Illustration of a local SEO NAP audit and review QR result: parity table comparing visible HTML contact data against LocalBusiness JSON-LD, a 14 five-star review gap calculation, and a downloadable vector Google review QR code'),
    de: wpis('de', 'lokales-seo-nap-qr-vorschau', 'Illustration des lokalen SEO-NAP-Prüfers und Bewertungs-QR-Generators: Abgleichtabelle zwischen HTML und LocalBusiness JSON-LD, Berechnung von 14 fehlenden 5-Sterne-Rezensionen sowie Vektor-QR-Code'),
  },
  'tester-robotow-ai-robots-txt': {
    pl: wpis('pl', 'tester-robotow-ai-podglad-wyniku', 'Ilustracja wyniku testera robotów AI i kreatora robots.txt: podgląd polityki dla OAI-SearchBot i PerplexityBot, parzystość treści HTML bez JavaScriptu 98% oraz macierz 15 botów AI z wykrytą blokadą 403 zapory WAF'),
    en: wpis('en', 'ai-crawler-robots-txt-result-preview', 'Illustration of an AI crawler and robots.txt tester result: robots.txt policy preview for OAI-SearchBot and PerplexityBot, 98% SSR HTML content parity score, and 15-bot live HTTP matrix highlighting a 403 WAF block'),
    de: wpis('de', 'ki-crawler-robots-txt-vorschau', 'Illustration des KI-Crawler- und robots.txt-Prüfers: Richtlinien-Vorschau für OAI-SearchBot und PerplexityBot, 98% SSR-HTML-Textparität sowie 15-Bot-HTTP-Matrix inklusive erkannter 403-WAF-Sperre'),
  },
  'sprawdz-cytowalnosc-strony-ai': {
    pl: wpis('pl', 'cytowalnosc-geo-podglad-wyniku', 'Ilustracja wyniku audytora cytowalności GEO na przykładowych danych: ocena 88 na 100, paski kryteriów RAG (odpowiedź w pierwszym zdaniu, gęstość liczb, tabele HTML, dane autora) oraz symulacja zacytowanego wycinka w odpowiedzi AI'),
    en: wpis('en', 'geo-citability-checker-result-preview', 'Illustration of a GEO citability checker result with example data: score of 88 out of 100, RAG criteria bars (answer-first lead, fact density, HTML tables, author schema) and a simulated cited AI snippet'),
    de: wpis('de', 'geo-zitierbarkeit-vorschau', 'Illustration des GEO-Zitierbarkeits-Prüfers mit Beispieldaten: Bewertung 88 von 100, RAG-Kriterienbalken (Antwort im ersten Absatz, Faktendichte, HTML-Tabellen, Autoren-Schema) sowie simuliertes KI-Zitat'),
  },
  'generator-indexnow-test-bing-chatgpt': {
    pl: wpis('pl', 'generator-indexnow-bing-podglad-wyniku', 'Ilustracja wyniku generatora IndexNow i testu Bing: potwierdzony dostęp 200 OK dla Bingbot i OAI-SearchBot, podgląd 32-znakowego klucza hex i żądania API oraz wykres entropii 78 unikalnych dat lastmod w sitemap.xml'),
    en: wpis('en', 'indexnow-generator-bing-result-preview', 'Illustration of an IndexNow key generator and Bing check result: verified 200 OK access for Bingbot and OAI-SearchBot, 32-character hex key payload preview, and sitemap.xml lastmod entropy chart with 78 unique timestamps'),
    de: wpis('de', 'indexnow-generator-bing-vorschau', 'Illustration des IndexNow-Generators und Bing-Tests: bestätigter 200-OK-Zugriff für Bingbot und OAI-SearchBot, Vorschau des 32-stelligen Hex-Schlüssels sowie lastmod-Entropiediagramm der sitemap.xml'),
  },
  'walidator-grafu-encji-json-ld': {
    pl: wpis('pl', 'graf-encji-json-ld-podglad-wyniku', 'Ilustracja wyniku walidatora grafu encji JSON-LD: wizualny diagram połączonych węzłów Organization, WebSite, Person, Service i PostalAddress spiętych przez @id, weryfikacja NIP/KRS i sameAs oraz podgląd kodu @graph'),
    en: wpis('en', 'entity-graph-json-ld-result-preview', 'Illustration of a JSON-LD entity graph validator result: connected Schema.org node diagram linking Organization, WebSite, Person, Service and PostalAddress via @id, verified registry IDs and sameAs profiles, plus @graph code'),
    de: wpis('de', 'entitaets-graph-json-ld-vorschau', 'Illustration des JSON-LD-Entitäts-Graph-Validators: verbundenes Schema.org-Knotendiagramm aus Organization, WebSite, Person, Service und PostalAddress über @id samt @graph-Codevorschau'),
  },
};

/** Podgląd wyniku karty huba w danym języku: { src, srcSet, alt, podpis, width, height } albo null. */
export function obrazKarty(id, locale = 'pl') {
  const klucz = ALIAS_DE_DO_ID[id] || id;
  const wpisKarty = OBRAZY_KART[klucz];
  if (!wpisKarty) return null;
  if (locale === 'de') {
    const daneDe = wpisKarty.de || wpisKarty.en || wpisKarty.pl;
    return daneDe ? { ...daneDe, podpis: PODPIS.de, ...MINIATURA } : null;
  }
  const dane = wpisKarty[locale === 'en' ? 'en' : 'pl'];
  return dane ? { ...dane, ...MINIATURA } : null;
}
