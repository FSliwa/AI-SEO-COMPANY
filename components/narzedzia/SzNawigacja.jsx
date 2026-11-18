'use client';

// Sticky spis sekcji strony szablonu (12.11.2026). Desktop: kolumna po lewej, mobile: pasek
// pigułek pod Headerem. Etykiety to teksty H2 ze strony (nie nowa treść). Gdy `items` brak,
// spis czyta H2 z [data-sz-tresc] po zamontowaniu (SzablonRaport).
import { useEffect, useRef, useState } from 'react';
import { zachowaniePrzewijania } from '@/lib/ruch';

export default function SzNawigacja({ items: poczatkowe = null, etykieta }) {
  const [items, setItems] = useState(poczatkowe || []);
  const [aktywna, setAktywna] = useState(poczatkowe && poczatkowe[0] ? poczatkowe[0].id : null);
  const lista = useRef(null);

  useEffect(() => {
    let wpisy = poczatkowe;
    let cele;
    if (!wpisy) {
      const h2 = [...document.querySelectorAll('[data-sz-tresc] h2[id]')];
      wpisy = h2.map((h) => ({ id: h.id, label: h.textContent }));
      cele = h2.map((h) => h.closest('section') || h.parentElement);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- spis czytany z DOM po hydracji
      setItems(wpisy);
      if (wpisy[0]) setAktywna(wpisy[0].id);
    } else {
      cele = wpisy.map((w) => document.getElementById(w.id));
    }
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const mapa = new Map();
    cele.forEach((el, i) => { if (el && wpisy[i]) mapa.set(el, wpisy[i].id); });
    const obs = new IntersectionObserver((wp) => {
      for (const w of wp) if (w.isIntersecting) setAktywna(mapa.get(w.target));
    }, { rootMargin: '-30% 0px -60% 0px' });
    mapa.forEach((_, el) => obs.observe(el));
    return () => obs.disconnect();
  }, [poczatkowe]);

  // Pasek pigułek na telefonie: aktywna pigułka na środku (tylko przewijanie paska, nie strony).
  // 18.11.2026 (anim-system): behavior z zachowaniePrzewijania() (pod prefers-reduced-motion: reduce skok zamiast animacji).
  useEffect(() => {
    const ul = lista.current;
    if (!ul || ul.scrollWidth <= ul.clientWidth) return;
    const a = ul.querySelector('[aria-current="true"]');
    if (a) ul.scrollTo({ left: a.offsetLeft - ul.clientWidth / 2 + a.offsetWidth / 2, behavior: zachowaniePrzewijania() });
  }, [aktywna]);

  return (
    <nav className="sz-nav" aria-label={etykieta}>
      <span className="sz-nav__postep" aria-hidden="true" />
      <ol className="sz-nav__lista" ref={lista}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={aktywna === it.id ? 'true' : undefined}>{it.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
