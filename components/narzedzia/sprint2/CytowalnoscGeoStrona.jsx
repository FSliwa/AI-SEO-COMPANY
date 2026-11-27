// Strona aplikacji D1: Deterministyczny Audytor Cytowalnosci GEO i Blokow Odpowiedzi
// PL: /narzedzia/sprawdz-cytowalnosc-strony-ai | EN: /en/tools/geo-citability-checker

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import { CENY, cena } from '@/lib/narzedziaLiczby';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import NawBok from '@/components/narzedzia/NawBok';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import Sekcja from '@/components/narzedzia/Sekcja';
import Poradniki from '@/components/narzedzia/Poradniki';
import PozostaleNarzedzia from '@/components/narzedzia/PozostaleNarzedzia';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import CytowalnoscGeoClient from './CytowalnoscGeoClient';

const SLUG = 'sprawdz-cytowalnosc-strony-ai';
const URL_PL = `${BASE}/narzedzia/sprawdz-cytowalnosc-strony-ai`;
const URL_EN = `${BASE}/en/tools/geo-citability-checker`;

const ZRODLA_PL = [
  { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal et al. (Princeton, Georgia Tech, Allen AI, KDD 2024): GEO - Generative Engine Optimization (wpływ statystyk, cytatów i struktury na widoczność w silnikach AI)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: Funkcje AI w wyszukiwarce (AI Overviews i AI Mode) a struktura treści witryny', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: OAI-SearchBot i pobieranie fragmentów źródeł w ChatGPT Search', data: '2026-11-22' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity Docs: Indeksowanie dokumentów HTML i cytowanie źródeł przez PerplexityBot', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal et al. (Princeton, Georgia Tech, Allen AI, KDD 2024): GEO - Generative Engine Optimization', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features (AI Overviews & AI Mode) and your website', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: OAI-SearchBot and source retrieval in ChatGPT Search', data: '2026-11-22' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity Docs: HTML document indexing and source attribution', data: '2026-11-22' },
];

const FAQ_PL = [
  {
    id: 'co-to-jest-cytowalnosc-geo',
    question: 'Czym różni się audyt cytowalności GEO od zwykłego sprawdzania słów kluczowych?',
    answer: 'Klasyczne narzędzia on-page liczą powtórzenia frazy kluczowej w całym artykule. Tymczasem Google AI Overviews, ChatGPT Search i Perplexity działają w architekturze RAG (Retrieval-Augmented Generation): dzielą dokument po nagłówkach H2/H3 na osobne wycinki i wybierają do odpowiedzi ten blok, który w 40-75 słowach podaje konkretną definicję, liczby, cennik lub tabelę porównawczą.',
  },
  {
    id: 'dlaczego-answer-first-40-75-slow',
    question: 'Dlaczego pierwszy akapit pod nagłówkiem H2 powinien mieć od 40 do 75 słów?',
    answer: 'Taki rozmiar mieści kompletną odpowiedź (co, ile kosztuje, od czego zależy, w jakim czasie) w jednym oknie ekstrakcji modelu i w klasycznym Featured Snippet Google. Gdy pod nagłówkiem H2 stoi 200-słowowy wstęp pełen przymiotników marketingowych, wektor podobieństwa semantycznego rozmywa się i silnik AI cytuje zwięźlejszą stronę konkurenta.',
  },
  {
    id: 'jak-zwiekszyc-gestosc-faktow',
    question: 'Co dokładnie mierzy wskaźnik gęstości faktów i jednostek?',
    answer: 'Analizator zlicza weryfikowalne punkty oparcia w tekście: kwoty z walutą, wartości procentowe, przedziały czasowe, jednostki miar, lata, normy branżowe oraz nazwy własne. W badaniu GEO (Princeton i Georgia Tech, KDD 2024) dodanie konkretnych statystyk i źródeł podnosiło widoczność źródła w odpowiedziach generatywnych o ponad 30%.',
  },
  {
    id: 'czy-tabele-html-pomagaja-ai',
    question: 'Czy tabele HTML są lepiej czytane przez modele AI niż grafiki lub bloki div?',
    answer: 'Tak. Semantyczna tabela <code>&lt;table&gt;</code> z nagłówkami <code>&lt;th&gt;</code> jednoznacznie łączy wiersz (np. pakiet lub technologię) z kolumną (np. ceną, czasem wdrożenia lub limitem). Obrazki z cennikiem lub wielopoziomowe siatki <code>&lt;div&gt;</code> tracą tę relację podczas parsowania surowego HTML przez boty AI.',
  },
  {
    id: 'czy-narzedzie-uzywa-platnego-llm',
    question: 'Czy ten audytor wysyła treść mojej strony do płatnych modeli AI?',
    answer: 'Nie. Analiza jest w 100% deterministyczna i powtarzalna: nasz parser rozkłada strukturę DOM, nagłówki H1-H3, listy, tabele, zagęszczenie liczb oraz znaczniki JSON-LD bez losowości halucynacji modelu. Jeśli chcesz dodatkowo sprawdzić żywe odpowiedzi 5 modeli na pytania klientów, skorzystaj z naszej darmowej sprawdzarki widoczności w AI.',
  },
];

const FAQ_EN = [
  {
    id: 'what-is-geo-citability-audit',
    question: 'How does a GEO citability audit differ from traditional keyword density tools?',
    answer: 'Legacy SEO graders count how many times an exact keyword appears on a page. Generative engines like Google AI Overviews, ChatGPT Search and Perplexity use Retrieval-Augmented Generation (RAG): they split HTML by H2/H3 headings into discrete passages and cite whichever passage delivers a self-contained 40-75 word answer backed by numbers, units and structured tables.',
  },
  {
    id: 'why-40-75-word-answer-first',
    question: 'Why should the opening paragraph below each H2 stay around 40-75 words?',
    answer: 'A 40-75 word Answer-First paragraph states the direct conclusion (price range, timeline, threshold or rule) inside a single retrieval chunk without context dilution. Pages that bury facts beneath 250-word promotional introductions score lower on passage cosine similarity and lose citations to tighter competitor blocks.',
  },
  {
    id: 'what-does-fact-density-measure',
    question: 'What counts toward the Fact, Number & Entity Density score?',
    answer: 'The analyzer measures verifiable anchors per 100 words: currency figures, percentages, time intervals, technical units, ISO/legal references, dates and named entities. In the KDD 2024 GEO benchmark (Princeton & Georgia Tech), adding concrete statistics and source citations lifted generative visibility by over 30%.',
  },
  {
    id: 'do-html-tables-help-ai-citations',
    question: 'Do semantic HTML tables outperform CSS grids or pricing images for AI?',
    answer: 'Yes. Native <code>&lt;table&gt;</code> markup with <code>&lt;thead&gt;</code> and <code>&lt;th&gt;</code> explicitly binds each entity row to its attribute column in raw HTML. Pricing screenshots and deeply nested <code>&lt;div&gt;</code> cards strip away row-column semantics when parsed by non-rendering AI crawlers.',
  },
  {
    id: 'is-geo-citability-score-deterministic',
    question: 'Is the GEO Citability Score deterministic?',
    answer: 'Yes, 100%. Running the same URL twice yields the exact same 0-100 score because our parser evaluates DOM structure, passage word counts, question headings, numeric density, tables and JSON-LD directly. To test live LLM brand mentions across 5 engines, pair this tool with our free AI Visibility Check.',
  },
];

export function CytowalnoscGeoStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'GEO Citability Checker: Audit Your Page for AI Overviews & ChatGPT'
    : 'Audytor cytowalności GEO: sprawdź, czy AI zacytuje Twoją podstronę');
  const okruszek = wpisRejestru?.okruszek || (en ? 'GEO Citability Checker' : 'Cytowalność strony w AI');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);
  const ilustracja = obrazKarty(SLUG, locale);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'GEO Citability Checker, AEO Checker & GEO Audit Tool' : 'Darmowy audyt GEO strony i audytor cytowalności bloków odpowiedzi'}
        description={en
          ? 'Free deterministic GEO audit tool and AEO checker: splits any web page by H2/H3 headings into RAG chunks, scores 6 AI citation factors (Answer-First, chunk length, fact density, question headings, tables, E-E-A-T schema) and compares 1:1 against a competitor.'
          : 'Darmowy audyt GEO strony: deterministycznie dzieli podstronę po nagłówkach H2/H3 na bloki RAG, ocenia 6 kryteriów cytowalności w AI (Answer-First, długość bloków, gęstość liczb, nagłówki pytające, tabele, schema) i porównuje 1:1 z konkurentem.'}
        url={en ? URL_EN : URL_PL}
        category="BusinessApplication"
        screenshot={ilustracja ? { url: ilustracja.src, width: ilustracja.width, height: ilustracja.height } : undefined}
        featureList={en
          ? [
              '0-100 deterministic GEO Citability Score across 6 RAG retrieval criteria',
              'Simulated AI Overview / ChatGPT answer snippet extracted from your page',
              '1:1 side-by-side passage comparison against any competitor URL',
              'H2/H3 chunk table showing word counts, citability ratings and diagnostic reasons',
              'Actionable rewrite checklist for Answer-First copywriting and HTML tables',
            ]
          : [
              'Deterministyczna ocena cytowalności GEO 0-100 w 6 kryteriach ekstrakcji RAG',
              'Symulacja wycinka odpowiedzi w Google AI Overview oraz ChatGPT Search',
              'Porównanie 1:1 bloków treści z dowolną podstroną konkurenta',
              'Tabela sekcji H2/H3 z liczbą słów, oceną cytowalności i diagnozą',
              'Lista konkretnych rekomendacji redakcyjnych Answer-First i danych JSON-LD',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="ai" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free GEO & Content Engineering Tool' : 'Darmowe narzędzie GEO i architektury treści'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Paste any service page or article URL to see how RAG engines split your H2/H3 sections, which passage gets quoted in AI Overviews and ChatGPT, and where a competitor beats your structure.'
              : 'Wklej adres podstrony ofertowej lub artykułu i zobacz w kilka sekund, jak silniki RAG dzielą Twoje nagłówki H2/H3 na bloki odpowiedzi, który fragment trafi do AI Overview i gdzie przegrywasz z konkurentem.'}
          </p>

          <CytowalnoscGeoClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'AI search engines (Google AI Overviews, ChatGPT Search, Perplexity and Claude) do not quote entire pages - they retrieve individual H2/H3 passages via RAG. Our free GEO audit tool and AEO checker verifies whether sections open with a direct 8-55 word Answer-First sentence inside a self-contained 40-180 word chunk, pack verifiable numbers, use HTML tables and declare E-E-A-T schema.'
                : 'Wyszukiwarki AI (Google AI Overviews, ChatGPT Search, Perplexity i Claude) nie cytują całych podstron naraz, lecz wycinają pojedyncze sekcje H2/H3 w procesie RAG. Nasz darmowy audyt GEO strony sprawdza, czy sekcje zaczynają się bezpośrednim zdaniem Answer-First (8-55 słów) w samodzielnym bloku 40-180 słów, podają liczby i tabele HTML oraz oznaczają autora w JSON-LD.'}
            </AnswerBox>
            <Byline sciezka="/narzedzia/sprawdz-cytowalnosc-strony-ai" takzeEn style={{ margin: '1.25rem 0 0' }} />
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      'Overall 0-100 GEO Citability Score plus 6 individual RAG criterion bars',
                      'Simulated AI Overview / ChatGPT snippet showing the exact passage models extract first',
                      'Optional 1:1 benchmark against a ranking competitor page across all 6 dimensions',
                      'Full H2/H3 passage table with word counts, scores and chunk-level diagnostics',
                      'Prioritized editorial fixes ready to hand over to your copywriter or SEO team',
                    ]
                  : [
                      'Ogólna ocena cytowalności GEO 0-100 oraz rozbicie na 6 pasków kryteriów RAG',
                      'Symulacja wycinka w AI Overview / ChatGPT pokazująca najlepszy blok ze strony',
                      'Opcjonalny pojedynek 1:1 z podstroną konkurenta we wszystkich 6 wymiarach',
                      'Pełna tabela sekcji H2/H3 z liczbą słów, oceną punktową i powodem diagnozy',
                      'Gotowa lista zadań redakcyjnych dla copywritera lub działu marketingu',
                    ]}
                przypis={en
                  ? 'Zero email gate and zero LLM randomness: deterministic DOM & passage analysis.'
                  : 'Zero bramki e-mail i zero losowości modeli: powtarzalna analiza struktury DOM i bloków odpowiedzi.'}
              >
                {ilustracja ? <ZrzutWyniku {...ilustracja} sizes="(max-width: 900px) 100vw, 860px" /> : null}
              </CoDostajesz>

              {en ? (
                <>
                  <Sekcja id="how-rag-chunking-picks-ai-citations" tytul="How RAG Chunking Chooses Which Website Gets Cited">
                    <p style={s.akapit}>
                      When a buyer asks ChatGPT or Google for a vendor comparison or price breakdown, the engine retrieves top candidate URLs and slices their HTML into smaller passages (chunks) anchored by <code>H2</code> and <code>H3</code> headings. Each chunk is scored independently against the user prompt:
                    </p>
                    <CompareTable
                      id="table-geo-criteria"
                      caption="The 6 on-page signals that separate cited RAG passages from ignored copy"
                      columns={[
                        { key: 'signal', label: 'GEO Signal' },
                        { key: 'weak', label: 'Ignored Marketing Copy' },
                        { key: 'strong', label: 'Citation-Ready RAG Block' },
                      ]}
                      rows={[
                        { id: 'answer-first', signal: 'Answer-First Lead', weak: '180-word company history before answering the question', strong: '8-55 word direct opening sentence with numbers right after H2/H3' },
                        { id: 'chunk-size', signal: 'Passage Length', weak: 'Single 900-word unsplit wall of text or 12-word stub', strong: 'Self-contained 40-180 word section per H2/H3' },
                        { id: 'facts', signal: 'Fact & Unit Density', weak: '"Affordable, fast, tailored high-quality services"', strong: '"EUR 450/mo net, 14-day setup, LCP <= 2.5 s"' },
                        { id: 'headings', signal: 'H2/H3 Phrasing', weak: '"Offer", "Why us", "Solutions"', strong: '"How much does B2B SEO cost?", "Next.js vs WordPress"' },
                        { id: 'tables', signal: 'Lists & Tables', weak: 'Pricing locked inside PNG/WebP graphics', strong: 'Semantic <table> and <ul>/<li> with clear labels' },
                        { id: 'eeat', signal: 'Authorship & Schema', weak: 'Anonymous page without date or structured data', strong: 'Named author, updated date and Article/Service JSON-LD' },
                      ]}
                      przypis="Based on KDD 2024 Generative Engine Optimization research and Google Search Central AI features documentation."
                    />
                    <p style={s.akapit}>
                      Combine passage engineering with external brand authority inside our{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>AI search optimization (GEO) service</Link>{' '}
                      and see the strategic differences in{' '}
                      <Link href="/porownania/seo-vs-geo" style={s.podkreslenie}>SEO vs GEO comparison</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="turning-service-pages-into-citation-magnets" tytul="3 Steps to Upgrade Commercial Pages for AI Overviews">
                    <ol style={s.lista}>
                      <li><strong>Open every H2 with the conclusion:</strong> State price ranges, timelines and eligibility in the first 50 words, then elaborate below.</li>
                      <li><strong>Convert prose comparisons into tables:</strong> Whenever you compare plans, technologies or contract models, add a clean <code>&lt;table&gt;</code>.</li>
                      <li><strong>Verify technical crawlability first:</strong> Even a 95/100 GEO page will not get cited if <code>OAI-SearchBot</code> is blocked - test access in our{' '}
                        <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={s.podkreslenie}>AI Crawler &amp; robots.txt Checker</Link>{' '}
                        and check live brand mentions in{' '}
                        <Link href="/sprawdz-widocznosc-w-ai" style={s.podkreslenie}>AI Visibility Check</Link>.
                      </li>
                    </ol>
                    <p style={s.akapit}>
                      Need our team to rewrite key money pages? Explore{' '}
                      <Link href="/copywriting-seo" style={s.podkreslenie}>SEO &amp; GEO copywriting</Link>{' '}
                      included in our monthly plans (see{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO pricing</Link>, from €{CENY.seoStandard.eur}/mo net).
                    </p>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="jak-silniki-rag-wybieraja-cytaty" tytul="Jak silniki RAG wybierają fragmenty stron do cytowania w AI">
                    <p style={s.akapit}>
                      Gdy klient pyta w ChatGPT, Perplexity albo Google o koszt usługi lub porównanie rozwiązań, wyszukiwarka pobiera kandydatów z indeksu i tnie ich HTML wzdłuż nagłówków <code>H2</code> i <code>H3</code> na niezależne wycinki (tzw. chunki RAG). Model ocenia każdy wycinek osobno:
                    </p>
                    <CompareTable
                      id="tabela-kryteria-geo"
                      caption="6 sygnałów odróżniających tekst ignorowany przez AI od bloku gotowego do cytatu"
                      columns={[
                        { key: 'sygnal', label: 'Kryterium GEO' },
                        { key: 'slaby', label: 'Tekst pomijany przez modele AI' },
                        { key: 'mocny', label: 'Blok gotowy do zacytowania (RAG)' },
                      ]}
                      rows={[
                        { id: 'answer-first', sygnal: 'Otwarcie Answer-First', slaby: '180 słów wstępu o historii firmy przed podaniem konkretu', mocny: 'Zwięzłe pierwsze zdanie 8-55 słów z liczbami zaraz pod H2/H3' },
                        { id: 'dlugosc', sygnal: 'Długość sekcji', slaby: 'Ściana tekstu na 900 słów bez H3 albo jednozdaniowy ogólnik', mocny: 'Samodzielny blok 40-180 słów pod każdym nagłówkiem H2/H3' },
                        { id: 'fakty', sygnal: 'Gęstość faktów', slaby: '„Elastyczna oferta, najwyższa jakość i szybkie terminy”', mocny: '„Od 1 900 zł netto/mies., wdrożenie w 14 dni, LCP <= 2,5 s”' },
                        { id: 'naglowki', sygnal: 'Nagłówki H2/H3', slaby: '„Oferta”, „Dlaczego my”, „Nasze atuty”', mocny: '„Ile kosztuje pozycjonowanie B2B?”, „Next.js czy WordPress”' },
                        { id: 'tabele', sygnal: 'Listy i tabele', slaby: 'Cennik zamknięty na obrazku PNG bez tekstu w DOM', mocny: 'Semantyczna tabela <table> oraz wypunktowania <ul>/<li>' },
                        { id: 'eeat', sygnal: 'Autor i JSON-LD', slaby: 'Anonimowy wpis bez daty aktualizacji i bez Schema', mocny: 'Imienny autor, data aktualizacji oraz spójny graf JSON-LD' },
                      ]}
                      przypis="Na podstawie badania GEO (Aggarwal et al., KDD 2024) oraz dokumentacji Google Search Central dot. funkcji AI."
                    />
                    <p style={s.akapit}>
                      Jak łączymy inżynierię treści z budową autorytetu poza stroną, przeczytasz w opisie usługi{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>pozycjonowanie w AI (GEO)</Link>{' '}
                      oraz w zestawieniu{' '}
                      <Link href="/porownania/seo-vs-geo" style={s.podkreslenie}>SEO vs GEO - czym się różnią</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="jak-poprawic-cytowalnosc-podstrony" tytul="3 kroki przebudowy podstrony ofertowej pod AI Overviews i ChatGPT">
                    <ol style={s.lista}>
                      <li><strong>Zaczynaj każdą sekcję H2 od wniosku:</strong> Podaj widełki cenowe, czas realizacji i warunki w pierwszych 50 słowach, a szczegóły rozwiń niżej.</li>
                      <li><strong>Zamień długie opisy wariantów na tabelę HTML:</strong> Zestawienia pakietów, parametrów i technologii w znaczniku <code>&lt;table&gt;</code> są najchętniej cytowane w przeglądach AI.</li>
                      <li><strong>Upewnij się, że boty AI widzą Twój HTML:</strong> Nawet wynik 95/100 nie zadziała, jeśli zapora blokuje <code>OAI-SearchBot</code> - zweryfikuj to w naszym{' '}
                        <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={s.podkreslenie}>testerze robotów AI i SSR</Link>{' '}
                        i sprawdź realne odpowiedzi modeli w narzędziu{' '}
                        <Link href="/sprawdz-widocznosc-w-ai" style={s.podkreslenie}>sprawdź widoczność w AI</Link>.
                      </li>
                    </ol>
                    <p style={s.akapit}>
                      Tworzenie tekstów w standardzie Answer-First z weryfikacją faktów realizujemy w usłudze{' '}
                      <Link href="/copywriting-seo" style={s.podkreslenie}>copywriting SEO</Link>, wliczonej w miesięczne pakiety (zobacz{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>, od {cena('seoStandard')} netto/mies.).
                    </p>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/sprawdz-cytowalnosc-strony-ai" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/sprawdz-cytowalnosc-strony-ai" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: GEO Citability & Answer Blocks' : 'Najczęstsze pytania o cytowalność GEO i strukturę Answer-First'}
        sectionId="pytania"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={zrodla} {...(en ? { en: true } : {})} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default CytowalnoscGeoStrona;
