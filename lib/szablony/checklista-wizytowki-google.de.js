// Szablon „Google Unternehmensprofil Checkliste” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/checklista-wizytowki-google.js (/de/tools/google-unternehmensprofil-checkliste).
// PDF: public/pliki/de/google-unternehmensprofil-checkliste.pdf.
// Koordynacja ohne Kannibalisierung mit /de/google-unternehmensprofil-optimieren (/pozycjonowanie-wizytowki-google):
// diese Vorlage deckt das strukturierte Anlegen, Verifizieren und Prüfen in 40 Punkten ab und verweist für
// die laufende Dienstleistung und 49-Punkte-Kartenraster-Messung auf die Leistungsseite.

const ZRODLA = [
  { url: 'https://support.google.com/business/answer/2911778', nazwa: 'Google Unternehmensprofil-Hilfe: Unternehmensprofil hinzufügen oder Anspruch darauf erheben', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/7107242', nazwa: 'Google Unternehmensprofil-Hilfe: Unternehmen auf Google bestätigen (Video, Telefon, E-Mail, Postkarte)', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/3038177', nazwa: 'Google Unternehmensprofil-Hilfe: Richtlinien zur Darstellung Ihres Unternehmens auf Google', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/9157481', nazwa: 'Google Unternehmensprofil-Hilfe: Einzugsgebiete für Dienstleistungs- und Hybrid-Unternehmen verwalten', data: '2026-11-11' },
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Google Unternehmensprofil-Hilfe: Lokales Ranking auf Google verbessern (Relevanz, Entfernung, Bekanntheit)', data: '2026-11-11' },
  { url: 'https://support.google.com/contributionpolicy/answer/7400114', nazwa: 'Google Maps Richtlinien für nutzergenerierte Inhalte: Verbot gekaufter oder belohnter Rezensionen', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: Strukturierte Daten vom Typ LocalBusiness', data: '2026-11-11' },
];

export const OBSZARY_GBP_DE = [
  {
    id: 'A',
    tytul: 'A. Vorbereitung & Berechtigung vor dem Anlegen (8 Punkte)',
    opis: 'Grundentscheidungen, die nach der Verifizierung nur schwer korrigierbar sind: Berechtigung, Kontoeigentum, exakter Firmenname und Hauptkategorie.',
    punkty: [
      ['A1', 'Berechtigung prüfen: persönlicher Kundenkontakt vor Ort oder beim Kunden im Außendienst', 'Reine Online-Shops, Briefkastenfirmen und virtuelle Büros ohne eigenes Personal vor Ort sind laut Google-Richtlinien nicht berechtigt.', 'Hoch'],
      ['A2', 'Profil über ein firmeneigenes Google-Konto anlegen (niemals über Privat- oder Agenturkonten)', 'Nutzen Sie eine geschäftliche E-Mail-Adresse Ihres Unternehmens. Externe Dienstleister erhalten später ausschließlich die Rolle „Manager“.', 'Hoch'],
      ['A3', 'Dubletten-Check in Google Maps vor der Neuanlage durchführen', 'Suchen Sie nach Firmenname und Ort. Existiert bereits ein Eintrag, übernehmen Sie ihn per „Anspruch auf dieses Unternehmen erheben“ oder Eigentümeranfrage (3 Tage Frist).', 'Hoch'],
      ['A4', 'Exakten Unternehmensnamen gemäß Firmenschild, Impressum und Rechnungen festlegen', 'Keine zusätzlichen Keywords, Städtenamen, Slogans oder Telefonnummern im Namen eintragen - Keyword-Zusätze sind der häufigste Grund für Profilsperren.', 'Hoch'],
      ['A5', 'Passenden Unternehmenstyp wählen: Ladengeschäft, Einzugsgebiet oder Hybrid-Betrieb', 'Wer Kunden ausschließlich vor Ort bei ihnen bedient (z. B. Handwerk von zu Hause), blendet die eigene Privatadresse aus und pflegt nur das Einzugsgebiet.', 'Hoch'],
      ['A6', 'Einheitliches NAP-Stammdatenblatt (Name, Anschrift, Telefon) verbindlich dokumentieren', 'Definieren Sie exakt eine Schreibweise für Straße, Hausnummer, Postleitzahl und lokale Rufnummer für Website, Impressum und Branchenportale.', 'Hoch'],
      ['A7', 'Präziseste Hauptkategorie anhand der Top-3-Wettbewerber in Google Maps bestimmen', 'Die Hauptkategorie beschreibt, was das Unternehmen IST (nicht was es anbietet). Ergänzen Sie Neben-Kategorien sparsam und nur für reale Kernleistungen.', 'Hoch'],
      ['A8', 'Unternehmenswebsite vorab in der Google Search Console verifizieren', 'Ist dieselbe Domain unter demselben Google-Konto bereits in der Search Console bestätigt, beschleunigt das bei vielen Profilen die Bestätigung.', 'Niedrig'],
    ],
  },
  {
    id: 'B',
    tytul: 'B. Eintrag anlegen & Verifizierung bestehen (7 Punkte)',
    opis: 'Ohne abgeschlossene Bestätigung erscheinen Änderungen, Fotos und Antworten auf Rezensionen nicht öffentlich in der Google-Suche und in Maps.',
    punkty: [
      ['B1', 'Unternehmen kostenfrei unter business.google.com/add eintragen oder bestehenden Eintrag beanspruchen', 'Das Anlegen und Bestätigen eines Google Unternehmensprofils ist dauerhaft kostenlos.', 'Hoch'],
      ['B2', 'Karten-Pin im Satellitenbild exakt auf den realen Gebäudeeingang prüfen', 'Zusatzangaben wie Etage, Hof oder Gebäudeteil gehören in Adresszeile 2. Nach einem Standortumzug verlangt Google eine erneute Bestätigung.', 'Hoch'],
      ['B3', 'Angebotene Verifizierungsmethode auswählen und Unterlagen bereitlegen', 'Google gibt das Verfahren automatisch vor (Videoaufnahme, Live-Videoanruf, Telefon/SMS, E-Mail oder Postkarte); eine freie Auswahl besteht meist nicht.', 'Hoch'],
      ['B4', 'Für die Video-Verifizierung drei Beweise in einer ungeschnittenen Aufnahme zeigen', '1) Straßenschild & Nachbargebäude (Außenansicht), 2) fest angebrachtes Firmenschild am Eingang, 3) Aufschließen der Geschäftsräume, Kasse oder Arbeitsmittel.', 'Hoch'],
      ['B5', 'Während laufender Postkarten- oder Videoprüfung keine Stammdaten mehr ändern', 'Ändern Sie weder Name noch Adresse oder Kategorie und fordern Sie keinen zweiten Code an, sonst wird der laufende Vorgang sofort ungültig (Postkarte: ca. 14 Tage).', 'Hoch'],
      ['B6', 'Bestätigungscode vertraulich behandeln und Telefonanrufe persönlich entgegennehmen', 'Geben Sie den 5-stelligen Code nicht an unbekannte Anrufer weiter. Automatische Telefonanlagen (IVR) blockieren Sprach-Codes von Google.', 'Mittel'],
      ['B7', 'Nach Bestätigung zweiten Inhaber im Betrieb hinterlegen und Rollen prüfen', 'Google prüft Einreichungen meist binnen 5 Werktagen. Fügen Sie eine zweite Firmenadresse als Inhaber hinzu, damit kein Einzelkonto zum Flaschenhals wird.', 'Mittel'],
    ],
  },
  {
    id: 'C',
    tytul: 'C. Profil nach der Verifizierung vollständig ausfüllen (8 Punkte)',
    opis: 'Unternehmen mit lückenlosen, aktuellen Angaben werden laut Google-Hilfe deutlich leichter passenden lokalen Suchanfragen zugeordnet.',
    punkty: [
      ['C1', 'Unternehmensbeschreibung (bis 750 Zeichen) klar und ohne Werbeversprechen formulieren', 'Beschreiben Sie Leistungen, Zielgruppe, Einzugsgebiet und Erfahrung. Keine URLs, kein HTML, keine Preisaktionen und keine reinen Keyword-Aufzählungen.', 'Mittel'],
      ['C2', 'Reguläre Öffnungszeiten und spezielle Feiertagszeiten hinterlegen', 'Pflegen Sie gesetzliche Feiertage (auch bundesland- oder kantonsabhängig), Betriebsferien und Brückentage rechtzeitig über „Spezielle Öffnungszeiten“.', 'Hoch'],
      ['C3', 'Lokale Rufnummer und HTTPS-Zielseite ohne Weiterleitungsketten eintragen', 'Verwenden Sie eine direkt erreichbare Nummer des Standorts (keine Mehrwertnummer) und eine indexierbare HTTPS-Seite, auf der Googlebot nicht gesperrt ist.', 'Hoch'],
      ['C4', 'Einzugsgebiet über konkrete Städte, Landkreise oder Postleitzahlen definieren', 'Maximal 20 Gebiete im Umkreis von rund 2 Fahrstunden. Ein pauschaler Kilometer-Radius wird von Google nicht mehr unterstützt.', 'Mittel'],
      ['C5', 'Leistungen (oder Produkte / Speisekarte) einzeln mit verständlicher Kurzbeschreibung anlegen', 'Gliedern Sie jede angebotene Dienstleistung unter der passenden Kategorie statt nur pauschale Oberbegriffe stehenzulassen.', 'Hoch'],
      ['C6', 'Eigene Fotos hochladen: Logo, Titelbild, Außenansicht, Innenräume, Team und Arbeitsproben', 'Format JPG oder PNG, 10 KB bis 5 MB, empfohlen 720 x 720 px (mind. 250 x 250 px), scharf und ohne künstliche Werbetext-Overlays; Videos bis 30 s / 75 MB.', 'Mittel'],
      ['C7', 'Zutreffende Attribute, Eröffnungsdatum (Monat/Jahr) und Social-Media-Profile ergänzen', 'Barrierefreiheit, Parkplätze, Zahlungsarten, Terminpflicht sowie je ein offizieller Link zu LinkedIn, Instagram, YouTube oder Facebook.', 'Niedrig'],
      ['C8', 'Vollständigkeits-Abgleich mit den aktuellen Top 3 im lokalen Google-Maps-Paket', 'Prüfen Sie für Ihr wichtigstes Leistungs-Keyword Anzahl der Kategorien, Leistungsbeschreibungen, Fotos und Rezensionen der drei bestplatzierten Anbieter.', 'Mittel'],
    ],
  },
  {
    id: 'D',
    tytul: 'D. Kundenbewertungen & Beiträge als fester Prozess (6 Punkte)',
    opis: 'Kontinuierliche echte Rezensionen und Antworten stärken die lokale Bekanntheit in Google Maps und in KI-Empfehlungen.',
    punkty: [
      ['D1', 'Direkten Google-Bewertungslink und druckfertigen QR-Code im Alltag einsetzen', 'Senden Sie den Kurzlink direkt nach Projektabschluss per E-Mail oder Rechnung mit QR-Code.', 'Hoch'],
      ['D2', 'Alle Kundinnen und Kunden fair um Feedback bitten - ohne Rabatte oder Geschenke', 'Gutscheine, Gewinnspiele, Preisnachlässe oder das Vorfiltern nur zufriedener Kunden („Review Gating“) verstoßen gegen Googles Richtlinien.', 'Hoch'],
      ['D3', 'Jede Bewertung innerhalb von 48 Stunden sachlich beantworten (auch kritische)', 'Kurz, höflich, lösungsorientiert und ohne interne Kundendaten (DSGVO). 48 Stunden sind unser bewährter Agenturstandard.', 'Mittel'],
      ['D4', 'Richtlinienwidrige Fake- oder Spam-Rezensionen im Profil melden statt Rabatte anzubieten', 'Nutzen Sie das offizielle Melde-Tool für Bewertungen bei Beleidigungen, Interessenkonflikten oder nachweislich fremden Personen.', 'Niedrig'],
      ['D5', 'Mindestens zwei aktuelle Beiträge (Neuigkeiten, Angebote, Veranstaltungen) pro Monat veröffentlichen', 'Jeder Beitrag erhält ein echtes Foto und einen Call-to-Action-Button zur passenden Leistungsseite (unser Praxisstandard für aktive Profile).', 'Mittel'],
      ['D6', 'Monatlich frische Projekt-, Werkstatt- oder Standortfotos ergänzen', 'Regelmäßige echte Aufnahmen zeigen Interessenten den aktuellen Stand Ihres Betriebs.', 'Niedrig'],
    ],
  },
  {
    id: 'E',
    tytul: 'E. NAP-Konsistenz, Standortseiten & Schema.org (6 Punkte)',
    opis: 'Widersprüchliche Adressen oder Telefonnummern zwischen Website, Impressum und Verzeichnissen kosten Vertrauen.',
    punkty: [
      ['E1', 'NAP-Daten im Footer, auf der Kontaktseite und im Impressum als echten HTML-Text abgleichen', 'Name, Straße, PLZ, Ort und Telefonnummer müssen zeichengenau mit dem Unternehmensprofil übereinstimmen (keine reinen Bildgrafiken).', 'Hoch'],
      ['E2', 'Je realem Standort eine eigene Unterseite mit individuellem Inhalt bereitstellen', 'Mit Anfahrt, Ansprechpartnern, Öffnungszeiten, Team und lokalen Referenzen - keine kopierten Stadtseiten mit ausgetauschtem Ortsnamen.', 'Mittel'],
      ['E3', 'Website-Link im Unternehmensprofil mit sauberem UTM-Parameter versehen', 'Zum Beispiel ?utm_source=google&utm_medium=organic&utm_campaign=gbp, um Profil-Klicks in GA4 und Search Console getrennt auszuwerten.', 'Niedrig'],
      ['E4', 'Strukturierte Daten (LocalBusiness JSON-LD) synchron zum sichtbaren Seitentext pflegen', 'Identische Anschrift, Telefonnummer, Geo-Koordinaten und Öffnungszeiten im JSON-LD hinterlegen und im Rich-Results-Test prüfen.', 'Mittel'],
      ['E5', 'Wichtige Karten- und Branchenverzeichnisse auf denselben NAP-Stand bringen', 'Apple Business Connect, Bing Places, Gelbe Seiten, Das Örtliche, 11880, herold.at, local.ch sowie relevante Kammer- und Fachportale prüfen.', 'Mittel'],
      ['E6', 'Bei Umzug, Umfirmierung oder neuer Rufnummer alle Einträge an einem festen Stichtag aktualisieren', 'Reihenfolge: zuerst Google Unternehmensprofil (inkl. Neu-Bestätigung), dann Website & JSON-LD, danach alle externen Verzeichnisse laut NAP-Liste.', 'Mittel'],
    ],
  },
  {
    id: 'F',
    tytul: 'F. Erfolgsmessung, KI-Sichtbarkeit & Quartals-Check (5 Punkte)',
    opis: 'Nur dokumentierte Zahlen zeigen, ob Sichtbarkeit, Anrufe und Routenanfragen tatsächlich wachsen.',
    punkty: [
      ['F1', 'Monatlich Leistungsdaten aus dem Unternehmensprofil sichern', 'Sichtkontakte in Suche & Maps, Anrufe, Routenanfragen und Website-Klicks im Monatsprotokoll festhalten und mit dem Vorjahresmonat vergleichen.', 'Mittel'],
      ['F2', 'Lokale Maps-Positionen aus mehreren Stadtteilen bzw. Orten statt nur aus dem eigenen Büro prüfen', 'Da Google die Entfernung des Suchenden stark gewichtet, täuscht eine einzelne Abfrage am eigenen Schreibtisch oft zu gute Platzierungen vor.', 'Mittel'],
      ['F3', 'Automatische Änderungsvorschläge von Google oder Dritten regelmäßig kontrollieren', 'Öffnungszeiten, Attribute oder Telefonnummern können durch Nutzer-Feedback überschrieben werden - monatlich im Dashboard gegenprüfen.', 'Mittel'],
      ['F4', 'Monatlich testen, ob ChatGPT, Gemini und Perplexity Ihren Standort bei lokalen Fragen nennen', 'Stellen Sie 3 bis 5 typische Kundenfragen mit Ortsbezug und prüfen Sie, ob Ihr Unternehmen empfohlen und korrekt verlinkt wird.', 'Mittel'],
      ['F5', 'Einmal pro Quartal vollständigen Rechte- und Aktualitäts-Check durchführen', 'Ehemalige Mitarbeitende oder alte Agenturen aus der Nutzerverwaltung entfernen, Feiertage des nächsten Quartals eintragen und Leistungskatalog prüfen.', 'Mittel'],
    ],
  },
];

function pogrubPunkt(nr, punkt) {
  const caly = `${nr}. ${punkt}:`;
  if (caly.length <= 72) return `<strong>${caly}</strong>`;
  const ciecie = caly.lastIndexOf(' ', 70);
  if (ciecie <= nr.length + 2) return `<strong>${nr}.</strong> <span class="sz-chk-punkt">${punkt}:</span>`;
  return `<strong>${caly.slice(0, ciecie)}</strong> <span class="sz-chk-punkt">${caly.slice(ciecie + 1)}</span>`;
}

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const SZABLON_WIZYTOWKA_DE = {
  slug: 'checklista-wizytowki-google',
  plik: 'wizytowka-google',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/google-unternehmensprofil-checkliste.pdf',
  seo: {
    tytul: 'Google Unternehmensprofil Checkliste: 40 Punkte als PDF',
    opis: 'Kostenlose Google Unternehmensprofil Checkliste als PDF: 40 Punkte zu Verifizierung, Kategorien, NAP-Daten, Bewertungen, Beiträgen und Maps-Pflege.',
  },
  de: {
    okruszek: 'Google Unternehmensprofil Checkliste',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Google Unternehmensprofil Checkliste: 40 Prüfpunkte zum Download',
    lead: 'Ein vollständiges, sauber verifiziertes Google Unternehmensprofil (früher Google My Business) entscheidet im lokalen Mittelstand oft noch vor der eigenen Website darüber, wer den Anruf erhält. Unsere kostenlose Google Unternehmensprofil Checkliste führt Sie in 40 Prüfpunkten von der Berechtigungsprüfung und Video-Verifizierung über Kategorien, Leistungen und Rezensionen bis zum NAP-Abgleich - direkt im Browser abhakbar und als druckfertiges A4-PDF.',
    karta: {
      nazwa: 'Google Unternehmensprofil Checkliste (PDF)',
      opis: '40 Prüfpunkte in 6 Bereichen plus NAP-Stammdatenblatt, Verzeichnis-Kontrollliste und Monatsprotokoll auf A4.',
      cta: 'Checkliste herunterladen',
    },
    sekcje: [
      {
        id: 'einrichtung-in-8-schritten',
        h2: 'Google Unternehmensprofil anlegen: der saubere Ablauf vor dem ersten Klick',
        html: [
          '<p>Viele Sperrungen und Dubletten entstehen in den ersten zehn Minuten, weil Profile hastig unter einer privaten Gmail-Adresse angelegt oder mit Werbe-Keywords im Firmennamen überladen werden. Gehen Sie stattdessen in dieser festen Reihenfolge vor:</p>',
          '<ol>',
          '<li><strong>Bestehenden Eintrag in Google Maps prüfen:</strong> Suchen Sie nach Ihrem Unternehmensnamen und Ort. Existiert bereits ein unbestätigtes Profil, übernehmen Sie es über „Anspruch auf dieses Unternehmen erheben“, statt ein zweites anzulegen.</li>',
          '<li><strong>Geschäftliches Google-Konto verwenden:</strong> Wer die Bestätigung abschließt, wird Hauptinhaber. Nutzen Sie ein Konto unter Ihrer eigenen Firmendomain; externe Partner erhalten später nur Manager-Rechte.</li>',
          '<li><strong>Eintrag unter business.google.com/add starten:</strong> Die Einrichtung bei Google ist vollständig kostenfrei.</li>',
          '<li><strong>Exakten Firmennamen eintragen:</strong> Übernehmen Sie die reale Bezeichnung von Ihrem Außenschild und Impressum - ohne Städtenamen, Branchenzusätze oder Telefonnummern.</li>',
          '<li><strong>Präzise Hauptkategorie wählen:</strong> Orientieren Sie sich an der Frage „Was IST unser Betrieb?“ (z. B. „Steuerberater“, „Zerspanungsbetrieb“ oder „Zahnarztpraxis“).</li>',
          '<li><strong>Adresse oder Einzugsgebiet festlegen:</strong> Mit Publikumsverkehr vor Ort zeigen Sie die Anschrift; reine Außendienst-Betriebe blenden die Privatadresse aus und benennen bis zu 20 bediente Städte oder Landkreise.</li>',
          '<li><strong>Lokale Telefonnummer und HTTPS-Website hinterlegen:</strong> Verlinken Sie auf die passende Standort- oder Startseite mit sauberem UTM-Tagging.</li>',
          '<li><strong>Verifizierung vorbereiten und abschließen:</strong> Halten Sie Beschilderung, Geschäftsräume und Nachweise für die Video-Prüfung bereit.</li>',
          '</ol>',
          '<p>Diese Checkliste deckt die einmalige Ersteinrichtung und eigenständige Qualitätskontrolle ab. Wenn Sie bereits ein bestätigtes Profil besitzen und Ihre Sichtbarkeit im gesamten Stadtgebiet systematisch steigern möchten, lesen Sie unsere Leistungsseite <a href="/de/google-unternehmensprofil-optimieren">Google Unternehmensprofil optimieren</a> mit Positionsmessung im 49-Punkte-Kartenraster.</p>',
        ].join(''),
      },
      {
        id: 'berechtigung-unternehmenstypen',
        h2: 'Wer darf ein Google Unternehmensprofil führen - und wer nicht?',
        html: '<p>Laut den offiziellen Google-Richtlinien ist persönlicher Kontakt zu Kundinnen und Kunden während der angegebenen Zeiten zwingend erforderlich - entweder in Ihren Geschäftsräumen oder bei den Kunden vor Ort. Reine E-Commerce-Versandhändler ohne Abhol- oder Beratungsstandort sowie virtuelle Büros ohne eigenes Personal vor Ort sind ausgeschlossen.</p>',
        tabela: {
          id: 'tabelle-gbp-unternehmenstypen',
          caption: 'Unternehmenstypen im Google Unternehmensprofil gemäß Google-Richtlinien',
          columns: [
            { key: 'typ', label: 'Unternehmenstyp' },
            { key: 'beispiel', label: 'Typisches Beispiel' },
            { key: 'adresse', label: 'Adresse sichtbar?' },
            { key: 'gebiet', label: 'Einzugsgebiet' },
            { key: 'bedingung', label: 'Pflichtvoraussetzung laut Google' },
          ],
          rows: [
            { typ: 'Standort mit Kundenverkehr', beispiel: 'Praxis, Kanzlei, Fachgeschäft, Werkstatt, Showroom', adresse: 'Ja (sichtbar)', gebiet: 'Nein', bedingung: 'Dauerhafte Außenbeschilderung mit Firmennamen und Besetzung während der Öffnungszeiten' },
            { typ: 'Dienstleister im Außendienst', beispiel: 'SHK-Betrieb, Elektriker, Gebäudereinigung ohne Ladenlokal', adresse: 'Nein (ausgeblendet)', gebiet: 'Bis zu 20 Gebiete (ca. 2 Std. Fahrt)', bedingung: 'Nur ein zentrales Profil für das gesamte tatsächlich bediente Gebiet' },
            { typ: 'Hybrid-Unternehmen', beispiel: 'Kfz-Betrieb mit Pannendienst, Fachhändler mit Vor-Ort-Montage', adresse: 'Ja (sichtbar)', gebiet: 'Ja (zusätzlich)', bedingung: 'Besetzter Standort für Kundenbesuche plus Auslieferung oder Montage beim Kunden' },
            { typ: 'Büro im Coworking-Space', beispiel: 'Beratungsbüro, Ingenieurbüro', adresse: 'Nur mit Schild & Personal', gebiet: 'Je nach Tätigkeit', bedingung: 'Eigene feste Beschilderung, eigene Durchwahl und persönliche Erreichbarkeit vor Ort zu festen Zeiten' },
            { typ: 'Nicht berechtigt', beispiel: 'Reiner Online-Shop, Postfach, c/o-Briefkastenadresse', adresse: '-', gebiet: '-', bedingung: 'Kein persönlicher Kundenkontakt vor Ort oder im Außendienst' },
          ],
          przypis: 'Quelle: Google Unternehmensprofil-Hilfe, Richtlinien zur Darstellung Ihres Unternehmens auf Google (Abruf: 11.11.2026).',
        },
      },
      {
        id: 'verifizierung-und-video-tipps',
        h2: 'Verifizierung bestehen: Videoaufnahme, Telefon, Postkarte und typische Hürden',
        html: '<p>Welche Bestätigungsmethode Google anbietet, entscheidet das System anhand von Branche, öffentlich verfügbaren Register- und Webdaten sowie Region automatisch. Im DACH-Raum ist heute die <strong>Videoaufnahme per Smartphone</strong> der Standardweg. Bereiten Sie den Rundgang kurz vor, denn das Video muss in einem einzigen Durchgang ohne Schnitt aufgenommen werden.</p>',
        tabela: {
          id: 'tabelle-gbp-verifizierung',
          caption: 'Bestätigungsmethoden im Google Unternehmensprofil und worauf Sie achten müssen',
          columns: [
            { key: 'methode', label: 'Methode' },
            { key: 'ablauf', label: 'So läuft die Prüfung ab' },
            { key: 'fehler', label: 'Häufigste Fehlerquelle in der Praxis' },
          ],
          rows: [
            { methode: 'Videoaufnahme (Standard)', ablauf: '1- bis 2-minütiges ungeschnittenes Smartphone-Video von Straße, Schild und Innenbereich', fehler: 'Fehlendes Straßenschild, nur ein ausgedrucktes Papierblatt an der Tür oder sichtbare fremde Kundengesichter' },
            { methode: 'Live-Videoanruf', ablauf: 'Direktes Kameragespräch mit dem Google-Support während der angegebenen Geschäftszeiten', fehler: 'Anrufversuch außerhalb der Öffnungszeiten oder von einem Ort außerhalb des Betriebs' },
            { methode: 'Telefon oder SMS', ablauf: '5-stelliger Bestätigungscode per Sprachanruf oder SMS an die hinterlegte Geschäftsnummer', fehler: 'Vorgeschaltete Telefonanlage / Sprachmenü (IVR) schluckt den automatischen Anruf' },
            { methode: 'E-Mail / Sofortbestätigung', ablauf: 'Bestätigungslink an die Domain-E-Mail oder Abgleich mit einer verifizierten Search-Console-Domain', fehler: 'Website noch nicht in der Google Search Console unter demselben Konto bestätigt' },
            { methode: 'Postkarte per Post', ablauf: 'Gedruckter 5-stelliger Code an die Geschäftsadresse (Zustellung meist binnen 14 Tagen, 30 Tage gültig)', fehler: 'Nachträgliches Ändern von Firmenname, Adresse oder Kategorie entwertet den unterwegs befindlichen Code sofort' },
          ],
        },
        htmlPo: '<p>Nach dem Hochladen prüft Google die Angaben in der Regel innerhalb von bis zu fünf Werktagen. Sollte der Button „Bestätigen“ anschließend erneut erscheinen, reichte einer der Nachweise (meist Außenbeschilderung oder Nachweis der Nutzungsberechtigung wie Aufschließen der Tür bzw. Dienstfahrzeug mit Beschriftung) noch nicht aus.</p>',
      },
      {
        id: 'pflichtfelder-limits-und-ki-sichtbarkeit',
        h2: 'Profilfelder, Google-Limits und warum Maps auch für ChatGPT entscheidend ist',
        html: '<p>Ein bestätigter Roh-Eintrag allein bringt selten Anfragen. Google bewertet lokale Suchergebnisse nach drei Kriterien: <strong>Relevanz</strong> (wie genau passt das Profil zur Suchanfrage?), <strong>Entfernung</strong> (wie weit ist der Suchende entfernt?) und <strong>Bekanntheit</strong> (Bewertungen, Verweise, lokale Signale). Über die saubere Befüllung aller Felder steuern Sie vor allem die Relevanz.</p>',
        tabela: {
          id: 'tabelle-gbp-felder-limits',
          caption: 'Wichtige Felder und Grenzwerte im Google Unternehmensprofil',
          columns: [
            { key: 'feld', label: 'Profilfeld' },
            { key: 'regel', label: 'Praxisregel' },
            { key: 'limit', label: 'Technisches Limit / Richtlinie' },
          ],
          rows: [
            { feld: 'Unternehmensname', regel: 'Exakte Schreibweise wie auf Schild, Website und Handelsregister/Impressum', limit: 'Kein Keyword-Stuffing; Namensänderung kann erneute Verifizierung auslösen' },
            { feld: 'Kategorien', regel: '1 spitz gewählte Hauptkategorie + nur tatsächlich erbrachte Zusatzkategorien', limit: '1 Hauptkategorie und bis zu 9 weitere Kategorien' },
            { feld: 'Beschreibung', regel: 'Was bieten Sie wem in welcher Region seit wann an?', limit: 'Maximal 750 Zeichen; keine Links, keine Sonderpreis-Werbung' },
            { feld: 'Einzugsgebiet', regel: 'Städte, Postleitzahlen oder Landkreise für Außendienst & Hybrid', limit: 'Bis zu 20 Gebiete, Richtwert maximal ca. 2 Fahrstunden um den Sitz' },
            { feld: 'Fotos & Videos', regel: 'Echte Aufnahmen von Eingang, Team, Werkstatt/Büro und Referenzarbeiten', limit: 'JPG/PNG, 10 KB bis 5 MB, empfohlen 720 x 720 px; Video max. 30 s / 75 MB' },
            { feld: 'Bewertungen', regel: 'Kontinuierlich anfragen, sachlich binnen 48 Std. beantworten', limit: 'Strenges Verbot von Rabatten, Geschenken oder selektiver Vorauswahl' },
          ],
        },
        htmlPo: [
          '<p>Hinzu kommt ein zweiter Hebel, den viele Unternehmen noch unterschätzen: Als wir am 4. und 5. November 2026 in einer eigenen Stichprobe 62 Quellenlinks aus lokalen Empfehlungsantworten in ChatGPT untersuchten, führten <strong>59 von 62 Links direkt auf Einträge in Google Maps</strong> (Details lesen Sie in unserem Datenbericht zu <a href="/de/ki-suchoptimierung/chatgpt">ChatGPT SEO</a>). Ein gepflegtes Unternehmensprofil samt konsistenten NAP-Daten zahlt also gleichzeitig auf das Local Pack bei Google und auf lokale KI-Antworten ein.</p>',
          '<p>Nutzen Sie ergänzend unseren kostenlosen <a href="/de/tools/lokales-seo-nap-qr-generator">NAP-Prüfer &amp; Google-Bewertungs-QR-Generator</a>, um Abweichungen zwischen Ihrem HTML-Text und Ihrem <code>LocalBusiness</code>-Schema aufzudecken und sofort einen druckfertigen Bewertungs-QR-Code zu erstellen. Wie Sie seriös mehr Kundenstimmen gewinnen, zeigt unser Ratgeber <a href="/de/blog/google-bewertungen-sammeln">Google Bewertungen sammeln</a>.</p>',
        ].join(''),
      },
      {
        id: 'praxisbeispiel-nap-stammdaten',
        h2: 'Praxisbeispiel: So sieht ein sauberes NAP-Stammdatenblatt aus',
        html: [
          '<p>Auf der letzten Seite unserer PDF-Checkliste finden Sie ein NAP-Stammdatenblatt sowie eine Kontrolltabelle für externe Verzeichnisse. Das folgende fiktive Beispiel eines Elektrotechnik-Meisterbetriebs zeigt, wie präzise die Vorgabe dokumentiert sein sollte, damit Sekretariat, Webdesign und Agentur überall identische Angaben pflegen:</p>',
          '<ul>',
          '<li><strong>Exakter Name:</strong> Elektro Meisterbetrieb Weber GmbH (ohne Zusatz „24h Notdienst Photovoltaik München“)</li>',
          '<li><strong>Anschrift Zeile 1 &amp; 2:</strong> Landsberger Straße 214, Rückgebäude Aufgang B, 80687 München</li>',
          '<li><strong>Telefon (einheitlich):</strong> +49 89 12345670 (identisch im Profil, im Website-Footer und im <code>LocalBusiness</code>-JSON-LD)</li>',
          '<li><strong>Hauptkategorie:</strong> Elektriker · <strong>Zusatzkategorien:</strong> Anbieter von Solaranlagen, Elektroinstallationsdienst</li>',
          '<li><strong>Ziel-URL mit UTM:</strong> <code>https://www.beispiel-elektro-weber.de/?utm_source=google&amp;utm_medium=organic&amp;utm_campaign=gbp</code></li>',
          '</ul>',
          '<p>Ob KI-Systeme Ihren Betrieb bei lokalen Suchfragen bereits nennen, prüfen Sie kostenlos unter <a href="/de/ki-sichtbarkeit-pruefen">KI-Sichtbarkeit prüfen</a>.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Interaktive Vorschau: Alle 43 Prüfpunkte der Checkliste zum Abhaken',
      opis: 'Haken Sie erledigte Punkte direkt hier im Browser ab (Ihr Fortschritt bleibt lokal gespeichert) oder laden Sie das komplette A4-PDF inklusive NAP-Stammdatenblatt und Monatsprotokoll herunter.',
      html: [
        ...OBSZARY_GBP_DE.flatMap((o) => [
          `<h3>${o.tytul}</h3>`,
          `<p><em>${o.opis}</em></p>`,
          `<ul>${o.punkty
            .map(([nr, punkt, jak, prio]) => `<li>☐ ${pogrubPunkt(nr, punkt)} ${jak} <em>(Priorität: ${prio})</em></li>`)
            .join('')}</ul>`,
        ]),
        '<h3>Arbeitsblatt im PDF: NAP-Konsistenz & Verzeichnis-Abgleich (Auszug)</h3>',
        tabelaHtml(
          ['Plattform / Verzeichnis', 'Eintrags-URL', 'Name, Adresse & Telefon identisch?', 'Geprüft am'],
          [
            ['Eigene Website (Footer, Kontakt, Impressum & JSON-LD)', 'https://…', '☐ Ja ☐ Korrigiert', '…'],
            ['Apple Business Connect & Bing Places for Business', 'https://…', '☐ Ja ☐ Korrigiert', '…'],
            ['Relevantes Fach- / Kammer- / Branchenverzeichnis', 'https://…', '☐ Ja ☐ Korrigiert', '…'],
          ],
        ),
      ].join(''),
    },
    formularz: {
      h2: 'Google Unternehmensprofil Checkliste als PDF herunterladen',
      opis: 'Wir senden Ihnen die druckfertige A4-Checkliste mit allen 43 Prüfpunkten, dem NAP-Stammdatenblatt, der Verzeichnis-Matrix und dem 12-Monats-Leistungsprotokoll kostenlos zu.',
      etykieta: 'Ihre geschäftliche E-Mail-Adresse',
      przycisk: 'Checkliste als PDF senden',
      przedmiot: 'die Google Unternehmensprofil Checkliste (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Download-Link zur Google Unternehmensprofil Checkliste trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Kostet das Google Unternehmensprofil monatliche Gebühren?',
        answer: 'Nein. Sowohl das Anlegen als auch die Verifizierung und laufende Pflege eines Google Unternehmensprofils über business.google.com sind vollständig kostenlos. Kosten entstehen nur dann, wenn Sie freiwillig bezahlte Google-Ads-Anzeigen schalten oder eine spezialisierte Agentur mit der laufenden Betreuung beauftragen.',
      },
      {
        question: 'Darf ich meine Stadt oder mein Haupt-Keyword in den Unternehmensnamen schreiben?',
        answer: 'Nur dann, wenn Stadt oder Leistungsbegriff nachweislich fester Bestandteil Ihres offiziellen, auf der Außenbeschilderung und im Handelsregister bzw. Impressum geführten Namens sind. Nachträglich angehängte Keyword-Ketten verstoßen gegen Googles Darstellungsrichtlinien und führen häufig zur sofortigen Aussetzung des Profils.',
      },
      {
        question: 'Was tun, wenn mein Unternehmen von zu Hause aus arbeitet und kein Ladengeschäft hat?',
        answer: 'Legen Sie das Profil als Dienstleistungsunternehmen mit Einzugsgebiet (Service-Area Business) an. Sie hinterlegen Ihre reale Anschrift zwar intern für die Bestätigung durch Google, blenden die Straßenadresse aber öffentlich aus und geben stattdessen bis zu 20 bediente Städte, Postleitzahlen oder Landkreise an.',
      },
      {
        question: 'Wie übernehme ich ein Profil, das eine frühere Agentur unter ihrem Konto angelegt hat?',
        answer: 'Suchen Sie Ihr Unternehmen in Google Maps bzw. über business.google.com/add und stellen Sie eine offizielle Inhaberschaftsanfrage. Der aktuelle Hauptinhaber hat drei Kalendertage Zeit zu reagieren; bleibt die Antwort aus, erlaubt Google in vielen Fällen die erneute Bestätigung auf Ihr eigenes Unternehmenskonto.',
      },
      {
        question: 'Worin unterscheidet sich diese Checkliste von Ihrer Dienstleistung zur Profil-Optimierung?',
        answer: 'Diese kostenlose 43-Punkte-Checkliste hilft Ihnen, Ihr Profil eigenständig fehlerfrei einzurichten, zu verifizieren und sauber zu pflegen. Unsere laufende Dienstleistung richtet sich an Unternehmen in umkämpften Märkten und umfasst zusätzlich Wettbewerbsanalysen, Kategorien-Tests, regelmäßige Beiträge sowie die monatliche Sichtbarkeitsmessung im 49-Punkte-Kartenraster.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Google Unternehmensprofil optimieren', opis: 'unsere laufende Betreuung mit Positionsmessung im 49-Punkte-Kartenraster' },
      { href: '/narzedzia/audyt-lokalnego-seo-wizytowki', tekst: 'NAP-Prüfer & Bewertungs-QR-Generator', opis: 'gleicht Kontaktdaten mit LocalBusiness-JSON-LD ab und erzeugt einen druckfertigen QR-Code' },
      { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', tekst: 'Google Bewertungen sammeln', opis: 'seriöse Abläufe für kontinuierliche Kundenrezensionen ohne Richtlinienverstoß' },
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Schema Markup Beispiele', opis: 'kopierfertiges LocalBusiness-JSON-LD passend zu Ihrem Unternehmensprofil' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste (50 Punkte)', opis: 'alle technischen und inhaltlichen Prüfpunkte für Ihre zugehörige Website' },
    ],
    plikNazwa: 'Google Unternehmensprofil Checkliste: 43 Prüfpunkte & NAP-Blatt (PDF)',
  },
};

export default SZABLON_WIZYTOWKA_DE;
