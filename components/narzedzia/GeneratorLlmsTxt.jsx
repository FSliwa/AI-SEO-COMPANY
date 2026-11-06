// N1 /narzedzia/generator-llms-txt (PLAN-v2 6.10; brief N1; CB-09 korekta, CB-18; 5.11.2026).
// Komponent serwerowy: treść, schema i okruszki; interaktywna część to LlmsTxtClient.
// - H1 (59) i Krótka odpowiedź (54 słowa) z 6.10, bez obietnicy „plik dla ChatGPT” (CB-09),
// - konspekt 1 000–1 200 słów BEZ H2 „Kto pobrał nasz llms.txt” (dopiero po ≥ 30 dniach danych
//   z trwałego licznika T0.5, CB-09; logi Vercel tego nie zapewnią),
// - liczby z datą i źródłem: Ahrefs (28% ze 137 000 domen) i specyfikacja llmstxt.org - odczyt
//   5.11.2026; własny test botów 5.11.2026 (skille/ai-visibility/botcheck-2026-11-05.txt);
//   wersje wtyczek WordPress z katalogu WordPress.org 5.11.2026 (sprawdzić ponownie przed publikacją),
// - schema: WebAppSchema (DeveloperApplication) + FAQPage (AppleFaq) + BreadcrumbList 3 poziomy
//   (Breadcrumbs z parent); bez ArticleSchema,
// - linki: hub GEO, A2 (warunkowo), sprawdzarka (po T0.2), /narzedzia, /llms.txt.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, FAQ_GENERATORA, RODZIC_OKRUSZKOW, SCIEZKA_HUBA, hrefAudytuAi, hrefSprawdzarki, stronaNarzedzia } from '@/lib/narzedzia';
import LlmsTxtClient from './LlmsTxtClient';
import * as s from './styl';

const SCIEZKA = '/narzedzia/generator-llms-txt';

// Fragment https://www.ai-seo-company.pl/llms.txt (stan na 5.11.2026, public/llms.txt).
const PRZYKLAD = `# AI SEO COMPANY

> Agencja SEO i web design z Warszawy. Pozycjonowanie stron, pozycjonowanie
> w AI (GEO), audyty SEO, SEO lokalne i projektowanie stron dla małych
> i średnich firm. Każdy klient dostaje panel klienta 24/7 z publicznym demo.

## Zmiana agencji

- [Zmiana agencji SEO bez kar i utraty pozycji](https://www.ai-seo-company.pl/zmiana-agencji-seo): poradnik, checklista 32 punktów (konta Google, domena, treści, linki, dane) i bezpłatny przegląd po poprzedniej agencji (30 min).`;

const TESTY = [
  { co: 'Mapa strony', poCo: 'Źródło listy podstron: wpis Sitemap w robots.txt albo /sitemap.xml, także indeks map.', jak: 'Bez mapy plik zawiera tylko stronę główną. Dodaj sitemap.xml i zgłoś ją w Search Console.' },
  { co: 'Kod odpowiedzi i przekierowania', poCo: 'Do pliku trafiają tylko adresy, które zwracają kod 200.', jak: 'Adresy z kodem 3xx, 4xx i 5xx są na liście pominiętych razem z kodem.' },
  { co: 'noindex', poCo: 'Strona wyłączona z indeksu nie powinna trafiać do spisu.', jak: 'Pomijamy adresy z noindex w meta robots albo w nagłówku X-Robots-Tag.' },
  { co: 'Tytuł i opis', poCo: 'Z nich powstają wiersze pliku: link z tytułem i opis po dwukropku.', jak: 'Brak opisu = sam link. Uzupełnij meta description na tych podstronach.' },
  { co: 'robots.txt dla 8 botów', poCo: 'Pokazuje, czy bot może pobrać stronę główną i ile sprawdzonych adresów blokuje.', jak: 'Blokada OAI-SearchBot albo PerplexityBot wyklucza stronę z wyników ChatGPT i Perplexity.' },
  { co: 'Obecny plik /llms.txt', poCo: 'Pokazuje, czy strona ma już plik i czy zwraca go bez przekierowania.', jak: 'Kod 200 i nagłówek „# Nazwa” w pierwszym wierszu = plik jest na miejscu. HTML zamiast tekstu oznacza zły adres.' },
  { co: 'Kod HTTP z User-Agentem bota', poCo: 'Wykrywa blokady zapory (WAF) i CDN, których nie widać w robots.txt.', jak: 'Kod 403 albo 429 dla bota przy 200 dla przeglądarki oznacza blokadę po stronie serwera.' },
];

export default function GeneratorLlmsTxt() {
  const strona = stronaNarzedzia('generator-llms-txt');
  const a2 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');
  const hub = hrefJesliOpublikowana(SCIEZKA_HUBA);
  const sprawdzarka = hrefSprawdzarki();
  const audyt = hrefAudytuAi();

  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name="Generator llms.txt i test dostępu botów AI"
        description="Darmowe narzędzie: generuje plik llms.txt z mapy strony i sprawdza dostęp GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot w robots.txt."
        url={`${BASE}${SCIEZKA}`}
        category="DeveloperApplication"
      />

      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Darmowe narzędzie
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          <Byline sciezka={SCIEZKA} style={{ textAlign: 'center' }} />
          <AnswerBox>
            llms.txt to plik w formacie Markdown w katalogu głównym strony, który wskazuje modelom językowym najważniejsze podstrony z krótkim opisem. To propozycja standardu (llmstxt.org), a nie wymóg: według analizy Ahrefs żaden duży dostawca modeli oficjalnie go nie obsługuje. Dla ChatGPT ważniejsze jest, czy boty AI mają dostęp do strony w robots.txt. Generator sprawdza oba elementy.
          </AnswerBox>

          <LlmsTxtClient hrefSprawdzarki={sprawdzarka} hrefAudytu={audyt} />

          <section aria-labelledby="co-to-jest-llms-txt" style={s.sekcja}>
            <h2 id="co-to-jest-llms-txt" style={s.h2}>Co to jest llms.txt (i llms-full.txt)</h2>
            <p style={s.akapit}>
              Plik llms.txt leży pod adresem /llms.txt i opisuje serwis dla modeli językowych i agentów AI, które czytają strony w imieniu użytkowników. Format zaproponował Jeremy Howard we wrześniu 2024 roku, a aktualna wersja specyfikacji (v2) jest opublikowana na llmstxt.org.
            </p>
            <p style={s.akapit}>
              Układ jest stały. Na górze nagłówek z nazwą firmy, jedyny obowiązkowy element. Pod nim cytat z krótkim opisem, a dalej sekcje z listami linków: tytuł podstrony w nawiasach kwadratowych, adres w okrągłych i po dwukropku zdanie o tym, co tam jest. Tak wygląda początek{' '}
              <a href="/llms.txt" style={s.podkreslenie}>naszego pliku llms.txt</a>:
            </p>
            <pre style={{ ...s.karta, ...s.kod, padding: '1.25rem', margin: '0 0 0.5rem', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: 'var(--w-tusz)' }}>
              <code>{PRZYKLAD}</code>
            </pre>
            <p style={s.przypis}>Fragment pliku https://www.ai-seo-company.pl/llms.txt, stan na 5 listopada 2026.</p>
            <p style={{ ...s.akapit, marginTop: '1rem' }}>
              Niektóre serwisy publikują obok drugi, dużo dłuższy plik llms-full.txt. Nasz generator tworzy spis, czyli llms.txt: tego potrzebuje typowa strona firmowa.
            </p>
          </section>

          <section aria-labelledby="czy-llms-txt-pomaga" style={s.sekcja}>
            <h2 id="czy-llms-txt-pomaga" style={s.h2}>Czy llms.txt pomaga w Google i ChatGPT?</h2>
            <p style={s.akapit}>
              Na razie brak na to dowodów. Ahrefs (odczyt 5.11.2026) nie znalazł deklaracji OpenAI, Anthropic ani Google, że ich crawlery czytają ten plik. Mimo to llms.txt publikuje 28% ze 137 000 domen, które Ahrefs zbadał w swoim narzędziu Web Analytics. Firmy wdrażają go na zapas, licząc, że modele zaczną z niego korzystać.
            </p>
            <p style={s.akapit}>
              Sygnały z Google są sprzeczne. Zespół Chrome dodał sprawdzanie llms.txt do eksperymentalnych audytów Lighthouse, a John Mueller z Google tłumaczył, że plik nie powstał z myślą o wyszukiwaniu. Dostęp Gemini do treści reguluje się osobno, wpisem Google-Extended w robots.txt.
            </p>
            <p style={s.akapit}>
              Nasz wniosek: llms.txt to tani dodatek, a nie strategia. Przygotowanie pliku kosztuje niewiele i niczego nie psuje, ale o tym, czy ChatGPT, Perplexity albo Claude zacytują stronę, decyduje dostęp ich botów i treść, którą da się zacytować. Dlatego generator testuje też robots.txt i odpowiedzi serwera dla 8 botów. Jeśli zależy Ci na poleceniach w odpowiedziach modeli, zacznij od{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>pozycjonowania w AI</Link> : 'pozycjonowania w AI'}
              {a2 ? (
                <>
                  {' '}i przeczytaj,{' '}
                  <Link href={a2} style={s.podkreslenie}>jak pozycjonować się w ChatGPT</Link>
                </>
              ) : null}
              .
            </p>
          </section>

          <section aria-labelledby="co-sprawdza-generator" style={s.sekcja}>
            <h2 id="co-sprawdza-generator" style={s.h2}>Co sprawdza generator</h2>
            <p style={s.akapit}>
              Generator pobiera mapę strony, sprawdza do 50 adresów i składa z nich plik. Równolegle testuje dostęp 8 botów do strony głównej. Całość trwa najwyżej 20 sekund. Gdy strona odpowiada wolno, dostajesz wynik częściowy i listę adresów, których nie zdążyliśmy sprawdzić. Nie zapisujemy ani adresu, ani wyniku.
            </p>
            <CompareTable
              id="tabela-testow"
              caption="Co sprawdza generator llms.txt"
              columns={[
                { key: 'co', label: 'Test' },
                { key: 'poCo', label: 'Po co' },
                { key: 'jak', label: 'Jak czytać wynik' },
              ]}
              rows={TESTY.map((t) => ({ ...t, id: t.co }))}
              przypis="Zapytania wysyłamy z naszego serwera, nie z adresów IP dostawców AI, więc kolumnę z kodem HTTP traktuj jako wskazówkę."
            />
            <p style={s.akapit}>
              Tak sprawdzamy też siebie. 5 listopada 2026 odpytaliśmy własną stronę 17 User-Agentami (16 botów i przeglądarka) na 7 adresach. Wszystkie 119 zapytań dostały kod 200, a nasz llms.txt miał wtedy 14 437 bajtów.
            </p>
          </section>

          <section aria-labelledby="jak-wdrozyc-llms-txt" style={s.sekcja}>
            <h2 id="jak-wdrozyc-llms-txt" style={s.h2}>Jak wdrożyć llms.txt: WordPress, Next.js, Shopify</h2>
            <p style={s.akapit}>
              Niezależnie od platformy plik ma się otwierać pod adresem twojadomena.pl/llms.txt jako zwykły tekst. Po wdrożeniu wpisz adres strony w generator wyżej i porównaj wynik z plikiem.
            </p>

            <h3 id="llms-txt-wordpress" style={s.h3}>WordPress</h3>
            <p style={s.akapit}>
              Najprościej użyć wtyczki SEO, którą zwykle już masz. Według katalogu WordPress.org (odczyt 5.11.2026) funkcję llms.txt mają Yoast SEO (wersja 28.8), Rank Math (1.0.281) i All in One SEO (5.0.5). Włącz ją w ustawieniach wtyczki i sprawdź, które podstrony trafiły do pliku. Bez wtyczki wgraj plik z generatora przez menedżer plików hostingu albo FTP do katalogu głównego, tam gdzie leży wp-config.php. Wybierz jeden sposób, żeby nie utrzymywać dwóch wersji pliku.
            </p>

            <h3 id="llms-txt-nextjs" style={s.h3}>Next.js</h3>
            <p style={s.akapit}>
              Zapisz plik jako public/llms.txt. Next.js serwuje pliki z katalogu public pod adresem głównym, więc trafi pod /llms.txt bez dodatkowego kodu. Gdy lista podstron często się zmienia, zamiast stałego pliku użyj route handlera app/llms.txt/route.js, który składa treść z tych samych danych co sitemapa i zwraca ją z nagłówkiem Content-Type: text/plain. Nowa podstrona trafi wtedy do llms.txt razem z wdrożeniem.
            </p>

            <h3 id="llms-txt-shopify" style={s.h3}>Shopify</h3>
            <p style={s.akapit}>
              Shopify to platforma hostowana: nie wgrasz pliku przez FTP do katalogu głównego domeny. Społeczność Shopify opisuje dwa obejścia: własny szablon motywu llms.txt.liquid albo przekierowanie adresu /llms.txt na plik dodany w sekcji Pliki. Shopify nie opisał tego w oficjalnej dokumentacji, więc po zmianie otwórz adres pliku w przeglądarce. Pewniejszy jest plik dostępny pod /llms.txt bez przekierowania.
            </p>
          </section>

          <section aria-labelledby="po-generatorze" style={{ ...s.sekcja, ...s.karta, display: 'grid', gap: '1rem' }}>
            <h2 id="po-generatorze" style={{ ...s.h2, marginBottom: 0 }}>Plik gotowy, a modele dalej nie polecają firmy?</h2>
            <p style={{ ...s.akapit, margin: 0 }}>
              W audycie widoczności w AI zadajemy 30 pytań Twoich klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI Google i pokazujemy, z jakich stron modele biorą polecenia. Więcej bezpłatnych narzędzi i wzorów jest w dziale{' '}
              {hub ? <Link href={hub} style={s.podkreslenie}>narzędzia i szablony</Link> : 'narzędzia i szablony'}.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={audyt} className="btn btn-primary" data-cta="llms_audyt_tresc">Audyt widoczności w AI: 990 zł netto</Link>
              {sprawdzarka && <Link href={sprawdzarka} className="btn btn-secondary" data-cta="llms_sprawdzarka_tresc">Sprawdź, czy ChatGPT poleca Twoją firmę</Link>}
            </div>
          </section>
        </div>
      </section>

      <AppleFaq faqData={FAQ_GENERATORA} title="Pytania o llms.txt" sectionId="pytania" />

      <section style={{ paddingBottom: '4rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={strona.sources} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
