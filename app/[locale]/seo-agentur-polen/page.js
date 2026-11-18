import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import SeoAgenturPolenDe from '@/components/de/SeoAgenturPolenDe';
import { DE_AKTYWNE, metadataDe } from '@/lib/stronyDe';

// SEO Agentur Polen gibt es nur auf Deutsch (kein polnisches Gegenstück, tylkoDe). Ohne aktive
// Version DE (lib/stronyDe.js) erzeugt die Route keine Seite; für pl und en ist sie 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return DE_AKTYWNE ? [{ locale: 'de' }] : [];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale !== 'de') return {};
  return metadataDe('/seo-agentur-polen');
}

export default async function SeoAgenturPolenPage({ params }) {
  const { locale } = await params;
  if (locale !== 'de') notFound();
  setRequestLocale(locale);
  return <SeoAgenturPolenDe />;
}
