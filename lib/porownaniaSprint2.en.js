// English versions of Sprint 2 comparison pages (E1a, November 22, 2026):
//   - P13_SHOPIFY_WOO_EN:    /en/comparisons/shopify-vs-woocommerce-seo (keyed by PL slug)
//   - P14_AHREFS_SEMRUSH_EN: /en/comparisons/ahrefs-vs-semrush-seo-tools (keyed by PL slug)
// Pure relative ESM imports without @/ alias.

import { hrefWJezykuJesliOpublikowana } from './linkiEn.js';
import { AUDYT, AUTORYTET, CENY, POROWNYWARKA_CWV, ROBOTY_AI, WIDOCZNOSC } from './narzedziaLiczby.js';

const L = 'en';
const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function zdanieJesli(sciezkaPl, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(sciezkaPl, L);
  return h ? zdanie(h) : '';
}

// --- P13 EN: Shopify vs WooCommerce for SEO & AI -------------------------------------------------

const TCO_ROWS_SHOPIFY_WOO_EN = [
  {
    id: 'tco-shopify-basic',
    scenariusz: 'Shopify Basic / Grow + 4-6 paid SEO, filter & B2B apps',
    start: '€800 - €2,800 net (Online Store 2.0 theme setup & integrations)',
    miesiecznie: '~$80 - $220 / mo (Basic $29 or Grow $79/mo billed annually + App Store subscriptions + external gateway fee if not using Shopify Payments)',
    razem24: '~$2,800 - $8,200 net over 24 months',
    uwagi: 'Zero server patching and built-in global CDN, but /collections/ and /products/ paths cannot be removed and full Checkout Extensibility requires Shopify Plus ($2,300/mo)',
  },
  {
    id: 'tco-woo',
    scenariusz: 'WooCommerce on WordPress + managed NVMe/Redis hosting + premium extensions',
    start: '€1,200 - €3,800 net (lean block theme, HPOS tables, ERP & courier integrations)',
    miesiecznie: '€60 - €165 / mo (managed hosting with Redis, annual shipping/WPML licenses, 1-2 h developer maintenance)',
    razem24: '€2,640 - €7,760 net over 24 months',
    uwagi: '100% MySQL database ownership, full permalink freedom, custom B2B VAT/tax ID checkout fields and zero platform revenue fees',
  },
  {
    id: 'tco-headless',
    scenariusz: 'Custom Next.js B2B catalog (no retail cart) or Headless storefront',
    start: `Standalone Next.js B2B site from €${fmt(CENY.strona.eur)} net (or €0 upfront in Booster Pack)`,
    miesiecznie: `Inside Booster Pack: €${fmt(CENY.boosterPack.eur)} net / mo (min. ${CENY.boosterPack.umowaMiesiecy} months, includes full SEO & hosting)`,
    razem24: 'Custom quote for Headless e-commerce; lowest maintenance TCO for quote-driven B2B product catalogs',
    uwagi: 'Industrial and wholesale suppliers rarely need a retail cart - a fast static product catalog with spec sheets and RFQ forms converts faster',
  },
];

export const P13_SHOPIFY_WOO_EN = {
  slug: 'shopify-vs-woocommerce-seo',
  title: 'Shopify vs WooCommerce for SEO: URLs, Speed & 24m Cost',
  description: 'Shopify vs WooCommerce for SEO in 2026: URL paths, Core Web Vitals, Product JSON-LD, hreflang, AI crawlers and 24-month app and plugin costs.',
  h1: 'Shopify vs WooCommerce for SEO and AI search: URL architecture, speed and 24-month TCO',
  okruszek: 'Shopify vs WooCommerce for SEO',
  nazwaKarty: 'Shopify vs WooCommerce for SEO & AI',
  teaser: 'Managed SaaS speed with rigid /collections/ and /products/ paths versus open-source WooCommerce with full permalink control, custom B2B checkout and database ownership.',
  kryteria: '9 criteria',
  decyzja: { pytanie: 'Shopify or WooCommerce for e-commerce SEO?', skrot: 'Fixed URL folders and App Store fees vs self-hosted HPOS, custom checkout and full code control' },
  tag: 'E-commerce platform SEO & GEO comparison',
  ujawnienie: `We run technical and content SEO retainers on both Shopify and WooCommerce stores (from €${fmt(CENY.seoStandard.eur)} net/month), and build custom Next.js catalogs for B2B manufacturers. We earn zero affiliate commissions from Shopify or WooCommerce plugin vendors.`,
  zrodlaDanych: 'Data: official Shopify documentation and pricing (Pricing, Shopify Markets, URL structure, robots.txt.liquid), WooCommerce documentation (Permalinks, Structured Data, HPOS) and Google Search Central (Product structured data, Core Web Vitals). Accessed November 22, 2026.',
  answer: 'Shopify wins on out-of-the-box CDN speed, automated hreflang inside Shopify Markets and zero PHP server patching - making it a strong default for D2C retail brands scaling internationally. WooCommerce wins on technical SEO and B2B flexibility: you control every URL slug without forced /collections/ and /products/ folders, customize B2B checkout fields (like EU VAT validation) without a $2,300/mo enterprise tier, and own the entire database.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabela-shopify-vs-woocommerce',
  tableCaption: 'Shopify vs WooCommerce across 9 technical SEO, AI readiness and 24-month cost criteria (November 2026)',
  tablePrzypis: 'Sources: Shopify Help Center & Developer Docs (shopify.com/pricing, shopify.dev), WooCommerce Documentation (woocommerce.com/documentation) and Google Search Central (accessed Nov 22, 2026). Trademarks belong to their respective owners.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'shopify', label: 'Shopify (managed SaaS e-commerce)' },
    { key: 'woocommerce', label: 'WooCommerce (open-source on WordPress)' },
  ],
  rows: [
    {
      id: 'architektura-url',
      kryterium: 'Category, product and blog URL structure',
      shopify: 'Hardcoded /collections/, /products/, /pages/ and /blogs/news/ directories; Liquid themes also require auditing so collection grids link directly to /products/handle instead of duplicate /collections/.../products/handle URLs',
      woocommerce: 'Full control under Settings -> Permalinks: custom category and product bases, nested subcategory hierarchies (/category/subcategory/) and unified editorial blog paths without forced /blogs/ prefixes',
    },
    {
      id: 'ttfb-cwv',
      kryterium: 'Server TTFB & mobile Core Web Vitals (LCP, INP, CLS)',
      shopify: 'Global edge CDN (Cloudflare-backed) and fast server-rendered Liquid HTML; the primary threat to mobile INP and LCP is installing 10-20 storefront apps injecting third-party JS bundles',
      woocommerce: 'Depends on hosting engineering: with High-Performance Order Storage (HPOS, default since WooCommerce 8.2), Redis object cache and edge page caching bypassing cart cookies, TTFB is fast; cheap shared hosting with heavy builders fails CWV',
    },
    {
      id: 'indeksacja-filtry',
      kryterium: 'Faceted navigation (size, color & technical B2B filters)',
      shopify: 'Legacy tag filtering (/collections/shoes/black+leather) easily spawns thousands of thin indexable URLs; native Storefront Filtering (?filter.*) needs clean canonical rules and careful robots.txt.liquid directives',
      woocommerce: 'Complete programmatic control: generate indexable static landing pages for high-demand long-tail filter combinations while keeping multi-select sort and price parameters canonicalized or noindexed',
    },
    {
      id: 'dane-product',
      kryterium: 'Product & Merchant listing JSON-LD structured data',
      shopify: 'Online Store 2.0 themes output baseline Product schema via the Liquid structured_data filter, though full Merchant Center properties (GTIN, shippingDetails, hasMerchantReturnPolicy, B2B tiers) often need Liquid edits or a paid app',
      woocommerce: 'Core WC_Structured_Data outputs Product, Offer and review JSON-LD out of the box, and PHP filters or SEO plugins (Rank Math, Yoast WooCommerce) extend Merchant Center fields with no recurring monthly app fee',
    },
    {
      id: 'wielojezycznosc-hreflang',
      kryterium: 'International Markets, multi-currency & hreflang tags',
      shopify: 'Turnkey Shopify Markets setup: localized subfolders (/de/, /fr/), subdomains or ccTLDs with automatic reciprocal hreflang tags and market XML sitemaps; Shopify Translate & Adapt auto-translates up to 2 languages free',
      woocommerce: 'Full flexibility via WPML (WooCommerce Multilingual) or Polylang for WooCommerce: translated product, attribute and category slugs under one flat annual license, though multi-currency tax rules take more setup',
    },
    {
      id: 'checkout-b2b',
      kryterium: 'Checkout customization & B2B wholesale logic',
      shopify: 'High-converting one-page checkout and Shop Pay, but deep Checkout Extensibility and native B2B wholesale catalogs are largely gated behind Shopify Plus (starting around $2,300/mo)',
      woocommerce: '100% open checkout templates on any hosting plan: EU VIES VAT ID validation, net-30 invoice terms, custom freight calculators and ERP sync without upgrading to an enterprise SaaS tier',
    },
    {
      id: 'boty-ai-llms',
      kryterium: 'AI crawler access (OAI-SearchBot, PerplexityBot) & /llms.txt',
      shopify: 'Server-rendered Liquid HTML exposes product copy and prices cleanly to non-JS AI crawlers; robots.txt is editable via robots.txt.liquid, but hosting a custom root /llms.txt file natively is blocked without reverse-proxy workarounds',
      woocommerce: 'Direct filesystem and rewrite access: serve a static or dynamic /llms.txt index at your root domain in minutes and manage AI bot rules across both robots.txt and server WAF',
    },
    {
      id: 'koszty-24m',
      kryterium: '24-month cost structure (apps, transaction fees & hosting)',
      shopify: 'Published USD tiers ($29 Basic, $79 Grow, $299 Advanced/mo billed annually; $39/$105/$399 month-to-month) + recurring App Store fees + extra transaction fees when using external payment gateways outside Shopify Payments',
      woocommerce: 'Free GPL core software; you pay for managed hosting, selected annual plugin renewals and developer care, with 0% platform transaction surcharge on top of your payment processor',
    },
    {
      id: 'wlasnosc-migracja',
      kryterium: 'Data ownership & platform lock-in',
      shopify: 'Proprietary SaaS backend: products, customers and orders export to CSV/API, whereas Liquid templates and app logic must be rebuilt if you ever leave the platform',
      woocommerce: '100% ownership of PHP code, media and MySQL database - migrate the entire store between any cloud or European VPS host in a single maintenance window',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Shopify vs WooCommerce for SEO: 9 technical and commercial criteria',
      html: '<p>Neither Shopify nor WooCommerce has an inherent ranking advantage in Google’s algorithm - stores on both platforms hold top-three positions across competitive e-commerce verticals. The real SEO differences emerge once you scale past a few hundred SKUs, build faceted category pages, and add up 24 months of app subscriptions and payment fees.</p>',
      tabela: 'glowna',
    },
    {
      id: 'architektura-url-duplikaty',
      h2: 'URL architecture and collection-path product duplication: the #1 technical gap',
      html: [
        '<p>Shopify’s routing enforces fixed directory prefixes: every category lives under <code>/collections/</code>, every item under <code>/products/</code>, and static content under <code>/pages/</code>. Having English folder names in the URL rarely stops a store from ranking in local markets, but <strong>default Liquid collection links waste crawl budget</strong> and split internal link equity.</p>',
        '<p>Out of the box, many Shopify themes link product cards inside collections to <code>store.com/collections/winter-boots/products/model-x</code> while setting <code>rel="canonical"</code> to <code>store.com/products/model-x</code>. When one SKU belongs to six collections, crawlers fetch six non-canonical URLs per product and every internal link passes through a canonical consolidation step. In week one of a Shopify SEO audit, we replace <code>product.url | within: collection</code> inside Liquid product-card snippets with direct <code>product.url</code> links.</p>',
        '<p><strong>WooCommerce</strong> imposes no fixed folder names: you can localize <code>/product-category/</code> or build nested trees such as <code>/workwear/high-vis-jackets/</code>. The caution runs the opposite way: stripping category bases entirely via third-party plugins on a 20,000-SKU catalog can bloat WordPress rewrite rules and trigger 404 collisions when a post and a subcategory share a slug.</p>',
      ].join(''),
    },
    {
      id: 'szybkosc-hpos-cwv',
      h2: 'TTFB and mobile Core Web Vitals: Shopify’s edge CDN vs WooCommerce with HPOS',
      html: [
        '<p>Historically, WooCommerce struggled under concurrent traffic because every order row lived alongside blog posts and pages inside <code>wp_posts</code> and <code>wp_postmeta</code>. Since WooCommerce 8.2, <strong>High-Performance Order Storage (HPOS)</strong> stores orders in four dedicated, indexed database tables (<code>_wc_orders</code>) by default. Paired with <strong>Redis object caching</strong> and server-level page caching that bypasses cart cookies, a clean WooCommerce build delivers fast TTFB.</p>',
        '<p>On <strong>Shopify</strong>, global CDN caching and server uptime work out of the box with zero DevOps. Instead, mobile performance usually degrades via <strong>App Store creep</strong>: stacking separate apps for pop-ups, loyalty widgets, photo reviews, chat, countdown timers and bundles injects hundreds of kilobytes of render-blocking scripts, pushing mobile <strong>INP above the 200 ms threshold</strong>.</p>',
        zdanieJesli('/narzedzia/test-core-web-vitals-porownanie', (h) => `<p>Benchmark real ${POROWNYWARKA_CWV.dniCrux}-day Chrome UX Report field metrics of any two stores head-to-head in our ${a(h, 'free Core Web Vitals comparison tool')}.</p>`),
      ].join(''),
    },
    {
      id: 'koszty-24-miesiace',
      h2: '24-month Total Cost of Ownership: factor in apps, plugins and payment gateways',
      html: [
        '<p>Comparing base Shopify subscription tiers (<strong>Basic $29/mo</strong>, <strong>Grow $79/mo</strong>, <strong>Advanced $299/mo</strong> billed annually, or <strong>$39 / $105 / $399</strong> month-to-month - read from <code>shopify.com/pricing</code> on November 22, 2026) against WooCommerce’s $0 GPL plugin misses the real operational line items on both sides:</p>',
      ].join(''),
      tabela: {
        id: 'tabela-tco-shopify-woo',
        caption: 'Illustrative 24-month store build, app/plugin and maintenance TCO (net)',
        columns: [
          { key: 'scenariusz', label: 'Store setup' },
          { key: 'start', label: 'Initial build' },
          { key: 'miesiecznie', label: 'Recurring monthly cost' },
          { key: 'razem24', label: '24-month illustrative total' },
          { key: 'uwagi', label: 'SEO & commercial trade-offs' },
        ],
        rows: TCO_ROWS_SHOPIFY_WOO_EN,
        przypis: 'Sources: published Shopify USD pricing (shopify.com/pricing, accessed Nov 22, 2026, excluding VAT), typical European managed WooCommerce hosting retainers, and AI SEO COMPANY published Next.js / Booster Pack rates.',
      },
      htmlPo: [
        zdanieJesli('/narzedzia/audyt-seo', (h) => `<p>Already running a Shopify or WooCommerce store? Scan up to ${AUDYT.stron} URLs across ${AUDYT.regul} technical, content and AI rules in our ${a(h, 'free SEO audit tool')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-shopify-kiedy-woocommerce',
      h2: 'Decision rule: which platform wins for your store in 2026?',
      html: [
        '<ul>',
        '<li><strong>Choose Shopify when:</strong> you are launching or scaling a D2C consumer brand, want effortless multi-country subfolders and automatic <code>hreflang</code> via Shopify Markets, and prefer predictable SaaS uptime without managing PHP updates or server security.</li>',
        '<li><strong>Choose WooCommerce when:</strong> you run a B2B, industrial or technical catalog with deep category hierarchies and attribute landing pages, need custom checkout fields (VAT ID validation, invoice terms, regional ERP/shipping integrations) without paying $2,300/mo for Plus, and want 100% database ownership.</li>',
        '<li><strong>Choose custom Next.js without a cart when:</strong> you sell wholesale or engineered B2B products strictly via Request-for-Quote (RFQ) forms - dropping unused cart machinery yields faster Core Web Vitals and lower maintenance costs.</li>',
        '</ul>',
        zdanieJesli('/porownania/nextjs-vs-wordpress-seo', (h) => `<p>Selling B2B services or quote-based products without a checkout? See our comparison of ${a(h, 'Next.js vs WordPress for SEO & AI')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about Shopify vs WooCommerce SEO',
  faq: [
    {
      question: 'Can you remove /collections/ and /products/ from Shopify URLs?',
      answer: 'Not on a standard Shopify Online Store theme. The /collections/, /products/, /pages/ and /blogs/ path segments are hardcoded into Shopify’s routing layer. The only way to serve completely custom URL hierarchies on top of a Shopify backend is building a Headless storefront (e.g. in Next.js or Hydrogen) via the Storefront API, which only makes financial sense for larger stores.',
    },
    {
      question: 'How do you fix duplicate collection product URLs in Shopify?',
      answer: 'Edit your Liquid product-card template (typically card-product.liquid or product-grid-item.liquid) and replace product.url | within: collection with direct product.url. Every collection page will then link straight to the canonical /products/product-handle URL instead of generating multiple collection-prefixed duplicates.',
    },
    {
      question: 'Is WooCommerce too slow to pass mobile Core Web Vitals with thousands of SKUs?',
      answer: 'No, provided the stack is engineered properly: enable High-Performance Order Storage (HPOS), host on NVMe servers with Redis object caching rather than budget shared hosting, configure edge/server page caching for logged-out visitors, and avoid heavy visual page builders.',
    },
    {
      question: 'Which platform works better for AI search engines (ChatGPT, Perplexity, Google AI Overviews)?',
      answer: 'Both render product descriptions, pricing and Product JSON-LD server-side (Liquid on Shopify, PHP on WooCommerce), allowing non-JS crawlers like OAI-SearchBot and PerplexityBot to read full product specs immediately. WooCommerce holds a slight edge if you want to serve a custom /llms.txt file at the root domain and tailor nested schema graphs without extra monthly app fees.',
    },
  ],
  sources: [
    { url: 'https://www.shopify.com/pricing', nazwa: 'Shopify Pricing: Basic, Grow, Advanced & Plus monthly and annual tiers', data: '2026-11-22' },
    { url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview', nazwa: 'Shopify Help Center: Improving search engine optimization (URL structure, canonicals & sitemaps)', data: '2026-11-22' },
    { url: 'https://shopify.dev/docs/storefronts/themes/seo', nazwa: 'Shopify Developer Docs: Theme SEO, structured_data filter & robots.txt.liquid', data: '2026-11-22' },
    { url: 'https://help.shopify.com/en/manual/international/pricing-and-domains/domains', nazwa: 'Shopify Help Center: International domains, subfolders & automatic hreflang in Shopify Markets', data: '2026-11-22' },
    { url: 'https://woocommerce.com/document/permalinks/', nazwa: 'WooCommerce Documentation: Configuring product and category permalinks', data: '2026-11-22' },
    { url: 'https://woocommerce.com/document/high-performance-order-storage/', nazwa: 'WooCommerce Documentation: High-Performance Order Storage (HPOS)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/appearance/structured-data/product', nazwa: 'Google Search Central: Product structured data (Product snippet & Merchant listing)', data: '2026-11-22' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (POROWNYWARKA_CWV.dniCrux = 28, CENY: seoStandard €450, strona €1,400, boosterPack €590)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Running Shopify or WooCommerce and losing organic revenue to filter bloat or slow mobile CWV? Request an audit & fix plan in 24h',
    plan: 'standard',
    linki: [
      { tekst: 'See monthly SEO retainers from €450 net', href: '/cennik-pozycjonowania' },
      { tekst: 'Run a free 49-rule SEO audit on your store', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Shopify versus WooCommerce for SEO and AI search' }],
};

// --- P14 EN: Ahrefs vs Semrush vs Free SEO Tool Stack --------------------------------------------

const BUDGET_ROWS_TOOLS_EN = [
  {
    id: 'budzet-free',
    profil: 'Small B2B or service company (1 domain, single market, no dedicated in-house SEO specialist)',
    zestaw: 'Free first-party stack: Google Search Console + Bing Webmaster Tools + AI SEO COMPANY free tools',
    kosztRoczn: '$0 / €0 per year',
    uzasadnienie: 'Gives 100% of your actual Google queries and clicks, Bing backlink explorer, 49-rule technical audit, Common Crawl 0-100 authority score and AI visibility sample with zero SaaS overhead',
  },
  {
    id: 'budzet-inhouse',
    profil: 'In-house marketing or e-commerce team (publishing 4-10+ pieces/mo and researching competitors weekly)',
    zestaw: '1 paid seat (Ahrefs Lite $129/mo or Semrush Pro $139.95/mo) + GSC',
    kosztRoczn: '~$1,290 - $1,680 net / year (depending on annual vs monthly billing)',
    uzasadnienie: 'Ahrefs accelerates competitor backlink and content-gap workflows; Semrush bundles daily 500-keyword rank tracking and competitor Google Ads research in one seat',
  },
  {
    id: 'budzet-agencja',
    profil: 'Company wanting shipped pages, technical fixes and earned links rather than raw charts',
    zestaw: `Monthly SEO retainer (e.g. our SEO Standard plan from €${fmt(CENY.seoStandard.eur)} net/mo)`,
    kosztRoczn: `from €${fmt(CENY.seoStandard.eur * 12)} net / year (rolling monthly contract; includes execution, content, links & 24/7 portal)`,
    uzasadnienie: 'Instead of spending €1,400-€2,800/yr on an analytics seat nobody acts on, budget goes straight into engineering fixes, commercial copy and link outreach',
  },
];

export const P14_AHREFS_SEMRUSH_EN = {
  slug: 'ahrefs-vs-semrush-narzedzia-seo',
  title: 'Ahrefs vs Semrush vs Free SEO Tools: 2026 Pricing',
  description: 'Ahrefs vs Semrush in 2026: published plan prices, credit limits, backlink and keyword data, plus when a B2B team only needs free SEO tools.',
  h1: 'Ahrefs vs Semrush vs a free SEO stack: features, credit limits and 2026 pricing compared',
  okruszek: 'Ahrefs vs Semrush vs free tools',
  nazwaKarty: 'Ahrefs vs Semrush vs free SEO tools',
  teaser: 'The two leading commercial SEO suites compared side by side with a €0 first-party stack (Google Search Console, Bing Webmaster Tools, Common Crawl & CrUX). With real USD plan tiers and credit rules.',
  kryteria: '9 criteria',
  decyzja: { pytanie: 'Pay for Ahrefs, Semrush, or use a free SEO stack?', skrot: 'Backlink speed & credits in Ahrefs, rank tracking & PPC in Semrush, or €0 first-party GSC + diagnostic tools' },
  tag: 'SEO software & budget comparison',
  ujawnienie: 'We use commercial SEO databases and APIs in our agency work while publishing our own free diagnostic tools and running monthly SEO retainers. This page contains zero affiliate links. Ahrefs and Semrush are registered trademarks of their respective owners; all pricing and limit figures come from their publicly published pricing pages.',
  zrodlaDanych: `Data: published Ahrefs pricing (ahrefs.com/pricing) and Semrush pricing (semrush.com/pricing), Google Search Console & Bing Webmaster Tools documentation, and AI SEO COMPANY tool specifications (Common Crawl ${AUTORYTET.wydanie}, CrUX API, ${AUDYT.regul}-rule crawler). Accessed November 22, 2026.`,
  answer: 'Ahrefs and Semrush are built for competitive research: Ahrefs excels at fast backlink discovery and content-gap workflows (Lite from $129/mo, plus a limited $29/mo Starter tier), while Semrush pairs SEO with daily rank tracking and Google Ads competitor data (Pro from $139.95/mo). For a single-domain B2B business without an in-house SEO specialist, however, a free stack - Google Search Console, Bing Webmaster Tools and our free diagnostic tools - covers baseline technical and authority checks for €0.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabela-ahrefs-semrush-free',
  tableCaption: 'Ahrefs, Semrush and a free first-party SEO stack compared across 9 criteria (as of November 22, 2026)',
  tablePrzypis: 'Sources: official pricing pages ahrefs.com/pricing and semrush.com/pricing (USD list prices excluding VAT/sales tax, accessed Nov 22, 2026), Google Search Console & Bing Webmaster Tools documentation, and AI SEO COMPANY tool specs (lib/narzedziaLiczby.js). No affiliate relationship with Ahrefs or Semrush.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'ahrefs', label: 'Ahrefs' },
    { key: 'semrush', label: 'Semrush' },
    { key: 'darmowe', label: 'Free stack (GSC + Bing + AI SEO tools)' },
  ],
  rows: [
    {
      id: 'cennik-miesieczny',
      kryterium: 'Published monthly pricing (USD net before tax, Nov 22, 2026)',
      ahrefs: 'Starter $29/mo (monthly only, narrow starter quota), Lite $129/mo, Standard $249/mo, Advanced $449/mo, Enterprise custom annual; up to ~17% discount when billed annually from Lite upward',
      semrush: 'Pro $139.95/mo, Guru $249.95/mo, Business $499.95/mo; up to ~17% discount when billed annually (~$117.33/mo on Pro, ~$208.33/mo on Guru)',
      darmowe: '$0 / €0 (Google Search Console, Bing Webmaster Tools, Google Keyword Planner, plus 9 free interactive tools and 13 PDF templates on our site)',
    },
    {
      id: 'limity-kredyty',
      kryterium: 'Report credit system & user seats',
      ahrefs: '1 user seat included; Starter and Lite enforce monthly report credit quotas per user, while Standard ($249/mo) and above unlock unlimited fair-use report credits',
      semrush: '1 user seat included; no per-click report credit meter inside core SEO views, governed instead by daily query limits and project caps (5 projects on Pro, 15 on Guru, 40 on Business)',
      darmowe: 'Unlimited team users inside your own Search Console and Bing properties; transparent daily per-IP rate limits on our free tools with zero sign-up',
    },
    {
      id: 'dane-wlasnej-domeny',
      kryterium: 'Traffic accuracy on your own domain',
      ahrefs: 'Modeled estimate derived from tracked keyword rankings multiplied by an average CTR curve (optional GSC link in Ahrefs Webmaster Tools)',
      semrush: 'Modeled organic and paid traffic estimate based on observed SERP keywords (optional GSC/GA4 integration inside projects)',
      darmowe: 'First-party ground truth in Google Search Console: real impressions, clicks and queries over the past 16 months (subject only to Google’s rare-query privacy thresholds)',
    },
    {
      id: 'analiza-linkow',
      kryterium: 'Backlink index & competitor link gap',
      ahrefs: 'High-frequency commercial crawler (AhrefsBot), historical referring-domain charts, anchor filters and Link Intersect across multiple competitors',
      semrush: 'Comprehensive Backlink Analytics and Backlink Audit with Authority Score, multi-competitor gap matrix and built-in outreach workflow',
      darmowe: `Own-site link reports in GSC & Bing Webmaster Tools plus our free 0-100 authority checker built on the public Common Crawl link graph (${fmt(AUTORYTET.domenWGrafie)} domains, compare up to ${AUTORYTET.konkurentow} rivals without individual backlink URL exports)`,
    },
    {
      id: 'badanie-fraz',
      kryterium: 'Competitor keyword research (Keyword Gap)',
      ahrefs: 'Keywords Explorer with click-stream estimates, link-based Keyword Difficulty (KD) and instant views of every ranking page on any competing domain',
      semrush: 'Keyword Magic Tool with search-intent classification, multi-domain Keyword Gap and historical SERP snapshots (Guru tier and up)',
      darmowe: 'Search Console reveals every query your site already appears for, and Google Ads Keyword Planner provides search volumes and CPC bids (shows ranges without active ad spend; cannot dump a competitor’s entire ranking keyword list)',
    },
    {
      id: 'audyt-techniczny',
      kryterium: 'Technical site audit & Core Web Vitals',
      ahrefs: 'Cloud Site Audit (also available free for verified own domains via Ahrefs Webmaster Tools within crawl limits), JS rendering and internal link graphs',
      semrush: 'Cloud Site Audit (up to 100,000 crawled pages/mo on Pro) covering indexability, hreflang, duplicates and internal linking',
      darmowe: `Our free SEO audit checks up to ${AUDYT.stron} pages across ${AUDYT.regul} rules (1-100 score), our CWV comparator benchmarks ${POROWNYWARKA_CWV.dniCrux}-day CrUX data head-to-head, and our bot tester checks ${ROBOTY_AI.botow} AI crawlers in robots.txt`,
    },
    {
      id: 'reklamy-ppc',
      kryterium: 'Competitor Google Ads (PPC) intelligence',
      ahrefs: 'Paid keyword and ad-copy overview inside Site Explorer, secondary to its organic search focus',
      semrush: 'Standout strength: deep historical Google Ads text and Shopping (PLA) ad copies, competitor CPC budget estimates and keyword overlap tools',
      darmowe: 'Google Ads Transparency Center lets anyone inspect active ad creatives of any verified advertiser for free, without automated competitor keyword exports',
    },
    {
      id: 'widocznosc-ai',
      kryterium: 'AI search visibility tracking (ChatGPT, Perplexity, AI Overviews)',
      ahrefs: 'AI Overview SERP tracking plus brand/AI monitoring add-ons (certain modules priced above base tiers)',
      semrush: 'AI Overview SERP feature tracking in Position Tracking plus separately priced AI/GEO visibility add-ons',
      darmowe: `Search Console’s Generative AI report (aggregate AI Overview/AI Mode impressions) plus our free AI visibility checker testing ${WIDOCZNOSC.pytan} buyer prompts across ${WIDOCZNOSC.silnikow} AI sources`,
    },
    {
      id: 'dla-kogo',
      kryterium: 'Best fit & highest ROI',
      ahrefs: 'SEO agencies, link-building teams and content strategists dissecting competitor link profiles and top pages every day',
      semrush: 'In-house marketing teams managing organic SEO, daily local/national rank tracking and Google Ads campaigns under one roof',
      darmowe: 'Single-domain B2B founders and marketing managers diagnosing their site before hiring an agency or maintaining foundational SEO in-house',
    },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Ahrefs vs Semrush vs a free SEO stack: 9 criteria compared',
      html: '<p>Most software roundups compare only Ahrefs against Semrush while skipping the first question a B2B founder should ask: if you manage a single company website, <strong>do you need a $130-$250/month SEO subscription at all?</strong> The table below benchmarks both commercial suites against first-party free tools.</p>',
      tabela: 'glowna',
    },
    {
      id: 'skad-biora-sie-roznice-w-liczbach',
      h2: 'Why Ahrefs, Semrush and Google Search Console report completely different traffic numbers',
      html: [
        '<p>A classic question during B2B audits is: "Why does Ahrefs estimate 180 monthly visits for our domain, Semrush says 310, while Google Search Console shows 940 real clicks?" None of the three is broken - they measure different layers:</p>',
        '<ul>',
        '<li><strong>Google Search Console (first-party truth):</strong> logs actual Google impressions and clicks on your verified property, capturing thousands of long-tail technical, SKU and regional queries that no third-party keyword dictionary tracks.</li>',
        '<li><strong>Ahrefs & Semrush (dictionary-based estimation):</strong> periodically scrape a fixed national database of keywords, check where your URL ranks, and multiply estimated search volume by a modeled click-through rate. In specialized B2B, manufacturing and regional services, third-party traffic estimates routinely undercount real organic traffic several times over.</li>',
        '<li><strong>Authority scores (DR vs AS vs our Common Crawl score):</strong> Ahrefs Domain Rating and Semrush Authority Score are proprietary 0-100 link metrics. Google uses neither in its ranking systems. Our free checker computes its own independent 0-100 score from the open Common Crawl host/domain graph without claiming affiliation with third-party vendors.</li>',
        '</ul>',
        zdanieJesli('/porownania/dr-vs-da-vs-autorytet-common-crawl', (h) => `<p>For the exact math behind link authority metrics, read ${a(h, 'Domain Rating vs Domain Authority vs Common Crawl authority')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-ahrefs-kiedy-semrush',
      h2: 'Ahrefs vs Semrush: how to pick between the two when you have an active SEO team',
      html: [
        '<p>Once someone on your team dedicates weekly hours to competitive research, choosing between the two market leaders comes down to workflow and billing rules:</p>',
        '<ul>',
        '<li><strong>Pick Ahrefs for link acquisition and fast competitor page teardowns:</strong> Site Explorer makes it effortless to see which exact articles or service pages drive a competitor’s traffic and which external sites link to them. Watch the credit model: <strong>Lite ($129/mo)</strong> caps monthly report credits per user, so heavy daily filtering typically pushes active practitioners onto <strong>Standard ($249/mo)</strong>, where report credits become unlimited under fair use. The <strong>Starter ($29/mo)</strong> plan is strictly for light occasional lookups.</li>',
        '<li><strong>Pick Semrush when combining SEO, daily rank tracking and Google Ads:</strong> <strong>Pro ($139.95/mo)</strong> already tracks 500 keywords daily with city/ZIP targeting and exposes competitor Google Ads copy and Shopping campaigns. Historical data and the full Content Marketing Toolkit unlock on <strong>Guru ($249.95/mo)</strong>.</li>',
        '<li><strong>Check free verified-owner tiers first:</strong> before paying, remember that <em>Ahrefs Webmaster Tools</em> lets verified domain owners run Site Audit and inspect their own backlinks for free (without competitor lookups), while Semrush offers a small daily free query allowance on a free account.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'matematyka-budzetu-b2b',
      h2: 'B2B budget math: paying $1,500+/year for dashboards vs funding execution',
      html: [
        '<p>Across SMEs, the most common budget leak is buying an annual SEO software license that nobody logs into after month one - because dashboards do not rewrite slow templates, publish comparison pages or earn industry citations on their own.</p>',
      ].join(''),
      tabela: {
        id: 'tabela-budzet-narzedzia-seo',
        caption: 'Matching SEO tool spend to company stage and team capacity (November 2026)',
        columns: [
          { key: 'profil', label: 'Company profile' },
          { key: 'zestaw', label: 'Recommended stack' },
          { key: 'kosztRoczn', label: 'Annual net software / retainer cost' },
          { key: 'uzasadnienie', label: 'Why the ROI works' },
        ],
        rows: BUDGET_ROWS_TOOLS_EN,
        przypis: `Sources: published Ahrefs & Semrush pricing (accessed Nov 22, 2026) and AI SEO COMPANY published retainers (SEO Standard from €${fmt(CENY.seoStandard.eur)} net/mo).`,
      },
      htmlPo: [
        zdanieJesli('/narzedzia', (h) => `<p>Explore all of our no-signup diagnostic calculators, checkers and PDF templates in the ${a(h, 'free SEO & AI tools hub')}.</p>`),
        zdanieJesli('/porownania/seo-in-house-czy-agencja', (h) => `<p>Weighing an internal hire + software stack against an external retainer? Read ${a(h, 'in-house SEO vs SEO agency')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about Ahrefs, Semrush and free SEO tools',
  faq: [
    {
      question: 'Can a small B2B company do effective SEO without paying for Ahrefs or Semrush?',
      answer: 'Yes, especially at the foundational stage for a single domain. Google Search Console gives exact queries, impressions, clicks and indexing status straight from Google; Bing Webmaster Tools provides free backlink reports and technical scans; and our free SEO audit checks 49 technical, on-page and AI readiness rules. Paid suites become essential when you need bulk competitor keyword-gap and link-intersect data.',
    },
    {
      question: 'How does free Ahrefs Webmaster Tools differ from the $129/mo Lite plan?',
      answer: 'Ahrefs Webmaster Tools (AWT) is free for websites where you verify ownership (for example via Google Search Console). It lets you crawl your own site in Site Audit and view backlinks and ranking keywords for your own domain only. Entering competitor domains or researching new topics in Keywords Explorer requires a paid plan.',
    },
    {
      question: 'What should buyers watch out for on Ahrefs Starter ($29) and Lite ($129)?',
      answer: 'Pay attention to monthly report credits and user seats. Base plans include one user seat, and on Starter and Lite opening reports, applying filters or exporting rows in key tools consumes monthly credits. Testing a monthly subscription for 30 days before committing to an annual plan helps gauge your team’s real credit consumption.',
    },
    {
      question: 'Do AI SEO COMPANY retainer clients have to buy separate SEO software licenses?',
      answer: 'No. Every monthly retainer (starting from €450 net/month in SEO Standard) covers our agency’s commercial crawlers, keyword databases and weekly AI search API queries. You keep 100% ownership of your Google Search Console and GA4 properties and view live progress 24/7 in our client portal.',
    },
  ],
  sources: [
    { url: 'https://ahrefs.com/pricing', nazwa: 'Ahrefs Pricing: Starter, Lite, Standard & Advanced tiers and credit policy', data: '2026-11-22' },
    { url: 'https://ahrefs.com/webmaster-tools', nazwa: 'Ahrefs Webmaster Tools: free verified-domain Site Audit & Site Explorer scope', data: '2026-11-22' },
    { url: 'https://www.semrush.com/pricing/', nazwa: 'Semrush Pricing: Pro, Guru & Business plans and project limits', data: '2026-11-22' },
    { url: 'https://search.google.com/search-console/about', nazwa: 'Google Search Console: official Google search performance and indexing diagnostics', data: '2026-11-22' },
    { url: 'https://www.bing.com/webmasters/about', nazwa: 'Bing Webmaster Tools: free backlink reports, Site Scan & IndexNow', data: '2026-11-22' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: 'Common Crawl Web Graphs: open web link graph used by our free authority checker', data: '2026-11-22' },
  ],
  zrodlaWewnetrzne: [
    'lib/narzedziaLiczby.js (AUDYT: 25 pages, 49 rules; AUTORYTET: cc-main-2026-aug-sep-oct, 134,979,706 domains; WIDOCZNOSC: 3 prompts, 5 AI engines; CENY: SEO Standard from €450 net)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Skip unused SaaS subscriptions: benchmark your domain free right now, or put your budget into monthly execution',
    plan: 'standard',
    linki: [
      { tekst: 'Run a free 49-rule SEO audit (1-100 score)', href: '/narzedzia/audyt-seo' },
      { tekst: 'Check your 0-100 domain authority free (Common Crawl)', href: '/narzedzia/autorytet-domeny' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Ahrefs versus Semrush versus free SEO tools' }],
};

export const porownaniaSprint2En = [P13_SHOPIFY_WOO_EN, P14_AHREFS_SEMRUSH_EN];

export default porownaniaSprint2En;
