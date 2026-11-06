'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { hash } from '@/lib/anchors';

/*
 * Hero strony glownej w ukladzie z makiety "Desktop - 2" (6.11.2026, DESIGN.md).
 *
 * Zmienil sie wyglad, nie tresc: H1, lead, akapit, oba przyciski i cztery
 * nazwy klientow sa slowo w slowo te same co wczesniej (obiekt COPY nizej
 * przeniesiony bez zmian, stary komponent w historii git: acd7fc6).
 *
 * Co odpadlo: scena Spline (4,9 MB pliku + ~1,5 MB runtime'u) i tekst na luku
 * (HeroArcText). Oba byly dekoracja - scena dawala wielki napis "SEO", a luk
 * byl tylko inna kompozycja tego samego akapitu, ktory serwer i tak oddawal
 * jako zwykle <p>. Na ich miejscu jest statyczna grafika anteny (next/image,
 * priority). Pliki SceneErrorBoundary, HeroArcText i SceneBackdrop zostaja
 * w repo.
 *
 * Kolejnosc w H1 bez zmian ("Pozycjonowanie, ktore buduje sprzedaz" + podtytul):
 * podtytul stoi wizualnie nad naglowkiem jako etykieta (CSS order), ale w DOM
 * i dla robota zostaje za nim. EN: "SEO " bylo dotad sr-only, bo slowo dawala
 * scena 3D - bez sceny jest widoczne.
 */

/**
 * Hero copy per locale.
 *
 * Polish is not a translation of the English — it is the wording that was
 * already on the Polish hero, redistributed. The old H1 read "Kompleksowa
 * Agencja SEO i Marketingowa z Warszawy. Twój projekt i strony to nasz
 * priorytet - skuteczne pozycjonowanie napędzające wzrost" and is preserved
 * whole across `sub` and `lead`. `display` and `body` were previously baked
 * into the SVG artwork as paths, so they existed as pixels and not as text —
 * moving them here turns them into indexable HTML for the first time.
 *
 * `wide` clauses are the ones phones do not get. They deliberately carry no
 * keyword of their own: everything that ranks lives in the shared sentences, so
 * the shortened mobile rendering — the one mobile-first indexing reads — is not
 * missing a single phrase.
 */
/* The lead and the body are segment lists now, not strings. Segments marked
   `wide: true` render inside .hero-en-wide-only spans, which phones (and the
   squeezed near-square desktop) hide — so the two readings are maintained in
   ONE place and the mobile text is a grammatical subsequence of the wide one
   by construction. The full wide string (also the arc's input) is derived by
   joining every segment, so the two variants cannot drift apart. Every cut is
   an adjective or a keyword-free clause; each phrase that ranks stays in the
   visible mobile text. */
const COPY = {
  en: {
    leadSeg: [
      { t: 'We do what search engine optimisation companies rarely do: report on pipeline' },
      { t: ', not on rankings', wide: true },
      { t: '.' }
    ],
    bodySeg: [
      // The whole first sentence is a wide-screen clause: none of its words
      // is a listed phrase ("SEO" recurs in "advanced SEO" below), so phones
      // open straight on the sentence that carries the accents.
      { t: 'The creativity of human SEO teams with AI-driven accuracy delivers dominant visibility and lasting growth. We merge the two so your brand compounds results instead of chasing them. ', wide: true },
      { t: 'Brand strategy,' },
      { t: ' innovative', wide: true },
      { t: ' design and advanced SEO make your business remembered and chosen' },
      { t: ' at massive scale', wide: true },
      { t: '.' },
      { t: ' We combine all three rather than treating them as separate projects.', wide: true }
    ],
    display: 'that drives sales',
    sub: 'Premium SEO & Marketing Agency for Companies',
    ctaPrimary: 'Get Proposal',
    ctaSecondary: 'View Portfolio'
  },
  pl: {
    leadSeg: [
      { t: 'Twój projekt i strony' },
      { t: ' to nasz priorytet', wide: true },
      { t: ' – ' },
      { t: 'skuteczne ', wide: true },
      { t: 'pozycjonowanie napędzające wzrost.' }
    ],
    bodySeg: [
      { t: 'Łączymy strategię marki,' },
      { t: ' nowatorskie', wide: true },
      { t: ' projektowanie i zaawansowane SEO' },
      // The whole result clause is wide-screen: not one of its words is a
      // listed phrase, and without it the sentence still closes cleanly.
      { t: ', aby Twoja firma była widoczna, zapamiętana i masowo wybierana przez klientów', wide: true },
      { t: '.' },
      { t: ' Prowadzimy te trzy obszary razem, a nie jako osobne projekty.', wide: true },
      { t: ' Agencja SEO i Marketingowa Warszawa – pozycjonowanie stron i projektowanie.' },
      { t: ' Rozliczamy się z realnego wzrostu firmy i raportujemy sprzedaż, nie same pozycje w wyszukiwarce.', wide: true }
    ],
    display: 'Pozycjonowanie, które buduje sprzedaż',
    sub: 'Kompleksowa Agencja SEO i Marketingowa z Warszawy',
    ctaPrimary: 'Wyceń projekt',
    ctaSecondary: 'Zobacz portfolio'
  }
};


export default function Hero() {
  const lang = useLocale();
  const copy = COPY[lang] || COPY.pl;
  // Dwie linie jak w makiecie. PL: "Pozycjonowanie," / "które buduje sprzedaż".
  // EN: "SEO" / "that drives sales" - tekst H1 identyczny z dotychczasowym
  // ("SEO " bylo w nim jako sr-only).
  const [displayPierwsze, ...displayReszta] = copy.display.split(' ');
  const linia1 = lang === 'pl' ? displayPierwsze : 'SEO';
  const linia2 = lang === 'pl' ? displayReszta.join(' ') : copy.display;

  return (
    <section className="hero-makieta" id="hero">
      <div className="hero-makieta-grafika" aria-hidden="true">
        <Image
          src="/images/wyglad/hero-antena.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 72vw"
          style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
        />
      </div>
      {/* Luki sygnalu z makiety - czysta dekoracja SVG, w pomaranczu zamiast fioletu. */}
      <svg className="hero-makieta-luki" viewBox="0 0 900 700" aria-hidden="true" focusable="false">
        <path d="M120 690 C 160 380 360 120 700 30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M250 520 C 300 330 450 170 760 110" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.5" />
        <path d="M330 470 C 390 300 560 140 860 90" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
        <circle cx="474" cy="268" r="6" fill="currentColor" />
        <circle cx="236" cy="420" r="4" fill="currentColor" opacity="0.7" />
      </svg>

      <div className="container hero-makieta-tresc">
        <h1 className="hero-makieta-h1">
          <span className="hero-makieta-display">
            <span className="hero-makieta-display-1">{linia1}</span>{' '}
            <span className="hero-makieta-display-2">{linia2}</span>
          </span>{' '}
          <span className="hero-makieta-sub">{copy.sub}</span>
        </h1>

        {/* Segmenty `wide` chowaja sie na telefonie (jak dotad) - zadna fraza
            z listy wlasciciela nie siedzi wylacznie w nich. */}
        <p className="hero-makieta-lead">
          {copy.leadSeg.map((s, i) =>
            s.wide
              ? <span key={i} className="hero-makieta-szeroki">{s.t}</span>
              : <Fragment key={i}>{s.t}</Fragment>
          )}
        </p>
        <p className="hero-makieta-body">
          {copy.bodySeg.map((s, i) =>
            s.wide
              ? <span key={i} className="hero-makieta-szeroki">{s.t}</span>
              : <Fragment key={i}>{s.t}</Fragment>
          )}
        </p>

        <div className="hero-makieta-akcje">
          <a href={hash('kontakt', lang)} className="w-przycisk w-przycisk--glowny" data-cta="hero">{copy.ctaPrimary} →</a>
          <a href="#portfolio" className="w-przycisk w-przycisk--obrys">{copy.ctaSecondary}</a>
        </div>
      </div>
    </section>
  );
}

/*
 * Pasek klientow (dawniej .hero-partners-row w rogu hero). Te same cztery
 * nazwy, teraz jako pas na chmurach miedzy hero a oferta - jak loga w makiecie.
 * Renderowany w app/[locale]/page.js zaraz po <Hero />, wiec kolejnosc tresci
 * w DOM sie nie zmienia.
 */
export function PasekKlientow() {
  return (
    <div className="pasek-klientow">
      <div className="container pasek-klientow-wiersz">
        <span className="pasek-klientow-nazwa pasek-klientow-nazwa--staniax">STANIAX</span>
        <span className="pasek-klientow-nazwa pasek-klientow-nazwa--asebot">ASE-BOT</span>
        <span className="pasek-klientow-nazwa pasek-klientow-nazwa--madame">MADAME THAI</span>
        <span className="pasek-klientow-nazwa pasek-klientow-nazwa--kozera">IRENEUSZ KOZERA</span>
      </div>
    </div>
  );
}
