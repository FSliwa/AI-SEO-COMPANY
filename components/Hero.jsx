// Hero strony głównej (PL, EN, DE), wariant A "hero v8" z 19.11.2026: po lewej tekst, po prawej wysoki
// jasny panel z dryfującą kolumną siedmiu kafli (sześć darmowych narzędzi i panel klienta), na tle
// gór, chmur i mgły dotychczasowego hero. Scena 3D (Spline), robot i wielki pomarańczowy napis SEO
// zostały usunięte; granatowy napis SEO stoi w panelu za kaflami (tylko od 1200 px).
//
// Komponent serwerowy: tekst, linki i kafle są w HTML z serwera. Ruch i sterowanie dokłada
// HeroNarzedzia.jsx (klient). Teksty i dane kafli: lib/heroNarzedzia.js. Styl: components/Hero.css.
// Języki: `locale` z trasy (page.js) albo 'de' (HomeDe.jsx); DE pokazuje tylko kafle z istniejącą stroną DE.
//
// Akapit "Łączymy strategię marki..." (dawny łuk pod nagłówkiem) stoi niżej w tej samej sekcji, pod
// kolumnami, słowo w słowo jak dotąd (każdy segment, także te, które telefon dawniej ukrywał): z niego
// pochodzą frazy pilnowane przez kontrola-fraz.py (agencja marketingowa, agencja seo warszawa).

import './Hero.css';
import { hash } from '@/lib/anchors';
import { tekstyHero, kafleHero, UI } from '@/lib/heroNarzedzia';
import HeroKafel from './HeroKafel';
import HeroNarzedzia from './HeroNarzedzia';

export default function Hero({ locale = 'pl' }) {
  const lang = locale === 'en' || locale === 'de' ? locale : 'pl';
  const t = tekstyHero(lang);
  const ui = UI[lang];
  const { kafle, m, strony } = kafleHero(lang);

  return (
    <section className="hero hero--narz" id="hero" data-petla="">
      {/* Niebo i gory (grafika tla). <picture> zamiast next/image: gotowy plik nie przechodzi drugiej
          kompresji stratnej; fetchPriority high (obraz jest w HTML z serwera, skaner preload widzi go bez <link>). */}
      <div className="hero-tlo-sceny" aria-hidden="true" data-kursor="obraz">
        <picture>
          <source type="image/avif" srcSet="/images/wyglad/hero-tlo-v3-1200.avif 1200w, /images/wyglad/hero-tlo-v3-1600.avif 1600w" sizes="100vw" />
          <img
            src="/images/wyglad/hero-tlo-v3-1600.webp"
            srcSet="/images/wyglad/hero-tlo-v3-1200.webp 1200w, /images/wyglad/hero-tlo-v3-1600.webp 1600w"
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

      {/* Winieta u góry pod nagłówkiem i warstwy mgły: animowane chmury (.hero-mgla) i statyczna mgła
          (.hero-mgla-przod), która wtapia hero w pasmo oferty. Tekst i panel leżą nad nimi. */}
      <div className="hn-winieta" aria-hidden="true" />
      <div className="hero-mgla" aria-hidden="true">
        <div className="hero-mgla-chmury">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="hero-mgla-przod" aria-hidden="true" />

      <div className="hn-wnetrze">
        <div className="hn-kol">
          <p className="hn-eyebrow" style={{ '--hn-n': t.eyebrow.length }}>{t.eyebrow}</p>
          {/* Jedno H1. Wyraźna spacja między spanami: bez niej crawler skleja "technicznymiPozycjonowanie". */}
          <h1 className="hn-h1">
            <span className="hn-d">{t.display}</span>{' '}
            <span className="hn-sub">{t.sub}</span>
          </h1>
          <p className="hn-lead">{t.lead}</p>
          <div className="hn-akcje">
            <a href={hash('kontakt', lang)} className="hn-btn hn-btn--g" data-cta="hero">{t.ctaPrimary} →</a>
            <a href="#portfolio" className="hn-btn hn-btn--s">{t.ctaSecondary}</a>
          </div>
        </div>

        <HeroNarzedzia n={kafle.length} ui={ui}>
          <ul className="hn-lista">
            {kafle.map((k, i) => <HeroKafel key={k.id} kafel={k} indeks={i} m={m} s={strony} />)}
          </ul>
        </HeroNarzedzia>
      </div>
    </section>
  );
}
