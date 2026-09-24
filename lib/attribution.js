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
    // Brak parametrów — nic nowego, ale zgoda mogła zostać wyrażona po
    // wejściu: dosyp ciasteczko z danych sesji, jeśli wolno.
    syncCookieFromSession();
    return;
  }
  const record = {
    ...ids,
    landing_path: window.location.pathname,
    first_seen: new Date().toISOString(),
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
  if (!s) return;
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
