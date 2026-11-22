---
name: ai-seo-tools-qa-and-crawlers
description: >-
  Prevents backend and frontend bugs in AI SEO COMPANY's interactive SEO & GEO tools
  (ai-seo-strona + panel-klienta-ai-seo): crawlers, WAF/Cloudflare handling, AI visibility checks,
  multi-currency calculators, Common Crawl authority, llms.txt, email gates, and manual QA.
  Activate whenever building, editing, or testing any tool under /narzedzia, /en/tools, /de/tools,
  or panel-klienta-ai-seo/app/api/narzedzia.
---

# AI SEO Tools — Crawler, Localization & QA Guardrails

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
