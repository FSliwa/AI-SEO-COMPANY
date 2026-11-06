'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { hash } from '@/lib/anchors';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';

// 5.11.2026 (AU1; PLAN-v2 6.19, OP-07, OP-15, MSA-02) - strona chroniona: tylko DODAWANIE w wersji PL.
// Audyt widoczności w AI: link do A5 po jej publikacji, wcześniej do huba GEO (reguła 6.0).
const HREF_AUDYT_AI = hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci') ?? '/pozycjonowanie-w-ai';

const tekstSekcji = { fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginBottom: '1.5rem' };
const linkSekcji = { textDecoration: 'underline' };

export default function AudytClient({ faqData, portfolioCases, carouselItems }) {
  const lang = useLocale();
  // FAQPage = pytania widoczne na stronie: PL 12, EN 11 (bez pytań tylkoPl).
  const faqWidoczne = lang === 'pl' ? faqData : faqData.filter((f) => !f.tylkoPl);

  return (
    <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Banner - Apple Style */}
      <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              {lang === 'pl' ? 'Audyt SEO. Prawda zaboli.' : 'SEO AUDIT'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 7vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: 'var(--color-text-main)', 
              marginBottom: '1rem', 
              letterSpacing: '-0.04em'
            }}>
              {lang === 'pl' ? 'Audyt SEO — Analiza i Optymalizacja SEO' : 'SEO Audit Services — Technical SEO Audit & SEO Keyword Analysis'}
            </h1>

            <div style={{ 
              width: '120px', 
              height: '6px', 
              background: 'linear-gradient(90deg, var(--color-cta) 0%, #FF8A65 100%)', 
              margin: '0 auto 2rem auto', 
              borderRadius: '3px',
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.4)'
            }}></div>

            <div style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: 'var(--color-text-main)', 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? (
                <>Diagnoza Techniczna<br/>Precyzyjna Optymalizacja</>
              ) : (
                <>Technical Diagnosis<br/>Precise Optimization</>
              )}
            </div>

            <p className="hero-lead" style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              color: '#333336', 
              lineHeight: 1.6, 
              maxWidth: '700px', 
              margin: '0 auto 3rem auto',
              fontWeight: 400
            }}>
              {lang === 'pl' 
                ? <>Techniczny <span style={{ fontWeight: 'bold' }}>audyt SEO</span> strony lub sklepu w 3–5 dni roboczych: ponad 50 czynników, każdy błąd z priorytetem i instrukcją naprawy dla programisty. <span style={{ color: 'var(--color-cta)' }}>Bez PDF-a na 90 stron — lista napraw, którą ktoś przeczyta.</span> Wycena w 24 h, bez handlowca.</>
                : <>Discover the real reasons for your lack of visibility. As top <strong>search engine optimization consultants</strong> providing expert <strong>search engine optimisation consultancy</strong>, <span style={{ color: 'var(--color-cta)' }}>we verify over 50 critical technical factors blocking your Google potential</span>.</>}
            </p>
            
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={hash('kontakt', lang)} className="hero-btn-primary" data-cta="service_hero_audit">
                {lang === 'pl' ? 'Zamów audyt strony' : 'Order website audit'} 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="service_hero_audit_tel">
                {lang === 'pl' ? 'Zadzwoń: 518 815 055' : 'Call: +48 518 815 055'}
              </a>
            </div>
            {/* OP-14: autor i data (LASTMOD); na /en Byline nic nie renderuje. */}
            <Byline sciezka="/audyt-seo" style={{ margin: '2rem 0 0' }} />
          </Reveal>
        </div>
      </section>

      {/* Carousel */}
      <ServiceCarousel 
        tag={lang === 'pl' ? "STANDARDY TECHNICZNE" : "TECHNICAL STANDARDS"}
        title={lang === 'pl' ? "Pełna Kontrola Jakości" : "Complete Quality Control"}
        subtitle={lang === 'pl' ? "Poznaj kluczowe metryki, które analizujemy podczas każdego audytu." : "Explore the key metrics we analyze during every audit."}
        items={carouselItems}
      />

      {/* Feature Grid Section - Apple Bento Grid Style */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Obszary Analizy Technicznej' : 'Technical Analysis Areas'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Kompleksowa weryfikacja techniczna, strukturalna i semantyczna witryny.' : 'Comprehensive technical, structural, and semantic verification of your website.'}
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 1' : 'AREA 1'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Technikalia & CWV' : 'Search Engine Optimization and Optimisation Consultancy'}</h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Analiza Core Web Vitals (LCP, CLS, INP), poprawności kodów HTTP, przekierowań i eliminacja barier dla robotów indeksujących.' : 'Analysis of Core Web Vitals (LCP, CLS, INP), HTTP code correctness, redirects, and eliminating barriers for indexing bots. Expert search engine optimisation consultancy and optimization applied.'}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 2' : 'AREA 2'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Treści & Semantyka' : 'Content & Semantics'}</h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? <>Weryfikacja intencji wyszukiwania (Search Intent), <span style={{ fontWeight: 'bold' }}>optymalizacja SEO</span> treści, analiza kanibalizacji słów kluczowych i pokrycia klastrów tematycznych.</> : 'Verification of search intent, analysis of keyword cannibalization and coverage of topical clusters.'}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 3' : 'AREA 3'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Profil Linków & Autorytet' : 'Link Profile & Authority'}</h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Weryfikacja toksyczności linków przychodzących, analiza anchor textów oraz badanie domen odsyłających w modelu AI.' : 'Verification of incoming link toxicity, anchor text analysis, and AI model evaluation of referring domains.'}</p>
            </RevealItem>
          </RevealStagger>
          {/* CTA w środku strony: między hero a #kontakt były sekcje bez żadnego przycisku. */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="service_mid_audyt_1">
              {lang === 'pl' ? 'Zapytaj o wycenę — odpowiedź w\u00a024\u00a0h' : 'Ask for a quote — reply within 24\u00a0h'}
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <SubpagePortfolio 
        title={lang === 'pl' ? "Co zwykle wykrywamy w audycie SEO" : "What an SEO audit usually uncovers"} 
        subtitle={lang === 'pl' ? "Najczęstsze błędy techniczne wykrywane podczas audytów oraz metody ich eliminacji. Liczby na kartach to przykładowe scenariusze, nie wyniki konkretnych klientów." : "Most common technical errors detected during audits and how we eliminate them"}
        cases={portfolioCases} 
      />

      {/* AU1 (OP-07 + MSA-02): cena i warianty audytu, tylko PL, po kartach, przed FAQ.
          „audyt seo cena” 210/mies. (GSC 38 wyśw., poz. 68,7), „audyt strony internetowej” 720
          (frazy.csv i DataForSEO, 4.11.2026). Ceny = FAQ tej strony, Pricing.jsx i oferta GeoPageClient.jsx.
          Widełki rynkowe: widoczni.com/pozycjonowanie-cennik, curl 5.11.2026 (MSA-02); bez linku. */}
      {lang === 'pl' && (
        <section style={{ padding: '0 0 40px 0' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', color: 'var(--color-text-main)' }}>
            <Reveal>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Audyt SEO: cena i warianty
              </h2>
              <p style={tekstSekcji}>
                Cena zależy od tego, czy potrzebujesz samej diagnozy, czy diagnozy razem z wdrożeniem. Trzy warianty, w których robimy audyt, zestawiliśmy w tabeli. Na rynku audyt SEO kosztuje od 500 do 5 000 zł (widoczni.com, odczyt 5.11.2026).
              </p>
              <CompareTable
                id="warianty-audytu"
                caption="Warianty audytu: cena netto, czas i zakres"
                columns={[
                  { key: 'wariant', label: 'Wariant' },
                  { key: 'cena', label: 'Cena (netto)' },
                  { key: 'czas', label: 'Czas' },
                  { key: 'zakres', label: 'Co dostajesz' },
                ]}
                rows={[
                  {
                    id: 'samodzielny',
                    wariant: 'Audyt SEO jako osobna usługa',
                    cena: 'od 1 490 zł',
                    czas: '3–5 dni roboczych',
                    zakres: '50+ punktów kontrolnych, lista napraw z priorytetem i konsultacja omówieniowa',
                  },
                  {
                    id: 'w-pakiecie',
                    wariant: <>Audyt SEO w <Link href="/cennik-pozycjonowania" style={linkSekcji}>pakiecie pozycjonowania</Link></>,
                    cena: 'w cenie pakietu od 1 900 zł/mies.',
                    czas: 'na starcie współpracy',
                    zakres: 'ten sam zakres, a do tego wdrożenie poprawek',
                  },
                  {
                    id: 'ai',
                    wariant: <Link href={HREF_AUDYT_AI} style={linkSekcji}>Audyt widoczności w AI</Link>,
                    cena: '990 zł',
                    czas: '5 dni roboczych',
                    zakres: '30 pytań w 4 źródłach, 5 konkurentów polecanych przez modele i 10 rekomendacji',
                  },
                ]}
                przypis="Ceny netto, do których doliczamy 23% VAT. Stan cen: listopad 2026."
              />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2.5rem', marginBottom: '1rem' }}>
                Audyt strony internetowej a audyt SEO
              </h3>
              <p style={{ ...tekstSekcji, marginBottom: 0 }}>
                Audyt strony internetowej (albo audyt strony www) to szersze pojęcie: może obejmować też użyteczność, dostępność i bezpieczeństwo. Audyt SEO strony internetowej sprawdza to, co decyduje o widoczności w Google: indeksację, szybkość, strukturę nagłówków, treści i linki. Ocenę użyteczności opisujemy osobno w <Link href="/blog/audyt-ux-strony" style={linkSekcji}>poradniku o audycie UX strony</Link>.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <AppleFaq faqData={faqWidoczne} title={lang === 'pl' ? "Najczęstsze pytania" : "Search Engine Optimization Consultants FAQs"} />

      <Contact />
    </main>
  );
}
