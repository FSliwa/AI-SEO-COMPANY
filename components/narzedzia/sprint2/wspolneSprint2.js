// Wspolne czyste funkcje pomocnicze i arkusz stylow dla 5 narzedzi Sprintu 2 (D1-D5).
// Czysty modul JS (bez 'use client'), bezpieczny do importu zarowno w Server jak i Client Components.

/**
 * Polska odmiana 3-formowa (1 / 2-4 / 5+, z poprawna obsluga liczb 12-14).
 */
export function odmianaPl(n, forma1, forma24, forma5) {
  const abs = Math.abs(Math.trunc(Number(n) || 0));
  if (abs === 1) return forma1;
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forma24;
  return forma5;
}

export function wyczyscDomene(surowy, zapas = 'twojafirma.pl') {
  const s = String(surowy || '').trim();
  if (!s) return zapas;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '') || zapas;
  } catch {
    return s.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] || zapas;
  }
}

export async function skopiujTekst(tekst) {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // metoda zapasowa ponizej
  }
  try {
    const t = document.createElement('textarea');
    t.value = tekst;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand('copy');
    t.remove();
    return ok;
  } catch {
    return false;
  }
}

export function pobierzPlikTekstowy(tekst, nazwaPliku, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([tekst], { type: mime });
  const u = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = u;
  a.download = nazwaPliku;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}

export const CSS_SPRINT2 = `
#narzedzie .r-zwin, #narzedzie .narz-wynik { grid-template-columns: minmax(0, 1fr); min-width: 0; max-width: 100%; box-sizing: border-box; }
#narzedzie .r-zwin > *, #narzedzie .narz-wynik > * { min-width: 0; max-width: 100%; box-sizing: border-box; }
#narzedzie code { max-width: 100%; overflow-wrap: anywhere; }
#narzedzie pre code { overflow-wrap: normal; word-break: normal; }
.sp2-siatka-pola { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 0.85rem; }
.sp2-akcje-form { display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: center; }
.sp2-btn-demo { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; min-height: 48px; padding: 0.7rem 1.15rem; border-radius: 999px; border: 1.5px solid rgba(216, 90, 48, 0.4); background: var(--w-brzoskwinia-tlo, #fdf2ec); color: var(--color-primary, #b93f18); font: inherit; font-size: 0.94rem; font-weight: 600; cursor: pointer; transition: border-color 180ms ease, background-color 180ms ease; }
.sp2-btn-demo:hover { border-color: var(--color-primary, #d85a30); background: rgba(243, 183, 156, 0.34); }
.sp2-btn-demo:focus-visible { outline: 2px solid var(--color-primary, #d85a30); outline-offset: 2px; }
@media (max-width: 600px) {
  .sp2-akcje-form { flex-direction: column; align-items: stretch; }
  .sp2-akcje-form > button { width: 100%; justify-content: center; }
}
.sp2-sekcja-wyniku { border-top: 1px solid var(--w-linia, rgba(30,30,30,0.1)); padding-top: 1.25rem; min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-sekcja-wyniku .narz-h2 { font-weight: 500; letter-spacing: -0.025em; margin: 0 0 0.35rem; }
.sp2-h3 { margin: 0 0 0.4rem; font-size: 1.05rem; font-weight: 600; color: var(--w-tusz); line-height: 1.35; }
.sp2-siatka-kafle { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 165px), 1fr)); gap: 0.65rem; margin-top: 0.85rem; }
.sp2-kafel { min-width: 0; max-width: 100%; box-sizing: border-box; padding: 0.85rem 0.95rem; border-radius: 16px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.sp2-kafel-etykieta { margin: 0; font-size: 0.78rem; color: var(--w-tusz-2); line-height: 1.35; }
.sp2-kafel-wartosc { margin: 0.25rem 0 0; font-size: 1.15rem; font-weight: 700; color: var(--w-tusz); line-height: 1.25; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.sp2-pigulka { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.26rem 0.68rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; line-height: 1.25; font-variant-numeric: tabular-nums; max-width: 100%; overflow-wrap: anywhere; word-break: break-word; white-space: normal; box-sizing: border-box; }
.sp2-pigulka--ok { background: rgba(4, 120, 87, 0.12); color: #047857; }
.sp2-pigulka--uwaga { background: rgba(180, 83, 9, 0.13); color: #b45309; }
.sp2-pigulka--blad { background: rgba(179, 38, 30, 0.13); color: #b3261e; border: 1px solid rgba(179, 38, 30, 0.26); }
.sp2-pigulka--info { background: rgba(30, 64, 175, 0.1); color: #1e40af; }
.sp2-pigulka--neutral { background: rgba(30, 30, 30, 0.08); color: var(--w-tusz-2); }
.sp2-pasek-tlo { height: 10px; border-radius: 999px; background: rgba(30, 30, 30, 0.08); overflow: hidden; margin-top: 0.45rem; }
.sp2-pasek-wypelnienie { height: 100%; border-radius: 999px; transition: width 450ms cubic-bezier(0.2, 0.7, 0.2, 1); }
.sp2-kryteria-siatka { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 0.75rem; margin-top: 0.85rem; }
.sp2-kryterium { padding: 0.9rem 1rem; border-radius: 16px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-kryterium-gora { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; }
.sp2-ai-wycinek { padding: 1.15rem 1.3rem; border-radius: 20px; background: linear-gradient(180deg, #fffdf9 0%, #f7efe5 100%); border: 1.5px solid rgba(216, 90, 48, 0.35); display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.6rem; margin-top: 0.85rem; min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-ai-cytat { margin: 0; padding: 0.85rem 1rem; border-radius: 14px; background: #ffffff; border-left: 4px solid var(--w-pomarancz, #d85a30); font-size: 0.97rem; line-height: 1.6; color: var(--w-tusz); overflow-wrap: anywhere; min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-tabela-wrap, #narzedzie .narz-tabela-wrap { width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.sp2-kod-okno { margin: 0.75rem 0 0; padding: 1rem 1.15rem; border-radius: 16px; background: #141923; color: #f8fafc; font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 0.83rem; line-height: 1.6; overflow-x: auto; white-space: pre; border: 1px solid rgba(255,255,255,0.08); min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-akcje-kodu { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-top: 0.75rem; min-width: 0; max-width: 100%; }
.sp2-skok-lancuch { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; font-family: var(--w-mono, monospace); font-size: 0.8rem; overflow-wrap: anywhere; word-break: break-word; min-width: 0; max-width: 100%; }
.sp2-svg-ramka { width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box; overflow: hidden; border-radius: 20px; background: #101935; border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem; margin-top: 0.85rem; }
.sp2-svg-ramka svg { display: block; width: 100%; height: auto; }
.sp2-qr-uklad { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1.25rem; align-items: center; padding: 1.15rem 1.25rem; border-radius: 20px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); margin-top: 0.85rem; min-width: 0; max-width: 100%; box-sizing: border-box; }
@media (max-width: 680px) { .sp2-qr-uklad { grid-template-columns: minmax(0, 1fr); justify-items: center; text-align: left; } }
.sp2-qr-podglad { width: 208px; max-width: 100%; box-sizing: border-box; padding: 0.75rem; border-radius: 18px; background: #ffffff; border: 1px solid rgba(15, 23, 42, 0.12); box-shadow: 0 12px 28px -18px rgba(10, 19, 55, 0.25); }
.sp2-suwaki-siatka { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 0.95rem; padding: 1rem 1.15rem; border-radius: 18px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); margin-top: 0.85rem; min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-suwak-gora { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; margin-bottom: 0.3rem; }
.sp2-suwak-liczba { font-weight: 700; font-size: 1.05rem; color: var(--w-tusz); font-variant-numeric: tabular-nums; }
.sp2-bofu { padding: clamp(1.25rem, 3vw, 1.75rem); border-radius: 22px; background: linear-gradient(135deg, #101935 0%, #1d2b53 100%); color: #ffffff; display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.85rem; min-width: 0; max-width: 100%; box-sizing: border-box; }
.sp2-bofu h2 { margin: 0; font-size: clamp(1.2rem, 2.4vw, 1.5rem); font-weight: 500; letter-spacing: -0.025em; color: #ffffff; line-height: 1.25; }
.sp2-bofu p { margin: 0; color: rgba(255, 255, 255, 0.86); line-height: 1.6; font-size: 0.96rem; }
.sp2-bofu-akcje { display: flex; flex-wrap: wrap; gap: 0.7rem; align-items: center; margin-top: 0.2rem; }
.sp2-bofu-link { color: #ffd7c2; text-decoration: underline; text-underline-offset: 3px; font-weight: 600; font-size: 0.94rem; }
.sp2-demo-baner { margin: 0; padding: 0.65rem 0.95rem; border-radius: 12px; background: rgba(216, 90, 48, 0.09); border: 1px solid rgba(216, 90, 48, 0.28); color: var(--w-tusz); font-size: 0.88rem; line-height: 1.45; }
`;
