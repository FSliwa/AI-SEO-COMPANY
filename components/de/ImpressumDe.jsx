import RechtstextDe, { Bloecke, inline, stilH2, stilLink } from './RechtstextDe';
import { IMPRESSUM } from '@/lib/de/impressum';

const zelle = { padding: '0.6rem 1rem 0.6rem 0', verticalAlign: 'top', borderBottom: '1px solid rgba(0,0,0,0.08)' };

function Tabelle({ zeilen }) {
  return (
    <table className="impressum-tabela" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.05rem' }}>
      <tbody>
        {zeilen.map(([k, v, href]) => (
          <tr key={k}>
            <th scope="row" style={{ ...zelle, textAlign: 'left', width: '38%', color: 'var(--w-tusz)', fontWeight: 600 }}>{k}</th>
            <td style={{ ...zelle, overflowWrap: 'anywhere' }}>{href ? <a href={href} style={stilLink}>{v}</a> : v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// /de/impressum: Anbieterkennzeichnung nach § 5 DDG. Felder mit Wert null (Vertretungsberechtigte,
// USt-IdNr., Verantwortlicher nach § 18 MStV, Streitbeilegung) erscheinen nicht, bis die Daten vorliegen.
export default function ImpressumDe() {
  const I = IMPRESSUM;
  const zeilen = [...I.zeilen];
  if (I.vertretungsberechtigte) zeilen.splice(2, 0, ['Vertreten durch', I.vertretungsberechtigte]);
  if (I.ustIdNr) zeilen.push(['USt-IdNr.', I.ustIdNr]);
  return (
    <RechtstextDe schluessel="/impressum" brotkrumen="Impressum" daten={I}>
      <p>{inline(I.lead, 'lead')}</p>
      <h2 style={stilH2}>Anbieter</h2>
      <Tabelle zeilen={zeilen} />
      <h2 style={stilH2}>Kontakt</h2>
      <Tabelle zeilen={I.kontakt} />
      {I.verantwortlichInhalt && (<><h2 style={stilH2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>{I.verantwortlichInhalt}</p></>)}
      {I.streitbeilegung && (<><h2 style={stilH2}>Verbraucherstreitbeilegung (§ 36 VSBG)</h2><p>{I.streitbeilegung}</p></>)}
      {I.hinweise.map((h, i) => (
        <section key={i}>
          <h2 style={stilH2}>{h.titel}</h2>
          <Bloecke bloecke={[h.text]} prefix={`h${i}`} />
        </section>
      ))}
    </RechtstextDe>
  );
}
