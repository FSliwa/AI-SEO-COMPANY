// Daten für den deutschen Leitfaden /de/seo-agentur-wechseln (Schlüssel PL: /zmiana-agencji-seo, 22.11.2026).
// Reiner ESM-Modulcode ohne 'use client': speist sowohl das HowTo-JSON-LD in app/[locale]/zmiana-agencji-seo/page.js
// als auch die Serverkomponente components/de/SeoAgenturWechselnDe.jsx.
// Exakt 32 Prüfpunkte (synchron zu CHECKLIST_COUNT in lib/agencySwitch.js), zugeschnitten auf Unternehmen im DACH-Raum.

import { CHECKLIST_COUNT as PL_CHECKLIST_COUNT } from '../agencySwitch.js';
import { verweis } from './uslugiGemeinsam.js';

export const STAND_WECHSEL_DE = '2026-11-22';

export const WECHSEL_KURZANTWORT = 'Wenn Sie strukturiert die SEO Agentur wechseln, gehen Ihre Google-Positionen nicht verloren: Einbrüche nach einer Kündigung entstehen fast immer durch Google-Konten auf fremden Agentur-Logins, gelöschte Mietlinks oder überschriebene Weiterleitungen. Sichern Sie zuerst Ihre Inhaberrechte und 16 Monate Search-Console-Daten, prüfen Sie Kündigungsfrist sowie AVV-Beendigung nach Art. 28 DSGVO und arbeiten Sie unsere 6 Schritte samt 32-Punkte-Liste ab.';

export const VERTRAG_PRUEFPUNKTE_DE = [
  [
    'Kündigungsfrist & Stichtag',
    'Prüfen Sie die exakte Frist (z. B. 1 oder 3 Monate) und ob sie ab Zugang der Erklärung oder erst zum Monats- bzw. Quartalsende läuft. Ein einziger Werktag Verzug kann den Vertrag um eine volle Periode verlängern.',
  ],
  [
    'Automatische Verlängerung',
    'Kontrollieren Sie bei 6-, 12- oder 24-Monats-Verträgen, bis zu welchem Datum Ihr Kündigungsschreiben eingehen muss, damit sich die Laufzeit nicht stillschweigend um ein weiteres Jahr verlängert.',
  ],
  [
    'Ausstiegsgebühren & Rabatte',
    'Prüfen Sie AGB und Einzelvertrag auf Deaktivierungsgebühren, Vertragsstrafen oder Klauseln zur Nachberechnung von Laufzeitrabatten bei vorzeitiger Beendigung.',
  ],
  [
    'Urheber- & Nutzungsrechte',
    'Klären Sie schriftlich, ob Ihr Unternehmen die zeitlich und räumlich unbeschränkten Nutzungsrechte an allen bezahlten Fachtexten, Fotos und Grafiken erhält - häufig greift der Rechteübergang erst nach Zahlung der Schlussrechnung.',
  ],
  [
    'Backlinks nach Vertragsende',
    'Trennen Sie dauerhafte redaktionelle Verlinkungen von gemieteten Agentur-Linknetzwerken. Mietlinks ohne rel="sponsored" verstoßen gegen Googles Spam-Richtlinien: Fällt ein solches Mietnetzwerk weg, verschwindet ein Abstrafungsrisiko, kein echter Markenwert.',
  ],
  [
    'AVV nach Art. 28 DSGVO / nDSG',
    'Hatte die Agentur Zugriff auf CMS, Server-Logs, Tag Manager oder GA4, regelt der Auftragsverarbeitungsvertrag (Art. 28 Abs. 3 lit. g DSGVO bzw. Art. 9 Schweizer nDSG) die Pflicht zur Löschung oder Rückgabe personenbezogener Daten sowie den Entzug aller Unterauftragsverarbeiter zum Vertragsende.',
  ],
];

export const WECHSEL_SCHRITTE_DE = [
  {
    title: 'Google-Konten und Domain vor der Kündigung übernehmen',
    text: 'Prüfen Sie vor dem Versand der Kündigung, wer als primärer Inhaber bzw. Administrator in Google Search Console, GA4, Tag Manager, Google Unternehmensprofil, Google Ads und beim Domain-Registrar eingetragen ist. Nach ausgesprochener Kündigung sinkt die Reaktionsgeschwindigkeit vieler Dienstleister spürbar.',
  },
  {
    title: 'Messdaten, Berichte und Backlink-Listen vollständig sichern',
    text: 'Laden Sie sämtliche Monatsberichte, das Änderungsprotokoll, die Keyword-Historie, die vollständige Backlink-Liste inklusive etwaiger Disavow-Dateien sowie Ihren 16-Monats-Export aus der Search Console herunter. Ohne diese Historie startet jede neue Agentur unnötig bei null.',
  },
  {
    title: 'Form- und fristgerecht kündigen samt AVV-Widerruf',
    text: 'Senden Sie die Kündigung exakt in der vertraglich geforderten Form (Textform per E-Mail mit Eingangsbestätigung oder Schriftform per Einschreiben) und fordern Sie zugleich zum Vertragsende die Lösch- bzw. Rückgabebestätigung gemäß Auftragsverarbeitungsvertrag (Art. 28 DSGVO / nDSG) an.',
  },
  {
    title: 'Website, Weiterleitungen und Tracking in der Restlaufzeit schützen',
    text: 'Erstellen Sie zu Beginn der Kündigungsfrist ein vollständiges Backup von Website, Datenbank, robots.txt, Sitemap, 301-Weiterleitungen und GTM-Containern. Vereinbaren Sie schriftlich, dass bis zum Stichtag keine Änderungen mehr ohne Ihre ausdrückliche Freigabe live gehen.',
  },
  {
    title: 'Am Stichtag alle Agentur-Zugänge entziehen und Passwörter ändern',
    text: 'Entfernen Sie am letzten Vertragstag sämtliche E-Mail-Adressen der Agentur aus Search Console, GA4, Tag Manager, Unternehmensprofil und CMS, lösen Sie die Verknüpfung zum Google-Ads-Verwaltungskonto (MCC) und rotieren Sie Hosting-, Datenbank-, SFTP- und API-Passwörter.',
  },
  {
    title: 'Rankings, Klicks und Backlinks 8 Wochen lang kontrollieren',
    text: 'Vergleichen Sie nach dem Stichtag acht Wochen lang wöchentlich Klicks, Impressionen, Indexierungsstatus und wichtige Backlinks in der Search Console. Ein plötzlicher Knick hat fast immer eine klare technische Ursache (entfernte Links, geänderte Canonicals oder gelöschte 301-Regeln), die sich rasch abfangen lässt.',
  },
];

export const CHECKLISTE_32_DE = [
  {
    id: 'checkliste-google-konten',
    titel: '1. Google-Konten & Werbezugänge (Punkte 01-08)',
    beschreibung: 'Alle Analyse- und Standortkonten müssen dauerhaft einer geschäftlichen Adresse Ihres Unternehmens gehören.',
    zeilen: [
      ['01', 'Google Search Console', 'Sie sind als bestätigter Inhaber (DNS-Eintrag oder HTML-Datei auf Ihrem Server) hinterlegt, nicht nur als eingeschränkter Nutzer.'],
      ['02', 'Google Analytics 4 (GA4)', 'Ihr Firmenkonto besitzt die Rolle „Administrator“ sowohl auf Konto-Ebene als auch auf Property-Ebene.'],
      ['03', 'Google Tag Manager', 'Sie verfügen über Administratorrechte auf Konto-Ebene sowie über Veröffentlichungsrechte in allen aktiven Containern.'],
      ['04', 'Google Unternehmensprofil', 'Ihr Unternehmen ist als „Primärer Inhaber“ des Standorteintrags eingetragen (nicht lediglich als Verwalter).'],
      ['05', 'Google Ads & MCC-Trennung', 'Ihr eigenes Zahlungsprofil und Ihr Admin-Login sind hinterlegt; zum Vertragsende trennen Sie die Verknüpfung zum Agentur-Verwaltungskonto (MCC).'],
      ['06', 'Google Merchant Center', 'Bei Online-Shops: Ihr Firmenkonto hält volle Administratorrechte auf das Merchant Center und die Produktfeeds.'],
      ['07', 'Geschäftliche Inhaber-E-Mail', 'Sämtliche Konten laufen auf eine zentrale Firmenadresse (z. B. marketing@ihre-firma.de), niemals auf private Gmail-Postfächer externer Betreuer.'],
      ['08', 'Vollständige Benutzerliste', 'Sie haben für jedes Konto dokumentiert, welche externen Personen Zugriff haben, um diese am Stichtag lückenlos zu entfernen.'],
    ],
  },
  {
    id: 'checkliste-domain-cms',
    titel: '2. Domain, DNS, Hosting & CMS-/Code-Rechte (Punkte 09-15)',
    beschreibung: 'Technische Souveränität über Server, Quellcode und Weiterleitungen verhindert Ausfälle am Übergabetag.',
    zeilen: [
      ['09', 'Domain-Inhaberschaft', 'Die Domain ist beim Registrar auf Ihr Unternehmen (DENIC, nic.at, SWITCH o. Ä.) registriert und Sie kennen die Login-Daten zum Kundenmenü.'],
      ['10', 'Hosting- & DNS-Zugriff', 'Sie haben direkten administrativen Zugriff auf Webhosting, Cloud-Plattform und DNS-Zoneneinträge.'],
      ['11', 'CMS-Administratorrechte', 'Sie besitzen ein vollwertiges Administrator-Konto im CMS (z. B. WordPress, Webflow, Shopify), nicht nur ein Redakteurs-Konto.'],
      ['12', 'Aktuelles Voll-Backup', 'Eine frische Sicherung aller Website-Dateien und der Datenbank liegt außerhalb der Agentur auf Ihrem eigenen Speicher.'],
      ['13', 'Quellcode & Git-Repository', 'Wurde die Website von der Agentur entwickelt, liegt der vollständige Quellcode in Ihrem eigenen Git-Repository oder als übergebene Kopie vor.'],
      ['14', '301-Weiterleitungen', 'Alle bestehenden 301-Weiterleitungen aus früheren Relaunches sind dokumentiert und bleiben dauerhaft auf Ihrem Server aktiv.'],
      ['15', 'robots.txt & sitemap.xml', 'Beide Steuerdateien liegen direkt auf Ihrem eigenen Server und werden beim Ausscheiden der Agentur nicht überschrieben oder gesperrt.'],
    ],
  },
  {
    id: 'checkliste-texte-urheberrechte',
    titel: '3. Texte, Medien & Urheberrechte (Punkte 16-20)',
    beschreibung: 'Stellen Sie sicher, dass bezahlte Leistungsseiten, Ratgeber und Bilder rechtlich wie technisch bei Ihnen verbleiben.',
    zeilen: [
      ['16', 'Nutzungsrechte im Vertrag', 'Der Vertrag überträgt Ihnen schriftlich die dauerhaften Nutzungs- und Bearbeitungsrechte an Texten, Fotos und Grafiken (Rechnungsausgleich prüfen).'],
      ['17', 'Inventar neuer Unterseiten', 'Ihnen liegt eine vollständige Liste aller von der Agentur veröffentlichten Ratgeber- und Leistungsseiten samt URL und Datum vor.'],
      ['18', 'Externe Fach- & Gastartikel', 'Sie wissen genau, auf welchen Fachportalen externe Artikel veröffentlicht wurden und ob diese nach Vertragsende dauerhaft online bleiben.'],
      ['19', 'Eigenes Medien-Hosting', 'Alle eingebundenen Bilder, Grafiken, PDFs und Videos liegen auf Ihrem eigenen Server und nicht auf einem fremden Agentur-CDN.'],
      ['20', 'Profil- & Verzeichnistexte', 'Beschreibungstexte aus Ihrem Google Unternehmensprofil und aus B2B-Branchenverzeichnissen sind lokal bei Ihnen gesichert.'],
    ],
  },
  {
    id: 'checkliste-backlinks-disavow',
    titel: '4. Backlink-Liste, Linkmiete-Prüfung & Disavow-Datei (Punkte 21-26)',
    beschreibung: 'Trennen Sie wertvolle Empfehlungslinks sauber von riskanten Mietnetzwerken.',
    zeilen: [
      ['21', 'Vollständige Backlink-Liste', 'Sie haben die komplette Aufstellung aller aufgebauten Links erhalten: verlinkende Quell-URL, Ziel-URL auf Ihrer Website, Ankertext und Datum.'],
      ['22', 'Linkmiete & PBN aussortieren', 'Sie prüfen, welche Links dauerhaft sind und welche aus gemieteten Agentur-Netzwerken stammen (Linkmiete verstößt gegen Google-Spam-Regeln - niemals übernehmen).'],
      ['23', 'Kein Löschvorbehalt', 'Ihr Vertrag sieht nicht vor, dass regulär bezahlte redaktionelle Verlinkungen oder Verzeichniseinträge nach Vertragsende entfernt werden.'],
      ['24', 'Stichprobe von 10 Links', 'Sie haben mindestens 10 zufällig ausgewählte Verlinkungen aus den Berichten manuell im Browser auf aktiven Bestand geprüft.'],
      ['25', 'Search-Console-Linkexport', 'Am Tag vor dem Vertragsende speichern Sie den kompletten Bericht „Links“ direkt aus Ihrer Google Search Console als Referenzdatei.'],
      ['26', 'Google-Disavow-Datei', 'Sie haben schriftlich abgefragt, ob jemals eine Disavow-Datei (für ungültig erklärte Links) eingereicht wurde, und besitzen deren aktuelle .txt-Kopie.'],
    ],
  },
  {
    id: 'checkliste-daten-avv',
    titel: '5. Berichte, Kündigungsfrist & AVV-Widerruf nach Art. 28 DSGVO (Punkte 27-32)',
    beschreibung: 'Sichern Sie Ihre Datenhistorie und schließen Sie den Wechsel technisch wie datenschutzrechtlich sauber ab.',
    zeilen: [
      ['27', 'Archiv aller Monatsberichte', 'Alle monatlichen SEO-Berichte und Audit-Dokumente der gesamten Vertragslaufzeit sind lokal in Ihrem Unternehmensordner gespeichert.'],
      ['28', 'Keyword- & Ranking-Historie', 'Sie haben den Export aller überwachten Ziel-Keywords inklusive historischem Positionsverlauf als CSV oder Excel gesichert.'],
      ['29', '16-Monats-Export GSC & GA4', 'Sie sichern einen kompletten 16-Monats-Leistungsexport aus der Google Search Console sowie wichtige Jahresvergleiche aus GA4.'],
      ['30', 'Änderungs- & Backlog-Liste', 'Ihnen liegt die Liste bereits umgesetzter technischer Eingriffe sowie noch offener Empfehlungen für das Folgeteam vor.'],
      ['31', 'Conversion-Setup & AVV-Ende', 'Alle Conversion-Events (generate_lead, Telefonklicks) sind dokumentiert und die Beendigung des AVV nach Art. 28 DSGVO (bzw. nDSG) inkl. Datenlöschung ist bestätigt.'],
      ['32', 'Zugangsentzug & Passwortwechsel', 'Nach Vertragsende sind alle Agentur-Nutzer entfernt und sämtliche Passwörter, SFTP-Zugänge sowie API-Schlüssel frisch rotiert.'],
    ],
  },
];

export const CHECKLISTE_32_ANZAHL = CHECKLISTE_32_DE.reduce((summe, gruppe) => summe + gruppe.zeilen.length, 0);

if (process.env.NODE_ENV !== 'production' && CHECKLISTE_32_ANZAHL !== PL_CHECKLIST_COUNT) {
  console.warn(`seoAgenturWechseln.js: Anzahl ${CHECKLISTE_32_ANZAHL} weicht von PL ${PL_CHECKLIST_COUNT} ab`);
}

export const WECHSEL_FAQ_DE = [
  {
    id: 'fallen-rankings-beim-wechsel',
    frage: 'Fallen meine Google-Rankings, wenn wir die SEO Agentur wechseln?',
    antwort: 'Nein, ein Agenturwechsel als solcher löst bei Google keinen Rankingverlust aus. Sinkt die Sichtbarkeit nach Vertragsende plötzlich, steckt fast immer eine konkrete technische Ursache dahinter: gemietete Links aus einem Agentur-Netzwerk wurden abgeschaltet, bezahlte Texte oder 301-Weiterleitungen wurden entfernt oder Tracking- und Canonical-Tags verändert. Bleiben Konten, Inhalte, Technik und dauerhafte Links in Ihrer Hand, laufen Ihre Rankings nahtlos weiter.',
  },
  {
    id: 'wann-kuendigung-senden',
    frage: 'Wann sollte ich die Kündigung an die bisherige SEO-Agentur absenden?',
    antwort: 'Erst nachdem Sie Ihre Inhaber- und Administratorrechte in Google Search Console, GA4, Tag Manager, Unternehmensprofil und beim Domain-Registrar geprüft sowie historische Berichte heruntergeladen haben - aber mit ausreichendem Sicherheitspuffer vor dem vertraglichen Stichtag. Senden Sie die Kündigung in der vertraglich vereinbarten Form und bewahren Sie den Zustellnachweis auf.',
  },
  {
    id: 'darf-agentur-konten-behalten',
    frage: 'Darf die Agentur meine Google Search Console oder mein GA4-Konto einbehalten?',
    antwort: 'Wurden die Konten ursprünglich unter einer E-Mail-Adresse der Agentur angelegt, hat die Agentur faktisch die technische Kontrolle, bis sie Ihnen Inhaberrechte überträgt. In der Google Search Console können Sie sich jedoch jederzeit selbst als bestätigter Inhaber eintragen, solange Sie Zugriff auf DNS oder Webserver Ihrer eigenen Domain besitzen. Prüfen Sie sämtliche Konten deshalb zwingend vor dem Versand der Kündigung.',
  },
  {
    id: 'google-unternehmensprofil-zurueckholen',
    frage: 'Wie erhalte ich den Zugriff auf mein Google Unternehmensprofil von einer Agentur zurück?',
    antwort: 'Fordern Sie die Agentur zunächst schriftlich auf, Ihrem Firmenkonto die Rolle „Primärer Inhaber“ im Google Unternehmensprofil zu übertragen. Reagiert die Agentur nicht oder verweigert sie die Übergabe, nutzen Sie den offiziellen Google-Prozess zur Eigentumsübertragung: Der bisherige Inhaber hat wenige Tage Zeit zu antworten; bleibt eine Reaktion aus, können Sie die Inhaberschaft Ihres Standorts in der Regel selbst bestätigen.',
  },
  {
    id: 'avv-widerruf-dsgvo-ndsg',
    frage: 'Was muss ich beim Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO / nDSG) zum Vertragsende beachten?',
    antwort: 'Endet der Hauptvertrag, entfällt auch die Rechtsgrundlage für den Zugriff der Agentur auf personenbezogene Daten in Ihrem CMS, auf Server-Logs oder in Analyse-Tools. Fordern Sie gemäß Art. 28 Abs. 3 lit. g DSGVO (bzw. Art. 9 Schweizer nDSG) schriftlich die Löschung oder Rückgabe gespeicherter personenbezogener Daten zum Stichtag an und entziehen Sie am letzten Vertragstag alle technischen Logins. Zur Prüfung eines Neuvertrags hilft unsere kostenlose ' + verweis('/narzedzia/umowa-na-pozycjonowanie', 'SEO Vertrag Checkliste') + '.',
  },
  {
    id: 'was-prueft-30-minuten-check',
    frage: 'Was genau prüfen Sie im kostenlosen 30-Minuten-Check nach unserer bisherigen Agentur?',
    antwort: 'In einem 30-minütigen Online-Termin gehen wir gemeinsam auf Ihren eigenen Konten die kritischsten Punkte durch: Inhaberschaft von Search Console, GA4 und Unternehmensprofil, Struktur der aufgebauten Backlinks (dauerhaft vs. Mietlinks), bestehende Inhalte sowie den 16-Monats-Verlauf von Klicks und Positionen. Sie erhalten eine klare To-do-Liste vor der Kündigung - unverbindlich, ohne Verkaufsdruck und ohne juristische Vertragsprüfung.',
  },
];

export const WECHSEL_QUELLEN_DE = [
  {
    url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de',
    nazwa: 'Google Search Central: Brauche ich einen SEO-Experten? (Verantwortung für Änderungen und Kontenhoheit)',
    data: '2026-11-22',
  },
  {
    url: 'https://support.google.com/business/answer/4566671?hl=de',
    nazwa: 'Google Unternehmensprofil-Hilfe: primäre Inhaberschaft eines Unternehmensprofils übertragen oder anfordern',
    data: '2026-11-22',
  },
  {
    url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de',
    nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (gekaufte und gemietete Links)',
    data: '2026-11-22',
  },
  {
    url: 'https://support.google.com/webmasters/answer/2648487?hl=de',
    nazwa: 'Google Search Console-Hilfe: Links für Ihre Website für ungültig erklären (Disavow-Tool)',
    data: '2026-11-22',
  },
  {
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de',
    nazwa: 'EUR-Lex: Datenschutz-Grundverordnung (DSGVO), Art. 28 Abs. 3 lit. g (Pflichten bei Beendigung der Auftragsverarbeitung)',
    data: '2026-11-22',
  },
];
