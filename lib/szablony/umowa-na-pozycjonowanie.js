// F5 (22.11.2026): Wzor i checklista umowy na pozycjonowanie strony (/narzedzia/umowa-na-pozycjonowanie,
// EN /en/tools/seo-contract-checklist). Czysty ESM bez aliasu @/, kontrakt lib/szablony/README.md.
// PDF: public/pliki/wzor-umowy-pozycjonowanie.pdf (PL) oraz public/pliki/seo-contract-checklist.pdf (EN),
// generowane skryptem scripts/szablony/umowa-pdf.mjs.
// UWAGA PRAWNA: wzor edukacyjny i lista kontrolna dla zamawiajacego - nie stanowi indywidualnej porady prawnej.
// Wszystkie znaczniki pogrubienia <= 78 znakow (CLAUDE.md), zero dlugich myslnikow.

export const PARAGRAFY_PL = [
  ['§ 1', 'Przedmiot umowy i policzalny zakres miesięczny', 'Wymień konkretne dostarczane elementy: audyt startowy, wdrożenia techniczne, minimalną liczbę i rodzaj treści, minimalną liczbę i standard linków zwrotnych oraz obsługę wizytówki Google.', 'Zapis „kompleksowe pozycjonowanie strony” bez żadnych liczb i standardów.'],
  ['§ 2', 'Czas trwania i 1-miesięczne wypowiedzenie e-mailem', 'Umowa na czas nieoznaczony z 1-miesięcznym wypowiedzeniem w formie dokumentowej (e-mail) ze skutkiem na koniec kolejnego miesiąca; dłuższy próg (np. 3 mies.) wyłącznie wtedy, gdy agencja buduje w cenie nową stronę.', 'Sztywny lock-in na 12-24 miesiące z automatycznym przedłużeniem o kolejny rok i wymogiem listu poleconego.'],
  ['§ 3', 'Własność kont Google, Bing i domeny po stronie klienta', 'Google Search Console, GA4, Google Tag Manager, Profil Firmy w Google, Bing Webmaster Tools i Google Ads są założone na koncie firmowym zamawiającego; agencja otrzymuje rolę użytkownika lub menedżera.', 'Wizytówka Google lub usługa GA4 utworzona na koncie agencji bez praw głównego właściciela dla klienta.'],
  ['§ 4', 'Przeniesienie majątkowych praw autorskich do treści i kodu', 'Z chwilą opłacenia faktury za dany miesiąc zamawiający nabywa autorskie prawa majątkowe do napisanych tekstów, grafik, meta danych i zmian w kodzie (z zachowaniem formy pisemnej lub równoważnej dla przeniesienia praw).', 'Licencja wygasająca z końcem umowy lub prawo agencji do usunięcia artykułów ze strony klienta po wypowiedzeniu.'],
  ['§ 5', 'Trwałość pozyskanych linków i zakaz zaplecz rotacyjnych', 'Odnośniki zdobyte i opłacone w trakcie współpracy pozostają opublikowane po jej zakończeniu (z zastrzeżeniem niezależnych zmian wydawców zewnętrznych); zakaz systemów wymiany linków (SWL) i linków wynajmowanych na czas abonamentu.', 'Linki z prywatnego zaplecza agencji zdejmowane dzień po rozwiązaniu umowy, powodujące nagły spadek widoczności.'],
  ['§ 6', 'Akceptacja zmian na stronie i dziennik prac (change log)', 'Agencja prowadzi czytelny rejestr wdrożonych zmian technicznych i treściowych; modyfikacje wyglądu i kluczowych podstron ofertowych wchodzą na produkcję po akceptacji zamawiającego.', 'Wprowadzanie zmian w kodzie i tekstach bez wiedzy właściciela strony i bez kopii zapasowej.'],
  ['§ 7', 'Wynagrodzenie netto, limity dopłat i 0 zł opłat wyjściowych', 'Stała miesięczna kwota netto (lub w modelu mieszanym twardy górny limit miesięcznej faktury - cap) oraz wyraźny zapis o braku opłat aktywacyjnych i opłat za wydanie dostępów na koniec umowy.', 'Ukryta „opłata konfiguracyjna” przy starcie albo płatna procedura przekazania raportu końcowego.'],
  ['§ 8', 'Raportowanie z danych zamawiającego (GSC i GA4)', 'Comiesięczny raport (lub panel 24/7) oparty na Twoim Search Console i GA4: kliknięcia bez zapytań brandowych, zapytania ofertowe (zdarzenia kluczowe), lista wykonanych zadań i pełne adresy URL pozyskanych publikacji.', 'Raport zawierający wyłącznie tabelkę pozycji 15 wybranych fraz z wewnętrznego narzędzia agencji, bez adresów zdobytych linków.'],
  ['§ 9', 'Zasady GEO / AI i brak pozornych gwarancji 1. miejsca', 'Umowa o świadczenie usług starannego działania (art. 750 KC); przy module AI jawna lista pytań i częstotliwość pomiaru w określonych silnikach, bez obietnic gwarantowanego 1. miejsca w Google czy ChatGPT.', 'Obietnica „gwarantowanego TOP 1” powiązana z drobnym drukiem o frazach o zerowym wyszukiwaniu.'],
  ['§ 10', 'Poufność informacji handlowych i danych z analityki (NDA)', 'Zobowiązanie wykonawcy do zachowania w tajemnicy danych o konwersjach, marżach, kosztach pozyskania klienta i planach produktowych zamawiającego w trakcie umowy oraz po jej wygaśnięciu.', 'Jednostronna klauzula poufności zabraniająca klientowi pokazania umowy lub audytu niezależnemu prawnikowi lub audytorowi.'],
  ['§ 11', 'Symetryczna odpowiedzialność i brak kar za wypowiedzenie', 'Odpowiedzialność obu stron na zasadach ogólnych Kodeksu cywilnego; brak kar umownych nakładanych na klienta za skorzystanie z umownego prawa wypowiedzenia.', 'Kara umowna równa sumie wszystkich abonamentów do końca 24-miesięcznego okresu przy wcześniejszej rezygnacji.'],
  ['§ 12', 'Powierzenie RODO (art. 28) i procedura wyjścia (exit plan)', 'Jeśli agencja ma dostęp do formularzy kontaktowych, CRM lub panelu sklepu z danymi klientów - załącznik powierzenia przetwarzania danych osobowych (RODO) oraz obowiązek zwrotu/odpięcia dostępów w 7 dni roboczych po zakończeniu umowy.', 'Brak umowy powierzenia RODO mimo dostępu administracyjnego do bazy zamówień WooCommerce lub skrzynki leadów.'],
];

export const PARAGRAFY_EN = [
  ['Clause 1', 'Scope of services & countable monthly deliverables', 'Specify exact monthly outputs: technical audit & fixes, minimum content pieces and word/brief standard, minimum editorial backlinks and quality criteria, plus Google Business Profile tasks.', 'Vague "full-service SEO" wording with zero deliverable counts or specifications.'],
  ['Clause 2', 'Term & 1-month rolling notice via email', 'Open-ended monthly rolling agreement terminable with 1 month’s notice sent by email; a short minimum term (e.g. 3 months) applies only if the agency builds a new website upfront inside the fee.', '12- to 24-month lock-in with silent auto-renewal for another 12 months and registered-mail notice traps.'],
  ['Clause 3', 'Client ownership of Google, Bing & domain accounts', 'Google Search Console, GA4, Google Tag Manager, Google Business Profile, Bing Webmaster Tools and Google Ads live under the client’s company email; the agency acts as an authorized user or manager.', 'Analytics properties or Business Profiles created under an agency-owned master account where the client lacks Primary Owner rights.'],
  ['Clause 4', 'Intellectual property assignment for copy & code', 'Upon payment of each monthly invoice, full economic copyright and usage rights to all written articles, landing pages, graphics, meta tags and code fixes transfer permanently to the client.', 'Revocable license clauses allowing the vendor to unpublish or delete paid copy after contract termination.'],
  ['Clause 5', 'Permanent backlinks & ban on rented PBN links', 'Editorial links earned during the engagement remain live after termination (subject only to independent third-party publisher changes); strict prohibition on rented link networks and Google spam-policy violations.', 'Links placed on agency-controlled PBNs that get stripped the day your retainer ends, triggering a ranking drop.'],
  ['Clause 6', 'Pre-release approval & transparent change log', 'The agency maintains an itemized work log of technical and content updates, and obtains client sign-off before pushing structural template or commercial copy changes live.', 'Unannounced template edits or plugin installations pushed directly to production with no backup or changelog.'],
  ['Clause 7', 'Transparent net fee, caps & zero exit charges', 'Clear fixed monthly net fee (or an explicit monthly ceiling cap in hybrid models), with zero hidden setup fees and zero administrative charges for offboarding at the end of the contract.', 'Surprise "account handover fees" or charges to export historical keyword and link reports when leaving.'],
  ['Clause 8', 'Reporting from first-party data (GSC & GA4)', 'Monthly report (or 24/7 live portal) sourced from your own Search Console and GA4: non-brand clicks, organic key events (leads), completed tasks and exact live URLs of earned links.', 'Reports showing only a 15-keyword rank tracker screenshot with link URLs hidden behind "proprietary database" excuses.'],
  ['Clause 9', 'AI search (GEO) scope & no fake #1 guarantees', 'Best-efforts professional services standard; if AI search optimization is included, specify the prompt count, queried engines and cadence - with zero deceptive #1 ranking guarantees.', 'Guaranteed "#1 on Google or ChatGPT" claims tied to zero-volume vanity phrases in the fine print.'],
  ['Clause 10', 'Mutual confidentiality of business & analytics data', 'Obliges the agency to keep conversion rates, margins, CRM data and product roadmaps confidential during and after the engagement.', 'One-sided gag clauses forbidding the client from sharing audit findings or contract terms with legal counsel or an independent consultant.'],
  ['Clause 11', 'Balanced liability & no early-exit penalty fees', 'Fair, balanced liability limits and zero punitive liquidated damages for exercising ordinary notice of termination.', 'Early-termination penalties forcing payment of 100% of remaining months on a 24-month contract regardless of non-performance.'],
  ['Clause 12', 'GDPR Data Processing Agreement (Art. 28) & exit plan', 'Whenever the agency accesses CMS form submissions, e-commerce orders or CRM records containing personal data, attach an Art. 28 GDPR DPA and mandate clean access revocation within 7 business days of termination.', 'Admin access to WordPress/WooCommerce customer records with no GDPR data-processing addendum in place.'],
];

const ZRODLA_PL = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO? (brak gwarancji 1. miejsca, odpowiedzialność właściciela strony, dostęp do kont)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=pl', nazwa: 'Google Search Central: Zasady dotyczące spamu w wyszukiwarce Google (kupowanie i sprzedawanie linków)', data: '2026-11-22' },
  { url: 'https://support.google.com/webmasters/answer/7687615?hl=pl', nazwa: 'Pomoc Search Console: Zarządzanie właścicielami, użytkownikami i uprawnieniami usługi', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3403100?hl=pl', nazwa: 'Pomoc Profilu Firmy w Google: Różnica między głównym właścicielem a menedżerem profilu', data: '2026-11-22' },
  { url: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093', nazwa: 'Ustawa z dnia 23 kwietnia 1964 r. - Kodeks cywilny (art. 77^2 forma dokumentowa, art. 746 i art. 750 umowy o świadczenie usług)', data: '2026-11-22' },
  { url: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19940240083', nazwa: 'Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych (art. 53 forma pisemna przeniesienia majątkowych praw autorskich)', data: '2026-11-22' },
  { url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', nazwa: 'Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO / GDPR - art. 28 umowa powierzenia przetwarzania danych)', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo', nazwa: 'Google Search Central: Do you need an SEO? (ranking guarantees, site-owner responsibility & read/write access)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search (link spam & paid links)', data: '2026-11-22' },
  { url: 'https://support.google.com/webmasters/answer/7687615', nazwa: 'Search Console Help: Managing owners, users, and permissions', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3403100', nazwa: 'Google Business Profile Help: Primary owners vs. managers', data: '2026-11-22' },
  { url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', nazwa: 'Regulation (EU) 2016/679 (General Data Protection Regulation - Article 28 processor agreements)', data: '2026-11-22' },
];

const SZABLON_UMOWA = {
  slug: 'umowa-na-pozycjonowanie',
  sciezkaEn: '/tools/seo-contract-checklist',
  plik: 'umowa-na-pozycjonowanie',
  opublikowano: null,
  updated: '2026-11-22',
  fraza: { pl: 'umowa na pozycjonowanie', en: 'seo contract' },
  frazyDodatkowe: {
    pl: ['umowa seo wzór', 'wypowiedzenie umowy na pozycjonowanie', 'umowa z agencją seo', 'bezpieczna umowa seo', 'umowa na pozycjonowanie strony pdf'],
    en: ['seo contract template', 'seo agreement checklist', 'seo retainer contract clauses'],
  },
  seo: {
    pl: {
      tytul: 'Umowa na pozycjonowanie: wzór i checklista 12 zapisów',
      opis: 'Umowa na pozycjonowanie: wzór PDF i checklista 12 zapisów. Sprawdź 1-mies. wypowiedzenie, własność kont Google, prawa do treści i trwałość linków.',
    },
    en: {
      tytul: 'SEO Contract Template & 12-Clause Checklist (Free PDF)',
      opis: 'Educational SEO contract template & 12-clause buyer checklist (PDF): 1-month notice, Google account ownership, content IP, permanent links & GDPR.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Umowa na pozycjonowanie (wzór)',
    tag: 'Wzór PDF i checklista 12 paragrafów',
    h1: 'Umowa na pozycjonowanie strony: wzór PDF i checklista 12 bezpiecznych zapisów',
    lead: 'Dobra umowa na pozycjonowanie chroni obie strony: określa policzalny zakres prac, 1-miesięczne wypowiedzenie oraz pozostawia konta Google, opłacone teksty i zdobyte linki po stronie Twojej firmy. Poniżej omawiamy 12 kluczowych paragrafów bezpiecznego kontraktu B2B i udostępniamy darmowy wzór PDF z listą kontrolną.',
    karta: {
      nazwa: 'Umowa na pozycjonowanie: wzór i checklista (PDF)',
      opis: '12 kluczowych paragrafów bezpiecznej umowy SEO B2B, czerwone flagi w regulaminach agencji i gotowy szkielet umowy do pobrania w PDF.',
      cta: 'Pobierz wzór umowy',
    },
    sekcje: [
      {
        id: 'informacja-prawna-i-charakter-umowy',
        h2: 'Zanim podpiszesz: charakter prawny umowy SEO i uczciwe zastrzeżenie',
        html: `<p><strong>Ważna informacja prawna:</strong> udostępniony poniżej materiał stanowi <em>wzór edukacyjny i listę kontrolną dla zamawiającego</em> - nie stanowi indywidualnej porady prawnej w rozumieniu przepisów ustawy Prawo o adwokaturze ani ustawy o radcach prawnych. Przy umowach o znacznej wartości lub niestandardowym podziale praw własności intelektualnej skonsultuj ostateczny tekst kontraktu z radcą prawnym lub adwokatem.</p>
<p>W polskim obrocie gospodarczym B2B <strong>umowa na pozycjonowanie</strong> jest co do zasady nienazwaną umową o świadczenie usług, do której na podstawie <code>art. 750 Kodeksu cywilnego</code> stosuje się odpowiednio przepisy o zleceniu. Oznacza to, że jest to <strong>umowa starannego działania, a nie umowa rezultatu (o dzieło)</strong>. Dlaczego ma to fundamentalne znaczenie? Ponieważ algorytm wyszukiwarki Google, Mapy Google oraz odpowiedzi modeli językowych (ChatGPT, Gemini, Perplexity) należą do podmiotów trzecich. Sama dokumentacja Google Search Central ostrzega wprost: nikt nie może zagwarantować pierwszego miejsca w wynikach wyszukiwania.</p>
<p>Skoro uczciwa agencja nie może wpisać do umowy „gwarancji TOP 1”, równowaga kontraktowa musi opierać się na czymś innym: <strong>policzalnym zakresie prac, własności aktywów klienta</strong> oraz krótkim, 1-miesięcznym okresie wypowiedzenia, który pozwala bez kar zakończyć współpracę, gdy prace stoją w miejscu.</p>`,
      },
      {
        id: '12-paragrafow-umowy-seo',
        h2: '12 paragrafów bezpiecznej umowy na pozycjonowanie - tabela kontrolna',
        html: `<p>Weź przesłany przez wykonawcę projekt umowy wraz z załącznikami i Ogólnymi Warunkami Świadczenia Usług (OWU / regulaminem - często to właśnie w zewnętrznym regulaminie kryją się automatyczne przedłużenia i opłaty dodatkowe). Przejdź punkt po punkcie przez poniższe 12 obszarów:</p>`,
        tabela: {
          id: 'tabela-12-paragrafow-seo',
          caption: '12 kluczowych paragrafów umowy na pozycjonowanie: zdrowy standard B2B kontra czerwone flagi',
          columns: [
            { key: 'nr', label: '§' },
            { key: 'obszar', label: 'Obszar umowy' },
            { key: 'standard', label: 'Bezpieczny zapis dla zamawiającego' },
            { key: 'flaga', label: 'Czerwona flaga w umowie agencji' },
          ],
          rows: PARAGRAFY_PL.map(([nr, obszar, standard, flaga], idx) => ({
            id: `p-${idx + 1}`,
            nr,
            obszar,
            standard,
            flaga,
          })),
          przypis: 'Opracowanie własne AI SEO COMPANY na podstawie wytycznych Google Search Central, analizy OWU polskich agencji SEO oraz przepisów KC, PrAut i RODO (stan na 22.11.2026).',
        },
      },
      {
        id: 'okres-wypowiedzenia-i-lock-in',
        h2: '1-miesięczne wypowiedzenie kontra lock-in na 12-24 miesiące',
        html: `<p>Najczęstsze źródło sporów między firmami a agencjami SEO to czas trwania kontraktu. Część wykonawców tłumaczy 12- lub 24-miesięczny okres bez możliwości wcześniejszego wypowiedzenia tym, że „SEO wymaga czasu”. To prawda, że budowa autorytetu domeny trwa miesiącami - ale ryzyko braku zaangażowania wykonawcy nie powinno obciążać wyłącznie klienta.</p>
<p>Na co zwrócić szczególną uwagę w paragrafie o rozwiązaniu umowy:</p>
<ul>
<li><strong>Forma wypowiedzenia (art. 77<sup>2</sup> KC):</strong> wpisz formę dokumentową, czyli wysłanie wiadomości e-mail na wskazany adres wykonawcy. Wymóg „formy pisemnej pod rygorem nieważności doręczonej listem poleconym przed ostatnim dniem miesiąca” bywa wykorzystywany do kwestionowania terminu przez datę odbioru awiza.</li>
<li><strong>Klauzula rolowania (automatycznego przedłużenia):</strong> wykreśl zapisy mówiące, że brak wypowiedzenia złożonego na 60 lub 90 dni przed końcem rocznej umowy automatycznie wiąże firmę na kolejne 12 miesięcy na czas oznaczony. Po ewentualnym okresie początkowym umowa powinna przechodzić na czas nieoznaczony z 1-miesięcznym wypowiedzeniem.</li>
<li><strong>Kiedy minimalny okres ma uzasadnienie ekonomiczne:</strong> wyłącznie wtedy, gdy wykonawca finansuje na starcie wymierny produkt - np. w naszym pakiecie <a href="/cennik-pozycjonowania">Booster Pack</a> budujemy od zera dedykowaną stronę w Next.js bez opłaty startowej, dlatego umowa ma przejrzysty próg 3 miesięcy, a potem staje się umową miesięczną. W pakietach SEO Standard i SEO Premium od pierwszego dnia obowiązuje umowa miesięczna.</li>
</ul>`,
      },
      {
        id: 'wlasnosc-kont-tresci-i-linkow',
        h2: 'Własność kont Google, praw autorskich do tekstów i zdobytych linków',
        html: `<h3>1. Konta analityczne i wizytówka Google na Twoim adresie e-mail</h3>
<p>Zgodnie z dokumentacją Google główny właściciel usługi Search Console, konta GA4 oraz Profilu Firmy w Google ma pełną władzę administracyjną, w tym prawo usuwania innych użytkowników. W umowie zastrzeż, że wszystkie te usługi są zakładane na koncie należącym do Twojej firmy, a agencja pracuje na uprawnieniach użytkownika lub menedżera. Dzięki temu po zakończeniu współpracy nie tracisz 16 miesięcy historii zapytań ani wypracowanych opinii w Mapach Google.</p>
<h3>2. Majątkowe prawa autorskie (uwaga na wymóg formy pisemnej z art. 53 PrAut)</h3>
<p>W polskim prawie autorskim (<code>art. 53 ustawy o prawie autorskim i prawach pokrewnych</code>) przeniesienie majątkowych praw autorskich wymaga zachowania formy pisemnej pod rygorem nieważności (lub kwalifikowanego podpisu elektronicznego). Jeśli podpisujecie umowę zwykłym skanem lub akceptacją e-mailową bez podpisów kwalifikowanych, samo zdanie „prawa autorskie przechodzą na klienta” może być prawnie bezskuteczne - w takim trybie bezpiecznym minimum jest <strong>nieodwołalna, bezterminowa licencja z prawem modyfikacji</strong> oraz bezwzględny zakaz usuwania tekstów po ustaniu umowy.</p>
<h3>3. Zakaz zdejmowania opłaconych linków po końcu współpracy</h3>
<p>Zapytaj wprost, gdzie publikowane są odnośniki. Jeżeli agencja umieszcza linki wyłącznie na własnym zamkniętym zapleczu i w OWU zastrzega, że utrzymuje je tylko w okresie opłacania abonamentu, po wypowiedzeniu umowy profil linkowy Twojej domeny zawali się z dnia na dzień. Bezpieczna umowa wyklucza systemy wymiany linków (SWL), nakazuje przekazywanie pełnych adresów URL opublikowanych artykułów w raporcie miesięcznym i zabrania wykonawcy celowego usuwania linków pozyskanych w opłaconych okresach rozliczeniowych.</p>
<p>Jeżeli masz już podpisaną niekorzystną umowę i przygotowujesz się do bezpiecznego przejęcia kont, skorzystaj z naszego osobnego poradnika i 32-punktowej listy: <a href="/zmiana-agencji-seo">zmiana agencji SEO bez utraty pozycji</a>.</p>`,
      },
      {
        id: 'rodo-i-odpowiedzialnosc-przed-google',
        h2: 'Powierzenie RODO (art. 28) oraz odpowiedzialność właściciela domeny przed Google',
        html: `<p>Dwa paragrafy, o których zamawiający przypominają sobie dopiero podczas kontroli lub awarii:</p>
<ul>
<li><strong>Umowa powierzenia przetwarzania danych osobowych (RODO):</strong> jeżeli przekazujesz agencji dostęp administracyjny do panelu WordPressa, WooCommerce, Shopify, systemu CRM albo wgląd w treść zapytań spływających z formularzy kontaktowych, wykonawca uzyskuje dostęp do imion, nazwisk, adresów e-mail i numerów telefonów Twoich klientów. W takiej sytuacji zgodnie z <code>art. 28 RODO</code> integralnym załącznikiem do umowy głównej powinna być umowa powierzenia przetwarzania danych określająca cel, zakres i środki bezpieczeństwa (np. uwierzytelnianie dwuskładnikowe 2FA).</li>
<li><strong>Odpowiedzialność przed wyszukiwarką Google:</strong> poradnik Google Search Central przypomina, że ostateczną odpowiedzialność za stan witryny w indeksie ponosi właściciel domeny, a nie wynajęta firma zewnętrzna. Dlatego umowa powinna zobowiązywać wykonawcę do niestosowania technik zakazanych w zasadach dotyczących spamu Google (ukryty tekst, cloaking, masowe generowanie bezwartościowych podstron spamowych, kupowanie linków z farm) oraz do prowadzenia dziennika zmian na stronie.</li>
</ul>
<p>Zanim przejdziesz do etapu negocjowania paragrafów, możesz wysłać wybranym wykonawcom ustrukturyzowane <a href="/narzedzia/zapytanie-ofertowe-seo">zapytanie ofertowe na SEO (wzór PDF)</a> oraz porównać modele rozliczeń w analizie <a href="/porownania/pozycjonowanie-za-efekt-czy-abonament">pozycjonowanie za efekt czy abonament</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'Wzór umowy na pozycjonowanie strony i lista kontrolna (podgląd szkieletu)',
      opis: 'Poniżej zobaczysz szkielet edukacyjny 12 paragrafów bezpiecznej umowy B2B. W pliku PDF otrzymasz pełną wersję do wydruku wraz z tabelą kontrolną przed podpisem i protokołem przekazania dostępów.',
      html: `<p><strong>ZASTRZEŻENIE:</strong> Wzór edukacyjny i lista kontrolna dla przedsiębiorców - nie stanowi indywidualnej porady prawnej. Przed podpisaniem dostosuj zapisy do specyfiki firmy z udziałem radcy prawnego lub adwokata.</p>
<h3>Komparycja umowy</h3>
<p>Umowa o świadczenie usług pozycjonowania (SEO / GEO) zawarta w dniu [data] pomiędzy: <strong>[Dane Zamawiającego, adres, KRS/CEIDG, NIP]</strong> („Zamawiający”) a <strong>[Dane Wykonawcy, adres, KRS/CEIDG, NIP]</strong> („Wykonawca”).</p>
<h3>§ 1. Przedmiot umowy i mierzalny zakres prac</h3>
<p>1. Wykonawca zobowiązuje się do starannego świadczenia usług optymalizacji technicznej, rozbudowy treści, pozyskiwania odnośników oraz analityki dla serwisu internetowego pod adresem <code>[domena.pl]</code>.<br>
2. Szczegółowy minimalny zakres miesięcznych świadczeń określa Załącznik nr 1 (w tym: audyt startowy, min. [X] tekstów o objętości/standardzie wg briefu, min. [Y] publikacji zewnętrznych z linkiem, prowadzenie Profilu Firmy w Google oraz opcjonalnie monitoring [Z] pytań w wyszukiwarkach AI).</p>
<h3>§ 2. Czas trwania umowy i wypowiedzenie</h3>
<p>1. Umowa zostaje zawarta na czas nieoznaczony ze skutkiem od dnia [data].<br>
2. Każdej ze Stron przysługuje prawo wypowiedzenia Umowy z zachowaniem 1-miesięcznego okresu wypowiedzenia ze skutkiem na koniec miesiąca kalendarzowego.<br>
3. Oświadczenie o wypowiedzeniu może zostać złożone w formie dokumentowej (wiadomość e-mail wysłana na adresy kontaktowe wskazane w Umowie) bez jakichkolwiek opłat wyjściowych lub kar umownych z tytułu wypowiedzenia.</p>
<h3>§ 3. Własność kont i narzędzi analitycznych</h3>
<p>1. Wyłącznym głównym właścicielem usług Google Search Console, Google Analytics 4, Google Tag Manager, Profilu Firmy w Google, Bing Webmaster Tools oraz kont reklamowych pozostaje Zamawiający.<br>
2. Wykonawca działa na nadanych uprawnieniach użytkownika/menedżera i nie może pozbawić Zamawiającego statusu właściciela.</p>
<h3>§ 4. Prawa własności intelektualnej do treści i zmian technicznych</h3>
<p>1. Z chwilą uregulowania wynagrodzenia za dany okres rozliczeniowy Wykonawca przenosi na Zamawiającego majątkowe prawa autorskie (a w przypadku zawarcia Umowy w formie dokumentowej - udziela nieodwołalnej, bezterminowej licencji niewyłącznej z prawem modyfikacji i sublicencji) do wszelkich utworów powstałych w ramach Umowy: artykułów, opisów usług, grafik, meta danych i modyfikacji kodu.<br>
2. Po zakończeniu Umowy Wykonawca nie jest uprawniony do usunięcia opublikowanych treści ani wycofania wdrożonych poprawek optymalizacyjnych.</p>
<h3>§ 5. Zasady pozyskiwania odnośników i zgodność z wytycznymi wyszukiwarek</h3>
<p>1. Wykonawca oświadcza, że nie będzie stosować systemów wymiany linków (SWL), ukrytego tekstu, cloakingu ani przejętych zaplecz spamowych naruszających zasady dotyczące spamu Google.<br>
2. Wykonawca zobowiązuje się nie usuwać ani nie modyfikować na niekorzyść Zamawiającego odnośników pozyskanych i rozliczonych w trakcie trwania Umowy po jej rozwiązaniu.</p>
<h3>§ 6. Akceptacja wdrożeń i dziennik prac</h3>
<p>1. Wykonawca prowadzi bieżący dziennik prac dostępny dla Zamawiającego.<br>
2. Publikacja nowych tekstów oraz istotne zmiany wizualne lub strukturalne w serwisie wymagają uprzedniej akceptacji Zamawiającego w formie dokumentowej (brak uwag w terminie [5] dni roboczych uznaje się za akceptację albo wymaga się jawnego potwierdzenia - wybierz wariant).</p>
<h3>§ 7. Wynagrodzenie i zasady fakturowania</h3>
<p>1. Z tytułu realizacji Umowy Wykonawca otrzymuje stałe miesięczne wynagrodzenie ryczałtowe w kwocie [kwota] zł netto powiększone o należny podatek VAT, płatne w terminie [14] dni od doręczenia prawidłowej faktury.<br>
2. Wszelkie wydatki wykraczające poza ryczałt wymagają uprzedniej zgody Zamawiającego wyrażonej co najmniej w formie dokumentowej.</p>
<h3>§ 8. Raportowanie efektów</h3>
<p>Do [5.] dnia roboczego każdego miesiąca Wykonawca udostępnia raport za miesiąc poprzedni obejmujący: dane z Google Search Console i GA4 Zamawiającego (kliknięcia niebrandowe, wyświetlenia, zdarzenia kluczowe), zestawienie wykonanych prac, opublikowanych podstron oraz pełną listę adresów URL pozyskanych odnośników.</p>
<h3>§ 9. Charakter zobowiązania (brak pozornych gwarancji)</h3>
<p>Strony potwierdzają, że ze względu na niezależność algorytmów Google oraz modeli językowych AI Umowa jest umową starannego działania. Wykonawca odpowiada za rzetelne wykonanie uzgodnionego zakresu prac i pomiaru, nie gwarantując konkretnej pojedynczej pozycji w rankingu.</p>
<h3>§ 10-§ 12. Poufność, RODO i procedura zakończenia współpracy</h3>
<p>Strony zachowują w poufności dane handlowe i analityczne (§ 10), regulują zasady odpowiedzialności bez kar za wypowiedzenie (§ 11), a w razie dostępu do danych osobowych zawierają umowę powierzenia przetwarzania danych zgodną z art. 28 RODO i w terminie 7 dni roboczych od końca Umowy zamykają dostępy administracyjne (§ 12).</p>`,
    },
    formularz: {
      h2: 'Pobierz wzór umowy na pozycjonowanie i checklistę 12 zapisów (PDF)',
      opis: 'Wyślemy na Twój adres e-mail gotowy do wydruku dokument A4 w PDF: szkielet bezpiecznej umowy B2B na pozycjonowanie strony, tabelę kontrolną 12 paragrafów do sprawdzenia oferty agencji oraz listę przekazania dostępów.',
      etykieta: 'Twój służbowy adres e-mail',
      przycisk: 'Wyślij mi wzór umowy w PDF',
      przedmiot: 'wzór umowy na pozycjonowanie i checklistę 12 zapisów',
      komunikatOk: 'Wysłano. Sprawdź skrzynkę (także zakładki Oferty i Spam): link do pobrania pliku PDF dotrze w ciągu minuty.',
    },
    faq: [
      {
        question: 'Czy ten wzór umowy na pozycjonowanie zastępuje konsultację z prawnikiem?',
        answer: 'Nie. Dokument ma charakter wzoru edukacyjnego i praktycznej listy kontrolnej dla właścicieli firm oraz menedżerów marketingu. Pomaga szybko wyłapać niekorzystne zapisy o własności kont, linków czy wieloletnim okresie wypowiedzenia. Przy dużych budżetach lub złożonych wdrożeniach (np. z budową oprogramowania i pisemnym przeniesieniem autorskich praw majątkowych z art. 53 PrAut) skonsultuj umowę z radcą prawnym lub adwokatem.',
      },
      {
        question: 'Czy umowa z agencją SEO może zostać wypowiedziana w każdym momencie na podstawie art. 746 Kodeksu cywilnego?',
        answer: 'Do umów o świadczenie usług SEO stosuje się odpowiednio przepisy o zleceniu, a art. 746 § 3 KC stanowi, że nie można zrzec się z góry uprawnienia do wypowiedzenia zlecenia z ważnych powodów. W relacjach między przedsiębiorcami (B2B) umowy często modyfikują jednak tryb zwykłego wypowiedzenia bez podania przyczyny i wprowadzają wysokie kary lub odszkodowania - dlatego tak ważne jest wpisanie prostego 1-miesięcznego wypowiedzenia e-mailem jeszcze przed podpisem.',
      },
      {
        question: 'Dlaczego forma e-mailowa może nie wystarczyć do pełnego przeniesienia praw autorskich do tekstów?',
        answer: 'Zgodnie z art. 53 polskiej ustawy o prawie autorskim i prawach pokrewnych umowa o przeniesienie autorskich praw majątkowych wymaga zachowania formy pisemnej pod rygorem nieważności (własnoręczny podpis na papierze lub kwalifikowany podpis elektroniczny). Jeżeli umowę zawieracie przez wymianę skanów lub kliknięcie w e-mailu, warto dopisać klauzulę nieodwołalnej, bezterminowej licencji niewyłącznej z prawem modyfikacji, która nie wymaga formy pisemnej pod rygorem nieważności.',
      },
      {
        question: 'Czy agencja ma prawo usunąć zdobyte linki po rozwiązaniu umowy?',
        answer: 'Zależy od tego, co podpiszesz w umowie i regulaminie. Niektóre agencje budują linki wyłącznie na własnych stronach zapleczowych i wprost piszą w OWU, że usługa polega na „dzierżawie powierzchni reklamowej w okresie trwania umowy”. Po rezygnacji zdejmują linki jednym kliknięciem. Nasz wzór zabezpiecza Cię przed takim modelem, wymagając trwałych publikacji zewnętrznych i przekazywania ich adresów URL co miesiąc.',
      },
      {
        question: 'Kiedy do umowy na pozycjonowanie trzeba dołączyć umowę powierzenia RODO?',
        answer: 'Zawsze wtedy, gdy agencja otrzymuje dostęp do systemów, w których przetwarzane są dane osobowe Twoich klientów lub pracowników - na przykład konto administratora w WordPressie z wtyczką zapisującą wysłane formularze kontaktowe, dostęp do panelu zamówień sklepu WooCommerce/Shopify albo podgląd leadów w CRM. Przy samym dostępie do zagregowanych statystyk Google Search Console dane osobowe klientów zwykle nie występują.',
      },
    ],
    zrodla: ZRODLA_PL,
    powiazane: [
      { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'Jak wybrać agencję SEO: 12 pytań', opis: 'pytania weryfikacyjne przed podpisaniem umowy z wykonawcą' },
      { href: '/porownania/pozycjonowanie-za-efekt-czy-abonament', tekst: 'Pozycjonowanie za efekt czy abonament', opis: 'analiza modeli rozliczeń 17 agencji i pułapek w umowach za wynik' },
      { href: '/zmiana-agencji-seo', tekst: 'Zmiana agencji SEO bez utraty pozycji', opis: '32-punktowa checklista przejęcia kont i danych od poprzedniej firmy' },
      { href: '/narzedzia/zapytanie-ofertowe-seo', tekst: 'Zapytanie ofertowe na SEO (wzór PDF)', opis: 'dokument wysyłany agencjom przed otrzymaniem projektu umowy' },
      { href: '/cennik-pozycjonowania', tekst: 'Cennik pozycjonowania AI SEO COMPANY', opis: 'nasze jawne pakiety z umową miesięczną bez ukrytych kosztów' },
    ],
    kroki: [
      { name: 'Poproś o komplet dokumentów przed decyzją', text: 'Zażycz sobie nie tylko głównego dokumentu umowy, ale również wszystkich załączników oraz Ogólnych Warunków Świadczenia Usług (OWU / regulaminu).' },
      { name: 'Sprawdź okres wiązania i formę wypowiedzenia', text: 'Upewnij się, że wypowiedzenie wynosi 1 miesiąc, można je wysłać zwykłym e-mailem i umowa nie przedłuża się milcząco na kolejne 12 miesięcy.' },
      { name: 'Zabezpiecz własność kont Google na domenie firmy', text: 'Załóż Search Console, GA4 i Profil Firmy na własnym koncie firmowym i wpisz do umowy zakaz przejmowania roli głównego właściciela.' },
      { name: 'Zweryfikuj prawa do treści i trwałość linków', text: 'Sprawdź zapis o przejściu praw autorskich (lub bezterminowej licencji) oraz zakaz usuwania tekstów i opłaconych linków po zakończeniu współpracy.' },
      { name: 'Doprecyzuj miesięczny raport i liczby w załączniku', text: 'Zastąp hasło „optymalizacja i link building” konkretną liczbą treści, standardem linków i raportowaniem z Twojego GSC oraz GA4.' },
      { name: 'Dołącz RODO (art. 28) przy dostępie do CMS/sklepu', text: 'Jeśli wykonawca wchodzi do panelu strony z formularzami lub zamówieniami klientów, podpiszcie umowę powierzenia przetwarzania danych osobowych.' },
    ],
    plikNazwa: 'Wzór umowy na pozycjonowanie i checklista 12 zapisów (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'SEO contract checklist & template',
    tag: 'Free PDF template & 12-clause checklist',
    h1: 'SEO contract template and 12-clause buyer checklist: what to verify before signing',
    lead: 'A fair SEO contract protects both sides: it defines countable monthly deliverables, sets a 1-month email notice period, and keeps Google accounts, paid content and earned backlinks owned by your company. Below we break down 12 essential B2B clauses and share a free printable PDF template and review checklist.',
    karta: {
      nazwa: 'SEO Contract Template & Checklist (PDF)',
      opis: '12 essential B2B SEO agreement clauses, agency red flags to strike before signing, and a clean educational contract framework in PDF.',
      cta: 'Download PDF template',
    },
    sekcje: [
      {
        id: 'legal-disclaimer-and-contract-nature',
        h2: 'Before you sign: legal disclaimer and why an SEO contract is a services agreement',
        html: `<p><strong>Important legal notice:</strong> this guide and downloadable PDF serve as an <em>educational template and commercial buyer checklist</em> - they do not constitute individual legal advice or create a lawyer-client relationship. Before executing a high-value or cross-jurisdictional B2B contract, have qualified legal counsel in your jurisdiction review the final agreement.</p>
<p>Legally and operationally, a professional <strong>SEO contract</strong> is a contract for ongoing services (best-efforts standard of care), not a fixed-outcome guarantee. Why? Because Google’s organic ranking systems, Google Maps and generative AI engines (ChatGPT, Gemini, Perplexity) are operated by independent third parties. Google Search Central states explicitly in its official hiring guide that <em>no one can guarantee a #1 ranking on Google</em>.</p>
<p>Because an honest agency cannot write "guaranteed #1 rankings" into a contract, buyer protection rests on three concrete pillars instead: <strong>specific monthly deliverables, 100% client asset ownership</strong> (every account, article and backlink paid for) and a short 1-month rolling notice period so you are never trapped paying for non-performance.</p>`,
      },
      {
        id: '12-clauses-seo-contract-table',
        h2: '12 clauses every B2B SEO contract should address',
        html: `<p>Request both the main service agreement and any hyperlinked Terms of Service or Master Services Agreement (auto-renewal traps and link-removal clauses often sit inside separate standard terms). Audit the draft against all 12 clauses below:</p>`,
        tabela: {
          id: 'table-12-seo-contract-clauses',
          caption: '12 core SEO contract clauses: healthy B2B buyer standard vs agency red flags',
          columns: [
            { key: 'nr', label: 'Clause' },
            { key: 'obszar', label: 'Contract area' },
            { key: 'standard', label: 'Healthy buyer-friendly clause' },
            { key: 'flaga', label: 'Red flag to strike or renegotiate' },
          ],
          rows: PARAGRAFY_EN.map(([nr, obszar, standard, flaga], idx) => ({
            id: `c-${idx + 1}`,
            nr,
            obszar,
            standard,
            flaga,
          })),
          przypis: 'Compiled by AI SEO COMPANY based on Google Search Central guidelines, European B2B agency contract reviews and GDPR Art. 28 standards (as of Nov 22, 2026).',
        },
      },
      {
        id: 'notice-period-vs-lock-in',
        h2: '1-month rolling notice vs 12- to 24-month agency lock-ins',
        html: `<p>The #1 source of buyer regret in B2B marketing is signing a 12- or 24-month non-cancellable SEO retainer, watching communication stall in month three, and discovering an early-exit penalty equal to the remaining contract balance. While organic growth genuinely compounds over 6-12 months, locking a client in by force shifts 100% of execution risk onto the buyer.</p>
<p>Check three specific mechanics in the termination clause:</p>
<ul>
<li><strong>Notice delivery by email:</strong> ensure notice of termination is valid when sent by email to the designated account address. Strike archaic clauses requiring physical registered mail delivered 60 days prior to an anniversary date.</li>
<li><strong>No silent 12-month auto-renewal:</strong> remove "evergreen" renewal clauses that lock you into a fresh 12-month fixed term if you miss a narrow cancellation window. Any initial term should convert automatically to a monthly rolling agreement.</li>
<li><strong>When a short minimum term makes economic sense:</strong> only when the agency fronts a high-cost deliverable at €0 upfront - for instance, in our <a href="/en/seo-pricing">Booster Pack</a> (€590 net/mo), we design and engineer a custom Next.js website for €0 upfront build fee, paired with a transparent 3-month minimum term before switching to monthly rolling. In our SEO Standard (from €450 net/mo) and SEO Premium (€590 net/mo) retainers, contracts are monthly rolling from month one.</li>
</ul>`,
      },
      {
        id: 'ownership-of-accounts-content-and-links',
        h2: 'Ownership of Google accounts, content IP and earned backlinks',
        html: `<h3>1. First-party ownership of Search Console, GA4 and Google Business Profile</h3>
<p>Google’s documentation draws a sharp line between a property <em>Owner</em> and a delegated <em>User</em> or <em>Manager</em>. Your contract must state that Google Search Console, GA4, Google Tag Manager, Google Business Profile, Bing Webmaster Tools and Google Ads remain registered under your company’s own domain email. Grant the agency user/manager permissions so offboarding takes thirty seconds without losing historical query or review data.</p>
<h3>2. Permanent intellectual property rights to written copy and code</h3>
<p>Verify that full economic copyright (or an irrevocable, perpetual, worldwide, royalty-free license with modification rights, depending on local copyright formalities) transfers to your business upon payment of each monthly invoice. Never sign a clause allowing an agency to unpublish blog posts, delete landing pages or revert technical optimizations when the retainer ends.</p>
<h3>3. Permanent backlinks vs "rented" PBN placements</h3>
<p>Some vendors place links exclusively on private blog networks (PBNs) they control and bury a line in their terms stating links are "maintained for the active duration of the contract". The week you cancel, every link vanishes and rankings crater. Require explicit confirmation that link acquisition follows Google’s spam policies, that earned placements are not removed by the agency post-termination, and that exact live URLs are delivered in every monthly report.</p>
<p>Already stuck in an opaque setup? Follow our step-by-step offboarding guide and 32-item checklist on <a href="/en/switching-seo-agency">switching SEO agencies without losing rankings</a>.</p>`,
      },
      {
        id: 'gdpr-dpa-and-google-responsibility',
        h2: 'GDPR Data Processing Agreements (Art. 28) and site-owner liability',
        html: `<p>Two compliance clauses frequently overlooked until an audit or security incident hits:</p>
<ul>
<li><strong>Article 28 GDPR Data Processing Agreement (DPA):</strong> if your SEO provider receives admin credentials to WordPress, WooCommerce, Shopify, Webflow form logs or your CRM, its team can view customer names, emails, phone numbers and order details. Under European data-protection law (<code>Article 28 GDPR</code>), attach a standard Data Processing Addendum defining permitted processing, 2FA security controls and prompt credential revocation within 7 business days of contract end.</li>
<li><strong>Site-owner responsibility before Google:</strong> Google Search Central reminds businesses that the website owner - not the hired agency - bears ultimate consequences if manipulative link schemes, doorway pages or scaled spam trigger a manual action. Binding your agency contractually to Google Search Essentials and pre-deployment approval protects your domain equity.</li>
</ul>
<p>Collecting quotes from several vendors before contract review? Send our standardized <a href="/en/tools/seo-rfp-template">SEO RFP template (free PDF)</a> and compare fee structures in <a href="/en/comparisons/pay-for-results-vs-monthly-retainer">pay-for-results SEO vs a monthly retainer</a>.</p>`,
      },
    ],
    podglad: {
      h2: 'SEO contract framework & 12-clause checklist (preview)',
      opis: 'Below is a clean preview of the 12-clause educational contract framework. Download the printable A4 PDF to get the full clause wording, red-flag review table and offboarding sign-off sheet.',
      html: `<p><strong>DISCLAIMER:</strong> Educational B2B framework and buyer checklist - not individual legal advice. Adapt to your governing law with qualified legal counsel before execution.</p>
<h3>Parties & Effective Date</h3>
<p>Search Engine Optimization & AI Visibility Services Agreement entered into on [Date] between <strong>[Client Legal Name, Registered Address, Tax/Company ID]</strong> ("Client") and <strong>[Agency Legal Name, Registered Address, Tax/Company ID]</strong> ("Provider").</p>
<h3>Clause 1. Scope of Services & Monthly Deliverables</h3>
<p>1. Provider shall perform ongoing technical SEO, content production, editorial link acquisition and analytics reporting for <code>[clientdomain.com]</code> with professional care.<br>
2. Minimum monthly deliverables are itemized in Schedule A (initial audit, at least [X] approved content pieces, at least [Y] editorial mentions/links, Google Business Profile management, and optional weekly tracking across [Z] buyer prompts in AI search engines).</p>
<h3>Clause 2. Term, Rolling Renewal & Email Notice</h3>
<p>1. This Agreement commences on [Date] on a rolling monthly basis.<br>
2. Either Party may terminate this Agreement by giving 1 calendar month’s notice via email to the designated contact addresses, with zero early-termination penalties or exit fees.</p>
<h3>Clause 3. Ownership of First-Party Accounts</h3>
<p>Client retains sole Primary Owner status over Google Search Console, Google Analytics 4, Google Tag Manager, Google Business Profile, Bing Webmaster Tools and ad accounts. Provider operates via revocable user/manager permissions.</p>
<h3>Clause 4. Intellectual Property Assignment</h3>
<p>Upon payment of each monthly invoice, all economic intellectual property rights (and an irrevocable, perpetual, worldwide license to modify and publish) in copy, graphics, metadata and code created for Client vest permanently in Client. Provider shall not delete or unpublish delivered work upon termination.</p>
<h3>Clause 5. Backlink Permanence & Search-Engine Compliance</h3>
<p>Provider shall comply with Google Search Essentials and spam policies (no PBNs, link exchanges or cloaking) and shall not remove, de-index or alter links earned during paid billing cycles after termination.</p>
<h3>Clause 6. Change Approval & Work Log</h3>
<p>Provider maintains an accessible work log and obtains Client approval via email prior to publishing new copy or altering site templates.</p>
<h3>Clause 7. Fees & Invoicing</h3>
<p>Client pays a fixed monthly fee of €[Amount] net (plus applicable VAT) within [14] days of invoice receipt. Any out-of-scope spend requires prior written approval via email.</p>
<h3>Clause 8. First-Party Reporting</h3>
<p>By the [5th] business day of each month (or live via 24/7 portal), Provider delivers a report sourced from Client’s GSC and GA4 covering non-brand clicks, organic key events, shipped tasks and exact live URLs of earned links.</p>
<h3>Clause 9. Standard of Care (No Deceptive Ranking Guarantees)</h3>
<p>Both Parties acknowledge third-party search and AI algorithms are outside Provider’s control; Provider warrants diligent execution of Schedule A deliverables rather than guaranteed #1 rankings.</p>
<h3>Clauses 10-12. Confidentiality, Balanced Liability, GDPR Art. 28 & Offboarding</h3>
<p>Mutual confidentiality of business and analytics data (Clause 10), balanced liability without termination penalties (Clause 11), attached GDPR Art. 28 DPA where CMS/CRM personal data is accessed, and clean access revocation within 7 business days of contract end (Clause 12).</p>`,
    },
    formularz: {
      h2: 'Download the SEO contract template & 12-clause checklist (PDF)',
      opis: 'Enter your email to receive the printable A4 PDF containing the 12-clause B2B SEO agreement framework, the red-flag review scorecard and the account-ownership handover sheet.',
      etykieta: 'Your work email address',
      przycisk: 'Email me the PDF checklist',
      przedmiot: 'the SEO contract template and 12-clause checklist (PDF)',
      komunikatOk: 'Sent. Check your inbox (including Promotions or Spam): your link to the SEO contract checklist PDF will arrive within a minute.',
    },
    faq: [
      {
        question: 'Does this SEO contract template replace hiring a lawyer?',
        answer: 'No. This template and 12-clause checklist are educational commercial tools built to help founders and marketing leads spot unfair lock-ins, missing deliverables and IP traps before signing. Because contract, copyright assignment and liability rules vary by jurisdiction, have qualified legal counsel review high-value agreements.',
      },
      {
        question: 'Why shouldn’t an SEO contract guarantee a #1 ranking on Google or ChatGPT?',
        answer: 'Google Search Central explicitly warns businesses against SEOs who claim to guarantee #1 rankings, because nobody outside Google or OpenAI controls search and LLM ranking algorithms. Vendors who "guarantee" rankings almost always pad the contract list with zero-search-volume phrases while neglecting pages that actually generate leads.',
      },
      {
        question: 'What happens to backlinks when an SEO retainer ends?',
        answer: 'Under a healthy agreement, editorial links earned on genuine third-party websites stay live naturally after your retainer ends. Watch out for agencies whose Terms of Service classify backlinks as "rented placements on partner portals" - those vendors strip all links upon cancellation, causing sudden ranking losses.',
      },
      {
        question: 'When is a minimum contract term reasonable in SEO?',
        answer: 'A short minimum commitment (for example 3 months) is reasonable only when the agency fronts a substantial upfront build at €0 setup cost - such as engineering a brand-new website inside a bundled package. For standard ongoing SEO on an existing website, a 1-month rolling notice period keeps incentives aligned.',
      },
      {
        question: 'Do we need a GDPR Data Processing Agreement (DPA) with our SEO agency?',
        answer: 'Yes, whenever the agency receives admin access to systems storing personal data of leads or customers - such as WordPress form logs, WooCommerce/Shopify orders or CRM integrations. If the agency only views aggregated search queries inside Google Search Console, personal customer records are typically not processed.',
      },
    ],
    zrodla: ZRODLA_EN,
    powiazane: [
      { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'How to choose an SEO agency', opis: '12 vetting questions to ask vendors before you request a contract draft' },
      { href: '/porownania/pozycjonowanie-za-efekt-czy-abonament', tekst: 'Pay-for-results SEO vs monthly retainer', opis: 'how billing structures affect contract caps and risk' },
      { href: '/zmiana-agencji-seo', tekst: 'Switching SEO agencies', opis: '32-item checklist to reclaim accounts and links safely' },
      { href: '/narzedzia/zapytanie-ofertowe-seo', tekst: 'SEO RFP template (PDF)', opis: 'collect comparable written proposals from 3-5 agencies first' },
      { href: '/cennik-pozycjonowania', tekst: 'SEO pricing & monthly terms', opis: 'our open plans from €450 net/mo with 1-month rolling contracts' },
    ],
    kroki: [
      { name: 'Request both the contract and separate Terms of Service', text: 'Auto-renewal windows, rented-link rules and exit fees often hide inside hyperlinked general terms rather than the 2-page order form.' },
      { name: 'Verify 1-month email notice and strike silent 12m renewals', text: 'Confirm you can cancel via email with 1 month’s notice and that no 60-day window locks you into another full year.' },
      { name: 'Keep Primary Owner status on all Google & Bing accounts', text: 'Register Search Console, GA4 and Google Business Profile on your own company domain email and grant user/manager roles only.' },
      { name: 'Confirm permanent content IP and permanent backlinks', text: 'Ensure paid articles and code fixes transfer to you upon invoice payment and earned links are never removed upon exit.' },
      { name: 'Itemize monthly deliverables & GSC/GA4 reporting', text: 'Replace vague promises with exact content counts, link quality standards and reporting pulled from your own analytics.' },
      { name: 'Attach a GDPR Art. 28 DPA when granting CMS/store access', text: 'Add a standard data-processing schedule and require credential removal within 7 business days of termination.' },
    ],
    plikNazwa: 'SEO contract template and 12-clause buyer checklist (PDF)',
  },
};

export default SZABLON_UMOWA;
