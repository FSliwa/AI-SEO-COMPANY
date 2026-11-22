'use client';

// Niemiecka wersja darmowego sprawdzania autorytetu domeny (18.11.2026, de-narzedzia): odpowiednik
// components/narzedzia/AutorytetClient.jsx. API: panel /api/narzedzia/autorytet (lang 'de'; dopóki panel nie obsługuje
// 'de', pola tekstowe wyniku, np. tekst, poziom, porownanie, przychodzą po polsku). Wynik 0-100 to NASZA metryka
// (wzór cc-hcpr-v1) z publicznego grafu linków Common Crawl; nie nazywamy go DR ani DA i nie sugerujemy powiązania
// z Common Crawl (ToU CC pkt 2(i)): podpis mówi, że wynik liczy AI SEO COMPANY z danych Common Crawl.
// Wynik i porównanie z maks. 3 konkurentami w JEDNYM wywołaniu, bez e-maila; bramka tylko wysyła raport z planem.
// Domeny linkujące: panel zwraca je tylko dla .pl (inne końcówki: „nur .pl”). Parametry adresu: ?url= i ?porownaj=.

import { WALID_DE } from '@/lib/walidacjaDe';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { AUTORYTET_DE } from '@/lib/narzedzia.de';
import { liczba as fmt, procent } from '@/lib/formatDe';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { BramkaEmail, LinkWyniku, PasekDemo, PrzykladAdresu, Postep } from './WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { czasWyjscia, przewinDoNarzedzia } from '@/components/narzedzia/wyjscie';
import '@/components/narzedzia/ruch-b.css';

const PUSTE = ['', '', ''];

const wynikZ = (x) => (x?.wynik ?? x?.dr ?? null);
const flagaZ = (x) => x?.flaga || 'ok';
const nazwaDomeny = (x) => x?.domenaWyswietlana || x?.domena || '';
const jestPl = (x) => String(nazwaDomeny(x)).toLowerCase().endsWith('.pl');
const linkiZ = (x) => (x?.linkujace && Number.isFinite(x.linkujace.liczba) ? { liczba: x.linkujace.liczba, top: Array.isArray(x.linkujace.top) ? x.linkujace.top.map((d) => (typeof d === 'string' ? d : nazwaDomeny(d))).filter(Boolean).slice(0, 5) : [] } : null);

// Podpis źródła danych: wynik liczymy my, dane są z Common Crawl. Bez słów DR/DA jako nazwy wyniku.
function Podpis({ wydanie }) {
  const w = wydanie || AUTORYTET.wydanie;
  const okres = w === AUTORYTET.wydanie ? `, Crawls aus ${AUTORYTET_DE.okres}` : '';
  return (
    <>
      Wert von AI SEO COMPANY, berechnet aus dem{' '}
      <a href={AUTORYTET.zrodlo} target="_blank" rel="noopener">Web Graph von Common Crawl</a>
      {` (Release ${w}${okres})`}
    </>
  );
}

export default function AutorytetClientDe() {
  const [pola, setPola] = useState({ domena: '', k: PUSTE });
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null });
  // Powrót do formularza: wynik najpierw się zwija (Zwin), dopiero potem stan wraca do pustego (anim-narzedzia-b).
  const [wychodzi, setWychodzi] = useState(false);
  const naglowekWyniku = useRef(null);
  // Po wyniku fokus idzie na domenę w nagłówku wyniku (formularz zostaje odmontowany, bez tego fokus ląduje na BODY).
  useEffect(() => { if (stan.status === 'done') naglowekWyniku.current?.focus({ preventScroll: true }); }, [stan.status]);
  const [powrot, setPowrot] = useState(false);
  const poleRef = useRef(null);
  const konkurentRef = useRef(null);

  useParametrUrl(['url', 'porownaj'], ({ url, porownaj }) => {
    const k = String(porownaj || '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, AUTORYTET.konkurentow);
    setPola({ domena: url || '', k: [...k, ...PUSTE].slice(0, AUTORYTET.konkurentow) });
  });

  useEffect(() => {
    if (DEMO || typeof window === 'undefined') return undefined;
    const wynikId = new URLSearchParams(window.location.search).get('wynik')?.trim();
    if (!wynikId || !/^[a-zA-Z0-9_-]{6,120}$/.test(wynikId)) return undefined;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynikId)}`, { signal: ctrl.signal });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok || !data.podglad) return;
        if (data.tool && data.tool !== 'autorytet') return;
        const id = data.id || wynikId;
        const k = (data.podglad.konkurenci || []).map((x) => nazwaDomeny(x)).filter(Boolean).slice(0, AUTORYTET.konkurentow);
        setPola((obecne) => (obecne.domena ? obecne : { domena: nazwaDomeny(data.podglad), k: [...k, ...PUSTE].slice(0, AUTORYTET.konkurentow) }));
        setStan((s) => (s.status === 'idle' ? { status: 'done', blad: null, id, podglad: data.podglad } : s));
      } catch {
        // Fehler beim Laden des geteilten Ergebnisses ignorieren
      }
    })();
    return () => ctrl.abort();
  }, []);

  const liczba = (n, miejsc = 0) => (n == null ? '' : fmt(n, 'de', miejsc));
  const miejsce = (n) => `Platz ${liczba(n)}`;
  const data = (iso) => (iso ? new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
  const maksPoza = (x) => x?.wynikMaks ?? AUTORYTET.maksPozaZbiorem;
  const wartosc = (x) => {
    if (flagaZ(x) === 'poza_zbiorem') return `≤ ${maksPoza(x)}`;
    const w = wynikZ(x);
    return w == null ? 'keine Daten' : liczba(w);
  };

  async function start(e) {
    e.preventDefault();
    const domena = pola.domena.trim();
    const konkurenci = pola.k.map((x) => x.trim()).filter(Boolean);
    setStan({ status: 'loading', blad: null, id: null, podglad: null });
    zapiszParametry({ url: domena, porownaj: konkurenci.join(',') || null, wynik: null });
    track('narzedzie_start', { narzedzie: 'autorytet', konkurentow: konkurenci.length });
    const r = await wywolajNarzedzie('autorytet', { domena, konkurenci, nick: String(new FormData(e.currentTarget).get('nick') || ''), lang: 'de' }, 60_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    const podglad = r.podglad;
    if (r.id && !DEMO) zapiszParametry({ url: nazwaDomeny(podglad) || domena, porownaj: (podglad.konkurenci || []).map((k) => nazwaDomeny(k)).filter(Boolean).join(',') || null, wynik: r.id });
    track('narzedzie_wynik', { narzedzie: 'autorytet', wynik: wynikZ(podglad), flaga: flagaZ(podglad), konkurentow: podglad.konkurenci?.length ?? 0 });
    setStan({ status: 'done', blad: null, id: r.id, podglad });
  }

  function edytuj(doKonkurentow = false) {
    zapiszParametry({ wynik: null });
    setPowrot(true);
    setWychodzi(true);
    setTimeout(() => {
      setStan({ status: 'idle', blad: null, id: null, podglad: null });
      setWychodzi(false);
      przewinDoNarzedzia();
      setTimeout(() => (doKonkurentow ? konkurentRef.current : poleRef.current)?.focus({ preventScroll: true }), 30);
    }, czasWyjscia());
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
      tytul: 'Nicht im Graphen.',
      zapas: 'Diese Domain ist im Link-Graphen von Common Crawl für dieses Release nicht enthalten, daher beträgt ihr Wert 0. Meist ist es eine neue Domain oder eine, auf die keine vom Common-Crawl-Roboter besuchte Seite verlinkt.',
      dopisek: ' Prüfen Sie die Schreibweise; neue Links erscheinen im nächsten Release.',
    },
    brak_linkow: {
      tytul: 'Keine Links.',
      zapas: 'Die Domain ist im Graphen enthalten, aber in diesem Release verlinkt keine andere Domain auf sie, daher beträgt ihr Wert 0.',
      dopisek: '',
    },
    poza_zbiorem: {
      tytul: `Höchstens ${maksPoza(p)}.`,
      zapas: `Von Domains außerhalb von .pl speichern wir nur die ersten ${liczba(AUTORYTET.limitInnych)} Positionen im Graphen. Diese Domain gehört nicht dazu, ihr Wert beträgt daher ${maksPoza(p)} oder weniger; den genauen Wert nennen wir nicht.`,
      dopisek: '',
    },
  };
  const opisFlagi = p ? OPISY_FLAG[flaga] : null;
  const linki = linkiZ(p);
  const jestLinkow = lista.some((x) => linkiZ(x));
  const kafle = p ? [
    // percentylPl = odsetek domen .pl z gorszą pozycją; 100 po zaokrągleniu = „> 99,99 %”.
    p.percentylPl != null && { id: 'percentyl', etykieta: 'Besser als', wartosc: p.percentylPl >= 100 ? `> ${procent(99.99, 'de', 2)}` : procent(p.percentylPl, 'de', 2), dopisek: 'der .pl-Domains im Graphen' },
    p.miejscePl != null && { id: 'miejsce-pl', etykieta: 'Rang unter den .pl-Domains', wartosc: miejsce(p.miejscePl), dopisek: `von ${liczba(p.domenPl ?? AUTORYTET.domenPl)}` },
    p.rangaHC != null && { id: 'ranga', etykieta: 'Position im gesamten Graphen', wartosc: miejsce(p.rangaHC), dopisek: `von ${liczba(p.rangaZ ?? AUTORYTET.domenWGrafie)} Domains, Harmonic Centrality` },
  ].filter(Boolean) : [];

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {/* Formularz i wynik zajmują tę samą komórkę siatki: podczas przejścia nakładają się (zanikanie i wejście), więc żaden
          z nich nie zmienia położenia drugiego i lista wyniku nie ucieka w dół (CLS). */}
      <div className="narz-faza">
      <Zwin otwarte={stan.status !== 'done'} wejscie={powrot} className="r-zwin--karta">
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="dr-domena" className="narz-etykieta">Ihre Domain</label>
          <div className="narz-bramka-wiersz">
            <input ref={poleRef} id="dr-domena" name="domena" required {...WALID_DE} maxLength={300} aria-invalid={stan.status === 'error' ? 'true' : undefined} aria-describedby={stan.status === 'error' ? 'dr-blad' : undefined} value={pola.domena} onChange={(e) => setPola((x) => ({ ...x, domena: e.target.value }))} placeholder="z. B. ihrefirma.de" className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_dr_start">
              {stan.status === 'loading' ? 'Wird geprüft…' : 'Autorität prüfen'}
            </button>
          </div>
          <PrzykladAdresu onWybierz={(a) => { setPola((x) => ({ ...x, domena: a })); poleRef.current?.focus(); }} />
          <fieldset style={{ border: 0, padding: 0, margin: '1rem 0 0', minWidth: 0 }}>
            <legend className="narz-etykieta" style={{ padding: 0 }}>{`Konkurrenten zum Vergleich (optional, bis zu ${AUTORYTET.konkurentow})`}</legend>
            <div className="narz-konkurenci">
              {pola.k.map((w, i) => (
                <label key={i}>
                  <span className="sr-only">{`Domain von Konkurrent ${i + 1}`}</span>
                  <input
                    ref={i === 0 ? konkurentRef : undefined}
                    name={`k${i + 1}`}
                    maxLength={300}
                    value={w}
                    onChange={(e) => setPola((x) => ({ ...x, k: x.k.map((v, n) => (n === i ? e.target.value : v)) }))}
                    placeholder={`konkurrent${i + 1}.de`}
                    className="narz-pole"
                    inputMode="url"
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">{`Kostenlos, ohne Anmeldung und ohne E-Mail: Autoritätswert von 0 bis 100 und Vergleich sofort. Bis zu ${AUTORYTET.limitIp} Domains pro Tag und IP-Adresse; jeder Konkurrent zählt als eine Domain.`}</p>
          <p className="narz-mikro"><Podpis />. Das ist unsere eigene Kennzahl, nicht der Domain Rating von Ahrefs und nicht die Domain Authority von Moz.</p>
          {stan.status === 'loading' && <Postep kroki={['Domain im Link-Graphen von Common Crawl suchen', 'Wert aus der Position im Graphen berechnen', 'Mit Konkurrenten vergleichen']} co={1200} />}
          {stan.status === 'error' && <p id="dr-blad" role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      </Zwin>

      <Zwin otwarte={stan.status === 'done' && !wychodzi} className="r-zwin--karta">

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <div className="narz-dr" aria-label={flaga === 'poza_zbiorem' ? `Autoritätswert höchstens ${maksPoza(p)} von 100` : `Autoritätswert ${wartosc(p)} von 100`}>
              <span className="narz-dr-liczba" style={flaga === 'poza_zbiorem' ? { fontSize: '2.4rem' } : undefined}>{wartosc(p)}</span>
              <span className="narz-dr-skala">von 100</span>
            </div>
            <div>
              <p className="narz-wynik-domena" ref={naglowekWyniku} tabIndex={-1}>{nazwaDomeny(p)}</p>
              {opisFlagi && (
                <p className="narz-wynik-opis"><strong>{opisFlagi.tytul}</strong> {p.tekst || opisFlagi.zapas}{opisFlagi.dopisek}</p>
              )}
              {p.uwaga && <p className="narz-wynik-opis">{p.uwaga}</p>}
              {!opisFlagi && p.poziom && <p className="narz-wynik-opis"><strong>Stufe: {p.poziom}.</strong> {p.tekst}</p>}
              <p className="narz-licencja">
                <Podpis wydanie={p.wydanie} />
                {p.sprawdzono ? `, geprüft am ${data(p.sprawdzono)}.` : '.'}
              </p>
              <button type="button" className="narz-link" onClick={() => edytuj(false)}>Andere Domain prüfen</button>
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
            <h2 className="narz-h2">Verlinkende Domains</h2>
            {!jestPl(p) ? (
              <p className="narz-wynik-opis">Verlinkende Domains zählen wir nur für .pl-Domains.</p>
            ) : !linki ? (
              <p className="narz-wynik-opis">Die verlinkenden Domains konnten diesmal nicht gelesen werden. Der Wert oben ist davon nicht betroffen; versuchen Sie es in einigen Minuten erneut.</p>
            ) : linki.liczba === 0 ? (
              <p className="narz-wynik-opis">{`Common Crawl hat in diesem Release keine Domain gesehen, die auf ${nazwaDomeny(p)} verlinkt.`}</p>
            ) : (
              <>
                <p className="narz-wynik-opis">
                  <strong>{liczba(linki.liczba)}</strong> {linki.liczba === 1 ? 'Domain verlinkt' : 'Domains verlinken'} {`auf ${nazwaDomeny(p)}.`}
                </p>
                {linki.top.length > 0 && (
                  <>
                    <p className="narz-mikro" style={{ marginBottom: '0.25rem' }}>Die stärksten davon nach unserem Wert:</p>
                    <ol className="narz-wynik-opis" style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {linki.top.map((d) => <li key={d}>{d}</li>)}
                    </ol>
                  </>
                )}
              </>
            )}
            <p className="narz-mikro">Eine Untergrenze: ein Quartals-Crawl und nur Domains, die Common Crawl gesehen hat. Das ist also kein vollständiger Backlink-Index.</p>
          </div>

          {konkurenci.length > 0 ? (
            <div className="narz-porownanie">
              <h2 className="narz-h2">Vergleich mit Konkurrenten</h2>
              <p className="narz-licencja">Autoritätswert auf einer Skala von 0 bis 100, für jede Domain dasselbe Release des Graphen.</p>
              <ul className="narz-slupki">
                {lista.map((x, i) => {
                  const fl = flagaZ(x);
                  const szer = fl === 'poza_zbiorem' ? maksPoza(x) : (wynikZ(x) ?? 0);
                  return (
                    <li key={`${i}-${x.domena}`} className={x.twoja ? 'twoja' : ''}>
                      <span className="narz-slupki-nazwa">
                        {nazwaDomeny(x)}{x.twoja ? ' (Ihre)' : ''}
                        {fl === 'brak_w_grafie' ? ', nicht im Graphen' : ''}
                        {fl === 'brak_linkow' ? ', keine Links' : ''}
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
                        <th scope="col" style={{ textAlign: 'left' }}>Domain</th>
                        <th scope="col">Autorität (0 bis 100)</th>
                        <th scope="col">Verlinkende Domains</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lista.map((x, i) => {
                        const l = linkiZ(x);
                        return (
                          <tr key={`${i}-${x.domena}`}>
                            <th scope="row">{nazwaDomeny(x)}{x.twoja ? ' (Ihre)' : ''}</th>
                            <td>{wartosc(x)}</td>
                            <td>{l ? liczba(l.liczba) : (jestPl(x) ? 'keine Daten' : 'nur .pl')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {p.porownanie && <p className="narz-wynik-opis" style={{ marginTop: '1rem' }}>{p.porownanie}</p>}
              {pozaZbiorem && <p className="narz-mikro">{`≤ ${AUTORYTET.maksPozaZbiorem}: eine Domain außerhalb von .pl jenseits der ersten ${liczba(AUTORYTET.limitInnych)} Positionen im Graphen; der helle Balken zeigt die Obergrenze.`}</p>}
              {bezGrafu && <p className="narz-mikro">Nicht im Graphen: Die Domain fehlt in diesem Release des Graphen von Common Crawl, daher beträgt ihr Wert 0.</p>}
              {bezDanych > 0 && <p className="narz-mikro">Keine Daten: Der Wert dieser Domain konnte diesmal nicht gelesen werden. Versuchen Sie es in einigen Minuten erneut.</p>}
              {p.pominieci?.length > 0 && <p className="narz-mikro">{`Das Tageslimit für Domains ist erreicht, deshalb haben wir nicht geprüft: ${p.pominieci.join(', ')}. Versuchen Sie es morgen wieder.`}</p>}
              <button type="button" className="narz-link" onClick={() => edytuj(true)}>Konkurrenten ändern</button>
            </div>
          ) : (
            <div className="narz-porownanie">
              <p className="narz-wynik-opis">
                Ob dieser Wert gut ist, hängt von den Unternehmen ab, mit denen Sie konkurrieren.{' '}
                <button type="button" className="narz-link" onClick={() => edytuj(true)}>{`Bis zu ${AUTORYTET.konkurentow} Konkurrenten hinzufügen und kostenlos vergleichen`}</button>
              </p>
            </div>
          )}

          {p.pozostalo != null && <p className="narz-mikro">{`Heute noch übrig von Ihrer IP-Adresse: ${p.pozostalo} von ${p.limit ?? AUTORYTET.limitIp} Domain-Prüfungen.`}</p>}
          <LinkWyniku
            narzedzie="autorytet"
            tryb={stan.id ? 'wynik' : 'wypelnij'}
            parametry={{ url: nazwaDomeny(p), porownaj: konkurenci.map((k) => nazwaDomeny(k)).join(',') || null, ...(stan.id ? { wynik: stan.id } : {}) }}
            podsumowanie={`Domain-Autorität ${nazwaDomeny(p)}: ${wartosc(p)}/100`}
          />

          <BramkaEmail
            narzedzie="autorytet"
            id={stan.id}
            tylkoRaport
            naglowek="Bericht mit Maßnahmenplan per E-Mail"
            opis="Das ganze Ergebnis sehen Sie schon oben. Per E-Mail senden wir es Ihnen mit einem Plan: welche Schritte beim Linkaufbau bei Ihrem Wert und Ihrem Abstand zu den Konkurrenten am meisten bringen."
            korzysci={['Ihr Wert und der Vergleich mit der Nummer des Daten-Releases, damit Sie nach dem nächsten Release den Fortschritt vergleichen können', 'Ein Maßnahmenplan in der richtigen Reihenfolge: womit Sie anfangen, nach unserem SEO-Playbook', 'Welche Links Sie meiden sollten, um keine Strafe von Google zu riskieren']}
          />
        </div>
      )}
      </Zwin>
      </div>
    </div>
  );
}
