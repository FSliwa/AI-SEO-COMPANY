'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/*
 * Drobna typografia po stronie przegladarki (7.11.2026, QA wygladu):
 *
 * 1. Sierotki: jednoliterowe "i, w, z, a, o, u" nie zostaja na koncu wiersza -
 *    spacje po nich zamieniamy w wezlach tekstowych na twarda spacje. Tekst
 *    w HTML z serwera sie nie zmienia (robot i strazink fraz widza to samo),
 *    zmienia sie tylko lamanie wierszy na ekranie.
 * 2. Kropka akcentu (::after w app/wyglad.css) nie jest doklejana do
 *    naglowkow, ktore koncza sie juz znakiem interpunkcyjnym ("?", "!", ".").
 *
 * React nie nadpisuje zmienionych wezlow, bo przy kolejnych renderach porownuje
 * wlasne wartosci, nie DOM - a teksty sie nie zmieniaja.
 */
const POMIN = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'SVG', 'NOSCRIPT']);
const SIEROTKA = /(^|[\s(„"])([aiouwzAIOUWZ]) +/g;

function sierotki(korzen) {
  const chodzik = document.createTreeWalker(korzen, NodeFilter.SHOW_TEXT, {
    acceptNode(w) {
      for (let r = w.parentElement; r && r !== korzen; r = r.parentElement) {
        if (POMIN.has(r.tagName.toUpperCase())) return NodeFilter.FILTER_REJECT;
        if (r.classList && r.classList.contains('hero')) return NodeFilter.FILTER_REJECT;
      }
      return / [aiouwzAIOUWZ] |^[aiouwzAIOUWZ] /.test(w.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const wezly = [];
  while (chodzik.nextNode()) wezly.push(chodzik.currentNode);
  for (const w of wezly) {
    const nowy = w.nodeValue.replace(SIEROTKA, '$1$2 ').replace(SIEROTKA, '$1$2 ');
    if (nowy !== w.nodeValue) w.nodeValue = nowy;
  }
}

function kropki() {
  document.querySelectorAll('.section-header h2, .faq-apple-tytul, .portfolio-title').forEach((h) => {
    if (/[?!.:…]\s*$/.test(h.textContent || '')) h.classList.add('bez-kropki');
  });
}

export default function Typografia() {
  const sciezka = usePathname();
  useEffect(() => {
    kropki();
    const start = () => {
      document.querySelectorAll('main, footer').forEach(sierotki);
    };
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 300);
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id); else clearTimeout(id);
    };
  }, [sciezka]);
  return null;
}
