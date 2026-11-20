// Szablon „Keyword Recherche Vorlage” (Faza 2 DE, 19.11.2026): niemiecki blok `de` dla lib/szablony/dobor-slow-kluczowych.js
// (PL /narzedzia/dobor-slow-kluczowych, EN /en/tools/keyword-research-template, DE /de/tools/keyword-recherche-vorlage).
// Treść napisana od zera po niemiecku pod frazę „keyword recherche” (1 300/mies. DE).
// Fakty i struktura zgodne z wersją PL/EN: 6 kroków, klastrowanie po Google Top 10 (>= 4 wspólne adresy = nasza reguła robocza),
// ocena ICE, kontrola kanibalizacji w Search Console. PDF: public/pliki/de/keyword-recherche-vorlage.pdf.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO-Einsteigerleitfaden (Begriffe der Zielgruppe, einzigartige Titel, keine Keyword-Stapelung)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und auf Menschen ausgerichtete Inhalte erstellen', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien (Keyword-Stuffing, Brückenseiten)', data: '2026-11-11' },
  { url: 'https://support.google.com/google-ads/answer/7337243', nazwa: 'Google-Ads-Hilfe: Keyword-Planer verwenden (durchschnittliche monatliche Suchanfragen, Spannen ohne aktive Kampagne)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search-Console-Hilfe: Leistungsbericht (Suchanfragen, Seiten, Klicks, Impressionen, durchschnittliche Position)', data: '2026-11-11' },
];

export const KROKI_KEYWORD_DE = [
  { name: 'Ausgangsliste sammeln', text: 'Notieren Sie Leistungen, Kundenfragen aus Vertrieb und Support, Suchanfragen aus der Google Search Console sowie Autocomplete-Vorschläge von Google.' },
  { name: 'Suchintention im SERP prüfen', text: 'Öffnen Sie für wichtige Begriffe die Top 10 in Google: Stehen dort Leistungsseiten, Ratgeber, Vergleiche oder Tools? Die Suchergebnisse zeigen das erwartete Seitenformat.' },
  { name: 'Nach Google Top 10 clustern', text: 'Fassen Sie Suchbegriffe zusammen, die mindestens 4 gemeinsame URLs in den Top 10 teilen (unsere Arbeitsregel). Ein Cluster = eine Ziel-URL.' },
  { name: 'Geschäftswert und ICE bewerten', text: 'Bewerten Sie jedes Cluster nach Nähe zum Auftrag, Suchnachfrage und Aufwand (Impact × Confidence × Ease) statt nur nach rohem Suchvolumen.' },
  { name: 'Ziel-URL zuordnen und Kannibalisierung prüfen', text: 'Prüfen Sie in der Search Console, ob bereits eine Unterseite für das Cluster rankt. Bestehende Seite ausbauen schlägt eine zweite, konkurrierende URL.' },
  { name: 'In Redaktionsplan und Seitenstruktur überführen', text: 'Übertragen Sie Leistungs-Cluster in Ihre Angebotsseiten und Informations-Cluster mit Zieldatum in den Redaktionsplan.' },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_KEYWORD_DE = {
  seo: {
    tytul: 'Keyword Recherche Vorlage kostenlos: PDF Download',
    opis: 'Kostenlose Keyword Recherche Vorlage als PDF: Suchintention bestimmen, Keywords nach Google Top 10 clustern, Ziel-URLs zuordnen und Kannibalisierung prüfen.',
  },
  de: {
    okruszek: 'Keyword Recherche Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Keyword Recherche Vorlage: von Suchbegriffen zur Seitenmap',
    lead: 'Eine Keyword-Recherche endet nicht mit einer langen Exportliste aus einem Tool, sondern mit einer klaren Zuordnung: ein Themen-Cluster mit derselben Suchintention gehört genau einer URL. Diese kostenlose Keyword Recherche Vorlage führt Sie in 6 Teilen von den ersten Suchbegriffen über den SERP-Abgleich und die ICE-Priorisierung bis zur fertigen Keyword-Map ohne Kannibalisierung.',
    karta: {
      nazwa: 'Keyword Recherche Vorlage (PDF)',
      opis: '6 Arbeitsblätter: Quellenliste, Suchintention, SERP-Cluster, ICE-Bewertung, Keyword-Map und Kannibalisierungs-Check.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'was-ist-keyword-recherche',
        h2: 'Was eine gute Keyword-Recherche für Unternehmen leistet',
        html: [
          '<p>Bei der <strong>Keyword-Recherche</strong> ermitteln Sie, mit welchen Worten potenzielle Kundinnen und Kunden nach Ihren Leistungen, Preisen, Vergleichen und Problemlösungen suchen, und übersetzen diese Nachfrage in die Seitenstruktur Ihrer Website. Google empfiehlt im SEO-Einsteigerleitfaden ausdrücklich, die Begriffe zu berücksichtigen, die Suchende tatsächlich eingeben, warnt aber ebenso klar vor dem bloßen Aneinanderreihen von Schlüsselwörtern (Keyword-Stuffing).</p>',
          '<p>Der häufigste Fehler in Unternehmen ist eine Tabelle mit Hunderten Einzelbegriffen ohne Seitenbezug. Am Ende entstehen drei ähnliche Blogbeiträge zum selben Thema, während für kaufnahe Suchanfragen („Kosten“, „Vergleich“, „B2B Anbieter“) eine eigene Unterseite fehlt. Die Vorlage verhindert genau das: Jede Zeile mündet in eine konkrete Entscheidung - <em>neue Seite erstellen</em>, <em>bestehende URL ausbauen</em> oder <em>bewusst verwerfen</em>.</p>',
        ].join(''),
      },
      {
        id: 'inhalt-der-vorlage',
        h2: 'Aufbau der Keyword Recherche Vorlage: 6 Teile',
        html: '<p>Die PDF-Vorlage ist so aufgebaut, dass Sie sie für eine komplette Website oder ein einzelnes Leistungsfeld in zwei bis drei Stunden durcharbeiten können.</p>',
        tabela: {
          id: 'tabelle-teile-kw',
          caption: 'Die 6 Arbeitsblätter der Keyword Recherche Vorlage',
          columns: [
            { key: 'teil', label: 'Teil' },
            { key: 'zweck', label: 'Welche Frage Sie klären' },
            { key: 'quelle', label: 'Datenquelle' },
          ],
          rows: [
            { teil: '1. Ausgangsbegriffe (Seeds)', zweck: 'Welche Leistungen, Probleme und Fachbegriffe beschreiben Ihr Angebot?', quelle: 'Vertriebsgespräche, E-Mails, Angebotsseiten, Wettbewerber' },
            { teil: '2. Kostenlose & bezahlte Quellen', zweck: 'Welche Varianten, Fragen und Long-Tail-Suchanfragen existieren?', quelle: 'Search Console, Google Ads Keyword-Planer, Google Autocomplete' },
            { teil: '3. Suchintention & SERP-Typ', zweck: 'Erwartet Google eine Leistungsseite, einen Ratgeber, einen Vergleich oder ein Tool?', quelle: 'Manuelle Prüfung der aktuellen Google Top 10' },
            { teil: '4. Clustering (1 Cluster = 1 URL)', zweck: 'Welche Suchbegriffe gehören auf dieselbe Unterseite?', quelle: 'Überschneidung der Top-10-Ergebnisse (Arbeitsregel: ab 4 gleichen URLs)' },
            { teil: '5. Priorisierung (Geschäftswert & ICE)', zweck: 'Welche Seiten bringen zuerst qualifizierte Anfragen?', quelle: 'Auftragsnähe, Nachfrage, Wettbewerb und interner Aufwand' },
            { teil: '6. Keyword-Map & Kannibalisierungs-Check', zweck: 'Welche URL bedient welches Cluster - und wo konkurrieren zwei eigene Seiten?', quelle: 'Search Console (Leistungsbericht → Suchanfragen → Seiten)' },
          ],
        },
      },
      {
        id: 'suchintention-und-clustering',
        h2: 'Suchintention und Clustering nach Google Top 10',
        html: [
          '<p>Zwei Suchanfragen gehören nicht deshalb zusammen, weil sie ähnlich klingen, sondern weil Google für beide dieselben Seiten anzeigt. Prüfen Sie vor dem Schreiben immer die ersten zehn organischen Treffer:</p>',
          '<ul>',
          '<li><strong>Transaktional / kommerziell lokal oder B2B:</strong> In den Top 10 stehen Leistungs- und Angebotsseiten. Hier gewinnt kein langer Lexikonartikel, sondern eine klare Leistungsseite mit Umfang, Ablauf, Referenzen und Preisrahmen.</li>',
          '<li><strong>Kommerziell vergleichend:</strong> Suchende tippen „Kosten“, „Preise“, „vs“, „Agentur oder Inhouse“ oder „Erfahrungen“. Erwartet werden Vergleichstabellen, nachvollziehbare Kriterien und echte Zahlen.</li>',
          '<li><strong>Informationell:</strong> Suchende wollen eine Anleitung, Vorlage oder Checkliste („wie funktioniert“, „Vorlage“, „Beispiele“). Hier passen Ratgeber, Rechner und PDF-Arbeitsblätter.</li>',
          '</ul>',
          '<p>Unsere Arbeitsregel im Agenturalltag (keine offizielle Google-Vorgabe): Teilen zwei Suchbegriffe <strong>mindestens 4 derselben URLs in den Google Top 10</strong>, beantworten wir sie auf <strong>einer gemeinsamen Seite</strong>. Teilen sie nur 0 bis 2 Treffer, brauchen Sie getrennte URLs, damit jede Seite die exakte Suchintention trifft.</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-cluster-beispiel',
          caption: 'Beispiel aus der Praxis: B2B-IT-Dienstleister (illustratives Schema)',
          columns: [
            { key: 'begriffe', label: 'Suchbegriffe im Cluster' },
            { key: 'intention', label: 'Dominante Ergebnisse in Google' },
            { key: 'ziel', label: 'Entscheidung in der Keyword-Map' },
          ],
          rows: [
            { begriffe: 'it sicherheitsaudit, pentest unternehmen, sicherheitsüberprüfung it', intention: 'Leistungsseiten von IT-Sicherheitsfirmen', ziel: 'Eine Leistungsseite: /it-sicherheitsaudit' },
            { begriffe: 'pentest kosten, was kostet ein pentest, sicherheitsaudit preis', intention: 'Kostenseiten mit Preisspannen und Faktoren', ziel: 'Eigene Kostenseite: /pentest-kosten' },
            { begriffe: 'nis2 checkliste, nis2 anforderungen vorlage', intention: 'Checklisten und praxisnahe Leitfäden', ziel: 'Vorlagenseite mit PDF: /wissen/nis2-checkliste' },
          ],
        },
      },
      {
        id: 'schritt-fuer-schritt',
        h2: 'So arbeiten Sie die Vorlage in 6 Schritten durch',
        html: `<ol>${KROKI_KEYWORD_DE.map((k) => `<li><strong>${k.name}.</strong> ${k.text}</li>`).join('')}</ol>` +
          '<p>Sobald Ihre Keyword-Map steht, übertragen Sie die offenen Themen direkt in die <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan Vorlage</a> und prüfen bestehende Zielseiten mit dem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a> sowie der <a href="/de/tools/seo-checkliste">SEO Checkliste</a>. Wenn wir die gesamte Analyse inklusive Wettbewerbsdaten für Sie übernehmen sollen, ist sie fester Bestandteil unseres <a href="/de/seo-audit">SEO Audits</a> und der laufenden <a href="/de/seo-fuer-unternehmen">B2B-SEO-Betreuung</a>.</p>',
      },
      {
        id: 'fehler-vermeiden',
        h2: 'Typische Fehler bei der Keyword-Recherche',
        html: [
          '<ul>',
          '<li><strong>Nur auf das Suchvolumen schauen.</strong> Ein Fachbegriff mit 50 monatlichen Suchen und klarer Kaufabsicht bringt einem B2B-Unternehmen oft mehr Umsatz als ein allgemeiner Begriff mit 5.000 Suchen, den Schüler und Studierende eingeben.</li>',
          '<li><strong>Google-Ads-Spannen mit exakten Werten verwechseln.</strong> Ohne aktive Anzeigenkampagne zeigt der Google Keyword-Planer breite Spannen (z. B. 100-1.000). Nutzen Sie ihn dann für den relativen Vergleich und ergänzen Sie echte Impressionen aus Ihrer Search Console.</li>',
          '<li><strong>Kannibalisierung ignorieren.</strong> Wenn im Leistungsbericht der Search Console für ein Haupt-Keyword abwechselnd zwei eigene URLs erscheinen, teilen sich beide Seiten Signale und Klickrate. Führen Sie schwächere Duplikate per 301-Weiterleitung zusammen oder grenzen Sie die Intention sauber ab.</li>',
          '<li><strong>KI-Suchsysteme vergessen.</strong> In <a href="/de/ki-suchoptimierung">ChatGPT, Gemini und Google AI Overviews</a> stellen Nutzer ganze Fragen nach Empfehlungen, Preisen und Vergleichen. Nehmen Sie echte Kundenfragen als H2-Überschriften und FAQ-Einträge in das jeweilige Seiten-Cluster auf.</li>',
          '</ul>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Keyword-Map und Prüfblätter',
      opis: 'So sind die Tabellen im druckfertigen PDF aufgebaut. Sie können das Dokument ausdrucken oder direkt digital ausfüllen.',
      html: [
        '<h3>Teil 1-2. Ausgangsbegriffe und Quellen</h3>',
        tabelaHtml(
          ['Geschäftsbereich / Leistung', 'Kundenbegriffe & Fragen', 'Quelle (GSC, Vertrieb, Planer)', 'Notiz'],
          [
            ['Kernleistung 1', '…', 'Search Console / Vertrieb', '…'],
            ['Kernleistung 2', '…', 'Keyword-Planer / Autocomplete', '…'],
          ],
        ),
        '<h3>Teil 3-5. Cluster, Suchintention und ICE-Priorität</h3>',
        tabelaHtml(
          ['Cluster / Haupt-Keyword', 'Neben-Keywords (gleiche Top 10)', 'Intention & SERP-Typ', 'Volumen', 'ICE (1-10)', 'Prio'],
          [
            ['…', '…', 'Leistungsseite / Ratgeber / Vergleich', '…', 'I__ × C__ × E__', 'hoch / mittel'],
            ['…', '…', '…', '…', 'I__ × C__ × E__', '…'],
          ],
        ),
        '<h3>Teil 6. Keyword-Map und Kannibalisierungs-Check</h3>',
        tabelaHtml(
          ['Haupt-Keyword des Clusters', 'Ziel-URL', 'Aktion (Neu / Ausbau / 301)', 'Andere eigene URL in GSC?', 'Verantwortlich & Termin'],
          [
            ['…', '/…', 'Neu erstellen / Ausbauen', 'Nein / Ja: …', '…'],
            ['…', '/…', '…', '…', '…'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'Keyword Recherche Vorlage herunterladen (PDF)',
      opis: 'Laden Sie die komplette Keyword Recherche Vorlage als druckfertiges A4-PDF herunter: 6 Arbeitsblätter von der Ideensammlung bis zur fertigen Seiten- und URL-Zuordnung.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Vorlage als PDF senden',
      przedmiot: 'die Keyword Recherche Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur Keyword Recherche Vorlage kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Welche kostenlosen Tools reichen für den Start der Keyword-Recherche?',
        answer: 'Für bestehende Websites ist die Google Search Console die wichtigste Quelle, weil sie echte Impressionen und Klicks Ihrer Domain zeigt. Dazu kommen der Google Ads Keyword-Planer, Google Autocomplete, der Bereich „Weitere Fragen“ in den Suchergebnissen und Ihre eigenen Kundenanfragen aus Vertrieb und Support.',
      },
      {
        question: 'Wie viele Keywords sollte ich pro Unterseite einplanen?',
        answer: 'Eine Unterseite zielt auf ein Haupt-Keyword und alle eng verwandten Varianten mit derselben Suchintention. Es gibt keine feste Obergrenze: Eine gute Seite rankt in der Search Console oft für Dutzende Long-Tail-Formulierungen automatisch, solange Thema und Intention übereinstimmen.',
      },
      {
        question: 'Woran erkenne ich Keyword-Kannibalisierung?',
        answer: 'Filtern Sie in der Google Search Console im Leistungsbericht nach einer wichtigen Suchanfrage und wechseln Sie auf den Tab „Seiten“. Erscheinen dort zwei oder mehr eigene URLs mit nennenswerten Impressionen und wechselnden Positionen, konkurrieren diese Seiten miteinander.',
      },
      {
        question: 'Lohnt sich ein Keyword mit unter 100 Suchanfragen pro Monat?',
        answer: 'Im B2B-Bereich und bei spezialisierten Dienstleistungen fast immer, sofern eine klare Kauf- oder Anfrageabsicht dahintersteht. Zehn qualifizierte Besucher auf einer präzisen Leistungs- oder Kostenseite bringen häufig mehr Aufträge als tausend unpassende Aufrufe auf einem allgemeinen Glossareintrag.',
      },
      {
        question: 'Ist die Vorlage eine Excel-Tabelle oder ein PDF?',
        answer: 'Der Download ist ein übersichtliches, druckfertiges PDF mit sechs klar strukturierten Tabellen. Wenn Sie lieber in Excel oder Google Sheets arbeiten, können Sie die sechs Spaltensätze der Keyword-Map eins zu eins als Tabellenkopf übernehmen.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/content-plan', tekst: 'Redaktionsplan Vorlage', opis: 'überführt Ihre priorisierten Keyword-Cluster in einen 3-Monats-Kalender' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste', opis: '50 Prüfpunkte für Technik, On-Page SEO und Messung' },
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft bis zu 25 Unterseiten auf Titel, H1, Indexierung und Ladezeit' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'umfassende technische Analyse inklusive individueller Keyword-Map' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'B2B SEO', opis: 'laufende Umsetzung von Technik, Inhalten und Linkaufbau' },
    ],
    plikNazwa: 'Keyword Recherche Vorlage: 6 Arbeitsblätter (PDF)',
  },
};

export default SZABLON_KEYWORD_DE;
