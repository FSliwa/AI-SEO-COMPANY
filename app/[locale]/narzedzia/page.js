import { setRequestLocale } from 'next-intl/server';
import NarzedziaHub from '@/components/narzedzia/NarzedziaHub';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { SCIEZKA_HUBA, metaStrony } from '@/lib/narzedzia';

// Hub „Narzędzia i szablony” (PLAN-v2 6.9, partia 3 / W9; 5.11.2026). Tylko PL: /en/narzedzia = 404
// wprost (i18n/routing.js: zwykły string). Przed publikacją partii 3 (lib/publikacja.js) = 404,
// poza sitemapą, llms.txt i nawigacją. Title i meta z rejestru publikacji (jedno źródło).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { title, description } = metaStrony(SCIEZKA_HUBA);
  return metadataStronyPl({ locale, sciezka: SCIEZKA_HUBA, title, description, ogType: 'website' });
}

export default async function NarzedziaPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA_HUBA);
  setRequestLocale(locale);
  return <NarzedziaHub />;
}
