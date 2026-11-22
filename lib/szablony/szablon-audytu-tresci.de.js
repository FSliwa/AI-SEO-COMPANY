// Szablon „Content Audit Vorlage” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/szablon-audytu-tresci.js (/de/tools/content-audit-vorlage).
// PDF: public/pliki/de/content-audit-vorlage.pdf.
// Saubere Abgrenzung ohne Kannibalisierung mit /de/seo-audit (/audyt-seo):
// Diese Seite deckt ausschließlich die inhaltliche Seiten-für-Seite-Bestandsaufnahme (Content Audit / Content Pruning) ab.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche Inhalte erstellen (keine Zielwortzahl, kein künstliches Aktualisieren von Datumsangaben)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/core-updates', nazwa: 'Google Search Central: Core Updates und Ihre Website (Löschen von Inhalten als letztes Mittel)', data: '2026-11-11' },
  { url: 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes', nazwa: 'Google Search Central: HTTP-Statuscodes in der Google-Suche (404 und 410 Wirkung)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: 301-Weiterleitungen auf thematisch passende Ziele statt Soft-404 auf die Startseite', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing', nazwa: 'Google Search Central: Indexierung per noindex steuern (ohne gleichzeitige Sperre in robots.txt)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7440203', nazwa: 'Search-Console-Hilfe: Bericht zur Seitenindexierung (gecrawlt - derzeit nicht indexiert, Duplikate, Soft-404)', data: '2026-11-11' },
];

export const KRITERIEN_CONTENT_AUDIT_DE = [
  ['K1. Suchintention & Format', '2 Pkt.: trifft Format und Suchabsicht der Google Top 10 exakt', '1 Pkt.: Thema passt, aber falsches Seitenformat (z. B. Aufsatz statt Leistungsseite)', '0 Pkt.: verfehlt die Suchanfrage oder konkurriert mit einer eigenen Schwesterseite'],
  ['K2. Fachliche Aktualität', '2 Pkt.: Preise, Rechtsstand, Screenshots und Zahlen sind aktuell', '1 Pkt.: einzelne veraltete Beispiele oder Jahreszahlen, schnell korrigierbar', '0 Pkt.: überholte Angaben, tote Produkte oder fehlerhafte Fakten'],
  ['K3. Eigener Mehrwert (Substanz)', '2 Pkt.: eigene Projektdaten, Fallbeispiele, Tabellen oder echte Praxisbilder', '1 Pkt.: solide erklärt, aber austauschbar mit den übrigen Top-10-Ergebnissen', '0 Pkt.: dünne Zusammenfassung fremder Texte ohne eigene Substanz'],
  ['K4. Vertrauen & Belege (E-E-A-T)', '2 Pkt.: klarer Absender/Autor, aktuelles Prüfdatum und verlinkte Primärquellen', '1 Pkt.: ein Element fehlt (z. B. Zahlen ohne Quellenangabe)', '0 Pkt.: anonymer Text ohne Belege und ohne Bezug zum Unternehmen'],
  ['K5. Struktur, GEO & interne Links', '2 Pkt.: klare H2/H3-Fragen, Direktantwort oben, Links zu Leistungsseite & Cluster', '1 Pkt.: lückenhafte Zwischenüberschriften oder fehlende interne Verlinkung', '0 Pkt.: unstrukturierte Textwand, verwaiste URL ohne eingehende Links'],
];

export const ENTSCHEIDUNGEN_CONTENT_AUDIT_DE = [
  ['Behalten (Keep)', 'Stabile oder steigende Klicks im Vorjahresvergleich, Konversionen vorhanden, Qualitätswert 8-10 Punkte', 'Inhalt unverändert lassen; lediglich interne Links auf neue Leistungsseiten ergänzen'],
  ['Aktualisieren (Update)', 'Durchschnittsposition 4-20 auf relevantes Keyword oder sinkende Klicks (YoY), Qualitätswert 5-7 Punkte', 'Zahlen, Beispiele und Title-Tag erneuern, fehlende Unterfragen ergänzen; Änderungsdatum nur bei echtem Umbau anpassen'],
  ['Ausbauen (Expand)', 'Seite erzielt Impressionen zu Nebenfragen, die im Text noch fehlen, oder behandelt Kernthema zu knapp', 'Fehlende H2-Sektion, Vergleichstabelle oder FAQ ergänzen; bei reinem JS-Rendering auf SSR umstellen'],
  ['Zusammenlegen (301 Merge)', 'Zwei oder mehr schwache URLs zielen auf dasselbe Keyword bzw. dieselbe Suchintention (Kannibalisierung)', 'Stärkere URL (Klicks + Backlinks) behalten, beste Absätze übernehmen, schwächere URL per 301 direkt umleiten und interne Links anpassen'],
  ['Aus Index nehmen (noindex)', 'Seite wird für Nutzer benötigt (z. B. Danke-Seite, Kundenlogin, internes Archiv), hat aber keinen Suchwert', 'Meta-Tag robots="noindex" setzen und aus der XML-Sitemap entfernen - NICHT in der robots.txt sperren'],
  ['Löschen (410 / 404)', 'Null Klicks über 12 Monate, null Backlinks, null Anfragen, kein geschäftlicher Bezug, Wert 0-4 Punkte', 'Ohne thematischen Nachfolger Status 410 (oder 404) liefern; mit passendem Nachfolger 301 setzen, interne Links und Sitemap bereinigen'],
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const pusteWiersze = (ile, kolumn) =>
  Array.from({ length: ile }, (_, i) => [String(i + 1), ...Array(kolumn - 1).fill('…')]);

const SZABLON_CONTENT_AUDIT_DE = {
  slug: 'szablon-audytu-tresci',
  plik: 'audyt-tresci',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/content-audit-vorlage.pdf',
  seo: {
    tytul: 'Content Audit Vorlage kostenlos: Seiten prüfen als PDF',
    opis: 'Kostenlose Content Audit Vorlage als PDF: URL-Inventar mit Search Console und GA4 abgleichen und je Seite klar entscheiden (behalten, updaten, 301).',
  },
  de: {
    okruszek: 'Content Audit Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Content Audit Vorlage: Bestehende Inhalte bewerten und bereinigen',
    lead: 'Auf gewachsenen Unternehmenswebsites bringen oft 20 Prozent der Unterseiten über 80 Prozent aller Anfragen, während veraltete Blogbeiträge, doppelte Stadtseiten und Messe-Notizen interne Linkkraft binden und sich gegenseitig kannibalisieren. Unsere kostenlose Content Audit Vorlage führt Sie systematisch vom vollständigen URL-Inventar über die 0-bis-10-Punkte-Qualitätsbewertung bis zur eindeutigen Entscheidung je Seite: behalten, aktualisieren, ausbauen, per 301 zusammenlegen, auf noindex setzen oder bereinigen.',
    karta: {
      nazwa: 'Content Audit Vorlage (PDF)',
      opis: '6 Arbeitsblätter auf A4: Prüfrahmen, URL-Inventar (GSC & GA4), 5-Kriterien-Scorecard, Entscheidungsmatrix, 301-Plan und 90-Tage-Erfolgskontrolle.',
      cta: 'Content Audit Vorlage laden',
    },
    sekcje: [
      {
        id: 'was-ist-ein-content-audit',
        h2: 'Was ein Content Audit leistet - und wann der richtige Zeitpunkt ist',
        html: [
          '<p>Ein <strong>Content Audit</strong> ist die datengestützte Bestandsaufnahme sämtlicher bestehenden URLs einer Website mit dem Ziel, für jede einzelne Adresse genau eine verbindliche Maßnahme festzulegen. Statt blind neue Artikel zu produzieren, prüfen Sie zuerst das vorhandene Fundament aus Google Search Console, Google Analytics 4 (GA4), externen Verweisen und fachlicher Textqualität.</p>',
          '<p>Wichtige Abgrenzung zu zwei Nachbardisziplinen:</p>',
          '<ul>',
          '<li><strong>Abgrenzung zur technischen Gesamtanalyse:</strong> Ein umfassendes <a href="/de/seo-audit">SEO Audit</a> untersucht Serverantwortzeiten, Core Web Vitals, Rendering, Schema.org und Backlink-Risiken der gesamten Domain. Das Content Audit vertieft gezielt die inhaltliche Ebene Seite für Seite. Prüfen Sie grobe Technikfehler vorab mit unserem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>, damit fehlerhaftes Tracking oder noindex-Sperren Ihre Inhaltsdaten nicht verfälschen.</li>',
          '<li><strong>Abgrenzung zur Themenlücken-Suche:</strong> Das Content Audit bewertet bestehende Seiten; eine <a href="/de/blog/content-gap-analyse">Content Gap Analyse</a> identifiziert fehlende Themen, mit denen Wettbewerber bereits sichtbar sind. Erst aufräumen, dann im <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan</a> neu bauen - sonst entsteht sofort Kannibalisierung.</li>',
          '</ul>',
          '<p>Besonders wertvoll ist die <strong>Content Audit Vorlage</strong> in vier Situationen: vor einem geplanten Website-Relaunch (damit Sie keinen veralteten Ballast umziehen), nach spürbaren Sichtbarkeitsverlusten im Vorjahresvergleich, bei Websites mit mehr als 50 historisch gewachsenen Blogartikeln sowie als schlanke Quartalsroutine für Beiträge, die älter als zwölf Monate sind.</p>',
        ].join(''),
      },
      {
        id: 'inventar-spalten-datenquellen',
        h2: 'Aufbau der Content Audit Vorlage: Diese Daten gehören in die Inventartabelle',
        html: '<p>Gefühlte Urteile führen im Team schnell zu Fehlentscheidungen: Eine unscheinbare Leistungsunterseite mit nur 35 Klicks im Monat kann drei hochprofitable B2B-Anfragen liefern, während ein alter Glossarartikel mit 900 Besuchern null Umsatz beiträgt. Deshalb kombiniert Teil 2 der Vorlage Reichweiten-, Konversions- und Autoritätsdaten.</p>',
        tabela: {
          id: 'tabelle-content-audit-spalten',
          caption: 'Die Spalten des URL-Inventars und woher Sie die Kennzahlen beziehen',
          columns: [
            { key: 'spalte', label: 'Spalte in der Vorlage' },
            { key: 'quelle', label: 'Primärquelle' },
            { key: 'bedeutung', label: 'Worauf Sie bei der Auswertung achten' },
          ],
          rows: [
            { spalte: 'URL (ohne Parameter)', quelle: 'XML-Sitemap + CMS-Export + GSC (Seiten) + Crawler', bedeutung: 'Jede reale Adresse einmalig erfassen; URLs außerhalb der Sitemap sind oft vergessene Altlasten' },
            { spalte: 'Seitentyp & Haupt-Keyword', quelle: 'CMS & Search Console (Top-Suchanfrage je URL)', bedeutung: 'Teilen sich zwei URLs dasselbe Haupt-Keyword, liegt Kannibalisierung vor' },
            { spalte: 'Klicks (12 Monate) & Trend YoY', quelle: 'Search Console -> Leistungsbericht (Seiten)', bedeutung: '12 Monate glätten Saisonspitzen; die letzten 3 Monate gegen das Vorjahr zeigen echte Verluste' },
            { spalte: 'Durchschnittliche Position', quelle: 'Search Console', bedeutung: 'Plätze 4 bis 20 auf kaufnahe Begriffe sind die schnellsten Hebel für ein Content-Update' },
            { spalte: 'Indexierungsstatus', quelle: 'Search Console -> Seitenindexierung', bedeutung: '„Gecrawlt - derzeit nicht indexiert“ oder „Duplikat“ deutet auf dünne oder redundante Inhalte hin' },
            { spalte: 'Externe Backlinks', quelle: 'Search Console -> Links (Meistverlinkte Seiten)', bedeutung: 'Seiten mit echten externen Verweisen niemals ersatzlos löschen (immer aufbauen oder per 301 bündeln)' },
            { spalte: 'Schlüsselereignisse (Leads)', quelle: 'GA4 (Einstiegsseite -> Formular / Telefon / Kauf)', bedeutung: 'Jede Seite mit nachweisbaren Anfragen genießt Bestandsschutz vor vorschnellem Löschen' },
            { spalte: 'Wortzahl im HTML & Änderungsdatum', quelle: 'Crawler / kostenloser SEO Audit & CMS', bedeutung: 'Unter 250 Wörtern im Server-HTML prüfen, ob wichtiger Text nur clientseitig per JS nachlädt' },
          ],
        },
      },
      {
        id: 'qualitaetsbewertung-5-kriterien',
        h2: 'Inhaltsqualität objektiv messen: Die 5-Kriterien-Scorecard (0 bis 10 Punkte)',
        html: '<p>Reine Traffic-Zahlen erklären nicht, <em>warum</em> eine Seite stagniert. Deshalb bewerten Sie in Teil 3 der Vorlage jede wichtige URL nach fünf Kriterien mit jeweils 0, 1 oder 2 Punkten (identische Skala wie in unserer <a href="/de/tools/wettbewerbsanalyse-vorlage">SEO Wettbewerbsanalyse Vorlage</a>).</p>',
        tabela: {
          id: 'tabelle-content-audit-scorecard',
          caption: 'Bewertungsraster für bestehende Seiten: 5 Kriterien x 0-2 Punkte = maximal 10 Punkte',
          columns: [
            { key: 'kriterium', label: 'Kriterium' },
            { key: 'zwei', label: '2 Punkte (stark)' },
            { key: 'eins', label: '1 Punkt (Nachbesserung)' },
            { key: 'null', label: '0 Punkte (kritisch)' },
          ],
          rows: KRITERIEN_CONTENT_AUDIT_DE.map(([kriterium, zwei, eins, nullPkt]) => ({
            kriterium,
            zwei,
            eins,
            null: nullPkt,
          })),
        },
        htmlPo: '<p>Faustregel für die Auswertung: <strong>8 bis 10 Punkte</strong> bedeuten inhaltlich stark (behalten und intern besser verlinken), <strong>5 bis 7 Punkte</strong> markieren ideale Kandidaten für ein gezieltes Content-Refresh, und bei <strong>0 bis 4 Punkten</strong> entscheiden Klicks, Backlinks und Geschäftswert darüber, ob Sie neu schreiben, per 301 zusammenführen oder bereinigen.</p>',
      },
      {
        id: 'entscheidungsmatrix-und-content-pruning',
        h2: 'Die 6 Entscheidungen im Content Audit und seriöses Content Pruning',
        html: [
          '<p>Unter <strong>Content Pruning</strong> versteht man das gezielte Zusammenführen, Deindexieren oder Entfernen wertloser Unterseiten. Dabei kursiert ein gefährlicher Mythos: Manche löschen pauschal jeden Blogartikel mit wenig Traffic. Google stellt in seiner Dokumentation zu Core Updates jedoch ausdrücklich klar, dass das <strong>Löschen von Inhalten ein letztes Mittel</strong> ist - sinnvoll vor allem dort, wo früher massenhaft dünne Seiten für Suchmaschinen statt für Menschen erzeugt wurden (z. B. 50 kopierte Ortsunterseiten ohne echten lokalen Bezug).</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-content-audit-entscheidungen',
          caption: 'Entscheidungsmatrix der Content Audit Vorlage: Welche Aktion passt zu welchem Befund?',
          columns: [
            { key: 'aktion', label: 'Entscheidung' },
            { key: 'befund', label: 'Typisches Daten- & Qualitätsmuster' },
            { key: 'umsetzung', label: 'Saubere technische & redaktionelle Umsetzung' },
          ],
          rows: ENTSCHEIDUNGEN_CONTENT_AUDIT_DE.map(([aktion, befund, umsetzung]) => ({
            aktion,
            befund,
            umsetzung,
          })),
        },
        htmlPo: [
          '<p>Drei technische Sicherheitsregeln beim Aufräumen:</p>',
          '<ul>',
          '<li><strong>Keine 301-Sammelweiterleitungen auf die Startseite:</strong> Leiten Sie zusammengelegte Seiten nur auf ein thematisch wirklich deckungsgleiches Ziel um (siehe auch unsere <a href="/de/tools/website-relaunch-checkliste">Website Relaunch Checkliste</a>). Unpassende Weiterleitungen behandelt Google als Soft-404.</li>',
          '<li><strong>Niemals <code>noindex</code> und <code>robots.txt</code>-Disallow kombinieren:</strong> Wenn Sie Googlebot per <code>robots.txt</code> am Abruf hindern, kann er das <code>noindex</code>-Tag im Seitenkopf gar nicht lesen.</li>',
          '<li><strong>Canonical-Tag richtig abgrenzen:</strong> Wenn zwei technisch notwendige URLs (z. B. Filter- oder Druckansichten) für Nutzer bestehen bleiben müssen, bündeln Sie Signale über <code>rel="canonical"</code> (Anleitung unter <a href="/de/blog/canonical-tag">Canonical Tag im SEO</a>).</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'praxisbeispiel-content-audit',
        h2: 'Praxisbeispiel: 6 typische Zeilen aus dem Content Audit eines B2B-Betriebs',
        html: '<p>Das folgende fiktive Beispiel eines Industriedienstleisters zeigt, wie Kennzahlen und Scorecard direkt in konkrete Aufgaben münden:</p>',
        tabela: {
          id: 'tabelle-content-audit-beispiel',
          caption: 'Beispiel-Auswertung in der Content Audit Vorlage (fiktives Unternehmen)',
          columns: [
            { key: 'url', label: 'Geprüfte URL' },
            { key: 'daten', label: 'GSC- & GA4-Befund (12 Mon.)' },
            { key: 'score', label: 'Score' },
            { key: 'entscheidung', label: 'Entscheidung & nächster Schritt' },
          ],
          rows: [
            { url: '/cnc-lohnfertigung', daten: '1.420 Klicks (+18 % YoY), 22 Anfragen in GA4', score: '9 / 10', entscheidung: 'Behalten: interne Links aus neuen Fachartikeln ergänzen' },
            { url: '/blog/cnc-fraesen-kosten-stundensatz', daten: 'Position 6,8, Klicks -24 % YoY, Preise aus 2024', score: '6 / 10', entscheidung: 'Aktualisieren: Preistabelle 2026, Antwortblock oben, neuer Title' },
            { url: '/blog/was-kostet-cnc-bearbeitung', daten: 'Gleiches Haupt-Keyword wie Zeile 2, 30 Klicks, 3 Backlinks', score: '4 / 10', entscheidung: 'Zusammenlegen (301): beste Absätze in Zeile 2 übernehmen, 301 setzen' },
            { url: '/cnc-fertigung-augsburg-umland', daten: 'Kopierte Stadtseite ohne Standort/Referenz, nicht indexiert', score: '1 / 10', entscheidung: 'Bereinigen: echte lokale Fallstudie ergänzen oder per 301 auf Hauptleistung' },
            { url: '/aktuelles/betriebsausflug-2022', daten: '0 Klicks, 0 Backlinks, 0 Leads, kein Fachbezug', score: '2 / 10', entscheidung: 'Löschen (Status 410) und aus Sitemap sowie internen Listen entfernen' },
            { url: '/anfrage-erhalten', daten: 'Formular-Bestätigungsseite, versehentlich indexiert', score: 'n. z.', entscheidung: 'Auf noindex setzen und aus der XML-Sitemap nehmen' },
          ],
        },
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Alle 6 Arbeitsblätter & Qualitäts-Checkliste',
      opis: 'Auszug aus der druckfertigen PDF-Vorlage. Die abschließende Kontrollliste in Teil 6 lässt sich direkt hier im Browser abhaken.',
      html: [
        '<h3>Teil 1. Prüfrahmen & Bestandsschutz</h3>',
        '<ul>',
        '<li><strong>Geprüfte Verzeichnisse / Seitentypen:</strong> …</li>',
        '<li><strong>Datenzeitraum:</strong> 12 Monate Gesamtklicks + 3 Monate YoY-Vergleich in GSC</li>',
        '<li><strong>Seiten mit Löschsperre ohne Geschäftsführungs-Freigabe:</strong> Leistungsseiten, Impressum, AGB, Datenschutz</li>',
        '</ul>',
        '<h3>Teil 2. URL-Inventar & Leistungsdaten (Auszug)</h3>',
        tabelaHtml(
          ['#', 'URL', 'Typ', 'Haupt-Keyword', 'Klicks 12M', 'Trend YoY', 'Ø Pos.', 'Index-Status', 'Backlinks', 'GA4-Leads'],
          pusteWiersze(3, 10),
        ),
        '<h3>Teil 3 & 4. Qualitäts-Scorecard (K1-K5 je 0-2 Pkt.) & Entscheidung</h3>',
        tabelaHtml(
          ['#', 'K1', 'K2', 'K3', 'K4', 'K5', 'Summe (0-10)', 'Entscheidung', 'Ziel-URL (bei 301)', 'Verantwortlich & Frist'],
          pusteWiersze(3, 10),
        ),
        '<h3>Teil 5 & 6. 301-Kontrolle & Abschluss-Checkliste nach Umsetzung</h3>',
        '<ul>',
        '<li>☐ <strong>Vollständigkeit:</strong> Alle URLs aus XML-Sitemap, CMS und Search Console sind im Inventar erfasst.</li>',
        '<li>☐ <strong>Kannibalisierung gelöst:</strong> Keine zwei aktiven Seiten zielen mehr auf dasselbe Haupt-Keyword.</li>',
        '<li>☐ <strong>Backlink- & Lead-Schutz:</strong> Keine Seite mit externen Links oder GA4-Konversionen wurde ohne 301 gelöscht.</li>',
        '<li>☐ <strong>Saubere 301-Ziele:</strong> Keine Weiterleitung zeigt pauschal auf die Startseite oder bildet Ketten.</li>',
        '<li>☐ <strong>noindex-Regel beachtet:</strong> Deindexierte Seiten sind nicht gleichzeitig in der robots.txt gesperrt.</li>',
        '<li>☐ <strong>Interne Links & Sitemap bereinigt:</strong> Alle internen Verweise zeigen direkt auf den Status-200-Nachfolger.</li>',
        '<li>☐ <strong>Ehrliches Änderungsdatum:</strong> dateModified wurde nur bei substanziell überarbeiteten Texten aktualisiert.</li>',
        '<li>☐ <strong>Erfolgsmessung terminiert:</strong> Vergleich der Klicks und Positionen nach 30 und 90 Tagen im Kalender eingetragen.</li>',
        '</ul>',
      ].join(''),
    },
    formularz: {
      h2: 'Content Audit Vorlage herunterladen (PDF)',
      opis: 'Erhalten Sie alle 6 Arbeitsblätter inklusive URL-Inventartabelle, 5-Kriterien-Scorecard, Entscheidungsmatrix und 301-/Erfolgskontrolle kostenlos als A4-PDF.',
      etykieta: 'Ihre E-Mail-Adresse für den PDF-Download',
      przycisk: 'Content Audit Vorlage senden',
      przedmiot: 'die Content Audit Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur Content Audit Vorlage trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Wie oft sollte ein Unternehmen ein Content Audit durchführen?',
        answer: 'Ein vollständiges Content Audit über alle URLs empfiehlt sich einmalig als Fundament sowie vor jedem Website-Relaunch. Danach genügt ein schlanker Quartals-Check für Seiten, die älter als zwölf Monate sind oder im Vorjahresvergleich der Search Console spürbar Klicks verloren haben.',
      },
      {
        question: 'Verbessert das bloße Löschen kurzer Seiten automatisch meine Google-Rankings?',
        answer: 'Nein. Google hat keine bevorzugte Mindestwortzahl: Eine präzise Preis- oder Kontaktseite mit 220 Wörtern ist völlig legitim. Content Pruning hilft vor allem dann, wenn große Mengen redundanter, veralteter oder rein für Suchmaschinen erzeugter Seiten zusammengeführt bzw. bereinigt werden. Prüfen Sie vor jeder Löschung immer Backlinks und Konversionen.',
      },
      {
        question: 'Sollte ich für gelöschte Seiten ohne Nachfolger den Statuscode 404 oder 410 verwenden?',
        answer: 'Für Google führen beide Codes zum selben Ergebnis: Die URL wird nach dem nächsten Crawling aus dem Suchindex entfernt (410 signalisiert die dauerhafte Entfernung meist minimal schneller und dokumentiert intern klar, dass die Löschung beabsichtigt war). Existiert hingegen eine thematisch eng verwandte Seite, ist eine permanente 301-Weiterleitung die richtige Wahl.',
      },
      {
        question: 'Darf ich beim Aktualisieren einfach das Veröffentlichungsdatum auf heute setzen?',
        answer: 'Nur dann, wenn Sie den Inhalt tatsächlich substanziell überarbeitet, Zahlen aktualisiert oder wichtige Abschnitte ergänzt haben. Das reine Hochsetzen des Datums ohne echte inhaltliche Änderung nennt Google in seinen Richtlinien ausdrücklich als zu vermeidende Manipulation.',
      },
      {
        question: 'Wann zeigen sich die Ergebnisse nach einem Content-Update oder einer 301-Konsolidierung?',
        answer: 'Einzelne überarbeitete Seiten auf den Plätzen 4 bis 15 reagieren nach erneutem Abruf in der Search Console häufig schon binnen zwei bis vier Wochen. Bei umfangreichen Bereinigungen ganzer Verzeichnisse sollten Sie den Effekt nach 30 und nach 90 Tagen auswerten.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft bis zu 25 Seiten sofort auf dünnen HTML-Text, doppelte Titles und 404-Links' },
      { href: '/blog/content-gap-analysis', tekst: 'Content Gap Analyse', opis: 'findet nach dem Aufräumen gezielt fehlende Themen gegenüber Ihren Wettbewerbern' },
      { href: '/narzedzia/brief-dla-copywritera', tekst: 'Briefing Vorlage für Texter', opis: 'strukturiert die Beauftragung von Content-Updates und neuen Fachbeiträgen' },
      { href: '/narzedzia/sprawdz-przekierowania-hreflang', tekst: '301-Weiterleitungen & Canonical Prüfer', opis: 'kontrolliert live, ob zusammengelegte URLs ohne Ketten weiterleiten' },
      { href: '/audyt-seo', tekst: 'Umfassendes SEO Audit', opis: 'unsere persönliche Tiefenanalyse aus Technik, Content-Inventar und Backlink-Profil' },
    ],
    plikNazwa: 'Content Audit Vorlage: URL-Inventar, Scorecard & Entscheidungsplan (PDF)',
  },
};

export default SZABLON_CONTENT_AUDIT_DE;
