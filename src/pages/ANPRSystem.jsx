import React, { useState } from 'react';
import './ANPRSystem.css';
import beforeDetection1 from '../assets/pictures/before_detection1.png';
import afterDetection1 from '../assets/pictures/after_detection1.png';

const RecognitionPage = () => {
  // Dane przeniesione do stanu, aby łatwiej było nimi zarządzać
  const [results] = useState([
    {
      id: 1,
      inputImg: beforeDetection1, 
      outputImg: afterDetection1,
      expected: "GX123XD",
      read: "GX123XD",
      contours: 113,
      potentialPlates: 2,
      timeFinding: 139,
      timeReading: 498,
      timeSum: 637,
    },
    {
      id: 2,
      inputImg: beforeDetection1,
      outputImg: afterDetection1,
      expected: "KR9L2P4",
      read: "KR9L2P8",
      contours: 97,
      potentialPlates: 3,
      timeFinding: 121,
      timeReading: 462,
      timeSum: 583,
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentResult = results[currentIndex];

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
    const maxLength = Math.max(expected.length, read.length);

    return Array.from({ length: maxLength }).map((_, index) => {
      const expectedChar = expected[index] ?? '';
      const readChar = read[index] ?? '';
      const isMatch = expectedChar === readChar && readChar !== '';

      return (
        <span
          key={`${expectedChar}-${readChar}-${index}`}
          className={`plate-char ${isMatch ? 'correct' : 'incorrect'}`}
        >
          {readChar || expectedChar}
        </span>
      );
    });
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
            <img src={afterDetection1} alt="System rozpoznawania tablic rejestracyjnych" />
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="section technologies-section">
          <h2 className="section-header">Technologie</h2>
          <div className="tech-grid">
            <div className="card tech-tile">
              <div className="icon">☕</div>
              <h3 className="card-header">Java</h3>
              <p>Główny język programowania projektu. Java zapewnia solidne podstawy dla przetwarzania obrazów oraz integracji z bibliotekami OpenCV.</p>
            </div>
            <div className="card tech-tile">
              <div className="icon">🏗️</div>
              <h3 className="card-header">Gradle</h3>
              <p>System automatyzacji budowania projektu. Gradle zarządza zależnościami i procesem kompilacji, upraszczając zarządzanie projektem.</p>
            </div>
            <div className="card tech-tile">
              <div className="icon">👁️</div>
              <h3 className="card-header">OpenCV</h3>
              <p>Biblioteka do przetwarzania obrazów. OpenCV umożliwia wykrywanie konturów, segmentację i przygotowanie obrazu do rozpoznawania tekstu.</p>
            </div>
            <div className="card tech-tile">
              <div className="icon">📝</div>
              <h3 className="card-header">Tesseract OCR</h3>
              <p>Silnik optycznego rozpoznawania znaków. Tesseract OCR przekształca wykryte fragmenty obrazu w tekst, identyfikując numer tablicy.</p>
            </div>
            <div className="card tech-tile">
              <div className="icon">✅</div>
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
                  <tbody>
                    <React.Fragment key={currentResult.id}>
                    <tr>
                      <td rowSpan="10" className="img-cell">
                        <div className="header-text">Klatka na wejściu</div>
                        <img src={currentResult.inputImg} alt="Klatka wejściowa" />
                      </td>
                      <td rowSpan="10" className="img-cell">
                        <div className="header-text">Klatka na wyjściu</div>
                        <img src={currentResult.outputImg} alt="Klatka wyjściowa" />
                      </td>
                      <td rowSpan="5" className="data-cell">
                        <div className="header-text">Numer tablicy</div>
                        Oczekiwany:<br />
                        <span className="plate-number">{currentResult.expected}</span>
                      </td>
                      <td rowSpan="5" className="data-cell">
                        <div className="header-text">Liczba znalezionych</div>
                        Konturów:<br />
                        <span className="value">{currentResult.contours}</span>
                      </td>
                      <td rowSpan="3" className="data-cell">
                        <div className="header-text">Czas trwania [ms]</div>
                        Znalezienie:<br />
                        <span className="value">{currentResult.timeFinding}</span>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr>
                      <td rowSpan="3" className="data-cell">
                        Odczytanie:<br />
                        <span className="value">{currentResult.timeReading}</span>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td rowSpan="5" className="data-cell">
                        Odczytany:<br />
                        <span className="plate-number">
                          {renderPlateComparison(currentResult.expected, currentResult.read)}
                        </span>
                      </td>
                      <td rowSpan="5" className="data-cell">
                        Potencjalnych tablic:<br />
                        <span className="value">{currentResult.potentialPlates}</span>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan="4" className="data-cell">
                        Suma:<br />
                        <span className="value">{currentResult.timeSum}</span>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    </React.Fragment>
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