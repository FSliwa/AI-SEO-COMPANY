// Wersje angielskie nowych stron (9.11.2026, prośba Filipa: „wszystkie nowe podstrony i aplikacje
// także w wersji angielskiej”). Czysty ESM bez importów: routing (i18n/routing.js), bramka stron
// (lib/stronaPl.js), lista tylko-PL (lib/plOnly.js) i sitemapa biorą adresy stąd.
//
// Klucz = ścieżka PL (klucz routingu next-intl), wartość = ścieżka EN bez prefiksu /en.
// Strona EN jest publiczna, gdy publiczna jest strona PL (lib/publikacja.js) i strona ma tu wpis.
// tytul/opis = title i meta description wersji EN (odpowiednik PUBLIKACJA[...].tytul/opis).

export const STRONY_EN = {
  '/porownania': {
    en: '/comparisons',
    tytul: 'SEO comparisons before you choose an agency or a pricing model',
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
    tytul: 'SEO or Google Ads? Costs, time to results and when to combine them',
    opis: 'SEO or Google Ads: cost per lead, time to first results and what happens when you stop paying. When to choose one, and when to run both.',
  },
  '/porownania/jak-wybrac-agencje-seo': {
    en: '/comparisons/how-to-choose-an-seo-agency',
    tytul: 'How to choose an SEO agency: 12 questions to ask before you sign',
    opis: 'How to choose an SEO agency: twelve questions that separate a solid agency from a risky one, from reporting and contract terms to account ownership.',
  },
  '/pozycjonowanie-w-ai/chatgpt': {
    en: '/ai-search-optimization/chatgpt',
    tytul: 'ChatGPT optimization: where ChatGPT finds the companies it recommends',
    opis: 'ChatGPT SEO: how ChatGPT chooses the companies it recommends, which sources it cites and what you can change so it mentions your business.',
  },
  '/pozycjonowanie-w-ai/audyt-widocznosci': {
    en: '/ai-search-optimization/ai-visibility-audit',
    tytul: 'AI visibility audit: what you get for €235 net',
    opis: 'An AI visibility audit: 30 customer questions in ChatGPT, Perplexity, Gemini and Google AI Overviews, who gets recommended instead of you, and a plan.',
  },
  '/pozycjonowanie-wizytowki-google': {
    en: '/google-business-profile-optimization',
    tytul: 'Google Business Profile optimization: pricing and a 49-point map grid',
    opis: 'Google Business Profile optimization with ranking measured on a 49-point map grid. What we do, what it costs and how you see the results.',
  },
  '/narzedzia': {
    en: '/tools',
    tytul: 'Free SEO tools and AI tools: SEO audit, AI visibility, llms.txt',
    opis: 'Free SEO tools from AI SEO COMPANY: SEO audit with a 1-100 score, AI visibility check, domain authority, SEO loss calculator, redesign mockup and llms.txt.',
  },
  '/narzedzia/generator-llms-txt': {
    en: '/tools/llms-txt-generator',
    tytul: 'Free llms.txt generator and AI bot access test',
    opis: 'llms.txt generator: build llms.txt from your sitemap and check whether GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot can access your site. Free.',
  },
  '/narzedzia/raport-seo': {
    en: '/tools/seo-report-template',
    tytul: 'SEO report template: what should an SEO report include?',
    opis: 'What a monthly SEO report should include: results against goals, causes, work done, the plan and risks. With an SEO report template you can download.',
  },
  '/narzedzia/audyt-seo': {
    en: '/tools/free-seo-audit',
    tytul: 'Free SEO audit: a 1-100 score and a list of errors',
    opis: 'Free SEO audit of up to 25 pages: technical SEO, content, mobile speed in PageSpeed and AI bot access. An SEO score from 1 to 100 and fixes for each issue.',
  },
  '/narzedzia/autorytet-domeny': {
    en: '/tools/domain-authority-checker',
    tytul: 'Free domain authority checker (Domain Rating)',
    opis: 'Free domain authority checker: your Domain Rating from the Ahrefs database in seconds, no sign-up, on a 0-100 scale and compared with competitors.',
  },
  '/narzedzia/kalkulator-strat-seo': {
    en: '/tools/seo-loss-calculator',
    tytul: 'SEO loss calculator: how much profit you lose without SEO and AI visibility',
    opis: 'SEO loss calculator: estimate the monthly profit that goes to competitors when you are not in Google’s top 3 or in ChatGPT answers. Open assumptions.',
  },
  '/narzedzia/makieta-redesignu': {
    en: '/tools/website-redesign-mockup',
    tytul: 'Free AI website redesign mockup',
    opis: 'Free website redesign mockup: enter your website address and in 1-3 minutes see a new homepage design for desktop and mobile, built from your own content.',
  },
  '/sprawdz-widocznosc-w-ai': {
    en: '/ai-visibility-check',
    tytul: 'AI visibility checker: does ChatGPT recommend your business?',
    opis: 'Free AI visibility check: we ask ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews your customers’ questions and show whether they name your business.',
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
    opis: "Website migration checklist for before, during and after launch: URL inventory, 301 redirect map, Search Console steps and a free fillable PDF template.",
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
