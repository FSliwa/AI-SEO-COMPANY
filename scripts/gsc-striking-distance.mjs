#!/usr/bin/env node
// Automatyczny raport „Striking Distance” z Google Search Console (Pakiet P3 - Fala 4 airSlate, 24.11.2026).
// Pobiera zapytania sc-domain:ai-seo-company.pl z ostatnich 90 dni, wylapuje frazy na pozycjach 4-30
// (najwieksza dzwignia szybkich klikniec), sprawdza pokrycie tokenow w zbudowanym HTML (.next/server/app)
// oraz wykrywa potencjalna kanibalizacje miedzy podstronami (zasada: 1 klaster = 1 URL, zero duplikatow).
// Uzycie: npm run gsc:striking-distance

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDecipheriv } from 'node:crypto';
import { Pool } from 'pg';
import { OAuth2Client } from 'google-auth-library';
import { STRONY_EN } from '../lib/stronyEn.js';
import { STRONY_DE } from '../lib/stronyDe.js';

const MAPA_EN_DO_PL = new Map([
  ['/seo-services', '/pozycjonowanie-stron-internetowych'],
  ['/seo-audit', '/audyt-seo'],
  ['/local-seo-warsaw', '/seo-lokalne-warszawa'],
  ['/seo-pricing', '/cennik-pozycjonowania'],
  ['/web-design', '/projektowanie-stron-internetowych'],
  ['/ai-search-optimization', '/pozycjonowanie-w-ai'],
  ['/client-portal', '/panel-klienta'],
  ['/about-us', '/o-nas'],
  ['/terms', '/regulamin'],
  ['/blog/how-to-get-google-reviews', '/blog/jak-pozyskiwac-opinie-google-poradnik'],
  ['/blog/local-seo-for-companies', '/blog/seo-lokalne-dla-firm-w-warszawie'],
  ['/blog/core-web-vitals-google-rankings', '/blog/core-web-vitals-a-pozycje-google'],
  ['/blog/canonical-tag-seo-guide-2026', '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026'],
  ['/blog/how-much-does-seo-cost-pricing-packages-2026', '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026'],
  ['/blog/b2b-link-building-strategies-checklist', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista'],
  ['/blog/how-much-does-a-business-website-cost-pricing', '/blog/ile-kosztuje-strona-www-dla-firmy-ceny'],
  ['/blog/seo-competitor-analysis-step-by-step-guide', '/blog/analiza-konkurencji-seo-przewodnik'],
  ['/blog/ux-audit-guide', '/blog/audyt-ux-strony'],
  ['/blog/vwo-vs-optimizely-comparison', '/blog/vwo-vs-optimizely-porownanie'],
  ['/blog/chatgpt-ads-vs-organic-geo', '/blog/reklamy-w-chatgpt'],
  ...Object.entries(STRONY_EN).map(([pl, w]) => [w.en, pl]),
]);

const MAPA_PL_ALIAS = new Map([
  ['/blog/analiza-luk-contentowych', '/blog/content-gap-analysis'],
  ['/blog/audyt-techniczny-seo', '/blog/technical-seo-audit-checklist'],
  ['/blog/storytelling-marki', '/blog/brand-storytelling-patterns'],
]);

const MAPA_DE_DO_PL = new Map(
  Object.entries(STRONY_DE).map(([pl, w]) => [w.de, pl])
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'sc-domain:ai-seo-company.pl';
const BASE_HOST = 'https://www.ai-seo-company.pl';

function decrypt(enc, keyB64) {
  const [v, iv, tag, body] = String(enc || '').split('.');
  if (v !== 'v1' || !iv || !tag || !body) {
    throw new Error('Nieznany format zaszyfrowanego tokenu OAuth');
  }
  const k = Buffer.from(keyB64, 'base64');
  const d = createDecipheriv('aes-256-gcm', k, Buffer.from(iv, 'base64url'));
  d.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([d.update(Buffer.from(body, 'base64url')), d.final()]).toString('utf8');
}

function wczorajPt() {
  const dzisiaj = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const [y, m, d] = dzisiaj.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

function odejmijDni(iso, dni) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - dni)).toISOString().slice(0, 10);
}

function normalizujTekst(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function znajdzPlikHtmlBuilda(urlStrony) {
  try {
    const u = new URL(urlStrony);
    let sciezka = u.pathname.replace(/\/+$/, '');
    if (sciezka.startsWith('/pl/')) sciezka = sciezka.slice(3);
    if (!sciezka || sciezka === '' || sciezka === '/pl') {
      sciezka = '/pl';
    } else if (sciezka === '/en') {
      sciezka = '/en';
    } else if (sciezka === '/de') {
      sciezka = '/de';
    } else if (sciezka.startsWith('/en/')) {
      const pod = sciezka.slice(3);
      const wewn = MAPA_EN_DO_PL.get(pod) || pod;
      sciezka = `/en${MAPA_PL_ALIAS.get(wewn) || wewn}`;
    } else if (sciezka.startsWith('/de/')) {
      const pod = sciezka.slice(3);
      const wewn = MAPA_DE_DO_PL.get(pod) || pod;
      sciezka = `/de${MAPA_PL_ALIAS.get(wewn) || wewn}`;
    } else {
      sciezka = `/pl${MAPA_PL_ALIAS.get(sciezka) || sciezka}`;
    }
    const kandydat = path.join(ROOT, '.next', 'server', 'app', `${sciezka}.html`);
    if (fs.existsSync(kandydat)) return kandydat;
    const indexKandydat = path.join(ROOT, '.next', 'server', 'app', sciezka, 'index.html');
    if (fs.existsSync(indexKandydat)) return indexKandydat;
  } catch {
    // pomijamy niepoprawny URL
  }
  return null;
}

function ocenPokrycieHtml(zapytanie, urlStrony) {
  const plik = znajdzPlikHtmlBuilda(urlStrony);
  if (!plik) return 'brak-builda-html';
  const html = fs.readFileSync(plik, 'utf8');
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h12Match = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)].map((m) => m[1]).join(' ');
  const czystyTekst = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');

  const qNorm = normalizujTekst(zapytanie);
  const slowa = qNorm.split(' ').filter((w) => w.length >= 3);
  if (!slowa.length) return 'fraza-krotka';

  const tNorm = normalizujTekst(titleMatch?.[1] || '');
  const hNorm = normalizujTekst(h12Match);
  const bodyNorm = normalizujTekst(czystyTekst);

  const wTitle = slowa.every((w) => tNorm.includes(w));
  const wNagl = slowa.every((w) => hNorm.includes(w));
  const wTresci = slowa.every((w) => bodyNorm.includes(w));

  if (wTitle || wNagl) return 'pelne (Title/H1-H2)';
  if (wTresci) return 'czesciowe (tylko tresc -> dodaj H2/FAQ)';
  const ileWTresci = slowa.filter((w) => bodyNorm.includes(w)).length;
  return `luka (${ileWTresci}/${slowa.length} slow -> rozbuduj sekcje H2/FAQ)`;
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  const encKey = process.env.ENCRYPTION_KEY;
  const clientId = process.env.GOOGLE_DATA_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DATA_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;

  if (!dbUrl || !encKey || !clientId || !clientSecret) {
    throw new Error('Brak zmiennych DATABASE_URL, ENCRYPTION_KEY, GOOGLE_CLIENT_ID lub GOOGLE_CLIENT_SECRET.');
  }

  const pool = new Pool({ connectionString: dbUrl, connectionTimeoutMillis: 8000 });
  let email = '';
  let refreshToken = '';
  try {
    const { rows } = await pool.query(
      'SELECT google_email, refresh_token_enc FROM google_connections ORDER BY created_at DESC LIMIT 1'
    );
    if (!rows.length) throw new Error('Brak polaczenia OAuth w tabeli google_connections.');
    email = rows[0].google_email;
    refreshToken = decrypt(rows[0].refresh_token_enc, encKey);
  } finally {
    await pool.end();
  }

  const oauth = new OAuth2Client({ clientId, clientSecret });
  oauth.setCredentials({ refresh_token: refreshToken });

  const endDate = wczorajPt();
  const startDate = odejmijDni(endDate, 89);

  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const { data } = await oauth.request({
    url: endpoint,
    method: 'POST',
    data: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 5000,
    },
  });

  const suroweWiersze = Array.isArray(data?.rows) ? data.rows : [];

  // Odfiltrowujemy jednowyrazowy szum ogolny ("ai") oraz stare przekierowania /pl/
  const wiersze = suroweWiersze
    .map((r) => ({
      query: r.keys[0],
      page: r.keys[1],
      clicks: Number(r.clicks || 0),
      impressions: Number(r.impressions || 0),
      ctr: Number(r.ctr || 0),
      position: Number(r.position || 0),
    }))
    .filter((r) => r.query.trim().toLowerCase() !== 'ai');

  const striking = wiersze
    .filter((r) => r.position >= 4.0 && r.position <= 30.9 && r.impressions >= 2)
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .slice(0, 40);

  const glebokie = wiersze
    .filter((r) => r.position >= 31.0 && r.position <= 80.0 && r.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);

  // Wykrywanie potencjalnej kanibalizacji (wiecej niz 1 kanoniczny URL z https://www. dla tej samej frazy)
  const mapaFraz = new Map();
  for (const r of wiersze) {
    if (!r.page.startsWith(BASE_HOST) || r.page.includes('/pl/')) continue;
    if (r.impressions < 2) continue;
    const lista = mapaFraz.get(r.query) || [];
    lista.push(r);
    mapaFraz.set(r.query, lista);
  }
  const kanibalizacja = [...mapaFraz.entries()]
    .filter(([, arr]) => arr.length >= 2)
    .map(([query, arr]) => ({
      query,
      sumaWysw: arr.reduce((s, x) => s + x.impressions, 0),
      strony: arr.sort((a, b) => b.impressions - a.impressions),
    }))
    .sort((a, b) => b.sumaWysw - a.sumaWysw)
    .slice(0, 20);

  const dzis = new Date().toISOString().slice(0, 10);
  const md = [
    `# Raport GSC Striking Distance (pozycje 4-30) i kontrola kanibalizacji`,
    ``,
    `- **Domena w GSC:** \`${SITE_URL}\` (konto: \`${email}\`)`,
    `- **Okno pomiarowe (90 dni):** \`${startDate}\` - \`${endDate}\` (wygenerowano: \`${dzis}\`)`,
    `- **Przeanalizowano par (fraza, URL):** \`${wiersze.length}\` (z pominieciem ogolnego hasla \`"ai"\`)`,
    `- **Zasada wdrozeniowa (Zero Kanibalizacji):** kazda fraza z tego raportu powinna wzmacniac **istniejacy docelowy adres URL** (sekcja H2, wiersz tabeli lub pytanie w FAQ), chyba ze intencja stanowi zupelnie osobna branze lub porownanie VS.`,
    ``,
    `## 1. Frazy Striking Distance (pozycje 4,0 - 30,9, min. 2 wyswietlenia)`,
    ``,
    `| # | Zapytanie z GSC | Docelowy URL | Wysw. | Klik. | Sr. poz. | Pokrycie w HTML (.next) |`,
    `| :- | :--- | :--- | --: | --: | --: | :--- |`,
    ...striking.map((r, i) => {
      const sciezka = r.page.replace(BASE_HOST, '') || '/';
      const pokr = ocenPokrycieHtml(r.query, r.page);
      return `| ${i + 1} | \`${r.query.replace(/\|/g, '/')}\` | \`${sciezka}\` | ${r.impressions} | ${r.clicks} | ${r.position.toFixed(1)} | ${pokr} |`;
    }),
    ``,
    `## 2. Frazy rozwojowe z wysokim popytem (pozycje 31,0 - 80,0, min. 5 wyswietlen)`,
    ``,
    `| # | Zapytanie z GSC | Docelowy URL | Wysw. | Klik. | Sr. poz. | Pokrycie w HTML (.next) |`,
    `| :- | :--- | :--- | --: | --: | --: | :--- |`,
    ...glebokie.map((r, i) => {
      const sciezka = r.page.replace(BASE_HOST, '') || '/';
      const pokr = ocenPokrycieHtml(r.query, r.page);
      return `| ${i + 1} | \`${r.query.replace(/\|/g, '/')}\` | \`${sciezka}\` | ${r.impressions} | ${r.clicks} | ${r.position.toFixed(1)} | ${pokr} |`;
    }),
    ``,
    `## 3. Czujnik wieloadresowosci (frazy widoczne na >= 2 kanonicznych URL-ach)`,
    ``,
    kanibalizacja.length === 0
      ? `Brak wykrytych nakladajacych sie adresow kanonicznych w probie.`
      : [
          `| # | Zapytanie | Suma wysw. | Adresy URL dzielace wyswietlenia |`,
          `| :- | :--- | --: | :--- |`,
          ...kanibalizacja.map((k, i) => {
            const opisStron = k.strony
              .map((s) => `\`${s.page.replace(BASE_HOST, '') || '/'}\` (${s.impressions} wysw., poz. ${s.position.toFixed(1)})`)
              .join(', ');
            return `| ${i + 1} | \`${k.query.replace(/\|/g, '/')}\` | ${k.sumaWysw} | ${opisStron} |`;
          }),
        ].join('\n'),
    ``,
  ].join('\n');

  const outDir = path.join(ROOT, 'seo');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'gsc-striking-distance-raport.md');
  fs.writeFileSync(outPath, md, 'utf8');
  console.log(`[gsc:striking-distance] Zapisano raport (${striking.length} fraz poz. 4-30, ${glebokie.length} fraz poz. 31-80) -> ${outPath}`);
}

main().catch((err) => {
  console.error('[gsc:striking-distance] Blad:', err.message || err);
  process.exit(1);
});
