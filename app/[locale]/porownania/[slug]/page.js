import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import PorownanieLayout from '@/components/porownania/PorownanieLayout';
import { porownania } from '@/lib/porownania';
import { porownanieDla } from '@/lib/porownania.en';
import { metadataStronyPl, wymagajStronyPl, parametryPl } from '@/lib/stronaPl';

// Strony porównań /porownania/[slug] (5.11.2026; PLAN-v2 7 SIL, 6.2–6.4, 6.14; TS-03).
// generateStaticParams zwraca { locale, slug } (pl i en, ten sam slug PL) WYŁĄCZNIE dla porównań,
// które przechodzą bramkę publikacji (lib/publikacja.js); EN dla stron z wpisem w lib/stronyEn.js. Kształt { locale, slug } jest obowiązkowy:
// samo { slug } daje 0 wygenerowanych ścieżek i 404 (TS-03, build 5.11.2026).
// dynamicParams = false: nieznany i nieopublikowany slug = 404. Treść EN z lib/porownania.en.js
// (porownanieDla); title/description EN z lib/stronyEn.js przez metadataStronyPl.
export const dynamicParams = false;

export function generateStaticParams() {
  return parametryPl('/porownania/', porownania.map((p) => p.slug));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const p = porownanieDla(slug, locale);
  if (!p) return {};
  return metadataStronyPl({ locale, sciezka: `/porownania/${slug}`, title: p.title, description: p.description });
}

export default async function PorownaniePage({ params }) {
  const { locale, slug } = await params;
  wymagajStronyPl(locale, `/porownania/${slug}`);
  const p = porownanieDla(slug, locale);
  if (!p) notFound();
  setRequestLocale(locale);
  return <PorownanieLayout porownanie={p} locale={locale} />;
}
