'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '../ScrollReveal';

// C8 (18.11.2026): „Jak powstają nasze treści”. Każde zdanie ma pokrycie w repozytorium:
// autor i podpis (components/Byline.jsx, AboutAuthor.jsx), źródła z datą odczytu (components/Zrodla.jsx),
// okno pomiaru przy danych z GSC (AboutAuthor.jsx), data aktualizacji z lib/lastmod.json (Byline.jsx),
// przegląd faktów 18.11.2026 (commit 78d8a17), polityka AI (playbook-seo.md 5.1 i 8),
// bramka publikacji nowych stron (lib/publikacja.js). Bez nowych typów JSON-LD i bez nowych faktów o osobach.
export default function AboutContent() {
  const isEn = useLocale() === 'en';
  const akapit = { fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1rem' };
  const link = { color: 'var(--color-primary)', textDecoration: 'underline' };

  return (
    <section style={{ padding: '0 0 80px' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(2rem, 5vw, 3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {isEn ? 'Our standards' : 'Nasze standardy'}
            </div>
            <h2 id={isEn ? 'how-our-content-is-made' : 'jak-powstaja-tresci'} style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.5rem', scrollMarginTop: '110px' }}>
              {isEn ? 'How our content is made' : 'Jak powstają nasze treści'}
            </h2>
            {isEn ? (
              <>
                <p style={akapit}>
                  <strong>Who is responsible.</strong> The guides on our blog are written under the name of Filip Śliwa, SEO specialist at AI SEO COMPANY, who signs each of them and answers for its content.
                </p>
                <p style={akapit}>
                  <strong>How we check facts.</strong> We base factual claims on primary sources, such as Google Search Central documentation. Where an article has a list of sources, each one shows the date we read it. Our own data, for example Google Search Console results, comes with the measurement window. On 18 November 2026 we went through the site again: we removed claims that no source supported and aligned prices and figures with what the site itself states.
                </p>
                <p style={akapit}>
                  <strong>The role of AI.</strong> We use AI tools for the site code and for drafts. We review content before it is published, and new pages go public only after our publication checks.
                </p>
                <p style={akapit}>
                  <strong>Corrections.</strong> The update date under an article changes only when its content really changes. If you spot an error, write to <a href="mailto:kontakt@ai-seo-company.pl" style={link}>kontakt@ai-seo-company.pl</a>.
                </p>
              </>
            ) : (
              <>
                <p style={akapit}>
                  <strong>Kto odpowiada.</strong> Poradniki na naszym blogu powstają pod nazwiskiem Filipa Śliwy, specjalisty SEO w AI SEO COMPANY. Podpisuje każdy z nich i odpowiada za jego treść.
                </p>
                <p style={akapit}>
                  <strong>Jak sprawdzamy fakty.</strong> Twierdzenia faktograficzne opieramy na źródłach pierwotnych, na przykład dokumentacji Google Search Central. Tam, gdzie artykuł ma listę źródeł, przy każdym widać datę odczytu. Dane własne, na przykład wyniki z Google Search Console, podajemy z oknem pomiaru. 18 listopada 2026 przeszliśmy przez serwis jeszcze raz: usunęliśmy twierdzenia, których nie potwierdzało żadne źródło, i ujednoliciliśmy ceny oraz liczby z tym, co podaje sama strona.
                </p>
                <p style={akapit}>
                  <strong>Rola AI.</strong> Korzystamy z narzędzi AI przy kodzie strony i szkicach. Treści przeglądamy przed publikacją, a nowe strony trafiają do publicznej wersji dopiero po naszej kontroli publikacji.
                </p>
                <p style={akapit}>
                  <strong>Poprawki.</strong> Data aktualizacji pod artykułem zmienia się tylko wtedy, gdy treść faktycznie się zmieniła. Jeśli zauważysz błąd, napisz na <a href="mailto:kontakt@ai-seo-company.pl" style={link}>kontakt@ai-seo-company.pl</a>.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
