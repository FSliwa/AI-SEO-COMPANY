import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { WYDANIE } from '@/lib/lastmod';
import { planZgloszenia, zglos } from '../../../../scripts/sitemap/indexnow-klient.mjs';

// Cron Vercel (vercel.json: 15 6 * * *, czyli codziennie ok. 7:15/8:15 czasu polskiego):
// zgłasza do IndexNow (Bing, Yandex, Seznam, Naver) adresy z ostatniego wydania lastmod
// (lib/lastmod.json -> _wydanie.zmienione i _wydanie.usuniete), ale tylko w ciągu 26 h od buildu
// tego wdrożenia. Bez stanu i idempotentnie: najwyżej dwa zgłoszenia tej samej listy po
// wdrożeniu, zero po wdrożeniu bez nowych dat. Opis: scripts/sitemap/README.md.
//
// Autoryzacja: z CRON_SECRET (Vercel dokleja wtedy do wywołania crona nagłówek
// Authorization: Bearer <CRON_SECRET>) wymagany jest ten nagłówek; bez sekretu wystarczy
// user-agent vercel-cron/*. Na wdrożeniach podglądu (VERCEL_ENV != production) nic nie wysyła.
// ?sucho=1 zwraca plan bez wysyłania (test ręczny, też na podglądzie i lokalnie).
// Stempel buildu: NEXT_PUBLIC_ZBUDOWANO ustawia skrypt "build" w package.json; Next wkleja
// wartość w kod przy buildzie, więc w czasie działania to stała chwila buildu.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function rowne(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

function autoryzowany(request) {
  const sekret = process.env.CRON_SECRET;
  if (sekret) return rowne(request.headers.get('authorization') || '', `Bearer ${sekret}`);
  return (request.headers.get('user-agent') || '').startsWith('vercel-cron/');
}

export async function GET(request) {
  if (!autoryzowany(request)) return NextResponse.json({ blad: 'brak autoryzacji' }, { status: 401 });

  const sucho = new URL(request.url).searchParams.get('sucho') === '1';
  const zbudowano = process.env.NEXT_PUBLIC_ZBUDOWANO || null;
  const plan = planZgloszenia({ teraz: Date.now(), srodowisko: process.env.VERCEL_ENV, zbudowano, wydanie: WYDANIE });
  const opis = { wydanie: WYDANIE?.data ?? null, zbudowano, powod: plan.powod };

  if (sucho) return NextResponse.json({ ...opis, sucho: true, zglosilby: plan.zglos, adresy: plan.kandydaci, pominiete: plan.pominiete });
  if (!plan.zglos) {
    console.log(`[indexnow] pominięte: ${plan.powod}`);
    return NextResponse.json({ ...opis, zgloszono: 0 });
  }
  try {
    const wynik = await zglos(plan.adresy);
    console.log(`[indexnow] ${wynik.zgloszono} adresów, HTTP ${wynik.status} (${plan.powod})`);
    return NextResponse.json({ ...opis, zgloszono: wynik.zgloszono, status: wynik.status, pominiete: plan.pominiete }, { status: wynik.ok ? 200 : 502 });
  } catch (e) {
    console.error(`[indexnow] błąd: ${e?.message || e}`);
    return NextResponse.json({ ...opis, zgloszono: 0, blad: String(e?.message || e) }, { status: 502 });
  }
}
