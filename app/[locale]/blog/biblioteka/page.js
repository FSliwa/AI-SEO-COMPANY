export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO and Web Design Articles Library | AI SEO COMPANY' : 'Biblioteka Artykułów SEO i Web Design | AI SEO COMPANY',
  description: locale === 'en' ? 'All publications of our team in one place. Browse the full library of articles on SEO and web design.' : 'Wszystkie publikacje naszego zespołu w jednym miejscu. Przeglądaj pełną bibliotekę artykułów o pozycjonowaniu i web designie.',
  alternates: {
    canonical: `/${locale}/blog/biblioteka`,
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
