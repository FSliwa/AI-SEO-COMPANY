// Niemieckie dane szablonów do pobrania (de-narzedzia, 18.11.2026): łączy dane bazowe (slug, plik, updated…) z blokiem `de`
// z lib/szablony/<slug>.de.js. Strona DE: components/de/narzedzia/SzablonStronaDe.jsx. Pliki PL/EN bez zmian.
import { szablonBySlug } from './index';
import contentPlanDe from './content-plan.de';
import checklistaSeoDe from './checklista-seo.de';
import doborSlowKluczowychDe from './dobor-slow-kluczowych.de';
import checklistaEeatDe from './checklista-e-e-a-t.de';
import daneStrukturalneDe from './dane-strukturalne-json-ld.de';

// slug PL szablonu -> { blok DE, PDF }. PDF: public/pliki/de/ (źródło: scripts/szablony/pdf-de.mjs i pdf-de-faza2.mjs).
const DE = {
  'content-plan': { dane: contentPlanDe, pdf: '/pliki/de/redaktionsplan-vorlage.pdf' },
  'checklista-seo': { dane: checklistaSeoDe, pdf: '/pliki/de/seo-checkliste.pdf' },
  'dobor-slow-kluczowych': { dane: doborSlowKluczowychDe, pdf: '/pliki/de/keyword-recherche-vorlage.pdf' },
  'checklista-e-e-a-t': { dane: checklistaEeatDe, pdf: '/pliki/de/e-e-a-t-checkliste.pdf' },
  'dane-strukturalne-json-ld': { dane: daneStrukturalneDe, pdf: '/pliki/de/schema-markup-beispiele.pdf' },
};

/** Dane szablonu z blokiem `de` (albo null dla szablonu bez wersji DE). */
export function szablonDe(slug) {
  const baza = szablonBySlug(slug);
  const de = DE[slug];
  if (!baza || !de) return null;
  return { ...baza, de: de.dane.de, seoDe: de.dane.seo, plikPdfDe: de.pdf };
}

export const SLUGI_SZABLONOW_DE = Object.keys(DE);
