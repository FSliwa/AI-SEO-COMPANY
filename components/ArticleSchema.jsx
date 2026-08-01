export default function ArticleSchema({ title, description, url, datePublished, imageUrl }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ai-seo-company.pl${url || '/'}`
    },
    headline: title,
    description: description,
    image: imageUrl ? `https://www.ai-seo-company.pl${imageUrl}` : 'https://www.ai-seo-company.pl/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'AI SEO COMPANY',
      url: 'https://www.ai-seo-company.pl/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI SEO COMPANY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ai-seo-company.pl/ai-seo-company-logotyp-v2.png'
      }
    },
    datePublished: datePublished || new Date().toISOString()
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
