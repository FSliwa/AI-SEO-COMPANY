// Dane do artykułu /en/blog/how-long-does-seo-take (18.11.2026): przebiegi z Google Search Console
// czterech serwisów, które są już na stronie (sekcja Realizacje w components/Portfolio.jsx).
// Serie liczymy z lib/realizacjeGsc.js (odczyt z wykresów GSC, skalowanie do kafelków; opis metody
// i błąd odczytu są w tamtym pliku), więc tabela w artykule nie może się rozjechać z wykresami.
// Format punktu w serii: [od, do, kliknięcia, wyświetlenia].
import { SERIE_GSC } from './realizacjeGsc';

const suma = (seria, od, doo) => seria.slice(od, doo).reduce((a, p) => [a[0] + p[2], a[1] + p[3]], [0, 0]);

export const liczba = (n) => new Intl.NumberFormat('en-US').format(n);

const mt = SERIE_GSC.madamethai;
const st = SERIE_GSC.staniax;
const ase = SERIE_GSC['ase-bot'];
const tql = SERIE_GSC.tql;

// Madame Thai: dane dzienne, 26 dni (27.07-21.08.2026). Tygodnie liczone od pierwszego dnia serii.
export const MADAME_THAI = {
  tydzien1: suma(mt, 0, 7),
  tydzien2: suma(mt, 7, 14),
  tydzien3: suma(mt, 14, 21),
  reszta: suma(mt, 21, 26),
  razem: suma(mt, 0, mt.length),
};

// Staniax: sumy tygodniowe, 13 tygodni (22.05-21.08.2026).
export const STANIAX = {
  tydzien1: st[0],
  tydzien4: st[3],
  tydzien13: st[12],
  razem: suma(st, 0, st.length),
  maxKlikTyg: Math.max(...st.map((p) => p[2])),
  minKlikTyg: Math.min(...st.map((p) => p[2])),
};

// ASE-BOT (nasz projekt własny): 13 tygodni, szczyt w lipcu i spadek w sierpniu.
export const ASE_BOT = {
  razem: suma(ase, 0, ase.length),
  szczyt: ase.reduce((m, p) => (p[3] > m[3] ? p : m), ase[0]),
  ostatni: ase[ase.length - 1],
};

// TQL: dane dzienne, pierwsze 18 dni (5-22.08.2026); średnia pozycja 34,6 jest w kafelku GSC (Portfolio.jsx).
export const TQL = {
  razemWysw: suma(tql, 0, tql.length)[1],
  pierwszyDzien: tql[0][3],
  ostatniTydzien: tql.slice(-7).map((p) => p[3]),
};
