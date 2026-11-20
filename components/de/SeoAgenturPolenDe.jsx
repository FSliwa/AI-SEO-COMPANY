import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Liste, Karten, Preise, CtaZeile, Faq, LINK } from './UslugiBausteine';
import { Link } from '@/i18n/routing';
import { PREISE } from '@/lib/de/uslugiGemeinsam';
import { POLEN_GRUENDE, POLEN_SCHRITTE, POLEN_FAQ, POLEN_QUELLE } from '@/lib/de/seoAgenturPolen';
import { wpisDe, maWersjeDe, urlDe } from '@/lib/stronyDe';

export default function SeoAgenturPolenDe() {
  const w = wpisDe('/seo-agentur-polen');
  const url = urlDe('/seo-agentur-polen');
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'SEO für den polnischen Markt',
    description: 'SEO und Generative Engine Optimization für Unternehmen aus dem DACH-Raum, die in Polen gefunden werden wollen: polnische Keywords, Inhalte, Technik und Reporting.',
    serviceType: 'Search engine optimization',
    url,
    inLanguage: 'de',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: { '@type': 'Country', name: 'Polen' },
    availableLanguage: ['de', 'pl', 'en'],
    offers: {
      '@type': 'Offer',
      name: 'SEO Standard',
      priceCurrency: 'EUR',
      price: PREISE.standard,
      priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: 'EUR', price: PREISE.standard, unitCode: 'MON', valueAddedTaxIncluded: false },
      availability: 'https://schema.org/InStock',
      url,
    },
  };
  return (
    <Seite krumen="SEO Agentur Polen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <Hero
        kicker="SEO Agentur Polen"
        h1={w.h1}
        lead="SEO Polen für Unternehmen aus dem DACH-Raum: Wir sind eine SEO Agentur in Warschau und bringen Ihr Unternehmen im polnischen Markt in Google und in KI-Antworten nach vorn. Polnische Keywords, Inhalte, Technik und Reporting aus einer Hand, mit Monatsvertrag und transparenten Preisen in Euro."
        cta="Anfrage für den Markteintritt senden"
      />
      <Karten titel="Warum SEO für Polen aus Warschau?" untertitel="Der polnische Suchmarkt hat eigene Keywords, eigene Konkurrenten und eine eigene Sprache." items={POLEN_GRUENDE} spalten={260} />

      <Abschnitt titel="Der polnische Suchmarkt in einer Zahl" id="markt">
        <Absatz>Google ist auch in Polen die dominierende Suchmaschine: Nach StatCounter lag der Marktanteil von Google an der Suche in Polen im {POLEN_QUELLE.zeitraum} bei {POLEN_QUELLE.wert} (alle Plattformen zusammen). Wer in Polen gefunden werden will, muss also vor allem in Google sichtbar sein, und zwar mit Inhalten in der Sprache der Suchenden.</Absatz>
        <Absatz style={{ fontSize: '0.92rem', color: 'var(--w-tusz-2)', marginBottom: 0 }}>Quelle: <a href={POLEN_QUELLE.url} style={LINK} rel="noopener noreferrer" target="_blank">{POLEN_QUELLE.text}</a>, Zeitraum {POLEN_QUELLE.zeitraum}, von uns gelesen am {POLEN_QUELLE.gelesen}.</Absatz>
      </Abschnitt>

      <Abschnitt titel="Markteintritt in Polen: Unser Vorgehen" id="vorgehen">
        <Liste nummeriert punkte={POLEN_SCHRITTE.map(([t, x]) => <span key={t}><strong>{t}:</strong> {x}</span>)} />
        <Absatz style={{ marginBottom: 0 }}>Wenn Sie zuerst die technische Lage Ihrer Website klären möchten, beginnen wir mit einem {maWersjeDe('/audyt-seo') ? <Link href="/audyt-seo" style={LINK}>SEO Audit</Link> : 'SEO Audit'}{maWersjeDe('/narzedzia/audyt-seo') && <>; für einen ersten Überblick gibt es das <Link href="/narzedzia/audyt-seo" style={LINK}>kostenlose SEO Audit</Link></>}. Wie Sie als B2B-Unternehmen mit SEO Anfragen gewinnen, beschreiben wir unter {maWersjeDe('/pozycjonowanie-stron-internetowych') ? <Link href="/pozycjonowanie-stron-internetowych" style={LINK}>B2B SEO</Link> : 'B2B SEO'}.</Absatz>
      </Abschnitt>

      <Abschnitt titel="Ihr Ansprechpartner in Warschau" id="team">
        <Absatz>AI SEO COMPANY ist eine Marke der AI SIGNALS COMPANY Prosta Spółka Akcyjna mit Sitz in Warschau. Auf Anfragen antworten wir innerhalb von 24 Stunden an Werktagen, und die Antwort kommt von der Person, die das SEO Ihrer Website betreut. {maWersjeDe('/o-nas') ? <>Mehr über das Team lesen Sie unter <Link href="/o-nas" style={LINK}>Über uns</Link>.</> : null}</Absatz>
        <Unterueberschrift>Preise in Euro</Unterueberschrift>
        <Absatz style={{ marginBottom: 0 }}>Für Polen gelten dieselben Pakete wie für alle Kunden, alle Preise netto in Euro. Die Pakete im Überblick finden Sie direkt unten.</Absatz>
      </Abschnitt>
      <CtaZeile text="Unverbindlich anfragen - Antwort in 24 Stunden" />

      <Preise />
      <Faq eintraege={POLEN_FAQ} titel="Häufige Fragen zu SEO in Polen" />
    </Seite>
  );
}
