// Model kalkulatora utraconego zysku (strona /narzedzia/kalkulator-strat-seo). Ten sam model jest
// w panelu (repo panelu: lib/narzedzia/kalkulator.ts), który liczy wynik ponownie przed wysłaniem
// raportu e-mailem. Zmiana tutaj = ta sama zmiana w panelu i w jego testach
// (tests/narzedzia.test.ts, tests/kalkulator-wf.test.ts: test zgodności importuje ten plik).

export const ZALOZENIA = {
  ctrTop3: { ostrozny: 0.139, optymistyczny: 0.229 },
  aio: { udzialWyszukiwan: 0.18, ctrZ: 0.08, ctrBez: 0.15 },
  // Odpowiedź AI (ChatGPT, Gemini, Perplexity, tryb AI Google): odsetek pytań, po których pytający
  // wchodzi na stronę. Nie CTR top 3 Google (11.11.2026). Ostrożnie 1% (Pew 2025: link w samym
  // podsumowaniu AI kliknięty w 1% wizyt), optymistycznie 3% (Similarweb przez iPullRank 2025:
  // poniżej ok. 3% wyszukiwań w trybie AI kończy się kliknięciem w zewnętrzną stronę).
  // „Nie wiem”: ostrożnie połowa straty w AI, optymistycznie cała (SOCi 2026: ChatGPT poleca 1,2%
  // lokalizacji firm, Google pokazuje 35,9% w pakiecie lokalnym).
  ai: {
    ctr: { ostrozny: 0.01, optymistyczny: 0.03 },
    nieWiem: { ostrozny: 0.5, optymistyczny: 1 },
  },
  udzialAiDomyslny: 25,
};

// Źródła założeń (odczyt 9.11.2026; od indeksu 4 i opis Pew: 11.11.2026). Pokazywane na stronie
// kalkulatora. Nowe pozycje tylko na końcu: lib/narzedzia.en.js dobiera etykiety EN po indeksie.
export const ZRODLA_KALKULATORA = [
  { url: 'https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/', nazwa: 'First Page Sage: CTR w Google według pozycji (2025): poz. 1 39,8%, poz. 2 18,7%, poz. 3 10,2%', data: '2026-11-09' },
  { url: 'https://www.stanventures.com/news/ai-overviews-impact-organic-ctrs-32-drop-3635/', nazwa: 'Badanie GrowthSRC Media (ponad 200 000 fraz): CTR poz. 1 spadł z 28% do 19%, poz. 2 z 20,8% do 12,6% (2024 do 2025)', data: '2026-11-09' },
  { url: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/', nazwa: 'Pew Research Center: przy podsumowaniu AI kliknięcie w wynik w 8% wizyt, bez niego w 15%, a w link w samym podsumowaniu w 1% wizyt; podsumowanie przy 18% wyszukiwań (III 2025)', data: '2026-11-11' },
  { url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents', nazwa: 'Gartner (II 2024): prognoza spadku wolumenu wyszukiwań o 25% do 2026 przez czaty AI', data: '2026-11-09' },
  { url: 'https://ipullrank.com/early-referral-data-ai-mode', nazwa: 'iPullRank, dane Similarweb (ponad 100 tys. użytkowników, V-VIII 2025): mniej niż ok. 3% wyszukiwań w trybie AI Google kończy się kliknięciem w zewnętrzną stronę', data: '2026-11-11' },
  { url: 'https://www.soci.ai/news/in-ai-driven-discovery-few-brands-are-chosen-most-disappear/', nazwa: 'SOCi, Local Visibility Index 2026 (ponad 350 tys. lokalizacji, 2751 marek): ChatGPT poleca 1,2% lokalizacji firm, Google pokazuje 35,9% w pakiecie lokalnym', data: '2026-11-11' },
  { url: 'https://techcrunch.com/2025/07/25/ai-referrals-to-top-websites-were-up-357-year-over-year-in-june-reaching-1-13b/', nazwa: 'TechCrunch, dane Similarweb (VI 2025): platformy AI wysłały 1,13 mld wejść na 1000 największych stron, wyszukiwarka Google 191 mld', data: '2026-11-11' },
  { url: 'https://www.conductor.com/academy/aeo-geo-benchmarks-report/', nazwa: 'Conductor, AEO/GEO Benchmarks 2026 (1215 domen firm, 3,3 mld sesji, USA, V-IX 2025): wejścia z asystentów AI to 1,08% ruchu stron w 10 branżach, z tego 87,4% z ChatGPT', data: '2026-11-11' },
  // 12.11.2026 (Z-K7, koszt i zwrot): tło dla domyślnych 12 miesięcy do pełnego efektu (założenie, nie wynik badania).
  { url: 'https://ahrefs.com/blog/how-long-does-it-take-to-rank/', nazwa: 'Ahrefs, Patrick Stox (V 2025): w ciągu roku do TOP 10 Google trafia 1,74% nowo opublikowanych stron; 72,9% stron w TOP 10 ma ponad 3 lata', data: '2026-11-12' },
];

// Wersja EN etykiet źródeł (te same adresy, daty i liczby; tylko opis po angielsku).
export const ZRODLA_KALKULATORA_EN = [
  { url: ZRODLA_KALKULATORA[0].url, nazwa: 'First Page Sage: Google CTR by ranking position (2025): position 1 39.8%, position 2 18.7%, position 3 10.2%', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[1].url, nazwa: 'GrowthSRC Media study (over 200,000 keywords): CTR for position 1 fell from 28% to 19%, for position 2 from 20.8% to 12.6% (2024 to 2025)', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[2].url, nazwa: 'Pew Research Center: with an AI summary, users click a result in 8% of visits, without one in 15%, and a link inside the summary in 1% of visits; summaries appear in 18% of searches (March 2025)', data: '2026-11-11' },
  { url: ZRODLA_KALKULATORA[3].url, nazwa: 'Gartner (February 2024): forecast of a 25% drop in search engine volume by 2026 due to AI chatbots', data: '2026-11-09' },
  { url: ZRODLA_KALKULATORA[4].url, nazwa: 'iPullRank, Similarweb data (over 100,000 users, May to August 2025): fewer than about 3% of Google AI Mode searches end with a click to an external website', data: '2026-11-11' },
  { url: ZRODLA_KALKULATORA[5].url, nazwa: 'SOCi, 2026 Local Visibility Index (over 350,000 locations, 2,751 brands): ChatGPT recommends 1.2% of business locations, Google shows 35.9% in the local pack', data: '2026-11-11' },
  { url: ZRODLA_KALKULATORA[6].url, nazwa: 'TechCrunch, Similarweb data (June 2025): AI platforms sent 1.13 billion visits to the 1,000 largest websites, Google Search sent 191 billion', data: '2026-11-11' },
  { url: ZRODLA_KALKULATORA[7].url, nazwa: 'Conductor, 2026 AEO/GEO Benchmarks (1,215 company domains, 3.3 billion sessions, US, May to September 2025): visits from AI assistants are 1.08% of website traffic across 10 industries, 87.4% of them from ChatGPT', data: '2026-11-11' },
  { url: ZRODLA_KALKULATORA[8].url, nazwa: 'Ahrefs, Patrick Stox (May 2025): 1.74% of newly published pages reach Google’s top 10 within a year; 72.9% of top 10 pages are more than 3 years old', data: '2026-11-12' },
];

// Część straty w AI zależnie od odpowiedzi „Czy AI poleca dziś Twoją firmę?”.
function czescNiewidoczna(widocznyWAi, k) {
  if (widocznyWAi === 'tak') return 0;
  return widocznyWAi === 'nie_wiem' ? ZALOZENIA.ai.nieWiem[k] : 1;
}

function wariant(w, k) {
  const ctr = ZALOZENIA.ctrTop3[k];
  const { udzialWyszukiwan, ctrZ, ctrBez } = ZALOZENIA.aio;
  const ctrEfektywny = ctr * (1 - udzialWyszukiwan + udzialWyszukiwan * (ctrZ / ctrBez));
  const udzialAi = w.udzialAi / 100;
  const potencjalSeo = w.wyszukiwania * (1 - udzialAi) * ctrEfektywny;
  const wizytySeo = Math.max(0, potencjalSeo - w.ruch);
  const wizytyAi = w.wyszukiwania * udzialAi * ZALOZENIA.ai.ctr[k] * czescNiewidoczna(w.widocznyWAi, k);
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
  const min = wariant(w, 'ostrozny');
  const max = wariant(w, 'optymistyczny');
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

// --- Koszt SEO i zwrot (S1-poprawki Z-K7, decyzja właściciela 12.11.2026) -------------------------
// Dodatek do wyniku: NIE zmienia modelu straty wyżej. Ten sam kod jest w panelu
// (lib/narzedzia/kalkulator.ts: ZWROT, policzZwrot), test zgodności: tests/kalkulator-wf.test.ts.
// Założenia (jawne na stronie):
// - koszt SEO stały co miesiąc (cena pakietu z cennika strony albo kwota użytkownika, netto),
// - odzyskany zysk rośnie równo od 0 do pełnej wyliczonej straty przez `miesiaceDoEfektu` miesięcy,
//   potem stoi. Liczbę miesięcy ustawia użytkownik; domyślne 12 to nasze założenie, nie wynik badania
//   (Ahrefs 2025: w ciągu roku do TOP 10 Google trafia 1,74% nowo opublikowanych stron),
// - miesiąc zwrotu: pierwszy miesiąc, w którym suma odzyskanego zysku dogania sumę kosztów
//   (szukamy do `horyzont` miesięcy; dalej: „nie zwraca się w 36 miesięcy”).
export const ZWROT = { miesiaceDoEfektu: { domyslnie: 12, min: 1, max: 24 }, horyzont: 36, koszt: { min: 1, max: 1_000_000 } };

// Zysk odzyskany w miesiącu m (1, 2, …) przy równym dochodzeniu do pełnego efektu w n miesięcy.
function zyskWMiesiacu(zysk, m, n) {
  return zysk * Math.min(m / n, 1);
}

function zwrotWariantu(zysk, koszt, n) {
  let suma = 0;
  let miesiacZwrotu = null;
  let sumaRok = 0;
  for (let m = 1; m <= ZWROT.horyzont; m += 1) {
    suma += zyskWMiesiacu(zysk, m, n);
    if (m === 12) sumaRok = suma;
    if (miesiacZwrotu === null && suma >= koszt * m) miesiacZwrotu = m;
  }
  return {
    // Miesięczny bilans po dojściu do pełnego efektu (zysk minus koszt).
    bilans: Math.round(zysk - koszt),
    // Ile razy pełny odzyskany zysk pokrywa miesięczny koszt (1 miejsce po przecinku).
    razy: Math.round((zysk / koszt) * 10) / 10,
    // Jaką część wyliczonej straty trzeba odzyskać, żeby zysk pokrył koszt (w %; > 100 = nie pokryje).
    prog: zysk > 0 ? Math.round((koszt / zysk) * 100) : null,
    // Bilans pierwszych 12 miesięcy (suma odzyskanego zysku minus 12 kosztów).
    bilansRok: Math.round(sumaRok - koszt * 12),
    miesiacZwrotu,
  };
}

/**
 * Koszt SEO a odzyskany zysk: `wynik` z policzStraty, `koszt` miesięcznie (zł netto), `miesiaceDoEfektu`
 * (1-24). min = wariant ostrożny straty, max = optymistyczny. Zwraca null przy złym koszcie.
 */
export function policzZwrot(wynik, koszt, miesiaceDoEfektu = ZWROT.miesiaceDoEfektu.domyslnie) {
  if (!Number.isFinite(koszt) || koszt < ZWROT.koszt.min || koszt > ZWROT.koszt.max) return null;
  const { min: a, max: b } = ZWROT.miesiaceDoEfektu;
  const n = Math.min(b, Math.max(a, Math.round(Number(miesiaceDoEfektu) || ZWROT.miesiaceDoEfektu.domyslnie)));
  return {
    koszt,
    miesiaceDoEfektu: n,
    horyzont: ZWROT.horyzont,
    min: zwrotWariantu(wynik.min.zysk, koszt, n),
    max: zwrotWariantu(wynik.max.zysk, koszt, n),
  };
}

// Dane przykładów na stronie kalkulatora (Z-K3, 12.11.2026). Tylko wejścia; wynik liczy policzStraty,
// więc po każdej zmianie modelu przykłady liczą się same. `usluga` = podpowiedzi z pól formularza.
export const PRZYKLADY = {
  usluga: { wyszukiwania: 2000, ruch: 150, konwersja: 2, wartosc: 1500, marza: 40, udzialAi: 25, widocznyWAi: 'nie_wiem' },
  remont: { wyszukiwania: 1500, ruch: 40, konwersja: 3, wartosc: 8000, marza: 35, udzialAi: 25, widocznyWAi: 'nie' },
};
