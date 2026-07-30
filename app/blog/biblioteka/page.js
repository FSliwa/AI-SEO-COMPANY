export const metadata = {
  title: 'Biblioteka Artykułów | Poradnik SEO i Web Design — AI SEO COMPANY',
  description: 'Wszystkie publikacje naszego zespołu w jednym miejscu. Przeglądaj pełną bibliotekę artykułów o pozycjonowaniu i web designie.',
  alternates: {
    canonical: '/blog/biblioteka',
  },
};

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
