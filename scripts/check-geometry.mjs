import { chromium,devices } from '@playwright/test'
const browser=await chromium.launch()
const page=await browser.newPage({...devices['iPhone 13']})
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'})
await page.waitForTimeout(1600)
await page.setViewportSize({width:320,height:700})
await page.waitForTimeout(500)
const s=await page.evaluate(async()=>{const {ScrollTrigger}=await import('/src/components/motion/animation.js');const t=ScrollTrigger.getAll().find(t=>t.trigger?.classList.contains('destination-app'));return {start:t.start,end:t.end}})
await page.evaluate(y=>scrollTo(0,y),s.start+(s.end-s.start)*.45)
for(let i=0;i<3;i++){
 await page.waitForTimeout(1000)
 console.log(await page.evaluate(async()=>{
  const {ScrollTrigger}=await import('/src/components/motion/animation.js');const t=ScrollTrigger.getAll().find(t=>t.trigger?.classList.contains('destination-app'))
  const el=document.querySelector('.phone-shell'),frame=document.querySelector('.destination-frame')
  return{vh:innerHeight,scrollY,progress:t.progress,time:t.animation.time(),phone:{rect:el.getBoundingClientRect().toJSON(),offsetTop:el.offsetTop,offsetHeight:el.offsetHeight,transform:getComputedStyle(el).transform},frame:{rect:frame.getBoundingClientRect().toJSON(),clip:getComputedStyle(frame).clipPath}}
 }))
}
await page.screenshot({path:'artifacts/mobile-resize-phone.png'})
await browser.close()
