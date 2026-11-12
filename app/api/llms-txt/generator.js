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
// 11.11.2026 (A4 §5, benchmark z CommonNinja, SiteSpeakAI, xseek, Firecrawl):
// - indeks map: czytamy do 20 map podrzędnych (wcześniej 5 pierwszych, przez co u nas brakowało
//   /narzedzia, /porownania i ai-en), a limit 50 adresów dzielimy między mapy i sekcje
//   (wybierzAdresy): każda sekcja ma przedstawicieli, strony główne języka głównego mają największą wagę,
// - strony prawne (regulamin, polityki, cookies) trafiają do sekcji „## Optional”
//   ze specyfikacji llmstxt.org (model może ją pominąć przy krótkim kontekście),
// - wersje językowe: prefiks /en, /de... = osobna sekcja stron i osobne sekcje blogu/podsekcji
//   („Wersja EN”, „Blog (EN)”); prefiks języka głównego (np. wszystko pod /pl) jest pomijany przy podziale,
// - nazwy sekcji z polskimi znakami (słownik + słowa z tytułów stron sekcji, np. „Narzędzia”),
// - zastępcy: adres odrzucony (404, przekierowanie, noindex, brak odpowiedzi) zastępujemy kolejnym
//   z tej samej puli (mapa × język × sekcja), maks. 2 razy na adres i tylko przy zapasie czasu,
//   żeby jedna martwa strona nie usuwała z pliku całej sekcji.
// Weryfikacja 11.11.2026 (ten sam dzień): zastępcy dopiero po wszystkich wybranych adresach, maks. 20
// razem i bez nich, gdy odrzucona jest ponad połowa adresów; mapy podrzędne tylko do 10 s od startu,
// każda mapa pobierana raz; wzorce mapy i HTML w czasie liniowym; kontakt nie trafia do „Optional”.
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
  maxBajtowMapyPodrzednej: 512 * 1024,
  maxBajtowHtml: 64 * 1024,
  maxBajtowRobots: 512 * 1024,
  maxPrzekierowan: 5,
  maxMapPodrzednych: 20,
  wspolbieznoscMap: 4,
  maxAdresowZMapy: 5000,
  maxPominietychNaLiscie: 60,
  maxZastepcow: 2,
  // Weryfikacja 11.11.2026: zastępców sprawdzamy dopiero po wszystkich wybranych adresach, najwyżej 20
  // razem i tylko, gdy odrzucona jest co najwyżej połowa adresów (inaczej błąd jest systemowy, np. każda
  // podstrona przekierowuje, i zastępcy tylko wydłużają czas).
  maxZastepcowRazem: 20,
  // Czas zostawiony na sprawdzanie adresów: mapy podrzędne czytamy najwyżej do limitGlobalnyMs minus tyle.
  rezerwaNaStronyMs: 10000,
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
  const wynik = { tytul: '', opis: '', robots: '', nazwaSerwisu: '', ogTytul: '', ogOpis: '', jezyk: '' };
  const t = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (t) wynik.tytul = czysc(t[1]);
  // [^<>]{0,2000}: próba dopasowania kończy się na najbliższym < albo >, więc wiele „<html” bez „>”
  // nie daje czasu kwadratowego (weryfikacja 11.11.2026).
  const j = /<html\b[^<>]{0,2000}?\slang\s*=\s*["']?([a-zA-Z]{2,3}(?:[-_][a-zA-Z0-9]{2,8})?)/i.exec(html);
  if (j) wynik.jezyk = j[1].toLowerCase().replace('_', '-');
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

// Weryfikacja 11.11.2026: wszystkie wzorce mapy działają w czasie liniowym. Mapę przysyła sprawdzana
// strona, więc może być złośliwa albo zepsuta. Dawny wzorzec <loc>\s*…([^<\]]+?)\s*…<\/loc> przy
// <loc> bez zamknięcia i ok. 300 spacjach blokował proces na ponad 25 s (wiele \s* nakładało się
// na tę samą spację). Leniwe <url>…</url> przy 100 tys. niezamkniętych <url> w 512 KB trwało 5,6 s.
const LOC = /<loc>((?:<!\[CDATA\[[^\]<]*\]\]>|[^<])*)<\/loc>/i;
const wartoscLoc = (s) => dekodujEncje(s.replace(/<!\[CDATA\[|\]\]>/g, '')).trim();
const OTWARCIE_BLOKU = /<(?:url|sitemap)(?=[\s/>])[^<>]{0,500}>/gi;

/**
 * Adresy z mapy albo indeksu map. lokacje[i] ma w zmiany[i] datę <lastmod> (ms, 0 = brak),
 * a w priorytety[i] wartość <priority> (0–1, brak = 0,5). Wpisy <image:loc> itp. są pomijane.
 */
export function adresyZMapy(tekst) {
  const lokacje = [];
  const zmiany = [];
  const priorytety = [];
  // Bloki <url>/<sitemap>: tekst dzielimy po znacznikach zamykających, a treść bloku zaczyna się
  // za ostatnim otwarciem w danym kawałku (bez wyszukiwania wstecz, więc czas liniowy).
  const kawalki = tekst.split(/<\/(?:url|sitemap)\s*>/i);
  kawalki.pop(); // za ostatnim zamknięciem nie ma pełnego bloku
  for (const kawalek of kawalki) {
    let od = -1;
    for (const m of kawalek.matchAll(OTWARCIE_BLOKU)) od = m.index + m[0].length;
    if (od < 0) continue;
    const blok = kawalek.slice(od);
    const l = LOC.exec(blok);
    if (!l || !wartoscLoc(l[1])) continue;
    lokacje.push(wartoscLoc(l[1]));
    zmiany.push(Date.parse((/<lastmod>([^<]*)<\/lastmod>/i.exec(blok)?.[1] || '').trim()) || 0);
    const p = Number.parseFloat((/<priority>([^<]*)<\/priority>/i.exec(blok)?.[1] || '').trim());
    priorytety.push(Number.isFinite(p) ? Math.min(Math.max(p, 0), 1) : 0.5);
  }
  if (!lokacje.length) {
    // Mapa bez bloków <url>/<sitemap> (niestandardowa albo ucięta): same <loc>, jak dawniej.
    for (const m of tekst.matchAll(new RegExp(LOC.source, 'gi'))) {
      if (!wartoscLoc(m[1])) continue;
      lokacje.push(wartoscLoc(m[1]));
      zmiany.push(0);
      priorytety.push(0.5);
    }
  }
  return { indeks: /<sitemapindex[\s>]/i.test(tekst), lokacje, zmiany, priorytety };
}

/** n elementów rozłożonych równo po liście (pierwszy i ostatni zawsze), w kolejności listy. */
function rowno(lista, n) {
  if (n >= lista.length) return lista;
  if (n <= 0) return [];
  if (n === 1) return [lista[0]];
  return [...new Set(Array.from({ length: n }, (_, i) => Math.round((i * (lista.length - 1)) / (n - 1))))].map((i) => lista[i]);
}

/**
 * Które mapy podrzędne czytać, gdy indeks ma ich więcej niż `limit`: najpierw po jednej z każdej
 * „rodziny” (post-sitemap.xml, post-sitemap2.xml... to jedna rodzina), a gdy i tak jest ich za dużo,
 * mapy rozłożone równo po indeksie (nie pierwsze N, bo strony ofertowe bywają w ostatnich mapach,
 * np. poradnikprzedsiebiorcy.pl: 20 map artykułów, a „landingPages” na 25. miejscu). Wynik w kolejności indeksu.
 */
export function kolejnoscMap(adresy, limit = Infinity) {
  const rodzina = (a) => a.toLowerCase().replace(/[?#].*$/, '').replace(/[-_]?\d+(?=\.xml(\.gz)?$)/, '');
  const widziane = new Set();
  const pierwsze = [];
  const reszta = [];
  adresy.forEach((a, i) => {
    const r = rodzina(a);
    if (widziane.has(r)) reszta.push(i);
    else {
      widziane.add(r);
      pierwsze.push(i);
    }
  });
  const wybrane = pierwsze.length >= limit ? rowno(pierwsze, limit) : [...pierwsze, ...rowno(reszta, limit - pierwsze.length)];
  return wybrane.sort((a, b) => a - b).map((i) => adresy[i]);
}

const bezWww = (h) => hostBezNawiasow(h).toLowerCase().replace(/^www\./, '');

// --- Sekcje i wybór adresów -----------------------------------------------------------------

// Kody języków rozpoznawane jako prefiks wersji językowej (/en, /de, /pt-br). Lista zamknięta, żeby
// sekcje typu /ai, /ux czy /qa nie stawały się „Wersją AI”.
const JEZYKI = new Set('pl en de fr es it pt nl cs sk uk ru lt lv et fi sv no nb nn da hu ro bg hr sl sr el tr ja zh ko ar he'.split(' '));

/** 'en', 'pt-br' albo '' (segment ścieżki nie jest kodem języka). */
export function jezykSegmentu(segment) {
  const s = String(segment || '').toLowerCase().replace('_', '-');
  const m = /^([a-z]{2})(?:-[a-z]{2,4})?$/.exec(s);
  return m && JEZYKI.has(m[1]) ? s : '';
}

const bazaJezyka = (k) => String(k || '').toLowerCase().split(/[-_]/)[0];

function segmentySciezki(url) {
  try {
    return new URL(url).pathname.split('/').filter(Boolean).map((s) => s.toLowerCase());
  } catch {
    return [];
  }
}

// Strony prawne i cookies: do „## Optional” (llmstxt.org: sekcję Optional model może pominąć).
// Kontakt zostaje w „Strony” (weryfikacja 11.11.2026): adres i telefon to dane, o które ludzie pytają
// asystentów AI, a nasz własny /llms.txt podaje je w „Fakty o firmie”, nie w sekcji drugorzędnej.
// Tylko pierwszy poziom (po prefiksie języka) albo pod rodzicem typu /informacje, żeby usługa
// /uslugi/regulaminy-sklepow ani wpis /blog/polityka-cookies-poradnik nie trafiły do Optional.
const SLUG_OPCJONALNY = /^(polityka-(prywatnosci|cookies?|plikow-cookies?)(-.*)?|prywatnosc|cookies?|ciasteczka|regulamin(-.*)?|warunki-(korzystania|uslug|uzytkowania|sprzedazy)(-.*)?|klauzula-informacyjna(-.*)?|nota-prawna|informacje-prawne|deklaracja-dostepnosci|privacy|privacy-policy|privacy-notice|cookie-policy|cookies-policy|cookie-notice|terms|terms-of-(service|use)|terms-and-conditions|terms-conditions|tos|legal|legal-notice|imprint|impressum|datenschutz(erklaerung)?|agb|disclaimer|accessibility(-statement)?)$/;
const RODZICE_PRAWNI = new Set(['informacje', 'info', 'prawne', 'legal', 'pomoc', 'help', 'o-nas', 'about', 'firma', 'company', 'strona', 'page', 'pages']);
const TYTUL_PRAWNY = /^\s*(polityka (prywatności|cookies|plików cookies)|regulamin|klauzula informacyjna|nota prawna|privacy policy|cookie policy|cookies policy|terms (of|and) |impressum|datenschutz)/i;
// Archiwa bez treści własnej: tagi i autorzy (kategorie zostają, w sklepach to ważne strony).
const ARCHIWA = new Set(['tag', 'tags', 'tagi', 'author', 'authors', 'autor', 'autorzy']);

/**
 * Język główny strony: prefiks adresu strony głównej (tql.pl -> /pl), a gdy strona główna nie ma
 * prefiksu, a w mapie są strony bez prefiksu, to '' (strony bez prefiksu = język główny, każdy prefiks
 * = inna wersja). Gdy wszystko leży pod prefiksami: język z <html lang>, jeśli ma prefiks, albo najczęstszy.
 */
export function ustalJezykGlowny(adresy, { prefiksGlownej = '', jezykHtml = '' } = {}) {
  if (prefiksGlownej) return prefiksGlownej;
  const prefiksy = new Map();
  let bezPrefiksu = 0;
  for (const url of adresy) {
    const seg = segmentySciezki(url);
    if (!seg.length) continue;
    const j = jezykSegmentu(seg[0]);
    if (j) prefiksy.set(j, (prefiksy.get(j) || 0) + 1);
    else bezPrefiksu += 1;
  }
  if (bezPrefiksu || !prefiksy.size) return '';
  const html = [...prefiksy.keys()].find((j) => bazaJezyka(j) === bazaJezyka(jezykHtml));
  if (html) return html;
  return [...prefiksy.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Zwraca funkcję (url, tytuł?) -> { jezyk, sekcja, opcjonalna, archiwum, glebokosc }:
 * jezyk = prefiks innej wersji językowej ('' = język główny), sekcja = pierwszy segment po prefiksie,
 * gdy ma co najmniej 2 podstrony w `adresy` ('' = strony luźne), glebokosc = segmenty po prefiksie.
 */
export function klasyfikator(adresy, jezykGlowny = '') {
  const glowny = bazaJezyka(jezykGlowny);
  const rozbij = (url) => {
    const seg = segmentySciezki(url);
    const j = jezykSegmentu(seg[0]);
    if (!j) return { seg, jezyk: '' };
    return { seg: seg.slice(1), jezyk: bazaJezyka(j) === glowny ? '' : j };
  };
  const ilePod = new Map();
  for (const url of adresy) {
    const { seg, jezyk } = rozbij(url);
    if (seg.length >= 2) ilePod.set(`${jezyk}/${seg[0]}`, (ilePod.get(`${jezyk}/${seg[0]}`) || 0) + 1);
  }
  return (url, tytul = '') => {
    const { seg, jezyk } = rozbij(url);
    const ostatni = seg[seg.length - 1] || '';
    const opcjonalna = ((seg.length === 1 || (seg.length === 2 && RODZICE_PRAWNI.has(seg[0]))) && SLUG_OPCJONALNY.test(ostatni))
      || (seg.length === 1 && TYTUL_PRAWNY.test(tytul));
    const sekcja = seg.length && (ilePod.get(`${jezyk}/${seg[0]}`) || 0) >= 2 ? seg[0] : '';
    return { jezyk, sekcja, opcjonalna, archiwum: ARCHIWA.has(seg[0]), glebokosc: seg.length };
  };
}

/**
 * Wybór maks. `limit` adresów z map strony. Zamiast pierwszych N adresów z pierwszych map dzielimy
 * limit między pule: mapa × (wersja językowa, sekcja), z osobną pulą na strony do „Optional”
 * i na archiwa. Każda pula dostaje najpierw 1 adres, potem sprawiedliwe napełnianie z wagami: w każdej
 * rundzie pula dostaje do waga × runda adresów. Wagi: strony luźne języka głównego 4, sekcje języka głównego 2, strony luźne
 * innej wersji 2, jej sekcje, archiwa i Optional po 1. W puli: <priority> malejąco, płytsze adresy
 * najpierw, w sekcjach (blog, aktualności) nowsze <lastmod> najpierw, potem kolejność w mapie.
 * mapy = [{ lokacje, zmiany?, priorytety? }]. Zwraca adresy w kolejności map.
 */
export function wybierzAdresy(mapy, { limit = LIMITY.maxUrli, czyDozwolony = () => true, stronaGlowna = null, prefiksGlownej = '', jezykHtml = '', en = false } = {}) {
  const kandydaci = [];
  const pominiete = [];
  const widziane = new Set();
  // Duplikaty po normalizacji (http/https, www, końcowy ukośnik) traktujemy jak jeden adres.
  const kluczPor = (u) => `${bezWww(u.hostname)}${u.pathname.replace(/\/+$/, '')}${u.search}`;
  mapy.forEach((m, iMapy) => {
    m.lokacje.forEach((surowy, i) => {
      let u;
      try {
        u = new URL(surowy);
      } catch {
        return;
      }
      u.hash = '';
      const kp = kluczPor(u);
      if (widziane.has(kp)) return;
      widziane.add(kp);
      if (!czyDozwolony(u)) {
        pominiete.push({ url: u.toString(), powod: en ? 'different domain' : 'inna domena' });
        return;
      }
      kandydaci.push({ url: u.toString(), mapa: iMapy, poz: i, zmiana: m.zmiany?.[i] || 0, priorytet: m.priorytety?.[i] ?? 0.5 });
    });
  });
  const unikalnych = kandydaci.length + pominiete.length;
  // Strona główna, której nie ma w mapie: dokładamy ją na początek (najważniejsza strona serwisu).
  if (stronaGlowna && kandydaci.length) {
    let u = null;
    try {
      u = new URL(stronaGlowna);
    } catch { /* bez strony głównej */ }
    if (u && !widziane.has(kluczPor(u))) kandydaci.unshift({ url: u.toString(), mapa: -1, poz: -1, zmiana: 0, priorytet: 1 });
  }

  const adresy = kandydaci.map((k) => k.url);
  const jezykGlowny = ustalJezykGlowny(adresy, { prefiksGlownej, jezykHtml });
  if (kandydaci.length <= limit) return { adresy, wszystkie: adresy, pominiete, jezykGlowny, unikalnych, pul: 0, zastepca: () => null };

  const klasa = klasyfikator(adresy, jezykGlowny);
  const pule = new Map();
  for (const k of kandydaci) {
    const c = klasa(k.url);
    const typ = c.opcjonalna ? 'opt' : (c.archiwum ? 'arch' : '');
    const klucz = `${Math.max(k.mapa, 0)}|${c.jezyk}|${typ || c.sekcja}`;
    if (!pule.has(klucz)) {
      let waga;
      let ranga;
      if (typ === 'opt') [waga, ranga] = [1, 5];
      else if (typ === 'arch') [waga, ranga] = [1, 4];
      else if (!c.jezyk) [waga, ranga] = c.sekcja ? [2, 1] : [4, 0];
      else [waga, ranga] = c.sekcja ? [1, 3] : [2, 2];
      pule.set(klucz, { waga, ranga, kolejnosc: pule.size, sekcja: Boolean(c.sekcja), lista: [], wziete: 0 });
    }
    pule.get(klucz).lista.push({ ...k, glebokosc: c.glebokosc });
  }
  const kolejka = [...pule.values()].sort((a, b) => a.ranga - b.ranga || a.kolejnosc - b.kolejnosc);
  for (const p of kolejka) {
    p.lista.sort((a, b) => b.priorytet - a.priorytet || a.glebokosc - b.glebokosc
      || (p.sekcja ? b.zmiana - a.zmiana : 0) || a.mapa - b.mapa || a.poz - b.poz);
  }
  // Najpierw po 1 adresie z każdej puli (bez tego przy kilkunastu mapach wpisów pierwsze mapy
  // z wagą 4 zużyłyby limit, zanim dostałaby coś mapa kalkulatorów z końca indeksu), potem wagi.
  let zostalo = limit;
  for (const p of kolejka) {
    if (zostalo <= 0) break;
    p.wziete = 1;
    zostalo -= 1;
  }
  for (let runda = 1; zostalo > 0; runda += 1) {
    let dodano = 0;
    for (const p of kolejka) {
      const cel = Math.min(p.lista.length, p.waga * runda);
      while (p.wziete < cel && zostalo > 0) {
        p.wziete += 1;
        zostalo -= 1;
        dodano += 1;
      }
    }
    if (!dodano) break;
  }
  const wybrane = kolejka.flatMap((p) => p.lista.slice(0, p.wziete)).sort((a, b) => a.mapa - b.mapa || a.poz - b.poz);
  // Zastępca dla odrzuconego adresu: następny niewzięty adres z tej samej puli (w jej kolejności),
  // żeby 404 albo noindex jedynego przedstawiciela nie usuwał z pliku całej sekcji. Zastępca trafia
  // do tej samej puli, więc on też może dostać zastępcę. null = pula wyczerpana albo adres spoza wyboru.
  const pulaAdresu = new Map();
  for (const p of kolejka) for (const k of p.lista.slice(0, p.wziete)) pulaAdresu.set(k.url, p);
  const zastepca = (url) => {
    const p = pulaAdresu.get(url);
    if (!p || p.wziete >= p.lista.length) return null;
    const k = p.lista[p.wziete];
    p.wziete += 1;
    pulaAdresu.set(k.url, p);
    return k.url;
  };
  return { adresy: wybrane.map((k) => k.url), wszystkie: adresy, pominiete, jezykGlowny, unikalnych, pul: pule.size, zastepca };
}

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

// Nazwy częstych sekcji z polskimi znakami (slug ich nie ma).
const NAZWY_SEKCJI = {
  uslugi: 'Usługi', oferta: 'Oferta', narzedzia: 'Narzędzia', porownania: 'Porównania', aktualnosci: 'Aktualności',
  wiadomosci: 'Wiadomości', artykuly: 'Artykuły', poradniki: 'Poradniki', poradnik: 'Poradnik', realizacje: 'Realizacje',
  produkty: 'Produkty', produkt: 'Produkty', kategoria: 'Kategorie', kategorie: 'Kategorie', 'kategoria-produktu': 'Kategorie produktów',
  sklep: 'Sklep', szkolenia: 'Szkolenia', kursy: 'Kursy', wydarzenia: 'Wydarzenia', 'baza-wiedzy': 'Baza wiedzy', wiedza: 'Wiedza',
  slownik: 'Słownik', zespol: 'Zespół', kariera: 'Kariera', praca: 'Praca', 'oferty-pracy': 'Oferty pracy', galeria: 'Galeria',
  opinie: 'Opinie', branze: 'Branże', rozwiazania: 'Rozwiązania', lokalizacje: 'Lokalizacje', miasta: 'Miasta',
  szablony: 'Szablony', materialy: 'Materiały', zasoby: 'Zasoby', pytania: 'Pytania', faq: 'FAQ', cennik: 'Cennik',
  przepisy: 'Przepisy', menu: 'Menu', blog: 'Blog', news: 'News', tag: 'Tagi', tagi: 'Tagi', tags: 'Tags',
  ksiegowosc: 'Księgowość', nieruchomosci: 'Nieruchomości', ogloszenia: 'Ogłoszenia', porady: 'Porady', wspolpraca: 'Współpraca',
  'uslugi-dodatkowe': 'Usługi dodatkowe', 'realizacje-projektow': 'Realizacje', 'centrum-wiedzy': 'Centrum wiedzy', 'do-pobrania': 'Do pobrania',
  autor: 'Autorzy', autorzy: 'Autorzy', author: 'Authors', authors: 'Authors', docs: 'Docs',
};

const zlozLitery = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L').toLowerCase();

/**
 * Nazwa sekcji ze sluga: słownik, a dalej słowa z tytułów i opisów stron tej sekcji z przywróconymi znakami
 * i wielkością liter („pozycjonowanie-w-ai” + tytuł „Pozycjonowanie w AI…” = „Pozycjonowanie w AI”).
 */
function nazwaSekcji(segment, tytuly = []) {
  let s = segment;
  try {
    s = decodeURIComponent(segment);
  } catch { /* zostaje */ }
  const zeSlownika = NAZWY_SEKCJI[s.toLowerCase()];
  if (zeSlownika) return zeSlownika;
  const slowaTytulow = new Map();
  for (const t of tytuly) {
    for (const w of String(t || '').split(/[^\p{L}\p{N}]+/u)) {
      if (w && !slowaTytulow.has(zlozLitery(w))) slowaTytulow.set(zlozLitery(w), w);
    }
  }
  const wynik = s.split(/[-_\s]+/).filter(Boolean).map((slowo) => {
    const z = slowaTytulow.get(zlozLitery(slowo));
    if (!z) return slowo.toLowerCase();
    return z.length > 1 && z === z.toUpperCase() ? z : z.toLowerCase();
  }).join(' ').replace(/[#[\]()]/g, '').slice(0, 60).trim();
  // Slug z samych znaków typu „---” albo „#”: nagłówek nie może zostać pusty („## ”).
  if (!wynik) return null;
  return wynik.charAt(0).toUpperCase() + wynik.slice(1);
}

/**
 * Plik w formacie llmstxt.org: „# Nazwa”, „> opis”, sekcje „## …” z wierszami „- [Tytuł](url): opis”.
 * Kolejność sekcji: strony języka głównego („Strony”), jego sekcje (pierwszy segment ścieżki z co
 * najmniej 2 podstronami, np. „Blog”), potem każda inna wersja językowa („Wersja EN”, „Blog (EN)”)
 * i na końcu „Optional” (strony prawne i cookies). Strona-spis sekcji (np. /blog) idzie na początek
 * swojej sekcji. wszystkieAdresy (opcjonalnie) = cała mapa: liczba podstron sekcji liczona z niej, nie z próbki.
 * jezykStrony (12.11.2026): język strony głównej (prefiks albo <html lang>). Nagłówki ogólne („Strony”,
 * „Wersja EN”, „Strona główna”) idą za nim, a nie za językiem interfejsu: polska strona sprawdzana
 * w interfejsie EN dostawała „Pages” obok „Pozycjonowanie w AI”. Strona po polsku = nagłówki PL,
 * inny znany język = EN, nieznany = język interfejsu (jak dotąd).
 */
export function zbudujLlmsTxt({ marka, opis, wpisy, lang = 'pl', jezykGlowny = '', wszystkieAdresy = null, jezykStrony = '' }) {
  const baza = bazaJezyka(jezykStrony);
  const en = baza ? baza !== 'pl' : lang === 'en';
  lang = en ? 'en' : 'pl';
  const klasa = klasyfikator(wszystkieAdresy || wpisy.map((w) => w.url), jezykGlowny);
  const jezyki = [];
  const sekcje = new Map();
  wpisy.forEach((w, i) => {
    const c = klasa(w.url, w.tytul);
    if (c.jezyk && !jezyki.includes(c.jezyk)) jezyki.push(c.jezyk);
    const klucz = c.opcjonalna ? 'optional' : `${c.jezyk}|${c.sekcja}`;
    if (!sekcje.has(klucz)) sekcje.set(klucz, { ...c, opcjonalna: c.opcjonalna, pierwszy: i, lista: [] });
    // Strona główna (albo /en) i spis sekcji (np. /blog, /en/blog) na początek swojej sekcji.
    sekcje.get(klucz).lista.push({ ...w, spis: c.glebokosc === 0 ? 2 : Number(Boolean(c.sekcja) && c.glebokosc === 1), i });
  });
  const ranga = (s) => (s.opcjonalna ? [1e9, 0] : [s.jezyk ? 1 + jezyki.indexOf(s.jezyk) : 0, s.sekcja ? 1 : 0]);
  const kolejne = [...sekcje.values()].sort((a, b) => {
    const [ra, rb] = [ranga(a), ranga(b)];
    return ra[0] - rb[0] || ra[1] - rb[1] || a.pierwszy - b.pierwszy;
  });

  const linie = [`# ${marka}`, ''];
  if (opis) linie.push(`> ${skroc(opis, 300)}`, '');
  for (const s of kolejne) {
    const kod = s.jezyk.toUpperCase();
    let naglowek;
    if (s.opcjonalna) naglowek = 'Optional'; // nazwa ze specyfikacji llmstxt.org, nie tłumaczymy
    else if (s.sekcja && nazwaSekcji(s.sekcja)) naglowek = `${nazwaSekcji(s.sekcja, s.lista.map((w) => `${w.tytul || ''} ${w.opis || ''}`))}${kod ? ` (${kod})` : ''}`;
    else if (kod) naglowek = en ? `${kod} version` : `Wersja ${kod}`;
    else naglowek = en ? 'Pages' : 'Strony';
    linie.push(`## ${naglowek}`, '');
    const lista = [...s.lista].sort((a, b) => b.spis - a.spis || a.i - b.i);
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
      const zRobots = robots.sitemapy
        .map((s) => { try { return new URL(s, origin); } catch { return null; } })
        .filter((u) => u && tenSamHost(u))
        .map((u) => u.toString())
        .filter((u, i, lista) => lista.indexOf(u) === i) // ten sam wpis Sitemap powtórzony w robots.txt
        .slice(0, 3);
      const kandydaci = zRobots.length ? zRobots : [`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`, `${origin}/wp-sitemap.xml`];
      // Mapy podrzędne czytamy najwyżej do 10 s od startu (LIMITY.rezerwaNaStronyMs przed limitem 20 s),
      // żeby na sprawdzenie adresów zostało co najmniej 10 s. Weryfikacja 11.11.2026: bez tego indeks
      // 25 map po 3 s zajmował 15 s, a cały przebieg trwał 19,4 s zamiast 7,3 s.
      const terminMap = termin - LIMITY.rezerwaNaStronyMs;
      const czasMapy = () => Math.min(timeout(), terminMap - Date.now());
      const pobierzMape = (adres, maxBajtow = LIMITY.maxBajtow, podrzedna = false) => pobierzZPrzekierowaniami(adres, {
        czas: (a) => pobierz(a, { timeoutMs: podrzedna ? Math.max(czasMapy(), 1) : timeout(), maxBajtow, agenci, accept: 'application/xml,text/xml,*/*;q=0.8' }),
      }, tenSamHost);
      let uciete = false;
      const mapy = [];
      let zrodlo = null;
      let razem = 0;
      let wIndeksie = 0;
      // Każdą mapę pobieramy raz: robots.txt często wymienia ten sam indeks dwa razy albo indeks i jego
      // mapę podrzędną, a dwa indeksy mogą wskazywać te same mapy. Limit 20 map podrzędnych jest wspólny.
      const pobraneMapy = new Set();
      let podrzednychWybranych = 0;
      const dodajMape = (z, ucieta) => {
        let m = z;
        if (z.lokacje.length > LIMITY.maxAdresowZMapy) {
          // Z mapy bierzemy pierwsze 5000 adresów, więc liczba adresów w wyniku to dolna granica.
          m = { lokacje: z.lokacje.slice(0, LIMITY.maxAdresowZMapy), zmiany: z.zmiany.slice(0, LIMITY.maxAdresowZMapy), priorytety: z.priorytety.slice(0, LIMITY.maxAdresowZMapy) };
          uciete = true;
        }
        mapy.push(m);
        razem += z.lokacje.length;
        uciete = uciete || Boolean(ucieta);
      };
      for (const kandydat of kandydaci) {
        if (zostalo() < 1000) break;
        // Zgadywane adresy (bez wpisu w robots.txt): wystarczy pierwszy, który zadziała.
        if (!zRobots.length && mapy.length) break;
        if (pobraneMapy.has(kandydat)) continue;
        pobraneMapy.add(kandydat);
        const odp = await pobierzMape(kandydat);
        if (!(odp.kod >= 200 && odp.kod < 300)) continue;
        pobraneMapy.add(odp.url);
        const z = adresyZMapy(tekstMapy(odp.cialo));
        if (!z.lokacje.length) continue;
        zrodlo = zrodlo || odp.url;
        if (!z.indeks) {
          dodajMape(z, odp.uciete);
          continue;
        }
        // Indeks map: 1 poziom w głąb, maks. 20 map podrzędnych (kolejnoscMap), pobieranych po 4 naraz,
        // każda do 512 KB (ok. 3 tys. adresów; z mapy bierzemy najwyżej kilkanaście). Wszystkie trafiają
        // do wyboru, więc żadna sekcja nie wypada w całości.
        const podrzedne = [...new Set(z.lokacje.filter((s) => { try { return tenSamHost(new URL(s)); } catch { return false; } }))]
          .filter((s) => !pobraneMapy.has(s));
        wIndeksie += podrzedne.length;
        const wybrane = kolejnoscMap(podrzedne, Math.max(LIMITY.maxMapPodrzednych - podrzednychWybranych, 0));
        podrzednychWybranych += wybrane.length;
        if (wybrane.length < podrzedne.length) uciete = true;
        for (const pod of wybrane) pobraneMapy.add(pod);
        const wyniki = await pula(wybrane.map((pod) => async () => {
          // Mapa niepobrana z braku czasu albo przez timeout: liczba adresów jest dolną granicą.
          if (czasMapy() < 1000) return { pominieta: true };
          const o = await pobierzMape(pod, LIMITY.maxBajtowMapyPodrzednej, true);
          if (o.blad === 'timeout') return { pominieta: true };
          if (!(o.kod >= 200 && o.kod < 300)) return null;
          const zz = adresyZMapy(tekstMapy(o.cialo));
          if (zz.indeks || !zz.lokacje.length) return null;
          return { ...zz, uciete: Boolean(o.uciete) };
        }), LIMITY.wspolbieznoscMap, termin);
        for (const zz of wyniki) {
          if (zz && zz.pominieta) uciete = true;
          else if (zz) dodajMape(zz, zz.uciete);
        }
      }
      return { mapy, zrodlo, razem, wIndeksie, uciete };
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
        // Linki Markdown [nazwa](https://...): plik bez nich nie wskazuje modelom żadnych podstron
        // (Lighthouse 13 oznacza to jako błąd; staniax.pl 11.11.2026: 588 B, 0 linków).
        // Nazwa linku do 300 znaków: bez limitu 64 KB samych „[” liczyło się 1,8 s (weryfikacja 11.11.2026).
        linki: (tekst.match(/\[[^\]\n]{1,300}\]\(\s*https?:\/\/[^)\s]+/g) || []).length,
        html: /^\s*<(!doctype|html)/i.test(tekst),
      };
    })();

    const [boty, { mapy, zrodlo: mapaZrodlo, razem: wMapie, wIndeksie, uciete: mapaUcieta }, obecnyPlik] = await Promise.all([testBotow, mapa, obecny]);

    // 4. Adresy do sprawdzenia: ta sama domena, bez duplikatów, maks. 50, po kilka z każdej mapy
    //    i sekcji (wybierzAdresy). Strona główna spoza mapy dochodzi na początek.
    const glownaOk = glowna.kod >= 200 && glowna.kod < 300;
    const wybor = wybierzAdresy(mapy, {
      limit: LIMITY.maxUrli,
      czyDozwolony: tenSamHost,
      stronaGlowna: glownaOk ? glowna.url : null,
      prefiksGlownej: jezykSegmentu(glownaUrl.pathname.split('/').filter(Boolean)[0]),
      jezykHtml: metaGlownej.jezyk,
      en,
    });
    const pominiete = wybor.pominiete;
    const doSprawdzenia = wybor.adresy;
    if (!doSprawdzenia.length && glownaOk) doSprawdzenia.push(glowna.url);

    // 5. Każdy adres: HEAD (kod, przekierowanie, X-Robots-Tag), potem ucięty GET (tytuł, opis, meta robots).
    const sprawdzAdres = async (url) => {
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
    };
    // Faza 1: wszystkie wybrane adresy. Zastępcy dopiero w fazie 2, żeby łańcuch zastępców jednego
    // adresu nie zajmował miejsca w puli, kiedy inne wybrane adresy czekają (weryfikacja 11.11.2026).
    const wyniki = await pula(doSprawdzenia.map((url) => () => sprawdzAdres(url)), LIMITY.wspolbieznosc, termin);
    // Faza 2: odrzucony adres (powod) zastępujemy następnym z tej samej puli (wybor.zastepca): maks.
    // LIMITY.maxZastepcow razy na adres, LIMITY.maxZastepcowRazem razem i tylko, gdy zostały co najmniej
    // 2 timeouty (HEAD + GET) do limitu 20 s. Gdy odrzucona jest ponad połowa sprawdzonych adresów, błąd
    // jest systemowy (np. każda podstrona przekierowuje na wersję z ukośnikiem) i zastępców nie szukamy:
    // w symulacji takiego serwisu zastępcy podnosili liczbę zapytań z 63 do 165, a czas z 4,5 do 12,4 s.
    const odrzuconych = wyniki.filter((w) => w && w.powod).length;
    const sprawdzonych = wyniki.filter((w) => w && !w.nieprzetworzony).length;
    if (odrzuconych && odrzuconych * 2 <= sprawdzonych) {
      let budzet = LIMITY.maxZastepcowRazem;
      const zadaniaZastepcow = [];
      wyniki.forEach((w, i) => {
        if (!w || !w.powod) return;
        zadaniaZastepcow.push(async () => {
          const odrzucone = [];
          let biezacy = w;
          for (let n = 0; n < LIMITY.maxZastepcow && biezacy.powod && budzet > 0 && zostalo() > 2 * LIMITY.timeoutMs; n += 1) {
            const nastepny = wybor.zastepca(biezacy.url);
            if (!nastepny) break;
            budzet -= 1;
            odrzucone.push({ url: biezacy.url, powod: biezacy.powod });
            biezacy = await sprawdzAdres(nastepny);
          }
          wyniki[i] = { ...biezacy, odrzucone };
        });
      });
      await pula(zadaniaZastepcow, LIMITY.wspolbieznosc, termin);
    }

    const wpisy = [];
    const nieprzetworzone = [];
    // Adresy faktycznie sprawdzone (z zastępcami, bez nieprzetworzonych): podstawa liczby
    // „blokuje X z N sprawdzonych adresów” w tabeli botów.
    const sprawdzoneAdresy = [];
    let zastepcow = 0;
    wyniki.forEach((w, i) => {
      if (!w) {
        nieprzetworzone.push(doSprawdzenia[i]);
        return;
      }
      const odrzucone = w.odrzucone || [];
      for (const o of odrzucone) {
        pominiete.push(o);
        sprawdzoneAdresy.push(o.url);
      }
      zastepcow += odrzucone.length;
      if (w.nieprzetworzony) {
        nieprzetworzone.push(w.url);
        return;
      }
      sprawdzoneAdresy.push(w.url);
      if (w.wpis) wpisy.push(w.wpis);
      else pominiete.push({ url: w.url, powod: w.powod });
    });

    const marka = nazwaMarki({ nazwaSerwisu: metaGlownej.nazwaSerwisu, tytuly: [metaGlownej.tytul, ...wpisy.map((w) => w.tytul)].filter(Boolean), host: glownaUrl.hostname });
    const llmsTxt = zbudujLlmsTxt({ marka, opis: metaGlownej.opis || metaGlownej.ogOpis, wpisy, lang, jezykGlowny: wybor.jezykGlowny, wszystkieAdresy: wybor.wszystkie.length ? wybor.wszystkie : null, jezykStrony: wybor.jezykGlowny || metaGlownej.jezyk });

    const tabelaBotow = boty.map(({ bot, wynikRobots, kod, blad }) => {
      const w = wniosekBota(bot, robotsStan, wynikRobots, kod, glowna.kod, blad, lang);
      const zablokowaneAdresy = robotsStan === 'jest'
        ? sprawdzoneAdresy.filter((u) => !sprawdzSciezke(robots, bot.token, new URL(u).pathname + new URL(u).search).dozwolona).length
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
      // adresow = unikalne adresy ze wszystkich przeczytanych map (wMapie liczy też powtórzenia między mapami),
      // map = przeczytane mapy z adresami, mapWIndeksie = mapy podrzędne wymienione w indeksie (0 = zwykła mapa),
      // sekcji = pule, między które podzielono limit (0 = wszystkie adresy mieszczą się w limicie),
      mapa: {
        zrodlo: mapaZrodlo,
        adresow: wybor.unikalnych || wMapie,
        // sprawdzone = adresy faktycznie pobrane, razem z zastępcami (zastepcze = ilu odrzuconych zastąpiliśmy).
        sprawdzone: sprawdzoneAdresy.length,
        zastepcze: zastepcow,
        limit: LIMITY.maxUrli,
        map: mapy.length,
        mapWIndeksie: wIndeksie,
        sekcji: wybor.pul,
        // true = mapa większa, niż czytamy (ponad 20 map podrzędnych albo ucięta mapa): adresow to dolna granica.
        uciete: mapaUcieta,
      },
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
