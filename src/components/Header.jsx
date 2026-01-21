import './Header.css';
import siteLogo from '../assets/logo.avif';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

function Header() {
  return (
    <header className="main-header">
      <div className="container">

        {/* Left side: Picture AND Name in one container */}
        <div className="site-branding">
          <img src={siteLogo} alt="PIC" className="site-logo" />
          <div className="site-name">Rosy dev</div>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="main-nav">
          <ul>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Capabilities</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Resume</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        {/* Right side: Utility/Action buttons */}
        <div className="utility-nav">
            <ThemeToggle />
            <LanguageSelector />
        </div>

      </div>
    </header>
  );
}

export default Header;