import { useCallback, useRef } from 'react'
import { Check, MapPin, ShoppingBag, Utensils, ArrowUpRight } from 'lucide-react'
import { Aircraft, Media, SceneLabel } from '../motion/Primitives'
import { gsap, sceneTimeline, useScene } from '../motion/animation'
const states = [
  {
    label: 'CHECKOUT',
    title: 'A little joy. On its way.',
    copy: 'Jollof, grilled chicken & plantain',
    Icon: ShoppingBag,
  },
  {
    label: 'ORDER CONFIRMED',
    title: 'Leave the rest to us.',
    copy: 'Your order is with the restaurant.',
    Icon: Check,
  },
  {
    label: 'MERCHANT PREPARING',
    title: 'Good things take care.',
    copy: 'Freshly made. Carefully packed.',
    Icon: Utensils,
  },
  {
    label: 'READY FOR AIRDASH',
    title: 'Next stop. Your place.',
    copy: 'Your delivery is ready to take flight.',
    Icon: ArrowUpRight,
  },
]
export default function DestinationAppScene() {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      const frame = select('.destination-frame')[0]
      const phone = select('.phone-shell')[0]
      // Own percentage centering explicitly so GSAP cannot retain stale pixel offsets on resize.
      gsap.set(phone, { xPercent: -50, yPercent: -50, x: 0, y: 0 })
      // The same full-screen image is clipped into a phone screen. No image swap.
      const inset = () => {
        const h = ref.current.clientHeight
        const halfHeight = phone.offsetHeight / 2
        const side = (ref.current.clientWidth - phone.offsetWidth) / 2
        return `${phone.offsetTop - halfHeight}px ${side}px ${h - phone.offsetTop - halfHeight}px ${side}px round 34px`
      }
      gsap.set(
        select(
          '.phone-shell, .phone-state, .app-copy, .drop-status-checking, .drop-status-good, .app-exit-aircraft',
        ),
        { autoAlpha: 0 },
      )
      gsap.set(select('.drop-pin'), { scale: 0.5, autoAlpha: 0 })
      const tl = sceneTimeline(ref.current, ctx.conditions.mobile ? 3.6 : 4.2)
      tl.fromTo(select('.destination-media'), { scale: 1.3 }, { scale: 1, duration: 0.8 })
        .to(
          select('.drop-pin'),
          { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(1.3)' },
          0.3,
        )
        .to(select('.drop-status-initial'), { autoAlpha: 0, duration: 0.15 }, 0.8)
        .to(select('.drop-status-checking'), { autoAlpha: 1, duration: 0.15 }, 0.9)
        .to(select('.drop-status-checking'), { autoAlpha: 0, duration: 0.15 }, 1.35)
        .to(select('.drop-status-good'), { autoAlpha: 1, duration: 0.2 }, 1.5)
        .to(select('.destination-heading'), { y: -50, autoAlpha: 0, duration: 0.4 }, 1.8)
        .to(frame, { clipPath: () => `inset(${inset()})`, duration: 1, ease: 'power2.inOut' }, 1.9)
        .to(select('.destination-media'), { scale: 1.1, duration: 1 }, 1.9)
        .to(select('.drop-pin'), { y: -30, scale: 0.75, duration: 1 }, 1.9)
        .to(select('.phone-shell'), { autoAlpha: 1, duration: 0.4 }, 2.55)
        .to(select('.app-copy'), { autoAlpha: 1, duration: 0.4 }, 2.65)
        .to(select('.drop-pin'), { autoAlpha: 0, duration: 0.25 }, 3)
      states.forEach((_, i) => {
        const start = 3 + i * 0.72
        tl.fromTo(
          select(`.phone-state-${i}`),
          { y: 35, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3 },
          start,
        )
        if (i < states.length - 1)
          tl.to(select(`.phone-state-${i}`), { y: -25, autoAlpha: 0, duration: 0.2 }, start + 0.62)
      })
      tl.to(
        select('.destination-frame, .app-copy'),
        { yPercent: -18, autoAlpha: 0, duration: 0.55 },
        6.05,
      )
        .to(phone, { yPercent: -68, autoAlpha: 0, duration: 0.55 }, 6.05)
        .fromTo(
          select('.app-exit-aircraft'),
          { yPercent: 60, scale: 0.65, autoAlpha: 0 },
          { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.65 },
          6.15,
        )
    }, []),
  )
  return (
    <section
      ref={ref}
      className="destination-app scene"
      id="mission"
      aria-label="Choose your drop spot and order in the AirDash app"
    >
      <div className="destination-frame">
        <Media name="compound" className="destination-media" />
        <div className="destination-shade" />
      </div>
      <div className="destination-heading">
        <SceneLabel number="03" light>
          YOUR PLACE. YOUR DROP SPOT.
        </SceneLabel>
        <h2>
          CHOOSE EXACTLY
          <br />
          WHERE IT ARRIVES.
        </h2>
      </div>
      <div className="drop-pin" aria-hidden="true">
        <div className="pin-rings">
          <MapPin size={32} />
        </div>
        <div className="drop-status">
          <span className="drop-status-initial">DROP SPOT</span>
          <span className="drop-status-checking">CHECKING LOCATION…</span>
          <span className="drop-status-good">
            GOOD DROP SPOT <Check size={14} />
          </span>
        </div>
      </div>
      <div className="app-copy">
        <SceneLabel number="04">A FEW TAPS. THEN TAKE IT EASY.</SceneLabel>
        <h2>
          YOUR DAY.
          <br />
          ON DEMAND.
        </h2>
        <p>
          Pick your favourites. Pin your spot.
          <br />
          We’ll take it from there.
        </p>
        <span className="eyebrow">ONE APP. A WHOLE NEW WAY.</span>
      </div>
      <div className="phone-shell" aria-label="Illustrative AirDash app screens">
        <div className="phone-island" />
        <div className="phone-top">
          <strong>airdash</strong>
          <span>9:41</span>
        </div>
        <div className="phone-drop-caption">
          Your drop spot <Check size={16} />
        </div>
        {states.map(({ label, title, copy, Icon }, i) => (
          <div className={`phone-state phone-state-${i}`} key={label}>
            <div className="phone-state-icon">
              <Icon size={30} />
            </div>
            <span className="eyebrow">{label}</span>
            <h3>{title}</h3>
            {i === 0 && <Media name="food" sizes="300px" />}
            <p>{copy}</p>
            <div className="phone-state-footer">
              <span>YOUR EVERYDAY. ELEVATED.</span>
              <i />
            </div>
          </div>
        ))}
        <div className="phone-home-bar" />
      </div>
      <Aircraft className="app-exit-aircraft" />
      <div className="static-story">
        <p>Choose an open drop spot. The app checks your location before checkout.</p>
        <ol>
          {states.map(({ label, copy }) => (
            <li key={label}>
              <strong>{label}</strong> — {copy}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
