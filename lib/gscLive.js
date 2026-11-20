import { Pool } from 'pg';
import { OAuth2Client } from 'google-auth-library';
import { createDecipheriv } from 'node:crypto';

export const GSC_SITES = [
  { id: 'staniax', name: 'STANIAX', url: 'sc-domain:staniax.pl' },
  { id: 'madamethai', name: 'MADAME THAI', url: 'sc-domain:madamethai.pl' },
  { id: 'tql', name: 'TQL', url: 'sc-domain:tql.pl' },
  { id: 'ase-bot', name: 'ASE-BOT', url: 'sc-domain:ase-bot.live' },
  { id: 'stefbud', name: 'STEF-BUD', url: 'sc-domain:stefbud.com' },
];

function decrypt(enc, keyB64) {
  const [v, iv, tag, body] = enc.split('.');
  if (v !== 'v1' || !iv || !tag || !body) throw new Error('Nieznany format zaszyfrowanej wartości');
  const k = Buffer.from(keyB64, 'base64');
  const d = createDecipheriv('aes-256-gcm', k, Buffer.from(iv, 'base64url'));
  d.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([d.update(Buffer.from(body, 'base64url')), d.final()]).toString('utf8');
}

// Wczorajsza pełna doba w strefie Google Search Console (America/Los_Angeles).
// Widok „3 miesiące” w panelu GSC kończy się zawsze na ostatnim pełnym dniu PT
// (niepełny dzień bieżący jest wyłącznie pod osobnym filtrem „24 godziny”).
function wczorajPacyficzne() {
  const dzisiajPt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const [y, m, d] = dzisiajPt.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

// Dokładny wzór zakresu „3 miesiące” z panelu Google Search Console:
// endDate minus 3 miesiące kalendarzowe + 1 dzień (np. 2026-08-21 -> 2026-05-22,
// 2026-11-19 -> 2026-08-20). Zweryfikowane 1:1 ze zrzutami panelu GSC co do kliknięcia i 0,1% CTR.
function poczatekTrzechMiesiecyGsc(koniecIso) {
  const [y, m, d] = koniecIso.split('-').map(Number);
  const celMies = m - 1 - 3;
  const ostDzienMies = new Date(Date.UTC(y, celMies + 1, 0)).getUTCDate();
  const baza = new Date(Date.UTC(y, celMies, Math.min(d, ostDzienMies)));
  return new Date(baza.getTime() + 86400000).toISOString().slice(0, 10);
}

export async function fetchLiveGscData() {
  const dbUrl = process.env.DATABASE_URL;
  const encKey = process.env.ENCRYPTION_KEY;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!dbUrl || !encKey || !clientId || !clientSecret) {
    throw new Error('Brak wymaganych zmiennych środowiskowych do połączenia z GSC');
  }

  const pool = new Pool({ connectionString: dbUrl, connectionTimeoutMillis: 5000 });
  let refreshToken;
  let googleEmail;
  try {
    const { rows } = await pool.query(
      'SELECT refresh_token_enc, google_email FROM google_connections ORDER BY created_at DESC LIMIT 1'
    );
    if (!rows.length) throw new Error('Brak aktywnego połączenia Google w tabeli google_connections');
    googleEmail = rows[0].google_email;
    refreshToken = decrypt(rows[0].refresh_token_enc, encKey);
  } finally {
    await pool.end();
  }

  const oauth = new OAuth2Client({ clientId, clientSecret });
  oauth.setCredentials({ refresh_token: refreshToken });

  const endDate = wczorajPacyficzne();
  const startDate = poczatekTrzechMiesiecyGsc(endDate);

  const serie = {};
  const metryki = {};

  for (const site of GSC_SITES) {
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site.url)}/searchAnalytics/query`;
    const [resTotal, resDaily] = await Promise.all([
      oauth.request({
        url: endpoint,
        method: 'POST',
        data: { startDate, endDate, dimensions: [], type: 'web', dataState: 'all' },
      }),
      oauth.request({
        url: endpoint,
        method: 'POST',
        data: { startDate, endDate, dimensions: ['date'], type: 'web', dataState: 'all', rowLimit: 25000 },
      }),
    ]);

    const rows = (resDaily.data.rows || []).sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
    if (!rows.length) continue;

    // Uzupełniamy ewentualne dni z 0 wyświetleń między pierwszym a ostatnim dniem w oknie,
    // żeby koszyki tygodniowe miały równe 7 dni kalendarzowych.
    const mapaDni = new Map(rows.map((r) => [r.keys[0], r]));
    const sDate = rows[0].keys[0];
    const eDate = rows[rows.length - 1].keys[0];
    const pelneDni = [];
    for (
      let t = new Date(`${sDate}T00:00:00Z`).getTime(), tMax = new Date(`${eDate}T00:00:00Z`).getTime();
      t <= tMax;
      t += 86400000
    ) {
      const klucz = new Date(t).toISOString().slice(0, 10);
      const w = mapaDni.get(klucz);
      pelneDni.push({
        date: klucz,
        clicks: w ? Math.round(w.clicks) : 0,
        impressions: w ? Math.round(w.impressions) : 0,
      });
    }

    // Agregacja tygodniowa od końca (najświeższy tydzień zawsze ma pełne 7 dni).
    const weeks = [];
    let endIdx = pelneDni.length;
    while (endIdx > 0) {
      const startIdx = Math.max(0, endIdx - 7);
      const weekRows = pelneDni.slice(startIdx, endIdx);
      const clicks = weekRows.reduce((sum, r) => sum + r.clicks, 0);
      const impressions = weekRows.reduce((sum, r) => sum + r.impressions, 0);
      weeks.unshift([weekRows[0].date, weekRows[weekRows.length - 1].date, clicks, impressions]);
      endIdx = startIdx;
    }
    // Jeśli na początku okna została reszta 1-3 dni (np. 92 dni = 13*7 + 1),
    // dołączamy ją do pierwszego tygodnia, żeby wykres nie zaczynał się sztucznym
    // jednodniowym dołkiem i żeby seria[0][0] !== seria[0][1] (tryb tygodniowy w Realizacje.jsx).
    if (weeks.length >= 2) {
      const dniPierwszego = Math.round((new Date(`${weeks[0][1]}T00:00:00Z`) - new Date(`${weeks[0][0]}T00:00:00Z`)) / 86400000) + 1;
      if (dniPierwszego <= 3) {
        const [a, b] = weeks;
        weeks.splice(0, 2, [a[0], b[1], a[2] + b[2], a[3] + b[3]]);
      }
    }

    const podsumowanie = resTotal.data.rows?.[0];
    const totalClicks = podsumowanie ? Math.round(podsumowanie.clicks) : pelneDni.reduce((s, r) => s + r.clicks, 0);
    const totalImpr = podsumowanie ? Math.round(podsumowanie.impressions) : pelneDni.reduce((s, r) => s + r.impressions, 0);
    const ctr = podsumowanie ? Number((podsumowanie.ctr * 100).toFixed(1)) : 0;
    const position = podsumowanie ? Number(podsumowanie.position.toFixed(1)) : 0;
    const days = pelneDni.length;

    serie[site.id] = weeks;
    metryki[site.id] = {
      nazwa: site.name,
      url: site.url,
      days,
      windowStart: startDate,
      startDate: sDate,
      endDate: eDate,
      totalClicks,
      totalImpr,
      ctr,
      position,
    };
  }

  return {
    ok: true,
    pobraneDlaKonta: googleEmail,
    wygenerowano: new Date().toISOString(),
    zakresGsc: { od: startDate, do: endDate, widok: '3m-web' },
    serie,
    metryki,
  };
}
