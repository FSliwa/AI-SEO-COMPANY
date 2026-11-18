// Niemieckie dane szablonów do pobrania (de-narzedzia, 18.11.2026): łączy dane bazowe (slug, plik, updated…) z blokiem `de`
// z lib/szablony/<slug>.de.js. Strona DE: components/de/narzedzia/SzablonStronaDe.jsx. Pliki PL/EN bez zmian.
import { szablonBySlug } from './index';
import contentPlanDe from './content-plan.de';
import checklistaSeoDe from './checklista-seo.de';

// slug PL szablonu -> { blok DE, PDF }. PDF: public/pliki/de/ (źródło: scripts/szablony/pdf-de.mjs).
const DE = {
  'content-plan': { dane: contentPlanDe, pdf: '/pliki/de/redaktionsplan-vorlage.pdf' },
  'checklista-seo': { dane: checklistaSeoDe, pdf: '/pliki/de/seo-checkliste.pdf' },
};

/** Dane szablonu z blokiem `de` (albo null dla szablonu bez wersji DE). */
export function szablonDe(slug) {
  const baza = szablonBySlug(slug);
  const de = DE[slug];
  if (!baza || !de) return null;
  return { ...baza, de: de.dane.de, seoDe: de.dane.seo, plikPdfDe: de.pdf };
}

export const SLUGI_SZABLONOW_DE = Object.keys(DE);
