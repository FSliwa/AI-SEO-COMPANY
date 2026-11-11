'use client';

// Formularz i wynik darmowego audytu SEO (/narzedzia/audyt-seo). API: panel /api/narzedzia/audyt-seo.
// Przed e-mailem: ocena 1-100, cztery kategorie, liczby problemów, PageSpeed i 3 najważniejsze
// problemy z instrukcją. Po e-mailu: wszystkie problemy z adresami podstron i raport na skrzynkę.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import BramkaEmail from './BramkaEmail';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

export const KATEGORIE = { techniczne: 'Techniczne', tresc: 'Treść', wydajnosc: 'Wydajność', ai: 'Gotowość na AI' };
const KATEGORIE_EN = { techniczne: 'Technical', tresc: 'Content', wydajnosc: 'Performance', ai: 'AI readiness' };
const WAGI = { blad: 'Błąd', ostrzezenie: 'Ostrzeżenie', uwaga: 'Uwaga' };
const WAGI_EN = { blad: 'Error', ostrzezenie: 'Warning', uwaga: 'Notice' };
const KROKI_EN = ['Checking the address, HTTPS and redirects', 'Reading robots.txt, the sitemap and llms.txt', 'Crawling your pages (up to 25)', 'Measuring speed with PageSpeed Insights', 'Calculating the score'];
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

function liczbaProblemowEn(n) {
  return `${n} ${n === 1 ? 'issue' : 'issues'}`;
}

function KartaProblemu({ p, en }) {
  const wagi = en ? WAGI_EN : WAGI;
  const kat = en ? KATEGORIE_EN : KATEGORIE;
  return (
    <li className={`narz-problem narz-problem--${p.waga}`}>
      <p className="narz-problem-meta"><span className="narz-waga">{wagi[p.waga]}</span> · {kat[p.kategoria]}{p.liczba > 1 ? ` · ${en ? `${p.liczba} pages` : odmien(p.liczba, ['podstrona', 'podstrony', 'podstron'])}` : ''}</p>
      <h3 className="narz-problem-tytul">{p.tytul}</h3>
      <p className="narz-problem-opis">{p.opis}</p>
      <p className="narz-problem-fix"><strong>{en ? 'How to fix it:' : 'Jak naprawić:'}</strong> {p.jakNaprawic}</p>
      {p.strony?.length > 0 && (
        <details className="narz-problem-strony">
          <summary>{en ? 'URLs' : 'Adresy'} ({p.strony.length}{p.liczba > p.strony.length ? ` ${en ? 'of' : 'z'} ${p.liczba}` : ''})</summary>
          <ul>{p.strony.map((u) => <li key={u}>{u}</li>)}</ul>
        </details>
      )}
    </li>
  );
}

export default function AudytSeoClient() {
  const en = useLocale() === 'en';
  const kat = en ? KATEGORIE_EN : KATEGORIE;
  const wagi = en ? WAGI_EN : WAGI;
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
  const [filtr, setFiltr] = useState('wszystkie');

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'audyt_seo' });
    const r = await wywolajNarzedzie('audyt_seo', { url: String(fd.get('url') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' });
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
          <label htmlFor="audyt-url" className="narz-etykieta">{en ? 'Website address' : 'Adres strony'}</label>
          <div className="narz-bramka-wiersz">
            <input id="audyt-url" name="url" required maxLength={300} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_start">
              {stan.status === 'loading' ? (en ? 'Checking…' : 'Sprawdzam…') : (en ? 'Check your site for free' : 'Sprawdź stronę za darmo')}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">{en ? 'No signup. Up to 5 audits per day from one IP address. An audit usually takes 20 to 90 seconds.' : 'Bez rejestracji. Do 5 audytów dziennie z jednego adresu IP. Audyt trwa zwykle 20 do 90 sekund.'}</p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={9000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && w && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={w.wynik} podpis={en ? 'SEO score' : 'ocena SEO'} />
            <div>
              <p className="narz-wynik-domena">{w.domena}</p>
              <p className="narz-wynik-opis">
                {en ? (
                  <>We checked {w.stron} {w.stron === 1 ? 'page' : 'pages'} and found {liczbaProblemowEn(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {w.liczby.bledy} {w.liczby.bledy === 1 ? 'error' : 'errors'}, {w.liczby.ostrzezenia} {w.liczby.ostrzezenia === 1 ? 'warning' : 'warnings'} and {w.liczby.uwagi} {w.liczby.uwagi === 1 ? 'notice' : 'notices'}.</>
                ) : (<>Sprawdziliśmy {odmien(w.stron, ['podstronę', 'podstrony', 'podstron'])}. Znaleźliśmy {liczbaProblemow(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {odmien(w.liczby.bledy, ['błąd', 'błędy', 'błędów'])}, {odmien(w.liczby.ostrzezenia, ['ostrzeżenie', 'ostrzeżenia', 'ostrzeżeń'])} i {odmien(w.liczby.uwagi, ['uwagę', 'uwagi', 'uwag'])}.</>)}
              </p>
              <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null })}>{en ? 'Check another site' : 'Sprawdź inną stronę'}</button>
            </div>
          </div>
          <ul className="narz-kategorie">
            {Object.entries(w.kategorie).map(([k, v]) => (
              <li key={k}>
                {k === 'wydajnosc' && w.wydajnoscZmierzona === false
                  ? <div className="narz-ocena narz-ocena--mala narz-ocena--brak" role="img" aria-label={en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}><span className="narz-ocena-liczba" aria-hidden="true">–</span><span className="narz-ocena-podpis" aria-hidden="true">{en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}</span></div>
                  : <Ocena wynik={v.wynik} podpis={kat[k]} maly />}
              </li>
            ))}
          </ul>
          {w.wydajnoscZmierzona === false && <p className="narz-psi">{en ? 'The PageSpeed Insights speed measurement was temporarily unavailable, so performance is not included in the score.' : 'Pomiar szybkości z PageSpeed Insights był chwilowo niedostępny, więc wydajność nie wchodzi do oceny.'}</p>}
          {w.psi && (
            <p className="narz-psi">{en
              ? <>PageSpeed Insights (mobile): performance {w.psi.wydajnosc ?? '–'}, SEO {w.psi.seo ?? '–'}, accessibility {w.psi.dostepnosc ?? '–'}, best practices {w.psi.praktyki ?? '–'}.</>
              : <>PageSpeed Insights (telefon): wydajność {w.psi.wydajnosc ?? '–'}, SEO {w.psi.seo ?? '–'}, dostępność {w.psi.dostepnosc ?? '–'}, dobre praktyki {w.psi.praktyki ?? '–'}.</>}</p>
          )}

          {stan.pelny && <Odblokowano newsletter={stan.newsletter} />}
          <h2 className="narz-h2">{stan.pelny ? (en ? 'All issues' : 'Wszystkie problemy') : (en ? 'Top issues' : 'Najważniejsze problemy')}</h2>
          {stan.pelny && (
            <div className="narz-filtry" role="group" aria-label={en ? 'Category filter' : 'Filtr kategorii'}>
              {['wszystkie', ...Object.keys(KATEGORIE)].map((k) => (
                <button key={k} type="button" aria-pressed={filtr === k} onClick={() => setFiltr(k)}>{k === 'wszystkie' ? (en ? 'All' : 'Wszystkie') : kat[k]}</button>
              ))}
            </div>
          )}
          <ul className="narz-problemy">{widoczne.map((p) => <KartaProblemu key={p.id} p={p} en={en} />)}</ul>
          {problemy.length === 0 && <p className="narz-wynik-opis">{en ? 'We found no issues in the scope we checked.' : 'W sprawdzonym zakresie nie znaleźliśmy problemów.'}</p>}

          {!stan.pelny && stan.podglad.zablokowane.length > 0 && (
            <div className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {stan.podglad.zablokowane.slice(0, 4).map((p) => (
                  <li key={p.id} className={`narz-problem narz-problem--${p.waga}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{wagi[p.waga]}</span> · {kat[p.kategoria]}</p>
                    <p className="narz-problem-tytul narz-atrapa">{en ? 'Issue description and fix instructions' : 'Opis problemu i instrukcja naprawy'}</p>
                    <p className="narz-problem-opis narz-atrapa">{en ? 'URLs of the pages affected by this issue' : 'Adresy podstron, których dotyczy ten problem'}</p>
                  </li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                naglowek={en ? `Unlock the remaining ${liczbaProblemowEn(stan.podglad.zablokowane.length)}` : `Odblokuj pozostałe ${liczbaProblemow(stan.podglad.zablokowane.length)}`}
                opis={en ? 'We will show the full list here and email you a report you can hand straight to a developer.' : 'Pokażemy pełną listę tutaj i wyślemy raport e-mailem, gotowy do przekazania programiście.'}
                korzysci={en ? ['Every issue with fix instructions', 'The pages each issue affects', 'Priorities: from errors to notices'] : ['Każdy problem z instrukcją naprawy', 'Adresy podstron, których dotyczy', 'Priorytety: od błędów do uwag']}
                przycisk={en ? 'Show the full audit' : 'Pokaż pełny audyt'}
                onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
