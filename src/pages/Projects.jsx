import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

const PROJECTS = [
  {
    id: "simplegame",
    title: "Having fun with JavaScript",
    description: "JavaScript framework made for handling Cartesian geometry in 2d and a demo game using it.",
    type: "uncommercial",
    image: null,
  },
  {
    id: "stardust",
    title: "Stardust GroundStation",
    description: "Ground control and telemetry software for the Stardust stratospheric experiment, developed for the BEXUS programme.",
    type: "uncommercial",
    image: null,
  },
  {
    id: "woocommerce-extension",
    title: "Personalized Product Designer",
    description: "WooCommerce extension that allows customers to design custom products with text and images using Fabric.js canvas.",
    type: "commercial",
    image: null,
  },
  {
    id: "anpr-system",
    title: "ANPR System",
    description: "Automatic Number Plate Recognition system for vehicle license plate detection and OCR reading with performance analysis.",
    type: "uncommercial",
    image: null,
  },
];

export default function Projects() {
  const [sortByName, setSortByName] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("all");

  const visibleProjects = useMemo(() => {
    const filteredProjects =
      typeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.type === typeFilter);

    return [...filteredProjects].sort((projectA, projectB) => {
      if (sortByName === "desc") {
        return projectB.title.localeCompare(projectA.title);
      }

      return projectA.title.localeCompare(projectB.title);
    });
  }, [sortByName, typeFilter]);

  return (
    <div className="page projects-page">
      <header className="page-header">
        <h1>My Projects</h1>
      </header>

      <div className="projects-controls">
        <label className="projects-control">
          <span>Sort by name</span>
          <select
            value={sortByName}
            onChange={(event) => setSortByName(event.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>

        <label className="projects-control">
          <span>Type</span>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">All</option>
            <option value="commercial">Commercial</option>
            <option value="noncommercial">Uncommercial</option>
          </select>
        </label>
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="section project-section"
          >
            <div className="project-thumbnail">
              {project.image ? (
                <img src={project.image} alt={`${project.title} preview`} />
              ) : (
                <div className="project-thumbnail-inner" aria-hidden="true">IMG</div>
              )}
            </div>

            <div className="project-content">
              <h3 className="section-header">{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
