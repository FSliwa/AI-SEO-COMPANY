// Szablon „Website Relaunch Checkliste” (Faza 3 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/checklista-migracji-strony.js. PDF: public/pliki/de/website-relaunch-checkliste.pdf.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Website-Umzug mit URL-Änderungen (301-Weiterleitungen, Sitemap-Abgleich, mindestens 1 Jahr Haltedauer)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing', nazwa: 'Google Search Central: Indexierung auf Staging per Passwort oder noindex verhindern (und beim Livegang entfernen)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Doppelte URLs mit Canonical und 301 konsolidieren', data: '2026-11-12' },
];

export const ETAPY_MIGRACJA_DE = [
  {
    tytul: 'Phase 1. Bestandsaufnahme vor dem Umbau (2-4 Wochen vorher)',
    punkty: [
      ['M-01', 'Alle aktuellen URLs per Crawler, Sitemap, Google Search Console (Seitenbericht) und GA4 exportieren', 'Pflicht'],
      ['M-02', 'Top-Seiten nach organischen Klicks, Konversionen und externen Backlinks gesondert markieren', 'Pflicht'],
      ['M-03', 'Aktuelle Titel, Meta-Beschreibungen, H1-Überschriften, interne Verlinkung und Schema-Markup sichern', 'Pflicht'],
      ['M-04', 'Benchmarks vor dem Relaunch festhalten: Klicks/Woche, Rankings der Haupt-Keywords, mobiles LCP/INP/CLS', 'Pflicht'],
      ['M-05', 'Entscheidung treffen: URLs möglichst unverändert lassen; Änderungen nur mit triftigem Grund', 'Hoch'],
    ],
  },
  {
    tytul: 'Phase 2. 301-Weiterleitungsmatrix & Staging-Umgebung',
    punkty: [
      ['M-06', 'Staging-System per HTTP-Passwortschutz (Basic Auth) vor Google und KI-Crawlern abschirmen', 'Pflicht'],
      ['M-07', '1:1-Weiterleitungsliste erstellen: jede alte URL zeigt per 301 direkt auf das thematisch passende neue Ziel', 'Pflicht'],
      ['M-08', 'Keine Pauschal-Weiterleitungen alter Unterseiten auf die Startseite einrichten (verursacht Soft-404)', 'Pflicht'],
      ['M-09', 'Weiterleitungsketten auflösen (A -> B -> C wird direkt zu A -> C, maximal 1 Sprung)', 'Pflicht'],
      ['M-10', 'Wichtige Textinhalte, FAQs, Tabellen, Alt-Texte und strukturierte Daten vollständig auf Staging übernehmen', 'Pflicht'],
      ['M-11', 'Interne Links im neuen System direkt auf die endgültigen Ziel-URLs setzen (keine internen 301-Links)', 'Hoch'],
      ['M-12', 'Mehrsprachige Websites: gegenseitige hreflang-Verweise inklusive x-default auf allen Sprachversionen prüfen', 'Hoch'],
      ['M-13', 'Mobile Darstellung, Bildgrößen (width/height gegen CLS) und Server-Side-Rendering ohne JS testen', 'Hoch'],
    ],
  },
  {
    tytul: 'Phase 3. Tag der Live-Schaltung (Go-Live-Protokoll)',
    punkty: [
      ['M-14', 'Passwortschutz und sämtliche Staging-noindex-Tags sowie X-Robots-Tag-Sperren auf Produktion entfernen', 'Pflicht'],
      ['M-15', 'robots.txt live prüfen: Googlebot sowie KI-Suchbots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) erlaubt', 'Pflicht'],
      ['M-16', 'Alle 301-Weiterleitungen automatisiert gegen die Live-Domain testen (Statuscode 301 -> Ziel 200)', 'Pflicht'],
      ['M-17', 'Canonical-Tags kontrollieren: zeigen auf die echte Live-Domain mit https:// (keine Staging-Reste!)', 'Pflicht'],
      ['M-18', 'HTTPS-Zwang und einheitliche Host-Variante (mit oder ohne www) per 301 verifizieren', 'Pflicht'],
      ['M-19', 'Neue XML-Sitemap (nur Status 200, indexierbar) und aktualisierte /llms.txt bereitstellen', 'Pflicht'],
      ['M-20', 'Neue Sitemap in Google Search Console und Bing Webmaster Tools einreichen; bei Domainwechsel Adressänderung starten', 'Pflicht'],
      ['M-21', 'GA4-Tracking, Kontaktformulare, Telefon-Links und Consent-Banner live durchtesten', 'Pflicht'],
    ],
  },
  {
    tytul: 'Phase 4. Nachkontrolle (Tag 1 bis Woche 4 nach Relaunch)',
    punkty: [
      ['M-22', 'Tag 1-3: Server-Logs und Search Console auf unerwartete 404-Fehler und 5xx-Antworten prüfen', 'Pflicht'],
      ['M-23', 'Tag 7: Indexierungsbericht in der Search Console kontrollieren (sinken alte URLs, steigen neue?)', 'Pflicht'],
      ['M-24', 'Tag 14: Organische Klicks, Haupt-Keywords und KI-Sichtbarkeit mit dem Vor-Relaunch-Benchmark abgleichen', 'Hoch'],
      ['M-25', 'Woche 4: Core-Web-Vitals-Felddaten (28-Tage-CrUX) prüfen und Nachzügler-404s per 301 nachziehen', 'Hoch'],
      ['M-26', 'Alte Domain und alle 301-Weiterleitungen laut Google-Empfehlung mindestens 12 Monate aktiv halten', 'Pflicht'],
    ],
  },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_MIGRACJA_DE = {
  seo: {
    tytul: 'Website Relaunch Checkliste SEO: PDF ohne Rankingverlust',
    opis: 'Kostenlose Website Relaunch Checkliste für SEO als PDF: Prüfpunkte zu 301-Weiterleitungen, Staging-Schutz, Go-Live und Kontrolle ohne Verluste.',
  },
  de: {
    okruszek: 'Website Relaunch Checkliste',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Website Relaunch Checkliste für SEO: sicher umziehen ohne Sichtbarkeitsverlust',
    lead: 'Ein neues Design, ein Wechsel von WordPress auf Next.js oder eine neue Domain kostet Unternehmen oft binnen weniger Wochen 30 bis 70 Prozent ihres organischen Traffics - fast immer wegen vergessener noindex-Tags, fehlender 301-Weiterleitungen oder gestrichener Leistungsseiten. Diese kostenlose Website Relaunch Checkliste begleitet Sie in 4 Phasen sicher vor, während und nach dem Go-Live.',
    karta: {
      nazwa: 'Website Relaunch Checkliste (PDF)',
      opis: '4 Phasen mit 26 Kernprüfpunkten und 301-Mapping-Tabelle auf A4: Vorbereitung, Staging, Go-Live-Tag und 4-Wochen-Kontrolle.',
      cta: 'Checkliste herunterladen',
    },
    sekcje: [
      {
        id: 'drei-teuerste-relaunch-fehler',
        h2: 'Die 3 teuersten SEO-Fehler bei einem Website-Relaunch',
        html: [
          '<p>In technischen Rettungs-Audits nach fehlgeschlagenen Relaunches begegnen uns fast immer dieselben drei Ursachen:</p>',
          '<ol>',
          '<li><strong>Vergessenes <code>noindex</code> vom Staging-Server:</strong> Ein einziges Häkchen aus der Entwicklungsphase („Suchmaschinen davon abhalten, diese Website zu indexieren“) wirft nach dem Livegang binnen Tagen die gesamte Domain aus Google.</li>',
          '<li><strong>Alte Unterseiten pauschal auf die Startseite umgeleitet:</strong> Google wertet Weiterleitungen von spezifischen Unterseiten auf eine thematisch fremde Startseite als Soft-404. Rankings und Linkkraft dieser URLs gehen verloren.</li>',
          '<li><strong>Rankende Inhalte für „luftiges Design“ gestrichen:</strong> Wer bewährte Leistungsbeschreibungen, Tabellen und FAQs ersatzlos kürzt oder hinter reinem Client-JavaScript versteckt, verliert sowohl Google-Positionen als auch Zitierungen in KI-Systemen.</li>',
          '</ol>',
        ].join(''),
      },
      {
        id: 'vier-phasen-ueberblick',
        h2: 'Aufbau der Website Relaunch Checkliste: 4 Phasen mit klarem Zeitplan',
        html: '<p>Ein sauberer Relaunch beginnt mindestens drei Wochen vor dem Umschalttermin und endet erst vier Wochen nach dem Go-Live, wenn die neuen CrUX-Felddaten vorliegen.</p>',
        tabela: {
          id: 'tabelle-relaunch-phasen',
          caption: 'Die 4 Phasen eines SEO-sicheren Website-Relaunchs',
          columns: [
            { key: 'phase', label: 'Phase' },
            { key: 'zeitpunkt', label: 'Zeitfenster' },
            { key: 'fokus', label: 'Wichtigste Ergebnisse' },
          ],
          rows: [
            { phase: '1. Bestandsaufnahme', zeitpunkt: '2 bis 4 Wochen vor Livegang',fokus: 'Vollständige URL-Liste aus Crawl, GSC, GA4 und Backlinks plus Benchmark-Werte' },
            { phase: '2. 301-Mapping & Staging', zeitpunkt: '1 bis 2 Wochen vor Livegang', fokus: '1:1-Weiterleitungsmatrix ohne Ketten, Passwortschutz auf Staging, Inhalts- und CWV-Prüfung' },
            { phase: '3. Go-Live-Protokoll', zeitpunkt: 'Am Umschalttag (vormittags Di-Do)', fokus: 'noindex entfernen, 301-Testlauf, Canonicals, Sitemap, /llms.txt und Tracking prüfen' },
            { phase: '4. Nachkontrolle', zeitpunkt: 'Tag 1 bis Woche 4 nach Livegang', fokus: '404-Monitoring, Indexierungsfortschritt in GSC, KI-Crawler-Zugriff und 28-Tage-CrUX' },
          ],
        },
      },
      {
        id: 'weiterleitungsmatrix-richtig-bauen',
        h2: '301-Weiterleitungsmatrix: jede alte URL braucht ein passendes Gegenstück',
        html: [
          '<p>Wenn sich Pfadstrukturen ändern (etwa beim Wechsel von <code>/leistungen/cnc-fraesen.html</code> auf <code>/cnc-lohnfertigung</code>), ist die 301-Tabelle das wichtigste Dokument des gesamten Projekts. Google empfiehlt in seiner Umzugsdokumentation ausdrücklich permanente Weiterleitungen je Einzelseite und eine Haltedauer von <strong>mindestens einem Jahr</strong>.</p>',
          '<p>Prüfen Sie direkt nach dem Umschalten die Live-Domain mit unserem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>, testen Sie den Zugriff für KI-Bots im <a href="/de/tools/ki-crawler-robots-txt-pruefen">KI-Crawler & robots.txt Prüfer</a> und erstellen Sie bei veränderten Pfaden sofort eine frische <a href="/de/tools/llms-txt-generator">llms.txt-Datei</a>. Wenn Sie vorab sehen möchten, wie Ihre Startseite moderner strukturiert sein könnte, testen Sie unser <a href="/de/tools/website-relaunch-mockup">Website Relaunch Mockup</a>.</p>',
        ].join(''),
      },
      {
        id: 'cms-wechsel-und-domain-umzug',
        h2: 'Besonderheiten bei CMS-Wechsel (WordPress, Shopware, TYPO3 -> Next.js) und Domainwechsel',
        html: [
          '<p>Je stärker sich das technische System ändert, desto mehr versteckte URL-Muster müssen Sie vor dem Umschalttermin abfangen:</p>',
          '<ul>',
          '<li><strong>WordPress oder TYPO3 auf Next.js:</strong> Alte Kategorie-Archive (<code>/category/…</code>), PDF-Medienpfade (<code>/wp-content/uploads/…</code>) und abschließende Schrägstriche (Trailing Slashes) brauchen eindeutige 301-Regeln, damit externe Fachlinks aus Branchenmedien nicht ins Leere laufen.</li>',
          '<li><strong>Shopware oder WooCommerce im E-Commerce:</strong> Prüfen Sie Produkt- und Varianten-URLs, Canonical-Tags auf Filterseiten sowie die vollständige Übernahme von <code>Product</code>- und <code>Offer</code>-Schema-Markup vor dem Livegang.</li>',
          '<li><strong>Domainwechsel (neue Domain):</strong> Legen Sie beide Properties in der Google Search Console an, starten Sie am Tag des Livegangs das offizielle <em>Tool zur Adressänderung</em> und übermitteln Sie die neuen Ziel-URLs zusätzlich per <a href="/de/tools/indexnow-generator-bing-chatgpt-test">IndexNow an Bing und ChatGPT</a>.</li>',
          '</ul>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Checkliste: Prüfpunkte & 301-Tabelle zum Abhaken',
      opis: 'Sie können die Punkte direkt hier im Browser abhaken (wird lokal gespeichert) oder die gesamte A4-Checkliste als PDF herunterladen.',
      html: [
        ...ETAPY_MIGRACJA_DE.flatMap((e) => [
          `<h3>${e.tytul}</h3>`,
          `<ul>${e.punkty.map(([nr, tekst, prio]) => `<li>☐ <strong>${nr} (${prio}):</strong> ${tekst}</li>`).join('')}</ul>`,
        ]),
        '<h3>Arbeitsblatt: 301-Weiterleitungsmatrix (Muster)</h3>',
        tabelaHtml(
          ['Alte URL (Relativpfad)', 'Klicks / Backlinks?', 'Neue Ziel-URL (Status 200)', 'Live-Test (301 OK?)'],
          [
            ['/alte-leistungsseite/', 'Ja (GSC Top 20)', '/neue-leistungsseite', '☐'],
            ['/kontakt.html', 'Ja', '/kontakt', '☐'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'Website Relaunch Checkliste herunterladen (PDF)',
      opis: 'Laden Sie alle 4 Phasen inklusive Go-Live-Abnahmeprotokoll und 301-Mapping-Vorlage als druckfertiges A4-PDF herunter.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Relaunch-Checkliste als PDF senden',
      przedmiot: 'die Website Relaunch Checkliste (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Spam): Der Link zur Website Relaunch Checkliste kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'An welchem Wochentag sollte ein Website-Relaunch live gehen?',
        answer: 'Ideal sind Dienstag, Mittwoch oder Donnerstag am Vormittag. So sind Entwicklung, Hosting und SEO-Verantwortliche am selben und am darauffolgenden Werktag erreichbar, falls Weiterleitungen, SSL-Zertifikate oder Formulare nachjustiert werden müssen - niemals freitags kurz vor dem Wochenende.',
      },
      {
        question: 'Wie lange müssen 301-Weiterleitungen nach einem Relaunch bestehen bleiben?',
        answer: 'Google nennt in seiner Dokumentation mindestens ein Jahr, damit alle Signale zuverlässig übertragen werden. Sofern technisch nichts dagegenspricht, lassen wir 301-Regeln für früher stark verlinkte URLs dauerhaft aktiv.',
      },
      {
        question: 'Ist ein kurzzeitiges Schwanken der Rankings nach dem Relaunch normal?',
        answer: 'Bei größeren Änderungen an URLs oder Seitentemplates braucht Google meist zwei bis vier Wochen, um alle Weiterleitungen zu verarbeiten und die neuen Seiten neu zu bewerten. Starke Einbrüche auf null sind dagegen kein „normales Schwanken“, sondern fast immer ein technischer Sperrfehler (noindex, robots.txt oder kaputte Weiterleitungen).',
      },
      {
        question: 'Wie schütze ich die Testumgebung (Staging) am sichersten vor Google?',
        answer: 'Am zuverlässigsten über einen serverseitigen Passwortschutz (HTTP Basic Auth). Im Gegensatz zu einem noindex-Meta-Tag im Template kann ein Server-Passwort beim Kopieren der Datenbank auf das Live-System nicht versehentlich mit auf Produktion wandern.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/makieta-redesignu', tekst: 'Website Relaunch Mockup', opis: 'erstellt kostenlos einen neuen Startseiten-Entwurf aus Ihren bestehenden Inhalten' },
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft Ihre neue Website direkt nach dem Go-Live auf 404-Fehler, noindex und Ladezeit' },
      { href: '/narzedzia/test-core-web-vitals-porownanie', tekst: 'Core Web Vitals Vergleich', opis: 'vergleicht Ladezeit und CMS-Ballast vor und nach dem Systemwechsel' },
      { href: '/narzedzia/sprawdz-przekierowania-hreflang', tekst: '301-Weiterleitungen & hreflang Prüfer', opis: 'testet Host-Varianten, Weiterleitungsketten und Canonical-Tags live nach dem Umzug' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste', opis: 'alle laufenden On-Page- und Technik-Prüfpunkte nach dem Umzug' },
      { href: '/audyt-seo', tekst: 'SEO Audit & Relaunch-Begleitung', opis: 'persönliche Prüfung Ihrer Staging-Umgebung und 301-Matrix vor dem Livegang' },
    ],
    plikNazwa: 'Website Relaunch Checkliste für SEO: 4 Phasen & 301-Matrix (PDF)',
  },
};

export default SZABLON_MIGRACJA_DE;
