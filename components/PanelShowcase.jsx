'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { PANEL_WARSTWY } from '@/lib/panelShowcaseDane';

// Ikony cech (obrys 1,8 px, kolor miedziany, rozmiar 20x20 pod pojemnik 40x40) - kolejnosc jak w `items`.
const IKONY = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 5-5.5" /></svg>,
];

const CZAS_CYKLU_MS = 4600;
const AKTYWNY_INDEKS_MENU = [0, 2, 3];

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

  const renderujWnetrzeOkna = (indeks) => {
    if (indeks === 0) {
      const w = t.widoki.przeglad;
      return (
        <div className="panel-mikro-glowne">
          <div className="panel-mikro-tytul">{w.naglowek}</div>
          <div className="panel-mikro-kpi-rzad">
            {w.kpi.map((k) => (
              <div key={k.etykieta} className="panel-mikro-kpi">
                <span className="panel-mikro-kpi-etykieta">{k.etykieta}</span>
                <span className="panel-mikro-kpi-wartosc">{k.wartosc}</span>
                <span className="panel-mikro-kpi-zmiana">{k.zmiana}</span>
              </div>
            ))}
          </div>
          <div className="panel-mikro-wykres">
            <svg width="310" height="54" viewBox="0 0 310 54" fill="none" aria-hidden="true">
              <rect x="0.5" y="0.5" width="309" height="53" rx="7.5" fill="#FFFFFF" stroke="#E8E2D9" />
              <path
                d="M12 42 C52 40, 78 35, 116 31 C154 27, 186 22, 224 16 C254 11, 278 9, 298 7 L298 48 L12 48 Z"
                fill="#10B981"
                fillOpacity="0.14"
              />
              <path
                d="M12 42 C52 40, 78 35, 116 31 C154 27, 186 22, 224 16 C254 11, 278 9, 298 7"
                stroke="#10B981"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="190" cy="20" r="4" fill="#D85A30" />
              <circle cx="298" cy="7" r="4" fill="#10B981" />
            </svg>
          </div>
        </div>
      );
    }

    if (indeks === 1) {
      const w = t.widoki.zmiany;
      return (
        <div className="panel-mikro-glowne">
          <div className="panel-mikro-tytul">{w.naglowek}</div>
          <div className="panel-mikro-lista">
            {w.wpisy.map((wpis) => (
              <div key={wpis.tytul} className="panel-mikro-wiersz">
                <span className="panel-mikro-wiersz-nagl">{wpis.tytul}</span>
                <span className="panel-mikro-wiersz-efekt">{wpis.efekt}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const w = t.widoki.akceptacje;
    return (
      <div className="panel-mikro-glowne">
        <div className="panel-mikro-tytul">{w.naglowek}</div>
        <div className="panel-mikro-lista">
          {w.elementy.map((el, idx) => (
            <div key={el.tytul} className={`panel-mikro-akceptacja${idx === 0 ? ' is-featured' : ''}`}>
              <div className="panel-mikro-akceptacja-tekst">
                <span className="panel-mikro-wiersz-nagl">{el.tytul}</span>
                <span className="panel-mikro-akceptacja-meta">{el.meta}</span>
              </div>
              <span className="panel-mikro-akceptacja-przycisk">{el.akcja}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Poza kolejnoscia wizualna w DOM dla prawidlowego malowania w 3D (2 na dole -> 0 na gorze)
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
        <span className="panel-aura panel-aura--miedz" />
        <span className="panel-aura panel-aura--szmaragd" />
      </div>

      <div className="container panel-uklad">
        <Reveal className="section-header">
          <div className="section-tag panel-tag-zywy">
            <span className="asterisk">✸</span> {t.tag}
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

        <div className="panel-scena-srodek" data-focus={aktywna}>
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

          {/* Siatka inzynieryjna w stylu Vercel / Linear z maska radialna i krzyzykami (+) */}
          <div className="panel-siatka-tla" aria-hidden="true">
            <svg width="462" height="580" viewBox="0 0 462 580" fill="none">
              <defs>
                <radialGradient id={`pg-glow-${uid}`} cx="50%" cy="48%" r="50%">
                  <stop offset="0%" stopColor="#D85A30" stopOpacity="0.24" />
                  <stop offset="55%" stopColor="#10B981" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#0A1337" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`pg-mask-${uid}`} cx="50%" cy="50%" r="48%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.13" />
                  <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.045" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="231" cy="285" rx="225" ry="240" fill={`url(#pg-glow-${uid})`} />
              <g stroke={`url(#pg-mask-${uid})`} strokeWidth="1">
                <line x1="56" y1="40" x2="56" y2="540" />
                <line x1="112" y1="40" x2="112" y2="540" />
                <line x1="168" y1="40" x2="168" y2="540" />
                <line x1="224" y1="40" x2="224" y2="540" />
                <line x1="280" y1="40" x2="280" y2="540" />
                <line x1="336" y1="40" x2="336" y2="540" />
                <line x1="392" y1="40" x2="392" y2="540" />
                <line x1="20" y1="96" x2="442" y2="96" />
                <line x1="20" y1="152" x2="442" y2="152" />
                <line x1="20" y1="208" x2="442" y2="208" />
                <line x1="20" y1="264" x2="442" y2="264" />
                <line x1="20" y1="320" x2="442" y2="320" />
                <line x1="20" y1="376" x2="442" y2="376" />
                <line x1="20" y1="432" x2="442" y2="432" />
                <line x1="20" y1="488" x2="442" y2="488" />
              </g>
              <g stroke="#FF9E7A" strokeOpacity="0.48" strokeWidth="1.2" strokeLinecap="round">
                <path d="M112 148v8M108 152h8" />
                <path d="M112 428v8M108 432h8" />
              </g>
              <g stroke="#34D399" strokeOpacity="0.48" strokeWidth="1.2" strokeLinecap="round">
                <path d="M336 148v8M332 152h8" />
              </g>
            </svg>
          </div>

          {/* Stos 3 plyt w podwojnej szklanej oprawie (Apple / Raycast double-bezel + Clerk Micro-UI) */}
          <div className="panel-stos" data-focus={aktywna} aria-hidden="true">
            <div className="panel-stos-cien" />
            {kolejnoscWarstw.map((i) => {
              const it = t.items[i];
              const czyAktywna = aktywna === i;
              const aktywnyNav = AKTYWNY_INDEKS_MENU[i];
              return (
                <div
                  key={it.nr}
                  className={`panel-warstwa panel-warstwa--${i}${czyAktywna ? ' is-active' : ''}`}
                  onMouseEnter={() => setAktywna(i)}
                  onClick={() => setAktywna(i)}
                >
                  <div className={`panel-warstwa-plyta panel-warstwa-plyta--${i}`}>
                    <div className="panel-warstwa-okno">
                      <span className="panel-okno-nagl">
                        <span className="panel-okno-kropki"><i /><i /><i /></span>
                        <span className="panel-okno-tytul">{it.okno}</span>
                        <span className="panel-okno-plakietka">{it.plakietka}</span>
                        <span className="panel-okno-status" />
                      </span>
                      <div className="panel-mikro-cialo">
                        <div className="panel-mikro-bok">
                          <span className="panel-mikro-logo">COMPANY</span>
                          <span className="panel-mikro-domena">{t.sidebarMarka}</span>
                          {t.sidebarMenu.map((pozycja, mIdx) => (
                            <span
                              key={pozycja}
                              className={`panel-mikro-nav${mIdx === aktywnyNav ? ' is-active' : ''}`}
                            >
                              {pozycja}
                            </span>
                          ))}
                        </div>
                        {renderujWnetrzeOkna(i)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swietlisty miedziany lacznik sygnalowy (Supabase / Figma) miedzy stosem 3D a aktywna karta */}
          <div className="panel-lacznik-svg" aria-hidden="true">
            <svg width="96" height="44" viewBox="0 0 96 44" fill="none">
              <path d="M6 22 H90" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="6" cy="22" r="5" fill="#D85A30" fillOpacity="0.28" />
              <circle cx="6" cy="22" r="2.5" fill="#FF9E7A" />
              <circle cx="90" cy="22" r="5" fill="#D85A30" fillOpacity="0.28" />
              <circle cx="90" cy="22" r="2.5" fill="#FF9E7A" />
            </svg>
          </div>

          {/* 2 plaskie (0 deg) plywajace pigulki KPI nad rzutem 3D (Stripe / Mercury) */}
          <div className="panel-dymki-2d" aria-hidden="true">
            <div
              className={`panel-dymek-2d panel-dymek-2d--gora${aktywna === 0 ? ' is-active' : ''}`}
              onMouseEnter={() => setAktywna(0)}
              onClick={() => setAktywna(0)}
            >
              <span className="panel-dymek-odznaka panel-dymek-odznaka--szmaragd">
                {t.dymekGora.odznaka}
              </span>
              <div className="panel-dymek-tekst">
                <span className="panel-dymek-tytul">{t.dymekGora.tytul}</span>
                <span className="panel-dymek-opis">{t.dymekGora.opis}</span>
              </div>
            </div>

            <div
              className={`panel-dymek-2d panel-dymek-2d--dol${aktywna !== 0 ? ' is-active' : ''}`}
              onMouseEnter={() => setAktywna(1)}
              onClick={() => setAktywna(1)}
            >
              <span className="panel-dymek-odznaka panel-dymek-odznaka--miedz">
                {t.dymekDol.odznaka}
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
                    {IKONY[i]}
                  </span>
                  <div className="panel-cecha-tresc">
                    <div className="panel-cecha-meta" aria-hidden="true">
                      <span className="panel-cecha-klawisz">{it.nr}</span>
                      <span className="panel-cecha-plakietka">{it.plakietka}</span>
                    </div>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                    <div className="panel-cecha-stopka" aria-hidden="true">
                      <span className="panel-cecha-kropka" />
                      <span>{it.stopka}</span>
                    </div>
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
