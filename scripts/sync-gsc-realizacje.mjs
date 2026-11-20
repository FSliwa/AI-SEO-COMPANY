import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchLiveGscData } from '../lib/gscLive.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

async function main() {
  console.log('Rozpoczynam pobieranie danych na żywo z Google Search Console...');
  const res = await fetchLiveGscData();
  
  console.log(`Pomyślnie połączono z kontem Google: ${res.pobraneDlaKonta}`);
  console.log(`Data aktualizacji: ${res.wygenerowano}`);
  
  for (const [id, m] of Object.entries(res.metryki)) {
    console.log(`- ${m.nazwa} (${m.url}): ${m.days} dni (${m.startDate} do ${m.endDate}), ${res.serie[id]?.length} tygodni, kliknięcia=${m.totalClicks}, wyświetlenia=${m.totalImpr}`);
  }

  // 1. Zapisujemy public/dane/realizacje-gsc.json
  const publicDir = path.join(root, 'public', 'dane');
  fs.mkdirSync(publicDir, { recursive: true });
  const jsonPath = path.join(publicDir, 'realizacje-gsc.json');
  fs.writeFileSync(jsonPath, JSON.stringify(res, null, 2), 'utf8');
  console.log(`Zapisano dane do: ${jsonPath}`);

  // 2. Generujemy lib/realizacjeGsc.js (baseline dla SSR i pracy bez JS)
  const code = `/* Serie do wykresów w sekcji portfolio (components/Realizacje.jsx).
 *
 * Źródło: Google Search Console API (dane pobierane na żywo).
 * Konto agencji: ${res.pobraneDlaKonta}
 * Ostatnia automatyczna synchronizacja: ${res.wygenerowano}
 *
 * Format punktu: [od, do, kliknięcia, wyświetlenia] (sumy tygodniowe).
 * Podpięte projekty klientów (zgodnie z wytycznymi, bez elkatelektro.com):
 * - staniax (sc-domain:staniax.pl)
 * - madamethai (sc-domain:madamethai.pl)
 * - tql (sc-domain:tql.pl)
 * - ase-bot (sc-domain:ase-bot.live)
 * - stefbud (sc-domain:stefbud.com)
 */

export const SERIE_GSC = ${JSON.stringify(res.serie, null, 2)};

export const METRYKI_GSC = ${JSON.stringify(res.metryki, null, 2)};
`;

  const jsPath = path.join(root, 'lib', 'realizacjeGsc.js');
  fs.writeFileSync(jsPath, code, 'utf8');
  console.log(`Zaktualizowano plik: ${jsPath}`);
  console.log('Automatyzacja pobierania danych GSC zakończona sukcesem!');
}

main().catch((err) => {
  console.error('Błąd synchronizacji GSC:', err);
  process.exit(1);
});
