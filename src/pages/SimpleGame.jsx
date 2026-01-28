import { useRef } from 'react';
import "./SimpleGame.css";

export default function ProjectsPage() {
  const iframeRef = useRef(null);

  const handleRestart = () => {
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  };
  return (
    <div className="projects-page">
      <div className="projects-container">
        <header className="projects-header">
          <h1>Having fun with JavaScript</h1>
          <p className="subtitle">Here are a couple projects I've published on GitHub.</p>
        </header>

        {/* ───────────────────────────────────────────────────────── */}
        {/* Project 1 — cartesian2d-js */}
        <section className="project-card">
          <div className="project-icon">📐</div>
          <h2>cartesian2d-js</h2>
        <p>
          <strong>cartesian2d-js</strong> is a lightweight JavaScript utility
          library for working with Cartesian (2D) coordinate systems, vectors,
          and basic geometry.<br/>The `classes` folder in the repository contains
          foundational classes (e.g. vectors, points, shapes) intended to make
          math<br/>and transformations simpler when building canvas or game
          applications from scratch.
        </p>
        <p>
          It's ideal for browser-based simulations, games, or visual demos where
          you need a clean 2D coordinate API<br/>without bringing in a big graphics
          framework.
        </p>
        <a
          className="project-link btn-colored"
          href="https://github.com/rose-r05e/cartesian2d-js"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 View the cartesian2d-js repository on GitHub
        </a>
        </section>

        {/* ───────────────────────────────────────────────────────── */}
        {/* Project 2 — Evasive Maneuvers */}
        <section className="project-card">
          <div className="project-icon">🚀</div>
          <h2>Evasive Maneuvers</h2>
        <p>
          <strong>Evasive Maneuvers</strong> is a simple browser game built in JavaScript,
          HTML, and CSS. It uses my <strong>cartesian2d-js</strong> framework.<br/>
          You pilot a ship (the triangle) dodging asteroids and shooting as you go,
          trying to survive as long as possible.<br />
          Controls use ◀▲▼▶ for movement and SPACE to shoot.
        </p>

        <a
          className="project-link btn-colored"
          href="https://github.com/rose-r05e/evasive-maneuvers"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 View the evasive-maneuvers repository on GitHub
        </a>

        {/* Embedded playable game */}
        <div className="game-embed-container">
          <h3>Play the DEMO below 🕹️</h3>
          <div className="iframe-wrapper">
            <iframe
              ref={iframeRef}
              title="Evasive Maneuvers"
              src="https://rose-r05e.github.io/evasive-maneuvers/"
              allowFullScreen
            ></iframe>
          </div>
          <button className="restart-button btn-colored" onClick={handleRestart}>
            🔄 Restart the game
          </button>
        </div>
        </section>
      </div>
    </div>
  );
}
