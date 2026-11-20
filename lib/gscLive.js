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

  // Pobieramy dane z ostatnich 91 dni (13 pełnych 7-dniowych tygodni)
  const now = new Date();
  const endDate = now.toISOString().slice(0, 10);
  const from = new Date(now.getTime() - 105 * 86400000);
  const startDate = from.toISOString().slice(0, 10);

  const serie = {};
  const metryki = {};

  for (const site of GSC_SITES) {
    const res = await oauth.request({
      url: `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site.url)}/searchAnalytics/query`,
      method: 'POST',
      data: {
        startDate,
        endDate,
        dimensions: ['date'],
        type: 'web',
        dataState: 'all',
        rowLimit: 25000,
      },
    });

    const rows = (res.data.rows || []).sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
    if (!rows.length) continue;

    // Bierzemy ostatnie max 91 dni (lub wszystkie, gdy mniej)
    const slice = rows.length > 91 ? rows.slice(rows.length - 91) : rows;

    // Agregacja tygodniowa od tyłu (tak, aby najświeższy tydzień był spójny)
    const weeks = [];
    let endIdx = slice.length;
    while (endIdx > 0) {
      const startIdx = Math.max(0, endIdx - 7);
      const weekRows = slice.slice(startIdx, endIdx);
      const clicks = weekRows.reduce((sum, r) => sum + Math.round(r.clicks), 0);
      const impressions = weekRows.reduce((sum, r) => sum + Math.round(r.impressions), 0);
      weeks.unshift([weekRows[0].keys[0], weekRows[weekRows.length - 1].keys[0], clicks, impressions]);
      endIdx = startIdx;
    }

    const totalClicks = slice.reduce((sum, r) => sum + Math.round(r.clicks), 0);
    const totalImpr = slice.reduce((sum, r) => sum + Math.round(r.impressions), 0);
    const sDate = slice[0].keys[0];
    const eDate = slice[slice.length - 1].keys[0];
    const days = slice.length;

    serie[site.id] = weeks;
    metryki[site.id] = {
      nazwa: site.name,
      url: site.url,
      days,
      startDate: sDate,
      endDate: eDate,
      totalClicks,
      totalImpr,
    };
  }

  return {
    ok: true,
    pobraneDlaKonta: googleEmail,
    wygenerowano: new Date().toISOString(),
    serie,
    metryki,
  };
}
