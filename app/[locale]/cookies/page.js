export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe('/cookies', { languages: { pl: 'https://www.ai-seo-company.pl/cookies', en: 'https://www.ai-seo-company.pl/en/cookies' } });
  }
  return {
  title: locale === 'en' ? 'Privacy and Cookies Policy (GDPR)' : 'Polityka prywatności i plików cookies (RODO)',
  description: locale === 'en'
    ? 'Privacy and cookies policy (GDPR) of AI SIGNALS COMPANY P.S.A.: data controller, Google Consent Mode, retention periods, processors and your rights.'
    : 'Polityka prywatności i plików cookies (RODO) AI SIGNALS COMPANY P.S.A.: administrator danych, Google Consent Mode, retencja i prawa użytkownika.',
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
