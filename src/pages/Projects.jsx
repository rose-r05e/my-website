import { Link } from "react-router-dom";
import "./Projects.css";

export default function Projects() {
  const projects = [
    {
      id: "simplegame",
      title: "Having fun with JavaScript",
      description: "JavaScript framework made for handling Cartesian geometry in 2d and a demo game using it.",
    },
    {
      id: "stardust",
      title: "Stardust GroundStation",
      description: "Ground control and telemetry software for the Stardust stratospheric experiment, developed for the BEXUS programme.",
    },
  ];

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="project-card"
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
