import { BASE_URL } from '@/lib/sitemapEntries';
import { DE_AKTYWNE, STRONY_DE, hrefDe, opublikowaneSciezkiDe } from '@/lib/stronyDe';
import { BIURO, REJESTR, MAPA_GOOGLE_URL, PROFILE_FIRMY } from '@/lib/firma';

// Deutsche llms.txt unter /de/llms.txt (18.11.2026). Wird NUR bei aktiver deutscher Version
// ausgeliefert (lib/stronyDe.js: DE_OPUBLIKOWANE oder NEXT_PUBLIC_PODGLAD_DE=1); sonst 404, und
// die polnische /llms.txt (app/llms.txt/route.js) enthält keinen deutschen Link. Die Liste kommt
// aus dem Registry lib/stronyDe.js, also nie eine Seite, die es nicht gibt.
export const dynamic = 'force-static';

const ABSCHNITTE = [
  ['Leistungen', ['de-uslugi']],
  ['KI-Sichtbarkeit und GEO', ['de-geo']],
  ['Vergleiche und Entscheidungshilfen', ['de-porownania']],
  ['Kostenlose Tools und Vorlagen', ['de-narzedzia']],
  ['Ratgeber', ['de-blog']],
  ['Rechtliches', ['de-prawne']],
];

function inhalt() {
  const klucze = opublikowaneSciezkiDe();
  const zeile = (k) => {
    const w = STRONY_DE[k];
    return `- [${w.tytul}](${BASE_URL}${hrefDe(k)}): ${w.opis}`;
  };
  const abschnitte = ABSCHNITTE.map(([titel, gruppen]) => {
    const zeilen = klucze.filter((k) => gruppen.includes(STRONY_DE[k].grupa)).map(zeile);
    return zeilen.length ? `## ${titel}\n\n${zeilen.join('\n')}` : null;
  }).filter(Boolean);
  const profile = [
    '## Externe Unternehmensprofile',
    '',
    `- [Google Unternehmensprofil (Google Maps)](${MAPA_GOOGLE_URL}): Bürostandort ${BIURO.ulica}, Warschau.`,
    `- [Clutch](${PROFILE_FIRMY.clutch}): Agenturprofil auf Clutch.`,
    `- [Sortlist](${PROFILE_FIRMY.sortlist}): Agenturprofil auf Sortlist.`,
    ...(PROFILE_FIRMY.goodfirms ? [`- [GoodFirms](${PROFILE_FIRMY.goodfirms}): Agenturprofil auf GoodFirms.`] : []),
    ...(PROFILE_FIRMY.designrush ? [`- [DesignRush](${PROFILE_FIRMY.designrush}): Agenturprofil auf DesignRush.`] : []),
    ...(PROFILE_FIRMY.githubAutor ? [`- [GitHub (Filip Śliwa)](${PROFILE_FIRMY.githubAutor}): Autorenprofil und Open-Source-Projekte.`] : []),
    ...(PROFILE_FIRMY.githubFirma ? [`- [GitHub (AI Crawler Presets)](${PROFILE_FIRMY.githubFirma}): Open-Source-Vorlagen für robots.txt und llms.txt.`] : []),
    ...(PROFILE_FIRMY.linkedinFirma ? [`- [LinkedIn](${PROFILE_FIRMY.linkedinFirma}): Unternehmensprofil von AI SEO COMPANY.`] : []),
  ].join('\n');
  return `# AI SEO COMPANY (Deutsch)

> AI SEO COMPANY ist eine KI SEO Agentur aus Warschau mit Schwerpunkt Generative Engine Optimization (GEO): SEO Audits, B2B SEO, Optimierung für Antworten von ChatGPT, Gemini, Perplexity und Google AI Overviews sowie kostenlose Tools. Betreiber: AI SIGNALS COMPANY Prosta Spółka Akcyjna, ul. Grzybowska 12/14 lok. B-3, 00-132 Warschau, KRS ${REJESTR.krs}, NIP ${REJESTR.nip}, Aktienkapital ${REJESTR.kapital.de}.

${profile}

${abschnitte.join('\n\n')}

## Weitere Sprachversionen

- [Polski](${BASE_URL}/llms.txt)
`;
}

export function GET() {
  if (!DE_AKTYWNE) return new Response('Not found', { status: 404 });
  return new Response(inhalt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
