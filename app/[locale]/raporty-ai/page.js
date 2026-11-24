import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { PANEL_API } from '@/lib/narzedziaApi';
import { POMIAR_AIO } from '@/lib/porownania';
import styles from '@/components/porownania/porownania.module.css';

const BASE = 'https://www.ai-seo-company.pl';
const SCIEZKA = '/raporty-ai';
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis?.tytul ?? 'Raporty AI SEO COMPANY: dane o widoczności firm w AI',
    description: wpis?.opis ?? 'Otwarte raporty i zbiory danych AI SEO COMPANY: indeks źródeł poleceń AI, benchmark 49 błędów SEO oraz wyniki Google Search Console (CC BY 4.0).',
    ogType: 'website',
  });
}

async function pobierzLiczbeDomen() {
  try {
    const res = await fetch(`${PANEL_API}/statystyki-audytow`, { next: { revalidate: 3600 } });
    if (!res.ok) return 149;
    const j = await res.json();
    return Number(j?.domen) >= 100 ? Number(j.domen) : 149;
  } catch {
    return 149;
  }
}

export default async function RaportyAiHubPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  const en = locale === 'en';
  const liczbaDomen = await pobierzLiczbeDomen();

  const urlHub = en ? `${BASE}/en/ai-reports` : `${BASE}/raporty-ai`;
  const karty = [
    {
      href: '/raport-bledow-seo-w-polsce',
      urlAbs: en ? `${BASE}/en/seo-errors-benchmark-report` : `${BASE}/raport-bledow-seo-w-polsce`,
      tytul: en
        ? `Technical SEO Errors & AI Bot Blocking Benchmark (N = ${liczbaDomen})`
        : `Najczęstsze błędy techniczne SEO i blokady botów AI (N = ${liczbaDomen})`,
      opis: en
        ? 'Live first-party dataset from anonymous 49-rule audits: missing image dimensions, title truncation, slow TTFB, missing /llms.txt and robots.txt AI crawler blocks with CSV export.'
        : 'Żywy zbiór danych z anonimowych audytów 49 reguł: brak wymiarów obrazów, ucięte tytuły, wolny TTFB, brak /llms.txt oraz odsetek blokad botów AI w robots.txt z eksportem CSV.',
      proba: `N = ${liczbaDomen} ${en ? 'domains' : 'domen'} · CC BY 4.0`,
    },
    {
      href: '/raporty-ai/indeks-polecen-ai',
      urlAbs: en ? `${BASE}/en/ai-reports/ai-recommendations-index` : `${BASE}/raporty-ai/indeks-polecen-ai`,
      tytul: en
        ? 'AI Recommendations & Citation Sources Index (2026)'
        : 'Indeks poleceń i źródeł cytowań AI (2026)',
      opis: en
        ? `Empirical analysis of ${POMIAR_AIO.cytowan} AI Overview citations (${POMIAR_AIO.domen} domains) and 62 ChatGPT local search links: how often AI cites classic TOP 10 (${POMIAR_AIO.procent}%), Google Maps, B2B directories and YouTube.`
        : `Analiza empiryczna ${POMIAR_AIO.cytowan} cytowań Google AI Overviews (${POMIAR_AIO.domen} domen) oraz 62 linków lokalnych w ChatGPT: jak często modele cytują TOP 10 (${POMIAR_AIO.procent}%), Mapy Google, katalogi B2B i YouTube.`,
      proba: `${POMIAR_AIO.cytowan} + 62 ${en ? 'citations' : 'cytowań'} · CC BY 4.0`,
    },
    {
      href: en ? '/blog/how-long-does-seo-take' : '/blog/wyniki-wdrozen-seo-2026',
      urlAbs: en ? `${BASE}/en/blog/how-long-does-seo-take` : `${BASE}/blog/wyniki-wdrozen-seo-2026`,
      tytul: en
        ? '90-Day Google Search Console Implementation Curves (Client Data)'
        : '90-dniowe krzywe wdrożeń SEO z Google Search Console (5 klientów)',
      opis: en
        ? 'Week-by-week organic clicks and impressions pulled directly via Google Search Console API across industrial manufacturing, construction, hospitality, ISO training and SaaS.'
        : 'Tygodniowe szeregi kliknięć i wyświetleń pobierane bezpośrednio z Google Search Console API dla produkcji przemysłowej, budownictwa, gastronomii, szkoleń ISO oraz SaaS.',
      proba: `5 ${en ? 'GSC properties' : 'domen GSC'} · API Live`,
    },
    {
      href: '/porownania/ahrefs-dr-vs-moz-da-vs-common-crawl',
      urlAbs: en ? `${BASE}/en/comparisons/ahrefs-dr-vs-moz-da-vs-common-crawl` : `${BASE}/porownania/ahrefs-dr-vs-moz-da-vs-common-crawl`,
      tytul: en
        ? 'Common Crawl Graph Centrality vs Ahrefs DR & Moz DA (441 Domains)'
        : 'Centralność grafu Common Crawl (135 mln domen) a Ahrefs DR i Moz DA',
      opis: en
        ? 'Open methodology and rank-correlation study comparing harmonic centrality on the 134.98M-domain Common Crawl web graph against commercial authority scores.'
        : 'Otwarta metodologia i badanie korelacji rangowej między harmoniczną centralnością na grafie 134,98 mln domen Common Crawl a komercyjnymi wskaźnikami autorytetu.',
      proba: 'N = 441 · Common Crawl',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${urlHub}#webpage`,
    url: urlHub,
    name: en ? 'AI SEO COMPANY Research & Open Datasets' : 'Raporty i otwarte zbiory danych AI SEO COMPANY',
    inLanguage: en ? 'en-US' : 'pl-PL',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    datePublished: '2026-11-24',
    dateModified: '2026-11-24',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: karty.length,
      itemListElement: karty.map((k, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: k.urlAbs,
        name: k.tytul,
      })),
    },
  };

  const faq = en
    ? [
        {
          question: 'Why do you publish raw methodology and sample sizes instead of marketing claims?',
          answer: 'Every dataset on this hub discloses the exact sample size N, date window, measurement tool and statistical limitations. You can verify or replicate each check using our 13 free SEO & GEO tools without registration.',
        },
        {
          question: 'Why are competitor agency names excluded from your public reports?',
          answer: 'In accordance with Polish unfair competition law (Art. 16 u.z.n.k.) and our editorial policy, our public benchmarks aggregate findings by technical rule, domain hash or source category rather than grading competing agencies by name.',
        },
        {
          question: 'Under what license can journalists and researchers cite these reports?',
          answer: 'All aggregated tables and charts on /en/ai-reports are available under Creative Commons Attribution 4.0 (CC BY 4.0). Please credit AI SEO COMPANY, state the sample size and link to the source URL.',
        },
      ]
    : [
        {
          question: 'Dlaczego publikujecie dokładną wielkość próby N i ograniczenia zamiast haseł reklamowych?',
          answer: 'Każde opracowanie w tym dziale podaje wielkość próby N, przedział dat, narzędzie pomiarowe oraz ograniczenia metody. Każdy pomiar możesz samodzielnie powtórzyć na własnej domenie w naszych 13 darmowych narzędziach bez logowania.',
        },
        {
          question: 'Dlaczego w raportach nie publikujecie rankingów konkurencyjnych agencji z nazwy?',
          answer: 'Zgodnie z art. 16 ustawy o zwalczaniu nieuczciwej konkurencji (u.z.n.k.) oraz naszą polityką redakcyjną publikujemy wyłącznie zagregowane statystyki reguł technicznych, kategorii źródeł i zanonimizowanych skrótów domen - bez oceniania konkurentów z nazwy.',
        },
        {
          question: 'Na jakiej licencji można cytować dane w artykułach i prezentacjach?',
          answer: 'Wszystkie zestawienia zbiorcze udostępniamy na licencji Creative Commons Uznanie autorstwa 4.0 (CC BY 4.0). Przy cytowaniu podaj nazwę AI SEO COMPANY, wielkość próby N z datą odczytu oraz aktywny link do raportu źródłowego.',
        },
      ];

  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Raporty i dane własne" en="AI & SEO Research Reports" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container" style={{ maxWidth: '920px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '2.5rem' }}>
        <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
          <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span>{' '}
          {en ? 'PRIMARY RESEARCH · CC BY 4.0' : 'BADANIA WŁASNE · CC BY 4.0'}
        </div>
        <h1 style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.25rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.035em', margin: '0.5rem 0 1rem', color: 'var(--w-tusz)' }}>
          {en
            ? 'AI Search & Technical SEO Research Reports (Open Data)'
            : 'Raporty AI SEO COMPANY: otwarte dane o SEO technicznym i widoczności w AI'}
        </h1>
        <Byline sciezka={SCIEZKA} data="2026-11-24" takzeEn style={{ margin: '0 0 1.25rem' }} />

        <AnswerBox {...(en ? { etykieta: 'Summary of key findings' } : {})}>
          <p className={styles.tresc} style={{ margin: 0 }}>
            {en
              ? `Our open datasets combine ${liczbaDomen} unique domains audited across 49 technical SEO rules, ${POMIAR_AIO.cytowan} Google AI Overview citations (${POMIAR_AIO.procent}% overlap with classic TOP 10), 62 ChatGPT local search links (95.2% pointing to Google Maps), and live 90-day Search Console series.`
              : `Nasze otwarte zbiory danych łączą ${liczbaDomen} unikalnych domen przebadanych pod kątem 49 reguł technicznego SEO, ${POMIAR_AIO.cytowan} cytowań Google AI Overviews (${POMIAR_AIO.procent}% pokrycia z klasycznym TOP 10), 62 linki lokalne z ChatGPT (95,2% prowadzących do Map Google) oraz żywe 90-dniowe serie z Search Console.`}
          </p>
        </AnswerBox>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '1.15rem', marginTop: '2rem' }}>
          {karty.map((k) => (
            <article key={k.href} className={styles.kartaPorownania} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontFamily: 'var(--w-mono)', fontSize: '0.76rem', color: 'var(--w-pomarancz-tekst)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {k.proba}
                </p>
                <h2 style={{ fontSize: '1.22rem', lineHeight: 1.28, fontWeight: 600, margin: '0 0 0.55rem', color: 'var(--w-tusz)' }}>
                  <Link href={k.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {k.tytul} <span aria-hidden="true">→</span>
                  </Link>
                </h2>
                <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.6, color: 'var(--w-tusz-2)' }}>
                  {k.opis}
                </p>
              </div>
              <div>
                <Link href={k.href} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'underline' }}>
                  {en ? 'Open dataset & methodology' : 'Otwórz raport i metodologię'}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.karta} style={{ marginTop: '2rem' }}>
          <h2 className={styles.h2}>
            {en ? 'Dataset overview and verification tools' : 'Zestawienie zbiorów danych i narzędzi do samodzielnej weryfikacji'}
          </h2>
          <CompareTable
            id="tabela-raportow-ai"
            caption={en ? 'Published AI SEO COMPANY primary datasets (November 2026)' : 'Opublikowane zbiory danych pierwotnych AI SEO COMPANY (listopad 2026)'}
            columns={[
              { key: 'zbiory', label: en ? 'Dataset / Study' : 'Zbiór danych / Badanie' },
              { key: 'proba', label: en ? 'Sample & Window' : 'Próba i okno pomiaru' },
              { key: 'narzedzie', label: en ? 'Verify on your domain' : 'Sprawdź na własnej domenie' },
            ]}
            rows={[
              {
                id: 'r-audyt',
                zbiory: <Link href="/raport-bledow-seo-w-polsce" style={{ textDecoration: 'underline' }}>{en ? '49-Rule SEO & AI Bot Benchmark' : 'Benchmark 49 reguł SEO i blokad botów AI'}</Link>,
                proba: en ? `N = ${liczbaDomen} unique domains (HMAC-SHA256)` : `N = ${liczbaDomen} unikalnych domen (HMAC-SHA256)`,
                narzedzie: <Link href="/narzedzia/audyt-seo" style={{ textDecoration: 'underline' }}>{en ? 'Free SEO Audit' : 'Darmowy audyt SEO'}</Link>,
              },
              {
                id: 'r-indeks',
                zbiory: <Link href="/raporty-ai/indeks-polecen-ai" style={{ textDecoration: 'underline' }}>{en ? 'AI Recommendations & Sources Index' : 'Indeks poleceń i źródeł AI'}</Link>,
                proba: en ? `${POMIAR_AIO.cytowan} AIO citations + 62 ChatGPT links` : `${POMIAR_AIO.cytowan} cytowań AIO + 62 linki ChatGPT`,
                narzedzie: <Link href="/sprawdz-widocznosc-w-ai" style={{ textDecoration: 'underline' }}>{en ? 'AI Visibility Checker' : 'Sprawdzarka widoczności w AI'}</Link>,
              },
              {
                id: 'r-gsc',
                zbiory: <Link href={en ? '/blog/how-long-does-seo-take' : '/blog/wyniki-wdrozen-seo-2026'} style={{ textDecoration: 'underline' }}>{en ? '90-Day Search Console Curves' : '90-dniowe wyniki wdrożeń z GSC'}</Link>,
                proba: en ? 'Verified client properties (11-13 weeks)' : '5 zweryfikowanych domen klientów (11-13 tyg.)',
                narzedzie: <Link href="/narzedzia/kalkulator-strat-seo" style={{ textDecoration: 'underline' }}>{en ? 'SEO Loss & ROI Calculator' : 'Kalkulator strat SEO'}</Link>,
              },
            ]}
          />
        </div>
      </div>

      <AppleFaq faqData={faq} title={en ? 'Questions about our research methodology' : 'Pytania o metodologię naszych badań'} sectionId="faq" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
