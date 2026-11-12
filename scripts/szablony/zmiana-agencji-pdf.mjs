// Generator źródeł HTML checklisty „Zmiana agencji SEO” (PL i EN) z danych strony:
// lib/agencySwitch.js i lib/agencySwitch.en.js (CHECKLIST, CONTRACT_CHECKS, STEPS).
// Dzięki temu PDF i strona /zmiana-agencji-seo (/en/switching-seo-agency) mają tę samą listę.
//
// Użycie (z katalogu strony):
//   node scripts/szablony/zmiana-agencji-pdf.mjs
// Zapisuje scripts/szablony/pdf/checklista-zmiana-agencji-seo.html i checklist-switching-seo-agency.html.
// PDF: Chromium --headless=new --no-pdf-header-footer --print-to-pdf=public/pliki/<nazwa>.pdf file://.../<nazwa>.html
//
// 11.11.2026: odtworzone źródło (poprzednie PDF-y z 29.10 i 9.11 nie miały źródła w repozytorium).
// 11.11.2026 (przegląd): nagłówki „Krok · Data” w tabeli kolejności kroków (pole daty do wpisania przy wydruku).
// 11.11.2026 (weryfikacja): lead nie mówi już, że po zakończeniu umowy zamykasz tylko „punkt ostatni”:
// pod koniec umowy robisz też eksport linków (raport „Linki” z dnia przed końcem), odłączenie Google Ads
// i usunięcie osób z listy dostępów. Lead opisuje te punkty słowami, bez numerów (numery zależą od listy).
// Liczba punktów (32 w 5 grupach) jest też w e-mailu panelu (panel lib/email.ts): zmieniasz listę,
// popraw e-mail i wygeneruj PDF od nowa.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KATALOG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PL_PLIK = path.join(KATALOG, 'lib/agencySwitch.js');
const EN_PLIK = path.join(KATALOG, 'lib/agencySwitch.en.js');

// lib/agencySwitch.en.js importuje './agencySwitch' bez rozszerzenia (składnia bundlera Next),
// więc dla Node podmieniamy ścieżkę w kopii tymczasowej.
async function wczytaj() {
  const pl = await import(pathToFileURL(PL_PLIK).href);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'zmiana-agencji-'));
  const enKopia = path.join(tmp, 'agencySwitch.en.mjs');
  const zrodlo = fs.readFileSync(EN_PLIK, 'utf8').replace(/from '\.\/agencySwitch'/g, `from '${pathToFileURL(PL_PLIK).href}'`);
  fs.writeFileSync(enKopia, zrodlo);
  const en = await import(pathToFileURL(enKopia).href);
  fs.rmSync(tmp, { recursive: true, force: true });
  return { pl, en };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TEKSTY = {
  pl: {
    lang: 'pl',
    plik: 'checklista-zmiana-agencji-seo',
    tytul: (n) => `Zmiana agencji SEO bez utraty pozycji: checklista (${n} punkty)`,
    wersja: 'Checklista do wydruku · wersja 11.2026',
    lead: 'Odhacz punkty na swoich kontach. Konta Google przejmij, zanim wyślesz wypowiedzenie: później agencja nie ma już powodu, żeby się spieszyć. Na koniec umowy: eksport linków, odłączenie Google Ads i zamknięcie dostępów.',
    pola: ['Firma i adres strony', 'Agencja', 'Data wysłania wypowiedzenia', 'Koniec umowy (ostatni dzień)'],
    kolumny: ['', 'Nr', 'Punkt', 'Uwagi · kto · termin'],
    umowa: 'Zanim wypowiesz umowę: 5 rzeczy do sprawdzenia',
    umowaLead: 'Weź umowę i regulamin agencji. Te pięć punktów decyduje, ile zapłacisz i co zostanie u Ciebie.',
    kroki: 'Kolejność kroków',
    krokiKol: ['Krok', 'Data'],
    stopka: [
      '<strong>Bezpłatny przegląd po poprzedniej agencji (30 min, online):</strong> przejdziemy tę listę na Twoich kontach. <span class="nw">Tel. 518 815 055</span> · <span class="nw">kontakt@ai-seo-company.pl</span>',
      'Aktualna wersja listy i odpowiedzi na pytania: <strong>www.ai-seo-company.pl/zmiana-agencji-seo</strong>',
      'To lista praktyczna, nie porada prawna. Okres i formę wypowiedzenia sprawdź w swojej umowie.',
      'AI SIGNALS COMPANY P.S.A., ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa',
    ],
  },
  en: {
    lang: 'en',
    plik: 'checklist-switching-seo-agency',
    tytul: (n) => `Switching SEO agencies without losing rankings: checklist (${n} items)`,
    wersja: 'Printable checklist · version 11.2026',
    lead: 'Tick the items off on your own accounts. Take over the Google accounts before you send notice: after that, the agency has no reason to hurry. At the end of the contract: export the links, unlink Google Ads and close access.',
    pola: ['Company and website', 'Agency', 'Date notice was sent', 'Contract ends (last day)'],
    kolumny: ['', 'No.', 'Item', 'Notes · who · when'],
    umowa: 'Before you give notice: 5 things to check in the contract',
    umowaLead: 'Take the agency’s contract and terms of service. These five points decide how much you will pay and what stays with you.',
    kroki: 'Order of steps',
    krokiKol: ['Step', 'Date'],
    stopka: [
      '<strong>Free review after your previous agency (30 min, online):</strong> we will go through this list on your accounts. <span class="nw">Tel. +48 518 815 055</span> · <span class="nw">kontakt@ai-seo-company.pl</span>',
      'Latest version of the list and answers to common questions: <strong>www.ai-seo-company.pl/en/switching-seo-agency</strong>',
      'This is a practical list, not legal advice. Check the notice period and form in your own contract; the guide concerns agreements under Polish law.',
      'AI SIGNALS COMPANY P.S.A., ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa, Poland',
    ],
  },
};

const CSS = `
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #FFFFFF; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1D1D1F; font-size: 8.9pt; line-height: 1.34; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .naglowek { display: flex; justify-content: space-between; font-size: 7.8pt; letter-spacing: 0.04em; color: #6E6E73; border-bottom: 1px solid #E5E1DC; padding-bottom: 4px; margin-bottom: 11px; }
  .naglowek strong { color: #D85A30; }
  h1 { font-size: 18pt; line-height: 1.15; margin: 0 0 4px; letter-spacing: -0.01em; }
  .lead { font-size: 9.6pt; color: #3A3A3C; margin: 0 0 9px; }
  .pola { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 22px; margin: 0 0 10px; }
  .pole { display: flex; align-items: flex-end; gap: 6px; font-size: 8.2pt; color: #48484A; }
  .pole span { white-space: nowrap; }
  .pole i { flex: 1; border-bottom: 0.8px solid #B8B2AB; height: 15px; }
  h2 { font-size: 11pt; margin: 9px 0 4px; padding-bottom: 3px; border-bottom: 2px solid #D85A30; break-after: avoid; page-break-after: avoid; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #E5E1DC; padding: 3.2px 5px; text-align: left; vertical-align: top; }
  th { font-size: 7.4pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #48484A; background: #F7F5F2; }
  thead { display: table-header-group; }
  tr { break-inside: avoid; page-break-inside: avoid; }
  td.cbk { width: 18px; text-align: center; }
  .cb { display: inline-block; width: 9px; height: 9px; border: 1.4px solid #D85A30; border-radius: 2px; vertical-align: -1px; }
  td.nr { width: 22px; color: #D85A30; font-weight: 700; text-align: right; }
  td.uw { width: 150px; }
  .grupa { break-inside: avoid; page-break-inside: avoid; }
  .dwie { display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; margin-top: 11px; break-inside: avoid; page-break-inside: avoid; }
  .ramka { border: 1px solid #E5E1DC; border-left: 3px solid #D85A30; border-radius: 4px; padding: 8px 10px; background: #FFFFFF; }
  .ramka h3 { font-size: 9.8pt; margin: 0 0 3px; }
  .ramka p { margin: 0 0 5px; color: #48484A; font-size: 8.3pt; }
  .ramka ol { margin: 0; padding-left: 15px; }
  .ramka li { margin: 0 0 3.5px; font-size: 8.4pt; }
  .ramka li strong { color: #1D1D1F; }
  table.kroki td { font-size: 8.4pt; padding: 3.6px 5px; }
  table.kroki td.data { width: 64px; }
  table.kroki td.lp { width: 16px; color: #D85A30; font-weight: 700; text-align: right; }
  .stopka { margin-top: 12px; padding-top: 6px; border-top: 1px solid #E5E1DC; font-size: 7.8pt; color: #6E6E73; break-inside: avoid; page-break-inside: avoid; }
  .stopka > span { display: block; margin: 0 0 2px; }
  .stopka strong { color: #1D1D1F; }
  .nw { white-space: nowrap; }
`;

function html(t, D) {
  let nr = 0;
  const grupy = D.CHECKLIST.map((g) => {
    const wiersze = g.items.map((item) => {
      nr += 1;
      return `<tr><td class="cbk"><span class="cb"></span></td><td class="nr">${nr}</td><td>${esc(item)}</td><td class="uw"></td></tr>`;
    }).join('\n        ');
    return `  <div class="grupa">
    <h2>${esc(g.title)}</h2>
    <table>
      <colgroup><col style="width:18px"><col style="width:22px"><col><col style="width:150px"></colgroup>
      <thead><tr>${t.kolumny.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
      <tbody>
        ${wiersze}
      </tbody>
    </table>
  </div>`;
  }).join('\n');
  const umowa = D.CONTRACT_CHECKS.map((c) => `<li><strong>${esc(c.title)}.</strong> ${esc(c.text)}</li>`).join('\n        ');
  const kroki = D.STEPS.map((s, i) => `<tr><td class="lp">${i + 1}</td><td>${esc(s.title)}</td><td class="data"></td></tr>`).join('\n          ');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<title>${esc(t.tytul(D.CHECKLIST_COUNT))}</title>
<!-- Plik generowany: node scripts/szablony/zmiana-agencji-pdf.mjs (dane z lib/agencySwitch${t.lang === 'en' ? '.en' : ''}.js). Nie edytuj ręcznie. -->
<style>${CSS}</style>
</head>
<body>
<div class="naglowek"><span><strong>AI SEO COMPANY</strong> · www.ai-seo-company.pl</span><span>${esc(t.wersja)}</span></div>
<h1>${esc(t.tytul(D.CHECKLIST_COUNT)).replace(/ \((\d+ [^)]+)\)$/, ' <span class="nw">($1)</span>')}</h1>
<p class="lead">${esc(t.lead)}</p>
<div class="pola">${t.pola.map((p) => `<div class="pole"><span>${esc(p)}</span><i></i></div>`).join('')}</div>
${grupy}
  <div class="dwie">
    <div class="ramka">
      <h3>${esc(t.umowa)}</h3>
      <p>${esc(t.umowaLead)}</p>
      <ol>
        ${umowa}
      </ol>
    </div>
    <div class="ramka">
      <h3>${esc(t.kroki)}</h3>
      <table class="kroki">
        <colgroup><col style="width:16px"><col><col style="width:64px"></colgroup>
        <thead><tr><th></th>${t.krokiKol.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
        <tbody>
          ${kroki}
        </tbody>
      </table>
    </div>
  </div>
  <div class="stopka">
    ${t.stopka.map((s) => `<span>${s}</span>`).join('\n    ')}
  </div>
</body>
</html>
`;
}

const { pl, en } = await wczytaj();
if (pl.CHECKLIST_COUNT !== en.CHECKLIST_COUNT) throw new Error(`Liczba punktów PL ${pl.CHECKLIST_COUNT} ≠ EN ${en.CHECKLIST_COUNT}`);
for (const [t, D] of [[TEKSTY.pl, pl], [TEKSTY.en, en]]) {
  const cel = path.join(KATALOG, 'scripts/szablony/pdf', `${t.plik}.html`);
  fs.writeFileSync(cel, html(t, D));
  console.log(`zapisano ${path.relative(KATALOG, cel)} (${D.CHECKLIST_COUNT} punktów)`);
}
