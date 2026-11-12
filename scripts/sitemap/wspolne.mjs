// Wspólne narzędzia skryptów sitemapy: pobieranie, czytanie sitemap, lokalny serwer Next.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const PROD = 'https://www.ai-seo-company.pl';
export const UA = 'Mozilla/5.0 (compatible; ai-seo-company-sitemapa/1.0)';

/** Adres publiczny -> adres na serwerze `origin` (np. http://localhost:3217). */
export const naOrigin = (url, origin) => (origin === PROD ? url : url.replace(PROD, origin));

export async function pobierz(url, { proby = 3 } = {}) {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(url, { redirect: 'manual', headers: { 'user-agent': UA } });
      return { status: r.status, location: r.headers.get('location'), headers: r.headers, body: await r.text() };
    } catch (e) {
      if (i >= proby) return { status: 0, location: null, headers: new Headers(), body: '', blad: String(e?.cause?.code || e?.message || e) };
      await new Promise((ok) => setTimeout(ok, 500 * i));
    }
  }
}

/** Pobranie z podążaniem za przekierowaniami (max 5 skoków). */
export async function pobierzZPrzekierowaniami(url) {
  let u = url;
  let skoki = 0;
  let r;
  for (;;) {
    r = await pobierz(u);
    if (r.status >= 300 && r.status < 400 && r.location && skoki < 5) {
      u = new URL(r.location, u).href;
      skoki += 1;
    } else break;
  }
  return { ...r, url: u, skoki };
}

/** Równoległe przetwarzanie listy (domyślnie 6 naraz, jak przeglądarka na jednym hoście). */
export async function rownolegle(lista, fn, ile = 6) {
  const wyniki = new Array(lista.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(ile, lista.length) }, async () => {
    for (let k; (k = i++) < lista.length;) wyniki[k] = await fn(lista[k], k);
  }));
  return wyniki;
}

/** Wpisy <url> z treści sitemapy: [{ loc, lastmod }] (lastmod może nie istnieć). */
export function wpisyUrlset(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, blok]) => ({
    loc: dekodujXml((/<loc>([^<]*)<\/loc>/.exec(blok) || [])[1] || ''),
    lastmod: (/<lastmod>([^<]*)<\/lastmod>/.exec(blok) || [])[1],
  }));
}

export const dekodujXml = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/**
 * Pełna sitemapa serwisu spod `origin` (indeks /sitemap.xml -> segmenty). Adresy zostają publiczne
 * (https://www.ai-seo-company.pl/...), pobieranie idzie na `origin`.
 * Zwraca { status, indeks, segmenty: [{ loc, lastmod, xml, wpisy }], wpisy: Map(url -> lastmod) }.
 */
export async function czytajSitemape(origin) {
  const idx = await pobierz(`${origin}/sitemap.xml`);
  if (idx.status !== 200) return { status: idx.status, indeks: idx.body, segmenty: [], wpisy: new Map() };
  const segmenty = [];
  if (idx.body.includes('<sitemapindex')) {
    for (const [, blok] of idx.body.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)) {
      const loc = dekodujXml((/<loc>([^<]*)<\/loc>/.exec(blok) || [])[1] || '');
      const lastmod = (/<lastmod>([^<]*)<\/lastmod>/.exec(blok) || [])[1];
      const r = await pobierz(naOrigin(loc, origin));
      segmenty.push({ loc, lastmod, status: r.status, xml: r.body, wpisy: r.status === 200 ? wpisyUrlset(r.body) : [] });
    }
  } else {
    segmenty.push({ loc: `${PROD}/sitemap.xml`, lastmod: undefined, status: 200, xml: idx.body, wpisy: wpisyUrlset(idx.body) });
  }
  const wpisy = new Map();
  for (const s of segmenty) for (const w of s.wpisy) wpisy.set(w.loc, w.lastmod);
  return { status: 200, indeks: idx.body, segmenty, wpisy };
}

export function wolnyPort() {
  return new Promise((ok, zle) => {
    const s = createServer();
    s.unref();
    s.on('error', zle);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => ok(port));
    });
  });
}

/** Uruchamia polecenie z dziedziczonym wyjściem; zwraca kod wyjścia. */
export function uruchom(polecenie, argumenty, { cwd, env } = {}) {
  return new Promise((ok) => {
    const p = spawn(polecenie, argumenty, { cwd, env: { ...process.env, ...env }, stdio: 'inherit' });
    p.on('close', (kod) => ok(kod ?? 1));
    p.on('error', () => ok(1));
  });
}

/** `next start` lokalnego buildu na wolnym porcie; czeka na 200 z /sitemap.xml. */
export async function startujSerwer(katalog, port) {
  const bin = join(katalog, 'node_modules', '.bin', 'next');
  if (!existsSync(join(katalog, '.next', 'BUILD_ID'))) throw new Error(`Brak buildu w ${katalog}/.next (uruchom bez --bez-builda).`);
  // Własna grupa procesów: zabijamy cały serwer (także procesy potomne Next) przy każdym wyjściu skryptu.
  const p = spawn(bin, ['start', '-p', String(port)], { cwd: katalog, env: { ...process.env, NODE_ENV: 'production' }, stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  const zabij = (sygnal) => {
    try {
      process.kill(-p.pid, sygnal);
    } catch {}
  };
  process.on('exit', () => zabij('SIGKILL'));
  for (const s of ['SIGINT', 'SIGTERM']) process.once(s, () => { zabij('SIGKILL'); process.exit(130); });
  let log = '';
  p.stdout.on('data', (d) => { log += d; });
  p.stderr.on('data', (d) => { log += d; });
  // Bez -H i z adresem localhost: middleware next-intl przepisuje na http://localhost:<port>/pl/...;
  // przy -H 127.0.0.1 Next traktuje to jako przepisanie na obcy host i dostaje 308 z reguły /pl/:path*.
  const origin = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    await new Promise((ok) => setTimeout(ok, 500));
    if (p.exitCode !== null) throw new Error(`next start zakończył się kodem ${p.exitCode}:\n${log.slice(-2000)}`);
    const r = await pobierz(`${origin}/sitemap.xml`, { proby: 1 });
    if (r.status === 200) {
      return {
        origin,
        zatrzymaj: () => new Promise((ok) => {
          if (p.exitCode !== null) return ok();
          p.once('close', () => ok());
          zabij('SIGTERM');
          setTimeout(() => { zabij('SIGKILL'); ok(); }, 5000).unref();
        }),
      };
    }
  }
  zabij('SIGKILL');
  throw new Error(`next start nie odpowiada na ${origin}/sitemap.xml w 60 s:\n${log.slice(-2000)}`);
}

export function czytajJson(plik, domyslnie = null) {
  try {
    return JSON.parse(readFileSync(plik, 'utf8'));
  } catch {
    return domyslnie;
  }
}

/** Argumenty `--klucz wartosc` i flagi `--flaga`. */
export function argumenty(argv) {
  const flagi = new Set();
  const wartosci = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const [k, v] = a.slice(2).split('=');
    if (v !== undefined) wartosci[k] = v;
    else if (argv[i + 1] && !argv[i + 1].startsWith('--') && ['baza', 'dzis', 'port', 'katalog', 'raport', 'z-pliku'].includes(k)) wartosci[k] = argv[++i];
    else flagi.add(k);
  }
  return { flagi, wartosci };
}
