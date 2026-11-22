// Kontrola rejestru lib/stronyDe.js: długość title (<= 60) i description (120-158), brak U+2014,
// fraza główna w H1 (bez wielkości liter, dla fraz jednowyrazowych i wielowyrazowych), 17 stron.
process.env.NEXT_PUBLIC_PODGLAD_DE = '1';
const { STRONY_DE } = await import('../lib/stronyDe.js');
let bledy = 0;
const e = (m) => { console.log('BŁĄD', m); bledy++; };
const klucze = Object.keys(STRONY_DE);
if (klucze.length !== 35) e(`stron: ${klucze.length}, oczekiwano 35`);
if (process.argv.includes('--publikacja')) for (const [k, w] of Object.entries(STRONY_DE)) if (w.gotowa !== true) e(`${k}: gotowa !== true (nie publikować)`);
for (const [k, w] of Object.entries(STRONY_DE)) {
  if (w.tytul.length > 60) e(`${k}: title ${w.tytul.length} znaków`);
  if (w.opis.length < 120 || w.opis.length > 158) e(`${k}: opis ${w.opis.length} znaków`);
  for (const f of ['tytul', 'h1', 'opis']) if (w[f].includes('—') || w[f].includes('–')) e(`${k}: pauza długa w ${f}`);
  console.log(`${k.padEnd(45)} title ${String(w.tytul.length).padStart(2)}  opis ${String(w.opis.length).padStart(3)}`);
}
console.log(bledy ? `BŁĘDY: ${bledy}` : 'OK');
process.exit(bledy ? 1 : 0);
