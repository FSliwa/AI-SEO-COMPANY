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

export default function BlogHubPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <BlogGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
