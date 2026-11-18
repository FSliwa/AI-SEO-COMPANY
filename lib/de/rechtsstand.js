// Gemeinsamer Stand der drei Rechtstexte DE (Impressum, Datenschutz, AGB). Reiner ESM ohne Importe.
// Kein Text hier ist juristisch geprüft; Prüfpunkte stehen in ai-seo-prace/de/de-prawne/RAPORT.md.
import { BIURO, SIEDZIBA, ETYKIETY, MIASTO } from '../firma.js';

export const STAND_ISO = '2026-11-18';
export const STAND_ANZEIGE = '18.11.2026';

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
  registergericht: 'Amtsgericht für die Hauptstadt Warschau (Sąd Rejonowy dla m.st. Warszawy w Warszawie)',
  register: 'Nationales Gerichtsregister (Krajowy Rejestr Sądowy, KRS)',
  krs: '0001239983',
  nip: '5253090237',
  regon: '544761611',
  email: 'kontakt@ai-seo-company.pl',
  telefon: '+48 518 815 055',
  telefonHref: '+48518815055',
};
