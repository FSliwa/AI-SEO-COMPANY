// Szablon „Website Briefing Vorlage” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/brief-strony-internetowej.js (/de/tools/website-briefing-vorlage).
// PDF: public/pliki/de/website-briefing-vorlage.pdf.
// Enthält Zielbegriffe „website briefing vorlage“ und „lastenheft website“.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Website-Umzug mit URL-Änderungen (301-Weiterleitungen und Schutz vor Soft-404-Fehlern)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing', nazwa: 'Google Search Central: Mobile-First-Indexierung (inhaltliche Parität zwischen Smartphone und Desktop)', data: '2026-11-11' },
  { url: 'https://web.dev/articles/vitals', nazwa: 'Google web.dev: Core Web Vitals Grenzwerte (LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen in der Suche und saubere Indexierbarkeit Ihrer Website', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien (Vermeidung kopierter Branchen- oder Stadt-Brückenseiten)', data: '2026-11-11' },
  { url: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj', nazwa: 'Richtlinie (EU) 2019/882 (European Accessibility Act / Grundlage des Barrierefreiheitsstärkungsgesetzes BFSG)', data: '2026-11-11' },
];

export const SEKTIONEN_WEBSITE_BRIEF_DE = [
  ['1. Unternehmen & Angebot', 'Geschäftsmodell, wichtigste Leistungen/Produkte nach Deckungsbeitrag, Zielregionen (DE/AT/CH/international) und echte Alleinstellungsmerkmale'],
  ['2. Geschäftsziele & KPIs', 'Messbares Hauptziel nach 6 und 12 Monaten (qualifizierte Anfragen, Terminbuchungen, Bewerbungen, Direktkäufe) und Messung in GA4/CRM'],
  ['3. Zielgruppen & Buying Center', 'Wer recherchiert fachlich, wer gibt das Budget frei und welche 5 bis 10 kritischen Fragen stellen Interessenten vor der Kontaktaufnahme?'],
  ['4. Wettbewerb & Design-Referenzen', '3 relevante Marktbegleiter und 2 bis 3 Vorbild-Websites jeweils mit konkreter Begründung, was überzeugt und was vermieden werden soll'],
  ['5. Seitenbaum & Mehrsprachigkeit', 'Geplante Unterseiten inklusive Seitenziel, eigenem Haupt-Keyword je URL und benötigten Sprachversionen (z. B. DE/EN mit sauberem hreflang)'],
  ['6. Texte, Fotos & Markenmaterial', 'Klärung, wer Fachtexte, echte Projektfotos, Grafiken, Kundenstimmen und Freigaben bis zu welchem Meilenstein liefert'],
  ['7. Funktionen & Schnittstellen', 'Mehrstufige Anfrageformulare, Konfiguratoren, Terminbuchung, Bewerberportal, ERP-/CRM-Anbindung (z. B. HubSpot, Pipedrive, Salesforce)'],
  ['8. SEO, KI-Suche & 301-Migration', 'GSC-Bestandsdaten der Top-Seiten, 1:1-Weiterleitungsmatrix, SSR-HTML für KI-Bots, Core-Web-Vitals-Zielwerte und SEO-Abnahmekriterien'],
  ['9. Design, UX & Barrierefreiheit', 'Corporate-Design-Vorgaben, mobile Bedienbarkeit, Kontraste, Tastaturnavigation und Anforderungen gemäß BFSG / WCAG 2.1 AA'],
  ['10. Technik, CMS, Hosting & DSGVO', 'Systemwahl (z. B. Next.js, Webflow, WordPress), Kontoeigentum, lokales Font-Hosting, Consent Mode v2 und AV-Verträge'],
  ['11. Budgetrahmen & realistischer Zeitplan', 'Ehrlicher Investitionskorridor (Erstellung + laufender Betrieb), Wunsch-Livegang außerhalb der Hauptsaison und Abwesenheitszeiten'],
  ['12. Projektsteuerung & Entscheidungswege', 'Ein zentraler Projektleiter auf Kundenseite, Freigabeberechtigte für Design/Text/Technik und verbindliche Rückmeldefristen'],
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_BRIEF_STRONY_DE = {
  slug: 'brief-strony-internetowej',
  plik: 'brief-strony',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/website-briefing-vorlage.pdf',
  seo: {
    tytul: 'Website Briefing Vorlage kostenlos: Lastenheft als PDF',
    opis: 'Kostenlose Website Briefing Vorlage als PDF: Ziele, Seitenbaum, CMS-Auswahl, SEO-Anforderungen, Ladezeiten, DSGVO und Budget vor der Anfrage klären.',
  },
  de: {
    okruszek: 'Website Briefing Vorlage',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Website Briefing Vorlage für Relaunch und Neubau inklusive SEO-Teil',
    lead: 'Wenn drei Webagenturen für „eine neue Unternehmenswebsite“ Angebote zwischen 3.500 Euro und 28.000 Euro abgeben, liegt das selten an Willkür, sondern fast immer an fehlenden Vorgaben zu Seitenumfang, Texterstellung, Schnittstellen und SEO-Migration. Unsere kostenlose Website Briefing Vorlage (praxisnahes Lastenheft Website in 12 Teilen) schafft eine einheitliche Kalkulationsgrundlage, verhindert teure Nachträge mitten im Projekt und schützt Ihre bestehenden Google- und KI-Rankings ab Tag eins.',
    karta: {
      nazwa: 'Website Briefing Vorlage / Lastenheft (PDF)',
      opis: '12 strukturierte Projektabschnitte auf A4: Ziele, Seitenbaum-Tabelle, CMS & Technik, SEO-Abnahmekriterien, 301-Migration, DSGVO/BFSG und Budget.',
      cta: 'Website-Briefing herunterladen',
    },
    sekcje: [
      {
        id: 'warum-website-briefing-vor-angeboten',
        h2: 'Warum ein Website Briefing (Lastenheft) vor der Agenturanfrage bares Geld spart',
        html: [
          '<p>Eine <strong>Website Briefing Vorlage</strong> - im DACH-Mittelstand häufig als kaufmännisches <strong>Lastenheft Website</strong> genutzt - fasst auf wenigen Seiten zusammen, was die neue Website geschäftlich erreichen soll, welche Unterseiten und Integrationen nötig sind und wer welche Inhalte zuliefert. Darauf aufbauend erstellt die ausgewählte Agentur später das technische Pflichtenheft.</p>',
          '<p>Ohne schriftliches Briefing kalkuliert jeder Anbieter auf Basis eigener Annahmen: Agentur A rechnet mit fünf statischen Seiten und angelieferten Texten; Agentur B plant zwanzig Leistungsseiten, Fachcopywriting, mehrsprachiges <code>hreflang</code> und eine vollständige 301-Weiterleitungsmatrix ein. Mit demselben Briefing erhalten Sie dagegen Angebote, die Position für Position vergleichbar sind.</p>',
          '<p>Wichtige Abgrenzung zu zwei anderen Vorlagen:</p>',
          '<ul>',
          '<li><strong>Einzelnen Fachtext beauftragen:</strong> Für einen konkreten Ratgeber oder eine einzelne Leistungsseite nutzen Sie unsere <a href="/de/tools/briefing-vorlage-texter">Briefing Vorlage für Texter</a>.</li>',
          '<li><strong>Laufende SEO-Betreuung ohne Neubau ausschreiben:</strong> Wenn die Website stehen bleibt und Sie eine SEO-Agentur suchen, greifen Sie direkt zur <a href="/de/tools/seo-ausschreibung-vorlage">SEO Ausschreibung Vorlage (RFP)</a>.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'die-12-abschnitte-im-ueberblick',
        h2: 'Was gehört in ein vollständiges Lastenheft für eine Website? (12 Teile)',
        html: '<p>Sie müssen im ersten Aufschlag noch nicht jede technische Detailfrage selbst lösen - auch der Vermerk „bitte Empfehlung im Angebot ausweisen“ ist für Dienstleister wertvoll, weil der Punkt dann sauber eingepreist statt übersehen wird.</p>',
        tabela: {
          id: 'tabelle-12-abschnitte-website-briefing',
          caption: 'Die 12 Abschnitte der Website Briefing Vorlage und ihre Rolle für das Festpreis-Angebot',
          columns: [
            { key: 'nr', label: 'Abschnitt' },
            { key: 'inhalt', label: 'Zentrale Angaben im Dokument' },
          ],
          rows: SEKTIONEN_WEBSITE_BRIEF_DE.map(([nr, inhalt]) => ({ nr, inhalt })),
        },
      },
      {
        id: 'seo-ki-und-technik-anforderungen',
        h2: 'Der oft vergessene Abschnitt 8: SEO, Core Web Vitals, KI-Bots und Technik-Abnahme',
        html: [
          '<p>In der Praxis erleben wir regelmäßig Relaunches, die optisch modern wirken, aber binnen vier Wochen die Hälfte ihrer organischen Anfragen verlieren - weil wichtige Leistungsunterseiten zu einem einzigen One-Pager zusammengestrichen wurden oder alte URLs ins Leere (404) laufen. Nehmen Sie deshalb diese sechs messbaren Abnahmekriterien fest in Ihr Website Briefing auf:</p>',
          '<ul>',
          '<li><strong>Eigene URL je Kernleistung statt Sammel-Seite:</strong> Jede geschäftswichtige Dienstleistung erhält eine eigene Unterseite mit eindeutigem Haupt-Keyword (keine kopierten Orts-Brückenseiten ohne echten lokalen Inhalt).</li>',
          '<li><strong>Server-Side-Rendering (SSR / SSG) für Google und KI-Systeme:</strong> Sämtliche Überschriften, Fachtexte, Preise, FAQs und internen Links müssen sofort im ausgelieferten HTML stehen, damit auch KI-Suchbots ohne JavaScript-Engine (prüfbar im <a href="/de/tools/ki-crawler-robots-txt-pruefen">KI-Crawler &amp; robots.txt Prüfer</a>) Ihre Inhalte lesen können.</li>',
          '<li><strong>Verbindliche Core-Web-Vitals-Schwellen auf dem Smartphone:</strong> Google indexiert Websites nach der mobilen Version. Fordern Sie grüne Grenzwerte gemäß web.dev ein: <strong>LCP &lt;= 2,5 s, INP &lt;= 200 ms und CLS &lt;= 0,1</strong> (Live-Messung im <a href="/de/tools/core-web-vitals-vergleich">Core Web Vitals Vergleich</a>).</li>',
          '<li><strong>1:1-Weiterleitungsmatrix vor dem Livegang:</strong> Jede bisher rankende oder extern verlinkte URL erhält eine direkte permanente 301-Weiterleitung auf das passende neue Gegenstück - begleitet von unserer <a href="/de/tools/website-relaunch-checkliste">Website Relaunch Checkliste</a>.</li>',
          '<li><strong>Systementscheidung nach 24-Monats-Gesamtkosten treffen:</strong> Prüfen Sie vorab unvoreingenommen, ob eine individuell programmierte Lösung oder ein CMS besser zu Ihrem Team passt (siehe <a href="/de/vergleiche/nextjs-vs-wordpress-seo">Next.js vs. WordPress</a> sowie <a href="/de/vergleiche/webflow-vs-wordpress-seo">Webflow vs. WordPress</a>).</li>',
          '<li><strong>DSGVO, lokales Font-Hosting &amp; Barrierefreiheit (BFSG):</strong> Lokal eingebundene Schriften ohne externe US-Requests, sauber konfigurierter Consent Mode v2 sowie gute Kontraste und Tastaturbedienbarkeit (Vertiefung im <a href="/de/blog/ux-audit">UX Audit Leitfaden</a>).</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'praxisbeispiel-schlecht-vs-gut',
        h2: 'Praxisvergleich: Vage Wunschliste vs. belastbares Website Briefing',
        html: '<p>Der Unterschied zwischen Nachforderungen und einem verlässlichen Angebot liegt im Detailgrad. Das folgende fiktive Beispiel eines mittelständischen Metallbau- und Fassadenbetriebs zeigt den Kontrast:</p>',
        tabela: {
          id: 'tabelle-website-briefing-beispiel',
          caption: 'Typische unklare Formulierung vs. präzise Angabe in der Vorlage (fiktives Beispiel)',
          columns: [
            { key: 'feld', label: 'Briefing-Feld' },
            { key: 'schwach', label: 'Unklare Angabe (führt zu Nachträgen)' },
            { key: 'stark', label: 'Belastbare Angabe im Lastenheft' },
          ],
          rows: [
            { feld: 'Geschäftsziel (Teil 2)', schwach: '„Die Website soll moderner und frischer aussehen.“', stark: 'Steigerung qualifizierter Projektanfragen von Architekturbüros und Gewerbekunden in Süddeutschland über ein strukturiertes Anfrageformular mit Plan-Upload (Messung als generate_lead in GA4).' },
            { feld: 'Seitenbaum (Teil 5)', schwach: '„Übliche Unternehmensseiten wie bisher.“', stark: 'Startseite, 4 getrennte Leistungsseiten (Aluminiumfassaden, Brandschutztüren, Stahlhallenbau, Wartung), 6 Referenzprojekte, Karriereseite mit 3 offenen Stellen, Über uns, Kontakt (DE + EN).' },
            { feld: 'Inhalte (Teil 6)', schwach: '„Texte liefern wir rechtzeitig vor Start.“', stark: 'Stichpunkte & Projektdaten kommen von unserer Bauleitung; professionelle SEO-Ausformulierung für 4 Leistungsseiten soll im Agenturangebot separat ausgewiesen werden.' },
            { feld: 'SEO & Relaunch (Teil 8)', schwach: '„Bitte SEO-freundlich umsetzen.“', stark: 'Bestehende Domain hat 480 Non-Brand-Klicks/Monat in GSC (Export anbei). 301-Mapping für alle 26 Alt-URLs durch Auftragnehmer, SSR-HTML, mobiles LCP <= 2,5 s, eigene Inhaberschaft aller Google-Konten.' },
            { feld: 'Budget & Termin (Teil 11)', schwach: '„Schnellstmöglich, bestes Preis-Leistungs-Verhältnis.“', stark: 'Investitionsrahmen 6.000 bis 9.500 € netto inkl. Texten; Livegang spätestens 15. September vor Messestart in Stuttgart.' },
          ],
        },
        htmlPo: '<p>Tipp für Teil 9 (Design &amp; Struktur): Wenn Ihnen visuelle Worte schwerfallen, erstellen Sie vorab in 2 Minuten mit unserem kostenlosen <a href="/de/tools/website-relaunch-mockup">Website Relaunch Mockup</a> einen konkreten Startseiten-Entwurf aus Ihren aktuellen Inhalten und legen Sie den Link einfach dem Briefing bei. Falls Sie Website-Neubau und laufendes SEO aus einer Hand suchen, finden Sie unsere Konditionen (inklusive Booster Pack mit neuer Next.js-Website) unter <a href="/de/seo-kosten">SEO Kosten</a>.</p>',
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Seitenbaum, SEO-Abnahme & Projekt-Checkliste',
      opis: 'Auszug aus den 12 Abschnitten des A4-PDFs. Die technischen SEO-Abnahmekriterien in Teil 8 können Sie direkt im Browser abhaken.',
      html: [
        '<h3>Teil 1-3. Unternehmensprofil, Geschäftsziele & Zielgruppe (Kurzüberblick)</h3>',
        tabelaHtml(
          ['Fragestellung im Lastenheft', 'Eintrag Ihres Unternehmens'],
          [
            ['Unternehmen, aktuelle Domain & zentraler Ansprechpartner', '…'],
            ['Wichtigste Leistungen / Produktlinien nach Deckungsbeitrag', '1. …  2. …  3. …'],
            ['Messbares 12-Monats-Ziel (Anfragen, Bewerbungen, Umsatz) & GA4-Event', '…'],
            ['Top-5-Fragen oder Einwände von Kunden vor der Anfrage', '…'],
          ],
        ),
        '<h3>Teil 5. Geplanter Seitenbaum & Keyword-Zuordnung</h3>',
        tabelaHtml(
          ['Geplante Unterseite', 'Ziel der Seite (Conversion)', 'Reserviertes Haupt-Keyword', 'Text & Fotos vorhanden?'],
          [
            ['Startseite', 'Orientierung & Vertrauen', 'Marke + Kernpositionierung', '☐ Ja ☐ Agentur'],
            ['Leistung 1: …', 'Qualifizierte Projektanfrage', '…', '☐ Ja ☐ Agentur'],
            ['Leistung 2: …', 'Qualifizierte Projektanfrage', '…', '☐ Ja ☐ Agentur'],
            ['Referenzen / Fallstudien', 'Praxisnachweis (E-E-A-T)', '…', '☐ Ja ☐ Agentur'],
          ],
        ),
        '<h3>Teil 8. Verbindliche SEO- & Technik-Abnahmekriterien zum Go-Live</h3>',
        '<ul>',
        '<li>☐ <strong>Server-HTML & Mobile Parität:</strong> Vollständige Texte und interne Links im HTML auf Smartphone und Desktop identisch.</li>',
        '<li>☐ <strong>Core Web Vitals erfüllt:</strong> Mobiles LCP &lt;= 2,5 s, INP &lt;= 200 ms und CLS &lt;= 0,10 ohne Layout-Springen.</li>',
        '<li>☐ <strong>Saubere On-Page-Basis:</strong> Jede indexierbare URL besitzt eigenen Title (&lt;= 60 Z.), Meta-Description und genau eine H1.</li>',
        '<li>☐ <strong>Staging-Schutz sauber gelöst:</strong> Passwortschutz während der Entwicklung; alle noindex-Sperren am Go-Live entfernt.</li>',
        '<li>☐ <strong>1:1-Weiterleitungen aktiv:</strong> Alle bisherigen Traffic- und Backlink-URLs leiten ohne Kette per 301 auf Status 200 weiter.</li>',
        '<li>☐ <strong>DSGVO, Sitemap & Tracking:</strong> Lokale Fonts, Consent Mode v2, neue XML-Sitemap in GSC und aktive GA4-Schlüsselereignisse.</li>',
        '</ul>',
      ].join(''),
    },
    formularz: {
      h2: 'Website Briefing Vorlage als PDF herunterladen',
      opis: 'Wir senden Ihnen das komplette 12-teilige Lastenheft inklusive Seitenbaum-Tabelle, 301-Migrationsblatt, SEO-Abnahmekriterien und Budgetbogen kostenlos als A4-PDF.',
      etykieta: 'Ihre geschäftliche E-Mail-Adresse',
      przycisk: 'Website-Briefing als PDF senden',
      przedmiot: 'die Website Briefing Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Download-Link zur Website Briefing Vorlage trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Worin liegt der Unterschied zwischen Website Briefing, Lastenheft und Pflichtenheft?',
        answer: 'Website Briefing und Lastenheft werden vom Auftraggeber erstellt und beschreiben aus Geschäftssicht, WAS erreicht werden soll und welche Rahmenbedingungen gelten. Das Pflichtenheft schreibt anschließend der ausgewählte Dienstleister und legt darin technisch fest, WIE diese Anforderungen im Detail umgesetzt werden.',
      },
      {
        question: 'Sollte ich meinen Budgetrahmen im Website Briefing offen nennen?',
        answer: 'Ja, zumindest als realistische Netto-Spanne. Ohne Budgetkorridor wissen Agenturen nicht, ob sie eine schlanke Basislösung in Phasen oder ein Komplettpaket inklusive Texterstellung, Fotoproduktion und CRM-Anbindung kalkulieren sollen. Ein genannter Rahmen sorgt für passgenaue Lösungsvorschläge statt Ratespiele.',
      },
      {
        question: 'An wie viele Agenturen sollte ich dieselbe Website Briefing Vorlage senden?',
        answer: 'Drei bis maximal fünf vorausgewählte Anbieter sind ideal. Senden Sie allen exakt dasselbe Dokument und bitten Sie um eine Aufschlüsselung in dieselben Kostenblöcke (Konzept/Design, Entwicklung, Inhalte, SEO-Migration, laufende Wartung), damit Sie die Angebote sauber nebeneinanderlegen können.',
      },
      {
        question: 'Warum gehört das Thema SEO schon ins Website Briefing und nicht erst nach dem Livegang?',
        answer: 'Weil Informationsarchitektur, URL-Struktur, Rendering-Technik (SSR vs. reines Client-JS) und Ladezeiten beim Bau der Website festgelegt werden. Wer SEO erst nach dem Go-Live hinzuzieht, bezahlt häufig teure Umbauten am fertigen Template oder verliert durch fehlende 301-Weiterleitungen jahrelang aufgebaute Rankings.',
      },
      {
        question: 'Was trage ich ein, wenn unser Unternehmen komplett neu startet und noch keine alte Website hat?',
        answer: 'Überspringen Sie einfach die Punkte zu Alt-Traffic und 301-Weiterleitungen in Abschnitt 8. Konzentrieren Sie sich stattdessen auf einen sauberen Seitenbaum mit einer Unterseite pro Kernleistung, eindeutiges Kontoeigentum (Domain, Google Search Console, GA4 und Unternehmensprofil auf Ihren Firmennamen) sowie schnelle mobile Darstellung ab dem ersten Tag.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/makieta-redesignu', tekst: 'Website Relaunch Mockup mit KI', opis: 'erzeugt in 1-3 Minuten kostenlos einen visuellen Startseiten-Entwurf als Briefing-Anhang' },
      { href: '/narzedzia/checklista-migracji-strony', tekst: 'Website Relaunch Checkliste', opis: 'alle 26 SEO-Prüfpunkte vor, am und nach dem Umschalttermin' },
      { href: '/porownania/nextjs-vs-wordpress-seo', tekst: 'Next.js vs. WordPress Vergleich', opis: 'Entscheidungshilfe zu Ladezeit, Sicherheit und 24-Monats-Gesamtkosten' },
      { href: '/narzedzia/zapytanie-ofertowe-seo', tekst: 'SEO Ausschreibung Vorlage (RFP)', opis: 'das passende Dokument, wenn Sie statt Webdesign laufendes SEO ausschreiben' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Booster Pack', opis: 'laufende SEO-Pakete ab 450 € netto sowie Booster Pack inklusive neuer Next.js-Website' },
    ],
    plikNazwa: 'Website Briefing Vorlage: Lastenheft in 12 Teilen inkl. SEO (PDF)',
  },
};

export default SZABLON_BRIEF_STRONY_DE;
