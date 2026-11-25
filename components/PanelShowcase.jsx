'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { PANEL_WARSTWY } from '@/lib/panelShowcaseDane';

// Ikony cech (obrys 1,75 px, kolor akcentu, rozmiar 20x20 pod pojemnik 40x40) - kolejnosc jak w `items`.
const IKONY = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></svg>,
];

const CZAS_CYKLU_MS = 4600;

export default function PanelShowcase({ locale: propLocale }) {
  const ctxLocale = useLocale();
  const rawLocale = propLocale || ctxLocale;
  const lang = rawLocale === 'de' ? 'de' : rawLocale === 'en' ? 'en' : 'pl';
  const t = PANEL_WARSTWY[lang];

  const sekcjaRef = useRef(null);
  const [aktywna, setAktywna] = useState(0);
  const [wstrzymane, setWstrzymane] = useState(false);
  const [widoczna, setWidoczna] = useState(false);

  // Obserwator widocznosci: automatyczny cykl dziala tylko, gdy sekcja jest na ekranie.
  useEffect(() => {
    const el = sekcjaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(
      ([wpis]) => setWidoczna(Boolean(wpis?.isIntersecting)),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lagodne przelaczanie aktywnej warstwy co 4,6 s (pauza przy najechaniu, fokusie lub prefers-reduced-motion).
  useEffect(() => {
    if (!widoczna || wstrzymane || typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => {
      setAktywna((poprz) => (poprz + 1) % t.items.length);
    }, CZAS_CYKLU_MS);
    return () => window.clearInterval(id);
  }, [widoczna, wstrzymane, t.items.length]);

  const altObrazu = (title) => {
    if (lang === 'de') return `Kundenportal: ${title} (Beispieldaten)`;
    if (lang === 'en') return `Client portal: ${title.toLowerCase()} (sample data)`;
    return `Panel klienta: ${title.toLowerCase()} (dane przykładowe)`;
  };

  return (
    <section
      ref={sekcjaRef}
      className="panel-showcase cursor-light w-ciemne"
      data-petla=""
      data-aktywna={aktywna}
      id={t.idSekcji}
      onMouseEnter={() => setWstrzymane(true)}
      onMouseLeave={() => setWstrzymane(false)}
      onFocusCapture={() => setWstrzymane(true)}
      onBlurCapture={() => setWstrzymane(false)}
    >
      <div className="panel-aura-tla" aria-hidden="true">
        <span className="panel-aura panel-aura--miedz" />
        <span className="panel-aura panel-aura--szmaragd" />
      </div>

      <div className="container panel-uklad">
        <Reveal className="section-header">
          <div className="section-tag panel-tag-zywy">
            <span className="asterisk">✳</span> {t.tag}
          </div>
          <h2>{t.h2}</h2>
          <p>{t.lead}</p>
          <div className="panel-akcje">
            <a href={PANEL_DEMO_URL} className="w-przycisk w-przycisk--glowny panel-cta-glowny" data-cta="home_panel_demo">
              <span>{t.ctaDemo}</span>
              <span className="panel-cta-strzalka" aria-hidden="true">→</span>
            </a>
            <Link href="/panel-klienta" className="w-przycisk w-przycisk--obrys panel-cta-obrys" data-cta="home_panel_page">
              {t.ctaStrona}
            </Link>
          </div>
          <p className="panel-zaufanie">{t.zaufanie}</p>
        </Reveal>

        <div className="panel-scena-srodek">
          {/* Kompaktowy przelacznik widoczny na telefonie i tablecie */}
          <div className="panel-mobile-przelacznik" role="tablist" aria-label={t.ariaStos}>
            {t.items.map((it, i) => (
              <button
                key={it.img}
                type="button"
                role="tab"
                aria-selected={aktywna === i}
                className={`panel-mobile-pigulka${aktywna === i ? ' is-active' : ''}`}
                onClick={() => setAktywna(i)}
              >
                <span className="panel-mobile-nr">{it.nr}</span>
                <span>{it.krotka}</span>
              </button>
            ))}
          </div>

          <div className="panel-stos" data-focus={aktywna}>
            <div className="panel-stos-cien" aria-hidden="true" />
            {t.items.map((it, i) => {
              const czyAktywna = aktywna === i;
              return (
                <figure
                  key={it.img}
                  className={`panel-warstwa panel-warstwa--${i}${czyAktywna ? ' is-active' : ''}`}
                  onMouseEnter={() => setAktywna(i)}
                  onClick={() => setAktywna(i)}
                >
                  <div className={`panel-warstwa-plyta panel-warstwa-plyta--${i}`}>
                    <span className="panel-okno-nagl" aria-hidden="true">
                      <span className="panel-okno-kropki"><i /><i /><i /></span>
                      <span className="panel-okno-tytul">{it.okno}</span>
                      <span className="panel-okno-plakietka">{it.plakietka}</span>
                      <span className="panel-okno-status" />
                    </span>
                    <div className="panel-warstwa-ekran">
                      <Image
                        src={it.img}
                        alt={altObrazu(it.title)}
                        width={1600}
                        height={1025}
                        sizes="(max-width: 900px) 100vw, 540px"
                      />
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>

        <RevealStagger className="panel-cechy">
          {t.items.map((it, i) => {
            const czyAktywna = aktywna === i;
            return (
              <RevealItem
                key={it.img}
                className={`panel-cecha${czyAktywna ? ' is-active' : ''}`}
                onMouseEnter={() => setAktywna(i)}
                onClick={() => setAktywna(i)}
              >
                <span className="panel-cecha-ikona">
                  {IKONY[i]}
                </span>
                <div className="panel-cecha-tresc">
                  <div className="panel-cecha-meta" aria-hidden="true">
                    <span className="panel-cecha-nr">{it.nr}</span>
                    <span className="panel-cecha-plakietka">{it.plakietka}</span>
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
                <span
                  className={`panel-cecha-postep${czyAktywna && widoczna && !wstrzymane ? ' is-running' : ''}`}
                  aria-hidden="true"
                />
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
