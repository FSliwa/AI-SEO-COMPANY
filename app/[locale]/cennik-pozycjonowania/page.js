import PricingClient from '@/components/PricingClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Costs for Professional Services | AI SEO' : 'Cennik Pozycjonowania 2026 | Ile Kosztuje Pozycjonowanie',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent pricing. Compare us with other search engine optimization companies and choose an affordable SEO plan.' : 'Sprawdź nasz cennik pozycjonowania i dowiedz się, ile kosztuje pozycjonowanie w 2026 roku. Pakiety dopasowane do wielkości firmy, bez ukrytych opłat.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-pricing' : 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
      'x-default': 'https://www.ai-seo-company.pl/en/seo-pricing',
      'en': 'https://www.ai-seo-company.pl/en/seo-pricing'
    }
  },
};
}

export default function CennikPage() {
  return <PricingClient />;
}
