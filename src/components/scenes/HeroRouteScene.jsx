import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import SplitType from 'split-type'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Aircraft, Button, Media, SceneLabel } from '../motion/Primitives'
import { gsap, sceneTimeline, useScene } from '../motion/animation'
import { media } from '../../data/media'
import { useScrollTo } from '../motion/NavigationMotion'

export default function HeroRouteScene() {
  const ref = useRef(null)
  const timelineRef = useRef(null)
  const scrollTo = useScrollTo()
  useScene(
    ref,
    useCallback((ctx, select) => {
      const split = new SplitType(select('h1')[0], { types: 'lines,words' })
      const opening = gsap.timeline({ defaults: { ease: 'power3.out' } })
      opening
        .from(
          select('.city-image'),
          { clipPath: 'inset(8% 5% 8% 5% round 24px)', scale: 1.08, duration: 1.3 },
          0,
        )
        .from(split.words, { yPercent: 110, duration: 0.8, stagger: 0.045 }, 0.15)
        .from(select('.hero-detail > *'), { opacity: 0, y: 12, duration: 0.6 }, 0.65)
        .from(
          select('.hero-aircraft img'),
          { opacity: 0, xPercent: -12, yPercent: 10, duration: 1.1 },
          0.4,
        )
        .from(select('.hero-route-line'), { strokeDashoffset: 1, duration: 0.9 }, 0.55)
      gsap.set(select('.route-copy, .route-comparison, .route-map, .destination-preview'), {
        autoAlpha: 0,
      })
      gsap.set(select('.road-path, .direct-path'), { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(select('.direct-copy'), { autoAlpha: 0, y: 32 })
      const timeline = sceneTimeline(ref.current, ctx.conditions.mobile ? 2.6 : 3.4)
      timelineRef.current = timeline
      timeline
        .to({}, { duration: 0.2 })
        .to(select('.hero-copy'), { yPercent: -35, autoAlpha: 0, duration: 0.55 }, 0.2)
        .to(
          select('.hero-detail, .hero-bottom, .hero-route-line'),
          { autoAlpha: 0, duration: 0.25 },
          0.2,
        )
        .to(select('.city-frame'), { scale: 0.94, borderRadius: 28, duration: 0.7 }, 0.25)
        .to(select('.city-image'), { scale: 1.13, yPercent: -2, duration: 1.4 }, 0.3)
        .to(
          select('.hero-aircraft'),
          { xPercent: 38, yPercent: -28, scale: 0.4, autoAlpha: 0, duration: 0.8 },
          0.3,
        )
        .to(
          select('.route-copy, .route-map, .route-comparison'),
          { autoAlpha: 1, duration: 0.3 },
          0.85,
        )
        .to(select('.road-path'), { strokeDashoffset: 0, duration: 0.8 }, 1)
        .to(select('.road-copy'), { y: -32, autoAlpha: 0, duration: 0.3 }, 1.9)
        .to(select('.direct-copy'), { y: 0, autoAlpha: 1, duration: 0.35 }, 2)
        .to(select('.road-path'), { opacity: 0.28, duration: 0.4 }, 2)
        .to(select('.direct-path'), { strokeDashoffset: 0, duration: 1 }, 2)
        .fromTo(select('.route-dot'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 2)
        .to(
          select('.route-dot'),
          {
            motionPath: {
              path: select('.direct-path')[0],
              align: select('.direct-path')[0],
              alignOrigin: [0.5, 0.5],
            },
            duration: 1,
          },
          2,
        )
        .to(select('.route-copy, .route-comparison'), { autoAlpha: 0, y: -30, duration: 0.3 }, 3.2)
        .to(select('.city-frame'), { scale: 1, borderRadius: 0, duration: 0.65 }, 3.2)
        .to(
          select('.city-image, .route-map'),
          { scale: 2.7, transformOrigin: '76% 60%', duration: 0.8, ease: 'power2.inOut' },
          3.25,
        )
        .to(select('.destination-preview'), { autoAlpha: 1, duration: 0.7 }, 3.45)
      return () => {
        timelineRef.current = null
        opening.kill()
        split.revert()
      }
    }, []),
  )
  return (
    <section
      className="hero-route scene"
      ref={ref}
      id="top"
      aria-label="Delivery without the traffic"
    >
      <div className="city-frame">
        <Media name="lagos" className="city-image" priority />
        <div className="city-shade" />
        <Media name="compound" className="destination-preview" />
        <svg
          className="route-map"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="road-path"
            pathLength="1"
            d="M190 510 320 510 320 410 460 410 460 550 610 550 610 310 770 310 770 420"
          />
          <path className="direct-path" pathLength="1" d="M190 510 L770 420" />
          <image className="route-dot" href={media.aircraft} width="100" height="67" />
          <circle className="route-endpoint" cx="770" cy="420" r="17" />
          <circle className="route-endpoint" cx="190" cy="510" r="9" />
        </svg>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> EVERYDAY DELIVERY. AN ENTIRELY NEW WAY.
        </p>
        <h1>
          DELIVERY
          <br />
          WITHOUT
          <br />
          <span className="hero-last">THE TRAFFIC.</span>
        </h1>
        <div className="hero-detail">
          <p>
            Your favourites. Your doorstep.
            <br />A straight line through the sky.
          </p>
          <div className="hero-buttons">
            <Button to="/waitlist">GET AIRDASH</Button>
            <Link className="text-link" to="/how-it-works">
              See how it works <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
      <svg
        className="hero-flight-path"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="hero-route-line"
          pathLength="1"
          d="M750 1000 C730 720 1200 830 1240 490 S990 320 1110 250"
        />
      </svg>
      <div className="hero-aircraft">
        <Aircraft loading="eager" />
        <span className="aircraft-caption">
          <i /> A NEW WAY TO MOVE.
        </span>
      </div>
      <div className="hero-bottom">
        <a
          href="#route"
          className="scroll-cue"
          onClick={(event) => {
            const trigger = timelineRef.current?.scrollTrigger
            if (trigger) {
              event.preventDefault()
              event.stopPropagation()
              scrollTo(trigger.start + (trigger.end - trigger.start) * 0.35)
            }
          }}
        >
          <ArrowDown size={16} /> SCROLL TO TAKE FLIGHT
        </a>
        <span className="hero-location">
          6.4541° N &nbsp; 3.3947° E <span>LAGOS, NIGERIA</span>
        </span>
        <span className="edition">01 — THE EVERYDAY, ELEVATED</span>
      </div>
      <div className="route-copy" id="route">
        <SceneLabel number="02" light>
          THE SHORTER STORY
        </SceneLabel>
        <h2>
          <span className="road-copy">
            ROADS GO
            <br />
            AROUND.
          </span>
          <span className="direct-copy">
            AIRDASH
            <br />
            <em>GOES DIRECT.</em>
          </span>
        </h2>
      </div>
      <div className="route-comparison">
        <span>
          <i className="road-key" /> The road has its own plans.
        </span>
        <span>
          <i className="air-key" /> We take a different route.
        </span>
        <small>Illustrative route</small>
      </div>
      <p className="sr-only">
        Road journeys wind through traffic. AirDash takes a direct route toward your chosen drop
        spot.
      </p>
    </section>
  )
}
