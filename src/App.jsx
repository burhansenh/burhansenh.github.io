import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import About from './pages/About'
import JetEngine from './pages/projects/JetEngine'
import SoArm101 from './pages/projects/SoArm101'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/jet-engine" element={<JetEngine />} />
          <Route path="/projects/so-arm101" element={<SoArm101 />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
