// Strona aplikacji D4: Walidator i Kreator Grafu Encji Marki JSON-LD (@graph + sameAs)
// PL: /narzedzia/walidator-grafu-encji-json-ld | EN: /en/tools/entity-graph-json-ld-validator

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { cena } from '@/lib/narzedziaLiczby';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import NawBok from '@/components/narzedzia/NawBok';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import Sekcja from '@/components/narzedzia/Sekcja';
import Poradniki from '@/components/narzedzia/Poradniki';
import PozostaleNarzedzia from '@/components/narzedzia/PozostaleNarzedzia';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import GrafEncjiClient from './GrafEncjiClient';

const SLUG = 'walidator-grafu-encji-json-ld';
const URL_PL = `${BASE}/narzedzia/walidator-grafu-encji-json-ld`;
const URL_EN = `${BASE}/en/tools/entity-graph-json-ld-validator`;

const ZRODLA_PL = [
  { url: 'https://www.w3.org/TR/json-ld11/', nazwa: 'W3C Recommendation: JSON-LD 1.1 - identyfikatory węzłów @id oraz kontener @graph', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/organization', nazwa: 'Google Search Central: Dane strukturalne Organization (sameAs, vatID, taxID, iso6523Code)', data: '2026-11-22' },
  { url: 'https://schema.org/Organization', nazwa: 'Schema.org: Specyfikacja typu Organization i właściwości powiązań encji', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Wprowadzenie do danych strukturalnych w wyszukiwarce Google', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://www.w3.org/TR/json-ld11/', nazwa: 'W3C Recommendation: JSON-LD 1.1 - Node Identifiers (@id) and Named Graphs (@graph)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/organization', nazwa: 'Google Search Central: Organization structured data (sameAs, vatID, taxID, iso6523Code)', data: '2026-11-22' },
  { url: 'https://schema.org/Organization', nazwa: 'Schema.org: Organization type specification and entity properties', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Introduction to structured data markup in Google Search', data: '2026-11-22' },
];

const FAQ_PL = [
  {
    id: 'czym-rozni-sie-graph-od-osobnych-skryptow',
    question: 'Czym różni się połączony blok @graph od kilku osobnych znaczników JSON-LD?',
    answer: 'Gdy wtyczki CMS generują osobno obiekt <code>WebSite</code>, osobno <code>Organization</code> i osobno <code>Article</code> bez wspólnych identyfikatorów <code>@id</code> (np. <code>https://domena.pl/#organization</code>), robot widzi niepowiązane fragmenty tekstu. Struktura <code>@graph</code> ze spójnymi kotwicami <code>@id</code> jawnie łączy stronę główną, autora, lokalny oddział i usługi z jedną konkretną spółką.',
  },
  {
    id: 'po-co-wpisywac-nip-krs-i-vat-w-schema',
    question: 'Dlaczego warto podawać NIP, KRS i numer VAT-UE w danych strukturalnych Organization?',
    answer: 'W internecie istnieją dziesiątki firm o podobnych nazwach handlowych. Oficjalne właściwości <code>taxID</code> (NIP), <code>vatID</code> (VAT-UE) oraz wpisy rejestrowe działają jak unikalny klucz główny w bazie danych - pozwalają Google Knowledge Graph oraz modelom językowym odróżnić Twoją spółkę od zbieżnych nazw w innych miastach i krajach.',
  },
  {
    id: 'jakie-profile-dodac-do-sameas',
    question: 'Jakie adresy URL najlepiej umieścić w tablicy sameAs?',
    answer: 'W tablicy <code>sameAs</code> umieszczaj wyłącznie oficjalne, publiczne profile potwierdzające tożsamość tej samej encji: zweryfikowaną Wizytówkę Google (Maps CID), firmowy LinkedIn, katalogi recenzji B2B (Clutch, Sortlist, GoodFirms, Trustpilot), oficjalne konto GitHub, Crunchbase, Wikidata oraz wpisy w oficjalnych rejestrach gospodarczych.',
  },
  {
    id: 'czy-json-ld-gwarantuje-rich-snippets',
    question: 'Czy wdrożenie grafu encji @graph gwarantuje gwiazdki w wynikach Google?',
    answer: 'Nie - i Google wyraźnie rozdziela te dwie kwestie. Rozszerzone wyniki ( np. FAQ lub okruszki BreadcrumbList) podlegają osobnym zasadom widoczności w SERP, natomiast głównym celem grafu <code>Organization + Person + Service + sameAs</code> jest jednoznaczne zrozumienie tożsamości, specjalizacji i wiarygodności E-E-A-T firmy przez wyszukiwarki oraz silniki AI.',
  },
  {
    id: 'gdzie-wkleic-wygenerowany-kod-graph',
    question: 'Na której podstronie wkleić wygenerowany kod JSON-LD?',
    answer: 'Rdzeń tożsamości spółki (<code>Organization</code> oraz <code>WebSite</code> ze stałymi <code>@id</code>) najlepiej umieścić na stronie głównej, natomiast na podstronach <code>/o-nas</code>, <code>/kontakt</code> i stronach usługowych odwoływać się do tego samego identyfikatora <code>{ &quot;@id&quot;: &quot;https://www.twojadomena.pl/#organization&quot; }</code> w polach <code>publisher</code>, <code>worksFor</code> i <code>provider</code>.',
  },
];

const FAQ_EN = [
  {
    id: 'why-connected-graph-beats-isolated-jsonld',
    question: 'Why does a connected @graph outperform separate CMS JSON-LD snippets?',
    answer: 'Most CMS plugins inject isolated <code>WebSite</code>, <code>Organization</code> and <code>Service</code> scripts without shared <code>@id</code> URIs. By assigning stable identifiers (such as <code>https://yourdomain.com/#organization</code>) inside a unified <code>@graph</code>, you explicitly connect your brand, founders, offices and services into a single machine-readable entity graph.',
  },
  {
    id: 'why-include-vatid-and-taxid',
    question: 'Why should B2B companies include vatID, taxID and registry numbers in Organization schema?',
    answer: 'Brand names frequently collide across countries and industries. Official properties like <code>vatID</code>, <code>taxID</code> and <code>iso6523Code</code> / LEI act as unambiguous primary keys for Google’s Knowledge Graph and LLM entity resolution.',
  },
  {
    id: 'best-profiles-for-sameas',
    question: 'Which external profiles belong inside the sameAs array?',
    answer: 'Include authoritative profiles that uniquely represent your company: verified LinkedIn company page, Clutch, Sortlist, GoodFirms, Google Maps / Business Profile link, Crunchbase, Wikidata, GitHub organization and official commercial registry pages.',
  },
  {
    id: 'does-entity-schema-guarantee-rich-results',
    question: 'Does Organization & Person @graph markup create visual star ratings in Google?',
    answer: 'No. Google restricts visual review stars to specific schema types and forbids self-serving ratings on Organization/LocalBusiness pages. The value of an entity <code>@graph</code> is semantic disambiguation, Knowledge Panel accuracy and higher confidence when AI engines verify your E-E-A-T credentials.',
  },
  {
    id: 'where-to-deploy-generated-jsonld',
    question: 'Where should I place the generated @graph JSON-LD script?',
    answer: 'Deploy the core <code>Organization</code> and <code>WebSite</code> graph on your homepage, and reference the exact same <code>@id</code> URI (<code>https://www.yourdomain.com/#organization</code>) inside <code>provider</code>, <code>publisher</code> and <code>worksFor</code> across service and author subpages.',
  },
];

export function GrafEncjiStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'JSON-LD Brand Entity Graph Validator & @graph Generator'
    : 'Walidator i kreator grafu encji marki JSON-LD (@graph + sameAs)');
  const okruszek = wpisRejestru?.okruszek || (en ? 'Entity Graph JSON-LD Validator' : 'Walidator grafu encji JSON-LD');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'JSON-LD Brand Entity Graph Validator & @graph Builder' : 'Walidator i kreator grafu encji marki JSON-LD (@graph + sameAs)'}
        description={en
          ? 'Free Entity SEO & Knowledge Graph validator: crawls your key pages, renders an interactive SVG diagram of your JSON-LD @graph nodes, checks sameAs profiles and registry IDs (VAT, Tax ID, LEI), and generates a connected schema.org @graph.'
          : 'Darmowy walidator Entity SEO i Knowledge Graph: skanuje kluczowe podstrony, rysuje interaktywny graf SVG węzłów JSON-LD @graph, sprawdza profile sameAs oraz numery NIP/KRS/VAT-UE i generuje gotowy szablon schema.org.'}
        url={en ? URL_EN : URL_PL}
        category="DeveloperApplication"
        featureList={en
          ? [
              'Interactive SVG visualization of Organization, WebSite, Person, LocalBusiness & Service nodes',
              'Cross-page @id reference and relationship edge validation',
              'Audit of sameAs authority profiles and official company registry identifiers',
              '1-click unified @graph JSON-LD generator ready to paste into your site',
            ]
          : [
              'Interaktywny diagram SVG węzłów Organization, WebSite, Person, LocalBusiness i Service',
              'Weryfikacja spójności kotwic @id oraz relacji między podstronami',
              ' Kontrola profili zaufania sameAs oraz identyfikatorów rejestrowych (NIP, KRS, VAT-UE)',
              'Kreator połączonego bloku @graph JSON-LD gotowego do skopiowania 1 kliknięciem',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="autorytet" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free Entity SEO & Knowledge Graph Tool' : 'Darmowe narzędzie Entity SEO i Knowledge Graph'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'See your website the way Google’s Knowledge Graph and AI models read it: visualize your JSON-LD @graph nodes in SVG, uncover missing @id and sameAs links, and copy a unified entity schema in one click.'
              : 'Zobacz swoją firmę oczami Google Knowledge Graph i modeli AI: zwizualizuj węzły JSON-LD na interaktywnym grafie SVG, wykryj brakujące kotwice @id i sameAs oraz skopiuj spójny kod @graph jednym kliknięciem.'}
          </p>

          <GrafEncjiClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Modern Entity SEO connects isolated schema snippets into a single JSON-LD @graph anchored by permanent @id URIs (such as #organization, #website and #founder), official company registry IDs (vatID, taxID) and authoritative sameAs profiles (Clutch, LinkedIn, Google Maps, GitHub). This removes ambiguity for both Google’s Knowledge Graph and generative AI engines.'
                : 'Nowoczesne Entity SEO zastępuje rozproszone wycinki Schema jednym połączonym grafem JSON-LD (@graph) spiętym stałymi identyfikatorami @id (#organization, #website, #person), numerami rejestrowymi spółki (NIP, KRS, VAT-UE) oraz zewnętrznymi profilami zaufania sameAs (Wizytówka Google, LinkedIn, Clutch, GitHub). Dzięki temu Google i modele AI bezbłędnie rozpoznają podmiot stojący za stroną.'}
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      '0-100 Entity Graph Coherence score across your homepage, About and Contact pages',
                      'Interactive SVG node-and-edge diagram showing @id links between Organization, Person, WebSite and Service',
                      'Registry & sameAs matrix checking VAT-ID, Tax ID, Company No. and external profiles',
                      'Complete copy-paste @graph JSON-LD template tailored to your domain',
                    ]
                  : [
                      'Ocena spójności grafu encji 0-100 na podstawie strony głównej, O nas i Kontaktu',
                      'Interaktywny diagram SVG pokazujący połączenia @id między Organization, Person, WebSite i Service',
                      ' Zestawienie identyfikatorów rejestrowych (NIP, KRS, VAT-UE) oraz wykrytych linków sameAs',
                      'Gotowy do wklejenia, połączony szablon @graph JSON-LD wygenerowany dla Twojej domeny',
                    ]}
                przypis={en
                  ? 'Pair with our static JSON-LD reference library for Article, Product and BreadcrumbList schemas.'
                  : 'Wszystkie wyniki i wygenerowany kod JSON-LD są dostępne natychmiast, bez bramki e-mail.'}
              />

              {en ? (
                <>
                  <Sekcja id="isolated-schema-vs-connected-entity-graph" tytul="Isolated CMS Plugins vs Connected @graph Architecture">
                    <CompareTable
                      id="table-entity-graph"
                      caption="How entity graph engineering upgrades standard plugin markup"
                      columns={[
                        { key: 'aspect', label: 'Schema Dimension' },
                        { key: 'defaultCms', label: 'Default CMS Plugin Output' },
                        { key: 'entityGraph', label: 'Connected @graph Standard' },
                      ]}
                      rows={[
                        { id: 'ids', aspect: 'Node Identity (@id)', defaultCms: 'Anonymous objects duplicated on every URL', entityGraph: 'Single canonical #organization URI referenced sitewide' },
                        { id: 'eeat', aspect: 'Author & Founder Link', defaultCms: 'Plain text author string without entity link', entityGraph: 'Person node linked via worksFor + expert sameAs URLs' },
                        { id: 'registry', aspect: 'Legal Disambiguation', defaultCms: 'Brand name only (prone to homonym collisions)', entityGraph: 'Explicit vatID, taxID, address & commercial registry' },
                        { id: 'sameas', aspect: 'External Corroboration', defaultCms: 'Empty or generic social icon links', entityGraph: 'Verified Clutch, Sortlist, Google Maps CID, LinkedIn & GitHub' },
                      ]}
                      przypis="Aligned with W3C JSON-LD 1.1 and Google Search Central Organization guidelines."
                    />
                    <p style={s.akapit}>
                      Need additional copy-paste templates for articles, FAQs and local branches? Check our{' '}
                      <Link href="/narzedzia/dane-strukturalne-json-ld" style={s.podkreslenie}>7 schema.org JSON-LD templates</Link>{' '}
                      and our{' '}
                      <Link href="/narzedzia/checklista-e-e-a-t" style={s.podkreslenie}>36-point E-E-A-T checklist</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="corroborating-sameas-off-page" tytul="Why sameAs Needs Off-Page Authority to Move AI Citations">
                    <p style={s.akapit}>
                      Adding <code>sameAs</code> in JSON-LD tells crawlers where your brand lives across the web, while independent reviews and editorial mentions convince LLMs to recommend you. Explore how we combine structured data with off-page signals in{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>AI search optimization (GEO)</Link>,{' '}
                      <Link href="/link-building" style={s.podkreslenie}>B2B link building</Link>{' '}
                      and{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>monthly SEO retainers</Link>{' '}
                      (from {cena('seoStandard', 'en')} net/mo).
                    </p>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="izolowane-wtyczki-a-polaczony-graf-encji" tytul="Izolowane wtyczki CMS kontra spójny graf encji @graph">
                    <CompareTable
                      id="tabela-graf-encji"
                      caption="Różnica między domyślnym kodem z wtyczki a inżynierią Entity SEO"
                      columns={[
                        { key: 'wymiar', label: 'Element architektury' },
                        { key: 'wtyczka', label: 'Domyślna wtyczka w CMS' },
                        { key: 'graf', label: 'Połączony standard @graph' },
                      ]}
                      rows={[
                        { id: 'kotwice', wymiar: 'Tożsamość węzła (@id)', wtyczka: 'Anonimowe obiekty powielane osobno na każdej podstronie', graf: 'Jedna stała kotwica #organization spajająca cały serwis' },
                        { id: 'autor', wymiar: 'Ekspert i zarząd (E-E-A-T)', wtyczka: 'Zwykły podpis tekstowy bez powiązania z firmą', graf: 'Węzeł Person połączony relacją worksFor i profilami eksperta' },
                        { id: 'rejestry', wymiar: 'Weryfikacja prawna', wtyczka: 'Sama nazwa skrócona (ryzyko pomyłki z inną firmą)', graf: 'Jawny NIP (taxID), VAT-UE (vatID), KRS oraz pełny adres' },
                        { id: 'sameas', wymiar: 'Potwierdzenie zewnętrzne', wtyczka: 'Brak lub przypadkowe ikony z szablonu', graf: 'Spójne linki sameAs: Mapy Google, Clutch, Sortlist, LinkedIn, GitHub' },
                      ]}
                      przypis="Zgodnie ze specyfikacją W3C JSON-LD 1.1 oraz wytycznymi Google Search Central dla typu Organization."
                    />
                    <p style={s.akapit}>
                      Szukasz gotowych wzorów również dla artykułów blogowych, produktów i FAQ? Zobacz nasze{' '}
                      <Link href="/narzedzia/dane-strukturalne-json-ld" style={s.podkreslenie}>7 wzorów danych strukturalnych JSON-LD</Link>{' '}
                      oraz{' '}
                      <Link href="/narzedzia/checklista-e-e-a-t" style={s.podkreslenie}>checklistę 36 punktów E-E-A-T</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="jak-wzmocnic-encje-poza-strona" tytul="Jak domknąć graf encji sygnałami poza stroną (Off-Page + GEO)">
                    <p style={s.akapit}>
                      Kod <code>JSON-LD</code> na stronie to Twoja własna deklaracja, natomiast modele ChatGPT, Perplexity i Gemini weryfikują ją w niezależnych źródłach zewnętrznych. Zobacz, jak łączymy dane strukturalne ze zdobywaniem wzmianek w usługach{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>pozycjonowanie w AI (GEO)</Link>{' '}
                      oraz{' '}
                      <Link href="/link-building" style={s.podkreslenie}>link building B2B</Link>{' '}
                      (sprawdź pełny{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>, od {cena('seoStandard')} netto/mies.).
                    </p>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/walidator-grafu-encji-json-ld" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/walidator-grafu-encji-json-ld" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: JSON-LD @graph, @id & Entity SEO' : 'Najczęstsze pytania o graf encji JSON-LD (@graph), @id oraz sameAs'}
        sectionId="pytania"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={zrodla} {...(en ? { en: true } : {})} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default GrafEncjiStrona;
