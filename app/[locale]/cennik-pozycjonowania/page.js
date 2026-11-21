import PricingClient from '@/components/PricingClient';
import ServiceSchema from '@/components/ServiceSchema';
import SeoKostenDe from '@/components/de/SeoKostenDe';
import { metadataDe, hreflangDe } from '@/lib/stronyDe';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') return metadataDe('/cennik-pozycjonowania', { languages: { pl: 'https://www.ai-seo-company.pl/cennik-pozycjonowania', en: 'https://www.ai-seo-company.pl/en/seo-pricing' } });
  
  return {
  title: locale === 'en' ? 'SEO Pricing 2026: From €450/mo | How Much Does SEO Cost' : 'Cennik pozycjonowania stron: od 1 900 zł | Ile kosztuje SEO',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our pricing (€450 or €590 net/mo, monthly contract, Booster Pack) vs other search engine optimization companies.' : 'Cennik pozycjonowania stron: sprawdź, ile kosztuje pozycjonowanie w 2026 (1 900 lub 2 500 zł netto/mies., umowa miesięczna i Booster Pack ze stroną 0 zł).',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-pricing' : 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
      'x-default': 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
      'en': 'https://www.ai-seo-company.pl/en/seo-pricing',
      ...hreflangDe('/cennik-pozycjonowania')
    }
  },
};
}

export default async function CennikPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return (<><ServiceSchema variant="cennik" /><SeoKostenDe /></>);
  return (
    <>
      <ServiceSchema variant="cennik" />
      <PricingClient />
    </>
  );
}
