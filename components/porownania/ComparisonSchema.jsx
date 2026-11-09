import ArticleSchema from '@/components/ArticleSchema';
import { hrefWJezyku } from '@/lib/linkiEn';

const BASE = 'https://www.ai-seo-company.pl';

/**
 * JSON-LD strony porównania (5.11.2026; PLAN-v2 6.0, CB-08): Article z autorem
 * @id …/o-nas#filip-sliwa i wydawcą #organization (oba z ArticleSchema), headline = H1,
 * datePublished = published, dateModified = updated z lib/porownania.js, about z wpisu.
 * breadcrumb={null}: jedynym źródłem BreadcrumbList jest <Breadcrumbs parent={…} /> (3 pozycje),
 * więc na stronie nie ma okruszka „Blog” ani drugiego BreadcrumbList. FAQPage generuje AppleFaq.
 * WebPage.reviewedBy (radca prawny) dochodzi dopiero po przeglądzie D5 (PLAN-v2 6.3, 6.14).
 */
export default function ComparisonSchema({ porownanie: p, locale = 'pl' }) {
  const en = locale === 'en';
  // EN: adres z lib/linkiEn.js (np. /en/comparisons/seo-vs-geo), inLanguage 'en'; PL bez zmian.
  const url = en ? hrefWJezyku(`/porownania/${p.slug}`, 'en') : `/porownania/${p.slug}`;
  return (
    <ArticleSchema
      type="Article"
      breadcrumb={null}
      locale={en ? 'en' : 'pl'}
      url={url}
      title={p.h1}
      description={p.description}
      datePublished={p.published}
      dateModified={p.updated}
      extra={{ '@id': `${BASE}${url}#article`, ...(p.about ? { about: p.about } : {}) }}
    />
  );
}
