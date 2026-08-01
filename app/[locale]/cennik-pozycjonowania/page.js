import PricingClient from '@/components/PricingClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Costs for Professional Services | AI SEO COMPANY' : 'Cennik Pozycjonowania Stron 2026 | Pakiety i Ceny SEO',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent pricing. Compare us with other search engine optimization companies and discover our affordable SEO services.' : 'Ile kosztuje pozycjonowanie w 2026 roku? Zobacz nasz transparentny cennik usług SEO, brak ukrytych opłat i pakiety dopasowane do wielkości Twojej firmy.',
  alternates: {
    canonical: locale === 'en' ? `/en/seo-pricing` : `/pl/cennik-pozycjonowania`,
    languages: {
      'pl': `/pl/cennik-pozycjonowania`,
      'en': `/en/seo-pricing`
    }
  },
};
}

export default function CennikPage() {
  return <PricingClient />;
}
