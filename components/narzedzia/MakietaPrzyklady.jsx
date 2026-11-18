// Kafelki „przed i po” na stronie Makieta redesignu (sekcja #przyklad / #example). 18.11.2026.
// Jeden kafel = jeden klient. Przełącznik Komputer / Telefon działa bez JavaScriptu (radia + CSS, obsługa
// strzałkami z klawiatury), dlatego komponent jest serwerowy. Obrazy to ramki z Figmy (okno przeglądarki
// i telefon, ten sam język wizualny co makiety w hubie narzędzi) ze zrzutami wstawionymi bez zmian.
// Zwykły <img> ze srcSet jak w NarzedziaHub (pliki WebP w trzech szerokościach, bez optymalizatora Next);
// width/height = wymiary pliku źródłowego (CLS 0), loading="lazy": ukryty panel nie pobiera obrazu.
import st from './makieta-przyklady.module.css';

export default function MakietaPrzyklady({ klienci, locale = 'pl' }) {
  const en = locale === 'en';
  const T = en
    ? { widok: 'Choose the preview', komputer: 'Desktop', telefon: 'Phone', przed: 'Before', po: 'After', strona: 'Website', pelny: 'Open the full-size desktop image' }
    : { widok: 'Wybierz podgląd', komputer: 'Komputer', telefon: 'Telefon', przed: 'Przed', po: 'Po', strona: 'Strona', pelny: 'Otwórz zrzut komputera w pełnym rozmiarze' };
  return (
    <div className={st.lista}>
      {klienci.map((k) => {
        const idK = `${k.id}-komputer`;
        const idT = `${k.id}-telefon`;
        const nazwaGrupy = `widok-${k.id}${en ? '-en' : ''}`;
        const t = k.tekst[locale];
        return (
          <article className={`${st.kafel} mak-kafel`} key={k.id} aria-labelledby={`naglowek-${k.id}${en ? '-en' : ''}`}>
            <header className={`${st.naglowek} r-wej`}>
              <h3 className={st.nazwa} id={`naglowek-${k.id}${en ? '-en' : ''}`}>{k.nazwa}</h3>
              <p className={st.meta}>
                {T.strona}: <a href={k.url} rel="noopener noreferrer" target="_blank">{k.domena}</a>
                <span aria-hidden="true"> · </span>
                {t.branza}
              </p>
              <p className={st.meta}>{t.przebieg}</p>
            </header>
            <fieldset className={st.grupa}>
              <legend className={st.legenda}>{T.widok}</legend>
              <input className={`${st.radio} ${st.radioK}`} type="radio" name={nazwaGrupy} id={`${idK}${en ? '-en' : ''}`} />
              <label className={st.przelacznik} htmlFor={`${idK}${en ? '-en' : ''}`}>{T.komputer}</label>
              <input className={`${st.radio} ${st.radioT}`} type="radio" name={nazwaGrupy} id={`${idT}${en ? '-en' : ''}`} />
              <label className={st.przelacznik} htmlFor={`${idT}${en ? '-en' : ''}`}>{T.telefon}</label>
              {[['komputer', st.panelKomputer], ['telefon', st.panelTelefon]].map(([urz, klasa]) => {
                const o = k[urz][locale];
                return (
                  <figure className={`${st.panel} ${klasa} mak-panel`} key={urz}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- WebP w trzech szerokościach podajemy wprost (srcSet), jak w hubie */}
                    <img className={urz === 'komputer' ? st.obrazKomputer : st.obrazTelefon} src={o.src} srcSet={o.srcSet} sizes={urz === 'komputer' ? '(max-width: 900px) calc(100vw - 2rem), 860px' : '(max-width: 760px) calc(100vw - 2rem), 760px'} alt={t[urz].alt} width={o.width} height={o.height} loading="lazy" decoding="async" />
                    <figcaption className={st.podpis}>
                      <span><strong>{T.przed}:</strong> {t[urz].przed}</span>
                      <span><strong>{T.po}:</strong> {t[urz].po}</span>
                      {urz === 'komputer' && <span><a className={st.link1440} href={o.src} target="_blank" rel="noopener noreferrer">{T.pelny}</a></span>}
                    </figcaption>
                  </figure>
                );
              })}
            </fieldset>
          </article>
        );
      })}
    </div>
  );
}
