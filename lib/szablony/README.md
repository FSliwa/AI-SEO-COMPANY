# Szablony do pobrania (lib/szablony)

Każdy szablon = jeden plik danych `lib/szablony/<slug>.js` (czysty ESM, `export default {...}`,
bez importów `@/`), renderowany przez `components/narzedzia/SzablonStrona.jsx` pod
`/narzedzia/<slug>` (PL) i `/en<sciezkaEn>` (EN). PDF wysyła panel (`/api/szablony`, id `plik`,
lista w repo panelu `lib/szablony.ts`), pliki leżą w `public/pliki/`.

```js
export default {
  slug: 'content-plan',                  // PL: /narzedzia/content-plan
  sciezkaEn: '/tools/content-calendar-template',
  plik: 'content-plan',                  // id dla panelu (/api/szablony)
  opublikowano: null,                    // data wdrożenia wpisuje integracja
  updated: '2026-11-11',
  fraza: { pl: 'content plan', en: 'content calendar template' },   // fraza główna
  frazyDodatkowe: { pl: [...], en: [...] },
  seo: { pl: { tytul, opis }, en: { tytul, opis } },  // title <= 62 zn., description 120-158 zn.
  pl: {
    okruszek, tag, h1, lead,             // lead = AnswerBox, 40-60 słów, pierwsze zdanie odpowiada wprost
    karta: { nazwa, opis, cta },         // karta w hubie /narzedzia (sekcja Szablony)
    sekcje: [{ id, h2, html, tabela?: { id, caption, columns: [{ key, label }], rows: [{...}], przypis? }, htmlPo? }],
    podglad: { h2, opis, html },         // pełny podgląd zawartości szablonu w HTML
    formularz: { h2, opis, etykieta, przycisk, przedmiot, komunikatOk },
    faq: [{ question, answer }],          // 4-6 pytań, odpowiedzi 40-80 słów
    zrodla: [{ url, nazwa, data: 'RRRR-MM-DD' }],  // tylko sprawdzone źródła; może być []
    powiazane: [{ href: '<klucz z i18n/routing.js>', tekst, opis? }],
    kroki?: [{ name, text }],            // HowTo (jak wypełnić szablon), 4-8 kroków
    plikNazwa,                           // nazwa dokumentu w schema, np. 'Content plan: szablon (PDF)'
  },
  en: { /* te same klucze po angielsku */ },
};
```

HTML w polach `html`: tylko `<p> <ul> <ol> <li> <strong> <em> <h3> <table> <thead> <tbody> <tr> <th> <td> <code> <a href>`;
linki wewnętrzne w HTML jako gotowe adresy (`/audyt-seo`, w EN `/en/seo-audit`), bez JS i stylów inline.
Sprawdzenie: `node scripts/szablony/sprawdz.mjs lib/szablony/<slug>.js`.
