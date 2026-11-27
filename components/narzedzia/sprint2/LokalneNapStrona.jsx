// Strona aplikacji D5: Skaner Spojnosci Lokalnej NAP, Wizytowki Google i Generator QR Opinii
// PL: /narzedzia/audyt-lokalnego-seo-wizytowki | EN: /en/tools/local-seo-nap-qr-generator

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import { cena } from '@/lib/narzedziaLiczby';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import NawBok from '@/components/narzedzia/NawBok';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import Sekcja from '@/components/narzedzia/Sekcja';
import Poradniki from '@/components/narzedzia/Poradniki';
import PozostaleNarzedzia from '@/components/narzedzia/PozostaleNarzedzia';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import LokalneNapClient from './LokalneNapClient';

const SLUG = 'audyt-lokalnego-seo-wizytowki';
const URL_PL = `${BASE}/narzedzia/audyt-lokalnego-seo-wizytowki`;
const URL_EN = `${BASE}/en/tools/local-seo-nap-qr-generator`;

const ZRODLA_PL = [
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Pomoc Profilu Firmy w Google: Jak Google ustala pozycję w wynikach lokalnych (trafność, odległość i rozpoznawalność)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: Dane strukturalne LocalBusiness (adres, telefon, geo i godziny otwarcia)', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3474122', nazwa: 'Pomoc Profilu Firmy w Google: Tworzenie linku do wystawiania opinii przez klientów', data: '2026-11-22' },
  { url: 'https://www.iso.org/standard/83389.html', nazwa: 'ISO/IEC 18004: Specyfikacja kodowania symboli QR Code (korekcja błędów Reed-Solomon)', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Google Business Profile Help: How to improve your local ranking on Google (relevance, distance & prominence)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: LocalBusiness structured data (PostalAddress, GeoCoordinates & OpeningHours)', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3474122', nazwa: 'Google Business Profile Help: Get more reviews with a direct short link', data: '2026-11-22' },
  { url: 'https://www.iso.org/standard/83389.html', nazwa: 'ISO/IEC 18004: Information technology - QR code bar code symbology specification', data: '2026-11-22' },
];

const FAQ_PL = [
  {
    id: 'co-to-jest-spojnosc-nap',
    question: 'Co oznacza skrót NAP w lokalnym SEO i dlaczego wpływa na Mapy Google?',
    answer: 'Skrót NAP pochodzi od angielskich słów Name, Address, Phone (nazwa firmy, dokładny adres siedziby z kodem pocztowym oraz numer telefonu). Google zestawia te trzy dane między Twoim Profilem Firmy w Google, widoczną treścią strony internetowej, kodem <code>LocalBusiness JSON-LD</code> oraz katalogami branżowymi. Rozbieżny numer telefonu lub stary adres osłabia zaufanie algorytmu do lokalizacji.',
  },
  {
    id: 'czy-wygenerowany-kod-qr-wygasa',
    question: 'Czy wygenerowany tutaj kod QR do opinii Google kiedykolwiek wygaśnie?',
    answer: 'Nie - kod działa bezterminowo i bez limitu skanowań. Wiele pozornie darmowych generatorów w internecie koduje w obrazku własny link pośredniczący i po 14 dniach żąda abonamentu za odblokowanie przekierowania. Nasz enkoder ISO/IEC 18004 zapisuje bezpośrednio Twój docelowy adres <code>g.page</code> w siatce wektorowej SVG, bez żadnego serwera pośrodku.',
  },
  {
    id: 'skad-wziac-link-do-opinii-google',
    question: 'Skąd pobrać bezpośredni link do wystawienia opinii w Wizytówce Google?',
    answer: 'Zaloguj się na konto Google zarządzające wizytówką, wpisz w wyszukiwarce nazwę swojej firmy i w panelu zarządzania kliknij kafelek „Poproś o opinie” (Ask for reviews). Skopiuj krótki adres w formacie <code>https://g.page/r/.../review</code> i wklej go w pole generatora powyżej.',
  },
  {
    id: 'czy-wolno-filtrowac-negatywne-opinie',
    question: 'Czy mogę kierować kodem QR na ankietę, która przepuszcza tylko oceny 5-gwiazdkowe?',
    answer: 'Nie. Praktyka tzw. review gatingu (wstępnego odfiltrowywania niezadowolonych klientów zanim trafią do formularza Google) jest wprost zakazana w regulaminie treści Google i grozi masowym usunięciem opinii. Najbezpieczniejsza i najskuteczniejsza metoda to bezpośredni kod QR prowadzący każdego klienta po wykonanej usłudze prosto do okna oceny w Google.',
  },
  {
    id: 'jak-wizytowka-google-wplywa-na-chatgpt',
    question: 'Czy Wizytówka Google i opinie pomagają też w odpowiedziach ChatGPT?',
    answer: 'Zdecydowanie tak. W naszym teście zapytań lokalnych (np. o kancelarie, kliniki, wykonawców i agencje w konkretnym mieście) aż 59 z 62 klikalnych źródeł w poleceniach ChatGPT prowadziło do profili w Mapach Google. Wysoka średnia ocen, świeże recenzje z nazwą usługi oraz spójny kod <code>LocalBusiness</code> na stronie bezpośrednio zwiększają szansę na rekomendację AI.',
  },
];

const FAQ_EN = [
  {
    id: 'what-is-nap-consistency-local-seo',
    question: 'What is NAP consistency and why does it matter for Google Maps & AI?',
    answer: 'NAP stands for Name, Address and Phone number. Search engines cross-verify your Google Business Profile against the visible text on your website, your <code>LocalBusiness JSON-LD</code> structured data and external business directories. Conflicting phone numbers or incomplete street addresses erode entity confidence in local pack rankings.',
  },
  {
    id: 'does-this-google-review-qr-expire',
    question: 'Will the Google Review QR code generated here ever expire?',
    answer: 'Never. Many freemium QR generators secretly encode a tracking shortlink and disable it after a 14-day trial unless you pay a monthly fee. Our ISO/IEC 18004 encoder writes your exact <code>g.page/r/.../review</code> URL directly into the SVG/PNG matrix with zero intermediary redirects and unlimited scans.',
  },
  {
    id: 'where-to-find-google-review-link',
    question: 'Where do I find my official Google Business Profile review link?',
    answer: 'Sign in to the Google account managing your profile, search your business name on Google, click "Ask for reviews" inside the management dashboard, and copy the short <code>https://g.page/r/.../review</code> URL into the generator above.',
  },
  {
    id: 'is-review-gating-allowed-by-google',
    question: 'Can I pre-screen customers before showing them the Google review form?',
    answer: 'No. Google’s User Contributed Content policy strictly prohibits "review gating" (routing happy clients to Google while diverting unhappy ones to a private form) and penalizes gated profiles by wiping reviews. Always link your QR code directly to the official Google review dialog.',
  },
  {
    id: 'do-google-reviews-help-chatgpt-local',
    question: 'Do Google Maps reviews influence local recommendations in ChatGPT?',
    answer: 'Yes. When buyers ask ChatGPT or Perplexity for local clinics, law firms, contractors or agencies in a specific city, generative models heavily cite Google Maps listings, review counts and service descriptions alongside your website’s <code>LocalBusiness</code> schema.',
  },
];

export function LokalneNapStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'Local SEO NAP Checker, Review Calculator & Google QR Generator'
    : 'Skaner spójności lokalnej NAP, kalkulator opinii i generator QR wizytówki');
  const okruszek = wpisRejestru?.okruszek || (en ? 'Local SEO NAP & QR Generator' : 'Lokalne SEO NAP i QR opinii');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);
  const ilustracja = obrazKarty(SLUG, locale);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'Local SEO NAP Scanner, Google Review Link & Google Review QR Code Generator' : 'Skaner spójności lokalnej NAP, kalkulator opinii Google i kod QR do opinii Google'}
        description={en
          ? 'Free 3-in-1 Local SEO tool & Google review QR code generator: compares visible HTML contact details against LocalBusiness JSON-LD, calculates 5-star reviews needed to overtake Google Maps competitors, and turns your Google review link into a permanent print SVG/PNG QR code.'
          : 'Darmowe narzędzie 3 w 1 do lokalnego SEO: skaner danych NAP (HTML vs LocalBusiness JSON-LD), żywy kalkulator opinii Google 5★ do wyprzedzenia lidera Map oraz bezterminowy kod QR do opinii Google (SVG i PNG 1024px).'}
        url={en ? URL_EN : URL_PL}
        category="BusinessApplication"
        screenshot={ilustracja ? { url: ilustracja.src, width: ilustracja.width, height: ilustracja.height } : undefined}
        featureList={en
          ? [
              'Character-by-character NAP comparison between visible HTML and LocalBusiness JSON-LD',
              'Interactive 5-star Google review gap calculator with competitor benchmark',
              'Permanent ISO/IEC 18004 Google Review QR code generator (vector SVG & 1024px PNG)',
            ]
          : [
              'Porównanie danych NAP (nazwa, telefon, adres, NIP, godziny, geo) między HTML a LocalBusiness JSON-LD',
              'Żywy kalkulator brakujących opinii 5★ do osiągnięcia celu i wyprzedzenia konkurenta w Mapach',
              'Bezterminowy wektorowy generator kodu QR opinii Google do druku (SVG oraz PNG 1024px)',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="kalkulator" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free Local SEO & Google Business Profile Tool' : 'Darmowe narzędzie Local SEO i Wizytówki Google'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Check whether your website’s visible address and phone match your LocalBusiness schema, calculate how many 5-star reviews separate you from #1 in Google Maps, and download a non-expiring vector QR code for your clients.'
              : 'Sprawdź, czy nazwa, telefon i adres w tekście strony zgadzają się z kodem LocalBusiness JSON-LD, policz na żywo ile opinii 5★ dzieli Cię od lidera Map Google i pobierz bezterminowy kod QR do druku.'}
          </p>

          <LokalneNapClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Ranking in the Google Maps Top 3 (Local Pack) and local ChatGPT answers depends on three pillars: primary & secondary GBP categories aligned with your landing pages, 100% NAP consistency between your profile, visible HTML and LocalBusiness JSON-LD, and steady 5-star reviews. Below you get a live NAP scanner, review gap calculator and a permanent Google review link generator / Google review QR code generator.'
                : 'Wejście do TOP 3 Map Google oraz lokalnych poleceń w ChatGPT opiera się na trzech filarach: precyzyjnym doborze kategorii w Profilu Firmy w Google, 100% spójności danych NAP między wizytówką, stopką HTML i kodem LocalBusiness JSON-LD oraz stałym dopływie ocen. Poniżej masz w jednym miejscu skaner NAP, kalkulator opinii Google oraz bezterminowy kod QR do opinii Google.'}
            </AnswerBox>
            <Byline sciezka="/narzedzia/audyt-lokalnego-seo-wizytowki" takzeEn style={{ margin: '1.25rem 0 0' }} />
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      '6-row audit comparing Name, Phone, Address, Tax ID, Opening Hours and Geo coordinates in HTML vs JSON-LD',
                      'Instant 5-star review calculator showing exact reviews and weeks needed to overtake your local rival',
                      '100% permanent ISO/IEC 18004 QR code generator with vector SVG (print-shop ready) and 1024px PNG export',
                    ]
                  : [
                      '6-punktowe zestawienie Nazwy, Telefonu, Adresu, NIP, Godzin i Geo między HTML a LocalBusiness JSON-LD',
                      'Natychmiastowy kalkulator opinii Google 5★ wyliczający dystans do wybranej średniej oraz lidera Map',
                      'Bezterminowy kod QR do opinii Google (standard ISO/IEC 18004) z eksportem wektorowym SVG i PNG 1024px',
                    ]}
                przypis={en
                  ? 'Zero tracking redirects in the QR code - your printed stands and stickers work forever.'
                  : 'Zero ukrytych przekierowań i zero abonamentów - wydrukowane stojaki i wizytówki z kodem QR działają na zawsze.'}
              >
                {ilustracja ? <ZrzutWyniku {...ilustracja} sizes="(max-width: 900px) 100vw, 860px" /> : null}
              </CoDostajesz>

              {en ? (
                <>
                  <Sekcja id="three-pillars-of-google-maps-local-pack" tytul="What Moves Rankings in Google Maps & Local AI Recommendations">
                    <CompareTable
                      id="table-local-seo-factors"
                      caption="Official Google local ranking factors translated into technical actions"
                      columns={[
                        { key: 'pillar', label: 'Google Factor' },
                        { key: 'mistake', label: 'Frequent Local Business Mistake' },
                        { key: 'action', label: 'Winning Local SEO Setup' },
                      ]}
                      rows={[
                        { id: 'relevance', pillar: 'Relevance', mistake: 'Generic primary category + empty services tab', action: 'Exact primary + secondary categories mirrored by dedicated H1/H2 service subpages' },
                        { id: 'distance', pillar: 'Distance & NAP', mistake: 'Different phone/address in footer vs JSON-LD vs GBP', action: 'Identical PostalAddress, telephone & GeoCoordinates across HTML, Schema and directories' },
                        { id: 'prominence', pillar: 'Prominence & Reviews', mistake: 'One-time burst of reviews two years ago, then silence', action: 'Steady weekly 5★ reviews via printed QR stands + owner replies mentioning services' },
                      ]}
                      przypis="Based on Google Business Profile Help (How to improve your local ranking) and LocalBusiness structured data docs."
                    />
                    <p style={s.akapit}>
                      Setting up or auditing a profile from scratch? Use our{' '}
                      <Link href="/narzedzia/checklista-wizytowki-google" style={s.podkreslenie}>40-point Google Business Profile checklist</Link>{' '}
                      and explore our{' '}
                      <Link href="/pozycjonowanie-wizytowki-google" style={s.podkreslenie}>Google Business Profile SEO service</Link>{' '}
                      with 49-point GPS grid tracking.
                    </p>
                  </Sekcja>

                  <Sekcja id="where-to-place-review-qr-codes" tytul="Where Printed Review QR Codes Convert Best">
                    <ul style={s.lista}>
                      <li><strong>Reception desks &amp; checkout counters:</strong> Place an acrylic A6 stand with the vector SVG QR code right where clients thank your staff.</li>
                      <li><strong>Invoices, handover protocols &amp; parcels:</strong> Embed the <code>1024px PNG</code> on PDF invoices or thank-you inserts inside B2C/B2B shipments.</li>
                      <li><strong>Service technicians &amp; field teams:</strong> Add the QR code to the back of business cards. Combine local visibility with city landing pages in{' '}
                        <Link href="/seo-lokalne-warszawa" style={s.podkreslenie}>Local SEO</Link>{' '}
                        and see full plan details in{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO pricing</Link>{' '}
                        (from {cena('seoStandard', 'en')} net/mo).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="trzy-filary-pozycji-w-mapach-google" tytul="Co naprawdę decyduje o TOP 3 w Mapach Google i poleceniach lokalnych AI">
                    <CompareTable
                      id="tabela-czynniki-mapy"
                      caption="Trzy oficjalne czynniki Google przełożone na konkretne wdrożenie w firmie"
                      columns={[
                        { key: 'filar', label: 'Czynnik Google' },
                        { key: 'blad', label: 'Częsty błąd firm lokalnych' },
                        { key: 'wdrozenie', label: 'Skuteczny standard Local SEO' },
                      ]}
                      rows={[
                        { id: 'trafnosc', filar: 'Trafność', blad: 'Zbyt ogólna kategoria główna i pusta zakładka Usługi', wdrozenie: 'Precyzyjna kategoria główna i poboczne spięte z podstronami usług na WWW' },
                        { id: 'odleglosc', filar: 'Lokalizacja i NAP', blad: 'Inny numer telefonu w stopce, inny w JSON-LD i stary adres w katalogach', wdrozenie: 'Identyczny PostalAddress, telefon, NIP i GeoCoordinates w HTML, Schema i Mapach' },
                        { id: 'rozpoznawalnosc', filar: 'Rozpoznawalność', blad: 'Jednorazowy zryw opinii sprzed roku i brak odpowiedzi właściciela', wdrozenie: 'Stały dopływ opinii przez kod QR po usłudze + merytoryczne odpowiedzi' },
                      ]}
                      przypis="Źródło: dokumentacja Pomocy Profilu Firmy w Google oraz Google Search Central (LocalBusiness)."
                    />
                    <p style={s.akapit}>
                      Zakładasz lub porządkujesz wizytówkę od podstaw? Przejdź przez naszą{' '}
                      <Link href="/narzedzia/checklista-wizytowki-google" style={s.podkreslenie}>checklistę 40 punktów Wizytówki Google</Link>{' '}
                      i zobacz, jak mierzymy pozycje na siatce GPS w usłudze{' '}
                      <Link href="/pozycjonowanie-wizytowki-google" style={s.podkreslenie}>pozycjonowanie wizytówki Google</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="jak-skutecznie-zbierac-opinie-kodem-qr" tytul="Gdzie umieścić pobrany kod QR, żeby zbierał najwięcej opinii">
                    <ul style={s.lista}>
                      <li><strong>Stojak na recepcji lub w gabinecie:</strong> Pobierz wektorowy plik <code>SVG</code> i wydrukuj go na tabliczce A6 w miejscu, w którym zadowolony klient kończy wizytę.</li>
                      <li><strong>Faktura PDF, protokół odbioru lub paczka:</strong> Wstaw plik <code>PNG 1024px</code> z krótką prośbą o ocenę na dole protokołu wykonania usługi lub karty podziękowania.</li>
                      <li><strong>Odwrotna strona wizytówki handlowca:</strong> Klient skanuje kod aparatem w 3 sekundy podczas uścisku dłoni. Zobacz też, jak łączymy Mapy z podstronami miejskimi w usłudze{' '}
                        <Link href="/seo-lokalne-warszawa" style={s.podkreslenie}>SEO lokalne</Link>{' '}
                        oraz sprawdź{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>{' '}
                        (od {cena('seoStandard')} netto/mies.).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/audyt-lokalnego-seo-wizytowki" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/audyt-lokalnego-seo-wizytowki" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: Local NAP, Google Reviews & QR Codes' : 'Najczęstsze pytania o spójność NAP, opinie w Mapach i kody QR'}
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

export default LokalneNapStrona;
