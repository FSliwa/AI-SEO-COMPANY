// Godziny otwarcia: JEDNO zrodlo dla widocznego tekstu (stopka, Kontakt) i JSON-LD
// (openingHoursSpecification w app/[locale]/layout.js). Znacznik musi opisywac tresc widoczna,
// wiec oba czytaja stad.
// Zrodlo: Profil Firmy w Google (AI SEO COMPANY, Grzybowska 5A, place id
// ChIJBbPRrkDNHkcR0Oetxw5AMFk), odczyt 18.11.2026: pon-sob 7:00-23:00, niedziela zamkniete.
// Przy zmianie godzin w Profilu zmienic tutaj, nigdzie indziej.
export const GODZINY = {
  dni: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  otwarcie: '07:00',
  zamkniecie: '23:00',
};

export const GODZINY_TEKST = {
  pl: 'pn–sob 7:00–23:00, niedziela nieczynne',
  en: 'Mon–Sat 7 am–11 pm, Sunday closed',
};

export const GODZINY_JSONLD = [
  {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': GODZINY.dni,
    'opens': GODZINY.otwarcie,
    'closes': GODZINY.zamkniecie,
  },
];
