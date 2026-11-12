'use client';

// Edytor pliku llms.txt przed pobraniem (S1-poprawki Z-L4, 12.11.2026; jedyna przewaga CommonNinja, A4 §5).
// Zmienia nazwę (# ), opis (> ), nazwy sekcji, tytuły i opisy linków; odznacza linie i całe sekcje;
// przesuwa linki w górę / w dół (także między sekcjami) i przenosi je do innej sekcji albo do „Optional”.
// Model i operacje: ./llmsTxtPlik.js; plik do pobrania składa LlmsTxtClient z tego samego modelu.
// Dostępność: same natywne kontrolki (checkbox, input, textarea, button, select), etykiety widoczne,
// adres linku w aria-describedby, po przesunięciu fokus wraca na tę samą kontrolkę przesuniętego linku,
// a komunikat „sekcja, pozycja X z Y” idzie do regionu role="status". Na telefonie wiersze się zawijają.

import { useEffect, useRef, useState } from 'react';
import { NOWA_OPTIONAL, OPTIONAL, czyOptional, doSekcji, pozycja, przesun, zmienLink, zmienSekcje } from './llmsTxtPlik';

const T = {
  pl: {
    nazwa: 'Nazwa firmy lub serwisu (nagłówek „# ”)',
    opis: 'Opis pod nagłówkiem („> ”): 1-2 zdania o tym, czym zajmuje się firma',
    sekcja: (i, n) => `Sekcja ${i} z ${n}`,
    nazwaSekcji: 'Nazwa sekcji',
    opisOptional: '„Optional” to nazwa ze specyfikacji llmstxt.org: linki, które model może pominąć, gdy ma mało miejsca. Sekcja zawsze stoi na końcu pliku.',
    calaSekcja: 'Cała sekcja w pliku',
    pusta: 'Sekcja jest pusta i nie trafi do pliku.',
    wPliku: 'W pliku',
    tytul: 'Tytuł linku',
    opisLinku: 'Opis po dwukropku',
    wyzej: 'Wyżej',
    nizej: 'Niżej',
    wyzejDla: (t) => `Przesuń wyżej: ${t}`,
    nizejDla: (t) => `Przesuń niżej: ${t}`,
    doSekcji: 'Sekcja',
    nowaOptional: 'Optional (nowa sekcja na końcu)',
    pozycja: (t, p) => `„${t}”: sekcja ${p.sekcja}, pozycja ${p.pozycja} z ${p.razem}.`,
    poczatek: (t) => `„${t}” jest już na początku pliku.`,
    koniec: (t) => `„${t}” jest już na końcu pliku.`,
  },
  en: {
    nazwa: 'Business or website name (the "# " heading)',
    opis: 'Description under the heading ("> "): 1-2 sentences about what the business does',
    sekcja: (i, n) => `Section ${i} of ${n}`,
    nazwaSekcji: 'Section name',
    opisOptional: '"Optional" is the name from the llmstxt.org specification: links a model may skip when it is short on context. The section always stays at the end of the file.',
    calaSekcja: 'Whole section in the file',
    pusta: 'The section is empty and will not go into the file.',
    wPliku: 'In the file',
    tytul: 'Link title',
    opisLinku: 'Description after the colon',
    wyzej: 'Up',
    nizej: 'Down',
    wyzejDla: (t) => `Move up: ${t}`,
    nizejDla: (t) => `Move down: ${t}`,
    doSekcji: 'Section',
    nowaOptional: 'Optional (new section at the end)',
    pozycja: (t, p) => `"${t}": section ${p.sekcja}, position ${p.pozycja} of ${p.razem}.`,
    poczatek: (t) => `"${t}" is already at the start of the file.`,
    koniec: (t) => `"${t}" is already at the end of the file.`,
  },
};

const pole = { width: '100%', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(15,23,42,0.18)', fontSize: '0.95rem', lineHeight: 1.45, background: '#FFFFFF', color: 'var(--w-tusz)', fontFamily: 'inherit' };
const etykieta = { display: 'grid', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' };
const maly = { padding: '0.45rem 0.8rem', minHeight: '40px', borderRadius: '10px', border: '1px solid rgba(15,23,42,0.18)', background: '#FFFFFF', color: 'var(--color-text-dark)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' };
// Telefon: edytor siedzi w karcie wyniku i w <details>, więc wcięcia są małe (clamp), żeby pola miały szerokość.
const sekcjaStyl = { border: '1px solid rgba(15,23,42,0.1)', borderRadius: '16px', padding: '0.75rem clamp(0.55rem, 2vw, 0.9rem)', margin: '0 0 1rem', minWidth: 0 };
const wiersz = { display: 'grid', gap: '0.5rem', padding: '0.75rem 0', borderTop: '1px solid rgba(15,23,42,0.08)', minWidth: 0 };

const tytulLinku = (l) => l.tytul.trim() || l.url;

export default function LlmsTxtEdytor({ model, onZmiana, en = false }) {
  const t = en ? T.en : T.pl;
  const kontener = useRef(null);
  const doFokusu = useRef(null);
  const [komunikat, setKomunikat] = useState('');

  // Po przesunięciu link zmienia miejsce w DOM (inna sekcja = nowy element), więc fokus wraca tu.
  useEffect(() => {
    const f = doFokusu.current;
    if (!f || !kontener.current) return;
    doFokusu.current = null;
    const el = kontener.current.querySelector(`[data-link="${f.id}"][data-akcja="${f.akcja}"]`);
    if (el) el.focus();
  }, [model]);

  function ruch(link, kierunek) {
    const { model: nowy, ruch: ok } = przesun(model, link.id, kierunek);
    if (!ok) {
      setKomunikat(kierunek < 0 ? t.poczatek(tytulLinku(link)) : t.koniec(tytulLinku(link)));
      return;
    }
    doFokusu.current = { id: link.id, akcja: kierunek < 0 ? 'gora' : 'dol' };
    onZmiana(nowy);
    setKomunikat(t.pozycja(tytulLinku(link), pozycja(nowy, link.id)));
  }

  function przeniesDo(link, cel) {
    const nowy = doSekcji(model, link.id, cel);
    if (nowy === model) return;
    doFokusu.current = { id: link.id, akcja: 'sekcja' };
    onZmiana(nowy);
    setKomunikat(t.pozycja(tytulLinku(link), pozycja(nowy, link.id)));
  }

  const maOptional = model.sekcje.some(czyOptional);
  const n = model.sekcje.length;

  return (
    <div ref={kontener} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
      <label style={etykieta}>
        {t.nazwa}
        <input type="text" value={model.nazwa} maxLength={120} onChange={(e) => onZmiana({ ...model, nazwa: e.target.value })} style={pole} />
      </label>
      <label style={etykieta}>
        {t.opis}
        <textarea value={model.opis} rows={3} maxLength={400} onChange={(e) => onZmiana({ ...model, opis: e.target.value })} style={{ ...pole, resize: 'vertical' }} />
      </label>

      <div>
        {model.sekcje.map((sek, i) => {
          const opt = czyOptional(sek);
          const wszystkie = sek.linki.length > 0 && sek.linki.every((l) => l.wPliku);
          return (
            <fieldset key={sek.id} style={sekcjaStyl}>
              <legend style={{ padding: '0 0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {opt ? OPTIONAL : t.sekcja(i + 1, n)}
              </legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'end' }}>
                {opt ? (
                  <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--w-tusz-2)', flex: '1 1 260px' }}>{t.opisOptional}</p>
                ) : (
                  <label style={{ ...etykieta, flex: '1 1 220px' }}>
                    {t.nazwaSekcji}
                    <input type="text" value={sek.nazwa} maxLength={80} onChange={(e) => onZmiana(zmienSekcje(model, sek.id, { nazwa: e.target.value }))} style={pole} />
                  </label>
                )}
                {sek.linki.length > 0 && (
                  <label style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', fontSize: '0.9rem', fontWeight: 600, minHeight: '40px' }}>
                    <input type="checkbox" checked={wszystkie} onChange={() => onZmiana(zmienSekcje(model, sek.id, { wPliku: !wszystkie }))} style={{ width: '1.15rem', height: '1.15rem' }} />
                    {t.calaSekcja}
                  </label>
                )}
              </div>
              {sek.linki.length === 0 ? (
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--w-tusz-2)' }}>{t.pusta}</p>
              ) : (
                <ol style={{ listStyle: 'none', margin: '0.75rem 0 0', padding: 0 }}>
                  {sek.linki.map((l) => {
                    const idUrl = `llms-e-${l.id}-url`;
                    return (
                      <li key={l.id} style={{ ...wiersz, opacity: l.wPliku ? 1 : 0.6 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', minWidth: 0 }}>
                          <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap', minHeight: '28px' }}>
                            <input type="checkbox" checked={l.wPliku} aria-describedby={idUrl} onChange={(e) => onZmiana(zmienLink(model, l.id, { wPliku: e.target.checked }))} style={{ width: '1.15rem', height: '1.15rem' }} />
                            {t.wPliku}
                          </label>
                          <span id={idUrl} style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--w-tusz-2)', overflowWrap: 'anywhere', paddingTop: '0.2rem', minWidth: 0 }}>{l.url}</span>
                        </div>
                        <label style={etykieta}>
                          {t.tytul}
                          <input type="text" value={l.tytul} maxLength={160} aria-describedby={idUrl} onChange={(e) => onZmiana(zmienLink(model, l.id, { tytul: e.target.value }))} style={pole} />
                        </label>
                        <label style={etykieta}>
                          {t.opisLinku}
                          <textarea value={l.opis} rows={2} maxLength={400} aria-describedby={idUrl} onChange={(e) => onZmiana(zmienLink(model, l.id, { opis: e.target.value }))} style={{ ...pole, resize: 'vertical' }} />
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                          <button type="button" style={maly} data-link={l.id} data-akcja="gora" aria-label={t.wyzejDla(tytulLinku(l))} onClick={() => ruch(l, -1)}>
                            <span aria-hidden="true">↑ </span>{t.wyzej}
                          </button>
                          <button type="button" style={maly} data-link={l.id} data-akcja="dol" aria-label={t.nizejDla(tytulLinku(l))} onClick={() => ruch(l, 1)}>
                            <span aria-hidden="true">↓ </span>{t.nizej}
                          </button>
                          <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.88rem', fontWeight: 600, flex: '1 1 200px', minWidth: 0 }}>
                            <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{t.doSekcji}</span>
                            <select value={sek.id} data-link={l.id} data-akcja="sekcja" aria-describedby={idUrl} onChange={(e) => przeniesDo(l, e.target.value)} style={{ ...pole, width: 'auto', flex: '1 1 auto', minWidth: 0, maxWidth: '100%', minHeight: '40px' }}>
                              {model.sekcje.map((x) => <option key={x.id} value={x.id}>{x.nazwa.trim() || '…'}</option>)}
                              {!maOptional && <option value={NOWA_OPTIONAL}>{t.nowaOptional}</option>}
                            </select>
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </fieldset>
          );
        })}
      </div>
      <p role="status" aria-live="polite" style={{ margin: 0, minHeight: '1.2em', fontSize: '0.9rem', color: 'var(--w-tusz-2)' }}>{komunikat}</p>
    </div>
  );
}
