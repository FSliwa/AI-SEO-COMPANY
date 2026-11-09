'use client';

// Drobne elementy darmowych narzędzi: wskaźnik oceny 0-100, postęp oczekiwania, pasek trybu demo.

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { DEMO } from '@/lib/narzedziaApi';

export function kolorOceny(w) {
  if (w >= 80) return 'dobra';
  if (w >= 50) return 'srednia';
  return 'slaba';
}

/** Pierścień z oceną 0-100 (SVG, bez biblioteki). */
export function Ocena({ wynik, podpis, maly = false }) {
  const en = useLocale() === 'en';
  const r = 52;
  const obwod = 2 * Math.PI * r;
  const w = Math.max(0, Math.min(100, Number(wynik) || 0));
  return (
    <div className={`narz-ocena narz-ocena--${kolorOceny(w)}${maly ? ' narz-ocena--mala' : ''}`} role="img" aria-label={`${podpis ? `${podpis}: ` : ''}${w} ${en ? 'out of' : 'na'} 100`}>
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r={r} className="narz-ocena-tlo" />
        <circle cx="60" cy="60" r={r} className="narz-ocena-luk" strokeDasharray={obwod} strokeDashoffset={obwod * (1 - w / 100)} />
      </svg>
      <span className="narz-ocena-liczba" aria-hidden="true">{w}</span>
      {podpis && <span className="narz-ocena-podpis" aria-hidden="true">{podpis}</span>}
    </div>
  );
}

/** Kroki oczekiwania: przełączają się co `co` ms (czas orientacyjny), ostatni czeka na wynik. */
export function Postep({ kroki, co = 6000 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, kroki.length - 1)), co);
    return () => clearInterval(t);
  }, [kroki.length, co]);
  return (
    <ol className="narz-postep" aria-live="polite">
      {kroki.map((k, n) => (
        <li key={k} className={n < i ? 'zrobione' : n === i ? 'teraz' : ''} aria-current={n === i ? 'step' : undefined}>
          {k}
        </li>
      ))}
    </ol>
  );
}

export function PasekDemo() {
  const en = useLocale() === 'en';
  if (!DEMO) return null;
  return <p className="narz-demo" role="note">{en ? 'Demo mode: sample data, no connection to the panel.' : 'Tryb demo: przykładowe dane, bez połączenia z panelem.'}</p>;
}

/** Potwierdzenie po bramce, widoczne nad pełnym wynikiem (bramka znika razem z atrapą). */
export function Odblokowano({ newsletter }) {
  const en = useLocale() === 'en';
  return (
    <div className="narz-bramka narz-bramka--gotowe" role="status">
      <p className="narz-bramka-tytul">{en ? 'Done: the full result is below, and we have emailed you the report.' : 'Gotowe: pełny wynik jest poniżej, raport wysłaliśmy e-mailem.'}</p>
      {newsletter === 'pending' && <p className="narz-bramka-opis">{en ? 'Check your inbox and confirm your newsletter signup. Without confirmation we will not send any issue.' : 'Sprawdź skrzynkę i potwierdź zapis do newslettera. Bez potwierdzenia nie wyślemy żadnego wydania.'}</p>}
    </div>
  );
}
