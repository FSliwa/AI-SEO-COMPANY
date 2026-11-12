'use client';

// „Kopiuj link do wyniku” (S1-poprawki Z-06, agent wspolne, 12.11.2026). Kopiuje adres bieżącej strony
// z parametrami narzędzia (lib/narzedzia/parametrUrl.js) i mówi uczciwie, co ten link robi:
// - tryb 'wypelnij' (domyślnie; audyt, widoczność, makieta, llms.txt, autorytet): link otwiera narzędzie
//   z wpisanym adresem, sprawdzenie startuje dopiero po kliknięciu (limity na IP i koszt),
// - tryb 'wynik' (kalkulator: liczy w przeglądarce): link odtwarza ten sam wynik z tych samych danych.
//   <LinkWyniku narzedzie="audyt_seo" parametry={{ url: adres }} />
//   <LinkWyniku narzedzie="kalkulator" tryb="wynik" parametry={{ klienci: 40, wartosc: 2000 }} />
// Zdarzenie: narzedzie_link_wyniku { narzedzie }.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { linkZParametrami } from '@/lib/narzedzia/parametrUrl';
import st from './narzedzia.module.css';

async function kopiuj(tekst) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // brak uprawnień (np. iframe): niżej zapasowa metoda
  }
  try {
    const t = document.createElement('textarea');
    t.value = tekst;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand('copy');
    t.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function LinkWyniku({ parametry, narzedzie, tryb = 'wypelnij', tekst, className }) {
  const en = useLocale() === 'en';
  const [stan, setStan] = useState({ status: 'idle', link: '' });

  async function klik() {
    const link = linkZParametrami(parametry);
    if (!link) return;
    const ok = await kopiuj(link);
    setStan({ status: ok ? 'ok' : 'blad', link });
    if (narzedzie) track('narzedzie_link_wyniku', { narzedzie });
  }

  const opis = tryb === 'wynik'
    ? (en ? 'The link recreates this result with the same inputs.' : 'Link odtwarza ten wynik z tymi samymi danymi.')
    : (en ? 'The link opens the tool with the address filled in. The check runs when you click the button.' : 'Link otwiera narzędzie z wpisanym adresem. Sprawdzenie startuje dopiero po kliknięciu przycisku.');

  return (
    <div className={`${st.linkWyniku}${className ? ` ${className}` : ''}`}>
      <button type="button" className={st.przyciskTekstowy} onClick={klik} data-cta={narzedzie ? `narzedzie_${narzedzie}_link` : undefined}>
        {tekst ?? (en ? 'Copy link to this result' : 'Kopiuj link do wyniku')}
      </button>
      <span className="narz-mikro" role="status" aria-live="polite">
        {stan.status === 'ok' ? (en ? 'Link copied. ' : 'Skopiowano link. ') : null}
        {stan.status === 'blad' ? (en ? 'Copy failed, select the link: ' : 'Nie udało się skopiować, zaznacz link: ') : null}
        {stan.status === 'blad' ? <input readOnly value={stan.link} aria-label={en ? 'Link to the result' : 'Link do wyniku'} className="narz-pole" onFocus={(e) => e.target.select()} /> : null}
        {stan.status !== 'idle' ? opis : null}
      </span>
    </div>
  );
}

/**
 * Wiersz „Przykład: ai-seo-company.pl” pod polem adresu (Z-06). Klik wpisuje adres do pola, NIE uruchamia narzędzia.
 *   <PrzykladAdresu onWybierz={(a) => { poleRef.current.value = a; poleRef.current.focus(); }} />
 */
export function PrzykladAdresu({ onWybierz, adresy = ['ai-seo-company.pl'] }) {
  const en = useLocale() === 'en';
  return (
    <p className="narz-mikro">
      {en ? 'Example: ' : 'Przykład: '}
      {adresy.map((a, i) => (
        <span key={a}>
          {i > 0 ? ', ' : null}
          <button type="button" className={st.przyciskTekstowy} onClick={() => onWybierz?.(a)} aria-label={en ? `Fill in ${a}` : `Wpisz ${a}`}>{a}</button>
        </span>
      ))}
    </p>
  );
}
