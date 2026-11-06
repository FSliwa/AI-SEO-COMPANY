'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';

// 5.11.2026 (PLAN-v2 rozdz. 7, „404”; lataka T6 - tylko ten plik, bez [...rest]; BL-05, TS-12):
// UI dla notFound() wywolanego w istniejacej trasie [locale] - np. /en/sprawdz-widocznosc-w-ai
// (strona tylko-PL), strona przed swoja partia (lib/publikacja.js) albo nieznany slug artykulu.
// Adresy bez zadnej trasy obsluguje app/global-not-found.js (HTML z serwera).
// Status 404 i noindex bez zmian. W Next 16.2.12 z serwera wychodzi tu powloka __next_error__,
// a naglowek, H1 i linki pojawiaja sie po hydracji - kryterium sprawdzac Playwrightem, nie curlem.
//
// page_404 (BL-05): raz w miesiacu eksploracja GA4 547365077 „page_404 x referrer spoza
// ai-seo-company.pl”; kazdy adres z zewnetrznym odsylaczem dostaje regule 308 w next.config.mjs
// do najblizszego odpowiednika (playbook 6.1 pkt 4).
export default function NotFound() {
  const lang = useLocale();
  const pl = lang !== 'en';

  useEffect(() => {
    track('page_404', {
      page_path: window.location.pathname,
      referrer: document.referrer || '(direct)',
    });
  }, []);

  // Klucze tras z i18n/routing.js - Link sam podstawia slug EN.
  const linki = pl
    ? [['/pozycjonowanie-stron-internetowych', 'Pozycjonowanie stron'], ['/pozycjonowanie-w-ai', 'Pozycjonowanie w AI'], ['/cennik-pozycjonowania', 'Cennik pozycjonowania'], ['/audyt-seo', 'Audyt SEO'], ['/blog', 'Blog']]
    : [['/pozycjonowanie-stron-internetowych', 'SEO services'], ['/pozycjonowanie-w-ai', 'AI search optimization'], ['/cennik-pozycjonowania', 'SEO pricing'], ['/audyt-seo', 'SEO audit'], ['/blog', 'Blog']];

  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '140px', minHeight: '70vh' }}>
        <div className="container">
          <h1>{pl ? 'Nie ma takiej strony (404)' : 'Page not found (404)'}</h1>
          <p>{pl ? 'Adres mógł się zmienić. Zobacz najczęściej odwiedzane strony:' : 'The address may have changed. Try one of these pages:'}</p>
          <ul>
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
