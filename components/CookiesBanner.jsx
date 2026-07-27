'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang]?.cookies || {
    text: 'Używamy plików cookies w celu świadczenia usług na najwyższym poziomie i analizy ruchu.',
    policy: 'Polityka Prywatności',
    accept: 'Zaakceptuj',
    decline: 'Odrzuć'
  };

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('cookiesConsent');
      if (!consent) {
        // Opóźnienie 1s dla płynnego slajdu wejścia
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      // W trybie prywatnym / incognito dostęp do localStorage może rzucać wyjątek — pokrótce włączamy baner
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookiesConsent', 'accepted');
    } catch (err) {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookiesConsent', 'declined');
    } catch (err) {}
    setIsVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 40, x: '-50%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            width: '90%',
            maxWidth: '580px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#FFF',
            padding: '1.25rem 1.5rem',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: '#E2E8F0', fontWeight: 400 }}>
            {t.text}{' '}
            <Link href="/cookies" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline', fontWeight: 500 }}>
              {t.policy}
            </Link>
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleDecline}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#E2E8F0',
                padding: '0.5rem 1.1rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.color = '#FFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#E2E8F0';
              }}
            >
              {t.decline}
            </button>
            <button 
              onClick={handleAccept}
              style={{
                background: 'var(--color-primary)',
                border: 'none',
                color: '#FFF',
                padding: '0.5rem 1.4rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(24, 95, 165, 0.4)',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#144e88';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
