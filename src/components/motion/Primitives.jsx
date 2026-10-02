import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SplitType from 'split-type'
import { gsap, useScene } from './animation'
import { media } from '../../data/media'
export function Button({ to, children, variant = 'lime', className = '', ...props }) {
  const ref = useRef(null)
  const move = (event) => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty(
      '--mx',
      `${((event.clientX - r.left - r.width / 2) / r.width) * 8}px`,
    )
    ref.current.style.setProperty(
      '--my',
      `${((event.clientY - r.top - r.height / 2) / r.height) * 8}px`,
    )
  }
  const reset = () => {
    ref.current.style.setProperty('--mx', '0px')
    ref.current.style.setProperty('--my', '0px')
  }
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </>
  )
  const attributes = {
    ref,
    className: `button button--${variant} ${className}`,
    onPointerMove: move,
    onPointerLeave: reset,
    ...props,
  }
  return to ? (
    <Link to={to} {...attributes}>
      {content}
    </Link>
  ) : (
    <button {...attributes}>{content}</button>
  )
}
export function SplitTextReveal({ as: Tag = 'h2', children, className = '' }) {
  const ref = useRef(null)
  const setup = useCallback(() => {
    const split = new SplitType(ref.current, { types: 'lines,words' })
    gsap.from(split.words, {
      yPercent: 112,
      duration: 0.85,
      stagger: 0.025,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    })
    return () => split.revert()
  }, [])
  useScene(ref, setup)
  return (
    <Tag ref={ref} className={`split-heading ${className}`}>
      {children}
    </Tag>
  )
}
export function Media({ name, className = '', priority = false, sizes = '100vw', ...props }) {
  return (
    <img
      {...media[name]}
      className={className}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      width="1680"
      height="945"
      {...props}
    />
  )
}
export function ImageReveal({ name, className = '', children }) {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      gsap.fromTo(
        select('img'),
        { yPercent: -4, scale: 1.1 },
        {
          yPercent: ctx.conditions.mobile ? 2 : 5,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, []),
  )
  return (
    <div ref={ref} className={`image-reveal ${className}`}>
      <Media name={name} />
      {children}
    </div>
  )
}
export function Aircraft({ className = '', ...props }) {
  return (
    <img
      src={media.aircraft}
      alt=""
      className={`aircraft ${className}`}
      width="1100"
      height="733"
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
export function SceneLabel({ number, children, light = false }) {
  return (
    <p className={`eyebrow scene-label ${light ? 'light' : ''}`}>
      <span className="tiny-cross">+</span>
      <span>
        {number} / {children}
      </span>
    </p>
  )
}
