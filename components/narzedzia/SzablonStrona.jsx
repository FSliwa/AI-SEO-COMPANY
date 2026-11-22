// Wspólna strona szablonu do pobrania (11.11.2026): /narzedzia/<slug> i /en/tools/<slug-en>.
// Komponent serwerowy. Treść PL i EN w pliku danych lib/szablony/<slug>.js (kontrakt niżej
// i w lib/szablony/README.md), więc nowy szablon = nowy plik danych + wpisy w rejestrach.
// Plik PDF idzie e-mailem przez panel (/api/szablony, ChecklistForm z propem plik), jak checklista
// zmiany agencji. Schema: Article z hasPart DigitalDocument (HowTo usuniety 18.11.2026: kroki nie sa widoczne na stronie),
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

import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów (nie CSS strony głównej)
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
import SzHero from './SzHero';
import SzNawigacja from './SzNawigacja';
import SzablonInterakcje from './SzablonInterakcje';
import './szablony.css';
import { Link } from '@/i18n/routing';
import { LASTMOD, pierwszaPublikacja } from '@/lib/lastmod';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, ENDPOINT_SZABLONOW, RODZIC_OKRUSZKOW } from '@/lib/narzedzia';
import { hrefDlaLink, hrefWJezyku } from '@/lib/linkiEn';
import { kotwicaLinku } from '@/lib/frazyLinkow';

function Html({ html }) {
  if (!html) return null;
  return <div className="szablon-tresc" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Tabela({ t }) {
  if (!t) return null;
  return (
    <div className="sz-tabela">
      <CompareTable id={t.id} caption={t.caption} columns={t.columns} rows={t.rows} przypis={t.przypis} minWidth={t.minWidth} />
    </div>
  );
}

export default function SzablonStrona({ dane, locale = 'pl' }) {
  const en = locale === 'en';
  const d = en ? dane.en : dane.pl;
  const sciezkaPl = `/narzedzia/${dane.slug}`;
  const url = en ? `/en${dane.sciezkaEn}` : sciezkaPl;
  const adresPelny = `${BASE}${en ? `/en${dane.sciezkaEn}` : sciezkaPl}`;
  const dataZmiany = LASTMOD[adresPelny] ?? LASTMOD[`${BASE}${sciezkaPl}`] ?? dane.updated;
  // datePublished = dzień pierwszej publikacji z lib/lastmod.json (nie data ostatniej zmiany).
  const dataPubl = dane.opublikowano ?? pierwszaPublikacja(adresPelny) ?? dataZmiany;
  const powiazane = (d.powiazane || [])
    .map((p) => ({ ...p, cel: hrefJesliOpublikowana(p.href) }))
    // EN: tylko cele z wersją angielską (artykuł tylko po polsku dałby /en/blog/... = 404).
    .filter((p) => p.cel && (!en || hrefWJezyku(p.cel, 'en')));

  const spis = [
    ...d.sekcje.map((sek) => ({ id: sek.id, label: sek.h2 })),
    ...(d.podglad ? [{ id: 'podglad', label: d.podglad.h2 }] : []),
    { id: 'pobierz', label: d.formularz.h2 },
  ];

  return (
    <main className="sz">
      <Header />
      <Breadcrumbs pl={dane.pl.okruszek} en={dane.en.okruszek} parent={RODZIC_OKRUSZKOW} />
      <ArticleSchema
        type="Article"
        locale={en ? 'en' : 'pl'}
        breadcrumb={null}
        url={url}
        title={d.h1}
        description={d.lead}
        datePublished={dataPubl}
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

      <SzHero tag={d.tag} h1={d.h1} slug={dane.slug} locale={locale}>
        <Byline sciezka={sciezkaPl} takzeEn data={en ? dataZmiany : undefined} />
        <AnswerBox etykieta={en ? 'Short answer' : undefined}>{d.lead}</AnswerBox>
        <p className="sz-cta">
          <a href="#pobierz" className="btn btn-primary" data-cta={`szablon_${dane.plik}_skok`}>{d.formularz.przycisk}</a>
        </p>
      </SzHero>

      <div className="sz-uklad">
        <SzNawigacja items={spis} etykieta={en ? 'On this page' : 'Spis treści strony'} />
        <div className="sz-tresc" data-sz-tresc>
          <SzablonInterakcje slug={dane.slug} locale={locale} />
          {d.sekcje.map((sek) => (
            <div key={sek.id} id={sek.id} role="region" aria-labelledby={`${sek.id}-h`} className="sz-sekcja">
              <h2 id={`${sek.id}-h`} className="sz-h2">{sek.h2}</h2>
              <Html html={sek.html} />
              <Tabela t={sek.tabela} />
              <Html html={sek.htmlPo} />
            </div>
          ))}

          {d.podglad && (
            <div id="podglad" role="region" aria-labelledby="podglad-h" className="sz-sekcja">
              <h2 id="podglad-h" className="sz-h2">{d.podglad.h2}</h2>
              {d.podglad.opis && <p className="sz-akapit">{d.podglad.opis}</p>}
              <div className="sz-panel">
                <div className="sz-kartka">
                  <div className="sz-kartka__pasek" aria-hidden="true"><i /><i /><i /></div>
                  <div className="sz-kartka__tresc" tabIndex={0} role="group" aria-labelledby="podglad-h">
                    <Html html={d.podglad.html} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="pobierz" role="region" aria-labelledby="pobierz-h" className="sz-sekcja sz-sekcja--bez sz-pobierz">
            <div>
              <h2 id="pobierz-h" className="sz-h2">{d.formularz.h2}</h2>
              {d.formularz.opis && <p className="sz-akapit">{d.formularz.opis}</p>}
            </div>
            <div className="sz-pobierz__form">
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
          </div>

          {powiazane.length > 0 && (
            <div role="region" aria-labelledby="powiazane-h" className="sz-sekcja sz-sekcja--bez">
              <h2 id="powiazane-h" className="sz-h2">{en ? 'Related guides and tools' : 'Powiązane poradniki i narzędzia'}</h2>
              <ul className="sz-powiazane">
                {powiazane.map((p) => (
                  <li key={p.href}>
                    <Link href={hrefDlaLink(p.cel, locale)}>{kotwicaLinku(p.href, locale, p.tekst)}</Link>{p.opis ? <><span className="sz-dwukropek">: </span>{p.opis}</> : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sz-faq">
            {d.faq && d.faq.length > 0 && (
              <AppleFaq faqData={d.faq.map((f) => (en ? { ...f, questionEn: f.question, answerEn: f.answer } : f))} title={en ? 'Frequently asked questions' : 'Najczęstsze pytania'} sectionId="faq" />
            )}
            <Zrodla zrodla={d.zrodla} en={en} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
