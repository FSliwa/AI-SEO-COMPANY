'use client';

// Formularz i wynik generatora llms.txt (N1, PLAN-v2 6.10; CB-09, CB-18; 5.11.2026).
// API: app/api/llms-txt/route.js (ten sam serwis, bez panelu). Wynik: gotowy plik w formacie
// llmstxt.org (kopiuj / pobierz), tabela 8 botów (robots.txt / kod HTTP / wniosek), lista
// pominiętych i nieprzetworzonych adresów. Zdarzenie GA4 llms_generate (page_type = narzedzie
// dodaje lib/track.js). Linki do sprawdzarki i audytu przychodzą w propsach z komponentu
// serwerowego (bramka publikacji i flaga T0.2), żeby lib/narzedzia.js nie trafiał do bundla klienta.
// 9.11.2026: wersja EN (useLocale): teksty interfejsu tu, komunikaty API po polu lang w żądaniu.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { track } from '@/lib/track';
import * as s from './styl';

const API = '/api/llms-txt';
const KOLOR = { ok: '#047857', uwaga: '#B45309', blad: '#b3261e' };
const OCENA = { ok: 'OK', uwaga: 'Uwaga', blad: 'Problem' };
const OCENA_EN = { ok: 'OK', uwaga: 'Warning', blad: 'Problem' };
const pole = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };
const malyPrzycisk = { padding: '0.6rem 1.1rem', fontSize: '0.95rem' };

// Odmiana po polsku: 1 adres, 2-4 adresy, 5+ adresów (12-14 adresów).
function adresy(n, en = false) {
  if (en) return `${n} ${n === 1 ? 'URL' : 'URLs'}`;
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return '1 adres';
  return `${n} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? 'adresy' : 'adresów'}`;
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
    return o.naglowekH1
      ? { ocena: 'ok', tekst: `Existing /llms.txt file: found (code 200${o.typ ? `, ${o.typ}` : ''}${kbEn}) and it starts with a heading with the name, as the specification requires.` }
      : { ocena: 'uwaga', tekst: `Existing /llms.txt file: found (code 200${kbEn}), but it does not start with a "# Name" heading, which the specification treats as required.` };
  }
  if (!o.kod) return { ocena: 'uwaga', tekst: 'Obecny plik /llms.txt: brak odpowiedzi w 4 s.' };
  if (o.kod >= 300 && o.kod < 400) return { ocena: 'uwaga', tekst: `Obecny plik /llms.txt: przekierowanie (${o.kod}). Lepiej udostępnić plik bezpośrednio pod /llms.txt.` };
  if (o.kod !== 200) return { ocena: 'uwaga', tekst: `Obecny plik /llms.txt: brak (kod ${o.kod}). Wgraj plik wygenerowany niżej.` };
  if (o.html) return { ocena: 'blad', tekst: 'Pod /llms.txt strona zwraca HTML zamiast tekstu. Sprawdź, czy plik na pewno leży w katalogu głównym.' };
  const kb = o.bajty ? `, ${o.wiecejNiz ? 'ponad ' : ''}${(o.bajty / 1024).toLocaleString('pl-PL', { maximumFractionDigits: 1 })} KB` : '';
  return o.naglowekH1
    ? { ocena: 'ok', tekst: `Obecny plik /llms.txt: jest (kod 200${o.typ ? `, ${o.typ}` : ''}${kb}) i zaczyna się od nagłówka z nazwą, jak wymaga specyfikacja.` }
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

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan({ status: 'loading', blad: null, wynik: null });
    setSkopiowano(false);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: String(fd.get('url') || ''), lang: en ? 'en' : 'pl' }),
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
      setStan({ status: 'done', blad: null, wynik: data });
    } catch {
      setStan({ status: 'error', blad: en ? 'No connection. Check your internet and try again.' : 'Brak połączenia. Sprawdź internet i spróbuj ponownie.', wynik: null });
    }
  }

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(stan.wynik.llmsTxt);
      setSkopiowano(true);
    } catch {
      const obszar = document.getElementById('llms-wynik-plik');
      if (obszar) obszar.select();
    }
  }

  const w = stan.wynik;
  const sprawdzone = w ? w.mapa.sprawdzone : 0;
  const obecny = w ? opisObecnegoPliku(w.obecnyPlik, en) : null;

  return (
    <div>
      <form onSubmit={onSubmit} style={{ ...s.karta, display: 'grid', gap: '1rem' }} aria-describedby="llms-opis-formularza">
        <div>
          <label htmlFor="llms-adres" style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>{en ? 'Website address' : 'Adres strony'}</label>
          <input id="llms-adres" name="url" type="text" inputMode="url" autoComplete="url" required minLength={4} maxLength={300} placeholder={en ? 'e.g. company.com' : 'np. firma.pl'} style={pole} />
        </div>
        <p id="llms-opis-formularza" style={{ ...s.przypis, margin: 0 }}>
          {en ? 'We fetch your sitemap (sitemap.xml) and check up to 50 URLs and 8 AI bots. It takes up to 20 seconds. We do not store the address or the result. Limit: 10 checks per day from one IP address.' : 'Pobieramy mapę strony (sitemap.xml), sprawdzamy do 50 adresów i 8 botów AI. Trwa to do 20 sekund. Nie zapisujemy adresu ani wyniku. Limit: 10 sprawdzeń dziennie z jednego adresu IP.'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="llms_generate_submit">
            {stan.status === 'loading' ? (en ? 'Checking the sitemap and bots… (up to 20 s)' : 'Sprawdzamy mapę strony i boty… (do 20 s)') : (en ? 'Generate llms.txt' : 'Wygeneruj llms.txt')}
          </button>
          {stan.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{stan.blad}</p>}
        </div>
      </form>

      <div aria-live="polite">
        {stan.status === 'done' && w && (
          <section aria-labelledby="llms-wynik" style={{ ...s.karta, marginTop: '1.5rem' }}>
            <h2 id="llms-wynik" style={s.h2}>{en ? 'Result for' : 'Wynik dla'} {host(w.strona)}</h2>
            <p style={s.akapit}>
              {en
                ? (w.mapa.zrodlo
                  ? `Sitemap: ${adresy(w.mapa.adresow, true)}${w.mapa.adresow > w.mapa.limit ? ` (we check the first ${w.mapa.limit})` : ''}. In the file: ${w.wPliku}, skipped: ${w.pominietychRazem}.`
                  : `We did not find a sitemap (no sitemap.xml and no Sitemap entry in robots.txt), so the file contains only the home page. In the file: ${w.wPliku}.`)
                : (w.mapa.zrodlo
                  ? `Mapa strony: ${adresy(w.mapa.adresow)}${w.mapa.adresow > w.mapa.limit ? ` (sprawdzamy pierwsze ${w.mapa.limit})` : ''}. W pliku: ${w.wPliku}, pominięte: ${w.pominietychRazem}.`
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
              {en ? 'Review the file before uploading it: remove pages with no value for customers (terms, login, tags), add a sentence under the heading about what the company does, and upload it as /llms.txt.' : 'Przejrzyj plik przed wgraniem: usuń podstrony bez wartości dla klientów (regulamin, logowanie, tagi), dopisz pod nagłówkiem zdanie o tym, czym zajmuje się firma, i wgraj go jako /llms.txt.'}
            </p>
            <textarea
              id="llms-wynik-plik"
              readOnly
              value={w.llmsTxt}
              rows={14}
              aria-label={en ? 'Generated llms.txt file' : 'Wygenerowany plik llms.txt'}
              style={{ ...pole, ...s.kod, resize: 'vertical', whiteSpace: 'pre', overflowX: 'auto' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
              <button type="button" className="btn btn-primary" style={malyPrzycisk} onClick={kopiuj} data-cta="llms_copy">{en ? 'Copy' : 'Kopiuj'}</button>
              <button type="button" className="btn btn-secondary" style={malyPrzycisk} onClick={() => pobierzPlik(w.llmsTxt)} data-cta="llms_download">{en ? 'Download llms.txt' : 'Pobierz llms.txt'}</button>
              {skopiowano && <span role="status" style={{ color: '#047857', fontWeight: 600 }}>{en ? 'Copied' : 'Skopiowano'}</span>}
            </div>

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
                {hrefAudytu && <Link href={hrefAudytu} className={hrefSprawdzarki ? 'btn btn-secondary' : 'btn btn-primary'} data-cta="llms_audyt">{en ? 'AI visibility audit: €235 net' : 'Audyt widoczności w AI: 990 zł netto'}</Link>}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
