// Szablon „Wettbewerbsanalyse SEO Vorlage” (Faza 3 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/szablon-analizy-konkurencji-seo.js. PDF: public/pliki/de/wettbewerbsanalyse-vorlage.pdf.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche Inhalte erstellen (eigener Mehrwert gegenüber bestehenden Suchergebnissen)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals als Teil der Seitenqualität im Vergleich', data: '2026-11-12' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search-Console-Hilfe: Eigene Suchanfragen und Seiten als Ausgangspunkt der Lückenanalyse', data: '2026-11-12' },
];

export const OBSZARY_KONKURENCJA_DE = [
  {
    nr: '1',
    obszar: 'SERP-Wettbewerber bestimmen',
    pytanie: 'Welche 3 bis 5 Domains belegen in Google und KI-Antworten tatsächlich die Top-Plätze für Ihre Kauf-Keywords?',
  },
  {
    nr: '2',
    obszar: 'Seitenarchitektur & Angebotstiefe',
    pytanie: 'Haben Wettbewerber eigene Unterseiten je Leistung, Branche, Region, Preisfrage und Vergleich?',
  },
  {
    nr: '3',
    obszar: 'Content-Gap & Beweisdichte (E-E-A-T)',
    pytanie: 'Welche Themen, Fallstudien, Preisrahmen, Rechner oder Tabellen fehlen auf Ihrer Website noch?',
  },
  {
    nr: '4',
    obszar: 'Technik, Ladezeit & KI-Zugang',
    pytanie: 'Wie schnell laden die Seiten mobil (LCP/INP), liefern sie SSR-HTML und erlauben sie KI-Suchbots?',
  },
  {
    nr: '5',
    obszar: 'Domain-Autorität & Drittquellen',
    pytanie: 'Welche Fachmedien, Verbände und B2B-Verzeichnisse verlinken oder nennen die Konkurrenz, aber nicht Sie?',
  },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_KONKURENCJA_DE = {
  seo: {
    tytul: 'SEO Wettbewerbsanalyse Vorlage kostenlos: PDF Download',
    opis: 'Kostenlose SEO Wettbewerbsanalyse Vorlage als PDF: Echte SERP-Wettbewerber, Themenlücken, Technik, Autorität und KI-Zitate strukturiert prüfen.',
  },
  de: {
    okruszek: 'Wettbewerbsanalyse Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'SEO Wettbewerbsanalyse Vorlage: 5 Prüffelder für Ihren Vorsprung',
    lead: 'Ihre stärksten Konkurrenten im Vertrieb sind selten dieselben Unternehmen, die Ihnen bei Google und in ChatGPT die Anfragen wegnehmen. Diese kostenlose SEO Wettbewerbsanalyse Vorlage führt Sie in 5 Arbeitsblättern durch Seitenstruktur, Themenlücken, Ladezeiten, Domain-Autorität und KI-Zitierungen Ihrer echten Such-Wettbewerber.',
    karta: {
      nazwa: 'SEO Wettbewerbsanalyse Vorlage (PDF)',
      opis: '5 Vergleichsmatrizen auf A4: SERP-Gegner, Seitenstruktur, Content-Gap, Technik/CWV sowie Autorität & KI-Quellen.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'marktkonkurrent-vs-serp-konkurrent',
        h2: 'Geschäftskonkurrent vs. SERP-Wettbewerber: der häufigste Denkfehler',
        html: [
          '<p>Wenn Unternehmen ihre Mitbewerber nennen, fallen meist die drei bekanntesten Markennamen der Branche. Prüft man anschließend die tatsächlichen Top-5-Treffer bei Google und die Empfehlungen in ChatGPT für kaufnahe Suchbegriffe, stehen dort oft spezialisierte Nischenanbieter, Vergleichsportale oder jüngere Wettbewerber mit sauberer Seitenarchitektur.</p>',
          '<p>Beginnen Sie die Vorlage deshalb immer mit <strong>5 bis 10 konkreten Leistungs- und Kosten-Keywords</strong> im Inkognito-Fenster oder in unserem Tool <a href="/de/ki-sichtbarkeit-pruefen">KI-Sichtbarkeit prüfen</a>. Nur Domains, die dort wiederholt vor Ihnen erscheinen, gehören in die Vergleichstabelle.</p>',
        ].join(''),
      },
      {
        id: 'fuenf-prueffelder',
        h2: 'Die 5 Arbeitsblätter der SEO Wettbewerbsanalyse Vorlage',
        html: '<p>Statt Dutzende Rohmetriken abzuschreiben, bewertet jedes Arbeitsblatt nur Faktoren, aus denen Sie direkt eine eigene Maßnahme ableiten können.</p>',
        tabela: {
          id: 'tabelle-konkurrenz-felder',
          caption: 'Aufbau der SEO Wettbewerbsanalyse in 5 Schritten',
          columns: [
            { key: 'feld', label: 'Arbeitsblatt' },
            { key: 'leitfrage', label: 'Was Sie konkret vergleichen' },
          ],
          rows: OBSZARY_KONKURENCJA_DE.map((o) => ({
            feld: `${o.nr}. ${o.obszar}`,
            leitfrage: o.pytanie,
          })),
        },
      },
      {
        id: 'kostenlose-datenquellen',
        h2: 'So füllen Sie die Vergleichsmatrix ohne teure Tool-Abos aus',
        html: [
          '<p>Einen Großteil der benötigten Vergleichsdaten erheben Sie direkt mit öffentlichen Quellen und unseren kostenlosen Diagnose-Tools:</p>',
          '<ul>',
          '<li><strong>Seitenumfang & Struktur:</strong> Rufen Sie die <code>/sitemap.xml</code> des Wettbewerbers auf. Dort erkennen Sie sofort, wie viele Leistungs-, Branchen- und Ratgeberseiten existieren.</li>',
          '<li><strong>Technik & Core Web Vitals:</strong> Prüfen Sie Ihre Domain und zwei Konkurrenten im <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>, um Fehlerzahl, H1/Title-Aufbau und mobile Ladezeit gegenüberzustellen.</li>',
          '<li><strong>Linkstärke:</strong> Vergleichen Sie bis zu 4 Domains gleichzeitig im <a href="/de/tools/domain-authority-checker">Domain Authority Checker</a> auf Basis des offenen Common-Crawl-Webgraphen.</li>',
          '<li><strong>KI-Zitierungen (Citation Gap):</strong> Notieren Sie Verzeichnisse, Fachportale und Testseiten, die von KI-Modellen als Quelle für Ihre Konkurrenten herangezogen werden.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'vom-befund-zur-prioritaet',
        h2: 'Vom Vergleich zum Aktionsplan: Kopieren verboten, Lücken schließen',
        html: [
          '<p>Ziel einer Konkurrenzanalyse ist niemals, die Website des Marktführers nachzubauen - inklusive seiner technischen Altlasten. Suchen Sie gezielt nach <strong>asymmetrischen Chancen</strong>:</p>',
          '<ul>',
          '<li>Hat kein Wettbewerber eine transparente Seite zu <strong>Preisen und Kostenfaktoren</strong>, gewinnt eine ehrliche Kostenseite oft binnen weniger Wochen qualifizierte Anfragen.</li>',
          '<li>Ranken auf Platz 2 bis 5 langsame Baukasten-Seiten ohne Fallbeispiele, schlagen Sie diese über konkrete Projektdaten, Vergleichstabellen und schnelle Ladezeiten.</li>',
          '</ul>',
          '<p>Übertragen Sie die gefundenen Seitenlücken direkt in die <a href="/de/tools/keyword-recherche-vorlage">Keyword Recherche Vorlage</a> und planen Sie die Umsetzung in der <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan Vorlage</a>. Eine vollständige Wettbewerbs- und Lückenanalyse liefern wir außerdem in unserem <a href="/de/seo-audit">SEO Audit</a>.</p>',
        ].join(''),
      },
      {
        id: 'bewertungsskala-0-bis-2',
        h2: 'Bewertungsskala 0 bis 2 Punkte: objektiver Vergleich für 5 Wettbewerber',
        html: [
          '<p>Damit die Auswertung im Team nicht an Bauchgefühl scheitert, nutzt die Vorlage für Ihr Unternehmen und bis zu <strong>5 SERP-Wettbewerber (K1 bis K5)</strong> eine dreistufige Punkteskala: <strong>0 Punkte</strong> = fehlt oder gravierender Rückstand, <strong>1 Punkt</strong> = Branchendurchschnitt, <strong>2 Punkte</strong> = klarer Vorsprung in den Suchergebnissen.</p>',
          '<ul>',
          '<li><strong>Drei organische Top-10-Gegner (K1-K3):</strong> Domains, die bei Ihren zehn wichtigsten Kauf-Keywords am häufigsten auf Seite 1 stehen.</li>',
          '<li><strong>Ein lokaler Maps-Spitzenreiter (K4):</strong> Das Unternehmen mit der stärksten Präsenz im lokalen 3er-Paket von Google Maps.</li>',
          '<li><strong>Ein KI-Empfehlungs-Gewinner (K5):</strong> Der Anbieter, den ChatGPT, Gemini oder Perplexity bei echten Kundenfragen am häufigsten nennen.</li>',
          '</ul>',
          '<p>Jedes Feld, in dem Sie 0 Punkte und ein Konkurrent 2 Punkte erreicht, wandert automatisch mit Verantwortlichem und Frist in den Maßnahmenplan am Ende des Dokuments.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Vergleichsmatrix für 5 Wettbewerber (K1-K5)',
      opis: 'So ist der direkte Kennzahlen- und Strukturvergleich im PDF aufgebaut (3 organische Konkurrenten, 1 Maps-Leader, 1 KI-Favorit).',
      html: [
        '<h3>Teil 1 & 4. Direktvergleich: Eigene Website vs. 5 SERP-Wettbewerber</h3>',
        tabelaHtml(
          ['Prüfkriterium', 'Eigene Domain', 'K1', 'K2', 'K3', 'K4 (Maps)', 'K5 (KI)'],
          [
            ['Anzahl Leistungs- & Branchenseiten (Sitemap)', '…', '…', '…', '…', '…', '…'],
            ['Eigene Kostenseite / Vergleichsseiten vorhanden?', 'Ja / Nein', '…', '…', '…', '…', '…'],
            ['SEO-Audit-Punktzahl & mobiles LCP', '__ / 100 · __ s', '…', '…', '…', '…', '…'],
            ['Domain-Autorität (Common Crawl) & KI-Nennungen', '…', '…', '…', '…', '…', '…'],
            ['Punkte (0-2 Skala)', '__', '__', '__', '__', '__', '__'],
          ],
        ),
        '<h3>Teil 3 & 5. Themen- und Quellenlücken (Action-Backlog)</h3>',
        tabelaHtml(
          ['Fehlendes Thema / zitierende Drittquelle', 'Bei welchem Konkurrenten?', 'Geschäftswert', 'Eigene Maßnahme & Ziel-URL'],
          [
            ['…', 'Wettbewerber A / B', 'hoch / mittel', '…'],
            ['…', '…', '…', '…'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'SEO Wettbewerbsanalyse Vorlage herunterladen (PDF)',
      opis: 'Erhalten Sie alle 5 Vergleichsblätter als druckfertiges A4-PDF, um Stärken, Schwächen und Themenlücken Ihrer Such-Konkurrenten strukturiert auszuwerten.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Wettbewerbsanalyse als PDF senden',
      przedmiot: 'die SEO Wettbewerbsanalyse Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Spam): Der Link zur SEO Wettbewerbsanalyse Vorlage kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Wie viele Konkurrenten sollte ich in die SEO-Analyse aufnehmen?',
        answer: 'Drei bis vier direkte SERP-Wettbewerber reichen vollkommen aus. Wer zehn Domains gleichzeitig vergleicht, verliert sich in Tabellenpflege, statt die drei wichtigsten fehlenden Leistungs- und Vergleichsseiten zu veröffentlichen.',
      },
      {
        question: 'Was mache ich, wenn große Portale wie WLW, Clutch oder Wikipedia vor mir stehen?',
        answer: 'Große Verzeichnisse schlagen Sie selten mit einer dünnen Startseite, aber Sie können doppelt profitieren: Optimieren Sie einerseits Ihr eigenes Unternehmensprofil auf genau diesem Portal (gut für KI-Zitierungen) und bauen Sie andererseits spezifische Leistungs- und Kostenseiten für Long-Tail-Anfragen.',
      },
      {
        question: 'Wie oft sollte man die Wettbewerbsanalyse wiederholen?',
        answer: 'Ein gründlicher Abgleich alle sechs Monate oder vor der Jahresplanung genügt. Zusätzlich lohnt sich ein kurzer Blick auf die Top 5, bevor Sie eine neue zentrale Leistungsseite konzipieren.',
      },
      {
        question: 'Kann ich fremde Domains rechtssicher mit Ihren kostenlosen Tools prüfen?',
        answer: 'Ja. Unser kostenloser SEO Audit und der Domain Authority Checker werten ausschließlich öffentlich abrufbare Webseiten, Sitemaps und Linkgraphen aus, genau wie ein normaler Webbrowser.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/autorytet-domeny', tekst: 'Domain Authority Checker', opis: 'vergleicht Ihre Domain-Stärke direkt mit bis zu 3 Konkurrenten' },
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'deckt technische Schwächen auf Ihrer Seite und bei Mitbewerbern auf' },
      { href: '/sprawdz-widocznosc-w-ai', tekst: 'KI-Sichtbarkeit prüfen', opis: 'zeigt, wen ChatGPT und Gemini statt Ihres Unternehmens nennen' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Keyword Recherche Vorlage', opis: 'überführt gefundene Themenlücken in eine saubere Seitenmap' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'umfassende Analyse Ihrer Website inklusive Wettbewerbsvergleich' },
    ],
    plikNazwa: 'SEO Wettbewerbsanalyse Vorlage: 5 Arbeitsblätter (PDF)',
  },
};

export default SZABLON_KONKURENCJA_DE;
