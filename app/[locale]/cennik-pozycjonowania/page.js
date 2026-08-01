import PricingClient from '@/components/PricingClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Costs for Professional Services | AI SEO COMPANY' : 'Cennik Pozycjonowania 2026 | Ile Kosztuje Pozycjonowanie Stron',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent pricing. Compare us with other search engine optimization companies and discover our affordable SEO services.' : 'Sprawdź nasz cennik pozycjonowania i dowiedz się, ile kosztuje pozycjonowanie w 2026 roku. Pakiety dostosowane do wielkości Twojej firmy i brak ukrytych opłat.',
  alternates: {
    canonical: locale === 'en' ? `/en/seo-pricing` : `/cennik-pozycjonowania`,
    languages: {
      'pl': `/cennik-pozycjonowania`,
      'x-default': `/cennik-pozycjonowania`,
      'en': `/en/seo-pricing`
    }
  },
};
}

export default function CennikPage() {
  return <PricingClient />;
}
