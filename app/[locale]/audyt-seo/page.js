export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Search Engine Optimization Consultants, Optimisation Consultancy & SEO Keyword Analysis' : 'Audyt SEO | Analiza i Optymalizacja SEO',
  description: locale === 'en' ? 'Looking for expert search engine optimization consultants? Get professional seo keyword analysis and comprehensive search engine optimisation consultancy.' : 'Kompleksowy audyt SEO. Znajdziemy błędy techniczne, a skuteczna optymalizacja SEO błyskawicznie poprawi pozycje Twojej strony w wynikach Google.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-audit' : 'https://www.ai-seo-company.pl/audyt-seo',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/audyt-seo',
      'x-default': 'https://www.ai-seo-company.pl/en/seo-audit',
      'en': 'https://www.ai-seo-company.pl/en/seo-audit'
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudytClient from '@/components/AudytClient';

const faqAudyt = [
  {
    question: 'Co zawiera profesjonalny audyt SEO?',
    questionEn: 'What does a professional SEO audit include?',
    answer: 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.',
    answerEn: 'An SEO audit covers over 50 checkpoints, including Core Web Vitals analysis, Google indexing, heading and URL structure, backlink profile, keyword research, and UX/CRO guidelines.'
  },
  {
    question: 'Ile trwa przygotowanie audytu SEO?',
    questionEn: 'How long does it take to prepare an SEO audit?',
    answer: 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.',
    answerEn: 'The standard completion time for a comprehensive SEO audit is 3 to 5 business days. After generating the report, we conduct a detailed consultation.'
  },
  {
    question: 'Czym różni się audyt techniczny od audytu treści?',
    questionEn: 'What is the difference between a technical audit and a content audit?',
    answer: 'Audyt techniczny sprawdza, czy Google może stronę zaindeksować i szybko wczytać: Core Web Vitals, przekierowania, tagi kanoniczne, strukturę adresów URL i mapę witryny. Audyt treści ocenia, czy strona odpowiada na intencję zapytania: pokrycie tematu, strukturę nagłówków, kanibalizację fraz i luki wobec konkurencji. Pierwszy usuwa bariery, drugi buduje trafność — pełna optymalizacja SEO wymaga obu.',
    answerEn: 'A technical audit checks whether Google can index and quickly load the site: Core Web Vitals, redirects, canonical tags, URL structure and the sitemap. A content audit assesses whether the page answers search intent: topic coverage, heading structure, keyword cannibalisation and gaps against competitors. The first removes barriers, the second builds relevance — full SEO optimization needs both.'
  },
  {
    question: 'Czy sam audyt wystarczy, czy potrzebne jest jeszcze wdrożenie?',
    questionEn: 'Is the audit alone enough, or is implementation also needed?',
    answer: 'Audyt sam w sobie nie zmienia pozycji — jest diagnozą, nie leczeniem. Raport zawiera listę zadań uszeregowaną według wpływu i pracochłonności, więc możesz wdrożyć go własnym zespołem albo przekazać swojemu deweloperowi. Dopóki rekomendacje nie zostaną wdrożone, wynik audytu nie przełoży się na widoczność w wyszukiwarce.',
    answerEn: 'An audit on its own does not change rankings — it is a diagnosis, not a treatment. The report lists tasks ranked by impact and effort, so your own team or your developer can implement it. Until the recommendations are applied, the audit will not translate into search visibility.'
  },
  {
    question: 'Jak często należy powtarzać audyt SEO?',
    questionEn: 'How often should an SEO audit be repeated?',
    answer: 'Pełny audyt raz na 6–12 miesięcy wystarcza większości serwisów. Wcześniej warto go powtórzyć w trzech sytuacjach: po migracji lub przebudowie strony, po istotnej aktualizacji algorytmu Google oraz po nagłym spadku widoczności bez znanej przyczyny. Między audytami wystarczy bieżący monitoring pozycji i Search Console.',
    answerEn: 'A full audit every 6–12 months is enough for most websites. Repeat it sooner in three situations: after a migration or redesign, after a significant Google algorithm update, and after a sudden drop in visibility with no known cause. Between audits, routine rank monitoring and Search Console are sufficient.'
  },
  {
    question: 'Jakich dostępów potrzebujecie, żeby przeprowadzić audyt?',
    questionEn: 'What access do you need to run the audit?',
    answer: 'Do rzetelnego audytu potrzebujemy dostępu do Google Search Console i Google Analytics — to jedyne źródła danych o Twojej domenie z pierwszej ręki. Przydaje się też dostęp do panelu CMS oraz informacja o hostingu, żeby zweryfikować czas odpowiedzi serwera i konfigurację przekierowań. Audyt jest możliwy bez tych dostępów, ale opiera się wtedy wyłącznie na danych zewnętrznych i jest mniej precyzyjny.',
    answerEn: 'A reliable audit needs access to Google Search Console and Google Analytics — the only first-party data about your domain. Access to the CMS and details about hosting also help, so we can verify server response times and redirect configuration. An audit is possible without them, but it then rests solely on third-party data and is less precise.'
  },
  {
    question: 'Czy audyt SEO ma sens dla nowej strony, która nie ma jeszcze ruchu?',
    questionEn: 'Does an SEO audit make sense for a new site with no traffic yet?',
    answer: 'Tak, ale zakres jest inny. Przy nowej domenie nie ma jeszcze danych o pozycjach ani kliknięciach, więc audyt skupia się na fundamentach: indeksowalności, strukturze adresów, architekturze treści i planie fraz kluczowych. To najtańszy moment na naprawę błędów, bo nie trzeba później migrować adresów. Audyt nie ma natomiast sensu, jeśli strona dopiero powstaje i jej struktura nie została jeszcze ustalona.',
    answerEn: 'Yes, but the scope differs. A new domain has no ranking or click data yet, so the audit focuses on fundamentals: indexability, URL structure, content architecture and the keyword plan. This is the cheapest moment to fix mistakes, because no URL migration is needed later. An audit does not make sense, however, while the site is still being built and its structure is not settled.'
  },
  {
    question: 'Co dokładnie otrzymuję w raporcie z audytu?',
    questionEn: 'What exactly do I receive in the audit report?',
    answer: 'Raport zawiera listę znalezionych błędów z oceną wpływu na widoczność, priorytetyzację zadań według stosunku efektu do pracochłonności, wskazanie konkretnych adresów URL wymagających poprawy oraz rekomendacje techniczne w formie gotowej do przekazania deweloperowi. Po przekazaniu raportu omawiamy go na konsultacji, żeby wspólnie ustalić kolejność wdrożenia.',
    answerEn: 'The report contains the list of issues found with their impact on visibility, a prioritisation of tasks by effect versus effort, the specific URLs that need work, and technical recommendations written so they can be handed straight to a developer. After delivery we walk through the report in a consultation to agree the order of implementation.'
  },
  {
    question: 'Czy audyt obejmuje sklepy internetowe i strony na WordPressie?',
    questionEn: 'Does the audit cover online stores and WordPress websites?',
    answer: 'Tak. Zakres kontrolny jest ten sam niezależnie od technologii, zmieniają się natomiast typowe problemy. W sklepach internetowych najczęściej badamy kanibalizację między kategoriami, obsługę filtrów i parametrów w adresach oraz budżet indeksowania. Przy WordPressie częstym źródłem usterek są nadmiarowe wtyczki, duplikaty tagów i archiwów oraz wydajność szablonu.',
    answerEn: 'Yes. The checklist is the same regardless of technology; what changes are the typical problems. In online stores we most often examine cannibalisation between categories, how filters and URL parameters are handled, and crawl budget. On WordPress, recurring sources of trouble are excess plugins, duplicate tag and archive pages, and theme performance.'
  },
  {
    question: 'Czym audyt SEO różni się od darmowego raportu z narzędzia online?',
    questionEn: 'How does an SEO audit differ from a free online tool report?',
    answer: 'Darmowe narzędzia wykrywają błędy według sztywnej listy reguł i nie rozumieją kontekstu biznesowego. Pokażą, że brakuje słowa w tytule, ale nie ocenią, czy strona odpowiada na intencję zapytania, ani które z dwustu znalezionych usterek realnie wpływają na widoczność. Audyt to interpretacja tych danych: odsiew szumu, priorytetyzacja i decyzja, co zrobić najpierw — oraz czego świadomie nie ruszać.',
    answerEn: 'Free tools flag issues against a fixed rule set and have no business context. They will tell you a word is missing from the title, but not whether the page answers search intent, nor which of the two hundred issues found actually affect visibility. An audit is the interpretation of that data: filtering out noise, prioritising, and deciding what to do first — and what to deliberately leave alone.'
  }
];

const auditCarouselItems = [
  {
    number: '01 / PRĘDKOŚĆ',
    numberEn: '01 / SPEED',
    metric: '99 / 100',
    title: 'PageSpeed & Core Web Vitals',
    titleEn: 'PageSpeed & Core Web Vitals',
    description: 'Usuwamy render-blocking JavaScript i wdrażamy kompresję zdjęć Next-Gen (WebP/AVIF).',
    descriptionEn: 'We eliminate render-blocking JavaScript and optimize WebP/AVIF image rendering.',
    width: 'min(85vw, 460px)'
  },
  {
    number: '02 / INDEKSACJA',
    numberEn: '02 / INDEXING',
    metric: '0 Błędów',
    metricEn: '0 Errors',
    title: 'Optymalizacja Crawl Budget',
    titleEn: 'Crawl Budget Optimization',
    description: 'Usuwamy pętle przekierowań, zduplikowane tagi canonical oraz podstrony ze statusem 404.',
    descriptionEn: 'We remove redirect loops, duplicated canonical tags, and 404 status subpages.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 / SEMANTYKA',
    numberEn: '03 / SEMANTICS',
    metric: 'HTML5',
    title: 'Hierarchia Nagłówków & Schema',
    titleEn: 'Heading Hierarchy & Schema',
    description: 'Układamy poprawną strukturę H1-H3 oraz wdrażamy mikrodane Schema.org.',
    descriptionEn: 'We structure proper H1-H3 hierarchy and implement Schema.org microdata.',
    width: 'min(80vw, 410px)'
  },
  {
    number: '04 / WYDAJNOŚĆ',
    numberEn: '04 / PERFORMANCE',
    metric: '< 0.5s',
    title: 'Czas Odpowiedzi Serwera (TTFB)',
    titleEn: 'Server Response Time (TTFB)',
    description: 'Wskazujemy rekomendacje serwerowe i wdrażamy szybki bufor Caching/CDN.',
    descriptionEn: 'We provide server recommendations and implement fast Caching/CDN buffers.',
    width: 'min(75vw, 360px)'
  }
];

const auditPortfolioCases = [
  {
    tag: 'PROBLEM 01 / INDEKSACJA',
    tagEn: 'PROBLEM 01 / INDEXING',
    title: 'Wyciek Crawl Budget i Błędy 404',
    titleEn: 'Crawl Budget Leak and 404 Errors',
    description: 'Wykryto ponad 20 000 zduplikowanych adresów URL oraz pętli przekierowań konsumujących budżet indeksowania. Eliminuje to kluczowe produkty z wyników',
    descriptionEn: 'Detected over 20,000 duplicated URLs and redirect loops consuming the indexing budget. This eliminates key products from search results, requiring deep <strong>seo keyword analysis</strong>.',
    image: '/images/audyt-seo-optymalizacja.jpg',
    imgAlt: 'Profesjonalny audyt SEO',
    imgTitle: 'Profesjonalny audyt SEO',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '-95%',
    metricLabel: 'Redukcja błędów',
    metricLabelEn: 'Error reduction',
    metric2: '+45%',
    metric2Label: 'Zaindeksowanych stron',
    metric2LabelEn: 'Indexed pages'
  },
  {
    tag: 'PROBLEM 02 / SPEED & CWV',
    tagEn: 'PROBLEM 02 / SPEED & CWV',
    title: 'Wolne Ładowanie LCP (8.2s)',
    titleEn: 'Slow LCP Loading (8.2s)',
    description: 'Zablokowany wątek główny przez niezoptymalizowany JavaScript oraz brak kompresji obrazów Next-Gen, powodujący ucieczkę 60% użytkowników mobilnych.',
    descriptionEn: 'Main thread blocked by unoptimized JavaScript and lack of Next-Gen image compression, causing 60% of mobile users to bounce.',
    image: '/images/skuteczna-optymalizacja-seo.jpg',
    imgAlt: 'Skuteczna optymalizacja SEO',
    imgTitle: 'Optymalizacja SEO',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '1.2s',
    metricLabel: 'Docelowy czas LCP',
    metricLabelEn: 'Target LCP time',
    metric2: '0.00',
    metric2Label: 'Przesunięć CLS',
    metric2LabelEn: 'CLS shifts'
  },
  {
    tag: 'PROBLEM 03 / DANE STRUKTURALNE',
    tagEn: 'PROBLEM 03 / STRUCTURED DATA',
    title: 'Brak Mikrodanych Schema.org',
    titleEn: 'Missing Schema.org Microdata',
    description: 'Brak oznaczeń semantycznych dla wyszukiwarek AI i Google (Rich Snippets), uniemożliwiający wyświetlanie ocen, cen i dostępności w wynikach Search.',
    descriptionEn: 'Lack of semantic markup for AI search engines and Google (Rich Snippets), preventing ratings, prices, and availability from showing in Search results.',
    image: '/images/unsplash-1597773150796-e5c14ebecbf5.jpg',
    imageEn: '/images/search-engine-optimization-consultants.jpg',
    imgAltEn: 'expert search engine optimization consultants',
    imgTitleEn: 'search engine optimization consultants data analysis',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '100%',
    metricLabel: 'Pokrycia Schema',
    metricLabelEn: 'Schema coverage',
    metric2: '+35%',
    metric2Label: 'Wzrost CTR',
    metric2LabelEn: 'CTR increase'
  },
  {
    tag: 'PROBLEM 04 / TOKSYCZNE LINKI',
    tagEn: 'PROBLEM 04 / TOXIC LINKS',
    title: 'Ryzyko Filtrów Algorytmicznych',
    titleEn: 'Algorithmic Filter Risk',
    description: 'Wykrycie masowych przyrostów spamu i toksycznych domen odsyłających z filtrem depozycjonującym. Konieczność wdrożenia procedury Disavow Tool.',
    descriptionEn: 'Detection of massive spam spikes and toxic referring domains with a demotion filter. Necessitates implementing the Disavow Tool procedure through <strong>seo consultancy</strong>.',
    image: '/images/unsplash-1602536052359-ef94c21c5948.jpg',
    imageEn: '/images/search-engine-optimisation-consultancy.jpg',
    imgAltEn: 'search engine optimisation consultancy and optimization',
    imgTitleEn: 'expert search engine optimisation consultancy and optimization',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: '0',
    metricLabel: 'Toksycznych linków',
    metricLabelEn: 'Toxic links',
    metric2: '100%',
    metric2Label: 'Bezpieczny profil',
    metric2LabelEn: 'Safe profile'
  },
  {
    tag: 'PROBLEM 05 / KANIBALIZACJA',
    tagEn: 'PROBLEM 05 / CANNIBALIZATION',
    title: 'Duplikacja i Wewnętrzne Rywalizacje',
    titleEn: 'Duplication and Internal Competition',
    description: 'Wielokrotne podstrony rywalizujące o te same frazy kluczowe. Wykryto brak tagów kanonicznych (rel="canonical") oraz błędne parametry filtrowania.',
    descriptionEn: 'Multiple subpages competing for the same keywords. Missing canonical tags (rel="canonical") and incorrect filtering parameters detected.',
    image: '/images/unsplash-1608501821300-4f99e58bba77.jpg',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: 'TOP 3',
    metricLabel: 'Dla głównych fraz',
    metricLabelEn: 'For main keywords',
    metric2: '100%',
    metric2Label: 'Czystość kanoniczna',
    metric2LabelEn: 'Canonical purity'
  },
  {
    tag: 'PROBLEM 06 / SEMANTYKA HTML',
    tagEn: 'PROBLEM 06 / HTML SEMANTICS',
    title: 'Błędna Hierarchia Nagłówków H1-H3',
    titleEn: 'Incorrect H1-H3 Heading Hierarchy',
    description: 'Niewłaściwa struktura semantyczna HTML, brak opisów alternatywnych ALT w obrazach i puste tagi meta title uniemożliwiające zrozumienie intencji zapytania.',
    descriptionEn: 'Improper HTML semantic structure, missing ALT text in images, and empty meta title tags preventing the understanding of query intent.',
    image: '/images/unsplash-1694852860772-ec8598c72c15.jpg',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '100/100',
    metricLabel: 'Wskaźnik SEO',
    metricLabelEn: 'SEO Score',
    metric2: '+80%',
    metric2Label: 'Widoczności fraz',
    metric2LabelEn: 'Keyword visibility'
  }
];

export default function AudytSeoPage() {
  return (
    <>
      <Header />
      <AudytClient faqData={faqAudyt} portfolioCases={auditPortfolioCases} carouselItems={auditCarouselItems} />
      <Footer />
    </>
  );
}
