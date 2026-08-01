export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'About Us | Professional SEO Firm & Marketing Agency' : 'O nas | Agencja SEO Warszawa | AI SEO COMPANY',
  description: locale === 'en' ? 'Meet the AI SEO COMPANY team of SEO experts. We are a marketing agency and search optimization company combining design with hard data and analytics.' : 'Poznaj zespół AI SEO COMPANY. Jesteśmy architektami Twojego wzrostu. Łączymy design z twardymi danymi analitycznymi.',
    alternates: {
    canonical: locale === 'en' ? `https://www.ai-seo-company.pl${p.enPath}` : `https://www.ai-seo-company.pl${p.plPath === '/' ? '' : p.plPath}`,
    languages: {
      'pl': `https://www.ai-seo-company.pl${p.plPath === '/' ? '' : p.plPath}`,
      'x-default': `https://www.ai-seo-company.pl${p.plPath === '/' ? '' : p.plPath}`,
      'en': `https://www.ai-seo-company.pl${p.enPath}`
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AboutMission from '@/components/about/AboutMission';
import AboutMethodology from '@/components/about/AboutMethodology';
import AboutTeam from '@/components/about/AboutTeam';
import AboutValues from '@/components/about/AboutValues';

export default function ONasPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <AboutMission />
        <AboutMethodology />
        <AboutTeam />
        <AboutValues />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
