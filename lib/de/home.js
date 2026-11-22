// Texte der deutschen Startseite (/de). Fakten wie auf der polnischen und englischen Startseite; der Entwurf in
// messages/de.home.json wird NICHT gelesen (die Sektionen der DE-Startseite sind eigene Komponenten ohne 3D-Szene,
// ohne Blog-, Panel- und Webdesign-Teile, weil dafuer keine deutschen Seiten existieren).
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const HOME_LEAD = 'Wir sind eine KI SEO Agentur aus Warschau: Wir verbinden technisches SEO, Content und Generative Engine Optimization, damit Ihr Unternehmen in Google und in den Antworten von ChatGPT, Gemini und Perplexity genannt wird. SEO Audit, B2B SEO und Messung der KI-Sichtbarkeit, mit Monatsvertrag und Preisen in Euro.';

// Leistungskarten; schluessel = Routing-Schluessel (PL), Karten ohne deutsche Zielseite werden ausgeblendet.
export const HOME_LEISTUNGEN = [
  { schluessel: '/pozycjonowanie-stron-internetowych', kicker: 'ON-PAGE / TECHNISCH', kickerZwei: 'LINKBUILDING / B2B', lieferung: ['Bericht: Wöchentlich', 'Abrechnung: Ergebnisorientiert'], titel: 'SEO für Unternehmen', text: 'Technische Optimierung, Content und Linkaufbau für B2B-Unternehmen, deren Kunden lange recherchieren. Wir berichten über Anfragen und Umsatzbezug, nicht nur über Positionen.', linktext: 'B2B SEO ansehen' },
  { schluessel: '/audyt-seo', kicker: 'SEO AUDIT / TECHNIK', lieferung: ['Lieferzeit: 3-5 Werktage', 'Format: Maßnahmenliste'], titel: 'Befunde, Prioritäten, Maßnahmen', text: 'Technischer Audit Ihrer Website oder Ihres Shops in 3 bis 5 Werktagen: mehr als 50 Prüfpunkte und eine Maßnahmenliste, die Ihr Entwickler direkt umsetzen kann.', linktext: 'SEO Audit ansehen' },
  { schluessel: '/pozycjonowanie-w-ai', kicker: 'GEO / KI-ANTWORTEN', lieferung: ['Bericht: Wöchentlich', 'Abrechnung: Ergebnisorientiert'], titel: 'Generative Engine Optimization', text: 'Kunden fragen immer häufiger ChatGPT und Gemini, welches Unternehmen sie wählen sollen. Wir messen, ob die Modelle Ihre Marke nennen, und verbessern die Seiten, aus denen sie ihre Antworten beziehen.', linktext: 'GEO ansehen' },
  { schluessel: '/sprawdz-widocznosc-w-ai', kicker: 'TOOL / KI-SICHTBARKEIT', lieferung: ['Ergebnis: Live', 'Kosten: 0 €'], titel: 'Kostenloser Check Ihrer KI-Sichtbarkeit', text: 'Wir stellen ChatGPT, Gemini, Perplexity, Claude und den KI-Antworten in Google Kundenfragen und zeigen, ob Ihre Marke genannt wird.', linktext: 'KI-Sichtbarkeit prüfen' },
  { schluessel: '/pozycjonowanie-wizytowki-google', kicker: 'GOOGLE MAPS / 7x7-RASTER', lieferung: ['Messung: Alle 14 Tage', 'Eigentum: Ihr Konto'], titel: 'Google Unternehmensprofil optimieren', text: 'Kategorien, Leistungskatalog, Beiträge, Bewertungsantworten und Positionsmessung an 49 Kartenpunkten - wichtig für Google Maps und lokale ChatGPT-Empfehlungen.', linktext: 'Unternehmensprofil ansehen' },
  { schluessel: '/cennik-pozycjonowania', kicker: 'PAKETE / TRANSPARENT', lieferung: ['Bericht: Wöchentlich', 'Vertrag: Monatlich'], titel: 'SEO Kosten in Euro', text: `SEO Standard ab ${e(PREISE.standard)}, SEO Premium ${e(PREISE.premium)} und Booster Pack mit neuer Website ${e(PREISE.booster)}, jeweils netto pro Monat.`, linktext: 'SEO Kosten ansehen' },
  { schluessel: '/seo-agentur-polen', kicker: 'MARKT / POLEN & DACH', lieferung: ['Bericht: Wöchentlich', 'Abrechnung: Ergebnisorientiert'], titel: 'SEO für den polnischen Markt', text: 'Für Unternehmen aus dem DACH-Raum, die in Polen gefunden werden wollen: polnische Keywords, Inhalte, Technik und Reporting aus Warschau.', linktext: 'SEO in Polen ansehen' },
];

export const HOME_VORTEILE = [
  'Kundenportal rund um die Uhr, ab dem ersten Tag: Daten aus der Google Search Console, Keyword-Positionen, Anfragen und ein Arbeitsprotokoll mit Datum (Oberfläche auf Polnisch und Englisch).',
  'Monatsvertrag in SEO Standard und SEO Premium, Kündigung per E-Mail, keine Aktivierungs- und Ausstiegsgebühren.',
  'Antwort auf Anfragen innerhalb von 24 Stunden an Werktagen, von der Person, die das SEO Ihrer Website betreut.',
  'Search Console, Analytics, Google Unternehmensprofil und Domain bleiben auf Ihren Konten, wir erhalten nur Zugriff.',
  'Ergebnisse als Daten, nicht als Behauptungen: Jede Referenz nennt den Messzeitraum aus der Google Search Console.',
];

export const HOME_SCHRITTE = [
  { kicker: 'SCHRITT 1', titel: 'Audit und Strategie', text: 'Wir untersuchen Zielgruppe, Wettbewerb und die Keywords, die Anfragen bringen, und prüfen die technische Lage Ihrer Website.' },
  { kicker: 'SCHRITT 2', titel: 'Technik und Struktur', text: 'Wir beseitigen Indexierungsfehler, verbessern die Core Web Vitals und die interne Verlinkung.' },
  { kicker: 'SCHRITT 3', titel: 'Inhalte und Autorität', text: 'Wir erstellen Inhalte nach Themen-Clustern und gewinnen hochwertige Links von angesehenen Portalen.' },
  { kicker: 'SCHRITT 4', titel: 'Messung in Google und KI', text: 'Positionen und Anfragen sehen Sie laufend im Kundenportal, die Sichtbarkeit in KI-Antworten messen wir wöchentlich (SEO Premium).' },
];

export const HOME_FAQ = [
  {
    id: 'was-macht-eine-ki-seo-agentur',
    frage: 'Was macht eine KI SEO Agentur eigentlich?',
    antwort: 'Wir arbeiten an drei Fronten gleichzeitig. Die technische ist der Zustand der Website: Kann die Suchmaschine sie indexieren, wie schnell lädt sie, gibt es Duplikate und fehlerhafte Weiterleitungen. Die inhaltliche ist die Antwort auf reale Suchanfragen: nicht eine Sammlung von Keywords, sondern Material, das das Problem des Lesers löst. Die dritte ist die Autorität, also ob andere Websites auf Sie verweisen. Dazu kommt bei einer KI SEO Agentur die Sichtbarkeit in den Antworten von ChatGPT, Gemini und Perplexity. Fehlt eine dieser Fronten, begrenzt das die Wirkung der anderen.',
  },
  {
    id: 'seo-agentur-auswaehlen',
    frage: 'Wie wähle ich eine SEO Agentur aus, und woran erkenne ich ein faires Angebot?',
    antwort: 'Verlangen Sie Daten statt Versprechen. Ein glaubwürdiger Partner zeigt Ihnen konkrete Ergebnisse aus der Search Console - Positionen vorher und nachher, mit den Keywords -, statt allgemein von „mehr Sichtbarkeit“ zu sprechen. Meiden Sie Garantien für Platz 1: Niemand kontrolliert den Google-Algorithmus, und eine solche Garantie bedeutet meist, auf Keywords zu zielen, die niemand eingibt. Fragen Sie außerdem, was nach dem Ende der Zusammenarbeit mit Zugängen und Daten geschieht: Sie sollten bei Ihnen bleiben.',
  },
  {
    id: 'was-die-agentur-tut',
    frage: 'Wie prüfe ich, was die Agentur in einem Monat tut?',
    antwort: 'Im Kundenportal, das Sie ab dem ersten Tag erhalten. Dort sehen Sie Daten aus der Google Search Console, Keyword-Positionen, Anfragen per Formular und Telefon, unser Arbeitsprotokoll mit Datum und eine kurze Beschreibung jeder Änderung am Code Ihrer Website. Freizugebende Punkte bestätigen Sie mit einem Klick. Die Oberfläche des Portals ist auf Polnisch und Englisch; dazu erhalten Sie einen Monatsbericht.',
  },
  {
    id: 'arbeit-im-dach-raum',
    frage: 'Arbeiten Sie mit Unternehmen aus dem DACH-Raum zusammen?',
    antwort: `Bisher betreuen wir Projekte auf Polnisch und Englisch, darunter unser eigenes Projekt ASE-BOT, das auf Englisch optimiert wird. Bei Auslandsmärkten recherchieren wir die Keywords für jedes Land getrennt: Eine polnische Liste Wort für Wort zu übersetzen funktioniert nicht, weil Menschen in verschiedenen Ländern dasselbe Bedürfnis anders ausdrücken. Anfragen aus dem DACH-Raum nehmen wir auf Deutsch, Englisch oder Polnisch entgegen. ${verweis('/seo-agentur-polen', 'SEO für den polnischen Markt')}.`,
  },
  {
    id: 'was-sie-zum-start-brauchen',
    frage: 'Was brauchen Sie von uns, um zu starten?',
    antwort: 'Zugriff auf die Google Search Console und Google Analytics: die einzigen Primärquellen für Daten zu Ihrer Domain. Hilfreich sind außerdem der Zugang zum CMS und Angaben zum Hosting, damit wir die Serverantwortzeit prüfen können. Am wichtigsten ist aber etwas außerhalb der Tools: die Liste der Fragen, die Ihre Kunden am häufigsten stellen. Sie ist das sauberste Signal für die Suchintention, das es gibt, und kein Keyword-Tool liefert sie Ihnen.',
  },
  {
    id: 'optimierung-fuer-chatgpt-und-google-ki',
    frage: 'Optimieren Sie Unternehmen auch für ChatGPT und die KI-Antworten in Google?',
    antwort: `Ja. Jede Woche stellen wir ChatGPT, Perplexity, Gemini und den KI-Antworten in Google die Fragen, die Ihre Kunden stellen, und prüfen, ob in den Antworten der Name oder die Website Ihres Unternehmens vorkommt. Anschließend gewinnen wir Erwähnungen in Quellen, die die Modelle zitieren. In SEO Premium ist das im Preis enthalten, zu SEO Standard kommen ${e(PREISE.geoZuschlag)} netto pro Monat hinzu. Die Methode beschreiben wir unter ${verweis('/pozycjonowanie-w-ai', 'Generative Engine Optimization (GEO)')}.`,
  },
];
