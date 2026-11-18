// Formatowanie liczb, kwot i dat w trzech językach serwisu. Czysty ESM bez importów (serwer i klient).
// Niemiecki: przecinek dziesiętny, kropka jako separator tysięcy (1.234,56), kwota po liczbie ze
// spacją nierozdzielającą (1.234,56 €), data 18.11.2026 albo 18. November 2026.
// Komponenty grup DE używają tych funkcji zamiast własnych toLocaleString('pl-PL') / ('en-US').
// Intl w Node (build) i w przeglądarce daje ten sam wynik dla de-DE (pełne ICU od Node 13).

export const TAG_JEZYKA = { pl: 'pl-PL', en: 'en-US', de: 'de-DE' };
const tag = (lang) => TAG_JEZYKA[lang] || TAG_JEZYKA.pl;

/** Liczba: liczba(1234.5, 'de') = '1.234,5'; miejsc = maksymalna liczba miejsc po przecinku. */
export function liczba(n, lang = 'de', miejsc = 0) {
  if (n == null || Number.isNaN(Number(n))) return '';
  return new Intl.NumberFormat(tag(lang), { maximumFractionDigits: miejsc }).format(Number(n));
}

/** Procent z jednym miejscem: procent(12.34, 'de') = '12,3 %' (spacja nierozdzielająca jak w DIN 5008). */
export function procent(n, lang = 'de', miejsc = 1) {
  if (n == null || Number.isNaN(Number(n))) return '';
  const l = new Intl.NumberFormat(tag(lang), { minimumFractionDigits: miejsc, maximumFractionDigits: miejsc }).format(Number(n));
  return lang === 'de' ? `${l} %` : `${l}%`;
}

/** Kwota w euro: eur(1234.5, 'de') = '1.234,50 €'; bez miejsc po przecinku dla pełnych kwot (450 €). */
export function eur(n, lang = 'de') {
  if (n == null || Number.isNaN(Number(n))) return '';
  const calkowita = Number.isInteger(Number(n));
  return new Intl.NumberFormat(tag(lang), { style: 'currency', currency: 'EUR', minimumFractionDigits: calkowita ? 0 : 2, maximumFractionDigits: 2 }).format(Number(n));
}

/** Data: data('2026-11-18', 'de') = '18.11.2026'; dlugo = true daje '18. November 2026'. */
export function data(iso, lang = 'de', dlugo = false) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const opcje = dlugo ? { day: 'numeric', month: 'long', year: 'numeric' } : { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat(tag(lang), { ...opcje, timeZone: 'Europe/Warsaw' }).format(d);
}
