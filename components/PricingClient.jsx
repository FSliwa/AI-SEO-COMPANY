'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { useLocale } from 'next-intl';
import EntryOffer from '@/components/EntryOffer';
import FairDeal from '@/components/FairDeal';
import { hash } from '@/lib/anchors';
import Byline from '@/components/Byline';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';

// 5.11.2026 (C2; PLAN-v2 6.18, OP-01, OP-04, MSA-18, CB-04, AV-12) - strona chroniona (strażnik fraz):
// tylko DODAWANIE treści w wersji PL. Title, meta, H1 i istniejące zdania bez zmian; nowe pytania FAQ
// mają tylkoPl: true i nie trafiają do /en/seo-pricing (EN zostaje 12 pytań, PL 14).
// Linki do stron z rejestru publikacji (P1, A6) idą przez hrefJesliOpublikowana(): przed publikacją
// celu zdanie z linkiem po prostu się nie renderuje (reguła 6.0: bez linku do 404).
const HREF_P1 = hrefJesliOpublikowana('/porownania/pozycjonowanie-za-efekt-czy-abonament');
const HREF_A6 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/cennik');
// Audyt 3 (BR-04): link kontekstowy do porównania agencji z freelancerem (po publikacji strony).
const HREF_FREELANCER = hrefJesliOpublikowana('/porownania/agencja-seo-czy-freelancer');

export default function PricingClient() {
  const lang = useLocale();
  const [typStrony, setTypStrony] = useState('lokalna');
  const [zasieg, setZasieg] = useState('lokalny');
  const [widocznoscAi, setWidocznoscAi] = useState('ai');

  const rekomendacja = (() => {
    if (typStrony === 'nowa-strona') {
      return {
        plan: 'booster',
        nazwa: 'Booster Pack',
        cena: lang === 'pl' ? '2 500 zł netto / mies.' : '€590 net / month',
        warunek: lang === 'pl' ? 'Umowa min. 3 miesiące - budowa strony Next.js 0 zł na start' : 'Min. 3-month contract - Next.js website €0 upfront',
        punkty: lang === 'pl'
          ? [
              'Projekt UX/UI i szybka strona w Next.js w cenie abonamentu',
              'Architektura adresów URL i dane strukturalne gotowe od 1. dnia',
              'Pełne pozycjonowanie lokalne i ogólnopolskie + panel klienta 24/7',
            ]
          : [
              'UX/UI design and high-speed Next.js website included in retainer',
              'Search-ready URL architecture and structured data from day one',
              'Full Google SEO campaign + 24/7 live client portal access',
            ],
      };
    }
    if (typStrony === 'sklep' && zasieg === 'zagranica') {
      return {
        plan: 'custom',
        nazwa: lang === 'pl' ? 'SEO E-commerce / International' : 'E-commerce / International SEO',
        cena: lang === 'pl' ? 'od 2 500 zł netto / mies.' : 'from €590 net / month',
        warunek: lang === 'pl' ? 'Elastyczna umowa miesięczna - zakres wg liczby kategorii i rynków' : 'Monthly rolling contract - scoped by category count and target markets',
        punkty: lang === 'pl'
          ? [
              'Optymalizacja drzewa kategorii, filtrów fasetowych i indeksacji',
              'Dane strukturalne Product, hreflang oraz audyt Core Web Vitals',
              'Link building na rynkach docelowych + widoczność w ChatGPT i Google AI',
            ]
          : [
              'Category tree, faceted navigation and crawl budget optimization',
              'Product structured data, hreflang setup and Core Web Vitals fixes',
              'Editorial link building across target markets + AI search tracking',
            ],
      };
    }
    if (typStrony === 'lokalna' && zasieg === 'lokalny' && widocznoscAi === 'google') {
      return {
        plan: 'standard',
        nazwa: 'SEO Standard',
        cena: lang === 'pl' ? '1 900 zł netto / mies.' : '€450 net / month',
        warunek: lang === 'pl' ? 'Umowa miesięczna bez okresu wiązania - cel TOP 3 fraz lokalnych' : 'Flexible monthly subscription - local TOP 3 visibility goal',
        punkty: lang === 'pl'
          ? [
              'Do 20 fraz kluczowych + pełna obsługa Wizytówki Google w cenie',
              'Audyt techniczny na starcie, 2 treści SEO i 2 linki B2B miesięcznie',
              'Codzienny podgląd kliknięć z GSC i zapytań w panelu klienta',
            ]
          : [
              'Up to 20 target keywords + Google Business Profile included',
              'Technical SEO audit, 2 SEO content pieces and 2 editorial links/mo',
              'Daily GSC clicks, rankings and lead tracking in the client portal',
            ],
      };
    }
    return {
      plan: 'premium',
      nazwa: 'SEO Premium',
      cena: lang === 'pl' ? '2 500 zł netto / mies.' : '€590 net / month',
      warunek: lang === 'pl'
        ? (typStrony === 'lokalna' && zasieg === 'lokalny'
            ? 'Umowa miesięczna - zawiera monitoring AI (lub SEO Standard + dodatek AI: 2 390 zł netto/mies.)'
            : 'Umowa miesięczna bez kar - pełna skala pod B2B, e-commerce i AI (GEO)')
        : 'Flexible monthly subscription - full scale for B2B, e-commerce & AI search (GEO)',
      punkty: lang === 'pl'
        ? [
            'Do 50 fraz kluczowych, 4 rozbudowane treści i 4 linki B2B miesięcznie',
            'Wdrożenie poprawek Core Web Vitals oraz optymalizacja konwersji (CRO)',
            'Cotygodniowy pomiar i działania pod widoczność w ChatGPT, Gemini i Google AI',
          ]
        : [
            'Up to 50 target keywords, 4 content pieces and 4 B2B links/month',
            'Core Web Vitals implementation and conversion rate optimization (CRO)',
            'Weekly tracking and optimization for ChatGPT, Gemini and Google AI',
          ],
    };
  })();

  const wybierzRekomendacje = (e) => {
    e.preventDefault();
    track('pricing_matcher_select', {
      plan: rekomendacja.plan,
      site_type: typStrony,
      reach: zasieg,
      ai_mode: widocznoscAi,
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: rekomendacja.plan }));
      const celId = lang === 'pl' ? 'kontakt' : 'contact';
      const el = document.getElementById(celId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqData = [
    {
      question: 'Ile kosztuje pozycjonowanie?',
      questionEn: 'How much does SEO cost?',
      answer: 'U nas pozycjonowanie kosztuje od 1 900 zł netto miesięcznie. Cena pozycjonowania zależy od wielkości serwisu, konkurencyjności branży oraz aktualnego stanu technicznego strony. W AI SEO COMPANY nasze pakiety zaczynają się od transparentnych kwot, oferując pełną optymalizację SEO, dedykowaną strategię content marketingu oraz jakościowy link building, bez ukrytych kosztów. Przeczytaj więcej w naszym szczegółowym poradniku: <a href="/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026" style="text-decoration:underline">analiza rynkowych stawek 17 agencji SEO i modeli rozliczeń</a>.',
      answerEn: 'The cost of SEO depends on the size of the website, industry competitiveness, and the current technical state of the site. At AI SEO COMPANY, our packages start at transparent rates, offering full SEO optimization, a dedicated content marketing strategy, and quality link building with no hidden costs. Read more in our detailed guide: <a href="/en/blog/how-much-does-seo-cost-pricing-packages-2026" style="text-decoration:underline">our breakdown of agency rate models and cost drivers</a>.'
    },
    {
      question: 'Ile kosztuje pozycjonowanie strony w 2026?',
      questionEn: 'How much does SEO for a website cost in 2026?',
      answer: 'W 2026 roku pozycjonowanie strony w AI SEO COMPANY kosztuje od 1 900 zł netto miesięcznie w pakiecie SEO Standard, a rozszerzony pakiet SEO Premium z optymalizacją konwersji to 2 500 zł netto miesięcznie. W tej samej kwocie 2 500 zł netto/mies. dostępny jest też Booster Pack, który przy umowie na minimum 3 miesiące obejmuje dodatkowo wykonanie nowej strony WWW. Wszystkie ceny są kwotami netto (+23% VAT), bez ukrytych opłat.',
      answerEn: 'In 2026, SEO at AI SEO COMPANY starts at €450 net per month with the SEO Standard package, while the extended SEO Premium package with conversion optimisation costs €590 net per month. For the same €590 net per month, the Booster Pack additionally includes building a brand-new website with a minimum 3-month contract. All prices are net (+23% VAT), with no hidden fees.'
    },
    {
      question: 'Czy muszę podpisywać umowę na dłuższy okres?',
      questionEn: 'Do I have to sign a long-term contract?',
      answer: 'Nie w pakietach SEO Standard i SEO Premium: pracujemy w modelu elastycznej subskrypcji miesięcznej z możliwością rezygnacji w każdej chwili. Wyjątkiem jest Booster Pack z nową stroną WWW - tam umowa trwa minimum 3 miesiące. Umowy wieloletnie z karami za wcześniejsze zakończenie uznajemy za sposób na zatrzymanie klienta, którego nie da się zatrzymać wynikami.',
      answerEn: 'Not for SEO Standard and SEO Premium: we work on a flexible monthly subscription that you can cancel at any time. The exception is the Booster Pack with a new website, which has a minimum 3-month contract. Multi-year contracts with early-termination penalties are, in our view, a way of holding on to a client that results alone cannot hold.'
    },
    {
      question: 'Czy audyt SEO jest wliczony w cenę pakietu?',
      questionEn: 'Is the SEO audit included in the package price?',
      answer: 'Tak. Każdy pakiet zawiera profesjonalny audyt techniczny, tworzenie unikalnych treści, strategię link buildingu B2B oraz optymalizację techniczną. Audyt nie jest osobno płatnym dodatkiem - bez niego nie wiedzielibyśmy, od czego zacząć.',
      answerEn: 'Yes. Every package includes a professional technical audit, original content production, a B2B link building strategy and technical optimisation. The audit is not a paid add-on - without it we would not know where to start.'
    },
    {
      question: 'Czy SEO lokalne i wizytówka Google są dodatkowo płatne?',
      questionEn: 'Are local SEO and the Google Business Profile charged separately?',
      answer: 'Nie. SEO lokalne oraz optymalizacja Profilu Firmy w Google są w cenie każdego pakietu. Dla firm usługowych działających w konkretnym mieście to zwykle najszybsze źródło pierwszych zapytań, więc traktujemy je jako element bazowy, a nie opcję. Zakres prac lokalnych opisujemy na stronie <a href="/seo-lokalne-warszawa" style="text-decoration:underline">SEO lokalne w Warszawie</a>.',
      answerEn: 'No. Local SEO and Google Business Profile optimisation are included in every package. For service businesses operating in a specific city this is usually the fastest source of first enquiries, so we treat it as a baseline element rather than an option.'
    },
    {
      question: 'Jak często dostaję raport z postępów?',
      questionEn: 'How often do I receive a progress report?',
      answer: 'Dane widzisz codziennie w panelu klienta: kliknięcia i wyświetlenia z Google Search Console, pozycje fraz tydzień po tygodniu, zapytania z formularza, telefonu i e-maila oraz dziennik naszych prac. Raz w miesiącu dostajesz raport pozycji i ruchu z wnioskami. Dostęp do Google Search Console i Analytics pozostaje po Twojej stronie. <a href="https://panel.ai-seo-company.pl/demo?utm_source=strona&utm_medium=referral&utm_campaign=panel_demo" style="text-decoration:underline">Zobacz demo panelu bez logowania</a>.',
      answerEn: 'You see the data every day in the client portal: clicks and impressions from Google Search Console, keyword positions week by week, form, phone and email enquiries, and a log of our work. Once a month you also get a rankings and traffic report with conclusions. Access to Google Search Console and Analytics stays on your side. <a href="https://panel.ai-seo-company.pl/demo?utm_source=strona&utm_medium=referral&utm_campaign=panel_demo" style="text-decoration:underline">Open the portal demo, no login</a>.'
    },
    {
      question: 'Od czego zależy, ile zapłacę za pozycjonowanie?',
      questionEn: 'What determines how much I pay for SEO?',
      answer: 'O cenie decydują trzy rzeczy: konkurencyjność fraz, na które chcesz się pozycjonować, stan techniczny strony na starcie oraz zakres potrzebnych treści. Domena bez historii w konkurencyjnej branży wymaga więcej pracy niż serwis z ugruntowanym profilem linków. Dlatego wycena zaczyna się od rozmowy o celach, a nie od cennika.',
      answerEn: 'Three things drive the price: how competitive your target phrases are, the technical condition of the site at the start, and how much content is needed. A domain with no history in a competitive niche takes more work than a site with an established link profile. That is why a quote starts with a conversation about goals, not with a price list.'
    },
    {
      // Nowe (C2, OP-01): 45 słów; „pozycjonowanie za efekt” 170/mies. (frazy.csv, 4.11.2026).
      // Link do P1 tylko po jej publikacji (hrefJesliOpublikowana).
      id: 'czy-pozycjonowanie-za-efekt-jest-tansze',
      tylkoPl: true,
      question: 'Czy pozycjonowanie za efekt jest tańsze?',
      answer: 'Nie zawsze. W rozliczeniu za efekt płacisz za frazy, które wejdą do ustalonego przedziału pozycji, więc im lepsze wyniki, tym wyższy rachunek. My pracujemy w miesięcznym abonamencie z jednym celem: TOP 3 dla uzgodnionych fraz lokalnych, na zasadach opisanych w sekcji o <a href="#cel-top-3" style="text-decoration:underline">celu TOP 3</a>.'
        + (HREF_P1 ? ` Oba modele zestawia nasze <a href="${HREF_P1}" style="text-decoration:underline">porównanie: pozycjonowanie za efekt czy abonament</a>.` : ''),
    },
    {
      question: 'Czym różnią się pakiety SEO Standard i SEO Premium?',
      questionEn: 'What is the difference between the SEO Standard and SEO Premium packages?',
      answer: 'Oba pakiety obejmują ten sam fundament: audyt techniczny, treści, link building i SEO lokalne. Różnica leży w skali: Standard obejmuje do 20 fraz, 2 treści i 2 linki miesięcznie, Premium do 50 fraz, 4 treści i 4 linki miesięcznie. Premium ma sens przy szerszym asortymencie usług lub bardziej konkurencyjnej branży; przy jednej usłudze w niszy lokalnej Standard zwykle wystarcza.',
      answerEn: 'Both packages share the same foundation: technical audit, content, link building and local SEO. The difference is scale: Standard covers up to 20 keywords, 2 content pieces and 2 links a month, Premium up to 50 keywords, 4 content pieces and 4 links a month. Premium makes sense for a broader service range or a more competitive niche; for a single service in a local niche, Standard is usually enough.'
    },
    {
      question: 'Ile kosztuje samodzielny audyt SEO albo nowa strona internetowa?',
      questionEn: 'How much is a standalone SEO audit or a new website?',
      answer: '<a href="/audyt-seo" style="text-decoration:underline">Audyt SEO jako samodzielna usługa</a> kosztuje od 1 490 zł netto, a strona internetowa w Next.js od 5 900 zł netto. W pakietach pozycjonowania audyt jest w cenie, a w Booster Pack nowa strona jest w abonamencie od 2 500 zł netto miesięcznie (umowa min. 3 miesiące). Dokładną wycenę większych serwisów dostajesz w 24 h w dni robocze.',
      answerEn: 'A standalone SEO audit starts at €350 net, and a Next.js website at €1,400 net. In the SEO packages the audit is included, and in the Booster Pack the new website is part of the monthly fee from €590 net (minimum 3-month contract). You get an exact quote for larger sites within 24 h on business days.'
    },
    {
      question: 'Ile kosztuje pozycjonowanie w AI (ChatGPT, Google)?',
      questionEn: 'How much does AI search optimization (ChatGPT, Google) cost?',
      answer: 'Audyt widoczności w AI kosztuje 990 zł netto i jest zaliczany na pierwszy miesiąc abonamentu. Pomiar co tydzień i działania pod AI są w cenie SEO Premium, a do SEO Standard można je dodać za 490 zł netto miesięcznie. Wynik widzisz w zakładce Widoczność w AI w panelu klienta. <a href="/pozycjonowanie-w-ai#ile-kosztuje" style="text-decoration:underline">Szczegóły pozycjonowania w AI</a>.'
        // CB-04: kotwica #ile-kosztuje na hubie (sectionId('ileKosztuje', 'pl')); AV-12: link do A6 dopiero po jej publikacji.
        + (HREF_A6 ? ` <a href="${HREF_A6}" style="text-decoration:underline">Ceny pozycjonowania w AI u innych agencji</a>.` : ''),
      answerEn: 'The AI visibility audit costs €235 net and is credited to your first monthly fee. Weekly measurement and AI-focused work are included in SEO Premium and can be added to SEO Standard for €115 net a month. You see the results in the AI visibility tab of the client portal. <a href="/en/ai-search-optimization" style="text-decoration:underline">More about AI search optimization</a>.'
    },
    {
      question: 'Kiedy zobaczę pierwsze efekty pozycjonowania?',
      questionEn: 'When will I see the first SEO results?',
      answer: 'Pierwsze ruchy widoczności pojawiają się zwykle po 4-8 tygodniach, gdy Google przecrawluje wprowadzone poprawki techniczne i nowe treści. Naszym celem jest TOP 3 dla uzgodnionych fraz lokalnych w 2-3 miesiące: postęp widzisz co tydzień w panelu klienta, a jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł (<a href="#cel-top-3" style="text-decoration:underline">zasady celu TOP 3</a>). Nie gwarantujemy pozycji nr 1, bo o kolejności decyduje Google. Pamiętaj: każdy, kto obiecuje Top 3 w miesiąc, sprzedaje Ci ryzyko, a nie usługę.',
      answerEn: 'The first visibility movements usually appear after 4-8 weeks, once Google has re-crawled the technical fixes and new content. Our goal is a Google TOP 3 for agreed local keywords within 2-3 months: you track progress weekly in the client portal, and if we miss the goal after 3 months, the next month is on us (<a href="#cel-top-3" style="text-decoration:underline">TOP 3 goal rules</a>). We do not guarantee the #1 position, because Google decides the order. Remember: anyone promising a Top 3 in a month is selling you risk, not a service.'
    },
    {
      // Nowe (C2, MSA-18): „czy pozycjonowanie się opłaca” 70/mies. (DataForSEO, 4.11.2026), 56 słów.
      // Liczby z /blog/wyniki-wdrozen-seo-2026 (GSC, okresy pomiaru podane przy liczbach, stan na sierpień 2026).
      id: 'czy-pozycjonowanie-sie-oplaca',
      tylkoPl: true,
      question: 'Czy pozycjonowanie się opłaca?',
      answer: 'Opłaca się, gdy klienci szukają Twojej usługi w Google, a strona zamienia wizyty w zapytania. W naszych <a href="/blog/wyniki-wdrozen-seo-2026" style="text-decoration:underline">wdrożeniach z 2026 roku</a> lokalna restauracja zebrała 187 kliknięć w 26 dni, a producent B2B 152 kliknięcia w 92 dni (Google Search Console, dane z 27.07-21.08.2026 i 22.05-21.08.2026). Kliknięcia to jeszcze nie przychód, dlatego opłacalność liczymy zapytaniami widocznymi w panelu klienta.',
    },
    {
      id: 'seo-rates-fees-charges',
      tylkoEn: true,
      question: 'What are typical SEO rates, fees and charges?',
      questionEn: 'What are typical SEO rates, fees and charges?',
      answerEn: 'SEO is charged per month rather than per hour, and our rates are published upfront: €450 net per month for SEO Standard, €590 net per month for SEO Premium, and €590 net per month for the Booster Pack (minimum 3-month contract, new website included), with no onboarding fees or exit charges. Standalone fees are fixed too: a technical SEO audit starts at €350 net and an AI visibility audit is €235 net (credited to your first month if you continue). Check what a quote includes (audit, content, links, reporting) before comparing charges.'
    },
    {
      question: 'Potrzebuję też nowej strony - czy da się to połączyć z pozycjonowaniem?',
      questionEn: 'I also need a new website - can that be combined with SEO?',
      answer: 'Tak. Poza subskrypcją miesięczną oferujemy pakiet łączący pozycjonowanie z wykonaniem strony internetowej. Ma to przewagę porządkową: strona powstaje od razu z architekturą informacji i strukturą adresów przygotowaną pod wyszukiwarkę, więc nie trzeba później migrować URL-i ani przebudowywać nawigacji. Szczegóły w sekcji <a href="/projektowanie-stron-internetowych" style="text-decoration:underline">projektowanie stron internetowych</a>.',
      answerEn: 'Yes. Alongside the monthly subscription we offer a package combining SEO with building the website itself. That has a practical advantage: the site is built from the start with an information architecture and URL structure prepared for search, so there is no need to migrate URLs or rebuild navigation later. See <a href="/en/web-design" style="text-decoration:underline">web design</a> for details.'
    }
  ];
  // FAQPage = pytania widoczne na stronie: PL 14 (bez tylkoEn), EN 13 (bez tylkoPl).
  const faqWidoczne = lang === 'pl' ? faqData.filter((f) => !f.tylkoEn) : faqData.filter((f) => !f.tylkoPl);

  const kartaStyl = {
    background: 'var(--w-karta)',
    border: '1px solid var(--w-linia)',
    borderRadius: '24px',
    boxShadow: 'none',
    padding: 'clamp(1rem, 4.5vw, 3rem)',
    minWidth: 0,
    maxWidth: '100%',
  };

  const h2Styl = {
    fontSize: 'clamp(1.75rem, 1rem + 2vw, 2.5rem)',
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: '-0.035em',
    marginBottom: '1.25rem',
    color: 'var(--w-tusz)',
  };

  const h3Styl = {
    fontSize: '1.35rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    marginBottom: '0.9rem',
    marginTop: '2rem',
    color: 'var(--w-tusz)',
  };

  const pillStyl = (aktywna) => ({
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '40px',
    padding: '0.45rem 0.95rem',
    borderRadius: '999px',
    border: aktywna ? '1.5px solid var(--w-pomarancz)' : '1px solid var(--w-linia)',
    background: aktywna ? 'var(--w-brzoskwinia-tlo)' : 'var(--w-karta)',
    color: aktywna ? 'var(--w-pomarancz-gleboki)' : 'var(--w-tusz)',
    fontSize: '0.9rem',
    fontWeight: aktywna ? 600 : 500,
    cursor: 'pointer',
    transition: 'border-color 0.18s ease, background-color 0.18s ease',
  });

  const wierszeTabeli = lang === 'pl'
    ? [
        {
          typ: 'Lokalna firma usługowa + Wizytówka Google',
          pakiet: 'SEO Standard',
          cena: 'od 1 900 zł netto / mies.',
          zakres: 'Do 20 fraz lokalnych, pełna optymalizacja Profilu Firmy w Google, audyt techniczny, 2 treści SEO i 2 linki/mies., cel TOP 3.',
        },
        {
          typ: 'Firma B2B / SaaS + widoczność w AI (GEO)',
          pakiet: 'SEO Premium',
          cena: '2 500 zł netto / mies.',
          zakres: 'Do 50 fraz, 4 treści eksperckie i 4 linki B2B/mies., wdrożenie Core Web Vitals i CRO, cotygodniowy pomiar w ChatGPT i Google AI.',
        },
        {
          typ: 'Sklep internetowy (pozycjonowanie sklepu internetowego - cennik)',
          pakiet: 'SEO Premium / Wycena indywidualna',
          cena: 'od 2 500 zł netto / mies.',
          zakres: 'Architektura drzewa kategorii i filtrów, dane strukturalne Product, opisy kategorii, link building produktowy (wycena wg skali katalogu).',
        },
        {
          typ: 'Booster Pack (strona WWW 0 zł + SEO)',
          pakiet: 'Booster Pack',
          cena: '2 500 zł netto / mies. (min. 3 mies.)',
          zakres: 'Projekt UX/UI i szybka strona w Next.js w cenie abonamentu + pełne pozycjonowanie i analityka od 1. dnia publikacji.',
        },
        {
          typ: 'Usługi jednorazowe i konsultacje SEO (audyt SEO, audyt widoczności w AI)',
          pakiet: 'Jednorazowo',
          cena: 'audyt SEO od 1 490 zł netto / audyt AI 990 zł netto',
          zakres: 'Lista priorytetów wdrożeniowych dla dewelopera i redakcji; koszt audytu widoczności w AI (990 zł) zaliczany na 1. miesiąc abonamentu.',
        },
      ]
    : [
        {
          typ: 'Local service business + Google Business Profile',
          pakiet: 'SEO Standard',
          cena: 'from €450 net / month',
          zakres: 'Up to 20 local keywords, full Google Business Profile management, technical audit, 2 SEO articles and 2 links/mo, local TOP 3 goal.',
        },
        {
          typ: 'B2B / SaaS company + AI search visibility (GEO)',
          pakiet: 'SEO Premium',
          cena: '€590 net / month',
          zakres: 'Up to 50 keywords, 4 expert content pieces and 4 B2B links/mo, Core Web Vitals fixes, CRO, weekly ChatGPT and Google AI tracking.',
        },
        {
          typ: 'Online store (e-commerce SEO pricing)',
          pakiet: 'SEO Premium / Custom scope',
          cena: 'from €590 net / month',
          zakres: 'Category tree and faceted navigation optimization, Product schema, category copy and editorial links (scoped by catalog size).',
        },
        {
          typ: 'Booster Pack (new website €0 upfront + SEO)',
          pakiet: 'Booster Pack',
          cena: '€590 net / month (min. 3 months)',
          zakres: 'UX/UI design and high-speed Next.js website included in the monthly retainer + full search optimization from day one.',
        },
        {
          typ: 'One-off services & SEO consultations (SEO audit, AI visibility audit)',
          pakiet: 'One-off',
          cena: 'SEO audit from €350 net / AI audit €235 net',
          zakres: 'Prioritized technical and content roadmap for your team; AI visibility audit fee (€235) credited toward your first monthly retainer.',
        },
      ];

  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Cennik Pozycjonowania" en="SEO Pricing" />
      
      {/* Hero Banner */}
      <section className="sekcja-po-okruszkach" style={{ position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', justifyContent: 'center', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {lang === 'pl' ? 'Cennik SEO. Jawny. Bez ściemy.' : 'TRANSPARENT PRICING'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', 
              fontWeight: 500, 
              lineHeight: 1.06, 
              color: 'var(--w-tusz)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              {lang === 'pl' ? 'Ile kosztuje pozycjonowanie?' : 'How Much Does SEO Cost?'} <br />
              <span style={{ color: 'var(--w-pomarancz-tekst)' }}>{lang === 'pl' ? 'Cennik pozycjonowania stron 2026' : 'SEO Pricing 2026'}</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.2rem', color: 'var(--w-tusz-2)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
              {lang === 'pl' 
                ? 'Pozycjonowanie od 1 900 zł netto/mies. (SEO Standard) lub 2 500 zł netto/mies. (SEO Premium z CRO albo Booster Pack z nową stroną WWW). Umowa na miesiąc w SEO Standard i Premium (Booster Pack: min. 3 miesiące), bez ukrytych opłat - poniżej pełny cennik pozycjonowania stron 2026.' 
                : 'Discover our SEO Pricing 2026. No hidden fees or complicated contracts. Check our packages and costs and pay for measurable search visibility growth.'}
            </p>
            {/* Przycisk i telefon w hero: 59% kliknięć z Google Ads trafia na ten landing,
                a pierwszy przycisk był wcześniej na 4. ekranie telefonu (pomiar 24.09.2026). */}
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={hash('kontakt', lang)} className="hero-btn-primary" data-cta="service_hero_cennik">
                {lang === 'pl' ? 'Zamów wycenę - odpowiedź w\u00a024\u00a0h' : 'Get a quote - reply within 24\u00a0h'}
              </a>
              <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="service_hero_cennik_tel">
                {lang === 'pl' ? 'Zadzwoń: 518 815 055' : 'Call: +48 518 815 055'}
              </a>
            </div>
            {/* OP-14: autor i data (LASTMOD) pod leadem; na /en Byline nic nie renderuje. */}
            <Byline sciezka="/cennik-pozycjonowania" style={{ margin: '2rem auto 0', order: 6 }} />
          </Reveal>
        </div>
      </section>

      {/* Cennik zaraz pod hero: wcześniej karty pakietów były dopiero na 4,4
          ekranu telefonu, pod blokiem tekstu. Tekst został, tylko niżej. */}
      {/* Oferta wejsciowa tylko dla ruchu z reklam i tylko po wlaczeniu
          NEXT_PUBLIC_ENTRY_OFFER=audyt - patrz components/EntryOffer.jsx. */}
      <EntryOffer />

      <Pricing isMainContent={true} />

      {/* Interaktywny dobór pakietu w 15 sekund (Wariant C - karta robocza bez fałszywego hover-liftu) */}
      <section className="sekcja-kompakt" aria-labelledby="dobor-pakietu-naglowek">
        <div className="container" style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal>
            <div className="w-karta w-karta--konwersja" style={kartaStyl}>
              <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.76rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.55rem' }}>
                {lang === 'pl' ? 'KONFIGURATOR PAKIETU' : 'PACKAGE MATCHER'}
              </div>
              <h2 id="dobor-pakietu-naglowek" style={{ ...h2Styl, marginBottom: '0.5rem' }}>
                {lang === 'pl' ? 'Szybki dobór pakietu i wycena w 15 sekund' : '15-second package & quote matcher'}
              </h2>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'var(--w-tusz-2)', marginBottom: '1.75rem', maxWidth: '64ch' }}>
                {lang === 'pl'
                  ? 'Zaznacz 3 parametry swojego serwisu, aby sprawdzić rekomendowany pakiet, dokładną stawkę miesięczną netto i miesięczny zakres prac.'
                  : 'Select 3 parameters for your website to see the recommended package, exact monthly net fee and monthly deliverables.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--w-tusz-2)', marginBottom: '0.55rem' }}>
                      {lang === 'pl' ? '1. Typ strony' : '1. Website type'}
                    </div>
                    <div role="group" aria-label={lang === 'pl' ? 'Typ strony' : 'Website type'} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {[
                        { id: 'lokalna', pl: 'Lokalna firma usługowa', en: 'Local service business' },
                        { id: 'b2b', pl: 'Firma B2B lub SaaS', en: 'B2B or SaaS company' },
                        { id: 'sklep', pl: 'Sklep internetowy', en: 'Online store (e-commerce)' },
                        { id: 'nowa-strona', pl: 'Potrzebuję nowej strony WWW', en: 'I need a new website' },
                      ].map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          aria-pressed={typStrony === op.id}
                          onClick={() => setTypStrony(op.id)}
                          style={pillStyl(typStrony === op.id)}
                        >
                          {lang === 'pl' ? op.pl : op.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--w-tusz-2)', marginBottom: '0.55rem' }}>
                      {lang === 'pl' ? '2. Zasięg geograficzny' : '2. Geographic reach'}
                    </div>
                    <div role="group" aria-label={lang === 'pl' ? 'Zasięg geograficzny' : 'Geographic reach'} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {[
                        { id: 'lokalny', pl: 'Jedno miasto / region', en: 'Single city / region' },
                        { id: 'polska', pl: 'Cała Polska', en: 'Nationwide' },
                        { id: 'zagranica', pl: 'Rynki zagraniczne', en: 'International markets' },
                      ].map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          aria-pressed={zasieg === op.id}
                          onClick={() => setZasieg(op.id)}
                          style={pillStyl(zasieg === op.id)}
                        >
                          {lang === 'pl' ? op.pl : op.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--w-tusz-2)', marginBottom: '0.55rem' }}>
                      {lang === 'pl' ? '3. Widoczność w AI (ChatGPT, Gemini, Google AI)' : '3. AI search visibility (ChatGPT, Gemini, Google AI)'}
                    </div>
                    <div role="group" aria-label={lang === 'pl' ? 'Widoczność w AI' : 'AI search visibility'} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {[
                        { id: 'google', pl: 'Standardowe SEO w Google', en: 'Google SEO only' },
                        { id: 'ai', pl: 'SEO + widoczność w ChatGPT i AI', en: 'SEO + ChatGPT & AI visibility' },
                      ].map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          aria-pressed={widocznoscAi === op.id}
                          onClick={() => setWidocznoscAi(op.id)}
                          style={pillStyl(widocznoscAi === op.id)}
                        >
                          {lang === 'pl' ? op.pl : op.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Karta rekomendacji (promień wewnętrzny 16px = 24px - 8px) */}
                <div
                  aria-live="polite"
                  style={{
                    background: 'var(--w-papier-2)',
                    border: '1px solid var(--w-linia)',
                    borderRadius: '16px',
                    padding: 'clamp(1.35rem, 2.8vw, 1.85rem)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.35rem' }}>
                    {lang === 'pl' ? 'REKOMENDOWANY PAKIET' : 'RECOMMENDED PACKAGE'}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--w-tusz)', marginBottom: '0.2rem' }}>
                    {rekomendacja.nazwa}
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.35rem' }}>
                    {rekomendacja.cena}
                  </div>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--w-tusz-2)', margin: '0 0 1rem 0' }}>
                    {rekomendacja.warunek}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.35rem 0', display: 'grid', gap: '0.55rem' }}>
                    {rekomendacja.punkty.map((pkt) => (
                      <li key={pkt} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.94rem', lineHeight: 1.5, color: 'var(--w-tusz)' }}>
                        <span aria-hidden="true" style={{ color: 'var(--w-wzrost)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                        <span>{pkt}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    <a
                      href={hash('kontakt', lang)}
                      data-plan={rekomendacja.plan}
                      data-cta="pricing_matcher_cta"
                      onClick={wybierzRekomendacje}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                    >
                      {lang === 'pl' ? `Wybierz ${rekomendacja.nazwa} i zamów wycenę →` : `Select ${rekomendacja.nazwa} & request quote →`}
                    </a>
                    <Link
                      href="/narzedzia/kalkulator-strat-seo"
                      style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--w-tusz-2)', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      {lang === 'pl' ? 'Oblicz zwrot z inwestycji w kalkulatorze strat SEO' : 'Estimate ROI in the SEO opportunity calculator'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tabela porównawcza cennika według typu strony i usługi */}
      <section className="de-abschnitt" aria-labelledby="tabela-cennika-naglowek">
        <div className="container" style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal>
            <div className="w-karta" style={kartaStyl}>
              <h2 id="tabela-cennika-naglowek" style={h2Styl}>
                {lang === 'pl' ? 'Cennik SEO według typu strony i usługi' : 'SEO pricing by website type and service'}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem', maxWidth: '68ch' }}>
                {lang === 'pl'
                  ? 'Zestawienie stawek miesięcznych netto oraz usług jednorazowych w zależności od modelu biznesowego, wielkości serwisu i zakresu widoczności w Google oraz AI.'
                  : 'Summary of monthly net retainers and standalone fees by business model, website scale, and Google + AI search scope.'}
              </p>
              <div className="tabela-przewijana" style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--w-linia)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px', textAlign: 'left', fontSize: '0.95rem' }}>
                  <caption className="sr-only">
                    {lang === 'pl' ? 'Cennik SEO według typu strony i usługi w 2026 roku' : 'SEO pricing by website type and service in 2026'}
                  </caption>
                  <thead>
                    <tr style={{ background: 'var(--w-papier-2)', borderBottom: '1px solid var(--w-linia)' }}>
                      <th scope="col" style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--w-tusz)', width: '28%' }}>
                        {lang === 'pl' ? 'Typ strony / usługa' : 'Website type / service'}
                      </th>
                      <th scope="col" style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--w-tusz)', width: '18%' }}>
                        {lang === 'pl' ? 'Rekomendowany pakiet' : 'Package'}
                      </th>
                      <th scope="col" style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--w-tusz)', width: '22%' }}>
                        {lang === 'pl' ? 'Koszt netto' : 'Net price'}
                      </th>
                      <th scope="col" style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--w-tusz)' }}>
                        {lang === 'pl' ? 'Co zawiera wycena' : 'Included deliverables'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wierszeTabeli.map((w, idx) => (
                      <tr
                        key={w.typ}
                        style={{
                          borderBottom: idx === wierszeTabeli.length - 1 ? '0' : '1px solid var(--w-linia)',
                          background: 'var(--w-karta)',
                        }}
                      >
                        <th scope="row" style={{ padding: '15px 16px', fontWeight: 600, color: 'var(--w-tusz)', verticalAlign: 'top' }}>
                          {w.typ}
                        </th>
                        <td style={{ padding: '15px 16px', color: 'var(--w-tusz)', fontWeight: 500, verticalAlign: 'top' }}>
                          {w.pakiet}
                        </td>
                        <td style={{ padding: '15px 16px', color: 'var(--w-pomarancz-tekst)', fontWeight: 600, verticalAlign: 'top' }}>
                          {w.cena}
                        </td>
                        <td style={{ padding: '15px 16px', color: 'var(--w-tusz-2)', lineHeight: 1.55, verticalAlign: 'top' }}>
                          {w.zakres}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="de-abschnitt">
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--w-tusz)' }}>
          <Reveal>
            <div className="w-karta" style={kartaStyl}>
              <h2 style={h2Styl}>
                {lang === 'pl' ? 'Co obejmuje nasz cennik pozycjonowania stron?' : 'What does our SEO pricing include?'}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem' }}>
                {lang === 'pl' 
                  ? 'Wybierając pakiety AI SEO COMPANY, inwestujesz w przewidywalny wzrost. Nasz cennik pozycjonowania stron internetowych został skonstruowany tak, aby zaspokoić potrzeby zarówno lokalnych biznesów B2C, jak i ogólnopolskich firm B2B.' 
                  : 'By choosing AI SEO COMPANY packages, you invest in predictable growth. Our website SEO pricing has been designed to meet the needs of both local B2C businesses and nationwide B2B companies.'}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem' }}>
                {lang === 'pl'
                  ? <>Jako nowoczesna agencja marketingowa i SEO, nie ograniczamy się tylko do dodawania linków. Każdy pakiet zawiera audyt techniczny, tworzenie unikalnych treści, strategię link buildingu B2B i optymalizację techniczną w zakresie opisanym przy pakiecie (Standard: podstawowa, Premium: pełna); audyt Core Web Vitals jest w audycie, a wdrożenie poprawek w Premium. Jak wygląda u nas <Link href="/link-building" style={{ textDecoration: 'underline' }}>link building</Link>: 2 linki miesięcznie w Standard i 4 w Premium. Jak powstają teksty, opisujemy na stronie o <Link href="/copywriting-seo" style={{ textDecoration: 'underline' }}>copywritingu SEO</Link>.</>
                  : <>As a modern marketing and SEO agency, we don&apos;t just build links. Every package includes a technical audit, unique content creation, B2B link building strategy and technical optimization within the scope described for that package (Standard: core, Premium: full); the Core Web Vitals audit is part of the audit, and implementing the fixes is part of Premium. How <Link href="/link-building" style={{ textDecoration: 'underline' }}>link building services</Link> work with us: 2 links a month in Standard and 4 in Premium. How the content is written: <Link href="/copywriting-seo" style={{ textDecoration: 'underline' }}>SEO copywriting</Link>.</>}
              </p>
              <h3 style={h3Styl}>
                {lang === 'pl' ? 'Dlaczego transparentne pakiety?' : 'Why transparent packages?'}
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)' }}>
                {lang === 'pl'
                  ? <>Ukryte koszty i umowy na wiele lat to domena przestarzałych firm. Wierzymy, że dobra usługa broni się sama, a jasny i prosty cennik pozycjonowania to podstawa partnerskich relacji i najwyższego zwrotu z inwestycji (ROI).{HREF_FREELANCER && <> Zastanawiasz się, czy zlecić pozycjonowanie agencji, czy freelancerowi? W porównaniu <Link href={HREF_FREELANCER} style={{ textDecoration: 'underline' }}>freelancer SEO czy agencja</Link> zestawiamy koszt miesięczny, godziny pracy i zapisy umowy.</>}</>
                  : <>Hidden costs and multi-year contracts are the domain of outdated companies. We believe a good service defends itself, and clear, simple SEO pricing is the foundation of partnership and the highest ROI. Not sure whether the budget belongs in search or in ads? Our <Link href="/porownania/seo-czy-google-ads" style={{ textDecoration: 'underline' }}>SEO vs SEM</Link> comparison sets the cost per click from our own campaign against the monthly fee, and the <Link href="/narzedzia/kalkulator-strat-seo" style={{ textDecoration: 'underline' }}>SEO ROI calculator</Link> estimates the payback of a package. {HREF_FREELANCER && <> Weighing a freelancer instead of an agency? The <Link href={HREF_FREELANCER} style={{ textDecoration: 'underline' }}>SEO agency vs freelancer</Link> comparison sets monthly cost, hours of work and contract terms side by side.</>} Other decision guides are collected under <Link href="/porownania" style={{ textDecoration: 'underline' }}>SEO comparisons</Link>.</>}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginTop: '1.5rem' }}>
                {lang === 'pl'
                  ? 'Zdajemy sobie sprawę, że każda branża charakteryzuje się odmienną specyfiką, unikalną grupą docelową oraz specyficznym cyklem decyzyjnym. Z tego powodu podchodzimy z ogromną elastycznością do optymalizacji strategii biznesowej naszych Klientów. Decydując się na inwestycję w profesjonalny marketing internetowy w postaci SEO, wybierasz model trwałego budowania kompetencji własnej marki. Wspólnie identyfikujemy kluczowe cele konwersji i obniżamy długofalowy koszt pozyskania leada poprzez precyzyjne dotarcie z ofertą do właściwych konsumentów w najbardziej sprzyjającym momencie ich procesu zakupowego.'
                  : 'We realize that every industry is characterized by its own specific nature, unique target audience, and specific decision-making cycle. For this reason, we approach the optimization of our Clients business strategies with great flexibility. By deciding to invest in professional internet marketing in the form of SEO, you choose a model of lasting brand competency building. Together, we identify key conversion goals and lower the long-term cost of lead acquisition by precisely reaching out with an offer to the right consumers at the most favorable moment of their purchasing process.'}
              </p>
            </div>
          </Reveal>
          {/* CTA w środku strony: między hero a #kontakt były sekcje bez żadnego przycisku. */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="service_mid_cennik_1">
              {lang === 'pl' ? 'Zapytaj o wycenę - odpowiedź w\u00a024\u00a0h' : 'Ask for a quote - reply within 24\u00a0h'}
            </a>
          </div>
        </div>
      </section>

      {/* C2 (OP-01, PLAN-v2 6.18): sekcja cenowa tylko PL, po bloku „Co obejmuje…”, przed FairDeal.
          „pozycjonowanie stron cena” 1 000/mies., „wycena pozycjonowania” 480, „tanie pozycjonowanie
          stron” 170 (DataForSEO i frazy.csv, 4.11.2026). Kwoty i liczby fraz = pakiety z Pricing.jsx
          i FAQ „Czym różnią się pakiety…”. Bez zdań z FAQ i leadu (playbook 5.5). */}
      {lang === 'pl' && (
        <section className="de-abschnitt">
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--w-tusz)' }}>
            <Reveal>
              <div className="w-karta" style={kartaStyl}>
                <h2 style={h2Styl}>
                  Pozycjonowanie stron: cena, koszt i wycena w 2026
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem' }}>
                  <Link href="/pozycjonowanie-stron-internetowych" style={{ textDecoration: 'underline' }}>Pozycjonowanie stron</Link> kosztuje u nas od 1 900 zł netto miesięcznie - pełny cennik pozycjonowania stron WWW (pozycjonowanie cena i pozycjonowanie stron koszt za miesiąc) widzisz w tabeli wyżej. W SEO Standard dostajesz do 20 fraz, czyli średnio 95 zł netto za frazę, a w SEO Premium za 2 500 zł netto do 50 fraz, czyli 50 zł za frazę. Za samo wejście fraz do TOP 10 nie dopłacasz. Zastanawiasz się, czy zamiast tego wybrać reklamy? Sprawdź, <Link href="/blog/agencja-seo-czy-google-ads" style={{ textDecoration: 'underline' }}>agencja SEO czy Google Ads</Link>.
                </p>
                <h3 style={h3Styl}>
                  Tanie pozycjonowanie stron: na czym oszczędzają najtańsze oferty
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem' }}>
                  Najtańsze oferty zwykle oszczędzają na tym, czego nie widać w raporcie: treściach, linkach z serwisów z realnym ruchem i poprawkach technicznych. Zanim porównasz ceny, sprawdź <a href="#uczciwa-umowa" style={{ textDecoration: 'underline' }}>w umowie</a> trzy rzeczy: ile fraz i treści dostajesz co miesiąc, czy konta Google są założone na Twoją firmę i ile trwa wypowiedzenie.
                </p>
                <h3 style={h3Styl}>
                  Wycena pozycjonowania: czego potrzebujemy
                </h3>
                {/* Do potwierdzenia przez Filipa (OP-01): czy te trzy dane wystarczają do wyceny. */}
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)' }}>
                  Do wyceny pozycjonowania wystarczą adres strony, lista usług albo kategorii, które chcesz promować, i obszar działania: miasto (np. <Link href="/seo-lokalne-warszawa" style={{ textDecoration: 'underline' }}>SEO lokalne Warszawa</Link>), region albo cała Polska. Na tej podstawie dobieramy pakiet i liczbę fraz. Jeśli strona ma problemy techniczne, zaczynamy od <Link href="/audyt-seo" style={{ textDecoration: 'underline' }}>audytu SEO</Link>, który w każdym pakiecie jest w cenie (wstępny skan wykonasz też od ręki w <Link href="/narzedzia/audyt-seo" style={{ textDecoration: 'underline' }}>darmowym audycie SEO</Link>).
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {lang !== 'pl' && (
        <section className="de-abschnitt">
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--w-tusz)' }}>
            <Reveal>
              <div className="w-karta" style={kartaStyl}>
                <h2 style={h2Styl}>
                  SEO price per month: rates, fees and packages
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', marginBottom: '1.5rem' }}>
                  Our monthly <Link href="/pozycjonowanie-stron-internetowych" style={{ textDecoration: 'underline' }}>SEO services</Link> start at €450 net per month in SEO Standard (up to 20 keywords, 2 content pieces and 2 editorial links, or €22.50 net per keyword) and €590 net per month in SEO Premium (up to 50 keywords, 4 content pieces and 4 links, or €11.80 net per keyword). The Booster Pack is also €590 net per month on a minimum 3-month contract and includes building a new Next.js website. We charge no onboarding fees, activation charges or extra fees when keywords enter the top 10.
                </p>
                <h3 style={h3Styl}>
                  What to check before comparing SEO rates and quotes
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--w-tusz-2)' }}>
                  Low-fee SEO retainers usually cut what does not show on a summary slide: original content, links from sites with real search traffic and developer-ready technical fixes. Before comparing charges, verify three things <a href="#uczciwa-umowa" style={{ textDecoration: 'underline' }}>in the contract</a>: how many keywords, articles and links are delivered each month, whether Google Search Console and Analytics stay under your company account, and how long the notice period is. Every package starts with a <Link href="/audyt-seo" style={{ textDecoration: 'underline' }}>technical SEO audit</Link> included in the monthly fee.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <FairDeal />

      <AppleFaq faqData={faqWidoczne} title={lang === 'pl' ? "Częste pytania o wycenę" : "Frequently Asked Questions about Pricing"} />
      
      <Contact />
      <Footer />
    </main>
  );
}
