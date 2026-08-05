import { blogPosts } from '@/lib/blogPosts';

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
  const resolvedUrl = url || (post && (isEn ? `/en${post.slug}` : post.slug)) || '/';
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
    author: {
      '@type': 'Person',
      name: 'Filip Śliwa',
      jobTitle: isEn ? 'SEO specialist' : 'Specjalista SEO',
      worksFor: {
        '@type': 'Organization',
        name: 'AI SEO COMPANY',
        url: `${BASE}/`
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI SEO COMPANY',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/ai-seo-company-logotyp-v2.png`
      }
    },
    datePublished: resolvedDate || new Date().toISOString()
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
