'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '../ScrollReveal';
import { Link } from '@/i18n/routing';

// Strona /o-nas byla linkowana w stopce jako sygnal E-E-A-T, ale nie padalo na
// niej ani jedno nazwisko i nie bylo schematu Person. Jednoczesnie kazdy artykul
// deklarowal autora "Filip Śliwa" jako byt bez @id, url i sameAs. Autor wisial
// w prozni: Google nie mial jak polaczyc artykulu z osoba, a osoby z firma.
// Ten komponent zamyka lancuch - widoczny podpis + wezel Person z trwalym @id,
// na ktory wskazuje ArticleSchema.
export const AUTHOR_ID = 'https://www.ai-seo-company.pl/o-nas#filip-sliwa';

export default function AboutAuthor() {
  const lang = useLocale();
  const isEn = lang === 'en';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: 'Filip Śliwa',
    givenName: 'Filip',
    familyName: 'Śliwa',
    jobTitle: isEn ? 'SEO specialist' : 'Specjalista SEO',
    url: isEn
      ? 'https://www.ai-seo-company.pl/en/about-us'
      : 'https://www.ai-seo-company.pl/o-nas',
    email: 'kontakt@ai-seo-company.pl',
    worksFor: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    // 5.11.2026 (PLAN-v2 6.24, EEAT1; SA-07, AV-19): + GEO z rozwinięciem skrótu (to samo brzmienie
    // co knowsAbout #organization w layout.js). sameAs dopiero z adresem profilu LinkedIn od Filipa
    // (nie zgadujemy adresu).
    knowsAbout: isEn
      ? ['Search engine optimization', 'Technical SEO', 'Local SEO', 'Web analytics', 'AI search optimization (GEO, Generative Engine Optimization)']
      : ['Pozycjonowanie stron', 'Techniczne SEO', 'SEO lokalne', 'Analityka internetowa', 'Pozycjonowanie w AI (GEO, Generative Engine Optimization)'],
  };

  const akapit = { fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1rem' };
  const link = { color: 'var(--color-primary)', textDecoration: 'underline' };

  return (
    <section style={{ padding: '80px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(2rem, 5vw, 3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {isEn ? 'Who writes here' : 'Kto tu pisze'}
            </div>
            {/* 5.11.2026 (PLAN-v2 6.24, EEAT1; MSA-13 po weryfikacji): H2 „Filip Śliwa: kto prowadzi
                Twoje SEO”, PL 150-200 słów. Wyłącznie sprawdzalne fakty: rola i zakres pracy (dotychczasowy
                opis z tego pliku), odpowiedź w 24 h bez handlowców (teksty-dla-filipa 1.3, wpis z wynikami),
                panel klienta (/panel-klienta), testy metod na własnej domenie i zestawienie 5 domen z GSC
                (/blog/wyniki-wdrozen-seo-2026), telefon z podpisu Filipa. Bez lat doświadczenia i bez
                certyfikatów - nie ma ich w źródłach (por. TODO w BlogCTA.jsx). Wpis z wynikami jest tylko
                po polsku, więc wersja EN odsyła do realizacji ze zrzutami GSC na stronie głównej. */}
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {isEn ? 'Filip Śliwa: who runs your SEO' : 'Filip Śliwa: kto prowadzi Twoje SEO'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--w-tusz-2)', fontWeight: 500, marginBottom: '1.5rem' }}>
              {isEn ? 'SEO specialist, AI SEO COMPANY' : 'Specjalista SEO, AI SEO COMPANY'}
            </p>
            {isEn ? (
              <>
                <p style={akapit}>
                  Filip Śliwa is an SEO specialist at AI SEO COMPANY and the author of the guides on our blog. He works on technical SEO, local visibility and analytics for B2B companies: audits, indexing, Core Web Vitals, Google Business Profile and enquiry tracking.
                </p>
                <p style={akapit}>
                  We work without salespeople: we reply to messages within 24 hours on working days, and the reply comes from the person who does the SEO on your site. What we did is visible in the <Link href="/panel-klienta" style={link}>client portal</Link>: a dated work log, plain-language site changes and the list of links we earned.
                </p>
                <p style={akapit}>
                  We test every method on ai-seo-company.pl first: page architecture built around keyword groups, Polish and English versions linked with hreflang, and structured data. We show results as data, not claims: the <Link href="/#portfolio" style={link}>portfolio on our home page</Link> has Google Search Console screenshots with the measurement window for each project.
                </p>
              </>
            ) : (
              <>
                <p style={akapit}>
                  Filip Śliwa jest specjalistą SEO w AI SEO COMPANY i autorem poradników publikowanych na naszym blogu. Zajmuje się technicznym SEO, widocznością lokalną i analityką dla firm B2B: audytami, indeksacją, Core Web Vitals, Profilem Firmy w Google i konfiguracją pomiaru zapytań.
                </p>
                <p style={akapit}>
                  Pracujemy bez handlowców: na wiadomości odpowiadamy w ciągu 24 godzin w dni robocze, a odpisuje osoba, która robi SEO na Twojej stronie. To, co zrobiliśmy, widzisz w <Link href="/panel-klienta" style={link}>panelu klienta</Link>: dziennik prac z datami, opisy zmian na stronie i listę zdobytych linków.
                </p>
                <p style={akapit}>
                  Każdą metodę najpierw sprawdzamy na ai-seo-company.pl: architekturę stron pod grupy fraz, wersję polską i angielską połączone tagami hreflang oraz dane strukturalne. Wyniki pokazujemy na danych, nie na deklaracjach. Zestawienie pięciu domen z 2026 roku, trzech klientów i dwóch naszych projektów, z kliknięciami i wyświetleniami z Google Search Console oraz oknem pomiaru przy każdej liczbie, znajdziesz we wpisie o <Link href="/blog/wyniki-wdrozen-seo-2026" style={link}>wynikach wdrożeń SEO w 2026 roku</Link>. Nie publikujemy danych sprzedażowych klientów, tylko widoczność, którą sprawdzisz sam.
                </p>
              </>
            )}
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-main)', margin: 0 }}>
              {isEn ? 'Contact: ' : 'Kontakt: '}
              <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                kontakt@ai-seo-company.pl
              </a>
              {isEn ? ', phone ' : ', tel. '}
              <a href="tel:+48518815055" data-cta="o_nas_autor_tel" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                {isEn ? '+48 518 815 055' : '518 815 055'}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
