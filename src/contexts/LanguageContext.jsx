import { useState, useEffect } from 'react';
import { LanguageContext } from './languageContextValue';

// Language Provider Component
export function LanguageProvider({ children }) {
  const supportedLanguages = ['en', 'fr', 'pl'];

  const normalizeLanguage = (lang) => (
    supportedLanguages.includes(lang) ? lang : 'en'
  );

  const [language, setLanguageState] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return normalizeLanguage(savedLang);
  });

  const setLanguage = (lang) => {
    setLanguageState(normalizeLanguage(lang));
  };

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
        paragraphs: [
          "Hi there! I'm Rosalie, you can call me. A full-stack developer with a passion for creating meaningful digital experiences. I thrive at the intersection of technology and human needs, building solutions that are not only functional but also intuitive and inspiring.",
          "When I'm not coding, you'll find me immersed in the world of art. Whether it's creating something new or simply appreciating the beauty around me. I believe creativity fuels innovation, and I bring that mindset to every project I work on.",
          "My mission? To bridge the gap between technology and the human experience, crafting tools and platforms that truly resonate with people. If you're looking for a developer who combines technical expertise with a creative touch, let's connect and bring your ideas to life!"
        ]
      },
      contact: {
        title: 'Get In Touch',
        formTitle: 'Send me a message!',
        nameLabel: 'Your Name',
        namePlaceholder: 'John Doe',
        emailLabel: 'Your Email',
        emailPlaceholder: 'john@example.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'What is this about?',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project or inquiry...',
        submitButton: 'Send message',
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
        paragraphs: [
          "Bonjour! Je m'appelle Rosalie, et je suis en train d'apprendre le français - alors soyez indulgents avec mes petites erreurs, s'il vous plaît! Je suis développeuse full-stack, passionnée par la création d'expériences numériques qui ont du sens.",
          "Ce qui m'anime? Relier la technologie aux besoins humains, en concevant des solutions à la fois fonctionnelles, intuitives et inspirantes. Quand je ne code pas, vous me trouverez probablement en train de créer ou d'admirer de l'art - une autre façon pour moi d'exprimer ma créativité.",
          "Mon objectif est simple : construire des outils qui parlent aux gens, en alliant expertise technique et sensibilité artistique. Si vous cherchez une développeuse qui met l'humain au cœur de ses projets, parlons-en!"
        ]
      },
      contact: {
        title: 'Entrez en Contact',
        formTitle: 'Envoyez-moi un message!',
        nameLabel: 'Votre Nom',
        namePlaceholder: 'Jean Dupont',
        emailLabel: 'Votre Email',
        emailPlaceholder: 'jean@exemple.com',
        subjectLabel: 'Sujet',
        subjectPlaceholder: 'De quoi s\'agit-il ?',
        messageLabel: 'Message',
        messagePlaceholder: 'Parlez-moi de votre projet ou de votre demande...',
        submitButton: 'Envoyer le message',
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
        paragraphs: [
          'Cześć! Mam na imię Rozalia. Full-stack developerka z pasją do tworzenia znaczącego cyfrowego doświadczenia. Najbardziej inspiruje mnie łączenie technologii z ludzkimi potrzebami, tworząc rozwiązania, które są nie tylko funkcjonalne, ale także intuicyjne i inspirujące.',
          'Kiedy nie programuję, z pewnością znajdziecie mnie w świecie sztuki - czy to tworząc coś nowego, czy po prostu podziwiając piękno wokół. Uważam, że kreatywność napędza innowacje, i to podejście przenoszę na każdy projekt, nad którym pracuję.',
          'Moja misja? Budować narzędzia, które naprawdę rezonują z ludźmi, łącząc wiedzę techniczną z wrażliwością artystyczną. Jeśli szukasz developera, który łączy umiejętności techniczne z kreatywnym podejściem, porozmawiajmy i ożywmy Twoje pomysły!'
        ]
      },
      contact: {
        title: 'Skontaktuj się',
        formTitle: 'Wyślij mi wiadomość!',
        nameLabel: 'Twoje Imię',
        namePlaceholder: 'Jan Kowalski',
        emailLabel: 'Twój Email',
        emailPlaceholder: 'jan@przykład.com',
        subjectLabel: 'Temat',
        subjectPlaceholder: 'Czego to dotyczy?',
        messageLabel: 'Wiadomość',
        messagePlaceholder: 'Opowiedz mi o swoim projekcie lub zapytaniu...',
        submitButton: 'Wyślij wiadomość',
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
    t: translations[language] || translations.en,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
