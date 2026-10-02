export default function Intro({ onComplete }) {
  return <div className="intro-screen" role="status" aria-label="Loading AirDash">
    <video className="intro-video" autoPlay muted playsInline onEnded={onComplete} onError={onComplete}>
      <source src="/airdash-intro.mp4" type="video/mp4" />
    </video>
    <button className="intro-skip" onClick={onComplete}>SKIP INTRO</button>
  </div>
}
