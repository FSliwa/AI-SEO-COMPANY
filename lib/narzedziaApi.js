// Klient API darmowych narzędzi (panel.ai-seo-company.pl/api/narzedzia/*, repo panelu:
// app/api/narzedzia). Przebieg: wywolajNarzedzie() zwraca podgląd + id, odblokuj() z e-mailem
// zwraca pełny wynik i wysyła raport. Każde wywołanie niesie lang ('pl' | 'en') w treści: panel
// odpowiada w tym języku (brak lang = 'pl'). Komunikaty błędów przychodzą z panelu w tym języku.
//
// Tryb demo (NEXT_PUBLIC_NARZEDZIA_DEMO=1) TYLKO do lokalnego podglądu wyglądu bez panelu
// i kluczy API: odpowiedzi z lib/narzedziaDemo.js, oznaczone na stronie. Nigdy w Vercel.
export const PANEL_API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/narzedzia`;
export const DEMO = process.env.NEXT_PUBLIC_NARZEDZIA_DEMO === '1';

const SCIEZKI = { audyt_seo: 'audyt-seo', autorytet: 'autorytet', widocznosc_ai: 'widocznosc-ai', makieta: 'makieta' };

async function post(sciezka, body, timeoutMs) {
  const en = body?.lang === 'en';
  body = { ...body, lang: en ? 'en' : 'pl' };
  const ctrl = new AbortController();
  const zegar = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${PANEL_API}/${sciezka}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { ok: false, status: res.status, blad: data.error || (en ? 'Something went wrong. Please try again in a moment.' : 'Nie udało się. Spróbuj za chwilę.') };
    return data;
  } catch (e) {
    return { ok: false, status: 0, blad: e?.name === 'AbortError'
      ? (en ? 'This is taking longer than usual. Please try again in a moment.' : 'Trwa to dłużej niż zwykle. Spróbuj jeszcze raz za chwilę.')
      : (en ? 'Could not reach the tool server. Check your connection and try again.' : 'Brak połączenia z serwerem narzędzia. Sprawdź internet i spróbuj ponownie.') };
  } finally {
    clearTimeout(zegar);
  }
}

/** Uruchamia narzędzie. Zwraca { ok, id, podglad } albo { ok: false, blad }. */
export async function wywolajNarzedzie(narzedzie, body, timeoutMs = 150_000) {
  if (DEMO) return (await import('./narzedziaDemo')).demoNarzedzia(narzedzie, body);
  return post(SCIEZKI[narzedzie], body, timeoutMs);
}

/** Bramka e-mail. Zwraca { ok, pelny, newsletter } albo { ok: false, blad }. */
export async function odblokuj(body) {
  if (DEMO) return (await import('./narzedziaDemo')).demoOdblokuj(body);
  return post('odblokuj', body, 60_000);
}
