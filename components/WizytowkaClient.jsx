'use client';

// L1 /pozycjonowanie-wizytowki-google: treść strony (PLAN-v2 6.6; wzorzec PozycjonowanieClient.jsx).
// 5.11.2026. 9.11.2026: wersja EN (/en/google-business-profile-optimization) obok PL;
// PL bez zmian, EN przez locale z useLocale() (zmienna en) i słowniki/tablice {pl, en}.
//
// Konspekt (brief L1 + korekty weryfikacji): H1 → Krótka odpowiedź → H2 czynniki (H3 trafność /
// odległość / rozpoznawalność) → H2 siatka 7×7 → H2 optymalizacja i zarządzanie (H3 start / co miesiąc)
// → H2 cena (#cena, CB-02 + AV-08) → H2 ChatGPT (CB-01) → H2 8 kroków → H2 wizytówka i strona
// → Źródła → FAQ → CTA + Contact (pakiet „standard” przez data-plan).
//
// Strażnik fraz: L1 nie używa „seo lokalne” ani „pozycjonowanie lokalne” w title, H1 i H2
// (frazy chronione /seo-lokalne-warszawa, narzedzia/kontrola-fraz.py). Zdania o siatce są inne
// niż w H2 o siatce na /seo-lokalne-warszawa (PLAN 6.21), żeby nie powielać treści (PLAN 5.5).
// Nazw innych agencji nie ma (art. 16 UZNK); widełki rynku z poradnika podanego w podpisie.

import Image from 'next/image';
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
import { PANEL_DEMO_URL } from '@/lib/panel';
import { hrefWJezyku } from '@/lib/linkiEn';

const SCIEZKA = '/pozycjonowanie-wizytowki-google';

// DO POTWIERDZENIA PRZEZ FILIPA przed publikacją (PLAN-v2 6.6 „Akceptacja”, CB-02):
// czy pomiar siatką 7×7 (49 punktów co 14 dni) jest w pakiecie SEO Standard. Kod potwierdza
// tylko moduł Map w panelu (PanelPageClient.jsx), nie zakres pakietu; demo panelu ma SEO Premium.
// false = zdania i wiersz tabeli o 49 punktach w pakiecie znikają z sekcji #cena i z listy prac.
// Title, meta i opis Service (rejestr publikacji, ServiceSchema) zmienia wtedy Integracja.
const SIATKA_W_SEO_STANDARD = true;

// Kotwica sekcji ceny wprost z planu (6.6: id="cena"); nie ma jej w lib/anchors.js, bo strona ma tylko tę jedną kotwicę z planu (EN: #pricing).
const ID_CENA = 'cena';

const ZRODLA_PL = [
  {
    url: 'https://support.google.com/business/answer/7091?hl=pl',
    nazwa: 'Pomoc Profilu Firmy w Google: Poprawianie pozycji w lokalnych wynikach wyszukiwania w Google',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/business/answer/3038177?hl=pl',
    nazwa: 'Pomoc Profilu Firmy w Google: Wskazówki na temat umieszczania informacji o firmie w Google',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/contributionpolicy/answer/7400114?hl=pl',
    nazwa: 'Pomoc Map Google: Treści zabronione i podlegające ograniczeniom (fałszywe zaangażowanie)',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/business/answer/14114287?hl=pl',
    nazwa: 'Pomoc Profilu Firmy w Google: Ograniczenia profilu firmy z powodu naruszenia zasad',
    data: '2026-11-05',
  },
];

const ZRODLA_EN = [
  {
    url: 'https://support.google.com/business/answer/7091?hl=en',
    nazwa: 'Google Business Profile Help: Improve your local ranking on Google',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/business/answer/3038177?hl=en',
    nazwa: 'Google Business Profile Help: Guidelines for representing your business on Google',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/contributionpolicy/answer/7400114?hl=en',
    nazwa: 'Google Maps Help: Prohibited and restricted content (fake engagement)',
    data: '2026-11-05',
  },
  {
    url: 'https://support.google.com/business/answer/14114287?hl=en',
    nazwa: 'Google Business Profile Help: Business Profile suspensions and restrictions for policy violations',
    data: '2026-11-05',
  },
];

// Tabela „co jest w cenie” (brief L1, sekcja 2). Kolumna rynku opisuje zakres ofert prowadzenia
// samego profilu, nie konkretne firmy. 5.11.2026: „zwykle 1 punkt albo brak” i „PDF albo brak”
// z briefu zastąpione „różnie”, bo żaden plik danych nie podaje, jak mierzy i raportuje rynek.
const WIERSZE_CENY_PL = [
  { id: 'profil', zakres: 'Kategorie, usługi, opis i godziny', rynek: 'tak', pakiet: 'tak' },
  { id: 'posty', zakres: 'Posty i zdjęcia', rynek: 'zwykle tak', pakiet: 'tak' },
  { id: 'opinie', zakres: 'Odpowiedzi na opinie i proces zbierania opinii', rynek: 'różnie', pakiet: 'tak' },
  { id: 'strona', zakres: 'Strona firmy: podstrony usług, treści, linki', rynek: 'nie', pakiet: 'tak, do 20 fraz, 2 treści i 2 linki miesięcznie' },
  ...(SIATKA_W_SEO_STANDARD
    ? [{ id: 'pomiar', zakres: 'Pomiar pozycji w Mapach', rynek: 'różnie', pakiet: '49 punktów co 14 dni w panelu' }]
    : []),
  { id: 'raport', zakres: 'Raport', rynek: 'różnie', pakiet: 'panel klienta 24/7 i raport miesięczny' },
  { id: 'umowa', zakres: 'Umowa', rynek: 'różnie', pakiet: 'miesięczna, rezygnacja w każdej chwili' },
];

// EN: te same wiersze i ta sama flaga SIATKA_W_SEO_STANDARD.
const WIERSZE_CENY_EN = [
  { id: 'profil', zakres: 'Categories, services, description and opening hours', rynek: 'yes', pakiet: 'yes' },
  { id: 'posty', zakres: 'Posts and photos', rynek: 'usually yes', pakiet: 'yes' },
  { id: 'opinie', zakres: 'Review replies and a review collection process', rynek: 'varies', pakiet: 'yes' },
  { id: 'strona', zakres: 'Your website: service pages, content, links', rynek: 'no', pakiet: 'yes, up to 20 keywords, 2 pieces of content and 2 links per month' },
  ...(SIATKA_W_SEO_STANDARD
    ? [{ id: 'pomiar', zakres: 'Map ranking measurement', rynek: 'varies', pakiet: '49 points every 14 days in the client portal' }]
    : []),
  { id: 'raport', zakres: 'Reporting', rynek: 'varies', pakiet: 'client portal 24/7 and a monthly report' },
  { id: 'umowa', zakres: 'Contract', rynek: 'varies', pakiet: 'monthly, cancel at any time' },
];

// Pomiar poleceń ChatGPT (CB-01 po weryfikacji: 2 wiersze, liczby odtworzone z plików pomiaru
// dane/llm*.json planu i skille/ai-visibility/surowe, 4–5.11.2026). Linki do Map to adresy
// wyszukiwania google.com/maps/search, nie URL-e wizytówek - stąd opis mechanizmu jako obserwacji.
const WIERSZE_CHATGPT_PL = [
  { id: 'polecenie', pytanie: 'Prośba o polecenie firmy (11 odpowiedzi na 10 pytań)', linki: '62', mapy: '59' },
  { id: 'cena-ranking', pytanie: 'Pytanie o cenę, ranking albo funkcję usługi (5 odpowiedzi)', linki: '31', mapy: '0 (cytowane strony www)' },
];

const WIERSZE_CHATGPT_EN = [
  { id: 'polecenie', pytanie: 'Request to recommend a business (11 answers to 10 questions)', linki: '62', mapy: '59' },
  { id: 'cena-ranking', pytanie: 'Question about price, ranking or a service feature (5 answers)', linki: '31', mapy: '0 (cited websites)' },
];

// Poradnik „8 kroków” (brief L1: numerowana lista, bez H3). Tytuł kroku pogrubiony stylem,
// nie <strong> (CLAUDE.md: <strong> tylko znaczeniowo).
const KROKI_PL = [
  ['Zweryfikuj profil i trzymaj go na koncie firmy.', 'Google podaje, że zweryfikowana firma częściej wyświetla się w wynikach. Właścicielem profilu powinno być konto Google Twojej firmy, a agencji albo freelancerowi nadajesz dostęp menedżera, który w każdej chwili możesz odebrać.'],
  ['Wybierz kategorię główną.', 'Sprawdź, jakie kategorie mają firmy z pakietu lokalnego dla Twojej najważniejszej usługi, i wybierz tę, która najdokładniej ją opisuje. Kategorie dodatkowe dodaj tylko dla usług, które naprawdę świadczysz.'],
  ['Uzupełnij usługi i opis.', 'Każda usługa z krótkim opisem: co robisz, dla kogo i gdzie. Opis firmy pisz dla klienta, bez listy fraz, a nazwę zostaw taką, jak na szyldzie.'],
  ['Podaj prawdziwe godziny otwarcia.', 'Ustaw też godziny świąteczne i zmieniaj je z wyprzedzeniem. Klient, który przyjedzie pod zamknięte drzwi, może zostawić opinię, której nie chcesz.'],
  ['Dodawaj własne zdjęcia.', 'Realizacje, zespół, lokal i wejście od ulicy. Zdjęcia ze stocków nic nie mówią o Twojej firmie, a nowe zdjęcia co miesiąc pokazują, że profil jest prowadzony.'],
  ['Publikuj posty.', 'Co najmniej dwa razy w miesiącu: nowa usługa, realizacja, oferta sezonowa albo zmiana godzin. Każdy post z linkiem do właściwej podstrony.'],
  ['Zbieraj opinie i odpowiadaj na każdą.', 'Poproś o opinię po każdej usłudze, wysyłając bezpośredni link e-mailem albo SMS-em. Odpowiadaj w ciągu 48 godzin, także na krytyczne opinie. Nie płać i nie dawaj rabatów za opinie: zasady Google tego zakazują.'],
  ['Ujednolić dane firmy w sieci.', 'Nazwa, adres i telefon (NAP) mają być identyczne w profilu, na stronie i w katalogach branżowych. Różne wersje adresu utrudniają połączenie wzmianek z Twoją firmą.'],
];

const KROKI_EN = [
  ['Verify your profile and keep it under your company account.', 'Google says a verified business is more likely to appear in results. The profile owner should be your company\'s Google account; give an agency or freelancer manager access, which you can revoke at any time.'],
  ['Choose a primary category.', 'Check which categories the businesses in the local pack use for your most important service and pick the one that describes it most precisely. Add secondary categories only for services you actually provide.'],
  ['Fill in services and the description.', 'List every service with a short description: what you do, for whom and where. Write the business description for the customer, not as a list of keywords, and keep the name exactly as it appears on your sign.'],
  ['Enter your real opening hours.', 'Set holiday hours too and update them in advance. A customer who arrives at a closed door may leave a review you do not want.'],
  ['Add your own photos.', 'Completed jobs, the team, the premises and the street entrance. Stock photos say nothing about your business, and new photos every month show that the profile is actively managed.'],
  ['Publish posts.', 'At least twice a month: a new service, a completed job, a seasonal offer or a change in hours. Each post should link to the right page.'],
  ['Collect reviews and reply to every one.', 'Ask for a review after every job by sending a direct link by email or text message. Reply within 48 hours, including to critical reviews. Do not pay for reviews or offer discounts for them: Google\'s policies prohibit it.'],
  ['Make your business details consistent across the web.', 'Name, address and phone number (NAP) should be identical in your profile, on your website and in industry directories. Different versions of an address make it harder to connect mentions with your business.'],
];

const sekcja = { padding: 'clamp(2.5rem, 6vw, 4rem) 0 0' };
const kontener = { maxWidth: '850px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.4vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--color-text-dark)', margin: '0 0 1.25rem', scrollMarginTop: '110px' };
const h3Styl = { fontSize: 'clamp(1.2rem, 2.4vw, 1.4rem)', fontWeight: 700, lineHeight: 1.3, color: 'var(--color-text-dark)', margin: '2rem 0 0.75rem' };
const akapit = { fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--color-text-main)', margin: '0 0 1.1rem' };
const lista = { ...akapit, paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem' };
const link = { color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 };
const podpis = { fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--w-tusz-2)', margin: '-0.4rem 0 1.25rem' };
const karta = { background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

export default function WizytowkaClient({ faqData }) {
  const lang = useLocale();
  const en = lang === 'en';
  const ZRODLA = en ? ZRODLA_EN : ZRODLA_PL;
  const WIERSZE_CENY = en ? WIERSZE_CENY_EN : WIERSZE_CENY_PL;
  const WIERSZE_CHATGPT = en ? WIERSZE_CHATGPT_EN : WIERSZE_CHATGPT_PL;
  const KROKI = en ? KROKI_EN : KROKI_PL;
  // Kotwice: PL jak dotąd, EN po angielsku (FAQ przez idEn w faqData).
  const idCena = en ? 'pricing' : ID_CENA;
  const idFirmaBezLokalu = en ? 'business-without-a-storefront' : 'wizytowka-firmy-bez-lokalu';
  const idPlatna = en ? 'is-google-business-profile-free' : 'czy-wizytowka-google-jest-platna';
  const idEl = (pl, enId) => (en ? enId : pl);
  // Reguła 6.0 planu: link do A2 tylko po jej publikacji; wcześniej ten sam tekst bez <a>.
  const hrefA2 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const kontakt = hash('kontakt', lang);

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* main.subpage-main po okruszkach ma margin-top -76px (globals.css): 136-166 px daje
          60-90 px odstępu pod okruszkami (PozycjonowanieClient: 104 px). */}
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '1rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {en ? 'Google Business Profile · Maps' : 'Profil Firmy w Google · Mapy'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: 'var(--color-text-dark)' }}>
              {en ? 'Google Business Profile optimization (Google Maps listing)' : 'Pozycjonowanie wizytówki Google (Profil Firmy w Google)'}
            </h1>
          </Reveal>

          {/* Krótka odpowiedź: 54 słowa, dosłownie z PLAN-v2 6.6. */}
          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en
              ? 'Google Business Profile optimization is the work of making your profile show up in Google Maps and the local pack when nearby customers search for your service. Google judges a profile on relevance, distance from the searcher and prominence of the business. We measure your ranking from 49 points around your address, because a customer at the other end of the district sees a different ranking than you do.'
              : 'Pozycjonowanie wizytówki Google to praca nad tym, żeby Twój Profil Firmy pokazywał się w Mapach i w pakiecie lokalnym, gdy klienci z okolicy szukają Twojej usługi. Google ocenia trafność profilu, odległość od szukającego i rozpoznawalność firmy. Pozycję mierzymy z 49 punktów wokół adresu, bo klient na drugim końcu dzielnicy widzi inny ranking niż Ty.'}
          </AnswerBox>

          <p style={akapit}>
            {en
              ? 'We manage your profile together with your website in the SEO Standard package from €450 net per month, on a monthly contract. You follow progress in the client portal and see every action in the work log.'
              : 'Wizytówkę prowadzimy razem ze stroną firmy w pakiecie SEO Standard od 1 900 zł netto miesięcznie, z umową miesięczną. Postęp widzisz w panelu klienta, a każde działanie w dzienniku prac.'}
          </p>

          <Byline sciezka={SCIEZKA} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            {/* data-plan="standard": AnalyticsEvents wysyła pricing_plan_click i ustawia pakiet w formularzu. */}
            <a href={kontakt} className="hero-btn-primary" data-cta="service_hero_wizytowka" data-plan="standard">
              {en ? 'Ask about the package with profile management' : 'Zapytaj o pakiet z wizytówką'}
            </a>
            <a href={`#${idCena}`} className="hero-btn-secondary" data-cta="service_hero_wizytowka_cena">
              {en ? 'See what the price includes' : 'Sprawdź, co jest w cenie'}
            </a>
          </div>
        </div>
      </section>

      {/* H2 1: czynniki rankingu lokalnego wg Pomocy Profilu Firmy w Google (odczyt 5.11.2026). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('czynniki', 'ranking-factors')} style={h2Styl}>{en ? 'What decides your Business Profile’s position in Google Maps' : 'Co decyduje o pozycji wizytówki w Mapach Google'}</h2>
          {en ? (
            <p style={akapit}>
              In Google Maps and the local pack, the block of businesses with a map above the organic results, Google shows the profiles that best match the query and the place where the searcher is.{' '}
              <a href={ZRODLA[0].url} rel="noopener" style={link}>Google Business Profile Help</a> lists three main factors: relevance, distance and prominence. Google also notes that you cannot ask for, or pay for, a higher local ranking. Optimizing for Google Maps is therefore work on these three factors, not the purchase of a position.
            </p>
          ) : (
            <p style={akapit}>
              Google pokazuje w Mapach i w pakiecie lokalnym, czyli w bloku firm z mapą nad wynikami organicznymi, te profile, które najlepiej pasują do zapytania i do miejsca, w którym jest szukający.{' '}
              <a href={ZRODLA[0].url} rel="noopener" style={link}>Pomoc Profilu Firmy w Google</a> wymienia trzy główne czynniki: trafność, odległość i rozpoznawalność. Google zaznacza też, że o wyższą pozycję w wynikach lokalnych nie można poprosić ani za nią zapłacić. Pozycjonowanie w Mapach Google (Google Maps) to więc praca nad tymi trzema czynnikami, a nie zakup miejsca.
            </p>
          )}

          <h3 style={h3Styl}>{en ? 'Relevance: primary category, services and description' : 'Trafność: kategoria główna, usługi i opis'}</h3>
          <p style={akapit}>
            {en
              ? 'Relevance describes how closely a profile matches the search term. According to Google, complete and detailed business information helps here. The single biggest lever is the primary category, because it tells Google what the business mainly does. Secondary categories describe the rest of your offer, and a list of services with short descriptions catches queries that no category covers. We write the business description for the customer: what you do, for whom and in which area.'
              : 'Trafność mówi, jak dokładnie profil pasuje do wpisanego hasła. Według Google pomagają w niej kompletne i szczegółowe informacje o firmie. Największą pojedynczą dźwignią jest kategoria główna, bo to ona mówi Google, czym firma zajmuje się przede wszystkim. Kategorie dodatkowe opisują resztę oferty, a lista usług z krótkimi opisami łapie zapytania, których nie pokrywa żadna kategoria. Opis firmy piszemy dla klienta: co robisz, dla kogo i w jakim obszarze.'}
          </p>
          <p style={akapit}>
            {en
              ? 'Adding keywords to your business name is a risk not worth taking. Google’s guidelines prohibit unnecessary information in the name and state plainly that it can lead to a profile suspension. The name in your profile should match the one on your sign and in your company documents.'
              : 'Dopisywanie fraz do nazwy firmy to ryzyko, którego nie warto podejmować. Wytyczne Google zabraniają podawania zbędnych informacji w nazwie i mówią wprost, że może to skończyć się zawieszeniem profilu. Nazwa w profilu ma być taka sama jak na szyldzie i w dokumentach firmy.'}
          </p>

          <h3 style={h3Styl}>{en ? 'Distance: what you cannot change and how to work with it' : 'Odległość: czego nie zmienisz i jak z tym pracować'}</h3>
          {en ? (
            <p style={akapit}>
              Distance is the gap between the business and the searcher. If the customer does not share their location, Google uses other available information about where they are. You cannot optimize this factor: a business usually ranks higher in its own district than at the other end of the city. What you can do is measure how far from your address your visibility reaches and widen that reach through prominence. Businesses that travel to customers show a service area instead of an address. How the ranking is calculated in that case is explained in{' '}
              <a href={`#${idFirmaBezLokalu}`} style={link}>the question about a business without a storefront</a>.
            </p>
          ) : (
            <p style={akapit}>
              Odległość to dystans między firmą a szukającym. Jeśli klient nie udostępni swojej lokalizacji, Google korzysta z innych dostępnych informacji o tym, gdzie jest. Tego czynnika nie da się wypozycjonować: firma zwykle jest wyżej we własnej dzielnicy niż na drugim końcu miasta. Da się za to zmierzyć, jak daleko od adresu sięga jej widoczność, i poszerzać ten zasięg rozpoznawalnością. Firmy, które dojeżdżają do klientów, zamiast adresu pokazują obszar obsługi. Jak wtedy liczy się pozycja, wyjaśniamy w{' '}
              <a href="#wizytowka-firmy-bez-lokalu" style={link}>pytaniu o firmę bez lokalu</a>.
            </p>
          )}

          <h3 style={h3Styl}>{en ? 'Prominence: reviews, mentions and your website' : 'Rozpoznawalność: opinie, wzmianki i strona www'}</h3>
          <p style={akapit}>
            {en
              ? 'Prominence describes how well known the business is. Google’s help pages say it depends, among other things, on the number of websites linking to the business and on the number of reviews: the more there are and the better they are, the higher the likely ranking. That is why we work on three things at once: a steady flow of genuine reviews, mentions in directories and local media, and the company website those mentions point to.'
              : 'Rozpoznawalność opisuje, jak znana jest firma. Pomoc Google podaje, że zależy ona między innymi od liczby witryn z linkami do firmy i od liczby opinii: im jest ich więcej i im są lepsze, tym prawdopodobnie wyższa pozycja. Dlatego pracujemy nad trzema rzeczami naraz: stałym napływem prawdziwych opinii, wzmiankami w katalogach i mediach lokalnych oraz stroną firmy, którą te wzmianki wskazują.'}
          </p>
          {en ? (
            <p style={akapit}>
              Google also lists replying to reviews as a way for a business to stand out from the competition. How to ask a customer for a review and how to answer critical ones is covered in our guide on{' '}
              <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={link}>how to get Google reviews</Link>.
            </p>
          ) : (
            <p style={akapit}>
              Google wymienia też odpowiadanie na opinie jako sposób, żeby firma wyróżniła się na tle konkurencji. Jak poprosić klienta o opinię i jak odpowiadać na krytyczne, opisujemy w poradniku{' '}
              <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={link}>jak pozyskiwać opinie Google</Link>.
            </p>
          )}
        </div>
      </section>

      {/* H2 2: siatka 7×7. Dziś zrzut demo panelu z podpisem „dane przykładowe” (PLAN-v2 6.6, redakcja v2.2);
          skan GRID własnej wizytówki z datą dochodzi później (repo panelu) jako dodanie treści. */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('siatka-7x7', 'map-grid')} style={h2Styl}>{en ? 'How we measure your ranking: the 7×7 grid' : 'Jak mierzymy pozycję wizytówki: siatka 7×7'}</h2>
          <p style={akapit}>
            {en
              ? 'When you check your profile from the office or your own phone, you see the ranking for a single point on the map. A customer a few kilometers away sees a different list, because Google calculates distance from them, not from you. A single check therefore misleads in both directions: your profile can be first at your own address and invisible a few blocks away.'
              : 'Sprawdzając wizytówkę z biura albo z własnego telefonu, widzisz ranking dla jednego punktu na mapie. Klient kilka kilometrów dalej widzi inną listę, bo Google liczy odległość od niego, a nie od Ciebie. Pojedynczy pomiar myli więc w obie strony: wizytówka może być pierwsza pod własnym adresem i niewidoczna kilka przecznic dalej.'}
          </p>
          <p style={akapit}>
            {en
              ? 'That is why we measure from 49 points. We lay a 7-by-7 grid of points around your business address and, at each one, check where your profile ranks in Maps for the agreed keyword. We run the first scan before any changes to the profile and further scans every 14 days, and the result goes to the client portal as a grid of colored points.'
              : 'Dlatego mierzymy pozycję z 49 punktów. Wokół adresu firmy rozkładamy siatkę 7 na 7 punktów i w każdym sprawdzamy, na którym miejscu w Mapach jest wizytówka dla uzgodnionej frazy. Pierwszy skan robimy przed zmianami w profilu, kolejne co 14 dni, a wynik trafia do panelu klienta jako siatka kolorowych punktów.'}
          </p>
          <p style={akapit}>
            {en
              ? 'How to read the result: the number in a point is your profile’s position, and a green point means TOP 3, that is, a place in the local pack. The key metric is the share of points in the TOP 3; the second is the average position where the profile is visible. Two consecutive scans show whether your reach is growing and in which direction.'
              : 'Jak czytać wynik: liczba w punkcie to pozycja wizytówki, a zielony punkt oznacza TOP 3, czyli miejsce w pakiecie lokalnym. Najważniejszy wskaźnik to odsetek punktów w TOP 3, drugi to średnia pozycja tam, gdzie wizytówka jest widoczna. Dwa kolejne skany pokazują, czy zasięg rośnie i w którą stronę.'}
          </p>

          <Reveal>
            <figure style={{ margin: '1.5rem 0 1.5rem' }}>
              <Image
                src="/images/panel/mapy.webp"
                alt={en
                  ? 'The Google Maps tab in the demo client portal: two 7×7 grids showing the profile’s position at each of the 49 points, with green points marking the TOP 3 (sample data)'
                  : 'Zakładka Mapy Google w demo panelu klienta: dwie siatki 7×7 z pozycją wizytówki w każdym z 49 punktów, zielone punkty to TOP 3 (dane przykładowe)'}
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 850px"
                style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)' }}
              />
              <figcaption style={{ ...podpis, margin: '0.75rem 0 0' }}>
                {en
                  ? '7×7 grid: the position of the fictional Stolarnia Demo (Demo Carpentry) profile at 49 points 1 km apart, scan from October 27, 2026, sample data from the demo portal.'
                  : 'Siatka 7×7: pozycja wizytówki fikcyjnej Stolarni Demo w 49 punktach co 1 km, skan z 27.10.2026, dane przykładowe z demo panelu.'}
              </figcaption>
            </figure>
          </Reveal>

          <p style={akapit}>
            {en
              ? 'In the screenshot, for the keyword “stolarz” (carpenter), Stolarnia Demo is in the TOP 3 at 5 of 49 points (10%), all of them right next to the business address, and ranks between 4th and 8th at the remaining points. That picture says the profile is relevant, but its reach needs to be widened through prominence: reviews, mentions and links.'
              : 'Na zrzucie Stolarnia Demo dla frazy „stolarz” jest w TOP 3 w 5 z 49 punktów (10%), wszystkich tuż przy adresie firmy, a w pozostałych punktach zajmuje miejsca od 4 do 8. Taki obraz mówi, że profil jest trafny, ale jego zasięg trzeba poszerzać rozpoznawalnością: opiniami, wzmiankami i linkami.'}
          </p>
          {en ? (
            <p style={akapit}>
              What else the{' '}
              <Link href="/panel-klienta" style={link}>49-point measurement in the client portal</Link> shows is described on a separate page. You can also see the grid in the{' '}
              <a href={PANEL_DEMO_URL} data-cta="wizytowka_demo" style={link}>demo portal</a> (in Polish) without logging in.
            </p>
          ) : (
            <p style={akapit}>
              Co jeszcze pokazuje{' '}
              <Link href="/panel-klienta" style={link}>pomiar z 49 punktów w panelu klienta</Link>, opisujemy na osobnej stronie. Siatkę możesz też obejrzeć w{' '}
              <a href={PANEL_DEMO_URL} data-cta="wizytowka_demo" style={link}>demo panelu</a> bez logowania.
            </p>
          )}
        </div>
      </section>

      {/* H2 3: optymalizacja (start) i zarządzanie (co miesiąc); lista z playbooka 7.2 (proces LOK). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('zarzadzanie', 'management')} style={h2Styl}>{en ? 'Business Profile optimization and monthly management' : 'Optymalizacja i zarządzanie wizytówką Google co miesiąc'}</h2>
          <p style={akapit}>
            {en
              ? 'Optimizing a Google Business Profile means getting the profile in order at the start. Managing it is ongoing work, because reviews, photos and posts go stale and your competitors maintain their profiles too. Google Business Profile is the former Google My Business, so optimizing a Google My Business listing means exactly the same service. The package covers both.'
              : 'Optymalizacja wizytówki Google to uporządkowanie profilu na starcie. Zarządzanie wizytówką Google to praca, która trwa, bo opinie, zdjęcia i posty się starzeją, a konkurencja też prowadzi swoje profile. Profil Firmy w Google to dawne Google Moja Firma, więc pozycjonowanie wizytówki Google Moja Firma oznacza dokładnie tę samą usługę. W pakiecie robimy jedno i drugie.'}
          </p>

          <h3 style={h3Styl}>{en ? 'At the start: profile optimization' : 'Na starcie: optymalizacja profilu'}</h3>
          {en ? (
            <ul style={lista}>
              <li>We check that the profile is verified and belongs to your company’s account. We get manager access, which you can revoke at any time.</li>
              <li>We choose the primary and secondary categories to match the queries your customers type, and compare them with the categories of businesses in the local pack.</li>
              <li>We fill in services with descriptions, opening hours (including holidays), attributes, the service area and a link to the right page.</li>
              <li>We make the name, address and phone number (NAP) consistent in the profile, on your website and in directories.</li>
              {SIATKA_W_SEO_STANDARD && <li>We run the first 7×7 grid scan so there is a baseline to compare later scans against.</li>}
            </ul>
          ) : (
            <ul style={lista}>
              <li>Sprawdzamy, czy profil jest zweryfikowany i należy do konta Twojej firmy. My dostajemy dostęp menedżera, który możesz odebrać w każdej chwili.</li>
              <li>Dobieramy kategorię główną i dodatkowe do zapytań, które wpisują Twoi klienci, i porównujemy je z kategoriami firm z pakietu lokalnego.</li>
              <li>Uzupełniamy usługi z opisami, godziny otwarcia (także świąteczne), atrybuty, obszar obsługi i link do właściwej podstrony.</li>
              <li>Ujednolicamy nazwę, adres i telefon (NAP) w profilu, na stronie i w katalogach.</li>
              {SIATKA_W_SEO_STANDARD && <li>Robimy pierwszy skan siatką 7×7, żeby było z czym porównać kolejne.</li>}
            </ul>
          )}

          <h3 style={h3Styl}>{en ? 'Every month: managing your Business Profile' : 'Co miesiąc: prowadzenie wizytówki Google'}</h3>
          {en ? (
            <ul style={lista}>
              <li>Posts at least twice a month: completed jobs, new services, seasonal offers.</li>
              <li>New photos of completed jobs, the team and the premises, no stock photos.</li>
              <li>Review requests after each job with a direct link, to send by email or text message.</li>
              <li>A reply to every review within 48 hours, including critical ones.</li>
              <li>Listings in industry directories and local links: media, organizations, partners.</li>
              {SIATKA_W_SEO_STANDARD && <li>A grid scan every 14 days and a report in the portal: what we did and how your ranking changed.</li>}
            </ul>
          ) : (
            <ul style={lista}>
              <li>Posty co najmniej dwa razy w miesiącu: realizacje, nowe usługi, oferty sezonowe.</li>
              <li>Nowe zdjęcia z realizacji, zespołu i lokalu, bez zdjęć ze stocków.</li>
              <li>Prośby o opinię po usłudze z bezpośrednim linkiem, do wysłania e-mailem albo SMS-em.</li>
              <li>Odpowiedź na każdą opinię w ciągu 48 godzin, także na krytyczną.</li>
              <li>Wpisy w katalogach branżowych i lokalne linki: media, organizacje, partnerzy.</li>
              {SIATKA_W_SEO_STANDARD && <li>Skan siatką co 14 dni i raport w panelu: co zrobiliśmy i jak zmieniła się pozycja.</li>}
            </ul>
          )}
          <p style={akapit}>
            {en
              ? 'Every action goes into the work log in the portal with a date and the number of hours, so you can see what you are paying for.'
              : 'Każde działanie trafia do dziennika prac w panelu z datą i liczbą godzin, więc widzisz, za co płacisz.'}
          </p>
        </div>
      </section>

      {/* H2 4: cena. Akapit dosłownie z CB-02 (po weryfikacji), podpis źródła widełek dosłownie z planu,
          drugi przedział z AV-08 (Perplexity, odpowiedź z 4.11.2026, surowe/q12_perplexity.json). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idCena} style={h2Styl}>{en ? 'How much Google Business Profile optimization costs' : 'Ile kosztuje pozycjonowanie wizytówki Google'}</h2>
          {en ? (
            <p style={akapit}>
              Agencies and freelancers usually manage a profile on its own for PLN 100–600 per month, and from PLN 800 in competitive industries. Our SEO Standard package costs <strong>from €450 net per month</strong>, because besides the profile it covers website optimization, up to 20 keywords, 2 pieces of content and 2 links per month{SIATKA_W_SEO_STANDARD ? ', plus Maps ranking measurement from 49 points every 14 days' : ''}. The contract is monthly.
            </p>
          ) : (
            <p style={akapit}>
              Samą wizytówkę agencje i freelancerzy prowadzą zwykle za 100–600 zł miesięcznie, w konkurencyjnych branżach od 800 zł. Nasz pakiet SEO Standard kosztuje <strong>od 1 900 zł netto miesięcznie</strong>, bo poza wizytówką obejmuje optymalizację strony, do 20 fraz, 2 treści i 2 linki miesięcznie{SIATKA_W_SEO_STANDARD ? ' oraz pomiar pozycji w Mapach z 49 punktów co 14 dni' : ''}. Umowa jest miesięczna.
            </p>
          )}
          <p style={podpis}>{en ? 'Market ranges: guide on dawidgicala.pl, checked on November 5, 2026' : 'Widełki rynkowe: poradnik dawidgicala.pl, sprawdzone 5.11.2026'}</p>
          <p style={akapit}>
            {en
              ? 'Perplexity, asked on November 4, 2026 who optimizes Google Business Profiles in Warsaw and what it costs, divides the market in a similar way. According to that answer, simple management of the profile alone costs around PLN 250–600 net per month, while local SEO covering the profile, website, reviews and links usually costs PLN 1,000–2,500 net per month. Our package falls in the second range.'
              : 'Podobnie dzieli rynek Perplexity zapytany 4.11.2026, kto w Warszawie pozycjonuje wizytówki Google i ile to kosztuje. Według tej odpowiedzi prosta obsługa samej wizytówki kosztuje około 250–600 zł netto miesięcznie, a lokalne SEO obejmujące wizytówkę, stronę, opinie i linki zwykle 1 000–2 500 zł netto miesięcznie. Nasz pakiet mieści się w drugim przedziale.'}
          </p>

          <CompareTable
            id={idEl('co-jest-w-cenie', 'whats-included')}
            caption={en ? 'What the price includes: the profile alone vs the SEO Standard package' : 'Co jest w cenie: sama wizytówka a pakiet SEO Standard'}
            columns={en
              ? [
                  { key: 'zakres', label: 'Scope' },
                  { key: 'rynek', label: 'Profile only (typical on the market)' },
                  { key: 'pakiet', label: 'SEO Standard from €450 net/mo.' },
                ]
              : [
                  { key: 'zakres', label: 'Zakres' },
                  { key: 'rynek', label: 'Sama wizytówka (typowo na rynku)' },
                  { key: 'pakiet', label: 'SEO Standard od 1 900 zł netto/mies.' },
                ]}
            rows={WIERSZE_CENY}
            przypis={en
              ? 'The “profile only” column describes the typical scope of offers for managing the profile alone, not specific companies; “varies” means it depends on the offer.'
              : 'Kolumna „sama wizytówka” opisuje typowy zakres ofert prowadzenia samego profilu, a nie konkretne firmy; „różnie” znaczy, że zależy to od oferty.'}
          />

          {en ? (
            <p style={akapit}>
              The Google Business Profile itself is free: you pay for the work, not for a place in Maps (details in the question{' '}
              <a href={`#${idPlatna}`} style={link}>is a Google Business Profile free</a>). You can compare the full scope of the SEO Standard and SEO Premium packages on the{' '}
              <Link href="/cennik-pozycjonowania" style={link}>SEO pricing page</Link>.
            </p>
          ) : (
            <p style={akapit}>
              Sam Profil Firmy w Google jest bezpłatny: płacisz za pracę, a nie za miejsce w Mapach (szczegóły w pytaniu{' '}
              <a href="#czy-wizytowka-google-jest-platna" style={link}>czy wizytówka Google jest płatna</a>). Pełny zakres pakietów SEO Standard i SEO Premium porównasz w{' '}
              <Link href="/cennik-pozycjonowania" style={link}>cenniku pozycjonowania</Link>.
            </p>
          )}
          <div style={{ margin: '1.75rem 0 0' }}>
            <a href={kontakt} className="btn btn-primary" data-cta="service_cena_wizytowka" data-plan="standard">
              {en ? 'Ask about the package with profile management – reply within 24 h' : <>Zapytaj o pakiet z wizytówką – odpowiedź w{' '}24{' '}h</>}
            </a>
          </div>
        </div>
      </section>

      {/* H2 5: ChatGPT (CB-01): nagłówek 53 zn., 2 wiersze tabeli, metoda pod tabelą, link do A2 warunkowy. */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('wizytowka-a-chatgpt', 'chatgpt')} style={h2Styl}>{en ? 'Business Profile and ChatGPT: recommendations lead to Google Maps' : 'Wizytówka a ChatGPT: polecenia prowadzą do Map Google'}</h2>
          <p style={akapit}>
            {en
              ? 'We checked where the links go when ChatGPT recommends a business. On November 4–5, 2026 we asked it 10 requests to recommend a business, including a carpenter, a plumber, an accounting firm and an SEO agency in Warsaw, Kraków and Poznań, plus questions about prices, rankings and service features.'
              : 'Sprawdziliśmy, dokąd prowadzą linki, gdy ChatGPT poleca firmę. W dniach 4–5 listopada 2026 zadaliśmy mu 10 próśb o polecenie firmy, m.in. stolarza, hydraulika, biura rachunkowego i agencji SEO w Warszawie, Krakowie i Poznaniu, oraz pytania o ceny, rankingi i funkcje usług.'}
          </p>

          <CompareTable
            id={idEl('chatgpt-linki-do-map', 'chatgpt-links-to-maps')}
            caption={en ? 'Where the links in ChatGPT answers lead (Nov 4–5, 2026)' : 'Dokąd prowadzą linki w odpowiedziach ChatGPT (4–5.11.2026)'}
            columns={en
              ? [
                  { key: 'pytanie', label: 'Type of question' },
                  { key: 'linki', label: 'Links in answers' },
                  { key: 'mapy', label: 'Of which to Google Maps' },
                ]
              : [
                  { key: 'pytanie', label: 'Rodzaj pytania' },
                  { key: 'linki', label: 'Linki w odpowiedziach' },
                  { key: 'mapy', label: 'W tym do Map Google' },
                ]}
            rows={WIERSZE_CHATGPT}
            minWidth={520}
            przypis={en
              ? 'Method: gpt-4.1-mini with web search via the DataForSEO API, search location Warsaw (also for the Kraków and Poznań questions), 1 answer per question, Nov 4–5, 2026. Links to Maps are Google Maps search URLs (google.com/maps/search). The ChatGPT app may answer differently.'
              : 'Metoda: gpt-4.1-mini z wyszukiwaniem w sieci przez API DataForSEO, lokalizacja wyszukiwania Warszawa (także dla pytań o Kraków i Poznań), 1 odpowiedź na pytanie, 4–5.11.2026. Linki do Map to adresy wyszukiwania w Mapach Google (google.com/maps/search). Aplikacja ChatGPT może odpowiadać inaczej.'}
          />

          <p style={akapit}>
            {en
              ? 'When it recommends a business, ChatGPT gives the address and opening hours, and the link leads to Google Maps, where the customer sees the Business Profile. In the two questions about who optimizes Google Business Profiles in Warsaw, 9 of 10 links led to Maps. The measurement shows where the links lead, not where the model gets its knowledge, so we do not claim that Maps is its only source. The practical conclusion is simpler: a well-kept profile answers the request “recommend”, and a website with a clear price answers the question “how much”.'
              : 'Przy poleceniu ChatGPT podaje adres i godziny otwarcia, a link prowadzi do Map Google, gdzie klient widzi wizytówkę. W dwóch pytaniach o to, kto w Warszawie pozycjonuje wizytówki Google, do Map prowadziło 9 z 10 linków. Pomiar pokazuje, dokąd prowadzą linki, a nie skąd model bierze wiedzę, więc nie twierdzimy, że Mapy są jego jedynym źródłem. Wniosek praktyczny jest prostszy: zadbana wizytówka odpowiada na prośbę „poleć”, a strona z jawną ceną na pytanie „ile”.'}
          </p>
          <p style={akapit}>
            {en ? 'That is where we start with' : 'Od tego samego zaczynamy'}{' '}
            {en
              ? (hrefA2 ? <Link href={hrefA2} style={link}>ChatGPT optimization</Link> : 'ChatGPT optimization')
              : (hrefA2 ? <Link href={hrefA2} style={link}>pozycjonowanie w ChatGPT</Link> : 'pozycjonowanie w ChatGPT')}
            {en ? ': a Business Profile and a website with a clear offer and price.' : ': od wizytówki i strony z jasną ofertą i ceną.'}
          </p>
        </div>
      </section>

      {/* H2 6: poradnik „jak samodzielnie” (format z TOP 7 SERP, brief L1). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('krok-po-kroku', 'step-by-step')} style={h2Styl}>{en ? 'How to optimize your Google Business Profile yourself: 8 steps' : 'Jak pozycjonować wizytówkę Google samodzielnie: 8 kroków'}</h2>
          <p style={akapit}>
            {en
              ? 'If you want to optimize your Google Business Profile yourself, start with these eight steps. You do the first four once and fix them when something changes in your business. The other four take regularity over many months.'
              : 'Jeśli chcesz wypozycjonować wizytówkę Google samodzielnie, zacznij od tych ośmiu kroków. Pierwsze cztery robisz raz i poprawiasz przy zmianach w firmie. Pozostałe cztery wymagają regularności przez wiele miesięcy.'}
          </p>
          <ol style={{ ...lista, gap: '0.9rem' }}>
            {KROKI.map(([tytul, opis]) => (
              <li key={tytul}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>{tytul}</span> {opis}
              </li>
            ))}
          </ol>
          <p style={akapit}>
            {en
              ? 'When should you hand over profile management? When steps 5–8 lose out to everyday work, when your ranking stands still despite a complete profile, or when you do not know whether changes work beyond your own street because you have no measurement from many points.'
              : 'Kiedy zlecić prowadzenie wizytówki? Gdy kroki 5–8 przegrywają z codzienną pracą, gdy pozycja stoi mimo uzupełnionego profilu albo gdy nie wiesz, czy zmiany działają poza Twoją ulicą, bo nie masz pomiaru z wielu punktów.'}
          </p>
        </div>
      </section>

      {/* H2 7: wizytówka i strona; linki z planu: /seo-lokalne-warszawa i /pozycjonowanie-stron-internetowych
          (anchory z 6.6) + case Madame Thai bez nowych liczb (brief L1, information gain 4).
          EN: wpis „wyniki-wdrozen-seo-2026” nie ma wersji EN, więc case Madame Thai bez linku. */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={idEl('wizytowka-i-strona', 'profile-and-website')} style={h2Styl}>{en ? 'Business Profile and website: why you need both' : 'Wizytówka i strona: dlaczego oba'}</h2>
          <p style={akapit}>
            {en
              ? 'Your profile answers queries in Maps and the local pack. Your website works in the organic results below the map and answers questions about price and scope of services, and for questions about prices ChatGPT cites websites. The two reinforce each other: the link in the profile takes the customer to the right page, and Google lists the number of websites linking to a business among its prominence signals.'
              : 'Wizytówka odpowiada na zapytania w Mapach i w pakiecie lokalnym. Strona pracuje w wynikach organicznych pod mapą i odpowiada na pytania o cenę i zakres usług, a przy pytaniach o ceny ChatGPT cytuje właśnie strony www. Oba elementy się wzmacniają: link w profilu prowadzi klienta do właściwej podstrony, a liczbę witryn z linkami do firmy Google wymienia wśród sygnałów rozpoznawalności.'}
          </p>
          {en ? (
            <p style={akapit}>
              That is why in the SEO Standard package we manage the profile together with the website. How this works for businesses operating in a single city is shown on the{' '}
              <Link href="/seo-lokalne-warszawa" style={link}>local SEO in Warsaw</Link> page, and how we work on the website itself is described in the{' '}
              <Link href="/pozycjonowanie-stron-internetowych" style={link}>business website SEO</Link> service. An example of a local business from our practice is the Madame Thai case in our roundup of SEO results (available in Polish).
            </p>
          ) : (
            <p style={akapit}>
              Dlatego w pakiecie SEO Standard prowadzimy wizytówkę razem ze stroną. Jak to wygląda dla firm działających w jednym mieście, pokazujemy na stronie{' '}
              <Link href="/seo-lokalne-warszawa" style={link}>SEO lokalne w Warszawie</Link>, a jak pracujemy nad samą stroną, w opisie usługi{' '}
              <Link href="/pozycjonowanie-stron-internetowych" style={link}>pozycjonowanie strony firmowej</Link>. Przykład lokalnej firmy z naszej praktyki to{' '}
              <Link href="/blog/wyniki-wdrozen-seo-2026#madame-thai" style={link}>case Madame Thai</Link> w podsumowaniu wdrożeń.
            </p>
          )}

          <Zrodla zrodla={ZRODLA} en={en} />
        </div>
      </section>

      <AppleFaq
        faqData={faqData}
        title={en ? 'Questions about Google Business Profile optimization' : 'Pytania o pozycjonowanie wizytówki Google'}
        sectionId={idEl('pytania', 'faq')}
      />

      {/* CTA przed formularzem: pakiet SEO Standard wybrany w formularzu (data-plan). */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container" style={kontener}>
          <div style={{ ...karta, textAlign: 'center' }}>
            <p style={{ ...akapit, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              {en
                ? 'Want more customers nearby to find you in Maps? Tell us what you do and where, and we will reply within 24 hours on business days.'
                : 'Chcesz, żeby klienci z okolicy częściej znajdowali Cię w Mapach? Napisz, czym się zajmujesz i gdzie, a odpowiemy w ciągu 24 godzin w dni robocze.'}
            </p>
            <a href={kontakt} className="btn btn-primary" data-cta="service_bottom_wizytowka" data-plan="standard">
              {en ? 'Ask about the package with profile management' : 'Zapytaj o pakiet z wizytówką'}
            </a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
