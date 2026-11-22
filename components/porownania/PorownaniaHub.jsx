import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import { BlokCta } from '@/components/porownania/PorownanieLayout';
import { Link } from '@/i18n/routing';
import { slugiOpublikowane } from '@/lib/publikacja';
import { CHECKLIST_COUNT } from '@/lib/agencySwitch';
import { hrefWJezyku } from '@/lib/linkiEn';
import { hubDla, porownaniaDla, akapitMetodyHubaDla, dataEn } from '@/lib/porownania.en';
import kosm from '@/components/KosmetykaSekcji.module.css';
import styles from './porownania.module.css';

// Hub /porownania (5.11.2026; PLAN-v2 6.1, brief-hub-porownania.md, CB-09).
// Karty, tabela decyzji i ItemList powstają WYŁĄCZNIE z porównań, które przechodzą bramkę
// publikacji (slugiOpublikowane z lib/publikacja.js), w kolejności z lib/porownania.js.
// Publikacja P3 albo P6 dokłada kartę, wiersz tabeli i pozycję ItemList bez zmian w tym pliku.
// Karty pokazują teaser (inny niż Krótka odpowiedź strony), datę aktualizacji i liczbę kryteriów.
// 9.11.2026: prop locale ('pl' | 'en'): EN bierze dane z lib/porownania.en.js (HUB_EN, porownaniaEn), te same bramki publikacji.
// Okruszki 2-poziomowe (Breadcrumbs bez parent) = jedyny BreadcrumbList na stronie.

const BASE = 'https://www.ai-seo-company.pl';
const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

function dataSlownie(iso) {
  const [rok, mies, dzien] = iso.split('-').map(Number);
  return `${dzien} ${MIESIACE[mies - 1]} ${rok}`;
}

export function opublikowanePorownania(locale = 'pl') {
  const slugi = new Set(slugiOpublikowane('/porownania/'));
  return porownaniaDla(locale).filter((p) => slugi.has(p.slug));
}

function SchemaHuba({ lista, HUB, locale }) {
  const en = locale === 'en';
  const adres = (sciezkaPl) => (en ? hrefWJezyku(sciezkaPl, 'en') : sciezkaPl);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE}${adres(HUB.sciezka)}#webpage`,
    url: `${BASE}${adres(HUB.sciezka)}`,
    name: HUB.title,
    description: HUB.description,
    inLanguage: en ? 'en' : 'pl',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    datePublished: HUB.published,
    dateModified: HUB.updated,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: lista.length,
      itemListElement: lista.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}${adres(`/porownania/${p.slug}`)}`,
        name: p.nazwaKarty,
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

const h2Styl = { fontSize: 'clamp(1.5rem, 3.2vw, 2.05rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 1rem', color: 'var(--w-tusz)' };

const T = {
  pl: {
    okruszek: 'Porównania',
    tag: 'Porównania',
    h2Lista: 'Porównania',
    aktualizacja: 'aktualizacja: ',
    h2Decyzja: 'Przed jaką decyzją stoisz?',
    caption: 'Które porównanie odpowiada na Twoje pytanie',
    kolumny: { pytanie: 'Twoje pytanie', porownanie: 'Porównanie', skrot: 'W skrócie' },
    h2Metoda: 'Jak przygotowujemy porównania',
    h2Zanim: 'Zanim wybierzesz agencję',
  },
  en: {
    okruszek: 'Comparisons',
    tag: 'Comparisons',
    h2Lista: 'Comparisons',
    aktualizacja: 'updated: ',
    h2Decyzja: 'What decision are you facing?',
    caption: 'Which comparison answers your question',
    kolumny: { pytanie: 'Your question', porownanie: 'Comparison', skrot: 'In short' },
    h2Metoda: 'How we prepare comparisons',
    h2Zanim: 'Before you choose an agency',
  },
};

const GRUPY_SKROTOW = [
  {
    klucz: 'wspolpraca',
    pl: 'Model współpracy',
    en: 'Pricing & agency',
    slugi: ['pozycjonowanie-za-efekt-czy-abonament', 'jak-wybrac-agencje-seo', 'agencja-seo-czy-freelancer', 'seo-w-firmie-czy-agencja-seo'],
  },
  {
    klucz: 'kanaly',
    pl: 'SEO, GEO i Ads',
    en: 'SEO, GEO & Ads',
    slugi: ['seo-vs-geo', 'seo-czy-google-ads'],
  },
  {
    klucz: 'cms',
    pl: 'CMS i kod',
    en: 'CMS & code',
    slugi: ['nextjs-vs-wordpress-seo', 'webflow-vs-wordpress-seo', 'strona-kodowana-czy-kreator-seo'],
  },
  {
    klucz: 'metryki',
    pl: 'Metryki i pliki AI',
    en: 'Metrics & AI files',
    slugi: ['ahrefs-dr-vs-moz-da-vs-common-crawl', 'llms-txt-vs-robots-txt-vs-sitemap-xml'],
  },
];

export default function PorownaniaHub({ locale = 'pl' }) {
  const en = locale === 'en';
  const t = T[en ? 'en' : 'pl'];
  const HUB = hubDla(locale);
  const lista = opublikowanePorownania(locale);
  const dostepneSlugi = new Set(lista.map((p) => p.slug));
  const skrotyGrup = GRUPY_SKROTOW
    .map((g) => {
      const trafienia = g.slugi.filter((s) => dostepneSlugi.has(s));
      if (!trafienia.length) return null;
      return {
        klucz: g.klucz,
        href: `#porownanie-${trafienia[0]}`,
        etykieta: en ? g.en : g.pl,
        liczba: trafienia.length,
      };
    })
    .filter(Boolean);
  const sumaStr = String(lista.length).padStart(2, '0');
  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Porównania" en="Comparisons" />
      <SchemaHuba lista={lista} HUB={HUB} locale={locale} />

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '2rem' }}>
        <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
          <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {t.tag}
        </div>
        <h1 style={{ fontSize: 'clamp(2.15rem, 5vw, 3.35rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.04em', margin: '0.5rem 0 1rem', color: 'var(--w-tusz)' }}>
          {HUB.h1}
        </h1>
        <Byline sciezka={HUB.sciezka} data={HUB.updated} takzeEn style={{ margin: '0 0 1rem' }} />
        <p style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', maxWidth: '760px' }}>{HUB.lead}</p>
        <nav className={kosm.pasekSkrotow} aria-label={en ? 'Jump to comparison group or section' : 'Przejdź do grupy porównań lub sekcji'}>
          {skrotyGrup.map((g) => (
            <a key={g.klucz} href={g.href} className={kosm.pigulkaSkrotu}>
              <span>{g.etykieta}</span>
              <span className={kosm.pigulkaKod} aria-hidden="true">{String(g.liczba).padStart(2, '0')}</span>
            </a>
          ))}
          <a href="#przed-jaka-decyzja" className={kosm.pigulkaSkrotu}>
            <span>{en ? 'Decision matrix' : 'Tabela decyzji'}</span>
            <span className={kosm.pigulkaKod} aria-hidden="true">↓</span>
          </a>
          <a href="#zanim-wybierzesz" className={kosm.pigulkaSkrotu}>
            <span>{en ? 'Before switching' : 'Przed zmianą'}</span>
            <span className={kosm.pigulkaKod} aria-hidden="true">↓</span>
          </a>
        </nav>
      </div>

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', paddingBottom: '3rem' }}>
        <div id="lista-porownan" role="region" aria-labelledby="lista-porownan-naglowek" style={{ scrollMarginTop: '110px' }}>
          <h2 id="lista-porownan-naglowek" style={h2Styl}>{t.h2Lista}</h2>
          <div className={styles.siatkaKart}>
            {lista.map((p, idx) => (
              <div key={p.slug} id={`porownanie-${p.slug}`} className={styles.kartaPorownania} style={{ scrollMarginTop: '110px' }}>
                <div className={kosm.kartaPorownaniaKicker} aria-hidden="true">
                  <span className={kosm.kartaPorownaniaNr}>{String(idx + 1).padStart(2, '0')} / {sumaStr}</span>
                  <span>{p.kryteria}</span>
                </div>
                <h3 className={styles.kartaTytul}>
                  <Link href={`/porownania/${p.slug}`}>{p.nazwaKarty}</Link> <span aria-hidden="true">→</span>
                </h3>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p.teaser}</p>
                <p className={styles.kartaMeta}>
                  {p.kryteria} · {t.aktualizacja}<time data-lastmod="pomin" dateTime={p.updated}>{en ? dataEn(p.updated) : dataSlownie(p.updated)}</time>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="przed-jaka-decyzja" className={styles.karta} role="region" aria-labelledby="przed-jaka-decyzja-naglowek">
          <h2 id="przed-jaka-decyzja-naglowek" style={h2Styl}>{t.h2Decyzja}</h2>
          <CompareTable
            id="tabela-decyzji"
            caption={t.caption}
            columns={[
              { key: 'pytanie', label: t.kolumny.pytanie },
              { key: 'porownanie', label: t.kolumny.porownanie },
              { key: 'skrot', label: t.kolumny.skrot },
            ]}
            rows={lista.map((p) => ({
              id: p.slug,
              pytanie: p.decyzja.pytanie,
              porownanie: <Link href={`/porownania/${p.slug}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{p.nazwaKarty}</Link>,
              skrot: p.decyzja.skrot,
            }))}
          />
        </div>

        <div id="metoda" className={styles.karta} role="region" aria-labelledby="metoda-naglowek">
          <h2 id="metoda-naglowek" style={h2Styl}>{t.h2Metoda}</h2>
          <p className={styles.tresc} style={{ margin: 0 }}>{akapitMetodyHubaDla(locale)}</p>
        </div>

        <div id="zanim-wybierzesz" className={styles.karta} role="region" aria-labelledby="zanim-wybierzesz-naglowek">
          <h2 id="zanim-wybierzesz-naglowek" style={h2Styl}>{t.h2Zanim}</h2>
          {en ? (
            <ul className={styles.tresc} style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem' }}>
              <li>
                <Link href="/zmiana-agencji-seo">Switching SEO agency without penalties</Link>: a {CHECKLIST_COUNT}-point checklist of what to take from your current agency before you terminate the contract.
              </li>
              <li>
                <Link href="/panel-klienta">Client portal</Link>: what you will see after you sign with us, from keyword positions to the work log.
              </li>
              <li>
                <Link href={{ pathname: '/cennik-pozycjonowania', hash: 'uczciwa-umowa' }}>A fair contract: six rules</Link> on the notice period, fees and ownership of accounts, content and links.
              </li>
            </ul>
          ) : (
          <ul className={styles.tresc} style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem' }}>
            <li>
              <Link href="/zmiana-agencji-seo">Zmiana agencji SEO bez kar</Link>: checklista {CHECKLIST_COUNT} punktów, czyli co zabrać od obecnej agencji przed wypowiedzeniem umowy.
            </li>
            <li>
              <Link href="/panel-klienta">Panel klienta</Link>: co zobaczysz po podpisaniu umowy z nami, od pozycji fraz po dziennik prac.
            </li>
            <li>
              <Link href="/cennik-pozycjonowania#uczciwa-umowa">Uczciwa umowa: sześć zasad</Link> dotyczących okresu wypowiedzenia, opłat i własności kont, treści oraz linków.
            </li>
          </ul>
          )}
        </div>
      </div>

      <BlokCta cta={HUB.cta} dataCta="porownania_hub_cta" locale={locale} />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
