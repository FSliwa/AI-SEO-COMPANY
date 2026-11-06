'use client';

// L1 /pozycjonowanie-wizytowki-google: treść strony (PLAN-v2 6.6; wzorzec PozycjonowanieClient.jsx).
// 5.11.2026. Tylko PL (strona zwraca 404 dla /en), więc teksty bez wersji EN.
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

const SCIEZKA = '/pozycjonowanie-wizytowki-google';

// DO POTWIERDZENIA PRZEZ FILIPA przed publikacją (PLAN-v2 6.6 „Akceptacja”, CB-02):
// czy pomiar siatką 7×7 (49 punktów co 14 dni) jest w pakiecie SEO Standard. Kod potwierdza
// tylko moduł Map w panelu (PanelPageClient.jsx), nie zakres pakietu; demo panelu ma SEO Premium.
// false = zdania i wiersz tabeli o 49 punktach w pakiecie znikają z sekcji #cena i z listy prac.
// Title, meta i opis Service (rejestr publikacji, ServiceSchema) zmienia wtedy Integracja.
const SIATKA_W_SEO_STANDARD = true;

// Kotwica sekcji ceny wprost z planu (6.6: id="cena"); nie ma jej w lib/anchors.js, bo strona jest tylko PL.
const ID_CENA = 'cena';

const ZRODLA = [
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

// Tabela „co jest w cenie” (brief L1, sekcja 2). Kolumna rynku opisuje zakres ofert prowadzenia
// samego profilu, nie konkretne firmy. 5.11.2026: „zwykle 1 punkt albo brak” i „PDF albo brak”
// z briefu zastąpione „różnie”, bo żaden plik danych nie podaje, jak mierzy i raportuje rynek.
const WIERSZE_CENY = [
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

// Pomiar poleceń ChatGPT (CB-01 po weryfikacji: 2 wiersze, liczby odtworzone z plików pomiaru
// dane/llm*.json planu i skille/ai-visibility/surowe, 4–5.11.2026). Linki do Map to adresy
// wyszukiwania google.com/maps/search, nie URL-e wizytówek - stąd opis mechanizmu jako obserwacji.
const WIERSZE_CHATGPT = [
  { id: 'polecenie', pytanie: 'Prośba o polecenie firmy (11 odpowiedzi na 10 pytań)', linki: '62', mapy: '59' },
  { id: 'cena-ranking', pytanie: 'Pytanie o cenę, ranking albo funkcję usługi (5 odpowiedzi)', linki: '31', mapy: '0 (cytowane strony www)' },
];

// Poradnik „8 kroków” (brief L1: numerowana lista, bez H3). Tytuł kroku pogrubiony stylem,
// nie <strong> (CLAUDE.md: <strong> tylko znaczeniowo).
const KROKI = [
  ['Zweryfikuj profil i trzymaj go na koncie firmy.', 'Google podaje, że zweryfikowana firma częściej wyświetla się w wynikach. Właścicielem profilu powinno być konto Google Twojej firmy, a agencji albo freelancerowi nadajesz dostęp menedżera, który w każdej chwili możesz odebrać.'],
  ['Wybierz kategorię główną.', 'Sprawdź, jakie kategorie mają firmy z pakietu lokalnego dla Twojej najważniejszej usługi, i wybierz tę, która najdokładniej ją opisuje. Kategorie dodatkowe dodaj tylko dla usług, które naprawdę świadczysz.'],
  ['Uzupełnij usługi i opis.', 'Każda usługa z krótkim opisem: co robisz, dla kogo i gdzie. Opis firmy pisz dla klienta, bez listy fraz, a nazwę zostaw taką, jak na szyldzie.'],
  ['Podaj prawdziwe godziny otwarcia.', 'Ustaw też godziny świąteczne i zmieniaj je z wyprzedzeniem. Klient, który przyjedzie pod zamknięte drzwi, może zostawić opinię, której nie chcesz.'],
  ['Dodawaj własne zdjęcia.', 'Realizacje, zespół, lokal i wejście od ulicy. Zdjęcia ze stocków nic nie mówią o Twojej firmie, a nowe zdjęcia co miesiąc pokazują, że profil jest prowadzony.'],
  ['Publikuj posty.', 'Co najmniej dwa razy w miesiącu: nowa usługa, realizacja, oferta sezonowa albo zmiana godzin. Każdy post z linkiem do właściwej podstrony.'],
  ['Zbieraj opinie i odpowiadaj na każdą.', 'Poproś o opinię po każdej usłudze, wysyłając bezpośredni link e-mailem albo SMS-em. Odpowiadaj w ciągu 48 godzin, także na krytyczne opinie. Nie płać i nie dawaj rabatów za opinie: zasady Google tego zakazują.'],
  ['Ujednolić dane firmy w sieci.', 'Nazwa, adres i telefon (NAP) mają być identyczne w profilu, na stronie i w katalogach branżowych. Różne wersje adresu utrudniają połączenie wzmianek z Twoją firmą.'],
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
  const lang = 'pl';
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
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Profil Firmy w Google · Mapy
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: 'var(--color-text-dark)' }}>
              Pozycjonowanie wizytówki Google (Profil Firmy w Google)
            </h1>
          </Reveal>

          {/* Krótka odpowiedź: 54 słowa, dosłownie z PLAN-v2 6.6. */}
          <AnswerBox>
            Pozycjonowanie wizytówki Google to praca nad tym, żeby Twój Profil Firmy pokazywał się w Mapach i w pakiecie lokalnym, gdy klienci z okolicy szukają Twojej usługi. Google ocenia trafność profilu, odległość od szukającego i rozpoznawalność firmy. Pozycję mierzymy z 49 punktów wokół adresu, bo klient na drugim końcu dzielnicy widzi inny ranking niż Ty.
          </AnswerBox>

          <p style={akapit}>
            Wizytówkę prowadzimy razem ze stroną firmy w pakiecie SEO Standard od 1 900 zł netto miesięcznie, z umową miesięczną. Postęp widzisz w panelu klienta, a każde działanie w dzienniku prac.
          </p>

          <Byline sciezka={SCIEZKA} />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            {/* data-plan="standard": AnalyticsEvents wysyła pricing_plan_click i ustawia pakiet w formularzu. */}
            <a href={kontakt} className="hero-btn-primary" data-cta="service_hero_wizytowka" data-plan="standard">
              Zapytaj o pakiet z wizytówką
            </a>
            <a href={`#${ID_CENA}`} className="hero-btn-secondary" data-cta="service_hero_wizytowka_cena">
              Sprawdź, co jest w cenie
            </a>
          </div>
        </div>
      </section>

      {/* H2 1: czynniki rankingu lokalnego wg Pomocy Profilu Firmy w Google (odczyt 5.11.2026). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="czynniki" style={h2Styl}>Co decyduje o pozycji wizytówki w Mapach Google</h2>
          <p style={akapit}>
            Google pokazuje w Mapach i w pakiecie lokalnym, czyli w bloku firm z mapą nad wynikami organicznymi, te profile, które najlepiej pasują do zapytania i do miejsca, w którym jest szukający.{' '}
            <a href={ZRODLA[0].url} rel="noopener" style={link}>Pomoc Profilu Firmy w Google</a> wymienia trzy główne czynniki: trafność, odległość i rozpoznawalność. Google zaznacza też, że o wyższą pozycję w wynikach lokalnych nie można poprosić ani za nią zapłacić. Pozycjonowanie w Mapach Google (Google Maps) to więc praca nad tymi trzema czynnikami, a nie zakup miejsca.
          </p>

          <h3 style={h3Styl}>Trafność: kategoria główna, usługi i opis</h3>
          <p style={akapit}>
            Trafność mówi, jak dokładnie profil pasuje do wpisanego hasła. Według Google pomagają w niej kompletne i szczegółowe informacje o firmie. Największą pojedynczą dźwignią jest kategoria główna, bo to ona mówi Google, czym firma zajmuje się przede wszystkim. Kategorie dodatkowe opisują resztę oferty, a lista usług z krótkimi opisami łapie zapytania, których nie pokrywa żadna kategoria. Opis firmy piszemy dla klienta: co robisz, dla kogo i w jakim obszarze.
          </p>
          <p style={akapit}>
            Dopisywanie fraz do nazwy firmy to ryzyko, którego nie warto podejmować. Wytyczne Google zabraniają podawania zbędnych informacji w nazwie i mówią wprost, że może to skończyć się zawieszeniem profilu. Nazwa w profilu ma być taka sama jak na szyldzie i w dokumentach firmy.
          </p>

          <h3 style={h3Styl}>Odległość: czego nie zmienisz i jak z tym pracować</h3>
          <p style={akapit}>
            Odległość to dystans między firmą a szukającym. Jeśli klient nie udostępni swojej lokalizacji, Google korzysta z innych dostępnych informacji o tym, gdzie jest. Tego czynnika nie da się wypozycjonować: firma zwykle jest wyżej we własnej dzielnicy niż na drugim końcu miasta. Da się za to zmierzyć, jak daleko od adresu sięga jej widoczność, i poszerzać ten zasięg rozpoznawalnością. Firmy, które dojeżdżają do klientów, zamiast adresu pokazują obszar obsługi. Jak wtedy liczy się pozycja, wyjaśniamy w{' '}
            <a href="#wizytowka-firmy-bez-lokalu" style={link}>pytaniu o firmę bez lokalu</a>.
          </p>

          <h3 style={h3Styl}>Rozpoznawalność: opinie, wzmianki i strona www</h3>
          <p style={akapit}>
            Rozpoznawalność opisuje, jak znana jest firma. Pomoc Google podaje, że zależy ona między innymi od liczby witryn z linkami do firmy i od liczby opinii: im jest ich więcej i im są lepsze, tym prawdopodobnie wyższa pozycja. Dlatego pracujemy nad trzema rzeczami naraz: stałym napływem prawdziwych opinii, wzmiankami w katalogach i mediach lokalnych oraz stroną firmy, którą te wzmianki wskazują.
          </p>
          <p style={akapit}>
            Google wymienia też odpowiadanie na opinie jako sposób, żeby firma wyróżniła się na tle konkurencji. Jak poprosić klienta o opinię i jak odpowiadać na krytyczne, opisujemy w poradniku{' '}
            <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={link}>jak pozyskiwać opinie Google</Link>.
          </p>
        </div>
      </section>

      {/* H2 2: siatka 7×7. Dziś zrzut demo panelu z podpisem „dane przykładowe” (PLAN-v2 6.6, redakcja v2.2);
          skan GRID własnej wizytówki z datą dochodzi później (repo panelu) jako dodanie treści. */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="siatka-7x7" style={h2Styl}>Jak mierzymy pozycję wizytówki: siatka 7×7</h2>
          <p style={akapit}>
            Sprawdzając wizytówkę z biura albo z własnego telefonu, widzisz ranking dla jednego punktu na mapie. Klient kilka kilometrów dalej widzi inną listę, bo Google liczy odległość od niego, a nie od Ciebie. Pojedynczy pomiar myli więc w obie strony: wizytówka może być pierwsza pod własnym adresem i niewidoczna kilka przecznic dalej.
          </p>
          <p style={akapit}>
            Dlatego mierzymy pozycję z 49 punktów. Wokół adresu firmy rozkładamy siatkę 7 na 7 punktów i w każdym sprawdzamy, na którym miejscu w Mapach jest wizytówka dla uzgodnionej frazy. Pierwszy skan robimy przed zmianami w profilu, kolejne co 14 dni, a wynik trafia do panelu klienta jako siatka kolorowych punktów.
          </p>
          <p style={akapit}>
            Jak czytać wynik: liczba w punkcie to pozycja wizytówki, a zielony punkt oznacza TOP 3, czyli miejsce w pakiecie lokalnym. Najważniejszy wskaźnik to odsetek punktów w TOP 3, drugi to średnia pozycja tam, gdzie wizytówka jest widoczna. Dwa kolejne skany pokazują, czy zasięg rośnie i w którą stronę.
          </p>

          <Reveal>
            <figure style={{ margin: '1.5rem 0 1.5rem' }}>
              <Image
                src="/images/panel/mapy.webp"
                alt="Zakładka Mapy Google w demo panelu klienta: dwie siatki 7×7 z pozycją wizytówki w każdym z 49 punktów, zielone punkty to TOP 3 (dane przykładowe)"
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 850px"
                style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)' }}
              />
              <figcaption style={{ ...podpis, margin: '0.75rem 0 0' }}>
                Siatka 7×7: pozycja wizytówki fikcyjnej Stolarni Demo w 49 punktach co 1 km, skan z 27.10.2026, dane przykładowe z demo panelu.
              </figcaption>
            </figure>
          </Reveal>

          <p style={akapit}>
            Na zrzucie Stolarnia Demo dla frazy „stolarz” jest w TOP 3 w 5 z 49 punktów (10%), wszystkich tuż przy adresie firmy, a w pozostałych punktach zajmuje miejsca od 4 do 8. Taki obraz mówi, że profil jest trafny, ale jego zasięg trzeba poszerzać rozpoznawalnością: opiniami, wzmiankami i linkami.
          </p>
          <p style={akapit}>
            Co jeszcze pokazuje{' '}
            <Link href="/panel-klienta" style={link}>pomiar z 49 punktów w panelu klienta</Link>, opisujemy na osobnej stronie. Siatkę możesz też obejrzeć w{' '}
            <a href={PANEL_DEMO_URL} data-cta="wizytowka_demo" style={link}>demo panelu</a> bez logowania.
          </p>
        </div>
      </section>

      {/* H2 3: optymalizacja (start) i zarządzanie (co miesiąc); lista z playbooka 7.2 (proces LOK). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="zarzadzanie" style={h2Styl}>Optymalizacja i zarządzanie wizytówką Google co miesiąc</h2>
          <p style={akapit}>
            Optymalizacja wizytówki Google to uporządkowanie profilu na starcie. Zarządzanie wizytówką Google to praca, która trwa, bo opinie, zdjęcia i posty się starzeją, a konkurencja też prowadzi swoje profile. Profil Firmy w Google to dawne Google Moja Firma, więc pozycjonowanie wizytówki Google Moja Firma oznacza dokładnie tę samą usługę. W pakiecie robimy jedno i drugie.
          </p>

          <h3 style={h3Styl}>Na starcie: optymalizacja profilu</h3>
          <ul style={lista}>
            <li>Sprawdzamy, czy profil jest zweryfikowany i należy do konta Twojej firmy. My dostajemy dostęp menedżera, który możesz odebrać w każdej chwili.</li>
            <li>Dobieramy kategorię główną i dodatkowe do zapytań, które wpisują Twoi klienci, i porównujemy je z kategoriami firm z pakietu lokalnego.</li>
            <li>Uzupełniamy usługi z opisami, godziny otwarcia (także świąteczne), atrybuty, obszar obsługi i link do właściwej podstrony.</li>
            <li>Ujednolicamy nazwę, adres i telefon (NAP) w profilu, na stronie i w katalogach.</li>
            {SIATKA_W_SEO_STANDARD && <li>Robimy pierwszy skan siatką 7×7, żeby było z czym porównać kolejne.</li>}
          </ul>

          <h3 style={h3Styl}>Co miesiąc: prowadzenie wizytówki Google</h3>
          <ul style={lista}>
            <li>Posty co najmniej dwa razy w miesiącu: realizacje, nowe usługi, oferty sezonowe.</li>
            <li>Nowe zdjęcia z realizacji, zespołu i lokalu, bez zdjęć ze stocków.</li>
            <li>Prośby o opinię po usłudze z bezpośrednim linkiem, do wysłania e-mailem albo SMS-em.</li>
            <li>Odpowiedź na każdą opinię w ciągu 48 godzin, także na krytyczną.</li>
            <li>Wpisy w katalogach branżowych i lokalne linki: media, organizacje, partnerzy.</li>
            {SIATKA_W_SEO_STANDARD && <li>Skan siatką co 14 dni i raport w panelu: co zrobiliśmy i jak zmieniła się pozycja.</li>}
          </ul>
          <p style={akapit}>
            Każde działanie trafia do dziennika prac w panelu z datą i liczbą godzin, więc widzisz, za co płacisz.
          </p>
        </div>
      </section>

      {/* H2 4: cena. Akapit dosłownie z CB-02 (po weryfikacji), podpis źródła widełek dosłownie z planu,
          drugi przedział z AV-08 (Perplexity, odpowiedź z 4.11.2026, surowe/q12_perplexity.json). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={ID_CENA} style={h2Styl}>Ile kosztuje pozycjonowanie wizytówki Google</h2>
          <p style={akapit}>
            Samą wizytówkę agencje i freelancerzy prowadzą zwykle za 100–600 zł miesięcznie, w konkurencyjnych branżach od 800 zł. Nasz pakiet SEO Standard kosztuje <strong>od 1 900 zł netto miesięcznie</strong>, bo poza wizytówką obejmuje optymalizację strony, do 20 fraz, 2 treści i 2 linki miesięcznie{SIATKA_W_SEO_STANDARD ? ' oraz pomiar pozycji w Mapach z 49 punktów co 14 dni' : ''}. Umowa jest miesięczna.
          </p>
          <p style={podpis}>Widełki rynkowe: poradnik dawidgicala.pl, sprawdzone 5.11.2026</p>
          <p style={akapit}>
            Podobnie dzieli rynek Perplexity zapytany 4.11.2026, kto w Warszawie pozycjonuje wizytówki Google i ile to kosztuje. Według tej odpowiedzi prosta obsługa samej wizytówki kosztuje około 250–600 zł netto miesięcznie, a lokalne SEO obejmujące wizytówkę, stronę, opinie i linki zwykle 1 000–2 500 zł netto miesięcznie. Nasz pakiet mieści się w drugim przedziale.
          </p>

          <CompareTable
            id="co-jest-w-cenie"
            caption="Co jest w cenie: sama wizytówka a pakiet SEO Standard"
            columns={[
              { key: 'zakres', label: 'Zakres' },
              { key: 'rynek', label: 'Sama wizytówka (typowo na rynku)' },
              { key: 'pakiet', label: 'SEO Standard od 1 900 zł netto/mies.' },
            ]}
            rows={WIERSZE_CENY}
            przypis="Kolumna „sama wizytówka” opisuje typowy zakres ofert prowadzenia samego profilu, a nie konkretne firmy; „różnie” znaczy, że zależy to od oferty."
          />

          <p style={akapit}>
            Sam Profil Firmy w Google jest bezpłatny: płacisz za pracę, a nie za miejsce w Mapach (szczegóły w pytaniu{' '}
            <a href="#czy-wizytowka-google-jest-platna" style={link}>czy wizytówka Google jest płatna</a>). Pełny zakres pakietów SEO Standard i SEO Premium porównasz w{' '}
            <Link href="/cennik-pozycjonowania" style={link}>cenniku pozycjonowania</Link>.
          </p>
          <div style={{ margin: '1.75rem 0 0' }}>
            <a href={kontakt} className="btn btn-primary" data-cta="service_cena_wizytowka" data-plan="standard">
              Zapytaj o pakiet z wizytówką – odpowiedź w{' '}24{' '}h
            </a>
          </div>
        </div>
      </section>

      {/* H2 5: ChatGPT (CB-01): nagłówek 53 zn., 2 wiersze tabeli, metoda pod tabelą, link do A2 warunkowy. */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="wizytowka-a-chatgpt" style={h2Styl}>Wizytówka a ChatGPT: polecenia prowadzą do Map Google</h2>
          <p style={akapit}>
            Sprawdziliśmy, dokąd prowadzą linki, gdy ChatGPT poleca firmę. W dniach 4–5 listopada 2026 zadaliśmy mu 10 próśb o polecenie firmy, m.in. stolarza, hydraulika, biura rachunkowego i agencji SEO w Warszawie, Krakowie i Poznaniu, oraz pytania o ceny, rankingi i funkcje usług.
          </p>

          <CompareTable
            id="chatgpt-linki-do-map"
            caption="Dokąd prowadzą linki w odpowiedziach ChatGPT (4–5.11.2026)"
            columns={[
              { key: 'pytanie', label: 'Rodzaj pytania' },
              { key: 'linki', label: 'Linki w odpowiedziach' },
              { key: 'mapy', label: 'W tym do Map Google' },
            ]}
            rows={WIERSZE_CHATGPT}
            minWidth={520}
            przypis="Metoda: gpt-4.1-mini z wyszukiwaniem w sieci przez API DataForSEO, lokalizacja wyszukiwania Warszawa (także dla pytań o Kraków i Poznań), 1 odpowiedź na pytanie, 4–5.11.2026. Linki do Map to adresy wyszukiwania w Mapach Google (google.com/maps/search). Aplikacja ChatGPT może odpowiadać inaczej."
          />

          <p style={akapit}>
            Przy poleceniu ChatGPT podaje adres i godziny otwarcia, a link prowadzi do Map Google, gdzie klient widzi wizytówkę. W dwóch pytaniach o to, kto w Warszawie pozycjonuje wizytówki Google, do Map prowadziło 9 z 10 linków. Pomiar pokazuje, dokąd prowadzą linki, a nie skąd model bierze wiedzę, więc nie twierdzimy, że Mapy są jego jedynym źródłem. Wniosek praktyczny jest prostszy: zadbana wizytówka odpowiada na prośbę „poleć”, a strona z jawną ceną na pytanie „ile”.
          </p>
          <p style={akapit}>
            Od tego samego zaczynamy{' '}
            {hrefA2 ? <Link href={hrefA2} style={link}>pozycjonowanie w ChatGPT</Link> : 'pozycjonowanie w ChatGPT'}: od wizytówki i strony z jasną ofertą i ceną.
          </p>
        </div>
      </section>

      {/* H2 6: poradnik „jak samodzielnie” (format z TOP 7 SERP, brief L1). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="krok-po-kroku" style={h2Styl}>Jak pozycjonować wizytówkę Google samodzielnie: 8 kroków</h2>
          <p style={akapit}>
            Jeśli chcesz wypozycjonować wizytówkę Google samodzielnie, zacznij od tych ośmiu kroków. Pierwsze cztery robisz raz i poprawiasz przy zmianach w firmie. Pozostałe cztery wymagają regularności przez wiele miesięcy.
          </p>
          <ol style={{ ...lista, gap: '0.9rem' }}>
            {KROKI.map(([tytul, opis]) => (
              <li key={tytul}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>{tytul}</span> {opis}
              </li>
            ))}
          </ol>
          <p style={akapit}>
            Kiedy zlecić prowadzenie wizytówki? Gdy kroki 5–8 przegrywają z codzienną pracą, gdy pozycja stoi mimo uzupełnionego profilu albo gdy nie wiesz, czy zmiany działają poza Twoją ulicą, bo nie masz pomiaru z wielu punktów.
          </p>
        </div>
      </section>

      {/* H2 7: wizytówka i strona; linki z planu: /seo-lokalne-warszawa i /pozycjonowanie-stron-internetowych
          (anchory z 6.6) + case Madame Thai bez nowych liczb (brief L1, information gain 4). */}
      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id="wizytowka-i-strona" style={h2Styl}>Wizytówka i strona: dlaczego oba</h2>
          <p style={akapit}>
            Wizytówka odpowiada na zapytania w Mapach i w pakiecie lokalnym. Strona pracuje w wynikach organicznych pod mapą i odpowiada na pytania o cenę i zakres usług, a przy pytaniach o ceny ChatGPT cytuje właśnie strony www. Oba elementy się wzmacniają: link w profilu prowadzi klienta do właściwej podstrony, a liczbę witryn z linkami do firmy Google wymienia wśród sygnałów rozpoznawalności.
          </p>
          <p style={akapit}>
            Dlatego w pakiecie SEO Standard prowadzimy wizytówkę razem ze stroną. Jak to wygląda dla firm działających w jednym mieście, pokazujemy na stronie{' '}
            <Link href="/seo-lokalne-warszawa" style={link}>SEO lokalne w Warszawie</Link>, a jak pracujemy nad samą stroną, w opisie usługi{' '}
            <Link href="/pozycjonowanie-stron-internetowych" style={link}>pozycjonowanie strony firmowej</Link>. Przykład lokalnej firmy z naszej praktyki to{' '}
            <Link href="/blog/wyniki-wdrozen-seo-2026#madame-thai" style={link}>case Madame Thai</Link> w podsumowaniu wdrożeń.
          </p>

          <Zrodla zrodla={ZRODLA} />
        </div>
      </section>

      <AppleFaq faqData={faqData} title="Pytania o pozycjonowanie wizytówki Google" sectionId="pytania" />

      {/* CTA przed formularzem: pakiet SEO Standard wybrany w formularzu (data-plan). */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container" style={kontener}>
          <div style={{ ...karta, textAlign: 'center' }}>
            <p style={{ ...akapit, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              Chcesz, żeby klienci z okolicy częściej znajdowali Cię w Mapach? Napisz, czym się zajmujesz i gdzie, a odpowiemy w ciągu 24 godzin w dni robocze.
            </p>
            <a href={kontakt} className="btn btn-primary" data-cta="service_bottom_wizytowka" data-plan="standard">
              Zapytaj o pakiet z wizytówką
            </a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
