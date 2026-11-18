// Impressum nach § 5 DDG. Nur Daten, die bereits im Code der polnischen Seite stehen.
// Felder mit null werden NICHT angezeigt (kein Platzhalter im Text); sie stehen als offene Pflichtangaben
// in ai-seo-prace/de/de-prawne/RAPORT.md unter „Decyzje“ und müssen vor der Veröffentlichung ergänzt werden.
import { ANBIETER, STAND_ANZEIGE } from './rechtsstand.js';

export const IMPRESSUM = {
  stand: STAND_ANZEIGE,
  lead: `Angaben nach § 5 Digitale-Dienste-Gesetz (DDG) für die Website ai-seo-company.pl und ihre deutschsprachige Fassung. ${ANBIETER.marke} ist eine Marke der unten genannten Gesellschaft.`,
  // Offene Pflichtangaben: erst mit Wert füllen, wenn die Daten vorliegen (Eintrag im KRS, Buchhaltung).
  vertretungsberechtigte: null, // Vertretungsberechtigte (Vorstand/Direktor) laut KRS-Auszug
  ustIdNr: null, // USt-IdNr. mit Länderkürzel PL; VIES bestätigte 14.10.2026 keine Registrierung
  verantwortlichInhalt: null, // Name und Anschrift nach § 18 Abs. 2 MStV, falls redaktionelle Inhalte angeboten werden
  streitbeilegung: null, // Erklärung nach § 36 VSBG (Teilnahmebereitschaft), sobald entschieden
  zeilen: [
    ['Firma', ANBIETER.firma],
    ['Rechtsform', 'Prosta Spółka Akcyjna (P.S.A.), einfache Aktiengesellschaft polnischen Rechts'],
    ['Anschrift', `${ANBIETER.strasse}, ${ANBIETER.plz} ${ANBIETER.ort}, ${ANBIETER.land}`],
    ['Registergericht', ANBIETER.registergericht],
    ['Register und Nummer', `${ANBIETER.register}, KRS-Nr. ${ANBIETER.krs}`],
    ['Steuernummer (NIP)', ANBIETER.nip],
    ['REGON', ANBIETER.regon],
  ],
  kontakt: [
    ['E-Mail', ANBIETER.email, `mailto:${ANBIETER.email}`],
    ['Telefon', ANBIETER.telefon, `tel:${ANBIETER.telefonHref}`],
  ],
  hinweise: [
    {
      titel: 'Datenschutz und AGB',
      text: 'Informationen zur Verarbeitung personenbezogener Daten finden Sie in der [Datenschutzerklärung](/cookies), die Bedingungen für die elektronischen Dienste in den [AGB](/regulamin).',
    },
  ],
};
