// Hero strony głównej (PL, EN, DE) w układzie airSlate (zdj. 1, 19.11.2026):
// - po lewej: eyebrow o 6 darmowych narzędziach i panelu klienta, jedno H1, lead oraz 2 przyciski CTA;
// - po prawej: pływające kafelki narzędzi i panelu klienta ułożone w kompozycji airSlate BEZ tła-kafla
//   pod nimi — bezpośrednio nad czystymi górami (bez podkładki pod satelitę) i przejściem chmurowym.

import { preload } from 'react-dom';
import './Hero.css';
import { hash } from '@/lib/anchors';
import { tekstyHero, scenaHero } from '@/lib/heroNarzedzia';

const IKONY_EKO = {
  audyt: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  ai: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 16v4M17 18h4" /></>,
  autorytet: <><path d="M5 17a8 8 0 1 1 14 0" /><path d="m12 13 4-4" /></>,
  kalk: <><path d="M19 5 5 19" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></>,
  llms: <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,
  makieta: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>,
};

export default function Hero({ locale = 'pl' }) {
  const lang = locale === 'en' || locale === 'de' ? locale : 'pl';
  const t = tekstyHero(lang);
  const sc = scenaHero(lang);

  // Preload warstwy chmur dla szybkiego LCP.
  preload('/images/wyglad/chmury-v2.avif', { as: 'image', type: 'image/avif', fetchPriority: 'high' });

  return (
    <section className="hero hero--narz" id="hero" data-petla="">
      {/* Czyste niebo i góry (bez betonowej podkładki pod satelitę) */}
      <div className="hero-tlo-sceny" aria-hidden="true" data-kursor="obraz">
        <picture>
          <source type="image/avif" srcSet="/images/wyglad/hero-gory-czyste-1200.avif 1200w, /images/wyglad/hero-gory-czyste-1600.avif 1600w" sizes="100vw" />
          <img
            src="/images/wyglad/hero-gory-czyste-1600.webp"
            srcSet="/images/wyglad/hero-gory-czyste-1200.webp 1200w, /images/wyglad/hero-gory-czyste-1600.webp 1600w"
            sizes="100vw"
            alt=""
            width={1600}
            height={1194}
            fetchPriority="high"
            decoding="async"
            data-kursor-zrodlo=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom' }}
          />
        </picture>
      </div>

      {/* Winieta pod nagłówkiem i warstwy mgły/chmur wtapiające hero w pasmo oferty */}
      <div className="hn-winieta" aria-hidden="true" />
      <div className="hero-mgla" aria-hidden="true">
        <div className="hero-mgla-chmury">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="hero-mgla-przod" aria-hidden="true" />

      <div className="hn-wnetrze" data-header-box="">
        <div className="hn-kol">
          <p className="hn-eyebrow" style={{ '--hn-n': t.eyebrow.length }}>{t.eyebrow}</p>
          {/* Jedno H1. Wyraźna spacja między spanami dla crawlerów. */}
          <h1 className="hn-h1">
            <span className="hn-d">{t.display}</span>{' '}
            <span className="hn-sub">{t.sub}</span>
          </h1>
          <p className="hn-lead">{t.lead}</p>
          <div className="hn-akcje">
            <a href={hash('kontakt', lang)} className="hn-btn hn-btn--g" data-cta="hero">
              {t.ctaPrimary} <span aria-hidden="true">→</span>
            </a>
            <a href="#portfolio" className="hn-btn hn-btn--s" data-cta="hero_portfolio">
              {t.ctaSecondary}
            </a>
          </div>
          {t.mikro && <p className="hn-mikro">{t.mikro}</p>}
        </div>

        {/* Prawa kompozycja kafelków narzędzi bezpośrednio na niebie, górach i mgle (bez kafla-tła za nimi) */}
        <div className="hn-scena" role="region" aria-label={sc.regionLabel} data-kursor="jasne">
          <h2 className="sr-only">{sc.h2Sr}</h2>

          {/* Architektoniczne przerywane łączniki przepływu na otwartym niebie */}
          <svg className="hn-przeplyw" viewBox="0 0 700 560" fill="none" aria-hidden="true" focusable="false">
            <path
              d="M 88 260 L 88 414 Q 88 432 106 432 L 136 432"
              stroke="rgba(184, 74, 38, 0.44)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M 130 426.5 L 138 432 L 130 437.5"
              stroke="rgba(184, 74, 38, 0.72)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 556 426 L 602 426 Q 620 426 620 408 L 620 318"
              stroke="rgba(184, 74, 38, 0.44)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M 614.5 324 L 620 316 L 625.5 324"
              stroke="rgba(184, 74, 38, 0.72)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="hn-scena-gora">
            {/* Karta 1 (lewa górna): Darmowy audyt SEO */}
            <a href={sc.audyt.href} className="hn-karta hn-karta--audyt" aria-label={sc.audyt.aria} data-cta="hero_stage_audit">
              <span className="hn-karta-nagl">
                <span className="hn-karta-tytul">{sc.audyt.tytul}</span>
                <span className="hn-karta-meta">{sc.audyt.meta}</span>
              </span>
              <span className="hn-karta-domena">{sc.audyt.domena}</span>
              <span className="hn-wiersze" aria-hidden="true">
                {sc.audyt.wiersze.map((w) => (
                  <span className="hn-wiersz" key={w.tekst}>
                    <span className={`hn-status hn-status--${w.stan}`}>
                      {w.stan === 'ok' ? (
                        <svg viewBox="0 0 16 16"><path d="M3.5 8.5 6.5 11.5 12.5 5" /></svg>
                      ) : (
                        <svg viewBox="0 0 16 16"><path d="M4 8h8M9 5l3 3-3 3" /></svg>
                      )}
                    </span>
                    <span className="hn-wiersz-tekst">{w.tekst}</span>
                    <span className="hn-wiersz-wynik">{w.wynik}</span>
                  </span>
                ))}
              </span>
            </a>

            {/* Karta 2 (prawa górna): Wszystkie 6 darmowych narzędzi w siatce z klikalnymi kafelkami */}
            <div className="hn-karta hn-karta--eko">
              <a href={sc.ekosystem.href} className="hn-karta-nagl hn-eko-nagl-link" aria-label={sc.ekosystem.aria} data-cta="hero_stage_tools">
                <span className="hn-karta-tytul">{sc.ekosystem.tytul}</span>
                <span className="hn-eko-strzalka" aria-hidden="true">→</span>
              </a>
              <div className={`hn-ikony-eko${sc.ekosystem.kafelki.length <= 4 ? ' hn-ikony-eko--4' : ''}`}>
                {sc.ekosystem.kafelki.map((k) => (
                  <a
                    key={k.id}
                    href={k.href}
                    className={`hn-ik-kafel hn-ik-kafel--${k.ton}`}
                    data-cta={`hero_tool_${k.id}`}
                  >
                    <span className="hn-ik-box" aria-hidden="true">
                      <svg viewBox="0 0 24 24">{IKONY_EKO[k.id]}</svg>
                    </span>
                    <span className="hn-ik-nazwa">{k.nazwa}</span>
                  </a>
                ))}
              </div>
              <a href={sc.ekosystem.href} className="hn-eko-stopka" tabIndex={-1} aria-hidden="true">
                <span>{sc.ekosystem.etykietaDol}</span>
                <span className="hn-eko-kropka"><i />{sc.ekosystem.statusDol}</span>
              </a>
            </div>
          </div>

          {/* Karta 3 (dolna ciemna karta Panelu klienta z pływającą oszronioną plakietką nad górami) */}
          <div className="hn-scena-dol">
            <a href={sc.panel.href} className="hn-karta hn-karta--panel" aria-label={sc.panel.aria} data-kursor="ciemne" data-cta="hero_stage_portal">
              <span className="hn-panel-nagl">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
                <span>{sc.panel.tytul}</span>
              </span>

              <span className="hn-panel-ekran" aria-hidden="true">
                <span className="hn-ekran-gora">
                  <span className="hn-ekran-liczba">{sc.panel.ekranLiczba}</span>
                  <svg className="hn-ekran-wykres" viewBox="0 0 160 44" fill="none">
                    <path d="M2 38 C26 35 44 29 68 24 S108 17 132 10 S148 5 158 3 L158 44 L2 44 Z" fill="#D85A30" fillOpacity="0.16" />
                    <path d="M2 38 C26 35 44 29 68 24 S108 17 132 10 S148 5 158 3" stroke="#D85A30" strokeWidth="2.4" strokeLinecap="round" />
                    <circle cx="156" cy="3.5" r="3.5" fill="#D85A30" />
                  </svg>
                </span>
                <span className="hn-ekran-meta">{sc.panel.ekranMeta}</span>
              </span>

              <span className="hn-panel-wer" aria-hidden="true">
                <span className="hn-wer-kropki">
                  <span className="hn-wer-badge hn-wer-badge--g">G</span>
                  <span className="hn-wer-badge hn-wer-badge--ai">AI</span>
                </span>
                <span className="hn-wer-ok">
                  <svg viewBox="0 0 16 16"><path d="M3.5 8.5 6.5 11.5 12.5 5" /></svg>
                </span>
                <span className="hn-wer-tekst">{sc.panel.weryfikacja}</span>
              </span>

              <span className="hn-panel-chipy" aria-hidden="true">
                {sc.panel.chipy.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </span>
            </a>

            {/* Oszroniona pływająca plakietka nachodząca na prawą krawędź ciemnej karty */}
            <div className="hn-plakietka-plywajaca" aria-hidden="true">
              <span className="hn-plakietka-ikona">
                <svg viewBox="0 0 16 16"><path d="M3.5 8.5 6.5 11.5 12.5 5" /></svg>
              </span>
              <span className="hn-plakietka-tekst">
                <span className="hn-plakietka-tytul">{sc.panel.plakietkaTytul}</span>
                <span className="hn-plakietka-opis">{sc.panel.plakietkaOpis}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
