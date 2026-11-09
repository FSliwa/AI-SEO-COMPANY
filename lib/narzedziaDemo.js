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
  { id: 'gemini', etykieta: 'Gemini', opis: 'model Google', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'perplexity', etykieta: 'Perplexity', opis: 'wyszukiwarka AI', dostepny: true, powod: null, wzmianki: 2, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'claude', etykieta: 'Claude', opis: 'z wyszukiwaniem w sieci', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 3, bezPrzegladu: 0 },
  { id: 'aio', etykieta: 'Przegląd AI w Google', opis: 'AI Overviews w wynikach Google', dostepny: true, powod: null, wzmianki: 0, odpowiedzi: 1, bezPrzegladu: 2 },
  { id: 'grok', etykieta: 'Grok', opis: 'model xAI, wiedza modelu', dostepny: false, powod: 'Silnik chwilowo wyłączony.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
  { id: 'copilot', etykieta: 'Microsoft Copilot', opis: 'brak publicznego API', dostepny: false, powod: 'Microsoft nie udostępnia publicznego API Copilota, więc nie da się go odpytać automatycznie.', wzmianki: 0, odpowiedzi: 0, bezPrzegladu: 0 },
];
const PYTANIA = ['Jaką firmę z branży „stolarz” polecasz w mieście Warszawa? Podaj kilka nazw.', 'Kto jest najlepszy w branży „stolarz” w mieście Warszawa?', 'Szukam: stolarz, Warszawa. Którą firmę wybrać i dlaczego?'];
const siatka = () => SILNIKI.filter((s) => s.dostepny).flatMap((s) => PYTANIA.map((p, i) => ({ silnik: s.id, pytanie: p, wymieniona: i < s.wzmianki, brakOdpowiedzi: s.id === 'aio' && i > 0 })));

const MAKIETA = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>body{margin:0;font-family:system-ui,sans-serif;color:#1e1e1e}header{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;background:#fff}nav a{margin-left:20px;color:#1e1e1e;text-decoration:none}.hero{padding:96px 48px;background:linear-gradient(135deg,#0a1337,#1b2470);color:#fff}.hero h1{font-size:52px;max-width:720px;margin:0 0 16px}.btn{display:inline-block;background:#d85a30;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none}section{padding:64px 48px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.k{background:#f6efe6;border-radius:20px;padding:24px}</style></head><body>
<section data-sekcja="1"><header><strong>Przykład Sp. z o.o.</strong><nav><a href="#">Oferta</a><a href="#">Realizacje</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Meble na wymiar, zaprojektowane pod Twoje wnętrze</h1><p>Przykładowa makieta trybu demo.</p><a class="btn" href="#">Umów pomiar</a></div></section>
<section data-sekcja="2"><h2>Usługi</h2><div class="grid"><div class="k">Kuchnie</div><div class="k">Szafy</div><div class="k">Zabudowy</div></div></section>
<section data-sekcja="3"><h2>Kontakt</h2><p>Telefon i adres z obecnej strony.</p></section></body></html>`;

export async function demoNarzedzia(narzedzie, body) {
  await czekaj(narzedzie === 'makieta' ? 4000 : narzedzie === 'widocznosc_ai' ? 3500 : 2500);
  if (narzedzie === 'audyt_seo') return { ok: true, id: 'demo-audyt', podglad: { ...AUDYT, problemy: PROBLEMY.slice(0, 3), zablokowane: PROBLEMY.slice(3).map(({ id, kategoria, waga, liczba }) => ({ id, kategoria, waga, liczba })) } };
  if (narzedzie === 'autorytet') return { ok: true, id: 'demo-dr', podglad: { domena: String(body.domena || 'przyklad.pl'), dr: 23, poziom: 'niski', tekst: 'Profil linków jest skromny. Na frazy lokalne i niszowe to wystarcza, przy konkurencyjnych frazach potrzebne są linki z mocniejszych serwisów branżowych i mediów.', licencja: { tekst: 'Domain Rating by Ahrefs', url: 'https://ahrefs.com/' } } };
  if (narzedzie === 'widocznosc_ai') return { ok: true, id: 'demo-ai', podglad: { firma: body.firma, branza: body.branza, miasto: body.miasto || null, pytania: PYTANIA, wynik: 23, wzmianki: 3, odpowiedzi: 13, silniki: SILNIKI, siatka: siatka(), konkurentow: 6, zrodel: 9 } };
  if (narzedzie === 'makieta') {
    const i = MAKIETA.indexOf('<section data-sekcja="2"');
    return { ok: true, id: 'demo-makieta', podglad: { domena: 'przyklad.pl', nazwa: 'Przykład Sp. z o.o.', zrzut: null, html: `${MAKIETA.slice(0, i)}</body></html>`, sekcji: 3 } };
  }
  return { ok: false, blad: 'Nieznane narzędzie.' };
}

export async function demoOdblokuj(body) {
  await czekaj(1200);
  const newsletter = body.newsletter ? 'pending' : null;
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
