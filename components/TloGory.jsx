import './TloGory.css';

/**
 * Tlo hero podstron uslugowych (12.11.2026): gory i chmury z hero strony glownej
 * (ta sama grafika hero-tlo-v2.webp i te same chmury chmury.webp), ale tylko w dolnej
 * czesci sekcji - gorna zostaje jasna, wiec tekst ma pelny kontrast. Warstwa
 * dekoracyjna: aria-hidden, za trescia (z-index 0, tresc dostaje z-index 2 w
 * TloGory.css), pozycjonowana absolutnie, wiec nie przesuwa ukladu (brak CLS).
 * Grafiki to tlo CSS, nie <img priority>: bez preloadu.
 *
 * Uzycie: <section className="subpage-hero tlo-gory-hero"> <TloGory /> ... </section>
 */
export default function TloGory() {
  return (
    <div className="tlo-gory" aria-hidden="true">
      <div className="tlo-gory-obraz" />
      {/* Antena satelitarna (czasza) na podstawie stacji z hero-tlo-v2.webp. Pudelko
          sceny ma proporcje grafiki tla (1600x1194) i ta sama skale co tlo "cover", wiec
          czasza jest przyklejona do podstawy przy kazdej szerokosci. Pozycje w %. */}
      <div className="tlo-gory-scena">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="tlo-gory-czasza"
          src="/images/wyglad/satelita-czasza.webp?v=4x"
          alt=""
          width="707"
          height="587"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="tlo-gory-mgla">
        <div className="tlo-gory-chmury">
          <span />
          <span />
        </div>
      </div>
      <div className="tlo-gory-szew" />
    </div>
  );
}
