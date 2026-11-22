'use client';

// F8 (22.11.2026): /pozycjonowanie-stron-mazowsze (PL) i /en/local-seo-mazovia (EN).
// Unikalna podstrona regionalna dla firm B2B, produkcyjnych i uslugowych z wojewodztwa mazowieckiego
// poza sama Warszawa (Radom, Plock, Siedlce, Pruszkow, Legionowo, Piaseczno, Otwock, Ciechanow,
// Minsk Mazowiecki, Grodzisk Mazowiecki oraz korytarze A2, S7, S8).
// Zero mechanicznego kopiowania z /seo-lokalne-warszawa; weryfikowalne dane GSC (Staniax, Stef-Bud)
// z public/dane/realizacje-gsc.json (okno do 20.11.2026) i adres biura z lib/firma.js.

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
import { AUDYT, CENY } from '@/lib/narzedziaLiczby';
import { BIURO, adresLinia } from '@/lib/firma';

const SCIEZKA = '/pozycjonowanie-stron-mazowsze';
const fmtPl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmtEn = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=pl', nazwa: 'Google Search Central: Zasady dotyczące spamu - strony przejściowe (zakaz masowego powielania podstron miejskich)', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/7091?hl=pl', nazwa: 'Pomoc Profilu Firmy w Google: Trafność, odległość i rozpoznawalność w wynikach lokalnych', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/9157481?hl=pl', nazwa: 'Pomoc Profilu Firmy w Google: Konfiguracja obszaru świadczenia usług (do 2 godzin jazdy od siedziby)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: Dane strukturalne LocalBusiness i właściwość areaServed', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies - Doorway abuse (avoiding duplicate city-swap pages)', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Google Business Profile Help: Relevance, distance and prominence in local search', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/9157481', nazwa: 'Google Business Profile Help: Manage service areas for service-area and hybrid businesses', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: LocalBusiness structured data & areaServed markup', data: '2026-11-22' },
];

const SUBREGIONY_PL = [
  {
    kierunek: 'KORYTARZ ZACHODNI A2 / S8 · PRZEMYSŁ I LOGISTYKA',
    miasta: 'Pruszków, Grodzisk Mazowiecki, Błonie, Ożarów Mazowiecki, Sochaczew',
    specyfika: 'Zagłębie hal produkcyjnych, magazynów TSL, obróbki CNC, automatyki i hurtowni technicznych. Klienci B2B szukają tu wykonawców po konkretnych parametrach technologicznych, certyfikatach ISO i krótkim czasie dostawy na całą Polskę centralną.',
  },
  {
    kierunek: 'OŚRODKI SUBREGIONALNE · POŁUDNIE, PÓŁNOC I WSCHÓD',
    miasta: 'Radom (S7), Płock, Siedlce (A2), Ciechanów',
    specyfika: 'Samodzielne rynki miejskie liczące od 40 do ponad 190 tys. mieszkańców z silnym sektorem metalowym, chemicznym, energetycznym i budowlanym. Konkurencja w wynikach organicznych i Mapach Google jest tu wyraźnie mniejsza niż w stolicy, co pozwala szybciej zająć pierwszą trójkę.',
  },
  {
    kierunek: 'PASMO PODWARSZAWSKIE · USŁUGI DLA DOMU, MEDYCYNA I B2B',
    miasta: 'Piaseczno, Legionowo, Otwock, Mińsk Mazowiecki, Wołomin, Nowy Dwór Mazowiecki',
    specyfika: 'Powiaty o wysokiej sile nabywczej i intensywnej zabudowie jednorodzinnej: pompy ciepła, fotowoltaika, stolarka, firmy remontowo-budowlane, kliniki medyczne i kancelarie. Dobrze ułożona strona łapie jednocześnie zapytania z własnego powiatu oraz z sąsiednich dzielnic Warszawy.',
  },
];

const SUBREGIONY_EN = [
  {
    kierunek: 'WESTERN A2 / S8 CORRIDOR · MANUFACTURING & LOGISTICS',
    miasta: 'Pruszków, Grodzisk Mazowiecki, Błonie, Ożarów Mazowiecki, Sochaczew',
    specyfika: 'Poland’s densest warehouse, CNC machining, industrial automation and B2B distribution belt. Procurement teams search by technical specifications, ISO standards and turnaround times rather than generic consumer keywords.',
  },
  {
    kierunek: 'SUB-REGIONAL CITIES · RADOM, PŁOCK, SIEDLCE & CIECHANÓW',
    miasta: 'Radom (S7), Płock, Siedlce (A2), Ciechanów',
    specyfika: 'Self-contained regional hubs of 40,000 to 195,000+ residents anchoring metalworking, petrochemical/engineering, agribusiness and construction supply chains - with far lower SERP saturation than central Warsaw.',
  },
  {
    kierunek: 'METROPOLITAN RING · HIGH-TICKET SERVICES & CONTRACTORS',
    miasta: 'Piaseczno, Legionowo, Otwock, Mińsk Mazowiecki, Wołomin',
    specyfika: 'Fast-growing commuter counties with strong residential construction, HVAC/heat-pump installers, custom joinery, private healthcare clinics and B2B services competing both locally and across bordering Warsaw districts.',
  },
];

const POROWNANIE_RYNKOW_PL = [
  {
    id: 'konkurencja',
    wymiar: 'Nasycenie pierwszej dziesiątki Google i 3-paku Map',
    powiatMazowsze: 'Średnie lub niskie: wiele solidnych firm produkcyjnych z Płocka, Radomia czy Pruszkowa ma przestarzałe strony bez osobnych podstron usługowych i nieuzupełnione wizytówki',
    centrumWarszawy: 'Bardzo wysokie: o jedną frazę walczą dziesiątki agencji, ogólnopolskich agregatorów ofert (np. Oferteo, Fixly, Booksy) i dużych sieci z wieloletnim profilem linkowym',
  },
  {
    id: 'czas-top3',
    wymiar: 'Typowy czas wejścia do TOP 3 na frazy usługowe + miasto',
    powiatMazowsze: 'Często 6-12 tygodni dla dobrze przygotowanej podstrony usługi i zweryfikowanego Profilu Firmy w Google z realnymi zdjęciami realizacji',
    centrumWarszawy: 'Zwykle 3-6 miesięcy systematycznej rozbudowy treści, linkowania i zbierania opinii w najbardziej obleganych dzielnicach',
  },
  {
    id: 'zasieg-handlowy',
    wymiar: 'Skąd przychodzą zapytania ofertowe po wdrożeniu SEO',
    powiatMazowsze: 'Podwójny strumień: szybkie zlecenia z własnego powiatu + kontrakty B2B z Warszawy i całego korytarza A2 / S7 / S8 przy niższych kosztach stałych firmy',
    centrumWarszawy: 'Głównie klienci z dzielnic Warszawy przy znacznie wyższych stawkach kliknięć konkurencji w Google Ads',
  },
  {
    id: 'polecenia-ai',
    wymiar: 'Szansa na polecenie w ChatGPT i Perplexity',
    powiatMazowsze: 'Wysoka dźwignia: uporządkowana wizytówka Google, jasny cennik i wzmianki w regionalnych oraz branżowych katalogach szybko wybijają firmę przy braku lokalnych rywali z GEO',
    centrumWarszawy: 'Wymaga dłuższego budowania wzmianek w dużych rankingach i katalogach B2B obok kilkunastu aktywnych konkurentów',
  },
];

const POROWNANIE_RYNKOW_EN = [
  {
    id: 'konkurencja',
    wymiar: 'SERP & Google Maps Local Pack saturation',
    powiatMazowsze: 'Low to moderate: many established manufacturers and contractors in Radom, Płock, Siedlce or Pruszków still run legacy brochure sites with thin service pages',
    centrumWarszawy: 'High: national directories, aggregator marketplaces and long-running agency campaigns crowd page one',
  },
  {
    id: 'czas-top3',
    wymiar: 'Typical timeline to reach TOP 3 on service + city queries',
    powiatMazowsze: 'Often 6-12 weeks once dedicated service pages, LocalBusiness schema and a complete Google Business Profile go live',
    centrumWarszawy: 'Typically 3-6 months of sustained content depth, editorial link building and review velocity',
  },
  {
    id: 'zasieg-handlowy',
    wymiar: 'Commercial lead radius',
    powiatMazowsze: 'Dual funnel: fast county-level local jobs plus B2B contracts from Warsaw and the A2 / S7 / S8 highway corridors while operating on lower regional overhead',
    centrumWarszawy: 'Primarily intra-Warsaw demand paired with steep Google Ads CPC benchmarks',
  },
  {
    id: 'polecenia-ai',
    wymiar: 'AI recommendation upside (ChatGPT & Perplexity)',
    powiatMazowsze: 'Fast mover advantage: very few sub-regional competitors publish structured pricing tables, /llms.txt or verified directory profiles yet',
    centrumWarszawy: 'Requires sustained third-party citation building against dozens of digitally mature rivals',
  },
];

const WYNIKI_GSC_PL = [
  {
    id: 'gsc-staniax',
    klient: 'Staniax (staniax.pl) - produkcja i usługi przemysłowe B2B',
    okres: '21.08 - 20.11.2026 (92 dni, Google Search Console)',
    liczby: '233 kliknięcia · 8 967 wyświetleń · średnia pozycja 8,5',
    wniosek: 'Start od zerowej widoczności organicznej: budowa dedykowanej architektury usług przemysłowych (metalizacja próżniowa, lakierowanie UV) i wersji językowych pod kontrakty z Polski, Niemiec i USA.',
  },
  {
    id: 'gsc-stefbud',
    klient: 'Stef-Bud (stefbud.com) - usługi wykonawcze i budowlane',
    okres: '06.09 - 20.11.2026 (pierwsze 76 dni pomiaru w GSC)',
    liczby: '226 kliknięć · 9 613 wyświetleń (w tym 46 kliknięć i 2 425 wyśw. w tyg. 14-20.11)',
    wniosek: 'Systematyczny wzrost zapytań i widoczności dla firmy wykonawczej z tygodnia na tydzień dzięki uporządkowaniu podstron konkretnych robót i intencji lokalno-regionalnych.',
  },
];

const WYNIKI_GSC_EN = [
  {
    id: 'gsc-staniax',
    klient: 'Staniax (staniax.pl) - B2B industrial coating & vacuum metallization',
    okres: 'Aug 21 - Nov 20, 2026 (92-day window, Google Search Console)',
    liczby: '233 clicks · 8,967 impressions · 8.5 average position',
    wniosek: 'Built from zero organic baseline: dedicated industrial service architecture plus PL/DE/EN language versions capturing manufacturing inquiries across Poland and export markets.',
  },
  {
    id: 'gsc-stefbud',
    klient: 'Stef-Bud (stefbud.com) - construction & contracting services',
    okres: 'Sep 6 - Nov 20, 2026 (first 76 tracked days in GSC)',
    liczby: '226 clicks · 9,613 impressions (accelerating to 46 clicks & 2,425 impr. in Nov 14-20)',
    wniosek: 'Steady week-over-week search growth for a regional contractor driven by specific trade service pages and clean technical indexing.',
  },
];

const FAQ_PL = [
  {
    id: 'jak-pozycjonowac-kilka-miast-mazowsza-bez-spamu',
    question: 'Jak pozycjonować firmę z Pruszkowa, Piaseczna lub Mińska Mazowieckiego na kilka powiatów i Warszawę bez kary od Google?',
    answer: 'Zasady dotyczące spamu Google wprost zakazują tworzenia tzw. stron przejściowych (doorway pages), czyli dziesiątek identycznych podstron, w których zmieniono wyłącznie nazwę miasta („hydraulik Pruszków”, „hydraulik Grodzisk”, „hydraulik Błonie”). Zamiast tego budujemy silne podstrony poszczególnych usług, opisujemy realną logistykę dojazdu, publikujemy autentyczne realizacje z konkretnych miejscowości ze zdjęciami i łączymy je z poprawnie skonfigurowanym obszarem obsługi w Profilu Firmy w Google oraz znacznikiem areaServed w JSON-LD.',
  },
  {
    id: 'ile-kosztuje-pozycjonowanie-mazowsze',
    question: 'Ile kosztuje pozycjonowanie strony firmy z województwa mazowieckiego?',
    answer: `Nasze stawki są jawne i takie same dla całego regionu: pakiet SEO Standard zaczyna się od ${fmtPl(CENY.seoStandard.pln)} zł netto miesięcznie (umowa miesięczna, w cenie strona + prowadzenie Profilu Firmy w Google, 2 treści i 2 linki/mies. oraz panel klienta 24/7), a rozbudowany pakiet SEO Premium z cotygodniowym pomiarem widoczności w ChatGPT i AI kosztuje ${fmtPl(CENY.seoPremium.pln)} zł netto miesięcznie. Jeśli potrzebujesz od razu nowej, szybkiej strony w Next.js, w pakiecie Booster Pack (${fmtPl(CENY.boosterPack.pln)} zł netto/mies., min. 3 mies.) budujemy ją za 0 zł opłaty startowej.`,
  },
  {
    id: 'czy-mozemy-spotkac-sie-osobiscie-w-warszawie',
    question: 'Czy pracujecie tylko zdalnie, czy możemy spotkać się osobiście?',
    answer: `Obie formy są u nas standardem. Większość bieżących ustaleń załatwiamy sprawnie na wideorozmowie i w całodobowym panelu klienta, ale w każdej chwili zapraszamy na kawę i przegląd wyników na żywo do naszego biura w centrum Warszawy (${adresLinia(BIURO, 'pl')} - kilka minut pieszo od stacji metra Rondo ONZ i Dworca Centralnego, z wygodnym dojazdem z A2, S7, S8 i Kolei Mazowieckich).`,
  },
  {
    id: 'firma-produkcyjna-mazowsze-eksport',
    question: 'Prowadzimy zakład produkcyjny pod Warszawą, w Radomiu lub Płocku i szukamy zleceń B2B z całej Polski oraz Niemiec - czy to też obejmujecie?',
    answer: 'Tak - to jeden z naszych głównych profili. Dla mazowieckich producentów i hurtowni łączymy regionalną widoczność siedziby zakładu z ogólnopolskim pozycjonowaniem technicznym B2B oraz natywnymi wersjami językowymi po angielsku i niemiecku (/en i /de z poprawnym hreflang), czego przykładem jest m.in. wdrożenie dla firmy przemysłowej Staniax.',
  },
];

const FAQ_EN = [
  {
    id: 'multi-city-mazovia-without-doorway-spam',
    question: 'How do you rank a Mazovia company across multiple counties and Warsaw without doorway-page spam?',
    answer: 'Google’s spam policies strictly prohibit doorway abuse - cloning dozens of identical pages that only swap city names ("installer Pruszków", "installer Piaseczno"). Instead, we build authoritative service pages, document genuine project case studies from specific Mazovian towns, configure verified service areas inside your Google Business Profile (within Google’s 2-hour drive guideline), and declare structured areaServed entities in JSON-LD.',
  },
  {
    id: 'mazovia-seo-pricing',
    question: 'How much does regional B2B and local SEO in Mazovia cost?',
    answer: `Our rates are published openly: SEO Standard starts from €${fmtEn(CENY.seoStandard.eur)} net/month on a rolling monthly contract (website SEO + Google Business Profile management, up to 20 keywords, 2 content pieces & 2 links/mo + 24/7 client portal), while SEO Premium is €${fmtEn(CENY.seoPremium.eur)} net/month including weekly AI search tracking. Need a brand-new website too? Our Booster Pack (€${fmtEn(CENY.boosterPack.eur)} net/mo, min. 3 months) includes a custom Next.js build for €0 upfront.`,
  },
  {
    id: 'in-person-meetings-warsaw-office',
    question: 'Can we meet your team in person in Warsaw?',
    answer: `Yes. While day-to-day reporting runs seamlessly through video calls and our 24/7 client portal, you are always welcome at our Warsaw office (${adresLinia(BIURO, 'en')}, near Rondo ONZ metro and Warsaw Central station - easily reachable via the A2, S7 and S8 corridors from anywhere in Mazovia).`,
  },
  {
    id: 'industrial-exporters-mazovia-de-en',
    question: 'We run a manufacturing plant in Radom, Płock or along the A2 corridor - can you scale our B2B leads into Germany and the EU?',
    answer: 'Yes. Many Mazovian industrial plants outgrow regional demand quickly. Alongside Polish B2B and regional rankings, we build localized English and German (/en and /de) service architectures with clean reciprocal hreflang and technical terminology - just as we did for industrial manufacturer Staniax.',
  },
];

const kontener = { maxWidth: '880px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.3vw, 2.2rem)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'var(--w-tusz)', margin: '0 0 1.15rem', scrollMarginTop: '110px' };
const h3Styl = { fontSize: 'clamp(1.18rem, 2.2vw, 1.38rem)', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--w-tusz)', margin: '0 0 0.5rem' };
const akapit = { fontSize: '1.06rem', lineHeight: 1.7, color: 'var(--w-tusz-2)', margin: '0 0 1.1rem' };
const link = { color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', boxShadow: 'none', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

export default function MazowszeClient() {
  const lang = useLocale();
  const en = lang === 'en';
  const kontakt = hash('kontakt', lang);
  const SUBREGIONY = en ? SUBREGIONY_EN : SUBREGIONY_PL;
  const POROWNANIE = en ? POROWNANIE_RYNKOW_EN : POROWNANIE_RYNKOW_PL;
  const WYNIKI = en ? WYNIKI_GSC_EN : WYNIKI_GSC_PL;
  const ZRODLA = en ? ZRODLA_EN : ZRODLA_PL;
  const FAQ = en ? FAQ_EN : FAQ_PL;

  const hrefWarszawa = hrefJesliOpublikowana('/seo-lokalne-warszawa');
  const hrefWizytowka = hrefJesliOpublikowana('/pozycjonowanie-wizytowki-google');
  const hrefAudytNarz = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  const hrefCennik = hrefJesliOpublikowana('/cennik-pozycjonowania');

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '2rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {en ? 'Regional B2B & Maps SEO · Mazovian Voivodeship' : 'Regionalne SEO B2B i Mapy · Województwo Mazowieckie'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.4rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 1.35rem', color: 'var(--w-tusz)' }}>
              {en
                ? 'Regional B2B and local SEO in Mazovia: sub-regional markets around Warsaw'
                : 'Pozycjonowanie stron na Mazowszu: widoczność B2B i lokalna poza Warszawą'}
            </h1>
          </Reveal>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en
              ? `Mazovia outside central Warsaw - from industrial hubs like Radom, Płock and Siedlce to the A2/S7/S8 logistics ring (Pruszków, Grodzisk Mazowiecki, Piaseczno, Legionowo, Otwock, Ciechanów and Mińsk Mazowiecki) - offers one of Poland’s strongest SEO arbitrage opportunities: lower competition in Google’s top 3 and Local Pack than downtown Warsaw, paired with direct highway access to serve capital-city and national B2B clients. Our Warsaw team (${BIURO.ulica}) runs regional retainers from €${fmtEn(CENY.seoStandard.eur)} net/mo on a monthly contract.`
              : `Rynki powiatowe i subregionalne Mazowsza - od Radomia, Płocka, Siedlec i Ciechanowa po pasmo A2/S7/S8 wokół stolicy (Pruszków, Grodzisk Mazowiecki, Piaseczno, Legionowo, Otwock, Mińsk Mazowiecki) - dają firmom usługowym i produkcyjnym wyraźną przewagę kosztową: próg wejścia do TOP 3 Google i Map jest tu niższy niż w centrum Warszawy, a dobra widoczność pozwala zbierać zlecenia zarówno z własnego powiatu, jak i z całej aglomeracji. Pracujemy z biura przy ${BIURO.ulica} w Warszawie w umowie miesięcznej od ${fmtPl(CENY.seoStandard.pln)} zł netto/mies.`}
          </AnswerBox>

          <Byline sciezka={SCIEZKA} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta="mazowsze_hero" data-plan="standard">
              {en ? 'Get a regional SEO plan in 24h' : 'Zamów bezpłatną wycenę dla firmy z Mazowsza'}
            </a>
            <a href={en ? '#verified-results' : '#wyniki-gsc'} className="hero-btn-secondary" data-cta="mazowsze_wyniki">
              {en ? 'See verified Search Console results' : 'Zobacz zweryfikowane wyniki z Search Console'}
            </a>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'subregions' : 'subregiony-mazowsza'}>
        <div className="container" style={kontener}>
          <h2 style={h2Styl}>
            {en
              ? 'Three distinct search markets across the Mazovian Voivodeship'
              : 'Trzy różne rynki wyszukiwania na Mazowszu - jedna szablonowa strategia tu nie zadziała'}
          </h2>
          <p style={akapit}>
            {en
              ? 'Treating Mazovia as a suburb of Warsaw misses how industrial buyers and local homeowners actually search. We tailor keyword architecture and Google Business Profile territories to three sub-regional patterns:'
              : 'Wrzucanie całego województwa mazowieckiego do jednego worka z Warszawą to błąd w doborze słów kluczowych. Inaczej szuka głównego wykonawcy zakład w Płocku, inaczej logistyk pod Pruszkowem, a inaczej właściciel domu w Piasecznie:'}
          </p>
          <div style={{ display: 'grid', gap: '1.15rem', marginTop: '1.25rem' }}>
            {SUBREGIONY.map((s) => (
              <div key={s.kierunek} style={karta}>
                <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.4rem' }}>
                  {s.kierunek}
                </div>
                <h3 style={h3Styl}>{s.miasta}</h3>
                <p style={{ ...akapit, margin: 0 }}>{s.specyfika}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'arbitrage' : 'przewaga-powiatow'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>
              {en
                ? 'Why Mazovian county markets reach Google’s TOP 3 faster than central Warsaw'
                : 'Dlaczego firma z Radomia, Płocka lub Pruszkowa szybciej wchodzi do TOP 3 niż w centrum Warszawy'}
            </h2>
            <p style={akapit}>
              {en
                ? 'Many Mazovian manufacturers, wholesalers and contractors pay lower rent and labor costs than downtown Warsaw competitors while sitting 20-60 minutes away on the A2, S7 or S8 expressways. Organic search magnifies that advantage:'
                : 'Firmy zlokalizowane w pasie A2, S7 i S8 mają niższe koszty bazowe niż podmioty z centrum stolicy, a jednocześnie dojeżdżają do klientów biznesowych w całej aglomeracji. W bezpłatnych wynikach Google ta przewaga jest jeszcze wyraźniejsza:'}
            </p>
            <CompareTable
              id="tabela-mazowsze-vs-centrum-warszawy"
              caption={en ? 'Search competition & commercial reach: Mazovia sub-regions vs central Warsaw' : 'Specyfika pozycjonowania na rynkach subregionalnych Mazowsza a w samym centrum Warszawy'}
              columns={en
                ? [
                    { key: 'wymiar', label: 'Factor' },
                    { key: 'powiatMazowsze', label: 'Mazovia hubs & A2/S7/S8 counties' },
                    { key: 'centrumWarszawy', label: 'Central Warsaw districts' },
                  ]
                : [
                    { key: 'wymiar', label: 'Kryterium rynkowe' },
                    { key: 'powiatMazowsze', label: 'Ośrodki i powiaty Mazowsza (poza Warszawą)' },
                    { key: 'centrumWarszawy', label: 'Śródmieście i główne dzielnice Warszawy' },
                  ]}
              rows={POROWNANIE}
              przypis={en
                ? 'If your business operates strictly inside Warsaw districts, see our dedicated Warsaw local SEO page linked below.'
                : 'Jeśli działasz wyłącznie stacjonarnie wewnątrz dzielnic samej stolicy, zobacz naszą osobną usługę dedykowaną dla Warszawy.'}
            />
            <p style={{ ...akapit, marginTop: '1.1rem', marginBottom: 0 }}>
              {en ? (
                <>
                  <strong>Zero doorway-page spam:</strong> we never clone thin city-swap pages that violate Google’s spam policies. Instead we combine deep trade service pages, documented regional project case studies, and 49-point grid tracking on your{' '}
                  {hrefWizytowka ? <Link href="/pozycjonowanie-wizytowki-google" style={link}>Google Business Profile</Link> : 'Google Business Profile'}.{' '}
                  {hrefWarszawa && <>Operating strictly inside Warsaw city limits? Visit <Link href="/seo-lokalne-warszawa" style={link}>Local SEO Warsaw</Link>.</>}
                </>
              ) : (
                <>
                  <strong>Zero spamu podstronami miejskimi (doorway pages):</strong> nie generujemy masowych kopii tego samego tekstu z podmienioną nazwą gminy, za które Google nakłada filtry. Budujemy merytoryczne podstrony usług, opisy prawdziwych wdrożeń z regionu oraz prowadzimy{' '}
                  {hrefWizytowka ? <Link href="/pozycjonowanie-wizytowki-google" style={link}>Profil Firmy w Google mierzony siatką 49 punktów</Link> : 'Profil Firmy w Google mierzony siatką 49 punktów'}.{' '}
                  {hrefWarszawa && <>Jeżeli działasz wyłącznie w granicach samej stolicy, przejdź na osobną stronę <Link href="/seo-lokalne-warszawa" style={link}>SEO lokalne w Warszawie</Link>.</>}
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'verified-results' : 'wyniki-gsc'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>
              {en
                ? 'Verified Google Search Console results from industrial & contracting clients'
                : 'Zweryfikowane liczby z Google Search Console naszych klientów B2B i wykonawczych'}
            </h2>
            <p style={akapit}>
              {en
                ? 'We never publish invented "+400% traffic" badges. Every figure below comes straight from verified Google Search Console properties synced to our repository (window ending November 20, 2026):'
                : 'Nie publikujemy zmyślonych wykresów bez źródła. Poniższe liczby pochodzą bezpośrednio ze zweryfikowanych usług Google Search Console naszych klientów produkcyjnych i budowlano-usługowych (stan synchronizacji danych: 20.11.2026):'}
            </p>
            <CompareTable
              id="tabela-wyniki-gsc-mazowsze"
              caption={en ? 'Live Google Search Console metrics (industrial & contracting projects, Nov 20, 2026)' : 'Rzeczywiste wyniki w Google Search Console (projekty przemysłowe i wykonawcze, stan 20.11.2026)'}
              columns={en
                ? [
                    { key: 'klient', label: 'Client & sector' },
                    { key: 'okres', label: 'Verified GSC window' },
                    { key: 'liczby', label: 'Measured GSC performance' },
                    { key: 'wniosek', label: 'What drove the result' },
                  ]
                : [
                    { key: 'klient', label: 'Klient i profil działalności' },
                    { key: 'okres', label: 'Okres pomiaru w GSC' },
                    { key: 'liczby', label: 'Zmierzony wynik z Search Console' },
                    { key: 'wniosek', label: 'Zakres wykonanych prac' },
                  ]}
              rows={WYNIKI}
              przypis={en
                ? 'Source: Google Search Console API sync (public/dane/realizacje-gsc.json, generated Nov 21, 2026 for window through Nov 20, 2026).'
                : 'Źródło: bezpośrednia synchronizacja z API Google Search Console (public/dane/realizacje-gsc.json, okno danych do 20.11.2026).'}
            />
            <p style={{ ...akapit, marginTop: '1.1rem', marginBottom: 0 }}>
              {en ? (
                <>
                  <strong>Work with a local team at {adresLinia(BIURO, 'en')}:</strong> we are based right in central Warsaw, minutes from Central Station and the Rondo ONZ metro. Check your current website score free in 60 seconds with our{' '}
                  {hrefAudytNarz ? <Link href="/narzedzia/audyt-seo" style={link}>free {AUDYT.regul}-rule SEO audit</Link> : 'free SEO audit'}, or review our{' '}
                  {hrefCennik ? <Link href="/cennik-pozycjonowania" style={link}>open monthly SEO packages from €{fmtEn(CENY.seoStandard.eur)} net</Link> : `open monthly packages from €${fmtEn(CENY.seoStandard.eur)} net`}.
                </>
              ) : (
                <>
                  <strong>Zespół na miejscu w regionie ({adresLinia(BIURO, 'pl')}):</strong> nie jesteś zdany na anonimową infolinię z drugiego końca kraju - w każdej chwili możesz spotkać się z nami przy ul. Grzybowskiej 5A albo śledzić postęp 24/7 w panelu klienta. Przed rozmową możesz bezpłatnie przetestować swoją obecną stronę w{' '}
                  {hrefAudytNarz ? <Link href="/narzedzia/audyt-seo" style={link}>darmowym audycie SEO ({AUDYT.regul} reguł)</Link> : 'darmowym audycie SEO'} oraz sprawdzić pełny{' '}
                  {hrefCennik ? <Link href="/cennik-pozycjonowania" style={link}>cennik pakietów od {fmtPl(CENY.seoStandard.pln)} zł netto/mies.</Link> : `cennik pakietów od ${fmtPl(CENY.seoStandard.pln)} zł netto/mies.`}.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ}
        title={en ? 'Questions about regional SEO in Mazovia' : 'Pytania o pozycjonowanie firm z Mazowsza'}
        sectionId={en ? 'faq' : 'pytania'}
      />

      <div className="container" style={{ ...kontener, paddingBottom: '3rem' }}>
        <Zrodla zrodla={ZRODLA} en={en} />
      </div>

      <Contact />
    </main>
  );
}
