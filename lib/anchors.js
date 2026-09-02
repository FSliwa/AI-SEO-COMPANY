// Identyfikatory sekcji na stronie glownej byly zapisane po polsku takze w
// wersji angielskiej - odwiedzajacy /en dostawal w pasku adresu /en#kontakt,
// /en#uslugi, /en#cennik i /en#wyniki. Ten plik jest jedynym zrodlem prawdy:
// uzywaja go zarowno komponenty ustawiajace id sekcji, jak i wszystkie linki
// prowadzace do tych kotwic, wiec obie strony nie moga sie rozjechac.
const SEKCJE = {
  kontakt: { pl: 'kontakt', en: 'contact' },
  uslugi: { pl: 'uslugi', en: 'services' },
  cennik: { pl: 'cennik', en: 'pricing' },
  wyniki: { pl: 'wyniki', en: 'results' },
};

/** Identyfikator sekcji dla danego jezyka, np. sectionId('kontakt', 'en') === 'contact'. */
export function sectionId(nazwa, locale) {
  const wpis = SEKCJE[nazwa];
  if (!wpis) return nazwa;
  return locale === 'en' ? wpis.en : wpis.pl;
}

/** Kotwica w obrebie biezacej strony, np. hash('kontakt', 'en') === '#contact'. */
export function hash(nazwa, locale) {
  return `#${sectionId(nazwa, locale)}`;
}

/**
 * Kotwica na stronie glownej dla komponentu <Link> z @/i18n/routing.
 * Link lokalizuje sciezke, ale nie fragment - fragment podajemy sami.
 */
export function homeHash(nazwa, locale) {
  return `/${hash(nazwa, locale)}`;
}
