// npm run wydanie: daty lastmod / tresc / pierwszy z odcisku treści, porównanie z produkcją.
// npm run lastmod:sprawdz: to samo bez zapisu, kod wyjścia 1, gdy lib/lastmod.json jest nieaktualny.
// Procedura i opis reguł: scripts/sitemap/README.md.
//
// Opcje:
//   --sprawdz                   tryb kontroli (CI, pre-push): nic nie zapisuje, błąd przy każdej różnicy
//   --sucho                     liczy i wypisuje nowe daty bez zapisu lib/lastmod.json
//   --bez-builda                używa istniejącego .next (bez `npm run build`)
//   --bez-punktu-stalego        bez drugiego buildu po zapisie nowych dat
//   --bez-git                   bez warunków git (czyste drzewo, origin/main w historii) - tylko kopie i testy
//   --baza <origin>             baza porównania (domyślnie https://www.ai-seo-company.pl)
//   --dzis RRRR-MM-DD           data wydania (domyślnie dziś w Europe/Warsaw) - testy
//   --port <n>                  port lokalnego `next start` (domyślnie wolny)
//   --raport <plik.json>        szczegóły (odciski, części, kontrole) do pliku
//   --potwierdzam-masowa-zmiane zgoda na zmianę ponad 40% adresów (np. aktualizacja Next/React)
//   --pomin-kontrole            zapis mimo błędów kontroli sitemapy (tylko w awarii, opisać w commicie)
// Kody wyjścia: 0 OK, 1 błędy kontroli / --sprawdz z różnicami, 2 warunki wstępne, 3 bezpiecznik.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { argumenty, czytajJson, czytajSitemape, naOrigin, pobierz, pobierzZPrzekierowaniami, PROD, rownolegle, startujSerwer, uruchom, wolnyPort } from './wspolne.mjs';
import { odcisk, roznice } from './odcisk.mjs';
import { dzisWarszawa, masowaZmiana, policzDaty, PROG_MASOWEJ_ZMIANY, roznicaManifestow, serializuj } from './daty.mjs';
import { walidujSerwis } from './waliduj.mjs';

const { flagi, wartosci } = argumenty(process.argv.slice(2));
const KATALOG = resolve(wartosci.katalog || process.cwd());
const SPRAWDZ = flagi.has('sprawdz');
const SUCHO = SPRAWDZ || flagi.has('sucho');
const BAZA = (wartosci.baza || PROD).replace(/\/$/, '');
const DZIS = wartosci.dzis || dzisWarszawa();
const PLIK = join(KATALOG, 'lib', 'lastmod.json');
const bezSlasha = (u) => (u || '').replace(/\/+$/, '');

function koniec(kod, komunikat) {
  if (komunikat) (kod ? console.error : console.log)(komunikat);
  process.exit(kod);
}

function git(...a) {
  return execFileSync('git', a, { cwd: KATALOG, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\s+$/, '');
}

function warunkiWstepne() {
  if (process.env.NEXT_PUBLIC_PODGLAD_PARTII) koniec(2, 'NEXT_PUBLIC_PODGLAD_PARTII jest ustawione: podgląd opublikowałby strony za bramką. Usuń zmienną.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(DZIS)) koniec(2, `--dzis ${DZIS}: oczekiwany format RRRR-MM-DD.`);
  if (!existsSync(join(KATALOG, 'package.json'))) koniec(2, `${KATALOG} nie jest katalogiem strony.`);
  if (flagi.has('bez-git')) return;
  try {
    // Zmiany śledzonych plików i nieśledzone pliki w katalogach kodu (mogłyby wejść do lokalnego
    // buildu, a nie do commita). Inne nieśledzone pliki (notatki, raporty) nie przeszkadzają.
    const brudne = git('status', '--porcelain').split('\n')
      .filter((l) => l && !l.endsWith('lib/lastmod.json'))
      .filter((l) => !l.startsWith('??') || /^\?\? "?(app|components|lib|i18n|messages|public|middleware|proxy|next\.config)/.test(l));
    if (brudne.length) koniec(2, `Drzewo robocze ma niezacommitowane zmiany (build musi odpowiadać commitowi):\n${brudne.slice(0, 20).join('\n')}`);
    git('fetch', 'origin', 'main', '--quiet');
    try {
      git('merge-base', '--is-ancestor', 'origin/main', 'HEAD');
    } catch {
      koniec(2, 'origin/main nie jest w historii HEAD: najpierw scal aktualny main (inaczej nadpiszesz cudze wydanie).');
    }
  } catch (e) {
    if (e?.status !== undefined && String(e.message).includes('not a git repository')) koniec(2, 'Brak repozytorium git (w kopii użyj --bez-git).');
    throw e;
  }
}

/** Kontrole jednej strony z lokalnego buildu. */
function kontrolaStrony(url, r, bledy) {
  if (r.status !== 200) return bledy.push(`${url}: HTTP ${r.status}${r.location ? ` -> ${r.location}` : ''} (adres z sitemapy musi dawać 200 bez przekierowania)`);
  const canon = (/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i.exec(r.body) || [])[1];
  if (bezSlasha(canon) !== bezSlasha(url)) bledy.push(`${url}: canonical ${canon ?? 'brak'}`);
  const robots = (/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i.exec(r.body) || [])[1] || '';
  if (/noindex/i.test(robots) || /noindex/i.test(r.headers.get('x-robots-tag') || '')) bledy.push(`${url}: noindex`);
  const lang = (/<html[^>]*\slang="([^"]+)"/i.exec(r.body) || [])[1];
  const oczekiwany = /^https:\/\/[^/]+\/en(\/|$)/.test(url) ? 'en' : 'pl';
  if (!lang || !lang.startsWith(oczekiwany)) bledy.push(`${url}: <html lang="${lang}"> zamiast ${oczekiwany}`);
}

function kontrolaHreflang(odciski, wSitemapie, bledy) {
  const mapy = new Map();
  for (const [url, o] of odciski) {
    if (!o) continue;
    mapy.set(url, new Map(o._glowa.hreflang.map((x) => x.split(' ')).map(([l, h]) => [l, bezSlasha(h)])));
  }
  for (const [url, m] of mapy) {
    if (!m.size) continue;
    const ja = bezSlasha(url);
    if (![...m.values()].includes(ja)) bledy.push(`${url}: hreflang bez odwołania do siebie`);
    if (!m.has('x-default')) bledy.push(`${url}: hreflang bez x-default`);
    for (const [l, cel] of m) {
      if (!wSitemapie.has(cel)) bledy.push(`${url}: hreflang ${l} -> ${cel} spoza sitemapy`);
      else if (l !== 'x-default') {
        const zwrotny = mapy.get([...odciski.keys()].find((u) => bezSlasha(u) === cel));
        if (zwrotny && ![...zwrotny.values()].includes(ja)) bledy.push(`${url}: hreflang ${l} -> ${cel} bez odwołania zwrotnego`);
      }
    }
  }
}

/** Każda trasa z buildu (prerender-manifest), która daje indeksowalne 200, musi być w sitemapie. */
async function kontrolaPokrycia(origin, wSitemapie, bledy, ostrzezenia) {
  const plik = join(KATALOG, '.next', 'prerender-manifest.json');
  if (!existsSync(plik)) return ostrzezenia.push('brak .next/prerender-manifest.json: pominięta kontrola pokrycia');
  const trasy = Object.keys(czytajJson(plik, { routes: {} }).routes)
    .filter((t) => !/^\/(_|api\/|sitemaps|robots|sitemap|llms|icon|favicon|manifest|opengraph|twitter)/.test(t) && !/\.[a-z0-9]+$/i.test(t));
  const indeksowalne = new Set();
  await rownolegle(trasy, async (t) => {
    const r = await pobierzZPrzekierowaniami(`${origin}${t}`);
    if (r.status !== 200) return;
    const pub = bezSlasha(r.url.replace(origin, PROD)) || PROD;
    const robots = (/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i.exec(r.body) || [])[1] || '';
    const canon = bezSlasha((/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i.exec(r.body) || [])[1]);
    if (!/noindex/i.test(robots) && canon === pub) indeksowalne.add(pub);
  });
  for (const u of indeksowalne) if (!wSitemapie.has(u)) bledy.push(`${u}: indeksowalna strona z buildu poza sitemapą (dopisz slug do rejestru treści albo wpis w lib/publikacja.js)`);
  for (const u of wSitemapie) if (!indeksowalne.has(u)) ostrzezenia.push(`${u}: adres sitemapy bez trasy prerenderowanej (strona dynamiczna?)`);
  return { tras: trasy.length, indeksowalnych: indeksowalne.size };
}

/** Linki wewnętrzne z <main> wszystkich stron: żaden nie prowadzi do 3xx/4xx/5xx. */
async function kontrolaLinkow(origin, odciski, bledy) {
  const zrodla = new Map();
  for (const [url, o] of odciski) {
    for (const href of o?._linki || []) {
      let u;
      try {
        u = new URL(href, url);
      } catch {
        continue;
      }
      if (!/^https?:$/.test(u.protocol) || u.host !== new URL(PROD).host) continue;
      const sciezka = u.pathname;
      if (!zrodla.has(sciezka)) zrodla.set(sciezka, url);
    }
  }
  const sciezki = [...zrodla.keys()];
  await rownolegle(sciezki, async (s) => {
    const r = await pobierz(`${origin}${s}`);
    if (r.status !== 200) bledy.push(`link ${s} (np. na ${zrodla.get(s)}): HTTP ${r.status}${r.location ? ` -> ${r.location}` : ''}`);
  });
  return sciezki.length;
}

async function odciskiLokalne(origin, urls) {
  const wynik = new Map();
  const odpowiedzi = new Map();
  await rownolegle(urls, async (url) => {
    const r = await pobierz(naOrigin(url, origin));
    odpowiedzi.set(url, r);
    wynik.set(url, r.status === 200 ? odcisk(r.body) : null);
  });
  return { odciski: wynik, odpowiedzi };
}

const t0 = Date.now();
warunkiWstepne();
console.log(`${SPRAWDZ ? 'Kontrola' : 'Wydanie'} lastmod ${DZIS} | katalog ${KATALOG} | baza ${BAZA}`);

const baza = await czytajSitemape(BAZA);
if (baza.status !== 200) koniec(2, `${BAZA}/sitemap.xml: HTTP ${baza.status} - baza niedostępna, wydanie musi poczekać.`);

if (!flagi.has('bez-builda')) {
  console.log('Build: npm run build ...');
  if (await uruchom('npm', ['run', 'build'], { cwd: KATALOG })) koniec(2, 'Build nieudany.');
}

let serwer = await startujSerwer(KATALOG, Number(wartosci.port) || await wolnyPort());
const bledy = [];
const ostrzezenia = [];
let raport = {};
try {
  // Lokalna sitemapa: walidacja XML i lista adresów.
  const lok = await czytajSitemape(serwer.origin);
  const walidacja = await walidujSerwis(serwer.origin);
  for (const b of Array.isArray(walidacja) ? walidacja : walidacja.bledy) bledy.push(`sitemapa: ${b}`);
  const urls = [...lok.wpisy.keys()];
  const wSitemapie = new Set(urls.map(bezSlasha));

  // Odciski i kontrole stron lokalnego buildu.
  const { odciski, odpowiedzi } = await odciskiLokalne(serwer.origin, urls);
  for (const url of urls) kontrolaStrony(url, odpowiedzi.get(url), bledy);
  kontrolaHreflang(odciski, wSitemapie, bledy);
  const pokrycie = await kontrolaPokrycia(serwer.origin, wSitemapie, bledy, ostrzezenia);
  const linkow = await kontrolaLinkow(serwer.origin, odciski, bledy);

  // Baza: odciski HTML-a produkcji dla adresów z jej sitemapy.
  const bazaOdciski = new Map();
  await rownolegle([...baza.wpisy.keys()], async (url) => {
    const r = await pobierz(naOrigin(url, BAZA));
    bazaOdciski.set(url, r.status === 200 ? odcisk(r.body) : null);
    if (r.status !== 200) ostrzezenia.push(`baza: ${url} HTTP ${r.status} (adres z sitemapy bazy)`);
  });

  // Adresy usunięte z sitemapy: lokalnie 308 do adresu z sitemapy albo 404/410.
  for (const url of baza.wpisy.keys()) {
    if (lok.wpisy.has(url)) continue;
    const r = await pobierz(naOrigin(url, serwer.origin));
    const cel = r.location ? bezSlasha(new URL(r.location, url).href.replace(serwer.origin, PROD)) : null;
    const ok = r.status === 404 || r.status === 410 || (r.status === 308 && cel && wSitemapie.has(cel));
    if (!ok) bledy.push(`${url}: usunięty z sitemapy, a lokalnie HTTP ${r.status}${cel ? ` -> ${cel}` : ''} (oczekiwane 308 do adresu z sitemapy albo 404/410)`);
  }

  const manifest = czytajJson(PLIK, { _wydanie: null, adresy: {} });
  const wynik = policzDaty({ dzis: DZIS, manifest, lokalne: odciski, bazaWpisy: baza.wpisy, bazaOdciski });
  const nowe = wynik.zmienione.filter((z) => z.powod === 'nowy');
  const zmiany = wynik.zmienione.filter((z) => z.powod === 'zmiana');

  console.log(`\nSitemapa lokalna: ${urls.length} adresów (baza: ${baza.wpisy.size}); trasy z buildu: ${pokrycie?.tras ?? '-'}, indeksowalne: ${pokrycie?.indeksowalnych ?? '-'}; linki wewnętrzne: ${linkow}.`);
  console.log(`Nowe: ${nowe.length} | zmienione: ${zmiany.length} | bez zmian: ${wynik.bezZmian} | korekty dat: ${wynik.korekty.length} | usunięte: ${wynik.usuniete.length}`);
  for (const z of nowe) console.log(`  + ${z.url}`);
  for (const z of zmiany) console.log(`  ~ ${z.url} [${z.czesci.join(',')}]${z.tresc ? ' (tresc też)' : ''}`);
  for (const k of wynik.korekty) console.log(`  ! ${k.url}: ${k.z} -> ${k.na} (${k.powod})`);
  for (const u of wynik.usuniete) console.log(`  - ${u}`);

  raport = {
    dzis: DZIS, baza: BAZA, adresow: urls.length, adresowBazy: baza.wpisy.size, pokrycie, linkow,
    nowe: nowe.map((z) => z.url), zmienione: zmiany, korekty: wynik.korekty, usuniete: wynik.usuniete,
    odciski: Object.fromEntries([...odciski].map(([u, o]) => [u, o && { h: o.h, ht: o.ht, czesci: o.czesci }])),
  };

  if (masowaZmiana(wynik.zmienione.length, urls.length) && !flagi.has('potwierdzam-masowa-zmiane')) {
    const przyklady = zmiany.slice(0, 5).map((z) => `  ${z.url}: ${z.czesci.join(',')}`).join('\n');
    koniec(3, `\nBEZPIECZNIK: zmienionych ${wynik.zmienione.length}/${urls.length} adresów (> ${PROG_MASOWEJ_ZMIANY * 100}%). Typowo aktualizacja Next/React zmieniła znaczniki, a nie treść.\n${przyklady}\nSprawdź różnice; jeśli to realne zmiany treści: --potwierdzam-masowa-zmiane.`);
  }

  for (const o of ostrzezenia) console.warn(`uwaga: ${o}`);
  if (bledy.length) {
    console.error(`\nBŁĘDY KONTROLI (${bledy.length}):\n- ${bledy.join('\n- ')}`);
    if (!flagi.has('pomin-kontrole')) {
      if (wartosci.raport) writeFileSync(wartosci.raport, JSON.stringify({ ...raport, bledy, ostrzezenia }, null, 1));
      koniec(1, '\nNic nie zapisano. Popraw błędy (albo w awarii: --pomin-kontrole).');
    }
  }

  const staryTekst = existsSync(PLIK) ? readFileSync(PLIK, 'utf8') : '';
  const nowyTekst = serializuj({ wydanie: wynik.wydanie, adresy: wynik.adresy });
  const roznica = roznicaManifestow(staryTekst ? JSON.parse(staryTekst) : {}, JSON.parse(nowyTekst));
  raport.roznica = roznica;

  if (SPRAWDZ) {
    if (roznica.length) {
      console.error(`\nlib/lastmod.json NIEAKTUALNY (${roznica.length} różnic). Uruchom npm run wydanie:`);
      for (const r of roznica.slice(0, 40)) console.error(`  ${r.url}: ${JSON.stringify(r.jest)} -> ${JSON.stringify(r.powinno)}`);
      bledy.push(`lib/lastmod.json nieaktualny (${roznica.length})`);
    } else console.log('\nlib/lastmod.json aktualny: daty zgodne z odciskiem treści względem bazy.');
  } else if (SUCHO) {
    console.log(`\n--sucho: ${roznica.length} różnic w lib/lastmod.json, nic nie zapisano.`);
    for (const r of roznica.slice(0, 40)) console.log(`  ${r.url}: ${JSON.stringify(r.jest)} -> ${JSON.stringify(r.powinno)}`);
  } else if (nowyTekst === staryTekst) {
    console.log('\nlib/lastmod.json bez zmian (wynik identyczny z zapisanym).');
  } else {
    writeFileSync(PLIK, nowyTekst);
    console.log(`\nZapisano lib/lastmod.json: ${roznica.length} różnic. Do IndexNow po wdrożeniu: ${wynik.wydanie.zmienione.length + wynik.wydanie.usuniete.length} adresów.`);

    // Punkt stały: nowe daty nie mogą zmienić odcisku żadnej strony (każdy element z datą musi
    // być pominięty w odcisku: p.byline, pola dat JSON-LD albo data-lastmod="pomin").
    if (!flagi.has('bez-punktu-stalego')) {
      console.log('Kontrola punktu stałego: drugi build z nowymi datami ...');
      await serwer.zatrzymaj();
      serwer = { zatrzymaj: async () => {} };
      if (await uruchom('npm', ['run', 'build'], { cwd: KATALOG })) koniec(2, 'Drugi build nieudany.');
      serwer = await startujSerwer(KATALOG, Number(wartosci.port) || await wolnyPort());
      const po = (await odciskiLokalne(serwer.origin, urls)).odciski;
      const rozne = urls.filter((u) => po.get(u)?.h !== odciski.get(u)?.h);
      raport.punktStaly = { sprawdzone: urls.length, rozne: rozne.map((u) => ({ url: u, czesci: roznice(odciski.get(u), po.get(u)) })) };
      if (rozne.length) {
        for (const u of rozne) bledy.push(`punkt stały: ${u} zmienił odcisk po zapisie dat [${roznice(odciski.get(u), po.get(u)).join(',')}] - element z datą bez data-lastmod="pomin"`);
      } else console.log(`Punkt stały OK: ${urls.length}/${urls.length} odcisków bez zmian po nowych datach.`);
    }
    console.log(`\nDalej: przejrzyj diff lib/lastmod.json, commit (np. "lastmod: wydanie ${DZIS}") i push na main po zgodzie na wdrożenie.`);
  }
} finally {
  await serwer.zatrzymaj();
  if (wartosci.raport) writeFileSync(wartosci.raport, JSON.stringify({ ...raport, bledy, ostrzezenia }, null, 1));
}
console.log(`Czas: ${((Date.now() - t0) / 1000).toFixed(1)} s.`);
if (bledy.length) koniec(1, `\nBŁĘDY (${bledy.length}):\n- ${bledy.join('\n- ')}`);
koniec(0);
