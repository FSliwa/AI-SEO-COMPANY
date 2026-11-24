// Daten des deutschen Ratgebers /de/blog/google-ai-mode (24.11.2026; Schluessel PL: /blog/google-ai-mode-jak-sie-pojawic).
// Hauptkeywords: "google ai mode", "google ki-modus", "query fan-out seo".
// Fakten geprueft gegen Google Search Central (ai-features), Google Blog (20.05.2025 & 07.10.2025),
// Search Console Hilfe (Web-Reporting) sowie transparente Abgrenzung unserer eigenen DataForSEO-API-Messdaten (04.-05.11.2026).

export const BLOG_GOOGLE_AI_MODE_DE = {
  fallbackPfad: '/blog/google-ai-mode',
  okruszek: 'Google AI Mode (KI-Modus)',
  kategoria: 'KI-Suche & Query Fan-Out',
  h1: 'Google AI Mode (KI-Modus): Wie Query Fan-Out funktioniert und wie B2B-Seiten zitiert werden',
  opublikowano: '2026-11-24',
  aktualisiert: '2026-11-24',
  kurzantwort: 'Der Google AI Mode (auf Deutsch Google KI-Modus) ist ein eigener, dialogorientierter Suchmodus für mehrstufige Vergleiche und Folgefragen. Über die Technik Query Fan-Out zerlegt Google komplexe Fragen gleichzeitig in zahlreiche Unterabfragen. Als Quellen erscheinen Websites aus dem regulären Google-Index, die indexiert, für Snippets freigegeben und inhaltlich präzise gegliedert sind.',
  lead: 'Während klassische AI Overviews als kurze Zusammenfassung über der gewohnten Trefferliste erscheinen, verwandelt der Google AI Mode die Suche in ein mehrstufiges Recherchegespräch. In diesem Leitfaden zeigen wir auf Basis der offiziellen Google-Dokumentation, was der Google KI-Modus technisch anders macht, warum die Daten ohne eigenen Spezialfilter im Search-Console-Suchtyp „Web“ landen und wie B2B-Websites über Query Fan-Out SEO Teilfragen-Zitate gewinnen.',
  sekcje: [
    {
      id: 'unterschied-ai-mode-und-ai-overviews',
      h2: 'Google AI Mode (Google KI-Modus) vs. klassische AI Overviews: Der genaue Unterschied',
      html: [
        '<p>Google beschreibt den <strong>Google AI Mode</strong> (in deutschsprachigen Oberflächen als <strong>Google KI-Modus</strong> bezeichnet) als eigenständige Suchansicht für komplexe Aufgaben, die mehrstufiges Schlussfolgern (Multi-Step Reasoning), tiefere Produkt- oder Anbietervergleiche und interaktive Folgefragen erfordern. Vorgestellt wurde die Architektur samt Query-Fan-Out-Verfahren auf der Google I/O am 20. Mai 2025 und ab Oktober 2025 schrittweise auf über 200 Länder und Regionen sowie mehr als 35 Sprachen ausgeweitet (wobei einzelne Modellstufen und Personalisierungsfunktionen eigene Alters-, Kontoverlaufs- oder Abo-Bedingungen voraussetzen).</p>',
        '<p>Für Website-Betreiber im B2B sind vor allem zwei Punkte entscheidend: Erstens gelten für beide Oberflächen exakt dieselben technischen Grundvoraussetzungen für Quellenzitate; zweitens unterscheiden sich Auslösung, Gesprächsverlauf und Positionszählung in der Google Search Console deutlich.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-ai-overviews-vs-ai-mode',
        caption: 'Klassische Google AI Overviews und Google AI Mode (KI-Modus) im technischen Vergleich',
        columns: [
          { key: 'merkmal', label: 'Merkmal' },
          { key: 'aiOverviews', label: 'Klassische Google AI Overviews' },
          { key: 'aiMode', label: 'Google AI Mode (KI-Modus)' },
        ],
        rows: [
          {
            id: 'ausloesung',
            merkmal: 'Wie die Ansicht startet',
            aiOverviews: 'Automatisch oberhalb der klassischen Suchergebnisse, wenn Google eine Kurzübersicht als hilfreich einstuft',
            aiMode: 'Bewusster Wechsel der Nutzerin oder des Nutzers in den separaten Tab bzw. Modus „KI-Modus“',
          },
          {
            id: 'interaktion',
            merkmal: 'Tiefe & Dialogverlauf',
            aiOverviews: 'Kompakte Einzelzusammenfassung mit begleitenden Quellenkarten über der normalen SERP',
            aiMode: 'Mehrstufige Ausarbeitung (Multi-Step Reasoning) mit direktem Eingabefeld für vertiefende Folgefragen',
          },
          {
            id: 'unterabfragen',
            merkmal: 'Rolle von Query Fan-Out',
            aiOverviews: 'Ergänzende Unterabfragen zur Absicherung der Kernthesen',
            aiMode: 'Breite parallele Auffächerung in Teilfragen über Unterthemen, Vergleiche und Randbedingungen hinweg',
          },
          {
            id: 'gsc-position',
            merkmal: 'Positionszählung in Search Console',
            aiOverviews: 'Der gesamte KI-Block belegt eine gemeinsame Position für alle darin verlinkten Quellen',
            aiMode: 'Berechnung nach den Standardregeln einer Ergebnisseite für die eingeblendeten Verweise',
          },
          {
            id: 'folgefragen',
            merkmal: 'Zählung von Folgefragen',
            aiOverviews: 'Kein mehrstufiger Chat-Verlauf innerhalb des Blocks',
            aiMode: 'Jede gestellte Folgefrage wird in der Search Console als eigenständige neue Suchanfrage gewertet',
          },
          {
            id: 'voraussetzung',
            merkmal: 'Technische Zitier-Bedingung',
            aiOverviews: 'Seite im Google-Index und für Text-Snippets berechtigt (keine Sonder-Tags nötig)',
            aiMode: 'Exakt identisch: reguläre Googlebot-Indexierung und freie Snippet-Ausgabe ohne Zusatzdateien',
          },
        ],
        przypis: 'Quellen: Google Search Central (AI features and your website) sowie Google Search Console-Hilfe zum Leistungsbericht (geprüft am 18.11.2026).',
      },
      htmlPo: '<p>Den vollständigen On-Page-Leitfaden samt 30-Tage-Fahrplan für beide Oberflächen finden Sie in unserem Hauptartikel <a href="/de/blog/google-ai-overviews-optimieren">Google AI Overviews optimieren</a>; wie Google dabei im Vergleich zu ChatGPT und Perplexity vorgeht, zeigt die Gegenüberstellung <a href="/de/vergleiche/chatgpt-search-vs-perplexity-vs-ai-overviews">ChatGPT Search vs Perplexity vs Google AI Overviews</a>.</p>',
    },
    {
      id: 'query-fan-out-seo-funktionsweise',
      h2: 'Query Fan-Out SEO: Wie Google komplexe B2B-Fragen in Teilabfragen zerlegt',
      html: [
        '<p>Das Herzstück hinter <strong>Query Fan-Out SEO</strong> ist ein Wechsel von der einzelnen Keyword-Zeile hin zum gesamten Entscheidungsbaum eines Einkäufers. Stellt ein Produktionsleiter im Google KI-Modus etwa die Frage: <em>„Welche Industriesoftware eignet sich für die Fertigungsplanung mit 120 Mitarbeitenden inklusive ERP-Anbindung, Einführungsdauer und Lizenzkosten?“</em>, sucht das Modell nicht stur nach einer einzigen Seite, die zufällig alle zwölf Wörter im Title-Tag trägt.</p>',
        '<p>Stattdessen zerlegt der Google AI Mode die Anfrage im Hintergrund parallel in mehrere Teilabfragen - zum Beispiel nach Systemanforderungen ab 100 Nutzern, vorhandenen Schnittstellen zu gängigen ERP-Systemen, realistischen Einführungszeiträumen in Wochen sowie typischen Lizenz- und Implementierungskosten. Anschließend führt das Modell die belastbarsten Passagen verschiedener Fachseiten zu einer strukturierten Gesamtantwort mit klickbaren Quellenkarten zusammen.</p>',
        '<p>Ein wichtiges Detail aus der offiziellen Google-Suche-Hilfe: Wenn die Systeme bei einer Teilfrage <strong>nur geringe Antwortsicherheit</strong> erreichen, blendet der KI-Modus bewusst klassische Weblinks statt einer spekulativen Textsynthese ein und fordert Nutzer aktiv auf, wichtige Fakten auf den verlinkten Zielseiten gegenzuprüfen. Eine fachlich präzise Unterseite wird dadurch nicht überflüssig, sondern zum primären Vertrauensanker für den Klick.</p>',
      ].join(''),
    },
    {
      id: 'sechs-hebel-fuer-b2b-zitate',
      h2: '6 konkrete Hebel, mit denen B2B-Seiten Sub-Query-Zitate im Google AI Mode gewinnen',
      html: [
        '<p>Google veröffentlicht keine geheime Gewichtungsformel für den KI-Modus und gibt keine Zitiergarantie ab. Wer jedoch verhindern will, dass die eigene Website trotz starker Fachkompetenz durch das Raster fällt, sollte seine wichtigsten Leistungs- und Beratungsseiten auf diese sechs Punkte ausrichten:</p>',
        '<ol>',
        '<li><strong>Indexierbarkeit und Snippet-Freigabe absichern:</strong> Kontrollieren Sie in <code>robots.txt</code>, HTTP-Headern (<code>X-Robots-Tag</code>) und Meta-Tags, dass weder <code>noindex</code> noch <code>nosnippet</code> oder <code>max-snippet:0</code> Ihre Kerntexte sperren. Eine Blockade von <code>Google-Extended</code> betrifft nur das Gemini-Training, nicht die Google-Suche (Prüfschritte in unserer <a href="/de/blog/technischer-seo-audit-checkliste">Technischen SEO Audit Checkliste</a>).</li>',
        '<li><strong>Teilfragen und 2.-/3.-Runden-Folgefragen aufbauen:</strong> Überlegen Sie vorab, was ein Interessent in der zweiten und dritten Dialogrunde nachfragt - Integrationsaufwand, Vertragslaufzeiten, Ausschlusskriterien („Für wen eignet sich die Lösung nicht?“) und Alternativen - und widmen Sie jeder dieser Teilfragen eine klare <code>H2</code>/<code>H3</code> mit direkter 2-Satz-Antwort am Absatzbeginn.</li>',
        '<li><strong>Saubere HTML-Vergleichsmatrizen bereitstellen:</strong> Weil der Google KI-Modus besonders häufig für komplexe Gegenüberstellungen genutzt wird, liefern strukturierte <code>&lt;table&gt;</code>-Matrizen („Option A vs. Option B nach Kosten, Zeitbedarf und Risiko“) exakt das Raster, das Sprachmodelle fehlerarm auslesen können.</li>',
        '<li><strong>Transparente Preise und Leistungsgrenzen nennen:</strong> Verstecken Sie Preisspannen nicht hinter „Preis nur auf Anfrage“. Nachvollziehbare Euro-Korridore, Paketgrenzen und Stundensätze beantworten genau jene kaufnahen Unterabfragen, bei denen generische Wettbewerbertexte schweigen.</li>',
        '<li><strong>Eigene Originaldaten in sauberem SSR-HTML veröffentlichen:</strong> Liefern Sie echte Messreihen, Fallstudienwerte, Normtabellen und technische Fakten direkt im serverseitig gerenderten HTML aus - niemals ausschließlich als Bilddatei oder hinter clientseitigen JavaScript-Interaktionen. Prüfen Sie Ihre Seitenstruktur kostenlos im Tool <a href="/de/tools/geo-zitierbarkeit-pruefen">GEO-Zitierbarkeit prüfen</a>.</li>',
        '<li><strong>Entitätsdaten über Website, Schema und Unternehmensprofil synchron halten:</strong> Achten Sie darauf, dass Firmenname, Leistungsumfang, Preise, Öffnungszeiten und Kontaktdaten auf der Website, im JSON-LD-Schema, im Merchant Center und in Ihrem <a href="/de/google-unternehmensprofil-optimieren">Google Unternehmensprofil</a> widerspruchsfrei übereinstimmen und verbinden Sie Ratgeber sauber per interner Verlinkung mit der passenden Leistungsseite.</li>',
        '</ol>',
      ].join(''),
    },
    {
      id: 'search-console-messung-und-eigene-stichprobe',
      h2: 'Reporting in der Google Search Console - und unsere methodische Transparenz',
      html: [
        '<p>Viele Marketing-Teams suchen in der Google Search Console vergeblich nach einem eigenen Suchtyp-Filter namens „AI Mode“. Laut offizieller Search-Console-Dokumentation (<code>support.google.com/webmasters/answer/7042828</code>) werden sämtliche Klicks und Impressionen aus dem Google AI Mode direkt in den regulären Leistungsbericht unter dem Suchtyp <strong>Web</strong> eingerechnet: Ein Klick auf einen ausgehenden Quellenlink zählt als regulärer Klick, und jede vom Nutzer gestellte Folgefrage taucht als eigene neue Suchanfrage im Bericht auf (Daten aus Search-Labs-Experimenten bleiben außen vor; der seit Ende August 2026 ergänzte Übersichtsbericht zur generativen KI-Leistung fasst generative Suchfunktionen übergreifend zusammen, ersetzt aber keinen Einzelabgleich auf Fragenebene).</p>',
        '<h3>Was wir selbst gemessen haben - und was ausdrücklich nicht</h3>',
        '<p>Zur sauberen Einordnung: Wir haben <strong>keine automatisierte Einzelmessung des Google AI Mode</strong> durchgeführt und erfinden dafür keine Quoten. Was wir am 04. und 05. November 2026 über die DataForSEO LLM Responses API gemessen haben, war das Quellenverhalten von ChatGPT (<code>gpt-4.1-mini</code> mit Websuche, Standort Warschau) und Perplexity (<code>sonar</code>) bei 20 typischen Dienstleistungs- und Agenturanfragen:</p>',
        '<ul>',
        '<li><strong>Lokale Anbieterempfehlungen (11 Antworten in ChatGPT):</strong> 62 ausgegebene Links, davon führten <strong>59 direkt zu Google-Maps-Suchergebnissen</strong>.</li>',
        '<li><strong>Fragen nach Preisen und Agentur-Rankings (5 Antworten in ChatGPT):</strong> 31 ausgegebene Links, 0 zu Maps - <strong>alle 31 verwiesen auf Websites, Preislisten und Vergleichsseiten</strong>.</li>',
        '<li><strong>Allgemeine Grundlagenfragen (4 Antworten):</strong> 0 Links, da das Modell ohne Webabruf aus dem Trainingswissen antwortete.</li>',
        '</ul>',
        '<p>Diese kleine API-Stichprobe belegt keine internen Rankingfaktoren des Google KI-Modus, illustriert aber ein Muster, das sich durch jede dialogbasierte Suche zieht: Sobald Einkäufer nach Preisen, Rahmenbedingungen und Anbietervergleichen fragen, gewinnen Domains mit offenen Preistabellen und klaren Vergleichsmatrizen. Wenn Sie für Ihr Unternehmen 30 reale Einkäuferfragen systematisch über ChatGPT, Gemini, Perplexity und Google AI Overviews auswerten lassen möchten, übernimmt das unser <a href="/de/ki-suchoptimierung/ki-sichtbarkeit-audit">KI-Sichtbarkeit Audit</a> (235 Euro netto einmalig, laufendes Wochen-Monitoring optional für 115 Euro netto im Monat; Hinweis: das Audit prüft in Google die AI Overviews, keinen separaten AI-Mode-Scraper).</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zum Google AI Mode (KI-Modus) und Query Fan-Out',
  faq: [
    {
      id: 'ist-google-ai-mode-in-europa-verfuegbar',
      question: 'Ist der Google AI Mode (Google KI-Modus) bereits in Europa und auf Deutsch nutzbar?',
      answer: 'Google hat den AI Mode nach dem US-Start vom Mai 2025 im Oktober 2025 auf über 200 Länder und Regionen sowie mehr als 35 Sprachen ausgeweitet. Beachten Sie laut offizieller Google-Suche-Hilfe, dass personalisierte Funktionen und bestimmte neuere Gemini-Modellstufen zusätzliche Voraussetzungen wie ein Mindestalter von 18 Jahren, aktivierten Suchverlauf oder kostenpflichtige Google-AI-Abos haben und je nach Land zeitversetzt freigeschaltet werden.',
    },
    {
      id: 'braucht-google-ai-mode-spezielle-tags-oder-llms-txt',
      question: 'Benötigt meine Website spezielle Meta-Tags oder eine llms.txt für den Google AI Mode?',
      answer: 'Nein. Laut Google Search Central gelten für den Google AI Mode exakt dieselben technischen Voraussetzungen wie für klassische Snippets und AI Overviews: Die Seite muss über den Googlebot indexiert und für die Anzeige mit einem Textausschnitt berechtigt sein. Spezielle Schema-Typen oder Zusatzdateien wie llms.txt verlangt Google nicht.',
    },
    {
      id: 'wo-sehe-ich-google-ai-mode-klicks-in-search-console',
      question: 'Wo erscheinen Klicks und Impressionen aus dem Google AI Mode in der Google Search Console?',
      answer: 'Sie fließen direkt in den regulären Leistungsbericht unter dem Suchtyp Web ein, ohne dass es dort einen isolierten Einzel-Filter nur für den AI Mode gibt. Jede im Dialog gestellte Folgefrage zählt dabei als neue Suchanfrage. Daten aus vorläufigen Search-Labs-Tests werden nicht in die Search Console übernommen.',
    },
    {
      id: 'wie-kann-ich-google-ai-mode-ausschliessen',
      question: 'Kann ich meine Inhalte für den Google AI Mode sperren, ohne aus dem Google-Index zu fallen?',
      answer: 'Über die regulären Snippet-Direktiven nosnippet, data-nosnippet und max-snippet steuern Sie, welche Textteile Google als Ausschnitt und damit auch in AI Overviews und im AI Mode verwenden darf. Da dieselben Regeln für klassische Suchergebnisse gelten, schränken Sie damit zugleich Ihre normalen Text-Snippets ein. Ein Sperren von Google-Extended wirkt nur auf das Gemini-Training, nicht auf die Google-Suche.',
    },
    {
      id: 'wie-schnell-wirken-aenderungen-im-google-ki-modus',
      question: 'Wie schnell wird meine Seite nach einer Überarbeitung im Google KI-Modus zitiert?',
      answer: 'Google nennt keinen festen Zeitrahmen und betont in der Dokumentation, dass weder Indexierung noch Zitate garantiert sind. Da KI-Antworten je nach Formulierung und Kontext variieren, sollten Sie 20 bis 30 feste Einkäuferfragen im Monatsrhythmus prüfen, statt aus einem einzelnen Testabruf nach wenigen Tagen voreilige Schlüsse zu ziehen.',
    },
  ],
  powiazane: [
    { href: '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews', tekst: 'Google AI Overviews optimieren (30-Tage-Plan)', opis: 'kompletter Praxisleitfaden zu Technik, 40-bis-60-Wörter-Antwortblöcken und unserer 141-Zitate-Studie' },
    { href: '/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews', tekst: 'ChatGPT Search vs Perplexity vs AI Overviews', opis: 'direkter Systemvergleich von Index-Quellen, KI-Crawlern und B2B-Messung' },
    { href: '/narzedzia/sprawdz-cytowalnosc-strony-ai', tekst: 'GEO-Zitierbarkeit kostenlos prüfen', opis: 'bewertet Ihre Unterseiten live nach Answer-First-Struktur, Tabellen und Fakten-Dichte' },
    { href: '/pozycjonowanie-w-ai/audyt-widocznosci', tekst: 'KI-Sichtbarkeit Audit (30 Kundenfragen)', opis: 'systematische Auswertung Ihrer Marken- und Wettbewerbszitate mit konkretem 90-Tage-Plan' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website (Technische Voraussetzungen für AI Overviews & AI Mode)', data: '2026-11-18' },
    { url: 'https://support.google.com/websearch/answer/16011537', nazwa: 'Google-Suche-Hilfe: AI Mode (KI-Modus) - Funktionen, Verfügbarkeit und Kontoanforderungen', data: '2026-11-18' },
    { url: 'https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/', nazwa: 'The Keyword (Google Blog): AI Mode in Google Search & Query Fan-Out Architektur (20.05.2025)', data: '2026-11-18' },
    { url: 'https://blog.google/products-and-platforms/products/search/ai-mode-expands-languages-locations/', nazwa: 'The Keyword (Google Blog): AI Mode expands to more languages and over 200 countries/territories (07.10.2025)', data: '2026-11-18' },
    { url: 'https://support.google.com/webmasters/answer/7042828', nazwa: 'Google Search Console-Hilfe: Leistungsbericht (Zählweise von AI Overviews, AI Mode und Folgefragen im Suchtyp Web)', data: '2026-11-18' },
    { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Google Search Console-Hilfe: Bericht zur Leistung in generativer KI (Generative AI performance)', data: '2026-11-19' },
    { url: 'https://support.google.com/websearch/answer/14901683', nazwa: 'Google-Suche-Hilfe: Übersicht mit KI (AI Overviews) in den Google-Suchergebnissen', data: '2026-11-18' },
  ],
};
