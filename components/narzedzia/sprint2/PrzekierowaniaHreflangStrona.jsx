// Strona aplikacji D2: Inspektor Przekierowan 301, Kanonikali i Macierzy Zwrotnosci hreflang
// PL: /narzedzia/sprawdz-przekierowania-hreflang | EN: /en/tools/redirect-canonical-hreflang-checker

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
import PrzekierowaniaHreflangClient from './PrzekierowaniaHreflangClient';

const SLUG = 'sprawdz-przekierowania-hreflang';
const URL_PL = `${BASE}/narzedzia/sprawdz-przekierowania-hreflang`;
const URL_EN = `${BASE}/en/tools/redirect-canonical-hreflang-checker`;

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects', nazwa: 'Google Search Central: Przekierowania a wyszukiwarka Google (301, 308, 302 i łańcuchy skoków)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Konsolidacja zduplikowanych adresów URL i wybór tagu rel="canonical"', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Wersje językowe witryny (wymóg zwrotności hreflang i rola x-default)', data: '2026-11-22' },
  { url: 'https://datatracker.ietf.org/doc/html/rfc7538', nazwa: 'IETF RFC 7538: Kod odpowiedzi HTTP 308 Permanent Redirect', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects', nazwa: 'Google Search Central: Redirects and Google Search (301, 308, 302 and redirect chains)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Consolidate duplicate URLs & rel="canonical" rules', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Localized versions of your page (hreflang return links & x-default)', data: '2026-11-22' },
  { url: 'https://datatracker.ietf.org/doc/html/rfc7538', nazwa: 'IETF RFC 7538: Hypertext Transfer Protocol Status Code 308 (Permanent Redirect)', data: '2026-11-22' },
];

const FAQ_PL = [
  {
    id: 'czym-rozni-sie-301-od-308-i-302',
    question: 'Czym w SEO różni się przekierowanie 301 od 308 oraz od 302?',
    answer: 'Zarówno kod 301 (Moved Permanently), jak i 308 (Permanent Redirect, używany domyślnie m.in. przez Next.js i Vercel) informują Google, że zmiana adresu jest trwała i należy przekazać pełny sygnał kanoniczności na nowy URL. Natomiast kody 302 i 307 oznaczają przekierowanie tymczasowe - użyte przez pomyłkę na wariantach bez-www lub HTTP potrafią przez miesiące utrzymywać stary adres w indeksie.',
  },
  {
    id: 'dlaczego-dwuskokowy-lancuch-szkodzi',
    question: 'Dlaczego dwuskokowe przekierowanie (http -> https -> https://www) to błąd?',
    answer: 'Każdy dodatkowy skok w łańcuchu dokłada opóźnienie sieciowe (TTFB na telefonie rośnie o 80-250 ms), zużywa budżet indeksowania bota i utrudnia przekazywanie sygnałów z linków zewnętrznych, które ktoś wstawił w katalogu bez prefiksu www. Wzorcowa reguła na serwerze kieruje każdy z 3 niekanonicznych wariantów bezpośrednio w 1 skoku na docelowy adres.',
  },
  {
    id: 'co-oznacza-zwrotnosc-hreflang',
    question: 'Na czym polega obowiązkowa zwrotność (reciprocity) tagów hreflang?',
    answer: 'Zgodnie z dokumentacją Google Search Central relacja hreflang musi działać w obie strony: jeśli polska strona <code>/oferta</code> wskazuje w <code>&lt;head&gt;</code> na angielską <code>/en/offer</code>, to strona angielska musi odsyłać dokładnie z powrotem do <code>/oferta</code> (oraz do samej siebie). Gdy brakuje linku zwrotnego lub wskazany URL zwraca przekierowanie 301 zamiast 200, Google ignoruje całe powiązanie językowe.',
  },
  {
    id: 'kiedy-potrzebny-jest-x-default',
    question: 'Do czego służy atrybut hreflang="x-default"?',
    answer: 'Wartość <code>x-default</code> wskazuje wyszukiwarce adres zapasowy dla użytkowników, których język przeglądarki nie pasuje do żadnej z zadeklarowanych wersji (np. odwiedzający z Hiszpanii lub Francji na stronie dostępnej po polsku, angielsku i niemiecku). Najczęściej wskazuje na wersję angielską albo główną stronę wyboru języka.',
  },
  {
    id: 'co-gdy-canonical-przeczy-przekierowaniu',
    question: 'Co robi Google, gdy tag canonical wskazuje inny adres niż przekierowanie 301?',
    answer: 'Tag <code>&lt;link rel=&quot;canonical&quot;&gt;</code> jest dla Google silną wskazówką, a nie bezwzględnym rozkazem. Gdy serwer przekierowuje na <code>https://www.domena.pl/</code>, ale zapomniany w szablonie canonical wskazuje na <code>https://domena.pl/</code>, w Search Console pojawia się komunikat „Duplikat, Google wybrał inną stronę kanoniczną niż użytkownik” i indeksacja podstron ulega rozchwianiu.',
  },
];

const FAQ_EN = [
  {
    id: 'difference-between-301-308-and-302',
    question: 'Does Google treat HTTP 308 the same as 301, and why is 302 risky?',
    answer: 'Yes. Google Search Central treats both HTTP 301 (Moved Permanently) and HTTP 308 (Permanent Redirect, used natively by Next.js and Vercel) as permanent redirects that consolidate link equity and canonical signals. By contrast, HTTP 302 and 307 signal a temporary move - leaving them on HTTP or non-www variants often keeps duplicate hostnames indexed.',
  },
  {
    id: 'why-avoid-two-hop-redirect-chains',
    question: 'Why is a 2-hop redirect chain (http -> https -> https://www) an SEO problem?',
    answer: 'Every extra hop adds TLS/TCP round-trip latency on mobile networks, burns crawl budget and weakens signal consolidation when third-party directories link to a bare <code>http://domain.com</code> URL. A clean server rule collapses all non-canonical host and protocol combinations into a single direct jump.',
  },
  {
    id: 'what-is-hreflang-reciprocity',
    question: 'What does bidirectional hreflang reciprocity mean?',
    answer: 'Google requires every localized URL pair to confirm each other: if page A (<code>/oferta</code>) declares <code>hreflang=&quot;en&quot;</code> pointing to page B (<code>/en/offer</code>), page B must include a matching <code>hreflang=&quot;pl&quot;</code> link pointing back to page A, alongside self-referencing tags on both pages. Unconfirmed or 301-redirecting hreflang URLs are ignored.',
  },
  {
    id: 'when-to-use-hreflang-x-default',
    question: 'What URL should hreflang="x-default" point to?',
    answer: 'The <code>x-default</code> annotation tells search engines which fallback version to show users whose browser language matches none of your explicit regional versions (for instance, a visitor in France when you publish PL, EN and DE). Typically it points to your international English page or primary root URL.',
  },
  {
    id: 'canonical-mismatch-vs-redirect',
    question: 'What happens when the canonical tag contradicts my 301 redirect?',
    answer: 'Sending Googlebot via 301 to <code>https://www.example.com/</code> while rendering <code>&lt;link rel=&quot;canonical&quot; href=&quot;https://example.com/&quot;&gt;</code> creates a contradictory loop. Google Search Console flags this as "Duplicate, Google chose different canonical than user" and may split impressions across both hostnames.',
  },
];

export function PrzekierowaniaHreflangStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? '301 Redirect, Canonical & hreflang Reciprocity Checker'
    : 'Inspektor przekierowań 301, tagów canonical i zwrotności hreflang');
  const okruszek = wpisRejestru?.okruszek || (en ? 'Redirect & hreflang Checker' : 'Przekierowania i hreflang');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? '301 Redirect, Canonical & hreflang Matrix Checker' : 'Inspektor przekierowań 301/308, canonical i macierzy hreflang'}
        description={en
          ? 'Free technical SEO inspector: tests all 4 HTTP/HTTPS and www/non-www host variants for redirect chains, checks HTML & HTTP canonical consistency, validates bidirectional A<->B hreflang tags, and generates 1-click redirect rules for Next.js, Nginx, Apache and Cloudflare.'
          : 'Darmowy inspektor technicznego SEO: testuje 4 warianty domeny (http, https, www) pod kątem łańcuchów przekierowań, sprawdza spójność canonicala, weryfikuje zwrotność A<->B tagów hreflang i generuje gotowe reguły dla Next.js, Nginx, .htaccess i Cloudflare.'}
        url={en ? URL_EN : URL_PL}
        category="DeveloperApplication"
        featureList={en
          ? [
              '4-variant host consolidation check (http, https, http://www, https://www) with hop count',
              'HTML <link rel="canonical"> and HTTP Link header alignment verification',
              'Live bidirectional A<->B hreflang reciprocity matrix and x-default validation',
              '1-click copyable redirect rules for next.config.mjs, Nginx, Apache .htaccess and Cloudflare',
            ]
          : [
              'Test 4 wariantów hosta (http, https, http://www, https://www) z wizualizacją łańcucha skoków',
              'Weryfikacja spójności tagu <link rel="canonical"> oraz nagłówka HTTP Link z docelowym URL',
              'Żywa macierz zwrotności A<->B tagów hreflang oraz walidacja obecności x-default',
              'Gotowe reguły 1-skokowych przekierowań dla next.config.mjs, Nginx, .htaccess i Cloudflare',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="audyt" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free Technical & International SEO Tool' : 'Darmowe narzędzie Technical i International SEO'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Check in seconds whether your domain leaks link equity through 2-hop redirect chains, contradictory canonicals or broken hreflang return tags - and copy clean server rules in one click.'
              : 'Sprawdź w kilka sekund, czy Twoja domena nie traci mocy linków przez dwuskokowe łańcuchy przekierowań, sprzeczny canonical lub brak zwrotności hreflang - i skopiuj gotową regułę na swój serwer.'}
          </p>

          <PrzekierowaniaHreflangClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Proper URL consolidation requires all three non-canonical domain variants (http://, https:// and http://www. - or vice versa) to redirect in a single permanent 301/308 hop to one target URL that declares a matching self-referencing canonical. On multilingual sites, every hreflang link from page A to page B must also be confirmed by a return hreflang link from B back to A.'
                : 'Prawidłowa konsolidacja adresów wymaga, aby trzy niekanoniczne warianty domeny (http://, https:// oraz http://www. - lub odwrotnie) kierowały w jednym stałym skoku 301/308 na docelowy adres z identycznym tagiem self-canonical. W serwisach wielojęzycznych każdy tag hreflang ze strony A do strony B musi być potwierdzony linkiem zwrotnym ze strony B do A.'}
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      'Visual redirect trace across http://, https://, http://www. and https://www. with status codes and hop count',
                      'Canonical alignment check comparing HTML <head>, HTTP Link header and final redirect destination',
                      'Live hreflang reciprocity matrix checking HTTP 200 status and bidirectional return links + x-default',
                      '4 copy-paste redirect snippets tailored to your domain: Next.js, Nginx, .htaccess and Cloudflare',
                    ]
                  : [
                      'Wizualna ścieżka skoków dla http://, https://, http://www. i https://www. z kodami HTTP',
                      'Kontrola spójności tagu canonical w <head> i nagłówku HTTP z adresem po przekierowaniu',
                      'Macierz zwrotności hreflang weryfikująca kody 200 oraz linki powrotne A<->B i x-default',
                      '4 zakładki gotowego kodu przekierowań pod Twoją domenę: Next.js, Nginx, .htaccess i Cloudflare',
                    ]}
                przypis={en
                  ? 'Free diagnostic permalink (?url=...) ready to send straight to your developer or DevOps team.'
                  : 'Darmowy link diagnostyczny (?url=...) gotowy do wysłania bezpośrednio programiście lub administratorowi.'}
              />

              {en ? (
                <>
                  <Sekcja id="common-redirect-and-canonical-bugs" tytul="The 4 Redirect & Canonical Bugs That Quietly Drain Rankings">
                    <CompareTable
                      id="table-redirect-errors"
                      caption="Frequent URL consolidation errors vs clean technical implementation"
                      columns={[
                        { key: 'error', label: 'Technical Issue' },
                        { key: 'impact', label: 'Why It Hurts SEO & AI Crawlers' },
                        { key: 'fix', label: 'Clean Fix' },
                      ]}
                      rows={[
                        { id: 'two-hop', error: '2-Hop Chain (http -> https -> www)', impact: 'Adds mobile RTT latency and weakens link equity from unformatted directory links', fix: 'Collapse protocol + host rule into 1 direct 301/308 jump' },
                        { id: '302-temp', error: '302 / 307 Temporary Redirect', impact: 'Tells Google to keep the old URL in the index instead of consolidating signals', fix: 'Replace with permanent 301 or 308 status code' },
                        { id: 'can-conflict', error: 'Canonical Points to Redirecting Host', impact: 'Triggers GSC "Google chose different canonical" and splits page authority', fix: 'Output exact final HTTPS + host URL in <link rel="canonical">' },
                        { id: 'hreflang-oneway', error: 'Unidirectional or 301 hreflang', impact: 'Google discards the entire language cluster; wrong locale ranks in DE/UK/PL SERPs', fix: 'Ensure HTTP 200 targets + full A<->B reciprocity + x-default' },
                      ]}
                      przypis="Verified against Google Search Central documentation on redirects, canonicalization and localized versions."
                    />
                    <p style={s.akapit}>
                      Preparing for a CMS relaunch? Download our{' '}
                      <Link href="/narzedzia/checklista-migracji-strony" style={s.podkreslenie}>website migration SEO checklist</Link>{' '}
                      and scan up to 25 subpages in our{' '}
                      <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>free SEO audit</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="multilingual-hreflang-architecture" tytul="How to Build Bulletproof hreflang for PL, EN & DACH Markets">
                    <ul style={s.lista}>
                      <li><strong>Self-referencing tag required:</strong> Every localized URL must list itself alongside all translations in the same <code>hreflang</code> cluster.</li>
                      <li><strong>Never link to unbuilt or redirecting pages:</strong> Only emit <code>hreflang</code> annotations for URLs returning <code>HTTP 200</code>.</li>
                      <li><strong>Compare CMS handling:</strong> See how Next.js <code>next-intl</code> compares against WordPress translation plugins in{' '}
                        <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress for SEO</Link>{' '}
                        and{' '}
                        <Link href="/porownania/webflow-vs-wordpress-seo" style={s.podkreslenie}>Webflow vs WordPress SEO</Link>, or review our{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO pricing</Link>{' '}
                        (audits from {cena('audytSeo', 'en')} net).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="najczestsze-bledy-przekierowan-i-canonical" tytul="4 błędy przekierowań i canonicala, które po cichu obcinają pozycje">
                    <CompareTable
                      id="tabela-bledy-przekierowan"
                      caption="Zestawienie typowych usterek serwerowych ze wzorcową konfiguracją SEO"
                      columns={[
                        { key: 'blad', label: 'Wykryta usterka' },
                        { key: 'skutek', label: 'Skutek dla Google i botów AI' },
                        { key: 'naprawa', label: 'Wzorcowe rozwiązanie' },
                      ]}
                      rows={[
                        { id: 'dwa-skoki', blad: 'Łańcuch 2 skoków (http -> https -> www)', skutek: 'Wydłuża TTFB na telefonie i osłabia sygnał z linków wpisanych w katalogach jako http://', naprawa: 'Jedna reguła łącząca protokół i www w pojedynczy skok 301/308' },
                        { id: 'kod-302', blad: 'Przekierowanie tymczasowe 302 / 307', skutek: 'Wstrzymuje pełne przeniesienie mocy i utrzymuje duplikaty hosta w indeksie', naprawa: 'Zamiana kodu odpowiedzi na stały 301 lub 308' },
                        { id: 'konflikt-can', blad: 'Canonical wskazuje na przekierowywany URL', skutek: 'Komunikat w GSC „Google wybrał inną stronę kanoniczną” i podział wyświetleń', naprawa: 'Zawsze podawaj ostateczny adres 200 OK (self-canonical)' },
                        { id: 'hreflang-brak', blad: 'Jednostronny hreflang lub cel z kodem 301', skutek: 'Google ignoruje powiązanie i wyświetla polską podstronę klientom z Niemiec lub UK', naprawa: 'Pełna macierz zwrotna A<->B wycelowana wyłącznie w kody 200 + x-default' },
                      ]}
                      przypis="Na podstawie dokumentacji Google Search Central: Przekierowania, Konsolidacja duplikatów oraz Wersje językowe."
                    />
                    <p style={s.akapit}>
                      Przygotowujesz przebudowę witryny lub zmianę domeny? Pobierz naszą{' '}
                      <Link href="/narzedzia/checklista-migracji-strony" style={s.podkreslenie}>checklistę migracji strony z wzorem mapy 301</Link>{' '}
                      oraz przeskanuj do 25 podstron w{' '}
                      <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>darmowym audycie SEO</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="zasady-wdrozenia-hreflang-i-x-default" tytul="Zasady wdrożenia hreflang przy ekspansji zagranicznej (EN / DE)">
                    <ul style={s.lista}>
                      <li><strong>Obowiązkowy self-hreflang:</strong> Każda wersja językowa musi wymieniać na liście alternatyw również samą siebie.</li>
                      <li><strong>Zero pustych lub przekierowywanych celów:</strong> Dodawaj do klastra wyłącznie ukończone podstrony zwracające kod <code>HTTP 200</code>.</li>
                      <li><strong>Wybór architektury wielojęzycznej:</strong> Sprawdź, jak <code>next-intl</code> wypada na tle wtyczek WPML/Polylang w analizach{' '}
                        <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress pod SEO</Link>{' '}
                        i{' '}
                        <Link href="/porownania/webflow-vs-wordpress-seo" style={s.podkreslenie}>Webflow vs WordPress</Link>, albo zobacz pełny{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>{' '}
                        (audyty od {cena('audytSeo')} netto).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/sprawdz-przekierowania-hreflang" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/sprawdz-przekierowania-hreflang" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: 301 Redirects, Canonicals & hreflang' : 'Najczęstsze pytania o przekierowania 301/308, canonical i hreflang'}
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

export default PrzekierowaniaHreflangStrona;
