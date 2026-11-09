import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import SpokeAiLayout from '@/components/ai/SpokeAiLayout';
import { PREFIKS, pytaniaAi } from '@/lib/pytaniaAi';
import { wpisPytaniaAiWJezyku } from '@/lib/pytaniaAi.en';
import { metadataStronyPl, parametryPl, wymagajStronyPl } from '@/lib/stronaPl';

// Spoke'i huba GEO: /pozycjonowanie-w-ai/chatgpt (A2) i /pozycjonowanie-w-ai/audyt-widocznosci (A5)
// (PLAN-v2 6.5, 6.7, rozdz. 7 SIL; 5.11.2026). Treść: lib/pytaniaAi.js, układ: components/ai/.
//
// - PL + EN (9.11.2026): adresy EN (/en/ai-search-optimization/chatgpt i .../ai-visibility-audit)
//   z lib/stronyEn.js; next-intl przepisuje je na wewnętrzną ścieżkę PL, więc strona dostaje slug PL
//   i locale. Treść EN: lib/pytaniaAi.en.js. Inny adres pod /en/pozycjonowanie-w-ai/<slug> = 404.
// - Za bramką publikacji (lib/publikacja.js, partia 2 / W5): przed publikacją slug nie jest
//   generowany (parametryPl), a wymagajStronyPl() daje 404 także przy renderze na żądanie.
// - TS-03: generateStaticParams zwraca { locale: 'pl', slug } - samo { slug } daje 0 ścieżek i 404.
//   Przy obecnych flagach lista jest pusta (oba spoke'i czekają na partię 2), więc w buildzie
//   dostawy trasa nie ma żadnej strony; z NEXT_PUBLIC_PODGLAD_PARTII=1 ma dwie.
export const dynamicParams = false;

export function generateStaticParams() {
  return parametryPl(PREFIKS, pytaniaAi.map((p) => p.slug));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const wpis = wpisPytaniaAiWJezyku(slug, locale);
  if (!wpis) return {};
  return metadataStronyPl({
    locale,
    sciezka: `${PREFIKS}${slug}`,
    title: wpis.title,
    description: wpis.description,
    ogType: wpis.typ === 'artykul' ? 'article' : 'website',
  });
}

export default async function SpokeAiPage({ params }) {
  const { locale, slug } = await params;
  const wpis = wpisPytaniaAiWJezyku(slug, locale);
  if (!wpis) notFound();
  wymagajStronyPl(locale, `${PREFIKS}${slug}`);
  // Locale z params (jak na /seo-lokalne-warszawa): bez tego Link i Byline czytają kontekst
  // żądania i wymuszają dynamiczne renderowanie trasy.
  setRequestLocale(locale);
  return <SpokeAiLayout wpis={wpis} locale={locale} />;
}
