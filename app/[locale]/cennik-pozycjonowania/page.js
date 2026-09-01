import PricingClient from '@/components/PricingClient';
import ServiceSchema from '@/components/ServiceSchema';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | How Much Does SEO Cost for Companies' : 'Cennik Pozycjonowania Stron 2026 | Ile Kosztuje SEO',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent pricing, compare us with other search engine optimization companies and choose an affordable plan.' : 'Sprawdź nasz cennik pozycjonowania stron i dowiedz się, ile kosztuje pozycjonowanie w 2026 roku. Pakiety dopasowane do wielkości firmy, bez ukrytych opłat.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-pricing' : 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
      'x-default': 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
      'en': 'https://www.ai-seo-company.pl/en/seo-pricing'
    }
  },
};
}

export default function CennikPage() {
  return (
    <>
      <ServiceSchema variant="cennik" />
      <PricingClient />
    </>
  );
}
