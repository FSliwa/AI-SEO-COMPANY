import { SZABLONY } from './szablony';
// Wersja angielska danych huba /en/tools i czterech aplikacji (9.11.2026). Dane PL zostają w
// lib/narzedzia.js bez zmian; tu są tylko odpowiedniki EN i selektory po locale:
//   kartyHubaL(locale), faqHubaL(locale), stronaNarzedziaL(slug, locale), zrodlaKalkulatoraL(locale).
// Dla 'pl' selektory zwracają dokładnie te same obiekty co lib/narzedzia.js / lib/kalkulatorStrat.js.

import { CHECKLIST_COUNT } from './agencySwitch';
import { ZRODLA_KALKULATORA, ZRODLA_KALKULATORA_EN } from './kalkulatorStrat';
import { hrefWJezyku } from './linkiEn';
import { AUTORYTET_OPUBLIKOWANY, FAQ_HUBA, kartyHuba, stronaNarzedzia } from './narzedzia';
import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, WIDOCZNOSC, listaSilnikow } from './narzedziaLiczby';

// Slug EN adresu (do JSON-LD, np. WebAppSchema): hrefWJezyku('/narzedzia/audyt-seo', 'en') = '/en/tools/free-seo-audit'.

export const H1_HUBA = { pl: 'Darmowe narzędzia i szablony SEO i AI', en: 'Free SEO tools, AI tools and templates' };

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
  // 11.11.2026: nazwy w kolejności sources raport-seo z lib/narzedzia.js (jak w lib/narzedziaGeneratorRaport.en.js).
  'raport-seo': {
    okruszek: 'SEO report',
    h1: 'SEO report template: what a monthly SEO report should include (free PDF)',
    zrodla: [
      'Google Analytics Help: key events',
      'Google Analytics Help: behavioral modeling for consent mode (events from users who decline consent, traffic thresholds)',
      'Google Search Central: the branded queries filter in Search Console (November 20, 2025, updated March 11, 2026)',
      'Google Analytics Help: Queries report (Search Console keeps data for the last 16 months)',
      'Google Search Central: AI features and your website (data in the Performance report)',
      'Google Business Profile Help: profile performance (calls, directions, website clicks)',
      'Google Search Status Dashboard: confirmed ranking updates',
      'web.dev: Web Vitals (LCP, INP and CLS thresholds, 75th percentile)',
      'Search Console Help: Page indexing report',
      'Google: PageSpeed Insights (Lighthouse lab data and CrUX real-user data)',
    ],
  },
  'audyt-seo': {
    okruszek: 'Free SEO audit',
    h1: 'Free SEO audit: a website SEO audit with a 1-100 score and a list of errors to fix',
    zrodla: [
      'Google: PageSpeed Insights API v5 (Lighthouse and Chrome UX Report data)',
      'Google Search Central: introduction to robots.txt',
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)',
    ],
  },
  'autorytet-domeny': {
    okruszek: 'Domain authority',
    h1: 'Domain authority checker: a free 0‑100 score from the link graph, compared with competitors', // twardy łącznik U+2011
    zrodla: [
      'Common Crawl: host- and domain-level web graphs from the August-October 2026 crawls (release cc-main-2026-aug-sep-oct, 135.0 million domains, 1.8 billion edges)',
      'Common Crawl: Web Graphs (graph releases and domain rankings: harmonic centrality and PageRank)',
      'Common Crawl: Terms of Use (version of 7 March 2024)',
      'Paolo Boldi, Sebastiano Vigna: Axioms for Centrality (arXiv:1308.2140, Internet Mathematics 2014)',
      'Ahrefs Help: What is Domain Rating (DR)',
      'Moz: What is Domain Authority',
      'Moz: Top 500 domains (compared with our score on 441 matched domains)',
    ],
  },
  'kalkulator-strat-seo': {
    okruszek: 'SEO loss calculator',
    h1: 'SEO loss calculator: how much profit you lose without SEO and AI visibility',
    zrodla: ZRODLA_KALKULATORA_EN.map((z) => z.nazwa), // wszystkie źródła strony po angielsku (kalkulatorStrat.js)
  },
  'makieta-redesignu': {
    okruszek: 'Website mockup',
    h1: 'AI website redesign mockup: see a new design of your site for free',
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

// 11.11.2026: karty szablonów (lib/szablony) w EN z pola en.karta pliku danych.
const KARTA_SZABLONU_EN = (id) => {
  const d = id && id.startsWith('szablon-') ? SZABLONY.find((x) => `szablon-${x.slug}` === id) : null;
  return d ? { nazwa: d.en.karta.nazwa, opis: d.en.karta.opis, cta: d.en.karta.cta } : null;
};

// S1-poprawki Z-H5 (12.11.2026): opisy i odRazu / poEmailu = te same fakty co w kartyHuba() (PL).
const KARTY_EN = {
  'generator-llms-txt': {
    nazwa: 'llms.txt generator',
    opis: `Creates the whole llms.txt file from your sitemap, with sections and a description for every link, and checks access for ${GENERATOR.botow} AI bots, including GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot. No sign-up, no email. Up to ${GENERATOR.limitIp} checks per day from one IP address.`,
    odRazu: `the whole llms.txt file to download, a check of your existing file and a test of ${GENERATOR.botow} AI bots`,
    poEmailu: null,
    cta: 'Generate llms.txt',
  },
  'sprawdzarka-ai': {
    nazwa: 'AI visibility check: does ChatGPT recommend your business?',
    opis: `We check whether ${listaSilnikow('en')} name your business when asked ${WIDOCZNOSC.pytan} customer questions, and show which sites the models draw on. Up to ${WIDOCZNOSC.limitIp} businesses per day from one IP address.`,
    odRazu: `a 0-100 score, a “named / not named” grid for every engine and question, ${WIDOCZNOSC.przedBramka.firm} businesses the models name and the ${WIDOCZNOSC.przedBramka.domen} most cited domains`,
    poEmailu: 'the full model answers, every business named, the sources for each answer and a report in your inbox',
    cta: 'Check for free',
  },
  'audyt-seo': {
    nazwa: 'Free SEO audit',
    opis: `Checks up to ${AUDYT.stron} pages against ${AUDYT.regul} rules: technical SEO, content, mobile speed and AI readiness. A 1-100 score and a list of errors with fix instructions. Up to ${AUDYT.limitIp} audits per day from one IP address.`,
    odRazu: `a 1-100 score, a score for each of the ${AUDYT.kategorii} categories, 4 mobile PageSpeed Insights scores and the 3 most important issues with fix instructions`,
    poEmailu: 'every issue with the affected page URLs and a report you can hand to a developer',
    cta: 'Check your website',
  },
  'autorytet-domeny': {
    nazwa: 'Domain authority checker',
    opis: `A 0-100 domain authority score from the public Common Crawl link graph, your position in the graph and a comparison with up to three competitors. No sign-up, up to ${AUTORYTET.limitIp} checks per day from one IP address.`,
    odRazu: `your domain’s 0-100 score, its position in the link graph and a comparison with up to ${AUTORYTET.konkurentow} competitors`,
    poEmailu: 'a report with an action plan in your inbox',
    cta: 'Check authority',
  },
  'kalkulator-strat-seo': {
    nazwa: 'SEO and AI loss calculator',
    opis: 'Uses your data, Google CTR studies and studies of clicks from AI answers to estimate how much monthly profit goes to competitors when you are not in Google’s top 3 or in AI answers. Instant result in your browser.',
    odRazu: 'the whole result, live: the loss in Google and in AI answers, customers per month, plus the SEO cost (a package from our price list or your own amount) and the payback month',
    poEmailu: 'a summary with the assumptions and sources in your inbox (you see the result without it)',
    cta: 'Calculate the loss',
  },
  'makieta-redesignu': {
    nazwa: 'Website redesign mockup',
    opis: `Free website redesign mockup: enter your website address and in ${MAKIETA.minut} minutes AI designs a new homepage for desktop and mobile from its content. First screen right away, no account. Up to ${MAKIETA.limitIp} mockups per day from one IP address.`,
    odRazu: 'a screenshot of your current homepage next to the first screen of the new one: the header with the menu and the hero section',
    poEmailu: 'the whole mockup (4 to 6 sections and a footer) for desktop and mobile, plus a link valid for 60 days',
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
  return karty.map((k) => ({ ...k, ...(KARTY_EN[k.id] || KARTA_SZABLONU_EN(k.id) || {}) }));
}

// --- Hub: FAQ ----------------------------------------------------------------------------------

/** FAQ huba; linki w odpowiedziach przez hrefWJezyku (EN: /en/cookies, /en/seo-audit). */
export function faqHubaL(locale) {
  if (locale !== 'en') return FAQ_HUBA;
  const cookies = hrefWJezyku('/cookies', 'en');
  const audyt = hrefWJezyku('/audyt-seo', 'en');
  // S1-poprawki Z-H4 (12.11.2026): te same 6 pytań i fakty co FAQ_HUBA (PL).
  const silniki = WIDOCZNOSC.grok ? 'ChatGPT, Gemini, Perplexity, Claude, Grok and Google' : 'ChatGPT, Gemini, Perplexity, Claude and Google';
  return [
    {
      id: 'are-the-tools-really-free',
      question: 'Are the tools really free?',
      answer: `Yes. All tools are free and need no account. Daily limits per IP address protect against abuse and the cost of model queries: ${AUDYT.limitIp} SEO audits, ${WIDOCZNOSC.limitIp} businesses in the AI visibility checker, ${MAKIETA.limitIp} mockups${AUTORYTET_OPUBLIKOWANY ? `, ${AUTORYTET.limitIp} domain authority checks` : ''} and ${GENERATOR.limitIp} checks in the llms.txt generator. The calculator works out the result in your browser. We email the PDF templates and do not add your address to a mailing list.`,
    },
    {
      id: 'what-data-do-i-provide',
      question: 'What data do I provide and what happens to it?',
      answer: `The SEO audit, the mockup and the llms.txt generator only need your website address. The AI visibility checker asks for your business name and industry, and you can add your city and website. The calculator works in your browser and sends nothing unless you ask for the summary by email. You give an email only if you want the full result, a report in your inbox or a PDF template. We delete stored results after 60 days, and the llms.txt generator stores nothing. Details are in the <a href="${cookies}" style="text-decoration:underline">privacy policy</a>.`,
    },
    {
      id: 'do-the-tools-replace-an-seo-audit',
      question: 'Do the tools replace an SEO audit?',
      answer: `No. The free audit automatically checks a sample of up to ${AUDYT.stron} pages against ${AUDYT.regul} rules, and the other tools check single elements: presence in AI answers, the llms.txt file, the look of your homepage. An <a href="${audyt}" style="text-decoration:underline">SEO audit</a> covers the whole website: indexing, content, links, speed and competitors, and its result is a prioritized list of changes.`,
    },
    {
      id: 'where-does-the-data-come-from',
      question: 'Where do the tools get their data?',
      answer: `The audit reads your website with our AISEOCompanyAudit crawler and takes the score from Google PageSpeed Insights. The checker asks ${silniki} live through their APIs. The calculator uses your numbers and studies that we list on its page with the source and the date we read them. The Claude model designs the mockup from your website’s content. The generator reads your sitemap and robots.txt.${AUTORYTET_OPUBLIKOWANY ? ' Domain authority is our 0-100 score calculated from the public Common Crawl link graph.' : ''}`,
    },
    {
      id: 'what-the-free-tools-cannot-do',
      question: 'What can the free tools not do?',
      answer: `They do not check ${AUTORYTET_OPUBLIKOWANY ? 'individual links pointing to your website (domain authority is a single number)' : 'links pointing to your website'}, keywords, Google rankings or Search Console data. The audit takes a sample of up to ${AUDYT.stron} pages and the checker asks ${WIDOCZNOSC.pytan} questions, so the result is a snapshot, not the full picture. The full picture comes from an SEO audit or an AI visibility audit.`,
    },
    {
      id: 'where-to-start',
      question: 'Which tool should I start with?',
      answer: 'With the free SEO audit: it shows whether your website has errors that get in the way of Google and AI bots. Then check your AI visibility, and use the calculator to estimate what these gaps may cost. The mockup helps when you are planning a new website.',
    },
  ];
}
