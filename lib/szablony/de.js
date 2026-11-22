// Niemieckie dane szablonów do pobrania (de-narzedzia, 18.-22.11.2026): łączy dane bazowe (slug, plik, updated…) z blokiem `de`
// z lib/szablony/<slug>.de.js. Strona DE: components/de/narzedzia/SzablonStronaDe.jsx. Pliki PL/EN bez zmian.
import { szablonBySlug } from './index';
import contentPlanDe from './content-plan.de';
import checklistaSeoDe from './checklista-seo.de';
import doborSlowKluczowychDe from './dobor-slow-kluczowych.de';
import checklistaEeatDe from './checklista-e-e-a-t.de';
import daneStrukturalneDe from './dane-strukturalne-json-ld.de';
import raportSeoDe from './raport-seo.de';
import analizaKonkurencjiDe from './szablon-analizy-konkurencji-seo.de';
import strategiaSeoDe from './szablon-strategii-seo.de';
import migracjaStronyDe from './checklista-migracji-strony.de';
import umowaDe from './umowa-na-pozycjonowanie.de';
import wizytowkaGoogleDe from './checklista-wizytowki-google.de';
import briefCopywriteraDe from './brief-dla-copywritera.de';
import audytTresciDe from './szablon-audytu-tresci.de';
import linkowanieWewnetrzneDe from './linkowanie-wewnetrzne.de';
import briefStronyDe from './brief-strony-internetowej.de';
import zapytanieOfertoweDe from './zapytanie-ofertowe-seo.de';

// slug PL szablonu -> { blok DE, PDF }. PDF: public/pliki/de/ (źródło: scripts/szablony/pdf-de*.mjs i umowa-pdf.mjs).
const DE = {
  'content-plan': { dane: contentPlanDe, pdf: '/pliki/de/redaktionsplan-vorlage.pdf' },
  'checklista-seo': { dane: checklistaSeoDe, pdf: '/pliki/de/seo-checkliste.pdf' },
  'dobor-slow-kluczowych': { dane: doborSlowKluczowychDe, pdf: '/pliki/de/keyword-recherche-vorlage.pdf' },
  'checklista-e-e-a-t': { dane: checklistaEeatDe, pdf: '/pliki/de/e-e-a-t-checkliste.pdf' },
  'dane-strukturalne-json-ld': { dane: daneStrukturalneDe, pdf: '/pliki/de/schema-markup-beispiele.pdf' },
  'raport-seo': { dane: raportSeoDe, pdf: '/pliki/de/seo-report-vorlage.pdf' },
  'szablon-analizy-konkurencji-seo': { dane: analizaKonkurencjiDe, pdf: '/pliki/de/wettbewerbsanalyse-vorlage.pdf' },
  'szablon-strategii-seo': { dane: strategiaSeoDe, pdf: '/pliki/de/seo-strategie-vorlage.pdf' },
  'checklista-migracji-strony': { dane: migracjaStronyDe, pdf: '/pliki/de/website-relaunch-checkliste.pdf' },
  'umowa-na-pozycjonowanie': { dane: umowaDe, pdf: '/pliki/de/seo-vertrag-checkliste.pdf' },
  'checklista-wizytowki-google': { dane: wizytowkaGoogleDe, pdf: '/pliki/de/google-unternehmensprofil-checkliste.pdf' },
  'brief-dla-copywritera': { dane: briefCopywriteraDe, pdf: '/pliki/de/briefing-vorlage-texter.pdf' },
  'szablon-audytu-tresci': { dane: audytTresciDe, pdf: '/pliki/de/content-audit-vorlage.pdf' },
  'linkowanie-wewnetrzne': { dane: linkowanieWewnetrzneDe, pdf: '/pliki/de/interne-verlinkung-vorlage.pdf' },
  'brief-strony-internetowej': { dane: briefStronyDe, pdf: '/pliki/de/website-briefing-vorlage.pdf' },
  'zapytanie-ofertowe-seo': { dane: zapytanieOfertoweDe, pdf: '/pliki/de/seo-ausschreibung-vorlage.pdf' },
};

/** Dane szablonu z blokiem `de` (albo null dla szablonu bez wersji DE). */
export function szablonDe(slug) {
  const de = DE[slug];
  if (!de) return null;
  const baza = szablonBySlug(slug) ?? (slug === 'raport-seo' ? { slug: 'raport-seo', plik: 'raport-seo', updated: de.dane.updated ?? '2026-11-22' } : null);
  if (!baza) return null;
  return {
    ...baza,
    ...(de.dane.opublikowanoDe ? { opublikowanoDe: de.dane.opublikowanoDe } : {}),
    de: de.dane.de,
    seoDe: de.dane.seo,
    plikPdfDe: de.pdf,
  };
}

export const SLUGI_SZABLONOW_DE = Object.keys(DE);
