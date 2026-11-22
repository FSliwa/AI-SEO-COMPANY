// Generator niemieckich PDF dla 4 szablonow Fazy 3 DE (22.11.2026, E2):
//   - public/pliki/de/seo-report-vorlage.pdf
//   - public/pliki/de/wettbewerbsanalyse-vorlage.pdf
//   - public/pliki/de/seo-strategie-vorlage.pdf
//   - public/pliki/de/website-relaunch-checkliste.pdf
// Renderuje z danych lib/szablony/*.de.js do wielostronicowych wektorowych PDF A4 (MuPDF Story + fonty Unicode).
// Zero dlugich myslnikow (tylko ASCII '-').

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const { SEKCJE_RAPORT_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/raport-seo.de.js')).href);
const { OBSZARY_KONKURENCJA_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/szablon-analizy-konkurencji-seo.de.js')).href);
const { KROKI_STRATEGIA_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/szablon-strategii-seo.de.js')).href);
const { ETAPY_MIGRACJA_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/checklista-migracji-strony.de.js')).href);

const CSS = `
  @font-face { font-family: "DocSans"; src: url("Arial.ttf"); font-weight: normal; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Bold.ttf"); font-weight: bold; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Italic.ttf"); font-weight: normal; font-style: italic; }
  @page { size: A4; margin: 13mm 14mm 15mm; }
  body { font-family: "DocSans", Arial, sans-serif; color: #1D1D1F; font-size: 8.6pt; line-height: 1.38; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 9pt 0; }
  table.pasek { margin: 0 0 8pt 0; border-bottom: 1pt solid #E5E1DC; }
  table.pasek td { border: none; padding: 0 0 4pt 0; font-size: 7.6pt; color: #5C5C60; }
  h1 { font-size: 15.5pt; line-height: 1.18; margin: 0 0 4pt 0; color: #1D1D1F; }
  p.lead { font-size: 8.8pt; color: #3A3A3C; margin: 0 0 8pt 0; }
  table.pola td { border: 0.8pt solid #D4CFC8; padding: 4pt 6pt; font-size: 7.4pt; color: #5C5C60; width: 25%; height: 24pt; vertical-align: top; }
  h2 { font-size: 10.5pt; color: #1D1D1F; margin: 10pt 0 4pt 0; padding-bottom: 2pt; border-bottom: 1.5pt solid #D85A30; }
  table.dane th { background-color: #F5F2ED; border: 0.7pt solid #D6D1CA; padding: 4pt 5pt; font-size: 7.4pt; font-weight: bold; color: #3A3A3C; text-align: left; }
  table.dane td { border: 0.7pt solid #D6D1CA; padding: 4pt 5pt; font-size: 7.9pt; vertical-align: top; text-align: left; }
  td.nr { width: 34pt; font-weight: bold; color: #D85A30; }
  ol, ul { margin: 3pt 0 8pt 14pt; padding: 0; }
  li { margin-bottom: 3pt; }
  div.stopka { margin-top: 10pt; padding-top: 6pt; border-top: 0.8pt solid #E5E1DC; font-size: 7.2pt; color: #6E6E73; line-height: 1.35; }
`;

const pusteWiersze = (wierszy, kolumn) =>
  Array.from(
    { length: wierszy },
    (_, i) => `<tr><td class="nr">${i + 1}</td>${'<td><br></td>'.repeat(kolumn - 1)}</tr>`,
  ).join('\n      ');

const STOPKA_HTML = `
  <div class="stopka">
    Herausgeber: AI SEO COMPANY (www.ai-seo-company.pl/de) · kontakt@ai-seo-company.pl · Tel. +48 518 815 055<br>
    AI SIGNALS COMPANY P.S.A. · ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau, Polen · KRS 0001239983 · NIP 5253090237 · REGON 544761611
  </div>`;

// 1) SEO Report Vorlage
const htmlReport = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>SEO Report Vorlage</title><style>${CSS}</style></head><body>
  <table class="pasek" width="100%"><tr><td><b style="color:#D85A30">AI SEO COMPANY</b> · www.ai-seo-company.pl/de</td><td align="right" style="text-align:right">Stand: November 2026</td></tr></table>
  <h1>SEO Report Vorlage: Monatsbericht in 6 Blöcken</h1>
  <p class="lead">Entscheidungsreifer Monatsbericht für Geschäftsführung und Marketing: Anfragen, Non-Brand-Sichtbarkeit, KI-Zitierungen, Technik und Arbeitsnachweis.</p>
  <table class="pola" width="100%"><tr><td>Domain / Mandat:<br><br></td><td>Berichtsmonat:<br><br></td><td>Verantwortlich:<br><br></td><td>Datum:<br><br></td></tr></table>

  <h2>Übersicht der 6 festen Berichtsblöcke</h2>
  <ol>${SEKCJE_RAPORT_DE.map((s) => `<li><b>${esc(s.nazwa)}:</b> ${esc(s.cel)} <i>(${esc(s.zrodlo)})</i></li>`).join('')}</ol>

  <h2>Block 1-3. Management-Summary, Konversionen &amp; Search Console (Non-Brand)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:145pt">Kennzahl</th><th style="width:68pt">Aktueller Monat</th><th style="width:68pt">Vormonat (MoM)</th><th style="width:68pt">Vorjahr (YoY)</th><th>Einordnung &amp; Ursache</th></tr></thead>
    <tbody>
      <tr><td><b>Qualifizierte Anfragen (GA4 Organic)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Umsatz / Auftragswert aus SEO (EUR)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>GSC Klicks ohne Markenname (Non-Brand)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>GSC Impressionen (Non-Brand)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>KI-Sichtbarkeit (Antworten mit Nennung)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Technik-Score &amp; mobiles LCP (CrUX)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
    </tbody>
  </table>

  <h2>Block 4-5. Wichtigste Zielseiten &amp; KI-Zitierungen</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">#</th><th style="width:130pt">Ziel-URL / Leistungsseite</th><th style="width:110pt">Haupt-Keyword / KI-Frage</th><th style="width:48pt">Klicks</th><th style="width:48pt">Position</th><th>Maßnahme / Status</th></tr></thead>
    <tbody>${pusteWiersze(6, 6)}</tbody>
  </table>

  <h2>Block 6. Umgesetzte Arbeiten im Berichtsmonat &amp; Plan für den Folgemonat</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">#</th><th style="width:95pt">Bereich (Technik / Text / GEO)</th><th>Konkrete Lieferung (inkl. Ziel-URL / verlinkender Quelle)</th><th style="width:85pt">Status / Termin</th></tr></thead>
    <tbody>${pusteWiersze(7, 4)}</tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 2) Wettbewerbsanalyse Vorlage
const htmlKonkurrenz = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>SEO Wettbewerbsanalyse Vorlage</title><style>${CSS}</style></head><body>
  <table class="pasek" width="100%"><tr><td><b style="color:#D85A30">AI SEO COMPANY</b> · www.ai-seo-company.pl/de</td><td align="right" style="text-align:right">Stand: November 2026</td></tr></table>
  <h1>SEO Wettbewerbsanalyse Vorlage: 5 Prüffelder</h1>
  <p class="lead">Strukturierter Vergleich Ihrer Domain mit 3 echten SERP- und KI-Wettbewerbern: Seitenbaum, Themenlücken, Technik, Autorität und Drittquellen.</p>
  <table class="pola" width="100%"><tr><td>Eigene Domain:<br><br></td><td>Zielmarkt (DE / AT / CH):<br><br></td><td>Geprüft von:<br><br></td><td>Datum:<br><br></td></tr></table>

  <h2>Die 5 Prüffelder im Überblick</h2>
  <ol>${OBSZARY_KONKURENCJA_DE.map((o) => `<li><b>${esc(o.obszar)}:</b> ${esc(o.pytanie)}</li>`).join('')}</ol>

  <h2>Teil 1, 2 &amp; 4. Kennzahlen- und Architektur-Matrix</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:140pt">Prüfkriterium</th><th>Eigene Domain</th><th>Wettbewerber A</th><th>Wettbewerber B</th><th>Wettbewerber C</th></tr></thead>
    <tbody>
      <tr><td><b>Domainname</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Anzahl URLs in Sitemap</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Eigene Leistungs- &amp; Branchenseiten</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Transparente Kostenseite / Vergleiche?</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>SEO-Audit-Score &amp; mobiles LCP</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>SSR ohne JS &amp; llms.txt vorhanden?</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Domain-Autorität (Common Crawl)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Nennungen im KI-Sichtbarkeits-Check</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
    </tbody>
  </table>

  <h2>Teil 3 &amp; 5. Content-Gap &amp; Citation-Gap (fehlende Seiten &amp; Drittquellen)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">#</th><th style="width:135pt">Fehlendes Thema / zitierende Quelle</th><th style="width:85pt">Gefunden bei</th><th style="width:52pt">Priorität</th><th>Geplante eigene URL / Outreach-Schritt</th></tr></thead>
    <tbody>${pusteWiersze(8, 5)}</tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 3) SEO Strategie Vorlage
const htmlStrategie = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>SEO Strategie Vorlage</title><style>${CSS}</style></head><body>
  <table class="pasek" width="100%"><tr><td><b style="color:#D85A30">AI SEO COMPANY</b> · www.ai-seo-company.pl/de</td><td align="right" style="text-align:right">Stand: November 2026</td></tr></table>
  <h1>SEO Strategie Vorlage: 12-Monats-Plan in 6 Schritten</h1>
  <p class="lead">Verbindlicher Strategiebogen von den Geschäftszielen über Technik-Bereinigung und BOFU-Seitenbaum bis zur 90-Tage-Umsetzung.</p>
  <table class="pola" width="100%"><tr><td>Unternehmen / Domain:<br><br></td><td>Margen-Leistungen:<br><br></td><td>Monatsbudget (EUR):<br><br></td><td>Planungszeitraum:<br><br></td></tr></table>

  <h2>Die 6 Strategie-Bausteine</h2>
  <ol>${KROKI_STRATEGIA_DE.map((k) => `<li><b>${esc(k.etap)}:</b> ${esc(k.opis)}</li>`).join('')}</ol>

  <h2>Teil 1 &amp; 6. Ausgangswerte und 6-/12-Monats-Ziele</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:155pt">Steuerungs-KPI</th><th style="width:68pt">Ist heute</th><th style="width:68pt">Ziel 6 Mon.</th><th style="width:68pt">Ziel 12 Mon.</th><th>Wichtigster Hebel</th></tr></thead>
    <tbody>
      <tr><td><b>Qualifizierte organische Anfragen / Mon.</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Non-Brand-Klicks (Search Console)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Top-3-Rankings auf Kauf-Keywords</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>KI-Sichtbarkeit (ChatGPT, Gemini, AIO)</b></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
    </tbody>
  </table>

  <h2>Teil 2-5. Priorisierte 90-Tage-Roadmap (Technik, BOFU-Seiten, GEO &amp; Autorität)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:62pt">Zeitraum</th><th style="width:88pt">Säule</th><th>Konkrete Ergebnisse &amp; Ziel-URLs</th><th style="width:85pt">Verantwortlich</th><th style="width:55pt">Status</th></tr></thead>
    <tbody>
      <tr><td><b>Tag 1-30</b></td><td>Technik &amp; Basis</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
      <tr><td><b>Tag 1-30</b></td><td>BOFU-Seiten</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
      <tr><td><b>Tag 31-60</b></td><td>Kosten &amp; Vergleiche</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
      <tr><td><b>Tag 31-60</b></td><td>Interne Links &amp; Schema</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
      <tr><td><b>Tag 61-90</b></td><td>Fallstudien (E-E-A-T)</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
      <tr><td><b>Tag 61-90</b></td><td>B2B-Profile &amp; PR</td><td><br></td><td><br></td><td>[ ] OK</td></tr>
    </tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 4) Website Relaunch Checkliste
const htmlRelaunch = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Website Relaunch Checkliste für SEO</title><style>${CSS}</style></head><body>
  <table class="pasek" width="100%"><tr><td><b style="color:#D85A30">AI SEO COMPANY</b> · www.ai-seo-company.pl/de</td><td align="right" style="text-align:right">Stand: November 2026</td></tr></table>
  <h1>Website Relaunch Checkliste für SEO (4 Phasen)</h1>
  <p class="lead">Prüfbogen für CMS-Wechsel, Redesign und Domain-Umzug ohne Verlust von Google-Rankings, Backlink-Kraft und KI-Sichtbarkeit.</p>
  <table class="pola" width="100%"><tr><td>Alte / Neue Domain:<br><br></td><td>Altes -> Neues System:<br><br></td><td>Go-Live (Di-Do):<br><br></td><td>SEO-Abnahme durch:<br><br></td></tr></table>

  ${ETAPY_MIGRACJA_DE.map(
    (e) => `<h2>${esc(e.tytul)}</h2>
    <table class="dane" width="100%">
      <thead><tr><th style="width:36pt">Nr.</th><th>Prüfpunkt</th><th style="width:46pt">Prio</th><th style="width:72pt">Status</th><th style="width:95pt">Verantwortlich · Notiz</th></tr></thead>
      <tbody>
        ${e.punkty.map(([nr, t, p]) => `<tr><td class="nr">${esc(nr)}</td><td>${esc(t)}</td><td>${esc(p)}</td><td>[ ] OK  [ ] Offen</td><td><br></td></tr>`).join('\n        ')}
      </tbody>
    </table>`,
  ).join('\n  ')}

  <h2>Arbeitsblatt: 301-Weiterleitungsmatrix (wichtigste Traffic- &amp; Backlink-URLs)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">#</th><th style="width:145pt">Alte URL (Relativpfad)</th><th style="width:145pt">Neue Ziel-URL (direkt Status 200)</th><th style="width:65pt">GSC / Links?</th><th>Live-Test (301 -> 200)</th></tr></thead>
    <tbody>${pusteWiersze(8, 5)}</tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

const PY_RENDER = `
import sys, os, fitz

html_path, pdf_path, title = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(html_path, "r", encoding="utf-8").read()

font_dir = "/System/Library/Fonts/Supplemental"
arch = fitz.Archive(font_dir) if os.path.isdir(font_dir) else fitz.Archive()
story = fitz.Story(html=html, archive=arch)

mediabox = fitz.paper_rect("a4")
where = mediabox + (36, 36, -36, -40)

writer = fitz.DocumentWriter(pdf_path)
more = 1
while more:
    device = writer.begin_page(mediabox)
    more, _ = story.place(where)
    story.draw(device)
    writer.end_page()
writer.close()

doc = fitz.open(pdf_path)
total = len(doc)
font_path = os.path.join(font_dir, "Arial.ttf")
for idx, page in enumerate(doc):
    footer_text = f"AI SEO COMPANY  |  {idx + 1} / {total}"
    if os.path.exists(font_path):
        page.insert_text((36, mediabox.height - 18), footer_text, fontname="f0", fontfile=font_path, fontsize=7.5, color=(0.43, 0.43, 0.45))
    else:
        page.insert_text((36, mediabox.height - 18), footer_text, fontsize=7.5, color=(0.43, 0.43, 0.45))
doc.set_metadata({"title": title, "author": "AI SEO COMPANY (Filip Śliwa)", "creator": "AI SEO COMPANY PDF Generator"})
doc.subset_fonts()
tmp_out = pdf_path + ".opt"
doc.save(tmp_out, garbage=4, deflate=True)
doc.close()
os.replace(tmp_out, pdf_path)
`;

const ZADANIA = [
  ['seo-report-vorlage', 'SEO Report Vorlage: Monatsbericht in 6 Blöcken', htmlReport],
  ['wettbewerbsanalyse-vorlage', 'SEO Wettbewerbsanalyse Vorlage: 5 Prüffelder', htmlKonkurrenz],
  ['seo-strategie-vorlage', 'SEO Strategie Vorlage: 12-Monats-Plan in 6 Schritten', htmlStrategie],
  ['website-relaunch-checkliste', 'Website Relaunch Checkliste für SEO (4 Phasen)', htmlRelaunch],
];

fs.mkdirSync(path.join(ROOT, 'public/pliki/de'), { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiseo-pdf-de-faza3-'));

try {
  for (const [nazwa, tytulPdf, html] of ZADANIA) {
    const htmlPath = path.join(tmpDir, `${nazwa}.html`);
    const pdfPath = path.join(ROOT, 'public/pliki/de', `${nazwa}.pdf`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    execFileSync('python3', ['-c', PY_RENDER, htmlPath, pdfPath, tytulPdf], { stdio: 'inherit' });
    const rozmiar = fs.statSync(pdfPath).size;
    console.log(`Wygenerowano ${pdfPath} (${(rozmiar / 1024).toFixed(1)} KB)`);
  }
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
