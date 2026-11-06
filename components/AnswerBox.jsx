// Blok „Krótka odpowiedź” pod H1 (PLAN-v2 6.0): 40–60 słów, pierwsze zdanie odpowiada wprost,
// marka i/lub liczba ze źródłem. Etykieta to <p>, NIE nagłówek - konspekt zostaje H1 -> H2
// bez przeskoku. Bez hooków: działa w komponentach serwerowych i klienckich.
//
// Użycie:
//   <AnswerBox>Pozycjonowanie w AI (GEO) to praca nad tym, żeby…</AnswerBox>
//   <AnswerBox id="krotka-odpowiedz" etykieta="W skrócie"><p>…</p><p>…</p></AnswerBox>
// Tekst (string) trafia do jednego <p>; elementy renderują się bez opakowania.

const pudelko = {
  background: '#FFFFFF',
  borderLeft: '4px solid var(--color-primary)',
  borderRadius: '16px',
  padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.1rem, 3vw, 1.75rem)',
  boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
  margin: '0 0 2rem',
  textAlign: 'left',
  color: '#333336',
  fontSize: '1.05rem',
  lineHeight: 1.65,
};

const etykietaStyl = {
  margin: '0 0 0.4rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-primary)',
};

export default function AnswerBox({ children, etykieta = 'Krótka odpowiedź', id }) {
  return (
    <div className="answer-box" id={id} style={pudelko}>
      <p style={etykietaStyl}>{etykieta}</p>
      {typeof children === 'string' ? <p style={{ margin: 0 }}>{children}</p> : children}
    </div>
  );
}
