'use client';

import { useLocale } from 'next-intl';
import { Link, getPathname } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';

const BASE = 'https://www.ai-seo-company.pl';

/* Okruszki na podstronach uslugowych: widoczna nawigacja + BreadcrumbList
   w JSON-LD. Google wymaga, by znacznik odzwierciedlal widoczna tresc,
   wiec oba zyja w jednym komponencie - nie da sie ich rozjechac.
   Ostatni element celowo bez "item" (dozwolone w wytycznych).

   5.11.2026 (PLAN-v2 6.0, CB-05, CB-08): opcjonalny prop parent = { href, pl, en } daje
   3 poziomy: "Strona glowna › parent › biezaca" i BreadcrumbList z 3 pozycjami (2. z item =
   pelny URL rodzica, 3. bez item). Na stronach z parent to jedyne zrodlo BreadcrumbList
   (ArticleSchema z breadcrumb={null}). Rodzic przed swoja partia (lib/publikacja.js) =
   okruszki 2-poziomowe, bez linku do 404. Bez parent HTML i JSON-LD bajt w bajt jak wczesniej. */
export default function Breadcrumbs({ pl, en, parent }) {
  const lang = useLocale();
  const label = lang === 'en' ? en : pl;
  const homeUrl = lang === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/';
  const rodzic = parent && hrefJesliOpublikowana(parent.href) ? parent : null;

  if (rodzic) {
    const rodzicLabel = lang === 'en' ? (rodzic.en || rodzic.pl) : rodzic.pl;
    const rodzicUrl = `${BASE}${getPathname({ href: rodzic.href, locale: lang })}`;
    const jsonLd3 = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Strona główna', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: rodzicLabel, item: rodzicUrl },
        { '@type': 'ListItem', position: 3, name: label },
      ],
    };
    return (
      <nav className="breadcrumbs" aria-label={lang === 'en' ? 'Breadcrumb' : 'Okruszki nawigacyjne'}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd3) }} />
        <Link href="/">{lang === 'en' ? 'Home' : 'Strona główna'}</Link>
        <span aria-hidden="true">›</span>
        <Link href={rodzic.href}>{rodzicLabel}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{label}</span>
      </nav>
    );
  }

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
