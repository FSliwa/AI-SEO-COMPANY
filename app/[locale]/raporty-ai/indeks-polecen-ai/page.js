import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { POMIAR_AIO } from '@/lib/porownania';
import styles from '@/components/porownania/porownania.module.css';

const BASE = 'https://www.ai-seo-company.pl';
const SCIEZKA = '/raporty-ai/indeks-polecen-ai';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis?.tytul ?? 'Indeks poleceń AI: z jakich źródeł korzystają ChatGPT i Google',
    description: wpis?.opis ?? 'Z jakich źródeł ChatGPT, Perplexity i Google AI Overviews wybierają polecane firmy? Analiza 141 cytowań AIO i 62 linków lokalnych z metodologią.',
    ogType: 'article',
  });
}

export default async function IndeksPolecenAiPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  const en = locale === 'en';
  const urlStrony = en ? `${BASE}/en/ai-reports/ai-recommendations-index` : `${BASE}/raporty-ai/indeks-polecen-ai`;

  const csvDane = [
    'silnik,proba_zapytan,liczba_cytowan_lub_linkow,kluczowy_wniosek,data_pomiaru',
    `Google AI Overviews (PL desktop),${POMIAR_AIO.frazPorownanych} z ${POMIAR_AIO.frazSprawdzonych},${POMIAR_AIO.cytowan} cytowan (${POMIAR_AIO.domen} domen),${POMIAR_AIO.procent}% (${POMIAR_AIO.wTop10}/${POMIAR_AIO.cytowan}) z domen obecnych w organicznym TOP 10,${POMIAR_AIO.daty[0]}`,
    `Google AI Overviews - udzial wideo,${POMIAR_AIO.frazPorownanych},${POMIAR_AIO.youtube} z ${POMIAR_AIO.frazPorownanych} fraz,25% fraz zawieralo youtube.com na liscie zrodel,${POMIAR_AIO.daty[0]}`,
    'ChatGPT Search (zapytania lokalne PL),koszyk lokalny B2B/uslugi,62 linki w odpowiedziach,95.2% (59/62) linkow prowadzilo do wyszukiwania w Mapach Google,2026-11-05',
  ].join('\n');
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvDane)}`;

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${urlStrony}#dataset`,
    name: en
      ? 'AI Recommendations & Citation Sources Index (ChatGPT, Perplexity & Google AI Overviews)'
      : 'Indeks poleceń i źródeł cytowań AI (ChatGPT, Perplexity i Google AI Overviews)',
    description: en
      ? `Empirical measurement of ${POMIAR_AIO.cytowan} Google AI Overview source citations across ${POMIAR_AIO.domen} domains and 62 ChatGPT local recommendation links.`
      : `Pomiar empiryczny ${POMIAR_AIO.cytowan} cytowań źródeł Google AI Overviews (${POMIAR_AIO.domen} domen) oraz 62 linków w lokalnych poleceniach ChatGPT.`,
    url: urlStrony,
    inLanguage: en ? 'en-US' : 'pl-PL',
    datePublished: '2026-11-24',
    dateModified: '2026-11-24',
    isPartOf: { '@id': `${en ? `${BASE}/en/ai-reports` : `${BASE}/raporty-ai`}#webpage` },
    creator: { '@id': `${BASE}/#organization` },
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };

  const wierszeSilnikow = en
    ? [
        {
          id: 'aio-top10',
          silnik: 'Google AI Overviews (DataForSEO, Poland desktop)',
          proba: `${POMIAR_AIO.frazSprawdzonych} B2B SEO queries (${POMIAR_AIO.frazPorownanych} compared with organic TOP 10)`,
          wynik: `${POMIAR_AIO.wTop10} of ${POMIAR_AIO.cytowan} citations (${POMIAR_AIO.procent}%) matched organic TOP 10`,
          wniosek: '72% of cited URLs came from outside page-one organic results - deep topical subpages, comparisons and YouTube (5/20 queries) win citations even from positions 11-50.',
        },
        {
          id: 'chatgpt-local',
          silnik: 'ChatGPT with live web search (local company queries)',
          proba: 'API test (Nov 4-5, 2026), 62 outbound links in local service recommendations',
          wynik: '59 of 62 links (95.2%) pointed to Google Maps search URLs',
          wniosek: 'Consistent NAP data, primary GBP categories, review velocity and B2B directories (Clutch, Sortlist) directly influence local ChatGPT shortlists.',
        },
        {
          id: 'perplexity-rag',
          silnik: 'Perplexity & Claude web search (B2B comparison queries)',
          proba: 'Live RAG retrieval across service, pricing & comparison URLs',
          wynik: 'Prioritizes server-rendered HTML tables, explicit pricing & CC BY 4.0 data',
          wniosek: 'Pages blocking PerplexityBot or OAI-SearchBot in robots.txt/WAF or hiding copy inside client-side JS lose source-card attribution.',
        },
      ]
    : [
        {
          id: 'aio-top10',
          silnik: 'Google AI Overviews (DataForSEO, Polska, komputer)',
          proba: `${POMIAR_AIO.frazSprawdzonych} fraz branżowych (${POMIAR_AIO.frazPorownanych} zestawionych z organicznym TOP 10)`,
          wynik: `${POMIAR_AIO.wTop10} ze ${POMIAR_AIO.cytowan} cytowań (${POMIAR_AIO.procent}%) pochodziło z TOP 10`,
          wniosek: '72% cytowanych adresów pochodziło spoza pierwszej dziesiątki - konkretne poradniki, tabele porównawcze i wideo YouTube (5 z 20 fraz) trafiają do źródeł nawet z pozycji 11-50.',
        },
        {
          id: 'chatgpt-local',
          silnik: 'ChatGPT z wyszukiwaniem sieciowym (zapytania lokalne)',
          proba: 'Test API (4-5.11.2026), 62 linki wyjściowe przy poleceniach firm lokalnych',
          wynik: '59 z 62 linków (95,2%) prowadziło do wyszukiwania w Mapach Google',
          wniosek: 'Spójne dane NAP, kategorie Profilu Firmy w Google, świeże opinie oraz katalogi B2B (Clutch, Sortlist) bezpośrednio przekładają się na polecenia w ChatGPT.',
        },
        {
          id: 'perplexity-rag',
          silnik: 'Perplexity oraz Claude Search (zapytania zakupowe i VS)',
          proba: 'Pobieranie RAG na żywo z podstron cenników, porównań i raportów',
          wynik: 'Preferuje czysty HTML (SSR), jawne widełki cenowe i tabele kryteriów',
          wniosek: 'Witryny blokujące PerplexityBot lub OAI-SearchBot na zaporze WAF (kod 403) albo renderujące treść wyłącznie w JS wypadają z kart źródeł.',
        },
      ];

  const wierszeKategorii = en
    ? [
        { id: 'k-poradniki', kategoria: 'Deep informational guides & benchmark reports (H2 Answer-First + tables)', rola: 'Primary source for Google AI Overviews (72% from outside classic TOP 10)', dzialanie: 'Add 40-60 word AnswerBox, CompareTable and JSON-LD Article/Dataset' },
        { id: 'k-mapy', kategoria: 'Google Business Profile / Maps & consistent NAP citations', rola: 'Dominant link target in local ChatGPT recommendations (59/62 links)', dzialanie: 'Unify phone/address/tax ID across HTML, LocalBusiness schema and GBP' },
        { id: 'k-katalogi', kategoria: 'Independent B2B directories & review platforms (Clutch, Sortlist, GoodFirms)', rola: 'Third-party entity corroboration for "best agency / supplier for X" prompts', dzialanie: 'Maintain verified profiles and connect them in Organization sameAs[]' },
        { id: 'k-vs', kategoria: 'Transparent BOFU "X vs Y" comparisons & public pricing pages', rola: 'Quoted when buyers compare software, CMS stacks or pricing models', dzialanie: 'Publish dated criteria tables with official vendor pricing sources' },
        { id: 'k-wideo', kategoria: 'YouTube video tutorials & transcripts', rola: `Appeared in ${POMIAR_AIO.youtube} of ${POMIAR_AIO.frazPorownanych} compared AI Overviews (25%)`, dzialanie: 'Embed structured chapters and transcripts matching key buyer questions' },
      ]
    : [
        { id: 'k-poradniki', kategoria: 'Pogłębione poradniki i raporty danych (sekcje Answer-First + tabele)', rola: 'Główne źródło Google AI Overviews (72% spoza klasycznego TOP 10)', dzialanie: 'Dodaj zwięzłą odpowiedź 40-60 słów pod H1/H2, tabelę i dane Dataset/Article' },
        { id: 'k-mapy', kategoria: 'Profil Firmy w Google (Mapy) i spójne dane rejestrowe NAP', rola: 'Dominujący cel linków przy lokalnych poleceniach w ChatGPT (59 z 62 linków)', dzialanie: 'Ujednolić telefon, adres i KRS/NIP między stopką HTML, JSON-LD i wizytówką' },
        { id: 'k-katalogi', kategoria: 'Niezależne katalogi B2B i platformy opinii (Clutch, Sortlist, GoodFirms)', rola: 'Zewnętrzne potwierdzenie wiarygodności przy pytaniach „jaką firmę wybrać”', dzialanie: 'Uzupełnij zweryfikowane profile i połącz je w tablicy Organization sameAs[]' },
        { id: 'k-vs', kategoria: 'Uczciwe porównania BOFU „X vs Y” oraz jawne strony cennikowe', rola: 'Cytowane, gdy kupujący porównuje technologie, modele umów lub koszty', dzialanie: 'Publikuj tabele kryteriów z datą odczytu i linkami do oficjalnej dokumentacji' },
        { id: 'k-wideo', kategoria: 'Materiały wideo na YouTube z opisem i rozdziałami', rola: `Obecne w źródłach przy ${POMIAR_AIO.youtube} z ${POMIAR_AIO.frazPorownanych} zbadanych przeglądów AI (25%)`, dzialanie: 'Dodawaj znaczniki czasu i transkrypcje odpowiadające na konkretne pytania' },
      ];

  const faq = en
    ? [
        {
          question: 'Why does this index group citations by source category instead of naming competing agencies?',
          answer: 'Publishing a self-authored ranking of direct competitors creates an obvious conflict of interest and legal risk under unfair competition rules (Art. 16 u.z.n.k.). Grouping citations by source type (organic TOP 10, outside TOP 10, Maps, B2B directories, YouTube) gives B2B marketers actionable data they can apply in any industry.',
        },
        {
          question: 'Does ranking #1 in Google guarantee that AI Overviews or ChatGPT will recommend my company?',
          answer: `No. In our ${POMIAR_AIO.daty[0]} measurement of ${POMIAR_AIO.frazSprawdzonych} industry queries, only ${POMIAR_AIO.procent}% (${POMIAR_AIO.wTop10} of ${POMIAR_AIO.cytowan}) of AI Overview citations belonged to domains in the organic TOP 10 for the same keyword. Strong organic rankings help, but structured answers, entity consistency and external mentions decide the rest.`,
        },
        {
          question: 'How often do AI recommendations change for the exact same prompt?',
          answer: 'Unlike classic organic rankings that shift gradually over days, generative answers sample probabilistically and can vary between sessions. That is why inside SEO Premium we track a fixed 30-question buyer basket every week rather than relying on a single screenshot.',
        },
      ]
    : [
        {
          question: 'Dlaczego w indeksie pokazujecie kategorie źródeł zamiast rankingu nazw agencji SEO?',
          answer: 'Publikowanie przez agencję własnego rankingu bezpośrednich konkurentów rodzi oczywisty konflikt interesów oraz ryzyko prawne na gruncie art. 16 u.z.n.k. Agregacja według typów źródeł (TOP 10, spoza TOP 10, Mapy Google, katalogi B2B, wideo) daje właścicielom firm praktyczną wiedzę, którą można wdrożyć w każdej branży.',
        },
        {
          question: 'Czy pozycja w TOP 3 Google gwarantuje, że firma pojawi się w AI Overviews i ChatGPT?',
          answer: `Nie. W naszym pomiarze z ${POMIAR_AIO.daty[0]} r. na próbie ${POMIAR_AIO.frazSprawdzonych} zapytań tylko ${POMIAR_AIO.procent}% (${POMIAR_AIO.wTop10} ze ${POMIAR_AIO.cytowan}) cytowań w przeglądzie AI pochodziło z domen obecnych w pierwszej dziesiątce tego samego hasła. Pozycja organiczna pomaga, ale o cytowaniu decydują też bezpośrednie bloki odpowiedzi, spójny graf encji i wzmianki zewnętrzne.`,
        },
        {
          question: 'Jak sprawdzić, kogo modele AI polecają w mojej branży i mieście?',
          answer: 'Możesz zrobić to od ręki i bez karty płatniczej w naszej bezpłatnej sprawdzaarce widoczności w AI, która odpytuje na żywo ChatGPT, Gemini, Perplexity, Claude, Groka i Google AI Overviews na edytowalnych pytaniach Twoich klientów.',
        },
      ];

  const zrodla = en
    ? [
        { tytul: 'Google Search Central: AI features and your website (AI Overviews & AI Mode)', url: 'https://developers.google.com/search/docs/appearance/ai-features', dopisek: 'accessed 24 November 2026' },
        { tytul: 'OpenAI Platform: Overview of OpenAI Crawlers (OAI-SearchBot & ChatGPT-User)', url: 'https://developers.openai.com/api/docs/bots', dopisek: 'accessed 24 November 2026' },
        { tytul: 'DataForSEO SERP API: Google organic & AI Overview source extraction (Poland, desktop)', url: 'https://dataforseo.com/apis/serp-api', dopisek: 'measurement 4 November 2026' },
      ]
    : [
        { tytul: 'Google Search Central: funkcje AI w wyszukiwarce a Twoja witryna (AI Overviews i AI Mode)', url: 'https://developers.google.com/search/docs/appearance/ai-features?hl=pl', dopisek: 'dostęp 24.11.2026' },
        { tytul: 'Dokumentacja OpenAI: przegląd robotów indeksujących OAI-SearchBot i ChatGPT-User', url: 'https://developers.openai.com/api/docs/bots', dopisek: 'dostęp 24.11.2026' },
        { tytul: 'DataForSEO SERP API: pobranie wyników organicznych i kart źródeł AI Overviews (Polska, desktop)', url: 'https://dataforseo.com/apis/serp-api', dopisek: 'pomiar 04.11.2026' },
      ];

  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs
        parent={{ label: en ? 'AI & SEO Research Reports' : 'Raporty i dane własne', href: '/raporty-ai' }}
        pl="Indeks poleceń AI"
        en="AI Recommendations Index"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />

      <article>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '1.5rem' }}>
          <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
            <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span>{' '}
            {en ? 'EMPIRICAL CITATION STUDY · CC BY 4.0' : 'BADANIE ŹRÓDEŁ CYTOWAŃ AI · CC BY 4.0'}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.8vw, 3.1rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.035em', margin: '0.5rem 0 1rem', color: 'var(--w-tusz)' }}>
            {en
              ? 'AI Recommendations Index: Which Sources ChatGPT, Perplexity and Google AI Overviews Cite'
              : 'Indeks poleceń AI: z jakich źródeł korzystają ChatGPT, Perplexity i Google AI Overviews'}
          </h1>
          <Byline sciezka={SCIEZKA} data="2026-11-24" takzeEn style={{ margin: '0 0 1rem' }} />

          <AnswerBox {...(en ? { etykieta: 'Key empirical finding' } : {})}>
            <p className={styles.tresc} style={{ margin: 0 }}>
              {en
                ? `In our benchmark of ${POMIAR_AIO.frazSprawdzonych} B2B search queries (DataForSEO, Poland desktop, ${POMIAR_AIO.daty[0]}), Google AI Overviews appeared on ${POMIAR_AIO.frazZPrzegladem}/${POMIAR_AIO.frazSprawdzonych} queries, yet only ${POMIAR_AIO.procent}% (${POMIAR_AIO.wTop10} of ${POMIAR_AIO.cytowan} citations across ${POMIAR_AIO.domen} domains) came from the classic organic TOP 10. Meanwhile, in local company prompts in ChatGPT with search, 59 of 62 outbound links (95.2%) pointed directly to Google Maps.`
                : `W naszym badaniu ${POMIAR_AIO.frazSprawdzonych} zapytań branżowych B2B (DataForSEO, Polska, komputer, ${POMIAR_AIO.daty[0]}) przegląd Google AI Overviews pojawił się przy ${POMIAR_AIO.frazZPrzegladem} z ${POMIAR_AIO.frazSprawdzonych} haseł, ale tylko ${POMIAR_AIO.procent}% (${POMIAR_AIO.wTop10} ze ${POMIAR_AIO.cytowan} cytowań z ${POMIAR_AIO.domen} domen) pochodziło z klasycznego TOP 10. Z kolei przy lokalnych poleceniach firm w ChatGPT z wyszukiwaniem aż 59 z 62 linków (95,2%) prowadziło do Map Google.`}
            </p>
          </AnswerBox>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
            <a
              href={csvHref}
              download={en ? 'ai-recommendations-sources-2026.csv' : 'indeks-polecen-ai-2026.csv'}
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '0.6rem 1.1rem' }}
            >
              {en ? 'Download summary CSV (CC BY 4.0)' : 'Pobierz tabelę danych CSV (CC BY 4.0)'}
            </a>
            <Link href="/sprawdz-widocznosc-w-ai" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.1rem' }}>
              {en ? 'Test your brand across 6 AI engines' : 'Sprawdź swoją firmę w 6 silnikach AI'}
            </Link>
          </div>
        </div>

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', display: 'grid', gap: '1.5rem', paddingBottom: '2rem' }}>
          <div id="pomiary-silnikow" className={styles.karta}>
            <h2 className={styles.h2}>
              {en ? '1. Measured source selection across AI answer engines' : '1. Zmierzony dobór źródeł w silnikach odpowiedzi AI'}
            </h2>
            <CompareTable
              id="tabela-pomiary-silnikow-ai"
              caption={en ? 'Empirical citation findings across AI Overviews, ChatGPT Search and RAG engines' : 'Wyniki pomiarów źródeł cytowań w AI Overviews, ChatGPT Search i silnikach RAG'}
              columns={[
                { key: 'silnik', label: en ? 'Engine & Environment' : 'Silnik i środowisko' },
                { key: 'proba', label: en ? 'Sample' : 'Próba badawcza' },
                { key: 'wynik', label: en ? 'Measured Result' : 'Zmierzony wynik' },
                { key: 'wniosek', label: en ? 'Strategic Implication' : 'Wniosek wdrożeniowy' },
              ]}
              rows={wierszeSilnikow}
              przypis={en
                ? 'Limitation: single-location desktop & API snapshots (Nov 4-5, 2026). Generative responses fluctuate across sessions; updated as new monthly windows complete.'
                : 'Ograniczenie metody: migawki z jednej lokalizacji i urządzenia (4-5.11.2026). Odpowiedzi generatywne zmieniają się między sesjami; dane rozszerzamy w kolejnych oknach miesięcznych.'}
            />
          </div>

          <div id="kategorie-zrodel" className={styles.karta}>
            <h2 className={styles.h2}>
              {en ? '2. Five source categories that shape B2B AI recommendations' : '2. Pięć kategorii źródeł decydujących o poleceniu firmy B2B'}
            </h2>
            <p className={styles.tresc}>
              {en
                ? 'Because language models cross-check claims across independent domains before recommending a vendor, optimizing your own homepage alone is rarely enough. The table below maps each source category to concrete engineering and editorial actions:'
                : 'Ponieważ modele językowe konfrontują deklaracje firmy z zewnętrznymi katalogami, mapami i publikacjami przed wystawieniem rekomendacji, sama optymalizacja strony głównej nie wystarcza. Poniższa tabela łączy każdą kategorię źródeł z konkretnym działaniem:'}
            </p>
            <CompareTable
              id="tabela-kategorii-zrodel-ai"
              caption={en ? 'Source categories cited in B2B & local AI prompts' : 'Kategorie źródeł cytowanych w zapytaniach zakupowych i lokalnych'}
              columns={[
                { key: 'kategoria', label: en ? 'Source Category' : 'Kategoria źródła' },
                { key: 'rola', label: en ? 'Observed Role in AI Answers' : 'Rola w odpowiedziach AI' },
                { key: 'dzialanie', label: en ? 'What to Implement' : 'Co wdrożyć po stronie firmy' },
              ]}
              rows={wierszeKategorii}
            />
          </div>

          <div id="powiazane-narzedzia" className={styles.karta}>
            <h2 className={styles.h2}>
              {en ? '3. Verify your technical & entity readiness for free' : '3. Zweryfikuj techniczną gotowość własnej domeny za darmo'}
            </h2>
            <p className={styles.tresc} style={{ marginBottom: 0 }}>
              {en ? (
                <>
                  Check whether your firewall accidentally blocks AI search bots in our{' '}
                  <Link href="/raport-bledow-seo-w-polsce" style={{ textDecoration: 'underline' }}>2026 Technical SEO &amp; AI Bot Benchmark</Link>, test live SSR parity in the{' '}
                  <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={{ textDecoration: 'underline' }}>15-Bot AI Crawler Checker</Link>, score your H2 chunks in the{' '}
                  <Link href="/narzedzia/sprawdz-cytowalnosc-strony-ai" style={{ textDecoration: 'underline' }}>GEO Citability Checker</Link>, and compare engines side by side in{' '}
                  <Link href="/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews" style={{ textDecoration: 'underline' }}>ChatGPT Search vs Perplexity vs Google AI Overviews</Link>.
                </>
              ) : (
                <>
                  Sprawdź, jak Twoja witryna wypada na tle rynku w żywym{' '}
                  <Link href="/raport-bledow-seo-w-polsce" style={{ textDecoration: 'underline' }}>raporcie błędów SEO i blokad botów AI</Link>, przetestuj dostęp 15 botów w{' '}
                  <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={{ textDecoration: 'underline' }}>testerze robotów AI i SSR</Link>, oceń strukturę sekcji pod RAG w{' '}
                  <Link href="/narzedzia/sprawdz-cytowalnosc-strony-ai" style={{ textDecoration: 'underline' }}>audytorze cytowalności GEO</Link> oraz porównaj mechanizmy indeksowania w zestawieniu{' '}
                  <Link href="/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews" style={{ textDecoration: 'underline' }}>ChatGPT Search vs Perplexity vs Google AI Overviews</Link>.
                </>
              )}
            </p>
          </div>
        </div>
      </article>

      <AppleFaq faqData={faq} title={en ? 'Frequently asked questions' : 'Najczęstsze pytania o Indeks poleceń AI'} sectionId="faq" />
      <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Zrodla zrodla={zrodla} naglowek={en ? 'Sources and documentation' : 'Źródła i dokumentacja'} id="zrodla" />
      </div>
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
