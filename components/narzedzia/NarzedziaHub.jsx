// Hub „Narzędzia i szablony” /narzedzia (PLAN-v2 6.9; brief N1 p. 3; CB-13, CS-03; 5.11.2026).
// Komponent serwerowy (bez hooków). Partia 3 (W9): renderuje go tylko app/[locale]/narzedzia/page.js
// po przejściu bramki publikacji.
// - 4 karty: generator llms.txt i wzór raportu linkują przez hrefJesliOpublikowana (bez linku przed
//   swoją partią), sprawdzarka w stanie „wkrótce” bez linku do T0.2 (SPRAWDZARKA_DZIALA w lib/narzedzia.js),
// - <section id="szablony"> = cel przyszłego 308 /szablony -> /narzedzia#szablony,
// - schema: ItemList (4 × ListItem) + FAQPage (AppleFaq) + BreadcrumbList (Breadcrumbs); bez WebApplication,
// - fraza z autosugestii „narzędzia seo google” (30, PLAN-v2 4.10) 1× w treści.
// 9.11.2026: prop locale ('pl' | 'en'); wersja EN (/en/tools) ma teksty w tym pliku (TEKSTY.en) i w lib/narzedzia.en.js.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefDlaLink } from '@/lib/linkiEn';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, SCIEZKA_HUBA } from '@/lib/narzedzia';
import { H1_HUBA, faqHubaL, kartyHubaL } from '@/lib/narzedzia.en';
import { hrefWJezyku } from '@/lib/linkiEn';
import * as s from './styl';

const TEKSTY = {
  pl: {
    tag: 'Bezpłatnie, bez rejestracji',
    wkrotce: 'Wkrótce',
    odpowiedz: 'Zebraliśmy tu bezpłatne narzędzia i wzory AI SEO COMPANY: generator llms.txt z testem dostępu botów AI, sprawdzarkę, czy ChatGPT poleca Twoją firmę, wzór miesięcznego raportu SEO i checklistę zmiany agencji. Działają bez rejestracji. Generator nie zapisuje wyników, sprawdzarka usuwa dane po 60 dniach, a wzory wysyłamy e-mailem.',
    h2Narzedzia: 'Narzędzia online',
    pNarzedzia: 'Oba narzędzia odpowiadają na pytania, których nie rozstrzygną darmowe narzędzia SEO Google, czyli Search Console i Analytics: czy boty modeli językowych mogą wejść na Twoją stronę i czy ChatGPT wymienia Twoją firmę, gdy klient pyta o usługę w mieście.',
    h2Szablony: 'Szablony i checklisty do pobrania',
    pSzablony: 'Wzory w PDF pomagają sprawdzić pracę agencji: czego wymagać w comiesięcznym raporcie i co odebrać przed wypowiedzeniem umowy. Podajesz tylko adres e-mail, a link do pliku przychodzi w ciągu minuty.',
    h2Dalej: 'Gdy wynik pokaże problem',
    pDalej1: 'Zablokowany bot albo brak firmy w odpowiedziach modeli to sygnał, od którego zaczyna się praca, a nie jej koniec. W usłudze pozycjonowania w AI co tydzień mierzymy obecność firmy w ChatGPT, Perplexity, Gemini i przeglądzie AI Google i pracujemy nad źródłami, z których korzystają modele. Szczegóły i ceny opisujemy na stronie',
    linkGeo: 'pozycjonowanie w AI',
    okruszek: 'Narzędzia',
    faqTytul: 'Pytania o darmowe narzędzia',
  },
  en: {
    tag: 'Free, no sign-up',
    wkrotce: 'Coming soon',
    odpowiedz: 'Here you will find the free tools and templates from AI SEO COMPANY: an llms.txt generator with an AI bot access test, a checker that shows whether ChatGPT recommends your business, a monthly SEO report template and a checklist for switching agencies. They work without registration. The generator does not save results, the checker deletes data after 60 days, and we email the templates.',
    h2Narzedzia: 'Online tools',
    pNarzedzia: 'Both tools answer questions that free Google SEO tools, namely Search Console and Analytics, cannot settle: can language model bots reach your website, and does ChatGPT name your business when a customer asks about a service in your city.',
    h2Szablony: 'Templates and checklists to download',
    pSzablony: 'PDF templates help you assess your agency’s work: what to demand in a monthly report and what to collect before you terminate a contract. You only give an email address, and the link to the file arrives within a minute.',
    h2Dalej: 'When the result shows a problem',
    pDalej1: 'A blocked bot or your business missing from model answers is where the work starts, not where it ends. In our AI search optimization service we measure every week how often your business appears in ChatGPT, Perplexity, Gemini and Google AI Overviews, and we work on the sources the models draw on. Details and prices are on the page',
    linkGeo: 'AI search optimization',
    okruszek: 'Tools',
    faqTytul: 'Questions about the free tools',
  },
};

const wkrotce = {
  display: 'inline-block',
  margin: '0 0 0.6rem',
  padding: '0.2rem 0.65rem',
  borderRadius: '999px',
  background: 'var(--w-papier-2)',
  color: 'var(--w-tusz-2)',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

function Karta({ karta, t, locale }) {
  return (
    <article style={{ ...s.karta, padding: 'clamp(1.25rem, 3vw, 1.75rem)', display: 'flex', flexDirection: 'column' }}>
      {!karta.href && <p style={wkrotce}>{t.wkrotce}</p>}
      {/* Strzałka poza <h3>, żeby nie trafiała do tekstu nagłówka; karta bez linku = bez strzałki (reguła 6.0). */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', margin: '0 0 0.6rem' }}>
        <h3 style={{ ...s.h3, margin: 0 }}>
          {karta.href ? (
            <Link href={hrefDlaLink(karta.href, locale)} data-cta={`narzedzia_${karta.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{karta.nazwa}</Link>
          ) : karta.nazwa}
        </h3>
        {karta.href && <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.2rem' }}>→</span>}
      </div>
      <p style={{ ...s.akapit, margin: 0, fontSize: '1rem' }}>{karta.opis}</p>
    </article>
  );
}

const siatka = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' };

export default function NarzedziaHub({ locale = 'pl' }) {
  const en = locale === 'en';
  const t = TEKSTY[en ? 'en' : 'pl'];
  const H1 = H1_HUBA[en ? 'en' : 'pl'];
  const karty = kartyHubaL(locale);
  const narzedzia = karty.filter((k) => k.sekcja === 'narzedzia');
  const szablony = karty.filter((k) => k.sekcja === 'szablony');
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');

  // ItemList odzwierciedla widoczne karty: karta bez linku („wkrótce”) ma samą nazwę, bez url.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': en ? `${BASE}${hrefWJezyku(SCIEZKA_HUBA, 'en')}#lista` : `${BASE}${SCIEZKA_HUBA}#lista`,
    ...(en ? { inLanguage: 'en' } : {}),
    name: H1,
    numberOfItems: karty.length,
    itemListElement: karty.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.nazwa,
      ...(k.href ? { url: `${BASE}${en ? hrefWJezyku(k.href.split('#')[0], 'en') : k.href.split('#')[0]}` } : {}),
    })),
  };

  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl="Narzędzia" en="Tools" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
            </div>
            <h1 style={s.h1}>{H1}</h1>
          </Reveal>
          <Byline sciezka={SCIEZKA_HUBA} takzeEn style={{ textAlign: 'center' }} />
          <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
            {t.odpowiedz}
          </AnswerBox>

          <section aria-labelledby="narzedzia-online" style={{ marginTop: '3rem' }}>
            <h2 id="narzedzia-online" style={s.h2}>{t.h2Narzedzia}</h2>
            <p style={s.akapit}>
              {t.pNarzedzia}
            </p>
            <div style={siatka}>
              {narzedzia.map((k) => <Karta key={k.id} karta={k} t={t} locale={locale} />)}
            </div>
          </section>

          <section id="szablony" aria-labelledby="szablony-naglowek" style={{ ...s.sekcja, scrollMarginTop: '110px' }}>
            <h2 id="szablony-naglowek" style={s.h2}>{t.h2Szablony}</h2>
            <p style={s.akapit}>
              {t.pSzablony}
            </p>
            <div style={siatka}>
              {szablony.map((k) => <Karta key={k.id} karta={k} t={t} locale={locale} />)}
            </div>
          </section>

          <section aria-labelledby="co-dalej" style={s.sekcja}>
            <h2 id="co-dalej" style={s.h2}>{t.h2Dalej}</h2>
            <p style={s.akapit}>
              {t.pDalej1}{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>{t.linkGeo}</Link> : t.linkGeo}.
            </p>
          </section>
        </div>
      </section>

      <AppleFaq faqData={faqHubaL(locale)} title={t.faqTytul} sectionId="pytania" />
      <Footer />
    </main>
  );
}
