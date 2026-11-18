'use client';

// Rozwijany/zwijany blok bez skoku wysokości (18.11.2026, anim-system). Opakowanie klasy .r-zwin z app/ruch.css
// (grid-template-rows 0fr <-> 1fr, opacity). Dzieci zostają zamontowane przez czas zwijania (200 ms), potem
// komponent zwraca null, więc nic niewidocznego nie zostaje w DOM. Pod prefers-reduced-motion: reduce
// zwijanie jest natychmiastowe.
//   <Zwin otwarte={stan.status === 'loading'}>…</Zwin>            wejście animowane (400 ms)
//   <Zwin otwarte={!gotowe} wejscie={false}>…</Zwin>              bez animacji wejścia (blok jest już na stronie)
// Wejście działa przez @starting-style (CSS), więc nie potrzeba requestAnimationFrame.
import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów (nie CSS strony głównej)
import { useEffect, useState } from 'react';
import { czasTokenu } from './wyjscie';

export default function Zwin({ otwarte, wejscie = true, className = '', children, ...reszta }) {
  const [montaz, setMontaz] = useState(Boolean(otwarte));
  if (otwarte && !montaz) setMontaz(true);

  useEffect(() => {
    if (otwarte || !montaz) return undefined;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setMontaz(false), reduce ? 0 : czasTokenu('--r-d-wyj', 200) + 20);
    return () => clearTimeout(t);
  }, [otwarte, montaz]);

  if (!montaz) return null;
  return (
    <div
      {...reszta}
      className={`r-zwin${className ? ` ${className}` : ''}`}
      data-otwarte={otwarte ? '' : undefined}
      data-bez-wej={wejscie ? undefined : ''}
      inert={otwarte ? undefined : true}
    >
      <div>{children}</div>
    </div>
  );
}
