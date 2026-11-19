// Strona „SEO audit example” (/en/tools/seo-audit-example), tylko po angielsku (lib/stronyTylkoEn.js).
// 18.11.2026, partia 2, p2-audyt-przyklad. Komponent serwerowy. Układ, spis, tabele, FAQ i źródła jak strony
// szablonów (SzablonStrona.jsx, klasy sz-*); własne tylko karta wyniku w hero, rysunek raportu, karty problemów
// i listy reguł (audytPrzyklad.css). Dane: lib/audytPrzyklad.js (przebieg audytu własnej domeny, zapisany JSON),
// reguły: lib/audytPrzykladReguly.js. Schema: Article + FAQPage (AppleFaq) + BreadcrumbList (Breadcrumbs z parent), bez HowTo.
// Czym różni się od sąsiadów: /en/tools/free-seo-audit to NARZĘDZIE (uruchamiasz audyt), /en/seo-audit to USŁUGA,
// /en/blog/technical-seo-audit-checklist to LISTA kontrolna; ta strona pokazuje GOTOWY raport i jego format.

import '@/app/ruch.css';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import ArticleSchema from '@/components/ArticleSchema';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import SzNawigacja from './SzNawigacja';
import './szablony.css';
import './audytPrzyklad.css';
import { Link } from '@/i18n/routing';
import { RODZIC_OKRUSZKOW } from '@/lib/narzedzia';
import { AUDYT, cena } from '@/lib/narzedziaLiczby';
import { REGULY_AUDYTU } from '@/lib/audytPrzykladReguly';
import { DATA, FAQ, FORMAT, KATEGORIE, KROKI_CZYTANIA, LEAD, LIMITY, OBRAZ, PROBLEMY, RUN, SCIEZKA_EN, WAGI_NAZWY, ZGLOSZONE, ZRODLA } from '@/lib/audytPrzyklad';

const H1 = 'SEO audit example: a real report for our own website, score 95/100';
const NAZWY_KAT = { techniczne: 'Technical', tresc: 'Content', wydajnosc: 'Performance', ai: 'AI readiness' };
const znak = (n) => (n === 0 ? 'no change' : `+${n}`);

const SPIS = [
  { id: 'report', label: 'The report at a glance' },
  { id: 'scores', label: 'Scores by category' },
  { id: 'issues', label: 'The three issues and how to fix them' },
  { id: 'rules', label: 'Rules passed and failed' },
  { id: 'format', label: 'SEO audit format' },
  { id: 'reading', label: 'How to read a report' },
  { id: 'limits', label: 'Limits of an automated audit' },
];

function Sekcja({ id, h2, children }) {
  return (
    <div id={id} role="region" aria-labelledby={`${id}-h`} className="sz-sekcja">
      <h2 id={`${id}-h`} className="sz-h2">{h2}</h2>
      {children}
    </div>
  );
}

function Tabela({ id, caption, columns, rows, przypis }) {
  return (
    <div className="sz-tabela">
      <CompareTable id={id} caption={caption} columns={columns} rows={rows} przypis={przypis} />
    </div>
  );
}

export default function AudytPrzykladStrona() {
  const cenaAudytu = cena('audytSeo', 'en');
  const wynikWydajnosc = RUN.kategorie.wydajnosc.wynik;

  return (
    <main className="sz">
      <Header />
      <Breadcrumbs pl="SEO audit example" en="SEO audit example" parent={RODZIC_OKRUSZKOW} />
      <ArticleSchema
        type="Article"
        locale="en"
        breadcrumb={null}
        url={SCIEZKA_EN}
        title={H1}
        description={LEAD}
        datePublished={DATA}
        dateModified={DATA}
        imageUrl={OBRAZ.src}
      />

      <section className="sz-hero" data-petla="">
        <div className="sz-tlo" aria-hidden="true" />
        <div className="sz-hero__siatka">
          <div className="sz-hero__tekst">
            <div className="section-tag sz-tag">
              <span className="asterisk">✳</span> SEO audit example
            </div>
            <h1 className="sz-h1">{H1}</h1>
            <Byline data={DATA} takzeEn />
            <AnswerBox etykieta="Short answer">{LEAD}</AnswerBox>
            <p className="sz-cta">
              <Link href="/narzedzia/audyt-seo" className="btn btn-primary" data-cta="audyt_przyklad_hero">Run the free audit on your site</Link>
            </p>
          </div>
          <div className="ap-karta" role="group" aria-label={`Summary of the audit of ${RUN.domena}`}>
            <p className="ap-karta__domena">{RUN.domena} · {RUN.kiedy}</p>
            <div className="ap-karta__glowna">
              <span className="ap-karta__liczba" aria-label={`SEO score ${RUN.wynik} out of 100`}>{RUN.wynik}</span>
              <p className="ap-karta__opis">
                <strong>SEO score out of 100</strong>
                {RUN.stron} pages, {RUN.regul} rules: {RUN.bledy} errors, {RUN.ostrzezenia} warnings, {RUN.uwagi} notices.
              </p>
            </div>
            <ul className="ap-karta__lista">
              {KATEGORIE.map((k) => (
                <li key={k.id} className={RUN.kategorie[k.id].wynik < 100 ? 'ap-slabsza' : undefined}>
                  <span>{k.nazwa}</span>
                  <b>{RUN.kategorie[k.id].wynik}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="sz-uklad">
        <SzNawigacja items={SPIS} etykieta="On this page" />
        <div className="sz-tresc" data-sz-tresc>
          <Sekcja id="report" h2="The report at a glance">
            <p className="sz-akapit">
              We ran our <Link href="/narzedzia/audyt-seo">free SEO audit</Link> once on our own domain, on {RUN.kiedy}, the way any visitor does it: no account and no e-mail. Every number below is copied from the tool’s response, including the ones that do not flatter us.
            </p>
            <Tabela
              id="tabela-raportu"
              caption="The audit of www.ai-seo-company.pl in numbers"
              columns={[{ key: 'pozycja', label: 'Item' }, { key: 'wynik', label: 'Result' }]}
              rows={[
                { pozycja: 'Domain audited', wynik: RUN.domena },
                { pozycja: 'Run', wynik: `${RUN.kiedy}, result after about ${RUN.sekundy} seconds` },
                { pozycja: 'Pages checked', wynik: String(RUN.stron) },
                { pozycja: 'Rules applied', wynik: String(RUN.regul) },
                { pozycja: 'SEO score', wynik: `${RUN.wynik} out of 100` },
                { pozycja: 'Issues found', wynik: `${RUN.bledy + RUN.ostrzezenia + RUN.uwagi}: ${RUN.bledy} errors, ${RUN.ostrzezenia} warnings, ${RUN.uwagi} notices` },
                { pozycja: 'Previous audit of this domain', wynik: `${RUN.poprzedni.wynik} out of 100 on ${RUN.poprzedni.data} (+${RUN.poprzedni.zmiana} now)` },
                { pozycja: 'PageSpeed Insights (mobile)', wynik: `performance ${RUN.psi.wydajnosc}, SEO ${RUN.psi.seo}, accessibility ${RUN.psi.dostepnosc}, best practices ${RUN.psi.praktyki}` },
              ]}
            />
            <figure className="ap-rysunek">
              <Image
                src={OBRAZ.src}
                alt="Free SEO audit report for www.ai-seo-company.pl: score 95 out of 100, technical 100, content 100, performance 77, AI readiness 100, and three performance warnings with fix instructions"
                width={OBRAZ.width}
                height={OBRAZ.height}
                sizes="(min-width: 900px) 820px, 100vw"
              />
              <figcaption>The report as our free audit tool displays it, rendered from the saved result of the 18 November 2026 run for www.ai-seo-company.pl, without the site header. It is the part a visitor sees without giving an e-mail. Here that is the whole list, because the audit found only three issues. When it finds more, the first three are shown and the rest, with the affected page URLs and an e-mailed report, are unlocked with an e-mail address.</figcaption>
            </figure>
          </Sekcja>

          <Sekcja id="scores" h2="Scores by category">
            <p className="sz-akapit">
              The audit sorts its {RUN.regul} rules into four categories and weights them: technical SEO {KATEGORIE[0].waga}%, content {KATEGORIE[1].waga}%, performance {KATEGORIE[2].waga}% and AI readiness {KATEGORIE[3].waga}%. Three categories scored 100. Performance scored {wynikWydajnosc}, and that is the whole gap to a perfect score.
            </p>
            <Tabela
              id="tabela-kategorii"
              caption="Category scores in the audit of 18 November 2026"
              columns={[{ key: 'kat', label: 'Category' }, { key: 'waga', label: 'Weight' }, { key: 'regul', label: 'Rules' }, { key: 'wynik', label: 'Score' }, { key: 'zmiana', label: 'Against 14 Nov' }, { key: 'problemy', label: 'Issues' }]}
              rows={KATEGORIE.map((k) => ({
                kat: k.nazwa,
                waga: `${k.waga}%`,
                regul: String(k.regul),
                wynik: String(RUN.kategorie[k.id].wynik),
                zmiana: znak(RUN.kategorie[k.id].zmiana),
                problemy: k.id === 'wydajnosc' ? '3 warnings' : 'none',
              }))}
              przypis="Weights and rule counts: the free SEO audit’s scoring, as described on its page."
            />
            <p className="sz-akapit">
              The arithmetic is open. Overall: 0.35 × 100 + 0.30 × 100 + 0.20 × {wynikWydajnosc} + 0.15 × 100 = 95.4, shown as {RUN.wynik}. Performance is 70% the mobile PageSpeed score ({RUN.psi.wydajnosc}) and 30% the rules. Each of the three warnings costs 12 points of the rules part (4 points × a multiplier of 3), so the rules part is 64, and 0.7 × {RUN.psi.wydajnosc} + 0.3 × 64 = 77.3, shown as {wynikWydajnosc}.
            </p>
          </Sekcja>

          <Sekcja id="issues" h2="The three issues and how to fix them">
            <p className="sz-akapit">
              The audit reported no errors and no notices. All three warnings are about the speed of the home page on a phone, and they are connected: heavy images slow the largest element, and the largest element drags down the PageSpeed score. For each issue we show what the rule checks, what was measured and the fix the tool gives.
            </p>
            {PROBLEMY.map((p) => (
              <article key={p.id} className="ap-problem">
                <p className="ap-problem__meta">Warning · Performance</p>
                <h3 className="sz-h3" style={{ marginTop: 0 }}>{p.tytul}</h3>
                <dl>
                  <div><dt>What the rule checks</dt><dd>{p.sprawdza}</dd></div>
                  <div><dt>What we measured</dt><dd>{p.zmierzono}</dd></div>
                  <div><dt>How to fix it</dt><dd>{p.napraw}</dd></div>
                </dl>
              </article>
            ))}
            <p className="sz-akapit">
              LCP is one of Google’s Core Web Vitals, so the third issue is the one to check against Google’s own thresholds first. Our guide to <Link href="/blog/core-web-vitals-a-pozycje-google">Core Web Vitals and Google rankings</Link> explains the thresholds in detail.
            </p>
          </Sekcja>

          <Sekcja id="rules" h2="Rules passed and failed, by category">
            <p className="sz-akapit">
              In this run {ZGLOSZONE.length} of {RUN.regul} rules reported a problem, all in performance. The other {RUN.regul - ZGLOSZONE.length} reported nothing: their check passed or did not apply to this site. Open a group to see its rules, grouped as the tool groups them.
            </p>
            {KATEGORIE.map((k) => {
              const reguly = REGULY_AUDYTU.filter((r) => r.kat === k.id);
              const zgloszone = reguly.filter((r) => ZGLOSZONE.includes(r.id)).length;
              return (
                <details key={k.id} className="ap-grupa" open={k.id === 'wydajnosc' ? true : undefined}>
                  <summary>
                    <span>{NAZWY_KAT[k.id]}: {reguly.length} rules</span>
                    <span className="ap-grupa__stan">{zgloszone === 0 ? `all ${reguly.length} reported nothing` : `${zgloszone} reported a problem, ${reguly.length - zgloszone} nothing`}</span>
                  </summary>
                  <ol>
                    {reguly.map((r) => (
                      <li key={r.id} {...(ZGLOSZONE.includes(r.id) ? { 'data-zgloszona': '' } : {})}>
                        {r.t}
                        <small>{WAGI_NAZWY[r.waga]}, {r.pkt} {r.pkt === 1 ? 'pt' : 'pts'}{ZGLOSZONE.includes(r.id) ? ', reported a problem' : ''}</small>
                      </li>
                    ))}
                  </ol>
                </details>
              );
            })}
          </Sekcja>

          <Sekcja id="format" h2="SEO audit format: what a report should contain">
            <p className="sz-akapit">
              A good audit report lets someone who was not in the room decide what to do next. If you are writing an audit yourself, this is the SEO audit format we follow, and the right-hand column shows how this example fares. Use our <Link href="/narzedzia/checklista-seo">SEO checklist template</Link> for the checks you fill it with, or the <Link href="/blog/technical-seo-audit-checklist">technical SEO audit checklist</Link> for the technical part.
            </p>
            <Tabela
              id="tabela-formatu"
              caption="The parts of an SEO audit report and how this example covers them"
              columns={[{ key: 'sekcja', label: 'Part of the report' }, { key: 'zawiera', label: 'What it should contain' }, { key: 'tutaj', label: 'In this example' }]}
              rows={FORMAT.map((f) => ({ sekcja: f.sekcja, zawiera: f.zawiera, tutaj: f.tutaj }))}
              minWidth={720}
            />
          </Sekcja>

          <Sekcja id="reading" h2="How to read a report like this">
            <ol className="ap-kroki">
              {KROKI_CZYTANIA.map((k) => (
                <li key={k.id}><strong>{k.h}</strong> {k.t}</li>
              ))}
            </ol>
          </Sekcja>

          <Sekcja id="limits" h2="What an automated audit cannot do">
            <p className="sz-akapit">
              The free audit is fast and consistent, and that comes with limits. These are the ones that matter when you read the score of 95 above.
            </p>
            <ul className="sz-lista">
              {LIMITY.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <p className="sz-akapit">
              A manual audit covers the whole website and adds keywords, competitors, the link profile and Search Console data, with a plan of changes. Our <Link href="/audyt-seo">SEO audit service</Link> does that, starts from {cenaAudytu} net and takes 3 to 5 business days; the current prices of all packages are on the <Link href="/cennik-pozycjonowania">SEO pricing</Link> page.
            </p>
          </Sekcja>

          <div className="ap-cta" role="region" aria-labelledby="ap-cta-h">
            <h2 id="ap-cta-h" className="sz-h3" style={{ marginTop: 0 }}>See your own report</h2>
            <p>Enter your website address and get the same kind of report in 20 to 90 seconds: a 1-100 score, four category scores and the top issues with fixes. No sign-up; up to {AUDYT.limitIp} audits per day from one IP address.</p>
            <Link href="/narzedzia/audyt-seo" className="btn btn-primary" data-cta="audyt_przyklad_koniec">Run the free SEO audit</Link>
          </div>

          <div className="sz-faq">
            <AppleFaq faqData={FAQ.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer }))} title="Frequently asked questions" sectionId="faq" />
            <Zrodla zrodla={ZRODLA} en />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
