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
import AudytPrzykladStrona from '@/components/narzedzia/AudytPrzykladStrona';
import { DEFAULT_ROBOTS } from '@/lib/blogPosts';
import { TYLKO_EN, opublikowaneTylkoEn, opublikowanaTylkoEn, wpisTylkoEn } from '@/lib/stronyTylkoEn';
import AudytSeoStronaDe from '@/components/de/narzedzia/AudytSeoStronaDe';
import GeneratorLlmsTxtDe from '@/components/de/narzedzia/GeneratorLlmsTxtDe';
import AutorytetStronaDe from '@/components/de/narzedzia/AutorytetStronaDe';
import KalkulatorStronaDe from '@/components/de/narzedzia/KalkulatorStronaDe';
import SzablonStronaDe from '@/components/de/narzedzia/SzablonStronaDe';
import TesterRobotowAiStrona from '@/components/narzedzia/TesterRobotowAiStrona';
import PorownywarkaCwvStrona from '@/components/narzedzia/PorownywarkaCwvStrona';
import KiCrawlerStronaDe from '@/components/de/narzedzia/KiCrawlerStronaDe';
import CwvVergleichStronaDe from '@/components/de/narzedzia/CwvVergleichStronaDe';

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
  'tester-robotow-ai-robots-txt': TesterRobotowAiStrona,
  'test-core-web-vitals-porownanie': PorownywarkaCwvStrona,
};

// Wersja niemiecka (18.11.2026, DE_OPUBLIKOWANE w lib/stronyDe.js): narzędzia i szablony mają strony DE
// (components/de/narzedzia, lib/szablony/*.de.js). Metadane DE składa metadataStronyPl (lib/stronaPl.js) z rejestru stronyDe.
const KOMPONENTY_DE = {
  'generator-llms-txt': GeneratorLlmsTxtDe,
  'audyt-seo': AudytSeoStronaDe,
  'autorytet-domeny': AutorytetStronaDe,
  'kalkulator-strat-seo': KalkulatorStronaDe,
  'tester-robotow-ai-robots-txt': KiCrawlerStronaDe,
  'test-core-web-vitals-porownanie': CwvVergleichStronaDe,
};

// 18.11.2026 (p2-audyt-przyklad): strony TYLKO po angielsku (lib/stronyTylkoEn.js) mają parametr tylko
// z locale 'en'; adres PL tej ścieżki nie jest generowany (dynamicParams = false), czyli 404.
const SLUGI_TYLKO_EN = Object.fromEntries(Object.keys(TYLKO_EN).map((k) => [k.replace('/narzedzia/', ''), k]));

export function generateStaticParams() {
  return [
    ...parametryPl('/narzedzia/', STRONY_NARZEDZI.map((s) => s.slug)),
    ...opublikowaneTylkoEn().map((k) => ({ locale: 'en', slug: k.replace('/narzedzia/', '') })),
  ];
}

const BASE_STRONY = 'https://www.ai-seo-company.pl';

function metadataTylkoEn(locale, klucz) {
  const w = wpisTylkoEn(klucz);
  if (!w || !w.opublikowana || locale !== 'en') return {};
  const url = `${BASE_STRONY}/en${w.en}`;
  return {
    title: w.tytul,
    description: w.opis,
    // Strona bez wersji PL: canonical = sam adres EN, hreflang en + x-default na ten sam adres.
    alternates: { canonical: url, languages: { en: url, 'x-default': url } },
    robots: DEFAULT_ROBOTS,
    openGraph: {
      title: w.tytul,
      description: w.opis,
      url,
      type: 'article',
      locale: 'en_US',
      siteName: 'AI SEO COMPANY',
      images: [{ url: `${BASE_STRONY}/images/narzedzia/audyt-przyklad/seo-audit-example-report.webp`, width: 1230, height: 1700, alt: 'Report of the free SEO audit of ai-seo-company.pl: score 95 out of 100, three performance warnings' }],
    },
  };
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (SLUGI_TYLKO_EN[slug]) return metadataTylkoEn(locale, SLUGI_TYLKO_EN[slug]);
  if (!stronaNarzedzia(slug)) return {};
  const sciezka = `/narzedzia/${slug}`;
  const { title, description } = metaStrony(sciezka);
  return metadataStronyPl({ locale, sciezka, title, description, ogType: slug === 'raport-seo' || szablonBySlug(slug) ? 'article' : 'website' });
}

export default async function NarzedziePage({ params }) {
  const { locale, slug } = await params;
  if (SLUGI_TYLKO_EN[slug]) {
    // Strona tylko EN: każdy inny język (w tym PL) i strona przed publikacją = 404.
    if (locale !== 'en' || !opublikowanaTylkoEn(SLUGI_TYLKO_EN[slug])) notFound();
    setRequestLocale(locale);
    return <AudytPrzykladStrona />;
  }
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
