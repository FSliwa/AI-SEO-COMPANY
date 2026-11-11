// Wersja angielska silnika porównań (9.11.2026): HUB_EN, akapitMetodyHubaEn(), P1_EN, P2_EN.
// P3_EN i P6_EN są w lib/porownania.en.b.js (osobny plik, ten sam kształt co P3 i P6 z lib/porownania.js).
// Kształt obiektów, slug (= slug PL), id sekcji i tableId są takie same jak w lib/porownania.js:
// strona EN dostaje te same kotwice, a liczby i źródła pochodzą z tych samych danych (POMIAR_AIO).
// Linki w HTML: hrefWJezyku / hrefWJezykuJesliOpublikowana z lib/linkiEn.js (null = zdanie bez linku).
// Checklista PDF: ChecklistForm sam wybiera język (useLocale), więc pole `checklista` jest takie samo jak w PL.

import { POMIAR_AIO, HUB, porownania, porownanieBySlug, akapitMetodyHuba } from './porownania';
import { hrefWJezyku, hrefWJezykuJesliOpublikowana } from './linkiEn';
import { hrefJesliOpublikowana } from './publikacja';
import { PANEL_DEMO_URL } from './panel';
import { CHECKLIST_COUNT } from './agencySwitch';
import { P3_EN, P6_EN } from './porownania.en.b';

const L = 'en';

// --- Pomocnicze ------------------------------------------------------------------------------

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const ax = (href, tekst) => `<a href="${href}" rel="noopener">${tekst}</a>`;
/** Link wewnętrzny z ścieżki PL (z kotwicą); null z hrefWJezyku nie występuje dla znanych stron. */
const wew = (sciezkaPl, tekst) => a(hrefWJezyku(sciezkaPl, L) || sciezkaPl, tekst);

/** Zdanie z linkiem do strony z rejestru publikacji albo '' (strona jeszcze nie zwraca 200). */
function zdanieJesli(sciezkaPl, zdanie) {
  const h = hrefWJezykuJesliOpublikowana(sciezkaPl, L);
  return h ? zdanie(h) : '';
}

const liczba = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const pln = (n) => `PLN ${liczba(n)}`;

const MIESIACE_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** 'RRRR-MM-DD' -> 'November 4, 2026'. */
export function dataEn(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${MIESIACE_EN[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : iso;
}

function tekstPomiaru(p) {
  const kiedy = p.typ === 'mediana'
    ? `On ${p.daty.map(dataEn).join(', ')}, we checked`
    : `On ${dataEn(p.daty[0])}, we checked`;
  const wynik = p.typ === 'mediana'
    ? `Median of ${p.daty.length} measurements: of ${liczba(p.cytowan)} citations (${p.domen} domains), only ${p.wTop10}, or ${p.procent}% (range ${p.zakresProcent}%), came from domains in the top 10.`
    : `Of ${liczba(p.cytowan)} citations (${p.domen} domains), only ${p.wTop10}, or ${p.procent}%, came from domains in the top 10.`;
  return `${kiedy} ${p.frazSprawdzonych} keywords from our industry in Google (Poland, desktop, DataForSEO data). An AI Overview appeared for ${p.frazZPrzegladem === p.frazSprawdzonych ? 'all of them' : p.frazZPrzegladem}. For ${p.frazPorownanych} of them, we compared its sources with the first ten organic results. ${wynik} A high ranking helps, but it is not enough.`;
}

function zastrzezeniePomiaru(p) {
  const kiedy = p.typ === 'mediana'
    ? `Median of ${p.daty.length} measurements (${p.daty.map(dataEn).join(', ')}), one location and one device.`
    : `One measurement (${dataEn(p.daty[0])}), one location and one device.`;
  return `${kiedy} Google results and AI Overviews change from day to day. We update this monthly.`;
}

// --- Hub /en/comparisons ---------------------------------------------------------------------

const P3_OPUBLIKOWANE = () => Boolean(hrefJesliOpublikowana('/porownania/seo-czy-google-ads'));

export const HUB_EN = {
  sciezka: '/porownania',
  title: 'SEO comparisons before you choose an agency or a pricing model',
  get description() {
    return P3_OPUBLIKOWANE()
      ? 'SEO comparisons with data and sources: pay for results or a monthly retainer, SEO or GEO, SEO or Google Ads. With an update date, no guesswork.'
      : 'Pay for results or a monthly retainer, SEO or GEO: comparisons with data, sources and an update date. No guesswork.';
  },
  h1: 'SEO comparisons before you choose an agency or a pricing model',
  get lead() {
    return P3_OPUBLIKOWANE()
      ? 'Before you sign with an SEO agency, it is worth settling three things: how you will pay, which channels to invest in, and whether visibility in ChatGPT now matters alongside Google. Every comparison below has a table, sources and an update date. We are an SEO agency, so in each comparison we say plainly what we sell ourselves.'
      : 'Before you sign with an SEO agency, it is worth settling two things: how you will pay, and whether visibility in ChatGPT now matters alongside Google. Every comparison below has a table, sources and an update date. We are an SEO agency, so in each comparison we say plainly what we sell ourselves.';
  },
  published: '2026-11-06',
  updated: '2026-11-06',
  cta: { tekst: 'Have an offer from another agency? We will compare it with ours within 24 business hours', plan: 'przeglad-agencji' },
};

/** Akapit metody huba (odpowiednik akapitMetodyHuba z lib/porownania.js). */
export function akapitMetodyHubaEn() {
  const zrodla = ['agency price lists and terms', 'Google results collected through DataForSEO', 'our own tests of AI model answers'];
  if (hrefJesliOpublikowana('/porownania/seo-czy-google-ads')) zrodla.push('data from our own Google Ads campaign');
  const lista = `${zrodla.slice(0, -1).join(', ')} and ${zrodla[zrodla.length - 1]}`;
  return `Every comparison is built from data you can check: ${lista}. Under each table we give the source and the date. We do not award stars or quality ratings, and we do not compare ourselves with named agencies. We refresh the data at least once a quarter, and you can see the update date on every comparison.`;
}

// --- P1: pay for results or a monthly retainer ------------------------------------------------

const P1_EN = {
  slug: 'pozycjonowanie-za-efekt-czy-abonament',
  title: 'Pay-for-results SEO or a monthly retainer? 2026 comparison',
  description: 'Pay-for-results SEO versus a monthly retainer: what you pay for, which risks you carry and when each model makes sense. With a decision table.',
  h1: 'Pay-for-results SEO or a monthly retainer: which one to choose in 2026?',
  okruszek: 'Pay for results or a retainer',
  nazwaKarty: 'Pay-for-results SEO or a monthly retainer',
  teaser: 'How many agencies in Poland charge for results, what each model costs for 20 keywords, and which contract clauses to check before you sign.',
  kryteria: '10 criteria',
  decyzja: { pytanie: 'Pay an agency for rankings or for work?', skrot: 'Pay for results lowers the cost of getting started; a retainer covers the whole service' },
  tag: 'Pricing model comparison',
  zrodlaDanych: 'Data: price lists, terms and service descriptions of 17 SEO agencies in Poland (as of October 25, 2026), Google results collected through DataForSEO (November 4–5, 2026).',
  answer: 'For most small and mid-sized businesses, a retainer or a hybrid model is the better choice. Pay-for-results pricing lowers the cost at the start, but you pay for the rankings of the keywords in the contract, not for inquiries from customers, and the bill grows with the results. Of the 17 agencies we checked, 5 make part of the fee depend on results, 11 do not, and one does not state its model.',
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-10-kryteriow',
  tableCaption: 'Pay-for-results SEO, retainer and hybrid model compared on 10 criteria (as of November 2026)',
  tablePrzypis: 'Source: AI SEO COMPANY analysis based on the price lists and terms of 17 SEO agencies in Poland (as of October 25, 2026).',
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'efekt', label: 'Pay for results' },
    { key: 'abonament', label: 'Retainer' },
    { key: 'mieszany', label: 'Hybrid model' },
  ],
  rows: [
    { kryterium: 'What you pay for', efekt: 'For results: most often days or months with keywords in the top 10, less often traffic or conversions; usually alongside a fixed fee', abonament: 'For an agreed scope of work: audit, technical fixes, content, links, business profile', mieszany: 'A fixed fee for the work plus a bonus for an agreed result' },
    { kryterium: 'Who picks the keywords', efekt: 'Usually the agency proposes a list for the contract; risk of keywords with little demand', abonament: 'You choose together and change them along the way', mieszany: 'Bonus-linked targets in the contract, the rest flexible' },
    { kryterium: 'Cost when results grow', efekt: 'Grows with the number of keywords in the top 10, up to a cap if the contract has one', abonament: 'Fixed', mieszany: 'Fixed + bonus with a cap' },
    { kryterium: 'Cost when there are no results', efekt: 'Low: the fixed fee, if there is one', abonament: 'Full', mieszany: 'The fixed fee' },
    { kryterium: 'Scope of work', efekt: 'Focused on the keywords in the contract', abonament: 'The whole service: technical work, content, links, business profile', mieszany: 'The whole service, with emphasis on the bonus-linked targets' },
    { kryterium: 'Measurement', efekt: "Position in the agency's tool; the result depends on location and device", abonament: 'Work report + KPIs: traffic, inquiries', mieszany: 'KPIs from your own accounts (Search Console, GA4) written into the contract' },
    { kryterium: 'Contract', efekt: 'In our sample, also 12+ month contracts at low budgets', abonament: 'From monthly to 36 months; 1–3 months notice, where the agency publishes it', mieszany: 'Same as a retainer' },
    { kryterium: 'AI visibility (ChatGPT, AI Overviews)', efekt: 'Outside the billing: what counts is the position in regular results', abonament: 'Can be part of the scope (for example weekly measurement)', mieszany: 'Can be one of the targets' },
    { kryterium: 'What you keep after the contract ends', efekt: 'Depends on the contract; in our sample, one agency keeps links only for the duration of the contract', abonament: 'Depends on the contract: check the clause on content, links and accounts', mieszany: 'Same as a retainer' },
    { kryterium: 'Who it suits', efekt: 'A local business with a few keywords of known value that wants to limit the risk of getting started', abonament: 'A business that develops the whole site and measures inquiries', mieszany: 'A business that wants a predictable cost and a shared goal with the agency' },
  ],
  sections: [
    {
      id: 'czym-sie-roznia',
      h2: 'How the two models differ',
      html: [
        '<p>With <strong>pay-for-results pricing</strong> you pay for an achieved result, most often for keywords that are on the first page of Google on the day of measurement. There is usually a fixed fee alongside it. In Polish offers, the phrases „płatność za efekt” and „pozycjonowanie za efekty” both mean the same thing.</p>',
        '<p>With a <strong>retainer</strong> you pay a fixed amount for an agreed scope of work: an audit, technical fixes, content, links and management of your Google Business Profile. The amount does not depend on how many keywords rank high in a given month.</p>',
        '<p>A <strong>hybrid model</strong> combines the two: a fixed fee covers the work, and a bonus or compensation depends on a target written into the contract. The difference between the models comes down to who carries the risk at the start and what exactly ends up on the invoice.</p>',
      ].join(''),
      h3: [
        {
          id: 'co-to-jest-efekt',
          h3: 'What agencies call a "result"',
          html: [
            '<p>A "result" in a contract can mean three different things:</p>',
            '<ul><li>the position of a keyword in the top ten or top three, counted for every day or based on the status on one day of the month;</li><li>traffic from free search results;</li><li>conversions, meaning forms, phone calls or purchases.</li></ul>',
            '<p>In our sample of 17 agencies, both variants with a fixed fee exist: a surcharge for every day a keyword is in the top 10, with a monthly cap, and a fixed base plus a fee for conversions whose value is agreed before the start. Outside the sample, we came across an offer in which the position is checked once a month, on the last business day. Before you sign, ask whether the position is counted daily or from a single day, who measures it and from which location.</p>',
          ].join(''),
        },
      ],
    },
    {
      id: 'porownanie-10-kryteriow',
      h2: 'Pay-for-results SEO or a retainer: 10 criteria compared',
      tabela: 'glowna',
      htmlPo: [
        '<p>Pay-for-results pricing shifts the risk of getting started to the agency: until your keywords are on the first page, you pay little or nothing. A retainer shifts a different risk to you, that of weak work you pay for at the same rate as good work.</p>',
        '<p>That is why two things matter most in both models: measurement from your own accounts (Search Console, GA4) and a contract that lets you leave when results do not come.</p>',
      ].join(''),
    },
    {
      id: 'jak-rozliczaja-sie-agencje',
      h2: 'How agencies in Poland charge: 17 offers',
      html: '<p>We checked the price lists, terms and service descriptions of 17 SEO agencies operating in Poland (as of October 25, 2026). 11 of them bill without a pay-for-results component (retainer, hour bank or project), five make part of the fee depend on results – in four of the described cases alongside a fixed fee – and one does not state its billing model. The "you pay only for keywords on page 1" model exists, but outside our sample: among Google results for the phrase „pozycjonowanie za efekt” (pay-for-results SEO) on November 5, 2026, there was an offer of PLN 99 or PLN 149 net per month per keyword, billed by the position on the last business day of the month. Only 6 of the 17 agencies publish a notice period: four state about one month, two state three months.</p>',
      tabela: {
        id: 'tabela-17-agencji',
        caption: 'Billing models and terms of 17 SEO agencies in Poland (as of October 25, 2026)',
        columns: [{ key: 'cecha', label: 'Feature' }, { key: 'liczba', label: 'Number of agencies out of 17' }],
        rows: [
          { cecha: 'Bills without a pay-for-results component (retainer, hour bank, project)', liczba: '11' },
          { cecha: 'Makes part of the fee depend on results (pay for results, success fee, KPIs)', liczba: '5' },
          { cecha: '…of which a described fixed fee + variable part', liczba: '4' },
          { cecha: 'Does not state a billing model', liczba: '1' },
          { cecha: 'Publicly criticizes or rejects billing by position', liczba: 'at least 6' },
          { cecha: 'Publishes a "from" price or a price range', liczba: '12' },
          { cecha: 'Publishes a notice period', liczba: '6 (4 × about 1 month, 2 × 3 months)' },
        ],
        przypis: 'Method: agency offer pages, price lists, terms of service and directory profiles, checked on October 25, 2026. We do not rate service quality. We are one of the agencies on the market: AI SEO COMPANY is not counted among the 17.',
        minWidth: 420,
      },
      htmlPo: '<p>The sample: 7 large agencies from the top ten Google results for the phrase „agencja seo” (SEO agency), 3 brands of one capital group, 3 agencies that sell AI search optimization most aggressively, 2 companies closest to us in their cooperation model and 2 leaders of Google Maps results in Warsaw.</p>',
    },
    {
      id: 'koszt-20-fraz',
      h2: 'What each model costs: an example for 20 keywords',
      html: [
        '<p>We calculate the cost of the pay-for-results model with a formula: cost = S + n × s, where S is the fixed fee, n is the number of contract keywords on the first page of Google on the day of measurement, and s is the rate per keyword. A retainer is a fixed amount A. The assumptions of the example:</p>',
        '<ul>',
        '<li>pure pay-for-results model: S = PLN 0, s = PLN 99 or PLN 149 net per month per keyword (an offer from the top ten Google results for the phrase „pozycjonowanie za efekt”, checked on November 5, 2026; minimum 4 keywords, measured on the last business day of the month);</li>',
        '<li>hybrid model: S = PLN 300, s = PLN 100 (an illustration; a fixed fee of PLN 300 appears in a published example from one of the agencies in our sample);</li>',
        `<li>retainer: A = ${pln(1900)} net, which is our SEO Standard package (up to 20 keywords, 2 pieces of content and 2 links per month).</li>`,
        '</ul>',
      ].join(''),
      tabela: {
        id: 'tabela-koszt-20-fraz',
        caption: 'Monthly SEO cost depending on the number of keywords on page 1 of Google (PLN net, as of November 2026)',
        columns: [
          { key: 'n', label: 'Keywords on page 1 (n)' },
          { key: 'e99', label: 'Pay for results, PLN 99 per keyword' },
          { key: 'e149', label: 'Pay for results, PLN 149 per keyword' },
          { key: 'mix', label: 'Hybrid: PLN 300 + PLN 100 per keyword (illustration)' },
          { key: 'abo', label: 'SEO Standard retainer at AI SEO COMPANY (PLN 1,900 (€450) net, fixed amount)' },
        ],
        rows: [0, 4, 6, 10, 13, 16, 20].map((n) => ({
          id: `n-${n}`,
          n: String(n),
          e99: pln(n * 99),
          e149: pln(n * 149),
          mix: pln(300 + n * 100),
          abo: pln(1900),
        })),
        przypis: 'The models cover different scopes of work. The rates of PLN 99 and PLN 149 per keyword and the PLN 499 flat fee come from an offer checked on November 5, 2026.',
      },
      h3: [
        {
          id: 'prog-oplacalnosci',
          h3: 'Break-even point: when pay for results costs more',
          html: '<p>The pay-for-results model is cheaper than a retainer as long as S + n × s &lt; A. At PLN 99 per keyword and a PLN 1,900 retainer, the break-even point is 19 keywords on page 1; at PLN 149 per keyword it is 12; and in the hybrid model with a PLN 300 fixed fee and a PLN 100 rate it is 16. Above the break-even point you pay more than under a retainer, and the agency still works only on the keywords in the contract. The same provider that charges PLN 99 or PLN 149 per keyword also offers a fixed fee of PLN 499 per month, so with that provider pay for results already costs more at 6 or 4 keywords. That is why, in the pay-for-results model, you should watch for a monthly cap.</p>',
        },
      ],
    },
    {
      id: 'pozycja-to-nie-klikniecia',
      h2: 'A ranking is not clicks: what AI Overviews change',
      html: [
        '<p>A position in the top ten does not guarantee traffic. On November 4, 2026, we checked 30 keywords from the SEO industry (Google, Poland, desktop, DataForSEO data): for every one of them, Google showed an AI Overview with a ready answer and its own list of sources. A customer can therefore get an answer before clicking any result. That is why it is better to bill inquiries from customers than keyword positions in the contract.</p>',
        zdanieJesli('/porownania/seo-vs-geo', (h) => `<p>How work on being present in such answers differs from classic SEO is described in the comparison ${a(h, 'SEO vs GEO')}.</p>`),
        zdanieJesli('/porownania/seo-czy-google-ads', (h) => `<p>If you are considering ads instead of SEO, see the comparison ${a(h, 'SEO or Google Ads')}.</p>`),
      ].join(''),
    },
    {
      id: 'kiedy-za-efekt',
      h2: 'When to choose pay-for-results pricing',
      html: [
        '<p>Pay-for-results pricing makes sense when you meet most of these conditions:</p>',
        '<ul>',
        '<li>you have 3–10 keywords of known value, checked in Google Ads Keyword Planner;</li>',
        '<li>you run a local service where a few keywords bring most of the inquiries;</li>',
        '<li>the contract has a cap on the monthly fee;</li>',
        '<li>positions are measured in your own Search Console account, not only in the agency\'s tool;</li>',
        '<li>there is no exit fee, and the content and links stay with you after the cooperation ends.</li>',
        '</ul>',
        '<p>If the keywords in the contract have no demand, a high position will not bring customers, and the invoice will arrive anyway.</p>',
      ].join(''),
    },
    {
      id: 'kiedy-abonament',
      h2: 'When to choose a retainer',
      html: [
        '<p>SEO on a retainer fits better when:</p>',
        '<ul>',
        '<li>you are developing the whole site: technical work, content, Google Business Profile and links;</li>',
        '<li>you measure inquiries from forms and phone calls in GA4, not just positions;</li>',
        '<li>you want to change the keyword list along the way, once you see which ones bring customers;</li>',
        '<li>you care about visibility in ChatGPT answers and in AI Overviews, which the pay-for-results model usually does not cover.</li>',
        '</ul>',
        `<p>The condition: a transparent scope of work and a monthly list of changes. With us, progress and the work log are visible in the ${wew('/panel-klienta', 'client portal with weekly measurement')}.</p>`,
      ].join(''),
    },
    {
      id: 'model-mieszany',
      h2: 'Hybrid model: a retainer with a bonus or a target',
      html: [
        '<p>The hybrid model comes in two variants:</p>',
        '<ul><li>a fixed fee for the work and a bonus for an agreed result, with an upper cap on the bonus;</li><li>a retainer with a target written into the contract and compensation if the target is not reached.</li></ul>',
        `<p>We are an agency ourselves, so we have a stake in this comparison. Our model is a retainer with a target: a monthly contract, local keywords written into the contract, a top 3 target within 2–3 months measured in Google Search Console and in Maps, and if the target is not reached after 3 months, we work the next month for PLN 0. We do not guarantee position number 1: in its guide „Do you need an SEO expert?”, Google notes that nobody can guarantee it. The exceptions and the way of measuring are described in the ${wew('/cennik-pozycjonowania#cel-top-3', 'top 3 target rules')}.</p>`,
      ].join(''),
    },
    {
      id: 'umowa',
      h2: 'The contract: 6 clauses to check before you sign',
      html: [
        '<ol>',
        '<li>Contract term and termination: for how long, with what notice period and in what form it can be terminated.</li>',
        '<li>Activation fees and early exit fees.</li>',
        '<li>Who measures the result and from where: tool, location, device and day of measurement.</li>',
        '<li>A cap on the monthly fee in the pay-for-results model.</li>',
        '<li>Ownership of content, links and accounts: Search Console, GA4, Google Business Profile.</li>',
        '<li>Automatic renewal of the contract after the initial term.</li>',
        '</ol>',
        '<p>Only 6 of the 17 agencies in our sample publish their termination terms on the website, so you usually have to ask about them directly. Under the general terms of one agency, the contract turns into an open-ended one by itself after the initial term, and on early termination the client pays the activation fee from the price list.</p>',
        `<p>How to take over accounts and data when you change provider is described in our guide ${wew('/zmiana-agencji-seo', 'how to switch SEO agencies without penalties')}. Our terms are ${wew('/cennik-pozycjonowania#uczciwa-umowa', 'six rules of a fair contract')}.</p>`,
      ].join(''),
      uwaga: 'This is not legal advice. For a contract involving a large amount, show it to a lawyer.',
      checklista: {
        naglowek: `Download the ${CHECKLIST_COUNT}-point checklist: what to check in the contract and what to take from your agency (PDF)`,
        plan: 'checklista_umowa_porownanie',
        idPrefiks: 'cl-p1',
      },
    },
    {
      id: 'bez-umowy-terminowej',
      h2: 'SEO without a fixed-term contract: how a monthly contract works',
      html: [
        '<p>A monthly contract is usually a contract with no set end date, which you terminate with one month\'s notice, often by email. SEO without a fixed-term contract does not mean work without a contract: the scope, price and exit rules are still in writing, they just do not bind you for a year or two. The agency then has to show progress every month, because the client can leave when they do not see it.</p>',
        `<p>With us, the SEO Standard and SEO Premium packages work this way, with no exit fees; the Booster Pack with a new website requires a minimum of 3 months. What to take from your agency before you terminate and how to send the notice itself is described in our guide ${wew('/zmiana-agencji-seo', 'on terminating a contract with an SEO agency')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Questions about pay-for-results SEO',
  faq: [
    {
      question: 'Is pay-for-results SEO worth it?',
      answer: 'It is worth it when the keywords in the contract have real demand and bring inquiries, and the contract has a monthly cap. Work out the break-even point: at PLN 99 net per keyword on page 1 of Google, the pay-for-results model is cheaper than a PLN 1,900 retainer up to 19 keywords, and at PLN 149 up to 12 keywords. Above the break-even point, the bill exceeds the retainer.',
    },
    {
      question: 'What do agencies call a "result" in a contract?',
      answer: 'Most often the position of a keyword in the top 10 or top 3, counted for every day or for the status on one day of the month, for example the last business day. Less often traffic from organic results or conversions, such as a form or a phone call. Before signing, check who measures the position, with which tool and from which location, and whether the contract has a monthly fee cap.',
    },
    {
      question: 'Do you pay a fixed fee with pay-for-results pricing?',
      answer: 'It depends on the offer. In our review of 17 agencies, five make part of the fee depend on results, and in four of the described cases they combine this with a fixed fee. There are also offers on the market with no fixed fee, for example PLN 99 or PLN 149 net per month for every keyword that is on page 1 of Google on the last business day of the month.',
    },
    {
      question: 'Can you do SEO without a long contract?',
      answer: 'Yes. Some agencies work on open-ended contracts with one month\'s notice: in our review, four of the 17 publish a notice period of about a month, two state three months, and the rest do not disclose it. With us, SEO Standard and Premium are monthly contracts, terminated by email, with no exit fees.',
    },
    {
      question: 'How do I check that the agency did not pick easy keywords?',
      answer: 'Ask for the volume of every keyword in the contract according to Google Ads Keyword Planner and compare the list with the queries you already get impressions for in Search Console. A keyword with no volume, or one that contains your company name, reaches the top 10 almost on its own, so it should not be the basis for billing.',
    },
    {
      question: 'Does the pay-for-results model cover visibility in ChatGPT and AI Overviews?',
      answer: 'Usually not, because it bills the position in regular Google results. Yet on November 4, 2026, an AI Overview appeared for all 30 SEO-industry keywords we checked, and its sources are not always pages from the top ten. Measure AI visibility separately, on a fixed list of questions.',
    },
    {
      question: 'How much does SEO on a retainer cost?',
      answer: `In our review, 12 of the 17 agencies publish a "from" price: from PLN 490 (€115) net per month for a package that covers only the Google Business Profile, to PLN 4,000 net and more for ongoing site support. Our SEO Standard package costs PLN 1,900 (€450) net per month. Details are in the ${wew('/cennik-pozycjonowania', 'SEO pricing')}.`,
    },
    {
      question: 'How long until SEO results show?',
      answer: `The agencies in our review usually promise first results after 3–6 months, so in the pay-for-results model the first months usually cost less. With us, the goal is a top 3 position for the local keywords in the contract within 2–3 months. If there is no target result after 3 months, we work the next month for PLN 0 (exceptions: a new domain, a manual Google penalty, changes to the site made without us; ${wew('/cennik-pozycjonowania#cel-top-3', 'top 3 target rules')}).`,
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Do you need an SEO expert? (Polish-language version of the page)', data: '2026-11-05' },
    { url: 'https://ads.google.com/home/tools/keyword-planner/', nazwa: 'Google Ads: Keyword Planner', data: '2026-11-04' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Google results (Poland, desktop) for 30 SEO-industry keywords', data: '2026-11-04' },
  ],
  aiQuestions: ['Q09', 'Q13'],
  cta: {
    tekst: "Send us your current agency's offer or contract. We will review it against the 10 criteria from this page",
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'Compare with our pricing: SEO from PLN 1,900 (€450) net/month, monthly contract', href: '/cennik-pozycjonowania' }],
  },
  about: [
    { '@type': 'Thing', name: 'Pay-for-results SEO' },
    { '@type': 'Thing', name: 'SEO retainer' },
  ],
};

// --- P2: SEO vs GEO ---------------------------------------------------------------------------

const P2_EN = {
  slug: 'seo-vs-geo',
  title: 'SEO vs GEO: how they differ and where to start in 2026',
  description: 'SEO vs GEO: SEO wins positions in Google, GEO wins mentions in ChatGPT, Gemini and Google AI Overviews. What they share, what differs, and where to start.',
  h1: 'SEO vs GEO: differences, shared foundations and the order of work',
  okruszek: 'SEO vs GEO',
  nazwaKarty: 'SEO vs GEO',
  teaser: 'How optimizing for ChatGPT and AI Overviews differs from classic SEO, and why only one in four domains cited by AI is in the top 10.',
  kryteria: '8 criteria',
  decyzja: { pytanie: 'Do ChatGPT and AI Overviews need separate work?', skrot: 'Shared foundations, a different measure of success' },
  tag: 'Comparison: SEO and AI search optimization',
  zrodlaDanych: 'Data: Google results for 30 SEO-industry keywords (DataForSEO, November 4, 2026), tests of AI model answers (November 4–5, 2026).',
  answer: `SEO is work on the position of your page in Google results, while GEO (${wew('/pozycjonowanie-w-ai', 'Generative Engine Optimization')}) is work on whether ChatGPT, Gemini, Perplexity and Google AI Overviews name your company in their answers. The foundations are shared, but in our measurement only one in four domains cited in an AI Overview was also in the top 10 for the same keyword.`,
  published: '2026-11-06',
  updated: '2026-11-06',
  tableId: 'tabela-8-kryteriow',
  tableCaption: 'SEO and GEO compared on 8 criteria (November 2026)',
  tablePrzypis: `Sources: our measurement of AI Overview sources (Google, Poland, desktop, DataForSEO, ${dataEn(POMIAR_AIO.daty[POMIAR_AIO.daty.length - 1])}) and our price list (November 2026).`,
  columns: [
    { key: 'kryterium', label: 'Criterion' },
    { key: 'seo', label: 'SEO' },
    { key: 'geo', label: 'GEO' },
  ],
  rows: [
    { kryterium: 'Goal', seo: 'Page position and a click from search results', geo: "A mention or citation of the company in an AI model's answer" },
    { kryterium: 'Where it works', seo: 'Google and Bing: organic results and Maps', geo: 'ChatGPT, Perplexity, Gemini, Copilot, as well as AI Overviews and AI Mode in Google' },
    { kryterium: 'Measure of success', seo: 'Position, CTR, clicks, inquiries from forms and phone calls', geo: "Share of answers naming the company, cited URLs, place in the model's list of recommendations" },
    { kryterium: 'Measurement tools', seo: 'Google Search Console, GA4, position monitoring', geo: 'A fixed list of questions put to the models every week, traffic from AI services in GA4' },
    { kryterium: 'What affects the result', seo: 'Content that matches intent, technical work, links, business profile', geo: 'Mentions in sources the models read (directories, media, forums, video), direct answers with numbers, consistent company data and, for AI Overviews, indexing in Google' },
    { kryterium: 'Stability', seo: 'Positions change over days and weeks', geo: 'Answers differ between queries and weeks; the same request can return a different list of companies' },
    { kryterium: 'Source of the result', seo: 'The top 10 for a single keyword', geo: `In our measurement, ${POMIAR_AIO.procent}% of AI Overview citations came from domains in the top 10 for the same keyword` },
    { kryterium: 'Cost with us', seo: 'SEO packages from PLN 1,900 (€450) net per month', geo: 'AI audit PLN 990 (€235) net; measurement and work included in SEO Premium or +PLN 490 (€115) net per month on top of SEO Standard' },
  ],
  sections: [
    {
      id: 'co-to-jest-geo',
      h2: 'What GEO is',
      html: [
        '<p>GEO is optimization for generative search engines, meaning work on getting AI models with internet access to name your company and cite your site when they answer your customers\' questions. In SEO, the goal is a place in the list of results and a click. In GEO, what counts is whether the model mentions the company at all, in what context and with what source.</p>',
        '<p>This applies to ChatGPT with search, Perplexity, Gemini and Copilot, and in Google also to AI Overviews and AI Mode. Each of these tools uses different sources, so being present in one does not guarantee being present in the others.</p>',
        `<p>How this work looks with us is described on the page ${wew('/pozycjonowanie-w-ai', 'AI search optimization (GEO)')}.</p>`,
      ].join(''),
      h3: [
        {
          id: 'dwa-znaczenia',
          h3: 'GEO has two meanings in marketing',
          html: [
            `<p>The abbreviation GEO can be misleading. In marketing, it has long meant geolocation activities: geotargeting of ads and local SEO. Since November 2023, after the publication of a research paper on generative search engines (${ax('https://arxiv.org/abs/2311.09735', 'arXiv 2311.09735')}), it increasingly means optimization for AI model answers. Even the models get it wrong: in our tests of November 4 and 5, 2026, the GPT-4.1 mini model (OpenAI, via API, with search enabled) twice described GEO as geolocation marketing and gave no source, while Perplexity answered correctly and gave 10 sources. On this page, GEO always means optimization for AI answers.</p>`,
            '<p>If you run a local business, both meanings apply to you: customers look for you in Google Maps, and some of them also ask AI models whom to choose.</p>',
          ].join(''),
        },
        {
          id: 'skroty',
          h3: 'AEO, AIO, LLMO and AI SEO: are they the same thing?',
          html: '<p>All these abbreviations describe the same phenomenon: a company should appear in a model\'s answer, not just in a list of links. AEO, or Answer Engine Optimization, is older than GEO and emerged with featured snippets in Google and voice assistants. AIO and LLMO are newer names, and "AI SEO" is a commercial term used by agencies, including us.</p>',
          tabela: {
            id: 'tabela-seo-geo-aeo',
            caption: 'SEO, GEO and AEO: how they differ (November 2026)',
            columns: [
              { key: 'cecha', label: 'Feature' },
              { key: 'seo', label: 'SEO' },
              { key: 'geo', label: 'GEO' },
              { key: 'aeo', label: 'AEO' },
            ],
            rows: [
              { cecha: 'What it means', seo: 'Optimization for search engines', geo: 'Optimization for generative search engines, meaning AI models', aeo: 'Optimization for answer engines' },
              { cecha: 'Goal', seo: 'Position in results', geo: "A mention in the model's answer", aeo: 'A direct answer: a snippet, a voice assistant, an AI answer' },
              { cecha: 'When the term caught on', seo: 'Since the 1990s', geo: 'Since 2023 (the GEO research paper)', aeo: 'Earlier than GEO, with featured snippets and voice assistants' },
              { cecha: 'Note', seo: '–', geo: 'AIO, LLMO and "AI SEO" are in practice synonyms', aeo: 'In Google, the bare abbreviation "aeo" leads to the customs status of Authorised Economic Operator' },
            ],
            przypis: 'Customs status for the query "aeo": Google results (Poland, desktop, DataForSEO) from November 4, 2026.',
          },
        },
      ],
    },
    {
      id: 'porownanie-8-kryteriow',
      h2: 'SEO vs GEO on 8 criteria',
      tabela: 'glowna',
      htmlPo: '<p>The takeaway from the table: the foundations are shared, but the measure of success is different. A page that is not indexed or does not answer the question directly will reach neither the results nor the model\'s answer. On the other hand, a high position does not guarantee that a model will name the company, because models also draw on directories, media, forums and video.</p>',
    },
    {
      id: 'nasz-pomiar',
      h2: 'Our measurement: where AI Overviews get their sources',
      html: [
        `<p>${tekstPomiaru(POMIAR_AIO)}</p>`,
        '<p>Method: for every keyword, we saved the list of AI Overview sources and the domains from the first ten free results. We expanded Google redirect addresses into domains and left out individual results that could not be expanded. We excluded the keyword "aeo", because Google links it to a customs status, not to marketing.</p>',
        `<p>The result varies. For the keyword "seo vs geo", across ${POMIAR_AIO.seoVsGeo.pobran} collections from November 4 and 5, between ${POMIAR_AIO.seoVsGeo.min} and ${POMIAR_AIO.seoVsGeo.max} of ${POMIAR_AIO.seoVsGeo.z} AI Overview sources were in the top 10, even though the Overview's own sources did not change. YouTube was among the sources for ${POMIAR_AIO.youtube} of ${POMIAR_AIO.frazPorownanych} keywords, so a video can also make it into the answer.</p>`,
      ].join(''),
      tabela: {
        id: 'tabela-pomiar-aio',
        caption: `AI Overview sources vs the top 10 for the same keyword (Google, Poland, desktop, ${POMIAR_AIO.typ === 'mediana' ? 'median of measurements' : dataEn(POMIAR_AIO.daty[0])})`,
        columns: [{ key: 'miara', label: 'Measure' }, { key: 'wartosc', label: 'Value' }],
        rows: [
          { miara: 'Keywords checked', wartosc: String(POMIAR_AIO.frazSprawdzonych) },
          { miara: 'Keywords with an AI Overview', wartosc: String(POMIAR_AIO.frazZPrzegladem) },
          { miara: 'Keywords compared (with a source list, without "aeo")', wartosc: String(POMIAR_AIO.frazPorownanych) },
          { miara: 'Citations in AI Overviews', wartosc: liczba(POMIAR_AIO.cytowan) },
          { miara: 'Different domains among the citations', wartosc: String(POMIAR_AIO.domen) },
          { miara: 'Citations from domains in the top 10 for the same keyword', wartosc: `${POMIAR_AIO.wTop10} (${POMIAR_AIO.procent}%${POMIAR_AIO.zakresProcent ? `, range ${POMIAR_AIO.zakresProcent}%` : ''})` },
        ],
        przypis: zastrzezeniePomiaru(POMIAR_AIO),
        minWidth: 420,
      },
    },
    {
      id: 'co-dziala-w-obu',
      h2: 'What works in both: indexing, brand entity, answers worth quoting',
      html: [
        '<ul>',
        '<li>Indexing. Google says that a source in an AI Overview can be a page that is indexed and eligible to be shown in results with a text snippet. ChatGPT with search and Perplexity also read pages from the web, so sound technical work and indexing in Google and Bing are the starting point.</li>',
        '<li>Brand entity. The same company name, address and description on your site, in your Google Business Profile and in directories. In our test of November 4, 2026, Perplexity, asked about an SEO agency in Warsaw, cited company directories: Clutch, Sortlist and DesignRush.</li>',
        '<li>Answers worth quoting. A heading phrased as a question, and below it a paragraph that answers directly, with a number and a source. Such a fragment is easy to lift and quote, both in Google results and in a model\'s answer.</li>',
        '<li>Bot access. The crawlers of AI search engines (OAI-SearchBot, PerplexityBot, Claude-SearchBot) and Googlebot must be able to fetch the page without being blocked in robots.txt or in the server firewall.</li>',
        '</ul>',
        `<p>These same actions are the foundation on which we build ${wew('/pozycjonowanie-stron-internetowych', 'SEO services')}, so with a limited budget you do not have to choose one or the other.</p>`,
      ].join(''),
    },
    {
      id: 'czego-nie-robic',
      h2: 'What not to do "for GEO"',
      html: [
        '<ul>',
        '<li>Do not stuff keywords or model names into the text. A model summarizes the meaning of a page, so a clear answer counts, not the number of repetitions.</li>',
        '<li>Do not treat an llms.txt file as a way to rank in Google. Google does not list it among the requirements a page must meet to appear in an AI Overview, so it will not replace indexing.</li>',
        '<li>Do not buy mentions, reviews or links in bundles. Google describes such practices in its spam policies, and fake reviews are also a legal risk.</li>',
        '<li>Do not publish AI-generated text at scale without editing. Google treats mass production of content with no value for the reader as spam, whether a human or a model wrote it.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'od-czego-zaczac',
      h2: 'When to start with GEO and when with SEO',
      html: '<p>The order depends on where your customers search for you today and whether your site is already in the Google index.</p>',
      tabela: {
        id: 'tabela-od-czego-zaczac',
        caption: 'Where to start: SEO or GEO (November 2026)',
        columns: [
          { key: 'sytuacja', label: "Company's situation" },
          { key: 'start', label: 'Start with' },
          { key: 'dlaczego', label: 'Why' },
        ],
        rows: [
          { sytuacja: 'A service business operating in one city', start: 'Local SEO and Google Business Profile, GEO as measurement', dlaczego: 'Customers search in Maps; according to the Senuto report "AI Overviews in Poland" (v2.0, November 27, 2025, 17.8 million keywords), an AI Overview appears for 28.95% of all keywords, but only for 6.08% of keywords with local intent' },
          { sytuacja: 'A B2B company, an advisory service, SaaS', start: 'SEO and GEO in parallel', dlaczego: 'Customers ask models for comparisons and recommendations; Perplexity cites industry directories' },
          { sytuacja: 'A new domain with no history', start: 'Technical SEO and indexing', dlaczego: 'Without indexing, there is nothing to cite' },
          { sytuacja: 'A site with traffic but no AI mentions', start: 'GEO: mentions in the sources models cite', dlaczego: 'The positions are already there; what is missing is presence in the sources' },
        ],
        przypis: 'Source of the local-intent data: Senuto, "AI Overviews in Poland – 18M keywords", v2.0, updated November 27, 2025 (accessed November 5, 2026).',
      },
      htmlPo: zdanieJesli('/porownania/seo-czy-google-ads', (h) => `<p>If you are considering paid ads instead of SEO or GEO, see the comparison ${a(h, 'SEO or Google Ads')}.</p>`),
    },
    {
      id: 'jak-mierzyc-geo',
      h2: 'How to measure GEO',
      html: [
        '<p>You cannot check AI visibility with a single question, because answers change between queries and weeks. A fixed method works:</p>',
        '<ol>',
        '<li>A list of 20–50 questions your customers ask, written down once and not changed between measurements.</li>',
        '<li>The same questions every week in four sources: ChatGPT with search, Perplexity, Gemini and AI Overviews in Google.</li>',
        '<li>Three measures: the share of answers that name the company or its page, the addresses of the cited subpages, and the domains the models draw knowledge from.</li>',
        '<li>Traffic from chatgpt.com and perplexity.ai in Google Analytics 4 as a signal that answers lead to your site.</li>',
        '</ol>',
        `<p>The measurement itself does not have to be expensive: data for 30 questions a week in ChatGPT and Perplexity costs us about USD 5 per month (DataForSEO API prices, November 2026). You can see the results of such a measurement in the "AI visibility" tab of the ${a(PANEL_DEMO_URL, 'client portal demo')}.</p>`,
        zdanieJesli('/pozycjonowanie-w-ai/chatgpt', (h) => `<p>Where ChatGPT gets the companies it recommends is described in our guide ${a(h, 'optimizing for ChatGPT')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Questions about SEO and GEO',
  faq: [
    {
      question: 'How is SEO different from GEO?',
      answer: 'SEO improves the position of a page in search results, while GEO increases the chance that an AI model names or cites the company in its answer. In SEO you measure positions and clicks in Search Console; in GEO you measure the share of answers naming the company on a fixed list of questions. The foundations are shared: indexing, good content and mentions of the company.',
    },
    {
      question: 'Will GEO replace SEO?',
      answer: 'No, because AI answers largely draw on pages that search engines have already indexed. What changes is the measure of success: on November 4, 2026, an AI Overview appeared for all 30 SEO-industry keywords we checked, so a position alone brings fewer clicks than it used to.',
    },
    {
      question: 'Does SEO still make sense in 2026?',
      answer: 'Yes. In an AI Overview, Google shows as sources pages that are indexed and eligible to be displayed with a snippet, and ChatGPT with search also reads pages from the web. Without technical SEO and good content, a model has nothing to cite. What changes is mostly what you measure.',
    },
    {
      question: 'What is GEO in SEO?',
      answer: 'In marketing, the abbreviation GEO has two meanings. It used to mean local activities, that is, geotargeting and local SEO. Since 2023 it increasingly means optimization for AI model answers, that is, for generative search engines. Even the models get it wrong: in our two tests of November 4 and 5, 2026, GPT-4.1 mini described GEO as geolocation marketing.',
    },
    {
      question: 'Are AEO, AIO and LLMO the same as GEO?',
      answer: 'In practice, yes: AEO, AIO, LLMO and AI SEO all describe work on a company\'s presence in AI-generated answers. They differ in emphasis, not in method. A note on searching: Google associates the bare abbreviation "AEO" with the customs status of Authorised Economic Operator, not with marketing.',
    },
    {
      question: 'How much does GEO cost?',
      answer: 'An AI visibility audit costs PLN 990 (€235) net with us and is credited toward the first month of a retainer. Ongoing measurement and work are included in SEO Premium or cost PLN 490 (€115) net per month as an add-on to SEO Standard. On the market in October 2026, GEO audits cost PLN 790–9,000 net, and ongoing support started from PLN 990 per month or from PLN 900 as an add-on.',
    },
    {
      question: 'How do I check whether ChatGPT recommends my company?',
      answer: 'Ask ChatGPT, Perplexity and Gemini a few questions your customers ask, and check whether the answers name the company or its page. Do it every week on the same list of questions, because answers change. A full measurement on 30 questions in four sources is part of our AI visibility audit.',
    },
  ],
  sources: [
    { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal et al., the research paper that introduced the term GEO, arXiv 2311.09735 (November 2023)', data: '2026-11-05' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-05' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search', data: '2026-11-05' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI: OpenAI bots (OAI-SearchBot, GPTBot)', data: '2026-11-05' },
    { url: 'https://insight.senuto.com/aio-report-2/', nazwa: 'Senuto: AI Overviews in Poland – 18M keywords, v2.0 (November 27, 2025)', data: '2026-11-05' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Google results (Poland, desktop) for 30 SEO-industry keywords', data: '2026-11-04' },
  ],
  aiQuestions: ['Q25'],
  cta: {
    tekst: 'Order an AI visibility audit (PLN 990 (€235) net)',
    plan: 'audyt-ai',
    linki: [{ tekst: 'See how we do AI search optimization', href: '/pozycjonowanie-w-ai' }],
  },
  about: {
    '@type': 'DefinedTerm',
    name: 'Generative Engine Optimization',
    alternateName: ['GEO', 'AEO', 'AIO', 'LLMO'],
    description: "Optimizing a company's presence in AI model answers and AI Overviews in search engines.",
  },
};

export { P1_EN, P2_EN };

// Kolejność = kolejność kart w hubie i pozycji w ItemList (jak porownania w lib/porownania.js).
export const porownaniaEn = [P1_EN, P2_EN, P3_EN, P6_EN];

export function porownanieBySlugEn(slug) {
  return porownaniaEn.find((p) => p.slug === slug) ?? null;
}

// --- Selektory według języka (PL = lib/porownania.js, bez zmian) --------------------------------
// lib/porownania.js nie importuje tego pliku, więc brak cyklu.

export function porownanieDla(slug, locale) {
  return locale === 'en' ? porownanieBySlugEn(slug) : porownanieBySlug(slug);
}

export function porownaniaDla(locale) {
  return locale === 'en' ? porownaniaEn : porownania;
}

export function hubDla(locale) {
  return locale === 'en' ? HUB_EN : HUB;
}

export function akapitMetodyHubaDla(locale) {
  return locale === 'en' ? akapitMetodyHubaEn() : akapitMetodyHuba();
}
