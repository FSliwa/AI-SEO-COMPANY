'use client';

// Niemieckie odpowiedniki małych komponentów klienckich darmowych narzędzi (18.11.2026, de-narzedzia):
// Ocena, Postep, PasekDemo, Odblokowano (components/narzedzia/Wspolne.jsx), BramkaEmail, LinkWyniku,
// PrzykladAdresu, NawBok. Powód osobnych plików: oryginały przełączają teksty tylko PL/EN, a edycja
// wspólnych komponentów PL/EN nie jest potrzebna. Te same klasy CSS (narzedzia.module.css, globals).
// Bramka e-mail DE: bez pola newslettera (zgoda DE na newsletter = tekst prawnika, panel nie zapisuje
// newslettera dla lang 'de' do czasu akceptacji; PLAN-DE.md 5.7), zgoda na wysłanie wyniku: szkic do
// sprawdzenia przez prawnika razem z Datenschutz.

import { WALID_DE } from '@/lib/walidacjaDe';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { DEMO, odblokuj } from '@/lib/narzedziaApi';
import { linkZParametrami } from '@/lib/narzedzia/parametrUrl';
import st from '@/components/narzedzia/narzedzia.module.css';
import Zwin from '@/components/narzedzia/Zwin';
import NawBokBaza from '@/components/narzedzia/NawBok';
import { SIEDZIBA } from '@/lib/firma';
import '@/app/ruch.css'; // tokeny i utility ruchu (jak components/narzedzia/Zwin.jsx)

export function kolorOceny(w) {
  if (w >= 80) return 'dobra';
  if (w >= 50) return 'srednia';
  return 'slaba';
}

/** Pierścień z wynikiem 0-100 (SVG, bez biblioteki). */
export function Ocena({ wynik, podpis, maly = false }) {
  const r = 52;
  const obwod = 2 * Math.PI * r;
  const w = Math.max(0, Math.min(100, Number(wynik) || 0));
  return (
    <div className={`narz-ocena narz-ocena--${kolorOceny(w)}${maly ? ' narz-ocena--mala' : ''}`} role="img" aria-label={`${podpis ? `${podpis}: ` : ''}${w} von 100`}>
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r={r} className="narz-ocena-tlo" />
        <circle cx="60" cy="60" r={r} className="narz-ocena-luk" strokeDasharray={obwod} strokeDashoffset={obwod * (1 - w / 100)} />
      </svg>
      <span className="narz-ocena-liczba" aria-hidden="true" style={{ '--cel': w }}>{w}</span>
      {podpis && <span className="narz-ocena-podpis" aria-hidden="true">{podpis}</span>}
    </div>
  );
}

/** Kroki oczekiwania: przełączają się co `co` ms (czas orientacyjny), ostatni czeka na wynik. */
export function Postep({ kroki, co = 6000 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, kroki.length - 1)), co);
    return () => clearInterval(t);
  }, [kroki.length, co]);
  return (
    <Zwin otwarte className={st.postepOkno}>
    <div className={st.postepBlok}>
      <div className={st.pasek} style={{ '--p': (i + 0.5) / kroki.length }} aria-hidden="true"><i /></div>
      <ol className="narz-postep" aria-live="polite">
        {kroki.map((k, n) => (
          <li key={k} className={n < i ? 'zrobione' : n === i ? 'teraz' : ''} aria-current={n === i ? 'step' : undefined}>
            {k}
          </li>
        ))}
      </ol>
      <div className={st.szkielet} aria-hidden="true">
        <span className={st.szkPierscien} />
        <span className={st.szkLinie}><i /><i /><i /></span>
      </div>
    </div>
    </Zwin>
  );
}

export function PasekDemo() {
  if (!DEMO) return null;
  return <p className="narz-demo" role="note">Demo-Modus: Beispieldaten, keine Verbindung zum Panel.</p>;
}

/** Potwierdzenie po bramce; tylkoRaport = wynik był widoczny bez e-maila. */
export function Odblokowano({ tylkoRaport = false, potwRef = null }) {
  return (
    <div className="narz-bramka narz-bramka--gotowe r-stan" role="status" ref={potwRef} tabIndex={potwRef ? -1 : undefined}>
      <p className="narz-bramka-tytul">{tylkoRaport ? 'Fertig: Wir haben Ihnen den Bericht per E-Mail geschickt.' : 'Fertig: Das vollständige Ergebnis steht unten, den Bericht haben wir Ihnen per E-Mail geschickt.'}</p>
    </div>
  );
}

// Odbiorcy danych per narzędzie (ta sama lista co w ODBIORCY w lib/zgodyNarzedzi.js i w stopce maila z wynikiem).
const ODBIORCY_DE = {
  audyt_seo: 'E-Mail-Dienstleister (Resend) und Anbieter der Geschwindigkeitsmessung (Google PageSpeed Insights)',
  autorytet: 'E-Mail-Dienstleister (Resend)',
};

/** Bramka e-mail: zgoda na wysłanie wyniku (konieczna), bez newslettera. */
export function BramkaEmail({ narzedzie, id = null, naglowek, opis, korzysci = [], przycisk, dane, konkurenci, onOdblokowano, tylkoRaport = false }) {
  przycisk = przycisk ?? (tylkoRaport ? 'Bericht senden' : 'Senden und vollständiges Ergebnis anzeigen');
  const [stan, setStan] = useState({ status: 'idle', blad: null });
  const ref = useRef(null);
  const widziana = useRef(false);
  const potwRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((w) => {
      if (w.some((x) => x.isIntersecting) && !widziana.current) {
        widziana.current = true;
        track('narzedzie_bramka', { narzedzie });
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [narzedzie]);

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      narzedzie,
      ...(id ? { id } : {}),
      email: String(fd.get('email') || ''),
      zgodaWynik: fd.get('zgodaWynik') === 'on',
      newsletter: false,
      nick: String(fd.get('nick') || ''),
      lang: 'de',
      ...(dane ? { dane } : {}),
      ...(konkurenci ? { konkurenci: konkurenci(fd) } : {}),
    };
    setStan((x) => ({ status: 'loading', blad: x.blad })); // tekst poprzedniego błędu zostaje na czas zwijania
    const r = await odblokuj(body);
    if (!r.ok) {
      setStan({ status: 'error', blad: r.blad });
      return;
    }
    track('generate_lead', { lead_source: 'tool_gate', event_category: 'Narzędzia', plan: narzedzie, currency: 'PLN', value: 50 });
    setStan({ status: 'done', blad: null });
    onOdblokowano?.(r.pelny, r.newsletter);
  }

  const gotowe = stan.status === 'done';
  // Po wysłaniu fokus idzie na potwierdzenie (formularz traci przycisk, bez tego fokus ląduje na BODY).
  useEffect(() => { if (gotowe) potwRef.current?.focus({ preventScroll: true }); }, [gotowe]);

  return (
    <>
    <Zwin otwarte={!gotowe} wejscie={false}>
    <form ref={ref} className="narz-bramka" onSubmit={wyslij} aria-labelledby={`bramka-${narzedzie}`}>
      <div className="narz-bramka-glowa">
        <span className="narz-bramka-ikona" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        </span>
        <div>
          <p id={`bramka-${narzedzie}`} className="narz-bramka-tytul">{naglowek}</p>
          {opis && <p className="narz-bramka-opis">{opis}</p>}
        </div>
      </div>
      {korzysci.length > 0 && (
        <ul className="narz-bramka-korzysci">
          {korzysci.map((k) => <li key={k}>{k}</li>)}
        </ul>
      )}
      <div className="narz-bramka-wiersz">
        <label htmlFor={`email-${narzedzie}`} className="sr-only">E-Mail-Adresse</label>
        <input id={`email-${narzedzie}`} name="email" type="email" required {...WALID_DE} maxLength={200} autoComplete="email" inputMode="email" placeholder="sie@beispiel.de" className="narz-pole" />
        <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta={`narzedzie_${narzedzie}_odblokuj`}>
          {stan.status === 'loading' ? 'Wird gesendet…' : przycisk}
        </button>
      </div>
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
      <label className="narz-zgoda">
        <input type="checkbox" name="zgodaWynik" required {...WALID_DE} />
        <span>
          Bitte senden Sie mir dieses Ergebnis per E-Mail. Verantwortlicher: AI SIGNALS COMPANY P.S.A. ({SIEDZIBA.ulica}, Warschau, Polen). Wir verwenden Ihre Daten, um das Ergebnis zu senden und Ihre Fragen zu beantworten, und löschen sie nach 60 Tagen. Empfänger: {ODBIORCY_DE[narzedzie]}. Details in der <Link href="/cookies">Datenschutzerklärung</Link>.
        </span>
      </label>
      <p className="narz-bramka-mikro">{tylkoRaport ? 'Der Bericht erreicht Ihr Postfach innerhalb einer Minute.' : 'Der Bericht erreicht Ihr Postfach innerhalb einer Minute. Das vollständige Ergebnis sehen Sie außerdem sofort hier.'}</p>
      <Zwin otwarte={stan.status === 'error'}><p role="alert" className="narz-blad">{stan.blad}</p></Zwin>
    </form>
    </Zwin>
    {gotowe && <Odblokowano tylkoRaport={tylkoRaport} potwRef={potwRef} />}
    </>
  );
}

async function kopiuj(tekst) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // brak uprawnień (np. iframe): niżej zapasowa metoda
  }
  try {
    const t = document.createElement('textarea');
    t.value = tekst;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand('copy');
    t.remove();
    return ok;
  } catch {
    return false;
  }
}

/** „Link zum Ergebnis kopieren”: adres bieżącej strony z parametrami (tryb 'wypelnij': link tylko wypełnia pole). */
export function LinkWyniku({ parametry, narzedzie, tekst, className }) {
  const [stan, setStan] = useState({ status: 'idle', link: '', n: 0 });

  async function klik() {
    const link = linkZParametrami(parametry);
    if (!link) return;
    const ok = await kopiuj(link);
    setStan((x) => ({ status: ok ? 'ok' : 'blad', link, n: x.n + 1 }));
    if (narzedzie) track('narzedzie_link_wyniku', { narzedzie });
  }

  return (
    <div className={`${st.linkWyniku}${className ? ` ${className}` : ''}`}>
      <button type="button" className={st.przyciskTekstowy} onClick={klik} data-cta={narzedzie ? `narzedzie_${narzedzie}_link` : undefined}>
        {tekst ?? 'Link zum Ergebnis kopieren'}
      </button>
      <span className="narz-mikro" role="status" aria-live="polite">
        {stan.status === 'ok' ? (
          <span key={stan.n} className="r-stan--ok">
            <svg className="r-ok-znak" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Link kopiert.{' '}
          </span>
        ) : null}
        {stan.status === 'blad' ? 'Kopieren fehlgeschlagen, markieren Sie den Link: ' : null}
        {stan.status === 'blad' ? <input readOnly value={stan.link} aria-label="Link zum Ergebnis" className="narz-pole" onFocus={(e) => e.target.select()} /> : null}
        {stan.status !== 'idle' ? 'Der Link öffnet das Tool mit der eingetragenen Adresse. Die Prüfung startet erst, wenn Sie auf den Button klicken.' : null}
      </span>
    </div>
  );
}

/** Wiersz „Beispiel: ai-seo-company.pl” pod polem adresu; klik wpisuje adres do pola, nie uruchamia narzędzia. */
export function PrzykladAdresu({ onWybierz, adresy = ['ai-seo-company.pl'] }) {
  return (
    <p className="narz-mikro">
      Beispiel:{' '}
      {adresy.map((a, i) => (
        <span key={a}>
          {i > 0 ? ', ' : null}
          <button type="button" className={st.przyciskTekstowy} onClick={() => onWybierz?.(a)} aria-label={`${a} eintragen`}>{a}</button>
        </span>
      ))}
    </p>
  );
}

/** Spis sekcji (sticky od 1024 px, pasek pod nagłówkiem na telefonie): wspólna logika w components/narzedzia/NawBok.jsx. */
export function NawBok({ rootId }) {
  return <NawBokBaza rootId={rootId} etykieta="Auf dieser Seite" />;
}
