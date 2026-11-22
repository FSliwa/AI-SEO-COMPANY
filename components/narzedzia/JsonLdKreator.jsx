'use client';

// Pasek szybkiego podstawiania danych firmy nad wzorami JSON-LD (C5):
// generuje na żywo gotowy blok <script type="application/ld+json"> (Organization / LocalBusiness)
// do skopiowania 1 kliknięciem oraz otwiera Google Rich Results Test w nowej karcie.

import { useMemo, useState } from 'react';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track } from '@/lib/track';

const CSS_JSONLD = `
.jlk-karta { margin: 0 0 2rem; padding: clamp(1.15rem, 3vw, 1.65rem); border-radius: 22px; background: var(--w-karta, #ffffff); border: 1.5px solid rgba(243, 183, 156, 0.65); box-shadow: 0 18px 44px rgba(10, 19, 55, 0.07); display: grid; gap: 1rem; }
.jlk-glowa { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; }
.jlk-typy { display: inline-grid; grid-template-columns: repeat(2, auto); gap: 0.25rem; padding: 0.25rem; border-radius: 999px; background: var(--w-papier, #f6f4ef); }
.jlk-typy button { appearance: none; border: 0; background: transparent; padding: 0.42rem 0.9rem; border-radius: 999px; font: inherit; font-size: 0.86rem; font-weight: 600; color: var(--w-tusz-2); cursor: pointer; }
.jlk-typy button[aria-pressed="true"] { background: #ffffff; color: var(--w-tusz); box-shadow: 0 1px 3px rgba(10, 19, 55, 0.12), 0 0 0 1px var(--w-pomarancz, #d85a30); }
.jlk-siatka { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr)); gap: 0.75rem; }
.jlk-etykieta { display: block; font-size: 0.85rem; font-weight: 600; color: var(--color-text-dark); margin: 0 0 0.3rem; }
.jlk-pole { width: 100%; min-height: 46px; padding: 0.6rem 0.85rem; border-radius: 12px; border: 1px solid rgba(15, 23, 42, 0.16); background: var(--w-papier, #f6f4ef); color: var(--w-tusz); font: inherit; font-size: 0.94rem; }
.jlk-pole:focus-visible { outline: 2px solid var(--w-pomarancz, #d85a30); outline-offset: 2px; background: #ffffff; }
.jlk-kod { margin: 0; padding: 0.95rem 1.1rem; border-radius: 14px; background: #141923; color: #f8fafc; font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 0.82rem; line-height: 1.55; overflow-x: auto; white-space: pre; border: 1px solid rgba(255, 255, 255, 0.08); }
.jlk-akcje { display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: center; }
`;

const TEKSTY = {
  pl: {
    tytul: 'Szybki kreator JSON-LD dla Twojej firmy',
    opis: 'Wpisz podstawowe dane firmy, a poniższy blok Organization lub LocalBusiness zaktualizuje się na żywo. Skopiuj go do sekcji <head> strony głównej.',
    typAria: 'Typ danych strukturalnych firmy',
    nazwa: 'Nazwa firmy',
    nazwaPh: 'np. Stal-Tech Sp. z o.o.',
    url: 'Adres URL (https://...)',
    urlPh: 'https://twojafirma.pl',
    tel: 'Telefon',
    telPh: '+48 22 100 20 30',
    miasto: 'Miasto',
    miastoPh: 'np. Warszawa',
    nip: 'NIP lub VAT UE',
    nipPh: 'np. PL5250001122',
    domyslnaNazwa: 'Twoja Firma Sp. z o.o.',
    domyslnyUrl: 'https://www.twojafirma.pl',
    domyslneMiasto: 'Warszawa',
    kraj: 'PL',
    kopiuj: 'Kopiuj gotowy blok JSON-LD',
    skopiowano: 'Skopiowano kod <script>!',
    waliduj: 'Sprawdź w Google Rich Results Test',
  },
  en: {
    tytul: 'Quick JSON-LD Builder for Your Business',
    opis: 'Type your company details below to generate a personalized Organization or LocalBusiness JSON-LD block live, ready to paste into your <head>.',
    typAria: 'Business schema type',
    nazwa: 'Company name',
    nazwaPh: 'e.g. Acme Industrial LLC',
    url: 'Website URL (https://...)',
    urlPh: 'https://yourcompany.com',
    tel: 'Phone',
    telPh: '+1 312 555 0190',
    miasto: 'City',
    miastoPh: 'e.g. Chicago',
    nip: 'Tax ID / VAT ID',
    nipPh: 'e.g. 12-3456789',
    domyslnaNazwa: 'Your Company LLC',
    domyslnyUrl: 'https://www.yourcompany.com',
    domyslneMiasto: 'Chicago',
    kraj: 'US',
    kopiuj: 'Copy JSON-LD <script> block',
    skopiowano: 'Copied <script> block!',
    waliduj: 'Open Google Rich Results Test',
  },
  de: {
    tytul: 'Schnell-Generator: Eigenes JSON-LD erstellen',
    opis: 'Tragen Sie Ihre Unternehmensdaten ein: Der JSON-LD-Block für Organization oder LocalBusiness passt sich sofort live zum Kopieren an.',
    typAria: 'Schema.org-Typ wählen',
    nazwa: 'Firmenname',
    nazwaPh: 'z. B. Muster GmbH',
    url: 'Website-URL (https://...)',
    urlPh: 'https://ihre-firma.de',
    tel: 'Telefon',
    telPh: '+49 30 1234567',
    miasto: 'Stadt / Ort',
    miastoPh: 'z. B. München',
    nip: 'USt-IdNr.',
    nipPh: 'z. B. DE123456789',
    domyslnaNazwa: 'Muster GmbH',
    domyslnyUrl: 'https://www.ihre-firma.de',
    domyslneMiasto: 'München',
    kraj: 'DE',
    kopiuj: 'JSON-LD-Block kopieren',
    skopiowano: '<script>-Block kopiert!',
    waliduj: 'Google Rich-Suchergebnisse-Test öffnen',
  },
};

function normalizujUrl(surowy, domyslny) {
  const s = String(surowy || '').trim();
  if (!s) return domyslny;
  const zProtokolem = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  return zProtokolem.replace(/\/+$/, '');
}

function krajZUrl(url, domyslny) {
  try {
    const h = new URL(url).hostname.toLowerCase();
    if (h.endsWith('.pl')) return 'PL';
    if (h.endsWith('.de')) return 'DE';
    if (h.endsWith('.at')) return 'AT';
    if (h.endsWith('.ch')) return 'CH';
    if (h.endsWith('.co.uk') || h.endsWith('.uk')) return 'GB';
  } catch {
    // zachowaj domyslny kraj
  }
  return domyslny;
}

async function skopiujDoSchowka(tekst) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // metoda zapasowa ponizej
  }
  try {
    const el = document.createElement('textarea');
    el.value = tekst;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    el.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function JsonLdKreator({ locale = 'pl' }) {
  const jezyk = locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'pl';
  const T = TEKSTY[jezyk];
  const walid = jezyk === 'de' ? WALID_DE : {};

  const [typ, setTyp] = useState('Organization');
  const [nazwa, setNazwa] = useState('');
  const [url, setUrl] = useState('');
  const [telefon, setTelefon] = useState('');
  const [miasto, setMiasto] = useState('');
  const [nip, setNip] = useState('');
  const [skopiowano, setSkopiowano] = useState(false);

  const gotowySkrypt = useMemo(() => {
    const bazaUrl = normalizujUrl(url, T.domyslnyUrl);
    const czystaNazwa = nazwa.trim() || T.domyslnaNazwa;
    const czysteMiasto = miasto.trim() || T.domyslneMiasto;
    const czystyTel = telefon.trim();
    const czystyNip = nip.trim();
    const kraj = krajZUrl(bazaUrl, T.kraj);

    const obiekt = {
      '@context': 'https://schema.org',
      '@type': typ,
      '@id': `${bazaUrl}/#${typ === 'LocalBusiness' ? 'localbusiness' : 'organization'}`,
      name: czystaNazwa,
      url: `${bazaUrl}/`,
      logo: `${bazaUrl}/logo.png`,
      ...(czystyTel ? { telephone: czystyTel } : {}),
      ...(czystyNip
        ? (/^[A-Z]{2}/i.test(czystyNip) ? { vatID: czystyNip.toUpperCase() } : { taxID: czystyNip })
        : {}),
      address: {
        '@type': 'PostalAddress',
        addressLocality: czysteMiasto,
        addressCountry: kraj,
      },
    };

    return `<script type="application/ld+json">\n${JSON.stringify(obiekt, null, 2)}\n</script>`;
  }, [typ, nazwa, url, telefon, miasto, nip, T]);

  async function obsluzKopiuj() {
    const ok = await skopiujDoSchowka(gotowySkrypt);
    if (ok) {
      setSkopiowano(true);
      track('narzedzie_jsonld_kreator_kopiuj', { typ, lang: jezyk });
      setTimeout(() => setSkopiowano(false), 3000);
    }
  }

  return (
    <div id="kreator-json-ld" role="region" aria-labelledby="jlk-tytul" className="jlk-karta">
      <style>{CSS_JSONLD}</style>
      <div className="jlk-glowa">
        <div>
          <h2 id="jlk-tytul" className="sz-h3" style={{ margin: 0 }}>{T.tytul}</h2>
          <p className="sz-przypis" style={{ margin: '0.25rem 0 0' }}>{T.opis}</p>
        </div>
        <div className="jlk-typy" role="group" aria-label={T.typAria}>
          {['Organization', 'LocalBusiness'].map((wariant) => (
            <button
              key={wariant}
              type="button"
              aria-pressed={typ === wariant}
              onClick={() => { setTyp(wariant); setSkopiowano(false); }}
            >
              {wariant}
            </button>
          ))}
        </div>
      </div>

      <div className="jlk-siatka">
        <div>
          <label htmlFor="jlk-nazwa" className="jlk-etykieta">{T.nazwa}</label>
          <input
            id="jlk-nazwa"
            type="text"
            maxLength={120}
            {...walid}
            value={nazwa}
            onChange={(e) => { setNazwa(e.target.value); setSkopiowano(false); }}
            placeholder={T.nazwaPh}
            className="jlk-pole"
          />
        </div>
        <div>
          <label htmlFor="jlk-url" className="jlk-etykieta">{T.url}</label>
          <input
            id="jlk-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            maxLength={200}
            {...walid}
            value={url}
            onChange={(e) => { setUrl(e.target.value); setSkopiowano(false); }}
            placeholder={T.urlPh}
            className="jlk-pole"
          />
        </div>
        <div>
          <label htmlFor="jlk-tel" className="jlk-etykieta">{T.tel}</label>
          <input
            id="jlk-tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={40}
            {...walid}
            value={telefon}
            onChange={(e) => { setTelefon(e.target.value); setSkopiowano(false); }}
            placeholder={T.telPh}
            className="jlk-pole"
          />
        </div>
        <div>
          <label htmlFor="jlk-miasto" className="jlk-etykieta">{T.miasto}</label>
          <input
            id="jlk-miasto"
            type="text"
            maxLength={80}
            {...walid}
            value={miasto}
            onChange={(e) => { setMiasto(e.target.value); setSkopiowano(false); }}
            placeholder={T.miastoPh}
            className="jlk-pole"
          />
        </div>
        <div>
          <label htmlFor="jlk-nip" className="jlk-etykieta">{T.nip}</label>
          <input
            id="jlk-nip"
            type="text"
            maxLength={40}
            {...walid}
            value={nip}
            onChange={(e) => { setNip(e.target.value); setSkopiowano(false); }}
            placeholder={T.nipPh}
            className="jlk-pole"
          />
        </div>
      </div>

      <pre className="jlk-kod" tabIndex={0} aria-label="JSON-LD">
        <code>{gotowySkrypt}</code>
      </pre>

      <div className="jlk-akcje">
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
          onClick={obsluzKopiuj}
          data-cta="jsonld_kreator_kopiuj"
        >
          {skopiowano ? T.skopiowano : T.kopiuj}
        </button>
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
          onClick={() => track('narzedzie_jsonld_rich_results_test', { lang: jezyk })}
          data-cta="jsonld_kreator_rich_results"
        >
          {T.waliduj}
        </a>
        <span role="status" aria-live="polite" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#047857' }}>
          {skopiowano ? '✓' : ''}
        </span>
      </div>
    </div>
  );
}
