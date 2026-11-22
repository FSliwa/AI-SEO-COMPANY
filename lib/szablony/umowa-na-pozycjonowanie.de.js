// F5 DE (22.11.2026): Niemiecki blok `de` dla lib/szablony/umowa-na-pozycjonowanie.js
// (PL /narzedzia/umowa-na-pozycjonowanie, EN /en/tools/seo-contract-checklist, DE /de/tools/seo-vertrag-checkliste).
// PDF: public/pliki/de/seo-vertrag-checkliste.pdf (generowany przez scripts/szablony/umowa-pdf.mjs).
// UWAGA PRAWNA: kaufmaennische Checkliste & Bildungsmuster - keine individuelle Rechtsberatung nach RDG.
// Wszystkie znaczniki pogrubienia <= 78 znakow, zero dlugich myslnikow.

export const KLAUZULE_VERTRAG_DE = [
  ['§ 1', 'Konkreter Leistungsumfang pro Monat', 'Exakte Stückzahlen im Anhang festhalten: Initial-Audit, Technik-Umsetzung, Mindestzahl geprüfter Fachinhalte, Mindestzahl redaktioneller Backlinks sowie Pflege des Google Unternehmensprofils.', 'Unverbindliche Pauschalformeln wie „laufende Vollbetreuung“ ohne messbare Liefergegenstände.'],
  ['§ 2', 'Laufzeit & 1 Monat Kündigungsfrist per E-Mail', 'Flexibler Monatsvertrag mit Kündigung in Textform (E-Mail) zum Ende des Folgemonats; eine kurze Mindestlaufzeit (z. B. 3 Monate) nur dann, wenn eine neue Website ohne Einmalpreis im Paket erstellt wird.', '12- bis 24-Monats-Bindung mit stillschweigender Verlängerung um ein weiteres volles Jahr.'],
  ['§ 3', 'Eigentum an Google-, Bing- & Domain-Konten', 'Google Search Console, GA4, Tag Manager, Google Unternehmensprofil, Bing Webmaster Tools und Google Ads laufen auf das Unternehmenskonto des Auftraggebers; die Agentur erhält Nutzer- bzw. Manager-Rechte.', 'Konten oder Unternehmensprofile unter einer Agentur-E-Mail ohne Inhaberrechte für den Kunden.'],
  ['§ 4', 'Dauerhafte Nutzungsrechte an Texten, Bildern & Code', 'Mit Begleichung der jeweiligen Monatsrechnung gehen zeitlich, räumlich und inhaltlich unbeschränkte Nutzungs- und Bearbeitungsrechte an allen erstellten Texten, Grafiken und Code-Anpassungen über.', 'Widerrufliche Lizenzen oder das Löschen bezahlter Ratgeber und Leistungsseiten nach Vertragsende.'],
  ['§ 5', 'Bestand aufgebauter Backlinks & Verbot von Linkmiete', 'Während der Zusammenarbeit aufgebaute redaktionelle Verweise bleiben nach Vertragsende bestehen; ausdrücklicher Verzicht auf gemietete PBN-Linknetzwerke und Verstöße gegen Googles Spam-Richtlinien.', 'Gemietete Links auf agentureigenen Seiten, die am Tag nach der Kündigung abgeschaltet werden.'],
  ['§ 6', 'Freigabevorbehalt & transparentes Arbeitsprotokoll', 'Die Agentur führt ein einsehbares Änderungsprotokoll (Changelog) und holt vor Veröffentlichung neuer Texte oder struktureller Template-Eingriffe die Freigabe in Textform ein.', 'Unabgestimmte Änderungen am Live-System ohne Backup und ohne Dokumentation.'],
  ['§ 7', 'Klare Netto-Vergütung ohne Einrichtungs- oder Ausstiegsgebühr', 'Fester monatlicher Nettobetrag (oder klar gedeckeltes Maximalbudget bei Mischmodellen), keine versteckten Setup-Pauschalen und 0 € Gebühr für die Übergabe bei Vertragsende.', 'Hohe „Onboarding-Gebühren“ ohne Gegenleistung oder kostenpflichtige Datenherausgabe beim Wechsel.'],
  ['§ 8', 'Reporting aus Ihren eigenen Daten (GSC & GA4)', 'Monatlicher Bericht oder 24/7-Kundenportal auf Basis Ihrer eigenen Search Console und GA4: Nicht-Marken-Klicks, Schlüsselereignisse (Anfragen), erledigte Aufgaben und volle Ziel-URLs neuer Links.', 'Reine Ranking-Tabellen aus einem Agentur-Tool ohne Klickdaten und ohne offengelegte Linkquellen.'],
  ['§ 9', 'Dienstvertragscharakter & seriöse GEO-/KI-Regeln', 'Klare Einordnung als Dienstvertrag (Sorgfaltspflicht statt unseriöser Platz-1-Garantie); beim KI-Modul feste Fragenanzahl, abgefragte Systeme und Messintervall.', 'Werbeversprechen „Garantiert Platz 1 bei Google oder ChatGPT“ gekoppelt an wertlose Nischenbegriffe.'],
  ['§ 10', 'Gegenseitige Vertraulichkeit (NDA) für Geschäftsdaten', 'Geheimhaltung von Anfragezahlen, Margen, Conversion-Raten und Produktplänen des Auftraggebers während und nach der Zusammenarbeit.', 'Einseitige Klauseln, die es dem Auftraggeber untersagen, Vertrag oder Audit extern prüfen zu lassen.'],
  ['§ 11', 'Ausgewogene Haftung ohne Vertragsstrafen bei Kündigung', 'Sachgerechte Haftungsregelung nach den gesetzlichen Grundsätzen; keinerlei pauschale Vertragsstrafen für eine ordentliche Kündigung.', 'Sofortige Fälligkeit sämtlicher Restmonate eines Zweijahresvertrags bei vorzeitigem Ausstieg.'],
  ['§ 12', 'Auftragsverarbeitung nach Art. 28 DSGVO & Exit-Protokoll', 'Bei Zugriff auf CMS-Formulare, Shop-Bestellungen oder CRM-Daten Abschluss eines AV-Vertrags (Art. 28 DSGVO) sowie geregelte Rechte-Entfernung binnen 7 Werktagen nach Vertragsende.', 'Admin-Zugang zu WordPress/WooCommerce mit Kundendaten ohne abgeschlossenen AV-Vertrag.'],
];

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Brauchen Sie einen SEO? (Warnsignale, Platz-1-Garantien, Verantwortung des Website-Inhabers)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien für die Google-Websuche (Link-Spam & gekaufte Links)', data: '2026-11-22' },
  { url: 'https://support.google.com/webmasters/answer/7687615', nazwa: 'Search-Console-Hilfe: Inhaber, Nutzer und Berechtigungen verwalten', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3403100', nazwa: 'Google Unternehmensprofil-Hilfe: Hauptinhaber und Manager verwalten', data: '2026-11-22' },
  { url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', nazwa: 'Verordnung (EU) 2016/679 (DSGVO - Art. 28 Auftragsverarbeitung)', data: '2026-11-22' },
];

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_UMOWA_DE = {
  seo: {
    tytul: 'SEO Vertrag Checkliste & Musterklauseln: PDF Download',
    opis: 'Kostenlose SEO Vertrag Checkliste als PDF: 12 Klauseln vor Vertragsabschluss prüfen - Kündigungsfrist, Google-Konten, Nutzungsrechte, Links und AVV.',
  },
  de: {
    okruszek: 'SEO Vertrag Checkliste',
    tag: 'Kostenlose PDF-Checkliste & Musterrahmen',
    h1: 'SEO Vertrag Checkliste: 12 Klauseln, die Auftraggeber vor der Unterschrift prüfen sollten',
    lead: 'Ein fairer SEO-Vertrag bindet Kunden durch messbare Arbeit statt durch 24 Monate Kleingedrucktes: Er benennt konkrete monatliche Lieferergebnisse, erlaubt die Kündigung per E-Mail mit einem Monat Frist und sichert Ihnen dauerhaft das Eigentum an Google-Konten, bezahlten Inhalten und aufgebauten Backlinks. Hier finden Sie alle 12 Prüfpunkte samt kostenlosem PDF-Prüfbogen.',
    karta: {
      nazwa: 'SEO Vertrag Checkliste: 12 Klauseln (PDF)',
      opis: 'Kaufmännischer Prüfbogen mit 12 Vertragsklauseln, typischen Agentur-Fallstricken, Musterformulierungen und Übergabeprotokoll.',
      cta: 'Checkliste herunterladen',
    },
    sekcje: [
      {
        id: 'rechtlicher-hinweis-und-vertragsart',
        h2: 'Rechtlicher Hinweis und warum ein seriöser SEO-Vertrag ein Dienstvertrag ist',
        html: [
          '<p><strong>Wichtiger Hinweis:</strong> Diese Seite und das zugehörige PDF-Dokument dienen als <em>kaufmännische Checkliste und unverbindliches Bildungsmuster für Unternehmen</em> - sie stellen keine individuelle Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes (RDG) oder vergleichbarer nationaler Vorschriften in Österreich und der Schweiz dar. Lassen Sie Verträge mit größerem Budgetvolumen vor Unterzeichnung anwaltlich prüfen.</p>',
          '<p>Rechtlich und technisch ist die laufende Suchmaschinenoptimierung regelmäßig als <strong>Dienstvertrag</strong> (geschuldet ist fachgerechtes Tätigwerden nach vereinbartem Leistungsumfang) und nicht als Werkvertrag mit garantiertem Ranking-Erfolg ausgestaltet. Google weist in seiner offiziellen Dokumentation ausdrücklich darauf hin, dass niemand Platz 1 bei Google garantieren kann, weil Suchalgorithmen und KI-Antwortmodelle laufend extern angepasst werden.</p>',
          '<p>Gerade weil es keine seriöse Platz-1-Garantie gibt, braucht der Auftraggeber drei harte vertragliche Sicherheiten: <strong>bezifferte Monatsleistungen, 100 % Konto- und Rechteeigentum</strong> sowie eine kurze einmonatige Kündigungsfrist.</p>',
        ].join(''),
      },
      {
        id: '12-klauseln-prueftabelle',
        h2: 'Die 12 wichtigsten Klauseln im SEO-Vertrag im Direktcheck',
        html: '<p>Lassen Sie sich vor der Entscheidung immer sowohl das Hauptdokument als auch verlinkte Allgemeine Geschäftsbedingungen (AGB) zusenden - automatische Jahresverlängerungen und Regeln zu „gemieteten Links“ stehen häufig im Anhang.</p>',
        tabela: {
          id: 'tabelle-12-klauseln-seo-vertrag',
          caption: '12 Prüfpunkte für B2B-Auftraggeber: fairer Standard vs. typische Warnsignale',
          columns: [
            { key: 'nr', label: 'Klausel' },
            { key: 'thema', label: 'Regelungsbereich' },
            { key: 'fair', label: 'Auftraggeberfreundlicher Standard' },
            { key: 'warnung', label: 'Warnsignal im Entwurf' },
          ],
          rows: KLAUZULE_VERTRAG_DE.map(([nr, thema, fair, warnung], i) => ({
            id: `k-${i + 1}`,
            nr,
            thema,
            fair,
            warnung,
          })),
          przypis: 'Eigene Zusammenstellung von AI SEO COMPANY auf Basis von Google Search Central und DSGVO Art. 28 (Stand: 22.11.2026).',
        },
      },
      {
        id: 'laufzeit-kuendigung-und-eigentum',
        h2: 'Kündigungsfrist, Google-Konten und der Schutz vor Link-Abschaltung',
        html: [
          '<ul>',
          '<li><strong>Monatsvertrag statt 24-Monats-Bindung:</strong> Natürlich baut sich organische Sichtbarkeit über mehrere Monate auf - doch eine Mindestlaufzeit von 12 oder 24 Monaten wälzt das gesamte Ausfallrisiko auf Ihr Unternehmen ab. Eine Mindestlaufzeit ist kaufmännisch nur dort begründet, wo die Agentur vorab eine komplette neue Website ohne Einmalpreis vorfinanziert (wie in unserem <a href="/de/seo-kosten">Booster Pack</a> mit 3 Monaten Mindestlaufzeit).</li>',
          '<li><strong>Hauptinhaber in Search Console, GA4 und Unternehmensprofil bleiben:</strong> Legen Sie alle Google- und Bing-Konten unter Ihrer eigenen Firmenadresse an und vergeben Sie lediglich Nutzer- bzw. Manager-Rechte. So behalten Sie bei einem späteren Wechsel sämtliche historischen Daten und Bewertungen.</li>',
          '<li><strong>Dauerhafte Texte und echte Drittlinks:</strong> Stellen Sie vertraglich klar, dass bezahlte Texte auf Ihrer Website verbleiben dürfen und aufgebaute Verlinkungen nicht aus agentureigenen Miet-Netzwerken stammen, die nach Vertragsende gelöscht werden.</li>',
          '<li><strong>Auftragsverarbeitung (Art. 28 DSGVO):</strong> Sobald die Agentur Administrationszugriff auf Ihr CMS (z. B. WordPress mit Kontaktformular-Speicherung) oder Ihr Shopsystem erhält, gehört ein Auftragsverarbeitungsvertrag inklusive geregelter Zugangs-Entfernung zum Pflichtpaket.</li>',
          '</ul>',
          '<p>Wie Sie vorab vergleichbare Angebote einholen und bewerten, lesen Sie unter <a href="/de/vergleiche/seo-agentur-oder-freelancer">SEO Agentur oder Freelancer</a> sowie in unserer Übersicht zu <a href="/de/seo-kosten">SEO Kosten und Monatsverträgen</a>.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau des PDF-Prüfbogens: Checkliste & Klausel-Rahmen',
      opis: 'Im PDF erhalten Sie eine abhakbare Prüftabelle für bis zu zwei Agenturentwürfe sowie Musterformulierungen zur Vorbereitung Ihres Gesprächs.',
      html: [
        '<p><strong>HINWEIS:</strong> Kaufmännisches Prüfmuster ohne Rechtsberatungscharakter.</p>',
        '<h3>Teil 1. Schnell-Check für vorliegende Agenturverträge (Auszug)</h3>',
        tabelaHtml(
          ['Nr.', 'Prüffrage an Vertrag & AGB', 'Entwurf A', 'Entwurf B', 'Anpassungswunsch'],
          [
            ['1', 'Sind Anzahl & Art von Inhalten, Technik-Stunden und Links pro Monat beziffert?', '☐ Ja ☐ Nein', '☐ Ja ☐ Nein', '…'],
            ['2', 'Ist die Kündigung monatlich per E-Mail ohne automatische Jahresverlängerung möglich?', '☐ Ja ☐ Nein', '☐ Ja ☐ Nein', '…'],
            ['3', 'Bleibt unser Unternehmen Hauptinhaber von GSC, GA4 und Google Unternehmensprofil?', '☐ Ja ☐ Nein', '☐ Ja ☐ Nein', '…'],
            ['4', 'Bleiben bezahlte Texte und aufgebaute Links nach Vertragsende dauerhaft erhalten?', '☐ Ja ☐ Nein', '☐ Ja ☐ Nein', '…'],
            ['5', 'Liegt bei CMS-/Shop-Zugriff ein AV-Vertrag nach Art. 28 DSGVO bei?', '☐ Ja ☐ Nein', '☐ Ja ☐ Nein', '…'],
          ],
        ),
        '<h3>Teil 2. Übergabe- & Exit-Protokoll zum Vertragsende</h3>',
        tabelaHtml(
          ['System / Zugang', 'Inhaber geprüft', 'Agentur-Nutzer entfernt am', 'Verantwortlich'],
          [
            ['Google Search Console & Bing Webmaster Tools', '☐', '…', '…'],
            ['Google Analytics 4 & Google Tag Manager', '☐', '…', '…'],
            ['Google Unternehmensprofil (Hauptinhaber)', '☐', '…', '…'],
            ['CMS- / Hosting- / Cloudflare-Zugänge & 2FA', '☐', '…', '…'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'SEO Vertrag Checkliste als PDF herunterladen',
      opis: 'Wir senden Ihnen den druckfertigen A4-Prüfbogen mit allen 12 Vertragsklauseln, dem Angebots-Vergleichsblatt und dem Exit-Protokoll direkt per E-Mail.',
      etykieta: 'Ihre geschäftliche E-Mail-Adresse',
      przycisk: 'Checkliste als PDF senden',
      przedmiot: 'die SEO Vertrag Checkliste (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Download-Link zur SEO Vertrag Checkliste trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Ersetzt diese SEO Vertrag Checkliste eine Prüfung durch einen Rechtsanwalt?',
        answer: 'Nein. Die Checkliste ist ein praxisnaher kaufmännischer Leitfaden für Geschäftsführer und Marketingverantwortliche, um typische Branchenfallen wie lange Knebelverträge, fehlende Nutzungsrechte oder gemietete Links sofort zu erkennen. Bei größeren Vertragssummen empfiehlt sich immer eine abschließende Prüfung durch eine Rechtsanwaltskanzlei.',
      },
      {
        question: 'Warum warnen selbst Google-Dokumente vor garantierten Platz-1-Versprechen im Vertrag?',
        answer: 'Google stellt im Leitfaden zur Auswahl von SEO-Dienstleistern klar, dass niemand eine Spitzenplatzierung garantieren kann. Anbieter mit „Platz-1-Garantie“ sichern sich im Kleingedruckten fast immer über völlig irrelevante Suchbegriffe ohne Nachfrage ab.',
      },
      {
        question: 'Dürfen Agenturen aufgebaute Backlinks nach einer Kündigung wieder entfernen?',
        answer: 'Wenn Sie in den AGB einem Modell aus „gemieteten Werbeplätzen auf Partnerportalen“ zustimmen, schalten manche Anbieter diese Verweise mit dem letzten Vertragstag ab. Achten Sie deshalb ausdrücklich auf redaktionelle Drittquellen und eine Klausel, die das nachträgliche Entfernen bezahlter Verlinkungen ausschließt.',
      },
      {
        question: 'Wann ist ein Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO erforderlich?',
        answer: 'Immer dann, wenn der Dienstleister Zugriff auf personenbezogene Daten Ihrer Kunden oder Interessenten erhält - etwa über einen Admin-Zugang zu WordPress-Formularen, Bestelldaten in WooCommerce oder Shopify sowie CRM-Systeme.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Pakete', opis: 'unsere transparenten Monatspakete ab 450 € netto ohne Jahresbindung' },
      { href: '/porownania/agencja-seo-czy-freelancer', tekst: 'SEO Agentur oder Freelancer', opis: 'Vergleich von Kosten, Ausfallsicherheit und Vertragsregeln' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste (50 Punkte)', opis: 'fachliche Prüfung von Technik, On-Page SEO und KI-Tauglichkeit' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'einmalige Tiefenanalyse in 3 bis 5 Werktagen ohne laufendes Abo' },
    ],
    plikNazwa: 'SEO Vertrag Checkliste: 12 Klauseln & Prüfbogen (PDF)',
  },
};

export default SZABLON_UMOWA_DE;
