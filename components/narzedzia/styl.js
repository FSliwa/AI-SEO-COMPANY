// Wspólne style stron /narzedzia (hub, N1, S1). Te same wartości co w AiCheckerClient.jsx
// i AgencySwitchClient.jsx, żeby nowe strony wyglądały jak istniejące narzędzia. Style inline,
// bez zmian w app/globals.css (zasada fundamentu PLAN-v2).

// 12.11.2026 (redesign narzędzi): overflowX 'clip' zamiast 'hidden' (hidden psuje position: sticky spisu sekcji).
export const main = { backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'clip' };
export const hero = { paddingTop: 'clamp(112px, 12vw, 152px)', paddingBottom: '24px' };
export const kontener = { maxWidth: '1180px', margin: '0 auto' };
export const tag = { color: 'var(--color-primary)' };
export const h1 = { fontSize: 'clamp(2.4rem, 5.2vw, 4.25rem)', lineHeight: 1.02, fontWeight: 500, letterSpacing: '-0.04em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)' };
export const h2 = { fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', lineHeight: 1.06, fontWeight: 500, letterSpacing: '-0.04em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)', scrollMarginTop: '112px' };
export const h3 = { fontSize: '1.25rem', lineHeight: 1.3, fontWeight: 600, margin: '1.75rem 0 0.5rem', color: 'var(--color-text-dark)', scrollMarginTop: '112px' };
export const akapit = { fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--color-text-main)', margin: '0 0 1rem' };
export const lista = { margin: '0 0 1rem', paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem', fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)' };
export const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };
export const sekcja = { marginTop: 'clamp(2.5rem, 5vw, 4rem)' };
export const podkreslenie = { textDecoration: 'underline' };
export const przypis = { fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', margin: '0.5rem 0 0' };
export const kod = { fontFamily: 'var(--w-mono)', fontSize: '0.88rem', lineHeight: 1.55 };

// S1-poprawki Z-01 (12.11.2026): lead pod H1 (jedno-dwa zdania obietnicy nad formularzem) i odstęp
// „Krótkiej odpowiedzi” pod narzędziem. Nie używać klasy hero-lead: app/globals.css ustawia jej na
// telefonie margin-bottom: 0 !important i order: 5.
export const lead = { fontSize: '1.1875rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', maxWidth: '680px', margin: '0 0 1.5rem' };
export const poNarzedziu = { marginTop: '2rem' };
// Z-04 / Z-07: nagłówek kolumny i podpis zrzutu.
export const h3Kolumny = { fontSize: '1.05rem', lineHeight: 1.35, fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--color-text-dark)' };
export const podpis = { fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', margin: '0.6rem 0 0', textAlign: 'center' };
