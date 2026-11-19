// Impressum nach § 5 DDG. Quelle: KRS-Auszug (öffentliche API) und VIES vom 19.11.2026 sowie Firmendaten der Seite.
// Felder mit null werden NICHT angezeigt (kein Platzhalter im Text). Stand der Angaben: KRS-Auszug und VIES vom
// 19.11.2026; offene Punkte: ai-seo-prace/poprawki3/de-prawo/RAPORT.md unter „Decyzje“.
import { ANBIETER, STAND_ANZEIGE } from './rechtsstand.js';

export const IMPRESSUM = {
  stand: STAND_ANZEIGE,
  lead: `Angaben nach § 5 Digitale-Dienste-Gesetz (DDG) für die Website ai-seo-company.pl und ihre deutschsprachige Fassung. ${ANBIETER.marke} ist eine Marke der unten genannten Gesellschaft.`,
  // Vertretungsberechtigter laut KRS-Auszug vom 19.11.2026: Präsident des Vorstands, allein vertretungsberechtigt.
  vertretungsberechtigte: `${ANBIETER.vertreter}, ${ANBIETER.vertreterFunktion}, einzelvertretungsberechtigt`,
  // USt-IdNr.: VIES am 19.11.2026 für PL5253090237 = ungültig (nicht für den innergemeinschaftlichen Handel
  // registriert). Pflichtangabe nur, wenn eine USt-IdNr. besteht; daher keine Zeile. Erst bei Registrierung füllen.
  ustIdNr: null,
  // Verantwortlicher nach § 18 Abs. 2 MStV (Blog und Ratgeber sind redaktionelle Inhalte); Anschrift = Büroanschrift.
  verantwortlichInhalt: `${ANBIETER.vertreter}, ${ANBIETER.buroStrasse}, ${ANBIETER.buroPlz} ${ANBIETER.buroOrt}, ${ANBIETER.land}`,
  // Erklärung nach § 36 VSBG. Die EU-Plattform zur Online-Streitbeilegung (OS-Plattform) ist seit dem
  // 20.07.2025 eingestellt (Verordnung (EU) 2024/3228): kein Link und kein Hinweis auf eine Verlinkungspflicht.
  streitbeilegung: 'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
  zeilen: [
    ['Firma', ANBIETER.firma],
    ['Rechtsform', ANBIETER.rechtsform],
    [ANBIETER.sitzLabel, `${ANBIETER.strasse}, ${ANBIETER.plz} ${ANBIETER.ort}, ${ANBIETER.land}`],
    ['Registergericht', ANBIETER.registergericht],
    ['Register und Nummer', `${ANBIETER.register}, KRS-Nr. ${ANBIETER.krs}`],
    ['Steuernummer (NIP)', ANBIETER.nip],
    ['REGON', ANBIETER.regon],
  ],
  kontakt: [
    [ANBIETER.buroLabel, `${ANBIETER.buroStrasse}, ${ANBIETER.buroPlz} ${ANBIETER.buroOrt}, ${ANBIETER.land}`],
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
