---
name: ai-seo-entity-and-offpage-automation
description: >-
  Automates Entity SEO (sameAs in lib/firma.js, Organization, Person, /llms.txt), GA4 internal
  traffic exclusion, GSC/Bing 9-segment sitemap submission, and first-party directory profiles
  (GitHub, Clutch, Sortlist, GoodFirms, DesignRush) without violating CAPTCHA or NAP invariants.
---

# AI SEO COMPANY - Entity `sameAs`, GSC/GA4 & Off-Page Automation Guardrails

## 0. Mandatory Triple-Check Rule (Potrójna Weryfikacja 3x)
Before reporting **any** code conclusion, schema/entity issue, analytics diagnosis, or `file:line` claim to the user, verify it **3 independent times**:
1. **Pass 1 (Literal `read_file`)**: Read the exact source lines in `lib/firma.js`, layout/schema components, and backend config directly.
2. **Pass 2 (End-to-End Consumer Trace)**: Trace every downstream consumer (JSON-LD `#organization`/`Person`, `/llms.txt`, OAuth scopes, GA4 config).
3. **Pass 3 (Live / Empirical Check)**: Confirm against live rendered HTML/headers or CLI output; never report unverified assumptions.

## 1. Single Source of Truth for External Brand Profiles (`lib/firma.js`)
- `PROFILE_FIRMY` in `lib/firma.js` feeds **28 connected files** (`app/[locale]/layout.js` `#organization`, `components/about/AboutAuthor.jsx` `Person`, `components/de/UeberUnsDe.jsx`, `app/llms.txt/route.js`, `app/de/llms.txt/route.js`).
- **Rule**: Never hardcode external profile URLs (`LinkedIn`, `GitHub`, `Clutch`, `Sortlist`, `GoodFirms`, `DesignRush`) directly inside JSX or JSON-LD components. Always add them to `PROFILE_FIRMY` in `lib/firma.js` ONLY after verifying the canonical destination URL exists (never guess profile slugs).
- **NAP Consistency**:
  - Office / Google Business Profile address: `BIURO` (`ul. Grzybowska 5A, 00-132 Warszawa`, Place ID `ChIJBbPRrkDNHkcR0Oetxw5AMFk`).
  - Registered KRS seat: `SIEDZIBA` (`ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa`, KRS `0001239983`, NIP `5253090237`, REGON `544761611`).
  - Website URL in all directories & GitHub repos: strictly `https://www.ai-seo-company.pl/` (never `http://` or non-`www` to avoid redirect hops).

## 2. Exact 9 Segment Sitemaps & 1-Click Zero-Terminal Submission (`panel.ai-seo-company.pl`)
- Root index: `https://www.ai-seo-company.pl/sitemap.xml`
- 9 segment sitemaps:
  `strony-pl.xml`, `strony-en.xml`, `blog-pl.xml`, `blog-en.xml`, `ai-pl.xml`, `ai-en.xml`, `porownania.xml`, `narzedzia-szablony.xml`, `de.xml` under `https://www.ai-seo-company.pl/sitemaps/sitemap/`.
- **1-Click Production Auto-Submitter (`panel-klienta-ai-seo`, commit `8749b1d`)**:
  - **Database Trap**: `ai-seo-strona/.env.local` points `DATABASE_URL` to `localhost/panel_dev`, whereas `https://panel.ai-seo-company.pl` stores OAuth tokens in **Neon production DB** (`google_connections`). Never ask the user to run local CLI `npm run sitemapy:zglos` after re-consenting in the browser without Neon credentials.
  - Instead, `panel-klienta-ai-seo/app/api/google/callback/route.ts` (`submitAgencySitemaps()` in `lib/google.ts`) **automatically submits all 10 XML sitemaps to GSC immediately upon OAuth callback** (`?ok=1&sitemapy=10`), and `/admin/integracje` provides both `"Odśwież uprawnienia i zgłoś 10 map XML"` (when `hasWebmastersWriteScope()` is false) and `"Zgłoś 10 map XML do GSC"` (manual server action).
  - **Panel Test & Deploy Invariants**: Keep `getConnectionStatus(db)` in `panel-klienta-ai-seo/lib/google.ts` strictly returning `{ googleEmail, createdAt }` (`tests/flows.test.ts:356` asserts exact keys), and deploy `panel-klienta-ai-seo` directly via `npx vercel --prod --yes` (it has no git `origin` remote).
  - **Chrome DevTools MCP Direct Console Verification & Sitemap Submission Fallback**: Whenever Chrome is connected via `chrome-devtools` MCP and the user asks to verify GSC/Bing indexing or sitemaps, ALWAYS inspect BOTH `https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aai-seo-company.pl` AND `https://www.bing.com/webmasters/sitemaps?siteUrl=https://www.ai-seo-company.pl/` directly. Note that Bing often stops expanding `<sitemapindex>` partially unless all 9 child segment sitemaps are submitted individually, and GSC Closure Wiz inputs require native MCP `fill` + `click` + `Escape` (not synthetic `dispatchEvent('input')`, where `input[type="text"]` also hits the top URL Inspection bar before `input[aria-label="Enter sitemap URL"]`).

## 3. GA4 Internal Traffic Defense-in-Depth (`547365077` / `G-WVVRW8FP30`, Stream `15338291591`)
- Office/mobile ISPs in Poland rotate IPv4/IPv6 addresses (CGNAT/5G), so GA4 IP rules alone leak founder visits.
- `app/[locale]/layout.js` sets `localStorage['aisc_internal'] = '1'` and `window.__aiscInternal = true` on `?internal=1` (`?internal=0` clears it):
  1. Sends `traffic_type: 'internal'` (`&tt=internal`) on `gtag('config', ...)` and all `track()` / `generate_lead` events (`lib/track.js`, `components/Contact.jsx`),
  2. Suppresses `gtag('config', GOOGLE_ADS_ID)` and `gtag('event', 'conversion', ...)` in `Contact.jsx` so internal form tests never pollute Google Ads conversion bidding.
- Pair this with GA4 `Define internal traffic` (office IP `77.89.99.243`) and switching Data Filter `Internal Traffic` from `Testing` to `Active`.

## 4. Browser Sandbox Uploads, Protected Auth Hosts & Anti-Bot Compliance
- **`browser_sandbox/uploads/` Lifecycle Trap**: Files staged in `<Artifact Directory Path>/browser_sandbox/uploads/<filename>` (such as `ai-seo-company-logo.png` for LinkedIn Company Page creation) are **automatically wiped on cross-domain navigation and on subagent turn exit**. Always re-copy `ai-seo-company-logo.png` into `browser_sandbox/uploads/` immediately BEFORE calling `invoke_subagent` or `send_message` to resume LinkedIn creation, and keep LinkedIn in its own dedicated subagent that does not navigate to other domains first.
- **Protected Auth Hosts (`accounts.google.com`)**: Antigravity's browser blocks agent navigation/actions on `accounts.google.com`. Ask the user to sign into Google / LinkedIn / Bing directly in the Antigravity browser pane (or re-consent `/admin/integracje` in their regular browser for GSC API), then resume the paused subagent via `send_message`.
- **CAPTCHA / Turnstile**: Never attempt to bypass or solve CAPTCHAs / Cloudflare Turnstile challenges (`Clutch`, `Sortlist`, `GoodFirms`, `DesignRush`); pause cleanly for the user to complete verification in the browser pane, then populate forms from `seo/entity-kit-offpage.json`.

## 5. Notion Project & KPI Sync Guardrails (`notion_notion` MCP)
- **Main Notion Project**: `AI SEO COMPANY -> SEO` (`3d3977c5-5d91-8007-bf6b-dba07a2403f3`), `Tasks` (`collection://23f977c5-5d91-8198-a3ee-000be04aa4e4`), `Goals` (`collection://23f977c5-5d91-814b-91a5-000b5df1ea1a`), `Wskaźniki KPI i Targety SEO` (`collection://41b977c5-5d91-8124-8f94-000bdef4ac64`).
- **Always Use `update_content` (Never `replace_content`) on Project Pages**: Preserves inline `<database>` views and expiring S3 page icons intact.
- **`call_mcp_tool` Identifier Key Rule**: Nested keys inside `Arguments` must be plain ASCII identifiers (`Status`, `Priority`, `Projekt`, `Kategoria`, `title`, `old_str`, `new_str`). Keys containing spaces, colons, or diacritics (e.g. `"Wskaźnik KPI"`, `"date:Date Complete:start"`) fail `call_mcp_tool` argument decoding; use `title` in `properties` to set any Notion database title column whose name contains spaces/diacritics.
- **Exact URL Counting**: Always count published URLs from `Object.keys(JSON.parse(fs.readFileSync('lib/lastmod.json', 'utf8')).adresy)` (never `Object.keys(lastmod)` directly, which returns `['_opis', '_wydanie', 'adresy']`).
- **Mandatory Post-Deployment Task Check-Off & Zero-`In Progress` Split Rule**:
  1. **View Filter Trap (`View of Tasks` `f75977c55d918390b6fe01f9ef2d465d`)**: The embedded Tasks database on `AI SEO COMPANY -> SEO` ONLY displays 3 tabs: `Next action` (`Status == "To do"`), `Someday / Waiting` (`Maybe Late | Waiting On`), and `Completed` (`Complete`). Setting `Status: "In Progress"` hides a task from `Next action` without marking it `Completed`, while keeping it flagged as overdue in `Główny Planer` (`Status != "Completed"`). **NEVER leave a task in `Status: "In Progress"`** on this project!
  2. **Always Split Partially Completed Tasks**: Whenever one part of a multi-scope task is finished (e.g., code/GSC/Bing done, while external UI login or plan approval remains), mark the original task `Status: "Completed"` with `- [x]` on all finished items (instead of creating a duplicate while leaving the original open), and spin off ONLY the remaining unstarted items into a clean `Status: "To do"` task so it appears in `Next action`.
  3. **Sync All 4 Notion Surfaces**: On every Notion sync, check (a) `Tasks` (`collection://23f977c5-5d91-8198-a3ee-000be04aa4e4`), (b) legacy `Kalendarz` (`collection://23f977c5-5d91-80fc-94e4-000b10321c1d` -> set `Tags: ["Zrobione"]` and `project: "AI SEO COMPANY -> SEO"` on finished entries), (c) the 8 `Wskaźniki KPI i Targety SEO` page bodies (`collection://41b977c5-5d91-8124-8f94-000bdef4ac64`), and (d) the 3 `Goals` page bodies (`collection://23f977c5-5d91-814b-91a5-000b5df1ea1a`).

## 6. GSC Forensic Drop Diagnosis Rule (Multi-Dimension Breakdown)
- Whenever diagnosing an impression or click drop in Google Search Console (`sc-domain:ai-seo-company.pl`), NEVER rely on a single global `7d vs 7d` sum (which can mask a flat/declining primary market behind position `60+` international impressions):
  1. Pull `90+` days in weekly buckets AND the last `21` days daily with `dataState: 'all'` (so fresh preliminary days at the right edge of the GSC UI chart are visible).
  2. Filter `country == 'pol'` separately from `deu`/`gbr`/`usa` and compare `28d vs prev 28d` clicks and average position.
  3. Inspect `/sitemaps` (`submitted` vs `indexed`), drill down into every row of `Page indexing` (`Crawled - currently not indexed`, `Discovered - currently not indexed`, `Excluded by 'noindex' tag`, `Duplicate`, `Page with redirect`) to trigger `VALIDATE FIX` after deploying redirects/inlinks, and run `urlInspection` on core hubs (`/narzedzia`, `/narzedzia/audyt-seo`, `/de/tools`) - stopping immediately before any `reCAPTCHA` challenge on `Request indexing` and listing remaining URLs for 1-click user action.
