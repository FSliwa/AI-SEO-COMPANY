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
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { MAKIETA } from '@/lib/narzedziaLiczby';
import { zachowaniePrzewijania } from '@/lib/ruch';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo, Postep } from './Wspolne';
import './ruch-c.css';

const KROKI_EN = ['Fetching your website and its content', 'Capturing a screenshot of the current design', 'Designing a new section layout', 'Matching colors, typography and the mobile version', 'Assembling the mockup'];
const KROKI = ['Pobieramy Twoją stronę i jej treści', 'Robimy zrzut obecnego wyglądu', 'Projektujemy nowy układ sekcji', 'Dopasowujemy kolory, typografię i wersję na telefon', 'Składamy makietę'];

const MAKIETA_DEMO_CSS = '*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;color:#1e1e1e;overflow-x:hidden}header{display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:space-between;align-items:center;padding:14px clamp(14px,4vw,40px);background:#fff;border-bottom:1px solid rgba(15,23,42,0.08)}nav{display:flex;flex-wrap:wrap;gap:6px 14px}nav a{margin:0;color:#1e1e1e;text-decoration:none;font-size:14px}.hero{padding:clamp(36px,8vw,84px) clamp(16px,5vw,40px);background:linear-gradient(135deg,#0a1337,#1b2470);color:#fff}.hero h1{font-size:clamp(22px,6vw,44px);line-height:1.14;max-width:680px;margin:0 0 14px;overflow-wrap:break-word;hyphens:auto}.hero p{font-size:clamp(15px,3.8vw,18px);line-height:1.55;max-width:600px;margin:0 0 24px;opacity:0.9}.btn{display:inline-block;background:#d85a30;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px}section.blok{padding:clamp(32px,6vw,56px) clamp(16px,5vw,40px)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:16px}.k{background:#f6f4ef;border-radius:18px;padding:20px}footer{padding:24px clamp(16px,5vw,40px);background:#0f172a;color:#cbd5e1;font-size:14px}';

function wyczyscDomeneDemo(surowy, en) {
  const zapas = en ? 'acme-industrial.com' : 'twojafirma.pl';
  const s = String(surowy || '').trim();
  if (!s) return zapas;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '') || zapas;
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || zapas;
  }
}

function zbudujDemoMakieteHtml(en) {
  if (en) {
    const podglad = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS}</style></head><body>
<section data-sekcja="1"><header><strong>Acme Industrial Ltd</strong><nav><a href="#">Services</a><a href="#">Case Studies</a><a href="#">Contact</a></nav></header><div class="hero"><h1>Precision Engineering &amp; B2B Manufacturing Solutions</h1><p>Preview of the redesigned first screen built directly from your website content.</p><a class="btn" href="#">Request a Quote</a></div></section></body></html>`;
    const pelna = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS}</style></head><body>
<section data-sekcja="1"><header><strong>Acme Industrial Ltd</strong><nav><a href="#">Services</a><a href="#">Case Studies</a><a href="#">Contact</a></nav></header><div class="hero"><h1>Precision Engineering &amp; B2B Manufacturing Solutions</h1><p>Full 4-section responsive homepage mockup with desktop and mobile views.</p><a class="btn" href="#">Request a Quote</a></div></section>
<section class="blok" data-sekcja="2"><h2>Core Services</h2><div class="grid"><div class="k"><strong>CNC Machining</strong><p>Custom tolerances and CAD-to-part production.</p></div><div class="k"><strong>Assembly</strong><p>On-schedule delivery across your target markets.</p></div><div class="k"><strong>Maintenance</strong><p>Dedicated engineers and SLA support.</p></div></div></section>
<section class="blok" data-sekcja="3"><h2>Why Clients Work With Us</h2><div class="grid"><div class="k">Dedicated project lead</div><div class="k">Transparent quotes in 48h</div><div class="k">ISO-verified quality</div></div></section>
<section class="blok" data-sekcja="4"><h2>Direct Contact</h2><p>Phone number and email carried over from your current homepage.</p></section>
<footer>Acme Industrial Ltd - Redesign proposal built from your existing content</footer></body></html>`;
    return { nazwa: 'Acme Industrial Ltd', podglad, pelna };
  }
  const podglad = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS}</style></head><body>
<section data-sekcja="1"><header><strong>Precyzja B2B Sp. z o.o.</strong><nav><a href="#">Oferta</a><a href="#">Realizacje</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Precyzyjne wykonawstwo i rozwiązania dla przemysłu</h1><p>Podgląd nowego pierwszego ekranu zaprojektowanego na bazie treści Twojej obecnej strony.</p><a class="btn" href="#">Zapytaj o wycenę</a></div></section></body></html>`;
  const pelna = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>${MAKIETA_DEMO_CSS}</style></head><body>
<section data-sekcja="1"><header><strong>Precyzja B2B Sp. z o.o.</strong><nav><a href="#">Oferta</a><a href="#">Realizacje</a><a href="#">Kontakt</a></nav></header><div class="hero"><h1>Precyzyjne wykonawstwo i rozwiązania dla przemysłu</h1><p>Pełna makieta nowej strony głównej w trybie DEMO z czterema sekcjami i stopką.</p><a class="btn" href="#">Zapytaj o wycenę</a></div></section>
<section class="blok" data-sekcja="2"><h2>Główne usługi</h2><div class="grid"><div class="k"><strong>Produkcja</strong><p>Realizacja według dokumentacji technicznej klienta.</p></div><div class="k"><strong>Montaż</strong><p>Terminowe wdrożenia na terenie całej Polski.</p></div><div class="k"><strong>Serwis</strong><p>Stały opiekun techniczny i szybki czas reakcji.</p></div></div></section>
<section class="blok" data-sekcja="3"><h2>Dlaczego klienci wybierają nas</h2><div class="grid"><div class="k">Bezpośredni kontakt z inżynierem</div><div class="k">Konkretna wycena w 48 godz.</div><div class="k">Potwierdzona jakość wykonania</div></div></section>
<section class="blok" data-sekcja="4"><h2>Szybki kontakt</h2><p>Telefon i e-mail przeniesione z Twojej obecnej strony głównej.</p></section>
<footer>Precyzja B2B Sp. z o.o. - Propozycja układu z treści Twojej obecnej witryny</footer></body></html>`;
  return { nazwa: 'Precyzja B2B Sp. z o.o.', podglad, pelna };
}

function odmienSekcji(n) {
  if (n === 1) return '1 sekcję';
  const d = n % 10;
  const s = n % 100;
  return d >= 2 && d <= 4 && (s < 12 || s > 14) ? `${n} sekcje` : `${n} sekcji`;
}

function odczytajOdblokowanaMakiete(id) {
  if (!id || typeof window === 'undefined') return null;
  try {
    const s = window.sessionStorage.getItem(`aisc_mak_${id}`);
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
    window.sessionStorage.setItem(`aisc_mak_${id}`, JSON.stringify(dane));
  } catch {
    // brak dostepu do sessionStorage
  }
}

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
    zapiszParametry({ url, wynik: null });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, trybDemo: false });
    track('narzedzie_start', { narzedzie: 'makieta' });
    const r = await wywolajNarzedzie('makieta', { url, cel: String(fd.get('cel') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' }, 290_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'makieta' });
    zapiszParametry({ url, wynik: r.id || null });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null, trybDemo: false });
  }

  function zaladujDemo() {
    const surowy = poleRef.current?.value || adres || (en ? 'acme-industrial.com' : 'twoja-produkcja.pl');
    const domena = wyczyscDomeneDemo(surowy, en);
    const wzor = zbudujDemoMakieteHtml(en);
    setAdres(domena);
    if (poleRef.current && !poleRef.current.value) poleRef.current.value = domena;
    track('narzedzie_demo', { narzedzie: 'makieta', lang: en ? 'en' : 'pl' });
    setStan({
      status: 'done',
      blad: null,
      id: null,
      podglad: {
        domena,
        nazwa: wzor.nazwa,
        zrzut: null,
        html: wzor.podglad,
        sekcji: 4,
      },
      pelny: {
        domena,
        nazwa: wzor.nazwa,
        html: wzor.pelna,
        zrzut: null,
        sekcji: 4,
        link: '#',
      },
      trybDemo: true,
      mailOk: true,
    });
  }

  const p = stan.podglad;
  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="mak-url" className="narz-etykieta">{en ? 'Current website address' : 'Adres obecnej strony'}</label>
          <input ref={poleRef} id="mak-url" name="url" required maxLength={300} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
          <PrzykladAdresu onWybierz={(a) => { setAdres(a); if (poleRef.current) { poleRef.current.value = a; poleRef.current.focus(); } }} />
          <label htmlFor="mak-cel" className="narz-etykieta">{en ? 'What should improve? (optional)' : 'Co ma się poprawić? (opcjonalnie)'}</label>
          <input id="mak-cel" name="cel" maxLength={300} placeholder={en ? 'e.g. more calls and enquiries' : 'np. więcej telefonów i zapytań'} className="narz-pole" />
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="narzedzie_makieta_start">
              {stan.status === 'loading' ? (en ? 'Designing…' : 'Projektuję…') : (en ? 'Design a new website' : 'Zaprojektuj nową stronę')}
            </button>
            <button type="button" className="btn btn-secondary" disabled={stan.status === 'loading'} onClick={zaladujDemo} data-cta="narzedzie_makieta_demo">
              {en ? 'Load DEMO preview' : 'Załaduj podgląd DEMO'}
            </button>
          </div>
          <p className="narz-mikro">{en ? `No signup. The mockup takes ${MAKIETA.minut.replace('-', ' to ')} minutes. Up to ${MAKIETA.limitIp} mockups per day from one IP address.` : `Bez rejestracji. Makieta powstaje ${MAKIETA.minut.replace('-', ' do ')} minut. Do ${MAKIETA.limitIp} makiet dziennie z jednego adresu IP.`}</p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={25000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div ref={wynikRef} className="narz-wynik c-skok" aria-live="polite" style={{ scrollMarginTop: '112px', ...(rezerwa ? { minHeight: rezerwa, alignContent: 'start' } : {}) }}>
          <div style={{ scrollMarginTop: '112px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
            <p className="narz-wynik-domena" style={{ margin: 0 }}>{en ? 'New homepage' : 'Nowa strona główna'}: {p.nazwa}</p>
            {stan.trybDemo && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.86rem' }}
                onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, trybDemo: false })}
              >
                {en ? 'Enter your own website' : 'Wpisz własną stronę'}
              </button>
            )}
          </div>
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
                  naglowek={en ? `Unlock the full mockup (${p.sekcji} ${p.sekcji === 1 ? 'section' : 'sections'})` : `Odblokuj całą makietę (${odmienSekcji(p.sekcji || 0)})`}
                  opis={en ? 'We will show the whole page, mobile included, and email you a link to the mockup so you can show it to a partner or a developer.' : 'Pokażemy całą stronę, także na telefonie, i wyślemy link do makiety e-mailem, żeby pokazać ją wspólnikowi albo programiście.'}
                  korzysci={en ? ['All sections: services, advantages, contact, footer', 'Desktop and mobile preview', 'Link valid for 60 days'] : ['Wszystkie sekcje: usługi, przewagi, kontakt, stopka', 'Podgląd na komputerze i telefonie', 'Link ważny 60 dni']}
                  przycisk={en ? 'Show the full mockup' : 'Pokaż całą makietę'}
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
              <Odblokowano key="odblokowano" newsletter={stan.newsletter} mailOk={stan.mailOk} />
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
          {(adres || p.domena) ? (
            <LinkWyniku
              narzedzie="makieta"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: adres || p.domena, ...(stan.id ? { wynik: stan.id } : {}) }}
              podsumowanie={en ? `Website mockup proposal for ${p.domena}` : `Propozycja makiety strony dla ${p.domena}`}
            />
          ) : null}
          <p className="narz-mikro">{en ? 'The mockup is a design proposal built from your website’s content, not a finished website. Before launch we adapt it to your brand, photos and SEO.' : 'Makieta to propozycja wyglądu z treści Twojej strony, a nie gotowa strona. Przed wdrożeniem dopasowujemy ją do marki, zdjęć i SEO.'}</p>
        </div>
      )}
    </div>
  );
}
