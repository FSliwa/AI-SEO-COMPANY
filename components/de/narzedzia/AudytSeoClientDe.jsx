'use client';

// Niemiecka wersja formularza i wyniku darmowego audytu SEO (18.11.2026, de-narzedzia): odpowiednik
// components/narzedzia/AudytSeoClient.jsx. API: panel /api/narzedzia/audyt-seo (lang 'de' jedzie w treści
// żądania; dopóki panel nie obsługuje 'de' (grupa de-panel), tytuły i opisy problemów przychodzą po polsku).
// Teksty interfejsu tutaj; liczby z lib/narzedziaLiczby.js, formaty z lib/formatDe.js.

import { WALID_DE } from '@/lib/walidacjaDe';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { maWersjeDe } from '@/lib/stronyDe';
import { AUDYT, CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { BramkaEmail, LinkWyniku, Ocena, Odblokowano, PasekDemo, PrzykladAdresu, Postep } from './WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { czasWyjscia, przewinDoNarzedzia } from '@/components/narzedzia/wyjscie';
import '@/components/narzedzia/ruch-b.css';

const KATEGORIE = { techniczne: 'Technik', tresc: 'Inhalt', wydajnosc: 'Performance', ai: 'KI-Tauglichkeit' };
const WAGI = { blad: 'Fehler', ostrzezenie: 'Warnung', uwaga: 'Hinweis' };
const KROKI = ['Adresse, HTTPS und Weiterleitungen prüfen', 'robots.txt, Sitemap und llms.txt lesen', `Unterseiten durchgehen (bis zu ${AUDYT.stron})`, 'Geschwindigkeit mit PageSpeed Insights messen', 'Punktzahl berechnen'];

const liczbaProblemow = (n) => `${n} ${n === 1 ? 'Problem' : 'Probleme'}`;
const unterseiten = (n) => `${n} ${n === 1 ? 'Unterseite' : 'Unterseiten'}`;

// Treść zgody na comiesięczny audyt: w panelu zapisywana jako dowód zgody (lib/narzedzia/monitoring.ts, ZGODA_MONITORINGU).
// Wersja DE musi być tam identyczna (de-panel) i zaakceptowana przez prawnika.
const ZGODA_MONITORINGU = { glowna: 'Senden Sie mir jeden Monat ein neues Audit dieser Domain.', reszta: 'Sie speichern meine E-Mail-Adresse und die Domain bis zu meinem Widerruf. Ich kann die Einwilligung jederzeit mit einem Klick in jeder E-Mail widerrufen.' };

const STREFA = 'Europe/Warsaw';
function dataKrotko(iso) {
  const d = new Date(iso);
  const rok = (x) => x.toLocaleDateString('de-DE', { year: 'numeric', timeZone: STREFA });
  const zRokiem = rok(d) !== rok(new Date());
  const dzis = d.toLocaleDateString('en-CA', { timeZone: STREFA }) === new Date().toLocaleDateString('en-CA', { timeZone: STREFA });
  const godzina = dzis ? `, ${d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: STREFA })}` : '';
  return `${d.toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric', ...(zRokiem ? { year: 'numeric' } : {}), timeZone: STREFA })}${godzina}`;
}
const dataPelna = (iso) => new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: STREFA });
const znak = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');
const kolorZmiany = (n) => (n > 0 ? 'var(--n-ok)' : n < 0 ? 'var(--n-zle)' : 'var(--w-tusz-2)');

/** „+6 seit dem Audit vom 3.11. (vorher 72/100)”: poprzedni audyt tej domeny, z panelu (tylko liczby domeny). */
function Historia({ h }) {
  const kiedy = dataKrotko(h.data);
  const tekst = h.zmiana === 0 ? `Unverändert seit dem Audit vom ${kiedy}` : `${znak(h.zmiana)} seit dem Audit vom ${kiedy}`;
  return (
    <p className="narz-psi" style={{ margin: '0.35rem 0 0.6rem' }}>
      <strong style={{ color: kolorZmiany(h.zmiana) }}>{tekst}</strong> (vorher {h.wynik}/100).
      {!h.wydajnoscPorownywalna && ' Bei einem der Audits fehlte die PageSpeed-Messung, daher vergleichen wir die Performance nicht.'}
    </p>
  );
}

// Tryb demo (lokalny podgląd bez panelu): przykładowa historia, żeby było widać układ.
function historiaDemo(podglad) {
  const kategorie = Object.fromEntries(Object.entries(podglad.kategorie).map(([k, v], i) => [k, { wynik: v.wynik - [4, 9, 2, 6][i % 4], zmiana: [4, 9, 2, 6][i % 4] }]));
  return { data: new Date(Date.now() - 9 * 864e5).toISOString(), wynik: podglad.wynik - 6, zmiana: 6, kategorie, wydajnoscPorownywalna: true };
}

async function wlaczMonitoring(body) {
  if (DEMO) return { ok: true, status: 'oczekuje', wygasa: new Date(Date.now() + 7 * 864e5).toISOString() };
  try {
    const res = await fetch(`${PANEL_API}/monitoring`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { ok: false, blad: data.error || 'Das hat nicht geklappt. Bitte versuchen Sie es gleich noch einmal.' };
    return data;
  } catch {
    return { ok: false, blad: 'Keine Verbindung zum Tool-Server. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.' };
  }
}

/** Po odblokowaniu: osobny, niezaznaczony checkbox „Jeden Monat neuer Audit”. */
function Monitoring({ id, email, domena }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null });
  const [adres, setAdres] = useState(email || '');

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('monitoring') !== 'on') return;
    setStan({ status: 'loading', blad: null, wynik: null });
    const r = await wlaczMonitoring({ id, email: adres.trim(), zgoda: true, lang: 'de', nick: String(fd.get('nick') || '') });
    if (!r.ok) return setStan({ status: 'error', blad: r.blad, wynik: null });
    track('monitoring_wlaczony', { narzedzie: 'audyt_seo', status: r.status || 'oczekuje' });
    setStan({ status: 'done', blad: null, wynik: r });
  }

  if (stan.status === 'done') {
    // Double opt-in: panel odpowiada „oczekuje” (mail z linkiem potwierdzenia, ważny 7 dni) albo „juz” (aktywny).
    const juz = stan.wynik.status === 'juz';
    const kiedy = dataPelna(juz ? stan.wynik.nastepny : stan.wynik.wygasa);
    return (
      <div className="narz-bramka narz-bramka--gotowe r-stan" role="status">
        <p className="narz-bramka-tytul">{juz ? `Das monatliche Audit für ${domena} war für diese Adresse bereits aktiv.` : 'Noch ein Schritt: Bitte bestätigen Sie in der E-Mail.'}</p>
        <p className="narz-bramka-opis">{juz
          ? `Nächster Audit: ${kiedy}. In jeder E-Mail finden Sie einen Link, mit dem Sie ihn mit einem Klick abschalten.`
          : `Wir haben Ihnen einen Link zur Bestätigung des monatlichen Audits für ${domena} geschickt. Klicken Sie ihn bis zum ${kiedy} an: Die Audits starten erst nach Ihrer Bestätigung, der erste folgt einen Monat später. Schauen Sie auch in den Spam-Ordner.`}</p>
      </div>
    );
  }

  return (
    <form className="narz-bramka" onSubmit={wyslij} aria-labelledby="monitoring-tytul">
      <div>
        <p id="monitoring-tytul" className="narz-bramka-tytul">Möchten Sie sehen, ob die Punktzahl steigt?</p>
        <p className="narz-bramka-opis">Einmal im Monat prüfen wir diese Domain erneut und senden Ihnen die Punktzahl mit der Veränderung gegenüber dem letzten Audit sowie die Liste neuer und behobener Probleme.</p>
      </div>
      {!email && (
        <div className="narz-bramka-wiersz">
          <label htmlFor="monitoring-email" className="sr-only">E-Mail-Adresse</label>
          <input id="monitoring-email" type="email" required {...WALID_DE} maxLength={200} autoComplete="email" inputMode="email" value={adres} onChange={(e) => setAdres(e.target.value)} placeholder="Die E-Mail-Adresse, mit der Sie das Ergebnis freigeschaltet haben" className="narz-pole" />
        </div>
      )}
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
      <label className="narz-zgoda narz-zgoda--newsletter">
        <input type="checkbox" name="monitoring" required {...WALID_DE} />
        <span><strong>{ZGODA_MONITORINGU.glowna}</strong> {ZGODA_MONITORINGU.reszta}</span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1rem' }}>
        <button type="submit" className="btn btn-secondary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_monitoring">
          {stan.status === 'loading' ? 'Wird gesendet…' : 'Monatlichen Audit aktivieren'}
        </button>
        {email && <span className="narz-bramka-mikro">{`Wir senden ihn an ${email}.`}</span>}
      </div>
      {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
    </form>
  );
}

function KartaProblemu({ p }) {
  return (
    <li className={`narz-problem narz-problem--${p.waga}`}>
      <p className="narz-problem-meta"><span className="narz-waga">{WAGI[p.waga]}</span> · {KATEGORIE[p.kategoria]}{p.liczba > 1 ? ` · ${unterseiten(p.liczba)}` : ''}</p>
      <h3 className="narz-problem-tytul">{p.tytul}</h3>
      <p className="narz-problem-opis">{p.opis}</p>
      <p className="narz-problem-fix"><strong>So beheben Sie es:</strong> {p.jakNaprawic}</p>
      {p.strony?.length > 0 && (
        <details className="narz-problem-strony">
          <summary>Adressen ({p.strony.length}{p.liczba > p.strony.length ? ` von ${p.liczba}` : ''})</summary>
          <ul>{p.strony.map((u) => <li key={u}>{u}</li>)}</ul>
        </details>
      )}
    </li>
  );
}

function odczytajOdblokowane(id) {
  if (!id || typeof window === 'undefined') return null;
  try {
    const s = window.sessionStorage.getItem(`aisc_odblok_${id}`);
    if (!s) return null;
    const p = JSON.parse(s);
    return p && typeof p === 'object' ? (p.pelny ?? p) : null;
  } catch {
    return null;
  }
}

function zapiszOdblokowane(id, pelny) {
  if (!id || !pelny || typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(`aisc_odblok_${id}`, JSON.stringify(pelny));
  } catch {
    // kein Zugriff auf sessionStorage
  }
}

export default function AudytSeoClientDe() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null });
  const [filtr, setFiltr] = useState('wszystkie');
  const [adres, setAdres] = useState('');
  // Powrót do formularza: wynik najpierw się zwija (Zwin), dopiero potem stan wraca do pustego (anim-narzedzia-b).
  const [wychodzi, setWychodzi] = useState(false);
  const [powrot, setPowrot] = useState(false);
  const naglowekWyniku = useRef(null);
  // Po wyniku fokus idzie na nagłówek listy (formularz zostaje odmontowany, bez tego fokus ląduje na BODY).
  useEffect(() => { if (stan.status === 'done') naglowekWyniku.current?.focus({ preventScroll: true }); }, [stan.status]);
  const pole = useRef(null);
  // Adres z bramki e-mail (BramkaEmail go nie zwraca): odczyt z formularza w chwili wysłania, do monitoringu.
  const emailBramki = useRef('');
  // ?url= tylko wypełnia pole; audyt startuje dopiero po kliknięciu (limit IP).
  useParametrUrl(['url'], ({ url }) => setAdres(url));
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
        if (data.tool && data.tool !== 'audyt_seo') return;
        const id = data.id || wynikId;
        const pelny = odczytajOdblokowane(id);
        setAdres((obecny) => obecny || data.podglad.domenaWyswietlana || data.podglad.domena || data.podglad.url || '');
        setStan((s) => (s.status === 'idle' ? {
          status: 'done',
          blad: null,
          id,
          podglad: data.podglad,
          pelny,
          historia: data.historia ?? null,
        } : s));
      } catch {
        // Fehler beim Laden des geteilten Ergebnisses ignorieren
      }
    })();
    return () => ctrl.abort();
  }, []);
  const pelnyAudyt = maWersjeDe('/audyt-seo') ? '/audyt-seo' : null;

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = adres.trim();
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, historia: null });
    zapiszParametry({ url, wynik: null });
    track('narzedzie_start', { narzedzie: 'audyt_seo' });
    const r = await wywolajNarzedzie('audyt_seo', { url, nick: String(fd.get('nick') || ''), lang: 'de' });
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    if (r.id && !DEMO) zapiszParametry({ url, wynik: r.id });
    track('narzedzie_wynik', { narzedzie: 'audyt_seo', wynik: r.podglad.wynik });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: odczytajOdblokowane(r.id), historia: r.historia ?? (DEMO ? historiaDemo(r.podglad) : null) });
  }

  function wroc() {
    zapiszParametry({ wynik: null });
    setPowrot(true);
    setWychodzi(true);
    setTimeout(() => {
      setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null });
      setWychodzi(false);
      setFiltr('wszystkie');
      przewinDoNarzedzia();
      setTimeout(() => pole.current?.focus({ preventScroll: true }), 30);
    }, czasWyjscia());
  }

  const w = stan.pelny ?? stan.podglad;
  const niesprawdzoneLiczba = Number(w?.niesprawdzoneLiczba ?? stan.podglad?.niesprawdzoneLiczba ?? 0);
  const niesprawdzoneLista = Array.isArray(w?.niesprawdzone) ? w.niesprawdzone : (Array.isArray(stan.podglad?.niesprawdzone) ? stan.podglad.niesprawdzone : []);
  const problemy = stan.pelny ? stan.pelny.problemy : stan.podglad?.problemy ?? [];
  const widoczne = filtr === 'wszystkie' ? problemy : problemy.filter((p) => p.kategoria === filtr);
  // Przy pełnym wyniku lista dzieli się na trzy pierwsze (jak w podglądzie) i resztę pod bramką.
  const podzial = Boolean(stan.pelny);
  const gora = podzial ? widoczne.slice(0, 3) : widoczne;
  const dol = podzial ? widoczne.slice(3) : [];

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {/* Formularz i wynik zajmują tę samą komórkę siatki: podczas przejścia nakładają się (zanikanie i wejście), więc żaden
          z nich nie zmienia położenia drugiego i lista wyniku nie ucieka w dół (CLS). */}
      <div className="narz-faza">
      <Zwin otwarte={stan.status !== 'done'} wejscie={powrot} className="r-zwin--karta">
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="audyt-url" className="narz-etykieta">Adresse Ihrer Website</label>
          <div className="narz-bramka-wiersz">
            <input ref={pole} id="audyt-url" name="url" required {...WALID_DE} maxLength={300} aria-invalid={stan.status === 'error' ? 'true' : undefined} aria-describedby={stan.status === 'error' ? 'audyt-blad' : undefined} value={adres} onChange={(e) => setAdres(e.target.value)} placeholder="z. B. ihrefirma.de" className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_start">
              {stan.status === 'loading' ? 'Wird geprüft…' : 'Website kostenlos prüfen'}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <PrzykladAdresu onWybierz={(a) => { setAdres(a); pole.current?.focus(); }} />
          <p className="narz-mikro">{`Ohne Anmeldung. Bis zu ${AUDYT.limitIp} Audits pro Tag von einer IP-Adresse. Ein Audit dauert meist 20 bis 90 Sekunden. Daten: unser Crawler AISEOCompanyAudit und Google PageSpeed Insights.`}</p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={9000} />}
          {stan.status === 'error' && <p id="audyt-blad" role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      </Zwin>

      <Zwin otwarte={stan.status === 'done' && !wychodzi} className="r-zwin--karta">
      {stan.status === 'done' && w && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={w.wynik} podpis="Punktzahl" />
            <div>
              <p className="narz-wynik-domena">{w.domenaWyswietlana || w.domena}</p>
              <p className="narz-wynik-opis">
                {`Wir haben ${unterseiten(w.stron)} geprüft und ${liczbaProblemow(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)} gefunden: ${w.liczby.bledy} Fehler, ${w.liczby.ostrzezenia} ${w.liczby.ostrzezenia === 1 ? 'Warnung' : 'Warnungen'} und ${w.liczby.uwagi} ${w.liczby.uwagi === 1 ? 'Hinweis' : 'Hinweise'}.`}
              </p>
              {niesprawdzoneLiczba > 0 && (
                <div className="narz-psi" role="note" style={{ margin: '0.35rem 0 0.6rem' }}>
                  <p style={{ margin: 0 }}>
                    {`${unterseiten(niesprawdzoneLiczba)} ${niesprawdzoneLiczba === 1 ? 'konnte' : 'konnten'} nicht abgerufen werden (Zeitüberschreitung oder Verbindungsfehler) und ${niesprawdzoneLiczba === 1 ? 'fließt' : 'fließen'} daher nicht in die Punktzahl ein.`}
                  </p>
                  {niesprawdzoneLista.length > 0 && (
                    <details className="narz-problem-strony" style={{ marginTop: '0.25rem' }}>
                      <summary>{`Nicht geprüfte Adressen (${niesprawdzoneLista.length})`}</summary>
                      <ul>{niesprawdzoneLista.map((item, idx) => {
                        const tekst = typeof item === 'string' ? item : `${item.url}${item.powod ? ` (${item.powod})` : ''}`;
                        return <li key={`${idx}-${tekst}`}>{tekst}</li>;
                      })}</ul>
                    </details>
                  )}
                </div>
              )}
              {stan.historia && <Historia h={stan.historia} />}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.25rem' }}>
                <button type="button" className="narz-link" onClick={wroc}>Andere Website prüfen</button>
                <LinkWyniku
                  narzedzie="audyt_seo"
                  tryb={stan.id ? 'wynik' : 'wypelnij'}
                  parametry={{ url: adres.trim() || w.domenaWyswietlana || w.domena, ...(stan.id ? { wynik: stan.id } : {}) }}
                  podsumowanie={`SEO-Audit ${w.domenaWyswietlana || w.domena}: ${w.wynik}/100 (${w.liczby.bledy} Fehler, ${w.liczby.ostrzezenia} ${w.liczby.ostrzezenia === 1 ? 'Warnung' : 'Warnungen'})`}
                />
              </div>
            </div>
          </div>
          <ul className="narz-kategorie">
            {Object.entries(w.kategorie).map(([k, v]) => (
              <li key={k}>
                {k === 'wydajnosc' && w.wydajnoscZmierzona === false
                  ? <div className="narz-ocena narz-ocena--mala narz-ocena--brak" role="img" aria-label="Performance: nicht gemessen"><span className="narz-ocena-liczba" aria-hidden="true">-</span><span className="narz-ocena-podpis" aria-hidden="true">Performance: nicht gemessen</span></div>
                  : <Ocena wynik={v.wynik} podpis={KATEGORIE[k]} maly />}
                {stan.historia?.kategorie?.[k]?.zmiana != null && (
                  <span className="narz-psi" style={{ fontWeight: 700, color: kolorZmiany(stan.historia.kategorie[k].zmiana) }} aria-label={`Veränderung gegenüber dem letzten Audit: ${znak(stan.historia.kategorie[k].zmiana)}`}>
                    {stan.historia.kategorie[k].zmiana === 0 ? 'unverändert' : znak(stan.historia.kategorie[k].zmiana)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {w.wydajnoscZmierzona === false && <p className="narz-psi">Die Geschwindigkeitsmessung von PageSpeed Insights war vorübergehend nicht verfügbar, daher fließt die Performance nicht in die Punktzahl ein.</p>}
          {w.psi && (
            <p className="narz-psi">
              {`PageSpeed Insights (Smartphone): Performance ${w.psi.wydajnosc ?? '-'}, SEO ${w.psi.seo ?? '-'}, Barrierefreiheit ${w.psi.dostepnosc ?? '-'}, Best Practices ${w.psi.praktyki ?? '-'}.`}
              {w.psi.przebiegi > 1 && w.psi.wydajnoscPomiary?.length > 1
                ? ` Die Performance ist der Median aus ${w.psi.przebiegi} Messungen (${w.psi.wydajnoscPomiary.join(', ')}).`
                : w.psi.przebiegi === 1 ? ' Die Performance stammt aus einer einzigen Messung; eine einzelne Messung kann um etwa 10 Punkte abweichen.' : null}
            </p>
          )}

          <h2 className="narz-h2" ref={naglowekWyniku} tabIndex={-1}>{stan.pelny ? 'Alle Probleme' : 'Die wichtigsten Probleme'}</h2>
          {/* Nach dem Freischalten: die ersten drei Probleme bleiben an ihrer Stelle, Bestätigung und Monitoring ersetzen die Schranke,
              der Rest der Liste folgt darunter. Nichts wird über der Liste eingefügt. */}
          <div className="audyt-lista">
            <ul className="narz-problemy">{gora.map((p) => <KartaProblemu key={p.id} p={p} />)}</ul>
            {stan.pelny && <Odblokowano mailOk={stan.mailOk} />}
            {stan.pelny && stan.id && <Monitoring id={stan.id} email={stan.email} domena={w.domena} />}
            {stan.pelny && (
              <div className="narz-filtry" role="group" aria-label="Kategoriefilter">
                {['wszystkie', ...Object.keys(KATEGORIE)].map((k) => (
                  <button key={k} type="button" aria-pressed={filtr === k} onClick={() => setFiltr(k)}>{k === 'wszystkie' ? 'Alle' : KATEGORIE[k]}</button>
                ))}
              </div>
            )}
            {dol.length > 0 && <ul className="narz-problemy">{dol.map((p) => <KartaProblemu key={p.id} p={p} />)}</ul>}
          </div>
          {problemy.length === 0 && <p className="narz-wynik-opis">Im geprüften Umfang haben wir keine Probleme gefunden.</p>}

          {!stan.pelny && stan.podglad.zablokowane.length > 0 && (
            <div className="narz-zablokowane" onSubmitCapture={(e) => { if (e.target instanceof HTMLFormElement) emailBramki.current = String(new FormData(e.target).get('email') || '').trim(); }}>
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {stan.podglad.zablokowane.slice(0, 12).map((p) => (
                  <li key={p.id} className={`narz-problem narz-problem--${p.waga}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{WAGI[p.waga]}</span> · {KATEGORIE[p.kategoria]}</p>
                    <p className="narz-problem-tytul narz-atrapa">Beschreibung des Problems und Anleitung zur Behebung</p>
                    <p className="narz-problem-opis narz-atrapa">Adressen der Unterseiten, die von diesem Problem betroffen sind</p>
                  </li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                naglowek={`Die übrigen ${liczbaProblemow(stan.podglad.zablokowane.length)} freischalten`}
                opis="Wir zeigen Ihnen die vollständige Liste hier und senden Ihnen einen Bericht per E-Mail, den Sie direkt an Ihre Entwicklerin oder Ihren Entwickler weitergeben können."
                korzysci={['Jedes Problem mit Anleitung zur Behebung', 'Die betroffenen Unterseiten', 'Prioritäten: von Fehlern bis zu Hinweisen']}
                przycisk="Vollständiges Audit anzeigen"
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const email = emailBramki.current;
                  zapiszOdblokowane(stan.id, pelny);
                  setStan((s) => ({ ...s, pelny, email, mailOk }));
                }}
              />
            </div>
          )}

          {/* Bis zu drei Probleme: nichts ist gesperrt, die Schranke sendet nur den Bericht (tylkoRaport); darunter folgt das monatliche Audit. */}
          {!stan.pelny && stan.podglad.zablokowane.length === 0 && stan.id && (
            <div onSubmitCapture={(e) => { if (e.target instanceof HTMLFormElement) emailBramki.current = String(new FormData(e.target).get('email') || '').trim(); }}>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                tylkoRaport
                naglowek="Bericht per E-Mail senden"
                opis="Das ganze Ergebnis steht oben. Wir senden es Ihnen als Bericht mit Anleitungen zur Behebung per E-Mail, den Sie direkt an Ihre Entwicklerin oder Ihren Entwickler weitergeben können."
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const email = emailBramki.current;
                  setStan((s) => ({ ...s, raportWyslany: true, email, mailOk }));
                }}
              />
              {stan.raportWyslany && stan.mailOk !== false && <Monitoring id={stan.id} email={stan.email} domena={w.domena} />}
            </div>
          )}

          {w.wynik < 80 && (
            <div className="narz-bramka" style={{ marginTop: '1.5rem' }}>
              <p className="narz-bramka-tytul">Sollen alle Fehler in der richtigen Reihenfolge behoben werden?</p>
              <p className="narz-bramka-opis">{`Eine Punktzahl unter 80 bedeutet Probleme, die Ihre Sichtbarkeit einschränken. Im SEO Audit (ab ${eur(CENY.audytSeo.eur)} netto) erhalten Sie jeden Fehler mit Priorität und einer Anleitung für Ihre Entwickler.`}</p>
              {pelnyAudyt && <p style={{ margin: '0.75rem 0 0' }}><Link href={pelnyAudyt} className="btn btn-secondary" data-cta="audyt_wynik_oferta">Leistungsumfang des SEO Audits ansehen</Link></p>}
            </div>
          )}
        </div>
      )}
      </Zwin>
      </div>
    </div>
  );
}
