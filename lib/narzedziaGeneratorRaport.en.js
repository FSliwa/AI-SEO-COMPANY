// Wersja angielska danych dwóch stron narzędzi: generator llms.txt i wzór raportu SEO (9.11.2026).
// Dane PL zostają w lib/narzedzia.js (STRONY_NARZEDZI, FAQ_GENERATORA, faqRaportu); tu tylko EN:
// okruszek, H1, lista źródeł (te same adresy i daty odczytu) oraz FAQ. Klucz = slug pod /narzedzia.
import { hrefSprawdzarki } from './narzedzia';
import { hrefWJezyku, hrefWJezykuJesliOpublikowana } from './linkiEn';

export const STRONY_NARZEDZI_EN = {
  'generator-llms-txt': {
    okruszek: 'llms.txt generator',
    h1: 'llms.txt generator and AI bot access test for your website',
    sources: [
      { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file, v2 (format specification)', data: '2026-11-05' },
      { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What is llms.txt (analysis of 137,000 domains, John Mueller\'s statement)', data: '2026-11-05' },
      { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User)', data: '2026-11-05' },
      { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google: Google-Extended in the crawler documentation', data: '2026-11-05' },
      { url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', nazwa: 'Anthropic: ClaudeBot, Claude-SearchBot and Claude-User', data: '2026-11-05' },
      { url: 'https://docs.perplexity.ai/guides/bots', nazwa: 'Perplexity: PerplexityBot and Perplexity-User', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/wordpress-seo/', nazwa: 'WordPress.org plugin directory: Yoast SEO (version 28.8)', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/seo-by-rank-math/', nazwa: 'WordPress.org plugin directory: Rank Math SEO (version 1.0.281)', data: '2026-11-05' },
      { url: 'https://wordpress.org/plugins/all-in-one-seo-pack/', nazwa: 'WordPress.org plugin directory: All in One SEO (version 5.0.5)', data: '2026-11-05' },
    ],
  },
  // 11.11.2026: te same adresy i daty co sources raport-seo w lib/narzedzia.js (ta sama kolejność).
  'raport-seo': {
    okruszek: 'SEO report',
    h1: 'SEO report template: what a monthly SEO report should include (free PDF)',
    sources: [
      { url: 'https://support.google.com/analytics/answer/13965727', nazwa: 'Google Analytics Help: key events', data: '2026-11-11' },
      { url: 'https://support.google.com/analytics/answer/11161109', nazwa: 'Google Analytics Help: behavioral modeling for consent mode (events from users who decline consent, traffic thresholds)', data: '2026-11-11' },
      { url: 'https://developers.google.com/search/blog/2025/11/search-console-branded-filter', nazwa: 'Google Search Central: the branded queries filter in Search Console (November 20, 2025, updated March 11, 2026)', data: '2026-11-11' },
      { url: 'https://support.google.com/analytics/answer/13682862', nazwa: 'Google Analytics Help: Queries report (Search Console keeps data for the last 16 months)', data: '2026-11-11' },
      { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website (data in the Performance report)', data: '2026-11-11' },
      { url: 'https://support.google.com/business/answer/9918094', nazwa: 'Google Business Profile Help: profile performance (calls, directions, website clicks)', data: '2026-11-11' },
      { url: 'https://status.search.google.com/', nazwa: 'Google Search Status Dashboard: confirmed ranking updates', data: '2026-11-11' },
      { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals (LCP, INP and CLS thresholds, 75th percentile)', data: '2026-11-11' },
      { url: 'https://support.google.com/webmasters/answer/7440203?hl=en', nazwa: 'Search Console Help: Page indexing report', data: '2026-11-11' },
      { url: 'https://developers.google.com/speed/docs/insights/v5/about', nazwa: 'Google: PageSpeed Insights (Lighthouse lab data and CrUX real-user data)', data: '2026-11-11' },
    ],
  },
};

export const FAQ_GENERATORA_EN = [
  {
    id: 'llms-txt-a-robots-txt',
    question: 'Does llms.txt replace robots.txt?',
    answer: 'No. robots.txt tells bots what they must not fetch, and search and AI bots respect it. llms.txt is a voluntary list of your most important pages in Markdown, with no power to block anything. If you block OAI-SearchBot in robots.txt, no llms.txt will make ChatGPT cite your site.',
  },
  {
    id: 'gdzie-umiescic-llms-txt',
    question: 'Where should I put the llms.txt file?',
    answer: 'In the root of your domain, so that it opens at yourdomain.com/llms.txt and returns code 200 as plain text. The specification also allows a file in a subdirectory, e.g. /docs/llms.txt, but it only describes URLs under that path. A file behind a redirect is easy to miss. After you deploy it, open the address in a browser and check it in the generator.',
  },
  {
    id: 'llms-txt-a-llms-full-txt',
    question: 'What is the difference between llms.txt and llms-full.txt?',
    answer: 'llms.txt is an index: page titles with links and short descriptions. llms-full.txt is the customary name for a file that holds the full content of those pages in one Markdown document; the llmstxt.org specification does not describe it. The full version makes sense for technical documentation used by coding assistants. For a company website with a few dozen pages, an index is enough.',
  },
  {
    id: 'czy-blokowac-gptbot',
    question: 'Should I block GPTBot in robots.txt?',
    answer: 'It is a business decision. GPTBot collects data to train OpenAI models, while OAI-SearchBot indexes pages for search in ChatGPT. You can block the first and allow the second. If you want to appear in ChatGPT answers, do not block OAI-SearchBot.',
  },
  {
    id: 'czy-google-uzywa-llms-txt',
    question: 'Does Google use llms.txt?',
    answer: 'Not in search. Google representatives have said publicly that the file is not used for search, and access to your content for Gemini is controlled with the Google-Extended entry in robots.txt. llms.txt will not improve your Google rankings or guarantee a place in an AI Overview.',
  },
];

export function faqRaportuEn() {
  const sprawdzarka = hrefSprawdzarki();
  const audyt = hrefWJezyku('/audyt-seo', 'en');
  const sprawdzarkaEn = sprawdzarka ? hrefWJezyku(sprawdzarka, 'en') : null;
  const darmowyAudytEn = hrefWJezykuJesliOpublikowana('/narzedzia/audyt-seo', 'en');
  return [
    {
      id: 'co-to-jest-raport-seo',
      question: 'What is an SEO report?',
      answer: 'An SEO report is a document in which an agency or specialist shows what SEO delivered in a given period: customer inquiries, Google traffic, keyword rankings and the work done. Do not confuse it with an SEO audit, which is a one-time diagnosis of a website with a list of errors to fix.',
    },
    {
      id: 'jak-czesto-raport-seo',
      question: 'How often should an agency send an SEO report?',
      answer: 'Once a month is enough for a summary, because SEO results change over weeks, not days. Current data such as rankings and inquiries should always be available in a portal or dashboard. Compare months year over year so you do not mistake seasonality for the effect of the work.',
    },
    {
      id: 'raport-z-narzedzia',
      question: 'Is a report from an SEO tool, such as Semrush or Senuto, enough?',
      answer: 'No. A tool report shows visibility and rankings, but it does not say how many inquiries came from Google, what the agency did or why the result changed. Each tool also calculates visibility its own way, from its own keyword database, so you cannot compare its chart directly with another source. Tool data makes a good appendix to a report, not its content.',
    },
    {
      id: 'darmowy-raport-seo-strony',
      question: 'Where can I get a free SEO report for my website?',
      answer: `If you want to assess your website rather than an agency's work, you need an SEO audit.${darmowyAudytEn ? ` Our <a href="${darmowyAudytEn}" style="text-decoration:underline">free SEO audit</a> checks up to 25 pages and gives a score from 1 to 100 and a list of errors with fixes.` : ''} A full audit by a specialist covers the whole site: indexing, content, links, speed and competitors. Its scope and price are on the <a href="${audyt}" style="text-decoration:underline">SEO audit</a> page.${sprawdzarkaEn ? ` You can also <a href="${sprawdzarkaEn}" style="text-decoration:underline">check for free whether ChatGPT recommends your company</a>.` : ''}`,
    },
  ];
}
