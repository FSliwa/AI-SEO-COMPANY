// Logika generatora llms.txt i testu dostępu botów AI (N1, PLAN-v2 6.10; CB-09 korekta, CB-18).
// Tylko serwer (node:http, node:dns). Wywołuje ją app/api/llms-txt/route.js; osobny plik, bo
// route.js może eksportować tylko handlery i konfigurację segmentu.
//
// 5.11.2026 - parametry z PLAN-v2 6.10 po korekcie CB-09:
// - maks. 50 URL-i z sitemap.xml (wpis Sitemap: w robots.txt albo /sitemap.xml; indeks map 1 poziom),
// - HEAD z timeoutem 4 s na adres, współbieżność 8, limit globalny 20 s: po nim wynik częściowy
//   i lista nieprzetworzonych adresów (route ma maxDuration 30, więc zostaje zapas na odpowiedź),
// - maks. 2 MB na odpowiedź, bez zapisu danych (nic nie trafia do bazy ani do logów).
// Odstępstwo od samego „HEAD” (świadome): HEAD nie zwraca tytułu ani opisu strony, których
// wymaga format llmstxt.org (wiersz „- [Tytuł](url): opis”), ani meta robots noindex. Dlatego po
// HEAD = 200 robimy drugi, ucięty GET (maks. 64 KB nagłówka HTML) z tym samym timeoutem 4 s.
// Adresy z przekierowaniem, kodem ≠ 200 albo noindex w nagłówku kończą się na HEAD.
//
// Ochrona przed SSRF (przegląd bezpieczeństwa przed wdrożeniem - CB-09 „ryzyka”):
// - tylko http/https, tylko porty 80 i 443, bez loginu w adresie, bez localhost/.local/.internal,
// - każdy adres IP sprawdzany W CHWILI POŁĄCZENIA (opcja lookup w node:http), więc zmiana DNS
//   między walidacją a pobraniem (DNS rebinding) nie przejdzie; adres IP wpisany wprost też,
// - odrzucane: sieci prywatne, loopback, link-local (w tym 169.254.169.254), CGNAT, multicast,
//   zarezerwowane i dokumentacyjne IPv4 oraz wszystko w IPv6 poza globalnym unicastem 2000::/3,
// - przekierowania obsługujemy ręcznie (maks. 5) i każdy krok przechodzi te same testy,
// - adresy z sitemapy tylko z tej samej domeny (z www albo bez), reszta = „inna domena”.

import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import net from 'node:net';
import zlib from 'node:zlib';

export const LIMITY = {
  maxUrli: 50,
  wspolbieznosc: 8,
  timeoutMs: 4000,
  limitGlobalnyMs: 20000,
  maxBajtow: 2 * 1024 * 1024,
  maxBajtowHtml: 64 * 1024,
  maxBajtowRobots: 512 * 1024,
  maxPrzekierowan: 5,
  maxMapPodrzednych: 5,
  maxPominietychNaLiscie: 60,
};

// Uczciwy User-Agent generatora (pobieranie mapy strony i podstron).
export const UA_GENERATORA = 'Mozilla/5.0 (compatible; AISEOCompanyLlmsTxt/1.0; +https://www.ai-seo-company.pl/narzedzia/generator-llms-txt)';
// Punkt odniesienia dla testu botów: ta sama strona główna pobrana jak przez przeglądarkę.
const UA_PRZEGLADARKI = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

// 8 botów z PLAN-v2 6.10. UA i role według dokumentacji dostawców (odczyt 5.11.2026):
// developers.openai.com/api/docs/bots, docs.perplexity.ai (crawlers), support.claude.com (art. 8896518),
// developers.google.com/crawling (Google-Extended). Google-Extended nie ma własnego UA w zapytaniach
// HTTP (Google pobiera strony zwykłymi crawlerami), więc dla niego jest tylko test robots.txt.
export const BOTY = [
  {
    nazwa: 'GPTBot', token: 'gptbot', firma: 'OpenAI', rola: 'trening modeli', rolaEn: 'model training',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
    skutekBlokady: 'Treści nie trafią do trenowania modeli OpenAI. Według OpenAI nie wpływa to na wyszukiwanie w ChatGPT.',
    skutekBlokadyEn: 'Your content will not be used to train OpenAI models. According to OpenAI, this does not affect search in ChatGPT.',
  },
  {
    nazwa: 'OAI-SearchBot', token: 'oai-searchbot', firma: 'OpenAI', rola: 'wyszukiwanie w ChatGPT', rolaEn: 'ChatGPT search',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
    skutekBlokady: 'ChatGPT nie pokaże strony w wynikach wyszukiwania. To najważniejszy bot dla widoczności w ChatGPT.',
    skutekBlokadyEn: 'ChatGPT will not show the site in its search results. This is the most important bot for visibility in ChatGPT.',
  },
  {
    nazwa: 'ChatGPT-User', token: 'chatgpt-user', firma: 'OpenAI', rola: 'wizyty na prośbę użytkownika', rolaEn: 'visits on user request',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
    skutekBlokady: 'Według OpenAI reguły robots.txt mogą nie obowiązywać tego agenta, bo działa na prośbę użytkownika.',
    skutekBlokadyEn: 'According to OpenAI, robots.txt rules may not apply to this agent because it acts on a user\'s request.',
  },
  {
    nazwa: 'PerplexityBot', token: 'perplexitybot', firma: 'Perplexity', rola: 'wyniki w Perplexity', rolaEn: 'results in Perplexity',
    ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
    skutekBlokady: 'Perplexity nie pokaże strony w wynikach i nie poda do niej linku.',
    skutekBlokadyEn: 'Perplexity will not show the site in its results or link to it.',
  },
  {
    nazwa: 'ClaudeBot', token: 'claudebot', firma: 'Anthropic', rola: 'trening modeli', rolaEn: 'model training',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
    skutekBlokady: 'Treści nie trafią do trenowania modeli Anthropic.',
    skutekBlokadyEn: 'Your content will not be used to train Anthropic models.',
  },
  {
    nazwa: 'Claude-SearchBot', token: 'claude-searchbot', firma: 'Anthropic', rola: 'wyszukiwanie w Claude', rolaEn: 'Claude search',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)',
    skutekBlokady: 'Strona może rzadziej pojawiać się w odpowiedziach Claude z wyszukiwaniem.',
    skutekBlokadyEn: 'The site may appear less often in Claude answers that use search.',
  },
  {
    nazwa: 'Google-Extended', token: 'google-extended', firma: 'Google', rola: 'Gemini (trening i grounding)', rolaEn: 'Gemini (training and grounding)',
    ua: null,
    skutekBlokady: 'Google nie użyje treści w Gemini. Według Google nie wpływa to na wyniki wyszukiwania.',
    skutekBlokadyEn: 'Google will not use your content in Gemini. According to Google, this does not affect search results.',
  },
  {
    nazwa: 'Bingbot', token: 'bingbot', firma: 'Microsoft', rola: 'indeks Bing', rolaEn: 'Bing index',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36',
    skutekBlokady: 'Strona wypadnie z indeksu Bing.',
    skutekBlokadyEn: 'The site will drop out of the Bing index.',
  },
];

export class BladZadania extends Error {
  constructor(status, komunikat) {
    super(komunikat);
    this.status = status;
  }
}

// --- Adresy IP ------------------------------------------------------------------------------

function prywatnyV4(ip) {
  const o = ip.split('.').map(Number);
  if (o.length !== 4 || o.some((x) => !Number.isInteger(x) || x < 0 || x > 255)) return true;
  const [a, b, c] = o;
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0 && (c === 0 || c === 2)) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113)
  );
}

// IPv6 -> 8 liczb (obsługuje skrót :: i końcówkę w zapisie IPv4).
function grupyV6(ip) {
  let s = ip.toLowerCase().split('%')[0];
  const v4 = /(\d+\.\d+\.\d+\.\d+)$/.exec(s);
  if (v4) {
    const o = v4[1].split('.').map(Number);
    s = s.slice(0, -v4[1].length) + `${((o[0] << 8) | o[1]).toString(16)}:${((o[2] << 8) | o[3]).toString(16)}`;
  }
  const [lewa, prawa] = s.split('::');
  const l = lewa ? lewa.split(':') : [];
  const p = prawa !== undefined ? (prawa ? prawa.split(':') : []) : [];
  const brak = s.includes('::') ? 8 - l.length - p.length : 0;
  const wszystkie = [...l, ...Array(Math.max(brak, 0)).fill('0'), ...p];
  if (wszystkie.length !== 8) return null;
  return wszystkie.map((g) => parseInt(g || '0', 16));
}

function prywatnyV6(ip) {
  const g = grupyV6(ip);
  if (!g || g.some((x) => Number.isNaN(x))) return true;
  // ::ffff:a.b.c.d (IPv4 w IPv6) i 64:ff9b::/96 (NAT64) - sprawdzamy osadzony IPv4.
  const zeraDo5 = g.slice(0, 5).every((x) => x === 0);
  if ((zeraDo5 && g[5] === 0xffff) || (g[0] === 0x64 && g[1] === 0xff9b && g.slice(2, 6).every((x) => x === 0))) {
    return prywatnyV4(`${g[6] >> 8}.${g[6] & 255}.${g[7] >> 8}.${g[7] & 255}`);
  }
  if ((g[0] & 0xe000) !== 0x2000) return true; // poza globalnym unicastem (::1, fc00::/7, fe80::/10, ff00::/8...)
  if (g[0] === 0x2001 && (g[1] === 0x0db8 || g[1] === 0)) return true; // dokumentacja, Teredo
  if (g[0] === 0x2002) return true; // 6to4
  return false;
}

/** true dla adresu, z którym generator nie może się łączyć (sieć prywatna, loopback, metadane chmury...). */
export function ipZablokowany(ip) {
  const typ = net.isIP(ip);
  if (typ === 4) return prywatnyV4(ip);
  if (typ === 6) return prywatnyV6(ip);
  return true;
}

function bladPrywatny() {
  const e = new Error('Adres prowadzi do sieci prywatnej');
  e.code = 'EPRYWATNY';
  return e;
}

// lookup dla node:http - sprawdza adresy w chwili łączenia (ochrona przed DNS rebinding).
// Node 20+ woła lookup z options.all = true (autoSelectFamily), starsze z pojedynczym adresem.
function bezpiecznyLookup(hostname, options, callback) {
  const opcje = typeof options === 'object' && options ? options : {};
  dns.lookup(hostname, { all: true, verbatim: true }, (err, adresy) => {
    if (err) return callback(err);
    if (!adresy.length || adresy.some((a) => ipZablokowany(a.address))) return callback(bladPrywatny());
    if (opcje.all) return callback(null, adresy);
    return callback(null, adresy[0].address, adresy[0].family);
  });
}

function hostBezNawiasow(hostname) {
  return hostname.replace(/^\[|\]$/g, '');
}

/** Sprawdza adres przed każdym zapytaniem: protokół, port, login, nazwa hosta i IP wpisane wprost. */
function adresDozwolony(u) {
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
  if (u.username || u.password) return false;
  if (u.port && u.port !== '80' && u.port !== '443') return false;
  const host = hostBezNawiasow(u.hostname).toLowerCase();
  if (net.isIP(host)) return !ipZablokowany(host);
  if (host === 'localhost' || /\.(localhost|local|internal|lan|home|intranet)$/.test(host)) return false;
  return host.includes('.');
}

/**
 * Wejście użytkownika -> adres strony głównej (URL). Rzuca BladZadania(400) dla złego adresu
 * albo adresu w sieci prywatnej (kryterium N1: 127.0.0.1 i 169.254.169.254 = 400).
 */
export async function przygotujAdres(wejscie, lang = 'pl') {
  const en = lang === 'en';
  let s = String(wejscie ?? '').trim();
  if (!s) throw new BladZadania(400, en ? 'Enter a website address, e.g. company.com.' : 'Podaj adres strony, np. firma.pl.');
  if (s.length > 300) throw new BladZadania(400, en ? 'The address is too long.' : 'Adres jest za długi.');
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = `https://${s}`;
  let u;
  try {
    u = new URL(s);
  } catch {
    throw new BladZadania(400, en ? 'That does not look like a website address. Enter e.g. company.com.' : 'To nie wygląda na adres strony. Wpisz np. firma.pl.');
  }
  if (!adresDozwolony(u)) {
    throw new BladZadania(400, en ? 'We only check public websites at http(s) addresses on a standard port, with no local or private addresses.' : 'Sprawdzamy tylko publiczne strony pod adresem http(s) na standardowym porcie, bez adresów lokalnych i prywatnych.');
  }
  const host = hostBezNawiasow(u.hostname);
  if (!net.isIP(host)) {
    let adresy;
    try {
      adresy = await dns.promises.lookup(host, { all: true, verbatim: true });
    } catch {
      throw new BladZadania(400, en ? 'We could not find that domain. Check the spelling of the address.' : 'Nie znaleźliśmy takiej domeny. Sprawdź pisownię adresu.');
    }
    if (!adresy.length || adresy.some((a) => ipZablokowany(a.address))) {
      throw new BladZadania(400, en ? 'That address points to a private network. We only check public websites.' : 'Ten adres prowadzi do sieci prywatnej. Sprawdzamy tylko publiczne strony.');
    }
  }
  return new URL(`${u.protocol}//${u.host}/`);
}

// --- Pobieranie -----------------------------------------------------------------------------

function dekompresor(kodowanie) {
  const k = String(kodowanie || '').toLowerCase().trim();
  if (k === 'gzip' || k === 'x-gzip') return zlib.createGunzip();
  if (k === 'deflate') return zlib.createInflate();
  if (k === 'br') return zlib.createBrotliDecompress();
  return null;
}

/**
 * Jedno zapytanie bez podążania za przekierowaniem. Zwraca zawsze obiekt (nigdy nie rzuca):
 * { kod, naglowki, cialo: Buffer|null, uciete, blad }. cialo = null dla HEAD i maxBajtow 0.
 */
export function pobierz(adres, { metoda = 'GET', ua = UA_GENERATORA, timeoutMs = LIMITY.timeoutMs, maxBajtow = LIMITY.maxBajtowHtml, agenci, accept = '*/*' } = {}) {
  return new Promise((resolve) => {
    let u;
    try {
      u = new URL(adres);
    } catch {
      resolve({ kod: 0, naglowki: {}, cialo: null, blad: 'zły adres' });
      return;
    }
    if (!adresDozwolony(u)) {
      resolve({ kod: 0, naglowki: {}, cialo: null, blad: 'adres niedozwolony' });
      return;
    }
    const modul = u.protocol === 'https:' ? https : http;
    let zakonczone = false;
    const koniec = (wynik) => {
      if (zakonczone) return;
      zakonczone = true;
      clearTimeout(zegar);
      resolve(wynik);
    };
    const req = modul.request(u, {
      method: metoda,
      headers: {
        'user-agent': ua,
        accept,
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en;q=0.7',
      },
      lookup: bezpiecznyLookup,
      agent: agenci ? agenci[u.protocol] : false,
    });
    const zegar = setTimeout(() => {
      req.destroy(new Error('timeout'));
      koniec({ kod: 0, naglowki: {}, cialo: null, blad: 'timeout' });
    }, Math.max(timeoutMs, 1));

    req.on('error', (e) => {
      koniec({ kod: 0, naglowki: {}, cialo: null, blad: e && e.code === 'EPRYWATNY' ? 'adres prywatny' : (e && e.message === 'timeout' ? 'timeout' : 'błąd połączenia') });
    });
    req.on('response', (res) => {
      const wynik = { kod: res.statusCode || 0, naglowki: res.headers, cialo: null, uciete: false, blad: null };
      if (metoda === 'HEAD') {
        // HEAD nie ma treści: resume() zwalnia gniazdo do ponownego użycia (keep-alive).
        res.resume();
        koniec(wynik);
        return;
      }
      if (maxBajtow === 0 || (res.statusCode >= 300 && res.statusCode < 400)) {
        // Wystarczą nagłówki: zrywamy połączenie zamiast pobierać treść.
        res.destroy();
        koniec(wynik);
        return;
      }
      const dek = dekompresor(res.headers['content-encoding']);
      const strumien = dek ? res.pipe(dek) : res;
      const kawalki = [];
      let razem = 0;
      const zamknij = (uciete) => {
        wynik.cialo = Buffer.concat(kawalki);
        wynik.uciete = uciete;
        res.destroy();
        if (dek) dek.destroy();
        koniec(wynik);
      };
      strumien.on('data', (k) => {
        if (zakonczone) return;
        const brakuje = maxBajtow - razem;
        if (k.length >= brakuje) {
          kawalki.push(k.subarray(0, brakuje));
          razem = maxBajtow;
          zamknij(true);
          return;
        }
        kawalki.push(k);
        razem += k.length;
      });
      strumien.on('end', () => zamknij(false));
      strumien.on('error', () => zamknij(true));
      res.on('aborted', () => zamknij(true));
    });
    req.end();
  });
}

/** GET z ręcznym podążaniem za przekierowaniami (każdy krok sprawdzany jak pierwszy). */
async function pobierzZPrzekierowaniami(adres, opcje, czyHostDozwolony = () => true) {
  let biezacy = adres;
  const lancuch = [];
  for (let i = 0; i <= LIMITY.maxPrzekierowan; i += 1) {
    const w = await opcje.czas(biezacy);
    if (!(w.kod >= 300 && w.kod < 400 && w.naglowki.location)) return { ...w, url: biezacy, lancuch };
    let nastepny;
    try {
      nastepny = new URL(w.naglowki.location, biezacy).toString();
    } catch {
      return { ...w, url: biezacy, lancuch };
    }
    if (!czyHostDozwolony(new URL(nastepny))) return { ...w, url: biezacy, lancuch, blad: 'przekierowanie poza stronę' };
    lancuch.push({ z: biezacy, kod: w.kod });
    biezacy = nastepny;
  }
  return { kod: 0, naglowki: {}, cialo: null, url: biezacy, lancuch, blad: 'za dużo przekierowań' };
}

// --- Tekst i HTML ---------------------------------------------------------------------------

const ENCJE = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…',
  laquo: '«', raquo: '»', bdquo: '„', rdquo: '”', ldquo: '“', rsquo: '’', lsquo: '‘', copy: '©', reg: '®',
  oacute: 'ó', Oacute: 'Ó', middot: '·', bull: '•',
};

export function dekodujEncje(s) {
  return String(s || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (cale, k) => {
    if (k[0] === '#') {
      const n = k[1] === 'x' || k[1] === 'X' ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
      try {
        return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : cale;
      } catch {
        return cale;
      }
    }
    return ENCJE[k] ?? ENCJE[k.toLowerCase()] ?? cale;
  });
}

const czysc = (s) => dekodujEncje(s).replace(/\s+/g, ' ').trim();

function dekodujTekst(bufor, contentType) {
  if (!bufor || !bufor.length) return '';
  let charset = /charset=["']?([\w-]+)/i.exec(contentType || '')?.[1];
  if (!charset) charset = /<meta[^>]+charset=["']?([\w-]+)/i.exec(bufor.subarray(0, 2048).toString('latin1'))?.[1];
  try {
    return new TextDecoder((charset || 'utf-8').toLowerCase()).decode(bufor);
  } catch {
    return new TextDecoder('utf-8').decode(bufor);
  }
}

/** Tytuł, opis, meta robots i nazwa serwisu z początku dokumentu HTML. */
export function metaZHtml(html) {
  const wynik = { tytul: '', opis: '', robots: '', nazwaSerwisu: '', ogTytul: '', ogOpis: '' };
  const t = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (t) wynik.tytul = czysc(t[1]);
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const atr = {};
    for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
      atr[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? '';
    }
    const klucz = (atr.name || atr.property || '').toLowerCase();
    const tresc = czysc(atr.content || '');
    if (klucz === 'description' && !wynik.opis) wynik.opis = tresc;
    else if (klucz === 'robots') wynik.robots = `${wynik.robots} ${tresc}`.trim().toLowerCase();
    else if (klucz === 'og:site_name' && !wynik.nazwaSerwisu) wynik.nazwaSerwisu = tresc;
    else if (klucz === 'og:title' && !wynik.ogTytul) wynik.ogTytul = tresc;
    else if (klucz === 'og:description' && !wynik.ogOpis) wynik.ogOpis = tresc;
  }
  return wynik;
}

// --- robots.txt (RFC 9309) ------------------------------------------------------------------

/** Grupy reguł i wpisy Sitemap z pliku robots.txt. */
export function parsujRobots(tekst) {
  const grupy = [];
  const sitemapy = [];
  let biezaca = null;
  let poUserAgent = false;
  for (const surowa of String(tekst || '').split(/\r\n|\r|\n/)) {
    const linia = surowa.replace(/#.*$/, '').trim();
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(linia);
    if (!m) continue;
    const pole = m[1].toLowerCase();
    const wartosc = m[2].trim();
    if (pole === 'user-agent') {
      if (!biezaca || !poUserAgent) {
        biezaca = { agenci: [], reguly: [] };
        grupy.push(biezaca);
      }
      biezaca.agenci.push(wartosc.toLowerCase());
      poUserAgent = true;
    } else if (pole === 'allow' || pole === 'disallow') {
      if (biezaca) biezaca.reguly.push({ typ: pole, wzor: wartosc });
      poUserAgent = false;
    } else if (pole === 'sitemap') {
      if (wartosc) sitemapy.push(wartosc);
    }
  }
  return { grupy, sitemapy };
}

function wzorDoRegex(wzor) {
  const kotwica = wzor.endsWith('$');
  const rdzen = (kotwica ? wzor.slice(0, -1) : wzor)
    .split('*')
    .map((c) => c.replace(/[.+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*');
  return new RegExp(`^${rdzen}${kotwica ? '$' : ''}`);
}

/** Reguły obowiązujące bota: wszystkie grupy z jego tokenem, a bez nich grupy „*” (RFC 9309, 2.2.1). */
function regulyBota(robots, token) {
  const pasuje = (a) => a === token || a.startsWith(`${token}/`);
  const wlasne = robots.grupy.filter((g) => g.agenci.some(pasuje));
  const grupy = wlasne.length ? wlasne : robots.grupy.filter((g) => g.agenci.includes('*'));
  return { reguly: grupy.flatMap((g) => g.reguly), wlasnaGrupa: wlasne.length > 0 };
}

/** Czy ścieżka jest dozwolona: najdłuższy pasujący wzór wygrywa, przy remisie Allow (RFC 9309, 2.2.2). */
export function sprawdzSciezke(robots, token, sciezka) {
  const { reguly, wlasnaGrupa } = regulyBota(robots, token);
  let najlepsza = null;
  for (const r of reguly) {
    if (!r.wzor) continue; // pusty Disallow nic nie blokuje
    let s = sciezka;
    try {
      s = decodeURI(sciezka);
    } catch { /* zostaje surowa */ }
    if (!wzorDoRegex(r.wzor).test(sciezka) && !wzorDoRegex(r.wzor).test(s)) continue;
    if (!najlepsza || r.wzor.length > najlepsza.wzor.length || (r.wzor.length === najlepsza.wzor.length && r.typ === 'allow')) {
      najlepsza = r;
    }
  }
  return {
    dozwolona: !najlepsza || najlepsza.typ === 'allow',
    regula: najlepsza ? `${najlepsza.typ === 'allow' ? 'Allow' : 'Disallow'}: ${najlepsza.wzor}` : null,
    wlasnaGrupa,
  };
}

// --- Mapa strony ----------------------------------------------------------------------------

function tekstMapy(bufor) {
  if (!bufor || !bufor.length) return '';
  let b = bufor;
  if (b[0] === 0x1f && b[1] === 0x8b) {
    // sitemap.xml.gz bez nagłówka Content-Encoding; Z_SYNC_FLUSH pozwala czytać uciętą końcówkę
    try {
      b = zlib.gunzipSync(b, { finishFlush: zlib.constants.Z_SYNC_FLUSH });
    } catch {
      return '';
    }
  }
  return b.toString('utf-8');
}

export function adresyZMapy(tekst) {
  const lokacje = [];
  for (const m of tekst.matchAll(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\]]+?)\s*(?:\]\]>)?\s*<\/loc>/gi)) {
    lokacje.push(dekodujEncje(m[1]).trim());
  }
  return { indeks: /<sitemapindex[\s>]/i.test(tekst), lokacje };
}

const bezWww = (h) => hostBezNawiasow(h).toLowerCase().replace(/^www\./, '');

// --- llms.txt -------------------------------------------------------------------------------

const SEPARATORY = /\s+[|–—•·-]\s+|\s*\|\s*/;

function segmentyTytulu(t) {
  return String(t || '').split(SEPARATORY).map((s) => s.trim()).filter(Boolean);
}

/** Nazwa marki: og:site_name albo fragment tytułu, który powtarza się w co najmniej połowie tytułów. */
export function nazwaMarki({ nazwaSerwisu, tytuly, host }) {
  if (nazwaSerwisu) return nazwaSerwisu;
  const licznik = new Map();
  for (const t of tytuly) {
    for (const s of new Set(segmentyTytulu(t))) licznik.set(s, (licznik.get(s) || 0) + 1);
  }
  let najlepsza = null;
  for (const [s, n] of licznik) {
    if (n >= 2 && n >= tytuly.length / 2 && (!najlepsza || n > najlepsza[1])) najlepsza = [s, n];
  }
  return najlepsza ? najlepsza[0] : bezWww(host);
}

function nazwaLinku(tytul, marka, url, lang = 'pl') {
  let segmenty = segmentyTytulu(tytul);
  if (segmenty.length > 1 && marka) segmenty = segmenty.filter((s) => s.toLowerCase() !== marka.toLowerCase());
  let nazwa = segmenty.join(' – ');
  if (!nazwa) {
    const ostatni = new URL(url).pathname.split('/').filter(Boolean).pop() || '';
    let slug = ostatni;
    try {
      slug = decodeURIComponent(ostatni);
    } catch { /* zostaje */ }
    nazwa = slug.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim() || (lang === 'en' ? 'Home page' : 'Strona główna');
    nazwa = nazwa.charAt(0).toUpperCase() + nazwa.slice(1);
  }
  return nazwa.replace(/\[/g, '(').replace(/\]/g, ')').slice(0, 120);
}

function skroc(s, max) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const ciecie = t.slice(0, max - 1);
  const spacja = ciecie.lastIndexOf(' ');
  return `${(spacja > max * 0.6 ? ciecie.slice(0, spacja) : ciecie).replace(/[\s,;:.–-]+$/, '')}…`;
}

function nazwaSekcji(segment, lang = 'pl') {
  if (/^[a-z]{2}(-[a-z]{2})?$/i.test(segment)) return `${lang === 'en' ? 'Version' : 'Wersja'} ${segment.toUpperCase()}`;
  let s = segment;
  try {
    s = decodeURIComponent(segment);
  } catch { /* zostaje */ }
  s = s.replace(/[-_]+/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Plik w formacie llmstxt.org: „# Nazwa”, „> opis”, sekcje „## …” z wierszami „- [Tytuł](url): opis”.
 * Sekcje według pierwszego segmentu ścieżki, gdy ma co najmniej 2 podstrony; reszta w „Strony”.
 */
export function zbudujLlmsTxt({ marka, opis, wpisy, lang = 'pl' }) {
  const segment = (url) => new URL(url).pathname.split('/').filter(Boolean)[0] || '';
  const ilePod = new Map();
  for (const w of wpisy) {
    const czesci = new URL(w.url).pathname.split('/').filter(Boolean);
    if (czesci.length >= 2) ilePod.set(czesci[0], (ilePod.get(czesci[0]) || 0) + 1);
  }
  const sekcje = new Map([['', []]]);
  for (const w of wpisy) {
    const seg = segment(w.url);
    const klucz = (ilePod.get(seg) || 0) >= 2 ? seg : '';
    if (!sekcje.has(klucz)) sekcje.set(klucz, []);
    sekcje.get(klucz).push(w);
  }
  const linie = [`# ${marka}`, ''];
  if (opis) linie.push(`> ${skroc(opis, 300)}`, '');
  for (const [klucz, lista] of sekcje) {
    if (!lista.length) continue;
    linie.push(`## ${klucz ? nazwaSekcji(klucz, lang) : (lang === 'en' ? 'Pages' : 'Strony')}`, '');
    for (const w of lista) {
      const o = w.opis ? `: ${skroc(w.opis, 200)}` : '';
      linie.push(`- [${nazwaLinku(w.tytul, marka, w.url, lang)}](${w.url})${o}`);
    }
    linie.push('');
  }
  return `${linie.join('\n').trim()}\n`;
}

// --- Test botów -----------------------------------------------------------------------------

const KODY_BLOKADY = new Set([401, 403, 406, 429, 451, 503]);

function wniosekBota(bot, robotsStan, wynikRobots, kod, kodPrzegladarki, blad, lang = 'pl') {
  const en = lang === 'en';
  if (robotsStan === 'niedostepny') {
    return { ocena: 'blad', tekst: en ? 'robots.txt returns a server error or does not respond. Under RFC 9309, bots may then assume they are not allowed to fetch anything.' : 'robots.txt odpowiada błędem serwera albo nie odpowiada. Według RFC 9309 boty mogą wtedy uznać, że nie wolno pobierać niczego.' };
  }
  if (!wynikRobots.dozwolona) {
    return { ocena: 'blad', tekst: en ? `Blocked in robots.txt. ${bot.skutekBlokadyEn}` : `Zablokowany w robots.txt. ${bot.skutekBlokady}` };
  }
  if (!bot.ua) {
    return { ocena: 'ok', tekst: en ? 'Allowed in robots.txt. Google-Extended has no separate User-Agent, so the HTTP test does not apply.' : 'Dozwolony w robots.txt. Google-Extended nie ma osobnego User-Agenta, więc test HTTP nie dotyczy.' };
  }
  if (blad) return { ocena: 'uwaga', tekst: blad === 'timeout' ? (en ? 'No response within 4 s. Check again.' : 'Brak odpowiedzi w 4 s. Sprawdź ponownie.') : (en ? 'Could not connect. Check again.' : 'Nie udało się połączyć. Sprawdź ponownie.') };
  if (kod >= 200 && kod < 300) return { ocena: 'ok', tekst: en ? 'Access OK: robots.txt allows it and the page returns code 200.' : 'Dostęp OK: robots.txt pozwala, a strona odpowiada kodem 200.' };
  if (kod >= 300 && kod < 400) return { ocena: 'uwaga', tekst: en ? `The bot gets a redirect (${kod}) while a browser does not. Check the server rules for this User-Agent.` : `Bot dostaje przekierowanie (${kod}), choć przeglądarka nie. Sprawdź reguły serwera dla tego User-Agenta.` };
  if (kodPrzegladarki >= 200 && kodPrzegladarki < 300 && (KODY_BLOKADY.has(kod) || kod >= 400)) {
    return { ocena: 'blad', tekst: en ? `robots.txt allows it, but the server or CDN returns code ${kod} to the bot and 200 to a browser. Check your firewall (WAF) and bot protection settings.` : `robots.txt pozwala, ale serwer albo CDN odpowiada botowi kodem ${kod}, a przeglądarce 200. Sprawdź zaporę (WAF) i ustawienia ochrony przed botami.` };
  }
  return { ocena: 'uwaga', tekst: en ? `The page returns code ${kod} to a browser as well. Fix the home page first.` : `Strona odpowiada kodem ${kod} także przeglądarce. Najpierw napraw stronę główną.` };
}

// --- Główna funkcja -------------------------------------------------------------------------

/** Pula zadań: maks. n naraz; zadanie startuje tylko, gdy zostało ≥ 0,5 s do limitu globalnego. */
async function pula(zadania, n, termin) {
  const wyniki = new Array(zadania.length).fill(null);
  let i = 0;
  async function pracownik() {
    while (i < zadania.length) {
      const idx = i;
      i += 1;
      if (termin - Date.now() < 500) continue;
      wyniki[idx] = await zadania[idx]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, zadania.length) }, pracownik));
  return wyniki;
}

/**
 * Generuje llms.txt i test botów dla strony. Zwraca obiekt JSON dla klienta (bez zapisu czegokolwiek).
 * start = Date.now() z początku obsługi zapytania (limit globalny liczony od niego).
 */
export async function generuj(wejscie, { start = Date.now(), lang = 'pl' } = {}) {
  const en = lang === 'en';
  const termin = start + LIMITY.limitGlobalnyMs;
  const zostalo = () => termin - Date.now();
  const timeout = () => Math.max(Math.min(LIMITY.timeoutMs, zostalo()), 1);

  const strona = await przygotujAdres(wejscie, lang);
  const agenci = {
    'http:': new http.Agent({ keepAlive: true, maxSockets: LIMITY.wspolbieznosc }),
    'https:': new https.Agent({ keepAlive: true, maxSockets: LIMITY.wspolbieznosc }),
  };

  try {
    // 1. Strona główna jak w przeglądarce (punkt odniesienia testu botów, nazwa i opis do pliku).
    const glowna = await pobierzZPrzekierowaniami(strona.toString(), {
      czas: (adres) => pobierz(adres, { ua: UA_PRZEGLADARKI, timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtowHtml, agenci, accept: 'text/html,*/*;q=0.8' }),
    });
    if (glowna.blad === 'adres niedozwolony' || glowna.blad === 'adres prywatny') {
      throw new BladZadania(400, en ? 'The site redirects to a private network. We only check public websites.' : 'Strona przekierowuje do sieci prywatnej. Sprawdzamy tylko publiczne strony.');
    }
    if (!glowna.kod) {
      throw new BladZadania(502, glowna.blad === 'timeout'
        ? (en ? 'The site did not respond within 4 s. Check the address and try again.' : 'Strona nie odpowiedziała w 4 s. Sprawdź adres i spróbuj ponownie.')
        : (en ? 'Could not connect to the site. Check the address and try again.' : 'Nie udało się połączyć ze stroną. Sprawdź adres i spróbuj ponownie.'));
    }
    const glownaUrl = new URL(glowna.url);
    const hostStrony = bezWww(glownaUrl.hostname);
    const tenSamHost = (u) => (u.protocol === 'http:' || u.protocol === 'https:') && bezWww(u.hostname) === hostStrony;
    const metaGlownej = glowna.cialo ? metaZHtml(dekodujTekst(glowna.cialo, glowna.naglowki['content-type'])) : metaZHtml('');
    const origin = glownaUrl.origin;

    // 2. robots.txt (RFC 9309: przekierowania do 5 kroków, 4xx = brak ograniczeń, 5xx = pełny zakaz).
    const robotsOdp = await pobierzZPrzekierowaniami(`${origin}/robots.txt`, {
      czas: (adres) => pobierz(adres, { timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtowRobots, agenci, accept: 'text/plain,*/*;q=0.8' }),
    }, tenSamHost);
    let robotsStan = 'brak';
    let robots = { grupy: [], sitemapy: [] };
    if (robotsOdp.kod >= 200 && robotsOdp.kod < 300) {
      robotsStan = 'jest';
      robots = parsujRobots(dekodujTekst(robotsOdp.cialo, 'text/plain; charset=utf-8'));
    } else if (!robotsOdp.kod || robotsOdp.kod >= 500) {
      robotsStan = 'niedostepny';
    }

    // 3. Test botów (strona główna z UA bota) równolegle z mapą strony.
    const testBotow = Promise.all(BOTY.map(async (bot) => {
      const wynikRobots = sprawdzSciezke(robots, bot.token, glownaUrl.pathname || '/');
      let kod = null;
      let blad = null;
      if (bot.ua && zostalo() > 500) {
        const w = await pobierz(glowna.url, { ua: bot.ua, timeoutMs: timeout(), maxBajtow: 0, agenci, accept: 'text/html,*/*;q=0.8' });
        kod = w.kod || null;
        blad = w.blad;
      }
      return { bot, wynikRobots, kod, blad };
    }));

    const mapa = (async () => {
      const kandydaci = robots.sitemapy
        .map((s) => { try { return new URL(s, origin); } catch { return null; } })
        .filter((u) => u && tenSamHost(u))
        .slice(0, 3)
        .map((u) => u.toString());
      if (!kandydaci.length) kandydaci.push(`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`, `${origin}/wp-sitemap.xml`);
      const lokacje = [];
      let zrodlo = null;
      let razem = 0;
      for (const kandydat of kandydaci) {
        if (zostalo() < 1000 || lokacje.length >= LIMITY.maxUrli * 4) break;
        const odp = await pobierzZPrzekierowaniami(kandydat, {
          czas: (adres) => pobierz(adres, { timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtow, agenci, accept: 'application/xml,text/xml,*/*;q=0.8' }),
        }, tenSamHost);
        if (!(odp.kod >= 200 && odp.kod < 300)) continue;
        const { indeks, lokacje: znalezione } = adresyZMapy(tekstMapy(odp.cialo));
        if (!znalezione.length) continue;
        zrodlo = zrodlo || odp.url;
        if (!indeks) {
          lokacje.push(...znalezione);
          razem += znalezione.length;
          continue;
        }
        // Indeks map: 1 poziom w głąb, maks. 5 map podrzędnych, aż do zebrania adresów.
        const podrzedne = znalezione.filter((s) => { try { return tenSamHost(new URL(s)); } catch { return false; } }).slice(0, LIMITY.maxMapPodrzednych);
        for (const pod of podrzedne) {
          if (zostalo() < 1000 || lokacje.length >= LIMITY.maxUrli * 4) break;
          const o = await pobierzZPrzekierowaniami(pod, {
            czas: (adres) => pobierz(adres, { timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtow, agenci, accept: 'application/xml,text/xml,*/*;q=0.8' }),
          }, tenSamHost);
          if (!(o.kod >= 200 && o.kod < 300)) continue;
          const z = adresyZMapy(tekstMapy(o.cialo));
          if (!z.indeks) {
            lokacje.push(...z.lokacje);
            razem += z.lokacje.length;
          }
        }
      }
      return { lokacje, zrodlo, razem };
    })();

    // Obecny plik /llms.txt strony (FAQ N1: „po wdrożeniu sprawdź go w generatorze”). Bez podążania
    // za przekierowaniem: plik za przekierowaniem raportujemy jako osobny przypadek.
    const obecny = (async () => {
      if (zostalo() < 1000) return null;
      const o = await pobierz(`${origin}/llms.txt`, { timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtowHtml, agenci, accept: 'text/plain,text/markdown,*/*;q=0.8' });
      if (!o.kod) return { kod: null, blad: o.blad };
      const typ = String(o.naglowki['content-type'] || '').split(';')[0].trim() || null;
      if (o.kod >= 300 && o.kod < 400) return { kod: o.kod, typ, przekierowanie: o.naglowki.location || null };
      if (o.kod !== 200) return { kod: o.kod, typ };
      const tekst = dekodujTekst(o.cialo, 'text/plain; charset=utf-8').replace(/^\uFEFF/, '');
      // Rozmiar po dekompresji (Content-Length przy gzip/br to rozmiar skompresowany);
      // ucięty odczyt = plik większy niż 64 KB.
      return {
        kod: 200,
        typ,
        bajty: o.cialo ? o.cialo.length : 0,
        wiecejNiz: Boolean(o.uciete),
        naglowekH1: /^#\s+\S/.test(tekst.trimStart()),
        html: /^\s*<(!doctype|html)/i.test(tekst),
      };
    })();

    const [boty, { lokacje, zrodlo: mapaZrodlo, razem: wMapie }, obecnyPlik] = await Promise.all([testBotow, mapa, obecny]);

    // 4. Adresy do sprawdzenia: ta sama domena, bez duplikatów, maks. 50.
    const pominiete = [];
    const widziane = new Set();
    const doSprawdzenia = [];
    for (const surowy of lokacje) {
      let u;
      try {
        u = new URL(surowy);
      } catch {
        continue;
      }
      u.hash = '';
      const klucz = u.toString();
      if (widziane.has(klucz)) continue;
      widziane.add(klucz);
      if (!tenSamHost(u)) {
        pominiete.push({ url: klucz, powod: en ? 'different domain' : 'inna domena' });
        continue;
      }
      if (doSprawdzenia.length < LIMITY.maxUrli) doSprawdzenia.push(klucz);
    }
    if (!doSprawdzenia.length && glowna.kod >= 200 && glowna.kod < 300) doSprawdzenia.push(glowna.url);

    // 5. Każdy adres: HEAD (kod, przekierowanie, X-Robots-Tag), potem ucięty GET (tytuł, opis, meta robots).
    const zadania = doSprawdzenia.map((url) => async () => {
      let glowa = await pobierz(url, { metoda: 'HEAD', timeoutMs: timeout(), agenci, accept: 'text/html,*/*;q=0.8' });
      const bezHead = glowa.kod === 405 || glowa.kod === 501 || (!glowa.kod && glowa.blad !== 'timeout');
      if (bezHead) glowa = null;
      if (glowa) {
        if (!glowa.kod) return { url, powod: en ? 'no response within 4 s' : 'brak odpowiedzi w 4 s' };
        if (glowa.kod >= 300 && glowa.kod < 400) return { url, powod: en ? `redirect (${glowa.kod})` : `przekierowanie (${glowa.kod})` };
        if (glowa.kod !== 200) return { url, powod: en ? `code ${glowa.kod}` : `kod ${glowa.kod}` };
        if (/noindex/i.test(String(glowa.naglowki['x-robots-tag'] || ''))) return { url, powod: en ? 'noindex (X-Robots-Tag header)' : 'noindex (nagłówek X-Robots-Tag)' };
        const typHead = String(glowa.naglowki['content-type'] || '');
        if (typHead && !/html/i.test(typHead)) return { url, powod: en ? `not an HTML page (${typHead.split(';')[0]})` : `nie jest stroną HTML (${typHead.split(';')[0]})` };
      }
      if (zostalo() < 500) return { url, nieprzetworzony: true };
      const odpGet = await pobierz(url, { timeoutMs: timeout(), maxBajtow: LIMITY.maxBajtowHtml, agenci, accept: 'text/html,*/*;q=0.8' });
      if (!odpGet.kod) return { url, powod: odpGet.blad === 'timeout' ? (en ? 'no response within 4 s' : 'brak odpowiedzi w 4 s') : (en ? 'connection error' : 'błąd połączenia') };
      if (odpGet.kod >= 300 && odpGet.kod < 400) return { url, powod: en ? `redirect (${odpGet.kod})` : `przekierowanie (${odpGet.kod})` };
      if (odpGet.kod !== 200) return { url, powod: en ? `code ${odpGet.kod}` : `kod ${odpGet.kod}` };
      if (/noindex/i.test(String(odpGet.naglowki['x-robots-tag'] || ''))) return { url, powod: en ? 'noindex (X-Robots-Tag header)' : 'noindex (nagłówek X-Robots-Tag)' };
      const typ = String(odpGet.naglowki['content-type'] || '');
      if (typ && !/html/i.test(typ)) return { url, powod: en ? `not an HTML page (${typ.split(';')[0]})` : `nie jest stroną HTML (${typ.split(';')[0]})` };
      const meta = metaZHtml(dekodujTekst(odpGet.cialo, typ));
      if (/noindex|\bnone\b/.test(meta.robots)) return { url, powod: en ? 'noindex (meta robots)' : 'noindex (meta robots)' };
      return { url, wpis: { url, tytul: meta.tytul || meta.ogTytul, opis: meta.opis || meta.ogOpis } };
    });
    const wyniki = await pula(zadania, LIMITY.wspolbieznosc, termin);

    const wpisy = [];
    const nieprzetworzone = [];
    wyniki.forEach((w, i) => {
      if (!w || w.nieprzetworzony) nieprzetworzone.push(doSprawdzenia[i]);
      else if (w.wpis) wpisy.push(w.wpis);
      else pominiete.push({ url: w.url, powod: w.powod });
    });

    const marka = nazwaMarki({ nazwaSerwisu: metaGlownej.nazwaSerwisu, tytuly: [metaGlownej.tytul, ...wpisy.map((w) => w.tytul)].filter(Boolean), host: glownaUrl.hostname });
    const llmsTxt = zbudujLlmsTxt({ marka, opis: metaGlownej.opis || metaGlownej.ogOpis, wpisy, lang });

    const tabelaBotow = boty.map(({ bot, wynikRobots, kod, blad }) => {
      const w = wniosekBota(bot, robotsStan, wynikRobots, kod, glowna.kod, blad, lang);
      const zablokowaneAdresy = robotsStan === 'jest'
        ? doSprawdzenia.filter((u) => !sprawdzSciezke(robots, bot.token, new URL(u).pathname + new URL(u).search).dozwolona).length
        : 0;
      return {
        nazwa: bot.nazwa,
        firma: bot.firma,
        rola: en ? bot.rolaEn : bot.rola,
        robots: robotsStan === 'niedostepny' ? 'niedostępny' : (wynikRobots.dozwolona ? 'dozwolony' : 'zablokowany'),
        regula: wynikRobots.regula,
        wlasnaGrupa: wynikRobots.wlasnaGrupa,
        zablokowaneAdresy,
        kod: bot.ua ? kod : null,
        testHttp: Boolean(bot.ua),
        ocena: w.ocena,
        wniosek: w.tekst,
      };
    });

    return {
      ok: true,
      strona: origin,
      czesciowy: nieprzetworzone.length > 0,
      czasMs: Date.now() - start,
      robots: { stan: robotsStan, kod: robotsOdp.kod || null },
      mapa: { zrodlo: mapaZrodlo, adresow: wMapie, sprawdzone: doSprawdzenia.length - nieprzetworzone.length, limit: LIMITY.maxUrli },
      kodStronyGlownej: glowna.kod,
      obecnyPlik,
      boty: tabelaBotow,
      llmsTxt,
      wPliku: wpisy.length,
      pominiete: pominiete.slice(0, LIMITY.maxPominietychNaLiscie),
      pominietychRazem: pominiete.length,
      nieprzetworzone,
    };
  } finally {
    agenci['http:'].destroy();
    agenci['https:'].destroy();
  }
}
