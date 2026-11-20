'use client';

// Niemiecka wersja formularza i wyniku generatora llms.txt (18.11.2026, de-narzedzia): odpowiednik
// components/narzedzia/LlmsTxtClient.jsx. API: app/api/llms-txt/route.js (ten sam serwis; lang 'de' w treści żądania
// daje komunikaty, wnioski o botach i nagłówki pliku po niemiecku). Edytor pliku: LlmsTxtEdytor (prop de) i llmsTxtPlik.js.

import { WALID_DE } from '@/lib/walidacjaDe';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { track } from '@/lib/track';
import { GENERATOR, CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba } from '@/lib/formatDe';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LlmsTxtEdytor from '@/components/narzedzia/LlmsTxtEdytor';
import { parsujLlmsTxt, policz, zlozLlmsTxt } from '@/components/narzedzia/llmsTxtPlik';
import { LinkWyniku, PrzykladAdresu } from './WspolneDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import '@/components/narzedzia/ruch-c.css';

const API = '/api/llms-txt';
const KOLOR = { ok: '#047857', uwaga: '#B45309', blad: '#b3261e' };
const OCENA = { ok: 'OK', uwaga: 'Achtung', blad: 'Problem' };
const pole = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };
const malyPrzycisk = { padding: '0.6rem 1.1rem', fontSize: '0.95rem' };

const adressen = (n) => `${liczba(n, 'de')} ${n === 1 ? 'Adresse' : 'Adressen'}`;
const links = (n) => `${n} ${n === 1 ? 'Link' : 'Links'}`;

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
function opisObecnegoPliku(o) {
  if (!o) return null;
  if (!o.kod) return { ocena: 'uwaga', tekst: 'Vorhandene Datei /llms.txt: keine Antwort innerhalb von 4 s.' };
  if (o.kod >= 300 && o.kod < 400) return { ocena: 'uwaga', tekst: `Vorhandene Datei /llms.txt: Weiterleitung (${o.kod}). Besser ist es, die Datei direkt unter /llms.txt auszuliefern.` };
  if (o.kod !== 200) return { ocena: 'uwaga', tekst: `Vorhandene Datei /llms.txt: nicht vorhanden (Code ${o.kod}). Laden Sie die unten erzeugte Datei hoch.` };
  if (o.html) return { ocena: 'blad', tekst: 'Unter /llms.txt liefert die Website HTML statt Text. Prüfen Sie, ob die Datei wirklich im Stammverzeichnis liegt.' };
  const kb = o.bajty ? `, ${o.wiecejNiz ? 'über ' : ''}${liczba(o.bajty / 1024, 'de', 1)} KB` : '';
  if (o.linki === 0) return { ocena: 'blad', tekst: `Vorhandene Datei /llms.txt: vorhanden (Code 200${kb}), enthält aber keinen einzigen Link zu Ihren Unterseiten im Format [Name](https://adresse). Ein Sprachmodell erfährt daraus nicht, welche Seiten wichtig sind. Ersetzen Sie sie durch die unten erzeugte Datei.` };
  const linki = typeof o.linki === 'number' ? `, Links zu Unterseiten: ${o.linki}` : '';
  return o.naglowekH1
    ? { ocena: 'ok', tekst: `Vorhandene Datei /llms.txt: vorhanden (Code 200${o.typ ? `, ${o.typ}` : ''}${kb}${linki}) und beginnt, wie die Spezifikation es verlangt, mit einer Überschrift mit dem Namen.` }
    : { ocena: 'uwaga', tekst: `Vorhandene Datei /llms.txt: vorhanden (Code 200${kb}), beginnt aber nicht mit der Überschrift „# Name“, die die Spezifikation als Pflicht ansieht.` };
}

function komorkaRobots(b, sprawdzone) {
  if (b.robots === 'niedostępny') return 'robots.txt nicht erreichbar';
  const zakres = b.zablokowaneAdresy > 0 && b.robots === 'dozwolony'
    ? `; sperrt ${b.zablokowaneAdresy} von ${sprawdzone} geprüften Adressen`
    : '';
  const regula = b.regula ? ` (${b.regula})` : '';
  return `${b.robots === 'zablokowany' ? 'Gesperrt' : 'Erlaubt'}${regula}${zakres}`;
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

export default function LlmsTxtClientDe({ hrefSprawdzarki = null, hrefAudytu = null }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null });
  const [skopiowano, setSkopiowano] = useState(false);
  const [skopiowanoSnippet, setSkopiowanoSnippet] = useState(false);
  const [pobrano, setPobrano] = useState(false);
  const [zKomentarzemZrodla, setZKomentarzemZrodla] = useState(true);
  const [adres, setAdres] = useState('');
  const [edycja, setEdycja] = useState({ model: null, zmieniony: false });
  const poleRef = useRef(null);

  // ?url= tylko wypełnia pole, bez startu (limit 10 sprawdzeń na IP).
  // Potwierdzenia znikają po 3 s (kopiowanie) i 2,5 s (pobranie); nie zależą od animationend.
  useEffect(() => {
    if (!skopiowano) return undefined;
    const t = setTimeout(() => setSkopiowano(false), 3000);
    return () => clearTimeout(t);
  }, [skopiowano]);
  useEffect(() => {
    if (!skopiowanoSnippet) return undefined;
    const t = setTimeout(() => setSkopiowanoSnippet(false), 3000);
    return () => clearTimeout(t);
  }, [skopiowanoSnippet]);
  useEffect(() => {
    if (!pobrano) return undefined;
    const t = setTimeout(() => setPobrano(false), 2500);
    return () => clearTimeout(t);
  }, [pobrano]);

  useParametrUrl(['url'], ({ url }) => {
    if (url && poleRef.current) poleRef.current.value = url;
  });

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const wpisany = String(fd.get('url') || '').trim();
    setStan({ status: 'loading', blad: null, wynik: null });
    setSkopiowano(false);
    setPobrano(false);
    setAdres(wpisany);
    zapiszParametry({ url: wpisany });
    track('narzedzie_start', { narzedzie: 'llms_txt' });
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wpisany, lang: 'de' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({ status: 'error', blad: data.error || 'Wir konnten die Website nicht prüfen. Bitte versuchen Sie es gleich noch einmal.', wynik: null });
        return;
      }
      track('narzedzie_wynik', { narzedzie: 'llms_txt' });
      track('llms_generate', {
        boty_zablokowane: data.boty.filter((b) => b.ocena === 'blad').length,
        adresy_w_pliku: data.wPliku,
        czesciowy: data.czesciowy ? 'tak' : 'nie',
      });
      setEdycja({ model: parsujLlmsTxt(data.llmsTxt), zmieniony: false });
      setStan({ status: 'done', blad: null, wynik: data });
    } catch {
      setStan({ status: 'error', blad: 'Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.', wynik: null });
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
  const urlNarzedzia = 'https://www.ai-seo-company.pl/de/tools/llms-txt-generator';
  const komentarzZrodla = `<!-- Erstellt mit dem kostenlosen llms.txt-Generator: ${urlNarzedzia} -->`;
  const plikBazowy = w ? (edycja.model && edycja.zmieniony ? zlozLlmsTxt(edycja.model, { nazwa: host(w.strona), sekcja: 'Seiten' }) : w.llmsTxt) : '';
  const plik = plikBazowy
    ? (zKomentarzemZrodla ? `${plikBazowy.trimEnd()}\n\n${komentarzZrodla}\n` : plikBazowy)
    : '';
  const docelowyLlmsUrl = (() => {
    if (!w?.strona) return '';
    try { return new URL('/llms.txt', w.strona).href; } catch { return `${w.strona.replace(/\/$/, '')}/llms.txt`; }
  })();
  const snippetTekst = w
    ? `<!-- Inhaltsverzeichnis für KI-Modelle (Spezifikation llmstxt.org) -->\n- [Datei llms.txt für KI-Modelle](${docelowyLlmsUrl}): strukturiertes Seitenverzeichnis (erstellt mit dem [llms.txt-Generator von AI SEO COMPANY](${urlNarzedzia})).`
    : '';
  async function kopiujSnippet() {
    if (!snippetTekst) return;
    try {
      await navigator.clipboard.writeText(snippetTekst);
      setSkopiowanoSnippet(true);
      track('llms_snippet_copy', { lang: 'de' });
    } catch {
      // brak dostepu do schowka
    }
  }
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
  const obecny = w ? opisObecnegoPliku(w.obecnyPlik) : null;
  // Z dużej mapy (albo indeksu map) bierzemy po kilka adresów z każdej mapy i sekcji, a nie pierwsze 50;
  // mapa.uciete = mapa większa, niż czytamy (liczba adresów to dolna granica).
  const mapaOpis = w && w.mapa.zrodlo
    ? `${w.mapa.uciete ? 'über ' : ''}${adressen(w.mapa.adresow)}${w.mapa.map > 1 ? ` in ${w.mapa.map} Sitemaps` : ''}${w.mapa.adresow > w.mapa.limit ? ` (wir wählen ${w.mapa.limit} aus, einige aus jedem Abschnitt)` : ''}`
    : '';
  const maOptional = Boolean(w) && /^## Optional$/m.test(plik);
  const maOpis = Boolean(w) && /^> \S/m.test(plik);

  return (
    <div className="llms-narz">
      <form onSubmit={onSubmit} style={{ ...s.karta, display: 'grid', gap: '1rem' }} aria-describedby="llms-opis-formularza">
        <div>
          <label htmlFor="llms-adres" style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' }}>Adresse Ihrer Website</label>
          <input ref={poleRef} id="llms-adres" name="url" type="text" inputMode="url" autoComplete="url" required {...WALID_DE} minLength={4} maxLength={300} placeholder="z. B. firma.de" className="c-pole" style={pole} />
          <PrzykladAdresu onWybierz={(a) => { if (poleRef.current) { poleRef.current.value = a; poleRef.current.focus(); } }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="llms_generate_submit">
            {stan.status === 'loading' ? `Sitemap und Bots werden geprüft… (bis zu ${GENERATOR.sekund} s)` : 'llms.txt erstellen'}
          </button>
          {stan.status === 'error' && <p role="alert" className="llms-wchodzi" style={{ margin: 0, color: '#b3261e' }}>{stan.blad}</p>}
        </div>
        <p id="llms-opis-formularza" style={{ ...s.przypis, margin: 0 }}>
          {`Die ganze Datei sofort, ohne E-Mail. Wir rufen Ihre Sitemap ab (bis zu ${GENERATOR.mapPodrzednych} untergeordnete Sitemaps), wählen bis zu ${GENERATOR.adresow} Adressen aus (bei einer größeren Sitemap einige aus jedem Abschnitt) und prüfen ${GENERATOR.botowAi} KI-Bots und Bingbot. Vor dem Download können Sie Links, Beschreibungen und Reihenfolge ändern. Wir speichern weder die Adresse noch das Ergebnis. Limit: ${GENERATOR.limitIp} Prüfungen pro Tag und IP-Adresse.`}
        </p>
      </form>

      <div aria-live="polite">
        {stan.status === 'done' && w && (
          <section aria-labelledby="llms-wynik" className={`${st.sekcja} ${st.sekcjaKarta} r-stan`} style={{ ...s.karta, marginTop: '1.5rem' }}>
            <h2 id="llms-wynik" style={s.h2}>Ergebnis für {host(w.strona)}</h2>
            <p style={s.akapit}>
              {w.mapa.zrodlo
                ? `Sitemap: ${mapaOpis}. In der Datei: ${w.wPliku}, übersprungen: ${w.pominietychRazem}.`
                : `Wir haben keine Sitemap gefunden (weder sitemap.xml noch einen Sitemap-Eintrag in der robots.txt), daher enthält die Datei nur die Startseite. In der Datei: ${w.wPliku}.`}
              {w.czesciowy && ` Das Limit von 20 Sekunden war vor dem Ende erreicht. Nicht mehr geprüft werden konnten: ${adressen(w.nieprzetworzone.length)} (Liste unten).`}
            </p>

            {obecny && (
              <p style={{ ...s.akapit, fontSize: '0.98rem' }}>
                <span style={{ fontWeight: 700, color: KOLOR[obecny.ocena] }}>{OCENA[obecny.ocena]}:</span> {obecny.tekst}
              </p>
            )}

            <h3 style={s.h3}>Zugriff von KI-Bots auf die Startseite</h3>
            <CompareTable
              id="llms-tabela-botow"
              caption={`KI-Bots und die Website ${host(w.strona)}`}
              columns={[
                { key: 'bot', label: 'Bot' },
                { key: 'robots', label: 'robots.txt' },
                { key: 'kod', label: 'HTTP-Code (Bot-UA)' },
                { key: 'wniosek', label: 'Fazit' },
              ]}
              rows={w.boty.map((b) => ({
                id: b.nazwa,
                bot: (
                  <>
                    {b.nazwa}
                    <span style={{ display: 'block', fontWeight: 400, fontSize: '0.85rem', color: 'var(--w-tusz-2)' }}>{b.firma}: {b.rola}</span>
                  </>
                ),
                robots: komorkaRobots(b, sprawdzone),
                kod: b.testHttp ? (b.kod ?? 'keine Antwort') : 'nicht zutreffend',
                wniosek: (
                  <>
                    <span style={{ fontWeight: 700, color: KOLOR[b.ocena] }}>{OCENA[b.ocena]}:</span> {b.wniosek}
                  </>
                ),
              }))}
              przypis="Der Zugriffstest ist ein Richtwert: Manche CDNs blockieren Anfragen mit dem GPTBot-UA, die nicht von IP-Adressen von OpenAI kommen."
            />

            <h3 style={s.h3}>Ihre Datei llms.txt</h3>
            <p style={{ ...s.akapit, fontSize: '0.95rem' }}>
              {`Sehen Sie die Datei durch, bevor Sie sie hochladen.${maOptional ? ' AGB und Richtlinien stehen im Abschnitt „## Optional“, den ein Modell überspringen darf, wenn der Platz knapp ist.' : ''} ${edycja.model ? 'Im Editor unten deaktivieren Sie' : 'Entfernen Sie'} Unterseiten ohne Wert für Kunden (Login, Tags), ${maOpis ? 'prüfen Sie den Satz unter der Überschrift dazu, was das Unternehmen tut' : 'ergänzen Sie unter der Überschrift einen Satz dazu, was das Unternehmen tut (im Format „> Ein Satz“)'}, und laden Sie die Datei als /llms.txt hoch.`}
            </p>
            {edycja.model && (
              <details id="llms-edytor" className="llms-edytor" style={{ border: '1px solid rgba(15,23,42,0.12)', borderRadius: '16px', padding: '0.85rem clamp(0.6rem, 2.5vw, 1rem)', margin: '0 0 1rem', background: 'var(--color-bg-surface)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--color-text-dark)', lineHeight: 1.45 }}>
                  Datei vor dem Download bearbeiten
                  <span style={{ display: 'block', fontWeight: 400, fontSize: '0.9rem', color: 'var(--w-tusz-2)' }}>
                    Deaktivieren Sie Zeilen, die nicht in die Datei sollen. Außerdem können Sie Name, Beschreibung, Titel, Reihenfolge und Abschnitte ändern und Links nach „Optional“ verschieben.
                  </span>
                </summary>
                <LlmsTxtEdytor model={edycja.model} onZmiana={zmienModel} de />
              </details>
            )}
            <textarea
              id="llms-wynik-plik"
              readOnly
              value={plik}
              rows={14}
              aria-label="Erzeugte Datei llms.txt"
              className="c-pole" style={{ ...pole, ...s.kod, resize: 'vertical', whiteSpace: 'pre', overflowX: 'auto' }}
            />
            {liczby && (
              <p role="status" key={`${liczby.wPliku}-${liczby.sekcji}-${liczby.odznaczone}`} className="llms-wchodzi" style={{ ...s.przypis, margin: '0.5rem 0 0' }}>
                {`Datei nach Ihren Änderungen: ${links(liczby.wPliku)} in ${liczby.sekcji} ${liczby.sekcji === 1 ? 'Abschnitt' : 'Abschnitten'}${liczby.odznaczone ? `, ${liczby.odznaczone} deaktiviert` : ''}.`}
              </p>
            )}
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.6rem', fontSize: '0.9rem', color: 'var(--w-tusz-2)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={zKomentarzemZrodla}
                onChange={(e) => { setZKomentarzemZrodla(e.target.checked); setSkopiowano(false); }}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <span>Dezenten Quellenhinweis am Dateiende anfügen (&lt;!-- ... --&gt;)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
              <button type="button" className="btn btn-primary" style={malyPrzycisk} onClick={kopiuj} data-cta="llms_copy">Kopieren</button>
              <button type="button" className="btn btn-secondary" style={malyPrzycisk} onClick={() => { pobierzPlik(plik); setPobrano(true); }} data-cta={edycja.zmieniony ? 'llms_download_edited' : 'llms_download'}>
                <svg className={pobrano ? 'llms-pobrano llms-pobrano-znak' : 'llms-pobrano-znak'} style={pobrano ? undefined : { visibility: 'hidden' }} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                llms.txt herunterladen
              </button>
              {edycja.zmieniony && <button type="button" className={st.przyciskTekstowy} onClick={przywroc}>Alle Änderungen zurücknehmen</button>}
              <span role="status" aria-live="polite">
                {skopiowano && (
                  <span className="r-stan--ok" style={{ color: '#047857', fontWeight: 600 }}>
                    <svg className="r-ok-znak" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Kopiert
                  </span>
                )}
              </span>
            </div>
            <LinkWyniku
              narzedzie="llms_txt"
              parametry={{ url: adres || w.strona }}
              podsumowanie={`Datei llms.txt und KI-Bot-Prüfung für ${host(w.strona)} (${liczby ? liczby.wPliku : w.wPliku} Links)`}
            />
            <div className={st.snippetKarta}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-text-dark)' }}>
                  Fertiges llms.txt-Snippet (für Projektdokumentation oder README)
                </strong>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button type="button" className={st.przyciskKopiujLink} onClick={kopiujSnippet} data-cta="llms_snippet_copy">
                    Snippet kopieren
                  </button>
                  {skopiowanoSnippet && (
                    <span className="r-stan--ok" role="status" aria-live="polite" style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 600 }}>
                      <svg className="r-ok-znak" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Snippet kopiert
                    </span>
                  )}
                </div>
              </div>
              <pre className={st.snippetKod}><code>{snippetTekst}</code></pre>
            </div>

            {w.pominiete.length > 0 && (
              <ListaAdresow
                id="llms-pominiete"
                tytul={`Übersprungene Adressen (${w.pominietychRazem})`}
                opis={w.pominietychRazem > w.pominiete.length ? `Wir zeigen die ersten ${w.pominiete.length}.` : null}
                elementy={w.pominiete}
              />
            )}
            {w.nieprzetworzone.length > 0 && (
              <ListaAdresow
                id="llms-nieprzetworzone"
                tytul={`Nicht rechtzeitig geprüft (${w.nieprzetworzone.length})`}
                opis="Die Website hat langsam geantwortet, und das Limit von 20 Sekunden war erreicht. Starten Sie den Generator erneut oder tragen Sie diese Adressen von Hand in die Datei ein."
                elementy={w.nieprzetworzone.map((url) => ({ url }))}
              />
            )}

            <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)', marginTop: '1.75rem', paddingTop: '1.25rem', display: 'grid', gap: '0.75rem' }}>
              <p style={{ ...s.akapit, margin: 0 }}>
                Die Bots haben Zugriff, und ChatGPT nennt Ihr Unternehmen trotzdem nicht? Über Empfehlungen entscheiden die Quellen, die das Modell nutzt, nicht die Datei selbst.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {hrefSprawdzarki && <Link href={hrefSprawdzarki} className="btn btn-primary" data-cta="llms_sprawdzarka">KI-Sichtbarkeit prüfen</Link>}
                {hrefAudytu && <Link href={hrefAudytu} className={hrefSprawdzarki ? 'btn btn-secondary' : 'btn btn-primary'} data-cta="llms_audyt">{`KI-Sichtbarkeit Audit: ${eur(CENY.audytAi.eur)} netto`}</Link>}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
