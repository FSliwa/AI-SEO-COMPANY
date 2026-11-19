import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import HeroKlienci from '@/components/HeroKlienci';
import { Abschnitt, Absatz, Liste, Karten, Preise, Referenzen, CtaZeile, Faq } from './UslugiBausteine';
import { HOME_LEISTUNGEN, HOME_VORTEILE, HOME_SCHRITTE, HOME_FAQ } from '@/lib/de/home';
import { WSTEP_OFERTY } from '@/lib/wstepOferty';
import { maWersjeDe } from '@/lib/stronyDe';

export default function HomeDe() {
  const leistungen = HOME_LEISTUNGEN.filter((l) => maWersjeDe(l.schluessel)).map((l) => ({ ...l, href: l.schluessel }));
  return (
    <>
      <Header />
      {/* 18.11.2026 (scalenie): ta sama kompozycja hero co PL/EN (components/Hero.jsx, teksty DE w lib/heroNarzedzia.js, 4 kafle z istniejaca strona DE),
          pasek klientow (HeroKlienci) na pasie mgly; dalej sekcje DE bez bloga i panelu. */}
      <main>
        <Hero locale="de" />
        <div className="gory-oferta" data-kursor="obraz" data-petla="">
          <div className="styk-mgla" aria-hidden="true"><span /><span /></div>
          <div className="chmury-dryf" aria-hidden="true"><span /><span /></div>
          <HeroKlienci />
        </div>
        <div style={{ paddingTop: '70px', color: 'var(--color-text-main)', overflowX: 'hidden' }}>

        <Karten id="uslugi" titel="Unsere Leistungen" untertitel="SEO-Strategien, die Marken in Google und in KI-Antworten sichtbar machen." einleitung={WSTEP_OFERTY.de} items={leistungen} />

        <Abschnitt titel="Warum AI SEO COMPANY" id="why-us" tag="Arbeitsweise">
          <Absatz>Wir bauen Lösungen auf Analysedaten und auf dem Wissen darüber, wie Kunden Kaufentscheidungen treffen. Als KI SEO Agentur aus Warschau führen wir SEO, Analytik und Content in einem Team, sodass nichts losgelöst vom Rest optimiert wird.</Absatz>
          <Liste punkte={HOME_VORTEILE} />
        </Abschnitt>

        <Referenzen id="portfolio" titel="Referenzen mit Messwerten" />

        <CtaZeile />

        <Preise id="cennik" titel="Transparente Pakete ohne versteckte Kosten" />

        <Karten titel="Unser Vorgehen" untertitel="Von der Analyse bis zur Messung in Google und in KI-Antworten." items={HOME_SCHRITTE} spalten={240} />

        <Faq eintraege={HOME_FAQ} titel="Häufige Fragen zur Zusammenarbeit" />
        </div>
        <Contact isMainContent={true} />
      </main>
      <Footer />
    </>
  );
}
