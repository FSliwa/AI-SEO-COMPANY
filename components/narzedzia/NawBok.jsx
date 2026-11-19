'use client';

// Spis sekcji stron narzędzi (PL, EN, DE; DE przez cienki wrapper w components/de/narzedzia/WspolneDe.jsx).
// Zero nowych tekstów: linki powstają z istniejących H2 z id (czytane z DOM po hydracji).
// 18.11.2026 (nav-narzedzia): spis jedzie razem z ekranem, jak spis stron szablonów (SzNawigacja).
//  - od 1024 px: sticky kolumna po prawej (top pod nagłówkiem, własne przewijanie, zatrzymuje się na końcu .tresc),
//  - poniżej 1024 px: zwarty pasek pod nagłówkiem z nazwą bieżącej sekcji; dotknięcie rozwija pełną listę
//    (button z aria-expanded; lista chowana z układu tylko gdy zwinięta; zamyka się po wyborze i na Escape).
// Pasek na telefonie jest position: fixed, więc nie zmienia układu (CLS 0) i nie zależy od miejsca w DOM.
// Aktywna sekcja: scroll w rAF (nagłówek powyżej linii = „minięty”); aria-current="location".
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import st from './narzedzia.module.css';

const ETYKIETY = { pl: 'Na tej stronie', en: 'On this page', de: 'Auf dieser Seite' };
// Linia „bieżącej sekcji” mierzona od góry okna: pod nagłówkiem strony (+ pasek na telefonie).
const LINIA_PX = 160;

export default function NawBok({ rootId, etykieta }) {
  const locale = useLocale();
  const opis = etykieta ?? ETYKIETY[locale] ?? ETYKIETY.pl;
  const panelId = useId();
  const [poz, setPoz] = useState([]);
  const [aktywna, setAktywna] = useState(null);
  const [widoczny, setWidoczny] = useState(false); // pasek na telefonie: tylko gdy czytamy treść strony
  const [otwarta, setOtwarta] = useState(false);
  const aside = useRef(null);
  const przycisk = useRef(null);
  const lista = useRef(null);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return undefined;
    const naglowki = [...root.querySelectorAll('section > h2[id]')].filter((h) => !h.closest('[aria-live]'));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- spis czytany z DOM po hydracji
    setPoz(naglowki.map((h) => ({ id: h.id, tekst: h.textContent.trim() })));
    if (naglowki[0]) setAktywna(naglowki[0].id);

    // Aktywna sekcja i widoczność paska liczone ze scrolla (rAF, passive): działa też po skoku bez przecięcia
    // nagłówka (przywrócenie pozycji, instant scroll). Aktywna = ostatni nagłówek z top <= LINIA_PX, inaczej pierwszy.
    let ramka = 0;
    const licz = () => {
      ramka = 0;
      let id = naglowki[0]?.id ?? null;
      for (const h of naglowki) {
        if (h.getBoundingClientRect().top <= LINIA_PX) id = h.id; else break;
      }
      setAktywna(id);
      const pierwszy = naglowki[0]?.getBoundingClientRect().top ?? Infinity;
      setWidoczny(pierwszy < LINIA_PX && root.getBoundingClientRect().bottom > LINIA_PX);
    };
    const zaplanuj = () => { if (!ramka) ramka = requestAnimationFrame(licz); };
    licz();
    window.addEventListener('scroll', zaplanuj, { passive: true });
    window.addEventListener('resize', zaplanuj);
    return () => {
      window.removeEventListener('scroll', zaplanuj);
      window.removeEventListener('resize', zaplanuj);
      if (ramka) cancelAnimationFrame(ramka);
    };
  }, [rootId]);

  const zamknij = useCallback((fokus) => {
    setOtwarta(false);
    if (fokus) przycisk.current?.focus();
  }, []);

  // Escape i dotknięcie poza paskiem zamykają rozwiniętą listę (telefon).
  useEffect(() => {
    if (!otwarta) return undefined;
    const klawisz = (e) => { if (e.key === 'Escape') zamknij(true); };
    const poza = (e) => { if (aside.current && !aside.current.contains(e.target)) setOtwarta(false); };
    document.addEventListener('keydown', klawisz);
    document.addEventListener('pointerdown', poza);
    return () => { document.removeEventListener('keydown', klawisz); document.removeEventListener('pointerdown', poza); };
  }, [otwarta, zamknij]);

  // Gdy pasek znika (koniec treści), lista się zwija, żeby nie została otwarta w tle.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- zwinięcie listy po zniknięciu paska
    if (!widoczny) setOtwarta(false);
  }, [widoczny]);

  // Długa lista ma własne przewijanie: aktywna pozycja zostaje w widoku listy (przewija się tylko lista, nie strona).
  useEffect(() => {
    const kont = lista.current?.parentElement;
    if (!kont || kont.scrollHeight <= kont.clientHeight) return;
    const a = lista.current.querySelector('a[aria-current="location"]');
    if (!a) return;
    const gora = a.offsetTop;
    const dol = gora + a.offsetHeight;
    if (gora < kont.scrollTop) kont.scrollTop = Math.max(0, gora - 8);
    else if (dol > kont.scrollTop + kont.clientHeight) kont.scrollTop = dol - kont.clientHeight + 8;
  }, [aktywna]);

  const biezaca = poz.find((p) => p.id === aktywna)?.tekst ?? poz[0]?.tekst ?? '';

  return (
    <aside ref={aside} className={st.nawBok} data-widoczny={widoczny ? '' : undefined} data-otwarta={otwarta ? '' : undefined}>
      <nav aria-label={opis} className={st.nawSpis} hidden={poz.length < 3}>
        <button
          ref={przycisk}
          type="button"
          className={st.nawPrzycisk}
          aria-expanded={otwarta}
          aria-controls={panelId}
          onClick={() => setOtwarta((o) => !o)}
        >
          <span className={st.nawBiezaca}>{biezaca}</span>
          <svg className={st.nawStrzalka} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div id={panelId} className={st.nawPanel}>
          <ol ref={lista}>
            {poz.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className={aktywna === p.id ? st.nawAktywna : undefined}
                  aria-current={aktywna === p.id ? 'location' : undefined}
                  onClick={() => setOtwarta(false)}
                >{p.tekst}</a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </aside>
  );
}
