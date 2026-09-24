/**
 * Arkusz leadów dla app/api/contact/route.js (zmienna LEADS_WEBHOOK_URL).
 *
 * Po co: dziś jedynym zapisem leada jest mail z Resend. Arkusz daje trwały
 * rejestr (także zgłoszeń odrzuconych przez filtr antyspamowy, ze statusem
 * `rejected:<powód>`) i gotowe kolumny pod import konwersji offline
 * „Lead zakwalifikowany” w Google Ads (Google Click ID + czas + wartość).
 *
 * Wdrożenie (raz, ok. 10 min):
 *  1. Google Sheets → nowy arkusz „Leady PL-Search”.
 *  2. Rozszerzenia → Apps Script → wklej ten plik w miejsce Code.gs → Zapisz.
 *  3. Ustawienia projektu (ikona zębatki) → Właściwości skryptu → dodaj
 *     WEBHOOK_KEY = długi losowy ciąg z samych liter i cyfr
 *     (np. wynik `openssl rand -hex 24`).
 *  4. Wdróż → Nowe wdrożenie → typ: Aplikacja internetowa;
 *     Wykonaj jako: Ja; Kto ma dostęp: Każdy → Wdróż → autoryzuj dostęp.
 *  5. Skopiuj URL aplikacji (…/exec) i w Vercel → Settings → Environment
 *     Variables dodaj dla Production:
 *       LEADS_WEBHOOK_URL = <URL aplikacji>?key=<WEBHOOK_KEY>
 *     potem Redeploy.
 *  Po każdej zmianie tego kodu: Wdróż → Zarządzaj wdrożeniami → edytuj →
 *  Wersja: nowa. Samo zapisanie pliku nie zmienia działającej aplikacji.
 *
 * Kolumny „kwalifikacja” i „wartość_zł” wypełniasz ręcznie; z wierszy
 * z kwalifikacją „tak” i niepustym gclid robi się plik importu do Ads.
 */

const SHEET_NAME = 'Leady';
const HEADERS = [
  'received_at', 'status', 'lead_id', 'submitted_at', 'name', 'email', 'service', 'message',
  'gclid', 'gbraid', 'wbraid', 'landing_path', 'page_path', 'first_seen',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'elapsed_ms',
  'consent_marketing', 'kwalifikacja', 'wartość_zł',
];

function doPost(e) {
  // route.js uznaje lead za zapisany tylko przy {ok:true}. Apps Script zawsze
  // odpowiada HTTP 200, więc każdy błąd musi wrócić w treści odpowiedzi.
  let lock = null;
  try {
    const key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
    if (!key || !e || !e.parameter || e.parameter.key !== key) {
      return json_({ ok: false, error: 'bad_key' });
    }
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const row = HEADERS.map((h) => {
      if (h === 'received_at') return new Date();
      const v = data[h] === undefined || data[h] === null ? '' : String(data[h]);
      // Tekst zaczynający się od = + - @ arkusz potraktowałby jak formułę.
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err).slice(0, 200) });
  } finally {
    if (lock) {
      try { lock.releaseLock(); } catch (e2) {}
    }
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
