// Deutsche Werkzeugseite /de/tools/core-web-vitals-vergleich.
// Serverkomponente fuer den Live-Core-Web-Vitals-Vergleich (CrUX) & Conversion-Verlust-Rechner.

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
import CwvVergleichClientDe from './CwvVergleichClientDe';

const KLUCZ = '/narzedzia/test-core-web-vitals-porownanie';
const SLUG = 'test-core-web-vitals-porownanie';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/core-web-vitals-vergleich';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://web.dev/articles/vitals', nazwa: 'Google web.dev: Core Web Vitals - Grenzwerte im 75. Perzentil für LCP (2,5 s), INP (200 ms) und CLS (0,10) (Englisch)', data: '2026-11-18' },
  { url: 'https://web.dev/blog/inp-cwv-march-12', nazwa: 'Google web.dev: Interaction to Next Paint (INP) ersetzt FID offiziell seit dem 12. März 2024 (Englisch)', data: '2026-11-18' },
  { url: 'https://developer.chrome.com/docs/crux', nazwa: 'Chrome Developers: Chrome User Experience Report (CrUX) - Methodik des 28-Tage-Messfensters (Englisch)', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals in der Google-Suche und Search Console', data: '2026-11-18' },
  { url: 'https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/', nazwa: 'Google & Deloitte („Milliseconds Make Millions“): Einfluss von 0,1 s schnellerer mobiler Ladezeit auf die Conversion-Rate (Englisch)', data: '2026-11-18' },
];

const FAQ_DE = [
  {
    id: 'unterschied-crux-und-lighthouse',
    question: 'Warum weichen die CrUX-Werte oft von einem einzelnen Lighthouse-Test ab?',
    answer: 'Lighthouse führt eine einmalige Laborsimulation durch, während Google für das Ranking die echten Felddaten aus dem Chrome User Experience Report (CrUX) heranzieht - also anonymisierte Messwerte echter Smartphone-Besucher aus den letzten 28 Tagen. Unser Vergleichstool liest bevorzugt diese 28-Tage-CrUX-Daten aus und greift nur bei sehr kleinen Domains ohne ausreichenden Chrome-Traffic auf PageSpeed-Labormessungen zurück.',
  },
  {
    id: 'was-ist-inp-statt-fid',
    question: 'Was misst der INP-Wert und warum scheitern viele Page-Builder-Seiten daran?',
    answer: 'Interaction to Next Paint (INP) hat im März 2024 den früheren FID-Wert abgelöst. Während FID nur die allererste Berührung maß, bewertet INP die Reaktionszeit der gesamten Sitzung beim Antippen von Menüs, Akkordeons oder Formularen (Grenzwert: maximal 200 ms). Schwere WordPress-Themes mit zahlreichen Plugins laden hunderte Kilobyte JavaScript auf den Haupt-Thread des Smartphones, sodass Eingaben um 300 bis 600 ms verzögert reagieren.',
  },
  {
    id: 'reichen-caching-plugins-aus',
    question: 'Reicht ein Caching-Plugin wie WP Rocket aus, um Next.js-Werte zu erreichen?',
    answer: 'Ein Server-Cache senkt vor allem die Antwortzeit (TTFB), weil fertiges HTML statt dynamischer PHP-Abfragen ausgeliefert wird. Er beseitigt jedoch weder ein aufgeblähtes DOM aus einem Page-Builder noch die JavaScript-Pakete dutzender Plugins im Browser des Besuchers. In Next.js senden React Server Components für reine Inhaltsbereiche überhaupt kein Client-JavaScript an das Smartphone, was dauerhaft INP-Werte um 50 ms ermöglicht.',
  },
  {
    id: 'wie-berechnet-sich-der-conversion-verlust',
    question: 'Wie berechnet der Rechner die entgangenen mobilen Anfragen in Euro?',
    answer: 'Das Modell stützt sich auf die gemeinsame Studie von Google und Deloitte („Milliseconds Make Millions“), nach der jede Verbesserung der mobilen Ladezeit um 0,1 Sekunden die Conversion-Rate im Handel um 8,4 % und bei Dienstleistungen um 10,1 % anhob. Wir vergleichen Ihr reales LCP und INP mit unserer Next.js-Referenz (1,15 s) und deckeln den Abzug konservativ als kaufmännische Orientierung.',
  },
  {
    id: 'wie-funktioniert-booster-pack-null-euro',
    question: `Wie funktioniert die Next.js-Website für 0 € Setup im Booster Pack (${eur(CENY.boosterPack.eur, 'de')}/Mon.)?`,
    answer: `Statt vorab 4.500 bis 10.000 € für einen Relaunch auszugeben, entwickeln wir im Booster Pack (${eur(CENY.boosterPack.eur, 'de')} netto pro Monat, Mindestlaufzeit ${CENY.boosterPack.umowaMiesiecy} Monate) eine individuell programmierte Next.js-SSR-Website ohne Einrichtungsgebühr und betreuen ab dem ersten Monat laufend Ihr B2B-SEO sowie Ihre KI-Sichtbarkeit.`,
  },
];

export function CwvVergleichStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'Core Web Vitals Test & Vergleich: Ihre Website vs. Konkurrent vs. Next.js';
  const okruszek = nazwy?.okruszek || 'Core Web Vitals Vergleich';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const nextVergleich = jesli('/porownania/nextjs-vs-wordpress-seo');
  const baukastenVergleich = jesli('/porownania/strona-kodowana-czy-kreator-seo');
  const cwvRatgeber = jesli('/blog/core-web-vitals-a-pozycje-google');
  const geoHub = jesli('/pozycjonowanie-w-ai');
  const seoKosten = jesli('/cennik-pozycjonowania');
  const b2bSeo = jesli('/pozycjonowanie-stron-internetowych');

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
        name="Core Web Vitals Test, Konkurrenz-Vergleich & Conversion-Rechner"
        description="Kostenloser Live-Vergleich der Core Web Vitals: stellt mobile LCP-, INP-, CLS- und TTFB-Werte (28-Tage-Chrome-CrUX-Daten) Ihrer Website einem Wettbewerber und Next.js SSR gegenüber, prüft CMS-Plugins und berechnet entgangene mobile Anfragen in Euro."
        url={url}
        category="BusinessApplication"
        language="de"
        featureList={[
          '3-Spalten-Vergleich: Ihre Website vs. Wettbewerber vs. Next.js-SSR-Referenz',
          'Echte mobile 28-Tage-Felddaten aus dem Chrome User Experience Report (LCP, INP, CLS, TTFB)',
          'CMS- & Plugin-Röntgen: Systemerkennung, aktive Plugins, blockierende Skripte und HTML-Gewicht',
          'Interaktiver Conversion-Verlust-Rechner in Euro auf Basis der Google/Deloitte-Studie (0,1 s)',
          '24-Monats-TCO-Vergleich zwischen WordPress-Pflege und dem Booster Pack (Next.js für 0 € Setup)',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="autorytet" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloser CrUX-Live-Vergleich
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Vergleichen Sie Ihre echten mobilen 28-Tage-Ladezeiten (LCP, INP, CLS, TTFB) und Ihren Plugin-Ballast direkt mit einem Konkurrenten sowie einer schlanken Next.js-Architektur - inklusive Live-Rechner für entgangene Anfragen in Euro.
          </p>

          <CwvVergleichClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Die Core Web Vitals sind Googles drei offizielle Kennzahlen für die Nutzererfahrung im 75. Perzentil echter mobiler Chrome-Besuche: Largest Contentful Paint (LCP &lt;= 2,50 s), Interaction to Next Paint (INP &lt;= 200 ms) und Cumulative Layout Shift (CLS &lt;= 0,10). Unser Tool stellt Ihre realen CrUX-Felddaten und Ihren CMS-Skriptballast einem Wettbewerber sowie einer modernen Next.js-SSR-Architektur gegenüber und übersetzt Ladezeitverzögerungen direkt in monatlich entgangene mobile Anfragen.
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Das liefert der Core-Web-Vitals-Vergleich kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Übersichtliche 3-Spalten-Tabelle: Ihre Website, Ihr Konkurrent und die Next.js-Referenzarchitektur',
                  'Farbcodierte Bewertung von LCP, INP, CLS und TTFB nach den offiziellen Google-Schwellenwerten',
                  'Technisches CMS-Röntgen: erkanntes System, öffentliche Plugin-Signaturen, blockierende Skripte und HTML-Größe',
                  'Live-Rechner für entgangene mobile Leads in Euro mit Reglern für Traffic und Kundenwert',
                  'Teilbarer Vergleichs-Link (?a=...&b=...) für Geschäftsführung, Marketing oder Agentur',
                ]}
                przypis="Keine Registrierung und kein E-Mail-Gate: Alle Messdaten und Kostenvergleiche sind sofort sichtbar."
              />

              <Sekcja id="crux-felddaten-vs-lighthouse-labor" tytul="CrUX 28-Tage-Felddaten vs. synthetischer Lighthouse-Test">
                <p style={s.akapit}>
                  In der Praxis erleben wir oft denselben Widerspruch: Ein einzelner Desktop-Test in PageSpeed zeigt 90 grüne Punkte, doch die Google Search Console meldet hunderte fehlerhafte mobile URLs. Der Grund liegt im Unterschied zwischen Laborsimulation und dem <strong>Chrome User Experience Report (CrUX)</strong>.
                </p>
                <ul style={s.lista}>
                  <li><strong>Echte Smartphones und Mobilfunknetze:</strong> CrUX bündelt die tatsächlichen Lade- und Reaktionszeiten echter Chrome-Nutzer über die vergangenen 28 Tage hinweg - auf Mittelklasse-Android-Geräten und unterwegs im Mobilfunknetz.</li>
                  <li><strong>Harte 75-%-Schwelle:</strong> Eine Kennzahl gilt bei Google erst dann als „Gut“, wenn mindestens 75 % aller realen Seitenaufrufe den Grenzwert einhalten.</li>
                  <li><strong>Keine Kosmetik durch Delay-Skripte:</strong> Plugins, die JavaScript künstlich bis zur ersten Berührung zurückhalten, schönen zwar den Laborwert, verursachen beim ersten Tippen ins Menü aber massive INP-Ausreißer in den Felddaten.</li>
                </ul>
              </Sekcja>

              <Sekcja id="inp-statt-fid-grenzwerte" tytul="INP statt FID: Alle Core-Web-Vitals-Grenzwerte 2026 im Überblick">
                <p style={s.akapit}>
                  Mit der Ablösung von First Input Delay (FID) durch Interaction to Next Paint (INP) im März 2024 wurden träge Haupt-Threads zum häufigsten technischen Problem auf gewachsenen CMS-Websites:
                </p>
                <CompareTable
                  id="tabelle-cwv-grenzwerte"
                  caption="Offizielle Google-Schwellenwerte für Core Web Vitals und TTFB (75. Perzentil, mobil)"
                  columns={[
                    { key: 'metrik', label: 'Kennzahl' },
                    { key: 'gut', label: 'Gut (Grün)' },
                    { key: 'mittel', label: 'Optimierungsbedarf' },
                    { key: 'schlecht', label: 'Schlecht (Rot)' },
                    { key: 'ursache', label: 'Typische Ursache in klassischen CMS' },
                  ]}
                  rows={[
                    { id: 'lcp', metrik: 'LCP (Largest Contentful Paint)', gut: '<= 2,50 s', mittel: '2,51 - 4,00 s', schlecht: '> 4,00 s', ursache: 'Hohes PHP-TTFB, unkomprimierte Hero-Bilder, blockierendes CSS/JS' },
                    { id: 'inp', metrik: 'INP (Interaction to Next Paint)', gut: '<= 200 ms', mittel: '201 - 500 ms', schlecht: '> 500 ms', ursache: 'Großes Page-Builder-DOM, jQuery-Slider, Consent- & Tracking-Skripte' },
                    { id: 'cls', metrik: 'CLS (Cumulative Layout Shift)', gut: '<= 0,10', mittel: '0,11 - 0,25', schlecht: '> 0,25', ursache: 'Bilder ohne feste Breiten-/Höhenangaben, nachladende Webfonts und Banner' },
                    { id: 'ttfb', metrik: 'TTFB (Time to First Byte)', gut: '<= 800 ms', mittel: '801 - 1.800 ms', schlecht: '> 1.800 ms', ursache: 'Fehlender Server-Cache, langsames Shared Hosting, viele Datenbankabfragen' },
                  ]}
                  przypis="Quelle: Google web.dev Core Web Vitals Dokumentation (Stand: November 2026)."
                />
                {cwvRatgeber && (
                  <p style={s.akapit}>
                    Eine vertiefende technische Erklärung aller Messwerte finden Sie in unserem Leitfaden{' '}
                    <Link href={cwvRatgeber} style={s.podkreslenie}>Core Web Vitals: LCP, INP, CLS und Google-Rankings</Link>.
                  </p>
                )}
              </Sekcja>

              <Sekcja id="plugin-ballast-vs-nextjs" tytul="Warum Plugin-Ballast mobile Anfragen kostet - und was Next.js anders macht">
                <p style={s.akapit}>
                  Eine typische Unternehmenswebsite auf WordPress sammelt über wenige Jahre 15 bis 30 aktive Plugins an: Page-Builder, Formulare, Mehrsprachigkeit, Slider, Pop-ups und Sicherheitsmodule. Selbst mit aktiviertem Seiten-Cache muss jedes Smartphone den gesamten CSS- und JavaScript-Überhang dieser Erweiterungen verarbeiten.
                </p>
                <p style={s.akapit}>
                  Im Next.js App Router werden Texte, Vergleichstabellen und Schema-Daten als React Server Components auf dem Server erzeugt, ohne unnötiges JavaScript an das Telefon zu schicken. Lesen Sie unseren detaillierten Vergleich{' '}
                  {nextVergleich ? <Link href={nextVergleich} style={s.podkreslenie}>Next.js vs. WordPress für SEO &amp; KI</Link> : 'Next.js vs. WordPress für SEO & KI'}, vergleichen Sie{' '}
                  {baukastenVergleich ? <Link href={baukastenVergleich} style={s.podkreslenie}>programmierte Website vs. Homepage-Baukasten</Link> : 'programmierte Website vs. Homepage-Baukasten'}, kombinieren Sie schnelle Ladezeiten mit{' '}
                  {b2bSeo ? <Link href={b2bSeo} style={s.podkreslenie}>B2B SEO</Link> : 'B2B SEO'}{' '}
                  und{' '}
                  {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}{' '}
                  und prüfen Sie alle Konditionen unter{' '}
                  {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}.
                </p>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu Core Web Vitals, INP und Next.js"
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

export default CwvVergleichStronaDe;
