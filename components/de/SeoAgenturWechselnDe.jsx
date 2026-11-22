// Deutsche Ratgeber- und Übergabeseite /de/seo-agentur-wechseln (Schlüssel PL: /zmiana-agencji-seo, 22.11.2026).
// Serverkomponente auf Basis von UslugiBausteine.jsx; ohne E-Mail-Formular, da /api/checklista nur PL/EN unterstützt.
import {
  Seite,
  Hero,
  Abschnitt,
  Absatz,
  Unterueberschrift,
  Liste,
  Tabelle,
  CtaZeile,
  Faq,
  LINK,
} from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { BylineDe } from '@/components/de/GeoBausteineDe';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE } from '@/lib/de/uslugiGemeinsam';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { eur } from '@/lib/formatDe';
import {
  STAND_WECHSEL_DE,
  WECHSEL_KURZANTWORT,
  VERTRAG_PRUEFPUNKTE_DE,
  WECHSEL_SCHRITTE_DE,
  CHECKLISTE_32_DE,
  CHECKLISTE_32_ANZAHL,
  WECHSEL_FAQ_DE,
  WECHSEL_QUELLEN_DE,
} from '@/lib/de/seoAgenturWechseln';

const KLUCZ = '/zmiana-agencji-seo';
const e = (n) => eur(n, 'de');

export default function SeoAgenturWechselnDe() {
  const w = wpisDe(KLUCZ);

  return (
    <Seite krumen="SEO Agentur wechseln">
      <Hero
        kicker={`Leitfaden & ${CHECKLISTE_32_ANZAHL}-Punkte-Übergabeliste`}
        h1={w?.h1 ?? 'SEO Agentur wechseln: 6 Schritte und 32 Prüfpunkte ohne Rankingverlust'}
        lead="Drei Fehler kosten Unternehmen beim Agenturwechsel am häufigsten Sichtbarkeit und Geld: Google-Konten unter fremden Agentur-Logins, gemietete Backlinks, die am Kündigungstag verschwinden, und verpasste Kündigungsfristen. Mit diesem Ablaufplan sichern Sie vorab alle Konten, Daten und Rechte."
        cta="Kostenlosen 30-Minuten-Check anfragen"
      />

      <Abschnitt titel="Kurzantwort: Sicher die SEO Agentur wechseln ohne Sichtbarkeitsverlust" id="kurzantwort">
        <BylineDe stand={STAND_WECHSEL_DE} />
        <AnswerBox etykieta="Kurzantwort">
          <p lang="de" style={{ margin: 0 }}>{WECHSEL_KURZANTWORT}</p>
        </AnswerBox>
        <Absatz style={{ marginBottom: 0 }}>
          AI SEO COMPANY begleitet B2B-Unternehmen aus Deutschland, Österreich und der Schweiz regelmäßig bei der geordneten Übernahme laufender SEO-Projekte. Direkt auf dieser Seite finden Sie den{' '}
          <a href="#sechs-schritte" style={LINK}>6-Schritte-Ablaufplan</a>, die komplette{' '}
          <a href="#checkliste-32" style={LINK}>{CHECKLISTE_32_ANZAHL}-Punkte-Übergabeliste</a>{' '}
          {maWersjeDe('/narzedzia/umowa-na-pozycjonowanie') && (
            <>
              sowie den Link zu unserer druckfertigen{' '}
              <Link href="/narzedzia/umowa-na-pozycjonowanie" style={LINK}>SEO Vertrag Checkliste (kostenloses PDF)</Link>
            </>
          )}
          .
        </Absatz>
      </Abschnitt>

      <Abschnitt titel="Vor der Kündigung: 6 Punkte im Vertrag und AVV prüfen" id="vertrag-pruefen">
        <Absatz>
          Nehmen Sie Ihren bestehenden Agenturvertrag, die Allgemeinen Geschäftsbedingungen und den Auftragsverarbeitungsvertrag zur Hand, bevor Sie ein Kündigungsschreiben absenden. Diese sechs Klauseln bestimmen Ihre Kosten, Ihre Stichtage und was technisch bei Ihnen verbleibt:
        </Absatz>
        <Tabelle
          beschriftung="Vertrags- und Datenschutz-Check vor dem Kündigungsschreiben"
          spalten={['Prüffeld', 'Worauf Sie in Vertrag, AGB und AVV achten sollten']}
          zeilen={VERTRAG_PRUEFPUNKTE_DE}
        />
        <Absatz>
          Vergleichen Sie vor Abschluss des Folgevertrags auch das Abrechnungsmodell:{' '}
          {maWersjeDe('/porownania/pozycjonowanie-za-efekt-czy-abonament') ? (
            <Link href="/porownania/pozycjonowanie-za-efekt-czy-abonament" style={LINK}>
              SEO erfolgsbasiert oder monatlicher Retainer
            </Link>
          ) : (
            'SEO erfolgsbasiert oder monatlicher Retainer'
          )}{' '}
          zeigt, warum reine Positionsprämien oft falsche Keywords fördern.{' '}
          {maWersjeDe('/porownania/agencja-seo-czy-freelancer') && (
            <>
              Wägen Sie zwischen Agentur, Einzelberater und eigenem Team ab, lesen Sie{' '}
              <Link href="/porownania/agencja-seo-czy-freelancer" style={LINK}>
                SEO-Agentur, Freelancer oder Inhouse
              </Link>
              .
            </>
          )}
        </Absatz>
        <Absatz style={{ fontSize: '0.95rem', color: 'var(--w-tusz-2)', marginBottom: 0 }}>
          <em>Hinweis: Dieser Leitfaden dient der kaufmännischen und technischen Orientierung und stellt keine Rechtsberatung dar. Fristen, Formvorschriften und Datenschutzpflichten richten sich nach Ihrem konkreten Vertrag und dem anwendbaren Recht (DE, AT, CH oder PL).</em>
        </Absatz>
      </Abschnitt>

      <Abschnitt titel="SEO-Agentur wechseln: Schritt für Schritt in 6 Phasen" id="sechs-schritte">
        <Absatz>
          Halten Sie beim Wechsel unbedingt diese Reihenfolge ein - erst Konten und Exporte sichern, dann kündigen:
        </Absatz>
        <Liste
          nummeriert
          punkte={WECHSEL_SCHRITTE_DE.map((s) => (
            <span key={s.title}>
              <strong style={{ color: 'var(--color-text-dark)' }}>{s.title}:</strong> {s.text}
            </span>
          ))}
        />
      </Abschnitt>

      <CtaZeile text="Kostenlosen 30-Minuten-Check anfragen" />

      <Abschnitt titel={`Übergabe-Checkliste: Was Sie von der bisherigen Agentur mitnehmen (${CHECKLISTE_32_ANZAHL} Punkte)`} id="checkliste-32" breite={920}>
        <Absatz>
          Arbeiten Sie alle {CHECKLISTE_32_ANZAHL} Prüfpunkte direkt auf Ihren eigenen Konten ab. Die vollständige Liste steht Ihnen hier ohne E-Mail-Schranke offen zur Verfügung:
        </Absatz>

        {CHECKLISTE_32_DE.map((gruppe) => (
          <div key={gruppe.id} id={gruppe.id} style={{ scrollMarginTop: '110px', marginBottom: '1.75rem' }}>
            <Unterueberschrift>{gruppe.titel}</Unterueberschrift>
            <Absatz style={{ fontSize: '1rem', color: 'var(--w-tusz-2)', marginBottom: '0.9rem' }}>
              {gruppe.beschreibung}
            </Absatz>
            <Tabelle
              beschriftung={gruppe.titel}
              spalten={['Nr.', 'Konto / Bereich', 'Zielzustand vor und zum Vertragsende']}
              zeilen={gruppe.zeilen}
            />
          </div>
        ))}

        <div
          style={{
            borderTop: '1px solid var(--w-linia)',
            marginTop: '1.75rem',
            paddingTop: '1.5rem',
            display: 'grid',
            gap: '0.9rem',
          }}
        >
          <Absatz style={{ marginBottom: 0 }}>
            <strong>PDF-Vorlage für Ihren nächsten Vertrag &amp; persönlicher Übergabe-Check:</strong>{' '}
            Prüfen Sie den Vertragsentwurf Ihrer neuen Agentur vorab mit unserer druckbaren PDF-Checkliste oder buchen Sie unseren kostenfreien 30-Minuten-Termin auf Ihren Konten.
          </Absatz>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {maWersjeDe('/narzedzia/umowa-na-pozycjonowanie') && (
              <Link href="/narzedzia/umowa-na-pozycjonowanie" className="btn btn-secondary">
                SEO Vertrag Checkliste (PDF-Download)
              </Link>
            )}
            <a href="#kontakt" className="btn btn-primary" data-cta="de_wechsel_checkliste" data-plan="przeglad-agencji">
              Kostenloser Check nach Ihrer bisherigen Agentur (30 Min.)
            </a>
          </div>
        </div>
      </Abschnitt>

      <Abschnitt titel="Kostenloser Check nach Ihrer bisherigen Agentur (30 Min.)" id="kostenloser-check">
        <Absatz>
          In 30 Minuten per Video-Call gehen wir gemeinsam mit Ihnen auf Ihren eigenen Konten durch die wichtigsten Übergabepunkte: Wer hält die primäre Inhaberschaft in Google Search Console, GA4, Tag Manager und Google Unternehmensprofil, welche Backlinks und Fachtexte bleiben dauerhaft bestehen und wie entwickeln sich Klicks und Positionen im 16-Monats-Verlauf? Sie erhalten direkt im Anschluss eine priorisierte Sicherungsliste vor Ihrer Kündigung - unverbindlich, ohne Verkaufsgespräch und ohne juristische Vertragsbewertung. Deckt der Kurz-Check tiefere technische Altlasten auf, startet ein vollständiges{' '}
          {maWersjeDe('/audyt-seo') ? <Link href="/audyt-seo" style={LINK}>SEO Audit</Link> : 'SEO Audit'}{' '}
          ab {e(PREISE.audit)} netto.
        </Absatz>
        <Absatz>
          Bei uns selbst gibt es keine Ausstiegshürden: flexibler Monatsvertrag in SEO Standard (ab {e(PREISE.standard)} netto/Monat) und SEO Premium ({e(PREISE.premium)} netto/Monat), Kündigung per E-Mail ohne Ausstiegsgebühr, volle Kontenhoheit auf Ihrem Firmennamen sowie jederzeitiger Export aller Linklisten und Berichte im Kundenportal. Lesen Sie unsere{' '}
          {maWersjeDe('/cennik-pozycjonowania') ? (
            <Link href={{ pathname: '/cennik-pozycjonowania', hash: 'faire-vertraege' }} style={LINK}>
              sechs Grundsätze für faire Verträge
            </Link>
          ) : (
            'sechs Grundsätze für faire Verträge'
          )}
          .
        </Absatz>
        <Absatz style={{ marginBottom: '1.25rem' }}>
          Sie holen gerade Vergleichsangebote für die Nachfolge ein? Nutzen Sie unseren Einkaufsleitfaden{' '}
          {maWersjeDe('/porownania/jak-wybrac-agencje-seo') && (
            <>
              <Link href="/porownania/jak-wybrac-agencje-seo" style={LINK}>
                SEO Agentur finden: 12 Fragen vor der Unterschrift
              </Link>
              {', '}
            </>
          )}
          {maWersjeDe('/narzedzia/zapytanie-ofertowe-seo') && (
            <>
              die kostenlose{' '}
              <Link href="/narzedzia/zapytanie-ofertowe-seo" style={LINK}>
                SEO Ausschreibung Vorlage (RFP als PDF)
              </Link>{' '}
            </>
          )}
          {maWersjeDe('/narzedzia/raport-seo') && (
            <>
              sowie unsere{' '}
              <Link href="/narzedzia/raport-seo" style={LINK}>
                SEO Report Vorlage als PDF
              </Link>
            </>
          )}
          .
        </Absatz>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <a href="#kontakt" className="btn btn-primary" data-cta="de_wechsel_termin" data-plan="przeglad-agencji">
            Kostenlosen 30-Minuten-Check buchen
          </a>
          <a href={PANEL_DEMO_URL} className="btn btn-secondary" rel="noopener" data-cta="de_wechsel_demo">
            Live-Demo des Kundenportals ansehen
          </a>
        </div>
      </Abschnitt>

      <Faq eintraege={WECHSEL_FAQ_DE} titel="Häufige Fragen zum Wechsel der SEO-Agentur" id="faq" />

      <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
        <ZrodlaDe zrodla={WECHSEL_QUELLEN_DE} />
      </div>
    </Seite>
  );
}
