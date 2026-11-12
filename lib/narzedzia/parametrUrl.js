// Parametry adresu stron narzędzi (S1-poprawki Z-06, agent wspolne, 12.11.2026). Tylko dla komponentów
// klienckich (window, hooki). Zasady:
// - ?url= (i parametry danego narzędzia) TYLKO wypełnia pole. Bez automatycznego startu: limity na IP
//   i koszt (makieta, widoczność). Wyjątek: kalkulator liczy w przeglądarce, więc wynik z parametrów może
//   pokazać się od razu (Z-K6 wynik na żywo).
// - Po uruchomieniu: zapiszParametry({ url }) -> history.replaceState (bez przeładowania i bez wpisu
//   w historii), żeby adres w pasku dało się skopiować (LinkWyniku.jsx).
// - SEO: strony narzędzi są statyczne, canonical i hreflang składa lib/stronaPl.js z samej ścieżki,
//   więc /narzedzia/audyt-seo?url=firma.pl ma canonical https://www.ai-seo-company.pl/narzedzia/audyt-seo.
// - window.location zamiast useSearchParams: strony są prerenderowane (generateStaticParams), a
//   useSearchParams bez <Suspense> przerywa prerender (błąd builda „Missing Suspense boundary”).
//
//   useParametrUrl(['url'], ({ url }) => { if (url) poleRef.current.value = url; });   // albo setAdres(url)
//   zapiszParametry({ url: adres });                       // po kliknięciu „Sprawdź”
//   linkZParametrami({ url: adres })                       // pełny adres do skopiowania

import { useEffect, useRef } from 'react';

const MAKS_DLUGOSC = 300;

/** Czyści wartość z adresu: przycina, usuwa znaki sterujące, obcina do 300 znaków. */
export function oczyscWartosc(v) {
  if (typeof v !== 'string') return '';
  return v.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, MAKS_DLUGOSC);
}

/** { klucz: wartość } dla kluczy obecnych i niepustych w window.location.search ({} na serwerze). */
export function czytajParametry(klucze = ['url']) {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const wynik = {};
  for (const k of klucze) {
    const v = oczyscWartosc(p.get(k));
    if (v) wynik[k] = v;
  }
  return wynik;
}

/**
 * Raz po zamontowaniu: jeśli adres ma któryś z kluczy, woła onWczytaj({ klucz: wartość }).
 * Nie zmienia stanu sam i niczego nie uruchamia; wypełnienie pola robi komponent w callbacku.
 */
export function useParametrUrl(klucze = ['url'], onWczytaj) {
  const cb = useRef(onWczytaj);
  useEffect(() => { cb.current = onWczytaj; });
  const lista = klucze.join(',');
  useEffect(() => {
    const w = czytajParametry(lista.split(','));
    if (Object.keys(w).length) cb.current?.(w);
  }, [lista]);
}

function adresZParametrami(wartosci, { zachowajInne = true } = {}) {
  const p = new URLSearchParams(zachowajInne ? window.location.search : '');
  for (const [k, v] of Object.entries(wartosci ?? {})) {
    const czysta = v === null || v === undefined ? '' : oczyscWartosc(String(v));
    if (czysta) p.set(k, czysta); else p.delete(k);
  }
  const q = p.toString();
  return `${window.location.pathname}${q ? `?${q}` : ''}`;
}

/** Po uruchomieniu narzędzia: wpisuje parametry do paska adresu (replaceState, hash zostaje). null/'' usuwa klucz. */
export function zapiszParametry(wartosci) {
  if (typeof window === 'undefined') return;
  try {
    window.history.replaceState(null, '', `${adresZParametrami(wartosci)}${window.location.hash}`);
  } catch {
    // np. tryb prywatny z blokadą history: link w pasku po prostu się nie zmieni
  }
}

/** Pełny adres bieżącej strony narzędzia z TYLKO podanymi parametrami (bez utm i innych). */
export function linkZParametrami(wartosci) {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${adresZParametrami(wartosci, { zachowajInne: false })}`;
}
