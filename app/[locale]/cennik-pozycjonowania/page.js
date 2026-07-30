import PricingClient from '@/components/PricingClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Packages and Costs | AI SEO COMPANY' : 'Cennik Pozycjonowania Stron 2026 | Pakiety i Ceny SEO',
  description: 'Ile kosztuje pozycjonowanie w 2026 roku? Zobacz nasz transparentny cennik usług SEO, braki ukrytych opłat i pakiety dopasowane do wielkości Twojej firmy.',
  alternates: {
    canonical: `/${locale}/cennik-pozycjonowania`,
  },
};
}

export default function CennikPage() {
  return <PricingClient />;
}
