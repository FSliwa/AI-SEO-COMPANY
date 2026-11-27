// Artykuł EN „How long does SEO take?” (18.11.2026, zadanie nowa-en; klaster howlong z seo/frazy-en.csv).
// Fraza główna: „how long does seo take” (US 390 / GB 90 dla wariantu „…to work”; klaster pytań ok. 796).
// Artykuł tylko po angielsku (enOnly w lib/blogPosts.js): w polskich frazach popyt na „ile trwa
// pozycjonowanie” to 30 wyszukiwań miesięcznie i odpowiada na nie FAQ na /pozycjonowanie-stron-internetowych.
// Dane własne: przebiegi z Google Search Console czterech serwisów już opublikowanych na stronie
// (lib/jakDlugoSeo.js liczy je z lib/realizacjeGsc.js). Zdanie o celu TOP 3 w 2-3 miesiące jest
// dosłownie jak na /seo-lokalne-warszawa (wersja EN FAQ); nie zmieniać.
// Rejestr (blogPosts, sitemapa, llms.txt, linki wchodzące): ai-seo-prace/airslate/nowa-en/REJESTR.md.
import { articleLanguages, articleRobots } from '@/lib/blogPosts';
import { metadataDe } from '@/lib/stronyDe';
import BlogArtikelDe from '@/components/de/BlogArtikelDe';
import { BLOG_WIE_LANGE_DE } from '@/lib/de/blogWieLangeDauertSeo';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleSchema from '@/components/ArticleSchema';
import ArticleTOC from '@/components/ArticleTOC';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import Zrodla from '@/components/Zrodla';
import CompareTable from '@/components/CompareTable';
import BlogCTA from '@/components/BlogCTA';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { MADAME_THAI, STANIAX, ASE_BOT, TQL, liczba } from '@/lib/jakDlugoSeo';

const BASE = 'https://www.ai-seo-company.pl';
const SLUG = '/blog/how-long-does-seo-take';
const URL_EN = `${BASE}/en${SLUG}`;
const DATA = '2026-11-18';

const TYTUL = 'How long does SEO take? Real client timelines, 2026';
const OPIS = 'How long does SEO take? Google’s own timing statements, an Ahrefs study and Search Console timelines of four sites we work on.';
const H1 = 'How long does SEO take? What Google says and what our client data shows';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe(SLUG, { languages: { en: URL_EN } });
  }
  return {
    title: TYTUL,
    description: OPIS,
    alternates: {
      // Artykuł enOnly: kanoniczny jest adres angielski w obu wersjach językowych trasy.
      canonical: URL_EN,
      languages: articleLanguages(SLUG, `${BASE}${SLUG}`, URL_EN),
    },
    robots: articleRobots(SLUG, locale),
  };
}

const FAQ = [
  {
    q: 'How long does SEO take to work?',
    a: 'Google says some changes take effect within a few hours and others take several months. In our experience the first movement in impressions shows within days to weeks, first visible growth comes 4 to 8 weeks after technical optimization, and stable high positions for very competitive national keywords usually take 3 to 6 months.',
  },
  {
    q: 'How long does it take for SEO to take effect?',
    a: 'Some changes show within days, but stable positions for competitive keywords usually take 3 to 6 months in our client data, while first impressions in Google Search Console arrived within days.',
  },
  {
    q: 'How long does SEO take for a new website?',
    a: 'Longer than for an established one. Ahrefs found that only 1.74% of newly published pages reached the top 10 within a year in a sample of 1 million URLs from September 2023, and a second method gave 6.11%. In our four published cases, a new site had impressions within days, but clicks grew far more slowly than impressions.',
  },
  {
    q: 'Can SEO show results in one month?',
    a: 'Partly. In the first month you can expect indexing, first impressions and the first queries in Google Search Console, not a stable ranking. Ahrefs reports that 40.82% of pages that did reach the top 10 got there within their first month, but most pages never get there. Treat month one as setup and measurement.',
  },
  {
    q: 'How long does it take Google to index a new page?',
    a: 'Google’s documentation says crawling can take anywhere from a few days to a few weeks, and that asking for a recrawl does not guarantee inclusion in results. Indexing is the first step of the timeline, and it is separate from ranking.',
  },
  {
    q: 'Do you guarantee a ranking after a set number of months?',
    a: 'We do not guarantee position 1, because Google’s algorithm decides the rankings. Our commitment for agreed local keywords is a TOP 3 goal within 2-3 months: you track progress weekly in the client portal, and if we miss it after 3 months, the next month is on us.',
  },
  {
    q: 'Is SEO worth it if it takes months?',
    a: 'It is a long-term channel: you wait longer than with ads, but you do not pay for every click. Whether it pays off depends on the lifetime value of a customer in your market and on how competitive your keywords are. We compare it with Google Ads, using our own campaign data, on a separate page.',
  },
];

const TOC = [
  { id: 'how-long-does-seo-take-to-work', title: 'How long does SEO take to work?' },
  { id: 'how-long-for-seo-to-take-effect', title: 'How long does it take for SEO to take effect?' },
  { id: 'what-google-says', title: 'What does Google say about how long SEO takes?' },
  { id: 'new-website', title: 'How long does SEO take for a new website?' },
  { id: 'indexing', title: 'How long does Google take to index a new page?' },
  { id: 'what-changes-the-timeline', title: 'What makes SEO faster or slower?' },
  { id: 'how-to-tell-it-works', title: 'How can you tell SEO is working before rankings move?' },
  { id: 'is-seo-worth-it', title: 'Is SEO worth it if it takes months?' },
  { id: 'faq', title: 'Questions about how long SEO takes' },
  { id: 'zrodla', title: 'Sources' },
];

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO Starter Guide', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl', nazwa: 'Google Search Central: Ask Google to recrawl your URLs', data: '2026-11-18' },
  { url: 'https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/', nazwa: 'Ahrefs: How Long Does It Take to Rank in Google? (15 May 2025)', data: '2026-11-18' },
  { url: 'https://search.google.com/search-console', nazwa: 'Google Search Console API: the source of our verified 3-month client series published in our portfolio', data: '2026-11-20' },
];

export default async function ArticleHowLongDoesSeoTake({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <BlogArtikelDe klucz={SLUG} dane={BLOG_WIE_LANGE_DE} />;
  const hrefPorownanie = hrefJesliOpublikowana('/porownania/seo-czy-google-ads');
  const hrefAutorytet = hrefJesliOpublikowana('/narzedzia/autorytet-domeny');

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${URL_EN}#faq`,
    inLanguage: 'en',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs parent={{ href: '/blog', pl: 'Blog', en: 'Blog', de: 'Blog' }} pl="How long does SEO take? Real client timelines, 2026" en="How long does SEO take? Real client timelines, 2026" />
      <ArticleSchema breadcrumb={null}
        slug={SLUG}
        locale="en"
        url={`/en${SLUG}`}
        title={TYTUL}
        description={OPIS}
        datePublished={DATA}
        dateModified={DATA}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article style={{ paddingTop: 'clamp(20px, 3vw, 36px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
              SEO basics
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 500, color: 'var(--w-tusz)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
            {H1}
          </h1>
          <Byline sciezka={SLUG} takzeEn />
          <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '1.5rem' }}></div>

          <div className="article-content">
              <AnswerBox etykieta="Short answer">
                How long does SEO take? Google says some changes take effect within hours and others need several months, and advises waiting a few weeks before judging results. In our client data, the first impressions arrived within days; stable high positions for competitive keywords usually take 3 to 6 months.
              </AnswerBox>

              <p className="lead">
                There is no single number, because the answer depends on what you measure: indexing, first impressions, clicks or a stable position. Below we separate those stages, quote what Google itself says, and add something most guides lack: the Search Console timelines of four sites we work on, with the numbers as they are, including the flat parts.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="how-long-does-seo-take-to-work">How long does SEO take to work?</h2>
              <p>
                It takes weeks to see the first signals and months to see results that bring customers. The table shows the timeframes we give clients for different goals. They are our own expectations from practice, not promises, except for the goal in the fourth row.
              </p>
              <div className="tabela-artykulu">
              <CompareTable
                id="timeframes-by-goal"
                caption="Timeframes we give clients, by goal"
                columns={[{ key: 'cel', label: 'Goal' }, { key: 'czas', label: 'Timeframe we state' }, { key: 'gdzie', label: 'Where we say it' }]}
                rows={[
                  { id: 'gbp', cel: 'First calls and enquiries from an optimized Google Business Profile', czas: '2-4 weeks', gdzie: <Link href="/seo-lokalne-warszawa">Local SEO in Warsaw</Link> },
                  { id: 'tech', cel: 'First visible growth in visibility after technical optimization', czas: '4-8 weeks', gdzie: <Link href="/pozycjonowanie-stron-internetowych">Website SEO service</Link> },
                  { id: 'site', cel: 'Whole-site improvement; the biggest return usually after month six', czas: '3-9 months, depending on competition', gdzie: <Link href="/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026">SEO pricing guide</Link> },
                  { id: 'top3', cel: 'Agreed local keywords in the TOP 3 (our goal)', czas: '2-3 months', gdzie: 'Local SEO in Warsaw' },
                  { id: 'nat', cel: 'Stable high positions for very competitive national keywords', czas: '3 to 6 months', gdzie: 'Website SEO service' },
                ]}
                przypis="Source: the timeframes stated on our own pages, as of 18 November 2026. Timeframes depend on competition, the starting state of the site and the scope of work."
              />
              </div>
              <p>
                The goal for agreed local keywords is a TOP 3 within 2-3 months: you track progress weekly in the client portal, and if we miss it after 3 months, the next month is on us. We do not promise position 1, because Google decides the rankings.
              </p>

              <h2 id="how-long-for-seo-to-take-effect">How long does it take for SEO to take effect?</h2>
              <p>
                Some changes show within days, but stable positions for competitive keywords usually take 3 to 6 months in our client data, while first impressions in Google Search Console arrived within days. Technical fixes such as removing an accidental <code>noindex</code> tag or fixing broken redirects can take effect as soon as Google recrawls the URL, whereas new content and editorial links build ranking strength gradually over months.
              </p>

              <h2 id="what-google-says">What does Google say about how long SEO takes?</h2>
              <p>
                Google gives no fixed number, and says so. In its SEO Starter Guide, Google writes that every change you make takes some time to be reflected on its end, that some changes might take effect in a few hours and others could take several months, and that in general you likely want to wait a few weeks to assess whether your work had beneficial effects in Google Search results.
              </p>
              <p>
                Two practical consequences follow. First, do not judge an optimization after a few days. Second, when you change several things at once you will not know which one worked, so keep a dated log of changes and compare it with Search Console.
              </p>

              <h2 id="new-website">How long does SEO take for a new website?</h2>
              <p>
                Longer than for an established site, and the independent data is sobering. Ahrefs (article dated 15 May 2025) found that 1.74% of newly published pages reached the top 10 within a year in a sample of 1 million random URLs seen in September 2023. A second method, on 2 million URLs created in October 2023, gave 6.11%, which the authors consider the fairer figure. The average page ranking first was 5 years old, and 72.9% of top-10 pages were more than 3 years old. Ahrefs also reports that 40.82% of pages that reached the top 10 did so in their first month, so speed is possible but unusual.
              </p>
              <p>
                For software companies, the order of work for a young domain is laid out in our <Link href="/blog/seo-for-saas-startups-playbook">SEO for SaaS startups playbook</Link>. Our own sites show the same pattern on a smaller scale. The table lists four sites whose live Google Search Console API data ({STANIAX.metryki.startDate} to {STANIAX.metryki.endDate}, {STANIAX.metryki.days} days across 13 weekly buckets) is published in our portfolio. Two caveats: a 3-month window captures compounding momentum rather than a finished year, and impressions move faster than clicks.
              </p>
              <div className="tabela-artykulu">
              <CompareTable
                id="client-timelines"
                caption={`Live Search Console 3-month timelines (${STANIAX.metryki.startDate} to ${STANIAX.metryki.endDate})`}
                columns={[{ key: 'site', label: 'Site and 92-day window' }, { key: 'early', label: 'Start of 3-month window' }, { key: 'end', label: 'Latest week & 92-day total' }]}
                minWidth={620}
                rows={[
                  {
                    id: 'mt',
                    site: `Madame Thai, restaurant location (${MADAME_THAI.metryki.startDate} to ${MADAME_THAI.metryki.endDate})`,
                    early: `First week (${MADAME_THAI.tydzien1[0]} to ${MADAME_THAI.tydzien1[1]}): ${liczba(MADAME_THAI.tydzien1[3])} impressions and ${liczba(MADAME_THAI.tydzien1[2])} clicks`,
                    end: `Latest week: ${liczba(MADAME_THAI.ostatni[3])} impressions and ${liczba(MADAME_THAI.ostatni[2])} clicks; 92-day total ${liczba(MADAME_THAI.razem[1])} impressions, ${liczba(MADAME_THAI.razem[0])} clicks (avg. position ${MADAME_THAI.metryki.position})`,
                  },
                  {
                    id: 'st',
                    site: `Staniax, B2B industrial site (${STANIAX.metryki.startDate} to ${STANIAX.metryki.endDate})`,
                    early: `First week (${STANIAX.tydzien1[0]} to ${STANIAX.tydzien1[1]}): ${liczba(STANIAX.tydzien1[3])} impressions and ${STANIAX.tydzien1[2]} clicks`,
                    end: `Latest week: ${liczba(STANIAX.tydzien13[3])} impressions and ${STANIAX.tydzien13[2]} clicks; 92-day total ${liczba(STANIAX.razem[1])} impressions and ${liczba(STANIAX.razem[0])} clicks (${STANIAX.minKlikTyg}-${STANIAX.maxKlikTyg} clicks/week, avg. position ${STANIAX.metryki.position})`,
                  },
                  {
                    id: 'tql',
                    site: `TQL, ISO standards consultancy (${TQL.metryki.startDate} to ${TQL.metryki.endDate})`,
                    early: `First week (${TQL.pierwszyTydzien[0]} to ${TQL.pierwszyTydzien[1]}): ${liczba(TQL.pierwszyTydzien[3])} impressions and ${TQL.pierwszyTydzien[2]} clicks`,
                    end: `Latest week: ${liczba(TQL.ostatniTydzien[3])} impressions and ${TQL.ostatniTydzien[2]} clicks; 92-day total ${liczba(TQL.razemWysw)} impressions and ${liczba(TQL.razemKlik)} clicks (avg. position ${TQL.metryki.position})`,
                  },
                  {
                    id: 'ase',
                    site: `ASE-BOT, our own project in a competitive US niche (${ASE_BOT.metryki.startDate} to ${ASE_BOT.metryki.endDate})`,
                    early: `Peak week (${ASE_BOT.szczyt[0]} to ${ASE_BOT.szczyt[1]}): ${liczba(ASE_BOT.szczyt[3])} impressions`,
                    end: `Latest week: ${liczba(ASE_BOT.ostatni[3])} impressions; 92-day total ${liczba(ASE_BOT.razem[1])} impressions and ${ASE_BOT.razem[0]} clicks (avg. position ${ASE_BOT.metryki.position})`,
                  },
                ]}
                przypis={`Source: Google Search Console API for the verified properties named (${STANIAX.metryki.startDate} to ${STANIAX.metryki.endDate}, web search).`}
              />
              </div>
              <p>
                What this shows. Local intent moves fastest: Madame Thai reached {liczba(MADAME_THAI.razem[0])} clicks at an average position of {MADAME_THAI.metryki.position} over the 92-day window. B2B niches compound steadily once pages enter page one: Staniax improved from positions 17-20 in its early summer quarter to an average position of {STANIAX.metryki.position} ({liczba(STANIAX.razem[0])} clicks, {STANIAX.minKlikTyg} to {STANIAX.maxKlikTyg} clicks a week), while TQL moved from an initial 18-day average position of 34.6 in August to {TQL.metryki.position} across {liczba(TQL.razemWysw)} impressions and {TQL.razemKlik} clicks. ASE-BOT is the reminder that competitive English-language niches take longer and do not move in a straight line ({liczba(ASE_BOT.razem[1])} impressions at average position {ASE_BOT.metryki.position}).
              </p>

              <h2 id="indexing">How long does Google take to index a new page?</h2>
              <p>
                Google’s documentation says crawling can take anywhere from a few days to a few weeks, and that requesting a crawl does not guarantee inclusion in search results, instantly or at all. Indexing is only the first step. A page can be indexed and still sit on page five, which is why we track indexing, impressions and position as three separate lines.
              </p>

              <h2 id="what-changes-the-timeline">What makes SEO faster or slower?</h2>
              <ul>
                <li><strong>Competition.</strong> A specific local query moves sooner than a broad national one. This is why we quote 2-3 months for agreed local keywords and 3 to 6 months for very competitive national ones.</li>
                <li><strong>Site history.</strong> A domain with history starts from a higher base. A new domain has to earn trust first, which Ahrefs’ figures above illustrate.</li>
                <li><strong>Technical state.</strong> Crawling errors, slow pages and wrong canonical tags delay everything else. That is why the first weeks usually go to an <Link href="/audyt-seo">SEO audit</Link> and fixes.</li>
                <li><strong>Content.</strong> Pages that answer the real query, one topic per URL, rank sooner than thin or overlapping pages.</li>
                <li><strong>Links.</strong> Links from relevant sites are a slow part of the work, because earning them takes outreach and publication time. Our <Link href="/link-building">link building services</Link> are part of the SEO packages for this reason.</li>
              </ul>

              <h2 id="how-to-tell-it-works">How can you tell SEO is working before rankings move?</h2>
              <p>
                Watch the leading signals in Google Search Console in this order: pages indexed, impressions, the number of distinct queries you appear for, average position, and only then clicks. The table above shows why: impressions moved within days, clicks months later. If you do not see growth in impressions after a few weeks, that is the moment to check indexing and content, not to wait for another quarter. Ahrefs suggests considering an update for a page still outside the top 10 after about 6 months, because its chances are low without changes.
              </p>
              <p>
                In our packages you see this without logging in to Search Console: the <Link href="/panel-klienta">client portal</Link> shows Google data and a work log 24/7, and you get a monthly report of positions and traffic. {hrefAutorytet && <>To see where your domain stands on links before you start, try our free <Link href={hrefAutorytet}>domain authority checker</Link>.</>}
              </p>

              <h2 id="is-seo-worth-it">Is SEO worth it if it takes months?</h2>
              <p>
                That depends on what a customer is worth to you and on what you would pay for the same traffic in ads. SEO costs you time up front and then does not bill per click; ads start at once and stop when the budget stops.
                {hrefPorownanieOrEmpty(hrefPorownanie)} Our packages start at €450 net a month on a monthly contract with cancellation at any time, so you can judge the first months on data before committing to a longer plan. Find out <Link href="/cennik-pozycjonowania">how much does SEO cost</Link> with us, package by package, and use the <Link href="/narzedzia/kalkulator-strat-seo">SEO ROI calculator</Link> to put your own numbers on the wait. Before you pick an agency, read the <Link href="/porownania">SEO comparisons</Link>.
              </p>

              <h2 id="faq">Questions about how long SEO takes</h2>
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}

              <Zrodla zrodla={ZRODLA} en />

              <BlogCTA locale={locale} currentSlug={SLUG} klaster="ceny" />
          </div>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}

// Zdanie z linkiem do porównania SEO i Google Ads dopiero po publikacji tej strony (reguła 6.0: bez linku do 404).
function hrefPorownanieOrEmpty(href) {
  if (!href) return null;
  return (
    <>
      {' '}We compare the two channels, with the cost per click from our own campaign, in <Link href={href}>SEO or Google Ads</Link>.
    </>
  );
}
