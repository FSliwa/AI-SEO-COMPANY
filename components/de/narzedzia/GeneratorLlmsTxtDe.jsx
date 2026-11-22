// Niemiecka strona /de/tools/llms-txt-generator (18.11.2026, de-narzedzia). Odpowiednik GeneratorLlmsTxt.jsx (PL/EN):
// te same sekcje, testy i fakty (liczby ze stałej GENERATOR, źródła z lib/narzedzia.js z niemieckimi nazwami),
// tekst napisany po niemiecku od zera pod frazę „llms.txt generator” (DACH: ~2 000 wyszukiwań/mies., warianty
// „llms.txt erstellen”, „llms.txt was ist das”, „llms.txt vs robots.txt”, „llms.txt wordpress”, „llms.txt beispiel”).
// Komponent serwerowy; interaktywna część: LlmsTxtClientDe. Bez linków do bloga (brak /de/blog).

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { GENERATOR, CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { STRONY_NARZEDZI_DE, FAQ_GENERATORA_DE } from '@/lib/narzedzia.de';
import { stronaNarzedzia } from '@/lib/narzedzia';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import * as s from '@/components/narzedzia/styl';
import st from '@/components/narzedzia/narzedzia.module.css';
import { UkladDe, WeitereToolsDe, dataDlugaDe } from './UkladDe';
import LlmsTxtClientDe from './LlmsTxtClientDe';

const KLUCZ = '/narzedzia/generator-llms-txt';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

// Przykład po niemiecku (ilustracja struktury, nie wycinek opublikowanej pliku; własny /llms.txt jest po polsku).
const PRZYKLAD = `# AI SEO COMPANY

> SEO Agentur aus Warschau. SEO, Generative Engine Optimization (GEO), SEO Audits
> und Websites mit Next.js für kleine und mittlere Unternehmen.

## Leistungen

- [SEO Audit](https://www.ai-seo-company.pl/de/seo-audit): Analyse mit mehr als 50 Prüfpunkten und priorisiertem Maßnahmenplan.
- [SEO Kosten](https://www.ai-seo-company.pl/de/seo-kosten): Pakete und Preise in Euro.

## Optional

- [Datenschutzerklärung](https://www.ai-seo-company.pl/de/datenschutz)`;

const TESTY = [
  { co: 'Sitemap', poCo: `Quelle der Seitenliste: der Sitemap-Eintrag in der robots.txt oder /sitemap.xml, einschließlich Sitemap-Indizes (bis zu ${GENERATOR.mapPodrzednych} untergeordnete Sitemaps). Bei mehr als ${GENERATOR.adresow} Adressen nehmen wir einige aus jeder Sitemap und jedem Abschnitt, nicht die ersten ${GENERATOR.adresow}. Einige fehlerhafte Adressen ersetzen wir durch andere aus demselben Abschnitt.`, jak: 'Ohne Sitemap enthält die Datei nur die Startseite. Legen Sie eine sitemap.xml an und reichen Sie sie in der Search Console ein.' },
  { co: 'Statuscode und Weiterleitungen', poCo: 'Nur Adressen mit Code 200 kommen in die Datei.', jak: 'Adressen mit den Codes 3xx, 4xx und 5xx stehen samt Code auf der Liste der übersprungenen Adressen.' },
  { co: 'noindex', poCo: 'Eine vom Index ausgeschlossene Seite gehört nicht in das Verzeichnis.', jak: 'Wir überspringen Adressen mit noindex im Meta-Tag robots oder im Header X-Robots-Tag.' },
  { co: 'Titel und Beschreibung', poCo: 'Sie bilden die Zeilen der Datei: ein Link mit Titel und einer Beschreibung nach dem Doppelpunkt.', jak: 'Keine Beschreibung = ein nackter Link. Ergänzen Sie für diese Seiten eine Meta-Beschreibung.' },
  { co: 'Abschnitte der Datei', poCo: 'Wir gruppieren Seiten nach dem ersten Teil der Adresse (Blog, Leistungen) und nach Sprachversion (EN-Version, Blog (EN)). AGB und Richtlinien kommen in den Abschnitt „Optional“, den ein Modell überspringen darf. Die Kontaktseite bleibt in „Seiten“.', jak: 'Ein Abschnitt braucht mindestens 2 Seiten in der Sitemap; die übrigen Adressen kommen nach „Seiten“. Im Editor können Sie Abschnitte vor dem Download umbenennen und Links zwischen ihnen verschieben.' },
  { co: `robots.txt für ${GENERATOR.botowAi} KI-Bots und Bingbot`, poCo: 'Zeigt, ob ein Bot die Startseite abrufen darf und wie viele der geprüften Adressen er blockiert.', jak: 'Wer OAI-SearchBot oder PerplexityBot sperrt, schließt seine Website aus den Ergebnissen von ChatGPT und Perplexity aus.' },
  { co: 'Vorhandene Datei /llms.txt', poCo: 'Zeigt, ob die Website die Datei schon hat und ob sie ohne Weiterleitung ausgeliefert wird.', jak: 'Code 200 und eine Überschrift „# Name“ in der ersten Zeile = die Datei ist vorhanden. Wir zeigen auch die Zahl der Links zu Ihren Unterseiten: Eine Datei ohne Links im Format [Name](https://adresse) markieren wir als Fehler, weil sie einem Modell nichts zeigt. HTML statt Text bedeutet die falsche Adresse.' },
  { co: 'HTTP-Code mit dem User-Agent des Bots', poCo: 'Erkennt Sperren durch Firewall (WAF) und CDN, die die robots.txt nicht zeigt.', jak: 'Code 403 oder 429 für den Bot bei 200 für einen Browser bedeutet eine Sperre auf Serverseite.' },
];

const FAQ_DODATKOWE = [
  {
    id: 'why-are-some-pages-missing',
    question: 'Warum fehlen einige meiner Unterseiten in der Datei?',
    answer: `Wir prüfen bis zu ${GENERATOR.adresow} Adressen: Bei einer größeren Sitemap nehmen wir einige aus jeder untergeordneten Sitemap und jedem Abschnitt (bis zu ${GENERATOR.mapPodrzednych} Sitemaps). Adressen mit einem anderen Code als 200 oder mit noindex überspringen wir. Unter dem Ergebnis listen wir die übersprungenen Adressen auf sowie jene, die wir innerhalb von ${GENERATOR.sekund} Sekunden nicht mehr prüfen konnten. Einige fehlerhafte Adressen ersetzen wir durch andere aus demselben Abschnitt. Wichtige fehlende Seiten tragen Sie im selben Format von Hand nach.`,
  },
  {
    id: 'what-is-the-optional-section',
    question: 'Was ist der Abschnitt „Optional“?',
    answer: 'Das ist ein Abschnitt aus der Spezifikation von llmstxt.org: Links, die ein Modell überspringen darf, wenn der Platz knapp ist. Der Generator legt dort AGB sowie Datenschutz- und Cookie-Richtlinien ab und lässt die Kontaktseite und wichtige Seiten in den Abschnitten darüber. Im Editor unter dem Ergebnis können Sie weitere nachrangige Links dorthin verschieben. Übersetzen Sie den Namen „Optional“ nicht, denn er stammt aus der Spezifikation.',
  },
  {
    id: 'do-i-need-an-email',
    question: 'Brauche ich eine E-Mail-Adresse oder ein Konto?',
    answer: `Nein. Die ganze Datei und den Bot-Test sehen Sie sofort auf der Seite, ohne Anmeldung und ohne E-Mail. Wir speichern weder die Adresse noch das Ergebnis. Das Limit liegt bei ${GENERATOR.limitIp} Prüfungen pro Tag und IP-Adresse (ein ungefähres Limit).`,
  },
  {
    id: 'can-i-edit-the-file',
    question: 'Kann ich die Datei vor dem Download bearbeiten?',
    answer: 'Ja. Öffnen Sie unter dem Ergebnis „Datei vor dem Download bearbeiten“: Sie können Zeilen deaktivieren, die nicht in die Datei sollen, Name, Beschreibung des Unternehmens, Titel und Beschreibungen der Links, Reihenfolge und Abschnitte ändern und nachrangige Links nach „Optional“ verschieben. Die Buttons „Kopieren“ und „llms.txt herunterladen“ übernehmen die Datei mit Ihren Änderungen. Die Bearbeitung geschieht in Ihrem Browser, wir speichern nichts.',
  },
];

const CO_DOSTAJESZ = [
  'Die ganze Datei llms.txt im Format von llmstxt.org: Überschrift mit dem Namen, Beschreibung des Unternehmens und Abschnitte mit Links zu den Unterseiten.',
  'Zu jedem Link ein Titel und eine Beschreibung aus der Meta-Beschreibung der Unterseite, falls sie eine hat.',
  'Abschnitte nach Verzeichnissen und Sprachversionen, AGB und Richtlinien im Abschnitt „Optional“.',
  'Einen Editor vor dem Download: Zeilen deaktivieren, Titel, Beschreibungen, Reihenfolge und Abschnitte ändern.',
  `Einen Test von robots.txt und HTTP-Code für ${GENERATOR.botowAi} KI-Bots und Bingbot mit einem Fazit zu jedem.`,
  'Eine Bewertung der vorhandenen Datei /llms.txt mit der Zahl der Links zu Unterseiten.',
  'Eine Liste der übersprungenen Adressen mit Grund (HTTP-Code, noindex) und einen Link zum Ergebnis zum Kopieren.',
];

const FUNKCJE = [`llms.txt aus der Sitemap, bis zu ${GENERATOR.adresow} Adressen aus allen Abschnitten`, 'Abschnitte nach Verzeichnissen und Sprachversionen, Abschnitt Optional', 'Bearbeitung der Datei vor dem Download', `Test von robots.txt und HTTP-Code für ${GENERATOR.botowAi} KI-Bots und Bingbot`, 'Bewertung der vorhandenen Datei /llms.txt mit der Zahl der Links'];

// Zrzut wyniku z trybu demo z interfejsem DE powstaje w kroku renderu (RAPORT de-narzedzia); do tego czasu bez zrzutu.
const ZRZUT = null;

/** Podpis autora i data (jak components/Byline.jsx, tylko po niemiecku). Data = data zmiany treści strony. */
function BylineDe({ data }) {
  return (
    <p className="byline" style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>
      Verfasst von: <Link href="/o-nas" style={{ color: 'inherit', textDecoration: 'underline' }}>Filip Śliwa</Link>, SEO-Spezialist · aktualisiert: <time dateTime={data}>{dataDlugaDe(data)}</time>
    </p>
  );
}

export default function GeneratorLlmsTxtDe() {
  const wpis = wpisDe(KLUCZ);
  const meta = stronaNarzedzia('generator-llms-txt');
  const nazwy = STRONY_NARZEDZI_DE['generator-llms-txt'];
  const zrodla = meta.sources.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }));
  const hubGeo = jesli('/pozycjonowanie-w-ai');
  const sprawdzarka = jesli('/sprawdz-widocznosc-w-ai');
  // Audyt widoczności w AI: strona GEO (bez kotwicy; nowych kotwic DE nie wprowadzamy).
  const audyt = hubGeo;
  const cenaAi = eur(CENY.audytAi.eur);
  return (
    <UkladDe
      klucz={KLUCZ}
      tag="Kostenloses Tool"
      h1={wpis.h1}
      okruszek={nazwy.okruszek}
      zrodla={zrodla}
      schema={{
        name: 'llms.txt Generator und Zugriffstest für KI-Bots',
        description: 'Kostenloses Tool: erzeugt eine Datei llms.txt aus Ihrer Sitemap und prüft den Zugriff von GPTBot, OAI-SearchBot, PerplexityBot und ClaudeBot in der robots.txt.',
        category: 'DeveloperApplication',
        featureList: FUNKCJE,
        ...(ZRZUT ? { screenshot: { url: ZRZUT.src, width: ZRZUT.width, height: ZRZUT.height } } : {}),
      }}
      lead={`Geben Sie die Adresse Ihrer Website ein, und in höchstens ${GENERATOR.sekund} Sekunden erhalten Sie mit dem llms.txt Generator die ganze Datei aus Ihrer Sitemap und einen Zugriffstest für ${GENERATOR.botowAi} KI-Bots und Bingbot. Ohne Anmeldung und ohne E-Mail.`}
      narzedzie={<LlmsTxtClientDe hrefSprawdzarki={sprawdzarka} hrefAudytu={audyt} />}
      odpowiedz="llms.txt ist eine Markdown-Datei im Stammverzeichnis einer Website, die Sprachmodellen die wichtigsten Unterseiten mit einer kurzen Beschreibung nennt. Es ist ein Standardvorschlag (llmstxt.org), keine Pflicht: Laut einer Analyse von Ahrefs unterstützt ihn kein großer Anbieter von Modellen offiziell. Für ChatGPT ist wichtiger, ob KI-Bots in der robots.txt Zugriff auf die Website haben. Der Generator prüft beides."
      faq={[...FAQ_GENERATORA_DE, ...FAQ_DODATKOWE]}
      tytulFaq="Fragen zu llms.txt"
    >
      <BylineDe data={meta.updated} />

      <CoDostajesz
        id="was-sie-erhalten"
        tytul="Das erhalten Sie kostenlos"
        odRazu={CO_DOSTAJESZ}
        tytulOdRazu="Sofort, ohne E-Mail und ohne Anmeldung"
        przypis="Es gibt hier nichts per E-Mail freizuschalten: Das ganze Ergebnis steht auf der Seite. Wir speichern weder die Adresse noch das Ergebnis."
      >
        {ZRZUT && (
          <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
            <ZrzutWyniku
              {...ZRZUT}
              sizes="(max-width: 700px) 100vw, 640px"
              alt="llms.txt Generator: Ergebnis für ai-seo-company.pl mit Sitemap, Bewertung der vorhandenen Datei und Zugriffstest für 7 KI-Bots und Bingbot"
              podpis="Ergebnis des Generators für unsere eigene Website: Sitemap, vorhandene Datei und der Test mit 7 KI-Bots und Bingbot. Unter der Tabelle stehen die fertige Datei und der Editor."
            />
          </div>
        )}
      </CoDostajesz>

      <Sekcja id="was-ist-llms-txt" tytul="Was ist llms.txt (und llms-full.txt)?">
        <p style={s.akapit}>
          Die Datei llms.txt liegt unter der Adresse /llms.txt und beschreibt eine Website für Sprachmodelle und KI-Agenten, die Seiten im Auftrag von Nutzern lesen. Das Format hat Jeremy Howard im September 2024 vorgeschlagen, die aktuelle Fassung der Spezifikation (v2) ist auf llmstxt.org veröffentlicht.
        </p>
        <p style={s.akapit}>
          Der Aufbau ist fest. Oben steht eine Überschrift mit dem Firmennamen, das einzige Pflichtelement. Darunter folgt ein Zitat mit einer kurzen Beschreibung, danach Abschnitte mit Linklisten: der Titel der Unterseite in eckigen Klammern, die Adresse in runden und nach einem Doppelpunkt ein Satz dazu, was dort steht. Ein Abschnitt mit dem Namen „Optional“ sammelt nachrangige Links, die ein Modell überspringen darf, wenn der Platz knapp ist. So könnte die Datei für eine deutschsprachige Website aussehen:
        </p>
        <pre style={{ ...s.karta, ...s.kod, padding: '1.25rem', margin: '0 0 0.5rem', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: 'var(--w-tusz)' }}>
          <code>{PRZYKLAD}</code>
        </pre>
        <p style={s.przypis}>Beispiel für den Aufbau, kein Auszug aus einer veröffentlichten Datei. Unsere eigene Datei unter ai-seo-company.pl/llms.txt ist auf Polnisch.</p>
        <p style={{ ...s.akapit, marginTop: '1rem' }}>
          Manche Websites veröffentlichen daneben eine zweite, deutlich längere Datei namens llms-full.txt. Unser Generator erstellt das Verzeichnis, also die llms.txt: Das braucht eine typische Unternehmenswebsite.
        </p>
      </Sekcja>

      <Sekcja id="hilft-llms-txt" tytul="Hilft llms.txt in Google und ChatGPT?">
        <p style={s.akapit}>
          Bisher gibt es dafür keine Belege. Ahrefs (Abruf 05.11.2026) hat keine Erklärung von OpenAI, Anthropic oder Google gefunden, dass deren Crawler diese Datei lesen. Trotzdem veröffentlichen 28 % der 137.000 Domains, die Ahrefs in seinem Tool Web Analytics untersucht hat, eine llms.txt. Unternehmen führen sie auf Vorrat ein, in der Hoffnung, dass Modelle sie bald nutzen.
        </p>
        <p style={s.akapit}>
          Die Signale von Google sind widersprüchlich. Das Chrome-Team hat die Prüfung auf llms.txt in experimentelle Lighthouse-Audits aufgenommen, während John Mueller von Google erklärte, die Datei sei nicht mit Blick auf die Suche entstanden. Den Zugriff von Gemini auf Inhalte regelt separat der Eintrag Google-Extended in der robots.txt.
        </p>
        <p style={s.akapit}>
          {`Unser Fazit: llms.txt ist eine günstige Ergänzung, keine Strategie. Die Datei vorzubereiten kostet wenig und schadet nicht, aber ob ChatGPT, Perplexity oder Claude Ihre Website zitieren, entscheidet der Zugriff ihrer Bots und ein Inhalt, den man zitieren kann. Deshalb testet der Generator auch die robots.txt und die Antworten des Servers für ${GENERATOR.botowAi} KI-Bots und Bingbot. Wenn Ihnen Empfehlungen in den Antworten von Modellen wichtig sind, beginnen Sie mit der`}{' '}
          {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}.
        </p>
      </Sekcja>

      <Sekcja id="was-prueft-der-generator" tytul="Was der Generator prüft">
        <p style={s.akapit}>
          {`Der Generator ruft Ihre Sitemap ab, wählt bis zu ${GENERATOR.adresow} Adressen aus (bei einer größeren Sitemap einige aus jedem Abschnitt), prüft sie und setzt daraus die Datei zusammen. Parallel testet er den Zugriff von ${GENERATOR.botowAi} KI-Bots und Bingbot auf die Startseite. Der gesamte Ablauf dauert höchstens ${GENERATOR.sekund} Sekunden. Antwortet Ihre Website langsam, erhalten Sie ein Teilergebnis und eine Liste der Adressen, die wir nicht mehr prüfen konnten. Wir speichern weder die Adresse noch das Ergebnis.`}
        </p>
        <CompareTable
          id="tabelle-tests"
          caption="Was der llms.txt Generator prüft"
          columns={[
            { key: 'co', label: 'Test' },
            { key: 'poCo', label: 'Wozu' },
            { key: 'jak', label: 'So lesen Sie das Ergebnis' },
          ]}
          rows={TESTY.map((t) => ({ ...t, id: t.co }))}
          przypis="Wir senden die Anfragen von unserem eigenen Server, nicht von den IP-Adressen der KI-Anbieter, nehmen Sie die Spalte mit dem HTTP-Code daher als Richtwert."
        />
        <p style={s.akapit}>
          So prüfen wir auch uns selbst. Am 5. November 2026 haben wir unsere eigene Website mit 17 User-Agents (16 Bots und ein Browser) auf 7 Adressen abgefragt. Alle 119 Anfragen erhielten den Code 200, und unsere llms.txt hatte damals 14.437 Bytes.
        </p>
      </Sekcja>

      <Sekcja id="datei-verbessern" tytul="So verbessern Sie die Datei vor dem Hochladen">
        <p style={s.akapit}>
          Der Generator baut die Datei aus dem, was Ihre Unterseiten in Titel und Meta-Beschreibung über sich sagen. Bevor Sie sie hochladen, öffnen Sie den Editor unter dem Ergebnis und korrigieren, was ein Automat nicht beurteilen kann:
        </p>
        <ol style={s.lista}>
          {[
            'Die Beschreibung unter der Überschrift: ein bis zwei Sätze dazu, was Sie tun, für wen und wo. Ein Modell liest sie gleich nach dem Namen.',
            'Deaktivieren Sie Zeilen ohne Wert für Kunden: Login, Warenkorb, Tags, Seiten mit Suchergebnissen.',
            'Kürzen Sie Titel, die den Firmennamen wiederholen oder zu lang sind. Eine Beschreibung soll sagen, was auf der Unterseite steht, und nicht zum Klicken auffordern.',
            'Schieben Sie die wichtigsten Unterseiten an den Anfang ihres Abschnitts und verschieben Sie nachrangige nach „Optional“.',
            'Tragen Sie wichtige fehlende Unterseiten (zum Beispiel außerhalb Ihrer Sitemap) von Hand im selben Format nach.',
          ].map((t) => <li key={t}>{t}</li>)}
        </ol>
        <p style={s.akapit}>
          Die Buttons „Kopieren“ und „llms.txt herunterladen“ übernehmen die Datei mit Ihren Änderungen. Der Editor arbeitet in Ihrem Browser: Wir senden und speichern nichts, erzeugen Sie die Datei also nach Änderungen an Ihrer Website erneut.
        </p>
      </Sekcja>

      <Sekcja id="llms-txt-einbinden" tytul="llms.txt einbinden: WordPress, Next.js, Shopify">
        <p style={s.akapit}>
          Auf welcher Plattform auch immer: Die Datei soll sich unter ihredomain.de/llms.txt als reiner Text öffnen. Geben Sie nach der Veröffentlichung die Adresse Ihrer Website oben in den Generator ein und vergleichen Sie das Ergebnis mit der Datei.
        </p>
        <h3 id="llms-txt-wordpress" style={s.h3}>WordPress</h3>
        <p style={s.akapit}>
          Am einfachsten nutzen Sie ein SEO-Plugin, das Sie meist schon haben. Laut dem Verzeichnis von WordPress.org (Abruf 05.11.2026) haben Yoast SEO (Version 28.8), Rank Math (1.0.281) und All in One SEO (5.0.5) eine Funktion für llms.txt. Aktivieren Sie sie in den Einstellungen des Plugins und prüfen Sie, welche Unterseiten in die Datei gelangt sind. Ohne Plugin laden Sie die Datei aus dem Generator über den Dateimanager Ihres Hostings oder per FTP in das Stammverzeichnis hoch, dorthin, wo auch die wp-config.php liegt. Entscheiden Sie sich für einen Weg, damit Sie nicht zwei Versionen der Datei pflegen müssen.
        </p>
        <h3 id="llms-txt-nextjs" style={s.h3}>Next.js</h3>
        <p style={s.akapit}>
          Speichern Sie die Datei als public/llms.txt. Next.js liefert Dateien aus dem Verzeichnis public unter der Hauptadresse aus, sie erscheint also ohne zusätzlichen Code unter /llms.txt. Ändert sich die Liste der Unterseiten oft, nutzen Sie statt einer festen Datei einen Route Handler unter app/llms.txt/route.js, der den Inhalt aus denselben Daten wie Ihre Sitemap zusammenstellt und mit dem Header Content-Type: text/plain ausliefert. Eine neue Unterseite landet dann zusammen mit dem Deployment in der llms.txt.
        </p>
        <h3 id="llms-txt-shopify" style={s.h3}>Shopify</h3>
        <p style={s.akapit}>
          Shopify ist eine gehostete Plattform: Sie können keine Datei per FTP in das Stammverzeichnis der Domain hochladen. Seit Mai 2026 liefern Shopify-Shops eine Standard-Datei /llms.txt aus (mit demselben Inhalt wie /agents.md), und Sie können sie durch eine Theme-Vorlage mit dem Namen llms.txt.liquid ersetzen, unter Onlineshop, Themes, Code bearbeiten (Shopify Developer Changelog, 28.05.2026). Öffnen Sie die Adresse der Datei nach der Änderung im Browser.
        </p>
      </Sekcja>

      <section aria-labelledby="nach-dem-generator" className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.sekcja, ...s.karta, display: 'grid', gap: '1rem' }}>
        <h2 id="nach-dem-generator" style={{ ...s.h2, marginBottom: 0 }}>Datei fertig, und die Modelle empfehlen Ihr Unternehmen trotzdem nicht?</h2>
        <p style={{ ...s.akapit, margin: 0 }}>
          Im KI-Sichtbarkeit Audit stellen wir 30 Fragen Ihrer Kunden in ChatGPT, Perplexity, Gemini und den AI Overviews von Google und zeigen, aus welchen Seiten die Modelle ihre Empfehlungen beziehen.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {audyt && <Link href={audyt} className="btn btn-primary" data-cta="llms_audyt_tresc">{`KI-Sichtbarkeit Audit: ${cenaAi} netto`}</Link>}
          {sprawdzarka && <Link href={sprawdzarka} className="btn btn-secondary" data-cta="llms_sprawdzarka_tresc">Prüfen, ob ChatGPT Ihr Unternehmen empfiehlt</Link>}
        </div>
      </section>

      <WeitereToolsDe bez={KLUCZ} />
    </UkladDe>
  );
}
