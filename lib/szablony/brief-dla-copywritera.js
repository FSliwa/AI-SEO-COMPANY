// Szablon: brief dla copywritera / content brief template (11.11.2026). Kontrakt: lib/szablony/README.md.
// PL /narzedzia/brief-dla-copywritera, EN /en/tools/content-brief-template, PDF przez panel (id 'brief-copywritera'):
// public/pliki/brief-dla-copywritera.pdf (PL) i content-brief-template.pdf (EN), źródła HTML w scripts/szablony/pdf/.
// Frazy i wolumeny: Google Ads przez DataForSEO, średnia 12 mies., pobrane 11.11.2026 (PL 2616/pl, EN USA 2840/en),
// prace-2026-11-11/szablony/nowe-tematy/dane/volume-*.tsv. SERP (desktop, 11.11.2026): PL brak szablonów PDF,
// EN 7/8 wyników to szablony; w obu przegląd AI.
// Kanibalizacja: ta strona = brief JEDNEGO tekstu (playbook zał. A + zał. C). Brief całego serwisu =
// /narzedzia/brief-strony-internetowej. PL „brief seo” i EN „seo brief template” przenosimy tutaj (integracja usuwa je
// z frazyDodatkowe briefu strony); obie strony mają zdanie rozróżnienia z linkiem.
// Przykład w sekcji „przyklad” jest prawdziwy: brief tej strony (liczby jak wyżej). Reguły Google tylko z listy zrodla
// (odczyt 11.11.2026). Progi jak w innych szablonach i w audycie (panel lib/narzedzia/audyt.ts): title > 60 zn.,
// description 120-160 zn., < 250 słów w HTML. Oferta: SEO Standard 1 900 zł / €450 (2 treści mies.), Premium 2 500 zł / €590 (4).
// CZESCI (eksport nazwany) = jedno źródło listy części dla podglądu; PDF ma te same części i pola.

const PL_CZESCI = [
  {
    nr: 1,
    nazwa: 'Zlecenie',
    opis: 'Podstawowe dane: co powstaje, gdzie się ukaże i na kiedy.',
    pola: [
      'Tytuł roboczy tekstu',
      'Rodzaj tekstu: ☐ artykuł poradnikowy ☐ strona usługi ☐ kategoria lub produkt ☐ porównanie ☐ aktualizacja istniejącego tekstu',
      'Adres URL docelowy (nowy albo istniejący)',
      'Zleceniodawca i osoba do pytań (e-mail, telefon)',
      'Copywriter',
      'Termin konspektu, szkicu i publikacji',
      'Orientacyjna objętość (widełki z analizy TOP 5, nie cel do „nabicia”)',
      'Liczba rund poprawek w cenie',
    ],
  },
  {
    nr: 2,
    nazwa: 'Cel i odbiorca',
    opis: 'Po co powstaje tekst i do kogo mówi.',
    pola: [
      'Cel biznesowy: co czytelnik ma zrobić po lekturze (zapytanie, telefon, zapis, przejście do oferty)',
      'Główne wezwanie do działania (CTA) i adres, do którego prowadzi',
      'Odbiorca: kim jest, co już wie, jaki problem chce rozwiązać',
      'Etap decyzji: ☐ szuka informacji ☐ porównuje oferty ☐ jest gotowy do zakupu',
      'Pytania i obiekcje klientów (z telefonów, maili i rozmów handlowych)',
    ],
  },
  {
    nr: 3,
    nazwa: 'Fraza główna i intencja',
    opis: 'Jedna grupa fraz o tej samej intencji to jeden adres URL.',
    pola: [
      'Fraza główna, miesięczna liczba wyszukiwań, źródło i data',
      'Frazy dodatkowe i warianty (tylko z tą samą intencją)',
      'Intencja: ☐ informacyjna ☐ komercyjna ☐ transakcyjna ☐ nawigacyjna',
      'Format, który wygrywa w wynikach: ☐ poradnik ☐ lista ☐ porównanie ☐ strona usługi ☐ szablon lub narzędzie',
      'Czego tekst NIE obejmuje (tematy i frazy przypisane do innych adresów)',
    ],
  },
  {
    nr: 4,
    nazwa: 'Analiza wyników: TOP 5 i przegląd AI',
    opis: 'Wpisz frazę w Google w oknie prywatnym i otwórz pięć pierwszych wyników organicznych.',
    tabela: { kolumny: ['Poz.', 'Adres', 'Typ i format', 'Co pokrywa', 'Czego brakuje'], wiersze: ['1', '2', '3', '4', '5'] },
    pola: [
      'Tematy obowiązkowe (to, co pokrywają wszystkie strony z TOP 5)',
      'Przegląd AI: ☐ jest ☐ nie ma; na jakie pytanie odpowiada i które strony cytuje',
      'Podobne pytania i podpowiedzi w polu wyszukiwania',
    ],
  },
  {
    nr: 5,
    nazwa: 'Co dodajemy (information gain) i materiały',
    opis: 'Przynajmniej jedna rzecz, której nie ma w pierwszej dziesiątce wyników.',
    pola: [
      'Co wnosimy: ☐ dane własne ☐ przykład z praktyki ☐ ceny lub widełki ☐ zdjęcia z realizacji ☐ stanowisko eksperta ☐ tabela, lista kontrolna albo kalkulator',
      'Co dokładnie i skąd',
      'Materiały od firmy: co, kto dostarczy, do kiedy',
      'Ekspert do rozmowy albo recenzji (imię, nazwisko, stanowisko)',
    ],
  },
  {
    nr: 6,
    nazwa: 'Struktura tekstu',
    opis: 'Konspekt akceptujesz przed pisaniem: to najtańszy moment na zmiany.',
    pola: [
      'H1 (propozycja z frazą główną)',
      'Pierwszy akapit: na jakie pytanie odpowiada wprost (40–60 słów)',
    ],
    tabela: { kolumny: ['Nagłówek H2 lub H3', 'Na jakie pytanie odpowiada', 'Co musi się znaleźć (fakty, przykłady)'], wiersze: ['H2', 'H3', 'H2'] },
    polaPo: ['Pytania do sekcji FAQ (3–6)'],
  },
  {
    nr: 7,
    nazwa: 'Linki i źródła',
    opis: 'Link do strony nadrzędnej i do 2–4 stron powiązanych. Tekst linku opisuje stronę docelową.',
    tabela: { kolumny: ['Link do (adres)', 'Tekst linku (anchor)', 'Gdzie w tekście'], wiersze: ['', '', ''] },
    pola: [
      'Strony, które po publikacji mają linkować do nowego tekstu',
      'Źródła faktów i liczb (adres i data odczytu)',
    ],
  },
  {
    nr: 8,
    nazwa: 'Ton, styl i zasady',
    pola: [
      'Forma zwracania się: ☐ Ty ☐ Państwo ☐ bezosobowo',
      'Poziom wiedzy czytelnika: ☐ początkujący ☐ średniozaawansowany ☐ ekspert',
      'Słowa i nazwy wymagane (usługi, marka)',
      'Słowa i sformułowania zakazane',
      'Tekst, którego styl nam odpowiada (adres)',
      'AI: ☐ nie korzystamy ☐ tylko research i konspekt ☐ szkic dozwolony, każdy fakt sprawdzony ręcznie',
    ],
  },
  {
    nr: 9,
    nazwa: 'Metadane i autor',
    pola: [
      'Title: unikalny, fraza na początku (nasz audyt ostrzega powyżej 60 znaków)',
      'Meta description: streszczenie i powód do kliknięcia (120–160 znaków)',
      'Adres URL: krótki, ze słowami frazy, bez dat',
      'Teksty alternatywne obrazów: opis obrazu, bez upychania fraz',
      'Autor (podpis i krótkie bio) i ekspert recenzujący (tematy YMYL: zdrowie, finanse, prawo)',
      'Data publikacji i data następnego przeglądu',
    ],
  },
  {
    nr: 10,
    nazwa: 'Odbiór tekstu: checklista',
    opis: 'Przy każdym punkcie: OK albo do poprawy. Uwagi zapisuj przy numerze punktu.',
    lista: [
      'Tekst odpowiada na intencję i pokrywa tematy obowiązkowe z części 4',
      'Pierwszy akapit odpowiada wprost na główne pytanie',
      'W tekście jest to, co obiecaliśmy w części 5 (dane, przykład, zdjęcia, ekspert)',
      'Jeden H1, a nagłówki H2 i H3 są zgodne z konspektem albo zmiany są uzgodnione',
      'Fraza główna jest w title, H1 i pierwszym akapicie, a dalej występuje naturalnie, bez powtarzania na siłę',
      'Fakty, liczby i ceny są sprawdzone u źródła, a źródła podane',
      'Tekst nie wchodzi na frazy przypisane do innych adresów (część 3)',
      'Linki wewnętrzne z opisowym tekstem są dodane w obie strony',
      'Title i meta description są gotowe i unikalne',
      'Obrazy mają tekst alternatywny, opisowe nazwy plików i są skompresowane',
      'Autor jest podpisany, a w tematach YMYL recenzja eksperta jest opisana na stronie',
      'Tekst przeszedł korektę i nie ma w nim wypełniaczy ani komentarzy roboczych',
      'Po publikacji: adres jest w mapie witryny i sprawdzony w Search Console; kliknięcia i zapytania sprawdzasz po 30 i 90 dniach',
    ],
  },
];

const EN_CZESCI = [
  {
    nr: 1,
    nazwa: 'Assignment',
    opis: 'The basics: what is being written, where it will go live and when.',
    pola: [
      'Working title',
      'Content type: ☐ how-to article ☐ service page ☐ category or product page ☐ comparison ☐ update to an existing piece',
      'Target URL (new or existing)',
      'Client and point of contact (email, phone)',
      'Writer',
      'Deadlines for the outline, the draft and publication',
      'Approximate length (a range based on the top 5, not a target to hit)',
      'Rounds of revisions included',
    ],
  },
  {
    nr: 2,
    nazwa: 'Goal and audience',
    opis: 'Why the piece exists and who it speaks to.',
    pola: [
      'Business goal: what the reader should do next (inquiry, call, sign-up, visit the service page)',
      'Main call to action (CTA) and the page it leads to',
      'Audience: who they are, what they already know, what problem they want to solve',
      'Stage: ☐ looking for information ☐ comparing options ☐ ready to buy',
      'Customer questions and objections (from calls, emails and sales conversations)',
    ],
  },
  {
    nr: 3,
    nazwa: 'Primary keyword and search intent',
    opis: 'One group of keywords with the same intent means one URL.',
    pola: [
      'Primary keyword, monthly search volume, source and date',
      'Secondary keywords and variants (same intent only)',
      'Intent: ☐ informational ☐ commercial ☐ transactional ☐ navigational',
      'Format that wins in the results: ☐ guide ☐ list ☐ comparison ☐ service page ☐ template or tool',
      'Out of scope (topics and keywords assigned to other URLs)',
    ],
  },
  {
    nr: 4,
    nazwa: 'SERP analysis: top 5 and AI Overview',
    opis: 'Search the keyword in a private window and open the top five organic results.',
    tabela: { kolumny: ['Pos.', 'URL', 'Type and format', 'What it covers', 'What it misses'], wiersze: ['1', '2', '3', '4', '5'] },
    pola: [
      'Must-cover topics (what every page in the top 5 covers)',
      'AI Overview: ☐ shown ☐ not shown; which question it answers and which pages it cites',
      'People also ask and search box suggestions',
    ],
  },
  {
    nr: 5,
    nazwa: 'What we add (information gain) and materials',
    opis: 'At least one thing the top 10 results don’t have.',
    pola: [
      'What we bring: ☐ our own data ☐ a real example ☐ prices or price ranges ☐ photos of our work ☐ an expert’s view ☐ a table, checklist or calculator',
      'What exactly, and where it comes from',
      'Materials from the business: what, who provides them, by when',
      'Expert to interview or review (name, role)',
    ],
  },
  {
    nr: 6,
    nazwa: 'Outline',
    opis: 'Approve the outline before writing starts: it’s the cheapest moment to make changes.',
    pola: [
      'H1 (suggested, with the primary keyword)',
      'Opening paragraph: which question it answers directly (40–60 words)',
    ],
    tabela: { kolumny: ['H2 or H3 heading', 'Question it answers', 'Must include (facts, examples)'], wiersze: ['H2', 'H3', 'H2'] },
    polaPo: ['Questions for the FAQ section (3–6)'],
  },
  {
    nr: 7,
    nazwa: 'Links and sources',
    opis: 'Link to the parent page and to 2–4 related pages. The link text describes the target page.',
    tabela: { kolumny: ['Link to (URL)', 'Link text (anchor)', 'Where in the piece'], wiersze: ['', '', ''] },
    pola: [
      'Pages that should link to the new piece after publication',
      'Sources for facts and figures (URL and date checked)',
    ],
  },
  {
    nr: 8,
    nazwa: 'Tone, style and rules',
    pola: [
      'Voice: ☐ second person (you) ☐ formal ☐ impersonal',
      'Reader’s level: ☐ beginner ☐ intermediate ☐ expert',
      'Required words and names (services, brand)',
      'Banned words and phrases',
      'A piece whose style we like (URL)',
      'AI: ☐ not used ☐ research and outline only ☐ draft allowed, every fact checked by hand',
    ],
  },
  {
    nr: 9,
    nazwa: 'Metadata and author',
    pola: [
      'Title: unique, primary keyword first (our audit flags titles over 60 characters)',
      'Meta description: a summary and a reason to click (120–160 characters)',
      'URL: short, with the keyword’s words, no dates',
      'Image alt text: describe the image, no keyword stuffing',
      'Author (byline and short bio) and expert reviewer (YMYL topics: health, finance, legal)',
      'Publication date and next review date',
    ],
  },
  {
    nr: 10,
    nazwa: 'Draft review checklist',
    opis: 'Mark each check OK or needs work. Write comments next to the check number.',
    lista: [
      'The piece matches the search intent and covers the must-cover topics from part 4',
      'The opening paragraph answers the main question directly',
      'It includes what part 5 promised (data, example, photos, expert)',
      'One H1, and the H2 and H3 headings follow the outline or the changes were agreed',
      'The primary keyword is in the title, the H1 and the opening paragraph, and reads naturally elsewhere, with no forced repetition',
      'Facts, figures and prices are checked at the source, and the sources are cited',
      'The piece doesn’t target keywords assigned to other URLs (part 3)',
      'Internal links with descriptive anchor text are added in both directions',
      'The title and meta description are ready and unique',
      'Images have alt text and descriptive file names, and are compressed',
      'The author is credited, and on YMYL topics the expert review is stated on the page',
      'The piece is proofread, with no placeholders or editing notes left in',
      'After publication: the URL is in the sitemap and checked in Search Console; clicks and queries are reviewed after 30 and 90 days',
    ],
  },
];

/** Części szablonu dla podglądu (i jako ściąga dla PDF w scripts/szablony/pdf). */
export const CZESCI = { pl: PL_CZESCI, en: EN_CZESCI };

function podgladHtml(czesci, en) {
  // Pole z opcjami: „Etykieta: ☐ a ☐ b”. Pole z podpowiedzią: „Etykieta: podpowiedź” → miejsce na wpis (…).
  const pole = (p) => {
    const m = p.match(/^([^:]+):\s*(.*)$/);
    if (!m) return `<li><strong>${p}:</strong> …</li>`;
    return p.includes('☐') ? `<li><strong>${m[1]}:</strong> ${m[2]}</li>` : `<li><strong>${m[1]}:</strong> ${m[2]} …</li>`;
  };
  const tabela = (t) =>
    `<table><thead><tr>${t.kolumny.map((k) => `<th>${k}</th>`).join('')}</tr></thead><tbody>${t.wiersze
      .map((w) => `<tr><td>${w || '…'}</td>${t.kolumny.slice(1).map(() => '<td>…</td>').join('')}</tr>`)
      .join('')}</tbody></table>`;
  const czesc = en ? 'Part' : 'Część';
  return czesci
    .map((c) => {
      let h = `<h3>${czesc} ${c.nr}. ${c.nazwa}</h3>`;
      if (c.opis) h += `<p><em>${c.opis}</em></p>`;
      if (c.nr === 4 || c.nr === 7) {
        if (c.tabela) h += tabela(c.tabela);
        if (c.pola) h += `<ul>${c.pola.map(pole).join('')}</ul>`;
      } else {
        if (c.pola) h += `<ul>${c.pola.map(pole).join('')}</ul>`;
        if (c.tabela) h += tabela(c.tabela);
        if (c.polaPo) h += `<ul>${c.polaPo.map(pole).join('')}</ul>`;
      }
      if (c.lista) h += `<ul>${c.lista.map((p, i) => `<li>☐ <strong>${i + 1}.</strong> ${p}.</li>`).join('')}</ul>`;
      return h;
    })
    .join('');
}

const ZRODLA = [
  ['https://developers.google.com/search/docs/fundamentals/creating-helpful-content', 'Google Search Central: tworzenie przydatnych, wiarygodnych treści przeznaczonych dla ludzi (autor, oryginalne informacje, brak preferowanej liczby słów)', 'Google Search Central: Creating helpful, reliable, people-first content (bylines, original information, no preferred word count)'],
  ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'Google Search Central: przewodnik dla początkujących SEO (długość treści, nagłówki, tekst linków, title i description)', 'Google Search Central: SEO Starter Guide (content length, headings, link text, titles and descriptions)'],
  ['https://developers.google.com/search/docs/essentials/spam-policies', 'Google Search Central: zasady dotyczące spamu (upychanie słów kluczowych, treści generowane na dużą skalę)', 'Google Search Central: Spam policies (keyword stuffing, scaled content abuse)'],
  ['https://developers.google.com/search/docs/fundamentals/using-gen-ai-content', 'Google Search Central: korzystanie z treści generowanych przez AI (sprawdzanie faktów i metadanych)', 'Google Search Central: Using generative AI content (fact-checking content and metadata)'],
  ['https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', 'Google Search Central: optymalizacja pod generatywne funkcje AI (bez pisania „pod AI” i dzielenia treści na kawałki)', 'Google Search Central: Optimizing for generative AI features (no special writing or chunking for AI)'],
  ['https://developers.google.com/search/docs/appearance/title-link', 'Google Search Central: linki tytułowe (brak limitu długości, skracanie do szerokości ekranu)', 'Google Search Central: Title links (no length limit, truncated to fit the device)'],
  ['https://developers.google.com/search/docs/appearance/snippet', 'Google Search Central: fragmenty i meta description', 'Google Search Central: Control your snippets in search results'],
  ['https://developers.google.com/search/docs/crawling-indexing/links-crawlable', 'Google Search Central: linki (tekst linku, linki wewnętrzne)', 'Google Search Central: Link best practices (anchor text, internal links)'],
  ['https://developers.google.com/search/docs/appearance/google-images', 'Google Search Central: obrazy (tekst alternatywny, nazwy plików)', 'Google Search Central: Google Images SEO best practices (alt text, file names)'],
  ['https://support.google.com/webmasters/answer/7576553', 'Pomoc Search Console: raport Skuteczność (kliknięcia, wyświetlenia, CTR, średnia pozycja)', 'Search Console Help: Performance report (clicks, impressions, CTR, average position)'],
];

export default {
  slug: 'brief-dla-copywritera',
  sciezkaEn: '/tools/content-brief-template',
  plik: 'brief-copywritera',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'brief dla copywritera', en: 'content brief template' },
  frazyDodatkowe: {
    // „brief seo” (PL) i „seo brief template” (EN) przeniesione z brief-strony-internetowej (INTEGRACJA.md).
    pl: ['tekst seo', 'artykuł seo', 'jak pisać teksty seo', 'content brief', 'brief seo'],
    en: ['content brief', 'seo content brief', 'seo content brief template', 'seo content brief example', 'content brief examples', 'seo brief template'],
  },
  seo: {
    pl: {
      tytul: 'Brief dla copywritera: szablon briefu SEO do pobrania (PDF)',
      opis: 'Brief dla copywritera w 10 częściach: cel, fraza i intencja, analiza TOP 5, konspekt, linki, ton i checklista odbioru tekstu. Przykład i darmowy PDF.',
    },
    en: {
      tytul: 'Content brief template: free SEO content brief (PDF)',
      opis: 'Free content brief template for SEO writers: goal, keyword and intent, top-5 analysis, outline, links, tone and a review checklist, with a real example.',
    },
  },

  // ------------------------------------------------------------------------------------------
  pl: {
    okruszek: 'Brief dla copywritera',
    tag: 'Szablon do pobrania',
    h1: 'Brief dla copywritera: wzór briefu tekstu SEO w 10 częściach',
    lead: 'Brief dla copywritera to dokument, który przed pisaniem mówi autorowi, dla kogo jest tekst, na jaką frazę i intencję odpowiada, co musi zawierać i jak zostanie odebrany. Nasz szablon ma 10 części: od celu i analizy TOP 5 w Google po konspekt, linki i checklistę odbioru. Podgląd jest niżej, a PDF wyślemy e-mailem.',
    karta: {
      nazwa: 'Brief dla copywritera (PDF)',
      opis: '10 części briefu tekstu SEO: cel, fraza i intencja, analiza TOP 5, konspekt, linki, ton i checklista odbioru tekstu.',
      cta: 'Pobierz brief',
    },
    sekcje: [
      {
        id: 'czym-jest',
        h2: 'Czym jest brief dla copywritera i kiedy go przygotować',
        html: [
          '<p>Brief dla copywritera (nazywany też briefem treści albo content briefem) to zlecenie na jeden konkretny tekst. Zbiera w jednym miejscu decyzje, które muszą zapaść przed pisaniem: po co powstaje tekst, kto go przeczyta, na jaką frazę odpowiada, pod jakim adresem się ukaże, co musi zawierać i po czym poznasz, że jest gotowy. Copywriter nie musi zgadywać, a Ty nie poprawiasz tekstu trzy razy, bo za pierwszym razem „nie o to chodziło”.</p>',
          '<p>Brief przygotowuje zleceniodawca albo specjalista SEO, a nie copywriter. To osoba, która zna firmę, klientów i dane z Search Console, decyduje o frazie i adresie. Copywriter wnosi warsztat: język, strukturę, przykłady. Dobry brief zostawia mu na to miejsce i nie dyktuje każdego zdania.</p>',
          '<p>Ten szablon dotyczy jednego tekstu: artykułu, strony usługi, opisu kategorii albo aktualizacji starego wpisu. Jeśli planujesz całą nową stronę, potrzebujesz innego dokumentu: <a href="/narzedzia/brief-strony-internetowej">brief strony internetowej</a> opisuje cały serwis, mapę strony i przekierowania. A jeśli nie wiesz jeszcze, jakie teksty pisać i w jakiej kolejności, zacznij od <a href="/narzedzia/content-plan">content planu</a>: każda pozycja w planie dostaje potem własny brief.</p>',
          '<p>Brief warto przygotować zawsze, gdy tekst ma przyciągać ruch z Google. Szczególnie wtedy, gdy:</p>',
          '<ul>',
          '<li><strong>zlecasz tekst na zewnątrz</strong>, freelancerowi albo agencji, i nie rozmawiacie codziennie;</li>',
          '<li><strong>piszesz stronę usługi</strong>, która ma przynosić zapytania, a nie tylko wizyty;</li>',
          '<li><strong>aktualizujesz stary tekst</strong>, który spadł w wynikach, i trzeba ustalić, czego mu brakuje;</li>',
          '<li><strong>teksty pisze kilka osób</strong> i chcesz, żeby trzymały ten sam poziom.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'co-zawiera',
        h2: 'Co zawiera brief SEO dla copywritera: 10 części szablonu',
        html: '<p>Szablon prowadzi od decyzji ogólnych do szczegółów. Pięć pierwszych części mówi, co i dlaczego piszemy. Kolejne cztery mówią, jak to napisać. Ostatnia służy do odbioru gotowego tekstu.</p>',
        tabela: {
          id: 'tabela-czesci',
          caption: 'Brief dla copywritera: 10 części szablonu i po co są autorowi',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'co', label: 'Co wpisujesz' },
            { key: 'poCo', label: 'Co daje copywriterowi' },
          ],
          rows: [
            { czesc: '1. Zlecenie', co: 'Rodzaj tekstu, adres URL, terminy, orientacyjną objętość, osobę do pytań', poCo: 'Wie, co oddaje, gdzie tekst się ukaże i do kogo pisać z pytaniami' },
            { czesc: '2. Cel i odbiorca', co: 'Co czytelnik ma zrobić po lekturze, kim jest, co już wie, pytania i obiekcje klientów', poCo: 'Pisze do konkretnej osoby i prowadzi ją do jednego działania' },
            { czesc: '3. Fraza i intencja', co: 'Frazę główną z liczbą wyszukiwań i źródłem, frazy dodatkowe, intencję, format i to, czego tekst nie obejmuje', poCo: 'Trafia w to, czego szuka człowiek, i nie wchodzi na tematy innych stron' },
            { czesc: '4. Analiza TOP 5 i przegląd AI', co: 'Co pokrywają strony z pierwszej piątki, czego im brakuje, co cytuje przegląd AI, podobne pytania', poCo: 'Wie, które tematy są obowiązkowe i gdzie jest luka' },
            { czesc: '5. Co dodajemy', co: 'Dane własne, przykład z praktyki, ceny, zdjęcia, eksperta i materiały od firmy', poCo: 'Ma czym się wyróżnić, zamiast przepisywać konkurencję' },
            { czesc: '6. Struktura', co: 'H1, akapit z odpowiedzią wprost, konspekt H2 i H3 z pytaniami, pytania do FAQ', poCo: 'Ma szkielet zaakceptowany przed pisaniem' },
            { czesc: '7. Linki i źródła', co: 'Linki wewnętrzne z tekstem linku, strony, które mają linkować do tekstu, źródła faktów', poCo: 'Wie, gdzie i jak linkować oraz skąd brać liczby' },
            { czesc: '8. Ton i zasady', co: 'Formę zwracania się, słowa wymagane i zakazane, poziom wiedzy czytelnika, zasady użycia AI', poCo: 'Pisze językiem marki i wie, czego mu nie wolno' },
            { czesc: '9. Metadane i autor', co: 'Propozycję title, meta description, adresu URL i opisów obrazów; autora, eksperta i daty', poCo: 'Oddaje komplet, a nie sam tekst' },
            { czesc: '10. Odbiór tekstu', co: '13 punktów kontrolnych przed publikacją i po niej', poCo: 'Wie z góry, po czym tekst zostanie oceniony' },
          ],
          przypis: 'W PDF każda część ma pola do wypełnienia, a analiza TOP 5, konspekt i linki są w tabelach.',
        },
        htmlPo: '<p>Części 1–5 wypełniasz przed rozmową z copywriterem. Część 6 możesz przygotować sam albo poprosić copywritera o konspekt i zaakceptować go przed pisaniem. Części 7–9 uzupełniacie razem, a przez część 10 przechodzisz przy odbiorze tekstu.</p>',
      },
      {
        id: 'jak-wypelnic',
        h2: 'Jak wypełnić brief dla copywritera krok po kroku',
        html: [
          '<ol>',
          '<li><strong>Wybierz frazę i adres.</strong> Jedna grupa fraz o tej samej intencji to jeden adres. Zanim zlecisz tekst, sprawdź w Search Console (raport Skuteczność, filtr zapytania, karta Strony), czy na tę frazę nie pojawia się już inna Twoja strona. Jeśli tak, zwykle lepiej ją rozbudować, niż pisać drugą.</li>',
          '<li><strong>Sprawdź wyniki wyszukiwania.</strong> Wpisz frazę w Google i otwórz pierwszą piątkę. Zapisz typ stron (poradnik, lista, strona usługi, sklep), tematy, które pojawiają się wszędzie, i to, czego brakuje. Sprawdź, czy nad wynikami jest przegląd AI i które strony cytuje.</li>',
          '<li><strong>Zapisz cel i odbiorcę.</strong> Jedno zdanie: kto czyta i co ma zrobić po lekturze. Dopisz pytania, które klienci zadają przez telefon i w mailach.</li>',
          '<li><strong>Dopisz, co tekst doda.</strong> Dane, przykład, zdjęcia, cenę albo opinię eksperta. Wskaż, kto dostarczy materiały i do kiedy.</li>',
          '<li><strong>Ułóż konspekt.</strong> H1, akapit z odpowiedzią wprost, nagłówki H2 i H3 z pytaniem, na które odpowiada każda sekcja, oraz pytania do FAQ.</li>',
          '<li><strong>Wskaż linki i źródła.</strong> Do jakich stron tekst ma linkować i jakim tekstem linku, które strony mają linkować do niego oraz skąd brać fakty.</li>',
          '<li><strong>Ustal ton, zasady i terminy.</strong> Forma zwracania się, słowa zakazane, zasady użycia AI, termin szkicu i liczba poprawek.</li>',
          '<li><strong>Odbierz tekst z checklistą.</strong> Przejdź przez część 10 punkt po punkcie. Uwagi zapisuj przy numerze punktu, żeby copywriter wiedział, czego dotyczą.</li>',
          '</ol>',
          '<p>Pierwszy brief zajmuje najwięcej czasu. Przy kolejnych część 8 (ton i zasady) i stałe linki przepisujesz bez zmian, więc pracujesz głównie nad frazą, analizą wyników, materiałami i konspektem.</p>',
        ].join(''),
      },
      {
        id: 'fraza-i-intencja',
        h2: 'Jak pisać teksty SEO pod frazę i intencję',
        html: '<p>Tekst SEO to tekst, który odpowiada na konkretne zapytanie w Google lepiej niż strony, które już są w wynikach. Fraza kluczowa mówi, o czym pisać. Intencja mówi, w jakiej formie: czy człowiek chce się czegoś dowiedzieć, porównać oferty, czy od razu kupić. Najszybciej sprawdzisz ją w wynikach. Jeśli w pierwszej piątce są same poradniki, strona usługi z cennikiem ma tam małe szanse, i odwrotnie.</p>',
        tabela: {
          id: 'tabela-intencje',
          caption: 'Intencja wyszukiwania a format tekstu w briefie',
          columns: [
            { key: 'intencja', label: 'Intencja' },
            { key: 'szuka', label: 'Czego szuka człowiek' },
            { key: 'format', label: 'Format w briefie' },
            { key: 'musi', label: 'Co musi być w tekście' },
          ],
          rows: [
            { intencja: 'Informacyjna', szuka: 'Odpowiedzi, wyjaśnienia, instrukcji („jak”, „co to”, „dlaczego”)', format: 'Poradnik, lista kroków, definicja z przykładem', musi: 'Odpowiedź wprost na początku, kroki, przykłady, link do usługi tam, gdzie pasuje' },
            { intencja: 'Komercyjna', szuka: 'Porównania przed decyzją („najlepszy”, „opinie”, „czy warto”, „cena”)', format: 'Porównanie, zestawienie, poradnik zakupowy', musi: 'Kryteria wyboru, tabela, ceny albo widełki, uczciwe wady i zalety' },
            { intencja: 'Transakcyjna', szuka: 'Wykonawcy albo produktu do kupienia („usługa + miasto”, „zamów”)', format: 'Strona usługi, kategoria, produkt', musi: 'Zakres, cena, proces, obszar działania, opinie, kontakt i wezwanie do działania' },
            { intencja: 'Nawigacyjna', szuka: 'Konkretnej firmy albo strony („nazwa firmy + kontakt”)', format: 'Strona marki, kontakt', musi: 'Dane firmy, kontakt, dojazd; zwykle bez osobnego briefu' },
          ],
          przypis: 'Intencję zawsze potwierdzaj w wynikach Google dla tej frazy, a nie tylko po słowach w zapytaniu.',
        },
        htmlPo: [
          '<p>Cztery zasady wpisujemy do każdego briefu, bo wynikają wprost z dokumentacji Google:</p>',
          '<ul>',
          '<li><strong>Nie ma idealnej długości.</strong> Google pisze, że sama długość treści nie ma znaczenia dla pozycji i nie ma docelowej liczby słów. W briefie wpisujesz więc widełki z analizy TOP 5 i listę tematów do pokrycia, a nie liczbę do „nabicia”. Nasz <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a> ostrzega przy stronach, które mają w HTML mniej niż 250 słów, bo zwykle to za mało, żeby odpowiedzieć na pytanie i opisać ofertę.</li>',
          '<li><strong>Nie ma „gęstości” frazy.</strong> Frazę główną umieść w title, H1 i pierwszym akapicie, a dalej pisz naturalnie, także synonimami. Powtarzanie tych samych słów tak często, że brzmi to nienaturalnie, Google wymienia w zasadach dotyczących spamu jako upychanie słów kluczowych.</li>',
          '<li><strong>Nagłówki porządkują tekst.</strong> Google nie wskazuje idealnej liczby nagłówków, a kolejność H2 i H3 nie ma dla wyszukiwarki znaczenia, choć pomaga czytnikom ekranu. W briefie każdy nagłówek ma odpowiadać na pytanie czytelnika.</li>',
          '<li><strong>Title i opis piszesz dla człowieka.</strong> Title ma być unikalny i opisywać treść strony. Google nie ma limitu znaków, ale skraca tytuł do szerokości ekranu, więc fraza powinna stać na początku. Opis meta to podpowiedź: Google częściej buduje fragment z treści strony. Nasz audyt ostrzega powyżej 60 znaków w title i 160 w meta description.</li>',
          '</ul>',
          '<p>Skąd brać tematy, które ma konkurencja, a których brakuje na Twojej stronie, opisujemy w poradniku o <a href="/blog/analiza-luk-contentowych">analizie luk contentowych</a>.</p>',
        ].join(''),
      },
      {
        id: 'information-gain',
        h2: 'Co tekst ma dodać: information gain w briefie',
        html: [
          '<p>Najsłabsze teksty SEO powstają ze streszczenia pierwszej dziesiątki wyników. Są poprawne, ale nie mają powodu, żeby stanąć wyżej niż strony, z których powstały. Google w poradniku o przydatnych treściach pyta wprost, czy treść podaje oryginalne informacje, badania lub analizy i czy wnosi istotną wartość w porównaniu z innymi stronami w wynikach. W dokumentacji o funkcjach AI w wyszukiwarce radzi skupić się na unikalnych treściach tworzonych przez ekspertów, które wychodzą poza wiedzę powszechną.</p>',
          '<p>Dlatego część 5 szablonu jest obowiązkowa. Wpisz w niej przynajmniej jedną rzecz, której nie ma u konkurencji, i wskaż, skąd copywriter ją weźmie:</p>',
          '<ul>',
          '<li><strong>Dane własne:</strong> liczba realizacji, czas wykonania, najczęstsze pytania klientów z ostatniego kwartału. Tylko prawdziwe i możliwe do sprawdzenia.</li>',
          '<li><strong>Przykład z praktyki:</strong> konkretne zlecenie, problem i rozwiązanie, za zgodą klienta albo bez danych, które pozwalają go rozpoznać.</li>',
          '<li><strong>Ceny lub widełki:</strong> klienci szukają ich w tekstach komercyjnych, a wiele stron ich nie podaje.</li>',
          '<li><strong>Zdjęcia i schematy:</strong> własne, z realizacji, zamiast zdjęć z banku.</li>',
          '<li><strong>Stanowisko eksperta:</strong> kilka zdań od osoby, która robi to na co dzień, podpisanych imieniem i nazwiskiem.</li>',
          '<li><strong>Tabela, lista kontrolna albo kalkulator:</strong> coś, z czego czytelnik skorzysta, a nie tylko przeczyta.</li>',
          '</ul>',
          '<p>Copywriter nie wymyśli tych rzeczy sam i nie powinien. Jeśli materiałów nie ma, lepiej przesunąć termin i porozmawiać z ekspertem z firmy, niż opublikować kolejny tekst, który mówi to samo co wszyscy. Przy tematach YMYL (zdrowie, finanse, prawo) dopisz w części 9 eksperta, który sprawdzi tekst: Google pisze, że w takich tematach jego systemy przykładają jeszcze większą wagę do treści, które pokazują doświadczenie, wiedzę i wiarygodność autora.</p>',
        ].join(''),
      },
      {
        id: 'przyklad',
        h2: 'Przykład: brief, z którego powstała ta strona',
        html: '<p>Zamiast wymyślonej firmy pokazujemy prawdziwy brief: ten, na podstawie którego napisaliśmy tę stronę. Liczby wyszukiwań to średnia miesięczna z 12 miesięcy z Planera słów kluczowych Google Ads (przez DataForSEO, Polska, pobrane 11.11.2026). Wyniki wyszukiwania sprawdziliśmy tego samego dnia.</p>',
        tabela: {
          id: 'tabela-przyklad',
          caption: 'Przykład wypełnienia: brief tej strony (skrót)',
          columns: [
            { key: 'czesc', label: 'Część' },
            { key: 'wpis', label: 'Co wpisaliśmy' },
          ],
          rows: [
            { czesc: '1. Zlecenie', wpis: 'Strona z szablonem do pobrania pod adresem /narzedzia/brief-dla-copywritera, w wersji polskiej i angielskiej, z PDF do wypełnienia' },
            { czesc: '2. Cel i odbiorca', wpis: 'Właściciel firmy albo marketer, który zleca teksty copywriterowi. Cel: pobranie szablonu; przy większej liczbie tekstów rozmowa o pozycjonowaniu' },
            { czesc: '3. Fraza i intencja', wpis: 'Fraza główna „brief dla copywritera” (50 wyszukiwań miesięcznie). Dodatkowe: „tekst seo” (260), „artykuł seo” (260), „jak pisać teksty seo” (210). Intencja informacyjna z potrzebą gotowego wzoru. Poza zakresem: brief całej strony internetowej (osobny adres)' },
            { czesc: '4. Analiza wyników', wpis: 'Na pierwszym miejscu artykuł agencji SEO z 2022 roku, dalej poradniki o współpracy z copywriterem i o briefie strony. Żadnego szablonu do pobrania. Nad wynikami przegląd AI' },
            { czesc: '5. Co dodajemy', wpis: 'Szablon PDF do wypełnienia, prawdziwy przykład, zasady z dokumentacji Google ze źródłami, checklista odbioru tekstu' },
            { czesc: '6. Struktura', wpis: 'H1 z frazą, akapit z odpowiedzią wprost, 8 sekcji H2 od definicji do odbioru tekstu, 6 pytań w FAQ' },
            { czesc: '7. Linki', wpis: 'Do content planu, briefu strony internetowej, darmowego audytu SEO, checklisty SEO, analizy luk contentowych oraz usług pozycjonowania stron i pozycjonowania w AI' },
            { czesc: '8. Ton', wpis: 'Na „Ty”, krótkie zdania, żargon tylko z wyjaśnieniem, każda reguła Google ze źródłem' },
            { czesc: '9. Metadane', wpis: 'Title z frazą na początku, opis meta 120–160 znaków, adres ze słowami frazy' },
            { czesc: '10. Odbiór', wpis: 'Długości i fraza sprawdzone skryptem, fakty sprawdzone u źródła, PDF przejrzany strona po stronie' },
          ],
        },
        htmlPo: '<p>Zwróć uwagę na część 3. Fraza główna ma małą liczbę wyszukiwań, ale ta sama strona odpowiada na pytanie, jak pisać teksty SEO, więc frazy dodatkowe są większe niż główna. Tak bywa przy niszowych tematach. Brief pilnuje wtedy dwóch rzeczy: żeby tekst nie rozjechał się na dwa różne tematy i żeby było zapisane, które frazy obsługuje inna strona.</p>',
      },
      {
        id: 'bledy',
        h2: 'Najczęstsze błędy w briefie i w tekście SEO',
        html: [
          '<ul>',
          '<li><strong>Brief bez intencji.</strong> Sama fraza „pompa ciepła” nie mówi, czy piszesz poradnik, porównanie czy stronę usługi. Copywriter wybierze format na wyczucie, a wyniki Google mogą wymagać innego.</li>',
          '<li><strong>Lista fraz zamiast tematu.</strong> Dwadzieścia fraz do „wplecenia” kończy się tekstem pisanym pod słowa, a nie pod człowieka. Wpisz frazę główną, kilka wariantów o tej samej intencji i pytania klientów.</li>',
          '<li><strong>Dwa teksty na tę samą frazę.</strong> Nowy artykuł konkuruje ze starym i żaden nie wygrywa. Część 3 ma pole „czego tekst nie obejmuje”: wpisz tam frazy przypisane do innych adresów.</li>',
          '<li><strong>Liczba słów jako cel.</strong> „Minimum 3000 słów” prowadzi do lania wody. Google nie ma preferowanej liczby słów, więc wpisz widełki z analizy TOP 5 i zakres tematów.</li>',
          '<li><strong>Brak materiałów od firmy.</strong> Bez danych, przykładów i zdjęć copywriter może tylko przepisać konkurencję.</li>',
          '<li><strong>Brak linków wewnętrznych.</strong> Tekst bez linków z innych stron trudniej znaleźć robotom i czytelnikom. Google zaleca, żeby każda ważna strona miała link z przynajmniej jednej innej strony serwisu.</li>',
          '<li><strong>Odbiór „na oko”.</strong> Bez checklisty uwagi dotyczą gustu, a nie tego, co ustaliliście w briefie. Część 10 zamienia odbiór w sprawdzenie konkretnych punktów.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'ai-i-odbior',
        h2: 'AI w pisaniu tekstów SEO i odbiór tekstu przed publikacją',
        html: [
          '<p>W części 8 szablonu zaznaczasz, czy copywriter może korzystać z AI i do czego. Google nie zakazuje treści tworzonych z pomocą AI. Pisze, że generatywna AI przydaje się do researchu i do porządkowania struktury oryginalnej treści, ale każdy fakt trzeba sprawdzić ręcznie, także w title, meta description i tekstach alternatywnych obrazów. Masowe generowanie stron bez wartości dla czytelnika Google opisuje w zasadach dotyczących spamu jako nadużycie polegające na tworzeniu treści na dużą skalę.</p>',
          '<p>Nie trzeba też pisać „pod AI”. Według dokumentacji Google do przeglądów AI i trybu AI nie trzeba pisać w specjalny sposób ani dzielić tekstu na małe kawałki: obowiązują zwykłe zasady SEO. W naszej pracy przyjmujemy, że to, co pomaga czytelnikowi, czyli akapit z odpowiedzią wprost pod nagłówkiem z pytaniem, dane ze źródłem i przejrzyste porównania, pomaga też narzędziom AI, które szukają w sieci odpowiedzi do zacytowania. Jak pracujemy nad widocznością firm w ChatGPT, Gemini i Perplexity, opisujemy na stronie <a href="/pozycjonowanie-w-ai">pozycjonowanie w AI</a>.</p>',
          '<p>Odbiór tekstu to część 10 szablonu: 13 punktów, które sprawdzasz przed publikacją i po niej. Najważniejsze są trzy: czy tekst odpowiada na intencję i pokrywa tematy obowiązkowe z analizy wyników, czy jest w nim to, co miało go wyróżnić, i czy fakty zgadzają się ze źródłami. Title, nagłówki, linki i obrazy sprawdzisz w kilka minut.</p>',
          '<p>Po publikacji zajrzyj do Search Console. W raporcie Skuteczność, na karcie Strony, zobaczysz kliknięcia, wyświetlenia i średnią pozycję nowego adresu, a na karcie Zapytania frazy, na które się pojawia. Porównaj je z częścią 3 briefu po 30 i 90 dniach.</p>',
          '<p>Techniczne podstawy strony, bez których najlepszy tekst nie ruszy, sprawdzisz w <a href="/narzedzia/checklista-seo">checkliście SEO</a>. Jeśli wolisz oddać plan treści i teksty specjalistom, zobacz, jak wygląda nasze <a href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</a>. Treści są w cenie pakietów: w SEO Standard (od 1 900 zł netto miesięcznie) to 2 treści miesięcznie, a w SEO Premium (2 500 zł netto) 4.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Podgląd szablonu: brief dla copywritera w 10 częściach',
      opis: 'Tak wygląda zawartość szablonu. W PDF każda część ma linie do wpisania odpowiedzi i pola do zaznaczenia, a analiza TOP 5, konspekt, linki i checklista odbioru są w tabelach.',
      html: podgladHtml(PL_CZESCI, false),
    },
    formularz: {
      h2: 'Pobierz szablon PDF',
      opis: 'Wyślemy Ci brief dla copywritera w PDF do wydruku: 10 części z polami do wypełnienia, tabelą analizy TOP 5, konspektem H2 i H3, linkami i checklistą odbioru tekstu.',
      etykieta: 'E-mail, na który wyślemy brief',
      przycisk: 'Wyślij brief (PDF)',
      przedmiot: 'brief dla copywritera',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do briefu dla copywritera w PDF przyjdzie w ciągu minuty.',
    },
    kroki: [
      { name: 'Wybierz frazę i adres', text: 'Jedna grupa fraz o tej samej intencji to jeden adres. Sprawdź w Search Console, czy na tę frazę nie pojawia się już inna Twoja strona.' },
      { name: 'Sprawdź wyniki wyszukiwania', text: 'Otwórz pięć pierwszych wyników, zapisz typ stron, tematy obowiązkowe i luki. Sprawdź, czy jest przegląd AI i które strony cytuje.' },
      { name: 'Zapisz cel i odbiorcę', text: 'Kto czyta i co ma zrobić po lekturze. Dopisz pytania i obiekcje klientów z telefonów i maili.' },
      { name: 'Dopisz, co tekst doda', text: 'Dane własne, przykład, zdjęcia, ceny albo opinia eksperta. Wskaż, kto dostarczy materiały i do kiedy.' },
      { name: 'Ułóż konspekt', text: 'H1, akapit z odpowiedzią wprost, nagłówki H2 i H3 z pytaniem do każdej sekcji oraz pytania do FAQ. Zaakceptuj konspekt przed pisaniem.' },
      { name: 'Wskaż linki i źródła', text: 'Linki wewnętrzne z opisowym tekstem, strony, które mają linkować do tekstu, i źródła faktów z datą.' },
      { name: 'Ustal ton, zasady i terminy', text: 'Forma zwracania się, słowa wymagane i zakazane, zasady użycia AI, termin szkicu i liczba poprawek.' },
      { name: 'Odbierz tekst z checklistą', text: 'Przejdź przez 13 punktów części 10, zapisz uwagi przy numerach, a po publikacji sprawdź kliknięcia i zapytania w Search Console po 30 i 90 dniach.' },
    ],
    faq: [
      {
        question: 'Kto powinien przygotować brief dla copywritera?',
        answer: 'Zleceniodawca albo specjalista SEO, który prowadzi stronę. To on zna cel biznesowy, klientów i dane z Search Console oraz wie, które frazy zajmują już inne podstrony. Copywriter może uzupełnić konspekt i zaproponować nagłówki, ale fraza, adres, cel i materiały od firmy muszą przyjść od zleceniodawcy. Jeśli teksty pisze agencja, poproś o wgląd w brief przed pisaniem.',
      },
      {
        question: 'Ile słów powinien mieć artykuł SEO?',
        answer: 'Tyle, ile trzeba, żeby wyczerpać temat lepiej niż strony z pierwszej piątki wyników. Google pisze wprost, że sama długość treści nie wpływa na pozycje i nie ma preferowanej liczby słów. W briefie wpisz więc widełki z analizy wyników i listę tematów do pokrycia, a nie sztywną liczbę. Uważaj za to na bardzo krótkie strony: nasz darmowy audyt SEO ostrzega, gdy w HTML jest mniej niż 250 słów.',
      },
      {
        question: 'Czym brief dla copywritera różni się od briefu strony internetowej?',
        answer: 'Brief dla copywritera dotyczy jednego tekstu: frazy, intencji, konspektu, linków i odbioru. Brief strony internetowej opisuje cały serwis przed projektem: cele firmy, mapę strony, funkcje, treści, przekierowania i budżet. Przy nowej stronie zaczynasz od briefu strony, a potem każda ważna podstrona albo artykuł dostaje własny brief dla copywritera. Oba szablony znajdziesz wśród naszych darmowych narzędzi.',
      },
      {
        question: 'Czy copywriter może pisać teksty SEO z pomocą AI?',
        answer: 'Może, jeśli ustalicie to w briefie. Google nie zakazuje treści tworzonych z pomocą AI, ale zaleca ręczne sprawdzenie każdego faktu, także w title, meta description i tekstach alternatywnych obrazów. Masowe generowanie stron bez wartości dla czytelnika narusza zasady dotyczące spamu. W szablonie zaznaczasz, do czego wolno użyć AI: do researchu, konspektu albo szkicu, który ktoś potem sprawdza i uzupełnia o doświadczenie firmy.',
      },
      {
        question: 'Ile razy powtórzyć frazę kluczową w tekście?',
        answer: 'Nie ma takiej liczby ani „gęstości słów kluczowych”, którą warto liczyć. Umieść frazę główną w title, nagłówku H1 i pierwszym akapicie, a dalej pisz naturalnie, używając też synonimów i wariantów. Powtarzanie tych samych słów tak często, że brzmi to nienaturalnie, Google wymienia w zasadach dotyczących spamu jako upychanie słów kluczowych. Lepiej odpowiedzieć na więcej pytań klientów, niż kolejny raz powtórzyć frazę.',
      },
      {
        question: 'Jak sprawdzić, czy tekst napisany według briefu działa?',
        answer: 'W Search Console, w raporcie Skuteczność. Na karcie Strony znajdź adres nowego tekstu i sprawdź kliknięcia, wyświetlenia i średnią pozycję, a na karcie Zapytania zobacz, na jakie frazy się pojawia. Porównaj je z częścią 3 briefu po 30 i 90 dniach. Jeśli strona pojawia się na inne frazy niż planowane, popraw nagłówki i pierwszy akapit albo rozbuduj tekst o brakujące tematy.',
      },
    ],
    zrodla: ZRODLA.map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/narzedzia/content-plan', tekst: 'Content plan: szablon PDF', opis: 'kalendarz publikacji na 3 miesiące, z którego biorą się tematy briefów' },
      { href: '/narzedzia/brief-strony-internetowej', tekst: 'Brief strony internetowej', opis: 'gdy planujesz cały serwis, a nie jeden tekst' },
      { href: '/narzedzia/checklista-seo', tekst: 'Checklista SEO', opis: '50 punktów: technika, on-page, SEO lokalne, gotowość na AI i pomiar' },
      { href: '/blog/content-gap-analysis', tekst: 'Analiza luk contentowych', opis: 'jak znaleźć tematy, które ma konkurencja, a Ty nie' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'Pozycjonowanie stron internetowych', opis: 'treści, technika i pomiar w jednej usłudze' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Dobór słów kluczowych: szablon', opis: 'jak wybrać frazę i przypisać ją do jednego adresu' },
    ],
    plikNazwa: 'Brief dla copywritera: szablon briefu tekstu SEO (PDF)',
  },

  // ------------------------------------------------------------------------------------------
  en: {
    okruszek: 'Content brief template',
    tag: 'Free template',
    h1: 'Content brief template: a 10-part SEO brief for writers',
    lead: 'A content brief is a document that tells a writer, before they start, who the piece is for, which keyword and intent it answers, what it must cover and how it will be reviewed. Our content brief template has 10 parts, from the goal and top-5 analysis to the outline, links and review checklist. Preview it below; we’ll email the PDF.',
    karta: {
      nazwa: 'Content brief template (PDF)',
      opis: 'A 10-part SEO content brief: goal, keyword and intent, top-5 analysis, outline, links, tone and a draft review checklist.',
      cta: 'Get the template',
    },
    sekcje: [
      {
        id: 'what-it-is',
        h2: 'What a content brief is and when you need one',
        html: [
          '<p>A content brief is the assignment for one specific piece of content. It puts every decision that has to be made before writing in one place: why the piece exists, who will read it, which keyword it targets, which URL it will live on, what it must include and how you’ll know it’s done. The writer doesn’t have to guess, and you don’t end up rewriting the draft three times because the first one “wasn’t quite it”.</p>',
          '<p>The brief comes from the client or the SEO lead, not from the writer. Whoever knows the business, the customers and the Search Console data decides on the keyword and the URL. The writer brings the craft: language, structure, examples. A good brief leaves room for that and doesn’t dictate every sentence.</p>',
          '<p>This template covers a single piece: an article, a service page, a category description or an update to an older post. If you’re planning a whole new website, you need a different document: a <a href="/en/tools/website-brief-template">website brief</a> describes the whole site, the sitemap and redirects. And if you don’t know yet which pieces to write and in what order, start with a <a href="/en/tools/content-calendar-template">content calendar</a>: every item in it then gets its own brief.</p>',
          '<p>Write a brief for any piece that should bring in search traffic, and especially when:</p>',
          '<ul>',
          '<li><strong>you outsource the writing</strong> to a freelancer or an agency and don’t talk every day;</li>',
          '<li><strong>you’re writing a service page</strong> that should bring in inquiries, not just visits;</li>',
          '<li><strong>you’re updating an older piece</strong> that has dropped in the results and need to pin down what it’s missing;</li>',
          '<li><strong>several people write for you</strong> and you want them to work to the same standard.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'whats-inside',
        h2: 'What to include in a content brief: the 10 parts of this template',
        html: '<p>This SEO brief template moves from the big decisions to the details. The first five parts say what you’re writing and why. The next four say how to write it. The last one is for reviewing the finished draft.</p>',
        tabela: {
          id: 'table-parts',
          caption: 'Content brief template: 10 parts and what each gives the writer',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'what', label: 'What you fill in' },
            { key: 'why', label: 'What it gives the writer' },
          ],
          rows: [
            { part: '1. Assignment', what: 'Content type, URL, deadlines, approximate length, point of contact', why: 'They know what to deliver, where it will go live and who to ask' },
            { part: '2. Goal and audience', what: 'What the reader should do next, who they are, what they already know, customer questions and objections', why: 'They write for a real person and lead them to one action' },
            { part: '3. Keyword and intent', what: 'Primary keyword with volume and source, secondary keywords, intent, format and what’s out of scope', why: 'They match what searchers want and stay off other pages’ topics' },
            { part: '4. Top-5 and AI Overview analysis', what: 'What the top five pages cover, what they miss, what the AI Overview cites, related questions', why: 'They know which topics are must-haves and where the gap is' },
            { part: '5. What we add', what: 'Your own data, a real example, prices, photos, an expert and materials from the business', why: 'They have something to stand out with instead of rewriting competitors' },
            { part: '6. Outline', what: 'H1, a direct-answer opening, H2 and H3 headings with the question each answers, FAQ questions', why: 'They have a structure you approved before writing' },
            { part: '7. Links and sources', what: 'Internal links with anchor text, pages that should link to the piece, sources for facts', why: 'They know where and how to link and where the figures come from' },
            { part: '8. Tone and rules', what: 'Voice, required and banned words, the reader’s level, rules for using AI', why: 'They write in your brand’s voice and know what’s off limits' },
            { part: '9. Metadata and author', what: 'Suggested title, meta description, URL and image alt text; author, expert reviewer and dates', why: 'They deliver a complete package, not just the copy' },
            { part: '10. Draft review', what: '13 checks before and after publication', why: 'They know up front how the draft will be judged' },
          ],
          przypis: 'In the PDF every part has fields to fill in, and the top-5 analysis, outline and links are tables.',
        },
        htmlPo: '<p>Fill in parts 1–5 before you talk to the writer. You can draft part 6 yourself or ask the writer for an outline and approve it before they start. Parts 7–9 you complete together, and part 10 is what you work through when the draft comes in.</p>',
      },
      {
        id: 'how-to-fill',
        h2: 'How to fill in the content brief template, step by step',
        html: [
          '<ol>',
          '<li><strong>Pick the keyword and the URL.</strong> One group of keywords with the same intent means one URL. Before you commission a piece, check Search Console (Performance report, filter by query, Pages tab) to see whether another page of yours already shows up for that keyword. If one does, it’s usually better to expand it than to write a second page.</li>',
          '<li><strong>Check the search results.</strong> Search the keyword on Google and open the top five. Note the type of pages (guide, list, service page, store), the topics they all cover and what’s missing. Check whether an AI Overview appears above the results and which pages it cites.</li>',
          '<li><strong>Write down the goal and the audience.</strong> One sentence: who reads it and what they should do next. Add the questions customers ask on the phone and by email.</li>',
          '<li><strong>Add what the piece will contribute.</strong> Data, an example, photos, a price or an expert’s view. Say who will provide the materials and by when.</li>',
          '<li><strong>Build the outline.</strong> H1, a direct-answer opening, H2 and H3 headings with the question each section answers, and questions for the FAQ.</li>',
          '<li><strong>List the links and sources.</strong> Which pages the piece links to and with what anchor text, which pages should link to it, and where the facts come from.</li>',
          '<li><strong>Set the tone, rules and deadlines.</strong> Voice, banned words, rules for using AI, the draft deadline and the number of revisions.</li>',
          '<li><strong>Review the draft with the checklist.</strong> Work through part 10 check by check. Write comments next to the check number so the writer knows what they refer to.</li>',
          '</ol>',
          '<p>Your first brief takes the longest. For the next ones you copy part 8 (tone and rules) and the standing links as they are, so most of the work goes into the keyword, the SERP analysis, the materials and the outline.</p>',
        ].join(''),
      },
      {
        id: 'keyword-intent',
        h2: 'Keyword, intent and format: what makes an SEO content brief work',
        html: '<p>SEO content answers a specific Google search better than the pages already in the results. The keyword tells the writer what to write about. The intent tells them in what form: does the searcher want to learn something, compare options or buy right now? The fastest way to check is the results page itself. If the top five are all guides, a service page with a price list has little chance there, and vice versa.</p>',
        tabela: {
          id: 'table-intent',
          caption: 'Search intent and content format in the brief',
          columns: [
            { key: 'intent', label: 'Intent' },
            { key: 'wants', label: 'What the searcher wants' },
            { key: 'format', label: 'Format in the brief' },
            { key: 'must', label: 'Must be in the piece' },
          ],
          rows: [
            { intent: 'Informational', wants: 'Answers, explanations, instructions (“how to”, “what is”, “why”)', format: 'Guide, step-by-step list, definition with an example', must: 'A direct answer up front, steps, examples, a link to your service where it fits' },
            { intent: 'Commercial', wants: 'Comparisons before deciding (“best”, “reviews”, “is it worth it”, “cost”)', format: 'Comparison, roundup, buying guide', must: 'Selection criteria, a table, prices or ranges, honest pros and cons' },
            { intent: 'Transactional', wants: 'A provider or a product to buy (“service + city”, “order”)', format: 'Service page, category, product page', must: 'Scope, price, process, service area, reviews, contact details and a call to action' },
            { intent: 'Navigational', wants: 'A specific business or page (“company name + contact”)', format: 'Brand page, contact page', must: 'Business details, contact, directions; usually no separate brief' },
          ],
          przypis: 'Always confirm the intent in Google’s results for that keyword, not just from the words in the query.',
        },
        htmlPo: [
          '<p>We put four rules in every brief because they come straight from Google’s documentation:</p>',
          '<ul>',
          '<li><strong>There’s no ideal length.</strong> Google says the length of the content alone doesn’t matter for ranking and that there’s no target word count. So the brief gives a range based on the top 5 and a list of topics to cover, not a number to pad out. Our <a href="/en/tools/free-seo-audit">free SEO audit</a> flags pages with fewer than 250 words in the HTML, because that’s usually too little to answer the question and describe the offer.</li>',
          '<li><strong>There’s no keyword density.</strong> Put the primary keyword in the title, the H1 and the opening paragraph, then write naturally, synonyms included. Google’s spam policies list repeating the same words so often that it sounds unnatural as keyword stuffing.</li>',
          '<li><strong>Headings organize the piece.</strong> Google doesn’t name an ideal number of headings, and the order of H2s and H3s doesn’t matter to Search, though it helps screen readers. In the brief, every heading should answer a reader’s question.</li>',
          '<li><strong>Titles and descriptions are written for people.</strong> A title should be unique and describe the page. Google sets no character limit but truncates titles to fit the screen, so the keyword should come first. A meta description is a suggestion: Google builds snippets mainly from the page content. Our audit flags titles over 60 characters and descriptions over 160.</li>',
          '</ul>',
          '<p>To find the topics your competitors cover and you don’t, read our guide to <a href="/en/blog/content-gap-analysis">content gap analysis</a>.</p>',
        ].join(''),
      },
      {
        id: 'information-gain',
        h2: 'What the piece adds: information gain in your brief',
        html: [
          '<p>The weakest SEO content is a summary of the current top 10. It’s accurate, but it gives Google no reason to rank it above the pages it was built from. In its guidance on helpful content, Google asks whether the content provides original information, reporting, research or analysis, and whether it adds substantial value compared with other pages in the results. Its documentation on AI features in Search recommends focusing on unique, expert-led content that goes beyond common knowledge.</p>',
          '<p>That’s why part 5 of the template is mandatory. Write down at least one thing the competition doesn’t have, and where the writer will get it:</p>',
          '<ul>',
          '<li><strong>Your own data:</strong> the number of projects, turnaround times, the most common customer questions from last quarter. Only real figures that can be checked.</li>',
          '<li><strong>A real example:</strong> a specific job, the problem and the solution, with the client’s consent or without details that identify them.</li>',
          '<li><strong>Prices or price ranges:</strong> people look for them in commercial content, and many pages leave them out.</li>',
          '<li><strong>Photos and diagrams:</strong> your own, from real work, instead of stock images.</li>',
          '<li><strong>An expert’s view:</strong> a few sentences from someone who does this every day, credited by name.</li>',
          '<li><strong>A table, checklist or calculator:</strong> something the reader can use, not just read.</li>',
          '</ul>',
          '<p>The writer can’t make these up, and shouldn’t. If the materials aren’t there, it’s better to move the deadline and talk to an expert in the business than to publish another piece that says what everyone else says. On YMYL topics (health, finance, legal), add an expert reviewer in part 9: Google says its systems give even more weight to content that shows strong experience, expertise, authoritativeness and trust on those topics.</p>',
        ].join(''),
      },
      {
        id: 'example',
        h2: 'SEO content brief example: the brief behind this page',
        html: '<p>Most content brief examples use a made-up company. We’re showing a real one instead: the brief we wrote this page from. Search volumes are 12-month monthly averages from Google Ads Keyword Planner (via DataForSEO, United States, pulled 11 November 2026). We checked the search results on the same day.</p>',
        tabela: {
          id: 'table-example',
          caption: 'Example: the brief for this page (abridged)',
          columns: [
            { key: 'part', label: 'Part' },
            { key: 'entry', label: 'What we wrote' },
          ],
          rows: [
            { part: '1. Assignment', entry: 'A template page at /tools/content-brief-template, in English and Polish, with a printable PDF to fill in' },
            { part: '2. Goal and audience', entry: 'A business owner or marketer who commissions content from writers. Goal: download the template; for larger content needs, a conversation about SEO services' },
            { part: '3. Keyword and intent', entry: 'Primary keyword “content brief template” (210 searches a month). Secondary: “content brief” (260), “seo content brief” (110), “seo content brief template” (90), “seo content brief example” (70). Intent: informational, looking for a ready-made template. Out of scope: a brief for a whole website (separate URL)' },
            { part: '4. SERP analysis', entry: 'Seven of the eight organic results were templates or template collections. An AI Overview appeared above the results' },
            { part: '5. What we add', entry: 'A printable PDF with fields and tables, a real example, rules from Google’s documentation with sources, and a draft review checklist' },
            { part: '6. Outline', entry: 'H1 with the keyword, a direct-answer opening, 8 H2 sections from definition to draft review, 6 FAQ questions' },
            { part: '7. Links', entry: 'To the content calendar template, the website brief template, the free SEO audit, the SEO checklist, the content gap analysis guide, and our SEO and AI search optimization services' },
            { part: '8. Tone', entry: 'Second person, short sentences, jargon only with an explanation, every Google rule with a source' },
            { part: '9. Metadata', entry: 'Title with the keyword first, a 120–160 character meta description, a URL built from the keyword' },
            { part: '10. Review', entry: 'Lengths and keyword checked with a script, facts checked at the source, PDF reviewed page by page' },
          ],
        },
        htmlPo: '<p>Look at part 3. In English the template is the product: seven of eight results were templates, so a long essay without a usable document would miss the intent. In Polish the same brief led to a page that also answers how to write SEO content, because that’s where the Polish search demand is. Same template, different intent, different emphasis.</p>',
      },
      {
        id: 'mistakes',
        h2: 'Common content brief mistakes',
        html: [
          '<ul>',
          '<li><strong>No intent.</strong> A keyword like “heat pump” on its own doesn’t say whether you need a guide, a comparison or a service page. The writer will pick a format by feel, and Google’s results may call for a different one.</li>',
          '<li><strong>A keyword list instead of a topic.</strong> Twenty keywords to “work in” produce copy written for words, not people. List the primary keyword, a few variants with the same intent and real customer questions.</li>',
          '<li><strong>Two pieces for the same keyword.</strong> The new article competes with the old one and neither wins. Part 3 has an “out of scope” field: list the keywords that belong to other URLs.</li>',
          '<li><strong>Word count as the goal.</strong> “At least 3,000 words” leads to padding. Google has no preferred word count, so give a range from the top-5 analysis and the scope of topics.</li>',
          '<li><strong>No materials from the business.</strong> Without data, examples and photos, all the writer can do is rewrite competitors.</li>',
          '<li><strong>No internal links.</strong> A piece with no links from other pages is harder for crawlers and readers to find. Google recommends that every page you care about has a link from at least one other page on your site.</li>',
          '<li><strong>Reviewing by gut feel.</strong> Without a checklist, feedback is about taste, not about what the brief agreed. Part 10 turns the review into a set of specific checks.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'ai-and-review',
        h2: 'AI-assisted writing and reviewing the draft before you publish',
        html: [
          '<p>Part 8 of the template records whether the writer may use AI and for what. Google doesn’t ban AI-assisted content. It says generative AI can be useful for research and for adding structure to original content, but every fact needs a manual check, including the title, meta description and image alt text. Using AI to generate many pages without adding value for users is listed in Google’s spam policies as scaled content abuse.</p>',
          '<p>You don’t need to write “for AI” either. According to Google’s documentation, AI Overviews and AI Mode don’t require any special way of writing or splitting text into small chunks: normal SEO best practices apply. Our working assumption is that what helps readers, such as a direct answer under a question heading, data with a source and clear comparisons, also helps AI tools that search the web for an answer to cite. To see how we work on visibility in ChatGPT, Gemini and Perplexity, read about our <a href="/en/ai-search-optimization">AI search optimization</a>.</p>',
          '<p>Reviewing the draft is part 10 of the template: 13 checks before and after publication. Three matter most: does the piece match the intent and cover the must-cover topics from the SERP analysis, does it include what was meant to set it apart, and do the facts match the sources? The title, headings, links and images take a few minutes to check.</p>',
          '<p>After publication, open Search Console. In the Performance report, the Pages tab shows the new URL’s clicks, impressions and average position, and the Queries tab shows the searches it appears for. Compare them with part 3 of the brief after 30 and 90 days.</p>',
          '<p>Check the technical basics that even the best content depends on with our <a href="/en/tools/seo-checklist">SEO checklist</a>. If you’d rather hand content planning and writing to specialists, see how our <a href="/en/seo-services">SEO services</a> work. Content is included in the packages: SEO Standard (from €450 net a month) includes 2 pieces a month, and SEO Premium (€590 net) includes 4.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Template preview: a 10-part content brief',
      opis: 'This is what the template contains. In the PDF every part has lines for your answers and boxes to tick, and the top-5 analysis, outline, links and review checklist are tables.',
      html: podgladHtml(EN_CZESCI, true),
    },
    formularz: {
      h2: 'Get the template (PDF)',
      opis: 'We’ll email you the content brief template as a printable PDF: 10 parts with fields to fill in, a top-5 analysis table, an H2 and H3 outline, links and a draft review checklist.',
      etykieta: 'Email address to send the template to',
      przycisk: 'Send me the template (PDF)',
      przedmiot: 'the content brief template',
      komunikatOk: 'Sent. Check your inbox (and the Promotions or Spam folder): the link to the content brief template PDF will arrive within a minute.',
    },
    kroki: [
      { name: 'Pick the keyword and the URL', text: 'One group of keywords with the same intent means one URL. Check Search Console to see whether another page of yours already shows up for that keyword.' },
      { name: 'Check the search results', text: 'Open the top five results and note the page types, must-cover topics and gaps. Check whether an AI Overview appears and which pages it cites.' },
      { name: 'Write down the goal and audience', text: 'Who reads the piece and what they should do next. Add customer questions and objections from calls and emails.' },
      { name: 'Add what the piece contributes', text: 'Your own data, an example, photos, prices or an expert’s view. Say who provides the materials and by when.' },
      { name: 'Build the outline', text: 'H1, a direct-answer opening, H2 and H3 headings with the question each section answers, and FAQ questions. Approve the outline before writing starts.' },
      { name: 'List the links and sources', text: 'Internal links with descriptive anchor text, pages that should link to the piece, and dated sources for the facts.' },
      { name: 'Set the tone, rules and deadlines', text: 'Voice, required and banned words, rules for using AI, the draft deadline and the number of revisions.' },
      { name: 'Review the draft with the checklist', text: 'Work through the 13 checks in part 10, write comments next to the check numbers, and after publication review clicks and queries in Search Console after 30 and 90 days.' },
    ],
    faq: [
      {
        question: 'Who should write the content brief?',
        answer: 'The client or the SEO lead who runs the website. They know the business goal, the customers and the Search Console data, and they know which keywords other pages already target. The writer can fill in the outline and suggest headings, but the keyword, URL, goal and materials from the business have to come from the client. If an agency writes your content, ask to see the brief before writing starts.',
      },
      {
        question: 'How long should an SEO article be?',
        answer: 'As long as it takes to cover the topic better than the top five results. Google says plainly that content length alone doesn’t affect rankings and that it has no preferred word count. So give the writer a range based on the SERP analysis and a list of topics to cover, not a fixed number. Watch out for very short pages, though: our free SEO audit flags pages with fewer than 250 words in the HTML.',
      },
      {
        question: 'What’s the difference between a content brief and a website brief?',
        answer: 'A content brief covers one piece: keyword, intent, outline, links and review. A website brief describes a whole site before it’s designed: business goals, sitemap, features, content, redirects and budget. For a new website you start with the website brief, and then every important page or article gets its own content brief. You’ll find both templates among our free tools.',
      },
      {
        question: 'Can a writer use AI to draft SEO content?',
        answer: 'Yes, if you agree on it in the brief. Google doesn’t ban AI-assisted content, but it says every fact should be checked by hand, including the title, meta description and image alt text. Generating many pages without value for readers breaks its spam policies. In the template you tick what AI may be used for: research, the outline, or a draft that someone then checks and enriches with the business’s own experience.',
      },
      {
        question: 'How many times should the keyword appear?',
        answer: 'There’s no magic number and no keyword density worth measuring. Put the primary keyword in the title, the H1 and the opening paragraph, then write naturally, using synonyms and variants. Google’s spam policies list repeating the same words so often that it sounds unnatural as keyword stuffing. You’re better off answering more of your customers’ questions than repeating the keyword one more time.',
      },
      {
        question: 'How do I know if a piece written from the brief is working?',
        answer: 'Check the Performance report in Search Console. On the Pages tab, find the new URL and look at its clicks, impressions and average position; on the Queries tab, see which searches it shows up for. Compare them with part 3 of the brief after 30 and 90 days. If the page appears for different keywords than planned, rework the headings and the opening paragraph, or add the missing topics.',
      },
    ],
    zrodla: ZRODLA.map(([url, , nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/narzedzia/content-plan', tekst: 'Content calendar template', opis: 'a 3-month publishing calendar that your briefs come from' },
      { href: '/narzedzia/brief-strony-internetowej', tekst: 'Website brief template', opis: 'when you’re planning a whole site, not a single piece' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO checklist', opis: '50 checks: technical basics, on-page, local SEO, AI readiness and measurement' },
      { href: '/blog/content-gap-analysis', tekst: 'Content gap analysis', opis: 'find the topics your competitors cover and you don’t' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'SEO services', opis: 'content, technical SEO and reporting in one service' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Keyword research template', opis: 'pick the keyword and map it to one URL' },
    ],
    plikNazwa: 'Content brief template: 10-part SEO brief (PDF)',
  },
};
