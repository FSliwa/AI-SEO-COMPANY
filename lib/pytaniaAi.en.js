// Wersja angielska spoke'ow huba GEO (9.11.2026): /en/ai-search-optimization/chatgpt i
// /en/ai-search-optimization/ai-visibility-audit. Ten sam kształt co lib/pytaniaAi.js (klucz = slug PL),
// ta sama liczba sekcji, tabel, FAQ i linków; liczby, daty, źródła i ceny bez zmian (ceny w PLN).
// Linki w segmentach mają ścieżki PL (klucze routingu), a segmenty.js tłumaczy je na adresy EN;
// link bez wersji EN (np. wpis B1 na blogu) znika razem z fragmentem z warunkiem.
// Identyfikatory sekcji i FAQ są po angielsku (kotwice w adresie /en/...).

import { SPRAWDZARKA, KOTWICA_METRYK, pytaniaAi } from './pytaniaAi';
import { wpisEn } from './stronyEn';

const A2 = '/pozycjonowanie-w-ai/chatgpt';
const A5 = '/pozycjonowanie-w-ai/audyt-widocznosci';
const L1 = '/pozycjonowanie-wizytowki-google';
const N1 = '/narzedzia/generator-llms-txt';
const B1 = '/blog/bing-webmaster-tools-indexnow-chatgpt';
const HUB = '/pozycjonowanie-w-ai';

const BASE = 'https://www.ai-seo-company.pl';

export const pytaniaAiEn = [
  // --- A2 /en/ai-search-optimization/chatgpt
  {
    slug: 'chatgpt',
    typ: 'artykul',
    okruszek: 'ChatGPT optimization',
    tag: 'AI search optimization · ChatGPT',
    title: wpisEn(A2).tytul,
    description: wpisEn(A2).opis,
    h1: 'ChatGPT optimization (ChatGPT SEO): how to get ChatGPT to recommend your company',
    answer: 'ChatGPT optimization means working on the sources the model uses when it searches the web. In our November 2026 test, ChatGPT asked to recommend a company gave 62 links, 59 of them to Google Maps. For price questions it cited websites. So we start with your Google Business Profile and a page with a clear offer and price.',
    lead: [
      'ChatGPT optimization is one part of ',
      { a: 'AI search optimization', href: HUB },
      ' (GEO), which is work on getting language models to name your company in their answers. In this guide we stay with one model. We show what we saw in 20 ChatGPT answers to questions that customers of service businesses ask, and the 7 steps that follow from it.',
    ],
    spisTresci: true,
    sections: [
      {
        kotwica: 'zrodla', // EN: id="sources" (lib/anchors.js)
        h2: 'Where ChatGPT gets the companies it recommends',
        bloki: [
          { p: ['ChatGPT does not keep a ready-made list of companies to recommend. The answer is built from scratch every time, either from what the model learned during training or from web search results. For a service business, mostly the second mode matters, because only there do current names, addresses and links appear.'] },
        ],
        podsekcje: [
          {
            h3: 'Model knowledge vs. ChatGPT search',
            bloki: [
              { p: ['In our test, ChatGPT went to the web for every request to recommend a company and for every question about price. For 4 advice-style questions, such as "how do I get ChatGPT to recommend my company" or "how do I switch SEO agencies", it answered from the model\'s own knowledge and gave not a single link.'] },
              { p: ['Without search, the advice was generic and off target. Asked how to get ChatGPT to recommend a company to customers, the model suggested, among other things, training the model on company data and writing prompts that tell it to recommend the company. Neither changes the answer your customer will see.'] },
              { p: ['That is why ChatGPT optimization is about the search mode, which English-language materials call ChatGPT search. In this mode the model first looks up pages and then summarizes them in its answer, often with links to the sources.'] },
            ],
          },
          {
            h3: 'Our test: 59 of 62 links led to Google Maps',
            bloki: [
              { p: ['We asked ChatGPT questions of four types: requests to recommend a company, questions about price, questions about a ranking or a specific feature of a service, and requests for advice. The questions covered SEO agencies, but also a carpenter in Warsaw\'s Wola district, a plumber in Kraków and an accounting office in Poznań. In every answer we counted the links and checked where they lead.'] },
              {
                wykres: {
                  tytul: 'Google Maps links in ChatGPT answers by question type',
                  slupki: [
                    { etykieta: 'Requests to recommend a company', wartosc: 59, z: 62 },
                    { etykieta: 'Questions about price, ranking and service features', wartosc: 0, z: 31 },
                  ],
                  podpis: 'Measurement by AI SEO COMPANY, November 4–5, 2026; ChatGPT = gpt-4.1-mini with web search, method below the table.',
                },
              },
              {
                tabela: {
                  id: 'measurement-table',
                  caption: 'Links in ChatGPT and Perplexity answers by question type, November 4–5, 2026',
                  columns: [
                    { key: 'typ', label: 'Question type (examples)' },
                    { key: 'odp', label: 'Answers' },
                    { key: 'linki', label: 'Links' },
                    { key: 'mapy', label: 'To Google Maps' },
                    { key: 'inne', label: 'Other links' },
                  ],
                  rows: [
                    { id: 'polecenie', typ: 'Recommend a company: SEO agency (5 questions), Google Business Profile optimization (2), carpenter in Wola (2 days), plumber in Kraków, accounting office in Poznań', odp: '11 (10 questions)', linki: '62', mapy: '59 (Google Maps search)', inne: '3 agency websites, in 2 questions that asked for a price' },
                    { id: 'cena', typ: 'Price: SEO, SEO audit, pay-for-results or retainer', odp: '3', linki: '15', mapy: '0', inne: 'price lists and guides, including our pricing page' },
                    { id: 'ranking', typ: 'Agency ranking or a specific feature ("which agency measures ChatGPT every week")', odp: '2', linki: '16', mapy: '0', inne: 'rankings and agency websites' },
                    { id: 'porada', typ: 'Advice: "how to get ChatGPT to recommend", "how to switch agencies", "how to check"', odp: '4', linki: '0', mapy: '0', inne: 'the model did not search' },
                    { id: 'perplexity', typ: 'Perplexity (sonar model), all question types', odp: '23', linki: '–', mapy: '0', inne: 'business directories and articles answering the question' },
                  ],
                  przypis: 'Method: AI SEO COMPANY measurement of November 4–5, 2026 through the DataForSEO LLM Responses API. ChatGPT: gpt-4.1-mini with web search, search location Warsaw (also for the questions about Kraków and Poznań). Perplexity: sonar model. One answer per question; we asked the carpenter question on November 4 and 5 and the same 5 companies came up both times. Links to Maps are google.com/maps/search addresses with the company name, not addresses of the profiles themselves. We left out the question about our own company (5 links, 0 to Maps). The ChatGPT app may answer differently than the API.',
                },
              },
              { p: ['For a recommendation, ChatGPT gave the company name and address, often the opening hours too, and the link led to Google Maps, where the customer sees the business profile. The measurement does not tell us every source the model uses to build such a description, so we do not claim that Maps is the only one. It does show where a customer lands after clicking a recommendation: on the company\'s business profile. We do not publish the names of the recommended companies, because they are the model\'s answers, not our assessment.'] },
            ],
          },
          {
            h3: 'Questions about price and ranking: the model cites websites',
            bloki: [
              {
                p: [
                  'The picture reverses when the customer asks about money or a comparison. In 5 answers to questions about price, agency rankings and a specific feature of a service, ChatGPT gave 31 links and none of them led to Maps. It cited price lists, guides and rankings, that is, ordinary websites. For a question about SEO prices in Poland, our ',
                  { a: 'SEO pricing page', href: '/cennik-pozycjonowania' },
                  ' was among the 6 sources (November 4, 2026).',
                ],
              },
              { p: ['The takeaway for a service business: the business profile answers the request "recommend someone", while a page with an open price and a description of the service answers "how much does it cost" and "who does X". To get the model to name your company in both situations, you need both.'] },
            ],
          },
        ],
      },
      {
        id: 'maps-directories-bing',
        h2: 'Maps, directories and Bing: the sources models cite',
        bloki: [
          { p: ['ChatGPT and Perplexity looked in different places. For recommendations, ChatGPT pointed to Google Maps. Across 23 answers from the same days, Perplexity did not give a single link to Maps. For a question about an SEO agency for a B2B company in Warsaw it cited the Clutch and Sortlist business directories, and in other answers articles that answer the question directly.'] },
          { p: ['The same sites kept coming back. In 26 Perplexity answers from November 4–5, 2026 (23 from the table and 3 for additional questions about prices and comparisons), jflowlabs.pl was a source in 8, justidea.agency in 6 and sorank.com in 5. These are guides and service descriptions written for a specific question, not directories.'] },
          { p: ['The third source is the ordinary search index. The price lists and guides that ChatGPT cited had to be found on the web first, so a page that search engines have not indexed will not make it into such an answer. That is why, besides Google, it is worth taking care of Bing: add your site to Bing Webmaster Tools and submit new URLs with the IndexNow protocol.'] },
        ],
      },
      {
        id: 'steps',
        h2: 'ChatGPT SEO: how to get found in ChatGPT in 7 steps',
        bloki: [
          { p: ['The order follows the measurement: first what ChatGPT shows for a recommendation, then what it cites for questions about price, and last the measurement, without which you cannot tell whether the work is paying off.'] },
        ],
        podsekcje: [
          {
            h3: '1. A consistent business profile in Google Maps, Bing and Apple',
            bloki: [
              { p: ['Complete your Google Business Profile: primary and secondary categories, a list of services with descriptions, service area, opening hours and photos. Enter the same data in Bing Places and Apple Business Connect. Since ChatGPT gives the address and hours when it recommends a company, inconsistent data in different places risks the model giving your customer outdated information. Reviews that describe the service performed help the customer who goes from the answer to your profile.'] },
              { warunek: L1, p: ['For our clients this is handled by our ', { a: 'Google Business Profile optimization', href: L1 }, '.'] },
            ],
          },
          {
            h3: '2. Directories and rankings that models cite',
            bloki: [
              { p: ['Check whether your company has an up-to-date listing in the directories that models cite in your industry. For marketing agencies these include Clutch and Sortlist, and for local businesses industry directories and review sites. The listing should carry the same data as your business profile and describe your services in the words customers use. For rankings and roundups such as "best companies in the city", aim to get in through real projects and reviews, not paid placements.'] },
            ],
          },
          {
            h3: '3. A page that answers directly: service, price, area',
            bloki: [
              { p: ['For questions about price, ChatGPT cited price lists and articles about costs, including our pricing page with package prices. Create a separate page for every service and every important customer question: what you do, how much it costs, where you work and how long delivery takes. Under a question-style heading, put a short answer paragraph that can be quoted without the rest of the page. This page is built the same way.'] },
            ],
          },
          {
            h3: '4. Bot access: OAI-SearchBot in robots.txt and content without JavaScript',
            bloki: [
              { p: ['OpenAI uses several bots. OAI-SearchBot fetches pages for ChatGPT search, GPTBot collects content that may be used to train models, and ChatGPT-User opens a page when a user asks for it. According to OpenAI\'s documentation, a page blocked for OAI-SearchBot does not appear in ChatGPT search answers, apart from plain navigational links (accessed November 5, 2026).'] },
              { p: ['Check your robots.txt: blocking GPTBot signals that the content should not be used for training, and blocking OAI-SearchBot removes the page from ChatGPT search. These are two separate settings. Also check that your service descriptions and prices are in the page\'s HTML and do not appear only after JavaScript runs.'] },
            ],
          },
          {
            h3: '5. Indexing in Google and Bing (IndexNow)',
            bloki: [
              { p: ['A page that is not in the index will not be cited. Check in Google Search Console that your service pages are indexed, add your site to Bing Webmaster Tools and send new and changed URLs through IndexNow. This protocol notifies Bing and other search engines that support it of a change right away, without waiting for the next crawler visit.'] },
              { warunek: B1, p: ['We describe the setup step by step in our guide ', { a: 'Bing Webmaster Tools and IndexNow', href: B1 }, '.'] },
            ],
          },
          {
            h3: '6. Mentions where the model already looks',
            bloki: [
              { p: ['Before you start collecting mentions, find out where to look. Ask ChatGPT and Perplexity the questions your customers ask, and write down the sites the models cite. That is your list of places where being present makes sense: a directory, an industry portal, a comparison article, a local news site. In the client portal you get such a list with every weekly measurement.'] },
            ],
          },
          {
            h3: '7. Measure every week, not just one question',
            bloki: [
              {
                p: [
                  'One answer is a sample. In our test, the carpenter question repeated a day later gave the same companies, but after changes to your site and profile you want to see a trend, not a single screenshot. Measure on a fixed set of questions, in the same models, every week. With us the first step is an ',
                  { a: 'AI visibility audit', href: A5 },
                  ', and the following weeks show up in the client portal.',
                ],
              },
              { warunek: SPRAWDZARKA, p: ['You can take a first sample for free: ', { a: 'check whether ChatGPT recommends your company', href: SPRAWDZARKA }, '.'] },
            ],
          },
        ],
      },
      {
        id: 'worth-paying',
        h2: 'Is it worth paying for ChatGPT optimization?',
        bloki: [
          { p: ['It is, if the provider starts with measurement: shows you a list of your customers\' questions, a starting result in ChatGPT and other models, and the pages the models cite, then reports changes every month. It is not, if someone guarantees that ChatGPT will start recommending your company. With us the audit costs €235 net, and weekly measurement is an add-on of €115 net per month to the SEO Standard package.'] },
          { p: ['We asked Perplexity the same question on November 5, 2026. The model advised asking, before signing a contract, for a list of 30–100 real customer questions, a baseline measurement and a monthly report with citations, and warned against guarantees of recommendation. 6 of the 10 sources in that answer had "pozycjonowanie-w-chatgpt" (ChatGPT optimization) in the URL. It is another example that Perplexity cites pages written for a specific question.'] },
        ],
      },
      {
        id: 'how-to-measure',
        h2: 'How to measure visibility in ChatGPT',
        bloki: [
          { p: ['Measurement starts with a list of questions, not with a tool. Write down 20–50 questions that customers ask before buying: requests to recommend, questions about price and comparisons, with your city and services. Ask each question under the same conditions and record three things: whether your company name or page appears, whom the model recommends instead of you, and which pages it cites.'] },
          {
            p: [
              'The share of answers that mention your brand is the result, and the list of cited pages is the work plan. By hand you can do this for a handful of questions, but dozens of questions across four sources every week need automation. That is how ',
              { a: 'AI visibility measurement in the client portal', href: '/panel-klienta' },
              ' works.',
            ],
          },
          {
            obraz: {
              src: '/images/panel/ai.webp',
              width: 1600,
              height: 1025,
              alt: 'Table in the client portal: share of ChatGPT, Perplexity, Gemini and Google AI Overviews answers that mention the company name, week by week',
              podpis: 'The "AI visibility" tab in the client portal demo (fictional company Stolarnia Demo, sample data).',
            },
          },
        ],
      },
      {
        id: 'what-you-cant-buy',
        h2: 'What cannot be bought or promised',
        bloki: [
          { p: ['You cannot buy a guarantee that ChatGPT will name your company when a customer asks for a recommendation. The model picks its sources itself, and its behavior changes with each version of the model and of search. An honest provider therefore promises work and measurement: specific changes to your business profile, your website and directories, and a result on the same questions week after week.'] },
          { p: ['Remember, too, the difference between a measurement and what the customer sees. The answers in our test come from the API, and a customer in the ChatGPT app may get a different list, because the app takes their location and earlier conversations into account. That is why we treat the measurement result as a trend, not as a ranking.'] },
        ],
      },
    ],
    faqTytul: 'Questions about ChatGPT optimization',
    faq: [
      {
        id: 'can-you-optimize-a-company-for-chatgpt',
        question: 'Can you optimize a company for ChatGPT?',
        answer: ['You can improve the odds, but you cannot guarantee them. ChatGPT with search builds its answer from the pages it finds, so you work on getting it to find your company: a Google Business Profile, directory listings, media mentions and a page with clear answers. You check the effect with measurement, because the model\'s answers change over time.'],
      },
      {
        id: 'does-chatgpt-use-google',
        question: 'Does ChatGPT use Google?',
        answer: ['For company recommendations, it points to Google. In our test, ChatGPT then linked almost exclusively to Google Maps: 59 of 62 links in 11 answers (November 4–5, 2026). For questions about prices and rankings it cited ordinary websites. So a well-kept business profile and a site indexed in Google and Bing work at the same time for search results and for ChatGPT answers.'],
      },
      {
        id: 'how-long-does-it-take-for-chatgpt-to-mention-a-company',
        question: 'How long does it take before ChatGPT starts mentioning a company?',
        answer: ['It depends on how fast new information reaches the model\'s sources. An improved business profile or a new page indexed by search engines can show up in answers after a few weeks, while mentions in media and directories take months. We take the first measurement before any changes, so there is something to compare against.'],
      },
      {
        id: 'does-llms-txt-help-in-chatgpt',
        question: 'Does an llms.txt file help in ChatGPT?',
        answer: [
          'There is no evidence that it does. According to an Ahrefs analysis, no major model provider, OpenAI included, has confirmed that its bots use llms.txt. For ChatGPT it matters more whether OAI-SearchBot has access to your site in robots.txt and whether the content is visible in HTML without JavaScript.',
          { warunek: N1, tresc: [' If you still want the file, you can prepare it in our free ', { a: 'llms.txt generator', href: N1 }, '.'] },
        ],
      },
      {
        id: 'reklama',
        question: 'Will advertising in ChatGPT improve your company\'s visibility in answers?',
        answer: ['Do not count on it. Advertising works only for the length of the campaign, and by paying for it you do not change the pages the model builds its answer from. A mention in a directory, an article or a ranking that ChatGPT finds in search stays even after the budget is switched off. That is why, for ChatGPT optimization, we work on sources and treat advertising as a separate channel.'],
      },
    ],
    cta: {
      tytul: 'Want to know what ChatGPT says about your company today?',
      tekst: 'In the audit, we put 30 of your customers\' questions to four answer sources: ChatGPT, Perplexity, Gemini and Google AI Overviews. You get a list of companies recommended instead of you, the pages the models cite and a plan of changes.',
      przyciski: [
        { tekst: 'AI visibility audit for €235 net', href: HUB, kotwica: 'ileKosztuje', cta: 'geo_spoke_audit', glowny: true },
        { tekst: 'Ask about the audit', kontakt: true, plan: 'audyt-ai', cta: 'geo_spoke_kontakt' },
      ],
    },
    sources: [
      { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User)', data: '2026-11-05' },
      { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What Is llms.txt, and Should You Care About It?', data: '2026-11-04' },
    ],
    updated: '2026-11-05',
    opublikowano: null,
  },

  // --- A5 /en/ai-search-optimization/ai-visibility-audit
  {
    slug: 'audyt-widocznosci',
    typ: 'usluga',
    serviceSchema: 'geo-audyt', // ServiceSchema ma tylko wariant PL; EN buduje SpokeAiLayout z pola serviceEn
    // Service JSON-LD w EN: kwota w PLN, jak na stronie (ServiceSchema dla EN podaje EUR).
    serviceEn: {
      name: 'AI visibility audit',
      desc: 'AI visibility audit: 30 customer questions in ChatGPT, Perplexity, Gemini and Google AI Overviews, the sources models cite, and a 90-day action plan.',
      typ: 'Generative engine optimization audit',
      url: `${BASE}/en/ai-search-optimization/ai-visibility-audit`,
      oferty: [{ name: 'AI visibility audit', cena: 990, cenaEur: 235 }],
    },
    okruszek: 'AI visibility audit',
    tag: 'AI search optimization · audit',
    title: wpisEn(A5).tytul,
    description: wpisEn(A5).opis,
    h1: 'AI visibility audit (GEO) and weekly monitoring',
    answer: 'Our AI visibility audit costs €235 net, one-off, credited toward your first subscription month. We put 30 of your customers\' questions to ChatGPT, Perplexity, Gemini and Google AI Overviews, check whether they name your company and which sources they use, and give you a 90-day plan. Weekly measurement costs €115 net per month.',
    lead: [
      'The audit is the first step in ',
      { a: 'AI search optimization', href: HUB },
      ': before we change anything, we check whether and how models talk about your company today. You get the report within 5 business days, and then we go through it with you.',
    ],
    hero: [
      { tekst: 'Order the audit for €235 net', kontakt: true, plan: 'audyt-ai', cta: 'geo_audyt_hero', glowny: true },
      { tekst: 'See a sample result', href: '#example', cta: 'geo_audyt_przyklad' },
    ],
    sections: [
      {
        id: 'what-we-check',
        h2: 'What we check: 30 questions across 4 sources',
        bloki: [
          { p: ['Together with you we put together 30 questions that your customers ask: requests to recommend a company in your city, questions about the price of a service and comparisons with other solutions. We ask each question in four places:'] },
          { lista: [['ChatGPT with web search set to your city'], ['Perplexity'], ['Gemini'], ['Google AI Overviews']] },
          { p: ['We record the full text of each answer and the pages the models rely on. In the report you get:'] },
          {
            lista: [
              ['the share of answers that name your company or page, separately for each source'],
              ['the 5 companies the models recommend instead of you'],
              ['a list of pages cited in the answers, that is, places where a mention is worth having'],
              ['10 recommendations arranged into a 90-day action plan'],
              ['a 45-minute walkthrough of the results'],
            ],
          },
          { warunek: SPRAWDZARKA, p: ['We score every answer on five metrics, which we describe at the ', { a: 'free AI visibility checker', href: SPRAWDZARKA, kotwicaId: KOTWICA_METRYK }, '.'] },
          { p: ['Four sources, because models look in different places. In our test of November 4–5, 2026, for requests to recommend a company, 59 of 62 links in ChatGPT answers led to Google Maps, while Perplexity did not give a link to Maps in any of its 23 answers.'] },
          { warunek: A2, p: ['We describe the method and the conclusions in our guide on ', { a: 'how to get ChatGPT to recommend your company', href: A2, kotwica: 'zrodla' }, '.'] },
        ],
        podsekcje: [
          {
            h3: 'How we put together the 30 questions',
            bloki: [
              { p: ['We write the questions the way a customer asks them: in a full sentence, with the service and a city or district, for example "Can you recommend a good carpenter in Warsaw?". We split them into three types: requests to recommend, questions about price and comparisons. We agree the proportions with you, because a company whose customers come from Maps needs more recommendation questions, and a company with a quote on its website needs more questions about price.'] },
              { p: ['We choose the question types so that both channels get tested: the business profile that ChatGPT pointed to for recommendations, and the page it cited for questions about price. If the model skips your company for recommendations, we start with the profile, and if it skips you for questions about price, we start with the page.'] },
            ],
          },
        ],
      },
      {
        id: 'example',
        h2: 'A sample result from the client portal',
        bloki: [
          {
            obraz: {
              src: '/images/panel/ai.webp',
              width: 1600,
              height: 1025,
              alt: 'The AI visibility tab in the client portal: share of answers that name the company in ChatGPT, Perplexity, Gemini and Google AI Overviews, week by week',
              podpis: 'Client portal demo for the fictional company Stolarnia Demo: 8 consecutive weeks of measurement (sample data).',
            },
          },
          {
            p: [
              'This is what measurement looks like in the portal: a row is a week, a column is an answer source, and below the table are the questions from the latest measurement with the full text of the answers. The audit gives you the first such measurement, and with monitoring a new row appears in the portal every week. You can see the whole portal without logging in, in the ',
              { a: 'client portal demo', href: '/panel-klienta' },
              '.',
            ],
          },
          { p: ['In the result, look first at the source with the lowest share, then at the companies recommended instead of you. If the same companies keep coming back across several sources, the list of cited pages shows which directories, rankings or articles the models read about them. That is where it is worth earning a mention of your company.'] },
        ],
      },
      {
        id: 'monitoring',
        h2: 'Monitoring after the audit: an add-on of €115 net per month',
        bloki: [
          {
            p: [
              'The audit shows the situation today. To see whether changes work, you have to ask the same 30 questions regularly. Monitoring is an add-on of €115 net per month to the ',
              { a: 'SEO Standard', href: '/cennik-pozycjonowania' },
              ' package, €565 net per month in total, or part of the SEO Premium package (from €590 net per month).',
            ],
          },
          { p: ['The audit alone is enough if you want to make the changes yourself and check the effect in a few months. Monitoring makes sense when we make the changes together: after every new mention, profile fix or new page, you see in the portal whether the share of answers that name your company is growing.'] },
          { p: ['With monitoring you get:'] },
          {
            lista: [
              ['a measurement of the 30 questions every week across four sources, with the full text of the answers in the portal'],
              ['2 AI-focused actions per month, for example a mention in a cited source or content that answers your customers\' questions'],
              ['a month-to-month contract with no further commitments'],
            ],
          },
          { p: ['The measurement technique itself is cheap: an API query costs about USD 0.030 per ChatGPT answer with search and USD 0.006 per Perplexity answer (DataForSEO, our billing from November 4, 2026). So you pay mainly for putting the questions together, analyzing the answers and the actions, not for the queries themselves.'] },
        ],
      },
      {
        id: 'audit-vs-checker',
        h2: 'The audit vs. the free checker: 30 questions instead of 3',
        bloki: [
          {
            p: [
              'On our website there is also a ',
              { a: 'free AI visibility checker', href: SPRAWDZARKA },
              '. It answers the first question: do models connect your company with your industry and city at all. The audit answers the next ones: why that is, and what to change.',
            ],
          },
          {
            tabela: {
              id: 'audit-vs-checker-table',
              caption: 'The free checker and the AI visibility audit',
              columns: [
                { key: 'kryterium', label: 'Criterion' },
                { key: 'sprawdzarka', label: 'Free checker' },
                { key: 'audyt', label: 'Audit (€235 net)' },
              ],
              rows: [
                { id: 'pytania', kryterium: 'Questions', sprawdzarka: '3, generated automatically from your industry and city', audyt: '30, put together with you: your services and cities' },
                { id: 'zrodla', kryterium: 'Answer sources', sprawdzarka: 'ChatGPT with search, and Gemini', audyt: 'ChatGPT, Perplexity, Gemini and Google AI Overviews' },
                { id: 'wynik', kryterium: 'Result', sprawdzarka: 'in how many of 6 answers your company appears and which sources the models gave', audyt: 'share of answers that name your brand in each source, 5 companies recommended instead of you, cited pages' },
                { id: 'co-dalej', kryterium: 'What next', sprawdzarka: 'general tips', audyt: '10 recommendations in a 90-day plan and a 45-minute walkthrough' },
                { id: 'czas', kryterium: 'Time', sprawdzarka: 'about 30 seconds', audyt: '5 business days' },
                { id: 'cena', kryterium: 'Price', sprawdzarka: 'free, up to 3 companies per IP address per day', audyt: '€235 net, credited toward the first month of a subscription' },
              ],
              przypis: 'Scope of the checker and the audit according to our offer, as of November 5, 2026.',
            },
          },
          { p: ['If the checker showed that models do not name your company, the audit will tell you whom they recommend instead of you and which pages they know those companies from.'] },
        ],
      },
    ],
    faqTytul: 'Questions about the AI visibility audit',
    faq: [
      {
        id: 'how-long-does-an-ai-visibility-audit-take',
        question: 'How long does an AI visibility audit take?',
        answer: ['The audit takes 5 business days from the moment we receive the list of services and cities where you want to be recommended. During that time we put 30 questions to ChatGPT, Perplexity, Gemini and Google AI Overviews, record the answers together with their sources and prepare a report with a 90-day action plan.'],
      },
      {
        id: 'how-is-the-audit-different-from-the-free-checker',
        question: 'How is the audit different from the free checker?',
        answer: ['The checker asks 3 questions and shows 6 answers, so it gives you a sample. In the audit we put together 30 questions with your services and cities, check four answer sources and the pages the models take their information from. At the end you get a list of changes in priority order, not just a score.'],
      },
      {
        id: 'do-i-have-to-buy-a-subscription-after-the-audit',
        question: 'Do I have to buy a subscription after the audit?',
        answer: ['No. The audit costs €235 net and is a separate service. If you later choose a subscription, we credit the audit fee toward the first month. Ongoing weekly measurement costs €115 net per month as an add-on to SEO Standard, or is included in the price of SEO Premium.'],
      },
      {
        id: 'do-you-guarantee-chatgpt-will-recommend-my-company',
        question: 'Do you guarantee that ChatGPT will start recommending my company?',
        answer: ['No. Nobody controls the models\' answers, so we do not promise citations or places on lists. We promise measurement on the same 30 questions every week, work on the sources the models use, and a report that shows whether the share of answers that name your brand is growing.'],
      },
    ],
    cta: {
      tytul: 'Order an AI visibility audit',
      tekst: 'Tell us in the form which services you offer and in which cities you want to be recommended. Price: €235 net, credited toward the first month if you later choose a subscription.',
      przyciski: [
        { tekst: 'Order the audit for €235 net', kontakt: true, plan: 'audyt-ai', cta: 'geo_audyt_cta', glowny: true },
      ],
    },
    sources: [],
    updated: '2026-11-05',
    opublikowano: null,
  },
];

/** Wpis spoke'a po slugu PL w angielskiej wersji albo undefined. */
export function wpisPytaniaAiEn(slug) {
  return pytaniaAiEn.find((p) => p.slug === slug);
}

/** Wpis spoke'a dla języka: 'en' -> wersja angielska (gdy jest), inaczej polska z lib/pytaniaAi.js. */
export function wpisPytaniaAiWJezyku(slug, locale) {
  if (locale === 'en') return wpisPytaniaAiEn(slug);
  return pytaniaAi.find((p) => p.slug === slug);
}
