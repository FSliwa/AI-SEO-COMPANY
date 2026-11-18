// Texte der NEUEN Seite /de/seo-agentur-polen (kein polnisches Gegenstueck). Nur Fakten, die bereits auf der Website stehen
// (Team in Warschau, SEO und GEO, Preise, Werkzeuge) plus eine externe Quelle mit Lesedatum.
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const POLEN_QUELLE = {
  text: 'StatCounter Global Stats: Marktanteil der Suchmaschinen in Polen, alle Plattformen',
  url: 'https://gs.statcounter.com/search-engine-market-share/all/poland',
  wert: '89,42 %',
  zeitraum: 'Oktober 2026',
  gelesen: '18.11.2026',
};

export const POLEN_GRUENDE = [
  { kicker: '01 / SPRACHE', titel: 'Polnische Keywords statt Übersetzung', text: 'Die Keyword-Recherche führen wir für jedes Land getrennt durch. Eine polnische Liste Wort für Wort zu übersetzen (oder umgekehrt eine deutsche ins Polnische) funktioniert nicht, weil Menschen in verschiedenen Ländern dasselbe Bedürfnis anders formulieren.' },
  { kicker: '02 / TEAM VOR ORT', titel: 'Ein Team in Warschau', text: 'Wir sitzen in Warschau, arbeiten täglich im polnischen Suchmarkt und betreuen Projekte auf Polnisch und Englisch.' },
  { kicker: '03 / SEO UND KI', titel: 'Google und KI-Antworten', text: 'Wir verbinden klassisches SEO mit der Messung der Sichtbarkeit in ChatGPT, Gemini und Perplexity. Dieselben Grundlagen entscheiden, ob ein Unternehmen in Google rankt und in KI-Antworten genannt wird.' },
  { kicker: '04 / MESSBAR', titel: 'Berichte und Kundenportal', text: 'Klicks und Impressionen aus der Google Search Console, Keyword-Positionen und ein Arbeitsprotokoll sehen Sie im Kundenportal (Oberfläche auf Polnisch und Englisch). Dazu kommt ein Monatsbericht.' },
];

export const POLEN_SCHRITTE = [
  ['Audit der Ausgangslage', 'Wir prüfen Ihre bestehende Website oder die geplante Struktur für den polnischen Markt: Indexierbarkeit, Struktur der Sprachversionen, Ladezeit, Core Web Vitals.'],
  ['Polnische Keywords', 'Wir recherchieren die Suchbegriffe, die polnische Kunden tatsächlich verwenden, mit Blick auf Suchintention und Wettbewerb, und legen die Keywords pro Seite fest.'],
  ['Inhalte auf Polnisch', 'Wir erstellen Inhalte nach Themen-Clustern, die die Fragen polnischer Nutzer beantworten, statt bestehende Texte zu übersetzen.'],
  ['Technik und Sprachversionen', 'Wir richten die Sprachversionen sauber ein (hreflang, Canonical-Tags, URL-Struktur) und beseitigen technische Hürden für die Indexierung.'],
  ['Linkaufbau und Google Unternehmensprofil', 'Wir gewinnen redaktionelle Links und pflegen, wo es zum Geschäft passt, das Google Unternehmensprofil mit Beiträgen und Antworten auf Bewertungen.'],
  ['Reporting', 'Sie sehen Positionen, Klicks und Anfragen laufend im Kundenportal und erhalten monatlich einen Bericht mit Schlussfolgerungen.'],
];

export const POLEN_FAQ = [
  {
    id: 'warum-polnische-keywords',
    frage: 'Reicht es, meine deutschen Inhalte ins Polnische zu übersetzen?',
    antwort: 'Meist nicht. Wir recherchieren die Keywords für Polen getrennt, weil polnische Kunden dasselbe Bedürfnis anders formulieren als deutschsprachige. Die Inhalte entstehen für die polnische Suchintention, und aus dem Audit ergibt sich, was Sie aus Ihrer bestehenden Website übernehmen können.',
  },
  {
    id: 'domain-fuer-polen',
    frage: 'Brauche ich für Polen eine eigene Domain?',
    antwort: 'Das hängt von Ihrer Struktur und Ihren Zielen ab. Möglich sind ein Sprachverzeichnis auf Ihrer bestehenden Domain, eine Subdomain oder eine eigene .pl-Domain. Wir bewerten das im Audit. Wichtig sind in jedem Fall eine saubere Kennzeichnung der Sprachversionen mit hreflang und eigenständig erarbeitete polnische Inhalte.',
  },
  {
    id: 'dauer-polen',
    frage: 'Wann sehe ich die ersten Ergebnisse in Polen?',
    antwort: 'Erste Bewegungen in der Sichtbarkeit zeigen sich meist nach 4 bis 8 Wochen, sobald Google die technischen Korrekturen und neuen Inhalte erneut gecrawlt hat. Eine neue Domain beginnt ohne Historie, deshalb ist sie bei unserer Zielvereinbarung (Top 3) ausdrücklich eine Ausnahme. Ein Beispiel aus unseren Projekten: 7,71 Tsd. Impressionen in 92 Tagen bei einer Domain ohne Historie, aber nur 28 Klicks (ASE-BOT, Google Search Console, 22.05.–21.08.2026).',
  },
  {
    id: 'kosten-polen',
    frage: 'Was kostet SEO für den polnischen Markt?',
    antwort: `Es gelten unsere regulären Pakete: SEO Standard ab ${e(PREISE.standard)} netto pro Monat, SEO Premium ${e(PREISE.premium)} netto pro Monat, Booster Pack mit neuer Website ${e(PREISE.booster)} netto pro Monat (mindestens 3 Monate). Ein SEO Audit kostet als eigenständige Leistung ab ${e(PREISE.audit)} netto. ${verweis('/cennik-pozycjonowania', 'Alle Preise und den Leistungsumfang finden Sie unter SEO Kosten')}.`,
  },
  {
    id: 'google-unternehmensprofil-polen',
    frage: 'Betreuen Sie auch das Google Unternehmensprofil in Polen?',
    antwort: 'Ja. Optimierung des Google Unternehmensprofils und lokales SEO sind in jedem unserer Pakete enthalten. Für Unternehmen mit Standort oder Kundenstamm in einer polnischen Stadt ist das oft die schnellste Quelle erster Anfragen.',
  },
  {
    id: 'ki-sichtbarkeit-polen',
    frage: 'Kann ich prüfen, ob KI-Assistenten meine Marke in Polen nennen?',
    antwort: `Ja. Wir messen die Sichtbarkeit in ChatGPT, Gemini, Perplexity und den KI-Antworten in Google, in SEO Premium wöchentlich. Das ${verweis('/pozycjonowanie-w-ai', 'KI-Sichtbarkeit Audit')} kostet ${e(PREISE.geoAudit)} netto und wird auf den ersten Monatsbeitrag angerechnet.`,
  },
];
