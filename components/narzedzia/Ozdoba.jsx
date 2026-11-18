// Dekoracyjny „przykładowy wynik” obok H1 stron narzędzi (desktop ≥ 1240 px). Same kształty: bez tekstu i liczb
// (reguła: zero nowej treści). aria-hidden, pointer-events: none. Kształty animuje CSS (narzedzia.module.css).
import st from './narzedzia.module.css';

const P = (n, f) => Array.from({ length: n }, (_, i) => f(i));

function Pierscien({ klasa = '', p = 0.74 }) {
  return (
    <svg viewBox="0 0 120 120" className={`${st.ozPierscien} ${klasa}`} focusable="false">
      <circle cx="60" cy="60" r="52" className={st.ozTlo} />
      <circle cx="60" cy="60" r="52" className={st.ozLuk} strokeDasharray="327" strokeDashoffset={327 * (1 - p)} />
    </svg>
  );
}

const Wiersze = ({ n = 3 }) => P(n, (i) => (
  <div key={i} className={st.ozWiersz}><i className={st.ozKropka} data-k={i % 3} /><b style={{ '--w': `${86 - i * 14}%` }} /></div>
));

export default function Ozdoba({ rodzaj = 'audyt' }) {
  let wnetrze;
  if (rodzaj === 'audyt') {
    wnetrze = (<>
      <div className={st.ozGlowa}><Pierscien klasa={st.ozDuzy} /><div className={st.ozLinie}><b style={{ '--w': '70%' }} /><b style={{ '--w': '45%' }} /></div></div>
      <div className={st.ozMale}>{P(4, (i) => <Pierscien key={i} p={0.9 - i * 0.14} />)}</div>
      <Wiersze n={3} />
    </>);
  } else if (rodzaj === 'ai') {
    wnetrze = (<>
      <div className={st.ozMale}>{P(5, (i) => <span key={i} className={st.ozKolo} style={{ '--i': i }} />)}</div>
      <Wiersze n={4} />
    </>);
  } else if (rodzaj === 'autorytet') {
    wnetrze = (<>
      <div className={st.ozLiczba}><b /></div>
      <div className={st.ozSkala}><i /></div>
      <div className={st.ozSlupki}>{P(3, (i) => <b key={i} style={{ '--w': `${88 - i * 24}%` }} />)}</div>
    </>);
  } else if (rodzaj === 'kalkulator') {
    wnetrze = (<>
      <div className={st.ozLiczba}><b /></div>
      <div className={st.ozWykres}>{P(12, (i) => <b key={i} style={{ '--h': `${18 + i * 6.5}%`, '--i': i }} />)}</div>
    </>);
  } else if (rodzaj === 'makieta') {
    wnetrze = (
      <div className={st.ozOkna}>
        {P(2, (k) => (
          <div key={k} className={st.ozOkno}>
            <span><i /><i /><i /></span>
            <b className={st.ozBaner} />
            <div><b /><b /><b /></div>
          </div>
        ))}
      </div>
    );
  } else if (rodzaj === 'llms') {
    wnetrze = (<>
      <div className={st.ozPlik}>{P(8, (i) => <b key={i} style={{ '--w': `${[64, 88, 52, 76, 40, 82, 58, 70][i]}%` }} />)}</div>
      <div className={st.ozPigulki}>{P(3, (i) => <i key={i} />)}</div>
    </>);
  }
  return <div className={st.ozdoba} aria-hidden="true"><div className={st.ozKarta}>{wnetrze}</div></div>;
}
