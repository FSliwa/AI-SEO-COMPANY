// „Co dostajesz za darmo” (S1-poprawki Z-04, agent wspolne, 12.11.2026): dwie kolumny „od razu, bez
// e-maila” i „po podaniu e-maila”, żeby granica darmowe / za e-mailem nie była schowana w FAQ.
// Stoi zaraz po „Krótkiej odpowiedzi” (pierwszy element children w Uklad). Bez hooków.
//   <CoDostajesz locale="pl" odRazu={[...]} poEmailu={[...]} przypis="…">{<ZrzutWyniku … />}</CoDostajesz>
// Pusta lista poEmailu = jedna kolumna (np. generator llms.txt: cały plik bez e-maila).
// Treść per narzędzie: Z-A3, Z-W5, Z-M2, Z-K5 (kalkulator: e-mail tylko wysyła zestawienie).

import { Sekcja } from './Sekcja';
import st from './narzedzia.module.css';
import * as s from './styl';

export default function CoDostajesz({
  locale = 'pl',
  id,
  tytul,
  odRazu = [],
  poEmailu = [],
  tytulOdRazu,
  tytulPoEmailu,
  wstep,
  przypis,
  children,
}) {
  const en = locale === 'en';
  const jedna = !poEmailu.length || !odRazu.length;
  return (
    <Sekcja id={id ?? (en ? 'what-you-get' : 'co-dostajesz')} tytul={tytul ?? (en ? 'What you get for free' : 'Co dostajesz za darmo')}>
      {wstep ? <p style={s.akapit}>{wstep}</p> : null}
      <div className={`${st.dwieKolumny}${jedna ? ` ${st.jednaKolumna}` : ''}`}>
        {odRazu.length > 0 && (
          <div className={st.kolumna}>
            <h3 style={s.h3Kolumny}>{tytulOdRazu ?? (en ? 'Right away, no email needed' : 'Od razu, bez e-maila')}</h3>
            <ul>{odRazu.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>
        )}
        {poEmailu.length > 0 && (
          <div className={`${st.kolumna} ${st.kolumnaZaEmailem}`}>
            <h3 style={s.h3Kolumny}>{tytulPoEmailu ?? (en ? 'After you enter your email' : 'Po podaniu e-maila')}</h3>
            <ul>{poEmailu.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>
        )}
      </div>
      {przypis ? <p style={s.przypis}>{przypis}</p> : null}
      {children}
    </Sekcja>
  );
}
