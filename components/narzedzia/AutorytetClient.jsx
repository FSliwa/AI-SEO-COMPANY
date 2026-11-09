'use client';

// Darmowe sprawdzenie autorytetu domeny (/narzedzia/autorytet-domeny). API: panel /api/narzedzia/autorytet
// (Ahrefs, darmowy endpoint Domain Rating). DR widać od razu, bez e-maila. Po e-mailu: porównanie
// z maks. 3 konkurentami i raport. Licencja Ahrefs wymaga podpisu „Domain Rating by Ahrefs” przy wartości.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo, Postep } from './Wspolne';

function Podpis({ licencja, en }) {
  return (
    <p className="narz-licencja">
      {en ? 'Data: ' : 'Dane: '}<a href={licencja?.url || 'https://ahrefs.com/'} target="_blank" rel="noopener">{licencja?.tekst || 'Domain Rating by Ahrefs'}</a>
    </p>
  );
}

export default function AutorytetClient() {
  const en = useLocale() === 'en';
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'autorytet' });
    const r = await wywolajNarzedzie('autorytet', { domena: String(fd.get('domena') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' }, 30_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'autorytet', wynik: r.podglad.dr });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null });
  }

  const p = stan.podglad;
  const lista = stan.pelny ? [{ domena: stan.pelny.domena, dr: stan.pelny.dr, twoja: true }, ...stan.pelny.konkurenci] : [];
  const maks = Math.max(1, ...lista.map((x) => x.dr ?? 0));

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="dr-domena" className="narz-etykieta">{en ? 'Domain' : 'Domena'}</label>
          <div className="narz-bramka-wiersz">
            <input id="dr-domena" name="domena" required maxLength={300} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_dr_start">
              {stan.status === 'loading' ? (en ? 'Checking…' : 'Sprawdzam…') : (en ? 'Check authority' : 'Sprawdź autorytet')}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">{en ? 'No signup, result in a few seconds. Up to 20 domains per day from one IP address.' : 'Bez rejestracji, wynik w kilka sekund. Do 20 domen dziennie z jednego adresu IP.'}</p>
          {stan.status === 'loading' && <Postep kroki={en ? ['Querying the Ahrefs link database', 'Calculating Domain Rating'] : ['Pytamy bazę linków Ahrefs', 'Liczymy Domain Rating']} co={2500} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <div className="narz-dr" aria-label={`Domain Rating ${p.dr}`}>
              <span className="narz-dr-liczba">{p.dr}</span>
              <span className="narz-dr-skala">{en ? 'DR out of 100' : 'DR na 100'}</span>
            </div>
            <div>
              <p className="narz-wynik-domena">{p.domena}</p>
              <p className="narz-wynik-opis"><strong>{en ? 'Level' : 'Poziom'}: {p.poziom}.</strong> {p.tekst}</p>
              <Podpis licencja={p.licencja} en={en} />
              <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null })}>{en ? 'Check another domain' : 'Sprawdź inną domenę'}</button>
            </div>
          </div>

          {stan.pelny ? (
            <div className="narz-porownanie">
              <Odblokowano newsletter={stan.newsletter} />
              <h2 className="narz-h2">{en ? 'Comparison with competitors' : 'Porównanie z konkurencją'}</h2>
              <ul className="narz-slupki">
                {lista.map((x) => (
                  <li key={x.domena} className={x.twoja ? 'twoja' : ''}>
                    <span className="narz-slupki-nazwa">{x.domena}{x.twoja ? (en ? ' (yours)' : ' (Twoja)') : ''}</span>
                    <span className="narz-slupki-pasek" style={{ ['--w']: `${((x.dr ?? 0) / maks) * 100}%` }} />
                    <span className="narz-slupki-wartosc">{x.dr == null ? (en ? 'no data' : 'brak danych') : x.dr}</span>
                  </li>
                ))}
              </ul>
              {lista.length < 2 && <p className="narz-wynik-opis">{en ? 'You did not enter any competitor domains. We have emailed you the report with your DR value.' : 'Nie podałeś domen konkurentów. Raport z wartością DR wysłaliśmy e-mailem.'}</p>}
              <Podpis licencja={stan.pelny.licencja} en={en} />
            </div>
          ) : (
            <BramkaEmail
              narzedzie="autorytet"
              id={stan.id}
              naglowek={en ? 'Compare yourself with competitors' : 'Porównaj się z konkurencją'}
              opis={en ? 'Enter up to 3 competitor domains. We will show who has the stronger link profile and email you the comparison.' : 'Wpisz do 3 domen konkurentów. Pokażemy, kto ma mocniejszy profil linków, i wyślemy zestawienie e-mailem.'}
              korzysci={en ? ['Your domain’s DR next to your competitors', 'What to do at your level of authority'] : ['DR Twojej domeny na tle konkurentów', 'Co zrobić przy Twoim poziomie autorytetu']}
              przycisk={en ? 'Compare and send' : 'Porównaj i wyślij'}
              konkurenci={(fd) => ['k1', 'k2', 'k3'].map((k) => String(fd.get(k) || '').trim()).filter(Boolean)}
              dodatkowePola={(
                <div className="narz-konkurenci">
                  {[1, 2, 3].map((n) => (
                    <label key={n}>
                      <span className="sr-only">{en ? `Competitor domain ${n}` : `Domena konkurenta ${n}`}</span>
                      <input name={`k${n}`} maxLength={300} placeholder={en ? `competitor${n}.com` : `konkurent${n}.pl`} className="narz-pole" inputMode="url" />
                    </label>
                  ))}
                </div>
              )}
              onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
            />
          )}
        </div>
      )}
    </div>
  );
}
