#!/usr/bin/env node

/**
 * llms-txt-check v1.0.0
 * Zero-dependency CLI validator for /llms.txt, /llms-full.txt, LLM token budgets,
 * and AI crawler directives in /robots.txt.
 *
 * Author: AI SEO COMPANY (https://www.ai-seo-company.pl/)
 * Web Generator: https://www.ai-seo-company.pl/en/tools/llms-txt-generator
 * License: MIT
 */

const VERSION = '1.0.0';
const USER_AGENT = `llms-txt-check/${VERSION} (+https://www.ai-seo-company.pl/en/tools/llms-txt-generator)`;
const DEFAULT_TIMEOUT_MS = 12000;
const TOKEN_WARN_LIMIT = 25000;

const AI_BOTS = [
  { name: 'OAI-SearchBot', kind: 'search', vendor: 'OpenAI (ChatGPT Search)' },
  { name: 'PerplexityBot', kind: 'search', vendor: 'Perplexity AI Search' },
  { name: 'Claude-SearchBot', kind: 'search', vendor: 'Anthropic Claude Search' },
  { name: 'GPTBot', kind: 'training', vendor: 'OpenAI Model Training' },
  { name: 'Google-Extended', kind: 'training', vendor: 'Google Gemini Training Control' },
];

function parseArgs(argv) {
  const opts = {
    target: null,
    json: false,
    strict: false,
    noColor: false,
    help: false,
    version: false,
    timeoutMs: DEFAULT_TIMEOUT_MS,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') opts.json = true;
    else if (arg === '--strict') opts.strict = true;
    else if (arg === '--no-color') opts.noColor = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg === '--version' || arg === '-v') opts.version = true;
    else if (arg === '--timeout') {
      const next = Number(argv[i + 1]);
      if (Number.isFinite(next) && next > 0) {
        opts.timeoutMs = next;
        i += 1;
      }
    } else if (arg.startsWith('--timeout=')) {
      const val = Number(arg.split('=')[1]);
      if (Number.isFinite(val) && val > 0) opts.timeoutMs = val;
    } else if (!arg.startsWith('-') && !opts.target) {
      opts.target = arg;
    }
  }

  return opts;
}

function createPalette(enabled) {
  const wrap = (code) => (enabled ? (s) => `\x1b[${code}m${s}\x1b[0m` : (s) => String(s));
  return {
    bold: wrap('1'),
    dim: wrap('2'),
    green: wrap('32'),
    yellow: wrap('33'),
    red: wrap('31'),
    cyan: wrap('36'),
  };
}

function printHelp() {
  console.log(`llms-txt-check v${VERSION}
Validate /llms.txt, /llms-full.txt, token budgets, and AI bot rules in /robots.txt.

Usage:
  npx llms-txt-check <domain-or-url> [options]

Options:
  --json           Output machine-readable JSON report
  --strict         Exit with code 1 on warnings (e.g. blocked AI search crawlers)
  --timeout <ms>   HTTP request timeout in milliseconds (default: ${DEFAULT_TIMEOUT_MS})
  --no-color       Disable ANSI terminal colors
  -v, --version    Show CLI version
  -h, --help       Show this help message

Examples:
  npx llms-txt-check https://www.ai-seo-company.pl
  npx llms-txt-check ai-seo-company.pl --json
  npx llms-txt-check https://www.ai-seo-company.pl --strict

Interactive generator & audit tools:
  https://www.ai-seo-company.pl/en/tools/llms-txt-generator`);
}

function normalizeOrigin(rawInput) {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed) throw new Error('Missing domain or URL argument.');
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProto);
  if (!parsed.hostname || !parsed.hostname.includes('.')) {
    throw new Error(`Invalid hostname: "${trimmed}"`);
  }
  return parsed.origin;
}

function looksLikeHtml(body, contentType) {
  const ct = String(contentType || '').toLowerCase();
  if (ct.includes('text/html') || ct.includes('application/xhtml')) return true;
  const sample = String(body || '').trimStart().slice(0, 240).toLowerCase();
  return sample.startsWith('<!doctype html') || sample.startsWith('<html');
}

async function fetchTextResource(url, timeoutMs) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/plain, text/markdown, */*;q=0.8',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    return {
      requestedUrl: url,
      finalUrl: res.url || url,
      redirected: Boolean(res.redirected && res.url && res.url !== url),
      status: res.status,
      ok: res.ok,
      contentType,
      isHtmlFallback: res.ok && looksLikeHtml(text, contentType),
      text,
      bytes: Buffer.byteLength(text, 'utf8'),
      error: null,
    };
  } catch (err) {
    return {
      requestedUrl: url,
      finalUrl: url,
      redirected: false,
      status: 0,
      ok: false,
      contentType: '',
      isHtmlFallback: false,
      text: '',
      bytes: 0,
      error: err && err.message ? err.message : String(err),
    };
  }
}

function stripFencedCode(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      out.push('');
      continue;
    }
    out.push(inFence ? '' : line);
  }
  return out;
}

function analyzeLlmsTxt(rawText, origin) {
  const chars = rawText.length;
  const approxTokens = Math.ceil(chars / 4);
  const lines = stripFencedCode(rawText);

  const h1List = [];
  const h2List = [];
  const blockquoteLines = [];
  let seenContentAfterQuote = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (blockquoteLines.length > 0) seenContentAfterQuote = true;
      continue;
    }
    if (/^#\s+\S+/.test(trimmed)) {
      h1List.push(trimmed.replace(/^#\s+/, '').trim());
      continue;
    }
    if (/^##\s+\S+/.test(trimmed)) {
      h2List.push(trimmed.replace(/^##\s+/, '').trim());
      seenContentAfterQuote = true;
      continue;
    }
    if (trimmed.startsWith('>') && !seenContentAfterQuote && h2List.length === 0) {
      blockquoteLines.push(trimmed.replace(/^>\s?/, '').trim());
    }
  }

  const linkRegex = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const links = [];
  const seenUrls = new Set();
  let duplicateLinks = 0;
  let relativeLinks = 0;
  let insecureHttpLinks = 0;
  let invalidLinks = 0;

  const cleanBody = lines.join('\n');
  let match = linkRegex.exec(cleanBody);
  while (match !== null) {
    const title = match[1].trim();
    const rawHref = match[2].trim();
    let resolved = rawHref;
    let valid = true;
    const isRelative = !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawHref);
    if (isRelative) relativeLinks += 1;

    try {
      const parsed = new URL(rawHref, origin);
      resolved = parsed.href;
      if (parsed.protocol === 'http:') insecureHttpLinks += 1;
    } catch {
      valid = false;
      invalidLinks += 1;
    }

    if (seenUrls.has(resolved)) duplicateLinks += 1;
    else seenUrls.add(resolved);

    links.push({ title, href: rawHref, resolved, valid });
    match = linkRegex.exec(cleanBody);
  }

  const summary = blockquoteLines.filter(Boolean).join(' ');
  const summaryWords = summary ? summary.split(/\s+/).length : 0;

  return {
    chars,
    lines: rawText.split(/\r?\n/).length,
    approxTokens,
    h1Count: h1List.length,
    h1Title: h1List[0] || null,
    hasBlockquote: blockquoteLines.length > 0 && summary.length > 0,
    summaryChars: summary.length,
    summaryWords,
    h2Count: h2List.length,
    h2Sections: h2List,
    hasOptionalSection: h2List.some((s) => s.toLowerCase() === 'optional'),
    linkCount: links.length,
    uniqueUrlCount: seenUrls.size,
    duplicateLinks,
    relativeLinks,
    insecureHttpLinks,
    invalidLinks,
  };
}

function parseRobotsGroups(robotsText) {
  const groups = [];
  let currentAgents = [];
  let currentRules = [];
  let sawRuleInGroup = false;

  const rawLines = String(robotsText || '').split(/\r?\n/);
  for (const raw of rawLines) {
    const clean = raw.replace(/#.*$/, '').trim();
    if (!clean) continue;
    const colonIdx = clean.indexOf(':');
    if (colonIdx === -1) continue;
    const field = clean.slice(0, colonIdx).trim().toLowerCase();
    const value = clean.slice(colonIdx + 1).trim();

    if (field === 'user-agent') {
      if (sawRuleInGroup && currentAgents.length > 0) {
        groups.push({ agents: currentAgents, rules: currentRules });
        currentAgents = [];
        currentRules = [];
        sawRuleInGroup = false;
      }
      if (value) currentAgents.push(value.toLowerCase());
    } else if (field === 'allow' || field === 'disallow') {
      if (currentAgents.length === 0) continue;
      sawRuleInGroup = true;
      currentRules.push({ type: field, pattern: value });
    }
  }

  if (currentAgents.length > 0) {
    groups.push({ agents: currentAgents, rules: currentRules });
  }
  return groups;
}

function ruleMatchesRoot(pattern) {
  if (!pattern) return false;
  const p = pattern.trim();
  if (p === '/' || p === '/*' || p === '*') return true;
  if (p === '/$' || p === '/*$') return true;
  return false;
}

function evaluateBotInRobots(groups, botName) {
  const target = botName.toLowerCase();
  const specificRules = [];
  const wildcardRules = [];

  for (const g of groups) {
    if (g.agents.some((ua) => ua === target || target.startsWith(ua) && ua !== '*')) {
      specificRules.push(...g.rules);
    } else if (g.agents.includes('*')) {
      wildcardRules.push(...g.rules);
    }
  }

  const hasSpecificGroup = groups.some((g) => g.agents.includes(target));
  const activeRules = hasSpecificGroup ? specificRules : wildcardRules;
  const source = hasSpecificGroup ? 'explicit' : wildcardRules.length > 0 ? 'wildcard (*)' : 'implicit allow';

  let bestMatch = null;
  for (const r of activeRules) {
    if (!r.pattern) continue;
    if (!ruleMatchesRoot(r.pattern)) continue;
    const len = r.pattern.length;
    if (
      !bestMatch ||
      len > bestMatch.len ||
      (len === bestMatch.len && r.type === 'allow')
    ) {
      bestMatch = { type: r.type, pattern: r.pattern, len };
    }
  }

  const allowed = bestMatch ? bestMatch.type !== 'disallow' : true;
  return {
    allowed,
    source,
    matchedRule: bestMatch ? `${bestMatch.type}: ${bestMatch.pattern}` : 'allow (default)',
  };
}

function buildAssessment(origin, llmsRes, llmsFullRes, robotsRes) {
  const checks = [];
  const warnings = [];
  const errors = [];

  const llmsFound = llmsRes.ok && !llmsRes.isHtmlFallback && llmsRes.text.trim().length > 0;
  let llmsStats = null;

  if (!llmsFound) {
    const reason = llmsRes.error
      ? `Network error: ${llmsRes.error}`
      : llmsRes.isHtmlFallback
        ? `Returned HTML page instead of plain text/markdown (HTTP ${llmsRes.status})`
        : `HTTP ${llmsRes.status}`;
    errors.push(`/llms.txt missing or invalid (${reason})`);
    checks.push({ id: 'llms_http', status: 'fail', message: `/llms.txt unreachable or HTML fallback (${reason})` });
  } else {
    const ct = llmsRes.contentType.toLowerCase();
    const ctOk = ct.includes('text/plain') || ct.includes('text/markdown');
    checks.push({
      id: 'llms_http',
      status: ctOk ? 'pass' : 'warn',
      message: `/llms.txt HTTP ${llmsRes.status} (${llmsRes.contentType || 'no content-type'}, ${llmsRes.bytes} B)`,
    });
    if (!ctOk) {
      warnings.push(`/llms.txt Content-Type is "${llmsRes.contentType || 'empty'}" (recommended: text/plain; charset=utf-8 or text/markdown)`);
    }
    if (llmsRes.redirected) {
      warnings.push(`/llms.txt redirected from ${llmsRes.requestedUrl} to ${llmsRes.finalUrl}`);
    }

    llmsStats = analyzeLlmsTxt(llmsRes.text, origin);

    if (llmsStats.h1Count === 1) {
      checks.push({ id: 'h1', status: 'pass', message: `H1 title present: "${llmsStats.h1Title}"` });
    } else if (llmsStats.h1Count === 0) {
      errors.push('/llms.txt is missing a top-level "# H1" title.');
      checks.push({ id: 'h1', status: 'fail', message: 'Missing top-level "# H1" heading' });
    } else {
      warnings.push(`/llms.txt contains ${llmsStats.h1Count} H1 headings (expected exactly 1).`);
      checks.push({ id: 'h1', status: 'warn', message: `Multiple H1 headings found (${llmsStats.h1Count})` });
    }

    if (llmsStats.hasBlockquote) {
      checks.push({
        id: 'blockquote',
        status: 'pass',
        message: `Summary blockquote ">" present (${llmsStats.summaryWords} words, ${llmsStats.summaryChars} chars)`,
      });
    } else {
      warnings.push('/llms.txt is missing a ">" summary blockquote right under "# H1".');
      checks.push({ id: 'blockquote', status: 'warn', message: 'Missing ">" summary blockquote' });
    }

    if (llmsStats.h2Count > 0) {
      checks.push({
        id: 'h2_sections',
        status: 'pass',
        message: `${llmsStats.h2Count} "##" section(s) found`,
      });
    } else {
      warnings.push('/llms.txt has 0 "##" sections.');
      checks.push({ id: 'h2_sections', status: 'warn', message: 'No "##" sections found' });
    }

    if (llmsStats.linkCount > 0 && llmsStats.invalidLinks === 0) {
      checks.push({
        id: 'markdown_links',
        status: 'pass',
        message: `${llmsStats.linkCount} Markdown link(s) (${llmsStats.uniqueUrlCount} unique URLs)`,
      });
    } else if (llmsStats.linkCount === 0) {
      errors.push('/llms.txt contains 0 Markdown links "[title](url)".');
      checks.push({ id: 'markdown_links', status: 'fail', message: 'No Markdown links "[title](url)" found' });
    } else {
      errors.push(`/llms.txt contains ${llmsStats.invalidLinks} malformed Markdown URL(s).`);
      checks.push({ id: 'markdown_links', status: 'fail', message: `${llmsStats.invalidLinks} invalid Markdown link URL(s)` });
    }

    if (llmsStats.insecureHttpLinks > 0) {
      warnings.push(`${llmsStats.insecureHttpLinks} link(s) use insecure http:// instead of https://.`);
    }
    if (llmsStats.duplicateLinks > 0) {
      warnings.push(`${llmsStats.duplicateLinks} duplicate link URL(s) detected in /llms.txt.`);
    }
    if (llmsStats.approxTokens > TOKEN_WARN_LIMIT) {
      warnings.push(`/llms.txt is ~${llmsStats.approxTokens} tokens (> ${TOKEN_WARN_LIMIT}); keep /llms.txt concise and move full docs to /llms-full.txt.`);
    }
  }

  const llmsFullFound = llmsFullRes.ok && !llmsFullRes.isHtmlFallback && llmsFullRes.text.trim().length > 0;
  const llmsFullStats = llmsFullFound
    ? {
        found: true,
        status: llmsFullRes.status,
        bytes: llmsFullRes.bytes,
        chars: llmsFullRes.text.length,
        approxTokens: Math.ceil(llmsFullRes.text.length / 4),
      }
    : {
        found: false,
        status: llmsFullRes.status,
        bytes: 0,
        chars: 0,
        approxTokens: 0,
      };

  const robotsFound = robotsRes.ok && !robotsRes.isHtmlFallback;
  const groups = robotsFound ? parseRobotsGroups(robotsRes.text) : [];
  const bots = AI_BOTS.map((b) => {
    if (!robotsFound) {
      return {
        ...b,
        allowed: true,
        source: 'no /robots.txt (implicit allow)',
        matchedRule: 'none',
      };
    }
    const res = evaluateBotInRobots(groups, b.name);
    if (b.kind === 'search' && !res.allowed) {
      warnings.push(`AI search crawler ${b.name} is blocked in /robots.txt (${res.matchedRule}).`);
    }
    return {
      ...b,
      ...res,
    };
  });

  return {
    tool: 'llms-txt-check',
    version: VERSION,
    checkedAt: new Date().toISOString(),
    origin,
    valid: errors.length === 0,
    llmsTxt: {
      url: llmsRes.finalUrl,
      found: llmsFound,
      status: llmsRes.status,
      contentType: llmsRes.contentType,
      bytes: llmsFound ? llmsRes.bytes : 0,
      stats: llmsStats,
    },
    llmsFullTxt: {
      url: llmsFullRes.finalUrl,
      ...llmsFullStats,
    },
    robotsTxt: {
      url: robotsRes.finalUrl,
      found: robotsFound,
      status: robotsRes.status,
      bots,
    },
    checks,
    warnings,
    errors,
  };
}

function formatNum(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

function printHumanReport(report, c) {
  const icon = (status) => {
    if (status === 'pass') return c.green('PASS');
    if (status === 'warn') return c.yellow('WARN');
    return c.red('FAIL');
  };

  console.log('');
  console.log(`${c.bold('llms-txt-check')} ${c.dim(`v${report.version}`)} - ${c.cyan(report.origin)}`);
  console.log(c.dim('-'.repeat(68)));

  for (const chk of report.checks) {
    console.log(`  [${icon(chk.status)}] ${chk.message}`);
  }

  if (report.llmsTxt.stats) {
    const s = report.llmsTxt.stats;
    console.log('');
    console.log(c.bold('Token & Content Metrics (/llms.txt):'));
    console.log(`  Characters : ${formatNum(s.chars)} chars (${formatNum(report.llmsTxt.bytes)} B)`);
    console.log(`  Est. Tokens: ~${formatNum(s.approxTokens)} LLM tokens (~chars/4)`);
    console.log(`  Sections   : ${s.h2Count} H2 (${s.h2Sections.slice(0, 6).join(', ')}${s.h2Count > 6 ? ', ...' : ''})`);
    console.log(`  Links      : ${s.linkCount} total, ${s.uniqueUrlCount} unique`);
  }

  console.log('');
  console.log(c.bold('Companion File (/llms-full.txt):'));
  if (report.llmsFullTxt.found) {
    console.log(`  [${c.green('FOUND')}] HTTP ${report.llmsFullTxt.status} - ~${formatNum(report.llmsFullTxt.approxTokens)} LLM tokens (${formatNum(report.llmsFullTxt.chars)} chars)`);
  } else {
    console.log(`  [${c.dim('OPTIONAL')}] Not present (HTTP ${report.llmsFullTxt.status || 'N/A'})`);
  }

  console.log('');
  console.log(c.bold('AI Crawler Directives (/robots.txt):'));
  for (const bot of report.robotsTxt.bots) {
    const tag = bot.allowed
      ? c.green('ALLOW')
      : bot.kind === 'search'
        ? c.red('BLOCK')
        : c.yellow('BLOCK');
    const role = bot.kind === 'search' ? 'search  ' : 'training';
    console.log(`  [${tag}] ${bot.name.padEnd(18)} (${role}) via ${bot.source} [${bot.matchedRule}]`);
  }

  if (report.warnings.length > 0) {
    console.log('');
    console.log(c.yellow(c.bold(`Warnings (${report.warnings.length}):`)));
    for (const w of report.warnings) {
      console.log(`  - ${c.yellow(w)}`);
    }
  }

  if (report.errors.length > 0) {
    console.log('');
    console.log(c.red(c.bold(`Errors (${report.errors.length}):`)));
    for (const e of report.errors) {
      console.log(`  - ${c.red(e)}`);
    }
  }

  console.log(c.dim('-'.repeat(68)));
  const summaryLabel = report.valid
    ? c.green(c.bold('RESULT: VALID /llms.txt'))
    : c.red(c.bold('RESULT: INVALID /llms.txt'));
  console.log(`${summaryLabel}  ${c.dim('| Generator: https://www.ai-seo-company.pl/en/tools/llms-txt-generator')}`);
  console.log('');
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.version) {
    console.log(VERSION);
    process.exit(0);
  }

  if (opts.help || !opts.target) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }

  let initialOrigin;
  try {
    initialOrigin = normalizeOrigin(opts.target);
  } catch (err) {
    if (opts.json) {
      console.log(JSON.stringify({ valid: false, error: err.message }, null, 2));
    } else {
      console.error(`Error: ${err.message}`);
    }
    process.exit(1);
  }

  const llmsRes = await fetchTextResource(`${initialOrigin}/llms.txt`, opts.timeoutMs);
  let resolvedOrigin = initialOrigin;
  try {
    if (llmsRes.finalUrl) resolvedOrigin = new URL(llmsRes.finalUrl).origin;
  } catch {
    resolvedOrigin = initialOrigin;
  }

  const [llmsFullRes, robotsRes] = await Promise.all([
    fetchTextResource(`${resolvedOrigin}/llms-full.txt`, opts.timeoutMs),
    fetchTextResource(`${resolvedOrigin}/robots.txt`, opts.timeoutMs),
  ]);

  const report = buildAssessment(resolvedOrigin, llmsRes, llmsFullRes, robotsRes);

  if (opts.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const colorEnabled = !opts.noColor && !process.env.NO_COLOR && Boolean(process.stdout.isTTY);
    printHumanReport(report, createPalette(colorEnabled));
  }

  const exitFail = !report.valid || (opts.strict && report.warnings.length > 0);
  process.exit(exitFail ? 1 : 0);
}

main();
