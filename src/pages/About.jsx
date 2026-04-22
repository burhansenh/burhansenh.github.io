export default function About() {
  return (
    <div className="container page">
      <h1>About</h1>

      <figure className="about-photo">
        <img src="/images/about-me/DSC08203.JPG" alt="Burhan Senhuseyin" />
      </figure>

      <p>
        I am a computer engineering student at Illinois Institute of Technology,
        graduating December 2027. I love writing code that makes physical things
        move — motor controllers, robotic arms, jet engines. Most of my work
        lives at the boundary between firmware and hardware, where the software
        has to deal with real sensors, real actuators, and real timing constraints.
      </p>

      <p>
        At Siemens Healthineers I write motion control firmware for medical
        imaging scanners, and at the University of Akron's CAVES Lab I work on
        embedded motor control for EV drivetrains. On my own time I build
        projects like a teleoperated robot arm trained with imitation learning
        and a custom ECU for a miniature turbojet.
      </p>

      <p>
        Outside of work I enjoy riding my motorcycle and volunteering with
        Embrace Relief, a humanitarian aid organization. I traveled to Greece
        in 2021 for a service trip and will be heading to Tanzania in summer 2026.
      </p>
    </div>
  )
}
