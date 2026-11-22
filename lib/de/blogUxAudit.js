// Daten des deutschen Ratgebers /de/blog/ux-audit (Schluessel PL: /blog/audyt-ux-strony).
// Hauptphrase: "ux audit". B2B-Nutzbarkeit, Formulare, Tap-Targets 44-48px, WCAG 2.2 AA / BFSG, INP/CLS und GA4-Trichter.

export const BLOG_UX_AUDIT_DE = {
  fallbackPfad: '/blog/ux-audit',
  okruszek: 'UX Audit',
  kategoria: 'UX, Barrierefreiheit & Conversion',
  h1: 'UX Audit für B2B-Websites: Nutzbarkeit, Formulare und Conversion prüfen',
  opublikowano: '2026-11-22',
  aktualisiert: '2026-11-22',
  kurzantwort: 'Ein UX Audit prüft systematisch, warum Besucher auf einer B2B-Website abspringen, statt eine Anfrage zu senden. Es kombiniert eine saubere GA4-Trichteranalyse mit konkreten Checks zu First-Screen-Klarheit, Navigation, reibungsarmen Formularen, mobilen Tippflächen ab 44 bis 48 Pixeln, Barrierefreiheit nach WCAG 2.2 AA sowie schnellen Reaktionszeiten (INP bis 200 ms, CLS bis 0,1) und mündet in einer ICE-priorisierten Maßnahmenliste.',
  lead: 'Selbst Top-3-Rankings in Google bringen keinen Umsatz, wenn Interessenten auf dem Smartphone an unklaren Leistungsversprechen, trägen Menüs oder überladenen Kontaktformularen scheitern. Ein professionelles UX Audit ist keine subjektive Geschmacksrunde über Farben, sondern eine daten- und testgestützte Diagnose Ihrer wichtigsten Anfragepfade mit messbaren Abnahmekriterien.',
  sekcje: [
    {
      id: 'was-ein-b2b-ux-audit-umfasst',
      h2: '1. Was ein fundiertes UX Audit auf einer B2B-Website prüft',
      html: [
        '<p>Ein <strong>UX Audit</strong> (Usability- und Conversion-Prüfung) verbindet quantitative Verhaltensdaten mit qualitativer Experten- und Nutzerbeobachtung. Ziel ist kein loses Foliendeck voller Einzelmeinungen, sondern ein geordnetes Backlog, in dem jeder Befund einen Beleg (Messwert, Screenshot oder Sitzungsprotokoll), eine konkrete Korrekturempfehlung, eine Aufwandsschätzung und eine klare Erfolgskennzahl trägt.</p>',
        '<p>Gerade im B2B-Mittelstand entscheidet sich der Erfolg einer Website selten im Warenkorb, sondern auf dem Weg vom ersten Einstieg über eine Leistungs- oder Vergleichsseite bis zum Absenden des Anfrageformulars oder der Terminbuchung. Ein schneller heuristischer Check einer einzelnen Zielseite dauert in der Praxis <strong>2 bis 5 Arbeitstage</strong>; ein vollständiges Website-Audit über mehrere Anfragepfade, Sprachversionen und Nutzertests benötigt <strong>1 bis 4 Wochen</strong>.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-ux-audit-prueffelder',
        caption: 'Die 6 zentralen Prüffelder eines praxisnahen B2B-UX-Audits mit konkreten Richtwerten',
        columns: [
          { key: 'feld', label: 'Prüffeld' },
          { key: 'worauf', label: 'Konkreter Prüfstandard' },
          { key: 'fehler', label: 'Typische Conversion-Bremse' },
        ],
        rows: [
          { feld: '1. First-Screen-Klarheit', worauf: 'In 5 Sekunden erkennbar: Leistung, Zielgruppe, Beleg/Zahlen und ein eindeutiger primärer CTA ohne Scrollen', fehler: 'Austauschbare Image-Floskeln („Innovative Lösungen“) und drei gleichrangige Buttons' },
          { feld: '2. Navigation & Struktur', worauf: 'Sprechende Menüpunkte (Leistungen, Preise, Referenzen, Kontakt); Kernthemen in maximal 3 Klicks erreichbar', fehler: 'Versteckte Preismodelle, interne Fachbegriffe im Menü oder Sackgassen am Artikelende' },
          { feld: '3. Anfrageformulare', worauf: 'Minimale Pflichtfelder (3 bis 5), dauerhaft sichtbare Labels, hilfreiche Inline-Validierung und klare Antwortzeit-Zusage', fehler: '12 Pflichtfelder inkl. Postadresse, Fehlermeldung erst nach Seiten-Reload, Button „Absenden“' },
          { feld: '4. Mobile Bedienung', worauf: 'Tippflächen (Tap-Targets) >= 44 bis 48 px mit ausreichend Abstand; passende Tastaturtypen (email, tel); null Horizontal-Scroll', fehler: 'Winzige Links im Header/Footer auf 390 px Breite oder klebrige Leisten über dem Formular' },
          { feld: '5. Barrierefreiheit (WCAG 2.2 AA)', worauf: 'Textkontrast >= 4,5:1, durchgängige Tastaturbedienung, sichtbarer Fokusring, programmatisch verknüpfte Formular-Labels', fehler: 'Hellgraue Schrift auf hellem Grund, nicht per Tab erreichbare Ausklappmenüs oder Cookie-Dialoge' },
          { feld: '6. Reaktionszeit & Stabilität', worauf: 'INP <= 200 ms, CLS <= 0,1 und LCP <= 2,5 s im 75. Perzentil echter Mobil- und Desktop-Nutzer (CrUX)', fehler: 'Springende Formularfelder durch nachladende Banner oder 600 ms Verzögerung beim Menü-Tipp' },
        ],
        przypis: 'Richtwerte nach W3C WCAG 2.2, Apple/Google Mobile-Touch-Richtlinien (44 pt / 48 dp) und Google Core Web Vitals.',
      },
    },
    {
      id: 'first-screen-navigation-formulare',
      h2: '2. First-Screen-Klarheit, Navigation und Formulare ohne unnötige Reibung',
      html: [
        '<p>Besucher aus der Google-Suche oder aus KI-Empfehlungen landen selten auf Ihrer Startseite, sondern direkt auf einem Fachartikel, einem Rechner oder einer spezifischen Leistungsseite. Prüfen Sie auf jeder wichtigen Einstiegsseite zuerst den <strong>sichtbaren Startbereich (First Screen)</strong> auf Laptop und Smartphone: Beantwortet die Überschrift unmissverständlich, welches Problem Sie für welche Unternehmensgröße lösen, und steht darunter ein konkreter Vertrauensbeleg (etwa echte Projektdaten, Kundenstimmen oder nachvollziehbare Preise)?</p>',
        '<p>Die größten Sofortgewinne im UX Audit liegen fast immer in den <strong>Kontakt- und Anfrageformularen</strong> sowie in der Beschriftung Ihrer Call-to-Action-Buttons:</p>',
        '<ul>',
        '<li><strong>Pflichtfelder radikal kürzen:</strong> Fragen Sie beim Erstkontakt nur ab, was für eine qualifizierte Rückmeldung wirklich nötig ist (Name, geschäftliche E-Mail, Website/Anliegen). Telefonnummer, Budgetspanne oder Projektzeitraum funktionieren als optionale Auswahlfelder deutlich reibungsärmer.</li>',
        '<li><strong>Sichtbare Labels statt reiner Platzhalter:</strong> Verschwindet der Hinweistext beim Eintippen im Feld, verlieren Nutzer auf dem Smartphone sofort die Orientierung. Verknüpfen Sie jedes Eingabefeld sauber per <code>&lt;label for="..."&gt;</code> und zeigen Sie verständliche Korrekturhinweise direkt am betroffenen Feld (Inline-Validierung).</li>',
        '<li><strong>Ergebnisorientierte CTA-Texte wählen:</strong> Ein Button sollte benennen, was nach dem Klick passiert, statt eine Forderung aufzustellen - beispielsweise <em>„Unverbindliches Angebot anfordern - Antwort werktags in 24 Std.“</em> oder <em>„PDF-Vorlage ohne Kundenkonto laden“</em> statt eines bloßen <em>„Senden“</em>.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'mobile-tap-targets-wcag-bfsg',
      h2: '3. Mobile Tap-Targets, WCAG 2.2 AA und das Barrierefreiheitsstärkungsgesetz (BFSG)',
      html: [
        '<p>Auch im B2B recherchieren Entscheider erste Anbieter häufig unterwegs auf dem Smartphone, bevor sie die Seite später am Schreibtisch erneut öffnen. Testen Sie kritische Seiten niemals nur im verkleinerten Desktop-Browser, sondern auf echten 360- bis 390-Pixel-Geräten: Interaktive Schaltflächen, Sprachumschalter, Akkordeons und Formularfelder sollten eine Tippfläche von <strong>mindestens 44 mal 44 bis 48 mal 48 CSS-Pixeln</strong> (Empfehlung der Apple Human Interface Guidelines bzw. Google Material Design; WCAG 2.2 AA verlangt unter Kriterium 2.5.8 mindestens 24 mal 24 Pixel als absolute Untergrenze) besitzen, damit Fehltipps ausgeschlossen bleiben.</p>',
        '<p>Seit dem <strong>28. Juni 2025</strong> gilt in Deutschland zudem das <strong>Barrierefreiheitsstärkungsgesetz (BFSG)</strong> in Umsetzung des European Accessibility Act. Zwar richtet sich die unmittelbare gesetzliche Pflicht vorrangig an Dienstleistungen und Online-Shops im elektronischen Geschäftsverkehr mit Verbrauchern (B2C, mit Ausnahmen für Kleinstunternehmen unter 10 Beschäftigten und bis 2 Mio. Euro Jahresumsatz), doch <strong>WCAG 2.2 Konformitätsstufe AA</strong> (gemäß EN 301 549) ist längst auch für B2B-Websites geschäftsrelevant:</p>',
        '<ul>',
        '<li>Mischmodelle (Händler- und Privatkundenshop auf derselben Plattform) sowie öffentliche Auftraggeber und Konzern-Einkaufsrichtlinien setzen barrierefreie Bedienbarkeit zunehmend voraus.</li>',
        '<li>Ausreichende Farbkontraste (mindestens <code>4,5:1</code> für normalen Text), saubere Überschriftenhierarchien (<code>H1 -&gt; H2 -&gt; H3</code>), klare Fokus-Rahmen für Tastaturnutzer und verständliche Fehlermeldungen senken nachweislich die Abbruchquote für <em>alle</em> Besucher.</li>',
        '<li>Gleichzeitig bremsen träge JavaScript-Skripte sowohl assistive Technologien als auch die Google-Kennzahl <strong>INP (&lt;= 200 ms)</strong> und verursachen Layoutsprünge (<strong>CLS &lt;= 0,1</strong>; Details im Ratgeber <a href="/de/blog/core-web-vitals">Core Web Vitals</a>).</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'ga4-trichter-und-messung',
      h2: '4. GA4 Funnel-Analyse: Erst die Messung prüfen, dann die Oberfläche umbauen',
      html: [
        '<p>Bevor Sie im UX Audit auch nur ein einziges Layoutelement verändern, gehört die Datengrundlage auf den Prüfstand. In vielen Konten feuert das Ereignis <code>generate_lead</code> doppelt oder bereits beim Klick auf einen leeren Button statt erst nach erfolgreichem Versand. Prüfen Sie Ihre Schlüsselereignisse daher vorab im DebugView (Schritt-für-Schritt-Anleitung unter <a href="/de/blog/ga4-events-gtm">GA4 Events über den Google Tag Manager einrichten</a>).</p>',
        '<p>Steht das Tracking sauber, zeigt die <strong>Trichter-Exploration (Funnel Exploration) in Google Analytics 4</strong> präzise, an welchem Schritt Interessenten aussteigen:</p>',
        '<ol>',
        '<li>Legen Sie unter <em>Explorative Datenanalyse -&gt; Trichter-Exploration</em> einen <strong>geschlossenen Trichter</strong> mit bis zu 10 konkreten Schritten an (z. B. Einstieg Leistungsseite -&gt; Klick auf Preisübersicht -&gt; Scroll zum Formular -&gt; Formularstart -&gt; erfolgreicher Lead).</li>',
        '<li>Segmentieren Sie den Trichter zwingend nach <strong>Gerätekategorie (Mobilgerät vs. Desktop)</strong>: Häufig liegt die Abschlussquote am Desktop im grünen Bereich, während sie auf Smartphones wegen eines verdeckten Sende-Buttons einbricht.</li>',
        '<li>Beachten Sie zwei bekannte GA4-Eigenheiten: Der Bericht zählt eindeutige <em>Nutzer</em> statt einzelner Abschlüsse, und er ordnet einen Besucher über den gesamten Pfad jenem Gerät zu, mit dem er den Trichter erstmals betreten hat.</li>',
        '<li>Ergänzen Sie Zahlen bei Bedarf durch Sitzungsaufzeichnungen (z. B. Microsoft Clarity oder Hotjar) - aber ausschließlich <strong>DSGVO-konform</strong> nach aktiver Einwilligung im Consent-Banner (Consent Mode v2), mit aktivierter Feldmaskierung und Auftragsverarbeitungsvertrag (AVV).</li>',
        '</ol>',
      ].join(''),
    },
    {
      id: 'heuristik-nutzertests-und-ice',
      h2: '5. Vom Befund zur Umsetzung: 5-Nutzer-Tests, ICE-Priorisierung und Erfolgskontrolle',
      html: [
        '<p>Während GA4-Daten zeigen, <em>wo</em> Besucher abbrechen, erklären ein strukturierter Experten-Durchgang (nach Jakob Nielsens zehn Usability-Heuristiken) und kurze moderierte Aufgaben mit <strong>fünf echten Personen aus Ihrer Zielgruppe</strong> zuverlässig das <em>Warum</em>. Selbst bei B2B-Websites mit überschaubarem monatlichem Traffic decken fünf beobachtete Testpersonen laut Nielsen Norman Group rund 85 Prozent der praktischen Bedienhürden auf.</p>',
        '<p>Ordnen Sie anschließend alle gefundenen Maßnahmen im <strong>ICE-Modell</strong> (<code>Impact x Confidence x Ease</code> auf einer Skala von 1 bis 10): Ein präziserer Formular-Hinweis mit Beleg aus Sitzungsanalyse und Nutzertest erhält einen hohen Wert und wandert direkt in den nächsten Sprint, während ein aufwendiger Umbau ohne klaren Datenbeleg zurückgestellt wird. Messen Sie größere Änderungen über vier bis sechs Wochen gegen einen Vergleichszeitraum oder unveränderte Kontrollseiten.</p>',
        '<p>Wenn Sie vorab sehen möchten, wie ein aufgeräumter, schneller Startseiten-Aufbau für Ihr Unternehmen wirken kann, erstellt unser kostenloses <a href="/de/tools/website-relaunch-mockup">Website Relaunch Mockup mit KI</a> in 1 bis 3 Minuten einen konkreten Entwurf für Desktop und Mobilgerät. Ein isoliertes UX-Papiergutachten ohne Umsetzung verkaufen wir bewusst nicht: Bei uns fließen UX- und Conversion-Optimierung direkt in die laufende Zusammenarbeit im Paket <strong>SEO Premium</strong> (590 € netto/Monat) oder beim kompletten Neubau auf Next.js im <strong>Booster Pack</strong> ein (alle Details unter <a href="/de/seo-kosten">SEO Kosten</a>; strukturierte Vorbereitung mit unserer <a href="/de/tools/website-briefing-vorlage">Website Briefing Vorlage</a>).</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zum UX Audit für B2B-Websites',
  faq: [
    {
      id: 'wann-lohnt-sich-ein-ux-audit',
      question: 'Wann ist ein UX Audit für ein B2B-Unternehmen besonders sinnvoll?',
      answer: 'Vor allem in drei Situationen: erstens wenn Ihre Website über Google oder Anzeigen bereits qualifizierte Besucher anzieht, daraus aber zu wenige Kontaktanfragen entstehen; zweitens vor einem geplanten Website-Relaunch, damit bestehende Bedienhürden nicht ins neue Design übernommen werden; und drittens bei auffällig hohen mobilen Absprungraten auf wichtigen Leistungsseiten.',
    },
    {
      id: 'gilt-das-bfsg-auch-fuer-b2b-websites',
      question: 'Muss auch eine reine B2B-Website das Barrierefreiheitsstärkungsgesetz (BFSG) erfüllen?',
      answer: 'Das seit dem 28. Juni 2025 geltende BFSG verpflichtet unmittelbar vor allem Anbieter elektronischer Dienstleistungen und Shops gegenüber Verbrauchern (B2C), mit Ausnahmen für Kleinstunternehmen. Sobald jedoch auch Verbraucher bestellen können, öffentliche Ausschreibungen bedient werden oder Konzernkunden Barrierefreiheit nach EN 301 549 und WCAG 2.2 AA verlangen, wird eine barrierearme Umsetzung auch im B2B zum klaren Pflicht- und Wettbewerbsfaktor.',
    },
    {
      id: 'reicht-wenig-traffic-fuer-ein-ux-audit',
      question: 'Funktioniert ein UX Audit auch bei einer spezialisierten B2B-Website mit wenig Traffic?',
      answer: 'Ja. Wenn monatlich zu wenige Sitzungen für statistisch belastbare A/B-Tests vorliegen, verlagert sich der Schwerpunkt auf eine saubere Tracking-Kontrolle, eine kriteriengeleitete heuristische Prüfung sowie fünf moderierte Praxistests mit Personen aus Ihrer Zielgruppe. Damit lassen sich die wichtigsten Verständlichkeits- und Formularhürden zuverlässig aufdecken.',
    },
    {
      id: 'sind-heatmaps-und-session-recordings-dsgvo-konform',
      question: 'Dürfen Tools wie Microsoft Clarity oder Hotjar auf deutschen Websites eingesetzt werden?',
      answer: 'Nur mit sauberer datenschutzrechtlicher Umsetzung nach DSGVO und TDDDG: Sitzungsaufzeichnungen und Heatmaps dürfen erst nach aktiver Einwilligung der Besucher im Consent-Banner starten, sämtliche Eingabefelder müssen konsequent maskiert sein, es braucht einen Auftragsverarbeitungsvertrag (AVV) mit dem Anbieter sowie einen transparenten Hinweis in Ihrer Datenschutzerklärung.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/makieta-redesignu', tekst: 'Website Relaunch Mockup mit KI', opis: 'erstellt kostenlos in 1 bis 3 Minuten einen klaren neuen Startseiten-Entwurf für Desktop und Smartphone' },
    { href: '/narzedzia/brief-strony-internetowej', tekst: 'Website Briefing Vorlage (PDF)', opis: 'Lastenheft für Relaunch und Neubau inklusive UX-, Ladezeit-, SEO- und DSGVO-Anforderungen' },
    { href: '/narzedzia/test-core-web-vitals-porownanie', tekst: 'Core Web Vitals Test (CrUX)', opis: 'prüft mobile Reaktionszeit (INP), Layoutstabilität (CLS) und Ladezeit Ihrer Website gegen Wettbewerber' },
    { href: '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', tekst: 'GA4 Events im Google Tag Manager', opis: 'so richten Sie Formular-Leads und Klick-Events fehlerfrei für Ihre Trichteranalyse ein' },
    { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Booster Pack', opis: 'laufende Conversion-Optimierung in SEO Premium sowie Neubau auf Next.js im Überblick' },
  ],
  zrodla: [
    { url: 'https://www.w3.org/TR/WCAG22/', nazwa: 'W3C: Web Content Accessibility Guidelines (WCAG) 2.2 - Kontraste, Fokus und Zielgrößen (Englisch)', data: '2026-11-22' },
    { url: 'https://www.bundesfachstelle-barrierefreiheit.de/DE/Fachwissen/Produkte-und-Dienstleistungen/Barrierefreiheitsstaerkungsgesetz/barrierefreiheitsstaerkungsgesetz_node.html', nazwa: 'Bundesfachstelle Barrierefreiheit: Informationen zum Barrierefreiheitsstärkungsgesetz (BFSG, in Kraft seit 28.06.2025)', data: '2026-11-22' },
    { url: 'https://support.google.com/analytics/answer/9327974?hl=de', nazwa: 'Google Analytics Hilfe: Trichter-Exploration (Funnel Exploration) in GA4 einrichten und auswerten', data: '2026-11-22' },
    { url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', nazwa: 'Nielsen Norman Group: 10 Usability Heuristics for User Interface Design (Englisch)', data: '2026-11-22' },
    { url: 'https://web.dev/articles/inp', nazwa: 'web.dev: Interaction to Next Paint (INP) - Schwellenwert 200 ms für reaktionsschnelle Interfaces', data: '2026-11-22' },
  ],
};
