import sharp from 'sharp'
import { mkdir, rename, access } from 'node:fs/promises'
await mkdir('design/source-media', { recursive: true })
for (const name of ['lagos', 'compound', 'food', 'merchant', 'aircraft']) {
  const old = `public/media/${name}-source.png`
  const source = `design/source-media/${name}.png`
  try {
    await access(old)
    await rename(old, source)
  } catch {
    /* Already archived. */
  }
  if (name === 'aircraft') {
    await sharp(source)
      .resize(1100)
      .webp({ quality: 86, alphaQuality: 95 })
      .toFile('public/media/aircraft.webp')
  } else {
    for (const width of [900, 1680])
      await sharp(source)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 83 })
        .toFile(`public/media/${name}-${width}.webp`)
  }
}
console.log('Responsive WebP media written to public/media; originals archived outside the build.')
console.log('Aircraft alpha:', (await sharp('public/media/aircraft.webp').stats()).channels[3])
