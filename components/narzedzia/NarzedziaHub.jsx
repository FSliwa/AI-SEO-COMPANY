// Hub „Narzędzia i szablony” /narzedzia (PLAN-v2 6.9; brief N1 p. 3; CB-13, CS-03; 5.11.2026).
// Komponent serwerowy (bez hooków). Partia 3 (W9): renderuje go tylko app/[locale]/narzedzia/page.js
// po przejściu bramki publikacji.
// - 4 karty: generator llms.txt i wzór raportu linkują przez hrefJesliOpublikowana (bez linku przed
//   swoją partią), sprawdzarka w stanie „wkrótce” bez linku do T0.2 (SPRAWDZARKA_DZIALA w lib/narzedzia.js),
// - <section id="szablony"> = cel przyszłego 308 /szablony -> /narzedzia#szablony,
// - schema: ItemList (4 × ListItem) + FAQPage (AppleFaq) + BreadcrumbList (Breadcrumbs); bez WebApplication,
// - fraza z autosugestii „narzędzia seo google” (30, PLAN-v2 4.10) 1× w treści.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, SCIEZKA_HUBA, FAQ_HUBA, kartyHuba } from '@/lib/narzedzia';
import * as s from './styl';

const H1 = 'Darmowe narzędzia i szablony SEO i AI';

const wkrotce = {
  display: 'inline-block',
  margin: '0 0 0.6rem',
  padding: '0.2rem 0.65rem',
  borderRadius: '999px',
  background: '#F5F5F7',
  color: '#6E6E73',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

function Karta({ karta }) {
  return (
    <article style={{ ...s.karta, padding: 'clamp(1.25rem, 3vw, 1.75rem)', display: 'flex', flexDirection: 'column' }}>
      {!karta.href && <p style={wkrotce}>Wkrótce</p>}
      {/* Strzałka poza <h3>, żeby nie trafiała do tekstu nagłówka; karta bez linku = bez strzałki (reguła 6.0). */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', margin: '0 0 0.6rem' }}>
        <h3 style={{ ...s.h3, margin: 0 }}>
          {karta.href ? (
            <Link href={karta.href} data-cta={`narzedzia_${karta.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{karta.nazwa}</Link>
          ) : karta.nazwa}
        </h3>
        {karta.href && <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.2rem' }}>→</span>}
      </div>
      <p style={{ ...s.akapit, margin: 0, fontSize: '1rem' }}>{karta.opis}</p>
    </article>
  );
}

const siatka = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' };

export default function NarzedziaHub() {
  const karty = kartyHuba();
  const narzedzia = karty.filter((k) => k.sekcja === 'narzedzia');
  const szablony = karty.filter((k) => k.sekcja === 'szablony');
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');

  // ItemList odzwierciedla widoczne karty: karta bez linku („wkrótce”) ma samą nazwę, bez url.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE}${SCIEZKA_HUBA}#lista`,
    name: H1,
    numberOfItems: karty.length,
    itemListElement: karty.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.nazwa,
      ...(k.href ? { url: `${BASE}${k.href.split('#')[0]}` } : {}),
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
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Bezpłatnie, bez rejestracji
            </div>
            <h1 style={s.h1}>{H1}</h1>
          </Reveal>
          <Byline sciezka={SCIEZKA_HUBA} style={{ textAlign: 'center' }} />
          <AnswerBox>
            Zebraliśmy tu bezpłatne narzędzia i wzory AI SEO COMPANY: generator llms.txt z testem dostępu botów AI, sprawdzarkę, czy ChatGPT poleca Twoją firmę, wzór miesięcznego raportu SEO i checklistę zmiany agencji. Działają bez rejestracji. Generator nie zapisuje wyników, sprawdzarka usuwa dane po 60 dniach, a wzory wysyłamy e-mailem.
          </AnswerBox>

          <section aria-labelledby="narzedzia-online" style={{ marginTop: '3rem' }}>
            <h2 id="narzedzia-online" style={s.h2}>Narzędzia online</h2>
            <p style={s.akapit}>
              Oba narzędzia odpowiadają na pytania, których nie rozstrzygną darmowe narzędzia SEO Google, czyli Search Console i Analytics: czy boty modeli językowych mogą wejść na Twoją stronę i czy ChatGPT wymienia Twoją firmę, gdy klient pyta o usługę w mieście.
            </p>
            <div style={siatka}>
              {narzedzia.map((k) => <Karta key={k.id} karta={k} />)}
            </div>
          </section>

          <section id="szablony" aria-labelledby="szablony-naglowek" style={{ ...s.sekcja, scrollMarginTop: '110px' }}>
            <h2 id="szablony-naglowek" style={s.h2}>Szablony i checklisty do pobrania</h2>
            <p style={s.akapit}>
              Wzory w PDF pomagają sprawdzić pracę agencji: czego wymagać w comiesięcznym raporcie i co odebrać przed wypowiedzeniem umowy. Podajesz tylko adres e-mail, a link do pliku przychodzi w ciągu minuty.
            </p>
            <div style={siatka}>
              {szablony.map((k) => <Karta key={k.id} karta={k} />)}
            </div>
          </section>

          <section aria-labelledby="co-dalej" style={s.sekcja}>
            <h2 id="co-dalej" style={s.h2}>Gdy wynik pokaże problem</h2>
            <p style={s.akapit}>
              Zablokowany bot albo brak firmy w odpowiedziach modeli to sygnał, od którego zaczyna się praca, a nie jej koniec. W usłudze pozycjonowania w AI co tydzień mierzymy obecność firmy w ChatGPT, Perplexity, Gemini i przeglądzie AI Google i pracujemy nad źródłami, z których korzystają modele. Szczegóły i ceny opisujemy na stronie{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>pozycjonowanie w AI</Link> : 'pozycjonowanie w AI'}.
            </p>
          </section>
        </div>
      </section>

      <AppleFaq faqData={FAQ_HUBA} title="Pytania o darmowe narzędzia" sectionId="pytania" />
      <Footer />
    </main>
  );
}
