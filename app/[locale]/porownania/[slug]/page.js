import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import PorownanieLayout from '@/components/porownania/PorownanieLayout';
import { porownania, porownanieBySlug } from '@/lib/porownania';
import { metadataStronyPl, wymagajStronyPl, parametryPl } from '@/lib/stronaPl';

// Strony porównań /porownania/[slug] (5.11.2026; PLAN-v2 7 SIL, 6.2–6.4, 6.14; TS-03).
// Tylko PL: generateStaticParams zwraca { locale: 'pl', slug } WYŁĄCZNIE dla porównań, które
// przechodzą bramkę publikacji (lib/publikacja.js). Kształt { locale, slug } jest obowiązkowy:
// samo { slug } daje 0 wygenerowanych ścieżek i 404 (TS-03, build 5.11.2026).
// dynamicParams = false: nieznany i nieopublikowany slug = 404; /en/porownania/… = 404 wprost
// (wymagajStronyPl), canonical bez hreflang (metadataStronyPl).
export const dynamicParams = false;

export function generateStaticParams() {
  return parametryPl('/porownania/', porownania.map((p) => p.slug));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const p = porownanieBySlug(slug);
  if (!p) return {};
  return metadataStronyPl({ locale, sciezka: `/porownania/${slug}`, title: p.title, description: p.description });
}

export default async function PorownaniePage({ params }) {
  const { locale, slug } = await params;
  wymagajStronyPl(locale, `/porownania/${slug}`);
  const p = porownanieBySlug(slug);
  if (!p) notFound();
  setRequestLocale(locale);
  return <PorownanieLayout porownanie={p} />;
}
