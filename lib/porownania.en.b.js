// EN: druga połowa danych porównań (P3 'seo-czy-google-ads', P6 'jak-wybrac-agencje-seo').
// Ten sam kształt, klucze, slug (PL), id i tableId co P3/P6 w lib/porownania.js; widoczne teksty po angielsku.
// Linki wewnętrzne w EN przez hrefWJezyku / hrefWJezykuJesliOpublikowana (zdanie z linkiem do
// nieopublikowanej strony znika w całości, jak w wersji PL).

import { hrefWJezyku, hrefWJezykuJesliOpublikowana } from './linkiEn';
import { PANEL_DEMO_URL } from './panel';

// --- Pomocnicze (kopie EN) ---------------------------------------------------------------------

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const L = (plPath) => hrefWJezyku(plPath, 'en');

/** Zdanie z linkiem do strony z rejestru publikacji albo '' (strona jeszcze nie zwraca 200). */
function zdanieJesli(plHref, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(plHref, 'en');
  return h ? zdanie(h) : '';
}

// --- P3 -----------------------------------------------------------------------------------------

export const AKAPIT_P3_PO_ZGODZIE_D9_EN = '<p>Our campaign stopped running on October 12, 2026. Since then, ad traffic has been zero: paid clicks leave behind neither rankings nor content. What remains is the website and its visibility in organic results, which we build separately.</p>';

export const P3_EN = {
  slug: 'seo-czy-google-ads',
  title: 'SEO or Google Ads? Costs, Time to Results, When to Combine',
  description: 'SEO or Google Ads: the cost per click from our campaign (PLN 7.92), time to results and what stays after you stop paying. When to combine them.',
  h1: 'SEO or Google Ads: Which to Choose and When to Combine Both',
  okruszek: 'SEO or Google Ads',
  nazwaKarty: 'SEO or Google Ads',
  teaser: 'The cost per click from our campaign, the time to the first inquiries and what remains after the budget is switched off.',
  kryteria: '9 criteria',
  decyzja: { pytanie: 'Ads or SEO?', skrot: 'Ads for speed, SEO for the long run; usually both' },
  tag: 'Channel comparison',
  zrodlaDanych: 'Data: our own Google Ads campaign (Sep 26 to Oct 11, 2026), Keyword Planner via DataForSEO (Nov 4, 2026), Google results for 30 keywords (Nov 4, 2026).',
  answer: 'Google Ads delivers clicks from day one, but only as long as you pay: our campaign cost an average of PLN 7.92 per click (Sep 26 to Oct 11, 2026). SEO usually shows first changes after 4–8 weeks, but the traffic does not vanish when you stop the budget. For a small service business, a mix usually pays off: Ads to start, SEO for a steady flow of inquiries.',
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-9-kryteriow',
  tableCaption: 'SEO and Google Ads compared on 9 criteria (data from November 2026)',
  tablePrzypis: 'Sources: our own Google Ads campaign (Sep 26 to Oct 11, 2026), Google Ads Keyword Planner via DataForSEO (Nov 4, 2026), converted at the NBP average exchange rate of PLN 3.9097 (table 215/A/NBP/2026).',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'seo', label: 'SEO' },
    { key: 'ads', label: 'Google Ads' },
  ],
  rows: [
    { kryterium: 'What you pay for', seo: 'The work: technical fixes, content, links, business profile; clicks from organic results are free', ads: 'Every click (auction) and, optionally, campaign management' },
    { kryterium: 'First results', seo: 'Usually first visibility changes after 4–8 weeks', ads: 'From the moment the ad runs, once approved' },
    { kryterium: 'After you switch off the budget', seo: 'Rankings fade gradually; content and links stay', ads: 'Clicks from ads disappear immediately' },
    { kryterium: 'Cost per click', seo: 'PLN 0 for the click itself', ads: 'PLN 7.92 on average for us (Sep 26 to Oct 11, 2026, bid cap PLN 18); Keyword Planner for SEO industry keywords: approx. PLN 37–81' },
    { kryterium: 'Control', seo: 'Google decides the order', ads: 'You choose keywords, budget, hours and location' },
    { kryterium: 'Keyword reach', seo: 'One page can collect traffic from many variants of a question', ads: 'Every click costs, the budget sets the reach' },
    { kryterium: 'Measurement', seo: 'Search Console and GA4', ads: 'Google Ads account and GA4' },
    { kryterium: 'Risk', seo: 'Time, algorithm updates', ads: 'Rising bids, dependence on budget' },
    { kryterium: 'AI answers', seo: 'Content can be cited in AI Overviews and ChatGPT', ads: 'Ads do not improve organic results or citations' },
  ],
  sections: [
    {
      id: 'czym-sie-roznia',
      h2: 'SEO vs Google Ads: How They Differ',
      html: [
        '<p>SEO is work on a website, its content and its links so that Google shows it high in the free results. You do not pay for the click on such a result. Google Ads is an auction: you pay for every click on an ad, and the ad disappears when the budget runs out.</p>',
        '<p>We disclose our interest: we do SEO and we do not run Google Ads campaigns for clients. Our Ads data comes from promoting our own website, so we describe it from an advertiser\'s perspective, not an ad seller\'s.</p>',
      ].join(''),
      h3: [
        {
          id: 'slowniczek',
          h3: 'SEO, SEM and PPC: a glossary',
          html: [
            '<ul>',
            '<li>SEO (search engine optimization): work on free search results.</li>',
            '<li>SEM (search engine marketing): everything you do in search, that is, SEO and paid ads together.</li>',
            '<li>PPC (pay per click): a payment model in which you are charged per click, the way Google Ads bills, among others.</li>',
            '</ul>',
            '<p>"SEO or SEM" is therefore not a choice between two services but between a part and the whole. When people ask about "SEO vs SEM", they usually mean a choice between SEO and ads.</p>',
          ].join(''),
        },
      ],
    },
    {
      id: 'porownanie-9-kryteriow',
      h2: 'SEO vs Google Ads on 9 Criteria',
      tabela: 'glowna',
      htmlPo: '<p>The most important difference is not the price of a click but what remains once the spending stops. With ads, you pay for access to customers for as long as the campaign runs. With SEO, you pay for work whose result, meaning content, links and visibility, stays with your company.</p>',
    },
    {
      id: 'koszt-klikniecia',
      h2: 'How Much a Google Ads Click Costs: Data from Our Campaign',
      html: '<p>We promoted our website in Google Ads for keywords related to SEO services. From September 26 to October 11, 2026, the campaign collected 213 clicks for PLN 1,687.82, an average of PLN 7.92 per click, using the maximize clicks strategy with a bid cap of PLN 18. Keyword Planner shows much higher average bids for keywords in our industry: approx. PLN 37 for "pozycjonowanie stron cennik" (website SEO pricing), PLN 50 for "agencja seo" (SEO agency) and PLN 81 for "pozycjonowanie za efekt" (pay-for-results SEO), at the NBP rate of November 4, 2026. These are Polish-language keywords on Google.pl.</p>',
      tabela: {
        id: 'tabela-cpc-planer',
        caption: 'Average cost-per-click bids in Keyword Planner for SEO industry keywords (Nov 4, 2026)',
        columns: [{ key: 'fraza', label: 'Keyword' }, { key: 'stawka', label: 'Average cost per click' }],
        rows: [
          { fraza: 'pozycjonowanie stron cennik', stawka: 'approx. PLN 37' },
          { fraza: 'agencja seo', stawka: 'approx. PLN 50' },
          { fraza: 'pozycjonowanie za efekt', stawka: 'approx. PLN 81' },
        ],
        przypis: 'Source: Google Ads Keyword Planner via DataForSEO (Poland, Nov 4, 2026); bids converted to zloty at the NBP average rate of PLN 3.9097 (table 215/A/NBP/2026 of Nov 4, 2026).',
        minWidth: 420,
      },
      htmlPo: [
        '<p>The price of a click comes from the auction: Google takes the bid and the ad quality into account, so the same keyword can cost different advertisers different amounts. On top of click costs comes campaign management if you hand it to an agency: in our sample of 17 agencies, management fees started at PLN 600 per month or came to 14–20% of the budget (as of October 25, 2026).</p>',
        zdanieJesli('/porownania/pozycjonowanie-za-efekt-czy-abonament', (h) => `<p>The cost of SEO, in turn, depends on the billing model, which we describe in the comparison ${a(h, 'pay for results or monthly retainer')}.</p>`),
      ].join(''),
    },
    {
      id: 'czas-do-efektu',
      h2: 'Time to the First Inquiries',
      html: [
        '<p>A Google Ads ad can start running right after approval, and Google reviews most ads within one business day. The first clicks therefore usually arrive in the first days of the campaign, provided the budget and bids let the ad win auctions.</p>',
        '<p>With SEO, we usually see the first visibility changes after 4–8 weeks, once Google recrawls the fixes and new content. The target for agreed local keywords is the top 3 in 2–3 months, and for a new domain with no history it takes longer.</p>',
      ].join(''),
    },
    {
      id: 'po-wylaczeniu',
      h2: 'What Remains After You Switch Off the Budget',
      html: [
        '<p>Clicks from ads end on the day the campaign stops running. Neither rankings nor content remain: you pay for access to customers, not for the growth of your website.</p>',
        '<p>After SEO, what remains is what was built during the work: a fixed website, content, links and a maintained Google Business Profile. Without further work, rankings may weaken over time because competitors do not stand still, but they do not vanish overnight.</p>',
      ].join(''),
    },
    {
      id: 'przeglad-ai-i-reklamy',
      h2: 'AI Overviews and Ads in Google Results in 2026',
      html: [
        '<p>On November 4, 2026, we checked 30 SEO industry keywords in Google (Poland, desktop, DataForSEO data). An AI Overview appeared for all 30, and ads for only 4. In our industry, a free result therefore competes with an AI answer more often than with an ad.</p>',
        `<p>An ad does not improve your position in free results or your chances of being cited in an AI Overview. Presence in AI answers is built with content and mentions of your company${zdanieJesli('/porownania/seo-vs-geo', (h) => `, which we describe in the comparison ${a(h, 'SEO and GEO')}`)}.</p>`,
      ].join(''),
    },
    {
      id: 'kiedy-co-wybrac',
      h2: 'When to Choose Google Ads, When SEO and When to Combine',
      tabela: {
        id: 'tabela-kiedy-co-wybrac',
        caption: 'Google Ads, SEO or both: choosing by your company\'s situation',
        columns: [
          { key: 'sytuacja', label: 'Situation' },
          { key: 'wybierz', label: 'Choose' },
          { key: 'dlaczego', label: 'Why' },
        ],
        rows: [
          { sytuacja: 'A new business that needs inquiries this month', wybierz: 'Google Ads + an SEO start', dlaczego: 'Ads bring traffic right away, SEO builds a steady channel' },
          { sytuacja: 'A seasonal service (e.g. air conditioning in summer)', wybierz: 'Ads in season, SEO 2–3 months before the season', dlaczego: 'You can switch ads on and off, but content needs time to get indexed' },
          { sytuacja: 'A local service on a limited budget', wybierz: 'Local SEO and a Google Business Profile', dlaczego: 'Clicks from Maps and organic results are free' },
          { sytuacja: 'Testing a new service or price', wybierz: 'Google Ads', dlaczego: 'After 2–4 weeks you know which keywords bring inquiries' },
          { sytuacja: 'High bids in your industry (law, medicine, finance)', wybierz: 'SEO + a small Ads budget for the highest-converting keywords', dlaczego: 'Every click is expensive, organic traffic lowers the average cost per inquiry' },
        ],
      },
      htmlPo: `<p>If you operate locally in Warsaw, see how we do ${a(L('/seo-lokalne-warszawa'), 'local SEO')}. Before starting a campaign or SEO, it is also worth checking your site: a ${a(L('/audyt-seo'), 'SEO audit in 3–5 days')} will show what blocks its visibility.</p>`,
    },
    {
      id: 'budzet-na-start',
      h2: 'How to Calculate a Starting Budget',
      html: [
        '<p>Three simple calculations are enough for both channels:</p>',
        '<ul><li>number of clicks = budget / average cost per click;</li><li>number of inquiries = clicks × the share of visits that end in a form or a phone call;</li><li>cost per inquiry = budget / number of inquiries.</li></ul>',
        '<p>Example: the price of our SEO Standard package, PLN 1,900, spent entirely on ads at an average cost of PLN 7.92 buys about 240 clicks a month. How many of them turn into inquiries depends on your website and offer. You can read that share in GA4 only when the form, phone calls and email are tracked as events, so set up tracking before the campaign starts. Without it, you cannot calculate the cost per inquiry in either Ads or SEO.</p>',
        `<p>You can check the other side of the equation, that is, ${a(L('/cennik-pozycjonowania'), 'how much SEO costs')}, in our pricing.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Questions about SEO and Google Ads',
  faq: [
    {
      question: 'Which is cheaper: SEO or Google Ads?',
      answer: 'At the start, Google Ads is often cheaper, because you pay only for clicks and can begin with a small budget. Over the long run, SEO usually wins, because clicks from organic results are free. Example: PLN 1,900 a month at our average cost per click of PLN 7.92 buys about 240 clicks from ads.',
    },
    {
      question: 'Which works faster?',
      answer: 'Google Ads. An ad starts running after approval, usually within one business day, while SEO shows the first visibility changes after 4–8 weeks, once Google recrawls the fixes and new content. For a new website or a seasonal service, it makes sense to start with ads and build SEO in parallel.',
    },
    {
      question: 'Do Google Ads improve SEO rankings?',
      answer: 'No. Google does not accept payment for higher positions in free results, and it displays ads separately. Ads help SEO indirectly: they show which keywords bring inquiries before you invest in content for them, and they hint at which headlines customers click.',
    },
    {
      question: 'Is Google Ads worth it for a small business?',
      answer: 'It is, when the cost of acquiring a customer is lower than the profit from that customer. Divide your budget by the cost per click, and multiply the number of clicks by the share of inquiries and sales. Without tracking inquiries in GA4 or Google Ads you cannot calculate this, so set it up before the campaign starts, not after.',
    },
    {
      question: 'How much does a click in Google Ads cost?',
      answer: 'As much as the auction dictates, so there is no single price list. In our campaign for keywords about website SEO, the average cost per click was PLN 7.92 (213 clicks for PLN 1,687.82, Sep 26 to Oct 11, 2026). Keyword Planner shows an average of approx. PLN 37 to 81 for keywords in this industry; our campaign had a bid cap of PLN 18.',
    },
    {
      question: 'What is the difference between SEO and SEM?',
      answer: 'SEO is part of SEM. SEM (search engine marketing) covers both SEO, meaning work on free results, and paid ads, such as Google Ads billed per click (PPC). That is why the question "SEO or SEM" usually means, in practice, "SEO or Google ads".',
    },
    {
      question: 'Is it worth paying for an ad on a keyword where I am already in the top 3?',
      answer: 'Sometimes: an ad above the organic result takes up more space and protects you from competitors bidding on your brand. Test it: switch the ad off for 2–4 weeks and compare the total number of clicks and inquiries from both sources in Search Console, Google Ads and GA4.',
    },
  ],
  sources: [
    { url: 'https://support.google.com/google-ads/answer/1722120?hl=pl', nazwa: 'Google Ads Help: ad review process (Polish-language page)', data: '2026-11-05' },
    { url: 'https://business.google.com/pl/resources/articles/google-ads-cost/', nazwa: 'Google: how much Google Ads costs (Polish-language page)', data: '2026-11-05' },
    { url: 'https://www.google.com/search/howsearchworks/', nazwa: 'Google: how Search works (no payment for positions in free results)', data: '2026-11-05' },
    { url: 'https://ads.google.com/home/tools/keyword-planner/', nazwa: 'Google Ads: Keyword Planner', data: '2026-11-04' },
    { url: 'https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-11-04/?format=json', nazwa: 'NBP (National Bank of Poland): average USD rate, table 215/A/NBP/2026 of Nov 4, 2026', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'EN copy of P3 from lib/porownania.js; internal sources as in the PL entry',
  ],
  aiQuestions: ['Q15'],
  cta: {
    tekst: 'Ask about an SEO audit (from PLN 1,490 (€350) net)',
    plan: null,
    linki: [
      { tekst: 'See how much SEO for your website costs', href: '/cennik-pozycjonowania' },
      { tekst: 'SEO audit in 3–5 days', href: '/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Search engine optimization' },
    { '@type': 'Thing', name: 'Google Ads' },
  ],
};

// --- P6 -----------------------------------------------------------------------------------------

export const P6_EN = {
  slug: 'jak-wybrac-agencje-seo',
  title: 'How to Choose an SEO Agency: 12 Questions Before You Sign',
  description: 'How to choose an SEO agency: 12 questions on reports, Google accounts, contract terms and AI measurement. Good answers and red flags, no guesswork.',
  h1: 'How to Choose an SEO Agency: 12 Questions to Ask Before You Sign',
  okruszek: 'How to choose an SEO agency',
  nazwaKarty: 'How to choose an SEO agency: 12 questions',
  teaser: 'What to ask an agency before signing, how to tell a concrete answer from a platitude and what 17 agencies we reviewed publish.',
  kryteria: '12 questions',
  decyzja: { pytanie: 'How do you vet an agency before signing a contract?', skrot: '12 questions: accounts, contract, reports and AI measurement' },
  tag: 'Agency selection guide',
  ujawnienie: 'We write as an SEO agency; we do not rate other companies by name.',
  zrodlaDanych: 'Data: service pages, price lists and terms of 17 SEO agencies (as of October 25, 2026), Google results (DataForSEO, Nov 4, 2026).',
  answer: 'Choose an SEO agency by what you can check before the contract: whether it shows a sample report or a portal demo, whether Google accounts, content and links stay yours, what the notice period is, whether it measures inquiries rather than rankings alone, and whether it states a price before a call. Below are 12 questions with good answers and red flags.',
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-12-pytan',
  tableCaption: '12 questions for an SEO agency: a good answer and a red flag',
  tablePrzypis: 'Compiled by AI SEO COMPANY from the contract terms and client complaints described in our market analysis of October 25, 2026, and from Google\'s guide "Do you need an SEO?".',
  columns: [
    { key: 'pytanie', label: 'Question for the agency' },
    { key: 'dobra', label: 'Good answer' },
    { key: 'flaga', label: 'Red flag' },
  ],
  rows: [
    { id: 'raport', pytanie: 'Will you show a sample report or a portal demo?', dobra: 'A report from a real month with client data hidden, or a portal demo without logging in', flaga: '"You will see the report after you sign the contract"' },
    { id: 'konta', pytanie: 'Whose accounts will Search Console, GA4, the Google Business Profile and the ad account be under?', dobra: 'Yours; the agency gets permissions only', flaga: 'Accounts created under the agency\'s email or its manager account' },
    { id: 'tresci-linki', pytanie: 'Who owns the content and links after the engagement ends?', dobra: 'Content is transferred to you in writing, links stay', flaga: 'Links "rented" for the term of the contract and removed when you leave' },
    { id: 'okres', pytanie: 'How long is the contract and what is the notice period?', dobra: 'A monthly or open-ended contract with a one-month notice period, no exit fees', flaga: '12–24 months with automatic renewal and a three-month notice period' },
    { id: 'pomiar', pytanie: 'What will you measure every month?', dobra: 'Inquiries from forms and calls and clicks from your own Search Console and GA4, alongside rankings', flaga: 'Only a list of rankings from the agency\'s tool' },
    { id: 'cena', pytanie: 'How much does it cost and what exactly does it include?', dobra: 'A price given before a call or in the offer together with the scope: keywords, content, links, hours', flaga: '"Price after a call" with no scope in the offer' },
    { id: 'frazy', pytanie: 'Which keywords will you report on or bill for?', dobra: 'A list of keywords with volume from Keyword Planner and queries from your own Search Console', flaga: 'Keywords without volume, or containing the company name, that reach the top 10 on their own' },
    { id: 'gwarancja', pytanie: 'Do you guarantee the first place in Google?', dobra: 'No; instead, a description of the work and how progress will be measured', flaga: 'A guarantee of "TOP 1" or of a position within 30 days' },
    { id: 'kto', pytanie: 'Who exactly will work on my website?', dobra: 'A named specialist and direct contact with them', flaga: 'Only a hotline, or an account manager changed without notice' },
    { id: 'zmiany', pytanie: 'What will you change on the website and will I approve it?', dobra: 'A list of changes before implementation, your approval and a work log', flaga: 'Changes made without notice and access to the site without agreed rules' },
    { id: 'ai', pytanie: 'How do you measure visibility in ChatGPT and AI Overviews?', dobra: 'A fixed list of questions, named models, measured weekly or monthly', flaga: 'A promise of "ChatGPT recommendations" with no measurement method' },
    { id: 'brak-postepu', pytanie: 'What happens if there is no progress after 3 months?', dobra: 'A goal written into the contract and a consequence, e.g. a change of plan or compensation', flaga: 'No goal and no way out before the end of the contract' },
  ],
  sections: [
    {
      id: 'pytania-do-agencji',
      h2: '12 Questions for an SEO Agency',
      html: '<p>Ask these questions in the first conversation or request written answers. A good agency will answer concretely and show a document, a report or a screenshot. Platitudes and promises without conditions are a signal to dig deeper or keep looking.</p>',
      tabela: 'glowna',
    },
    {
      id: 'co-sprawdzilismy',
      h2: 'What We Checked at 17 SEO Agencies: Price, Portal, Contract, AI',
      html: '<p>Before writing this guide, we reviewed the service pages, price lists, terms and directory profiles of 17 SEO agencies operating in Poland. We do not rate their quality and we do not give names: the numbers show what you can expect before you ask the first question.</p>',
      tabela: {
        id: 'tabela-17-agencji-wybor',
        caption: 'What SEO agencies publish: 4 numbers from a sample of 17 agencies (as of October 25, 2026)',
        columns: [{ key: 'cecha', label: 'What we checked' }, { key: 'liczba', label: 'Number of agencies out of 17' }],
        rows: [
          { id: 'cena', cecha: 'A "from" price or a price range on the website', liczba: '12' },
          { id: 'panel', cecha: 'A client portal with login', liczba: '4 (public demo without login: 0)' },
          { id: 'umowa', cecha: 'Notice period stated on the website', liczba: '6 (4 × about 1 month, 2 × 3 months)' },
          { id: 'ai', cecha: 'A separate AI visibility (GEO) service', liczba: '13' },
        ],
        przypis: 'Source: service pages, price lists, terms and general terms of 17 SEO agencies operating in Poland, and their directory profiles, checked on October 25, 2026 (compiled by AI SEO COMPANY). AI SEO COMPANY is not counted among the 17. We do not assess the quality of services.',
        minWidth: 420,
      },
      htmlPo: '<p>The takeaway: most agencies state a starting price and sell work on AI visibility, but only a minority publish their notice terms, and none of them lets you view its portal without logging in. That is why the questions in the table above are worth asking every agency, including one with a public price list.</p>',
    },
    {
      id: 'umowa',
      h2: 'The Contract: 6 Clauses That Protect Your Company',
      html: [
        '<ol>',
        '<li>An indefinite term, or a short initial period, and a notice period of no more than one month that you can send by email.</li>',
        '<li>No activation fees or early-exit fees, and if there are any, the amount written out explicitly.</li>',
        '<li>Search Console, GA4, the Google Business Profile, the ad account and the domain held by your company; the agency has permissions only.</li>',
        '<li>Transfer of copyright in the content to you. Under Polish law (articles 41 and 53 of the Copyright Act) this requires written form and covers only the fields of exploitation listed in the contract.</li>',
        '<li>Links gained during the engagement stay after it ends, and their list is part of the report.</li>',
        '<li>Scope of work and reporting: every month, a list of changes made and results from your own accounts.</li>',
        '</ol>',
        '<p>If the contract has a trial period, check what happens once it ends. On legal forums, clients describe contracts that, after a two-month trial, automatically turned into 12 months with no right to terminate.</p>',
        `<p>How to leave your current contract and what to take from the agency is covered in our guide to ${a(L('/zmiana-agencji-seo'), 'switching SEO agencies')}.</p>`,
      ].join(''),
      uwaga: 'This is not legal advice. For a high-value contract, have a lawyer review it.',
    },
    {
      id: 'raporty-i-konta',
      h2: 'Reports and Account Access',
      html: [
        '<p>A monthly report should answer three questions: what the agency did, what changed in the results and what it will do next month. The numbers should come from your own Search Console and GA4, not only from the agency\'s tool, because only then can you check them without intermediaries.</p>',
        '<p>In the report, look for inquiries from customers (forms, calls, emails), clicks from Google and a list of changes on the website. Keyword rankings alone, without traffic and inquiries, say little, especially when an AI Overview appears for the keyword.</p>',
        `<p>With us, this data is in the ${a(L('/panel-klienta'), 'client portal')}, and you can see how it works without logging in in the ${a(PANEL_DEMO_URL, 'portal demo')}.</p>`,
      ].join(''),
    },
    {
      id: 'ile-kosztuje',
      h2: 'How Much an SEO Agency Costs',
      html: [
        '<p>In our sample, 12 of 17 agencies state a "from" price or a range on their website. The lowest amount, PLN 490 (€115) net per month, applies to a package that covers only a Google Business Profile. According to an agency offer roundup published by NapoleonCat in September 2026, a typical SEO budget for a small or mid-sized company is PLN 2,000–3,500 per month.</p>',
        `<p>When comparing offers, check what exactly you get for that amount: how many keywords, articles and links per month, what the report looks like and what the notice period is. Our SEO Standard package costs PLN 1,900 (€450) net per month and includes up to 20 keywords, 2 pieces of content and 2 links a month; the other packages are in the ${a(L('/cennik-pozycjonowania'), 'SEO pricing')}.</p>`,
      ].join(''),
    },
    {
      id: 'agencja-czy-freelancer',
      h2: 'Agency or Freelancer',
      html: [
        '<p>A freelancer is sometimes cheaper. According to the Useme platform, the average SEO job settled through it in 2025 came to PLN 2,050. In Ahrefs\' global survey (439 providers, updated 08.2024), agencies charged an average of USD 3,209 per month and freelancers USD 1,349.</p>',
        '<p>Three things matter more than price: who steps in during the contractor\'s vacation or illness, whether accounts and data stay with you, and whether the contract and report are as concrete as at an agency. The questions in the table above work for either choice.</p>',
      ].join(''),
    },
    {
      id: 'jak-sprawdzic-agencje',
      h2: 'How to Vet an Agency in Google and in ChatGPT',
      html: [
        '<ul>',
        '<li>Reviews on Google Maps: how many there are, their dates and whether the agency responds to critical reviews.</li>',
        '<li>Profiles in business directories, e.g. Clutch, with reviews from clients whose identity can be verified.</li>',
        '<li>The agency\'s own visibility: whether its website shows up in results for the keywords it sells.</li>',
        '<li>AI answers: ask ChatGPT and Perplexity about the agency by name and see which pages they cite. If the agency sells AI visibility, ask for its own measurement.</li>',
        '</ul>',
        `<p>You can run the same test for your own company: the ${a(L('/sprawdz-widocznosc-w-ai'), 'free AI visibility checker')} shows whether ChatGPT mentions you in its answers.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Questions about choosing an SEO agency',
  faq: [
    {
      question: 'How much does an SEO agency cost?',
      answer: 'According to a roundup by kb.pl (price list from 2022, text from 2023), the smallest packages cost PLN 500–2,000 and mid-sized ones PLN 2,000–10,000 per month, so compare current price lists. Look at the scope, not the amount: the number of keywords, content and links per month, and the notice period. With us, packages start at PLN 1,900 (€450) net.',
    },
    {
      question: 'Which clauses in an SEO agency contract are dangerous?',
      answer: 'Watch out for contracts of 12–24 months with automatic renewal, a notice period longer than a month, links "rented" for the term of the contract, and the lack of a clause stating that Google accounts, content and links belong to you. Each of these makes it harder to switch agencies when results do not come.',
    },
    {
      question: 'Can an SEO agency guarantee the first place in Google?',
      answer: 'No. In its guide for website owners, Google says that no one can guarantee a first-place ranking. An agency can promise a scope of work, a measurement method and a report date. If an offer guarantees "TOP 1" or positions within 30 days, ask for which keywords and what happens if the result does not come.',
    },
    {
      question: 'How do I vet an SEO agency before signing a contract?',
      answer: 'Ask for a sample contract and a list of the accounts and data that will stay with you. Read the reviews on Google and Clutch, and ask ChatGPT about the agency by name to see which sources the model uses. A good agency will also show you what the first month of work looked like for a similar client.',
    },
    {
      question: 'Is it worth choosing an agency that also handles AI visibility?',
      answer: 'Yes, if your customers ask about services in ChatGPT or see an AI Overview in Google. In our sample, an AI Overview appeared above the results for 30 of 30 checked keywords (Google PL, Nov 4, 2026). Ask the agency how it measures AI visibility: how many questions, in which models and how often.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Do you need an SEO? (Polish-language page)', data: '2026-11-05' },
    { url: 'https://kb.pl/ceny/uslugi-biznesowe/cena-pozycjonowania-stron-www-zobacz-ile-kosztuje-pozycjonowanie-w-google/', nazwa: 'kb.pl: price of website SEO (price list from 2022, text from 2023; in Polish)', data: '2026-10-25' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: how much hiring an SEO agency costs (Sep 11, 2026; in Polish)', data: '2026-10-25' },
    { url: 'https://useme.com/pl/blog/ile-zaplacic-freelancerowi/', nazwa: 'Useme: how much to pay a freelancer (2025 settlement data; in Polish)', data: '2026-10-25' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO pricing (439 providers, updated 08.2024)', data: '2026-10-25' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Google results (Poland, desktop) for 30 SEO industry keywords', data: '2026-11-04' },
  ],
  zrodlaWewnetrzne: [
    'EN copy of P6 from lib/porownania.js; internal sources as in the PL entry',
  ],
  aiQuestions: ['Q10', 'Q11'],
  cta: {
    tekst: 'Send us the SEO agency offer you are considering. We will check it against the 12 questions on this page',
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'See our pricing and contract terms', href: '/cennik-pozycjonowania' }],
  },
  about: [{ '@type': 'Thing', name: 'Choosing an SEO agency' }],
};
