export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Search Engine Optimization Companies, Optimisation Agencies & Top Company for SEO, SEO Firms, Marketing Agency | Seotools' : 'Agencja SEO, Agencja Marketingowa Warszawa: Pozycjonowanie Stron, Projekt, Strony i Wzrost',
  description: locale === 'en' ? 'Need a company for seo or seo for companies? We are a leading seo company, marketing agency, and search engine optimization company using top seotools. We rank among top search engine optimization companies, seo firms, engine optimization companies, seo optimization companies, search engine optimisation companies and search engine optimization agencies.' : 'Twój projekt i strony to nasz priorytet. Agencja SEO, agencja marketingowa Warszawa. Zapewniamy pozycjonowanie stron, które generuje realny wzrost Twojej firmy.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl',
    languages: {
      'pl': 'https://www.ai-seo-company.pl',
      'x-default': 'https://www.ai-seo-company.pl',
      'en': 'https://www.ai-seo-company.pl/en'
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
