export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe('/cookies', { languages: { pl: 'https://www.ai-seo-company.pl/cookies', en: 'https://www.ai-seo-company.pl/en/cookies' } });
  }
  return {
  title: locale === 'en' ? 'Cookies Policy | AI SEO COMPANY' : 'Polityka Cookies | AI SEO COMPANY',
  description: locale === 'en' ? 'Information about cookies and how they are used on the AI SEO COMPANY agency website.' : 'Informacje o plikach cookies i sposobach ich wykorzystania na stronie agencji AI SEO COMPANY.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/cookies' : 'https://www.ai-seo-company.pl/cookies',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/cookies',
      'x-default': 'https://www.ai-seo-company.pl/cookies',
      'en': 'https://www.ai-seo-company.pl/en/cookies',
      ...hreflangDe('/cookies')
    }
  },
};
}

import CookiesContent from './CookiesContent';
import DatenschutzDe from '@/components/de/DatenschutzDe';
import { metadataDe, hreflangDe } from '@/lib/stronyDe';

export default async function CookiesPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <DatenschutzDe />;
  return <CookiesContent />;
}
