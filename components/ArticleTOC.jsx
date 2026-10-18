'use client';

import { useState, useEffect, useId } from 'react';
import { useLocale } from 'next-intl';
import { zachowaniePrzewijania } from '@/lib/ruch';

export default function ArticleTOC({ items = [] }) {
  // Derived here rather than passed in: every call site rendered <ArticleTOC items={...} />
  // with no locale, which pinned the heading to Polish on English articles.
  const lang = useLocale();
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  // id z useId, nie stala: dwa spisy na jednej stronie nie zderza sie w aria-controls.
  const listaId = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
      setActiveId(id);
    }
  };

  // Dostepnosc spisu (05.10.2026). Pomiar na /blog/audyt-techniczny-seo przy
  // 390 i 1440 px: <nav> bez nazwy, przycisk bez aria-expanded i aria-controls,
  // a po zwinieciu wszystkie 10 linkow zostawalo w kolejnosci Tab - pierwszy
  // Tab trafial na niewidoczny link (opacity 0, wysokosc 0) i fokus znikal z
  // ekranu na 11 nacisniec. Nazwa nawigacji jest w jezyku strony, stan
  // przycisku ogloszony, a zwinieta lista dostaje inert (nizej).
  return (
    <nav
      aria-label={lang === 'en' ? 'Table of contents' : 'Spis treści'}
      style={{
        background: '#F5F5F7',
        borderRadius: '16px',
        padding: '1.5rem 2rem',
        marginBottom: '2.5rem',
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listaId}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#1D1D1F',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {lang === 'en' ? 'Table of contents' : 'Spis treści'}
        </span>
        <svg
          aria-hidden="true"
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Rozwijanie przez wiersz siatki 0fr -> 1fr, nie przez max-height.
          Sztywne 600 px ucinalo koniec dluzszego spisu na telefonie: przy
          320 px ostatnie pozycje ("Najczesciej zadawane pytania", "Zrodla")
          byly przyciete i nieosiagalne. Wiersz 1fr ma zawsze wysokosc tresci.
          inert przy zwinietej liscie (05.10.2026): wysokosc 0 i opacity 0
          chowaly linki tylko wizualnie, Tab dalej w nie wchodzil. inert wyjmuje
          je z kolejnosci Tab i z drzewa dostepnosci; React 19 renderuje
          inert="" tylko dla true, wiec rozwiniety spis (stan z SSR) go nie ma. */}
      <div
        id={listaId}
        inert={!isOpen}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s ease, opacity 0.3s ease',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: '1rem 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          counterReset: 'toc',
        }}>
          {items.map(({ id, title, label }) => (
            <li key={id} style={{ counterIncrement: 'toc' }}>
              {/* Prawdziwa kotwica, nie <button>: bez href crawler nie widzial
                  powiazania pozycji spisu z sekcja, a bez JavaScriptu spis byl
                  martwy. Plynne przewijanie zostaje w onClick; adres w pasku
                  aktualizuje sie bez skoku przez replaceState. */}
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); history.replaceState(null, '', `#${id}`); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  textAlign: 'left',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  width: '100%',
                  boxSizing: 'border-box',
                  fontSize: '0.9rem',
                  fontWeight: activeId === id ? 600 : 400,
                  color: activeId === id ? '#1D1D1F' : '#86868B',
                  backgroundColor: activeId === id ? 'rgba(29,29,31,0.06)' : 'transparent',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.4,
                }}
              >
                {title || label}
              </a>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </nav>
  );
}
