'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { hash } from '@/lib/anchors';
import { PANEL_DEMO_URL } from '@/lib/panel';

// Oferta GEO dla małych firm (zadanie 2.2 planu przewagi, decyzja D6: audyt 990 zł zaliczany
// na abonament, monitoring w Premium, dopłata 490 zł do Standard). Wolumeny fraz (DataForSEO,
// Polska, 29.10.2026): „seo ai” 720, „geo seo” 390, „pozycjonowanie w ai” 260,
// „pozycjonowanie w chatgpt” 170, „agencja geo” 140.
const T = {
  pl: {
    tag: 'Pozycjonowanie w AI · GEO',
    h1: 'Pozycjonowanie w AI: Twoja firma w odpowiedziach ChatGPT i Google',
    lead: 'Coraz więcej klientów pyta ChatGPT, Gemini albo Perplexity, kogo wybrać. Co tydzień sprawdzamy, czy modele wymieniają Twoją firmę, z jakich stron korzystają i co zrobić, żeby polecały Ciebie. Wynik widzisz w panelu klienta.',
    ctaCheck: 'Sprawdź za darmo, czy ChatGPT Cię poleca',
    ctaAudit: 'Audyt AI za 990 zł netto',
    howTitle: 'Jak mierzymy widoczność w AI',
    how: [
      ['Pytania jak od klientów', 'Ustalamy 20–50 pytań, które zadają Twoi klienci, np. „Polecisz dobrego stolarza na Woli?”.'],
      ['Cztery źródła odpowiedzi', 'ChatGPT z wyszukiwaniem z Twojego miasta, Perplexity, Gemini i przegląd AI w wynikach Google.'],
      ['Co tydzień w panelu', 'Odsetek odpowiedzi z nazwą albo stroną firmy, tydzień po tygodniu, z pełną treścią odpowiedzi.'],
      ['Skąd modele biorą wiedzę', 'Lista stron cytowanych w odpowiedziach. Tam warto zdobyć wzmiankę, żeby model polecał Ciebie.'],
    ],
    offerTitle: 'Ile to kosztuje',
    offer: [
      { name: 'Audyt widoczności w AI', price: '990 zł netto', unit: 'jednorazowo', points: ['30 pytań w 4 źródłach', '5 konkurentów, których modele polecają', 'strony cytowane przez modele', '10 rekomendacji i 45 min omówienia', 'gotowy w 5 dni roboczych', 'zaliczany na pierwszy miesiąc abonamentu'] },
      { name: 'W pakiecie SEO Premium', price: 'w cenie', unit: 'od 2 500 zł netto / mies.', points: ['30 pytań co tydzień w panelu', '2 działania miesięcznie pod AI', 'wzmianki w cytowanych źródłach', 'treści odpowiadające na pytania klientów'], featured: true },
      { name: 'Dopłata do SEO Standard', price: '+490 zł netto', unit: 'miesięcznie', points: ['to samo co w Premium', 'pomiar co tydzień w panelu', 'umowa miesięczna, bez dodatkowych zobowiązań'] },
    ],
    doTitle: 'Co robimy, żeby modele Cię polecały',
    do: [
      'Wzmianki o firmie w miejscach, z których korzystają modele: katalogi branżowe, portale z opiniami, media lokalne.',
      'Treści, które odpowiadają wprost na pytania klientów, z konkretnymi liczbami, cenami i miejscem działania.',
      'Spójne dane firmy (nazwa, adres, telefon) wszędzie, dane strukturalne i plik llms.txt.',
      'Szybka strona, którą boty AI mogą odczytać bez JavaScriptu, i prowadzona wizytówka Google z opiniami.',
    ],
    honestTitle: 'Czego nie obiecujemy',
    honest: 'Nie gwarantujemy, że model poleci Twoją firmę: odpowiedzi zmieniają się z tygodnia na tydzień, a odpowiedzi z API mogą różnić się od tego, co ktoś zobaczy w aplikacji. Obiecujemy pomiar co tydzień, jawną metodę i pracę nad źródłami, z których modele korzystają. W SEO lokalnym przeglądy AI w Google pojawiają się rzadko, więc Mapy i strona nadal przynoszą większość zapytań.',
    shotAlt: 'Zakładka Widoczność w AI w panelu klienta (dane przykładowe)',
    demo: 'Zobacz tę zakładkę w demo panelu',
  },
  en: {
    tag: 'AI search optimization · GEO',
    h1: 'AI search optimization: your company in ChatGPT and Google answers',
    lead: 'More and more customers ask ChatGPT, Gemini or Perplexity whom to choose. Every week we check whether the models mention your company, which sites they rely on, and what to do so they recommend you. You see the results in the client portal.',
    ctaCheck: 'Check for free whether ChatGPT recommends you',
    ctaAudit: 'AI audit: €235 net',
    howTitle: 'How we measure AI visibility',
    how: [
      ['Questions your customers ask', 'We agree 20–50 questions your customers actually ask.'],
      ['Four answer sources', 'ChatGPT with search from your city, Perplexity, Gemini and the AI overview in Google results.'],
      ['Weekly in the portal', 'The share of answers mentioning your name or website, week by week, with the full answers.'],
      ['Where models get their knowledge', 'The sites cited in the answers: that is where a mention helps the model recommend you.'],
    ],
    offerTitle: 'Pricing',
    offer: [
      { name: 'AI visibility audit', price: '€235 net', unit: 'one-off', points: ['30 questions across 4 sources', '5 competitors the models recommend', 'sites the models cite', '10 recommendations and a 45-min review', 'ready in 5 business days', 'credited to your first monthly fee'] },
      { name: 'In SEO Premium', price: 'included', unit: 'from €590 net / mo', points: ['30 questions weekly in the portal', '2 AI-focused actions a month', 'mentions in cited sources', 'content answering customer questions'], featured: true },
      { name: 'Add-on to SEO Standard', price: '+€115 net', unit: 'per month', points: ['same as in Premium', 'weekly measurement in the portal', 'monthly contract, no extra commitment'] },
    ],
    doTitle: 'What we do so models recommend you',
    do: [
      'Mentions of your company where the models look: industry directories, review sites, local media.',
      'Content that directly answers customer questions, with concrete numbers, prices and service area.',
      'Consistent business data (name, address, phone) everywhere, structured data and an llms.txt file.',
      'A fast site AI bots can read without JavaScript, and a managed Google Business Profile with reviews.',
    ],
    honestTitle: 'What we do not promise',
    honest: 'We do not guarantee that a model will recommend your company: answers change week to week, and API answers can differ from what someone sees in the app. We promise weekly measurement, a transparent method and work on the sources the models use.',
    shotAlt: 'The AI visibility tab in the client portal (sample data)',
    demo: 'See this tab in the portal demo',
  },
};

const faq = [
  {
    question: 'Czym jest pozycjonowanie w AI (GEO)?',
    questionEn: 'What is AI search optimization (GEO)?',
    answer: 'To praca nad tym, żeby modele językowe, takie jak ChatGPT, Gemini czy Perplexity, i przeglądy AI w Google wymieniały Twoją firmę, gdy klient pyta o usługę. Modele składają odpowiedź ze stron, które znajdą, więc liczą się wzmianki w tych źródłach, treści odpowiadające na pytania i spójne dane firmy.',
    answerEn: 'It is work to make language models such as ChatGPT, Gemini or Perplexity, and the AI overviews in Google, mention your company when a customer asks about a service. Models assemble answers from the pages they find, so mentions in those sources, content that answers questions, and consistent business data all matter.'
  },
  {
    question: 'Czy zwykłe SEO nadal ma sens?',
    questionEn: 'Does regular SEO still make sense?',
    answer: 'Tak. Według raportu Senuto przeglądy AI w Google pojawiają się przy około 29% polskich fraz, ale tylko przy 4,5% fraz lokalnych i 9,6% fraz zakupowych. Dla firmy usługowej z Warszawy Mapy i strona nadal dają większość zapytań. Pozycjonowanie w AI dokładamy jako kolejną warstwę, nie zamiast SEO.',
    answerEn: 'Yes. According to Senuto, AI overviews appear for about 29% of Polish keywords, but only 4.5% of local and 9.6% of transactional ones. For a local service business, Maps and the website still bring most enquiries. We add AI search as another layer, not a replacement.'
  },
  {
    question: 'Ile kosztuje pozycjonowanie w ChatGPT?',
    questionEn: 'How much does AI search optimization cost?',
    answer: 'Audyt widoczności w AI kosztuje 990 zł netto i jest zaliczany na pierwszy miesiąc abonamentu. Stały pomiar i działania są w cenie pakietu SEO Premium (od 2 500 zł netto miesięcznie) albo jako dopłata 490 zł netto miesięcznie do SEO Standard.',
    answerEn: 'The AI visibility audit costs €235 net and is credited to your first monthly fee. Ongoing measurement and work are included in SEO Premium (from €590 net a month) or available as a €115 net monthly add-on to SEO Standard.'
  },
  {
    question: 'Kiedy zobaczę efekty?',
    questionEn: 'When will I see results?',
    answer: 'Pierwszy pomiar dostajesz w tygodniu startu, więc od razu wiesz, gdzie jesteś. Zmiany w odpowiedziach modeli pojawiają się zwykle po kilku tygodniach, gdy nowe wzmianki i treści trafią do źródeł, z których korzystają. Postęp widzisz co tydzień w panelu.',
    answerEn: 'You get the first measurement in the week you start, so you know where you stand. Changes in model answers usually appear after a few weeks, once new mentions and content reach the sources they use. You see progress weekly in the portal.'
  },
  {
    question: 'Czy gwarantujecie, że ChatGPT poleci moją firmę?',
    questionEn: 'Do you guarantee ChatGPT will recommend my company?',
    answer: 'Nie. Nikt nie kontroluje odpowiedzi modeli. Gwarantujemy pomiar co tydzień, jawną metodę i konkretne działania, które zwiększają szansę na wzmiankę.',
    answerEn: 'No. Nobody controls model answers. We guarantee weekly measurement, a transparent method and concrete actions that increase the chance of a mention.'
  },
];

const card = { background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };

export default function GeoPageClient() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  const t = T[lang];
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Pozycjonowanie w AI" en="AI Search Optimization" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '880px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)' }}>{t.h1}</h1>
            <p className="hero-lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '740px', margin: '0 auto 2rem', lineHeight: 1.65 }}>{t.lead}</p>
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {lang === 'pl' ? (
                <Link href="/sprawdz-widocznosc-w-ai" className="hero-btn-primary" data-cta="geo_hero_checker">{t.ctaCheck}</Link>
              ) : (
                <a href={hash('kontakt', lang)} className="hero-btn-primary" data-cta="geo_hero_quote">{t.ctaAudit}</a>
              )}
              {lang === 'pl' && <a href={hash('kontakt', lang)} className="hero-btn-secondary" data-cta="geo_hero_audit">{t.ctaAudit}</a>}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <Reveal className="section-header"><h2>{t.howTitle}</h2></Reveal>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', alignItems: 'center', marginTop: '2rem' }}>
            <RevealStagger style={{ display: 'grid', gap: '1rem' }}>
              {t.how.map(([h, p]) => (
                <RevealItem key={h} style={{ ...card, padding: '1.25rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: '#333336' }}>{p}</p>
                </RevealItem>
              ))}
            </RevealStagger>
            <Reveal style={{ textAlign: 'center' }}>
              <Image src="/images/panel/ai.webp" alt={t.shotAlt} width={1600} height={1025} sizes="(max-width: 800px) 100vw, 560px" style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)' }} />
              <a href={PANEL_DEMO_URL} data-cta="geo_demo" style={{ display: 'inline-block', marginTop: '1rem', fontWeight: 600, textDecoration: 'underline' }}>{t.demo} →</a>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <Reveal className="section-header"><h2>{t.offerTitle}</h2></Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', marginTop: '2rem' }}>
            {t.offer.map((o) => (
              <RevealItem key={o.name} style={{ ...card, padding: '1.75rem', border: o.featured ? '2px solid var(--color-primary)' : '1px solid transparent' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>{o.name}</h3>
                <p style={{ margin: '0.75rem 0 0', fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>{o.price}</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{o.unit}</p>
                <ul style={{ margin: '1rem 0 0', paddingLeft: '1.1rem', display: 'grid', gap: '0.45rem', lineHeight: 1.5, color: '#333336' }}>
                  {o.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="geo_offer_audit">{t.ctaAudit}</a>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '20px 0 80px' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <Reveal>
            <div style={{ ...card, borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>{t.doTitle}</h2>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6, color: '#333336' }}>
                {t.do.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ ...card, borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)' }}>{t.honestTitle}</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: '#333336' }}>{t.honest}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={faq} title={lang === 'pl' ? 'Pytania o pozycjonowanie w AI' : 'Questions about AI search optimization'} />
      <Contact />
      <Footer />
    </main>
  );
}
