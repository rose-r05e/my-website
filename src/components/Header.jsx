import './Header.css';
import { useLanguage } from '../hooks/useLanguage';
import siteLogo from '../assets/logo.avif';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

function Header() {
  const { t } = useLanguage();

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
            <li><a href="#">{t.nav.projects}</a></li>
            <li><a href="#">{t.nav.capabilities}</a></li>
            <li><a href="#">{t.nav.about}</a></li>
            <li><a href="#">{t.nav.resume}</a></li>
            <li><a href="#">{t.nav.contact}</a></li>
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