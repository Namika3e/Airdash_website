import { Link } from 'react-router-dom'
import { Wordmark } from './Header'
export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <Link to="/" aria-label="AirDash home">
          <Wordmark />
        </Link>
        <p>
          A little less waiting.
          <br />A lot more living.
        </p>
        <nav aria-label="Footer navigation">
          <div>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/tether-delivery">Tether delivery</Link>
            <Link to="/coverage">Check coverage</Link>
            <Link to="/safety">Safety</Link>
          </div>
          <div>
            <Link to="/merchants">Merchants</Link>
            <Link to="/communities">Communities</Link>
            <Link to="/about">About AirDash</Link>
          </div>
          <div>
            <Link to="/help">Help</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/waitlist">Get AirDash ↗</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AirDash. All rights reserved.</span>
        <span>BUILT FOR LIFE IN LAGOS.</span>
        <a href="#main">BACK TO TOP ↑</a>
      </div>
    </footer>
  )
}
