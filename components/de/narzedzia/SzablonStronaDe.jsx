// Niemiecka strona szablonu do pobrania (18.11.2026, de-narzedzia): /de/tools/redaktionsplan-vorlage i /de/tools/seo-checkliste.
// Odpowiednik components/narzedzia/SzablonStrona.jsx (PL/EN) z tekstami DE. Komponent serwerowy. Dane: lib/szablony/*.de.js
// scalone w lib/szablony/de.js (kontrakt jak w lib/szablony/README.md, klucz `de`). Schema: Article z hasPart DigitalDocument
// (inLanguage de), (HowTo usuniety 18.11.2026: kroki nie sa widoczne na stronie) FAQPage (AppleFaq), BreadcrumbList (Breadcrumbs). Brak linku do huba
// /narzedzia (nie ma strony DE w fazie startowej), więc okruszki 2-poziomowe.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import ArticleSchema from '@/components/ArticleSchema';
import AppleFaq from '@/components/service/AppleFaq';
import SzHero from '@/components/narzedzia/SzHero';
import SzNawigacja from '@/components/narzedzia/SzNawigacja';
import '@/components/narzedzia/szablony.css';
import { Link } from '@/i18n/routing';
import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { dataTresci, pierwszaPublikacja } from '@/lib/lastmod';
import { BASE, ENDPOINT_SZABLONOW } from '@/lib/narzedzia';
import { ZrodlaDe, dataDlugaDe } from './UkladDe';
import SzablonFormularzDe from './SzablonFormularzDe';

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

export default function SzablonStronaDe({ dane }) {
  const d = dane.de;
  const klucz = `/narzedzia/${dane.slug}`;
  const wpis = wpisDe(klucz);
  const url = urlDe(klucz);
  const sciezka = url ? url.replace(BASE, '') : `/de/tools/${dane.slug}`;
  // Daty z jednego źródła (lib/lastmod.json, ustawia je `npm run wydanie`); do pierwszego wydania DE
  // zapas to data publikacji z danych szablonu.
  const dataPubl = (url && pierwszaPublikacja(url)) || dane.opublikowanoDe || '2026-11-18';
  const data = (url && dataTresci(url)) || dataPubl;
  const powiazane = (d.powiazane || []).filter((p) => maWersjeDe(p.href));

  const spis = [
    ...d.sekcje.map((sek) => ({ id: sek.id, label: sek.h2 })),
    ...(d.podglad ? [{ id: 'podglad', label: d.podglad.h2 }] : []),
    { id: 'pobierz', label: d.formularz.h2 },
  ];

  return (
    <main className="sz">
      <Header />
      <Breadcrumbs pl={d.okruszek} en={d.okruszek} de={d.okruszek} />
      <ArticleSchema
        type="Article"
        locale="de"
        breadcrumb={null}
        url={sciezka}
        title={wpis?.h1 ?? d.h1}
        description={d.lead}
        datePublished={dataPubl}
        dateModified={data}
        extra={{
          hasPart: {
            '@type': 'DigitalDocument',
            name: d.plikNazwa,
            encodingFormat: 'application/pdf',
            isAccessibleForFree: true,
          },
        }}
      />

      <SzHero tag={d.tag} h1={wpis?.h1 ?? d.h1} slug={dane.slug} locale="de">
        <p className="byline" style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>
          Verfasst von: <Link href="/o-nas" style={{ color: 'inherit', textDecoration: 'underline' }}>Filip Śliwa</Link>, SEO-Spezialist · aktualisiert: <time dateTime={data}>{dataDlugaDe(data)}</time>
        </p>
        <AnswerBox etykieta="Kurzantwort">{d.lead}</AnswerBox>
        <p className="sz-cta">
          <a href="#pobierz" className="btn btn-primary" data-cta={`szablon_${dane.plik}_skok`}>{d.formularz.przycisk}</a>
        </p>
      </SzHero>

      <div className="sz-uklad">
        <SzNawigacja items={spis} etykieta="Inhalt der Seite" />
        <div className="sz-tresc" data-sz-tresc>
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
              <SzablonFormularzDe
                endpoint={ENDPOINT_SZABLONOW}
                plik={dane.plik}
                plan={`szablon_${dane.plik}`}
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
              <h2 id="powiazane-h" className="sz-h2">Weiterführende Tools und Leistungen</h2>
              <ul className="sz-powiazane">
                {powiazane.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href}>{p.tekst}</Link>{p.opis ? <><span className="sz-dwukropek">: </span>{p.opis}</> : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sz-faq">
            {d.faq && d.faq.length > 0 && (
              <AppleFaq faqData={d.faq.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer }))} title="Häufige Fragen" sectionId="faq" />
            )}
            <ZrodlaDe zrodla={d.zrodla} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
