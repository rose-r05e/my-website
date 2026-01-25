import { useState, useEffect } from 'react';
import { LanguageContext } from './languageContextValue';

// Language Provider Component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation data
  const translations = {
    en: {
      nav: {
        projects: 'Projects',
        capabilities: 'Capabilities',
        about: 'About me',
        resume: 'Resume',
        contact: 'Contact'
      },
      main: {
        title: 'Vite + React',
        description: 'Edit src/App.jsx and save to test HMR',
        button: 'count is',
        docs: 'Click on the Vite and React logos to learn more'
      },
      footer: {
        rights: 'All rights reserved.'
      },
      resume: {
        title: "Here's my resume:",
        download: 'Download PDF'
      }
    },
    fr: {
      nav: {
        projects: 'Projets',
        capabilities: 'Compétences',
        about: 'À propos de moi',
        resume: 'CV',
        contact: 'Contact'
      },
      main: {
        title: 'Vite + React',
        description: 'Modifiez src/App.jsx et enregistrez pour tester HMR',
        button: 'le nombre est',
        docs: 'Cliquez sur les logos Vite et React pour en savoir plus'
      },
      footer: {
        rights: 'Tous droits réservés.'
      },
      resume: {
        title: 'Voici mon CV :',
        download: 'Télécharger le PDF'
      }
    },
    pl: {
      nav: {
        projects: 'Projekty',
        capabilities: 'Umiejętności',
        about: 'O mnie',
        resume: 'CV',
        contact: 'Kontakt'
      },
      main: {
        title: 'Vite + React',
        description: 'Edytuj src/App.jsx i zapisz, aby przetestować HMR',
        button: 'liczba wynosi',
        docs: 'Kliknij na logo Vite i React, aby dowiedzieć się więcej'
      },
      footer: {
        rights: 'Wszelkie prawa zastrzeżone.'
      },
      resume: {
        title: 'Oto moje CV:',
        download: 'Pobierz PDF'
      }
    }
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
