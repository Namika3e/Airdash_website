import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
export { gsap, ScrollTrigger }
export const debug =
  import.meta.env.DEV && new URLSearchParams(window.location.search).has('motionDebug')
// Each scene owns its context; reverting removes timelines, triggers and pin spacers.
export function useScene(ref, setup) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      {
        desktop: '(min-width: 900px)',
        mobile: '(max-width: 899px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (!context.conditions.reduce) return setup(context, gsap.utils.selector(ref))
      },
      ref,
    )
    return () => mm.revert()
  }, [ref, setup])
}
export function sceneTimeline(element, distance = 2, options = {}) {
  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: () => `+=${window.innerHeight * distance}`,
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: debug,
      ...options,
    },
  })
}
