# llms-txt-check

Zero-dependency Node.js (`>= 18`) CLI to validate `/llms.txt`, `/llms-full.txt`, LLM token budgets (`~chars/4`), and AI search crawler access in `/robots.txt` (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `GPTBot`, `Google-Extended`).

Built and maintained by **[AI SEO COMPANY](https://www.ai-seo-company.pl/)**. Need to generate a clean `/llms.txt` from your XML sitemaps first? Use our free browser tool: **[llms.txt Generator](https://www.ai-seo-company.pl/en/tools/llms-txt-generator)**.

---

## Quick Start

Run directly with `npx` (no installation required):

```bash
npx llms-txt-check https://www.ai-seo-company.pl
```

Or install globally / as a dev dependency in CI:

```bash
npm install --save-dev llms-txt-check
npx llms-txt-check https://www.ai-seo-company.pl --strict
```

---

## What It Checks

1. **`/llms.txt` HTTP & Content-Type**:
   - Verifies HTTP `200`, `text/plain` or `text/markdown` header, redirect chains, and detects SPA HTML soft-404 fallbacks (`<!DOCTYPE html>`).
2. **Markdown Structure (`llms.txt` specification)**:
   - Single `# H1` project/company title at the top.
   - `>` blockquote summary right below `# H1`.
   - `## Section` headings (and optional `## Optional` section).
   - Valid Markdown links `[Title](https://...)`, flagging broken URLs, duplicate links, and insecure `http://` targets.
3. **LLM Context Token Budget**:
   - Estimates token footprint (`~chars / 4`) for both `/llms.txt` and `/llms-full.txt`, warning if `/llms.txt` grows past `25,000` tokens.
4. **AI Search vs Training Bots in `/robots.txt`**:
   - **AI Search / Citation crawlers** (warns if blocked): `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`.
   - **Model Training crawlers** (informational): `GPTBot`, `Google-Extended`.

---

## CLI Options

| Flag | Description |
| --- | --- |
| `--json` | Print machine-readable JSON output for CI pipelines and dashboards |
| `--strict` | Exit with code `1` when warnings are present (e.g. blocked search crawlers) |
| `--timeout <ms>` | Per-request timeout in milliseconds (default: `12000`) |
| `--no-color` | Disable ANSI colors (also respects `NO_COLOR=1`) |
| `-v, --version` | Print package version |
| `-h, --help` | Print usage guide |

### Exit Codes

- `0`: `/llms.txt` is valid (and `0` warnings when `--strict` is passed).
- `1`: `/llms.txt` is missing, returns HTML soft-404, fails structural validation, or `--strict` encountered warnings.

---

## GitHub Actions CI/CD Example

Add `.github/workflows/llms-txt.yml` to verify your production `/llms.txt` and `/robots.txt` after every deployment:

```yaml
name: Verify llms.txt & AI Crawlers

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 7 * * 1'

jobs:
  check-llms-txt:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Validate /llms.txt and /robots.txt
        run: npx llms-txt-check@latest https://www.ai-seo-company.pl --strict
```

---

## Related Free GEO & Technical SEO Tools

- **[AI SEO COMPANY](https://www.ai-seo-company.pl/)** - B2B SEO & Generative Engine Optimization (GEO) agency.
- **[Free llms.txt Generator](https://www.ai-seo-company.pl/en/tools/llms-txt-generator)** - Build `/llms.txt` automatically from your `sitemap.xml`.
- **[AI Crawler & robots.txt Live Tester](https://www.ai-seo-company.pl/en/tools/ai-crawler-robots-txt-checker)** - Test HTTP status, SSR HTML, and `robots.txt` for 10 AI bots.
- **[5-Engine AI Brand Visibility Checker](https://www.ai-seo-company.pl/en/ai-visibility-check)** - Check if ChatGPT, Gemini, Perplexity, Claude, and Google AI Overviews recommend your company.

## License

MIT (c) AI SIGNALS COMPANY Prosta Spółka Akcyjna ([https://www.ai-seo-company.pl/](https://www.ai-seo-company.pl/))
