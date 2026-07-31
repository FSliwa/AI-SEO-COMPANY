const { execSync } = require('child_process');
const fs = require('fs');

const sites = [
  'https://semcore.pl',
  'https://www.artefakt.pl',
  'https://delante.pl',
  'https://bluerank.pl',
  'https://www.sunrise-system.pl',
  'https://www.grupatense.pl',
  'https://www.eactive.pl',
  'https://ks.pl',
  'https://foxstrategy.pl',
  'https://www.elephate.com/pl/'
];

const results = [];

for (const site of sites) {
  console.log(`Running Lighthouse for ${site}...`);
  try {
    execSync(`npx lighthouse ${site} --chrome-flags="--headless" --output json --output-path ./lh-tmp.json`, { stdio: 'pipe' });
    const data = JSON.parse(fs.readFileSync('./lh-tmp.json', 'utf8'));
    results.push({
      site,
      performance: data.categories.performance ? data.categories.performance.score * 100 : 'N/A',
      accessibility: data.categories.accessibility ? data.categories.accessibility.score * 100 : 'N/A',
      bestPractices: data.categories['best-practices'] ? data.categories['best-practices'].score * 100 : 'N/A',
      seo: data.categories.seo ? data.categories.seo.score * 100 : 'N/A'
    });
  } catch (error) {
    console.error(`Error running Lighthouse for ${site}`);
  }
}

console.table(results);
fs.writeFileSync('top10-speed-test.json', JSON.stringify(results, null, 2));
