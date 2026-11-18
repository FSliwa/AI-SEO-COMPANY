import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import GeneratorLlmsTxt from '@/components/narzedzia/GeneratorLlmsTxt';
import SzablonStrona from '@/components/narzedzia/SzablonStrona';
import { szablonBySlug } from '@/lib/szablony';
import SzablonRaport from '@/components/narzedzia/SzablonRaport';
import { AudytSeoStrona, AutorytetStrona, KalkulatorStrona, MakietaStrona } from '@/components/narzedzia/StronyAplikacji';
import { metadataStronyPl, parametryPl, wymagajStronyPl } from '@/lib/stronaPl';
import { STRONY_NARZEDZI, metaStrony, stronaNarzedzia } from '@/lib/narzedzia';
import { szablonDe } from '@/lib/szablony/de';
import AudytSeoStronaDe from '@/components/de/narzedzia/AudytSeoStronaDe';
import GeneratorLlmsTxtDe from '@/components/de/narzedzia/GeneratorLlmsTxtDe';
import AutorytetStronaDe from '@/components/de/narzedzia/AutorytetStronaDe';
import SzablonStronaDe from '@/components/de/narzedzia/SzablonStronaDe';

// Strony pod /narzedzia/<slug> (PLAN-v2 6.10 N1 i 6.11 S1, partia 3 / W9; TS-03; 5.11.2026).
// generateStaticParams w kształcie { locale: 'pl', slug } (samo { slug } daje 0 ścieżek i 404, TS-03)
// i tylko dla stron po bramce publikacji; dynamicParams = false, więc reszta (nieopublikowane,
// nieznane slugi, zarezerwowany S2 /narzedzia/umowa-na-pozycjonowanie) = 404.
// Od 9.11.2026 strony mają wersję EN (/en/tools/<slug>, lib/stronyEn.js): komponent dostaje
// locale z params (next-intl podaje slug PL także na adresie EN); canonical + hreflang z lib/stronaPl.js.
export const dynamicParams = false;

const KOMPONENTY = {
  'generator-llms-txt': GeneratorLlmsTxt,
  'raport-seo': SzablonRaport,
  'audyt-seo': AudytSeoStrona,
  'autorytet-domeny': AutorytetStrona,
  'kalkulator-strat-seo': KalkulatorStrona,
  'makieta-redesignu': MakietaStrona,
};

// Wersja niemiecka (18.11.2026, DE_OPUBLIKOWANE w lib/stronyDe.js): trzy narzędzia i dwa szablony mają strony DE
// (components/de/narzedzia, lib/szablony/*.de.js). Metadane DE składa metadataStronyPl (lib/stronaPl.js) z rejestru stronyDe.
const KOMPONENTY_DE = {
  'generator-llms-txt': GeneratorLlmsTxtDe,
  'audyt-seo': AudytSeoStronaDe,
  'autorytet-domeny': AutorytetStronaDe,
};

export function generateStaticParams() {
  return parametryPl('/narzedzia/', STRONY_NARZEDZI.map((s) => s.slug));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!stronaNarzedzia(slug)) return {};
  const sciezka = `/narzedzia/${slug}`;
  const { title, description } = metaStrony(sciezka);
  return metadataStronyPl({ locale, sciezka, title, description, ogType: slug === 'raport-seo' || szablonBySlug(slug) ? 'article' : 'website' });
}

export default async function NarzedziePage({ params }) {
  const { locale, slug } = await params;
  wymagajStronyPl(locale, `/narzedzia/${slug}`);
  if (locale === 'de') {
    setRequestLocale(locale);
    const szDe = szablonDe(slug);
    if (szDe) return <SzablonStronaDe dane={szDe} />;
    const KomponentDe = KOMPONENTY_DE[slug];
    if (!KomponentDe) notFound();
    return <KomponentDe />;
  }
  const szablon = szablonBySlug(slug);
  const Komponent = KOMPONENTY[slug];
  if ((!Komponent && !szablon) || !stronaNarzedzia(slug)) notFound();
  setRequestLocale(locale);
  // 11.11.2026: szablony do pobrania z lib/szablony renderuje wspólny SzablonStrona.
  if (szablon) return <SzablonStrona dane={szablon} locale={locale} />;
  return <Komponent locale={locale} />;
}
