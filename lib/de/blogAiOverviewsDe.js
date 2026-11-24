// Daten des deutschen Ratgebers /de/blog/google-ai-overviews-optimieren (24.11.2026; Schluessel PL: /blog/jak-zoptymalizowac-strone-pod-google-ai-overviews).
// Hauptkeywords: "google ai overviews optimieren", "ki-uebersicht google", "in ai overviews erscheinen".
// Fakten geprueft gegen Google Search Central (ai-features, Google-Extended, Search Console Web-Reporting)
// sowie unsere eigene DataForSEO-Studie vom 04.11.2026 (30 Branchen-Keywords, 20 verglichene SERPs, 141 Zitate, 85 Domains, 28 % Top-10-Deckung, 25 % YouTube).

export const BLOG_AI_OVERVIEWS_DE = {
  fallbackPfad: '/blog/google-ai-overviews-optimieren',
  okruszek: 'Google AI Overviews optimieren',
  kategoria: 'KI-Suche & Generative Engine Optimization',
  h1: 'Google AI Overviews optimieren: Wie Ihre Website in Googles KI-Übersicht zitiert wird',
  opublikowano: '2026-11-24',
  aktualisiert: '2026-11-24',
  kurzantwort: 'Wer seine Website für Google AI Overviews optimieren will, braucht zwei Dinge: saubere Indexierung mit Snippet-Freigabe durch den Googlebot und eigenständige Abschnitte, die konkrete Nutzerfragen direkt unter der Überschrift in 40 bis 60 Wörtern mit überprüfbaren Zahlen beantworten. Google verlangt weder spezielle KI-Meta-Tags noch eine ai.txt- oder llms.txt-Datei.',
  lead: 'Immer mehr B2B-Suchanfragen starten heute oberhalb der klassischen zehn blauen Links mit einer generativen Zusammenfassung (im deutschen Interface oft als „Übersicht mit KI“ bzw. KI-Übersicht Google bezeichnet). Dieser Leitfaden verbindet Googles offizielle Search-Central-Dokumentation mit unserer eigenen SERP-Messung zu 141 AI-Overview-Zitaten und liefert einen realistischen 30-Tage-Plan für Marketing- und Redaktionsteams.',
  sekcje: [
    {
      id: 'ki-uebersicht-google-daten-und-regeln',
      h2: 'KI-Übersicht Google: Offizielle Google-Regeln und unsere Studie zu 141 Zitaten',
      html: [
        '<p>Die wichtigste Klarstellung aus der offiziellen Dokumentation von Google Search Central (<em>AI features and your website</em>) vorweg: Es gibt <strong>keine speziellen KI-Meta-Tags</strong>, kein geheimes Schema.org-Vokabular und keine Pflichtdatei wie <code>ai.txt</code> oder <code>llms.txt</code>, um <strong>in AI Overviews erscheinen</strong> zu können. Technisch stellt Google exakt zwei Grundbedingungen: Die Seite muss im regulären Google-Index liegen und für die Anzeige mit einem normalen Textausschnitt (Snippet) freigegeben sein.</p>',
        '<p>Gleichzeitig unterscheiden sich die zitierten Quellen massiv von der klassischen Top-10-Trefferliste. Weil Google komplexe Suchanfragen im Hintergrund in mehrere Unterfragen auffächert (<em>Query Fan-Out</em>), zieht die <strong>KI-Übersicht Google</strong> oft Fachseiten heran, die eine präzise Teilfrage beantworten - selbst wenn diese URL zum Hauptbegriff nicht auf Platz 1 bis 3 steht.</p>',
        '<h3>Was unsere eigene DataForSEO-Messung gezeigt hat</h3>',
        '<p>Am 04. November 2026 haben wir über die DataForSEO-API <strong>30 Branchen-Keywords</strong> rund um SEO, KI-Suche, Preise und Tools ausgewertet (Google Polen, Desktop; Methodik identisch dokumentiert in unserem Vergleich <a href="/de/vergleiche/seo-vs-geo">SEO vs GEO</a>). Bei allen 30 Suchbegriffen blendete Google eine AI Overview ein. Für 20 eindeutig fachbezogene Suchanfragen mit vollständiger Quellenliste haben wir sämtliche Quellenkarten gegen die organischen Top 10 desselben Keywords abgeglichen:</p>',
        '<ul>',
        '<li><strong>141 Quellenzitate verteilt auf 85 eindeutige Domains:</strong> Google bündelt pro Übersicht im Schnitt rund sieben verschiedene Beleglinks statt nur einer einzelnen Gewinner-Domain.</li>',
        '<li><strong>Nur 28 % Überschneidung mit den klassischen Top 10:</strong> Lediglich 40 der 141 Zitate stammten von URLs, die für exakt denselben Suchbegriff auch in den ersten zehn organischen Treffern standen. Über zwei Drittel der zitierten Seiten gewannen über spezifische Teilantworten.</li>',
        '<li><strong>25 % YouTube-Präsenz:</strong> Bei 5 von 20 verglichenen Suchanfragen (25 %) zitierte die AI Overview mindestens ein Video auf <code>youtube.com</code> - gut strukturierte Erklärvideos mit Kapitelmarken und Transkript sind damit ein direkter Zitierkanal.</li>',
        '</ul>',
        '<p>Transparenzhinweis: Diese Stichprobe stammt vom polnischen Desktop-Suchmarkt (Standort Warschau) und schwankt von Tag zu Tag; sie belegt keine feste Quote für jede DACH-Branche, zeigt aber glasklar, warum reines Hauptkeyword-Denken zu kurz greift.</p>',
      ].join(''),
    },
    {
      id: 'technische-voraussetzungen-und-snippet-kontrolle',
      h2: 'Technische Basis: Snippet-Steuerung, SSR-HTML, JSON-LD @graph und KI-Crawler',
      html: [
        '<p>Bevor Ihre Redaktion einen einzigen Absatz umschreibt, müssen vier technische Bremsen gelöst werden, an denen B2B-Seiten in unseren Audits regelmäßig scheitern:</p>',
        '<ul>',
        '<li><strong>Snippet-Direktiven prüfen</strong> (<code>nosnippet</code> und <code>max-snippet</code>): Google steuert die KI-Übersicht über dieselben Robots-Regeln wie klassische Textausschnitte. Ein versehentliches <code>nosnippet</code>, ein zu enges <code>max-snippet:0</code> im CMS-Template oder <code>data-nosnippet</code> um den Hauptinhalt verhindert, dass Google Ihre Passage in AI Overviews zitiert. Ein <code>noindex</code> entfernt die Seite komplett.</li>',
        '<li><strong><code>Google-Extended</code> nicht mit Search-SEO verwechseln:</strong> Der Token <code>Google-Extended</code> in der <code>robots.txt</code> regelt laut Google-Dokumentation ausschließlich, ob Inhalte für das Training und externe Grounding von Gemini-Modellen und Vertex AI genutzt werden dürfen - er hat <strong>keinen Einfluss auf Google Search oder AI Overviews</strong>. Maßgeblich für die Suche bleibt der reguläre <code>Googlebot</code>.</li>',
        '<li><strong>Serverseitig gerendertes HTML (SSR) statt JavaScript-Hürden:</strong> Antworten, Preistabellen oder technische Spezifikationen, die erst nach einem Klick auf Tabs, Akkordeons oder per nachgeladenem Client-Skript im DOM auftauchen, werden beim Abruf deutlich seltener extrahiert. Liefern Sie Kernfakten direkt im initialen HTML aus (alle technischen Grenzwerte finden Sie in unserer <a href="/de/blog/technischer-seo-audit-checkliste">Technischen SEO Audit Checkliste</a>).</li>',
        '<li><strong>Verbundener JSON-LD <code>@graph</code> synchron zum sichtbaren Text:</strong> Auch wenn es kein spezielles „AI-Schema“ gibt, hilft ein sauber verknüpfter JSON-LD-<code>@graph</code> aus <code>Organization</code>, <code>Service</code> bzw. <code>Product</code>, <code>BlogPosting</code>, <code>BreadcrumbList</code> und <code>FAQPage</code> (mit stabilen <code>@id</code>-Ankern und identischen Preisen/Autorendaten wie im sichtbaren HTML), Ihre Unternehmensentität eindeutig zuzuordnen. Prüfen Sie Ihr Markup kostenfrei in unserem <a href="/de/tools/entity-graph-json-ld-validator">JSON-LD Entitäts-Graph Validator</a> oder nutzen Sie unsere <a href="/de/tools/schema-markup-beispiele">Schema Markup Beispiele</a>.</li>',
        '</ul>',
        '<p>Denken Sie parallel an externe Antwortmaschinen wie Perplexity: Während Google den <code>Googlebot</code> nutzt, benötigt Perplexity freien Zugang für den <code>PerplexityBot</code> in <code>robots.txt</code> und Ihrer WAF/Cloudflare-Konfiguration (Änderungen wirken binnen rund 24 Stunden).</p>',
      ].join(''),
    },
    {
      id: 'in-ai-overviews-erscheinen-content-aufbau',
      h2: 'In AI Overviews erscheinen: Answer-First-Blöcke (40-60 Wörter) und HTML-Tabellen',
      html: [
        '<p>Sprachmodelle lesen Fachartikel nicht linear von der Einleitung bis zum Fazit, sondern zerlegen das Dokument in semantische Textblöcke (Passagen) und bewerten, welcher Abschnitt eine Teilfrage am präzisesten beantwortet. Wenn Sie gezielt <strong>Google AI Overviews optimieren</strong> möchten, strukturieren Sie jede wichtige Leistungs- und Ratgeberseite nach vier festen Redaktionsregeln:</p>',
        '<h3>1. H2- und H3-Überschriften als echte Einkäuferfragen formulieren</h3>',
        '<p>Ersetzen Sie abstrakte Ein-Wort-Überschriften wie „Konditionen“ oder „Leistungsparameter“ durch konkrete Fragen aus Vertrieb und Search Console, etwa „Was kostet die Einführung eines B2B-Kundenportals?“ oder „Welche Toleranzen gelten beim CNC-Fräsen von Aluminium?“. Wie Sie fehlende Kundenfragen systematisch aufdecken, zeigt unser Leitfaden zur <a href="/de/blog/content-gap-analyse">Content Gap Analyse</a>.</p>',
        '<h3>2. Answer-First-Block von 40 bis 60 Wörtern direkt unter jeder Überschrift</h3>',
        '<p>Beantworten Sie die Frage aus der Überschrift sofort in den ersten zwei bis drei Sätzen (rund <strong>40 bis 60 Wörter</strong>) vollständig und ohne Floskeln. Erst danach folgen Ausnahmen, Rechenbeispiele und Kontext:</p>',
        '<ul>',
        '<li><strong>Schlecht zitierbar:</strong> „Die Kosten einer technischen Website-Prüfung hängen von zahlreichen individuellen Faktoren, der Unternehmensgröße und der historischen Entwicklung ab, worauf wir im Folgenden näher eingehen.“</li>',
        '<li><strong>Direkt zitierbar (Answer-First):</strong> „Ein technisches B2B-SEO-Audit dauert je nach Seitenumfang 3 bis 5 Werktage und kostet bei klarem Prüfumfang ab 350 Euro netto. Enthalten sind Crawling, Indexierungs- und Core-Web-Vitals-Analyse in der Search Console sowie ein priorisierter Maßnahmenplan für Entwickler und Redaktion.“</li>',
        '</ul>',
        '<h3>3. Echte HTML-Vergleichstabellen und eigene Messdaten</h3>',
        '<p>Verpacken Sie Parametervergleiche, Tarifstufen und Vor- und Nachteile niemals als PNG-Grafik, sondern als semantisches <code>&lt;table&gt;</code>-Markup mit klaren Spaltenköpfen (<code>&lt;th scope=&quot;col&quot;&gt;</code>). Ergänzen Sie nachweisbare Erstparteien-Daten - eigene Stichproben, reale Durchlaufzeiten, geprüfte Normwerte und ein namentliches Autorenprofil mit echter Praxiserfahrung (36 Prüfpunkte dazu in unserer <a href="/de/tools/e-e-a-t-checkliste">E-E-A-T Checkliste</a>). Wie gut eine bestehende URL diese RAG-Kriterien bereits erfüllt, messen Sie in Sekunden mit unserem Tool <a href="/de/tools/geo-zitierbarkeit-pruefen">GEO-Zitierbarkeit prüfen</a>.</p>',
      ].join(''),
    },
    {
      id: 'messung-search-console-und-30-tage-plan',
      h2: 'Messung in der Google Search Console und 30-Tage-Aktionsplan',
      html: [
        '<p>Laut offizieller Search-Console-Hilfe fließen Impressionen und Klicks aus AI Overviews und dem Google AI Mode direkt in den regulären Leistungsbericht unter dem Suchtyp <strong>Web</strong> ein: Bei einer AI Overview teilen sich alle enthaltenen Quellenlinks dieselbe Block-Position; ein Klick auf eine externe Quellenkarte zählt regulär als Klick (Experimente aus den Search Labs sind ausgenommen; ergänzend weist Google seit Ende August 2026 einen gebündelten Bericht zur generativen KI-Leistung aus, der jedoch keine einzelnen Konkurrenz-Zitate pro Frage aufschlüsselt).</p>',
        '<p>Führen Sie deshalb zusätzlich zur Search Console ein schlankes Zitier-Protokoll für <strong>20 bis 30 kaufnahe Kernfragen</strong> Ihrer Branche (monatlicher Trendvergleich im Inkognito-Fenster plus GA4-Segment für Verweise von <code>chatgpt.com</code> und <code>perplexity.ai</code>) oder prüfen Sie den Status direkt unter <a href="/de/ki-sichtbarkeit-pruefen">KI-Sichtbarkeit prüfen</a>. Mit dem folgenden 30-Tage-Plan setzen auch kleine Teams die Optimierung strukturiert um:</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-30-tage-plan-ai-overviews',
        caption: 'Praxiserprobter 30-Tage-Plan zur Optimierung bestehender B2B-Seiten für Google AI Overviews',
        columns: [
          { key: 'zeitraum', label: 'Zeitraum' },
          { key: 'aufgaben', label: 'Konkrete Maßnahmen im Team' },
          { key: 'ergebnis', label: 'Messbares Ergebnis' },
        ],
        rows: [
          {
            id: 'tage-1-5',
            zeitraum: 'Tage 1-5',
            aufgaben: '20 bis 30 kaufnahe Kundenfragen auswählen, Ist-Zustand in Google AI Overviews und Perplexity dokumentieren, Search-Console-Daten (Suchtyp Web) exportieren',
            ergebnis: 'Belastbare Nullmessung und priorisierte Liste von 5 bis 10 Ziel-URLs',
          },
          {
            id: 'tage-6-10',
            zeitraum: 'Tage 6-10',
            aufgaben: 'Technik-Prüfung: Indexierung, robots.txt, WAF/Cloudflare, versehentliche nosnippet-/max-snippet-Tags sowie SSR-HTML-Vollständigkeit kontrollieren',
            ergebnis: 'Fehlerliste aller technischen Zitier-Blockaden',
          },
          {
            id: 'tage-11-15',
            zeitraum: 'Tage 11-15',
            aufgaben: 'Technische Korrekturen live stellen, Googlebot und PerplexityBot verifizieren und bereinigte URLs über die URL-Prüfung in der Search Console testen',
            ergebnis: 'Alle Schwerpunktseiten sind indexiert und voll snippet-berechtigt',
          },
          {
            id: 'tage-16-22',
            zeitraum: 'Tage 16-22',
            aufgaben: '5 bis 10 Kernseiten überarbeiten: Frage-Überschriften (H2/H3), 40-bis-60-Wörter-Answer-First-Blöcke, HTML-Vergleichstabellen, Primärquellen und Autorenbox',
            ergebnis: 'Eigenständig extrahierbare Antwortabschnitte mit echten Fachdaten',
          },
          {
            id: 'tage-23-26',
            zeitraum: 'Tage 23-26',
            aufgaben: 'Konsistenten JSON-LD-@graph abgleichen, interne Cluster-Verlinkung schärfen, Google Unternehmensprofil aktualisieren und Erklärgrafiken/Videos ergänzen',
            ergebnis: 'Eindeutiger Entitätskontext über Website, Schema und Drittprofile',
          },
          {
            id: 'tage-27-30',
            zeitraum: 'Tage 27-30',
            aufgaben: 'Wiederholungsmessung derselben 20 bis 30 Fragen, GA4-Bericht für KI-Referrals einrichten und nächste Seitenwelle für Monat 2 festlegen',
            ergebnis: 'Erster Vorher-Nachher-Trend und laufender Redaktionsstandard',
          },
        ],
        przypis: 'Wichtiger Hinweis: Google benötigt für erneutes Crawling und Neubewertung je nach Domain-Autorität einige Tage bis mehrere Wochen. Bewerten Sie Fortschritte immer im Monatsvergleich statt nach einzelnen Tagesabrufen.',
      },
      htmlPo: '<p>Wie sich die klassische KI-Übersicht über den Suchergebnissen vom dialogorientierten Suchmodus unterscheidet, lesen Sie im vertiefenden Beitrag zum <a href="/de/blog/google-ai-mode">Google AI Mode (KI-Modus)</a>. Wenn wir Indexierung, Snippet-Regeln und Zitierbarkeit komplett für Ihre Domain prüfen sollen, starten Sie mit unserem <a href="/de/seo-audit">SEO Audit</a> oder unserer laufenden <a href="/de/ki-suchoptimierung">Generative Engine Optimization (GEO)</a>.</p>',
    },
  ],
  faqTytul: 'Häufige Fragen zur Optimierung für Google AI Overviews',
  faq: [
    {
      id: 'kann-man-platz-in-ai-overviews-kaufen',
      question: 'Kann ich Google dafür bezahlen, als Quelle in den AI Overviews zitiert zu werden?',
      answer: 'Nein. Laut Google Search Central gibt es weder eine bezahlte Anmeldung noch eine Garantie für ein Quellenzitat in AI Overviews. Voraussetzung ist allein die reguläre Indexierung und Berechtigung für Text-Snippets. Google Ads ist ein getrennter Werbekanal und kauft keine organischen Quellennennungen im KI-Zusammenfassungstext.',
    },
    {
      id: 'in-ai-overviews-ohne-top-10',
      question: 'Kann meine Website in AI Overviews erscheinen, obwohl sie nicht in den Top 10 steht?',
      answer: 'Ja. Durch die Technik Query Fan-Out zerlegt Google komplexe Fragen in mehrere Teilfragen und ruft breitere Quellen ab als die klassische Ergebnisliste. In unserer DataForSEO-Messung vom 04.11.2026 stammten nur 28 Prozent der 141 AI-Overview-Zitate aus den organischen Top 10 desselben Keywords. Klare Abschnitte zu spezifischen Detailfragen erhöhen diese Chance deutlich.',
    },
    {
      id: 'braucht-man-llms-txt-oder-ai-txt-fuer-google',
      question: 'Benötige ich eine ai.txt, llms.txt oder spezielles Schema.org für Google AI Overviews?',
      answer: 'Nein. Google dokumentiert unter AI features and your website ausdrücklich, dass keine neuen Textdateien, KI-Meta-Tags oder speziellen Schema-Typen erforderlich sind. Entscheidend sind saubere Indexierbarkeit, direkt zitierfähige HTML-Inhalte und reguläre strukturierte Daten, die exakt mit dem sichtbaren Seitentext übereinstimmen.',
    },
    {
      id: 'entfernt-google-extended-sperre-ai-overviews',
      question: 'Entfernt eine Sperre von Google-Extended in der robots.txt meine Seite aus AI Overviews?',
      answer: 'Nein. Google-Extended steuert lediglich, ob Ihre Inhalte zum Training von Gemini-Modellen und für Grounding außerhalb der Google-Suche verwendet werden. Auf die Präsenz in Google Search und in AI Overviews hat Google-Extended keinen Einfluss; dafür sind der Googlebot sowie Direktiven wie nosnippet, max-snippet und noindex maßgeblich.',
    },
    {
      id: 'wie-blockiere-ich-inhalte-in-ai-overviews',
      question: 'Wie verhindere ich bei Bedarf, dass bestimmte Passagen in AI Overviews übernommen werden?',
      answer: 'Nutzen Sie dieselben Snippet-Steuerungen wie in der klassischen Google-Suche: Mit data-nosnippet schließen Sie gezielt einzelne HTML-Container aus, max-snippet begrenzt die Zeichenlänge und nosnippet unterbindet Textausschnitte für die gesamte URL. Bedenken Sie jedoch, dass diese Einschränkungen gleichzeitig Ihre normalen Such-Snippets verkürzen oder ausblenden.',
    },
    {
      id: 'sinkt-durch-ai-overviews-der-website-traffic',
      question: 'Verringern Google AI Overviews zwangsläufig die Klicks auf meine Website?',
      answer: 'Bei rein lexikalischen Kurzfragen sinkt die Klickrate oft, während komplexe B2B-Vergleichs- und Preisfragen qualifizierte Klicks auf die zitierten Quellen lenken können. Prüfen Sie die Auswirkungen anhand Ihrer eigenen Daten in der Google Search Console (Suchtyp Web) und messen Sie in GA4 vor allem die abgeschlossenen Anfragen statt bloßer Seitenaufrufe.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/sprawdz-cytowalnosc-strony-ai', tekst: 'GEO-Zitierbarkeit kostenlos prüfen', opis: 'analysiert jede URL auf Answer-First-Blöcke, Fakten-Dichte, Tabellen und 6 RAG-Kriterien' },
    { href: '/sprawdz-widocznosc-w-ai', tekst: 'KI-Sichtbarkeit kostenlos prüfen', opis: 'zeigt sofort, ob Ihre Marke in ChatGPT, Gemini, Perplexity und AI Overviews genannt wird' },
    { href: '/pozycjonowanie-w-ai', tekst: 'Generative Engine Optimization (GEO)', opis: 'laufende Optimierung und Messung Ihrer Sichtbarkeit in KI-Antworten und AI Overviews' },
    { href: '/porownania/seo-vs-geo', tekst: 'SEO vs GEO im Vergleich', opis: 'unsere vollständige Auswertung der 141 AI-Overview-Zitate und 8 Entscheidungskriterien' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website (AI Overviews & AI Mode Richtlinien)', data: '2026-11-18' },
    { url: 'https://support.google.com/websearch/answer/14901683', nazwa: 'Google-Suche-Hilfe: Übersicht mit KI (AI Overviews) in den Google-Suchergebnissen', data: '2026-11-18' },
    { url: 'https://support.google.com/webmasters/answer/7042828', nazwa: 'Google Search Console-Hilfe: Leistungsbericht (Suchtyp Web, Positionen und Klickzählung)', data: '2026-11-18' },
    { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Google Search Console-Hilfe: Bericht zur Leistung in generativer KI (Generative AI performance)', data: '2026-11-19' },
    { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google Search Central: Übersicht gängiger Google-Crawler (Googlebot vs. Google-Extended)', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und nutzerorientierte Inhalte erstellen', data: '2026-11-18' },
    { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity Docs: Offizielle Dokumentation zu PerplexityBot und Perplexity-User', data: '2026-11-18' },
  ],
};
