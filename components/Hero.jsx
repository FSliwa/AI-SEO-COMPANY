'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

/**
 * The Spline runtime is roughly 1.5 MB of JavaScript plus the scene itself — far
 * too much to sit in the critical path of a page we have been tuning for Core
 * Web Vitals. Loading it with ssr:false keeps it out of the server response and
 * out of the initial bundle, so the LCP element stays the headline text on the
 * left. Until it resolves, the same CSS orb renders in its place, which means
 * the column never reflows and there is no empty box while the scene downloads.
 *
 * Note the import path: `@splinetool/react-spline/next` is an async Server
 * Component, and this file is a client component (framer-motion, useLocale), so
 * that variant throws "is an async Client Component". The base export is the
 * client-side one and is what belongs here.
 */
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="hero-en-orb" />
});

export default function Hero() {
  const lang = useLocale();
  const t = useTranslations('hero');

  return (
    <section className={`hero${lang === 'en' ? ' hero--en' : ''}`} id="hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: lang === 'en' ? '#05070D' : '#0F172A' }}>
      {/* H1 moved to the main visual element */}

      {/* Background Hero Video — Polish only. On the English side the Spline
          scene covers the whole section, so shipping the video too would be a
          second full-screen background nobody ever sees. */}
      {lang !== 'en' && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
          preload="metadata"
          poster="/black-hole-poster.webp"
        >
          <source src="/black-hole-ai-seo-company.webm" type="video/webm" media="(min-width: 768px)" />
          <source src="/black-hole-ai-seo-company.mp4" type="video/mp4" media="(min-width: 768px)" />
        </video>
      )}

      {/* ── ENGLISH: the 3D scene is the section background ────────────────────
          Full-bleed rather than a column, which also settles the black-box
          problem from the previous pass: the scene's own opaque background was
          impossible to remove from outside the file, but at full width it stops
          being a rectangle sitting on the page and simply becomes the section's
          backdrop. */}
      {lang === 'en' && (
        <div className="hero-en-bg" aria-hidden="true">
          <Spline scene="https://prod.spline.design/IDQGjdWtbF-vstYN/scene.splinecode" />
        </div>
      )}

      {/* Subtle Starfield Background */}
      {lang !== 'en' && <div className="hero-stars-bg"></div>}

      {/* Hero Overlay & Subtle Vignette. On English it doubles as the scrim that
          keeps the copy readable over the moving scene. */}
      <div className={`hero-overlay${lang === 'en' ? ' hero-overlay--en' : ''}`}></div>

      {/* ── ENGLISH: copy layered over the scene ───────────────────────────────
          The Polish side still uses the SVG-with-overlay treatment below. Here
          the same words render as ordinary HTML, sitting on top of the scene
          rather than beside it. Wording is carried over verbatim from the SVG
          artwork and the old H1 overlay, so keyword coverage is unchanged.

          The scene renders "SEO" as its own centrepiece, so the headline steps
          back to meet it: smaller display size, and the shared word tinted to
          the scene's colour. It keeps the word rather than letting the canvas
          supply it — the scene is a 34 MB network dependency, and a headline
          that reads "that drives sales" whenever WebGL is unavailable is a
          defect, not a design.

          This also removes the overlay's mobile defect: the SVG version sized
          the H1 in container-query units (1.69cqw), which resolved to 6px on a
          375px screen. Ordinary text with clamp() cannot fall below its floor. */}
      {lang === 'en' && (
        <div className="hero-en">
          {/* Three grid children, not because the copy wants columns, but because
              the band under the scene's lettering is only ~190px tall and this
              copy is 273px stacked. Splitting it across two columns — heading
              and buttons left, paragraphs right — halves the height so nothing
              has to sit on the artwork.

              DOM order stays headline → lead → body → actions, which is the
              order it should be read and crawled in; CSS does the rearranging,
              so the buttons appear under the heading without moving ahead of
              the pitch in the markup. */}
          <div className="hero-en-copy">
            <h1 className="hero-en-title">
              <span className="hero-en-title-display">
                <span className="hero-en-title-kw">SEO</span> that drives sales
              </span>
              <span className="hero-en-title-sub">Premium SEO &amp; Marketing Agency for Companies</span>
            </h1>

            <div className="hero-en-support">
              <p className="hero-en-lead">
                We do what search engine optimisation companies rarely do: report on pipeline, not on rankings.
              </p>

              <p className="hero-en-body">
                We merge the creativity of human SEO teams with AI-driven accuracy to ensure your brand achieves
                dominant visibility and lasting growth. We combine brand strategy, innovative design, and advanced
                SEO to ensure your business is visible, remembered, and chosen by customers on a massive scale.
              </p>
            </div>

            <div className="hero-en-actions">
              <a href="#kontakt" className="hero-en-cta">Get Proposal →</a>
              <a href="#portfolio" className="hero-en-cta-secondary">View Portfolio</a>
            </div>
          </div>
        </div>
      )}

      {/* Enlarged & Responsive Hero Typography SVG Graphic with Floating Animation */}
      {lang !== 'en' && (
      <div style={{
        position: 'absolute', 
        top: '46%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '98vw', 
        maxWidth: '2400px', 
        maxHeight: '88vh',
        zIndex: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '0 0.5vw',
        pointerEvents: 'none'
      }}>
        <div
          className="hero-lcp-image"
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}
        >
          {/* Aspect-locked stage: matches the SVG viewBox (1440x810) exactly, so the
              H1 can be positioned in SVG coordinates as percentages and keeps the
              same placement relative to the artwork at every screen resolution. */}
          <div className="hero-art">
            {/* Two-tone like the SVG's own paragraphs: lead sentence in the accent
                colour, the remainder in white. Wording is unchanged. */}
            <h1 className={`hero-seo-h1${lang === 'pl' ? ' hero-seo-h1-pl' : ''}`}>
              {lang === 'en' ? (
                <>
                  Premium SEO & Marketing Agency for Companies.{' '}
                  <span className="hero-seo-h1-rest">
                    We do what search engine optimisation companies rarely do: report on pipeline, not on rankings
                  </span>
                </>
              ) : (
                <>
                  Kompleksowa Agencja SEO i Marketingowa z Warszawy.{' '}
                  <span className="hero-seo-h1-rest">
                    Twój projekt i strony to nasz priorytet - skuteczne pozycjonowanie napędzające wzrost
                  </span>
                </>
              )}
            </h1>
            <img
              className="hero-art-img"
              src={lang === 'en' ? '/seo-for-companies.svg' : '/agencja-marketingowa-agencja-seo-pozycjonowanie-stron-projekt-strony-wzrost.svg'}
              alt={lang === 'en'
                ? 'SEO for companies'
                : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie Stron i Projektowanie'}
              title={lang === 'en'
                ? 'SEO for companies'
                : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie Stron i Projektowanie'}
              width={1440}
              height={810}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
      )}

      {/* Bottom-left: Our Partners (KOTA Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        className="hero-partners-row" 
        style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
      >
        <span className="hero-partner-item" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          STANIAX
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          ASE-BOT
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          MADAME THAI
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 500, letterSpacing: '0.05em', fontSize: '0.9rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          IRENEUSZ KOZERA
        </span>
      </motion.div>
    </section>
  );
}
