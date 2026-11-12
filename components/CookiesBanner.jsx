'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@/lib/track';
import './CookiesBanner.css';

// Pasek zgody u dołu ekranu (12.11.2026). Pomiar e2e 11.11 przy 390x844:
// pływająca karta zajmowała dolne 149 px (PL) / 167 px (EN) i przy pierwszej
// wizycie zasłaniała główny przycisk widoczności w AI i kalkulatora strat.
// Od 901 px karta w rogu (22.10.2026) przy 1280x720 nachodziła na przycisk
// audytu i kalkulatora. Teraz jeden pasek na całą szerokość: na telefonie
// dwie linie tekstu + dwa równe przyciski (~106 px), od 601 px jeden rząd
// (~64 px przy 1280). Układ robi CSS (CookiesBanner.css), nie matchMedia, więc
// nie ma przeskoku po hydratacji. Treść krótka, szczegóły w oknie ustawień
// i polityce; te same fakty w PL i EN.
const PASEK = {
  pl: {
    tekst: 'Cookies Google do statystyk i reklam używamy tylko za Twoją zgodą.',
    polityka: 'Polityka cookies',
    ustawienia: 'Ustawienia',
  },
  en: {
    tekst: 'We use Google cookies for statistics and ads only with your consent.',
    polityka: 'Cookie policy',
    ustawienia: 'Settings',
  },
};

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

// Zapisany wybor (te same klucze co dotad: cookiesConsentState + cookiesConsent).
// Czytany w inicjalizatorze stanu, nie w efekcie (react-hooks/set-state-in-effect,
// 12.11.2026). Na serwerze window nie ma -> null; do zamontowania komponent
// i tak renderuje null, wiec odczyt na kliencie nie daje rozjazdu hydratacji.
const czytajZapisanaZgode = () => {
  if (typeof window === 'undefined') return null;
  try {
    const parsed = JSON.parse(localStorage.getItem('cookiesConsentState') || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (err) {
    return null;
  }
};

const subskrypcjaPusta = () => () => {};

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  // false na serwerze i w hydratacji, true zaraz po niej (portal potrzebuje document).
  const mounted = useSyncExternalStore(subskrypcjaPusta, () => true, () => false);
  const lang = useLocale();
  const t = useTranslations('cookies');

  const [zapisanaZgoda] = useState(czytajZapisanaZgode);
  const [consentState, setConsentState] = useState(() => zapisanaZgoda || {
    essential: true,
    analytics: false,
    marketing: false
  });

  // Staly przycisk „Wycen projekt" (.kota-floating-cta z Footer.jsx) stoi w tym
  // samym rogu co ten baner i ma nizszy z-index, wiec na telefonie byl przez
  // niego zakryty w calosci. Zamiast przebijac go nad baner - baner nie moze
  // byc zaslaniany - publikujemy wysokosc banera i CSS odsuwa przycisk w gore
  // na czas, gdy baner jest widoczny. Ta sama zmienna (pasek stoi na bottom: 0,
  // wiec wysokosc = zajety pas) daje w CookiesBanner.css zapas pod trescia
  // strony i odsuwa przyklejony pasek przycisku kalkulatora.
  const bannerRef = useRef(null);
  const bannerShown = isVisible && !showManageModal;
  useEffect(() => {
    const root = document.documentElement;
    const clear = () => {
      document.body.classList.remove('has-cookie-banner');
      root.style.removeProperty('--cookie-banner-h');
    };
    if (!bannerShown) return clear;
    const el = bannerRef.current;
    if (!el) return clear;
    const publish = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) root.style.setProperty('--cookie-banner-h', h + 'px');
      document.body.classList.add('has-cookie-banner');
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clear();
    };
  }, [bannerShown]);

  useEffect(() => {
    if (zapisanaZgoda) {
      // Consent Mode resets to denied on every page load, so a previously
      // granted choice has to be replayed.
      applyConsentToGtag(zapisanaZgoda);
      return undefined;
    }
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [zapisanaZgoda]);

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
    // Atrybucja leada (lib/attribution.js): po zgodzie marketingowej dane
    // sesji o kliknięciu z reklamy mogą przejść do ciasteczka 90-dniowego.
    try { window.dispatchEvent(new CustomEvent('aiseo:consent', { detail: newState })); } catch (err) {}
    setIsVisible(false);
    setShowManageModal(false);
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleDeclineOptional = () => saveConsent(false, false);

  // Link "Ustawienia cookies" w stopce (22.10.2026) otwiera to samo okno co
  // pigulka "Zgoda", ktora na telefonie i tablecie jest ukryta (globals.css).
  // Fokus po zamknieciu wraca do elementu, ktory okno otworzyl.
  const openerRef = useRef(null);
  useEffect(() => {
    const open = () => {
      openerRef.current = document.activeElement;
      setShowManageModal(true);
    };
    window.addEventListener('aiseo:ustawienia-zgody', open);
    return () => window.removeEventListener('aiseo:ustawienia-zgody', open);
  }, []);

  // Okno "Dostosuj preferencje" jako dialog modalny (05.10.2026). Pomiar
  // w Playwright: po otwarciu fokus zostawal na BODY, piaty Tab wychodzil
  // z okna na strone pod nim (Shift+Tab z X od razu na link "Regulamin"
  // w stopce), Escape nie zamykal, a kolko myszy przewijalo tlo o 800 px.
  // Blokada przewijania idzie na <html>, nie na body: globals.css daje html
  // overflow-x: clip, wiec przewija sie HTML (document.scrollingElement)
  // i body overflow hidden nic nie dawalo (0 -> 800 px), html hidden 0 -> 0.
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const backdropDownRef = useRef(false);
  useEffect(() => {
    if (!showManageModal) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowManageModal(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll('button, input, a[href], select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.disabled);
      if (!items.length) return;
      // Weryfikacja etapu 5 (14.10.2026): pilnowanie samych granic nie
      // wystarczalo w Safari, gdzie Tab domyslnie pomija przyciski i checkboksy -
      // co drugi Tab trafial w formularz pod oknem i przewijal strone. Kazdy Tab
      // przesuwa wiec fokus recznie, w cyklu po elementach panelu.
      e.preventDefault();
      const n = items.length;
      const i = items.indexOf(document.activeElement);
      const next = i === -1 ? (e.shiftKey ? n - 1 : 0) : (i + (e.shiftKey ? -1 : 1) + n) % n;
      items[next].focus();
    };
    document.addEventListener('keydown', onKeyDown);

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevGutter = root.style.scrollbarGutter;
    // Przy klasycznym pasku przewijania (Windows) zdjecie overflow przesuwaloby
    // strone w bok o jego szerokosc - rezerwujemy miejsce na czas otwarcia.
    if (window.innerWidth - root.clientWidth > 0) root.style.scrollbarGutter = 'stable';
    root.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.style.overflow = prevOverflow;
      root.style.scrollbarGutter = prevGutter;
    };
  }, [showManageModal]);

  // Powrot fokusu po zamknieciu okna (05.10.2026). Przycisk, ktory je otworzyl,
  // jest odmontowywany na czas otwarcia (warunek isVisible && !showManageModal),
  // a po zamknieciu React tworzy nowy element - focus() na zapamietanym starym
  // zostawial fokus na BODY. Dlatego fokus idzie na przycisk, ktory jest w DOM
  // po zamknieciu: "Dostosuj" w banerze (zgoda jeszcze nie zapisana) albo
  // plywajacy przycisk zgody (po zapisaniu wyboru).
  const manageBtnRef = useRef(null);
  const reopenBtnRef = useRef(null);
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (showManageModal) {
      wasOpenRef.current = true;
      return;
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    // Okno otwarte linkiem ze stopki: fokus wraca do tego linku.
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && opener.isConnected && typeof opener.focus === 'function') {
      opener.focus();
      return;
    }
    // Efekt biegnie po commicie, wiec nowy przycisk jest juz w DOM i ref
    // jest ustawiony (AnimatePresence dodaje wchodzace dziecko w tym samym
    // renderze). Bez requestAnimationFrame - w karcie w tle rAF stoi.
    (isVisible ? manageBtnRef : reopenBtnRef).current?.focus();
  }, [showManageModal, isVisible]);

  if (!mounted) return null;

  // Nazwa dostepna plywajacego przycisku (05.10.2026, WCAG 2.5.3): widac
  // "Zgoda" / "Cookie", a aria-label brzmial "Dostosuj preferencje" / "Manage
  // Preferences" - bez widocznego slowa, wiec komenda glosowa "kliknij Zgoda"
  // go nie trafiala. aria-label usuniety: nazwa = widoczny tekst (emoji ukryte
  // przed czytnikiem), a title zostaje podpowiedzia i opisem ("Zgoda, przycisk,
  // Dostosuj preferencje"). Nazwa w stylu "Zgoda – Dostosuj preferencje" razem
  // z takim samym title dawala w drzewie AX opis = nazwa, czytany dwa razy.
  const fabText = t('title').split(' ')[0];
  const pasek = PASEK[lang] || PASEK.pl;

  return (
    <>
      {/* Floating Small Trigger to Re-open Cookie Preferences (EU Requirement) */}
      {/* Portal na koniec body (05.10.2026): caly komponent stoi teraz na
          poczatku DOM (layout.js, E5-09), a ten przycisk ma zostac ostatnim
          przystankiem Tab. Bez portalu u kazdego powracajacego goscia bylby
          pierwszym Tab na kazdej stronie, przed logo (pomiar: symulacja
          przeniesienia w DOM). document jest tu dostepny - render po mounted. */}
      {!isVisible && !showManageModal && createPortal(
        <button
          ref={reopenBtnRef}
          type="button"
          className="cookie-manage-trigger"
          onClick={() => setShowManageModal(true)}
          title={t('manage')}
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
            // Mial 90x37 px - ponizej 44 px celu dotykowego (05.10.2026).
            minHeight: '44px',
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
            e.currentTarget.style.background = 'var(--w-noc)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.88)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span aria-hidden="true">🍪</span> {fabText}
        </button>,
        document.body
      )}

      {/* Pasek zgody (RODO / PKE art. 399): "Odrzuc opcjonalne" i "Zaakceptuj
          wszystkie" to ta sama klasa - ten sam rozmiar, kolor i waga, w jednym
          rzedzie, Odrzuc pierwszy. Ustawienia (okno z kategoriami, domyslnie
          odznaczone) i polityka sa na pierwszej warstwie, w tekscie paska. */}
      <AnimatePresence>
        {isVisible && !showManageModal && (
          // Kontener nie mial role ani nazwy, wiec czytnik nie ogloszal, ze to
          // zgoda (05.10.2026). aria-label z istniejacego klucza "title" - tytulu
          // nie widac i to jedyna nazwa obszaru. Bez aria-live: czytnik
          // odczytywalby caly baner po kazdym wejsciu.
          <motion.div
            ref={bannerRef}
            className="cookie-banner"
            role="region"
            aria-label={t('title')}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cookie-banner__wnetrze">
              <p className="cookie-banner__tekst">
                {pasek.tekst}{' '}
                <span className="cookie-banner__linki">
                  <Link href="/cookies" className="cookie-banner__link">
                    {pasek.polityka}
                  </Link>
                  <span aria-hidden="true"> · </span>
                  <button
                    ref={manageBtnRef}
                    type="button"
                    className="cookie-banner__link"
                    aria-haspopup="dialog"
                    onClick={() => setShowManageModal(true)}
                  >
                    {pasek.ustawienia}
                  </button>
                </span>
              </p>

              <div className="cookie-banner__przyciski">
                <button type="button" className="cookie-banner__btn" onClick={handleDeclineOptional}>
                  {t('declineAll')}
                </button>
                <button type="button" className="cookie-banner__btn" onClick={handleAcceptAll}>
                  {t('acceptAll')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular Preference Management Modal */}
      <AnimatePresence>
        {showManageModal && (
          // Klik w tlo nie zamykal okna (pomiar 05.10.2026) - teraz zamyka.
          // Liczy sie tylko klik zaczety na tle: zaznaczanie tekstu w oknie
          // z puszczeniem myszy na tle tez daje click na nakladce, a nie
          // powinno zamykac okna w trakcie czytania.
          <div
            onMouseDown={(e) => { backdropDownRef.current = e.target === e.currentTarget; }}
            onClick={(e) => {
              if (backdropDownRef.current && e.target === e.currentTarget) setShowManageModal(false);
            }}
            style={{
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
            {/* role="dialog" na bialym panelu, nie na pelnoekranowej nakladce -
                granice dialogu = widoczne okno (05.10.2026). Wczesniej w drzewie
                dostepnosci nie bylo zadnego wezla dialog. */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: '#FFFFFF',
                color: 'var(--w-tusz)',
                padding: '2rem',
                borderRadius: '24px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                fontFamily: "var(--font-geist), sans-serif"
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 id="cookie-prefs-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--w-tusz)' }}>
                  {t('manage')}
                </h3>
                {/* X mial 15x24 px i nazwe dostepna "✕" (05.10.2026). Teraz cel
                    44x44 i nazwa w jezyku strony. Ujemne marginesy oddaja to,
                    o co przycisk urosl: rzad naglowka zostaje 33 px wysoki, a znak
                    w tym samym miejscu przy prawej krawedzi (pomiar przy 1440). */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label={lang === 'pl' ? 'Zamknij' : 'Close'}
                  onClick={() => setShowManageModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    color: 'var(--color-text-main)',
                    minWidth: '44px',
                    minHeight: '44px',
                    margin: '-5.5px -14px -5.5px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t('text')}
              </p>

              {/* Tytuly kategorii mialy dwa atrybuty style - drugi nadpisywal
                  pierwszy, wiec zamiast pogrubienia byla grubosc 400 (05.10.2026).
                  Plakietka "Wymagane" przy 390 px lamala sie w srodku slowa
                  ("Wymagan / e", 79x46 px), bo body ma overflow-wrap: anywhere
                  (globals.css), a plakietka mogla sie zwezac. Teraz plakietka sie
                  nie zweza, tytul lamie sie tylko na spacjach, a gdy brakuje
                  miejsca (320 px), plakietka przechodzi pod tytul zamiast sciskac
                  go do "(Wymaga / ne)". Pola wyboru dostaly <label> - wczesniej
                  czytnik czytal dwa razy "pole wyboru" bez nazwy kategorii. */}

              {/* Category 1: Essential */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.75rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--w-tusz)', flex: '1 1 8rem', overflowWrap: 'normal' }}>{t('essentialTitle')}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '0.2rem 0.6rem', borderRadius: '9999px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {lang === 'pl' ? 'Wymagane' : 'Always Active'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                  {t('essentialDesc')}
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.75rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label htmlFor="cookie-consent-analytics" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--w-tusz)', flex: '1 1 8rem', overflowWrap: 'normal', cursor: 'pointer' }}>{t('analyticsTitle')}</label>
                  <input
                    id="cookie-consent-analytics"
                    type="checkbox"
                    aria-describedby="cookie-consent-analytics-desc"
                    checked={consentState.analytics}
                    onChange={(e) => setConsentState({ ...consentState, analytics: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                </div>
                <p id="cookie-consent-analytics-desc" style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                  {t('analyticsDesc')}
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1.75rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.75rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label htmlFor="cookie-consent-marketing" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--w-tusz)', flex: '1 1 8rem', overflowWrap: 'normal', cursor: 'pointer' }}>{t('marketingTitle')}</label>
                  <input
                    id="cookie-consent-marketing"
                    type="checkbox"
                    aria-describedby="cookie-consent-marketing-desc"
                    checked={consentState.marketing}
                    onChange={(e) => setConsentState({ ...consentState, marketing: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                </div>
                <p id="cookie-consent-marketing-desc" style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
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
