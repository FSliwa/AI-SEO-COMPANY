// Szablon „Schema Markup Beispiele” (Faza 2 DE, 19.11.2026): niemiecki blok `de` dla lib/szablony/dane-strukturalne-json-ld.js
// (PL /narzedzia/dane-strukturalne-json-ld, EN /en/tools/schema-markup-examples, DE /de/tools/schema-markup-beispiele).
// Treść napisana od zera po niemiecku pod frazę „schema markup” / „schema markup beispiele” (480/mies. DE).
// 7 kopierfertige JSON-LD-Vorlagen gemäß Google Search Central (Stand November 2026, inkl. Hinweis zu eingestellten Typen FAQPage/HowTo).

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Einführung in strukturierte Daten (JSON-LD-Empfehlung, keine Garantie für Rich-Suchergebnisse)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/sd-policies', nazwa: 'Google Search Central: Allgemeine Richtlinien für strukturierte Daten (Übereinstimmung mit sichtbarem Seiteninhalt)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/organization', nazwa: 'Google Search Central: Strukturierte Daten für Organization (Logo, Adresse, vatID, sameAs)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: Strukturierte Daten für LocalBusiness (Pflichtfelder name und address)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/article', nazwa: 'Google Search Central: Strukturierte Daten für Article', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen und Ihre Website (kein spezielles KI-Schema nötig)', data: '2026-11-11' },
  { url: 'https://search.google.com/test/rich-results', nazwa: 'Google: Test für Rich-Suchergebnisse (Rich Results Test)', data: '2026-11-19' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const kod = (obj) => `<pre><code>${esc(JSON.stringify(obj, null, 2))}</code></pre>`;

export const WZORY_JSONLD_DE = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Muster GmbH',
    url: 'https://www.beispiel-firma.de',
    logo: 'https://www.beispiel-firma.de/images/logo.png',
    email: 'kontakt@beispiel-firma.de',
    telephone: '+49-30-1234567',
    vatID: 'DE123456789',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 12',
      postalCode: '10115',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    sameAs: ['https://www.linkedin.com/company/beispiel-firma'],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muster GmbH',
    url: 'https://www.beispiel-firma.de',
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Muster Beratung München',
    url: 'https://www.beispiel-firma.de/standort-muenchen',
    image: 'https://www.beispiel-firma.de/images/buero-muenchen.jpg',
    telephone: '+49-89-7654321',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Leopoldstraße 45',
      postalCode: '80802',
      addressLocality: 'München',
      addressCountry: 'DE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.15982, longitude: 11.58612 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.beispiel-firma.de/' },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://www.beispiel-firma.de/leistungen' },
      { '@type': 'ListItem', position: 3, name: 'SEO Audit' },
    ],
  },
  article: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Core Web Vitals optimieren: Praxis-Leitfaden',
    datePublished: '2026-09-15',
    dateModified: '2026-11-19',
    image: ['https://www.beispiel-firma.de/images/cwv-leitfaden.jpg'],
    author: [{ '@type': 'Person', name: 'Max Mustermann', url: 'https://www.beispiel-firma.de/team/max-mustermann' }],
    publisher: { '@type': 'Organization', name: 'Muster GmbH', logo: { '@type': 'ImageObject', url: 'https://www.beispiel-firma.de/images/logo.png' } },
  },
  profilePage: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Max Mustermann',
      jobTitle: 'Leiter Technisches SEO',
      worksFor: { '@type': 'Organization', name: 'Muster GmbH' },
      sameAs: ['https://www.linkedin.com/in/max-mustermann'],
    },
  },
  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Technischer Website-Check (Festpreis)',
    image: ['https://www.beispiel-firma.de/images/website-check.jpg'],
    description: 'Vollständige technische Prüfung inklusive Maßnahmenplan.',
    offers: {
      '@type': 'Offer',
      url: 'https://www.beispiel-firma.de/website-check',
      priceCurrency: 'EUR',
      price: '350.00',
      availability: 'https://schema.org/InStock',
    },
  },
};

const SZABLON_SCHEMA_DE = {
  seo: {
    tytul: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen als PDF',
    opis: 'Kostenlose Schema Markup Beispiele in JSON-LD: 7 Vorlagen (Organization, LocalBusiness, Article, Product, BreadcrumbList) mit Checkliste und PDF-Download.',
  },
  de: {
    okruszek: 'Schema Markup Beispiele',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen für Websites',
    lead: 'Strukturierte Daten nach Schema.org erklären Suchmaschinen im Format JSON-LD eindeutig, ob eine Seite ein Unternehmen mit Anschrift, einen Fachartikel mit Autor oder ein Angebot mit Preis zeigt. Unten finden Sie 7 getestete Schema Markup Beispiele zum Kopieren, eine Zuordnung nach Seitentyp, eine Liste veralteter Typen (Stand November 2026) und das komplette Arbeitspaket als PDF.',
    karta: {
      nazwa: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen (PDF)',
      opis: 'Stammdatenblatt, Seitentyp-Matrix, 7 kopierfertige JSON-LD-Blöcke, Prüfcheckliste und Testprotokoll.',
      cta: 'Vorlagen herunterladen',
    },
    sekcje: [
      {
        id: 'warum-json-ld',
        h2: 'Was Schema Markup bewirkt - und warum Google JSON-LD empfiehlt',
        html: [
          '<p><strong>Schema Markup</strong> (strukturierte Daten) ist ein maschinenlesbarer Codeblock im Vokabular von <code>schema.org</code>, den Sie im <code>&lt;head&gt;</code> oder <code>&lt;body&gt;</code> Ihrer Seite einbinden: <code>&lt;script type="application/ld+json"&gt;…&lt;/script&gt;</code>. Google unterstützt zwar auch Microdata und RDFa, empfiehlt in der Dokumentation aber ausdrücklich <strong>JSON-LD</strong>, weil der Block getrennt vom sichtbaren HTML-Layout liegt und bei Design-Änderungen nicht kaputtgeht.</p>',
          '<p>Wichtig für realistische Erwartungen: Strukturierte Daten sind kein direkter Ranking-Booster. Sie helfen Google beim Verstehen von Entitäten und machen Seiten für <strong>Rich-Suchergebnisse</strong> (z. B. Brotkrumen, Produktpreise oder Unternehmensdetails) berechtigt. Ob ein Rich-Ergebnis tatsächlich ausgespielt wird, entscheidet Google je nach Suchanfrage selbst.</p>',
        ].join(''),
      },
      {
        id: 'welche-typen-fuer-wen',
        h2: 'Welche 7 Schema-Typen eine Unternehmenswebsite wirklich braucht',
        html: '<p>Wenige, vollständig und wahrheitsgemäß ausgefüllte Typen sind besser als zwanzig halb leere Blöcke. Jede Angabe im JSON-LD muss auch für Besucherinnen und Besucher sichtbar auf der Seite stehen.</p>',
        tabela: {
          id: 'tabelle-schema-matrix',
          caption: 'Zuordnung der 7 JSON-LD-Vorlagen zu den Seitentypen Ihrer Website',
          columns: [
            { key: 'seite', label: 'Seitentyp' },
            { key: 'typ', label: 'Empfohlener JSON-LD-Typ' },
            { key: 'pflicht', label: 'Wichtige Felder & Regeln' },
          ],
          rows: [
            { seite: 'Startseite / Über uns', typ: 'Organization + WebSite', pflicht: 'name, url, logo, Anschrift, Telefon, USt-IdNr. (vatID), offizielle Profile in sameAs' },
            { seite: 'Standortseite / lokaler Betrieb', typ: 'LocalBusiness (oder spezifischer Subtyp)', pflicht: 'Pflicht bei Google: name und address; zusätzlich Telefon, Öffnungszeiten, Geo-Koordinaten' },
            { seite: 'Alle Unterseiten', typ: 'BreadcrumbList', pflicht: 'Mindestens 2 ListItem-Einträge entsprechend dem echten Navigationspfad' },
            { seite: 'Blogbeitrag / Ratgeber', typ: 'Article', pflicht: 'headline, datePublished, dateModified, author (als Person mit Profil-URL), Bild' },
            { seite: 'Autoren- / Teamprofil', typ: 'ProfilePage mit Person', pflicht: 'mainEntity mit Name, Funktion, Arbeitgeber und verifizierbaren sameAs-Links' },
            { seite: 'Produkt- / Festpreisseite', typ: 'Product mit Offer', pflicht: 'name, image und offers (price, priceCurrency, availability) sichtbar auf der Seite' },
          ],
        },
      },
      {
        id: 'was-nicht-mehr-lohnt',
        h2: 'Was Sie 2026 für Google nicht mehr neu einbauen müssen',
        html: [
          '<p>In vielen älteren SEO-Artikeln stehen noch Empfehlungen für Markup-Typen, die Google inzwischen eingestellt oder stark eingeschränkt hat:</p>',
          '<ul>',
          '<li><strong>FAQPage für normale Unternehmensseiten:</strong> Google zeigt FAQ-Aufklapper in den Suchergebnissen für reguläre Websites nicht mehr an (Dokumentation für allgemeine Seiten Mitte 2026 entfernt). Vorhandenes Markup schadet nicht, bringt aber keinen Rich-Snippet-Effekt mehr.</li>',
          '<li><strong>HowTo-Markup:</strong> Bereits seit September 2023 in den Google-Suchergebnissen eingestellt.</li>',
          '<li><strong>Sitelinks-Suchfeld (SearchAction in WebSite):</strong> Von Google Ende 2024 eingestellt; ein einfacher <code>WebSite</code>-Block mit <code>name</code> und <code>url</code> für den Website-Namen genügt.</li>',
          '<li><strong>Eigene Sternebewertungen (aggregateRating) über die eigene Firma:</strong> Google vergibt für „self-serving reviews“ zu <code>LocalBusiness</code> oder <code>Organization</code> keine Sterne und wertet Missbrauch als Richtlinienverstoß.</li>',
          '<li><strong>Spezielles „KI-Schema“:</strong> Laut Google Search Central sind für Google AI Overviews und den KI-Modus keine besonderen Schema-Typen erforderlich - sauberes Standard-Markup und sichtbarer HTML-Text reichen aus.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'testen-und-fehler',
        h2: 'So prüfen Sie Ihr JSON-LD vor und nach dem Livegang',
        html: [
          '<ol>',
          '<li><strong>Stammdaten abgleichen:</strong> Name, Straße, Postleitzahl und Telefonnummer müssen Zeichen für Zeichen mit Ihrem Impressum und Google Unternehmensprofil übereinstimmen (gut kombinierbar mit unserer <a href="/de/tools/e-e-a-t-checkliste">E-E-A-T Checkliste</a>).</li>',
          '<li><strong>Vor dem Veröffentlichen validieren:</strong> Prüfen Sie das Code-Snippet im offiziellen <em>Test für Rich-Suchergebnisse</em> von Google (Berechtigung für Google-Funktionen) sowie im <em>Schema Markup Validator</em> auf schema.org (allgemeine JSON-LD-Syntax).</li>',
          '<li><strong>Doppelte Blöcke vermeiden:</strong> Kontrollieren Sie im Seitenquelltext, ob Ihr CMS-Theme und ein SEO-Plugin denselben Typ zweimal mit widersprüchlichen Angaben ausgeben.</li>',
          '<li><strong>Live-Prüfung über 25 Unterseiten:</strong> Unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a> prüft automatisch, ob die Startseite Unternehmensdaten im JSON-LD besitzt und ob Syntaxfehler in eingebundenen Skriptblöcken vorliegen.</li>',
          '</ol>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau: Alle 7 JSON-LD Beispiele zum Kopieren',
      opis: 'Ersetzen Sie alle Beispielwerte (beispiel-firma.de, Musterstraße) durch Ihre echten Unternehmensdaten und löschen Sie optionale Zeilen, die nicht zutreffen.',
      html: [
        '<h3>1. Organization (Startseite oder Über uns)</h3>',
        kod(WZORY_JSONLD_DE.organization),
        '<h3>2. WebSite (nur Startseite)</h3>',
        kod(WZORY_JSONLD_DE.website),
        '<h3>3. LocalBusiness / ProfessionalService (Standortseite)</h3>',
        kod(WZORY_JSONLD_DE.localBusiness),
        '<h3>4. BreadcrumbList (Unterseiten)</h3>',
        kod(WZORY_JSONLD_DE.breadcrumb),
        '<h3>5. Article (Blogbeitrag / Ratgeber)</h3>',
        kod(WZORY_JSONLD_DE.article),
        '<h3>6. ProfilePage mit Person (Autorenseite)</h3>',
        kod(WZORY_JSONLD_DE.profilePage),
        '<h3>7. Product mit Offer (Produkt- oder Festpreisseite)</h3>',
        kod(WZORY_JSONLD_DE.product),
      ].join(''),
    },
    formularz: {
      h2: 'Schema Markup Beispiele herunterladen (PDF)',
      opis: 'Sichern Sie sich das PDF mit Stammdatenblatt, Seitentyp-Matrix, allen 7 JSON-LD-Vorlagen, Vorab-Checkliste und Testprotokoll für Ihr Entwicklerteam.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'JSON-LD Vorlagen als PDF senden',
      przedmiot: 'die Schema Markup Beispiele (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zum PDF mit den 7 JSON-LD-Vorlagen kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Verbessert Schema Markup direkt meine Google-Positionen?',
        answer: 'Nein, Google verspricht keinen direkten Ranking-Vorteil durch strukturierte Daten. Das Markup hilft Suchmaschinen jedoch beim eindeutigen Zuordnen von Unternehmen, Autoren und Preisen und qualifiziert Seiten für auffälligere Rich-Suchergebnisse mit oft höherer Klickrate.',
      },
      {
        question: 'Soll ich JSON-LD oder Microdata verwenden?',
        answer: 'Verwenden Sie JSON-LD. Google verarbeitet zwar auch Microdata und RDFa, empfiehlt aber JSON-LD, weil das Skript sauber vom sichtbaren HTML getrennt bleibt und bei Template-Anpassungen deutlich seltener beschädigt wird.',
      },
      {
        question: 'Mit welchem kostenlosen Tool prüfe ich strukturierte Daten?',
        answer: 'Nutzen Sie zwei kostenlose Prüfwerkzeuge: Googles „Test für Rich-Suchergebnisse“ (search.google.com/test/rich-results) zeigt Pflichtfelder für Google-Funktionen, während der „Schema Markup Validator“ (validator.schema.org) die allgemeine Syntax nach Schema.org kontrolliert. Zusätzlich erkennt unser kostenloser SEO Audit defekte JSON-LD-Blöcke.',
      },
      {
        question: 'Brauche ich spezielles Schema Markup für ChatGPT und Google AI Overviews?',
        answer: 'Nein. Google betont in seiner Dokumentation zu KI-Funktionen, dass kein spezielles „KI-Markup“ existiert. Entscheidend ist, dass das reguläre Organization-, LocalBusiness- oder Article-Markup exakt mit dem im HTML sichtbaren Text übereinstimmt.',
      },
      {
        question: 'Warum zeigt Google trotz fehlerfreiem FAQPage-Markup keine FAQ-Sterne oder Aufklapper an?',
        answer: 'Google hat FAQ-Rich-Ergebnisse für gewöhnliche Unternehmenswebsites eingestellt. Selbst technisch fehlerfreier Code führt deshalb nicht mehr zu einer erweiterten Darstellung auf der Ergebnisseite. Lassen Sie sichtbare Fragen und Antworten trotzdem auf der Seite, wenn sie Ihren Besuchern helfen.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft JSON-LD-Syntax und Organization-Markup auf bis zu 25 Seiten' },
      { href: '/narzedzia/checklista-e-e-a-t', tekst: 'E-E-A-T Checkliste', opis: '36 Prüfpunkte zu Anbietertransparenz, Autoren und Vertrauen' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste', opis: '50 Punkte für Technik, On-Page SEO und Messung' },
      { href: '/pozycjonowanie-w-ai', tekst: 'Generative Engine Optimization (GEO)', opis: 'wie KI-Antwortmaschinen strukturierte Unternehmensdaten nutzen' },
      { href: '/audyt-seo', tekst: 'SEO Audit', opis: 'komplette technische Prüfung inklusive Schema.org-Implementierungsplan' },
    ],
    plikNazwa: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen (PDF)',
  },
};

export default SZABLON_SCHEMA_DE;
