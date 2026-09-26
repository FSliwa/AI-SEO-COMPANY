import { blogPosts } from '@/lib/blogPosts';
import { routing } from '@/i18n/routing';

const BASE = 'https://www.ai-seo-company.pl';

/**
 * BlogPosting JSON-LD for an article.
 *
 * Pass `slug` and everything else is read from lib/blogPosts.js, so the
 * structured data cannot drift from what the listing shows. Individual props
 * still override the looked-up values when a page needs something different.
 */
export default function ArticleSchema({
  slug,
  locale = 'pl',
  title,
  description,
  url,
  datePublished,
  imageUrl
}) {
  const post = slug ? blogPosts.find(p => p.slug === slug) : undefined;
  const isEn = locale === 'en';

  const resolvedTitle = title || (post && (isEn ? post.titleEn : post.titlePl));
  const resolvedDesc = description || (post && (isEn ? post.descEn : post.descPl));
  // Slugi bloga roznia sie miedzy jezykami i mieszkaja w mapie pathnames
  // (np. /blog/analiza-konkurencji-seo-przewodnik -> /blog/seo-competitor-analysis-step-by-step-guide).
  // Sklejanie `/en` + polski slug dawalo mainEntityOfPage i okruszki pod
  // adresem, ktory nie jest kanoniczny i nie istnieje. Dotyczy to takze
  // polskiej wersji: dla czesci wpisow klucz mapy != sciezka PL.
  const localizedPath = (slug, locale) => {
    const entry = routing.pathnames[slug];
    if (!entry) return slug;
    return typeof entry === 'string' ? entry : (entry[locale] || slug);
  };
  const resolvedUrl = url || (post && (isEn ? `/en${localizedPath(post.slug, 'en')}` : localizedPath(post.slug, 'pl'))) || '/';
  const resolvedDate = datePublished || (post && post.date);
  const resolvedImage = imageUrl || (post && (post.heroImage || post.image));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}${resolvedUrl}`
    },
    headline: resolvedTitle,
    description: resolvedDesc,
    image: resolvedImage ? `${BASE}${resolvedImage}` : `${BASE}/og-image.jpg`,
    inLanguage: isEn ? 'en' : 'pl',
    // A named person carries more weight than an organisation for advisory
    // content, which is what Google's rater guidelines look for.
    // Autor byl bytem-sierota: Person bez @id, url i sameAs, a strona autora nie
    // istniala. Teraz wskazuje na trwaly wezel Person z /o-nas (AboutAuthor),
    // a publisher na wezel #organization z layoutu - dzieki temu artykul, osoba
    // i firma sa jedna spojna encja zamiast trzech niepowiazanych opisow.
    author: {
      '@type': 'Person',
      '@id': `${BASE}/o-nas#filip-sliwa`,
      name: 'Filip Śliwa',
      url: isEn ? `${BASE}/en/about-us` : `${BASE}/o-nas`,
      jobTitle: isEn ? 'SEO specialist' : 'Specjalista SEO',
      worksFor: { '@id': `${BASE}/#organization` }
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'AI SEO COMPANY',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/ai-seo-company-logotyp-v2.png`
      }
    },
    datePublished: resolvedDate || new Date().toISOString(),
    // Data modyfikacji = data publikacji, dopoki tresc realnie sie nie
    // zmienila (regula z CLAUDE.md: zadnych dat aktualizacji z sufitu).
    dateModified: resolvedDate || new Date().toISOString()
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'Strona Główna',
        item: `${BASE}${isEn ? '/en' : '/'}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'Blog' : 'Blog',
        item: `${BASE}${isEn ? '/en/blog' : '/blog'}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: resolvedTitle,
        item: `${BASE}${resolvedUrl}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]) }}
    />
  );
}
