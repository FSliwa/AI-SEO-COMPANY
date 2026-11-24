// Texte fuer /de/kundenportal (Schluessel PL: /panel-klienta; Stand: 24.11.2026).
// Reiner ESM-Code ohne React. Preise aus lib/de/uslugiGemeinsam.js (PREISE), keine langen Gedankenstriche.
// Transparenzregel (synchron zu lib/de/uslugiGemeinsam.js:67 und components/PanelPageClient.jsx):
// Die Live-Oberflaeche unter https://panel.ai-seo-company.pl/demo ist auf Polnisch und Englisch verfuegbar
// und laesst sich sofort ohne Login oder Registrierung mit Beispieldaten oeffnen.

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const PORTAL_DEMO_URL = 'https://panel.ai-seo-company.pl/demo';

export const PORTAL_KURZANTWORT = `Das 24/7-Kundenportal von AI SEO COMPANY bündelt Ihre laufenden SEO-Ergebnisse und unsere tägliche Arbeit an einem Ort: tägliche Daten aus Google Search Console und GA4-Anfragen, wöchentliche Keyword-Rankings mit markierten Maßnahmen auf der Zeitachse, ein lückenloses Arbeitsprotokoll, 1-Klick-Freigaben, veröffentlichte Inhalte und geprüfte Backlinks, monatliche PDF-Berichte sowie in SEO Premium das wöchentliche KI-Monitoring (30 Käuferfragen pro Woche). Das Portal ist ab Tag 1 ohne Aufpreis in allen Paketen enthalten. Wichtig vorab: Die Live-Benutzeroberfläche ist auf Polnisch und Englisch verfügbar und kann unter panel.ai-seo-company.pl/demo sofort ohne Login oder Registrierung getestet werden.`;

export const PORTAL_MODULE = [
  {
    kicker: '01 / ANFRAGEN & RANKINGS',
    titel: 'Tägliche Google- & GA4-Anfragen plus Wochen-Zeitachse',
    text: 'Auf dem Startbildschirm sehen Sie Formular-, Telefon- und E-Mail-Anfragen aus Google (GA4), Ihr Monatsziel mit Prognose sowie Klicks und Impressionen aus der Search Console inklusive persönlicher Einordnung Ihres Betreuers. Im Ranking-Modul sind veröffentlichte Texte und neue Backlinks direkt auf der wöchentlichen Positionskurve markiert.',
    lieferung: ['GSC & GA4 nächtlich', 'Rankings je Woche', 'Ursache & Wirkung'],
  },
  {
    kicker: '02 / ARBEITSPROTOKOLL',
    titel: 'Lückenloser Tätigkeitsnachweis, Code-Historie & Freigaben',
    text: 'Jede Aufgabe erscheint im Arbeitsprotokoll mit Datum, Ergebnis, gebuchten Stunden und verantwortlicher Fachkraft. Technische Änderungen an Ihrer Website fasst das System verständlich aus der GitHub-Historie zusammen (vorab vom Team geprüft). Neue Fachtexte und Entwürfe geben Sie mit einem Klick frei oder kommentieren sie direkt.',
    lieferung: ['Stunden & Bearbeiter', 'Klartext-Changelog', '1-Klick-Freigabe'],
  },
  {
    kicker: '03 / KI-SUCHE, MAPS & LINKS',
    titel: '30 KI-Fragen pro Woche, 49-Punkte-Maps & Backlink-Prüfung',
    text: 'Jeden Montag prüfen wir 30 echte Käuferfragen in ChatGPT, Perplexity, Gemini und Google AI Overviews (in SEO Premium inklusive, in SEO Standard +115 € netto/Monat). Dazu kommen das 14-tägige 7x7-Kartenraster für Google Maps sowie die vollständige Liste aller aufgebauten Backlinks samt automatischem wöchentlichem Online-Check.',
    lieferung: ['30 KI-Prompts/Woche', '7x7-Maps-Gitter', 'Wöchentlicher Link-Check'],
  },
  {
    kicker: '04 / BERICHTE, API & DSGVO',
    titel: 'PDF-Archiv, Alarme, CSV/JSON-Export & Claude-MCP',
    text: 'Monatsberichte, Start-Audit und Rechnungen liegen jederzeit als PDF bereit. Automatische Alarme melden 30 % Klick-Rückgang, Positionsverluste oder 14 Tage ohne neuen Protokolleintrag. Alle Rohdaten lassen sich als CSV oder JSON exportieren oder per Read-Only-Token in Tabellen und Claude (MCP) einbinden - mandantengetrennt in der EU (Frankfurt).',
    lieferung: ['PDF, CSV & JSON', 'Read-Only API & MCP', 'EU-Datenbank Frankfurt'],
  },
];

export const PORTAL_ALLE_FUNKTIONEN = [
  'Übersicht: Organische Anfragen (Formular, Telefon, E-Mail), Monatsziel mit Prognose, Search-Console-Klicks und Kommentar des Account-Managers.',
  'Keyword-Positionen Woche für Woche: Zeitachse mit eingeblendeten Content-Veröffentlichungen und gewonnenen Backlinks.',
  'Arbeitsprotokoll (Work Log): Jede erledigte Maßnahme mit Datum, Ergebnis, Zeitaufwand und zuständiger Person.',
  'Website-Änderungen in Klartext: Verständliche Zusammenfassung technischer Code-Commits, redaktionell gegengelesen.',
  'Freigaben mit einem Klick: Artikel, Bilder und Seitenanpassungen direkt im Browser bestätigen oder Korrekturen anfordern.',
  'PDF-Berichte & Start-Audit: Dauerhaftes Archiv im geschützten Speicher zum jederzeitigen Herunterladen.',
  `Wöchentliche KI-Sichtbarkeit: Jeden Montag 30 Kundenfragen in ChatGPT, Perplexity, Gemini und AI Overviews (inklusive in SEO Premium oder +${e(PREISE.geoZuschlag)} netto/Monat zu SEO Standard).`,
  'Google Maps aus 49 Messpunkten: Alle 14 Tage Sichtbarkeitsprüfung Ihres Unternehmensprofils im 7x7-Raster rund um Ihre Adresse.',
  'Backlink-Verzeichnis mit Wochen-Check: Quell-URL, Datum, Linktyp und automatische Verfügbarkeitskontrolle - bleibt auch nach Vertragsende erhalten.',
  'Nachrichten & automatische Alarme: Themenbezogene Threads mit sichtbarer Antwortzeit sowie Warnungen bei 30 % Klickverlust oder 14 Tagen Arbeitspause.',
  'Rechnungen, Paketwechsel & Kündigung: PDF-Belege mit Zahlungsstatus, Tarifwechsel mit E-Mail-Bestätigung und Kündigung per E-Mail oder Button im Inhaberkonto.',
  'Datenexport, API & MCP: Ein-Klick-Download als CSV/JSON sowie schreibgeschütztes Token für Tabellenkalkulationen, Skripte und Claude MCP.',
];

export const PORTAL_VERGLEICH_ZEILEN = [
  [
    'Kundenanfragen aus Google & Kosten je Anfrage',
    'Einmal im Monat',
    'Selten enthalten',
    'Täglich aktuell im Portal',
  ],
  [
    'Wöchentliche Keyword-Positionen mit Maßnahmen auf der Zeitachse',
    'Einmal im Monat',
    'Nur Positionen ohne Maßnahmenbezug',
    'Ja, Ursache & Wirkung auf einer Achse',
  ],
  [
    'Arbeitsprotokoll mit Stunden & Klartext-Code-Änderungen',
    'Kurze Zusammenfassung',
    'Selten enthalten',
    'Ja, jeder Eintrag mit Datum & Person',
  ],
  [
    'Inhalts- und Änderungsfreigaben mit einem Klick',
    'Nein (per E-Mail-Anhang)',
    'Selten enthalten',
    'Ja, direkt im Freigabe-Modul',
  ],
  [
    'Wöchentliche Sichtbarkeit in ChatGPT, Gemini, Perplexity & AI Overviews',
    'Nein',
    'Nein',
    'Ja (SEO Premium / Zusatzoption)',
  ],
  [
    'Google-Maps-Positionen an 49 geografischen Punkten (7x7)',
    'Nein',
    'Nein',
    'Ja, Messung alle 14 Tage',
  ],
  [
    'Backlink-Liste mit automatischer wöchentlicher Live-Prüfung',
    'Statische Liste ohne Nachkontrolle',
    'Selten enthalten',
    'Ja, wöchentlicher Status-Check',
  ],
  [
    'Automatische Alarme bei Klick-Einbrüchen oder 14 Tagen Arbeitspause',
    'Nein',
    'Selten enthalten',
    'Ja, transparente Schwellenwerte',
  ],
  [
    'Nachrichten mit Antwortzeit, Rechnungen & Kündigungs-Button',
    'Nein',
    'Teilweise',
    'Ja, vollständig im Inhaberkonto',
  ],
  [
    'CSV- & JSON-Export, Read-Only-API und Claude-MCP-Anbindung',
    'Nein',
    'Nein',
    'Ja, jederzeit ohne Zusatzkosten',
  ],
  [
    'Offene Live-Demo ohne Login vor Vertragsunterschrift',
    'Nein',
    'Nein',
    'Ja (Oberfläche auf Polnisch & Englisch)',
  ],
];

export const PORTAL_PRUEFFRAGEN = [
  [
    'Sehen Sie konkrete Aufgaben mit Datum, Stunden und Bearbeiter?',
    'Pauschale Sätze wie „laufende Optimierung" belegen keine echte Leistung. In unserem Arbeitsprotokoll trägt jeder Eintrag ein Datum, das konkrete Ergebnis, die Stundenanzahl und den Namen der Person.',
  ],
  [
    'Sind Code-Änderungen, Inhalte und Backlinks offen einsehbar?',
    'Jede technische Anpassung sollte nachvollziehbar begründet sein und jeder Backlink mit exakter Quell-URL vorliegen. Im Portal sehen Sie beides, ergänzt um den automatischen Wochen-Check aller Links.',
  ],
  [
    'Zeigt das Portal echte Kundenanfragen statt nur Positionen?',
    'Reine Ranking-Tabellen verraten nicht, ob SEO Umsatzbeiträge liefert. Auf der Startansicht unseres Portals stehen die tatsächlichen Kontaktanfragen aus Google via Formular, Telefon und E-Mail.',
  ],
  [
    'Gibt es ein Monatsziel samt Prognose und automatischen Alarmen?',
    'Ohne vereinbartes Ziel fehlt der Maßstab. Im Portal steht das Monatsziel direkt neben der laufenden Prognose, während Alarme bei 30 % Klick-Rückgang oder wichtigen Positionsverlusten greifen.',
  ],
  [
    'Sehen Sie vorab, was im nächsten Monat geplant und freizugeben ist?',
    'Ihr Betreuer dokumentiert im Portal, was passiert ist, warum und welche Schritte folgen. Alle wartenden Artikel und Seitenänderungen liegen übersichtlich im Freigabe-Postfach.',
  ],
  [
    'Stammen die Zahlen direkt aus Ihren eigenen Google-Konten?',
    'Proprietäre Agentur-Scores lassen sich nicht unabhängig überprüfen. Unsere Klick-, Positions- und Anfragewerte kommen direkt aus Ihrer eigenen Google Search Console und Ihrem GA4-Property.',
  ],
];

export const PORTAL_FAQ = [
  {
    id: 'ist-das-kundenportal-im-preis-enthalten',
    frage: 'Ist das 24/7-Kundenportal in den monatlichen SEO-Paketen inklusive?',
    antwort: `Ja. Jedes Unternehmen mit SEO Standard (ab ${e(PREISE.standard)} netto/Monat), SEO Premium (${e(PREISE.premium)} netto/Monat) oder Booster Pack (${e(PREISE.booster)} netto/Monat) erhält ab dem ersten Tag vollen Zugang zum Kundenportal ohne Einrichtungsgebühr oder Aufpreis. Das Modul für wöchentliche KI-Sichtbarkeit (30 Fragen pro Woche) ist in SEO Premium fest enthalten und kann zu SEO Standard für +${e(PREISE.geoZuschlag)} netto monatlich ergänzt werden. Alle Tarife finden Sie unter ${verweis('/cennik-pozycjonowania', 'SEO Kosten')}.`,
  },
  {
    id: 'in-welcher-sprache-ist-das-portal-verfuegbar',
    frage: 'In welchen Sprachen ist die Benutzeroberfläche des Kundenportals verfügbar?',
    antwort: 'Die Live-Benutzeroberfläche des Portals steht aktuell auf Englisch und Polnisch zur Verfügung - für Teams im DACH-Raum schalten wir standardmäßig die englische Ansicht frei. Ihre deutschen Keywords, deutschsprachigen Fachtexte zur Freigabe sowie unsere direkte Projektkommunikation per E-Mail und Telefon laufen selbstverständlich auf Deutsch. Über die offene Demo ohne Login können Sie die Oberfläche vorab in Ruhe testen.',
  },
  {
    id: 'woher-stammen-die-daten-im-portal',
    frage: 'Woher bezieht das Kundenportal seine Traffic-, Ranking- und Anfrage-Daten?',
    antwort: 'Klicks, Impressionen und Keyword-Positionen stammen direkt aus Ihrer Google Search Console, organische Kontaktanfragen (Formularabsendungen, Telefon- und E-Mail-Klicks) aus Google Analytics 4 und die Änderungsprotokolle aus der Code-Historie auf GitHub. Das Portal synchronisiert jede Nacht automatisch; die Google Search Console liefert Daten systembedingt mit einem Versatz von 2 bis 3 Tagen.',
  },
  {
    id: 'wie-pruefe-ich-ob-eine-agentur-arbeitet',
    frage: 'Wie erkenne ich im Alltag, ob meine SEO-Agentur tatsächlich an meiner Seite arbeitet?',
    antwort: `Achten Sie auf drei überprüfbare Nachweise: ein fortlaufendes Arbeitsprotokoll mit Datum und Zeitaufwand, dokumentierte Änderungen an der Website sowie eine offene Liste gewonnener Backlinks inklusive Quell-URLs. Ein einzelner Monatsbericht reicht dafür selten aus - worauf es bei guten Berichten und bei der Agenturwahl ankommt, zeigen unsere kostenlose ${verweis('/narzedzia/raport-seo', 'SEO Report Vorlage')} und der Vergleich ${verweis('/porownania/jak-wybrac-agencje-seo', 'SEO Agentur finden & auswählen')}.`,
  },
  {
    id: 'wer-sieht-meine-unternehmensdaten-dsgvo',
    frage: 'Wer hat Zugriff auf meine Daten und wo wird die Datenbank gehostet?',
    antwort: 'Ausschließlich die von Ihnen benannten Personen Ihres Unternehmens sowie unser betreuendes Projektteam. Die Mandantentrennung wird direkt durch die Datenbank selbst erzwungen (Row-Level-Trennung), nicht nur über die Oberfläche. Gehostet wird die Datenbank innerhalb der Europäischen Union in Frankfurt am Main; die Anmeldung erfolgt wahlweise per Google-Konto oder mit E-Mail-Adresse und Passwort.',
  },
  {
    id: 'was-passiert-mit-daten-nach-kuendigung',
    frage: 'Was passiert mit meinen Berichten, Linklisten und Rohdaten nach Vertragsende?',
    antwort: 'Alle Daten bleiben bei Ihnen. Sämtliche monatlichen PDF-Berichte und das Start-Audit können Sie jederzeit herunterladen, und mit einem Klick exportieren Sie Positionen, Anfragen, Arbeitsprotokoll, Backlinks und KI-Messwerte vollständig als CSV- oder JSON-Datei. Da Google Search Console, Google Analytics 4 und das Google Unternehmensprofil auf Ihren eigenen Konten laufen, geht kein einziger historischer Messwert verloren.',
  },
];

export const PORTAL_QUELLEN = [
  {
    url: 'https://support.google.com/webmasters/answer/7576553?hl=de',
    nazwa: 'Google Search Console-Hilfe: Leistungsbericht für die Google-Suche (Klicks, Impressionen, durchschnittliche Position und Datenaktualität)',
    data: '2026-11-24',
  },
  {
    url: 'https://support.google.com/analytics/answer/9267735?hl=de',
    nazwa: 'Google Analytics 4-Hilfe: Ereignisse und Schlüsselergebnisse (generate_lead, Klick-Messung)',
    data: '2026-11-24',
  },
  {
    url: 'https://modelcontextprotocol.io/introduction',
    nazwa: 'Model Context Protocol (MCP): Offener Standard zur sicheren Anbindung externer Datenquellen an Sprachmodelle wie Claude',
    data: '2026-11-24',
  },
];
