import { setRequestLocale } from 'next-intl/server';
import PorownaniaHub from '@/components/porownania/PorownaniaHub';
import { HUB } from '@/lib/porownania';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';

// Hub porównań /porownania (5.11.2026; PLAN-v2 6.1, CB-09). 9.11.2026: wersja EN /en/comparisons
// (title i opis EN z lib/stronyEn.js przez metadataStronyPl, hreflang pl/en). Title PL (56) i meta (124) z PLAN-v2 6.1 = wpis '/porownania' w lib/publikacja.js.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataStronyPl({ locale, sciezka: HUB.sciezka, title: HUB.title, description: HUB.description, ogType: 'website' });
}

export default async function PorownaniaPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, HUB.sciezka);
  setRequestLocale(locale);
  return <PorownaniaHub locale={locale} />;
}
