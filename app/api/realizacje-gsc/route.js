import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { SERIE_GSC, METRYKI_GSC } from '@/lib/realizacjeGsc';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'dane', 'realizacje-gsc.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }
  } catch (e) {
    console.error('Błąd odczytu realizacje-gsc.json:', e);
  }

  // Fallback do wkompilowanych danych statycznych
  return NextResponse.json(
    {
      ok: true,
      zrodlo: 'fallback-statyczny',
      serie: SERIE_GSC,
      metryki: METRYKI_GSC,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
