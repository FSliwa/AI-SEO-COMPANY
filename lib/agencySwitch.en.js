// EN copy of lib/agencySwitch.js (guide "Switching SEO agencies"). Same structure and the same
// number of checklist items as the PL data (CHECKLIST_COUNT must stay equal to the PL value:
// the emailed checklist PDF and the panel email quote it). Change both files together.
// The guide concerns agreements under Polish law; keep that explicit in the copy.

import { CHECKLIST as CHECKLIST_PL } from './agencySwitch';

export const CHECKLIST = [
  {
    title: 'Google accounts',
    items: [
      'Google Search Console: you are a verified owner, not just a user.',
      'Google Analytics 4: you have the Administrator role on both the account and the property.',
      'Google Tag Manager: you have account-level administrator rights and publish rights in the container.',
      'Google Business Profile: you are the primary owner.',
      'Google Ads: the account holds your billing details and your administrator access. Once the contract ends, unlink it from the agency’s manager account.',
      'Google Merchant Center (if you run an online store): you are an administrator.',
      'The accounts were created with a company address, not a private address of an agency employee.',
      'You have a written list of everyone with access to each account (you will remove them when the contract ends).',
    ],
  },
  {
    title: 'Domain and website',
    items: [
      'The domain is registered to your company and you have the login to the registrar’s panel.',
      'You have access to the hosting and to the DNS settings.',
      'You have an administrator account in the website system (e.g. WordPress), not just an editor account.',
      'You have a current backup of the website and the database.',
      'If the agency built the website, its code is in your repository or you have a copy of it.',
      '301 redirects from old URLs are documented and stay on the server.',
      'The robots.txt and sitemap.xml files sit on your server and nobody changes them when the agency leaves.',
    ],
  },
  {
    title: 'Content',
    items: [
      'The contract transfers the economic copyrights to the texts, photos and graphics to you (check the fields of exploitation).',
      'You have a list of the articles and subpages the agency prepared: URL and publication date.',
      'You know which sites host the guest and sponsored articles and whether they stay up after the contract ends.',
      'The texts, photos and graphics are on your server, not on the agency’s.',
      'You keep your own copy of the descriptions from your Google Business Profile and business directories.',
    ],
  },
  {
    title: 'Links',
    items: [
      'You have the full list of links acquired: linking page, target URL, date.',
      'You know which links are permanent (articles, directories, partners) and which are rented from the agency’s private network.',
      'The contract does not provide for removing links after it ends.',
      'You manually checked 10 random links from the list: they are still on the pages.',
      'You have an export of links from Search Console (the “Links” report) dated the day before the cooperation ended.',
      'You know whether the agency submitted a disavow file to Google, and you have a copy of it.',
    ],
  },
  {
    title: 'Data and reports',
    items: [
      'You have downloaded the monthly reports from the whole cooperation.',
      'You have the list of target keywords with ranking history (an export from the agency’s tool).',
      'You have saved an export of Search Console data (16 months) and GA4 data.',
      'You have the list of changes implemented and work planned.',
      'You have documented the conversion setup in GA4 and Google Ads: which events count as inquiries.',
      'After the contract ended, you removed the agency’s access from all accounts and changed the passwords.',
    ],
  },
];

export const CHECKLIST_COUNT = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

if (process.env.NODE_ENV !== 'production') {
  const plCount = CHECKLIST_PL.reduce((n, g) => n + g.items.length, 0);
  if (plCount !== CHECKLIST_COUNT) console.warn(`agencySwitch.en: checklist count ${CHECKLIST_COUNT} differs from PL ${plCount}`);
}

export const CONTRACT_CHECKS = [
  { title: 'Notice period', text: 'How long it is and when it starts running: from the day the notice is delivered or from the end of the month. One day of delay can extend the contract by a whole period.' },
  { title: 'Automatic renewal', text: 'Whether a fixed-term contract renews on its own, and by what date you must give notice to prevent that.' },
  { title: 'Exit fees', text: 'Contractual penalties, an early termination fee, a clawback of the discount for a long commitment. Work out the cost before you decide.' },
  { title: 'Content rights', text: 'Whether the texts, photos and graphics pass to you and, if so, from when (often only after the last invoice is paid).' },
  { title: 'Links after the contract ends', text: 'Whether the links are yours or rented. Links from the agency’s private network usually disappear with the contract, and with them part of your rankings.' },
];

export const STEPS = [
  { title: 'Take over the accounts before you send notice', text: 'Check who owns Search Console, GA4, Tag Manager, your Business Profile and Google Ads. Once you give notice, the agency has no reason to hurry.' },
  { title: 'Download the data and reports', text: 'Reports, the keyword list with ranking history, the list of links, the Search Console and GA4 exports. This is your history: without it, a new agency starts from zero.' },
  { title: 'Send notice in the form the contract requires', text: 'If the contract requires written form, send a registered letter; if it allows email, keep the delivery confirmation. Write down the date from which the notice period runs.' },
  { title: 'Watch the website during the notice period', text: 'Nobody should remove redirects, analytics tags or content, or change the website’s settings. Take a snapshot of the most important settings at the start of this period.' },
  { title: 'Close the access when the contract ends', text: 'Remove the agency’s users from every account, unlink your Ads account from its manager account, and change the passwords to your hosting and website system.' },
  { title: 'Monitor results for 8 weeks', text: 'Compare clicks and positions in Search Console week over week. A sudden drop after the contract ends usually has one cause: links disappeared or something was changed on the website.' },
];

export const FAQ = [
  {
    question: 'Will my rankings drop after I switch SEO agencies?',
    answer: 'Not necessarily. A drop after a change of agency usually has a specific cause: rented links disappear, content or redirects were removed, or something was changed on the website. If the accounts, content and links stay with you and the website does not change, there is no reason for rankings to fall.',
  },
  {
    question: 'When should I send notice to my SEO agency?',
    answer: 'After you have taken over the accounts and downloaded the data, but with a margin before the deadline set in the contract. Send it in the form the contract requires and keep the delivery confirmation.',
  },
  {
    question: 'Can the agency keep my Google accounts?',
    answer: 'If it created them under its own name, in practice yes, until it hands over the permissions. That is why you should check who owns Search Console, GA4 and your Business Profile before you give notice. Google has a procedure for taking over a profile, but it takes time and does not always succeed.',
  },
  {
    question: 'How do I get my Google Business Profile access back from an agency?',
    answer: 'First, ask the agency to grant you the primary owner role on your Google Business Profile. If it refuses or does not respond, use the access request option in the profile: the current owner has a few days to react, and if they do not, you can verify ownership of the profile yourself. Do this before you send notice.',
  },
  {
    question: 'As a sole proprietor, do I have consumer rights?',
    answer: 'Partly, possibly. Since 2021, under Polish law, a sole proprietor whose contract is not of a professional nature for them benefits from some consumer protection, including protection against unfair contract terms. It depends on the contract and your CEIDG entry, so if in doubt, ask a lawyer.',
  },
  {
    question: 'What do you check in the free review after a previous agency?',
    answer: 'We check who owns your Google accounts (Search Console, GA4, Business Profile), your list of links and content, what stays with you after notice is given, and your clicks and positions in Search Console. The call lasts 30 minutes, online. We do not assess the contract from a legal standpoint and we sell nothing during the call.',
  },
];
