'use client';

// Audyt widoczności w AI (/sprawdz-widocznosc-w-ai, zastępuje sprawdzarkę ChatGPT + Gemini od 9.11.2026).
// API: panel /api/narzedzia/widocznosc-ai. Przed e-mailem: ocena 0-100 i siatka „czy padła nazwa”
// dla każdego silnika i pytania. Po e-mailu: treść odpowiedzi, kogo modele polecają zamiast Ciebie
// i z jakich źródeł korzystają, oraz raport e-mailem.

import { useState } from 'react';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import BramkaEmail from './BramkaEmail';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

const KROKI = ['Układamy 3 pytania, jakie zadają Twoi klienci', 'Pytamy ChatGPT, Gemini, Perplexity i Claude', 'Sprawdzamy przegląd AI w Google', 'Szukamy Twojej firmy w odpowiedziach i źródłach'];

function Znak({ stan }) {
  if (stan === 'brak') return <span className="narz-znak narz-znak--brak" title="Google nie pokazał przeglądu AI">–</span>;
  return stan ? <span className="narz-znak narz-znak--tak" aria-label="wymieniona">✓</span> : <span className="narz-znak narz-znak--nie" aria-label="niewymieniona">✕</span>;
}

export default function WidocznoscAiClient() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = { firma: String(fd.get('firma') || ''), branza: String(fd.get('branza') || ''), miasto: String(fd.get('miasto') || ''), www: String(fd.get('www') || ''), nick: String(fd.get('nick') || '') };
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('ai_check_start', { city: body.miasto });
    const r = await wywolajNarzedzie('widocznosc_ai', body, 295_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'widocznosc_ai', wynik: r.podglad.wynik });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null });
  }

  const p = stan.podglad;
  const etykieta = (id) => p?.silniki.find((s) => s.id === id)?.etykieta ?? id;
  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz narz-siatka-formularza" onSubmit={start}>
          <div>
            <label htmlFor="ai-firma" className="narz-etykieta">Nazwa firmy</label>
            <input id="ai-firma" name="firma" required minLength={2} maxLength={100} placeholder="np. Stolarnia Kowalski" className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-branza" className="narz-etykieta">Branża albo usługa</label>
            <input id="ai-branza" name="branza" required minLength={2} maxLength={60} placeholder="np. stolarz, dentysta, księgowa" className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-miasto" className="narz-etykieta">Miasto (opcjonalnie)</label>
            <input id="ai-miasto" name="miasto" maxLength={60} placeholder="np. Warszawa; puste = cała Polska" className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-www" className="narz-etykieta">Strona www (opcjonalnie)</label>
            <input id="ai-www" name="www" maxLength={200} placeholder="np. firma.pl" className="narz-pole" inputMode="url" />
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="ai_check_submit">
              {stan.status === 'loading' ? 'Pytamy modele AI… (do 2 min)' : 'Sprawdź widoczność w AI za darmo'}
            </button>
          </div>
          <p className="narz-mikro">Bez rejestracji. Do 2 firm dziennie z jednego adresu IP.</p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={p.wynik} podpis="widoczność w AI" />
            <div>
              <p className="narz-wynik-domena">{p.firma}</p>
              <p className="narz-wynik-opis">Firma pojawia się w <strong>{p.wzmianki} z {p.odpowiedzi}</strong> odpowiedzi AI na pytania klientów z branży „{p.branza}”{p.miasto ? ` (${p.miasto})` : ''}.</p>
              <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null })}>Sprawdź inną firmę</button>
            </div>
          </div>

          <div className="narz-tabela-wrap">
            <table className="narz-tabela">
              <caption className="sr-only">Czy firma pada w odpowiedziach poszczególnych silników AI</caption>
              <thead>
                <tr><th scope="col">Silnik</th>{p.pytania.map((q, i) => <th key={q} scope="col" title={q}>Pytanie {i + 1}</th>)}<th scope="col">Wynik</th></tr>
              </thead>
              <tbody>
                {p.silniki.map((s) => (
                  <tr key={s.id} className={s.dostepny ? '' : 'niedostepny'}>
                    <th scope="row"><span className="narz-silnik">{s.etykieta}</span><span className="narz-mikro">{s.opis}</span></th>
                    {s.dostepny
                      ? p.pytania.map((q) => {
                        const c = p.siatka.find((x) => x.silnik === s.id && x.pytanie === q);
                        return <td key={q}>{c ? <Znak stan={c.brakOdpowiedzi ? 'brak' : c.wymieniona} /> : '–'}</td>;
                      })
                      : <td colSpan={p.pytania.length} className="narz-mikro">{s.powod}</td>}
                    <td>{s.dostepny ? `${s.wzmianki}/${s.odpowiedzi}` : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="narz-pytania">
            <summary>Jakie pytania zadaliśmy</summary>
            <ol>{p.pytania.map((q) => <li key={q}>{q}</li>)}</ol>
          </details>

          {!stan.pelny ? (
            <div className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="narz-problem"><p className="narz-problem-tytul narz-atrapa">Kogo poleca model zamiast Twojej firmy</p><p className="narz-problem-opis narz-atrapa">Fragment odpowiedzi i strony, na które powołuje się AI</p></li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="widocznosc_ai"
                id={stan.id}
                naglowek="Zobacz, kogo AI poleca zamiast Ciebie"
                opis={`Pokażemy treść ${p.odpowiedzi} odpowiedzi, ${p.konkurentow ? `${p.konkurentow} firm, które modele wymieniają, ` : ''}i ${p.zrodel || 'wszystkie'} źródeł, z których korzystają. Raport wyślemy e-mailem.`}
                korzysci={['Pełne odpowiedzi ChatGPT, Gemini, Perplexity, Claude i Google', 'Konkurenci, których modele polecają', 'Strony, na których warto mieć wzmiankę']}
                przycisk="Pokaż odpowiedzi AI"
                onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
              />
            </div>
          ) : (
            <div className="narz-pelne-ai">
              <Odblokowano newsletter={stan.newsletter} />
              {stan.pelny.konkurenci?.length > 0 && (
                <div role="region" aria-labelledby="ai-konkurenci">
                  <h2 id="ai-konkurenci" className="narz-h2">Kogo modele wymieniają</h2>
                  <ul className="narz-chipy">{stan.pelny.konkurenci.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                </div>
              )}
              {stan.pelny.zrodla?.length > 0 && (
                <div role="region" aria-labelledby="ai-zrodla">
                  <h2 id="ai-zrodla" className="narz-h2">Z jakich stron korzystają</h2>
                  <ul className="narz-chipy">{stan.pelny.zrodla.map((z) => <li key={z.domena}>{z.domena} <span>×{z.ile}</span></li>)}</ul>
                  <p className="narz-mikro">Wzmianka o firmie na tych stronach zwiększa szansę, że model ją poleci.</p>
                </div>
              )}
              <h2 className="narz-h2">Odpowiedzi</h2>
              <ul className="narz-problemy">
                {stan.pelny.wiersze.filter((r) => !r.brakOdpowiedzi).map((r) => (
                  <li key={`${r.silnik}-${r.pytanie}`} className={`narz-problem ${r.wymieniona ? 'narz-problem--ok' : 'narz-problem--blad'}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{etykieta(r.silnik)}</span> · {r.wymieniona ? 'firma wymieniona' : 'firma niewymieniona'}</p>
                    <h3 className="narz-problem-tytul">{r.pytanie}</h3>
                    <p className="narz-problem-opis">{r.fragment ? `„${r.fragment}”` : r.odpowiedz.slice(0, 600)}</p>
                    {r.zrodla.length > 0 && <p className="narz-mikro">Źródła: {r.zrodla.join(', ')}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="narz-mikro">Odpowiedzi pochodzą z API modeli i mogą różnić się od tego, co ktoś zobaczy w aplikacji. Zmieniają się z dnia na dzień.</p>
        </div>
      )}
    </div>
  );
}
