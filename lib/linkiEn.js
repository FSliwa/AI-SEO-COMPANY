// Adresy linków w wersji EN nowych stron (9.11.2026). Komponenty z <Link> z '@/i18n/routing'
// nie potrzebują tego pliku (Link sam tłumaczy klucz PL na adres EN). Ten plik jest dla miejsc,
// gdzie href jest gotowym tekstem: HTML w danych (lib/*.en.js), zwykłe <a>, JSON-LD.
//
//   hrefWJezyku('/cennik-pozycjonowania', 'en')        -> '/en/seo-pricing'
//   hrefWJezyku('/porownania/seo-vs-geo#tabela', 'en') -> '/en/comparisons/seo-vs-geo#tabela'
//   hrefWJezyku('/blog/artykul-tylko-pl', 'en')         -> null (brak wersji EN: tekst bez linku)
//   hrefWJezyku('/cokolwiek', 'pl')                     -> '/cokolwiek' (PL bez zmian)
// Kotwice sekcji (#kontakt -> #contact) bierz z lib/anchors.js: hash('kontakt', 'en').
import { routing } from '../i18n/routing';
import { hrefJesliOpublikowana } from './publikacja';

const SCIEZKI = routing.pathnames;

export function hrefWJezyku(sciezkaPl, locale) {
  if (!sciezkaPl || locale !== 'en') return sciezkaPl;
  if (/^(https?:|mailto:|tel:|#)/.test(sciezkaPl)) return sciezkaPl;
  const [sciezka, kotwica] = sciezkaPl.split('#');
  const wpis = SCIEZKI[sciezka];
  const en = typeof wpis === 'string' ? wpis : wpis?.en;
  if (!en) return null;
  const pelna = en === '/' ? '/en' : `/en${en}`;
  return kotwica ? `${pelna}#${kotwica}` : pelna;
}

/** Jak hrefJesliOpublikowana z lib/publikacja.js, ale od razu w danym języku (null = bez linku). */
export function hrefWJezykuJesliOpublikowana(sciezkaPl, locale) {
  const h = hrefJesliOpublikowana(sciezkaPl);
  return h ? hrefWJezyku(h, locale) : null;
}

/**
 * href dla <Link> z '@/i18n/routing'. Link tłumaczy klucz PL na adres EN tylko bez fragmentu:
 * '/cennik-pozycjonowania#uczciwa-umowa' zostawał ścieżką PL pod /en (308). Na EN zwraca więc
 * { pathname, hash }; na PL i bez '#' - ten sam string co wcześniej.
 */
export function hrefDlaLink(href, locale) {
  if (locale !== 'en' || typeof href !== 'string' || !href.startsWith('/') || !href.includes('#')) return href;
  const [pathname, hash] = href.split('#');
  return { pathname, hash };
}
