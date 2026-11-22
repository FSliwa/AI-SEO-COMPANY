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
    // S1-poprawki Z-H1, Z-H2 (12.11.2026): title ≤ 60 znaków; meta bez „domain authority”, dopóki
    // /en/tools/domain-authority-checker daje 404 (dopisać w dniu publikacji autorytetu, Z-D1).
    tytul: 'Free SEO tools and AI tools: SEO audit, AI visibility check',
    opis: 'Free SEO tools from AI SEO COMPANY: SEO audit with a 1-100 score, AI visibility check, SEO loss calculator, redesign mockup, llms.txt generator and templates.',
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
    opis: 'Free website redesign mockup: enter your site address and in 1-3 minutes see a new homepage design for desktop and mobile, made from your content. No account.',
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
    opis: "Free website brief template (PDF) in 12 sections: goals, sitemap, content, features, SEO and redirects, budget, timeline. Fill it in before requesting quotes.",
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
  '/narzedzia/tester-robotow-ai-robots-txt': {
    en: '/tools/ai-crawler-robots-txt-checker',
    tytul: 'AI Crawler & robots.txt Checker: Test 12 AI Bots & SSR',
    opis: 'Free AI crawler and robots.txt checker: test 12 AI bots (OAI-SearchBot, PerplexityBot, GPTBot), spot 403 WAF blocks, check SSR HTML and robots.txt.',
  },
  '/narzedzia/test-core-web-vitals-porownanie': {
    en: '/tools/core-web-vitals-competitor-comparison',
    tytul: 'Core Web Vitals Checker & Competitor Speed Comparison',
    opis: 'Compare 28-day Chrome UX Report (CrUX) Core Web Vitals (LCP, INP, CLS) with a competitor and Next.js, detect CMS bloat and estimate mobile loss.',
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
