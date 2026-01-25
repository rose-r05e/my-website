import { useLanguage } from '../hooks/useLanguage';
import './AboutMe.css';

function AboutMe() {
  const { t, language } = useLanguage();

  return (
    <div className="about-me-page">
      <div className="about-me-container">
        <h1 className="about-me-title">{t.aboutMe.title}</h1>
        
        <div className="about-me-content">
          {/* English content */}
          {language === 'en' && (
            <>
              <p>
                Hi there! I'm Rosalie. A full-stack developer with a passion for creating meaningful digital experiences. 
                I thrive at the intersection of technology and human needs, building solutions that are not only functional 
                but also intuitive and inspiring.
              </p>
              <p>
                When I'm not coding, you'll find me immersed in the world of art. Whether it's creating something new or 
                simply appreciating the beauty around me. I believe creativity fuels innovation, and I bring that mindset 
                to every project I work on.
              </p>
              <p>
                My mission? To bridge the gap between technology and the human experience, crafting tools and platforms 
                that truly resonate with people. If you're looking for a developer who combines technical expertise with 
                a creative touch, let's connect and bring your ideas to life!
              </p>
            </>
          )}

          {/* French content */}
          {language === 'fr' && (
            <>
              <p>
                Bonjour! Je m'appelle Rosalie, et je suis en train d'apprendre le français - alors soyez indulgents avec 
                mes petites erreurs, s'il vous plaît! Je suis développeuse full-stack, passionnée par la création 
                d'expériences numériques qui ont du sens.
              </p>
              <p>
                Ce qui m'anime? Relier la technologie aux besoins humains, en concevant des solutions à la fois 
                fonctionnelles, intuitives et inspirantes. Quand je ne code pas, vous me trouverez probablement en train 
                de créer ou d'admirer de l'art - une autre façon pour moi d'exprimer ma créativité.
              </p>
              <p>
                Mon objectif est simple : construire des outils qui parlent aux gens, en alliant expertise technique et 
                sensibilité artistique. Si vous cherchez une développeuse qui met l'humain au cœur de ses projets, parlons-en!
              </p>
            </>
          )}

          {/* Polish content */}
          {language === 'pl' && (
            <>
              <p>
                Cześć! Mam na imię Rozalia. Full-stack developerka z pasją do tworzenia znaczącego cyfrowego doświadczenia. 
                Najbardziej inspiruje mnie łączenie technologii z ludzkimi potrzebami, tworząc rozwiązania, które są nie 
                tylko funkcjonalne, ale także intuicyjne i inspirujące.
              </p>
              <p>
                Kiedy nie programuję, z pewnością znajdziecie mnie w świecie sztuki - czy to tworząc coś nowego, czy po 
                prostu podziwiając piękno wokół. Uważam, że kreatywność napędza innowacje, i to podejście przenoszę na 
                każdy projekt, nad którym pracuję.
              </p>
              <p>
                Moja misja? Budować narzędzia, które naprawdę rezonują z ludźmi, łącząc wiedzę techniczną z wrażliwością 
                artystyczną. Jeśli szukasz developera, który łączy umiejętności techniczne z kreatywnym podejściem, 
                porozmawiajmy i ożywmy Twoje pomysły!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
