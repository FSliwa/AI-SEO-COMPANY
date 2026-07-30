'use client';

import { useState, useEffect } from 'react';

export default function ArticleTOC({ items = [] }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

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
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <nav style={{
      background: '#F5F5F7',
      borderRadius: '16px',
      padding: '1.5rem 2rem',
      marginBottom: '2.5rem',
    }}>
      <button
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
          Spis treści
        </span>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div style={{
        maxHeight: isOpen ? '600px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, opacity 0.3s ease',
        opacity: isOpen ? 1 : 0,
      }}>
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
              <button
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  width: '100%',
                  fontSize: '0.9rem',
                  fontWeight: activeId === id ? 600 : 400,
                  color: activeId === id ? '#1D1D1F' : '#86868B',
                  backgroundColor: activeId === id ? 'rgba(29,29,31,0.06)' : 'transparent',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.4,
                }}
              >
                {title || label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
