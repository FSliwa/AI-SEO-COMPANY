import { notFound } from 'next/navigation';
import AiCheckerClient from '@/components/AiCheckerClient';

// Sprawdzarka zadaje pytania po polsku firmom z Polski: tylko wersja PL (EN = 404, poza sitemapą).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'en') return {};
  return {
    // 4.11.2026: title pod „widoczność w ai” (90/mies., w VII.2026 590); H1 bez zmian.
    title: 'Widoczność w AI: sprawdź, czy ChatGPT poleca Twoją firmę',
    // 9.11.2026: audyt w 5 silnikach AI (WidocznoscAiClient).
    description: 'Bezpłatna sprawdzarka widoczności w AI: pytania Twoich klientów zadajemy ChatGPT, Gemini, Perplexity, Claude i Google i pokazujemy, czy wymieniają Twoją firmę.',
    alternates: { canonical: 'https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai' },
  };
}

export default async function SprawdzWidocznoscPage({ params }) {
  const { locale } = await params;
  if (locale === 'en') notFound();
  return <AiCheckerClient />;
}
