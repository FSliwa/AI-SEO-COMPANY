// Niemieckie dane JSON-LD Service (components/ServiceSchema.jsx, wariant de). Czysty ESM bez importów.
// Plik wypełniają grupy de-uslugi (audyt-seo, pozycjonowanie, geo) i de-geo; bez wpisu dla wariantu
// ServiceSchema nie wypisuje nic na /de (bezpieczny brak, zamiast tekstu PL albo EN).
// Kwoty NIE są tutaj: komponent bierze je z cenaEn / oferty[].cenaEn w USLUGI (EUR, te same co EN),
// a nazwy ofert z oferty[i].name poniżej (kolejność jak w USLUGI[wariant].oferty).
//
//   'audyt-seo': {
//     name: 'SEO Audit',
//     desc: 'SEO Audit mit technischer und inhaltlicher Analyse ...',
//     url: 'https://www.ai-seo-company.pl/de/seo-audit',   // urlDe('/audyt-seo') z lib/stronyDe.js
//     oferty: [{ name: 'SEO Audit' }],
//   },
// Warianty (klucze USLUGI): 'audyt-seo', 'pozycjonowanie', 'cennik', 'geo'.
export const USLUGI_DE = {
  // de-uslugi (18.11.2026): Kwoty z USLUGI (cenaEn): audyt 350 €, pozycjonowanie 450 €, cennik 450 / 590 / 590 €.
  'audyt-seo': {
    name: 'SEO Audit',
    desc: 'SEO Audit mit technischer und inhaltlicher Analyse: Indexierung, Core Web Vitals, Überschriftenstruktur, Keywords und Linkprofil, dazu eine Maßnahmenliste mit Prioritäten.',
    url: 'https://www.ai-seo-company.pl/de/seo-audit',
    oferty: [{ name: 'SEO Audit als eigenständige Leistung' }],
  },
  'pozycjonowanie': {
    name: 'B2B SEO',
    desc: 'SEO für B2B-Unternehmen: technische Optimierung, Content, Linkaufbau und Reporting.',
    url: 'https://www.ai-seo-company.pl/de/seo-fuer-unternehmen',
  },
  'cennik': {
    name: 'SEO-Pakete',
    desc: 'SEO Kosten: die Monatspakete SEO Standard und SEO Premium sowie das Booster Pack mit neuer Website, mit monatlicher Abrechnung und Kündigung jederzeit (Booster Pack: mindestens 3 Monate).',
    url: 'https://www.ai-seo-company.pl/de/seo-kosten',
    oferty: [{ name: 'SEO Standard' }, { name: 'SEO Premium' }, { name: 'Booster Pack' }],
  },
  // de-geo (18.11.2026): Texte wie lib/de/geo.js (SERVICE_SCHEMA); Kwoty 235 € / 115 € kommen aus USLUGI.geo (cenaEn).
  'geo': {
    name: 'Generative Engine Optimization (GEO)',
    desc: 'Generative Engine Optimization: Sichtbarkeit Ihres Unternehmens in den Antworten von ChatGPT, Gemini, Perplexity und in den AI Overviews von Google, mit wöchentlicher Messung im Kundenportal.',
    url: 'https://www.ai-seo-company.pl/de/ki-suchoptimierung',
    oferty: [
      { name: 'KI-Sichtbarkeit Audit' },
      { name: 'Aufpreis zu SEO Standard: Messung und Maßnahmen für KI-Sichtbarkeit' },
    ],
  },
};
