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
- `panel-klienta-ai-seo/lib/google.ts` uses `https://www.googleapis.com/auth/webmasters`. Once the admin re-consents once on `https://panel.ai-seo-company.pl/admin/integracje` (in any browser), the encrypted refresh token in Neon DB (`google_connections`) gains write permission and `npm run zglos:sitemapy` (`lib/gscSitemaps.js` + `/api/cron/indexnow/route.js`) submits all 10 XML sitemaps via `PUT /webmasters/v3/sites/sc-domain%3Aai-seo-company.pl/sitemaps/...` in 2 seconds without needing browser UI.

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
