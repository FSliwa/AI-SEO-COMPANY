import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { SERIE_GSC, METRYKI_GSC } from '@/lib/realizacjeGsc';
import { fetchLiveGscData } from '@/lib/gscLive';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// 20.11.2026: endpoint pobiera dane bezpośrednio z Google Search Console.
// Wcześniej czytał tylko public/dane/realizacje-gsc.json, a na Vercelu system
// plików jest tylko do odczytu - cron nie mógł nadpisać pliku, więc strona
// pokazywała stan z dnia commita. Kolejność: GSC na żywo (pamięć instancji
// 1 h + cache CDN 1 h) -> plik JSON z repo -> dane wkompilowane.
const CZAS_PAMIECI_MS = 60 * 60 * 1000;
let pamiec = null; // { dane, kiedy }

const NAGLOWKI = { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' };

export async function GET() {
  if (pamiec && Date.now() - pamiec.kiedy < CZAS_PAMIECI_MS) {
    return NextResponse.json({ ...pamiec.dane, zrodlo: 'gsc-na-zywo' }, { headers: NAGLOWKI });
  }

  try {
    const dane = await fetchLiveGscData();
    if (dane?.ok && dane.serie && Object.keys(dane.serie).length) {
      pamiec = { dane, kiedy: Date.now() };
      return NextResponse.json({ ...dane, zrodlo: 'gsc-na-zywo' }, { headers: NAGLOWKI });
    }
  } catch (e) {
    console.error('realizacje-gsc: pobranie z GSC nieudane, używam zapasu:', e?.message || e);
  }

  try {
    const jsonPath = path.join(process.cwd(), 'public', 'dane', 'realizacje-gsc.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      return NextResponse.json({ ...data, zrodlo: 'plik-zapasowy' }, { headers: NAGLOWKI });
    }
  } catch (e) {
    console.error('Błąd odczytu realizacje-gsc.json:', e);
  }

  return NextResponse.json(
    { ok: true, zrodlo: 'fallback-statyczny', serie: SERIE_GSC, metryki: METRYKI_GSC },
    { headers: NAGLOWKI }
  );
}
