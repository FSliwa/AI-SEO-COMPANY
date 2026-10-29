import GeoPageClient from '@/components/GeoPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'AI Search Optimization: ChatGPT and Google AI' : 'Pozycjonowanie w AI i ChatGPT: SEO AI dla firm',
    description: locale === 'en'
      ? 'Get your company mentioned in ChatGPT, Gemini, Perplexity and Google AI overviews. Weekly measurement in the client portal, AI audit €235 net.'
      : 'Pozycjonowanie w AI (GEO): Twoja firma w odpowiedziach ChatGPT, Gemini i Google. Pomiar co tydzień w panelu klienta, audyt AI 990 zł netto.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/ai-search-optimization' : 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
        'x-default': 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
        'en': 'https://www.ai-seo-company.pl/en/ai-search-optimization'
      }
    },
  };
}

export default function PozycjonowanieWAiPage() {
  return <GeoPageClient />;
}
