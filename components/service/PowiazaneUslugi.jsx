// „Powiązane usługi” (18.11.2026, siatka linków wewnętrznych): krótka sekcja pod usługą z linkami do
// sąsiednich usług i do cennika, kotwica = fraza główna celu (wzorzec airSlate). Działa w komponentach
// serwerowych i klienckich (czyste linki, bez importów serwerowych). Cele spoza bramki publikacji
// (lib/publikacja.js) i bez wersji EN (na EN) znikają same; bez żadnego celu sekcja się nie renderuje.
//
//   <PowiazaneUslugi locale={lang} bez="/audyt-seo" items={['/pozycjonowanie-stron-internetowych', '/cennik-pozycjonowania']} />
//
// items = klucze PL z i18n/routing.js, kolejność = kolejność na stronie. Zasada serwisu: najwyżej 3 linki.
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { hrefWJezyku } from '@/lib/linkiEn';

const USLUGI = {
  '/pozycjonowanie-stron-internetowych': {
    pl: ['pozycjonowanie stron internetowych', 'technika, treści i linki w jednym procesie, z raportem w panelu klienta'],
    en: ['SEO services', 'technical fixes, content and links in one process, with reporting in the client portal'],
  },
  '/audyt-seo': {
    pl: ['audyt SEO', 'lista błędów technicznych i treściowych z priorytetami, zanim ruszy pozycjonowanie'],
    en: ['SEO audit', 'a prioritised list of technical and content issues before any SEO work starts'],
  },
  '/cennik-pozycjonowania': {
    pl: ['cennik pozycjonowania', 'pakiety, ceny netto i zasady umowy w jednym miejscu'],
    en: ['SEO pricing', 'packages, net prices and contract terms in one place'],
  },
  '/projektowanie-stron-internetowych': {
    pl: ['tworzenie stron internetowych', 'strona firmowa budowana pod pozycjonowanie od pierwszego dnia'],
    en: ['web design agency', 'a company website built for search from day one'],
  },
  '/pozycjonowanie-w-ai': {
    pl: ['pozycjonowanie w AI', 'widoczność firmy w ChatGPT, Gemini i przeglądach AI w Google'],
    en: ['AI search optimization', 'visibility in ChatGPT, Gemini and Google AI Overviews'],
  },
  '/seo-lokalne-warszawa': {
    pl: ['SEO lokalne w Warszawie', 'widoczność w Mapach i wynikach lokalnych dla firm usługowych'],
    en: ['local SEO in Warsaw', 'visibility in Maps and local results for service businesses'],
  },
  '/porownania': {
    pl: ['porównania przed wyborem agencji SEO', 'kryteria, koszty i ryzyka obok siebie'],
    en: ['SEO comparisons', 'criteria, costs and risks side by side'],
  },
  '/pozycjonowanie-wizytowki-google': {
    pl: ['pozycjonowanie wizytówki Google', 'Profil Firmy, opinie i pozycje w Mapach'],
    en: ['Google Business Profile optimization', 'your profile, reviews and Maps positions'],
  },
  '/pozycjonowanie-wordpress': {
    pl: ['pozycjonowanie WordPress', 'optymalizacja wtyczek, LCP/INP, czysta indeksacja archiwów i widoczność w AI'],
    en: ['WordPress SEO services', 'plugin cleanup, Core Web Vitals, clean archive indexing and AI search visibility'],
  },
  '/pozycjonowanie-webflow': {
    pl: ['pozycjonowanie Webflow', 'architektura kolekcji CMS, wielojęzyczny hreflang, JSON-LD i widoczność w AI'],
    en: ['Webflow SEO services', 'CMS collection architecture, multi-locale hreflang, JSON-LD and AI search visibility'],
  },
  '/pozycjonowanie-stron-mazowsze': {
    pl: ['pozycjonowanie stron Mazowsze', 'widoczność w Google i Mapach dla firm z Warszawy i całego województwa mazowieckiego'],
    en: ['local SEO in Mazovia', 'Google Search and Maps visibility for companies across Warsaw and the Mazovia region'],
  },
  '/seo-dla-firm-budowlanych': {
    pl: ['SEO dla firm budowlanych i instalacyjnych', 'zapytania inwestorów z Google, Map i AI poparte wynikiem STEF-BUD (9 071 wyśw.)'],
    en: ['SEO for construction companies', 'contractor leads from Google, Maps and AI backed by STEF-BUD Search Console data'],
  },
  '/seo-dla-firm-produkcyjnych-b2b': {
    pl: ['SEO dla firm produkcyjnych i przemysłu B2B', 'katalogi parametrów CNC/ISO i eksport PL-DACH poparte wynikiem STANIAX w GSC'],
    en: ['manufacturing & industrial B2B SEO', 'technical specification SEO and DACH export backed by STANIAX Search Console data'],
  },
  '/seo-dla-restauracji-i-gastronomii': {
    pl: ['SEO dla restauracji i gastronomii', 'rezerwacje z Map Google i AI bez prowizji portali - studium MADAME THAI (58 618 wyśw.)'],
    en: ['restaurant & hospitality SEO', 'commission-free Google Maps and AI bookings - MADAME THAI case (58,618 impressions)'],
  },
  '/seo-dla-firm-szkoleniowych-i-iso': {
    pl: ['SEO dla firm szkoleniowych i wdrożeń ISO', 'nabór na szkolenia B2B i doradztwo z wynikiem TQL (wzrost z 2 do 29 kliknięć/tydz.)'],
    en: ['SEO for training & ISO consultancies', 'B2B training enrollments and ISO leads backed by TQL Search Console growth (14.5x)'],
  },
};

export default function PowiazaneUslugi({ locale = 'pl', bez, items = [], tytul }) {
  const en = locale === 'en';
  const linki = items
    .filter((href) => href !== bez && USLUGI[href])
    .map((href) => ({ href, cel: hrefJesliOpublikowana(href), dane: USLUGI[href][en ? 'en' : 'pl'] }))
    .filter((l) => l.cel && (!en || hrefWJezyku(l.cel, 'en')))
    .slice(0, 3);
  if (!linki.length) return null;
  const id = en ? 'related-services' : 'powiazane-uslugi';
  return (
    <section aria-labelledby={id} className="powiazane">
      <div className="container powiazane-kontener">
        <h2 id={id} className="powiazane-h2">
          {tytul ?? (en ? 'Related services' : 'Powiązane usługi')}
        </h2>
        <ul className="powiazane-lista" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${linki.length === 1 ? 420 : 260}px), 1fr))` }}>
          {linki.map((l) => (
            <li key={l.href}>
              <Link href={l.cel} className="powiazane-karta">
                <span className="powiazane-tytul">{l.dane[0].charAt(0).toUpperCase() + l.dane[0].slice(1)}</span>
                <span className="powiazane-opis">{l.dane[1]}</span>
                <span className="powiazane-strzalka" aria-hidden="true">{'\u2192'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
