// Wersja angielska danych dwóch stron narzędzi: generator llms.txt i wzór raportu SEO (9.11.2026).
// Dane PL zostają w lib/narzedzia.js (STRONY_NARZEDZI, FAQ_GENERATORA, faqRaportu); tu tylko EN:
// okruszek, H1, lista źródeł (te same adresy i daty odczytu) oraz FAQ. Klucz = slug pod /narzedzia.
import { hrefSprawdzarki } from './narzedzia';
import { hrefWJezyku } from './linkiEn';

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
  'raport-seo': {
    okruszek: 'SEO report',
    h1: 'SEO report: what it should include, plus a template to download',
    sources: [],
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
  return [
    {
      id: 'co-to-jest-raport-seo',
      question: 'What is an SEO report?',
      answer: 'An SEO report is a document in which an agency or specialist shows what SEO delivered in a given period: leads from customers, Google traffic, keyword positions and the work done. Do not confuse it with an SEO audit, which is a one-time diagnosis of a website with a list of errors to fix.',
    },
    {
      id: 'jak-czesto-raport-seo',
      question: 'How often should an agency send an SEO report?',
      answer: 'Once a month is enough for a summary, because SEO results change over weeks, not days. Current data such as positions and leads should always be available in a portal or dashboard. Compare months year over year so you do not mistake seasonality for the effect of the work.',
    },
    {
      id: 'raport-z-narzedzia',
      question: 'Is a report from a tool, such as Senuto, enough?',
      answer: 'No. A tool report shows visibility and positions, but it does not say how many leads came from Google, what the agency did or why the result changed. Tool data makes a good appendix to a report, not its content.',
    },
    {
      id: 'darmowy-raport-seo-strony',
      question: 'Where can I get a free SEO report for my website?',
      answer: `If you want to assess your website rather than an agency's work, you need an SEO audit. We describe the scope and price of the audit on the <a href="${audyt}" style="text-decoration:underline">SEO audit</a> page.${sprawdzarkaEn ? ` You can also <a href="${sprawdzarkaEn}" style="text-decoration:underline">check for free whether ChatGPT recommends your company</a> right away.` : ''}`,
    },
  ];
}
