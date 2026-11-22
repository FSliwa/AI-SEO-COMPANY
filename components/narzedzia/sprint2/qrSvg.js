// Deterministyczny enkoder kodow QR (ISO/IEC 18004) w czystym JS dla SVG i Canvas.
// Tryb: Byte Mode (0100), korekcja bledow L (Low, ~7%), maska 0 ((w + k) % 2 === 0).
// Obsluguje wersje 1..8 (do 192 bajtow UTF-8; wersje 1..6 mieszcza do 134 bajtow).
// Arytmetyka ciala skonczonego GF(256) z wielomianem pierwotnym x^8 + x^4 + x^3 + x^2 + 1 (0x11d).

const WERSJE_L = [
  null,
  // [calkowiteDane, ecNaBlok, liczbaBlokow, srodkiWzorcowOsiowania]
  { dane: 19, ecNaBlok: 7, bloki: 1, osiowanie: [] },
  { dane: 34, ecNaBlok: 10, bloki: 1, osiowanie: [6, 18] },
  { dane: 55, ecNaBlok: 15, bloki: 1, osiowanie: [6, 22] },
  { dane: 80, ecNaBlok: 20, bloki: 1, osiowanie: [6, 26] },
  { dane: 108, ecNaBlok: 26, bloki: 1, osiowanie: [6, 30] },
  { dane: 136, ecNaBlok: 18, bloki: 2, osiowanie: [6, 34] },
  { dane: 156, ecNaBlok: 20, bloki: 2, osiowanie: [6, 22, 38], infoWersji: 0x07c94 },
  { dane: 194, ecNaBlok: 24, bloki: 2, osiowanie: [6, 24, 42], infoWersji: 0x085bc },
];

// Tablice logarytmow i poteg w GF(256) dla wielomianu 0x11d (285).
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfPomnoz(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function wielomianGeneratoraRs(stopien) {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < stopien; i += 1) {
    const nast = new Uint8Array(poly.length + 1);
    const czynnik = GF_EXP[i];
    for (let j = 0; j < poly.length; j += 1) {
      nast[j] ^= poly[j];
      nast[j + 1] ^= gfPomnoz(poly[j], czynnik);
    }
    poly = nast;
  }
  return poly;
}

function resztaReedSolomon(daneBloku, liczbaEc) {
  const gen = wielomianGeneratoraRs(liczbaEc);
  const reszta = new Uint8Array(liczbaEc);
  for (let i = 0; i < daneBloku.length; i += 1) {
    const wsp = daneBloku[i] ^ reszta[0];
    reszta.copyWithin(0, 1);
    reszta[liczbaEc - 1] = 0;
    if (wsp !== 0) {
      for (let j = 0; j < liczbaEc; j += 1) {
        reszta[j] ^= gfPomnoz(gen[j + 1], wsp);
      }
    }
  }
  return reszta;
}

// BCH (15, 5) dla Format Information: EC L = 01, maska 0 = 000 -> dane 0b01000 (8).
function bityFormatu(poziomBity = 0b01, maska = 0) {
  const dane = (poziomBity << 3) | maska;
  let rem = dane << 10;
  for (let i = 14; i >= 10; i -= 1) {
    if ((rem >> i) & 1) {
      rem ^= 0x537 << (i - 10);
    }
  }
  return ((dane << 10) | rem) ^ 0x5412;
}

function bajtyUtf8(tekst) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(String(tekst));
  }
  const s = unescape(encodeURIComponent(String(tekst)));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1) out[i] = s.charCodeAt(i);
  return out;
}

function wybierzWersje(liczbaBajtow) {
  for (let v = 1; v < WERSJE_L.length; v += 1) {
    // 4 bity trybu (0100) + 8 bitow dlugosci = 12 bitow (1,5 bajtu) -> pojemnosc = dane - 2 bajty
    if (liczbaBajtow <= WERSJE_L[v].dane - 2) return v;
  }
  return 0;
}

function zbudujStrumienKodowy(bajty, spec) {
  const bity = [];
  const dopiszBity = (wartosc, ile) => {
    for (let i = ile - 1; i >= 0; i -= 1) {
      bity.push((wartosc >> i) & 1);
    }
  };

  // Tryb Byte = 0100, licznik znakow = 8 bitow dla wersji 1..9
  dopiszBity(0b0100, 4);
  dopiszBity(bajty.length, 8);
  for (let i = 0; i < bajty.length; i += 1) {
    dopiszBity(bajty[i], 8);
  }

  const limitBitow = spec.dane * 8;
  const terminator = Math.min(4, limitBitow - bity.length);
  for (let i = 0; i < terminator; i += 1) bity.push(0);
  while (bity.length % 8 !== 0) bity.push(0);

  const slowaDanych = new Uint8Array(spec.dane);
  const zapelnioneBajty = bity.length / 8;
  for (let i = 0; i < zapelnioneBajty; i += 1) {
    let b = 0;
    for (let k = 0; k < 8; k += 1) b = (b << 1) | bity[i * 8 + k];
    slowaDanych[i] = b;
  }
  const wypelniacze = [0xec, 0x11];
  for (let i = zapelnioneBajty; i < spec.dane; i += 1) {
    slowaDanych[i] = wypelniacze[(i - zapelnioneBajty) % 2];
  }

  // Podzial na bloki i przeplatanie (dla V1..5 bloki=1, dla V6..8 bloki=2 rownoliczne)
  const dlBloku = spec.dane / spec.bloki;
  const blokiDanych = [];
  const blokiEc = [];
  for (let b = 0; b < spec.bloki; b += 1) {
    const wycinek = slowaDanych.subarray(b * dlBloku, (b + 1) * dlBloku);
    blokiDanych.push(wycinek);
    blokiEc.push(resztaReedSolomon(wycinek, spec.ecNaBlok));
  }

  const wynik = [];
  for (let i = 0; i < dlBloku; i += 1) {
    for (let b = 0; b < spec.bloki; b += 1) wynik.push(blokiDanych[b][i]);
  }
  for (let i = 0; i < spec.ecNaBlok; i += 1) {
    for (let b = 0; b < spec.bloki; b += 1) wynik.push(blokiEc[b][i]);
  }
  return wynik;
}

function osadzWzorzecWyszukiwania(macierz, funkcyjne, rozmiar, wStart, kStart) {
  for (let dw = -1; dw <= 7; dw += 1) {
    for (let dk = -1; dk <= 7; dk += 1) {
      const w = wStart + dw;
      const k = kStart + dk;
      if (w < 0 || w >= rozmiar || k < 0 || k >= rozmiar) continue;
      const wRamce = dw >= 0 && dw <= 6 && dk >= 0 && dk <= 6;
      const obrys = dw === 0 || dw === 6 || dk === 0 || dk === 6;
      const srodek = dw >= 2 && dw <= 4 && dk >= 2 && dk <= 4;
      macierz[w][k] = wRamce && (obrys || srodek) ? 1 : 0;
      funkcyjne[w][k] = true;
    }
  }
}

function osadzWzorzecOsiowania(macierz, funkcyjne, wSrodek, kSrodek) {
  for (let dw = -2; dw <= 2; dw += 1) {
    for (let dk = -2; dk <= 2; dk += 1) {
      const dystans = Math.max(Math.abs(dw), Math.abs(dk));
      macierz[wSrodek + dw][kSrodek + dk] = dystans !== 1 ? 1 : 0;
      funkcyjne[wSrodek + dw][kSrodek + dk] = true;
    }
  }
}

/**
 * Koduje tekst UTF-8 do macierzy kodu QR ISO/IEC 18004 (tryb Byte, korekcja L, maska 0).
 * Zwraca { ok: true, wersja, rozmiar, macierz } lub { ok: false, powod }.
 */
export function zakodujQr(tekst) {
  const czysty = String(tekst || '').trim();
  if (!czysty) return { ok: false, powod: 'pusty' };

  const bajty = bajtyUtf8(czysty);
  const wersja = wybierzWersje(bajty.length);
  if (!wersja) return { ok: false, powod: 'za_dlugi', maksBajtow: WERSJE_L[WERSJE_L.length - 1].dane - 2 };

  const spec = WERSJE_L[wersja];
  const rozmiar = 17 + 4 * wersja;
  const macierz = Array.from({ length: rozmiar }, () => new Uint8Array(rozmiar));
  const funkcyjne = Array.from({ length: rozmiar }, () => new Array(rozmiar).fill(false));

  // 1. Trzy wzorce wyszukiwania (Finder Patterns) + separatory
  osadzWzorzecWyszukiwania(macierz, funkcyjne, rozmiar, 0, 0);
  osadzWzorzecWyszukiwania(macierz, funkcyjne, rozmiar, 0, rozmiar - 7);
  osadzWzorzecWyszukiwania(macierz, funkcyjne, rozmiar, rozmiar - 7, 0);

  // 2. Linie taktujace (Timing Patterns) na wierszu 6 i kolumnie 6
  for (let i = 8; i < rozmiar - 8; i += 1) {
    const bit = i % 2 === 0 ? 1 : 0;
    if (!funkcyjne[6][i]) {
      macierz[6][i] = bit;
      funkcyjne[6][i] = true;
    }
    if (!funkcyjne[i][6]) {
      macierz[i][6] = bit;
      funkcyjne[i][6] = true;
    }
  }

  // 3. Wzorce osiowania (Alignment Patterns) dla wersji >= 2
  const osie = spec.osiowanie;
  for (let i = 0; i < osie.length; i += 1) {
    for (let j = 0; j < osie.length; j += 1) {
      const w = osie[i];
      const k = osie[j];
      const naroznik =
        (w === 6 && k === 6) ||
        (w === 6 && k === rozmiar - 7) ||
        (w === rozmiar - 7 && k === 6);
      if (!naroznik) osadzWzorzecOsiowania(macierz, funkcyjne, w, k);
    }
  }

  // 4. Ciemny modul (Dark Module) oraz rezerwacja pol informacji o formacie
  macierz[rozmiar - 8][8] = 1;
  funkcyjne[rozmiar - 8][8] = true;

  for (let i = 0; i <= 8; i += 1) {
    if (i !== 6) {
      funkcyjne[8][i] = true;
      funkcyjne[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i += 1) {
    funkcyjne[8][rozmiar - 1 - i] = true;
  }
  for (let i = 0; i < 7; i += 1) {
    funkcyjne[rozmiar - 1 - i][8] = true;
  }

  // 4b. Informacja o wersji dla wersji >= 7 (dwa bloki 3x6)
  if (wersja >= 7 && spec.infoWersji) {
    for (let i = 0; i < 18; i += 1) {
      const bit = (spec.infoWersji >> i) & 1;
      const a = Math.floor(i / 3);
      const b = (i % 3) + rozmiar - 11;
      macierz[a][b] = bit;
      funkcyjne[a][b] = true;
      macierz[b][a] = bit;
      funkcyjne[b][a] = true;
    }
  }

  // 5. Strumien slow kodowych i zapis zygzakowaty z maska 0 ((w + k) % 2 === 0)
  const slowa = zbudujStrumienKodowy(bajty, spec);
  let indeksBitu = 0;
  const liczbaBitow = slowa.length * 8;
  let wGore = true;

  for (let prawaKol = rozmiar - 1; prawaKol >= 1; prawaKol -= 2) {
    if (prawaKol === 6) prawaKol = 5; // Pominiecie pionowej linii taktujacej
    for (let krok = 0; krok < rozmiar; krok += 1) {
      const w = wGore ? rozmiar - 1 - krok : krok;
      for (let przes = 0; przes < 2; przes += 1) {
        const k = prawaKol - przes;
        if (funkcyjne[w][k]) continue;
        let bit = 0;
        if (indeksBitu < liczbaBitow) {
          bit = (slowa[indeksBitu >> 3] >> (7 - (indeksBitu & 7))) & 1;
          indeksBitu += 1;
        }
        if ((w + k) % 2 === 0) bit ^= 1; // Maska 0
        macierz[w][k] = bit;
      }
    }
    wGore = !wGore;
  }

  // 6. Zapis 15 bitow informacji o formacie (EC Level L = 01, maska = 000 -> 0x77c4)
  const fmt = bityFormatu(0b01, 0);
  const kolPoziomLewy = [0, 1, 2, 3, 4, 5, 7, 8];
  for (let i = 0; i < 8; i += 1) {
    macierz[8][kolPoziomLewy[i]] = (fmt >> (14 - i)) & 1;
  }
  const wierszPionGora = [7, 5, 4, 3, 2, 1, 0];
  for (let i = 0; i < 7; i += 1) {
    macierz[wierszPionGora[i]][8] = (fmt >> (6 - i)) & 1;
  }
  for (let i = 0; i < 7; i += 1) {
    macierz[rozmiar - 1 - i][8] = (fmt >> (14 - i)) & 1;
  }
  for (let i = 0; i < 8; i += 1) {
    macierz[8][rozmiar - 8 + i] = (fmt >> (7 - i)) & 1;
  }

  return { ok: true, wersja, rozmiar, macierz, bajty: bajty.length };
}

/**
 * Buduje zwarta sciezke SVG <path d="..." /> (laczac sasiednie ciemne moduly w wierszu).
 */
export function sciezkaSvgQr(macierz, margines = 4) {
  if (!macierz || !macierz.length) return { d: '', viewBoxRozmiar: 0 };
  const n = macierz.length;
  const czesci = [];
  for (let w = 0; w < n; w += 1) {
    let k = 0;
    while (k < n) {
      if (macierz[w][k]) {
        let dl = 1;
        while (k + dl < n && macierz[w][k + dl]) dl += 1;
        czesci.push(`M${k + margines} ${w + margines}h${dl}v1h-${dl}z`);
        k += dl;
      } else {
        k += 1;
      }
    }
  }
  return { d: czesci.join(''), viewBoxRozmiar: n + margines * 2 };
}

/**
 * Zwraca kompletny dokument XML SVG gotowy do pobrania i druku (300 DPI / wektor).
 */
export function zbudujPlikSvgQr(tekst, { kolor = '#101935', tlo = '#ffffff', margines = 4, rozmiarPx = 1024 } = {}) {
  const wynik = zakodujQr(tekst);
  if (!wynik.ok) return null;
  const { d, viewBoxRozmiar } = sciezkaSvgQr(wynik.macierz, margines);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxRozmiar} ${viewBoxRozmiar}" width="${rozmiarPx}" height="${rozmiarPx}" shape-rendering="crispEdges" role="img" aria-label="QR Code">\n  <rect width="${viewBoxRozmiar}" height="${viewBoxRozmiar}" fill="${tlo}"/>\n  <path d="${d}" fill="${kolor}"/>\n</svg>\n`;
}
