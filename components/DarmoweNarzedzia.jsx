// Sekcja prezentująca wszystkie 6 darmowych narzędzi w stylu airSlate (zdj. 2),
// umieszczona bezpośrednio pod sekcją „Chcesz osiągnąć podobne wyniki?” (Results.jsx).
// Komponent serwerowy: pełny HTML, linki, opisy i obrazy z srcSet są renderowane na serwerze.

import NextLink from 'next/link';
import { sekcjaNarzedziDane } from '@/lib/heroNarzedzia';
import './DarmoweNarzedzia.css';

const IKONY_NARZEDZI = {
  'audyt-seo': <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  'sprawdzarka-ai': <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 16v4M17 18h4" /></>,
  'autorytet-domeny': <><path d="M5 17a8 8 0 1 1 14 0" /><path d="m12 13 4-4" /></>,
  'kalkulator-strat-seo': <><path d="M19 5 5 19" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></>,
  'generator-llms-txt': <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,
  'makieta-redesignu': <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>,
  'tester-robotow-ai-robots-txt': <><path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3z" /><path d="m9.5 12 2 2 3.5-3.5" /></>,
  'test-core-web-vitals-porownanie': <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />,
};

const ROZMIARY_PODGLADU = '(max-width: 959px) calc(100vw - 72px), 560px';
const ROZMIARY_KARTY = '(max-width: 959px) calc(100vw - 72px), 520px';

// Okno podglądu wyniku (ikona, nazwa, status + ilustracja z Figmy albo ustrukturyzowana makieta metryk). Link poza kolejnością Tab - CTA jest obok.
function Podglad({ n, rozmiary }) {
  return (
    <NextLink href={n.href} prefetch={false} className="dn-podglad-ramka" aria-label={`${n.nazwa}: ${n.ctaGlowne}`} tabIndex={-1}>
      <span className="dn-okno-nagl" aria-hidden="true">
        <span className="dn-okno-ikona">
          <svg viewBox="0 0 24 24">{IKONY_NARZEDZI[n.id]}</svg>
        </span>
        <span className="dn-okno-info">
          <span className="dn-okno-tytul">{n.nazwa}</span>
          <span className="dn-okno-pod">{n.statusWejscia}</span>
        </span>
      </span>
      {n.obraz ? (
        <span className="dn-okno-obraz">
          {/* eslint-disable-next-line @next/next/no-img-element -- gotowe makiety z Figmy w 3 rozdzielczościach WebP bez drugiej kompresji */}
          <img
            src={n.obraz.src}
            srcSet={n.obraz.srcSet}
            sizes={rozmiary}
            alt={n.obraz.alt}
            width={n.obraz.width}
            height={n.obraz.height}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : n.podglad ? (
        <span className="dn-okno-makietka" aria-hidden="true">
          <span className="dn-mak-pasek">
            <span className="dn-mak-tytul">{n.podglad.naglowek}</span>
            <span className="dn-mak-odznaka">{n.podglad.odznaka}</span>
          </span>
          <span className="dn-mak-wiersze">
            {n.podglad.wiersze.map((w) => (
              <span className="dn-mak-wiersz" key={w.etykieta}>
                <span className={`dn-mak-kropka dn-mak-kropka--${w.stan}`} />
                <span className="dn-mak-etykieta">{w.etykieta}</span>
                <span className="dn-mak-wartosc">{w.wartosc}</span>
              </span>
            ))}
          </span>
        </span>
      ) : null}
    </NextLink>
  );
}

export default function DarmoweNarzedzia({ locale = 'pl' }) {
  const dane = sekcjaNarzedziDane(locale);
  if (!dane.narzedzia.length) return null;
  const wyroznione = dane.narzedzia.slice(0, 2);
  const kompaktowe = dane.narzedzia.slice(2);

  return (
    <section className="dn-sekcja" id={dane.id} data-kursor="jasne">
      <div className="dn-arkusz">
        <div className="dn-kontener" data-header-box="">
          {/* Wyśrodkowany nagłówek sekcji w układzie airSlate (zdj. 2) */}
          <header className="dn-naglowek">
            <h2 className="dn-h2">{dane.tytul}</h2>
            <p className="dn-podtytul">{dane.podtytul}</p>

            {/* Szybki pasek nawigacyjny po 6 narzędziach */}
            <nav className="dn-skroty" aria-label={locale === 'en' ? 'Jump to a free tool' : 'Przejdź do wybranego narzędzia'}>
              {dane.narzedzia.map((n) => (
                <a key={n.id} href={`#narz-${n.id}`} className="dn-skrot">
                  <span>{n.nazwa}</span>
                </a>
              ))}
            </nav>
          </header>

          {/* 2 wyróżnione wiersze (najmocniejsze lead magnety: audyt i widoczność w AI) w układzie airSlate */}
          <div className="dn-lista">
            {wyroznione.map((n, idx) => (
              <article key={n.id} id={`narz-${n.id}`} className="dn-wiersz" data-tlo={n.tlo}>
                <div className="dn-lewa">
                  <div className="dn-kicker">
                    <span className="dn-kicker-nazwa">{n.nazwa}</span>
                    <span className="dn-kicker-ukosnik" aria-hidden="true">/</span>
                    <span className="dn-kicker-kat">{n.kategoria}</span>
                  </div>

                  <h3 className="dn-h3">{n.naglowek}</h3>
                  <p className="dn-opis">{n.opis}</p>

                  <div className="dn-akcje">
                    <NextLink href={n.href} prefetch={false} className="dn-btn dn-btn--glowny" data-cta={`home_tools_${n.id}`}>
                      {n.ctaGlowne} <span aria-hidden="true">→</span>
                    </NextLink>
                    <NextLink href={n.hrefDrugie} prefetch={false} className="dn-link-cichy" data-cta={`home_tools_${n.id}_more`}>
                      {n.ctaDrugie}
                    </NextLink>
                  </div>
                  <p className="dn-zaufanie">
                    <span className="dn-zaufanie-kropka" aria-hidden="true" />
                    {dane.bezRejestracji} · {n.statusWejscia}
                  </p>

                  <div className="dn-mozliwosci">
                    <p className="dn-moz-tytul">{dane.mozliwosciEtykieta}</p>
                    <ul className="dn-moz-lista">
                      {n.cechy.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prawa kolumna: pastelowa scena; węzeł „Wejście” tylko w pierwszym wierszu jako wzorzec */}
                <div className="dn-prawa">
                  <div className="dn-scena" data-tlo={n.tlo}>
                    {idx === 0 && (
                      <>
                        <div className="dn-start-karta" aria-hidden="true">
                          <span className="dn-start-etykieta">{dane.wejscieEtykieta}</span>
                          <span className="dn-start-pole">
                            <span className="dn-start-plus">+</span>
                            <span>{n.wejscie}</span>
                          </span>
                        </div>
                        <div className="dn-lacznik" aria-hidden="true">
                          <span className="dn-lacznik-kropka">+</span>
                        </div>
                      </>
                    )}
                    <Podglad n={n} rozmiary={ROZMIARY_PODGLADU} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pozostałe 4 narzędzia jako kompaktowe karty 2x2 (krócej o ok. połowę wysokości sekcji) */}
          <div className="dn-siatka">
            {kompaktowe.map((n) => (
              <article key={n.id} id={`narz-${n.id}`} className="dn-karta" data-tlo={n.tlo}>
                <div className="dn-karta-tresc">
                  <div className="dn-kicker">
                    <span className="dn-kicker-nazwa">{n.nazwa}</span>
                    <span className="dn-kicker-ukosnik" aria-hidden="true">/</span>
                    <span className="dn-kicker-kat">{n.kategoria}</span>
                  </div>
                  <h3 className="dn-karta-h3">{n.naglowek}</h3>
                  <div className="dn-akcje dn-akcje--karta">
                    <NextLink href={n.href} prefetch={false} className="dn-btn dn-btn--glowny" data-cta={`home_tools_${n.id}`}>
                      {n.ctaGlowne} <span aria-hidden="true">→</span>
                    </NextLink>
                    <NextLink href={n.hrefDrugie} prefetch={false} className="dn-link-cichy" data-cta={`home_tools_${n.id}_more`}>
                      {n.ctaDrugie}
                    </NextLink>
                  </div>
                  <p className="dn-zaufanie">
                    <span className="dn-zaufanie-kropka" aria-hidden="true" />
                    {dane.bezRejestracji} · {n.statusWejscia}
                  </p>
                </div>
                <div className="dn-karta-scena" data-tlo={n.tlo}>
                  <Podglad n={n} rozmiary={ROZMIARY_KARTY} />
                </div>
              </article>
            ))}
          </div>

          {/* Dolny pasek prowadzący do pełnego huba z 16 szablonami PDF/XLSX */}
          <div className="dn-stopka">
            <NextLink href={dane.hubHref} prefetch={false} className="dn-hub-link" data-cta="home_tools_hub">
              <span>{dane.hubTekst}</span>
              <span aria-hidden="true">→</span>
            </NextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
