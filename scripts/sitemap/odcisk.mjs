// Odcisk treści strony (fingerprint) liczony z HTML-a: podstawa automatycznego lastmod.
// Czysta funkcja, bez sieci i bez zależności. Opis reguł: scripts/sitemap/README.md.
//
// odcisk(html) -> { h, ht, czesci, ... }
//   h  - odcisk do `lastmod` (sitemapa, IndexNow): glowa + JSON-LD + tekst + linki + obrazy z <main>
//   ht - odcisk do `tresc` (podpis „aktualizacja”, dateModified): tytuł strony + tekst <main>
//
// Nie liczą się: daty (podpis z datą, pola dat w JSON-LD), elementy wspólne całego serwisu
// (nagłówek, menu, stopka, blok kontaktu, JSON-LD WebSite z layoutu, wszystko z
// data-lastmod="pomin"), skrypty, style, komentarze, typografia (myślniki, cudzysłowy,
// wielokropek, twarde spacje) i obrazy dekoracyjne (alt="").
import { createHash } from 'node:crypto';

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'" };
export const dekoduj = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z0-9#]+);/gi, (m, n) => ENT[n] ?? m);

// Typografia nie jest zmianą treści (wydanie 11.11.2026 zamieniło „—” na „–” na wszystkich stronach).
const typografia = (s) => s
  .replace(/[‐-―−]/g, '-')
  .replace(/[“”„«»″]/g, '"')
  .replace(/[‘’‚′]/g, "'")
  .replace(/…/g, '...');
export const spacje = (s) => typografia(s).replace(/[\s   ​]+/g, ' ').trim();

export const attr = (tag, nazwa) => {
  const m = new RegExp(`\\s${nazwa}=("([^"]*)"|'([^']*)')`, 'i').exec(tag);
  return m ? dekoduj(m[2] ?? m[3] ?? '') : null;
};

// Pola dat w JSON-LD pochodzą z lib/lastmod.json, więc liczenie ich dawałoby pętlę
// (data zmienia HTML, HTML zmienia odcisk, odcisk zmienia datę).
const POLA_DAT = new Set(['datePublished', 'dateModified', 'dateCreated', 'lastReviewed', 'uploadDate']);
function bezDat(x) {
  if (Array.isArray(x)) return x.map(bezDat);
  if (x && typeof x === 'object') {
    return Object.fromEntries(Object.keys(x).sort().filter((k) => !POLA_DAT.has(k)).map((k) => [k, bezDat(x[k])]));
  }
  return x;
}

// Usuwa element o danym otwarciu razem z zawartością (zagnieżdżenia tego samego tagu liczone).
function wytnijElementy(html, reOtwarcia) {
  let out = html;
  for (let i = 0; i < 1000; i++) {
    const m = reOtwarcia.exec(out);
    if (!m) return out;
    const tag = /^<([a-z0-9-]+)/i.exec(m[0])[1];
    // Element samozamykający (<img data-lastmod="pomin" />) albo pusty: wycinamy sam znacznik.
    if (/\/>$/.test(m[0]) || /^(img|br|hr|input|meta|link|source)$/i.test(tag)) {
      out = out.slice(0, m.index) + out.slice(m.index + m[0].length);
      continue;
    }
    let koniec = m.index + m[0].length;
    let glebokosc = 1;
    const reTag = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    reTag.lastIndex = koniec;
    let t;
    while (glebokosc && (t = reTag.exec(out))) {
      glebokosc += t[1] ? -1 : 1;
      koniec = reTag.lastIndex;
    }
    if (glebokosc) koniec = out.length;
    out = out.slice(0, m.index) + out.slice(koniec);
  }
  return out;
}

// Elementy wspólne renderowane WEWNĄTRZ <main> (67 z 87 stron 11.11.2026). Docelowo każdy z nich
// ma atrybut data-lastmod="pomin"; selektory niżej działają do czasu dodania znaczników.
export const WYCIECIA = [
  /<[a-z0-9-]+\b[^>]*\sdata-lastmod=["']pomin["'][^>]*>/i,
  /<header\b[^>]*\sid=["']header["'][^>]*>/i,
  /<div\b[^>]*\sid=["']menu-glowne["'][^>]*>/i,
  /<footer\b[^>]*\sclass=["']footer[^"']*["'][^>]*>/i,
  /<(?:aside|section|div)\b[^>]*\sclass=["']contact["'][^>]*>/i,
  /<p\b[^>]*\sclass=["'][^"']*\bbyline\b[^"']*["'][^>]*>/i,
];

export function odcisk(html) {
  const head = (/<head[^>]*>([\s\S]*?)<\/head>/i.exec(html) || [, ''])[1];
  const title = spacje(dekoduj((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(head) || [, ''])[1]));
  const metaTagi = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const meta = (n) => metaTagi.filter((t) => (attr(t, 'name') || attr(t, 'property')) === n).map((t) => spacje(attr(t, 'content') || '')).sort();
  const linkTagi = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const canonical = linkTagi.filter((t) => attr(t, 'rel') === 'canonical').map((t) => attr(t, 'href'));
  const hreflang = linkTagi.filter((t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang'))
    .map((t) => `${attr(t, 'hreflang')} ${attr(t, 'href')}`).sort();
  const glowa = { title, description: meta('description'), robots: meta('robots'), canonical, hreflang };

  // JSON-LD strony bez bloku całego serwisu (@graph z WebSite z layoutu) i bez bloków data-lastmod="pomin".
  const ld = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((m) => /type=["']application\/ld\+json["']/i.test(m[1]) && !/data-lastmod=["']pomin["']/i.test(m[1]))
    .map((m) => {
      try {
        const j = JSON.parse(m[2]);
        if (Array.isArray(j?.['@graph']) && j['@graph'].some((x) => x?.['@type'] === 'WebSite')) return null;
        return spacje(JSON.stringify(bezDat(j)));
      } catch {
        return 'BLAD_JSON';
      }
    })
    .filter(Boolean)
    .sort();

  const mains = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/gi)].map((m) => m[1]);
  let main = mains.join('\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi, '');
  for (const re of WYCIECIA) main = wytnijElementy(main, re);

  const linki = [...main.matchAll(/<a\b[^>]*>/gi)].map((m) => attr(m[0], 'href')).filter(Boolean).sort();
  const obrazy = [...main.matchAll(/<img\b[^>]*>/gi)]
    .filter((m) => (attr(m[0], 'alt') ?? '').trim())
    .map((m) => {
      const src = attr(m[0], 'src') || '';
      const u = /[?&]url=([^&]+)/.exec(src);
      return `${u ? decodeURIComponent(u[1]) : src.split('?')[0]} | ${spacje(attr(m[0], 'alt') ?? '')}`;
    })
    .sort();
  const tekst = spacje(dekoduj(main.replace(/<[^>]+>/g, ' ')));

  const czesci = {
    glowa: sha(JSON.stringify(glowa)),
    ld: sha(JSON.stringify(ld)),
    tekst: sha(tekst),
    linki: sha(JSON.stringify(linki)),
    obrazy: sha(JSON.stringify(obrazy)),
  };
  return {
    h: sha(JSON.stringify(czesci)),
    ht: sha(JSON.stringify([title, tekst])),
    czesci,
    dlugoscTekstu: tekst.length,
    liczbaMain: mains.length,
    _tekst: tekst,
    _glowa: glowa,
    _linki: linki,
  };
}

/** Nazwy części, którymi różnią się dwa odciski (np. ['tekst', 'linki']). */
export function roznice(a, b) {
  if (!a || !b) return ['brak'];
  return Object.keys(a.czesci).filter((k) => a.czesci[k] !== b.czesci[k]);
}
