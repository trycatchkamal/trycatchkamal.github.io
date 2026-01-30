import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '..', 'assets', 'images', 'profile.jpg');
const outputPath = join(__dirname, '..', 'public', 'profile.jpg');

sharp(inputPath)
  .resize(400, 400, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85, progressive: true })
  .toFile(outputPath)
  .then(info => {
    console.log('✅ Image optimized successfully!');
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📦 Size: ${(info.size / 1024).toFixed(2)} KB`);
  })
  .catch(err => {
    console.error('❌ Error optimizing image:', err);
    process.exit(1);
  });
