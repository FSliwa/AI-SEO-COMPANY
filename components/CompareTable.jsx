// Tabela porównania (PLAN-v2 6.0; P1–P3, P6, L1, AU1, S1). Jedno API dla 2–4 kolumn
// i dla układu „pytanie / dobra odpowiedź / czerwona flaga” (P6). Bez hooków: działa
// w komponentach serwerowych i klienckich.
//
//   <CompareTable
//     id="tabela-kryteriow"
//     caption="Pozycjonowanie za efekt i abonament w 10 kryteriach"
//     columns={[{ key: 'kryterium', label: 'Kryterium' }, { key: 'efekt', label: 'Za efekt' }, { key: 'abonament', label: 'Abonament' }]}
//     rows={[{ kryterium: 'Cena', efekt: '99–149 zł za frazę', abonament: 'od 1 900 zł netto' }]}
//     przypis="Źródło: cenniki 17 agencji, odczyt 25.10.2026."
//   />
//
// Pierwsza kolumna = nagłówek wiersza (<th scope="row">), pozostałe <td>. Komórka może być
// stringiem albo elementem (np. <Link>). Na 390 px przewija się tylko kontener tabeli
// (role="region" z tabIndex, żeby dało się go przewinąć klawiaturą), nigdy cała strona.
// minWidth: szerokość, poniżej której tabela się przewija (domyślnie 170 px na kolumnę od 3 kolumn).

const tabelaStyl = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
  lineHeight: 1.5,
  color: 'var(--color-text-main)',
  background: '#FFFFFF',
};
const captionStyl = {
  captionSide: 'top',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: '1rem',
  color: 'var(--color-text-dark)',
  padding: '0 0 0.75rem',
};
const thKolumnaStyl = {
  textAlign: 'left',
  verticalAlign: 'bottom',
  padding: '0.75rem 1rem',
  borderBottom: '2px solid var(--w-linia)',
  fontWeight: 700,
  color: 'var(--color-text-dark)',
  background: 'var(--w-papier-2)',
};
const thWierszStyl = {
  textAlign: 'left',
  verticalAlign: 'top',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--w-linia)',
  fontWeight: 600,
  color: 'var(--color-text-dark)',
};
const tdStyl = {
  verticalAlign: 'top',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--w-linia)',
};

export default function CompareTable({ caption, columns, rows, id, przypis, minWidth }) {
  const [pierwsza, ...reszta] = columns;
  const szerokosc = minWidth ?? (columns.length > 2 ? columns.length * 170 : undefined);
  const etykieta = typeof caption === 'string' ? caption : undefined;

  return (
    <div style={{ margin: '0 0 2rem' }}>
      <div
        role="region"
        aria-label={etykieta}
        tabIndex={0}
        style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}
      >
        <table id={id} style={szerokosc ? { ...tabelaStyl, minWidth: `${szerokosc}px` } : tabelaStyl}>
          {caption && <caption style={captionStyl}>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" style={thKolumnaStyl}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id ?? i}>
                <th scope="row" style={thWierszStyl}>{r[pierwsza.key]}</th>
                {reszta.map((c) => (
                  <td key={c.key} style={tdStyl}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {przypis && <p style={{ margin: '0.6rem 0 0', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>{przypis}</p>}
    </div>
  );
}
