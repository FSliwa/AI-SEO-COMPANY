// Adresy firmy: JEDNO zrodlo dla stopki, Kontaktu, JSON-LD (app/[locale]/layout.js), llms.txt,
// tekstow prawnych i niemieckiego Impressum. Decyzja wlasciciela 18.11.2026: firma ma dwa prawdziwe adresy.
// - BIURO (Grzybowska 5A): rzeczywiste biuro i adres Profilu Firmy w Google (place id
//   ChIJBbPRrkDNHkcR0Oetxw5AMFk, odczyt 18.11.2026: "Grzybowska 5A, 00-132 Warszawa"). Tu: stopka (kontakt),
//   sekcja Kontakt, PostalAddress w JSON-LD, Biuroanschrift w Impressum.
// - SIEDZIBA (Grzybowska 12/14 lok. B-3): adres siedziby z KRS. Tu: dane spolki (stopka, regulamin, polityka
//   prywatnosci, zgody, Impressum, AGB, Datenschutz).
// Znacznik JSON-LD musi zgadzac sie z widoczna trescia, wiec oba czytaja stad. Reiner ESM ohne Importe.
export const BIURO = {
  ulica: 'ul. Grzybowska 5A',
  kod: '00-132',
  // Punkt adresowy budynku 5A z rejestru GUGiK (usluga UUG, srid=4326, odczyt 18.11.2026).
  lat: 52.2368322,
  lon: 21.0004942,
};

export const SIEDZIBA = {
  ulica: 'ul. Grzybowska 12/14 lok. B-3',
  kod: '00-132',
};

// Miasto w tekscie ciaglym (EN zachowuje dotychczasowa pisownie "Warszawa" w stopce i Kontakcie).
export const MIASTO = { pl: 'Warszawa', en: 'Warszawa', de: 'Warschau' };

export const ETYKIETY = {
  biuro: { pl: 'Biuro', en: 'Office', de: 'Büro' },
  siedziba: { pl: 'Siedziba rejestrowa', en: 'Registered office', de: 'Sitz der Gesellschaft' },
};

/** "ul. Grzybowska 5A, 00-132 Warszawa" (de: Warschau). */
export function adresLinia(adres, lang) {
  return `${adres.ulica}, ${adres.kod} ${MIASTO[lang] || MIASTO.en}`;
}
