import PricingClient from '@/components/PricingClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Packages and Costs | AI SEO COMPANY' : 'Cennik Pozycjonowania Stron 2026 | Pakiety i Ceny SEO',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent SEO services pricing, no hidden fees, and packages tailored to your company size.' : 'Ile kosztuje pozycjonowanie w 2026 roku? Zobacz nasz transparentny cennik usług SEO, brak ukrytych opłat i pakiety dopasowane do wielkości Twojej firmy.',
  alternates: {
    canonical: `/${locale}/cennik-pozycjonowania`,
  },
};
}

export default function CennikPage() {
  return <PricingClient />;
}
