import { useEffect } from 'react'
import HeroRouteScene from '../components/scenes/HeroRouteScene'
import DestinationAppScene from '../components/scenes/DestinationAppScene'
import FlightScene from '../components/scenes/FlightScene'
import TetherSequence from '../components/scenes/TetherSequence'
import {
  ClosingScene,
  CoverageScene,
  FoodGallery,
  PartnerPathways,
} from '../components/scenes/EverydayScenes'
export default function Home() {
  useEffect(() => {
    document.title = 'AirDash — Delivery without the traffic.'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'Your favourites. Your doorstep. A straight line through the sky. Discover a new way to deliver with AirDash in Lagos.',
      )
  }, [])
  return (
    <main id="main" tabIndex={-1}>
      <HeroRouteScene />
      <DestinationAppScene />
      <FlightScene />
      <TetherSequence />
      <FoodGallery />
      <CoverageScene />
      <PartnerPathways />
      <ClosingScene />
    </main>
  )
}
