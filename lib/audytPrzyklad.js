// Dane strony „SEO audit example” (/en/tools/seo-audit-example, 18.11.2026, p2-audyt-przyklad).
// Strona tylko po angielsku (lib/stronyTylkoEn.js). Czysty ESM bez importów.
//
// LICZBY PRZEBIEGU = odpowiedź API darmowego audytu na https://www.ai-seo-company.pl (jeden przebieg,
// 18.11.2026, 23:12 czasu warszawskiego = 22:12 UTC), skopiowane 1:1 z zapisanego JSON-a:
// ai-seo-prace/partia2/p2-audyt-przyklad/wynik-surowy.json. Nie poprawiać ani nie zaokrąglać.
// Reguły (tytuły, wagi) = lib/audytPrzykladReguly.js (z panelu: audyt.ts, audyt.en.ts).

export const DATA = '2026-11-18';
export const SCIEZKA_KLUCZ = '/narzedzia/seo-audit-example';
export const SCIEZKA_EN = '/en/tools/seo-audit-example';
export const OBRAZ = { src: '/images/narzedzia/audyt-przyklad/seo-audit-example-report.webp', width: 1230, height: 1700 };

export const RUN = {
  domena: 'www.ai-seo-company.pl',
  kiedy: '18 November 2026, 23:12 (Warsaw time)',
  sekundy: 26, // czas do wyniku w przeglądarce: 25,98 s
  stron: 25,
  regul: 49,
  wynik: 95,
  bledy: 0,
  ostrzezenia: 3,
  uwagi: 0,
  poprzedni: { data: '14 November 2026', wynik: 94, zmiana: 1 },
  kategorie: {
    techniczne: { wynik: 100, zmiana: 0 },
    tresc: { wynik: 100, zmiana: 3 },
    wydajnosc: { wynik: 77, zmiana: 2 },
    ai: { wynik: 100, zmiana: 0 },
  },
  psi: { wydajnosc: 83, seo: 100, dostepnosc: 97, praktyki: 100, pomiary: [86, 83, 76] },
  obrazyKb: 193,
  obrazyNajwieksze: ['50 KB', '49 KB (feature.webp)', '35 KB'],
  lcp: '3.2 s',
};

// Wagi kategorii w ocenie: panel audyt.ts:443 (stałe AUDYT.wagi w lib/narzedziaLiczby.js).
export const KATEGORIE = [
  { id: 'techniczne', nazwa: 'Technical SEO', waga: 35, regul: 21 },
  { id: 'tresc', nazwa: 'Content', waga: 30, regul: 12 },
  { id: 'wydajnosc', nazwa: 'Performance', waga: 20, regul: 10 },
  { id: 'ai', nazwa: 'AI readiness', waga: 15, regul: 6 },
];

export const WAGI_NAZWY = { blad: 'Error', ostrzezenie: 'Warning', uwaga: 'Notice' };
// Reguły, które w tym przebiegu zgłosiły problem.
export const ZGLOSZONE = ['obrazy_niezoptymalizowane', 'psi_srednia', 'lcp'];

export const LEAD = 'This SEO audit example is a real report, not a mock-up. On 18 November 2026 our free SEO audit checked 25 pages of ai-seo-company.pl against 49 rules and scored it 95 out of 100: 0 errors and 3 warnings, all about mobile speed. Below are every number, each issue with its fix, and the format a report should follow.';

// Trzy problemy z przebiegu: teksty reguł z panelu (audyt.en.ts), wartości z odpowiedzi API.
export const PROBLEMY = [
  {
    id: 'obrazy_niezoptymalizowane',
    tytul: 'Images to optimise (over 150 KB to save)',
    sprawdza: 'Whether the images on the home page could be much smaller. The rule reports a problem when PageSpeed Insights estimates more than 150 KB of possible savings, because old formats, files larger than the space they fill and weak compression all slow the first screen down.',
    zmierzono: `Possible savings: ${RUN.obrazyKb} KB. The three biggest single savings: ${RUN.obrazyNajwieksze.join(', ')}. A file that is already WebP, like feature.webp, can still be flagged when it is larger than its slot or compressed too lightly.`,
    napraw: 'Save images as WebP or AVIF, at their display size (srcset for different screens) and with about 75-85% compression.',
  },
  {
    id: 'psi_srednia',
    tytul: 'Mobile performance needs improvement (PageSpeed 50-89)',
    sprawdza: 'The mobile performance score from PageSpeed Insights. Lighthouse calls 50 to 89 “Needs Improvement” and 90 to 100 “Good”.',
    zmierzono: `${RUN.psi.wydajnosc} out of 100: the median of three runs (${RUN.psi.pomiary.join(', ')}). The runs differ by 10 points, which is why the audit takes three and does not trust a single one.`,
    napraw: 'Start with the largest element (LCP): a hero image in WebP with preload and without lazy loading.',
  },
  {
    id: 'lcp',
    tytul: 'The largest element loads too slowly (LCP over 2.5 s)',
    sprawdza: 'Largest Contentful Paint, the time it takes for the main content to appear and one of Google’s Core Web Vitals. Google treats 2.5 seconds or less as good and more than 4 seconds as poor, measured at the 75th percentile of page loads.',
    zmierzono: `${RUN.lcp} in this run, so in the “needs improvement” band between 2.5 and 4 seconds. Google applies its thresholds to many page loads, so one measurement is a pointer, not a verdict.`,
    napraw: 'Speed up the image or heading on the first screen: a smaller file, preload, a faster server.',
  },
];

// Format raportu: co powinien zawierać i czy ten przykład to ma.
export const FORMAT = [
  { id: 'podsumowanie', sekcja: 'Summary and score', zawiera: 'One overall number, a score per category and the count of issues by severity.', tutaj: `Yes: ${RUN.wynik}/100, four category scores, ${RUN.bledy} errors, ${RUN.ostrzezenia} warnings, ${RUN.uwagi} notices.` },
  { id: 'zakres', sekcja: 'Scope and method', zawiera: 'The domain, the date, how many pages were checked and which tools and data sources were used, so a reader knows what the result covers.', tutaj: `Yes: ${RUN.stron} pages, ${RUN.regul} rules, our AISEOCompanyAudit crawler and Google PageSpeed Insights, date and time of the run.` },
  { id: 'ustalenia', sekcja: 'Findings by severity', zawiera: 'Errors first, then warnings, then notices, each with a plain-language title.', tutaj: 'Yes: three warnings, no errors, no notices.' },
  { id: 'dowody', sekcja: 'Evidence', zawiera: 'The measured value or the affected URLs behind each finding.', tutaj: 'Measured values (193 KB, 83/100, 3.2 s). Affected URLs: not applicable, because all three rules concern the home page as a whole.' },
  { id: 'naprawa', sekcja: 'Fix instructions', zawiera: 'What to change, in words a developer can act on.', tutaj: 'Yes: one instruction per issue.' },
  { id: 'priorytety', sekcja: 'Priorities', zawiera: 'The order of work, with the biggest effect first.', tutaj: 'Severity decides the order. With only warnings, start with the one that moves the score most: mobile performance.' },
  { id: 'zmiana', sekcja: 'Change since the last audit', zawiera: 'A comparison with the previous run, overall and per category.', tutaj: `Yes: +${RUN.poprzedni.zmiana} against ${RUN.poprzedni.data} (${RUN.poprzedni.wynik}/100), with a change per category.` },
  { id: 'granice', sekcja: 'Limits', zawiera: 'What the audit did not check, stated plainly.', tutaj: 'Yes: see “What an automated audit cannot do” below.' },
];

export const KROKI_CZYTANIA = [
  { id: 'kategorie', h: 'Read the category scores before the total.', t: 'A 95 hides a 77. The total is a weighted average, so one weak category is softened by three strong ones. Here the only category below 100 is performance.' },
  { id: 'waga', h: 'Separate errors, warnings and notices.', t: 'In this tool an error rule is worth 5 to 15 points, a warning 2 to 8 and a notice 1 or 2, before a multiplier of 3. One failed error rule can cost a category up to 45 points, which is why errors come first.' },
  { id: 'zakres', h: 'Check whether a problem is site-wide or per page.', t: 'A site-wide rule, such as the three above, costs its full penalty. For a per-page rule, one affected page already costs 40% of the penalty, and the cost grows with the share of pages affected.' },
  { id: 'progi', h: 'Compare measured values with Google’s thresholds.', t: 'An LCP of 3.2 s is not good against Google’s 2.5 s, and a PageSpeed score of 83 is in the “Needs Improvement” band, below the 90 that Lighthouse calls “Good”.' },
  { id: 'zmiana', h: 'Compare with the previous audit and allow for noise.', t: 'The score moved from 94 to 95 in four days. Speed measurements vary between runs (86, 83 and 76 here), so treat a change of a few points in performance as noise unless it repeats.' },
  { id: 'naprawa', h: 'Fix in order, then run the audit again.', t: 'Fix errors first, then the warnings with the biggest effect, then run the audit again to confirm the change in the score.' },
];

export const LIMITY = [
  `It checks a sample of up to 25 pages: the home page, the links on it and URLs from the sitemap. On a large website most pages stay outside the audit.`,
  'It measures speed in PageSpeed Insights on mobile, for the home page only. Other templates, such as long articles or product pages, can behave differently.',
  'It reads the HTML as the server sends it, without running JavaScript, the way most AI bots do. Content added by scripts may be invisible to it.',
  'It looks for duplicate titles and descriptions only among the pages it checked, and it checks external links only for 404 and 410 codes.',
  'It does not check links pointing to your site, keywords, Google rankings or Search Console data.',
  'It cannot judge whether a page answers what a searcher wants, whether the content is accurate and useful, or how you compare with named competitors. A person has to read the pages for that.',
];

export const FAQ = [
  {
    question: 'What should an SEO audit report include?',
    answer: 'A summary with a score, the scope and method, findings ordered by severity, the evidence behind each finding, fix instructions, priorities, a comparison with the previous audit and the limits of the check. The table above shows each part in this real report.',
  },
  {
    question: 'Is this SEO audit example a real report?',
    answer: 'Yes. It is the result of one run of our free SEO audit on our own website on 18 November 2026, 23:12 Warsaw time. The numbers are copied from the tool’s response, including the three warnings and the 77 in performance. You can run the same audit on your site and compare.',
  },
  {
    question: 'What is a good SEO audit score?',
    answer: 'In this tool, 80 or more means the basics are fine and it is worth turning to content and links. From 50 to 79 there are problems that limit visibility, so start with errors, then warnings. Below 50 there are technical gaps that can stop Google from indexing the site. Scores from other tools use other formulas and are not comparable.',
  },
  {
    question: 'Does a score of 95 mean the site has no SEO problems?',
    answer: 'No. It means that 46 of 49 automated rules reported nothing on the 25 pages checked. The audit does not look at backlinks, rankings, search intent or content quality, and our own report still has three performance warnings to fix.',
  },
  {
    question: 'Can I download an SEO audit template?',
    answer: 'This page is not a download: it shows a finished report and the format a report should follow. For the checks to fill it with, use our SEO checklist template, a free PDF with 50 points.',
  },
];

export const ZRODLA = [
  { url: 'https://web.dev/articles/lcp', nazwa: 'web.dev: Largest Contentful Paint (LCP), thresholds of 2.5 and 4.0 seconds at the 75th percentile', data: '2026-11-18' },
  { url: 'https://developer.chrome.com/docs/lighthouse/performance/performance-scoring', nazwa: 'Chrome for Developers: Lighthouse performance scoring (0-49 Poor, 50-89 Needs Improvement, 90-100 Good)', data: '2026-11-18' },
];
