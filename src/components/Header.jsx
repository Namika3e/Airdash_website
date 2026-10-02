import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './motion/Primitives'
import { gsap, ScrollTrigger } from './motion/animation'
const links = [
  ['How it works', '/how-it-works'],
  ['Coverage', '/coverage'],
  ['For partners', '/merchants'],
]
export function Wordmark() {
  return (
    <span className="wordmark">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M3 23 15 4l14 24-14-7-12 2Zm12-2V10L8 21Z" fill="currentColor" />
      </svg>
      Airdash<span className="wordmark-dot">®</span>
    </span>
  )
}
export default function Header() {
  const [open, setOpen] = useState(false)
  const [compressed, setCompressed] = useState(false)
  const { pathname } = useLocation()
  const menuButton = useRef(null)
  const ref = useRef(null)
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 60,
      end: 'max',
      onUpdate: (self) => setCompressed(self.scroll() > 60),
    })
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.from('.header-brand', { opacity: 0, y: -8, duration: 0.6, delay: 0.1 })
        gsap.from('.header-navigation', { opacity: 0, y: -6, duration: 0.5, delay: 0.9 })
      },
      ref,
    )
    return () => {
      trigger.kill()
      mm.revert()
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const keydown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [open])
  return (
    <header
      ref={ref}
      className={`site-header ${compressed || pathname !== '/' || open ? 'is-solid' : ''}`}
    >
      <Link to="/" aria-label="AirDash home" className="header-brand">
        <Wordmark />
      </Link>
      <nav className="desktop-nav header-navigation" aria-label="Main navigation">
        {links.map(([label, path]) => (
          <NavLink key={path} to={path}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions header-navigation">
        <span className="launch-label">
          <i /> LAGOS, WE’RE COMING.
        </span>
        <Button to="/waitlist">GET AIRDASH</Button>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {[
          ...links,
          ['Tether delivery', '/tether-delivery'],
          ['Communities', '/communities'],
          ['Safety', '/safety'],
          ['About', '/about'],
          ['Help', '/help'],
          ['Contact', '/contact'],
        ].map(([label, path]) => (
          <NavLink key={path} to={path}>
            {label}
            <span aria-hidden="true">↗</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
