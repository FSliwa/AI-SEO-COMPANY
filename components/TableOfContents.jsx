'use client';

import React from 'react';

export default function TableOfContents({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ margin: '3rem 0', padding: '2rem', backgroundColor: '#F5F5F7', borderRadius: '20px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#1D1D1F' }}>Spis treści</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href={`#${item.id}`} 
              style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-cta)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
            >
              {index + 1}. {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
