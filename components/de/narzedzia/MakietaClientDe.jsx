'use client';

// Deutscher Website-Relaunch-Mockup-Generator (/de/tools/website-relaunch-mockup).
// API: panel /api/narzedzia/makieta mit { url, cel, nick, lang: 'de' }.
// Vor der E-Mail-Schranke: erster Bildschirm (Header + Hero) neben dem aktuellen Zustand.
// Nach Freischaltung: vollständiges Mockup, Umschalter Computer / Smartphone und Link per E-Mail (60 Tage gültig).
// Das Mockup wird ausschließlich in <iframe sandbox=""> ohne Skripte gerendert.

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, odblokuj, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { tekstPotwierdzenia } from '@/lib/narzedziaPotwierdzenie';
import { MAKIETA } from '@/lib/narzedziaLiczby';
import { SIEDZIBA } from '@/lib/firma';
import { WALID_DE } from '@/lib/walidacjaDe';
import { zachowaniePrzewijania } from '@/lib/ruch';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import Zwin from '@/components/narzedzia/Zwin';
import { LinkWyniku, Odblokowano, PasekDemo, Postep, PrzykladAdresu } from './WspolneDe';
import '@/components/narzedzia/ruch-c.css';

const KROKI_DE = [
  'Startseite und Inhalte Ihrer Website abrufen',
  'Screenshot der aktuellen Startseite aufnehmen',
  'Neue Sektionsstruktur und Hierarchie entwerfen',
  'Farben, Typografie und Smartphone-Ansicht abstimmen',
  'Relaunch-Mockup zusammensetzen',
];

const ODBIORCY_MAKIETA_DE = 'E-Mail-Dienstleister (Resend), Anbieter des KI-Modells (Anthropic) und Screenshot-Dienst (Microlink)';

const MAKIETA_DEMO_CSS_DE = '*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;color:#1e1e1e;overflow-x:hidden}header{display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:space-between;align-items:center;padding:14px clamp(14px,4vw,40px);background:#fff;border-bottom:1px solid rgba(15,23,42,0.08)}nav{display:flex;flex-wrap:wrap;gap:6px 14px}nav a{margin:0;color:#1e1e1e;text-decoration:none;font-size:14px}.hero{padding:clamp(36px,8vw,84px) clamp(16px,5vw,40px);background:linear-gradient(135deg,#0a1337,#1b2470);color:#fff}.hero h1{font-size:clamp(22px,6vw,44px);line-height:1.14;max-width:680px;margin:0 0 14px;overflow-wrap:break-word;hyphens:auto}.hero p{font-size:clamp(15px,3.8vw,18px);line-height:1.55;max-width:600px;margin:0 0 24px;opacity:0.9}.btn{display:inline-block;background:#d85a30;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px}section.blok{padding:clamp(32px,6vw,56px) clamp(16px,5vw,40px)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:16px}.k{background:#f6f4ef;border-radius:18px;padding:20px}footer{padding:24px clamp(16px,5vw,40px);background:#0f172a;color:#cbd5e1;font-size:14px}';

const MAKIETA_DEMO_PODGLAD_DE = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS_DE}</style></head><body>
<section data-sekcja="1"><header><strong>Beispiel GmbH</strong><nav><a href="#">Leistungen</a><a href="#">Referenzen</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Maßgefertigte Lösungen für Industrie und Mittelstand</h1><p>Vorschau des ersten Bildschirms im Demo-Modus auf Basis Ihrer bestehenden Inhalte.</p><a class="btn" href="#">Angebot anfordern</a></div></section></body></html>`;

const MAKIETA_DEMO_PELNA_DE = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS_DE}</style></head><body>
<section data-sekcja="1"><header><strong>Beispiel GmbH</strong><nav><a href="#">Leistungen</a><a href="#">Referenzen</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Maßgefertigte Lösungen für Industrie und Mittelstand</h1><p>Vollständiges Beispiel-Mockup im Demo-Modus mit vier Sektionen und Footer.</p><a class="btn" href="#">Angebot anfordern</a></div></section>
<section class="blok" data-sekcja="2"><h2>Kernleistungen</h2><div class="grid"><div class="k"><strong>Fertigung</strong><p>Präzise Umsetzung nach Ihren Vorgaben.</p></div><div class="k"><strong>Montage</strong><p>Termintreue Lieferung im gesamten DACH-Raum.</p></div><div class="k"><strong>Wartung</strong><p>Verlässlicher Service und feste Ansprechpartner.</p></div></div></section>
<section class="blok" data-sekcja="3"><h2>Warum Kunden mit uns arbeiten</h2><div class="grid"><div class="k">Klare Ansprechpartner</div><div class="k">Transparente Angebote in 48 Std.</div><div class="k">Geprüfte Qualität</div></div></section>
<section class="blok" data-sekcja="4"><h2>Direktkontakt</h2><p>Telefon und E-Mail aus Ihrer aktuellen Startseite übernommen.</p></section>
<footer>Beispiel GmbH - Entwurf aus den Inhalten Ihrer bestehenden Website</footer></body></html>`;

function sektionenText(n) {
  return `${n} ${n === 1 ? 'Sektion' : 'Sektionen'}`;
}

function wyczyscDomene(surowy) {
  const s = String(surowy || '').trim();
  if (!s) return 'beispiel.de';
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '');
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || 'beispiel.de';
  }
}

function odczytajOdblokowanaMakiete(id) {
  if (!id || typeof window === 'undefined') return null;
  try {
    const s = window.sessionStorage.getItem(`aisc_mak_de_${id}`);
    if (!s) return null;
    const p = JSON.parse(s);
    return p && typeof p === 'object' ? p : null;
  } catch {
    return null;
  }
}

function zapiszOdblokowanaMakiete(id, dane) {
  if (!id || !dane?.pelny || typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(`aisc_mak_de_${id}`, JSON.stringify(dane));
  } catch {
    // kein Zugriff auf sessionStorage
  }
}

function Ramka({ html, tytul, wysokosc = 640, szerokosc = '100%' }) {
  const [gotowa, setGotowa] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGotowa(true), 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="narz-ramka mak-ramka" data-gotowa={gotowa ? '' : undefined} style={{ '--szer': szerokosc }}>
      <div className="narz-ramka-pasek" aria-hidden="true"><span /><span /><span /></div>
      <div className="mak-ramka-szk" aria-hidden="true" />
      <iframe
        title={tytul}
        srcDoc={html}
        sandbox=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setGotowa(true)}
        style={{ height: wysokosc }}
      />
    </div>
  );
}

function BramkaEmailMakietaDe({ id, domena, sekcji, onOdblokowano }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null, mailOk: true });
  const ref = useRef(null);
  const widziana = useRef(false);
  const potwRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((w) => {
      if (w.some((x) => x.isIntersecting) && !widziana.current) {
        widziana.current = true;
        track('narzedzie_bramka', { narzedzie: 'makieta', lang: 'de' });
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const gotowe = stan.status === 'done';
  useEffect(() => {
    if (gotowe) potwRef.current?.focus({ preventScroll: true });
  }, [gotowe]);

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (DEMO) {
      setStan({ status: 'loading', blad: null, mailOk: true });
      await new Promise((r) => setTimeout(r, 800));
      track('generate_lead', { lead_source: 'tool_gate', event_category: 'Narzędzia', plan: 'makieta', currency: 'EUR', value: 12 });
      const pelnyDemo = {
        domena: domena || 'beispiel.de',
        nazwa: domena || 'Beispiel GmbH',
        html: MAKIETA_DEMO_PELNA_DE,
        zrzut: null,
        sekcji: 4,
        link: '#',
      };
      setStan({ status: 'done', blad: null, mailOk: true });
      onOdblokowano?.(pelnyDemo, null, true);
      return;
    }

    const body = {
      narzedzie: 'makieta',
      ...(id ? { id } : {}),
      email: String(fd.get('email') || '').trim(),
      zgodaWynik: fd.get('zgodaWynik') === 'on',
      newsletter: false,
      nick: String(fd.get('nick') || ''),
      lang: 'de',
    };
    setStan((x) => ({ status: 'loading', blad: x.blad, mailOk: true }));
    const r = await odblokuj(body);
    if (!r.ok) {
      setStan({ status: 'error', blad: r.blad, mailOk: false });
      return;
    }
    track('generate_lead', { lead_source: 'tool_gate', event_category: 'Narzędzia', plan: 'makieta', currency: 'EUR', value: 12 });
    setStan({ status: 'done', blad: null, mailOk: r.mailOk });
    onOdblokowano?.(r.pelny, r.newsletter, r.mailOk);
  }

  const potw = tekstPotwierdzenia({ lang: 'de', tylkoRaport: false, mailOk: stan.mailOk });

  return (
    <>
      <Zwin otwarte={!gotowe} wejscie={false}>
        <form ref={ref} className="narz-bramka" onSubmit={wyslij} aria-labelledby="bramka-makieta-de">
          <div className="narz-bramka-glowa">
            <span className="narz-bramka-ikona" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            </span>
            <div>
              <p id="bramka-makieta-de" className="narz-bramka-tytul">
                {`Gesamtes Mockup freischalten (${sektionenText(sekcji || 4)})`}
              </p>
              <p className="narz-bramka-opis">
                Wir zeigen Ihnen die komplette Startseite inklusive Smartphone-Ansicht und senden Ihnen einen Direktlink zum Teilen mit Geschäftsführung oder Entwicklung.
              </p>
            </div>
          </div>
          <ul className="narz-bramka-korzysci">
            <li>Alle Sektionen: Leistungen, Vorteile, Kontakt und Footer</li>
            <li>Umschaltbare Vorschau für Computer und Smartphone</li>
            <li>Direktlink 60 Tage lang abrufbar</li>
          </ul>
          <div className="narz-bramka-wiersz">
            <label htmlFor="email-makieta-de" className="sr-only">E-Mail-Adresse</label>
            <input
              id="email-makieta-de"
              name="email"
              type="email"
              required
              {...WALID_DE}
              maxLength={200}
              autoComplete="email"
              inputMode="email"
              placeholder="sie@beispiel.de"
              className="narz-pole"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={stan.status === 'loading'}
              aria-busy={stan.status === 'loading' ? 'true' : undefined}
              data-cta="narzedzie_makieta_de_odblokuj"
            >
              {stan.status === 'loading' ? 'Wird gesendet…' : 'Gesamtes Mockup anzeigen'}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <label className="narz-zgoda">
            <input type="checkbox" name="zgodaWynik" required {...WALID_DE} />
            <span>
              Bitte senden Sie mir dieses Ergebnis per E-Mail. Verantwortlicher: AI SIGNALS COMPANY P.S.A. ({SIEDZIBA.ulica}, Warschau, Polen). Wir verwenden Ihre Daten, um das Ergebnis zu senden und Ihre Fragen zu beantworten, und löschen sie nach 60 Tagen. Empfänger: {ODBIORCY_MAKIETA_DE}. Details in der <Link href="/cookies">Datenschutzerklärung</Link>.
            </span>
          </label>
          <p className="narz-bramka-mikro">
            Der Link erreicht Ihr Postfach innerhalb einer Minute. Das vollständige Mockup sehen Sie außerdem sofort hier.
          </p>
          <Zwin otwarte={stan.status === 'error'}>
            <p role="alert" className="narz-blad">{stan.blad || potw.tytul}</p>
          </Zwin>
        </form>
      </Zwin>
      {gotowe && <Odblokowano tylkoRaport={false} potwRef={potwRef} mailOk={stan.mailOk} />}
    </>
  );
}

export default function MakietaClientDe() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
  const [widok, setWidok] = useState('komputer');
  const [adres, setAdres] = useState('');
  const poleRef = useRef(null);
  const wynikRef = useRef(null);
  const [rezerwa, setRezerwa] = useState(0);

  useParametrUrl(['url', 'wynik'], ({ url, wynik }) => {
    if (url) {
      setAdres(url);
      if (poleRef.current) poleRef.current.value = url;
    }
    if (wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(wynik)) {
      const zapamietana = odczytajOdblokowanaMakiete(wynik);
      setStan({ status: 'loading', blad: null, id: wynik, podglad: null, pelny: null });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            const dom = data.podglad.domena || url || '';
            if (dom) {
              setAdres(dom);
              if (poleRef.current && !poleRef.current.value) poleRef.current.value = dom;
            }
            setStan({
              status: 'done',
              blad: null,
              id: wynik,
              podglad: data.podglad,
              pelny: zapamietana?.pelny ?? null,
              newsletter: zapamietana?.newsletter,
              mailOk: zapamietana?.mailOk,
            });
          } else {
            setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null }));
    }
  });

  useEffect(() => {
    if (!stan.pelny) return undefined;
    wynikRef.current?.scrollIntoView({ block: 'start', behavior: zachowaniePrzewijania() });
    const t = setTimeout(() => setRezerwa(0), 1200);
    return () => clearTimeout(t);
  }, [stan.pelny]);

  function zaladujDemo() {
    const surowy = poleRef.current?.value || adres || 'beispiel-industrie.de';
    const domena = wyczyscDomene(surowy);
    setAdres(domena);
    if (poleRef.current && !poleRef.current.value) poleRef.current.value = domena;
    track('narzedzie_demo', { narzedzie: 'makieta', lang: 'de' });
    setStan({
      status: 'done',
      blad: null,
      id: null,
      podglad: {
        domena,
        nazwa: 'Beispiel GmbH',
        zrzut: null,
        html: MAKIETA_DEMO_PODGLAD_DE,
        sekcji: 4,
      },
      pelny: {
        domena,
        nazwa: 'Beispiel GmbH',
        html: MAKIETA_DEMO_PELNA_DE,
        zrzut: null,
        sekcji: 4,
        link: '#',
      },
      trybDemo: true,
      mailOk: true,
    });
  }

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = String(fd.get('url') || '').trim();
    const cel = String(fd.get('cel') || '').trim();
    setAdres(url);
    zapiszParametry({ url, wynik: null });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null });
    track('narzedzie_start', { narzedzie: 'makieta', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 1400));
      const domena = wyczyscDomene(url);
      const podgladDemo = {
        domena,
        nazwa: domena,
        zrzut: null,
        html: MAKIETA_DEMO_PODGLAD_DE,
        sekcji: 4,
      };
      track('narzedzie_wynik', { narzedzie: 'makieta', lang: 'de' });
      setStan({ status: 'done', blad: null, id: 'demo-makieta-de', podglad: podgladDemo, pelny: null });
      return;
    }

    const r = await wywolajNarzedzie('makieta', { url, cel, nick: String(fd.get('nick') || ''), lang: 'de' }, 290_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'makieta', lang: 'de' });
    zapiszParametry({ url, wynik: r.id || null });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null });
  }

  const p = stan.podglad;
  const minuty = MAKIETA.minut.replace('-', ' bis ');

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="mak-url-de" className="narz-etykieta">Adresse Ihrer aktuellen Website</label>
          <input
            ref={poleRef}
            id="mak-url-de"
            name="url"
            required
            {...WALID_DE}
            maxLength={300}
            placeholder="z. B. ihrefirma.de"
            className="narz-pole"
            inputMode="url"
            autoComplete="url"
          />
          <PrzykladAdresu
            onWybierz={(a) => {
              setAdres(a);
              if (poleRef.current) {
                poleRef.current.value = a;
                poleRef.current.focus();
              }
            }}
          />
          <label htmlFor="mak-cel-de" className="narz-etykieta">Was soll sich verbessern? (optional)</label>
          <input
            id="mak-cel-de"
            name="cel"
            maxLength={300}
            placeholder="z. B. mehr Anfragen & Anrufe"
            className="narz-pole"
          />
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary c-zajety"
              disabled={stan.status === 'loading'}
              aria-busy={stan.status === 'loading' ? 'true' : undefined}
              data-cta="narzedzie_makieta_de_start"
            >
              {stan.status === 'loading' ? 'Entwurf entsteht…' : 'Neue Startseite entwerfen'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={stan.status === 'loading'}
              onClick={zaladujDemo}
              data-cta="narzedzie_makieta_de_demo"
            >
              DEMO-Vorschau laden
            </button>
          </div>
          <p className="narz-mikro">
            {`Ohne Anmeldung. Der Entwurf dauert ${minuty} Minuten. Bis zu ${MAKIETA.limitIp} Mockups pro Tag und IP-Adresse.`}
          </p>
          {stan.status === 'loading' && <Postep kroki={KROKI_DE} co={25000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div
          ref={wynikRef}
          className="narz-wynik c-skok"
          aria-live="polite"
          style={{ scrollMarginTop: '112px', ...(rezerwa ? { minHeight: rezerwa, alignContent: 'start' } : {}) }}
        >
          <div style={{ scrollMarginTop: '112px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
            <p className="narz-wynik-domena" style={{ margin: 0 }}>Neue Startseite: {p.nazwa}</p>
            {stan.trybDemo && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.86rem' }}
                onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, trybDemo: false })}
              >
                Eigene Website eingeben
              </button>
            )}
          </div>
          {!stan.pelny ? (
            <>
              <div key="przed-bramka" className={`narz-porownanie-makiet${p.zrzut ? '' : ' narz-porownanie-makiet--bez-zrzutu'}`}>
                {p.zrzut && (
                  <figure>
                    <figcaption>Aktuell</figcaption>
                    {/* eslint-disable-next-line @next/next/no-img-element -- externer Screenshot-Dienst (Microlink) */}
                    <img src={p.zrzut} alt={`Aktuelle Startseite von ${p.domena}`} loading="lazy" />
                  </figure>
                )}
                <figure>
                  <figcaption>Vorschlag: erster Bildschirm</figcaption>
                  <Ramka html={p.html} tytul={`Mockup: erster Bildschirm von ${p.domena}`} wysokosc={520} />
                </figure>
              </div>
              <div key="bramka" className="narz-zablokowane mak-zablok">
                <div className="narz-zamglone narz-makieta-atrapa" aria-hidden="true">
                  {Array.from({ length: Math.min(4, Math.max(1, (p.sekcji || 4) - 1)) }, (_, i) => <div key={i} />)}
                </div>
                <BramkaEmailMakietaDe
                  id={stan.id}
                  domena={p.domena}
                  sekcji={p.sekcji}
                  onOdblokowano={(pelny, newsletter, mailOk) => {
                    setRezerwa(wynikRef.current?.offsetHeight || 0);
                    zapiszOdblokowanaMakiete(stan.id, { pelny, newsletter, mailOk });
                    setStan((s) => ({ ...s, pelny, newsletter, mailOk }));
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <Odblokowano key="odblokowano" mailOk={stan.mailOk} />
              <div key="filtry" className="narz-filtry" role="group" aria-label="Mockup-Ansicht">
                {[['komputer', 'Computer'], ['telefon', 'Smartphone']].map(([k, t]) => (
                  <button key={k} type="button" aria-pressed={widok === k} onClick={() => setWidok(k)}>{t}</button>
                ))}
              </div>
              <Ramka
                key="pelna-ramka"
                html={stan.pelny.html}
                tytul={`Website-Mockup für ${p.domena}`}
                wysokosc={widok === 'telefon' ? 760 : 900}
                szerokosc={widok === 'telefon' ? '390px' : '100%'}
              />
              {stan.pelny.link && stan.pelny.link !== '#' && (
                <p className="narz-mikro">
                  <a href={stan.pelny.link} target="_blank" rel="noopener">Mockup in neuem Tab öffnen</a> (den Link haben wir Ihnen auch per E-Mail geschickt).
                </p>
              )}
            </>
          )}
          {(adres || p.domena) ? (
            <LinkWyniku
              narzedzie="makieta"
              tryb={stan.id && !DEMO ? 'wynik' : 'wypelnij'}
              parametry={{ url: adres || p.domena, ...(stan.id && !DEMO ? { wynik: stan.id } : {}) }}
              podsumowanie={`Website-Relaunch-Mockup für ${p.domena}`}
            />
          ) : null}
          <p className="narz-mikro">
            Das Mockup ist ein Gestaltungsvorschlag aus den Inhalten Ihrer bestehenden Website und noch keine fertige Website. Vor dem Livegang stimmen wir Design, Bilder und technisches SEO individuell ab.
          </p>
        </div>
      )}
    </div>
  );
}
