// Szablon „SEO Strategie Vorlage” (Faza 3 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/szablon-strategii-seo.js. PDF: public/pliki/de/seo-strategie-vorlage.pdf.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO-Einsteigerleitfaden (Grundlagen für Seitenstruktur, Inhalte und Indexierung)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche Inhalte mit echtem Erfahrungswert planen', data: '2026-11-12' },
  { url: 'https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/', nazwa: 'Ahrefs-Studie (Mai 2025): Zeitrahmen bis zu Top-10-Platzierungen bei neuen und bestehenden Seiten', data: '2026-11-12' },
];

export const KROKI_STRATEGIA_DE = [
  {
    etap: '1. Ausgangslage & Geschäftsziele',
    opis: 'Aktuelle organische Anfragen, Umsatzbeitrag, wichtigste Margen-Leistungen und messbares 6- sowie 12-Monats-Ziel festlegen.',
  },
  {
    etap: '2. Technische Basis & Indexierung',
    opis: 'Indexierungsbremsen, langsame Ladezeiten, Weiterleitungsketten, strukturierte Daten und KI-Bot-Regeln in den ersten 30 Tagen bereinigen.',
  },
  {
    etap: '3. Seitenarchitektur (BOFU zuerst)',
    opis: 'Zuerst kaufnahe Leistungs-, Branchen-, Kosten- und Vergleichsseiten aufbauen, bevor breite Ratgeberthemen folgen.',
  },
  {
    etap: '4. 90-Tage-Inhalts- & GEO-Plan',
    opis: 'Konkrete Themen, interne Verlinkung, Belege aus echten Projekten (E-E-A-T) und Antworten für KI-Suchsysteme terminieren.',
  },
  {
    etap: '5. Autorität & digitale Reputation',
    opis: 'Fachverzeichnisse, Partnerlinks, Branchenmedien und konsistente Unternehmensdaten für Google und Sprachmodelle aufbauen.',
  },
  {
    etap: '6. Ressourcen, Budget & Erfolgsmessung',
    opis: 'Verantwortlichkeiten (Entwicklung, Fachinput, Text), Monatsbudget und 4 feste KPIs für den monatlichen Soll-Ist-Abgleich.',
  },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_STRATEGIA_DE = {
  seo: {
    tytul: 'SEO Strategie Vorlage kostenlos: Plan in 6 Schritten',
    opis: 'Kostenlose SEO Strategie Vorlage als PDF: Ziele, Seitenarchitektur, 90-Tage-Roadmap, Ressourcen, Budget und KPIs auf einem klaren Arbeitsblatt.',
  },
  de: {
    okruszek: 'SEO Strategie Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'SEO Strategie Vorlage: Ihr 12-Monats-Plan auf 6 Arbeitsblättern',
    lead: ' „Mehr Blogartikel veröffentlichen“ ist keine SEO-Strategie. Eine tragfähige Strategie verbindet Ihre umsatzstärksten Leistungen mit einer sauberen Seitenarchitektur, klaren technischen Prioritäten, KI-Sichtbarkeit und festen Verantwortlichkeiten. Diese kostenlose SEO Strategie Vorlage bringt Ihren Plan in 6 Schritten auf den Punkt.',
    karta: {
      nazwa: 'SEO Strategie Vorlage (PDF)',
      opis: '6 Strategie-Blätter auf A4: Ist-Stand & Ziele, Technik-Sprint, BOFU-Seitenbaum, 90-Tage-Roadmap, Autorität und KPI-Steuerung.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'was-eine-seo-strategie-ausmacht',
        h2: 'Warum Reihenfolge im SEO wichtiger ist als bloßes Tempo',
        html: [
          '<p>In vielen Unternehmen scheitert Suchmaschinenoptimierung nicht am fehlenden Fleiß, sondern an der falschen Reihenfolge: Es werden monatelang allgemeine Lexikontexte geschrieben, während die wichtigsten Leistungsseiten dünn bleiben, interne Links fehlen oder die mobile Startseite vier Sekunden zum Laden braucht.</p>',
          '<p>Eine wirksame Strategie entscheidet deshalb zuerst, <strong>was Sie bewusst weglassen</strong> und <strong>welche 10 bis 20 Zielseiten</strong> direkt auf Anfragen und Aufträge einzahlen. Genau diese Priorisierung erzwingt das Arbeitsblatt.</p>',
        ].join(''),
      },
      {
        id: 'sechs-bausteine',
        h2: 'Die 6 Bausteine der SEO Strategie Vorlage',
        html: '<p>Arbeiten Sie die sechs Abschnitte der Reihe nach durch. Das ausgefüllte Dokument dient zugleich als Freigabevorlage für die Geschäftsführung und als Fahrplan für Agentur oder Inhouse-Team.</p>',
        tabela: {
          id: 'tabelle-seo-strategie-bausteine',
          caption: '6 Schritte vom Geschäftsziel zur 90-Tage-Umsetzung',
          columns: [
            { key: 'baustein', label: 'Baustein' },
            { key: 'inhalt', label: 'Festlegung im Strategie-Dokument' },
          ],
          rows: KROKI_STRATEGIA_DE.map((k) => ({
            baustein: k.etap,
            inhalt: k.opis,
          })),
        },
      },
      {
        id: 'bofu-und-geo-verbinden',
        h2: 'BOFU-Seiten und KI-Sichtbarkeit (GEO) von Anfang an zusammendenken',
        html: [
          '<p>Seit Entscheider Anbieter direkt in <a href="/de/ki-suchoptimierung">ChatGPT, Gemini und Google AI Overviews</a> vergleichen, greifen klassisches B2B-SEO und Generative Engine Optimization eng ineinander:</p>',
          '<ul>',
          '<li><strong>Monat 1 (Fundament & Kaufnähe):</strong> Technische Fehler aus dem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a> beheben, strukturierte Unternehmensdaten ergänzen und alle zentralen Leistungs- sowie Preisseiten schärfen.</li>',
          '<li><strong>Monat 2 (Vergleiche & Entscheidungsfragen):</strong> Seiten vom Typ „Leistung A vs. B“, „Kosten & Faktoren“ sowie Branchenlösungen veröffentlichen - genau diese Formate zitieren KI-Modelle besonders häufig.</li>',
          '<li><strong>Monat 3 (Autorität & Ausbau):</strong> Fallstudien mit überprüfbaren Zahlen, Einträge in relevanten B2B-Verzeichnissen und Fachbeiträge auf externen Branchenseiten ergänzen.</li>',
          '</ul>',
          '<p>Welches Budget zu welchem Tempo passt, können Sie vorab im <a href="/de/tools/seo-roi-rechner">SEO ROI Rechner</a> gegenrechnen und mit unseren transparenten Paketen unter <a href="/de/seo-kosten">SEO Kosten</a> abgleichen.</p>',
        ].join(''),
      },
      {
        id: 'ressourcen-realistisch-planen',
        h2: 'Ressourcen-Check: Wer setzt Technik, Fachwissen und Texte um?',
        html: [
          '<p>Jede Strategie ist nur so realistisch wie die eingeplanten Wochenstunden. Halten Sie in Teil 6 der Vorlage verbindlich fest, wer drei Rollen übernimmt:</p>',
          '<ol>',
          '<li><strong>Technische Umsetzung:</strong> Wer passt Templates, Ladezeiten, Weiterleitungen und Schema-Markup im CMS oder Code an?</li>',
          '<li><strong>Fachlicher Input (30-45 Min./Monat):</strong> Wer aus Vertrieb, Technik oder Geschäftsführung liefert echte Kundenfragen, Projektzahlen und Freigaben?</li>',
          '<li><strong>Redaktion & Verbreitung:</strong> Wer erstellt die Seiteninhalte nach der <a href="/de/tools/keyword-recherche-vorlage">Keyword-Map</a> und pflegt Drittprofile?</li>',
          '</ol>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Zielblatt und 90-Tage-Roadmap',
      opis: 'Ausschnitt aus dem PDF-Dokument mit Ausgangszahlen, Quartalszielen und Aufgabenverteilung.',
      html: [
        '<h3>Teil 1. Ausgangslage & Ziele (6 und 12 Monate)</h3>',
        tabelaHtml(
          ['Kennzahl', 'Ist-Wert heute', 'Ziel nach 6 Monaten', 'Ziel nach 12 Monaten', 'Haupthebel'],
          [
            ['Organische Anfragen / Monat', '…', '…', '…', 'Leistungs- & Kostenseiten'],
            ['Non-Brand-Klicks (Search Console)', '…', '…', '…', 'Neue Themen-Cluster'],
            ['KI-Sichtbarkeit (Antworten mit Nennung)', '…', '…', '…', 'Vergleichsseiten & B2B-Profile'],
          ],
        ),
        '<h3>Teil 4 & 6. 90-Tage-Roadmap & Verantwortlichkeiten</h3>',
        tabelaHtml(
          ['Zeitraum', 'Schwerpunkt & konkrete Ergebnisse (URLs)', 'Verantwortlich', 'Erfolgskontrolle'],
          [
            ['Tag 1-30', 'Technik-Bereinigung, Core Web Vitals, Top-3-Leistungsseiten', '…', 'SEO Audit >= 85/100'],
            ['Tag 31-60', 'Kostenseite, 2 Vergleichsseiten, interne Verlinkung', '…', 'Indexierung & erste Impressionen'],
            ['Tag 61-90', 'Fallstudie, 5 Branchenverzeichnisse, Fachbeitrag', '…', 'GSC-Klicks & KI-Check'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'SEO Strategie Vorlage herunterladen (PDF)',
      opis: 'Laden Sie das komplette 6-Schritte-Arbeitsblatt als druckfertiges A4-PDF herunter - ideal für Ihre Quartals- und Jahresplanung.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Strategie-Vorlage als PDF senden',
      przedmiot: 'die SEO Strategie Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Spam): Der Link zur SEO Strategie Vorlage kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Wie lange im Voraus sollte eine SEO-Strategie geplant werden?',
        answer: 'Bewährt hat sich ein Zielszenario über 12 Monate kombiniert mit einem detaillierten Umsetzungsplan für jeweils 90 Tage. Zwölf Monate geben die Richtung für Seitenarchitektur und Budget vor, während Sie alle 90 Tage anhand echter Search-Console-Daten nachsteuern.',
      },
      {
        question: 'Wann zeigen sich bei einer neuen Strategie erste Ergebnisse?',
        answer: 'Technische Korrekturen und das Schärfen bereits indexierter Leistungsseiten wirken sich oft innerhalb von 4 bis 8 Wochen auf Impressionen und Klicks aus. Komplett neue Themenfelder und umkämpfte B2B-Keywords benötigen in der Regel 4 bis 9 Monate kontinuierlicher Arbeit.',
      },
      {
        question: 'Eignet sich die Vorlage auch für kleine B2B-Teams ohne eigene SEO-Abteilung?',
        answer: 'Gerade dafür wurde sie gebaut. Statt theoretischer Modelle beschränkt sich die Vorlage auf sechs übersichtliche Tabellen, mit denen Sie intern oder gemeinsam mit einer Agentur klare Prioritäten vereinbaren.',
      },
      {
        question: 'Was ist der Unterschied zwischen der SEO-Strategie und dem Redaktionsplan?',
        answer: 'Die SEO-Strategie legt fest, welche Geschäftsfelder Vorrang haben, welche technischen Hürden beseitigt werden, wie die Seitenstruktur aussieht und wie der Erfolg gemessen wird. Der Redaktionsplan übersetzt anschließend Baustein 4 in konkrete Wochenthemen und Veröffentlichungstermine.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/kalkulator-strat-seo', tekst: 'SEO ROI Rechner', opis: 'berechnet entgangenes Nachfragepotenzial und die Amortisation Ihres SEO-Budgets' },
      { href: '/narzedzia/content-plan', tekst: 'Redaktionsplan Vorlage', opis: 'bricht Ihre Strategie auf konkrete Themen für 12 Wochen herunter' },
      { href: '/narzedzia/raport-seo', tekst: 'SEO Report Vorlage', opis: 'misst monatlich den Fortschritt Ihrer festgelegten Strategie-KPIs' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Pakete', opis: 'unsere monatlichen Leistungspakete in Euro im transparenten Vergleich' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'B2B SEO', opis: 'Strategie, Technik, Inhalte und Autoritätsaufbau aus einer Hand' },
    ],
    plikNazwa: 'SEO Strategie Vorlage: 12-Monats-Plan in 6 Schritten (PDF)',
  },
};

export default SZABLON_STRATEGIA_DE;
