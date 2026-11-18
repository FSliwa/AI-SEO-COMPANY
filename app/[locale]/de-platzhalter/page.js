import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DE_AKTYWNE } from '@/lib/stronyDe';

// Zastępnik dla adresów /de/... z lib/stronyDe.js, których treść niemiecka nie jest jeszcze gotowa
// (gotowa: false). middleware.js robi rewrite tutaj, więc strona nie pokazuje treści PL ani EN.
// Dostępny tylko w podglądzie (NEXT_PUBLIC_PODGLAD_DE=1) albo po publikacji wersji DE; bez wersji DE
// żadna ścieżka nie jest generowana (trasa nie istnieje w buildzie). noindex.
export const dynamicParams = false;
export function generateStaticParams() {
  return DE_AKTYWNE ? [{ locale: 'de' }] : [];
}

export const metadata = {
  title: 'Seite in Vorbereitung | AI SEO Company',
  robots: { index: false, follow: false },
};

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '140px', minHeight: '70vh' }}>
        <div className="container">
          <h1>Diese Seite ist in Vorbereitung</h1>
          <p>Der deutsche Inhalt dieser Seite wird gerade erstellt.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
