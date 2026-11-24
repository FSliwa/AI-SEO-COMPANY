// Deutsche Vergleichsseiten Welle 3 (Gruppe de-porownania, 24.11.2026 - 3 neue Vergleiche):
//   - P7_METRYKI_DE: /porownania/ahrefs-dr-vs-moz-da-vs-common-crawl -> /de/vergleiche/ahrefs-dr-vs-moz-da-vs-common-crawl
//   - P8_PLIKI_DE:   /porownania/llms-txt-vs-robots-txt-vs-sitemap-xml -> /de/vergleiche/llms-txt-vs-robots-txt-vs-sitemap-xml
//   - P9_INHOUSE_DE: /porownania/seo-w-firmie-czy-agencja-seo -> /de/vergleiche/inhouse-seo-oder-agentur
//
// Exakt gleiches Datenformat wie POROWNANIA_DE in lib/porownania.de.js und lib/porownaniaFala2.de.js
// (1:1 kompatibel mit components/de/VergleichDe.jsx und components/de/VergleicheHubDe.jsx).
// Keine langen Gedankenstriche (ausschliesslich ASCII '-'), alle <strong>-Elemente <= 80 Zeichen,
// interne Links ausschliesslich auf veroeffentlichte deutsche Routen ueber wew(klucz, tekst, kotwica).

import { STRONY_DE, hrefDe } from '../stronyDe.js';
import { AUDYT, AUTORYTET, GENERATOR, ROBOTY_AI } from '../narzedziaLiczby.js';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const wew = (klucz, tekst, kotwica = '') => {
  const h = hrefDe(klucz);
  return h ? a(`${h}${kotwica}`, tekst) : tekst;
};
const liczbaDe = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function metaDe(klucz, zapas) {
  return STRONY_DE[klucz] || zapas;
}

// --- 1. P7_METRYKI_DE: Ahrefs DR vs Moz DA vs Common Crawl --------------------------------------

const W7 = metaDe('/porownania/ahrefs-dr-vs-moz-da-vs-common-crawl', {
  tytul: 'Ahrefs DR vs Moz DA vs Common Crawl: Metrik-Vergleich',
  h1: 'Ahrefs DR vs Moz DA vs Common Crawl: Was Domain-Autorität wirklich misst',
  opis: 'Ahrefs Domain Rating, Moz Domain Authority und unser 0-100-Wert aus 135 Mio. Common-Crawl-Domains im Vergleich: Formel, 441-Domain-Korrelation & Kosten.',
});

export const P7_METRYKI_DE = {
  slug: 'ahrefs-dr-vs-moz-da-vs-common-crawl',
  title: W7.tytul,
  description: W7.opis,
  h1: W7.h1,
  okruszek: 'Ahrefs DR vs Moz DA vs Common Crawl',
  nazwaKarty: 'Ahrefs DR vs Moz DA vs Common Crawl',
  kryteria: '8 Kriterien',
  tag: 'Metrik-Vergleich: Domain-Autorität im SEO',
  ujawnienie: 'Wir stellen einen kostenlosen Domain Authority Checker (0-100) auf Basis des öffentlichen Link-Graphen von Common Crawl bereit. Wir stehen in keiner geschäftlichen Verbindung zu Ahrefs, Moz oder Common Crawl, verwenden keine Daten von Ahrefs oder Moz und setzen keine Affiliate-Links ein.',
  zrodlaDanych: `Daten: offizielle Dokumentationen und Preislisten von Ahrefs (DR, Starter 29 USD, Lite ab 129 USD/Monat) und Moz (DA, Moz Pro Starter ab 49 USD/Monat), Common Crawl Web Graph ${AUTORYTET.wydanie} (${liczbaDe(AUTORYTET.domenWGrafie)} Domains, 1,8 Mrd. Kanten, Veröffentlichung 22.10.2026), unsere Korrelationsstudie über N = 441 Domains aus den Moz Top 500 (12.11.2026) sowie Google Search Central.`,
  answer: `Google verwendet weder Ahrefs Domain Rating (DR) noch Moz Domain Authority (DA) in seinen Ranking-Algorithmen - das haben John Mueller und Google Search Central mehrfach offiziell bestätigt. Ahrefs DR (0-100, logarithmisch, Lite ab 129 USD/Monat) misst die relative Stärke des Dofollow-Backlink-Profils im kommerziellen Ahrefs-Index, Moz DA (1-100, Moz Pro Starter ab 49 USD/Monat) ist ein Machine-Learning-Prognosemodell für SERP-Chancen, und unser offener Wert (0-100) berechnet die Position im öffentlichen Common-Crawl-Graphen (${liczbaDe(AUTORYTET.domenWGrafie)} Domains) nach der Formel <code>min(Harmonic Centrality, PageRank)</code> zu 100 % kostenlos im ${wew('/narzedzia/autorytet-domeny', 'Domain Authority Checker')}.`,
  published: '2026-11-24',
  updated: '2026-11-24',
  tableId: 'tabelle-dr-da-cc',
  tableCaption: 'Ahrefs Domain Rating (DR), Moz Domain Authority (DA) und unser Common-Crawl-Wert (cc-hcpr-v1) im Vergleich: 8 Kriterien (Stand: 24.11.2026)',
  tablePrzypis: `Quellen: Ahrefs Help („What is Domain Rating“) & ahrefs.com/pricing, Moz („What is Domain Authority“) & moz.com/products/pro/pricing, Common Crawl Web Graphs (${AUTORYTET.wydanie}, Abruf 12.11.2026) sowie unsere eigene Kalibrierung über N = 441 Domains. Alle Marken gehören ihren jeweiligen Inhabern.`,
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'dr', label: 'Ahrefs Domain Rating (DR)' },
    { key: 'da', label: 'Moz Domain Authority (DA)' },
    { key: 'cc', label: 'Unser Common-Crawl-Wert (cc-hcpr-v1)' },
  ],
  rows: [
    {
      id: 'uzywa-google',
      kryterium: 'Nutzt Google diese Kennzahl im Ranking-Algorithmus?',
      dr: 'Nein - reine Drittanbieter-Metrik von Ahrefs; Google nutzt laut John Mueller und Search Central keinen DR-Wert',
      da: 'Nein - reine Drittanbieter-Metrik von Moz; kein Bestandteil der Google-Ranking-Systeme',
      cc: 'Nein - externe Netzwerkberechnung aus dem offenen Web-Graphen; Diagnosewert, kein Google-Faktor',
    },
    {
      id: 'co-mierzy',
      kryterium: 'Was misst die Skala 0-100 konkret?',
      dr: 'Logarithmische Stärke des Dofollow-Backlink-Profils (Anzahl verweisender Domains gewichtet nach deren eigenem DR und ausgehenden Links)',
      da: 'Machine-Learning-Prognosemodell (Skala 1-100), wie wahrscheinlich eine Domain in den Suchergebnissen vor Wettbewerbern rankt',
      cc: 'Verankerung im globalen Linknetz: das schwächere Perzentil aus Harmonic Centrality und PageRank, logarithmisch auf 0-100 normiert',
    },
    {
      id: 'baza',
      kryterium: 'Zugrundeliegende Link-Datenquelle',
      dr: 'Eigener kommerzieller Web-Crawler (AhrefsBot) mit kontinuierlich aktualisiertem Cloud-Index',
      da: 'Eigener kommerzieller Link-Index von Moz (DotBot / Moz Link Explorer)',
      cc: `Öffentlicher Domain-Linkgraph der gemeinnützigen Stiftung Common Crawl (${AUTORYTET.wydanie}: ${liczbaDe(AUTORYTET.domenWGrafie)} Domains, 1,8 Mrd. Kanten)`,
    },
    {
      id: 'wzor',
      kryterium: 'Transparenz der Berechnungsformel',
      dr: 'Grundprinzip öffentlich beschrieben (iterative Linkkraft-Teilung), exakte Normierung und Spam-Gewichte proprietär',
      da: 'Geschlossenes Machine-Learning-Modell aus Linking Root Domains, Linkanzahl und weiteren Signalen',
      cc: `100 % offene Formel ${AUTORYTET.wzor}: r = max(Rang HC, Rang PR), Wert = round(100 * (1 - (log10 r / log10 r0)^3)) mit r0 = ${liczbaDe(AUTORYTET.r0)}`,
    },
    {
      id: 'odswiezanie',
      kryterium: 'Aktualisierungsrhythmus',
      dr: 'Laufend im kommerziellen Ahrefs-Index',
      da: 'Laufend mit den Index-Updates von Moz',
      cc: 'Quartalsweise mit jedem neuen 3-Monats-Webgraph von Common Crawl (aktuelles Release: August bis Oktober 2026)',
    },
    {
      id: 'poziom-url',
      kryterium: 'Einzelne Backlink-URLs, Ankertexte und Nofollow-Attribute',
      dr: 'Ja, in den Bezahltarifen (sowie für verifizierte eigene Domains kostenfrei in den Ahrefs Webmaster Tools)',
      da: 'Ja, im Moz Link Explorer (begrenztes Freikontingent mit Moz-Konto, voller Zugriff in Moz Pro)',
      cc: `Nein - reiner Domain-Level-Graph ohne Einzel-URLs oder HTML-Attribute (für .pl-Domains zusätzlich Zahl verweisender Domains unter ${liczbaDe(AUTORYTET.domenPl)} Domains)`,
    },
    {
      id: 'odpornosc',
      kryterium: 'Widerstandsfähigkeit gegen künstliche Linkfarmen',
      dr: 'Eigene Spam-Filter, in der Praxis jedoch oft Ziel billiger mehrstufiger Redirect- und Verzeichnis-Manipulationen',
      da: 'Machine-Learning-Dämpfung plus separater Moz Spam Score zur Erkennung auffälliger Muster',
      cc: 'Mathematische Deckelung über min(Harmonic Centrality, PageRank): geschlossene Linkringe heben PageRank, verkürzen aber nicht die globalen Pfadlängen',
    },
    {
      id: 'koszt',
      kryterium: 'Preise & Kosten für den Vergleich mit 3 Wettbewerbern',
      dr: 'Einzelabfrage im Website Authority Checker frei; laufende Konkurrenzanalysen ab Lite 129 USD/Monat (Starter 29 USD mit engem Credit-Limit, Standard 249 USD/Monat)',
      da: 'Wenige Gratis-Abfragen nach Konto-Registrierung; Moz Pro Starter 49 USD/Monat (39 USD/Monat jährlich), Standard 99 USD/Monat, Medium 179 USD/Monat',
      cc: `100 % kostenlos (0 €), ohne Konto und ohne E-Mail für Ihre Domain plus bis zu ${AUTORYTET.konkurentow} Wettbewerber (bis zu ${AUTORYTET.limitIp} Domains/Tag pro IP)`,
    },
  ],
  sections: [
    {
      id: 'direktvergleich',
      h2: 'Ahrefs DR, Moz DA und Common Crawl: 8 Kriterien im direkten Vergleich',
      html: [
        '<p>Transparenz- und Markenhinweis: Wir entwickeln und betreiben einen kostenlosen Autoritätsprüfer auf Basis des öffentlichen Web-Graphen von Common Crawl. Wir sind weder mit Ahrefs noch mit Moz oder Common Crawl verbunden, nutzen keinerlei Daten von Ahrefs oder Moz und setzen keine Affiliate-Links ein. Alle Tarifangaben wurden am 24.11.2026 geprüft.</p>',
        '<p>Im B2B-Einkauf von SEO- und PR-Leistungen wird häufig über „die Domain Authority“ gesprochen, als gäbe es ein amtliches Thermometer von Google. Tatsächlich crawlt jeder Anbieter einen anderen Ausschnitt des Webs und wendet ein völlig anderes mathematisches Modell auf einer logarithmischen Skala von 0 bis 100 an. Die Tabelle zeigt die strukturellen Unterschiede.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'korrelationsstudie-441-domains',
      h2: 'Empirischer Benchmark über N = 441 Domains und Abweichungen auf kleinen Websites',
      html: [
        `<p>Um messbar zu zeigen, warum sich Werte verschiedener Anbieter niemals eins zu eins umrechnen lassen, haben wir am 12. November 2026 unseren Wert aus dem Common-Crawl-Release <code>${AUTORYTET.wydanie}</code> (${liczbaDe(AUTORYTET.domenWGrafie)} Domains, ${liczbaDe(AUTORYTET.r0)} Domains mit mindestens einem eingehenden Link, 1,8 Milliarden Kanten) mit der öffentlichen Liste <strong>Moz Top 500</strong> abgeglichen. Für <strong>N = 441 eindeutig zugeordnete Root-Domains</strong> ergab die Rangkorrelation nach Spearman ein klares Bild:</p>`,
      ].join(''),
      tabela: {
        id: 'tabelle-korrelation-441-domains',
        caption: 'Spearman-Rangkorrelation auf N = 441 Domains aus den Moz Top 500 (Messung vom 12.11.2026, Release cc-main-2026-aug-sep-oct)',
        columns: [
          { key: 'paar', label: 'Verglichenes Metrik-Paar' },
          { key: 'rho', label: 'Spearman-Korrelation (rho)' },
          { key: 'bedeutung', label: 'Methodische Einordnung' },
        ],
        rows: [
          {
            id: 'hcpr-lrd',
            paar: 'Unser Wert min(Harmonic Centrality, PageRank) vs. Moz Linking Root Domains',
            rho: '0,57',
            bedeutung: 'Spürbarer Zusammenhang mit der reinen Breite verweisender Domains, gedämpft durch die Zentralitätsbedingung',
          },
          {
            id: 'hcpr-da',
            paar: 'Unser Wert min(Harmonic Centrality, PageRank) vs. Moz Domain Authority (DA)',
            rho: '0,37',
            bedeutung: 'Mäßige Übereinstimmung, da Moz DA als ML-Modell SERP-Rankings prognostiziert statt reine Graph-Zentralität zu messen',
          },
          {
            id: 'pr-da',
            paar: 'Reiner Common-Crawl-PageRank allein vs. Moz Domain Authority (DA)',
            rho: '0,72',
            bedeutung: 'Deutlich höhere Nähe zu DA, aber bewusst verworfen: isolierter PageRank gab kleinen Domains mit Spam-Links überhöhte Werte',
          },
        ],
        przypis: 'Quellen: eigene Auswertung auf Basis von Moz Top 500 (moz.com/top500) und Common Crawl Domain-Level Web Graph cc-main-2026-aug-sep-oct (22.10.2026), berechnet am 12.11.2026.',
        minWidth: 580,
      },
      htmlPo: [
        '<p>Noch deutlicher wird der Unterschied bei kleinen und mittleren Unternehmensseiten. Am 11. November 2026 haben wir <strong>vier uns bekannte Dienstleistungs-Domains</strong> (darunter unsere eigene Domain) gegenübergestellt: In unserem Common-Crawl-Graphen erreichten alle vier exakt <strong>9 Punkte</strong>. Im kostenlosen Checker von Ahrefs lagen dieselben vier Domains am selben Tag zwischen <strong>DR 0 und DR 54</strong> - zwei davon verdankten ihren hohen DR künstlichen Spam-Verweisen, die in unserer Formel <code>min(Harmonic Centrality, PageRank)</code> nach den Zentralitäts-Axiomen von Boldi und Vigna keinen Durchmarsch erlauben.</p>',
        `<p>Prüfen Sie Ihre eigene Website und bis zu drei direkte Google-Wettbewerber nach exakt derselben Methode in unserem kostenlosen ${wew('/narzedzia/autorytet-domeny', 'Domain Authority Checker')} (ohne Konto und ohne E-Mail).</p>`,
      ].join(''),
    },
    {
      id: 'google-aussage-und-praxiseinsatz',
      h2: 'Was Google offiziell zu DR und DA sagt - und wann welches Werkzeug im B2B sinnvoll ist',
      html: [
        '<p>Vertreter von Google - insbesondere <strong>John Mueller</strong> sowie die offizielle Dokumentation in <strong>Google Search Central</strong> - haben wiederholt klargestellt, dass Google <strong>weder Moz Domain Authority noch Ahrefs Domain Rating</strong> berechnet oder in seinen Ranking-Systemen verwendet. Google bewertet Relevanz, Qualität und Linksignale überwiegend auf Ebene einzelner URLs und konkreter Suchanfragen. Wer auf Marktplätzen pauschal „Gastbeiträge ab DR 50“ einkauft, zahlt häufig für künstlich aufgeblähte Linkfarmen ohne echten Suchverkehr und riskiert bei fehlendem <code>rel="sponsored"</code>-Attribut manuelle oder algorithmische Abstufungen wegen Link-Spams.</p>',
        '<ul>',
        `<li><strong>Schneller Null-Euro-Benchmark vor dem Strategiegespräch:</strong> Vergleichen Sie Ihre Domain und die drei stärksten organischen Wettbewerber immer innerhalb <em>eines einzigen</em> Werkzeugs (z. B. im ${wew('/narzedzia/autorytet-domeny', 'kostenlosen Domain Authority Checker')}). Entscheidend ist Ihr Punkteabstand zu den realen Top-10-Nachbarn Ihrer Branche, nicht die absolute Zahl.</li>`,
        `<li><strong>Tiefer Einzel-Link-Audit (Ankertexte, verlorene Links, 301-Ketten):</strong> Kombinieren Sie für Ihre eigene Website den kostenlosen Bericht „Links“ in der Google Search Console mit einem Seiten-Index wie Ahrefs Lite (ab 129 USD/Monat), Moz Pro (Starter ab 49 USD/Monat) oder Sistrix - den DACH-Systemvergleich lesen Sie unter ${wew('/porownania/sistrix-vs-ahrefs-vs-seobility', 'Sistrix vs Ahrefs vs Seobility')} sowie ${wew('/porownania/ahrefs-vs-semrush-narzedzia-seo', 'Ahrefs vs Semrush vs kostenlose SEO-Tools')}.</li>`,
        `<li><strong>Qualitätsprüfung beim B2B-Linkaufbau:</strong> Prüfen Sie vor jeder Fachpublikation, ob das Medium mit eigenen Artikeln in Google für relevante Branchenbegriffe rankt. Unsere Kriterien für nachhaltige PR- und Fachverweise zeigen wir auf der Leistungsseite ${wew('/link-building', 'Linkbuilding Agentur B2B')} sowie im Leitfaden ${wew('/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', 'Linkaufbau im B2B: White-Hat-Strategien')}.</li>`,
        '</ul>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Ahrefs DR, Moz DA und Common Crawl',
  faq: [
    {
      question: 'Steigen meine Google-Rankings automatisch, wenn ich meinen Ahrefs DR oder Moz DA erhöhe?',
      answer: 'Nein. Laut John Mueller und Google Search Central nutzt Google weder DR noch DA als Rankingfaktor. Wer den DR-Wert durch billige Verzeichnis- oder Redirect-Links künstlich in die Höhe treibt, gewinnt in der Google Search Console meist keinen einzigen zusätzlichen Klick und verstößt im schlimmsten Fall gegen Googles Spam-Richtlinien für Links.',
    },
    {
      question: 'Warum zeigt Ahrefs für meine Website DR 25, unser Common-Crawl-Checker aber 9 Punkte?',
      answer: `Beide Kennzahlen ruhen auf unterschiedlichen Crawlern und Formeln. Der Quartals-Graph von Common Crawl umfasst ${liczbaDe(AUTORYTET.domenWGrafie)} Domains aus einem öffentlichen Crawl-Schnitt, während AhrefsBot kommerziell auf engmaschige Backlink-Entdeckung ausgelegt ist. Zudem nimmt unsere Formel cc-hcpr-v1 bewusst das schwächere Signal aus Harmonic Centrality und PageRank. Vergleichen Sie Ihre Website daher immer innerhalb desselben Tools mit Ihren direkten Mitbewerbern.`,
    },
    {
      question: 'Wo sehe ich die Backlinks, die Google für meine eigene Website tatsächlich kennt?',
      answer: 'Für Ihre eigene, bestätigte Property ist der kostenlose Bericht „Links“ in der Google Search Console die einzige Quelle aus erster Hand. Er zeigt die am häufigsten verlinkten Zielseiten, die wichtigsten verweisenden Domains und die häufigsten Ankertexte - ganz ohne künstliche 0-bis-100-Gesamtnote.',
    },
    {
      question: 'Wie unterscheiden sich die Werte für .de-, .at- und .ch-Domains im Common-Crawl-Checker von .pl-Domains?',
      answer: `Der Autoritätswert von 0 bis 100 und die globale Graph-Position unter ${liczbaDe(AUTORYTET.domenWGrafie)} Domains funktionieren für .de-, .at-, .ch- und .com-Domains kostenlos. Bei Domains außerhalb der Endung .pl halten wir im Schnellindex die ersten ${liczbaDe(AUTORYTET.limitInnych)} Ränge der Harmonic Centrality vor (außerhalb dieses Bereichs beträgt der Wert höchstens ${AUTORYTET.maksPozaZbiorem} Punkte); Detailzahlen zu verweisenden Domains weisen wir derzeit nur für .pl-Domains aus.`,
    },
    {
      question: 'Sinkt mein Common-Crawl-Autoritätswert, wenn ich CCBot in meiner eigenen robots.txt sperre?',
      answer: 'Nein. Ihre Position im Domain-Graphen berechnet sich aus Links, die auf fremden Websites stehen und auf Ihre Domain verweisen. Eine Sperre von CCBot in Ihrer eigenen robots.txt löscht keine eingehenden Empfehlungen anderer Domains.',
    },
  ],
  sources: [
    { url: 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr', nazwa: 'Ahrefs Help Center: What is Domain Rating (DR)? (Berechnungslogik der 0-100-Skala), abgerufen am 24.11.2026' },
    { url: 'https://ahrefs.com/pricing', nazwa: 'Ahrefs Pricing: offizielle Übersicht der Tarife Starter (29 USD), Lite (129 USD) und Standard (249 USD/Monat), abgerufen am 24.11.2026' },
    { url: 'https://moz.com/learn/seo/domain-authority', nazwa: 'Moz Learning Center: What is Domain Authority (DA)? (Machine-Learning-Modell 1-100), abgerufen am 24.11.2026' },
    { url: 'https://moz.com/products/pro/pricing', nazwa: 'Moz Pro Pricing: offizielle Tarife Starter (49 USD), Standard (99 USD) und Medium (179 USD/Monat), abgerufen am 24.11.2026' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: `Common Crawl: Host- and Domain-Level Web Graphs (${AUTORYTET.wydanie}, ${liczbaDe(AUTORYTET.domenWGrafie)} Domains), abgerufen am 12.11.2026` },
    { url: 'https://arxiv.org/abs/1308.2140', nazwa: 'Paolo Boldi & Sebastiano Vigna: Axioms for Centrality (Internet Mathematics, 2014 - mathematische Grundlage der Harmonic Centrality), abgerufen am 12.11.2026' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de', nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (Link-Spam und Kennzeichnung bezahlter Links mit rel="sponsored"), abgerufen am 24.11.2026' },
  ],
  cta: {
    tekst: 'Wollen Sie Linkprofil, Technik und Abstand zu Ihren Top-10-Wettbewerbern fundiert prüfen lassen?',
    plan: 'audyt',
    linki: [
      { tekst: 'Domain Authority Checker kostenlos starten (0-100)', href: '/narzedzia/autorytet-domeny' },
      { tekst: 'Leistungsumfang unseres SEO Audits (ab 350 € netto)', href: '/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Domain-Autorität im SEO' },
    { '@type': 'Thing', name: 'Ahrefs Domain Rating' },
    { '@type': 'Thing', name: 'Moz Domain Authority' },
    { '@type': 'Thing', name: 'Common Crawl Web Graph' },
  ],
};

// --- 2. P8_PLIKI_DE: llms.txt vs robots.txt vs sitemap.xml --------------------------------------

const W8 = metaDe('/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml', {
  tytul: 'llms.txt vs robots.txt vs sitemap.xml: Rollen & KI-Bots',
  h1: 'llms.txt vs robots.txt vs sitemap.xml: Welche Datei steuert Google und KI-Bots?',
  opis: 'Unterschied zwischen llms.txt, robots.txt und sitemap.xml erklärt: Was KI-Crawler blockiert, was die Indexierung beschleunigt und unser 17-Bot-Praxistest.',
});

export const P8_PLIKI_DE = {
  slug: 'llms-txt-vs-robots-txt-vs-sitemap-xml',
  title: W8.tytul,
  description: W8.opis,
  h1: W8.h1,
  okruszek: 'llms.txt vs robots.txt vs sitemap.xml',
  nazwaKarty: 'llms.txt vs robots.txt vs sitemap.xml',
  kryteria: '8 Kriterien',
  tag: 'Technischer Datei-Vergleich für SEO & GEO',
  ujawnienie: 'Wir bieten kostenlose Online-Prüfer für llms.txt, robots.txt und IndexNow an. Gerade deshalb benennen wir die technischen Fakten ohne Hype: Eine /llms.txt verbessert für sich genommen keine Google-Positionen, sperrt keine Crawler und ersetzt niemals eine saubere robots.txt oder sitemap.xml.',
  zrodlaDanych: 'Daten: IETF RFC 9309 (robots.txt), sitemaps.org, llmstxt.org (Vorschlag von Jeremy Howard, Spezifikation v2), Google Search Central, OpenAI Crawler Docs, IndexNow.org, Ahrefs-Untersuchung über 137.000 Domains sowie unser Live-HTTP-Test mit 119 Anfragen über 17 User-Agents (05.11.2026).',
  answer: 'Die drei Dateien lösen völlig unterschiedliche technische Aufgaben und ersetzen einander nicht: Die <code>robots.txt</code> (RFC 9309) steuert verbindlich den Crawler-Zugriff und trennt KI-Training (<code>GPTBot</code>, <code>Google-Extended</code>) von KI-Suchzitaten (<code>OAI-SearchBot</code>, <code>PerplexityBot</code>). Die <code>sitemap.xml</code> (sitemaps.org) liefert kanonische URLs samt echtem <code>lastmod</code>-Datum an Google und - ergänzt um IndexNow - an Bing und ChatGPT Search. Die <code>/llms.txt</code> (Vorschlag von Jeremy Howard auf <code>llmstxt.org</code>) ist eine optionale, kuratierte Markdown-Landkarte für LLM-Kontextfenster zur Abrufzeit, die Google offiziell nicht für die Suche nutzt.',
  published: '2026-11-24',
  updated: '2026-11-24',
  tableId: 'tabelle-llms-robots-sitemap',
  tableCaption: 'robots.txt, sitemap.xml und llms.txt im technischen Vergleich: 8 Kriterien (Stand: November 2026)',
  tablePrzypis: 'Quellen: IETF RFC 9309, sitemaps.org, Google Search Central (robots.txt, Sitemaps, KI-Funktionen), OpenAI Platform Docs, IndexNow.org, llmstxt.org (v2) sowie Ahrefs-Analyse über 137.000 Domains (Abruf 05.11.2026).',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'robots', label: 'robots.txt' },
    { key: 'sitemap', label: 'sitemap.xml' },
    { key: 'llms', label: 'llms.txt' },
  ],
  rows: [
    {
      id: 'rola',
      kryterium: 'Primäre technische Funktion',
      robots: 'Erlaubt oder verbietet Such- und KI-Crawlern das Abrufen bestimmter Pfade und Verzeichnisse',
      sitemap: 'Meldet kanonische, indexierbare URLs und reale Änderungszeitstempel (lastmod) strukturiert an Suchmaschinen',
      llms: 'Kuratierte Markdown-Übersicht der wichtigsten Unterseiten mit Kurzbeschreibung für LLM-Kontextfenster und KI-Agenten zur Inferenzzeit',
    },
    {
      id: 'format',
      kryterium: 'Format, Spezifikation und Speicherort',
      robots: 'Reiner Text nach IETF RFC 9309, zwingend im Stammverzeichnis unter /robots.txt',
      sitemap: 'XML nach sitemaps.org-Protokoll (z. B. /sitemap.xml oder Sitemap-Index), eingereicht in GSC und Bing Webmaster Tools',
      llms: 'Markdown nach dem Vorschlag von Jeremy Howard (llmstxt.org v2, September 2024), unter /llms.txt oder z. B. /docs/llms.txt',
    },
    {
      id: 'google',
      kryterium: 'Wird die Datei von der Google-Suche ausgewertet?',
      robots: 'Ja - Fundament der Crawl-Steuerung für Googlebot (Websuche & AI Overviews) sowie Google-Extended (Gemini-Training)',
      sitemap: 'Ja - wichtigste Quelle zur URL-Entdeckung und für verlässliche Aktualisierungssignale (lastmod)',
      llms: 'Nein - Google Search Central und John Mueller bestätigen, dass die Google-Suche llms.txt nicht nutzt',
    },
    {
      id: 'boty-ai',
      kryterium: 'Wirkung auf ChatGPT, Perplexity & Claude',
      robots: 'Entscheidend: Wer OAI-SearchBot oder PerplexityBot blockiert, schließt seine Domain aus den KI-Suchantworten aus',
      sitemap: 'Indirekt sehr stark: speist die Suchindizes von Google und Microsoft Bing (samt IndexNow für schnelle Aufnahme in ChatGPT Search)',
      llms: 'Nützlich für Entwickler-Dokumentationen und KI-Agenten beim Live-Abruf; kein bestätigter Ranking-Bonus in der ChatGPT-Suche',
    },
    {
      id: 'blokowanie',
      kryterium: 'Kann die Datei Bots aussperren oder Seiten deindexieren?',
      robots: 'Blockiert das Crawling durch standardkonforme Bots (zum sicheren Entfernen aus dem Google-Index dient meta robots noindex)',
      sitemap: 'Blockiert keinerlei Zugriffe',
      llms: 'Hat keinerlei Sperr-, Schutz- oder Deindexierungswirkung',
    },
    {
      id: 'adopcja',
      kryterium: 'Standardisierungsgrad & Verbreitung',
      robots: 'Web-Standard seit 1994, offiziell spezifiziert als IETF RFC 9309 (2022)',
      sitemap: 'Suchmaschinen-Standard seit 2005, getragen von Google, Microsoft Bing und weiteren Anbietern',
      llms: 'Offener Community-Vorschlag: auf rund 28 % von 137.000 untersuchten größeren Domains veröffentlicht (Ahrefs-Auswertung)',
    },
    {
      id: 'ryzyko',
      kryterium: 'Folgenschwerster Umsetzungsfehler',
      robots: 'Versehentliches Disallow: /, Sperre von OAI-SearchBot trotz GEO-Ziel oder unbemerkte 403-WAF-Blockaden am Server',
      sitemap: 'Einträge mit Statuscode 404, 301-Weiterleitungen, noindex-Tag oder pauschal bei jedem Build künstlich erneuertes lastmod',
      llms: 'Annahme, eine /llms.txt gleiche blockierte KI-Crawler, leeres Client-JS-HTML oder eine fehlerhafte Sitemap aus',
    },
    {
      id: 'priorytet',
      kryterium: 'Empfohlene Reihenfolge für Unternehmenswebsites',
      robots: '1. Pflicht ab dem ersten Tag inklusive Live-Prüfung der HTTP-Antwortcodes für Googlebot und KI-Suchbots',
      sitemap: '2. Pflicht ab dem ersten Tag inklusive Anmeldung in Google Search Console, Bing Webmaster Tools und IndexNow',
      llms: '3. Sinnvolle, aufwandsarme Ergänzung in wenigen Minuten, nachdem Schritt 1 und 2 sauber stehen',
    },
  ],
  sections: [
    {
      id: 'direktvergleich',
      h2: 'robots.txt, sitemap.xml und llms.txt: Alle 8 Unterschiede ohne Mythen',
      html: [
        '<p>Transparenzhinweis: Wir betreiben selbst einen kostenlosen Generator für <code>/llms.txt</code>. Trotzdem - oder gerade deshalb - ordnen wir die Datei nüchtern ein: In Blogbeiträgen wird <code>llms.txt</code> oft fälschlich als „neue robots.txt für künstliche Intelligenz“ bezeichnet. Ein Blick in RFC 9309, das Sitemaps-Protokoll und Jeremy Howards Spezifikation auf <code>llmstxt.org</code> zeigt jedoch drei strikt getrennte Werkzeuge.</p>',
        '<p>Während <code>robots.txt</code> den Zutritt von Crawlern regelt und <code>sitemap.xml</code> sämtliche indexierbaren URLs maschinenlesbar auflistet, entstand <code>/llms.txt</code> im September 2024 aus einem praktischen Engpass großer Sprachmodelle: Kontextfenster sind begrenzt, und komplexe HTML-Navigationen voller Skripte erschweren KI-Assistenten zur Antwortzeit (Inference Time) den schnellen Überblick über die Kernseiten einer Domain.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'live-test-17-bots-und-waf',
      h2: 'Ergebnisse unseres HTTP-Tests mit 17 User-Agents (05.11.2026) und die 403-WAF-Falle',
      html: [
        `<p>Bei der Entwicklung unserer Bot-Diagnose haben wir am 5. November 2026 insgesamt <strong>7 Produktiv-URLs und Websites live getestet</strong> und jeweils Anfragen mit <strong>17 verschiedenen User-Agent-Kennungen</strong> gesendet (<strong>119 HTTP-Anfragen</strong> insgesamt, darunter <code>OAI-SearchBot</code>, <code>GPTBot</code>, <code>ChatGPT-User</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code>, <code>Google-Extended</code> und <code>Bingbot</code>; auf unserer eigenen Referenzdomain beantwortete der Server alle 119 Abrufe mit HTTP <code>200</code> bei einer <code>/llms.txt</code> von 14.437 Bytes). Zwei Befunde aus der Praxis sind für B2B-Websites wichtiger als jede Formatdiskussion:</p>`,
        '<ul>',
        `<li><strong>403-WAF-Sperren trotz offener <code>robots.txt</code>:</strong> Zahlreiche Sicherheitsprofile lassen reguläre Browser und den Googlebot passieren, liefern für <code>OAI-SearchBot</code> oder <code>PerplexityBot</code> jedoch <code>HTTP 403 Forbidden</code> oder eine JavaScript-Challenge aus. Wer nur die Textdatei <code>/robots.txt</code> im Browser liest, übersieht diese Sperre komplett. Unser Prüfer ${wew('/narzedzia/tester-robotow-ai-robots-txt', 'KI-Crawler & robots.txt prüfen')} testet deshalb parallel ${ROBOTY_AI.botow} KI-Bots auf reale Server-Antworten.</li>`,
        '<li><strong>Training vs. KI-Suche trennt nur die <code>robots.txt</code>:</strong> Sie können das Abgreifen Ihrer Fachtexte für künftiges Modelltraining untersagen, ohne Ihre Sichtbarkeit in KI-Antworten zu verlieren - allerdings nur über präzise Bot-Token in <code>/robots.txt</code>, niemals über <code>/llms.txt</code>:</li>',
        '</ul>',
      ].join(''),
      tabela: {
        id: 'tabelle-ki-bot-steuerung-robots',
        caption: 'Trennung zwischen KI-Suche (Zitate) und Modelltraining in der /robots.txt (Stand: November 2026)',
        columns: [
          { key: 'oekosystem', label: 'KI-Ökosystem' },
          { key: 'suche', label: 'Crawler für Suche & Live-Zitate (Allow empfohlen)' },
          { key: 'training', label: 'Crawler für Modelltraining (separat per Disallow steuerbar)' },
        ],
        rows: [
          {
            id: 'openai',
            oekosystem: 'OpenAI / ChatGPT Search',
            suche: 'OAI-SearchBot (Suchindex) und ChatGPT-User (Live-Abruf durch Nutzerfragen)',
            training: 'GPTBot (sammelt Trainingsdaten für künftige Sprachmodelle)',
          },
          {
            id: 'google',
            oekosystem: 'Google Suche, AI Overviews & Gemini',
            suche: 'Googlebot (steuert klassische Suche sowie Google AI Overviews und AI Mode)',
            training: 'Google-Extended (steuert Gemini-Training unabhängig vom Google-Suchindex)',
          },
          {
            id: 'perplexity',
            oekosystem: 'Perplexity',
            suche: 'PerplexityBot und Perplexity-User für Quellen-Antworten',
            training: 'Steuerung über PerplexityBot-Regeln in robots.txt und Firewall-Freigabe',
          },
        ],
        przypis: 'Quellen: offizielle Crawler-Dokumentationen von OpenAI (platform.openai.com/docs/bots), Google Search Central und Perplexity (Stand November 2026).',
        minWidth: 560,
      },
      htmlPo: `<p>Wie sich die zugrundeliegenden Suchindizes bei der Quellenauswahl unterscheiden, vertiefen wir im Vergleich ${wew('/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews', 'ChatGPT Search vs Perplexity vs Google AI Overviews')}.</p>`,
    },
    {
      id: 'drei-schritte-setup-b2b',
      h2: 'Empfohlenes Setup für B2B-Unternehmen in 3 Schritten (inklusive IndexNow)',
      html: [
        '<ol>',
        `<li><strong><code>/robots.txt</code> und Firewall-Statuscodes bereinigen:</strong> Halten Sie Leistungsseiten, Ratgeber, Bilder sowie CSS/JS offen für <code>Googlebot</code>, <code>Bingbot</code>, <code>OAI-SearchBot</code> und <code>PerplexityBot</code>, hinterlegen Sie unten die Zeile <code>Sitemap: https://ihredomain.de/sitemap.xml</code> und prüfen Sie reale 403-Sperren im Tool ${wew('/narzedzia/tester-robotow-ai-robots-txt', 'KI-Crawler & robots.txt prüfen')}.</li>`,
        `<li><strong><code>/sitemap.xml</code>, <code>lastmod</code> und IndexNow koppeln:</strong> Nehmen Sie ausschließlich kanonische URLs mit Statuscode <code>200</code> ohne <code>noindex</code> in die XML-Sitemap auf und aktualisieren Sie <code>&lt;lastmod&gt;</code> nur bei tatsächlichen Inhaltsänderungen (Google und Bing ignorieren sonst manipulierte Zeitstempel). Reichen Sie die Sitemap in Google Search Console und Bing Webmaster Tools ein und richten Sie über unseren ${wew('/narzedzia/generator-indexnow-test-bing-chatgpt', 'IndexNow Generator & Bing-ChatGPT-Test')} automatische Änderungs-Pings für Bing und ChatGPT Search ein.</li>`,
        `<li><strong>Schlanke <code>/llms.txt</code> als Markdown-Kompass ergänzen:</strong> Erzeugen Sie aus Ihrer Sitemap in unter ${GENERATOR.sekund} Sekunden einen sauberen Entwurf mit unserem kostenlosen ${wew('/narzedzia/generator-llms-txt', 'llms.txt Generator')} (inklusive Test für ${GENERATOR.botowAi} KI-Bots und Bingbot), ordnen Sie Kernleistungen nach oben und verschieben Sie Impressum, AGB und Datenschutz in den Spezifikations-Abschnitt <code>Optional</code>. Fehlerhafte Weiterleitungen oder 404-Leichen in der Sitemap deckt parallel unser ${wew('/narzedzia/audyt-seo', 'kostenloser SEO Audit')} (${AUDYT.regul} Regeln) auf.</li>`,
        '</ol>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu llms.txt, robots.txt und sitemap.xml',
  faq: [
    {
      question: 'Kann ich auf meiner Website llms.txt anstelle einer sitemap.xml verwenden?',
      answer: 'Nein. Google und Microsoft Bing nutzen ausschließlich XML-Sitemaps (und Sitemap-Indizes), um alle indexierbaren URLs samt echtem Änderungsdatum systematisch zu erfassen. Wer sitemap.xml durch llms.txt ersetzt, verschlechtert die Indexierung in Google und Bing - und damit indirekt auch die Datenbasis von Google AI Overviews und ChatGPT Search.',
    },
    {
      question: 'Was passiert, wenn ein Pfad in der robots.txt gesperrt, aber in der llms.txt verlinkt ist?',
      answer: 'Standardkonforme Crawler wie OAI-SearchBot, PerplexityBot oder Googlebot befolgen das Verbot aus der robots.txt nach RFC 9309 und rufen die gesperrte URL nicht ab. Ein Link in der Datei /llms.txt hebt niemals eine Disallow-Regel in der robots.txt oder eine 403-Firewall-Sperre auf.',
    },
    {
      question: 'Entfernt ein Disallow-Eintrag in der robots.txt eine Unterseite zuverlässig aus Google?',
      answer: 'Nein. Ein Disallow in der robots.txt verbietet dem Googlebot lediglich das Herunterladen der Seite; verlinken externe oder interne Seiten darauf, kann Google die nackte URL weiterhin in den Suchergebnissen anzeigen. Um eine Seite sicher aus dem Index zu entfernen, muss sie für den Crawler erreichbar sein und das Tag <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code> oder den HTTP-Header <code>X-Robots-Tag: noindex</code> ausliefern.',
    },
    {
      question: 'Braucht eine B2B-Unternehmenswebsite zusätzlich eine llms-full.txt?',
      answer: 'Für klassische Dienstleistungs-, Industrie- und Mittelstands-Websites in der Regel nicht. Die Konvention llms-full.txt (der gesamte Dokumentationstext in einer einzigen großen Markdown-Datei, außerhalb der Kernspezifikation von llmstxt.org) lohnt sich vor allem für Software-Bibliotheken, SDKs und API-Dokumentationen, die direkt in Programmier-Editoren eingelesen werden.',
    },
    {
      question: 'Warum sind echte lastmod-Daten und IndexNow wichtig für die Sichtbarkeit in ChatGPT?',
      answer: 'ChatGPT Search stützt sich neben dem eigenen OAI-SearchBot stark auf den Suchindex von Microsoft Bing. Während Google vor allem die XML-Sitemap liest, wertet Bing sowohl verlässliche <code>&lt;lastmod&gt;</code>-Zeitstempel als auch sofortige URL-Benachrichtigungen über das Protokoll IndexNow aus - neue Preise, Studien oder Leistungsseiten stehen dadurch deutlich schneller für KI-Antworten bereit.',
    },
  ],
  sources: [
    { url: 'https://www.rfc-editor.org/rfc/rfc9309.html', nazwa: 'IETF RFC 9309: Robots Exclusion Protocol (offizieller Internet-Standard für /robots.txt), abgerufen am 24.11.2026' },
    { url: 'https://www.sitemaps.org/protocol.html', nazwa: 'sitemaps.org: Sitemaps XML Format (Protokollspezifikation für loc und lastmod), abgerufen am 24.11.2026' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=de', nazwa: 'Google Search Central: Informationen zu Sitemaps und Indexierungssteuerung, abgerufen am 24.11.2026' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features?hl=de', nazwa: 'Google Search Central: KI-Funktionen (AI Overviews & AI Mode) und Ihre Website, abgerufen am 24.11.2026' },
    { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file (Vorschlag von Jeremy Howard, Spezifikation v2), abgerufen am 05.11.2026' },
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot und ChatGPT-User), abgerufen am 24.11.2026' },
    { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: offizielle Spezifikation für Sofort-Benachrichtigungen an Microsoft Bing, abgerufen am 24.11.2026' },
    { url: 'https://ahrefs.com/blog/what-is-llms-txt/', nazwa: 'Ahrefs: What Is llms.txt? (Verbreitungsanalyse über 137.000 Domains und Einordnung durch Google), abgerufen am 05.11.2026' },
  ],
  cta: {
    tekst: 'Prüfen Sie in unter 60 Sekunden Ihre robots.txt, Sitemap-Aktualität und llms.txt auf KI-Tauglichkeit',
    plan: 'audyt-ai',
    linki: [
      { tekst: 'Kostenloser llms.txt Generator & Bot-Check', href: '/narzedzia/generator-llms-txt' },
      { tekst: '15 KI-Crawler & 403-WAF-Sperren live prüfen', href: '/narzedzia/tester-robotow-ai-robots-txt' },
      { tekst: 'IndexNow Generator & Sitemap-lastmod-Test', href: '/narzedzia/generator-indexnow-test-bing-chatgpt' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'llms.txt' },
    { '@type': 'Thing', name: 'robots.txt (RFC 9309)' },
    { '@type': 'Thing', name: 'XML-Sitemap' },
    { '@type': 'Thing', name: 'IndexNow' },
  ],
};

// --- 3. P9_INHOUSE_DE: Inhouse-SEO oder SEO-Agentur (Vollkostenrechnung DACH 2026) --------------

const W9 = metaDe('/porownania/seo-w-firmie-czy-agencja-seo', {
  tytul: 'Inhouse-SEO oder Agentur? Vollkosten-Rechnung DACH 2026',
  h1: 'Inhouse-SEO oder SEO-Agentur: Arbeitgeberbrutto, Tools und Leistung im Vergleich',
  opis: 'Inhouse-SEO-Stelle (Gehalt, Lohnnebenkosten & Tool-Lizenzen im DACH-Raum) gegen monatlichen Agentur-Retainer ab 450 € netto: Vollkosten über 12 Monate.',
});

export const P9_INHOUSE_DE = {
  slug: 'seo-w-firmie-czy-agencja-seo',
  title: W9.tytul,
  description: W9.opis,
  h1: W9.h1,
  okruszek: 'Inhouse-SEO oder SEO-Agentur',
  nazwaKarty: 'Inhouse-SEO oder SEO-Agentur',
  kryteria: '8 Kriterien',
  tag: 'Vollkosten- & Organisationsvergleich DACH 2026',
  ujawnienie: 'Wir sind eine B2B-SEO- und GEO-Agentur. Deshalb rechnen wir auf dieser Seite beide Seiten transparent vor - einschließlich der Unternehmensgröße und URL-Komplexität, ab der ein eigener Vollzeit-SEO-Manager im Haus wirtschaftlich stärker ist als ein externer Retainer.',
  zrodlaDanych: 'Daten: gesetzliche Arbeitgeber-Sozialversicherungsbeiträge in Deutschland 2026 (~20-21 % Lohnnebenkosten bis zu den Beitragsbemessungsgrenzen), offizielle Lizenzpreise von Sistrix (ab 119 €/Monat), Ahrefs (Lite 129 USD, Standard 249 USD/Monat) und Screaming Frog SEO Spider (245 €/Jahr), Marktvergleich NapoleonCat (11.09.2026) sowie unsere Euro-Paketpreise (Stand: 24.11.2026).',
  answer: 'Eine eigene Vollzeit-Stelle im Inhouse-SEO kostet Arbeitgeber im DACH-Raum bei 52.000 bis 72.000 € Jahresbrutto inklusive ~20 bis 21 % Arbeitgeber-Sozialabgaben, Urlaubs-/Krankheitsausfall, Onboarding und Pflicht-Lizenzen (Sistrix, Ahrefs, Screaming Frog: 3.000 bis 6.000 €/Jahr) real rund 5.500 bis 7.800 € pro Monat - noch ohne externes Content- und Linkbudget. Für den B2B-Mittelstand und SaaS-Anbieter liefert ein monatlich kündbarer Agentur-Retainer (bei uns SEO Standard ab 450 € netto/Monat, SEO Premium 590 € netto/Monat) oder das Hybrid-Modell sofort ein interdisziplinäres Team samt Profi-Tools zu einem Bruchteil der Fixkosten; reines Inhouse-SEO gewinnt erst bei großen Portalen und Shops ab ca. 50.000+ URLs mit täglicher Dev-Sprint-Steuerung.',
  published: '2026-11-24',
  updated: '2026-11-24',
  tableId: 'tabelle-inhouse-agentur-hybrid',
  tableCaption: 'Inhouse-SEO-Manager, B2B-SEO-Agentur und Hybrid-Modell im DACH-Vergleich: 8 Kriterien (Stand: November 2026)',
  tablePrzypis: 'Quellen: gesetzliche Sozialversicherungssätze Deutschland 2026 (RV 9,3 %, KV inkl. Ø Zusatzbeitrag ~8,75 %, PV 1,8 %, AV 1,3 % zzgl. Umlagen), öffentliche Software-Preislisten (sistrix.de, ahrefs.com, screamingfrog.co.uk, Abruf 24.11.2026) sowie unsere veröffentlichte Euro-Preisliste.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'inhouse', label: 'Inhouse-SEO-Manager (Vollzeit DACH)' },
    { key: 'agentur', label: 'B2B-SEO-Agentur (Retainer)' },
    { key: 'hybrid', label: 'Hybrid-Modell (Inhouse Lead + Agentur)' },
  ],
  rows: [
    {
      id: 'vollkosten-monat',
      kryterium: 'Monatliche Gesamtkosten für das Unternehmen (netto)',
      inhouse: 'Ca. 5.500 bis 7.800 € / Monat Vollkosten (52.000-72.000 € Jahresbrutto + ~20-21 % AG-Abgaben + 250-500 € Tools + Recruiting/IT-Umlage), exklusive externer Link- und Redaktionsbudgets',
      agentur: 'Feste Monatsrechnung ohne Lohnnebenkosten: bei uns SEO Standard ab 450 € netto/Monat oder SEO Premium 590 € netto/Monat inklusive Fachtexten, Links und Tools',
      hybrid: 'Anteilige interne Marketing-Kapazität (z. B. 20 % einer bestehenden Produkt-/Content-Stelle) plus planbarer Agentur-Retainer ab 450 bis 590 € netto/Monat',
    },
    {
      id: 'tool-stack',
      kryterium: 'SEO- & GEO-Lizenzpaket (Sistrix, Ahrefs, Crawler, KI-Monitoring)',
      inhouse: 'Vom Arbeitgeber separat zu zahlen: typischerweise 3.000 bis 6.000 € netto/Jahr (Sistrix, Ahrefs Lite/Standard, Screaming Frog 245 €/Jahr, Rank-Tracker)',
      agentur: 'Vollständig auf Agenturseite enthalten - inklusive 24/7-Kundenportal und wöchentlicher KI-Sichtbarkeits-Messung in SEO Premium',
      hybrid: 'Kein doppelter Lizenzkauf nötig: Search Console & GA4 liegen intern beim Kunden, teure Spezial-Datenbanken und KI-APIs stellt die Agentur',
    },
    {
      id: 'kompetenzbreite',
      kryterium: 'Abgedeckte Fachdisziplinen (Code, Content, Digital PR, KI-Suche)',
      inhouse: 'Einzelkämpfer-Engpass: Eine Person vereint selten Next.js-/CWV-Architektur, tiefen Fachtext, Outreach und JSON-LD-Entitätsgraphen auf gleichem Niveau',
      agentur: 'Spezialisierte Arbeitsteilung im Team: technisches SEO & Core Web Vitals, Briefing-gestützte Redaktion, White-Hat-Linkaufbau und GEO-Messung',
      hybrid: 'Stärkste Kombination für erklärungsbedürftiges B2B: tiefes Produkt- und Branchenwissen von innen, technische Präzision und Reichweitenaufbau von außen',
    },
    {
      id: 'produktnaehe',
      kryterium: 'Produktverständnis & Integration in interne Dev-Sprints',
      inhouse: 'Sehr hoch: sitzt täglich in Jira-Planings, Produktmanagement-Runden und Vertriebs-Calls des Unternehmens',
      agentur: 'Geringer als bei einer Festanstellung - erfordert ein strukturiertes Onboarding-Briefing und einen festen Ansprechpartner für Freigaben',
      hybrid: 'Hoch: Der interne Marketing- oder Product-Owner übersetzt Geschäftsprioritäten direkt in schnelle Freigaben für das Agenturteam',
    },
    {
      id: 'anlaufzeit',
      kryterium: 'Zeit bis zum produktiven Projektstart (Time-to-Value)',
      inhouse: 'Meist 3 bis 6 Monate Vorlauf durch Stellenausschreibung, Bewerbungsrunden, Kündigungsfrist des Kandidaten und Einarbeitung',
      agentur: 'Start innerhalb weniger Werktage nach Freischaltung der Google Search Console und Abstimmung der Ziel-Keywords',
      hybrid: 'Sofortstart der technischen und redaktionellen Umsetzung durch die Agentur ohne monatelange Recruiting-Vakanz',
    },
    {
      id: 'ausfallsicherheit',
      kryterium: 'Urlaub, Krankheit & Kündigungsrisiko (Single Point of Failure)',
      inhouse: '28 bis 30 Urlaubstage plus Krankheitstage reduzieren das Jahr auf ~10,5 produktive Monate; kündigt die Fachkraft, steht SEO monatelang still',
      agentur: 'Durchgehender Prozess über das gesamte Jahr mit Vertretung im Team und lückenlosem Arbeitsprotokoll im Kundenportal',
      hybrid: 'Wissen und historische Daten bleiben dauerhaft auf beiden Schultern verteilt - kein Stillstand bei Personalwechsel',
    },
    {
      id: 'flexibilitaet',
      kryterium: 'Vertragsbindung & Eigentum an Daten und Inhalten',
      inhouse: 'Dauerhafte Personalfixkosten, gesetzliche Kündigungsfristen und arbeitsrechtliche Bindung unabhängig von saisonalen Budgets',
      agentur: 'Bei uns monatlich kündbar per E-Mail (Ausnahme Booster Pack inkl. neuer Website: min. 3 Monate); Google-Konten und bezahlte Texte gehören ab Tag 1 Ihnen',
      hybrid: 'Volle Budgetflexibilität bei externen Leistungen, während alle Erstparteien-Konten (GSC, GA4, Unternehmensprofil) im Haus verbleiben',
    },
    {
      id: 'zielgruppe',
      kryterium: 'Ab welcher Unternehmensgröße wirtschaftlich überlegen?',
      inhouse: 'Große Online-Shops, Marktplätze und Medienportale ab ca. 50.000+ URLs mit eigenem Entwicklerteam und Gesamt-SEO-Budget > 8.000 €/Monat',
      agentur: 'Kleine und mittlere B2B-Unternehmen, Industrie, Handwerk, Dienstleister und schlanke SaaS-Seiten mit Fokus auf planbare Kosten pro Anfrage',
      hybrid: 'Wachsender B2B-Mittelstand, regulierte Fachbranchen (Technik, Medizin, ISO) und Unternehmen mit mehreren Ländermärkten (DACH, EN, PL)',
    },
  ],
  sections: [
    {
      id: 'direktvergleich',
      h2: 'Inhouse-SEO, SEO-Agentur oder Hybrid-Modell: 8 Kriterien im DACH-Vergleich',
      html: [
        `<p>Transparenzhinweis und Abgrenzung: Während unser separater Leitfaden ${wew('/porownania/agencja-seo-czy-freelancer', 'SEO-Agentur oder Freelancer')} externe Einzelberater und Agenturverträge gegenüberstellt, widmet sich diese Seite gezielt der kaufmännischen Entscheidung der Geschäftsführung zwischen einer <strong>eigenen Vollzeit-Planstelle (Inhouse-SEO)</strong>, einem <strong>monatlichen Agentur-Retainer</strong> und dem <strong>hybriden Zusammenspiel</strong> beider Welten.</p>`,
        '<p>Der häufigste Rechenfehler in Budgetrunden besteht darin, ein ausgeschriebenes Jahresbruttogehalt durch zwölf zu teilen und direkt neben ein Agenturangebot zu legen. In Deutschland, Österreich und der Schweiz liegen zwischen dem Arbeitnehmerbrutto auf dem Papier und der produktiven SEO-Umsetzung erhebliche Arbeitgeber-Nebenkosten und Lizenzblöcke.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'arbeitgeber-vollkostenrechnung-dach',
      h2: 'DACH Arbeitgeber-Vollkostenrechnung 2026: Was eine Inhouse-SEO-Stelle wirklich kostet',
      html: [
        '<p>Für eine belastbare Kalkulation in Deutschland im Jahr 2026 müssen zum Bruttogehalt vier reale Kostenblöcke addiert werden:</p>',
        '<ul>',
        '<li><strong>Arbeitgeber-Sozialabgaben (~20 bis 21 % in Deutschland):</strong> Gesetzliche Rentenversicherung (9,30 %), Krankenversicherung (7,30 % Basis zzgl. hälftigem durchschnittlichem Zusatzbeitrag von ca. 1,45 % = 8,75 %), Pflegeversicherung (1,80 %, in Sachsen 1,30 %) und Arbeitslosenversicherung (1,30 %) summieren sich 2026 auf rund <strong>21,15 %</strong> bis zu den Beitragsbemessungsgrenzen (KV/PV: 5.812,50 €/Monat bzw. 69.750 €/Jahr; RV/AV: 8.450 €/Monat), zuzüglich Umlagen (U1/U2/Insolvenzgeld) und Berufsgenossenschaft. In Österreich liegen die Lohnnebenkosten (inkl. DB, DZ, Kommunalsteuer) noch höher bei rund 29 bis 30 %, in der Schweiz fallen rund 14 bis 18 % Arbeitgeberbeiträge auf ein deutlich höheres CHF-Gehaltsniveau an.</li>',
        '<li><strong>Pflicht-Softwarepaket (3.000 bis 6.000 € netto/Jahr):</strong> Ohne Daten ist ein Inhouse-SEO blind. Ein professionelles DACH-Arbeitsplatz-Set aus Sistrix (Start 119 € bis Plus 239 €/Monat), Ahrefs (Lite 129 USD bis Standard 249 USD/Monat) und dem Screaming Frog SEO Spider (245 €/Jahr je Einzellizenz) kostet laufend <strong>250 bis 500 € netto pro Monat</strong>.</li>',
        '<li><strong>Recruiting, Onboarding & IT-Arbeitsplatz:</strong> Stellenanzeigen, ggf. Personalberatung, Hardware und 2 bis 3 Monate Einarbeitung verteilen sich im ersten Zweijahreszeitraum meist mit weiteren <strong>150 bis 300 € pro Monat</strong>.</li>',
        '<li><strong>Reale Netto-Arbeitszeit (Urlaub & Krankheit):</strong> Bei 28 bis 30 Urlaubstagen, rund 10 gesetzlichen Feiertagen und durchschnittlich 10 bis 15 Krankheitstagen verbleiben im Jahr etwa 195 bis 205 effektive Arbeitstage - Sie bezahlen 12 Gehälter für rund <strong>10,5 Monate aktiver Umsetzung</strong>.</li>',
        '</ul>',
      ].join(''),
      tabela: {
        id: 'tabelle-vollkosten-inhouse-dach-2026',
        caption: 'Transparente Arbeitgeber-Vollkostenrechnung für 1 Vollzeit-Inhouse-SEO im DACH-Raum (Orientierungsrechnung Deutschland 2026, netto)',
        columns: [
          { key: 'profil', label: 'Stellenprofil (Vollzeit 40h/Woche)' },
          { key: 'brutto', label: 'Bruttogehalt Jahr (Monat)' },
          { key: 'agBrutto', label: 'Arbeitgeberbrutto inkl. ~20-21 % SV' },
          { key: 'tools', label: 'Tools & Arbeitsplatz/Recruiting' },
          { key: 'vollkosten', label: 'Vollkosten / Monat (Jahr)' },
        ],
        rows: [
          {
            id: 'junior-mid',
            profil: 'Operativer Inhouse SEO Manager (2-3 Jahre Praxis)',
            brutto: '52.000 € (4.333 €)',
            agBrutto: 'ca. 5.250 € / Monat',
            tools: 'ca. 250 € Tools (3.000 €/Jahr)',
            vollkosten: 'ca. 5.500 € / Monat (66.000 €/Jahr)',
          },
          {
            id: 'mid-senior',
            profil: 'Erfahrener Inhouse SEO Manager (4-6 Jahre Praxis)',
            brutto: '62.000 € (5.167 €)',
            agBrutto: 'ca. 6.260 € / Monat',
            tools: 'ca. 375 € Tools + 200 € Umlage',
            vollkosten: 'ca. 6.835 € / Monat (82.020 €/Jahr)',
          },
          {
            id: 'senior-lead',
            profil: 'Senior SEO Manager / Head of SEO (komplexe Portale)',
            brutto: '72.000 € (6.000 €)',
            agBrutto: 'ca. 7.250 € / Monat (KV/PV ab BBG gedeckelt)',
            tools: 'ca. 500 € Tools (6.000 €/Jahr) + Umlage',
            vollkosten: 'ca. 7.800 € / Monat (93.600 €/Jahr)',
          },
        ],
        przypis: 'Hinweis: Mathematische Modellrechnung für Arbeitgeber in Deutschland (Sozialversicherungsstand 2026) zzgl. veröffentlichter Software-Listenpreise (Sistrix, Ahrefs, Screaming Frog). Externe Budgets für Fachmedien-Platzierungen (Linkaufbau), Entwickler-Tickets und Lektorat kommen bei einer Inhouse-Stelle noch hinzu.',
        minWidth: 640,
      },
      htmlPo: [
        `<p>Die kaufmännische Konsequenz für kleine und mittlere Unternehmen: Selbst das Einstiegsszenario bindet <strong>rund 66.000 € Fixkosten pro Jahr</strong>, noch bevor eine einzige externe Fachpublikation bezahlt oder eine Zeile Next.js-Code durch einen Entwickler umgesetzt wurde. Zum Vergleich umfasst unser monatlich kündbares Paket <strong>SEO Standard (ab 450 € netto/Monat, also 5.400 €/Jahr)</strong> bereits das technische Audit, bis zu 20 Keywords, 2 veröffentlichungsreife Fachinhalte (${wew('/copywriting-seo', 'SEO-Texte schreiben lassen')}), 2 Links, Ihr ${wew('/panel-klienta', 'SEO Kundenportal 24/7')} und die Pflege Ihres Google Unternehmensprofils; <strong>SEO Premium (590 € netto/Monat, also 7.080 €/Jahr)</strong> deckt bis zu 50 Keywords, 4 Inhalte, 4 Links sowie wöchentliches KI-Monitoring in ChatGPT, Perplexity, Gemini und Google AI Overviews ab (Details unter ${wew('/cennik-pozycjonowania', 'SEO Kosten und Pakete in Euro')}).</p>`,
        `<p>Ab welchem Monat sich diese Investition über zusätzliche Kundenanfragen amortisiert, berechnen Sie mit Ihren eigenen Margen in unserem kostenlosen ${wew('/narzedzia/kalkulator-strat-seo', 'SEO-Rechner und ROI-Rechner in Euro')}.</p>`,
      ].join(''),
    },
    {
      id: 'wann-inhouse-wann-agentur-wann-hybrid',
      h2: 'Ehrliche Entscheidungsgrenze: Wann gewinnt Inhouse-SEO, wann die Agentur und wann Hybrid?',
      html: [
        '<p>Eine seriöse Beratung rechnet Ihnen nicht pauschal von einer eigenen Personalstelle ab, sondern zieht die Grenze anhand Ihrer URL-Anzahl, Ihrer Deployment-Frequenz und Ihrer internen Produktkomplexität:</p>',
        '<ul>',
        '<li><strong>Wann reines Inhouse-SEO klar gewinnt:</strong> Sie betreiben einen großen Online-Shop, einen digitalen Marktplatz, ein Job-/Immobilienportal oder ein Medienhaus mit <strong>50.000+ indexierbaren URLs</strong>. Hier entstehen Sichtbarkeitsgewinne durch tägliche Arbeit in internen Entwicklungs-Sprints (40 Stunden/Woche für Facettennavigation, Crawl-Budget-Steuerung in Server-Logs, automatisierte Produktdaten-Templates und tägliche Redaktionssteuerung) - und Ihr Gesamtbudget für organisches Wachstum liegt deutlich über 8.000 bis 10.000 € im Monat.</li>',
        '<li><strong>Wann ein agiler B2B-Agentur-Retainer gewinnt:</strong> Sie führen ein mittelständisches Industrie-, Bau-, Handels-, Beratungs- oder SaaS-Unternehmen mit <strong>15 bis 2.000 Unterseiten</strong>. Sobald das technische Fundament sauber steht, füllt eine solche Website keine 160 Inhouse-Stunden pro Monat mit sinnvoller SEO-Arbeit. Was Rankings und KI-Zitate hier voranbringt, ist die kontinuierliche, mehrköpfige Umsetzung aus Technik-Pflege, präzisen Leistungs- und Vergleichsseiten, seriösem Linkaufbau und GEO-Messung zu festen Monatskosten ohne Personalrisiko.</li>',
        '<li><strong>Wann das Hybrid-Modell der Goldstandard ist:</strong> In technisch anspruchsvollen oder regulierten B2B-Branchen (z. B. Maschinenbau, Medizintechnik, IT-Sicherheit, ISO-Zertifizierung oder mehrsprachiger DACH-/Polen-Vertrieb) steuert eine interne Ansprechperson aus Produktmanagement oder Marketing für wenige Stunden pro Woche Fachwissen, echte Kundeneinwände und schnelle Freigaben bei, während wir als Technik- und GEO-Agentur Keyword-Cluster, Core Web Vitals, JSON-LD-Entitätsgraphen, Content-Entwürfe, Linkaufbau und das komplette Tool-Set liefern.</li>',
        '</ul>',
        `<p>Wenn Sie für die interne Abstimmung vergleichbare Angebote einholen möchten, laden Sie unsere kostenlose ${wew('/narzedzia/zapytanie-ofertowe-seo', 'SEO Ausschreibung Vorlage (RFP) als PDF')} sowie die ${wew('/narzedzia/umowa-na-pozycjonowanie', 'SEO Vertrag Checkliste (12 Klauseln)')} herunter oder prüfen Sie unseren Leitfaden ${wew('/porownania/jak-wybrac-agencje-seo', 'SEO Agentur finden und auswählen')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Inhouse-SEO, Arbeitgeberkosten und SEO-Agentur',
  faq: [
    {
      question: 'Ab welchem monatlichen Gesamtbudget rechnet sich ein eigener Inhouse-SEO-Manager im DACH-Raum?',
      answer: 'Wirtschaftlich sinnvoll wird eine eigene Vollzeitstelle im DACH-Raum meist erst ab einem gesamten Monatsbudget für organisches Wachstum von rund 8.000 bis 10.000 € netto. Erst oberhalb der reinen Arbeitgeber- und Lizenzfixkosten (ca. 5.500 bis 7.800 €/Monat) bleibt damit ausreichend Umsetzungsbudget für externe Fachpublikationen, Texterstellung und Entwickler-Kapazität übrig.',
    },
    {
      question: 'Welche SEO-Tools muss ein Arbeitgeber für eine Inhouse-Stelle mindestens einkalkulieren?',
      answer: 'Neben den kostenlosen Pflichtsystemen Google Search Console und Bing Webmaster Tools benötigt ein Inhouse-SEO im DACH-Markt in der Regel eine Sichtbarkeits-Suite wie Sistrix (ab 119 €/Monat), eine internationale Backlink- und Keyword-Datenbank wie Ahrefs (Lite 129 USD oder Standard 249 USD/Monat) sowie einen Desktop-Crawler wie den Screaming Frog SEO Spider (245 €/Jahr) - zusammen meist 3.000 bis 6.000 € netto pro Jahr.',
    },
    {
      question: 'Wie funktioniert das Hybrid-Modell aus internem Marketing und externer SEO-/GEO-Agentur im Alltag?',
      answer: 'Ihre interne Kontaktperson aus Marketing, Produkt oder Geschäftsführung investiert etwa zwei bis vier Stunden pro Monat in Themenpriorisierung, technische Faktenfreigabe und echte Einblicke aus dem Vertrieb. Unser Team übernimmt die gesamte Schwerarbeit: technische Audits, Core-Web-Vitals-Optimierung, strukturierte JSON-LD-Daten, ausformulierte Fachtexte, Linkaufbau sowie das wöchentliche Monitoring in Google und KI-Systemen.',
    },
    {
      question: 'Bleiben Google Search Console, Analytics und erstellte Inhalte bei einer Agenturbetreuung unser Eigentum?',
      answer: `Ja, darauf sollten Sie bei jedem Anbieter bestehen. Bei uns liegen Google Search Console, Google Analytics 4 und Ihr Google Unternehmensprofil vom ersten Tag an auf Ihrem eigenen Firmenkonto, sämtliche bezahlten Texte gehen dauerhaft in Ihre Nutzungsrechte über, und wir setzen keine gemieteten Linknetzwerke ein. Bei einem späteren Wechsel hilft Ihnen zudem unser Leitfaden ${wew('/zmiana-agencji-seo', 'SEO Agentur wechseln ohne Rankingverlust')}.`,
    },
    {
      question: 'Was ist für eine B2B-Website mit 20 bis 100 Unterseiten besser: Inhouse-Kraft, Freelancer oder Agentur?',
      answer: `Bei 20 bis 100 Unterseiten ist eine eigene Vollzeitstelle nahezu immer überdimensioniert. Wenn Sie nur ein einmaliges Audit oder punktuelles Sparring für Ihr bestehendes Entwickler- und Redaktionsteam suchen, passt ein spezialisierter Freelancer (oder unser einmaliges SEO Audit ab 350 € netto). Wenn Sie laufend fertige Seiten, Technik, Links und KI-Sichtbarkeit aus einer Hand wünschen, ist ein monatlich kündbarer Agentur-Retainer ab 450 € netto wirtschaftlich klar im Vorteil.`,
    },
  ],
  sources: [
    { url: 'https://www.bundesgesundheitsministerium.de/beitraege.html', nazwa: 'Bundesministerium für Gesundheit / Sozialversicherungswerte: Beitragssätze und Beitragsbemessungsgrenzen der gesetzlichen Kranken- und Pflegeversicherung, abgerufen am 24.11.2026' },
    { url: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Experten/Zahlen-und-Fakten/Werte-der-Rentenversicherung/werte-der-rentenversicherung_node.html', nazwa: 'Deutsche Rentenversicherung: Beitragssatz (18,6 %, Arbeitgeberanteil 9,3 %) und Beitragsbemessungsgrenze 2026, abgerufen am 24.11.2026' },
    { url: 'https://www.sistrix.de/preise/', nazwa: 'SISTRIX GmbH: offizielle Paketpreise Start (119 €/Monat), Plus (239 €/Monat) und Professional, abgerufen am 24.11.2026' },
    { url: 'https://ahrefs.com/pricing', nazwa: 'Ahrefs Pricing: offizielle Tarife Lite (129 USD/Monat) und Standard (249 USD/Monat) für Backlink- und Wettbewerbsdaten, abgerufen am 24.11.2026' },
    { url: 'https://www.screamingfrog.co.uk/seo-spider/pricing/', nazwa: 'Screaming Frog SEO Spider Pricing: offizielle Jahreslizenz in Euro (245 € netto pro Nutzer/Jahr), abgerufen am 24.11.2026' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: Marktvergleich SEO-Agentur vs. Freelancer vs. Inhouse-Anstellung (11.09.2026, polnische Marktdaten als Strukturreferenz), abgerufen am 24.11.2026' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de', nazwa: 'Google Search Central: Brauche ich einen SEO-Experten? (Aufgabenverteilung, Konten-Hoheit und Auswahlkriterien), abgerufen am 24.11.2026' },
  ],
  cta: {
    tekst: 'Vollkosten Ihrer Domain gegen unseren Monats-Retainer (ab 450 € netto) unverbindlich durchrechnen lassen',
    plan: 'standard',
    linki: [
      { tekst: 'SEO Kosten & Pakete (450 € / 590 € netto)', href: '/cennik-pozycjonowania' },
      { tekst: 'SEO-Verlust- & ROI-Rechner in Euro', href: '/narzedzia/kalkulator-strat-seo' },
      { tekst: 'SEO Ausschreibung Vorlage (RFP als PDF)', href: '/narzedzia/zapytanie-ofertowe-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Inhouse-SEO' },
    { '@type': 'Thing', name: 'SEO-Agentur' },
    { '@type': 'Thing', name: 'Arbeitgeber-Vollkostenrechnung' },
  ],
};

export const POROWNANIA_NOWE_3_DE = [
  P7_METRYKI_DE,
  P8_PLIKI_DE,
  P9_INHOUSE_DE,
];

export default POROWNANIA_NOWE_3_DE;
