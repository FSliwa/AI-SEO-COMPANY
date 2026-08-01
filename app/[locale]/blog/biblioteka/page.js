export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Content Library | Strategies by SEO Experts | AI SEO COMPANY' : 'Biblioteka Artykułów SEO i Web Design | AI SEO COMPANY',
  description: locale === 'en' ? 'All publications from our SEO content writers in one place. Browse the full library of articles on marketing and SEO provided by top search optimization companies.' : 'Wszystkie publikacje naszego zespołu w jednym miejscu. Przeglądaj pełną bibliotekę artykułów o pozycjonowaniu i web designie.',
  alternates: {
    canonical: locale === 'en' ? `/en/blog/library` : `/pl/blog/biblioteka`,
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import BlogLibrary from '@/components/BlogLibrary';

export default function BlogLibraryPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <BlogLibrary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
