// Szablon „Interne Verlinkung Vorlage” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/linkowanie-wewnetrzne.js (/de/tools/interne-verlinkung-vorlage).
// PDF: public/pliki/de/interne-verlinkung-vorlage.pdf.
// Enthält Zielbegriffe „interne verlinkung“, „interne verlinkung seo“ und „ankertext“.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable', nazwa: 'Google Search Central: Best Practices für Links (crawlbares <a href>, sprechende Ankertexte und Kontext)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: Startleitfaden zur Suchmaschinenoptimierung (interne Verlinkung und verwaiste Seiten vermeiden)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Auf kanonische Ziel-URLs statt auf Duplikate verlinken', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/breadcrumb', nazwa: 'Google Search Central: Strukturierte Daten für BreadcrumbList', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/9049606', nazwa: 'Search-Console-Hilfe: Bericht „Links“ (meistverlinkte interne Zielseiten auswerten)', data: '2026-11-11' },
  { url: 'https://vercel.com/blog/the-rise-of-the-ai-crawler', nazwa: 'Vercel Engineering: The Rise of the AI Crawler (warum KI-Bots Links im Server-HTML ohne JavaScript-Ausführung brauchen)', data: '2026-11-11' },
];

export const TEILE_VERLINKUNG_DE = [
  ['1. Ausgangslage (Baseline)', 'Wie viele URLs stehen in der Sitemap, wie viele sind verwaist und wie viele Links zeigen auf 301/404?', 'Crawler, XML-Sitemap, Search Console & kostenloser SEO Audit'],
  ['2. Seitenprioritäten (Prio 1-3)', 'Welche Leistungs- und Kategorieseiten verdienen die meiste interne Linkkraft?', 'Geschäftsziele, GA4-Schlüsselereignisse & Margen-Angebot'],
  ['3. Ankertext-Register', 'Welcher Ankertext gehört eindeutig zu welcher Ziel-URL (ohne Kannibalisierung)?', 'Keyword-Map & Haupt-Keywords der Prio-1-Seiten'],
  ['4. Hub-and-Spoke-Cluster', 'Wie verbinden sich Leistungs-Hub und unterstützende Ratgeber/Vergleiche gegenseitig?', 'Themencluster aus SEO-Strategie & Redaktionsplan'],
  ['5. Umsetzungsplan neuer Links', 'Von welcher Quellseite wird mit welchem Ankertext wohin im Fließtext verlinkt?', 'Auswertung aus Teil 2, 3 und 4'],
  ['6. Quartals-Audit (10 Kriterien)', 'Sind Klicktiefe <= 3, Statuscode 200, Canonical-Ziele und <a href>-Tags eingehalten?', 'Crawler & Weiterleitungs-Prüfer'],
  ['7. Verwaiste Seiten (Orphan Pages)', 'Wird eine unverlinkte URL eingebunden, per 301 zusammengelegt, deindexiert oder gelöscht?', 'Abgleich Sitemap vs. Crawl + GSC-Impressionen'],
  ['8. Erfolgsmessung nach 28 Tagen', 'Wie haben sich interne Links, Klicks und Durchschnittsposition der Zielseite verändert?', 'Search Console (Links & Leistungsbericht)'],
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_LINKOWANIE_DE = {
  slug: 'linkowanie-wewnetrzne',
  plik: 'linkowanie-wewnetrzne',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/interne-verlinkung-vorlage.pdf',
  seo: {
    tytul: 'Interne Verlinkung: Vorlage & SEO-Strategie als PDF',
    opis: 'Kostenlose Vorlage für interne Verlinkung als PDF: Zielseiten priorisieren, Ankertexte ohne Kannibalisierung steuern und verwaiste Seiten finden.',
  },
  de: {
    okruszek: 'Interne Verlinkung Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Interne Verlinkung planen: Kostenlose Vorlage für Hub-and-Spoke & Ankertexte',
    lead: 'Interne Verlinkung gehört zu den schnellsten und günstigsten Hebeln im SEO, weil Sie weder auf externe Redaktionen warten noch zusätzliches Medienbudget ausgeben müssen. Dennoch überlassen viele Unternehmen ihre internen Links dem Zufall: Alte Blogbeiträge sammeln Dutzende Verweise, während die umsatzstärkste Leistungsseite kaum aus dem Fließtext verlinkt wird. Unsere kostenlose Vorlage ordnet Seitenprioritäten, Ankertexte, Themencluster und die Quartalsprüfung verwaister Seiten auf einem klaren A4-PDF.',
    karta: {
      nazwa: 'Vorlage Interne Verlinkung (PDF)',
      opis: '8 Arbeitsblätter auf A4: Ist-Kennzahlen, Prio-1-Zielseiten, Ankertext-Register, Hub-and-Spoke-Matrix, Linkplan und Orphan-Page-Audit.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'warum-interne-verlinkung-seo-hebel-ist',
        h2: 'Interne Verlinkung SEO: Drei Aufgaben für Google, KI-Crawler und Nutzer',
        html: [
          '<p>Unter <strong>interner Verlinkung</strong> versteht man sämtliche Verweise innerhalb derselben Domain: Hauptnavigation, Breadcrumbs, Links mitten im Fließtext, thematische Weiterlese-Boxen und den Footer. Im Gegensatz zum externen <a href="/de/blog/linkaufbau-b2b">Linkaufbau im B2B</a> kontrollieren Sie bei der Disziplin <strong>Interne Verlinkung SEO</strong> sowohl Zieladresse als auch Platzierung und <strong>Ankertext</strong> zu 100 Prozent selbst.</p>',
          '<p>Laut Googles offizieller Dokumentation erfüllt eine geplante interne Linkstruktur drei konkrete Funktionen: Erstens entdecken Crawler neue oder aktualisierte Unterseiten primär über bestehende Links. Zweitens liefern der klickbare Ankertext und der umgebende Satz Kontext darüber, für welches Thema die Zielseite relevant ist. Drittens zeigt die interne Linkverteilung, welche Seiten Ihres Auftritts geschäftlich am wichtigsten sind.</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-arten-interner-links',
          caption: 'Die 5 Arten interner Links und ihr tatsächlicher SEO-Beitrag',
          columns: [
            { key: 'art', label: 'Link-Typ' },
            { key: 'ort', label: 'Platzierung' },
            { key: 'wirkung', label: 'Stärke für Nutzer & Suchmaschinen' },
            { key: 'vorsicht', label: 'Typischer Fehler in der Praxis' },
          ],
          rows: [
            { art: 'Hauptnavigation (Header)', ort: 'Seitenweit oben', wirkung: 'Hält die Klicktiefe zu den wichtigsten Leistungsbereichen flach (1 Klick ab Startseite)', vorsicht: 'Überladene Mega-Menüs mit 60 Links verwässern die Priorisierung' },
            { art: 'Breadcrumbs (Brotkrumen)', ort: 'Über der H1', wirkung: 'Zeigt die Hierarchieebene und stärkt übergeordnete Kategorie- bzw. Hub-Seiten', vorsicht: 'Fehlende BreadcrumbList-Auszeichnung oder gebrochene Zwischenstufen' },
            { art: 'Kontextlinks im Fließtext', ort: 'In Absätzen & Tabellen', wirkung: 'Stärkster thematischer Kontext durch Ankertext plus umgebenden Satz', vorsicht: 'Nichtssagende Anker wie „hier klicken“ oder mehrere Links direkt hintereinander' },
            { art: 'Verwandte Inhalte / Tools', ort: 'Unter dem Haupttext', wirkung: 'Verbindet Seiten desselben Themenclusters und senkt die Absprungrate', vorsicht: 'Automatische „Neueste Blogartikel“-Widgets verlinken themenfremde Beiträge' },
            { art: 'Footer-Navigation', ort: 'Seitenweit unten', wirkung: 'Sichert den schnellen Zugriff auf Kontakt, Impressum, Kosten und Kernleistungen', vorsicht: 'Ersetzt niemals kontextstarke Verweise aus relevanten Fachartikeln' },
          ],
        },
      },
      {
        id: 'acht-teile-der-vorlage',
        h2: 'Aufbau der Vorlage für interne Verlinkung: 8 aufeinander aufbauende Teile',
        html: '<p>Damit kein isoliertes Tabellendokument entsteht, verbindet unsere PDF-Vorlage den einmaligen Architektur-Aufbau (Teil 1 bis 5) mit einer festen vierteljährlichen Qualitätskontrolle (Teil 6 bis 8).</p>',
        tabela: {
          id: 'tabelle-8-teile-verlinkung',
          caption: 'Die 8 Arbeitsblätter der Vorlage und ihre Datenquellen',
          columns: [
            { key: 'teil', label: 'Arbeitsblatt' },
            { key: 'leitfrage', label: 'Welche Frage wird geklärt?' },
            { key: 'quelle', label: 'Datenquelle' },
          ],
          rows: TEILE_VERLINKUNG_DE.map(([teil, leitfrage, quelle]) => ({
            teil,
            leitfrage,
            quelle,
          })),
        },
      },
      {
        id: 'hub-and-spoke-architektur',
        h2: 'Das Hub-and-Spoke-Modell: So fließt Linkkraft zu Ihren Leistungsseiten',
        html: [
          '<p>Auf B2B-Websites bewährt sich das <strong>Hub-and-Spoke-Prinzip</strong> (Themenzentrum plus Speichenseiten): Der <strong>Hub</strong> ist Ihre kommerzielle Leistungs- oder Kategorieseite, die Anfragen generiert. Die <strong>Spokes</strong> sind vertiefende Ratgeber, Kostenübersichten, Systemvergleiche, kostenlose Tools und Fallstudien rund um genau dieses Angebot.</p>',
          '<ul>',
          '<li><strong>Gegenseitige Pflichtverbindung:</strong> Jede Spoke-Seite verlinkt im oberen oder mittleren Drittel auf ihren Hub, und der Hub verlinkt geordnet auf seine wichtigsten Spokes zurück.</li>',
          '<li><strong>Quervernetzung im Cluster:</strong> Jeder neue Fachbeitrag aus dem <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan</a> erhält am Tag der Veröffentlichung 1 Link zum Hub sowie 2 bis 4 Links zu verwandten Cluster-Seiten - plus mindestens 2 eingehende Links aus bestehenden starken Artikeln.</li>',
          '<li><strong>Maximale Klicktiefe von 3 Klicks:</strong> Jede geschäftskritische Unterseite sollte von der Startseite aus in höchstens drei Klicks erreichbar sein (identischer Prüfpunkt wie in unserer <a href="/de/tools/seo-checkliste">SEO Checkliste</a>).</li>',
          '</ul>',
        ].join(''),
        tabela: {
          id: 'tabelle-cluster-beispiel-b2b',
          caption: 'Praxisbeispiel einer Hub-and-Spoke-Map (fiktiver B2B-Anbieter für Industriekühlung)',
          columns: [
            { key: 'url', label: 'URL im Cluster' },
            { key: 'rolle', label: 'Rolle' },
            { key: 'verlinktAuf', label: 'Verlinkt im Text auf' },
            { key: 'erhaeltVon', label: 'Erhält interne Links von' },
            { key: 'anker', label: 'Reservierter Haupt-Ankertext' },
          ],
          rows: [
            { url: '/prozesskuehlung-industrie', rolle: 'Hub (Leistungsseite)', verlinktAuf: 'Alle 4 Spokes + /kontakt', erhaeltVon: 'Header, Startseite, alle 4 Spokes', anker: '„Prozesskühlung für die Industrie“' },
            { url: '/ratgeber/kaltwassersatz-kosten', rolle: 'Spoke: Kosten & TCO', verlinktAuf: 'Hub, Vergleichsseite, Referenz', erhaeltVon: 'Hub, Effizienz-Ratgeber', anker: '„Kosten eines Kaltwassersatzes“' },
            { url: '/vergleiche/freikuehlung-vs-kaltwassersatz', rolle: 'Spoke: Systemvergleich', verlinktAuf: 'Hub, Kostenartikel', erhaeltVon: 'Hub, Kostenartikel', anker: '„Freikühlung oder Kaltwassersatz im Vergleich“' },
            { url: '/ratgeber/kuehlleistung-berechnen', rolle: 'Spoke: Berechnung', verlinktAuf: 'Hub, Vergleichsseite', erhaeltVon: 'Hub, Referenzprojekt', anker: '„Kühlleistung richtig berechnen“' },
            { url: '/referenzen/spritzgusswerk-ulm', rolle: 'Spoke: Fallstudie', verlinktAuf: 'Hub, Kostenartikel', erhaeltVon: 'Hub, Berechnungs-Ratgeber', anker: '„Praxisbeispiel Prozesskühlung im Spritzgusswerk“' },
          ],
        },
      },
      {
        id: 'ankertext-regeln-und-technik',
        h2: 'Ankertext richtig wählen und technische Link-Fallen vermeiden',
        html: '<p>Der <strong>Ankertext</strong> ist die sichtbare, klickbare Wortgruppe eines Links. Google rät ausdrücklich zu prägnanten, beschreibenden Formulierungen und warnt sowohl vor generischen Floskeln („mehr erfahren“, „hier“) als auch vor unnatürlich vollgestopften Keyword-Ketten. In Teil 3 unserer Vorlage führen Sie deshalb ein verbindliches <strong>Ankertext-Register</strong>: Derselbe Ankertext darf niemals mal auf einen Blogartikel und mal auf die Leistungsseite zeigen.</p>',
        tabela: {
          id: 'tabelle-ankertext-bewertung',
          caption: 'Gute vs. schädliche Ankertexte am Beispiel der Zielseite /prozesskuehlung-industrie',
          columns: [
            { key: 'beispiel', label: 'Gewählter Ankertext' },
            { key: 'urteil', label: 'Bewertung' },
            { key: 'begruendung', label: 'Begründung nach Google-Dokumentation' },
          ],
          rows: [
            { beispiel: '„hier klicken“, „zum Artikel“, „mehr dazu“', urteil: 'Schlecht', begruendung: 'Liefert weder Lesern noch Suchmaschinen einen Hinweis auf das Thema der Zielseite' },
            { beispiel: '„Prozesskühlung für Industriebetriebe“', urteil: 'Sehr gut (Hauptanker)', begruendung: 'Präzise, natürlich lesbar und eindeutig der Leistungsseite zugeordnet' },
            { beispiel: '„wie wir industrielle Prozesskühlung auslegen“', urteil: 'Gut (Satzvariante)', begruendung: 'Fügt sich flüssig in den Satz ein und vermeidet monotone Wiederholungen' },
            { beispiel: '„Prozesskühlung Industrie günstig kaufen Kaltwassersatz Hersteller Preis“', urteil: 'Schlecht (Spam)', begruendung: 'Unnatürliches Keyword-Stuffing verstößt gegen Googles Spam-Richtlinien' },
            { beispiel: '„Prozesskühlung“ abwechselnd auf Leistungsseite und Glossar verlinkt', urteil: 'Schlecht (Konflikt)', begruendung: 'Sendet widersprüchliche Relevanzsignale und fördert interne Kannibalisierung' },
          ],
        },
        htmlPo: [
          '<p>Vier technische Pflichtregeln, die Sie vierteljährlich prüfen sollten:</p>',
          '<ul>',
          '<li><strong>Echte <code>&lt;a href=&quot;/ziel&quot;&gt;</code>-Elemente im Server-HTML:</strong> JavaScript-Buttons mit <code>onClick</code> ohne <code>href</code> werden von Google laut Dokumentation nicht zuverlässig gecrawlt - und viele KI-Suchbots führen überhaupt kein Client-JavaScript aus.</li>',
          '<li><strong>Direkt auf Status 200 und die kanonische URL verlinken:</strong> Interne Links sollten weder über 301-Weiterleitungen laufen noch auf Parameter-Duplikate zeigen (prüfbar mit unserem <a href="/de/tools/weiterleitungen-hreflang-pruefen">301-Weiterleitungen &amp; Canonical Prüfer</a> sowie dem Ratgeber zum <a href="/de/blog/canonical-tag">Canonical Tag</a>).</li>',
          '<li><strong>Kein internes <code>rel="nofollow"</code> auf wichtige Seiten:</strong> Entwerten Sie Ihre eigenen Leistungs- und Ratgeberseiten nicht durch interne Nofollow-Attribute.</li>',
          '<li><strong>Verwaiste Seiten (Orphan Pages) aufspüren:</strong> Jede URL, die zwar in Ihrer <code>sitemap.xml</code> steht, aber null eingehende interne Links besitzt, muss entweder sauber in ihr Themencluster eingebunden oder bereinigt werden. Einen schnellen 25-Seiten-Check liefert unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a>.</li>',
          '</ul>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Ankertext-Register, Linkplan & Quartals-Audit',
      opis: 'Auszug der Tabellen aus dem A4-PDF. Die 10 Prüfpunkte des Quartals-Audits in Teil 6 können Sie direkt hier im Browser abhaken.',
      html: [
        '<h3>Teil 1 & 2. Ausgangslage & Seitenprioritäten (Prio 1 = Umsatz-/Anfrage-Seiten)</h3>',
        tabelaHtml(
          ['Ziel-URL', 'Seitentyp', 'Cluster', 'Priorität (1-3)', 'Interne Links Ist', 'Zielwert', 'Klicktiefe'],
          [
            ['/…', 'Leistungsseite (Hub)', '…', 'Prio 1', '…', '…', '<= 2'],
            ['/…', 'Vergleich / Kosten', '…', 'Prio 2', '…', '…', '<= 3'],
          ],
        ),
        '<h3>Teil 3 & 5. Ankertext-Register & konkreter Einbauplan</h3>',
        tabelaHtml(
          ['#', 'Quellseite (von wo?)', 'Zielseite (wohin?)', 'Exakter Ankertext', 'Position (Absatz / Tabelle)', 'Erledigt'],
          [
            ['1', '/blog/…', '/leistung-a', '…', 'Absatz nach H2 #1', '☐'],
            ['2', '/leistung-a', '/blog/…', '…', 'Cluster-Abschnitt', '☐'],
          ],
        ),
        '<h3>Teil 6. Quartals-Audit der internen Verlinkung (10 Prüfpunkte)</h3>',
        '<ul>',
        '<li>☐ <strong>Keine verwaisten Pflichtseiten:</strong> Jede indexierbare Zielseite hat mindestens 2 eingehende Kontextlinks.</li>',
        '<li>☐ <strong>Flache Klicktiefe:</strong> Alle Prio-1-Leistungsseiten sind in maximal 3 Klicks ab der Startseite erreichbar.</li>',
        '<li>☐ <strong>Null defekte interne Links:</strong> Keine internen Verweise auf 404- oder 5xx-Fehlerseiten.</li>',
        '<li>☐ <strong>Keine internen 301-Umwege:</strong> Nach URL-Änderungen zeigen alle Quelllinks direkt auf das endgültige Ziel.</li>',
        '<li>☐ <strong>Kanonische Konsistenz:</strong> Interne Links verweisen exakt auf die im Canonical-Tag definierte Schreibweise.</li>',
        '<li>☐ <strong>Top-Seiten vorn im GSC-Linkbericht:</strong> Prio-1-Seiten führen die Liste der meistverlinkten Seiten an.</li>',
        '<li>☐ <strong>Eindeutige Ankertexte:</strong> Kein Haupt-Ankertext verweist auf zwei konkurrierende URLs.</li>',
        '<li>☐ <strong>Sauberes HTML:</strong> Alle wichtigen Links stehen als echtes &lt;a href&gt; im serverseitig ausgelieferten HTML.</li>',
        '<li>☐ <strong>Verlinkte Bilder geprüft:</strong> Jedes verlinkte Bild besitzt ein aussagekräftiges Alt-Attribut (wirkt als Ankertext).</li>',
        '<li>☐ <strong>Kein internes nofollow:</strong> Wichtige Unterseiten werden intern ohne rel="nofollow" angesteuert.</li>',
        '</ul>',
      ].join(''),
    },
    formularz: {
      h2: 'Vorlage für interne Verlinkung herunterladen (PDF)',
      opis: 'Laden Sie alle 8 Arbeitsblätter inklusive Prioritäten-Tabelle, Ankertext-Register, Hub-and-Spoke-Plan und Orphan-Page-Protokoll kostenlos als A4-PDF herunter.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Verlinkungs-Vorlage als PDF senden',
      przedmiot: 'die Vorlage für interne Verlinkung (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur Vorlage für interne Verlinkung trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Wie viele interne Links sollte ein Fachartikel oder eine Leistungsseite enthalten?',
        answer: 'Google nennt bewusst keine starre Obergrenze, empfiehlt aber Augenmaß und Nutzwert für Leserinnen und Leser. In der B2B-Praxis hat sich pro Ratgeberartikel 1 prominenter Kontextlink zur übergeordneten Leistungsseite (Hub) plus 2 bis 4 gezielte Verweise auf vertiefende Nachbarseiten desselben Clusters bewährt.',
      },
      {
        question: 'Darf ich intern immer exakt mein Haupt-Keyword als Ankertext verwenden?',
        answer: 'Bei internen Links ist ein klarer, keywordnaher Ankertext unkritischer als beim externen Linkaufbau, solange er natürlich lesbar bleibt und nicht künstlich aneinandergereiht wird. Nutzen Sie einen eindeutigen Hauptanker für Ihre Zielseite sowie zwei bis drei flüssige Satzvarianten - aber vergeben Sie denselben Anker niemals an zwei verschiedene URLs.',
      },
      {
        question: 'Was sind verwaiste Seiten (Orphan Pages) und wie spüre ich sie auf?',
        answer: 'Verwaiste Seiten sind URLs Ihrer Website, auf die kein einziger interner Link von einer anderen Unterseite zeigt. Sie finden sie, indem Sie alle Adressen Ihrer XML-Sitemap und Ihres Google-Search-Console-Berichts mit der URL-Liste eines Website-Crawls abgleichen: Was nur in der Sitemap auftaucht, ist intern abgeschnitten.',
      },
      {
        question: 'Reichen Links im Hauptmenü und im Footer nicht bereits aus?',
        answer: 'Navigation und Footer sichern zwar eine flache Klicktiefe, liefern aber kaum thematischen Satzkontext. Erst Links mitten aus relevanten Absätzen, Vergleichstabellen und Fallstudien erklären Suchmaschinen präzise, in welchem fachlichen Zusammenhang eine Zielseite steht.',
      },
      {
        question: 'Warum ist serverseitiges HTML bei internen Links wichtig für KI-Sichtbarkeit?',
        answer: 'Während Googlebot JavaScript verzögert nachrendern kann, rufen viele Crawler von KI-Antwortsystemen (wie OAI-SearchBot, ClaudeBot oder PerplexityBot) lediglich das rohe Server-HTML ab. Werden Links erst im Browser per Client-Skript zusammengebaut, bleiben Unterseiten für diese Bots unsichtbar.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'findet kaputte interne Links, 301-Ketten und dünne Seiten auf bis zu 25 URLs' },
      { href: '/narzedzia/sprawdz-przekierowania-hreflang', tekst: '301-Weiterleitungen & Canonical Prüfer', opis: 'prüft Ziel-URLs auf unnötige Weiterleitungssprünge und Canonical-Abweichungen' },
      { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', tekst: 'Canonical Tag Ratgeber', opis: 'erklärt, auf welche kanonische Adresse interne Links immer zeigen sollten' },
      { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', tekst: 'Linkaufbau im B2B', opis: 'wie Sie nach sauberer interner Architektur seriöse externe Verweise gewinnen' },
      { href: '/narzedzia/szablon-strategii-seo', tekst: 'SEO Strategie Vorlage', opis: 'definiert die übergeordneten Themencluster für Ihre Hub-and-Spoke-Map' },
    ],
    plikNazwa: 'Interne Verlinkung Vorlage: Hub-and-Spoke, Ankertexte & Audit (PDF)',
  },
};

export default SZABLON_LINKOWANIE_DE;
