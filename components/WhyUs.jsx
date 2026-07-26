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
        setAnimated(true);

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
    <section className="why-us" ref={ref}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> Dlaczego My
          </div>
          <h2>Result driven projects, with a focus on design and functionality</h2>
          <p>Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych.</p>
        </Reveal>

        {/* VIS Screenshot 3 Large Centered White Cards Grid */}
        <RevealStagger className="stats-grid">
          <RevealItem className="stat-card">
            <div className="stat-number">{val1}%</div>
            <div className="stat-label">klientów musi zaufać marce, zanim podejmie decyzję o zakupie.</div>
          </RevealItem>
          <RevealItem className="stat-card">
            <div className="stat-number">+{val2}%</div>
            <div className="stat-label">wzrostu rozpoznawalności dzięki spójnemu systemowi wizualnemu.</div>
          </RevealItem>
          <RevealItem className="stat-card">
            <div className="stat-number">+{val3}%</div>
            <div className="stat-label">średniego przychodu więcej przy jednolitej komunikacji SEO & Web.</div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
