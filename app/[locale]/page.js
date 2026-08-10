export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Agency for Companies | Search Engine Optimization & Marketing' : 'Agencja SEO i Marketingowa Warszawa | Pozycjonowanie Stron',
  description: locale === 'en' ? 'AI SEO COMPANY is a top SEO agency and marketing agency providing search engine optimization for companies. We use advanced seotools to drive measurable growth.' : 'Twój projekt i strony to nasz priorytet. Agencja SEO, agencja marketingowa Warszawa. Zapewniamy pozycjonowanie stron, które generuje realny wzrost Twojej firmy.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/',
      'x-default': 'https://www.ai-seo-company.pl/en',
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
import HomeFaq from '@/components/HomeFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs isMainContent={true} />
        <Services />
        <Portfolio />
        <Pricing isMainContent={true} />
        <Results />
        <Testimonials />
        <Blog />
        <HomeFaq />
        <Contact isMainContent={true} />
      </main>
      <Footer />
    </>
  );
}
