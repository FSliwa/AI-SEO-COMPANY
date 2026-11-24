// Daten des deutschen Ratgebers /de/blog/bing-webmaster-tools-indexnow-chatgpt (24.11.2026; Schluessel PL: /blog/bing-webmaster-tools-indexnow-chatgpt).
// Hauptkeywords: "bing webmaster tools", "indexnow einrichten", "chatgpt bing index".
// Fakten geprueft gegen Microsoft Bing Webmaster Blog (17.06.2025 & GSC-Import), IndexNow.org Dokumentation + searchengines.json,
// OpenAI Crawler Docs (OAI-SearchBot) sowie unser eigenes produktives Setup auf ai-seo-company.pl (ohne unbelegte Zeitversprechen).

export const BLOG_BING_INDEXNOW_DE = {
  fallbackPfad: '/blog/bing-webmaster-tools-indexnow-chatgpt',
  okruszek: 'Bing Webmaster Tools & IndexNow',
  kategoria: 'Technisches SEO & Indexierung',
  h1: 'Bing Webmaster Tools und IndexNow einrichten: Anleitung für Bing und ChatGPT',
  opublikowano: '2026-11-24',
  aktualisiert: '2026-11-24',
  kurzantwort: 'Die Bing Webmaster Tools sind die kostenlose Konsole von Microsoft, mit der Sie Crawling, Sitemaps und Indexierung Ihrer Website im Bing-Index steuern. Über das offene Protokoll IndexNow melden Sie neue, geänderte oder gelöschte URLs aktiv per Schlüsseldatei und POST-Anfrage an Bing, Yandex, Seznam, Naver und Yep - jedoch nicht an Google.',
  lead: 'Wer im DACH-Raum nur die Google Search Console pflegt, übersieht oft den zweiten wichtigen Suchindex für B2B-Websites und KI-gestützte Suchsysteme. Dieser Praxisleitfaden zeigt Schritt für Schritt, wie Sie Ihre Domain in den Bing Webmaster Tools verifizieren, IndexNow einrichten, HTTP-Antwortcodes sauber prüfen und welche Rolle der ChatGPT Bing Index neben dem OAI-SearchBot tatsächlich spielt.',
  sekcje: [
    {
      id: 'bing-webmaster-tools-einrichten',
      h2: 'Website in den Bing Webmaster Tools anlegen: GSC-Import und Alternativen',
      html: [
        '<p>Der schnellste Weg führt direkt über Ihre bestehende Google Search Console. Laut offizieller Anleitung im Microsoft Bing Webmaster Blog (veröffentlicht am 13. September 2019, aktualisiert im Juni 2025) übernimmt Microsoft bereits bestätigte Properties ohne zusätzliche Datei-Uploads oder DNS-Änderungen.</p>',
        '<h3>Option A: Direktimport aus der Google Search Console</h3>',
        '<ol>',
        '<li>Melden Sie sich mit einem bestehenden Microsoft-, Google- oder Facebook-Konto in den <strong>Bing Webmaster Tools</strong> an.</li>',
        '<li>Wählen Sie in der Übersicht unter „My Sites“ die Schaltfläche <strong>Import</strong> unterhalb der Google-Search-Console-Option.</li>',
        '<li>Autorisieren Sie das Google-Konto, das Zugriff auf Ihre bestätigten Search-Console-Properties besitzt, für den Lesezugriff auf Domains und Sitemaps.</li>',
        '<li>Markieren Sie die gewünschten Websites (bis zu <strong>100 Properties pro Vorgang</strong>) und bestätigen Sie den Import.</li>',
        '</ol>',
        '<p>Erste Leistungsdaten erscheinen laut Microsoft innerhalb von bis zu <strong>48 Stunden</strong>. Beachten Sie im Agentur- und Unternehmensalltag ein wichtiges Detail: Bing prüft die Inhaberschaft regelmäßig über die aktive Search-Console-Verknüpfung nach. Entziehen Sie die Berechtigung im Google-Konto, müssen Sie die Verbindung erneuern oder eine klassische Verifizierung hinterlegen.</p>',
        '<h3>Option B: Vier Verifizierungsmethoden ohne Google Search Console</h3>',
        '<p>Falls eine Domain noch nicht in der Google Search Console liegt oder Sicherheitsrichtlinien die Kontoverknüpfung untersagen, akzeptieren die Bing Webmaster Tools vier eigenständige Nachweise (Stand Microsoft-Dokumentation vom 17. Juni 2025):</p>',
        '<ul>',
        '<li><strong>DNS-TXT-Eintrag (empfohlen für B2B-Infrastruktur):</strong> Hinterlegen des bereitgestellten Prüfstrings im DNS Ihres Domain-Registrars, unabhängig von späteren Website-Relaunches.</li>',
        '<li><strong>Domain Connect:</strong> Automatische Ein-Klick-Konfiguration, sofern Ihr DNS-Anbieter den offenen Standard unterstützt.</li>',
        '<li><strong>XML-Authentifizierungsdatei:</strong> Upload der Datei <code>BingSiteAuth.xml</code> direkt ins Wurzelverzeichnis Ihrer Domain.</li>',
        '<li><strong>HTML-Meta-Tag:</strong> Einbindung des Tags <code>&lt;meta name=&quot;msvalidate.01&quot; ...&gt;</code> im <code>&lt;head&gt;</code> der Startseite im serverseitig ausgelieferten HTML.</li>',
        '</ul>',
        '<h3>XML-Sitemap hinterlegen</h3>',
        '<p>Reichen Sie unmittelbar nach der Bestätigung Ihre XML-Sitemap unter <em>Sitemaps</em> ein oder referenzieren Sie den Pfad sauber in der <code>robots.txt</code>. Laut Microsoft verarbeitet Bing eingereichte Sitemaps mindestens einmal alle 24 Stunden. Auf unserer eigenen Website verweist die <code>robots.txt</code> auf <code>/sitemap.xml</code> als Index über klar getrennte Segment-Sitemaps.</p>',
      ].join(''),
    },
    {
      id: 'indexnow-einrichten',
      h2: 'IndexNow einrichten: Schlüsseldatei, JSON-POST und beteiligte Suchmaschinen',
      html: [
        '<p>Klassisches Crawling wartet darauf, dass ein Bot zufällig wiederkehrt. Wer <strong>IndexNow einrichten</strong> lässt, dreht dieses Prinzip um: Ihr Server meldet aktiv im selben Moment, in dem eine Leistungsseite, Preisliste oder Fallstudie neu erscheint, aktualisiert oder per 404/410 entfernt wird. Laut Spezifikation auf <code>indexnow.org</code> genügt ein einziger Aufruf an einen teilnehmenden Endpunkt - dieser verteilt die gemeldeten URLs automatisch an alle anderen Mitglieder des Protokolls.</p>',
        '<p>Ein entscheidender Fakt für Ihre SEO-Planung: Auf der offiziellen Teilnehmerliste (<code>indexnow.org/searchengines.json</code>, geprüft am 18.11.2026) stehen <strong>Bing, Yandex, Seznam, Naver und Yep</strong> (ergänzt um das Internet Archive und den Amazonbot) - <strong>ausdrücklich NICHT Google</strong>! Für Google bleiben XML-Sitemaps mit ehrlichem <code>&lt;lastmod&gt;</code>-Zeitstempel und die Google Search Console maßgeblich; IndexNow arbeitet parallel dazu.</p>',
        '<h3>Schritt 1: Hexadezimalen Schlüssel erzeugen und als .txt hosten</h3>',
        '<p>Ein gültiger IndexNow-Schlüssel umfasst <strong>8 bis 128 Zeichen</strong> (erlaubt sind Klein- und Großbuchstaben, Ziffern und Bindestriche; üblich und besonders robust ist ein 32-stelliger hexadezimaler String). Speichern Sie exakt diesen Schlüssel ohne Zeilenumbruch-Ballast in einer UTF-8-codierten Textdatei <code>{schluessel}.txt</code> im Hauptverzeichnis Ihrer Domain, sodass er unter <code>https://www.ihre-domain.de/{schluessel}.txt</code> mit HTTP 200 abrufbar ist. In unserem Next.js-Projekt liegt diese 32-stellige Hexadezimaldatei im Ordner <code>public/</code>. Einen fertigen Schlüssel samt Prüf-Befehl erstellen Sie in Sekunden mit unserem kostenlosen <a href="/de/tools/indexnow-generator-bing-chatgpt-test">IndexNow Generator und Bing-Prüfer</a>.</p>',
        '<h3>Schritt 2: Geänderte URLs per POST senden (bis zu 10.000 URLs pro Request)</h3>',
        '<p>Sobald eine Seite live geht, sendet Ihr Backend oder Deployment-Workflow einen JSON-POST an <code>https://api.indexnow.org/indexnow</code>. Eine einzelne Anfrage fasst bis zu <strong>10.000 URLs</strong> derselben Domain zusammen:</p>',
        `<pre><code>POST https://api.indexnow.org/indexnow
Content-Type: application/json; charset=utf-8

{
  "host": "www.beispiel-unternehmen.de",
  "key": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
  "keyLocation": "https://www.beispiel-unternehmen.de/a1b2c3d4e5f60718293a4b5c6d7e8f90.txt",
  "urlList": [
    "https://www.beispiel-unternehmen.de/leistungen/b2b-software",
    "https://www.beispiel-unternehmen.de/preise"
  ]
}</code></pre>`,
        '<p>Auf unserer eigenen Plattform kombinieren wir zwei schlanke Wege: ein manuelles Release-Skript (<code>scripts/indexnow.mjs</code> mit Trockenlauf, Live-Abgleich der Schlüsseldatei und Filterung nach dem jüngsten <code>lastmod</code>-Datum) sowie einen täglichen Vercel-Cronjob um 06:15 UTC, der ausschließlich URLs meldet, deren Build-Freigabe maximal 26 Stunden zurückliegt (gedeckelt auf 100 URLs pro Lauf). Auf Standard-Systemen übernehmen das fertige Integrationen: unter WordPress das offizielle IndexNow-Plugin sowie Rank Math, Yoast SEO, AIOSEO oder SEOPress, unter Shopify die App InstaIndex und auf CDN-Ebene Cloudflare Crawler Hints. Melden Sie laut Bing-Empfehlung nur tatsächlich neu erstellte, inhaltlich geänderte oder gelöschte Adressen - keine unveränderten Bestandsarchive.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-indexnow-statuscodes',
        caption: 'Offizielle HTTP-Statuscodes der IndexNow-API und ihre Bedeutung im Debugging',
        columns: [
          { key: 'code', label: 'HTTP-Statuscode' },
          { key: 'bedeutung', label: 'Offizielle Bedeutung laut IndexNow.org' },
          { key: 'massnahme', label: 'Technische Kontrolle bei Fehlern' },
        ],
        rows: [
          {
            id: 'http-200',
            code: '200 OK',
            bedeutung: 'URL-Liste erfolgreich entgegengenommen',
            massnahme: 'Kein Eingriff nötig; Empfang bestätigt (noch keine Indexierungsgarantie)',
          },
          {
            id: 'http-202',
            code: '202 Accepted',
            bedeutung: 'URL-Liste angenommen, asynchrone Prüfung der Schlüsseldatei läuft noch',
            massnahme: 'Normal beim allerersten Aufruf eines neuen Schlüssels; Datei erreichbar halten',
          },
          {
            id: 'http-400',
            code: '400 Bad Request',
            bedeutung: 'Ungültiges Format der JSON-Anfrage oder fehlerhafte Header',
            massnahme: 'Content-Type (application/json; charset=utf-8) und JSON-Syntax prüfen',
          },
          {
            id: 'http-403',
            code: '403 Forbidden',
            bedeutung: 'Schlüssel ungültig: Datei fehlt unter keyLocation oder enthält abweichenden String',
            massnahme: 'Prüfen, ob /{key}.txt ohne Weiterleitung HTTP 200 und exakt den Key liefert',
          },
          {
            id: 'http-422',
            code: '422 Unprocessable Entity',
            bedeutung: 'Gemeldete URLs gehören nicht zum angegebenen Host oder Schlüssel verletzt Schema',
            massnahme: 'www- vs. Non-www-Host zwischen host-Feld und urlList strikt angleichen',
          },
          {
            id: 'http-429',
            code: '429 Too Many Requests',
            bedeutung: 'Zu viele Anfragen in kurzer Zeit (Spam-Schutz der Suchmaschine greift)',
            massnahme: 'Einzel-Pings zu Batch-Listen bündeln und unveränderte URLs herausfiltern',
          },
        ],
        przypis: 'Quelle: Offizielle Protokollspezifikation auf indexnow.org/documentation (geprüft am 18.11.2026).',
      },
    },
    {
      id: 'indexierung-in-bing-pruefen',
      h2: 'Indexierung in den Bing Webmaster Tools kontrollieren',
      html: [
        '<p>Ein HTTP-Code <code>200</code> aus der IndexNow-Schnittstelle beweist lediglich, dass der Endpunkt Ihre URL-Liste angenommen hat - ob die Seite tatsächlich gecrawlt und in den Suchindex aufgenommen wird, entscheidet Bing eigenständig, und jeder Abruf zählt auf das Crawl-Kontingent Ihrer Domain. Für die laufende Kontrolle bieten die Bing Webmaster Tools drei zentrale Berichte (Microsoft-Dokumentation vom 17.06.2025):</p>',
        '<ul>',
        '<li><strong>URL-Prüfung (URL Inspection):</strong> Zeigt für eine einzelne Adresse den exakten Indexierungsstatus, letzte Crawl-Zeitpunkte, HTTP-Antwortcodes und blockierte Ressourcen.</li>',
        '<li><strong>Site Explorer:</strong> Bildet Ihre Verzeichnisstruktur so ab, wie der Bingbot sie sieht, inklusive indexierter Unterseiten, Weiterleitungen und Fehlercodes.</li>',
        '<li><strong>Suchleistung (Search Performance):</strong> Liefert Klicks, Impressionen und durchschnittliche Positionen für Seiten und Suchbegriffe bis zu 16 Monate rückwirkend.</li>',
        '</ul>',
        '<p>Prüfen Sie vor größeren IndexNow-Meldungen immer zuerst die On-Page-Grundlagen Ihrer Zielseiten - etwa versehentliche <code>noindex</code>-Direktiven, widersprüchliche Canonicals oder langsame Serverantworten - über unseren <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>.</p>',
      ].join(''),
    },
    {
      id: 'chatgpt-bing-index-und-oai-searchbot',
      h2: 'ChatGPT Bing Index vs. OAI-SearchBot: Was Microsoft und OpenAI dokumentieren',
      html: [
        '<p>Rund um das Thema <strong>ChatGPT Bing Index</strong> kursieren im Markt viele unbelegte Halbwahrheiten. Deshalb trennen wir strikt, was die beiden beteiligten Hersteller selbst schriftlich dokumentieren:</p>',
        '<ul>',
        '<li><strong>Aussage von Microsoft:</strong> Im offiziellen Beitrag auf dem Bing Webmaster Blog vom 17. Juni 2025 schreibt Microsoft ausdrücklich, dass der Bing-Index unter anderem KI-Werkzeuge wie ChatGPT mit Suchergebnissen versorgt.</li>',
        '<li><strong>Aussage von OpenAI:</strong> In der technischen Crawler-Dokumentation (<code>developers.openai.com/api/docs/bots</code>, geprüft am 18.11.2026) nennt OpenAI keine externen Suchindex-Lieferanten beim Namen. Dokumentiert wird dort stattdessen der eigene Such-Crawler <code>OAI-SearchBot</code>: Websites, die <code>OAI-SearchBot</code> in ihrer <code>robots.txt</code> aussperren, werden nicht als zitierte Suchergebnisse in ChatGPT-Antworten angezeigt; Änderungen an der <code>robots.txt</code> greifen laut OpenAI nach rund 24 Stunden. (Hinweis zur Quellentransparenz: Einzelne Hilfeseiten von OpenAI zu ChatGPT Search lieferten bei unserem Abruf am 18.11.2026 HTTP 403, sodass wir uns für OpenAI ausschließlich auf die frei prüfbare Entwicklerdokumentation der Bots stützen.)</li>',
        '</ul>',
        '<p>Für B2B-Unternehmen ergibt sich daraus eine klare technische Doppelregel: Behandeln Sie <strong>saubere Indexierung in Bing</strong> und <strong>freien Zugriff für den OAI-SearchBot</strong> als zwei getrennte Pflichtbedingungen und erfüllen Sie beide. Ob Ihre <code>robots.txt</code> oder Ihre Cloudflare-/WAF-Firewall den <code>OAI-SearchBot</code> oder den <code>Bingbot</code> ungewollt blockiert, testen Sie live mit unserem <a href="/de/tools/ki-crawler-robots-txt-pruefen">KI-Crawler- und robots.txt-Prüfer</a>. Welche Quellen ChatGPT bei konkreten Kauf- und Preisfragen anschließend bevorzugt, zeigen unsere Messdaten im Leitfaden <a href="/de/ki-suchoptimierung/chatgpt">ChatGPT SEO</a> sowie im Systemvergleich <a href="/de/vergleiche/chatgpt-search-vs-perplexity-vs-ai-overviews">ChatGPT Search vs Perplexity vs Google AI Overviews</a>.</p>',
      ].join(''),
    },
    {
      id: 'unsere-umsetzung-und-messgrenzen',
      h2: 'Was wir selbst umgesetzt - und was wir bewusst nicht gemessen haben',
      html: [
        '<p>Wir beschreiben auf unserem Blog nur Ergebnisse, die wir tatsächlich selbst erhoben haben. Unsere eigene Domain <code>ai-seo-company.pl</code> ist in den Bing Webmaster Tools verifiziert (geprüft im Panel am 18.11.2026), die 32-stellige IndexNow-Schlüsseldatei liegt im Wurzelverzeichnis, und wir haben am 04.11., 06.11. und 12.11.2026 sowie dreimal am 18.11.2026 aktualisierte URLs per IndexNow übermittelt. Die API antwortete jeweils mit HTTP <code>200</code> oder <code>202</code>.</p>',
        '<p>Am 18.11.2026 wies das Bing-Panel für unsere noch junge Domain 3 Klicks und 35 Impressionen aus - eine viel zu kleine Stichprobe für seriöse Trendaussagen - sowie einen Prüfhinweis auf neue Unterseiten außerhalb der Sitemap. Wir haben <strong>weder die exakte Indexierungsdauer gestoppt</strong> noch einen isolierten Test durchgeführt, ob IndexNow allein die Nennungsrate in ChatGPT verändert. Wer garantierte Minuten-Indexierung oder sichere KI-Empfehlungen allein durch einen API-Ping verspricht, verkauft Vermutungen statt Messdaten.</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Bing Webmaster Tools und IndexNow',
  faq: [
    {
      id: 'sind-bing-webmaster-tools-kostenlos',
      question: 'Sind die Bing Webmaster Tools komplett kostenlos?',
      answer: 'Ja. Microsoft stellt die Bing Webmaster Tools kostenfrei zur Verfügung (Dokumentation vom 17. Juni 2025). Sie können bestehende Websites direkt aus der Google Search Console importieren oder per DNS-TXT-Eintrag, XML-Datei, HTML-Meta-Tag bzw. Domain Connect bestätigen.',
    },
    {
      id: 'funktioniert-indexnow-bei-google',
      question: 'Unterstützt Google das IndexNow-Protokoll?',
      answer: 'Nein. Laut der offiziellen Liste auf indexnow.org (searchengines.json, Stand 18.11.2026) nehmen Bing, Yandex, Seznam, Naver und Yep sowie das Internet Archive und Amazonbot an IndexNow teil - Google jedoch nicht. Für Google nutzen Sie weiterhin XML-Sitemaps mit sauberen lastmod-Daten und die Google Search Console.',
    },
    {
      id: 'verbessert-indexnow-chatgpt-sichtbarkeit',
      question: 'Garantieren Bing Webmaster Tools und IndexNow mehr Sichtbarkeit in ChatGPT?',
      answer: 'Eine Garantie gibt es nicht, und wir haben keinen isolierten Effekt gemessen. Microsoft dokumentiert, dass Bing unter anderem ChatGPT versorgt, während OpenAI in seiner Bot-Dokumentation den eigenen Crawler OAI-SearchBot als Voraussetzung für Suchzitate nennt. Praktisch sollten Sie beides sicherstellen: Indexierung in Bing und HTTP-200-Freigabe für OAI-SearchBot.',
    },
    {
      id: 'wie-lange-dauert-bing-indexierung-nach-indexnow',
      question: 'Wie schnell indexiert Bing eine neue Seite nach einer IndexNow-Meldung?',
      answer: 'Dafür nennen weder die offizielle Bing-Dokumentation noch wir eine feste Stundenzahl, da wir die Durchlaufzeit nicht separat gemessen haben. Laut Microsoft informiert IndexNow die Suchmaschine sofort über Änderungen, garantiert aber weder das Crawling noch die Aufnahme in den Index. Den Status einer konkreten Adresse prüfen Sie jederzeit in der URL-Prüfung der Bing Webmaster Tools.',
    },
    {
      id: 'unterschied-oai-searchbot-und-gptbot',
      question: 'Was ist der Unterschied zwischen OAI-SearchBot und GPTBot in der robots.txt?',
      answer: 'Laut der offiziellen Crawler-Übersicht von OpenAI dient GPTBot dem Sammeln von Texten für das Training generativer Sprachmodelle, während OAI-SearchBot Seiten gezielt für Suchantworten und Quellenlinks in ChatGPT erfasst. Sie können GPTBot blockieren und gleichzeitig OAI-SearchBot erlauben; Änderungen an der robots.txt wirken nach rund 24 Stunden.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/generator-indexnow-test-bing-chatgpt', tekst: 'IndexNow Generator & Bing- / ChatGPT-Prüfer', opis: 'erzeugt Ihre .txt-Schlüsseldatei und prüft Sitemap-lastmod sowie Bot-Zugriff' },
    { href: '/narzedzia/tester-robotow-ai-robots-txt', tekst: 'KI-Crawler & robots.txt Prüfer', opis: 'testet live 15 KI- und Such-Bots inklusive OAI-SearchBot und Bingbot auf Sperren' },
    { href: '/pozycjonowanie-w-ai/chatgpt', tekst: 'ChatGPT SEO Leitfaden', opis: 'zeigt anhand eigener API-Messdaten, welche Quellen ChatGPT bei Kauf- und Preisfragen zitiert' },
    { href: '/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews', tekst: 'ChatGPT Search vs Perplexity vs AI Overviews', opis: 'vergleicht Index-Quellen, Crawler und Erfolgsmetriken der drei großen KI-Suchsysteme' },
  ],
  zrodla: [
    { url: 'https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/', nazwa: 'Microsoft Bing Webmaster Blog: Start Using Bing Webmaster Tools to Improve Your Site Visibility (17.06.2025)', data: '2026-11-18' },
    { url: 'https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/', nazwa: 'Microsoft Bing Webmaster Blog: Easily Verify Your Site by Importing from Google Search Console (aktualisiert 06.2025)', data: '2026-11-18' },
    { url: 'https://www.bing.com/indexnow/getstarted', nazwa: 'Bing Webmaster Tools: How to add IndexNow to your website', data: '2026-11-18' },
    { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Official Protocol Documentation & HTTP Response Codes', data: '2026-11-18' },
    { url: 'https://www.indexnow.org/searchengines.json', nazwa: 'IndexNow.org: Verzeichnis teilnehmender Suchmaschinen (searchengines.json)', data: '2026-11-18' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User)', data: '2026-11-18' },
  ],
};
