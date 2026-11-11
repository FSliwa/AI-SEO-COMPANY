// Wspólna strona szablonu do pobrania (11.11.2026): /narzedzia/<slug> i /en/tools/<slug-en>.
// Komponent serwerowy. Treść PL i EN w pliku danych lib/szablony/<slug>.js (kontrakt niżej
// i w lib/szablony/README.md), więc nowy szablon = nowy plik danych + wpisy w rejestrach.
// Plik PDF idzie e-mailem przez panel (/api/szablony, ChecklistForm z propem plik), jak checklista
// zmiany agencji. Schema: Article z hasPart DigitalDocument, opcjonalnie HowTo z krokami,
// FAQPage (AppleFaq), BreadcrumbList przez /narzedzia (Breadcrumbs z parent).
//
// Kontrakt danych (dane.pl i dane.en mają te same klucze):
//   okruszek, tag, h1, lead (40-60 słów, AnswerBox), sekcje: [{ id, h2, html, tabela?, htmlPo? }],
//   tabela: { id, caption, columns: [{ key, label }], rows: [{...}], przypis? },
//   podglad: { h2, opis, html } (podgląd zawartości szablonu w HTML),
//   formularz: { h2, opis, przycisk, przedmiot, komunikatOk, etykieta },
//   faq: [{ question, answer }], zrodla: [{ url, nazwa, data }],
//   powiazane: [{ href (klucz PL z i18n/routing.js), tekst, opis }],
//   kroki?: [{ name, text }] (HowTo), plikNazwa (nazwa dokumentu w schema)
// Pola wspólne: slug, plik (id dla panelu), sciezkaEn, opublikowano, updated, obraz?.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import ChecklistForm from '@/components/ChecklistForm';
import ArticleSchema from '@/components/ArticleSchema';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { LASTMOD } from '@/lib/lastmod';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, ENDPOINT_SZABLONOW, RODZIC_OKRUSZKOW } from '@/lib/narzedzia';
import { hrefDlaLink, hrefWJezyku } from '@/lib/linkiEn';
import * as s from './styl';

function Html({ html }) {
  if (!html) return null;
  return <div className="szablon-tresc" style={{ ...s.akapit, margin: 0 }} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Tabela({ t }) {
  if (!t) return null;
  return <CompareTable id={t.id} caption={t.caption} columns={t.columns} rows={t.rows} przypis={t.przypis} minWidth={t.minWidth} />;
}

export default function SzablonStrona({ dane, locale = 'pl' }) {
  const en = locale === 'en';
  const d = en ? dane.en : dane.pl;
  const sciezkaPl = `/narzedzia/${dane.slug}`;
  const url = en ? `/en${dane.sciezkaEn}` : sciezkaPl;
  const dataZmiany = LASTMOD[`${BASE}${en ? `/en${dane.sciezkaEn}` : sciezkaPl}`] ?? LASTMOD[`${BASE}${sciezkaPl}`] ?? dane.updated;
  const powiazane = (d.powiazane || [])
    .map((p) => ({ ...p, cel: hrefJesliOpublikowana(p.href) }))
    // EN: tylko cele z wersją angielską (artykuł tylko po polsku dałby /en/blog/... = 404).
    .filter((p) => p.cel && (!en || hrefWJezyku(p.cel, 'en')));

  const howTo = d.kroki && d.kroki.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${BASE}${url}#howto`,
        name: d.h1,
        inLanguage: en ? 'en' : 'pl',
        step: d.kroki.map((k, i) => ({ '@type': 'HowToStep', position: i + 1, name: k.name, text: k.text })),
      }
    : null;

  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={dane.pl.okruszek} en={dane.en.okruszek} parent={RODZIC_OKRUSZKOW} />
      <ArticleSchema
        type="Article"
        locale={en ? 'en' : 'pl'}
        breadcrumb={null}
        url={url}
        title={d.h1}
        description={d.lead}
        datePublished={dane.opublikowano ?? dataZmiany}
        dateModified={dataZmiany}
        imageUrl={dane.obraz || undefined}
        extra={{
          hasPart: {
            '@type': 'DigitalDocument',
            name: d.plikNazwa,
            encodingFormat: 'application/pdf',
            isAccessibleForFree: true,
          },
        }}
      />
      {howTo && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />}

      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {d.tag}
            </div>
            <h1 style={s.h1}>{d.h1}</h1>
          </Reveal>
          <Byline sciezka={sciezkaPl} takzeEn data={en ? dataZmiany : undefined} style={{ textAlign: 'center' }} />
          <AnswerBox etykieta={en ? 'Short answer' : undefined}>{d.lead}</AnswerBox>
          <p style={{ textAlign: 'center', margin: '0.5rem 0 0' }}>
            <a href="#pobierz" className="btn btn-primary" data-cta={`szablon_${dane.plik}_skok`}>{d.formularz.przycisk}</a>
          </p>
        </div>
      </section>

      <div className="container" style={{ ...s.kontener, padding: '0 1.5rem 4rem' }}>
        {d.sekcje.map((sek) => (
          <div key={sek.id} id={sek.id} role="region" aria-labelledby={`${sek.id}-h`} style={s.sekcja}>
            <h2 id={`${sek.id}-h`} style={s.h2}>{sek.h2}</h2>
            <Html html={sek.html} />
            <Tabela t={sek.tabela} />
            <Html html={sek.htmlPo} />
          </div>
        ))}

        {d.podglad && (
          <div id="podglad" role="region" aria-labelledby="podglad-h" style={s.sekcja}>
            <h2 id="podglad-h" style={s.h2}>{d.podglad.h2}</h2>
            {d.podglad.opis && <p style={s.akapit}>{d.podglad.opis}</p>}
            <div style={{ ...s.karta, padding: 'clamp(1.1rem, 3vw, 1.75rem)' }}>
              <Html html={d.podglad.html} />
            </div>
          </div>
        )}

        <div id="pobierz" role="region" aria-labelledby="pobierz-h" style={{ ...s.sekcja, ...s.karta }}>
          <h2 id="pobierz-h" style={s.h2}>{d.formularz.h2}</h2>
          {d.formularz.opis && <p style={s.akapit}>{d.formularz.opis}</p>}
          <ChecklistForm
            endpoint={ENDPOINT_SZABLONOW}
            plik={dane.plik}
            plan={`szablon_${dane.plik}`}
            kategoria="Template"
            idPrefiks={`sz-${dane.plik}`}
            etykieta={d.formularz.etykieta}
            przycisk={d.formularz.przycisk}
            komunikatOk={d.formularz.komunikatOk}
            przedmiot={d.formularz.przedmiot}
            cta={`szablon_${dane.plik}_submit`}
          />
        </div>

        {powiazane.length > 0 && (
          <div role="region" aria-labelledby="powiazane-h" style={s.sekcja}>
            <h2 id="powiazane-h" style={s.h2}>{en ? 'Related guides and tools' : 'Powiązane poradniki i narzędzia'}</h2>
            <ul style={s.lista}>
              {powiazane.map((p) => (
                <li key={p.href}>
                  <Link href={hrefDlaLink(p.cel, locale)} style={s.podkreslenie}>{p.tekst}</Link>{p.opis ? `: ${p.opis}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {d.faq && d.faq.length > 0 && (
          <AppleFaq faqData={d.faq.map((f) => (en ? { ...f, questionEn: f.question, answerEn: f.answer } : f))} title={en ? 'Frequently asked questions' : 'Najczęstsze pytania'} sectionId="faq" />
        )}
        <Zrodla zrodla={d.zrodla} en={en} />
      </div>
      <Footer />
    </main>
  );
}
