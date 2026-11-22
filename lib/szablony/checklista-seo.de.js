// Szablon „SEO Checkliste” (de-narzedzia, 18.11.2026): niemiecki blok `de` dla lib/szablony/checklista-seo.js
// (PL /narzedzia/checklista-seo, EN /en/tools/seo-checklist, DE /de/tools/seo-checkliste). Nowy plik obok pliku PL/EN.
// 50 punktów w 5 obszarach (10 + 14 + 9 + 8 + 9) jak na stronie PL i EN (mapa-de.csv podawała „100 Punkte”: PL i EN
// mają 50, więc tytuł DE mówi 50; patrz RAPORT). PUNKTY_DE = jedno źródło listy dla podglądu na stronie i dla PDF
// (scripts/szablony/pdf-de.mjs). Reguły Google i botów AI w tekście: tylko z dokumentacji z listy źródeł (odczyt 11.11.2026).
// Priorytety: hoch / mittel / niedrig. Linki wewnętrzne w html: tylko do stron DE z zestawu 17 (adresy gotowe, /de/...).

const OBSZARY = [
  {
    id: 'A',
    nazwa: 'Technische Grundlagen',
    h3: 'A. Technische Grundlagen (10 Punkte)',
    punkty: [
      ['A1', 'Die Website läuft über HTTPS, und Adressen mit http:// leiten auf https:// weiter', 'Geben Sie die Adresse mit http:// ein und prüfen Sie, ob der Browser ohne Warnung auf https:// wechselt.', 'hoch'],
      ['A2', 'Es ist nur eine Version der Domain erreichbar (mit oder ohne www), und die andere leitet mit einer einzigen dauerhaften Weiterleitung (301 oder 308) auf sie um', 'Öffnen Sie beide Versionen. Beide müssen auf derselben Seite enden, ohne Weiterleitungskette.', 'hoch'],
      ['A3', 'Die robots.txt sperrt keine Seiten, die in Google erscheinen sollen', 'Öffnen Sie ihredomain.de/robots.txt. Suchen Sie „Disallow: /“ und Regeln für Verzeichnisse mit Angebot oder Blog.', 'hoch'],
      ['A4', 'Wichtige Seiten tragen kein noindex', 'Search Console → URL-Prüfung für Startseite und Leistungsseiten: Die Indexierung muss erlaubt sein.', 'hoch'],
      ['A5', 'Die XML-Sitemap enthält nur kanonische Adressen, die funktionieren, und ist in der robots.txt eingetragen', 'Öffnen Sie sitemap.xml und robots.txt (Zeile „Sitemap:“). Entfernen Sie Weiterleitungen, 404-Fehler und Seiten mit noindex aus der Sitemap. Ändern Sie lastmod nur bei einer wesentlichen Änderung des Inhalts.', 'mittel'],
      ['A6', 'Jede Seite hat ein Canonical-Tag, das auf sich selbst oder auf die richtige Version zeigt, und Sprachversionen verbindet ein gegenseitiges hreflang', 'Quelltext der Seite (<code>rel="canonical"</code>) oder das kostenlose SEO Audit. Canonical ist für Google ein Signal und kein Befehl, schauen Sie daher in der Search Console (URL-Prüfung) nach, welche Adresse es gewählt hat. Bei mehreren Sprachen verweist jede Version auf sich und auf die übrigen; sinnvoll ist ein Eintrag x-default.', 'mittel'],
      ['A7', 'Interne Links führen nicht auf 404-Seiten und nicht über Weiterleitungen', 'Crawler oder der Bericht „Seiten“ in der Search Console. Korrigieren Sie den Link an der Quelle, nicht nur die Weiterleitung.', 'mittel'],
      ['A8', 'Die Website ist auf dem Smartphone bequem nutzbar: ohne horizontales Scrollen, mit lesbarem Text und großen Buttons', 'Öffnen Sie Startseite, eine Leistungsseite und den Kontakt auf dem Smartphone. Senden Sie das Formular von Anfang bis Ende ab.', 'hoch'],
      ['A9', 'Core Web Vitals im grünen Bereich: LCP bis 2,5 s, INP bis 200 ms, CLS bis 0,1', 'Search Console → Core Web Vitals (Daten von Nutzern, 75. Perzentil der Besuche). Lighthouse dient der Suche nach Ursachen.', 'mittel'],
      ['A10', 'Adressen (URLs) sind kurz und lesbar: Wörter statt zufälliger Kennungen', 'Sehen Sie die Adressen in der Sitemap durch. Ändern Sie funktionierende Adressen nie ohne 301-Weiterleitungen.', 'niedrig'],
    ],
  },
  {
    id: 'B',
    nazwa: 'On-Page',
    h3: 'B. On-Page SEO: Titel, Beschreibung, Überschriften, Inhalt, Links, Bilder (14 Punkte)',
    punkty: [
      ['B1', 'Jede Seite hat einen eigenen Titel, der ihren Inhalt beschreibt', 'Crawler oder kostenloses Audit: Titel sortieren, Duplikate und fehlende Titel finden.', 'hoch'],
      ['B2', 'Der Titel beginnt mit der wichtigsten Information, wiederholt keine Wörter, und der Markenname steht am Ende', 'Prüfen Sie das Ergebnis in Google. Eine Zeichengrenze gibt es nicht, aber Google kürzt lange Titel auf die Bildschirmbreite, setzen Sie das Keyword also nicht ans Ende. Unser Audit warnt ab 60 Zeichen.', 'mittel'],
      ['B3', 'Wichtige Seiten haben eine eindeutige Meta-Beschreibung, die den Inhalt zusammenfasst und zum Klicken anregt', 'Crawler: leere und doppelte Beschreibungen finden. Google zeigt manchmal einen anderen Ausschnitt der Seite, die Beschreibung ist also ein Vorschlag.', 'mittel'],
      ['B4', 'Die Seite hat eine H1-Überschrift, die sagt, worum es geht, und das Haupt-Keyword enthält', 'SEO-Erweiterung im Browser oder Quelltext der Seite: h1-Tags zählen. Google verlangt keine einzelne H1, aber sie ordnet die Seite.', 'mittel'],
      ['B5', 'H2- und H3-Überschriften gliedern den Inhalt in Abschnitte, die Fragen der Kunden beantworten', 'Lesen Sie nur die Überschriften. Reichen sie, um zu verstehen, was auf der Seite steht?', 'mittel'],
      ['B6', 'Der Inhalt beantwortet die Intention des Keywords: bei einer Leistung Umfang, Preis und Ablauf, bei einer Frage eine konkrete Antwort', 'Geben Sie das Keyword bei Google ein und vergleichen Sie den Typ der Seiten in den Top 10 mit Ihrer Seite. Ergänzen Sie, was dort fehlt: eigene Daten, ein Beispiel, einen Preis.', 'hoch'],
      ['B7', 'Der erste Absatz beantwortet die Hauptfrage direkt und enthält das Haupt-Keyword', 'Lesen Sie nur den ersten Absatz. Weiß der Kunde schon, was Sie anbieten und wo?', 'mittel'],
      ['B8', 'Jede wichtige Seite hat ihr eigenes Haupt-Keyword, und zwei Seiten konkurrieren nicht um dasselbe Keyword (Kannibalisierung)', 'Tabelle: Keyword → eine Adresse. Search Console → Leistung → Filter für Suchanfragen → Tab „Seiten“: Mehrere Adressen für ein Keyword erfordern eine Entscheidung.', 'mittel'],
      ['B9', 'Der Inhalt ist aktuell: Preise, Namen der Leistungen, Kontaktdaten und Daten', 'Sehen Sie Leistungsseiten und Preisliste durch. Zeigen Sie bei Artikeln das Datum der Aktualisierung.', 'mittel'],
      ['B10', 'Jede wichtige Seite hat interne Links von anderen Seiten (Menü, Text, Footer)', 'Crawler: Seiten ohne eingehende Links und mehr als 3 Klicks von der Startseite entfernt (unsere Arbeitsregel, kein Google-Limit) finden. Ergänzen Sie einen Link von einer thematisch nahen Seite.', 'hoch'],
      ['B11', 'Der Linktext beschreibt die Zielseite („SEO Audit der Website“, nicht „hier klicken“)', 'Sehen Sie die Links im Text der wichtigsten Seiten durch.', 'mittel'],
      ['B12', 'Bilder haben einen beschreibenden Alternativtext (alt), der zur Seite passt, ohne Keyword-Stuffing', 'Crawler: Bilder ohne alt. Beschreiben Sie das Bild so, wie Sie es einer Person beschreiben, die es nicht sieht.', 'mittel'],
      ['B13', 'Bilddateien haben beschreibende Namen, ein modernes Format (WebP oder AVIF) und gesetzte Abmessungen', 'Prüfen Sie Dateinamen in der Mediathek und den Bericht von Lighthouse.', 'niedrig'],
      ['B14', 'Es ist sichtbar, wer hinter der Website steht: Firmenname, Kontakt, Autor bei Fachtexten', 'Prüfen Sie Footer, die Seite „Über uns“ und die Unterschriften der Artikel. Für Websites in Deutschland gehört ein Impressum dazu (§ 5 DDG: Name, Anschrift, E-Mail, von jeder Seite erreichbar; Orientierung, keine Rechtsberatung).', 'mittel'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Lokales SEO',
    h3: 'C. Lokales SEO: Google Unternehmensprofil und NAP (9 Punkte)',
    punkty: [
      ['C1', 'Das Unternehmen hat ein verifiziertes Google Unternehmensprofil, eines pro Standort', 'Suchen Sie den Firmennamen in Google und in Maps. Melden Sie Duplikate zur Entfernung oder Zusammenführung.', 'hoch'],
      ['C2', 'Der Name im Profil ist der echte Firmenname, ohne angehängte Keywords, Stadt und Slogans', 'Vergleichen Sie den Namen mit Firmenschild, Rechnung und Website.', 'hoch'],
      ['C3', 'Die Hauptkategorie beschreibt, was das Unternehmen ist, und es gibt so wenige zusätzliche Kategorien wie möglich', 'Profil-Dashboard → Kategorien. Eine Kategorie ist die Art des Unternehmens, keine Liste von Leistungen.', 'hoch'],
      ['C4', 'NAP (Name, Adresse, Telefonnummer) ist auf der Website, im Profil und in Branchenverzeichnissen identisch', 'Tragen Sie das NAP von jeder Stelle in eine Tabelle ein und vergleichen Sie Zeichen für Zeichen.', 'hoch'],
      ['C5', 'Ein Unternehmen, das keine Kunden an der Adresse empfängt, blendet die Adresse aus und legt ein Einsatzgebiet fest', 'Profil-Dashboard → Standort und Einsatzgebiet.', 'mittel'],
      ['C6', 'Die Öffnungszeiten sind aktuell, und Feiertage haben besondere Zeiten', 'Prüfen Sie das Profil vor jedem langen Wochenende und vor Feiertagen.', 'mittel'],
      ['C7', 'Die Website hat eine Kontaktseite mit dem NAP als Text (nicht als Bild), mit Karte und Anfahrt', 'Versuchen Sie, die Adresse mit der Maus zu markieren: Geht das nicht, ist sie ein Bild. Bei mehreren Standorten: eine eigene Seite für jeden.', 'mittel'],
      ['C8', 'Bewertungen kommen laufend, und jede hat eine Antwort des Unternehmens', 'Profil-Dashboard → Bewertungen. Antworten Sie auch auf kritische, sachlich und ohne Daten der Kunden. Zahlen Sie nicht für Bewertungen und gewähren Sie dafür keine Rabatte.', 'mittel'],
      ['C9', 'Das Profil hat aktuelle Fotos des Ortes, des Teams oder von Projekten und eine ausgefüllte Liste der Leistungen', 'Vergleichen Sie es mit den Profilen der Unternehmen auf den ersten drei Plätzen in Maps.', 'niedrig'],
    ],
  },
  {
    id: 'D',
    nazwa: 'KI-Tauglichkeit',
    h3: 'D. KI-Tauglichkeit: Zugriff für Bots, Inhalt und Unternehmensdaten (8 Punkte)',
    punkty: [
      ['D1', 'Die robots.txt lässt die Bots der KI-Suchmaschinen zu: OAI-SearchBot (ChatGPT), PerplexityBot, Claude-SearchBot', 'Öffnen Sie die robots.txt. Suchen Sie diese Namen und eine Regel „User-agent: *“ mit „Disallow: /“. Prüfen Sie in der Search Console außerdem Einstellungen → Generative KI in der Suche: Die Website soll einbezogen sein (das ist die Standardeinstellung).', 'hoch'],
      ['D2', 'Die Entscheidung über Trainings-Bots (GPTBot, ClaudeBot, Google-Extended) ist bewusst getroffen und festgehalten', 'Halten Sie in der Vorlage fest, ob Sie sie zulassen. Eine Sperre von Google-Extended hat keinen Einfluss auf die Suchergebnisse von Google.', 'mittel'],
      ['D3', 'Firewall (WAF) oder CDN blockieren keine Bots, die die robots.txt zulässt', 'Prüfen Sie die Einstellungen zum Bot-Schutz bei Hosting-Anbieter oder CDN und die Logs des Servers.', 'mittel'],
      ['D4', 'Die wichtigsten Inhalte (Angebot, Preise, Kontakt) stehen im HTML und nicht nur in Grafiken oder PDF-Dateien', 'Markieren Sie Text auf der Seite und sehen Sie den Quelltext an. Text, der nur in einer Grafik steht, ist für jeden Roboter schwer zu lesen.', 'mittel'],
      ['D5', 'Strukturierte Daten vom Typ Organization oder LocalBusiness in JSON-LD stimmen mit dem überein, was auf der Seite zu sehen ist', 'Test für Rich-Suchergebnisse oder der Validator von schema.org. Name, Adresse und Telefon wie im Profil. Google verlangt diese Daten für KI-Übersichten nicht, aber sie ordnen die Beschreibung des Unternehmens.', 'mittel'],
      ['D6', 'Die Seite „Über uns“ nennt klare Fakten: womit Sie sich beschäftigen, wo und für wen', 'Lesen Sie sie mit den Augen von jemandem, der das Unternehmen nicht kennt. Die Beschreibung des Unternehmens soll im Profil und in sozialen Netzwerken genauso klingen.', 'mittel'],
      ['D7', 'Auf der Website stehen Antworten auf typische Kundenfragen (Preis, Dauer, Ablauf), direkt und konkret geschrieben', 'Notieren Sie die Fragen, die Kunden am Telefon stellen, und die Google-Vorschläge zum Namen der Leistung. Hat jede eine Antwort auf der Website? Google verlangt keine Aufteilung des Textes in kurze Stücke für KI: Es zählt die Antwort selbst.', 'mittel'],
      ['D8', 'Optional: eine Datei llms.txt im Stammverzeichnis mit Beschreibung des Unternehmens und Links zu den wichtigsten Seiten', 'Öffnen Sie ihredomain.de/llms.txt. Die Google-Suche nutzt sie nicht, erledigen Sie sie also nach den Punkten oben.', 'niedrig'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Messung',
    h3: 'E. Messung: Search Console und GA4 (9 Punkte)',
    punkty: [
      ['E1', 'Die Search Console umfasst die ganze Domain, und Inhaber ist das Konto des Unternehmens', 'Search Console → Einstellungen → Nutzer und Berechtigungen. Die Agentur kann Zugriff haben, aber nicht als alleiniger Inhaber.', 'hoch'],
      ['E2', 'Die Sitemap ist im Bericht „Sitemaps“ eingereicht und zeigt keine Verarbeitungsfehler', 'Search Console → Sitemaps: Status „Erfolgreich“ und Zahl der erkannten Adressen.', 'mittel'],
      ['E3', 'Der Bericht „Seiten“ ist durchgesehen: Wichtige Seiten sind indexiert, und die Gründe für Ausschlüsse sind verständlich', 'Search Console → Seiten. Beginnen Sie mit Leistungsseiten und Kontakt.', 'hoch'],
      ['E4', 'GA4 läuft auf allen Seiten mit einem Tag, und die Property gehört dem Unternehmen', 'Vorschau im Google Tag Assistant oder der Echtzeitbericht in GA4.', 'hoch'],
      ['E5', 'Schlüsselereignisse in GA4 messen Handlungen der Kunden: Formular, Klick auf das Telefon und auf die E-Mail-Adresse', 'GA4 → Verwaltung → Schlüsselereignisse. Senden Sie ein Testformular und prüfen Sie, ob das Ereignis erscheint.', 'hoch'],
      ['E6', 'GA4 ist mit der Search Console verknüpft', 'GA4 → Verwaltung → Produktverknüpfungen → Search Console.', 'niedrig'],
      ['E7', 'Die Liste der beobachteten Keywords ist abgestimmt und festgehalten, und Sie messen die Positionen jeden Monat mit derselben Methode', 'Halten Sie Keywords, Standort und Gerät der Messung fest. Ein Methodenwechsel verdirbt Vergleiche.', 'mittel'],
      ['E8', 'Einen festen Satz von Kundenfragen prüfen Sie jeden Monat in ChatGPT, Gemini, Perplexity und den AI Overviews von Google', 'Halten Sie Fragen und Ergebnis fest: Wird das Unternehmen genannt, und welche Quellen werden zitiert? Impressionen der Seite in AI Overviews und im KI-Modus zeigt der Leistungsbericht zu generativer KI in der Search Console.', 'mittel'],
      ['E9', 'Der Ausgangszustand ist vor den Änderungen festgehalten, und Sie vergleichen Ergebnisse von Jahr zu Jahr', 'Halten Sie Datum, Klicks ohne Markenanfragen und die Zahl der Kundenanfragen fest. Zählen Sie sie auch im Postfach oder CRM: Bei abgelehnter Cookie-Einwilligung kann GA4 sie zu niedrig ausweisen.', 'hoch'],
    ],
  },
];

/** Lista punktów dla PDF (scripts/szablony/pdf-de.mjs) i podglądu. */
export const PUNKTY_DE = OBSZARY;

const ile = (obszary) => obszary.reduce((n, o) => n + o.punkty.length, 0);

function pogrubPunkt(nr, punkt) {
  const caly = `${nr}. ${punkt}.`;
  if (caly.length <= 78) return `<strong>${caly}</strong>`;
  const ciecie = caly.lastIndexOf(' ', 76);
  if (ciecie <= nr.length + 2) return `<strong>${nr}.</strong> <span class="sz-chk-punkt">${punkt}.</span>`;
  return `<strong>${caly.slice(0, ciecie)}</strong> <span class="sz-chk-punkt">${caly.slice(ciecie + 1)}</span>`;
}

function podgladHtml(obszary) {
  return obszary
    .map((o) => `<h3>${o.h3}</h3><ul>${o.punkty
      .map(([nr, punkt, sposob, p]) => `<li>☐ ${pogrubPunkt(nr, punkt)} So prüfen Sie es: ${sposob} <em>Priorität: ${p}.</em></li>`)
      .join('')}</ul>`)
    .join('');
}

const ZRODLA = [
  ['https://developers.google.com/search/docs/appearance/title-link', 'Google Search Central: Titel-Links in den Suchergebnissen beeinflussen'],
  ['https://developers.google.com/search/docs/appearance/snippet', 'Google Search Central: Snippets und Meta-Beschreibung in den Suchergebnissen steuern'],
  ['https://developers.google.com/search/docs/appearance/google-images', 'Google Search Central: Best Practices für Bilder in der Google-Suche'],
  ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'Google Search Central: SEO-Einsteigerleitfaden'],
  ['https://developers.google.com/search/docs/appearance/core-web-vitals', 'Google Search Central: Core Web Vitals verstehen'],
  ['https://developers.google.com/search/docs/crawling-indexing/robots/intro', 'Google Search Central: Einführung in robots.txt'],
  ['https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', 'Google Search Central: Sitemap erstellen und einreichen'],
  ['https://developers.google.com/search/docs/appearance/structured-data/sd-policies', 'Google Search Central: Allgemeine Richtlinien für strukturierte Daten'],
  ['https://developers.google.com/search/docs/appearance/structured-data/local-business', 'Google Search Central: Strukturierte Daten für lokale Unternehmen (LocalBusiness)'],
  ['https://developers.google.com/search/docs/appearance/ai-features', 'Google Search Central: KI-Funktionen und Ihre Website'],
  ['https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers', 'Google Search Central: Gängige Crawler von Google (Google-Extended)'],
  ['https://support.google.com/business/answer/3038177', 'Google Unternehmensprofil Hilfe: Richtlinien zur Darstellung Ihres Unternehmens'],
  ['https://support.google.com/analytics/answer/13965727', 'Google-Analytics-Hilfe: Schlüsselereignisse'],
  ['https://developers.openai.com/api/docs/bots', 'OpenAI: Überblick über die Crawler von OpenAI (Englisch)'],
  ['https://docs.perplexity.ai/docs/resources/perplexity-crawlers', 'Perplexity: Crawler von Perplexity (Englisch)'],
  ['https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', 'Anthropic: Crawlt Anthropic Daten aus dem Web, und wie können Websitebetreiber den Crawler sperren? (Englisch)'],
  ['https://llmstxt.org/', 'llmstxt.org: Vorschlag für die Datei /llms.txt (Englisch)'],
  ['https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', 'Google Search Central: Optimierung für generative KI-Funktionen (Mythen: llms.txt, Aufteilung von Inhalten, Schema)'],
  ['https://developers.google.com/search/docs/crawling-indexing/block-indexing', 'Google Search Central: Indexierung mit noindex verhindern'],
  ['https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', 'Google Search Central: Kanonische URL festlegen'],
  ['https://developers.google.com/search/docs/specialty/international/localized-versions', 'Google Search Central: Google über lokalisierte Versionen Ihrer Seite informieren (hreflang)'],
  ['https://web.dev/articles/vitals', 'web.dev: Schwellenwerte der Web Vitals (75. Perzentil, Englisch)'],
  ['https://developers.google.com/search/updates', 'Google Search Central: Änderungsprotokoll der Dokumentation (HowTo-Ergebnisse im September 2023 entfernt, FAQ am 07.05.2026)'],
  ['https://support.google.com/webmasters/answer/16984139', 'Search-Console-Hilfe: Leistungsbericht zu generativer KI (AI Overviews, KI-Modus)'],
  ['https://support.google.com/contributionpolicy/answer/7400114', 'Richtlinien für Inhalte in Google Maps: Verbot bezahlter und belohnter Bewertungen'],
  ['https://support.google.com/webmasters/answer/16908024', 'Search-Console-Hilfe: Einstellung für generative KI in der Suche (seit 31.08.2026)'],
  ['https://support.google.com/business/answer/13763036', 'Google Unternehmensprofil Hilfe: Wer ein Unternehmensprofil haben darf (reine Online-Unternehmen nicht)'],
];

const SZABLON_DE = {
  seo: {
    tytul: 'SEO Checkliste 2026: 50 Punkte zum Download',
    opis: 'SEO Checkliste mit 50 Punkten für Technik, On-Page SEO, lokale Sichtbarkeit, KI-Tauglichkeit und Messung, mit Prioritäten, Beispiel und kostenlosem PDF.',
  },
  de: {
    okruszek: 'SEO Checkliste',
    tag: 'Kostenlose Vorlage',
    h1: 'SEO Checkliste für Ihre Website',
    lead: 'Eine SEO Checkliste (auch SEO Maßnahmen Checkliste) ist eine Reihe von Ja-Nein-Prüfungen, die zeigen, ob Ihre Website hat, was sie braucht, um in Google und in KI-Antworten zu erscheinen. Unsere hat 50 Punkte in fünf Bereichen: technische Grundlagen, On-Page, lokales SEO, KI-Tauglichkeit und Messung, jeweils mit Priorität und einer Möglichkeit zur Überprüfung. Die ganze Liste steht unten; das PDF senden wir Ihnen per E-Mail.',
    karta: {
      nazwa: 'SEO Checkliste (PDF)',
      opis: '50 Punkte für technische Grundlagen, On-Page SEO, lokales SEO, KI-Tauglichkeit und Messung, jeweils mit Priorität und einer Möglichkeit zur Überprüfung.',
      cta: 'Checkliste herunterladen',
    },
    sekcje: [
      {
        id: 'was-ist-eine-seo-checkliste',
        h2: 'Was eine SEO Checkliste ist und wann Sie sie nutzen',
        html: [
          '<p>Eine SEO Checkliste ist eine Liste konkreter Prüfpunkte, die Sie nachprüfen und abhaken können: ja oder nein, ohne Interpretation. Sie ersetzt weder eine Strategie noch die Arbeit an Ihren Inhalten. Sie zeigt aber, ob Ihre Website die Grundlagen hat, von denen SEO abhängt: Sieht Google die Website, versteht Google, worum es geht, wird Ihr Unternehmen in Maps einheitlich beschrieben, und messen Sie, wie viele Anfragen die Suche tatsächlich bringt?</p>',
          '<p>Diese Checkliste ist bewusst allgemein gehalten. Sie umfasst fünf Bereiche, und jeder füllt in der PDF-Vorlage eine eigene Seite. Brauchen Sie eine tiefere technische Prüfung, etwa zu Schwellenwerten der Serverantwort, Logs, Rendering, Crawl Budget oder einer Migration, ist ein vollständiges SEO Audit der richtige Weg.</p>',
          '<p>Wann Sie sie nutzen:</p>',
          '<ul>',
          '<li><strong>bevor eine neue Website online geht</strong> oder nach einem Relaunch, bevor Google die neue Version aufnimmt;</li>',
          '<li><strong>einmal im Quartal</strong> als Gesundheitscheck;</li>',
          '<li><strong>nach einer größeren Änderung</strong>: neues CMS, neue URLs, neue Leistungen, Umzug auf eine neue Adresse;</li>',
          '<li><strong>vor dem Gespräch mit einer Agentur</strong>, damit Sie wissen, was Sie fragen und worauf Sie in deren Berichten achten sollten.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'fuenf-bereiche',
        h2: 'Fünf Bereiche, 50 Punkte: was diese SEO Checkliste abdeckt',
        html: '<p>Die Punkte folgen der Reihenfolge, in der die Arbeit an einer Website üblicherweise abläuft: zuerst, ob Google die Website überhaupt lesen kann, dann Inhalt und Unternehmensprofil und zuletzt, wie Sie Ergebnisse messen.</p>',
        tabela: {
          id: 'tabelle-bereiche',
          caption: 'SEO Checkliste: fünf Bereiche und 50 Punkte',
          columns: [
            { key: 'area', label: 'Bereich' },
            { key: 'checks', label: 'Punkte' },
            { key: 'covers', label: 'Was er abdeckt' },
            { key: 'tools', label: 'Was Sie brauchen' },
          ],
          rows: [
            { area: 'A. Technische Grundlagen', checks: '10', covers: 'Ob Google Ihre Seiten erreicht, indexiert und auf dem Smartphone gut darstellt', tools: 'robots.txt, Search Console, ein Crawler' },
            { area: 'B. On-Page', checks: '14', covers: 'Titel, Meta-Beschreibungen, Überschriften, Inhalt, interne Links, Bilder', tools: 'Ein Crawler, Ihr Browser, Search Console' },
            { area: 'C. Lokales SEO', checks: '9', covers: 'Google Unternehmensprofil, einheitliches NAP, Bewertungen, die Kontaktseite', tools: 'Ihr Profil-Dashboard, Google Maps' },
            { area: 'D. KI-Tauglichkeit', checks: '8', covers: 'Zugriff von KI-Bots, Inhalt im HTML, Antworten auf Kundenfragen, einheitliche Unternehmensdaten, llms.txt (optional)', tools: 'robots.txt, der Validator von schema.org' },
            { area: 'E. Messung', checks: '9', covers: 'Search Console, Schlüsselereignisse in GA4, beobachtete Keywords und KI-Fragen', tools: 'Search Console, GA4' },
          ],
          przypis: 'In der PDF-Vorlage ist jeder Bereich eine eigene Seite mit Feldern für Status, Notizen, Verantwortliche und Termin.',
        },
        htmlPo: '<p>Die Reihenfolge ist wichtig. Technische Grundlagen stehen zuerst, denn Korrekturen am Inhalt nützen nichts, solange eine Seite noindex trägt oder die robots.txt sie sperrt. Die Messung steht zuletzt in der Liste, richten Sie sie aber ganz am Anfang ein: Ohne Ausgangswert können Sie nicht zeigen, was Ihre Änderungen bewirkt haben.</p>',
      },
      {
        id: 'so-fuellen-sie-aus',
        h2: 'So füllen Sie die SEO Checkliste aus, Schritt für Schritt',
        html: [
          '<ol>',
          '<li><strong>Ausgangswert festhalten.</strong> Notieren Sie, bevor Sie etwas ändern, das Datum, die Klicks ohne Markenanfragen aus der Search Console und die Zahl der Kundenanfragen aus GA4 und Ihrem Postfach oder CRM.</li>',
          '<li><strong>Zugänge sammeln.</strong> Sie brauchen Search Console, GA4, Ihr Google Unternehmensprofil, Ihr CMS und Ihre robots.txt. Was fehlt, ist Ihr erster Befund.</li>',
          '<li><strong>Bereiche der Reihe nach durchgehen.</strong> Markieren Sie jeden Punkt als OK, Handlungsbedarf oder n. z. (nicht zutreffend).</li>',
          '<li><strong>Beschreiben, was nicht stimmt.</strong> Schreiben Sie in die Notizen die URL und das Problem, zum Beispiel „/kontakt: keine H1“. Ein bloßes „Handlungsbedarf“ sagt der Person, die es behebt, nichts.</li>',
          '<li><strong>Nach Priorität ordnen.</strong> Punkte mit hoher Priorität kommen zuerst. Geben Sie jedem eine verantwortliche Person und einen Termin.</li>',
          '<li><strong>Nach den Korrekturen erneut prüfen.</strong> Gehen Sie die Punkte mit „Handlungsbedarf“ noch einmal durch. Wiederholen Sie die ganze Liste jedes Quartal.</li>',
          '</ol>',
          '<p>Auf Seite eins des PDF steht eine Übersichtstabelle: Für jeden Bereich tragen Sie ein, wie viele Punkte OK sind, Handlungsbedarf haben oder nicht zutreffen. Nach der nächsten Prüfung sehen Sie auf einen Blick, ob die Liste kürzer wird.</p>',
        ].join(''),
      },
      {
        id: 'prioritaeten',
        h2: 'So lesen Sie die Prioritäten: hoch, mittel, niedrig',
        html: '<p>Die Priorität sagt, was Sie zuerst tun. Sie spiegelt wider, wie stark ein Problem Sichtbarkeit oder Messung blockiert, nicht wie aufwendig die Korrektur ist.</p>',
        tabela: {
          id: 'tabelle-prioritaeten',
          caption: 'Prioritäten in der SEO Checkliste',
          columns: [
            { key: 'priority', label: 'Priorität' },
            { key: 'meaning', label: 'Was sie bedeutet' },
            { key: 'examples', label: 'Beispiele aus der Liste' },
            { key: 'when', label: 'Wann beheben' },
          ],
          rows: [
            { priority: 'Hoch', meaning: 'Blockiert die Sichtbarkeit in Google oder Maps oder blockiert die Messung. Ohne das zahlt sich die übrige Arbeit nicht aus.', examples: 'noindex auf einer Leistungsseite, kein Unternehmensprofil, keine Schlüsselereignisse in GA4', when: 'Zuerst, vor mittlerer und niedriger Priorität' },
            { priority: 'Mittel', meaning: 'Bremst Ergebnisse, aber die Website funktioniert und ist sichtbar.', examples: 'Doppelte Meta-Beschreibungen, Bilder ohne Alt-Text, veraltete Öffnungszeiten', when: 'Im Rahmen der laufenden Arbeit in den nächsten Wochen' },
            { priority: 'Niedrig', meaning: 'Räumt auf und schleift Details.', examples: 'Dateinamen von Bildern, llms.txt, Verknüpfung von GA4 mit der Search Console', when: 'Zusammen mit anderen Änderungen' },
          ],
        },
        htmlPo: '<p>Verstehen Sie die Priorität als Ausgangspunkt, nicht als Regel. Für ein lokales Unternehmen sind ein einheitliches NAP und ein solides Google Unternehmensprofil wichtiger als für einen Onlineshop mit bundesweitem Versand. Trifft ein Punkt auf Sie nicht zu, markieren Sie ihn als n. z. und lassen Sie ihn aus Ihrer Wertung. Haben viele offene Punkte dieselbe Priorität, ordnen Sie sie nach ihrer Wirkung auf Kundenanfragen, nach Ihrer Sicherheit bei dieser Wirkung und nach dem Aufwand der Korrektur (ICE-Methode).</p>',
      },
      {
        id: 'beispiel',
        h2: 'Ausgefülltes Beispiel: ein Teil einer Checkliste',
        html: '<p>Hier ein Teil einer Checkliste, ausgefüllt für ein fiktives Unternehmen: eine Physiotherapiepraxis mit einem Standort in Warschau. Die Angaben sind erfunden. Es geht darum zu zeigen, wie Sie Status und Notizen festhalten, damit die Liste direkt zum Arbeitsplan wird.</p>',
        tabela: {
          id: 'tabelle-beispiel',
          caption: 'Ausgefülltes Beispiel (fiktives Unternehmen, Beispieldaten)',
          columns: [
            { key: 'nr', label: 'Nr.' },
            { key: 'check', label: 'Punkt' },
            { key: 'status', label: 'Status' },
            { key: 'note', label: 'Notiz' },
            { key: 'owner', label: 'Verantwortlich und Termin' },
          ],
          rows: [
            { nr: 'A3', check: 'robots.txt sperrt keine wichtigen Seiten', status: 'OK', note: 'Gesperrt ist nur das Verzeichnis des Patientenportals, mit Absicht', owner: '-' },
            { nr: 'A4', check: 'Kein noindex auf wichtigen Seiten', status: 'Handlungsbedarf', note: 'Die Preisseite trägt noch ein noindex aus der Testumgebung', owner: 'Webentwickler, diese Woche' },
            { nr: 'B1', check: 'Ein eindeutiger Titel auf jeder Seite', status: 'Handlungsbedarf', note: 'Jede Behandlungsseite hat denselben Titel „Leistungen“', owner: 'Inhaber, bis Monatsende' },
            { nr: 'B10', check: 'Interne Links auf wichtige Seiten', status: 'Handlungsbedarf', note: 'Die Seite zur Knie-Reha hat keinen Link aus dem Menü oder von anderen Seiten', owner: 'Webentwickler, bis Monatsende' },
            { nr: 'C2', check: 'Echter Firmenname im Profil', status: 'Handlungsbedarf', note: 'Jemand hat „Physiotherapie Mokotów“ zum Namen hinzugefügt', owner: 'Inhaber, sofort' },
            { nr: 'C4', check: 'Einheitliches NAP', status: 'Handlungsbedarf', note: 'Alte Telefonnummer in Branchenverzeichnissen', owner: 'Empfang, diese Woche' },
            { nr: 'C5', check: 'Ausgeblendete Adresse und Einsatzgebiet', status: 'n. z.', note: 'Die Praxis empfängt Patienten an ihrer Adresse, die Adresse bleibt also sichtbar', owner: '-' },
            { nr: 'D1', check: 'KI-Suchbots zugelassen', status: 'OK', note: 'Keine sperrenden Regeln', owner: '-' },
            { nr: 'E5', check: 'Schlüsselereignisse in GA4', status: 'Handlungsbedarf', note: 'Das Buchungsformular sendet kein Ereignis', owner: 'Webentwickler, diese Woche' },
          ],
        },
        htmlPo: '<p>Jeder offene Punkt in diesem Ausschnitt hat hohe Priorität, die Termine bestimmen also die Reihenfolge: das noindex auf der Preisseite, der Name im Profil, das NAP und das GA4-Ereignis sofort oder diese Woche, Titel und interne Links bis Monatsende. C5 trifft auf die Praxis nicht zu und bleibt daher aus der Wertung. Eine Notiz mit URL und verantwortlicher Person macht aus einer Checkliste eine Aufgabenliste.</p>',
      },
      {
        id: 'ki-tauglichkeit',
        h2: 'KI-Tauglichkeit: was Sie prüfen und was warten kann',
        html: '<p>Einige Punkte betreffen die Sichtbarkeit in ChatGPT, Perplexity, Claude und den AI Overviews von Google. Beginnen Sie mit dem Zugriff der Bots. KI-Unternehmen trennen die Bots, die ihre Suchfunktionen betreiben, von den Bots, die Inhalte für das Modelltraining sammeln. Die Sperre des einen sperrt nicht den anderen.</p>',
        tabela: {
          id: 'tabelle-ki-bots',
          caption: 'KI-Bots in der robots.txt: was sie tun, laut Dokumentation der Unternehmen (Abruf 11. November 2026)',
          columns: [
            { key: 'bot', label: 'Bot' },
            { key: 'company', label: 'Unternehmen' },
            { key: 'purpose', label: 'Was er tut' },
            { key: 'blocking', label: 'Was seine Sperre bewirkt' },
          ],
          rows: [
            { bot: 'OAI-SearchBot', company: 'OpenAI', purpose: 'Zeigt Websites in der ChatGPT-Suche an', blocking: 'Ihre Website erscheint nicht in den Suchantworten von ChatGPT (ein navigierender Link kann trotzdem erscheinen)' },
            { bot: 'GPTBot', company: 'OpenAI', purpose: 'Sammelt Inhalte, die für das Training von Modellen verwendet werden können', blocking: 'Signalisiert, dass Ihre Inhalte nicht für das Training verwendet werden sollen' },
            { bot: 'PerplexityBot', company: 'Perplexity', purpose: 'Zeigt Websites in den Ergebnissen von Perplexity an und verlinkt sie; laut Unternehmen nicht für das Modelltraining genutzt', blocking: 'Geringere Chance, in den Ergebnissen von Perplexity zu erscheinen' },
            { bot: 'Claude-SearchBot', company: 'Anthropic', purpose: 'Indexiert Inhalte für die Suche in Claude', blocking: 'Kann Ihre Sichtbarkeit in Antworten mit Suche verringern' },
            { bot: 'ClaudeBot', company: 'Anthropic', purpose: 'Sammelt Inhalte, die für das Training von Modellen verwendet werden können', blocking: 'Signalisiert, dass Ihre künftigen Inhalte vom Training ausgeschlossen werden sollen' },
            { bot: 'Google-Extended', company: 'Google', purpose: 'Ein Token der robots.txt für das Training von Gemini-Modellen und Grounding in den Gemini-Apps und Vertex AI', blocking: 'Laut Google kein Einfluss auf Aufnahme oder Ranking in der Google-Suche' },
          ],
          przypis: 'Quellen: Dokumentation von OpenAI, Perplexity, Anthropic und Google (am Ende der Seite aufgelistet). Laut diesen Unternehmen beachten Bots, die auf Anfrage eines Nutzers ausgelöst werden (ChatGPT-User, Perplexity-User), die Regeln der robots.txt möglicherweise nicht.',
        },
        htmlPo: [
          '<p>Die AI Overviews von Google funktionieren anders. Google erklärt klar, dass es für das Erscheinen in AI Overviews oder im KI-Modus keine zusätzlichen Anforderungen gibt: Eine Seite muss indexiert sein und mit einem Snippet in der Suche erscheinen dürfen. Sie brauchen keine besonderen Dateien, keine strukturierten Daten und keinen in kurze Stücke zerlegten Text. Die KI-Funktionen von Google laufen auf denselben Systemen wie die normalen Ergebnisse, und Google nennt Unternehmensprofile als Möglichkeit, in KI-Antworten sichtbar zu sein. Deshalb sind die technischen, On-Page- und lokalen Punkte dieser Liste wichtiger als llms.txt.</p>',
          '<p>Was Google in der Suche zeigt, steuern Ihre Regeln für Googlebot sowie nosnippet, max-snippet und noindex. Seit dem 31. August 2026 hat die Search Console außerdem eine Einstellung für generative KI in der Suche. Mit ihr können Sie Ihre Website aus AI Overviews, dem KI-Modus und generativen KI-Funktionen in Discover ausschließen, und laut Google hat sie keinen Einfluss auf den Rest der Suche. Websites sind standardmäßig einbezogen. Die Sperre von Google-Extended entfernt Ihre Website weder aus den normalen Ergebnissen noch aus AI Overviews: Sie betrifft das Training von Gemini-Modellen, die Gemini-Apps und Vertex AI.</p>',
          '<p>llms.txt ist ein auf llmstxt.org beschriebener Standardvorschlag: eine Markdown-Datei mit dem Namen Ihrer Website, einer kurzen Zusammenfassung und einer Liste von Links zu Ihren wichtigsten Inhalten. Die Google-Suche nutzt sie nicht: Laut der Dokumentation von Google hilft die Datei Ihrer Sichtbarkeit weder noch schadet sie ihr. Für KI-Tools und Agenten, die sie lesen, kann sie nützlich sein, deshalb ist sie in dieser Liste ein optionaler Punkt mit niedriger Priorität. Wenn Sie eine möchten, erstellt sie der <a href="/de/tools/llms-txt-generator">llms.txt Generator</a> und prüft, ob KI-Bots Ihre Website erreichen.</p>',
          '<p>Strukturierte Daten sind eine eigene Frage. Google empfiehlt JSON-LD und verlangt, dass Markup Inhalte beschreibt, die Leser tatsächlich sehen. Für AI Overviews ist es nicht nötig, aber ein Schema vom Typ Organization oder LocalBusiness mit demselben Namen, derselben Adresse und Telefonnummer wie im Unternehmensprofil hält Ihre Unternehmensdaten einheitlich. Ergänzen Sie FAQ- oder HowTo-Markup aber nicht in der Hoffnung auf ein Rich-Ergebnis: Google hat die Anzeige von HowTo-Rich-Ergebnissen 2023 und von FAQ-Rich-Ergebnissen am 7. Mai 2026 eingestellt.</p>',
        ].join(''),
      },
      {
        id: 'haeufige-fehler',
        h2: 'Häufige Fehler beim Abarbeiten einer SEO Checkliste',
        html: [
          '<ul>',
          '<li><strong>Seiten per robots.txt verstecken.</strong> Eine Disallow-Regel hält den Crawler auf, entfernt die URL aber nicht aus den Ergebnissen: Google kann sie weiterhin indexieren, wenn andere Seiten auf sie verlinken. Um eine Seite aus Google herauszuhalten, nutzen Sie noindex und sperren die Seite nicht gleichzeitig in der robots.txt, sonst sieht der Crawler das Tag nie.</li>',
          '<li><strong>Alle KI-Bots auf einmal sperren.</strong> Eine Regel für „User-agent: *“ oder eine aus einem Forum kopierte Liste schließt oft auch KI-Suchbots aus, obwohl nur das Modelltraining abgelehnt werden sollte.</li>',
          '<li><strong>Keyword-Stuffing.</strong> In Titeln, in Alt-Texten von Bildern und im Namen Ihres Unternehmensprofils. Google rät davon ab, dieselben Wörter in einem Titel zu wiederholen und alt-Attribute mit Keywords zu füllen, und der Name Ihres Profils muss Ihr echter Firmenname sein.</li>',
          '<li><strong>Kästchen ohne Notizen abhaken.</strong> „Handlungsbedarf“ ohne URL und ohne Beschreibung bedeutet, dass später jemand dieselbe Analyse wiederholen muss.</li>',
          '<li><strong>Alles auf einmal erledigen.</strong> Fünfzig Punkte in zufälliger Reihenfolge bedeuten viel Arbeit und wenig Wirkung. Hohe Priorität zuerst.</li>',
          '<li><strong>Nur Rankings verfolgen.</strong> Die Rankings steigen, das Telefon schweigt? Ohne Schlüsselereignisse in GA4 wissen Sie nicht, ob SEO Kunden bringt.</li>',
          '<li><strong>Nur einmal prüfen.</strong> Websites verändern sich: ein neues Plugin, ein neues Theme, eine neue Seite. Die Liste wirkt nur, wenn Sie regelmäßig zu ihr zurückkehren.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'wenn-die-checkliste-nicht-reicht',
        h2: 'Wenn eine Checkliste nicht reicht',
        html: [
          '<p>Diese Checkliste können Sie selbst abarbeiten, wenn Sie Zugriff auf Search Console, GA4 und Ihr Unternehmensprofil haben. Unser <a href="/de/tools/kostenloser-seo-audit">kostenloses SEO Audit</a> übernimmt einen Teil der technischen und On-Page-Prüfungen für Sie: bis zu 25 Unterseiten, eine Punktzahl von 1 bis 100 und eine Fehlerliste mit Anleitung zur Behebung.</p>',
          '<p>Eine externe Prüfung ist sinnvoll, wenn der Traffic ohne erkennbaren Grund sinkt, vor einer Migration oder einem Relaunch, bei einer großen Website oder einem Onlineshop und wenn Sie eine Liste von Problemen haben, aber niemanden, der daraus einen Plan für Ihre Entwickler macht. Dann bestellen Sie einen vollständigen <a href="/de/seo-audit">SEO Audit</a> ab 350 € netto. Wenn Ihre Hauptfrage lautet, ob ChatGPT und Gemini Ihr Unternehmen empfehlen, ist unser KI-Sichtbarkeit Audit eine eigene Leistung für 235 € netto (siehe <a href="/de/ki-suchoptimierung">Generative Engine Optimization</a>).</p>',
          '<p>Alle Preise netto zzgl. gesetzlicher MwSt.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: die vollständige SEO Checkliste',
      opis: `Hier steht alles, was in der Vorlage enthalten ist: ${ile(OBSZARY)} Punkte in fünf Bereichen. Im PDF hat jeder Bereich eine eigene Seite, und jeder Punkt hat Felder für Status (OK, Handlungsbedarf, n. z.), Notizen, Verantwortliche und Termin.`,
      html: podgladHtml(OBSZARY),
    },
    formularz: {
      h2: 'Vorlage als PDF erhalten',
      opis: 'Wir senden Ihnen die SEO Checkliste als druckbares PDF: ein Bereich pro Seite, mit Feldern für Status, Notizen, Verantwortliche und Termin sowie einer Übersichtstabelle auf Seite eins.',
      etykieta: 'E-Mail-Adresse, an die wir die Checkliste senden',
      przycisk: 'Checkliste (PDF) senden',
      przedmiot: 'die SEO Checkliste',
      komunikatOk: 'Gesendet. Schauen Sie in Ihr Postfach (auch in die Ordner „Werbung“ oder „Spam“): Der Link zum PDF der SEO Checkliste kommt innerhalb einer Minute.',
    },
    kroki: [
      { name: 'Ausgangswert festhalten', text: 'Notieren Sie, bevor Sie etwas ändern, das Datum, die Klicks ohne Markenanfragen aus der Search Console und die Zahl der Kundenanfragen aus GA4 und Ihrem Postfach oder CRM.' },
      { name: 'Zugänge sammeln', text: 'Besorgen Sie sich Zugriff auf Search Console, GA4, Ihr Google Unternehmensprofil, Ihr CMS und Ihre robots.txt. Fehlende Zugänge sind Ihr erster Befund.' },
      { name: 'Bereiche der Reihe nach durchgehen', text: 'Beginnen Sie mit den technischen Grundlagen, dann On-Page, lokales SEO, KI-Tauglichkeit und Messung. Markieren Sie jeden Punkt als OK, Handlungsbedarf oder n. z.' },
      { name: 'Probleme beschreiben', text: 'Schreiben Sie in die Notizen die URL und das konkrete Problem, zum Beispiel „/kontakt: keine H1“, damit die Person, die es behebt, die Analyse nicht wiederholen muss.' },
      { name: 'Nach Priorität ordnen', text: 'Punkte mit hoher Priorität zuerst, dann mittlere und niedrige. Geben Sie jedem eine verantwortliche Person und einen Termin.' },
      { name: 'Erneut prüfen', text: 'Gehen Sie nach den Korrekturen die Punkte mit „Handlungsbedarf“ noch einmal durch und aktualisieren Sie die Übersichtstabelle. Wiederholen Sie die ganze Checkliste jedes Quartal und nach jeder größeren Änderung der Website.' },
    ],
    faq: [
      {
        question: 'Worin unterscheidet sich eine SEO Checkliste von einem SEO Audit?',
        answer: 'Eine Checkliste ist eine Liste von Punkten, die Sie selbst prüfen und abhaken: ja oder nein. Ein SEO Audit ist eine Analyse, in der eine Spezialistin oder ein Spezialist diese Punkte vertieft, die Ursachen von Problemen findet, Ihre Website mit Konkurrenten vergleicht und einen priorisierten Maßnahmenplan erstellt. Eine Checkliste eignet sich gut als regelmäßiger Gesundheitscheck und als Vorbereitung auf ein Audit, ersetzt ihn aber nicht nach einem Traffic-Einbruch, bei einer Migration oder bei einer großen Website.',
      },
      {
        question: 'Wie oft sollte ich die Checkliste durchgehen?',
        answer: 'Gehen Sie die ganze Liste einmal im Quartal durch und nach jeder größeren Änderung: neues Theme, neues CMS, neue URLs, Umzug auf eine neue Adresse oder eine neue Telefonnummer. Prüfen Sie die Punkte zur Messung monatlich, denn eine defekte GA4-Einrichtung übersieht man leicht, und Daten, die Ihre Tools nie erfasst haben, lassen sich später nicht wiederherstellen.',
      },
      {
        question: 'Brauche ich eine Datei llms.txt, um in den AI Overviews von Google zu erscheinen?',
        answer: 'Nein. Laut der Dokumentation von Google müssen Sie für das Erscheinen in AI Overviews oder im KI-Modus keine besonderen Dateien, zusätzliches Markup oder strukturierte Daten erstellen, und die Google-Suche selbst nutzt llms.txt nicht. Eine Seite muss indexiert sein und mit einem Snippet in der Suche erscheinen dürfen. Deshalb hat llms.txt auf dieser Checkliste niedrige Priorität. Anderen KI-Tools, die sie lesen, kann sie helfen, erledigen Sie sie aber nach den technischen und On-Page-Punkten.',
      },
      {
        question: 'Kann ich KI-Bots sperren und trotzdem in Google erscheinen?',
        answer: 'Ja, aber Sie müssen die Bots unterscheiden. Laut Google hat die Sperre des Tokens Google-Extended keinen Einfluss auf Aufnahme oder Ranking in der Google-Suche. Die Sperre von OAI-SearchBot hält Ihre Website dagegen aus den Suchantworten von ChatGPT heraus. Ein sinnvoller Mittelweg: KI-Suchbots zulassen und über Trainings-Bots wie GPTBot und ClaudeBot bewusst entscheiden und die Entscheidung festhalten.',
      },
      {
        question: 'Eignet sich diese Checkliste für einen Onlineshop?',
        answer: 'Als Fundament ja: technische Grundlagen, On-Page und Messung gelten für jede Website. Onlineshops haben aber Probleme, die eine allgemeine Liste nicht abdeckt: Filter und Sortierungen, die riesige Mengen an URLs erzeugen, ausgelaufene Produkte, strukturierte Daten zu Produkten und Crawl Budget. Dafür brauchen Sie eine tiefere Prüfung oder ein professionelles SEO Audit.',
      },
      {
        question: 'Muss ich alle 50 Punkte bestehen?',
        answer: 'Nein. Nicht jeder Punkt passt zu jedem Unternehmen. C5 (ausgeblendete Adresse) entfällt, wenn Sie Kunden an Ihrer Adresse empfangen, und ein reiner Onlineshop hat keinen Anspruch auf ein Google Unternehmensprofil und überspringt damit den größten Teil von Bereich C. Markieren Sie diese Punkte als n. z. und lassen Sie sie aus Ihrer Wertung. Wichtiger als eine perfekte Wertung ist, jeden Punkt mit hoher Priorität zu schließen, bevor Sie sich an die Details machen.',
      },
    ],
    zrodla: ZRODLA.map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'Punktzahl von 1 bis 100 und Fehlerliste für bis zu 25 Unterseiten' },
      { href: '/narzedzia/generator-llms-txt', tekst: 'llms.txt Generator', opis: 'llms.txt erstellen und testen, ob KI-Bots Ihre Website erreichen' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'eine vollständige Analyse mit Maßnahmenplan, ab 350 € netto' },
      { href: '/narzedzia/content-plan', tekst: 'Redaktionsplan Vorlage', opis: 'Content-Kalender für 3 Monate, Themenspeicher und Auswertung in der Search Console' },
    ],
    plikNazwa: 'SEO Checkliste: 50 Punkte (PDF)',
  },
};

export default SZABLON_DE;
