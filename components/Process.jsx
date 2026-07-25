'use client';

import { useState } from 'react';

export default function Process() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Strategy first. Always.',
    'Find the bold idea',
    'Nail the process',
    'Create to convert',
    'Build for scale'
  ];

  const steps = [
    { num: '1', title: 'Odkrycie & Strategia', desc: 'Badamy grupę docelową, konkurencję i frazy kluczowe.' },
    { num: '2', title: 'Kierunek Kreatywny', desc: 'Moodboardy i unikalny ton komunikacji.' },
    { num: '3', title: 'Identyfikacja Visual', desc: 'Logo, paleta barw i pełna księga znaku.' },
    { num: '4', title: 'UX & UI Design', desc: 'Przemyślane makiety nastawione na sprzedaż.', highlight: true },
    { num: '5', title: 'Wdrożenie w Next.js', desc: 'Kodowanie z optymalizacją SEO i Core Web Vitals.' },
    { num: '6', title: 'Launch & Wsparcie', desc: 'Uruchomienie, weryfikacja w Google i opieka.' },
  ];

  const positions = [
    { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '25%', left: '93.3%', transform: 'translate(-50%, -50%)' },
    { top: '75%', left: '93.3%', transform: 'translate(-50%, -50%)' },
    { top: '100%', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '75%', left: '6.7%', transform: 'translate(-50%, -50%)' },
    { top: '25%', left: '6.7%', transform: 'translate(-50%, -50%)' },
  ];

  return (
    <section className="process" id="proces">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">
            <span className="asterisk">✳</span> FRAMEWORK
          </div>
          <h2>Our brand-to-build framework</h2>
          <p>Przekształcamy tożsamość marki w profesjonalne doświadczenie cyfrowe z przemyślaną strukturą konwersji.</p>
        </div>

        {/* KOTA Framework Tabs (Screenshot 4) */}
        <div className="kota-framework-tabs">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`kota-tab ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Circular Ring Workflow (VIS Screenshot 4) */}
        <div className="process-diagram-wrapper">
          <div className="process-circle-ring"></div>
          <div className="process-center-text">
            <strong>{tabs[activeTab]}</strong><br/>
            Przekładamy tożsamość firmy na dochodową obecność cyfrową w 6 przejrzystych krokach.
          </div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`process-node ${step.highlight ? 'highlight' : ''}`}
              style={positions[idx]}
            >
              <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '2px' }}>{step.num}.</div>
              <div style={{ lineHeight: '1.2' }}>{step.title}</div>
            </div>
          ))}
        </div>

        {/* Responsive Grid Fallback */}
        <div className="process-grid-fallback">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
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
