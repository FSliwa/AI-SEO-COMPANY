// Treść strony /en/seo-copywriting (EN). 18.11.2026, zadanie airSlate "nowa-copywriting".
// Własny tekst pod frazę "SEO copywriting" (rynek EN), te same fakty co lib/copywritingSeo.js.
// Popyt EN: fraza nie ma wolumenu w seo/frazy-en.csv (nie była mierzona; bez płatnego API nie ustalamy).
// Google Suggest (18.11.2026, hl=en) podpowiada m.in. "seo copywriting services", "examples", "checklist",
// "tools", "vs copywriting", więc jest realne zainteresowanie, ale bez liczby. Strona zostaje, bo oferta istnieje
// (treści w pakietach SEO), a EN bliźniak jest wymogiem właściciela dla nowych stron (9.11.2026).
// Znaczniki [[/sciezka-pl|tekst]] jak w wersji PL.

import { CENY, cena } from './narzedziaLiczby';

export const TITLE_EN = 'SEO copywriting: content included in SEO from €450 net';
export const DESCRIPTION_EN = 'SEO copywriting inside our SEO packages: 2 or 4 pieces of content a month, written from a brief and fact-checked. Pricing and free templates.';

const STANDARD = `${cena('seoStandard', 'en')} net`;
const PREMIUM = `${cena('seoPremium', 'en')} net`;

export const EN = {
  breadcrumb: 'SEO copywriting',
  tag: 'SEO copywriting · content inside SEO packages',
  h1: 'SEO copywriting services: copy written for a keyword, an intent and a sale',
  odpowiedz:
    `SEO copywriting is writing that answers customer questions and helps your page rank in Google. We do not sell it on its own: content comes inside our SEO packages. SEO Standard from ${STANDARD} a month includes 2 pieces, SEO Premium at ${PREMIUM} includes 4. Each piece is written from a brief, for one keyword and one URL.`,
  wstep:
    'You will not get a price per article or a one-off order from us. You get content planned together with the audit, the links and a client portal where you can see what was done.',
  ctaGlowny: 'Ask about a package with content',
  ctaDrugi: 'See how much content is included',
  ctaOdpowiedz: 'Reply within 24 h on business days',

  sekcje: {
    czym: {
      id: 'what-is-seo-copywriting',
      h2: 'What SEO copywriting is and how it differs from ordinary copywriting',
      akapity: [
        'Ordinary copywriting persuades the reader and gets them to act. SEO copywriting does the same, but the text also has to be found: it answers a specific query, has one main keyword and sits on a URL that does not compete with another page of yours. Google says plainly that content should be made for people, not for search engines, so in practice the two disciplines are converging.',
      ],
      tabela: {
        id: 'copywriting-vs-seo-copywriting',
        caption: 'Advertising copywriting vs SEO copywriting',
        kolumny: ['Criterion', 'Advertising copywriting', 'SEO copywriting'],
        wiersze: [
          ['Starting point', 'The product and the brand message', 'The customer’s query and its intent'],
          ['What we check before writing', 'Competing offers and brand tone', 'The top 5 Google results for the keyword'],
          ['Length', 'Depends on the format', 'As long as a complete answer needs; Google has no preferred word count'],
          ['Keywords', 'Do not shape the plan of the text', 'Main keyword and variants in the title, H1, headings and first sentences, without stuffing'],
          ['Measure of success', 'The audience’s reaction', 'Impressions, clicks and positions in Search Console, plus enquiries from the form'],
          ['After publishing', 'Usually the end of the job', 'Measurement and an update when the page loses positions'],
        ],
        przypis: 'This table describes our way of working, not the result of a study. No preferred word count: Google, source 1.',
      },
    },
    cena: {
      id: 'seo-copywriting-pricing',
      h2: 'How much SEO copywriting costs with us',
      akapity: [
        'We do not sell SEO copywriting on its own or at a price per article. Content is part of our SEO packages, together with the audit, links and the client portal, because text only works alongside a site that loads well and is indexed. Below is the data from our pricing page, net prices (+23% VAT).',
      ],
      tabela: {
        id: 'content-in-packages',
        caption: 'Content in AI SEO COMPANY SEO packages (as of November 18, 2026)',
        kolumny: ['Package', 'Net price per month', 'Keywords', 'Content per month', 'Links per month', 'Contract'],
        wiersze: [
          ['SEO Standard', `from ${cena('seoStandard', 'en')}`, 'up to 20', '2', '2', 'monthly'],
          ['SEO Premium', cena('seoPremium', 'en'), 'up to 50', '4', '4', 'monthly'],
        ],
        przypis: 'Source: our SEO pricing. A technical audit is included in every package. The Booster Pack (€590 net with a new website, minimum 3-month contract) does not state a number of content pieces on the pricing page.',
      },
      akapityPo: [
        'The pricing page gives the number of content pieces per month, not a character count. The length and type of each text (article, service page, category description) follow from the brief for that keyword, so ask about them before you sign. If you need a single text on demand, we do not offer that.',
      ],
    },
    proces: {
      id: 'how-a-text-is-made',
      h2: 'How a text is made: from keyword to publication',
      wstep: 'Every text goes through the same six steps. The first three are preparation, because a weak brief cannot be repaired while writing.',
      kroki: [
        ['Keyword and intent.', 'One group of keywords with the same intent is one URL. We check whether another page already competes for those words, because two pages for one keyword weaken each other.'],
        ['Results analysis.', 'We open the top five Google results for the keyword: what everyone covers and what is missing. It is a starting point, not a model to copy.'],
        ['Brief.', 'Goal, audience, an outline of headings drawn from customer questions, internal links and tone. We publish a template of such a brief for free (below).'],
        ['A text that opens with the answer.', 'The first paragraph answers the question directly, then come data, examples and a source for every fact. An answer like that is easy for AI assistants to quote too, as we explain in our description of [[/pozycjonowanie-w-ai|AI search optimization]].'],
        ['Review and publication.', 'We check facts, a single H1, the title and description, internal links in both directions, structured data, the author and the update date.'],
        ['Measurement.', 'Positions and clicks in Search Console, and every action in the work log in the client portal, with a date and the number of hours.'],
      ],
    },
    szablony: {
      id: 'brief-and-content-plan',
      h2: 'Brief and content plan: free templates of our method',
      wstep: 'You can check the method without talking to us. The same documents we use for our texts are available as PDF templates:',
      lista: [
        '[[/narzedzia/brief-dla-copywritera|Content brief template]] in 10 parts: goal, keyword and intent, top 5 analysis, outline, links, tone and a review checklist.',
        '[[/narzedzia/content-plan|Content plan]] with a 3-month publishing calendar, a topic backlog and measurement in Search Console.',
        '[[/narzedzia/dobor-slow-kluczowych|Keyword selection]]: keyword sources, intent, clusters based on Google results, a page map and cannibalization.',
      ],
    },
    nieWystarczy: {
      id: 'when-copy-is-not-enough',
      h2: 'When copy alone is not enough',
      akapity: [
        'Even a good text will not fix a page that loads slowly or is not indexed, and it will not replace links from other sites. That is why we start with an audit and manage content as part of our [[/pozycjonowanie-stron-internetowych|SEO services]]. If you are not sure which package makes sense, see the SEO pricing.',
      ],
    },
  },

  zrodlaNaglowek: 'Sources',
  zrodla: [
    { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=en', nazwa: 'Google Search Central: Creating helpful, reliable, people-first content', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=en', nazwa: 'Google Search Central: Spam policies (keyword stuffing, scaled content abuse)', data: '2026-11-18' },
  ],

  faqTytul: 'Questions about SEO copywriting',
  faq: [
    {
      id: 'co-to-jest-copywriting-seo',
      idEn: 'what-is-seo-copywriting-faq',
      question: 'What is SEO copywriting?',
      answer: 'SEO copywriting is writing that answers a customer’s query and has a chance of ranking high in Google at the same time. A text is written for one main keyword and one intent, with customer questions in the headings and a source next to every fact.',
    },
    {
      id: 'seo-a-copywriting',
      idEn: 'seo-vs-copywriting',
      question: 'What is the difference between SEO and copywriting?',
      answer: 'SEO is about making a site findable: technical work, links, structure and content. Copywriting is about the text itself and how well it works on the reader. SEO copywriting combines both: the text persuades and answers the query people type into Google.',
    },
    {
      id: 'ile-kosztuje-copywriting-seo-faq',
      idEn: 'how-much-does-seo-copywriting-cost',
      question: 'How much does SEO copywriting cost?',
      answer: `With us content sits inside the SEO packages: SEO Standard from ${cena('seoStandard', 'en')} net a month includes 2 pieces of content, SEO Premium at ${cena('seoPremium', 'en')} net includes 4 (net prices, +23% VAT). We do not run a separate price list per text. Details on the [[/cennik-pozycjonowania|SEO pricing]] page.`,
    },
    {
      id: 'ile-slow-ma-miec-tekst-seo',
      idEn: 'how-long-should-an-seo-article-be',
      question: 'How many words should an SEO article have?',
      answer: 'As many as it takes to answer the question fully. Google says it has no preferred word count, and writing to a length fixed in advance is a warning sign. We set a range from the analysis of the top five results for the keyword, as a reference point and not a target to hit.',
    },
    {
      id: 'same-teksty-bez-pozycjonowania',
      idEn: 'can-i-order-only-texts',
      question: 'Can I order only texts, without SEO?',
      answer: 'No. We have no one-off text offer and no price per character. Content is part of the SEO packages, together with the audit, links and the client portal. If you prefer to write yourself, download the free [[/narzedzia/brief-dla-copywritera|content brief template]] and the [[/narzedzia/content-plan|content plan]].',
    },
  ],

  ctaKoniec: 'Want to know which texts your site needs and how many? Write to us and we will reply within 24 hours on business days.',
  ctaKoniecPrzycisk: 'Ask about a package with content',

  service: {
    name: 'SEO copywriting inside SEO packages',
    description: 'SEO content inside our packages: 2 pieces a month in SEO Standard and 4 in SEO Premium, written from a brief for one keyword and one URL, with fact-checking.',
    serviceType: 'SEO copywriting',
    oferty: [
      { name: 'SEO Standard: package with 2 pieces of content a month', price: CENY.seoStandard.eur, currency: 'EUR' },
      { name: 'SEO Premium: package with 4 pieces of content a month', price: CENY.seoPremium.eur, currency: 'EUR' },
    ],
  },
};
