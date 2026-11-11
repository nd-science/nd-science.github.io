import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const require = createRequire(import.meta.url);

// Locate sharp in pnpm store or local node_modules
let sharp;
try {
  sharp = require('sharp');
} catch {
  const pnpmSharpPath = resolve('node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');
  if (existsSync(pnpmSharpPath)) {
    sharp = require(pnpmSharpPath);
  } else {
    throw new Error('Could not locate sharp');
  }
}

const targetDirs = [
  'apps/wellness/public/images',
  'apps/science/public/images',
];

const widths = [320, 480, 640, 880];

async function run() {
  const inputPath = 'apps/wellness/public/images/natalia-portrait.png';
  if (!existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const meta = await sharp(inputPath).metadata();
  console.log(`Original image: ${meta.width}x${meta.height}, ${meta.format}`);

  for (const dir of targetDirs) {
    console.log(`\nGenerating responsive portraits for ${dir}...`);
    for (const w of widths) {
      const h = Math.round((w * meta.height) / meta.width);

      // AVIF
      const avifPath = `${dir}/natalia-portrait-${w}w.avif`;
      const avifRes = await sharp(inputPath)
        .resize(w, h, { fit: 'cover' })
        .avif({ quality: 80, effort: 6 })
        .toFile(avifPath);
      console.log(`  Created ${avifPath}: ${w}x${h}, ${avifRes.size} bytes (${(avifRes.size / 1024).toFixed(1)} KB)`);

      // WebP
      const webpPath = `${dir}/natalia-portrait-${w}w.webp`;
      const webpRes = await sharp(inputPath)
        .resize(w, h, { fit: 'cover' })
        .webp({ quality: 82, effort: 6 })
        .toFile(webpPath);
      console.log(`  Created ${webpPath}: ${w}x${h}, ${webpRes.size} bytes (${(webpRes.size / 1024).toFixed(1)} KB)`);

      // PNG (fallback)
      const pngPath = `${dir}/natalia-portrait-${w}w.png`;
      const pngRes = await sharp(inputPath)
        .resize(w, h, { fit: 'cover' })
        .png({ compressionLevel: 9, effort: 7 })
        .toFile(pngPath);
      console.log(`  Created ${pngPath}: ${w}x${h}, ${pngRes.size} bytes (${(pngRes.size / 1024).toFixed(1)} KB)`);
    }
  }

  console.log('\nResponsive portraits generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
