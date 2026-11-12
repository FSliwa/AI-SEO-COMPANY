'use client';

// Formularz i wynik generatora llms.txt (N1, PLAN-v2 6.10; CB-09, CB-18; 5.11.2026).
// API: app/api/llms-txt/route.js (ten sam serwis, bez panelu). Wynik: gotowy plik w formacie
// llmstxt.org (kopiuj / pobierz), tabela 8 botów (robots.txt / kod HTTP / wniosek), lista
// pominiętych i nieprzetworzonych adresów. Zdarzenie GA4 llms_generate (page_type = narzedzie
// dodaje lib/track.js). Linki do sprawdzarki i audytu przychodzą w propsach z komponentu
// serwerowego (bramka publikacji i flaga T0.2), żeby lib/narzedzia.js nie trafiał do bundla klienta.
// 9.11.2026: wersja EN (useLocale): teksty interfejsu tu, komunikaty API po polu lang w żądaniu.
// 12.11.2026 (S1-poprawki): opis pod przyciskiem (Z-L1, Z-01 pkt 4), ?url= wypełnia pole i „Przykład”
// (Z-06), link do wyniku, edytor pliku przed pobraniem (Z-L4: LlmsTxtEdytor + llmsTxtPlik.js; plik
// do skopiowania i pobrania składa się z modelu edytora, bez zmian w API).

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { track } from '@/lib/track';
import { GENERATOR, cena } from '@/lib/narzedziaLiczby';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import LlmsTxtEdytor from './LlmsTxtEdytor';
import { parsujLlmsTxt, policz, zlozLlmsTxt } from './llmsTxtPlik';
import st from './narzedzia.module.css';
import * as s from './styl';

const API = '/api/llms-txt';
const KOLOR = { ok: '#047857', uwaga: '#B45309', blad: '#b3261e' };
const OCENA = { ok: 'OK', uwaga: 'Uwaga', blad: 'Problem' };
const OCENA_EN = { ok: 'OK', uwaga: 'Warning', blad: 'Problem' };
const pole = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };
const malyPrzycisk = { padding: '0.6rem 1.1rem', fontSize: '0.95rem' };

// Odmiana po polsku: 1 adres, 2-4 adresy, 5+ adresów (12-14 adresów).
function adresy(n, en = false) {
  if (en) return `${n.toLocaleString('en-US')} ${n === 1 ? 'URL' : 'URLs'}`;
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return '1 adres';
  // toLocaleString: „20 176 adresów” zamiast „20176” przy dużych mapach (11.11.2026).
  return `${n.toLocaleString('pl-PL')} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? 'adresy' : 'adresów'}`;
}

// 1 link, 2-4 linki, 5+ linków (12-14 linków).
function linki(n, en = false) {
  if (en) return `${n} ${n === 1 ? 'link' : 'links'}`;
  const d = n % 10;
  const r = n % 100;
  if (n === 1) return '1 link';
  return `${n} ${d >= 2 && d <= 4 && (r < 12 || r > 14) ? 'linki' : 'linków'}`;
}

function host(adres) {
  try {
    return new URL(adres).hostname;
  } catch {
    return adres;
  }
}

function pobierzPlik(tekst) {
  const blob = new Blob([tekst], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'llms.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Stan obecnego pliku /llms.txt na sprawdzanej stronie.
function opisObecnegoPliku(o, en = false) {
  if (!o) return null;
  if (en) {
    if (!o.kod) return { ocena: 'uwaga', tekst: 'Existing /llms.txt file: no response within 4 s.' };
    if (o.kod >= 300 && o.kod < 400) return { ocena: 'uwaga', tekst: `Existing /llms.txt file: redirect (${o.kod}). It is better to serve the file directly at /llms.txt.` };
    if (o.kod !== 200) return { ocena: 'uwaga', tekst: `Existing /llms.txt file: not found (code ${o.kod}). Upload the file generated below.` };
    if (o.html) return { ocena: 'blad', tekst: 'At /llms.txt the site returns HTML instead of text. Check that the file is really in the root directory.' };
    const kbEn = o.bajty ? `, ${o.wiecejNiz ? 'over ' : ''}${(o.bajty / 1024).toLocaleString('en-US', { maximumFractionDigits: 1 })} KB` : '';
    if (o.linki === 0) return { ocena: 'blad', tekst: `Existing /llms.txt file: found (code 200${kbEn}), but it does not contain a single link to your pages in the [name](https://address) format. A language model cannot learn from it which pages matter. Replace it with the file generated below.` };
    const linkiEn = typeof o.linki === 'number' ? `, links to pages: ${o.linki}` : '';
    return o.naglowekH1
      ? { ocena: 'ok', tekst: `Existing /llms.txt file: found (code 200${o.typ ? `, ${o.typ}` : ''}${kbEn}${linkiEn}) and it starts with a heading with the name, as the specification requires.` }
      : { ocena: 'uwaga', tekst: `Existing /llms.txt file: found (code 200${kbEn}), but it does not start with a "# Name" heading, which the specification treats as required.` };
  }
  if (!o.kod) return { ocena: 'uwaga', tekst: 'Obecny plik /llms.txt: brak odpowiedzi w 4 s.' };
  if (o.kod >= 300 && o.kod < 400) return { ocena: 'uwaga', tekst: `Obecny plik /llms.txt: przekierowanie (${o.kod}). Lepiej udostępnić plik bezpośrednio pod /llms.txt.` };
  if (o.kod !== 200) return { ocena: 'uwaga', tekst: `Obecny plik /llms.txt: brak (kod ${o.kod}). Wgraj plik wygenerowany niżej.` };
  if (o.html) return { ocena: 'blad', tekst: 'Pod /llms.txt strona zwraca HTML zamiast tekstu. Sprawdź, czy plik na pewno leży w katalogu głównym.' };
  const kb = o.bajty ? `, ${o.wiecejNiz ? 'ponad ' : ''}${(o.bajty / 1024).toLocaleString('pl-PL', { maximumFractionDigits: 1 })} KB` : '';
  if (o.linki === 0) return { ocena: 'blad', tekst: `Obecny plik /llms.txt: jest (kod 200${kb}), ale nie ma w nim ani jednego linku do podstron w formacie [nazwa](https://adres). Model językowy nie dowie się z niego, które strony są ważne. Zastąp go plikiem wygenerowanym niżej.` };
  const linki = typeof o.linki === 'number' ? `, linki do podstron: ${o.linki}` : '';
  return o.naglowekH1
    ? { ocena: 'ok', tekst: `Obecny plik /llms.txt: jest (kod 200${o.typ ? `, ${o.typ}` : ''}${kb}${linki}) i zaczyna się od nagłówka z nazwą, jak wymaga specyfikacja.` }
    : { ocena: 'uwaga', tekst: `Obecny plik /llms.txt: jest (kod 200${kb}), ale nie zaczyna się od nagłówka „# Nazwa”, który specyfikacja uznaje za obowiązkowy.` };
}

function komorkaRobots(b, sprawdzone, en = false) {
  if (en) {
    if (b.robots === 'niedostępny') return 'robots.txt unavailable';
    const zakresEn = b.zablokowaneAdresy > 0 && b.robots === 'dozwolony'
      ? `; blocks ${b.zablokowaneAdresy} of ${sprawdzone} checked URLs`
      : '';
    const regulaEn = b.regula ? ` (${b.regula})` : '';
    return `${b.robots === 'zablokowany' ? 'Blocked' : 'Allowed'}${regulaEn}${zakresEn}`;
  }
  if (b.robots === 'niedostępny') return 'robots.txt niedostępny';
  const zakres = b.zablokowaneAdresy > 0 && b.robots === 'dozwolony'
    ? `; blokuje ${b.zablokowaneAdresy} z ${sprawdzone} sprawdzonych adresów`
    : '';
  const regula = b.regula ? ` (${b.regula})` : '';
  return `${b.robots === 'zablokowany' ? 'Zablokowany' : 'Dozwolony'}${regula}${zakres}`;
}

function ListaAdresow({ id, tytul, opis, elementy }) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3 id={id} style={{ ...s.h3, marginTop: 0 }}>{tytul}</h3>
      {opis && <p style={{ ...s.akapit, fontSize: '0.95rem' }}>{opis}</p>}
      <ul style={{ ...s.lista, fontSize: '0.92rem', gap: '0.35rem' }}>
        {elementy.map((e) => (
          <li key={e.url} style={{ overflowWrap: 'anywhere' }}>
            {e.url}{e.powod ? <span style={{ color: 'var(--w-tusz-2)' }}> · {e.powod}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LlmsTxtClient({ hrefSprawdzarki = null, hrefAudytu }) {
  const en = useLocale() === 'en';
  const ocena = en ? OCENA_EN : OCENA;
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null });
  const [skopiowano, setSkopiowano] = useState(false);
  const [adres, setAdres] = useState('');
  // Edytor (Z-L4): model pliku z odpowiedzi API; zmieniony = plik do pobrania składamy z modelu.
  const [edycja, setEdycja] = useState({ model: null, zmieniony: false });
  const poleRef = useRef(null);

  // Z-06: ?url= tylko wypełnia pole, bez startu (limit 10 sprawdzeń na IP).
  useParametrUrl(['url'], ({ url }) => {
    if (url && poleRef.current) poleRef.current.value = url;
  });

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const wpisany = String(fd.get('url') || '').trim();
    setStan({ status: 'loading', blad: null, wynik: null });
    setSkopiowano(false);
    setAdres(wpisany);
    zapiszParametry({ url: wpisany });
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wpisany, lang: en ? 'en' : 'pl' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({ status: 'error', blad: data.error || (en ? 'We could not check the site. Please try again in a moment.' : 'Nie udało się sprawdzić strony. Spróbuj za chwilę.'), wynik: null });
        return;
      }
      track('llms_generate', {
        boty_zablokowane: data.boty.filter((b) => b.ocena === 'blad').length,
        adresy_w_pliku: data.wPliku,
        czesciowy: data.czesciowy ? 'tak' : 'nie',
      });
      setEdycja({ model: parsujLlmsTxt(data.llmsTxt), zmieniony: false });
      setStan({ status: 'done', blad: null, wynik: data });
    } catch {
      setStan({ status: 'error', blad: en ? 'No connection. Check your internet and try again.' : 'Brak połączenia. Sprawdź internet i spróbuj ponownie.', wynik: null });
    }
  }

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(plik);
      setSkopiowano(true);
    } catch {
      const obszar = document.getElementById('llms-wynik-plik');
      if (obszar) obszar.select();
    }
  }

  const w = stan.wynik;
  const plik = w ? (edycja.model && edycja.zmieniony ? zlozLlmsTxt(edycja.model, { nazwa: host(w.strona), sekcja: en ? 'Pages' : 'Strony' }) : w.llmsTxt) : '';
  const liczby = edycja.model && edycja.zmieniony ? policz(edycja.model) : null;
  function zmienModel(model) {
    setEdycja({ model, zmieniony: true });
    setSkopiowano(false);
  }
  function przywroc() {
    setEdycja({ model: parsujLlmsTxt(w.llmsTxt), zmieniony: false });
    setSkopiowano(false);
  }
  const sprawdzone = w ? w.mapa.sprawdzone : 0;
  const obecny = w ? opisObecnegoPliku(w.obecnyPlik, en) : null;
  // 11.11.2026: z dużej mapy (albo indeksu map) bierzemy po kilka adresów z każdej mapy i sekcji,
  // a nie pierwsze 50; mapa.uciete = mapa większa, niż czytamy (liczba adresów to dolna granica).
  const mapaOpis = w && w.mapa.zrodlo
    ? (en
      ? `${w.mapa.uciete ? 'over ' : ''}${adresy(w.mapa.adresow, true)}${w.mapa.map > 1 ? ` in ${w.mapa.map} sitemaps` : ''}${w.mapa.adresow > w.mapa.limit ? ` (we pick ${w.mapa.limit}, a few from every section)` : ''}`
      : `${w.mapa.uciete ? 'ponad ' : ''}${adresy(w.mapa.adresow)}${w.mapa.map > 1 ? ` w ${w.mapa.map} mapach` : ''}${w.mapa.adresow > w.mapa.limit ? ` (wybieramy ${w.mapa.limit}, po kilka z każdej sekcji)` : ''}`)
    : '';
  // Weryfikacja 11.11.2026: zdania pod plikiem tylko o tym, co w nim jest (sekcja Optional bywa pusta,
  // a strona bez meta description nie ma zdania „> …” pod nagłówkiem). Za adres z błędem sprawdzamy
  // czasem zastępcę, więc w formularzu „do 50” dotyczy pliku, a nie liczby sprawdzonych adresów.
  const maOptional = Boolean(w) && /^## Optional$/m.test(plik);
  const maOpis = Boolean(w) && /^> \S/m.test(plik);

  return (
    <div>
      <form onSubmit={onSubmit} style={{ ...s.karta, display: 'grid', gap: '1rem' }} aria-describedby="llms-opis-formularza">
        <div>
          <label htmlFor="llms-adres" style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>{en ? 'Website address' : 'Adres strony'}</label>
          <input ref={poleRef} id="llms-adres" name="url" type="text" inputMode="url" autoComplete="url" required minLength={4} maxLength={300} placeholder={en ? 'e.g. company.com' : 'np. firma.pl'} style={pole} />
          <PrzykladAdresu onWybierz={(a) => { if (poleRef.current) { poleRef.current.value = a; poleRef.current.focus(); } }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="llms_generate_submit">
            {stan.status === 'loading' ? (en ? `Checking the sitemap and bots… (up to ${GENERATOR.sekund} s)` : `Sprawdzamy mapę strony i boty… (do ${GENERATOR.sekund} s)`) : (en ? 'Generate llms.txt' : 'Wygeneruj llms.txt')}
          </button>
          {stan.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{stan.blad}</p>}
        </div>
        {/* Z-L1 + Z-01 pkt 4: opis pod przyciskiem; „wybieramy do 50” = plik (zastępcy za adresy z błędem są ponad to). */}
        <p id="llms-opis-formularza" style={{ ...s.przypis, margin: 0 }}>
          {en
            ? `The whole file right away, no email. We fetch your sitemap (up to ${GENERATOR.mapPodrzednych} child sitemaps), pick up to ${GENERATOR.adresow} URLs (with a larger sitemap, a few from every section) and check ${GENERATOR.botow} AI bots. Before downloading, you can edit the links, descriptions and order. We do not store the address or the result. Limit: ${GENERATOR.limitIp} checks per day from one IP address.`
            : `Cały plik od razu, bez e-maila. Pobieramy mapę strony (do ${GENERATOR.mapPodrzednych} map podrzędnych), wybieramy do ${GENERATOR.adresow} adresów (przy większej mapie po kilka z każdej sekcji) i sprawdzamy ${GENERATOR.botow} botów AI. Przed pobraniem możesz zmienić linki, opisy i kolejność. Nie zapisujemy adresu ani wyniku. Limit: ${GENERATOR.limitIp} sprawdzeń dziennie z jednego adresu IP.`}
        </p>
      </form>

      <div aria-live="polite">
        {stan.status === 'done' && w && (
          <section aria-labelledby="llms-wynik" className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.karta, marginTop: '1.5rem' }}>
            <h2 id="llms-wynik" style={s.h2}>{en ? 'Result for' : 'Wynik dla'} {host(w.strona)}</h2>
            <p style={s.akapit}>
              {en
                ? (w.mapa.zrodlo
                  ? `Sitemap: ${mapaOpis}. In the file: ${w.wPliku}, skipped: ${w.pominietychRazem}.`
                  : `We did not find a sitemap (no sitemap.xml and no Sitemap entry in robots.txt), so the file contains only the home page. In the file: ${w.wPliku}.`)
                : (w.mapa.zrodlo
                  ? `Mapa strony: ${mapaOpis}. W pliku: ${w.wPliku}, pominięte: ${w.pominietychRazem}.`
                  : `Nie znaleźliśmy mapy strony (sitemap.xml ani wpisu Sitemap w robots.txt), więc plik zawiera tylko stronę główną. W pliku: ${w.wPliku}.`)}
              {w.czesciowy && (en
                ? ` The 20-second limit ran out before the end. We did not manage to check: ${adresy(w.nieprzetworzone.length, true)} (list below).`
                : ` Limit 20 sekund minął przed końcem. Nie zdążyliśmy sprawdzić: ${adresy(w.nieprzetworzone.length)} (lista niżej).`)}
            </p>

            {obecny && (
              <p style={{ ...s.akapit, fontSize: '0.98rem' }}>
                <span style={{ fontWeight: 700, color: KOLOR[obecny.ocena] }}>{ocena[obecny.ocena]}:</span> {obecny.tekst}
              </p>
            )}

            <h3 style={s.h3}>{en ? 'AI bot access to the home page' : 'Dostęp botów AI do strony głównej'}</h3>
            <CompareTable
              id="llms-tabela-botow"
              caption={en ? `AI bots and ${host(w.strona)}` : `Boty AI a strona ${host(w.strona)}`}
              columns={[
                { key: 'bot', label: 'Bot' },
                { key: 'robots', label: 'robots.txt' },
                { key: 'kod', label: en ? 'HTTP code (bot UA)' : 'Kod HTTP (UA bota)' },
                { key: 'wniosek', label: en ? 'Conclusion' : 'Wniosek' },
              ]}
              rows={w.boty.map((b) => ({
                id: b.nazwa,
                bot: (
                  <>
                    {b.nazwa}
                    <span style={{ display: 'block', fontWeight: 400, fontSize: '0.85rem', color: 'var(--w-tusz-2)' }}>{b.firma}: {b.rola}</span>
                  </>
                ),
                robots: komorkaRobots(b, sprawdzone, en),
                kod: b.testHttp ? (b.kod ?? (en ? 'no response' : 'brak odpowiedzi')) : (en ? 'not applicable' : 'nie dotyczy'),
                wniosek: (
                  <>
                    <span style={{ fontWeight: 700, color: KOLOR[b.ocena] }}>{ocena[b.ocena]}:</span> {b.wniosek}
                  </>
                ),
              }))}
              przypis={en ? 'The bot access test is indicative: some CDNs block requests with the GPTBot UA that come from outside OpenAI IP addresses.' : 'Test dostępu botów jest orientacyjny: część CDN-ów blokuje zapytania z UA GPTBot spoza adresów IP OpenAI.'}
            />

            <h3 style={s.h3}>{en ? 'Your llms.txt file' : 'Twój plik llms.txt'}</h3>
            <p style={{ ...s.akapit, fontSize: '0.95rem' }}>
              {en
                ? `Review the file before uploading it.${maOptional ? ' Terms and policies are in the "## Optional" section, which a model may skip when it is short on context.' : ''} ${edycja.model ? 'In the editor below, untick' : 'Remove'} pages with no value for customers (login, tags), ${maOpis ? 'check the sentence under the heading about what the company does' : 'add a sentence under the heading about what the company does (in the format "> One sentence")'}, and upload the file as /llms.txt.`
                : `Przejrzyj plik przed wgraniem.${maOptional ? ' Regulamin i polityki są w sekcji „## Optional”, którą model może pominąć, gdy ma mało miejsca.' : ''} ${edycja.model ? 'W edytorze niżej odznacz' : 'Usuń'} podstrony bez wartości dla klientów (logowanie, tagi), ${maOpis ? 'sprawdź zdanie pod nagłówkiem o tym, czym zajmuje się firma' : 'dopisz pod nagłówkiem zdanie o tym, czym zajmuje się firma (w formacie „> Jedno zdanie”)'}, i wgraj plik jako /llms.txt.`}
            </p>
            {edycja.model && (
              <details id="llms-edytor" style={{ border: '1px solid rgba(15,23,42,0.12)', borderRadius: '16px', padding: '0.85rem clamp(0.6rem, 2.5vw, 1rem)', margin: '0 0 1rem', background: 'var(--color-bg-surface)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--color-text-dark)', lineHeight: 1.45 }}>
                  {en ? 'Edit the file before downloading' : 'Edytuj plik przed pobraniem'}
                  <span style={{ display: 'block', fontWeight: 400, fontSize: '0.9rem', color: 'var(--w-tusz-2)' }}>
                    {en ? 'Untick the lines you do not want in the file. You can also change the name, description, titles, order and sections, and move links to "Optional".' : 'Odznacz linie, których nie chcesz w pliku. Możesz też zmienić nazwę, opis, tytuły, kolejność i sekcje oraz przenieść linki do „Optional”.'}
                  </span>
                </summary>
                <LlmsTxtEdytor model={edycja.model} onZmiana={zmienModel} en={en} />
              </details>
            )}
            <textarea
              id="llms-wynik-plik"
              readOnly
              value={plik}
              rows={14}
              aria-label={en ? 'Generated llms.txt file' : 'Wygenerowany plik llms.txt'}
              style={{ ...pole, ...s.kod, resize: 'vertical', whiteSpace: 'pre', overflowX: 'auto' }}
            />
            {liczby && (
              <p role="status" style={{ ...s.przypis, margin: '0.5rem 0 0' }}>
                {en
                  ? `File after your changes: ${linki(liczby.wPliku, true)} in ${liczby.sekcji} ${liczby.sekcji === 1 ? 'section' : 'sections'}${liczby.odznaczone ? `, ${liczby.odznaczone} unticked` : ''}.`
                  : `Plik po zmianach: ${linki(liczby.wPliku)}, sekcje: ${liczby.sekcji}${liczby.odznaczone ? `, odznaczone: ${liczby.odznaczone}` : ''}.`}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
              <button type="button" className="btn btn-primary" style={malyPrzycisk} onClick={kopiuj} data-cta="llms_copy">{en ? 'Copy' : 'Kopiuj'}</button>
              <button type="button" className="btn btn-secondary" style={malyPrzycisk} onClick={() => pobierzPlik(plik)} data-cta={edycja.zmieniony ? 'llms_download_edited' : 'llms_download'}>{en ? 'Download llms.txt' : 'Pobierz llms.txt'}</button>
              {edycja.zmieniony && <button type="button" className={st.przyciskTekstowy} onClick={przywroc}>{en ? 'Undo all changes' : 'Cofnij wszystkie zmiany'}</button>}
              {skopiowano && <span role="status" style={{ color: '#047857', fontWeight: 600 }}>{en ? 'Copied' : 'Skopiowano'}</span>}
            </div>
            <LinkWyniku narzedzie="llms_txt" parametry={{ url: adres || w.strona }} />

            {w.pominiete.length > 0 && (
              <ListaAdresow
                id="llms-pominiete"
                tytul={en ? `Skipped URLs (${w.pominietychRazem})` : `Pominięte adresy (${w.pominietychRazem})`}
                opis={w.pominietychRazem > w.pominiete.length ? (en ? `Showing the first ${w.pominiete.length}.` : `Pokazujemy pierwsze ${w.pominiete.length}.`) : null}
                elementy={w.pominiete}
              />
            )}
            {w.nieprzetworzone.length > 0 && (
              <ListaAdresow
                id="llms-nieprzetworzone"
                tytul={en ? `Not checked in time (${w.nieprzetworzone.length})` : `Nie zdążyliśmy sprawdzić (${w.nieprzetworzone.length})`}
                opis={en ? 'The site responded slowly and the 20-second limit ran out. Run the generator again or add these URLs to the file manually.' : 'Strona odpowiadała wolno i minął limit 20 sekund. Uruchom generator jeszcze raz albo dopisz te adresy do pliku ręcznie.'}
                elementy={w.nieprzetworzone.map((url) => ({ url }))}
              />
            )}

            <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)', marginTop: '1.75rem', paddingTop: '1.25rem', display: 'grid', gap: '0.75rem' }}>
              <p style={{ ...s.akapit, margin: 0 }}>
                {en ? 'The bots have access, yet ChatGPT still does not mention your company? Recommendations are decided by the sources the model draws on, not by the file itself.' : 'Boty mają dostęp, a ChatGPT i tak nie wymienia Twojej firmy? O poleceniach decydują źródła, z których korzysta model, a nie sam plik.'}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {hrefSprawdzarki && <Link href={hrefSprawdzarki} className="btn btn-primary" data-cta="llms_sprawdzarka">{en ? 'Check your AI visibility' : 'Sprawdź widoczność w AI'}</Link>}
                {hrefAudytu && <Link href={hrefAudytu} className={hrefSprawdzarki ? 'btn btn-secondary' : 'btn btn-primary'} data-cta="llms_audyt">{en ? `AI visibility audit: ${cena('audytAi', 'en')} net` : `Audyt widoczności w AI: ${cena('audytAi')} netto`}</Link>}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
