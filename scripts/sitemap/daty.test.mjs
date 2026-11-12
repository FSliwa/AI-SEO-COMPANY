// Reguły dat lib/lastmod.json (scripts/sitemap/daty.mjs). Bez sieci i bez buildu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dzisWarszawa, masowaZmiana, policzDaty, roznicaManifestow, serializuj } from './daty.mjs';

const U = (s) => `https://www.ai-seo-company.pl${s}`;
const o = (h, ht = 't', czesci = { tekst: ht, linki: h }) => ({ h, ht, czesci });

function scenariusz() {
  const manifest = {
    _wydanie: { data: '2026-11-06', zmienione: [U('/a')], usuniete: [] },
    adresy: {
      [U('/a')]: { lastmod: '2026-11-06', tresc: '2026-11-01', pierwszy: '2026-08-01' },
      [U('/b')]: { lastmod: '2026-11-06', tresc: '2026-11-06' },
      [U('/c')]: { lastmod: '2026-11-04', tresc: '2026-11-04' },
      [U('/stara')]: { lastmod: '2026-10-01', tresc: '2026-10-01' },
    },
  };
  const bazaWpisy = new Map([[U('/a'), '2026-11-06'], [U('/b'), '2026-11-06'], [U('/c'), '2026-11-04'], [U('/stara'), '2026-10-01']]);
  const bazaOdciski = new Map([[U('/a'), o('a1', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  return { manifest, bazaWpisy, bazaOdciski };
}

test('bez zmian treści: daty z manifestu, _wydanie bez zmian', () => {
  const s = scenariusz();
  const lokalne = new Map([[U('/a'), o('a1', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  const w = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  assert.deepEqual(w.adresy, s.manifest.adresy);
  assert.equal(w.zmienione.length, 0);
  assert.deepEqual(w.wydanie, s.manifest._wydanie);
});

test('zmiana linku: nowy lastmod, tresc zostaje; zmiana tekstu: oba; nowy adres: trzy daty; usunięty', () => {
  const s = scenariusz();
  const lokalne = new Map([
    [U('/a'), o('a2', 'ta')], // inny h, ten sam ht (np. link w bloku CTA)
    [U('/b'), o('b2', 'tb2')], // inny tekst
    [U('/c'), o('c1', 'tc')],
    [U('/nowa'), o('n1')],
  ]);
  const w = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  assert.deepEqual(w.adresy[U('/a')], { lastmod: '2026-11-12', tresc: '2026-11-01', pierwszy: '2026-08-01' });
  assert.deepEqual(w.adresy[U('/b')], { lastmod: '2026-11-12', tresc: '2026-11-12' });
  assert.deepEqual(w.adresy[U('/c')], { lastmod: '2026-11-04', tresc: '2026-11-04' });
  assert.deepEqual(w.adresy[U('/nowa')], { lastmod: '2026-11-12', tresc: '2026-11-12', pierwszy: '2026-11-12' });
  assert.equal(w.adresy[U('/stara')], undefined);
  assert.deepEqual(w.usuniete, [U('/stara')]);
  assert.deepEqual(w.wydanie, { data: '2026-11-12', zmienione: [U('/a'), U('/b'), U('/nowa')], usuniete: [U('/stara')] });
});

test('idempotencja: drugie uruchomienie na wyniku pierwszego daje to samo', () => {
  const s = scenariusz();
  const lokalne = new Map([[U('/a'), o('a2', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  const w1 = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  const w2 = policzDaty({ dzis: '2026-11-12', ...s, manifest: { _wydanie: w1.wydanie, adresy: w1.adresy }, lokalne });
  assert.equal(serializuj(w2), serializuj(w1));
  assert.deepEqual(roznicaManifestow(JSON.parse(serializuj(w1)), JSON.parse(serializuj(w2))), []);
});

test('ponowne uruchomienie dzień później przed wdrożeniem przesuwa datę na nowy dzień', () => {
  const s = scenariusz();
  const lokalne = new Map([[U('/a'), o('a2', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  const w1 = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  const w2 = policzDaty({ dzis: '2026-11-13', ...s, manifest: { _wydanie: w1.wydanie, adresy: w1.adresy }, lokalne });
  assert.equal(w2.adresy[U('/a')].lastmod, '2026-11-13');
  assert.equal(w2.wydanie.data, '2026-11-13');
});

test('data nowsza niż baza bez zmiany treści wraca do daty bazy (blokada sztucznego odświeżania)', () => {
  const s = scenariusz();
  s.manifest.adresy[U('/c')] = { lastmod: '2026-11-12', tresc: '2026-11-12' };
  const lokalne = new Map([[U('/a'), o('a1', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  const w = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  assert.deepEqual(w.adresy[U('/c')], { lastmod: '2026-11-04', tresc: '2026-11-04' });
  assert.equal(w.korekty.length, 1);
});

test('data starsza niż baza przy równym odcisku zostaje (korekta wsteczna z migracji)', () => {
  const s = scenariusz();
  s.manifest.adresy[U('/b')] = { lastmod: '2026-11-01', tresc: '2026-11-01' };
  const lokalne = new Map([[U('/a'), o('a1', 'ta')], [U('/b'), o('b1', 'tb')], [U('/c'), o('c1', 'tc')], [U('/stara'), o('s1')]]);
  assert.equal(policzDaty({ dzis: '2026-11-12', ...s, lokalne }).adresy[U('/b')].lastmod, '2026-11-01');
});

test('tresc nigdy nie jest późniejsza niż lastmod', () => {
  const s = scenariusz();
  s.manifest.adresy[U('/c')] = { lastmod: '2026-11-04', tresc: '2026-11-09' };
  const lokalne = new Map([[U('/c'), o('c1', 'tc')]]);
  const w = policzDaty({ dzis: '2026-11-12', ...s, lokalne });
  assert.equal(w.adresy[U('/c')].tresc, '2026-11-04');
});

test('bezpiecznik 40% i data Europe/Warsaw', () => {
  assert.equal(masowaZmiana(41, 100), true);
  assert.equal(masowaZmiana(40, 100), false);
  assert.equal(dzisWarszawa(new Date('2026-11-11T23:30:00Z')), '2026-11-12');
  assert.equal(dzisWarszawa(new Date('2026-07-01T21:59:00Z')), '2026-07-01');
});

test('serializacja: posortowane adresy, jedna linia na adres, poprawny JSON', () => {
  const txt = serializuj({ wydanie: { data: null, zmienione: [], usuniete: [] }, adresy: { [U('/b')]: { lastmod: '2026-11-01', tresc: '2026-11-01' }, [U('/a')]: { lastmod: '2026-11-02', tresc: '2026-11-02' } } });
  const j = JSON.parse(txt);
  assert.deepEqual(Object.keys(j.adresy), [U('/a'), U('/b')]);
  assert.match(txt, /\n {4}"https:\/\/www\.ai-seo-company\.pl\/a": \{"lastmod":"2026-11-02","tresc":"2026-11-02"\},\n/);
});
