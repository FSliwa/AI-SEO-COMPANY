const fs = require('fs');
const glob = require('glob');

function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (name.endsWith('page.js') || name.endsWith('page.jsx')) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const files = getFiles('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let plVal = null;
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("'pl':")) {
      plVal = lines[i].substring(lines[i].indexOf(":") + 1).trim().replace(/,$/, '');
    }
    if (lines[i].includes("'x-default': `https,")) {
      if (plVal) {
        lines[i] = `      'x-default': ${plVal},`;
        modified = true;
      }
    }
  }
  if (modified) {
    fs.writeFileSync(file, lines.join('\n'));
  }
});
console.log("Fixed x-default tags finally.");
