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
  '/pozycjonowanie-wizytowki-google': {
    pl: ['pozycjonowanie wizytówki Google', 'Profil Firmy, opinie i pozycje w Mapach'],
    en: ['Google Business Profile optimization', 'your profile, reviews and Maps positions'],
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
    <section aria-labelledby={id} style={{ padding: '56px 0' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 id={id} style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--color-text-dark)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          {tytul ?? (en ? 'Related services' : 'Powiązane usługi')}
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${linki.length === 1 ? 420 : 260}px), 1fr))` }}>
          {linki.map((l) => (
            <li key={l.href} style={{ background: 'var(--w-karta, #FFFFFF)', border: '1px solid var(--w-linia)', borderRadius: '28px', padding: '24px', color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.6 }}>
              <Link href={l.cel} style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--color-cta)', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'underline' }}>{l.dane[0].charAt(0).toUpperCase() + l.dane[0].slice(1)}</Link>
              {l.dane[1]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
