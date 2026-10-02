import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import InformationPage from './pages/InformationPage'
import { SmoothScrollProvider, PageTransition } from './components/motion/NavigationMotion'
import { pages } from './data/pages'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <PageTransition />
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.keys(pages).map((path) => (
            <Route key={path} path={path} element={<InformationPage page={pages[path]} />} />
          ))}
          <Route
            path="*"
            element={
              <InformationPage
                page={{
                  title: 'A LITTLE OFF COURSE.',
                  label: '404 / PAGE NOT FOUND',
                  intro: 'Let’s get you back to the right destination.',
                  cta: 'BACK TO AIRDASH',
                  to: '/',
                }}
              />
            }
          />
        </Routes>
        <Footer />
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
