'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import kosm from './KosmetykaSekcji.module.css';

export default function Process() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(3); // Default step 4 (UX & UI Design)
  const sectionRef = useRef(null);
  const lang = useLocale();
  const t = useTranslations('process');

  const tabs = lang === 'pl' ? [
    'Najpierw strategia. Zawsze.',
    'Znajdź odważną koncepcję',
    'Dopracuj proces',
    'Twórz pod konwersję',
    'Buduj ze skalą'
  ] : lang === 'de' ? [
    'Strategie zuerst. Immer.',
    'Starkes Konzept finden',
    'Prozess präzisieren',
    'Auf Conversion auslegen',
    'Skalierbar entwickeln'
  ] : [
    'Strategy first. Always.',
    'Find the bold idea',
    'Nail the process',
    'Create to convert',
    'Build for scale'
  ];

  const steps = lang === 'pl' ? [
    { num: '1', title: 'Odkrycie & Strategia', desc: 'Badamy grupę docelową, konkurencję i kluczowe frazy SEO.' },
    { num: '2', title: 'Kierunek Kreatywny', desc: 'Projektujemy moodboardy i unikalny ton komunikacji marki.' },
    { num: '3', title: 'Identyfikacja Wizualna', desc: 'Tworzymy nowoczesne logo, paletę barw i system wizualny.' },
    { num: '4', title: 'UX & UI Design', desc: 'Projektujemy makiety ukierunkowane na maksymalną konwersję.', highlight: true },
    { num: '5', title: 'Wdrożenie w Next.js', desc: 'Kodujemy w ultrawydajnym Next.js z dbałością o Core Web Vitals.' },
    { num: '6', title: 'Start & Wsparcie', desc: 'Uruchamiamy serwis, weryfikujemy w Google i zapewniamy stałe wsparcie.' },
  ] : lang === 'de' ? [
    { num: '1', title: 'Analyse & Strategie', desc: 'Wir analysieren Zielgruppe, Wettbewerb und geschäftsrelevante SEO-Keywords.' },
    { num: '2', title: 'Kreative Richtung', desc: 'Wir entwickeln Moodboards und eine klare Tonalität für Ihre Marke.' },
    { num: '3', title: 'Visuelle Identität', desc: 'Wir gestalten Logo, Farbsystem und ein konsistentes Designsystem.' },
    { num: '4', title: 'UX & UI Design', desc: 'Wir entwerfen konversionsstarke Mockups für klare B2B-Anfragen.', highlight: true },
    { num: '5', title: 'Next.js Entwicklung', desc: 'Wir programmieren schnelle Next.js-Seiten optimiert für Core Web Vitals.' },
    { num: '6', title: 'Go-Live & Betreuung', desc: 'Wir starten die Website, verifizieren sie in Google und begleiten laufend.' },
  ] : [
    { num: '1', title: 'Discovery & Strategy', desc: 'We research target audiences, competitors, and core SEO queries.' },
    { num: '2', title: 'Creative Direction', desc: 'We craft moodboards and a distinctive brand communication tone.' },
    { num: '3', title: 'Visual Identity', desc: 'We craft modern logos, color palettes, and visual design systems.' },
    { num: '4', title: 'UX & UI Design', desc: 'We design high-conversion mockups tailored for sales momentum.', highlight: true },
    { num: '5', title: 'Next.js Development', desc: 'We code ultra-fast Next.js apps optimized for Core Web Vitals.' },
    { num: '6', title: 'Launch & Support', desc: 'We launch your site, verify in Google, and provide ongoing support.' },
  ];
  const totalSteps = String(steps.length).padStart(2, '0');

  // Obrot kola od przewijania. Wczesniej kazde zdarzenie scroll wolalo setRotation, czyli
  // przerenderowanie calego komponentu (6 wezlow, AnimatePresence) wiele razy na klatke.
  // Teraz: jedna zmienna CSS --rot na obudowie kola, zapis najwyzej raz na klatke (rAF),
  // nasluch tylko gdy sekcja jest blisko ekranu (IntersectionObserver), bez renderu Reacta.
  const diagramRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const diagram = diagramRef.current;
    if (!section || !diagram) return undefined;
    let raf = 0;
    let ostatnia = -1;
    const zapisz = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
      const kat = Math.round(progress * 240 * 10) / 10;
      if (kat === ostatnia) return;
      ostatnia = kat;
      diagram.style.setProperty('--rot', String(kat));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(zapisz); };
    let nasluch = false;
    const wlacz = () => {
      if (nasluch) return;
      nasluch = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    };
    const wylacz = () => {
      if (!nasluch) return;
      nasluch = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    zapisz();
    if (typeof IntersectionObserver === 'undefined') { wlacz(); return wylacz; }
    const io = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) { if (w.isIntersecting) wlacz(); else wylacz(); }
    }, { rootMargin: '200px 0px' });
    io.observe(section);
    return () => { io.disconnect(); wylacz(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="process" id="proces" ref={sectionRef}>
      <div className="container">
        <div className="section-header center">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        {/* KOTA Framework Tabs */}
        <div className="kota-framework-tabs" style={{ position: 'relative' }}>
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`kota-tab ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
              style={{ position: 'relative', zIndex: 2 }}
            >
              {tab}
              {activeTab === idx && (
                <motion.div
                  layoutId="activeKotaTabPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: 'var(--color-primary)',
                    zIndex: -1
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Interactive Rotating Circular Ring Workflow */}
        <div className="process-diagram-wrapper" ref={diagramRef}>
          {/* Ambient Background Glow */}
          <div className="process-ambient-glow"></div>

          {/* Center Circle Ring Line (82% diameter) */}
          <div 
            className="process-circle-ring"
            style={{ transform: 'rotate(calc(var(--rot, 0) * 1deg))' }}
          ></div>

          {/* Central Description Box with Cross-Fade Transition */}
          <div className="process-center-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeStep}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8', fontWeight: 800, marginBottom: '0.2rem' }}>
                  {tabs[activeTab]}
                </div>
                <span className={kosm.procesCentrumMeta} aria-hidden="true">
                  0{steps[activeStep].num} / {totalSteps}
                </span>
                <span className={kosm.procesCentrumNagl}>
                  0{steps[activeStep].num}. {steps[activeStep].title}
                </span>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>
                  {steps[activeStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Rotating Wheel of Node Circles */}
          <div 
            className="process-wheel-layer"
            style={{ 
              position: 'absolute', 
              inset: 0, 
              transform: 'rotate(calc(var(--rot, 0) * 1deg))',
              pointerEvents: 'none'
            }}
          >
            {steps.map((step, idx) => {
              // 6 steps = 60° increments, starting at top (-90°)
              const angleDeg = idx * 60 - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              // Radius of 41% puts the circle centers EXACTLY on the enlarged 82% perimeter ring!
              const radiusPercent = 41;
              const leftPercent = 50 + radiusPercent * Math.cos(angleRad);
              const topPercent = 50 + radiusPercent * Math.sin(angleRad);

              const isActive = activeStep === idx;
              const isHighlight = step.highlight || isActive;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`process-node-interactive ${isHighlight ? 'highlight' : ''} ${isActive ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    top: `${topPercent}%`,
                    left: `${leftPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'auto'
                  }}
                  title={`${step.num}. ${step.title}`}
                >
                  {/* Counter-rotate inner text so it stays perfectly horizontal & readable during scroll rotation */}
                  <div 
                    className="process-node-inner"
                    style={{ 
                      transform: 'rotate(calc(var(--rot, 0) * -1deg))'
                    }}
                  >
                    <span className={`process-node-num ${kosm.procesWezelLicznik} ${isHighlight ? kosm.procesWezelLicznikJasny : ''}`} aria-hidden="true">0{step.num} / {totalSteps}</span>
                    <span className="process-node-title">{step.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid Fallback */}
        <div className={`process-grid-fallback ${kosm.procesSiatka}`}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`step-card ${activeStep === idx ? 'active' : ''} ${kosm.krokKarta} ${activeStep === idx ? kosm.krokKartaAktywna : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className={kosm.krokNaglowek}>
                <div className={`step-number ${kosm.krokLicznik}`} aria-hidden="true">0{step.num} / {totalSteps}</div>
                <h3>{step.title}</h3>
              </div>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
