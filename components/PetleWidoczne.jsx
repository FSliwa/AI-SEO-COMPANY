'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/*
 * Animacje w petli (chmury, mgla, unoszace sie warstwy panelu, fale anteny,
 * poziomice) graja tylko, gdy ich sekcja jest na ekranie (7.11.2026).
 * Sekcja z atrybutem data-petla dostaje data-petla="w" albo "poza";
 * app/wyglad.css pauzuje animacje w sekcjach "poza". Bez JS atrybut zostaje
 * pusty i animacje po prostu graja (lub nie graja przy ograniczonym ruchu).
 */
export default function PetleWidoczne() {
  const sciezka = usePathname();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const sekcje = document.querySelectorAll('[data-petla]');
    if (!sekcje.length) return undefined;
    const obserwator = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) w.target.setAttribute('data-petla', w.isIntersecting ? 'w' : 'poza');
    }, { rootMargin: '120px 0px' });
    sekcje.forEach((s) => obserwator.observe(s));
    return () => obserwator.disconnect();
  }, [sciezka]);
  return null;
}
