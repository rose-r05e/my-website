import { useEffect, useRef, useState } from 'react';
import "./SimpleGame.css";

export default function ProjectsPage() {
  const EMOJI = {
    geometry: '\u{1F4D0}',
    rocket: '\u{1F680}',
    link: '\u{1F517}',
    joystick: '\u{1F579}\uFE0F',
    restart: '\u{1F504}'
  };

  const iframeRef = useRef(null);
  const embedRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRestart = () => {
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleToggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (embedRef.current) {
      await embedRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  return (
    <div className="page projects-page">
      <div className="projects-container">
        <header className="page-header">
          <h1>Having fun with JavaScript</h1>
          <p>Here are a couple projects I've published on GitHub.</p>
        </header>

        {/* ───────────────────────────────────────────────────────── */}
        {/* Project 1 — cartesian2d-js */}
        <div className="section">
          <div className="project-icon icon">{EMOJI.geometry}</div>
          <h2 className="section-header">cartesian2d-js</h2>
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
          {EMOJI.link} View the cartesian2d-js repository on GitHub
        </a>
        </div>

        {/* ───────────────────────────────────────────────────────── */}
        {/* Project 2 — Evasive Maneuvers */}
        <div className="section">
          <div className="project-icon icon">{EMOJI.rocket}</div>
          <h2 className="section-header">Evasive Maneuvers</h2>
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
          {EMOJI.link} View the evasive-maneuvers repository on GitHub
        </a>

        {/* Embedded playable game */}
        <div className="game-embed-container" ref={embedRef}>
          <h2>Play the DEMO below {EMOJI.joystick}</h2>
          <div className="iframe-wrapper">
            <iframe
              ref={iframeRef}
              title="Evasive Maneuvers"
              src="https://rose-r05e.github.io/evasive-maneuvers/"
              allowFullScreen
              scrolling="no"
            ></iframe>
          </div>
          <div className="game-actions">
            <button className="restart-button btn-colored" onClick={handleRestart}>
              {EMOJI.restart} Restart the game
            </button>
            <button
              className="fullscreen-button btn-colored"
              onClick={handleToggleFullscreen}
              type="button"
            >
              {isFullscreen ? 'Exit fullscreen' : 'Go fullscreen'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
