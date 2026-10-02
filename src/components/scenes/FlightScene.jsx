import { useCallback, useRef } from 'react'
import { Aircraft, Media, SceneLabel } from '../motion/Primitives'
import { gsap, sceneTimeline, useScene } from '../motion/animation'
export default function FlightScene() {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      const tl = sceneTimeline(ref.current, ctx.conditions.mobile ? 1.1 : 1.5)
      gsap.set(select('.flight-status span:not(:first-child)'), { autoAlpha: 0 })
      tl.fromTo(
        select('.flight-aircraft'),
        { xPercent: -35, yPercent: 20, rotation: -9 },
        { xPercent: 20, yPercent: -8, rotation: 3, duration: 3 },
      )
        .fromTo(
          select('.flight-media'),
          { scale: 1.1, xPercent: -3 },
          { scale: 1.2, xPercent: 3, duration: 3 },
          0,
        )
        .to(select('.flight-heading'), { yPercent: -12, duration: 3 }, 0)
      for (let i = 1; i < 4; i++) {
        tl.to(
          select(`.flight-status span:nth-child(${i})`),
          { autoAlpha: 0, duration: 0.1 },
          i * 0.75,
        ).to(
          select(`.flight-status span:nth-child(${i + 1})`),
          { autoAlpha: 1, duration: 0.1 },
          i * 0.75 + 0.1,
        )
      }
    }, []),
  )
  return (
    <section className="flight-scene scene" ref={ref} id="fleet">
      <Media name="lagos" className="flight-media" />
      <div className="flight-shade" />
      <div className="flight-heading">
        <SceneLabel number="05" light>
          A LITTLE ABOVE THE EVERYDAY
        </SceneLabel>
        <h2>
          YOUR DASH
          <br />
          IS <em>AIRBORNE.</em>
        </h2>
      </div>
      <Aircraft className="flight-aircraft" />
      <div className="flight-bottom">
        <p>
          Over the hold-ups.
          <br />
          On with your day.
        </p>
        <div className="flight-status" aria-hidden="true">
          {['AIRBORNE', '8 MIN', '6 MIN', 'APPROACHING'].map((text) => (
            <span key={text}>
              <i />
              {text}
            </span>
          ))}
        </div>
        <small>Illustrative journey</small>
      </div>
      <p className="sr-only">
        Follow your delivery from airborne to approaching your drop spot in the app. Times shown are
        illustrative.
      </p>
    </section>
  )
}
