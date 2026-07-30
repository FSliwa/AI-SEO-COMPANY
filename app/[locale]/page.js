export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Agency Warsaw | Effective Web Design & SEO' : 'Agencja SEO Warszawa | Skuteczne Pozycjonowanie Stron',
  description: locale === 'en' ? 'Modern SEO agency in Warsaw. We design high-converting websites and brands. Comprehensive SEO, audits, and AI-driven web design.' : 'Nowoczesna agencja SEO Warszawa. Projektujemy strony internetowe, które sprzedają. Kompleksowe pozycjonowanie, audyt SEO i web design.',
  alternates: {
    canonical: `/${locale}`,
  },
};
}

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Portfolio />
        <Pricing />
        <Results />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
