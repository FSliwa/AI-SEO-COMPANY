// EN twin of P4 (lib/porownania.p4.js): same slug (PL), row ids, section ids, tableId and facts.
// EN keyword: "seo agency vs freelancer" (Google Suggest chain, 9 variants; exact volume below the
// tool threshold in frazy-en.csv), so this page is a low-volume twin. The integrator may leave it
// unregistered (then /en stays without this address). Internal links via hrefWJezyku.

import { hrefWJezyku, hrefWJezykuJesliOpublikowana } from './linkiEn';
import { PANEL_DEMO_URL } from './panel';
import { MODEL_P4 } from './porownania.p4';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const L = (plPath) => hrefWJezyku(plPath, 'en');

function zdanieJesli(plHref, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(plHref, 'en');
  return h ? zdanie(h) : '';
}

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const hrs = (n) => String(Math.round(n * 10) / 10);
const wierszeGodzin = MODEL_P4.pakiety.map((p) => ({
  id: `godziny-${p.cena}`,
  budzet: `PLN ${fmt(p.cena)} net (${p.nazwa})`,
  s150: `${hrs(p.cena / 150)} h`,
  s250: `${hrs(p.cena / 250)} h`,
  s400: `${hrs(p.cena / 400)} h`,
  fraza: `PLN ${Math.round(p.cena / p.frazy)} net per keyword (up to ${p.frazy} keywords, ${p.tresci} content pieces and ${p.linki} links a month)`,
}));

export const P4_EN = {
  slug: 'agencja-seo-czy-freelancer',
  title: 'SEO Agency vs Freelancer: Costs, Risks and Contract Terms',
  description: 'SEO agency vs freelancer: monthly cost, hours of work, cover for absences, Google account ownership and contract terms. A table with sources.',
  h1: 'SEO Agency vs Freelancer: Costs, Risks and Contract Terms',
  okruszek: 'SEO agency vs freelancer',
  nazwaKarty: 'SEO agency vs freelancer',
  teaser: 'How many hours a monthly budget buys, who covers when the specialist is away and what to put in the contract so the Google accounts stay yours.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'SEO agency or freelancer?', skrot: 'Cost, hours, cover, accounts and contract' },
  tag: 'SEO provider comparison',
  ujawnienie: 'SEO agency vs freelancer: we write as an SEO agency, so we also say when a freelancer is the better choice. We do not rate specific people or companies.',
  zrodlaDanych: 'Data: NapoleonCat price and engagement-model overview (Sep 11, 2026, Poland), Useme (2025 orders), Ahrefs (439 providers, Aug 2024), our price list. As of November 18, 2026.',
  answer: 'A freelance SEO is often cheaper and gives you direct contact with the person doing the work. An agency offers a wider team and a regular report; cover for absences depends on the contract. For a narrow scope and a small budget a freelancer is often enough, while for content, links and technical SEO at once a team wins. Either way, keep the Google accounts in your company\'s name.',
  published: '2026-11-18',
  updated: '2026-11-18',
  tableId: 'tabela-agencja-freelancer',
  tableCaption: 'Freelance SEO and SEO agency compared on 8 criteria',
  tablePrzypis: 'Sources: the "agency, freelancer or in-house" overview in NapoleonCat\'s article of Sep 11, 2026 (net amounts, small and medium businesses; Polish market), Google Search Central guidance, our SEO pricing page (Nov 18, 2026). The descriptions are general: a specific offer can differ, which is why the last row lists questions to put to anyone.',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'freelancer', label: 'Freelance SEO' },
    { key: 'agencja', label: 'SEO agency' },
  ],
  rows: [
    { id: 'koszt', kryterium: 'Monthly cost (net)', freelancer: 'PLN 1,000-8,000 according to NapoleonCat; usually lower for the same scope', agencja: 'PLN 800-15,000 according to NapoleonCat. Ours: from PLN 1,900 (€450) and PLN 2,500 (€590)' },
    { id: 'kto', kryterium: 'Who works on your site', freelancer: 'The same person you talk to', agencja: 'Depends on the agency: agree who exactly works on your site' },
    { id: 'zastepstwo', kryterium: 'Holiday, illness, provider disappears', freelancer: 'Work stops unless the contract names a substitute', agencja: 'Cover depends on the contract: ask who takes over and on what terms' },
    { id: 'kompetencje', kryterium: 'Range of skills', freelancer: 'Narrow but deep: one niche or one skill', agencja: 'Broad: technical SEO, content, links, local SEO and AI visibility in one team' },
    { id: 'skala', kryterium: 'Project size', freelancer: 'Small and medium sites; a very large site exceeds what one person can handle', agencja: 'A wider team and a split of tasks (technical, content, links); scope agreed at quoting' },
    { id: 'raport', kryterium: 'Reporting', freelancer: 'Depends on the person: ask for a sample report before signing', agencja: 'With us: a client portal with data from your own Search Console and a monthly report' },
    { id: 'umowa', kryterium: 'Contract and exit', freelancer: 'Usually flexible; agree notice and the hand-over of access in writing', agencja: 'Varies; with us a monthly contract (Booster Pack: 3 months minimum) and Search Console and Analytics access stays with you' },
    { id: 'pytania', kryterium: 'Questions to ask anyone', freelancer: 'Who covers for you? Will the accounts be in my company\'s name? Can you show a report and references?', agencja: 'The same questions; a good agency answers each in writing' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'SEO agency vs freelancer: 8 criteria in one table',
      html: '<p>The choice is not only about price. The table shows what changes when one person works on your site instead of a team, and what we ourselves state. Amounts are net, and the ranges come from a public overview, not from our offers.</p>',
      tabela: 'glowna',
    },
    {
      id: 'ile-godzin',
      h2: 'How many hours of work a monthly budget buys',
      html: '<p>Freelancers often bill by the hour, agencies by scope. To compare them, we converted our two packages into hours at three hourly rates for an SEO specialist: PLN 150, 250 and 400 net. PLN 150 and 400 net are the limits of the range in NapoleonCat\'s price list (hourly rate of a specialist, PLN 150-400), and PLN 250 is an intermediate value we chose as a scenario. It is not the rate of any particular freelancer, so treat these figures as scenarios, not as an offer. The PLN 400 rate is the upper scenario: freelancers usually charge less, so the same budget buys more of their hours.</p>',
      tabela: {
        id: 'tabela-godziny',
        caption: 'Hours of specialist work that fit a budget equal to our packages (net amounts)',
        columns: [
          { key: 'budzet', label: 'Monthly budget' },
          { key: 's150', label: 'At PLN 150/h' },
          { key: 's250', label: 'At PLN 250/h' },
          { key: 's400', label: 'At PLN 400/h' },
          { key: 'fraza', label: 'Our scope and price per keyword' },
        ],
        rows: wierszeGodzin,
        przypis: 'Our own calculation: budget divided by the hourly rate. Rates of PLN 150-400 net per hour for a specialist: NapoleonCat, Sep 11, 2026 (price list in the article). Packages, keyword, content and link counts: our SEO pricing page, Nov 18, 2026. Price per keyword = package price divided by the maximum number of keywords.',
        minWidth: 620,
      },
      htmlPo: [
        '<p>Assumptions: net amounts, one month, the whole budget goes into work on the site, no separate tool costs. We do not sell hours, we sell scope: up to 20 keywords, 2 content pieces and 2 links a month in SEO Standard, and up to 50 keywords, 4 content pieces and 4 links in SEO Premium, with a technical audit, local SEO and a report included. So we do not state how many hours our team spends on your site.</p>',
        '<p>How to use this: ask a freelancer to break the same scope into hours (audit, texts, links, report). If 2 content pieces, 2 links and a monthly report do not fit in the hours of the offer, the price difference is only apparent. If they fit and the rate is lower, the freelancer is cheaper, and that is the honest answer.</p>',
      ].join(''),
    },
    {
      id: 'stawki-ze-zrodel',
      h2: 'What published freelancer and agency rates say',
      html: '<p>Polish overviews of rates for freelance SEOs only are scarce, so next to national data we give one global survey. Markets and currencies differ, so we neither add nor convert figures from different sources.</p>',
      tabela: {
        id: 'tabela-stawki-zrodla',
        caption: 'Published SEO rates: freelancers and agencies (as of November 18, 2026)',
        columns: [
          { key: 'zrodlo', label: 'Source and scope' },
          { key: 'freelancer', label: 'Freelancer' },
          { key: 'agencja', label: 'Agency' },
        ],
        rows: [
          { id: 'napoleoncat', zrodlo: 'NapoleonCat, Poland, Sep 11, 2026: monthly, net', freelancer: 'PLN 1,000-8,000', agencja: 'PLN 800-15,000' },
          { id: 'useme', zrodlo: 'Useme, Poland, orders settled in 2025: average value of an SEO order', freelancer: 'PLN 2,050 per order', agencja: 'no data' },
          { id: 'ahrefs-mies', zrodlo: 'Ahrefs, global, 439 providers, updated Aug 15, 2024: average monthly retainer', freelancer: 'USD 1,349', agencja: 'USD 3,209' },
          { id: 'ahrefs-godz', zrodlo: 'Ahrefs, global, as above: average hourly rate', freelancer: 'USD 71.59', agencja: 'USD 98.90' },
        ],
        przypis: 'Sources: NapoleonCat (article of Sep 11, 2026), Useme (blog, 2025 settlement data), Ahrefs (SEO pricing, updated Aug 15, 2024), read Nov 18, 2026. Ahrefs gives survey averages and, for retainers, assumes the top of the range each respondent picked. Useme gives no value for agencies.',
        minWidth: 480,
      },
      htmlPo: [
        '<p>The common conclusion: a freelancer is cheaper, but how much cheaper depends on the market. In Ahrefs data the average freelancer hourly rate is about 72% of the agency rate and the average retainer about 42%. NapoleonCat\'s ranges overlap widely, so a cheap team and an expensive freelancer are both entirely possible.</p>',
        '<p>Compare net with net. If you do not deduct VAT, check whether the provider is a VAT payer, because it changes the final cost.</p>',
      ].join(''),
    },
    {
      id: 'kiedy-freelancer',
      h2: 'When a freelance SEO is the better choice',
      html: [
        '<ul>',
        '<li><strong>One task instead of ongoing work:</strong> an audit, fixing technical errors, setting up Search Console and GA4, or a one-off content plan. You pay for the result, not for a team on standby.</li>',
        '<li><strong>A narrow niche:</strong> NapoleonCat points to markets such as SaaS and B2B with long sales cycles, where deep knowledge of one topic counts.</li>',
        '<li><strong>A budget below an agency minimum:</strong> our cheapest SEO package is PLN 1,900 net a month. If that is too much, a freelancer or your own input on content can be a more sensible start.</li>',
        '<li><strong>You have a marketer in-house:</strong> an SEO consultant for a few hours a month is enough when the execution stays with you.</li>',
        '<li><strong>You want one steady contact:</strong> no account manager and no hand-offs between people.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'kiedy-agencja',
      h2: 'When an agency works better',
      html: [
        '<ul>',
        '<li><strong>You need several skills at once:</strong> technical SEO, content, links, a Google Business Profile and measuring visibility in ChatGPT rarely fit in one person\'s head.</li>',
        '<li><strong>Continuity matters:</strong> when the specialist is on holiday or ill, cover depends on the contract, so ask who takes over and on what terms.</li>',
        '<li><strong>You want a steady report and a view of the data:</strong> in our client portal you see clicks and impressions from Search Console, keyword positions and a log of work, and you can open the demo without logging in.</li>',
        '<li><strong>The site is large or needs several specialists at once:</strong> one person cannot handle a very large site, as NapoleonCat also notes.</li>',
        '</ul>',
        `<p>See the ${a(PANEL_DEMO_URL, 'client portal demo')} and the scope of the packages on the ${a(L('/cennik-pozycjonowania'), 'SEO pricing page')}.</p>`,
      ].join(''),
    },
    {
      id: 'umowa-i-dostep',
      h2: 'Contract and account access: 6 terms for either choice',
      html: [
        '<p>These terms protect you equally with a freelancer and with an agency. Google reminds site owners that you remain responsible for the actions of any company you hire, so the scope of work should be clear before the start.</p>',
        '<ol>',
        '<li>Search Console, GA4, the Google Business Profile and the domain are in your company\'s name; the provider gets permissions only, and for an audit read-only access is enough.</li>',
        '<li>A substitute for absences, or a clause on who takes over if the provider stops responding.</li>',
        '<li>Notice of about a month, no exit penalties and no automatic one-year renewal.</li>',
        '<li>Rights to the content pass to you in writing, and links earned during the engagement stay.</li>',
        '<li>A monthly report from your own accounts: a list of site changes, client inquiries and clicks from Google, not rankings alone.</li>',
        '<li>Scope described by a number of keywords, content pieces and links, or hours, so there is something to measure.</li>',
        '</ol>',
        zdanieJesli('/porownania/jak-wybrac-agencje-seo', (h) => `<p>A longer list of questions is in our guide on ${a(h, 'how to choose an SEO agency')}, and if you are replacing your current provider, see ${a(L('/zmiana-agencji-seo'), 'changing your SEO agency')}.</p>`) || `<p>If you are replacing your current provider, see ${a(L('/zmiana-agencji-seo'), 'changing your SEO agency')}.</p>`,
      ].join(''),
      uwaga: 'This is not legal advice. For a contract of significant value, show it to a lawyer.',
    },
    {
      id: 'jak-sprawdzic-freelancera',
      h2: 'How to vet a freelance SEO before you hire',
      html: [
        '<p>Google advises asking for examples of past work and checking references with previous clients. In practice:</p>',
        '<ul>',
        '<li>Ask for 2-3 references and call one of them. Ask about deadlines, reports and results, not about personality.</li>',
        '<li>Ask for a sample report with client data hidden and check that the numbers come from Search Console, not only from the provider\'s tool.</li>',
        '<li>Ask about guarantees. No one can guarantee a top spot on Google, so "number one in 30 days" is a warning sign for a freelancer too.</li>',
        '<li>Find out what they will change on your site and agree that the list of changes comes to you before it goes live.</li>',
        '<li>The city matters less than references: when looking for a freelance SEO in Warsaw or any other city, compare experience in your industry, not the address.</li>',
        '</ul>',
        zdanieJesli('/porownania/pozycjonowanie-za-efekt-czy-abonament', (h) => `<p>If you are weighing pay-for-results against a monthly retainer, read our comparison of ${a(h, 'pay-per-result and retainer SEO')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about freelance SEO and agencies',
  faq: [
    {
      question: 'How much does a freelance SEO cost compared with an agency?',
      answer: 'According to NapoleonCat\'s overview of Sep 11, 2026, a freelance SEO in Poland costs PLN 1,000-8,000 net a month and an agency PLN 800-15,000. The ranges overlap a lot, so compare scope: keywords, content pieces and links, or hours. Ours: SEO Standard is PLN 1,900 net a month and SEO Premium PLN 2,500.',
    },
    {
      question: 'Is a freelancer better than an SEO agency?',
      answer: 'Sometimes: for one task, a narrow niche, a small budget, or when you want steady contact with one person. An agency wins when you need several skills at once, a regular report and cover agreed in the contract. There is no single answer, only a fit to your scope.',
    },
    {
      question: 'What happens to my SEO if the freelancer gets ill or disappears?',
      answer: 'Work usually stops because no one can take it over. Protect yourself before signing: Search Console, GA4 and the Google Business Profile in your company\'s name, a clause on a substitute and a record of the changes made. Then a new provider can take over without starting from zero.',
    },
    {
      question: 'How do I vet a freelance SEO before hiring?',
      answer: 'Ask for examples of work and references, as Google advises, and for a sample report. Ask what they will change on your site, and do not trust promises of a top spot on Google, because no one can guarantee one. A good freelancer answers these questions in writing.',
    },
    {
      question: 'Can I combine a freelancer and an agency?',
      answer: 'Yes. A common setup is a freelancer for one task, such as an audit or content, and an agency or an in-house team for the rest. Agree who has access to Search Console and who approves site changes, so nobody overwrites anyone else\'s work.',
    },
  ],
  sources: [
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: cost of hiring an SEO agency (Sep 11, 2026; Polish-language article), section "Agency, freelancer or in-house"', data: '2026-11-18' },
    { url: 'https://useme.com/pl/blog/ile-zaplacic-freelancerowi/', nazwa: 'Useme: how much to pay a freelancer (2025 settlement data; Polish-language article)', data: '2026-11-18' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO pricing (439 providers, updated Aug 15, 2024)', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO professional?', data: '2026-11-18' },
  ],
  zrodlaWewnetrzne: [
    'lib/porownania.p4.js (PL twin; same figures, MODEL_P4 shared)',
    'frazy-en.csv: "seo agency vs freelancer" only in Google Suggest (volume below threshold); neighbours "seo consultant freelancer" 390/1000 mapped to /en/seo-services, "seo freelance rates" 90 mapped to /en/seo-pricing: not targeted here (one cluster = one URL)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Have an SEO agency offer? Send it and we will review the scope, hours and contract',
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'See our SEO pricing', href: '/cennik-pozycjonowania' }],
  },
  about: [{ '@type': 'Thing', name: 'Choosing an SEO provider: agency or freelancer' }],
};
