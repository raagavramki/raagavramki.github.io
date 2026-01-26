import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputPath = join(__dirname, '../public/assets/img/profile.jpg')
const outputPath = join(__dirname, '../public/assets/img/profile.webp')

try {
  await sharp(inputPath)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath)

  console.log('✅ Converted profile.jpg to profile.webp (1200px width, 85% quality)')
} catch (error) {
  console.error('❌ Error converting image:', error)
  process.exit(1)
}
