import PanelPageClient from '@/components/PanelPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Client Portal: SEO Results and Our Work 24/7' : 'Panel Klienta SEO: Wyniki i Prace Agencji 24/7',
    description: locale === 'en'
      ? 'The AI SEO COMPANY client portal: Google data, enquiries, a work log and site changes every day. Open the demo without logging in.'
      : 'Panel klienta AI SEO COMPANY: dane z Google, zapytania, dziennik prac i zmiany na stronie codziennie. Zobacz demo bez logowania.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/client-portal' : 'https://www.ai-seo-company.pl/panel-klienta',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/panel-klienta',
        'x-default': 'https://www.ai-seo-company.pl/panel-klienta',
        'en': 'https://www.ai-seo-company.pl/en/client-portal'
      }
    },
  };
}

export default function PanelKlientaPage() {
  return <PanelPageClient />;
}
