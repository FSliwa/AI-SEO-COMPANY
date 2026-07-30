const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/[locale]/blog/link-building-b2b-dla-marketerow-strategie-i-checklista/page.js');
const tmpPath = path.join(__dirname, 'tmp-en.jsx');

const pageContent = fs.readFileSync(pagePath, 'utf8');
const enContent = fs.readFileSync(tmpPath, 'utf8');

const regex = /\{locale === 'en' \? \([\s\S]*?\)\s*:\s*\(/;

const newPageContent = pageContent.replace(regex, `{locale === 'en' ? (\n${enContent}\n      ) : (`);

fs.writeFileSync(pagePath, newPageContent);
console.log('Replaced English content.');
