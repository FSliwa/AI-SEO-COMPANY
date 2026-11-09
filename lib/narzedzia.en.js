// Wersja angielska danych huba /en/tools i czterech aplikacji (9.11.2026). Dane PL zostają w
// lib/narzedzia.js bez zmian; tu są tylko odpowiedniki EN i selektory po locale:
//   kartyHubaL(locale), faqHubaL(locale), stronaNarzedziaL(slug, locale), zrodlaKalkulatoraL(locale).
// Dla 'pl' selektory zwracają dokładnie te same obiekty co lib/narzedzia.js / lib/kalkulatorStrat.js.

import { CHECKLIST_COUNT } from './agencySwitch';
import { ZRODLA_KALKULATORA } from './kalkulatorStrat';
import { hrefWJezyku } from './linkiEn';
import { FAQ_HUBA, kartyHuba, stronaNarzedzia } from './narzedzia';

// Slug EN adresu (do JSON-LD, np. WebAppSchema): hrefWJezyku('/narzedzia/audyt-seo', 'en') = '/en/tools/free-seo-audit'.

export const H1_HUBA = { pl: 'Darmowe narzędzia i szablony SEO i AI', en: 'Free SEO and AI tools and templates' };

// Strony: okruszek, h1 i nazwy źródeł po angielsku (te same URL-e i daty co w PL).
const STRONY_EN = {
  'generator-llms-txt': {
    okruszek: 'llms.txt generator',
    h1: 'llms.txt generator and an AI bot access test for your website',
    zrodla: [
      'llmstxt.org: The /llms.txt file, v2 (format specification)',
      'Ahrefs: What is llms.txt (analysis of 137,000 domains, a statement from John Mueller)',
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)',
      'Google: Google-Extended in the crawler documentation',
      'Anthropic: ClaudeBot, Claude-SearchBot and Claude-User',
      'Perplexity: PerplexityBot and Perplexity-User',
      'WordPress.org plugin directory: Yoast SEO (version 28.8)',
      'WordPress.org plugin directory: Rank Math SEO (version 1.0.281)',
      'WordPress.org plugin directory: All in One SEO (version 5.0.5)',
    ],
  },
  'raport-seo': {
    okruszek: 'SEO report',
    h1: 'SEO report: what it should include, plus a template to download',
    zrodla: [],
  },
  'audyt-seo': {
    okruszek: 'Free SEO audit',
    h1: 'Free website SEO audit: a 1-100 score and a list of errors to fix',
    zrodla: [
      'Google: PageSpeed Insights API v5 (Lighthouse and Chrome UX Report data)',
      'Google Search Central: introduction to robots.txt',
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)',
    ],
  },
  'autorytet-domeny': {
    okruszek: 'Domain authority',
    h1: 'Check domain authority for free: Domain Rating (DR) and a comparison with competitors',
    zrodla: [
      'Ahrefs API: Domain rating free (free endpoint, the attribution “Domain Rating by Ahrefs” is required)',
      'Ahrefs: Domain Rating License',
    ],
  },
  'kalkulator-strat-seo': {
    okruszek: 'SEO loss calculator',
    h1: 'Calculator: how much profit you lose without SEO and AI visibility',
    zrodla: [
      'First Page Sage: Google CTR by ranking position (2025): #1 39.8%, #2 18.7%, #3 10.2%',
      'GrowthSRC Media study (over 200,000 keywords): CTR for #1 fell from 28% to 19%, for #2 from 20.8% to 12.6% (2024 to 2025)',
      'Pew Research Center: with an AI summary users clicked a result in 8% of visits, without one in 15%; a summary appeared for 18% of searches (March 2025)',
      'Gartner (February 2024): forecast that search engine volume will drop 25% by 2026 because of AI chatbots',
    ],
  },
  'makieta-redesignu': {
    okruszek: 'Website mockup',
    h1: 'AI website mockup: see a redesign of your site for free',
    zrodla: [],
  },
};

/** Strona narzędzia (okruszek, h1, sources) w danym języku; dla 'pl' dokładnie stronaNarzedzia(slug). */
export function stronaNarzedziaL(slug, locale) {
  const pl = stronaNarzedzia(slug);
  if (locale !== 'en' || !pl) return pl;
  const en = STRONY_EN[slug];
  if (!en) return pl;
  return {
    ...pl,
    okruszek: en.okruszek,
    h1: en.h1,
    sources: pl.sources.map((z, i) => ({ ...z, nazwa: en.zrodla[i] ?? z.nazwa })),
  };
}

export function zrodlaKalkulatoraL(locale) {
  return stronaNarzedziaL('kalkulator-strat-seo', locale)?.sources ?? ZRODLA_KALKULATORA;
}

// --- Hub: karty --------------------------------------------------------------------------------

const KARTY_EN = {
  'generator-llms-txt': {
    nazwa: 'llms.txt generator',
    opis: 'Creates an llms.txt file from your site map and checks whether GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot can access your site. Results in a few seconds, no sign-up. Up to 10 checks per day from one IP address.',
    cta: 'Generate llms.txt',
  },
  'sprawdzarka-ai': {
    nazwa: 'Check whether ChatGPT recommends your business',
    opis: 'We ask ChatGPT with search, Gemini, Perplexity, Claude and Google AI Overviews three questions your customers ask, and show whether your business is named and which sites the models draw on. Up to 2 businesses per day from one IP address.',
    cta: 'Check for free',
  },
  'audyt-seo': {
    nazwa: 'Free SEO audit',
    opis: 'Checks up to 25 pages, robots.txt, the sitemap, mobile speed and AI bot access. A 1-100 score and a list of errors with fix instructions. Up to 5 audits per day from one IP address.',
    cta: 'Check your website',
  },
  'autorytet-domeny': {
    nazwa: 'Domain authority (DR)',
    opis: 'Domain Rating from the Ahrefs database in seconds, no sign-up, plus a comparison with up to three competitors.',
    cta: 'Check DR',
  },
  'kalkulator-strat-seo': {
    nazwa: 'SEO and AI loss calculator',
    opis: 'Uses your data and CTR studies to estimate how much monthly profit goes to competitors when you are not in Google’s top 3 or in AI answers.',
    cta: 'Calculate the loss',
  },
  'makieta-redesignu': {
    nazwa: 'Website redesign mockup',
    opis: 'Enter your website address and AI designs a new homepage for desktop and mobile from its content. Up to 2 mockups per day from one IP address.',
    cta: 'See the mockup',
  },
  'wzor-raportu-seo': {
    nazwa: 'SEO report template (PDF)',
    opis: 'Five sections of a monthly report with examples: results against the goal, causes, work done, the plan and risks. We send it by email.',
    cta: 'See what the report includes',
  },
  'checklista-zmiany-agencji': {
    nazwa: 'SEO agency switching checklist (PDF)',
    opis: `${CHECKLIST_COUNT} items: Google accounts, domain, content, links and data you need to take over from your previous agency. We send it by email.`,
    cta: 'Download the checklist',
  },
};

/** Karty huba (te same id, href i filtr publikacji co w PL), teksty w danym języku. */
export function kartyHubaL(locale) {
  const karty = kartyHuba();
  if (locale !== 'en') return karty;
  return karty.map((k) => ({ ...k, ...(KARTY_EN[k.id] || {}) }));
}

// --- Hub: FAQ ----------------------------------------------------------------------------------

/** FAQ huba; linki w odpowiedziach przez hrefWJezyku (EN: /en/cookies, /en/seo-audit). */
export function faqHubaL(locale) {
  if (locale !== 'en') return FAQ_HUBA;
  const cookies = hrefWJezyku('/cookies', 'en');
  const audyt = hrefWJezyku('/audyt-seo', 'en');
  return [
    {
      id: 'are-the-tools-really-free',
      question: 'Are the tools really free?',
      answer: 'Yes. The llms.txt generator and the checker are free and need no account. Daily limits per IP address (10 checks in the generator, 2 businesses in the checker) protect against abuse and the cost of model queries. We email the PDF templates and do not add your address to a mailing list.',
    },
    {
      id: 'what-data-do-i-provide',
      question: 'What data do I provide and what happens to it?',
      answer: `The generator only needs your website address and does not save the result. The checker asks for your business name, industry, city and email so it can prepare and send the result, and it deletes the data after 60 days. For the templates you only give your email. Details are in the <a href="${cookies}" style="text-decoration:underline">privacy policy</a>.`,
    },
    {
      id: 'do-the-tools-replace-an-seo-audit',
      question: 'Do the tools replace an SEO audit?',
      answer: `No. The tools check individual elements: the llms.txt file, AI bot access and whether the models name your business in a few questions. An <a href="${audyt}" style="text-decoration:underline">SEO audit</a> covers the whole website: indexing, content, links, speed and competitors, and its result is a prioritized list of changes.`,
    },
  ];
}
