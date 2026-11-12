// Decyzje crona IndexNow (scripts/sitemap/indexnow-klient.mjs). Bez sieci.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LIMIT_CRONA, KEY, KEY_LOCATION, planZgloszenia, zglos } from './indexnow-klient.mjs';

const U = (s) => `https://www.ai-seo-company.pl${s}`;
const wydanie = { data: '2026-11-12', zmienione: [U('/a'), U('/b')], usuniete: [U('/stara')] };
const h = (iso) => Date.parse(iso);

test('produkcja, build tego dnia: zgłasza zmienione i usunięte', () => {
  const p = planZgloszenia({ teraz: h('2026-11-13T06:15:00Z'), srodowisko: 'production', zbudowano: '2026-11-12T14:00:00Z', wydanie });
  assert.equal(p.zglos, true);
  assert.deepEqual(p.adresy, [U('/a'), U('/b'), U('/stara')]);
});

test('podgląd i lokalnie: nic nie wysyła', () => {
  for (const srodowisko of ['preview', 'development', undefined]) {
    const p = planZgloszenia({ teraz: h('2026-11-13T06:15:00Z'), srodowisko, zbudowano: '2026-11-12T14:00:00Z', wydanie });
    assert.equal(p.zglos, false);
    assert.deepEqual(p.adresy, []);
  }
});

test('okno 26 h od buildu: drugie wywołanie po 24 h jeszcze tak, po 26 h nie', () => {
  const b = '2026-11-12T06:20:00Z';
  assert.equal(planZgloszenia({ teraz: h('2026-11-13T06:59:00Z'), srodowisko: 'production', zbudowano: b, wydanie }).zglos, true);
  assert.equal(planZgloszenia({ teraz: h('2026-11-13T08:30:00Z'), srodowisko: 'production', zbudowano: b, wydanie }).zglos, false);
});

test('wydanie z dnia D wdrożone D+1 po godzinie crona: zgłoszone następnego dnia', () => {
  const p = planZgloszenia({ teraz: h('2026-11-14T06:15:00Z'), srodowisko: 'production', zbudowano: '2026-11-13T09:00:00Z', wydanie });
  assert.equal(p.zglos, true);
});

test('build bez nowego wydania (np. sam CSS kilka dni później): nie zgłasza starej listy', () => {
  const p = planZgloszenia({ teraz: h('2026-11-20T06:15:00Z'), srodowisko: 'production', zbudowano: '2026-11-19T12:00:00Z', wydanie });
  assert.equal(p.zglos, false);
});

test('wydanie bez zmienionych adresów: nic', () => {
  const p = planZgloszenia({ teraz: h('2026-11-13T06:15:00Z'), srodowisko: 'production', zbudowano: '2026-11-12T14:00:00Z', wydanie: { data: null, zmienione: [], usuniete: [] } });
  assert.equal(p.zglos, false);
});

test('bez stempla buildu: okno dziś/wczoraj od daty wydania', () => {
  assert.equal(planZgloszenia({ teraz: h('2026-11-13T06:15:00Z'), srodowisko: 'production', zbudowano: null, wydanie }).zglos, true);
  assert.equal(planZgloszenia({ teraz: h('2026-11-15T06:15:00Z'), srodowisko: 'production', zbudowano: null, wydanie }).zglos, false);
});

test('limit 100 adresów na wywołanie i tylko host serwisu', () => {
  const duzo = { data: '2026-11-12', zmienione: [...Array.from({ length: 130 }, (_, i) => U(`/s${i}`)), 'https://inna.pl/x'], usuniete: [] };
  const p = planZgloszenia({ teraz: h('2026-11-12T20:00:00Z'), srodowisko: 'production', zbudowano: '2026-11-12T14:00:00Z', wydanie: duzo });
  assert.equal(p.adresy.length, LIMIT_CRONA);
  assert.equal(p.pominiete, 30);
  assert.ok(p.adresy.every((u) => u.startsWith(U('/'))));
});

test('zglos: treść żądania IndexNow (bez sieci)', async () => {
  let zadanie;
  const fetchImpl = async (url, opcje) => { zadanie = { url, ...opcje, body: JSON.parse(opcje.body) }; return { status: 202 }; };
  const w = await zglos([U('/a'), U('/a'), 'https://inna.pl/x'], { fetchImpl });
  assert.deepEqual(w, { status: 202, ok: true, zgloszono: 1 });
  assert.equal(zadanie.url, 'https://api.indexnow.org/indexnow');
  assert.deepEqual(zadanie.body, { host: 'www.ai-seo-company.pl', key: KEY, keyLocation: KEY_LOCATION, urlList: [U('/a')] });
});
