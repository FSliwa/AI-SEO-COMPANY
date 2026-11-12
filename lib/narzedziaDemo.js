// Odpowiedzi DEMO darmowych narzędzi: tylko lokalny podgląd wyglądu (NEXT_PUBLIC_NARZEDZIA_DEMO=1),
// bez panelu i kluczy API. Domena przyklad.pl i wszystkie liczby są przykładowe; strona w trybie
// demo pokazuje pasek „Tryb demo”. Ten plik ładuje się dynamicznie tylko w trybie demo.
import { policzStraty } from './kalkulatorStrat';

const czekaj = (ms) => new Promise((r) => setTimeout(r, ms));

const PROBLEMY = [
  { id: 'brak_h1', kategoria: 'tresc', waga: 'blad', tytul: 'Brak nagłówka H1', opis: 'H1 mówi wyszukiwarce i czytelnikowi, o czym jest strona.', jakNaprawic: 'Dodaj jeden nagłówek H1 z główną frazą strony.', strony: ['https://przyklad.pl/oferta', 'https://przyklad.pl/kontakt'], liczba: 2 },
  { id: 'brak_opisu', kategoria: 'tresc', waga: 'ostrzezenie', tytul: 'Brak opisu meta (meta description)', opis: 'Google sam wybierze fragment tekstu do wyniku, zwykle mniej zachęcający do kliknięcia.', jakNaprawic: 'Dodaj meta description 120-160 znaków z korzyścią i wezwaniem do działania.', strony: ['https://przyklad.pl/oferta', 'https://przyklad.pl/o-nas', 'https://przyklad.pl/blog'], liczba: 3 },
  { id: 'boty_ai_zablokowane', kategoria: 'ai', waga: 'ostrzezenie', tytul: 'robots.txt blokuje boty AI', opis: 'Zablokowany bot nie pobierze strony, więc ChatGPT czy Perplexity jej nie zacytują. Zablokowane: GPTBot, OAI-SearchBot.', jakNaprawic: 'Wpuść boty wyszukiwania AI (OAI-SearchBot, PerplexityBot, ChatGPT-User).', strony: [], liczba: 1 },
  { id: 'obrazy_bez_alt', kategoria: 'tresc', waga: 'ostrzezenie', tytul: 'Obrazy bez tekstu alternatywnego (alt)', opis: 'Google Grafika i czytniki ekranu nie wiedzą, co przedstawia obraz.', jakNaprawic: 'Dodaj atrybut alt opisujący obraz.', strony: ['https://przyklad.pl/realizacje'], liczba: 1 },
  { id: 'brak_mapy', kategoria: 'techniczne', waga: 'ostrzezenie', tytul: 'Brak mapy strony (sitemap.xml)', opis: 'Mapa strony przyspiesza odkrywanie nowych podstron.', jakNaprawic: 'Wygeneruj sitemap.xml i zgłoś ją w Google Search Console.', strony: [], liczba: 1 },
  { id: 'brak_llms', kategoria: 'ai', waga: 'uwaga', tytul: 'Brak pliku llms.txt', opis: 'Dobrowolny spis najważniejszych podstron dla modeli językowych.', jakNaprawic: 'Wygeneruj plik w naszym generatorze llms.txt.', strony: [], liczba: 1 },
];
const AUDYT = {
  domena: 'przyklad.pl', url: 'https://przyklad.pl/', wynik: 71, stron: 18,
  kategorie: { techniczne: { wynik: 84, bledy: 0, ostrzezenia: 1, uwagi: 0 }, tresc: { wynik: 62, bledy: 1, ostrzezenia: 2, uwagi: 0 }, wydajnosc: { wynik: 68, bledy: 0, ostrzezenia: 0, uwagi: 0 }, ai: { wynik: 70, bledy: 0, ostrzezenia: 1, uwagi: 1 } },
  wydajnoscZmierzona: true,
  liczby: { bledy: 1, ostrzezenia: 4, uwagi: 1 },
  psi: { wydajnosc: 64, seo: 92, dostepnosc: 88, praktyki: 96 },
};

const SILNIKI = [
  { id: 'chat_gpt', etykieta: 'ChatGPT', opis: 'z wyszukiwaniem w sieci, Polska', dostepny: true, powod: null, wzmianki: 1, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'gemini', etykieta: 'Gemini', opis: 'z wyszukiwaniem Google', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'perplexity', etykieta: 'Perplexity', opis: 'wyszukiwarka AI', dostepny: true, powod: null, wzmianki: 2, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'claude', etykieta: 'Claude', opis: 'z wyszukiwaniem w sieci', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'aio', etykieta: 'Przegląd AI w Google', opis: 'AI Overviews w wynikach Google', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 1, bezPrzegladu: 2 },
  { id: 'grok', etykieta: 'Grok', opis: 'model xAI, wiedza modelu', dostepny: false, powod: 'Silnik chwilowo wyłączony.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
  { id: 'copilot', etykieta: 'Microsoft Copilot', opis: 'brak publicznego API', dostepny: false, powod: 'Microsoft nie udostępnia publicznego API Copilota, więc nie da się go odpytać automatycznie.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
];
const PYTANIA = ['Jaką firmę z branży „stolarz” polecasz w mieście Warszawa? Podaj kilka nazw.', 'Kto jest najlepszy w branży „stolarz” w mieście Warszawa?', 'Szukam: stolarz, Warszawa. Którą firmę wybrać i dlaczego?'];
const siatka = (silniki = SILNIKI, pytania = PYTANIA) => silniki.filter((s) => s.dostepny).flatMap((s) => pytania.map((p, i) => ({ silnik: s.id, pytanie: p, wymieniona: i < s.wzmianki, brakOdpowiedzi: s.id === 'aio' && i > 0 })));

const MAKIETA = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>body{margin:0;font-family:system-ui,sans-serif;color:#1e1e1e}header{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;background:#fff}nav a{margin-left:20px;color:#1e1e1e;text-decoration:none}.hero{padding:96px 48px;background:linear-gradient(135deg,#0a1337,#1b2470);color:#fff}.hero h1{font-size:52px;max-width:720px;margin:0 0 16px}.btn{display:inline-block;background:#d85a30;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none}section{padding:64px 48px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.k{background:#f6efe6;border-radius:20px;padding:24px}</style></head><body>
<section data-sekcja="1"><header><strong>Przykład Sp. z o.o.</strong><nav><a href="#">Oferta</a><a href="#">Realizacje</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Meble na wymiar, zaprojektowane pod Twoje wnętrze</h1><p>Przykładowa makieta trybu demo.</p><a class="btn" href="#">Umów pomiar</a></div></section>
<section data-sekcja="2"><h2>Usługi</h2><div class="grid"><div class="k">Kuchnie</div><div class="k">Szafy</div><div class="k">Zabudowy</div></div></section>
<section data-sekcja="3"><h2>Kontakt</h2><p>Telefon i adres z obecnej strony.</p></section></body></html>`;

// ---- Wersja EN (lang: 'en'): te same kształty danych, teksty po angielsku, domena example.com. ----
const PROBLEMY_EN = [
  { id: 'brak_h1', kategoria: 'tresc', waga: 'blad', tytul: 'Missing H1 heading', opis: 'The H1 tells search engines and readers what the page is about.', jakNaprawic: 'Add a single H1 heading containing the main keyword of the page.', strony: ['https://example.com/services', 'https://example.com/contact'], liczba: 2 },
  { id: 'brak_opisu', kategoria: 'tresc', waga: 'ostrzezenie', tytul: 'Missing meta description', opis: 'Google will pick a text snippet on its own, usually one that is less likely to earn the click.', jakNaprawic: 'Add a 120-160 character meta description with a benefit and a call to action.', strony: ['https://example.com/services', 'https://example.com/about', 'https://example.com/blog'], liczba: 3 },
  { id: 'boty_ai_zablokowane', kategoria: 'ai', waga: 'ostrzezenie', tytul: 'robots.txt blocks AI bots', opis: 'A blocked bot cannot fetch the page, so ChatGPT or Perplexity cannot cite it. Blocked: GPTBot, OAI-SearchBot.', jakNaprawic: 'Allow AI search bots (OAI-SearchBot, PerplexityBot, ChatGPT-User).', strony: [], liczba: 1 },
  { id: 'obrazy_bez_alt', kategoria: 'tresc', waga: 'ostrzezenie', tytul: 'Images without alternative text (alt)', opis: 'Google Images and screen readers cannot tell what the image shows.', jakNaprawic: 'Add an alt attribute describing the image.', strony: ['https://example.com/projects'], liczba: 1 },
  { id: 'brak_mapy', kategoria: 'techniczne', waga: 'ostrzezenie', tytul: 'Missing sitemap (sitemap.xml)', opis: 'A sitemap speeds up the discovery of new pages.', jakNaprawic: 'Generate a sitemap.xml and submit it in Google Search Console.', strony: [], liczba: 1 },
  { id: 'brak_llms', kategoria: 'ai', waga: 'uwaga', tytul: 'Missing llms.txt file', opis: 'An optional list of the most important pages for language models.', jakNaprawic: 'Generate the file with our llms.txt generator.', strony: [], liczba: 1 },
];
const AUDYT_EN = { ...AUDYT, domena: 'example.com', url: 'https://example.com/' };

const SILNIKI_EN = [
  { id: 'chat_gpt', etykieta: 'ChatGPT', opis: 'with web search, Poland', dostepny: true, powod: null, wzmianki: 1, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'gemini', etykieta: 'Gemini', opis: 'with Google Search', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'perplexity', etykieta: 'Perplexity', opis: 'AI search engine', dostepny: true, powod: null, wzmianki: 2, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'claude', etykieta: 'Claude', opis: 'with web search', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'aio', etykieta: 'Google AI Overviews', opis: 'AI Overviews in Google results', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 1, bezPrzegladu: 2 },
  { id: 'grok', etykieta: 'Grok', opis: 'xAI model, model knowledge', dostepny: false, powod: 'Engine temporarily disabled.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
  { id: 'copilot', etykieta: 'Microsoft Copilot', opis: 'no public API', dostepny: false, powod: 'Microsoft does not offer a public Copilot API, so it cannot be queried automatically.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
];
const PYTANIA_EN = ['Which carpentry company in Warsaw do you recommend? Please give a few names.', 'Who is the best carpenter in Warsaw?', 'I am looking for a carpenter in Warsaw. Which company should I choose and why?'];

const MAKIETA_EN = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>body{margin:0;font-family:system-ui,sans-serif;color:#1e1e1e}header{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;background:#fff}nav a{margin-left:20px;color:#1e1e1e;text-decoration:none}.hero{padding:96px 48px;background:linear-gradient(135deg,#0a1337,#1b2470);color:#fff}.hero h1{font-size:52px;max-width:720px;margin:0 0 16px}.btn{display:inline-block;background:#d85a30;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none}section{padding:64px 48px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.k{background:#f6efe6;border-radius:20px;padding:24px}</style></head><body>
<section data-sekcja="1"><header><strong>Example Ltd.</strong><nav><a href="#">Services</a><a href="#">Projects</a><a href="#">Contact</a></nav></header><div class="hero"><h1>Custom-made furniture, designed for your interior</h1><p>Sample mockup in demo mode.</p><a class="btn" href="#">Book a measurement</a></div></section>
<section data-sekcja="2"><h2>Services</h2><div class="grid"><div class="k">Kitchens</div><div class="k">Wardrobes</div><div class="k">Built-ins</div></div></section>
<section data-sekcja="3"><h2>Contact</h2><p>Phone and address from the current website.</p></section></body></html>`;

const EN_AUTORYTET_TEKST = 'The link profile is modest. That is enough for local and niche keywords, but for competitive keywords you need links from stronger industry sites and media.';
const LICENCJA = { tekst: 'Domain Rating by Ahrefs', url: 'https://ahrefs.com/' };

export async function demoNarzedzia(narzedzie, body) {
  const en = body?.lang === 'en';
  await czekaj(narzedzie === 'makieta' ? 4000 : narzedzie === 'widocznosc_ai' ? 3500 : 2500);
  if (en) return demoNarzedziaEn(narzedzie, body);
  if (narzedzie === 'audyt_seo') return { ok: true, id: 'demo-audyt', podglad: { ...AUDYT, problemy: PROBLEMY.slice(0, 3), zablokowane: PROBLEMY.slice(3).map(({ id, kategoria, waga, liczba }) => ({ id, kategoria, waga, liczba })) } };
  if (narzedzie === 'autorytet') return { ok: true, id: 'demo-dr', podglad: { domena: String(body.domena || 'przyklad.pl'), dr: 23, poziom: 'niski', tekst: 'Profil linków jest skromny. Na frazy lokalne i niszowe to wystarcza, przy konkurencyjnych frazach potrzebne są linki z mocniejszych serwisów branżowych i mediów.', licencja: { tekst: 'Domain Rating by Ahrefs', url: 'https://ahrefs.com/' } } };
  if (narzedzie === 'widocznosc_ai') return { ok: true, id: 'demo-ai', podglad: { firma: body.firma, branza: body.branza, miasto: body.miasto || null, pytania: PYTANIA, wynik: 23, wzmianki: 3, odpowiedzi: 13, silniki: SILNIKI, siatka: siatka(), konkurentow: 6, zrodel: 9, konkurenciTop: [{ nazwa: 'Stolarnia A', ile: 5 }, { nazwa: 'Meble B', ile: 3 }, { nazwa: 'Kuchnie C', ile: 3 }, { nazwa: 'Fornir D', ile: 2 }, { nazwa: 'Drewno E', ile: 2 }], zrodlaTop: [{ domena: 'oferteo.pl', ile: 4 }, { domena: 'panoramafirm.pl', ile: 3 }, { domena: 'pkt.pl', ile: 3 }, { domena: 'houzz.pl', ile: 2 }, { domena: 'zumi.pl', ile: 1 }] } };
  if (narzedzie === 'makieta') {
    const i = MAKIETA.indexOf('<section data-sekcja="2"');
    return { ok: true, id: 'demo-makieta', podglad: { domena: 'przyklad.pl', nazwa: 'Przykład Sp. z o.o.', zrzut: null, html: `${MAKIETA.slice(0, i)}</body></html>`, sekcji: 3 } };
  }
  return { ok: false, blad: 'Nieznane narzędzie.' };
}

function demoNarzedziaEn(narzedzie, body) {
  if (narzedzie === 'audyt_seo') return { ok: true, id: 'demo-audyt', podglad: { ...AUDYT_EN, problemy: PROBLEMY_EN.slice(0, 3), zablokowane: PROBLEMY_EN.slice(3).map(({ id, kategoria, waga, liczba }) => ({ id, kategoria, waga, liczba })) } };
  if (narzedzie === 'autorytet') return { ok: true, id: 'demo-dr', podglad: { domena: String(body.domena || 'example.com'), dr: 23, poziom: 'low', tekst: EN_AUTORYTET_TEKST, licencja: LICENCJA } };
  if (narzedzie === 'widocznosc_ai') return { ok: true, id: 'demo-ai', podglad: { firma: body.firma, branza: body.branza, miasto: body.miasto || null, pytania: PYTANIA_EN, wynik: 23, wzmianki: 3, odpowiedzi: 13, silniki: SILNIKI_EN, siatka: siatka(SILNIKI_EN, PYTANIA_EN), konkurentow: 6, zrodel: 9, konkurenciTop: [{ nazwa: 'Carpentry A', ile: 5 }, { nazwa: 'Furniture B', ile: 3 }, { nazwa: 'Kitchens C', ile: 3 }, { nazwa: 'Veneer D', ile: 2 }, { nazwa: 'Timber E', ile: 2 }], zrodlaTop: [{ domena: 'yelp.com', ile: 4 }, { domena: 'houzz.com', ile: 3 }, { domena: 'checkatrade.com', ile: 3 }, { domena: 'yell.com', ile: 2 }, { domena: 'bark.com', ile: 1 }] } };
  if (narzedzie === 'makieta') {
    const i = MAKIETA_EN.indexOf('<section data-sekcja="2"');
    return { ok: true, id: 'demo-makieta', podglad: { domena: 'example.com', nazwa: 'Example Ltd.', zrzut: null, html: `${MAKIETA_EN.slice(0, i)}</body></html>`, sekcji: 3 } };
  }
  return { ok: false, blad: 'Unknown tool.' };
}

function demoOdblokujEn(body, newsletter) {
  if (body.narzedzie === 'kalkulator') return { ok: true, pelny: policzStraty(body.dane), newsletter };
  if (body.narzedzie === 'audyt_seo') return { ok: true, pelny: { ...AUDYT_EN, problemy: PROBLEMY_EN }, newsletter };
  if (body.narzedzie === 'autorytet') return { ok: true, pelny: { domena: 'example.com', dr: 23, poziom: 'low', tekst: '', konkurenci: (body.konkurenci || []).filter(Boolean).map((d, i) => ({ domena: d, dr: [41, 12, 35][i] ?? 20 })), licencja: LICENCJA }, newsletter };
  if (body.narzedzie === 'widocznosc_ai') {
    return {
      ok: true,
      newsletter,
      pelny: {
        firma: 'Example', branza: 'carpenter', miasto: 'Warsaw', pytania: PYTANIA_EN, wynik: 23, wzmianki: 3, odpowiedzi: 13, silniki: SILNIKI_EN,
        wiersze: siatka(SILNIKI_EN, PYTANIA_EN).map((r) => ({ ...r, fragment: r.wymieniona ? 'Worth a look: Example builds custom kitchens.' : null, odpowiedz: 'Sample model answer in demo mode.', zrodla: ['oferteo.pl', 'panoramafirm.pl'] })),
        konkurenci: [{ nazwa: 'Carpentry A', ile: 5 }, { nazwa: 'Furniture B', ile: 3 }],
        zrodla: [{ domena: 'oferteo.pl', ile: 4 }, { domena: 'panoramafirm.pl', ile: 3 }],
      },
    };
  }
  if (body.narzedzie === 'makieta') return { ok: true, pelny: { domena: 'example.com', nazwa: 'Example Ltd.', html: MAKIETA_EN, zrzut: null, sekcji: 3, link: '#' }, newsletter };
  return { ok: false, blad: 'Unknown tool.' };
}

export async function demoOdblokuj(body) {
  await czekaj(1200);
  const newsletter = body.newsletter ? 'pending' : null;
  if (body.lang === 'en') return demoOdblokujEn(body, newsletter);
  if (body.narzedzie === 'kalkulator') return { ok: true, pelny: policzStraty(body.dane), newsletter };
  if (body.narzedzie === 'audyt_seo') return { ok: true, pelny: { ...AUDYT, problemy: PROBLEMY }, newsletter };
  if (body.narzedzie === 'autorytet') return { ok: true, pelny: { domena: 'przyklad.pl', dr: 23, poziom: 'niski', tekst: '', konkurenci: (body.konkurenci || []).filter(Boolean).map((d, i) => ({ domena: d, dr: [41, 12, 35][i] ?? 20 })), licencja: { tekst: 'Domain Rating by Ahrefs', url: 'https://ahrefs.com/' } }, newsletter };
  if (body.narzedzie === 'widocznosc_ai') {
    return {
      ok: true,
      newsletter,
      pelny: {
        firma: 'Przykład', branza: 'stolarz', miasto: 'Warszawa', pytania: PYTANIA, wynik: 23, wzmianki: 3, odpowiedzi: 13, silniki: SILNIKI,
        wiersze: siatka().map((r) => ({ ...r, fragment: r.wymieniona ? 'Warto sprawdzić Przykład: robi kuchnie na wymiar.' : null, odpowiedz: 'Przykładowa odpowiedź modelu w trybie demo.', zrodla: ['oferteo.pl', 'panoramafirm.pl'] })),
        konkurenci: [{ nazwa: 'Stolarnia A', ile: 5 }, { nazwa: 'Meble B', ile: 3 }],
        zrodla: [{ domena: 'oferteo.pl', ile: 4 }, { domena: 'panoramafirm.pl', ile: 3 }],
      },
    };
  }
  if (body.narzedzie === 'makieta') return { ok: true, pelny: { domena: 'przyklad.pl', nazwa: 'Przykład Sp. z o.o.', html: MAKIETA, zrzut: null, sekcji: 3, link: '#' }, newsletter };
  return { ok: false, blad: 'Nieznane narzędzie.' };
}
