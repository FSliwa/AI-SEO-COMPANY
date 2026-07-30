const sharp = require('sharp');
const fs = require('fs');

async function compress(file) {
  console.log(`Compressing ${file}`);
  const buffer = await sharp(file)
    .resize(800)
    .webp({ quality: 75 })
    .toBuffer();
  fs.writeFileSync(file.replace('.png', '.webp'), buffer);
  console.log(`Saved as .webp`);
}
compress('public/projects/madame-thai-full.png');
compress('public/projects/kafelek-aisas.png');
