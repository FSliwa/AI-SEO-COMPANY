// Dane niemieckiego artykułu /de/blog/canonical-tag (Faza 2 DE, 19.11.2026; klucz PL: /blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026).
// Fraza główna: „canonical tag” (720/mies. DE). Fakty wg Google Search Central (Consolidate duplicate URLs, Pagination, Troubleshooting).

export const BLOG_CANONICAL_DE = {
  fallbackPfad: '/blog/canonical-tag',
  okruszek: 'Canonical Tag',
  kategoria: 'Technisches SEO & Indexierung',
  h1: 'Canonical Tag im SEO: Funktion, Beispiele und häufige Fehler',
  opublikowano: '2026-11-19',
  aktualisiert: '2026-11-19',
  kurzantwort: 'Das Canonical Tag (<link rel="canonical" href="…">) im HTML-<head> zeigt Suchmaschinen, welche URL die bevorzugte Hauptversion ist, wenn identische oder sehr ähnliche Inhalte unter mehreren Adressen erreichbar sind. Google behandelt die Angabe als starkes Signal (nicht als strikten Befehl) und bündelt Ranking- sowie Linksignale auf der kanonischen Adresse.',
  lead: 'Tracking-Parameter, Filterkombinationen, Groß- und Kleinschreibung oder Varianten mit und ohne Schrägstrich erzeugen auf fast jeder Website unbeabsichtigte Duplikate. Mit einem sauber gesetzten Canonical Tag verhindern Sie, dass sich Signale auf Dutzende Neben-URLs verteilen - vorausgesetzt, Weiterleitungen, Sitemap und interne Links widersprechen dem Tag nicht.',
  sekcje: [
    {
      id: 'was-ist-canonical-tag',
      h2: 'Was ist ein Canonical Tag und wie sieht es im HTML-Code aus?',
      html: [
        '<p>Ein <strong>Canonical Tag</strong> (auch <em>rel="canonical"</em> oder kanonischer Link) ist ein Element im Kopfbereich (<code>&lt;head&gt;</code>) einer HTML-Seite, das auf die Original-URL (die kanonische URL) verweist:</p>',
        '<pre><code>&lt;link rel="canonical" href="https://www.beispiel-firma.de/leistungen/seo-audit" /&gt;</code></pre>',
        '<p>Auch jede einzigartige Seite ohne bekannte Duplikate sollte ein <strong>selbstreferenzierendes Canonical Tag</strong> besitzen, also auf ihre eigene saubere URL zeigen. Hängt später ein Newsletter-Tool Parameter wie <code>?utm_source=newsletter</code> an die Adresse an, bleibt das Canonical Tag unverändert auf der sauberen Hauptadresse.</p>',
        '<p>Für Nicht-HTML-Dateien wie PDF-Dokumente lässt sich dieselbe Angabe als HTTP-Header ausliefern: <code>Link: &lt;https://www.beispiel-firma.de/vorlage&gt;; rel="canonical"</code>.</p>',
      ].join(''),
    },
    {
      id: 'canonical-vs-301-noindex',
      h2: 'Canonical Tag vs. 301-Weiterleitung vs. noindex',
      html: '<p>In technischen Audits sehen wir regelmäßig, dass diese drei Werkzeuge verwechselt oder sogar gleichzeitig auf derselben URL eingesetzt werden. Jedes löst ein anderes Problem:</p>',
      tabela: {
        id: 'tabelle-canonical-301-noindex',
        caption: 'Wann Sie rel="canonical", eine 301-Weiterleitung oder noindex verwenden',
        columns: [
          { key: 'methode', label: 'Mechanismus' },
          { key: 'wirkung', label: 'Wirkung für Nutzer & Suchmaschine' },
          { key: 'einsatz', label: 'Richtiger Anwendungsfall' },
        ],
        rows: [
          { methode: 'rel="canonical"', wirkung: 'Beide URLs bleiben für Besucher aufrufbar; Google konsolidiert Signale auf der Ziel-URL (starkes Signal)', einsatz: 'UTM- und Tracking-Parameter, Sortieransichten, identische Produkte in mehreren Kategorien, Content-Syndikation' },
          { methode: '301-Weiterleitung', wirkung: 'Leitet Browser und Bots dauerhaft zur neuen Adresse weiter; alte URL verschwindet', einsatz: 'Umzug einer Seite, http → https, mit/ohne www, gelöschte Duplikate ohne eigenen Nutzen' },
          { methode: 'meta name="robots" content="noindex"', wirkung: 'Verbietet die Aufnahme in den Suchindex (sofern die Seite gecrawlt werden darf)', einsatz: 'Interne Suchergebnisseiten, Login-Bereiche, Danke-Seiten nach Formularen' },
        ],
        przypis: 'Wichtig: Kombinieren Sie auf einer Seite niemals noindex mit einem Canonical Tag auf eine andere URL - beide Signale widersprechen sich.',
      },
    },
    {
      id: 'mehrsprachige-websites',
      h2: 'Canonical Tag und hreflang auf mehrsprachigen Websites (z. B. Next.js)',
      html: [
        '<p>Ein besonders teurer Fehler auf Websites mit mehreren Sprachversionen (DE, EN, PL): Die deutsche Unterseite bekommt versehentlich das Canonical Tag der englischen oder polnischen Seite. Für Google heißt das: „Die deutsche Seite ist nur eine Kopie - indexiere sie nicht.“</p>',
        '<p>Die korrekte Regel laut Google Search Central lautet: <strong>Jede Sprachversion verweist per Canonical auf sich selbst</strong>, und die wechselseitigen <code>hreflang</code>-Attribute verknüpfen exakt diese kanonischen URLs miteinander. Auf unserer eigenen Next.js-Website sieht das in <code>generateMetadata</code> so aus:</p>',
        `<pre><code>alternates: {
  canonical: 'https://www.ai-seo-company.pl/de/blog/canonical-tag',
  languages: {
    pl: 'https://www.ai-seo-company.pl/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026',
    en: 'https://www.ai-seo-company.pl/en/blog/canonical-tag-seo-guide-2026',
    de: 'https://www.ai-seo-company.pl/de/blog/canonical-tag',
    'x-default': 'https://www.ai-seo-company.pl/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026',
  },
}</code></pre>`,
      ].join(''),
    },
    {
      id: 'sieben-fehler',
      h2: '7 Fehler, wegen derer Google Ihr Canonical Tag ignoriert',
      html: [
        '<ol>',
        '<li><strong>Canonical zeigt auf eine 404-Seite oder eine 301-Weiterleitung:</strong> Das Ziel muss direkt mit Statuscode 200 antworten.</li>',
        '<li><strong>Paginierte Seiten zeigen alle auf Seite 1:</strong> Seite 2, 3 usw. sind keine Duplikate von Seite 1. Google empfiehlt für jede paginierte Seite ein selbstreferenzierendes Canonical Tag.</li>',
        '<li><strong>Relative Pfade statt absoluter URLs:</strong> Schreiben Sie immer die vollständige Adresse inklusive <code>https://</code> und korrekter Subdomain.</li>',
        '<li><strong>Canonical steht im <code>&lt;body&gt;</code> statt im <code>&lt;head&gt;</code>:</strong> Google ignoriert Canonical-Elemente außerhalb des <code>&lt;head&gt;</code> vollständig.</li>',
        '<li><strong>Zwei widersprüchliche Canonical Tags:</strong> Oft verursacht durch die Kombination aus CMS-Template und SEO-Plugin. Im Zweifel ignoriert Google beide.</li>',
        '<li><strong>Abweichende URLs in der XML-Sitemap:</strong> In die <code>sitemap.xml</code> gehören ausschließlich kanonische URLs mit Status 200.</li>',
        '<li><strong>Interne Links zeigen systematisch auf die nicht-kanonische Variante:</strong> Verlinken Menü und Fließtext auf Parameter- oder Nicht-HTTPS-URLs, senden Sie gemischte Signale.</li>',
        '</ol>',
      ].join(''),
    },
    {
      id: 'pruefen',
      h2: 'So prüfen Sie in 2 Minuten, welche kanonische URL Google gewählt hat',
      html: [
        '<p>Verlassen Sie sich nicht allein auf den Quelltext im Browser - entscheidend ist, ob Google Ihren Vorschlag übernommen hat:</p>',
        '<ul>',
        '<li><strong>Google Search Console (URL-Prüfung):</strong> Geben Sie die Adresse oben in die Prüfleiste ein. Unter „Seitenindexierung“ sehen Sie nebeneinander <em>Vom Nutzer festgelegte kanonische URL</em> und <em>Von Google ausgewählte kanonische URL</em>.</li>',
        '<li><strong>Automatischer Check über bis zu 25 Unterseiten:</strong> Unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a> prüft fehlende Canonical Tags, Abweichungen in der Sitemap, Weiterleitungsketten und fehlerhafte <code>hreflang</code>-Verweise ohne Anmeldung.</li>',
        '<li><strong>Komplette Domain-Diagnose:</strong> Bei komplexen Filterstrukturen oder vor einem Relaunch analysieren wir Ihre gesamte URL-Architektur im Rahmen unseres <a href="/de/seo-audit">SEO Audits</a>; begleitend hilft unsere <a href="/de/tools/seo-checkliste">SEO Checkliste (PDF)</a>.</li>',
        '</ul>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zum Canonical Tag',
  faq: [
    {
      id: 'befehl-oder-hinweis',
      question: 'Muss Google sich an mein Canonical Tag halten?',
      answer: 'Nein. Google behandelt rel="canonical" als starkes Signal, nicht als verbindliche Direktive. Wenn andere Signale widersprechen - etwa weil Ihre Sitemap oder internen Links auf eine andere URL zeigen oder der Seiteninhalt gar nicht übereinstimmt -, wählt Google selbstständig eine andere kanonische Adresse.',
    },
    {
      id: 'selbstreferenzierend',
      question: 'Soll jede normale Unterseite auf sich selbst verweisen?',
      answer: 'Ja. Ein selbstreferenzierendes Canonical Tag gilt bei Google als Best Practice. Es schützt die Seite automatisch vor Duplikaten, die von außen entstehen, etwa durch angehängte Kampagnen-Parameter (?utm_medium=…), Session-IDs oder abweichende Groß- und Kleinschreibung.',
    },
    {
      id: 'crawl-budget',
      question: 'Spart das Canonical Tag sofort Crawl-Budget?',
      answer: 'Nur begrenzt. Das Canonical Tag bündelt vor allem Indexierungs- und Linksignale nach dem Abruf; Googlebot muss die Duplikat-URL zunächst trotzdem aufrufen, um das Tag zu lesen. Laut Google ist Crawl-Budget ohnehin primär für sehr große Websites (ab ca. 1 Million Seiten oder 10.000 täglich wechselnden Seiten) relevant.',
    },
    {
      id: 'cross-domain-canonical',
      question: 'Funktioniert ein Canonical Tag auch über zwei verschiedene Domains hinweg?',
      answer: 'Ja. Veröffentlichen Sie einen eigenen Fachartikel wortgleich als Gastbeitrag oder Zweitverwertung auf einem Partnerportal, kann dort ein domainübergreifendes Canonical Tag auf Ihr Original zeigen, damit das Original in der Google-Suche als Hauptquelle erhalten bleibt.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'erkennt fehlende Canonical Tags und unpassende URLs in Ihrer Sitemap' },
    { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste (PDF)', opis: '50 Punkte zu Indexierung, Canonical, Sitemap und On-Page SEO' },
    { href: '/blog/core-web-vitals-a-pozycje-google', tekst: 'Core Web Vitals Leitfaden', opis: 'Grenzwerte für LCP, INP und CLS sowie Messung mit CrUX' },
    { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'vollständige technische Prüfung Ihrer URL- und Indexierungsstruktur' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Doppelte URLs zusammenfassen (rel="canonical", 301, Sitemap - Signalstärke)', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting', nazwa: 'Google Search Central: Probleme mit der Kanonisierung beheben', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading', nazwa: 'Google Search Central: Paginierung und schrittweises Laden (selbstreferenzierendes Canonical je Seite)', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Lokalisierte Versionen Ihrer Seite bereitstellen (hreflang + Canonical)', data: '2026-11-19' },
  ],
};
