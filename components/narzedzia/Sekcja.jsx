// Sekcja treści stron narzędzi: <section aria-labelledby> z H2 (wydzielona z UkladAplikacji.jsx 12.11.2026,
// bez importów serwerowych, więc działa też w komponentach klienckich). UkladAplikacji.jsx ją reeksportuje.
import st from './narzedzia.module.css';
import * as s from './styl';

export function Sekcja({ id, tytul, children, style }) {
  return (
    <section aria-labelledby={id} className={st.sekcja} style={style ? { ...s.sekcja, ...style } : s.sekcja}>
      <h2 id={id} style={s.h2}>{tytul}</h2>
      {children}
    </section>
  );
}

export default Sekcja;
