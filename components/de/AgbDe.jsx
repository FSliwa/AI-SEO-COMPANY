import RechtstextDe, { Bloecke, inline, stilH2 } from './RechtstextDe';
import { AGB } from '@/lib/de/agb';

// /de/agb: deutsche Fassung der Nutzungsbedingungen (Quelle: RegulaminContent.jsx). Nicht juristisch geprüft.
export default function AgbDe() {
  return (
    <RechtstextDe schluessel="/regulamin" brotkrumen="AGB" daten={AGB}>
      <p>{inline(AGB.lead, 'lead')}</p>
      {AGB.abschnitte.map((a, i) => (
        <section key={i}>
          <h2 style={stilH2}>{a.titel}</h2>
          <Bloecke bloecke={a.bloecke} prefix={`a${i}`} />
        </section>
      ))}
    </RechtstextDe>
  );
}
