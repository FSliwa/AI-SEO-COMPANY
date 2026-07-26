'use client';

import { useState, useEffect, useRef } from 'react';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function WhyUs() {
  const [animated, setAnimated] = useState(false);
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        const duration = 1500;
        const steps = 40;
        const intervalTime = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
          step++;
          setVal1(Math.min(81, Math.floor((81 / steps) * step)));
          setVal2(Math.min(80, Math.floor((80 / steps) * step)));
          setVal3(Math.min(23, Math.floor((23 / steps) * step)));

          if (step >= steps) clearInterval(timer);
        }, intervalTime);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section className="why-us" ref={ref} style={{ background: '#F5F5F7', padding: '7rem 0', color: '#1D1D1F' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto', textAlign: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> WHY US
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15, color: '#1D1D1F', marginBottom: '1.25rem' }}>
            Result driven projects, with a focus on design and functionality
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6 }}>
            Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych.
          </p>
        </Reveal>

        {/* Apple Intelligence Bento Grid */}
        <RevealStagger className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <RevealItem className="stat-card" style={{ 
            background: '#FFFFFF', 
            borderRadius: '28px', 
            padding: '3.5rem 2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.04)',
            transition: 'transform 0.4s ease, boxShadow 0.4s ease'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                TRUST & CONVERSION
              </div>
              <div className="stat-number" style={{ fontSize: 'clamp(4rem, 7vw, 5.5rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                {val1}%
              </div>
            </div>
            <div className="stat-label" style={{ fontSize: '1.1rem', color: '#515154', fontWeight: 500, lineHeight: 1.5 }}>
              klientów musi zaufać marce, zanim podejmie decyzję o zakupie.
            </div>
          </RevealItem>

          <RevealItem className="stat-card" style={{ 
            background: '#FFFFFF', 
            borderRadius: '28px', 
            padding: '3.5rem 2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.04)',
            transition: 'transform 0.4s ease, boxShadow 0.4s ease'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                BRAND RECOGNITION
              </div>
              <div className="stat-number" style={{ fontSize: 'clamp(4rem, 7vw, 5.5rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                +{val2}%
              </div>
            </div>
            <div className="stat-label" style={{ fontSize: '1.1rem', color: '#515154', fontWeight: 500, lineHeight: 1.5 }}>
              wzrostu rozpoznawalności dzięki spójnemu systemowi wizualnemu.
            </div>
          </RevealItem>

          <RevealItem className="stat-card" style={{ 
            background: '#FFFFFF', 
            borderRadius: '28px', 
            padding: '3.5rem 2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.04)',
            transition: 'transform 0.4s ease, boxShadow 0.4s ease'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                REVENUE IMPACT
              </div>
              <div className="stat-number" style={{ fontSize: 'clamp(4rem, 7vw, 5.5rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                +{val3}%
              </div>
            </div>
            <div className="stat-label" style={{ fontSize: '1.1rem', color: '#515154', fontWeight: 500, lineHeight: 1.5 }}>
              średniego przychodu więcej przy jednolitej komunikacji SEO & Web.
            </div>
          </RevealItem>

        </RevealStagger>
      </div>
    </section>
  );
}
