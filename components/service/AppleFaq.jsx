'use client';

import { useState, useId, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';
import { zachowaniePrzewijania } from '@/lib/ruch';

/* 5.11.2026 (ANC1; BL-03, CB-03, CB-04, PLAN-v2 6.0 i 6.16) - stale kotwice i jeden FAQPage:
   - faqData[i].id / .idEn (opcjonalne): stale id pytania zamiast useId(), np.
     { id: 'jak-dlugo-trwa-pozycjonowanie', idEn: 'how-long-does-seo-take', question, answer, ... }.
     Przycisk dostaje id = kotwica, odpowiedz id = kotwica + '-odp'. Pole id nie trafia do JSON-LD.
     Wejscie z #kotwica (takze #kotwica-odp) i zmiana hasha otwieraja to pytanie i przewijaja do niego.
   - extraSchema: lista { question, answer, questionEn?, answerEn? } doklejana do TEGO SAMEGO
     wezla FAQPage (hub GEO: 8 FAQ + 8 kart = 16 pytan w jednym FAQPage), bez renderowania.
   - schema={false}: bez JSON-LD (gdy FAQPage na stronie generuje kto inny).
   - sectionId: id na <section> (np. 'faq'); dwa AppleFaq na stronie = rozne id.
   Bez tych pol HTML i JSON-LD istniejacych stron sa takie jak wczesniej. */
const tekst = (lang, pl, en) => (lang === 'pl' ? pl : (en || pl));

// 6.11.2026 (wyglad z makiety): klasy faq-apple-* dla app/wyglad.css (kolory i
// typografia z tokenow zamiast wpisanych #1D1D1F / #333336). wariant="panel"
// (strona glowna): tytul po lewej, pytania po prawej z numeracja "01" - numer
// to licznik CSS (app/wyglad.css), nie tekst w HTML; tresc pytan bez zmian.
export default function AppleFaq({ faqData, title = "Najczęstsze Pytania", extraSchema = [], schema = true, sectionId, wariant }) {
  const panel = wariant === 'panel';
  const lang = useLocale();
  const [openIndex, setOpenIndex] = useState(0);
  // Prefiks id z useId, nie sam indeks: drugi AppleFaq na stronie nie zderzy
  // sie w aria-controls / aria-labelledby.
  const uid = useId();
  const kotwice = faqData.map((faq) => (lang === 'pl' ? faq.id : (faq.idEn ?? faq.id)) || null);
  const kotwiceKlucz = kotwice.join('|');

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Otwarcie pytania z #kotwica: przy wejsciu i przy zmianie hasha (link w obrebie strony).
  // Przewijamy po animacji (0,3 s), bo zamkniecie pierwszego pytania przesuwa uklad.
  useEffect(() => {
    if (!kotwiceKlucz.replace(/\|/g, '')) return undefined;
    const lista = kotwiceKlucz.split('|');
    let timer;
    const otworzZHasha = () => {
      let cel = '';
      try { cel = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { cel = window.location.hash.slice(1); }
      if (!cel) return;
      const index = lista.findIndex((k) => k && (k === cel || `${k}-odp` === cel));
      if (index === -1) return;
      setOpenIndex(index);
      clearTimeout(timer);
      timer = setTimeout(() => {
        const el = document.getElementById(lista[index]);
        if (el) el.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
      }, 350);
    };
    otworzZHasha();
    window.addEventListener('hashchange', otworzZHasha);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', otworzZHasha);
    };
  }, [kotwiceKlucz]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...faqData, ...extraSchema].map((faq) => ({
      '@type': 'Question',
      name: tekst(lang, faq.question, faq.questionEn),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tekst(lang, faq.answer, faq.answerEn)
      }
    }))
  };

  return (
    <section id={sectionId} className={`faq-apple${panel ? ' faq-apple--panel' : ''}`} style={{ padding: '6rem 0' }}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="container" style={panel ? undefined : { maxWidth: '800px', margin: '0 auto' }}>
        <div className="faq-apple-uklad">
        <Reveal>
          <h2 className="faq-apple-tytul" style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: 700, 
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
            const kotwica = kotwice[index];
            const pytId = kotwica || `${uid}-pyt-${index}`;
            const odpId = kotwica ? `${kotwica}-odp` : `${uid}-odp-${index}`;
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div className="faq-apple-pozycja" style={{ borderBottom: '1px solid #E5E5EA' }}>
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
                    className="faq-apple-pytanie"
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
                      // Tylko pytania z kotwica: odstep od przypietego naglowka (89 px) przy skoku do #id.
                      ...(kotwica ? { scrollMarginTop: '110px' } : {}),
                    }}
                  >
                    <span style={{ paddingRight: '2rem' }}>
                      <span
                        style={{ fontSize: '1.25rem', fontWeight: 600 }}
                        dangerouslySetInnerHTML={{ __html: lang === 'pl' ? faq.question : (faq.questionEn || faq.question) }}
                      />
                    </span>
                    <motion.div
                      className="faq-apple-ikona"
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
                    className="faq-apple-odp"
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
      </div>
    </section>
  );
}
