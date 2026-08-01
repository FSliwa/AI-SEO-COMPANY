const fs = require('fs');

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
  if (content.includes("'x-default': (/'pl':\\s*/, ''),")) {
    const lines = content.split('\n');
    let plVal = null;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("'pl':")) {
        plVal = lines[i].split(":", 2)[1].trim().replace(/,$/, '');
      }
      if (lines[i].includes("'x-default': (/'pl':\\s*/, ''),")) {
        if (plVal) {
          lines[i] = lines[i].replace("(/'pl':\\s*/, '')", plVal);
        }
      }
    }
    fs.writeFileSync(file, lines.join('\n'));
  }
});
console.log("Fixed x-default tags.");
