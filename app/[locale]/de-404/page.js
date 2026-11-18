import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { DE_AKTYWNE } from '@/lib/stronyDe';

// Cel rewrite z middleware.js dla adresów /de/... bez niemieckiej strony (lib/stronyDe.js).
// Zawsze notFound(): daje 404 w układzie z locale de (nagłówek, stopka i treść 404 po niemiecku).
// Bez wersji DE (DE_AKTYWNE = false) żadna ścieżka nie jest generowana: trasa nie istnieje w buildzie.
export const dynamicParams = false;
export function generateStaticParams() {
  return DE_AKTYWNE ? [{ locale: 'de' }] : [];
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
