---
name: ai-seo-release-and-i18n
description: >-
  Prevents regressions when editing pages, CSS, typography, cards, routing, sitemaps, or PL/EN/DE
  translations in ai-seo-strona. Activate before modifying Next.js routes, Server/Client Components,
  app/wyglad.css, lib/stronyEn.js, lib/stronyDe.js, lib/publikacja.js, or running npm run wydanie.
---

# AI SEO Strona - Release, i18n (PL/EN/DE), RSC & CSS Guardrails

## 0. Mandatory Triple-Check Rule (Potrójna Weryfikacja 3x)
Before presenting **any** conclusion from code, CSS cascade diagnosis, routing bug, or `file:line` claim to the user, verify it **3 independent times**:
1. **Pass 1 (Literal `read_file`)**: Inspect the exact lines of both selector/variable definition and target JSX markup directly in the main agent (treat subagent claims as untrusted leads).
2. **Pass 2 (Cascade & Registry Trace)**: Trace CSS specificity (`:where()` vs class vs inline vs `!important` in `wyglad.css`) and all 3 routing registries (`publikacja.js`, `stronyEn.js`, `stronyDe.js`).
3. **Pass 3 (Empirical Falsification)**: Verify against `getComputedStyle` on live DOM or build/script output; drop any claim that fails even 1 of the 3 checks.

## 1. Next.js 16 RSC vs `'use client'` Boundary Trap
- **Mistake learned**: Importing a named constant/array (e.g. `BEISPIELE_DE`) from a `'use client'` file into a Server Component turns that export into a React Client Reference proxy (`undefined` properties during SSR `next build`).
- **Rule**: Keep all shared data constants, presets, and pure math functions in plain non-client modules under `lib/` (e.g. `lib/kalkulatorStrat.de.js`), imported by both Server and Client Components.

## 2. `npm run wydanie` & Fixed-Point `lastmod.json`
- **Mistake learned 1**: Running `npm run wydanie` with uncommitted git changes exits with code `2` (`Drzewo robocze ma niezacommitowane zmiany`). Always commit code changes first, then run `npm run wydanie`; if `lib/lastmod.json` updates, commit `lib/lastmod.json` before `git push`.
- **Mistake learned 2**: Rendering `<time dateTime={p.updated}>` derived from `lib/lastmod.json` on hub cards WITHOUT `data-lastmod="pomin"` causes `wydanie.mjs`'s second-pass fixed-point check to fail (`zmienil sie odcisk po aktualizacji lastmod`).
- **Rule**: Any `<time>` on a hub/index page displaying another page's `lastmod` MUST include `data-lastmod="pomin"`.

## 3. PL / EN / DE 3-Registry Synchronization
- Adding a new multi-language page requires synchronized entries in:
  1. `lib/publikacja.js` (`PUBLIKACJA[sciezkaPl]`, `tytul <= 60` chars, `opis <= 155` chars, `segment`),
  2. `lib/stronyEn.js` (`STRONY_EN[sciezkaPl]` with `{ en, tytul, opis }`),
  3. `lib/stronyDe.js` (`STRONY_DE[sciezkaPl]` with `{ de, grupa, gotowa: true, tytul, h1, fraza, opis }` — `opis` MUST be `120-158` chars, verified via `node scripts/kontrola-stronyDe.mjs --publikacja`! Also update the expected `STRONY_DE` count in `scripts/kontrola-stronyDe.mjs`).
- In `Breadcrumbs`, `parent` MUST pass the Polish route key (`parent={{ href: '/narzedzia', pl: '...', en: '...', de: '...' }}`), NEVER a `/de/...` path or `label` prop (`Breadcrumbs.jsx` checks `maWersjeDe(parent.href)` and reads `parent.de`).
- Never use `/pl/` prefixes; never use `–` or `—` (use `-`).

## 5. `AppleFaq` `<p dangerouslySetInnerHTML>` Hydration Mismatch (`React #418`) & CSP `img-src`
- **Mistake learned 1 (`React #418` from `<div id="root">` in FAQ string)**: `AppleFaq.jsx` renders FAQ `answer` strings inside `<p dangerouslySetInnerHTML={{ __html: answer }}>`. Never put raw HTML block tags (`<div>`, `<p>`, `<ul>`, `<pre>`) inside FAQ `answer` strings — the browser HTML parser auto-closes `<p>` before React hydrates, causing `Minified React error #418`! Escape literal tags (`<code>&lt;div id=&quot;root&quot;&gt;</code>`).
- **Mistake learned 2 (`CSP_REPORT_ONLY` `img-src`)**: When embedding dynamic SVG badges/images from `https://panel.ai-seo-company.pl`, ensure `https://panel.ai-seo-company.pl` is whitelisted in `img-src` (not just `connect-src`) in `next.config.mjs`.

## 4. CSS, Responsive Breakpoints & Inline-Flex Whitespace Traps
- **Mistake learned 1 (`inline-flex` swallowing trailing spaces)**: Putting `"Link kopiert. "` inside `<span className="r-stan--ok">` (`display: inline-flex`) collapses the trailing space before the next sibling text node (`"Link kopiert.Der Link..."`). Always place `{' '}` **outside** the `inline-flex` element!
- **Mistake learned 2 (`max-width: 600px` sticky action bars)**: Never combine `flex-wrap: nowrap` + `.btn { flex: 1 0 auto }` alongside dynamic summary text on narrow mobile (`390px`) — long German/Polish labels break mid-word (`Entga / ngene / r`). Stack `.kalk-akcja` vertically (`flex-direction: column; align-items: stretch;`) on `<= 600px`.
- **Mistake learned 3 (`992px` vs `900px` Contact grid)**: `.contact-box` in `globals.css` collapses from 2 columns to 1 column at `@media (max-width: 992px)`. Any bottom clearance for the `.contact` background antenna MUST switch at `992px` (not `900px`) and use versioned asset names (`antena-linie-v3-*`) to bust immutable CDN cache.
- **Mistake learned 4 (Card False Affordances)**: Never apply `:hover { translateY(-4px) }` or orange hover borders to non-clickable static proof/metric cards (`WhyUs`, `Portfolio` mosaic, `PanelShowcase` features, `Pricing` container). Reserve lift + constant `→` signifier strictly for clickable navigation cards (Variant A).
- **Mistake learned 5 (Font Preload Bloat & `latin-ext`)**: Only load `Geist` + `Geist_Mono` with `subsets: ['latin', 'latin-ext']` on `<html>` (including `app/global-not-found.js`). Omitting `latin-ext` breaks Polish diacritics (`ą ć ę ł ń ś ź ż`) into `Arial`.
- **Mistake learned 6 (`-webkit-line-clamp` + vertical `padding` clipping bug)**: Never put `padding-top` / `padding-bottom` on the same element that has `display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden;` (e.g. `.nawSpis a` in `narzedzia.module.css`) - Chromium includes `padding-top` in the 2-line height box and slices through the 2nd/3rd line ascenders above `padding-bottom`. Put vertical padding on a wrapper `<li>` or inner `<span>` instead.
- **Mistake learned 7 (`H1/H2 = 500`, `H3 = 600`, `select.narz-pole` & `tabular-nums`)**: Keep `H1` and `H2` at `font-weight: 500` and enforce `H3` at `font-weight: 600` (`main h3:not(.hero *)` + `styl.js`). Style `<select className="narz-pole">` with `appearance: none` + custom chevron, use `var(--w-sans)` inside inline `<svg><text>`, and apply `font-variant-numeric: tabular-nums` to all live slider outputs, KPI badges, and right-aligned score columns.
