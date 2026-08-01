const fs = require('fs');
const path = require('path');

const targetPath = path.join(
  __dirname,
  'app/[locale]/blog/ile-kosztuje-strona-www-dla-firmy-ceny/page.js'
);
let content = fs.readFileSync(targetPath, 'utf8');

const enContent = fs.readFileSync(path.join(__dirname, 'en_content.txt'), 'utf8');

// The English placeholder starts with <div className="container" and ends with English version is currently being localized... </p> </div> </Reveal> </div>
const oldEnRegex = /<div className="container"[^>]*>\s*<Reveal>[\s\S]*?English version is currently being localized[\s\S]*?<\/div>\s*<\/Reveal>\s*<\/div>/;

if (!oldEnRegex.test(content)) {
  console.error("Could not find the English placeholder to replace.");
  process.exit(1);
}

content = content.replace(oldEnRegex, enContent);

// Add tocItemsEn
const tocItemsEnStr = `const tocItemsEn = [
    { id: 'detailed-price-ranges', title: 'Detailed Price Ranges by Website Type' },
    { id: 'what-affects-price', title: 'What Exactly Affects the Price of a Website?' },
    { id: 'whats-included', title: "What's Included in the Price and What Costs Extra?" },
    { id: 'how-long-does-it-take', title: 'How Long Does Website Development Take and What Are the Stages?' },
    { id: 'how-to-reduce-cost', title: 'How to Reduce Website Cost Without Risky Compromises' },
    { id: 'how-to-choose-provider', title: 'How to Choose a Provider and What Questions to Ask When Getting a Quote' },
    { id: 'freelancer-or-agency', title: 'Freelancer, Small Agency, or Full-Service: What Do You Get for the Price?' },
    { id: 'why-invest', title: "Why It's Worth Investing in a Well-Designed Website" },
    { id: 'key-takeaways', title: 'Key Takeaways' },
    { id: 'what-really-matters', title: 'A €450 Website or a €4,650 Website: What Really Matters?' },
    { id: 'ai-seo-company-en', title: 'Ai-seo-company: A Website That Works for Your Business from Day One' },
    { id: 'useful-sources', title: 'Useful Sources and Tools for Budget Planning' }
  ];`;

// Find where tocItems is defined
content = content.replace(/const tocItems = \[([\s\S]*?)\];/, (match) => {
  return `const tocItemsPl = [${match.substring(match.indexOf('['))}
  ${tocItemsEnStr}`;
});

// Rename tocItems to tocItemsPl for the polish version (the Polish version currently uses tocItems)
// Oh actually I need to replace <ArticleTOC items={tocItems} /> in the polish block with <ArticleTOC items={tocItemsPl} />
content = content.replace(/<ArticleTOC items=\{tocItems\} \/>/, '<ArticleTOC items={tocItemsPl} />');

// And in generateMetadata the title already supports EN. But I'll make sure it's the exact title user requested.
// title: locale === 'en' ? 'How Much Does a Business Website Cost? Pricing & What\'s Included (2026)' : 'Ile kosztuje strona www dla firmy: ceny i co zawierają',
content = content.replace(/title: locale === 'en' \? '.*?' : 'Ile kosztuje strona www dla firmy: ceny i co zawierają',/, 
  "title: locale === 'en' ? 'How Much Does a Business Website Cost? Pricing & What\\'s Included (2026)' : 'Ile kosztuje strona www dla firmy: ceny i co zawierają',");


fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully injected English content!');
