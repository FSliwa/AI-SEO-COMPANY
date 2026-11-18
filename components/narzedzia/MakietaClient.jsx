'use client';

// Generator makiety redesignu (/narzedzia/makieta-redesignu). API: panel /api/narzedzia/makieta
// (treści strony + zrzut -> Claude -> HTML bez skryptów). Przed e-mailem: pierwszy ekran nowej
// strony obok obecnej. Po e-mailu: cała makieta, podgląd na telefonie i link w mailu.
// Makieta zawsze w <iframe sandbox=""> (bez skryptów, formularzy i dostępu do strony).
// 12.11.2026 (S1-poprawki): pole „Co ma się poprawić” pod przyciskiem (Z-01b), przykład adresu i ?url=
// tylko wypełnia pole, bez startu (Z-06; limit 2/IP i koszt makiety), link do wyniku przy wyniku.

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import { MAKIETA } from '@/lib/narzedziaLiczby';
import { zachowaniePrzewijania } from '@/lib/ruch';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo, Postep } from './Wspolne';
import './ruch-c.css';

const KROKI_EN = ['Fetching your website and its content', 'Capturing a screenshot of the current design', 'Designing a new section layout', 'Matching colors, typography and the mobile version', 'Assembling the mockup'];
const KROKI = ['Pobieramy Twoją stronę i jej treści', 'Robimy zrzut obecnego wyglądu', 'Projektujemy nowy układ sekcji', 'Dopasowujemy kolory, typografię i wersję na telefon', 'Składamy makietę'];

// 18.11.2026 (anim-narzedzia-c): ramka ze szkieletem pod spodem; iframe wchodzi (opacity) po onLoad albo po 4 s
// (zapas), więc wolne ładowanie nie wygląda na pustą ramkę. Wysokość daje iframe, szkielet tylko ją wypełnia.
function Ramka({ html, tytul, wysokosc = 640, szerokosc = '100%' }) {
  const [gotowa, setGotowa] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGotowa(true), 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="narz-ramka mak-ramka" data-gotowa={gotowa ? '' : undefined} style={{ ['--szer']: szerokosc }}>
      <div className="narz-ramka-pasek" aria-hidden="true"><span /><span /><span /></div>
      <div className="mak-ramka-szk" aria-hidden="true" />
      <iframe title={tytul} srcDoc={html} sandbox="" loading="lazy" referrerPolicy="no-referrer" onLoad={() => setGotowa(true)} style={{ height: wysokosc }} />
    </div>
  );
}

export default function MakietaClient() {
  const en = useLocale() === 'en';
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
  const [widok, setWidok] = useState('komputer');
  const [adres, setAdres] = useState('');
  const poleRef = useRef(null);
  const wynikRef = useRef(null);
  // Rezerwa wysokości na czas zamiany podglądu + bramki w pełną makietę (krótsza o kilkaset px na telefonie):
  // treść pod narzędziem stoi w miejscu, a rezerwę zdejmujemy po dojechaniu przewijania do początku wyniku.
  const [rezerwa, setRezerwa] = useState(0);
  useParametrUrl(['url'], ({ url }) => { if (poleRef.current && url) poleRef.current.value = url; });

  // Po odblokowaniu pokazujemy początek pełnego wyniku (komunikat + makieta), bez skoku: smooth tylko bez reduce.
  useEffect(() => {
    if (!stan.pelny) return undefined;
    wynikRef.current?.scrollIntoView({ block: 'start', behavior: zachowaniePrzewijania() });
    const t = setTimeout(() => setRezerwa(0), 1200);
    return () => clearTimeout(t);
  }, [stan.pelny]);

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = String(fd.get('url') || '').trim();
    setAdres(url);
    zapiszParametry({ url });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'makieta' });
    const r = await wywolajNarzedzie('makieta', { url, cel: String(fd.get('cel') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' }, 290_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'makieta' });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null });
  }

  const p = stan.podglad;
  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="mak-url" className="narz-etykieta">{en ? 'Current website address' : 'Adres obecnej strony'}</label>
          <input ref={poleRef} id="mak-url" name="url" required maxLength={300} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
          <PrzykladAdresu onWybierz={(a) => { if (poleRef.current) { poleRef.current.value = a; poleRef.current.focus(); } }} />
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="narzedzie_makieta_start">
              {stan.status === 'loading' ? (en ? 'Designing…' : 'Projektuję…') : (en ? 'Design a new website' : 'Zaprojektuj nową stronę')}
            </button>
          </div>
          <p className="narz-mikro">{en ? `No signup. The mockup takes ${MAKIETA.minut.replace('-', ' to ')} minutes. Up to ${MAKIETA.limitIp} mockups per day from one IP address.` : `Bez rejestracji. Makieta powstaje ${MAKIETA.minut.replace('-', ' do ')} minut. Do ${MAKIETA.limitIp} makiet dziennie z jednego adresu IP.`}</p>
          <label htmlFor="mak-cel" className="narz-etykieta">{en ? 'What should improve? (optional)' : 'Co ma się poprawić? (opcjonalnie)'}</label>
          <input id="mak-cel" name="cel" maxLength={300} placeholder={en ? 'e.g. more phone calls from customers, a more modern look' : 'np. więcej telefonów od klientów, nowocześniejszy wygląd'} className="narz-pole" />
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={25000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div ref={wynikRef} className="narz-wynik c-skok" aria-live="polite" style={rezerwa ? { minHeight: rezerwa, alignContent: 'start' } : undefined}>
          <p className="narz-wynik-domena">{en ? 'New homepage' : 'Nowa strona główna'}: {p.nazwa}</p>
          {!stan.pelny ? (
            <>
              <div key="przed-bramka" className={`narz-porownanie-makiet${p.zrzut ? '' : ' narz-porownanie-makiet--bez-zrzutu'}`}>
                {p.zrzut && (
                  <figure>
                    <figcaption>{en ? 'Now' : 'Teraz'}</figcaption>
                    {/* eslint-disable-next-line @next/next/no-img-element -- zrzut z zewnętrznej usługi (Microlink), dowolny host: next/image wymagałby listy domen */}
                    <img src={p.zrzut} alt={en ? `Current homepage of ${p.domena}` : `Obecna strona główna ${p.domena}`} loading="lazy" />
                  </figure>
                )}
                <figure>
                  <figcaption>{en ? 'Proposal: first screen' : 'Propozycja: pierwszy ekran'}</figcaption>
                  <Ramka html={p.html} tytul={en ? `Mockup: first screen of ${p.domena}` : `Makieta: pierwszy ekran ${p.domena}`} wysokosc={520} />
                </figure>
              </div>
              <div key="bramka" className="narz-zablokowane mak-zablok">
                <div className="narz-zamglone narz-makieta-atrapa" aria-hidden="true">
                  {Array.from({ length: Math.min(4, Math.max(1, (p.sekcji || 4) - 1)) }, (_, i) => <div key={i} />)}
                </div>
                <BramkaEmail
                  narzedzie="makieta"
                  id={stan.id}
                  naglowek={en ? `Unlock the full mockup (${p.sekcji} ${p.sekcji === 1 ? 'section' : 'sections'})` : `Odblokuj całą makietę (${p.sekcji} sekcji)`}
                  opis={en ? 'We will show the whole page, mobile included, and email you a link to the mockup so you can show it to a partner or a developer.' : 'Pokażemy całą stronę, także na telefonie, i wyślemy link do makiety e-mailem, żeby pokazać ją wspólnikowi albo programiście.'}
                  korzysci={en ? ['All sections: services, advantages, contact, footer', 'Desktop and mobile preview', 'Link valid for 60 days'] : ['Wszystkie sekcje: usługi, przewagi, kontakt, stopka', 'Podgląd na komputerze i telefonie', 'Link ważny 60 dni']}
                  przycisk={en ? 'Show the full mockup' : 'Pokaż całą makietę'}
                  onOdblokowano={(pelny, newsletter) => { setRezerwa(wynikRef.current?.offsetHeight || 0); setStan((s) => ({ ...s, pelny, newsletter })); }}
                />
              </div>
            </>
          ) : (
            <>
              <Odblokowano key="odblokowano" newsletter={stan.newsletter} />
              <div key="filtry" className="narz-filtry" role="group" aria-label={en ? 'Mockup view' : 'Widok makiety'}>
                {(en ? [['komputer', 'Desktop'], ['telefon', 'Mobile']] : [['komputer', 'Komputer'], ['telefon', 'Telefon']]).map(([k, t]) => (
                  <button key={k} type="button" aria-pressed={widok === k} onClick={() => setWidok(k)}>{t}</button>
                ))}
              </div>
              <Ramka key="pelna-ramka" html={stan.pelny.html} tytul={en ? `Website mockup for ${p.domena}` : `Makieta strony ${p.domena}`} wysokosc={widok === 'telefon' ? 760 : 900} szerokosc={widok === 'telefon' ? '390px' : '100%'} />
              {stan.pelny.link && stan.pelny.link !== '#' && (
                <p className="narz-mikro"><a href={stan.pelny.link} target="_blank" rel="noopener">{en ? 'Open the mockup in a new tab' : 'Otwórz makietę w nowej karcie'}</a> {en ? '(we have also emailed you the link).' : '(link wysłaliśmy też e-mailem).'}</p>
              )}
            </>
          )}
          {adres ? <LinkWyniku narzedzie="makieta" parametry={{ url: adres }} /> : null}
          <p className="narz-mikro">{en ? 'The mockup is a design proposal built from your website’s content, not a finished website. Before launch we adapt it to your brand, photos and SEO.' : 'Makieta to propozycja wyglądu z treści Twojej strony, a nie gotowa strona. Przed wdrożeniem dopasowujemy ją do marki, zdjęć i SEO.'}</p>
        </div>
      )}
    </div>
  );
}
