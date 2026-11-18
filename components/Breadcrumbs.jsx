'use client';

import { useLocale } from 'next-intl';
import { Link, getPathname } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { maWersjeDe } from '@/lib/stronyDe';
import { tr } from '@/lib/shellDe';

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
// Wersja niemiecka (18.11.2026): prop de (etykieta strony), parent.de (etykieta rodzica); bez nich EN.
export default function Breadcrumbs({ pl, en, de, parent }) {
  const lang = useLocale();
  const label = lang === 'de' ? (de || en) : lang === 'en' ? en : pl;
  const homeUrl = lang === 'de' ? 'https://www.ai-seo-company.pl/de' : lang === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/';
  const rodzic = parent && (lang === 'de' ? maWersjeDe(parent.href) : hrefJesliOpublikowana(parent.href)) ? parent : null;

  if (rodzic) {
    const rodzicLabel = lang === 'de' ? (rodzic.de || rodzic.en || rodzic.pl) : lang === 'en' ? (rodzic.en || rodzic.pl) : rodzic.pl;
    const rodzicUrl = `${BASE}${getPathname({ href: rodzic.href, locale: lang })}`;
    const jsonLd3 = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: tr(lang, 'Strona główna', 'Home'), item: homeUrl },
        { '@type': 'ListItem', position: 2, name: rodzicLabel, item: rodzicUrl },
        { '@type': 'ListItem', position: 3, name: label },
      ],
    };
    return (
      <nav className="breadcrumbs" aria-label={tr(lang, 'Okruszki nawigacyjne', 'Breadcrumb')}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd3) }} />
        <Link href="/">{tr(lang, 'Strona główna', 'Home')}</Link>
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
      { '@type': 'ListItem', position: 1, name: tr(lang, 'Strona główna', 'Home'), item: homeUrl },
      { '@type': 'ListItem', position: 2, name: label },
    ],
  };
  return (
    <nav className="breadcrumbs" aria-label={tr(lang, 'Okruszki nawigacyjne', 'Breadcrumb')}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/">{tr(lang, 'Strona główna', 'Home')}</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{label}</span>
    </nav>
  );
}
