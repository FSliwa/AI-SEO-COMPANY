// Deutsche Werkzeugseite D3: /de/tools/indexnow-generator-bing-chatgpt-test

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import { Link } from '@/i18n/routing';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { NawBok } from '@/components/de/narzedzia/WspolneDe';
import { WeitereToolsDe, ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import IndexNowBingClientDe from './IndexNowBingClientDe';

const KLUCZ = '/narzedzia/generator-indexnow-test-bing-chatgpt';
const SLUG = 'generator-indexnow-test-bing-chatgpt';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/indexnow-generator-bing-chatgpt-test';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Offizielle Protokollspezifikation (TXT-Schlüsseldatei & JSON-API, Englisch)', data: '2026-11-22' },
  { url: 'https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap', nazwa: 'Microsoft Bing Webmaster Blog: Bedeutung korrekter <lastmod>-Zeitstempel in XML-Sitemaps (Englisch)', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: OAI-SearchBot-Dokumentation für ChatGPT Search (Englisch)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', nazwa: 'Google Search Central: Sitemap erstellen und einreichen (Anforderungen an <lastmod>)', data: '2026-11-22' },
];

const FAQ_DE = [
  {
    id: 'warum-bing-fuer-chatgpt-entscheidend-ist',
    question: 'Warum entscheidet der Bing-Index über Ihre Sichtbarkeit in ChatGPT Search?',
    answer: 'Die Websuche in ChatGPT greift sowohl auf den eigenen <code>OAI-SearchBot</code> als auch auf die Suchinfrastruktur von Microsoft Bing zurück (auf der auch Microsoft Copilot aufbaut). Fehlen neue Leistungsseiten im Bing-Index oder blockiert eine Firewall <code>Bingbot</code> bzw. <code>OAI-SearchBot</code>, kann das Sprachmodell aktuelle Preise und Referenzen nicht abrufen.',
  },
  {
    id: 'wie-funktioniert-indexnow-genau',
    question: 'Wie funktioniert IndexNow und nutzt auch Google dieses Protokoll?',
    answer: 'IndexNow ist ein offenes Push-Protokoll von Microsoft Bing, Naver, Seznam und Yep. Statt auf den nächsten regulären Crawl zu warten, sendet Ihr Server nach einer Inhaltsänderung einen einzelnen HTTP-POST-Aufruf an api.indexnow.org. Google unterstützt IndexNow derzeit nicht und verlässt sich weiterhin auf XML-Sitemaps mit verlässlichem <code>&lt;lastmod&gt;</code>-Datum.',
  },
  {
    id: 'warum-identische-lastmod-daten-schaden',
    question: 'Warum schaden identische lastmod-Zeitstempel in der Sitemap?',
    answer: 'Viele Build-Skripte setzen bei jedem Deployment pauschal das aktuelle Tagesdatum auf sämtliche URLs in der <code>sitemap.xml</code>. Tragen hundert unveränderte Unterseiten exakt denselben Zeitstempel, sinkt die Datums-Entropie auf eins - sowohl Google als auch Bing stufen <code>&lt;lastmod&gt;</code> dann als unglaubwürdig ein und ignorieren das Signal.',
  },
  {
    id: 'wohin-gehoert-die-indexnow-txt-datei',
    question: 'Wo muss ich die heruntergeladene IndexNow-.txt-Datei ablegen?',
    answer: 'Legen Sie die Datei (z. B. <code>8f4c...b4d.txt</code>) direkt im öffentlichen Stammverzeichnis Ihrer Domain ab (bei Next.js im Ordner <code>public/</code>, bei WordPress/Nginx neben der <code>robots.txt</code>), sodass <code>https://ihre-firma.de/schluessel.txt</code> mit Statuscode 200 antwortet.',
  },
  {
    id: 'wie-viele-urls-pro-indexnow-aufruf',
    question: 'Wie viele URLs lassen sich in einem einzigen IndexNow-Request übermitteln?',
    answer: 'Über die offizielle JSON-Schnittstelle können bis zu 10.000 geänderte URLs derselben Domain in einem einzigen POST-Aufruf gemeldet werden. Empfehlenswert ist es, ausschließlich tatsächlich geänderte oder neu veröffentlichte Seiten zu senden.',
  },
];

export function IndexNowBingStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'IndexNow Generator, Sitemap-lastmod & Bing / ChatGPT Prüfer';
  const okruszek = nazwy?.okruszek || 'IndexNow & Bing Prüfer';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.sources?.length
    ? nazwy.sources
    : nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;
  const ilustracja = obrazKarty(SLUG, 'de');

  const protokolVergleich = jesli('/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml');
  const kiCrawler = jesli('/narzedzia/tester-robotow-ai-robots-txt');
  const llmsGen = jesli('/narzedzia/generator-llms-txt');
  const seoKosten = jesli('/cennik-pozycjonowania');

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
        name="IndexNow-Generator, lastmod-Entropie-Prüfer & Bing/ChatGPT-Tester"
        description="Kostenloses Sofort-Indexierungs- und GEO-Tool: prüft den Zugriff von Bingbot und OAI-SearchBot, erkennt künstliche <lastmod>-Daten in der sitemap.xml und generiert Ihren IndexNow-Schlüssel als .txt-Download samt curl-Befehl und GitHub Action."
        url={url}
        category="DeveloperApplication"
        language="de"
        screenshot={ilustracja ? { url: ilustracja.src, width: ilustracja.width, height: ilustracja.height } : undefined}
        featureList={[
          'Live-Erreichbarkeitsprüfung für Bingbot und OAI-SearchBot (ChatGPT Search)',
          'Entropie-Analyse der <lastmod>-Zeitstempel in der sitemap.xml gegen Build-Spam',
          '128-Bit IndexNow-Schlüsselgenerator mit direktem <key>.txt-Download',
          'Kopierfertiges curl-JSON-Kommando sowie .github/workflows/indexnow.yml',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="llms" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses Bing- &amp; ChatGPT-Indexierungs-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Prüfen Sie in Sekunden, ob Bingbot und OAI-SearchBot Ihre Website für ChatGPT Search indexieren dürfen, ob Ihre Sitemap glaubwürdige &lt;lastmod&gt;-Daten liefert, und laden Sie Ihr fertiges IndexNow-Setup herunter.
          </p>

          <IndexNowBingClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Wenn Sie Ihre Bing Indexierung beschleunigen und rasch in ChatGPT Search sowie Microsoft Copilot auftauchen möchten, müssen Bingbot und OAI-SearchBot Statuscode 200 erhalten, Ihre sitemap.xml muss echte &lt;lastmod&gt;-Daten führen und Änderungen sollten per Push gemeldet werden. Hier können Sie sofort Ihren IndexNow Schlüssel erstellen, als .txt-Datei herunterladen und samt curl-Befehl oder GitHub Action einbinden.
            </AnswerBox>
            <Byline sciezka={KLUCZ} takzeEn style={{ margin: '1.25rem 0 0' }} />
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="IndexNow Schlüssel erstellen & Bing Indexierung beschleunigen"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Erreichbarkeitskarten für Bingbot und OAI-SearchBot (robots.txt + echter HTTP-Status)',
                  'Entropie-Prüfung Ihrer sitemap.xml zur Erkennung künstlich identischer Build-Daten',
                  'Sofortiger 32-Zeichen-IndexNow-Schlüssel inklusive <key>.txt-Datei zum Herunterladen',
                  'Einsatzbereiter curl-Befehl und .github/workflows/indexnow.yml für CI/CD',
                ]}
                przypis="Keine Registrierung notwendig: Schlüsseldatei herunterladen, ablegen und in 2 Minuten live schalten."
              >
                {ilustracja ? <ZrzutWyniku {...ilustracja} sizes="(max-width: 900px) 100vw, 860px" /> : null}
              </CoDostajesz>

              <Sekcja id="indexnow-sitemap-und-llms-txt-im-zusammenspiel" tytul="IndexNow vs. sitemap.xml vs. llms.txt: Welches Protokoll wofür zuständig ist">
                <CompareTable
                  id="tabelle-indexierung-de"
                  caption="Zusammenspiel moderner Indexierungs- und KI-Signale"
                  columns={[
                    { key: 'signal', label: 'Mechanismus' },
                    { key: 'nutzer', label: 'Unterstützte Systeme' },
                    { key: 'nutzen', label: 'Technischer Nutzen' },
                  ]}
                  rows={[
                    { id: 'indexnow', signal: 'IndexNow (POST API)', nutzer: 'Microsoft Bing, Copilot, Naver, Seznam, Yep', nutzen: 'Sofortige Push-Benachrichtigung wenige Sekunden nach Veröffentlichung' },
                    { id: 'sitemap', signal: 'sitemap.xml + <lastmod>', nutzer: 'Googlebot, Bingbot, PerplexityBot, OAI-SearchBot', nutzen: 'Vollständiges URL-Verzeichnis mit echten Änderungszeitpunkten' },
                    { id: 'llmstxt', signal: '/llms.txt (Markdown)', nutzer: 'KI-Agenten & Dokumentations-Assistenten', nutzen: 'Kuratierte Übersicht der wichtigsten Leistungs- und Hilfeseiten' },
                  ]}
                  przypis="Quellen: IndexNow.org, Microsoft Bing Webmaster Blog und Google Search Central."
                />
                <p style={s.akapit}>
                  Den ausführlichen Vergleich lesen Sie unter{' '}
                  {protokolVergleich ? <Link href={protokolVergleich} style={s.podkreslenie}>llms.txt vs. robots.txt vs. sitemap.xml</Link> : 'llms.txt vs. robots.txt vs. sitemap.xml'}.
                </p>
              </Sekcja>

              <Sekcja id="echte-lastmod-zeitstempel-umsetzen" tytul="So beheben Sie künstliche <lastmod>-Daten in Next.js und CMS">
                <ul style={s.lista}>
                  <li><strong>Inhalts-Prüfsumme (Content Hash):</strong> Aktualisieren Sie <code>&lt;lastmod&gt;</code> beim Build nur dann, wenn sich der sichtbare Hauptinhalt einer URL tatsächlich geändert hat.</li>
                  <li><strong>Alle 15 KI-Crawler testen:</strong> Prüfen Sie weitere Suchbots im{' '}
                    {kiCrawler ? <Link href={kiCrawler} style={s.podkreslenie}>KI-Crawler &amp; robots.txt Prüfer</Link> : 'KI-Crawler & robots.txt Prüfer'}, erzeugen Sie Ihre{' '}
                    {llmsGen ? <Link href={llmsGen} style={s.podkreslenie}>llms.txt-Datei</Link> : 'llms.txt-Datei'}{' '}
                    und vergleichen Sie unsere Monatspakete (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.) unter{' '}
                    {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}.
                  </li>
                </ul>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu IndexNow, Bing und ChatGPT Search"
        sectionId="faq"
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

export default IndexNowBingStronaDe;
