export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Company & SEO Agency | Search Engine Optimization Company' : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie i Projektowanie Stron',
  description: locale === 'en' ? 'Need a company for seo or seo for companies? We are a leading seo company seo agency and search engine optimization company. We rank among top search engine optimization companies, seo firms, engine optimization companies, seo optimization companies, search engine optimisation companies and search engine optimization agencies.' : 'Nowoczesna agencja SEO i marketingowa w Warszawie. Napędzamy wzrost Twojej firmy poprzez skuteczne pozycjonowanie stron i tworzenie projektów stron WWW.',
  alternates: {
    canonical: locale === 'en' ? `/en` : `/pl`,
    languages: {
      'pl': `/pl`,
      'en': `/en`
    }
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
