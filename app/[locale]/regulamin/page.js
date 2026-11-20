export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe('/regulamin', { languages: { pl: 'https://www.ai-seo-company.pl/regulamin', en: 'https://www.ai-seo-company.pl/en/terms' } });
  }
  return {
    title: locale === 'en' ? 'Terms of Service | AI SEO COMPANY' : 'Regulamin świadczenia usług | AI SEO COMPANY',
    description: locale === 'en'
      ? 'Terms of service for electronic services provided by AI SIGNALS COMPANY P.S.A. - scope of services, technical requirements, contracts and complaints.'
      : 'Regulamin świadczenia usług drogą elektroniczną przez AI SIGNALS COMPANY P.S.A. - zakres usług, wymagania techniczne, umowy i reklamacje.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/terms' : 'https://www.ai-seo-company.pl/regulamin',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/regulamin',
        'x-default': 'https://www.ai-seo-company.pl/regulamin',
        'en': 'https://www.ai-seo-company.pl/en/terms',
        ...hreflangDe('/regulamin')
      }
    },
  };
}

import RegulaminContent from './RegulaminContent';
import AgbDe from '@/components/de/AgbDe';
import { metadataDe, hreflangDe } from '@/lib/stronyDe';

export default async function RegulaminPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <AgbDe />;
  return <RegulaminContent />;
}
