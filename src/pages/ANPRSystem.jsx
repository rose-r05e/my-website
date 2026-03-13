import React, { useEffect, useState } from 'react';
import './ANPRSystem.css';
import canny0Original from '../assets/pictures/ANPRSystem/canny0-original.webp';
import canny1Grayscale from '../assets/pictures/ANPRSystem/canny1-grayscale.webp';
import canny2Bilateral from '../assets/pictures/ANPRSystem/canny2-bilateral.webp';
import canny3Gauss from '../assets/pictures/ANPRSystem/canny3-gauss.webp';
import canny4Sobel from '../assets/pictures/ANPRSystem/canny4-sobel.webp';
import canny5NonMaxDeleted from '../assets/pictures/ANPRSystem/canny5-nonmaxdeleted.webp';
import canny6Histereza from '../assets/pictures/ANPRSystem/canny6-histereza.webp';
import canny7Detected from '../assets/pictures/ANPRSystem/canny7-found.webp';
import beforeDetection1 from '../assets/pictures/ANPRSystem/1und.webp';
import afterDetection1 from '../assets/pictures/ANPRSystem/1det.webp';
import beforeDetection2 from '../assets/pictures/ANPRSystem/2un.webp';
import afterDetection2 from '../assets/pictures/ANPRSystem/2det.webp';
import beforeDetection3 from '../assets/pictures/ANPRSystem/3und.webp';
import afterDetection3 from '../assets/pictures/ANPRSystem/3det.webp';
import beforeDetection4 from '../assets/pictures/ANPRSystem/4und.webp';
import afterDetection4 from '../assets/pictures/ANPRSystem/4det.webp';
import beforeDetection5 from '../assets/pictures/ANPRSystem/5und.webp';
import afterDetection5 from '../assets/pictures/ANPRSystem/5det.webp';
import beforeDetection6 from '../assets/pictures/ANPRSystem/6und.webp';
import afterDetection6 from '../assets/pictures/ANPRSystem/6det.webp';
import beforeDetection7 from '../assets/pictures/ANPRSystem/7und.webp';
import afterDetection7 from '../assets/pictures/ANPRSystem/7det.webp';
import beforeDetection8 from '../assets/pictures/ANPRSystem/8und.webp';
import afterDetection8 from '../assets/pictures/ANPRSystem/8det.webp';
import javaLogo from '../assets/logos/java.svg';
import gradleLogo from '../assets/logos/gradle.svg';
import openCvLogo from '../assets/logos/opencv.svg';
import tesseractLogo from '../assets/logos/tesseract_ocr.png';
import junitLogo from '../assets/logos/junit.svg';
import logoWhiteBackground from '../assets/logos/logo_white_background.svg';
import { getPlateComparisonAlignment } from '../utils/plateComparison';

/* Preloading all images */
const ANPR_IMAGE_SOURCES = [
  canny0Original,
  canny1Grayscale,
  canny2Bilateral,
  canny3Gauss,
  canny4Sobel,
  canny5NonMaxDeleted,
  canny6Histereza,
  canny7Detected,
  beforeDetection1,
  afterDetection1,
  beforeDetection2,
  afterDetection2,
  beforeDetection3,
  afterDetection3,
  beforeDetection4,
  afterDetection4,
  beforeDetection5,
  afterDetection5,
  beforeDetection6,
  afterDetection6,
  beforeDetection7,
  afterDetection7,
  beforeDetection8,
  afterDetection8,
];

const RecognitionPage = () => {
  useEffect(() => {
    // Preload all page images to avoid first-view delays in sliders/tables.
    ANPR_IMAGE_SOURCES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  const cannySteps = [
    {
      title: 'Krok 0: Obraz wejściowy',
      image: canny0Original,
      description: 'Oryginalna klatka wejściowa przekazana do pipeline\'u detekcji tablic rejestracyjnych.',
    },
    {
      title: 'Krok 1: Skala szarości',
      image: canny1Grayscale,
      description: 'Konwersja RGB do odcieni szarości upraszcza dane i przygotowuje obraz do dalszego filtrowania.',
    },
    {
      title: 'Krok 2: Filtr bilateralny',
      image: canny2Bilateral,
      description: 'Redukcja szumu przy jednoczesnym zachowaniu krawędzi, kluczowych dla późniejszego wykrywania konturów.',
    },
    {
      title: 'Krok 3: Rozmycie Gaussa',
      image: canny3Gauss,
      description: 'Wygładzenie obrazu zmniejsza wpływ drobnych zakłóceń i stabilizuje obliczanie gradientu.',
    },
    {
      title: 'Krok 4: Gradient Sobela',
      image: canny4Sobel,
      description: 'Wyznaczenie kierunku i siły zmian jasności, co pozwala wskazać potencjalne krawędzie obiektów.',
    },
    {
      title: 'Krok 5: Non-maximum suppression',
      image: canny5NonMaxDeleted,
      description: 'Usunięcie słabszych odpowiedzi gradientu, aby pozostawić cienkie i precyzyjne linie krawędzi.',
    },
    {
      title: 'Krok 6: Histereza progowania',
      image: canny6Histereza,
      description: 'Finalna selekcja krawędzi na podstawie progów, z zachowaniem ciągłości istotnych konturów.',
    },
  ];

  // Dane przeniesione do stanu, aby łatwiej było nimi zarządzać
  const [results] = useState([
    {
      id: 1,
      inputImg: beforeDetection1,
      outputImg: afterDetection1,
      expected: "H4KGB",
      read: "H4KGB",
      contours: 948,
      potentialPlates: 7,
      timeFinding: 212,
      timeReading: 1064,
      timeSum: 1276,
    },
    {
      id: 2,
      inputImg: beforeDetection2,
      outputImg: afterDetection2,
      expected: "EBB6911",
      read: "EBB6911",
      contours: 205,
      potentialPlates: 3,
      timeFinding: 175,
      timeReading: 533,
      timeSum: 708,
    },
    {
      id: 3,
      inputImg: beforeDetection3,
      outputImg: afterDetection3,
      expected: "FF9122J",
      read: "FE91223",
      contours: 723,
      potentialPlates: 6,
      timeFinding: 169,
      timeReading: 876,
      timeSum: 1045,
    },
    {
      id: 4,
      inputImg: beforeDetection4,
      outputImg: afterDetection4,
      expected: "RP295G",
      read: "BRP295G",
      contours: 671,
      potentialPlates: 4,
      timeFinding: 174,
      timeReading: 713,
      timeSum: 887,
    },
    {
      id: 5,
      inputImg: beforeDetection5,
      outputImg: afterDetection5,
      expected: "RSR98",
      read: "IRSR989",
      contours: 2154,
      potentialPlates: 41,
      timeFinding: 245,
      timeReading: 4891,
      timeSum: 5136,
    },
    {
      id: 6,
      inputImg: beforeDetection6,
      outputImg: afterDetection6,
      expected: "360BF6",
      read: "360BF6",
      contours: 133,
      potentialPlates: 2,
      timeFinding: 171,
      timeReading: 307,
      timeSum: 478,
    },
    {
      id: 7,
      inputImg: beforeDetection7,
      outputImg: afterDetection7,
      expected: "WWE69MU",
      read: "WWE69MU",
      contours: 437,
      potentialPlates: 5,
      timeFinding: 151,
      timeReading: 770,
      timeSum: 921,
    },
    {
      id: 8,
      inputImg: beforeDetection8,
      outputImg: afterDetection8,
      expected: "RA67262",
      read: "ERA67262",
      contours: 393,
      potentialPlates: 4,
      timeFinding: 188,
      timeReading: 706,
      timeSum: 894,
    },
    {
      id: 9,
      inputImg: canny0Original,
      outputImg: canny7Detected,
      expected: "GX123XD",
      read: "GX123XD",
      contours: 113,
      potentialPlates: 2,
      timeFinding: 139,
      timeReading: 498,
      timeSum: 637,
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cannyStepIndex, setCannyStepIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentCannyStep = cannySteps[cannyStepIndex];
  const visibleResults = Array.from({ length: 3 }, (_, offset) =>
    results[(currentIndex + offset) % results.length]
  );

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('up');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
      setIsAnimating(false);
    }, 350);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('down');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % results.length);
      setIsAnimating(false);
    }, 350);
  };

  const renderPlateComparison = (expected, read) => {
    return getPlateComparisonAlignment(expected, read).map((item, index) => (
      <span
        key={`${item.displayChar}-${index}`}
        className={`plate-char ${item.isMatch ? 'correct' : 'incorrect'}`}
      >
        {item.displayChar}
      </span>
    ));
  };

  return (
    <div className="page anpr-system-page">
      <div className="projects-container">
        <header className="page-header">
          <h1>Automatyczny System Rozpoznawania<br/>Tablic Rejestracyjnych</h1>
          <p>Projekt wykorzystujący przetwarzanie obrazu i OCR do identyfikacji tablic rejestracyjnych</p>
        </header>

        {/* Hero Image Section */}
        <div className="section">
          <h2 className="section-header">Prezentacja Projektu</h2>
          <div className="hero-image">
            <img src={canny7Detected} alt="System rozpoznawania tablic rejestracyjnych" />
          </div>
          <p className="hero-description">
            System analizuje obraz pojazdu w kilku kolejnych etapach, aby zwiększyć dokładność i niezawodność rozpoznawania tablic rejestracyjnych. Najpierw wykonywane jest wstępne przygotowanie klatki obrazu. Na tym etapie stosowane są techniki przetwarzania obrazu, takie jak odszumianie, które usuwa zakłócenia powstałe np. w wyniku słabego oświetlenia lub jakości kamery. Następnie wykonywane jest wykrywanie krawędzi, co pozwala uwidocznić kontury obiektów znajdujących się na obrazie i ułatwia dalszą analizę.
            <br />
            <br />
            W kolejnym kroku system przeszukuje obraz w poszukiwaniu potencjalnych obszarów, które mogą zawierać tablicę rejestracyjną. W tym celu analizowane są kontury oraz ich właściwości geometryczne, takie jak proporcje prostokąta, wielkość czy położenie względem pojazdu. Dzięki temu możliwe jest wyselekcjonowanie kilku najbardziej prawdopodobnych kandydatów na tablicę rejestracyjną.
            <br />
            <br />
            Po zidentyfikowaniu kandydatów następuje etap właściwego odczytu numeru. Wybrany fragment obrazu jest dodatkowo przetwarzany, na przykład poprzez poprawę kontrastu lub binaryzację, aby znaki były bardziej czytelne dla algorytmu. Następnie wykorzystywany jest mechanizm OCR (Optical Character Recognition), który rozpoznaje znajdujące się na tablicy litery i cyfry.
            <br />
            <br />
            Na końcu system porównuje odczytany numer rejestracyjny z oczekiwaną wartością lub z zapisami w bazie danych. Pozwala to na weryfikację poprawności rozpoznania oraz ewentualne wykrycie pojazdu znajdującego się na liście poszukiwanych lub uprawnionych do wjazdu. Dzięki takiej wieloetapowej analizie system jest w stanie skutecznie identyfikować tablice rejestracyjne nawet w trudnych warunkach, takich jak zmienne oświetlenie, częściowe zasłonięcie tablicy czy różna jakość obrazu.
          </p>
        </div>

        {/*  Canny Algorith Section */}
        <div className="section canny-section">
          <h2 className="section-header">Algorytm Canny'ego</h2>
          <div className="hero-image canny-image">
            <img src={currentCannyStep.image} alt={currentCannyStep.title} />
          </div>
          <label className="canny-slider-wrapper" htmlFor="canny-step-slider">
            <span>{currentCannyStep.title}</span>
            <input
              id="canny-step-slider"
              type="range"
              min="0"
              max="6"
              step="1"
              value={cannyStepIndex}
              onChange={(event) => setCannyStepIndex(Number(event.target.value))}
            />
          </label>
          <p className="canny-description">{currentCannyStep.description}</p>
        </div>

        {/* Tech Stack Section */}
        <div className="section technologies-section">
          <h2 className="section-header">Technologie</h2>
          <div className="tech-grid">
            <div className="card tech-tile">
              <div className="tech-logo-layer">
                <img className="tech-logo-bg" src={logoWhiteBackground} alt="" />
                <img className="tech-logo" src={javaLogo} alt="Java logo" />
              </div>
              <h3 className="card-header">Java</h3>
              <p>Główny język programowania projektu. Java zapewnia solidne podstawy dla przetwarzania obrazów oraz integracji z bibliotekami OpenCV.</p>
            </div>
            <div className="card tech-tile">
              <div className="tech-logo-layer">
                <img className="tech-logo-bg" src={logoWhiteBackground} alt="" />
                <img className="tech-logo" src={gradleLogo} alt="Gradle logo" />
              </div>
              <h3 className="card-header">Gradle</h3>
              <p>System automatyzacji budowania projektu. Gradle zarządza zależnościami i procesem kompilacji, upraszczając zarządzanie projektem.</p>
            </div>
            <div className="card tech-tile">
              <div className="tech-logo-layer">
                <img className="tech-logo-bg" src={logoWhiteBackground} alt="" />
                <img className="tech-logo" src={openCvLogo} alt="OpenCV logo" />
              </div>
              <h3 className="card-header">OpenCV</h3>
              <p>Biblioteka do przetwarzania obrazów. OpenCV umożliwia wykrywanie konturów, segmentację i przygotowanie obrazu do rozpoznawania tekstu.</p>
            </div>
            <div className="card tech-tile">
              <div className="tech-logo-layer">
                <img className="tech-logo-bg" src={logoWhiteBackground} alt="" />
                <img className="tech-logo" src={tesseractLogo} alt="Tesseract OCR logo" />
              </div>
              <h3 className="card-header">Tesseract OCR</h3>
              <p>Silnik optycznego rozpoznawania znaków. Tesseract OCR przekształca wykryte fragmenty obrazu w tekst, identyfikując numer tablicy.</p>
            </div>
            <div className="card tech-tile">
              <div className="tech-logo-layer">
                <img className="tech-logo-bg" src={logoWhiteBackground} alt="" />
                <img className="tech-logo" src={junitLogo} alt="JUnit logo" />
              </div>
              <h3 className="card-header">JUnit</h3>
              <p>Framework do testowania jednostkowego. JUnit zapewnia, że wszystkie komponenty systemu działają poprawnie i niezawodnie.</p>
            </div>
          </div>
        </div>

        {/* Results Analysis Section */}
        <div className="section">
          <h2 className="section-header">Analiza Wyników</h2>
          <p>Poniższa tabela przedstawia szczegółowe wyniki działania systemu, w tym czas przetwarzania i dokładność rozpoznawania.</p>
          <div className="table-wrapper">
            <div className="table-controls">
              <button type="button" className="arrow-button" onClick={handlePrev} aria-label="Poprzedni wynik">
                ▲
              </button>
              <button type="button" className="arrow-button" onClick={handleNext} aria-label="Następny wynik">
                ▼
              </button>
            </div>
            <div className="table-responsive">
              <div className={`table-slider ${isAnimating ? `slide-${direction}` : ''}`}>
                <table className="analysis-table">
                  <thead>
                    <tr>
                      <th>Klatka na wejściu</th>
                      <th>Klatka na wyjściu</th>
                      <th>Numer tablicy</th>
                      <th>Liczba znalezionych</th>
                      <th>Czas trwania [ms]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleResults.map((result, index) => (
                      <React.Fragment key={`${result.id}-${index}`}>
                        <tr className={index > 0 ? 'result-block-start' : ''}>
                          <td rowSpan="10" className="img-cell">
                            <img src={result.inputImg} alt="Klatka wejściowa" />
                          </td>
                          <td rowSpan="10" className="img-cell">
                            <img src={result.outputImg} alt="Klatka wyjściowa" />
                          </td>
                          <td rowSpan="5" className="data-cell">
                            Oczekiwany:<br />
                            <span className="plate-number">{result.expected}</span>
                          </td>
                          <td rowSpan="5" className="data-cell">
                            Konturów:<br />
                            <span className="value">{result.contours}</span>
                          </td>
                          <td rowSpan="3" className="data-cell">
                            Znalezienie:<br />
                            <span className="value">{result.timeFinding}</span>
                          </td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                          <td rowSpan="3" className="data-cell">
                            Odczytanie:<br />
                            <span className="value">{result.timeReading}</span>
                          </td>
                        </tr>
                        <tr></tr>
                        <tr>
                          <td rowSpan="5" className="data-cell">
                            Odczytany:<br />
                            <span className="plate-number">
                              {renderPlateComparison(result.expected, result.read)}
                            </span>
                          </td>
                          <td rowSpan="5" className="data-cell">
                            Potencjalnych tablic:<br />
                            <span className="value">{result.potentialPlates}</span>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="4" className="data-cell">
                            Suma:<br />
                            <span className="value">{result.timeSum}</span>
                          </td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecognitionPage;