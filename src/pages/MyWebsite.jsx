import './MyWebsite.css';
import reactLogo from '../assets/logos/react.svg';
import javascriptLogo from '../assets/logos/javascript.svg';
import viteLogo from '../assets/logos/vite.svg';
import cssLogo from '../assets/logos/css.svg';

export default function MyWebsite() {
	const EMOJI = {
		overview: '\u{1F4BB}',
		architecture: '\u{1F3D7}\uFE0F',
		features: '\u2728',
		stack: '\u{1F6E0}\uFE0F'
	};

	return (
		<div className="page my-website-page">
			<div className="my-website-container">
				<header className="page-header">
					<h1>The website you're on</h1>
					<p className="project-subtitle">
						Personal portfolio website built with React and Vite to present projects,
						resume, and contact details in a clean, multi-page experience.
					</p>
				</header>

				<section className="section">
					<div className="card-head-row">
						<span className="icon">{EMOJI.overview}</span>
						<h2 className="section-header">Project Overview</h2>
					</div>
					<p>
						This project is the website you are currently browsing. It was designed
						as a fast, maintainable portfolio where each major area has a dedicated
						page: home, projects, resume, about, and contact.
					</p>
					<p>
						The goal was to keep content easy to expand while preserving a consistent
						visual language across all pages, including reusable cards, shared color
						tokens, and theme-aware styles.
					</p>
				</section>

				<section className="section">
					<div className="card-head-row">
						<span className="icon">{EMOJI.architecture}</span>
						<h2 className="section-header">Architecture</h2>
					</div>
					<div className="architecture-grid">
						<div className="card no-hover">
							<h3 className="card-header">Routing & Pages</h3>
							<p>
								The app uses client-side routing with dedicated page components for
								each navigation path and detailed project subpages under
								<code> /projects/*</code>.
							</p>
						</div>
						<div className="card no-hover">
							<h3 className="card-header">Shared UI System</h3>
							<p>
								Header, footer, selectors, and reusable section/card patterns create
								a uniform look, while page-level CSS remains scoped to avoid style
								collisions.
							</p>
						</div>
						<div className="card no-hover">
							<h3 className="card-header">Content Organization</h3>
							<p>
								Project data, contact helpers, and specialized components are split
								into clear folders to keep the codebase easy to navigate and extend.
							</p>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="card-head-row">
						<span className="icon">{EMOJI.features}</span>
						<h2 className="section-header">Key Features</h2>
					</div>
					<div className="features-grid">
						<article className="card feature-card no-hover">
							<h3 className="card-header">Multi-language Support</h3>
							<p>
								A language context provides EN/FR/PL translations and persists
								selected language in localStorage.
							</p>
						</article>
						<article className="card feature-card no-hover">
							<h3 className="card-header">Responsive Layout</h3>
							<p>
								Global layout and page components adapt from desktop to mobile while
								preserving readability and spacing.
							</p>
						</article>
						<article className="card feature-card no-hover">
							<h3 className="card-header">Resume Viewer</h3>
							<p>
								Resume page integrates a PDF viewer with language-specific files and
								direct download support.
							</p>
						</article>
					</div>
				</section>

				<section className="section">
					<div className="card-head-row">
						<span className="icon">{EMOJI.stack}</span>
						<h2 className="section-header">Tech Stack</h2>
					</div>
					<div className="stack-logos" aria-label="Technology logos">
						<div className="stack-logo-item">
							<img src={reactLogo} alt="React" className="stack-logo" />
							<span>React</span>
						</div>
						<div className="stack-logo-item">
							<img src={javascriptLogo} alt="JavaScript" className="stack-logo" />
							<span>JavaScript</span>
						</div>
						<div className="stack-logo-item">
							<img src={cssLogo} alt="CSS" className="stack-logo" />
							<span>CSS</span>
						</div>
                        <div className="stack-logo-item">
							<img src={viteLogo} alt="Vite" className="stack-logo" />
							<span>Vite</span>
						</div>
					</div>
				</section>

			</div>
		</div>
	);
}
