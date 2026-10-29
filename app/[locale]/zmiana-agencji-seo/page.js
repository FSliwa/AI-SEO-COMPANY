import { notFound } from 'next/navigation';
import AgencySwitchClient from '@/components/AgencySwitchClient';

// Poradnik i checklista dla firm, które zmieniają agencję SEO (zadanie 3.2). Rynek polski,
// polskie umowy i przepisy: tylko wersja PL (EN = 404, poza sitemapą w EN).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'en') return {};
  return {
    title: 'Zmiana agencji SEO: wypowiedzenie umowy bez kar i utraty pozycji',
    description: 'Jak wypowiedzieć umowę z agencją SEO i co od niej zabrać: konta Google, domenę, treści, linki i dane. Checklista 32 punktów w PDF i bezpłatny przegląd 30 min.',
    alternates: { canonical: 'https://www.ai-seo-company.pl/zmiana-agencji-seo' },
  };
}

export default async function ZmianaAgencjiPage({ params }) {
  const { locale } = await params;
  if (locale === 'en') notFound();
  return <AgencySwitchClient />;
}
