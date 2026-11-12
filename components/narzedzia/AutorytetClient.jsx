'use client';

// Darmowe sprawdzenie autorytetu domeny (/narzedzia/autorytet-domeny). API: panel /api/narzedzia/autorytet
// (Ahrefs, darmowy endpoint GET /v3/public/domain-rating-free, DR4 od 1.12.2026).
// 12.11.2026 (decyzja właściciela): DR i porównanie z maks. 3 konkurentami w JEDNYM wywołaniu, bez e-maila.
// Bramka tylko wysyła raport z planem działania (BramkaEmail tylkoRaport). Licencja Ahrefs: podpis
// „Domain Rating by Ahrefs” z linkiem przy każdej pokazanej wartości (pod liczbą DR i nad wykresem porównania).
// Limit panelu: 20 domen na IP na dobę (własna + każdy konkurent); panel zwraca pozostalo i pominieci.
// Parametry adresu (Z-06): ?url=domena&porownaj=a.pl,b.pl tylko WYPEŁNIAJĄ pola, bez automatycznego startu.

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { DEMO, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import BramkaEmail from './BramkaEmail';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import { PasekDemo, Postep } from './Wspolne';

const PUSTE = ['', '', ''];
const LICENCJA = { tekst: AUTORYTET.atrybucja, url: 'https://ahrefs.com/' };

function Atrybucja({ licencja }) {
  return <a href={licencja?.url || LICENCJA.url} target="_blank" rel="noopener">{licencja?.tekst || LICENCJA.tekst}</a>;
}

// Tryb demo: lib/narzedziaDemo.js zwraca jeszcze sam DR (porównanie było za bramką). Uzupełniamy przykładowe
// DR konkurentów tylko lokalnie; DEMO jest stałą z NEXT_PUBLIC_*, więc na produkcji ten kod nie działa.
function uzupelnijDemo(p, konkurenci, en) {
  if (!DEMO || p.konkurenci) return p;
  const lista = konkurenci.map((domena, i) => ({ domena, dr: [41, 12, 35][i] }));
  const lider = lista.reduce((a, b) => (b.dr > (a?.dr ?? -1) ? b : a), null);
  const porownanie = lider && lider.dr > p.dr
    ? (en ? `You are ${lider.dr - p.dr} points behind ${lider.domena} (DR ${lider.dr}). That is a clear advantage in links: for the keywords you compete for, you need links from industry sites and media, not only better content.`
      : `Do ${lider.domena} (DR ${lider.dr}) brakuje Ci ${lider.dr - p.dr} pkt. To wyraźna przewaga w linkach: na frazy, o które konkurujecie, potrzebujesz linków z serwisów branżowych i mediów, nie tylko lepszej treści.`)
    : null;
  return { ...p, konkurenci: lista, porownanie, pominieci: [], pozostalo: AUTORYTET.limitIp - 1 - lista.length, limit: AUTORYTET.limitIp, wersja: 'dr4', sprawdzono: new Date().toISOString() };
}

export default function AutorytetClient() {
  const en = useLocale() === 'en';
  const [pola, setPola] = useState({ domena: '', k: PUSTE });
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null });
  const poleRef = useRef(null);
  const konkurentRef = useRef(null);

  useParametrUrl(['url', 'porownaj'], ({ url, porownaj }) => {
    const k = String(porownaj || '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, AUTORYTET.konkurentow);
    setPola({ domena: url || '', k: [...k, ...PUSTE].slice(0, AUTORYTET.konkurentow) });
  });

  const liczba = (n) => (n == null ? '' : Number(n).toLocaleString(en ? 'en-GB' : 'pl-PL', { maximumFractionDigits: 1 }));
  const data = (iso) => (iso ? new Date(iso).toLocaleDateString(en ? 'en-GB' : 'pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : '');

  async function start(e) {
    e.preventDefault();
    const domena = pola.domena.trim();
    const konkurenci = pola.k.map((x) => x.trim()).filter(Boolean);
    setStan({ status: 'loading', blad: null, id: null, podglad: null });
    zapiszParametry({ url: domena, porownaj: konkurenci.join(',') || null });
    track('narzedzie_start', { narzedzie: 'autorytet', konkurentow: konkurenci.length });
    const r = await wywolajNarzedzie('autorytet', { domena, konkurenci, nick: String(new FormData(e.currentTarget).get('nick') || ''), lang: en ? 'en' : 'pl' }, 60_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    const podglad = uzupelnijDemo(r.podglad, konkurenci, en);
    track('narzedzie_wynik', { narzedzie: 'autorytet', wynik: podglad.dr, konkurentow: podglad.konkurenci?.length ?? 0 });
    setStan({ status: 'done', blad: null, id: r.id, podglad });
  }

  function edytuj(doKonkurentow = false) {
    setStan({ status: 'idle', blad: null, id: null, podglad: null });
    setTimeout(() => (doKonkurentow ? konkurentRef.current : poleRef.current)?.focus(), 0);
  }

  const p = stan.podglad;
  const konkurenci = p?.konkurenci ?? [];
  const lista = p ? [{ domena: p.domena, dr: p.dr, twoja: true }, ...konkurenci] : [];
  const maks = Math.max(1, ...lista.map((x) => x.dr ?? 0));
  const bezDanych = konkurenci.filter((k) => k.dr == null).length;
  const wersja = p?.wersja ? p.wersja.toUpperCase() : 'DR4';

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="dr-domena" className="narz-etykieta">{en ? 'Your domain' : 'Twoja domena'}</label>
          <div className="narz-bramka-wiersz">
            <input ref={poleRef} id="dr-domena" name="domena" required maxLength={300} value={pola.domena} onChange={(e) => setPola((x) => ({ ...x, domena: e.target.value }))} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_dr_start">
              {stan.status === 'loading' ? (en ? 'Checking…' : 'Sprawdzam…') : (en ? 'Check authority' : 'Sprawdź autorytet')}
            </button>
          </div>
          <PrzykladAdresu onWybierz={(a) => { setPola((x) => ({ ...x, domena: a })); poleRef.current?.focus(); }} />
          <fieldset style={{ border: 0, padding: 0, margin: '1rem 0 0', minWidth: 0 }}>
            <legend className="narz-etykieta" style={{ padding: 0 }}>{en ? `Competitors to compare (optional, up to ${AUTORYTET.konkurentow})` : `Konkurenci do porównania (opcjonalnie, do ${AUTORYTET.konkurentow})`}</legend>
            <div className="narz-konkurenci">
              {pola.k.map((wartosc, i) => (
                <label key={i}>
                  <span className="sr-only">{en ? `Competitor domain ${i + 1}` : `Domena konkurenta ${i + 1}`}</span>
                  <input
                    ref={i === 0 ? konkurentRef : undefined}
                    name={`k${i + 1}`}
                    maxLength={300}
                    value={wartosc}
                    onChange={(e) => setPola((x) => ({ ...x, k: x.k.map((v, n) => (n === i ? e.target.value : v)) }))}
                    placeholder={en ? `competitor${i + 1}.com` : `konkurent${i + 1}.pl`}
                    className="narz-pole"
                    inputMode="url"
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">
            {en
              ? `Free, no sign-up and no email: your DR and the comparison right away. Up to ${AUTORYTET.limitIp} domains per day from one IP address; each competitor counts as one domain.`
              : `Za darmo, bez rejestracji i bez e-maila: DR i porównanie od razu. Do ${AUTORYTET.limitIp} domen dziennie z jednego adresu IP; każdy konkurent to jedna domena.`}
          </p>
          <p className="narz-mikro">{en ? 'Data: ' : 'Dane: '}<Atrybucja />{en ? ', DR4 version (Ahrefs’ new DR from 1 December 2026).' : ', wersja DR4 (nowy DR Ahrefs od 1 grudnia 2026).'}</p>
          {stan.status === 'loading' && <Postep kroki={en ? ['Querying the Ahrefs link database', 'Fetching Domain Rating for each domain', 'Comparing the results'] : ['Pytamy bazę linków Ahrefs', 'Pobieramy Domain Rating każdej domeny', 'Porównujemy wyniki']} co={2000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <div className="narz-dr" aria-label={`Domain Rating ${liczba(p.dr)}`}>
              <span className="narz-dr-liczba">{liczba(p.dr)}</span>
              <span className="narz-dr-skala">{en ? 'DR out of 100' : 'DR na 100'}</span>
            </div>
            <div>
              <p className="narz-wynik-domena">{p.domena}</p>
              <p className="narz-wynik-opis"><strong>{en ? 'Level' : 'Poziom'}: {p.poziom}.</strong> {p.tekst}</p>
              <p className="narz-licencja">
                {en ? 'Data: ' : 'Dane: '}<Atrybucja licencja={p.licencja} />{` (${wersja})`}
                {p.sprawdzono ? (en ? `, checked on ${data(p.sprawdzono)}.` : `, sprawdzone ${data(p.sprawdzono)}.`) : '.'}
              </p>
              <button type="button" className="narz-link" onClick={() => edytuj(false)}>{en ? 'Check another domain' : 'Sprawdź inną domenę'}</button>
            </div>
          </div>

          {konkurenci.length > 0 ? (
            <div className="narz-porownanie">
              <h2 className="narz-h2">{en ? 'Comparison with competitors' : 'Porównanie z konkurencją'}</h2>
              <p className="narz-licencja">{en ? 'Values: ' : 'Wartości: '}<Atrybucja licencja={p.licencja} />{en ? ` (${wersja}), 0‑100 scale.` : ` (${wersja}), skala 0‑100.`}</p>
              <ul className="narz-slupki">
                {lista.map((x) => (
                  <li key={x.domena} className={x.twoja ? 'twoja' : ''}>
                    <span className="narz-slupki-nazwa">{x.domena}{x.twoja ? (en ? ' (yours)' : ' (Twoja)') : ''}</span>
                    <span className="narz-slupki-pasek" style={{ ['--w']: `${((x.dr ?? 0) / maks) * 100}%` }} />
                    <span className="narz-slupki-wartosc">{x.dr == null ? (en ? 'no data' : 'brak') : liczba(x.dr)}</span>
                  </li>
                ))}
              </ul>
              {p.porownanie && <p className="narz-wynik-opis" style={{ marginTop: '1rem' }}>{p.porownanie}</p>}
              {bezDanych > 0 && <p className="narz-mikro">{en ? 'No data: Ahrefs did not return a value for this domain this time. Try again in a few minutes.' : 'Brak: Ahrefs nie zwrócił tym razem wartości dla tej domeny. Spróbuj ponownie za kilka minut.'}</p>}
              {p.pominieci?.length > 0 && <p className="narz-mikro">{en ? `Daily limit reached, so we did not check: ${p.pominieci.join(', ')}. Try again tomorrow.` : `Dzienny limit domen się wyczerpał, więc nie sprawdziliśmy: ${p.pominieci.join(', ')}. Spróbuj jutro.`}</p>}
              <button type="button" className="narz-link" onClick={() => edytuj(true)}>{en ? 'Change competitors' : 'Zmień konkurentów'}</button>
            </div>
          ) : (
            <div className="narz-porownanie">
              <p className="narz-wynik-opis">
                {en ? 'Whether this DR is good depends on the companies you compete with. ' : 'Czy ten DR jest dobry, zależy od firm, z którymi konkurujesz. '}
                <button type="button" className="narz-link" onClick={() => edytuj(true)}>{en ? `Add up to ${AUTORYTET.konkurentow} competitors and compare for free` : `Dodaj do ${AUTORYTET.konkurentow} konkurentów i porównaj za darmo`}</button>
              </p>
            </div>
          )}

          {p.pozostalo != null && <p className="narz-mikro">{en ? `Left today from your IP address: ${p.pozostalo} of ${p.limit ?? AUTORYTET.limitIp} domain checks.` : `Zostało dziś z Twojego adresu IP: ${p.pozostalo} z ${p.limit ?? AUTORYTET.limitIp} sprawdzeń domen.`}</p>}
          <LinkWyniku narzedzie="autorytet" parametry={{ url: p.domena, porownaj: konkurenci.map((k) => k.domena).join(',') || null }} />

          <BramkaEmail
            narzedzie="autorytet"
            id={stan.id}
            tylkoRaport
            naglowek={en ? 'Get the report with an action plan' : 'Raport z planem działania na e-mail'}
            opis={en ? 'You can already see the whole result above. By email we will send it with a plan: which link building steps will do the most at your DR and your gap to competitors.' : 'Cały wynik widzisz już wyżej. E-mailem wyślemy go z planem: które działania przy zdobywaniu linków dadzą najwięcej przy Twoim DR i różnicy do konkurentów.'}
            korzysci={en
              ? ['Your DR and the comparison with the check date, to compare again in a quarter', 'An action plan in order: where to start, based on our SEO playbook', 'Which links to avoid so that you do not risk a Google penalty']
              : ['DR i porównanie z datą sprawdzenia, żeby za kwartał porównać postęp', 'Plan działania w kolejności: od czego zacząć, według naszego playbooka SEO', 'Jakich linków unikać, żeby nie ryzykować kary Google']}
          />
        </div>
      )}
    </div>
  );
}
