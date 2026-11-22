// Ikony obrysowe 1,5 px (viewBox 24) do kart i kafli stron narzędzi. Dekoracja: aria-hidden, kolor z CSS.
// Komponent bez hooków (działa w serwerowych i klienckich).
const SCIEZKI = {
  audyt: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /><path d="M8 10.5l1.7 1.7L13 8.8" /></>,
  ai: <><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" /><path d="M18.5 3v3M17 4.5h3M5.5 17v3M4 18.5h3" /></>,
  kalkulator: <><path d="M4 19.5h16" /><path d="M5.5 15l4-4.5 3.5 3L19 6.5" /><path d="M15.5 6.5H19V10" /></>,
  makieta: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M3.5 9h17" /><path d="M8 13.5h4M8 16h7" /></>,
  llms: <><path d="M7 3.5h7l4 4v13H7z" /><path d="M14 3.5v4h4" /><path d="M9.5 12h5M9.5 15h5M9.5 18h3" /></>,
  autorytet: <><path d="M4.5 16.5a7.5 7.5 0 1 1 15 0" /><path d="M12 16.5l3.5-5" /><circle cx="12" cy="16.5" r="1" /></>,
  szablon: <><path d="M6.5 3.5h8l3.5 3.5v13.5h-11.5z" /><path d="M14.5 3.5V7H18" /><path d="M9.5 11.5h5.5M9.5 14.5h5.5M9.5 17.5h3" /></>,
  checklista: <><rect x="4.5" y="4" width="15" height="16.5" rx="2.5" /><path d="m8 9.5 1.4 1.4L12 8.3M8 15l1.4 1.4L12 13.8M14 10h2.5M14 15.5h2.5" /></>,
  bolt: <path d="M13 3.5 6 13.5h5l-1 7 7-10h-5z" />,
  koperta: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></>,
  strzalka: <path d="M7 17 17 7M9 7h8v8" />,
};

export default function Ikona({ nazwa, rozmiar = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={rozmiar} height={rozmiar} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {SCIEZKI[nazwa] ?? SCIEZKI.szablon}
    </svg>
  );
}

/** Klucz ikony dla ścieżki PL / id karty huba narzędzia. */
export function ikonaNarzedzia(klucz = '') {
  if (/audyt/.test(klucz)) return 'audyt';
  if (/widocznosc|sprawdzarka|robot|crawler/.test(klucz)) return 'ai';
  if (/vitals|cwv/.test(klucz)) return 'bolt';
  if (/kalkulator/.test(klucz)) return 'kalkulator';
  if (/makieta/.test(klucz)) return 'makieta';
  if (/llms/.test(klucz)) return 'llms';
  if (/autorytet/.test(klucz)) return 'autorytet';
  return 'szablon';
}
