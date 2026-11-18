// Gemeinsame kleine Bausteine der deutschen GEO-Seiten (Gruppe de-geo): Autorenzeile, FAQ-Daten für AppleFaq.
// Serverkomponenten ohne Hooks. AppleFaq liest für lang !== 'pl' die Felder questionEn/answerEn,
// deshalb tragen die Einträge den deutschen Text in beiden Feldpaaren (faqFuerAppleFaq).
import { Link } from '@/i18n/routing';
import { data as datumDe } from '@/lib/formatDe';

const STIL = { margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' };

/** „Verfasst von: Filip Śliwa, SEO-Spezialist · Stand: 18.11.2026“ (Datum = Datum der letzten inhaltlichen Änderung). */
export function BylineDe({ stand, style }) {
  return (
    <p className="byline" lang="de" style={style ? { ...STIL, ...style } : STIL}>
      Verfasst von:{' '}
      <Link href="/o-nas" style={{ color: 'inherit', textDecoration: 'underline' }}>Filip Śliwa</Link>
      , SEO-Spezialist
      {stand && (
        <>
          {' · Stand: '}
          <time dateTime={stand}>{datumDe(stand, 'de')}</time>
        </>
      )}
    </p>
  );
}

/** [{ question, answer }] -> Einträge für AppleFaq und das FAQPage-JSON-LD (deutscher Text in allen Feldern). */
export function faqFuerAppleFaq(liste) {
  return liste.map(({ question, answer, id }) => ({ question, answer, questionEn: question, answerEn: answer, ...(id ? { id, idEn: id } : {}) }));
}
