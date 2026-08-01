export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'AI SEO COMPANY | Modern SEO & Marketing Agency' : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie i Projektowanie Stron',
  description: locale === 'en' ? 'We are a leading marketing agency utilizing advanced SEOTools and AI. Experience real business growth with our comprehensive SEO and web design solutions.' : 'Nowoczesna agencja SEO i marketingowa w Warszawie. Napędzamy wzrost Twojej firmy poprzez skuteczne pozycjonowanie stron i tworzenie projektów stron WWW.',
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
