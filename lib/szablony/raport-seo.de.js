// Szablon „SEO Report Vorlage” (Faza 3 DE, 22.11.2026): niemiecki moduł dla /narzedzia/raport-seo
// (DE /de/tools/seo-report-vorlage / /de/tools/seo-bericht-vorlage). PDF: public/pliki/de/seo-report-vorlage.pdf.

const ZRODLA = [
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search-Console-Hilfe: Leistungsbericht (Klicks, Impressionen, CTR und durchschnittliche Position richtig lesen)', data: '2026-11-12' },
  { url: 'https://support.google.com/analytics/answer/9267735', nazwa: 'Google-Analytics-4-Hilfe: Schlüsselereignisse (Key Events) und organische Akquisition auswerten', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP, INP, CLS im Bericht der Search Console)', data: '2026-11-12' },
];

export const SEKCJE_RAPORT_DE = [
  {
    nr: '1',
    nazwa: 'Management-Zusammenfassung (5 Zeilen)',
    cel: 'Was hat sich geschäftlich bewegt, was wurde geliefert und welche Entscheidung steht an?',
    zrodlo: 'GA4, CRM & Aufgabenprotokoll',
  },
  {
    nr: '2',
    nazwa: 'Anfragen, Abschlüsse und Umsatz aus organischer Suche',
    cel: 'Qualifizierte Leads, Telefonklicks oder Bestellungen aus Google und KI-Antwortsystemen im Monats- und Vorjahresvergleich.',
    zrodlo: 'GA4 (Organic Search) & CRM',
  },
  {
    nr: '3',
    nazwa: 'Sichtbarkeit ohne Markenbegriffe (Non-Brand SEO)',
    cel: 'Klicks und Impressionen für Leistungs- und Problem-Keywords getrennt vom reinen Markennamen.',
    zrodlo: 'Google Search Console',
  },
  {
    nr: '4',
    nazwa: 'KI-Sichtbarkeit (ChatGPT, Gemini, Perplexity, AI Overviews)',
    cel: 'Bei wie vielen echten Kauf-Fragen wird das Unternehmen genannt und welche Drittquellen zitieren die Modelle?',
    zrodlo: 'KI-Sichtbarkeits-Check & Verweisverkehr',
  },
  {
    nr: '5',
    nazwa: 'Technischer Zustand & Core Web Vitals',
    cel: 'Indexierte Seiten, 404-/5xx-Fehler sowie mobile Werte für LCP, INP und CLS.',
    zrodlo: 'Search Console & SEO Audit',
  },
  {
    nr: '6',
    nazwa: 'Umgesetzte Arbeiten & Plan für den Folgemonat',
    cel: 'Konkrete URLs, veröffentlichte Texte, gewonnene Verweise und die 3 bis 5 wichtigsten Aufgaben des nächsten Monats.',
    zrodlo: 'Kundenportal / Projektboard',
  },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_RAPORT_DE = {
  slug: 'raport-seo',
  plik: 'raport-seo',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/seo-report-vorlage.pdf',
  seo: {
    tytul: 'SEO Report Vorlage kostenlos: Monatsbericht als PDF',
    opis: 'Kostenlose SEO Report Vorlage als PDF: Monatsbericht mit Anfragen, Search Console, Technik, KI-Sichtbarkeit und Maßnahmen für B2B-Teams.',
  },
  de: {
    okruszek: 'SEO Report Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'SEO Report Vorlage: Monatsbericht auf Zahlenbasis statt Chart-Friedhof',
    lead: 'Ein brauchbarer SEO-Monatsbericht umfasst zwei bis vier Seiten und beantwortet zuerst die Frage der Geschäftsführung: Wie viele qualifizierte Anfragen und Aufträge kamen über Google und KI-Systeme, was wurde konkret umgesetzt und was folgt im nächsten Monat? Diese kostenlose SEO Report Vorlage gibt Ihnen eine klare 6-Blöcke-Struktur als druckfertiges A4-PDF.',
    karta: {
      nazwa: 'SEO Report Vorlage (PDF)',
      opis: '6 Berichtsblöcke auf A4: Management-Summary, Leads & Umsatz, Brand vs. Non-Brand GSC, KI-Sichtbarkeit, Technik und Maßnahmenprotokoll.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'warum-klassische-berichte-scheitern',
        h2: 'Warum viele SEO-Berichte ungelesen im Postfach bleiben',
        html: [
          '<p>Viele monatliche Agenturberichte bestehen aus zwanzig automatisch exportierten Kurven: Sichtbarkeitsindizes ohne Bezug zum Angebot, Hunderte Einzelpositionen und Impressionen auf den eigenen Firmennamen. Für Geschäftsführerinnen und Marketingleiter fehlt dabei genau die Verbindung zum Geschäftsergebnis.</p>',
          '<p>Unsere Vorlage dreht die Reihenfolge um: Zuerst stehen <strong>organische Anfragen und Bestellungen</strong>, danach die <strong>Suchnachfrage außerhalb der eigenen Marke (Non-Brand)</strong>, anschließend die <strong>Präsenz in KI-Antworten</strong> sowie die <strong>konkret ausgelieferten Arbeiten</strong> mit Links zu jeder geänderten URL.</p>',
        ].join(''),
      },
      {
        id: 'aufbau-in-6-bloecken',
        h2: 'Aufbau der SEO Report Vorlage: 6 feste Berichtsblöcke',
        html: '<p>Jeder Monatsbericht folgt exakt denselben sechs Abschnitten, damit Veränderungen von Monat zu Monat ohne Erklärungsaufwand vergleichbar bleiben.</p>',
        tabela: {
          id: 'tabelle-seo-report-bloecke',
          caption: 'Die 6 Abschnitte eines entscheidungsreifen SEO-Monatsberichts',
          columns: [
            { key: 'block', label: 'Abschnitt' },
            { key: 'frage', label: 'Kernfrage im Bericht' },
            { key: 'quelle', label: 'Primärquelle' },
          ],
          rows: SEKCJE_RAPORT_DE.map((b) => ({
            block: `${b.nr}. ${b.nazwa}`,
            frage: b.cel,
            quelle: b.zrodlo,
          })),
        },
      },
      {
        id: 'kennzahlen-richtig-trennen',
        h2: 'Drei Trennungen, die jeden SEO-Bericht sofort ehrlicher machen',
        html: [
          '<ul>',
          '<li><strong>Markensuche vs. Leistungs-Keywords:</strong> Wenn Sie Messeauftritte oder LinkedIn-Kampagnen fahren, steigen Suchen nach Ihrem Firmennamen automatisch. Trennen Sie in der Search Console immer Markenbegriffe von generischen Suchanfragen (z. B. per Regex-Filter auf den Firmennamen).</li>',
          '<li><strong>Vormonat (MoM) und Vorjahresmonat (YoY):</strong> Im B2B-Geschäft bremsen Sommerferien und der späte Dezember fast jede Branche. Ein Vergleich nur zum Vormonat täuscht sonst künstliche Einbrüche oder Sprünge vor.</li>',
          '<li><strong>Google-Klicks und KI-Empfehlungen gemeinsam betrachten:</strong> Immer mehr Entscheider lesen eine Vorauswahl direkt in <a href="/de/ki-suchoptimierung">ChatGPT, Perplexity oder Google AI Overviews</a> und suchen danach gezielt nach Ihrem Firmennamen. Prüfen Sie Ihre Nennungen deshalb monatlich mit dem Tool <a href="/de/ki-sichtbarkeit-pruefen">KI-Sichtbarkeit prüfen</a>.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'arbeitsnachweis-statt-floskeln',
        h2: 'Leistungsnachweis: konkrete URLs statt „laufende Optimierung“',
        html: [
          '<p>Ein seriöser Bericht enthält niemals pauschale Zeilen wie „Meta-Tags optimiert“ oder „Backlinks aufgebaut“. Im sechsten Abschnitt der Vorlage steht jede erledigte Aufgabe mit direktem Nachweis:</p>',
          '<ul>',
          '<li><strong>Technik:</strong> behobener Befund, betroffene URL-Gruppe und neuer Wert im <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>.</li>',
          '<li><strong>Inhalte:</strong> veröffentlichte oder überarbeitete Ziel-URL, Haupt-Keyword und aktuelle Position in der Search Console.</li>',
          '<li><strong>Autorität & Erwähnungen:</strong> verlinkende oder zitierende Domain, Zielseite und Themenbezug (prüfbar im <a href="/de/tools/domain-authority-checker">Domain Authority Checker</a>).</li>',
          '</ul>',
          '<p>Genau nach diesem Muster berichten wir auch in unserer laufenden <a href="/de/seo-fuer-unternehmen">B2B-SEO-Betreuung</a> (Pakete ab <a href="/de/seo-kosten">450 € netto monatlich</a>).</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Monatsbericht auf 2 Seiten',
      opis: 'Auszug aus den Tabellen der druckfertigen PDF-Vorlage. Alle Felder lassen sich monatlich in rund 25 Minuten befüllen.',
      html: [
        '<h3>Block 1-2. Management-Summary & organische Konversionen</h3>',
        tabelaHtml(
          ['Kennzahl', 'Aktueller Monat', 'Vormonat (MoM)', 'Vorjahr (YoY)', 'Kommentar / Ursache'],
          [
            ['Qualifizierte Anfragen (Organic Search)', '…', '…', '…', '…'],
            ['Klicks ohne Markenname (GSC Non-Brand)', '…', '…', '…', '…'],
            ['KI-Sichtbarkeit (Antworten mit Nennung)', '__ / 15', '__ / 15', '-', 'ChatGPT, Gemini, Perplexity, AIO'],
          ],
        ),
        '<h3>Block 3 & 6. Wichtigste Zielseiten & umgesetzte Maßnahmen</h3>',
        tabelaHtml(
          ['Ziel-URL / Leistungsseite', 'Haupt-Keyword', 'Klicks (28 T.)', 'Ø Position', 'Durchgeführte Änderung & nächster Schritt'],
          [
            ['/…', '…', '…', '…', '…'],
            ['/…', '…', '…', '…', '…'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'SEO Report Vorlage herunterladen (PDF)',
      opis: 'Laden Sie den kompletten SEO-Monatsbericht als übersichtliches A4-PDF herunter: inklusive KPI-Tabellen, KI-Sichtbarkeits-Block und Maßnahmenprotokoll.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'SEO Report Vorlage senden',
      przedmiot: 'die SEO Report Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Spam): Der Link zur SEO Report Vorlage trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Wie oft sollte ein SEO-Bericht erstellt werden?',
        answer: 'Für die meisten Unternehmen ist ein monatlicher Rhythmus ideal, jeweils in den ersten fünf Werktagen des Folgemonats. Wöchentliche Ranking-Berichte erzeugen unnötige Hektik durch normale Schwankungen; nur nach einem Website-Relaunch oder Serverwechsel prüfen wir Indexierung und Fehler täglich.',
      },
      {
        question: 'Warum trennt die Vorlage Marken-Keywords von Leistungs-Keywords?',
        answer: 'Wer Ihren Firmennamen bereits kennt und bei Google eingibt, klickt fast immer auf Platz 1. Der eigentliche Neukundeneffekt von SEO zeigt sich jedoch bei Suchanfragen nach Leistungen, Preisen und Problemlösungen, bei denen Suchende Ihr Unternehmen vorher noch nicht kannten.',
      },
      {
        question: 'Welche Kennzahlen gehören für die Geschäftsführung auf Seite 1?',
        answer: 'Auf Seite 1 gehören qualifizierte Anfragen oder Bestellungen aus der organischen Suche, der geschätzte oder gemessene Auftragswert, der Non-Brand-Klicktrend, die Nennungsquote in KI-Systemen sowie die drei wichtigsten erledigten und geplanten Maßnahmen.',
      },
      {
        question: 'Kann ich die Tabellenstruktur auch in Looker Studio oder Google Sheets nutzen?',
        answer: 'Ja. Die sechs Blöcke und Spaltenüberschriften des PDFs sind bewusst so gewählt, dass Sie sie eins zu eins als Vorlage in Google Sheets, Excel oder einem zweiseitigen Looker-Studio-Bericht nachbauen können.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'liefert die technische Punktzahl und Fehlerliste für Block 5 des Berichts' },
      { href: '/sprawdz-widocznosc-w-ai', tekst: 'KI-Sichtbarkeit prüfen', opis: 'misst live, wie oft KI-Modelle Ihr Unternehmen empfehlen' },
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'SEO Strategie Vorlage', opis: 'definiert die Quartalsziele, an denen der Monatsbericht gemessen wird' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'B2B SEO', opis: 'laufende Umsetzung mit transparentem Monatsreporting' },
    ],
    plikNazwa: 'SEO Report Vorlage: Monatsbericht in 6 Blöcken (PDF)',
  },
};

export default SZABLON_RAPORT_DE;
