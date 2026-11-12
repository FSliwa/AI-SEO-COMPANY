// Reguły dat lastmod / tresc / pierwszy (lib/lastmod.json). Czyste funkcje bez sieci i bez plików,
// testowane w daty.test.mjs. Opis: scripts/sitemap/README.md, sekcja „Jak liczone są daty”.

export const PROG_MASOWEJ_ZMIANY = 0.4;

/** Dzisiejsza data RRRR-MM-DD w strefie Europe/Warsaw (ta sama co polska widoczna data). */
export function dzisWarszawa(chwila = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit' }).format(chwila);
}

const min = (a, b) => (!a ? b : !b ? a : a < b ? a : b);

/** Wpis z polami w stałej kolejności, bez pustego `pierwszy`, z warunkiem tresc <= lastmod. */
export function wpis(lastmod, tresc, pierwszy) {
  const w = { lastmod, tresc: min(tresc || lastmod, lastmod) };
  if (pierwszy) w.pierwszy = pierwszy;
  return w;
}

/**
 * Nowe daty wszystkich adresów lokalnej sitemapy.
 *
 * @param {object} p
 * @param {string} p.dzis              RRRR-MM-DD (Europe/Warsaw)
 * @param {object} p.manifest          obecny lib/lastmod.json ({ _wydanie, adresy })
 * @param {Map<string,{h:string,ht:string}|null>} p.lokalne   adres lokalnej sitemapy -> odcisk lokalnego buildu
 * @param {Map<string,string|undefined>} p.bazaWpisy          adres sitemapy bazy (produkcji) -> jej lastmod
 * @param {Map<string,{h:string,ht:string}|null>} p.bazaOdciski adres -> odcisk HTML-a bazy (null = nie 200)
 * @returns {{ adresy: object, zmienione: object[], usuniete: string[], korekty: object[], bezZmian: number, wydanie: object }}
 */
export function policzDaty({ dzis, manifest, lokalne, bazaWpisy, bazaOdciski }) {
  const stare = manifest?.adresy || {};
  const adresy = {};
  const zmienione = [];
  const korekty = [];
  let bezZmian = 0;

  for (const [url, fl] of lokalne) {
    const m = stare[url];
    if (!bazaWpisy.has(url)) {
      // Adres nowy w sitemapie: data wydania jako lastmod, tresc i pierwszy.
      adresy[url] = wpis(dzis, dzis, dzis);
      zmienione.push({ url, powod: 'nowy', czesci: [] });
      continue;
    }
    const pl = bazaWpisy.get(url);
    const fp = bazaOdciski.get(url);
    if (!fl || !fp || fl.h !== fp.h) {
      const czesci = !fl || !fp ? ['brak-odcisku'] : Object.keys(fl.czesci || {}).filter((k) => fl.czesci[k] !== fp.czesci?.[k]);
      const trescZmieniona = !fl || !fp || fl.ht !== fp.ht;
      adresy[url] = wpis(dzis, trescZmieniona ? dzis : min(m?.tresc, pl) || pl || dzis, m?.pierwszy);
      zmienione.push({ url, powod: 'zmiana', czesci, tresc: trescZmieniona });
      continue;
    }
    // Odcisk równy bazie: daty z manifestu, o ile nie są nowsze od lastmod bazy (data bez zmiany
    // treści to sztuczne odświeżanie; zostaje po przerwanym wydaniu albo ręcznej edycji).
    if (m && (!pl || m.lastmod <= pl)) {
      adresy[url] = wpis(m.lastmod, m.tresc, m.pierwszy);
      bezZmian += 1;
    } else if (m) {
      adresy[url] = wpis(pl, min(m.tresc, pl), m.pierwszy);
      korekty.push({ url, z: m.lastmod, na: pl, powod: 'data nowsza niż baza bez zmiany treści' });
    } else {
      adresy[url] = wpis(pl || dzis, pl || dzis);
      korekty.push({ url, z: null, na: pl || dzis, powod: 'brak wpisu w manifeście' });
    }
  }

  const usuniete = [...bazaWpisy.keys()].filter((u) => !lokalne.has(u)).sort();
  const lista = zmienione.map((z) => z.url).sort();
  const wydanie = lista.length || usuniete.length
    ? { data: dzis, zmienione: lista, usuniete }
    : (manifest?._wydanie || { data: null, zmienione: [], usuniete: [] });

  return { adresy: posortuj(adresy), zmienione, usuniete, korekty, bezZmian, wydanie };
}

export function posortuj(adresy) {
  return Object.fromEntries(Object.keys(adresy).sort().map((k) => [k, adresy[k]]));
}

/** Czy odsetek zmienionych adresów przekracza bezpiecznik (np. aktualizacja Next zmieniła znaczniki). */
export function masowaZmiana(liczbaZmienionych, liczbaWszystkich, prog = PROG_MASOWEJ_ZMIANY) {
  return liczbaWszystkich > 0 && liczbaZmienionych / liczbaWszystkich > prog;
}

export const OPIS = 'Daty stron: lastmod (sitemapa, IndexNow), tresc (podpis i dateModified), pierwszy (pierwsza publikacja). Generuje: npm run wydanie (scripts/sitemap/README.md). Nie edytować ręcznie.';

/** lib/lastmod.json: klucze posortowane, jedna linia na adres (czytelny diff w PR). */
export function serializuj({ wydanie, adresy }) {
  const linie = Object.keys(adresy).sort().map((u) => `    ${JSON.stringify(u)}: ${JSON.stringify(adresy[u])}`);
  const w = {
    data: wydanie?.data ?? null,
    zmienione: [...(wydanie?.zmienione || [])].sort(),
    usuniete: [...(wydanie?.usuniete || [])].sort(),
  };
  const wydanieTxt = [
    `    "data": ${JSON.stringify(w.data)}`,
    `    "zmienione": ${w.zmienione.length ? `[\n${w.zmienione.map((u) => `      ${JSON.stringify(u)}`).join(',\n')}\n    ]` : '[]'}`,
    `    "usuniete": ${w.usuniete.length ? `[\n${w.usuniete.map((u) => `      ${JSON.stringify(u)}`).join(',\n')}\n    ]` : '[]'}`,
  ].join(',\n');
  return `{\n  "_opis": ${JSON.stringify(OPIS)},\n  "_wydanie": {\n${wydanieTxt}\n  },\n  "adresy": {\n${linie.join(',\n')}\n  }\n}\n`;
}

/** Różnice dwóch manifestów (do trybu --sprawdz). */
export function roznicaManifestow(stary, nowy) {
  const wynik = [];
  const a = stary?.adresy || {};
  const b = nowy?.adresy || {};
  for (const u of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = JSON.stringify(a[u] ?? null);
    const y = JSON.stringify(b[u] ?? null);
    if (x !== y) wynik.push({ url: u, jest: a[u] ?? null, powinno: b[u] ?? null });
  }
  const wa = stary?._wydanie || {};
  const wb = nowy?._wydanie || {};
  for (const k of ['data', 'zmienione', 'usuniete']) {
    if (JSON.stringify(wa[k] ?? null) !== JSON.stringify(wb[k] ?? null)) wynik.push({ url: `_wydanie.${k}`, jest: wa[k] ?? null, powinno: wb[k] ?? null });
  }
  return wynik;
}
