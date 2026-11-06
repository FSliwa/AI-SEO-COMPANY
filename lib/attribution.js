// Atrybucja leada z Google Ads: identyfikator kliknięcia (gclid, a na iOS
// gbraid/wbraid) i parametry utm_* z adresu, pod którym użytkownik wszedł.
//
// Po co: formularz kontaktowy jest na każdej stronie, a klik z reklamy
// zwykle kończy się zgłoszeniem po kilku podstronach — nawigacja
// client-side gubi query string. Bez zapisania ID przy WEJŚCIU nie da się
// później wgrać do Google Ads konwersji offline („Lead zakwalifikowany”,
// „Klient pozyskany”) ani sprawdzić, które słowo kluczowe dało klienta.
// Tych danych nie da się dorobić wstecz.
//
// Dwa magazyny, świadomie:
// - sessionStorage ZAWSZE (dane techniczne sesji, bez profilowania — trwają
//   do zamknięcia karty), żeby zgłoszenie w tej samej wizycie miało ID;
// - ciasteczko first-party `aisc_attr` (90 dni, jak okno konwersji w Ads)
//   TYLKO po zgodzie marketingowej z banera (Consent Mode: ad_storage
//   granted). OSTATNIE kliknięcie wygrywa: Google rozlicza konwersję po
//   kliknięciu wskazanym przez gclid, więc do importu offline musi iść
//   najnowszy identyfikator. Wcześniej wygrywało pierwsze dotknięcie i lead
//   z drugiej wizyty niósł gclid sprzed nawet 90 dni — trafiał wtedy do złej
//   kampanii albo poza okno konwersji. Wejście BEZ identyfikatora kliknięcia
//   (newsletter, wpisanie adresu) nie kasuje zapamiętanego klika z reklamy.
//
// Nie czytamy _gcl_aw jako jedynego źródła: w EOG ad_storage jest domyślnie
// odrzucone, więc gtag tego ciasteczka często w ogóle nie zapisze.
//
// 5.11.2026 (PLAN-v2 rozdz. 7 i 9.3, ATR v2.2): wejście BEZ parametrów nie
// zostawiało żadnego zapisu, więc lead z Google organic, z ChatGPT bez UTM
// albo z wpisania adresu miał w arkuszu pusty landing_path. Teraz pierwsza
// odsłona sesji zapisuje { landing_path, first_seen, first_referrer_host }
// także bez parametrów (tylko sessionStorage: ciasteczko dalej dostaje
// wyłącznie wejścia z gclid/utm_*, czyli to, czego potrzebuje import Ads).
// Kanał leada liczy kanalLeada() niżej (używa go app/api/contact/route.js).

const COOKIE = 'aisc_attr';
const SESSION_KEY = 'aisc_attr';
const MAX_AGE = 90 * 24 * 60 * 60;
const KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function clean(v) {
  return String(v || '').replace(/[^\w.\-:%+ ]/g, '').slice(0, 200);
}

/** Identyfikator kliknięcia z Ads: gclid, a na iOS gbraid/wbraid. */
function clickId(r) {
  return (r && (r.gclid || r.gbraid || r.wbraid)) || '';
}

/** Czy zapis niesie parametry wejścia (gclid/gbraid/wbraid albo utm_*). */
function hasParams(r) {
  return !!r && KEYS.some((k) => r[k]);
}

// ATR v2.2 (2): sama domena odsyłacza, bez ścieżki i zapytania (w ścieżce
// bywają dane z wyszukiwarki albo czatu). Odsyłacz z naszej domeny (odświeżenie,
// nowa karta z linku wewnętrznego) traktujemy jak brak - to nie jest źródło wejścia.
function referrerHost() {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname.toLowerCase();
    const bezWww = (h) => h.replace(/^www\./, '');
    if (!host || bezWww(host) === bezWww(window.location.hostname.toLowerCase())) return '';
    return clean(host);
  } catch (e) { return ''; }
}

function readCookie() {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]*)'));
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch (e) { return null; }
}

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function writeCookie(data) {
  try {
    document.cookie = COOKIE + '=' + encodeURIComponent(JSON.stringify(data)) +
      '; Max-Age=' + MAX_AGE + '; Path=/; SameSite=Lax; Secure';
  } catch (e) {}
}

function marketingConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem('cookiesConsentState') || 'null');
    return !!(saved && saved.marketing);
  } catch (e) { return false; }
}

/** Wywoływane przy każdym wejściu na stronę (AttributionCapture.jsx). */
// Stan zgody marketingowej przy leadzie: 'granted' | 'denied' | 'unknown'
// (baner bez decyzji). Import konwersji offline z EOG musi nieść zgodę
// zgodną ze stanem faktycznym (ad_user_data), więc arkusz ją zapisuje.
export function consentMarketing() {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const saved = JSON.parse(localStorage.getItem('cookiesConsentState') || 'null');
    return saved ? (saved.marketing ? 'granted' : 'denied') : 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const ids = {};
  KEYS.forEach((k) => { const v = params.get(k); if (v) ids[k] = clean(v); });
  if (!Object.keys(ids).length) {
    // ATR v2.2 (1): pierwsza odsłona sesji (brak aisc_attr w sessionStorage)
    // zapisuje landing i odsyłacz także bez parametrów. Kolejne odsłony i
    // nawigacja wewnętrzna niczego nie nadpisują, więc gclid z wcześniejszego
    // wejścia w tej karcie zostaje (test e w PLAN-v2 rozdz. 7).
    if (!readSession()) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
          landing_path: window.location.pathname,
          first_seen: new Date().toISOString(),
          first_referrer_host: referrerHost(),
        }));
      } catch (e) {}
    }
    // Brak parametrów — nic nowego, ale zgoda mogła zostać wyrażona po
    // wejściu: dosyp ciasteczko z danych sesji, jeśli wolno.
    syncCookieFromSession();
    return;
  }
  const record = {
    ...ids,
    landing_path: window.location.pathname,
    first_seen: new Date().toISOString(),
    first_referrer_host: referrerHost(),
  };
  // Sesja: wejście bez identyfikatora kliknięcia (np. z newslettera) nie może
  // wymazać gclid z wcześniejszego kliknięcia w tej samej karcie.
  const prevSession = readSession();
  if (clickId(record) || !clickId(prevSession)) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(record)); } catch (e) {}
  }
  // Ciasteczko: ostatnie kliknięcie wygrywa (patrz komentarz na górze pliku).
  if (marketingConsent()) {
    const prevCookie = readCookie();
    if (!prevCookie || clickId(record) || !clickId(prevCookie)) writeCookie(record);
  }
}

/** Po zgodzie marketingowej (CookiesBanner) — przenieś sesję do ciasteczka. */
export function syncCookieFromSession() {
  if (typeof window === 'undefined' || !marketingConsent()) return;
  const s = readSession();
  // ATR v2.2: zapis sesji bez parametrów nie trafia do ciasteczka 90-dniowego -
  // inaczej pierwsza wizyta „direct” przykrywałaby przez 90 dni każde późniejsze
  // wejście (readAttribution czyta ciasteczko przed sesją).
  if (!s || !hasParams(s)) return;
  const c = readCookie();
  // Zgoda przychodzi po wejściu, więc sesja może nieść nowszy klik niż
  // ciasteczko zapisane przy poprzedniej wizycie.
  if (!c || (clickId(s) && clickId(s) !== clickId(c))) writeCookie(s);
}

/** Do payloadu formularza: ciasteczko (ostatnie kliknięcie) przed sesją. */
export function readAttribution() {
  if (typeof window === 'undefined') return {};
  return readCookie() || readSession() || {};
}

export const ATTRIBUTION_KEYS = KEYS;

/**
 * Pola atrybucji do POST /api/contact z formularza innego niż Contact.jsx
 * (tryb zapasowy sprawdzarki AI, A3b). Ten sam zestaw kluczy co w Contact.jsx,
 * żeby wiersz w arkuszu miał kanał i landing także przy tym zgłoszeniu.
 */
export function polaAtrybucji() {
  if (typeof window === 'undefined') return {};
  const a = readAttribution();
  const pola = { page_path: window.location.pathname, consent_marketing: consentMarketing() };
  [...KEYS, 'landing_path', 'first_seen', 'first_referrer_host'].forEach((k) => { pola[k] = a[k] || ''; });
  return pola;
}

// --- Kanał leada (ATR v2.2, PLAN-v2 9.3; kolejność obowiązująca) ------------
// Google Ads → Profil Firmy (Mapy) → AI → inne utm → organic → referral → direct.
// AI przed „utm”, bo ChatGPT dokleja utm_source=openai do cytowanych linków
// (48 × w dane/llm.json, 93 × w skille/ai-visibility/surowe/, pomiar 4–5.11.2026);
// Profil Firmy przed AI i organic, bo link z wizytówki niesie
// utm_source=google&utm_medium=organic&utm_campaign=gbp (PLAN-v2 6.26).
// Te same listy mają trafić do własnej grupy kanałów GA4 (Filip) i do panelu.
const AI_UTM_SOURCE = ['openai', 'chatgpt.com', 'chatgpt', 'perplexity', 'perplexity.ai', 'gemini', 'copilot'];
const AI_REFERRER_HOST = ['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'www.perplexity.ai', 'gemini.google.com', 'copilot.microsoft.com'];
// Wyszukiwarki z planu: google.* (także aplikacja Google na Androidzie, której
// odsyłacz android-app://com.google.android.googlequicksearchbox/ daje taki host),
// bing.com i duckduckgo.com z subdomenami.
const WYSZUKIWARKI = [
  /^(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?$/,
  /^com\.google\.android\.googlequicksearchbox$/,
  /(^|\.)bing\.com$/,
  /(^|\.)duckduckgo\.com$/,
];

export const KANAL = {
  ads: 'Google Ads',
  gbp: 'Profil Firmy (Mapy)',
  ai: 'AI',
  organic: 'organic',
  referral: 'referral',
  direct: 'direct',
};

/** Kanał leada z pól atrybucji (po stronie serwera, app/api/contact/route.js). */
export function kanalLeada(a = {}) {
  const v = (k) => String(a[k] || '').trim().toLowerCase();
  if (v('gclid') || v('gbraid') || v('wbraid')) return KANAL.ads;
  if (v('utm_campaign') === 'gbp') return KANAL.gbp;
  const host = v('first_referrer_host');
  if (AI_UTM_SOURCE.includes(v('utm_source')) || AI_REFERRER_HOST.includes(host)) return KANAL.ai;
  if (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].some((k) => v(k))) {
    return `utm: ${String(a.utm_source || '')}/${String(a.utm_medium || '')}`;
  }
  if (host) return WYSZUKIWARKI.some((re) => re.test(host)) ? KANAL.organic : KANAL.referral;
  return KANAL.direct;
}

// --- „Skąd o nas wiesz?” (ATR v2.2 pkt 4) -----------------------------------
// Opcjonalne pole wyboru w Contact.jsx: deklaracja klienta obok kanału
// technicznego (raport 9.3 pokazuje oba). Bez danych osobowych. Do arkusza
// idzie kod (kolumna skad_o_nas_wiesz), do maila etykieta PL.
export const SKAD_O_NAS_WIESZ = [
  { kod: 'czat_ai', pl: 'ChatGPT lub inny czat AI', en: 'ChatGPT or another AI chat' },
  { kod: 'mapy_google', pl: 'Mapy Google', en: 'Google Maps' },
  { kod: 'wyszukiwarka_google', pl: 'wyszukiwarka Google', en: 'Google Search' },
  { kod: 'polecenie', pl: 'polecenie', en: 'Recommendation' },
  { kod: 'inne', pl: 'inne', en: 'Other' },
];
