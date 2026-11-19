export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') return metadataDe('/', { languages: { pl: 'https://www.ai-seo-company.pl/', en: 'https://www.ai-seo-company.pl/en' } });
  return {
  // 23.10.2026: title i description PL przywrocone po 2f04f61 (20.10, "Agencja
  // AI SEO Warszawa | Pozycjonowanie Stron i Marketing"). Tamta wersja gubila
  // frazy z listy wlasciciela dla strony glownej: "agencja seo" (sasiedztwo
  // w title i description), "agencja seo warszawa", "projekt", "wzrost"
  // (description) i slowo "marketingowa" (title). Zmiana tych dwoch stringow
  // tylko po kontroli ~/Desktop/AI SEO COMPANY/narzedzia/kontrola-fraz.py.
  //
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
  description: locale === 'en' ? 'SEO agency and marketing agency for companies in Warsaw. One of the search engine optimization agencies for B2B, with a client portal.' : 'Twój projekt i strony to nasz priorytet. Agencja SEO Warszawa i agencja marketingowa. Pozycjonowanie stron z AI, które generuje realny wzrost firmy.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en' : 'https://www.ai-seo-company.pl/',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/',
      'x-default': 'https://www.ai-seo-company.pl/',
      'en': 'https://www.ai-seo-company.pl/en',
      ...hreflangDe('/')
    }
  },
};
}

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HeroKlienci from '@/components/HeroKlienci';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Results from '@/components/Results';
import PanelShowcase from '@/components/PanelShowcase';
import Blog from '@/components/Blog';
import HomeFaq from '@/components/HomeFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HomeDe from '@/components/de/HomeDe';
import { metadataDe, hreflangDe } from '@/lib/stronyDe';

export default async function Home({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <HomeDe />;
  // Hero bez sceny 3D (19.11.2026, hero v8): zadnego preloadu sceny ani runtime'u Spline.
  // Dawniejsze preloady sceny (4,8 MB) wylaczono juz 22.09.2026, bo wydluzaly LCP na telefonie do ~33 s.
  return (
    <>
      <Header />
      {/* 6.11.2026 (wyglad z makiety, DESIGN.md): kolejnosc sekcji jak w makiecie -
          hero (kolumna kafli z narzedziami na tle gor, 19.11), oferta na pasmie gor, realizacje,
          panel, cennik, wiedza, kontakt. Zadna sekcja nie zniknela; zmienila sie tylko kolejnosc
          (oferta przed "Dlaczego my", cennik za panelem klienta) i tla. */}
      <main>
        <Hero locale={locale} />
        <div className="gory-oferta" data-kursor="obraz" data-petla="">
          {/* 7.11.2026: dryfujace chmury na styku hero i oferty (dekoracja, app/wyglad.css). */}
          {/* 11.11.2026: pas mgly w poprzek granicy hero i oferty - przejscie bez szwu. */}
          <div className="styk-mgla" aria-hidden="true"><span /><span /></div>
          <div className="chmury-dryf" aria-hidden="true"><span /><span /></div>
          {/* 12.11.2026: pasek klientow w przeplywie, na pasie mgly pod hero (makieta). */}
          <HeroKlienci />
          <Services />
        </div>
        <WhyUs isMainContent={true} />
        <Portfolio />
        <Results />
        {/* 29.10.2026: panel klienta zamiast Testimonials (5 opinii bez nazw firm, decyzja D3).
            Komponent Testimonials zostaje w repo na prawdziwe opinie z Google. */}
        <PanelShowcase />
        <Pricing isMainContent={true} />
        <div className="w-noc-panele" data-kursor="ciemne">
          <Blog />
          <HomeFaq />
        </div>
        <Contact isMainContent={true} />
      </main>
      <Footer />
    </>
  );
}
