import { Pool } from 'pg';
import { OAuth2Client } from 'google-auth-library';
import { createDecipheriv } from 'node:crypto';

export const GSC_SITE_URL = 'sc-domain:ai-seo-company.pl';
export const BASE_SITE_URL = 'https://www.ai-seo-company.pl';

export const SEGMENT_SITEMAPS = [
  `${BASE_SITE_URL}/sitemap.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/strony-pl.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/strony-en.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/blog-pl.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/blog-en.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/ai-pl.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/ai-en.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/porownania.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/narzedzia-szablony.xml`,
  `${BASE_SITE_URL}/sitemaps/sitemap/de.xml`,
];

function decrypt(enc, keyB64) {
  const [v, iv, tag, body] = String(enc || '').split('.');
  if (v !== 'v1' || !iv || !tag || !body) {
    throw new Error('Nieznany format zaszyfrowanego tokenu OAuth');
  }
  const k = Buffer.from(keyB64, 'base64');
  const d = createDecipheriv('aes-256-gcm', k, Buffer.from(iv, 'base64url'));
  d.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([d.update(Buffer.from(body, 'base64url')), d.final()]).toString('utf8');
}

async function getGoogleOAuthClient() {
  const dbUrl = process.env.DATABASE_URL;
  const encKey = process.env.ENCRYPTION_KEY;
  const clientId = process.env.GOOGLE_DATA_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DATA_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;

  if (!dbUrl || !encKey || !clientId || !clientSecret) {
    return null;
  }

  const pool = new Pool({ connectionString: dbUrl, connectionTimeoutMillis: 5000 });
  try {
    const { rows } = await pool.query(
      'SELECT google_email, scopes, refresh_token_enc FROM google_connections ORDER BY created_at DESC LIMIT 1'
    );
    if (!rows.length) return null;
    const refreshToken = decrypt(rows[0].refresh_token_enc, encKey);
    const oauth = new OAuth2Client({ clientId, clientSecret });
    oauth.setCredentials({ refresh_token: refreshToken });
    return {
      oauth,
      email: rows[0].google_email,
      scopes: String(rows[0].scopes || ''),
    };
  } finally {
    await pool.end();
  }
}

export async function submitSitemapsToGsc(urls = SEGMENT_SITEMAPS) {
  const conn = await getGoogleOAuthClient();
  if (!conn) {
    return { ok: false, skipped: true, reason: 'brak-konfiguracji-oauth', submitted: 0, errors: [] };
  }

  const encodedSite = encodeURIComponent(GSC_SITE_URL);
  const results = [];
  const errors = [];

  for (const feedpath of urls) {
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodeURIComponent(feedpath)}`;
    try {
      await conn.oauth.request({ url: endpoint, method: 'PUT' });
      results.push(feedpath);
    } catch (err) {
      const status = err?.response?.status ?? err?.code ?? 500;
      const msg = err?.response?.data?.error?.message || err?.message || String(err);
      errors.push({ feedpath, status, message: msg });
      if (status === 403) {
        return {
          ok: false,
          skipped: false,
          reason: 'wymagane-odswiezenie-zakresu-webmasters-w-panelu',
          email: conn.email,
          scopes: conn.scopes,
          submitted: results.length,
          errors,
        };
      }
    }
  }

  return {
    ok: errors.length === 0,
    skipped: false,
    email: conn.email,
    submitted: results.length,
    urls: results,
    errors,
  };
}

export async function submitSitemapsToBing(urls = SEGMENT_SITEMAPS) {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: 'brak-BING_WEBMASTER_API_KEY', submitted: 0, errors: [] };
  }

  const submitted = [];
  const errors = [];
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed?apikey=${encodeURIComponent(apiKey)}`;

  for (const feedUrl of urls) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ siteUrl: `${BASE_SITE_URL}/`, feedUrl }),
      });
      if (res.ok) {
        submitted.push(feedUrl);
      } else {
        const text = await res.text().catch(() => '');
        errors.push({ feedUrl, status: res.status, message: text.slice(0, 200) });
      }
    } catch (err) {
      errors.push({ feedUrl, status: 0, message: err?.message || String(err) });
    }
  }

  return {
    ok: errors.length === 0,
    skipped: false,
    submitted: submitted.length,
    urls: submitted,
    errors,
  };
}

export async function submitAllSitemaps(urls = SEGMENT_SITEMAPS) {
  const [gsc, bing] = await Promise.all([
    submitSitemapsToGsc(urls),
    submitSitemapsToBing(urls),
  ]);
  return { gsc, bing };
}
