import { setRequestLocale } from 'next-intl/server';
import RaportBledowStrona from '@/components/RaportBledowStrona';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';

const SCIEZKA = '/raport-bledow-seo-w-polsce';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: 'Najczęstsze błędy techniczne SEO i blokady botów AI - raport',
    description: 'Żywy raport błędów SEO i blokad botów AI (OAI-SearchBot, PerplexityBot, GPTBot) z anonimowych audytów stron. Metodologia, tabela 49 reguł i eksport CSV.',
    ogType: 'article',
  });
}

export default async function RaportBledowPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  return <RaportBledowStrona locale={locale} />;
}
