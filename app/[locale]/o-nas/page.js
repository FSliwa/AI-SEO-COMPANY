// 5.11.2026 (PLAN-v2 6.24, EEAT1; SA-07 i MSA-13 po weryfikacji): title bez sufiksu i bez frazy
// strony głównej („agencja seo warszawa” należy do /), PL 49 zn., EN 51 zn.; meta PL 124 zn.,
// EN 108 zn. - obiecują to, co strona pokazuje: zespół, kto prowadzi SEO (H2 o Filipie
// w AboutAuthor), jak mierzymy wyniki, kontakt i dane firmy (formularz Contact i stopka).
// Okruszki: BreadcrumbList na /o-nas i /en/about-us.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'About AI SEO COMPANY: Team, Method and Company Data' : 'AI SEO COMPANY: zespół, metoda pracy i dane firmy',
  description: locale === 'en' ? 'Meet the AI SEO COMPANY team from Warsaw: who runs your SEO, how we measure results and how to get in touch.' : 'Poznaj zespół i metodę pracy AI SEO COMPANY z Warszawy: kto prowadzi SEO, jak mierzymy wyniki i jak się z nami skontaktować.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/about-us' : 'https://www.ai-seo-company.pl/o-nas',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/o-nas',
      'x-default': 'https://www.ai-seo-company.pl/o-nas',
      'en': 'https://www.ai-seo-company.pl/en/about-us'
    }
  },
};
}

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AboutMission from '@/components/about/AboutMission';
import AboutMethodology from '@/components/about/AboutMethodology';
import AboutTeam from '@/components/about/AboutTeam';
import AboutAuthor from '@/components/about/AboutAuthor';
import AboutValues from '@/components/about/AboutValues';

export default function ONasPage() {
  return (
    <>
      <Header />
      <Breadcrumbs pl="O nas" en="About us" />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <AboutMission />
        <AboutMethodology />
        <AboutTeam />
        <AboutAuthor />
        <AboutValues />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
