// F2 EN (22.11.2026): English spoke object for /en/ai-search-optimization/pricing
// (internal PL slug: 'cennik', exact format of lib/pytaniaAi.en.js for SpokeAiLayout.jsx).
// Pure relative ESM imports without @/ alias.

import { SPRAWDZARKA_DZIALA } from './publikacja.js';
import { CENY, WIDOCZNOSC } from './narzedziaLiczby.js';
import { wpisEn } from './stronyEn.js';
import { A_CENNIK } from './pytaniaAiCennik.js';

const HUB = '/pozycjonowanie-w-ai';
const A2 = '/pozycjonowanie-w-ai/chatgpt';
const A5 = '/pozycjonowanie-w-ai/audyt-widocznosci';
const SPRAWDZARKA = '/sprawdz-widocznosc-w-ai';
const CENNIK_SEO = '/cennik-pozycjonowania';
const N_LLMS = '/narzedzia/generator-llms-txt';
const N_ROBOTY = '/narzedzia/tester-robotow-ai-robots-txt';

const DEFAULT_TITLE_EN = 'AI Search Optimization (GEO) Pricing: Costs & Plans';
const DEFAULT_DESC_EN = 'How much does AI search optimization (GEO) cost in 2026? 3 pricing models, real API & content costs, and our rates: €235 audit, plans from €450.';

export const pytanieAiCennikEn = {
  slug: 'cennik',
  typ: 'artykul',
  okruszek: 'GEO & AI SEO pricing',
  tag: 'AI search optimization · pricing & models 2026',
  title: wpisEn(A_CENNIK)?.tytul ?? DEFAULT_TITLE_EN,
  description: wpisEn(A_CENNIK)?.opis ?? DEFAULT_DESC_EN,
  h1: 'AI search optimization (GEO) pricing: 3 billing models and our 2026 rates',
  answer: `At AI SEO COMPANY, a one-off AI visibility audit (30 customer prompts across 4 AI engines plus a 90-day roadmap) costs €${CENY.audytAi.eur} net and is credited in full toward your first retainer month. Ongoing GEO runs either as a +€115 net/month add-on to SEO Standard (from €${CENY.seoStandard.eur} net/month) or included inside SEO Premium (€${CENY.seoPremium.eur} net/month) on a rolling monthly contract.`,
  lead: [
    'Companies asking what ',
    { a: 'AI search optimization (GEO)', href: HUB },
    ' costs in 2026 often receive wildly incomparable proposals - because one vendor quotes a prompt-tracking dashboard alone while another quotes technical engineering, answer pages and digital PR. Below we break down the three billing models on the market, separate raw API query pennies from real implementation hours, and publish our full rate table.',
  ],
  spisTresci: true,
  hero: [
    { tekst: `Order AI visibility audit (€${CENY.audytAi.eur} net)`, kontakt: true, plan: 'audyt-ai', cta: 'geo_cennik_hero_audyt', glowny: true },
    { tekst: 'Jump to our published rate table', href: '#our-rates', cta: 'geo_cennik_hero_tabela' },
  ],
  sections: [
    {
      id: 'three-billing-models',
      h2: '3 market billing models for GEO services in 2026',
      bloki: [
        { p: ['Because Generative Engine Optimization (earning brand mentions and citations in ChatGPT, Gemini, Perplexity and Google AI Overviews) sits across technical SEO, structured content and digital PR, providers package it in three distinct ways. Before comparing price tags, check which structure you are looking at:'] },
        {
          tabela: {
            id: 'table-geo-market-models',
            caption: 'Three common agency billing models for AI search optimization (GEO) in 2026',
            columns: [
              { key: 'model', label: 'Billing model' },
              { key: 'coObejmuje', label: 'What you actually pay for' },
              { key: 'kiedyMaSens', label: 'Best suited for' },
              { key: 'ryzyko', label: 'Buyer watch-out' },
            ],
            rows: [
              {
                id: 'model-audyt',
                model: '1. Standalone AI visibility audit',
                coObejmuje: 'Custom buyer-prompt basket, baseline run across multiple AI engines, third-party citation gap map, crawler/HTML audit and prioritized roadmap',
                kiedyMaSens: 'Teams with internal writers and developers who want an objective baseline and citation target list without a monthly commitment',
                ryzyko: 'Paying for a handful of manual screenshots taken in a personal chat window with no cited-domain export or technical crawl check',
              },
              {
                id: 'model-modul-seo',
                model: '2. GEO module inside a monthly SEO retainer',
                coObejmuje: 'Unified execution covering Google & Bing indexing, citable service/pricing pages, Business Profile, @graph JSON-LD, external mentions and weekly prompt tracking',
                kiedyMaSens: 'Most B2B and service SMEs - avoids paying two agencies twice to audit and edit the exact same pages and entity signals',
                ryzyko: 'An "AI add-on" that delivers a monthly chart of prompt scores with zero new pages, schema updates or outreach shipped',
              },
              {
                id: 'model-pr-entity',
                model: '3. Dedicated Digital PR, Entity & Citation sprint',
                coObejmuje: 'Original data studies, industry media placements, verified B2B directory profiles (Clutch, Sortlist) and comparison roundups on domains models already cite',
                kiedyMaSens: 'Mature SaaS and enterprise brands whose technical SEO and own-site content are already strong, competing for off-site share of voice',
                ryzyko: 'Bulk paid guest posts on generic link-farm blogs that neither Perplexity nor ChatGPT ever cites as trusted sources',
              },
            ],
            przypis: 'Source: AI SEO COMPANY market structure guide (November 2026). We do not publish unverified competitor agency fee estimates.',
          },
        },
        {
          p: [
            'Google Search Central states explicitly that websites need no special paid submission or proprietary markup beyond solid SEO fundamentals to appear in AI Overviews and AI Mode. For most B2B companies, model #2 - integrating GEO directly into your core SEO retainer - delivers the cleanest return on budget.',
          ],
        },
      ],
    },
    {
      id: 'what-drives-geo-costs',
      h2: 'What actually drives the cost of GEO (and what costs pennies)',
      bloki: [
        { p: ['Enterprise AI monitoring tools sometimes charge hundreds of euros per month just to log prompt outputs. Separating raw API query costs from skilled engineering and editorial labor shows where your budget should go:'] },
      ],
      podsekcje: [
        {
          id: 'api-measurement-cost',
          h3: '1. Multi-engine API measurement is inexpensive',
          bloki: [
            { p: ['In our production DataForSEO LLM Responses API billing from November 4, 2026, a live web-search prompt cost roughly $0.0296-$0.0302 USD in ChatGPT and $0.0064-$0.0068 USD in Perplexity. Running a fixed 30-prompt customer basket every single week across those APIs costs only a few dollars per month in raw compute.'] },
            { p: ['The takeaway for buyers: high GEO retainers cannot be justified by "expensive AI software". Your fee should fund human research, technical implementation, citable page production and off-site authority.'] },
          ],
        },
        {
          id: 'five-implementation-drivers',
          h3: '2. Five implementation deliverables that require real specialist hours',
          bloki: [
            {
              lista: [
                ['Rebuilding commercial & comparison pages for direct citation: in our November 4-5, 2026 API test, 31 out of 31 links cited by ChatGPT on pricing and comparison queries pointed to ordinary web pages (pricing tables, guides and comparisons), with 0 pointing to Maps. Producing fact-checked comparison and pricing pages takes real editorial rigor.'],
                ['Google Business Profile & entity consistency: in that same test, 59 of 62 links returned by ChatGPT on local company-recommendation prompts pointed to Google Maps searches. Maintaining categories, service descriptions, reviews and matching NAP across Bing Places and directories powers both Maps and AI recommendations.'],
                ['Conflict-free JSON-LD (@graph) & server HTML: consolidating Organization, LocalBusiness, Service, Product and FAQPage nodes without plugin duplicates, and ensuring key specs and prices render in raw HTTP HTML for non-JS crawlers.'],
                ['AI crawler access, IndexNow & /llms.txt: verifying HTTP 200 access for OAI-SearchBot, PerplexityBot and Claude-SearchBot across robots.txt and server WAFs, wiring IndexNow to notify Bing immediately, and maintaining a clean /llms.txt index.'],
                ['Earning mentions on domains models already trust: mapping the exact industry portals, B2B directories and comparison hubs cited in your niche and securing legitimate profiles and editorial coverage there.'],
              ],
            },
            {
              warunek: N_ROBOTY,
              p: [
                'You can run two technical checks yourself for €0 right now: test 12 AI crawlers in our ',
                { a: 'free AI crawler & robots.txt tester', href: N_ROBOTY },
                ' and build your root index in our ',
                { a: 'free llms.txt generator', href: N_LLMS },
                '.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'our-rates',
      h2: 'Published AI search optimization (GEO) pricing at AI SEO COMPANY',
      bloki: [
        { p: ['Every price we charge is published openly below - no revenue-based markups and no 12-month lock-in on SEO Standard or SEO Premium:'] },
        {
          tabela: {
            id: 'table-ai-seo-company-geo-rates',
            caption: 'AI SEO COMPANY published GEO audit, monitoring add-on and full retainer rates (EUR / PLN net, November 2026)',
            columns: [
              { key: 'usluga', label: 'Service / Plan' },
              { key: 'cena', label: 'Net price (EUR / PLN)' },
              { key: 'umowa', label: 'Commitment' },
              { key: 'zakres', label: 'Exact deliverables included' },
            ],
            rows: [
              {
                id: 'geo-free',
                usluga: 'Free AI visibility checker',
                cena: '€0 / PLN 0',
                umowa: `No sign-up (up to ${WIDOCZNOSC.limitIp} domains / IP / day)`,
                zakres: `Instant ${WIDOCZNOSC.pytan}-prompt sample across ${WIDOCZNOSC.silnikow} AI sources, 0-100 visibility score, plus top 5 named rivals and 5 cited domains`,
              },
              {
                id: 'geo-audyt',
                usluga: 'One-off AI visibility audit (GEO)',
                cena: `€${CENY.audytAi.eur} / PLN ${CENY.audytAi.pln}`,
                umowa: 'One-off (100% credited toward month 1 of a retainer)',
                zakres: '30 agreed buyer prompts tested in ChatGPT, Perplexity, Gemini & Google AI Overviews, full competitor & cited-source matrix, AI bot crawl check, 10-action 90-day plan + 45-min review call',
              },
              {
                id: 'geo-standard-plus',
                usluga: 'SEO Standard + weekly AI monitoring & GEO add-on',
                cena: `from €${CENY.seoStandard.eur} + €115 = €565 / mo (PLN 2,390)`,
                umowa: 'Rolling monthly contract, 1-month notice',
                zakres: 'Full website & Business Profile SEO (up to 20 keywords, 2 content pieces, 2 links/mo) + weekly 30-prompt tracking across 4 AI sources in 24/7 portal + 2 dedicated GEO actions/month',
              },
              {
                id: 'geo-premium',
                usluga: 'SEO Premium (full SEO + weekly GEO included)',
                cena: `€${CENY.seoPremium.eur} / mo (PLN 2,500)`,
                umowa: 'Rolling monthly contract, 1-month notice',
                zakres: 'Full technical SEO, mobile CRO, up to 50 keywords, 4 in-depth content pieces & 4 links/mo, Google Maps management and weekly 30-prompt AI tracking included at no surcharge',
              },
              {
                id: 'geo-booster',
                usluga: 'Booster Pack (€0 upfront custom Next.js website + SEO)',
                cena: `€${CENY.boosterPack.eur} / mo (PLN 2,500)`,
                umowa: `Min. ${CENY.boosterPack.umowaMiesiecy}-month term, monthly rolling after`,
                zakres: 'Custom Next.js website with clean server HTML & @graph JSON-LD built for Googlebot and non-JS AI crawlers (€0 upfront build fee), hosting, SSL, Google Maps & full SEO',
              },
            ],
            przypis: 'Source: AI SEO COMPANY published rate card (lib/narzedziaLiczby.js & components/GeoPageClient.jsx, as of Nov 22, 2026). Net figures excluding applicable VAT.',
          },
        },
        {
          p: [
            'Read the full 30-prompt audit breakdown on our ',
            { a: 'AI visibility audit', href: A5 },
            ' page, inspect our live model test data in the ',
            { a: 'ChatGPT optimization guide', href: A2 },
            ', or compare all packages on our ',
            { a: 'SEO pricing page', href: CENNIK_SEO },
            '.',
          ],
        },
        ...(SPRAWDZARKA_DZIALA
          ? [{ p: ['Want a free baseline sample in two minutes first? Run our ', { a: 'free AI visibility checker', href: SPRAWDZARKA }, '.'] }]
          : []),
      ],
    },
    {
      id: 'buyer-verification-checklist',
      h2: '7 verification questions to ask before buying any GEO service',
      bloki: [
        { p: ['Before signing an "AI SEO" or "ChatGPT ranking" proposal with any vendor, ask these seven questions in writing:'] },
        {
          tabela: {
            id: 'table-geo-buyer-questions',
            caption: '7 due-diligence questions before hiring a GEO / AI search provider',
            columns: [
              { key: 'pytanie', label: 'Question to ask the agency' },
              { key: 'zdrowaOdpowiedz', label: 'Credible, verifiable answer' },
              { key: 'czerwonaFlaga', label: 'Red flag' },
            ],
            rows: [
              {
                id: 'wer-1',
                pytanie: '1. How exactly do you measure AI visibility?',
                zdrowaOdpowiedz: 'A fixed list of 20-50 buyer prompts queried on a recurring schedule via clean APIs, logging full responses and cited URLs',
                czerwonaFlaga: 'Ad-hoc screenshots from an account manager’s personal ChatGPT window (biased by chat memory)',
              },
              {
                id: 'wer-2',
                pytanie: '2. Do you guarantee #1 recommendations in ChatGPT?',
                zdrowaOdpowiedz: 'States plainly that LLM outputs are probabilistic - commits to concrete deliverables and week-over-week mention share',
                czerwonaFlaga: 'Guaranteed top-spot placement inside ChatGPT or Gemini answers',
              },
              {
                id: 'wer-3',
                pytanie: '3. What tangible assets ship every month?',
                zdrowaOdpowiedz: 'Defined count of answer/comparison pages, JSON-LD updates, Business Profile work and verified external mentions',
                czerwonaFlaga: 'Prompt-tracking charts alone with zero content, technical or off-site work shipped',
              },
              {
                id: 'wer-4',
                pytanie: '4. How do you position /llms.txt?',
                zdrowaOdpowiedz: 'As a tidy optional index after HTML indexability, Bing IndexNow and OAI-SearchBot access are confirmed',
                czerwonaFlaga: 'Charging thousands for uploading an llms.txt file pitched as a "secret Google AI ranking boost"',
              },
              {
                id: 'wer-5',
                pytanie: '5. Where do external brand mentions come from?',
                zdrowaOdpowiedz: 'Industry directories, roundups and publications actually cited by Perplexity and ChatGPT in your vertical',
                czerwonaFlaga: 'Bulk PBN links or paid spam guest posts that violate Google spam policies',
              },
              {
                id: 'wer-6',
                pytanie: '6. Who owns the analytics accounts and content IP?',
                zdrowaOdpowiedz: 'Search Console, GA4, Bing and Business Profile live under your company email; paid content and earned links stay permanently',
                czerwonaFlaga: 'Agency-owned properties or "rented" links removed upon cancellation',
              },
              {
                id: 'wer-7',
                pytanie: '7. What is the lock-in and notice period?',
                zdrowaOdpowiedz: 'Rolling monthly contract (or a short 3-month term strictly when a custom website build is bundled upfront)',
                czerwonaFlaga: '12- to 24-month lock-in with early-termination penalties',
              },
            ],
            przypis: 'Aligned with Google Search Central guidance ("Do you need an SEO?" & "Optimizing for generative AI features", accessed Nov 22, 2026).',
          },
        },
      ],
    },
  ],
  faqTytul: 'Questions about GEO pricing and ROI',
  faq: [
    {
      id: 'why-bundle-geo-with-seo',
      question: 'Why is bundling GEO inside an SEO retainer cheaper than hiring a separate AI agency?',
      answer: [
        'Roughly 80% of the underlying engineering and editorial work overlaps: Google and Bing indexation, fast server-rendered HTML, direct pricing and comparison pages, consistent Google Business Profile data, and authoritative industry mentions. Hiring a second standalone GEO vendor means paying twice to audit and edit the same pages.',
      ],
    },
    {
      id: 'how-audit-credit-works',
      question: 'How does the €235 AI visibility audit credit work?',
      answer: [
        'If you decide to start an ongoing monthly retainer (SEO Standard with the AI module or SEO Premium) after reviewing your 30-prompt audit report, we deduct the full €235 net audit fee from your first monthly invoice. If you prefer to execute the 90-day roadmap in-house, you keep the entire report and source matrix with zero obligation.',
      ],
    },
    {
      id: 'why-no-competitor-agency-prices',
      question: 'Why don’t you list named competitor agencies’ GEO prices?',
      answer: [
        'Most agencies do not publish standardized, apples-to-apples GEO rate cards specifying prompt counts, queried engines and monthly implementation deliverables, and attributing guessed prices to competitors would mislead buyers under European comparative-advertising rules (including Art. 16 of Poland’s Unfair Competition Act). Instead, we publish every euro of our own pricing and give you 7 written questions to benchmark any quote.',
      ],
    },
    {
      id: 'how-fast-geo-investment-works',
      question: 'How long until GEO investments show up in AI answers?',
      answer: [
        'Technical fixes - unblocking OAI-SearchBot in your WAF, submitting new pricing or comparison pages via IndexNow, and completing Google Business Profile services - can shift live web-search answers in ChatGPT and Perplexity within 2-6 weeks. Earning third-party directory and media citations compounds over 3-6 months, tracked weekly in your client portal.',
      ],
    },
  ],
  cta: {
    tytul: 'Start with a measurable 30-prompt baseline for €235 net',
    tekst: `Tell us your industry and target markets. We will agree on 30 real buyer questions, test ChatGPT, Perplexity, Gemini and Google AI Overviews for €${CENY.audytAi.eur} net - and credit 100% of that fee toward month one if you continue on a monthly plan.`,
    przyciski: [
      { tekst: `Order AI visibility audit (€${CENY.audytAi.eur} net)`, kontakt: true, plan: 'audyt-ai', cta: 'geo_cennik_cta_audyt', glowny: true },
      { tekst: 'Compare full monthly SEO plans', href: CENNIK_SEO, cta: 'geo_cennik_cta_pakiety' },
    ],
  },
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', nazwa: 'Google Search Central: Optimizing for generative AI features', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO? (evaluating AEO/GEO claims)', data: '2026-11-22' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot)', data: '2026-11-22' },
    { url: 'https://dataforseo.com/apis/ai-optimization-api', nazwa: 'DataForSEO AI Optimization / LLM Responses API documentation & per-request pricing', data: '2026-11-22' },
  ],
  updated: '2026-11-22',
  opublikowano: null,
};

export const pytaniaAiCennikEn = [pytanieAiCennikEn];

export default pytanieAiCennikEn;
