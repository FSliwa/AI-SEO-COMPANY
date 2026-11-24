// Texte für /de/google-unternehmensprofil-optimieren (Faza 2 DE, 22.11.2026; Schlüssel PL: /pozycjonowanie-wizytowki-google).
// Fakten identisch mit app/[locale]/pozycjonowanie-wizytowki-google/page.js und WizytowkaClient.jsx:
// 49-Punkte-Kartenraster (7x7) alle 14 Tage im Kundenportal, 59 von 62 Empfehlungslinks in ChatGPT zu Google Maps
// (eigene API-Messung 04.-05.11.2026), kein Kauf von Bewertungen (Google-Richtlinien), enthalten ab SEO Standard (450 EUR netto/Monat).
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const GBP_KURZANTWORT = `Das Google Unternehmensprofil (früher Google My Business) legen Sie kostenlos an; bezahlt wird nicht ein gekaufter Platz bei Google, sondern die laufende Optimierung: präzise Haupt- und Nebenkategorien, vollständige Leistungsbeschreibungen, echte Fotos, zwei Beiträge pro Monat, Antworten auf Kundenbewertungen innerhalb von 48 Stunden und einheitliche Unternehmensdaten (NAP) in Branchenverzeichnissen. Wir messen Ihre Position alle 14 Tage auf einem 49-Punkte-Kartenraster (7x7) im Kundenportal. Enthalten ab dem Paket SEO Standard (${e(PREISE.standard)} netto/Monat, monatlich kündbar).`;

export const GBP_FAKTOREN = [
  {
    kicker: 'FAKTOR 1 · RELEVANZ',
    titel: 'Hauptkategorie, Nebenkategorien und Leistungen',
    text: 'Google prüft zuerst, ob Ihr Profil fachlich zur Suchanfrage passt. Eine zu allgemeine Hauptkategorie oder fehlende Leistungsbeschreibungen kosten Sichtbarkeit im Local Pack - selbst dann, wenn Ihr Büro direkt neben dem Suchenden liegt.',
  },
  {
    kicker: 'FAKTOR 2 · ENTFERNUNG',
    titel: 'Standort des Suchenden und 7x7-Kartenraster',
    text: 'Die Distanz zum Kunden lässt sich nicht künstlich verändern, wohl aber der Radius, in dem Ihr Profil in den Top 3 erscheint. Statt einer einzigen Durchschnittsposition messen wir Ihr Ranking an 49 Messpunkten rund um Ihren Standort.',
  },
  {
    kicker: 'FAKTOR 3 · BEKANNTHEIT',
    titel: 'Bewertungen, Website-Signale und Verzeichnisse',
    text: 'Kontinuierliche echte Kundenstimmen, fachliche Antworten innerhalb von 48 Stunden, konsistente Firmendaten (Name, Anschrift, Telefon) und eine technisch saubere Website stärken die Autorität Ihres Profils dauerhaft.',
  },
];

export const GBP_LEISTUNGEN = [
  {
    kicker: 'SCHRITT 1',
    titel: 'Audit des bestehenden Profils & Kategorien-Abgleich',
    text: 'Wir prüfen Verifizierungsstatus, Haupt- und Nebenkategorien der Top-3-Wettbewerber auf Google Maps, Dubletten, Öffnungszeiten, Einzugsgebiet, Attribute und UTM-Tracking für die Google Search Console.',
  },
  {
    kicker: 'SCHRITT 2',
    titel: 'Leistungskatalog, Beschreibung und Medienpflege',
    text: 'Wir strukturieren alle angebotenen Dienstleistungen mit verständlichen Beschreibungen, ergänzen echte Standort- und Projektfotos ohne Stockbild-Muster und veröffentlichen mindestens zwei Google-Beiträge pro Monat.',
  },
  {
    kicker: 'SCHRITT 3',
    titel: 'Prozess für echte Google-Bewertungen (richtlinienkonform)',
    text: 'Kein Bewertungskauf und keine Prämien gegen Sterne: Sie erhalten einen direkten Bewertungslink samt QR-Vorlage für abgeschlossene Aufträge, und wir beantworten neue Rezensionen sachlich innerhalb von 48 Stunden.',
  },
  {
    kicker: 'SCHRITT 4',
    titel: 'NAP-Konsistenz & 49-Punkte-Rastermessung alle 14 Tage',
    text: 'Wir gleichen Name, Adresse und Telefonnummer zwischen Website, Impressum, Schema.org (LocalBusiness) und Branchenverzeichnissen ab und dokumentieren die Entwicklung alle zwei Wochen im 7x7-Kartenraster.',
  },
];

export const GBP_CHATGPT_TABELLE = [
  ['Anbieter-Empfehlung mit Ortsbezug (11 Antworten)', '59 von 62 Links führten zu Google Maps', 'Vollständiges Google Unternehmensprofil, Kategorien, Öffnungszeiten und echte Rezensionen'],
  ['Preis-, Kosten- und Vergleichsfragen (5 Antworten)', '0 von 31 Links zu Maps - ausschließlich Websites', 'Leistungs- und Preisseiten mit konkreten Euro-Spannen und sauberem HTML'],
];

export const GBP_PREIS_ZEILEN = [
  ['SEO Standard (inkl. Google Unternehmensprofil)', `ab ${e(PREISE.standard)} netto / Monat`, 'Monatlich kündbar', 'Profil-Optimierung, 2 Beiträge/Monat, Bewertungsantworten, 7x7-Kartenraster alle 14 Tage + bis zu 20 Keywords, 2 Inhalte & 2 Links für die Website'],
  ['SEO Premium (inkl. Profil + wöchentliches KI-Monitoring)', `${e(PREISE.premium)} netto / Monat`, 'Monatlich kündbar', 'Alles aus Standard + bis zu 50 Keywords, 4 Inhalte, 4 Links sowie wöchentliche Messung in ChatGPT, Gemini, Perplexity und AI Overviews'],
  ['Booster Pack (Neue Next.js-Website + SEO + Profil)', `${e(PREISE.booster)} netto / Monat`, 'Mind. 3 Monate (0 € Setup)', 'Individuell programmierte Next.js-Website inklusive Hosting, LocalBusiness-Schema, Website-SEO und Betreuung des Unternehmensprofils'],
];

export const GBP_FAQ = [
  {
    id: 'ist-das-google-unternehmensprofil-kostenpflichtig',
    frage: 'Ist das Google Unternehmensprofil selbst kostenpflichtig?',
    antwort: 'Nein. Das Anlegen, Verifizieren und Verwalten eines Google Unternehmensprofils ist bei Google kostenlos, und Google verkauft keine besseren organischen Plätze im Local Pack. Bezahlt sind lediglich als „Gesponsert“ gekennzeichnete Google-Ads-Anzeigen. Bei unserer Betreuung zahlen Sie für die laufende Facharbeit: Kategorien- und Wettbewerbsanalyse, Leistungsbeschreibungen, Beiträge, Bewertungsmanagement, Verzeichnisabgleich und die 14-tägige Rastermessung.',
  },
  {
    id: 'wie-verbessere-ich-mein-google-maps-ranking',
    frage: 'Wie lässt sich die Sichtbarkeit auf Google Maps am schnellsten verbessern?',
    antwort: 'Den schnellsten Hebel für lokale SEO bietet die Relevanz: die präzise Hauptkategorie, passende Nebenkategorien, ein ausgefüllter Leistungskatalog und korrekte Öffnungszeiten. Mittelfristig entscheidet die Bekanntheit: ein stetiger Zufluss echter Kundenbewertungen mit fachlicher Antwort, konsistente Unternehmensdaten (NAP) im Web sowie eine eigene Leistungsseite auf Ihrer Domain, die das Profil als Local SEO Agentur thematisch stützt.',
  },
  {
    id: 'wie-lange-dauert-die-optimierung',
    frage: 'Wie lange dauert es, bis Änderungen am Google Unternehmensprofil wirken?',
    antwort: 'Anpassungen an Kategorien, Leistungen und Website-Verknüpfung verarbeitet Google meist innerhalb weniger Wochen. Deshalb erstellen wir vor der ersten Änderung eine Nullmessung im 49-Punkte-Raster und wiederholen sie alle 14 Tage. Der Aufbau von Bewertungen und lokaler Autorität wirkt über Monate; für vereinbarte lokale Suchbegriffe peilen wir Platzierungen in den Top 3 innerhalb von 2 bis 3 Monaten an - ohne unseriöse Platz-1-Garantie.',
  },
  {
    id: 'unternehmen-ohne-ladenlokal-einzugsgebiet',
    frage: 'Kann man ein Unternehmen ohne Publikumsverkehr (Service-Area-Business) optimieren?',
    antwort: 'Ja. Handwerks-, Montage- oder Beratungsbetriebe, die Kunden vor Ort besuchen, blenden die Straßenadresse gemäß Google-Richtlinien aus und hinterlegen ihr Einzugsgebiet. Da Google intern weiterhin die Entfernung zur verifizierten Adresse berücksichtigt, messen wir das 7x7-Raster rund um diesen Punkt und stärken angrenzende Orte über dedizierte Leistungsseiten auf Ihrer Website.',
  },
  {
    id: 'darf-man-google-bewertungen-kaufen',
    frage: 'Darf man Google-Bewertungen kaufen oder mit Rabatten belohnen?',
    antwort: 'Nein - weder kaufen noch gegen Gutscheine, Rabatte oder Geschenke belohnen. Googles Richtlinien zu nutzergenerierten Inhalten verbieten künstliches Engagement ausdrücklich; Verstöße führen zur Löschung von Rezensionen, Warnhinweisen oder zur Sperrung des gesamten Profils. Nachhaltig wirkt ein klarer Ablauf nach jedem abgeschlossenen Projekt mit direktem Bewertungslink.',
  },
  {
    id: 'unterschied-unternehmensprofil-und-website-seo',
    frage: 'Worin unterscheidet sich die Optimierung des Unternehmensprofils von klassischem Website-SEO?',
    antwort: `Das Google Unternehmensprofil steuert Ihre Präsenz in Google Maps, im dreiteiligen Local Pack und - wie unsere Messung zeigt - bei lokalen Anbieter-Empfehlungen in ${verweis('/pozycjonowanie-w-ai/chatgpt', 'ChatGPT')}. Klassisches ${verweis('/pozycjonowanie-stron-internetowych', 'B2B SEO für die Website')} bringt Ihre Leistungs-, Preis- und Ratgeberseiten in die organischen Suchergebnisse darunter. Am stärksten wirken beide Kanäle zusammen, weil Google Inhalte Ihrer verknüpften Website für das Karten-Ranking mit auswertet.`,
  },
];

export const GBP_QUELLEN = [
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Google Unternehmensprofil Hilfe: Lokales Ranking auf Google verbessern (Relevanz, Entfernung, Bekanntheit)', data: '2026-11-18' },
  { url: 'https://support.google.com/business/answer/3038177', nazwa: 'Google Unternehmensprofil Hilfe: Richtlinien zur Darstellung Ihres Unternehmens auf Google', data: '2026-11-18' },
  { url: 'https://support.google.com/contributionpolicy/answer/7400114', nazwa: 'Google Maps Richtlinien: Verbot gefälschter und belohnter Bewertungen', data: '2026-11-18' },
];
