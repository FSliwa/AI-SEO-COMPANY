import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';

// 5.11.2026 (PLAN-v2 rozdz. 7, „404”; lataka T6 - tylko ten plik, bez [...rest]; BL-05, TS-12):
// UI dla notFound() wywolanego w istniejacej trasie [locale] - np. /en/sprawdz-widocznosc-w-ai
// (strona tylko-PL), strona przed swoja partia (lib/publikacja.js) albo nieznany slug artykulu.
// Adresy bez zadnej trasy obsluguje app/global-not-found.js (HTML z serwera).
// Status 404 i noindex bez zmian. W Next 16.2.12 z serwera wychodzi tu powloka __next_error__,
// a naglowek, H1 i linki pojawiaja sie po hydracji - kryterium sprawdzac Playwrightem, nie curlem.
//
// 18.11.2026 (audyt S-34, S-40): usunieto 'use client' i zdarzenie page_404 (GA4 nie dostawalo go
// z powloki bledu), dodano metadata (title, noindex). 404 mierzyc w GSC > Ustawienia > Statystyki
// indeksowania > Wedlug odpowiedzi oraz w logach Vercel.
export async function generateMetadata() {
  const lang = await getLocale();
  return {
    title: lang === 'en' ? 'Page not found (404) – AI SEO COMPANY' : lang === 'de' ? 'Seite nicht gefunden (404) – AI SEO COMPANY' : 'Nie ma takiej strony (404) – AI SEO COMPANY',
    robots: { index: false },
  };
}

export default function NotFound() {
  const lang = useLocale();
  const de = lang === 'de';
  const pl = lang !== 'en' && !de;

  // Klucze tras z i18n/routing.js - Link sam podstawia slug EN.
  const linki = de
    ? [['/pozycjonowanie-stron-internetowych', 'B2B SEO'], ['/pozycjonowanie-w-ai', 'Generative Engine Optimization'], ['/cennik-pozycjonowania', 'SEO Kosten'], ['/audyt-seo', 'SEO Audit'], ['/', 'Startseite']]
    : pl
    ? [['/pozycjonowanie-stron-internetowych', 'Pozycjonowanie stron'], ['/pozycjonowanie-w-ai', 'Pozycjonowanie w AI'], ['/cennik-pozycjonowania', 'Cennik pozycjonowania'], ['/audyt-seo', 'Audyt SEO'], ['/blog', 'Blog']]
    : [['/pozycjonowanie-stron-internetowych', 'SEO services'], ['/pozycjonowanie-w-ai', 'AI search optimization'], ['/cennik-pozycjonowania', 'SEO pricing'], ['/audyt-seo', 'SEO audit'], ['/blog', 'Blog']];

  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '140px', minHeight: '70vh' }}>
        <div className="container">
          <h1>{de ? 'Seite nicht gefunden (404)' : pl ? 'Nie ma takiej strony (404)' : 'Page not found (404)'}</h1>
          <p>{de ? 'Die Adresse hat sich möglicherweise geändert. Diese Seiten werden am häufigsten besucht:' : pl ? 'Adres mógł się zmienić. Zobacz najczęściej odwiedzane strony:' : 'The address may have changed. Try one of these pages:'}</p>
          <ul className="nf-linki">
            {linki.map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
