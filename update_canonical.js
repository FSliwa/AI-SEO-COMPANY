const fs = require('fs');
const glob = require('glob'); // Assuming glob is available, or we can use fs.readdirSync recursively
const path = require('path');

function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (name.endsWith('page.js')) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const files = getFiles('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace canonical for /pl to /
  // Match: `canonical: locale === 'en' ? '/en' : '/pl'`
  content = content.replace(/canonical:\s*locale\s*===\s*'en'\s*\?\s*`\/en`\s*:\s*`\/pl`/, "canonical: locale === 'en' ? `/en` : `/`");
  
  // Replace `/pl/` with `/` inside backticks on the right side of the ternary
  content = content.replace(/(canonical:\s*locale\s*===\s*'en'\s*\?\s*`[^`]+`\s*:\s*`[^`]*)(\/pl\/)([^`]*`)/g, "$1/$3");
  
  // Replace `https://www.ai-seo-company.pl/pl/` with `https://www.ai-seo-company.pl/`
  content = content.replace(/(canonical:\s*locale\s*===\s*'en'\s*\?\s*`[^`]+`\s*:\s*`https:\/\/www\.ai-seo-company\.pl)\/pl\//g, "$1/");

  // Now, update languages block to include x-default and remove /pl
  if (content.includes("languages: {")) {
    // We can replace `'pl': \`/pl\`` with `'pl': \`/\`, 'x-default': \`/\``
    content = content.replace(/'pl':\s*`\/pl`,/, "'pl': `/`,\n      'x-default': `/`,");
    // We can replace `'pl': \`/pl/` with `'pl': \`/`
    content = content.replace(/'pl':\s*`\/pl\//g, "'pl': `/");
    
    // For full URLs: `'pl': \`https://www.ai-seo-company.pl/pl/`
    content = content.replace(/'pl':\s*`https:\/\/www\.ai-seo-company\.pl\/pl\//g, "'pl': `https://www.ai-seo-company.pl/");
    
    // Add x-default if not added
    if (!content.includes('x-default')) {
      // Find what 'pl' is mapped to, and add x-default right after it
      const plRegex = /('pl':\s*`[^`]+`),/;
      if (plRegex.test(content)) {
         content = content.replace(plRegex, "$1,\n      'x-default': $1.replace(/'pl':\\s*/, ''),".replace("$1.replace", ""));
         // Wait, the replace string won't execute JS. Let's do it manually.
      }
    }
  }

  // Proper manual x-default insertion:
  if (content.includes("languages: {") && !content.includes("'x-default'")) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("'pl':")) {
        const val = lines[i].split(':')[1].trim().replace(/,$/, '');
        lines.splice(i+1, 0, `      'x-default': ${val},`);
        break;
      }
    }
    content = lines.join('\n');
  }

  fs.writeFileSync(file, content);
});
console.log('Updated canonical tags in page.js files.');
