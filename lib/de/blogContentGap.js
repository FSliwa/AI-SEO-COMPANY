// Daten des deutschen Ratgebers /de/blog/content-gap-analyse (Schluessel PL: /blog/content-gap-analysis).
// Hauptphrase: "content gap analyse". 7 Lueckentypen inkl. KI-Zitate, SERP-Clustering (1 Cluster = 1 URL) und ICE-Scoring.

export const BLOG_CONTENT_GAP_DE = {
  fallbackPfad: '/blog/content-gap-analyse',
  okruszek: 'Content Gap Analyse',
  kategoria: 'Content-Strategie & KI-Suche',
  h1: 'Content Gap Analyse im SEO: Wie Sie echte Themenlücken finden und schließen',
  opublikowano: '2026-11-22',
  aktualisiert: '2026-11-22',
  kurzantwort: 'Eine Content Gap Analyse gleicht systematisch ab, für welche Suchbegriffe, Unterthemen, Seitenformate und KI-Kundenfragen drei bis fünf SERP-Wettbewerber sichtbar sind, Ihre Website jedoch noch nicht. Wer bestehende Unterseiten auf den Positionen 5 bis 15 gezielt ausbaut, sieht erste Ranking-Gewinne meist nach vier bis acht Wochen, während komplett neue Themencluster drei bis sechs Monate benötigen.',
  lead: 'Die meisten Marketing-Teams setzen eine Content Gap Analyse mit einem simplen Keyword-Export gleich - und wundern sich anschließend über 300 ungeordnete Begriffe in einer Tabelle, aus denen kein einziger Auftrag entsteht. Eine wirksame Lückenanalyse prüft neben fehlenden Suchbegriffen auch Suchintention, Seitenformat, bestehende Schwellenseiten und KI-Zitate in ChatGPT sowie Google AI Overviews.',
  sekcje: [
    {
      id: 'sieben-arten-von-content-gaps',
      h2: '1. Mehr als fehlende Keywords: Die 7 Arten von Content-Lücken im B2B',
      html: [
        '<p>Eine professionelle <strong>Content Gap Analyse</strong> untersucht die Differenz zwischen dem Informationsbedarf Ihrer Zielgruppe (sichtbar bei Ihren stärksten Suchwettbewerbern) und Ihrem aktuellen Seitenbestand. In B2B-Projekten unterscheiden wir sieben klar abgrenzbare Lückentypen, die jeweils eine eigene Lösung erfordern:</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-sieben-content-gap-typen',
        caption: 'Die 7 Lückentypen einer vollständigen Content Gap Analyse und ihre Behebung',
        columns: [
          { key: 'typ', label: 'Lückentyp' },
          { key: 'erkennung', label: 'Woran Sie die Lücke erkennen' },
          { key: 'massnahme', label: 'Richtige Maßnahme' },
        ],
        rows: [
          { typ: '1. Themen- & Cluster-Lücke', erkennung: 'Mehrere Wettbewerber ranken zu einem ganzen Themengebiet, auf Ihrer Domain existiert dazu null Inhalt', massnahme: 'Neue Pillar-Seite samt unterstützenden Unterseiten planen' },
          { typ: '2. Unterthemen-Lücke (Seitenebene)', erkennung: 'Ihre URL steht auf Platz 5 bis 15, lässt aber wichtige Teilfragen, Tabellen oder Rechenbeispiele der Top 3 aus', massnahme: 'Bestehende Seite strukturell ausbauen statt neu zu schreiben' },
          { typ: '3. Suchintentions-Lücke', erkennung: 'Bei einer kaufnahen Vergleichs- oder Preisanfrage rankt bei Ihnen nur ein allgemeiner Grundlagen-Blogpost', massnahme: 'Passendes Zielformat bauen (Leistungs-, Preis- oder Vergleichsseite)' },
          { typ: '4. Qualitäts- & ROT-Lücke', erkennung: 'Veraltete, dünne oder doppelt angelegte Beiträge (Redundant, Outdated, Trivial) spalten Signale auf', massnahme: 'Inhalte zusammenführen und schwächere Dublette per 301 weiterleiten' },
          { typ: '5. Format- & Werkzeug-Lücke', erkennung: 'Die Top 5 bieten interaktive Rechner, Checklisten oder PDF-Vorlagen, Ihre Seite liefert nur Fließtext', massnahme: 'Nutzbares Arbeitsblatt, Tabelle oder Rechner ergänzen' },
          { typ: '6. Technische Leistungs-Lücke', erkennung: 'Guter Inhalt verliert gegen schnellere Seiten wegen schwacher Core Web Vitals oder fehlendem Server-HTML', massnahme: 'LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 und sauberes SSR herstellen' },
          { typ: '7. KI-Zitier-Lücke (GEO)', erkennung: 'ChatGPT, Perplexity und Google AI Overviews zitieren bei Käuferfragen Ihre Konkurrenz, aber nicht Ihre Marke', massnahme: 'Kurzantwort-Blöcke, klare Fakten, Tabellen und Branchenquellen aufbauen' },
        ],
        przypis: 'Methodik kombiniert aus klassischer SERP-Gap-Analyse, Content-Inventur (ROT) und RAG-Zitierbarkeitsprüfung.',
      },
    },
    {
      id: 'schritt-fuer-schritt-workflow',
      h2: '2. Content Gap Analyse Schritt für Schritt: Von den Rohdaten zum Seitenbaum',
      html: [
        '<p>Mit diesem fünfstufigen Ablauf verwandeln Sie Rohdaten innerhalb weniger Tage in einen sauberen Redaktions- und Optimierungsplan:</p>',
        '<h3>Schritt 1: Drei bis fünf echte SERP-Wettbewerber auswählen</h3>',
        '<p>Übernehmen Sie nicht ungeprüft die Vertriebskonkurrenz. Wählen Sie jene drei bis fünf Domains aus, die bei Ihren wichtigsten Geschäftsanfragen regelmäßig in den Google Top 10 stehen (siehe Leitfaden <a href="/de/blog/seo-konkurrenzanalyse">Konkurrenzanalyse SEO</a>). Im deutschsprachigen B2B-Markt sind die absoluten Suchvolumina pro Einzelbegriff oft deutlich kleiner als im englischsprachigen Raum - filtern Sie Nischenbegriffe deshalb nicht pauschal unterhalb von 100 Suchanfragen heraus, sondern verlangen Sie stattdessen, dass mindestens zwei relevante Wettbewerber für den Begriff ranken.</p>',
        '<h3>Schritt 2: Zwei getrennte Keyword-Exporte durchführen (Neu vs. Update)</h3>',
        '<p>Starten Sie in Tools wie Semrush (Keyword-Gap), Ahrefs (Content Gap) oder Sistrix immer <strong>zwei separate Abfragen</strong>:</p>',
        '<ul>',
        '<li><strong>Export A (Neuerstellungs-Liste):</strong> Suchbegriffe, für die mindestens zwei Konkurrenten auf den Plätzen 1 bis 20 stehen, Ihre eigene Domain aber gar nicht in den Top 100 auftaucht.</li>',
        '<li><strong>Export B (Quick-Win-Update-Liste):</strong> Suchbegriffe, bei denen Ihre Konkurrenten in den Top 10 stehen und Ihre eigene Website bereits auf den <strong>Positionen 5 bis 30</strong> rankt. Genau diesen zweiten Export lassen viele Teams weg - dabei bringt das Nachschärfen bestehender Schwellenseiten in der Regel die schnellsten Ergebnisse innerhalb von vier bis acht Wochen.</li>',
        '</ul>',
        '<h3>Schritt 3: Eigenes URL-Inventar aus Search Console und Crawl dagegenhalten</h3>',
        '<p>Ziehen Sie die vollen 16 Monate Klick-, Impressions- und Positionsdaten aus der Google Search Console (besonders Suchanfragen mit hohen Impressionen und niedriger Klickrate) und verknüpfen Sie diese mit einem vollständigen Seiten-Crawl. Für die strukturierte Bewertung „behalten, aktualisieren oder per 301 zusammenlegen“ nutzen Sie unsere kostenlose <a href="/de/tools/content-audit-vorlage">Content Audit Vorlage (PDF)</a>.</p>',
      ].join(''),
    },
    {
      id: 'serp-clustering-ohne-kannibalisierung',
      h2: '3. SERP-Clustering: Warum 1 Cluster = 1 URL vor Kannibalisierung schützt',
      html: [
        '<p>In der deutschen Sprache erzeugen Komposita, Bindestrich-Schreibweisen und Synonyme (etwa <code>Content Gap Analyse</code>, <code>Content-Gap-Analyse</code> und <code>Themenlücken finden</code>) in Keyword-Tools oft getrennte Zeilen. Wer für jede Schreibweise einen eigenen Artikel beauftragt, produziert unweigerlich <strong>Keyword-Kannibalisierung</strong>: Mehrere eigene Unterseiten konkurrieren gegeneinander, und keine erreicht die Top 3.</p>',
        '<p>Wenden Sie vor jedem Briefing die <strong>40-bis-50-Prozent-SERP-Regel</strong> an: Vergleichen Sie die aktuellen Google Top 10 der zwei bis drei wichtigsten Begriffe einer Gruppe. Zeigen mindestens vier bis fünf Treffer exakt dieselben URLs, behandelt Google diese Suchanfragen als <strong>eine gemeinsame Suchintention</strong> - sie gehören zwingend auf <strong>eine einzige Ziel-URL</strong> (1 Cluster = 1 URL). Unterscheiden sich die Top-10-Ergebnisse fast vollständig (weil ein Begriff einen Rechner verlangt und der andere eine Leistungsseite), trennen Sie die Cluster sauber auf zwei Seiten. Das passende Arbeitsblatt dazu bietet unsere <a href="/de/tools/keyword-recherche-vorlage">Keyword Recherche Vorlage</a>.</p>',
      ].join(''),
    },
    {
      id: 'ki-zitier-luecken-und-briefings',
      h2: '4. KI-Zitier-Lücken schließen und saubere Content-Briefings schreiben',
      html: [
        '<p>Klassische Keyword-Tools zeigen Ihnen nicht, wen ChatGPT, Gemini, Perplexity oder Google AI Overviews empfehlen, wenn ein Einkäufer eine komplexe Vergleichsfrage stellt. Ergänzen Sie Ihre Analyse deshalb um einen gezielten <strong>KI-Prompt-Check</strong> für Ihre zehn wichtigsten Themencluster:</p>',
        '<ol>',
        '<li>Formulieren Sie 10 bis 20 echte Entscheidungsfragen Ihrer Kunden (oder starten Sie direkt mit 3 Live-Fragen unter <a href="/de/ki-sichtbarkeit-pruefen">KI-Sichtbarkeit prüfen</a>).</li>',
        '<li>Prüfen Sie, welche Wettbewerber namentlich genannt und welche konkreten Unterseiten als Beleg verlinkt werden.</li>',
        '<li>Untersuchen Sie den Aufbau dieser zitierten Seiten mit unserem kostenlosen <a href="/de/tools/geo-zitierbarkeit-pruefen">GEO-Zitierbarkeits-Prüfer</a>: Fast immer beginnen sie mit einer präzisen Kurzantwort von 45 bis 65 Wörtern, nutzen sprechende H2-/H3-Fragen, strukturierte Vergleichstabellen und überprüfbare Zahlenangaben.</li>',
        '</ol>',
        '<p><strong>Wichtige Warnung vor ungeprüfter KI-Massenproduktion:</strong> Eine Liste aus 150 offenen Themen verführt manche Teams dazu, automatisiert Dutzende generische KI-Texte ohne eigene Substanz zu veröffentlichen. Googles Richtlinie gegen <em>Missbrauch durch skalierte Inhaltserstellung (Scaled Content Abuse)</em> sanktioniert genau dieses Muster unabhängig davon, ob Mensch oder Sprachmodell den Text erzeugt hat. Nutzen Sie KI gern für Gliederung und Rohrecherche - aber verlangen Sie in jedem Briefing (siehe <a href="/de/tools/briefing-vorlage-texter">Briefing Vorlage für Texter</a>) echte Projekterfahrung, eigene Messdaten oder konkrete Rechenbeispiele sowie eine fachliche Endkontrolle.</p>',
      ].join(''),
    },
    {
      id: 'priorisierung-ice-und-roadmap',
      h2: '5. Priorisierung nach ICE und realistische Quartals-Roadmap',
      html: [
        '<p>Damit aus Ihrer Analyse sofort sichtbare Ergebnisse entstehen, bewerten Sie jedes bestätigte Themencluster auf drei Achsen von 1 bis 5 (oder 1 bis 10 im klassischen ICE-Modell):</p>',
        '<ul>',
        '<li><strong>Impact (Geschäftswert):</strong> Kaufnähe in der Customer Journey (Entscheidungsphase schlägt reine Informationssuche), Suchpotenzial und Bedeutung für KI-Antworten.</li>',
        '<li><strong>Confidence (Datenbeleg):</strong> Hohe Punktzahl, wenn mehrere Konkurrenten damit Traffic erzielen und Ihre Search Console bereits erste Impressionen zeigt; niedrige Punktzahl bei reinen Vermutungen.</li>',
        '<li><strong>Ease / geringer Aufwand:</strong> Eine bestehende Seite auf Position 8 auszubauen kostet einen Bruchteil der Zeit eines komplett neuen Themenclusters samt Design und Linkaufbau.</li>',
        '</ul>',
        '<p>Berechnen Sie den Prioritätswert als <code>(Impact x Confidence) / Aufwand</code> und teilen Sie die Umsetzung in drei realistische Horizonte im <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan</a> auf:</p>',
        '<ul>',
        '<li><strong>Wochen 1 bis 4 (Quick Wins):</strong> Strukturelles Update bestehender Seiten auf den Plätzen 5 bis 15 inklusive fehlender Unterthemen, Kurzantwort-Block und interner Links.</li>',
        '<li><strong>Monate 2 bis 3 (Kaufnahe Einzel-Lücken):</strong> Neue Leistungs-, Preis- und Vergleichsseiten (BOFU) für konkrete Entscheidungsfragen Ihrer Zielgruppe.</li>',
        '<li><strong>Ab Monat 4 (Vollständige Themencluster):</strong> Aufbau ganzer Wissensbereiche inklusive Pillar-Seite, vertiefender Ratgeber und gezieltem <a href="/de/blog/linkaufbau-b2b">B2B-Linkaufbau</a>.</li>',
        '</ul>',
        '<p>Wiederholen Sie die Content Gap Analyse einmal pro Quartal, ohne laufende Langfrist-Cluster jedes Mal abzubrechen. Wenn unser Team die komplette Bestandsaufnahme, das SERP-Clustering und die priorisierten Briefings für Sie übernehmen soll, starten wir mit einem <a href="/de/seo-audit">SEO Audit</a> (ab 350 € netto) oder unserem spezialisierten <a href="/de/ki-suchoptimierung/ki-sichtbarkeit-audit">KI-Sichtbarkeits-Audit</a> (235 € netto).</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zur Content Gap Analyse',
  faq: [
    {
      id: 'unterschied-content-audit-und-content-gap',
      question: 'Was ist der Unterschied zwischen einem Content Audit und einer Content Gap Analyse?',
      answer: 'Ein Content Audit blickt nach innen auf Ihren vorhandenen Seitenbestand und entscheidet anhand von Klicks, Conversions und Aktualität, welche URLs erhalten, überarbeitet, zusammengelegt oder gelöscht werden. Die Content Gap Analyse blickt nach außen auf Suchergebnisse, Wettbewerber und KI-Antworten, um Themen, Formate und Fragen aufzudecken, die auf Ihrer Website noch fehlen.',
    },
    {
      id: 'wie-schnell-wirken-content-gap-massnahmen',
      question: 'Wie lange dauert es, bis geschlossene Themenlücken Rankings und Klicks bringen?',
      answer: 'Überarbeiten und ergänzen Sie eine bereits indexierte Unterseite auf den Positionen 5 bis 15 um fehlende Teilthemen, Tabellen und interne Links, zeigen sich messbare Positionsgewinne meist innerhalb von vier bis acht Wochen. Ein komplett neu aufgebautes Themencluster benötigt je nach Wettbewerb und Domain-Autorität in der Regel drei bis sechs Monate.',
    },
    {
      id: 'sollte-man-noch-faq-schema-fuer-serp-einplanen',
      question: 'Sollte man in Content-Briefings noch FAQ- oder HowTo-Schema für Google-Snippets fordern?',
      answer: 'Nicht als Maßnahme für erweiterte Darstellungen in der Google-Suche: Google hat HowTo-Rich-Results im September 2023 auf dem Desktop und FAQ-Rich-Results am 7. Mai 2026 vollständig eingestellt. Sehr sinnvoll bleibt dagegen ein sichtbarer Fragen-und-Antworten-Abschnitt im Text selbst, weil er echte Einwände von Käufern klärt und von KI-Systemen leicht extrahiert werden kann.',
    },
    {
      id: 'wie-verhindert-man-kannibalisierung-beim-schliessen-von-luecken',
      question: 'Wie vermeide ich Keyword-Kannibalisierung beim Ausbau neuer Inhalte?',
      answer: 'Prüfen Sie vor jeder Texterstellung erstens in Ihrem eigenen Inventar, ob bereits eine ältere URL zum selben Thema existiert, die sich aktualisieren oder zusammenlegen lässt. Vergleichen Sie zweitens die Google Top 10 verwandter Begriffe: Bei rund 40 bis 50 Prozent identischen Treffern gehören alle Varianten gemeinsam auf eine einzige starke Zielseite.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/szablon-audytu-tresci', tekst: 'Content Audit Vorlage (PDF)', opis: 'Arbeitsblatt zum Abgleich Ihres bestehenden URL-Inventars mit Search Console und GA4' },
    { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Keyword Recherche Vorlage (PDF)', opis: 'Anleitung für sauberes SERP-Clustering nach der Regel 1 Cluster = 1 Ziel-URL' },
    { href: '/narzedzia/sprawdz-cytowalnosc-strony-ai', tekst: 'GEO-Zitierbarkeit prüfen', opis: 'testet kostenlos, wie gut Ihre Absätze für Google AI Overviews und ChatGPT strukturiert sind' },
    { href: '/narzedzia/content-plan', tekst: 'Redaktionsplan Vorlage (PDF)', opis: 'verwandelt priorisierte Themenlücken in einen verbindlichen 3-Monats-Umsetzungsplan' },
    { href: '/blog/analiza-konkurencji-seo-przewodnik', tekst: 'Konkurrenzanalyse SEO', opis: 'wie Sie die richtigen 3 bis 5 SERP-Wettbewerber für Ihren Gap-Export bestimmen' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und nutzerorientierte Inhalte erstellen', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien (Missbrauch durch skalierte Inhaltserstellung)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen (AI Overviews & AI Mode) und Ihre Website', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/updates', nazwa: 'Google Search Central Changelog: Einstellung der FAQ-Rich-Results (Mai/Juni 2026)', data: '2026-11-22' },
  ],
};
