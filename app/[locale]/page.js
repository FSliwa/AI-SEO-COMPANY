export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEOTools, SEO and Search Optimization Services for Agencies, Content in Marketing Agency' : 'Agencja Marketingowa SEO Warszawa, Cennik Pozycjonowania, Audyt, Optymalizacja SEO, Projektowanie Stron Internetowych, Projekt Strony, Pozycjonowanie Stron',
  description: locale === 'en' ? 'Leading SEOTools, SEO and search optimization services for agencies, content in marketing agency. We deliver expert SEO services.' : 'Agencja marketingowa SEO Warszawa: cennik pozycjonowania, optymalizacja SEO, audyt, projektowanie stron internetowych, Twój projekt strony i skuteczne pozycjonowanie stron.',
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
