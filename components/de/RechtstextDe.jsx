import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe } from '@/lib/stronyDe';
import { STAND_ANZEIGE, STAND_ISO } from '@/lib/de/rechtsstand';

// Gemeinsame Hülle für Impressum, Datenschutzerklärung und AGB (DE). Gleiche Optik wie die polnischen
// Rechtsseiten (RegulaminContent.jsx): Kopf, Brotkrumen, schmale Textspalte, Footer.
export const stilH2 = { marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.4rem', overflowWrap: 'break-word', hyphens: 'auto' };
export const stilH3 = { marginTop: '1.75rem', marginBottom: '0.5rem', color: 'var(--w-tusz)', fontSize: '1.15rem', overflowWrap: 'break-word', hyphens: 'auto' };
export const stilUl = { paddingLeft: '1.25rem', lineHeight: 1.7 };
export const stilLink = { color: 'var(--color-primary)', textDecoration: 'underline', overflowWrap: 'anywhere' };

// Mini-Auszeichnung: **fett**, `code`, [Text](/schluessel | https://… | mailto:… | tel:…)
const MUSTER = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function inline(text, prefix = 'i') {
  const teile = [];
  let letzte = 0;
  let n = 0;
  for (const m of String(text).matchAll(MUSTER)) {
    if (m.index > letzte) teile.push(text.slice(letzte, m.index));
    const key = `${prefix}-${n++}`;
    if (m[1] != null) teile.push(<strong key={key}>{m[1]}</strong>);
    else if (m[2] != null) teile.push(<code key={key}>{m[2]}</code>);
    else if (m[4].startsWith('/')) teile.push(<Link key={key} href={m[4]} style={stilLink}>{m[3]}</Link>);
    else if (m[4].startsWith('http')) teile.push(<a key={key} href={m[4]} target="_blank" rel="noopener noreferrer" style={stilLink}>{m[3]}</a>);
    else teile.push(<a key={key} href={m[4]} style={stilLink}>{m[3]}</a>);
    letzte = m.index + m[0].length;
  }
  if (letzte < text.length) teile.push(text.slice(letzte));
  return teile;
}

export function Bloecke({ bloecke, prefix }) {
  return bloecke.map((b, i) => {
    const key = `${prefix}-${i}`;
    if (typeof b === 'string') return <p key={key}>{inline(b, key)}</p>;
    if (b.h3) return <h3 key={key} style={stilH3}>{b.h3}</h3>;
    if (b.ul) return <ul key={key} style={stilUl}>{b.ul.map((li, j) => <li key={j}>{inline(li, `${key}-${j}`)}</li>)}</ul>;
    return null;
  });
}

export default function RechtstextDe({ schluessel, brotkrumen, daten, children }) {
  const w = wpisDe(schluessel);
  const url = urlDe(schluessel);
  const ld = w && {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: w.h1,
    description: w.opis,
    url,
    inLanguage: 'de-DE',
    dateModified: STAND_ISO,
    isPartOf: { '@type': 'WebSite', name: 'AI SEO COMPANY', url: 'https://www.ai-seo-company.pl/de' },
  };
  return (
    <>
      <Header />
      <Breadcrumbs pl={brotkrumen} en={brotkrumen} de={brotkrumen} />
      <main className="subpage-main" style={{ paddingTop: '120px', minHeight: '80vh', background: 'var(--w-papier-2)' }}>
        {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.9rem, 6vw, 3rem)', color: 'var(--w-tusz)', marginBottom: '0.75rem', letterSpacing: '-0.03em', overflowWrap: 'break-word', hyphens: 'auto' }}>
            {w ? w.h1 : brotkrumen}
          </h1>
          <p style={{ margin: '0 0 2rem', color: 'var(--w-tusz-2)', fontSize: '0.95rem' }}>Stand: {daten?.stand || STAND_ANZEIGE}</p>
          <div style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.8 }}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
