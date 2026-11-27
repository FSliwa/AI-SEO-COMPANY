'use client';

// Automatyczny skan domeny nad Checklistą SEO (C12):
// wysyła POST ${PANEL_API}/audyt-seo z { url, lang, zakres: 'strona' }, mapuje wykryte reguły
// na 11 technicznych wymogów checklisty i pozwala wyeksportować raport kontrolny (.csv z BOM UTF-8).

import { useRef, useState } from 'react';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track } from '@/lib/track';

const CSS_SCAN = `
.cas-karta { margin: 0 0 2rem; padding: clamp(1.15rem, 3vw, 1.65rem); border-radius: 22px; background: var(--w-karta, #ffffff); border: 1.5px solid rgba(243, 183, 156, 0.65); box-shadow: 0 18px 44px rgba(10, 19, 55, 0.07); display: grid; gap: 1rem; }
.cas-wiersz { display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: stretch; }
.cas-pole { flex: 1 1 240px; min-height: 48px; padding: 0.65rem 0.95rem; border-radius: 12px; border: 1px solid rgba(15, 23, 42, 0.16); background: var(--w-papier, #f6f4ef); color: var(--w-tusz); font: inherit; font-size: 0.96rem; }
.cas-pole:focus-visible { outline: 2px solid var(--w-pomarancz, #d85a30); outline-offset: 2px; background: #ffffff; }
.cas-podsumowanie { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; border-radius: 14px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); font-variant-numeric: tabular-nums; }
.cas-siatka { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 245px), 1fr)); gap: 0.6rem; }
.cas-punkt { padding: 0.75rem 0.9rem; border-radius: 14px; border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); background: #ffffff; display: grid; gap: 0.25rem; align-content: start; }
.cas-punkt--ok { border-color: rgba(4, 120, 87, 0.25); background: rgba(4, 120, 87, 0.04); }
.cas-punkt--blad { border-color: rgba(180, 83, 9, 0.32); background: rgba(180, 83, 9, 0.05); }
.cas-punkt-gora { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 600; color: var(--w-tusz); }
.cas-stan { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.16rem 0.55rem; border-radius: 999px; font-size: 0.76rem; font-weight: 700; white-space: nowrap; font-variant-numeric: tabular-nums; }
.cas-stan--ok { background: rgba(4, 120, 87, 0.14); color: #047857; }
.cas-stan--blad { background: rgba(179, 38, 30, 0.13); color: #b3261e; }
.cas-stan--brak { background: rgba(30, 30, 30, 0.08); color: var(--w-tusz-2); }
`;

function odmienWymagaPoprawyPl(n) {
  if (n === 0) return '0 punktów do poprawy';
  if (n === 1) return '1 punkt wymaga poprawy';
  const d = n % 10;
  const s = n % 100;
  return d >= 2 && d <= 4 && (s < 12 || s > 14) ? `${n} punkty wymagają poprawy` : `${n} punktów wymaga poprawy`;
}

const WYMOGI = [
  {
    kod: 'A1',
    reguly: ['brak_https', 'http_bez_przekierowania', 'mieszana_tresc'],
    pl: { nazwa: 'HTTPS i przekierowanie SSL', wskazowka: 'Włącz SSL i przekieruj http:// na https:// kodem 301.' },
    en: { nazwa: 'HTTPS & SSL redirect', wskazowka: 'Enable HTTPS and redirect http:// to https:// with 301.' },
    de: { nazwa: 'HTTPS & SSL-Weiterleitung', wskazowka: 'HTTPS aktivieren und http:// per 301 auf https:// umleiten.' },
  },
  {
    kod: 'A4',
    reguly: ['noindex_glowna', 'noindex'],
    pl: { nazwa: 'Brak blokady noindex', wskazowka: 'Usuń meta robots noindex ze strony głównej i stron usług.' },
    en: { nazwa: 'No unintended noindex', wskazowka: 'Remove noindex from the homepage and key landing pages.' },
    de: { nazwa: 'Kein versehentliches noindex', wskazowka: 'Entfernen Sie noindex auf Startseite und Leistungsseiten.' },
  },
  {
    kod: 'A3/D1',
    reguly: ['brak_robots', 'robots_blokuje_wszystko', 'boty_ai_zablokowane'],
    pl: { nazwa: 'robots.txt i dostęp botów AI', wskazowka: 'Udostępnij /robots.txt i odblokuj Googlebota oraz OAI-SearchBot.' },
    en: { nazwa: 'robots.txt & AI search bots', wskazowka: 'Serve /robots.txt and allow Googlebot and OAI-SearchBot.' },
    de: { nazwa: 'robots.txt & KI-Suchbots', wskazowka: '/robots.txt bereitstellen und Googlebot sowie OAI-SearchBot zulassen.' },
  },
  {
    kod: 'A6',
    reguly: ['brak_canonical'],
    pl: { nazwa: 'Tag kanoniczny (canonical)', wskazowka: 'Dodaj w <head> samoodwołujący się <link rel="canonical">.' },
    en: { nazwa: 'Canonical tag', wskazowka: 'Add a self-referencing <link rel="canonical"> in <head>.' },
    de: { nazwa: 'Canonical-Tag', wskazowka: 'Selbstreferenzierendes <link rel="canonical"> im <head> ergänzen.' },
  },
  {
    kod: 'B4',
    reguly: ['brak_h1', 'wiele_h1'],
    pl: { nazwa: 'Pojedynczy nagłówek H1', wskazowka: 'Zostaw dokładnie jeden nagłówek <h1> z główną frazą strony.' },
    en: { nazwa: 'Single H1 heading', wskazowka: 'Keep exactly one <h1> heading with the primary topic.' },
    de: { nazwa: 'Eindeutige H1-Überschrift', wskazowka: 'Genau eine <h1>-Überschrift mit dem Hauptthema setzen.' },
  },
  {
    kod: 'B3',
    reguly: ['brak_opisu', 'opis_dlugi', 'opis_duplikat'],
    pl: { nazwa: 'Opis meta (meta description)', wskazowka: 'Ustaw unikalny meta description o długości 120-155 znaków.' },
    en: { nazwa: 'Meta description', wskazowka: 'Write a unique meta description between 120 and 155 chars.' },
    de: { nazwa: 'Meta-Description', wskazowka: 'Einzigartige Meta-Description mit 120 bis 155 Zeichen anlegen.' },
  },
  {
    kod: 'B12',
    reguly: ['obrazy_bez_alt'],
    pl: { nazwa: 'Atrybuty alt obrazów', wskazowka: 'Uzupełnij opisowe atrybuty alt (lub alt="" dla dekoracji).' },
    en: { nazwa: 'Image alt attributes', wskazowka: 'Add descriptive alt text to images (or alt="" for decorative ones).' },
    de: { nazwa: 'Alt-Texte bei Bildern', wskazowka: 'Beschreibende alt-Attribute ergänzen (oder alt="" bei Deko).' },
  },
  {
    kod: 'D5',
    reguly: ['brak_danych_organizacji', 'bledny_json_ld'],
    pl: { nazwa: 'JSON-LD Organization', wskazowka: 'Dodaj poprawny blok JSON-LD Organization lub LocalBusiness.' },
    en: { nazwa: 'Organization JSON-LD', wskazowka: 'Add valid Organization or LocalBusiness JSON-LD markup.' },
    de: { nazwa: 'JSON-LD Organization', wskazowka: 'Fehlerfreies Organization- oder LocalBusiness-JSON-LD einbinden.' },
  },
  {
    kod: 'A6-lang',
    reguly: ['brak_hreflang', 'hreflang_bledy', 'brak_hreflang_podstrony'],
    pl: { nazwa: 'Spójność hreflang', wskazowka: 'Powiąż wersje językowe wzajemnymi linkami hreflang i x-default.' },
    en: { nazwa: 'Reciprocal hreflang', wskazowka: 'Connect language versions with reciprocal hreflang and x-default.' },
    de: { nazwa: 'Hreflang-Verknüpfung', wskazowka: 'Sprachversionen gegenseitig per hreflang und x-default verknüpfen.' },
  },
  {
    kod: 'A9',
    reguly: ['lcp', 'cls', 'psi_slaba', 'psi_srednia'],
    czyCwv: true,
    pl: { nazwa: 'Core Web Vitals / LCP', wskazowka: 'Zoptymalizuj obraz hero (LCP <= 2,5 s) i wymiary obrazów (CLS <= 0,1).' },
    en: { nazwa: 'Core Web Vitals / LCP', wskazowka: 'Optimize the hero element (LCP <= 2.5 s) and image sizes (CLS <= 0.1).' },
    de: { nazwa: 'Core Web Vitals / LCP', wskazowka: 'Hero-Element (LCP <= 2,5 s) und Bildmaße (CLS <= 0,1) optimieren.' },
  },
  {
    kod: 'D8',
    reguly: ['brak_llms', 'llms_bez_linkow'],
    pl: { nazwa: 'Plik /llms.txt', wskazowka: 'Dodaj plik /llms.txt ze spisem najważniejszych podstron Markdown.' },
    en: { nazwa: '/llms.txt file', wskazowka: 'Publish /llms.txt with Markdown links to your key pages.' },
    de: { nazwa: 'Datei /llms.txt', wskazowka: 'Datei /llms.txt mit Markdown-Links im Stammverzeichnis ablegen.' },
  },
];

const TEKSTY = {
  pl: {
    tytul: 'Automatyczny skan domeny (sprawdź techniczne punkty w 5 sekund)',
    opis: 'Wpisz adres swojej strony, aby automatycznie zweryfikować 11 technicznych punktów tej checklisty i pobrać raport kontrolny do arkusza.',
    etykieta: 'Adres strony do szybkiego skanu',
    ph: 'np. twojafirma.pl',
    start: 'Skanuj domenę',
    trwa: 'Skanuję stronę…',
    ok: 'Spełnione',
    blad: 'Do poprawy',
    brakPomiaru: 'Brak pomiaru',
    ndJednojezyczna: 'Brak hreflang (1 język)',
    wynikNaglowek: (ok, razem, braki) => `Wynik szybkiego skanu: ${ok}/${razem} spełnionych (${odmienWymagaPoprawyPl(braki)})`,
    ocenaSeo: 'Ocena SEO',
    eksport: 'Eksportuj raport kontrolny (.csv)',
    csvNaglowek: ['Kod', 'Wymóg techniczny', 'Status', 'Wskazówka', 'Domena', 'Ocena SEO'],
    csvPrefiks: 'checklista-seo',
    bladSieci: 'Nie udało się przeskanować tej domeny. Sprawdź adres i spróbuj ponownie.',
  },
  en: {
    tytul: 'Automatic Domain Scan (check technical items in 5 seconds)',
    opis: 'Enter your website URL to automatically test 11 technical items from this checklist and export a CSV status sheet.',
    etykieta: 'Website URL to scan',
    ph: 'e.g. yourcompany.com',
    start: 'Run quick scan',
    trwa: 'Scanning…',
    ok: 'Passed',
    blad: 'Needs work',
    brakPomiaru: 'Not measured',
    ndJednojezyczna: 'N/A (1 language)',
    wynikNaglowek: (ok, razem, braki) => `Quick scan summary: ${ok}/${razem} passed (${braki} ${braki === 1 ? 'item needs' : 'items need'} attention)`,
    ocenaSeo: 'SEO score',
    eksport: 'Export checklist report (.csv)',
    csvNaglowek: ['Code', 'Technical check', 'Status', 'Action hint', 'Domain', 'SEO score'],
    csvPrefiks: 'seo-checklist',
    bladSieci: 'Could not scan this domain right now. Check the URL and try again.',
  },
  de: {
    tytul: 'Automatischer Domain-Scan (technische Punkte in 5 Sekunden prüfen)',
    opis: 'Geben Sie Ihre Domain ein, um 11 technische Prüfpunkte dieser Checkliste live zu testen und als CSV-Prüfbericht zu exportieren.',
    etykieta: 'Website-Adresse für den Schnelltest',
    ph: 'z. B. ihrefirma.de',
    start: 'Domain prüfen',
    trwa: 'Wird geprüft…',
    ok: 'Erfüllt',
    blad: 'Offen',
    brakPomiaru: 'Nicht gemessen',
    ndJednojezyczna: 'Entfällt (1 Sprache)',
    wynikNaglowek: (ok, razem, braki) => `Schnelltest-Ergebnis: ${ok}/${razem} erfüllt (${braki} ${braki === 1 ? 'Punkt offen' : 'Punkte offen'})`,
    ocenaSeo: 'SEO-Punktzahl',
    eksport: 'Prüfbericht exportieren (.csv)',
    csvNaglowek: ['Code', 'Prüfpunkt', 'Status', 'Hinweis', 'Domain', 'SEO-Punktzahl'],
    csvPrefiks: 'seo-checkliste',
    bladSieci: 'Die Domain konnte nicht geprüft werden. Bitte kontrollieren Sie die Adresse und versuchen Sie es erneut.',
  },
};

function csvKomorka(wartosc) {
  const s = String(wartosc ?? '').replace(/"/g, '""');
  return `"${s}"`;
}

function demoSkan(wejscie) {
  const czysta = String(wejscie || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || 'twojafirma.pl';
  const wzorcowa = czysta.includes('ai-seo-company');
  return {
    domena: czysta,
    wynik: wzorcowa ? 95 : 74,
    wydajnoscZmierzona: true,
    hreflangStan: wzorcowa ? 'zweryfikowany' : 'brak',
    wykryteId: wzorcowa ? [] : ['brak_opisu', 'obrazy_bez_alt', 'brak_llms', 'psi_srednia'],
  };
}

export default function ChecklistaAutoScan({ locale = 'pl' }) {
  const jezyk = locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'pl';
  const T = TEKSTY[jezyk];
  const walid = jezyk === 'de' ? WALID_DE : {};

  const [url, setUrl] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, raport: null });
  const poleRef = useRef(null);

  async function uruchomSkan(e) {
    e.preventDefault();
    const wejscie = url.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, raport: null });
    track('narzedzie_checklista_autoscan_start', { lang: jezyk });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 700));
      const d = demoSkan(wejscie);
      setStan({ status: 'done', blad: null, raport: zbudujRaport(d, jezyk, T) });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 55_000);
    try {
      const res = await fetch(`${PANEL_API}/audyt-seo`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: jezyk, zakres: 'strona' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({ status: 'error', blad: data.error || T.bladSieci, raport: null });
        return;
      }
      const p = data.podglad || data;
      const wykryteId = [
        ...(Array.isArray(p.problemy) ? p.problemy.map((x) => x.id) : []),
        ...(Array.isArray(p.zablokowane) ? p.zablokowane.map((x) => x.id) : []),
      ];
      const raport = zbudujRaport({
        domena: p.domenaWyswietlana || p.domena || wejscie,
        wynik: p.wynik,
        wydajnoscZmierzona: p.wydajnoscZmierzona !== false,
        hreflangStan: p.hreflangStan || 'brak',
        wykryteId,
      }, jezyk, T);
      track('narzedzie_checklista_autoscan_wynik', { lang: jezyk, spelnione: raport.spelnione });
      setStan({ status: 'done', blad: null, raport });
    } catch {
      setStan({ status: 'error', blad: T.bladSieci, raport: null });
    } finally {
      clearTimeout(zegar);
    }
  }

  function eksportujCsv() {
    const r = stan.raport;
    if (!r) return;
    const wiersze = [
      T.csvNaglowek.map(csvKomorka).join(','),
      ...r.pozycje.map((poz) => [
        poz.kod,
        poz.nazwa,
        poz.statusTekst,
        poz.status === 'blad' ? poz.wskazowka : '',
        r.domena,
        r.wynik ?? '',
      ].map(csvKomorka).join(',')),
    ];
    const zawartosc = `\uFEFF${wiersze.join('\r\n')}\r\n`;
    const blob = new Blob([zawartosc], { type: 'text/csv;charset=utf-8' });
    const adresBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const bezpiecznaDomena = String(r.domena || 'domena').replace(/[^a-z0-9.-]+/gi, '-');
    a.href = adresBlob;
    a.download = `${T.csvPrefiks}-${bezpiecznaDomena}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(adresBlob), 1000);
    track('narzedzie_checklista_autoscan_csv', { lang: jezyk });
  }

  const r = stan.raport;

  return (
    <div id="automatyczny-skan" role="region" aria-labelledby="cas-tytul" className="cas-karta">
      <style>{CSS_SCAN}</style>
      <div>
        <h2 id="cas-tytul" className="sz-h3" style={{ margin: 0 }}>{T.tytul}</h2>
        <p className="sz-przypis" style={{ margin: '0.25rem 0 0' }}>{T.opis}</p>
      </div>

      <form onSubmit={uruchomSkan} className="cas-wiersz">
        <label htmlFor="cas-url" className="sr-only">{T.etykieta}</label>
        <input
          ref={poleRef}
          id="cas-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          maxLength={300}
          {...walid}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={T.ph}
          className="cas-pole"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={stan.status === 'loading'}
          aria-busy={stan.status === 'loading' ? 'true' : undefined}
          data-cta="checklista_autoscan_submit"
        >
          {stan.status === 'loading' ? T.trwa : T.start}
        </button>
      </form>

      {stan.status === 'error' && (
        <p role="alert" className="narz-blad" style={{ margin: 0 }}>{stan.blad}</p>
      )}

      {r && (
        <div aria-live="polite" style={{ display: 'grid', gap: '0.9rem' }}>
          <div className="cas-podsumowanie">
            <div>
              <strong style={{ color: 'var(--color-text-dark)' }}>
                {T.wynikNaglowek(r.spelnione, r.zmierzone, r.braki)}
              </strong>
              <span style={{ display: 'block', fontSize: '0.84rem', color: 'var(--w-tusz-2)' }}>
                {r.domena}{Number.isFinite(r.wynik) ? ` · ${T.ocenaSeo}: ${r.wynik}/100` : ''}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
              onClick={eksportujCsv}
              data-cta="checklista_autoscan_csv"
            >
              {T.eksport}
            </button>
          </div>

          <ul className="cas-siatka">
            {r.pozycje.map((poz) => (
              <li
                key={poz.kod}
                className={`cas-punkt ${poz.status === 'ok' ? 'cas-punkt--ok' : poz.status === 'blad' ? 'cas-punkt--blad' : ''}`}
              >
                <div className="cas-punkt-gora">
                  <span>{poz.kod} · {poz.nazwa}</span>
                  <span className={`cas-stan cas-stan--${poz.status}`}>
                    {poz.status === 'ok' ? `✓ ${T.ok}` : poz.status === 'blad' ? `✕ ${T.blad}` : poz.statusTekst || T.brakPomiaru}
                  </span>
                </div>
                {poz.status === 'blad' && (
                  <p className="sz-przypis" style={{ margin: 0, fontSize: '0.82rem' }}>{poz.wskazowka}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function zbudujRaport(dane, jezyk, T) {
  const zbior = new Set(dane.wykryteId || []);
  const pozycje = WYMOGI.map((w) => {
    const t = w[jezyk];
    if (w.czyCwv && !dane.wydajnoscZmierzona) {
      return { kod: w.kod, nazwa: t.nazwa, wskazowka: t.wskazowka, status: 'brak', statusTekst: T.brakPomiaru };
    }
    const maProblem = w.reguly.some((id) => zbior.has(id));
    if (w.kod === 'A6-lang') {
      if (maProblem || dane.hreflangStan === 'blad') {
        return { kod: w.kod, nazwa: t.nazwa, wskazowka: t.wskazowka, status: 'blad', statusTekst: T.blad };
      }
      if (dane.hreflangStan !== 'zweryfikowany') {
        return { kod: w.kod, nazwa: t.nazwa, wskazowka: t.wskazowka, status: 'brak', statusTekst: T.ndJednojezyczna };
      }
    }
    return {
      kod: w.kod,
      nazwa: t.nazwa,
      wskazowka: t.wskazowka,
      status: maProblem ? 'blad' : 'ok',
      statusTekst: maProblem ? T.blad : T.ok,
    };
  });
  const zmierzone = pozycje.filter((p) => p.status !== 'brak').length;
  const spelnione = pozycje.filter((p) => p.status === 'ok').length;
  const braki = pozycje.filter((p) => p.status === 'blad').length;
  return {
    domena: dane.domena,
    wynik: dane.wynik,
    pozycje,
    zmierzone,
    spelnione,
    braki,
  };
}
