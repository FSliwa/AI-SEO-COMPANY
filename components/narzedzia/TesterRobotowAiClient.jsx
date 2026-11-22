'use client';

// Interaktywny Tester Robotów AI, Parzystości SSR vs JS i Kreator Zapory robots.txt (PL + EN).
// Endpoint: POST ${PANEL_API}/roboty-ai z { url, lang: 'pl' | 'en' }.
// Obsługuje ?url= (wypełnienie pola i podmiana paska adresu po starcie) oraz tryb DEMO.

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import { Ocena, PasekDemo, Postep } from './Wspolne';
import Zwin from './Zwin';
import st from './narzedzia.module.css';

const CSS_RAI = `
.rai-siatka-ssr { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 0.65rem; margin-top: 1rem; }
.rai-kafel-ssr { padding: 0.85rem 0.95rem; border-radius: 14px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.rai-kafel-etykieta { margin: 0; font-size: 0.78rem; color: var(--w-tusz-2); line-height: 1.35; }
.rai-kafel-wartosc { margin: 0.25rem 0 0; font-size: 1.15rem; font-weight: 700; color: var(--w-tusz); line-height: 1.25; overflow-wrap: anywhere; }
.rai-pasek-tlo { height: 12px; border-radius: 999px; background: rgba(30, 30, 30, 0.08); overflow: hidden; margin-top: 0.55rem; }
.rai-pasek-wypelnienie { height: 100%; border-radius: 999px; transition: width 500ms cubic-bezier(0.2, 0.7, 0.2, 1); }
.rai-pigulka { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.28rem 0.68rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; line-height: 1.25; white-space: nowrap; max-width: 100%; }
@media (max-width: 480px) { .rai-pigulka { white-space: normal; text-align: left; } }
.rai-pigulka--ok { background: rgba(4, 120, 87, 0.12); color: #047857; }
.rai-pigulka--konflikt { background: rgba(179, 38, 30, 0.13); color: #b3261e; border: 1px solid rgba(179, 38, 30, 0.3); }
.rai-pigulka--uwaga { background: rgba(180, 83, 9, 0.12); color: #b45309; }
.rai-pigulka--ip { background: rgba(30, 64, 175, 0.1); color: #1e40af; }
.rai-pigulka--neutral { background: rgba(30, 30, 30, 0.08); color: var(--w-tusz-2); }
.rai-alert-waf { padding: 1rem 1.15rem; border-radius: 16px; background: rgba(179, 38, 30, 0.07); border: 1px solid rgba(179, 38, 30, 0.28); color: var(--w-tusz); }
.rai-alert-spa { padding: 1rem 1.15rem; border-radius: 16px; background: rgba(180, 83, 9, 0.08); border: 1px solid rgba(180, 83, 9, 0.3); color: var(--w-tusz); margin-top: 0.85rem; }
.rai-grupa { margin-top: 1.25rem; min-width: 0; max-width: 100%; }
.rai-grupa-h3 { margin: 0 0 0.35rem; font-size: 1.05rem; font-weight: 600; color: var(--w-tusz); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
.rai-wynik { grid-template-columns: minmax(0, 1fr); min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: auto; }
.rai-wynik > * { min-width: 0; max-width: 100%; box-sizing: border-box; }
.rai-kod-okno { margin: 0.75rem 0 0; padding: 1rem 1.15rem; border-radius: 16px; background: #141923; color: #f8fafc; font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 0.84rem; line-height: 1.6; min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: auto; white-space: pre; border: 1px solid rgba(255,255,255,0.08); }
.rai-akcje-kodu { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-top: 0.75rem; min-width: 0; max-width: 100%; }
.rai-odznaka-box { padding: 1.2rem 1.35rem; border-radius: 20px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.75rem; min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: auto; }
.rai-bofu { padding: clamp(1.25rem, 3vw, 1.75rem); border-radius: 22px; background: linear-gradient(135deg, #101935 0%, #1d2b53 100%); color: #ffffff; display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.85rem; min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: auto; }
.rai-bofu h2 { margin: 0; font-size: clamp(1.2rem, 2.4vw, 1.5rem); color: #ffffff; line-height: 1.25; }
.rai-bofu p { margin: 0; color: rgba(255, 255, 255, 0.86); line-height: 1.6; font-size: 0.96rem; }
.rai-bofu-akcje { display: flex; flex-wrap: wrap; gap: 0.7rem; align-items: center; margin-top: 0.25rem; }
.rai-bofu-link { color: #ffd7c2; text-decoration: underline; text-underline-offset: 3px; font-weight: 600; font-size: 0.94rem; }
`;

async function skopiujTekst(tekst) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // metoda zapasowa ponizej
  }
  try {
    const t = document.createElement('textarea');
    t.value = tekst;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand('copy');
    t.remove();
    return ok;
  } catch {
    return false;
  }
}

function pobierzPlikRobots(tekst) {
  const blob = new Blob([tekst], { type: 'text/plain;charset=utf-8' });
  const u = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = u;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}

function wyczyscDomene(surowy) {
  const s = String(surowy || '').trim();
  if (!s) return 'twojafirma.pl';
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '');
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || 'twojafirma.pl';
  }
}

function domyslnePolityki(domena, en) {
  const host = wyczyscDomene(domena);
  const naglowekRek = en
    ? `# Recommended AI & SEO robots.txt policy for ${host}\n# Allows search & citation bots (traffic + leads), blocks raw LLM training scrapers`
    : `# Rekomendowana polityka robots.txt dla ${host}\n# Wpuszcza wyszukiwarki i cytowania AI (ruch i leady), blokuje scrapery treningowe LLM`;
  const rekomendowana = `${naglowekRek}
User-agent: Googlebot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

# Block foundation model training scrapers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  const otwarta = `${en ? `# Open GEO policy for ${host} - allows all search, agent and training crawlers` : `# Polityka Otwarte GEO dla ${host} - pełny dostęp dla wyszukiwarek, agentów i modeli AI`}
User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  const zablokowana = `${en ? `# Strict AI block for ${host} - allows classic Google/Bing/Apple, blocks all AI bots` : `# Pełna blokada AI dla ${host} - zostawia klasyczne Google/Bing/Apple, blokuje wszystkie boty AI`}
User-agent: OAI-SearchBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Claude-SearchBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Perplexity-User
Disallow: /

User-agent: Claude-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  return { rekomendowana, otwarta, zablokowana };
}

function demoOdpowiedz(surowyUrl, en) {
  const domena = wyczyscDomene(surowyUrl || 'ai-seo-company.pl');
  const wzorzec = domena.includes('ai-seo-company');
  const spa = domena.includes('spa') || domena.includes('app');
  const polityki = domyslnePolityki(domena, en);

  if (wzorzec) {
    return {
      ok: true,
      url: `https://www.${domena}/`,
      domena,
      wynik: 96,
      robotsTxtIstnieje: true,
      llmsTxtIstnieje: true,
      ssrParity: {
        procent: 98,
        slowBezJs: 1420,
        h1: en ? 'SEO and AI Visibility Agency in Warsaw' : 'Agencja SEO i widoczności w AI z Warszawy',
        podgladTekst: en
          ? 'SEO and AI Visibility Agency in Warsaw. We build fast Next.js SSR websites and run transparent technical SEO and GEO campaigns for B2B and service companies. Pricing starts at €450 net/month with no long-term lock-in on SEO plans, full Search Console access and measurable AI citation tracking.'
          : 'Agencja SEO i widoczności w AI z Warszawy. Projektujemy szybkie strony w Next.js SSR oraz prowadzimy pozycjonowanie w Google i wyszukiwarkach AI (ChatGPT, Perplexity, Gemini, Google AI Overviews). Jasny cennik od 1 900 zł netto miesięcznie, dostęp do panelu zadań i mierzalny wzrost zapytań.',
        liczbaH2: 8,
        liczbaTabel: 2,
        liczbaLinkow: 46,
        maJsonLd: true,
        wykrytySzkieletSpa: false,
        framework: 'Next.js (SSR)',
      },
      boty: [
        { nazwa: 'Googlebot', grupa: 'wyszukiwanie', opisRoli: en ? 'Google Search & AI Overviews primary crawler' : 'Klasyczny indeks Google oraz baza AI Overviews', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: 'index, follow, max-snippet:-1', httpKod: 200, ttfbMs: 118, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'OAI-SearchBot', grupa: 'wyszukiwanie', opisRoli: en ? 'ChatGPT Search index & live citations' : 'Indeks wyszukiwarki ChatGPT i cytowania z linkiem', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: 'index, follow', httpKod: 200, ttfbMs: 142, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'PerplexityBot', grupa: 'wyszukiwanie', opisRoli: en ? 'Perplexity AI search index & source cards' : 'Indeks odpowiedzi i kart źródeł Perplexity', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 158, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Claude-SearchBot', grupa: 'wyszukiwanie', opisRoli: en ? 'Anthropic web search & citations' : 'Wyszukiwanie sieciowe i cytowania Claude', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 165, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Bingbot', grupa: 'wyszukiwanie', opisRoli: en ? 'Bing Search & Microsoft Copilot grounding' : 'Indeks Bing oraz zaplecze Microsoft Copilot', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 134, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Applebot', grupa: 'wyszukiwanie', opisRoli: en ? 'Apple Siri & Spotlight Search' : 'Apple Siri oraz wyszukiwarka Spotlight', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 147, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'ChatGPT-User', grupa: 'agent', opisRoli: en ? 'Live page fetch during a user prompt in ChatGPT' : 'Pobieranie strony na żywo podczas rozmowy w ChatGPT', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 149, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Perplexity-User', grupa: 'agent', opisRoli: en ? 'On-demand URL visit requested by Perplexity user' : 'Wejście na stronę na żądanie użytkownika Perplexity', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 161, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Claude-User', grupa: 'agent', opisRoli: en ? 'On-demand fetch triggered inside Claude chat' : 'Pobranie treści wywołane bezpośrednio w rozmowie Claude', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 170, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'GPTBot', grupa: 'trening', opisRoli: en ? 'OpenAI foundation model training corpus' : 'Zbieranie treści do trenowania modeli OpenAI', robots: 'zablokowany', blokadaLinia: { numer: 26, tresc: 'Disallow: /' }, xRobotsTag: null, httpKod: 200, ttfbMs: 140, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'ClaudeBot', grupa: 'trening', opisRoli: en ? 'Anthropic LLM training crawler' : 'Korpus treningowy modeli językowych Anthropic', robots: 'zablokowany', blokadaLinia: { numer: 29, tresc: 'Disallow: /' }, xRobotsTag: null, httpKod: 200, ttfbMs: 152, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'Google-Extended', grupa: 'trening', opisRoli: en ? 'Controls Gemini model training (not Google Search)' : 'Steruje treningiem Gemini (nie blokuje wyszukiwarki Google)', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 125, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Applebot-Extended', grupa: 'trening', opisRoli: en ? 'Apple Intelligence model training' : 'Trenowanie modeli Apple Intelligence', robots: 'zablokowany', blokadaLinia: { numer: 35, tresc: 'Disallow: /' }, xRobotsTag: null, httpKod: 200, ttfbMs: 156, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'Meta-ExternalAgent', grupa: 'trening', opisRoli: en ? 'Meta AI (Llama) training crawler' : 'Trenowanie modeli Meta AI (Llama)', robots: 'zablokowany', blokadaLinia: { numer: 38, tresc: 'Disallow: /' }, xRobotsTag: null, httpKod: 200, ttfbMs: 162, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'CCBot', grupa: 'trening', opisRoli: en ? 'Common Crawl open dataset used by LLM builders' : 'Otwarty zbiór Common Crawl używany do treningu modeli', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 180, cloudflareIpCheck: false, status: 'ok' },
      ],
      politykiRobots: polityki,
    };
  }

  return {
    ok: true,
    url: `https://${domena}/`,
    domena,
    wynik: spa ? 44 : 72,
    robotsTxtIstnieje: true,
    llmsTxtIstnieje: false,
    ssrParity: {
      procent: spa ? 18 : 81,
      slowBezJs: spa ? 42 : 690,
      h1: spa ? '' : (en ? 'Precision Industrial Solutions & Engineering' : 'Precyzyjne rozwiązania przemysłowe dla firm'),
      podgladTekst: spa
        ? (en ? 'Loading application... Please enable JavaScript to view this site.' : 'Ładowanie aplikacji... Włącz obsługę JavaScript w przeglądarce, aby wyświetlić zawartość strony.')
        : (en
          ? 'Precision Industrial Solutions & Engineering. Custom CNC machining, laser cutting and surface treatment for B2B manufacturing partners. ISO 9001 certified production plant with 48-hour quote turnaround and dedicated technical support.'
          : 'Precyzyjne rozwiązania przemysłowe dla firm. Obróbka CNC, cięcie laserowe oraz powłoki techniczne dla przemysłu w całej Polsce. Wycena dokumentacji CAD w 48 godzin, własny park maszynowy i certyfikat jakości ISO 9001.'),
      liczbaH2: spa ? 0 : 5,
      liczbaTabel: spa ? 0 : 1,
      liczbaLinkow: spa ? 3 : 28,
      maJsonLd: !spa,
      wykrytySzkieletSpa: spa,
      framework: spa ? 'React SPA (CSR)' : 'WordPress',
    },
    boty: [
      { nazwa: 'Googlebot', grupa: 'wyszukiwanie', opisRoli: en ? 'Google Search & AI Overviews primary crawler' : 'Klasyczny indeks Google oraz baza AI Overviews', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: 'index, follow', httpKod: 200, ttfbMs: 590, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'OAI-SearchBot', grupa: 'wyszukiwanie', opisRoli: en ? 'ChatGPT Search index & live citations' : 'Indeks wyszukiwarki ChatGPT i cytowania z linkiem', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 640, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'PerplexityBot', grupa: 'wyszukiwanie', opisRoli: en ? 'Perplexity AI search index & source cards' : 'Indeks odpowiedzi i kart źródeł Perplexity', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 403, ttfbMs: 95, cloudflareIpCheck: false, status: 'konflikt_waf' },
      { nazwa: 'Claude-SearchBot', grupa: 'wyszukiwanie', opisRoli: en ? 'Anthropic web search & citations' : 'Wyszukiwanie sieciowe i cytowania Claude', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 685, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Bingbot', grupa: 'wyszukiwanie', opisRoli: en ? 'Bing Search & Microsoft Copilot grounding' : 'Indeks Bing oraz zaplecze Microsoft Copilot', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 403, ttfbMs: 88, cloudflareIpCheck: true, status: 'weryfikacja_ip' },
      { nazwa: 'Applebot', grupa: 'wyszukiwanie', opisRoli: en ? 'Apple Siri & Spotlight Search' : 'Apple Siri oraz wyszukiwarka Spotlight', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 612, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'ChatGPT-User', grupa: 'agent', opisRoli: en ? 'Live page fetch during a user prompt in ChatGPT' : 'Pobieranie strony na żywo podczas rozmowy w ChatGPT', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 655, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Perplexity-User', grupa: 'agent', opisRoli: en ? 'On-demand URL visit requested by Perplexity user' : 'Wejście na stronę na żądanie użytkownika Perplexity', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 403, ttfbMs: 92, cloudflareIpCheck: false, status: 'konflikt_waf' },
      { nazwa: 'Claude-User', grupa: 'agent', opisRoli: en ? 'On-demand fetch triggered inside Claude chat' : 'Pobranie treści wywołane bezpośrednio w rozmowie Claude', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 702, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'GPTBot', grupa: 'trening', opisRoli: en ? 'OpenAI foundation model training corpus' : 'Zbieranie treści do trenowania modeli OpenAI', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: 'noai', httpKod: 200, ttfbMs: 630, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'ClaudeBot', grupa: 'trening', opisRoli: en ? 'Anthropic LLM training crawler' : 'Korpus treningowy modeli językowych Anthropic', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 660, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Google-Extended', grupa: 'trening', opisRoli: en ? 'Controls Gemini model training (not Google Search)' : 'Steruje treningiem Gemini (nie blokuje wyszukiwarki Google)', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 615, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Applebot-Extended', grupa: 'trening', opisRoli: en ? 'Apple Intelligence model training' : 'Trenowanie modeli Apple Intelligence', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 640, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Meta-ExternalAgent', grupa: 'trening', opisRoli: en ? 'Meta AI (Llama) training crawler' : 'Trenowanie modeli Meta AI (Llama)', robots: 'dozwolony', blokadaLinia: null, xRobotsTag: null, httpKod: 200, ttfbMs: 652, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'CCBot', grupa: 'trening', opisRoli: en ? 'Common Crawl open dataset used by LLM builders' : 'Otwarty zbiór Common Crawl używany do treningu modeli', robots: 'zablokowany', blokadaLinia: { numer: 14, tresc: 'Disallow: /' }, xRobotsTag: null, httpKod: 200, ttfbMs: 645, cloudflareIpCheck: false, status: 'zablokowany_robots' },
    ],
    politykiRobots: polityki,
  };
}

function OdznakaPodgladSvg({ domena, wynik }) {
  const tekstPrawy = `AI Ready ${wynik}/100`;
  return (
    <svg width="248" height="32" viewBox="0 0 248 32" role="img" aria-label={`${domena} - ${tekstPrawy}`} style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}>
      <rect width="248" height="32" rx="8" fill="#101935" />
      <rect x="132" width="116" height="32" rx="8" fill="#d85a30" />
      <rect x="132" width="8" height="32" fill="#d85a30" />
      <circle cx="16" cy="16" r="5" fill="#34d399" />
      <text x="28" y="20" fill="#ffffff" fontFamily="var(--w-sans)" fontSize="11.5" fontWeight="600">
        AI SEO Verified
      </text>
      <text x="190" y="20" textAnchor="middle" fill="#ffffff" fontFamily="var(--w-sans)" fontSize="11.5" fontWeight="700">
        {tekstPrawy}
      </text>
    </svg>
  );
}

export function TesterRobotowAiClient() {
  const en = useLocale() === 'en';
  const jezyk = en ? 'en-US' : 'pl-PL';
  const [adres, setAdres] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null });
  const [aktywnaPolityka, setAktywnaPolityka] = useState('rekomendowana');
  const [skopiowanoRobots, setSkopiowanoRobots] = useState(false);
  const [pobranoRobots, setPobranoRobots] = useState(false);
  const [skopiowanoOdznake, setSkopiowanoOdznake] = useState(false);
  const [bladObrazkaOdznaki, setBladObrazkaOdznaki] = useState(false);
  const poleRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['url', 'wynik'], ({ url, wynik }) => {
    if (url) setAdres(url);
    if (wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(wynik)) {
      setStan({ status: 'loading', blad: null, wynik: null, id: wynik });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            if (!url && data.podglad.domena) setAdres(data.podglad.domena);
            setStan({ status: 'done', blad: null, wynik: data.podglad, id: wynik });
          } else {
            setStan({ status: 'idle', blad: null, wynik: null, id: null });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, wynik: null, id: null }));
    }
  });

  useEffect(() => {
    if (stan.status === 'done') wynikRef.current?.focus({ preventScroll: true });
  }, [stan.status]);

  useEffect(() => {
    if (!skopiowanoRobots) return undefined;
    const t = setTimeout(() => setSkopiowanoRobots(false), 3000);
    return () => clearTimeout(t);
  }, [skopiowanoRobots]);

  useEffect(() => {
    if (!pobranoRobots) return undefined;
    const t = setTimeout(() => setPobranoRobots(false), 2500);
    return () => clearTimeout(t);
  }, [pobranoRobots]);

  useEffect(() => {
    if (!skopiowanoOdznake) return undefined;
    const t = setTimeout(() => setSkopiowanoOdznake(false), 3000);
    return () => clearTimeout(t);
  }, [skopiowanoOdznake]);

  async function uruchomTest(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }
    setBladObrazkaOdznaki(false);
    setStan({ status: 'loading', blad: null, wynik: null, id: null });
    zapiszParametry({ url: wejscie, wynik: null });
    track('narzedzie_start', { narzedzie: 'roboty_ai' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 900));
      const d = demoOdpowiedz(wejscie, en);
      track('narzedzie_wynik', { narzedzie: 'roboty_ai', wynik: d.wynik });
      setStan({ status: 'done', blad: null, wynik: d });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/roboty-ai`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: en ? 'en' : 'pl' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not check this URL right now. Please verify the address and try again.' : 'Nie udało się sprawdzić tego adresu. Zweryfikuj domenę i spróbuj ponownie za chwilę.'),
          wynik: null,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'roboty_ai', wynik: w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'The server took too long to respond (timeout 45 s). Check if your firewall blocks external requests.' : 'Serwer odpowiadał zbyt długo (limit 45 s). Sprawdź, czy zapora sieciowa nie odrzuca zapytań.')
          : (en ? 'Could not connect to the diagnostic server. Check your connection and try again.' : 'Brak połączenia z serwerem diagnostycznym. Sprawdź połączenie z internetem i spróbuj ponownie.'),
        wynik: null,
      });
    } finally {
      clearTimeout(zegar);
    }
  }

  function wybierzPakietKontakt(plan) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
    }
    track('narzedzie_bofu_klik', { narzedzie: 'roboty_ai', plan });
  }

  const w = stan.wynik;
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const ssr = w?.ssr || w?.ssrParity || {};
  const procentSsr = Math.max(0, Math.min(100, Number(ssr.procent ?? 0)));
  const kolorPaskaSsr = ssr.wykrytySzkieletSpa || procentSsr < 50 ? '#b3261e' : procentSsr < 75 ? '#b45309' : '#047857';

  const boty = Array.isArray(w?.boty) ? w.boty : [];
  const botyWyszukiwanie = boty.filter((b) => b.grupa === 'wyszukiwanie' || (!['wyszukiwanie', 'agent', 'trening'].includes(b.grupa)));
  const botyAgenty = boty.filter((b) => b.grupa === 'agent');
  const botyTrening = boty.filter((b) => b.grupa === 'trening');
  const konfliktyWaf = boty.filter((b) => b.status === 'konflikt_waf');

  const zapasPolityk = domena ? domyslnePolityki(domena, en) : { rekomendowana: '', otwarta: '', zablokowana: '' };
  const polityki = {
    rekomendowana: w?.politykiRobots?.rekomendowana || zapasPolityk.rekomendowana,
    otwarta: w?.politykiRobots?.otwarta || zapasPolityk.otwarta,
    zablokowana: w?.politykiRobots?.zablokowana || zapasPolityk.zablokowana,
  };
  const tekstRobots = polityki[aktywnaPolityka] || polityki.rekomendowana;

  const urlOdznakiSvg = domena ? `https://panel.ai-seo-company.pl/api/narzedzia/badge/ai-ready?domain=${encodeURIComponent(domena)}` : '';
  const urlZwrotnyOdznaki = domena
    ? (en
      ? `https://www.ai-seo-company.pl/en/tools/ai-crawler-robots-txt-checker?url=${encodeURIComponent(domena)}`
      : `https://www.ai-seo-company.pl/narzedzia/tester-robotow-ai-robots-txt?url=${encodeURIComponent(domena)}`)
    : '';
  const kodHtmlOdznaki = domena
    ? `<a href="${urlZwrotnyOdznaki}" target="_blank" rel="noopener"><img src="${urlOdznakiSvg}" alt="${en ? `${domena} - AI Crawler Ready verified by AI SEO Company` : `${domena} - dostępna dla robotów AI (weryfikacja AI SEO Company)`}" width="248" height="32" /></a>`
    : '';

  const potrzebnySsr = Boolean(w && (procentSsr < 75 || ssr.wykrytySzkieletSpa));
  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  function renderujWierszBota(b) {
    const dozwolonyRobots = !/zablok|block|disallow|sperr/i.test(String(b.robots || ''));
    let odznakaStatusu;
    if (b.status === 'konflikt_waf') {
      odznakaStatusu = (
        <span className="rai-pigulka rai-pigulka--konflikt">
          {en ? '403 WAF Conflict' : '403 Konflikt WAF'}
        </span>
      );
    } else if (b.status === 'weryfikacja_ip' || b.cloudflareIpCheck) {
      odznakaStatusu = (
        <span className="rai-pigulka rai-pigulka--ip">
          {en ? 'Cloudflare Bot IP Check' : 'Weryfikacja IP bota (CF)'}
        </span>
      );
    } else if (b.status === 'zablokowany_robots') {
      odznakaStatusu = (
        <span className={`rai-pigulka ${b.grupa === 'trening' ? 'rai-pigulka--neutral' : 'rai-pigulka--uwaga'}`}>
          {en ? 'Blocked in robots.txt' : 'Zablokowany w robots.txt'}
        </span>
      );
    } else if (b.status === 'ok') {
      odznakaStatusu = (
        <span className="rai-pigulka rai-pigulka--ok">
          {en ? 'Allowed & Reachable' : 'Pełny dostęp (OK)'}
        </span>
      );
    } else {
      odznakaStatusu = (
        <span className="rai-pigulka rai-pigulka--konflikt">
          {en ? 'Connection Error' : 'Błąd odpowiedzi'}
        </span>
      );
    }

    const tekstLiniiBlokady = b.blokadaLinia
      ? (typeof b.blokadaLinia === 'string'
        ? b.blokadaLinia
        : (b.blokadaLinia.numer
          ? (en ? `Line ${b.blokadaLinia.numer} in robots.txt: ${b.blokadaLinia.tresc}` : `Linia ${b.blokadaLinia.numer} w robots.txt: ${b.blokadaLinia.tresc}`)
          : b.blokadaLinia.tresc))
      : null;

    return (
      <tr key={b.nazwa} style={b.status === 'konflikt_waf' ? { background: 'rgba(179, 38, 30, 0.04)' } : undefined}>
        <th scope="row" style={{ textAlign: 'left' }}>
          <span className="narz-silnik" style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.9rem' }}>{b.nazwa}</span>
          {b.opisRoli && <span className="narz-mikro">{b.opisRoli}</span>}
        </th>
        <td>
          <span className={`rai-pigulka ${dozwolonyRobots ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
            {dozwolonyRobots ? (en ? 'Allow' : 'Dozwolony') : (en ? 'Disallow' : 'Zablokowany')}
          </span>
          {tekstLiniiBlokady && (
            <code style={{ display: 'block', marginTop: '0.28rem', fontSize: '0.72rem', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz-2)', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>
              {tekstLiniiBlokady}
            </code>
          )}
        </td>
        <td style={{ fontVariantNumeric: 'tabular-nums' }}>
          <strong>{b.httpKod || '-'}</strong>
          {Number.isFinite(b.ttfbMs) ? <span className="narz-mikro" style={{ display: 'block', margin: 0 }}>{b.ttfbMs.toLocaleString(jezyk)} ms</span> : null}
          {b.xRobotsTag && (
            <code style={{ display: 'inline-block', marginTop: '0.25rem', padding: '0.1rem 0.35rem', borderRadius: '5px', background: 'rgba(15,23,42,0.06)', fontSize: '0.7rem', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)' }}>
              X-Robots-Tag: {b.xRobotsTag}
            </code>
          )}
        </td>
        <td>{odznakaStatusu}</td>
      </tr>
    );
  }

  function renderujGrupeBotow(tytul, podtytul, lista) {
    if (!lista.length) return null;
    return (
      <div className="rai-grupa">
        <div className="rai-grupa-h3">
          <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 700, color: 'var(--w-tusz)' }}>{tytul}</h3>
          <span className="narz-mikro" style={{ margin: 0 }}>{podtytul}</span>
        </div>
        <div className="narz-tabela-wrap" style={{ marginTop: '0.45rem' }}>
          <table className="narz-tabela">
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: 'left' }}>{en ? 'AI Crawler & Role' : 'Robot AI i rola'}</th>
                <th scope="col">{en ? 'robots.txt Rule' : 'Reguła robots.txt'}</th>
                <th scope="col">{en ? 'HTTP & TTFB' : 'Kod HTTP i TTFB'}</th>
                <th scope="col">{en ? 'Diagnostic Verdict' : 'Werdykt zapory'}</th>
              </tr>
            </thead>
            <tbody>{lista.map(renderujWierszBota)}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_RAI}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomTest}>
        <div>
          <label htmlFor="rai-url" className="narz-etykieta">
            {en ? 'Website URL or domain to inspect' : 'Adres strony lub domena do sprawdzenia'}
          </label>
          <div className="narz-bramka-wiersz">
            <input
              ref={poleRef}
              id="rai-url"
              name="url"
              required
              maxLength={300}
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
              placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'rai-blad' : undefined}
            />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_roboty_ai_start">
              {stan.status === 'loading'
                ? (en ? 'Testing 15 bots & SSR...' : 'Testuję 15 botów i SSR...')
                : (en ? 'Run AI Crawler Check' : 'Sprawdź roboty AI i SSR')}
            </button>
          </div>
          <PrzykladAdresu
            adresy={['ai-seo-company.pl', 'staniax.pl']}
            onWybierz={(a) => {
              setAdres(a);
              poleRef.current?.focus();
            }}
          />
        </div>

        <p className="narz-mikro" style={{ margin: 0 }}>
          {en
            ? 'Free, no sign-up and no email: simultaneously checks robots.txt rules, real HTTP firewall responses for 15 AI & search crawlers, HTML content visible without JavaScript (SSR parity), and generates a ready-to-deploy robots.txt.'
            : 'Za darmo, bez rejestracji i bez e-maila: narzędzie jednocześnie sprawdza reguły robots.txt, realny kod HTTP zapory serwerowej dla 15 botów AI i wyszukiwarek, widoczność treści bez JavaScriptu (parzystość SSR) i generuje gotowy plik robots.txt.'}
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Fetching robots.txt, /llms.txt and raw server HTML without JavaScript',
                  'Probing HTTP response codes, X-Robots-Tag and TTFB across 15 crawlers',
                  'Measuring SSR vs JS content parity and building your robots.txt policy',
                ]
              : [
                  'Pobieramy robots.txt, /llms.txt oraz surowy kod HTML bez JavaScriptu',
                  'Sprawdzamy kody odpowiedzi HTTP, X-Robots-Tag i TTFB dla 15 robotów',
                  'Liczymy parzystość treści SSR i budujemy polityki zapory robots.txt',
                ]}
            co={1300}
          />
        )}

        {stan.status === 'error' && (
          <p id="rai-blad" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik rai-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {/* 1. Naglowek wyniku: Pierscien 0-100 + podsumowanie plikow i frameworka */}
            <div className="narz-wynik-glowa">
              <Ocena wynik={w.wynik} podpis="AI Ready" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {w.wynik >= 80
                    ? (en
                      ? 'Your architecture and server rules cleanly expose content to AI citation engines.'
                      : 'Twoja architektura i zapora serwerowa prawidłowo udostępniają treść wyszukiwarkom AI.')
                    : w.wynik >= 50
                    ? (en
                      ? 'AI crawlers can partially read your site, but firewall conflicts, missing metadata or JS rendering limit citations.'
                      : 'Boty AI widzą część strony, ale konflikty WAF, braki w robots.txt albo renderowanie JS ograniczają cytowania.')
                    : (en
                      ? 'Critical visibility barrier: AI search bots are either blocked by your server firewall or see an empty JavaScript shell.'
                      : 'Krytyczna bariera widoczności: wyszukiwarki AI są blokowane przez serwer albo widzą pusty szkielet JavaScript.')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                  <span className={`rai-pigulka ${w.robotsTxtIstnieje ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
                    robots.txt: {w.robotsTxtIstnieje ? (en ? 'Found (200)' : 'Obecny (200)') : (en ? 'Missing' : 'Brak pliku')}
                  </span>
                  <span className={`rai-pigulka ${w.llmsTxtIstnieje ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
                    /llms.txt: {w.llmsTxtIstnieje ? (en ? 'Found (200)' : 'Obecny (200)') : (en ? 'Missing' : 'Brak pliku')}
                  </span>
                  {ssr.framework && (
                    <span className="rai-pigulka rai-pigulka--neutral">
                      {en ? 'Stack:' : 'Technologia:'} {ssr.framework}
                    </span>
                  )}
                </div>

                {!w.llmsTxtIstnieje && (
                  <p className="narz-mikro" style={{ marginTop: '0.55rem' }}>
                    {en ? 'Missing /llms.txt index for language models - ' : 'Brak pliku /llms.txt ze spisem najważniejszych podstron - '}
                    <Link href="/narzedzia/generator-llms-txt" className={st.przyciskTekstowy}>
                      {en ? 'build your llms.txt file in 15 seconds' : 'wygeneruj gotowy plik llms.txt w 15 sekund'}
                    </Link>.
                  </p>
                )}
              </div>
            </div>

            {/* 2. Miernik Parzystosci Tresci SSR vs JS */}
            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  {en ? 'SSR vs JavaScript Content Parity' : 'Parzystość treści SSR (widoczność bez JavaScriptu)'}
                </h2>
                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: kolorPaskaSsr, fontVariantNumeric: 'tabular-nums' }}>
                  {procentSsr}%
                </span>
              </div>
              <p className="narz-mikro">
                {en
                  ? 'OAI-SearchBot, PerplexityBot and ClaudeBot do not execute client-side React/Vue bundles like Chrome. Below is what they actually receive in the initial HTML response.'
                  : 'OAI-SearchBot, PerplexityBot i ClaudeBot nie uruchamiają skryptów JS w przeglądarce jak Googlebot. Poniżej widzisz dokładnie to, co serwer zwraca im w czystym HTML.'}
              </p>
              <div className="rai-pasek-tlo" role="progressbar" aria-valuenow={procentSsr} aria-valuemin={0} aria-valuemax={100} aria-label={en ? 'SSR content parity percentage' : 'Procent parzystości treści SSR'}>
                <div className="rai-pasek-wypelnienie" style={{ width: `${procentSsr}%`, background: kolorPaskaSsr }} />
              </div>

              {ssr.wykrytySzkieletSpa && (
                <div className="rai-alert-spa" role="alert">
                  <strong>{en ? 'Client-Side SPA Skeleton Detected:' : 'Wykryto pusty szkielet SPA (Client-Side Rendering):'}</strong>{' '}
                  {en
                    ? 'The raw HTML contains an empty root container (<div id="root"> or similar) with almost no text. AI crawlers index a blank page.'
                    : 'Surowy HTML zawiera niemal wyłącznie pusty kontener startowy aplikacji JS. Większość crawlerów AI indeksuje pustą stronę.'}
                </div>
              )}

              <div className="rai-siatka-ssr">
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">{en ? 'Detected Framework' : 'Wykryty silnik / CMS'}</p>
                  <p className="rai-kafel-wartosc">{ssr.framework || (en ? 'Server HTML' : 'Klasyczny HTML')}</p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">{en ? 'Words Without JS' : 'Słowa widoczne bez JS'}</p>
                  <p className="rai-kafel-wartosc">{Number(ssr.slowBezJs ?? 0).toLocaleString(jezyk)}</p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">{en ? 'H1 & H2 Headings' : 'Nagłówki H1 oraz H2'}</p>
                  <p className="rai-kafel-wartosc">
                    {ssr.h1 ? '1 H1' : '0 H1'} · {Number(ssr.liczbaH2 ?? 0)} H2
                  </p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">{en ? 'Tables & Links' : 'Tabele danych i linki'}</p>
                  <p className="rai-kafel-wartosc">
                    {Number(ssr.liczbaTabel ?? 0)} {en ? 'tbl' : 'tab.'} · {Number(ssr.liczbaLinkow ?? 0)} {en ? 'links' : 'linków'}
                  </p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">{en ? 'JSON-LD Schema' : 'Dane JSON-LD (Schema)'}</p>
                  <p className="rai-kafel-wartosc" style={{ color: ssr.maJsonLd ? '#047857' : '#b45309' }}>
                    {ssr.maJsonLd ? (en ? 'Present in HTML' : 'Obecne w HTML') : (en ? 'Missing' : 'Brak w HTML')}
                  </p>
                </div>
              </div>
              {ssr.h1 && (
                <p className="narz-mikro" style={{ marginTop: '0.65rem' }}>
                  <strong>{en ? 'Visible H1:' : 'Odczytany H1 bez JS:'}</strong> {ssr.h1}
                </p>
              )}
              {ssr.podgladTekst && (
                <details style={{ marginTop: '0.65rem', padding: '0.7rem 0.9rem', borderRadius: '12px', background: 'var(--w-papier, #f6f4ef)', border: '1px solid var(--w-linia, rgba(30,30,30,0.1))' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', color: 'var(--w-tusz)' }}>
                    {en
                      ? 'First 400 characters of clean SSR text visible to AI bots'
                      : 'Pierwsze 400 znaków czystego tekstu SSR widocznego dla botów AI'}
                  </summary>
                  <p style={{ margin: '0.55rem 0 0', fontSize: '0.84rem', lineHeight: 1.55, color: 'var(--w-tusz-2)', fontFamily: 'var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', overflowWrap: 'anywhere' }}>
                    {ssr.podgladTekst}
                  </p>
                </details>
              )}
            </div>

            {/* 3. Macierz 15 botow AI: robots.txt vs realny kod zapory HTTP */}
            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <h2 className="narz-h2" style={{ marginTop: 0 }}>
                {en
                  ? `${boty.length || 15}-Bot Split Matrix: robots.txt Rule vs Live Server Firewall`
                  : `Macierz ${boty.length || 15} robotów AI: deklaracja robots.txt kontra zapora HTTP`}
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.85rem' }}>
                {en
                  ? 'Many websites allow AI bots in robots.txt while unknowingly blocking them with a 403 error in Cloudflare, Wordfence or hosting WAF.'
                  : 'Wiele stron wpuszcza boty w pliku robots.txt, ale jednocześnie wycina je błędem 403 na poziomie Cloudflare, Wordfence albo zapory hostingu.'}
              </p>

              {konfliktyWaf.length > 0 && (
                <div className="rai-alert-waf" role="alert">
                  <strong>
                    {en ? 'WAF Conflict Detected:' : 'Wykryto konflikt zapory WAF:'}
                  </strong>{' '}
                  ({konfliktyWaf.map((k) => k.nazwa).join(', ')}) -{' '}
                  {en
                    ? 'Your robots.txt invites these crawlers in, yet your server firewall rejects their HTTP requests with status 403. Disable aggressive Bot Fight Mode or whitelist verified AI crawler ASNs.'
                    : 'Plik robots.txt pozwala tym botom wejść na stronę, ale serwer odrzuca ich zapytanie kodem 403. Sprawdź ustawienia Bot Fight Mode w CDN lub zaporę bezpieczeństwa hostingu.'}
                </div>
              )}

              {renderujGrupeBotow(
                en ? '1. AI Search & Citations (drives traffic & leads)' : '1. Wyszukiwarki i cytowania AI (dają ruch oraz zapytania)',
                en ? 'Keep ALLOWED' : 'Rekomendacja: WPUŚĆ',
                botyWyszukiwanie
              )}
              {renderujGrupeBotow(
                en ? '2. User-Triggered AI Agents (live browsing in chat)' : '2. Agenty wywoływane przez użytkownika w rozmowie',
                en ? 'Keep ALLOWED' : 'Rekomendacja: WPUŚĆ',
                botyAgenty
              )}
              {renderujGrupeBotow(
                en ? '3. LLM Training Scrapers (model corpus building)' : '3. Scrapery treningowe modeli LLM (budowa wag modelu)',
                en ? 'Safe to BLOCK without losing citations' : 'Możesz ZABLOKOWAĆ bez utraty cytowań',
                botyTrening
              )}
            </div>

            {/* 4. Kreator zapory robots.txt 1-Click */}
            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <h2 className="narz-h2" style={{ marginTop: 0 }}>
                {en ? '1-Click robots.txt AI Firewall Generator' : 'Kreator polityki robots.txt (1 kliknięcie)'}
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.75rem' }}>
                {en
                  ? 'Choose your strategy below to separate AI search visibility from uncompensated LLM training.'
                  : 'Wybierz gotową politykę dla swojej domeny: oddziel widoczność w wyszukiwarkach AI od darmowego trenowania cudzych modeli.'}
              </p>

              <div className="narz-filtry" role="group" aria-label={en ? 'robots.txt policy presets' : 'Warianty polityki robots.txt'}>
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'rekomendowana'}
                  onClick={() => setAktywnaPolityka('rekomendowana')}
                >
                  {en ? 'Recommended: Allow AI Search + Block Training' : 'Rekomendowana: Wpuść wyszukiwarki AI + Zablokuj trening'}
                </button>
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'otwarta'}
                  onClick={() => setAktywnaPolityka('otwarta')}
                >
                  {en ? 'Open GEO (Allow All)' : 'Otwarte GEO (Pełny dostęp)'}
                </button>
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'zablokowana'}
                  onClick={() => setAktywnaPolityka('zablokowana')}
                >
                  {en ? 'Strict Block (Classic SEO Only)' : 'Pełna blokada AI'}
                </button>
              </div>

              <pre className="rai-kod-okno" tabIndex={0} aria-label="robots.txt">
                <code>{tekstRobots}</code>
              </pre>

              <div className="rai-akcje-kodu">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={async () => {
                    const ok = await skopiujTekst(tekstRobots);
                    if (ok) {
                      setSkopiowanoRobots(true);
                      track('narzedzie_kopiuj_robots', { polityka: aktywnaPolityka });
                    }
                  }}
                >
                  {skopiowanoRobots
                    ? (en ? 'Copied robots.txt!' : 'Skopiowano robots.txt!')
                    : (en ? 'Copy robots.txt' : 'Kopiuj robots.txt')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={() => {
                    pobierzPlikRobots(tekstRobots);
                    setPobranoRobots(true);
                    track('narzedzie_pobierz_robots', { polityka: aktywnaPolityka });
                  }}
                >
                  {pobranoRobots
                    ? (en ? 'Downloaded!' : 'Pobrano plik!')
                    : (en ? 'Download robots.txt' : 'Pobierz plik robots.txt')}
                </button>
              </div>
            </div>

            {/* 5. Odznaka AI-Ready dla wyniku >= 70 */}
            {w.wynik >= 70 && (
              <div className="rai-odznaka-box">
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  {en ? 'Verified AI-Ready Website Badge' : 'Dynamiczna odznaka AI-Ready na Twoją stronę'}
                </h2>
                <p className="narz-mikro" style={{ margin: 0 }}>
                  {en
                    ? `Your domain scored ${w.wynik}/100. Embed this live SVG status badge in your footer or technical documentation:`
                    : `Twoja domena uzyskała wynik ${w.wynik}/100. Możesz osadzić w stopce dynamiczną odznakę SVG potwierdzającą dostępność dla wyszukiwarek AI:`}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {!DEMO && !bladObrazkaOdznaki ? (
                    /* eslint-disable-next-line @next/next/no-img-element -- dynamiczny zewnetrzny obraz SVG odznaki z API panelu */
                    <img
                      src={urlOdznakiSvg}
                      alt={`${domena} - AI Ready ${w.wynik}/100`}
                      width={248}
                      height={32}
                      onError={() => setBladObrazkaOdznaki(true)}
                      style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  ) : (
                    <OdznakaPodgladSvg domena={domena} wynik={w.wynik} />
                  )}
                </div>
                <pre className={st.snippetKod} style={{ margin: 0 }}>
                  <code>{kodHtmlOdznaki}</code>
                </pre>
                <div>
                  <button
                    type="button"
                    className={st.przyciskKopiujLink}
                    onClick={async () => {
                      const ok = await skopiujTekst(kodHtmlOdznaki);
                      if (ok) {
                        setSkopiowanoOdznake(true);
                        track('narzedzie_odznaka_kopiuj', { domena });
                      }
                    }}
                  >
                    {skopiowanoOdznake
                      ? (en ? 'Badge HTML copied!' : 'Skopiowano kod HTML odznaki!')
                      : (en ? 'Copy badge HTML snippet' : 'Kopiuj kod HTML odznaki')}
                  </button>
                </div>
              </div>
            )}

            {/* 6. Most konwersyjny BOFU dopasowany do diagnozy SSR */}
            <div className="rai-bofu">
              {potrzebnySsr ? (
                <>
                  <h2>
                    {en
                      ? `AI crawlers only see ${procentSsr}% of your page without JavaScript`
                      : `Roboty AI widzą tylko ${procentSsr}% treści Twojej strony bez JavaScriptu`}
                  </h2>
                  <p>
                    {en
                      ? `Client-rendered pages hide headings, tables and internal links from OAI-SearchBot and PerplexityBot. In our Booster Pack (€${CENY.boosterPack.eur} net/mo, ${CENY.boosterPack.umowaMiesiecy}-month minimum), we build a custom Next.js SSR website for €0 upfront alongside full SEO and GEO execution.`
                      : `Strony renderowane po stronie przeglądarki ukrywają nagłówki, tabele i linki przed OAI-SearchBot oraz PerplexityBot. W pakiecie Booster Pack (${CENY.boosterPack.pln.toLocaleString('pl-PL')} zł netto/mies., umowa na min. ${CENY.boosterPack.umowaMiesiecy} mies.) kodujemy od zera stronę Next.js z pełnym SSR za 0 zł na start w cenie pozycjonowania SEO i GEO.`}
                  </p>
                  <div className="rai-bofu-akcje">
                    <a
                      href={kotwicaKontakt}
                      className="btn btn-primary"
                      onClick={() => wybierzPakietKontakt('Booster Pack')}
                      data-cta="roboty_ai_bofu_booster"
                    >
                      {en ? 'Claim Next.js SSR Site for €0 Upfront' : 'Zamów stronę Next.js SSR za 0 zł na start'}
                    </a>
                    <Link href="/projektowanie-stron-internetowych" className="rai-bofu-link">
                      {en ? 'How we build Next.js websites' : 'Zobacz jak budujemy strony w Next.js'}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2>
                    {en
                      ? 'Your server lets AI bots in - now check if ChatGPT actually recommends your brand'
                      : 'Twój serwer wpuszcza roboty AI - sprawdź teraz, czy ChatGPT i Gemini polecają Twoją firmę'}
                  </h2>
                  <p>
                    {en
                      ? `Technical crawlability is step one. In our AI Visibility Audit (€${CENY.audytAi.eur} net), we test 30 real buyer prompts across ChatGPT, Perplexity, Gemini and Google AI Overviews, map which competitor domains get cited instead of you, and deliver a prioritized action plan.`
                      : `Otwarty dostęp techniczny to pierwszy krok. W Audycie Widoczności w AI (${CENY.audytAi.pln} zł netto) odpytujemy 30 zapytań zakupowych Twoich klientów w ChatGPT, Perplexity, Gemini i Google AI Overviews, wskazujemy źródła cytowane zamiast Ciebie i dajemy plan wdrożenia.`}
                  </p>
                  <div className="rai-bofu-akcje">
                    <a
                      href={kotwicaKontakt}
                      className="btn btn-primary"
                      onClick={() => wybierzPakietKontakt('Audyt widocznosci w AI')}
                      data-cta="roboty_ai_bofu_audyt_ai"
                    >
                      {en ? `Order AI Visibility Audit (€${CENY.audytAi.eur} net)` : `Zamów Audyt Widoczności w AI (${CENY.audytAi.pln} zł netto)`}
                    </a>
                    <Link href="/pozycjonowanie-w-ai" className="rai-bofu-link">
                      {en ? 'Explore AI Search Optimization (GEO)' : 'Zobacz na czym polega pozycjonowanie w AI'}
                    </Link>
                  </div>
                </>
              )}
            </div>

            <LinkWyniku
              narzedzie="roboty_ai"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={en
                ? `AI Crawler & SSR Parity Check for ${domena}: ${w.wynik}/100 (SSR Parity ${procentSsr}%)`
                : `Test robotów AI i parzystości SSR dla ${domena}: ${w.wynik}/100 (SSR ${procentSsr}%)`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default TesterRobotowAiClient;
