import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './animation'
const positions = new Map()
const ScrollContext = createContext(null)
export const useScrollTo = () => useContext(ScrollContext)
export function SmoothScrollProvider({ children }) {
  const location = useLocation()
  const navigationType = useNavigationType()
  const lenisRef = useRef(null)
  const currentKey = useRef(location.key)
  const navigationSnapshot = useRef(null)
  const scrollTo = useCallback((y) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y)
    else window.scrollTo({ top: y, behavior: 'instant' })
  }, [])
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const lenis = new Lenis({
        duration: 0.85,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      return () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
        lenisRef.current = null
      }
    })
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    // Capture before React removes pin spacers and the browser clamps scrollY.
    const remember = () => {
      navigationSnapshot.current = { key: currentKey.current, y: window.scrollY }
    }
    document.addEventListener('click', remember, true)
    document.addEventListener('submit', remember, true)
    window.addEventListener('popstate', remember)
    return () => {
      mm.revert()
      history.scrollRestoration = previousRestoration
      gsap.ticker.lagSmoothing(500, 33)
      document.removeEventListener('click', remember, true)
      document.removeEventListener('submit', remember, true)
      window.removeEventListener('popstate', remember)
    }
  }, [])
  useLayoutEffect(() => {
    currentKey.current = location.key
    let disposed = false
    let timer
    const refresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        lenisRef.current?.resize()
        ScrollTrigger.refresh()
      }, 100)
    }
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const y = navigationType === 'POP' ? positions.get(location.key) || 0 : 0
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true })
      else window.scrollTo(0, y)
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
      if (navigationType !== 'POP') document.getElementById('main')?.focus({ preventScroll: true })
    })
    document.fonts.ready.then(() => {
      if (!disposed) refresh()
    })
    document.addEventListener('load', refresh, true)
    window.addEventListener('resize', refresh)
    return () => {
      const snapshot = navigationSnapshot.current
      positions.set(location.key, snapshot?.key === location.key ? snapshot.y : window.scrollY)
      disposed = true
      cancelAnimationFrame(frame)
      clearTimeout(timer)
      document.removeEventListener('load', refresh, true)
      window.removeEventListener('resize', refresh)
    }
  }, [location.key, location.hash, navigationType])
  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
}
export function PageTransition() {
  const ref = useRef(null)
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap
        .timeline()
        .fromTo(
          ref.current,
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, duration: reduce ? 0 : 0.35, ease: 'power3.inOut' },
        )
        .to(ref.current, { opacity: 0, duration: reduce ? 0 : 0.18 })
    })
    return () => ctx.revert()
  }, [pathname])
  return <div ref={ref} className="page-transition" aria-hidden="true" />
}
