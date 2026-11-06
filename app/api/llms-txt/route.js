import { NextResponse } from 'next/server';
import { generuj, BladZadania } from './generator';
import { czyOpublikowana } from '@/lib/publikacja';

// API generatora llms.txt i testu dostępu botów AI (N1, PLAN-v2 6.10; CB-09, CB-18; 5.11.2026).
// POST { url } -> { ok, llmsTxt, boty[8], pominiete[], nieprzetworzone[], mapa, robots, ... }.
// Logika i ochrona przed SSRF: ./generator.js. Endpoint nie zapisuje adresów ani wyników
// (bez bazy, bez logów z adresem). /api/ jest zablokowane w robots.txt (app/robots.js).

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Limit globalny generatora to 20 s; 30 s daje zapas na odpowiedź (PLAN-v2 6.10).
export const maxDuration = 30;

// Limit 10 wywołań na adres IP na dobę (PLAN-v2 6.10). OGRANICZENIE: licznik żyje w pamięci
// instancji funkcji (jak limit w app/api/contact/route.js). Vercel może obsłużyć jedno IP kilkoma
// instancjami, a zimny start zeruje licznik, więc to bariera przed nadużyciem, a nie twardy limit.
// Twardy limit wymagałby wspólnego magazynu (np. KV), którego serwis dziś nie ma.
const LIMIT_DZIENNY = 10;
const OKNO_MS = 24 * 60 * 60 * 1000;
const wywolania = new Map();

function przekroczonyLimit(ip) {
  const teraz = Date.now();
  const lista = (wywolania.get(ip) || []).filter((t) => teraz - t < OKNO_MS);
  lista.push(teraz);
  wywolania.set(ip, lista);
  if (wywolania.size > 5000) {
    for (const [klucz, czasy] of wywolania) {
      if (!czasy.some((t) => teraz - t < OKNO_MS)) wywolania.delete(klucz);
    }
  }
  return lista.length > LIMIT_DZIENNY;
}

const NAGLOWKI = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
const odpowiedz = (dane, status = 200) => NextResponse.json(dane, { status, headers: NAGLOWKI });

export async function POST(request) {
  // Przegląd 6.11.2026: dopóki strona N1 nie jest opublikowana (lib/publikacja.js), endpoint nie
  // pobiera cudzych stron – bez tego działałby jako publiczny pobieracz adresów bez interfejsu.
  if (!czyOpublikowana('/narzedzia/generator-llms-txt')) {
    return odpowiedz({ ok: false, error: 'Nie znaleziono.' }, 404);
  }
  const start = Date.now();
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'nieznany';
  if (przekroczonyLimit(ip)) {
    return odpowiedz({ ok: false, error: 'Wykorzystałeś dzienny limit 10 sprawdzeń z jednego adresu IP. Spróbuj jutro.' }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return odpowiedz({ ok: false, error: 'Podaj adres strony, np. firma.pl.' }, 400);
  }

  try {
    const wynik = await generuj(body && body.url, { start });
    return odpowiedz(wynik);
  } catch (e) {
    if (e instanceof BladZadania) return odpowiedz({ ok: false, error: e.message }, e.status);
    // Bez adresu sprawdzanej strony w logu (zasada „bez zapisu danych”).
    console.error('llms-txt: nieoczekiwany błąd', e && e.name);
    return odpowiedz({ ok: false, error: 'Coś poszło nie tak po naszej stronie. Spróbuj za chwilę.' }, 500);
  }
}
