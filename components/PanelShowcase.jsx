'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { PANEL_WARSTWY } from '@/lib/panelShowcaseDane';

// Ikony kart perlowych po prawej (20x20 pod pojemnik 42x42) - kolejnosc jak w `items`.
const IKONY_KART = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 5-5.5" /></svg>,
];

// Ikony paskow okien Apple Liquid Glass (15x15 pod pojemnik 28x28).
const IKONY_OKIEN = [
  <svg key="w0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /></svg>,
  <svg key="w1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="w2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>,
];

const CZAS_CYKLU_MS = 4600;

export default function PanelShowcase({ locale: propLocale }) {
  const ctxLocale = useLocale();
  const rawLocale = propLocale || ctxLocale;
  const lang = rawLocale === 'de' ? 'de' : rawLocale === 'en' ? 'en' : 'pl';
  const t = PANEL_WARSTWY[lang];

  const uid = useId().replace(/:/g, '');
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

  const renderujCialoOkna = (indeks) => {
    if (indeks === 0) {
      const p = t.widoki.przeglad;
      return (
        <div className="panel-lg-cialo">
          <div className="panel-lg-metryka-karta">
            <div className="panel-lg-metryka-gora">
              <div className="panel-lg-metryka-lewa">
                <span className="panel-lg-liczba">{p.liczba}</span>
                <span className="panel-lg-cel">{p.cel}</span>
              </div>
              <div className="panel-lg-wykres">
                <svg width="168" height="44" viewBox="0 0 168 44" fill="none" aria-hidden="true">
                  <path
                    d="M6 36 C42 34, 76 27, 114 19 C136 14, 150 10, 162 7 L162 40 L6 40 Z"
                    fill="#FBE6DA"
                    fillOpacity="0.88"
                  />
                  <path
                    d="M6 36 C42 34, 76 27, 114 19 C136 14, 150 10, 162 7"
                    stroke="#D85A30"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle cx="162" cy="7" r="4" fill="#D85A30" />
                </svg>
              </div>
            </div>
          </div>

          <div className="panel-lg-submetryki">
            {p.kafelki.map((k) => (
              <div key={k.wartosc} className="panel-lg-subkarta">
                <span className="panel-lg-subkarta-wartosc">{k.wartosc}</span>
                <span className="panel-lg-subkarta-opis">{k.opis}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (indeks === 1) {
      return (
        <div className="panel-lg-cialo">
          {t.widoki.zmiany.map((z) => (
            <div key={z.tytul} className="panel-lg-wiersz">
              <span className="panel-lg-wiersz-tytul">{z.tytul}</span>
              <span className="panel-lg-wiersz-opis">{z.opis}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="panel-lg-cialo">
        {t.widoki.akceptacje.map((a) => (
          <div key={a.tytul} className={`panel-lg-akceptacja${a.glowny ? ' is-primary' : ''}`}>
            <div className="panel-lg-akceptacja-tekst">
              <span className="panel-lg-wiersz-tytul">{a.tytul}</span>
              <span className="panel-lg-wiersz-opis">{a.opis}</span>
            </div>
            <span className={`panel-lg-akceptacja-btn${a.glowny ? ' is-primary' : ''}`}>
              {a.przycisk}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Kolejnosc w DOM: od dolnej warstwy (2) do gornej (0) dla naturalnego malowania 3D.
  const kolejnoscWarstw = [2, 1, 0];

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
        <span className="panel-aura panel-aura--brzoskwinia" />
        <span className="panel-aura panel-aura--miedz" />
      </div>

      <div className="container panel-uklad">
        <Reveal className="section-header">
          <div className="section-tag panel-eyebrow-szklo">
            <span className="panel-eyebrow-kropka" aria-hidden="true" />
            <span>{t.tag}</span>
            <span aria-hidden="true" data-lastmod="pomin">{t.tagSufiks}</span>
          </div>
          <h2>{t.h2}</h2>
          <p>{t.lead}</p>
          <div className="panel-akcje">
            <a href={PANEL_DEMO_URL} className="w-przycisk w-przycisk--glowny panel-cta-glowny" data-cta="home_panel_demo">
              <span>{t.ctaDemo}</span>
              <span className="panel-cta-strzalka" aria-hidden="true">→</span>
            </a>
            <Link href="/panel-klienta" className="w-przycisk w-przycisk--obrys panel-cta-perla" data-cta="home_panel_page">
              {t.ctaStrona}
            </Link>
          </div>
          <p className="panel-zaufanie">{t.zaufanie}</p>
        </Reveal>

        <div className="panel-scena-srodek" data-focus={aktywna} data-lastmod="pomin">
          {/* Kompaktowy przelacznik widoczny na telefonie i tablecie */}
          <div className="panel-mobile-przelacznik" role="tablist" aria-label={t.ariaStos}>
            {t.items.map((it, i) => (
              <button
                key={it.nr}
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

          {/* Ciepla poswiata refrakcyjna pod taflami szkla (bez technicznej siatki DevTools) */}
          <div className="panel-poswiata-ciepla" aria-hidden="true">
            <svg width="466" height="580" viewBox="0 0 466 580" fill="none">
              <defs>
                <radialGradient id={`lg1-wb1-${uid}`} cx="52%" cy="44%" r="50%">
                  <stop offset="0%" stopColor="#F3B79C" stopOpacity="0.30" />
                  <stop offset="46%" stopColor="#D85A30" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#0A1337" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`lg1-wb2-${uid}`} cx="42%" cy="68%" r="44%">
                  <stop offset="0%" stopColor="#FBE6DA" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#0A1337" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="240" cy="260" rx="230" ry="235" fill={`url(#lg1-wb1-${uid})`} />
              <ellipse cx="195" cy="390" rx="200" ry="180" fill={`url(#lg1-wb2-${uid})`} />
            </svg>
          </div>

          {/* Stos 3 okien w mlecznej optycznej aureoli szkla 6 px (1:1 styl Hero i DarmoweNarzedzia) */}
          <div className="panel-stos" data-focus={aktywna} aria-hidden="true">
            {kolejnoscWarstw.map((i) => {
              const it = t.items[i];
              const czyAktywna = aktywna === i;
              return (
                <div
                  key={it.nr}
                  className={`panel-warstwa panel-warstwa--${i}${czyAktywna ? ' is-active' : ''}`}
                  onMouseEnter={() => setAktywna(i)}
                  onClick={() => setAktywna(i)}
                >
                  <div className={`panel-warstwa-plyta panel-warstwa-plyta--${i}`}>
                    <div className="panel-warstwa-okno">
                      <div className="panel-lg-nagl">
                        <span className="panel-lg-ikona">{IKONY_OKIEN[i]}</span>
                        <div className="panel-lg-info">
                          <span className="panel-lg-tytul">{it.oknoTytul}</span>
                          <span className="panel-lg-podtytul">{it.oknoPodtytul}</span>
                        </div>
                        <span className={`panel-lg-plakietka${i === 0 ? ' is-mieta' : ' is-brzoskwinia'}`}>
                          {it.oknoPlakietka}
                        </span>
                      </div>
                      {renderujCialoOkna(i)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2 plywajace mleczne pigulki Liquid Glass 1:1 z naszego Hero (.hn-plakietka-plywajaca) */}
          <div className="panel-dymki-2d" aria-hidden="true">
            <div
              className={`panel-dymek-mleczny panel-dymek-mleczny--gora${aktywna === 0 ? ' is-active' : ''}`}
              onMouseEnter={() => setAktywna(0)}
              onClick={() => setAktywna(0)}
            >
              <span className="panel-dymek-kolko panel-dymek-kolko--mieta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
              </span>
              <div className="panel-dymek-tekst">
                <span className="panel-dymek-tytul">{t.dymekGora.tytul}</span>
                <span className="panel-dymek-opis">{t.dymekGora.opis}</span>
              </div>
            </div>

            <div
              className={`panel-dymek-mleczny panel-dymek-mleczny--dol${aktywna !== 0 ? ' is-active' : ''}`}
              onMouseEnter={() => setAktywna(2)}
              onClick={() => setAktywna(2)}
            >
              <span className="panel-dymek-kolko panel-dymek-kolko--brzoskwinia">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <div className="panel-dymek-tekst">
                <span className="panel-dymek-tytul">{t.dymekDol.tytul}</span>
                <span className="panel-dymek-opis">{t.dymekDol.opis}</span>
              </div>
            </div>
          </div>
        </div>

        <RevealStagger className="panel-cechy">
          {t.items.map((it, i) => {
            const czyAktywna = aktywna === i;
            return (
              <RevealItem
                key={it.nr}
                className={`panel-cecha${czyAktywna ? ' is-active' : ''}`}
                onMouseEnter={() => setAktywna(i)}
                onClick={() => setAktywna(i)}
              >
                <div className="panel-cecha-glowny-wiersz">
                  <span className="panel-cecha-ikona">
                    {IKONY_KART[i]}
                  </span>
                  <div className="panel-cecha-tresc">
                    <span className="panel-cecha-kicker" aria-hidden="true" data-lastmod="pomin">
                      {it.kartaTag}
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                </div>
                <span className="panel-cecha-sciezka" aria-hidden="true">
                  <span
                    className={`panel-cecha-postep${czyAktywna && widoczna && !wstrzymane ? ' is-running' : ''}`}
                  />
                </span>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
