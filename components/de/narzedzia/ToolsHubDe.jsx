// Deutscher Hub „SEO- & KI-Tools sowie Vorlagen“ (/de/tools).
// Serverkomponente analog zu components/narzedzia/NarzedziaHub.jsx im warmen --w-karta Designsystem.
// Enthält Header, Breadcrumbs (BreadcrumbList JSON-LD), CollectionPageSchema (ItemList JSON-LD),
// 2 Hauptbereiche (7 interaktive Online-Tools + 5 praxisnahe Checklisten & PDF-Vorlagen), FAQ, Quellen, Contact & Footer.

import '@/app/ruch.css';
import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import { CollectionPageSchema } from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ikona from '@/components/narzedzia/Ikony';
import { Link } from '@/i18n/routing';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { AUDYT, AUTORYTET, CENY, GENERATOR, WIDOCZNOSC } from '@/lib/narzedziaLiczby';
import { eur, liczba } from '@/lib/formatDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import AudytSeoClientDe from './AudytSeoClientDe';
import { ZrodlaDe, dataDlugaDe } from './UkladDe';

const KLUCZ_HUBA = '/narzedzia';
const ZAPAS_URL_HUBA = 'https://www.ai-seo-company.pl/de/tools';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const INTERAKTIVE_TOOLS = [
  {
    id: 'kostenloser-seo-audit',
    href: '/de/tools/kostenloser-seo-audit',
    ikona: 'audyt',
    nazwa: 'Kostenloser SEO-Audit',
    opis: `Prüft bis zu ${AUDYT.stron} Unterseiten nach ${AUDYT.regul} technischen, inhaltlichen und KI-bezogenen Regeln inklusive mobiler PageSpeed-Messung und konkreter Fehlerliste.`,
    sofort: `Gesamtwert 1-100, Bewertung in ${AUDYT.kategorii} Kategorien, mobile PageSpeed-Werte und die 3 wichtigsten Fehler samt Korrekturanleitung.`,
    email: 'Vollständige Fehlerliste mit allen betroffenen Unterseiten und Bericht für Ihre Entwicklung.',
  },
  {
    id: 'ki-sichtbarkeit-pruefen',
    href: '/de/ki-sichtbarkeit-pruefen',
    ikona: 'ai',
    nazwa: 'KI-Sichtbarkeit prüfen',
    opis: `Fragt ChatGPT, Gemini, Perplexity, Claude und Google AI Overviews live mit ${WIDOCZNOSC.pytan} echten Kundenfragen Ihrer Branche ab und zeigt, wer empfohlen und zitiert wird.`,
    sofort: `Sichtbarkeitswert 0-100, Matrix pro KI-System sowie bis zu ${WIDOCZNOSC.przedBramka.firm} genannte Wettbewerber und ${WIDOCZNOSC.przedBramka.domen} zitierte Quellen.`,
    email: 'Alle ungekürzten Modellantworten, sämtliche zitierten Domains und der Bericht per E-Mail.',
  },
  {
    id: 'ki-crawler-robots-txt-pruefen',
    href: '/de/tools/ki-crawler-robots-txt-pruefen',
    ikona: 'llms',
    nazwa: 'KI-Crawler & robots.txt Prüfer',
    opis: 'Vergleicht Ihre robots.txt-Regeln mit der echten HTTP-Antwort Ihrer Server-Firewall für 12 KI-Bots, misst die SSR-Content-Parität ohne JavaScript und generiert eine saubere robots.txt.',
    sofort: 'Komplette 12-Bot-Matrix (inkl. 403-WAF-Erkennung), SSR-Paritätswert, 1-Klick robots.txt-Generator und einbettbares SVG-Prüfsiegel.',
    email: null,
  },
  {
    id: 'core-web-vitals-vergleich',
    href: '/de/tools/core-web-vitals-vergleich',
    ikona: 'autorytet',
    nazwa: 'Core Web Vitals Test & Konkurrenz-Vergleich',
    opis: 'Stellt Ihre echten mobilen 28-Tage-CrUX-Ladezeiten (LCP, INP, CLS, TTFB) und Ihren CMS-Plugin-Ballast einem Wettbewerber sowie einer Next.js-SSR-Architektur gegenüber.',
    sofort: '3-Spalten-Vergleichstabelle, CMS-Röntgen, Live-Rechner für entgangene mobile Anfragen in Euro und 24-Monats-TCO-Vergleich.',
    email: null,
  },
  {
    id: 'seo-verlustrechner',
    href: '/de/tools/seo-verlustrechner',
    ikona: 'kalkulator',
    nazwa: 'SEO- & KI-Verlustrechner in EUR',
    opis: 'Berechnet in Euro als vorsichtige und optimistische Spanne, wie viel Deckungsbeitrag monatlich ohne Google Top 3 und ohne KI-Empfehlungen an Mitbewerber fließt.',
    sofort: 'Monats- und Jahresverlust in Euro, Online-Shop-Modus sowie integrierter SEO-ROI-Rechner mit Break-even- und Amortisationsmonat.',
    email: 'Kaufmännische Zusammenfassung samt Annahmen und Studienquellen für Ihre Budgetplanung.',
  },
  {
    id: 'llms-txt-generator',
    href: '/de/tools/llms-txt-generator',
    ikona: 'llms',
    nazwa: 'llms.txt Generator & KI-Bot-Test',
    opis: `Erstellt aus Ihrer Sitemap eine strukturierte /llms.txt-Datei mit Abschnitten und Beschreibungen und testet parallel den Zugriff von ${GENERATOR.botowAi} KI-Bots und Bingbot.`,
    sofort: 'Fertige llms.txt zum Bearbeiten und Herunterladen, Prüfung einer bestehenden Datei sowie Bot-Statuscodes.',
    email: null,
  },
  {
    id: 'domain-authority-checker',
    href: '/de/tools/domain-authority-checker',
    ikona: 'autorytet',
    nazwa: 'Domain Authority Checker',
    opis: `Berechnet unseren offenen Autoritätswert von 0 bis 100 aus dem Link-Graphen von Common Crawl (${liczba(AUTORYTET.domenWGrafie, 'de')} Domains) und vergleicht Sie mit bis zu ${AUTORYTET.konkurentow} Konkurrenten.`,
    sofort: `Autoritätswert 0-100, Graph-Position und direkter Balkenvergleich mit bis zu ${AUTORYTET.konkurentow} Wettbewerbern.`,
    email: 'Bericht mit priorisiertem Maßnahmenplan für nachhaltigen Linkaufbau.',
  },
];

const VORLAGEN_DE = [
  {
    id: 'seo-checkliste',
    href: '/de/tools/seo-checkliste',
    nazwa: 'SEO Checkliste (50 Prüfpunkte)',
    opis: 'Praxisnahe Checkliste für technisches SEO, On-Page-Optimierung, lokale Sichtbarkeit, KI-Tauglichkeit und Search-Console-Kontrolle - mit Prioritäten und kostenlosem PDF.',
  },
  {
    id: 'redaktionsplan-vorlage',
    href: '/de/tools/redaktionsplan-vorlage',
    nazwa: 'Redaktionsplan Vorlage (Content-Kalender)',
    opis: 'Strukturierter 3-Monats-Redaktionsplan für Unternehmensblog und Leistungsseiten inklusive Themenspeicher, Suchintentions-Spalte und Erfolgsauswertung.',
  },
  {
    id: 'keyword-recherche-vorlage',
    href: '/de/tools/keyword-recherche-vorlage',
    nazwa: 'Keyword Recherche Vorlage',
    opis: 'Schritt-für-Schritt-Vorlage von der ersten Begriffssammlung über das Clustern anhand der Google Top 10 bis zur fertigen Zielseiten-Map ohne Kannibalisierung.',
  },
  {
    id: 'e-e-a-t-checkliste',
    href: '/de/tools/e-e-a-t-checkliste',
    nazwa: 'E-E-A-T Checkliste (36 Punkte)',
    opis: 'Prüfbogen für Erfahrung, Expertise, Autorität und Vertrauen: Anbieterkennzeichnung, Autorenprofile, Belege, externe Reputation und passende Schema.org-Auszeichnung.',
  },
  {
    id: 'schema-markup-beispiele',
    href: '/de/tools/schema-markup-beispiele',
    nazwa: 'Schema Markup Beispiele (7 JSON-LD Vorlagen)',
    opis: 'Sieben saubere JSON-LD-Vorlagen (Organization, LocalBusiness, WebSite, BreadcrumbList, Article, Person, Product) zum direkten Kopieren inklusive PDF-Leitfaden.',
  },
];

const FAQ_HUB_DE = [
  {
    id: 'sind-alle-tools-wirklich-kostenlos',
    question: 'Sind alle SEO- und KI-Tools auf dieser Seite dauerhaft kostenlos?',
    answer: `Ja. Alle 7 Online-Tools und 5 Vorlagen lassen sich ohne Registrierung und ohne Bezahlschranke nutzen. Faire Tageslimits pro IP-Adresse schützen lediglich vor automatisiertem Missbrauch und API-Kosten (z. B. ${AUDYT.limitIp} SEO-Audits, ${WIDOCZNOSC.limitIp} Markenprüfungen in den KI-Modellen und ${AUTORYTET.limitIp} Domains im Authority Checker pro Tag). Der Verlustrechner rechnet vollständig lokal in Ihrem Browser.`,
  },
  {
    id: 'brauche-ich-eine-email-adresse',
    question: 'Für welche Tools oder Vorlagen wird eine E-Mail-Adresse benötigt?',
    answer: 'Beim KI-Crawler-Prüfer, Core-Web-Vitals-Vergleich, llms.txt-Generator, Domain Authority Checker und SEO-Verlustrechner sehen Sie das komplette Ergebnis sofort ohne E-Mail. Beim kostenlosen SEO-Audit und beim KI-Sichtbarkeits-Check sehen Sie Punktzahl und Kernbefunde sofort, während die vollständige Detailauswertung per E-Mail freigeschaltet wird. PDF-Vorlagen senden wir Ihnen auf Wunsch innerhalb einer Minute per Link ins Postfach - ohne Newsletter-Zwang.',
  },
  {
    id: 'woher-stammen-die-messdaten',
    question: 'Woher stammen die Daten der Tools - sind das echte Live-Messungen?',
    answer: 'Jedes Tool arbeitet mit nachprüfbaren Echtzeit- oder Primärdaten statt geschätzter Platzhalter: Der SEO-Audit crawlt Ihre Seiten live, der Core-Web-Vitals-Vergleich liest Googles offizielle 28-Tage-CrUX-Felddaten und PageSpeed Insights aus, der KI-Crawler-Prüfer testet reale HTTP-Antworten Ihrer Firewall, der KI-Check fragt ChatGPT, Gemini, Perplexity und Claude per API ab und der Authority Checker nutzt den öffentlichen Common-Crawl-Linkgraphen.',
  },
  {
    id: 'mit-welchem-tool-starten',
    question: 'Mit welchem Tool sollte ich bei meiner Website anfangen?',
    answer: 'Starten Sie mit dem kostenlosen SEO-Audit und dem KI-Crawler-Prüfer, um sicherzustellen, dass weder technische Fehler noch eine 403-Firewall Google und KI-Suchbots aussperren. Prüfen Sie anschließend im Core-Web-Vitals-Vergleich Ihre mobilen Ladezeiten gegen Ihren wichtigsten Konkurrenten, testen Sie Ihre Markennennung in ChatGPT und beziffern Sie das wirtschaftliche Potenzial im SEO-Verlustrechner.',
  },
  {
    id: 'ersetzen-die-tools-ein-vollstaendiges-seo-audit',
    question: 'Ersetzen die Online-Tools ein manuelles technisches SEO-Audit?',
    answer: `Nein. Automatische Tools liefern in Sekunden eine präzise Stichprobe (z. B. bis zu ${AUDYT.stron} Unterseiten im Schnell-Audit oder ${WIDOCZNOSC.pytan} Live-Prompts im KI-Check). Ein vollständiges SEO-Audit durch einen Spezialisten umfasst die gesamte Indexierungsdatenbank der Google Search Console, Keyword-Kannibalisierung, Informationsarchitektur, Backlink-Risiken und eine priorisierte Roadmap für Ihr Entwicklerteam.`,
  },
];

const ZRODLA_HUB_DE = [
  { url: 'https://developers.google.com/speed/docs/insights/v5/about', nazwa: 'Google: PageSpeed Insights API v5 & Chrome User Experience Report (CrUX) (Englisch)', data: '2026-11-18' },
  { url: 'https://web.dev/articles/vitals', nazwa: 'Google web.dev: Core Web Vitals Grenzwerte (LCP, INP, CLS im 75. Perzentil) (Englisch)', data: '2026-11-18' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Dokumentation der Crawler OAI-SearchBot, ChatGPT-User und GPTBot (Englisch)', data: '2026-11-18' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity: PerplexityBot und Perplexity-User Dokumentation (Englisch)', data: '2026-11-18' },
  { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: Spezifikation des /llms.txt-Formats v2 (Englisch)', data: '2026-11-18' },
  { url: 'https://commoncrawl.org/web-graphs', nazwa: 'Common Crawl: Öffentliche Host- und Domain-Linkgraphen (Englisch)', data: '2026-11-18' },
];

const malyTekst = { fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--color-text-main)', margin: '0.45rem 0 0' };
const etykietaPol = { fontWeight: 600, color: 'var(--w-tusz)' };

function KartaToolDe({ karta, i }) {
  return (
    <article className={st.kartaHuba} style={{ '--i': i % 6 }}>
      <div className={st.kartaNaglowek}>
        <span className={st.kafelIkona} aria-hidden="true">
          <Ikona nazwa={karta.ikona} />
        </span>
        <h3 style={{ ...s.h3, margin: 0 }}>
          <NextLink href={karta.href} data-cta={`tools_de_${karta.id}`} className={st.kartaLink} style={{ color: 'inherit', textDecoration: 'none' }}>
            {karta.nazwa}
          </NextLink>
        </h3>
        <span aria-hidden="true" className={st.strzalka}>
          <Ikona nazwa="strzalka" rozmiar={20} />
        </span>
      </div>
      <p style={{ ...s.akapit, margin: 0, fontSize: '1rem' }}>{karta.opis}</p>
      <div className={st.odRazuBlok}>
        <p style={malyTekst}>
          <span style={etykietaPol}>Sofort im Browser:</span> {karta.sofort}
        </p>
        <p style={malyTekst}>
          {karta.email ? (
            <>
              <span style={etykietaPol}>Per E-Mail:</span> {karta.email}
            </>
          ) : (
            <span style={etykietaPol}>Keine E-Mail nötig: Das gesamte Ergebnis ist sofort frei sichtbar.</span>
          )}
        </p>
      </div>
    </article>
  );
}

function KartaVorlageDe({ karta, i }) {
  return (
    <article className={`${st.kartaHuba} ${st.kartaSzablonu}`} style={{ '--i': i % 6 }}>
      <div className={st.miniKartka} aria-hidden="true" data-k={i % 3}>
        <i /><b /><b /><b /><u />
      </div>
      <div className={st.kartaNaglowek}>
        <span className={st.kafelIkona} aria-hidden="true">
          <Ikona nazwa="checklista" />
        </span>
        <h3 style={{ ...s.h3, margin: 0 }}>
          <NextLink href={karta.href} data-cta={`tools_de_${karta.id}`} className={st.kartaLink} style={{ color: 'inherit', textDecoration: 'none' }}>
            {karta.nazwa}
          </NextLink>
        </h3>
        <span aria-hidden="true" className={st.strzalka}>
          <Ikona nazwa="strzalka" rozmiar={20} />
        </span>
      </div>
      <p style={{ ...s.akapit, margin: 0, fontSize: '0.98rem' }}>{karta.opis}</p>
    </article>
  );
}

export function ToolsHubDe() {
  const wpis = wpisDe(KLUCZ_HUBA);
  const h1 = wpis?.h1 || 'Kostenlose SEO- & KI-Tools sowie Checklisten für Unternehmen';
  const opis = wpis?.opis || 'Kostenlose SEO- und KI-Tools ohne Anmeldung: SEO-Audit, KI-Sichtbarkeit in ChatGPT, KI-Crawler-Prüfer, Core-Web-Vitals-Vergleich, ROI-Rechner und PDF-Vorlagen.';
  const url = urlDe(KLUCZ_HUBA) || ZAPAS_URL_HUBA;

  const elementySchema = [
    ...INTERAKTIVE_TOOLS.map((t) => ({ name: t.nazwa, url: t.href, description: t.opis })),
    ...VORLAGEN_DE.map((v) => ({ name: v.nazwa, url: v.href, description: v.opis })),
  ];

  const seoAuditService = jesli('/audyt-seo');
  const b2bSeo = jesli('/pozycjonowanie-stron-internetowych');
  const geoHub = jesli('/pozycjonowanie-w-ai');
  const seoKosten = jesli('/cennik-pozycjonowania');
  const nextVergleich = jesli('/porownania/nextjs-vs-wordpress-seo');

  return (
    <main className={`${st.strona} ${st.hub}`} style={s.main}>
      <Header />
      <Breadcrumbs pl="Tools" en="Tools" de="Tools" />
      <CollectionPageSchema
        url={url}
        name={h1}
        description={opis}
        language="de"
        elementy={elementySchema}
      />

      <section className={st.hero} style={s.hero}>
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenlos &amp; ohne Registrierung
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={{ ...s.lead, margin: '0 auto 1.5rem' }}>
            Geben Sie oben Ihre Domain für den schnellen SEO-Audit nach {AUDYT.regul} Regeln ein oder wählen Sie unten eines unserer {INTERAKTIVE_TOOLS.length} interaktiven Analyse-Tools und {VORLAGEN_DE.length} praxiserprobten SEO-Vorlagen.
          </p>

          <AudytSeoClientDe />
          <p style={{ ...s.przypis, textAlign: 'center', marginTop: '0.75rem' }}>
            Welche {AUDYT.regul} Prüfpunkte in die Bewertung einfließen, lesen Sie auf der Detailseite zum{' '}
            <NextLink href="/de/tools/kostenloser-seo-audit" style={s.podkreslenie}>
              kostenlosen SEO-Audit
            </NextLink>.
          </p>

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Auf dieser Seite bündeln wir sämtliche kostenlosen Online-Werkzeuge und Arbeitsvorlagen von AI SEO COMPANY für den deutschsprachigen Mittelstand: vom technischen SEO-Audit über den KI-Sichtbarkeits- und KI-Crawler-Check bis zum Live-Vergleich der Core Web Vitals und dem SEO-ROI-Rechner in Euro. Alle Werkzeuge arbeiten mit echten Messdaten ohne Registrierung.
            </AnswerBox>
          </div>

          <p className="byline" style={{ margin: '1.25rem 0 0', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>
            Verfasst von: <Link href="/o-nas" style={{ color: 'inherit', textDecoration: 'underline' }}>Filip Śliwa</Link>, SEO-Spezialist · aktualisiert: <time dateTime="2026-11-21">{dataDlugaDe('2026-11-21')}</time>
          </p>

          {/* Sektion 1: Interaktive SEO- & KI-Tools */}
          <section aria-labelledby="interaktive-tools" className={st.sekcja} style={{ marginTop: '3rem' }}>
            <h2 id="interaktive-tools" style={s.h2}>
              Interaktive SEO- &amp; KI-Tools (kostenlose Online-Tools ohne Anmeldung)
            </h2>
            <p style={s.akapit}>
              Unsere Werkzeuge ergänzen Google Search Console und Analytics genau dort, wo Standardberichte im Alltag Lücken lassen: beim Live-Test von KI-Crawlern und Server-Firewalls, beim direkten Geschwindigkeits- und CMS-Vergleich mit Wettbewerbern sowie bei der kaufmännischen Berechnung des SEO-ROI in Euro.
            </p>
            <div className={st.siatkaHub} style={{ marginTop: '1.5rem' }}>
              {INTERAKTIVE_TOOLS.map((karta, idx) => (
                <KartaToolDe key={karta.id} karta={karta} i={idx} />
              ))}
            </div>
          </section>

          {/* Sektion 2: Praxisnahe SEO-Checklisten & Vorlagen */}
          <section id="vorlagen" aria-labelledby="seo-vorlagen" className={st.sekcja} style={{ ...s.sekcja, scrollMarginTop: '110px' }}>
            <h2 id="seo-vorlagen" style={s.h2}>
              Praxisnahe SEO-Checklisten &amp; Vorlagen (PDF &amp; interaktive Checklisten)
            </h2>
            <p style={s.akapit}>
              Jede Vorlage enthält auf ihrer Seite eine vollständige Anleitung mit ausgefüllten Praxisbeispielen sowie ein druckfertiges PDF-Arbeitsblatt für Ihr Marketing-Team oder die Steuerung externer Dienstleister.
            </p>
            <div className={st.siatkaSzablonow} style={{ marginTop: '1.5rem' }}>
              {VORLAGEN_DE.map((karta, idx) => (
                <KartaVorlageDe key={karta.id} karta={karta} i={idx} />
              ))}
            </div>
          </section>

          {/* Empfohlene Reihenfolge & interne Leistungsverknuepfung */}
          <section aria-labelledby="empfohlener-ablauf" className={st.sekcja} style={s.sekcja}>
            <h2 id="empfohlener-ablauf" style={s.h2}>
              Empfohlener Ablauf: In 4 Schritten von der Diagnose zur Entscheidung
            </h2>
            <p style={s.akapit}>
              Am meisten Erkenntnis gewinnen Sie, wenn Sie Technik, KI-Zugang, Ladezeit und Wirtschaftlichkeit nacheinander prüfen:
            </p>
            <ol style={s.lista}>
              <li>
                <strong>Technik &amp; KI-Firewall klären:</strong> Starten Sie mit dem{' '}
                <NextLink href="/de/tools/kostenloser-seo-audit" style={s.podkreslenie}>kostenlosen SEO-Audit</NextLink>{' '}
                und dem{' '}
                <NextLink href="/de/tools/ki-crawler-robots-txt-pruefen" style={s.podkreslenie}>KI-Crawler &amp; robots.txt Prüfer</NextLink>, um Weiterleitungsfehler, 403-WAF-Blockaden und leeres JavaScript-HTML auszuschließen.
              </li>
              <li>
                <strong>Mobile Geschwindigkeit gegen Wettbewerber messen:</strong> Prüfen Sie im{' '}
                <NextLink href="/de/tools/core-web-vitals-vergleich" style={s.podkreslenie}>Core-Web-Vitals-Vergleich</NextLink>, ob langsames LCP oder träges INP auf Smartphones täglich Anfragen kostet.
              </li>
              <li>
                <strong>Status in KI-Antworten &amp; Linkprofil einordnen:</strong> Testen Sie unter{' '}
                <NextLink href="/de/ki-sichtbarkeit-pruefen" style={s.podkreslenie}>KI-Sichtbarkeit prüfen</NextLink>, ob ChatGPT und Perplexity Ihre Marke bereits nennen, und vergleichen Sie Ihre Linkstärke im{' '}
                <NextLink href="/de/tools/domain-authority-checker" style={s.podkreslenie}>Domain Authority Checker</NextLink>.
              </li>
              <li>
                <strong>Budget &amp; Amortisation in Euro gegenrechnen:</strong> Übertragen Sie Ihre Kennzahlen in den{' '}
                <NextLink href="/de/tools/seo-verlustrechner" style={s.podkreslenie}>SEO- &amp; KI-Verlustrechner</NextLink>, um zu sehen, ab welchem Monat sich ein laufendes SEO-Paket trägt.
              </li>
            </ol>
            <p style={s.akapit}>
              Wenn die Diagnose strukturelle Bremsen zeigt, unterstützen wir Sie bei der Umsetzung: vom tiefgehenden{' '}
              {seoAuditService ? <Link href={seoAuditService} style={s.podkreslenie}>technischen SEO-Audit</Link> : 'technischen SEO-Audit'} (ab {eur(CENY.audytSeo.eur, 'de')} netto) über laufendes{' '}
              {b2bSeo ? <Link href={b2bSeo} style={s.podkreslenie}>B2B SEO</Link> : 'B2B SEO'} und{' '}
              {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'} bis zum Booster Pack inklusive neuer Next.js-Website ({nextVergleich ? <Link href={nextVergleich} style={s.podkreslenie}>Next.js vs. WordPress Vergleich</Link> : 'Next.js vs. WordPress'}, alle Preise unter{' '}
              {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten</Link> : 'SEO Kosten'}).
            </p>
          </section>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_HUB_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu unseren kostenlosen SEO- & KI-Tools"
        sectionId="pytania"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <ZrodlaDe zrodla={ZRODLA_HUB_DE} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default ToolsHubDe;
