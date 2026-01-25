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
      },
      aboutMe: {
        title: 'About Me',
        placeholder: 'Add your personal information here...'
      },
      contact: {
        title: 'Get In Touch',
        formTitle: 'Send Me a Message',
        nameLabel: 'Your Name',
        namePlaceholder: 'John Doe',
        emailLabel: 'Your Email',
        emailPlaceholder: 'john@example.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'What is this about?',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project or inquiry...',
        submitButton: 'Send Message',
        successMessage: 'Thank you for your message! I will get back to you soon.',
        infoTitle: 'Contact Information',
        emailTitle: 'Email',
        githubTitle: 'GitHub',
        linkedinTitle: 'LinkedIn',
        note: 'Feel free to reach out through any of these channels. I typically respond within 24-48 hours.'
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
      },
      aboutMe: {
        title: 'À Propos de Moi',
        placeholder: 'Ajoutez vos informations personnelles ici...'
      },
      contact: {
        title: 'Entrez en Contact',
        formTitle: 'Envoyez-moi un Message',
        nameLabel: 'Votre Nom',
        namePlaceholder: 'Jean Dupont',
        emailLabel: 'Votre Email',
        emailPlaceholder: 'jean@exemple.com',
        subjectLabel: 'Sujet',
        subjectPlaceholder: 'De quoi s\'agit-il ?',
        messageLabel: 'Message',
        messagePlaceholder: 'Parlez-moi de votre projet ou de votre demande...',
        submitButton: 'Envoyer le Message',
        successMessage: 'Merci pour votre message ! Je vous répondrai bientôt.',
        infoTitle: 'Informations de Contact',
        emailTitle: 'Email',
        githubTitle: 'GitHub',
        linkedinTitle: 'LinkedIn',
        note: 'N\'hésitez pas à me contacter par n\'importe lequel de ces canaux. Je réponds généralement dans les 24 à 48 heures.'
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
      },
      aboutMe: {
        title: 'O Mnie',
        placeholder: 'Dodaj tutaj swoje informacje osobiste...'
      },
      contact: {
        title: 'Skontaktuj się',
        formTitle: 'Wyślij mi Wiadomość',
        nameLabel: 'Twoje Imię',
        namePlaceholder: 'Jan Kowalski',
        emailLabel: 'Twój Email',
        emailPlaceholder: 'jan@przykład.com',
        subjectLabel: 'Temat',
        subjectPlaceholder: 'Czego to dotyczy?',
        messageLabel: 'Wiadomość',
        messagePlaceholder: 'Opowiedz mi o swoim projekcie lub zapytaniu...',
        submitButton: 'Wyślij Wiadomość',
        successMessage: 'Dziękuję za wiadomość! Odpowiem wkrótce.',
        infoTitle: 'Informacje Kontaktowe',
        emailTitle: 'Email',
        githubTitle: 'GitHub',
        linkedinTitle: 'LinkedIn',
        note: 'Skontaktuj się ze mną przez dowolny z tych kanałów. Zazwyczaj odpowiadam w ciągu 24-48 godzin.'
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
