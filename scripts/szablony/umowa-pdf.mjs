// Generator 3 plikow PDF dla szablonu F5 „Umowa na pozycjonowanie: wzor i checklista 12 zapisow” (22.11.2026):
//   - public/pliki/wzor-umowy-pozycjonowanie.pdf (PL)
//   - public/pliki/seo-contract-checklist.pdf (EN)
//   - public/pliki/de/seo-vertrag-checkliste.pdf (DE)
// Pobiera 12 paragrafow z jednego zrodla: lib/szablony/umowa-na-pozycjonowanie.js oraz .de.js.
// Zapisuje zrodla HTML w scripts/szablony/pdf/ i renderuje wielostronicowe wektorowe PDF A4 (MuPDF Story + fonty Unicode).
// Zero dlugich myslnikow (tylko ASCII '-').

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const { PARAGRAFY_PL, PARAGRAFY_EN } = await import(
  pathToFileURL(path.join(ROOT, 'lib/szablony/umowa-na-pozycjonowanie.js')).href
);
const { KLAUZULE_VERTRAG_DE } = await import(
  pathToFileURL(path.join(ROOT, 'lib/szablony/umowa-na-pozycjonowanie.de.js')).href
);

const CSS = `
  @font-face { font-family: "DocSans"; src: url("Arial.ttf"); font-weight: normal; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Bold.ttf"); font-weight: bold; font-style: normal; }
  @font-face { font-family: "DocSans"; src: url("Arial Italic.ttf"); font-weight: normal; font-style: italic; }
  @page { size: A4; margin: 13mm 14mm 15mm; }
  body { font-family: "DocSans", Arial, sans-serif; color: #1D1D1F; font-size: 8.5pt; line-height: 1.36; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 9pt 0; }
  table.pasek { margin: 0 0 8pt 0; border-bottom: 1pt solid #E5E1DC; }
  table.pasek td { border: none; padding: 0 0 4pt 0; font-size: 7.6pt; color: #5C5C60; }
  h1 { font-size: 15.5pt; line-height: 1.18; margin: 0 0 4pt 0; color: #1D1D1F; }
  p.lead { font-size: 8.8pt; color: #3A3A3C; margin: 0 0 7pt 0; }
  div.uwaga { border: 1pt solid #E5E1DC; border-left: 3pt solid #D85A30; background-color: #FAF7F2; padding: 6pt 8pt; font-size: 7.8pt; color: #2C2C2E; margin: 0 0 8pt 0; }
  table.pola td { border: 0.8pt solid #D4CFC8; padding: 4pt 6pt; font-size: 7.4pt; color: #5C5C60; width: 25%; height: 26pt; vertical-align: top; }
  h2 { font-size: 10.5pt; color: #1D1D1F; margin: 10pt 0 4pt 0; padding-bottom: 2pt; border-bottom: 1.5pt solid #D85A30; }
  table.dane th { background-color: #F5F2ED; border: 0.7pt solid #D6D1CA; padding: 4pt 5pt; font-size: 7.2pt; font-weight: bold; color: #3A3A3C; text-align: left; }
  table.dane td { border: 0.7pt solid #D6D1CA; padding: 4pt 5pt; font-size: 7.8pt; vertical-align: top; text-align: left; }
  td.nr { width: 44pt; font-weight: bold; color: #D85A30; }
  td.obszar { width: 102pt; font-weight: bold; }
  td.status { width: 78pt; font-size: 7.4pt; }
  table.klauzule td { border: 0.8pt solid #E0DBD3; padding: 6pt 7pt; width: 50%; vertical-align: top; }
  div.kl-tytul { font-size: 8.5pt; font-weight: bold; color: #1D1D1F; margin: 0 0 3pt 0; }
  div.kl-tresc { font-size: 7.8pt; color: #3A3A3C; margin: 0; }
  div.stopka { margin-top: 10pt; padding-top: 6pt; border-top: 0.8pt solid #E5E1DC; font-size: 7.1pt; color: #6E6E73; line-height: 1.35; }
`;

function zbudujHtml({
  lang,
  url,
  wersja,
  h1,
  lead,
  disclaimer,
  pola,
  h2Tabela,
  kolumny,
  wiersze,
  statusTekst,
  h2Wzor,
  blokiWzoru,
  h2Exit,
  kolumnyExit,
  wierszeExit,
  stopkaLinie,
}) {
  const trParagrafy = wiersze
    .map(
      ([nr, obszar, standard, flaga]) =>
        `<tr><td class="nr">${esc(nr)}</td><td class="obszar">${esc(obszar)}</td><td>${esc(standard)}</td><td>${esc(flaga)}</td><td class="status">${statusTekst}</td></tr>`,
    )
    .join('\n      ');

  const paryWzoru = [];
  for (let i = 0; i < blokiWzoru.length; i += 2) {
    const lewy = blokiWzoru[i];
    const prawy = blokiWzoru[i + 1];
    paryWzoru.push(
      `<tr>
        <td><div class="kl-tytul">${esc(lewy[0])}</div><div class="kl-tresc">${esc(lewy[1])}</div></td>
        <td>${prawy ? `<div class="kl-tytul">${esc(prawy[0])}</div><div class="kl-tresc">${esc(prawy[1])}</div>` : ''}</td>
      </tr>`,
    );
  }

  const trExit = wierszeExit
    .map(([sys, wymog]) => `<tr><td style="width:135pt;font-weight:bold">${esc(sys)}</td><td>${esc(wymog)}</td><td style="width:60pt">[ ] OK</td><td style="width:90pt"></td></tr>`)
    .join('\n      ');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(h1)}</title>
<style>${CSS}</style>
</head>
<body>
  <table class="pasek" width="100%"><tr><td><b style="color:#D85A30">AI SEO COMPANY</b> · ${esc(url)}</td><td align="right" style="text-align:right">${esc(wersja)}</td></tr></table>
  <h1>${esc(h1)}</h1>
  <p class="lead">${esc(lead)}</p>
  <div class="uwaga"><b>${lang === 'pl' ? 'INFORMACJA PRAWNA:' : lang === 'de' ? 'RECHTLICHER HINWEIS:' : 'LEGAL NOTICE:'}</b> ${esc(disclaimer)}</div>
  <table class="pola" width="100%"><tr>${pola.map((p) => `<td width="25%">${esc(p)}:<br><br></td>`).join('')}</tr></table>

  <h2>${esc(h2Tabela)}</h2>
  <table class="dane" width="100%">
    <thead><tr>${kolumny.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
    <tbody>
      ${trParagrafy}
    </tbody>
  </table>

  <h2>${esc(h2Wzor)}</h2>
  <table class="klauzule" width="100%">
    <tbody>
      ${paryWzoru.join('\n      ')}
    </tbody>
  </table>

  <h2>${esc(h2Exit)}</h2>
  <table class="dane" width="100%">
    <thead><tr>${kolumnyExit.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
    <tbody>
      ${trExit}
    </tbody>
  </table>

  <div class="stopka">
    ${stopkaLinie.map((l) => `<div>${esc(l)}</div>`).join('\n    ')}
  </div>
</body>
</html>
`;
}

const DOKUMENTY = [
  {
    htmlNazwa: 'wzor-umowy-pozycjonowanie.html',
    pdfRel: 'public/pliki/wzor-umowy-pozycjonowanie.pdf',
    dane: {
      lang: 'pl',
      url: 'www.ai-seo-company.pl/narzedzia/umowa-na-pozycjonowanie',
      wersja: 'Wzór edukacyjny i checklista · stan: 11.2026',
      h1: 'Umowa na pozycjonowanie strony: wzór i checklista 12 zapisów',
      lead: 'Arkusz weryfikacji projektu umowy i OWU agencji SEO oraz szkielet bezpiecznych postanowień B2B chroniących konta Google, treści, linki i okres wypowiedzenia.',
      disclaimer: 'Wzór edukacyjny i lista kontrolna dla zamawiającego - nie stanowi indywidualnej porady prawnej w rozumieniu przepisów o adwokaturze i radcach prawnych. Przed zawarciem umowy o znacznej wartości skonsultuj jej treść z radcą prawnym lub adwokatem.',
      pola: ['Domena i nazwa Zamawiającego', 'Badany Wykonawca (agencja)', 'Budżet netto / mies.', 'Data i osoba sprawdzająca'],
      h2Tabela: 'Część 1. Checklista 12 kluczowych paragrafów przed podpisaniem umowy SEO',
      kolumny: ['§', 'Obszar umowy', 'Bezpieczny zapis dla klienta', 'Czerwona flaga w OWU', 'Ocena'],
      wiersze: PARAGRAFY_PL,
      statusTekst: '[ ] OK<br>[ ] Zmienić',
      h2Wzor: 'Część 2. Szkielet kluczowych klauzul do umowy B2B (wzór edukacyjny)',
      blokiWzoru: [
        ['§ 1-§ 2. Zakres miesięczny i 1-mies. wypowiedzenie', 'Wykonawca realizuje co miesiąc uzgodnioną w Załączniku nr 1 liczbę tekstów, publikacji zewnętrznych i prac technicznych. Umowa na czas nieoznaczony z 1-miesięcznym wypowiedzeniem w formie dokumentowej (e-mail) na koniec miesiąca, bez opłat wyjściowych i milczącego rolowania o rok.'],
        ['§ 3. Własność kont na e-mailu Zamawiającego', 'Głównym właścicielem Google Search Console, GA4, GTM, Profilu Firmy w Google, Bing Webmaster Tools oraz Google Ads pozostaje Zamawiający. Wykonawca działa wyłącznie na uprawnieniach użytkownika lub menedżera.'],
        ['§ 4. Prawa autorskie i trwała licencja do treści', 'Z chwilą zapłaty faktury za dany okres Wykonawca przenosi na Zamawiającego autorskie prawa majątkowe (oraz udziela nieodwołalnej, bezterminowej licencji z prawem modyfikacji) do powstałych tekstów, grafik, meta danych i zmian w kodzie. Zakaz usuwania treści po ustaniu umowy.'],
        ['§ 5. Trwałość linków i zakaz technik spamowych', 'Wykonawca nie stosuje systemów wymiany linków (SWL) ani praktyk sprzecznych z zasadami spamu Google. Odnośniki pozyskane i opłacone w trakcie umowy nie są usuwane przez Wykonawcę po jej zakończeniu, a ich pełne adresy URL trafiają do raportu miesięcznego.'],
        ['§ 6-§ 8. Akceptacja zmian, ryczałt i raport z GSC/GA4', 'Zmiany na stronie są logowane w dzienniku prac i wdrażane po akceptacji. Wynagrodzenie ryczałtowe netto bez ukrytych dopłat. Raport do 5. dnia roboczego oparty na danych z Search Console i GA4 Zamawiającego (kliki niebrandowe, zdarzenia kluczowe, lista prac i URL-e linków).'],
        ['§ 9-§ 12. Staranne działanie, NDA i RODO (art. 28)', 'Umowa starannego działania (art. 750 KC) bez pozornych gwarancji TOP 1. Poufność danych handlowych i analitycznych. Brak kar umownych za wypowiedzenie. Przy dostępie do CMS/CRM/sklepu Strony zawierają umowę powierzenia RODO i odpinają dostępy w 7 dni roboczych od końca umowy.'],
      ],
      h2Exit: 'Część 3. Protokół własności kont przy starcie i zakończeniu współpracy',
      kolumnyExit: ['System / Narzędzie', 'Wymagany stan bezpieczny dla firmy', 'Status', 'Konto właściciela / data'],
      wierszeExit: [
        ['Google Search Console & Bing Webmaster', 'Zweryfikowane na koncie firmowym klienta; agencja jako Użytkownik'],
        ['Google Analytics 4 & Google Tag Manager', 'Rola Administratora na e-mailu firmy; zdefiniowane zdarzenia kluczowe'],
        ['Profil Firmy w Google (Mapy)', 'Klient = Główny właściciel; agencja = Menedżer profilu'],
        ['Panel CMS / Hosting / Cloudflare / 2FA', 'Osobne konto imienne dla agencji, kopia zapasowa i umowa RODO art. 28'],
      ],
      stopkaLinie: [
        'Opracowanie: AI SEO COMPANY (www.ai-seo-company.pl) · Bezpłatny przegląd projektu umowy innej agencji w 24 h robocze: kontakt@ai-seo-company.pl · tel. +48 518 815 055',
        'AI SIGNALS COMPANY Prosta Spółka Akcyjna, ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa · Biuro: ul. Grzybowska 5A, 00-132 Warszawa · KRS 0001239983 (Sąd Rejonowy dla m.st. Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru Sądowego) · NIP 5253090237 · REGON 544761611 · Kapitał akcyjny: 100 000,00 zł.',
      ],
    },
  },
  {
    htmlNazwa: 'seo-contract-checklist.html',
    pdfRel: 'public/pliki/seo-contract-checklist.pdf',
    dane: {
      lang: 'en',
      url: 'www.ai-seo-company.pl/en/tools/seo-contract-checklist',
      wersja: 'Educational template & checklist · 11.2026',
      h1: 'SEO Contract Template & 12-Clause Buyer Checklist',
      lead: 'Commercial review scorecard for B2B SEO retainers and Terms of Service, plus an educational 12-clause agreement framework protecting your Google accounts, IP, backlinks and notice terms.',
      disclaimer: 'Educational template and commercial buyer checklist - does not constitute individual legal advice or create a lawyer-client relationship. Have qualified legal counsel review high-value or cross-border contracts before signing.',
      pola: ['Client company & domain', 'Prospective SEO agency', 'Monthly net fee', 'Reviewed by & date'],
      h2Tabela: 'Part 1. 12-Clause B2B SEO Contract Scorecard (Review Before Signing)',
      kolumny: ['Clause', 'Contract area', 'Healthy buyer standard', 'Agency red flag', 'Check'],
      wiersze: PARAGRAFY_EN,
      statusTekst: '[ ] Pass<br>[ ] Revise',
      h2Wzor: 'Part 2. Model B2B Clause Framework (Educational Reference)',
      blokiWzoru: [
        ['Clauses 1-2. Countable Scope & 1-Month Email Notice', 'Provider delivers itemized monthly outputs in Schedule A (technical fixes, content count, editorial links, Business Profile). Agreement runs on a monthly rolling basis terminable via email with 1 calendar month’s notice and zero exit penalties or silent 12-month auto-renewals.'],
        ['Clause 3. First-Party Account Ownership', 'Client remains sole Primary Owner of Google Search Console, GA4, Google Tag Manager, Google Business Profile, Bing Webmaster Tools and ad accounts under Client’s own domain email. Provider operates strictly via delegated user/manager access.'],
        ['Clause 4. Permanent Content & Code IP', 'Upon payment of each monthly invoice, full economic copyright (and an irrevocable, perpetual, worldwide royalty-free license with modification rights) in all copy, graphics, metadata and code vests in Client. Provider may never delete paid work post-termination.'],
        ['Clause 5. Permanent Backlinks & Anti-Spam Rule', 'Provider complies with Google Search Essentials and spam policies (zero PBNs, link schemes or cloaking). Earned placements from paid billing cycles are never removed by Provider after contract end, and exact live URLs are reported monthly.'],
        ['Clauses 6-8. Approval, Fixed Net Fee & GSC/GA4 Reports', 'Provider logs all changes and obtains email sign-off before publishing pages or template edits. Fixed monthly net fee with zero hidden offboarding charges. Monthly report pulled from Client’s own GSC and GA4 (non-brand clicks, key events, work log, live link URLs).'],
        ['Clauses 9-12. Standard of Care, NDA & GDPR Art. 28', 'Professional services standard of care without deceptive #1 ranking guarantees. Mutual confidentiality of business data. Balanced liability without termination penalties. Attached GDPR Art. 28 DPA whenever CMS/CRM personal data is accessed; access revoked within 7 business days of exit.'],
      ],
      h2Exit: 'Part 3. Onboarding & Offboarding Account Ownership Sign-Off',
      kolumnyExit: ['Platform / System', 'Required buyer-safe configuration', 'Status', 'Owner email / date'],
      wierszeExit: [
        ['Google Search Console & Bing Webmaster', 'Verified under Client company email; Agency added as User only'],
        ['Google Analytics 4 & Google Tag Manager', 'Client holds Administrator role; lead key events verified'],
        ['Google Business Profile (Maps)', 'Client = Primary Owner; Agency = Manager'],
        ['CMS / Hosting / Cloudflare & GDPR DPA', 'Named revocable agency seat with 2FA + signed Art. 28 GDPR DPA'],
      ],
      stopkaLinie: [
        'Published by AI SEO COMPANY (www.ai-seo-company.pl/en) · Free 24h second-opinion review of any SEO proposal: kontakt@ai-seo-company.pl · Tel. +48 518 815 055',
        'AI SIGNALS COMPANY Prosta Spółka Akcyjna, Registered office: ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa, Poland · Office: ul. Grzybowska 5A, 00-132 Warszawa · KRS 0001239983 (District Court for the Capital City of Warsaw in Warsaw, 12th Commercial Division of the National Court Register) · NIP PL5253090237 · REGON 544761611 · Share capital: PLN 100,000.00.',
      ],
    },
  },
  {
    htmlNazwa: 'seo-vertrag-checkliste.html',
    pdfRel: 'public/pliki/de/seo-vertrag-checkliste.pdf',
    dane: {
      lang: 'de',
      url: 'www.ai-seo-company.pl/de/tools/seo-vertrag-checkliste',
      wersja: 'Prüfbogen & Bildungsmuster · Stand: 11.2026',
      h1: 'SEO Vertrag Checkliste: 12 Klauseln vor der Unterschrift',
      lead: 'Kaufmännischer Prüfbogen für SEO-Agenturverträge und AGB inklusive Musterrahmen zum Schutz Ihrer Google-Konten, Nutzungsrechte, Backlinks und Kündigungsfristen.',
      disclaimer: 'Kaufmännische Checkliste und unverbindliches Bildungsmuster für Auftraggeber - keine individuelle Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes (RDG). Lassen Sie Verträge mit größerem Volumen vorab anwaltlich prüfen.',
      pola: ['Auftraggeber & Domain', 'Geprüfte SEO-Agentur', 'Monatsbudget netto', 'Geprüft von & Datum'],
      h2Tabela: 'Teil 1. Prüftabelle: 12 Klauseln in SEO-Vertrag und AGB kontrollieren',
      kolumny: ['Klausel', 'Regelungsbereich', 'Auftraggeberfreundlicher Standard', 'Warnsignal im Entwurf', 'Prüfung'],
      wiersze: KLAUZULE_VERTRAG_DE,
      statusTekst: '[ ] OK<br>[ ] Ändern',
      h2Wzor: 'Teil 2. Eckpunkte für faire B2B-Vereinbarungen (Orientierungsrahmen)',
      blokiWzoru: [
        ['§ 1-§ 2. Bezifferte Leistungen & Monatsvertrag', 'Feste monatliche Stückzahlen im Leistungsanhang (Technik, Fachinhalte, redaktionelle Links, Unternehmensprofil). Kündigung in Textform (E-Mail) mit 1 Monat Frist zum Monatsende ohne automatische 12-Monats-Verlängerung und ohne Ausstiegsgebühren.'],
        ['§ 3. Volle Inhaberschaft aller Google- & Bing-Konten', 'Auftraggeber bleibt alleiniger Hauptinhaber von Google Search Console, GA4, Tag Manager, Google Unternehmensprofil, Bing Webmaster Tools und Werbekonten. Die Agentur arbeitet ausschließlich über widerrufbare Nutzer-/Manager-Rechte.'],
        ['§ 4. Unbeschränkte Nutzungsrechte an Texten & Code', 'Mit Zahlung der Monatsrechnung gehen zeitlich, räumlich und inhaltlich unbeschränkte Nutzungs- und Bearbeitungsrechte an sämtlichen Texten, Grafiken, Meta-Daten und Code-Änderungen dauerhaft auf den Auftraggeber über.'],
        ['§ 5. Dauerhafte Backlinks statt Linkmiete', 'Keine Teilnahme an Linktausch- oder Miet-Netzwerken entgegen den Google-Spam-Richtlinien. Während bezahlter Leistungsmonate aufgebaute Verlinkungen werden nach Vertragsende nicht durch den Auftragnehmer entfernt; volle Ziel-URLs stehen im Monatsbericht.'],
        ['§ 6-§ 8. Freigabe, Festpreis & GSC-/GA4-Reporting', 'Änderungsprotokoll (Changelog) sowie Text- und Template-Freigabe in Textform vor Livegang. Feste Netto-Vergütung ohne versteckte Setup-Kosten. Monatliches Reporting direkt aus Search Console und GA4 des Auftraggebers.'],
        ['§ 9-§ 12. Dienstvertrag, Vertraulichkeit & Art. 28 DSGVO', 'Dienstvertragliche Sorgfaltspflicht ohne unseriöse Platz-1-Garantien. Gegenseitige Geheimhaltung von Geschäfts- und Analysedaten. Keine Vertragsstrafen bei ordentlicher Kündigung. AV-Vertrag nach Art. 28 DSGVO bei CMS-/Shop-Zugriff inkl. Rechte-Entzug binnen 7 Werktagen.'],
      ],
      h2Exit: 'Teil 3. Übergabe- & Konten-Protokoll zu Beginn und Ende der Zusammenarbeit',
      kolumnyExit: ['System / Konto', 'Sicherer Zielzustand für Ihr Unternehmen', 'Geprüft', 'Inhaber-Konto / Datum'],
      wierszeExit: [
        ['Google Search Console & Bing Webmaster', 'Auf Firmen-E-Mail verifiziert; Agentur nur als Nutzer eingetragen'],
        ['Google Analytics 4 & Google Tag Manager', 'Administrator-Rolle beim Kunden; Schlüsselereignisse aktiv'],
        ['Google Unternehmensprofil (Maps)', 'Auftraggeber = Hauptinhaber; Agentur = Manager'],
        ['CMS / Shop / Hosting & AVV (Art. 28 DSGVO)', 'Eigener Agentur-Account mit 2FA + abgeschlossener AV-Vertrag'],
      ],
      stopkaLinie: [
        'Herausgeber: AI SEO COMPANY (www.ai-seo-company.pl/de) · Kostenlose Zweitmeinung zu vorliegenden SEO-Angeboten innerhalb von 24 Werktagsstunden: kontakt@ai-seo-company.pl · Tel. +48 518 815 055',
        'AI SIGNALS COMPANY Prosta Spółka Akcyjna, Sitz: ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau, Polen · Büro: ul. Grzybowska 5A, 00-132 Warschau · KRS 0001239983 (Sąd Rejonowy dla m.st. Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru Sądowego) · USt-IdNr. PL5253090237 · REGON 544761611 · Aktienkapital: 100.000,00 PLN.',
      ],
    },
  },
];

fs.mkdirSync(path.join(ROOT, 'scripts/szablony/pdf'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'public/pliki/de'), { recursive: true });

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

for (const dok of DOKUMENTY) {
  const htmlPath = path.join(ROOT, 'scripts/szablony/pdf', dok.htmlNazwa);
  const pdfPath = path.join(ROOT, dok.pdfRel);
  fs.writeFileSync(htmlPath, zbudujHtml(dok.dane), 'utf8');
  execFileSync('python3', ['-c', PY_RENDER, htmlPath, pdfPath, dok.dane.h1], { stdio: 'inherit' });
  const rozmiar = fs.statSync(pdfPath).size;
  console.log(`Wygenerowano ${dok.pdfRel} (${(rozmiar / 1024).toFixed(1)} KB)`);
}
