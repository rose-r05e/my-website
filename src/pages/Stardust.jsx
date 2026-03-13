import './Stardust.css';
import baloonview from '../assets/pictures/Stardust/baloonview.jpg';
import groundstation from '../assets/pictures/Stardust/groundstation.gif';

export default function Projects() {
  const EMOJI = {
    overview: '\u{1F388}',
    telemetry: '\u{1F4E1}',
    telecommands: '\u{1F4BB}',
    downstream: '\u{1F4E5}',
    github: '\u{1F517}'
  };

  return (
    <div className="page stardust-page">
      <div className="stardust-section">

        {/* Header */}
        <header className="page-header">
          <h1>Stardust GroundStation</h1>
          <p className="project-subtitle">
            Ground control and telemetry software for the Stardust stratospheric experiment, developed for the BEXUS programme.
          </p>
        </header>

        {/* Overview */}
        <div className="section overview-section">
          <div className="card-head-row">
            <span className="icon">{EMOJI.overview}</span>
            <h2 className="section-header">Project Overview</h2>
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

        {/* Pictures */}
        <div className="section picture-section">
          <div className="picture-grid">
            <div className="picture-item">
              <img
                src={baloonview}
                alt="View from the balloon payload"
                className="picture-image"
              />
              <p className="picture-caption">
                Picture from the balloon payload,
              </p>
            </div>
            <div className="picture-item">
              <img
                src={groundstation}
                alt="GroundStation application in action"
                className="picture-image"
              />
              <p className="picture-caption">
                Video from the GroundStation application during mission.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="section">
            <span className="icon">{EMOJI.telemetry}</span>
            <h2 className="section-header">Real-Time Telemetry</h2>
            <p>
              Live UDP data stream visualized in a PyQt-based dashboard, displaying experiment state and sensor readings.
            </p>
          </div>

          <div className="section">
            <span className="icon">{EMOJI.telecommands}</span>
            <h2 className="section-header">Telecommands</h2>
            <p>
              Operators could send validated commands from the UI to the balloon payload, enabling safe in-flight interaction.
            </p>
          </div>

          <div className="section">
            <span className="icon">{EMOJI.downstream}</span>
            <h2 className="section-header">Data Downstream</h2>
            <p>
              UDP downstream from the C++ app running in the gondola, feeding the ground station in real time.
            </p>
          </div>

        </div>

        {/* Links */}
        <div className="project-links">
          <a href="https://github.com/rose-r05e/BEXUS-Groundstation" target="_blank" rel="noreferrer" className="project-button primary btn-colored">
            {EMOJI.github} GitHub Repository
          </a>
          <a href="https://simle.pl/stardust" target="_blank" rel="noreferrer" className="project-button button secondary">
            Stardust Project Page
          </a>
          <a href="https://rexusbexus.net/bexus/" target="_blank" rel="noreferrer" className="project-button button secondary">
            BEXUS Project Page
          </a>
        </div>
      </div>
    </div>
  );
}
