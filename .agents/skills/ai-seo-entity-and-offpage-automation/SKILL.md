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

## 2. Exact 9 Segment Sitemaps & Search Engine Submission
- Root index: `https://www.ai-seo-company.pl/sitemap.xml`
- 9 segment sitemaps:
  `strony-pl.xml`, `strony-en.xml`, `blog-pl.xml`, `blog-en.xml`, `ai-pl.xml`, `ai-en.xml`, `porownania.xml`, `narzedzia-szablony.xml`, `de.xml` under `https://www.ai-seo-company.pl/sitemaps/sitemap/`.
- Note: `panel-klienta-ai-seo/lib/google.ts` defaults to `webmasters.readonly`; programmatic `PUT` sitemap submission via GSC API requires widening OAuth scope to `https://www.googleapis.com/auth/webmasters` or submitting via the logged-in `browser` subagent.

## 3. GA4 Internal Traffic Defense-in-Depth (`547365077` / `G-WVVRW8FP30`)
- Office/mobile ISPs in Poland rotate IPv4/IPv6 addresses (CGNAT/5G), so GA4 IP rules alone leak founder visits. Pair GA4's `Define internal traffic` + `Active` Data Filter with a persistent `localStorage` flag (`?internal=1`) in `app/[locale]/layout.js`.

## 4. Directory Automation & Anti-Bot Compliance
- Clutch and Sortlist sit behind Cloudflare Turnstile (`403` to raw `urllib`/`curl`). Never attempt to bypass or solve CAPTCHAs / Turnstile challenges; pause the `browser` subagent cleanly for the user to complete login/verification in the browser pane, then resume form filling from canonical `lib/firma.js` data.
