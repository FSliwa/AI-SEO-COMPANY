'use client';

import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';

export default function AppleFaq({ faqData, title = "Najczęstsze Pytania" }) {
  const lang = useLocale();
  const [openIndex, setOpenIndex] = useState(0);
  // Prefiks id z useId, nie sam indeks: drugi AppleFaq na stronie nie zderzy
  // sie w aria-controls / aria-labelledby.
  const uid = useId();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: lang === 'pl' ? faq.question : (faq.questionEn || faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'pl' ? faq.answer : (faq.answerEn || faq.answer)
      }
    }))
  };

  return (
    <section style={{ padding: '6rem 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            const pytId = `${uid}-pyt-${index}`;
            const odpId = `${uid}-odp-${index}`;
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div style={{ borderBottom: '1px solid #E5E5EA' }}>
                  {/* Akordeon dostepny (05.10.2026). Pomiar na /, /en, cenniku i
                      stronach uslug (390 i 1440 px): przycisk bez aria-expanded
                      i aria-controls; zamkniete odpowiedzi mialy wysokosc 0 i
                      opacity 0, ale visibility visible - czytnik czytal wszystkie
                      jak otwarte, a na cenniku Tab wchodzil w link w zwinietej
                      odpowiedzi (0 px, fokus niewidoczny).
                      Bez opakowania w h3 (14.10.2026): zasada 2 zlecenia nie
                      pozwala zmieniac hierarchii naglowkow H1-H6, a h3 dokladal
                      pytania do konspektu strony (weryfikacja etapu 5). */}
                  <button
                    type="button"
                    id={pytId}
                    aria-expanded={isOpen}
                    aria-controls={odpId}
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
                    <span 
                      style={{ fontSize: '1.25rem', fontWeight: 600, paddingRight: '2rem' }}
                      dangerouslySetInnerHTML={{ __html: lang === 'pl' ? faq.question : (faq.questionEn || faq.question) }}
                    />
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ color: isOpen ? 'var(--color-primary)' : '#1D1D1F', flexShrink: 0 }}
                    >
                      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </motion.div>
                  </button>

                  {/* Answers stay mounted and collapse by height rather than unmounting.
                      Conditional rendering kept every closed answer out of the HTML, so
                      only the open one was ever crawlable.
                      inert zamiast aria-hidden (05.10.2026): zamknieta odpowiedz
                      wypada z drzewa dostepnosci i z kolejnosci Tab (link w
                      odpowiedzi cennika), a tresc dalej jest w HTML dla robotow.
                      React 19 renderuje inert="" tylko w stanie zamknietym. */}
                  <motion.div
                    id={odpId}
                    role="region"
                    aria-labelledby={pytId}
                    inert={!isOpen}
                    initial={false}
                    animate={isOpen ? 'open' : 'collapsed'}
                    variants={{
                      open: { opacity: 1, height: 'auto', marginBottom: '1.5rem' },
                      collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: lang === 'pl' ? faq.answer : (faq.answerEn || faq.answer) }}
                    />
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
