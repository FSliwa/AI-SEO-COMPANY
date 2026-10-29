import { notFound } from 'next/navigation';
import AiCheckerClient from '@/components/AiCheckerClient';

// Sprawdzarka zadaje pytania po polsku firmom z Polski: tylko wersja PL (EN = 404, poza sitemapą).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'en') return {};
  return {
    title: 'Czy ChatGPT poleca Twoją firmę? Sprawdź za darmo',
    description: 'Bezpłatna sprawdzarka widoczności w AI: zadajemy ChatGPT i Gemini pytania Twoich klientów i pokazujemy, czy wymieniają Twoją firmę. Wynik w 30 sekund.',
    alternates: { canonical: 'https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai' },
  };
}

export default async function SprawdzWidocznoscPage({ params }) {
  const { locale } = await params;
  if (locale === 'en') notFound();
  return <AiCheckerClient />;
}
