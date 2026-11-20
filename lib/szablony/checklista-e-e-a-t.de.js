// Szablon „E-E-A-T Checkliste” (Faza 2 DE, 19.11.2026): niemiecki blok `de` dla lib/szablony/checklista-e-e-a-t.js
// (PL /narzedzia/checklista-e-e-a-t, EN /en/tools/e-e-a-t-checklist, DE /de/tools/e-e-a-t-checkliste).
// Treść napisana od zera po niemiecku pod frazę „e-e-a-t” / „e-e-a-t checkliste” (1 000/mies. DE).
// 36 Prüfpunkte in 5 Bereichen + Schritt 0 (YMYL-Einstufung) gemäß Google Search Quality Rater Guidelines & Search Central.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und auf Menschen ausgerichtete Inhalte erstellen (Selbsttest & E-E-A-T)', data: '2026-11-11' },
  { url: 'https://services.google.com/fh/files/misc/hsw-sqrg.pdf', nazwa: 'Google: Search Quality Evaluator Guidelines (E-E-A-T, Vertrauen im Zentrum und YMYL-Kriterien, PDF)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t', nazwa: 'Google Search Central Blog: Unser Update zu E-E-A-T - das zusätzliche E steht für Erfahrung', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/blog/2023/02/google-search-and-ai-content', nazwa: 'Google Search Central Blog: Google Suche und KI-generierte Inhalte', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/profile-page', nazwa: 'Google Search Central: Strukturierte Daten für ProfilePage und Person', data: '2026-11-11' },
];

export const OBSZARY_EEAT_DE = [
  {
    id: 'A',
    tytul: 'A. Vertrauen und Anbietertransparenz (Basis)',
    punkty: [
      ['A1', 'Vollständiges Impressum (§ 5 DDG) und Datenschutzerklärung sind von jeder Seite mit einem Klick erreichbar.', 'hoch'],
      ['A2', 'Reale Geschäftsadresse, Telefonnummer, E-Mail und Handelsregisterdaten stimmen auf Website und Unternehmensprofil überein.', 'hoch'],
      ['A3', 'Durchgängiges HTTPS ohne gemischte Inhalte (Mixed Content) und ohne irreführende Werbe-Überlagerungen.', 'hoch'],
      ['A4', 'Über-uns-Seite zeigt das echte Unternehmen, Verantwortliche, Standort und Arbeitsweise statt anonymer Floskeln.', 'hoch'],
      ['A5', 'Klare Leistungsbeschreibungen, Preise oder nachvollziehbare Preisspannen sowie transparente Vertragsbedingungen.', 'mittel'],
      ['A6', 'Sichtbares Korrektur- und Redaktionsprinzip: Wie werden Zahlen geprüft und Fehler berichtigt?', 'niedrig'],
      ['A7', 'Offenlegung von Interessenkonflikten, Partnerschaften oder Provisionslinks (falls vorhanden).', 'hoch'],
      ['A8', 'Bei Shops oder kostenpflichtigen Buchungen: klare Zahlungs-, Widerrufs- und Reklamationswege.', 'hoch'],
    ],
  },
  {
    id: 'B',
    tytul: 'B. Autorinnen, Autoren und Fachprüfung',
    punkty: [
      ['B1', 'Ratgeber, Studien und Fachbeiträge nennen eine reale Person als Verfasserin oder Verfasser (Byline).', 'hoch'],
      ['B2', 'Kurzbiografie erklärt die konkrete berufliche Praxis im Thema (nicht nur „Redaktion“ oder „Content-Team“).', 'mittel'],
      ['B3', 'Eigene Autorenseite oder Teamprofil bündelt Qualifikation, Rolle im Unternehmen und verfasste Beiträge.', 'mittel'],
      ['B4', 'Links zu überprüfbaren Profilen (z. B. LinkedIn, Fachverbände, Vorträge oder Fachpublikationen).', 'niedrig'],
      ['B5', 'Veröffentlichungsdatum und Datum der letzten echten inhaltlichen Aktualisierung sind sichtbar.', 'mittel'],
      ['B6', 'Bei YMYL-Themen (Medizin, Recht, Steuern, Finanzen): namentliche Fachprüfung durch qualifizierte Experten.', 'hoch'],
      ['B7', 'Kein erfundener Autorenname und kein KI-generiertes Porträtfoto.', 'hoch'],
    ],
  },
  {
    id: 'C',
    tytul: 'C. Erfahrung aus erster Hand und Substanz im Inhalt',
    punkty: [
      ['C1', 'Eigene Daten, Messreihen, Stichproben oder dokumentierte Kundenprojekte statt bloßer Zusammenfassung der Top 10.', 'hoch'],
      ['C2', 'Jede Zahl, Studie und Behauptung nennt Primärquelle und Abrufdatum.', 'hoch'],
      ['C3', 'Eigene Screenshots, Fotos aus Projekten, Diagramme oder Vorlagen statt generischer Stockbilder.', 'mittel'],
      ['C4', 'Grenzen und Risiken werden ehrlich benannt (wann eine Methode nicht passt, welche Unsicherheiten bestehen).', 'mittel'],
      ['C5', 'Präzise Antwort direkt am Seitenanfang ohne künstliches Strecken auf eine bestimmte Wortzahl.', 'mittel'],
      ['C6', 'Technisch korrekte Aussagen - keine veralteten Mythen oder unbelegten Heilsversprechen.', 'hoch'],
      ['C7', 'Beim Einsatz von KI-Werkzeugen: menschliche Faktenprüfung aller Zahlen, Zitate, Titel und Alt-Texte.', 'hoch'],
      ['C8', 'Regelmäßige Überprüfung älterer Beiträge: veraltete Preise, Gesetze oder Screenshots werden ersetzt.', 'mittel'],
    ],
  },
  {
    id: 'D',
    tytul: 'D. Externe Reputation und unabhängige Signale',
    punkty: [
      ['D1', 'Echte Kundenbewertungen im Google Unternehmensprofil und auf Branchenplattformen - ohne gekaufte Rezensionen.', 'hoch'],
      ['D2', 'Sachliche Antworten auf positive wie kritische Bewertungen.', 'mittel'],
      ['D3', 'Erwähnungen oder Fachbeiträge in Branchenmedien, Verbänden, Podcasts oder Partnerseiten.', 'mittel'],
      ['D4', 'Konsistente Unternehmensdaten (NAP) in relevanten Fachverzeichnissen.', 'mittel'],
      ['D5', 'Markensuche bei Google („Firmenname -site:eigenedomain.de“) zeigt ein stimmiges, seriöses Bild.', 'mittel'],
      ['D6', 'Verweise von thematisch passenden Domains auf eigene Studien, kostenlose Tools oder Leitfäden.', 'mittel'],
      ['D7', 'Nachvollziehbare Fallstudien mit Ausgangslage, Vorgehen und Messzeitraum.', 'mittel'],
    ],
  },
  {
    id: 'E',
    tytul: 'E. Technik und strukturierte Daten als Stütze',
    punkty: [
      ['E1', 'Strukturierte Daten vom Typ Organization oder LocalBusiness auf der Startseite mit korrekten Pflichtfeldern.', 'mittel'],
      ['E2', 'Article-Markup mit Verweis auf Person (Autor) und korrektem datePublished / dateModified.', 'mittel'],
      ['E3', 'sameAs-Verweise verbinden Unternehmen und Autoren mit offiziellen externen Profilen.', 'niedrig'],
      ['E4', 'Kein selbstreferenzielles Sterne-Markup (aggregateRating) für eigene Bewertungen auf der eigenen Firmenwebsite.', 'hoch'],
      ['E5', 'Saubere Überschriftenhierarchie, funktionierende ausgehende Quellenlinks (keine 404-Zitate).', 'mittel'],
      ['E6', 'Gute Nutzbarkeit auf Mobilgeräten und stabile Seiten Darstellung (Core Web Vitals).', 'mittel'],
    ],
  },
];

const podgladHtml = () =>
  OBSZARY_EEAT_DE.map(
    (o) =>
      `<h3>${o.tytul}</h3><table><thead><tr><th>Nr.</th><th>Prüfpunkt</th><th>Priorität</th><th>Status</th></tr></thead><tbody>` +
      o.punkty.map(([nr, t, p]) => `<tr><td>${nr}</td><td>${t}</td><td>${p}</td><td>☐ OK ☐ Offen ☐ n. z.</td></tr>`).join('') +
      '</tbody></table>',
  ).join('');

const SZABLON_EEAT_DE = {
  seo: {
    tytul: 'E-E-A-T Checkliste 2026: 36 Punkte als PDF-Vorlage',
    opis: 'Kostenlose E-E-A-T Checkliste als PDF: 36 Prüfpunkte zu Vertrauen, Autoren, Inhalten, Reputation und Schema.org plus YMYL-Einstufung und Maßnahmenplan.',
  },
  de: {
    okruszek: 'E-E-A-T Checkliste',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'E-E-A-T Checkliste: Erfahrung, Expertise und Vertrauen prüfen',
    lead: 'E-E-A-T steht für Experience (Erfahrung), Expertise (Fachwissen), Authoritativeness (Autorität) und Trustworthiness (Vertrauenswürdigkeit) - das Rahmenwerk aus Googles Search Quality Rater Guidelines. Es ist kein einzelner Schalter im Algorithmus, sondern beschreibt die Signale, an denen Menschen und Suchsysteme verlässliche Websites erkennen. Unsere kostenlose E-E-A-T Checkliste übersetzt die Richtlinien in 36 konkrete Prüfpunkte mit YMYL-Einstufung und Maßnahmenplan als PDF.',
    karta: {
      nazwa: 'E-E-A-T Checkliste: 36 Punkte (PDF)',
      opis: 'Schritt 0 (YMYL-Prüfung), 36 Prüfpunkte in 5 Bereichen, Reputations-Tabelle und priorisierter Maßnahmenplan.',
      cta: 'Checkliste herunterladen',
    },
    sekcje: [
      {
        id: 'was-bedeutet-eeat',
        h2: 'Was bedeutet E-E-A-T bei Google - und warum steht Vertrauen im Zentrum?',
        html: [
          '<p>Ende 2022 erweiterte Google das bekannte Konzept E-A-T um ein zweites „E“ für <strong>Experience (Erfahrung aus erster Hand)</strong>. In den Search Quality Evaluator Guidelines bildet <strong>Trust (Vertrauen)</strong> ausdrücklich das Zentrum: Eine Seite kann noch so fachkundig klingen - fehlen nachvollziehbare Anbieterangaben, ehrliche Quellen oder echte Projekterfahrung, gilt sie als nicht vertrauenswürdig.</p>',
          '<p>Wichtig für die Einordnung: E-E-A-T ist kein direkter numerischer Rankingfaktor wie ein einzelner Score. Googles Ranking-Systeme nutzen jedoch eine Vielzahl konkreter Signale, die mit menschlichen Vertrauensmerkmalen übereinstimmen. Besonders streng gewichtet Google diese Signale bei <strong>YMYL-Themen („Your Money or Your Life“)</strong> - also Inhalten zu Gesundheit, Medizin, Recht, Steuern, Geldanlage oder Sicherheit, bei denen falsche Informationen realen Schaden anrichten können.</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-vier-saeulen',
          caption: 'Die vier Bausteine von E-E-A-T und wie Sie sie auf einer Unternehmenswebsite zeigen',
          columns: [
            { key: 'baustein', label: 'Baustein' },
            { key: 'bedeutung', label: 'Frage dahinter' },
            { key: 'nachweis', label: 'Sichtbarer Nachweis auf der Website' },
          ],
          rows: [
            { baustein: 'Experience (Erfahrung)', bedeutung: 'Hat die Person oder Firma das Thema selbst in der Praxis durchgeführt?', nachweis: 'Eigene Messreihen, echte Projektfotos, konkrete Fallbeispiele, Grenzen aus dem Alltag' },
            { baustein: 'Expertise (Fachwissen)', bedeutung: 'Verfügt der Verfasser über das nötige Fachwissen?', nachweis: 'Fehlerfreie Tiefe, Primärquellen, Autorenprofil mit Ausbildung und Berufspraxis, Fachprüfung bei YMYL' },
            { baustein: 'Authoritativeness (Autorität)', bedeutung: 'Wird das Unternehmen extern als verlässliche Adresse wahrgenommen?', nachweis: 'Erwähnungen und Links aus Fachmedien, Verbänden, Studien und seriösen Branchenverzeichnissen' },
            { baustein: 'Trustworthiness (Vertrauen)', bedeutung: 'Ist die Website sicher, transparent und ehrlich?', nachweis: 'Impressum nach § 5 DDG, echte Kontaktdaten, HTTPS, klare Preise, unverfälschte Bewertungen' },
          ],
        },
      },
      {
        id: 'ymyl-schritt-null',
        h2: 'Schritt 0 der Vorlage: Ist Ihr Thema YMYL?',
        html: [
          '<p>Bevor Sie alle 36 Punkte gleich behandeln, stufen Sie Ihre wichtigsten Seitengruppen im PDF kurz ein:</p>',
          '<ul>',
          '<li><strong>Klares YMYL:</strong> Medizinische Leistungen, Rechts- und Steuerberatung, Finanzprodukte, Versicherungen, sicherheitskritische Technik. Hier sind namentliche Fachprüfung (B6), Primärquellen mit Datum (C2) und makellose Anbietertransparenz (Bereich A) Pflicht.</li>',
          '<li><strong>Teilweise YMYL (hohe Investitionen):</strong> B2B-Software, Bau- und Sanierungsprojekte, teure Unternehmensdienstleistungen. Fehlentscheidungen kosten viel Geld - transparente Preise, echte Referenzen und ehrliche Abgrenzungen geben hier den Ausschlag.</li>',
          '<li><strong>Kein YMYL:</strong> Alltagsleistungen ohne Gesundheits- oder Finanzrisiko. Konzentrieren Sie sich zuerst auf Bereich A (echtes Unternehmen, klare Leistung) und Bereich C (eigene Praxisbeispiele statt Textkopien).</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'fuenf-bereiche',
        h2: 'Die 5 Prüfbereiche der E-E-A-T Checkliste im Überblick',
        html: [
          '<p>Die 36 Prüfpunkte decken alle Ebenen ab, die Sie selbst steuern oder gezielt aufbauen können:</p>',
          '<ol>',
          '<li><strong>Anbietertransparenz & Basisvertrauen (8 Punkte):</strong> Impressum, Datenschutz, übereinstimmende Kontaktdaten, echte Über-uns-Seite, transparente Konditionen.</li>',
          '<li><strong>Autoren & Fachprüfung (7 Punkte):</strong> Reale Verfasser unter Ratgebern, aussagekräftige Kurzbiografien, sichtbare Aktualisierungsdaten und Expertenprüfung bei YMYL.</li>',
          '<li><strong>Erfahrung & Inhaltssubstanz (8 Punkte):</strong> Eigene Erhebungen statt umgeschriebener Konkurrenztexte, belegte Quellen, eigene Screenshots und menschliche Prüfung bei KI-Einsatz.</li>',
          '<li><strong>Externe Reputation (7 Punkte):</strong> Unabhängige Bewertungen, Fachmedien, konsistente Verzeichniseinträge und ein sauberer Eindruck bei Markensuchen.</li>',
          '<li><strong>Technik & Schema.org (6 Punkte):</strong> Saubere Auszeichnung von <code>Organization</code>, <code>Person</code> und <code>Article</code> (Vorlagen dazu finden Sie unter <a href="/de/tools/schema-markup-beispiele">Schema Markup Beispiele</a>) sowie funktionierende Quellenlinks, die auch unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a> auf 404-Fehler prüft.</li>',
          '</ol>',
        ].join(''),
      },
      {
        id: 'typische-irrtuemer',
        h2: 'Was E-E-A-T schadet statt hilft',
        html: [
          '<ul>',
          '<li><strong>Erfundene Autorenboxen.</strong> Ein fiktiver Name oder ein KI-Porträtfoto unter einem Ratgeber zerstört genau das Vertrauen, das die Box aufbauen soll.</li>',
          '<li><strong>Datum ändern ohne inhaltliches Update.</strong> Nur das Tagesdatum im Artikelkopf hochzusetzen, nennt Google ausdrücklich als schlechte Praxis für suchmaschinenorientierte Inhalte.</li>',
          '<li><strong>Gekaufte oder belohnte Bewertungen.</strong> Rabatte gegen 5 Sterne verstoßen gegen Googles Richtlinien und führen zu Löschungen oder Profilsperren.</li>',
          '<li><strong>Massenhaft generierte Seiten ohne Mehrwert.</strong> Hunderte fast identische Unterseiten ohne eigene Daten fallen unter Googles Spam-Richtlinie gegen „Scaled Content Abuse“ - unabhängig davon, ob KI oder Menschen sie erstellt haben.</li>',
          '</ul>',
          '<p>Wenn Sie nach einem Rankingverlust eine unabhängige Gesamtdiagnose aus Technik, Inhalten und Backlink-Profil wünschen, unterstützen wir Sie im Rahmen unseres <a href="/de/seo-audit">SEO Audits</a> sowie bei der laufenden Arbeit an <a href="/de/ki-suchoptimierung">KI-Sichtbarkeit und GEO</a>.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau: Alle 36 Prüfpunkte der E-E-A-T Checkliste',
      opis: 'Im PDF enthält jede Zeile zusätzlich Spalten für die geprüfte URL, konkrete Befunde, die verantwortliche Person und die Frist.',
      html: podgladHtml(),
    },
    formularz: {
      h2: 'E-E-A-T Checkliste herunterladen (PDF)',
      opis: 'Laden Sie die vollständige E-E-A-T Checkliste als druckfertiges PDF herunter: YMYL-Schnelltest, 36 Prüfpunkte in 5 Bereichen, Reputations-Tabelle und Maßnahmenplan.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Checkliste als PDF senden',
      przedmiot: 'die E-E-A-T Checkliste (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur E-E-A-T Checkliste kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Wofür steht die Abkürzung E-E-A-T?',
        answer: 'E-E-A-T steht für Experience (Erfahrung), Expertise (Fachwissen), Authoritativeness (Autorität) und Trustworthiness (Vertrauenswürdigkeit). Google beschreibt damit in seinen Search Quality Evaluator Guidelines die Merkmale verlässlicher, hilfreicher Inhalte, wobei Vertrauen im Mittelpunkt steht.',
      },
      {
        question: 'Ist E-E-A-T ein direkter Rankingfaktor bei Google?',
        answer: 'Nicht als einzelner Punktwert. Google erklärt, dass E-E-A-T selbst kein isolierter technischer Faktor ist, die automatisierten Ranking-Systeme aber viele Signale auswerten, die Erfahrung, Fachwissen, Autorität und Vertrauen widerspiegeln - besonders stark bei YMYL-Themen.',
      },
      {
        question: 'Schadet KI-unterstützter Text meinem E-E-A-T?',
        answer: 'Nicht allein durch den Einsatz von KI. Google bewertet die Qualität des Ergebnisses, nicht das Werkzeug: Entscheidend ist, ob der Text fachlich geprüft wurde, eigene Erfahrungen oder Daten einbringt und keinen massenhaft erzeugten Spam ohne Mehrwert darstellt.',
      },
      {
        question: 'Braucht jede Leistungsseite eines KMU eine persönliche Autorenbox?',
        answer: 'Nein. Auf Leistungsseiten, Preisübersichten und Kontaktseiten steht das Unternehmen als Absender; dort zählen Impressum, Referenzen und klare Konditionen (Bereich A). Eine persönliche Autorenzeile ist vor allem unter Ratgebern, Studien und Fachartikeln sinnvoll.',
      },
      {
        question: 'Hilft E-E-A-T auch für Nennungen in ChatGPT und Google AI Overviews?',
        answer: 'Eine Garantie gibt es nicht, aber die Signale überschneiden sich stark: Klare Anbieterangaben, nachvollziehbare Zahlen mit Primärquellen und externe Erwähnungen in Fachmedien und Verzeichnissen erleichtern es sowohl Suchmaschinen als auch KI-Systemen, Ihr Unternehmen einzuordnen.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Schema Markup Beispiele', opis: '7 JSON-LD Vorlagen für Organization, Person, ProfilePage und Article' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste', opis: '50 Prüfpunkte für Technik, On-Page SEO und Messung' },
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft HTTPS, kaputte ausgehende Quellenlinks und JSON-LD auf Ihrer Website' },
      { href: '/narzedzia/autorytet-domeny', tekst: 'Domain Authority Checker', opis: 'misst die Verankerung Ihrer Domain im öffentlichen Link-Graphen' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'persönliche Analyse von Technik, Content-Qualität und Linkprofil' },
    ],
    plikNazwa: 'E-E-A-T Checkliste: 36 Prüfpunkte (PDF)',
  },
};

export default SZABLON_EEAT_DE;
