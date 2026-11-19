// Kafel narzędzia w kolumnie hero (19.11.2026, hero v8). Komponent serwerowy: cały tekst i link są
// w HTML z serwera, ruch i sterowanie dokłada HeroNarzedzia.jsx. Dane: lib/heroNarzedzia.js.
// Wnętrze kafla (.mk) to dekoracyjna makieta wyniku (aria-hidden), prawdziwa treść to nazwa, plakietka,
// opis i wezwanie. Mały kafel z faktem (.sat) leży obok kafla, poza linkiem: zwykły tekst, bez fokusu.

const IKONY = {
  audyt: <path d="M20 6 9 17l-5-5" />,
  ai: (<><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 16v4M17 18h4" /></>),
  autorytet: (<><path d="M5 17a8 8 0 1 1 14 0" /><path d="M12 13l4-4" /></>),
  kalk: (<><path d="M19 5 5 19" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></>),
  llms: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  makieta: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>),
  panel: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />,
};

// Boty z generatora llms.txt (GENERATOR.botow = 8); Google-Extended pokazany jako zablokowany (przykład).
const BOTY = [['GPTBot', true], ['OAI-SearchBot', true], ['ChatGPT-User', true], ['PerplexityBot', true], ['ClaudeBot', true], ['Claude-SearchBot', true], ['Google-Extended', false], ['Bingbot', true]];

// Wartości przykładowe widoczności w AI (zestaw demo lib/narzedziaDemo.js): wzmianki / odpowiedzi.
// Ostatni wiersz to przegląd AI w Google (0 z 1 odpowiedzi).
function wartosciSilnika(i, ile) {
  if (i === ile - 1) return [0, 1];
  return [[1, 3], [0, 3], [2, 3], [0, 3]][i] || [0, 3];
}

function Makieta({ id, m, s }) {
  if (id === 'audyt') {
    const kat = s.audytKategorie;
    const wiersze = [[m.kat[0], kat.techniczne.wynik, s.wagi.techniczne], [m.kat[1], kat.tresc.wynik, s.wagi.tresc], [m.kat[2], kat.wydajnosc.wynik, s.wagi.wydajnosc], [m.kat[3], kat.ai.wynik, s.wagi.ai]];
    return (
      <>
        <span className="wynik"><span className="n">{s.audytWynik}</span><span className="z">/100</span><span className="o">{m.domena}<br />{s.audytData}</span></span>
        {wiersze.map(([nazwa, v, waga]) => (
          <span className="wr" key={nazwa}>
            <span className="l">{nazwa}</span>
            <span className="p"><i className={v < 90 ? 'w' : ''} style={{ width: `${v}%` }} /></span>
            <span className="v">{v} · {m.wagaSlowo} {waga}%</span>
          </span>
        ))}
      </>
    );
  }
  if (id === 'ai') {
    return m.silniki.map((nazwa, i, wszystkie) => {
      const [wz, ile] = wartosciSilnika(i, wszystkie.length);
      return (
        <span className="eng" key={nazwa}>
          <span className="l">{nazwa}</span>
          <span className="dt">{Array.from({ length: ile }, (_, j) => <i key={j} className={j < wz ? 'f' : ''} />)}</span>
          <span className={`m${wz ? ' a' : ''}`}>{wz}/{ile}</span>
        </span>
      );
    });
  }
  if (id === 'autorytet') {
    return (
      <>
        <span className="wynik"><span className="n">{s.autorytetWynik}</span><span className="z">/100</span></span>
        <span className="skala"><i style={{ width: `${s.autorytetWynik}%` }} /></span>
        <span className="pod"><span>0</span><span>100</span></span>
        <span className="row"><b>{s.autorytetDomen}</b><span>{m.domenWGrafie}</span></span>
      </>
    );
  }
  if (id === 'kalk') {
    const wart = [...s.polaWartosci, m.wartosc];
    return (
      <>
        <span className="pol">{m.pola.map((p, i) => <span key={p}><small>{p}</small><b>{wart[i]}</b></span>)}</span>
        <span className="zysk"><small>{m.zyskEtykieta}</small><b>{m.zysk}</b></span>
      </>
    );
  }
  if (id === 'llms') {
    return (
      <>
        <span className="boty">{BOTY.map(([n, ok]) => <span key={n}><i className={ok ? '' : 'x'} />{n}</span>)}</span>
        <span className="cap">{m.przykladLlms}</span>
      </>
    );
  }
  if (id === 'makieta') {
    const blok = (l, t, w, h, tlo, extra = {}) => ({ left: l, top: t, width: w, height: h, background: tlo, ...extra });
    return (
      <>
        <span className="mini">
          <span className="tb"><i style={{ left: 6 }} /><i style={{ left: 18 }} /><i style={{ left: 30 }} /></span>
          <span className="a" style={blok(12, 26, 120, 8, '#1E1E1E', { opacity: 0.85 })} />
          <span className="a" style={blok(12, 40, 92, 6, '#5E554D', { opacity: 0.6 })} />
          <span className="a" style={blok(12, 52, 46, 12, '#C94E24', { borderRadius: 6 })} />
          <span className="a" style={blok(12, 72, 76, 18, '#FBE6DA')} />
          <span className="a" style={blok(96, 72, 76, 18, '#FBE6DA')} />
          <span className="a" style={blok(180, 72, 76, 18, '#FBE6DA')} />
          <span className="a" style={blok(150, 26, 102, 38, 'rgba(30,30,30,.14)')} />
        </span>
        <span className="cap">{m.przykladMakieta}</span>
      </>
    );
  }
  // panel klienta: wykres przykładowy i formaty eksportu
  return (
    <>
      <svg className="spark" viewBox="0 0 264 64" fill="none" aria-hidden="true">
        <path d="M0 52 C28 50 44 44 70 40 S112 34 140 26 S206 14 264 6 L264 64 L0 64Z" fill="#BE461F" fillOpacity=".14" />
        <path d="M0 52 C28 50 44 44 70 40 S112 34 140 26 S206 14 264 6" stroke="#BE461F" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="cap">{m.przykladPanel}</span>
      <span className="chips"><span>CSV</span><span>JSON</span><span>API</span><span>MCP</span></span>
    </>
  );
}

export default function HeroKafel({ kafel: k, indeks, m, s }) {
  const styl = { '--i': indeks, '--w': `${k.szer}px`, [k.strona === 'r' ? '--mr' : '--ml']: `${k.margines}px` };
  const idBdg = `hn-bdg-${k.id}`;
  const idOpis = `hn-opis-${k.id}`;
  return (
    <li className={k.strona === 'r' ? 'r' : undefined} style={styl}>
      {/* Nazwa dostępna = nazwa kafla i wezwanie (zawiera widoczny tekst linku); plakietka i opis jako opis. */}
      <a className={`k${k.ciemny ? ' ciemny' : ''}`} draggable="false" href={k.href} aria-label={`${k.nazwa}: ${k.cta}`} aria-describedby={`${idBdg} ${idOpis}`}>
        <span className="h">
          <span className="ik" aria-hidden="true"><svg viewBox="0 0 24 24">{IKONY[k.id]}</svg></span>
          <span className="t">{k.nazwa}</span>
          <span className="bdg" id={idBdg}>{k.plakietka}</span>
        </span>
        <span className="mk" aria-hidden="true"><Makieta id={k.id} m={m} s={s} /></span>
        <span className="b" id={idOpis}>{k.opis}</span>
        <span className="cta">
          <span className="c">{k.cta}</span>
          <span className="ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
        </span>
      </a>
      {/* Mały kafel z faktem: obok dużego, poza linkiem, zwykły tekst (widoczny od 1200 px). */}
      <span className="sat"><small>{k.sat[0]}</small><b>{k.sat[1]}</b><span>{k.sat[2]}</span></span>
    </li>
  );
}
