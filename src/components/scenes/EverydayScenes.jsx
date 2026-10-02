import { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import {
  Aircraft,
  Button,
  ImageReveal,
  Media,
  SceneLabel,
  SplitTextReveal,
} from '../motion/Primitives'
import { gsap, sceneTimeline, useScene } from '../motion/animation'
export function FoodGallery() {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      const rail = select('.gallery-rail')[0]
      const tl = sceneTimeline(ref.current, ctx.conditions.mobile ? 1 : 1.4)
      tl.to(rail, {
        x: () => -Math.max(0, rail.scrollWidth - ref.current.clientWidth + 32),
        duration: 1,
      })
      const revealFocusedLink = (event) => {
        if (event.target.closest('.gallery-categories a')) window.scrollTo(0, tl.scrollTrigger.end)
      }
      ref.current.addEventListener('focusin', revealFocusedLink)
      return () => ref.current?.removeEventListener('focusin', revealFocusedLink)
    }, []),
  )
  return (
    <section className="food-gallery" ref={ref}>
      <div className="gallery-heading">
        <SceneLabel number="07">MORE OF WHAT YOU LOVE</SceneLabel>
        <SplitTextReveal>
          WHATEVER
          <br />
          YOU’RE CRAVING.
        </SplitTextReveal>
        <p>
          The lunchtime favourite. The last-minute essential.
          <br />
          Your everyday, with a little more possibility.
        </p>
      </div>
      <div className="gallery-rail">
        <figure className="gallery-feature">
          <Media name="food" />
          <figcaption>
            <span>01 / FOOD</span>
            <strong>
              Worth the craving.
              <br />
              Without the wait.
            </strong>
          </figcaption>
        </figure>
        <figure className="gallery-human">
          <Media name="merchant" />
          <figcaption>
            <span>02 / YOUR LOCAL FAVOURITES</span>
            <strong>
              From good hands.
              <br />
              To yours.
            </strong>
          </figcaption>
        </figure>
        <div className="gallery-categories">
          <p className="eyebrow">WHAT’S ON YOUR LIST?</p>
          {['Food', 'Groceries', 'Pharmacy', 'Drinks', 'Convenience'].map((item, index) => (
            <Link to="/waitlist" key={item}>
              <small>0{index + 1}</small>
              {item}
              <ArrowUpRight />
            </Link>
          ))}
          <p>
            Selection will vary by location.
            <br />
            Be first to hear what’s coming.
          </p>
        </div>
      </div>
    </section>
  )
}
export function CoverageScene() {
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  const submit = (event) => {
    event.preventDefault()
    navigate(`/coverage${address.trim() ? `?address=${encodeURIComponent(address.trim())}` : ''}`)
  }
  return (
    <section className="coverage-scene" id="coverage">
      <div className="coverage-copy">
        <SceneLabel number="08">CLOSER THAN YOU THINK</SceneLabel>
        <SplitTextReveal>
          IS AIRDASH
          <br />
          NEAR YOU?
        </SplitTextReveal>
        <p>
          A new kind of neighbourhood delivery.
          <br />
          See what’s on the horizon for yours.
        </p>
        <form className="coverage-form" onSubmit={submit}>
          <label htmlFor="home-address">Your neighbourhood or address</label>
          <div>
            <MapPin size={20} />
            <input
              id="home-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Where in Lagos are you?"
              autoComplete="street-address"
              maxLength={200}
            />
            <button type="submit" aria-label="Check availability">
              <ArrowUpRight />
            </button>
          </div>
          <button className="text-link coverage-submit" type="submit">
            CHECK AVAILABILITY <ArrowUpRight size={15} />
          </button>
        </form>
      </div>
      <div className="coverage-map" aria-hidden="true">
        <svg viewBox="0 0 650 600">
          <defs>
            <pattern
              id="streets"
              width="76"
              height="60"
              patternTransform="rotate(-26)"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 0H76V60H0Z" fill="none" stroke="#c3c8b9" strokeWidth="1" />
              <path d="M28 0V60M0 22H76" stroke="#d6d9cf" fill="none" />
            </pattern>
          </defs>
          <path d="M0 0H650V600H0Z" fill="url(#streets)" />
          <path d="M360-20Q310 160 455 240T330 640H690V-20Z" fill="#e1e8d5" />
          <path
            d="M-20 490 100 370 270 360 350 240 490 260 590 150"
            fill="none"
            stroke="#fff"
            strokeWidth="12"
          />
          <circle
            className="coverage-halo"
            cx="275"
            cy="290"
            r="150"
            fill="#B7F34A"
            fillOpacity=".12"
            stroke="#82B72B"
            strokeDasharray="3 9"
          />
          <circle cx="275" cy="290" r="9" fill="#34451C" />
          <text x="235" y="330">
            LAGOS
          </text>
          <text x="438" y="430" className="map-water-label">
            LAGOON
          </text>
        </svg>
        <span className="map-caption">A NEW CONNECTION IS COMING.</span>
        <small>Illustrative map · service areas to be confirmed</small>
      </div>
    </section>
  )
}
export function PartnerPathways() {
  return (
    <section className="partner-pathways" aria-label="Partner with AirDash">
      {[
        {
          label: 'FOR MERCHANTS',
          caption: 'Your next customer is closer than you think.',
          image: 'merchant',
          to: '/merchants',
        },
        {
          label: 'FOR COMMUNITIES',
          caption: 'Bring a little more possibility home.',
          image: 'compound',
          to: '/communities',
        },
      ].map((item) => (
        <Link to={item.to} className="partner-link" key={item.to}>
          <ImageReveal name={item.image} />
          <div className="partner-overlay">
            <span className="eyebrow">09 / BETTER, TOGETHER</span>
            <div>
              <h2>{item.label}</h2>
              <ArrowUpRight size={38} />
            </div>
            <p>{item.caption}</p>
          </div>
        </Link>
      ))}
    </section>
  )
}
export function ClosingScene() {
  const ref = useRef(null)
  useScene(
    ref,
    useCallback((ctx, select) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 70%', scrub: 0.8 },
      })
      tl.fromTo(
        select('.closing-path'),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1 },
      ).fromTo(
        select('.closing-aircraft'),
        { xPercent: -35, yPercent: 30, rotation: -8 },
        { xPercent: 20, yPercent: -15, rotation: 5, duration: 1 },
        0,
      )
    }, []),
  )
  return (
    <section className="closing-scene" ref={ref}>
      <SceneLabel number="10" light>
        YOUR EVERYDAY. ELEVATED.
      </SceneLabel>
      <h2>
        SKIP THE TRAFFIC.
        <br />
        <span>TAKE THE SKY.</span>
      </h2>
      <svg viewBox="0 0 1200 550" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="closing-path"
          pathLength="1"
          d="M-80 500C100 260 900 620 1000 275S910 30 1250 50"
        />
      </svg>
      <Aircraft className="closing-aircraft" />
      <div className="closing-bottom">
        <p>Life’s too good to spend it waiting.</p>
        <Button to="/waitlist">GET AIRDASH</Button>
      </div>
    </section>
  )
}
