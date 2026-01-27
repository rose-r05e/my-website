import './Stardust.css';
import baloonview from '../assets/pictures/baloonview.jpg';
import groundstation from '../assets/pictures/groundstation.gif';

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-container">

        {/* Header */}
        <div className="project-header">
          <h1>Stardust GroundStation</h1>
          <p className="project-subtitle">
            Ground control and telemetry software for the Stardust stratospheric experiment, developed for the BEXUS programme.
          </p>
        </div>

        {/* Overview */}
        <div className="project-card overview-card">
          <div className="card-header">
            <span className="icon">🎈</span>
            <h2>Project Overview</h2>
          </div>
          <p>
            The GroundStation application was developed as a core element of the Stardust mission ground segment. Its primary role was to
            provide a reliable and operator-friendly interface between the airborne experiment and the mission team during ground tests
            and flight operations. The software received real-time telemetry data streamed from the balloon payload via UDP, parsed and
            validated incoming packets, and presented the experiment state in a clear graphical interface.
          </p>
          <p>
            In addition to passive monitoring, the GroundStation enabled active interaction with the experiment. Operators could issue
            predefined telecommands to the payload, allowing configuration changes, experiment control, and recovery actions while the
            system was in flight.
          </p>
        </div>

        {/* Screenshots */}
        <div className="project-card screenshots-card">
          <div className="screenshots-grid">
            <div className="screenshot-item">
              <img
                src={baloonview}
                alt="View from the balloon payload"
                className="screenshot-image"
              />
              <p className="screenshot-caption">
                Picture from the balloon payload,
              </p>
            </div>
            <div className="screenshot-item">
              <img
                src={groundstation}
                alt="GroundStation application in action"
                className="screenshot-image"
              />
              <p className="screenshot-caption">
                Video from the GroundStation application during mission.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="project-card feature-card">
            <span className="icon">📡</span>
            <h3>Real-Time Telemetry</h3>
            <p>
              Live UDP data stream visualized in a PyQt-based dashboard, displaying experiment state and sensor readings.
            </p>
          </div>

          <div className="project-card feature-card">
            <span className="icon">💻</span>
            <h3>Telecommands</h3>
            <p>
              Operators could send validated commands from the UI to the balloon payload, enabling safe in-flight interaction.
            </p>
          </div>


        </div>

        {/* Tech Stack */}
        <div className="project-card tech-stack-card">
          <h2>Technical Stack</h2>
          <ul className="tech-list">
            <li>Python + PyQt5 (GroundStation UI)</li>
            <li>UDP networking (low-latency telemetry)</li>
            <li>C++ flight software (balloon payload)</li>
            <li>Modular packet parsing and logging</li>
          </ul>
        </div>

        {/* Links */}
        <div className="project-links">
          <a href="https://github.com/rose-r05e/BEXUS-Groundstation" target="_blank" rel="noreferrer" className="project-button primary btn-colored">
            🔗 GitHub Repository
          </a>
          <a href="https://simle.pl/stardust" target="_blank" rel="noreferrer" className="project-button secondary">
            Stardust Project Page
          </a>
          <a href="https://rexusbexus.net/bexus/" target="_blank" rel="noreferrer" className="project-button secondary">
            BEXUS Project Page
          </a>
        </div>
      </div>
    </div>
  );
}
