'use client';

// Darmowe sprawdzenie autorytetu domeny (/narzedzia/autorytet-domeny). API: panel /api/narzedzia/autorytet.
// 12.11.2026 (decyzja właściciela): bez Ahrefs i bez klucza. Wynik 0-100 to NASZA metryka (wzór cc-hcpr-v1)
// z publicznego grafu linków Common Crawl; panel czyta własne pliki (Blob), nic nie wysyła do firm trzecich.
// Nie nazywać go DR ani DA i nie sugerować powiązania z Common Crawl (ToU CC pkt 2(i)): podpis mówi,
// że wynik liczy AI SEO COMPANY z danych Common Crawl. Dane i wzór: prace-2026-11-12/autorytet-cc/dane/RAPORT.md.
// Wynik i porównanie z maks. 3 konkurentami w JEDNYM wywołaniu, bez e-maila; bramka tylko wysyła raport z planem.
// Pola odpowiedzi czytamy tolerancyjnie (panel jest przepisywany równolegle): wynik (zapasowo dr), flaga
// ('ok' | 'brak_linkow' | 'brak_w_grafie' | 'poza_zbiorem'), wynikMaks, rangaHC, rangaZ, percentylPl, miejscePl,
// domenPl, poziom, tekst, porownanie, konkurenci[] (te same pola), pominieci, pozostalo, limit, wydanie, wzor, sprawdzono,
// linkujace ({liczba, top[]}: domeny linkujące z grafu CC, tylko domeny .pl; null = inna końcówka albo brak odczytu;
// klucz cc-krawedzie, 12.11.2026). Liczba to dolna granica z jednego crawla, nie pełny indeks linków zwrotnych.
// Limit panelu: 20 domen na IP na dobę (własna + każdy konkurent).
// Parametry adresu (Z-06): ?url=domena&porownaj=a.pl,b.pl tylko WYPEŁNIAJĄ pola, bez automatycznego startu.

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import BramkaEmail from './BramkaEmail';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import { PasekDemo, Postep } from './Wspolne';

const PUSTE = ['', '', ''];

const wynikZ = (x) => (x?.wynik ?? x?.dr ?? null);
const flagaZ = (x) => x?.flaga || 'ok';
const jestPl = (x) => String(x?.domena || '').toLowerCase().endsWith('.pl');
const linkiZ = (x) => (x?.linkujace && Number.isFinite(x.linkujace.liczba) ? { liczba: x.linkujace.liczba, top: Array.isArray(x.linkujace.top) ? x.linkujace.top.filter((d) => typeof d === 'string').slice(0, 5) : [] } : null);

// Podpis źródła danych: wynik liczymy my, dane są z Common Crawl. Bez słów DR/DA jako nazwy wyniku.
function Podpis({ en, wydanie }) {
  const w = wydanie || AUTORYTET.wydanie;
  const okres = w === AUTORYTET.wydanie ? `, ${en ? 'crawls from' : 'crawle z okresu'} ${AUTORYTET.okres[en ? 'en' : 'pl']}` : '';
  return (
    <>
      {en ? 'Score calculated by AI SEO COMPANY from the ' : 'Wynik AI SEO COMPANY obliczony z '}
      <a href={AUTORYTET.zrodlo} target="_blank" rel="noopener">{en ? 'Common Crawl web graph' : 'grafu linków Common Crawl'}</a>
      {` (${en ? 'release' : 'wydanie'} ${w}${okres})`}
    </>
  );
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

  const jezyk = en ? 'en-GB' : 'pl-PL';
  const liczba = (n, miejsc = 0) => (n == null ? '' : Number(n).toLocaleString(jezyk, { maximumFractionDigits: miejsc }));
  const miejsce = (n) => (en ? `No. ${liczba(n)}` : `${liczba(n)}.`);
  const data = (iso) => (iso ? new Date(iso).toLocaleDateString(jezyk, { day: 'numeric', month: 'long', year: 'numeric' }) : '');
  const maksPoza = (x) => x?.wynikMaks ?? AUTORYTET.maksPozaZbiorem;
  const wartosc = (x) => {
    if (flagaZ(x) === 'poza_zbiorem') return `≤ ${maksPoza(x)}`;
    const w = wynikZ(x);
    return w == null ? (en ? 'no data' : 'brak') : liczba(w);
  };

  async function start(e) {
    e.preventDefault();
    const domena = pola.domena.trim();
    const konkurenci = pola.k.map((x) => x.trim()).filter(Boolean);
    setStan({ status: 'loading', blad: null, id: null, podglad: null });
    zapiszParametry({ url: domena, porownaj: konkurenci.join(',') || null });
    track('narzedzie_start', { narzedzie: 'autorytet', konkurentow: konkurenci.length });
    const r = await wywolajNarzedzie('autorytet', { domena, konkurenci, nick: String(new FormData(e.currentTarget).get('nick') || ''), lang: en ? 'en' : 'pl' }, 60_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    const podglad = r.podglad;
    track('narzedzie_wynik', { narzedzie: 'autorytet', wynik: wynikZ(podglad), flaga: flagaZ(podglad), konkurentow: podglad.konkurenci?.length ?? 0 });
    setStan({ status: 'done', blad: null, id: r.id, podglad });
  }

  function edytuj(doKonkurentow = false) {
    setStan({ status: 'idle', blad: null, id: null, podglad: null });
    setTimeout(() => (doKonkurentow ? konkurentRef.current : poleRef.current)?.focus(), 0);
  }

  const p = stan.podglad;
  const flaga = flagaZ(p);
  const konkurenci = p?.konkurenci ?? [];
  const lista = p ? [{ ...p, twoja: true }, ...konkurenci] : [];
  const bezDanych = konkurenci.filter((k) => wynikZ(k) == null && flagaZ(k) !== 'poza_zbiorem').length;
  const pozaZbiorem = lista.some((x) => flagaZ(x) === 'poza_zbiorem');
  const bezGrafu = lista.some((x) => flagaZ(x) === 'brak_w_grafie');
  const OPISY_FLAG = {
    brak_w_grafie: {
      tytul: en ? 'Not in the graph.' : 'Brak w grafie.',
      zapas: en
        ? 'This domain is not in the Common Crawl link graph for this release, so its score is 0. Usually it is a new domain or one that no page visited by the Common Crawl robot links to.'
        : 'Tej domeny nie ma w grafie linków Common Crawl z tego wydania, więc wynik to 0. Najczęściej to nowa domena albo taka, do której nie linkuje żadna strona odwiedzona przez robota Common Crawl.',
      dopisek: en ? ' Check the spelling; new links show up in the next release.' : ' Sprawdź pisownię; nowe linki pojawią się w kolejnym wydaniu.',
    },
    brak_linkow: {
      tytul: en ? 'No incoming links.' : 'Brak linków.',
      zapas: en ? 'The domain is in the graph, but in this release no other domain links to it, so its score is 0.' : 'Domena jest w grafie, ale w tym wydaniu nie linkuje do niej żadna inna domena, więc wynik to 0.',
      dopisek: '',
    },
    poza_zbiorem: {
      tytul: en ? `At most ${maksPoza(p)}.` : `Najwyżej ${maksPoza(p)}.`,
      zapas: en
        ? `For domains outside .pl we keep only the top ${liczba(AUTORYTET.limitInnych)} positions in the graph. This domain is not among them, so its score is ${maksPoza(p)} or lower; we do not give the exact value.`
        : `Domeny spoza .pl przechowujemy tylko z pierwszych ${liczba(AUTORYTET.limitInnych)} pozycji w grafie. Tej domeny wśród nich nie ma, więc jej wynik to ${maksPoza(p)} lub mniej; dokładnej wartości nie podajemy.`,
      dopisek: '',
    },
  };
  const opisFlagi = p ? OPISY_FLAG[flaga] : null;
  const linki = linkiZ(p);
  const jestLinkow = lista.some((x) => linkiZ(x));
  const kafle = p ? [
    // percentylPl = odsetek domen .pl z gorszą pozycją (etykieta „Lepiej niż” = lepiej w rankingu, jak na zrzutach);
    // 100 po zaokrągleniu = „> 99,99%” (weryfikacja 12.11.2026).
    p.percentylPl != null && { id: 'percentyl', etykieta: en ? 'Better than' : 'Lepiej niż', wartosc: p.percentylPl >= 100 ? `> ${liczba(99.99, 2)}%` : `${liczba(p.percentylPl, 2)}%`, dopisek: en ? 'of .pl domains in the graph' : 'domen .pl w grafie' },
    p.miejscePl != null && { id: 'miejsce-pl', etykieta: en ? 'Rank among .pl domains' : 'Miejsce wśród domen .pl', wartosc: miejsce(p.miejscePl), dopisek: en ? `of ${liczba(p.domenPl ?? AUTORYTET.domenPl)}` : `z ${liczba(p.domenPl ?? AUTORYTET.domenPl)}` },
    p.rangaHC != null && { id: 'ranga', etykieta: en ? 'Position in the whole graph' : 'Pozycja w całym grafie', wartosc: miejsce(p.rangaHC), dopisek: en ? `of ${liczba(p.rangaZ ?? AUTORYTET.domenWGrafie)} domains, harmonic centrality` : `z ${liczba(p.rangaZ ?? AUTORYTET.domenWGrafie)} domen, centralność harmoniczna` },
  ].filter(Boolean) : [];

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
              {pola.k.map((w, i) => (
                <label key={i}>
                  <span className="sr-only">{en ? `Competitor domain ${i + 1}` : `Domena konkurenta ${i + 1}`}</span>
                  <input
                    ref={i === 0 ? konkurentRef : undefined}
                    name={`k${i + 1}`}
                    maxLength={300}
                    value={w}
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
              ? `Free, no sign-up and no email: a 0-100 authority score and the comparison right away. Up to ${AUTORYTET.limitIp} domains per day from one IP address; each competitor counts as one domain.`
              : `Za darmo, bez rejestracji i bez e-maila: wynik autorytetu 0-100 i porównanie od razu. Do ${AUTORYTET.limitIp} domen dziennie z jednego adresu IP; każdy konkurent to jedna domena.`}
          </p>
          <p className="narz-mikro"><Podpis en={en} />{en ? '. This is our own metric, not Ahrefs DR or Moz DA.' : '. To nasza metryka, a nie DR Ahrefs ani DA Moz.'}</p>
          {stan.status === 'loading' && <Postep kroki={en ? ['Looking up the domain in the Common Crawl link graph', 'Calculating the score from its position in the graph', 'Comparing with competitors'] : ['Szukamy domeny w grafie linków Common Crawl', 'Liczymy wynik z pozycji w grafie', 'Porównujemy z konkurentami']} co={1200} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <div className="narz-dr" aria-label={flaga === 'poza_zbiorem' ? (en ? `Authority score at most ${maksPoza(p)} out of 100` : `Wynik autorytetu najwyżej ${maksPoza(p)} na 100`) : (en ? `Authority score ${wartosc(p)} out of 100` : `Wynik autorytetu ${wartosc(p)} na 100`)}>
              <span className="narz-dr-liczba" style={flaga === 'poza_zbiorem' ? { fontSize: '2.4rem' } : undefined}>{wartosc(p)}</span>
              <span className="narz-dr-skala">{en ? 'out of 100' : 'na 100'}</span>
            </div>
            <div>
              <p className="narz-wynik-domena">{p.domena}</p>
              {/* Stany bez dokładnego wyniku: tytuł z klienta, wyjaśnienie z panelu (p.tekst), a tekst zapasowy tylko,
                  gdy panel go nie poda (demo). Weryfikacja 12.11.2026: wcześniej to samo wyjaśnienie było dwa razy. */}
              {opisFlagi && (
                <p className="narz-wynik-opis"><strong>{opisFlagi.tytul}</strong> {p.tekst || opisFlagi.zapas}{opisFlagi.dopisek}</p>
              )}
              {p.uwaga && <p className="narz-wynik-opis">{p.uwaga}</p>}
              {!opisFlagi && p.poziom && <p className="narz-wynik-opis"><strong>{en ? 'Level' : 'Poziom'}: {p.poziom}.</strong> {p.tekst}</p>}
              <p className="narz-licencja">
                <Podpis en={en} wydanie={p.wydanie} />
                {p.sprawdzono ? (en ? `, checked on ${data(p.sprawdzono)}.` : `, sprawdzone ${data(p.sprawdzono)}.`) : '.'}
              </p>
              <button type="button" className="narz-link" onClick={() => edytuj(false)}>{en ? 'Check another domain' : 'Sprawdź inną domenę'}</button>
            </div>
          </div>

          {kafle.length > 0 && (
            <div className="narz-rozbicie" style={{ marginTop: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))' }}>
              {kafle.map((k) => (
                <div key={k.id} style={{ padding: '0.75rem 1rem' }}>
                  <p className="narz-rozbicie-etykieta">{k.etykieta}</p>
                  <p className="narz-rozbicie-kwota" style={{ fontSize: '1.15rem' }}>{k.wartosc}</p>
                  <p className="narz-rozbicie-etykieta" style={{ fontSize: '0.8rem' }}>{k.dopisek}</p>
                </div>
              ))}
            </div>
          )}

          <div className="narz-porownanie" id="wynik-domeny-linkujace">
            <h2 className="narz-h2">{en ? 'Linking domains' : 'Domeny linkujące'}</h2>
            {!jestPl(p) ? (
              <p className="narz-wynik-opis">{en ? 'We count linking domains only for .pl domains.' : 'Domeny linkujące liczymy tylko dla domen .pl.'}</p>
            ) : !linki ? (
              <p className="narz-wynik-opis">{en ? 'We could not read the linking domains this time. The score above is not affected; try again in a few minutes.' : 'Tym razem nie udało się odczytać domen linkujących. Wynik wyżej nie jest tym dotknięty; spróbuj ponownie za kilka minut.'}</p>
            ) : linki.liczba === 0 ? (
              <p className="narz-wynik-opis">{en ? `Common Crawl saw no domain linking to ${p.domena} in this release.` : `Common Crawl nie widział w tym wydaniu żadnej domeny linkującej do ${p.domena}.`}</p>
            ) : (
              <>
                <p className="narz-wynik-opis">
                  <strong>{liczba(linki.liczba)}</strong> {en ? (linki.liczba === 1 ? 'domain links' : 'domains link') : (linki.liczba === 1 ? 'domena linkuje' : 'domen linkuje')} {en ? `to ${p.domena}.` : `do ${p.domena}.`}
                </p>
                {linki.top.length > 0 && (
                  <>
                    <p className="narz-mikro" style={{ marginBottom: '0.25rem' }}>{en ? 'The strongest of them, by our score:' : 'Najmocniejsze z nich według naszego wyniku:'}</p>
                    <ol className="narz-wynik-opis" style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {linki.top.map((d) => <li key={d}>{d}</li>)}
                    </ol>
                  </>
                )}
              </>
            )}
            <p className="narz-mikro">{en ? 'A lower bound: one quarterly crawl and only domains Common Crawl saw, so this is not a full backlink index.' : 'To dolna granica: jeden kwartalny crawl i tylko domeny, które widział Common Crawl, więc to nie jest pełny indeks linków zwrotnych.'}</p>
          </div>

          {konkurenci.length > 0 ? (
            <div className="narz-porownanie">
              <h2 className="narz-h2">{en ? 'Comparison with competitors' : 'Porównanie z konkurencją'}</h2>
              <p className="narz-licencja">{en ? 'Authority score on a 0-100 scale, the same release of the graph for every domain.' : 'Wynik autorytetu w skali 0-100, to samo wydanie grafu dla każdej domeny.'}</p>
              <ul className="narz-slupki">
                {lista.map((x, i) => {
                  const fl = flagaZ(x);
                  const szer = fl === 'poza_zbiorem' ? maksPoza(x) : (wynikZ(x) ?? 0);
                  return (
                    <li key={`${i}-${x.domena}`} className={x.twoja ? 'twoja' : ''}>
                      <span className="narz-slupki-nazwa">
                        {x.domena}{x.twoja ? (en ? ' (yours)' : ' (Twoja)') : ''}
                        {fl === 'brak_w_grafie' ? (en ? ', not in the graph' : ', brak w grafie') : ''}
                        {fl === 'brak_linkow' ? (en ? ', no incoming links' : ', brak linków') : ''}
                      </span>
                      <span className="narz-slupki-pasek" style={{ ['--w']: `${Math.max(0, Math.min(100, szer))}%`, ...(fl === 'poza_zbiorem' ? { opacity: 0.4 } : {}) }} />
                      <span className="narz-slupki-wartosc">{wartosc(x)}</span>
                    </li>
                  );
                })}
              </ul>
              {jestLinkow && (
                <div className="narz-tabela-wrap" style={{ marginTop: '1rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Domain' : 'Domena'}</th>
                        <th scope="col">{en ? 'Authority (0-100)' : 'Autorytet (0-100)'}</th>
                        <th scope="col">{en ? 'Linking domains' : 'Domeny linkujące'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lista.map((x, i) => {
                        const l = linkiZ(x);
                        return (
                          <tr key={`${i}-${x.domena}`}>
                            <th scope="row">{x.domena}{x.twoja ? (en ? ' (yours)' : ' (Twoja)') : ''}</th>
                            <td>{wartosc(x)}</td>
                            <td>{l ? liczba(l.liczba) : (jestPl(x) ? (en ? 'no data' : 'brak danych') : (en ? 'only .pl' : 'tylko .pl'))}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {p.porownanie && <p className="narz-wynik-opis" style={{ marginTop: '1rem' }}>{p.porownanie}</p>}
              {pozaZbiorem && <p className="narz-mikro">{en ? `≤ ${AUTORYTET.maksPozaZbiorem}: a domain outside .pl beyond the top ${liczba(AUTORYTET.limitInnych)} positions in the graph; the pale bar shows the upper limit.` : `≤ ${AUTORYTET.maksPozaZbiorem}: domena spoza .pl poza pierwszymi ${liczba(AUTORYTET.limitInnych)} pozycjami w grafie; jasny pasek pokazuje górną granicę.`}</p>}
              {bezGrafu && <p className="narz-mikro">{en ? 'Not in the graph: the domain is absent from this release of the Common Crawl graph, so its score is 0.' : 'Brak w grafie: domeny nie ma w tym wydaniu grafu Common Crawl, więc jej wynik to 0.'}</p>}
              {bezDanych > 0 && <p className="narz-mikro">{en ? 'No data: we could not read the score for this domain this time. Try again in a few minutes.' : 'Brak: tym razem nie udało się odczytać wyniku tej domeny. Spróbuj ponownie za kilka minut.'}</p>}
              {p.pominieci?.length > 0 && <p className="narz-mikro">{en ? `Daily limit reached, so we did not check: ${p.pominieci.join(', ')}. Try again tomorrow.` : `Dzienny limit domen się wyczerpał, więc nie sprawdziliśmy: ${p.pominieci.join(', ')}. Spróbuj jutro.`}</p>}
              <button type="button" className="narz-link" onClick={() => edytuj(true)}>{en ? 'Change competitors' : 'Zmień konkurentów'}</button>
            </div>
          ) : (
            <div className="narz-porownanie">
              <p className="narz-wynik-opis">
                {en ? 'Whether this score is good depends on the companies you compete with. ' : 'Czy ten wynik jest dobry, zależy od firm, z którymi konkurujesz. '}
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
            opis={en ? 'You can already see the whole result above. By email we will send it with a plan: which link building steps will do the most at your score and your gap to competitors.' : 'Cały wynik widzisz już wyżej. E-mailem wyślemy go z planem: które działania przy zdobywaniu linków dadzą najwięcej przy Twoim wyniku i różnicy do konkurentów.'}
            korzysci={en
              ? ['Your score and the comparison with the data release, to compare again after the next one', 'An action plan in order: where to start, based on our SEO playbook', 'Which links to avoid so that you do not risk a Google penalty']
              : ['Wynik i porównanie z numerem wydania danych, żeby po kolejnym porównać postęp', 'Plan działania w kolejności: od czego zacząć, według naszego playbooka SEO', 'Jakich linków unikać, żeby nie ryzykować kary Google']}
          />
        </div>
      )}
    </div>
  );
}
