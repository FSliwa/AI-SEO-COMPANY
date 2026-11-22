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

// Dane rejestrowe spolki (odpis aktualny z publicznego API KRS, odczyt 18.11.2026, rejestr przedsiebiorcow):
// numer KRS, NIP, REGON, sygnatura ostatniego wpisu WA.XII NS-REJ.KRS (= Sad Rejonowy dla m.st. Warszawy
// w Warszawie, XII Wydzial Gospodarczy KRS), organ: Zarzad, Prezes Zarzadu reprezentuje samodzielnie
// (w zarzadzie wieloosobowym: Prezes samodzielnie albo dwoch czlonkow lacznie albo czlonek z prokurentem).
// Kapital akcyjny w KRS: 100 000,00 PLN (wymagany na stronie P.S.A. na podstawie art. 300^5 § 1 pkt 4 KSH).
export const REJESTR = {
  krs: '0001239983',
  nip: '5253090237',
  regon: '544761611',
  kapital: { pl: '100 000,00 zł', en: 'PLN 100,000.00', de: '100.000,00 PLN' },
  sad: {
    pl: 'Sąd Rejonowy dla m.st. Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru Sądowego',
    en: 'District Court for the Capital City of Warsaw in Warsaw, 12th Commercial Division of the National Court Register',
  },
  reprezentant: { imie: 'Filip', nazwisko: 'Śliwa', funkcja: 'Prezes Zarządu' },
};

// Profile zewnetrzne firmy i autora (jedno zrodlo dla JSON-LD #organization w app/[locale]/layout.js,
// Person w components/about/AboutAuthor.jsx i components/de/UeberUnsDe.jsx oraz sekcji "Profile firmy
// poza strona" w app/llms.txt/route.js). Adresy LinkedIn (linkedinFirma, linkedinAutor) wpisac po
// potwierdzeniu przez Filipa, gdy zwracaja HTTP 200 (nie zgadujemy adresow).
export const MAPA_GOOGLE_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJBbPRrkDNHkcR0Oetxw5AMFk';

export const PROFILE_FIRMY = {
  sortlist: 'https://www.sortlist.co.uk/agency/ai-signals-company',
  clutch: 'https://clutch.co/profile/ai-signals-company-prosta-sp-ka-akcyjna',
  githubAutor: 'https://github.com/FSliwa',
  githubFirma: 'https://github.com/FSliwa/ai-crawler-robots-txt-presets',
  goodfirms: '',
  designrush: '',
  linkedinFirma: '',
  linkedinAutor: '',
};
