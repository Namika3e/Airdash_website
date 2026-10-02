import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { Aircraft, Media, SceneLabel } from '../motion/Primitives'
import { gsap, sceneTimeline, useScene } from '../motion/animation'
export default function TetherSequence() {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      const distance = () => select('.tether-line')[0].offsetHeight
      gsap.set(select('.tether-line'), { scaleY: 0, transformOrigin: 'top' })
      gsap.set(select('.tether-second, .tether-wait, .tether-ready'), { autoAlpha: 0 })
      gsap.set(select('.tether-ground'), { yPercent: 35, opacity: 0.35 })
      const tl = sceneTimeline(ref.current, ctx.conditions.mobile ? 2.8 : 3.2, { scrub: 0.25 })
      // Timeline units are percentages of the complete descent. Package and cable share geometry.
      tl.from(select('.tether-aircraft'), { yPercent: -30, scale: 0.85, duration: 15 })
        .to(select('.tether-first'), { autoAlpha: 0, y: -25, duration: 12 }, 15)
        .fromTo(select('.tether-second'), { y: 25 }, { autoAlpha: 1, y: 0, duration: 12 }, 22)
        .to(select('.tether-line'), { scaleY: 0.15, duration: 20 }, 15)
        .to(select('.tether-package'), { y: () => distance() * 0.15, duration: 20 }, 15)
        .to(select('.tether-line'), { scaleY: 0.82, duration: 35 }, 35)
        .to(select('.tether-package'), { y: () => distance() * 0.82, duration: 35 }, 35)
        .to(select('.tether-ground'), { yPercent: 0, opacity: 1, duration: 15 }, 70)
        .to(select('.tether-line'), { scaleY: 1, duration: 22 }, 70)
        .to(select('.tether-package'), { y: distance, duration: 22 }, 70)
        .to(select('.drop-target'), { scale: 1.12, opacity: 1, duration: 15 }, 70)
        .to(select('.tether-lowering'), { autoAlpha: 0, duration: 0.2 }, 92)
        .to(select('.tether-wait'), { autoAlpha: 1, duration: 0.2 }, 92.2)
        .to(select('.tether-wait'), { autoAlpha: 0, duration: 0.2 }, 96)
        .to(select('.tether-ready'), { autoAlpha: 1, duration: 0.5 }, 96.2)
        .to(select('.tether-line'), { opacity: 0.15, duration: 3 }, 97)
    }, []),
  )
  return (
    <section
      ref={ref}
      className="tether-scene scene"
      id="tracking"
      aria-label="Tether delivery: the package lowers while the aircraft stays above"
    >
      <div className="tether-ground">
        <Media name="compound" />
        <div />
      </div>
      <div className="tether-copy">
        <SceneLabel number="06" light>
          A SOFTER LANDING
        </SceneLabel>
        <h2>
          <span className="tether-first">
            YOUR DELIVERY
            <br />
            COMES DOWN.
          </span>
          <span className="tether-second">
            THE AIRCRAFT
            <br />
            <em>DOESN’T.</em>
          </span>
        </h2>
        <p>
          A gentle descent. A precise drop.
          <br />
          The aircraft stays safely above.
        </p>
        <Link to="/tether-delivery" className="text-link">
          Explore tether delivery <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="tether-rig" aria-hidden="true">
        <Aircraft className="tether-aircraft" />
        <div className="tether-line" />
        <div className="tether-package">
          <span className="package-handle" />
          <span className="package-mark">
            airdash<span>↗</span>
          </span>
        </div>
        <div className="drop-target">
          <span />+
        </div>
      </div>
      <div className="tether-status" aria-hidden="true">
        <span className="tether-lowering">
          <i /> LOWERING YOUR DELIVERY
        </span>
        <span className="tether-wait">
          <i /> WAIT — PLEASE STAND CLEAR
        </span>
        <span className="tether-ready">
          <Check size={18} /> READY TO COLLECT
        </span>
      </div>
      <span className="tether-scroll eyebrow">YOUR SCROLL. THE FINAL FEW METRES. ↓</span>
      <p className="sr-only">
        The aircraft hovers above the drop spot and lowers the package on a tether. Stand clear
        during lowering. Wait for the app to say Ready to collect before approaching.
      </p>
    </section>
  )
}
