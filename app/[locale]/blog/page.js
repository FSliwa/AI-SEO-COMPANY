export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Blog | Content Marketing Guide | AI SEO COMPANY' : 'Blog | Poradnik SEO i Web Design | AI SEO COMPANY',
  description: locale === 'en' ? 'Read the latest articles about content in marketing, search engine optimization SEO, and learn exactly what is SEO content with our expert search optimization agency.' : 'Czytaj najnowsze artykuły o SEO, analityce, budowaniu konwersji i projektowaniu. Zobacz nasz AI SEO COMPANY blog.',
  alternates: {
    canonical: locale === 'en' ? `/en/blog` : `/blog`,
    languages: {
      'pl': `/blog`,
      'x-default': (/'pl':\s*/, ''),
      'en': `/en/blog`
    }
  },
};
}

import Header from '@/components/Header';
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
