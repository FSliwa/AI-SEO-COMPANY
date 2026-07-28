'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ScrollReveal';

export default function AppleFaq({ faqData, title = "Najczęstsze Pytania" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: '#1D1D1F', 
            marginBottom: '3rem',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div style={{ borderBottom: '1px solid #E5E5EA', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleAccordion(index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.5rem 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#1D1D1F',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, paddingRight: '2rem' }}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ color: isOpen ? 'var(--color-primary)' : '#1D1D1F', flexShrink: 0 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto", marginBottom: '1.5rem' },
                          collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
