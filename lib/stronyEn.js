// Wersje angielskie nowych stron (9.11.2026, prośba Filipa: „wszystkie nowe podstrony i aplikacje
// także w wersji angielskiej”). Czysty ESM bez importów: routing (i18n/routing.js), bramka stron
// (lib/stronaPl.js), lista tylko-PL (lib/plOnly.js) i sitemapa biorą adresy stąd.
//
// Klucz = ścieżka PL (klucz routingu next-intl), wartość = ścieżka EN bez prefiksu /en.
// Strona EN jest publiczna, gdy publiczna jest strona PL (lib/publikacja.js) i strona ma tu wpis.
// tytul/opis = title i meta description wersji EN (odpowiednik PUBLIKACJA[...].tytul/opis).
// 12.11.2026 (S1-poprawki Z-00): jedyny import to lib/narzedziaLiczby.js (czysty ESM bez importów,
// działa też w middleware), żeby liczby audytu w meta szły ze stałej.

import { AUDYT } from './narzedziaLiczby.js';

export const STRONY_EN = {
  '/porownania': {
    en: '/comparisons',
    tytul: 'SEO comparisons: choose an agency or pricing model',
    opis: 'SEO comparisons with data and sources: pay for results or a monthly retainer, SEO or GEO, SEO or Google Ads. With an update date, no guesswork.',
  },
  '/porownania/seo-vs-geo': {
    en: '/comparisons/seo-vs-geo',
    tytul: 'SEO vs GEO: how they differ and where to start in 2026',
    opis: 'SEO vs GEO: SEO wins positions in Google, GEO wins mentions in ChatGPT, Gemini and Google AI Overviews. What they share, what differs, and where to start.',
  },
  '/porownania/pozycjonowanie-za-efekt-czy-abonament': {
    en: '/comparisons/pay-for-results-vs-monthly-retainer',
    tytul: 'Pay-for-results SEO or a monthly retainer? 2026 comparison',
    opis: 'Pay-for-results SEO versus a monthly retainer: what you pay for, which risks you carry and when each model makes sense. With a decision table.',
  },
  '/porownania/seo-czy-google-ads': {
    en: '/comparisons/seo-vs-google-ads',
    tytul: 'SEO vs SEM (Google Ads): Costs and Time to Results',
    opis: 'SEO vs SEM (Google Ads): the cost per click from our campaign (PLN 7.92), time to results and what stays after you stop paying. When to combine them.',
  },
  '/porownania/jak-wybrac-agencje-seo': {
    en: '/comparisons/how-to-choose-an-seo-agency',
    tytul: 'How to choose an SEO agency: 12 questions to ask',
    opis: 'How to choose an SEO agency: twelve questions that separate a solid agency from a risky one, from reporting and contract terms to account ownership.',
  },
  '/copywriting-seo': {
    en: '/seo-copywriting',
    tytul: 'SEO copywriting services: content in SEO packages from €450',
    opis: 'SEO copywriting inside our SEO packages: 2 or 4 pieces of content a month, written from a brief and fact-checked. Pricing and free templates.',
  },
  '/link-building': {
    en: '/link-building-services',
    tytul: 'Link building services: editorial links, 2 or 4 a month',
    opis: 'Link building services inside SEO packages: audit, linkable asset, outreach to editors, reporting. 2 links a month in Standard, 4 in Premium.',
  },
  '/porownania/agencja-seo-czy-freelancer': {
    en: '/comparisons/seo-agency-vs-freelancer',
    tytul: 'SEO Agency vs Freelancer: Costs, Risks and Contract Terms',
    opis: 'SEO agency vs freelancer: monthly cost, hours of work, cover for absences, Google account ownership and contract terms. A table with sources.',
  },
  '/pozycjonowanie-w-ai/chatgpt': {
    en: '/ai-search-optimization/chatgpt',
    tytul: 'ChatGPT optimization: where it finds companies to recommend',
    opis: 'ChatGPT SEO: how ChatGPT chooses the companies it recommends, which sources it cites and what you can change so it mentions your business.',
  },
  '/pozycjonowanie-w-ai/audyt-widocznosci': {
    en: '/ai-search-optimization/ai-visibility-audit',
    tytul: 'AI visibility audit: what you get for €235 net',
    opis: 'An AI visibility audit: 30 customer questions in ChatGPT, Perplexity, Gemini and Google AI Overviews, who gets recommended instead of you, and a plan.',
  },
  '/pozycjonowanie-wizytowki-google': {
    en: '/google-business-profile-optimization',
    tytul: 'Google Business Profile optimization: price, 49-point grid',
    opis: 'Google Business Profile optimization with ranking measured on a 49-point map grid. What we do, what it costs and how you see the results.',
  },
  '/narzedzia': {
    en: '/tools',
    // S1-poprawki Z-H1, Z-H2 (12.11.2026): title ≤ 60 znaków; meta <= 155 zn. z nowymi narzędziami AI i CWV.
    tytul: 'Free SEO tools and AI tools: SEO audit, AI visibility check',
    opis: 'Free SEO tools: 1-100 SEO audit, AI visibility check, AI crawler test, CWV comparison, SEO loss calculator, redesign mockup, llms.txt & PDF templates.',
  },
  '/narzedzia/generator-llms-txt': {
    en: '/tools/llms-txt-generator',
    tytul: 'Free llms.txt generator and AI bot access test',
    opis: 'Free llms.txt generator: build the file from your sitemap with sections and link descriptions, plus an access test for 9 AI bots and Bingbot.',
  },
  '/narzedzia/raport-seo': {
    en: '/tools/seo-report-template',
    tytul: 'SEO report template: what should an SEO report include?',
    opis: 'What a monthly SEO report should include: results against goals, causes, work done, the plan and risks. With an SEO report template you can download.',
  },
  '/narzedzia/audyt-seo': {
    en: '/tools/free-seo-audit',
    tytul: 'Free SEO audit tool: website analysis, 1-100 score & errors',
    opis: `Free SEO audit tool & website SEO analysis of up to ${AUDYT.stron} pages (${AUDYT.regul} rules): check technical SEO, mobile speed & AI bots. 1-100 score, no sign-up.`,
  },
  '/narzedzia/autorytet-domeny': {
    en: '/tools/domain-authority-checker',
    tytul: 'Free domain authority checker: a 0-100 score',
    opis: 'Free domain authority checker: a 0-100 score from the Common Crawl link graph, your position among 135 million domains and a comparison with competitors.',
  },
  '/narzedzia/kalkulator-strat-seo': {
    en: '/tools/seo-loss-calculator',
    // Z-K1 (12.11.2026): ≤ 60 znaków. 18.11.2026 (key frazy): „SEO ROI calculator” na początku; „seo loss calculator” zostaje w H1 i okruszku.
    tytul: 'SEO ROI calculator: profit lost without AI visibility',
    opis: 'SEO ROI calculator: estimate the monthly profit that goes to competitors without a Google top 3 spot or ChatGPT mentions, and when SEO pays back.',
  },
  '/narzedzia/makieta-redesignu': {
    en: '/tools/website-redesign-mockup',
    tytul: 'Free AI website redesign mockup in 1-3 minutes',
    opis: 'Free website redesign mockup: enter your URL and in 1-3 minutes see a new homepage design for desktop and mobile built from your content. No account.',
  },
  '/sprawdz-widocznosc-w-ai': {
    en: '/ai-visibility-check',
    tytul: 'AI visibility checker: does ChatGPT recommend your business?',
    opis: 'Free AI visibility check: we ask ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews your customers’ questions and show if they name your business.',
  },
  '/zmiana-agencji-seo': {
    en: '/switching-seo-agency',
    tytul: 'Switching SEO agencies without losing rankings',
    opis: 'Switching SEO agencies without losing rankings: how to switch SEO agencies, end the SEO agency contract and keep your data. A 32-point checklist.',
  },
  // 11.11.2026: szablony do pobrania (lib/szablony).
  '/narzedzia/checklista-seo': {
    en: '/tools/seo-checklist',
    tytul: "SEO checklist: 50 checks + free PDF template (2026)",
    opis: "A 50-point SEO checklist for technical basics, on-page SEO, local SEO, AI readiness and measurement, with priorities, an example and a free PDF.",
  },
  '/narzedzia/content-plan': {
    en: '/tools/content-calendar-template',
    tytul: "Content Calendar Template (PDF): 3-Month SEO Plan",
    opis: "Free content calendar template for your blog and website: a 3-month editorial calendar, a topic backlog and Search Console tracking, with steps.",
  },
  '/narzedzia/szablon-analizy-konkurencji-seo': {
    en: '/tools/competitor-analysis-template',
    tytul: "SEO competitor analysis template: free PDF for 5 rivals",
    opis: "Free competitor analysis template for SEO: compare 5 rivals in Google, Maps, AI answers, content, tech, backlinks and pricing. Scoring guide included.",
  },
  '/narzedzia/szablon-strategii-seo': {
    en: '/tools/seo-strategy-template',
    tytul: "SEO Strategy Template: Free 12-Month SEO Plan (PDF)",
    opis: "Free SEO strategy template: a one-page summary and a 12-month SEO plan with goals, keyword clusters, a quarterly roadmap, AI search, KPIs and budget.",
  },
  '/narzedzia/brief-strony-internetowej': {
    en: '/tools/website-brief-template',
    tytul: "Website brief template: free PDF with an SEO section",
    opis: "Free website brief template (PDF) in 12 sections: goals, sitemap, content, features, SEO, redirects, budget and timeline before you request quotes.",
  },
  '/narzedzia/checklista-migracji-strony': {
    en: '/tools/website-migration-checklist',
    tytul: "Website migration checklist: keep your SEO rankings (PDF)",
    opis: "Website migration checklist for before, during and after launch: URL inventory, 301 redirect map, Search Console steps and a free printable PDF template.",
  },
  // 12.11.2026: 8 nowych szablonów (title i description = pole seo.en w lib/szablony/<slug>.js).
  '/narzedzia/dobor-slow-kluczowych': {
    en: '/tools/keyword-research-template',
    tytul: "Keyword Research Template: Free Keyword Mapping PDF",
    opis: "Free keyword research template: gather seed keywords, check search intent, cluster by shared Google results, build a keyword map and fix cannibalization.",
  },
  '/narzedzia/brief-dla-copywritera': {
    en: '/tools/content-brief-template',
    tytul: "Content brief template: free SEO content brief (PDF)",
    opis: "Free content brief template for SEO writers: goal, keyword and intent, top-5 analysis, outline, links, tone and a review checklist, with a real example.",
  },
  '/narzedzia/szablon-audytu-tresci': {
    en: '/tools/content-audit-template',
    tytul: "Content Audit Template (PDF): Keep, Update, Merge or Prune",
    opis: "Free content audit template: list every URL, add Search Console and GA4 data, score quality and decide to keep, update, merge, noindex or remove each page.",
  },
  '/narzedzia/linkowanie-wewnetrzne': {
    en: '/tools/internal-linking-template',
    tytul: "Internal Linking Strategy Template: Free PDF Plan and Audit",
    opis: "Free internal linking strategy template: map hubs and spokes, plan links with anchor text and run a quarterly internal linking audit for orphan pages.",
  },
  '/narzedzia/checklista-e-e-a-t': {
    en: '/tools/e-e-a-t-checklist',
    tytul: "E-E-A-T checklist: 36 checks + free PDF template (2026)",
    opis: "A 36-point E-E-A-T checklist for trust, authors, content accuracy, reputation, YMYL and structured data, with how to check each item and a free PDF.",
  },
  '/narzedzia/dane-strukturalne-json-ld': {
    en: '/tools/schema-markup-examples',
    tytul: "Schema Markup Examples: 7 JSON-LD Templates to Copy (PDF)",
    opis: "Schema markup examples in JSON-LD: Organization, LocalBusiness, WebSite, Breadcrumb, Article, Person and Product, plus Google’s 2026 rules and a free PDF.",
  },
  '/narzedzia/checklista-wizytowki-google': {
    en: '/tools/local-seo-checklist',
    tytul: "Local SEO checklist: Google Business Profile setup (PDF)",
    opis: "A 40-point local SEO checklist: set up and verify your Google Business Profile, fix NAP consistency, run reviews and track results. Free PDF.",
  },
  '/narzedzia/zapytanie-ofertowe-seo': {
    en: '/tools/seo-rfp-template',
    tytul: "SEO RFP Template: How to Write an RFP for SEO Services (PDF)",
    opis: "Free SEO RFP template (PDF): what to include in an SEO request for proposal, how to write it step by step, an example and a scoring sheet for proposals.",
  },
  '/porownania/ahrefs-dr-vs-moz-da-vs-common-crawl': {
    en: '/comparisons/ahrefs-dr-vs-moz-da-vs-common-crawl',
    tytul: 'Ahrefs DR vs Moz DA vs Common Crawl: Metric Comparison',
    opis: 'Ahrefs Domain Rating, Moz Domain Authority and our 0-100 Common Crawl graph score compared on data source, formula, 441-domain correlation and cost.',
  },
  '/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml': {
    en: '/comparisons/llms-txt-vs-robots-txt-vs-sitemap-xml',
    tytul: 'llms.txt vs robots.txt vs sitemap.xml: Roles Compared',
    opis: 'llms.txt vs robots.txt vs sitemap.xml: which file blocks AI crawlers, which feeds Google indexing, and what our 17-bot HTTP test showed.',
  },
  '/porownania/seo-w-firmie-czy-agencja-seo': {
    en: '/comparisons/in-house-seo-vs-agency',
    tytul: 'In-House SEO vs SEO Agency: Full Cost & Team Comparison',
    opis: 'In-house SEO specialist vs SEO agency: total employer cost and tool stack versus a €450-€590 net monthly retainer, skill coverage and account ownership.',
  },
  '/porownania/nextjs-vs-wordpress-seo': {
    en: '/comparisons/nextjs-vs-wordpress-seo',
    tytul: 'Next.js vs WordPress for SEO & AI: 2026 Comparison',
    opis: 'Next.js vs WordPress for SEO in 2026: 9 criteria compared, from Core Web Vitals and plugin security to JSON-LD, AI crawlers and 24-month TCO.',
  },
  '/porownania/webflow-vs-wordpress-seo': {
    en: '/comparisons/webflow-vs-wordpress-seo',
    tytul: 'Webflow vs WordPress for SEO: Limits, Speed & 24m Cost',
    opis: 'Webflow vs WordPress for SEO: URL structure, CMS collection limits, Localization hreflang add-on costs, CDN speed and 24-month TCO compared.',
  },
  '/porownania/strona-kodowana-czy-kreator-seo': {
    en: '/comparisons/custom-coded-website-vs-website-builder-seo',
    tytul: 'Custom-Coded Website vs Website Builder for SEO (2026)',
    opis: 'Custom-coded Next.js site vs SaaS website builders (Wix, Squarespace) for SEO: code ownership, mobile INP/LCP, AI crawler HTML and 24m cost.',
  },
  '/raport-bledow-seo-w-polsce': {
    en: '/seo-errors-benchmark-report',
    tytul: 'Technical SEO Errors & AI Bot Blocking Benchmark (2026)',
    opis: 'Live benchmark of technical SEO errors and AI crawler blocks (OAI-SearchBot, PerplexityBot, GPTBot) across audited domains, with CSV export.',
  },
  '/raporty-ai': {
    en: '/ai-reports',
    tytul: 'AI Search & Technical SEO Research Reports (Open Data)',
    opis: 'Open CC BY 4.0 datasets by AI SEO COMPANY: AI citation sources index, 49-rule technical SEO benchmark and 90-day Google Search Console series.',
  },
  '/raporty-ai/indeks-polecen-ai': {
    en: '/ai-reports/ai-recommendations-index',
    tytul: 'AI Recommendations Index: Sources Cited by ChatGPT & AIO',
    opis: 'Which sources do ChatGPT Search, Perplexity and Google AI Overviews cite? Empirical study of 141 AIO citations & 62 local links with CSV export.',
  },
  '/narzedzia/tester-robotow-ai-robots-txt': {
    en: '/tools/ai-crawler-robots-txt-checker',
    tytul: 'AI Crawler & robots.txt Checker: Test 15 AI Bots & SSR',
    opis: 'Free AI crawler and robots.txt checker: test 15 AI bots (OAI-SearchBot, PerplexityBot, GPTBot), spot 403 WAF blocks, check SSR HTML and robots.txt.',
  },
  '/narzedzia/test-core-web-vitals-porownanie': {
    en: '/tools/core-web-vitals-competitor-comparison',
    tytul: 'Core Web Vitals Checker & Competitor Speed Comparison',
    opis: 'Compare 28-day Chrome UX Report (CrUX) Core Web Vitals (LCP, INP, CLS) with a competitor and Next.js, detect CMS bloat and estimate mobile loss.',
  },
  // --- Sprint 2: 5 nowych narzędzi SEO/GEO + airSlate CMS/VS + F2/F5/F8 (22.11.2026) ---
  '/narzedzia/sprawdz-cytowalnosc-strony-ai': {
    en: '/tools/geo-citability-checker',
    tytul: 'GEO Citability Checker: Audit Pages for AI Overviews',
    opis: 'Free deterministic GEO citability checker: score 6 RAG factors, preview your AI Overview & ChatGPT snippet, audit H2/H3 chunks and compare rivals.',
  },
  '/narzedzia/sprawdz-przekierowania-hreflang': {
    en: '/tools/redirect-canonical-hreflang-checker',
    tytul: '301 Redirect, Canonical & hreflang Reciprocity Checker',
    opis: 'Free technical SEO checker: trace 4 HTTP/www redirect variants, verify canonical alignment, audit A-B hreflang return links and copy server rules.',
  },
  '/narzedzia/generator-indexnow-test-bing-chatgpt': {
    en: '/tools/indexnow-generator-bing-chatgpt-test',
    tytul: 'IndexNow Key Generator, lastmod & Bing / ChatGPT Test',
    opis: 'Free IndexNow key generator (.txt download, curl & GitHub Action) with live Bingbot + OAI-SearchBot checks and sitemap lastmod entropy diagnostics.',
  },
  '/narzedzia/walidator-grafu-encji-json-ld': {
    en: '/tools/entity-graph-json-ld-validator',
    tytul: 'Entity Graph JSON-LD Validator & @graph Schema Builder',
    opis: 'Free Entity SEO validator: visualize your schema.org @graph in SVG, audit @id links, VAT/Tax IDs and sameAs profiles, and copy unified JSON-LD code.',
  },
  '/narzedzia/audyt-lokalnego-seo-wizytowki': {
    en: '/tools/local-seo-nap-qr-generator',
    tytul: 'Local SEO NAP Checker & Google Review QR Code Generator',
    opis: 'Free Local SEO toolkit: compare HTML vs LocalBusiness JSON-LD NAP data, calculate 5-star reviews to beat Maps rivals, and download vector SVG/PNG QR.',
  },
  '/porownania/shopify-vs-woocommerce-seo': {
    en: '/comparisons/shopify-vs-woocommerce-seo',
    tytul: 'Shopify vs WooCommerce for SEO: URLs, Speed & 24m Cost',
    opis: 'Shopify vs WooCommerce for SEO in 2026: URL paths, Core Web Vitals, Product JSON-LD, hreflang, AI crawlers and 24-month app and plugin costs.',
  },
  '/porownania/ahrefs-vs-semrush-narzedzia-seo': {
    en: '/comparisons/ahrefs-vs-semrush-seo-tools',
    tytul: 'Ahrefs vs Semrush vs Free SEO Tools: 2026 Pricing',
    opis: 'Ahrefs vs Semrush in 2026: published plan prices, credit limits, backlink and keyword data, plus when a B2B team only needs free SEO tools.',
  },
  '/pozycjonowanie-wordpress': {
    en: '/wordpress-seo-services',
    tytul: 'WordPress SEO Services: Speed, Technical Audit & AI',
    opis: 'Technical WordPress SEO for B2B sites: plugin bloat cleanup for LCP/INP, taxonomy indexing, conflict-free JSON-LD, AI bot access & plans from €450.',
  },
  '/pozycjonowanie-webflow': {
    en: '/webflow-seo-services',
    tytul: 'Webflow SEO Services: CMS Architecture, Hreflang & AI',
    opis: 'Webflow SEO services for B2B & SaaS: CMS collection structure, Localization hreflang audits, custom JSON-LD, AI bot readiness & retainers from €450.',
  },
  '/pozycjonowanie-w-ai/cennik': {
    en: '/ai-search-optimization/pricing',
    tytul: 'AI Search Optimization (GEO) Pricing: Costs & Plans',
    opis: 'How much does AI search optimization (GEO) cost in 2026? 3 pricing models, real API & content costs, and our rates: €235 audit, plans from €450.',
  },
  '/narzedzia/umowa-na-pozycjonowanie': {
    en: '/tools/seo-contract-checklist',
    tytul: 'SEO Contract Template & 12-Clause Checklist (Free PDF)',
    opis: 'Educational SEO contract template & 12-clause buyer checklist (PDF): 1-month notice, Google account ownership, content IP, permanent links & GDPR.',
  },
  '/pozycjonowanie-stron-mazowsze': {
    en: '/local-seo-mazovia',
    tytul: 'Local & B2B SEO Mazovia: Regional Poland Visibility',
    opis: 'Regional B2B and Google Maps SEO across Mazovia (Radom, Płock, Siedlce, Pruszków, Piaseczno & A2/S7/S8 corridors) from our Warsaw team. From €450/mo.',
  },
  // --- Pakiet P3 (Fala 2 + Fala 3 airSlate, 24.11.2026): 4 BOFU comparisons + 4 industry pages ---
  '/porownania/sistrix-vs-ahrefs-vs-seobility': {
    en: '/comparisons/sistrix-vs-ahrefs-vs-seobility',
    tytul: 'Sistrix vs Ahrefs vs Seobility: DACH & EU SEO Tools',
    opis: 'Sistrix vs Ahrefs vs Seobility in 2026: DACH Visibility Index, global backlink crawl, technical site audits, AI Overviews tracking and 24m TCO.',
  },
  '/porownania/senuto-vs-semstorm-vs-ahrefs': {
    en: '/comparisons/senuto-vs-semstorm-vs-ahrefs',
    tytul: 'Senuto vs Semstorm vs Ahrefs: Polish & EU Keyword Tools',
    opis: 'Senuto vs Semstorm vs Ahrefs for Polish & CEE search: Polish morphology, seasonality, AI Overviews, backlink verification and 24-month pricing.',
  },
  '/porownania/nextjs-vs-astro-vs-webflow-seo': {
    en: '/comparisons/nextjs-vs-astro-vs-webflow-seo',
    tytul: 'Next.js vs Astro vs Webflow for SEO & Core Web Vitals',
    opis: 'Next.js App Router vs Astro Islands vs Webflow for SEO: mobile INP, interactive tools, hreflang costs, AI crawler HTML, code ownership & 24m TCO.',
  },
  '/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews': {
    en: '/comparisons/chatgpt-search-vs-perplexity-vs-ai-overviews',
    tytul: 'ChatGPT Search vs Perplexity vs Google AI Overviews',
    opis: 'How ChatGPT Search, Perplexity and Google AI Overviews pick sources in 2026: Bing vs Google grounding, AI bots, citation overlap and GA4 tracking.',
  },
  '/seo-dla-firm-budowlanych': {
    en: '/seo-for-construction-companies',
    tytul: 'SEO for Construction Companies & Contractors (GSC Data)',
    opis: 'SEO & AI visibility for construction, HVAC and engineering firms. Verified STEF-BUD GSC case: 9,071 impressions and 5 to 44 clicks/week in 11 wks.',
  },
  '/seo-dla-firm-produkcyjnych-b2b': {
    en: '/manufacturing-industrial-seo',
    tytul: 'Manufacturing & Industrial B2B SEO (PL & DACH Export)',
    opis: 'Technical B2B SEO & GEO for manufacturers, CNC plants and exporters. Verified STANIAX GSC data: 8,814 impressions & 230 niche B2B clicks in 90d.',
  },
  '/seo-dla-restauracji-i-gastronomii': {
    en: '/restaurant-hospitality-seo',
    tytul: 'Restaurant & Hospitality SEO: Google Maps & AI Search',
    opis: 'Local SEO, Google Maps & AI visibility for restaurants without aggregator fees. Verified MADAME THAI GSC case: 58,618 impressions & 1,470 clicks.',
  },
  '/seo-dla-firm-szkoleniowych-i-iso': {
    en: '/seo-for-training-and-iso-companies',
    tytul: 'SEO for Training Providers & ISO Consultancies (B2B)',
    opis: 'B2B SEO & AI search optimization for training academies and ISO consultants. Verified TQL GSC case: 2 to 29 clicks/week (14.5x) in 13 weeks.',
  },
};

const bezKotwicy = (s) => {
  if (typeof s !== 'string') return '';
  const t = s.split('#')[0].split('?')[0];
  return t.length > 1 ? t.replace(/\/+$/, '') : t;
};

/** Wpis wersji EN dla ścieżki PL albo null. */
export function wpisEn(sciezkaPl) {
  return STRONY_EN[bezKotwicy(sciezkaPl)] ?? null;
}

/** Czy strona PL ma wersję angielską. */
export function maWersjeEn(sciezkaPl) {
  return Boolean(wpisEn(sciezkaPl));
}

/** Ścieżka EN (bez /en) dla ścieżki PL albo null. */
export function sciezkaEn(sciezkaPl) {
  return wpisEn(sciezkaPl)?.en ?? null;
}
