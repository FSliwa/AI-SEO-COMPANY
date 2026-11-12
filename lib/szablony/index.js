// Rejestr szablonów do pobrania (11.11.2026): strony /narzedzia/<slug> renderuje
// components/narzedzia/SzablonStrona.jsx z danych lib/szablony/<slug>.js (kontrakt: README.md).
// Kolejność = kolejność kart w sekcji „Szablony” huba /narzedzia.
// 12.11.2026: 14 szablonów w kolejności pracy: ogólna checklista, frazy i strategia, treści,
// technika i jakość, SEO lokalne, nowa strona, współpraca z agencją. Każdy `plik` musi mieć
// wpis w panelu (repo panelu lib/szablony.ts), a ścieżka wpis w lib/publikacja.js i lib/stronyEn.js.
import checklistaSeo from './checklista-seo';
import contentPlan from './content-plan';
import analizaKonkurencji from './szablon-analizy-konkurencji-seo';
import strategiaSeo from './szablon-strategii-seo';
import briefStrony from './brief-strony-internetowej';
import migracjaStrony from './checklista-migracji-strony';
import doborSlowKluczowych from './dobor-slow-kluczowych';
import briefCopywritera from './brief-dla-copywritera';
import audytTresci from './szablon-audytu-tresci';
import linkowanieWewnetrzne from './linkowanie-wewnetrzne';
import checklistaEeat from './checklista-e-e-a-t';
import daneStrukturalne from './dane-strukturalne-json-ld';
import wizytowkaGoogle from './checklista-wizytowki-google';
import zapytanieOfertowe from './zapytanie-ofertowe-seo';

export const SZABLONY = [
  checklistaSeo,
  doborSlowKluczowych,
  analizaKonkurencji,
  strategiaSeo,
  contentPlan,
  briefCopywritera,
  audytTresci,
  linkowanieWewnetrzne,
  checklistaEeat,
  daneStrukturalne,
  wizytowkaGoogle,
  migracjaStrony,
  briefStrony,
  zapytanieOfertowe,
];

export function szablonBySlug(slug) {
  return SZABLONY.find((s) => s.slug === slug) ?? null;
}
