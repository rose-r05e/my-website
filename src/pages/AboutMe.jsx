import { useLanguage } from '../hooks/useLanguage';
import './AboutMe.css';

function AboutMe() {
  const { t } = useLanguage();
  const paragraphs = t.aboutMe.paragraphs || [];

  return (
    <div className="page about-me-page">
      <div className="about-me-container">
        <header className="page-header">
          <h1>{t.aboutMe.title}</h1>
        </header>
        
        <div className="about-me-content">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
