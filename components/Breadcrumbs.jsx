'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

/* Okruszki na podstronach uslugowych: widoczna nawigacja + BreadcrumbList
   w JSON-LD. Google wymaga, by znacznik odzwierciedlal widoczna tresc,
   wiec oba zyja w jednym komponencie - nie da sie ich rozjechac.
   Ostatni element celowo bez "item" (dozwolone w wytycznych). */
export default function Breadcrumbs({ pl, en }) {
  const lang = useLocale();
  const label = lang === 'en' ? en : pl;
  const homeUrl = lang === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Strona główna', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: label },
    ],
  };
  return (
    <nav className="breadcrumbs" aria-label={lang === 'en' ? 'Breadcrumb' : 'Okruszki nawigacyjne'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/">{lang === 'en' ? 'Home' : 'Strona główna'}</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{label}</span>
    </nav>
  );
}
