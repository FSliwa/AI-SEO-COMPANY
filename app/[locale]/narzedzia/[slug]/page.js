import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import GeneratorLlmsTxt from '@/components/narzedzia/GeneratorLlmsTxt';
import SzablonRaport from '@/components/narzedzia/SzablonRaport';
import { AudytSeoStrona, AutorytetStrona, KalkulatorStrona, MakietaStrona } from '@/components/narzedzia/StronyAplikacji';
import { metadataStronyPl, parametryPl, wymagajStronyPl } from '@/lib/stronaPl';
import { STRONY_NARZEDZI, metaStrony, stronaNarzedzia } from '@/lib/narzedzia';

// Strony pod /narzedzia/<slug> (PLAN-v2 6.10 N1 i 6.11 S1, partia 3 / W9; TS-03; 5.11.2026).
// generateStaticParams w kształcie { locale: 'pl', slug } (samo { slug } daje 0 ścieżek i 404, TS-03)
// i tylko dla stron po bramce publikacji; dynamicParams = false, więc reszta (EN, nieopublikowane,
// nieznane slugi, zarezerwowany S2 /narzedzia/umowa-na-pozycjonowanie) = 404.
// Canonical bez hreflang, robots: DEFAULT_ROBOTS (lib/stronaPl.js).
export const dynamicParams = false;

const KOMPONENTY = {
  'generator-llms-txt': GeneratorLlmsTxt,
  'raport-seo': SzablonRaport,
  'audyt-seo': AudytSeoStrona,
  'autorytet-domeny': AutorytetStrona,
  'kalkulator-strat-seo': KalkulatorStrona,
  'makieta-redesignu': MakietaStrona,
};

export function generateStaticParams() {
  return parametryPl('/narzedzia/', STRONY_NARZEDZI.map((s) => s.slug));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!stronaNarzedzia(slug)) return {};
  const sciezka = `/narzedzia/${slug}`;
  const { title, description } = metaStrony(sciezka);
  return metadataStronyPl({ locale, sciezka, title, description, ogType: slug === 'raport-seo' ? 'article' : 'website' });
}

export default async function NarzedziePage({ params }) {
  const { locale, slug } = await params;
  wymagajStronyPl(locale, `/narzedzia/${slug}`);
  const Komponent = KOMPONENTY[slug];
  if (!Komponent || !stronaNarzedzia(slug)) notFound();
  setRequestLocale(locale);
  return <Komponent />;
}
