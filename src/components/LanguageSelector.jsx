import { useState } from 'react';
import './LanguageSelector.css';

function LanguageSelector() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const toggleLanguageDropdown = () => setIsLangOpen(!isLangOpen);

  // Unicode Icons
  let en = "\u{1F1EC}\u{1F1E7}"; 
  let fr = "\u{1F1EB}\u{1F1F7}";
  let pl = "\u{1F1F5}\u{1F1F1}";

  return (
    <div className="lang-container">
      <button onClick={toggleLanguageDropdown} className="lang-select-btn">
          🌐 LANGUAGE ▼
      </button>
      {isLangOpen && (
          <ul className="lang-dropdown">
            <option value="en">{en} English</option>
            <option value="fr">{fr} Français</option>
            <option value="pl">{pl} Polski</option>
          </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
