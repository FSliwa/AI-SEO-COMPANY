const fs = require('fs');
const path = require('path');

const baseDir = '/Users/filipsliwa/Desktop/AI SEO COMPANY/AI SEO COMPANY WEBSITE/app/[locale]/blog';
const articles = [
  'konfiguracja-zdarzen-gtm-ga4-poradnik',
  'vwo-vs-optimizely-porownanie',
  'analiza-konkurencji-seo-przewodnik',
  'ile-kosztuje-strona-www-dla-firmy-ceny',
  'jak-pozyskiwac-opinie-google-poradnik',
  'ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
  'tag-kanoniczny-seo-jak-wdrozyc-w-2026',
  'link-building-b2b-dla-marketerow-strategie-i-checklista',
  'core-web-vitals-a-pozycje-google'
];

articles.forEach(slug => {
  const filePath = path.join(baseDir, slug, 'page.js');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove customCta overrides from BlogCTA
  const customCtaPropsRegex = /customCta(Title|Text)(Pl|En)=\{?[^}]+\}?/g;
  // Let's do a more robust replacement for the overrides
  // Often they are string literals like customCtaTitlePl="..." or JSX expressions like customCtaTextPl={<>...</>}
  // I'll just remove lines containing customCta
  const lines = content.split('\n');
  const newLines = lines.filter(line => !line.includes('customCta'));
  if (newLines.length !== lines.length) {
    content = newLines.join('\n');
    changed = true;
  }

  // 2. Replace hardcoded CTA blocks (English versions usually)
  // The block starts with <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
  // and ends with two </div>
  const hardcodedCTARegex = /<div style=\{\{\s*borderTop:\s*'1px solid #E5E5EA',\s*marginTop:\s*'4rem',\s*paddingTop:\s*'4rem'\s*\}\}>[\s\S]*?<\/div>\s*<\/div>/g;
  if (hardcodedCTARegex.test(content)) {
    content = content.replace(hardcodedCTARegex, `<BlogCTA \n                locale={locale} \n                currentSlug="/blog/${slug}" \n              />`);
    changed = true;
  }

  // 3. For konfiguracja-zdarzen-gtm-ga4-poradnik specifically
  if (slug === 'konfiguracja-zdarzen-gtm-ga4-poradnik') {
    const recRegex = /<h2 id="rekomendacja">Rekomendacja<\/h2>\s*<ul>\s*<li>.*?<\/li>\s*<\/ul>/g;
    if (recRegex.test(content)) {
      content = content.replace(recRegex, `<BlogCTA \n                    locale={locale} \n                    currentSlug="/blog/${slug}" \n                  />`);
      changed = true;
    }
  }
  
  // Make sure BlogCTA is imported if it was newly added
  if (content.includes('<BlogCTA') && !content.includes('import BlogCTA')) {
    content = content.replace(/import { Link } from '@\/i18n\/routing';/g, "import { Link } from '@/i18n/routing';\nimport BlogCTA from '@/components/BlogCTA';");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${slug}`);
  }
});
