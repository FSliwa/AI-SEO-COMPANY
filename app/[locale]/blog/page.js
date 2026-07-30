export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Blog | SEO and Web Design Guide | AI SEO COMPANY' : 'Blog | Poradnik SEO i Web Design | AI SEO COMPANY',
  description: locale === 'en' ? 'Read the latest articles about SEO, web design, and conversion optimization. Check out our AI SEO COMPANY blog.' : 'Czytaj najnowsze artykuły o SEO, analityce, budowaniu konwersji i projektowaniu. Zobacz nasz AI SEO COMPANY blog.',
  alternates: {
    canonical: `/${locale}/blog`,
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import BlogGrid from '@/components/BlogGrid';

import BlogFAQ from '@/components/BlogFAQ';

export default async function BlogHubPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <div className="sr-only">
          {locale === 'en' ? (
            <p>Welcome to our Blog | SEO and Web Design Guide. Here you will find our Latest Articles about optimizing your online presence. Explore our comprehensive resources created by AI SEO COMPANY.</p>
          ) : (
            <p>Witamy na naszym Blogu | Poradnik SEO i Web Design. Znajdziesz tutaj nasze Najnowsze Artykuły dotyczące pozycjonowania i projektowania stron. Nasz blog to kompleksowy przewodnik stworzony przez ekspertów AI SEO COMPANY.</p>
          )}
        </div>
        <BlogGrid />
        <BlogFAQ lang={locale} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
