import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import './LanguageSelector.css';

function LanguageSelector() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const toggleLanguageDropdown = () => setIsLangOpen(!isLangOpen);

  // Unicode Icons
  const languages = {
    en: { flag: "\u{1F1EC}\u{1F1E7}", name: "English" },
    fr: { flag: "\u{1F1EB}\u{1F1F7}", name: "Français" },
    pl: { flag: "\u{1F1F5}\u{1F1F1}", name: "Polski" }
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <div className="lang-container">
      <button onClick={toggleLanguageDropdown} className="lang-select-btn">
        {languages[language].flag} {languages[language].name} <span className="lang-arrow">▼</span>
      </button>
      {isLangOpen && (
        <ul className="lang-dropdown">
          {Object.entries(languages).map(([code, { flag, name }]) => (
            <li key={code}>
              <button onClick={() => handleLanguageChange(code)} className="lang-option">
                {flag} {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;