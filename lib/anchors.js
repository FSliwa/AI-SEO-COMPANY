import { zachowaniePrzewijania } from './ruch';

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

/**
 * Przewija do sekcji, jesli jest na biezacej stronie. Zwraca false, gdy jej
 * tu nie ma - wtedy wolajacy decyduje, dokad przejsc.
 *
 * Fokus (05.10.2026): zwykly <a href="#kontakt"> przenosil punkt startowy
 * nawigacji Tab do sekcji, a preventDefault + scrollIntoView tego nie robi.
 * Bez przeniesienia fokusu nastepny Tab po "Wycen projekt" wracal do
 * naglowka zamiast do pol formularza, a plywajacy przycisk z fokusem
 * (regula :not(:focus) w globals.css) zostawal widoczny nad formularzem.
 * tabindex="-1" jest dokladany tylko na czas fokusu i znika przy blur, wiec
 * sekcja nie trafia do kolejnosci Tab.
 */
export function przewinDoSekcji(nazwa, locale) {
  if (typeof document === 'undefined') return false;
  const cel = document.getElementById(sectionId(nazwa, locale));
  if (!cel) return false;
  if (!cel.hasAttribute('tabindex')) {
    cel.setAttribute('tabindex', '-1');
    cel.addEventListener('blur', () => cel.removeAttribute('tabindex'), { once: true });
  }
  cel.focus({ preventScroll: true });
  cel.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
  try { window.history.replaceState(null, '', hash(nazwa, locale)); } catch (err) {}
  return true;
}

/**
 * onClick dla linkow z href="#kontakt" (przycisk "Wycen projekt" w naglowku
 * i plywajacy przycisk w stopce). href zostaje kotwica na biezacej stronie.
 *
 * Na /regulamin, /cookies, /en/terms i /en/cookies nie ma sekcji kontaktu:
 * klikniecie zmienialo tylko adres na /regulamin#kontakt, a strona stala w
 * miejscu (pomiar etapu 5: scrollY 1200 -> 1200 na 4 stronach, 390 i 1440).
 * Teraz, gdy sekcji nie ma, router next-intl przenosi na strone glowna do
 * /#kontakt (/en#contact) - tak jak linki "Kontakt" w menu. Gdy sekcja jest,
 * strona przewija sie do niej z poszanowaniem "ogranicz ruch". Klik z
 * modyfikatorem (nowa karta, nowe okno) zostaje przegladarce.
 */
export function przejdzDoSekcji(e, nazwa, locale, router) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  // Weryfikacja etapu 5 (14.10.2026), regresja P2: przechwycenie klikniecia
  // i history.replaceState nie dodawaly wpisu do historii - Wstecz wyrzucal
  // ze strony zamiast wrocic do miejsca sprzed skoku. Gdy sekcja jest na tej
  // stronie, zostaje natywna kotwica: wpis w historii, punkt startowy Tab w
  // sekcji, scroll-behavior z CSS (auto przy "ogranicz ruch") i
  // scroll-margin-top sekcji.
  if (typeof document !== 'undefined' && document.getElementById(sectionId(nazwa, locale))) return;
  e.preventDefault();
  router.push(homeHash(nazwa, locale));
}
