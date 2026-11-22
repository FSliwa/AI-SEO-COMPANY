'use client';

// Strona usługi: link building (PL /link-building, EN /en/link-building-services). 18.11.2026.
// Wzorzec: components/WizytowkaClient.jsx (najnowszy wzorzec strony usługowej: Reveal, AnswerBox,
// CompareTable, Zrodla, AppleFaq, Contact). PL i EN w jednym pliku; EN przez useLocale().
//
// Oferta (tylko to, co sprzedajemy, wg kodu): link building jest w pakietach SEO. Standard: 2 linki
// miesięcznie, Premium: 4 linki miesięcznie (components/Pricing.jsx, components/PricingClient.jsx);
// większe programy digital PR wycenia się indywidualnie, a proces i metryki (audyt, zasób, outreach,
// publikacja, raport KPI) opisuje artykuł /blog/link-building-b2b-dla-marketerow-strategie-i-checklista
// (sekcja „Jak podchodzimy do link buildingu w AI SEO COMPANY”). Bez obietnic liczby linków ponad
// pakiet i bez obietnic pozycji. Metody (broker linków, katalogi masowe, PBN) nie są w ofercie.
// Odróżnienie od artykułu B2B: tu usługa, zakres, ceny i pomiar; metody i checklista są w artykule.

import { useLocale } from 'next-intl';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import { hrefJesliOpublikowana } from '@/lib/publikacja';

const SCIEZKA = '/link-building';
const DATA = '2026-11-18';

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=pl', nazwa: 'Google Search Central: Wskazówki dotyczące linków (linki jako sygnał, tekst linku)', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=pl', nazwa: 'Google Search Central: Zasady dotyczące spamu (spam linkowy, linki płatne)', data: '2026-11-18' },
];
const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable', nazwa: 'Google Search Central: SEO link best practices (links as a signal, anchor text)', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies (link spam, paid links)', data: '2026-11-18' },
];

const sekcja = { padding: 'clamp(2.5rem, 6vw, 4rem) 0 0' };
const kontener = { maxWidth: '850px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.65rem, 3.4vw, 2.25rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.035em', color: 'var(--w-tusz)', margin: '0 0 1.25rem', scrollMarginTop: '110px' };
const akapit = { fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--w-tusz-2)', margin: '0 0 1.1rem' };
const lista = { ...akapit, paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem' };
const link = { color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', boxShadow: 'none', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

export default function LinkBuildingClient({ faqData }) {
  const lang = useLocale();
  const en = lang === 'en';
  const ZRODLA = en ? ZRODLA_EN : ZRODLA_PL;
  const kontakt = hash('kontakt', lang);
  const idEl = (pl, enId) => (en ? enId : pl);
  // Reguła 6.0: link do strony spoza rejestru pozostaje bez <a>, dopóki strona nie jest opublikowana.
  const hrefPorownanie = hrefJesliOpublikowana('/porownania/pozycjonowanie-za-efekt-czy-abonament');
  const hrefAutorytet = hrefJesliOpublikowana('/narzedzia/autorytet-domeny');
  const hrefDlugo = en ? '/blog/how-long-does-seo-take' : null;

  const wierszePakiety = en
    ? [
        { id: 'cena', co: 'Price', standard: 'from €450 net a month', premium: '€590 net a month' },
        { id: 'linki', co: 'Links a month', standard: '2', premium: '4' },
        { id: 'tresci', co: 'Content pieces a month', standard: '2', premium: '4' },
        { id: 'frazy', co: 'Keywords', standard: 'up to 20', premium: 'up to 50' },
        { id: 'strategia', co: 'Link building strategy', standard: 'yes', premium: 'yes, with expert article expansion' },
        { id: 'umowa', co: 'Contract', standard: 'monthly, cancel at any time', premium: 'monthly, cancel at any time' },
      ]
    : [
        { id: 'cena', co: 'Cena', standard: 'od 1 900 zł netto miesięcznie', premium: '2 500 zł netto miesięcznie' },
        { id: 'linki', co: 'Linki miesięcznie', standard: '2', premium: '4' },
        { id: 'tresci', co: 'Treści miesięcznie', standard: '2', premium: '4' },
        { id: 'frazy', co: 'Frazy', standard: 'do 20', premium: 'do 50' },
        { id: 'strategia', co: 'Strategia link buildingu', standard: 'tak', premium: 'tak, z rozbudową artykułów eksperckich' },
        { id: 'umowa', co: 'Umowa', standard: 'miesięczna, rezygnacja w każdej chwili', premium: 'miesięczna, rezygnacja w każdej chwili' },
      ];

  const wierszeKryteria = en
    ? [
        { id: 'trafnosc', kryterium: 'Topical relevance', szukamy: 'A site from your industry or your customers’ world', unikamy: 'An unrelated general portal' },
        { id: 'ruch', kryterium: 'Traffic of the source', szukamy: 'Real traffic from search engines', unikamy: 'No traffic or artificial traffic' },
        { id: 'miejsce', kryterium: 'Placement', szukamy: 'In the body of an article, in context', unikamy: 'Footer, sidebar, link lists' },
        { id: 'kotwica', kryterium: 'Anchor text', szukamy: 'Natural, descriptive, relevant to the page it points to', unikamy: 'Mass exact-match anchors for commercial phrases' },
        { id: 'profil', kryterium: 'Profile of the source site', szukamy: 'Diverse, editorial', unikamy: 'PBN networks and link schemes' },
      ]
    : [
        { id: 'trafnosc', kryterium: 'Zgodność tematyczna', szukamy: 'Serwis z Twojej branży lub ze świata Twoich klientów', unikamy: 'Ogólny portal bez związku z tematem' },
        { id: 'ruch', kryterium: 'Ruch źródła', szukamy: 'Prawdziwy ruch z wyszukiwarek', unikamy: 'Brak ruchu albo ruch sztuczny' },
        { id: 'miejsce', kryterium: 'Miejsce linku', szukamy: 'W treści artykułu, w kontekście', unikamy: 'Stopka, pasek boczny, listy linków' },
        { id: 'kotwica', kryterium: 'Tekst linku', szukamy: 'Naturalny, opisowy, pasujący do strony docelowej', unikamy: 'Masowe kotwice w dokładnym brzmieniu frazy komercyjnej' },
        { id: 'profil', kryterium: 'Profil serwisu źródłowego', szukamy: 'Zróżnicowany, redakcyjny', unikamy: 'Sieci PBN i schematy wymiany linków' },
      ];

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '1rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {en ? 'SEO · Links' : 'SEO · Linki'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.04em', margin: '0 0 1.5rem', color: 'var(--w-tusz)' }}>
              {en ? 'Link building services: editorial links inside your SEO package' : 'Link building: pozyskiwanie linków do Twojej strony w pakiecie SEO'}
            </h1>
          </Reveal>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en
              ? 'Link building services are the work of earning links from other websites to yours: Google uses links as a signal of relevance and to find new pages. At AI SEO COMPANY link building is part of the SEO packages: 2 links a month in SEO Standard, from €450 net, and 4 links a month in SEO Premium, €590 net.'
              : 'Link building to pozyskiwanie linków z innych stron do Twojej: Google używa linków jako sygnału trafności i do znajdowania nowych stron. W AI SEO COMPANY link building wchodzi w pakiety SEO: 2 linki miesięcznie w SEO Standard, od 1 900 zł netto, i 4 linki miesięcznie w SEO Premium, 2 500 zł netto.'}
          </AnswerBox>

          <p style={akapit}>
            {en
              ? 'We do not sell links by the piece or in bulk. We build them as one part of SEO work, next to the audit, content and technical fixes, and larger digital PR programs are quoted individually. You see what was done in the client portal and in a monthly report.'
              : 'Nie sprzedajemy linków na sztuki ani hurtem. Budujemy je jako jedną z części pracy nad SEO, obok audytu, treści i poprawek technicznych, a większe programy digital PR wyceniamy indywidualnie. Co zrobiliśmy, widzisz w panelu klienta i w raporcie miesięcznym.'}
          </p>

          <Byline sciezka={SCIEZKA} data={DATA} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta="service_hero_link_building" data-plan="standard">
              {en ? 'Ask about link building in your package' : 'Zapytaj o link building w pakiecie'}
            </a>
            <a href={`#${idEl('pakiety', 'packages')}`} className="hero-btn-secondary" data-cta="service_hero_link_building_pakiety">
              {en ? 'See how many links you get' : 'Zobacz, ile linków dostajesz'}
            </a>
          </div>
        </div>
      </section>

      <section className="sekcja-kompakt" style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('zakres', 'scope')} style={h2Styl}>
            {en ? 'What link building services include at AI SEO COMPANY' : 'Co obejmuje link building w AI SEO COMPANY'}
          </h2>
          <p style={akapit}>
            {en
              ? 'Every link building program starts with the same five steps. None of them is buying links in PBN networks or mass directories, and we advise against both.'
              : 'Każdy program link buildingu zaczyna się od tych samych pięciu kroków. Żaden z nich nie polega na kupowaniu linków w sieciach PBN ani w katalogach masowych i odradzamy jedno i drugie.'}
          </p>
          {en ? (
            <ol style={{ ...lista, gap: '0.9rem' }}>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Audit and competitor analysis.</span> We check your current link profile, content gaps and the partner relationships that can be activated at once. It is the same review as in an <Link href="/audyt-seo" style={link}>SEO audit</Link>.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>A linkable asset.</span> A report, calculator or benchmark with data that an editor can quote with a source.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Outreach.</span> A personal approach to selected editorial boards and partners, not mass mailing.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Publication.</span> The link is placed in context and points to the page that should rank for the agreed keywords.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Monthly reporting.</span> New referring domains, the average DR of the new links and organic traffic on the pages we support.</li>
            </ol>
          ) : (
            <ol style={{ ...lista, gap: '0.9rem' }}>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Audyt i analiza konkurencji.</span> Sprawdzamy obecny profil linków, luki w treściach i relacje z partnerami, które można uruchomić od razu. To ten sam przegląd, co w <Link href="/audyt-seo" style={link}>audycie SEO</Link>.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Zasób wart linkowania.</span> Raport, kalkulator albo benchmark z danymi, które redakcja może zacytować ze źródłem.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Outreach.</span> Indywidualne podejście do wybranych redakcji i partnerów, a nie masowa wysyłka.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Publikacja.</span> Link w kontekście, prowadzący na podstronę, która ma rankować na uzgodnione frazy.</li>
              <li><span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>Raport miesięczny.</span> Nowe domeny odsyłające, średnie DR nowych linków i ruch organiczny na wspieranych podstronach.</li>
            </ol>
          )}
          <p style={akapit}>
            {en ? (
              <>Why links matter at all: Google says it uses links as a signal when determining the relevancy of pages and to find new pages to crawl (see the sources below). How the individual methods work, from research-driven assets to digital PR, is described in our guide to{' '}
                <Link href="/blog/link-building-b2b-dla-marketerow-strategie-i-checklista" style={link}>B2B link building strategies with a checklist</Link>; this page covers what we do for you and what it costs.</>
            ) : (
              <>Dlaczego linki w ogóle mają znaczenie: Google podaje, że używa linków jako sygnału przy ocenie trafności stron i do znajdowania nowych stron do przeskanowania (źródła niżej). Jak działają poszczególne metody, od zasobów opartych na badaniach po digital PR, opisujemy w poradniku{' '}
                <Link href="/blog/link-building-b2b-dla-marketerow-strategie-i-checklista" style={link}>link building B2B: strategie i checklista</Link>; ta strona dotyczy tego, co robimy dla Ciebie i ile to kosztuje.</>
            )}
          </p>
        </div>
      </section>

      <section className="sekcja-kompakt" style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('pakiety', 'packages')} style={h2Styl}>
            {en ? 'How many links you get: packages and prices' : 'Ile linków dostajesz: pakiety i ceny'}
          </h2>
          <p style={akapit}>
            {en
              ? 'The number of links is written into the package, and we promise no more than that. We do not guarantee position 1, because Google’s algorithm decides the rankings. We commit to the scope of work, a monthly report and access to the client portal.'
              : 'Liczba linków jest wpisana w pakiet i nie obiecujemy więcej niż tam stoi. Nie gwarantujemy pozycji nr 1, bo o pozycjach decyduje algorytm Google. Zobowiązujemy się do zakresu prac, raportu miesięcznego i dostępu do panelu klienta.'}
          </p>
          <CompareTable
            id={idEl('tabela-pakietow', 'package-table')}
            caption={en ? 'Link building in the SEO Standard and SEO Premium packages' : 'Link building w pakietach SEO Standard i SEO Premium'}
            columns={en
              ? [{ key: 'co', label: 'What you get' }, { key: 'standard', label: 'SEO Standard' }, { key: 'premium', label: 'SEO Premium' }]
              : [{ key: 'co', label: 'Zakres' }, { key: 'standard', label: 'SEO Standard' }, { key: 'premium', label: 'SEO Premium' }]}
            rows={wierszePakiety}
            przypis={en
              ? 'Source: our SEO pricing page, as of 18 November 2026. Prices net of VAT; euro amounts as shown on the English pricing page. Digital PR programs larger than the package are quoted individually.'
              : 'Źródło: nasz cennik pozycjonowania, stan na 18.11.2026. Ceny netto. Programy digital PR większe niż pakiet wyceniamy indywidualnie.'}
          />
          <p style={akapit}>
            {en ? (
              <>The packages also contain the audit, content, technical optimization and local SEO, so you do not buy links in isolation. <Link href="/cennik-pozycjonowania" style={link}>How much does SEO cost</Link> with each package is spelled out on our pricing page.{' '}
                {hrefPorownanie && <>If you are deciding how to pay for SEO, see <Link href={hrefPorownanie} style={link}>pay-for-results SEO or a monthly retainer</Link>.</>}</>
            ) : (
              <>Pakiety obejmują też audyt, treści, optymalizację techniczną i SEO lokalne, więc nie kupujesz samych linków. Pełne porównanie zakresu pakietów jest w <Link href="/cennik-pozycjonowania" style={link}>cenniku pozycjonowania</Link>.{' '}
                {hrefPorownanie && <>Jeśli wybierasz model rozliczeń, zobacz <Link href={hrefPorownanie} style={link}>pozycjonowanie za efekt czy abonament</Link>.</>}</>
            )}
          </p>
          <div style={{ margin: '1.75rem 0 0' }}>
            <a href={kontakt} className="btn btn-primary" data-cta="service_cena_link_building" data-plan="standard">
              {en ? 'Ask about the package - reply within 24 h' : <>Zapytaj o pakiet - odpowiedź w{' '}24{' '}h</>}
            </a>
          </div>
        </div>
      </section>

      <section className="sekcja-kompakt" style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('jakie-linki', 'which-links')} style={h2Styl}>
            {en ? 'White-hat link building: which links we go for and which we avoid' : 'Jakich linków szukamy, a jakich unikamy'}
          </h2>
          <p style={akapit}>
            {en ? (
              <>White-hat link building means earning links from relevant sites through content and outreach, not buying, swapping or generating them. When comparing link building companies, check how they source placements: Google’s spam policies define link spam as creating links to or from a site primarily to manipulate rankings, and list buying or selling links, excessive link exchanges and automated link creation as examples. Paid links are allowed for advertising or sponsorship only when marked with <code>rel=&quot;sponsored&quot;</code> or <code>rel=&quot;nofollow&quot;</code>. We refuse private blog networks and paid placements without a <code>rel=&quot;sponsored&quot;</code> tag, and we apply a simple filter to every source before we accept a link.</>
            ) : (
              <>Nie każdy link warto mieć. Zasady Google dotyczące spamu definiują spam linkowy jako tworzenie linków do witryny lub z niej głównie po to, by manipulować pozycjami, a jako przykłady podają kupowanie i sprzedaż linków, nadmierną wymianę linków i automatyczne tworzenie linków. Linki płatne są dozwolone w reklamie i sponsoringu, o ile mają atrybut <code>rel=&quot;sponsored&quot;</code> albo <code>rel=&quot;nofollow&quot;</code>. Każde źródło sprawdzamy prostym filtrem, zanim przyjmiemy link.</>
            )}
          </p>
          <CompareTable
            id={idEl('tabela-kryteriow', 'criteria-table')}
            caption={en ? 'How we judge a link source' : 'Jak oceniamy źródło linku'}
            columns={en
              ? [{ key: 'kryterium', label: 'Criterion' }, { key: 'szukamy', label: 'We look for' }, { key: 'unikamy', label: 'We avoid' }]
              : [{ key: 'kryterium', label: 'Kryterium' }, { key: 'szukamy', label: 'Szukamy' }, { key: 'unikamy', label: 'Unikamy' }]}
            rows={wierszeKryteria}
            przypis={en
              ? 'Based on the link quality matrix in our B2B link building guide and on Google’s guidance on anchor text and link spam, read 18 November 2026.'
              : 'Na podstawie macierzy jakości linku z naszego poradnika o link buildingu B2B oraz wskazówek Google o tekście linku i spamie linkowym, odczyt 18.11.2026.'}
          />
          <p style={akapit}>
            {en ? (
              <>Google describes good anchor text as descriptive, reasonably concise and relevant to the page it is on and the page it links to, so we do not push exact-match anchors. {hrefAutorytet && <>To see where your domain stands on links before you start, use our free <Link href={hrefAutorytet} style={link}>domain authority checker</Link>.</>}</>
            ) : (
              <>Google opisuje dobry tekst linku jako opisowy, w miarę zwięzły i związany ze stroną, na której stoi, i ze stroną docelową, dlatego nie wymuszamy kotwic w dokładnym brzmieniu frazy. {hrefAutorytet && <>Żeby sprawdzić, gdzie Twoja domena stoi pod względem linków, zanim zaczniemy, użyj naszego bezpłatnego <Link href={hrefAutorytet} style={link}>sprawdzania autorytetu domeny</Link>.</>}</>
            )}
          </p>
        </div>
      </section>

      <section className="sekcja-kompakt" style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('pomiar', 'measurement')} style={h2Styl}>
            {en ? 'How we measure link building' : 'Jak mierzymy link building'}
          </h2>
          {en ? (
            <>
              <p style={akapit}>We report three things, because the number of links alone says little:</p>
              <ul style={lista}>
                <li>new referring domains from topically related sites;</li>
                <li>the average DR of the new links, as a check on source quality;</li>
                <li>organic traffic on the pages we build links to.</li>
              </ul>
              <p style={akapit}>You get them in the monthly report, and the <Link href="/panel-klienta" style={link}>client portal</Link> shows Google data and a work log around the clock. Links take time to show an effect; how long, and what Google itself says about it, is covered in{' '}
                {hrefDlugo ? <Link href={hrefDlugo} style={link}>how long SEO takes</Link> : 'our article on how long SEO takes'}.</p>
            </>
          ) : (
            <>
              <p style={akapit}>Raportujemy trzy rzeczy, bo sama liczba linków mówi niewiele:</p>
              <ul style={lista}>
                <li>nowe domeny odsyłające z serwisów zbliżonych tematycznie;</li>
                <li>średnie DR nowych linków, jako kontrolę jakości źródeł;</li>
                <li>ruch organiczny na podstronach, do których budujemy linki.</li>
              </ul>
              <p style={akapit}>Dostajesz je w raporcie miesięcznym, a <Link href="/panel-klienta" style={link}>panel klienta</Link> pokazuje dane z Google i dziennik prac przez całą dobę. Linki potrzebują czasu, żeby dać efekt; ogólne ramy czasowe pracy nad SEO opisujemy w <Link href="/pozycjonowanie-stron-internetowych" style={link}>pozycjonowaniu stron</Link>.</p>
            </>
          )}
        </div>
      </section>

      <section className="sekcja-kompakt" style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('digital-pr', 'digital-pr')} style={h2Styl}>
            {en ? 'Example: digital PR built on our own data' : 'Przykład: digital PR na danych własnych'}
          </h2>
          <p style={akapit}>
            {en
              ? 'In October 2026 we checked the offer pages, price lists, terms and directory profiles of 17 SEO agencies operating in Poland. As of 25 October 2026, 12 of the 17 publish a “from” price or a range, 11 bill without a performance-based component, and 6 state a notice period. These are the kind of numbers an editor can quote with a source, which is why they work as a linkable asset.'
              : 'W październiku 2026 sprawdziliśmy strony ofertowe, cenniki, regulaminy i profile w katalogach 17 agencji SEO działających w Polsce. Według stanu na 25 października 2026 cenę „od” albo widełki publikuje 12 z 17 agencji, 11 rozlicza się bez komponentu za efekt, a okres wypowiedzenia podaje 6. To liczby, które redakcja może zacytować ze źródłem, dlatego sprawdzają się jako zasób wart linkowania.'}
          </p>
          <p style={akapit}>
            {en
              ? 'We do not name the agencies and do not rate their services. What we do not know yet: how many links this study will earn. It is fresh, so we publish no link count and will measure the effect as we measure everything else, in new referring domains and brand mentions.'
              : 'Nie podajemy nazw agencji i nie oceniamy ich usług. Czego jeszcze nie wiemy: ile linków zdobędzie to zestawienie. Jest świeże, więc nie podajemy liczby linków, a efekt zmierzymy tak jak wszystko inne: liczbą nowych domen odsyłających i wzmianek o marce.'}
          </p>

          <Zrodla zrodla={ZRODLA} en={en} />
        </div>
      </section>

      <AppleFaq
        faqData={faqData}
        title={en ? 'Questions about link building services' : 'Pytania o link building'}
        sectionId={idEl('pytania', 'faq')}
      />

      <section className="de-abschnitt">
        <div className="container" style={kontener}>
          <div style={{ ...karta, textAlign: 'center' }}>
            <p style={{ ...akapit, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              {en
                ? 'Want to know which links your site is missing? Send us the address and we will reply within 24 hours on business days.'
                : 'Chcesz wiedzieć, jakich linków brakuje Twojej stronie? Wyślij adres, a odpowiemy w ciągu 24 godzin w dni robocze.'}
            </p>
            <a href={kontakt} className="btn btn-primary" data-cta="service_bottom_link_building" data-plan="standard">
              {en ? 'Ask about link building' : 'Zapytaj o link building'}
            </a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
