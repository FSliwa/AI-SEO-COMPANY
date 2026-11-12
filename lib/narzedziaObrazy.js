// Miniatury wyniku w kartach narzędzi huba /narzedzia i /en/tools (hub-obrazy, 12.11.2026).
// Analiza konkurencji (A2, tabela zbiorcza): hub miał 0 obrazów po H1 wobec mediany 39 u konkurentów.
//
// Każda miniatura to kadr 16:10 (720 x 450 px, WebP q=82, 15-30 KB) z pełnego zrzutu wyniku, który pokazuje
// strona danego narzędzia (te same dane, bez ręcznych poprawek; tylko kadr i zmniejszenie). Zrzuty audytu,
// widoczności w AI i autorytetu pochodzą z trybu demonstracyjnego (example.com, „Przykład”), kalkulator
// to wyliczenie dla przykładowej firmy remontowej, a generator llms.txt i makieta to prawdziwe przebiegi dla
// www.ai-seo-company.pl z 12.11.2026. Podpis pod miniaturą mówi to wprost.
// Skrypt kadrów: prace-2026-11-12/domkniecie/hub-obrazy/robocze/skrypty/miniatury.py. Po podmianie pełnego zrzutu
// na stronie narzędzia trzeba ponownie zrobić miniaturę pod NOWĄ nazwą pliku (/images/* ma cache immutable).
//
// Klucz = id karty z kartyHuba() (lib/narzedzia.js); karta bez wpisu nie dostaje obrazu.

export const MINIATURA = { width: 720, height: 450 };

const KATALOG = '/images/narzedzia/hub';

export const OBRAZY_KART = {
  'audyt-seo': {
    pl: {
      src: `${KATALOG}/darmowy-audyt-seo-wynik-miniatura.webp`,
      alt: 'Przykładowy wynik darmowego audytu SEO dla example.com: ocena 71 na 100 oraz technika 84, treść 62, wydajność 68 i gotowość na AI 70',
      podpis: 'Przykładowy wynik (dane demonstracyjne)',
    },
    en: {
      src: `${KATALOG}/free-seo-audit-result-thumbnail.webp`,
      alt: 'Example free SEO audit result for example.com: a score of 71 out of 100, with technical 84, content 62, performance 68 and AI readiness 70',
      podpis: 'Example result (demo data)',
    },
  },
  'sprawdzarka-ai': {
    pl: {
      src: `${KATALOG}/widocznosc-w-ai-wynik-miniatura.webp`,
      alt: 'Przykładowy wynik sprawdzarki widoczności w AI: firma pojawia się w 3 z 13 odpowiedzi, z tabelą pytań dla ChatGPT, Gemini, Perplexity i Claude',
      podpis: 'Przykładowy wynik (dane demonstracyjne)',
    },
    en: {
      src: `${KATALOG}/ai-visibility-check-result-thumbnail.webp`,
      alt: 'Example AI visibility check result: the business appears in 3 of 13 AI answers, with a question grid for ChatGPT, Gemini, Perplexity and Claude',
      podpis: 'Example result (demo data)',
    },
  },
  'kalkulator-strat-seo': {
    pl: {
      src: `${KATALOG}/kalkulator-strat-seo-wynik-miniatura.webp`,
      alt: 'Przykładowy wynik kalkulatora strat SEO: od 8987 zł do 17 408 zł utraconego zysku miesięcznie, z podziałem na Google, polecenia AI i utraconych klientów',
      podpis: 'Wyliczenie dla przykładowej firmy remontowej',
    },
    en: {
      src: `${KATALOG}/seo-loss-calculator-result-thumbnail.webp`,
      alt: 'Example SEO loss calculator result: PLN 8,987 to PLN 17,408 of profit lost per month, split into Google rankings, AI recommendations and lost customers',
      podpis: 'Calculation for a sample renovation company',
    },
  },
  // Makieta (domknięcie e2e, 12.11.2026): miniatura z prawdziwej makiety naszej strony, tej samej co galeria
  // „przed i po” na /narzedzia/makieta-redesignu (agent makieta, run f2ea07c3, 720 x 450, kadr pierwszego ekranu).
  'makieta-redesignu': {
    pl: {
      src: '/images/narzedzia/makieta/ai-seo-company-makieta-miniatura.webp',
      alt: 'Makieta nowej strony głównej ai-seo-company.pl: menu z czterema pozycjami, nagłówek „Pozycjonowanie, które buduje sprzedaż” i przycisk „Wyceń projekt”',
      podpis: 'Makieta dla naszej strony z 12 listopada 2026',
    },
    en: {
      src: '/images/narzedzia/makieta/ai-seo-company-makieta-miniatura.webp',
      alt: 'Redesign mockup of the ai-seo-company.pl homepage: a four-item menu, the heading “Pozycjonowanie, które buduje sprzedaż” (Positioning that builds sales) and a “Wyceń projekt” (Get a quote) button',
      podpis: 'Mockup for our own website, 12 November 2026 (in Polish)',
    },
  },
  'generator-llms-txt': {
    pl: {
      src: `${KATALOG}/generator-llms-txt-wynik-miniatura.webp`,
      alt: 'Wynik generatora llms.txt dla www.ai-seo-company.pl: podsumowanie mapy strony, ocena obecnego pliku /llms.txt i początek testu dostępu botów AI',
      podpis: 'Wynik dla naszej strony z 12 listopada 2026',
    },
    en: {
      src: `${KATALOG}/llms-txt-generator-result-thumbnail.webp`,
      alt: 'llms.txt generator result for www.ai-seo-company.pl: the sitemap summary, a check of the existing /llms.txt file and the start of the AI bot access test',
      podpis: 'Result for our own website, 12 November 2026',
    },
  },
  'autorytet-domeny': {
    pl: {
      src: `${KATALOG}/autorytet-domeny-wynik-miniatura.webp`,
      alt: 'Przykładowy wynik sprawdzania autorytetu domeny: fikcyjna domena z wynikiem 23 na 100, miejscem wśród domen .pl i porównaniem z 3 konkurentami',
      podpis: 'Przykładowy wynik (dane demonstracyjne)',
    },
    en: {
      src: `${KATALOG}/domain-authority-checker-result-thumbnail.webp`,
      alt: 'Example domain authority checker result: a fictional domain with a score of 23 out of 100 and a comparison with 3 competitors',
      podpis: 'Example result (demo data)',
    },
  },
};

/** Miniatura karty huba w danym języku: { src, alt, podpis, width, height } albo null. */
export function obrazKarty(id, locale = 'pl') {
  const wpis = OBRAZY_KART[id]?.[locale === 'en' ? 'en' : 'pl'];
  return wpis ? { ...wpis, ...MINIATURA } : null;
}
