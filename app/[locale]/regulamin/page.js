export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Terms of Service | AI SEO COMPANY' : 'Regulamin świadczenia usług | AI SEO COMPANY',
    description: locale === 'en'
      ? 'Terms of service for electronic services provided by AI SIGNALS COMPANY P.S.A. — scope of services, technical requirements, contracts and complaints.'
      : 'Regulamin świadczenia usług drogą elektroniczną przez AI SIGNALS COMPANY P.S.A. — zakres usług, wymagania techniczne, umowy i reklamacje.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/terms' : 'https://www.ai-seo-company.pl/regulamin',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/regulamin',
        'x-default': 'https://www.ai-seo-company.pl/en/terms',
        'en': 'https://www.ai-seo-company.pl/en/terms'
      }
    },
  };
}

import RegulaminContent from './RegulaminContent';

export default function RegulaminPage() {
  return <RegulaminContent />;
}
