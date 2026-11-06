import AgencySwitchClient from '@/components/AgencySwitchClient';
import ArticleSchema from '@/components/ArticleSchema';
import { CHECKLIST_COUNT, STEPS } from '@/lib/agencySwitch';
import { LASTMOD } from '@/lib/lastmod';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';

// Poradnik i checklista dla firm, które zmieniają agencję SEO (zadanie 3.2). Rynek polski,
// polskie umowy i przepisy: tylko wersja PL (EN = 404, poza sitemapą w EN).
//
// 5.11.2026 (PLAN-v2 6.23, ZA1; SA-10 i OP-12 po weryfikacji, wybór title w 6.0a):
// - title 64 -> 59 zn. (pełna fraza „wypowiedzenie umowy”, bez obietnicy „bez kar” przy cudzej
//   umowie), meta 158 -> 123 zn.; metadane przez wzorzec stron tylko-PL (lib/stronaPl.js):
//   canonical bez hreflang, DEFAULT_ROBOTS, openGraph strony;
// - dane strukturalne: HowTo z tablicy STEPS (te same 6 kroków co widoczna lista) i Article
//   z autorem (@id .../o-nas#filip-sliwa, węzeł Person z AboutAuthor) razem z widocznym podpisem
//   (Byline w AgencySwitchClient). datePublished = commit e57b408 (29.10.2026), dateModified =
//   LASTMOD tej strony - ta sama data co w podpisie i w sitemapie. Bez BreadcrumbList w Article
//   (breadcrumb={null}): okruszki daje komponent Breadcrumbs.
const SCIEZKA = '/zmiana-agencji-seo';
const URL_STRONY = `https://www.ai-seo-company.pl${SCIEZKA}`;
const TITLE = 'Zmiana agencji SEO i wypowiedzenie umowy bez utraty pozycji';
const DESCRIPTION = `Jak wypowiedzieć umowę z agencją SEO i co od niej zabrać: konta Google, domenę, treści, linki. Checklista ${CHECKLIST_COUNT} punktów w PDF.`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataStronyPl({ locale, sciezka: SCIEZKA, title: TITLE, description: DESCRIPTION, ogType: 'article' });
}

const howTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${URL_STRONY}#howto`,
  name: 'Wypowiedzenie umowy z agencją SEO krok po kroku',
  inLanguage: 'pl',
  step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
};

export default async function ZmianaAgencjiPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <ArticleSchema
        type="Article"
        breadcrumb={null}
        locale="pl"
        url={SCIEZKA}
        title="Jak zmienić agencję SEO bez kar i bez utraty pozycji"
        description={DESCRIPTION}
        datePublished="2026-10-29"
        dateModified={LASTMOD[URL_STRONY]}
        extra={{ '@id': `${URL_STRONY}#article` }}
      />
      <AgencySwitchClient />
    </>
  );
}
