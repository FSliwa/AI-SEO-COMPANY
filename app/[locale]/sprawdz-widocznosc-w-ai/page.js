import { notFound } from 'next/navigation';
import AiCheckerClient from '@/components/AiCheckerClient';

// Sprawdzarka zadaje pytania po polsku firmom z Polski: tylko wersja PL (EN = 404, poza sitemapą).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'en') return {};
  return {
    // 4.11.2026: title pod „widoczność w ai” (90/mies., w VII.2026 590); H1 bez zmian.
    title: 'Widoczność w AI: sprawdź, czy ChatGPT poleca Twoją firmę',
    description: 'Bezpłatna sprawdzarka widoczności w AI: zadajemy ChatGPT i Gemini pytania Twoich klientów i pokazujemy, czy wymieniają Twoją firmę. Wynik w 30 sekund.',
    alternates: { canonical: 'https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai' },
  };
}

export default async function SprawdzWidocznoscPage({ params }) {
  const { locale } = await params;
  if (locale === 'en') notFound();
  return <AiCheckerClient />;
}
