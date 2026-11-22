import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import BlogArtikelDe from '@/components/de/BlogArtikelDe';
import { BLOG_KI_FUER_SEO_DE } from '@/lib/de/blogKiFuerSeo';
import { DE_AKTYWNE, metadataDe } from '@/lib/stronyDe';

const KLUCZ = '/blog/ki-fuer-seo';

// Ratgeber /de/blog/ki-fuer-seo gibt es nur auf Deutsch (kein polnisches oder englisches Gegenstück, tylkoDe).
// Ohne aktive Version DE (lib/stronyDe.js) erzeugt die Route keine Seite; für pl und en ist sie 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return DE_AKTYWNE ? [{ locale: 'de' }] : [];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale !== 'de') return {};
  return metadataDe(KLUCZ);
}

export default async function KiFuerSeoBlogPage({ params }) {
  const { locale } = await params;
  if (locale !== 'de') notFound();
  setRequestLocale(locale);
  return <BlogArtikelDe klucz={KLUCZ} dane={BLOG_KI_FUER_SEO_DE} />;
}
