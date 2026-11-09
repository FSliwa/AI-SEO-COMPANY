'use client';

// Generator makiety redesignu (/narzedzia/makieta-redesignu). API: panel /api/narzedzia/makieta
// (treści strony + zrzut -> Claude -> HTML bez skryptów). Przed e-mailem: pierwszy ekran nowej
// strony obok obecnej. Po e-mailu: cała makieta, podgląd na telefonie i link w mailu.
// Makieta zawsze w <iframe sandbox=""> (bez skryptów, formularzy i dostępu do strony).

import { useState } from 'react';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo, Postep } from './Wspolne';

const KROKI = ['Pobieramy Twoją stronę i jej treści', 'Robimy zrzut obecnego wyglądu', 'Projektujemy nowy układ sekcji', 'Dopasowujemy kolory, typografię i wersję na telefon', 'Składamy makietę'];

function Ramka({ html, tytul, wysokosc = 640, szerokosc = '100%' }) {
  return (
    <div className="narz-ramka" style={{ ['--szer']: szerokosc }}>
      <div className="narz-ramka-pasek" aria-hidden="true"><span /><span /><span /></div>
      <iframe title={tytul} srcDoc={html} sandbox="" loading="lazy" referrerPolicy="no-referrer" style={{ height: wysokosc }} />
    </div>
  );
}

export default function MakietaClient() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
  const [widok, setWidok] = useState('komputer');

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'makieta' });
    const r = await wywolajNarzedzie('makieta', { url: String(fd.get('url') || ''), cel: String(fd.get('cel') || ''), nick: String(fd.get('nick') || '') }, 290_000);
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
          <label htmlFor="mak-url" className="narz-etykieta">Adres obecnej strony</label>
          <input id="mak-url" name="url" required maxLength={300} placeholder="np. twojafirma.pl" className="narz-pole" inputMode="url" autoComplete="url" />
          <label htmlFor="mak-cel" className="narz-etykieta">Co ma się poprawić? (opcjonalnie)</label>
          <input id="mak-cel" name="cel" maxLength={300} placeholder="np. więcej telefonów od klientów, nowocześniejszy wygląd" className="narz-pole" />
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_makieta_start">
              {stan.status === 'loading' ? 'Projektuję…' : 'Zaprojektuj nową stronę'}
            </button>
          </div>
          <p className="narz-mikro">Bez rejestracji. Makieta powstaje 1 do 3 minut. Do 2 makiet dziennie z jednego adresu IP.</p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={25000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <p className="narz-wynik-domena">Nowa strona główna: {p.nazwa}</p>
          {!stan.pelny ? (
            <>
              <div className={`narz-porownanie-makiet${p.zrzut ? '' : ' narz-porownanie-makiet--bez-zrzutu'}`}>
                {p.zrzut && (
                  <figure>
                    <figcaption>Teraz</figcaption>
                    <img src={p.zrzut} alt={`Obecna strona główna ${p.domena}`} loading="lazy" />
                  </figure>
                )}
                <figure>
                  <figcaption>Propozycja: pierwszy ekran</figcaption>
                  <Ramka html={p.html} tytul={`Makieta: pierwszy ekran ${p.domena}`} wysokosc={520} />
                </figure>
              </div>
              <div className="narz-zablokowane">
                <div className="narz-zamglone narz-makieta-atrapa" aria-hidden="true">
                  {Array.from({ length: Math.min(4, Math.max(1, (p.sekcji || 4) - 1)) }, (_, i) => <div key={i} />)}
                </div>
                <BramkaEmail
                  narzedzie="makieta"
                  id={stan.id}
                  naglowek={`Odblokuj całą makietę (${p.sekcji} sekcji)`}
                  opis="Pokażemy całą stronę, także na telefonie, i wyślemy link do makiety e-mailem, żeby pokazać ją wspólnikowi albo programiście."
                  korzysci={['Wszystkie sekcje: usługi, przewagi, kontakt, stopka', 'Podgląd na komputerze i telefonie', 'Link ważny 60 dni']}
                  przycisk="Pokaż całą makietę"
                  onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
                />
              </div>
            </>
          ) : (
            <>
              <Odblokowano newsletter={stan.newsletter} />
              <div className="narz-filtry" role="group" aria-label="Widok makiety">
                {[['komputer', 'Komputer'], ['telefon', 'Telefon']].map(([k, t]) => (
                  <button key={k} type="button" aria-pressed={widok === k} onClick={() => setWidok(k)}>{t}</button>
                ))}
              </div>
              <Ramka html={stan.pelny.html} tytul={`Makieta strony ${p.domena}`} wysokosc={widok === 'telefon' ? 760 : 900} szerokosc={widok === 'telefon' ? '390px' : '100%'} />
              {stan.pelny.link && stan.pelny.link !== '#' && (
                <p className="narz-mikro"><a href={stan.pelny.link} target="_blank" rel="noopener">Otwórz makietę w nowej karcie</a> (link wysłaliśmy też e-mailem).</p>
              )}
            </>
          )}
          <p className="narz-mikro">Makieta to propozycja wyglądu z treści Twojej strony, a nie gotowa strona. Przed wdrożeniem dopasowujemy ją do marki, zdjęć i SEO.</p>
        </div>
      )}
    </div>
  );
}
