'use client';

import { useLocale } from 'next-intl';
import AppleFaq from '@/components/service/AppleFaq';

/**
 * Top-of-funnel questions for the home page. Deliberately different from the
 * service-page FAQs — those answer "how does your service work", these answer
 * "what is this and how do I pick someone", so the two do not compete for the
 * same queries.
 */
const faqHome = [
  {
    question: 'Czym właściwie zajmuje się agencja SEO?',
    questionEn: 'What does an SEO company actually do?',
    answer: 'Pracujemy na trzech frontach naraz. Techniczny to stan strony: czy wyszukiwarka może ją zaindeksować, jak szybko się wczytuje, czy nie ma duplikatów i błędnych przekierowań. Treściowy to odpowiedź na realne zapytania — nie zbiór fraz, tylko materiał, który rozwiązuje problem czytelnika. Trzeci to autorytet, czyli to, czy inne serwisy się na Ciebie powołują. Pominięcie któregokolwiek zatrzymuje efekt pozostałych dwóch.',
    answerEn: 'We work on three fronts at once. As a search engine optimization company we start with the technical condition of the site: whether a crawler can index it, how fast it loads, whether duplicates and broken redirects are eating the crawl budget. Then content — not a pile of phrases, but material that answers the question behind the query. Then authority: whether other sites cite you. Skipping any one of the three caps what the other two can achieve.'
  },
  {
    question: 'Jak wybrać agencję SEO i po czym poznać, że oferta jest uczciwa?',
    questionEn: 'How do I choose the right company for SEO?',
    answer: 'Poproś o dane, nie o obietnice. Wiarygodny partner pokaże Ci konkretne wyniki z Search Console — pozycje przed i po, z nazwami fraz — zamiast ogólników o „wzroście widoczności". Uciekaj od gwarancji pozycji nr 1: nikt nie kontroluje algorytmu Google, a taka gwarancja zwykle oznacza celowanie we frazy, których nikt nie wpisuje. Pytaj też, co się stanie z dostępami i danymi po zakończeniu współpracy — powinny zostać u Ciebie.',
    answerEn: 'Ask for data, not promises. A credible company for SEO will show you Search Console numbers — positions before and after, with the actual phrases — instead of vague talk about "increased visibility". Walk away from guaranteed number-one rankings: nobody controls Google\'s algorithm, and that guarantee usually means targeting phrases nobody searches for. Ask what happens to your accounts and data when the engagement ends; they should stay with you. Compare at least three search engine optimisation companies before you sign — for the same monthly fee, what is actually included varies more than most buyers expect, and the difference usually sits in how many hours go into content rather than into reporting. And be clear about what you are buying when you hire an SEO company. SEO compounds over quarters — it is not a switch that gets flipped in week one.'
  },
  {
    question: 'Czy pracujecie z firmami spoza Polski?',
    questionEn: 'Do you work with companies outside Poland?',
    answer: 'Tak. Prowadzimy projekty w języku polskim i angielskim, a nasze portfolio obejmuje między innymi platformę fintech pozycjonowaną na rynku amerykańskim. Przy rynkach zagranicznych badanie fraz robimy osobno dla każdego kraju — tłumaczenie polskiej listy słowo w słowo nie działa, bo ludzie w różnych krajach pytają o to samo w inny sposób.',
    answerEn: 'Yes. We run projects in Polish and English, and our portfolio includes a fintech platform ranked in the US market. For foreign markets we research keywords separately per country — translating a Polish list word for word does not work, because people in different countries phrase the same need differently.'
  },
  {
    question: 'Czego potrzebujecie od nas, żeby zacząć?',
    questionEn: 'What do you need from us to get started?',
    answer: 'Dostępu do Google Search Console i Google Analytics — to jedyne źródła danych o Twojej domenie z pierwszej ręki. Przydaje się też dostęp do panelu strony i informacja o hostingu, żebyśmy mogli sprawdzić czas odpowiedzi serwera. Najważniejsza jest jednak jedna rzecz spoza narzędzi: lista pytań, które najczęściej zadają Wasi klienci. To najczystszy sygnał intencji, jaki istnieje, a nie znajdziecie go w żadnym narzędziu do fraz.',
    answerEn: 'Access to Google Search Console and Google Analytics — the only first-party data about your domain. Access to the CMS and details about hosting help too, so we can check server response times. The most valuable input, though, is not a tool: the list of questions your customers actually ask. That is the cleanest intent signal there is, and no keyword tool will give it to you.'
  }
];

export default function HomeFaq() {
  const lang = useLocale();
  return (
    <AppleFaq
      faqData={faqHome}
      title={lang === 'pl' ? 'Najczęstsze pytania o współpracę' : 'Frequently Asked Questions'}
    />
  );
}
