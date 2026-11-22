// Gemeinsamer Stand der drei Rechtstexte DE (Impressum, Datenschutz, AGB). Reiner ESM ohne Importe.
// Kein Text hier ist juristisch geprüft (KI-Prüfung am 18.11.2026, keine Rechtsberatung); Prüfpunkte stehen in
// ai-seo-prace/poprawki3/de-prawo/RAPORT.md.
import { BIURO, SIEDZIBA, ETYKIETY, MIASTO, REJESTR } from '../firma.js';

export const STAND_ISO = '2026-11-22';
export const STAND_ANZEIGE = '22.11.2026';

// Adressen kommen aus lib/firma.js (eine Quelle für die ganze Seite).
// Unternehmensdaten: ausschließlich aus dem Code der polnischen Seite (Footer, Regulamin,
// Cookies, JSON-LD in app/[locale]/layout.js).
export const ANBIETER = {
  firma: 'AI SIGNALS COMPANY Prosta Spółka Akcyjna',
  marke: 'AI SEO COMPANY',
  // Sitz der Gesellschaft (KRS). Die Büroanschrift (Profil in Google, Kontaktangaben) steht in büro*.
  strasse: SIEDZIBA.ulica,
  plz: SIEDZIBA.kod,
  buroStrasse: BIURO.ulica,
  buroPlz: BIURO.kod,
  buroOrt: MIASTO.de,
  sitzLabel: ETYKIETY.siedziba.de,
  buroLabel: 'Büroanschrift',
  ort: 'Warschau',
  land: 'Polen',
  rechtsform: 'Prosta Spółka Akcyjna (polnische einfache Aktiengesellschaft)',
  // Registergericht: aus der Aktenzeichen-Kennung des letzten KRS-Eintrags (WA.XII NS-REJ.KRS) abgeleitet.
  registergericht: 'Amtsgericht für die Hauptstadt Warschau, XII. Wirtschaftsabteilung des Nationalen Gerichtsregisters (Sąd Rejonowy dla m.st. Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru Sądowego)',
  register: 'Unternehmerregister des Nationalen Gerichtsregisters (Krajowy Rejestr Sądowy, KRS)',
  krs: REJESTR.krs,
  nip: REJESTR.nip,
  regon: REJESTR.regon,
  kapital: REJESTR.kapital.de,
  // Vertretungsberechtigter laut KRS (Präsident des Vorstands vertritt allein, auch bei mehrköpfigem Vorstand).
  vertreter: `${REJESTR.reprezentant.imie} ${REJESTR.reprezentant.nazwisko}`,
  vertreterFunktion: 'Präsident des Vorstands (Prezes Zarządu)',
  email: 'kontakt@ai-seo-company.pl',
  telefon: '+48 518 815 055',
  telefonHref: '+48518815055',
};
