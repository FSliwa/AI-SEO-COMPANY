export const metadata = {
  title: 'Blog | Poradnik SEO i Web Design — AI SEO COMPANY',
  description: 'Czytaj najnowsze artykuły o SEO, analityce, budowaniu konwersji i projektowaniu stron B2B na naszym blogu.',
};

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
