// Liczby darmowych narzędzi w jednym miejscu (title, meta, lead, FAQ, karty huba, schema, PozostaleNarzedzia).
// S1-poprawki Z-00 (12.11.2026). Czysty ESM bez importów: czytają go komponenty klienckie i serwerowe
// oraz lib/publikacja.js i lib/stronyEn.js. Teksty składać ze stałych, np.
// `do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach`, `Zadamy ${listaSilnikow()} ${WIDOCZNOSC.pytan} pytania`.
// Jeśli właściciel woli zaokrąglenie („ponad 40”), wystarczy zmienić regul tutaj.

// Audyt: repo panelu, lib/narzedzia/audyt.ts, obiekt REGULY. Stan gałęzi narzedzia-poprawki z 12.11.2026:
// 49 reguł (techniczne 21, treść 12, wydajność 10, gotowość na AI 6; komentarz audyt.ts:2 też mówi 49).
// 11.11 było 48 (techniczne 20), w e0ac214 44 (techniczne 16). Wdrażając stronę przed tą gałęzią panelu,
// ustaw liczby z wdrożonego panelu. Po każdej zmianie REGULY poprawić tutaj; sprawdzenie w panelu:
//   grep -o 'kategoria: "[a-z]*"' lib/narzedzia/audyt.ts | sort | uniq -c   (tylko obiekt REGULY, l. 34-…)
export const AUDYT = {
  stron: 25, // audyt.ts zbierzDane({ maxStron = 25 })
  regul: 49,
  reguly: { techniczne: 21, tresc: 12, wydajnosc: 10, ai: 6 },
  wagi: { techniczne: 35, tresc: 30, wydajnosc: 20, ai: 15 }, // audyt.ts:443 (procent oceny)
  kategorii: 4,
  przebiegiPsi: 2, // psi.ts: dwa przebiegi naraz i mediana; przed narzedzia-poprawki: 1
  mapPodrzednych: 10, // audyt.ts MAKS_MAP; przed narzedzia-poprawki: 1
  limitIp: 5, // wspolne.ts LIMITY.audyt_seo (na dobę)
};

// Silniki widoczności w AI. Grok liczy się dopiero, gdy w Vercel panelu jest XAI_API_KEY
// (panel lib/narzedzia/widocznosc.ts: dostepnosc('grok')). Po dodaniu klucza ustaw GROK = true.
// Gemini pyta z wyszukiwaniem Google, dopóki w panelu nie ustawiono NARZEDZIA_GEMINI_WEB_SEARCH=0
// (widocznosc.ts:52). Gdy ktoś go wyłączy (koszt), ustaw tu false: teksty Z-W3/Z-W4 mają wariant.
const GROK = false;
const GEMINI_Z_WYSZUKIWANIEM = true;
export const WIDOCZNOSC = {
  pytan: 3, // 2 z branży i miasta, 1 z treści strony klienta
  limitIp: 2, // wspolne.ts LIMITY.widocznosc_ai
  geminiZWyszukiwaniem: GEMINI_Z_WYSZUKIWANIEM,
  // Decyzja właściciela 12.11.2026 (Z-W9): przed bramką e-mail 5 wymienionych firm i 5 cytowanych domen;
  // treść odpowiedzi, wszystkie nazwy, źródła per odpowiedź i raport zostają za bramką.
  przedBramka: { firm: 5, domen: 5 },
  silniki: {
    pl: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', ...(GROK ? ['Grok'] : []), 'przegląd AI w Google'],
    en: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', ...(GROK ? ['Grok'] : []), 'Google AI Overviews'],
  },
  get silnikow() { return this.silniki.pl.length; }, // 5 albo 6
  grok: GROK,
};

export const MAKIETA = { limitIp: 2, minut: '1-3' }; // wspolne.ts LIMITY.makieta

// Kalkulator liczy w przeglądarce (lib/kalkulatorStrat.js); limit dotyczy tylko wysyłki zestawienia e-mailem.
export const KALKULATOR = { limitIp: 10 }; // wspolne.ts LIMITY.kalkulator

// Autorytet domeny: Ahrefs Domain Rating z darmowego endpointu /v3/public/domain-rating-free (klucz
// AHREFS_API_KEY w panelu). Decyzja właściciela 12.11.2026: podpis „Domain Rating by Ahrefs” obowiązkowy,
// porównanie z maksymalnie 3 konkurentami bez e-maila, e-mail wysyła raport z planem działań.
export const AUTORYTET = { limitIp: 20, konkurentow: 3, atrybucja: 'Domain Rating by Ahrefs' }; // wspolne.ts LIMITY.autorytet

// Generator llms.txt (app/api/llms-txt): BOTY.length = 8, LIMIT_DZIENNY = 10 w route.js.
export const GENERATOR = { adresow: 50, mapPodrzednych: 20, botow: 8, sekund: 20, limitIp: 10 };

// Ceny usług TYLKO z kodu strony (nie wymyślać, nie zaokrąglać). Netto. Źródła:
// audytSeo: lib/blogCta.js:56, app/[locale]/audyt-seo/page.js; audytAi: lib/publikacja.js:88, lib/blogCta.js:42;
// pakiety SEO: lib/translations.js:47-57 (PL) i :167-177 (EN), lib/porownania.js:419; strona: lib/szablony/brief-strony-internetowej.js:5.
// Do Z-K7 (koszt SEO i miesiąc zwrotu), Z-A8 (tabela z ceną), Z-W10, Z-M (wycena strony).
export const CENY = {
  audytSeo: { pln: 1490, eur: 350, od: true },
  audytAi: { pln: 990, eur: 235, od: false },
  seoStandard: { pln: 1900, eur: 450, od: true, miesiecznie: true },
  seoPremium: { pln: 2500, eur: 590, od: false, miesiecznie: true },
  boosterPack: { pln: 2500, eur: 590, od: false, miesiecznie: true, umowaMiesiecy: 3 },
  strona: { pln: 5900, eur: 1400, od: true },
};

/** „1 490 zł” / „€350” (audytSeo): format ceny bez „netto” i „od” (dopisuje je tekst). */
export function cena(pozycja, locale = 'pl') {
  const c = CENY[pozycja];
  if (!c) return '';
  if (locale === 'en') return `€${c.eur.toLocaleString('en-US')}`;
  return `${String(c.pln).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;
}

/** „ChatGPT, Gemini, Perplexity, Claude i przegląd AI w Google” / „…, Claude and Google AI Overviews”. */
export function listaSilnikow(locale = 'pl') {
  const l = WIDOCZNOSC.silniki[locale === 'en' ? 'en' : 'pl'];
  return `${l.slice(0, -1).join(', ')} ${locale === 'en' ? 'and' : 'i'} ${l[l.length - 1]}`;
}

/** Liczebnik silników słownie: „pięć” / „sześć”, „five” / „six”. */
export function ileSilnikow(locale = 'pl') {
  const n = WIDOCZNOSC.silnikow;
  return locale === 'en' ? ({ 5: 'five', 6: 'six' }[n] ?? String(n)) : ({ 5: 'pięć', 6: 'sześć' }[n] ?? String(n));
}
