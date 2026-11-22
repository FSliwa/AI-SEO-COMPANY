// Szablon „SEO Ausschreibung Vorlage (RFP)” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/zapytanie-ofertowe-seo.js (/de/tools/seo-ausschreibung-vorlage).
// PDF: public/pliki/de/seo-ausschreibung-vorlage.pdf.
// Enthält Zielbegriffe „seo ausschreibung vorlage“ und „seo rfp vorlage“.
// Kaufmännisches Muster für privatwirtschaftliche B2B-Anfragen - kein öffentliches Vergaberecht (UVgO/VgV), keine Rechtsberatung.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Brauchen Sie einen SEO? (Prüffragen, Lesezugriff beim Vorab-Check, Warnung vor Platz-1-Garantien)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7687615', nazwa: 'Search-Console-Hilfe: Inhaber, Nutzer und eingeschränkte Leseberechtigungen verwalten', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/9305587', nazwa: 'Google-Analytics-4-Hilfe: Zugriffs- und Datenbeschränkungsverwaltung (Betrachter-Rolle)', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/3403100', nazwa: 'Google Unternehmensprofil-Hilfe: Hauptinhaber behalten und Agenturen als Manager einladen', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien (Link-Spam, gekaufte Verweise und Verantwortung des Website-Betreibers)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen in der Suche und seriöse Einordnung von GEO-/AEO-Maßnahmen', data: '2026-11-11' },
];

export const TEILE_RFP_DE = [
  ['1. Unternehmen & Ansprechpartner', 'Firmenname, Domain, Branche, Zielregionen, operative Ansprechperson und wer intern die finale Vergabeentscheidung trifft'],
  ['2. Geschäftsziel (12 Monate)', 'Welches kaufmännische Ergebnis zählt (qualifizierte B2B-Anfragen, Shop-Bestellungen, Demo-Termine) und wie hoch der aktuelle Ist-Wert in GA4/CRM liegt'],
  ['3. Technischer & organischer Ist-Stand', 'Eingesetztes CMS/Shopsystem, URL-Anzahl, Sprachen, Non-Brand-Klicks (12 Mon. GSC), letzte Relaunches/Einbrüche und bisherige Agenturhistorie'],
  ['4. Markt, Prioritäten & Wettbewerb', 'Umsatzstärkste Leistungen/Kategorien in Prioritätsreihenfolge sowie 3 bis 5 reale Wettbewerber aus Google-SERPs und KI-Antworten'],
  ['5. Leistungsrahmen (3-Spalten-Matrix)', 'Eindeutige Trennung in „Pflichtbestandteil“, „Optional anbieten“ und „Nicht Teil der Ausschreibung“ (Technik, Content, Links, Local, GEO/KI, Reporting)'],
  ['6. Interne Ressourcen beim Auftraggeber', 'Verfügbare Entwicklerstunden pro Monat, interne Fachprüfer für Texte, Freigabedauer in Werktagen und CMS-Zugangsregeln'],
  ['7. Unverhandelbare Rahmenbedingungen', 'Volles Eigentum an Google-/Bing-Konten, dauerhafte Text- und Linkrechte, Kündigungsfrist, Verzicht auf Linkmiete und Reporting aus eigenen Daten'],
  ['8. 12 schriftliche Fragen an die Agentur', 'Verbindlicher Fragenkatalog, den alle eingeladenen Anbieter schriftlich im Angebot statt nur mündlich im Pitch beantworten'],
  ['9. Einheitliches Angebots- & Preisblatt', 'Monatliches Netto-Honorar, etwaige Einmalkosten, konkrete Stückzahlen/Stunden, Vertragsmodell und konkreter 90-Tage-Startplan'],
  ['10. Fristen, Vertraulichkeit & Vergabe', 'Rückfragefrist (Antworten gehen an alle Bieter), Abgabetermin, Pitch-Woche, gewichtete Bewertungskriterien und Unverbindlichkeitsvermerk'],
];

export const FRAGEN_AGENTUR_DE = [
  'Welche realistische Entwicklung erwarten Sie für unsere Domain in 6 und 12 Monaten - woran messen wir den Fortschritt und welche Voraussetzungen müssen wir intern dafür schaffen?',
  'Welche konkreten Maßnahmen setzen Sie in den ersten 90 Tagen in welcher Reihenfolge um (Technik, bestehende Leistungsseiten, neue Inhalte, Autorität)?',
  'Wer betreut unser Projekt operativ im Alltag (Name, Rolle, Erfahrung) und wie viele Mandate verantwortet diese Fachkraft parallel?',
  'Legen Sie dem Angebot bitte einen anonymisierten Muster-Monatsbericht oder Zugang zu Ihrem Live-Kundenportal auf Basis von Search Console und GA4 bei?',
  'Welche nachprüfbaren Referenzen haben Sie in vergleichbaren B2B-Branchen, im DACH-Raum oder mit unserem CMS/Shopsystem?',
  'Wie gewinnen Sie externe Verlinkungen und Erwähnungen - und bestätigen Sie schriftlich, dass keine gemieteten Linknetzwerke (PBNs) eingesetzt werden, die nach Vertragsende verschwinden?',
  'Wie läuft der Freigabeprozess für neue Fachtexte und technische Änderungen ab, und führen Sie ein lückenloses Änderungsprotokoll (Changelog)?',
  'Wie messen und verbessern Sie unsere Nennungen in KI-Antwortsystemen (ChatGPT, Gemini, Perplexity, Google AI Overviews) ohne unseriöse Garantien?',
  'Was genau ist im monatlichen Honorar enthalten (Anzahl und Tiefe neuer/überarbeiteter Texte, Technik-Stunden, Outreach/PR, Beratung) und was kostet extra?',
  'Welche Mindestlaufzeit, welche Kündigungsfrist in Textform und welche Regelung zu Nutzungsrechten an Texten, Code und Konten sieht Ihr Vertragsentwurf vor?',
  'Was unternehmen wir gemeinsam, falls nach den ersten drei bis vier Monaten trotz umgesetzter Maßnahmen keine Bewegung bei Sichtbarkeit und relevanten Klicks eintritt?',
  'Dürfen wir vor der Entscheidung kurz mit einem aktuellen oder ehemaligen Kunden Ihres Hauses sprechen?',
];

export const BEWERTUNG_RFP_DE = [
  ['Verständnis des Geschäftsziels & konkreter 90-Tage-Plan', '25 %', 'Individueller Bezug auf unsere Website und Engpässe statt kopierter Standardfolien', 'Austauschbares Paket-PDF ohne Blick in unsere Domain'],
  ['Transparenter Leistungsumfang & 12-Monats-Gesamtkosten', '20 %', 'Klare monatliche Liefermengen (Texte, Technik, PR/Links) und saubere Trennung von Einmalkosten', 'Pauschales „Full-Service-SEO“ ohne messbare Stückzahlen'],
  ['Messkonzept & Reporting aus eigenen Daten', '15 %', 'Bericht aus unserer Search Console & GA4 (Non-Brand-Klicks, Anfragen, erledigte URLs)', 'Reine Keyword-Tabellen aus proprietären Agentur-Tools'],
  ['Faire Vertragsbedingungen & volles Eigentum', '15 %', 'Kurze Kündigungsfrist, Konten beim Kunden, dauerhafte Rechte an Texten und aufgebauten Links', '12- bis 24-Monats-Knebelvertrag mit Jahresverlängerung oder Linkmiete'],
  ['Operatives Team, CMS-Kompetenz & Referenzen', '15 %', 'Namentlich benannte Ansprechperson aus der Umsetzung und echte Kundenreferenz', 'Reines Vertriebsgespräch ohne Kontakt zur späteren Fachkraft'],
  ['Seriöse KI-/GEO-Methode & Google-Richtlinientreue', '10 %', 'Nachvollziehbare Stichprobenmessung in KI-Modellen im Einklang mit Google Search Essentials', 'Versprechen von „garantiert Platz 1 bei Google und ChatGPT“'],
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_RFP_DE = {
  slug: 'zapytanie-ofertowe-seo',
  plik: 'zapytanie-ofertowe-seo',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/seo-ausschreibung-vorlage.pdf',
  seo: {
    tytul: 'SEO Ausschreibung Vorlage (RFP): Agentur-Anfrage PDF',
    opis: 'Kostenlose SEO Ausschreibung Vorlage (RFP) als PDF: 10 Projektfelder, 12 Pflichtfragen an Agenturen und Bewertungsmatrix für vergleichbare Angebote.',
  },
  de: {
    okruszek: 'SEO Ausschreibung Vorlage',
    tag: 'Kostenlose PDF-Vorlage (RFP)',
    h1: 'SEO Ausschreibung Vorlage: Vergleichbare Agentur-Angebote einholen',
    lead: 'Wer fünf SEO-Agenturen formlos per E-Mail um „ein Angebot für Suchmaschinenoptimierung“ bittet, erhält fünf völlig unvergleichbare PDFs: vom billigen Erfolgsmodell auf den eigenen Markennamen bis zur 24-Monats-Pauschale ohne Mengenangabe. Unsere kostenlose SEO Ausschreibung Vorlage (SEO RFP Vorlage / Request for Proposal) gibt allen angefragten Anbietern exakt denselben Rahmen aus Zielen, Ausgangsdaten, Leistungsspalten, 12 schriftlichen Pflichtfragen und einer gewichteten Bewertungsmatrix.',
    karta: {
      nazwa: 'SEO Ausschreibung Vorlage / RFP (PDF)',
      opis: '10 strukturierte Anfrageblöcke, 3-Spalten-Leistungsmatrix, 12 Pflichtfragen an Agenturen und Angebots-Scorecard auf A4.',
      cta: 'SEO-RFP-Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'wann-seo-ausschreibung-sinnvoll-ist',
        h2: 'Was eine SEO Ausschreibung (RFP) leistet - und wann Sie sie einsetzen',
        html: [
          '<p>Eine <strong>SEO Ausschreibung Vorlage</strong> (international <strong>SEO RFP Vorlage</strong> für <em>Request for Proposal</em>) ist ein strukturiertes Anfragedokument, das ein Unternehmen vor der Agenturauswahl an drei bis fünf vorausgewählte Dienstleister versendet. Es zwingt beide Seiten zu Klarheit: Ihr Unternehmen definiert vorab Geschäftsziel, interne Ressourcen und Vertragsgrenzen - und jede Agentur muss im identischen Raster offenlegen, was sie für welches Budget konkret liefert.</p>',
          '<p><strong>Wichtiger Hinweis zur Einordnung:</strong> Diese Vorlage ist für privatwirtschaftliche Unternehmen im Mittelstand und B2B konzipiert. Sie ist <em>kein</em> Vergabeformular nach öffentlichem Vergaberecht (VgV / UVgO / BVergG) und ersetzt keine Rechtsberatung.</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-abgrenzung-rfp-briefing-vertrag',
          caption: 'SEO Ausschreibung, Website Briefing, Angebot und Vertrag sauber unterscheiden',
          columns: [
            { key: 'dokument', label: 'Dokument' },
            { key: 'autor', label: 'Wer erstellt es?' },
            { key: 'zweck', label: 'Zentrale Funktion im Auswahlprozess' },
          ],
          rows: [
            { dokument: 'SEO Ausschreibung (RFP)', autor: 'Auftraggeber', zweck: 'Holt von 3 bis 5 SEO-Agenturen direkt vergleichbare Angebote auf identischer Datenbasis ein' },
            { dokument: 'Website Briefing (Lastenheft)', autor: 'Auftraggeber', zweck: 'Beschreibt Neubau oder Relaunch einer Website (Design, Funktionen, CMS & SEO-Migration)' },
            { dokument: 'Agentur-Angebot', autor: 'Angefragte Agentur', zweck: 'Beantwortet den RFP schriftlich: 90-Tage-Plan, monatliche Liefermengen, Team und Honorar' },
            { dokument: 'SEO-Dienstvertrag', autor: 'Beide Parteien', zweck: 'Regelt verbindlich Leistungsumfang, Kündigungsfrist, Kontoeigentum, Nutzungsrechte und AVV' },
          ],
        },
        htmlPo: '<p>Wenn Sie primär eine komplett neue Website ausschreiben möchten, nutzen Sie stattdessen unsere <a href="/de/tools/website-briefing-vorlage">Website Briefing Vorlage</a>. Steht bereits ein Vertragsentwurf im Raum, prüfen Sie das Kleingedruckte mit der <a href="/de/tools/seo-vertrag-checkliste">SEO Vertrag Checkliste</a>.</p>',
      },
      {
        id: 'aufbau-der-10-abschnitte',
        h2: 'Aufbau der SEO RFP Vorlage: 10 Abschnitte auf 3 bis 4 A4-Seiten',
        html: '<p>Halten Sie Ihre Anfrage kompakt: Ein überfrachtetes 25-Seiten-Dokument schreckt gerade spezialisierte, inhabergeführte Fachagenturen ab, während ein präziser 4-Seiter binnen 7 bis 10 Werktagen fundierte Ausarbeitungen liefert. Google empfiehlt in seinem offiziellen Leitfaden zur SEO-Auswahl genau darauf zu achten, ob ein Anbieter nach Ihrem Geschäftsmodell, Ihren Kunden und Ihren Wettbewerbern fragt - die Vorlage liefert diese Fakten geordnet vorab.</p>',
        tabela: {
          id: 'tabelle-10-abschnitte-seo-rfp',
          caption: 'Die 10 Bausteine der SEO Ausschreibung Vorlage',
          columns: [
            { key: 'abschnitt', label: 'Abschnitt im PDF' },
            { key: 'inhalt', label: 'Was Sie darin festhalten' },
          ],
          rows: TEILE_RFP_DE.map(([abschnitt, inhalt]) => ({ abschnitt, inhalt })),
        },
        htmlPo: [
          '<p>Zwei praktische Tipps aus Google Search Central für Teil 3 (Datenzugriff) und Teil 5 (KI-Sichtbarkeit):</p>',
          '<ul>',
          '<li><strong>Beim Vorab-Check nur Leserechte vergeben:</strong> Wenn Sie Bieter vor Angebotsabgabe in Ihre Google Search Console oder GA4 blicken lassen möchten, vergeben Sie ausschließlich die Rolle „Eingeschränkter Nutzer“ bzw. „Betrachter“ - niemals Inhaber- oder Bearbeitungsrechte. Nach der Entscheidung entfernen Sie die unterlegenen Bieter sofort wieder.</li>',
          '<li><strong>KI-Sichtbarkeit (GEO) als integrierten Bestandteil abfragen:</strong> Fragen Sie konkret ab, mit wie vielen realen Kauf-Prompts und in welchen Systemen (ChatGPT, Gemini, Perplexity, Google AI Overviews) die Agentur Ihre Markennennung misst (wie in unserem <a href="/de/ki-suchoptimierung/ki-sichtbarkeit-audit">KI-Sichtbarkeits-Audit</a>), und streichen Sie Anbieter mit unseriösen „Platz-1-Garantien“.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'praxisbeispiel-ausgefuellte-anfrage',
        h2: 'Ausgefülltes Praxisbeispiel: So sieht eine präzise B2B-SEO-Anfrage aus',
        html: '<p>Das folgende fiktive Beispiel eines mittelständischen Herstellers für Lager- und Betriebseinrichtungen zeigt, wie wenige klare Zahlen reichen, um substanzielle Angebote zu erhalten:</p>',
        tabela: {
          id: 'tabelle-rfp-praxisbeispiel',
          caption: 'Muster-Auszug einer ausgefüllten SEO Ausschreibung (fiktives B2B-Unternehmen)',
          columns: [
            { key: 'block', label: 'Abschnitt' },
            { key: 'eintrag', label: 'Beispiel-Eintrag des ausschreibenden Unternehmens' },
          ],
          rows: [
            { block: 'Ziel (12 Monate)', eintrag: 'Steigerung qualifizierter B2B-Angebotsanfragen für Kragarm- und Palettenregale im DACH-Raum. Ist-Wert laut GA4: Ø 14 organische Anfragen/Monat; bitte realistischen Zielkorridor im Angebot begründen.' },
            { block: 'Ist-Stand Website', eintrag: 'Shopware 6 / 180 Kategorieseiten & Ratgeber, nur Deutsch. Ø 1.850 Non-Brand-Klicks/Monat in GSC. Nach Template-Update im Frühjahr -22 % Klicks auf Kategorieseiten; technischer Schnellcheck im kostenlosen SEO Audit ergab 71/100 Punkte.' },
            { block: 'Pflicht-Umfang', eintrag: 'Technisches Initial-Audit & Behebung der Indexierungsbremsen, Ausbau von 12 Kern-Kategorieseiten, monatliche Fachratgeber inkl. Briefing, seriöser B2B-Linkaufbau, KI-Sichtbarkeits-Messung und Monatsreporting.' },
            { block: 'Interne Ressourcen', eintrag: 'Externer Shopware-Entwickler (6 Std./Monat reserviert), technischer Vertrieb prüft Fachtexte binnen 4 Werktagen.' },
            { block: 'Rahmen & Budget', eintrag: 'Konto-Inhaberschaft bleibt bei uns, Kündigungsfrist max. 1 Monat zum Monatsende nach 3 Monaten Anlaufphase. Geplanter Honorarrahmen: 1.200 bis 2.200 € netto/Monat (bitte Basis- und Ausbauvariante zeigen).' },
          ],
        },
      },
      {
        id: 'bewertungsmatrix-und-preisvergleich',
        h2: 'Angebote objektiv vergleichen: Gewichtete Scorecard (0 bis 2 Punkte)',
        html: '<p>Legen Sie die Gewichtung der Auswahlkriterien fest, <em>bevor</em> die ersten Angebote eintreffen. In unserer Vorlage bewerten Sie jeden Anbieter je Kriterium mit <strong>0 Punkten</strong> (ausweichend / Standardfloskel), <strong>1 Punkt</strong> (teilweise beantwortet) oder <strong>2 Punkten</strong> (konkret mit Nachweis und Vertragszusage belegt) und vergleichen daneben immer die <strong>Gesamtkosten über 12 Monate</strong> (12 x Monatshonorar + sämtliche Setup-/Audit-Einmalposten).</p>',
        tabela: {
          id: 'tabelle-rfp-bewertungsmatrix',
          caption: 'Bewertungsmatrix für eingehende SEO-Angebote (Vorschlag AI SEO COMPANY)',
          columns: [
            { key: 'kriterium', label: 'Bewertungskriterium' },
            { key: 'gewicht', label: 'Gewicht' },
            { key: 'stark', label: '2 Punkte (überzeugender Nachweis)' },
            { key: 'warnung', label: 'Warnsignal (0 Punkte)' },
          ],
          rows: BEWERTUNG_RFP_DE.map(([kriterium, gewicht, stark, warnung]) => ({
            kriterium,
            gewicht,
            stark,
            warnung,
          })),
        },
        htmlPo: '<p>Vertiefende Entscheidungshilfen für die Auswertung finden Sie in unseren Vergleichen <a href="/de/vergleiche/seo-agentur-auswaehlen">SEO Agentur finden &amp; auswählen (12 Fragen)</a> und <a href="/de/vergleiche/seo-erfolgsbasiert-oder-retainer">SEO erfolgsbasiert oder Retainer</a>. Wenn Sie dabei eine bestehende Agentur ablösen, begleitet Sie unser Leitfaden <a href="/de/seo-agentur-wechseln">SEO Agentur wechseln</a> durch die sichere Konten-Übergabe. Gerne beteiligen auch wir uns transparent an Ihrer Ausschreibung - unsere festen Paketpreise ab 450 € netto finden Sie offen unter <a href="/de/seo-kosten">SEO Kosten</a>.</p>',
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Leistungsmatrix, 12 Agentur-Fragen & Scorecard',
      opis: 'Auszug aus dem ausfüllbaren PDF-Dokument. Die 7 unverhandelbaren Rahmenbedingungen in Teil 7 lassen sich direkt hier im Browser abhaken.',
      html: [
        '<h3>Teil 5. Leistungsrahmen in 3 Spalten (damit alle Agenturen identisch kalkulieren)</h3>',
        tabelaHtml(
          ['Leistungsbereich', 'Pflicht im Angebot', 'Optional ausweisen', 'Außerhalb des Umfangs'],
          [
            ['Technisches SEO-Audit & Begleitung der Umsetzung', '☐', '☐', '☐'],
            ['Optimierung bestehender Leistungs- & Kategorieseiten', '☐', '☐', '☐'],
            ['Neue Fachinhalte inkl. SEO-Briefing (Stückzahl/Monat: …)', '☐', '☐', '☐'],
            ['Redaktioneller Linkaufbau & Digital PR (ohne Mietlinks)', '☐', '☐', '☐'],
            ['KI-Sichtbarkeit / GEO (ChatGPT, Gemini, Perplexity, AIO)', '☐', '☐', '☐'],
            ['GA4-Schlüsselereignisse & monatliches GSC-Reporting', '☐', '☐', '☐'],
          ],
        ),
        '<h3>Teil 7. Unverhandelbare Anforderungen an die Zusammenarbeit</h3>',
        '<ul>',
        '<li>☐ <strong>Volle Konto-Inhaberschaft:</strong> GSC, GA4, Tag Manager und Google Unternehmensprofil bleiben Eigentum des Auftraggebers.</li>',
        '<li>☐ <strong>Unbeschränkte Nutzungsrechte:</strong> Alle bezahlten Texte, Grafiken und Code-Anpassungen verbleiben dauerhaft beim Kunden.</li>',
        '<li>☐ <strong>Dauerhafte Backlinks:</strong> Keine Linkmiete und keine Abschaltung bezahlter Verweise nach Vertragsende.</li>',
        '<li>☐ <strong>Google-Richtlinientreue:</strong> Ausdrücklicher Verzicht auf Spam-Techniken und gekaufte PBN-Netzwerke.</li>',
        '<li>☐ <strong>Freigabevorbehalt:</strong> Veröffentlichung von Texten und Template-Eingriffen erst nach Freigabe inklusive Changelog.</li>',
        '<li>☐ <strong>Ehrliches Reporting:</strong> Monatsbericht direkt aus unserer Search Console und GA4 (Non-Brand-Klicks & Leads).</li>',
        '<li>☐ <strong>Faire Kündigungsregel:</strong> Kurze Kündigungsfrist per E-Mail ohne stillschweigende 12-Monats-Verlängerung.</li>',
        '</ul>',
        '<h3>Teil 8. Die 12 schriftlichen Pflichtfragen an jede angefragte Agentur</h3>',
        `<ol>${FRAGEN_AGENTUR_DE.map((f) => `<li>${f}</li>`).join('')}</ol>`,
      ].join(''),
    },
    formularz: {
      h2: 'SEO Ausschreibung Vorlage (RFP) als PDF herunterladen',
      opis: 'Laden Sie die komplette 10-teilige SEO RFP Vorlage inklusive 3-Spalten-Leistungsmatrix, den 12 Pflichtfragen an Agenturen, Preisblatt und Bewertungs-Scorecard kostenlos als A4-PDF herunter.',
      etykieta: 'Ihre geschäftliche E-Mail-Adresse',
      przycisk: 'SEO-RFP-Vorlage als PDF senden',
      przedmiot: 'die SEO Ausschreibung Vorlage (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur SEO Ausschreibung Vorlage trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'An wie viele Agenturen sollte ich eine SEO Ausschreibung senden?',
        answer: 'Drei bis fünf vorab geprüfte Agenturen sind in der Praxis optimal. Bei weniger als drei Angeboten fehlt der Marktvergleich; bei zehn oder mehr Anfragen reicht die Zeit kaum für fundierte Rückfragen und persönliche Kennenlerngespräche mit dem operativen Team.',
      },
      {
        question: 'Wie viel Bearbeitungszeit sollte ich den Agenturen für das Angebot einräumen?',
        answer: 'Planen Sie mindestens sieben bis zehn Werktage ein, bei größeren Online-Shops oder mehrsprachigen Domains rund zwei Wochen. Eine seriöse Agentur muss Ihre Technik, Suchanfragen und SERP-Wettbewerber tatsächlich analysieren - wer binnen zwei Stunden antwortet, versendet meist nur eine unpersönliche Standardpreisliste.',
      },
      {
        question: 'Sollte ich in der SEO Ausschreibung ein Zielbudget angeben?',
        answer: 'Ja, ein realistischer monatlicher Netto-Korridor verbessert die Qualität der Angebote erheblich. SEO ist skalierbar: Mit einem bekannten Rahmen zeigen Ihnen seriöse Anbieter konkret, wie viele Inhalte, Technik-Stunden und Outreach-Maßnahmen darin pro Monat realisierbar sind, statt im Blindflug am Bedarf vorbeizukalkulieren.',
      },
      {
        question: 'Verpflichtet das Versenden dieser Anfrage zum Abschluss eines Vertrags?',
        answer: 'Nein. Eine privatwirtschaftliche Angebotsanfrage (RFP) dient unverbindlich der Markterkundung. In Abschnitt 10 unserer Vorlage ist dennoch ausdrücklich ein Vermerk enthalten, dass aus der Teilnahme weder ein Anspruch auf Vertragsschluss noch auf Aufwandsentschädigung entsteht.',
      },
      {
        question: 'Warum sollte ich Rückfragen einer Agentur immer an alle Teilnehmer beantworten?',
        answer: 'Stellt ein Bieter eine kluge Verständnisfrage - etwa zu internen Entwicklerkapazitäten oder geplanten Produktstarts -, verändert die Antwort oft die Kalkulation. Wenn Sie alle Fragen und Antworten gesammelt und anonymisiert an sämtliche eingeladenen Agenturen senden, bleiben alle Angebote fair vergleichbar.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'SEO Agentur auswählen: 12 Fragen', opis: 'woran Sie im Gespräch seriöse Antworten von leeren Verkaufsversprechen unterscheiden' },
      { href: '/narzedzia/umowa-na-pozycjonowanie', tekst: 'SEO Vertrag Checkliste', opis: 'prüft nach der Auswahl alle 12 Vertragsklauseln zu Kündigung, Konten und Rechten' },
      { href: '/porownania/pozycjonowanie-za-efekt-czy-abonament', tekst: 'SEO erfolgsbasiert oder Retainer', opis: 'warum vermeintliche Erfolgsmodelle im B2B oft teurer sind als ein transparenter Monatsvertrag' },
      { href: '/zmiana-agencji-seo', tekst: 'SEO Agentur wechseln', opis: '32-Punkte-Übergabeplan, falls Sie einen bestehenden Dienstleister ablösen' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Pakete', opis: 'unsere offenen Preise und Leistungen zum direkten Abgleich mit Ihren Angeboten' },
    ],
    plikNazwa: 'SEO Ausschreibung Vorlage (RFP): Anfrage & Bewertungsmatrix (PDF)',
  },
};

export default SZABLON_RFP_DE;
