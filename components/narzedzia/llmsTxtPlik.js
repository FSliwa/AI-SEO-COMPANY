// Edytor pliku llms.txt przed pobraniem (S1-poprawki Z-L4, 12.11.2026): model pliku i operacje na nim.
// Czyste funkcje bez Reacta (testy: prace-2026-11-11/lepsi/llms/testy/edytor.test.mjs). Plik składa się
// w przeglądarce, API się nie zmienia. Format jak zbudujLlmsTxt w app/api/llms-txt/generator.js:
// „# Nazwa”, „> opis”, „## Sekcja”, „- [Tytuł](https://adres): opis”. Wiersz w innym formacie = parsujLlmsTxt
// zwraca null i strona pokazuje sam plik bez edytora (nigdy nie gubimy treści, której nie rozumiemy).

export const OPTIONAL = 'Optional';
export const NOWA_OPTIONAL = '__optional';

// Tytuł bez „]” i z adresem do pierwszego „)”, po którym jest „: ” albo koniec wiersza (adres może mieć nawiasy).
const WIERSZ_LINKU = /^- \[([^\]]*)\]\((\S+?)\)(?:: (.*))?$/;

/** Jedna linia: bez znaków nowej linii i podwójnych spacji. */
export const jednaLinia = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();

export const czyOptional = (sekcja) => jednaLinia(sekcja?.nazwa).toLowerCase() === 'optional';

/** Tekst pliku → { nazwa, opis, sekcje: [{ id, nazwa, linki: [{ id, tytul, url, opis, wPliku }] }] } albo null. */
export function parsujLlmsTxt(tekst) {
  const linie = String(tekst ?? '').replace(/\r\n?/g, '\n').split('\n');
  let nazwa = null;
  const opis = [];
  const sekcje = [];
  let nr = 0;
  for (const surowa of linie) {
    const l = surowa.trimEnd();
    if (!l.trim()) continue;
    if (nazwa === null) {
      if (!/^# \S/.test(l)) return null;
      nazwa = l.slice(2).trim();
      continue;
    }
    if (/^>( |$)/.test(l) && !sekcje.length) {
      opis.push(l.slice(1).trim());
      continue;
    }
    if (/^## \S/.test(l)) {
      sekcje.push({ id: `s${sekcje.length + 1}`, nazwa: l.slice(3).trim(), linki: [] });
      continue;
    }
    const m = WIERSZ_LINKU.exec(l);
    if (m && sekcje.length) {
      nr += 1;
      sekcje[sekcje.length - 1].linki.push({ id: `l${nr}`, tytul: m[1], url: m[2], opis: m[3] ?? '', wPliku: true });
      continue;
    }
    return null;
  }
  if (nazwa === null || !sekcje.length) return null;
  return { nazwa, opis: jednaLinia(opis.join(' ')), sekcje };
}

// Nawiasy okrągłe zostają: generator daje nazwy typu „Blog (EN)”.
const nazwaSekcjiDoPliku = (t) => jednaLinia(String(t ?? '').replace(/[#[\]]/g, '')).slice(0, 80);
const tytulDoPliku = (t) => jednaLinia(t).replace(/\[/g, '(').replace(/\]/g, ')').slice(0, 160);

/**
 * Model → tekst pliku. Odznaczone linki i puste sekcje znikają, „Optional” zawsze na końcu (llmstxt.org).
 * domyslne: nazwy dla pustych pól ({ nazwa, sekcja }).
 */
export function zlozLlmsTxt(model, domyslne = {}) {
  const linie = [`# ${jednaLinia(model.nazwa) || domyslne.nazwa || 'llms.txt'}`, ''];
  const opis = jednaLinia(model.opis);
  if (opis) linie.push(`> ${opis}`, '');
  const kolejne = [...model.sekcje.filter((s) => !czyOptional(s)), ...model.sekcje.filter(czyOptional)];
  for (const s of kolejne) {
    const linki = s.linki.filter((l) => l.wPliku);
    if (!linki.length) continue;
    linie.push(`## ${czyOptional(s) ? OPTIONAL : (nazwaSekcjiDoPliku(s.nazwa) || domyslne.sekcja || 'Strony')}`, '');
    for (const l of linki) {
      const o = jednaLinia(l.opis);
      linie.push(`- [${tytulDoPliku(l.tytul) || l.url}](${l.url})${o ? `: ${o}` : ''}`);
    }
    linie.push('');
  }
  return `${linie.join('\n').trim()}\n`;
}

/** Liczby do podpisu: linki w pliku, odznaczone, sekcje z co najmniej 1 linkiem. */
export function policz(model) {
  let wPliku = 0;
  let odznaczone = 0;
  let sekcji = 0;
  for (const s of model.sekcje) {
    const n = s.linki.filter((l) => l.wPliku).length;
    wPliku += n;
    odznaczone += s.linki.length - n;
    if (n) sekcji += 1;
  }
  return { wPliku, odznaczone, sekcji };
}

/** Gdzie jest link: { si, li } albo null. */
export function znajdz(model, idLinku) {
  for (let si = 0; si < model.sekcje.length; si += 1) {
    const li = model.sekcje[si].linki.findIndex((l) => l.id === idLinku);
    if (li >= 0) return { si, li };
  }
  return null;
}

const kopia = (model) => ({ ...model, sekcje: model.sekcje.map((s) => ({ ...s, linki: [...s.linki] })) });

/** Pozycja linku po zmianie: { sekcja, pozycja (od 1), razem }. */
export function pozycja(model, idLinku) {
  const p = znajdz(model, idLinku);
  if (!p) return null;
  const s = model.sekcje[p.si];
  return { sekcja: s.nazwa, pozycja: p.li + 1, razem: s.linki.length };
}

/**
 * Przesuwa link o 1 w górę (-1) albo w dół (+1). Na granicy sekcji przechodzi na koniec poprzedniej
 * albo na początek następnej. Zwraca { model, ruch: false } na samym początku / końcu pliku.
 */
export function przesun(model, idLinku, kierunek) {
  const p = znajdz(model, idLinku);
  if (!p) return { model, ruch: false };
  const m = kopia(model);
  const lista = m.sekcje[p.si].linki;
  const cel = p.li + kierunek;
  if (cel >= 0 && cel < lista.length) {
    [lista[p.li], lista[cel]] = [lista[cel], lista[p.li]];
    return { model: m, ruch: true };
  }
  const si = p.si + kierunek;
  if (si < 0 || si >= m.sekcje.length) return { model, ruch: false };
  const [link] = lista.splice(p.li, 1);
  if (kierunek < 0) m.sekcje[si].linki.push(link);
  else m.sekcje[si].linki.unshift(link);
  return { model: m, ruch: true };
}

/** Przenosi link na koniec sekcji idSekcji; NOWA_OPTIONAL tworzy sekcję „Optional” na końcu pliku. */
export function doSekcji(model, idLinku, idSekcji) {
  const p = znajdz(model, idLinku);
  if (!p) return model;
  const m = kopia(model);
  let cel = m.sekcje.findIndex((s) => s.id === idSekcji);
  if (idSekcji === NOWA_OPTIONAL) {
    cel = m.sekcje.findIndex(czyOptional);
    if (cel < 0) {
      m.sekcje.push({ id: `s${Date.now().toString(36)}`, nazwa: OPTIONAL, linki: [] });
      cel = m.sekcje.length - 1;
    }
  }
  if (cel < 0 || cel === p.si) return model;
  const [link] = m.sekcje[p.si].linki.splice(p.li, 1);
  m.sekcje[cel].linki.push(link);
  return m;
}

/** Zmienia pola linku (tytul, opis, wPliku). */
export function zmienLink(model, idLinku, pola) {
  return { ...model, sekcje: model.sekcje.map((s) => ({ ...s, linki: s.linki.map((l) => (l.id === idLinku ? { ...l, ...pola } : l)) })) };
}

/** Zmienia nazwę sekcji albo zaznacza / odznacza wszystkie jej linki (wPliku). */
export function zmienSekcje(model, idSekcji, { nazwa, wPliku } = {}) {
  return {
    ...model,
    sekcje: model.sekcje.map((s) => {
      if (s.id !== idSekcji) return s;
      const n = nazwa === undefined ? s : { ...s, nazwa };
      return wPliku === undefined ? n : { ...n, linki: n.linki.map((l) => ({ ...l, wPliku })) };
    }),
  };
}
