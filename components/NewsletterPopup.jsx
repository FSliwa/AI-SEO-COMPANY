'use client';

// Popup z lead magnetem dopasowanym do treści (12.11.2026). Ładuje go wyłącznie
// components/NewsletterPopupLoader.jsx (dynamiczny import po wyzwoleniu), więc ten kod nigdy nie
// trafia do HTML z serwera. Oferty, strony i teksty: lib/popupOferty.js.
//
// Tryby:
//   okno    - desktop: modalny <dialog> (top layer, tło nieaktywne), pułapka fokusu, Esc zamyka,
//             aria-labelledby, przycisk zamknięcia 44 px; fokus wraca tam, gdzie był.
//   telefon - wysuwany pasek u dołu (najwyżej 25% wysokości ekranu, bez przesunięcia układu,
//             nie zabiera fokusu); „Wyślij mi PDF” rozwija formularz w modalny arkusz (nie na
//             cały ekran). Esc i przycisk zamykają.
//
// Formularz = ten sam wzorzec prawny co bramki: e-mail (wymagany) do wysłania PDF, wymagana zgoda
// na wysłanie (tekst 1:1 z components/ChecklistForm.jsx, przedmiot „szablon”), osobny NIEzaznaczony
// checkbox newslettera z tekstem ZGODA_NEWSLETTER_SZABLON (wariant dla szablonów: lib/zgodyNarzedzi.js = panel lib/newsletter.ts,
// double opt-in: link potwierdzenia przychodzi w mailu z PDF) i pole-pułapka `nick`.
// PDF wysyła panel: POST /api/szablony { plik, email, consent, nick, lang?, newsletter, zrodlo }.
//
// GA4 (lib/track.js): popup_view, popup_close, popup_submit z parametrami oferta, strona, jezyk;
// po udanym wysłaniu generate_lead jak w ChecklistForm (event_category 'Popup', plan popup_<oferta>).
// Oferty-linki (CTA do narzędzia): kliknięcie = popup_submit z typ: 'link' i przerwa 14 dni.

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/track';
import { zapiszDecyzje } from '@/lib/popupOferty';
import { tekstyOferty } from '@/lib/popupTeksty';
import { ZGODA_NEWSLETTER_SZABLON, ZGODA_NEWSLETTER_SZABLON_EN } from '@/lib/zgodyNarzedzi';

const API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/szablony`;

const T = {
  pl: {
    kickerSzablon: 'Darmowy szablon PDF',
    kickerLink: 'Darmowe narzędzie',
    etykieta: 'E-mail, na który wyślemy PDF',
    placeholder: 'ty@firma.pl',
    przycisk: 'Wyślij mi PDF',
    loading: 'Wysyłam…',
    zamknij: 'Zamknij',
    obietnica: 'Newsletter: co 2 tygodnie jedna zmiana w Google lub AI i jeden szablon.',
    przedmiot: 'szablon',
    zgoda: (przedmiot) => `Zgadzam się na przetwarzanie adresu e-mail przez AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa), żeby wysłać ${przedmiot} i odpowiedzieć na moje pytania. Nie zapisujemy Cię na listę mailingową. Szczegóły w `,
    polityka: 'polityce prywatności',
    polityka_href: '/cookies',
    ok: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do PDF przyjdzie w ciągu minuty.',
    okNewsletter: ' Zapis do newslettera potwierdzisz przyciskiem w tym samym e-mailu.',
    okNewsletterJest: ' Ten adres jest już zapisany na newsletter.',
    blad: 'Nie udało się wysłać. Spróbuj za chwilę.',
    brakPolaczenia: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
  },
  en: {
    kickerSzablon: 'Free PDF template',
    kickerLink: 'Free tool',
    etykieta: 'Email address to send the PDF to',
    placeholder: 'you@company.com',
    przycisk: 'Send me the PDF',
    loading: 'Sending…',
    zamknij: 'Close',
    obietnica: 'Newsletter: every 2 weeks, one change in Google or AI search and one template.',
    przedmiot: 'the template',
    zgoda: (przedmiot) => `I agree to AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warsaw, Poland) processing my email address to send ${przedmiot} and to answer my questions. You will not be added to a mailing list. Details in the `,
    polityka: 'privacy policy',
    polityka_href: '/en/cookies',
    ok: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the PDF will arrive within a minute.',
    okNewsletter: ' Confirm your newsletter subscription with the button in the same email.',
    okNewsletterJest: ' This address is already subscribed to the newsletter.',
    blad: 'Sending failed. Please try again in a moment.',
    brakPolaczenia: 'No connection. Check your internet and try again.',
  },
};

const FOKUSOWALNE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

const CSS = `
.nlp-okno{position:fixed;inset:0;margin:auto;height:fit-content;border:0;padding:0;background:transparent;width:min(460px,calc(100vw - 32px));max-width:none;max-height:calc(100dvh - 32px);overflow:visible;color:var(--w-tusz,#1E1E1E)}
.nlp-okno::backdrop{background:rgba(10,19,55,.45)}
.nlp-okno[open]{animation:nlp-pojaw .28s cubic-bezier(.16,1,.3,1)}
.nlp-arkusz{margin:auto auto 0;width:100%;max-width:560px;max-height:88dvh}
.nlp-arkusz[open]{animation:nlp-wjazd .28s cubic-bezier(.16,1,.3,1)}
.nlp-karta{position:relative;background:var(--w-karta,#FFFCF8);border-radius:24px;padding:28px 24px 24px;box-shadow:0 24px 60px rgba(10,19,55,.25);max-height:calc(100dvh - 32px);overflow:auto;box-sizing:border-box}
.nlp-arkusz .nlp-karta{border-radius:24px 24px 0 0;max-height:88dvh;padding:24px 16px calc(20px + env(safe-area-inset-bottom))}
.nlp-zamknij{position:absolute;top:8px;right:8px;width:44px;height:44px;border-radius:999px;border:0;background:transparent;font-size:26px;line-height:1;cursor:pointer;color:inherit;display:grid;place-items:center;padding:0}
.nlp-zamknij:hover{background:rgba(30,30,30,.07)}
.nlp-zamknij:focus-visible{outline:2px solid var(--w-pomarancz-hover,#C24A22);outline-offset:2px}
.nlp-kicker{margin:0 44px 6px 0;font-size:.78rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--w-pomarancz-hover,#C24A22)}
.nlp-tytul{margin:0 40px 10px 0;font-size:1.3rem;line-height:1.25;font-weight:700;letter-spacing:-.01em}
.nlp-korzysc{margin:0 0 16px;line-height:1.5;font-size:.98rem}
.nlp-form{display:grid;gap:12px}
.nlp-etykieta{font-weight:600}
.nlp-pole{width:100%;box-sizing:border-box;padding:.75rem 1rem;border-radius:14px;border:1px solid rgba(15,23,42,.22);font-size:1rem;background:#fff;color:var(--w-tusz,#1E1E1E)}
.nlp-zgoda{display:flex;gap:.6rem;align-items:flex-start;font-size:.8rem;line-height:1.45}
.nlp-zgoda input{margin-top:.15rem;width:18px;height:18px;flex-shrink:0}
.nlp-zgoda a{text-decoration:underline;color:inherit}
.nlp-obietnica{margin:2px 0 -4px;font-size:.86rem;font-weight:600}
.nlp-pulapka{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.nlp-wyslij{width:100%;justify-content:center}
.nlp-blad{margin:0;color:#b3261e}
.nlp-ok{margin:0;font-weight:600;color:#047857;line-height:1.5}
.nlp-pasek{position:fixed;left:8px;right:8px;bottom:8px;margin-inline:auto;max-width:560px;z-index:2147483000;max-height:25vh;overflow:auto;box-sizing:border-box;background:var(--w-karta,#FFFCF8);color:var(--w-tusz,#1E1E1E);border:1px solid var(--w-linia,rgba(30,30,30,.12));border-radius:18px;box-shadow:0 -6px 28px rgba(10,19,55,.18);padding:10px 8px calc(10px + env(safe-area-inset-bottom)) 14px;animation:nlp-wjazd .28s cubic-bezier(.16,1,.3,1)}
.nlp-pasek .nlp-zamknij{top:2px;right:2px}
.nlp-pasek .nlp-kicker{margin:0 44px 2px 0;font-size:.7rem}
.nlp-pasek .nlp-tytul{font-size:.98rem;margin:0 44px 8px 0;line-height:1.3}
.nlp-pasek .btn{width:calc(100% - 6px);justify-content:center;min-height:44px;padding-top:.55rem;padding-bottom:.55rem}
body.has-nlp-pasek .kota-floating-cta{transform:translateY(calc(-1 * var(--nlp-pasek-h, 140px) - 4px))}
@media (max-height: 500px){.nlp-pasek{padding-top:6px}.nlp-pasek .nlp-kicker{display:none}.nlp-pasek .nlp-tytul{margin-bottom:6px}}
@keyframes nlp-wjazd{from{transform:translateY(110%)}to{transform:none}}
@keyframes nlp-pojaw{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.nlp-pasek,.nlp-okno[open],.nlp-arkusz[open]{animation:none}}
`;

function widoczneFokusowalne(kontener) {
  return [...kontener.querySelectorAll(FOKUSOWALNE)].filter((el) => el.getClientRects().length > 0);
}

function Formularz({ oferta, t, params, idPola, poleRef, onWyslano }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null, newsletter: false });
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newsletter = fd.get('newsletter') === 'on';
    setStan({ status: 'loading', blad: null, newsletter });
    track('popup_submit', params);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          plik: oferta.plik,
          email: String(fd.get('email') || ''),
          consent: fd.get('consent') === 'on',
          nick: String(fd.get('nick') || ''),
          newsletter,
          zrodlo: `popup:${oferta.id}`,
          ...(oferta.lang === 'en' ? { lang: 'en' } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return setStan({ status: 'error', blad: data.error || t.blad, newsletter });
      zapiszDecyzje('wyslano');
      track('generate_lead', { event_category: 'Popup', plan: `popup_${oferta.id}`, currency: 'PLN', value: 100 });
      // Komunikat o newsletterze wg odpowiedzi panelu ('pending' | 'confirmed' | null), nie wg checkboxa:
      // panel bez tej zmiany (albo z błędem zapisu) wyśle sam PDF i nie obiecujemy linku potwierdzenia.
      setStan({ status: 'done', blad: null, newsletter: newsletter ? (data.newsletter ?? null) : null });
      onWyslano();
    } catch {
      setStan({ status: 'error', blad: t.brakPolaczenia, newsletter });
    }
  }
  if (stan.status === 'done')
    return (
      <p role="status" className="nlp-ok">
        {t.ok}
        {stan.newsletter === 'pending' ? t.okNewsletter : stan.newsletter === 'confirmed' ? t.okNewsletterJest : ''}
      </p>
    );
  return (
    <form className="nlp-form" onSubmit={onSubmit}>
      <label htmlFor={idPola} className="nlp-etykieta">{t.etykieta}</label>
      <input ref={poleRef} id={idPola} name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" placeholder={t.placeholder} className="nlp-pole" />
      {/* Pole-pułapka dla botów: ukryte dla ludzi i czytników ekranu. */}
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="nlp-pulapka" />
      <label className="nlp-zgoda">
        <input type="checkbox" name="consent" required />
        <span>
          {t.zgoda(t.przedmiot)}
          <Link href={t.polityka_href}>{t.polityka}</Link>.
        </span>
      </label>
      <p className="nlp-obietnica">{t.obietnica}</p>
      <label className="nlp-zgoda">
        <input type="checkbox" name="newsletter" />
        <span>{(oferta.lang === 'en' ? ZGODA_NEWSLETTER_SZABLON_EN : ZGODA_NEWSLETTER_SZABLON).tekst}</span>
      </label>
      <button type="submit" className="btn btn-primary nlp-wyslij" disabled={stan.status === 'loading'} data-cta={`popup_${oferta.id}`}>
        {stan.status === 'loading' ? t.loading : t.przycisk}
      </button>
      {stan.status === 'error' && <p role="alert" className="nlp-blad">{stan.blad}</p>}
    </form>
  );
}

function Tresc({ oferta, t, params, idTytul, idPola, poleRef, celRef, onLink, onWyslano }) {
  return (
    <>
      <p className="nlp-kicker">{oferta.typ === 'link' ? t.kickerLink : t.kickerSzablon}</p>
      <h2 id={idTytul} className="nlp-tytul">{oferta.naglowek}</h2>
      <p className="nlp-korzysc">{oferta.korzysc}</p>
      {oferta.typ === 'link' ? (
        <Link ref={celRef} href={oferta.href} className="btn btn-primary nlp-wyslij" data-cta={`popup_${oferta.id}`} onClick={onLink}>
          {oferta.przycisk}
        </Link>
      ) : (
        <Formularz oferta={oferta} t={t} params={params} idPola={idPola} poleRef={poleRef} onWyslano={onWyslano} />
      )}
    </>
  );
}

export default function NewsletterPopup({ oferta: mapa, tryb, onKoniec }) {
  // Mapa (id, typ, język, wyzwalacze) z lib/popupOferty.js + teksty z lib/popupTeksty.js.
  const [oferta] = useState(() => ({ ...mapa, ...tekstyOferty(mapa) }));
  const t = T[oferta.lang] ?? T.pl;
  const id = useId();
  const idTytul = `nlp-tytul-${id}`;
  const idPola = `nlp-email-${id}`;
  const [rozwiniety, setRozwiniety] = useState(tryb === 'okno');
  const dialogRef = useRef(null);
  const poleRef = useRef(null);
  const celRef = useRef(null);
  const zamknijRef = useRef(null);
  const wyslanoRef = useRef(false);
  const zamknietoRef = useRef(false);
  const sposobRef = useRef(null);
  const poprzedniFokusRef = useRef(null);
  const [params] = useState(() => ({ oferta: oferta.id, strona: window.location.pathname, jezyk: oferta.lang }));

  // Jedno popup_view na pokazanie (ref chroni też przed podwójnym efektem w dev StrictMode).
  const widokRef = useRef(false);
  useEffect(() => {
    if (widokRef.current) return;
    widokRef.current = true;
    track('popup_view', { ...params, tryb });
  }, [params, tryb]);

  // Modalne okno / arkusz: showModal po zamontowaniu, fokus na polu e-mail (albo CTA), powrót fokusu.
  useEffect(() => {
    if (!rozwiniety) return undefined;
    const d = dialogRef.current;
    if (!d) return undefined;
    if (!poprzedniFokusRef.current) poprzedniFokusRef.current = document.activeElement;
    if (!d.open) d.showModal();
    (poleRef.current || celRef.current)?.focus();
    // Bez d.close() w sprzątaniu: zdarzenie close oznaczałoby decyzję użytkownika (onClose), a przy
    // odmontowaniu element znika z DOM i sam wychodzi z top layer (w dev StrictMode efekt i sprzątanie
    // biegną dwa razy, więc close() zamykało popup od razu).
    return () => {
      const p = poprzedniFokusRef.current;
      if (p && typeof p.focus === 'function' && document.contains(p)) p.focus();
    };
  }, [rozwiniety]);

  // Weryfikacja 12.11.2026: pasek zakrywał pływający przycisk „Wyceń projekt” (.kota-floating-cta,
  // prawy dolny róg; na telefonie poziomo przecinał go w połowie). Na czas paska przycisk jedzie nad
  // pasek, jak przy banerze cookies, ale przez transform, więc bez przesunięcia układu (CLS).
  const pasekRef = useRef(null);
  useEffect(() => {
    const el = pasekRef.current;
    if (rozwiniety || !el) return undefined;
    const body = document.body;
    const ustaw = () => body.style.setProperty('--nlp-pasek-h', `${Math.round(el.getBoundingClientRect().height)}px`);
    ustaw();
    body.classList.add('has-nlp-pasek');
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(ustaw) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      body.classList.remove('has-nlp-pasek');
      body.style.removeProperty('--nlp-pasek-h');
    };
  }, [rozwiniety]);

  // Pasek na telefonie nie zabiera fokusu, ale Esc też go zamyka.
  useEffect(() => {
    if (rozwiniety) return undefined;
    const naKlawisz = (e) => {
      if (e.key === 'Escape') zamknij('esc');
    };
    document.addEventListener('keydown', naKlawisz);
    return () => document.removeEventListener('keydown', naKlawisz);
  });

  // Jedno zamknięcie na popup (przycisk, Esc, tło albo natywne zamknięcie <dialog>, które Chrome
  // wykonuje przy Esc bez wcześniejszej interakcji ze stroną - wtedy cancel nie da się anulować).
  function zamknij(sposob) {
    if (zamknietoRef.current) return;
    zamknietoRef.current = true;
    if (!wyslanoRef.current) {
      zapiszDecyzje('zamknieto');
      track('popup_close', { ...params, sposob });
    }
    onKoniec();
  }

  function onLink() {
    zamknietoRef.current = true;
    zapiszDecyzje('zamknieto');
    track('popup_submit', { ...params, typ: 'link' });
    wyslanoRef.current = true;
    onKoniec();
  }

  function naKlawiszOkna(e) {
    if (e.key !== 'Tab') return;
    const el = widoczneFokusowalne(dialogRef.current);
    if (!el.length) return;
    const pierwszy = el[0];
    const ostatni = el[el.length - 1];
    if (e.shiftKey && document.activeElement === pierwszy) {
      e.preventDefault();
      ostatni.focus();
    } else if (!e.shiftKey && document.activeElement === ostatni) {
      e.preventDefault();
      pierwszy.focus();
    }
  }

  const przyciskZamknij = (
    <button ref={zamknijRef} type="button" className="nlp-zamknij" aria-label={t.zamknij} onClick={() => zamknij('przycisk')}>
      <span aria-hidden="true">×</span>
    </button>
  );
  const tresc = (
    <Tresc
      oferta={oferta}
      t={t}
      params={params}
      idTytul={idTytul}
      idPola={idPola}
      poleRef={poleRef}
      celRef={celRef}
      onLink={onLink}
      onWyslano={() => {
        wyslanoRef.current = true;
        // Formularz znika (zostaje komunikat), więc fokus przechodzi na przycisk zamknięcia.
        window.setTimeout(() => zamknijRef.current?.focus(), 0);
      }}
    />
  );

  if (!rozwiniety)
    return (
      <div ref={pasekRef} className="nlp-pasek" role="dialog" aria-modal="false" aria-labelledby={idTytul} data-popup={oferta.id}>
        <style>{CSS}</style>
        {przyciskZamknij}
        <p className="nlp-kicker">{oferta.typ === 'link' ? t.kickerLink : t.kickerSzablon}</p>
        <p id={idTytul} className="nlp-tytul">{oferta.naglowek}</p>
        {oferta.typ === 'link' ? (
          <Link href={oferta.href} className="btn btn-primary" data-cta={`popup_${oferta.id}`} onClick={onLink}>
            {oferta.przycisk}
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setRozwiniety(true)}>
            {t.przycisk}
          </button>
        )}
      </div>
    );

  return (
    <dialog
      ref={dialogRef}
      className={tryb === 'telefon' ? 'nlp-okno nlp-arkusz' : 'nlp-okno'}
      aria-labelledby={idTytul}
      data-popup={oferta.id}
      onCancel={() => {
        sposobRef.current = 'esc';
      }}
      onClose={() => zamknij(sposobRef.current || 'esc')}
      onClick={(e) => {
        if (e.target === dialogRef.current) zamknij('tlo');
      }}
      onKeyDown={naKlawiszOkna}
    >
      <style>{CSS}</style>
      <div className="nlp-karta">
        {przyciskZamknij}
        {tresc}
      </div>
    </dialog>
  );
}
