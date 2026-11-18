// Kotwice linków wewnętrznych = fraza główna celu (18.11.2026, wzorzec airSlate: każdy sąsiad
// linkuje do sąsiada jego frazą). Jedno źródło: frazy szablonów z lib/szablony/*.js (`fraza`)
// plus ręczna lista celów spoza szablonów (wyniki badania fraz z 18.11: seo/frazy-pl.csv, frazy-en.csv).
//
//   kotwicaLinku('/narzedzia/szablon-strategii-seo', 'pl', 'Szablon strategii SEO') -> 'Strategia SEO'
//   kotwicaLinku('/narzedzia/checklista-seo', 'pl', 'Checklista SEO')               -> 'Checklista SEO' (tekst już zawiera frazę)
//   kotwicaLinku('/cokolwiek', 'pl', 'Tekst')                                        -> 'Tekst' (cel bez wpisu)
//
// Zasada: gdy dotychczasowy tekst linku już zawiera frazę (bez wielkości liter i diakrytyków),
// zostaje bez zmian; w przeciwnym razie kotwicą jest sama fraza (z wielką pierwszą literą).
// Klucz = ścieżka PL (klucz z i18n/routing.js), bez #kotwicy. Czysty ESM, bez importów @/.
import { SZABLONY } from './szablony';

// Cele spoza szablonów. Brak wpisu dla języka = tekst zostaje taki, jak był.
const RECZNE = {
  '/narzedzia/makieta-redesignu': { pl: 'makieta strony internetowej' },
  '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': { pl: 'tag canonical', en: 'canonical tag seo' },
  '/blog/audyt-techniczny-seo': { pl: 'jak zrobić audyt seo' },
  '/blog/jak-pozyskiwac-opinie-google-poradnik': { pl: 'jak zdobyć opinie google' },
  '/blog/ile-kosztuje-strona-www-dla-firmy-ceny': { en: 'how much does a website cost' },
  '/porownania/seo-czy-google-ads': { pl: 'seo vs sem', en: 'SEO vs SEM (Google Ads)' },
  '/porownania/pozycjonowanie-za-efekt-czy-abonament': { en: 'pay for performance seo' },
  '/zmiana-agencji-seo': { en: 'switching seo agency' },
  '/narzedzia/kalkulator-strat-seo': { en: 'SEO ROI calculator' },
  '/cennik-pozycjonowania': { pl: 'cennik pozycjonowania' },
  '/projektowanie-stron-internetowych': { pl: 'tworzenie stron internetowych', en: 'web design agency' },
  '/sprawdz-widocznosc-w-ai': { pl: 'sprawdzarka AI visibility' },
  '/pozycjonowanie-stron-internetowych': { en: 'SEO services' },
  '/audyt-seo': { en: 'SEO audit' },
  // 18.11.2026 (integracja): nowe strony i artykuły z listy airSlate.
  '/link-building': { pl: 'link building', en: 'link building services' },
  '/copywriting-seo': { pl: 'copywriting seo', en: 'seo copywriting' },
  '/porownania/agencja-seo-czy-freelancer': { pl: 'freelancer seo', en: 'seo agency vs freelancer' },
  '/blog/google-ai-mode-jak-sie-pojawic': { pl: 'google ai mode' },
  '/blog/landing-page-tworzenie-cms-hosting-cena': { pl: 'landing page' },
  '/blog/how-long-does-seo-take': { en: 'how long does seo take' },
};

const FRAZY = { ...RECZNE };
for (const s of SZABLONY) {
  if (s.fraza) FRAZY[`/narzedzia/${s.slug}`] = { ...s.fraza };
}

function norm(t) {
  return String(t).toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// SEO, AI i Google piszemy wielkimi literami także w kotwicy zbudowanej z frazy (lista kuratorska).
const WYRAZY = { seo: 'SEO', ai: 'AI', google: 'Google', chatgpt: 'ChatGPT', json: 'JSON', sem: 'SEM', geo: 'GEO' };
function ladna(fraza) {
  const slowa = fraza.split(' ').map((w) => WYRAZY[w.toLowerCase()] ?? w);
  const pierwsze = slowa[0];
  slowa[0] = pierwsze === pierwsze.toLowerCase() ? pierwsze.charAt(0).toUpperCase() + pierwsze.slice(1) : pierwsze;
  return slowa.join(' ');
}

/** Fraza główna celu w danym języku albo null. */
export function frazaLinku(href, locale = 'pl') {
  const klucz = String(href).split('#')[0];
  return FRAZY[klucz]?.[locale === 'en' ? 'en' : 'pl'] ?? null;
}

/** Tekst kotwicy: fraza celu, gdy dotychczasowy tekst jej nie zawiera; inaczej tekst bez zmian. */
export function kotwicaLinku(href, locale, tekst) {
  const fraza = frazaLinku(href, locale);
  if (!fraza || (tekst && norm(tekst).includes(norm(fraza)))) return tekst;
  return ladna(fraza);
}
