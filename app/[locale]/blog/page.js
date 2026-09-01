export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Blog | Content Marketing and Web Design Guides' : 'Blog SEO | Poradniki Pozycjonowania Stron i Web Designu',
  description: locale === 'en' ? 'Latest articles on content marketing, SEO and web design. Practical guides from the team that publishes its own results.' : 'Czytaj najnowsze artykuły o SEO, analityce, budowaniu konwersji i projektowaniu. Zobacz nasz AI SEO COMPANY blog.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/blog' : 'https://www.ai-seo-company.pl/blog',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/blog',
      'x-default': 'https://www.ai-seo-company.pl/blog',
      'en': 'https://www.ai-seo-company.pl/en/blog'
    }
  },
};
}

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import BlogGrid from '@/components/BlogGrid';
import AppleFaq from '@/components/service/AppleFaq';
import BlogSeoText from '@/components/BlogSeoText';

const blogFaqData = [
  {
    question: 'Jak często publikujecie Najnowsze Artykuły?',
    answer: 'Nasz Blog SEO i Web Design jest aktualizowany regularnie. Publikujemy nowe poradniki, strategie oraz analizy minimum raz w tygodniu, abyś zawsze miał dostęp do najświeższej i przetestowanej wiedzy rynkowej wprost z pierwszej ręki.',
    questionEn: 'How often do you publish Latest Articles?',
    answerEn: 'Our SEO and Web Design Blog is updated regularly. We publish new guides, strategies, and analyses at least once a week to ensure you always have access to the freshest and proven market knowledge.'
  },
  {
    question: 'Czy ten Poradnik SEO jest w pełni darmowy?',
    answer: 'Tak, wszystkie nasze obszerne poradniki, innowacyjne check-listy i case studies z zakresu pozycjonowania organicznego i optymalizacji konwersji (UX/CRO) są udostępniane całkowicie bezpłatnie naszym czytelnikom.',
    questionEn: 'Is this comprehensive SEO Guide entirely free?',
    answerEn: 'Yes, all our extensive guides, innovative checklists, and case studies concerning organic positioning and conversion optimization (UX/CRO) are provided entirely free of charge to our readers.'
  },
  {
    question: 'Dla kogo przeznaczone są te wpisy o e-marketingu?',
    answer: 'Tworzymy merytoryczne treści zarówno dla początkujących, jak i wysoce zaawansowanych marketerów. Nasz blog to gigantyczne kompendium eksperckiej wiedzy na temat B2B, skalowania biznesu i projektowania wizualnego.',
    questionEn: 'Who are these digital marketing posts intended for?',
    answerEn: 'We create substantial content for both beginners and highly advanced marketers. Our blog is a massive compendium of expert knowledge on B2B marketing, business scaling, and visual design.'
  }
];

export default async function BlogHubPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <Breadcrumbs pl="Blog" en="Blog" />
      <main className="subpage-main" style={{ paddingTop: '100px', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
        <BlogGrid />
        <AppleFaq faqData={blogFaqData} title={locale === 'pl' ? 'Najczęściej zadawane pytania' : 'Frequently Asked Questions'} />
        <BlogSeoText />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
