'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Process() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(3); // Default step 4 (UX & UI Design)
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang].process;

  const tabs = lang === 'pl' ? [
    'Najpierw strategia. Zawsze.',
    'Znajdź odważną koncepcję',
    'Dopracuj proces',
    'Twórz pod konwersję',
    'Buduj ze skalą'
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
  ] : [
    { num: '1', title: 'Discovery & Strategy', desc: 'We research target audiences, competitors, and core SEO queries.' },
    { num: '2', title: 'Creative Direction', desc: 'We craft moodboards and a distinctive brand communication tone.' },
    { num: '3', title: 'Visual Identity', desc: 'We craft modern logos, color palettes, and visual design systems.' },
    { num: '4', title: 'UX & UI Design', desc: 'We design high-conversion mockups tailored for sales momentum.', highlight: true },
    { num: '5', title: 'Next.js Development', desc: 'We code ultra-fast Next.js apps optimized for Core Web Vitals.' },
    { num: '6', title: 'Launch & Support', desc: 'We launch your site, verify in Google, and provide ongoing support.' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
      
      setRotation(progress * 240);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="process" id="proces" ref={sectionRef}>
      <div className="container">
        <div className="section-header center">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
          </div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
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
        <div className="process-diagram-wrapper">
          {/* Ambient Background Glow */}
          <div className="process-ambient-glow"></div>

          {/* Center Circle Ring Line (82% diameter) */}
          <div 
            className="process-circle-ring"
            style={{ transform: `rotate(${rotation}deg)` }}
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
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {tabs[activeTab]}
                </div>
                <strong style={{ fontSize: '1.05rem', color: '#0F172A', display: 'block', marginBottom: '0.35rem', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  0{steps[activeStep].num}. {steps[activeStep].title}
                </strong>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748B', lineHeight: '1.5' }}>
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
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.05s linear',
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
                      transform: `rotate(${-rotation}deg)`,
                      transition: 'transform 0.05s linear'
                    }}
                  >
                    <span className="process-node-num">0{step.num}.</span>
                    <span className="process-node-title">{step.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid Fallback */}
        <div className="process-grid-fallback">
          {steps.map((step, idx) => (
            <div key={idx} className={`step-card ${activeStep === idx ? 'active' : ''}`} onClick={() => setActiveStep(idx)}>
              <div className="step-number">0{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
