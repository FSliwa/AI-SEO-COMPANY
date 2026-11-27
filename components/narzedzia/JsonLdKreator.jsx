'use client';

// Pasek szybkiego podstawiania danych firmy nad wzorami JSON-LD (C5):
// generuje na żywo gotowy blok <script type="application/ld+json"> (Organization / LocalBusiness)
// do skopiowania 1 kliknięciem oraz otwiera Google Rich Results Test w nowej karcie.

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track } from '@/lib/track';

const CSS_JSONLD = `
.jlk-karta { margin: 0 0 2rem; padding: clamp(1.15rem, 3vw, 1.65rem); border-radius: 22px; background: var(--w-karta, #ffffff); border: 1.5px solid rgba(243, 183, 156, 0.65); box-shadow: 0 18px 44px rgba(10, 19, 55, 0.07); display: grid; gap: 1rem; }
.jlk-glowa { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; }
.jlk-typy { display: flex; flex-wrap: wrap; gap: 0.25rem; padding: 0.25rem; border-radius: 16px; background: var(--w-papier, #f6f4ef); }
.jlk-typy button { appearance: none; border: 0; background: transparent; padding: 0.42rem 0.8rem; border-radius: 999px; font: inherit; font-size: 0.84rem; font-weight: 600; color: var(--w-tusz-2); cursor: pointer; }
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
    tytul: 'Szybki kreator JSON-LD (5 typów schema.org)',
    opis: 'Wybierz typ danych strukturalnych i wpisz dane firmy lub podstrony, a gotowy blok <script type="application/ld+json"> zaktualizuje się na żywo.',
    typAria: 'Typ danych strukturalnych',
    nazwa: 'Nazwa firmy',
    nazwaPh: 'np. Stal-Tech Sp. z o.o.',
    url: 'Adres URL (https://...)',
    urlPh: 'https://twojafirma.pl',
    tel: 'Telefon',
    telPh: '+48 22 100 20 30',
    ulica: 'Ulica i numer',
    ulicaPh: 'np. ul. Grzybowska 5A',
    kodPocztowy: 'Kod pocztowy',
    kodPocztowyPh: 'np. 00-132',
    miasto: 'Miasto',
    miastoPh: 'np. Warszawa',
    nip: 'NIP lub VAT UE',
    nipPh: 'np. PL5250001122',
    tytulArtykulu: 'Tytuł artykułu (headline)',
    tytulArtykuluPh: 'np. Jak zoptymalizować Core Web Vitals',
    autor: 'Autor artykułu',
    autorPh: 'np. Jan Kowalski',
    produktNazwa: 'Nazwa produktu lub pakietu',
    produktNazwaPh: 'np. Audyt techniczny SEO',
    cena: 'Cena brutto/netto',
    cenaPh: '1490.00',
    waluta: 'PLN',
    okruszekSekcja: 'Sekcja nadrzędna',
    okruszekSekcjaPh: 'np. Oferta',
    okruszekStrona: 'Bieżąca podstrona',
    okruszekStronaPh: 'np. Pozycjonowanie stron',
    domyslnaNazwa: 'Twoja Firma Sp. z o.o.',
    domyslnyUrl: 'https://www.twojafirma.pl',
    domyslnaUlica: 'ul. Przykładowa 10',
    domyslnyKod: '00-001',
    domyslneMiasto: 'Warszawa',
    kraj: 'PL',
    kopiuj: 'Kopiuj gotowy blok JSON-LD',
    skopiowano: 'Skopiowano kod <script>!',
    waliduj: 'Google Rich Results Test',
    walidujGraf: 'Sprawdź cały graf @id domeny',
  },
  en: {
    tytul: 'Quick JSON-LD Builder (5 Schema.org Types)',
    opis: 'Pick a schema type and enter your details below to generate a clean JSON-LD block live, ready to paste into your <head>.',
    typAria: 'Schema.org type',
    nazwa: 'Company name',
    nazwaPh: 'e.g. Acme Industrial LLC',
    url: 'Website URL (https://...)',
    urlPh: 'https://yourcompany.com',
    tel: 'Phone',
    telPh: '+1 312 555 0190',
    ulica: 'Street address',
    ulicaPh: 'e.g. 200 W Madison St',
    kodPocztowy: 'Postal / ZIP code',
    kodPocztowyPh: 'e.g. 60606',
    miasto: 'City',
    miastoPh: 'e.g. Chicago',
    nip: 'Tax ID / VAT ID',
    nipPh: 'e.g. 12-3456789',
    tytulArtykulu: 'Article headline',
    tytulArtykuluPh: 'e.g. Core Web Vitals Optimization Guide',
    autor: 'Author name',
    autorPh: 'e.g. Jane Doe',
    produktNazwa: 'Product or package name',
    produktNazwaPh: 'e.g. Technical SEO Audit',
    cena: 'Price',
    cenaPh: '350.00',
    waluta: 'USD',
    okruszekSekcja: 'Parent category',
    okruszekSekcjaPh: 'e.g. Services',
    okruszekStrona: 'Current page',
    okruszekStronaPh: 'e.g. Technical SEO',
    domyslnaNazwa: 'Your Company LLC',
    domyslnyUrl: 'https://www.yourcompany.com',
    domyslnaUlica: '200 W Madison St',
    domyslnyKod: '60606',
    domyslneMiasto: 'Chicago',
    kraj: 'US',
    kopiuj: 'Copy JSON-LD <script> block',
    skopiowano: 'Copied <script> block!',
    waliduj: 'Google Rich Results Test',
    walidujGraf: 'Validate full @id entity graph',
  },
  de: {
    tytul: 'Schnell-Generator: Eigenes JSON-LD erstellen (5 Typen)',
    opis: 'Wählen Sie den Schema-Typ und tragen Sie Ihre Daten ein: Der JSON-LD-Block passt sich sofort fehlerfrei zum Kopieren an.',
    typAria: 'Schema.org-Typ wählen',
    nazwa: 'Firmenname',
    nazwaPh: 'z. B. Muster GmbH',
    url: 'Website-URL (https://...)',
    urlPh: 'https://ihre-firma.de',
    tel: 'Telefon',
    telPh: '+49 30 1234567',
    ulica: 'Straße und Hausnummer',
    ulicaPh: 'z. B. Friedrichstraße 12',
    kodPocztowy: 'Postleitzahl',
    kodPocztowyPh: 'z. B. 10117',
    miasto: 'Stadt / Ort',
    miastoPh: 'z. B. München',
    nip: 'USt-IdNr.',
    nipPh: 'z. B. DE123456789',
    tytulArtykulu: 'Artikel-Überschrift (headline)',
    tytulArtykuluPh: 'z. B. Core Web Vitals optimieren',
    autor: 'Autorin / Autor',
    autorPh: 'z. B. Max Mustermann',
    produktNazwa: 'Produkt- oder Paketname',
    produktNazwaPh: 'z. B. Technisches SEO-Audit',
    cena: 'Preis (EUR)',
    cenaPh: '350.00',
    waluta: 'EUR',
    okruszekSekcja: 'Übergeordneter Bereich',
    okruszekSekcjaPh: 'z. B. Leistungen',
    okruszekStrona: 'Aktuelle Unterseite',
    okruszekStronaPh: 'z. B. B2B SEO',
    domyslnaNazwa: 'Muster GmbH',
    domyslnyUrl: 'https://www.ihre-firma.de',
    domyslnaUlica: 'Musterstraße 12',
    domyslnyKod: '80331',
    domyslneMiasto: 'München',
    kraj: 'DE',
    kopiuj: 'JSON-LD-Block kopieren',
    skopiowano: '<script>-Block kopiert!',
    waliduj: 'Google Rich-Suchergebnisse-Test',
    walidujGraf: 'Entitäts-Graph der Domain prüfen',
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
  const [ulica, setUlica] = useState('');
  const [kodPocztowy, setKodPocztowy] = useState('');
  const [miasto, setMiasto] = useState('');
  const [nip, setNip] = useState('');
  const [tytulArtykulu, setTytulArtykulu] = useState('');
  const [autor, setAutor] = useState('');
  const [produktNazwa, setProduktNazwa] = useState('');
  const [cena, setCena] = useState('');
  const [okruszekSekcja, setOkruszekSekcja] = useState('');
  const [okruszekStrona, setOkruszekStrona] = useState('');
  const [skopiowano, setSkopiowano] = useState(false);

  const gotowySkrypt = useMemo(() => {
    const bazaUrl = normalizujUrl(url, T.domyslnyUrl);
    const czystaNazwa = nazwa.trim() || T.domyslnaNazwa;
    const czystaUlica = ulica.trim() || (typ === 'LocalBusiness' ? T.domyslnaUlica : '');
    const czystyKod = kodPocztowy.trim() || (typ === 'LocalBusiness' ? T.domyslnyKod : '');
    const czysteMiasto = miasto.trim() || T.domyslneMiasto;
    const czystyTel = telefon.trim();
    const czystyNip = nip.trim();
    const kraj = krajZUrl(bazaUrl, T.kraj);

    let obiekt;
    if (typ === 'Article') {
      obiekt = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: tytulArtykulu.trim() || T.tytulArtykuluPh.replace(/^(np\.|e\.g\.|z\.\s*B\.)\s*/i, ''),
        datePublished: '2026-11-01',
        dateModified: '2026-11-27',
        author: { '@type': 'Person', name: autor.trim() || T.autorPh.replace(/^(np\.|e\.g\.|z\.\s*B\.)\s*/i, '') },
        publisher: { '@type': 'Organization', '@id': `${bazaUrl}/#organization`, name: czystaNazwa, logo: { '@type': 'ImageObject', url: `${bazaUrl}/logo.png` } },
      };
    } else if (typ === 'Product') {
      obiekt = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: produktNazwa.trim() || T.produktNazwaPh.replace(/^(np\.|e\.g\.|z\.\s*B\.)\s*/i, ''),
        image: [`${bazaUrl}/produkt.webp`],
        brand: { '@type': 'Brand', name: czystaNazwa },
        offers: {
          '@type': 'Offer',
          url: `${bazaUrl}/oferta`,
          priceCurrency: T.waluta,
          price: cena.trim() || T.cenaPh,
          availability: 'https://schema.org/InStock',
        },
      };
    } else if (typ === 'BreadcrumbList') {
      const sek = okruszekSekcja.trim() || T.okruszekSekcjaPh.replace(/^(np\.|e\.g\.|z\.\s*B\.)\s*/i, '');
      const bie = okruszekStrona.trim() || T.okruszekStronaPh.replace(/^(np\.|e\.g\.|z\.\s*B\.)\s*/i, '');
      obiekt = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: jezyk === 'de' ? 'Startseite' : jezyk === 'en' ? 'Home' : 'Strona główna', item: `${bazaUrl}/` },
          { '@type': 'ListItem', position: 2, name: sek, item: `${bazaUrl}/${sek.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}` },
          { '@type': 'ListItem', position: 3, name: bie },
        ],
      };
    } else {
      obiekt = {
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
          ...(czystaUlica ? { streetAddress: czystaUlica } : {}),
          ...(czystyKod ? { postalCode: czystyKod } : {}),
          addressLocality: czysteMiasto,
          addressCountry: kraj,
        },
      };
    }

    return `<script type="application/ld+json">\n${JSON.stringify(obiekt, null, 2)}\n</script>`;
  }, [typ, nazwa, url, telefon, ulica, kodPocztowy, miasto, nip, tytulArtykulu, autor, produktNazwa, cena, okruszekSekcja, okruszekStrona, jezyk, T]);

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
          {['Organization', 'LocalBusiness', 'Article', 'Product', 'BreadcrumbList'].map((wariant) => (
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
        {(typ === 'Organization' || typ === 'LocalBusiness') && (
          <>
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
              <label htmlFor="jlk-ulica" className="jlk-etykieta">{T.ulica}</label>
              <input
                id="jlk-ulica"
                type="text"
                maxLength={100}
                {...walid}
                value={ulica}
                onChange={(e) => { setUlica(e.target.value); setSkopiowano(false); }}
                placeholder={T.ulicaPh}
                className="jlk-pole"
              />
            </div>
            <div>
              <label htmlFor="jlk-kod" className="jlk-etykieta">{T.kodPocztowy}</label>
              <input
                id="jlk-kod"
                type="text"
                maxLength={20}
                {...walid}
                value={kodPocztowy}
                onChange={(e) => { setKodPocztowy(e.target.value); setSkopiowano(false); }}
                placeholder={T.kodPocztowyPh}
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
          </>
        )}
        {typ === 'Article' && (
          <>
            <div>
              <label htmlFor="jlk-art-tytul" className="jlk-etykieta">{T.tytulArtykulu}</label>
              <input
                id="jlk-art-tytul"
                type="text"
                maxLength={140}
                {...walid}
                value={tytulArtykulu}
                onChange={(e) => { setTytulArtykulu(e.target.value); setSkopiowano(false); }}
                placeholder={T.tytulArtykuluPh}
                className="jlk-pole"
              />
            </div>
            <div>
              <label htmlFor="jlk-autor" className="jlk-etykieta">{T.autor}</label>
              <input
                id="jlk-autor"
                type="text"
                maxLength={80}
                {...walid}
                value={autor}
                onChange={(e) => { setAutor(e.target.value); setSkopiowano(false); }}
                placeholder={T.autorPh}
                className="jlk-pole"
              />
            </div>
          </>
        )}
        {typ === 'Product' && (
          <>
            <div>
              <label htmlFor="jlk-prod" className="jlk-etykieta">{T.produktNazwa}</label>
              <input
                id="jlk-prod"
                type="text"
                maxLength={120}
                {...walid}
                value={produktNazwa}
                onChange={(e) => { setProduktNazwa(e.target.value); setSkopiowano(false); }}
                placeholder={T.produktNazwaPh}
                className="jlk-pole"
              />
            </div>
            <div>
              <label htmlFor="jlk-cena" className="jlk-etykieta">{T.cena}</label>
              <input
                id="jlk-cena"
                type="text"
                inputMode="decimal"
                maxLength={24}
                {...walid}
                value={cena}
                onChange={(e) => { setCena(e.target.value); setSkopiowano(false); }}
                placeholder={T.cenaPh}
                className="jlk-pole"
              />
            </div>
          </>
        )}
        {typ === 'BreadcrumbList' && (
          <>
            <div>
              <label htmlFor="jlk-okr-sek" className="jlk-etykieta">{T.okruszekSekcja}</label>
              <input
                id="jlk-okr-sek"
                type="text"
                maxLength={60}
                {...walid}
                value={okruszekSekcja}
                onChange={(e) => { setOkruszekSekcja(e.target.value); setSkopiowano(false); }}
                placeholder={T.okruszekSekcjaPh}
                className="jlk-pole"
              />
            </div>
            <div>
              <label htmlFor="jlk-okr-str" className="jlk-etykieta">{T.okruszekStrona}</label>
              <input
                id="jlk-okr-str"
                type="text"
                maxLength={80}
                {...walid}
                value={okruszekStrona}
                onChange={(e) => { setOkruszekStrona(e.target.value); setSkopiowano(false); }}
                placeholder={T.okruszekStronaPh}
                className="jlk-pole"
              />
            </div>
          </>
        )}
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
        <Link
          href="/narzedzia/walidator-grafu-encji-json-ld"
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
          data-cta="jsonld_kreator_graf_encji"
        >
          {T.walidujGraf}
        </Link>
        <span role="status" aria-live="polite" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#047857' }}>
          {skopiowano ? '✓' : ''}
        </span>
      </div>
    </div>
  );
}
