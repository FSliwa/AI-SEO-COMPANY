// Wspólny układ stron darmowych aplikacji (wydzielony ze StronyAplikacji.jsx 11.11.2026, żeby każda
// aplikacja miała własny plik strony): Uklad (nagłówek, okruszki, schema, hero, FAQ, źródła), Sekcja
// i PozostaleNarzedzia. Komponenty serwerowe.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, RODZIC_OKRUSZKOW, SCIEZKA_HUBA, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { hrefWJezyku } from '@/lib/linkiEn';
import * as s from './styl';

export function Uklad({ slug, tag, schema, odpowiedz, children, faq, tytulFaq, locale = 'pl' }) {
  const en = locale === 'en';
  const strona = en ? stronaNarzedziaL(slug, 'en') : stronaNarzedzia(slug);
  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema name={schema.name} description={schema.description} url={en ? `${BASE}${hrefWJezyku(`/narzedzia/${slug}`, 'en')}` : `${BASE}/narzedzia/${slug}`} category={schema.category} {...(en ? { language: 'en' } : {})} />
      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>{odpowiedz}</AnswerBox>
          {children}
        </div>
      </section>
      <AppleFaq faqData={faq} title={tytulFaq} sectionId="pytania" />
      {strona.sources.length > 0 && (
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container" style={s.kontener}>
            <Zrodla zrodla={strona.sources} {...(en ? { en: true } : {})} />
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}

export function Sekcja({ id, tytul, children }) {
  return (
    <section aria-labelledby={id} style={s.sekcja}>
      <h2 id={id} style={s.h2}>{tytul}</h2>
      {children}
    </section>
  );
}

export function PozostaleNarzedzia({ bez, locale = 'pl' }) {
  const en = locale === 'en';
  const hub = hrefJesliOpublikowana(SCIEZKA_HUBA);
  const linki = (en ? [
    ['audyt-seo', 'Free SEO audit'],
    ['autorytet-domeny', 'Domain authority'],
    ['kalkulator-strat-seo', 'SEO loss calculator'],
    ['makieta-redesignu', 'Website mockup'],
    ['generator-llms-txt', 'llms.txt generator'],
  ] : [
    ['audyt-seo', 'Darmowy audyt SEO'],
    ['autorytet-domeny', 'Autorytet domeny'],
    ['kalkulator-strat-seo', 'Kalkulator strat bez SEO'],
    ['makieta-redesignu', 'Makieta nowej strony'],
    ['generator-llms-txt', 'Generator llms.txt'],
  ]).filter(([slug]) => slug !== bez).map(([slug, nazwa]) => [hrefJesliOpublikowana(`/narzedzia/${slug}`), nazwa]).filter(([href]) => href);
  if (!linki.length && !hub) return null;
  return (
    <section aria-labelledby={en ? 'more-tools' : 'inne-narzedzia'} style={{ ...s.sekcja, ...s.karta }}>
      <h2 id={en ? 'more-tools' : 'inne-narzedzia'} style={{ ...s.h2, marginBottom: '0.75rem' }}>{en ? 'More free tools' : 'Inne darmowe narzędzia'}</h2>
      <ul style={s.lista}>
        {linki.map(([href, nazwa]) => <li key={href}><Link href={href} style={s.podkreslenie}>{nazwa}</Link></li>)}
        {hub && <li><Link href={hub} style={s.podkreslenie}>{en ? 'All tools and templates' : 'Wszystkie narzędzia i szablony'}</Link></li>}
      </ul>
    </section>
  );
}
