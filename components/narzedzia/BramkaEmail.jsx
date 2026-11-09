'use client';

// Bramka e-mail darmowych narzędzi (9.11.2026). Stoi ZA pierwszym, prawdziwym wynikiem: najpierw
// użytkownik dostaje ocenę i kilka konkretów (zaangażowanie i ciekawość są wtedy najwyższe),
// potem jedno pole e-mail odblokowuje resztę w tym samym miejscu i wysyła raport.
// - Pełny wynik nie jest w przeglądarce przed bramką: panel zwraca tylko podgląd (zamazana część
//   to atrapa układu, nie dane), więc obejście CSS niczego nie odsłoni.
// - Zgoda na wysłanie wyniku jest konieczna (wynik idzie e-mailem); newsletter to osobny,
//   niezaznaczony checkbox: wynik nie zależy od zapisu (RODO art. 7 ust. 4, decyzja Filipa 9.11.2026).
// - Zdarzenia: narzedzie_bramka (widok), generate_lead (odblokowanie), newsletter_zapis.

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { odblokuj } from '@/lib/narzedziaApi';
import { ODBIORCY, ZGODA_NEWSLETTER } from '@/lib/zgodyNarzedzi';

export default function BramkaEmail({ narzedzie, id = null, naglowek, opis, korzysci = [], przycisk = 'Wyślij i pokaż pełny wynik', dane, konkurenci, dodatkowePola = null, onOdblokowano }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null });
  const ref = useRef(null);
  const widziana = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((w) => {
      if (w.some((x) => x.isIntersecting) && !widziana.current) {
        widziana.current = true;
        track('narzedzie_bramka', { narzedzie });
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [narzedzie]);

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newsletter = fd.get('newsletter') === 'on';
    const body = {
      narzedzie,
      ...(id ? { id } : {}),
      email: String(fd.get('email') || ''),
      zgodaWynik: fd.get('zgodaWynik') === 'on',
      newsletter,
      nick: String(fd.get('nick') || ''),
      ...(dane ? { dane } : {}),
      ...(konkurenci ? { konkurenci: konkurenci(fd) } : {}),
    };
    setStan({ status: 'loading', blad: null });
    const r = await odblokuj(body);
    if (!r.ok) {
      setStan({ status: 'error', blad: r.blad });
      return;
    }
    track('generate_lead', { event_category: 'Narzędzia', plan: narzedzie, currency: 'PLN', value: 50 });
    if (newsletter) track('newsletter_zapis', { zrodlo: narzedzie });
    setStan({ status: 'done', blad: null, newsletter: r.newsletter });
    onOdblokowano?.(r.pelny, r.newsletter);
  }

  if (stan.status === 'done') {
    return (
      <div className="narz-bramka narz-bramka--gotowe" role="status">
        <p className="narz-bramka-tytul">Gotowe: pełny wynik jest niżej, raport wysłaliśmy e-mailem.</p>
        {stan.newsletter === 'pending' && <p className="narz-bramka-opis">Sprawdź skrzynkę i potwierdź zapis do newslettera. Bez potwierdzenia nie wyślemy żadnego wydania.</p>}
      </div>
    );
  }

  return (
    <form ref={ref} className="narz-bramka" onSubmit={wyslij} aria-labelledby={`bramka-${narzedzie}`}>
      <div className="narz-bramka-glowa">
        <span className="narz-bramka-ikona" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        </span>
        <div>
          <p id={`bramka-${narzedzie}`} className="narz-bramka-tytul">{naglowek}</p>
          {opis && <p className="narz-bramka-opis">{opis}</p>}
        </div>
      </div>
      {korzysci.length > 0 && (
        <ul className="narz-bramka-korzysci">
          {korzysci.map((k) => <li key={k}>{k}</li>)}
        </ul>
      )}
      {dodatkowePola}
      <div className="narz-bramka-wiersz">
        <label htmlFor={`email-${narzedzie}`} className="sr-only">Adres e-mail</label>
        <input id={`email-${narzedzie}`} name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" placeholder="twoj@email.pl" className="narz-pole" />
        <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta={`narzedzie_${narzedzie}_odblokuj`}>
          {stan.status === 'loading' ? 'Wysyłam…' : przycisk}
        </button>
      </div>
      {/* Pole-pułapka dla botów: ukryte dla ludzi i czytników ekranu. */}
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
      <label className="narz-zgoda">
        <input type="checkbox" name="zgodaWynik" required />
        <span>
          Wyślijcie mi ten wynik e-mailem. Administrator: AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa). Dane wykorzystamy, żeby wysłać wynik i odpowiedzieć na pytania, i usuniemy po 60 dniach. Odbiorcy: {ODBIORCY[narzedzie]}. Szczegóły w <Link href="/cookies">polityce prywatności</Link>.
        </span>
      </label>
      <label className="narz-zgoda narz-zgoda--newsletter">
        <input type="checkbox" name="newsletter" />
        <span>{ZGODA_NEWSLETTER.tekst}</span>
      </label>
      <p className="narz-bramka-mikro">Raport przychodzi na skrzynkę w ciągu minuty. Pełny wynik zobaczysz też od razu tutaj.</p>
      {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
    </form>
  );
}
