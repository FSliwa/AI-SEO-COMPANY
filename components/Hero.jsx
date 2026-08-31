'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import HeroArcText from './HeroArcText';
import SceneErrorBoundary from './SceneErrorBoundary';

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
/* The lead and the body are segment lists now, not strings. Segments marked
   `wide: true` render inside .hero-en-wide-only spans, which phones (and the
   squeezed near-square desktop) hide — so the two readings are maintained in
   ONE place and the mobile text is a grammatical subsequence of the wide one
   by construction. The full wide string (also the arc's input) is derived by
   joining every segment, so the two variants cannot drift apart. Every cut is
   an adjective or a keyword-free clause; each phrase that ranks stays in the
   visible mobile text. */
const COPY = {
  en: {
    leadSeg: [
      { t: 'We do what search engine optimisation companies rarely do: report on pipeline' },
      { t: ', not on rankings', wide: true },
      { t: '.' }
    ],
    bodySeg: [
      // The whole first sentence is a wide-screen clause: none of its words
      // is a listed phrase ("SEO" recurs in "advanced SEO" below), so phones
      // open straight on the sentence that carries the accents.
      { t: 'The creativity of human SEO teams with AI-driven accuracy delivers dominant visibility and lasting growth. We merge the two so your brand compounds results instead of chasing them. ', wide: true },
      { t: 'Brand strategy,' },
      { t: ' innovative', wide: true },
      { t: ' design and advanced SEO make your business remembered and chosen' },
      { t: ' at massive scale', wide: true },
      { t: '.' },
      { t: ' We combine all three rather than treating them as separate projects.', wide: true }
    ],
    display: 'that drives sales',
    sub: 'Premium SEO & Marketing Agency for Companies',
    ctaPrimary: 'Get Proposal',
    ctaSecondary: 'View Portfolio'
  },
  pl: {
    leadSeg: [
      { t: 'Twój projekt i strony' },
      { t: ' to nasz priorytet', wide: true },
      { t: ' – ' },
      { t: 'skuteczne ', wide: true },
      { t: 'pozycjonowanie napędzające wzrost.' }
    ],
    bodySeg: [
      { t: 'Łączymy strategię marki,' },
      { t: ' nowatorskie', wide: true },
      { t: ' projektowanie i zaawansowane SEO' },
      // The whole result clause is wide-screen: not one of its words is a
      // listed phrase, and without it the sentence still closes cleanly.
      { t: ', aby Twoja firma była widoczna, zapamiętana i masowo wybierana przez klientów', wide: true },
      { t: '.' },
      { t: ' Prowadzimy te trzy obszary razem, a nie jako osobne projekty.', wide: true },
      { t: ' Agencja SEO i Marketingowa Warszawa – pozycjonowanie stron i projektowanie.' },
      { t: ' Rozliczamy się z realnego wzrostu firmy i raportujemy sprzedaż, nie same pozycje w wyszukiwarce.', wide: true }
    ],
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

  // Dwa stany, bo to dwa rozne momenty. `sceneIn` = scena namalowala pierwsza
  // klatke (fade kanwy). `copyIn` = scena SKONCZYLA swoja animacje wstepna -
  // dopiero wtedy wchodzi tekst.
  //
  // Skad wiemy, ze skonczyla: nie z zegara. Stale czasowe w CSS zawodzily na
  // dwa sposoby - na wolnym GPU scena jeszcze jechala, gdy tekst juz wszedl
  // (najazd na litery), a w karcie w tle opoznienie CSS uplywalo niewidocznie
  // i tekst pojawial sie bez zadnej animacji. Zamiast tego obserwujemy w petli
  // rAF pozycje obiektow sceny (onLoad daje instancje Application z
  // getAllObjects); tekst dostaje sygnal, gdy obiekty NAJPIERW sie poruszyly,
  // a POTEM stoja nieruchomo przez ~450 ms. Scena animuje sie ta sama petla
  // rAF, wiec w ukrytej karcie obie animacje stoja razem i po powrocie graja
  // razem - synchronizacja jest z ruchu, nie z czasu.
  const [sceneIn, setSceneIn] = useState(false);
  const [copyIn, setCopyIn] = useState(false);
  // Spline trzyma onLoad z pierwszego renderu, wiec stan w domknieciu bylby
  // przestarzaly - ref jest wspolny dla wszystkich renderow.
  const tekstPokazanyRef = useRef(false);
  const pokazTekst = () => { tekstPokazanyRef.current = true; setCopyIn(true); };

  const onSceneLoad = (app) => {
    setSceneIn(true);

    // Scena zaladowala sie PO bezpieczniku (zimny cache 36 MB potrafi
    // przekroczyc 15 s) - tekst juz stoi, wiec wjazd NIE MOZE grac pod nim.
    // Zostaje statyczna pierwsza klatka; to wlasnie ten przypadek wygladal
    // u uzytkownika jak "tekst najezdza na animacje".
    if (tekstPokazanyRef.current) {
      try { app.stop(); } catch (e) {}
      window.__heroSync = { sciezka: 'scena-po-bezpieczniku', tekstPoMs: 0 };
      return;
    }

    // Diagnostyka zostaje w produkcji: window.__heroSync pokazuje sciezke
    // i moment wejscia tekstu na kazdej maszynie - bez zgadywania.
    const diag = (window.__heroSync = { t0: performance.now(), sciezka: null, tekstPoMs: null });
    const koniec = (sciezka) => {
      if (diag.sciezka) return;
      diag.sciezka = sciezka;
      diag.tekstPoMs = Math.round(performance.now() - diag.t0);
      pokazTekst();
    };

    // Dostepnosc jako para: CSS przy ograniczonym ruchu pokazuje tekst od
    // razu, wiec scena nie moze grac wjazdu pod nim - zostaje zatrzymana.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { app.stop(); } catch (e) {}
      koniec('ograniczony-ruch');
      return;
    }

    // STEROWANIE zamiast pomiaru. Wczesniejsze podejscia MIERZYLY, kiedy
    // scena skonczy wjazd (stale czasowe CSS, pozycje obiektow, roznice
    // pikseli kanwy) i kazde rozjezdzalo sie na innej maszynie: stale nie
    // znaja tempa GPU, pozycje nie widza ruchu kamery, a odczyt pikseli
    // przegrywa loterie kolejnosci rAF z renderem i zwraca zera.
    //
    // Tu nie ma czego mierzyc, bo sami wyznaczamy start: scena staje
    // (app.stop) i rusza (app.play) dopiero razem z naszym licznikiem.
    // Licznik sumuje czas WYLACZNIE miedzy klatkami rAF - w tej samej
    // domenie zegara, w ktorej Spline prowadzi swoja os czasu. W ukrytej
    // karcie rAF nie tyka, wiec staja OBIE animacje i po powrocie graja
    // dalej razem - to naprawia takze "tekst w ogole bez animacji", ktory
    // bral sie z opoznien CSS uplywajacych na zegarze sciennym w tle.
    //
    // 4250 ms = os czasu wjazdu zdekodowana z .splinecode (start z
    // opoznieniem 1500 ms, ruchy po 1000 ms, ostatni odpalany na 3000 ms)
    // + 250 ms marginesu na osadzenie.
    const WJAZD_MS = 4250;
    let zatrzymano = false;
    try { app.stop(); zatrzymano = true; } catch (e) {}
    if (!zatrzymano) { setTimeout(() => koniec('bez-stop'), WJAZD_MS); return; }

    const start = () => {
      try { app.play(); } catch (e) {}
      let suma = 0;
      let poprzednia = null;
      const tik = (teraz) => {
        if (diag.sciezka) return;
        if (poprzednia !== null) suma += Math.min(100, teraz - poprzednia);
        poprzednia = teraz;
        if (suma >= WJAZD_MS) { koniec('wspolny-zegar'); return; }
        requestAnimationFrame(tik);
      };
      requestAnimationFrame(tik);
    };

    // Start dopiero w widocznej karcie: wjazd i tekst maja byc OBEJRZANE,
    // nie odhaczone w tle.
    if (document.visibilityState === 'visible') {
      start();
    } else {
      const naPowrot = () => {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', naPowrot);
        start();
      };
      document.addEventListener('visibilitychange', naPowrot);
    }
  };

  useEffect(() => {
    // Katastrofa sieciowa: hero nie moze zostac pusty na zawsze.
    // 9 s, nie 15: tekst to tresc i element LCP, scena to dekoracja. Na
    // maszynach, gdzie 36 MB sceny inicjalizuje sie dluzej (zmierzono 60+ s
    // przy malej ilosci wolnego dysku), tekst wchodzi ta sciezka, a spozniona
    // scena zostaje zatrzymana na pierwszej klatce - patrz straznik wyzej.
    const failsafe = setTimeout(() => { setSceneIn(true); pokazTekst(); }, 9000);
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
    if (!window.matchMedia('(min-width: 901px) and (min-aspect-ratio: 1/1)').matches) return;
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
    // Width alone is not enough: the scene is sized by canvas HEIGHT, so a
    // narrow-but-tall desktop window (side-by-side with another app) overflows
    // the width and squeezes the arc into a spiral. Below ~7:6 the stylesheet
    // swaps to the phone composition, and the paragraph must follow it.
    const query = window.matchMedia('(min-width: 901px) and (min-aspect-ratio: 1/1)');
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

  // The phone layout is measured, not guessed. The copy is bottom-anchored to
  // the lettering band, so every pixel the paragraph does not fill surfaces as
  // dead air under the header — and how much it fills changes with viewport
  // width, locale and font loading (the Polish runs 199px at 375, 177px at
  // 390). One observed height feeds the whole chain — row one, the band's top,
  // the section height — through calc() in the stylesheet, which keeps the
  // header gap at 20px and the letters gap at 8px at every width in both
  // languages. The static fallbacks in those rules cover the pre-hydration
  // frames; the observer also refires on the post-font-load reflow.
  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;
    const section = copy.closest('.hero');
    const top = copy.querySelector('.hero-en-top');
    const header = document.querySelector('header');
    if (!section || !top) return;
    const apply = () => {
      section.style.setProperty('--m-copy-h', `${Math.round(top.getBoundingClientRect().height)}px`);
      if (header) {
        section.style.setProperty('--m-head-h', `${Math.round(header.getBoundingClientRect().height)}px`);
      }
    };
    const ro = new ResizeObserver(apply);
    ro.observe(top);
    if (header) ro.observe(header);
    apply();
    // The observer only delivers during rendering steps, which hidden
    // documents never run — a viewport resized in the background (device
    // emulation, a backgrounded tab restored later) would keep stale numbers
    // until the next paint. These two run apply() off plain events instead;
    // getBoundingClientRect is synchronous and works hidden.
    window.addEventListener('resize', apply);
    document.addEventListener('visibilitychange', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
      document.removeEventListener('visibilitychange', apply);
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
        <SceneErrorBoundary
          fallback={<div className="hero-en-orb" />}
          onFail={() => { setSceneIn(true); pokazTekst(); }}
        >
          <Spline scene={SCENE} onLoad={onSceneLoad} />
        </SceneErrorBoundary>
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
        <div ref={copyRef} className={`hero-en-copy${copyIn ? ' is-copy-in' : ''}`}>
          <div className="hero-en-top">
            {/* Same device as the paragraph below: the clause phones drop carries
                no phrase of its own. "not on rankings" goes, and "rankings"
                still appears 4 more times on the page; "to nasz priorytet" goes,
                and "priorytet" survives elsewhere. Both readings are complete
                sentences — the cut is at a clause boundary, not mid-thought. */}
            <p className="hero-en-lead">
              {copy.leadSeg.map((s, i) =>
                s.wide
                  ? <span key={i} className="hero-en-wide-only">{s.t}</span>
                  : <Fragment key={i}>{s.t}</Fragment>
              )}
            </p>

            {arcBody ? (
              <HeroArcText
                className="hero-en-body hero-en-body--arc"
                text={copy.bodySeg.map(s => s.t).join('')}
                lang={lang}
              />
            ) : (
              <p className="hero-en-body">
                {copy.bodySeg.map((s, i) =>
                  s.wide
                    ? <span key={i} className="hero-en-wide-only">{s.t}</span>
                    : <Fragment key={i}>{s.t}</Fragment>
                )}
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
              {/* Tekstowy ekwiwalent napisu "SEO" ze sceny 3D. Podmiot zdania
                  istnial dotad wylacznie jako piksele artworku, wiec surowy
                  HTML zaczynal H1 od srodka zdania ("ktore buduje sprzedaz") -
                  crawler i czytnik ekranu dostawaly zdanie bez podmiotu. To
                  jest alternatywa tekstowa realnie widocznej grafiki (WCAG),
                  nie ukryta fraza: scena doslownie wyswietla slowo SEO. */}
              <span className="sr-only">{lang === 'pl' ? 'SEO, ' : 'SEO '}</span>
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
