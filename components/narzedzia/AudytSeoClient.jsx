'use client';

// Formularz i wynik darmowego audytu SEO (/narzedzia/audyt-seo). API: panel /api/narzedzia/audyt-seo.
// Przed e-mailem: ocena 1-100, cztery kategorie, liczby problemów, PageSpeed i 3 najważniejsze
// problemy z instrukcją. Po e-mailu: wszystkie problemy z adresami podstron i raport na skrzynkę.

import { useState } from 'react';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import BramkaEmail from './BramkaEmail';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

export const KATEGORIE = { techniczne: 'Techniczne', tresc: 'Treść', wydajnosc: 'Wydajność', ai: 'Gotowość na AI' };
const WAGI = { blad: 'Błąd', ostrzezenie: 'Ostrzeżenie', uwaga: 'Uwaga' };
const KROKI = ['Sprawdzamy adres, HTTPS i przekierowania', 'Czytamy robots.txt, mapę strony i llms.txt', 'Przechodzimy po podstronach (do 25)', 'Mierzymy szybkość w PageSpeed Insights', 'Liczymy ocenę'];

function liczbaProblemow(n) {
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return '1 problem';
  return `${n} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? 'problemy' : 'problemów'}`;
}

function odmien(n, [jeden, kilka, wiele]) {
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return `1 ${jeden}`;
  return `${n} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? kilka : wiele}`;
}

function KartaProblemu({ p }) {
  return (
    <li className={`narz-problem narz-problem--${p.waga}`}>
      <p className="narz-problem-meta"><span className="narz-waga">{WAGI[p.waga]}</span> · {KATEGORIE[p.kategoria]}{p.liczba > 1 ? ` · ${p.liczba} podstron` : ''}</p>
      <h3 className="narz-problem-tytul">{p.tytul}</h3>
      <p className="narz-problem-opis">{p.opis}</p>
      <p className="narz-problem-fix"><strong>Jak naprawić:</strong> {p.jakNaprawic}</p>
      {p.strony?.length > 0 && (
        <details className="narz-problem-strony">
          <summary>Adresy ({p.strony.length}{p.liczba > p.strony.length ? ` z ${p.liczba}` : ''})</summary>
          <ul>{p.strony.map((u) => <li key={u}>{u}</li>)}</ul>
        </details>
      )}
    </li>
  );
}

export default function AudytSeoClient() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
  const [filtr, setFiltr] = useState('wszystkie');

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'audyt_seo' });
    const r = await wywolajNarzedzie('audyt_seo', { url: String(fd.get('url') || ''), nick: String(fd.get('nick') || '') });
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'audyt_seo', wynik: r.podglad.wynik });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null });
  }

  const w = stan.pelny ?? stan.podglad;
  const problemy = stan.pelny ? stan.pelny.problemy : stan.podglad?.problemy ?? [];
  const widoczne = filtr === 'wszystkie' ? problemy : problemy.filter((p) => p.kategoria === filtr);

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="audyt-url" className="narz-etykieta">Adres strony</label>
          <div className="narz-bramka-wiersz">
            <input id="audyt-url" name="url" required maxLength={300} placeholder="np. twojafirma.pl" className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_start">
              {stan.status === 'loading' ? 'Sprawdzam…' : 'Sprawdź stronę za darmo'}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">Bez rejestracji. Do 5 audytów dziennie z jednego adresu IP. Audyt trwa zwykle 20 do 90 sekund.</p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={9000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && w && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={w.wynik} podpis="ocena SEO" />
            <div>
              <p className="narz-wynik-domena">{w.domena}</p>
              <p className="narz-wynik-opis">
                Sprawdziliśmy {w.stron} podstron. Znaleźliśmy {liczbaProblemow(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {odmien(w.liczby.bledy, ['błąd', 'błędy', 'błędów'])}, {odmien(w.liczby.ostrzezenia, ['ostrzeżenie', 'ostrzeżenia', 'ostrzeżeń'])} i {odmien(w.liczby.uwagi, ['uwagę', 'uwagi', 'uwag'])}.
              </p>
              <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null })}>Sprawdź inną stronę</button>
            </div>
          </div>
          <ul className="narz-kategorie">
            {Object.entries(w.kategorie).map(([k, v]) => (
              <li key={k}><Ocena wynik={v.wynik} podpis={KATEGORIE[k]} maly /></li>
            ))}
          </ul>
          {w.psi && (
            <p className="narz-psi">PageSpeed Insights (telefon): wydajność {w.psi.wydajnosc ?? '–'}, SEO {w.psi.seo ?? '–'}, dostępność {w.psi.dostepnosc ?? '–'}, dobre praktyki {w.psi.praktyki ?? '–'}.</p>
          )}

          {stan.pelny && <Odblokowano newsletter={stan.newsletter} />}
          <h2 className="narz-h2">{stan.pelny ? 'Wszystkie problemy' : 'Najważniejsze problemy'}</h2>
          {stan.pelny && (
            <div className="narz-filtry" role="group" aria-label="Filtr kategorii">
              {['wszystkie', ...Object.keys(KATEGORIE)].map((k) => (
                <button key={k} type="button" aria-pressed={filtr === k} onClick={() => setFiltr(k)}>{k === 'wszystkie' ? 'Wszystkie' : KATEGORIE[k]}</button>
              ))}
            </div>
          )}
          <ul className="narz-problemy">{widoczne.map((p) => <KartaProblemu key={p.id} p={p} />)}</ul>
          {problemy.length === 0 && <p className="narz-wynik-opis">W sprawdzonym zakresie nie znaleźliśmy problemów.</p>}

          {!stan.pelny && stan.podglad.zablokowane.length > 0 && (
            <div className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {stan.podglad.zablokowane.slice(0, 4).map((p) => (
                  <li key={p.id} className={`narz-problem narz-problem--${p.waga}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{WAGI[p.waga]}</span> · {KATEGORIE[p.kategoria]}</p>
                    <p className="narz-problem-tytul narz-atrapa">Opis problemu i instrukcja naprawy</p>
                    <p className="narz-problem-opis narz-atrapa">Adresy podstron, których dotyczy ten problem</p>
                  </li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                naglowek={`Odblokuj pozostałe ${liczbaProblemow(stan.podglad.zablokowane.length)}`}
                opis="Pokażemy pełną listę tutaj i wyślemy raport e-mailem, gotowy do przekazania programiście."
                korzysci={['Każdy problem z instrukcją naprawy', 'Adresy podstron, których dotyczy', 'Priorytety: od błędów do uwag']}
                przycisk="Pokaż pełny audyt"
                onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
