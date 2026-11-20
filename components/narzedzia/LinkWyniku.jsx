'use client';

// „Kopiuj link do wyniku” (S1-poprawki Z-06, agent wspolne, 12.11.2026). Kopiuje adres bieżącej strony
// z parametrami narzędzia (lib/narzedzia/parametrUrl.js) i mówi uczciwie, co ten link robi:
// - tryb 'wypelnij' (domyślnie; audyt, widoczność, makieta, llms.txt, autorytet): link otwiera narzędzie
//   z wpisanym adresem, sprawdzenie startuje dopiero po kliknięciu (limity na IP i koszt),
// - tryb 'wynik' (kalkulator: liczy w przeglądarce): link odtwarza ten sam wynik z tych samych danych.
//   <LinkWyniku narzedzie="audyt_seo" parametry={{ url: adres }} />
//   <LinkWyniku narzedzie="kalkulator" tryb="wynik" parametry={{ klienci: 40, wartosc: 2000 }} />
// Zdarzenie: narzedzie_link_wyniku { narzedzie }.
// 18.11.2026 (anim-system): potwierdzenie wchodzi z ✓ (SVG) i ruchem 240 ms (.r-stan--ok, app/ruch.css); tekst zostaje
// widoczny (bez auto-znikania), żeby jego zniknięcie nie przesuwało zdania obok.

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

export default function LinkWyniku({ parametry, narzedzie, tryb = 'wypelnij', tekst, podsumowanie, className }) {
  const en = useLocale() === 'en';
  const [stan, setStan] = useState({ status: 'idle', link: '', n: 0 });

  async function klikKopiuj() {
    const link = linkZParametrami(parametry);
    if (!link) return;
    const ok = await kopiuj(link);
    setStan((x) => ({ status: ok ? 'ok' : 'blad', link, n: x.n + 1 }));
    if (narzedzie) track('narzedzie_link_wyniku', { narzedzie });
  }

  async function klikUdostepnij() {
    const link = linkZParametrami(parametry);
    if (!link) return;
    const skrot = podsumowanie ? String(podsumowanie).trim() : '';
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: skrot || document.title,
          text: skrot || undefined,
          url: link,
        });
        setStan((x) => ({ status: 'udostepniono', link, n: x.n + 1 }));
        if (narzedzie) track('narzedzie_udostepnij', { narzedzie, metoda: 'native' });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    const tresc = skrot ? `${skrot} - ${link}` : link;
    const ok = await kopiuj(tresc);
    setStan((x) => ({ status: ok ? (skrot ? 'ok_opis' : 'ok') : 'blad', link, n: x.n + 1 }));
    if (narzedzie) track('narzedzie_udostepnij', { narzedzie, metoda: 'schowek' });
  }

  const opis = tryb === 'wynik'
    ? (en ? 'The link recreates this result with the same inputs.' : 'Link odtwarza ten wynik z tymi samymi danymi.')
    : (en ? 'The link opens the tool with the address filled in. The check runs when you click the button.' : 'Link otwiera narzędzie z wpisanym adresem. Sprawdzenie startuje dopiero po kliknięciu przycisku.');

  return (
    <div className={`${st.linkWyniku}${className ? ` ${className}` : ''}`}>
      <div className={st.linkWynikuPrzyciski}>
        <button type="button" className={st.przyciskKopiujLink} onClick={klikKopiuj} data-cta={narzedzie ? `narzedzie_${narzedzie}_link` : undefined}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M6.8 9.2a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-1.1 1.1M9.2 6.8a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l1.1-1.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {tekst ?? (en ? 'Copy link to result' : 'Kopiuj link do wyniku')}
        </button>
        <button type="button" className={st.przyciskUdostepnij} onClick={klikUdostepnij} data-cta={narzedzie ? `narzedzie_${narzedzie}_udostepnij` : undefined}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M11 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM11 14.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6.3 7.1l3-1.8M6.3 8.9l3 1.8" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {en ? 'Share analysis result' : 'Udostępnij wynik analizy'}
        </button>
      </div>
      <span className="narz-mikro" role="status" aria-live="polite">
        {(stan.status === 'ok' || stan.status === 'ok_opis' || stan.status === 'udostepniono') ? (
          <span key={stan.n} className="r-stan--ok">
            <svg className="r-ok-znak" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {stan.status === 'udostepniono'
              ? (en ? 'Result shared. ' : 'Udostępniono wynik. ')
              : stan.status === 'ok_opis'
              ? (en ? 'Summary and link copied. ' : 'Skopiowano podsumowanie z linkiem. ')
              : (en ? 'Link copied. ' : 'Skopiowano link. ')}
          </span>
        ) : null}
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
