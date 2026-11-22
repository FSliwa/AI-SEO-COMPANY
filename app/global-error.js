'use client';

/**
 * Last resort when an error escapes every other boundary.
 *
 * Next renders its own bare screen otherwise - <html id="__next_error__"> with
 * no title, no lang and no content, which is what PageSpeed audited on
 * 23.08.2026 after the 3D scene failed to download. The scene now has a
 * boundary of its own, so this file should never be reached; it exists so that
 * the day something else throws, a crawler still gets a titled, language-tagged
 * document with a way back into the site instead of a blank one.
 *
 * Deliberately dependency-free: no fonts, no components, no next-intl. This
 * renders when the app is already broken, so it cannot rely on the app.
 */
export default function GlobalError({ error, reset }) {
  return (
    <html lang="pl">
      <body style={{ margin: 0, backgroundColor: '#0B1220', color: '#FFFFFF', fontFamily: 'var(--font-geist), system-ui, -apple-system, "Segoe UI", sans-serif' }}>
        <title>Wystąpił błąd</title>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', gap: '1rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-0.03em', margin: 0 }}>
            Coś poszło nie tak
          </h1>
          <p style={{ margin: 0, maxWidth: '32rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.78)' }}>
            Strona nie wczytała się poprawnie. Spróbuj ponownie - jeśli problem wróci, napisz na
            {' '}
            <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: '#FF8A65' }}>kontakt@ai-seo-company.pl</a>.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => reset()}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', border: 'none', background: '#FFFFFF', color: '#0B1220', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            >
              Spróbuj ponownie
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- pełne przeładowanie po awarii aplikacji */}
            <a
              href="/"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#FFFFFF', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}
            >
              Strona główna
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
