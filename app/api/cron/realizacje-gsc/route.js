import fs from 'node:fs';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { fetchLiveGscData } from '@/lib/gscLive';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // Lokalnie lub bez sekretu zezwalamy na testy
  const header = req.headers.get('authorization') ?? '';
  const a = Buffer.from(header);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req) {
  if (!authorized(req)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const res = await fetchLiveGscData();

    // Zapis pliku zapasowego działa lokalnie; na Vercelu system plików jest
    // tylko do odczytu, więc błąd zapisu nie przerywa crona - strona i tak
    // bierze dane z /api/realizacje-gsc, które pyta GSC bezpośrednio.
    let zapisano = false;
    try {
      const publicDir = path.join(process.cwd(), 'public', 'dane');
      fs.mkdirSync(publicDir, { recursive: true });
      fs.writeFileSync(path.join(publicDir, 'realizacje-gsc.json'), JSON.stringify(res, null, 2), 'utf8');
      zapisano = true;
    } catch { /* EROFS na Vercelu */ }

    return NextResponse.json({
      ok: true,
      zapisanoPlik: zapisano,
      metryki: res.metryki,
      wygenerowano: res.wygenerowano,
      konto: res.pobraneDlaKonta,
      projekty: Object.keys(res.serie),
    });
  } catch (err) {
    console.error('Błąd cron/realizacje-gsc:', err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
