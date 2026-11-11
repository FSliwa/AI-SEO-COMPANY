// Rejestr szablonów do pobrania (11.11.2026): strony /narzedzia/<slug> renderuje
// components/narzedzia/SzablonStrona.jsx z danych lib/szablony/<slug>.js (kontrakt: README.md).
// Kolejność = kolejność kart w sekcji „Szablony” huba /narzedzia.
import checklistaSeo from './checklista-seo';
import contentPlan from './content-plan';
import analizaKonkurencji from './szablon-analizy-konkurencji-seo';
import strategiaSeo from './szablon-strategii-seo';
import briefStrony from './brief-strony-internetowej';
import migracjaStrony from './checklista-migracji-strony';

export const SZABLONY = [checklistaSeo, contentPlan, analizaKonkurencji, strategiaSeo, briefStrony, migracjaStrony];

export function szablonBySlug(slug) {
  return SZABLONY.find((s) => s.slug === slug) ?? null;
}
