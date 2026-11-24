// Presety technologiczne (Fala 1 + Fala 4 airSlate, 24.11.2026):
// 1. Reguly robots.txt dopasowane do stosu CMS/e-commerce (WordPress/WooCommerce, Shopify, Next.js/Vercel, Webflow, PrestaShop)
// 2. Generator bezpetlowych regul przekierowan 301/308 (www vs bez www + koncowy ukosnik) dla 4 serwerow
// 3. Biblioteka walidowanych szablonow @graph JSON-LD dla 6 profili branzowych (PL, EN, DE)
// Czysty modul JS (bez 'use client') bezpieczny zarowno w RSC, jak i komponentach klienckich.

export const PRESETY_CMS_ROBOTS = [
  { id: 'uniwersalny', pl: 'Uniwersalny', en: 'Universal', de: 'Universell' },
  { id: 'wordpress', pl: 'WordPress / WooCommerce', en: 'WordPress / WooCommerce', de: 'WordPress / WooCommerce' },
  { id: 'shopify', pl: 'Shopify', en: 'Shopify', de: 'Shopify' },
  { id: 'nextjs', pl: 'Next.js / Vercel', en: 'Next.js / Vercel', de: 'Next.js / Vercel' },
  { id: 'webflow', pl: 'Webflow', en: 'Webflow', de: 'Webflow' },
  { id: 'prestashop', pl: 'PrestaShop', en: 'PrestaShop', de: 'PrestaShop' },
];

export function dolaczRegulyCmsDoRobots(tekstBazowy, cmsId, domena, lang = 'pl') {
  if (!tekstBazowy || !cmsId || cmsId === 'uniwersalny') return tekstBazowy;
  const host = String(domena || 'twojafirma.pl').replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] || 'twojafirma.pl';

  const naglowki = {
    pl: {
      wordpress: '# Zasady specyficzne dla WordPress + WooCommerce (ochrona crawl budgetu przed parametrami koszyka i filtrami)',
      shopify: '# Zasady specyficzne dla Shopify (blokada koszyka, checkoutu i wielokrotnych tagow kolekcji +)',
      nextjs: '# Zasady specyficzne dla Next.js App Router / Vercel (ochrona endpointow API, otwarte zasoby _next/static)',
      webflow: '# Zasady specyficzne dla Webflow (blokada wewnetrznej wyszukiwarki i parametrow paginacji)',
      prestashop: '# Zasady specyficzne dla PrestaShop (blokada kontrolerow koszyka, zamowien i sortowania)',
    },
    en: {
      wordpress: '# WordPress + WooCommerce specific rules (protects crawl budget from cart & filter query parameters)',
      shopify: '# Shopify specific rules (blocks cart, checkout and multi-tag /collections/*+* bloat)',
      nextjs: '# Next.js App Router / Vercel specific rules (blocks /api/ routes, keeps /_next/static/ renderable)',
      webflow: '# Webflow specific rules (blocks internal site search results and utility endpoints)',
      prestashop: '# PrestaShop specific rules (blocks cart, order controllers and faceted sort parameters)',
    },
    de: {
      wordpress: '# Spezifische Regeln fuer WordPress + WooCommerce (Schutz des Crawl-Budgets vor Warenkorb- und Filterparametern)',
      shopify: '# Spezifische Regeln fuer Shopify (Sperre fuer Warenkorb, Checkout und kombinierte Tag-URLs +)',
      nextjs: '# Spezifische Regeln fuer Next.js App Router / Vercel (API-Routen sperren, /_next/static/ offen halten)',
      webflow: '# Spezifische Regeln fuer Webflow (interne Suchergebnisseiten vom Index ausschliessen)',
      prestashop: '# Spezifische Regeln fuer PrestaShop (Warenkorb-Controller und Sortierparameter ausschliessen)',
    },
  };

  const t = naglowki[lang] || naglowki.pl;
  let blok = '';

  if (cmsId === 'wordpress') {
    blok = [
      t.wordpress,
      'User-agent: *',
      'Disallow: /wp-admin/',
      'Allow: /wp-admin/admin-ajax.php',
      'Allow: /wp-content/uploads/',
      'Disallow: /wp-login.php',
      'Disallow: /xmlrpc.php',
      'Disallow: /*?s=',
      'Disallow: /search/',
      'Disallow: /*?add-to-cart=',
      'Disallow: /*?orderby=',
      'Disallow: /wc-api/',
      'Disallow: /cart/',
      'Disallow: /koszyk/',
      'Disallow: /checkout/',
      'Disallow: /zamowienie/',
      'Disallow: /my-account/',
      'Disallow: /moje-konto/',
    ].join('\n');
  } else if (cmsId === 'shopify') {
    blok = [
      t.shopify,
      'User-agent: *',
      'Disallow: /admin',
      'Disallow: /cart',
      'Disallow: /orders',
      'Disallow: /checkouts/',
      'Disallow: /checkout',
      'Disallow: /carts',
      'Disallow: /account',
      'Disallow: /collections/*sort_by*',
      'Disallow: /collections/*+*',
      'Disallow: /search',
    ].join('\n');
  } else if (cmsId === 'nextjs') {
    blok = [
      t.nextjs,
      'User-agent: *',
      'Allow: /_next/static/',
      'Allow: /_next/image',
      'Disallow: /api/',
      'Disallow: /_next/data/',
      `# Vercel Preview: ustaw dodatkowo X-Robots-Tag: noindex dla *.vercel.app poza produkcja https://www.${host}`,
    ].join('\n');
  } else if (cmsId === 'webflow') {
    blok = [
      t.webflow,
      'User-agent: *',
      'Disallow: /search',
      'Disallow: /*?search=',
      'Disallow: /paypal-checkout',
      'Disallow: /order-confirmation',
    ].join('\n');
  } else if (cmsId === 'prestashop') {
    blok = [
      t.prestashop,
      'User-agent: *',
      'Disallow: /*controller=cart',
      'Disallow: /*controller=order',
      'Disallow: /*controller=authentication',
      'Disallow: /*controller=my-account',
      'Disallow: /*controller=search',
      'Disallow: /*orderby=',
      'Disallow: /*orderway=',
      'Disallow: /*n=',
      'Disallow: /modules/',
      'Allow: /modules/*.css',
      'Allow: /modules/*.js',
    ].join('\n');
  }

  if (!blok) return tekstBazowy;

  // Wstawiamy blok CMS tuz przed końcową sekcją User-agent: * lub Sitemap:
  const idx = tekstBazowy.lastIndexOf('User-agent: *');
  if (idx !== -1) {
    const przed = tekstBazowy.slice(0, idx).trimEnd();
    const sitemapy = (tekstBazowy.slice(idx).match(/^Sitemap:.*$/gm) || [`Sitemap: https://www.${host}/sitemap.xml`]).join('\n');
    return `${przed}\n\n${blok}\nAllow: /\n${sitemapy}\n`;
  }
  return `${tekstBazowy.trimEnd()}\n\n${blok}\n`;
}

export function zbudujRegulePrzekierowan(surowaDomena, serwer = 'nextjs', celWww = 'www', bezTrailingSlash = true, lang = 'pl') {
  const czysta = String(surowaDomena || 'twojafirma.pl')
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .toLowerCase() || 'twojafirma.pl';

  const docelowyHost = celWww === 'www' ? `www.${czysta}` : czysta;
  const alternatywnyHost = celWww === 'www' ? czysta : `www.${czysta}`;

  const kom = {
    pl: `Bezpetlowe przekierowanie 1-skokowe na https://${docelowyHost}${bezTrailingSlash ? ' (bez koncowego /)' : ' (z koncowym /)'}`,
    en: `Loop-safe 1-hop canonical redirect to https://${docelowyHost}${bezTrailingSlash ? ' (no trailing slash)' : ' (with trailing slash)'}`,
    de: `Schleifenfreie 1-Hop-Weiterleitung auf https://${docelowyHost}${bezTrailingSlash ? ' (ohne Schrägstrich am Ende)' : ' (mit Schrägstrich am Ende)'}`,
  }[lang] || '';

  if (serwer === 'nextjs') {
    return `// next.config.mjs - ${kom}
const nextConfig = {
  trailingSlash: ${!bezTrailingSlash},
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '${alternatywnyHost}' }],
        destination: 'https://${docelowyHost}/:path*${!bezTrailingSlash ? '/' : ''}',
        permanent: true, // HTTP 308
      },
    ];
  },
};
export default nextConfig;`;
  }

  if (serwer === 'nginx') {
    const slashRule = bezTrailingSlash
      ? `  # Usuniecie koncowego ukosnika poza strona glowna /\n  rewrite ^/(.*)/$ https://${docelowyHost}/$1 permanent;\n`
      : '';
    return `# /etc/nginx/sites-available/${czysta}.conf - ${kom}
server {
  listen 80;
  listen [::]:80;
  server_name ${czysta} www.${czysta};
  return 301 https://${docelowyHost}$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${alternatywnyHost};
  return 301 https://${docelowyHost}$request_uri;
}

server {
  listen 443 ssl http2;
  server_name ${docelowyHost};
${slashRule}  # dalsza konfiguracja aplikacji...
}`;
  }

  if (serwer === 'htaccess') {
    const condHost = celWww === 'www' ? `!^www\\.` : `^www\\.(.+)$`;
    const slashBlock = bezTrailingSlash
      ? `\n# Usuniecie koncowego ukosnika (poza istniejacymi katalogami)\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_URI} (.+)/$\nRewriteRule ^ %1 [R=301,L]`
      : '';
    return `# .htaccess (Apache) - ${kom}
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ${condHost} [NC]
RewriteRule ^ https://${docelowyHost}%{REQUEST_URI} [R=301,L,NE]${slashBlock}`;
  }

  // Cloudflare Redirect Rules (Single Redirect)
  return `# Cloudflare -> Rules -> Redirect Rules (Single Redirect) - ${kom}
# Expression:
(http.host eq "${alternatywnyHost}") or (not ssl)

# Target URL (Dynamic, Status: 301):
concat("https://${docelowyHost}", http.request.uri.path, http.request.uri.query != "" ? concat("?", http.request.uri.query) : "")`;
}

export const PRESETY_BRANZ_JSONLD = [
  { id: 'b2b', pl: 'Firma B2B / Agencja', en: 'B2B / Agency', de: 'B2B / Agentur' },
  { id: 'medycyna', pl: 'Klinika / Gabinet (MedicalClinic)', en: 'Medical Clinic (MedicalClinic)', de: 'Klinik / Praxis (MedicalClinic)' },
  { id: 'prawo', pl: 'Kancelaria prawna (LegalService)', en: 'Law Firm (LegalService)', de: 'Kanzlei (LegalService)' },
  { id: 'finanse', pl: 'Finanse / Księgowość (FinancialService)', en: 'Finance / Accounting (FinancialService)', de: 'Finanzen / Steuerberatung (FinancialService)' },
  { id: 'saas', pl: 'SaaS / Aplikacja (SoftwareApplication)', en: 'SaaS / App (SoftwareApplication)', de: 'SaaS / Software (SoftwareApplication)' },
  { id: 'produkcja', pl: 'Producent przemysłowy (Brand + Product)', en: 'Industrial Manufacturer', de: 'Industrie & Produktion' },
];

export function zbudujGrafBranzowyJsonLd(surowaDomena, branzaId = 'b2b', lang = 'pl') {
  const czysta = String(surowaDomena || (lang === 'de' ? 'ihrefirma.de' : lang === 'en' ? 'yourcompany.com' : 'twojafirma.pl'))
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .toLowerCase() || 'twojafirma.pl';
  const baza = `https://www.${czysta}`;
  const nazwa = czysta.split('.')[0].toUpperCase();
  const inLang = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-US' : 'pl-PL';
  const kraj = lang === 'de' ? 'DE' : lang === 'en' ? 'US' : 'PL';
  const waluta = lang === 'de' ? 'EUR' : lang === 'en' ? 'USD' : 'PLN';

  const wspolnaOrg = {
    '@type': 'Organization',
    '@id': `${baza}/#organization`,
    name: nazwa,
    url: `${baza}/`,
    logo: { '@type': 'ImageObject', url: `${baza}/logo.png`, width: 512, height: 512 },
    taxID: lang === 'pl' ? '0000000000' : undefined,
    sameAs: [
      `https://www.linkedin.com/company/${czysta.split('.')[0]}`,
    ],
  };
  if (!wspolnaOrg.taxID) delete wspolnaOrg.taxID;

  const wspolnaStrona = {
    '@type': 'WebSite',
    '@id': `${baza}/#website`,
    url: `${baza}/`,
    name: nazwa,
    inLanguage: inLang,
    publisher: { '@id': `${baza}/#organization` },
  };

  let specyficzny = [];

  if (branzaId === 'medycyna') {
    specyficzny = [
      {
        '@type': 'MedicalClinic',
        '@id': `${baza}/#clinic`,
        name: nazwa,
        url: `${baza}/`,
        parentOrganization: { '@id': `${baza}/#organization` },
        medicalSpecialty: ['Dentistry', 'Dermatology'],
        telephone: lang === 'de' ? '+49301234567' : '+48221234567',
        address: {
          '@type': 'PostalAddress',
          streetAddress: lang === 'de' ? 'Musterstrasse 10' : lang === 'en' ? '100 Main St' : 'ul. Przykładowa 10',
          postalCode: lang === 'de' ? '10115' : lang === 'en' ? '10001' : '00-001',
          addressLocality: lang === 'de' ? 'Berlin' : lang === 'en' ? 'New York' : 'Warszawa',
          addressCountry: kraj,
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
        ],
      },
      {
        '@type': 'Physician',
        '@id': `${baza}/#chief-doctor`,
        name: lang === 'de' ? 'Dr. med. Max Mustermann' : lang === 'en' ? 'Dr. Jane Doe, MD' : 'lek. Jan Kowalski',
        worksFor: { '@id': `${baza}/#clinic` },
      },
    ];
  } else if (branzaId === 'prawo') {
    specyficzny = [
      {
        '@type': 'LegalService',
        '@id': `${baza}/#law-office`,
        name: nazwa,
        url: `${baza}/`,
        parentOrganization: { '@id': `${baza}/#organization` },
        priceRange: '$$',
        knowsAbout: lang === 'de'
          ? ['Gesellschaftsrecht', 'IT-Recht', 'DSGVO']
          : lang === 'en'
          ? ['Corporate Law', 'M&A', 'Data Privacy']
          : ['Prawo spółek handlowych', 'Umowy B2B i IT', 'RODO'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: lang === 'de' ? 'Kanzleistrasse 5' : lang === 'en' ? '200 Legal Ave' : 'ul. Wspólna 12',
          postalCode: lang === 'de' ? '80331' : lang === 'en' ? '10005' : '00-519',
          addressLocality: lang === 'de' ? 'Muenchen' : lang === 'en' ? 'New York' : 'Warszawa',
          addressCountry: kraj,
        },
      },
    ];
  } else if (branzaId === 'finanse') {
    specyficzny = [
      {
        '@type': ['FinancialService', 'AccountingService'],
        '@id': `${baza}/#financial-service`,
        name: nazwa,
        url: `${baza}/`,
        parentOrganization: { '@id': `${baza}/#organization` },
        areaServed: kraj,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'de' ? 'Buchhaltung & Steuerberatung' : lang === 'en' ? 'B2B Accounting & Advisory' : 'Obsługa księgowa i kadrowo-płacowa spółek',
        },
      },
    ];
  } else if (branzaId === 'saas') {
    specyficzny = [
      {
        '@type': 'SoftwareApplication',
        '@id': `${baza}/#app`,
        name: nazwa,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${baza}/`,
        publisher: { '@id': `${baza}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '49.00',
          priceCurrency: waluta,
          url: `${baza}/pricing`,
        },
      },
    ];
  } else if (branzaId === 'produkcja') {
    specyficzny = [
      {
        '@type': 'Brand',
        '@id': `${baza}/#brand`,
        name: nazwa,
        logo: `${baza}/logo.png`,
      },
      {
        '@type': 'Service',
        '@id': `${baza}/#manufacturing`,
        name: lang === 'de' ? 'Lohnfertigung & CNC-Produktion nach ISO 9001' : lang === 'en' ? 'ISO 9001 Industrial & Contract Manufacturing' : 'Produkcja przemysłowa i obróbka CNC wg ISO 9001',
        provider: { '@id': `${baza}/#organization` },
        brand: { '@id': `${baza}/#brand` },
        areaServed: ['PL', 'DE', 'EU'],
      },
    ];
  } else {
    specyficzny = [
      {
        '@type': 'ProfessionalService',
        '@id': `${baza}/#localbusiness`,
        name: nazwa,
        url: `${baza}/`,
        parentOrganization: { '@id': `${baza}/#organization` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: lang === 'de' ? 'Hauptstrasse 1' : lang === 'en' ? '100 Market St' : 'ul. Grzybowska 5A',
          postalCode: lang === 'de' ? '10115' : lang === 'en' ? '10001' : '00-132',
          addressLocality: lang === 'de' ? 'Berlin' : lang === 'en' ? 'New York' : 'Warszawa',
          addressCountry: kraj,
        },
      },
      {
        '@type': 'Person',
        '@id': `${baza}/#founder`,
        name: lang === 'de' ? 'Name der Geschaeftsfuehrung' : lang === 'en' ? 'Founder Full Name' : 'Imię i Nazwisko Eksperta',
        worksFor: { '@id': `${baza}/#organization` },
      },
    ];
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [wspolnaOrg, wspolnaStrona, ...specyficzny],
    },
    null,
    2
  );
}
