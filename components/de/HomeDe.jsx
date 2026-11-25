import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import HeroKlienci from '@/components/HeroKlienci';
import WhyUs from '@/components/WhyUs';
import Results from '@/components/Results';
import DarmoweNarzedzia from '@/components/DarmoweNarzedzia';
import PanelShowcase from '@/components/PanelShowcase';
import PasekCtaMobile from '@/components/PasekCtaMobile';
import { Abschnitt, Absatz, Liste, Karten, Preise, Referenzen, Faq } from './UslugiBausteine';
import { HOME_LEISTUNGEN, HOME_VORTEILE, HOME_SCHRITTE, HOME_FAQ } from '@/lib/de/home';
import { WSTEP_OFERTY } from '@/lib/wstepOferty';
import { maWersjeDe } from '@/lib/stronyDe';

export default function HomeDe() {
  const leistungen = HOME_LEISTUNGEN.filter((l) => maWersjeDe(l.schluessel)).map((l) => ({ ...l, href: l.schluessel }));
  return (
    <>
      <Header />
      {/* 18.11.2026 + 22.11.2026: pelna kompozycja pasma gor jak na PL/EN (.gory-oferta -> #why-us -> wyniki -> narzedzia),
          z zachowaniem 100% niemieckich fraz i sekcji (HOME_VORTEILE w #arbeitsweise). */}
      <main style={{ overflowX: 'clip' }}>
        <Hero locale="de" />
        <div className="gory-oferta" data-kursor="obraz" data-petla="">
          <div className="styk-mgla" aria-hidden="true"><span /><span /></div>
          <div className="chmury-dryf" aria-hidden="true"><span /><span /></div>
          <HeroKlienci />
          <Karten id="uslugi" titel="Unsere Leistungen" untertitel="SEO-Strategien, die Marken in Google und in KI-Antworten sichtbar machen." einleitung={WSTEP_OFERTY.de} items={leistungen} />
        </div>

        <WhyUs isMainContent={true} />

        <div style={{ color: 'var(--color-text-main)', overflowX: 'clip' }}>
          <Abschnitt titel="Warum AI SEO COMPANY" id="arbeitsweise" tag="Arbeitsweise">
            <Absatz>Wir bauen Lösungen auf Analysedaten und auf dem Wissen darüber, wie Kunden Kaufentscheidungen treffen. Als KI SEO Agentur aus Warschau führen wir SEO, Analytik und Content in einem Team, sodass nichts losgelöst vom Rest optimiert wird.</Absatz>
            <Liste punkte={HOME_VORTEILE} />
          </Abschnitt>

          <Referenzen id="portfolio" titel="Referenzen mit Messwerten" />
        </div>

        <Results />

        <DarmoweNarzedzia locale="de" />

        <div style={{ color: 'var(--color-text-main)', overflowX: 'clip' }}>
          <Karten id="vorgehen" szklo titel="Unser Vorgehen" untertitel="Von der Analyse bis zur Messung in Google und in KI-Antworten." items={HOME_SCHRITTE} spalten={240} />

          <Preise id="cennik" titel="Transparente Pakete ohne versteckte Kosten" />
        </div>

        <PanelShowcase locale="de" />

        <div className="w-noc-panele" data-kursor="ciemne">
          <Faq
            eintraege={HOME_FAQ}
            titel="Häufige Fragen zur Zusammenarbeit"
            wariant="panel"
            stopkaLink={{
              href: '/porownania',
              label: 'SEO-Abrechnungsmodelle und Agentur-Alternativen im Vergleich',
            }}
          />
        </div>
        <Contact isMainContent={true} />
      </main>
      <Footer />
      <PasekCtaMobile />
    </>
  );
}
