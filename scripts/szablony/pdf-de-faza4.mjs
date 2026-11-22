// Generator niemieckich PDF A4 oraz podgladow 600x850 WebP dla 6 szablonow Fazy 4 DE (22.11.2026):
//   1. public/pliki/de/google-unternehmensprofil-checkliste.pdf -> checklista-wizytowki-google-de.webp
//   2. public/pliki/de/briefing-vorlage-texter.pdf              -> brief-dla-copywritera-de.webp
//   3. public/pliki/de/content-audit-vorlage.pdf                -> szablon-audytu-tresci-de.webp
//   4. public/pliki/de/interne-verlinkung-vorlage.pdf           -> linkowanie-wewnetrzne-de.webp
//   5. public/pliki/de/website-briefing-vorlage.pdf             -> brief-strony-internetowej-de.webp
//   6. public/pliki/de/seo-ausschreibung-vorlage.pdf            -> zapytanie-ofertowe-seo-de.webp
// Renderuje z danych lib/szablony/*.de.js do wielostronicowych wektorowych PDF A4 (MuPDF Story + fonty Unicode).
// Zasada prawna stopki: NIP 5253090237 · KRS 0001239983 · REGON 544761611 (tylko numery krajowe KRS/NIP/REGON).
// Zero dlugich myslnikow (tylko ASCII '-').

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const { OBSZARY_GBP_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/checklista-wizytowki-google.de.js')).href);
const { TEILE_BRIEF_TEXTER_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/brief-dla-copywritera.de.js')).href);
const { KRITERIEN_CONTENT_AUDIT_DE, ENTSCHEIDUNGEN_CONTENT_AUDIT_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/szablon-audytu-tresci.de.js')).href);
const { TEILE_VERLINKUNG_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/linkowanie-wewnetrzne.de.js')).href);
const { SEKTIONEN_WEBSITE_BRIEF_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/brief-strony-internetowej.de.js')).href);
const { FRAGEN_AGENTUR_DE, BEWERTUNG_RFP_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/zapytanie-ofertowe-seo.de.js')).href);

const CSS = `
  @font-face { font-family: "DocSans"; src: url("Arial.ttf"); font-weight: normal; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Bold.ttf"); font-weight: bold; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Italic.ttf"); font-weight: normal; font-style: italic; }
  @page { size: A4; margin: 13mm 14mm 15mm; }
  body { font-family: "DocSans", Arial, sans-serif; color: #1D1D1F; font-size: 8.4pt; line-height: 1.35; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 3.5pt 0 7.5pt 0; }
  h1 { font-size: 15pt; line-height: 1.18; margin: 0 0 4pt 0; color: #1D1D1F; }
  p.lead { font-size: 8.6pt; color: #3A3A3C; margin: 0 0 7pt 0; }
  div.uwaga { border: 0.8pt solid #E5E1DC; border-left: 3pt solid #D85A30; background-color: #FAF7F2; padding: 5pt 8pt; font-size: 7.7pt; color: #2C2C2E; margin: 0 0 7pt 0; }
  table.pola td { border: 0.8pt solid #D4CFC8; padding: 4pt 6pt; font-size: 7.3pt; color: #5C5C60; width: 25%; height: 23pt; vertical-align: top; }
  h2 { font-size: 10pt; color: #1D1D1F; margin: 8.5pt 0 3.5pt 0; padding-bottom: 2pt; border-bottom: 1.5pt solid #D85A30; }
  h3 { font-size: 8.9pt; color: #1D1D1F; margin: 5.5pt 0 2.5pt 0; }
  table.dane th { background-color: #F5F2ED; border: 0.7pt solid #D6D1CA; padding: 3.5pt 4.5pt; font-size: 7.2pt; font-weight: bold; color: #3A3A3C; text-align: left; }
  table.dane td { border: 0.7pt solid #D6D1CA; padding: 3.5pt 4.5pt; font-size: 7.7pt; vertical-align: top; text-align: left; }
  td.nr { width: 26pt; font-weight: bold; color: #D85A30; }
  ol, ul { margin: 2.5pt 0 6.5pt 14pt; padding: 0; }
  li { margin-bottom: 2pt; }
  div.stopka { margin-top: 9pt; padding-top: 5pt; border-top: 0.8pt solid #E5E1DC; font-size: 7pt; color: #6E6E73; line-height: 1.34; }
`;

const pasekGora = (sciezkaDe) =>
  `<p style="font-size:7.6pt;color:#5C5C60;margin:0 0 8pt 0;padding:0 0 4pt 0;border-bottom:1pt solid #E5E1DC"><b style="color:#D85A30">AI SEO COMPANY</b> · www.ai-seo-company.pl${esc(sciezkaDe)} · Stand: November 2026</p>`;

const polaGora = (etykiety) =>
  `<table class="pola" width="100%"><tr>${etykiety.map((e) => `<td>${esc(e)}:<br><br></td>`).join('')}</tr></table>`;

const pusteWiersze = (wierszy, kolumn) =>
  Array.from(
    { length: wierszy },
    (_, i) => `<tr><td class="nr">${i + 1}</td>${'<td><br></td>'.repeat(kolumn - 1)}</tr>`,
  ).join('\n      ');

const STOPKA_HTML = `
  <div class="stopka">
    Herausgeber: AI SEO COMPANY (www.ai-seo-company.pl/de) · kontakt@ai-seo-company.pl · Tel. +48 518 815 055<br>
    AI SIGNALS COMPANY Prosta Spółka Akcyjna · Sitz: ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau · Büro: ul. Grzybowska 5A, 00-132 Warschau, Polen<br>
    NIP 5253090237 · KRS 0001239983 · REGON 544761611 · Registergericht: Sąd Rejonowy dla m.st. Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru Sądowego · Aktienkapital: 100.000,00 PLN
  </div>`;

// 1) Google Unternehmensprofil Checkliste (40 Punkte)
const htmlGbp = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Google Unternehmensprofil Checkliste</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/google-unternehmensprofil-checkliste')}
  <h1>Google Unternehmensprofil Checkliste: 40 Prüfpunkte</h1>
  <p class="lead">Schritt-für-Schritt-Prüfbogen von der Berechtigung und Video-Verifizierung über Kategorien, Leistungen und Bewertungen bis zum NAP-Abgleich.</p>
  ${polaGora(['Unternehmen / Standort', 'Hauptkategorie', 'Inhaber-Konto (E-Mail)', 'Geprüft am / durch'])}

  <h2>NAP-Stammdatenblatt (verbindliche Schreibweise für Profil, Website &amp; Verzeichnisse)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:130pt">Stammdaten-Feld</th><th style="width:190pt">Exakter Eintrag (Zeichen für Zeichen)</th><th>Kontrollhinweis</th></tr></thead>
    <tbody>
      <tr><td><b>Offizieller Firmenname</b></td><td><br></td><td>Wie auf Schild &amp; Impressum (keine Keywords)</td></tr>
      <tr><td><b>Straße, Hausnr. &amp; Zusatz</b></td><td><br></td><td>Etage / Hof in Adresszeile 2</td></tr>
      <tr><td><b>PLZ, Ort &amp; Einzugsgebiet</b></td><td><br></td><td>Max. 20 Gebiete (ca. 2 Fahrstunden)</td></tr>
      <tr><td><b>Lokale Telefonnummer</b></td><td><br></td><td>Identisch im Footer &amp; LocalBusiness-JSON-LD</td></tr>
      <tr><td><b>Ziel-URL mit UTM-Tag</b></td><td><br></td><td>https://.../?utm_source=google&amp;utm_medium=organic</td></tr>
    </tbody>
  </table>

  ${OBSZARY_GBP_DE.map(
    (o) => `<h2>${esc(o.tytul)}</h2>
    <table class="dane" width="100%">
      <thead><tr><th style="width:26pt">Nr.</th><th style="width:165pt">Prüfpunkt</th><th>Prüfhinweis / Richtlinie</th><th style="width:38pt">Prio</th><th style="width:58pt">Status</th></tr></thead>
      <tbody>
        ${o.punkty
          .map(
            ([nr, p, jak, prio]) =>
              `<tr><td class="nr">${esc(nr)}</td><td><b>${esc(p)}</b></td><td>${esc(jak)}</td><td>${esc(prio)}</td><td>[ ] OK<br>[ ] Offen</td></tr>`,
          )
          .join('\n        ')}
      </tbody>
    </table>`,
  ).join('\n  ')}

  <h2>Arbeitsblatt: Externe NAP-Verzeichnisse &amp; Monatsprotokoll</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:22pt">#</th><th style="width:145pt">Plattform / Verzeichnis</th><th>Eintrags-URL</th><th style="width:85pt">NAP identisch?</th><th style="width:75pt">Datum / Kürzel</th></tr></thead>
    <tbody>
      <tr><td class="nr">1</td><td>Eigene Website &amp; LocalBusiness JSON-LD</td><td><br></td><td>[ ] Ja  [ ] Korrigiert</td><td><br></td></tr>
      <tr><td class="nr">2</td><td>Apple Business Connect</td><td><br></td><td>[ ] Ja  [ ] Korrigiert</td><td><br></td></tr>
      <tr><td class="nr">3</td><td>Bing Places for Business</td><td><br></td><td>[ ] Ja  [ ] Korrigiert</td><td><br></td></tr>
      <tr><td class="nr">4</td><td>Gelbe Seiten / herold.at / local.ch</td><td><br></td><td>[ ] Ja  [ ] Korrigiert</td><td><br></td></tr>
      <tr><td class="nr">5</td><td>Kammer- / Fachverband-Verzeichnis</td><td><br></td><td>[ ] Ja  [ ] Korrigiert</td><td><br></td></tr>
    </tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 2) Briefing Vorlage für Texter (10 Teile)
const htmlBriefTexter = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Briefing Vorlage für Texter</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/briefing-vorlage-texter')}
  <h1>Briefing Vorlage für Texter: SEO-Content-Briefing (10 Teile)</h1>
  <p class="lead">Arbeitsauftrag für einen konkreten Fachartikel oder eine Leistungsseite: Suchintention, Top-5-SERP-Analyse, Information Gain, Gliederung und 13-Punkte-Abnahme.</p>
  ${polaGora(['Ziel-URL / Slug', 'Haupt-Keyword', 'Texterin / Texter', 'Abgabe Gliederung / Text'])}

  <h2>Teil 1-3. Auftrag, Zielgruppe, Suchintention &amp; Kannibalisierungs-Schutz</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:150pt">Briefing-Feld</th><th>Vorgabe des Auftraggebers</th></tr></thead>
    <tbody>
      <tr><td><b>Arbeitstitel &amp; Seitentyp</b></td><td>[ ] Ratgeber  [ ] Leistungsseite  [ ] Kategorie  [ ] Vergleich  [ ] Content-Refresh</td></tr>
      <tr><td><b>Geschäftsziel &amp; primärer CTA</b></td><td><br></td></tr>
      <tr><td><b>Zielgruppe &amp; Kaufphase</b></td><td>[ ] Problem verstehen  [ ] Optionen vergleichen  [ ] Anbieter wählen · Rolle:<br></td></tr>
      <tr><td><b>Kundenfragen aus dem Vertrieb</b></td><td><br></td></tr>
      <tr><td><b>Haupt-Keyword &amp; Neben-Keywords</b></td><td><br></td></tr>
      <tr><td><b>Suchintention &amp; Gewinner-Format</b></td><td>[ ] Informationell  [ ] Kommerziell  [ ] Transaktional · Format:<br></td></tr>
      <tr><td><b>Out of Scope (gesperrte Keywords)</b></td><td><i>Gehören anderen eigenen URLs:</i><br></td></tr>
    </tbody>
  </table>

  <h2>Teil 4. Analyse der Google Top 5 &amp; KI-Antworten (AI Overviews / ChatGPT)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">Pos.</th><th style="width:115pt">Wettbewerber-URL</th><th style="width:65pt">Format</th><th style="width:130pt">Abgedeckte Pflichtpunkte</th><th>Lücke / Schwäche</th></tr></thead>
    <tbody>${pusteWiersze(5, 5)}</tbody>
  </table>

  <h2>Teil 5 &amp; 8. Eigener Mehrwert (Information Gain), Tonalität &amp; KI-Regeln</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:150pt">Baustein</th><th>Konkrete Zulieferung &amp; Stilvorgabe</th></tr></thead>
    <tbody>
      <tr><td><b>Information Gain (Pflicht)</b></td><td>[ ] Eigene Daten  [ ] Fallbeispiel  [ ] Preisrahmen  [ ] Eigene Fotos  [ ] Expertenzitat<br></td></tr>
      <tr><td><b>Fachexperte für Freigabe</b></td><td>Name, Funktion &amp; Termin:<br></td></tr>
      <tr><td><b>Ansprache, Pflicht- &amp; Tabuwörter</b></td><td>[ ] Sie-Form  [ ] Du-Form  [ ] Neutral · Tabuwörter / Pflichtbegriffe:<br></td></tr>
      <tr><td><b>Einsatz generativer KI</b></td><td>[ ] Kein KI-Text  [ ] Nur Recherche/Gliederung  [ ] Entwurf erlaubt (100 % manuelle Faktenprüfung!)</td></tr>
    </tbody>
  </table>

  <h2>Teil 6. Gliederung (H1, 40-60-Wörter-Direktantwort &amp; H2/H3-Fragenraster)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:45pt">Ebene</th><th style="width:175pt">Geplante Überschrift / Leserfrage</th><th>Pflichtfakten, Zahlen, Beispiele oder Tabellen</th></tr></thead>
    <tbody>
      <tr><td><b>H1</b></td><td><br></td><td>Enthält Haupt-Keyword; genau eine H1 auf der Seite</td></tr>
      <tr><td><b>Lead</b></td><td>Direktantwort im 1. Absatz (40-60 Wörter)</td><td><br></td></tr>
      <tr><td><b>H2</b></td><td><br></td><td><br></td></tr>
      <tr><td><b>H3</b></td><td><br></td><td><br></td></tr>
      <tr><td><b>H2</b></td><td><br></td><td><br></td></tr>
      <tr><td><b>FAQ</b></td><td>3 bis 6 konkrete Kundenfragen</td><td><br></td></tr>
    </tbody>
  </table>

  <h2>Teil 7 &amp; 9. Interne Verlinkung (ausgehend + eingehend), Quellen &amp; Metadaten</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:88pt">Richtung</th><th style="width:140pt">Quell- bzw. Ziel-URL</th><th style="width:140pt">Sprechender Ankertext</th><th>Abschnitt</th></tr></thead>
    <tbody>
      <tr><td>Ausgehend (Hub)</td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td>Ausgehend (Cluster)</td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td>Eingehend (Bestand)</td><td><br></td><td><br></td><td><br></td></tr>
    </tbody>
  </table>
  <table class="dane" width="100%">
    <thead><tr><th style="width:135pt">Metadaten-Feld</th><th>Veröffentlichungsreifer Eintrag</th></tr></thead>
    <tbody>
      <tr><td><b>Title-Tag (&lt;= 60 Zeichen)</b></td><td><br></td></tr>
      <tr><td><b>Meta-Description (120-155 Z.)</b></td><td><br></td></tr>
      <tr><td><b>Primärquellen &amp; Autor</b></td><td><br></td></tr>
    </tbody>
  </table>

  <h2>Teil 10. Abnahme-Checkliste (13 Prüfpunkte vor &amp; nach Livegang)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:24pt">#</th><th>Abnahmekriterium</th><th style="width:76pt">Prüfung</th></tr></thead>
    <tbody>
      ${TEILE_BRIEF_TEXTER_DE[9].lista
        .map((punkt, i) => `<tr><td class="nr">${i + 1}</td><td>${esc(punkt)}</td><td>[ ] OK  [ ] Nachb.</td></tr>`)
        .join('\n      ')}
    </tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 3) Content Audit Vorlage
const htmlContentAudit = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Content Audit Vorlage</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/content-audit-vorlage')}
  <h1>Content Audit Vorlage: Seiten bewerten &amp; bereinigen</h1>
  <p class="lead">Systematische Bestandsaufnahme aller bestehenden URLs mit Search Console, GA4, 5-Kriterien-Scorecard (0-10 Punkte) und klarer Entscheidung je Unterseite.</p>
  ${polaGora(['Domain / Verzeichnis', 'Datenzeitraum (12M + YoY)', 'Freigabe für 301 / 410', 'Verantwortlich & Datum'])}

  <h2>Teil 1 &amp; 3. Die 5 Qualitätskriterien (je 0 bis 2 Punkte = Summe 0-10)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:105pt">Kriterium</th><th style="width:125pt">2 Punkte (stark)</th><th style="width:125pt">1 Punkt (Nachbesserung)</th><th>0 Punkte (kritisch)</th></tr></thead>
    <tbody>
      ${KRITERIEN_CONTENT_AUDIT_DE.map(
        ([k, p2, p1, p0]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(p2)}</td><td>${esc(p1)}</td><td>${esc(p0)}</td></tr>`,
      ).join('\n      ')}
    </tbody>
  </table>

  <h2>Entscheidungsmatrix: Welche Maßnahme folgt aus Daten &amp; Scorecard?</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:102pt">Entscheidung</th><th style="width:175pt">Daten- &amp; Qualitätsmuster</th><th>Technische &amp; redaktionelle Umsetzung</th></tr></thead>
    <tbody>
      ${ENTSCHEIDUNGEN_CONTENT_AUDIT_DE.map(
        ([a, b, u]) => `<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td><td>${esc(u)}</td></tr>`,
      ).join('\n      ')}
    </tbody>
  </table>

  <h2>Teil 2 &amp; 4. Arbeitsblatt: URL-Inventar, Kennzahlen, Score &amp; Entscheidung</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:110pt">URL &amp; Seitentyp</th><th style="width:82pt">Haupt-Keyword</th><th style="width:45pt">Klicks 12M</th><th style="width:36pt">Pos.</th><th style="width:45pt">Links/Leads</th><th style="width:38pt">Score</th><th>Entscheidung &amp; Ziel-URL</th></tr></thead>
    <tbody>${pusteWiersze(10, 8)}</tbody>
  </table>

  <h2>Teil 5 &amp; 6. 301-Weiterleitungsprotokoll &amp; Erfolgskontrolle nach 30 / 90 Tagen</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:125pt">Alte bzw. überarbeitete URL</th><th style="width:115pt">301-Ziel / Maßnahme</th><th style="width:62pt">Klicks vor</th><th style="width:65pt">Klicks +90 T.</th><th>Sitemap &amp; Links OK</th></tr></thead>
    <tbody>${pusteWiersze(6, 6)}</tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 4) Interne Verlinkung Vorlage
const htmlVerlinkung = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Interne Verlinkung Vorlage</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/interne-verlinkung-vorlage')}
  <h1>Interne Verlinkung Vorlage: Hub-and-Spoke &amp; Ankertexte</h1>
  <p class="lead">Acht Arbeitsblätter für klare Seitenprioritäten, eindeutige Ankertexte ohne Kannibalisierung, Themencluster und die Quartalsprüfung verwaister Seiten.</p>
  ${polaGora(['Domain', 'URLs in Sitemap / Crawl', 'Verwaiste Seiten (Ist)', 'Quartal / Verantwortlich'])}

  <h2>Überblick der 8 Arbeitsblätter</h2>
  <ol>${TEILE_VERLINKUNG_DE.map(([t, f, q]) => `<li><b>${esc(t.replace(/^\d+\.\s*/, ''))}:</b> ${esc(f)} <i>(${esc(q)})</i></li>`).join('')}</ol>

  <h2>Teil 1-3. Priorisierte Zielseiten (Prio 1-3) &amp; verbindliches Ankertext-Register</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:115pt">Ziel-URL (Hub / Leistung)</th><th style="width:36pt">Prio</th><th style="width:45pt">Links Ist/Ziel</th><th style="width:120pt">Reservierter Haupt-Ankertext</th><th>Erlaubte Satzvarianten</th></tr></thead>
    <tbody>${pusteWiersze(7, 6)}</tbody>
  </table>

  <h2>Teil 4-5. Hub-and-Spoke-Verlinkungsplan (konkrete Einbauaufträge)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:118pt">Quellseite (von wo?)</th><th style="width:118pt">Zielseite (wohin?)</th><th style="width:115pt">Exakter Ankertext</th><th style="width:52pt">Position</th><th>Live</th></tr></thead>
    <tbody>${pusteWiersze(8, 6)}</tbody>
  </table>

  <h2>Teil 6-8. Quartals-Audit, verwaiste Seiten (Orphan Pages) &amp; 28-Tage-Messung</h2>
  <ul>
    <li>[ ] Jede indexierbare Zielseite besitzt mindestens 2 eingehende Kontextlinks aus relevanten Absätzen</li>
    <li>[ ] Alle Prio-1-Leistungsseiten sind in maximal 3 Klicks ab der Startseite erreichbar</li>
    <li>[ ] Null interne Links auf 404-/5xx-Fehlerseiten und null interne Umwege über 301-Weiterleitungen</li>
    <li>[ ] Alle wichtigen internen Links stehen als echtes &lt;a href&gt; im Server-HTML ohne rel="nofollow"</li>
    <li>[ ] Kein Haupt-Ankertext zeigt widersprüchlich auf zwei verschiedene URLs</li>
  </ul>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:130pt">Verwaiste URL (nur in Sitemap/GSC)</th><th style="width:95pt">Entscheidung (Link/301/410)</th><th style="width:130pt">Quellseiten bzw. 301-Ziel</th><th>Klicks vor / +28 T.</th></tr></thead>
    <tbody>${pusteWiersze(5, 5)}</tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

// 5) Website Briefing Vorlage (Lastenheft in 12 Teilen)
const htmlWebsiteBrief = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Website Briefing Vorlage</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/website-briefing-vorlage')}
  <h1>Website Briefing Vorlage: Lastenheft inkl. SEO (12 Teile)</h1>
  <p class="lead">Einheitliche Angebotsgrundlage vor Relaunch oder Neubau: Ziele, Seitenbaum, CMS-Wahl, Core Web Vitals, SSR-HTML für KI-Bots, 301-Migration, DSGVO/BFSG und Budget.</p>
  ${polaGora(['Unternehmen & Domain', 'Projekttyp (Relaunch / Neu)', 'Budgetrahmen netto (EUR)', 'Wunsch-Go-Live & Leitung'])}

  <h2>Die 12 Abschnitte des Lastenhefts im Überblick</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:135pt">Abschnitt</th><th>Zu klärende Projektdaten</th><th style="width:82pt">Status im Team</th></tr></thead>
    <tbody>
      ${SEKTIONEN_WEBSITE_BRIEF_DE.map(
        ([nr, inhalt]) => `<tr><td><b>${esc(nr)}</b></td><td>${esc(inhalt)}</td><td>[ ] Ausgefüllt<br>[ ] Offen</td></tr>`,
      ).join('\n      ')}
    </tbody>
  </table>

  <h2>Teil 1-4 &amp; 11. Kerndaten für die Agentur-Kalkulation</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:145pt">Projektfeld</th><th>Eintrag des Auftraggebers</th></tr></thead>
    <tbody>
      <tr><td><b>Geschäftsmodell &amp; Kernleistungen</b></td><td><br><br></td></tr>
      <tr><td><b>Messbares 12-Monats-Ziel &amp; GA4-KPIs</b></td><td><br><br></td></tr>
      <tr><td><b>Zielgruppen &amp; Top-5-Kundenfragen</b></td><td><br><br></td></tr>
      <tr><td><b>3 Wettbewerber &amp; 2 Referenzseiten</b></td><td><br><br></td></tr>
      <tr><td><b>Funktionen, Formulare &amp; CRM-Anbindung</b></td><td><br><br></td></tr>
      <tr><td><b>Präferenz CMS / Stack &amp; Sprachen</b></td><td>[ ] Offen für Empfehlung  [ ] Next.js  [ ] Webflow  [ ] WordPress · Sprachen:<br></td></tr>
      <tr><td><b>Investitionsrahmen &amp; fixer Termin</b></td><td>Erstellung netto: ____________ EUR · Laufend/Mon.: ____________ EUR · Livegang:<br></td></tr>
    </tbody>
  </table>

  <h2>Teil 5. Geplanter Seitenbaum &amp; Keyword-Zuordnung (1 Haupt-Keyword = 1 URL)</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:20pt">#</th><th style="width:120pt">Geplante Unterseite</th><th style="width:115pt">Seitenziel / Conversion</th><th style="width:120pt">Haupt-Keyword</th><th>Text &amp; Fotos durch</th></tr></thead>
    <tbody>${pusteWiersze(8, 5)}</tbody>
  </table>

  <h2>Teil 8-10. Verbindliche SEO-, KI-, Performance- &amp; DSGVO-Abnahmekriterien</h2>
  <ul>
    <li>[ ] Vollständiger Text &amp; interne Links stehen sofort im Server-HTML (SSR/SSG) für Googlebot und KI-Crawler</li>
    <li>[ ] Mobile Parität gewährleistet; Core Web Vitals auf Mobilgeräten grün: LCP &lt;= 2,5 s, INP &lt;= 200 ms, CLS &lt;= 0,10</li>
    <li>[ ] Jede indexierbare Seite besitzt individuellen Title (&lt;= 60 Z.), Meta-Description, genau eine H1 und sauberes Canonical</li>
    <li>[ ] 1:1-Weiterleitungsmatrix (Status 301 ohne Ketten) für sämtliche bisherigen Traffic- und Backlink-URLs vor Livegang getestet</li>
    <li>[ ] Staging per HTTP-Passwort geschützt; am Go-Live alle noindex-Sperren entfernt, XML-Sitemap &amp; /llms.txt aktiv</li>
    <li>[ ] Lokales Font-Hosting ohne Drittserver, Consent Mode v2, Barrierefreiheit (BFSG / WCAG 2.1 AA) und volle Konten-Inhaberschaft beim Kunden</li>
  </ul>
  ${STOPKA_HTML}
</body></html>`;

// 6) SEO Ausschreibung Vorlage (RFP)
const htmlSeoRfp = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>SEO Ausschreibung Vorlage (RFP)</title><style>${CSS}</style></head><body>
  ${pasekGora('/de/tools/seo-ausschreibung-vorlage')}
  <h1>SEO Ausschreibung Vorlage (RFP): Agentur-Anfrage &amp; Scorecard</h1>
  <p class="lead">Strukturierte B2B-Angebotsanfrage (Request for Proposal) für direkt vergleichbare SEO-Angebote auf identischer Daten- und Vertragsbasis.</p>
  <div class="uwaga"><b>HINWEIS:</b> Kaufmännisches Muster für privatwirtschaftliche Unternehmen - kein Formular für öffentliche Vergabeverfahren (UVgO/VgV) und keine Rechtsberatung. Die Anfrage verpflichtet nicht zum Vertragsschluss.</div>
  ${polaGora(['Ausschreibendes Unternehmen', 'Domain & CMS/Shop', 'Angebotsfrist (7-10 Werkt.)', 'Monatsbudget-Korridor (EUR)'])}

  <h2>Teil 1-4 &amp; 6. Ausgangslage, Geschäftsziel &amp; interne Ressourcen</h2>
  <table class="dane" width="100%">
    <thead><tr><th style="width:145pt">Ausschreibungsfeld</th><th>Angaben des Auftraggebers</th></tr></thead>
    <tbody>
      <tr><td><b>Branche, Zielmarkt &amp; Prioritäts-Leistungen</b></td><td><br><br></td></tr>
      <tr><td><b>12-Monats-Geschäftsziel &amp; GA4-Ist-Wert</b></td><td>Aktuelle organische Anfragen/Käufe pro Monat: ______ · Ziel nach 12 Monaten:<br></td></tr>
      <tr><td><b>Organischer Ist-Stand &amp; Historie</b></td><td>Non-Brand-Klicks (GSC 12M): ______ · Letzter Relaunch / bisherige Agentur:<br></td></tr>
      <tr><td><b>3-5 Wettbewerber in Google &amp; KI</b></td><td><br></td></tr>
      <tr><td><b>Interne Entwickler- &amp; Fachkapazität</b></td><td>IT/Dev: ______ Std./Mon. · Textfreigabe binnen ______ Werktagen · Leserechte GSC vorab: [ ] Ja [ ] Nein</td></tr>
    </tbody>
  </table>

  <h2>Teil 5. Leistungsrahmen in 3 Spalten (identische Kalkulationsbasis für alle Bieter)</h2>
  <table class="dane" width="100%">
    <thead><tr><th>Leistungsbaustein</th><th style="width:82pt">Pflicht im Angebot</th><th style="width:82pt">Optional anbieten</th><th style="width:88pt">Nicht Teil des RFP</th></tr></thead>
    <tbody>
      <tr><td>Technisches SEO-Audit &amp; Begleitung der Umsetzung</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>Optimierung bestehender Leistungs- &amp; Kategorieseiten</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>Neue Fachinhalte inkl. SEO-Briefing (Anzahl/Monat: ____)</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>Redaktioneller Linkaufbau &amp; Digital PR (ohne Mietlinks!)</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>Lokales SEO &amp; Google Unternehmensprofil</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>KI-Sichtbarkeit / GEO (ChatGPT, Gemini, Perplexity, AIO)</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
      <tr><td>GA4-Schlüsselereignisse &amp; monatliches GSC-Reporting</td><td>[ ]</td><td>[ ]</td><td>[ ]</td></tr>
    </tbody>
  </table>

  <h2>Teil 7-8. Die 12 schriftlichen Pflichtfragen an die angefragten SEO-Agenturen</h2>
  <ol>${FRAGEN_AGENTUR_DE.map((f) => `<li>${esc(f)}</li>`).join('')}</ol>

  <h2>Teil 9-10. Gewichtete Angebots-Bewertungsmatrix (0 bis 2 Punkte je Kriterium)</h2>
  <table class="dane" width="100%">
    <thead><tr><th>Bewertungskriterium</th><th style="width:42pt">Gewicht</th><th style="width:85pt">Agentur A</th><th style="width:85pt">Agentur B</th><th style="width:85pt">Agentur C</th></tr></thead>
    <tbody>
      ${BEWERTUNG_RFP_DE.map(
        ([krit, gew]) => `<tr><td><b>${esc(krit)}</b></td><td>${esc(gew)}</td><td>___ / 2 Pkt.</td><td>___ / 2 Pkt.</td><td>___ / 2 Pkt.</td></tr>`,
      ).join('\n      ')}
      <tr><td><b>Gewichtete Gesamtpunktzahl</b></td><td><b>100 %</b></td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>12-Monats-Gesamtkosten netto (12x Mon. + Setup)</b></td><td>EUR</td><td><br></td><td><br></td><td><br></td></tr>
      <tr><td><b>Mindestlaufzeit &amp; Kündigungsfrist</b></td><td>Vertrag</td><td><br></td><td><br></td><td><br></td></tr>
    </tbody>
  </table>
  ${STOPKA_HTML}
</body></html>`;

const PY_RENDER = `
import sys, os, fitz
from PIL import Image

html_path, pdf_path, webp_path, title = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
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

# Render page 1 of the optimized PDF to a crisp 600x850 RGB .webp hero preview
doc_render = fitz.open(pdf_path)
pix = doc_render[0].get_pixmap(matrix=fitz.Matrix(3.0, 3.0), alpha=False)
img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
img_600 = img.resize((600, 850), Image.Resampling.LANCZOS)
img_600.save(webp_path, "WEBP", quality=90, method=6)
doc_render.close()
`;

// [pdfNazwa, plSlugDlaWebp, tytulPdf, html]
const ZADANIA = [
  ['google-unternehmensprofil-checkliste', 'checklista-wizytowki-google', 'Google Unternehmensprofil Checkliste: 40 Prüfpunkte', htmlGbp],
  ['briefing-vorlage-texter', 'brief-dla-copywritera', 'Briefing Vorlage für Texter: SEO-Content-Briefing (10 Teile)', htmlBriefTexter],
  ['content-audit-vorlage', 'szablon-audytu-tresci', 'Content Audit Vorlage: Seiten bewerten & bereinigen', htmlContentAudit],
  ['interne-verlinkung-vorlage', 'linkowanie-wewnetrzne', 'Interne Verlinkung Vorlage: Hub-and-Spoke & Ankertexte', htmlVerlinkung],
  ['website-briefing-vorlage', 'brief-strony-internetowej', 'Website Briefing Vorlage: Lastenheft inkl. SEO (12 Teile)', htmlWebsiteBrief],
  ['seo-ausschreibung-vorlage', 'zapytanie-ofertowe-seo', 'SEO Ausschreibung Vorlage (RFP): Agentur-Anfrage & Scorecard', htmlSeoRfp],
];

fs.mkdirSync(path.join(ROOT, 'public/pliki/de'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'public/images/narzedzia/szablony'), { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiseo-pdf-de-faza4-'));

try {
  for (const [pdfNazwa, plSlug, tytulPdf, html] of ZADANIA) {
    const htmlPath = path.join(tmpDir, `${pdfNazwa}.html`);
    const pdfPath = path.join(ROOT, 'public/pliki/de', `${pdfNazwa}.pdf`);
    const webpPath = path.join(ROOT, 'public/images/narzedzia/szablony', `${plSlug}-de.webp`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    execFileSync('python3', ['-c', PY_RENDER, htmlPath, pdfPath, webpPath, tytulPdf], { stdio: 'inherit' });
    const pdfKb = (fs.statSync(pdfPath).size / 1024).toFixed(1);
    const webpKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`Wygenerowano ${pdfNazwa}.pdf (${pdfKb} KB) + ${plSlug}-de.webp (${webpKb} KB)`);
  }
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
