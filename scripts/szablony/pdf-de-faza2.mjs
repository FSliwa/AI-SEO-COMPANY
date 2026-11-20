// Generator niemieckich PDF dla 3 szablonów Fazy 2 DE (19.11.2026):
//   - public/pliki/de/keyword-recherche-vorlage.pdf
//   - public/pliki/de/e-e-a-t-checkliste.pdf
//   - public/pliki/de/schema-markup-beispiele.pdf
// Renderuje z danych lib/szablony/*.de.js przez Chromium z cache Playwright (chromium-1140).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const CHROMIUM = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1140/chrome-mac/Chromium.app/Contents/MacOS/Chromium');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const { KROKI_KEYWORD_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/dobor-slow-kluczowych.de.js')).href);
const { OBSZARY_EEAT_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/checklista-e-e-a-t.de.js')).href);
const { WZORY_JSONLD_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/dane-strukturalne-json-ld.de.js')).href);

const BAZA_CSS = `
  @page { size: A4; margin: 13mm 14mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; color: #141414; font-size: 9pt; line-height: 1.38; margin: 0; }
  .top { display: flex; justify-content: space-between; font-size: 7.8pt; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 2.5mm; margin-bottom: 4mm; }
  h1 { font-size: 16pt; margin: 0 0 1.8mm; letter-spacing: -0.02em; }
  .lead { font-size: 8.8pt; color: #444; margin: 0 0 4mm; }
  h2 { font-size: 11pt; margin: 4.5mm 0 1.6mm; border-bottom: 1px solid #e5e5e5; padding-bottom: 1mm; break-after: avoid; }
  h3 { font-size: 9.5pt; margin: 3mm 0 1.2mm; break-after: avoid; }
  .meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5mm; margin-bottom: 3.5mm; }
  .pole { border: 1px solid #ccc; border-radius: 3px; padding: 1.5mm 2mm; font-size: 7.5pt; color: #555; min-height: 9mm; }
  table { width: 100%; border-collapse: collapse; margin: 1.5mm 0 3mm; font-size: 8pt; }
  th, td { border: 1px solid #d4d4d4; padding: 1.3mm 1.8mm; text-align: left; vertical-align: top; }
  th { background: #f5f2ed; font-weight: 700; }
  .puste td { height: 7.2mm; }
  pre { background: #f7f5f2; border: 1px solid #ddd; border-radius: 3px; padding: 2mm 2.5mm; font-size: 7.2pt; line-height: 1.28; white-space: pre-wrap; word-break: break-word; break-inside: avoid; margin: 1.2mm 0 2.8mm; }
  ol, ul { margin: 1mm 0 2.5mm; padding-left: 4.5mm; }
  li { margin-bottom: 0.9mm; }
  footer { margin-top: 5mm; padding-top: 2mm; border-top: 1px solid #ddd; font-size: 7.4pt; color: #666; display: flex; justify-content: space-between; }
`;

const pusteWiersze = (wierszy, kolumn) =>
  Array.from({ length: wierszy }, (_, i) => `<tr class="puste"><td>${i + 1}</td>${'<td></td>'.repeat(kolumn - 1)}</tr>`).join('');

// 1) Keyword Recherche Vorlage
const htmlKeyword = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Keyword Recherche Vorlage</title><style>${BAZA_CSS}</style></head><body>
  <div class="top"><span><strong>AI SEO COMPANY</strong> · www.ai-seo-company.pl/de/tools/keyword-recherche-vorlage</span><span>Stand: November 2026</span></div>
  <h1>Keyword Recherche Vorlage: 6 Arbeitsblätter</h1>
  <p class="lead">Von den ersten Kundenbegriffen über den Abgleich der Google Top 10 und die ICE-Priorisierung bis zur fertigen Keyword-Map ohne Kannibalisierung.</p>
  <div class="meta"><div class="pole">Domain / Projekt</div><div class="pole">Markt & Sprache</div><div class="pole">Bearbeitet von</div><div class="pole">Datum</div></div>
  <h2>Ablauf in 6 Schritten</h2>
  <ol>${KROKI_KEYWORD_DE.map((k) => `<li><strong>${esc(k.name)}:</strong> ${esc(k.text)}</li>`).join('')}</ol>
  <h2>Teil 1–2. Ausgangsbegriffe (Seeds) und Quellen</h2>
  <table><thead><tr><th style="width:7mm">#</th><th style="width:38mm">Leistung / Themenfeld</th><th>Kundenbegriffe & echte Fragen</th><th style="width:36mm">Quelle (GSC, Planer, Vertrieb)</th></tr></thead><tbody>${pusteWiersze(6, 4)}</tbody></table>
  <h2>Teil 3–5. SERP-Cluster (1 Cluster = 1 URL) und ICE-Priorität</h2>
  <table><thead><tr><th style="width:7mm">#</th><th style="width:36mm">Haupt-Keyword</th><th>Varianten (>= 4 gleiche URLs in Top 10)</th><th style="width:28mm">Intention / Format</th><th style="width:16mm">Volumen</th><th style="width:20mm">ICE (1–10)</th></tr></thead><tbody>${pusteWiersze(8, 6)}</tbody></table>
  <h2>Teil 6. Keyword-Map & Kannibalisierungs-Check (Search Console)</h2>
  <table><thead><tr><th style="width:7mm">#</th><th style="width:36mm">Cluster / Haupt-Keyword</th><th style="width:42mm">Ziel-URL</th><th style="width:26mm">Aktion (Neu / Ausbau / 301)</th><th>Andere URL in GSC? Verantwortlich & Termin</th></tr></thead><tbody>${pusteWiersze(8, 5)}</tbody></table>
  <footer><span>AI SIGNALS COMPANY P.S.A. · ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau</span><span>www.ai-seo-company.pl/de</span></footer>
</body></html>`;

// 2) E-E-A-T Checkliste
const htmlEeat = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>E-E-A-T Checkliste: 36 Prüfpunkte</title><style>${BAZA_CSS}</style></head><body>
  <div class="top"><span><strong>AI SEO COMPANY</strong> · www.ai-seo-company.pl/de/tools/e-e-a-t-checkliste</span><span>Stand: November 2026</span></div>
  <h1>E-E-A-T Checkliste: 36 Prüfpunkte für Unternehmenswebsites</h1>
  <p class="lead">Prüfbogen zu Anbietertransparenz, Autoren, Erfahrung aus erster Hand, externer Reputation und strukturierten Daten gemäß Googles Search Quality Evaluator Guidelines.</p>
  <div class="meta"><div class="pole">Website (URL)</div><div class="pole">YMYL-Stufe (Ja / Teilweise / Nein)</div><div class="pole">Geprüft von</div><div class="pole">Datum / Nächster Check</div></div>
  ${OBSZARY_EEAT_DE.map(
    (o) => `<h2>${esc(o.tytul)}</h2>
    <table><thead><tr><th style="width:10mm">Nr.</th><th>Prüfpunkt</th><th style="width:16mm">Prio</th><th style="width:24mm">Status</th><th style="width:42mm">Befund · Verantwortlich · Frist</th></tr></thead><tbody>
    ${o.punkty.map(([nr, t, p]) => `<tr><td><strong>${esc(nr)}</strong></td><td>${esc(t)}</td><td>${esc(p)}</td><td>☐ OK &nbsp;☐ Offen</td><td></td></tr>`).join('')}
    </tbody></table>`,
  ).join('')}
  <h2>Reputations-Check („Firmenname -site:eigenedomain.de“) & Maßnahmenplan</h2>
  <table><thead><tr><th style="width:7mm">#</th><th style="width:45mm">Gefundene Quelle / Plattform</th><th style="width:24mm">Eindruck</th><th>Geplante Maßnahme, Verantwortliche & Termin</th></tr></thead><tbody>${pusteWiersze(5, 4)}</tbody></table>
  <footer><span>AI SIGNALS COMPANY P.S.A. · ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau</span><span>www.ai-seo-company.pl/de</span></footer>
</body></html>`;

// 3) Schema Markup Beispiele
const NAZWY_WZOROW = [
  ['1. Organization (Startseite oder Über-uns-Seite)', WZORY_JSONLD_DE.organization],
  ['2. WebSite (Startseite)', WZORY_JSONLD_DE.website],
  ['3. LocalBusiness / ProfessionalService (Standortseite)', WZORY_JSONLD_DE.localBusiness],
  ['4. BreadcrumbList (Unterseiten)', WZORY_JSONLD_DE.breadcrumb],
  ['5. Article (Ratgeber / Blogbeitrag)', WZORY_JSONLD_DE.article],
  ['6. ProfilePage mit Person (Autorenprofil)', WZORY_JSONLD_DE.profilePage],
  ['7. Product mit Offer (Produkt- oder Festpreisseite)', WZORY_JSONLD_DE.product],
];
const htmlSchema = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Schema Markup Beispiele: 7 JSON-LD Vorlagen</title><style>${BAZA_CSS}</style></head><body>
  <div class="top"><span><strong>AI SEO COMPANY</strong> · www.ai-seo-company.pl/de/tools/schema-markup-beispiele</span><span>Stand: November 2026</span></div>
  <h1>Schema Markup Beispiele: 7 JSON-LD Vorlagen & Checkliste</h1>
  <p class="lead">Stammdatenblatt, kopierfertige JSON-LD-Blöcke nach Schema.org und Prüfcheckliste vor der Veröffentlichung.</p>
  <h2>Teil 1. Stammdatenblatt (identisch mit Impressum & Google Unternehmensprofil)</h2>
  <table><thead><tr><th style="width:48mm">Feld</th><th style="width:42mm">Schema.org-Eigenschaft</th><th>Eintrag Ihres Unternehmens</th></tr></thead><tbody>
    <tr class="puste"><td>Offizieller Firmenname</td><td>name</td><td></td></tr>
    <tr class="puste"><td>Haupt-URL & Logo-URL</td><td>url, logo</td><td></td></tr>
    <tr class="puste"><td>Straße, PLZ, Ort, Land</td><td>address</td><td></td></tr>
    <tr class="puste"><td>Telefon & E-Mail</td><td>telephone, email</td><td></td></tr>
    <tr class="puste"><td>USt-IdNr. & Profile</td><td>vatID, sameAs</td><td></td></tr>
  </tbody></table>
  <h2>Teil 2. Kopierfertige JSON-LD-Vorlagen (&lt;script type="application/ld+json"&gt;)</h2>
  ${NAZWY_WZOROW.map(([tytul, obj]) => `<h3>${esc(tytul)}</h3><pre>${esc(JSON.stringify(obj, null, 2))}</pre>`).join('')}
  <h2>Teil 3. Checkliste vor dem Livegang & Testprotokoll</h2>
  <ul>
    <li>☐ Google Test für Rich-Suchergebnisse ohne kritische Fehler bestanden</li>
    <li>☐ Schema Markup Validator (validator.schema.org) ohne Syntaxfehler bestanden</li>
    <li>☐ Alle Angaben im JSON-LD stehen sichtbar im Seitentext; keine Platzhalterwerte übrig</li>
    <li>☐ Keine doppelten, widersprüchlichen Blöcke aus Theme und SEO-Plugin</li>
    <li>☐ Keine eigenen aggregateRating-Sterne auf Organization oder LocalBusiness</li>
  </ul>
  <table><thead><tr><th style="width:22mm">Datum</th><th style="width:48mm">Geprüfte URL</th><th style="width:36mm">Prüftool</th><th>Befund & Korrektur</th></tr></thead><tbody>${pusteWiersze(4, 4)}</tbody></table>
  <footer><span>AI SIGNALS COMPANY P.S.A. · ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau</span><span>www.ai-seo-company.pl/de</span></footer>
</body></html>`;

const ZADANIA = [
  ['keyword-recherche-vorlage', htmlKeyword],
  ['e-e-a-t-checkliste', htmlEeat],
  ['schema-markup-beispiele', htmlSchema],
];

fs.mkdirSync(path.join(ROOT, 'public/pliki/de'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'scripts/szablony/pdf'), { recursive: true });

for (const [nazwa, html] of ZADANIA) {
  const htmlPath = path.join(ROOT, 'scripts/szablony/pdf', `${nazwa}.html`);
  const pdfPath = path.join(ROOT, 'public/pliki/de', `${nazwa}.pdf`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  execFileSync(
    CHROMIUM,
    [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: 'pipe' },
  );
  const rozmiar = fs.statSync(pdfPath).size;
  console.log(`Wygenerowano ${pdfPath} (${(rozmiar / 1024).toFixed(1)} KB)`);
}
