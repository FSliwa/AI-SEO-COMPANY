import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Karten, Preise, Referenzen, CtaZeile, Faq, LINK } from './UslugiBausteine';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from '@/i18n/routing';
import { B2B_SAEULEN, B2B_SCHRITTE, B2B_FAQ } from '@/lib/de/seoFuerUnternehmen';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';

export default function SeoFuerUnternehmenDe() {
  const w = wpisDe('/pozycjonowanie-stron-internetowych');
  return (
    <>
      <ServiceSchema variant="pozycjonowanie" />
      <Seite krumen="SEO für Unternehmen">
        <Hero
          kicker="B2B SEO"
          h1={w.h1}
          lead="B2B SEO bei AI SEO COMPANY: Wir sind eine SEO Agentur für Unternehmen, deren Kunden lange recherchieren, bevor sie sich melden. Technischer Audit, Inhalte und Links für B2B, Monatsvertrag ohne lange Bindung. Wir berichten Anfragen und Umsatzbezug, nicht nur Positionen."
          beweis="✓ Google Unternehmensprofil im Preis · ✓ Monatsbericht · ✓ Antwort in 24 Stunden an Werktagen"
          cta="Kostenloses Angebot anfordern"
        />
        <Karten titel="Was B2B SEO bei uns leistet" untertitel="Die Mechanismen, die das Wachstum Ihres Geschäfts in der Google-Suche antreiben." items={B2B_SAEULEN} spalten={260} />
        <Karten szklo titel="So arbeiten wir" untertitel="Eine Wachstumsstrategie in drei Schritten, gestützt auf belastbare Analysedaten." items={B2B_SCHRITTE} />
        <CtaZeile />

        <Abschnitt titel="Content und Strategie im B2B-Marketing" id="strategie">
          <Absatz>Wir arbeiten mit Unternehmen, deren Kunden lange recherchieren, bevor sie sich überhaupt melden. Deshalb beginnt jede Zusammenarbeit mit der Frage, welche Suchanfragen diese Kunden tatsächlich zu Ihnen führen. Inhalte planen wir für eine bestimmte Phase dieses Wegs und nicht, weil „man veröffentlichen muss“: Jeder Text hat eine Aufgabe, und wir prüfen, ob er sie erfüllt.</Absatz>
          <Absatz>SEO, Analytik und Marketing betreut ein Team, sodass nichts losgelöst vom Rest optimiert wird. Wir arbeiten auch als Zulieferer für Marketingabteilungen und andere Agenturen, denen Kapazität fehlt.</Absatz>
          <Absatz style={{ marginBottom: 0 }}>Als SEO Agentur für B2B mit Kundenportal begleiten wir Ihr Projekt langfristig: mit gründlicher technischer Analyse und fortlaufenden Maßnahmen, die Ihre Positionen verbessern.</Absatz>
        </Abschnitt>

        <Abschnitt titel="SEO für Unternehmen: Von welchen Faktoren die Wirkung abhängt" id="wirkung">
          <Absatz>Wirksames SEO für Unternehmenswebsites beruht auf drei Dingen: einer Website, die Google schnell indexiert, Inhalten, die die Fragen Ihrer Kunden beantworten, und Links von Websites mit echtem Traffic. Wir beginnen mit einem {maWersjeDe('/audyt-seo') ? <Link href="/audyt-seo" style={LINK}>SEO Audit</Link> : 'SEO Audit'} und der Liste der Keywords, die Anfragen bringen. Im Kundenportal sehen Sie jede Woche, wie sich die Arbeit in Positionen und Anfragen niederschlägt.</Absatz>
          <Unterueberschrift>SEO in Google und in KI-Antworten</Unterueberschrift>
          <Absatz>Dieselben Grundlagen entscheiden, ob ChatGPT oder die KI-Antworten in Google Ihr Unternehmen nennen: Die Modelle stellen ihre Antworten aus Seiten zusammen, die gut ranken und Fragen klar beantworten. Deshalb verbinden wir SEO in Google mit der Messung der Sichtbarkeit in KI-Antworten. {maWersjeDe('/pozycjonowanie-w-ai') ? <>Umfang und Preise beschreiben wir auf der Seite <Link href="/pozycjonowanie-w-ai" style={LINK}>Generative Engine Optimization (GEO)</Link>.</> : null}</Absatz>
          <Unterueberschrift>SEO-Leistungen für B2B, CMS-Systeme und lokale Unternehmen</Unterueberschrift>
          <Absatz>Je nach bestehendem System setzen wir direkt im Code oder im CMS an: neben individuell programmierten Next.js-Seiten betreuen wir spezialisiert {maWersjeDe('/pozycjonowanie-wordpress') ? <Link href="/pozycjonowanie-wordpress" style={LINK}>WordPress SEO für Unternehmen</Link> : 'WordPress SEO'} (Plugin-Bereinigung, Ladezeit und Archiv-Indexierung) sowie {maWersjeDe('/pozycjonowanie-webflow') ? <Link href="/pozycjonowanie-webflow" style={LINK}>Webflow SEO für B2B &amp; SaaS</Link> : 'Webflow SEO'} (CMS-Kollektionen und sauberer hreflang).</Absatz>
          <Absatz>Wir arbeiten in zwei Modellen: für B2B-Unternehmen, die überregional verkaufen, und für Dienstleister, die ihre Kunden in der eigenen Stadt gewinnen. Im zweiten Fall verbinden wir die Website mit dem Google Unternehmensprofil, Bewertungen und Maps. {maWersjeDe('/cennik-pozycjonowania') ? <>Pakete und Preise finden Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>.</> : null}</Absatz>
          <Absatz style={{ marginBottom: 0 }}>
            Für vier Branchen mit verifizierten 90-Tage-Messreihen aus der Google Search Console dokumentieren wir unsere Vorgehensweise im Detail:{' '}
            {maWersjeDe('/seo-dla-firm-budowlanych') && <><Link href="/seo-dla-firm-budowlanych" style={LINK}>SEO für Bauunternehmen &amp; Handwerk</Link>, </>}
            {maWersjeDe('/seo-dla-firm-produkcyjnych-b2b') && <><Link href="/seo-dla-firm-produkcyjnych-b2b" style={LINK}>Industrie-SEO für Hersteller &amp; CNC</Link>, </>}
            {maWersjeDe('/seo-dla-restauracji-i-gastronomii') && <><Link href="/seo-dla-restauracji-i-gastronomii" style={LINK}>SEO für Restaurants &amp; Gastronomie</Link> sowie </>}
            {maWersjeDe('/seo-dla-firm-szkoleniowych-i-iso') && <><Link href="/seo-dla-firm-szkoleniowych-i-iso" style={LINK}>SEO für Schulungsanbieter &amp; ISO-Beratung</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Referenzen ids={['staniax', 'tql']} titel="B2B SEO in der Praxis" />

        <Preise />
        <Faq eintraege={B2B_FAQ} titel="Häufige Fragen zu B2B SEO" />
      </Seite>
    </>
  );
}
