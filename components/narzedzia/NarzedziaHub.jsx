// Hub „Narzędzia i szablony” /narzedzia (PLAN-v2 6.9; brief N1 p. 3; CB-13, CS-03; 5.11.2026).
// Komponent serwerowy (bez hooków). Partia 3 (W9): renderuje go tylko app/[locale]/narzedzia/page.js
// po przejściu bramki publikacji.
// S1-poprawki 12.11.2026 (Z-H3…Z-H8, Z-01, Z-01b):
// - pierwszy ekran: H1 → lead → pole darmowego audytu SEO (AudytSeoClient, Z-H7) → „Krótka odpowiedź”;
//   na telefonie bez znacznika nad H1 (narzedzia.module.css .strona),
// - karty narzędzi z lib/narzedzia.js kartyHuba() w kolejności Z-H5, w dwóch grupach H3 (Z-H6), z wierszami
//   „Od razu” / „Po e-mailu” (co darmowe bez e-maila); karty szablonów z lib/szablony; karta bez linku
//   = nieopublikowana, nie pokazuje się (filtr w kartyHuba),
// - <section id="szablony"> = cel 308 /szablony -> /narzedzia#szablony,
// - schema: CollectionPage z ItemList w mainEntity (Z-H8) + FAQPage (AppleFaq) + BreadcrumbList; bez WebApplication,
// - fraza z autosugestii „narzędzia seo google” (30, PLAN-v2 4.10) 1× w treści,
// - liczby (reguły, limity, ceny) tylko z lib/narzedziaLiczby.js; ceny = kod strony (CENY).
// 9.11.2026: prop locale ('pl' | 'en'); wersja EN (/en/tools) ma teksty w tym pliku (TEKSTY.en) i w lib/narzedzia.en.js.
// 12.11.2026 (hub-obrazy): każda karta narzędzia ma miniaturę wyniku (WebP 720x450, lazy, alt i podpis
// z lib/narzedziaObrazy.js), bo hub miał 0 obrazów wobec mediany 39 u konkurentów (A2).

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import Zrodla from '@/components/Zrodla';
import { CollectionPageSchema } from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefDlaLink, hrefWJezyku } from '@/lib/linkiEn';
import { hrefJesliOpublikowana, wpisPublikacji } from '@/lib/publikacja';
import { STRONY_EN } from '@/lib/stronyEn';
import { AUTORYTET_OPUBLIKOWANY, BASE, SCIEZKA_HUBA, hrefAudytuAi } from '@/lib/narzedzia';
import { H1_HUBA, faqHubaL, kartyHubaL, stronaNarzedziaL, zrodlaKalkulatoraL } from '@/lib/narzedzia.en';
import { AUDYT, AUTORYTET, GENERATOR, WIDOCZNOSC, cena, listaSilnikow } from '@/lib/narzedziaLiczby';
import { PORADNIKI } from '@/lib/narzedzia/poradniki';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import AudytSeoClient from './AudytSeoClient';
import Poradniki from './Poradniki';
import st from './narzedzia.module.css';
import * as s from './styl';

/** Polska odmiana liczebnika: 1 wzór, 2-4 wzory, 5+ wzorów (12-14 też „wzorów”). */
function odmiana(n, [jeden, kilka, wiele]) {
  if (n === 1) return jeden;
  const d = n % 10;
  const dd = n % 100;
  return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? kilka : wiele;
}

const TEKSTY = {
  pl: {
    tag: 'Bezpłatnie, bez rejestracji',
    lead: (wzory) => `Wpisz adres strony, a darmowy audyt SEO sprawdzi ją w ${AUDYT.regul} regułach. Niżej znajdziesz pozostałe darmowe narzędzia SEO i AI oraz ${wzory} ${odmiana(wzory, ['wzór', 'wzory', 'wzorów'])} do pobrania. Bez rejestracji.`,
    poAudycie: 'Co sprawdza audyt, jak liczymy ocenę i czego nie sprawdza, opisujemy na stronie',
    linkAudyt: 'darmowego audytu SEO',
    odpowiedz: 'Zebraliśmy tu bezpłatne narzędzia i szablony AI SEO COMPANY: audyt SEO z oceną 1-100, sprawdzarkę widoczności w AI, kalkulator strat bez SEO, makietę nowej strony z AI i generator llms.txt z testem botów AI. Działają bez rejestracji i pokazują wynik od razu, a pełne raporty i wzory PDF wysyłamy e-mailem.',
    h2Narzedzia: 'Narzędzia online',
    pNarzedzia: 'Narzędzia uzupełniają darmowe narzędzia SEO Google, czyli Search Console i Analytics. Audyt zbiera błędy z podstron w jednym raporcie z oceną, sprawdzarka pokazuje, czy ChatGPT i inne modele wymieniają Twoją firmę, kalkulator liczy, ile zysku tracisz bez TOP 3, a generator sprawdza, czy boty modeli językowych mogą wejść na stronę. Przy każdym narzędziu piszemy, co widzisz od razu, a co dopiero po podaniu e-maila.',
    grupy: { seo: 'Strona i SEO', ai: 'Widoczność w AI' },
    odRazu: 'Od razu, bez e-maila:',
    poEmailu: 'Po podaniu e-maila:',
    bezEmaila: 'E-mail nie jest potrzebny: cały wynik widzisz od razu.',
    h2Kroki: 'Od czego zacząć: 4 kroki',
    pKroki: 'Narzędzia najwięcej mówią użyte po kolei: najpierw stan strony, potem obecność w odpowiedziach AI, na końcu koszt braków.',
    kroki: [
      { href: '/narzedzia/audyt-seo', link: 'Sprawdź stronę darmowym audytem SEO.', tekst: ' Zacznij od błędów technicznych: kody odpowiedzi, przekierowania, robots.txt i mapa strony. Gdy one nie działają, Google i boty AI nie dotrą do reszty treści. Po poprawkach uruchom audyt jeszcze raz i porównaj ocenę.' },
      { href: '/sprawdz-widocznosc-w-ai', link: 'Sprawdź widoczność w AI.', tekst: ' Jeśli modele nie wymieniają Twojej firmy, popatrz na listę cytowanych domen: to strony, na których warto mieć wzmiankę. Firmy z wyniku to Twoja konkurencja w odpowiedziach AI, nawet jeśli nie widzisz jej w Google.' },
      { href: '/narzedzia/kalkulator-strat-seo', link: 'Policz, ile kosztują braki.', tekst: ' Kalkulator przelicza Twoje liczby na zysk, który trafia do konkurencji, osobno dla Google i dla odpowiedzi AI, i pokazuje, w którym miesiącu koszt SEO się zwraca.' },
      { href: '/narzedzia/generator-llms-txt', link: 'Sprawdź dostęp botów AI.', tekst: ' Generator pokaże, czy robots.txt albo serwer nie blokują botów ChatGPT, Perplexity czy Claude, i da gotowy plik llms.txt. To propozycja formatu (llmstxt.org), a nie standard wyszukiwarek, więc traktuj plik jako dodatek do otwartego dostępu, a nie gwarancję widoczności.' },
    ],
    poKrokach: 'Jeśli planujesz nową stronę, makieta w kilka minut pokaże, jak mogłaby wyglądać strona główna zbudowana z Twoich treści.',
    linkMakieta: 'Zobacz makietę nowej strony',
    h2Dane: 'Skąd narzędzia biorą dane i jakie mają ograniczenia',
    krotko: { 'audyt-seo': 'Darmowy audyt SEO', 'sprawdzarka-ai': 'Widoczność w AI', 'kalkulator-strat-seo': 'Kalkulator strat', 'makieta-redesignu': 'Makieta nowej strony', 'generator-llms-txt': 'Generator llms.txt', 'autorytet-domeny': 'Autorytet domeny' },
    pDane: 'Każde narzędzie pokazuje wynik z prawdziwego sprawdzenia, bez wymyślonych liczb. Oto, co dokładnie robi i gdzie kończy się jego zasięg.',
    dane: {
      'audyt-seo': () => `nasz robot AISEOCompanyAudit czyta do ${AUDYT.stron} podstron (także z ${AUDYT.mapPodrzednych} map podrzędnych) i sprawdza ${AUDYT.regul} reguł w ${AUDYT.kategorii} kategoriach: technika (${AUDYT.reguly.techniczne}), treść (${AUDYT.reguly.tresc}), wydajność (${AUDYT.reguly.wydajnosc}) i gotowość na AI (${AUDYT.reguly.ai}). Kategorie ważą w ocenie ${AUDYT.wagi.techniczne}, ${AUDYT.wagi.tresc}, ${AUDYT.wagi.wydajnosc} i ${AUDYT.wagi.ai}%. Szybkość to mediana ${AUDYT.przebiegiPsi} pomiarów Google PageSpeed Insights na telefonie. To próbka strony, a nie pełne indeksowanie.`,
      'sprawdzarka-ai': () => `zadajemy ${WIDOCZNOSC.pytan} pytania (2 z branży i miasta, 1 ułożone z treści Twojej strony) na żywo: ${listaSilnikow('pl')}${WIDOCZNOSC.geminiZWyszukiwaniem ? ' (Gemini z wyszukiwaniem Google)' : ''}. Odpowiedzi modeli zmieniają się z dnia na dzień, więc wynik to migawka z chwili sprawdzenia.`,
      'kalkulator-strat-seo': () => 'liczy w Twojej przeglądarce z Twoich liczb i z badań CTR w Google oraz kliknięć z odpowiedzi AI. Każde badanie ma pod kalkulatorem źródło i datę odczytu, a wynik podajemy w widełkach, bo badania się różnią.',
      'makieta-redesignu': () => 'model Claude buduje stronę główną z treści, które znajdzie na Twojej stronie, i nie dopisuje opinii, liczb ani nagród, których tam nie ma. Zdjęcia, teksty i SEO dopracowuje się przy wdrożeniu.',
      'generator-llms-txt': () => `pobiera mapę strony (do ${GENERATOR.mapPodrzednych} map podrzędnych), wybiera do ${GENERATOR.adresow} adresów, po kilka z każdej sekcji, i sprawdza robots.txt i kod odpowiedzi serwera dla ${GENERATOR.botow} botów AI. Nie zapisuje adresu ani wyniku.`,
      'autorytet-domeny': () => `liczy nasz wynik 0-100 z publicznego grafu linków Common Crawl (${AUTORYTET.okres.pl}): pozycję domeny w sieci linków, miejsce wśród domen .pl i różnicę do konkurentów. To nie jest DR Ahrefs ani DA Moz, a dane zmieniają się z kolejnym wydaniem grafu, nie z dnia na dzień.`,
    },
    h2Szablony: 'Szablony i checklisty do pobrania',
    pSzablony: 'Wzory w PDF pomagają zaplanować SEO i sprawdzić pracę agencji: od checklisty SEO, planu treści i strategii po raport miesięczny i listę rzeczy do odebrania przed zmianą agencji. Każdy wzór ma stronę z opisem, co zawiera i jak z niego korzystać. Podajesz tylko adres e-mail, a link do pliku przychodzi w ciągu minuty.',
    h2Dalej: 'Gdy wynik pokaże problem',
    dalejA: 'Błędy w audycie, zablokowany bot albo brak firmy w odpowiedziach modeli to sygnał, od którego zaczyna się praca, a nie jej koniec. Błędy strony naprawiamy w',
    linkAudytPlatny: 'audycie SEO',
    dalejB: ', a w usłudze pozycjonowania w AI co tydzień mierzymy obecność firmy w ChatGPT, Perplexity, Gemini i przeglądzie AI Google i pracujemy nad źródłami, z których korzystają modele. Szczegóły i ceny opisujemy na stronie',
    linkGeo: 'pozycjonowanie w AI',
    ceny: (h) => (
      <>
        Ceny netto z naszego cennika: <Link href={h.audyt} style={s.podkreslenie}>audyt SEO</Link> od {cena('audytSeo')},{' '}
        <Link href={h.audytAi} style={s.podkreslenie}>audyt widoczności w AI</Link> {cena('audytAi')}, a{' '}
        <Link href={h.cennik} style={s.podkreslenie}>pakiety pozycjonowania</Link> od {cena('seoStandard')} miesięcznie.
      </>
    ),
    poradnikiTytul: 'Poradniki: jak poprawić wynik',
    okruszek: 'Narzędzia',
    faqTytul: 'Pytania o darmowe narzędzia',
  },
  en: {
    tag: 'Free, no sign-up',
    lead: (wzory) => `Enter your website address and the free SEO audit checks it against ${AUDYT.regul} rules. Below you will find the other free SEO tools and AI tools and ${wzory} templates to download. No sign-up.`,
    poAudycie: 'What the audit checks, how we calculate the score and what it does not check are described on the page of the',
    linkAudyt: 'free SEO audit',
    odpowiedz: 'Here you will find the free tools and templates from AI SEO COMPANY: an SEO audit with a 1-100 score, an AI visibility checker, an SEO loss calculator, an AI website redesign mockup and an llms.txt generator with an AI bot access test. They work without registration and show results right away, and we email the full reports and PDF templates.',
    h2Narzedzia: 'Online tools',
    pNarzedzia: 'The tools complement free Google SEO tools, namely Search Console and Analytics. The audit collects the errors on your pages in one scored report, the checker shows whether ChatGPT and other models name your business, the calculator estimates the profit you lose without a top 3 position, and the generator tests whether language model bots can reach your website. For each tool we say what you see right away and what only after you enter your email.',
    grupy: { seo: 'Website and SEO', ai: 'AI visibility' },
    odRazu: 'Right away, no email:',
    poEmailu: 'After you enter your email:',
    bezEmaila: 'No email needed: you see the whole result right away.',
    h2Kroki: 'Where to start: 4 steps',
    pKroki: 'The tools tell you the most when you use them in order: first the state of your website, then your presence in AI answers, and finally the cost of the gaps.',
    kroki: [
      { href: '/narzedzia/audyt-seo', link: 'Check your website with the free SEO audit.', tekst: ' Start with the technical errors: response codes, redirects, robots.txt and the sitemap. When they do not work, Google and AI bots cannot reach the rest of your content. Once you have fixed them, run the audit again and compare the score.' },
      { href: '/sprawdz-widocznosc-w-ai', link: 'Check your AI visibility.', tekst: ' If the models do not name your business, look at the list of cited domains: these are the sites where a mention is worth having. The businesses in the result are your competitors in AI answers, even if you do not see them in Google.' },
      { href: '/narzedzia/kalkulator-strat-seo', link: 'Estimate what the gaps cost.', tekst: ' The calculator turns your numbers into the profit that goes to competitors, separately for Google and for AI answers, and shows the month in which the SEO cost pays for itself.' },
      { href: '/narzedzia/generator-llms-txt', link: 'Check AI bot access.', tekst: ' The generator shows whether robots.txt or your server blocks the ChatGPT, Perplexity or Claude bots, and gives you a ready llms.txt file. It is a proposed format (llmstxt.org), not a search engine standard, so treat the file as an addition to open access, not a guarantee of visibility.' },
    ],
    poKrokach: 'If you are planning a new website, the mockup shows in a few minutes what a homepage built from your content could look like.',
    linkMakieta: 'See a mockup of your new website',
    h2Dane: 'Where the tools get their data and what their limits are',
    krotko: { 'audyt-seo': 'Free SEO audit', 'sprawdzarka-ai': 'AI visibility check', 'kalkulator-strat-seo': 'SEO loss calculator', 'makieta-redesignu': 'Website redesign mockup', 'generator-llms-txt': 'llms.txt generator', 'autorytet-domeny': 'Domain authority' },
    pDane: 'Each tool shows the result of a real check, with no made-up numbers. Here is exactly what it does and where its reach ends.',
    dane: {
      'audyt-seo': () => `our AISEOCompanyAudit crawler reads up to ${AUDYT.stron} pages (including from ${AUDYT.mapPodrzednych} child sitemaps) and checks ${AUDYT.regul} rules in ${AUDYT.kategorii} categories: technical (${AUDYT.reguly.techniczne}), content (${AUDYT.reguly.tresc}), performance (${AUDYT.reguly.wydajnosc}) and AI readiness (${AUDYT.reguly.ai}). The categories weigh ${AUDYT.wagi.techniczne}, ${AUDYT.wagi.tresc}, ${AUDYT.wagi.wydajnosc} and ${AUDYT.wagi.ai}% in the score. Speed is the median of ${AUDYT.przebiegiPsi} mobile Google PageSpeed Insights runs. It is a sample of your website, not a full crawl.`,
      'sprawdzarka-ai': () => `we ask ${WIDOCZNOSC.pytan} questions (2 about your industry and city, 1 built from your website’s content) live: ${listaSilnikow('en')}${WIDOCZNOSC.geminiZWyszukiwaniem ? ' (Gemini with Google Search)' : ''}. Model answers change from day to day, so the result is a snapshot from the moment of the check.`,
      'kalkulator-strat-seo': () => 'it works in your browser with your numbers and with studies of Google CTR and clicks from AI answers. Every study is listed under the calculator with its source and the date we read it, and the result is a range because the studies differ.',
      'makieta-redesignu': () => 'the Claude model builds the homepage from the content it finds on your website and does not add reviews, numbers or awards that are not there. Photos, copy and SEO are finished during the build.',
      'generator-llms-txt': () => `it fetches your sitemap (up to ${GENERATOR.mapPodrzednych} child sitemaps), picks up to ${GENERATOR.adresow} URLs, a few from every section, and checks robots.txt and the server response code for ${GENERATOR.botow} AI bots. It stores neither the address nor the result.`,
      'autorytet-domeny': () => `it calculates our 0-100 score from the public Common Crawl link graph (${AUTORYTET.okres.en}): the domain’s position in the web of links, its rank among .pl domains and the gap to competitors. It is not Ahrefs DR or Moz DA, and the data changes with each graph release, not from day to day.`,
    },
    h2Szablony: 'Templates and checklists to download',
    pSzablony: 'PDF templates help you plan SEO and assess your agency’s work: from an SEO checklist, a content calendar and a strategy to a monthly report and the list of things to collect before you switch agencies. Each template has a page that explains what it contains and how to use it. You only give an email address, and the link to the file arrives within a minute.',
    h2Dalej: 'When the result shows a problem',
    dalejA: 'Errors in the audit, a blocked bot or your business missing from model answers is where the work starts, not where it ends. We fix website errors in an',
    linkAudytPlatny: 'SEO audit',
    dalejB: ', and in our AI search optimization service we measure every week how often your business appears in ChatGPT, Perplexity, Gemini and Google AI Overviews, and we work on the sources the models draw on. Details and prices are on the page',
    linkGeo: 'AI search optimization',
    ceny: (h) => (
      <>
        Net prices from our price list: an <Link href={h.audyt} style={s.podkreslenie}>SEO audit</Link> from {cena('audytSeo', 'en')},{' '}
        an <Link href={h.audytAi} style={s.podkreslenie}>AI visibility audit</Link> {cena('audytAi', 'en')} and{' '}
        <Link href={h.cennik} style={s.podkreslenie}>SEO packages</Link> from {cena('seoStandard', 'en')} a month.
      </>
    ),
    poradnikiTytul: 'Guides: how to improve your result',
    okruszek: 'Tools',
    faqTytul: 'Questions about the free tools',
  },
};

const malyTekst = { fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--color-text-main)', margin: '0.5rem 0 0' };
const miniatura = { display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 10', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' };
const podpisMiniatury = { fontSize: '0.8rem', lineHeight: 1.4, color: 'var(--w-tusz-2)', margin: '0.4rem 0 0' };

function Karta({ karta, t, locale }) {
  const narzedzie = karta.sekcja === 'narzedzia';
  // Karty narzędzi stoją pod H3 grupy (Z-H6), więc ich nazwa to H4; karty szablonów stoją pod H2.
  const Naglowek = narzedzie ? 'h4' : 'h3';
  // hub-obrazy (12.11.2026): miniatura wyniku nad nazwą narzędzia (lib/narzedziaObrazy.js), pod pierwszym ekranem → lazy.
  const obraz = narzedzie ? obrazKarty(karta.id, locale) : null;
  return (
    <article style={{ ...s.karta, padding: 'clamp(1.25rem, 3vw, 1.75rem)', display: 'flex', flexDirection: 'column' }}>
      {obraz ? (
        <figure style={{ margin: '0 0 1rem' }}>
          <Image src={obraz.src} alt={obraz.alt} width={obraz.width} height={obraz.height} sizes="(max-width: 700px) calc(100vw - 72px), (max-width: 1100px) 50vw, 360px" loading="lazy" style={miniatura} />
          <figcaption style={podpisMiniatury}>{obraz.podpis}</figcaption>
        </figure>
      ) : null}
      {/* Strzałka poza nagłówkiem, żeby nie trafiała do jego tekstu; karta bez linku = bez strzałki (reguła 6.0). */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', margin: '0 0 0.6rem' }}>
        <Naglowek style={{ ...s.h3, margin: 0 }}>
          {karta.href ? (
            <Link href={hrefDlaLink(karta.href, locale)} data-cta={`narzedzia_${karta.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{karta.nazwa}</Link>
          ) : karta.nazwa}
        </Naglowek>
        {karta.href && <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.2rem' }}>→</span>}
      </div>
      <p style={{ ...s.akapit, margin: 0, fontSize: '1rem' }}>{karta.opis}</p>
      {narzedzie && karta.odRazu ? (
        <>
          <p style={{ ...malyTekst, marginTop: '0.85rem' }}><strong>{t.odRazu}</strong> {karta.odRazu}.</p>
          <p style={malyTekst}>{karta.poEmailu ? <><strong>{t.poEmailu}</strong> {karta.poEmailu}.</> : <strong>{t.bezEmaila}</strong>}</p>
        </>
      ) : null}
    </article>
  );
}

const siatka = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' };

// Poradniki huba: pierwszy poradnik każdego narzędzia + drugi z widoczności i audytu (bez powtórzeń).
function poradnikiHuba() {
  const kolejnosc = [['/narzedzia/audyt-seo', 0], ['/sprawdz-widocznosc-w-ai', 0], ['/narzedzia/kalkulator-strat-seo', 0], ['/narzedzia/makieta-redesignu', 0], ['/sprawdz-widocznosc-w-ai', 1], ['/narzedzia/audyt-seo', 1]];
  const widziane = new Set();
  return kolejnosc.map(([k, i]) => PORADNIKI[k]?.[i]).filter((p) => p && !widziane.has(p.href) && widziane.add(p.href));
}

// Źródła huba = źródła faktów, które hub podaje (PageSpeed, roboty AI, llms.txt, badania kalkulatora),
// wzięte z rejestrów stron narzędzi z ich datami odczytu (bez nowych, niesprawdzonych adresów).
function zrodlaHuba(locale) {
  const audyt = stronaNarzedziaL('audyt-seo', locale)?.sources ?? [];
  const generator = stronaNarzedziaL('generator-llms-txt', locale)?.sources ?? [];
  const kalkulator = zrodlaKalkulatoraL(locale) ?? [];
  const lista = [...audyt, generator[0], generator[4], generator[5], kalkulator[0], kalkulator[2]].filter(Boolean);
  const widziane = new Set();
  return lista.filter((z) => !widziane.has(z.url) && widziane.add(z.url));
}

export default function NarzedziaHub({ locale = 'pl' }) {
  const en = locale === 'en';
  const t = TEKSTY[en ? 'en' : 'pl'];
  const H1 = H1_HUBA[en ? 'en' : 'pl'];
  const karty = kartyHubaL(locale);
  const narzedzia = karty.filter((k) => k.sekcja === 'narzedzia');
  const szablony = karty.filter((k) => k.sekcja === 'szablony');
  const grupy = ['seo', 'ai'].map((g) => ({ id: g, karty: narzedzia.filter((k) => k.grupa === g) })).filter((g) => g.karty.length);
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');
  const hrefAudytu = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  const hrefMakiety = hrefJesliOpublikowana('/narzedzia/makieta-redesignu');
  const kroki = t.kroki.filter((k) => narzedzia.some((n) => n.href === k.href));
  const ceny = { audyt: '/audyt-seo', audytAi: hrefDlaLink(hrefAudytuAi(), locale), cennik: '/cennik-pozycjonowania' };
  const urlHuba = en ? `${BASE}${hrefWJezyku(SCIEZKA_HUBA, 'en')}` : `${BASE}${SCIEZKA_HUBA}`;
  const opisHuba = en ? STRONY_EN[SCIEZKA_HUBA]?.opis : wpisPublikacji(SCIEZKA_HUBA)?.opis;
  const daneNarzedzi = narzedzia.filter((k) => t.dane[k.id] && (k.id !== 'autorytet-domeny' || AUTORYTET_OPUBLIKOWANY));

  // Z-H8: CollectionPage z ItemList widocznych kart (ta sama kolejność co na stronie).
  const elementy = karty.filter((k) => k.href).map((k) => {
    const sciezka = k.href.split('#')[0];
    // image: miniatura karty (hub-obrazy); CollectionPageSchema przekazuje ją do ListItem (WebAppSchema.jsx, 12.11.2026).
    const obraz = k.sekcja === 'narzedzia' ? obrazKarty(k.id, locale) : null;
    return { name: k.nazwa, url: en ? hrefWJezyku(sciezka, 'en') ?? sciezka : sciezka, description: k.opis, ...(obraz ? { image: obraz.src } : {}) };
  });

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl="Narzędzia" en="Tools" />
      <CollectionPageSchema url={urlHuba} name={H1} description={opisHuba} language={en ? 'en' : 'pl'} elementy={elementy} />

      <section className={st.hero} style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
            </div>
            <h1 style={s.h1}>{H1}</h1>
          </Reveal>
          <p className={st.lead} style={s.lead}>{t.lead(szablony.length)}</p>

          {/* Z-H7: pole darmowego audytu SEO w hubie (ten sam klient co na stronie audytu, bez automatycznego startu). */}
          {hrefAudytu ? (
            <>
              <AudytSeoClient />
              <p style={{ ...s.przypis, textAlign: 'center', marginTop: '0.75rem' }}>
                {t.poAudycie}{' '}
                <Link href={hrefAudytu} style={s.podkreslenie}>{t.linkAudyt}</Link>.
              </p>
            </>
          ) : null}

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {t.odpowiedz}
            </AnswerBox>
          </div>
          <Byline sciezka={SCIEZKA_HUBA} takzeEn style={{ textAlign: 'center' }} />

          <section aria-labelledby="narzedzia-online" className={st.sekcja} style={{ marginTop: '3rem' }}>
            <h2 id="narzedzia-online" style={s.h2}>{t.h2Narzedzia}</h2>
            <p style={s.akapit}>
              {t.pNarzedzia}
            </p>
            {grupy.map((g) => (
              <div key={g.id}>
                <h3 id={`grupa-${g.id}`} style={{ ...s.h3, margin: '1.75rem 0 0.85rem' }}>{t.grupy[g.id]}</h3>
                <div style={siatka}>
                  {g.karty.map((k) => <Karta key={k.id} karta={k} t={t} locale={locale} />)}
                </div>
              </div>
            ))}
          </section>

          {kroki.length > 0 && (
            <section aria-labelledby="od-czego-zaczac" className={st.sekcja} style={s.sekcja}>
              <h2 id="od-czego-zaczac" style={s.h2}>{t.h2Kroki}</h2>
              <p style={s.akapit}>{t.pKroki}</p>
              <ol style={s.lista}>
                {kroki.map((k) => (
                  <li key={k.href}>
                    <Link href={k.href} style={{ ...s.podkreslenie, fontWeight: 700 }}>{k.link}</Link>{k.tekst}
                  </li>
                ))}
              </ol>
              {hrefMakiety ? (
                <p style={s.akapit}>
                  {t.poKrokach} <Link href={hrefMakiety} style={s.podkreslenie}>{t.linkMakieta}</Link>.
                </p>
              ) : null}
            </section>
          )}

          <section aria-labelledby="dane-i-ograniczenia" className={st.sekcja} style={s.sekcja}>
            <h2 id="dane-i-ograniczenia" style={s.h2}>{t.h2Dane}</h2>
            <p style={s.akapit}>{t.pDane}</p>
            <ul style={s.lista}>
              {daneNarzedzi.map((k) => (
                <li key={k.id}><strong>{t.krotko[k.id]}:</strong> {t.dane[k.id]()}</li>
              ))}
            </ul>
          </section>

          <section id="szablony" aria-labelledby="szablony-naglowek" className={st.sekcja} style={{ ...s.sekcja, scrollMarginTop: '110px' }}>
            <h2 id="szablony-naglowek" style={s.h2}>{t.h2Szablony}</h2>
            <p style={s.akapit}>
              {t.pSzablony}
            </p>
            <div style={siatka}>
              {szablony.map((k) => <Karta key={k.id} karta={k} t={t} locale={locale} />)}
            </div>
          </section>

          <section aria-labelledby="co-dalej" className={st.sekcja} style={s.sekcja}>
            <h2 id="co-dalej" style={s.h2}>{t.h2Dalej}</h2>
            <p style={s.akapit}>
              {t.dalejA} <Link href={hrefDlaLink(ceny.audyt, locale)} style={s.podkreslenie}>{t.linkAudytPlatny}</Link>{t.dalejB}{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>{t.linkGeo}</Link> : t.linkGeo}.
            </p>
            <p style={s.akapit}>{t.ceny(ceny)}</p>
          </section>

          <Poradniki pozycje={poradnikiHuba()} locale={locale} tytul={t.poradnikiTytul} />
        </div>
      </section>

      <AppleFaq faqData={faqHubaL(locale)} title={t.faqTytul} sectionId="pytania" />
      <section style={{ paddingBottom: '4rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={zrodlaHuba(locale)} {...(en ? { en: true } : {})} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
