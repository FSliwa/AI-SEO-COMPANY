'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import HeroArcText from './HeroArcText';

/**
 * The Spline runtime is roughly 1.5 MB of JavaScript plus the scene itself.
 * ssr:false keeps both out of the server response and the initial bundle. Until
 * it resolves the CSS orb stands in, so the section never reflows.
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

const SCENE = 'https://prod.spline.design/IDQGjdWtbF-vstYN/scene.splinecode';

/**
 * Hero copy per locale.
 *
 * Polish is not a translation of the English — it is the wording that was
 * already on the Polish hero, redistributed. The old H1 read "Kompleksowa
 * Agencja SEO i Marketingowa z Warszawy. Twój projekt i strony to nasz
 * priorytet - skuteczne pozycjonowanie napędzające wzrost" and is preserved
 * whole across `sub` and `lead`. `display` and `body` were previously baked
 * into the SVG artwork as paths, so they existed as pixels and not as text —
 * moving them here turns them into indexable HTML for the first time.
 *
 * `wide` clauses are the ones phones do not get. They deliberately carry no
 * keyword of their own: everything that ranks lives in the shared sentences, so
 * the shortened mobile rendering — the one mobile-first indexing reads — is not
 * missing a single phrase.
 */
const COPY = {
  en: {
    leadA: 'We do what search engine optimisation companies rarely do: report on pipeline',
    leadWide: ', not on rankings',
    leadEnd: '.',
    bodyA: 'The creativity of human SEO teams with AI-driven accuracy delivers dominant visibility and lasting growth.',
    wideA: 'We merge the two so your brand compounds results instead of chasing them.',
    bodyB: 'Brand strategy, innovative design and advanced SEO make your business remembered and chosen at massive scale.',
    wideB: 'We combine all three rather than treating them as separate projects.',
    bodyArc: 'The creativity of human SEO teams with AI-driven accuracy delivers dominant visibility and lasting growth. We merge the two so your brand compounds results instead of chasing them. Brand strategy, innovative design and advanced SEO make your business remembered and chosen at massive scale. We combine all three rather than treating them as separate projects.',
    display: 'that drives sales',
    sub: 'Premium SEO & Marketing Agency for Companies',
    ctaPrimary: 'Get Proposal',
    ctaSecondary: 'View Portfolio'
  },
  pl: {
    leadA: 'Twój projekt i strony',
    leadWide: ' to nasz priorytet',
    leadEnd: ' – skuteczne pozycjonowanie napędzające wzrost.',
    bodyA: 'Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i masowo wybierana przez klientów.',
    wideA: 'Prowadzimy te trzy obszary razem, a nie jako osobne projekty.',
    bodyB: 'Agencja SEO i Marketingowa Warszawa – pozycjonowanie stron i projektowanie.',
    wideB: 'Rozliczamy się z realnego wzrostu firmy i raportujemy sprzedaż, nie same pozycje w wyszukiwarce.',
    bodyArc: 'Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i masowo wybierana przez klientów. Prowadzimy te trzy obszary razem, a nie jako osobne projekty. Agencja SEO i Marketingowa Warszawa – pozycjonowanie stron i projektowanie. Rozliczamy się z realnego wzrostu firmy i raportujemy sprzedaż, nie same pozycje w wyszukiwarce.',
    display: 'które buduje sprzedaż',
    sub: 'Kompleksowa Agencja SEO i Marketingowa z Warszawy',
    ctaPrimary: 'Wyceń projekt',
    ctaSecondary: 'Zobacz portfolio'
  }
};

export default function Hero() {
  const lang = useLocale();
  const t = useTranslations('hero');
  const copy = COPY[lang] || COPY.pl;

  // The copy enters ONLY when the scene has painted its first frame — both run
  // off this one state change, on the same curve and duration, so text and 3D
  // arrive as a single movement. The timeout is not pacing, it is disaster
  // recovery: if the network never delivers the scene, the hero must not stay
  // blank forever.
  const [sceneIn, setSceneIn] = useState(false);

  useEffect(() => {
    const failsafe = setTimeout(() => setSceneIn(true), 15000);
    return () => clearTimeout(failsafe);
  }, []);

  // Warm both halves of the load immediately, in parallel: the runtime module
  // (~1.5 MB of JS) and the scene file itself. Without this the scene download
  // starts only after hydration finishes and the runtime has initialised — on
  // a scene this size the serialisation costs seconds. Both are best-effort.
  useEffect(() => {
    import('@splinetool/react-spline').catch(() => {});
    fetch(SCENE, { mode: 'cors', cache: 'force-cache' }).catch(() => {});
  }, []);

  // Micro-parallax (wide screens, fine pointers, motion allowed): the copy
  // drifts a few pixels slower than the scene on scroll, which reads as depth.
  // rAF-throttled, transform-only, and capped at 14px so it can never collide
  // the text with the lettering band.
  const copyRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 901px)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = copyRef.current;
        if (!el) return;
        const y = Math.max(-14, Math.min(14, window.scrollY * -0.06));
        el.style.transform = `translateY(${y.toFixed(1)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // The arc is a wide-layout treatment only; phones keep the plain paragraph.
  // Deliberately client-side: the server renders the straight <p>, so that is
  // the markup a crawler reads and the copy never exists twice in the HTML.
  const [arcBody, setArcBody] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const sync = () => setArcBody(query.matches);
    sync();

    // Both listeners on purpose. The media query's own `change` event is the
    // right signal but it does not always fire — under device emulation it
    // stayed silent while the query itself already reported false, which left
    // the arc rendered at 375px where the plain paragraph belongs. `resize` is
    // the coarser net that catches those cases; sync() is idempotent, so the
    // pair firing together costs nothing.
    query.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      query.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <section
      className="hero hero--en"
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Measured off the canvas framebuffer at seven edge points: the scene's
        // baked background is 0,0,0 at every one. Matching it means the band the
        // canvas occupies on phones has no visible edge against the section.
        backgroundColor: '#000000'
      }}
    >
      {/* The scene is the section background on both locales now. The video and
          the starfield are gone with it — they were a second full-screen
          backdrop nobody could see underneath this one. */}
      <div className={`hero-en-bg${sceneIn ? ' is-in' : ''}`} aria-hidden="true">
        <Spline scene={SCENE} onLoad={() => setSceneIn(true)} />
      </div>

      {/* Vignette, and on the wide layout the scrim that lifts the copy edges. */}
      <div className="hero-overlay hero-overlay--en"></div>

      {/* Two groups pinned above and below the scene's own lettering, which
          occupies 30.4%-62.2% of the section height. The heading sits under the
          artwork on purpose: the scene supplies the word "SEO", so the eye has
          to meet it before "that drives sales" / "które buduje sprzedaż" or the
          sentence comes out backwards.

          Without JavaScript the copy would never get its entrance class and
          would stay hidden, so the noscript block below hands it straight to
          the finished state. */}
      <noscript>
        <style>{`.hero-en-copy :is(.hero-en-lead,.hero-en-body,.hero-en-title,.hero-en-actions){opacity:1;transform:none}`}</style>
      </noscript>

      <div className="hero-en">
        <div ref={copyRef} className={`hero-en-copy${sceneIn ? ' is-in' : ''}`}>
          <div className="hero-en-top">
            {/* Same device as the paragraph below: the clause phones drop carries
                no phrase of its own. "not on rankings" goes, and "rankings"
                still appears 4 more times on the page; "to nasz priorytet" goes,
                and "priorytet" survives elsewhere. Both readings are complete
                sentences — the cut is at a clause boundary, not mid-thought. */}
            <p className="hero-en-lead">
              {copy.leadA}
              <span className="hero-en-wide-only">{copy.leadWide}</span>
              {copy.leadEnd}
            </p>

            {arcBody ? (
              <HeroArcText className="hero-en-body hero-en-body--arc" text={copy.bodyArc} lang={lang} />
            ) : (
              <p className="hero-en-body">
                {copy.bodyA}
                <span className="hero-en-wide-only">{' '}{copy.wideA}</span>
                {' '}{copy.bodyB}
                <span className="hero-en-wide-only">{' '}{copy.wideB}</span>
              </p>
            )}
          </div>

          <div className="hero-en-bottom">
            {/* The explicit space matters. These are inline spans blockified by
                the flex column, so they read as separate lines on screen — but a
                crawler concatenating inline text with no whitespace between them
                produces "sprzedażKompleksowa" / "salesPremium", a token that is
                in no dictionary and breaks the phrase at the seam. */}
            <h1 className="hero-en-title">
              <span className="hero-en-title-display">{copy.display}</span>{' '}
              <span className="hero-en-title-sub">{copy.sub}</span>
            </h1>

            <div className="hero-en-actions">
              <a href="#kontakt" className="hero-en-cta">{copy.ctaPrimary} →</a>
              <a href="#portfolio" className="hero-en-cta-secondary">{copy.ctaSecondary}</a>
            </div>
          </div>
        </div>
      </div>

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
