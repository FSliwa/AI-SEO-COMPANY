// Wspólne style stron /narzedzia (hub, N1, S1). Te same wartości co w AiCheckerClient.jsx
// i AgencySwitchClient.jsx, żeby nowe strony wyglądały jak istniejące narzędzia. Style inline,
// bez zmian w app/globals.css (zasada fundamentu PLAN-v2).

export const main = { backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' };
export const hero = { paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '24px' };
export const kontener = { maxWidth: '860px', margin: '0 auto' };
export const tag = { color: 'var(--color-primary)', justifyContent: 'center' };
export const h1 = { fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' };
export const h2 = { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)', scrollMarginTop: '110px' };
export const h3 = { fontSize: '1.2rem', lineHeight: 1.3, fontWeight: 700, margin: '1.75rem 0 0.5rem', color: 'var(--color-text-dark)', scrollMarginTop: '110px' };
export const akapit = { fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-main)', margin: '0 0 1rem' };
export const lista = { margin: '0 0 1rem', paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem', fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)' };
export const karta = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };
export const sekcja = { marginTop: '3.5rem' };
export const podkreslenie = { textDecoration: 'underline' };
export const przypis = { fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', margin: '0.5rem 0 0' };
export const kod = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '0.88rem', lineHeight: 1.55 };

// S1-poprawki Z-01 (12.11.2026): lead pod H1 (jedno-dwa zdania obietnicy nad formularzem) i odstęp
// „Krótkiej odpowiedzi” pod narzędziem. Nie używać klasy hero-lead: app/globals.css ustawia jej na
// telefonie margin-bottom: 0 !important i order: 5.
export const lead = { fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto 1.25rem', textAlign: 'center' };
export const poNarzedziu = { marginTop: '2rem' };
// Z-04 / Z-07: nagłówek kolumny i podpis zrzutu.
export const h3Kolumny = { fontSize: '1.05rem', lineHeight: 1.35, fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--color-text-dark)' };
export const podpis = { fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', margin: '0.6rem 0 0', textAlign: 'center' };
