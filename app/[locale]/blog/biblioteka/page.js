import { articleLanguages } from '@/lib/blogPosts';
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Content Library | Strategies by Experts' : 'Biblioteka Artykułów SEO i Web Design | AI SEO COMPANY',
  description: locale === 'en' ? 'Every article we have published, in one place. Browse the full library of guides on SEO, analytics, conversion and web design.' : 'Wszystkie publikacje naszego zespołu w jednym miejscu. Przeglądaj pełną bibliotekę artykułów o pozycjonowaniu i web designie.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/blog/library' : 'https://www.ai-seo-company.pl/blog/biblioteka',
    languages: articleLanguages('/blog/biblioteka', 'https://www.ai-seo-company.pl/blog/biblioteka', 'https://www.ai-seo-company.pl/en/blog/library')
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
