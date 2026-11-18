'use client';

// Sticky spis sekcji po prawej stronie długich stron narzędzi (desktop ≥ 1180 px). Zero nowych tekstów:
// linki powstają z istniejących H2 z id (czytane z DOM po hydracji), aktywna pozycja przez IntersectionObserver.
// Kolumna ma stałą szerokość w siatce, więc pojawienie się linków nie przesuwa układu (CLS 0).
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import st from './narzedzia.module.css';

export default function NawBok({ rootId }) {
  const en = useLocale() === 'en';
  const [poz, setPoz] = useState([]);
  const [aktywna, setAktywna] = useState(null);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return undefined;
    const naglowki = [...root.querySelectorAll('section > h2[id]')].filter((h) => !h.closest('[aria-live]'));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- spis czytany z DOM po hydracji
    setPoz(naglowki.map((h) => ({ id: h.id, tekst: h.textContent.trim() })));
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((wpisy) => {
      wpisy.forEach((w) => { if (w.isIntersecting) setAktywna(w.target.id); });
    }, { rootMargin: '-25% 0px -65% 0px' });
    naglowki.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [rootId]);

  return (
    <aside className={st.nawBok}>
      <nav aria-label={en ? 'On this page' : 'Na tej stronie'} className={st.nawSpis} hidden={poz.length < 3}>
        <ol>
          {poz.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className={aktywna === p.id ? st.nawAktywna : undefined} aria-current={aktywna === p.id ? 'true' : undefined}>{p.tekst}</a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
