const fs = require('fs');

const files = [
  'app/[locale]/blog/core-web-vitals-a-pozycje-google/page.js',
  'app/[locale]/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026/page.js',
  'app/[locale]/blog/link-building-b2b-dla-marketerow-strategie-i-checklista/page.js',
  'app/[locale]/blog/seo-lokalne-dla-firm-w-warszawie/page.js'
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Simple string replace instead of Regex to ensure it works
  if (content.includes('export default function ArticleCwvPage() {')) {
    content = content.replace('export default function ArticleCwvPage() {', 'export default async function ArticleCwvPage({ params }) {\\n  const { locale } = await params;');
  }
  if (content.includes('export default function ArticlePricingPage() {')) {
    content = content.replace('export default function ArticlePricingPage() {', 'export default async function ArticlePricingPage({ params }) {\\n  const { locale } = await params;');
  }
  if (content.includes('export default function ArticleLinkBuildingPage() {')) {
    content = content.replace('export default function ArticleLinkBuildingPage() {', 'export default async function ArticleLinkBuildingPage({ params }) {\\n  const { locale } = await params;');
  }
  if (content.includes('export default function ArticleLocalSeoPage() {')) {
    content = content.replace('export default function ArticleLocalSeoPage() {', 'export default async function ArticleLocalSeoPage({ params }) {\\n  const { locale } = await params;');
  }

  // Also, notice that fix_meta.cjs was overridden by git checkout!
  // I need to re-apply the fix_meta.cjs changes!
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
});
