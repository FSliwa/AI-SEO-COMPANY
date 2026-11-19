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

const PODPIS = { pl: 'Podgląd wyniku (przykładowe dane)', en: 'Result preview (example data)' };

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
};

/** Podgląd wyniku karty huba w danym języku: { src, srcSet, alt, podpis, width, height } albo null. */
export function obrazKarty(id, locale = 'pl') {
  const dane = OBRAZY_KART[id]?.[locale === 'en' ? 'en' : 'pl'];
  return dane ? { ...dane, ...MINIATURA } : null;
}
