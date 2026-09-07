export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  // UWAGA na dlugosc tytulu PL: zmierzony 572 px przy limicie 580 px (20px
  // Arial, pomiar canvasem). Zostaje 8 px zapasu, czyli mniej niz jeden znak.
  // Kazde dopisanie wymaga usuniecia czegos innego - np. dopisanie "AI" daje
  // 597 px i tytul ucina sie w SERP-ie. Dlatego "AI" trafilo do meta
  // description ponizej, gdzie zapas wynosi ~70 px. Nie wydluzac tego stringa
  // bez ponownego pomiaru.
  title: locale === 'en' ? 'SEO Company, Marketing Agency | Search Engine Optimization' : 'Agencja SEO i Marketingowa Warszawa | Pozycjonowanie Stron',
  // PL: dopisane "z AI" - jedyna wolna przestrzen na ten czlon w metadanych.
  // Domena zawiera "ai" i Google juz wiaze z nim serwis (zapytanie "ai" dalo
  // 337 wyswietlen w kwartale, "agencja seo ai" kolejne 79 przy zerze klikniec),
  // ale ani tytul, ani opis go nie mialy - stad Meta 66% dla tej frazy przy
  // HTML 86%. Wstawka jest czysto addytywna: 931 px z 1000 i 148 znakow ze 150,
  // zadne dotychczasowe slowo nie znika.
  // EN bez zmian: skojarzenie z "ai" jest polskie (Polska 917 wyswietlen vs
  // USA 70), przenoszenie go na rynek angielski byloby zgadywaniem.
  description: locale === 'en' ? 'Top SEO agency and marketing agency for companies. Search engine optimization from Warsaw, B2B focused. The SEO firm agencies rely on.' : 'Twój projekt i strony to nasz priorytet. Agencja SEO Warszawa i agencja marketingowa. Pozycjonowanie stron z AI, które generuje realny wzrost firmy.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/',
      'x-default': 'https://www.ai-seo-company.pl/',
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
