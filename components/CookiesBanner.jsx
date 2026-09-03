'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@/lib/track';

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lang = useLocale();
  const t = useTranslations('cookies');

  const [consentState, setConsentState] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  // Google Consent Mode defaults to denied in the layout. Nothing here stored a
  // choice anywhere gtag could read it, so Analytics ran regardless of what the
  // user clicked; this pushes the decision through to Consent Mode.
  const applyConsentToGtag = ({ analytics, marketing }) => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    });
  };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('cookiesConsentState');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConsentState(parsed);
        // Consent Mode resets to denied on every page load, so a previously
        // granted choice has to be replayed.
        applyConsentToGtag(parsed);
      } else {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (analytics, marketing) => {
    const newState = { essential: true, analytics, marketing };
    setConsentState(newState);
    applyConsentToGtag(newState);
    // Odsetek odmów mówi, ile konwersji z reklam będzie modelowanych zamiast
    // obserwowanych; przy odmowie zdarzenie idzie jako ping bez ciasteczek.
    track('cookie_consent', {
      analytics: analytics ? 'granted' : 'denied',
      marketing: marketing ? 'granted' : 'denied',
    });
    try {
      localStorage.setItem('cookiesConsentState', JSON.stringify(newState));
      localStorage.setItem('cookiesConsent', 'saved');
    } catch (err) {}
    setIsVisible(false);
    setShowManageModal(false);
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleDeclineOptional = () => saveConsent(false, false);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Small Trigger to Re-open Cookie Preferences (EU Requirement) */}
      {!isVisible && !showManageModal && (
        <button
          onClick={() => setShowManageModal(true)}
          title={t('manage')}
          aria-label={t('manage')}
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '1.25rem',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(12px)',
            color: '#FFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            zIndex: 9998,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#0F172A';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.88)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>🍪</span> {t('title').split(' ')[0]}
        </button>
      )}

      {/* Main EU GDPR Cookie Banner (Equal Prominence Buttons) */}
      <AnimatePresence>
        {isVisible && !showManageModal && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '1.75rem',
              left: '50%',
              width: '92%',
              maxWidth: '680px',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#FFF',
              padding: '1.5rem',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              zIndex: 100000,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8', marginBottom: '0.35rem' }}>
                {t('title')}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55, color: '#E2E8F0', fontWeight: 400 }}>
                {t('text')}{' '}
                <Link href="/cookies" style={{ color: '#38BDF8', textDecoration: 'underline', fontWeight: 500 }}>
                  {t('policy')}
                </Link>
              </p>
            </div>

            {/* Equal Prominence Action Buttons (Strict EU GDPR Requirement) */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                onClick={handleDeclineOptional}
                style={{
                  flex: '1 1 140px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {t('declineAll')}
              </button>

              <button 
                onClick={handleAcceptAll}
                style={{
                  flex: '1 1 140px',
                  background: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(24, 95, 165, 0.35)',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#144e88';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary)';
                }}
              >
                {t('acceptAll')}
              </button>

              <button
                onClick={() => setShowManageModal(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  padding: '0.65rem 0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.83rem',
                  fontWeight: 500,
                  textDecoration: 'underline',
                  transition: 'color 0.25s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#FFF'}
                onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}
              >
                {t('manage')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular Preference Management Modal */}
      <AnimatePresence>
        {showManageModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            zIndex: 100001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                padding: '2rem',
                borderRadius: '24px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                  {t('manage')}
                </h3>
                <button 
                  onClick={() => setShowManageModal(false)} 
                  style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#333336' }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#333336', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t('text')}
              </p>

              {/* Category 1: Essential */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 'bold' }} style={{ fontSize: '0.95rem', color: '#0F172A' }}>{t('essentialTitle')}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    {lang === 'pl' ? 'Wymagane' : 'Always Active'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#333336', lineHeight: 1.45 }}>
                  {t('essentialDesc')}
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 'bold' }} style={{ fontSize: '0.95rem', color: '#0F172A' }}>{t('analyticsTitle')}</span>
                  <input
                    type="checkbox"
                    checked={consentState.analytics}
                    onChange={(e) => setConsentState({ ...consentState, analytics: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#333336', lineHeight: 1.45 }}>
                  {t('analyticsDesc')}
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1.75rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 'bold' }} style={{ fontSize: '0.95rem', color: '#0F172A' }}>{t('marketingTitle')}</span>
                  <input
                    type="checkbox"
                    checked={consentState.marketing}
                    onChange={(e) => setConsentState({ ...consentState, marketing: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#333336', lineHeight: 1.45 }}>
                  {t('marketingDesc')}
                </p>
              </div>

              {/* Save & Action Controls */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => saveConsent(consentState.analytics, consentState.marketing)}
                  style={{
                    width: '100%',
                    background: 'var(--color-primary)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  {t('save')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
