// English versions P10-P12 (November 21, 2026):
//   - P10_NEXT_WP_EN:     /en/comparisons/nextjs-vs-wordpress-seo
//   - P11_WEBFLOW_WP_EN:  /en/comparisons/webflow-vs-wordpress-seo
//   - P12_KOD_KREATOR_EN: /en/comparisons/custom-coded-website-vs-website-builder-seo (keyed by PL slug)
// Pure relative ESM imports without @/ alias.

import { hrefWJezykuJesliOpublikowana } from './linkiEn.js';
import { AUDYT, CENY } from './narzedziaLiczby.js';

const L = 'en';
const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function zdanieJesli(sciezkaPl, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(sciezkaPl, L);
  return h ? zdanie(h) : '';
}

// --- P10 EN: Next.js vs WordPress for SEO & AI ---------------------------------------------------

const TCO_ROWS_NEXT_WP_EN = [
  {
    id: 'tco-wp',
    model: 'WordPress with visual page builder & premium plugins',
    start: '€800 - €1,900 net',
    utrzymanie: '€60 - €150 / mo (managed WP hosting, WPML/cache/WAF renewals, 1-2 h dev care)',
    razem24: '€2,240 - €5,500 net',
    uwagi: 'Risk of Core Web Vitals regressions and plugin conflicts after PHP or theme updates',
  },
  {
    id: 'tco-next-solo',
    model: 'Standalone custom Next.js website (one-off build)',
    start: `from €${fmt(CENY.strona.eur)} net`,
    utrzymanie: '€0 - €20 / mo (edge/VPS hosting, €0 for SEO/cache/locale plugin licenses)',
    razem24: '€1,400 - €1,880 net (excluding ongoing SEO retainer)',
    uwagi: '100% Git repository ownership; monthly SEO content and link outreach billed separately',
  },
  {
    id: 'tco-next-booster',
    model: 'Custom Next.js inside our Booster Pack (Web + SEO)',
    start: '€0 upfront website build fee',
    utrzymanie: `€${fmt(CENY.boosterPack.eur)} net / mo (min. ${CENY.boosterPack.umowaMiesiecy}-month contract, monthly rolling thereafter)`,
    razem24: `€${fmt(CENY.boosterPack.eur * 3)} net across the first 3 months (custom website + full SEO + SSL/hosting)`,
    uwagi: 'Includes bespoke Next.js UX/UI, hosting, technical & content SEO, Google Business Profile and 24/7 portal',
  },
];

export const P10_NEXT_WP_EN = {
  slug: 'nextjs-vs-wordpress-seo',
  title: 'Next.js vs WordPress for SEO & AI: 2026 Comparison',
  description: 'Next.js vs WordPress for SEO in 2026: 9 criteria compared, from Core Web Vitals and plugin security to JSON-LD, AI crawlers and 24-month TCO.',
  h1: 'Next.js vs WordPress for SEO and AI search: architecture, security and 24-month cost compared (2026)',
  okruszek: 'Next.js vs WordPress for SEO',
  nazwaKarty: 'Next.js vs WordPress for SEO & AI',
  teaser: 'Pre-rendered HTML with zero PHP plugins versus the world’s largest CMS. Here is how they compare on Core Web Vitals, security, AI crawlers and 24-month TCO.',
  kryteria: '9 criteria',
  decyzja: { pytanie: 'Next.js or WordPress for SEO?', skrot: 'Core Web Vitals, plugin attack surface, editorial workflow and 24m TCO' },
  tag: 'CMS & frontend SEO comparison',
  ujawnienie: `We build custom B2B websites in Next.js (standalone from €${fmt(CENY.strona.eur)} net or €0 upfront inside our Booster Pack) while actively running SEO retainers on client WordPress sites. Below we state plainly where WordPress remains the smarter choice.`,
  zrodlaDanych: `Data: Google Search Central (Core Web Vitals & JavaScript SEO), HTTP Archive Web Almanac (CMS & CrUX field data), Patchstack WordPress security reports, OpenAI Crawler Docs and our live audit of ai-seo-company.pl (${AUDYT.stron} pages, ${AUDYT.regul} rules, 95/100 score on Nov 18, 2026).`,
  answer: 'Neither Next.js nor WordPress grants an automatic ranking bonus in Google, because rankings still hinge on search intent, content depth and backlinks. Next.js wins technically for B2B lead-generation and multilingual sites: it serves edge-cached HTML to Googlebot and non-JS AI crawlers, keeps mobile LCP <= 2.5 s and INP <= 200 ms without plugin bloat, and removes the PHP plugin attack surface. WordPress wins when non-technical editors publish multiple articles daily in Gutenberg.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-nextjs-vs-wordpress',
  tableCaption: 'Next.js (App Router, SSG/SSR) vs WordPress (PHP + plugins): 9 SEO and AI search criteria compared',
  tablePrzypis: 'Sources: Google Search Central (Core Web Vitals, JavaScript SEO Basics), HTTP Archive Web Almanac (CMS chapter, CrUX field pass rates), Patchstack State of WordPress Security, OpenAI Platform Docs (Crawlers) and AI SEO COMPANY empirical audit data (Nov 21, 2026). Trademarks belong to their respective owners.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'nextjs', label: 'Next.js (SSG / SSR / App Router)' },
    { key: 'wordpress', label: 'WordPress (PHP + theme & plugins)' },
  ],
  rows: [
    {
      id: 'html-boty',
      kryterium: 'HTML delivery for Googlebot, OAI-SearchBot & PerplexityBot',
      nextjs: 'Pre-rendered static HTML (SSG/ISR) or server-rendered HTML (SSR) served straight from the CDN edge; Googlebot and non-JS AI crawlers read complete copy on the first HTTP request',
      wordpress: 'Server-rendered PHP HTML readable by Google and AI crawlers, provided page caching is warm and security/WAF plugins do not return HTTP 403 to AI bot User-Agents',
    },
    {
      id: 'cwv',
      kryterium: 'Mobile Core Web Vitals (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at 75th percentile CrUX)',
      nextjs: 'High out-of-the-box ceiling: built-in next/image (WebP/AVIF + intrinsic sizing against CLS), next/font and per-route code splitting; React Server Components keep main-thread JS low for INP',
      wordpress: 'In HTTP Archive CrUX data, roughly 45-50% of mobile WordPress origins pass all three CWV thresholds due to heavy visual builders (Elementor, Divi) and 20+ plugins; lean custom Gutenberg themes still pass cleanly',
    },
    {
      id: 'bezpieczenstwo',
      kryterium: 'Plugin attack surface & security patching',
      nextjs: 'No PHP runtime, no /wp-login.php endpoint, no exposed MySQL database on public routes and zero third-party CMS plugins; dependencies update inside Git CI/CD before deployment',
      wordpress: 'Per Patchstack security reports, over 90% of disclosed WordPress vulnerabilities originate in third-party plugins (and ~7-8% in themes), requiring continuous patching, backups and WAF rules',
    },
    {
      id: 'jsonld-hreflang',
      kryterium: 'Code control over JSON-LD, hreflang, sitemap.xml & /llms.txt',
      nextjs: '100% programmatic control: typed schema.org graphs without duplicate nodes, reciprocal hreflang + x-default from one route map, segmented XML sitemaps and native /llms.txt routes',
      wordpress: 'Fast initial setup via plugins (Rank Math, Yoast, WPML, Polylang), but overlapping plugins frequently emit conflicting JSON-LD blocks or mismatched canonicals across locales',
    },
    {
      id: 'edycja-tresci',
      kryterium: 'Day-to-day content publishing for non-technical teams',
      nextjs: 'Requires pairing with a Headless CMS (Sanity, Strapi, Payload, or Headless WordPress) or an MDX/Git workflow; without a visual CMS, structural edits go through a developer or agency',
      wordpress: 'Native Gutenberg block editor familiar to almost every marketer and writer; publishing posts, categories, author bios and redirects takes minutes with zero code deployments',
    },
    {
      id: 'narzedzia-interaktywne',
      kryterium: 'Custom interactive SEO tools, calculators & programmatic pages',
      nextjs: 'Native React + API Routes inside the same repository: ROI calculators, live diagnostic tools and programmatic comparison hubs render fast without third-party iframes',
      wordpress: 'Requires bespoke PHP/JS plugin engineering or heavy form/calculator add-ons that often enqueue CSS and JS across unrelated pages',
    },
    {
      id: 'koszt-startu',
      kryterium: 'Upfront build & launch cost',
      nextjs: `Higher when commissioned from a traditional dev shop; with us, standalone Next.js starts at €${fmt(CENY.strona.eur)} net or €0 upfront inside our Booster Pack (€${fmt(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy} months)`,
      wordpress: 'Low entry cost on off-the-shelf themes, though a clean custom Gutenberg B2B build without page-builder bloat costs roughly the same as custom frontend code',
    },
    {
      id: 'tco-24m',
      kryterium: 'Hosting & maintenance TCO over 24 months',
      nextjs: 'Near-zero routine maintenance: edge/CDN hosting typically €0-€20/mo, zero annual renewals for cache, security or multilingual plugins, and no broken layouts from auto-updates',
      wordpress: 'Managed WP hosting + annual paid plugin renewals (multilingual, cache, backups, builder) + 1-3 developer hours/month for staging updates create steady recurring overhead',
    },
    {
      id: 'lock-in',
      kryterium: 'Code ownership & vendor lock-in',
      nextjs: 'Open-source MIT framework (React / Node.js): deploy the exact same Git repository to Vercel, Cloudflare, AWS or any Docker VPS without rewriting templates',
      wordpress: 'Open-source GPL core + MySQL database portable to any PHP host, although leaving shortcode-heavy builders (Elementor, Divi, WPBakery) requires rebuilding page templates',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Next.js vs WordPress for Google and AI crawlers: 9 technical criteria',
      html: '<p>Most CMS debates confuse the underlying engine with how agencies typically ship it. A lean, custom-coded WordPress theme behind server caching can rank exceptionally well, while a poorly architected React Single Page Application (pure client-side rendering - CSR) can leave AI bots staring at an empty shell. The table below compares modern Next.js (App Router with SSG/SSR) against a typical plugin-driven WordPress B2B build.</p>',
      tabela: 'glowna',
    },
    {
      id: 'cwv-boty-ai-nasz-wynik',
      h2: 'Core Web Vitals, non-JS AI crawlers and our live 95/100 Next.js audit benchmark',
      html: [
        '<p>Google Search Central evaluates Core Web Vitals at the <strong>75th percentile of real mobile and desktop users</strong> in the Chrome UX Report (CrUX): <strong>LCP <= 2.5 s</strong>, <strong>INP <= 200 ms</strong> and <strong>CLS <= 0.1</strong>. Across millions of origins tracked in HTTP Archive’s Web Almanac, WordPress records lower aggregate mobile CWV pass rates (roughly 45-50%) than static and edge-rendered stacks. PHP itself is rarely the bottleneck; the culprit is stacking a visual page builder on top of 20+ marketing, slider and form plugins whose JavaScript blocks the mobile main thread on first tap (hurting INP).</p>',
        '<p>AI search engines widen that architectural gap. While Googlebot runs a headless Chromium rendering pipeline (Web Rendering Service), major AI search crawlers - including OpenAI’s <code>OAI-SearchBot</code>, <code>PerplexityBot</code> and Anthropic’s <code>ClaudeBot</code> - fetch raw HTTP responses and <strong>do not execute client-side JavaScript</strong>. With Next.js Static Site Generation (SSG) and React Server Components, crawlers receive clean, semantic HTML containing full copy, comparison tables and inline <code>JSON-LD</code> on the initial response, with zero risk of uncached PHP timeouts or empty <code>&lt;div id="root"&gt;</code> containers.</p>',
        `<p>Our own website <code>www.ai-seo-company.pl</code> is built on Next.js. In the public live run of our free SEO audit on November 18, 2026 (${AUDYT.stron} pages checked against ${AUDYT.regul} rules), it scored <strong>95/100</strong> with <strong>0 errors</strong> - hitting <strong>100/100 in technical SEO</strong>, <strong>100/100 in content</strong> and <strong>100/100 in AI readiness</strong>.</p>`,
        zdanieJesli('/narzedzia/seo-audit-example', (h) => `<p>Inspect every rule and category breakdown from that live run on our ${a(h, '95/100 SEO audit example page')}.</p>`),
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>You can benchmark your current WordPress or Next.js domain against the exact same ${AUDYT.regul} rules in our ${a(h, 'free SEO audit tool')}.</p>`),
        zdanieJesli('/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml', (h) => `<p>For how search and AI bots interpret crawler directives alongside HTML, see ${a(h, 'llms.txt vs robots.txt vs sitemap.xml')}.</p>`),
      ].join(''),
    },
    {
      id: 'koszt-24-miesiace',
      h2: '24-month Total Cost of Ownership (TCO): plugin maintenance vs clean code',
      html: [
        '<p>Launch invoices rarely tell you what a business website costs over two full years. On WordPress, ongoing ownership includes annual plugin renewals (multilingual routing, caching, forms, backups) plus developer maintenance hours - essential when Patchstack reports consistently show over 90% of WordPress security vulnerabilities originate inside third-party plugins. On Next.js, public pages have no SQL database or PHP plugins to patch.</p>',
        '<p>The table below compares three realistic 24-month B2B budget paths (illustrative net figures):</p>',
      ].join(''),
      tabela: {
        id: 'tabela-tco-nextjs-wp',
        caption: 'Illustrative 24-month website build and technical maintenance cost comparison (net)',
        columns: [
          { key: 'model', label: 'Implementation path' },
          { key: 'start', label: 'Upfront build cost' },
          { key: 'utrzymanie', label: 'Technical maintenance / mo' },
          { key: 'razem24', label: '24-month / minimum term total' },
          { key: 'uwagi', label: 'What is included & watch-outs' },
        ],
        rows: TCO_ROWS_NEXT_WP_EN,
        przypis: `Sources: typical European WordPress maintenance retainers and AI SEO COMPANY published pricing (standalone Next.js website from €${fmt(CENY.strona.eur)} net; Booster Pack €${fmt(CENY.boosterPack.eur)} net/mo with a min. ${CENY.boosterPack.umowaMiesiecy}-month contract).`,
      },
      htmlPo: [
        zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>See how our plugin-free Next.js architecture, WCAG 2.2 AA target and Booster Pack work on our ${a(h, 'Next.js web design page')}.</p>`),
        zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Want to preview how your current WordPress homepage would look rebuilt for conversions before committing? Generate a desktop and mobile preview in 1-3 minutes in our ${a(h, 'free AI website redesign mockup tool')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-wordpress-kiedy-nextjs',
      h2: 'Honest verdict: when WordPress is still fine and when Next.js wins',
      html: [
        '<p>Neither stack is universally superior for every team structure. Here is the decision rule we use before recommending a migration:</p>',
        '<ul>',
        '<li><strong>Stay on WordPress when:</strong> you run a digital publication, newsroom or high-velocity content hub publishing 5-10+ articles per day with editors already trained in Gutenberg; you operate a WooCommerce store relying on dozens of off-the-shelf regional shipping and accounting plugins; or a non-technical founder edits pages daily without developer support (just keep active plugins under ~12-15 and avoid heavy visual page builders).</li>',
        '<li><strong>Choose Next.js when:</strong> your site is a B2B lead-generation or service engine where mobile speed, conversion UX, zero plugin downtime, custom interactive calculators, clean <code>JSON-LD</code> and multi-market <code>hreflang</code> (e.g. EN, PL, DE) drive revenue without ongoing patching overhead.</li>',
        '<li><strong>Hybrid option (Headless WordPress + Next.js):</strong> ideal when an editorial team loves writing inside WordPress, while public pages are statically rendered by Next.js with the PHP admin locked behind a private subdomain.</li>',
        '</ul>',
        zdanieJesli('/porownania/webflow-vs-wordpress-seo', (h) => `<p>Also weighing a visual SaaS CMS? Read our side-by-side breakdown of ${a(h, 'Webflow vs WordPress for SEO')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about Next.js vs WordPress for SEO',
  faq: [
    {
      question: 'Will migrating from WordPress to Next.js automatically boost my Google rankings?',
      answer: 'Rewriting code alone with identical copy and backlinks rarely creates an overnight ranking jump if your existing WordPress site already passes Core Web Vitals and indexes cleanly. Real gains come from removing technical ceilings: fixing mobile LCP and INP bottlenecks, cleaning up duplicate schema and hreflang tags, eliminating plugin downtime, and shipping faster conversion-focused landing pages and interactive tools.',
    },
    {
      question: 'Does React hurt SEO because search engines struggle with JavaScript?',
      answer: 'That issue affects pure client-side Single Page Applications (CSR) that ship an empty HTML body and fetch copy in the browser. Next.js uses Static Site Generation (SSG) and Server-Side Rendering (SSR) by default, sending complete HTML documents directly from the server so Googlebot, Bingbot, OAI-SearchBot and PerplexityBot read every heading, link and table immediately.',
    },
    {
      question: 'How do non-technical marketers edit content on a Next.js website?',
      answer: 'There are two proven workflows: connecting a lightweight Headless CMS (such as Sanity, Payload, Strapi or Headless WordPress) so editors publish through clean form fields, or letting your SEO agency ship tested pages directly inside your monthly retainer (which is how our SEO Standard, SEO Premium and Booster Pack plans operate).',
    },
    {
      question: 'Will we lose existing Google rankings during a WordPress-to-Next.js migration?',
      answer: 'Not when URL parity and 301 redirects are handled rigorously. Before switching DNS, we export every indexed URL and backlink target from Google Search Console and crawl logs, preserve matching slugs 1:1 wherever possible, and deploy edge-level 301/308 redirects for any consolidated paths so zero link equity hits a 404.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Understanding Core Web Vitals and Google search results (LCP, INP, CLS)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: Understand the JavaScript SEO basics (SSR/SSG vs CSR)', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: Content Management Systems (CMS adoption & CrUX CWV pass rates)', data: '2026-11-21' },
    { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (plugin vs theme vs core vulnerability share)', data: '2026-11-21' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot & GPTBot)', data: '2026-11-21' },
    { url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata', nazwa: 'Next.js Documentation: Metadata, JSON-LD and Sitemaps (App Router)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/audytPrzyklad.js (live audit of www.ai-seo-company.pl on Nov 18, 2026: 25 pages, 49 rules, 95/100 score, 0 errors)',
    'lib/narzedziaLiczby.js (AUDYT, CENY: standalone Next.js from €1,400 net, Booster Pack €590 net/mo min. 3 months)',
    'app/[locale]/projektowanie-stron-internetowych/page.js (Next.js & Booster Pack FAQ)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Ready to replace plugin maintenance with a fast Next.js site for €0 upfront in our Booster Pack? Get a migration quote in 24h',
    plan: 'booster',
    linki: [
      { tekst: 'See Next.js web design & Booster Pack (€590/mo)', href: '/projektowanie-stron-internetowych' },
      { tekst: 'Generate a free AI redesign mockup in 1-3 min', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Next.js versus WordPress for SEO and AI search' }],
};

// --- P11 EN: Webflow vs WordPress for SEO --------------------------------------------------------

const COST_ROWS_WEBFLOW_WP_EN = [
  {
    id: 'koszt-wf-1',
    scenariusz: 'Webflow CMS (single language, billed annually)',
    licencje24: '$552 - $936 (~€520 - €880 for CMS $23/mo or Business $39/mo × 24 mo)',
    wielojezycznosc24: '$0 (single-locale site)',
    opieka24: 'Low: zero server-side PHP or plugin patching required',
  },
  {
    id: 'koszt-wf-3',
    scenariusz: 'Webflow CMS + 2 extra locales with translated URL slugs (e.g. EN + DE + PL)',
    licencje24: '$552 - $936 base Site Plan over 24 months',
    wielojezycznosc24: '+$1,392 (~€1,310) for Localization Advanced ($29/mo × 2 extra locales × 24 mo)',
    opieka24: 'The cheaper Essential tier ($9/locale/mo) cannot localize URL slugs for foreign-language keywords',
  },
  {
    id: 'koszt-wp-3',
    scenariusz: 'WordPress + WPML / Polylang Pro (3 languages)',
    licencje24: '~€300 - €720 (managed WP hosting + 2-3 premium plugin renewals over 24 mo)',
    wielojezycznosc24: '~€198 over 2 years (WPML Multilingual CMS €99/yr with zero per-locale surcharge)',
    opieka24: 'Requires budgeting monthly developer care for safe plugin/PHP updates and database speed',
  },
  {
    id: 'koszt-next-3',
    scenariusz: 'Custom Next.js in AI SEO COMPANY Booster Pack (EN + DE + PL)',
    licencje24: `€0 upfront website build fee; €${fmt(CENY.boosterPack.eur)} net/mo (min. ${CENY.boosterPack.umowaMiesiecy} months) including full SEO`,
    wielojezycznosc24: '€0 recurring SaaS surcharge per extra locale or translated URL slug (native next-intl routing)',
    opieka24: 'Hosting, SSL, maintenance, SEO content, link outreach and full Git/Vercel code ownership included',
  },
];

export const P11_WEBFLOW_WP_EN = {
  slug: 'webflow-vs-wordpress-seo',
  title: 'Webflow vs WordPress for SEO: Limits, Speed & 24m Cost',
  description: 'Webflow vs WordPress for SEO: URL structure, CMS collection limits, Localization hreflang add-on costs, CDN speed and 24-month TCO compared.',
  h1: 'Webflow vs WordPress for SEO: URL nesting limits, hreflang add-on costs, CDN speed and 24-month TCO',
  okruszek: 'Webflow vs WordPress for SEO',
  nazwaKarty: 'Webflow vs WordPress for SEO',
  teaser: 'Closed visual SaaS on fast CDN hosting versus open-source PHP with unrestricted URL hierarchies. We compare CMS folder limits, per-locale hreflang fees and portability.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'Webflow or WordPress for SEO?', skrot: 'URL folder depth, Localization hreflang fees, CMS caps and portability' },
  tag: 'CMS platform SEO comparison',
  ujawnienie: 'We run SEO campaigns on both Webflow and WordPress sites, and build new client websites in custom Next.js (€0 upfront inside our Booster Pack). We hold no affiliate partnerships with Webflow or WordPress plugin vendors.',
  zrodlaDanych: 'Data: Webflow pricing and Help Center docs (Site Plans, Localization, CMS Limits, Code Export), HTTP Archive Web Almanac (CMS CrUX pass rates), Patchstack and Google Search Central (hreflang & redirects). As of Nov 21, 2026.',
  answer: 'Webflow wins on out-of-the-box CDN speed and zero PHP plugin maintenance, making it a strong fit for single-language SaaS and B2B marketing sites with flat blog/case-study structures. WordPress wins on architectural SEO freedom: it supports multi-level nested URL hierarchies, avoids hard CMS item ceilings or monthly per-locale surcharges for translated URL slugs, and gives you full database portability.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-webflow-vs-wordpress',
  tableCaption: 'Webflow vs WordPress across 8 technical SEO and 24-month cost criteria',
  tablePrzypis: 'Sources: Webflow Help Center & Pricing (CMS Collections, Localization Essential vs Advanced, Code Export, annual USD rates read Nov 21, 2026), HTTP Archive Web Almanac (CMS CrUX), Google Search Central (localized versions). Trademarks belong to their respective owners.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'webflow', label: 'Webflow (closed SaaS + visual CMS)' },
    { key: 'wordpress', label: 'WordPress (open-source PHP + MySQL)' },
  ],
  rows: [
    {
      id: 'struktura-url',
      kryterium: 'URL folder nesting constraints in CMS vs flexible permalinks',
      webflow: 'Rigid flat 2-level CMS Collection paths (/collection-slug/item-slug): cannot natively nest multi-level dynamic hierarchies such as /services/london/seo-audit inside one collection without reverse-proxy workarounds',
      wordpress: 'Unrestricted permalink structures, hierarchical parent/child pages, Custom Post Types and multi-level taxonomy folders out of the box',
    },
    {
      id: 'hreflang-wielojezycznosc',
      kryterium: 'Multilingual hreflang & localized URL slug costs',
      webflow: 'Paid Webflow Localization add-on billed per locale: Essential ($9/mo/locale) cannot localize URL slugs; translated URL slugs and automatic visitor routing require Advanced ($29/mo/locale billed annually)',
      wordpress: 'WPML or Polylang supports unlimited languages, translated URL slugs, subfolders or ccTLDs under one flat annual license with zero per-language monthly surcharges',
    },
    {
      id: 'szybkosc-cdn',
      kryterium: 'Hosting, CDN speed & Core Web Vitals out of the box',
      webflow: 'Managed AWS + Fastly CDN hosting and clean CSS output included; consistently achieves 70%+ mobile Core Web Vitals pass rates in HTTP Archive CrUX field data',
      wordpress: 'Depends heavily on hosting and theme discipline: ~45-50% aggregate mobile CWV pass rate in HTTP Archive due to page-builder bloat, though lean Gutenberg + Redis/CDN matches Webflow',
    },
    {
      id: 'utrzymanie-wtyczki',
      kryterium: 'Plugin maintenance vs closed SaaS hosting',
      webflow: 'Zero server administration, PHP upgrades or security patching - SSL, CDN and platform uptime are managed centrally by Webflow',
      wordpress: 'Site owner is responsible for core, theme and plugin updates, backups and WAF protection (over 90% of WP vulnerabilities reside in third-party plugins per Patchstack)',
    },
    {
      id: 'eksport-wlasnosc',
      kryterium: 'CMS item caps, exportability & code ownership',
      webflow: 'Plan-tiered caps on total CMS items and nested collection lists (max 10 nested lists/page); Workspace Code Export downloads static HTML/CSS/JS only - CMS Collections export solely as flat CSV files',
      wordpress: 'No SaaS ceilings on post counts or relationships beyond your server resources; 100% of PHP code and the MySQL database can move to any host at any time',
    },
    {
      id: 'przekierowania-301',
      kryterium: '301 redirect management & custom HTTP headers',
      webflow: 'Clean built-in 301 redirect manager with wildcard path rules in Site Settings; bulk CSV management, complex regex or custom HTTP headers require higher tiers or Cloudflare Workers in front',
      wordpress: 'Free bulk CSV import/export of thousands of regex 301 redirects via Redirection/Rank Math or zero-overhead server rules directly in Nginx / .htaccess',
    },
    {
      id: 'boty-ai',
      kryterium: 'AI crawler readability (OAI-SearchBot, PerplexityBot) & /llms.txt',
      webflow: 'Serves clean server-side HTML easily parsed by non-JS AI crawlers; lack of custom server-side code makes auto-generating dynamic root text endpoints harder without an external proxy',
      wordpress: 'Server-rendered HTML readable by AI bots plus full filesystem/rewrite control to generate /llms.txt dynamically from published posts (verify WAF rules allow AI bot User-Agents)',
    },
    {
      id: 'tco-24m',
      kryterium: '24-month Total Cost of Ownership (TCO)',
      webflow: 'Predictable for a 1-language site, but compounds fast once you stack Workspace seats, Localization Advanced ($29/locale/mo) and third-party CMS filtering apps (e.g. Jetboost)',
      wordpress: 'Lower recurring license fees across multiple languages and large content libraries, offset by steady monthly developer hours for safe maintenance',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Webflow vs WordPress for SEO: 8 architectural and cost criteria',
      html: '<p>Marketing teams frequently migrate from WordPress to Webflow to escape broken Elementor updates and sluggish admin panels. For pure page speed on a single-language site, that move usually pays off immediately. The friction surfaces six months later - when your SEO team tries to build deep <code>/services/city/topic</code> folder silos or launch three European locales with translated URL slugs. Here is the full side-by-side breakdown.</p>',
      tabela: 'glowna',
    },
    {
      id: 'url-kolekcje-hreflang',
      h2: 'Two scaling traps in Webflow SEO: flat CMS paths and per-locale hreflang pricing',
      html: [
        '<p>The first structural constraint in Webflow is how CMS Collection URLs resolve. Static pages can sit inside folders, but every Webflow CMS Collection locks items into a flat two-segment pattern: <code>yourdomain.com/collection-slug/item-slug</code>. If a B2B or multi-location company wants a clean semantic hierarchy like <code>/services/berlin/technical-seo</code> and <code>/services/munich/technical-seo</code> powered by a single reusable collection, Webflow cannot route it natively without splitting collections or putting a Cloudflare reverse proxy in front. WordPress handles arbitrary permalink hierarchies natively.</p>',
        '<p>The second surprise is international <code>hreflang</code> math over 24 months. Webflow’s entry-level <strong>Localization Essential add-on ($9/mo per locale billed annually)</strong> translates on-page text, <strong>but does not let you localize URL slugs</strong> - your German or Polish pages keep English slugs in the URL bar. Unlocking localized URL slugs (vital for non-English organic CTR and keyword relevance) and automatic visitor routing requires <strong>Localization Advanced at $29/mo per extra locale</strong>:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-webflow-wp',
        caption: '24-month platform & multilingual hreflang cost comparison (1 language vs 3 languages)',
        columns: [
          { key: 'scenariusz', label: 'Platform setup' },
          { key: 'licencje24', label: 'Base plan / hosting (24 mo)' },
          { key: 'wielojezycznosc24', label: 'Multilingual + localized URL cost (24 mo)' },
          { key: 'opieka24', label: 'Operational & SEO trade-offs' },
        ],
        rows: COST_ROWS_WEBFLOW_WP_EN,
        przypis: 'Calculated from published Webflow annual USD pricing (read Nov 21, 2026; EUR equivalents at ~0.94 EUR/USD), WPML licensing and AI SEO COMPANY published retainers.',
      },
    },
    {
      id: 'trzecia-droga-nextjs',
      h2: 'When Webflow wins, when WordPress wins, and the third path without per-locale fees',
      html: [
        '<ul>',
        '<li><strong>Pick Webflow when:</strong> your design team builds directly in Webflow Designer, you operate in one primary language, your URL structure fits flat <code>/blog/post</code> collections under a few thousand items, and you want zero server/plugin maintenance.</li>',
        '<li><strong>Pick WordPress when:</strong> you publish high-volume editorial content across deep category hierarchies, want 100% MySQL + PHP portability on any host, or run 3-6 languages without paying per-locale SaaS fees.</li>',
        '</ul>',
      ].join(''),
      h3: [
        {
          id: 'alternatywa-nextjs-booster',
          h3: 'Third alternative for B2B companies: custom Next.js in our Booster Pack (Git/Vercel ownership & 0 per-locale SaaS surcharges)',
          html: [
            `<p>Many B2B teams move to Webflow simply to ditch fragile WordPress plugins while keeping green Core Web Vitals - trading plugin headaches for closed SaaS lock-in and recurring Localization surcharges. A custom-coded <strong>Next.js</strong> website gives you both advantages at once: edge-cached speed with zero PHP plugins, complete source-code and content ownership in your own <strong>Git / Vercel</strong> account, unrestricted URL folder depth, and <strong>€0 recurring SaaS surcharges per locale</strong> when scaling across EN, DE, PL or FR via <code>next-intl</code>.</p>`,
            `<p>Inside our <strong>Booster Pack (€${fmt(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy}-month contract)</strong>, we design and code your custom Next.js website for <strong>€0 upfront</strong> alongside hosting, SSL, technical and content SEO, Google Business Profile management and 24/7 client portal reporting.</p>`,
            zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>Compare standalone Next.js builds (from €${fmt(CENY.strona.eur)} net) with our all-in-one Booster Pack on our ${a(h, 'Next.js web design page')}.</p>`),
            zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Preview a new homepage design built from your current domain in 1-3 minutes with no credit card in our ${a(h, 'free AI website redesign mockup tool')}.</p>`),
            zdanieJesli('/porownania/nextjs-vs-wordpress-seo', (h) => `<p>For a deeper look at React Server Components versus PHP, see ${a(h, 'Next.js vs WordPress for SEO & AI')}.</p>`),
          ].join(''),
        },
      ],
    },
  ],
  faqTytul: 'Questions about Webflow vs WordPress for SEO',
  faq: [
    {
      question: 'Does Webflow rank higher than WordPress in Google because of cleaner code?',
      answer: 'Google does not boost rankings based on which CMS generated the HTML. Webflow’s higher average Core Web Vitals pass rate in HTTP Archive comes from mandatory CDN hosting and preventing users from installing twenty heavy plugins. A disciplined WordPress site on Gutenberg with server caching that passes LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 competes on completely equal footing.',
    },
    {
      question: 'Can I export my entire Webflow CMS site and host it on my own server?',
      answer: 'Only static pages. Webflow’s Code Export (available on paid Workspace plans) downloads static HTML, CSS, JS and media assets, but excludes dynamic CMS templates, site search and native form processing. Your CMS Collections export separately as CSV spreadsheets, meaning moving off Webflow requires rebuilding templates in WordPress or a framework like Next.js.',
    },
    {
      question: 'Why is Webflow’s $9/month Localization Essential plan risky for international SEO?',
      answer: 'Because Essential does not support localized URL slugs for static pages or CMS items - non-English locales inherit the primary language’s URL slug (for example /de/pricing-services instead of /de/preise). Translating URL slugs and enabling automatic locale routing requires upgrading to Localization Advanced at $29/month per extra language (billed annually).',
    },
    {
      question: 'How do we prevent traffic drops when migrating between WordPress and Webflow or Next.js?',
      answer: 'Map every indexed URL and backlinked path 1:1 before DNS cutover. Pay special attention to forced URL prefix changes - for instance, root-level WordPress posts (/topic-guide/) moving under a mandatory Webflow collection folder (/blog/topic-guide) must have permanent 301 redirects tested prior to launch.',
    },
  ],
  sources: [
    { url: 'https://webflow.com/pricing', nazwa: 'Webflow Pricing: Site Plans & Localization Add-on (Essential vs Advanced)', data: '2026-11-21' },
    { url: 'https://help.webflow.com/hc/en-us/articles/33961266466707-Code-export', nazwa: 'Webflow Help Center: Code export (what is included vs CMS/form exclusions)', data: '2026-11-21' },
    { url: 'https://help.webflow.com/hc/en-us/articles/33961311441555-Intro-to-Webflow-Localization', nazwa: 'Webflow Help Center: Intro to Webflow Localization & localized URLs', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: Content Management Systems (CrUX CWV comparison across CMS platforms)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Tell Google about localized versions of your page (hreflang)', data: '2026-11-21' },
    { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (plugin vulnerability share)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (CENY: standalone Next.js from €1,400 net, Booster Pack €590 net/mo min. 3 months)',
    'i18n/routing.js (live multi-locale routing example in Next.js with zero per-locale SaaS fee)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Want Webflow-grade speed without flat CMS URLs or per-locale fees? Get a custom Next.js site in our Booster Pack',
    plan: 'booster',
    linki: [
      { tekst: 'Explore Next.js web design (€0 upfront in Booster Pack)', href: '/projektowanie-stron-internetowych' },
      { tekst: 'See a free AI redesign mockup of your site in 1-3 min', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Webflow versus WordPress for SEO' }],
};

// --- P12 EN: Custom-Coded Website vs Website Builder for SEO -------------------------------------

const COST_ROWS_KOD_KREATOR_EN = [
  {
    id: 'kreator-saas',
    opcja: 'SaaS website builder (Wix, Squarespace) + paid App Market add-ons',
    start: '€0 (DIY drag-and-drop setup by the founder)',
    miesiecznie: '€20 - €75 / mo (platform tier + booking, form, review or Weglot translation apps)',
    wlasnoscPo24m: '0% code portability: cancelling takes the site offline, and migrating off requires rebuilding from scratch',
  },
  {
    id: 'kodowana-solo',
    opcja: 'Standalone custom-coded Next.js website',
    start: `from €${fmt(CENY.strona.eur)} net`,
    miesiecznie: '€0 - €20 / mo for edge / VPS hosting (no app-store fees or revenue share)',
    wlasnoscPo24m: '100% ownership of the Git codebase, components, structured data and content',
  },
  {
    id: 'kodowana-booster',
    opcja: 'Custom-coded Next.js inside our Booster Pack (Web + SEO)',
    start: '€0 upfront design & engineering fee',
    miesiecznie: `€${fmt(CENY.boosterPack.eur)} net / mo (min. ${CENY.boosterPack.umowaMiesiecy} months: custom Next.js site + hosting + full SEO + Google Maps)`,
    wlasnoscPo24m: '100% Google account ownership from day one plus compounding organic traffic without builder ceilings',
  },
];

export const P12_KOD_KREATOR_EN = {
  slug: 'strona-kodowana-czy-kreator-seo',
  title: 'Custom-Coded Website vs Website Builder for SEO (2026)',
  description: 'Custom-coded Next.js site vs SaaS website builders (Wix, Squarespace) for SEO: code ownership, mobile INP/LCP, AI crawler HTML and 24m cost.',
  h1: 'Custom-coded website (Next.js) vs SaaS website builder (Wix, Squarespace): which wins for SEO and AI in 2026?',
  okruszek: 'Custom-coded vs website builder',
  nazwaKarty: 'Custom-coded website vs website builder for SEO',
  teaser: 'Weekend drag-and-drop convenience in a closed SaaS subscription versus an owned codebase with zero platform ceilings. Comparing portability, mobile INP, AI crawler HTML and 24m cost.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'Custom-coded site or a SaaS website builder?', skrot: 'Code portability, mobile INP/LCP, AI crawler HTML and B2B scale' },
  tag: 'Website architecture SEO comparison',
  ujawnienie: `We design and engineer custom Next.js websites (from €${fmt(CENY.strona.eur)} net standalone or €0 upfront inside our Booster Pack). That is why we state upfront when an inexpensive SaaS builder is plenty for an early-stage business and custom code would be premature.`,
  zrodlaDanych: `Data: Google Search Central (Core Web Vitals & JavaScript SEO), HTTP Archive Web Almanac (CMS & CrUX field data), Wix and Squarespace Help Center docs (site export & URL rules), OpenAI/Perplexity crawler docs and our live audit of ai-seo-company.pl (95/100 across ${AUDYT.regul} rules, Nov 18, 2026).`,
  answer: 'Modern SaaS website builders (Wix, Squarespace) handle titles, meta descriptions, XML sitemaps and SSL cleanly, making them perfectly adequate for a small local brochure site in a low-competition niche. A custom-coded website (e.g. Next.js) wins once a B2B or service company scales: you own 100% of a portable Git codebase, control JavaScript weight for mobile INP <= 200 ms, serve clean semantic HTML to non-JS AI crawlers, and ship interactive tools or multi-market hreflang without platform lock-in.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabela-kod-vs-kreator',
  tableCaption: 'Custom-coded website (Next.js) vs SaaS website builders (Wix, Squarespace) across 8 SEO and business criteria',
  tablePrzypis: 'Sources: Google Search Central (Core Web Vitals, JavaScript SEO), HTTP Archive Web Almanac (CrUX pass rates for SaaS builders), Wix Help Center (Exporting or Embedding Your Wix Site Elsewhere), Squarespace Help Center (Exporting your site), OpenAI & Perplexity crawler documentation (read Nov 21, 2026). Trademarks belong to their respective owners.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'kodowana', label: 'Custom-coded website (e.g. Next.js)' },
    { key: 'kreator', label: 'SaaS website builder (Wix, Squarespace)' },
  ],
  rows: [
    {
      id: 'wlasnosc-migracja',
      kryterium: 'Code & database portability when changing vendors',
      kodowana: '100% ownership of source code, templates and content in Git; switching hosts or SEO agencies never forces you to rebuild the website',
      kreator: 'Zero full-site source code export: stopping subscription payments takes your website offline, and leaving Wix or Squarespace requires rebuilding every layout from scratch (beyond partial CSV/XML text exports)',
    },
    {
      id: 'js-inp-lcp',
      kryterium: 'JS bundle weight & mobile INP / LCP (75th percentile CrUX)',
      kodowana: 'Ships only the CSS and JS your page components actually import; React Server Components keep hydration minimal so mobile INP <= 200 ms and LCP <= 2.5 s stay under your engineering control',
      kreator: 'Platform SSR and image CDNs yield solid baseline CrUX pass rates (~65-75% in HTTP Archive), but you cannot tree-shake the proprietary builder runtime once third-party App Market widgets push mobile INP over 200 ms',
    },
    {
      id: 'html-boty-ai',
      kryterium: 'Clean server-rendered HTML for OAI-SearchBot, PerplexityBot & Claude-SearchBot',
      kodowana: 'Minimal semantic HTML (<main>, <article>, <table>, inline JSON-LD) plus full root-path freedom for /llms.txt, segmented sitemaps and granular robots.txt rules',
      kreator: 'Primary page copy is SSR-rendered, but deeply nested builder wrappers, client-injected app widgets (pricing tables, tabs, calculators) and restricted root-level static files limit AI search optimization',
    },
    {
      id: 'narzedzia-programmatic',
      kryterium: 'Custom programmatic tools, calculators & dynamic landing pages',
      kodowana: 'No platform ceiling: bespoke ROI calculators, live SEO checkers, comparison engines and hundreds of programmatic location/industry pages run natively on the same domain',
      kreator: 'Constrained to built-in blocks, sandboxed builder scripting or third-party <iframe> embeds that hurt layout stability (CLS) and keep content outside your main DOM',
    },
    {
      id: 'hreflang-skalowanie',
      kryterium: 'Multi-market scaling & reciprocal hreflang',
      kodowana: 'Full control over localized URL paths (/seo-pricing <-> /cennik-pozycjonowania <-> /de/seo-preise), canonicals, per-locale sitemaps and x-default hreflang at €0/mo extra',
      kreator: 'Wix includes Wix Multilingual subfolders, whereas Squarespace relies primarily on paid Weglot plans billed monthly by word count and language count',
    },
    {
      id: 'kontrola-url-schema',
      kryterium: 'URL hierarchy, HTTP status codes & custom JSON-LD graphs',
      kodowana: 'Arbitrary folder structures, exact HTTP 301/308/410 status codes, custom security/cache headers and hand-validated schema.org graphs without duplicate markup',
      kreator: 'Several content types enforce fixed path prefixes (e.g. /post/ or store paths) and server-level redirect regex or custom HTTP response headers remain locked inside SaaS settings',
    },
    {
      id: 'czas-edycja',
      kryterium: 'Time to launch & solo drag-and-drop editing',
      kodowana: 'Requires professional UX/UI and frontend engineering (with us: AI preview in 1-3 min, bespoke visual mockup in 7 days); updates run via agency retainer or a connected headless CMS',
      kreator: 'Fastest DIY launch: a solo founder with zero coding skills can pick a template and publish a clean 5-page brochure website over a single weekend',
    },
    {
      id: 'koszt-24m',
      kryterium: '24-month cost & asset value (rented SaaS vs owned codebase)',
      kodowana: `Standalone from €${fmt(CENY.strona.eur)} net (plus €0-€20/mo hosting) or €0 upfront in our Booster Pack (€${fmt(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy} months) - builds a permanent company asset`,
      kreator: 'Low entry subscription, but paid App Market add-ons inflate the monthly bill and after 24 months of invoices you still rent a non-exportable template',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Custom-coded website vs SaaS website builder: 8 criteria compared',
      html: '<p>The outdated myth that “Wix or Squarespace sites cannot get indexed in Google” has not been true for years - modern SaaS builders serve valid HTML and post respectable baseline scores in HTTP Archive. The real engineering divide lies elsewhere: <strong>who owns the code when you outgrow the vendor</strong>, <strong>whether you can strip JavaScript bloat hurting mobile INP</strong>, and <strong>what non-JS AI crawlers actually extract from your pages</strong>. Here is the full comparison.</p>',
      tabela: 'glowna',
    },
    {
      id: 'boty-ai-inp-wlasnosc',
      h2: 'Three technical ceilings where growing B2B companies outgrow website builders',
      html: [
        '<p>Across pre-migration technical audits, B2B and service companies typically hit three concrete walls on closed SaaS builders:</p>',
        '<ol>',
        '<li><strong>AI search crawlers do not execute heavy client-side widget runtimes:</strong> crawlers powering AI search citations - including <code>OAI-SearchBot</code>, <code>PerplexityBot</code> and <code>Claude-SearchBot</code> - parse raw HTTP HTML responses without executing complex browser JavaScript. When pricing tables, FAQs or interactive tabs live inside third-party builder apps injected on the client, AI crawlers miss the underlying facts. On a custom Next.js build (our own domain <code>www.ai-seo-company.pl</code> scored <strong>95/100 overall</strong> and <strong>100/100 in AI readiness</strong> across 49 rules on Nov 18, 2026), every table and schema node ships directly in server HTML alongside a native root <code>/llms.txt</code> file.</li>',
        '<li><strong>No access to the bundler when mobile INP degrades:</strong> once you add a cookie banner, live chat, booking calendar and analytics tags onto a builder’s shared client runtime, mobile Interaction to Next Paint (<code>INP</code>) frequently slips past Google’s 200 ms threshold - and you cannot split chunks or move components to React Server Components.</li>',
        '<li><strong>The re-platforming tax:</strong> both Wix and Squarespace explicitly document that full website code and layouts cannot be exported to external hosting. Waiting until you have 150 blog posts under locked prefixes like <code>/post/</code> means paying later to rebuild every template from zero and mapping hundreds of 301 redirects by hand.</li>',
        '</ol>',
        zdanieJesli('/narzedzia/checklista-migracji-strony', (h) => `<p>Planning a move off a SaaS builder already? Download our free ${a(h, 'website migration checklist & 301 redirect map (PDF)')} so you keep every ranking.</p>`),
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>Check how Google PageSpeed and 7 AI crawlers read your current builder site right now in our ${a(h, 'free SEO audit')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-kreator-kiedy-kod',
      h2: 'When a website builder is enough - and how Booster Pack removes the upfront cost of custom code',
      html: [
        '<p>Custom engineering is not mandatory on day one of every venture:</p>',
        '<ul>',
        '<li><strong>A SaaS builder (Wix, Squarespace) is enough when:</strong> you are validating an early idea, running a solo local practice, studio, cafe or portfolio with 5-8 static pages in one language, and 90% of enquiries come from referrals or your local Google Business Profile rather than competitive national search terms.</li>',
        '<li><strong>Move to a custom-coded Next.js site when:</strong> you compete for high-intent B2B or regional service keywords, expand across multiple languages, publish comparison hubs or interactive lead-generation tools, invest in monthly SEO, and want the website to remain a portable asset owned 100% by your company.</li>',
        '</ul>',
        '<p>Historically, the biggest hurdle to custom Next.js development was the upfront build invoice. Here is how all three options compare over 24 months:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-kod-kreator',
        caption: '24-month cost and ownership comparison: SaaS website builder vs custom-coded Next.js',
        columns: [
          { key: 'opcja', label: 'Website model' },
          { key: 'start', label: 'Upfront outlay' },
          { key: 'miesiecznie', label: 'Monthly cost' },
          { key: 'wlasnoscPo24m', label: 'What your business owns after 24 months' },
        ],
        rows: COST_ROWS_KOD_KREATOR_EN,
        przypis: `Sources: published business-tier SaaS builder pricing with common paid add-ons and AI SEO COMPANY pricing (standalone Next.js site from €${fmt(CENY.strona.eur)} net; Booster Pack €${fmt(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy}-month contract). Trademarks belong to their respective owners.`,
      },
      htmlPo: [
        zdanieJesli('/projektowanie-stron-internetowych', (h) => `<p>See everything included in our custom Next.js engineering and Booster Pack on our ${a(h, 'B2B web design page')}.</p>`),
        zdanieJesli('/narzedzia/makieta-redesignu', (h) => `<p>Curious how your current Wix or Squarespace site would look redesigned? Enter your URL for a desktop and mobile preview in 1-3 minutes in our ${a(h, 'free AI website redesign mockup tool')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about custom-coded websites vs website builders for SEO',
  faq: [
    {
      question: 'Does Google penalize websites built on Wix or Squarespace?',
      answer: 'No. Google’s ranking systems do not penalize a domain simply for using a SaaS website builder, and Google Search Central has confirmed small businesses can rank well on them. The disadvantage shows up in competitive markets: you cannot strip shared runtime JavaScript to fix stubborn mobile INP scores, customize URL folder architectures freely, ship native programmatic tools, or export your code when changing providers.',
    },
    {
      question: 'Can I download my HTML and CSS files from Wix or Squarespace and host them elsewhere?',
      answer: 'No. Both Wix and Squarespace are closed proprietary SaaS platforms that do not allow exporting working website source code or templates. If you cancel your plan, your live site goes offline; you can only export limited text records (such as product CSVs or basic blog XML exports in Squarespace) and must rebuild the frontend from scratch.',
    },
    {
      question: 'How long does a custom-coded Next.js website take compared with a drag-and-drop builder?',
      answer: 'Clicking together a basic template in a builder takes a weekend, though it rarely includes keyword mapping, conversion architecture or validated JSON-LD. In our Booster Pack, we deliver your bespoke UX/UI mockup within 7 days - and before even speaking with us, you can generate an AI homepage redesign preview from your existing URL in 1-3 minutes.',
    },
    {
      question: 'Will a custom Next.js website lock me into working only with your agency?',
      answer: 'Quite the opposite. Next.js and React are open-source MIT industry standards known by tens of thousands of frontend engineers worldwide. Because your codebase lives in a standard Git repository and your Google Search Console, GA4 and domain stay in your company’s name from day one, any competent React/Next.js developer can take over at any time.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 thresholds)', data: '2026-11-21' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: JavaScript SEO basics', data: '2026-11-21' },
    { url: 'https://almanac.httparchive.org/en/2024/cms', nazwa: 'HTTP Archive Web Almanac: Content Management Systems (SaaS builder CrUX CWV pass rates)', data: '2026-11-21' },
    { url: 'https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere', nazwa: 'Wix Help Center: Exporting or Embedding Your Wix Site Elsewhere (no source code export)', data: '2026-11-21' },
    { url: 'https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site', nazwa: 'Squarespace Help Center: Exporting your site (XML/CSV export scope & limits)', data: '2026-11-21' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (HTML fetching by OAI-SearchBot)', data: '2026-11-21' },
  ],
  zrodlaWewnetrzne: [
    'lib/audytPrzyklad.js (95/100 overall & 100/100 AI readiness score on www.ai-seo-company.pl on Nov 18, 2026)',
    'lib/narzedziaLiczby.js (CENY: standalone Next.js from €1,400 net, Booster Pack €590 net/mo min. 3 months, MAKIETA: 1-3 min)',
    'components/Pricing.jsx (Booster Pack deliverables: 7-day web mockup, €0 extra fees)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Outgrowing your website builder? Get a custom-coded Next.js website for €0 upfront inside our Booster Pack',
    plan: 'booster',
    linki: [
      { tekst: 'See Next.js web design & Booster Pack terms', href: '/projektowanie-stron-internetowych' },
      { tekst: 'Generate a free AI redesign mockup in 1-3 min', href: '/narzedzia/makieta-redesignu' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Custom-coded website versus SaaS website builder for SEO' }],
};
