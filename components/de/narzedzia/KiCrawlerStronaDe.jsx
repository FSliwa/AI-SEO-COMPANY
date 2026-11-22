// Deutsche Werkzeugseite /de/tools/ki-crawler-robots-txt-pruefen.
// Serverkomponente fuer den KI-Crawler-, SSR-Paritaets- und robots.txt-Firewall-Pruefer.

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import { Link } from '@/i18n/routing';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { NawBok } from './WspolneDe';
import { WeitereToolsDe, ZrodlaDe } from './UkladDe';
import KiCrawlerClientDe from './KiCrawlerClientDe';

const KLUCZ = '/narzedzia/tester-robotow-ai-robots-txt';
const SLUG = 'tester-robotow-ai-robots-txt';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/ki-crawler-robots-txt-pruefen';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers - OAI-SearchBot, ChatGPT-User und GPTBot (Englisch)', data: '2026-11-18' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity: PerplexityBot und Perplexity-User - Dokumentation und IP-Bereiche (Englisch)', data: '2026-11-18' },
  { url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', nazwa: 'Anthropic: Claude-SearchBot, Claude-User und ClaudeBot (Englisch)', data: '2026-11-18' },
  { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google Search Central: Googlebot und Google-Extended in der Crawler-Dokumentation (Englisch)', data: '2026-11-18' },
  { url: 'https://developers.cloudflare.com/bots/concepts/bot/verified-bots/', nazwa: 'Cloudflare Docs: Verified Bots, IP-Prüfung und Bot Fight Mode (Englisch)', data: '2026-11-18' },
  { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: Spezifikation für /llms.txt v2 (Englisch)', data: '2026-11-18' },
];

const FAQ_DE = [
  {
    id: 'gptbot-sperren-chatgpt-suche-behalten',
    question: 'Kann ich das KI-Training (GPTBot) sperren, ohne Zitierungen in ChatGPT zu verlieren?',
    answer: 'Ja. OpenAI trennt das Modelltraining strikt von der Websuche: GPTBot sammelt Texte für künftige Sprachmodelle, während OAI-SearchBot Seiten für die ChatGPT-Suche indexiert und ChatGPT-User einzelne URLs live während einer Nutzerfrage abruft. Unsere Vorlage „Empfohlen“ sperrt GPTBot, ClaudeBot und Google-Extended, lässt aber OAI-SearchBot, PerplexityBot und Claude-SearchBot offen.',
  },
  {
    id: 'warum-403-waf-konflikt-trotz-allow',
    question: 'Warum meldet das Tool einen 403 WAF-Konflikt, obwohl in der robots.txt Allow: / steht?',
    answer: 'Die Datei robots.txt ist lediglich ein Hinweis für kooperative Crawler, keine Server-Konfiguration. Sicherheitsmechanismen wie der Cloudflare Bot Fight Mode, Wordfence in WordPress oder ModSecurity beim Hoster blockieren Anfragen mit dem User-Agent PerplexityBot oder OAI-SearchBot häufig auf Netzwerkebene mit Statuscode 403, bevor der Bot Ihr HTML überhaupt zu sehen bekommt.',
  },
  {
    id: 'fuehren-ki-bots-javascript-aus',
    question: 'Führen ChatGPT-, Perplexity- und Claude-Crawler JavaScript wie Googlebot aus?',
    answer: 'Nein. Während Googlebot einen aufwendigen Chromium-Renderer betreibt, rufen KI-Suchbots in der Regel nur das rohe Server-HTML ab und führen keine React-, Vue- oder Angular-Pakete im Browser aus. Liefert eine Single-Page-Application ohne JavaScript nur ein leeres <code>&lt;div id=&quot;root&quot;&gt;</code> aus, sehen KI-Systeme weder Überschriften noch Leistungstabellen.',
  },
  {
    id: 'bedeutung-bot-ip-pruefung-cloudflare',
    question: 'Was bedeutet der Hinweis „Bot-IP-Prüfung (CF)“ in der Auswertung?',
    answer: 'Cloudflare prüft verifizierte Bots anhand der offiziellen IP-Netze und ASN-Nummern von OpenAI, Perplexity, Microsoft und Google. Fragt ein externes Prüftool denselben User-Agent von einer anderen IP-Adresse an, antwortet Cloudflare schützend mit 403. Wir kennzeichnen dies neutral, weil der echte Crawler vom Anbieter-Server durchgelassen wird, sofern keine explizite Bot-Sperre aktiv ist.',
  },
  {
    id: 'ersetzt-llms-txt-die-robots-txt',
    question: 'Reicht eine /llms.txt-Datei aus, wenn KI-Bots in der Firewall blockiert sind?',
    answer: 'Nein. Eine /llms.txt ist ein freiwilliges Inhaltsverzeichnis im Markdown-Format (llmstxt.org) und überstimmt weder ein Disallow in der robots.txt noch eine 403-Sperre Ihrer WAF oder fehlendes Server-Side Rendering. Erst wenn Suchbots Statuscode 200 und vollständiges HTML erhalten, entfaltet die /llms.txt ihren Nutzen als strukturierte Navigationshilfe.',
  },
];

export function KiCrawlerStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'KI-Crawler, SSR-Parität & robots.txt online prüfen';
  const okruszek = nazwy?.okruszek || 'KI-Crawler & robots.txt Prüfer';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const geoHub = jesli('/pozycjonowanie-w-ai');
  const nextVergleich = jesli('/porownania/nextjs-vs-wordpress-seo');
  const baukastenVergleich = jesli('/porownania/strona-kodowana-czy-kreator-seo');
  const seoKosten = jesli('/cennik-pozycjonowania');
  const llmsGen = jesli('/narzedzia/generator-llms-txt');
  const seoAuditTool = jesli('/narzedzia/audyt-seo');

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs
        pl={okruszek}
        en={okruszek}
        de={okruszek}
        parent={{ href: '/narzedzia', pl: 'Narzędzia', en: 'Tools', de: 'Tools' }}
      />
      <WebAppSchema
        name="KI-Crawler, SSR-Parität & robots.txt Firewall-Prüfer"
        description="Kostenloses Online-Tool: vergleicht robots.txt-Regeln mit dem echten HTTP-Firewall-Status für 12 KI-Crawler (OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot), misst die HTML-Sichtbarkeit ohne JavaScript (SSR) und erstellt eine passende robots.txt."
        url={url}
        category="DeveloperApplication"
        language="de"
        featureList={[
          '12-Bot-Matrix: Vergleich zwischen robots.txt-Regel, HTTP-Statuscode und Server-TTFB',
          'Erkennung stiller 403-WAF-Konflikte sowie verifizierter Cloudflare-Bot-IP-Prüfungen',
          'Messung der SSR- vs. JavaScript-Content-Parität (Wörter ohne JS, H1/H2, Tabellen, JSON-LD, SPA-Erkennung)',
          '1-Klick robots.txt-Generator in 3 Varianten (KI-Suche erlauben + Training sperren, Offenes GEO, Strikte Sperre)',
          'Einbettbares SVG-Prüfsiegel für Websites ab 70 von 100 Punkten',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="llms" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses KI- &amp; SEO-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Prüfen Sie in 5 Sekunden, ob OAI-SearchBot, PerplexityBot und Claude an Ihrer Server-Firewall vorbeikommen, wie viel Inhalt ohne JavaScript sichtbar bleibt, und laden Sie eine saubere robots.txt herunter.
          </p>

          <KiCrawlerClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Damit ChatGPT, Perplexity und Claude Ihr Unternehmen als Quelle zitieren können, müssen drei technische Ebenen zusammenspielen: Ihre robots.txt muss KI-Suchbots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) zulassen, Ihre Server-Firewall (WAF/CDN) muss mit HTTP 200 statt einer 403-Sperre antworten und Ihr Server muss Texte, Tabellen sowie JSON-LD direkt im HTML (Server-Side Rendering) ohne Browser-JavaScript ausliefern. Unser Tool prüft alle drei Punkte in einem Durchlauf.
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Das prüft der KI-Crawler-Check kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Gesamtwert von 0 bis 100 für KI-Erreichbarkeit, Antwortzeit (TTFB) und HTML-Vollständigkeit',
                  'SSR-Content-Parität: sichtbare Wörter ohne JavaScript, H1/H2-Struktur, Tabellen, Links, JSON-LD und SPA-Warnung',
                  'Aufgeteilte 12-Bot-Matrix nach KI-Suche, Nutzer-Agenten und reinen Trainings-Scrapern',
                  'Warnung bei 403-WAF-Konflikten, wenn die robots.txt den Zugriff erlaubt, das CDN ihn aber blockiert',
                  'Kopierfertiger 1-Klick robots.txt-Generator sowie ein dynamisches SVG-Prüfsiegel ab 70 Punkten',
                ]}
                przypis="Kein E-Mail-Gate: Alle Messwerte, Tabellen und generierten Konfigurationsdateien stehen sofort bereit."
              />

              <Sekcja id="ki-suchbots-vs-trainings-scraper" tytul="KI-Suchbots, Nutzer-Agenten und Trainings-Scraper richtig trennen">
                <p style={s.akapit}>
                  Viele Unternehmen im DACH-Raum haben zwischen 2023 und 2025 pauschal alle KI-User-Agents in ihrer <code>robots.txt</code> gesperrt, um ihre Texte vor dem Modelltraining zu schützen. Wer diese pauschale Sperre heute beibehält, schließt sich selbst aus den Antworten von ChatGPT Search, Perplexity und Claude aus. Die großen Anbieter trennen ihre Bots inzwischen klar nach Aufgabe:
                </p>
                <CompareTable
                  id="tabelle-ki-bot-rollen"
                  caption="Offizielle Rollen der wichtigsten KI-Crawler und empfohlene Einstellung in der robots.txt"
                  columns={[
                    { key: 'bot', label: 'Bot User-Agent' },
                    { key: 'anbieter', label: 'Anbieter & Gruppe' },
                    { key: 'aufgabe', label: 'Technische Funktion' },
                    { key: 'regel', label: 'Empfehlung' },
                  ]}
                  rows={[
                    { id: 'oai-search', bot: 'OAI-SearchBot', anbieter: 'OpenAI (Suche)', aufgabe: 'Indexiert Seiten für klickbare Quellenlinks in ChatGPT Search; kein Modelltraining', regel: 'Allow: /' },
                    { id: 'perplexity', bot: 'PerplexityBot', anbieter: 'Perplexity (Suche)', aufgabe: 'Baut den Suchindex und die Quellenkarten in Perplexity auf', regel: 'Allow: /' },
                    { id: 'claude-search', bot: 'Claude-SearchBot', anbieter: 'Anthropic (Suche)', aufgabe: 'Indexiert Webseiten für Antworten mit Quellenangabe in Claude', regel: 'Allow: /' },
                    { id: 'chatgpt-user', bot: 'ChatGPT-User', anbieter: 'OpenAI (Agent)', aufgabe: 'Ruft Seiten live ab, wenn Nutzer im Chat gezielt nach einer Adresse oder Leistung fragen', regel: 'Allow: /' },
                    { id: 'gptbot', bot: 'GPTBot', anbieter: 'OpenAI (Training)', aufgabe: 'Sammelt öffentliche Webtexte für das Training künftiger OpenAI-Modelle', regel: 'Optional Disallow: /' },
                    { id: 'claudebot', bot: 'ClaudeBot', anbieter: 'Anthropic (Training)', aufgabe: 'Sammelt Trainingsdaten für Anthropic-Sprachmodelle', regel: 'Optional Disallow: /' },
                    { id: 'google-ext', bot: 'Google-Extended', anbieter: 'Google (Training)', aufgabe: 'Steuert Gemini-Training ohne Auswirkung auf klassische Google-Rankings', regel: 'Optional Disallow: /' },
                  ]}
                  przypis="Quellen: Offizielle Crawler-Dokumentationen von OpenAI, Perplexity, Anthropic und Google Search Central (Stand: November 2026)."
                />
                <p style={s.akapit}>
                  Wie Sie über die reine Freischaltung hinaus gezielt Zitierungen und Markenempfehlungen in Sprachmodellen aufbauen, erläutern wir auf unserer Leistungsseite{' '}
                  {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}.
                </p>
              </Sekcja>

              <Sekcja id="ssr-paritaet-vs-javascript" tytul="Warum Server-Side Rendering (SSR) über KI-Zitierungen entscheidet">
                <p style={s.akapit}>
                  Googlebot rendert JavaScript-lastige Websites in einem zweiten Schritt mit einer echten Chromium-Instanz. KI-Crawler wie <code>OAI-SearchBot</code>, <code>PerplexityBot</code> und <code>ClaudeBot</code> sind auf minimale Antwortzeiten ausgelegt: Sie laden ausschließlich das initiale HTTP-Dokument und werten das rohe HTML sofort aus.
                </p>
                <ul style={s.lista}>
                  <li><strong>Risiko bei Single-Page-Applications:</strong> Reine React- oder Vue-Anwendungen ohne Server-Rendering liefern im Quelltext nur ein leeres Grundgerüst ohne Überschriften, Preise oder Leistungsbeschreibungen.</li>
                  <li><strong>Aufgeblähte Baukästen und Page-Builder:</strong> Schwere CMS-Templates schieben hunderte Kilobyte Inline-CSS und Skripte vor den eigentlichen Inhalt, sodass Vergleichstabellen außerhalb des Crawl-Fensters landen.</li>
                  <li><strong>Vorteil von Next.js mit SSR:</strong> Server-Side Rendering liefert in rund 100 bis 200 ms vollständig ausgezeichnetes HTML samt <code>H1-H3</code>, Datentabellen und <code>JSON-LD</code> aus.</li>
                </ul>
                <p style={s.akapit}>
                  Den vollständigen Architekturvergleich lesen Sie unter{' '}
                  {nextVergleich ? <Link href={nextVergleich} style={s.podkreslenie}>Next.js vs. WordPress für SEO &amp; KI</Link> : 'Next.js vs. WordPress für SEO & KI'}{' '}
                  sowie{' '}
                  {baukastenVergleich ? <Link href={baukastenVergleich} style={s.podkreslenie}>programmierte Website oder Homepage-Baukasten</Link> : 'programmierte Website oder Homepage-Baukasten'}. Unsere Pakete inklusive Booster Pack ({eur(CENY.boosterPack.eur, 'de')} netto/Monat mit neuer Next.js-Website ohne Setup-Gebühr) finden Sie unter{' '}
                  {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}.
                </p>
              </Sekcja>

              <Sekcja id="stille-403-waf-konflikte" tytul="Stille 403-WAF-Sperren beheben: wenn die Firewall Ihre robots.txt überstimmt">
                <p style={s.akapit}>
                  Ein Blick in die <code>/robots.txt</code> allein genügt nicht. In technischen Audits sehen wir regelmäßig Mittelstands-Websites mit vorbildlichem <code>Allow: /</code>, deren Webserver oder vorgeschaltetes CDN Anfragen von <code>PerplexityBot</code> und <code>OAI-SearchBot</code> dennoch hart mit <code>HTTP 403 Forbidden</code> abweist.
                </p>
                <h3 style={s.h3}>Drei Schritte zur Behebung eines 403-Konflikts</h3>
                <ol style={s.lista}>
                  <li><strong>Cloudflare Bot Fight Mode prüfen:</strong> Kontrollieren Sie unter Security - Bots / Events, ob automatisierte Schutzregeln verifizierte KI-Suchcrawler blockieren.</li>
                  <li><strong>Sicherheits-Plugins und Hosting-WAF:</strong> Prüfen Sie Wordfence, Solid Security oder ModSecurity-Regeln Ihres Hosters auf gesperrte IP-Netze von OpenAI, Perplexity und Anthropic.</li>
                  <li><strong>Erneut testen und ergänzen:</strong> Sobald alle Suchbots in Gruppe 1 Statuscode 200 liefern, erstellen Sie ergänzend Ihr Verzeichnis im{' '}
                    {llmsGen ? <Link href={llmsGen} style={s.podkreslenie}>llms.txt Generator</Link> : 'llms.txt Generator'}{' '}
                    und prüfen Sie weitere On-Page-Faktoren im{' '}
                    {seoAuditTool ? <Link href={seoAuditTool} style={s.podkreslenie}>kostenlosen SEO Audit</Link> : 'kostenlosen SEO Audit'}.
                  </li>
                </ol>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu KI-Crawlern, SSR-Parität und robots.txt"
        sectionId="pytania"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <ZrodlaDe zrodla={zrodla} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default KiCrawlerStronaDe;
