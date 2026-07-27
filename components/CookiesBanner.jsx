'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import Link from 'next/link';

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].cookies;

  useEffect(() => {
    const consent = localStorage.getItem('cookiesConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '600px',
      background: '#0F172A',
      color: '#FFF',
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5, color: '#E2E8F0' }}>
        {t.text}{' '}
        <Link href="/cookies" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>
          {t.policy}
        </Link>
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleDecline}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#FFF',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {t.decline}
        </button>
        <button 
          onClick={handleAccept}
          style={{
            background: 'var(--color-primary)',
            border: 'none',
            color: '#FFF',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#144e88'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
