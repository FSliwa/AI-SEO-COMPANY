// Deutsche GEO-Hubseite (/de/ki-suchoptimierung), Gruppe de-geo. Gleiche Abschnitte und Fakten wie
// components/GeoPageClient.jsx (PL), Texte in lib/de/geo.js. Serverkomponente; Header, Footer, Contact, AppleFaq und
// Reveal sind Client-Komponenten aus dem Bestand. JSON-LD: ServiceSchema (variant geo, Daten in lib/serviceSchema.de.js),
// ein FAQPage mit 7 FAQ und 8 Karten (AppleFaq extraSchema), Brotkrumen.
// Links nur zu deutschen Seiten (maWersjeDe / hrefDe): ohne Zielseite bleibt reiner Text.
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import ServiceSchema from '@/components/ServiceSchema';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefDe, maWersjeDe, STRONY_DE } from '@/lib/stronyDe';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { KOPF, MESSUNG_KARTEN, ANGEBOT, MASSNAHMEN, FAQ, KARTEN, KARTEN_SCHEMA, MESSUNG, FUER_WEN, AGENTUR, TECHNIK, PLAN, STAND } from '@/lib/de/geo';

const SCHLUESSEL = '/pozycjonowanie-w-ai';
const card = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)' };
const tekstStyl = { margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' };
const h3Styl = { fontSize: '1.15rem', fontWeight: 600, margin: '0 0 0.5rem', color: 'var(--color-text-dark)', hyphens: 'manual', overflowWrap: 'break-word' };
const linkStyl = { textDecoration: 'underline' };
const fussStyl = { margin: '0.6rem 0 0', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' };

/** Link auf eine deutsche Seite (Schlüssel = polnischer Pfad) oder reiner Text, wenn es sie nicht gibt. */
function Verweis({ schluessel, children }) {
  return maWersjeDe(schluessel) ? <Link href={schluessel} style={linkStyl}>{children}</Link> : <>{children}</>;
}

function Karte({ k }) {
  const hatLink = k.schluessel && maWersjeDe(k.schluessel);
  return (
    <RevealItem id={k.id} style={{ ...card, padding: '1.5rem 1.6rem', display: 'flex', flexDirection: 'column', scrollMarginTop: '110px' }}>
      <h3 lang="de" style={h3Styl}>{k.frage}</h3>
      <p lang="de" style={{ ...tekstStyl, fontSize: '1rem' }}>{k.antwort}</p>
      {k.quelle && (
        <p lang="de" style={fussStyl}>
          Quelle: {k.quelle.url ? <a href={k.quelle.url} rel="noopener" style={linkStyl}>{k.quelle.text}</a> : k.quelle.text}
          {k.quelle.data ? `, ${k.quelle.data}.` : ''}
        </p>
      )}
      {hatLink && (
        <p style={{ margin: 'auto 0 0', paddingTop: '0.9rem', fontWeight: 600 }}>
          {k.kotwica
            ? <a href={`${hrefDe(k.schluessel)}${k.kotwica}`} style={linkStyl}>{k.ankertext} →</a>
            : <Link href={k.schluessel} style={linkStyl}>{k.ankertext} →</Link>}
        </p>
      )}
    </RevealItem>
  );
}

function TextAbschnitt({ id, titel, children }) {
  return (
    <section id={id} className="sekcja-kompakt">
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <Reveal className="section-header"><h2 lang="de">{titel}</h2></Reveal>
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>{children}</Reveal>
      </div>
    </section>
  );
}

export default function GeoSeiteDe() {
  const reg = STRONY_DE[SCHLUESSEL];
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Generative Engine Optimization" en="Generative Engine Optimization" de="Generative Engine Optimization" />

      <section className="sekcja-po-okruszkach">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '880px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {KOPF.tag}
            </div>
            <h1 lang="de" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.025em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)', hyphens: 'manual', overflowWrap: 'break-word' }}>{reg.h1}</h1>
            <div className="hero-lead" style={{ maxWidth: '760px', margin: '0 auto' }}>
              <AnswerBox etykieta="Kurz gesagt"><p lang="de" style={{ margin: 0 }}>{KOPF.antwort}</p></AnswerBox>
            </div>
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {maWersjeDe('/sprawdz-widocznosc-w-ai') && (
                <Link href="/sprawdz-widocznosc-w-ai" className="hero-btn-primary" data-cta="geo_hero_checker">{KOPF.ctaPruefen}</Link>
              )}
              <a href="#kontakt" className="hero-btn-secondary" data-cta="geo_hero_audit">{KOPF.ctaAudit}</a>
            </div>
            <BylineDe stand={STAND} style={{ margin: '1.5rem auto 0', order: 6 }} />
          </Reveal>
        </div>
      </section>

      <section className="sekcja-kompakt">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal className="section-header"><h2 lang="de">{MESSUNG_KARTEN.titel}</h2></Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
            {MESSUNG_KARTEN.karten.map(([h, p]) => (
              <RevealItem key={h} style={{ ...card, padding: '1.25rem 1.5rem' }}>
                <h3 lang="de" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                <p lang="de" style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section id="kosten" className="sekcja-kompakt">
        <div className="container">
          <Reveal className="section-header"><h2 lang="de">{ANGEBOT.titel}</h2></Reveal>
          <Reveal style={{ maxWidth: '760px', margin: '1rem 0 0' }}>
            <p lang="de" style={tekstStyl}>
              {ANGEBOT.einleitung}{' '}
              <Verweis schluessel={ANGEBOT.einleitungLinkSchluessel}>{ANGEBOT.einleitungLinkText}</Verweis>.
            </p>
          </Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', marginTop: '2rem' }}>
            {ANGEBOT.karten.map((o) => (
              <RevealItem key={o.name} style={{ ...card, padding: '1.75rem', border: o.hervorgehoben ? '1.5px solid var(--color-primary)' : '1px solid var(--w-linia)' }}>
                <h3 lang="de" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{o.name}</h3>
                <p style={{ margin: '0.75rem 0 0', fontSize: 'clamp(1.6rem, 3.2vw, 2rem)', fontWeight: 600, color: 'var(--color-text-dark)' }}>{o.preis}</p>
                <p lang="de" style={{ margin: 0, color: 'var(--color-text-muted)' }}>{o.einheit}</p>
                <ul lang="de" style={{ margin: '1rem 0 0', paddingLeft: '1.1rem', display: 'grid', gap: '0.45rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
                  {o.punkte.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p lang="de" style={fussStyl}>{ANGEBOT.hinweis}</p>
          </Reveal>
          <Reveal style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {maWersjeDe('/pozycjonowanie-w-ai/audyt-widocznosci') ? (
              <Link href="/pozycjonowanie-w-ai/audyt-widocznosci" className="btn btn-primary" data-cta="geo_offer_audit">
                KI-Sichtbarkeit Audit im Detail (235 € netto) →
              </Link>
            ) : (
              <a href="#kontakt" className="btn btn-primary" data-cta="geo_offer_audit">{KOPF.ctaAudit}</a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="sekcja-kompakt">
        <div className="container">
          <Reveal className="section-header"><h2 lang="de">Fragen zur KI-Sichtbarkeit, die wir beantworten</h2></Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', marginTop: '2rem' }}>
            {KARTEN.map((k) => <Karte key={k.id} k={k} />)}
          </RevealStagger>
        </div>
      </section>

      <TextAbschnitt titel={MESSUNG.titel}>
        <p lang="de" style={tekstStyl}>{MESSUNG.einleitung}</p>
        <CompareTable caption={MESSUNG.caption} columns={MESSUNG.spalten} rows={MESSUNG.zeilen} przypis={MESSUNG.fussnote} />
        <p lang="de" style={tekstStyl}>{MESSUNG.fazit}</p>
      </TextAbschnitt>

      <TextAbschnitt titel={FUER_WEN.titel}>
        <p lang="de" style={tekstStyl}>{FUER_WEN.einleitung}</p>
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
          <div style={{ ...card, padding: '1.5rem 1.6rem' }}>
            <h3 lang="de" style={h3Styl}>{FUER_WEN.sinnvoll.titel}</h3>
            <ul lang="de" style={{ ...tekstStyl, paddingLeft: '1.15rem', display: 'grid', gap: '0.6rem', fontSize: '1rem' }}>
              {FUER_WEN.sinnvoll.punkte.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div style={{ ...card, padding: '1.5rem 1.6rem' }}>
            <h3 lang="de" style={h3Styl}>{FUER_WEN.nochNicht.titel}</h3>
            <ul lang="de" style={{ ...tekstStyl, paddingLeft: '1.15rem', display: 'grid', gap: '0.6rem', fontSize: '1rem' }}>
              {FUER_WEN.nochNicht.punkte.map((p) => (
                <li key={p.text}>
                  {p.text}
                  {p.link && <> <Verweis schluessel={p.link.schluessel}>{p.link.text}</Verweis>{p.nachLink}</>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TextAbschnitt>

      <TextAbschnitt titel={AGENTUR.titel}>
        <p lang="de" style={tekstStyl}>
          {AGENTUR.intro} <Verweis schluessel={AGENTUR.introLink.schluessel}>{AGENTUR.introLink.text}</Verweis>.
        </p>
        <h3 lang="de" style={{ ...h3Styl, marginTop: '0.75rem' }}>{AGENTUR.monatTitel}</h3>
        <p lang="de" style={tekstStyl}>{AGENTUR.monat}</p>
        <h3 lang="de" style={{ ...h3Styl, marginTop: '0.75rem' }}>{AGENTUR.fragenTitel}</h3>
        <ol lang="de" style={{ ...tekstStyl, paddingLeft: '1.25rem', display: 'grid', gap: '0.4rem' }}>
          {AGENTUR.fragen.map((f) => <li key={f}>{f}</li>)}
        </ol>
        <h3 lang="de" style={{ ...h3Styl, marginTop: '0.75rem' }}>{AGENTUR.messTitel}</h3>
        <p lang="de" style={tekstStyl}>
          {AGENTUR.mess}{' '}
          {maWersjeDe(AGENTUR.messLink.schluessel) ? <Verweis schluessel={AGENTUR.messLink.schluessel}>{AGENTUR.messLink.text}</Verweis> : null}
          {maWersjeDe(AGENTUR.messLink.schluessel) ? '.' : ''}
        </p>
      </TextAbschnitt>

      <TextAbschnitt titel={TECHNIK.titel}>
        <ul lang="de" style={{ ...tekstStyl, paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem' }}>
          {TECHNIK.punkte.map((p) => (
            <li key={p.text}>
              {p.text}
              {p.extern && <a href={p.extern.url} rel="noopener" style={linkStyl}>{p.extern.text}</a>}
              {p.nach}
            </li>
          ))}
        </ul>
        <p lang="de" style={tekstStyl}>
          {TECHNIK.nachweis} <a href="/de/llms.txt" style={linkStyl}>{TECHNIK.nachweisLinkText}</a> {TECHNIK.nachweisSchluss}
        </p>
      </TextAbschnitt>

      <TextAbschnitt titel={PLAN.titel}>
        <CompareTable caption={PLAN.caption} columns={PLAN.spalten} rows={PLAN.zeilen} przypis={PLAN.fussnote} />
      </TextAbschnitt>

      <section className="sekcja-kompakt">
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <Reveal>
            <div style={{ ...card, padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 lang="de" style={{ fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>{MASSNAHMEN.titel}</h2>
              <ul lang="de" style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                {MASSNAHMEN.punkte.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ ...card, padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 lang="de" style={{ fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>{MASSNAHMEN.ehrlichTitel}</h2>
              <p lang="de" style={tekstStyl}>{MASSNAHMEN.ehrlich}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={faqFuerAppleFaq(FAQ)} extraSchema={faqFuerAppleFaq(KARTEN_SCHEMA)} title="Fragen zur Generative Engine Optimization" />
      <ServiceSchema variant="geo" />
      <Contact />
      <Footer />
    </main>
  );
}
