import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Gauge, PackageCheck, Radio, Weight } from 'lucide-react'

const drones = [
  { name: 'Dart V-2', eyebrow: '01 / SPEED COURIER', headline: 'Built to beat the traffic.', copy: 'The Dart V-2 is our nimble, time-critical courier. It flies compact payloads across the city in a fraction of the road journey.', payload: '2.5 kg', range: '20 km', speed: '120 km/h', accent: '#f36b30', tint: '#e9f7ff', className: 'drone-dart' },
  { name: 'Goliath X-1', eyebrow: '02 / HEAVY LIFT', headline: 'Power for the bigger jobs.', copy: 'The Goliath X-1 pairs a reinforced airframe with a high-capacity battery system to move heavier shipments with certainty.', payload: '5.0 kg', range: '45 km', speed: '85 km/h', accent: '#ffc233', tint: '#fff1c7', className: 'drone-goliath' },
]

function Drone({ drone }) {
  return <div className={`showcase-drone ${drone.className}`} style={{ '--drone-accent': drone.accent }} aria-label={`${drone.name} drone illustration`} role="img">
    <span className="drone-light drone-light-one" /><span className="drone-light drone-light-two" />
    <div className="drone-arm drone-arm-a" /><div className="drone-arm drone-arm-b" />
    {['one', 'two', 'three', 'four'].map(rotor => <span className={`rotor rotor-${rotor}`} key={rotor}><i /></span>)}
    <div className="drone-body"><span className="drone-window" /><span className="drone-stripe" /></div><div className="drone-shadow" />
  </div>
}

function Specs({ drone }) {
  const specs = [[PackageCheck, drone.payload, 'PAYLOAD'], [Gauge, drone.range, 'RANGE'], [Weight, drone.speed, 'CRUISE']]
  return <div className="mt-7 grid grid-cols-3 divide-x divide-[#0c3654]/20 border-y border-[#0c3654]/20 py-4">{specs.map(([Icon, value, label]) => <div className="pl-3 first:pl-0" key={label}><Icon size={16}/><b className="mt-2 block text-sm">{value}</b><span className="text-[9px] tracking-widest">{label}</span></div>)}</div>
}

function DroneStage({ drone, animation }) {
  return <div className={`fleet-stage fleet-stage-${animation}`}><div className="fleet-drone-wrap"><Drone drone={drone}/></div><article className="fleet-copy" style={{ backgroundColor: drone.tint }}><p className="text-[10px] font-bold tracking-[.2em] text-[#075b8b]">{drone.eyebrow}</p><h3 className="mt-4 text-4xl font-black leading-[.92] text-[#083d62] md:text-5xl">{drone.name}</h3><p className="mt-4 text-xl font-bold text-[#101010]">{drone.headline}</p><p className="mt-3 max-w-sm text-xs leading-relaxed text-[#24465b]">{drone.copy}</p><Specs drone={drone}/><button className="mt-6 rounded-full bg-[#0c5d91] px-5 py-3 text-[10px] font-bold tracking-wide text-white shadow-[2px_2px_0_#111]">EXPLORE {drone.name.toUpperCase()} <ArrowUpRight className="ml-1 inline" size={13}/></button></article></div>
}

export default function Fleet() {
  const sectionRef = useRef(null)
  const switchingRef = useRef(false)
  const [activeDrone, setActiveDrone] = useState(0)
  const [animation, setAnimation] = useState('in')
  const switchDrone = (nextIndex, direction) => {
    if (switchingRef.current) return
    switchingRef.current = true
    setAnimation(direction === 'down' ? 'out-left' : 'out-right')
    window.setTimeout(() => {
      setActiveDrone(nextIndex)
      setAnimation(direction === 'down' ? 'in-right' : 'in-left')
      window.setTimeout(() => { switchingRef.current = false }, 600)
    }, 430)
  }

  useEffect(() => {
    const isFleetVisible = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      return rect && rect.top < 110 && rect.bottom > window.innerHeight - 110
    }
    const pinFleet = () => window.scrollTo({ top: sectionRef.current.offsetTop, behavior: 'instant' })
    const handleWheel = event => {
      if (!isFleetVisible()) return
      if (switchingRef.current) { event.preventDefault(); return }
      if (event.deltaY > 0 && activeDrone === 0) { event.preventDefault(); pinFleet(); switchDrone(1, 'down') }
      if (event.deltaY < 0 && activeDrone === 1) { event.preventDefault(); pinFleet(); switchDrone(0, 'up') }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeDrone])

  const touchStart = event => { sectionRef.current.dataset.touchY = event.touches[0].clientY }
  const touchEnd = event => {
    const delta = Number(sectionRef.current.dataset.touchY) - event.changedTouches[0].clientY
    if (Math.abs(delta) < 45 || switchingRef.current) return
    if (delta > 0 && activeDrone === 0) { event.preventDefault(); switchDrone(1, 'down') }
    if (delta < 0 && activeDrone === 1) { event.preventDefault(); switchDrone(0, 'up') }
  }
  const drone = drones[activeDrone]
  return <section id="fleet" ref={sectionRef} onTouchStart={touchStart} onTouchEnd={touchEnd} className="fleet-scroll-section bg-[#eaf5f2]"><div className="flex min-h-screen items-center overflow-hidden px-5 py-20 md:px-9"><div className="fleet-grid absolute inset-0 opacity-50"/><div className="relative mx-auto w-full max-w-6xl"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[.22em] text-[#007d72]">AIRBORNE TECHNOLOGY</p><h2 className="mt-2 text-3xl font-black text-[#00528b] md:text-5xl">MEET THE FLEET</h2></div><div className="hidden items-center gap-2 text-[10px] font-bold text-[#00528b] sm:flex"><Radio size={14} className="animate-pulse"/> SCROLL TO DEPLOY</div></div><div className="fleet-stage-area mt-6"><DroneStage key={drone.name} drone={drone} animation={animation}/></div><div className="mt-5 flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#075b8b]"><span className="h-px w-16 bg-[#075b8b]"/><span>{drone.name.toUpperCase()} / ACTIVE</span><span className="ml-auto">{String(activeDrone + 1).padStart(2, '0')} / 02</span></div></div></div></section>
}
