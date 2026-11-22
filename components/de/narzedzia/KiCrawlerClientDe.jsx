'use client';

// Deutscher KI-Crawler-, SSR-Paritäts- und robots.txt-Firewall-Prüfer (/de/tools/ki-crawler-robots-txt-pruefen).
// API: POST ${PANEL_API}/roboty-ai mit { url, lang: 'de' }. Unterstützt ?url= und DEMO-Modus.

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba as fmtDe } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { LinkWyniku, Ocena, PasekDemo, Postep, PrzykladAdresu } from './WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import st from '@/components/narzedzia/narzedzia.module.css';

const CSS_RAI_DE = `
.rai-siatka-ssr { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 0.65rem; margin-top: 1rem; }
.rai-kafel-ssr { padding: 0.85rem 0.95rem; border-radius: 14px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.rai-kafel-etykieta { margin: 0; font-size: 0.78rem; color: var(--w-tusz-2); line-height: 1.35; }
.rai-kafel-wartosc { margin: 0.25rem 0 0; font-size: 1.15rem; font-weight: 700; color: var(--w-tusz); line-height: 1.25; overflow-wrap: anywhere; }
.rai-pasek-tlo { height: 12px; border-radius: 999px; background: rgba(30, 30, 30, 0.08); overflow: hidden; margin-top: 0.55rem; }
.rai-pasek-wypelnienie { height: 100%; border-radius: 999px; transition: width 500ms cubic-bezier(0.2, 0.7, 0.2, 1); }
.rai-pigulka { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.28rem 0.68rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; line-height: 1.25; white-space: nowrap; }
.rai-pigulka--ok { background: rgba(4, 120, 87, 0.12); color: #047857; }
.rai-pigulka--konflikt { background: rgba(179, 38, 30, 0.13); color: #b3261e; border: 1px solid rgba(179, 38, 30, 0.3); }
.rai-pigulka--uwaga { background: rgba(180, 83, 9, 0.12); color: #b45309; }
.rai-pigulka--ip { background: rgba(30, 64, 175, 0.1); color: #1e40af; }
.rai-pigulka--neutral { background: rgba(30, 30, 30, 0.08); color: var(--w-tusz-2); }
.rai-alert-waf { padding: 1rem 1.15rem; border-radius: 16px; background: rgba(179, 38, 30, 0.07); border: 1px solid rgba(179, 38, 30, 0.28); color: var(--w-tusz); }
.rai-alert-spa { padding: 1rem 1.15rem; border-radius: 16px; background: rgba(180, 83, 9, 0.08); border: 1px solid rgba(180, 83, 9, 0.3); color: var(--w-tusz); margin-top: 0.85rem; }
.rai-grupa { margin-top: 1.25rem; }
.rai-grupa-h3 { margin: 0 0 0.35rem; font-size: 1.05rem; font-weight: 600; color: var(--w-tusz); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
.rai-kod-okno { margin: 0.75rem 0 0; padding: 1rem 1.15rem; border-radius: 16px; background: #141923; color: #f8fafc; font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 0.84rem; line-height: 1.6; overflow-x: auto; white-space: pre; border: 1px solid rgba(255,255,255,0.08); }
.rai-akcje-kodu { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-top: 0.75rem; }
.rai-odznaka-box { padding: 1.2rem 1.35rem; border-radius: 20px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); display: grid; gap: 0.75rem; }
.rai-bofu { padding: clamp(1.25rem, 3vw, 1.75rem); border-radius: 22px; background: linear-gradient(135deg, #101935 0%, #1d2b53 100%); color: #ffffff; display: grid; gap: 0.85rem; }
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
    // Fallback unten
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
  if (!s) return 'ihre-firma.de';
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '');
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || 'ihre-firma.de';
  }
}

function domyslnePolitykiDe(domena) {
  const host = wyczyscDomene(domena);
  const rekomendowana = `# Empfohlene KI- & SEO-Richtlinie in der robots.txt für ${host}
# Erlaubt KI-Suche & Zitierungen (Traffic + Anfragen), sperrt reine LLM-Trainings-Scraper
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

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

# Reine Trainings-Crawler sperren
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

User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  const otwarta = `# Offene GEO-Richtlinie für ${host} - voller Zugriff für Such-, Agenten- und Trainings-Bots
User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  const zablokowana = `# Strikte KI-Sperre für ${host} - klassisches Google/Bing erlaubt, alle KI-Bots gesperrt
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

User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;

  return { rekomendowana, otwarta, zablokowana };
}

function demoOdpowiedzDe(surowyUrl) {
  const domena = wyczyscDomene(surowyUrl || 'ai-seo-company.pl');
  const wzorzec = domena.includes('ai-seo-company');
  const spa = domena.includes('spa') || domena.includes('app');
  const polityki = domyslnePolitykiDe(domena);

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
        h1: 'SEO und KI-Sichtbarkeit für Unternehmen im DACH-Raum',
        liczbaH2: 8,
        liczbaTabel: 2,
        liczbaLinkow: 46,
        maJsonLd: true,
        wykrytySzkieletSpa: false,
        framework: 'Next.js (SSR)',
      },
      boty: [
        { nazwa: 'OAI-SearchBot', grupa: 'wyszukiwanie', opisRoli: 'ChatGPT-Suchindex und klickbare Quellenlinks', robots: 'dozwolony', httpKod: 200, ttfbMs: 142, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'PerplexityBot', grupa: 'wyszukiwanie', opisRoli: 'Perplexity-Suchindex und Quellenkarten', robots: 'dozwolony', httpKod: 200, ttfbMs: 158, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Claude-SearchBot', grupa: 'wyszukiwanie', opisRoli: 'Anthropic-Websuche und Zitierungen', robots: 'dozwolony', httpKod: 200, ttfbMs: 165, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Googlebot', grupa: 'wyszukiwanie', opisRoli: 'Google-Suche und Basis für Google AI Overviews', robots: 'dozwolony', httpKod: 200, ttfbMs: 118, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Bingbot', grupa: 'wyszukiwanie', opisRoli: 'Bing-Index und Datenbasis für Microsoft Copilot', robots: 'dozwolony', httpKod: 200, ttfbMs: 134, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'ChatGPT-User', grupa: 'agent', opisRoli: 'Live-Abruf einer Seite während einer ChatGPT-Anfrage', robots: 'dozwolony', httpKod: 200, ttfbMs: 149, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Perplexity-User', grupa: 'agent', opisRoli: 'Direktabruf auf Anfrage eines Perplexity-Nutzers', robots: 'dozwolony', httpKod: 200, ttfbMs: 161, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'Claude-User', grupa: 'agent', opisRoli: 'Live-Abruf innerhalb eines Claude-Chats', robots: 'dozwolony', httpKod: 200, ttfbMs: 170, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'GPTBot', grupa: 'trening', opisRoli: 'Datensammlung für das Training von OpenAI-Modellen', robots: 'zablokowany', httpKod: 200, ttfbMs: 140, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'ClaudeBot', grupa: 'trening', opisRoli: 'Trainingskorpus für Anthropic-Sprachmodelle', robots: 'zablokowany', httpKod: 200, ttfbMs: 152, cloudflareIpCheck: false, status: 'zablokowany_robots' },
        { nazwa: 'Google-Extended', grupa: 'trening', opisRoli: 'Steuert Gemini-Training (beeinflusst nicht die Google-Suche)', robots: 'dozwolony', httpKod: 200, ttfbMs: 125, cloudflareIpCheck: false, status: 'ok' },
        { nazwa: 'CCBot', grupa: 'trening', opisRoli: 'Offener Common-Crawl-Datensatz für KI-Training', robots: 'dozwolony', httpKod: 200, ttfbMs: 180, cloudflareIpCheck: false, status: 'ok' },
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
      h1: spa ? '' : 'Präzisionslösungen für den industriellen Mittelstand',
      liczbaH2: spa ? 0 : 5,
      liczbaTabel: spa ? 0 : 1,
      liczbaLinkow: spa ? 3 : 28,
      maJsonLd: !spa,
      wykrytySzkieletSpa: spa,
      framework: spa ? 'React SPA (CSR)' : 'WordPress',
    },
    boty: [
      { nazwa: 'OAI-SearchBot', grupa: 'wyszukiwanie', opisRoli: 'ChatGPT-Suchindex und klickbare Quellenlinks', robots: 'dozwolony', httpKod: 200, ttfbMs: 640, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'PerplexityBot', grupa: 'wyszukiwanie', opisRoli: 'Perplexity-Suchindex und Quellenkarten', robots: 'dozwolony', httpKod: 403, ttfbMs: 95, cloudflareIpCheck: false, status: 'konflikt_waf' },
      { nazwa: 'Claude-SearchBot', grupa: 'wyszukiwanie', opisRoli: 'Anthropic-Websuche und Zitierungen', robots: 'dozwolony', httpKod: 200, ttfbMs: 685, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Googlebot', grupa: 'wyszukiwanie', opisRoli: 'Google-Suche und Basis für Google AI Overviews', robots: 'dozwolony', httpKod: 200, ttfbMs: 590, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Bingbot', grupa: 'wyszukiwanie', opisRoli: 'Bing-Index und Datenbasis für Microsoft Copilot', robots: 'dozwolony', httpKod: 403, ttfbMs: 88, cloudflareIpCheck: true, status: 'weryfikacja_ip' },
      { nazwa: 'ChatGPT-User', grupa: 'agent', opisRoli: 'Live-Abruf einer Seite während einer ChatGPT-Anfrage', robots: 'dozwolony', httpKod: 200, ttfbMs: 655, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Perplexity-User', grupa: 'agent', opisRoli: 'Direktabruf auf Anfrage eines Perplexity-Nutzers', robots: 'dozwolony', httpKod: 403, ttfbMs: 92, cloudflareIpCheck: false, status: 'konflikt_waf' },
      { nazwa: 'Claude-User', grupa: 'agent', opisRoli: 'Live-Abruf innerhalb eines Claude-Chats', robots: 'dozwolony', httpKod: 200, ttfbMs: 702, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'GPTBot', grupa: 'trening', opisRoli: 'Datensammlung für das Training von OpenAI-Modellen', robots: 'dozwolony', httpKod: 200, ttfbMs: 630, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'ClaudeBot', grupa: 'trening', opisRoli: 'Trainingskorpus für Anthropic-Sprachmodelle', robots: 'dozwolony', httpKod: 200, ttfbMs: 660, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'Google-Extended', grupa: 'trening', opisRoli: 'Steuert Gemini-Training (beeinflusst nicht die Google-Suche)', robots: 'dozwolony', httpKod: 200, ttfbMs: 615, cloudflareIpCheck: false, status: 'ok' },
      { nazwa: 'CCBot', grupa: 'trening', opisRoli: 'Offener Common-Crawl-Datensatz für KI-Training', robots: 'zablokowany', httpKod: 200, ttfbMs: 645, cloudflareIpCheck: false, status: 'zablokowany_robots' },
    ],
    politykiRobots: polityki,
  };
}

function OdznakaPodgladSvgDe({ domena, wynik }) {
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

export function KiCrawlerClientDe() {
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
    track('narzedzie_start', { narzedzie: 'roboty_ai', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 900));
      const d = demoOdpowiedzDe(wejscie);
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
        body: JSON.stringify({ url: wejscie, lang: 'de' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die Adresse konnte nicht geprüft werden. Bitte kontrollieren Sie die Domain und versuchen Sie es gleich noch einmal.',
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
          ? 'Der Server hat innerhalb von 45 Sekunden nicht geantwortet. Prüfen Sie, ob eine Firewall externe Abfragen verwirft.'
          : 'Keine Verbindung zum Diagnoseserver. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
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
    track('narzedzie_bofu_klik', { narzedzie: 'roboty_ai', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const ssr = w?.ssrParity || {};
  const procentSsr = Math.max(0, Math.min(100, Number(ssr.procent ?? 0)));
  const kolorPaskaSsr = ssr.wykrytySzkieletSpa || procentSsr < 50 ? '#b3261e' : procentSsr < 75 ? '#b45309' : '#047857';

  const boty = Array.isArray(w?.boty) ? w.boty : [];
  const botyWyszukiwanie = boty.filter((b) => b.grupa === 'wyszukiwanie' || (!['wyszukiwanie', 'agent', 'trening'].includes(b.grupa)));
  const botyAgenty = boty.filter((b) => b.grupa === 'agent');
  const botyTrening = boty.filter((b) => b.grupa === 'trening');
  const konfliktyWaf = boty.filter((b) => b.status === 'konflikt_waf');

  const zapasPolityk = domena ? domyslnePolitykiDe(domena) : { rekomendowana: '', otwarta: '', zablokowana: '' };
  const polityki = {
    rekomendowana: w?.politykiRobots?.rekomendowana || zapasPolityk.rekomendowana,
    otwarta: w?.politykiRobots?.otwarta || zapasPolityk.otwarta,
    zablokowana: w?.politykiRobots?.zablokowana || zapasPolityk.zablokowana,
  };
  const tekstRobots = polityki[aktywnaPolityka] || polityki.rekomendowana;

  const urlOdznakiSvg = domena ? `https://panel.ai-seo-company.pl/api/narzedzia/badge/ai-ready?domain=${encodeURIComponent(domena)}&lang=de` : '';
  const urlZwrotnyOdznaki = domena ? `https://www.ai-seo-company.pl/de/tools/ki-crawler-robots-txt-pruefen?url=${encodeURIComponent(domena)}` : '';
  const kodHtmlOdznaki = domena
    ? `<a href="${urlZwrotnyOdznaki}" target="_blank" rel="noopener"><img src="${urlOdznakiSvg}" alt="${domena} - KI-Crawler Ready geprüft von AI SEO Company" width="248" height="32" /></a>`
    : '';

  const potrzebnySsr = Boolean(w && (procentSsr < 75 || ssr.wykrytySzkieletSpa));
  const maLlmsDe = maWersjeDe('/narzedzia/generator-llms-txt');
  const maPorownanieNext = maWersjeDe('/porownania/nextjs-vs-wordpress-seo');
  const maGeoDe = maWersjeDe('/pozycjonowanie-w-ai');

  function renderujWierszBota(b) {
    const dozwolonyRobots = !/zablok|block|disallow|sperr/i.test(String(b.robots || ''));
    let odznakaStatusu;
    if (b.status === 'konflikt_waf') {
      odznakaStatusu = <span className="rai-pigulka rai-pigulka--konflikt">403 WAF-Konflikt</span>;
    } else if (b.status === 'weryfikacja_ip' || b.cloudflareIpCheck) {
      odznakaStatusu = <span className="rai-pigulka rai-pigulka--ip">Bot-IP-Prüfung (CF)</span>;
    } else if (b.status === 'zablokowany_robots') {
      odznakaStatusu = (
        <span className={`rai-pigulka ${b.grupa === 'trening' ? 'rai-pigulka--neutral' : 'rai-pigulka--uwaga'}`}>
          In robots.txt gesperrt
        </span>
      );
    } else if (b.status === 'ok') {
      odznakaStatusu = <span className="rai-pigulka rai-pigulka--ok">Erreichbar (200 OK)</span>;
    } else {
      odznakaStatusu = <span className="rai-pigulka rai-pigulka--konflikt">Abruffehler</span>;
    }

    return (
      <tr key={b.nazwa} style={b.status === 'konflikt_waf' ? { background: 'rgba(179, 38, 30, 0.04)' } : undefined}>
        <th scope="row" style={{ textAlign: 'left' }}>
          <span className="narz-silnik" style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.9rem' }}>{b.nazwa}</span>
          {b.opisRoli && <span className="narz-mikro">{b.opisRoli}</span>}
        </th>
        <td>
          <span className={`rai-pigulka ${dozwolonyRobots ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
            {dozwolonyRobots ? 'Erlaubt' : 'Gesperrt'}
          </span>
        </td>
        <td style={{ fontVariantNumeric: 'tabular-nums' }}>
          <strong>{b.httpKod || '-'}</strong>
          {Number.isFinite(b.ttfbMs) ? <span className="narz-mikro" style={{ display: 'block', margin: 0 }}>{fmtDe(b.ttfbMs, 'de')} ms</span> : null}
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
                <th scope="col" style={{ textAlign: 'left' }}>KI-Crawler &amp; Funktion</th>
                <th scope="col">robots.txt-Regel</th>
                <th scope="col">HTTP &amp; TTFB</th>
                <th scope="col">Firewall-Befund</th>
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
      <style>{CSS_RAI_DE}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomTest}>
        <div>
          <label htmlFor="rai-url-de" className="narz-etykieta">
            Website-URL oder Domain zur Prüfung eingeben
          </label>
          <div className="narz-bramka-wiersz">
            <input
              ref={poleRef}
              id="rai-url-de"
              name="url"
              required
              {...WALID_DE}
              maxLength={300}
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
              placeholder="z. B. ihre-firma.de"
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'rai-blad-de' : undefined}
            />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_roboty_ai_de_start">
              {stan.status === 'loading' ? 'Prüfe 12 KI-Bots & SSR...' : 'KI-Crawler & SSR prüfen'}
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
          Kostenlos, ohne Anmeldung und ohne E-Mail: prüft parallel Ihre robots.txt-Regeln, den echten HTTP-Statuscode Ihrer Server-Firewall für 12 KI-Bots, die ohne JavaScript sichtbaren Inhalte (SSR-Parität) und erzeugt eine fertige robots.txt-Datei.
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Abruf von robots.txt, /llms.txt und dem rohen Server-HTML ohne JavaScript',
              'Prüfung von HTTP-Statuscode und TTFB über 12 KI-Crawler hinweg',
              'Berechnung der SSR-Content-Parität und Erstellung Ihrer robots.txt-Vorlagen',
            ]}
            co={1300}
          />
        )}

        {stan.status === 'error' && (
          <p id="rai-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            <div className="narz-wynik-glowa">
              <Ocena wynik={w.wynik} podpis="KI-Ready" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {w.wynik >= 80
                    ? 'Ihre Server-Architektur und Firewall liefern Inhalte sauber an KI-Antwortsysteme aus.'
                    : w.wynik >= 50
                    ? 'KI-Bots erreichen Teile Ihrer Website, aber WAF-Sperren, fehlende Metadaten oder Client-JavaScript bremsen Zitierungen.'
                    : 'Kritische Sichtbarkeitshürde: Wichtige KI-Suchbots werden blockiert oder sehen nur eine leere JavaScript-Hülle.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                  <span className={`rai-pigulka ${w.robotsTxtIstnieje ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
                    robots.txt: {w.robotsTxtIstnieje ? 'Vorhanden (200)' : 'Fehlt'}
                  </span>
                  <span className={`rai-pigulka ${w.llmsTxtIstnieje ? 'rai-pigulka--ok' : 'rai-pigulka--uwaga'}`}>
                    /llms.txt: {w.llmsTxtIstnieje ? 'Vorhanden (200)' : 'Fehlt'}
                  </span>
                  {ssr.framework && (
                    <span className="rai-pigulka rai-pigulka--neutral">
                      System: {ssr.framework}
                    </span>
                  )}
                </div>

                {!w.llmsTxtIstnieje && maLlmsDe && (
                  <p className="narz-mikro" style={{ marginTop: '0.55rem' }}>
                    Keine /llms.txt-Übersicht für Sprachmodelle gefunden -{' '}
                    <Link href="/narzedzia/generator-llms-txt" className={st.przyciskTekstowy}>
                      llms.txt jetzt kostenlos aus Ihrer Sitemap erzeugen
                    </Link>.
                  </p>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  SSR- vs. JavaScript-Content-Parität (Sichtbarkeit ohne Browser-JS)
                </h2>
                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: kolorPaskaSsr, fontVariantNumeric: 'tabular-nums' }}>
                  {procentSsr} %
                </span>
              </div>
              <p className="narz-mikro">
                OAI-SearchBot, PerplexityBot und ClaudeBot führen keine React- oder Vue-Skripte wie Chrome aus. Hier sehen Sie, was Ihr Server im rohen HTML tatsächlich ausliefert.
              </p>
              <div className="rai-pasek-tlo" role="progressbar" aria-valuenow={procentSsr} aria-valuemin={0} aria-valuemax={100} aria-label="SSR-Content-Parität in Prozent">
                <div className="rai-pasek-wypelnienie" style={{ width: `${procentSsr}%`, background: kolorPaskaSsr }} />
              </div>

              {ssr.wykrytySzkieletSpa && (
                <div className="rai-alert-spa" role="alert">
                  <strong>Leeres SPA-Grundgerüst erkannt (Client-Side Rendering):</strong>{' '}
                  Das ausgelieferte HTML besteht fast nur aus einem leeren App-Container. KI-Crawler indexieren damit eine praktisch leere Seite.
                </div>
              )}

              <div className="rai-siatka-ssr">
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">Erkanntes System</p>
                  <p className="rai-kafel-wartosc">{ssr.framework || 'Server-HTML'}</p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">Wörter ohne JS</p>
                  <p className="rai-kafel-wartosc">{fmtDe(ssr.slowBezJs ?? 0, 'de')}</p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">Überschriften H1 &amp; H2</p>
                  <p className="rai-kafel-wartosc">
                    {ssr.h1 ? '1 H1' : '0 H1'} · {Number(ssr.liczbaH2 ?? 0)} H2
                  </p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">Tabellen &amp; Links</p>
                  <p className="rai-kafel-wartosc">
                    {Number(ssr.liczbaTabel ?? 0)} Tab. · {fmtDe(ssr.liczbaLinkow ?? 0, 'de')} Links
                  </p>
                </div>
                <div className="rai-kafel-ssr">
                  <p className="rai-kafel-etykieta">JSON-LD Schema</p>
                  <p className="rai-kafel-wartosc" style={{ color: ssr.maJsonLd ? '#047857' : '#b45309' }}>
                    {ssr.maJsonLd ? 'Im HTML vorhanden' : 'Fehlt im HTML'}
                  </p>
                </div>
              </div>
              {ssr.h1 && (
                <p className="narz-mikro" style={{ marginTop: '0.65rem' }}>
                  <strong>Sichtbare H1 ohne JS:</strong> {ssr.h1}
                </p>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <h2 className="narz-h2" style={{ marginTop: 0 }}>
                12-Bot-Matrix: robots.txt-Erlaubnis vs. echte HTTP-Firewall
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.85rem' }}>
                Häufig erlaubt die robots.txt den Zugriff, während Cloudflare, Wordfence oder die Hosting-WAF KI-Bots stillschweigend mit Statuscode 403 abweisen.
              </p>

              {konfliktyWaf.length > 0 && (
                <div className="rai-alert-waf" role="alert">
                  <strong>WAF-Konflikt erkannt:</strong>{' '}
                  ({konfliktyWaf.map((k) => k.nazwa).join(', ')}) - Ihre robots.txt lädt diese Bots ein, aber Ihr Webserver oder CDN blockiert die HTTP-Anfrage mit Code 403. Prüfen Sie den Bot Fight Mode oder Ihre Server-Firewall.
                </div>
              )}

              {renderujGrupeBotow(
                '1. KI-Suche & Zitierungen (bringt organischen Traffic & Anfragen)',
                'Empfehlung: ERLAUBEN',
                botyWyszukiwanie
              )}
              {renderujGrupeBotow(
                '2. Nutzergesteuerte KI-Agenten (Live-Abruf im Chat)',
                'Empfehlung: ERLAUBEN',
                botyAgenty
              )}
              {renderujGrupeBotow(
                '3. LLM-Trainings-Scraper (reines Modelltraining)',
                'Bei Bedarf SPERRBAR ohne Zitierverlust',
                botyTrening
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--w-linia)', paddingTop: '1.25rem' }}>
              <h2 className="narz-h2" style={{ marginTop: 0 }}>
                1-Klick robots.txt Firewall-Generator
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.75rem' }}>
                Wählen Sie die passende Richtlinie für Ihre Domain, um KI-Suchsichtbarkeit sauber vom unvergüteten Modelltraining zu trennen.
              </p>

              <div className="narz-filtry" role="group" aria-label="Vorlagen für die robots.txt">
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'rekomendowana'}
                  onClick={() => setAktywnaPolityka('rekomendowana')}
                >
                  Empfohlen: KI-Suche erlauben + Training sperren
                </button>
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'otwarta'}
                  onClick={() => setAktywnaPolityka('otwarta')}
                >
                  Offenes GEO (Alle zulassen)
                </button>
                <button
                  type="button"
                  aria-pressed={aktywnaPolityka === 'zablokowana'}
                  onClick={() => setAktywnaPolityka('zablokowana')}
                >
                  Strikte KI-Sperre
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
                      track('narzedzie_kopiuj_robots', { polityka: aktywnaPolityka, lang: 'de' });
                    }
                  }}
                >
                  {skopiowanoRobots ? 'robots.txt kopiert!' : 'robots.txt kopieren'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={() => {
                    pobierzPlikRobots(tekstRobots);
                    setPobranoRobots(true);
                    track('narzedzie_pobierz_robots', { polityka: aktywnaPolityka, lang: 'de' });
                  }}
                >
                  {pobranoRobots ? 'Heruntergeladen!' : 'robots.txt herunterladen'}
                </button>
              </div>
            </div>

            {w.wynik >= 70 && (
              <div className="rai-odznaka-box">
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  Dynamisches KI-Ready-Prüfsiegel für Ihre Website
                </h2>
                <p className="narz-mikro" style={{ margin: 0 }}>
                  Ihre Domain erreicht {w.wynik}/100 Punkte. Binden Sie das Live-SVG-Badge in Ihren Footer oder Ihre Dokumentation ein:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {!DEMO && !bladObrazkaOdznaki ? (
                    /* eslint-disable-next-line @next/next/no-img-element -- dynamisches externes SVG-Badge vom Panel-Server */
                    <img
                      src={urlOdznakiSvg}
                      alt={`${domena} - AI Ready ${w.wynik}/100`}
                      width={248}
                      height={32}
                      onError={() => setBladObrazkaOdznaki(true)}
                      style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  ) : (
                    <OdznakaPodgladSvgDe domena={domena} wynik={w.wynik} />
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
                        track('narzedzie_odznaka_kopiuj', { domena, lang: 'de' });
                      }
                    }}
                  >
                    {skopiowanoOdznake ? 'HTML-Code kopiert!' : 'HTML-Code für Badge kopieren'}
                  </button>
                </div>
              </div>
            )}

            <div className="rai-bofu">
              {potrzebnySsr ? (
                <>
                  <h2>
                    KI-Crawler sehen ohne JavaScript nur {procentSsr} % Ihrer Seiteninhalte
                  </h2>
                  <p>
                    Clientseitig gerenderte Seiten verstecken Überschriften, Tabellen und Leistungsdaten vor OAI-SearchBot und PerplexityBot. Im Booster Pack ({eur(CENY.boosterPack.eur, 'de')} netto/Monat, Mindestlaufzeit {CENY.boosterPack.umowaMiesiecy} Monate) entwickeln wir eine individuell programmierte Next.js-SSR-Website für 0 € Setup-Kosten inklusive laufendem SEO und GEO.
                  </p>
                  <div className="rai-bofu-akcje">
                    <a
                      href="#kontakt"
                      className="btn btn-primary"
                      onClick={() => wybierzPakietKontakt('Booster Pack')}
                      data-cta="roboty_ai_de_bofu_booster"
                    >
                      Next.js-SSR-Website für 0 € Setup anfragen
                    </a>
                    {maPorownanieNext && (
                      <Link href="/porownania/nextjs-vs-wordpress-seo" className="rai-bofu-link">
                        Next.js vs. WordPress im Technik-Vergleich
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2>
                    Technisch erreichbar - prüfen wir jetzt, ob ChatGPT und Gemini Sie empfehlen
                  </h2>
                  <p>
                    Offener Bot-Zugriff ist die Pflicht, Markennennung die Kür. In unserem KI-Sichtbarkeits-Audit ({eur(CENY.audytAi.eur, 'de')} netto) testen wir 30 echte Kundenfragen in ChatGPT, Perplexity, Gemini und Google AI Overviews, analysieren die zitierten Wettbewerbsquellen und liefern einen konkreten Maßnahmenplan.
                  </p>
                  <div className="rai-bofu-akcje">
                    <a
                      href="#kontakt"
                      className="btn btn-primary"
                      onClick={() => wybierzPakietKontakt('Audyt widocznosci w AI')}
                      data-cta="roboty_ai_de_bofu_audyt_ai"
                    >
                      {`KI-Sichtbarkeits-Audit (${eur(CENY.audytAi.eur, 'de')} netto) anfragen`}
                    </a>
                    {maGeoDe && (
                      <Link href="/pozycjonowanie-w-ai" className="rai-bofu-link">
                        Mehr zu Generative Engine Optimization (GEO)
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            <LinkWyniku
              narzedzie="roboty_ai"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={`KI-Crawler & SSR-Check für ${domena}: ${w.wynik}/100 (SSR-Parität ${procentSsr} %)`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default KiCrawlerClientDe;
