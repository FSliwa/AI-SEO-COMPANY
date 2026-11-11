'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import AppleFaq from '@/components/service/AppleFaq';
import WebAppSchema from '@/components/WebAppSchema';
import Contact from '@/components/Contact';
import Byline from '@/components/Byline';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import WidocznoscAiClient from '@/components/narzedzia/WidocznoscAiClient';

// Audyt widoczności w AI (9.11.2026, decyzja Filipa: aplikacja zastępuje sprawdzarkę „Czy ChatGPT
// poleca Twoją firmę?”, która pytała tylko ChatGPT i Gemini). Pytania zadaje panel
// (panel.ai-seo-company.pl/api/narzedzia/widocznosc-ai): ChatGPT, Gemini, Perplexity (DataForSEO),
// Claude z wyszukiwaniem (Anthropic), przegląd AI w Google; limit 2 firmy na IP na dobę.
// Wynik: ocena i siatka od razu, treść odpowiedzi, konkurenci i źródła po podaniu e-maila
// (components/narzedzia/BramkaEmail.jsx). Teksty poniżej opisują dokładnie to, co robi panel.

// LW1 (PLAN-v2 6.0, 6.2, 6.10): linki do nowych stron tylko przez bramkę publikacji. Zdanie
// opisuje stronę, której przed publikacją nie ma, więc bez celu znika całe (nie zostaje tekst).
const HREF_P2 = hrefJesliOpublikowana('/porownania/seo-vs-geo');
const HREF_N1 = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');

// 4.11.2026 (etap 0 planu z filmu, A3): strona miała 292 słowa i 1 link wewnętrzny.
// 9.11.2026: kroki, progi wyniku i FAQ opisują nowy audyt (5 silników, ocena 0-100).
// Frazy: „widoczność w ai” 90/mies., „ai visibility” 110 (Google Ads przez DataForSEO, 4.11.2026).
const KROKI = [
  ['Trzy pytania jak od klienta', 'Z branży i miasta układamy trzy pytania, np. „Jaką firmę z branży stolarz polecasz w mieście Warszawa? Podaj kilka nazw.”'],
  ['Pięć silników AI', 'Każde pytanie zadajemy ChatGPT z wyszukiwaniem w sieci ustawionym na Polskę, Gemini, Perplexity i Claude z wyszukiwaniem, a w Google sprawdzamy przegląd AI. Microsoft Copilot nie ma publicznego API, więc go nie odpytujemy i piszemy to w wyniku.'],
  ['Szukamy Twojej firmy', 'W każdej odpowiedzi sprawdzamy, czy pada nazwa firmy albo adres strony, i zapisujemy źródła, na które powołuje się model. Ocena 0-100 to odsetek odpowiedzi, w których firma się pojawia.'],
];
const WYNIK = [
  ['0', 'Modele nie łączą Twojej firmy z branżą i miastem. Częste przyczyny: słaba wizytówka Google, mało opinii, brak firmy w katalogach i zestawieniach, strona bez jasnego opisu usług i lokalizacji.'],
  ['1–49', 'Firma pojawia się, ale nie w każdym pytaniu ani w każdym modelu. Zobacz źródła w odpowiedziach: to strony, na których warto mieć wzmiankę.'],
  ['50–100', 'Modele wymieniają Twoją firmę. Sprawdzaj to regularnie, bo odpowiedzi zmieniają się z dnia na dzień.'],
];
const FAQ = [
  { question: 'Czy sprawdzarka widoczności w AI jest darmowa?', answer: 'Tak. Zapytania do modeli opłacamy my. Ocenę i siatkę odpowiedzi widzisz od razu, a treść odpowiedzi, konkurentów i źródła po podaniu e-maila, na który wysyłamy też pełny wynik. Zapis na newsletter jest osobny i dobrowolny. Z jednego adresu IP można sprawdzić 2 firmy na dobę.' },
  { question: 'Dlaczego wynik różni się od tego, co widzę w ChatGPT?', answer: 'Pytamy przez API modeli, z wyszukiwaniem ustawionym na Twoje miasto. Aplikacja ChatGPT uwzględnia też historię rozmów, ustawienia i lokalizację użytkownika, a odpowiedzi zmieniają się z dnia na dzień. Traktuj wynik jako próbkę, nie jako stały ranking.' },
  { question: 'Które modele sprawdzacie?', answer: 'W darmowym sprawdzeniu: ChatGPT z wyszukiwaniem w sieci, Gemini, Perplexity, Claude z wyszukiwaniem i przegląd AI w wynikach Google. Microsoft Copilot nie ma publicznego API, więc nie da się go sprawdzić automatycznie. W płatnym audycie widoczności w AI zadajemy 30 pytań zamiast 3.' },
  { question: 'Co dzieje się z moimi danymi?', answer: 'Używamy ich tylko do przygotowania i wysłania wyniku oraz do odpowiedzi na Twoje pytania. Usuwamy je po 60 dniach. Odbiorcy to dostawcy poczty i modeli AI: Resend, DataForSEO i Anthropic. Newsletter wysyłamy tylko wtedy, gdy zaznaczysz osobną zgodę i potwierdzisz zapis linkiem z maila.' },
  { question: 'Jak zwiększyć widoczność w AI?', answer: 'Zacznij od wizytówki Google i opinii, potem zadbaj o wzmianki w źródłach, które modele cytują w Twojej branży, i o jasne odpowiedzi na pytania klientów na stronie. Sprawdź też, czy robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot.' },
];

// Wersja EN (9.11.2026): te same fakty, liczby i kolejność co w PL.
const KROKI_EN = [
  ['Three questions the way a customer asks them', 'From your industry and city we draft three questions, e.g. “Which carpentry company in Warsaw do you recommend? Please give a few names.”'],
  ['Five AI engines', 'We ask each question to ChatGPT with web search set to Poland, Gemini, Perplexity and Claude with web search, and we check Google AI Overviews. Microsoft Copilot has no public API, so we do not query it and we say so in the result.'],
  ['We look for your business', 'In every answer we check whether your company name or website address appears, and we record the sources the model cites. The 0-100 score is the share of answers in which your business appears.'],
];
const WYNIK_EN = [
  ['0', 'The models do not connect your business with your industry and city. Common causes: a weak Google Business Profile, few reviews, no presence in directories and rankings, a website without a clear description of services and location.'],
  ['1–49', 'Your business appears, but not in every question or every model. Look at the sources in the answers: those are the sites where a mention is worth having.'],
  ['50–100', 'The models name your business. Check it regularly, because answers change from day to day.'],
];
const FAQ_EN = [
  { question: 'Is the AI visibility checker free?', answer: 'Yes. We pay for the model queries. You see the score and the answer grid right away, and the answer texts, competitors and sources once you enter an email address, to which we also send the full result. Newsletter signup is separate and voluntary. You can check 2 businesses per day from one IP address.' },
  { question: 'Why does the result differ from what I see in ChatGPT?', answer: 'We ask through the models’ APIs, with search set to your city. The ChatGPT app also takes into account conversation history, settings and the user’s location, and answers change from day to day. Treat the result as a sample, not a fixed ranking.' },
  { question: 'Which models do you check?', answer: 'In the free check: ChatGPT with web search, Gemini, Perplexity, Claude with web search and Google AI Overviews. Microsoft Copilot has no public API, so it cannot be checked automatically. In the paid AI visibility audit we ask 30 questions instead of 3.' },
  { question: 'What happens to my data?', answer: 'We use it only to prepare and send the result and to answer your questions. We delete it after 60 days. Recipients are email and AI model providers: Resend, DataForSEO and Anthropic. We send the newsletter only if you tick a separate consent and confirm your signup with the link in the email.' },
  { question: 'How do I increase my AI visibility?', answer: 'Start with your Google Business Profile and reviews, then work on mentions in the sources the models cite in your industry, and on clear answers to customer questions on your site. Also check that robots.txt does not block the OAI-SearchBot and PerplexityBot crawlers.' },
];

const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };

export default function AiCheckerClient() {
  const en = useLocale() === 'en';
  const kroki = en ? KROKI_EN : KROKI;
  const wynik = en ? WYNIK_EN : WYNIK;
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Sprawdź widoczność w AI" en="AI Visibility Check" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {en ? 'Free check' : 'Bezpłatne sprawdzenie'}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' }}>
              {en ? 'AI visibility check: does ChatGPT recommend your business?' : 'Czy ChatGPT poleca Twoją firmę?'}
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto' }}>
              {en
                ? 'We ask ChatGPT (with web search in Poland), Gemini, Perplexity, Claude and Google AI Overviews three questions that customers ask when looking for a business in your industry. In 1 to 2 minutes you will see whether your business is named in the answers. We will also email you the full result.'
                : 'Zadamy ChatGPT (z wyszukiwaniem w Polsce), Gemini, Perplexity, Claude i przeglądowi AI w Google trzy pytania, które zadają klienci szukający firmy z Twojej branży. W 1 do 2 minut zobaczysz, czy w odpowiedziach pada Twoja firma. Pełny wynik wyślemy też e-mailem.'}
            </p>
            {/* LW1 (PLAN-v2 6.0): autor i data = LASTMOD strony (lib/lastmod.js). */}
            <Byline sciezka="/sprawdz-widocznosc-w-ai" takzeEn style={{ margin: '1rem 0 0' }} />
          </Reveal>

          <WidocznoscAiClient />

          {/* Oferta z dawnego ekranu wyniku: teraz stale pod aplikacją (te same teksty i linki). */}
          <div style={{ ...card, marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>
              {en
                ? 'Want to know how to change that? In the audit we check 30 questions in ChatGPT, Perplexity, Gemini and Google, and show you who the models recommend instead of you and which sites they rely on.'
                : 'Chcesz wiedzieć, jak to zmienić? W audycie sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google, pokazujemy, kogo modele polecają zamiast Ciebie i z jakich stron korzystają.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/pozycjonowanie-w-ai" className="btn btn-primary" data-cta="ai_check_offer">{en ? 'AI audit: €235 net' : 'Audyt AI: 990 zł netto'}</Link>
              <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="ai_check_demo">{en ? 'See the panel demo' : 'Zobacz demo panelu'}</a>
            </div>
          </div>

          <section aria-labelledby="ac-jak" style={{ marginTop: '4rem' }}>
            <h2 id="ac-jak" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>{en ? 'How the AI visibility checker works' : 'Jak działa sprawdzarka widoczności w AI'}</h2>
            <ol style={{ ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              {kroki.map(([h, p]) => (
                <li key={h}><strong style={{ color: 'var(--color-text-dark)' }}>{h}.</strong> {p}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="ac-wynik" style={{ marginTop: '3rem' }}>
            <h2 id="ac-wynik" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>{en ? 'How to read the result' : 'Jak czytać wynik'}</h2>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
              {wynik.map(([h, p]) => (
                <div key={h} style={{ ...card, padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="ac-co-dalej" style={{ marginTop: '3rem' }}>
            <h2 id="ac-co-dalej" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>{en ? 'What to do when ChatGPT does not recommend your business' : 'Co zrobić, gdy ChatGPT nie poleca Twojej firmy'}</h2>
            <ul style={{ ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              {en ? (
                <>
                  <li>Complete your Google Business Profile and collect reviews after every job, because that is the foundation of <Link href="/seo-lokalne-warszawa" style={{ textDecoration: 'underline' }}>local SEO</Link>. We describe the process step by step in the guide on <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ textDecoration: 'underline' }}>how to get Google reviews</Link>.</li>
                  <li>Get mentioned in the directories and rankings that the models cite in your industry. Their addresses are in the result, in the “Sources” field.</li>
                  <li>
                    Describe your services, city and service area on your site in simple sentences that can be quoted without context.
                    {HREF_P2 && <> Such descriptions help both in Google and in model answers: what works in both, we show in the <Link href={HREF_P2} style={{ textDecoration: 'underline' }}>SEO vs GEO</Link> comparison.</>}
                  </li>
                  <li>
                    Check that your robots.txt file does not block the OAI-SearchBot and PerplexityBot crawlers. Blocking them excludes your site from those tools’ citations.
                    {HREF_N1 && <> AI bot access to your site is also checked by our free <Link href={HREF_N1} style={{ textDecoration: 'underline' }}>llms.txt generator</Link>.</>}
                  </li>
                  <li>Measure changes regularly. In <Link href="/pozycjonowanie-w-ai" style={{ textDecoration: 'underline' }}>AI search optimization</Link> we check 30 questions in ChatGPT, Perplexity, Gemini and Google every week, and you can see the result in the <Link href="/panel-klienta" style={{ textDecoration: 'underline' }}>client portal</Link>.</li>
                </>
              ) : (
                <>
              {/* LW1, link 26 (on-page-seo RAPORT rozdz. 4): dopisek o SEO lokalnym. */}
              <li>Uzupełnij wizytówkę Google i zbieraj opinie po każdej usłudze, bo to podstawa <Link href="/seo-lokalne-warszawa" style={{ textDecoration: 'underline' }}>SEO lokalnego</Link>. Proces krok po kroku opisujemy w poradniku <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ textDecoration: 'underline' }}>jak pozyskiwać opinie Google</Link>.</li>
              <li>Zadbaj o wzmianki w katalogach i zestawieniach, które modele cytują w Twojej branży. Ich adresy są w wyniku, w polu „Źródła”.</li>
              <li>
                Opisz na stronie usługi, miasto i obszar działania prostymi zdaniami, które da się zacytować bez kontekstu.
                {HREF_P2 && <> Takie opisy pomagają i w Google, i w odpowiedziach modeli: co działa w obu, pokazujemy w porównaniu <Link href={HREF_P2} style={{ textDecoration: 'underline' }}>SEO a GEO</Link>.</>}
              </li>
              <li>
                Sprawdź, czy plik robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot. Blokada wyklucza stronę z cytowań tych narzędzi.
                {HREF_N1 && <> Dostęp botów AI do strony sprawdza też nasz bezpłatny <Link href={HREF_N1} style={{ textDecoration: 'underline' }}>generator llms.txt</Link>.</>}
              </li>
              <li>Mierz zmiany regularnie. W <Link href="/pozycjonowanie-w-ai" style={{ textDecoration: 'underline' }}>pozycjonowaniu w AI</Link> sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google co tydzień, a wynik widać w <Link href="/panel-klienta" style={{ textDecoration: 'underline' }}>panelu klienta</Link>.</li>
                </>
              )}
            </ul>
          </section>
        </div>
      </section>
      <AppleFaq faqData={en ? FAQ_EN : FAQ} title={en ? 'Questions about AI visibility' : 'Pytania o widoczność w AI'} />
      {/* A3b (BL-02): formularz kontaktowy, jak GeoPageClient.jsx. Wcześniej „Wyceń projekt”
          (#kontakt) w nagłówku i stopce nie miał tu celu i wyprowadzał na stronę główną. */}
      <Contact />
      {en ? (
        <WebAppSchema
          name="AI visibility checker"
          description="Free AI visibility audit: it asks ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews three questions your customers ask in your industry and shows whether they name your business."
          url="https://www.ai-seo-company.pl/en/ai-visibility-check"
          language="en"
        />
      ) : (
        <WebAppSchema
          name="Sprawdzarka widoczności w AI"
          description="Bezpłatny audyt widoczności w AI: zadaje ChatGPT, Gemini, Perplexity, Claude i przeglądowi AI w Google trzy pytania klientów z Twojej branży i pokazuje, czy wymieniają Twoją firmę."
          url="https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai"
        />
      )}
      <Footer />
    </main>
  );
}
