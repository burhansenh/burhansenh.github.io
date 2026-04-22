import { Link } from 'react-router-dom'

export default function Projects() {
  const projects = [
    {
      title: 'SO-ARM101 Robotic Manipulator',
      path: '/projects/so-arm101',
      image: '/images/so-arm101/IMG_0409.jpeg',
      desc: 'Trained a robot arm to pick and place objects autonomously using imitation learning. Built a leader follower teleoperation rig, collected 50 demonstration episodes, and trained an ACT policy that runs at 30Hz on a Jetson Orin Nano.',
      status: 'Active',
    },
    {
      title: 'Jet Engine Controller',
      path: '/projects/jet-engine',
      image: '/images/jet-engine/IMG_0287.JPG',
      desc: 'Custom ECU firmware in C for a miniature turbojet engine. Finite state machine architecture with safety interlocks, fuel pump control, and RC input parsing.',
      status: 'In progress',
    },
  ]

  return (
    <div className="container page">
      <h1>Projects</h1>

      <div className="project-list">
        {projects.map((p, i) => (
          <Link to={p.path} className="project-item" key={i}>
            <div className="project-item-image">
              <img src={p.image} alt={p.title} />
            </div>
            <div className="project-item-info">
              <h2>{p.title}</h2>
              <p>{p.desc}</p>
              <span className="card-status">{p.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
