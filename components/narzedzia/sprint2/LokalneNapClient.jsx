'use client';

// Skaner Spojnosci Lokalnej NAP, Wizytowki Google i Generator QR Opinii (PL + EN).
// Endpoint: POST ${PANEL_API}/lokalne-nap z { url, twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie, linkWizytowki, lang }.
// Zywy kalkulator opinii 5* oraz wektorowy generator kodow QR ISO/IEC 18004 dzialaja natychmiast w przegladarce.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from '@/components/narzedzia/LinkWyniku';
import { Ocena, PasekDemo, Postep } from '@/components/narzedzia/Wspolne';
import Zwin from '@/components/narzedzia/Zwin';
import { sciezkaSvgQr, zakodujQr, zbudujPlikSvgQr } from './qrSvg';
import { CSS_SPRINT2, odmianaPl, pobierzPlikTekstowy, wyczyscDomene } from './wspolneSprint2';

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
  const nowaSredniaPoCelu = n + doCelu > 0 ? ((r * n + 5 * doCelu) / (n + doCelu)) : cel;

  return { doCelu, doSredniejLidera, doLiczbyLidera, doWyprzedzeniaLidera, nowaSredniaPoCelu };
}

function pobierzPngQr1024(tekst, nazwaPliku = 'qr-opinie-google-1024px.png') {
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

function odczytajWierszeNap(w, en) {
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
    { klucz: 'nazwa', alt: 'name', etykieta: en ? 'Business Name' : 'Nazwa firmy' },
    { klucz: 'telefon', alt: 'telephone', etykieta: en ? 'Phone Number' : 'Numer telefonu' },
    { klucz: 'adres', alt: 'address', etykieta: en ? 'Street Address & Postal Code' : 'Adres i kod pocztowy' },
    { klucz: 'nip', alt: 'taxID', etykieta: en ? 'Tax ID / VAT Number' : 'NIP / VAT-ID' },
    { klucz: 'godziny', alt: 'openingHours', etykieta: en ? 'Opening Hours' : 'Godziny otwarcia' },
    { klucz: 'geo', alt: 'coordinates', etykieta: en ? 'Geo Coordinates (Lat/Lng)' : 'Współrzędne Geo' },
  ];

  return definicje.map((d) => {
    const vHtml = html[d.klucz] ?? html[d.alt] ?? null;
    const vSchema = schema[d.klucz] ?? schema[d.alt] ?? null;
    const rawSp = sp && typeof sp === 'object' ? (sp[d.klucz] ?? sp[d.alt]) : undefined;
    let status = 'brak';
    if (rawSp === true || /ok|zgod|match/i.test(String(rawSp || ''))) status = 'ok';
    else if (rawSp === false || /rozjazd|konflikt|mismatch|blad/i.test(String(rawSp || ''))) status = 'blad';
    else if (vHtml && vSchema) status = String(vHtml).trim() === String(vSchema).trim() ? 'ok' : 'uwaga';
    else if (vHtml || vSchema) status = 'uwaga';

    return {
      klucz: d.klucz,
      etykieta: d.etykieta,
      html: vHtml || (en ? 'Not found in HTML' : 'Brak w tekście HTML'),
      schema: vSchema || (en ? 'Missing in JSON-LD' : 'Brak w LocalBusiness'),
      status,
    };
  });
}

function demoLokalneNap(surowyUrl, parametryOpinii, en) {
  const domena = wyczyscDomene(surowyUrl || 'twojafirma.pl', en ? 'yourcompany.com' : 'twojafirma.pl');
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
        nip: '5253090237',
        godziny: 'Pn-Pt 09:00-17:00',
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
        en
          ? '100% NAP alignment between visible HTML and LocalBusiness JSON-LD across phone, address, NIP and geo coordinates.'
          : 'Pełna zgodność danych NAP między widoczną stopką HTML a obiektem LocalBusiness JSON-LD (telefon, adres, NIP i współrzędne Geo).',
      ],
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 56,
    napHtml: {
      nazwa: en ? `${domena.split('.')[0].toUpperCase()} Services` : `Centrum Usług ${domena.split('.')[0].toUpperCase()}`,
      telefon: '+48 600 123 456',
      adres: en ? '142 Market St, Suite 4' : 'ul. Marszałkowska 84/92, Warszawa',
      nip: '521-000-11-22',
      godziny: en ? 'Mon-Fri 8am-6pm' : 'Pn-Pt 8:00-18:00',
      geo: null,
    },
    napSchema: {
      nazwa: domena,
      telefon: '+48 22 999 88 77',
      adres: en ? 'Missing postalCode' : 'Warszawa (brak ulicy i kodu)',
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
      en
        ? 'Phone number conflict: HTML shows +48 600 123 456 while LocalBusiness JSON-LD declares an older landline (+48 22 999 88 77). Unify with your Google Business Profile.'
        : 'Sprzeczny numer telefonu: w treści strony widnieje +48 600 123 456, a w kodzie LocalBusiness JSON-LD stary numer stacjonarny (+48 22 999 88 77). Ujednolić 1:1 z Wizytówką Google.',
      en
        ? 'Complete PostalAddress (streetAddress, postalCode, addressLocality), GeoCoordinates and OpeningHoursSpecification in JSON-LD.'
        : 'Uzupełnij w LocalBusiness pełny obiekt PostalAddress (ulica + kod pocztowy), GeoCoordinates oraz OpeningHoursSpecification.',
      en
        ? 'Print the permanent vector QR code below for reception desks, invoices or delivery parcels to collect steady 5-star reviews.'
        : 'Wydrukuj poniższy bezterminowy kod QR na recepcję, fakturę lub wizytówkę, aby systematycznie zbierać opinie 5-gwiazdkowe od klientów.',
    ],
  };
}

export function LokalneNapClient() {
  const en = useLocale() === 'en';
  const jezyk = en ? 'en-US' : 'pl-PL';
  const [adres, setAdres] = useState('');
  const [linkWizytowki, setLinkWizytowki] = useState(DOMYSLNY_LINK_QR);
  const [twojaOcena, setTwojaOcena] = useState(4.3);
  const [twojeOpinie, setTwojeOpinie] = useState(24);
  const [celOcena, setCelOcena] = useState(4.8);
  const [konkurentOcena, setKonkurentOcena] = useState(4.9);
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
    const u = adres.trim() || (en ? 'yourclinic.com' : 'twojafirma.pl');
    if (!adres.trim()) setAdres(u);
    const d = demoLokalneNap(u, { twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie }, en);
    track('narzedzie_demo', { narzedzie: 'lokalne_nap' });
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
    track('narzedzie_start', { narzedzie: 'lokalne_nap' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoLokalneNap(wejscie, { twojaOcena, twojeOpinie, celOcena, konkurentOcena, konkurentOpinie }, en);
      track('narzedzie_wynik', { narzedzie: 'lokalne_nap', wynik: d.ocena });
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
          lang: en ? 'en' : 'pl',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not scan NAP data for this URL. Verify the address and try again.' : 'Nie udało się przeskanować danych NAP dla tej strony. Sprawdź adres i spróbuj ponownie.'),
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'lokalne_nap', wynik: w.ocena ?? w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'Scan timed out after 45 s.' : 'Przekroczono limit 45 s odpowiedzi serwera.')
          : (en ? 'Could not reach the diagnostic server.' : 'Brak połączenia z serwerem diagnostycznym.'),
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
    track('narzedzie_bofu_klik', { narzedzie: 'lokalne_nap', plan });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const wierszeNap = w ? odczytajWierszeNap(w, en) : [];
  const rekomendacje = Array.isArray(w?.rekomendacje) ? w.rekomendacje : [];
  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      {/* 1. Formularz skanera NAP */}
      <form className="narz-formularz" onSubmit={uruchomSkan}>
        <div className="sp2-siatka-pola">
          <div>
            <label htmlFor="nap-url" className="narz-etykieta">
              {en ? 'Business website URL (for NAP vs Schema check)' : 'Adres strony firmowej (do testu spójności NAP)'}
            </label>
            <input
              ref={poleRef}
              id="nap-url"
              name="url"
              required
              maxLength={300}
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
              placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'nap-blad' : undefined}
            />
          </div>

          <div>
            <label htmlFor="nap-qr-input" className="narz-etykieta">
              {en ? 'Google Review link for QR code (optional)' : 'Link do opinii Wizytówki Google pod kod QR (opcjonalnie)'}
            </label>
            <input
              id="nap-qr-input"
              name="linkWizytowki"
              maxLength={190}
              value={linkWizytowki}
              onChange={(e) => setLinkWizytowki(e.target.value)}
              placeholder="np. g.page/r/.../review"
              className="narz-pole"
              inputMode="url"
            />
          </div>
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_lokalne_nap_start">
            {stan.status === 'loading'
              ? (en ? 'Scanning HTML vs LocalBusiness...' : 'Porównuję HTML z LocalBusiness...')
              : (en ? 'Scan Local NAP & Schema' : 'Sprawdź spójność NAP na stronie')}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            {en ? 'See instant DEMO' : 'Zobacz wynik DEMO'}
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
            kroki={en
              ? [
                  'Fetching homepage and Contact page to extract phone, address and tax IDs',
                  'Parsing LocalBusiness / Organization JSON-LD schema properties',
                  'Comparing visible HTML text character-by-character against JSON-LD',
                ]
              : [
                  'Pobieramy stronę główną oraz Kontakt i wyciągamy telefon, adres i NIP',
                  'Odczytujemy obiekt LocalBusiness / Organization z danych JSON-LD',
                  'Porównujemy widoczny tekst HTML znak po znaku ze strukturą Schema',
                ]}
            co={1150}
          />
        )}

        {stan.status === 'error' && (
          <p id="nap-blad" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      {/* Wynik skanu NAP (po uruchomieniu lub DEMO) */}
      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                {en
                  ? 'Sample DEMO NAP report loaded. Enter your own website URL above and click "Scan Local NAP & Schema" for a live check.'
                  : 'Wyświetlasz przykładowy raport DEMO spójności NAP. Wpisz wyżej własną domenę i kliknij główny przycisk, aby przeskanować swoją stronę na żywo.'}
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Local NAP" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? (en
                      ? 'Consistent local entity signals: your visible contact details match your LocalBusiness JSON-LD, strengthening Google Maps & ChatGPT local recommendations.'
                      : 'Spójne sygnały lokalne: widoczne dane teleadresowe zgadzają się z kodem LocalBusiness JSON-LD, wzmacniając pozycję w Mapach Google i poleceniach ChatGPT.')
                    : (en
                      ? 'NAP inconsistencies detected: differences between your page text and LocalBusiness schema weaken local pack trust.'
                      : 'Wykryto rozbieżności NAP: różnice między tekstem na stronie a kodem LocalBusiness JSON-LD osłabiają wiarygodność wizytówki w Mapach Google.')}
                </p>
              </div>
            </div>

            {/* Tabela porownawcza HTML vs JSON-LD LocalBusiness */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Visible HTML vs JSON-LD LocalBusiness Comparison' : 'Tabela porównawcza: tekst HTML kontra JSON-LD LocalBusiness'}
              </h2>
              <div className="narz-tabela-wrap" style={{ marginTop: '0.65rem' }}>
                <table className="narz-tabela">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: 'left' }}>{en ? 'NAP Attribute' : 'Pole danych lokalnych'}</th>
                      <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Visible Page HTML' : 'Widoczny tekst HTML'}</th>
                      <th scope="col" style={{ textAlign: 'left' }}>{en ? 'JSON-LD LocalBusiness' : 'Kod JSON-LD Schema'}</th>
                      <th scope="col">{en ? 'Match' : 'Spójność'}</th>
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
                        ? (en ? 'Consistent' : 'Spójne')
                        : wiersz.status === 'blad'
                        ? (en ? 'Mismatch!' : 'Rozbieżność!')
                        : (en ? 'Incomplete' : 'Do uzupełnienia');
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
                <h2 className="narz-h2">
                  {en
                    ? `Local SEO Action Plan (${rekomendacje.length})`
                    : `Rekomendacje dla Wizytówki i strony (${rekomendacje.length} ${odmianaPl(rekomendacje.length, 'krok', 'kroki', 'kroków')})`}
                </h2>
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

      {/* 2. ZYWY Kalkulator brakujacych opinii 5* + Wektorowy Generator QR (widoczny od razu i interaktywny!) */}
      <div className="narz-wynik" style={{ marginTop: '1.25rem' }}>
        <div>
          <h2 className="narz-h2" style={{ fontWeight: 500, marginTop: 0 }}>
            {en ? 'Live 5-Star Google Review Gap Calculator' : 'Żywy kalkulator brakujących opinii 5★ do dogonienia lidera Map'}
          </h2>
          <p className="narz-mikro">
            {en
              ? 'Move the sliders to calculate immediately how many consecutive 5-star reviews you need to hit your target rating and overtake your top Google Maps competitor.'
              : 'Przesuń suwaki, aby natychmiast policzyć, ilu kolejnych opinii 5-gwiazdkowych potrzebujesz do osiągnięcia wybranej średniej oraz wyprzedzenia konkurenta z TOP 1 Map Google.'}
          </p>

          <div className="sp2-suwaki-siatka">
            <div>
              <div className="sp2-suwak-gora">
                <label htmlFor="suwak-ocena" className="narz-etykieta" style={{ margin: 0 }}>
                  {en ? 'Your current rating' : 'Twoja obecna średnia'}
                </label>
                <span className="sp2-suwak-liczba">{twojaOcena.toLocaleString(jezyk, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ★</span>
              </div>
              <input
                id="suwak-ocena"
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
                <label htmlFor="suwak-opinie" className="narz-etykieta" style={{ margin: 0 }}>
                  {en ? 'Your review count' : 'Twoja liczba opinii'}
                </label>
                <span className="sp2-suwak-liczba">{twojeOpinie.toLocaleString(jezyk)}</span>
              </div>
              <input
                id="suwak-opinie"
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
                <label htmlFor="suwak-cel" className="narz-etykieta" style={{ margin: 0 }}>
                  {en ? 'Target star average' : 'Docelowa średnia ocen'}
                </label>
                <span className="sp2-suwak-liczba">{celOcena.toLocaleString(jezyk, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ★</span>
              </div>
              <input
                id="suwak-cel"
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
                <label htmlFor="suwak-konk-n" className="narz-etykieta" style={{ margin: 0 }}>
                  {en ? 'Top competitor reviews' : 'Liczba opinii lidera Map'}
                </label>
                <span className="sp2-suwak-liczba">
                  {konkurentOpinie.toLocaleString(jezyk)} ({konkurentOcena.toLocaleString(jezyk, { minimumFractionDigits: 1 })} ★)
                </span>
              </div>
              <input
                id="suwak-konk-n"
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
              <p className="sp2-kafel-etykieta">
                {en ? `5★ reviews needed for ${celOcena.toFixed(1)}★` : `Potrzebne opinie 5★ do średniej ${celOcena.toLocaleString('pl-PL', { minimumFractionDigits: 1 })}★`}
              </p>
              <p className="sp2-kafel-wartosc" style={{ color: 'var(--color-primary)' }}>
                {kalkulatorZywy.doCelu === 0
                  ? (en ? 'Goal reached!' : 'Cel osiągnięty!')
                  : en
                  ? `+${kalkulatorZywy.doCelu.toLocaleString('en-US')} reviews`
                  : `+${kalkulatorZywy.doCelu.toLocaleString('pl-PL')} ${odmianaPl(kalkulatorZywy.doCelu, 'opinia 5★', 'opinie 5★', 'opinii 5★')}`}
              </p>
            </div>

            <div className="sp2-kafel">
              <p className="sp2-kafel-etykieta">
                {en ? 'Reviews to overtake Map Pack leader' : 'Do wyprzedzenia lidera Map Google'}
              </p>
              <p className="sp2-kafel-wartosc">
                {kalkulatorZywy.doWyprzedzeniaLidera === 0
                  ? (en ? 'You lead!' : 'Prowadzisz!')
                  : en
                  ? `+${kalkulatorZywy.doWyprzedzeniaLidera.toLocaleString('en-US')} reviews`
                  : `+${kalkulatorZywy.doWyprzedzeniaLidera.toLocaleString('pl-PL')} ${odmianaPl(kalkulatorZywy.doWyprzedzeniaLidera, 'opinia', 'opinie', 'opinii')}`}
              </p>
            </div>

            <div className="sp2-kafel">
              <p className="sp2-kafel-etykieta">
                {en ? 'Weeks at 3 new reviews / week' : 'Czas przy 3 nowych opiniach tyg.'}
              </p>
              <p className="sp2-kafel-wartosc">
                {kalkulatorZywy.doCelu === 0
                  ? '0'
                  : en
                  ? `~${Math.ceil(kalkulatorZywy.doCelu / 3)} weeks`
                  : `ok. ${Math.ceil(kalkulatorZywy.doCelu / 3)} tyg.`}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Wektorowy Generator Kodu QR Opinii Google */}
        <div className="sp2-sekcja-wyniku">
          <h2 className="narz-h2">
            {en ? 'Non-Expiring Vector Google Review QR Generator' : 'Wektorowy generator kodu QR do zbierania opinii Google'}
          </h2>
          <p className="narz-mikro">
            {en
              ? 'Paste your direct Google review link (from Google Business Profile -> "Ask for reviews"). Unlike free QR sites that insert expiring tracking redirects, this ISO/IEC 18004 code encodes your exact URL directly and works forever.'
              : 'Wklej bezpośredni link do wystawienia opinii (z Wizytówki Google -> „Poproś o opinie”). W przeciwieństwie do płatnych generatorów nasz kod QR koduje bezpośrednio Twój adres URL bez pośredników i nigdy nie wygasa.'}
          </p>

          <div style={{ marginTop: '0.65rem' }}>
            <label htmlFor="qr-live-url" className="narz-etykieta">
              {en ? 'Direct Google Review URL encoded in QR' : 'Bezpośredni link do opinii Google zakodowany w QR'}
            </label>
            <input
              id="qr-live-url"
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
                    {en ? '0 redirects · Never expires' : '0 przekierowań · Bezterminowy'}
                  </span>
                </div>
                <p className="narz-mikro" style={{ margin: 0 }}>
                  {en
                    ? 'Test it right now with your smartphone camera! Download vector SVG for print shops (stands, stickers, business cards) or high-res 1024px PNG for invoices and emails.'
                    : 'Zeskanuj podgląd aparatem telefonu! Pobierz wektorowy plik SVG dla drukarni (stojaki na recepcję, naklejki, wizytówki) lub ostry plik PNG 1024px na faktury i do stopki e-mail.'}
                </p>
                <div className="sp2-akcje-kodu" style={{ marginTop: '0.2rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => {
                      const svgXml = zbudujPlikSvgQr(kodQr.tekst);
                      if (svgXml) {
                        pobierzPlikTekstowy(svgXml, 'qr-opinie-google.svg', 'image/svg+xml;charset=utf-8');
                        track('narzedzie_pobierz_qr_svg');
                      }
                    }}
                  >
                    {en ? 'Download Print SVG' : 'Pobierz SVG do druku'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => {
                      pobierzPngQr1024(kodQr.tekst, 'qr-opinie-google-1024px.png');
                      track('narzedzie_pobierz_qr_png');
                    }}
                  >
                    {en ? 'Download PNG 1024px' : 'Pobierz PNG 1024px'}
                  </button>
                </div>
              </div>

              <div className="sp2-qr-podglad">
                <svg
                  viewBox={`0 0 ${kodQr.viewBoxRozmiar} ${kodQr.viewBoxRozmiar}`}
                  shapeRendering="crispEdges"
                  role="img"
                  aria-label={en ? 'Scannable Google Review QR Code' : 'Skanowalny kod QR do opinii Google'}
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                >
                  <rect width={kodQr.viewBoxRozmiar} height={kodQr.viewBoxRozmiar} fill="#ffffff" />
                  <path d={kodQr.d} fill="#101935" />
                </svg>
              </div>
            </div>
          ) : (
            <p className="narz-blad" style={{ marginTop: '0.65rem' }}>
              {en
                ? 'Keep the review URL under 190 characters (use the short g.page/r/... share link from Google Business Profile).'
                : 'Skróć link poniżej 190 znaków (użyj krótkiego linku g.page/r/... z panelu Profilu Firmy w Google).'}
            </p>
          )}
        </div>

        {/* 4. BOFU: Pozycjonowanie wizytowki Google (49 punktow siatki) */}
        <div className="sp2-bofu">
          <h2>
            {en
              ? 'Rank in Google Maps Top 3 across a 49-point city geo-grid (and get recommended by ChatGPT)'
              : 'Wejdź do TOP 3 Map Google na siatce 49 punktów w całym mieście (i do poleceń ChatGPT)'}
          </h2>
          <p>
            {en
              ? `In our tests, 59 out of 62 local business links cited by ChatGPT pointed straight to Google Maps profiles. We optimize categories, services, NAP citations and track your exact position across 49 GPS coordinates every month (plans from €${CENY.seoStandard.eur} net/mo).`
              : `W naszym pomiarze 59 z 62 linków w lokalnych poleceniach ChatGPT prowadziło bezpośrednio do Map Google. Optymalizujemy kategorie, katalog usług, spójność NAP i co miesiąc mierzymy widoczność wizytówki z 49 punktów GPS w mieście (pakiety od ${CENY.seoStandard.pln.toLocaleString('pl-PL')} zł netto/mies.).`}
          </p>
          <div className="sp2-bofu-akcje">
            <a
              href={kotwicaKontakt}
              className="btn btn-primary"
              onClick={() => wybierzPakietKontakt('Standard')}
              data-cta="lokalne_nap_bofu_gbp"
            >
              {en ? 'Grow Google Business Profile Visibility' : 'Zamów pozycjonowanie Wizytówki Google'}
            </a>
            <Link href="/pozycjonowanie-wizytowki-google" className="sp2-bofu-link">
              {en ? 'See how 49-point Google Maps tracking works' : 'Zobacz jak działa pomiar z 49 punktów w Mapach'}
            </Link>
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
          podsumowanie={en
            ? `Local SEO NAP & Review Plan${domena ? ` for ${domena}` : ''}: +${kalkulatorZywy.doCelu} 5-star reviews to reach ${celOcena.toFixed(1)}`
            : `Audyt lokalnego SEO i plan opinii${domena ? ` dla ${domena}` : ''}: +${kalkulatorZywy.doCelu} ${odmianaPl(kalkulatorZywy.doCelu, 'opinia 5★', 'opinie 5★', 'opinii 5★')} do średniej ${celOcena.toLocaleString('pl-PL', { minimumFractionDigits: 1 })}`}
        />
      </div>
    </div>
  );
}

export default LokalneNapClient;
