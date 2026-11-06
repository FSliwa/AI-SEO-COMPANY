// 5.11.2026 (PLAN-v2 rozdz. 7, „404”; TS-12 i BL-05 po weryfikacji): strona dla adresow, ktore
// nie pasuja do zadnej trasy (/nie-istnieje-123, /en/xyz, stare linki zewnetrzne). Wlaczona
// flaga experimental.globalNotFound w next.config.mjs.
//
// Dlaczego ten plik, a nie [...rest] + not-found (lataka T6): w Next 16.2.12 tamten wariant
// oddawal z serwera pusta powloke __next_error__ (0 linkow, bez H1), nawigacja pojawiala sie
// dopiero po hydracji, a kazdy skan botow wolal funkcje. Ten plik renderuje sie statycznie:
// status 404, <html lang>, H1 i linki sa w HTML z serwera (build weryfikacyjny 5.11: 404,
// x-nextjs-cache HIT). noindex Next dokleja sam do kazdej odpowiedzi 404 (takze tej), wiec
// metadata nie ustawia robots - druga meta robots bylaby duplikatem.
//
// Ograniczenia (swiadome):
// - Plik omija layout app/[locale]/layout.js: brak naglowka, stopki, banera zgody i gtag.
//   Zdarzenie page_404 (BL-05) wysyla tylko app/[locale]/not-found.js, czyli notFound()
//   w istniejacych trasach. Wczytanie tu gtag wymagaloby osobnego trybu zgody (art. 173 Pt)
//   bez banera - nie robimy tego. Wejscia na nieznane adresy widac w logach Vercel.
// - Jeden wariant jezykowy: polski z angielskim podtytulem i linkiem do /en (plik nie zna
//   locale, bo nie przechodzi przez segment [locale]).
// - Linki przez next/link bez prefetchu (w HTML to zwykle <a href>): ta strona ma inny root
//   layout niz reszta serwisu, wiec przejscie i tak jest pelnym przeladowaniem, a prefetch
//   7 tras z kazdej odslony 404 bylby zbednym ruchem. Link z next/link, nie z @/i18n/routing,
//   bo tu nie ma NextIntlClientProvider.
import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

// Ta sama konfiguracja co w app/[locale]/layout.js (globals.css czyta --font-inter).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  title: 'Nie ma takiej strony (404) – AI SEO COMPANY',
  description: 'Strona pod tym adresem nie istnieje. Przejdź do usług, cennika, audytu SEO albo bloga AI SEO COMPANY.',
};

const LINKI = [
  ['/pozycjonowanie-stron-internetowych', 'Pozycjonowanie stron'],
  ['/pozycjonowanie-w-ai', 'Pozycjonowanie w AI'],
  ['/cennik-pozycjonowania', 'Cennik pozycjonowania'],
  ['/audyt-seo', 'Audyt SEO'],
  ['/blog', 'Blog'],
  ['/#kontakt', 'Kontakt'],
];

const styl = {
  main: { position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '64px 0' },
  logo: { display: 'inline-block', marginBottom: '48px' },
  h1: { fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, color: 'var(--color-text-dark)', fontWeight: 700 },
  podtytul: { marginTop: '8px', fontSize: '1.125rem', color: 'var(--color-text-muted)' },
  lead: { marginTop: '24px', maxWidth: '560px', color: 'var(--color-text-main)' },
  lista: { listStyle: 'none', marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', maxWidth: '720px' },
  link: { display: 'block', padding: '14px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-dark)', fontWeight: 600 },
  en: { marginTop: '32px', color: 'var(--color-text-muted)' },
  enLink: { color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' },
};

export default function GlobalNotFound() {
  return (
    <html lang="pl">
      <body className={inter.variable}>
        <main style={styl.main}>
          <div className="container">
            <Link href="/" prefetch={false} style={styl.logo} aria-label="AI SEO COMPANY – strona główna">
              {/* eslint-disable-next-line @next/next/no-img-element -- statyczny SVG logotypu, bez optymalizacji */}
              <img src="/ai-seo-company-logotyp.svg" alt="Logotyp AI SEO COMPANY" width={160} height={59} />
            </Link>
            <h1 style={styl.h1}>Nie ma takiej strony (404)</h1>
            <p style={styl.podtytul} lang="en">Page not found</p>
            <p style={styl.lead}>
              Adres mógł się zmienić albo zawiera literówkę. Wybierz jedną z najczęściej odwiedzanych stron:
            </p>
            <ul style={styl.lista}>
              {LINKI.map(([href, etykieta]) => (
                <li key={href}>
                  <Link href={href} prefetch={false} style={styl.link}>{etykieta} →</Link>
                </li>
              ))}
            </ul>
            <p style={styl.en} lang="en">
              Looking for the English site? <Link href="/en" prefetch={false} hrefLang="en" style={styl.enLink}>Go to the English homepage</Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
