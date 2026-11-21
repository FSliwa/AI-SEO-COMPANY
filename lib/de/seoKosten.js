// Texte der Seite /de/seo-kosten (Quelle der Fakten: PricingClient.jsx, Pricing.jsx, FairDeal.jsx, ServiceSchema.jsx).
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');
const KEY_AUDIT = '/audyt-seo';
const KEY_GEO = '/pozycjonowanie-w-ai';
const KEY_B2B = '/pozycjonowanie-stron-internetowych';

export const KOSTEN_FAQ = [
  {
    id: 'was-kostet-seo',
    frage: 'Was kostet SEO pro Monat?',
    antwort: `Bei uns startet SEO ab ${e(PREISE.standard)} netto pro Monat (SEO Standard). Der Preis hängt von der Größe der Website, der Konkurrenz in Ihrer Branche und dem technischen Zustand ab. In jedem Paket sind ein technisches Audit, eigene Inhalte, eine Linkaufbau-Strategie und die technische Optimierung enthalten, ohne versteckte Kosten.`,
  },
  {
    id: 'seo-kosten-2026',
    frage: 'Was kosten die SEO-Pakete 2026?',
    antwort: `SEO Standard kostet ${e(PREISE.standard)} netto pro Monat, SEO Premium mit Conversion-Optimierung ${e(PREISE.premium)} netto pro Monat. Zum selben Preis von ${e(PREISE.booster)} netto pro Monat gibt es das Booster Pack, das bei mindestens 3 Monaten Laufzeit zusätzlich eine neue Website enthält. Alle Preise sind Nettopreise zuzüglich gesetzlicher Umsatzsteuer.`,
  },
  {
    id: 'vertragslaufzeit',
    frage: 'Muss ich einen langfristigen Vertrag abschließen?',
    antwort: 'Nicht bei SEO Standard und SEO Premium: Wir arbeiten im flexiblen Monatsvertrag, den Sie jederzeit kündigen können. Eine Ausnahme ist das Booster Pack mit neuer Website, dessen Laufzeit mindestens 3 Monate beträgt. Mehrjährige Verträge mit Strafen bei vorzeitigem Ende gibt es bei uns nicht.',
  },
  {
    id: 'audit-im-paket',
    frage: 'Ist das SEO Audit im Paketpreis enthalten?',
    antwort: `Ja. Jedes Paket beginnt mit einem professionellen technischen Audit. Es ist kein separat bezahltes Extra, denn ohne das Audit wüssten wir nicht, womit wir anfangen sollen. Wer nur die Diagnose braucht, bucht das ${verweis(KEY_AUDIT, 'SEO Audit als eigenständige Leistung')}.`,
  },
  {
    id: 'lokales-seo-enthalten',
    frage: 'Kosten lokales SEO und das Google Unternehmensprofil extra?',
    antwort: 'Nein. Lokales SEO und die Optimierung des Google Unternehmensprofils sind in jedem Paket enthalten. Für Dienstleister, die in einer bestimmten Stadt aktiv sind, ist das meist die schnellste Quelle erster Anfragen, deshalb gehört es bei uns zur Basis und ist keine Option.',
  },
  {
    id: 'berichte',
    frage: 'Wie oft erhalte ich einen Fortschrittsbericht?',
    antwort: 'Die Daten sehen Sie täglich im Kundenportal: Klicks und Impressionen aus der Google Search Console, Positionen der Keywords Woche für Woche, Anfragen per Formular, Telefon und E-Mail sowie unser Arbeitsprotokoll. Die Oberfläche des Portals ist auf Polnisch und Englisch. Einmal im Monat erhalten Sie außerdem einen Bericht zu Positionen und Traffic mit Schlussfolgerungen. Der Zugriff auf Google Search Console und Analytics bleibt bei Ihnen.',
  },
  {
    id: 'preisfaktoren',
    frage: 'Wovon hängt ab, wie viel ich für SEO bezahle?',
    antwort: 'Drei Dinge bestimmen den Preis: wie umkämpft die Keywords sind, auf die Sie ranken möchten, in welchem technischen Zustand die Website zu Beginn ist und wie viele Inhalte nötig sind. Eine Domain ohne Historie in einer umkämpften Branche braucht mehr Arbeit als eine Website mit etabliertem Linkprofil. Deshalb beginnt ein Angebot mit einem Gespräch über Ihre Ziele und nicht mit einer Preisliste.',
  },
  {
    id: 'seo-auf-erfolgsbasis',
    frage: 'Ist SEO auf Erfolgsbasis günstiger?',
    antwort: 'Nicht immer. Bei Abrechnung nach Erfolg zahlen Sie für Keywords, die in einen vereinbarten Positionsbereich kommen, je besser die Ergebnisse, desto höher also die Rechnung. Wir arbeiten im Monatsabo mit einem klaren Ziel: Top 3 für vereinbarte lokale Keywords, nach den Regeln im Abschnitt „Ziel Top 3“ oben auf dieser Seite.',
  },
  {
    id: 'standard-oder-premium',
    frage: 'Was unterscheidet SEO Standard und SEO Premium?',
    antwort: 'Beide Pakete haben dasselbe Fundament: technisches Audit, Inhalte, Linkaufbau und lokales SEO. Der Unterschied liegt im Umfang: Standard umfasst bis zu 20 Keywords, 2 Inhalte und 2 Links pro Monat, Premium bis zu 50 Keywords, 4 Inhalte und 4 Links pro Monat. Premium lohnt sich bei einem breiteren Leistungsspektrum oder in einer umkämpfteren Branche; bei einer einzelnen Leistung in einer lokalen Nische reicht Standard meist aus.',
  },
  {
    id: 'audit-oder-website-kosten',
    frage: 'Was kostet ein eigenständiger SEO Audit oder eine neue Website?',
    antwort: `Ein ${verweis(KEY_AUDIT, 'SEO Audit als eigenständige Leistung')} kostet ab ${e(PREISE.audit)} netto, eine Website auf Basis von Next.js ab ${e(PREISE.website)} netto. In den SEO-Paketen ist das Audit enthalten, und im Booster Pack gehört die neue Website zum Monatspreis ab ${e(PREISE.booster)} netto (mindestens 3 Monate Laufzeit). Ein genaues Angebot für größere Websites erhalten Sie innerhalb von 24 Stunden an Werktagen.`,
  },
  {
    id: 'kosten-ki-sichtbarkeit',
    frage: 'Was kostet die Optimierung für ChatGPT und Google KI-Antworten?',
    antwort: `Das KI-Sichtbarkeit Audit kostet ${e(PREISE.geoAudit)} netto und wird auf den ersten Monatsbeitrag angerechnet. Die wöchentliche Messung und die Maßnahmen für KI-Antworten sind in SEO Premium enthalten; zu SEO Standard können Sie sie für ${e(PREISE.geoZuschlag)} netto pro Monat hinzubuchen. ${verweis(KEY_GEO, 'Details zur Generative Engine Optimization')}.`,
  },
  {
    id: 'erste-ergebnisse',
    frage: 'Wie lange dauert es, bis SEO wirkt?',
    antwort: 'Erste Bewegungen in der Sichtbarkeit zeigen sich meist nach 4 bis 8 Wochen, sobald Google die technischen Korrekturen und neuen Inhalte erneut gecrawlt hat. Unser Ziel ist Top 3 für vereinbarte lokale Keywords innerhalb von 2 bis 3 Monaten: Den Fortschritt sehen Sie wöchentlich im Kundenportal, und wird das Ziel nach 3 Monaten nicht erreicht, arbeiten wir einen weiteren Monat ohne Berechnung. Platz 1 garantieren wir nicht, denn über die Reihenfolge entscheidet Google.',
  },
  {
    id: 'lohnt-sich-seo',
    frage: 'Lohnt sich SEO?',
    antwort: 'Es lohnt sich, wenn Kunden Ihre Leistung in Google suchen und Ihre Website Besuche in Anfragen verwandelt. In unseren Projekten aus 2026 kam ein Restaurant auf 187 Klicks in 26 Tagen, ein B2B-Hersteller auf 152 Klicks in 92 Tagen (Google Search Console, Zeiträume 27.07.-21.08.2026 und 22.05.-21.08.2026). Klicks sind noch kein Umsatz, deshalb messen wir die Wirtschaftlichkeit an den Anfragen, die Sie im Kundenportal sehen.',
  },
  {
    id: 'suchmaschinenoptimierung-kosten-agentur',
    frage: 'Wie hoch sind die Kosten für Suchmaschinenoptimierung und eine SEO Agentur?',
    antwort: `Die Suchmaschinenoptimierung Kosten durch eine SEO Agentur hängen vom Umfang ab: Bei uns beginnen die Kosten für SEO Optimierung bei ${e(PREISE.standard)} netto pro Monat im Paket SEO Standard und liegen bei ${e(PREISE.premium)} netto pro Monat in SEO Premium; das Booster Pack (${e(PREISE.booster)} netto pro Monat, mindestens 3 Monate) enthält zusätzlich eine neue Website. Einmalige Leistungen wie ein ${verweis(KEY_AUDIT, 'SEO Audit')} starten bei ${e(PREISE.audit)} netto. Alle Leistungen, Keyword-Zahlen und Vertragsbedingungen stehen offen in der Übersicht oben.`,
  },
  {
    id: 'website-und-seo',
    frage: 'Ich brauche auch eine neue Website: Lässt sich das mit SEO verbinden?',
    antwort: `Ja. Neben dem Monatsabo bieten wir ein Paket, das SEO mit der Erstellung der Website verbindet. Das hat einen praktischen Vorteil: Die Website entsteht von Anfang an mit einer Informationsarchitektur und URL-Struktur, die auf die Suche ausgerichtet ist, sodass später keine URLs migriert oder die Navigation umgebaut werden müssen. Die Leistungen im Detail finden Sie auf der Seite ${verweis(KEY_B2B, 'B2B SEO')}.`,
  },
];

export const KOSTEN_BEISPIELE = [
  ['SEO Standard, 12 Monate', `${e(PREISE.standard)} × 12`, e(PREISE.standard * 12)],
  ['SEO Premium, 12 Monate', `${e(PREISE.premium)} × 12`, e(PREISE.premium * 12)],
  ['Booster Pack, Mindestlaufzeit 3 Monate', `${e(PREISE.booster)} × 3`, e(PREISE.booster * 3)],
];
