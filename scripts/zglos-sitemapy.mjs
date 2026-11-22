#!/usr/bin/env node
// Zgłasza indeks /sitemap.xml oraz wszystkie 9 pod-map segmentowych XML
// do Google Search Console API (sc-domain:ai-seo-company.pl) oraz Bing Webmaster API.
// Użycie: npm run zglos:sitemapy (lub node --env-file=.env.local scripts/zglos-sitemapy.mjs [--sucho])

import { SEGMENT_SITEMAPS, submitAllSitemaps } from '../lib/gscSitemaps.js';

const sucho = process.argv.includes('--sucho');

async function main() {
  console.log(`[sitemapy] Przygotowano ${SEGMENT_SITEMAPS.length} map XML dla sc-domain:ai-seo-company.pl:`);
  for (const u of SEGMENT_SITEMAPS) console.log(`  - ${u}`);

  if (sucho) {
    console.log('[sitemapy] Tryb --sucho: pominięto wysyłkę sieciową.');
    return;
  }

  const { gsc, bing } = await submitAllSitemaps(SEGMENT_SITEMAPS);

  if (gsc.ok) {
    console.log(`[GSC] Zgłoszono ${gsc.submitted}/${SEGMENT_SITEMAPS.length} map z konta ${gsc.email}.`);
  } else if (gsc.reason === 'wymagane-odswiezenie-zakresu-webmasters-w-panelu') {
    console.warn(
      `[GSC] Token konta ${gsc.email} ma jeszcze stary zakres tylko-do-odczytu (${gsc.scopes}). ` +
      'Kliknij „Połącz inne konto” / odśwież połączenie na https://panel.ai-seo-company.pl/admin/integracje, ' +
      'aby zapisać rozszerzony zakres https://www.googleapis.com/auth/webmasters.'
    );
  } else {
    console.warn('[GSC] Nie zgłoszono wszystkich map:', JSON.stringify(gsc));
  }

  if (bing.ok) {
    console.log(`[Bing] Zgłoszono ${bing.submitted}/${SEGMENT_SITEMAPS.length} map przez BING_WEBMASTER_API_KEY.`);
  } else if (bing.skipped) {
    console.log('[Bing] Pominięto API SubmitFeed (brak zmiennej BING_WEBMASTER_API_KEY - używany IndexNow lub panel www).');
  } else {
    console.warn('[Bing] Błędy zgłaszania map:', JSON.stringify(bing.errors));
  }
}

main().catch((err) => {
  console.error('[sitemapy] Błąd krytyczny:', err);
  process.exit(1);
});
