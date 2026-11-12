// IndexNow: wspólny klient dla scripts/indexnow.mjs (zgłoszenia ręczne) i trasy crona
// app/api/cron/indexnow/route.js (zgłoszenie po wdrożeniu). Czysty ESM bez zależności.
//
// Klucz IndexNow jest publiczny z założenia: leży w public/<KEY>.txt i każdy może go odczytać.
// Wyszukiwarka sprawdza, czy plik pod keyLocation zawiera ten sam klucz.

export const HOST = 'www.ai-seo-company.pl';
export const KEY = '4741be50b9cf74fd0720fcdf60f9e624';
export const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
export const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Limit adresów na jedno wywołanie crona (API przyjmuje 10 000; więcej niż 100 = coś poszło nie tak). */
export const LIMIT_CRONA = 100;
/** Okno od buildu, w którym cron zgłasza wydanie: 24 h + rozrzut crona na planie Hobby (do 59 min) + zapas. */
export const OKNO_MS = 26 * 60 * 60 * 1000;
const DZIEN_MS = 24 * 60 * 60 * 1000;

/** Tylko adresy serwisu, bez duplikatów, w stałej kolejności. */
export function adresySerwisu(urls) {
  return [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });
}

const dzienUtc = (iso) => Date.parse(`${iso}T00:00:00Z`);

/**
 * Decyzja crona bez stanu: czy i co zgłosić.
 * @param {object} p
 * @param {number} p.teraz        Date.now()
 * @param {string} p.srodowisko   process.env.VERCEL_ENV ('production' | 'preview' | 'development' | undefined)
 * @param {string} p.zbudowano    stempel buildu ISO (NEXT_PUBLIC_ZBUDOWANO z package.json "build")
 * @param {object} p.wydanie      _wydanie z lib/lastmod.json ({ data, zmienione, usuniete })
 * @returns {{ zglos: boolean, powod: string, adresy: string[], pominiete: number }}
 */
export function planZgloszenia({ teraz, srodowisko, zbudowano, wydanie }) {
  const wszystkie = adresySerwisu([...(wydanie?.zmienione || []), ...(wydanie?.usuniete || [])]);
  const adresy = wszystkie.slice(0, LIMIT_CRONA);
  const wynik = (zglos, powod) => ({ zglos, powod, adresy: zglos ? adresy : [], pominiete: zglos ? wszystkie.length - adresy.length : 0, kandydaci: adresy });

  if (srodowisko !== 'production') return wynik(false, `środowisko ${srodowisko || 'brak'} (zgłaszamy tylko z produkcji)`);
  if (!wydanie?.data || !wszystkie.length) return wynik(false, 'ostatnie wydanie nie zmieniło żadnego adresu');

  const build = Date.parse(zbudowano || '');
  if (Number.isFinite(build)) {
    if (teraz - build > OKNO_MS) return wynik(false, `wdrożenie starsze niż 26 h (build ${zbudowano})`);
    // Build bez nowego wydania (np. sama zmiana CSS kilka dni później): nie zgłaszamy starej listy drugi raz.
    if (dzienUtc(zbudowano.slice(0, 10)) - dzienUtc(wydanie.data) > DZIEN_MS) return wynik(false, `build ${zbudowano.slice(0, 10)} bez nowego wydania (ostatnie ${wydanie.data})`);
    if (dzienUtc(wydanie.data) - build > DZIEN_MS) return wynik(false, `data wydania ${wydanie.data} późniejsza niż build`);
    return wynik(true, `wydanie ${wydanie.data}, build ${zbudowano}`);
  }
  // Bez stempla buildu (np. build bez `npm run build`): okno liczone od dnia wydania (dziś lub wczoraj).
  const dni = (dzienUtc(new Date(teraz).toISOString().slice(0, 10)) - dzienUtc(wydanie.data)) / DZIEN_MS;
  if (dni < 0 || dni > 1) return wynik(false, `brak stempla buildu, wydanie ${wydanie.data} spoza okna dziś/wczoraj`);
  return wynik(true, `wydanie ${wydanie.data} (bez stempla buildu)`);
}

/** POST do IndexNow. 200 i 202 = przyjęte; 422 = zły adres lub klucz; 429 = za często. */
export async function zglos(urls, { fetchImpl = fetch } = {}) {
  const lista = adresySerwisu(urls);
  if (!lista.length) return { status: 0, ok: false, zgloszono: 0 };
  const res = await fetchImpl(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: lista }),
  });
  return { status: res.status, ok: res.status === 200 || res.status === 202, zgloszono: lista.length };
}
