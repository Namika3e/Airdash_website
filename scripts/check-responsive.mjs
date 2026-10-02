import { chromium, devices } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
const browser = await chromium.launch()
for (const mode of ['mobile', 'tablet', 'reduced']) {
  const context = await browser.newContext(
    mode === 'mobile'
      ? { ...devices['iPhone 13'] }
      : {
          viewport: {
            width: mode === 'tablet' ? 820 : 1440,
            height: mode === 'tablet' ? 1180 : 1000,
          },
          reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
        },
  )
  const page = await context.newPage()
  page.on('pageerror', (e) => console.log(mode, 'ERROR', e.message))
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `artifacts/${mode}-hero.png` })
  const scenes = await page.evaluate(async () => {
    const { ScrollTrigger } = await import('/src/components/motion/animation.js')
    return ScrollTrigger.getAll()
      .filter((t) => t.vars.pin)
      .map((t) => ({ name: t.trigger.className, start: t.start, end: t.end }))
  })
  console.log(
    mode,
    'pins',
    scenes.length,
    'overflow',
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  )
  if (mode !== 'reduced')
    for (const [name, index, p] of [
      ['route', 0, 0.68],
      ['phone', 1, 0.44],
      ['tether', 3, 0.65],
      ['ready', 3, 0.99],
      ['gallery', 4, 0.7],
    ]) {
      const s = scenes[index]
      await page.evaluate((y) => window.scrollTo(0, y), s.start + (s.end - s.start) * p)
      await page.waitForTimeout(900)
      await page.screenshot({ path: `artifacts/${mode}-${name}.png` })
    }
  else await page.screenshot({ path: 'artifacts/reduced-full.png', fullPage: true })
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  console.log(
    mode,
    'AXE',
    JSON.stringify(
      axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ),
  )
  await context.close()
}
await browser.close()
