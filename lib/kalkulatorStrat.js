// Model kalkulatora utraconego zysku (strona /narzedzia/kalkulator-strat-seo). Ten sam model jest
// w panelu (repo panelu: lib/narzedzia/kalkulator.ts), który liczy wynik ponownie przed wysłaniem
// raportu e-mailem. Zmiana tutaj = ta sama zmiana w panelu i w jego teście (tests/narzedzia.test.ts).

export const ZALOZENIA = {
  ctrTop3: { ostrozny: 0.139, optymistyczny: 0.229 },
  aio: { udzialWyszukiwan: 0.18, ctrZ: 0.08, ctrBez: 0.15 },
  udzialAiDomyslny: 25,
};

// Źródła założeń (odczyt 9.11.2026). Pokazywane na stronie kalkulatora.
export const ZRODLA_KALKULATORA = [
  { url: 'https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/', nazwa: 'First Page Sage: CTR w Google według pozycji (2025): poz. 1 39,8%, poz. 2 18,7%, poz. 3 10,2%', data: '2026-11-09' },
  { url: 'https://www.stanventures.com/news/ai-overviews-impact-organic-ctrs-32-drop-3635/', nazwa: 'Badanie GrowthSRC Media (ponad 200 000 fraz): CTR poz. 1 spadł z 28% do 19%, poz. 2 z 20,8% do 12,6% (2024 do 2025)', data: '2026-11-09' },
  { url: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/', nazwa: 'Pew Research Center: przy podsumowaniu AI kliknięcie w wynik w 8% wizyt, bez niego w 15%; podsumowanie przy 18% wyszukiwań (III 2025)', data: '2026-11-09' },
  { url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents', nazwa: 'Gartner (II 2024): prognoza spadku wolumenu wyszukiwań o 25% do 2026 przez czaty AI', data: '2026-11-09' },
];

// Wersja EN etykiet źródeł (te same adresy, daty i liczby; tylko opis po angielsku).
export const ZRODLA_KALKULATORA_EN = [
  { url: ZRODLA_KALKULATORA[0].url, nazwa: 'First Page Sage: Google CTR by ranking position (2025): position 1 39.8%, position 2 18.7%, position 3 10.2%', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[1].url, nazwa: 'GrowthSRC Media study (over 200,000 keywords): CTR for position 1 fell from 28% to 19%, for position 2 from 20.8% to 12.6% (2024 to 2025)', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[2].url, nazwa: 'Pew Research Center: with an AI summary, users click a result in 8% of visits, without one in 15%; summaries appear in 18% of searches (March 2025)', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[3].url, nazwa: 'Gartner (February 2024): forecast of a 25% drop in search engine volume by 2026 due to AI chatbots', data: '2026-11-09' },
];

function wariant(w, ctr) {
  const { udzialWyszukiwan, ctrZ, ctrBez } = ZALOZENIA.aio;
  const ctrEfektywny = ctr * (1 - udzialWyszukiwan + udzialWyszukiwan * (ctrZ / ctrBez));
  const udzialAi = w.udzialAi / 100;
  const potencjalSeo = w.wyszukiwania * (1 - udzialAi) * ctrEfektywny;
  const wizytySeo = Math.max(0, potencjalSeo - w.ruch);
  const wizytyAi = w.widocznyWAi === 'tak' ? 0 : w.wyszukiwania * udzialAi * ctr;
  const naZysk = (wizyty) => wizyty * (w.konwersja / 100) * w.wartosc * (w.marza / 100);
  return {
    wizytySeo: Math.round(wizytySeo),
    wizytyAi: Math.round(wizytyAi),
    klienci: Math.round((wizytySeo + wizytyAi) * (w.konwersja / 100) * 10) / 10,
    zyskSeo: Math.round(naZysk(wizytySeo)),
    zyskAi: Math.round(naZysk(wizytyAi)),
    zysk: Math.round(naZysk(wizytySeo + wizytyAi)),
  };
}

/** Miesięczne straty w wariancie ostrożnym (min) i optymistycznym (max) oraz w skali roku. */
export function policzStraty(w) {
  const min = wariant(w, ZALOZENIA.ctrTop3.ostrozny);
  const max = wariant(w, ZALOZENIA.ctrTop3.optymistyczny);
  return { min, max, rocznieMin: min.zysk * 12, rocznieMax: max.zysk * 12 };
}

/** Sprawdza dane z formularza (te same granice co schemat w panelu). Zwraca komunikat albo null. */
export function bladDanych(w, lang = 'pl') {
  if (lang === 'en') {
    const ok = (v, a, b) => Number.isFinite(v) && v >= a && v <= b;
    if (!ok(w.wyszukiwania, 1, 10_000_000) || !Number.isInteger(w.wyszukiwania)) return 'Enter the number of monthly searches (a whole number, at least 1).';
    if (!ok(w.ruch, 0, 10_000_000) || !Number.isInteger(w.ruch)) return 'Enter your monthly visits from Google (a whole number, 0 if you do not know).';
    if (!ok(w.konwersja, 0.01, 50)) return 'Conversion rate: from 0.01 to 50%.';
    if (!ok(w.wartosc, 1, 100_000_000)) return 'Enter the value of a customer or an order in PLN.';
    if (!ok(w.marza, 1, 100)) return 'Margin: from 1 to 100%.';
    if (!ok(w.udzialAi, 0, 80)) return 'Share of questions asked in AI: from 0 to 80%.';
    return null;
  }
  const zakres = (v, a, b) => Number.isFinite(v) && v >= a && v <= b;
  if (!zakres(w.wyszukiwania, 1, 10_000_000) || !Number.isInteger(w.wyszukiwania)) return 'Podaj miesięczną liczbę wyszukiwań (liczba całkowita, co najmniej 1).';
  if (!zakres(w.ruch, 0, 10_000_000) || !Number.isInteger(w.ruch)) return 'Podaj miesięczną liczbę wejść z Google (liczba całkowita, 0 jeśli nie wiesz).';
  if (!zakres(w.konwersja, 0.01, 50)) return 'Konwersja: od 0,01 do 50%.';
  if (!zakres(w.wartosc, 1, 100_000_000)) return 'Podaj wartość klienta albo zamówienia w zł.';
  if (!zakres(w.marza, 1, 100)) return 'Marża: od 1 do 100%.';
  if (!zakres(w.udzialAi, 0, 80)) return 'Udział pytań w AI: od 0 do 80%.';
  return null;
}
