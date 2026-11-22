// Texte für /de/ki-suchoptimierung/ki-sichtbarkeit-audit (Faza 2 DE, 22.11.2026; Schlüssel PL: /pozycjonowanie-w-ai/audyt-widocznosci).
// Fakten identisch mit lib/pytaniaAi.js (A5): 235 EUR netto einmalig (angerechnet auf den 1. Betreuungsmonat),
// 30 abgestimmte Kundenfragen in 4 Quellen (ChatGPT mit Websuche, Perplexity, Gemini, Google AI Overviews),
// Lieferzeit 5 Werktage, 45 Min. Besprechung, wöchentliches Monitoring +115 EUR netto/Monat (in SEO Premium inklusive).
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const STAND_AUDIT_AI_DE = '2026-11-22';

export const KI_AUDIT_DE = {
  okruszek: 'KI-Sichtbarkeit Audit',
  tag: 'Generative Engine Optimization · Audit & Monitoring',
  kurzantwort: `Ein KI-Sichtbarkeit Audit kostet bei uns einmalig ${e(PREISE.geoAudit)} netto und wird bei anschließender Zusammenarbeit vollständig auf den ersten Betreuungsmonat angerechnet. Wir stellen ChatGPT, Perplexity, Gemini und den Google AI Overviews 30 reale Kauf- und Vergleichsfragen Ihrer Zielgruppe, messen Ihren Nennungsanteil je Quelle, identifizieren die zitierten Drittseiten und liefern innerhalb von 5 Werktagen einen priorisierten 90-Tage-Maßnahmenplan inklusive 45-minütiger Ergebnisbesprechung. Das laufende wöchentliche Monitoring kostet ${e(PREISE.geoZuschlag)} netto pro Monat (im Paket SEO Premium bereits enthalten).`,
  lead: 'Bevor wir Texte umschreiben oder Verzeichniseinträge aufbauen, messen wir den Ist-Zustand: Bei welchen konkreten Fragen empfehlen KI-Systeme Ihr Unternehmen heute schon - wo nennen sie stattdessen Wettbewerber, und welchen externen Quellen vertrauen die Modelle dabei?',
  ctaAudit: `KI-Audit für ${e(PREISE.geoAudit)} netto anfragen`,
  ctaCheck: 'Zuerst 3 Fragen kostenlos testen',
  ergebnisPunkte: [
    'Anteil der Antworten mit Nennung Ihrer Marke oder Domain - getrennt ausgewiesen für ChatGPT, Perplexity, Gemini und Google AI Overviews',
    'Die 5 am häufigsten statt Ihres Unternehmens empfohlenen Wettbewerber je Themenfeld',
    'Vollständige Liste aller zitierten Drittseiten (Fachportale, Verzeichnisse, Vergleichsartikel, Google Maps), auf denen sich eine Präsenz lohnt',
    'Technische Prüfung Ihrer Website auf KI-Crawler-Zugang (robots.txt, 403-Firewall-Sperren, SSR-HTML ohne JavaScript)',
    '10 konkrete Maßnahmen in einem priorisierten 90-Tage-Umsetzungsplan plus 45 Minuten persönliche Besprechung per Video-Call',
  ],
  fragenTypen: [
    [
      '1. Direkte Anbieter-Empfehlungen (mit Branchen- und Ortsbezug)',
      'Fragen wie „Welche B2B-Agentur oder welchen Fachbetrieb in München kannst du für X empfehlen?“. Unsere API-Messung vom November 2026 zeigte: Bei solchen Empfehlungsfragen führten in ChatGPT 59 von 62 Quellenlinks zu Google Maps, während Perplexity Branchenverzeichnisse und Fachartikel heranzog.',
    ],
    [
      '2. Preis-, Budget- und Kostenfragen',
      'Fragen wie „Was kostet Leistung X für ein mittelständisches Unternehmen im Jahr 2026?“. Hier zitierte ChatGPT keine Karteneinträge, sondern ausschließlich Websites mit klar ausgewiesenen Preisspannen, Leistungsumfängen und Tabellen.',
    ],
    [
      '3. Vergleichs- und Entscheidungsfragen („A oder B“)',
      'Fragen wie „Lohnt sich Lösung A oder Lösung B für unseren Anwendungsfall?“. Wer diese Vergleiche auf der eigenen Domain sachlich mit Zahlen beantwortet, wird von Antwortmaschinen überdurchschnittlich oft als Primärquelle referenziert.',
    ],
  ],
  vergleichTabelle: {
    id: 'tabelle-check-vs-audit',
    caption: 'Unterschied zwischen kostenlosem Schnell-Check, KI-Sichtbarkeit Audit und wöchentlichem Monitoring',
    columns: [
      { key: 'merkmal', label: 'Kriterium' },
      { key: 'schnellcheck', label: 'Kostenloser KI-Check' },
      { key: 'audit', label: `KI-Sichtbarkeit Audit (${e(PREISE.geoAudit)} netto)` },
      { key: 'monitoring', label: `Wöchentliches Monitoring (+${e(PREISE.geoZuschlag)}/Mon.)` },
    ],
    rows: [
      { merkmal: 'Anzahl geprüfter Kundenfragen', schnellcheck: '3 Fragen (Sofort-Stichprobe)', audit: '30 individuell abgestimmte Kauf- & Preisfragen', monitoring: 'Dieselben 30 Fragen jede Woche im Zeitverlauf' },
      { merkmal: 'Geprüfte KI-Quellen', schnellcheck: 'ChatGPT, Gemini, Perplexity, Claude, AI Overviews', audit: 'ChatGPT (Websuche), Perplexity, Gemini, Google AI Overviews', monitoring: 'ChatGPT, Perplexity, Gemini, Google AI Overviews' },
      { merkmal: 'Zitierte Drittquellen & Wettbewerber', schnellcheck: 'Top-5-Überblick', audit: 'Vollständige Quellen-Matrix + Lückenanalyse', monitoring: 'Laufende Veränderung im Kundenportal 24/7' },
      { merkmal: 'Technischer KI-Crawler- & SSR-Check', schnellcheck: 'Separat über Online-Tool', audit: 'Enthalten inkl. Entwickler-Vorgaben', monitoring: 'Laufende Überwachung bei Website-Änderungen' },
      { merkmal: 'Konkreter Maßnahmenplan & Umsetzung', schnellcheck: 'Nein', audit: '90-Tage-Plan (10 Prioritäten) + 45 Min. Call', monitoring: '2 gezielte GEO-Maßnahmen pro Monat inklusive' },
      { merkmal: 'Anrechnung auf SEO-Paket', schnellcheck: 'Kostenlos (0 €)', audit: '100 % Anrechnung auf den 1. Monat der Betreuung', monitoring: 'In SEO Premium inklusive, monatlich kündbar' },
    ],
    przypis: 'Alle Preisangaben in Euro netto zzgl. gesetzlicher USt. Stand: November 2026.',
  },
  faq: [
    {
      id: 'wie-misst-man-ki-sichtbarkeit-serioes',
      frage: 'Wie lässt sich KI-Sichtbarkeit seriös messen, wenn Sprachmodelle jedes Mal leicht anders formulieren?',
      antwort: 'Ein einzelner Screenshot aus einem privaten Chat-Fenster ist wertlos, weil Personalisierung, Verlauf und Zufall die Formulierung verändern. Belastbar wird die Messung erst durch einen festen Satz von 30 realen Kundenfragen, die unter identischen API-Bedingungen (Standort, Sprache, aktivierte Websuche) über mehrere Quellen hinweg abgefragt und im Zeitverlauf verglichen werden.',
    },
    {
      id: 'warum-kostet-das-monitoring-nicht-tausende-euro',
      frage: 'Warum kostet das wöchentliche Monitoring bei Ihnen 115 € netto statt teurer Enterprise-Lizenzen?',
      antwort: 'Die reine Technik der API-Abfragen ist günstig: Eine Live-Abfrage mit Websuche kostet über unsere DataForSEO-Schnittstelle rund 0,030 USD bei ChatGPT und rund 0,006 USD bei Perplexity (Stand unserer Abrechnung vom 04.11.2026). Sie zahlen bei uns also nicht für künstlich aufgeblähte Software-Lizenzen, sondern für die saubere Auswahl der Kaufintents, die Quellenauswertung und zwei konkrete GEO-Umsetzungen pro Monat.',
    },
    {
      id: 'wird-der-audit-preis-angerechnet',
      frage: 'Wird der Preis von 235 € netto bei einer anschließenden Zusammenarbeit angerechnet?',
      antwort: `Ja. Wenn Sie sich nach dem Audit für eine laufende Betreuung in ${verweis('/cennik-pozycjonowania', 'SEO Standard oder SEO Premium')} entscheiden, ziehen wir die ${e(PREISE.geoAudit)} netto vollständig von der Rechnung des ersten Monats ab. Sie können das Audit aber ebenso gut als eigenständiges Dokument nutzen und die Empfehlungen intern umsetzen.`,
    },
    {
      id: 'garantieren-sie-empfehlungen-in-chatgpt',
      frage: 'Können Sie garantieren, dass ChatGPT unser Unternehmen nach dem Audit auf Platz 1 empfiehlt?',
      antwort: 'Nein - und vor solchen Versprechen warnen wir ausdrücklich. Kein externer Dienstleister kontrolliert die Gewichtung von OpenAI, Google oder Perplexity. Was wir verlässlich liefern, sind offene Zugänglichkeit für Such-Crawler, präzise strukturierte Angebots- und Preisseiten, Präsenz in den tatsächlich zitierten Branchenquellen und die transparente Erfolgskontrolle Woche für Woche.',
    },
    {
      id: 'wie-schnell-erhalte-ich-den-bericht',
      frage: 'Wie läuft das KI-Sichtbarkeit Audit zeitlich ab?',
      antwort: `Nach Ihrer Anfrage stimmen wir innerhalb eines Werktags die 30 wichtigsten Fragen Ihrer Zielgruppe ab (Empfehlungen, Preise, Vergleiche). Innerhalb von 5 Werktagen erhalten Sie den vollständigen Bericht mit allen Rohantworten, der Quellenmatrix und dem 90-Tage-Plan, den wir anschließend in einem 45-minütigen Termin gemeinsam durchgehen. Für einen schnellen ersten Eindruck vorab steht Ihnen unser ${verweis('/sprawdz-widocznosc-w-ai', 'kostenloser KI-Sichtbarkeit Check')} offen.`,
    },
  ],
  quellen: [
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Dokumentation der Crawler OAI-SearchBot, GPTBot und ChatGPT-User (Englisch)', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', nazwa: 'Google Search Central: Optimizing for generative AI features (Englisch)', data: '2026-11-18' },
    { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Google Search Console Hilfe: Leistungsbericht zu generativer KI (AI Overviews & AI Mode)', data: '2026-11-18' },
  ],
};
