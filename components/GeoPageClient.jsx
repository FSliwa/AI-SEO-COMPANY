'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import ServiceSchema from '@/components/ServiceSchema';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { hash, sectionId } from '@/lib/anchors';
import { hrefJesliOpublikowana, SPRAWDZARKA_DZIALA } from '@/lib/publikacja';
import { PANEL_DEMO_URL } from '@/lib/panel';

// Oferta GEO dla małych firm (zadanie 2.2 planu przewagi, decyzja D6: audyt 990 zł zaliczany
// na abonament, monitoring w Premium, dopłata 490 zł do Standard). Wolumeny fraz (DataForSEO,
// Polska, 29.10.2026): „seo ai” 720, „geo seo” 390, „pozycjonowanie w ai” 260,
// „pozycjonowanie w chatgpt” 170, „agencja geo” 140.
//
// 5.11.2026 (A1, PLAN-v2 6.16; brief A1 + CB-03, CB-04/CB-20, CB-14, CB-21, CB-22, CS-02,
// MSA-05, OP-04/05/06, SA-01, AV-03, AV-19, CB-12(por.)): rozbudowa huba z ok. 620 do ok. 2 000
// słów. Title, meta i H1 bez zmian (test title po eksporcie GSC G1).
// - PL: „Krótka odpowiedź” (AnswerBox) zamiast leadu, H2 „Ile kosztuje pozycjonowanie w AI”
//   z id="ile-kosztuje", 8 kart pytań, pomiar z 4–5.11.2026, „Dla kogo”, „Agencja GEO i SEO AI”,
//   „Co wdrażamy technicznie”, „Pierwsze 90 dni”, FAQ 5 + 3, jeden FAQPage (8 FAQ + 8 kart).
// - EN: tylko nowy lead (AV-03), rozwinięcie GEO i źródło Senuto w FAQ (AV-19, CB-12(por.)).
//   Nowe sekcje i nowe pytania FAQ wyłącznie dla lang === 'pl'.
// - Linki do stron z kolejnych partii idą przez lib/publikacja.js: przed publikacją celu karta
//   i zdanie są zwykłym tekstem bez <a> i bez strzałki (reguła 6.0), po publikacji A2, A5, N1,
//   B1/B2, L1, P6 i A6 przełączają się same.
// Każda liczba ma źródło i datę obok siebie; nazw innych agencji i polecanych firm nie
// publikujemy (art. 16 UZNK). „pozycjonowanie w ChatGPT” pada tylko w istniejącym pytaniu FAQ
// i w anchorze karty 1 do A2 (kanibalizacja z A2, brief A2).

// Sprawdzarka (/sprawdz-widocznosc-w-ai) działa dopiero po T0.2 (klucze DataForSEO w panelu;
// 5.11.2026 POST /api/ai-check = 503). Przełączyć na true, gdy POST /api/ai-check z pustym
// body zwraca 400 (kryterium OP-04): wtedy link w karcie 7 i w H3 „Jak mierzymy efekt GEO”.
// Integracja 5.11.2026: flaga SPRAWDZARKA_DZIALA jest jedna, w lib/publikacja.js (import wyżej).

// Cele linków huba. null = cel jeszcze nie zwraca 200 -> zwykły tekst (lib/publikacja.js).
const HREF = {
  a2: hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt'),
  a2Zrodla: hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt#zrodla'),
  a2Reklama: hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt#reklama'),
  a5: hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci'),
  // A6 jest dziś zarezerwowane (zbudowana: false), więc zawsze null. Po publikacji spoke'a
  // cenowego H2 huba zmienia się na „Ceny pozycjonowania w AI u nas” (CB-20: nigdy dwa URL-e
  // z H1/H2 „Ile kosztuje pozycjonowanie w AI”).
  a6: hrefJesliOpublikowana('/pozycjonowanie-w-ai/cennik'),
  p2: hrefJesliOpublikowana('/porownania/seo-vs-geo'),
  // id="skroty" na H3 „AEO, AIO, LLMO i AI SEO: czy to to samo?” w P2 (CB-03, CB-12).
  p2Skroty: hrefJesliOpublikowana('/porownania/seo-vs-geo#skroty'),
  p6: hrefJesliOpublikowana('/porownania/jak-wybrac-agencje-seo'),
  n1: hrefJesliOpublikowana('/narzedzia/generator-llms-txt'),
  // B1 (partia 3): karta 8 jest w wariancie 8a (A2 #reklama), więc link „do B1 z huba”
  // (PLAN-v2 6.12) stoi w punkcie o Bing Webmaster Tools w „Co wdrażamy technicznie”.
  b1: hrefJesliOpublikowana('/blog/bing-webmaster-tools-indexnow-chatgpt'),
  b2:hrefJesliOpublikowana('/blog/przeglad-od-ai-jak-trafic-do-zrodel'),
  l1: hrefJesliOpublikowana('/pozycjonowanie-wizytowki-google'),
  sprawdzarka: SPRAWDZARKA_DZIALA ? '/sprawdz-widocznosc-w-ai' : null,
};

// Źródła zewnętrzne (data = dzień odczytu albo publikacji źródła).
const ZRODLO = {
  senuto: 'https://insight.senuto.com/aio-report-2/',
  ahrefs: 'https://ahrefs.com/blog/what-is-llms-txt/',
  googleAi: 'https://developers.google.com/search/blog/2023/02/google-search-and-ai-content?hl=pl',
  reklamy: 'https://www.wirtualnemedia.pl/chatgpt-ads-wkracza-do-europy-openai-uruchamia-reklamy-na-31-rynkach,7320465018964096a',
};

const T = {
  pl: {
    tag: 'Pozycjonowanie w AI · GEO',
    h1: 'Pozycjonowanie w AI: Twoja firma w odpowiedziach ChatGPT i Google',
    // Krótka odpowiedź (59 słów, PLAN-v2 6.16: CB-22 + rozwinięcie GEO z AV-19) zastępuje lead.
    answer: 'Pozycjonowanie w AI (GEO, Generative Engine Optimization) to praca nad tym, żeby ChatGPT, Gemini, Perplexity i przegląd AI w Google wymieniały Twoją firmę, gdy klient pyta o usługę. AI SEO COMPANY z Warszawy co tydzień zadaje modelom 30 pytań Twoich klientów, pokazuje wynik w panelu klienta i pracuje na źródłach, z których modele korzystają. Audyt kosztuje 990 zł netto.',
    ctaCheck: 'Sprawdź za darmo, czy ChatGPT Cię poleca',
    ctaAudit: 'Audyt AI za 990 zł netto',
    howTitle: 'Jak mierzymy widoczność w AI',
    how: [
      // AV-03: 30 pytań jak w Krótkiej odpowiedzi i w ofercie (wcześniej „20–50 pytań”).
      ['Pytania jak od klientów', 'Ustalamy 30 pytań, które zadają Twoi klienci, np. „Polecisz dobrego stolarza na Woli?”.'],
      ['Cztery źródła odpowiedzi', 'ChatGPT z wyszukiwaniem z Twojego miasta, Perplexity, Gemini i przegląd AI w wynikach Google.'],
      // OP-04 link 22: „panelu klienta” -> /panel-klienta.
      ['Co tydzień w panelu', <>Odsetek odpowiedzi z nazwą albo stroną firmy, tydzień po tygodniu, z pełną treścią odpowiedzi. Wynik widzisz w <Link href="/panel-klienta" style={{ textDecoration: 'underline' }}>panelu klienta</Link>.</>],
      ['Skąd modele biorą wiedzę', 'Lista stron cytowanych w odpowiedziach. Tam warto zdobyć wzmiankę, żeby model polecał Ciebie.'],
    ],
    // CB-04/CB-20, OP-06: nagłówek z frazą i kotwica #ile-kosztuje; po publikacji A6 inny nagłówek.
    offerTitle: HREF.a6 ? 'Ceny pozycjonowania w AI u nas' : 'Ile kosztuje pozycjonowanie w AI',
    offer: [
      { name: 'Audyt widoczności w AI', price: '990 zł netto', unit: 'jednorazowo', points: ['30 pytań w 4 źródłach', '5 konkurentów, których modele polecają', 'strony cytowane przez modele', '10 rekomendacji i 45 min omówienia', 'gotowy w 5 dni roboczych', 'zaliczany na pierwszy miesiąc abonamentu'] },
      { name: 'W pakiecie SEO Premium', price: 'w cenie', unit: 'od 2 500 zł netto / mies.', points: ['30 pytań co tydzień w panelu', '2 działania miesięcznie pod AI', 'wzmianki w cytowanych źródłach', 'treści odpowiadające na pytania klientów'], featured: true },
      { name: 'Dopłata do SEO Standard', price: '+490 zł netto', unit: 'miesięcznie', points: ['to samo co w Premium', 'pomiar co tydzień w panelu', 'umowa miesięczna, bez dodatkowych zobowiązań'] },
    ],
    doTitle: 'Co robimy, żeby modele Cię polecały',
    do: [
      'Wzmianki o firmie w miejscach, z których korzystają modele: katalogi branżowe, portale z opiniami, media lokalne.',
      'Treści, które odpowiadają wprost na pytania klientów, z konkretnymi liczbami, cenami i miejscem działania.',
      'Spójne dane firmy (nazwa, adres, telefon) wszędzie, dane strukturalne i plik llms.txt.',
      'Szybka strona, którą boty AI mogą odczytać bez JavaScriptu, i prowadzona wizytówka Google z opiniami.',
    ],
    honestTitle: 'Czego nie obiecujemy',
    // OP-04 link 24: „SEO lokalnym” -> /seo-lokalne-warszawa (ten sam tekst co wcześniej).
    honest: <>Nie gwarantujemy, że model poleci Twoją firmę: odpowiedzi zmieniają się z tygodnia na tydzień, a odpowiedzi z API mogą różnić się od tego, co ktoś zobaczy w aplikacji. Obiecujemy pomiar co tydzień, jawną metodę i pracę nad źródłami, z których modele korzystają. W <Link href="/seo-lokalne-warszawa" style={{ textDecoration: 'underline' }}>SEO lokalnym</Link> przeglądy AI w Google pojawiają się rzadko, więc Mapy i strona nadal przynoszą większość zapytań.</>,
    shotAlt: 'Zakładka Widoczność w AI w panelu klienta (dane przykładowe)',
    demo: 'Zobacz tę zakładkę w demo panelu',
  },
  en: {
    tag: 'AI search optimization · GEO',
    h1: 'AI search optimization: your company in ChatGPT and Google answers',
    // AV-03 (korekta, 58 słów): marka, miasto, rozwinięcie GEO i ceny z oferty EN.
    lead: 'AI SEO COMPANY is a Warsaw-based AI search optimization (GEO, generative engine optimization) agency. Every week we ask ChatGPT, Perplexity, Gemini and Google AI Overviews 30 of your customers’ questions and track whether they mention you. The audit costs €235 net; ongoing tracking is in SEO Premium (from €590 net/month) or a €115 net/month add-on to SEO Standard.',
    ctaCheck: 'Check for free whether ChatGPT recommends you',
    ctaAudit: 'AI audit: €235 net',
    howTitle: 'How we measure AI visibility',
    how: [
      // Spójnie z nowym leadem EN (30 pytań), jak how[0] w PL (AV-03).
      ['Questions your customers ask', 'We agree 30 questions your customers actually ask.'],
      ['Four answer sources', 'ChatGPT with search from your city, Perplexity, Gemini and the AI overview in Google results.'],
      ['Weekly in the portal', 'The share of answers mentioning your name or website, week by week, with the full answers.'],
      ['Where models get their knowledge', 'The sites cited in the answers: that is where a mention helps the model recommend you.'],
    ],
    offerTitle: 'Pricing',
    offer: [
      { name: 'AI visibility audit', price: '€235 net', unit: 'one-off', points: ['30 questions across 4 sources', '5 competitors the models recommend', 'sites the models cite', '10 recommendations and a 45-min review', 'ready in 5 business days', 'credited to your first monthly fee'] },
      { name: 'In SEO Premium', price: 'included', unit: 'from €590 net / mo', points: ['30 questions weekly in the portal', '2 AI-focused actions a month', 'mentions in cited sources', 'content answering customer questions'], featured: true },
      { name: 'Add-on to SEO Standard', price: '+€115 net', unit: 'per month', points: ['same as in Premium', 'weekly measurement in the portal', 'monthly contract, no extra commitment'] },
    ],
    doTitle: 'What we do so models recommend you',
    do: [
      'Mentions of your company where the models look: industry directories, review sites, local media.',
      'Content that directly answers customer questions, with concrete numbers, prices and service area.',
      'Consistent business data (name, address, phone) everywhere, structured data and an llms.txt file.',
      'A fast site AI bots can read without JavaScript, and a managed Google Business Profile with reviews.',
    ],
    honestTitle: 'What we do not promise',
    honest: 'We do not guarantee that a model will recommend your company: answers change week to week, and API answers can differ from what someone sees in the app. We promise weekly measurement, a transparent method and work on the sources the models use.',
    shotAlt: 'The AI visibility tab in the client portal (sample data)',
    demo: 'See this tab in the portal demo',
  },
};

// Linki w odpowiedziach FAQ (AppleFaq renderuje odpowiedź jako HTML). Link do strony przed
// publikacją = całe zdanie wypada, żeby nie odsyłać do czegoś, czego jeszcze nie ma.
const styl = 'text-decoration:underline';
const aWew = (href, tekst) => `<a href="${href}" style="${styl}">${tekst}</a>`;
const aZew = (href, tekst) => `<a href="${href}" rel="noopener" style="${styl}">${tekst}</a>`;
const jesli = (href, zdanie) => (href ? zdanie(href) : '');

const faq = [
  {
    question: 'Czym jest pozycjonowanie w AI (GEO)?',
    questionEn: 'What is AI search optimization (GEO)?',
    // Pierwsze zdanie przeredagowane (bez 10 słów wspólnych z Krótką odpowiedzią, SA-01, playbook 5.5);
    // dopiski OP-05 i AV-19 + link do P2 (MSA-05).
    answer: 'To praca nad tym, żeby modele językowe, takie jak ChatGPT, Gemini czy Perplexity, i przeglądy AI w Google podawały nazwę Twojej firmy, kiedy ktoś szuka usługi z Twojej branży. Modele składają odpowiedź ze stron, które znajdą, więc liczą się wzmianki w tych źródłach, treści odpowiadające na pytania i spójne dane firmy. Tę samą usługę nazywa się też GEO (generative engine optimization), LLM SEO albo SEO pod AI. Te same działania kryją się pod skrótami AEO (answer engine optimization), AIO i LLMO.'
      + jesli(HREF.p2, (h) => ` Czym GEO różni się od SEO, pokazujemy w ${aWew(h, 'porównaniu SEO i GEO')}.`),
    // AV-19: rozwinięcie GEO w treści widocznej także na EN (lead + ta odpowiedź = 2 wystąpienia).
    answerEn: 'It is work to make language models such as ChatGPT, Gemini or Perplexity, and the AI overviews in Google, mention your company when a customer asks about a service. Models assemble answers from the pages they find, so mentions in those sources, content that answers questions, and consistent business data all matter. GEO stands for generative engine optimization and has nothing to do with geotargeting; the same work also goes by AEO (answer engine optimization), AIO and LLMO.'
  },
  {
    question: 'Czy zwykłe SEO nadal ma sens?',
    questionEn: 'Does regular SEO still make sense?',
    // CB-12(por.): raport Senuto v2.0 z 27.11.2025 (curl 5.11.2026), kategorie LOCAL i TRANSACTIONAL
    // z tabeli „Intencja Wiodąca”. MSA-05: wątek „tylko AI, bez SEO”. OP-04 link 25. Link do P2.
    answer: `Tak. Według raportu Senuto ${aZew(ZRODLO.senuto, '„AI Overviews w Polsce”')} (wersja 2.0 z 27.11.2025, 17,8 mln fraz) przegląd AI pojawia się przy 28,95% polskich fraz, ale przy frazach o intencji lokalnej tylko przy 6,08%, a transakcyjnej przy 8,09%. Dla firmy usługowej z Warszawy Mapy i strona nadal dają większość zapytań. Samo GEO bez SEO zwykle nie wystarczy: modele z wyszukiwaniem sięgają po strony, które znajdą w sieci, a przegląd AI w Google cytuje strony z indeksu Google. Pozycjonowanie w AI dokładamy jako kolejną warstwę, nie zamiast ${aWew('/pozycjonowanie-stron-internetowych', 'pozycjonowania stron internetowych')}.`
      + jesli(HREF.p2, (h) => ` Kiedy wystarczy samo SEO, a kiedy warto dołożyć GEO, opisujemy w ${aWew(h, 'porównaniu SEO i GEO')}.`),
    answerEn: `Yes. According to Senuto’s ${aZew(ZRODLO.senuto, 'AI Overviews in Poland report')} (v2.0, 27 Nov 2025, 17.8M keywords), AI overviews appear for 28.95% of Polish keywords, but only 6.08% of keywords with local intent and 8.09% with transactional intent. For a local service business, Maps and the website still bring most enquiries. We add AI search as another layer, not a replacement.`
  },
  {
    question: 'Ile kosztuje pozycjonowanie w ChatGPT?',
    questionEn: 'How much does AI search optimization cost?',
    answer: 'Audyt widoczności w AI kosztuje 990 zł netto i jest zaliczany na pierwszy miesiąc abonamentu. Stały pomiar i działania są w cenie pakietu SEO Premium (od 2 500 zł netto miesięcznie) albo jako dopłata 490 zł netto miesięcznie do SEO Standard.',
    answerEn: 'The AI visibility audit costs €235 net and is credited to your first monthly fee. Ongoing measurement and work are included in SEO Premium (from €590 net a month) or available as a €115 net monthly add-on to SEO Standard.'
  },
  {
    question: 'Kiedy zobaczę efekty?',
    questionEn: 'When will I see results?',
    answer: 'Pierwszy pomiar dostajesz w tygodniu startu, więc od razu wiesz, gdzie jesteś. Zmiany w odpowiedziach modeli pojawiają się zwykle po kilku tygodniach, gdy nowe wzmianki i treści trafią do źródeł, z których korzystają. Postęp widzisz co tydzień w panelu.',
    answerEn: 'You get the first measurement in the week you start, so you know where you stand. Changes in model answers usually appear after a few weeks, once new mentions and content reach the sources they use. You see progress weekly in the portal.'
  },
  {
    question: 'Czy gwarantujecie, że ChatGPT poleci moją firmę?',
    questionEn: 'Do you guarantee ChatGPT will recommend my company?',
    answer: 'Nie. Nikt nie kontroluje odpowiedzi modeli. Gwarantujemy pomiar co tydzień, jawną metodę i konkretne działania, które zwiększają szansę na wzmiankę.',
    answerEn: 'No. Nobody controls model answers. We guarantee weekly measurement, a transparent method and concrete actions that increase the chance of a mention.'
  },
  // MSA-05: 3 nowe pytania, tylko PL (EN bez nowych sekcji, PLAN-v2 6.16).
  {
    tylkoPl: true,
    question: 'Która agencja w Polsce zajmuje się pozycjonowaniem w AI?',
    answer: 'Usługę pod nazwami GEO, AI SEO albo LLM SEO oferuje coraz więcej polskich agencji, a my nie oceniamy innych firm z nazwy. AI SEO COMPANY prowadzi pozycjonowanie w AI z Warszawy dla firm z całej Polski i co tydzień mierzy, czy ChatGPT, Perplexity, Gemini i przegląd AI w Google wymieniają klienta. Przed wyborem zadaj każdej agencji 8 pytań z sekcji o wyborze agencji GEO.',
  },
  {
    tylkoPl: true,
    question: 'Czy treści pisane przez AI szkodzą widoczności?',
    // Google Search Central, wpis z 8.02.2023 (odczyt 5.11.2026).
    answer: `Nie same w sobie. Google w ${aZew(ZRODLO.googleAi, 'wytycznych z 8 lutego 2023 r.')} pisze, że właściwe użycie AI nie narusza jego zasad, ale tworzenie treści automatycznie głównie po to, żeby manipulować rankingiem, jest spamem. Liczy się więc jakość: konkretne dane ze źródłem, doświadczenie autora i jasna odpowiedź na pytanie klienta.`,
  },
  {
    tylkoPl: true,
    question: 'Czy da się pozycjonować tylko w jednym modelu, np. ChatGPT?',
    answer: 'Pomiar można zawęzić do jednego modelu, ale samej pracy nie da się tak podzielić: wizytówka Google, wpisy w katalogach i strona z jasną ofertą trafiają do źródeł wielu modeli naraz. Modele różnią się tym, po co sięgają. W naszym pomiarze z 4–5.11.2026 ChatGPT w poleceniach firm linkował prawie wyłącznie do Map Google, a Perplexity do katalogów i rankingów. Dlatego mierzymy cztery źródła.',
  },
];

// 8 kart „Pytania o widoczność w AI, na które odpowiadamy” (brief A1 z korektami CB-01, CB-03,
// CB-21; PLAN-v2 6.16 pkt 4). H3 = pytanie, akapit 47–57 słów. href null = karta bez linku
// i bez strzałki. Te same pytania i odpowiedzi idą do jednego FAQPage (AppleFaq extraSchema).
const KARTY = [
  {
    id: 'jak-sprawic-zeby-chatgpt-polecal-firme',
    pytanie: 'Jak sprawić, żeby ChatGPT polecał Twoją firmę?',
    odpowiedz: 'ChatGPT z wyszukiwaniem składa odpowiedź ze stron, które znajdzie w danej chwili, więc liczy się obecność w tych źródłach. Zaczynamy od wizytówki Google, tych samych danych firmy w katalogach i strony, która wprost podaje usługę, cenę i obszar działania. Potem co tydzień sprawdzamy, czy model wymienia firmę.',
    href: HREF.a2,
    anchor: 'Pozycjonowanie w ChatGPT krok po kroku',
  },
  {
    id: 'skad-chatgpt-bierze-firmy',
    pytanie: 'Skąd ChatGPT bierze firmy, które poleca?',
    // CB-01: 11 odpowiedzi na 10 pytań; linki prowadzą do wyszukiwania w Mapach (nie „do wizytówek”).
    odpowiedz: 'W testach z 4 i 5 listopada 2026 poprosiliśmy ChatGPT z wyszukiwaniem o polecenie firmy w 10 pytaniach, od agencji SEO po stolarza i hydraulika. W 11 odpowiedziach 59 z 62 linków prowadziło do Map Google. Przy pytaniach o ceny i rankingi model cytował strony www, w tym nasz cennik. Perplexity sięgał po katalogi i rankingi.',
    zrodlo: { tekst: 'pomiar własny przez API DataForSEO, 4–5.11.2026 (metoda pod tabelą pomiaru).' },
    href: HREF.a2Zrodla,
    anchor: 'Źródła i metoda pomiaru',
  },
  {
    id: 'seo-a-geo',
    pytanie: 'SEO a GEO: czym się różnią?',
    odpowiedz: 'SEO walczy o miejsce na liście wyników Google, a GEO o wzmiankę w odpowiedzi, którą model pisze sam. Fundament jest wspólny: strona dostępna dla robotów, jasne odpowiedzi, spójne dane firmy i wzmianki w innych serwisach. Różni się pomiar: w GEO liczymy odsetek odpowiedzi z nazwą firmy, a nie pozycję na liście.',
    href: HREF.p2,
    anchor: 'SEO i GEO: pełne porównanie',
  },
  {
    id: 'geo-aeo-aio-llmo',
    pytanie: 'GEO, AEO, AIO, LLMO: czy to to samo?',
    odpowiedz: 'W praktyce to nazwy tej samej pracy. GEO (generative engine optimization) i LLMO dotyczą odpowiedzi ChatGPT, Gemini i Perplexity, AIO zwykle przeglądów AI w Google, a AEO wyszukiwarek odpowiedzi. Uwaga na „AEO” w Google: przy tym zapytaniu polskie wyniki dotyczą statusu celnego Upoważnionego Przedsiębiorcy, a nie marketingu.',
    zrodlo: { tekst: 'wyniki Google PL dla zapytania „aeo”, 4.11.2026.' },
    href: HREF.p2Skroty,
    anchor: 'AEO, AIO i LLMO: wyjaśnienie skrótów',
  },
  {
    id: 'llms-txt',
    pytanie: 'Co to jest llms.txt i czy pomaga?',
    odpowiedz: 'llms.txt to plik w formacie Markdown ze spisem najważniejszych podstron dla modeli językowych. To propozycja standardu, a nie wymóg: według analizy Ahrefs żaden duży dostawca modeli oficjalnie go nie obsługuje, a Google nie używa go w wyszukiwarce. Plik kosztuje niewiele, ale ważniejsze jest, czy boty AI mają dostęp do strony w robots.txt.',
    zrodlo: { tekst: 'Ahrefs, „What Is llms.txt, and Should You Care About It?”', url: ZRODLO.ahrefs, data: 'odczyt 5.11.2026' },
    href: HREF.n1,
    anchor: 'Generator llms.txt i test botów AI',
  },
  {
    id: 'przeglad-ai-w-google',
    pytanie: 'Jak trafić do przeglądu AI w Google?',
    // CB-21 (próba 30 fraz, nie „cała branża”); ostatnie zdanie bez obietnicy o „każdej podstronie”.
    odpowiedz: 'Przegląd AI pokazał się przy wszystkich 30 frazach z naszej próby (SEO, pozycjonowanie w AI, ceny i narzędzia; Google PL, 4.11.2026). W 21 z nich Google podał źródła: 153 odnośniki do 91 domen. Cytowane są akapity, które odpowiadają na pytanie wprost, dlatego nasze nowe i aktualizowane podstrony otwiera krótka odpowiedź pod nagłówkiem.',
    zrodlo: { tekst: 'pomiar własny przez API DataForSEO (Google PL, komputer, TOP 10 i przegląd AI), 4.11.2026.' },
    href: HREF.b2,
    anchor: 'Przegląd od AI: jak trafić do źródeł',
  },
  {
    id: 'jak-sprawdzic-czy-chatgpt-poleca',
    pytanie: 'Jak sprawdzić, czy ChatGPT poleca Twoją firmę?',
    odpowiedz: 'Zadaj ChatGPT z włączonym wyszukiwaniem kilka pytań, które zadają Twoi klienci, na przykład „Polecisz stolarza na Woli?”, i zapisz, czy pada nazwa firmy i jakie strony model podaje jako źródła. Jedno pytanie nic nie dowodzi, bo odpowiedzi się zmieniają. Nasza bezpłatna sprawdzarka zrobi to za Ciebie w ChatGPT i Gemini.',
    href: HREF.sprawdzarka,
    anchor: 'Sprawdź za darmo',
  },
  {
    id: 'reklama-w-chatgpt',
    pytanie: 'Czy reklama w ChatGPT to to samo co pozycjonowanie w AI?',
    // Poprawka 6.11.2026: bez faktów o reklamach OpenAI ze źródła wtórnego (wirtualnemedia.pl);
    // help.openai.com zwracało 403, a plan (6.5, CB-10) dopuszcza tylko strony OpenAI.
    odpowiedz: 'Nie. Reklama to płatna emisja komunikatu, która działa, dopóki płacisz za kampanię. Pozycjonowanie w AI dotyczy samej odpowiedzi modelu: czy wymienia Twoją firmę i z jakich źródeł korzysta. Wzmianki w tych źródłach zostają po zakończeniu kampanii. Aktualne zasady reklam sprawdzaj w centrum pomocy OpenAI.',
    href: HREF.a2Reklama,
    anchor: 'Reklama w ChatGPT a pozycjonowanie',
  },
];

const zrodloTekst = (z) => (z ? ` Źródło: ${z.tekst}${z.data ? `, ${z.data}` : ''}${z.tekst.endsWith('.') ? '' : '.'}` : '');
// FAQPage: tekst w JSON-LD = tekst widoczny (pytanie, akapit i źródło), bez linku „więcej”.
const KARTY_SCHEMA = KARTY.map((k) => ({ question: k.pytanie, answer: `${k.odpowiedz}${zrodloTekst(k.zrodlo)}` }));

// Pomiar z 4–5.11.2026 (CB-14 z korektą CB-01; brief A1). Wiersz z naszym wynikiem dopiero po D4.
const POMIAR_KOLUMNY = [
  { key: 'pomiar', label: 'Co mierzyliśmy' },
  { key: 'wynik', label: 'Wynik' },
  { key: 'proba', label: 'Próba i data' },
];
const POMIAR_WIERSZE = [
  { id: 'aio', pomiar: 'Przegląd AI w Google', wynik: '30 z 30 fraz z naszej próby (SEO, AI, ceny, narzędzia)', proba: 'Google PL, komputer, TOP 10, 4.11.2026' },
  { id: 'polecenia', pomiar: 'ChatGPT: prośba o polecenie firmy (agencja SEO, stolarz, hydraulik, biuro rachunkowe)', wynik: '59 z 62 linków do wyszukiwania w Mapach Google (google.com/maps/search)', proba: '11 odpowiedzi na 10 pytań, 4–5.11.2026' },
  { id: 'ceny', pomiar: 'ChatGPT: pytania o cenę, ranking albo funkcję usługi', wynik: '0 z 31 linków do Map; cytowane strony www, w tym nasz cennik', proba: '5 odpowiedzi, 4–5.11.2026' },
  { id: 'perplexity', pomiar: 'Perplexity: wszystkie pytania', wynik: '0 z 23 odpowiedzi z linkiem do Map', proba: '23 odpowiedzi, 4–5.11.2026' },
];

// Pierwsze 90 dni (MSA-05).
const PLAN_KOLUMNY = [
  { key: 'okres', label: 'Okres' },
  { key: 'robimy', label: 'Co robimy' },
  { key: 'panel', label: 'Co widzisz w panelu' },
];
const PLAN_WIERSZE = [
  { id: 't1', okres: 'Tydzień 1', robimy: 'Ustalamy z Tobą 30 pytań i robimy pomiar bazowy we wszystkich czterech źródłach.', panel: 'Pierwszy wynik i listę stron, które modele cytują w Twojej branży.' },
  { id: 't2-4', okres: 'Tygodnie 2–4', robimy: 'Audyt i poprawki techniczne: dostęp botów, dane strukturalne, llms.txt, te same dane firmy w katalogach.', panel: 'Dziennik prac i sprawy do akceptacji.' },
  { id: 'm2', okres: 'Miesiąc 2', robimy: 'Treści, które odpowiadają na pytania klientów, i uzupełniona wizytówka Google.', panel: 'Nowe podstrony i zmianę wyniku tydzień po tygodniu.' },
  { id: 'm3', okres: 'Miesiąc 3', robimy: 'Wzmianki w katalogach i serwisach, które modele cytują, oraz porównanie z pomiarem bazowym.', panel: 'Zmianę odsetka odpowiedzi z nazwą firmy od startu.' },
];

const card = { background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };
const tekstStyl = { margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)' };
const h3Styl = { fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--color-text-dark)' };
const linkStyl = { textDecoration: 'underline' };
const przypisStyl = { margin: '0.6rem 0 0', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' };

function Karta({ k }) {
  return (
    <RevealItem id={k.id} style={{ ...card, padding: '1.5rem 1.6rem', display: 'flex', flexDirection: 'column', scrollMarginTop: '110px' }}>
      <h3 style={h3Styl}>{k.pytanie}</h3>
      <p style={{ ...tekstStyl, fontSize: '1rem' }}>{k.odpowiedz}</p>
      {k.zrodlo && (
        <p style={przypisStyl}>
          Źródło: {k.zrodlo.url ? <a href={k.zrodlo.url} rel="noopener" style={linkStyl}>{k.zrodlo.tekst}</a> : k.zrodlo.tekst}
          {k.zrodlo.data ? `, ${k.zrodlo.data}.` : ''}
        </p>
      )}
      {k.href && (
        <p style={{ margin: 'auto 0 0', paddingTop: '0.9rem', fontWeight: 600 }}>
          <Link href={k.href} style={linkStyl}>{k.anchor} →</Link>
        </p>
      )}
    </RevealItem>
  );
}

function SekcjaTekstowa({ id, title, children }) {
  return (
    <section id={id} style={{ padding: '40px 0 50px' }}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <Reveal className="section-header"><h2>{title}</h2></Reveal>
        <Reveal style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>{children}</Reveal>
      </div>
    </section>
  );
}

// Sekcje tylko PL, między cenami a „Co robimy” (konspekt PLAN-v2 6.16, pkt 4–10).
function SekcjePl() {
  const hrefMapy = HREF.l1 ?? '/seo-lokalne-warszawa';
  return (
    <>
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <Reveal className="section-header"><h2>Pytania o widoczność w AI, na które odpowiadamy</h2></Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', marginTop: '2rem' }}>
            {KARTY.map((k) => <Karta key={k.id} k={k} />)}
          </RevealStagger>
        </div>
      </section>

      <SekcjaTekstowa title="Co modele polecają dziś: pomiar z listopada 2026">
        <p style={tekstStyl}>Zadajemy modelom pytania, jakie zadają klienci, i sprawdzamy, kogo polecają i skąd biorą informacje. Poniżej wynik z 4 i 5 listopada 2026 roku. Pokazujemy źródła, a nie nazwy polecanych firm.</p>
        <CompareTable
          caption="Pomiar odpowiedzi AI, 4–5 listopada 2026"
          columns={POMIAR_KOLUMNY}
          rows={POMIAR_WIERSZE}
          przypis="Metoda: odpowiedzi pobrane przez API DataForSEO z ChatGPT (gpt-4.1-mini z wyszukiwaniem w sieci, lokalizacja wyszukiwania Warszawa, także dla pytań o Kraków i Poznań) i z Perplexity (sonar), jedna odpowiedź na pytanie. Pytanie o naszą markę (5 linków, 0 do Map) i porady bez wyszukiwania liczymy osobno. Przegląd AI: wyniki Google PL na komputerze, 4.11.2026."
        />
        <p style={tekstStyl}>Wniosek: ChatGPT przy poleceniu podaje zwykle adres i godziny otwarcia, a link prowadzi do Map Google, gdzie klient widzi wizytówkę. Dla firmy usługowej pierwszym krokiem jest więc zadbana wizytówka, a dla agencji i firm B2B profile w katalogach i rankingach, z których korzysta Perplexity. Strona z jawnym cennikiem bywa cytowana przy pytaniach o ceny.</p>
      </SekcjaTekstowa>

      <SekcjaTekstowa title="Dla kogo jest pozycjonowanie w AI, a kiedy jeszcze nie">
        <p style={tekstStyl}>Pozycjonowanie w AI to warstwa nad podstawami, a nie skrót do klientów. Najwięcej daje firmom, o które ludzie pytają przed zakupem, a najmniej tym, których strony Google jeszcze nie zna.</p>
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
          <div style={{ ...card, padding: '1.5rem 1.6rem' }}>
            <h3 style={h3Styl}>Ma sens, gdy</h3>
            <ul style={{ ...tekstStyl, paddingLeft: '1.15rem', display: 'grid', gap: '0.6rem', fontSize: '1rem' }}>
              <li>klienci przed zakupem porównują wykonawców i pytają o rekomendacje: usługi B2B, usługi z wyższą ceną, gabinety, kancelarie, firmy remontowe;</li>
              <li>strona jest już zaindeksowana, ma podstrony usług i podstawowe SEO, a firma ma wizytówkę Google z opiniami;</li>
              <li>chcesz wiedzieć, co modele mówią o Twojej marce i kogo polecają zamiast Ciebie.</li>
            </ul>
          </div>
          <div style={{ ...card, padding: '1.5rem 1.6rem' }}>
            <h3 style={h3Styl}>Jeszcze nie, gdy</h3>
            <ul style={{ ...tekstStyl, paddingLeft: '1.15rem', display: 'grid', gap: '0.6rem', fontSize: '1rem' }}>
              <li>strona nie jest w indeksie Google albo nie ma osobnych podstron usług: zacznij od <Link href="/pozycjonowanie-stron-internetowych" style={linkStyl}>pozycjonowania strony</Link>;</li>
              {/* „zacznij od Map” -> L1 po publikacji, do tego czasu /seo-lokalne-warszawa (brief A1). */}
              <li>firma lokalna nie ma zweryfikowanej wizytówki Google: <Link href={hrefMapy} style={linkStyl}>zacznij od Map</Link>, bo do nich prowadziły polecenia ChatGPT w naszym teście;</li>
              <li>oczekujesz gwarancji wzmianki w konkretnym terminie: tego nikt uczciwie nie obieca.</li>
            </ul>
          </div>
        </div>
      </SekcjaTekstowa>

      {/* CS-02, OP-05: 180–250 słów, „agencja GEO” 2×, adres jak w LocalBusiness (layout.js). */}
      <SekcjaTekstowa title="Agencja GEO i SEO AI: jak wybrać i co robimy">
        <p style={tekstStyl}>AI SEO COMPANY to agencja SEO AI z Warszawy (ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa). Łączymy pozycjonowanie stron z pracą nad widocznością w ChatGPT, Gemini i przeglądach AI, czyli z tym, czym zajmuje się agencja GEO. Pracujemy z firmami z Warszawy i całej Polski na umowie miesięcznej. Zobacz <Link href="/cennik-pozycjonowania" style={linkStyl}>cennik pozycjonowania</Link> i <a href={PANEL_DEMO_URL} data-cta="geo_agencja_demo" style={linkStyl}>demo panelu</a> bez logowania.</p>
        <h3 style={{ ...h3Styl, marginTop: '0.75rem' }}>Co robi agencja GEO co miesiąc</h3>
        <p style={tekstStyl}>Rzetelna agencja GEO co miesiąc powtarza pomiar na tych samych pytaniach, poprawia profile firmy w katalogach i w Mapach, dopisuje treści z odpowiedziami na pytania klientów i pilnuje danych strukturalnych. U nas w SEO Premium to 2 działania miesięcznie pod AI i pomiar 30 pytań co tydzień.</p>
        <h3 style={{ ...h3Styl, marginTop: '0.75rem' }}>8 pytań do agencji GEO przed podpisaniem umowy</h3>
        <ol style={{ ...tekstStyl, paddingLeft: '1.25rem', display: 'grid', gap: '0.4rem' }}>
          <li>Ile pytań mierzycie i czy ustalamy je razem?</li>
          <li>W których modelach i z jakiej lokalizacji sprawdzacie odpowiedzi?</li>
          <li>Jak często dostanę wynik i czy zobaczę pełne odpowiedzi modeli?</li>
          <li>Z jakich stron modele biorą informacje w mojej branży?</li>
          <li>Co dokładnie zrobicie w pierwszym miesiącu?</li>
          <li>Czy gwarantujecie wzmianki w ChatGPT? Uczciwa odpowiedź brzmi: nie.</li>
          <li>Jaki jest okres wypowiedzenia i czy są kary za wyjście?</li>
          <li>Czy treści, linki i konta zostaną po mojej stronie po zakończeniu umowy?</li>
        </ol>
        {/* CS-02 (6.11.2026, publikacja P6): zdanie o zmianie agencji zostaje (strona chroniona -
            tylko dodawanie), link do P6 dochodzi obok. */}
        <p style={tekstStyl}>Jak przejąć konta, treści i linki od obecnej agencji, opisujemy w poradniku „<Link href="/zmiana-agencji-seo" style={linkStyl}>zmiana agencji SEO bez utraty pozycji</Link>”.</p>
        {HREF.p6 && (
          <p style={tekstStyl}>Dobre odpowiedzi i czerwone flagi do 12 pytań opisujemy w poradniku <Link href={HREF.p6} style={linkStyl}>jak wybrać agencję SEO</Link>.</p>
        )}
        <h3 style={{ ...h3Styl, marginTop: '0.75rem' }}>Jak mierzymy efekt GEO</h3>
        <p style={tekstStyl}>
          Efekt liczymy jako odsetek odpowiedzi, w których pada nazwa firmy albo adres jej strony, na tych samych 30 pytaniach co tydzień. Porównujemy go z pomiarem bazowym z pierwszego tygodnia i pokazujemy, które źródła modele zaczęły cytować.
          {HREF.sprawdzarka && <> Szybki test bez umowy: <Link href={HREF.sprawdzarka} style={linkStyl}>sprawdź widoczność w AI</Link>.</>}
        </p>
      </SekcjaTekstowa>

      {/* MSA-05; dowody z naszej domeny: PLAN-v2 3.2 i AV-14 (botcheck 4.11 20:26 i 5.11 01:16). */}
      <SekcjaTekstowa title="Co wdrażamy technicznie">
        <ul style={{ ...tekstStyl, paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem' }}>
          <li>Dostęp dla botów AI: sprawdzamy, czy robots.txt i zapora serwera nie blokują GPTBot, OAI-SearchBot, PerplexityBot ani ClaudeBot.</li>
          <li>Plik llms.txt z krótkim opisem firmy, cenami i listą kluczowych adresów.</li>
          <li>Dane strukturalne zgodne z tym, co widać na stronie: firma z adresem, usługi z cenami, pytania z odpowiedziami i okruszki.</li>
          <li>
            Bing Webmaster Tools i IndexNow, żeby nowe i zmienione podstrony szybciej trafiały do indeksu Bing.
            {HREF.b1 && <> Jak to ustawić: <Link href={HREF.b1} style={linkStyl}>konfiguracja Bing Webmaster Tools i IndexNow</Link>.</>}
          </li>
        </ul>
        <p style={tekstStyl}>Na naszej domenie robots.txt blokuje tylko katalog /api/. W teście z 4 i 5 listopada 2026 16 robotów, m.in. GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot, dostało na 7 sprawdzonych adresach kod 200 i tę samą treść co przeglądarka Chrome. Plik <a href="/llms.txt" style={linkStyl}>llms.txt</a> jest publiczny, a zmienione adresy po każdym wydaniu zgłaszamy przez IndexNow.</p>
      </SekcjaTekstowa>

      <SekcjaTekstowa title="Pierwsze 90 dni: harmonogram pozycjonowania w AI">
        <CompareTable
          caption="Harmonogram pierwszych 90 dni"
          columns={PLAN_KOLUMNY}
          rows={PLAN_WIERSZE}
          przypis="Harmonogram dotyczy pomiaru co tydzień w SEO Premium albo w dopłacie do SEO Standard. Sam audyt kończy się raportem po 5 dniach roboczych."
        />
      </SekcjaTekstowa>
    </>
  );
}

export default function GeoPageClient() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  const t = T[lang];
  const pl = lang === 'pl';
  const faqDane = pl ? faq : faq.filter((f) => !f.tylkoPl);
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Pozycjonowanie w AI" en="AI Search Optimization" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '880px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)' }}>{t.h1}</h1>
            {pl ? (
              // Klasa hero-lead: na telefonie blok idzie pod przyciski (globals.css, baner cookies).
              <div className="hero-lead" style={{ maxWidth: '760px', margin: '0 auto' }}>
                <AnswerBox>{t.answer}</AnswerBox>
              </div>
            ) : (
              <p className="hero-lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '740px', margin: '0 auto 2rem', lineHeight: 1.65 }}>{t.lead}</p>
            )}
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {pl ? (
                <Link href="/sprawdz-widocznosc-w-ai" className="hero-btn-primary" data-cta="geo_hero_checker">{t.ctaCheck}</Link>
              ) : (
                <a href={hash('kontakt', lang)} className="hero-btn-primary" data-cta="geo_hero_quote">{t.ctaAudit}</a>
              )}
              {pl && <a href={hash('kontakt', lang)} className="hero-btn-secondary" data-cta="geo_hero_audit">{t.ctaAudit}</a>}
            </div>
            {/* Autor i data = LASTMOD huba (PLAN-v2 6.0, OP-14); na EN Byline zwraca null. */}
            <Byline sciezka="/pozycjonowanie-w-ai" style={{ margin: '1.5rem auto 0', order: 6 }} />
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <Reveal className="section-header"><h2>{t.howTitle}</h2></Reveal>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', alignItems: 'center', marginTop: '2rem' }}>
            <RevealStagger style={{ display: 'grid', gap: '1rem' }}>
              {t.how.map(([h, p]) => (
                <RevealItem key={h} style={{ ...card, padding: '1.25rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p}</p>
                </RevealItem>
              ))}
            </RevealStagger>
            <Reveal style={{ textAlign: 'center' }}>
              <Image src="/images/panel/ai.webp" alt={t.shotAlt} width={1600} height={1025} sizes="(max-width: 800px) 100vw, 560px" style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)' }} />
              <a href={PANEL_DEMO_URL} data-cta="geo_demo" style={{ display: 'inline-block', marginTop: '1rem', fontWeight: 600, textDecoration: 'underline' }}>{t.demo} →</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* id tylko w PL (CB-04/CB-20): cel linków z cennika (A4), A2 i frazy.csv. */}
      <section id={pl ? sectionId('ileKosztuje', 'pl') : undefined} style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <Reveal className="section-header"><h2>{t.offerTitle}</h2></Reveal>
          {pl && (
            // OP-06: jedno zdanie bez kwot (17 słów) zamiast powtarzania cen z kart i FAQ; OP-04 link 23.
            <Reveal style={{ maxWidth: '760px', margin: '1rem 0 0' }}>
              <p style={tekstStyl}>Pozycjonowanie AI rozliczamy na dwa sposoby: jednorazowym audytem albo stałym pomiarem i działaniami w miesięcznym <Link href="/cennik-pozycjonowania" style={linkStyl}>abonamencie SEO</Link>.</p>
            </Reveal>
          )}
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', marginTop: '2rem' }}>
            {t.offer.map((o, i) => (
              <RevealItem key={o.name} style={{ ...card, padding: '1.75rem', border: o.featured ? '2px solid var(--color-primary)' : '1px solid transparent' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>{o.name}</h3>
                <p style={{ margin: '0.75rem 0 0', fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>{o.price}</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{o.unit}</p>
                {/* 6.11.2026 (publikacja A5): lista punktow zostaje, link do A5 dochodzi pod nia
                    (strona chroniona - tylko dodawanie; wczesniejszy wariant zamienial liste na akapit). */}
                <ul style={{ margin: '1rem 0 0', paddingLeft: '1.1rem', display: 'grid', gap: '0.45rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
                    {o.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                {pl && i === 0 && HREF.a5 && (
                  <p style={{ margin: '0.75rem 0 0', fontWeight: 600 }}>Zakres i przykład wyniku: <Link href={HREF.a5} style={linkStyl}>audyt widoczności w AI</Link></p>
                )}
              </RevealItem>
            ))}
          </RevealStagger>
          {pl && (
            <Reveal style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={przypisStyl}>Stan cen: 11.2026. Ceny netto.</p>
              {HREF.a6 && <p style={{ margin: '0.5rem 0 0', fontWeight: 600 }}><Link href={HREF.a6} style={linkStyl}>porównanie cen pozycjonowania w AI →</Link></p>}
            </Reveal>
          )}
          <Reveal style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="geo_offer_audit">{t.ctaAudit}</a>
          </Reveal>
        </div>
      </section>

      {pl && <SekcjePl />}

      <section style={{ padding: '20px 0 80px' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <Reveal>
            <div style={{ ...card, borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>{t.doTitle}</h2>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                {t.do.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ ...card, borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)' }}>{t.honestTitle}</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)' }}>{t.honest}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Jeden FAQPage: 8 pytań akordeonu + 8 kart w PL (16), 5 pytań w EN (CB-03 pkt 4). */}
      <AppleFaq faqData={faqDane} extraSchema={pl ? KARTY_SCHEMA : []} title={pl ? 'Pytania o pozycjonowanie w AI' : 'Questions about AI search optimization'} />
      <ServiceSchema variant="geo" />
      <Contact />
      <Footer />
    </main>
  );
}
