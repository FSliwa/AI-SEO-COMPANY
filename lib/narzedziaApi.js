// Klient API darmowych narzędzi (panel.ai-seo-company.pl/api/narzedzia/*, repo panelu:
// app/api/narzedzia). Przebieg: wywolajNarzedzie() zwraca podgląd + id, odblokuj() z e-mailem
// zwraca pełny wynik i wysyła raport. Komunikaty błędów przychodzą z panelu po polsku.
//
// Tryb demo (NEXT_PUBLIC_NARZEDZIA_DEMO=1) TYLKO do lokalnego podglądu wyglądu bez panelu
// i kluczy API: odpowiedzi z lib/narzedziaDemo.js, oznaczone na stronie. Nigdy w Vercel.
export const PANEL_API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/narzedzia`;
export const DEMO = process.env.NEXT_PUBLIC_NARZEDZIA_DEMO === '1';

const SCIEZKI = { audyt_seo: 'audyt-seo', autorytet: 'autorytet', widocznosc_ai: 'widocznosc-ai', makieta: 'makieta' };

async function post(sciezka, body, timeoutMs) {
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
    if (!res.ok || !data.ok) return { ok: false, status: res.status, blad: data.error || 'Nie udało się. Spróbuj za chwilę.' };
    return data;
  } catch (e) {
    return { ok: false, status: 0, blad: e?.name === 'AbortError' ? 'Trwa to dłużej niż zwykle. Spróbuj jeszcze raz za chwilę.' : 'Brak połączenia z serwerem narzędzia. Sprawdź internet i spróbuj ponownie.' };
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
