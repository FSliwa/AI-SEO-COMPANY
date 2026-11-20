// Wersje angielskie P7-P9 (19.11.2026):
//   - P7_METRYKI_EN: /en/comparisons/ahrefs-dr-vs-moz-da-vs-common-crawl
//   - P8_PLIKI_EN:   /en/comparisons/llms-txt-vs-robots-txt-vs-sitemap-xml
//   - P9_INHOUSE_EN: /en/comparisons/in-house-seo-vs-agency

import { hrefWJezykuJesliOpublikowana } from './linkiEn';
import { AUTORYTET, GENERATOR } from './narzedziaLiczby';

const L = 'en';
const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function zdanieJesli(sciezkaPl, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(sciezkaPl, L);
  return h ? zdanie(h) : '';
}

// --- P7 EN: Ahrefs DR vs Moz DA vs Common Crawl -------------------------------------------------

export const P7_METRYKI_EN = {
  slug: 'ahrefs-dr-vs-moz-da-vs-common-crawl',
  title: 'Ahrefs DR vs Moz DA vs Common Crawl: Metric Comparison',
  description: 'Ahrefs Domain Rating, Moz Domain Authority and our 0-100 Common Crawl graph score compared on data source, formula, 441-domain correlation and cost.',
  h1: 'Ahrefs Domain Rating (DR) vs Moz Domain Authority (DA) vs Common Crawl: what each score actually measures',
  okruszek: 'Ahrefs DR vs Moz DA vs Common Crawl',
  nazwaKarty: 'Ahrefs DR vs Moz DA vs Common Crawl',
  teaser: 'Three 0-100 scales built on three different link graphs and formulas. Here is how they correlate across 441 domains and why small sites diverge.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'Ahrefs DR, Moz DA or a Common Crawl score?', skrot: 'Link database, formula transparency, correlation and cost' },
  tag: 'Authority metric comparison',
  ujawnienie: 'We publish a free 0-100 domain authority checker built on the public Common Crawl graph. We are not affiliated with Ahrefs, Moz or Common Crawl and use no Ahrefs or Moz data.',
  zrodlaDanych: `Data: Ahrefs DR and Moz DA documentation, Common Crawl release ${AUTORYTET.wydanie} (135.0M domains, 1.8B edges) and our 441-domain correlation test against Moz Top 500 (November 12, 2026).`,
  answer: 'Google uses none of these three scores in its ranking systems. Ahrefs Domain Rating (DR) measures relative backlink strength inside Ahrefs’ commercial index, Moz Domain Authority (DA) is a machine-learning model predicting SERP performance, and our 0-100 score measures a domain’s position inside the open Common Crawl web graph (135M domains) using the public formula min(harmonic centrality, PageRank). Never compare raw numbers across tools directly.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-dr-da-cc',
  tableCaption: 'Ahrefs DR, Moz DA and our Common Crawl graph score across 8 technical and cost criteria',
  tablePrzypis: `Sources: Ahrefs Help (“What is Domain Rating”), Moz (“What is Domain Authority”), Common Crawl Web Graphs (${AUTORYTET.wydanie}, read Nov 12, 2026) and our own empirical calibration. Trademarks belong to their respective owners.`,
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'dr', label: 'Ahrefs Domain Rating (DR)' },
    { key: 'da', label: 'Moz Domain Authority (DA)' },
    { key: 'cc', label: 'Our Common Crawl score (cc-hcpr-v1)' },
  ],
  rows: [
    { id: 'uzywa-google', kryterium: 'Used directly by Google Search?', dr: 'No (third-party Ahrefs metric)', da: 'No (third-party Moz metric)', cc: 'No (third-party score from the public web graph)' },
    { id: 'co-mierzy', kryterium: 'What the 0-100 scale measures', dr: 'Relative strength of a domain’s followed backlink profile', da: 'Machine-learning prediction of how likely a domain is to rank in SERPs', cc: 'Network centrality: the lower of harmonic centrality percentile and PageRank percentile' },
    { id: 'baza', kryterium: 'Underlying link data source', dr: 'Proprietary commercial crawler (AhrefsBot)', da: 'Proprietary commercial link index (Moz DotBot)', cc: `Open Common Crawl domain graph (${AUTORYTET.wydanie}: 135.0M domains, 1.8B edges)` },
    { id: 'wzor', kryterium: 'Formula transparency', dr: 'High-level explanation published; exact normalization proprietary', da: 'Proprietary ML model combining linking root domains and other signals', cc: '100% open formula (cc-hcpr-v1) documented step by step on the tool page' },
    { id: 'odswiezanie', kryterium: 'Update cadence', dr: 'Continuous in Ahrefs’ cloud index', da: 'Continuous in Moz’s index', cc: 'Quarterly with each new 3-month Common Crawl web graph release' },
    { id: 'poziom-url', kryterium: 'Page-level backlinks, anchors and nofollow flags', dr: 'Yes in paid plans (and for verified own sites in AWT)', da: 'Yes in Moz Link Explorer', cc: 'No - domain-level graph only (plus referring domain count for .pl domains)' },
    { id: 'odpornosc', kryterium: 'Resistance to artificial link-wheel inflation', dr: 'Proprietary spam filters, though historically targeted by cheap tiered link sellers', da: 'ML model + separate Spam Score indicator', cc: 'min(HC, PR) cap: inflating one centrality signal alone cannot push the score up' },
    { id: 'koszt', kryterium: 'Cost to benchmark your domain + 3 competitors', dr: 'Single check free; multi-domain workflows require a paid plan', da: 'Limited free queries after creating a Moz account', cc: `Free with no account and no email (up to ${AUTORYTET.limitIp} domains/day per IP)` },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Three 0-100 authority metrics side by side: DR, DA and Common Crawl',
      html: '<p>“Domain authority” is often quoted as if there were a single universal thermometer for websites. In practice, each provider crawls a different slice of the web and applies a different mathematical model. The table compares Ahrefs DR, Moz DA and our open <code>cc-hcpr-v1</code> score across eight criteria.</p>',
      tabela: 'glowna',
    },
    {
      id: 'nasz-pomiar-441-domen',
      h2: 'Our empirical test: 441 Moz Top 500 domains and why smaller sites diverge',
      html: [
        '<p>On November 12, 2026 we matched <strong>441 root domains</strong> from the public Moz Top 500 list against our <code>cc-main-2026-aug-sep-oct</code> graph scores. Spearman rank correlations show clearly why numbers cannot be converted across tools:</p>',
        '<ul>',
        '<li>our <code>min(HC, PR)</code> score correlated at <strong>0.57</strong> with <strong>Moz linking root domains</strong>;</li>',
        '<li>our score correlated at <strong>0.37</strong> with <strong>Moz Domain Authority (DA)</strong>;</li>',
        '<li>raw Common Crawl PageRank alone reached a <strong>0.72</strong> correlation with Moz DA, yet we deliberately cap it via <code>min(harmonic centrality, PageRank)</code> because standalone PageRank is far easier to game with closed link rings.</li>',
        '</ul>',
        '<p>Smaller websites diverge even more. On November 11, 2026 we checked <strong>four service-business domains</strong> that all scored <strong>9</strong> in our Common Crawl graph; on the same day their Ahrefs DR ranged from <strong>0 to 54</strong>, because commercial SEO crawlers revisit niche directories more aggressively than a quarterly public crawl and apply a different curve.</p>',
        zdanieJesli('/narzedzia/autorytet-domeny', (h) => `<p>Benchmark your domain against up to three competitors on the exact same scale in our ${a(h, 'free domain authority checker')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-ktore-narzedzie',
      h2: 'Which metric to use for which SEO decision',
      html: [
        '<ul>',
        '<li><strong>Quick competitor gap check without a subscription:</strong> compare your domain and the top 3 ranking competitors inside one consistent tool. What matters is the gap between you and your SERP neighbours, not the absolute number.</li>',
        '<li><strong>Granular backlink audit (anchors, lost links, redirects):</strong> use a page-level commercial index (Ahrefs, Semrush, Majestic) together with the free Links report inside Google Search Console for your own verified property.</li>',
        '<li><strong>Evaluating outreach targets:</strong> never buy placements purely for “DR 50+”. Check whether the publication earns real organic traffic in Google and label paid placements with <code>rel="sponsored"</code> in line with Google’s spam policies.</li>',
        '</ul>',
        zdanieJesli('/link-building', (h) => `<p>See how we vet editorial publications inside our ${a(h, 'white-hat link building services')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about Ahrefs DR, Moz DA and Common Crawl',
  faq: [
    {
      question: 'Will raising my DR or DA automatically improve my Google rankings?',
      answer: 'No. Google representatives have stated repeatedly that Google does not use Ahrefs DR or Moz DA. Chasing an inflated third-party metric through cheap directory or PBN links rarely produces a single Search Console click and risks violating Google’s link spam policies.',
    },
    {
      question: 'Why does my website have DR 25 in Ahrefs and 9 in Common Crawl?',
      answer: 'They measure different link graphs with different formulas. Common Crawl’s quarterly release covers 135M domains from a public crawl sample and takes the lower of two centrality signals, whereas Ahrefs runs a commercial crawler tuned for backlink discovery. Always compare yourself with competitors inside the same tool.',
    },
    {
      question: 'Where can I see the links Google actually knows about?',
      answer: 'For a domain you own, open the Links report in Google Search Console. It is free first-party data showing top linked pages, top linking sites and anchor text, without collapsing everything into a single 0-100 vanity number.',
    },
    {
      question: 'Does blocking CCBot in my robots.txt lower my Common Crawl authority score?',
      answer: 'No. Domain-graph centrality is computed from links on external websites pointing to your domain. Blocking CCBot on your own domain does not erase incoming links found on other sites.',
    },
  ],
  sources: [
    { url: 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr', nazwa: 'Ahrefs Help Center: What is Domain Rating (DR)?', data: '2026-11-12' },
    { url: 'https://moz.com/learn/seo/domain-authority', nazwa: 'Moz: What is Domain Authority (DA)?', data: '2026-11-12' },
    { url: 'https://moz.com/top500', nazwa: 'Moz Top 500 Websites (441-domain correlation sample)', data: '2026-11-12' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: `Common Crawl: Host- and Domain-Level Web Graphs (${AUTORYTET.wydanie})`, data: '2026-11-12' },
    { url: 'https://arxiv.org/abs/1308.2140', nazwa: 'Paolo Boldi & Sebastiano Vigna: Axioms for Centrality (Internet Mathematics, 2014)', data: '2026-11-12' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search (link spam & rel="sponsored")', data: '2026-11-19' },
  ],
  zrodlaWewnetrzne: ['components/narzedzia/AutorytetStrona.jsx', 'lib/narzedziaLiczby.js'],
  aiQuestions: [],
  cta: {
    tekst: 'Want a full technical and backlink gap review against your top Google competitors?',
    plan: 'audyt',
    linki: [
      { tekst: 'Run the free domain authority checker (0-100)', href: '/narzedzia/autorytet-domeny' },
      { tekst: 'See what our full SEO audit covers', href: '/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Domain authority metrics in SEO' }],
};

// --- P8 EN: llms.txt vs robots.txt vs sitemap.xml -----------------------------------------------

export const P8_PLIKI_EN = {
  slug: 'llms-txt-vs-robots-txt-vs-sitemap-xml',
  title: 'llms.txt vs robots.txt vs sitemap.xml: Roles Compared',
  description: 'llms.txt vs robots.txt vs sitemap.xml: which file blocks AI crawlers, which feeds Google indexing, and what our 17-bot HTTP test showed.',
  h1: 'llms.txt vs robots.txt vs sitemap.xml: what each file actually controls in Google and AI search',
  okruszek: 'llms.txt vs robots.txt vs sitemap.xml',
  nazwaKarty: 'llms.txt vs robots.txt vs sitemap.xml',
  teaser: 'One file governs crawler access, one lists canonical URLs for search indexing, and one is an optional Markdown index. Here is what Google and AI bots actually read.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'llms.txt, robots.txt or sitemap.xml?', skrot: 'AI bot control, Google indexing and real support' },
  tag: 'Technical SEO & GEO file comparison',
  ujawnienie: 'We offer a free llms.txt generator, so we state plainly up front: llms.txt does not improve Google rankings and never replaces robots.txt or an XML sitemap.',
  zrodlaDanych: 'Data: RFC 9309 (robots.txt), sitemaps.org, llmstxt.org (v2), Google Search Central, OpenAI Docs, Ahrefs (137,000-domain study) and our 119-request HTTP test across 17 bots (Nov 5, 2026).',
  answer: 'The three files do completely different jobs and never replace one another. robots.txt tells search and AI crawlers which paths they may or may not fetch; sitemap.xml submits canonical URLs and modification dates to Google and Bing; and llms.txt is a voluntary Markdown directory of key pages that Google Search officially does not use.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-llms-robots-sitemap',
  tableCaption: 'robots.txt, sitemap.xml and llms.txt compared across 8 technical criteria (as of November 2026)',
  tablePrzypis: 'Sources: IETF RFC 9309, Google Search Central (robots.txt, sitemaps, AI features), OpenAI Crawler Docs, llmstxt.org v2 and Ahrefs (137,000-domain study, read Nov 5, 2026).',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'robots', label: 'robots.txt' },
    { key: 'sitemap', label: 'sitemap.xml' },
    { key: 'llms', label: 'llms.txt' },
  ],
  rows: [
    { id: 'rola', kryterium: 'Primary technical role', robots: 'Allows or disallows automated crawlers from fetching specific paths', sitemap: 'Lists canonical, indexable URLs and last-modified timestamps for search engines', llms: 'Curated Markdown summary of your most important pages for LLM tools and assistants' },
    { id: 'format', kryterium: 'Format and location', robots: 'Plain text (RFC 9309), always at root /robots.txt', sitemap: 'XML (sitemaps.org protocol), e.g. /sitemap.xml submitted in GSC and BWT', llms: 'Markdown (llmstxt.org v2 proposal), /llms.txt or a subpath such as /docs/llms.txt' },
    { id: 'google', kryterium: 'Used by Google Search?', robots: 'Yes - core crawl control for Googlebot and Google-Extended', sitemap: 'Yes - primary URL discovery and freshness feed', llms: 'No - Google Search Central states Google Search does not use llms.txt' },
    { id: 'boty-ai', kryterium: 'Impact on ChatGPT, Perplexity & Claude', robots: 'Critical: blocking OAI-SearchBot or PerplexityBot excludes your site from AI search answers', sitemap: 'Indirect but high: feeds Google and Bing indexes (with IndexNow) that AI search relies on', llms: 'Helpful for developer docs and coding agents; no confirmed ranking boost in ChatGPT search' },
    { id: 'blokowanie', kryterium: 'Can it block bots or deindex pages?', robots: 'Blocks crawling by compliant bots (use meta robots noindex to remove URLs from Google’s index)', sitemap: 'Blocks nothing', llms: 'Has zero blocking or access-control power' },
    { id: 'adopcja', kryterium: 'Standardization & adoption', robots: 'Industry standard since 1994 (IETF RFC 9309, 2022)', sitemap: 'Backed by Google, Bing and major search engines since 2005', llms: 'Community proposal (~28% adoption across 137,000 prominent domains analyzed by Ahrefs)' },
    { id: 'ryzyko', kryterium: 'Costliest implementation mistake', robots: 'Accidental Disallow: / or blocking OAI-SearchBot while wanting ChatGPT citations', sitemap: 'Listing 404, 301-redirected or noindex URLs inside the XML sitemap', llms: 'Assuming llms.txt compensates for blocked AI crawlers or client-only JavaScript content' },
    { id: 'priorytet', kryterium: 'Implementation priority', robots: '1. Mandatory on day one', sitemap: '2. Mandatory on day one + submit in GSC and Bing Webmaster Tools', llms: '3. Optional low-effort addition after steps 1 and 2 are clean' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'robots.txt, sitemap.xml and llms.txt compared on 8 points',
      html: '<p><code>llms.txt</code> is frequently marketed as “the new robots.txt for AI”. The specifications and crawler docs tell a much clearer story: each file solves a separate problem.</p>',
      tabela: 'glowna',
    },
    {
      id: 'nasz-test-17-botow',
      h2: 'What our 119-request live HTTP test across 17 User-Agents revealed (Nov 5, 2026)',
      html: [
        '<p>While building our bot-access diagnostics on November 5, 2026, we tested <strong>7 live production domains</strong> across <strong>17 distinct User-Agent strings</strong> (<strong>119 HTTP requests</strong> in total, covering <code>OAI-SearchBot</code>, <code>GPTBot</code>, <code>ChatGPT-User</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code>, <code>Google-Extended</code> and <code>Bingbot</code>). Two practical findings stood out:</p>',
        '<ul>',
        '<li><strong>CDN/WAF rules often block AI bots even when <code>robots.txt</code> allows them:</strong> firewall presets frequently let Googlebot and browsers pass while returning HTTP <code>403</code> or bot challenges to AI search crawlers.</li>',
        '<li><strong>Separating AI training from AI search happens exclusively in <code>robots.txt</code>:</strong> OpenAI lets you disallow <code>GPTBot</code> (model training) while allowing <code>OAI-SearchBot</code> (ChatGPT search citations). <code>llms.txt</code> cannot express permissions at all.</li>',
        '</ul>',
        zdanieJesli('/narzedzia/generator-llms-txt', (h) => `<p>Test ${GENERATOR.botowAi} AI bots plus Bingbot against your <code>robots.txt</code> and generate a clean Markdown index in our ${a(h, 'free llms.txt generator')}.</p>`),
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>To catch 404s, redirects or <code>noindex</code> pages hiding inside your <code>sitemap.xml</code>, run our ${a(h, 'free SEO audit')}.</p>`),
      ].join(''),
    },
    {
      id: 'jak-skonfigurowac-razem',
      h2: 'Recommended setup for a B2B or service website in 3 steps',
      html: [
        '<ol>',
        '<li><strong>Audit <code>/robots.txt</code> first:</strong> keep service pages, guides, images and CSS/JS open to <code>Googlebot</code>, <code>Bingbot</code>, <code>OAI-SearchBot</code>, <code>PerplexityBot</code> and <code>Claude-SearchBot</code>, and declare <code>Sitemap: https://yourdomain.com/sitemap.xml</code>.</li>',
        '<li><strong>Keep <code>/sitemap.xml</code> strictly canonical:</strong> include only HTTP <code>200</code>, indexable, self-canonical URLs and submit the sitemap in both Google Search Console and Bing Webmaster Tools.</li>',
        '<li><strong>Add a concise <code>/llms.txt</code> directory:</strong> list your company summary and grouped links to core services, pricing and documentation with a one-line description per URL.</li>',
        '</ol>',
      ].join(''),
    },
  ],
  faqTytul: 'Questions about llms.txt, robots.txt and sitemap.xml',
  faq: [
    {
      question: 'Can I publish llms.txt instead of sitemap.xml?',
      answer: 'No. Google and Bing rely on XML sitemaps for systematic URL discovery and lastmod signals. Dropping sitemap.xml in favor of llms.txt hurts search indexing-which AI search engines also depend on.',
    },
    {
      question: 'What happens if I disallow a path in robots.txt but link to it in llms.txt?',
      answer: 'Compliant crawlers (such as OAI-SearchBot and PerplexityBot) obey the disallow rule in robots.txt and refuse to crawl the blocked URL. Listing a page inside llms.txt never overrides a robots.txt block.',
    },
    {
      question: 'Does blocking a URL in robots.txt remove it from Google Search results?',
      answer: 'Not reliably. Disallowing a URL stops Googlebot from fetching its content, but Google can still index the bare URL if other pages link to it. To remove a page from search results, serve a meta robots noindex directive on a crawlable URL.',
    },
    {
      question: 'Do I also need an llms-full.txt file?',
      answer: 'For most company websites, no. Concatenating every page into a single llms-full.txt file (a community convention outside the core llmstxt.org spec) mainly benefits developer SDK or API documentation ingested into coding assistants.',
    },
  ],
  sources: [
    { url: 'https://www.rfc-editor.org/rfc/rfc9309.html', nazwa: 'IETF RFC 9309: Robots Exclusion Protocol', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', nazwa: 'Google Search Central: Learn about sitemaps', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-18' },
    { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file (v2 specification)', data: '2026-11-05' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers', data: '2026-11-05' },
    { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What Is llms.txt? (137,000-domain study)', data: '2026-11-05' },
  ],
  zrodlaWewnetrzne: ['components/narzedzia/GeneratorLlmsTxt.jsx', 'lib/narzedziaGeneratorRaport.en.js'],
  aiQuestions: [],
  cta: {
    tekst: 'Check your robots.txt, XML sitemap and AI crawler readiness in under 90 seconds',
    plan: 'audyt-ai',
    linki: [
      { tekst: 'Open the free llms.txt generator & AI bot test', href: '/narzedzia/generator-llms-txt' },
      { tekst: 'Scan your sitemap & 49 rules in the free SEO audit', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'robots.txt, sitemap.xml and llms.txt comparison' }],
};

// --- P9 EN: In-house SEO vs SEO Agency ----------------------------------------------------------

const EMPLOYER_MULTIPLIER_PL = 1.2048;
const INHOUSE_SCENARIOS_EN = [
  { role: 'Junior / mid-level in-house SEO (lower scenario)', grossPln: 8000, toolsPln: 900 },
  { role: 'Experienced in-house SEO specialist (mid scenario)', grossPln: 12000, toolsPln: 1400 },
  { role: 'Senior SEO / SEO Lead (upper scenario)', grossPln: 16000, toolsPln: 1800 },
];

const inhouseRowsEn = INHOUSE_SCENARIOS_EN.map((s, idx) => {
  const employerPln = Math.round(s.grossPln * EMPLOYER_MULTIPLIER_PL);
  const totalPln = employerPln + s.toolsPln;
  const approxEur = Math.round(totalPln / 4.25);
  return {
    id: `etat-${idx}`,
    rola: s.role,
    brutto: `PLN ${fmt(s.grossPln)}`,
    pracodawca: `PLN ${fmt(employerPln)}`,
    narzedzia: `PLN ${fmt(s.toolsPln)}`,
    razem: `PLN ${fmt(totalPln)} (~€${fmt(approxEur)}) / mo`,
  };
});

export const P9_INHOUSE_EN = {
  slug: 'seo-w-firmie-czy-agencja-seo',
  title: 'In-House SEO vs SEO Agency: Full Cost & Team Comparison',
  description: 'In-house SEO specialist vs SEO agency: total employer cost and tool stack versus a €450-€590 net monthly retainer, skill coverage and account ownership.',
  h1: 'In-house SEO vs SEO agency: full employer cost, skill coverage and when each model wins',
  okruszek: 'In-house SEO vs agency',
  nazwaKarty: 'In-house SEO specialist vs SEO agency',
  teaser: 'Total employer cost plus SEO software licenses compared with a fixed monthly agency retainer-and the scale threshold where hiring in-house wins.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'Hire in-house SEO or an agency?', skrot: 'Total payroll + tools cost, team skills and scale threshold' },
  tag: 'SEO resourcing comparison',
  ujawnienie: 'We are an SEO agency, so we explicitly show the company size and complexity threshold above which hiring your own in-house SEO lead beats an external retainer.',
  zrodlaDanych: 'Data: statutory Polish employer social-security contributions (ZUS, +20.48% on employment contracts), NapoleonCat market comparison (Sep 11, 2026) and our published €450 / €590 net retainers (Nov 19, 2026).',
  answer: 'For small and mid-sized businesses, an SEO agency costs a fraction of a full-time hire because a €450-€590 net monthly retainer bundles technical SEO, copywriting, link outreach and paid SEO software without payroll taxes or single-person turnover risk. Hiring in-house wins once your product or catalog is large enough to need 160 hours a month inside daily engineering and product sprints.',
  published: '2026-11-19',
  updated: '2026-11-19',
  tableId: 'tabela-inhouse-agencja',
  tableCaption: 'In-house SEO specialist versus an SEO agency across 8 criteria',
  tablePrzypis: 'Sources: NapoleonCat (“Agency, freelancer or full-time”, Sep 11, 2026), statutory employer ZUS contribution rates (zus.pl, read Nov 19, 2026) and AI SEO COMPANY package pricing.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'inhouse', label: 'In-house SEO specialist' },
    { key: 'agencja', label: 'SEO agency (monthly retainer)' },
  ],
  rows: [
    { id: 'koszt-m', kryterium: 'Total monthly cost to the company', inhouse: 'Gross salary + statutory employer payroll taxes (~20.48% in Poland) + SEO software + content & link budget', agencja: 'Fixed net invoice: €450/mo (SEO Standard) or €590/mo (SEO Premium) at AI SEO COMPANY, including content and links' },
    { id: 'narzedzia', kryterium: 'SEO software stack (crawler, backlink index, rank tracker)', inhouse: 'Paid separately by your company (typically €200-€450+/mo)', agencja: 'Included on the agency side, plus 24/7 client portal access' },
    { id: 'kompetencje', kryterium: 'Breadth of execution skills', inhouse: 'One person rarely combines Next.js/CWV engineering, subject-matter writing and PR outreach equally well', agencja: 'Split across specialists: technical SEO, brief-driven copywriting, white-hat link building and AI search tracking' },
    { id: 'znajomosc', kryterium: 'Product context & internal speed', inhouse: 'Very high: sits inside daily product, sales and engineering conversations', agencja: 'Lower than an employee-requires a clear onboarding brief and one responsive point of contact' },
    { id: 'czas-startu', kryterium: 'Time to start executing', inhouse: '1 to 3 months for recruiting, notice periods and onboarding', agencja: 'Within a few business days after signing and granting Search Console access' },
    { id: 'ciaglosc', kryterium: 'Leave, illness and turnover risk', inhouse: 'If your sole SEO leaves, execution pauses for months while you re-hire', agencja: 'Team continuity and a documented work log in the client portal' },
    { id: 'elastycznosc', kryterium: 'Contract flexibility & data ownership', inhouse: 'Fixed headcount cost and statutory notice periods', agencja: 'Monthly rolling contract with us (Booster Pack: 3-month minimum); Google accounts stay owned by your company' },
    { id: 'kiedy', kryterium: 'Best fit by company stage', inhouse: 'Large marketplaces, SaaS product teams, multi-country catalogs spending €3,500+/mo on organic growth', agencja: 'B2B, service and local companies or mid-sized sites wanting predictable multi-skill output' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'In-house SEO vs SEO agency: 8 decision criteria',
      html: '<p>Hiring full-time buys 160 hours of dedicated attention, but it also expects a single hire to be technical architect, writer, digital PR specialist and analytics engineer at once. Here is how the two models compare.</p>',
      tabela: 'glowna',
    },
    {
      id: 'pelny-koszt-etatu',
      h2: 'What an in-house SEO seat actually costs: payroll overhead + tool stack',
      html: [
        '<p>Comparing a job-board gross salary directly against an agency invoice leaves out two fixed lines: <strong>employer social-security contributions</strong> (in Poland, statutory ZUS employer rates add <strong>20.48%</strong> on top of gross pay under an employment contract, before optional pension contributions; other EU/US markets add comparable employer taxes and benefits) and a <strong>working SEO software stack</strong> (technical crawler, backlink/keyword database and rank/AI tracking).</p>',
        '<p>The table below illustrates three transparent employer-cost scenarios on our home market (illustrative math, not a salary survey; EUR equivalents rounded at 4.25 PLN/EUR):</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-etatu',
        caption: 'Illustrative monthly employer cost for one full-time SEO seat + software (excluding external content & link budgets)',
        columns: [
          { key: 'rola', label: 'Seat scenario' },
          { key: 'brutto', label: 'Gross salary' },
          { key: 'pracodawca', label: 'With employer ZUS (× 1.2048)' },
          { key: 'narzedzia', label: 'SEO tool stack (illustrative)' },
          { key: 'razem', label: 'Fixed monthly total' },
        ],
        rows: inhouseRowsEn,
        przypis: 'Own calculation using statutory Polish ZUS employer contribution rates (zus.pl, 20.48% excluding PPK). External editorial placements, copywriting support and developer hours sit on top of these figures.',
      },
      htmlPo: [
        '<p>By comparison, our <strong>SEO Standard (€450 net/mo)</strong> covers technical SEO, up to 20 keywords, 2 articles and 2 editorial links per month, while <strong>SEO Premium (€590 net/mo)</strong> covers up to 50 keywords, 4 articles, 4 links and weekly AI visibility tracking. Below a €3,000/mo total SEO budget, a full-time seat consumes almost the entire budget before a single external link or dev ticket is funded.</p>',
        zdanieJesli('/porownania/agencja-seo-czy-freelancer', (h) => `<p>If you are weighing a solo contractor between these two options, see our hourly breakdown in ${a(h, 'SEO agency vs freelancer')}.</p>`),
      ].join(''),
    },
    {
      id: 'model-hybrydowy',
      h2: 'When hiring in-house wins-and when a hybrid setup works best',
      html: [
        '<ul>',
        '<li><strong>Complex product-led or large catalog sites:</strong> when URL architecture, faceted navigation and template experiments ship every sprint, having an internal SEO product owner inside Jira and stand-ups pays off fast.</li>',
        '<li><strong>Regulated or deeply technical industries:</strong> an internal subject-matter lead ensures clinical, legal or engineering accuracy, while an external agency supplies keyword clustering, content briefs, structured data and outreach.</li>',
        '<li><strong>Multi-market coordination:</strong> once you manage localization, PR and product launches across five countries, an internal marketing owner paired with specialist agency execution usually beats either model alone.</li>',
        '</ul>',
      ].join(''),
    },
  ],
  faqTytul: 'Questions about hiring in-house SEO vs an agency',
  faq: [
    {
      question: 'At what monthly budget does hiring an in-house SEO specialist make sense?',
      answer: 'Usually once your total monthly organic-growth budget exceeds €3,500-€4,500. That level covers a competitive salary, core SEO software licenses and an actual execution budget for content production, digital PR and developer support.',
    },
    {
      question: 'Can an internal marketer work alongside an SEO agency?',
      answer: 'Yes-for B2B companies that hybrid model often performs best. Your internal marketer supplies product insight, customer objections, project photos and fast approvals, while the agency handles technical crawls, keyword architecture, link outreach and weekly reporting.',
    },
    {
      question: 'How do we make sure we keep all data and assets if we hire an agency?',
      answer: 'Enforce three rules from day one: Google Search Console, GA4 and Google Business Profile belong to your company’s Google account (the agency gets manager access), full copyright to published copy transfers to you, and backlinks are earned on real third-party sites rather than rented networks.',
    },
    {
      question: 'What is better for a 20-page B2B or service website?',
      answer: 'An agency retainer or a standalone technical audit with a content roadmap. A 20-page service site rarely generates 160 hours of pure SEO work every month once technical foundations are clean; what moves rankings next is steady content and authority building.',
    },
  ],
  sources: [
    { url: 'https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne', nazwa: 'Social Insurance Institution (ZUS): statutory employer contribution rates in Poland', data: '2026-11-19' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: Cost of hiring an SEO agency vs freelancer vs full-time employee (Sep 11, 2026)', data: '2026-10-25' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO?', data: '2026-11-05' },
  ],
  zrodlaWewnetrzne: ['components/Pricing.jsx', 'lib/porownania.p4.en.js'],
  aiQuestions: [],
  cta: {
    tekst: 'Want an honest estimate of what monthly scope fits your domain and market?',
    plan: 'standard',
    linki: [
      { tekst: 'Compare SEO Standard (€450) and SEO Premium (€590)', href: '/cennik-pozycjonowania' },
      { tekst: 'Download the free SEO RFP template (PDF)', href: '/narzedzia/zapytanie-ofertowe-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'In-house SEO versus SEO agency' }],
};
