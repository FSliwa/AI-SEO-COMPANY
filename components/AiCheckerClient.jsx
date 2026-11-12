'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import AppleFaq from '@/components/service/AppleFaq';
import WebAppSchema from '@/components/WebAppSchema';
import Contact from '@/components/Contact';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { hrefWJezyku, hrefWJezykuJesliOpublikowana } from '@/lib/linkiEn';
import { WIDOCZNOSC, cena, ileSilnikow, listaSilnikow } from '@/lib/narzedziaLiczby';
import WidocznoscAiClient from '@/components/narzedzia/WidocznoscAiClient';
import PozostaleNarzedzia, { RODZIC_HUBA } from '@/components/narzedzia/PozostaleNarzedzia';
import Poradniki from '@/components/narzedzia/Poradniki';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';

// Z-07: zrzut przykładowego wyniku z trybu demonstracyjnego (12.11.2026, bez ręcznych poprawek, tylko część
// widoczna od razu, bez bramki e-mail). Firma „Przykład”/„Example”, konkurenci (Stolarnia A…) i cytowane strony
// (*.example) są zmyślone; podpis mówi to wprost. Etykiety silników jak w panelu (Gemini z wyszukiwaniem Google).
const ZRZUT = {
  pl: { src: '/images/narzedzia/przyklady/widocznosc-w-ai-przykladowy-wynik.webp', width: 1200, height: 1614 },
  en: { src: '/images/narzedzia/przyklady/ai-visibility-check-example-result.webp', width: 1200, height: 1647 },
};
import { Sekcja } from '@/components/narzedzia/Sekcja';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';

// Audyt widoczności w AI (9.11.2026, decyzja Filipa: aplikacja zastępuje sprawdzarkę „Czy ChatGPT
// poleca Twoją firmę?”, która pytała tylko ChatGPT i Gemini). Pytania zadaje panel
// (panel.ai-seo-company.pl/api/narzedzia/widocznosc-ai): ChatGPT i Gemini z wyszukiwaniem w sieci,
// Perplexity (DataForSEO), Claude z wyszukiwaniem (Anthropic), przegląd AI w Google; Grok (xAI, z wiedzy
// modelu) dopiero z XAI_API_KEY. Pytanie 3 powstaje z tytułu i opisu strony klienta, jeśli ją poda.
// Limit 2 firmy na IP na dobę. Wynik (od 12.11.2026, decyzja właściciela Z-W9): ocena, siatka, 5 firm
// i 5 cytowanych domen od razu; treść odpowiedzi, źródła każdej odpowiedzi, pozostałe firmy i raport po
// podaniu e-maila (components/narzedzia/BramkaEmail.jsx). Teksty poniżej opisują dokładnie to, co robi
// panel; liczby i lista silników ze stałych lib/narzedziaLiczby.js (Z-00).
// 12.11.2026 (S1-poprawki Z-W1…Z-W10, Z-02…Z-05): H1 z frazą, lead 2 zdania, „Co dostajesz za darmo”,
// tabela metod z ograniczeniami, źródła z datą, FAQ 9, okruszek przez hub, poradniki i wszystkie narzędzia.

// LW1 (PLAN-v2 6.0, 6.2, 6.10): linki do nowych stron tylko przez bramkę publikacji. Zdanie
// opisuje stronę, której przed publikacją nie ma, więc bez celu znika całe (nie zostaje tekst).
const HREF_P2 = hrefJesliOpublikowana('/porownania/seo-vs-geo');
const HREF_N1 = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
// Z-W10: oferta prowadzi do strony audytu widoczności, nie do huba GEO.
const HREF_AUDYT = hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci') ?? '/pozycjonowanie-w-ai';
const HREF_AUDYT_EN = hrefWJezykuJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci', 'en') ?? hrefWJezyku('/pozycjonowanie-w-ai', 'en');
const SCIEZKA = '/sprawdz-widocznosc-w-ai';

// Warianty tekstów ze stałych Z-00: Gemini bez wyszukiwania (NARZEDZIA_GEMINI_WEB_SEARCH=0), Grok po kluczu xAI.
const W = WIDOCZNOSC;
const SZUKAJA = W.geminiZWyszukiwaniem ? ['ChatGPT, Gemini, Perplexity i Claude', 'ChatGPT, Gemini, Perplexity and Claude'] : ['ChatGPT, Perplexity i Claude', 'ChatGPT, Perplexity and Claude'];
const duzaLitera = (t) => `${t[0].toUpperCase()}${t.slice(1)}`;
const AUDYT_PLN = cena('audytAi', 'pl');
const AUDYT_EUR = cena('audytAi', 'en');

// 4.11.2026 (etap 0 planu z filmu, A3): strona miała 292 słowa i 1 link wewnętrzny.
// 9.11.2026: kroki, progi wyniku i FAQ opisują nowy audyt (5 silników, ocena 0-100).
// 12.11.2026: kroki według panelu narzedzia-poprawki (Z-W4): pytanie 3 ze strony, Gemini z wyszukiwaniem.
// Frazy: „widoczność w ai” 90/mies., „ai visibility” 110 (Google Ads przez DataForSEO, 4.11.2026).
const KROKI = [
  ['Trzy pytania jak od klienta', 'Z branży i miasta układamy dwa pytania, np. „Jaką firmę z branży stolarz polecasz w mieście Warszawa? Podaj kilka nazw.”. Gdy podasz stronę www, a jej tytuł i opis nazywają konkretną usługę, trzecie pytanie układamy z nich, np. „Szukam: meble kuchenne na wymiar, Poznań. Którą firmę wybrać i dlaczego?”. Bez strony trzecie pytanie też powstaje z branży i miasta.'],
  [`${duzaLitera(ileSilnikow('pl'))} silników AI`, `Każde pytanie zadajemy ChatGPT z wyszukiwaniem w sieci ustawionym na Polskę (i Twoje miasto, jeśli je podasz), ${W.geminiZWyszukiwaniem ? 'Gemini z wyszukiwaniem Google' : 'Gemini z wiedzy modelu (bez wyszukiwania)'}, Perplexity i Claude z wyszukiwaniem, ${W.grok ? 'Grok z wiedzy modelu (bez wyszukiwania), ' : ''}a w Google sprawdzamy przegląd AI. Microsoft Copilot nie ma publicznego API, więc go nie odpytujemy i piszemy to w wyniku.`],
  ['Szukamy Twojej firmy', 'W każdej odpowiedzi sprawdzamy, czy pada nazwa firmy albo adres strony, i zapisujemy źródła, na które powołuje się model. Ocena 0-100 to odsetek odpowiedzi, w których firma się pojawia. Z odpowiedzi zbieramy też firmy, które modele wymieniają, i strony, które cytują.'],
];
const WYNIK = [
  ['0', 'Modele nie łączą Twojej firmy z branżą i miastem. Częste przyczyny: słaba wizytówka Google, mało opinii, brak firmy w katalogach i zestawieniach, strona bez jasnego opisu usług i lokalizacji.'],
  ['1–49', 'Firma pojawia się, ale nie w każdym pytaniu ani w każdym modelu. Zobacz źródła w odpowiedziach: to strony, na których warto mieć wzmiankę.'],
  ['50–100', 'Modele wymieniają Twoją firmę. Sprawdzaj to regularnie, bo odpowiedzi zmieniają się z dnia na dzień.'],
];
const FAQ = [
  { question: 'Czy sprawdzarka widoczności w AI jest darmowa?', answer: `Tak. Zapytania do modeli opłacamy my. Ocenę, siatkę odpowiedzi, ${W.przedBramka.firm} firm, które modele wymieniają najczęściej, i ${W.przedBramka.domen} najczęściej cytowanych stron widzisz od razu. Treść odpowiedzi, źródła każdej z nich i pozostałe firmy pokażemy po podaniu e-maila, na który wysyłamy też raport. Zapis na newsletter jest osobny i dobrowolny. Z jednego adresu IP można sprawdzić ${W.limitIp} firmy na dobę.` },
  { question: 'Dlaczego wynik różni się od tego, co widzę w ChatGPT?', answer: 'Pytamy przez API modeli, z wyszukiwaniem w sieci (ChatGPT z lokalizacją Polska i Twoim miastem, jeśli je podasz). Aplikacja ChatGPT uwzględnia też historię rozmów, ustawienia i lokalizację użytkownika. Każde sprawdzenie to migawka: 3 pytania zadane jeden raz, a odpowiedzi zmieniają się między przebiegami i dniami. Traktuj wynik jako próbkę, nie jako stały ranking.' },
  { question: 'Które modele sprawdzacie?', answer: `W darmowym sprawdzeniu: ${SZUKAJA[0]} z wyszukiwaniem w sieci${W.geminiZWyszukiwaniem ? '' : ', Gemini z wiedzy modelu'}${W.grok ? ', Grok (z wiedzy modelu, bez wyszukiwania)' : ''} oraz przegląd AI w wynikach Google. Microsoft Copilot nie ma publicznego API, więc nie da się go sprawdzić automatycznie. W płatnym audycie widoczności w AI zadajemy 30 pytań zamiast 3.` },
  { question: 'Czy mogę sprawdzić firmę konkurenta?', answer: `Tak. Wpisz jej nazwę, branżę, miasto i stronę. Dwa pytania będą te same co dla Ciebie, a trzecie powstanie z jej strony, więc zobaczysz, czy modele wymieniają konkurenta częściej niż Ciebie. Limit to ${W.limitIp} firmy dziennie z jednego adresu IP.` },
  { question: 'Czym różni się darmowe sprawdzenie od audytu widoczności w AI?', answer: `Darmowe sprawdzenie zadaje 3 pytania i pokazuje, czy pada nazwa firmy. W <a href="${HREF_AUDYT}">audycie widoczności w AI</a> (${AUDYT_PLN} netto) zadajemy 30 pytań Twoich klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI Google, pokazujemy źródła cytowań i przygotowujemy plan na 90 dni.` },
  { question: 'Dlaczego przy mojej nazwie jest ostrzeżenie o ogólnych słowach?', answer: 'Jeśli nazwa firmy składa się tylko ze zwykłych słów (np. „Agencja SEO Warszawa” albo „AI SEO Company”), modele używają ich także w zwykłych zdaniach o branży. Wtedy liczymy wzmiankę tylko, gdy odpowiedź podaje adres Twojej strony albo zapisuje nazwę jak nazwę własną. Podaj adres strony, żeby wynik był dokładniejszy.' },
  { question: 'Kto widzi mój wynik?', answer: 'Wynik nie trafia do żadnego publicznego rankingu ani na naszą stronę. Zapisujemy go razem z danymi z formularza na 60 dni, żeby pokazać pełny wynik po podaniu e-maila i wysłać raport. Gdy podasz e-mail, dostajemy powiadomienie z podsumowaniem wyniku, żeby móc odpowiedzieć na Twoje pytania.' },
  { question: 'Co dzieje się z moimi danymi?', answer: `Używamy ich tylko do przygotowania i wysłania wyniku oraz do odpowiedzi na Twoje pytania. Usuwamy je po 60 dniach. Odbiorcy to dostawcy poczty i modeli AI: ${W.grok ? 'Resend, DataForSEO, Anthropic i xAI' : 'Resend, DataForSEO i Anthropic'}. Newsletter wysyłamy tylko wtedy, gdy zaznaczysz osobną zgodę i potwierdzisz zapis linkiem z maila.` },
  { question: 'Jak zwiększyć widoczność w AI?', answer: 'Zacznij od wizytówki Google i opinii, potem zadbaj o wzmianki w źródłach, które modele cytują w Twojej branży, i o jasne odpowiedzi na pytania klientów na stronie. Sprawdź też, czy robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot.' },
];

// Wersja EN (9.11.2026, 12.11.2026): te same fakty, liczby i kolejność co w PL.
const KROKI_EN = [
  ['Three questions the way a customer asks them', 'From your industry and city we draft two questions, e.g. “Which company in the ‘carpenter’ industry do you recommend in Warsaw? Name a few.” If you add a page in English (e.g. company.com/en) whose title and description name a specific service, we build the third question from them, e.g. “I\'m looking for: fitted kitchens, Poznań. Which company should I choose and why?”. Without a website, the third question also comes from your industry and city.'],
  [`${duzaLitera(ileSilnikow('en'))} AI engines`, `We ask each question to ChatGPT with web search set to Poland (and your city, if you give one), ${W.geminiZWyszukiwaniem ? 'Gemini with Google Search' : 'Gemini from model knowledge (without web search)'}, Perplexity and Claude with web search, ${W.grok ? 'Grok from model knowledge (without web search), ' : ''}and we check Google AI Overviews. Microsoft Copilot has no public API, so we do not query it and we say so in the result.`],
  ['We look for your business', 'In every answer we check whether your company name or website address appears, and we record the sources the model cites. The 0-100 score is the share of answers in which your business appears. From the answers we also collect the businesses the models name and the sites they cite.'],
];
const WYNIK_EN = [
  ['0', 'The models do not connect your business with your industry and city. Common causes: a weak Google Business Profile, few reviews, no presence in directories and rankings, a website without a clear description of services and location.'],
  ['1–49', 'Your business appears, but not in every question or every model. Look at the sources in the answers: those are the sites where a mention is worth having.'],
  ['50–100', 'The models name your business. Check it regularly, because answers change from day to day.'],
];
const FAQ_EN = [
  { question: 'Is the AI visibility checker free?', answer: `Yes. We pay for the model queries. You see the score, the answer grid, the ${W.przedBramka.firm} businesses the models name most often and the ${W.przedBramka.domen} most cited sites right away. The answer texts, the sources of each answer and the remaining businesses are shown once you enter your email address, to which we also send the report. Newsletter signup is separate and voluntary. You can check ${W.limitIp} businesses per day from one IP address.` },
  { question: 'Why does the result differ from what I see in ChatGPT?', answer: 'We ask through the models’ APIs, with web search (ChatGPT set to Poland and to your city, if you give one). The ChatGPT app also takes into account conversation history, settings and the user’s location. Each check is a snapshot: 3 questions asked once, and answers change between runs and from day to day. Treat the result as a sample, not a fixed ranking.' },
  { question: 'Which models do you check?', answer: `In the free check: ${SZUKAJA[1]} with web search${W.geminiZWyszukiwaniem ? '' : ', Gemini from model knowledge'}${W.grok ? ', Grok (from model knowledge, without web search)' : ''}, and Google AI Overviews. Microsoft Copilot has no public API, so it cannot be checked automatically. In the paid AI visibility audit we ask 30 questions instead of 3.` },
  { question: 'Can I check a competitor?', answer: `Yes. Enter its name, industry, city and website. Two questions will be the same as for you and the third will come from its website, so you will see whether the models name your competitor more often than you. The limit is ${W.limitIp} businesses per day from one IP address.` },
  { question: 'How is the free check different from the AI visibility audit?', answer: `The free check asks 3 questions and shows whether your business is named. In the <a href="${HREF_AUDYT_EN}">AI visibility audit</a> (${AUDYT_EUR} net) we ask 30 customer questions in ChatGPT, Perplexity, Gemini and Google AI Overviews, show who gets recommended instead of you and prepare a plan.` },
  { question: 'Why is there a note about generic words next to my business name?', answer: 'If your business name is made only of ordinary words (e.g. “SEO Agency Warsaw” or “AI SEO Company”), the models also use them in ordinary sentences about the industry. In that case we only count a mention when the answer gives your website address or writes the name as a proper name. Add your website for a more accurate result.' },
  { question: 'Who can see my result?', answer: 'The result does not go into any public ranking or onto our website. We store it with the form data for 60 days so we can show the full result after you enter your email and send the report. When you enter your email, we receive a notification with a summary of the result so we can answer your questions.' },
  { question: 'What happens to my data?', answer: `We use it only to prepare and send the result and to answer your questions. We delete it after 60 days. Recipients are email and AI model providers: ${W.grok ? 'Resend, DataForSEO, Anthropic and xAI' : 'Resend, DataForSEO and Anthropic'}. We send the newsletter only if you tick a separate consent and confirm your signup with the link in the email.` },
  { question: 'How do I increase my AI visibility?', answer: 'Start with your Google Business Profile and reviews, then work on mentions in the sources the models cite in your industry, and on clear answers to customer questions on your site. Also check that robots.txt does not block the OAI-SearchBot and PerplexityBot crawlers.' },
];

// Z-W6: tabela trzech metod (bez nazw konkurentów: metody opisane w benchmarkach A1 §5, A2 §4.3).
const TABELA = {
  pl: {
    caption: 'Trzy sposoby mierzenia widoczności w AI',
    columns: [{ key: 'k', label: 'Kryterium' }, { key: 'my', label: 'Pytania na żywo z wyszukiwaniem (nasza sprawdzarka)' }, { key: 'baza', label: 'Baza gotowych pytań' }, { key: 'model', label: 'Pytanie modelu bez wyszukiwania' }],
    rows: [
      { k: 'Skąd odpowiedź', my: `${SZUKAJA[0]} szukają w sieci w chwili pytania; przegląd AI z bieżących wyników Google`, baza: 'z odpowiedzi na pytania, które dostawca narzędzia zebrał wcześniej', model: 'z wiedzy, której model nauczył się przed publikacją' },
      { k: 'Pytania', my: '3 pytania: 2 z Twojej branży i miasta, 1 z tytułu i opisu Twojej strony', baza: 'pytania z bazy dostawcy', model: 'zwykle pytania o markę' },
      { k: 'Mała firma lokalna', my: 'dostaje wynik, bo pytamy o branżę, miasto i Twoją ofertę', baza: 'gdy firmy nie ma w bazie, może nie być żadnego wyniku', model: 'model może nie znać firmy, choć wyszukiwarka by ją znalazła' },
      { k: 'Co widzisz', my: 'odpowiedzi, fragment ze wzmianką, firmy i źródła', baza: 'liczby wzmianek i tematy', model: 'odpowiedź albo ocenę modelu' },
    ],
  },
  en: {
    caption: 'Three ways to measure AI visibility',
    columns: [{ key: 'k', label: 'Criterion' }, { key: 'my', label: 'Live questions with web search (our checker)' }, { key: 'baza', label: 'A database of prepared questions' }, { key: 'model', label: 'Asking a model without web search' }],
    rows: [
      { k: 'Where the answer comes from', my: `${SZUKAJA[1]} search the web at the time of the question; AI Overviews from current Google results`, baza: 'answers to questions the tool provider collected earlier', model: 'what the model learned before it was released' },
      { k: 'Questions', my: '3 questions: 2 from your industry and city, 1 from your website’s title and description', baza: 'questions from the provider’s database', model: 'usually questions about the brand' },
      { k: 'A small local business', my: 'gets a result, because we ask about the industry, the city and your offer', baza: 'if the business is not in the database, there may be no result at all', model: 'the model may not know the business, even though a search engine would find it' },
      { k: 'What you see', my: 'answers, the excerpt with the mention, businesses and sources', baza: 'mention counts and topics', model: 'the model’s answer or rating' },
    ],
  },
};
const OGRANICZENIA = [
  'Trzy pytania to próbka. Gdy nie podasz strony, wszystkie trzy układamy z branży i miasta, a przy niszowej ofercie wynik bywa wtedy niższy niż przy pytaniach o konkretną usługę. Podaj adres strony, a jedno pytanie ułożymy z jej tytułu i opisu.',
  'Silnik oznaczony w wyniku „bez wyszukiwania” odpowiada z wiedzy modelu. Ten wiersz mówi, czy model zna firmę, a nie, czy znajdzie ją w sieci.',
  'Nazwę firmy szukamy jako całe słowa. Gdy nazwa składa się z samych ogólnych słów (np. „Agencja SEO Warszawa”), liczymy wzmiankę tylko wtedy, gdy odpowiedź podaje adres Twojej strony albo zapisuje nazwę jak nazwę własną. Taki wynik może być zaniżony, więc przejrzyj fragmenty odpowiedzi w pełnym wyniku.',
  'Odpowiedzi zmieniają się z dnia na dzień. W dwóch przebiegach dla tej samej firmy dostaliśmy 18 i 36 punktów, dlatego porównuj wyniki z kilku sprawdzeń.',
  'Sprawdzarka jest ustawiona na rynek polski: ChatGPT i Claude szukają z lokalizacją Polska, a przegląd AI odczytujemy z wyników Google dla Polski. Dla firm działających tylko za granicą wynik jest mniej miarodajny.',
];
const OGRANICZENIA_EN = [
  'Three questions are a sample. If you do not add your website, all three come from your industry and city, and for a niche offer the score can then be lower than for questions about a specific service. Add your website and we build one question from its title and description.',
  'An engine marked “no web search” in the result answers from model knowledge. That row tells you whether the model knows your business, not whether it would find it online.',
  'We look for your business name as whole words. If the name is made only of generic words (e.g. “SEO Agency Warsaw”), we count a mention only when the answer gives your website address or writes the name as a proper name. Such a score may be too low, so review the answer excerpts in the full result.',
  'Answers change from day to day. In two runs for the same business we got 18 and 36 points, so compare the results of several checks.',
  'The checker is set up for the Polish market: ChatGPT and Claude search with the location set to Poland, and we read AI Overviews from Google results for Poland. For businesses that operate only abroad the result is less reliable.',
];

const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };
const kartaListy = { ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' };

export default function AiCheckerClient() {
  const en = useLocale() === 'en';
  const locale = en ? 'en' : 'pl';
  const kroki = en ? KROKI_EN : KROKI;
  const wynik = en ? WYNIK_EN : WYNIK;
  const tabela = en ? TABELA.en : TABELA.pl;
  return (
    <main className={st.strona} style={s.main}>
      <Header />
      {/* Z-02 pkt 3 / Z-W8: okruszek przez hub (BreadcrumbList 3 poziomy jak pozostałe narzędzia). */}
      <Breadcrumbs pl="Sprawdź widoczność w AI" en="AI Visibility Check" parent={RODZIC_HUBA} />

      <section className={st.hero} style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1.25rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {en ? 'Free check' : 'Bezpłatne sprawdzenie'}
            </div>
            {/* Z-W1: H1 = title (fraza „Widoczność w AI”), dawne pytanie zostaje w nagłówku. */}
            <h1 style={s.h1}>
              {en ? 'AI visibility check: does ChatGPT recommend your business?' : 'Widoczność w AI: sprawdź, czy ChatGPT poleca Twoją firmę'}
            </h1>
            {/* Z-W2: lead 2 zdania; lista silników ze stałej (Grok dopisze się sam). */}
            <p className={st.lead} style={{ ...s.lead, margin: '0 auto' }}>
              {en
                ? `We check whether ${listaSilnikow('en')} name your business when a customer asks three typical questions. Results within 2 minutes, no sign-up.`
                : `Sprawdzimy, czy ${listaSilnikow('pl')} wymieniają Twoją firmę, gdy klient zadaje trzy typowe pytania. Wynik zobaczysz w ciągu 2 minut, bez rejestracji.`}
            </p>
          </Reveal>

          <WidocznoscAiClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? `You check AI visibility by asking the AI assistants the questions your customers ask and counting how many answers name your business. Our checker does it for free: ${W.pytan} questions, ${W.silnikow} engines (${listaSilnikow('en')}), a 0-100 score within 2 minutes. One check is a sample, so compare the results of several checks.`
                : `Widoczność w AI sprawdzisz, zadając asystentom AI pytania, które zadają Twoi klienci, i licząc, w ilu odpowiedziach pada nazwa Twojej firmy. Nasza sprawdzarka robi to za darmo: ${W.pytan} pytania, ${W.silnikow} silników (${listaSilnikow('pl')}), ocena 0-100 w ciągu 2 minut. Jedno sprawdzenie to próbka, więc porównuj wyniki z kilku sprawdzeń.`}
            </AnswerBox>
          </div>

          {/* Oferta (Z-W10): link do strony audytu widoczności w AI, cena ze stałej CENY. */}
          <div style={{ ...card, marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>
              {en
                ? 'Want to know how to change that? In the audit we check 30 questions in ChatGPT, Perplexity, Gemini and Google, and show you who the models recommend instead of you and which sites they rely on.'
                : 'Chcesz wiedzieć, jak to zmienić? W audycie sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google, pokazujemy, kogo modele polecają zamiast Ciebie i z jakich stron korzystają.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={HREF_AUDYT} className="btn btn-primary" data-cta="ai_check_offer">{en ? `AI visibility audit: ${AUDYT_EUR} net` : `Audyt widoczności w AI: ${AUDYT_PLN} netto`}</Link>
              <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="ai_check_demo">{en ? 'See the panel demo' : 'Zobacz demo panelu'}</a>
            </div>
          </div>
          {/* LW1 (PLAN-v2 6.0): autor i data = LASTMOD strony (lib/lastmod.js). Z-01 pkt 5: pod ofertą. */}
          <Byline sciezka={SCIEZKA} takzeEn style={{ margin: '1rem 0 0' }} />

          {/* Z-W5 + Z-W9 (decyzja właściciela): granica „od razu / po e-mailu” zgodna z podglądem panelu. */}
          <CoDostajesz
            locale={locale}
            id="ac-za-darmo"
            tytulOdRazu={en ? 'Right away, with no sign-up' : 'Od razu, bez rejestracji'}
            odRazu={en ? [
              'A score from 0 to 100, which is the share of answers that name your business.',
              `A “named / not named” grid for every engine and each of the ${W.pytan} questions, plus the questions themselves (with the one built from your website marked).`,
              `The ${W.przedBramka.firm} businesses the models name most often and the ${W.przedBramka.domen} most cited sites, with the number of mentions.`,
              'If your business name is made only of generic words, the result tells you right away how we count mentions.',
            ] : [
              'Ocenę od 0 do 100, czyli odsetek odpowiedzi, w których pada Twoja firma.',
              `Siatkę „wymieniona / niewymieniona” dla każdego silnika i każdego z ${W.pytan} pytań oraz treść pytań (z oznaczeniem pytania ułożonego z Twojej strony).`,
              `${W.przedBramka.firm} firm, które modele wymieniają najczęściej, i ${W.przedBramka.domen} najczęściej cytowanych stron, z liczbą wzmianek.`,
              'Gdy nazwa firmy składa się z samych ogólnych słów, wynik od razu mówi, jak liczymy wzmianki.',
            ]}
            poEmailu={en ? [
              'The full answers (up to 1,500 characters each) with the excerpt that names your business.',
              'The sources of each answer.',
              'All businesses the models name (up to 10) and all sites they rely on (up to 12).',
              'The same result in your inbox.',
            ] : [
              'Pełne odpowiedzi (do 1 500 znaków każda) z fragmentem, w którym pada Twoja firma.',
              'Źródła każdej odpowiedzi.',
              'Wszystkie firmy, które modele wymieniają (do 10), i wszystkie strony, z których korzystają (do 12).',
              'Ten sam wynik na Twoją skrzynkę.',
            ]}
          >
            <p style={s.akapit}>
              <strong>{en ? 'What to do with it: ' : 'Co z tym zrobić: '}</strong>
              {en
                ? 'the sites on the sources list are where a mention is worth having. The businesses on the list are your competitors in AI answers, even if you do not see them in Google.'
                : 'strony z listy źródeł to miejsca, w których warto mieć wzmiankę. Firmy z listy to Twoja konkurencja w odpowiedziach AI, nawet jeśli nie widzisz ich w Google.'}
            </p>
            <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
              <ZrzutWyniku
                {...(en ? ZRZUT.en : ZRZUT.pl)}
                sizes="(max-width: 700px) 100vw, 640px"
                alt={en
                  ? 'AI visibility checker: an example answer grid for ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews, with the businesses the models name and the sites they cite most often'
                  : 'Sprawdzarka widoczności w AI: przykładowa siatka odpowiedzi ChatGPT, Gemini, Perplexity, Claude i przeglądu AI w Google z firmami, które modele wymieniają, i stronami, które cytują najczęściej'}
                podpis={en
                  ? 'An example result using demo data: the business “Example”, the competitors and the cited sites are made up, not a real business’s result. It shows what you get right away; the full answers and the sources of each answer appear after you enter your email. Screenshot from November 12, 2026.'
                  : 'Przykładowy wynik na danych demonstracyjnych: firma „Przykład”, konkurenci i cytowane strony są zmyślone, to nie wynik prawdziwej firmy. Widać to, co dostajesz od razu; pełne odpowiedzi i źródła każdej odpowiedzi pokazujemy po podaniu e-maila. Zrzut z 12.11.2026.'}
              />
            </div>
          </CoDostajesz>

          <Sekcja id="ac-jak" tytul={en ? 'How the AI visibility checker works' : 'Jak działa sprawdzarka widoczności w AI'}>
            <ol style={kartaListy}>
              {kroki.map(([h, p]) => (
                <li key={h}><strong style={{ color: 'var(--color-text-dark)' }}>{h}.</strong> {p}</li>
              ))}
            </ol>
          </Sekcja>

          {/* Z-W6: metoda i ograniczenia (bez nazw konkurentów). */}
          <Sekcja id="ac-metoda" tytul={en ? 'How our checker is different' : 'Czym różni się nasza sprawdzarka'}>
            <p style={s.akapit}>
              {en
                ? 'AI visibility tools measure three different things. Our checker asks questions live, the way a customer would, and shows the answer in which your business is or is not named.'
                : 'Narzędzia do widoczności w AI mierzą trzy różne rzeczy. Nasza sprawdzarka zadaje pytania na żywo, tak jak klient, i pokazuje odpowiedź, w której pada albo nie pada nazwa Twojej firmy.'}
            </p>
            <CompareTable id="ac-tabela-metod" caption={tabela.caption} columns={tabela.columns} rows={tabela.rows} />
            <h3 id={en ? 'limits' : 'ograniczenia'} style={{ ...s.h3, marginTop: 0 }}>{en ? 'Limits' : 'Ograniczenia'}</h3>
            <ul style={s.lista}>
              {(en ? OGRANICZENIA_EN : OGRANICZENIA).map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Sekcja>

          <Sekcja id="ac-wynik" tytul={en ? 'How to read the result' : 'Jak czytać wynik'}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
              {wynik.map(([h, p]) => (
                <div key={h} style={{ ...card, padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p}</p>
                </div>
              ))}
            </div>
          </Sekcja>

          <Sekcja id="ac-co-dalej" tytul={en ? 'What to do when ChatGPT does not recommend your business' : 'Co zrobić, gdy ChatGPT nie poleca Twojej firmy'}>
            <ul style={{ ...kartaListy, gap: '0.85rem' }}>
              {en ? (
                <>
                  <li>Complete your Google Business Profile and collect reviews after every job, because that is the foundation of <Link href="/seo-lokalne-warszawa" style={s.podkreslenie}>local SEO</Link>. We describe the process step by step in the guide on <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={s.podkreslenie}>how to get Google reviews</Link>.</li>
                  <li>Get mentioned in the directories and rankings that the models cite in your industry. The {W.przedBramka.domen} most cited sites are in the result right away; the sources of each answer are in the full result.</li>
                  <li>
                    Describe your services, city and service area on your site in simple sentences that can be quoted without context.
                    {HREF_P2 && <> Such descriptions help both in Google and in model answers: what works in both, we show in the <Link href={HREF_P2} style={s.podkreslenie}>SEO vs GEO</Link> comparison.</>}
                  </li>
                  <li>
                    Check that your robots.txt file does not block the OAI-SearchBot and PerplexityBot crawlers. Blocking them excludes your site from those tools’ citations.
                    {HREF_N1 && <> AI bot access to your site is also checked by our free <Link href={HREF_N1} style={s.podkreslenie}>llms.txt generator</Link>.</>}
                  </li>
                  <li>Measure changes regularly. In <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>AI search optimization</Link> we check 30 questions in ChatGPT, Perplexity, Gemini and Google every week, and you can see the result in the <Link href="/panel-klienta" style={s.podkreslenie}>client portal</Link>.</li>
                </>
              ) : (
                <>
                  {/* LW1, link 26 (on-page-seo RAPORT rozdz. 4): dopisek o SEO lokalnym. */}
                  <li>Uzupełnij wizytówkę Google i zbieraj opinie po każdej usłudze, bo to podstawa <Link href="/seo-lokalne-warszawa" style={s.podkreslenie}>SEO lokalnego</Link>. Proces krok po kroku opisujemy w poradniku <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={s.podkreslenie}>jak pozyskiwać opinie Google</Link>.</li>
                  <li>Zadbaj o wzmianki w katalogach i zestawieniach, które modele cytują w Twojej branży. {W.przedBramka.domen} najczęściej cytowanych stron widzisz w wyniku od razu, a źródła każdej odpowiedzi w pełnym wyniku.</li>
                  <li>
                    Opisz na stronie usługi, miasto i obszar działania prostymi zdaniami, które da się zacytować bez kontekstu.
                    {HREF_P2 && <> Takie opisy pomagają i w Google, i w odpowiedziach modeli: co działa w obu, pokazujemy w porównaniu <Link href={HREF_P2} style={s.podkreslenie}>SEO a GEO</Link>.</>}
                  </li>
                  <li>
                    Sprawdź, czy plik robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot. Blokada wyklucza stronę z cytowań tych narzędzi.
                    {HREF_N1 && <> Dostęp botów AI do strony sprawdza też nasz bezpłatny <Link href={HREF_N1} style={s.podkreslenie}>generator llms.txt</Link>.</>}
                  </li>
                  <li>Mierz zmiany regularnie. W <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>pozycjonowaniu w AI</Link> sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google co tydzień, a wynik widać w <Link href="/panel-klienta" style={s.podkreslenie}>panelu klienta</Link>.</li>
                </>
              )}
            </ul>
          </Sekcja>

          {/* Źródła z datą: model i dostawca każdego silnika według panelu (lib/dataforseo.ts MODELS,
              lib/narzedzia/widocznosc.ts), przebieg kontrolny z raportu aplikacje/widocznosc §3. */}
          <Sekcja id="ac-zrodla" tytul={en ? 'Sources and method status' : 'Źródła i stan metody'}>
            <ul style={s.lista}>
              {en ? (
                <>
                  <li>Method as of 12 November 2026, described from the checker’s code: ChatGPT (gpt-4.1-mini), Gemini (gemini-2.5-flash) and Perplexity (sonar) through the DataForSEO API, Claude through the Anthropic API with its web search tool, and AI Overviews from Google results for Poland (DataForSEO). The ChatGPT and Gemini apps your customers use may run newer models.</li>
                  <li>Control run on 11 November 2026: for the same business, Gemini with Google Search named it in 3 of 3 answers, while earlier that day, without web search, it named it in 0 of 3. That is why Gemini now asks with web search.</li>
                  <li>Microsoft Copilot: no public API for querying its answers (as of 12 November 2026).</li>
                  <li>Data retention: 60 days; data recipients are listed in the FAQ below.</li>
                </>
              ) : (
                <>
                  <li>Metoda według kodu sprawdzarki, stan z 12.11.2026: ChatGPT (gpt-4.1-mini), Gemini (gemini-2.5-flash) i Perplexity (sonar) odpytujemy przez API DataForSEO, Claude przez API Anthropic z narzędziem wyszukiwania w sieci, a przegląd AI odczytujemy z wyników Google dla Polski (DataForSEO). Aplikacje ChatGPT i Gemini, z których korzystają klienci, mogą używać nowszych modeli.</li>
                  <li>Przebieg kontrolny 11.11.2026: tę samą firmę Gemini z wyszukiwaniem Google wymienił w 3 z 3 odpowiedzi, a wcześniej tego dnia, bez wyszukiwania, w 0 z 3. Dlatego Gemini pyta teraz z wyszukiwaniem.</li>
                  <li>Microsoft Copilot: brak publicznego API do odpytywania odpowiedzi (stan 12.11.2026).</li>
                  <li>Przechowywanie danych: 60 dni; odbiorców danych wymieniamy w pytaniach niżej.</li>
                </>
              )}
            </ul>
          </Sekcja>

          {/* Z-03, Z-02: poradniki i wszystkie darmowe narzędzia z hubem. */}
          <Poradniki narzedzie={SCIEZKA} locale={locale} />
          <PozostaleNarzedzia bez={SCIEZKA} locale={locale} />
        </div>
      </section>
      <AppleFaq faqData={en ? FAQ_EN : FAQ} title={en ? 'Questions about AI visibility' : 'Pytania o widoczność w AI'} />
      {/* A3b (BL-02): formularz kontaktowy, jak GeoPageClient.jsx. Wcześniej „Wyceń projekt”
          (#kontakt) w nagłówku i stopce nie miał tu celu i wyprowadzał na stronę główną. */}
      <Contact />
      {/* Z-W4 pkt 7, Z-05: opis z listy silników (mianownik), featureList zgodny z treścią strony. */}
      {en ? (
        <WebAppSchema
          name="AI visibility checker"
          description={`Free AI visibility audit: it checks whether ${listaSilnikow('en')} name your business when asked three questions your customers ask in your industry.`}
          url="https://www.ai-seo-company.pl/en/ai-visibility-check"
          language="en"
          screenshot={{ url: ZRZUT.en.src, width: ZRZUT.en.width, height: ZRZUT.en.height }}
          featureList={[
            '3 customer questions: 2 from your industry and city, 1 from your website',
            `${SZUKAJA[1]} with web search`,
            ...(W.geminiZWyszukiwaniem ? [] : ['Gemini (model knowledge)']),
            ...(W.grok ? ['Grok (model knowledge)'] : []),
            'Google AI Overviews',
            'A 0-100 score and an answer grid',
            `The ${W.przedBramka.firm} most named businesses and ${W.przedBramka.domen} most cited sites without email`,
          ]}
        />
      ) : (
        <WebAppSchema
          name="Sprawdzarka widoczności w AI"
          description={`Bezpłatny audyt widoczności w AI: sprawdza, czy ${listaSilnikow('pl')} wymieniają Twoją firmę w odpowiedziach na trzy pytania klientów z Twojej branży.`}
          url="https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai"
          screenshot={{ url: ZRZUT.pl.src, width: ZRZUT.pl.width, height: ZRZUT.pl.height }}
          featureList={[
            '3 pytania klientów: 2 z branży i miasta, 1 z treści Twojej strony',
            `${SZUKAJA[0]} z wyszukiwaniem w sieci`,
            ...(W.geminiZWyszukiwaniem ? [] : ['Gemini (z wiedzy modelu)']),
            ...(W.grok ? ['Grok (z wiedzy modelu)'] : []),
            'Przegląd AI w Google',
            'Ocena 0-100 i siatka odpowiedzi',
            `${W.przedBramka.firm} najczęściej wymienianych firm i ${W.przedBramka.domen} cytowanych stron bez e-maila`,
          ]}
        />
      )}
      <Footer />
    </main>
  );
}
