'use client';

// Deutscher Local-SEO-NAP-Scanner, Bewertungs-Rechner & Google-QR-Generator (/de/tools/lokales-seo-nap-qr-generator).
// API: POST ${PANEL_API}/lokalne-nap mit { url, twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie, linkWizytowki, lang: 'de' }.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba as fmtDe } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { LinkWyniku, Ocena, PasekDemo, Postep, PrzykladAdresu } from '@/components/de/narzedzia/WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { sciezkaSvgQr, zakodujQr, zbudujPlikSvgQr } from '@/components/narzedzia/sprint2/qrSvg';
import { CSS_SPRINT2, pobierzPlikTekstowy, wyczyscDomene } from '@/components/narzedzia/sprint2/wspolneSprint2';

const DOMYSLNY_LINK_QR = 'https://g.page/r/CdDnrccOQDBZEBM/review';

function policzBrakujaceOpinie({ twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie }) {
  const r = Math.max(1, Math.min(5, Number(twojaOcena) || 4.2));
  const n = Math.max(0, Math.round(Number(twojeOpinie) || 0));
  const cel = Math.max(1.1, Math.min(4.95, Number(celOcena) || 4.8));
  const rk = Math.max(1, Math.min(5, Number(konkurentOcena) || 4.9));
  const nk = Math.max(0, Math.round(Number(konkurentOpinie) || 0));

  const doCelu = r >= cel ? 0 : Math.max(0, Math.ceil((n * (cel - r)) / (5 - cel)));
  const progKonk = Math.min(4.95, rk);
  const doSredniejLidera = r >= progKonk ? 0 : Math.max(0, Math.ceil((n * (progKonk - r)) / (5 - progKonk)));
  const doLiczbyLidera = Math.max(0, nk + 1 - n);
  const doWyprzedzeniaLidera = Math.max(doSredniejLidera, doLiczbyLidera);

  return { doCelu, doWyprzedzeniaLidera };
}

function pobierzPngQr1024(tekst, nazwaPliku = 'google-bewertung-qr-1024px.png') {
  const wynik = zakodujQr(tekst);
  if (!wynik.ok || typeof document === 'undefined') return false;
  const margines = 4;
  const liczbaModulow = wynik.rozmiar + margines * 2;
  const rozmiarPx = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = rozmiarPx;
  canvas.height = rozmiarPx;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, rozmiarPx, rozmiarPx);

  const skala = rozmiarPx / liczbaModulow;
  ctx.fillStyle = '#101935';
  for (let w = 0; w < wynik.rozmiar; w += 1) {
    for (let k = 0; k < wynik.rozmiar; k += 1) {
      if (wynik.macierz[w][k]) {
        const x0 = Math.round((k + margines) * skala);
        const y0 = Math.round((w + margines) * skala);
        const x1 = Math.round((k + margines + 1) * skala);
        const y1 = Math.round((w + margines + 1) * skala);
        ctx.fillRect(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
      }
    }
  }

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nazwaPliku;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
  return true;
}

function odczytajWierszeNapDe(w) {
  const html = w?.napHtml || {};
  const schema = w?.napSchema || {};
  const sp = w?.spojnosc;

  if (Array.isArray(sp) && sp.length > 0 && sp[0]?.pole) {
    return sp.map((wiersz) => ({
      klucz: wiersz.pole,
      etykieta: wiersz.etykieta || wiersz.pole,
      html: wiersz.html ?? '-',
      schema: wiersz.schema ?? '-',
      status: wiersz.status || (wiersz.zgodne ? 'ok' : 'uwaga'),
    }));
  }

  const definicje = [
    { klucz: 'nazwa', alt: 'name', etykieta: 'Firmenname' },
    { klucz: 'telefon', alt: 'telephone', etykieta: 'Telefonnummer' },
    { klucz: 'adres', alt: 'address', etykieta: 'Straße, PLZ & Ort' },
    { klucz: 'nip', alt: 'taxID', etykieta: 'USt-IdNr. / Steuernummer' },
    { klucz: 'godziny', alt: 'openingHours', etykieta: 'Öffnungszeiten' },
    { klucz: 'geo', alt: 'coordinates', etykieta: 'Geo-Koordinaten (Lat/Lng)' },
  ];

  return definicje.map((d) => {
    const rawHtml = d.klucz === 'geo' ? (html.coordinates ?? html.geo) : (html[d.klucz] ?? html[d.alt]);
    const rawSchema = d.klucz === 'geo' ? (schema.coordinates ?? schema.geo) : (schema[d.klucz] ?? schema[d.alt]);
    const vHtml = typeof rawHtml === 'boolean' ? (rawHtml ? 'Vorhanden' : null) : rawHtml;
    const vSchema = typeof rawSchema === 'boolean' ? (rawSchema ? 'Im Schema vorhanden' : null) : rawSchema;
    const rawSp = sp && typeof sp === 'object' ? (sp[d.klucz] ?? sp[d.alt]) : undefined;
    let status = 'brak';
    if (rawSp === true || /ok|zgod|match/i.test(String(rawSp || ''))) status = 'ok';
    else if (rawSp === false || /rozjazd|konflikt|mismatch|blad/i.test(String(rawSp || ''))) status = 'blad';
    else if (vHtml && vSchema) status = String(vHtml).trim() === String(vSchema).trim() ? 'ok' : 'uwaga';
    else if (vHtml || vSchema) status = 'uwaga';

    return {
      klucz: d.klucz,
      etykieta: d.etykieta,
      html: vHtml || 'Nicht im HTML erkannt',
      schema: vSchema || 'Fehlt in LocalBusiness',
      status,
    };
  });
}

function demoLokalneNapDe(surowyUrl, parametryOpinii) {
  const domena = wyczyscDomene(surowyUrl || 'ihre-praxis.de', 'ihre-praxis.de');
  const wzorcowa = domena.includes('ai-seo-company');
  const kalk = policzBrakujaceOpinie(parametryOpinii);

  if (wzorcowa) {
    return {
      ok: true,
      id: null,
      domena,
      ocena: 96,
      napHtml: {
        nazwa: 'AI SIGNALS COMPANY P.S.A. (AI SEO COMPANY)',
        telefon: '+48 510 421 090',
        adres: 'ul. Grzybowska 5A, 00-132 Warszawa',
        nip: 'PL5253090237',
        godziny: 'Mo-Fr 09:00-17:00',
        geo: '52.2356, 20.9984',
      },
      napSchema: {
        nazwa: 'AI SEO COMPANY',
        telefon: '+48 510 421 090',
        adres: 'ul. Grzybowska 5A, 00-132 Warszawa, PL',
        nip: 'PL5253090237',
        godziny: 'Mo-Fr 09:00-17:00',
        geo: '52.2356, 20.9984',
      },
      spojnosc: { nazwa: 'ok', telefon: 'ok', adres: 'ok', nip: 'ok', godziny: 'ok', geo: 'ok' },
      kalkulatorOpinii: kalk,
      rekomendacje: [
        'Vollständige NAP-Übereinstimmung zwischen sichtbarem HTML und LocalBusiness JSON-LD (Telefon, Anschrift, USt-IdNr. und Geo-Koordinaten).',
      ],
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 56,
    napHtml: {
      nazwa: `${domena.split('.')[0].toUpperCase()} GmbH`,
      telefon: '+49 89 1234567',
      adres: 'Maximilianstraße 24, 80539 München',
      nip: 'DE123456789',
      godziny: 'Mo-Fr 08:30-18:00 Uhr',
      geo: null,
    },
    napSchema: {
      nazwa: domena,
      telefon: '+49 89 9876543',
      adres: 'München (ohne Straße und PLZ)',
      nip: null,
      godziny: null,
      geo: null,
    },
    spojnosc: {
      nazwa: 'uwaga',
      telefon: 'blad',
      adres: 'blad',
      nip: 'uwaga',
      godziny: 'uwaga',
      geo: 'brak',
    },
    kalkulatorOpinii: kalk,
    rekomendacje: [
      'Abweichende Telefonnummer: Im sichtbaren Kontaktbereich steht +49 89 1234567, im LocalBusiness-JSON-LD jedoch eine alte Durchwahl (+49 89 9876543).',
      'PostalAddress (Straße + Postleitzahl), GeoCoordinates und OpeningHoursSpecification vollständig im LocalBusiness-Schema ergänzen.',
      'Den dauerhaften Vektor-QR-Code unten für Empfang, Rechnungen oder Visitenkarten nutzen, um kontinuierlich echte 5-Sterne-Bewertungen aufzubauen.',
    ],
  };
}

export function LokalneNapClientDe() {
  const [adres, setAdres] = useState('');
  const [linkWizytowki, setLinkWizytowki] = useState(DOMYSLNY_LINK_QR);
  const [twojaOcena, setTwojaOcena] = useState(4.3);
  const [twojeOpinie, setTwojeOpinie] = useState(24);
  const [celOcena, setCelOcena] = useState(4.8);
  const [konkurentOcena] = useState(4.9);
  const [konkurentOpinie, setKonkurentOpinie] = useState(85);
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });

  const poleRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['url', 'qr', 'r', 'n', 'cel', 'wynik'], (p) => {
    if (p.url) setAdres(p.url);
    if (p.qr) setLinkWizytowki(p.qr);
    if (p.r && Number.isFinite(Number(p.r))) setTwojaOcena(Math.max(1, Math.min(5, Number(p.r))));
    if (p.n && Number.isFinite(Number(p.n))) setTwojeOpinie(Math.max(0, Math.min(5000, Math.round(Number(p.n)))));
    if (p.cel && Number.isFinite(Number(p.cel))) setCelOcena(Math.max(3.5, Math.min(4.9, Number(p.cel))));
    if (p.wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(p.wynik)) {
      setStan({ status: 'loading', blad: null, wynik: null, id: p.wynik, trybDemo: false });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(p.wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            const pod = data.podglad;
            if (!p.url && (pod.url || pod.domena)) setAdres(pod.url || pod.domena);
            setStan({ status: 'done', blad: null, wynik: pod, id: p.wynik, trybDemo: false });
          } else {
            setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false }));
    }
  });

  useEffect(() => {
    if (stan.status === 'done') wynikRef.current?.focus({ preventScroll: true });
  }, [stan.status]);

  const kalkulatorZywy = useMemo(
    () => policzBrakujaceOpinie({ twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie }),
    [twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie]
  );

  const kodQr = useMemo(() => {
    const wejscie = linkWizytowki.trim() || DOMYSLNY_LINK_QR;
    const zakodowany = zakodujQr(wejscie);
    if (!zakodowany.ok) return { ...zakodowany, d: '', viewBoxRozmiar: 0, tekst: wejscie };
    const sciezka = sciezkaSvgQr(zakodowany.macierz, 4);
    return { ...zakodowany, ...sciezka, tekst: wejscie };
  }, [linkWizytowki]);

  function zaladujDemo() {
    const u = adres.trim() || 'ihre-praxis.de';
    if (!adres.trim()) setAdres(u);
    const d = demoLokalneNapDe(u, { twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie });
    track('narzedzie_demo', { narzedzie: 'lokalne_nap', lang: 'de' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomSkan(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, r: twojaOcena, n: twojeOpinie, cel: celOcena, wynik: null });
    track('narzedzie_start', { narzedzie: 'lokalne_nap', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoLokalneNapDe(wejscie, { twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie });
      track('narzedzie_wynik', { narzedzie: 'lokalne_nap', wynik: d.ocena, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/lokalne-nap`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          url: wejscie,
          twojaOcena,
          twojeOpinie,
          celOcena,
          konkurentOcena,
          konkurentOpinie,
          linkWizytowki: linkWizytowki.trim() || undefined,
          lang: 'de',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die NAP-Daten konnten für diese Website nicht ausgelesen werden.',
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'lokalne_nap', wynik: w.ocena ?? w.wynik, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? 'Zeitüberschreitung nach 45 Sekunden.'
          : 'Keine Verbindung zum Diagnoseserver.',
        wynik: null,
        id: null,
        trybDemo: false,
      });
    } finally {
      clearTimeout(zegar);
    }
  }

  function wybierzPakietKontakt(plan) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
    }
    track('narzedzie_bofu_klik', { narzedzie: 'lokalne_nap', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres, 'ihre-firma.de')) : '';
  const wierszeNap = w ? odczytajWierszeNapDe(w) : [];
  const rekomendacje = Array.isArray(w?.rekomendacje) ? w.rekomendacje : [];
  const maGbpDe = maWersjeDe('/pozycjonowanie-wizytowki-google');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomSkan}>
        <div className="sp2-siatka-pola">
          <div>
            <label htmlFor="nap-url-de" className="narz-etykieta">
              Unternehmens-Website (für NAP- &amp; Schema-Abgleich)
            </label>
            <input
              ref={poleRef}
              id="nap-url-de"
              name="url"
              required
              {...WALID_DE}
              maxLength={300}
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
              placeholder="z. B. ihre-firma.de"
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'nap-blad-de' : undefined}
            />
          </div>

          <div>
            <label htmlFor="nap-qr-input-de" className="narz-etykieta">
              Google-Bewertungslink für QR-Code (optional)
            </label>
            <input
              id="nap-qr-input-de"
              name="linkWizytowki"
              maxLength={190}
              value={linkWizytowki}
              onChange={(e) => setLinkWizytowki(e.target.value)}
              placeholder="z. B. g.page/r/.../review"
              className="narz-pole"
              inputMode="url"
            />
          </div>
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_lokalne_nap_de_start">
            {stan.status === 'loading' ? 'Vergleiche HTML & LocalBusiness...' : 'NAP-Konsistenz jetzt prüfen'}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            DEMO-Ergebnis laden
          </button>
        </div>

        <PrzykladAdresu
          adresy={['ai-seo-company.pl', 'staniax.pl']}
          onWybierz={(a) => {
            setAdres(a);
            poleRef.current?.focus();
          }}
        />

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Startseite, Kontakt und Impressum nach Telefon, Anschrift und USt-IdNr. durchsuchen',
              'LocalBusiness- und Organization-JSON-LD aus dem HTML auslesen',
              'Zeichen-für-Zeichen-Abgleich zwischen sichtbarem Text und Schema-Daten',
            ]}
            co={1150}
          />
        )}

        {stan.status === 'error' && (
          <p id="nap-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                Beispiel-DEMO geladen. Geben Sie oben Ihre eigene Website ein und klicken Sie auf „NAP-Konsistenz jetzt prüfen“, um Ihre Live-Daten abzugleichen.
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Local-NAP" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? 'Konsistente lokale Signale: Ihre sichtbaren Kontaktdaten stimmen sauber mit dem LocalBusiness-JSON-LD überein.'
                    : 'NAP-Abweichungen erkannt: Widersprüche zwischen Website-Text und LocalBusiness-Schema schwächen Ihre Google-Maps-Platzierung.'}
                </p>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Vergleich: Sichtbares HTML vs. JSON-LD LocalBusiness</h2>
              <div className="narz-tabela-wrap" style={{ marginTop: '0.65rem' }}>
                <table className="narz-tabela">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: 'left' }}>NAP-Merkmal</th>
                      <th scope="col" style={{ textAlign: 'left' }}>Sichtbarer Seitentext</th>
                      <th scope="col" style={{ textAlign: 'left' }}>JSON-LD LocalBusiness</th>
                      <th scope="col">Abgleich</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wierszeNap.map((wiersz) => {
                      const klasa = wiersz.status === 'ok'
                        ? 'sp2-pigulka--ok'
                        : wiersz.status === 'blad'
                        ? 'sp2-pigulka--blad'
                        : 'sp2-pigulka--uwaga';
                      const etykietaStatusu = wiersz.status === 'ok'
                        ? 'Konsistent'
                        : wiersz.status === 'blad'
                        ? 'Abweichung!'
                        : 'Ergänzen';
                      return (
                        <tr key={wiersz.klucz}>
                          <th scope="row" style={{ textAlign: 'left' }}>{wiersz.etykieta}</th>
                          <td className="narz-mikro" style={{ textAlign: 'left', color: 'var(--w-tusz)' }}>{String(wiersz.html)}</td>
                          <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)' }}>{String(wiersz.schema)}</td>
                          <td><span className={`sp2-pigulka ${klasa}`}>{etykietaStatusu}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {rekomendacje.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Konkrete Local-SEO-Empfehlungen ({rekomendacje.length})</h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {rekomendacje.map((r, idx) => (
                    <li key={idx} className={`narz-problem ${ocena >= 80 ? 'narz-problem--ok' : 'narz-problem--ostrzezenie'}`}>
                      <p className="narz-problem-fix" style={{ margin: 0 }}>
                        {typeof r === 'string' ? r : (r?.opis || r?.tytul || '')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Zwin>

      <div className="narz-wynik" style={{ marginTop: '1.25rem' }}>
        <div>
          <h2 className="narz-h2" style={{ fontWeight: 500, marginTop: 0 }}>
            Live-Rechner für fehlende 5★-Google-Bewertungen
          </h2>
          <p className="narz-mikro">
            Bewegen Sie die Regler, um sofort zu berechnen, wie viele neue 5-Sterne-Rezensionen bis zu Ihrem Zielwert und zum Überholen des lokalen Google-Maps-Spitzenreiters nötig sind.
          </p>

          <div className="sp2-suwaki-siatka">
            <div>
              <div className="sp2-suwak-gora">
                <label htmlFor="suwak-ocena-de" className="narz-etykieta" style={{ margin: 0 }}>Aktueller Schnitt</label>
                <span className="sp2-suwak-liczba">{fmtDe(twojaOcena, 'de', 1)} ★</span>
              </div>
              <input
                id="suwak-ocena-de"
                type="range"
                min={2.5}
                max={4.9}
                step={0.1}
                value={twojaOcena}
                onChange={(e) => setTwojaOcena(Number(e.target.value))}
                className="narz-suwak"
              />
            </div>

            <div>
              <div className="sp2-suwak-gora">
                <label htmlFor="suwak-opinie-de" className="narz-etykieta" style={{ margin: 0 }}>Eigene Bewertungen</label>
                <span className="sp2-suwak-liczba">{fmtDe(twojeOpinie, 'de')}</span>
              </div>
              <input
                id="suwak-opinie-de"
                type="range"
                min={1}
                max={500}
                step={1}
                value={twojeOpinie}
                onChange={(e) => setTwojeOpinie(Number(e.target.value))}
                className="narz-suwak"
              />
            </div>

            <div>
              <div className="sp2-suwak-gora">
                <label htmlFor="suwak-cel-de" className="narz-etykieta" style={{ margin: 0 }}>Ziel-Durchschnitt</label>
                <span className="sp2-suwak-liczba">{fmtDe(celOcena, 'de', 1)} ★</span>
              </div>
              <input
                id="suwak-cel-de"
                type="range"
                min={4.0}
                max={4.9}
                step={0.1}
                value={celOcena}
                onChange={(e) => setCelOcena(Number(e.target.value))}
                className="narz-suwak"
              />
            </div>

            <div>
              <div className="sp2-suwak-gora">
                <label htmlFor="suwak-konk-de" className="narz-etykieta" style={{ margin: 0 }}>Top-Wettbewerber</label>
                <span className="sp2-suwak-liczba">{fmtDe(konkurentOpinie, 'de')} ({fmtDe(konkurentOcena, 'de', 1)} ★)</span>
              </div>
              <input
                id="suwak-konk-de"
                type="range"
                min={5}
                max={800}
                step={5}
                value={konkurentOpinie}
                onChange={(e) => setKonkurentOpinie(Number(e.target.value))}
                className="narz-suwak"
              />
            </div>
          </div>

          <div className="sp2-siatka-kafle">
            <div className="sp2-kafel">
              <p className="sp2-kafel-etykieta">5★-Bewertungen für {fmtDe(celOcena, 'de', 1)}★</p>
              <p className="sp2-kafel-wartosc" style={{ color: 'var(--color-primary)' }}>
                {kalkulatorZywy.doCelu === 0 ? 'Ziel erreicht!' : `+${fmtDe(kalkulatorZywy.doCelu, 'de')} Bewertungen`}
              </p>
            </div>

            <div className="sp2-kafel">
              <p className="sp2-kafel-etykieta">Zum Überholen von Platz 1</p>
              <p className="sp2-kafel-wartosc">
                {kalkulatorZywy.doWyprzedzeniaLidera === 0 ? 'Sie führen!' : `+${fmtDe(kalkulatorZywy.doWyprzedzeniaLidera, 'de')} Bewertungen`}
              </p>
            </div>

            <div className="sp2-kafel">
              <p className="sp2-kafel-etykieta">Dauer bei 3 Bewertungen / Woche</p>
              <p className="sp2-kafel-wartosc">
                {kalkulatorZywy.doCelu === 0 ? '0' : `ca. ${Math.ceil(kalkulatorZywy.doCelu / 3)} Wochen`}
              </p>
            </div>
          </div>
        </div>

        <div className="sp2-sekcja-wyniku">
          <h2 className="narz-h2">Unbegrenzt gültiger Vektor-QR-Code für Google-Bewertungen</h2>
          <p className="narz-mikro">
            Fügen Sie Ihren direkten Google-Bewertungslink ein (Google Unternehmensprofil -&gt; „Um Rezensionen bitten“). Unser ISO/IEC-18004-Encoder schreibt Ihre Ziel-URL ohne Tracking-Umleitung direkt in den QR-Code - dauerhaft kostenfrei und ohne Ablaufdatum.
          </p>

          <div style={{ marginTop: '0.65rem' }}>
            <label htmlFor="qr-live-url-de" className="narz-etykieta">
              Direkter Google-Bewertungslink im QR-Code
            </label>
            <input
              id="qr-live-url-de"
              maxLength={190}
              value={linkWizytowki}
              onChange={(e) => setLinkWizytowki(e.target.value)}
              placeholder="https://g.page/r/..."
              className="narz-pole"
              inputMode="url"
            />
          </div>

          {kodQr.ok ? (
            <div className="sp2-qr-uklad">
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  <span className="sp2-pigulka sp2-pigulka--ok">
                    ISO/IEC 18004 · QR v{kodQr.wersja} ({kodQr.rozmiar}x{kodQr.rozmiar})
                  </span>
                  <span className="sp2-pigulka sp2-pigulka--neutral">
                    0 Weiterleitungen · Läuft nie ab
                  </span>
                </div>
                <p className="narz-mikro" style={{ margin: 0 }}>
                  Direkt per Smartphone-Kamera testbar: Laden Sie das Vektor-SVG für Druckereien (Aufsteller, Aufkleber, Visitenkarten) oder das scharfe 1024px-PNG für Rechnungen herunter.
                </p>
                <div className="sp2-akcje-kodu" style={{ marginTop: '0.2rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => {
                      const svgXml = zbudujPlikSvgQr(kodQr.tekst);
                      if (svgXml) {
                        pobierzPlikTekstowy(svgXml, 'google-bewertung-qr.svg', 'image/svg+xml;charset=utf-8');
                        track('narzedzie_pobierz_qr_svg', { lang: 'de' });
                      }
                    }}
                  >
                    Druck-SVG herunterladen
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => {
                      pobierzPngQr1024(kodQr.tekst, 'google-bewertung-qr-1024px.png');
                      track('narzedzie_pobierz_qr_png', { lang: 'de' });
                    }}
                  >
                    PNG 1024px herunterladen
                  </button>
                </div>
              </div>

              <div className="sp2-qr-podglad">
                <svg
                  viewBox={`0 0 ${kodQr.viewBoxRozmiar} ${kodQr.viewBoxRozmiar}`}
                  shapeRendering="crispEdges"
                  role="img"
                  aria-label="Scanbarer QR-Code für Google-Bewertungen"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                >
                  <rect width={kodQr.viewBoxRozmiar} height={kodQr.viewBoxRozmiar} fill="#ffffff" />
                  <path d={kodQr.d} fill="#101935" />
                </svg>
              </div>
            </div>
          ) : (
            <p className="narz-blad" style={{ marginTop: '0.65rem' }}>
              Bitte verwenden Sie einen Link mit maximal 190 Zeichen (z. B. den Kurzlink g.page/r/... aus Ihrem Google Unternehmensprofil).
            </p>
          )}
        </div>

        <div className="sp2-bofu">
          <h2>Top-3-Platzierung in Google Maps (49-Punkte-Raster) &amp; lokale ChatGPT-Empfehlungen</h2>
          <p>
            In unseren Messungen führten 59 von 62 lokalen Quellenlinks in ChatGPT direkt zu Google Maps. Wir optimieren Ihr Google Unternehmensprofil, harmonisieren alle NAP-Signale und messen Ihre Sichtbarkeit monatlich über 49 GPS-Messpunkte (Pakete ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.).
          </p>
          <div className="sp2-bofu-akcje">
            <a
              href="#kontakt"
              className="btn btn-primary"
              onClick={() => wybierzPakietKontakt('Standard')}
              data-cta="lokalne_nap_de_bofu"
            >
              Google Unternehmensprofil optimieren lassen
            </a>
            {maGbpDe && (
              <Link href="/pozycjonowanie-wizytowki-google" className="sp2-bofu-link">
                So funktioniert die 49-Punkte-Maps-Messung
              </Link>
            )}
          </div>
        </div>

        <LinkWyniku
          narzedzie="lokalne_nap"
          tryb={stan.id ? 'wynik' : 'wypelnij'}
          parametry={{
            url: domena || adres.trim() || null,
            r: twojaOcena,
            n: twojeOpinie,
            cel: celOcena,
            wynik: stan.id || null,
          }}
          podsumowanie={`Local-SEO NAP & Bewertungsplan${domena ? ` für ${domena}` : ''}: +${kalkulatorZywy.doCelu} 5★-Bewertungen bis ${fmtDe(celOcena, 'de', 1)}`}
        />
      </div>
    </div>
  );
}

export default LokalneNapClientDe;
