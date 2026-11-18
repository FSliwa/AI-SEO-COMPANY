// Gemeinsame Daten der deutschen Leistungsseiten (Gruppe de-uslugi): Preise, Kontakt, Pakete, Verweise.
// Reiner ESM-Code ohne React. Preise in EUR netto aus den EN-Werten im Code (components/ServiceSchema.jsx,
// messages/en.json, Pricing.jsx); es wurde NICHT umgerechnet (kein NBP-Kurs noetig).
import { hrefDe } from '../stronyDe.js';
import { eur } from '../formatDe.js';
import { CENY } from '../narzedziaLiczby.js';
import { BIURO, SIEDZIBA, adresLinia } from '../firma.js';

export const PREISE = {
  standard: CENY.seoStandard.eur, // SEO Standard, netto / Monat (450)
  premium: CENY.seoPremium.eur, // SEO Premium, netto / Monat (590)
  booster: CENY.boosterPack.eur, // Booster Pack, netto / Monat, mind. 3 Monate (590)
  audit: CENY.audytSeo.eur, // SEO Audit als eigenstaendige Leistung, ab, netto (350)
  geoAudit: CENY.audytAi.eur, // KI-Sichtbarkeit Audit, netto (235)
  geoZuschlag: 115, // Zuschlag zu SEO Standard, netto / Monat (EN-Wert aus ServiceSchema/GeoPageClient)
  website: CENY.strona.eur, // Website ab, netto einmalig (1400)
};

export const KONTAKT = { tel: '+48 518 815 055', telHref: 'tel:+48518815055', mail: 'kontakt@ai-seo-company.pl' };

export const FIRMA = {
  marke: 'AI SEO COMPANY',
  rechtsname: 'AI SIGNALS COMPANY Prosta Spółka Akcyjna',
  // Sitz der Gesellschaft (KRS); Büroanschrift separat (beide aus lib/firma.js).
  strasse: SIEDZIBA.ulica,
  ort: `${SIEDZIBA.kod} Warschau, Polen`,
  buero: `${adresLinia(BIURO, 'de')}, Polen`,
  gericht: 'Sąd Rejonowy dla m.st. Warszawy w Warszawie (Amtsgericht für die Hauptstadt Warschau)',
  krs: '0001239983',
  nip: '5253090237',
  regon: '544761611',
};

export const STAND_PREISE = 'November 2026';
export const PREIS_HINWEIS = 'Alle Preise in Euro, netto zuzüglich gesetzlicher Umsatzsteuer. Stand: November 2026.';

/** Interner Link als HTML-String fuer FAQ-Antworten; ohne deutsche Zielseite nur der Text (nie ein toter Link). */
export function verweis(schluesselPl, text) {
  const h = hrefDe(schluesselPl);
  return h ? `<a href="${h}" style="text-decoration:underline">${text}</a>` : text;
}

const e = (n) => eur(n, 'de');

/** FAQ-Eintraege fuer AppleFaq: Deutsch steht in questionEn/answerEn, weil die Komponente fuer lang !== 'pl' diese Felder liest. */
export function faqFuerAppleFaq(liste) {
  return liste.map((f) => ({
    id: f.id,
    idEn: f.id,
    question: f.frage,
    questionEn: f.frage,
    answer: f.antwort,
    answerEn: f.antwort,
  }));
}

export const PAKETE = [
  {
    schluessel: 'standard',
    name: 'SEO Standard',
    preis: e(PREISE.standard),
    vorab: 'ab',
    zeitraum: 'netto / Monat',
    kategorie: 'SEO',
    text: 'SEO für Ihre Website mit flexiblem Monatsvertrag und jederzeitiger Kündigung.',
    punkte: [
      ['panel', 'Kundenportal rund um die Uhr: Daten aus Google, Anfragen und Arbeitsprotokoll (Oberfläche auf Polnisch und Englisch)'],
      ['audyt', 'Umfassender SEO Audit und Konkurrenzanalyse'],
      ['tech', 'Technische Basisoptimierung der Website'],
      ['pin', 'Google Unternehmensprofil: Optimierung, zwei Beiträge pro Monat, Antworten auf Bewertungen'],
      ['warstwy', 'Bis zu 20 Keywords, 2 Inhalte und 2 Links pro Monat'],
      ['ai', `KI-Sichtbarkeit (ChatGPT, Google): Zusatzoption +${e(PREISE.geoZuschlag)} netto / Monat`],
      ['wykres', 'Monatlicher Bericht zu Positionen und Traffic'],
      ['tarcza', 'Jederzeit kündbar'],
    ],
    cta: 'Paket wählen',
  },
  {
    schluessel: 'premium',
    name: 'SEO Premium',
    preis: e(PREISE.premium),
    zeitraum: 'netto / Monat',
    kategorie: 'SEO',
    text: 'Vollständiges SEO-Management mit Conversion-Optimierung (CRO) und KI-gestützter Content-Architektur.',
    punkte: [
      ['panel', 'Kundenportal rund um die Uhr: Daten aus Google, Anfragen und Arbeitsprotokoll (Oberfläche auf Polnisch und Englisch)'],
      ['tech', 'Vollständige technische und inhaltliche Optimierung'],
      ['telefon', 'Optimierte mobile Darstellung (höhere Klickrate auf Smartphones)'],
      ['pin', 'Betreuung des Google Unternehmensprofils (Ziel: Top 3 in Google Maps, keine Garantie)'],
      ['link', 'Linkaufbau-Strategie und Ausbau von Fachartikeln'],
      ['warstwy', 'Bis zu 50 Keywords, 4 Inhalte und 4 Links pro Monat'],
      ['ai', 'KI-Sichtbarkeit: 30 Fragen pro Woche in ChatGPT und Google'],
      ['tarcza', 'Jederzeit kündbar'],
    ],
    cta: 'Paket wählen',
  },
  {
    schluessel: 'booster',
    name: 'Booster Pack',
    preis: e(PREISE.booster),
    zeitraum: 'netto / Monat',
    kategorie: 'WEBSITE + SEO',
    hervorgehoben: true,
    plakette: 'NEUE WEBSITE IM PAKET INKLUSIVE',
    kopfzeile: 'Laufzeit mindestens 3 Monate (Standard und Premium: Monatsvertrag)',
    text: 'Neue Website im Paket bei einer Laufzeit von mindestens 3 Monaten, kombiniert mit vollständiger SEO-Betreuung.',
    punkte: [
      ['pedzel', 'Individuelles UX/UI-Design (responsiv)'],
      ['panel', 'Kundenportal vom ersten Tag an (Oberfläche auf Polnisch und Englisch)'],
      ['audyt', 'Vollständige SEO-Betreuung inklusive Konkurrenzanalyse'],
      ['ptaszek', 'Optimierung und Beiträge im Google Unternehmensprofil'],
      ['tech', 'SSL-Zertifikat, Hosting und technische Betreuung'],
      ['nieskonczonosc', 'Keine versteckten Einrichtungs- oder Wartungsgebühren'],
    ],
    cta: 'Paket wählen',
  },
];

export const FAIRE_REGELN = [
  'Monatsvertrag bei SEO Standard und SEO Premium. Booster Pack mit neuer Website: mindestens 3 Monate.',
  'Die Kündigung senden Sie per E-Mail. Wir berechnen weder Aktivierungs- noch Ausstiegsgebühren.',
  'Inhalte, die wir für Sie schreiben, gehen nach Bezahlung der Rechnung in Ihren Besitz über.',
  'Links, die während der Zusammenarbeit entstehen, bleiben nach deren Ende bestehen.',
  'Search Console, Analytics, Google Unternehmensprofil, Werbekonto und Domain bleiben auf Ihren Konten. Wir erhalten nur Zugriff.',
  'PDF-Berichte aus dem Kundenportal können Sie jederzeit herunterladen, sie bleiben bei Ihnen.',
];

export const TOP3_REGELN = [
  'Die lokalen Keywords legen wir zu Beginn gemeinsam fest und halten sie im Vertrag fest.',
  'Ziel: Top 3 in Google für diese Keywords innerhalb von 2 bis 3 Monaten nach Arbeitsbeginn.',
  'Die Position messen wir für jedes vereinbarte Keyword einzeln: in der Google Search Console (durchschnittliche Position des Keywords in der Abrechnungswoche, Ziel erreicht bei durchschnittlich 3 oder besser) und in den Maps-Ergebnissen für die Firmenadresse. Den Fortschritt sehen Sie wöchentlich im Kundenportal.',
  'Ist das Ziel nach 3 Monaten nicht erreicht, arbeiten wir einen weiteren Monat ohne Berechnung.',
  'Ausnahmen: eine neue Domain ohne Historie (betrifft meist neue Websites aus dem Booster Pack), eine manuelle Maßnahme von Google und Änderungen an der Website, die ohne uns vorgenommen wurden.',
  'Wir garantieren nicht Platz 1: Über die Reihenfolge der Ergebnisse entscheidet Google.',
];
