export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  // UWAGA na dlugosc tytulu PL: limit 580 px (20px Arial, pomiar canvasem).
  // 20.10.2026: tytul pod nisze "agencja AI SEO" - w GSC (lip-paz 2026)
  // "agencja ai seo warszawa" ma pozycje 5,8, "agencja pozycjonowanie ai
  // warszawa" 18,6, "agencja seo ai" 38,1 przy 211 wyswietleniach, a dawny
  // tytul ("Agencja SEO i Marketingowa Warszawa | Pozycjonowanie Stron",
  // 572 px) nie mial "AI" - dopisanie go dawalo 597 px. Nowy: 560 px, czyli
  // 20 px zapasu. Zostaja "pozycjonowanie stron" i "marketing"; "agencja
  // marketingowa" przechodzi w calosci do opisu. Nie wydluzac bez pomiaru.
  title: locale === 'en' ? 'SEO Company, Marketing Agency | Search Engine Optimization' : 'Agencja AI SEO Warszawa | Pozycjonowanie Stron i Marketing',
  // PL: 945 px z 1000 i 146 znakow ze 150. "Sprawdz cennik i wyniki
  // wdrozen" odsyla do sekcji Pricing i Results, ktore sa na tej stronie.
  // Wczesniejsza wersja zaczynala sie od "Twoj projekt i strony to nasz
  // priorytet" - zdanie bez informacji, ktore zajmowalo 1/4 opisu.
  // EN bez zmian: skojarzenie z "ai" jest polskie (Polska 917 wyswietlen vs
  // USA 70), przenoszenie go na rynek angielski byloby zgadywaniem.
  description: locale === 'en' ? 'Top SEO agency and marketing agency for companies. Search engine optimization from Warsaw, B2B focused. The SEO firm agencies rely on.' : 'Agencja AI SEO i agencja marketingowa z Warszawy. Pozycjonowanie stron z AI, audyt SEO i strony, które sprzedają. Sprawdź cennik i wyniki wdrożeń.',
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
  // BYL TU: ReactDOM.preload('/scene.splinecode.br', { fetchPriority: 'high' }).
  // Usuniete 22.09.2026 po pomiarze na produkcji. Preload jest wskazowka dla
  // przegladarki wystawiana przy parsowaniu HTML - NIE wie nic o viewporcie,
  // wiec bramka telefonowa w Hero.jsx (ktora blokuje tylko MONTOWANIE sceny)
  // go nie dotyczyla: telefon i tak ciagnal 4,8 MB z najwyzszym priorytetem.
  // Zmierzone na zywej stronie: LCP 33,3 s, performance 31/100 na mobile,
  // a elementem LCP byl tekst banera cookies - czyli uzytkownik z telefonu
  // czekal ~33 s, zeby MOC kliknac zgode, bez ktorej tag konwersji nie odpala.
  //
  // Bez preloadu scena startuje z useEffect w Hero.jsx: na desktopie od razu,
  // na telefonie dopiero w czasie bezczynnosci. Desktop traci ulamek sekundy
  // na starcie sceny, mobile odzyskuje kilkanascie sekund do LCP.
  //
  // Gdyby wracac do preloadu: tylko przez <link media="(min-width: 901px)">,
  // bo ReactDOM.preload nie przyjmuje `media`. Uwaga - React 19 hoistuje
  // znaczniki zasobow do <head> wlasnym mechanizmem i literal w JSX wychodzil
  // w HTML dwa razy.
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
