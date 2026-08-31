import { articleLanguages, articleRobots } from '@/lib/blogPosts';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Technical SEO Audit Checklist for Digital Marketers'
      : 'Audyt techniczny SEO: checklista z progami liczbowymi',
    description: locale === 'en'
      ? 'Run a technical SEO audit that ends in a prioritized fix list: crawl, indexability, Core Web Vitals thresholds, and schema that still earns a result.'
      : 'Jak zrobić audyt techniczny SEO, który kończy się listą napraw: crawl, indeksacja, progi Core Web Vitals i kryteria binarne zamiast ocen na oko.',
    alternates: {
      canonical: locale === 'en'
        ? `https://www.ai-seo-company.pl/en/blog/technical-seo-audit-checklist`
        : `https://www.ai-seo-company.pl/blog/audyt-techniczny-seo`,
      languages: articleLanguages('/blog/technical-seo-audit-checklist', 'https://www.ai-seo-company.pl/blog/audyt-techniczny-seo', 'https://www.ai-seo-company.pl/en/blog/technical-seo-audit-checklist')
    },
    robots: articleRobots('/blog/technical-seo-audit-checklist', locale),
  };
}

import Header from '@/components/Header';
import ArticleSchema from '@/components/ArticleSchema';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import ArticleTOC from '@/components/ArticleTOC';
import BlogCTA from '@/components/BlogCTA';
import { Link } from '@/i18n/routing';

export default async function ArticleTechnicalSeoAuditChecklist({ params }) {
  const { locale } = await params;

  if (locale === 'pl') {
    return <ArtykulAudytTechnicznySeo locale={locale} />;
  }

  const tocItems = [
    { id: 'what-it-checks', title: 'What Does a Technical SEO Audit Actually Check?' },
    { id: 'pass-criteria', title: "Binary Pass Criteria, So Findings Aren't a Matter of Opinion" },
    { id: 'workflow', title: 'How Does the Audit Workflow Run Step by Step?' },
    { id: 'tools', title: 'Which Tools and Scans Should You Run?' },
    { id: 'prioritize', title: 'How Do You Prioritize What to Fix First?' },
    { id: 'reporting-cadence', title: 'How Should You Report Results and Set Audit Cadence?' },
    { id: 'fastest-wins', title: 'What Are the Fastest Wins in a Technical Audit?' },
    { id: 'our-process', title: 'How AI SEO COMPANY Runs a Technical Audit' },
    { id: 'faq', title: 'Frequently Asked Questions' },
    { id: 'sources', title: 'Sources' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema slug="/blog/technical-seo-audit-checklist" locale={locale} />

      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                SEO Analysis
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                August 26, 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              Technical SEO Audit Checklist for Digital Marketers
            </h1>
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                A technical SEO audit finds and ranks the crawl, indexing, performance, and structured-data issues blocking a site's visibility, then tells you which one to fix first. If you do nothing else today, run a full crawl alongside a Google Search Console check. That combination surfaces most blockers fast, whether it's a Core Web Vitals failure, a rogue robots.txt rule, or an XML sitemap full of dead URLs.
              </p>

              <ul>
                <li>Crawl the site with a desktop crawler such as Screaming Frog or Sitebulb</li>
                <li>Pull coverage and performance data from Search Console — the full 16 months it retains</li>
                <li>Flag anything blocking indexing before touching page speed</li>
              </ul>

              <p>That last point is the one most audits get wrong, and it is the reason this guide runs in the order it does.</p>

              <h2 id="key-takeaways">Key Takeaways</h2>
              <p>A website SEO audit checklist only pays off when indexing and crawl issues get fixed before performance work begins, since Google can't rank a page it can't see.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Point</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Fix indexing before speed</td>
                      <td>Resolve robots.txt and noindex issues before spending time on Core Web Vitals.</td>
                    </tr>
                    <tr>
                      <td>Give every check a threshold</td>
                      <td>Server response under 0.5 s, HTML under 0.5 MB, URLs under 140 characters, depth within three clicks — numbers make findings comparable between quarters.</td>
                    </tr>
                    <tr>
                      <td>Score with ICE, not gut feel</td>
                      <td>Impact × Confidence × Ease, each on a 1–10 scale, decides the order — not the tool's default sort.</td>
                    </tr>
                    <tr>
                      <td>Know the actual thresholds</td>
                      <td>LCP under 2.5 s, INP under 200 ms, CLS under 0.1, measured on field data rather than a Lighthouse run.</td>
                    </tr>
                    <tr>
                      <td>Check what schema still earns a result</td>
                      <td>FAQ and HowTo rich results have been withdrawn. Validate what remains: Article, Product, BreadcrumbList, VideoObject.</td>
                    </tr>
                    <tr>
                      <td>Re-audit on a cadence</td>
                      <td>Lightweight weekly crawls, a full audit quarterly, and one within 48 hours of every major deploy.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ArticleTOC items={tocItems} />

              <h2 id="what-it-checks">What Does a Technical SEO Audit Actually Check?</h2>
              <p>A real audit works through several distinct categories, and skipping any one of them leaves ranking potential on the table. The <a href="https://crawlraven.com/blog/technical-seo-audit-checklist" target="_blank" rel="noopener noreferrer">CrawlRaven checklist</a> organises this into individual checks across those categories, which is a useful mental model even if you build your own list from scratch.</p>

              <ul>
                <li><strong>Crawlability and robots rules.</strong> Robots.txt syntax, server response codes, and whether bots can reach the pages that matter.</li>
                <li><strong>Sitemaps and discovery.</strong> XML sitemap validity, segmentation by content type, and whether it contains only indexable 200 URLs.</li>
                <li><strong>Crawl budget.</strong> Where bots actually spend their requests. On any site past a few thousand URLs, parameter URLs, redirect chains and noindexed pages quietly absorb crawl that should go to pages you update. Manage it from log data or the Crawl Stats report, not from intuition.</li>
                <li><strong>Indexing signals.</strong> Noindex tags, canonical conflicts, and X-Robots-Tag headers that quietly remove pages from the index.</li>
                <li><strong>Rendering and JavaScript.</strong> Whether Google sees server-rendered content or has to execute JS to find your text. Verify with the rendered-HTML view in URL Inspection after every significant front-end deploy, not once a year.</li>
                <li><strong>Redirects and link health.</strong> Broken links, redirect chains, and orphan pages that exist only in the sitemap. Also check the distribution: your commercially important pages should have the most internal links pointing at them, and in most audits they do not.</li>
                <li><strong>Performance and Core Web Vitals.</strong> LCP, INP and CLS — see the thresholds below and our guide to <Link href="/blog/core-web-vitals-a-pozycje-google">Core Web Vitals and rankings</Link>.</li>
                <li><strong>Structured data.</strong> Types that still produce a search feature, validated against <a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer">Schema.org</a> and the Rich Results Test.</li>
                <li><strong>Security, mobile, and duplicate content.</strong> HTTPS with no mixed content, mobile usability, and internal duplication.</li>
              </ul>

              <p>One more layer belongs on this list now: AI search readiness. That means checking whether AI crawlers can reach your content, whether critical text is delivered as HTML rather than client-side JavaScript, and whether your pages are structured so an answer engine can extract and attribute them.</p>

              <h2 id="pass-criteria">Binary Pass Criteria, So Findings Aren't a Matter of Opinion</h2>
              <p>A technical SEO checklist is only useful when every item has a threshold. Most tell you to "check redirects" and leave the judgement to you. Give each check a number instead — that turns a site audit checklist into something two people can score identically, and makes quarter-on-quarter comparison mean something.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Check</th>
                      <th>Pass criterion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Server response time</td>
                      <td>under 0.5 s on average; watch 0.5–1 s; fix above 1 s</td>
                    </tr>
                    <tr>
                      <td>Host redirects</td>
                      <td>one www/non-www version and HTTP→HTTPS via a single 301, no chains or loops</td>
                    </tr>
                    <tr>
                      <td>HTML weight and compression</td>
                      <td>gzip or brotli enabled; HTML under 0.5 MB</td>
                    </tr>
                    <tr>
                      <td>Mixed content</td>
                      <td>zero HTTP resources on HTTPS pages</td>
                    </tr>
                    <tr>
                      <td>Titles and descriptions</td>
                      <td>unique across the whole site, no duplicates and no blanks; length within the SERP display limit</td>
                    </tr>
                    <tr>
                      <td>Headings</td>
                      <td>exactly one H1 per page; H2/H3 hierarchy with no skipped levels</td>
                    </tr>
                    <tr>
                      <td>URL hygiene</td>
                      <td>no dynamic parameters or session IDs on indexable URLs; under 140 characters; no more than five directory levels</td>
                    </tr>
                    <tr>
                      <td>Click depth</td>
                      <td>every important page reachable within three clicks of the home page</td>
                    </tr>
                    <tr>
                      <td>Internal anchors</td>
                      <td>the same anchor text never points to two different pages</td>
                    </tr>
                    <tr>
                      <td>Sitemap</td>
                      <td>only indexable, canonical 200 URLs; no URL that exists in the sitemap and nowhere else</td>
                    </tr>
                    <tr>
                      <td>Internal links</td>
                      <td>point directly at the destination, never through a 301</td>
                    </tr>
                    <tr>
                      <td>Crawlability</td>
                      <td>every exclusion from the index is a decision, not a side effect of configuration</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Server response time deserves a note. It sits at the top of this table because it multiplies through everything else: a slow origin caps LCP, throttles crawl rate, and drags conversion. It is also the single check most audits skip, because crawlers report it as a number rather than as an error.</p>

              <h3>The Core Web Vitals thresholds, precisely</h3>
              <p>A website performance audit starts with three numbers, not with a Lighthouse score. Vague advice to "improve speed" is why this work stalls. The three metrics and their pass thresholds are:</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Threshold</th>
                      <th>What it measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LCP</td>
                      <td>under 2.5 s</td>
                      <td>when the largest content element finishes rendering</td>
                    </tr>
                    <tr>
                      <td>INP</td>
                      <td>under 200 ms</td>
                      <td>responsiveness to user input across the whole visit</td>
                    </tr>
                    <tr>
                      <td>CLS</td>
                      <td>under 0.1</td>
                      <td>unexpected layout shift</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Two things audits routinely get wrong here. <strong>INP replaced FID in March 2024</strong>, so any checklist still listing First Input Delay is out of date. And <strong>FCP is not a Core Web Vital</strong> — it is a useful diagnostic, but it does not belong in this table. Report on field data from the Core Web Vitals report in Search Console or the CrUX dataset; Lighthouse is for debugging, not for reporting.</p>

              <h3>A note on FAQ and HowTo markup</h3>
              <p>Plenty of audit checklists still ask you to validate FAQ and HowTo schema. That instruction is obsolete and worth removing from your template.</p>
              <p>Google withdrew HowTo rich results from desktop in September 2023. FAQ rich results were restricted to government and health sites in August 2023 and deprecated entirely on 7 May 2026 — the Search Console report and Rich Results Test support went in June 2026, and API support in August 2026. Neither type produces a search feature today.</p>
              <p><code>FAQPage</code> remains a valid Schema.org type and existing markup can stay; Google has said unused structured data causes no problems. But it is no longer something to flag as a gap in an audit. Validate what still earns a result: Article, Product with Offer, BreadcrumbList, VideoObject, Organization.</p>

              <p><strong>Pro Tip:</strong> <em>Check robots.txt for accidental blocks on AI crawlers such as GPTBot, OAI-SearchBot and Claude-SearchBot. Plenty of sites block these by default and never notice. Blocking them can be a deliberate business decision — it should never be an accident of configuration.</em></p>

              <h2 id="workflow">How Does the Audit Workflow Run Step by Step?</h2>
              <p>This is how to perform a technical SEO audit end to end. The SEO audit steps below run in this order for a reason: audits should confirm that Google can reach a page before anyone optimises how fast it loads. Seoxpert's audit framework warns against the reverse order for good reason: performance work on a noindexed page produces nothing. Follow the sequence.</p>

              <ol>
                <li><strong>Crawl and sample.</strong> Run a full site crawl supported by Search Console data and server logs. Deliverable: a crawl inventory spreadsheet with every URL, its status, canonical and indexability.</li>
                <li><strong>Diagnose indexability.</strong> Identify noindex tags, canonical conflicts, and gaps in sitemap coverage. Every URL excluded from the index should be excluded by decision, not by accident. Deliverable: an indexability report.</li>
                <li><strong>Diagnose performance.</strong> Assess Core Web Vitals on real templates using field data. Deliverable: prioritised fixes with metrics and screenshots.</li>
                <li><strong>Score and group.</strong> Rank findings by impact, confidence and ease, then group them into developer-ready batches.</li>
                <li><strong>Verify and monitor.</strong> Confirm fixes in Search Console and in field data, then set up recurring crawls.</li>
              </ol>

              <p>Each step produces something concrete you can hand off, which is the difference between an audit and a list of observations.</p>

              <h2 id="tools">Which Tools and Scans Should You Run?</h2>
              <p>No single tool covers a full SEO technical analysis, so you combine outputs by design rather than by accident.</p>

              <ul>
                <li><strong>A desktop crawler</strong> for discovery. It should flag JS-rendering issues, since a lot of modern frameworks hide content from bots that don't execute scripts.</li>
                <li><strong>Search Console and Bing Webmaster Tools</strong> for indexation status and crawl errors straight from the source. Search Console retains 16 months, which is the minimum you need to compare a period against the same period last year.</li>
                <li><strong>Lighthouse or PageSpeed Insights</strong> for debugging, paired with the Core Web Vitals report or CrUX for the numbers you actually report.</li>
                <li><strong>Server log analysis</strong> to see how bots behave rather than how you assume they behave, and to catch orphan pages crawlers never visit. Quarterly is enough for most sites.</li>
                <li><strong>A continuous crawl tool</strong> that re-runs on a schedule, so regressions surface between quarterly audits rather than at the next one.</li>
                <li><strong>The Rich Results Test</strong> to validate structured data before it ships, catching errors that would otherwise sit live for months.</li>
              </ul>

              <h2 id="prioritize">How Do You Prioritize What to Fix First?</h2>
              <p>Two axes are not enough. Scoring by impact and effort alone is how a single unverified crawl warning ends up at the top of a roadmap. Add a third.</p>
              <p><strong>Impact (1–10).</strong> Estimate it in a business metric — revenue, leads, pipeline — not in sessions. A robots.txt line blocking /blog/ scores high because it removes a whole section from the index.</p>
              <p><strong>Confidence (1–10).</strong> How well is the finding evidenced? A blocker confirmed in both the crawl and Search Console scores high. A warning from one tool, with nothing corroborating it, scores low. Lower confidence when you are relying on a best practice rather than on your own data.</p>
              <p><strong>Ease (1–10).</strong> Anything requiring a developer sprint scores lower than something you can ship yourself. A template-level Core Web Vitals rewrite is high impact and low ease; a missing alt attribute is the opposite.</p>
              <p>Multiply the three. Sort descending, take as many items as the quarter realistically absorbs, and review the rest next quarter — anything that has not been picked up in two consecutive quarters is telling you its real score was lower than it looked.</p>
              <p>Present each item to non-technical stakeholders with an expected outcome, a time estimate, and the risk of leaving it alone. That framing gets budget approved faster than a raw list of errors ever will.</p>

              <p>Pro Tip: <em>If a stakeholder asks "what happens if we don't fix this," have a one-line answer ready for every top-tier item before the meeting starts.</em></p>

              <h2 id="reporting-cadence">How Should You Report Results and Set Audit Cadence?</h2>
              <p>A report earns its keep when it reads as an SEO health assessment over time, not as a snapshot. Track indexable page counts, coverage errors, the LCP/INP/CLS distribution, crawl errors, redirect chains, and structured-data errors.</p>

              <ul>
                <li>Health score chart showing overall site condition at a glance</li>
                <li>Issue distribution by category, so stakeholders see where problems cluster</li>
                <li>Before-and-after Core Web Vitals trends tied to specific fixes</li>
              </ul>

              <p>Confirm fixes in both Search Console and field data before marking them complete — a lab test passing is not the same as real users experiencing the improvement.</p>
              <p>On cadence, three rhythms work together: <strong>a lightweight crawl weekly</strong>, so a regression shows up as a jump in the problem count rather than as a traffic drop; <strong>a full audit quarterly</strong>, including logs; and <strong>a comparison crawl within 48 hours of any major deploy</strong>. Most SEO disasters are unintended side effects of a release, caught too late.</p>
              <p>Cadence catches regressions. Preventing them is a separate move: put SEO into the <strong>definition of done</strong> for front-end and infrastructure changes. Four conditions, each testable before a release ships — status codes still 200 or 301 as intended, meta robots and canonical unchanged unless the change was deliberate, critical content present in the rendered DOM, Core Web Vitals within the performance budget agreed with the developers. A release that fails any of the four does not go out. That single agreement removes more audit findings than any crawl schedule.</p>

              <h2 id="fastest-wins">What Are the Fastest Wins in a Technical Audit?</h2>
              <p>Some fixes take an afternoon and move the needle within days. These five are worth tackling before anything else in a website optimization review.</p>

              <ol>
                <li>Revert an accidental sitewide Disallow or template-level noindex, then request re-crawling.</li>
                <li>Fix self-referencing canonical mismatches at the template level so pages stop competing with themselves.</li>
                <li>Collapse multi-hop redirect chains into a single direct 301, and point internal links at the final destination.</li>
                <li>Preload the hero image, convert it to a next-gen format, and set explicit width and height to cut LCP and CLS at once.</li>
                <li>Defer non-critical third-party scripts and move analytics off the main thread to improve INP.</li>
              </ol>

              <p>None of these requires a rebuild, all five ship in a single sprint, and each has a measurable before-and-after number you can put in a report.</p>

              <h2 id="our-process">How AI SEO COMPANY Runs a Technical Audit</h2>
              <p>Our process runs discovery crawl, indexability triage, prioritised remediation, verification, and ongoing monitoring, in that order, for the reason outlined above: performance work on pages Google cannot see spends budget without moving anything.</p>

              <ul>
                <li>Crawl inventory covering every indexable and non-indexable URL</li>
                <li>Fix list scored by impact, confidence and ease</li>
                <li>Developer-ready tickets with testable acceptance criteria, not vague recommendations</li>
                <li>A verification report confirming fixes actually landed</li>
                <li>Weekly automated crawls between audits, so regressions surface in days rather than at the next quarterly review</li>
              </ul>

              <p>The biggest waste we see is teams rewriting templates for Core Web Vitals while a noindex tag or a robots.txt rule is still sitting there removing the page from the index. Discovery first. Speed matters once Google can see the page.</p>
              <p>Audits run inside a monthly subscription alongside the rest of the SEO work; in exceptional cases we scope one as a standalone project, quoted per scope. You can see what each engagement level includes on the <Link href="/pozycjonowanie-stron-internetowych">SEO services page</Link>, where completed projects are published as growth models with the traffic and revenue changes behind them. Results depend on your starting position and how much of the fix list actually ships — no agency can guarantee an outcome.</p>
              <p>To start, request a scoped <Link href="/audyt-seo">SEO audit</Link>. We reply to enquiries in under two hours and send an initial proposal within 24 hours.</p>

              <h2 id="faq">Frequently Asked Questions</h2>

              <h3>We're migrating to a new domain. When should we audit?</h3>
              <p>Twice: once on the staging environment before launch, to catch noindex tags and blocks that would otherwise ship to production, and again daily for the first four weeks after. A drop of 10–20% for two to six weeks is common and not by itself a sign of failure. No recovery after eight weeks means something is wrong with the redirect map or index coverage, and that is when you go looking rather than waiting.</p>

              <h3>How long does a site audit take?</h3>
              <p>A single-domain audit typically takes a few days to a week, depending on site size and whether log-file analysis is included. An enterprise SEO audit on a site with millions of URLs takes longer and usually needs a modular approach rather than one full crawl.</p>

              <h3>How often should I re-audit?</h3>
              <p>Lightweight crawls weekly, a full audit quarterly, and an extra comparison crawl within 48 hours of any major deploy, redesign, or migration.</p>

              <h3>What's the difference between an on page SEO checklist and a technical audit checklist?</h3>
              <p>An on page SEO checklist covers content elements — titles, headings, keyword coverage. A technical audit covers crawlability, indexing, rendering, and infrastructure, which content-level fixes cannot touch.</p>

              <h3>Do I need both an automated crawler and manual checks?</h3>
              <p>Yes. Automated scans catch volume issues like broken links and missing tags fast, but manual verification catches context-specific problems — a canonical tag that is technically valid while pointing at the wrong page, for instance.</p>

              <h3>Should I still add FAQ schema during an audit?</h3>
              <p>Not as a ranking or SERP tactic. FAQ rich results were deprecated on 7 May 2026 and HowTo in 2023. Keep briefing FAQ content — a visible block of real questions with direct answers — but stop treating the markup as a finding.</p>

              <h3>What questions should I ask before hiring a technical SEO specialist?</h3>
              <p>Ask for a sample crawl inventory, how they score and order fixes, and whether they verify results after implementation. A specialist who cannot show a fix-verification process is skipping the step that proves the audit worked.</p>

              <h2 id="sources">Sources</h2>

              <h3>Google documentation</h3>
              <ul>
                <li>Google Search Central — Core Web Vitals; INP replaced FID as a Core Web Vital in March 2024</li>
                <li>Google Search Central — FAQPage structured data, deprecation notice dated 7 May 2026; Search Console and Rich Results Test support removed June 2026, API support August 2026</li>
                <li>Google Search Central — HowTo structured data deprecated on desktop, September 2023</li>
                <li>Google Search Console Help — 16-month data retention</li>
              </ul>

              <h3>Industry guides</h3>
              <ul>
                <li><a href="https://crawlraven.com/blog/technical-seo-audit-checklist" target="_blank" rel="noopener noreferrer">Technical SEO Audit Checklist 2026 | CrawlRaven</a></li>
                <li><a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer">Schema.org — Getting Started</a></li>
              </ul>

              <p><em>Last reviewed: August 2026. Structured data guidance reflects Google documentation as of that date.</em></p>

              <h2 id="recommended">Recommended</h2>
              <ul>
                <li><Link href="/blog/analiza-konkurencji-seo-przewodnik">SEO Competitor Analysis: A Step-by-Step Guide</Link> — how to pick the domains worth benchmarking against</li>
                <li><Link href="/blog/content-gap-analysis">Content Gap Analysis: A Practical Guide</Link> — the content side of the same audit cycle</li>
                <li><Link href="/blog/core-web-vitals-a-pozycje-google">Why Responsiveness and Core Web Vitals Matter for Rankings</Link> — the performance layer in depth</li>
              </ul>

              <BlogCTA
                locale={locale}
                currentSlug="/blog/technical-seo-audit-checklist"
                customCtaTitleEn="Need a technical audit?"
                customCtaTextEn="Request a scoped SEO audit. We reply to enquiries in under two hours and send an initial proposal within 24 hours."
              />
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}

function ArtykulAudytTechnicznySeo({ locale }) {
  const tocItems = [
    { id: 'co-sprawdza-audyt', title: 'Co sprawdza audyt techniczny SEO' },
    { id: 'kryteria-binarne', title: 'Kryteria binarne, żeby wynik nie był kwestią opinii' },
    { id: 'krok-po-kroku', title: 'Jak zrobić audyt SEO krok po kroku' },
    { id: 'narzedzia', title: 'Jakie narzędzia i skany uruchomić' },
    { id: 'priorytety', title: 'Jak ustalić, co naprawić najpierw' },
    { id: 'raportowanie-rytm', title: 'Jak raportować wyniki i ustawić rytm audytów' },
    { id: 'najszybsze-wygrane', title: 'Najszybsze wygrane audytu technicznego' },
    { id: 'jak-przeprowadzamy', title: 'Jak AI SEO COMPANY przeprowadza audyt' },
    { id: 'faq', title: 'Najczęściej zadawane pytania' },
    { id: 'zrodla', title: 'Źródła' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema
        slug="/blog/technical-seo-audit-checklist"
        locale={locale}
        url="/blog/audyt-techniczny-seo"
      />

      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Techniczne SEO
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                26 Sierpnia 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              Audyt techniczny SEO: checklista z progami liczbowymi
            </h1>
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                Audyt techniczny SEO znajduje i porządkuje problemy z crawlowaniem, indeksacją, wydajnością i danymi strukturalnymi, które blokują widoczność strony — a potem mówi, co naprawić najpierw. Jeśli masz dziś zrobić tylko jedną rzecz: uruchom pełny crawl i zestaw go z danymi z Google Search Console. Ta para wyłapuje większość blokerów szybko, niezależnie od tego, czy problemem jest Core Web Vitals, błędna reguła w robots.txt, czy sitemapa pełna martwych adresów.
              </p>

              <ul>
                <li>Przecrawluj serwis crawlerem desktopowym — Screaming Frog sprawdza do 500 adresów bezpłatnie, co małej firmowej stronie zwykle wystarcza</li>
                <li>Pobierz dane o indeksacji i skuteczności z Search Console — pełne 16 miesięcy, które przechowuje</li>
                <li>Oznacz wszystko, co blokuje indeksację, zanim dotkniesz szybkości ładowania</li>
              </ul>

              <p>Ten ostatni punkt to rzecz, którą większość audytów robi w złej kolejności — i powód, dla którego ten poradnik idzie w takiej, a nie innej.</p>

              <h2 id="kluczowe-wnioski">Kluczowe wnioski</h2>
              <p>Checklista audytu SEO zwraca się tylko wtedy, gdy problemy z indeksacją naprawiasz przed pracą nad wydajnością — Google nie zrankuje strony, której nie widzi.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Zasada</th>
                      <th>Szczegóły</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Najpierw indeksacja, potem szybkość</td>
                      <td>Robots.txt i noindex rozwiąż, zanim poświęcisz czas na Core Web Vitals.</td>
                    </tr>
                    <tr>
                      <td>Każdy check ma próg</td>
                      <td>Serwer poniżej 0,5 s, HTML poniżej 0,5 MB, URL do 140 znaków, głębokość do 3 kliknięć — liczby czynią wyniki porównywalnymi między kwartałami.</td>
                    </tr>
                    <tr>
                      <td>Priorytety licz ICE, nie na oko</td>
                      <td>Impact × Confidence × Ease, każdy czynnik 1–10, o kolejności decyduje iloczyn.</td>
                    </tr>
                    <tr>
                      <td>Znaj aktualne progi CWV</td>
                      <td>LCP poniżej 2,5 s, INP poniżej 200 ms, CLS poniżej 0,1 — z danych polowych, nie z pojedynczego testu Lighthouse.</td>
                    </tr>
                    <tr>
                      <td>Sprawdzaj schemę, która wciąż coś daje</td>
                      <td>Wyniki rozszerzone FAQ i HowTo zostały wycofane. Waliduj to, co zostało: Article, Product, BreadcrumbList.</td>
                    </tr>
                    <tr>
                      <td>Audytuj w rytmie</td>
                      <td>Lekki crawl co tydzień, pełny audyt co kwartał i crawl porównawczy do 48 godzin po każdym większym wdrożeniu.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ArticleTOC items={tocItems} />

              <h2 id="co-sprawdza-audyt">Co sprawdza audyt techniczny SEO</h2>
              <p>Rzetelny audyt strony internetowej przechodzi przez kilka odrębnych obszarów — pominięcie któregokolwiek zostawia potencjał na stole.</p>

              <ul>
                <li><strong>Crawlowalność i reguły robots.</strong> Składnia robots.txt, kody odpowiedzi serwera i to, czy boty docierają do stron, na których Ci zależy.</li>
                <li><strong>Sitemapy i odkrywanie.</strong> Poprawność sitemap XML, segmentacja po typie treści i to, czy zawierają wyłącznie indeksowalne adresy z kodem 200.</li>
                <li><strong>Budżet indeksowania.</strong> Na co boty realnie wydają swoje żądania. W serwisie powyżej kilku tysięcy adresów URL-e z parametrami, łańcuchy przekierowań i strony noindex po cichu pochłaniają crawl, który powinien iść na strony aktualizowane. Zarządzaj tym na podstawie logów serwera albo raportu Statystyki indeksowania — nie intuicji.</li>
                <li><strong>Sygnały indeksacji.</strong> Tagi noindex, konflikty canonicali i nagłówki X-Robots-Tag, które po cichu usuwają strony z indeksu.</li>
                <li><strong>Renderowanie i JavaScript.</strong> Czy Google widzi treść wyrenderowaną po stronie serwera, czy musi wykonać skrypty, żeby dotrzeć do tekstu. Sprawdzaj podglądem wyrenderowanego HTML w URL Inspection po każdym większym wdrożeniu frontendowym, nie raz do roku.</li>
                <li><strong>Przekierowania i kondycja linków.</strong> Martwe linki, łańcuchy przekierowań i strony osierocone, które istnieją tylko w sitemapie. Sprawdź też rozkład: strony biznesowo najważniejsze powinny mieć najwięcej linków wewnętrznych — w większości audytów nie mają.</li>
                <li><strong>Wydajność i Core Web Vitals.</strong> LCP, INP i CLS — progi niżej.</li>
                <li><strong>Dane strukturalne.</strong> Typy, które nadal dają wynik rozszerzony, walidowane w <a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer">Schema.org</a> i teście wyników rozszerzonych.</li>
                <li><strong>Bezpieczeństwo, mobile i duplikacja.</strong> HTTPS bez mixed content, użyteczność mobilna, powtarzalne bloki treści.</li>
              </ul>

              <p>Jedna warstwa doszła do tej listy niedawno: gotowość na wyszukiwanie AI. Chodzi o to, czy crawlery AI mają dostęp do treści, czy kluczowy tekst jest w HTML-u zamiast w JavaScripcie po stronie klienta, i czy strukturę da się wyekstrahować i zacytować w odpowiedzi generatywnej.</p>

              <p><strong>Porada profesjonalisty:</strong> <em>Sprawdź w robots.txt przypadkowe blokady botów AI — GPTBot, OAI-SearchBot, Claude-SearchBot. Sporo stron blokuje je domyślnie i nikt tego nie zauważa. Blokada może być świadomą decyzją biznesową — nigdy skutkiem ubocznym konfiguracji.</em></p>

              <h2 id="kryteria-binarne">Kryteria binarne, żeby wynik nie był kwestią opinii</h2>
              <p>Checklista audytu SEO jest użyteczna dopiero wtedy, gdy każdy punkt ma próg. Większość każe „sprawdzić przekierowania” i zostawia ocenę audytorowi. Daj każdemu checkowi liczbę — wtedy dwie osoby dojdą do tego samego wyniku, a porównanie kwartał do kwartału zacznie coś znaczyć.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Check</th>
                      <th>Kryterium zaliczenia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Czas odpowiedzi serwera</td>
                      <td>średnio poniżej 0,5 s; przedział 0,5–1 s obserwuj; powyżej 1 s napraw</td>
                    </tr>
                    <tr>
                      <td>Przekierowania hosta</td>
                      <td>jedna wersja www/non-www i HTTP→HTTPS przez pojedyncze 301, zero łańcuchów i pętli</td>
                    </tr>
                    <tr>
                      <td>Waga i kompresja</td>
                      <td>gzip lub brotli włączone; HTML poniżej 0,5 MB</td>
                    </tr>
                    <tr>
                      <td>Mixed content</td>
                      <td>zero zasobów HTTP na stronach HTTPS</td>
                    </tr>
                    <tr>
                      <td>Title i meta description</td>
                      <td>unikalne w całym serwisie, zero duplikatów i braków, długość w limicie wyświetlania</td>
                    </tr>
                    <tr>
                      <td>Nagłówki</td>
                      <td>dokładnie jedno H1 na stronę; hierarchia H2/H3 bez przeskoków</td>
                    </tr>
                    <tr>
                      <td>Higiena URL</td>
                      <td>indeksowalne adresy bez parametrów dynamicznych i identyfikatorów sesji; do 140 znaków; maksymalnie 5 poziomów katalogów</td>
                    </tr>
                    <tr>
                      <td>Głębokość kliknięć</td>
                      <td>każda istotna strona osiągalna w 3 kliknięciach ze strony głównej</td>
                    </tr>
                    <tr>
                      <td>Anchory wewnętrzne</td>
                      <td>identyczny anchor nigdy nie prowadzi do dwóch różnych stron</td>
                    </tr>
                    <tr>
                      <td>Sitemapa</td>
                      <td>wyłącznie indeksowalne, kanoniczne adresy 200; zero adresów istniejących tylko w sitemapie</td>
                    </tr>
                    <tr>
                      <td>Linki wewnętrzne</td>
                      <td>celują bezpośrednio, nigdy przez 301</td>
                    </tr>
                    <tr>
                      <td>Crawlowalność</td>
                      <td>każde wykluczenie z indeksu jest decyzją, nie skutkiem ubocznym konfiguracji</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Czas odpowiedzi serwera zasługuje na komentarz. Stoi na górze tabeli, bo mnoży się przez wszystko inne: wolny origin ogranicza LCP od dołu, dławi tempo crawlowania i ciągnie konwersję w dół. To jednocześnie check najczęściej pomijany — crawlery raportują go jako liczbę, nie jako błąd, więc łatwo go nie zauważyć.</p>

              <h3>Progi Core Web Vitals, precyzyjnie</h3>
              <p>Audyt wydajności strony zaczyna się od trzech liczb, nie od wyniku Lighthouse. Ogólnikowe „popraw szybkość” to powód, dla którego ta praca utyka.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Metryka</th>
                      <th>Próg</th>
                      <th>Co mierzy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LCP</td>
                      <td>poniżej 2,5 s</td>
                      <td>moment wyrenderowania największego elementu treści</td>
                    </tr>
                    <tr>
                      <td>INP</td>
                      <td>poniżej 200 ms</td>
                      <td>reakcję na interakcje użytkownika w całej wizycie</td>
                    </tr>
                    <tr>
                      <td>CLS</td>
                      <td>poniżej 0,1</td>
                      <td>nieoczekiwane przesunięcia layoutu</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Dwie rzeczy, które audyty notorycznie mylą. <strong>INP zastąpił FID w marcu 2024</strong> — checklista wymieniająca First Input Delay jest nieaktualna. I <strong>FCP nie jest metryką Core Web Vitals</strong> — to przydatna miara diagnostyczna, ale nie należy do tej tabeli. Raportuj z danych polowych: raport CWV w Search Console albo zbiór CrUX. Lighthouse służy do debugowania, nie do raportowania.</p>

              <h3>Nota o znacznikach FAQ i HowTo</h3>
              <p>Wiele checklist wciąż każe walidować schemę FAQ i HowTo. Ta instrukcja jest nieaktualna i warto ją usunąć z szablonu.</p>
              <p>Google wycofał wyniki rozszerzone HowTo na desktopie we wrześniu 2023. Wyniki FAQ ograniczył do stron rządowych i medycznych w sierpniu 2023, a <strong>7 maja 2026 wycofał całkowicie</strong> — raport w Search Console zniknął w czerwcu 2026, wsparcie w API w sierpniu 2026. Żaden z tych typów nie daje dziś wyniku w wyszukiwarce.</p>
              <p><code>FAQPage</code> pozostaje poprawnym typem Schema.org i istniejący markup może zostać — nieużywane dane strukturalne nie szkodzą. Ale to już nie jest brak do wykazania w audycie. Waliduj to, co nadal daje efekt: Article, Product z Offer, BreadcrumbList, Organization.</p>

              <h2 id="krok-po-kroku">Jak zrobić audyt SEO krok po kroku</h2>
              <p>Kolejność poniżej nie jest przypadkowa: audyt najpierw potwierdza, że Google w ogóle dociera do strony, a dopiero potem ktokolwiek optymalizuje, jak szybko się ładuje. Praca nad wydajnością strony z tagiem noindex nie daje nic.</p>

              <ol>
                <li><strong>Crawl i próbka.</strong> Pełny crawl serwisu zestawiony z danymi Search Console i logami serwera. Deliverable: arkusz inwentaryzacyjny z każdym adresem, jego statusem, canonicalem i indeksowalnością.</li>
                <li><strong>Diagnoza indeksowalności.</strong> Tagi noindex, konflikty canonicali, luki w pokryciu sitemap. Każdy adres wykluczony z indeksu ma być wykluczony decyzją, nie przypadkiem. Deliverable: raport indeksowalności.</li>
                <li><strong>Diagnoza wydajności.</strong> Core Web Vitals na realnych szablonach, z danych polowych. Deliverable: lista poprawek z metrykami i zrzutami.</li>
                <li><strong>Scoring i grupowanie.</strong> Uporządkuj znaleziska według wpływu, pewności i łatwości, potem pogrupuj w paczki gotowe dla dewelopera.</li>
                <li><strong>Weryfikacja i monitoring.</strong> Potwierdź naprawy w Search Console i w danych polowych, potem ustaw cykliczne crawle.</li>
              </ol>

              <p>Każdy krok kończy się czymś konkretnym do przekazania — to różnica między audytem a luźną listą obserwacji.</p>

              <h2 id="narzedzia">Jakie narzędzia i skany uruchomić</h2>
              <p>Żadne pojedyncze narzędzie nie pokrywa pełnej analizy technicznej SEO, więc łączysz wyniki z założenia, a nie z przypadku.</p>

              <ul>
                <li><strong>Crawler desktopowy</strong> do odkrywania — powinien flagować problemy z renderowaniem JS, bo współczesne frameworki potrafią ukryć treść przed botami niewykonującymi skryptów. Screaming Frog w wersji bezpłatnej crawluje do 500 adresów.</li>
                <li><strong>Search Console i Bing Webmaster Tools</strong> — status indeksacji i błędy crawlowania prosto ze źródła. Search Console trzyma 16 miesięcy danych, czyli minimum potrzebne do porównania okresu z tym samym okresem rok wcześniej.</li>
                <li><strong>Lighthouse lub PageSpeed Insights</strong> do debugowania, w parze z raportem CWV albo CrUX do liczb, które faktycznie raportujesz.</li>
                <li><strong>Analiza logów serwera</strong> — jak boty zachowują się naprawdę, a nie jak zakładasz; plus strony osierocone, do których crawler nigdy nie trafia. Kwartalnie wystarcza większości serwisów.</li>
                <li><strong>Narzędzie crawlu ciągłego</strong>, które odpala się według harmonogramu — regresje wychodzą między audytami kwartalnymi, a nie na następnym.</li>
                <li><strong>Test wyników rozszerzonych</strong> do walidacji danych strukturalnych przed wdrożeniem.</li>
              </ul>

              <h2 id="priorytety">Jak ustalić, co naprawić najpierw</h2>
              <p>Dwie osie to za mało. Scoring wyłącznie po wpływie i nakładzie pracy kończy się tak, że pojedyncze niepotwierdzone ostrzeżenie z crawlera ląduje na szczycie roadmapy. Dodaj trzecią.</p>
              <p><strong>Impact (1–10).</strong> Szacuj w metryce biznesowej — przychodzie, leadach — nie w sesjach. Linijka w robots.txt blokująca /blog/ dostaje wysoką notę, bo wycina z indeksu całą sekcję.</p>
              <p><strong>Confidence (1–10).</strong> Jak dobrze znalezisko jest udokumentowane. Bloker potwierdzony jednocześnie w crawlu i w Search Console — górna półka. Ostrzeżenie z jednego narzędzia, bez niczego, co je potwierdza — nisko. Obniżaj pewność także wtedy, gdy opierasz się na „dobrej praktyce” zamiast na własnych danych.</p>
              <p><strong>Ease (1–10).</strong> Wszystko, co wymaga sprintu deweloperskiego, dostaje niższą notę niż to, co wdrożysz samodzielnie. Przebudowa szablonów pod Core Web Vitals to wysoki Impact i niski Ease; brakujący alt obrazka — odwrotnie.</p>
              <p>Pomnóż trzy czynniki. Posortuj malejąco, weź z góry tyle, ile kwartał realnie pomieści, resztę przejrzyj w następnym — a zadania, które od dwóch kwartałów nie weszły do realizacji, usuń: ich prawdziwy wynik był niższy, niż wyglądał.</p>
              <p>Każdą pozycję prezentuj interesariuszom z oczekiwanym efektem, szacunkiem czasu i ryzykiem zaniechania. Taka rama zdobywa budżet szybciej niż surowa lista błędów.</p>

              <p>Porada profesjonalisty: <em>Jeśli ktoś przy stole zapyta „co się stanie, jeśli tego nie naprawimy” — miej gotową jednozdaniową odpowiedź dla każdej pozycji z góry listy, zanim spotkanie się zacznie.</em></p>

              <h2 id="raportowanie-rytm">Jak raportować wyniki i ustawić rytm audytów</h2>
              <p>Raport zarabia na siebie wtedy, gdy czyta się go jak ocenę kondycji SEO w czasie, a nie jak migawkę. Śledź: liczbę stron indeksowalnych, błędy pokrycia, rozkład LCP/INP/CLS, błędy crawlowania, łańcuchy przekierowań i błędy danych strukturalnych.</p>

              <ul>
                <li>Wykres kondycji serwisu widoczny na pierwszy rzut oka</li>
                <li>Rozkład problemów po kategoriach, żeby było widać, gdzie się kumulują</li>
                <li>Trendy Core Web Vitals przed i po, powiązane z konkretnymi naprawami</li>
              </ul>

              <p>Naprawę uznawaj za zakończoną po potwierdzeniu w Search Console i w danych polowych — zaliczony test laboratoryjny to nie to samo, co odczuwalna zmiana u realnych użytkowników.</p>
              <p>Rytm: trzy cykle pracują razem. <strong>Lekki crawl co tydzień</strong> — regresja pokazuje się jako skok liczby problemów, a nie jako spadek ruchu. <strong>Pełny audyt co kwartał</strong>, razem z logami. <strong>Crawl porównawczy do 48 godzin po każdym większym wdrożeniu</strong> — większość katastrof SEO to niezamierzone skutki release'ów, wykryte za późno.</p>
              <p>Kadencja łapie regresje. Zapobieganie im to osobny ruch: wpisz SEO do <strong>definition of done</strong> dla zmian frontendowych i infrastrukturalnych. Cztery warunki, każdy testowalny przed wypuszczeniem zmiany — kody 200/301 zgodne z intencją, meta robots i canonical bez nieintencjonalnych zmian, kluczowa treść obecna w wyrenderowanym DOM, Core Web Vitals w ustalonym z deweloperami budżecie wydajności. Release, który nie przechodzi któregokolwiek z czterech, nie wychodzi. To jedno ustalenie usuwa więcej znalezisk audytowych niż jakikolwiek harmonogram crawli.</p>

              <h2 id="najszybsze-wygrane">Najszybsze wygrane audytu technicznego</h2>
              <p>Część napraw zajmuje popołudnie, a efekt widać w kilka dni. Te pięć warto zrobić przed wszystkim innym.</p>

              <ol>
                <li>Cofnij przypadkowy Disallow na cały serwis albo noindex na poziomie szablonu, potem poproś o ponowne crawlowanie.</li>
                <li>Napraw rozjazdy self-canonical na poziomie szablonu, żeby strony przestały konkurować same ze sobą.</li>
                <li>Zwiń wieloskokowe łańcuchy przekierowań do pojedynczego 301 i skieruj linki wewnętrzne prosto do celu.</li>
                <li>Preloaduj obraz hero, skonwertuj go do formatu nowej generacji i ustaw jawne wymiary — tnie LCP i CLS naraz.</li>
                <li>Odrocz niekrytyczne skrypty zewnętrzne i zdejmij analitykę z głównego wątku, żeby poprawić INP.</li>
              </ol>

              <p>Żadna z tych rzeczy nie wymaga przebudowy, wszystkie pięć mieści się w jednym sprincie, a każda ma mierzalne „przed i po” do raportu.</p>

              <h2 id="jak-przeprowadzamy">Jak AI SEO COMPANY przeprowadza audyt</h2>
              <p>Nasz proces idzie w kolejności: crawl odkrywczy, triage indeksowalności, priorytetyzowana naprawa, weryfikacja, monitoring ciągły — z powodu opisanego wyżej: praca nad wydajnością stron, których Google nie widzi, wydaje budżet bez efektu.</p>
              <p><Link href="/audyt-seo">Audyt SEO</Link> obejmuje ponad 50 punktów kontrolnych w trzech obszarach: technikalia z Core Web Vitals, treści z semantyką oraz profil linków. Do pracy potrzebujemy dostępów do Search Console i Analytics; wyniki dostajesz w 3–5 dni roboczych jako raport z listą błędów, oceną wpływu na widoczność, priorytetyzacją według stosunku efektu do pracochłonności i rekomendacjami w formie gotowej do przekazania deweloperowi. Po przekazaniu omawiamy go na konsultacji.</p>
              <p>Audyt prowadzimy w ramach abonamentu, obok pozostałych prac SEO; w wyjątkowych sytuacjach wyceniamy go jako samodzielne zlecenie, po uzgodnieniu zakresu przed startem. Wyniki zależą od punktu startowego i od tego, ile z listy napraw faktycznie zostanie wdrożone — żadna agencja nie może zagwarantować rezultatu.</p>
              <p>Największe marnotrawstwo, jakie widujemy, to zespoły przepisujące szablony pod Core Web Vitals, podczas gdy tag noindex albo reguła w robots.txt dalej wycina stronę z indeksu. Najpierw odkrywanie. Szybkość ma znaczenie dopiero wtedy, gdy Google stronę widzi.</p>
              <p>Jeśli chcesz zacząć od diagnozy, zamów bezpłatną analizę SEO i potencjału obecnej marki przez <Link href="/#kontakt">formularz kontaktowy</Link> — na zapytania odpowiadamy zwykle w mniej niż dwie godziny, wstępną propozycję wysyłamy w ciągu doby.</p>

              <h2 id="faq">Najczęściej zadawane pytania</h2>

              <h3>Ile trwa audyt SEO?</h3>
              <p>Audyt pojedynczej domeny zajmuje zwykle od kilku dni do tygodnia, zależnie od wielkości serwisu i tego, czy obejmuje analizę logów. U nas standardowo 3–5 dni roboczych. Serwisy z milionami adresów wymagają podejścia modułowego zamiast jednego pełnego crawlu.</p>

              <h3>Ile kosztuje audyt SEO?</h3>
              <p>Na polskim rynku audyty małych stron wyceniane są zwykle w przedziale kilkuset do dwóch tysięcy złotych, a rozbudowanych serwisów — od trzech do kilkunastu tysięcy. Rozpiętość bierze się z zakresu: sam crawl z automatu to co innego niż analiza logów, danych polowych i konsultacja wdrożeniowa. U nas audyt wchodzi w zakres abonamentu.</p>

              <h3>Jak często powtarzać audyt?</h3>
              <p>Lekki crawl co tydzień, pełny audyt co kwartał i dodatkowy crawl porównawczy natychmiast po każdym większym wdrożeniu, przebudowie albo migracji.</p>

              <h3>Przenosimy się na nową domenę. Kiedy audytować?</h3>
              <p>Dwa razy: raz na środowisku testowym przed startem — żeby złapać noindexy i blokady, które inaczej pojechałyby na produkcję — i potem codziennie przez pierwsze cztery tygodnie. Spadek ruchu o 10–20% przez dwa do sześciu tygodni bywa normalny i sam w sobie nie oznacza porażki. Brak odbicia po ośmiu tygodniach oznacza błąd w mapie przekierowań albo pokryciu indeksu — wtedy się szuka, a nie czeka.</p>

              <h3>Czym różni się checklista on-page od audytu technicznego?</h3>
              <p>Checklista on-page dotyczy elementów treści: tytułów, nagłówków, pokrycia fraz. Audyt techniczny obejmuje crawlowalność, indeksację, renderowanie i infrastrukturę — warstwy, do których poprawki w treści nie sięgają.</p>

              <h3>Czy potrzebny jest i crawler, i sprawdzenie ręczne?</h3>
              <p>Tak. Skan automatyczny szybko łapie problemy masowe — martwe linki, brakujące znaczniki. Weryfikacja ręczna łapie problemy kontekstowe, na przykład canonical technicznie poprawny, ale wskazujący złą stronę.</p>

              <h3>Czy dodawać schemę FAQ podczas audytu?</h3>
              <p>Nie jako taktykę pod SERP. Wyniki rozszerzone FAQ wycofano 7 maja 2026, HowTo w 2023. Blok pytań i odpowiedzi w treści — jak ten — nadal ma sens dla czytelników i odpowiedzi AI; sam markup przestał być brakiem do wykazania.</p>

              <h2 id="zrodla">Źródła</h2>

              <h3>Dokumentacja Google</h3>
              <ul>
                <li>Google Search Central — Core Web Vitals; INP zastąpił FID jako metryka CWV w marcu 2024</li>
                <li>Google Search Central — dane strukturalne FAQPage, nota o wycofaniu z 7 maja 2026; raport w Search Console i teście wyników rozszerzonych usunięty w czerwcu 2026, wsparcie API w sierpniu 2026</li>
                <li>Google Search Central — dane strukturalne HowTo, wycofanie na desktopie wrzesień 2023</li>
                <li>Centrum pomocy Search Console — 16 miesięcy przechowywania danych</li>
              </ul>

              <h3>Pozostałe</h3>
              <ul>
                <li><a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer">Schema.org — Getting Started</a></li>
              </ul>

              <p><em>Ostatnia weryfikacja: sierpień 2026. Informacje o danych strukturalnych odzwierciedlają dokumentację Google na ten dzień.</em></p>

              <h2 id="powiazane">Powiązane</h2>
              <ul>
                <li><Link href="/blog/content-gap-analysis">Analiza luk contentowych: praktyczny przewodnik</Link> — contentowa strona tego samego cyklu audytowego</li>
                <li><Link href="/blog/audyt-ux-strony">Audyt UX strony: co obejmuje i ile kosztuje</Link> — warstwa konwersji po domknięciu technikaliów</li>
                <li><Link href="/blog/konfiguracja-zdarzen-gtm-ga4-poradnik">Konfiguracja zdarzeń w GTM i GA4</Link> — pomiar, na którym opiera się weryfikacja napraw</li>
              </ul>

              <BlogCTA
                locale={locale}
                currentSlug="/blog/technical-seo-audit-checklist"
                customCtaTitlePl="Potrzebujesz audytu technicznego?"
                customCtaTextPl="Zamów bezpłatną analizę SEO obecnej strony. Na zapytania odpowiadamy zwykle w mniej niż dwie godziny, wstępną propozycję wysyłamy w ciągu doby."
              />
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
