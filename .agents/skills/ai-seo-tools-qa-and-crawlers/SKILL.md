---
name: ai-seo-tools-qa-and-crawlers
description: >-
  Prevents backend and frontend bugs in AI SEO COMPANY's interactive SEO & GEO tools
  (ai-seo-strona + panel-klienta-ai-seo): crawlers, WAF/Cloudflare handling, AI visibility checks,
  multi-currency calculators, Common Crawl authority, llms.txt, email gates, and manual QA.
  Activate whenever building, editing, or testing any tool under /narzedzia, /en/tools, /de/tools,
  or panel-klienta-ai-seo/app/api/narzedzia.
---

# AI SEO Tools - Crawler, Localization & QA Guardrails

## 0. Mandatory Triple-Check Rule (Potrójna Weryfikacja 3x)
Before reporting **any** code conclusion, bug, `file:line` reference, or audit finding to the user (especially findings returned by subagents), verify it **3 independent times**:
1. **Pass 1 (`read_file` declaration + usage)**: Read both the state/function definition AND the exact JSX/TS line where it renders (e.g., verify whether `<input>` actually passes `value={state}` before claiming a controlled-input bug; in `LlmsTxtClient.jsx:272` `<input>` is uncontrolled!).
2. **Pass 2 (Full runtime & cross-repo trace)**: Trace frontend <-> `panel-klienta-ai-seo` route <-> conditional UI branches (`odsetekProc === 0`, `opublikowana: false` in `lib/publikacja.js`, etc.).
3. **Pass 3 (Empirical falsification)**: Cross-check against live DOM/browser behavior or a reproduction check. Never report unverified or single-pass claims.

## 1. Crawler & HTTP Edge-Case Rules (`pobieranie.ts`, `audyt.ts`, `generator.js`)
- **WAF / Cloudflare `403` False-Positive Trap**: Never allow an audit crawler to treat a `401/403/429/503` entry page as "0 content errors = 100/100 Content score"! Abort with a clear localized WAF/HTTP block diagnostic (`422`) when `html200(d).length === 0`.
- **Deindexation Kill-Switch**: If `noindex` on homepage or `Disallow: /` in `robots.txt` is present, cap overall SEO score at `<= 25/100`.
- **HTML Comments in `<head>`**: Always strip `<!--[\s\S]*?-->` from `<head>` BEFORE regex-matching `<meta name="robots">`, `<title>`, `canonical`, or `hreflang`.
- **Cloudflare Verified Bots IP Check**: Spoofing `User-Agent: GPTBot` from a cloud server IP (Vercel/AWS) triggers Cloudflare's ASN verification (`403`) even when real OpenAI IPs are allowed. When normal GET = `200`, `robots.txt` = allowed, and `server: cloudflare`, report neutral `"IP Verification (Cloudflare)"` instead of red `"Blocked"`.
- **`HEAD` -> `GET` Fallback & Sitemap Fallback**: Always retry `GET` when `HEAD` returns `403`, `405`, or `501`. When `sitemap.xml` is missing, extract internal `<a href>` links from the homepage HTML so generators never output a 1-link file.

## 2. Internationalization Traps in Tools (`EN` & `DE`)
- **Never hardcode `Poland` / `PL` / `PLN` outside Polish routes**:
  - Infer target market (`US`, `GB`, `DE`, `AT`, `CH`, `PL`) from domain TLD + explicit selector, defaulting `en -> US` and `de -> DE`.
  - Strip international corporate suffixes (`GmbH`, `UG`, `AG`, `KG`, `Ltd`, `Limited`, `LLC`, `Inc`, `Corp`, `P.S.A.`) and multi-part TLDs (`.com.pl`, `.co.uk`, `.co.at`) when tokenizing brand names for LLM mention detection.
  - Never lowercase capitalized words in German (`lang === 'de'`) — German nouns require capital letters!
  - Ensure backend email templates (`email.ts`, `szablony.ts`) have explicit `'de'` branches formatting `EUR` (`de-DE`), linking to `/de/...`, and registering every published DE PDF slug in `panel-klienta-ai-seo/lib/szablony.ts`.
  - Never fire GA4 `generate_lead` when the API response is `!r.ok`!

## 3. Email Gate CLS & Shareable Results
- In `BramkaEmail` (PL/EN and `WspolneDe.jsx`), when `tylkoRaport === true`, keep the form container expanded (`otwarte={tylkoRaport ? true : !gotowe}`) to prevent `0.17-0.72` CLS jumps upon submit.
- Use `tryb="wynik"` with `?wynik=<tool_runs_uuid>` (backed by `GET /api/narzedzia/wynik/[id]`) whenever a tool persists a run in `tool_runs`, and persist unlocked reports in `sessionStorage` so `F5` does not re-lock the result.

## 4. Cross-Repo Calculator Parity, `PAGESPEED_API_KEY` Validation & Panel Deployment
- **Calculator 1:1 Parity**: `ai-seo-strona/lib/kalkulatorStrat.js` and `panel-klienta-ai-seo/lib/narzedzia/kalkulator.ts` MUST keep identical `ZALOZENIA`, `wariant()`, and `policzZwrot()`, verified by `tests/kalkulator-wf.test.ts`, `tests/dk-kalkulator.test.ts`, and `tests/kalkulator-weryfikacja.test.ts`.
- **`BETTER_AUTH_URL` in Panel Tests**: Tests asserting production `https://panel.ai-seo-company.pl` links after `loadEnv()` must `delete process.env.BETTER_AUTH_URL` so `.env.local` (`http://localhost:3210`) does not override `PANEL()`.
- **Google `PAGESPEED_API_KEY` Guard**: Always validate `/^AIza[0-9A-Za-z_-]{25,60}$/` before passing `?key=` to Google PSI / CrUX APIs (a placeholder string causes `HTTP 400 API key not valid`). Read `originLoadingExperience` as fallback to `loadingExperience`, and compute an HTML + TTFB mobile estimate when keyless PSI hits `429`.
- **Panel DB Constraint & Vercel CLI Deploy**: New tools stored in `tool_runs` must be added to `tool_runs_tool_check` via Drizzle SQL migration on Neon, and `panel-klienta-ai-seo` deploys to production via `npx vercel --prod --yes` (it has no git remote `origin`).

## 5. Client-Server State, Metrics & Localization Edge-Case Rules (Learned from 8-Tool Stress Test)
- **`LinkWyniku tryb="wynik"` Contract**: NEVER pass `tryb="wynik"` unless the client component (a) saves `data.id` to URL via `zapiszParametry({ ..., wynik: data.id })`, (b) implements a `useEffect`/`useParametrUrl` reading `?wynik=<id>` from `GET /api/narzedzia/wynik/[id]`, AND (c) populates controlled input state (`setAdres`, `setUrlA`, `setUrlB`) from `data.podglad.domena` when `?url=`/`?a=` is absent in the URL.
- **Form Field Order & Mobile Placeholders (`390x844`)**: Place all optional `<input>` fields ABOVE `<button type="submit">`, and keep placeholders `<= 30` characters so they fit inside `292px`-wide mobile inputs without clipping trailing letters.
- **`useParametrUrl` on Controlled Inputs**: On React controlled inputs (`<input value={adres} onChange={...}>`), `useParametrUrl` MUST call the React state setter (`setAdres(url)`), NEVER mutate `poleRef.current.value = url` alone (React's next render wipes DOM mutations back to `''`).
- **Null Metric Fallbacks & Fast-Site States**: Never substitute fabricated numbers (`lcpMs ?? 3400`) when PSI/CrUX returns `null` (`Number(null)` is `0`, `null ?? 3400` fabricates a slow site). Show an honest "not measured" state, and render a positive green state when `LCP <= 1150 ms` and `INP <= 200 ms`.
- **Lighthouse `total-byte-weight` Deduplication (`psi.ts`)**: Always deduplicate `total-byte-weight` items by `url` (via `Map`) before `.slice(0, 3)` because browsers emit multiple `206 Partial Content` Range requests for the same `.mp4` video.
- **Multi-Part TLD Brand Stripping & GA4 Currency**: Strip multi-part public suffixes (`.com.pl`, `.waw.pl`, `.co.uk`, `.co.at`, `.com.de`) before extracting domain brand roots (`host.split('.').slice(0, -1)` leaks `com`/`co`). Always pass `currency: 'EUR'` on `/de/` routes in GA4 `generate_lead` events and append `&lang=de` on external badge URLs (`/api/narzedzia/badge/ai-ready`).
- **Polish 3-Form Paucal Pluralization**: Never use binary `n === 1 ? ... : ...` in Polish UI strings (`1 problem / 2-4 problemy / 5+ problemów`, `pozostały 1 / pozostałe 2-4 / pozostałych 5+`, `1 domena linkuje / 2-4 domeny linkują / 5+ domen linkuje`; `12-14` always take the `5+` genitive plural).
- **Interactive Checklists (`SzablonInterakcje.jsx`)**: Activate `☐` checkbox enhancement whenever `☐` exists in `.szablon-tresc` (do not gate on `slug.includes('checklista')`), convert all `<td>☐</td>` columns via `.filter()`, and reserve an SSR slot for sticky progress bars to keep `CLS = 0.00`.
- **SVG `height="auto"` Console Error Trap**: Never set `height="auto"` as an XML attribute on `<svg>` (Chromium logs `Error: <svg> attribute height: Expected length, "auto".`). Use `viewBox="..."` + CSS `style={{ display: 'block', width: '100%', height: 'auto' }}`.
- **Parallel Backend/Frontend JSON Contract & `<sitemapindex>` Aggregation**: When building tool APIs (`panel-klienta-ai-seo`) and React clients (`ai-seo-strona`) in parallel, enforce exact 1:1 JSON property names in both prompts, aggregate all child `<urlset>` files when `/sitemap.xml` is a `<sitemapindex>` (`Promise.all`), parse `Organization.identifier` (`PropertyValue` for `KRS`/`REGON`/`LEI`), and never pass boolean schema flags (`geo: true`) straight into `String(val)` table cells.
- **Flex/Grid `min-width: 0` & `minmax(0, 1fr)` Containment on `<pre>` / `<code>` / `<table>` Results (`2117px` Blowout Trap)**: Never put `white-space: nowrap` `<code>` or `<pre>` inside a flex item (`flex: 1 1 260px`) or CSS Grid (`1fr` / implicit `auto`) without `min-width: 0; max-width: 100%; box-sizing: border-box;` on BOTH the code block AND its grid/flex ancestors (`.r-zwin`, `.narz-wynik`, `.narz-bramka`, `.sp2-sekcja-wyniku`), and wrap result `<table>` elements in `.sp2-tabela-wrap` (`overflow-x: auto; max-width: 100%; min-width: 0`). Never put 32-char hex filenames inside `.btn` (`white-space: nowrap` overflows at `481-680px`), and never set inline `gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'` on `.narz-siatka-formularza` (squishes mobile `360px` inputs to `132px`).
- **Pre-`<h1>` Boilerplate Stripping (`cytowalnoscGeo.ts`, `robotyAi.ts`), Strict CMS Footprints (`cwvVs.ts`) & Tag-Safe Phone Extraction (`lokalneNap.ts`)**: Strip `<header|nav|footer|aside|dialog|noscript>` and extract `<main>` (or slice after `</h1>`) so mobile menu drawers (`PL EN DE ✕`) never pollute RAG snippets or `robotyAi.ssr.podgladTekst`. In `cwvVs.ts`, detect WooCommerce/Elementor/Divi/Shopware/PrestaShop strictly via plugin/DOM asset footprints (`/plugins/woocommerce/`, `wc_add_to_cart_params`, `data-elementor-type`), never plain prose regex (`/woocommerce/i` misclassifies `wordpress.org`). In `lokalneNap.ts`, replace closing HTML block/link tags with `" | "` before regex-matching phones so adjacent UI counters (`518 815 055` + `13 narzędzi`) never concatenate, and reject statistical counts followed by units (`domen`, `stron`, `PLN`). Render SVG chart callouts (`Break-Even`) inside a top-anchored `<rect>` badge (`padT + 2..22`, clamped horizontally) so labels never collide with rising curves.
- **Embeddable Widget Badges (`rel="nofollow"`) & `vercel env pull` `[SENSITIVE]` Guard**: All embeddable tool SVG badges (`AudytSeoClient`, `TesterRobotowAiClient` across PL/EN/DE) must default to `rel="nofollow noopener"` with a visible checkbox per Google Spam Policies (*Widget links*). When running one-off DB/crawl scripts against Neon after `vercel env pull --environment=production`, always strip or replace literal `"[SENSITIVE]"` placeholders (`ENCRYPTION_KEY`, `PAGESPEED_API_KEY`) before computing HMAC-SHA256 hashes in `audit_domain_stats`.
