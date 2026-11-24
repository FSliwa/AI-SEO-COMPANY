// Deutsche Leistungsseite /de/linkbuilding-agentur (24.11.2026; Schluessel PL: /link-building).
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Liste, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import {
  LB_KURZANTWORT,
  LB_SAEULEN,
  LB_QUALITAET_ZEILEN,
  LB_PAKET_ZEILEN,
  LB_FAQ,
  LB_QUELLEN,
} from '@/lib/de/linkbuildingAgenturDe';

const KLUCZ = '/link-building';

export default function LinkbuildingAgenturDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/linkbuilding-agentur';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'White-Hat Linkbuilding & Digital PR für B2B',
    description: w?.opis ?? LB_KURZANTWORT,
    serviceType: 'White-Hat Linkbuilding & Digital PR SEO',
    url,
    inLanguage: 'de',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' },
      { '@type': 'Country', name: 'Polen' },
    ],
    availableLanguage: ['de', 'en', 'pl'],
    offers: [
      {
        '@type': 'Offer',
        name: 'SEO Standard (inklusive 2 redaktionellen Links pro Monat)',
        priceCurrency: 'EUR',
        price: PREISE.standard,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.standard,
          minPrice: PREISE.standard,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'SEO Premium (inklusive 4 redaktionellen Links pro Monat)',
        priceCurrency: 'EUR',
        price: PREISE.premium,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.premium,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceDe) }} />
      <Seite krumen="Linkbuilding Agentur">
        <Hero
          kicker="White-Hat Linkbuilding · Digital PR SEO"
          h1={w?.h1 ?? 'Linkbuilding Agentur für B2B: Redaktionelle Backlinks ohne Spam-Risiko'}
          lead="Wir verkaufen keine PBN-Pakete, keine Katalogeinträge und keine gemieteten Verweise. Bei uns entstehen Backlinks eingebettet in Ihre monatliche SEO-Betreuung durch linkwürdige Studien, kostenlose Tools und persönlichen Redaktions-Outreach - dauerhaft auf Ihrem Domainkonto."
          cta="Linkbuilding im Paket anfragen"
        />

        <Abschnitt titel="Kurzantwort: Wie arbeitet unsere Linkbuilding Agentur?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{LB_KURZANTWORT}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="leistungen"
          szklo
          titel="Vier Säulen für nachhaltigen Autoritätsaufbau im B2B"
          untertitel="Warum redaktioneller Linkaufbau B2B heute über echte Fachquellen, Partnernetzwerke und überprüfbare Daten läuft."
          items={LB_SAEULEN}
        />

        <CtaZeile text="Linkprofil prüfen & Angebot in 24 Std. erhalten" />

        <Abschnitt titel="White-Hat-Filter: Welche Quellen wir gewinnen und was wir ablehnen" id="qualitaetscheck">
          <Absatz>
            Wer nachhaltig Backlinks aufbauen lassen möchte, muss vor allem wissen, worauf er verzichtet. Googles Spam-Richtlinien stufen den verdeckten Kauf oder Verkauf von Ranking-vererbenden Links, exzessive Linktausch-Schemata sowie automatisiert erzeugte Verweise klar als Link-Spam ein. Bezahlte Werbe- oder Sponsoring-Platzierungen sind ausschließlich mit <code>rel=&quot;sponsored&quot;</code> oder <code>rel=&quot;nofollow&quot;</code> zulässig. Jede potenzielle Quelle durchläuft vor unserer Anfrage diese Qualitätsmatrix:
          </Absatz>
          <Tabelle
            beschriftung="Qualitätskriterien für externe Verweise gemäß Google-Richtlinien"
            spalten={['Prüfkriterium', 'Wonach wir suchen (White Hat)', 'Was wir strikt ablehnen (Spam-Risiko)']}
            zeilen={LB_QUALITAET_ZEILEN}
            fussnote="Grundlage: Google Search Central zu crawlbaren Links, Ankertexten und Link-Spam (Abruf: 24.11.2026)."
          />
          <Unterueberschrift>Vorab-Check Ihrer Domain-Autorität & Methoden-Leitfaden</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            {maWersjeDe('/narzedzia/autorytet-domeny') && (
              <>Wo Ihre Domain aktuell im Web-Graphen von Common Crawl (rund 135 Millionen Domains) im Vergleich zu bis zu drei Wettbewerbern steht, zeigt Ihnen kostenlos unser <Link href="/narzedzia/autorytet-domeny" style={LINK}>Domain Authority Checker</Link>. </>
            )}
            {maWersjeDe('/blog/link-building-b2b-dla-marketerow-strategie-i-checklista') && (
              <>Wenn Sie die einzelnen Methoden intern nachlesen möchten, finden Sie den praxisnahen Ratgeber unter <Link href="/blog/link-building-b2b-dla-marketerow-strategie-i-checklista" style={LINK}>Linkaufbau im B2B: White-Hat-Strategien &amp; Checkliste</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Abschnitt szklo titel="Wie viele Links sind enthalten? Pakete, Preise und Digital PR" id="preise">
          <Absatz>
            Die monatliche Anzahl redaktioneller Verweise ist transparent im jeweiligen Betreuungspaket verankert - ohne versteckte Aufpreise und ohne falsche Platz-1-Versprechen. Da externe Links nur auf technisch sauberen und inhaltlich starken Zielseiten dauerhaft wirken, liefern wir sie gemeinsam mit Audit, Fachinhalten und technischer Pflege aus:
          </Absatz>
          <Tabelle
            beschriftung="Linkbuilding in unseren monatlichen SEO-Paketen und als Digital-PR-Projekt (netto)"
            spalten={['Leistungsmerkmal', 'SEO Standard', 'SEO Premium', 'Digital PR (auf Anfrage)']}
            zeilen={LB_PAKET_ZEILEN}
            fussnote={PREIS_HINWEIS}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            {maWersjeDe('/cennik-pozycjonowania') && (
              <>Den vollständigen Vergleich aller Paketbestandteile inklusive Booster Pack lesen Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>. </>
            )}
            {maWersjeDe('/panel-klienta') && (
              <>Jeden gesetzten Verweis samt wöchentlicher Live-Kontrolle verfolgen Sie transparent im <Link href="/panel-klienta" style={LINK}>24/7-Kundenportal</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="Praxisbeispiel für Digital PR SEO: Zitierfähige Primärdaten statt Pressemappe" id="digital-pr">
          <Absatz>
            Starke Linkable Assets liefern Redaktionen konkrete Zahlen, die sich mit Quellenangabe zitieren lassen. Ein Beispiel aus unserer eigenen Arbeit: Im Oktober 2026 haben wir die öffentlichen Angebotsseiten, Preislisten, AGB und Verzeichnisprofile von 17 in Polen aktiven SEO-Agenturen ausgewertet. Stand 25. Oktober 2026 nannten 12 von 17 Agenturen einen Einstiegspreis oder eine Preisspanne, 11 rechneten ohne Erfolgskomponente ab und lediglich 6 machten eine klare Angabe zur Kündigungsfrist.
          </Absatz>
          <Absatz>
            Wir veröffentlichen dabei weder Agenturnamen noch subjektive Noten - und wir erfinden keine Erfolgszahlen im Voraus: Wie viele organische Verweise eine frische Erhebung gewinnt, messen wir nüchtern über die Zeit anhand neuer verweisender Fachdomains, durchschnittlicher Quellen-Autorität und dem organischen Traffic auf den verlinkten Zielseiten.{' '}
            {maWersjeDe('/raporty-ai') ? (
              <>Weitere offene Datensätze unter CC-BY-4.0-Lizenz bündeln wir in unseren <Link href="/raporty-ai" style={LINK}>offenen KI- und SEO-Studien</Link>.</>
            ) : (
              'Genau solche nachprüfbaren Datensätze unter CC-BY-4.0-Lizenz bilden das Fundament seriöser Digital-PR-Arbeit.'
            )}
          </Absatz>
          <Unterueberschrift>Drei Kennzahlen, an denen wir Linkbuilding messen</Unterueberschrift>
          <Liste
            punkte={[
              'Neue verweisende Domains aus thematisch passenden Fachmedien, Verbänden und Partnerseiten (keine Mehrfachzählung von Unterseiten).',
              'Autoritätsprofil der gewonnenen Quellen (DR sowie Position im offenen Common-Crawl-Graphen) inklusive wöchentlicher Online-Prüfung.',
              'Entwicklung von Impressionen, Klicks und Anfragen exakt auf jenen Leistungsseiten, die durch externe und interne Links gestützt werden.',
            ]}
          />
        </Abschnitt>

        <Faq eintraege={LB_FAQ} titel="Häufige Fragen an unsere Linkbuilding Agentur" id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={LB_QUELLEN} />
        </div>
      </Seite>
    </>
  );
}
