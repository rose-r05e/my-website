import './Footer.css';
import { useLanguage } from '../hooks/useLanguage';

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p className="copyright">
        © {currentYear} Rosy dev. {t.footer.rights}
      </p>
    </footer>
  );
}

export default Footer;
