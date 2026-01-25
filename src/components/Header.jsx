import './Header.css';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="site-branding">
          <img src={siteLogo} alt="PIC" className="site-logo" />
          <div className="site-name">Rosy dev</div>
        </Link>

        {/* Center: Main Navigation Links */}
        <nav className="main-nav">
          <ul>
            <li><Link to="/">{t.nav.projects}</Link></li>
            <li><Link to="/">{t.nav.capabilities}</Link></li>
            <li><Link to="/">{t.nav.about}</Link></li>
            <li><Link to="/resume">{t.nav.resume}</Link></li>
            <li><Link to="/">{t.nav.contact}</Link></li>
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