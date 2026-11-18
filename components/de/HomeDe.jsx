import Image from 'next/image';
import { Seite, Hero, Abschnitt, Absatz, Liste, Karten, Preise, Referenzen, CtaZeile, Faq } from './UslugiBausteine';
import { Reveal } from '@/components/ScrollReveal';
import { HOME_LEAD, HOME_LEISTUNGEN, HOME_VORTEILE, HOME_SCHRITTE, HOME_FAQ } from '@/lib/de/home';
import { REFERENZEN } from '@/lib/de/referenzen';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';

export default function HomeDe() {
  const w = wpisDe('/');
  const leistungen = HOME_LEISTUNGEN.filter((l) => maWersjeDe(l.schluessel)).map((l) => ({ ...l, href: l.schluessel }));
  return (
    <>
      <Seite krumen={null}>
        <Hero
          kicker="AI SEO COMPANY · Warschau"
          h1={w.h1}
          lead={HOME_LEAD}
          beweis="✓ Monatsvertrag ohne lange Bindung · ✓ Kundenportal ab Tag 1 · ✓ Website im Paket inklusive (Booster Pack)"
          cta="Angebot anfragen"
        />
        <Reveal>
          <ul aria-label="Kunden und Projekte" style={{ listStyle: 'none', margin: '0 auto 70px', padding: '0 16px', maxWidth: '980px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1.5rem 3rem', opacity: 0.8 }}>
            {REFERENZEN.map((r) => (
              <li key={r.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Image unoptimized src={r.logo} alt={r.name} width={r.logoW} height={r.logoH} style={{ height: 'auto', width: 'auto', maxHeight: '32px', maxWidth: '150px', objectFit: 'contain', filter: 'grayscale(1)' }} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Karten id="uslugi" titel="Unsere Leistungen" untertitel="SEO-Strategien, die Marken in Google und in KI-Antworten sichtbar machen." items={leistungen} />

        <Abschnitt titel="Warum AI SEO COMPANY" id="why-us" tag="Arbeitsweise">
          <Absatz>Wir bauen Lösungen auf Analysedaten und auf dem Wissen darüber, wie Kunden Kaufentscheidungen treffen. Als KI SEO Agentur aus Warschau führen wir SEO, Analytik und Content in einem Team, sodass nichts losgelöst vom Rest optimiert wird.</Absatz>
          <Liste punkte={HOME_VORTEILE} />
        </Abschnitt>

        <Referenzen id="portfolio" titel="Referenzen mit Messwerten" />

        <CtaZeile />

        <Preise id="cennik" titel="Transparente Pakete ohne versteckte Kosten" />

        <Karten titel="Unser Vorgehen" untertitel="Von der Analyse bis zur Messung in Google und in KI-Antworten." items={HOME_SCHRITTE} spalten={240} />

        <Faq eintraege={HOME_FAQ} titel="Häufige Fragen zur Zusammenarbeit" />
      </Seite>
    </>
  );
}
