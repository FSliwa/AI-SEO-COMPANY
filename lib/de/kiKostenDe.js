// Texte fuer /de/ki-suchoptimierung/kosten (F2, 22.11.2026; Schluessel PL: /pozycjonowanie-w-ai/cennik).
// Reiner ESM-Code ohne React. Keine erfundenen Fremdagenturpreise, alle eigenen Preise aus PREISE (EUR netto).

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';
import { WIDOCZNOSC } from '../narzedziaLiczby.js';

const e = (n) => eur(n, 'de');

export const STAND_KI_KOSTEN_DE = '2026-11-22';

export const KI_KOSTEN_DE = {
  okruszek: 'GEO & KI-SEO Kosten',
  tag: 'Generative Engine Optimization · Preise & Marktmodelle 2026',
  kurzantwort: `Ein einmaliges KI-Sichtbarkeit Audit (30 reale Kundenfragen in ChatGPT, Perplexity, Gemini und Google AI Overviews inkl. 90-Tage-Plan) kostet bei AI SEO COMPANY ${e(PREISE.geoAudit)} netto und wird bei anschließender Betreuung vollständig auf den ersten Monat angerechnet. Laufende GEO-Maßnahmen und wöchentliches Monitoring erhalten Sie als Modul für +${e(PREISE.geoZuschlag)} netto/Monat zu SEO Standard (ab ${e(PREISE.standard)} netto/Monat) oder ohne Aufpreis direkt im Paket SEO Premium (${e(PREISE.premium)} netto/Monat) - jeweils mit monatlicher Kündbarkeit.`,
  lead: 'Wer 2026 Angebote für Generative Engine Optimization (GEO) oder „ChatGPT-SEO“ einholt, sieht oft völlig unvergleichbare Summen: Mal wird lediglich ein automatisiertes Prompt-Dashboard verkauft, mal der komplette Ausbau von Angebotsseiten, Schema.org und Fachmedien-Erwähnungen. Hier trennen wir die drei marktüblichen Abrechnungsmodelle, zeigen die wahren API-Kosten und legen unsere eigenen Preise offen.',
  ctaAudit: `KI-Audit für ${e(PREISE.geoAudit)} netto anfragen`,
  ctaPakete: 'Zu unserer Preistabelle',
  marktModelleTabelle: {
    id: 'tabelle-geo-marktmodelle',
    caption: 'Die 3 gängigen Abrechnungsmodelle für GEO & KI-Suchoptimierung im Jahr 2026',
    columns: [
      { key: 'modell', label: 'Abrechnungsmodell' },
      { key: 'inhalt', label: 'Wofür Sie tatsächlich zahlen' },
      { key: 'zielgruppe', label: 'Für wen sinnvoll' },
      { key: 'risiko', label: 'Worauf Sie achten sollten' },
    ],
    rows: [
      {
        id: 'm1',
        modell: '1. Einmaliges KI-Sichtbarkeit Audit',
        inhalt: 'Definition von Kauf- und Preisfragen, Ist-Messung in mehreren KI-Quellen, Liste zitierter Drittdomains, technischer Bot-/HTML-Check und Maßnahmenplan',
        zielgruppe: 'Unternehmen mit eigenem Marketing- oder Entwicklerteam, die eine klare Diagnose ohne Abo suchen',
        risiko: 'Einzelne Screenshots aus einem privaten Chat-Fenster ohne Rohdaten, ohne Quellenliste und ohne Technik-Prüfung',
      },
      {
        id: 'm2',
        modell: '2. GEO-Modul im laufenden SEO-Vertrag',
        inhalt: 'Gemeinsame Umsetzung aus Google-/Bing-Indexierung, zitierfähigen Preis- und Vergleichsseiten, Google Unternehmensprofil, @graph-JSON-LD und wöchentlicher Messung',
        zielgruppe: 'Kleine und mittlere B2B- sowie Dienstleistungsunternehmen (keine doppelten Kosten für dieselbe Website-Arbeit)',
        risiko: 'Aufpreis für reine Prompt-Grafiken ohne monatlich gelieferte Inhalte, Technik-Fixes oder Drittquellen-Arbeit',
      },
      {
        id: 'm3',
        modell: '3. Eigenständiges Digital-PR- & Entity-Projekt',
        inhalt: 'Datengestützte Fachbeiträge, Branchenstudien, Pflege internationaler Verzeichnisse (z. B. Clutch, Sortlist) und Präsenz in unabhängigen Vergleichsartikeln',
        zielgruppe: 'Etablierte SaaS- und Mittelstandsmarken mit bereits starkem On-Page-SEO, die ihre externe Zitierquote steigern wollen',
        risiko: 'Massenhaft eingekaufte Gastartikel auf themenfremden Linkfarmen, die von Sprachmodellen ignoriert werden',
      },
    ],
    przypis: 'Eigene Marktübersicht von AI SEO COMPANY (Stand: November 2026). Aus Gründen des lauteren Wettbewerbs nennen wir keine geschätzten Fremdagenturpreise.',
  },
  kostenTreiber: [
    [
      '1. Reine API-Abfragekosten (wenige Euro im Monat)',
      'In unserer produktiven DataForSEO-Abrechnung vom 04.11.2026 kostete eine Live-Abfrage mit Websuche rund 0,030 USD bei ChatGPT und rund 0,006 USD bei Perplexity. Selbst 30 Kundenfragen pro Woche kosten auf reiner Schnittstellenebene nur wenige US-Dollar im Monat - überhöhte Gebühren allein für „KI-Tracking-Lizenzen“ sind daher unbegründet.',
    ],
    [
      '2. Zitierfähige Angebots-, Preis- und Vergleichsseiten im Server-HTML',
      'In unserem API-Test vom 04.-05.11.2026 verwiesen bei Preis- und Vergleichsfragen alle 31 Links in ChatGPT auf konkrete Websites (Preislisten, Vergleiche, Ratgeber) und null auf Google Maps. Faktengeprüfte Vergleichstabellen und klare Antwortblöcke sind der wichtigste Kostentreiber in der Redaktion.',
    ],
    [
      '3. Google Unternehmensprofil & konsistente Entitätsdaten',
      'Bei lokalen Anbieter-Empfehlungen führten im selben Test 59 von 62 ChatGPT-Links zu Google Maps. Die Pflege von Kategorien, Leistungen, Bewertungsprozessen sowie identischen Firmendaten in Bing Places und Fachverzeichnissen wirkt gleichzeitig auf Maps und KI-Antworten.',
    ],
    [
      '4. Sauberer JSON-LD-@graph, KI-Crawler-Freigabe & /llms.txt',
      'Wir beseitigen widersprüchliche Schema-Blöcke, stellen sicher, dass OAI-SearchBot, PerplexityBot und Claude-SearchBot weder in der robots.txt noch in der Server-Firewall (403) blockiert werden, aktivieren IndexNow für Bing und pflegen eine strukturierte /llms.txt.',
    ],
  ],
  eigenesPreisblatt: {
    id: 'tabelle-unsere-geo-preise',
    caption: 'Veröffentlichte Preise für KI-Sichtbarkeit (GEO) und SEO-Kombipakete bei AI SEO COMPANY (netto, November 2026)',
    columns: [
      { key: 'leistung', label: 'Leistung / Paket' },
      { key: 'preis', label: 'Preis netto (EUR)' },
      { key: 'bindung', label: 'Vertragsbindung' },
      { key: 'umfang', label: 'Konkreter Leistungsumfang' },
    ],
    rows: [
      {
        id: 'p-free',
        leistung: 'Kostenloser KI-Sichtbarkeit Check',
        preis: '0 €',
        bindung: `Ohne Anmeldung (bis ${WIDOCZNOSC.limitIp} Domains / IP / Tag)`,
        umfang: `Sofort-Stichprobe mit ${WIDOCZNOSC.pytan} Kundenfragen in ${WIDOCZNOSC.silnikow} KI-Quellen, Score 0-100 sowie Vorschau genannter Wettbewerber und Quellen`,
      },
      {
        id: 'p-audit',
        leistung: 'KI-Sichtbarkeit Audit (GEO)',
        preis: `${e(PREISE.geoAudit)} einmalig`,
        bindung: 'Einmalauftrag (100 % Anrechnung auf den 1. Betreuungsmonat)',
        umfang: '30 abgestimmte Kauf- & Preisfragen in ChatGPT, Perplexity, Gemini & AI Overviews, vollständige Quellen-Matrix, KI-Bot-Check, 90-Tage-Plan + 45 Min. Call',
      },
      {
        id: 'p-std-geo',
        leistung: 'SEO Standard + Modul KI-Monitoring & Maßnahmen',
        preis: `ab ${e(PREISE.standard)} + ${e(PREISE.geoZuschlag)} = ${e(PREISE.standard + PREISE.geoZuschlag)} / Monat`,
        bindung: 'Monatsvertrag, jederzeit kündbar',
        umfang: 'Vollständiges Website- & Maps-SEO (bis 20 Keywords, 2 Inhalte, 2 Links/Monat) + wöchentliche Messung von 30 Fragen in 4 KI-Systemen im Kundenportal + 2 GEO-Umsetzungen/Monat',
      },
      {
        id: 'p-prem',
        leistung: 'SEO Premium (inklusive wöchentlichem GEO)',
        preis: `${e(PREISE.premium)} / Monat`,
        bindung: 'Monatsvertrag, jederzeit kündbar',
        umfang: 'Technisches SEO, mobile CRO, bis 50 Keywords, 4 Fachinhalte & 4 Links/Monat, Google Unternehmensprofil sowie wöchentliches 30-Fragen-KI-Monitoring ohne Aufpreis',
      },
      {
        id: 'p-booster',
        leistung: 'Booster Pack (neue Next.js-Website + vollständiges SEO)',
        preis: `${e(PREISE.booster)} / Monat`,
        bindung: 'Mindestens 3 Monate, danach monatlich kündbar',
        umfang: 'Neubau Ihrer Unternehmenswebsite in Next.js (0 € separater Einmalpreis) mit sauberem Server-HTML & JSON-LD für Googlebot und KI-Crawler inkl. Hosting, SSL und SEO',
      },
    ],
    przypis: 'Alle Beträge in Euro netto zzgl. gesetzlicher Umsatzsteuer (Stand: 22.11.2026).',
  },
  prueffragenTabelle: {
    id: 'tabelle-geo-prueffragen',
    caption: '7 Prüffragen vor der Beauftragung einer GEO- oder KI-SEO-Agentur',
    columns: [
      { key: 'frage', label: 'Frage an den Anbieter' },
      { key: 'seriös', label: 'Seriöse, belastbare Antwort' },
      { key: 'warnung', label: 'Warnsignal (Red Flag)' },
    ],
    rows: [
      {
        id: 'pf1',
        frage: '1. Wie genau messen Sie unsere KI-Sichtbarkeit?',
        seriös: 'Fester Satz von 20-50 Kundenfragen, regelmäßig per API unter gleichen Standortbedingungen abgefragt inkl. vollständiger Quellen-URLs',
        warnung: 'Einzelne Screenshots aus dem privaten ChatGPT-Konto eines Mitarbeiters',
      },
      {
        id: 'pf2',
        frage: '2. Garantieren Sie Platz 1 in ChatGPT-Empfehlungen?',
        seriös: 'Klare Absage an Garantien bei Sprachmodellen; Zusage konkreter Umsetzungen und transparenter Trendmessung',
        warnung: 'Pauschale Platz-1-Garantie in ChatGPT oder Google Gemini',
      },
      {
        id: 'pf3',
        frage: '3. Welche konkreten Arbeiten entstehen jeden Monat?',
        seriös: 'Vereinbarte Zahl an Antwort-/Vergleichsseiten, JSON-LD-Pflege, Unternehmensprofil-Arbeit und externen Erwähnungen',
        warnung: 'Reines Monitoring-Abo ohne inhaltliche oder technische Umsetzung',
      },
      {
        id: 'pf4',
        frage: '4. Welchen Stellenwert hat die Datei /llms.txt?',
        seriös: 'Nützliche Strukturhilfe nach gesicherter Google-/Bing-Indexierung und freiem OAI-SearchBot-Zugriff',
        warnung: 'Verkauf einer einzelnen llms.txt-Datei für tausende Euro als angeblicher „Geheimschlüssel für Google AI“',
      },
      {
        id: 'pf5',
        frage: '5. Woher stammen externe Marken-Erwähnungen?',
        seriös: 'Aus Fachportalen, Verzeichnissen und Vergleichsseiten, die Modelle in Ihrer Branche nachweislich zitieren',
        warnung: 'Gekaufte Massenlinks auf Spam-Netzwerken entgegen den Google-Spam-Richtlinien',
      },
      {
        id: 'pf6',
        frage: '6. Wem gehören Konten, Texte und aufgebaute Links?',
        seriös: 'Search Console, GA4, Bing und Unternehmensprofil laufen auf Ihr Konto; bezahlte Texte und Links bleiben dauerhaft bestehen',
        warnung: 'Agentureigene Konten oder gemietete Links, die nach Vertragsende gelöscht werden',
      },
      {
        id: 'pf7',
        frage: '7. Wie lang sind Mindestlaufzeit und Kündigungsfrist?',
        seriös: 'Monatsvertrag mit 1 Monat Kündigungsfrist (längere Mindestlaufzeit nur, wenn eine neue Website im Paket vorfinanziert wird)',
        warnung: '12- bis 24-Monats-Knebelvertrag mit automatischer Verlängerung',
      },
    ],
    przypis: 'Angelehnt an die Empfehlungen von Google Search Central („Do you need an SEO?“ und „Optimizing for generative AI features“, abgerufen am 22.11.2026).',
  },
  faq: [
    {
      id: 'warum-geo-und-seo-kombinieren',
      frage: 'Warum ist GEO als Modul im SEO-Paket günstiger als ein separater Einzelvertrag?',
      antwort: 'Weil sich rund vier Fünftel der Grundlagen überschneiden: Indexierung in Google und Bing, schnelles Server-HTML ohne JavaScript-Hürden, präzise Preis- und Leistungsseiten, ein gepflegtes Google Unternehmensprofil und seriöse Branchenerwähnungen. In einem Kombipaket zahlen Sie für Technik und Redaktion nur einmal.',
    },
    {
      id: 'anrechnung-235-euro-audit',
      frage: 'Wie funktioniert die Anrechnung der 235 € netto für das KI-Sichtbarkeit Audit?',
      antwort: `Wenn Sie sich nach Erhalt des Audit-Berichts für eine laufende Zusammenarbeit in ${verweis('/cennik-pozycjonowania', 'SEO Standard (mit KI-Modul) oder SEO Premium')} entscheiden, ziehen wir die vollen ${e(PREISE.geoAudit)} netto von Ihrer ersten Monatsrechnung ab. Möchten Sie die 10 Maßnahmen intern umsetzen, behalten Sie den Bericht ohne jede weitere Verpflichtung.`,
    },
    {
      id: 'warum-keine-fremdpreise',
      frage: 'Warum nennen Sie auf dieser Seite keine konkreten Preise anderer GEO-Agenturen?',
      antwort: 'Die meisten Anbieter veröffentlichen keine standardisierten Preislisten mit identischer Fragenanzahl, gleichen abgefragten Modellen und festem Umsetzungsumfang. Geschätzte Fremdpreise wären für Auftraggeber irreführend und wettbewerbsrechtlich unzulässig. Stattdessen legen wir jeden eigenen Eurobetrag offen und geben Ihnen 7 Prüffragen für den Angebotsvergleich an die Hand.',
    },
    {
      id: 'wann-wirken-geo-massnahmen',
      frage: 'Ab wann zeigen Investitionen in KI-Suchoptimierung messbare Ergebnisse?',
      antwort: `Technische Korrekturen - etwa das Freischalten von OAI-SearchBot in der Server-Firewall, das Einreichen neuer Kostenseiten per IndexNow oder aktualisierte Leistungen im ${verweis('/pozycjonowanie-wizytowki-google', 'Google Unternehmensprofil')} - schlagen sich bei Live-Websuchen in ChatGPT und Perplexity oft binnen 2 bis 6 Wochen nieder. Der Aufbau neuer Verzeichnis- und Fachmedien-Zitate wirkt typischerweise über 3 bis 6 Monate.`,
    },
  ],
  quellen: [
    { url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', nazwa: 'Google Search Central: Optimizing for generative AI features (Englisch)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO? - Prüffragen zu SEO-, AEO- und GEO-Dienstleistern', data: '2026-11-22' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: Overview of OpenAI Crawlers (OAI-SearchBot)', data: '2026-11-22' },
    { url: 'https://dataforseo.com/apis/ai-optimization-api', nazwa: 'DataForSEO AI Optimization / LLM Responses API: Dokumentation und Gebührenmodell', data: '2026-11-22' },
  ],
};
