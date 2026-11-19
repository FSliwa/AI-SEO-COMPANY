import GeoPageClient from '@/components/GeoPageClient';
import GeoSeiteDe from '@/components/de/GeoSeiteDe';
import { hreflangDe, metadataDe } from '@/lib/stronyDe';

// Version DE (18.11.2026, Gruppe de-geo): Titel, Beschreibung und H1 aus lib/stronyDe.js. Bei ausgeschalteter
// Version DE (DE_OPUBLIKOWANE=false, ohne Vorschau) liefern metadataDe und hreflangDe {}, PL und EN bleiben unverändert.
const KLUCZ_DE = '/pozycjonowanie-w-ai';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe(KLUCZ_DE, { languages: { pl: 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai', en: 'https://www.ai-seo-company.pl/en/ai-search-optimization' } });
  }
  return {
    title: locale === 'en' ? 'AI Search Optimization (Generative Engine Optimization)' : 'Pozycjonowanie w AI: ChatGPT, AI Overview i SEO AI',
    description: locale === 'en'
      ? 'Generative engine optimization (GEO) and AI search optimization for ChatGPT, Gemini, Perplexity and Google AI overviews. Weekly tracking, AI audit €235 net.'
      : 'Pozycjonowanie w AI (GEO): Twoja firma w odpowiedziach ChatGPT, Gemini i Google. Pomiar co tydzień w panelu klienta, audyt AI 990 zł netto.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/ai-search-optimization' : 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
        'x-default': 'https://www.ai-seo-company.pl/pozycjonowanie-w-ai',
        'en': 'https://www.ai-seo-company.pl/en/ai-search-optimization',
        ...hreflangDe(KLUCZ_DE),
      }
    },
  };
}

export default async function PozycjonowanieWAiPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <GeoSeiteDe />;
  return <GeoPageClient />;
}
