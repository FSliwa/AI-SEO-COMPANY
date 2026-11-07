import Image from 'next/image';

/*
 * Pas z antena satelitarna z makiety "Desktop - 2" (7.11.2026). Stoi miedzy hero
 * z robotem 3D (bez zmian wzgledem produkcji) a oferta i laczy czern hero
 * z pasmem chmur i gor. Czysta dekoracja: bez tekstu, aria-hidden.
 *
 * Warstwy (obie wyciete z tej samej grafiki, ta sama skala i kadr):
 *  - antena-tlo.webp: niebo, gory i cokol; czasza usunieta, niebo uzupelnione
 *    gradientem z kazdego wiersza; gora kadru przechodzi w czern hero;
 *  - antena-czasza.webp: sama czasza z ramieniem i lozyskiem (przezroczystosc),
 *    obraca sie w elewacji wokol lozyska (83,1 % x 57,3 % kadru) - ruch jak
 *    u prawdziwego radioteleskopu, ktory "szuka" sygnalu.
 *  - SVG: fale wychodzace z ogniska anteny i dwa "pakiety" lecace po lukach.
 * Animacje w app/wyglad.css (sekcja RUCH); przy ograniczonym ruchu stoja.
 */
export default function PasAnteny() {
  return (
    <div className="pas-anteny" aria-hidden="true" data-petla="" data-kursor="obraz">
      <div className="pas-anteny-scena">
        <Image
          className="pas-anteny-tlo"
          src="/images/wyglad/antena-tlo.webp"
          alt=""
          width={1600}
          height={1035}
          sizes="100vw"
          data-kursor-zrodlo=""
        />
        <Image
          className="pas-anteny-czasza"
          src="/images/wyglad/antena-czasza.webp"
          alt=""
          width={1600}
          height={1035}
          sizes="100vw"
        />
        <svg className="pas-anteny-sygnal" viewBox="0 0 804 520" preserveAspectRatio="none" focusable="false">
          {/* Fale z ogniska (punkt ~ 505, 175 w kadrze) */}
          <g className="pas-anteny-fale">
            <circle cx="505" cy="175" r="22" />
            <circle cx="505" cy="175" r="22" />
            <circle cx="505" cy="175" r="22" />
          </g>
          {/* Tory "pakietow" wzdluz lukow z grafiki */}
          <path id="tor-1" className="pas-anteny-tor" d="M505 175 C 430 150 360 110 300 40" />
          <path id="tor-2" className="pas-anteny-tor" d="M505 175 C 450 190 380 160 330 95" />
          <circle className="pas-anteny-pakiet pas-anteny-pakiet--1" r="4" />
          <circle className="pas-anteny-pakiet pas-anteny-pakiet--2" r="3" />
        </svg>
      </div>
    </div>
  );
}
