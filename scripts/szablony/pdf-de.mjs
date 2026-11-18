// Generator niemieckich PDF szablonów (de-narzedzia, 18.11.2026): SEO Checkliste (50 Punkte) i Redaktionsplan Vorlage.
// Czyta dane z lib/szablony/*.de.js (jedno źródło dla strony i PDF), CSS z istniejących źródeł EN
// (scripts/szablony/pdf/seo-checklist.html i content-calendar-template.html), zapisuje HTML do scripts/szablony/pdf/
// i renderuje PDF do public/pliki/de/ przez Chromium z cache Playwright (chromium-1140).
// Użycie: node scripts/szablony/pdf-de.mjs   (w kopii APFS albo w repo; nie wymaga serwera)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const CHROMIUM = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1140/chrome-mac/Chromium.app/Contents/MacOS/Chromium');
const css = (plik) => /<style>([\s\S]*?)<\/style>/.exec(fs.readFileSync(path.join(ROOT, 'scripts/szablony/pdf', plik), 'utf8'))[1];
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Punkty zawierają <code>…</code> (bezpieczny znacznik): przywracamy go po ucieczce.
const kod = (t) => esc(t).replace(/&lt;code&gt;(.*?)&lt;\/code&gt;/g, '<code>$1</code>');

const { PUNKTY_DE } = await import(pathToFileURL(path.join(ROOT, 'lib/szablony/checklista-seo.de.js')).href);
const cp = (await import(pathToFileURL(path.join(ROOT, 'lib/szablony/content-plan.de.js')).href)).default.de;

// --- SEO Checkliste ---------------------------------------------------------------------------------------------
const PRIO = { hoch: ['w', 'hoch'], mittel: ['s', 'mittel'], niedrig: ['n', 'niedrig'] };
const OPISY = {
  A: 'Ob Google Ihre Seiten erreicht, indexiert und auf dem Smartphone gut darstellt. Für eine tiefere technische Prüfung nutzen Sie den SEO Audit auf ai-seo-company.pl.',
  B: 'Titel, Beschreibungen, Überschriften, Inhalt, interne Links und Bilder: ob jede Seite klar sagt, worum es geht.',
  C: 'Google Unternehmensprofil, einheitliches NAP, Bewertungen und Kontaktseite: ob Ihr Unternehmen in Maps und im Web einheitlich beschrieben wird.',
  D: 'Zugriff von KI-Bots, Inhalt im HTML, Antworten auf Kundenfragen und einheitliche Unternehmensdaten.',
  E: 'Search Console, GA4 und beobachtete Keywords: ob Sie messen, wie viele Anfragen die Suche bringt.',
};
const BEZ = { A: 'A. Technische Grundlagen', B: 'B. On-Page SEO', C: 'C. Lokales SEO', D: 'D. KI-Tauglichkeit', E: 'E. Messung' };
const wiersz = ([nr, punkt, sposob, p]) => `<tr>
        <td class="nr">${nr}</td>
        <td><div class="pk">${kod(punkt)}</div><div class="jak"><b>So prüfen Sie es:</b> ${kod(sposob)}</div></td>
        <td><span class="prio ${PRIO[p][0]}">${PRIO[p][1]}</span></td>
        <td class="st"><div><span class="box"></span>OK</div><div><span class="box"></span>Handeln</div><div><span class="box"></span>n. z.</div></td>
        <td class="notatki"></td>
      </tr>`;
const obszar = (o) => `<section class="obszar">
  <h2>${BEZ[o.id]}</h2>
  <p class="opis">${esc(OPISY[o.id])} <span class="ile">${o.punkty.length} Punkte</span></p>
  <table class="lista">
    <colgroup><col style="width:9mm"><col style="width:99mm"><col style="width:17mm"><col style="width:17mm"><col></colgroup>
    <thead><tr><th>Nr.</th><th>Punkt und wie Sie ihn prüfen</th><th>Priorität</th><th>Status</th><th>Notizen · Verantwortliche · Termin</th></tr></thead>
    <tbody>
      ${o.punkty.map(wiersz).join('')}
    </tbody>
  </table>
  <p class="wynik"><span>Wertung des Bereichs: <span class="box"></span>OK ____ &nbsp; <span class="box"></span>Handlungsbedarf ____ &nbsp; <span class="box"></span>n. z. ____</span></p>
  <footer><p>Aktuelle Fassung dieser Checkliste mit Beispiel und Quellen: <strong>www.ai-seo-company.pl/de/tools/seo-checkliste</strong></p><p>AI SIGNALS COMPANY P.S.A., ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau, Polen</p></footer>
</section>`;
const razem = PUNKTY_DE.reduce((n, o) => n + o.punkty.length, 0);
const checkliste = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>SEO Checkliste: ${razem} Punkte</title>
<!-- Quelle von public/pliki/de/seo-checkliste.pdf (Seite /de/tools/seo-checkliste, 18.11.2026). Erzeugt von scripts/szablony/pdf-de.mjs
     aus lib/szablony/checklista-seo.de.js (PUNKTY_DE). Nicht von Hand bearbeiten: Änderungen in der Datendatei vornehmen und neu erzeugen. -->
<style>${css('seo-checklist.html')}</style>
</head>
<body>
<div class="naglowek"><b>AI SEO COMPANY</b> · www.ai-seo-company.pl</div>
<h1>SEO Checkliste: ${razem} Punkte</h1>
<p class="pod">Technische Grundlagen, On-Page SEO, lokales SEO, KI-Tauglichkeit und Messung. Jeder Punkt hat eine Priorität und eine Möglichkeit zur Überprüfung. Stand: November 2026.</p>
<div class="pola sek"><div class="pole"><span>Website (URL)</span><i></i></div><div class="pole"><span>Datum der Prüfung</span><i></i></div><div class="pole"><span>Geprüft von</span><i></i></div><div class="pole"><span>Nächste Prüfung</span><i></i></div></div>
<div class="sek">
  <h3>So nutzen Sie diese Vorlage</h3>
  <ol class="kroki"><li><strong>Ausgangswert festhalten:</strong> Klicks ohne Markenanfragen und Kundenanfragen (Tabelle am Ende dieser Seite).</li><li><strong>Zugänge sammeln:</strong> Search Console, GA4, Google Unternehmensprofil, CMS, robots.txt. Fehlende Zugänge sind Ihr erster Befund.</li><li><strong>Bereiche A–E der Reihe nach durchgehen</strong> und jeden Punkt als OK, Handlungsbedarf oder n. z. markieren.</li><li><strong>Das Problem in den Notizen beschreiben:</strong> die URL und das konkrete Problem, z. B. „/kontakt: keine H1“.</li><li><strong>Reihenfolge festlegen:</strong> hohe Priorität zuerst. Geben Sie jedem offenen Punkt eine verantwortliche Person und einen Termin.</li><li><strong>Erneut prüfen</strong> nach den Korrekturen und die Übersicht ausfüllen. Die ganze Liste jedes Quartal wiederholen.</li></ol>
</div>
<div class="sek">
  <h3>Status und Prioritäten</h3>
  <div class="dwie"><ul class="leg"><li><span class="box"></span><strong>OK</strong> – der Punkt ist erfüllt</li><li><span class="box"></span><strong>Handeln</strong> – Handlungsbedarf: URL und Problem notieren</li><li><span class="box"></span><strong>n. z.</strong> – trifft auf Ihr Unternehmen nicht zu; aus der Wertung lassen</li></ul><ul class="leg"><li><span class="prio w">hoch</span> blockiert die Sichtbarkeit in Google oder Maps oder die Messung; zuerst erledigen</li><li><span class="prio s">mittel</span> bremst Ergebnisse, aber die Website funktioniert und ist sichtbar</li><li><span class="prio n">niedrig</span> schleift Details; zusammen mit anderen Änderungen erledigen</li></ul></div>
</div>
<div class="sek">
  <h3>Übersicht der Prüfung</h3>
  <table class="podsum">
    <colgroup><col style="width:44mm"><col style="width:18mm"><col style="width:18mm"><col style="width:26mm"><col style="width:16mm"><col></colgroup>
    <thead><tr><th>Bereich</th><th>Punkte</th><th>OK</th><th>Handlungsbedarf</th><th>n. z.</th><th>Offene Punkte mit hoher Priorität</th></tr></thead>
    <tbody>${PUNKTY_DE.map((o) => `<tr><td>${BEZ[o.id]}</td><td class="c">${o.punkty.length}</td><td></td><td></td><td></td><td></td></tr>`).join('')}<tr class="razem"><td>Gesamt</td><td class="c">${razem}</td><td></td><td></td><td></td><td></td></tr></tbody>
  </table>
</div>
<div>
  <h3>Ausgangswert (Punkt E9)</h3>
  <div class="baza"><div class="pole"><span>Klicks ohne Markenanfragen (Search Console, letzter Monat)</span><i></i></div><div class="pole"><span>Kundenanfragen (GA4 und Postfach oder CRM, letzter Monat)</span><i></i></div><div class="pole"><span>Datum der Erfassung</span><i></i></div></div>
</div>

${PUNKTY_DE.map(obszar).join('\n\n')}
</body>
</html>
`;

// --- Redaktionsplan Vorlage ---------------------------------------------------------------------------------------
const poczesci = (html) => html.split(/(?=<h3>Teil \d)/).filter(Boolean);
const czesci = poczesci(cp.podglad.html);
const stopka = '<p class="maly">Aktuelle Fassung mit Anleitung, Beispiel und Quellen: www.ai-seo-company.pl/de/tools/redaktionsplan-vorlage · AI SIGNALS COMPANY P.S.A., ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau, Polen</p>';
const kopf = '<div class="naglowek"><span><b>AI SEO COMPANY</b> · www.ai-seo-company.pl</span><span>Redaktionsplan Vorlage · Stand: November 2026</span></div>';
const h3zuH2 = (h) => h.replace(/<h3>(Teil \d\.)\s*([^<]*)<\/h3>/, '<h2 class="pierwszy"><span class="nr">$1</span> $2</h2>');
const strona = (...teile) => `<section class="strona">${kopf}${teile.join('\n')}${stopka}</section>`;
const redaktionsplan = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Redaktionsplan Vorlage: Plan für 3 Monate – AI SEO COMPANY</title>
<!-- Quelle von public/pliki/de/redaktionsplan-vorlage.pdf (Seite /de/tools/redaktionsplan-vorlage, 18.11.2026). Erzeugt von
     scripts/szablony/pdf-de.mjs aus lib/szablony/content-plan.de.js (podglad). Nicht von Hand bearbeiten. -->
<style>${css('content-calendar-template.html')}
  table td { height: 7.2mm; }
  ul.pruef { list-style: none; padding: 0; margin: 0; }
  ul.pruef li { margin: 0 0 1.4mm; }
  .podglad-teil ul { list-style: none; padding: 0; margin: 0; }
  .podglad-teil ul li { margin: 0 0 1.4mm; }
  .podglad-teil ol { margin: 0 0 2mm; padding-left: 5mm; }
  .podglad-teil ol li { margin: 0 0 1.6mm; }
  .podglad-teil table { margin: 0 0 2.4mm; }
  .podglad-teil th { font-size: 7.2pt; }
  .podglad-teil td { height: 8.2mm; }
</style>
</head>
<body>
<section class="strona" style="break-before: auto">
${kopf}
<h1>Redaktionsplan Vorlage: Plan für 3 Monate</h1>
<p class="lead">Grundlagen des Plans, Themenspeicher, Redaktionskalender für 3 Monate, Ergebnisblatt für die Search Console und GA4, Checkliste vor der Veröffentlichung und Quartalsrückblick. Zum Ausdrucken oder zum Übertragen in eine Tabellenkalkulation.</p>
<div class="podglad-teil">${h3zuH2(czesci[0])}${h3zuH2(czesci[1])}</div>
${stopka}
</section>
${strona(`<div class="podglad-teil">${h3zuH2(czesci[2])}</div>`)}
${strona(`<div class="podglad-teil">${h3zuH2(czesci[3])}</div>`)}
${strona(`<div class="podglad-teil">${h3zuH2(czesci[4])}</div>`)}
${strona(`<div class="podglad-teil">${h3zuH2(czesci[5])}</div>`)}
</body>
</html>
`;

const AUS = { 'seo-checkliste': checkliste, 'redaktionsplan-vorlage': redaktionsplan };
fs.mkdirSync(path.join(ROOT, 'public/pliki/de'), { recursive: true });
for (const [nazwa, html] of Object.entries(AUS)) {
  const plikHtml = path.join(ROOT, 'scripts/szablony/pdf', `${nazwa}.html`);
  fs.writeFileSync(plikHtml, html);
  const pdf = path.join(ROOT, 'public/pliki/de', `${nazwa}.pdf`);
  execFileSync(CHROMIUM, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, pathToFileURL(plikHtml).href], { stdio: 'ignore' });
  console.log(nazwa, fs.statSync(pdf).size, 'B');
}
