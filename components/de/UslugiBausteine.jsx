// Bausteine der deutschen Leistungsseiten (Gruppe de-uslugi): Seitenrahmen, Hero, Abschnitte, Karten, Preise, FAQ.
// Serverkomponenten, soweit moeglich; die Client-Teile (Header, Footer, Contact, AppleFaq, Reveal) kommen aus dem Bestand.
// AppleFaq wird unveraendert genutzt: fuer lang !== 'pl' liest er questionEn/answerEn (siehe faqFuerAppleFaq).
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { PAKETE, PREIS_HINWEIS, KONTAKT } from '@/lib/de/uslugiGemeinsam';
import { REFERENZEN } from '@/lib/de/referenzen';
import { faqFuerAppleFaq } from '@/lib/de/uslugiGemeinsam';
import ReferenzenLiveDe from './ReferenzenLiveDe';

const TEXT = { fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--color-text-main)', marginBottom: '1.25rem', hyphens: 'auto', overflowWrap: 'break-word' };
const KARTE = { background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.5rem, 5vw, 3.25rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' };
export const LINK = { textDecoration: 'underline', fontWeight: 600 };

/** Seitenrahmen: Header, Brotkrumen, main, Kontaktformular, Footer. */
export function Seite({ krumen, children, mitKontakt = true }) {
  // krumen = null: keine Brotkrumen (Startseite)
  return (
    <>
      <Header />
      {krumen && <Breadcrumbs de={krumen} pl={krumen} en={krumen} />}
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        {children}
        {mitKontakt && <Contact />}
      </main>
      <Footer />
    </>
  );
}

export function Absatz({ children, style }) {
  return <p lang="de" style={{ ...TEXT, ...style }}>{children}</p>;
}

/** Hero der Unterseiten: Kicker, H1, Einleitung, zwei Buttons. */
export function Hero({ kicker, h1, lead, cta = 'Angebot anfragen', telefon = true, beweis }) {
  return (
    <section className="subpage-hero" style={{ paddingTop: '70px', paddingBottom: '60px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
        <Reveal>
          {kicker && (
            <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.25rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              {kicker}
            </div>
          )}
          <h1 lang="de" style={{ fontSize: 'clamp(2rem, 5.2vw, 3.9rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '-0.03em', hyphens: 'auto', overflowWrap: 'break-word' }}>
            {h1}
          </h1>
          <p lang="de" className="hero-lead" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.6, maxWidth: '740px', margin: '0 auto 2rem auto', color: 'var(--color-text-main)' }}>
            {lead}
          </p>
          {beweis && <p style={{ margin: '0 auto 1.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--w-tusz-2)' }}>{beweis}</p>}
          <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#kontakt" className="hero-btn-primary" data-cta="de_hero">{cta}</a>
            {telefon && <a href={KONTAKT.telHref} className="hero-btn-secondary" data-cta="de_hero_tel">Anrufen: {KONTAKT.tel}</a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Weisse Textkarte mit H2 (mittlere Breite). */
export function Abschnitt({ titel, children, id, breite = 880, tag }) {
  return (
    <section id={id} style={{ padding: '0 0 64px 0', scrollMarginTop: '110px' }}>
      <div className="container" style={{ maxWidth: `${breite}px`, margin: '0 auto' }}>
        <Reveal>
          <div style={KARTE}>
            {tag && <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{tag}</div>}
            <h2 lang="de" style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)', lineHeight: 1.2, hyphens: 'auto', overflowWrap: 'break-word' }}>{titel}</h2>
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Unterueberschrift({ children }) {
  return <h3 lang="de" style={{ fontSize: '1.3rem', fontWeight: 700, margin: '1.75rem 0 0.75rem', color: 'var(--color-text-dark)', lineHeight: 1.25, hyphens: 'auto' }}>{children}</h3>;
}

export function Liste({ punkte, nummeriert = false }) {
  const Tag = nummeriert ? 'ol' : 'ul';
  return (
    <Tag lang="de" style={{ margin: '0 0 1.25rem', paddingLeft: '1.25rem', display: 'grid', gap: '0.7rem', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)', overflowWrap: 'break-word' }}>
      {punkte.map((p, i) => <li key={i}>{p}</li>)}
    </Tag>
  );
}

/** Raster aus Karten: [{ kicker, titel, text, href? }]. */
export function Karten({ titel, untertitel, einleitung, items, breite = 1240, spalten = 320, id }) {
  return (
    <section id={id} style={{ padding: '30px 0 80px 0', scrollMarginTop: '110px' }}>
      <div className="container" style={{ maxWidth: `${breite}px`, margin: '0 auto' }}>
        <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.75rem auto' }}>
          <h2 lang="de" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem', hyphens: 'auto', overflowWrap: 'break-word' }}>{titel}</h2>
          {untertitel && <p lang="de" style={{ fontSize: '1.15rem', color: 'var(--w-tusz-2)', margin: '0 auto', fontWeight: 500, lineHeight: 1.55 }}>{untertitel}</p>}
          {einleitung && <p lang="de" style={{ fontSize: '1.02rem', color: 'var(--w-tusz-2)', margin: '1.1rem auto 0', maxWidth: '68ch', lineHeight: 1.65 }}>{einleitung}</p>}
        </Reveal>
        <RevealStagger style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(${spalten}px, 100%), 1fr))`, gap: '1.5rem' }}>
          {items.map((k, i) => (
            <RevealItem key={i} style={{ background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)', padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column' }}>
              {k.kicker && (
                <div className="usluga-pills" style={{ justifyContent: 'flex-start', marginTop: 0, marginBottom: '1rem' }}>
                  {[k.kicker, k.kickerZwei].filter(Boolean).map((tag) => {
                    const [a, b] = tag.split(' / ');
                    return b ? (
                      <span key={tag} className="usluga-pill">
                        <span className="usluga-pill-gl">{a}</span>
                        <span className="usluga-pill-uk" aria-hidden="true">/</span>
                        <span>{b}</span>
                      </span>
                    ) : (
                      <span key={tag} className="usluga-pill"><span className="usluga-pill-gl">{tag}</span></span>
                    );
                  })}
                </div>
              )}
              <h3 lang="de" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '0.9rem', lineHeight: 1.2, hyphens: 'auto', overflowWrap: 'break-word' }}>{k.titel}</h3>
              <p lang="de" style={{ color: 'var(--color-text-main)', fontSize: '1.05rem', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>{k.text}</p>
              {k.lieferung && (
                <div className="usluga-dostarczenie" style={{ justifyContent: 'flex-start' }}>
                  {k.lieferung.map((l) => <span key={l} className="usluga-etykieta">{l}</span>)}
                </div>
              )}
              {k.href && (
                <Link href={k.href} style={{ ...LINK, color: 'var(--color-primary)', marginTop: '1.1rem', display: 'inline-block' }}>{k.linktext || 'Mehr erfahren'} →</Link>
              )}
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/** Drei Paketkarten im bestehenden Preislayout (Klassen .pricing-*). */
export function Preise({ titel = 'Transparente Pakete ohne versteckte Kosten', untertitel = 'Wählen Sie einen flexiblen Monatsvertrag oder das Booster Pack mit neuer Website im Paket.', ueberschrift = 'h2', id = 'preise' }) {
  const H = ueberschrift;
  return (
    <section className="pricing" id={id} data-petla="" style={{ scrollMarginTop: '110px' }}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}><span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> PREISE</div>
          <H lang="de">{titel}</H>
          <p lang="de">{untertitel}</p>
          <div style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(29, 29, 31, 0.05)', color: 'var(--w-tusz)', padding: '0.5rem 1.2rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600 }}>
            ✓ Google Unternehmensprofil und lokales SEO in jedem Paket enthalten
          </div>
        </Reveal>
        <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))' }}>
          {PAKETE.map((p) => (
            <RevealItem key={p.schluessel} className={`pricing-card${p.hervorgehoben ? ' featured' : ''}`}>
              {p.plakette && <span className="pricing-featured-badge">{p.plakette}</span>}
              <div className="pricing-header">
                <div className="pricing-kategoria pricing-kicker" aria-hidden="true">
                  <span className="pricing-kicker-glowny">PAKET</span>
                  <span className="pricing-kicker-ukosnik">/</span>
                  <span className="pricing-kicker-cel">{p.kategorie}</span>
                </div>
                <h3 lang="de">{p.name}</h3>
                <p className="pricing-desc" lang="de">{p.text}</p>
                <div className="pricing-price">
                  <div className="price-label" style={p.hervorgehoben ? { color: 'var(--color-cta)' } : undefined}>{p.kopfzeile || 'Monatsabo'}</div>
                  <div className="price-amount">{p.vorab && <span className="price-from">{p.vorab}</span>}{p.preis} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{p.zeitraum}</span></div>
                </div>
              </div>
              <ul className="pricing-features" lang="de">
                {p.punkte.map(([ikone, t]) => <li key={t} data-ikona={ikone}>{t}</li>)}
              </ul>
              <a href="#kontakt" className={`btn ${p.hervorgehoben ? 'btn-primary btn-glow' : 'btn-secondary'}`} data-cta="de_pricing" data-plan={p.schluessel}>{p.cta} <span className="sr-only"> {p.name}</span></a>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal className="pricing-note">{PREIS_HINWEIS} Flexible Monatsverträge ohne lange Bindung (Ausnahme: Booster Pack, mindestens 3 Monate).</Reveal>
      </div>
    </section>
  );
}

/** Tabelle mit Beschriftung; zeilen = Arrays von Zellen (Text oder JSX). */
export function Tabelle({ beschriftung, spalten, zeilen, fussnote }) {
  return (
    <div style={{ margin: '0 0 1.25rem' }}>
      <div style={{ overflowX: 'auto' }}>
        <table lang="de" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', lineHeight: 1.5, minWidth: spalten.length > 2 ? '520px' : 0 }}>
          <caption style={{ textAlign: 'left', fontWeight: 700, padding: '0 0 0.75rem', color: 'var(--color-text-dark)' }}>{beschriftung}</caption>
          <thead>
            <tr>{spalten.map((s) => <th key={s} scope="col" style={{ textAlign: 'left', padding: '0.7rem 0.8rem', borderBottom: '2px solid var(--color-border)', fontSize: '0.9rem', color: 'var(--w-tusz-2)' }}>{s}</th>)}</tr>
          </thead>
          <tbody>
            {zeilen.map((z, i) => (
              <tr key={i}>{z.map((c, j) => j === 0
                ? <th key={j} scope="row" style={{ textAlign: 'left', padding: '0.8rem', borderBottom: '1px solid var(--color-border)', fontWeight: 600, verticalAlign: 'top' }}>{c}</th>
                : <td key={j} style={{ padding: '0.8rem', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {fussnote && <p lang="de" style={{ fontSize: '0.9rem', color: 'var(--w-tusz-2)', margin: '0.75rem 0 0' }}>{fussnote}</p>}
    </div>
  );
}

/** Referenzen mit echten Search-Console-Werten (lib/de/referenzen.js + Live-Hydrierung aus /api/realizacje-gsc). */
export function Referenzen({ titel = 'Referenzen mit Messwerten', untertitel = 'Alle Zahlen stammen aus der Google Search Console, der Messzeitraum steht bei jedem Projekt. Verkaufsdaten unserer Kunden veröffentlichen wir nicht, nur die Sichtbarkeit, die Sie selbst nachprüfen können.', ids, id = 'referenzen' }) {
  const liste = ids ? REFERENZEN.filter((r) => ids.includes(r.id)) : REFERENZEN;
  return (
    <section id={id} style={{ padding: '30px 0 80px 0', scrollMarginTop: '110px' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <h2 lang="de" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem', hyphens: 'auto', overflowWrap: 'break-word' }}>{titel}</h2>
          <p lang="de" style={{ fontSize: '1.1rem', color: 'var(--w-tusz-2)', lineHeight: 1.55, margin: 0 }}>{untertitel}</p>
        </Reveal>
        <ReferenzenLiveDe liste={liste} />
      </div>
    </section>
  );
}

/** Zeile mit Button zwischen Abschnitten. */
export function CtaZeile({ text = 'Angebot anfragen - Antwort innerhalb von 24 Stunden' }) {
  return (
    <div style={{ textAlign: 'center', margin: '0 0 70px' }}>
      <a href="#kontakt" className="btn btn-primary" data-cta="de_mid">{text}</a>
    </div>
  );
}

export function Faq({ eintraege, titel = 'Häufige Fragen', id }) {
  return <AppleFaq faqData={faqFuerAppleFaq(eintraege)} title={titel} sectionId={id} />;
}
