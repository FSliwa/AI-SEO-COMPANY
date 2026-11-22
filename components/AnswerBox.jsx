// Blok „Krótka odpowiedź” pod H1 (PLAN-v2 6.0): 40-60 słów, pierwsze zdanie odpowiada wprost,
// marka i/lub liczba ze źródłem. Etykieta to <p>, NIE nagłówek - konspekt zostaje H1 -> H2
// bez przeskoku. Bez hooków: działa w komponentach serwerowych i klienckich.
//
// Użycie:
//   <AnswerBox>Pozycjonowanie w AI (GEO) to praca nad tym, żeby…</AnswerBox>
//   <AnswerBox id="krotka-odpowiedz" etykieta="W skrócie"><p>…</p><p>…</p></AnswerBox>
// Tekst (string) trafia do jednego <p>; elementy renderują się bez opakowania.

const pudelko = {
  background: 'var(--w-karta)',
  border: '1px solid var(--w-linia)',
  borderLeft: '3px solid var(--w-pomarancz)',
  borderRadius: '16px',
  padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.1rem, 3vw, 1.75rem)',
  boxShadow: 'none',
  margin: '0 0 2rem',
  textAlign: 'left',
  color: 'var(--w-tusz)',
  fontSize: '1.05rem',
  lineHeight: 1.65,
};

const etykietaStyl = {
  margin: '0 0 0.45rem',
  fontFamily: 'var(--w-mono)',
  fontSize: '0.76rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--w-pomarancz-tekst)',
};

export default function AnswerBox({ children, etykieta = 'Krótka odpowiedź', id }) {
  return (
    <div className="answer-box" id={id} style={pudelko}>
      <p style={etykietaStyl}>{etykieta}</p>
      {typeof children === 'string' ? <p style={{ margin: 0 }}>{children}</p> : children}
    </div>
  );
}
