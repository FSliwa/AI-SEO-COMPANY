// Dane do artykułu /en/blog/how-long-does-seo-take (aktualizacja 22.11.2026 pod 13-tygodniowe serie GSC API):
// Przebiegi z Google Search Console API czterech serwisów opublikowanych w portfolio (lib/realizacjeGsc.js).
// Format punktu w SERIE_GSC: [od, do, kliknięcia, wyświetlenia] (koszyki tygodniowe z 92-dniowego okna 3m).
import { SERIE_GSC, METRYKI_GSC } from './realizacjeGsc';

const suma = (seria) => seria.reduce((a, p) => [a[0] + p[2], a[1] + p[3]], [0, 0]);

export const liczba = (n) => new Intl.NumberFormat('en-US').format(n);

const mt = SERIE_GSC.madamethai;
const st = SERIE_GSC.staniax;
const ase = SERIE_GSC['ase-bot'];
const tql = SERIE_GSC.tql;

export const MADAME_THAI = {
  metryki: METRYKI_GSC.madamethai,
  tydzien1: mt[0],
  ostatni: mt[mt.length - 1],
  razem: [METRYKI_GSC.madamethai.totalClicks, METRYKI_GSC.madamethai.totalImpr],
};

export const STANIAX = {
  metryki: METRYKI_GSC.staniax,
  tydzien1: st[0],
  tydzien4: st[Math.min(3, st.length - 1)],
  tydzien13: st[st.length - 1],
  razem: [METRYKI_GSC.staniax.totalClicks, METRYKI_GSC.staniax.totalImpr],
  maxKlikTyg: Math.max(...st.map((p) => p[2])),
  minKlikTyg: Math.min(...st.map((p) => p[2])),
};

export const ASE_BOT = {
  metryki: METRYKI_GSC['ase-bot'],
  razem: [METRYKI_GSC['ase-bot'].totalClicks, METRYKI_GSC['ase-bot'].totalImpr],
  szczyt: ase.reduce((m, p) => (p[3] > m[3] ? p : m), ase[0]),
  ostatni: ase[ase.length - 1],
};

export const TQL = {
  metryki: METRYKI_GSC.tql,
  razemWysw: METRYKI_GSC.tql.totalImpr,
  razemKlik: METRYKI_GSC.tql.totalClicks,
  pierwszyTydzien: tql[0],
  ostatniTydzien: tql[tql.length - 1],
  sumaTygodni: suma(tql),
};
