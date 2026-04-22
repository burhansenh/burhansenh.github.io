import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Burhan Kara</h1>

        <p>
          Aspiring engineer studying computer engineering at Illinois Tech.
          I enjoy writing firmware for embedded systems, especially when it
          involves controlling something that moves. Currently at Siemens
          Healthineers working on medical imaging firmware.
        </p>

        <div className="landing-links">
          <Link to="/experience">Experience</Link>
          <span className="sep" />
          <Link to="/projects">Projects</Link>
          <span className="sep" />
          <Link to="/about">About</Link>
          <span className="sep" />
          <a href="https://github.com/burhansenh" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="sep" />
          <a href="https://www.linkedin.com/in/burhan-s-kara/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="sep" />
          <a href="mailto:burhansenih@gmail.com">Email</a>
        </div>
      </div>
    </div>
  )
}
