import { chromium } from '@playwright/test'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
page.on('pageerror', (error) => console.log('PAGE ERROR', error.message))
page.on('console', (message) => {
  if (message.type() === 'error') console.log('CONSOLE', message.text())
})
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)
await page.screenshot({ path: 'artifacts/desktop-hero.png' })
const scenes = await page.evaluate(async () => {
  const { ScrollTrigger } = await import('/src/components/motion/animation.js')
  return ScrollTrigger.getAll()
    .filter((t) => t.vars.pin)
    .map((t) => ({ name: t.trigger.className, start: t.start, end: t.end }))
})
console.log(JSON.stringify(scenes))
for (const [name, index, progress] of [
  ['route', 0, 0.67],
  ['phone', 1, 0.47],
  ['checkout', 1, 0.58],
  ['flight', 2, 0.5],
  ['tether', 3, 0.8],
  ['ready', 3, 0.99],
  ['gallery', 4, 0.35],
]) {
  const s = scenes[index]
  await page.evaluate((y) => window.scrollTo(0, y), s.start + (s.end - s.start) * progress)
  await page.waitForTimeout(1100)
  await page.screenshot({ path: `artifacts/desktop-${name}.png` })
}
console.log(
  'overflow',
  await page.evaluate(() => ({ body: document.documentElement.scrollWidth, width: innerWidth })),
)
await browser.close()
