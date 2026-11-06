import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import { BlokCta } from '@/components/porownania/PorownanieLayout';
import { Link } from '@/i18n/routing';
import { slugiOpublikowane } from '@/lib/publikacja';
import { HUB, porownania, urlPorownania, akapitMetodyHuba } from '@/lib/porownania';
import { CHECKLIST_COUNT } from '@/lib/agencySwitch';
import styles from './porownania.module.css';

// Hub /porownania (5.11.2026; PLAN-v2 6.1, brief-hub-porownania.md, CB-09).
// Karty, tabela decyzji i ItemList powstają WYŁĄCZNIE z porównań, które przechodzą bramkę
// publikacji (slugiOpublikowane z lib/publikacja.js), w kolejności z lib/porownania.js.
// Publikacja P3 albo P6 dokłada kartę, wiersz tabeli i pozycję ItemList bez zmian w tym pliku.
// Karty pokazują teaser (inny niż Krótka odpowiedź strony), datę aktualizacji i liczbę kryteriów.
// Okruszki 2-poziomowe (Breadcrumbs bez parent) = jedyny BreadcrumbList na stronie.

const BASE = 'https://www.ai-seo-company.pl';
const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

function dataSlownie(iso) {
  const [rok, mies, dzien] = iso.split('-').map(Number);
  return `${dzien} ${MIESIACE[mies - 1]} ${rok}`;
}

export function opublikowanePorownania() {
  const slugi = new Set(slugiOpublikowane('/porownania/'));
  return porownania.filter((p) => slugi.has(p.slug));
}

function SchemaHuba({ lista }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE}${HUB.sciezka}#webpage`,
    url: `${BASE}${HUB.sciezka}`,
    name: HUB.title,
    description: HUB.description,
    inLanguage: 'pl',
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
        url: urlPorownania(p),
        name: p.nazwaKarty,
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

const h2Styl = { fontSize: 'clamp(1.45rem, 3.2vw, 1.9rem)', lineHeight: 1.25, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' };

export default function PorownaniaHub() {
  const lista = opublikowanePorownania();
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Porównania" en="Porównania" />
      <SchemaHuba lista={lista} />

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '2rem' }}>
        <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
          <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Porównania
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12, fontWeight: 800, letterSpacing: '-0.02em', margin: '0.5rem 0 1rem', color: 'var(--color-text-dark)' }}>
          {HUB.h1}
        </h1>
        <Byline sciezka={HUB.sciezka} data={HUB.updated} style={{ margin: '0 0 1rem' }} />
        <p style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.65, color: 'var(--color-text-muted)', maxWidth: '760px' }}>{HUB.lead}</p>
      </div>

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', paddingBottom: '3rem' }}>
        <div id="lista-porownan" role="region" aria-labelledby="lista-porownan-naglowek" style={{ scrollMarginTop: '110px' }}>
          <h2 id="lista-porownan-naglowek" style={h2Styl}>Porównania</h2>
          <div className={styles.siatkaKart}>
            {lista.map((p) => (
              <div key={p.slug} className={styles.kartaPorownania}>
                <h3 className={styles.kartaTytul}>
                  <Link href={`/porownania/${p.slug}`}>{p.nazwaKarty}</Link> <span aria-hidden="true">→</span>
                </h3>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p.teaser}</p>
                <p className={styles.kartaMeta}>
                  {p.kryteria} · aktualizacja: <time dateTime={p.updated}>{dataSlownie(p.updated)}</time>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="przed-jaka-decyzja" className={styles.karta} role="region" aria-labelledby="przed-jaka-decyzja-naglowek">
          <h2 id="przed-jaka-decyzja-naglowek" style={h2Styl}>Przed jaką decyzją stoisz?</h2>
          <CompareTable
            id="tabela-decyzji"
            caption="Które porównanie odpowiada na Twoje pytanie"
            columns={[
              { key: 'pytanie', label: 'Twoje pytanie' },
              { key: 'porownanie', label: 'Porównanie' },
              { key: 'skrot', label: 'W skrócie' },
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
          <h2 id="metoda-naglowek" style={h2Styl}>Jak przygotowujemy porównania</h2>
          <p className={styles.tresc} style={{ margin: 0 }}>{akapitMetodyHuba()}</p>
        </div>

        <div id="zanim-wybierzesz" className={styles.karta} role="region" aria-labelledby="zanim-wybierzesz-naglowek">
          <h2 id="zanim-wybierzesz-naglowek" style={h2Styl}>Zanim wybierzesz agencję</h2>
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
        </div>
      </div>

      <BlokCta cta={HUB.cta} dataCta="porownania_hub_cta" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
