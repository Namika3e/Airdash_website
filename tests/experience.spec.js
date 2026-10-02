import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
async function scenes(page) {
  return page.evaluate(async () => {
    const { ScrollTrigger } = await import('/src/components/motion/animation.js')
    return ScrollTrigger.getAll()
      .filter((t) => t.vars.pin)
      .map((t) => ({ name: t.trigger.className, start: t.start, end: t.end }))
  })
}
async function seek(page, name, progress) {
  const s = (await scenes(page)).find((s) => s.name.includes(name))
  await page.evaluate((y) => window.scrollTo(0, y), s.start + (s.end - s.start) * progress)
  await page.waitForTimeout(900)
}
test('homepage has usable hero, loaded media and no overflow', async ({ page }) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await page.waitForTimeout(1800)
  await expect(page.locator('h1')).toHaveText('DELIVERYWITHOUTTHE TRAFFIC.')
  await expect(page.locator('.hero-detail')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-buttons a').first()).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
  expect(
    await page.locator('.city-image').evaluate((e) => e.complete && e.naturalWidth > 0),
  ).toBeTruthy()
  expect((await scenes(page)).length).toBe(5)
  expect(errors).toEqual([])
  await page.locator('.scroll-cue').click()
  await expect(page.locator('.route-copy')).toHaveCSS('opacity', '1')
})
test('signature scenes reverse and tether physically follows scroll', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(1700)
  await seek(page, 'hero-route', 0.67)
  await expect(page.locator('.direct-copy')).toHaveCSS('opacity', '1')
  await expect(page.locator('.direct-path')).toHaveCSS('stroke-dashoffset', '0px')
  await seek(page, 'destination-app', 0.45)
  await expect(page.locator('.phone-shell')).toHaveCSS('opacity', '1')
  const clip = await page
    .locator('.destination-frame')
    .evaluate((e) => getComputedStyle(e).clipPath)
  expect(clip).toContain('inset(')
  await seek(page, 'tether-scene', 0.4)
  const first = await page.locator('.tether-package').boundingBox()
  const aircraft = await page.locator('.tether-aircraft').boundingBox()
  await seek(page, 'tether-scene', 0.85)
  const last = await page.locator('.tether-package').boundingBox()
  const aircraftAfter = await page.locator('.tether-aircraft').boundingBox()
  expect(last.y - first.y).toBeGreaterThan(100)
  expect(Math.abs(aircraft.y - aircraftAfter.y)).toBeLessThan(3)
  await seek(page, 'tether-scene', 0.99)
  await expect(page.locator('.tether-ready')).toHaveCSS('opacity', '1')
  await seek(page, 'tether-scene', 0.2)
  await expect(page.locator('.tether-ready')).toHaveCSS('opacity', '0')
  expect((await page.locator('.tether-package').boundingBox()).y).toBeLessThan(first.y)
})
test('routes, coverage query, local draft and history work', async ({ page, isMobile }) => {
  await page.goto('/coverage')
  await page.getByLabel('Your neighbourhood or address').fill('Ikoyi, Lagos')
  await page.getByRole('button', { name: 'Check availability' }).click()
  await expect(page.getByRole('status')).toContainText('has not been confirmed')
  await page.locator('.coverage-result a').click()
  await expect(page).toHaveURL(/waitlist\?address=/)
  await expect(page.getByLabel('Your neighbourhood')).toHaveValue('Ikoyi, Lagos')
  await page.getByLabel('Your name').fill('AirDash Test')
  await page.getByLabel('Email address').fill('test@example.com')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'SAVE MY DETAILS' }).click()
  await expect(page.getByRole('status')).toContainText('Nothing has been sent')
  await page.reload()
  await expect(page.getByLabel('Your name')).toHaveValue('AirDash Test')
  await expect(page.getByLabel('Email address')).toHaveValue('test@example.com')
  await page.getByRole('button', { name: 'Clear saved details' }).click()
  expect(await page.evaluate(() => localStorage.getItem('airdash-interest-draft'))).toBeNull()
  for (const path of [
    '/how-it-works',
    '/tether-delivery',
    '/safety',
    '/merchants',
    '/communities',
    '/about',
    '/help',
    '/contact',
  ]) {
    await page.goto(path)
    await expect(page.locator('main h1')).toBeVisible()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy()
  }
  await page.goto('/')
  await page.waitForTimeout(1700)
  await seek(page, 'hero-route', 0.6)
  const original = await page.evaluate(() => scrollY)
  await page.locator('.header-actions a').click()
  expect(await scenes(page)).toHaveLength(0)
  await page.goBack()
  await page.waitForTimeout(1300)
  expect(await scenes(page)).toHaveLength(5)
  expect(Math.abs((await page.evaluate(() => scrollY)) - original)).toBeLessThan(10)
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-menu')).toBeHidden()
  }
})
test('reduced motion removes scrubbing and retains readable story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForTimeout(500)
  expect(await scenes(page)).toHaveLength(0)
  expect(await page.locator('html').evaluate((e) => e.classList.contains('lenis'))).toBe(false)
  await expect(page.locator('.static-story')).toBeVisible()
  await expect(page.locator('.tether-ready')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
})
test('viewport and motion-preference changes rebuild cleanly', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(1600)
  await page.setViewportSize({ width: 320, height: 700 })
  await page.waitForTimeout(500)
  expect(await scenes(page)).toHaveLength(5)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
  await seek(page, 'destination-app', 0.45)
  const geometry = await page.evaluate(() => {
    const phone = document.querySelector('.phone-shell').getBoundingClientRect()
    const frame = document.querySelector('.destination-frame').getBoundingClientRect()
    const insets = getComputedStyle(document.querySelector('.destination-frame'))
      .clipPath.match(/inset\(([^r]+)/)[1]
      .match(/[\d.]+/g)
      .map(Number)
    return {
      phoneLeft: phone.left,
      clipLeft: frame.left + insets[1],
      phoneTop: phone.top,
      clipTop: frame.top + insets[0],
    }
  })
  expect(Math.abs(geometry.phoneLeft - geometry.clipLeft)).toBeLessThan(2)
  expect(Math.abs(geometry.phoneTop - geometry.clipTop)).toBeLessThan(2)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(300)
  expect(await scenes(page)).toHaveLength(0)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.waitForTimeout(500)
  expect(await scenes(page)).toHaveLength(5)
})
