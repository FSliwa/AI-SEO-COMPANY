import { setRequestLocale } from 'next-intl/server';
import NarzedziaHub from '@/components/narzedzia/NarzedziaHub';
import ToolsHubDe from '@/components/de/narzedzia/ToolsHubDe';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { SCIEZKA_HUBA, metaStrony } from '@/lib/narzedzia';

// Hub „Narzędzia i szablony” (PLAN-v2 6.9, partia 3 / W9; 5.11.2026). Od 9.11.2026 także EN
// (/en/tools, lib/stronyEn.js), a od 22.11.2026 także DE (/de/tools, lib/stronyDe.js).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { title, description } = metaStrony(SCIEZKA_HUBA);
  return metadataStronyPl({ locale, sciezka: SCIEZKA_HUBA, title, description, ogType: 'website' });
}

export default async function NarzedziaPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA_HUBA);
  setRequestLocale(locale);
  if (locale === 'de') return <ToolsHubDe />;
  return <NarzedziaHub locale={locale} />;
}
