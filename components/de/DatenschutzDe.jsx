import RechtstextDe, { Bloecke, inline, stilH2 } from './RechtstextDe';
import { DATENSCHUTZ } from '@/lib/de/datenschutz';

// /de/datenschutz: Datenschutzerklärung nach Art. 13 DSGVO (Quelle: CookiesContent.jsx + Verhalten des Codes).
// Nicht juristisch geprüft.
export default function DatenschutzDe() {
  return (
    <RechtstextDe schluessel="/cookies" brotkrumen="Datenschutz" daten={DATENSCHUTZ}>
      <p>{inline(DATENSCHUTZ.lead, 'lead')}</p>
      {DATENSCHUTZ.abschnitte.map((a, i) => (
        <section key={i}>
          <h2 style={stilH2}>{a.titel}</h2>
          <Bloecke bloecke={a.bloecke} prefix={`d${i}`} />
        </section>
      ))}
    </RechtstextDe>
  );
}
