// Sprawdza plik danych szablonu (lib/szablony/<slug>.js): kontrakt, długości SEO, obecność frazy
// głównej, objętość treści, linki. Użycie: node scripts/szablony/sprawdz.mjs lib/szablony/x.js
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const plik = process.argv[2];
const zrodlo = fs.readFileSync(plik, 'utf8');
const bledy = [], uwagi = [];
if (/from ['"]@\//.test(zrodlo)) bledy.push('importy @/ niedozwolone (czysty ESM)');
const d = (await import(pathToFileURL(plik).href)).default;
const tekst = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
const slowa = (t) => tekst(t).split(/\s+/).filter(Boolean).length;
for (const k of ['slug', 'sciezkaEn', 'plik', 'updated', 'fraza', 'seo', 'pl', 'en']) if (!d[k]) bledy.push(`brak pola ${k}`);
const ROUT = fs.readFileSync('i18n/routing.js', 'utf8');
const EN_ROUT = fs.readFileSync('lib/stronyEn.js', 'utf8');
for (const j of ['pl', 'en']) {
  const x = d[j] || {}; const seo = (d.seo || {})[j] || {}; const fr = String((d.fraza || {})[j] || '').toLowerCase();
  for (const k of ['okruszek', 'tag', 'h1', 'lead', 'karta', 'sekcje', 'podglad', 'formularz', 'faq', 'zrodla', 'powiazane', 'plikNazwa']) if (x[k] === undefined) bledy.push(`${j}: brak ${k}`);
  if (!seo.tytul || seo.tytul.length > 62) bledy.push(`${j}: title ${seo.tytul?.length ?? 0} zn. (max 62)`);
  if (!seo.opis || seo.opis.length < 110 || seo.opis.length > 160) bledy.push(`${j}: description ${seo.opis?.length ?? 0} zn. (110-160)`);
  const lw = slowa(x.lead); if (lw < 35 || lw > 70) uwagi.push(`${j}: lead ${lw} słów (40-60)`);
  const cala = [x.h1, x.lead, ...(x.sekcje || []).flatMap((s) => [s.h2, s.html, s.htmlPo, JSON.stringify(s.tabela?.rows || [])]), x.podglad?.html, ...(x.faq || []).flatMap((f) => [f.question, f.answer])].map(tekst).join(' ');
  const n = slowa(cala); if (n < 1000) bledy.push(`${j}: treść ${n} słów (min 1000)`); else uwagi.push(`${j}: treść ${n} słów`);
  const lc = cala.toLowerCase();
  for (const [gdzie, t] of [['title', seo.tytul], ['description', seo.opis], ['h1', x.h1], ['lead', x.lead]]) if (fr && !String(t || '').toLowerCase().includes(fr)) uwagi.push(`${j}: fraza „${fr}” nie występuje w ${gdzie}`);
  const ile = fr ? lc.split(fr).length - 1 : 0; uwagi.push(`${j}: fraza główna w treści ${ile}x`);
  if ((x.faq || []).length < 4) bledy.push(`${j}: FAQ < 4`);
  for (const p of x.powiazane || []) if (!ROUT.includes(`'${p.href}'`) && !EN_ROUT.includes(`'${p.href}'`)) bledy.push(`${j}: powiazane href ${p.href} nie jest kluczem routingu`);
  for (const z of x.zrodla || []) if (!/^https:\/\//.test(z.url) || !/^\d{4}-\d{2}-\d{2}$/.test(z.data)) bledy.push(`${j}: źródło bez https albo daty: ${z.url}`);
  const html = JSON.stringify(x);
  if (/<script|style=|on[a-z]+=/i.test(html)) bledy.push(`${j}: niedozwolony HTML (script/style/on*)`);
  if (j === 'en' && /\bzł\b|PLN \d/.test(html)) uwagi.push('en: ceny w PLN (oferta EN w EUR: €450 / €590 / €235 / €115 / €350 / €1,400)');
}
console.log(bledy.length ? `BŁĘDY (${bledy.length}):\n - ${bledy.join('\n - ')}` : 'OK: brak błędów');
console.log(`Uwagi:\n - ${uwagi.join('\n - ')}`);
process.exit(bledy.length ? 1 : 0);
