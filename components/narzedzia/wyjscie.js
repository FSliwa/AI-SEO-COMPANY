// Pomocnik ruchu pakietu B (18.11.2026): czas zwijania wyniku przed powrotem do formularza i przewinięcie
// zgodne z "ogranicz ruch". Pod prefers-reduced-motion: reduce wszystko dzieje się od razu.
import { zachowaniePrzewijania } from '@/lib/ruch';

/** Czas z tokenu CSS (np. '--r-d-wyj') w ms; zapas gdy brak dokumentu lub tokenu. */
export function czasTokenu(nazwa, zapas) {
  if (typeof document === 'undefined') return zapas;
  const v = getComputedStyle(document.documentElement).getPropertyValue(nazwa).trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return zapas;
  return v.endsWith('ms') ? n : v.endsWith('s') ? n * 1000 : zapas;
}

export function czasWyjscia() {
  if (typeof window === 'undefined' || !window.matchMedia) return 0;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : czasTokenu('--r-d-wyj', 200) + 40; // + 40 ms: wynik zdąży zniknąć (zwijanie Zwin = --r-d-wyj)
}

/** Przewija kontener narzędzia do widoku tylko wtedy, gdy jego początek jest nad ekranem. */
export function przewinDoNarzedzia() {
  const el = typeof document !== 'undefined' ? document.getElementById('narzedzie') : null;
  if (!el) return;
  const g = el.getBoundingClientRect().top;
  if (g < 0) el.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
}
