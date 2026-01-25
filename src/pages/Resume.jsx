import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './Resume.css';
import { useLanguage } from '../hooks/useLanguage';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
  const { t, language } = useLanguage();
  const [numPages, setNumPages] = useState(null);
  
  // Map language codes to resume file names
  const resumeFiles = {
    en: '/resumes/rg_resume_eng.pdf',
    fr: '/resumes/rg_resume_fr.pdf',
    pl: '/resumes/rg_resume_pl.pdf'
  };

  const resumePdfPath = resumeFiles[language] || resumeFiles.en;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = `Rosy_dev_Resume_${language}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="resume-page">
      <h1 className="resume-title">{t.resume.title}</h1>
      
      <div className="resume-container">
        <div className="resume-viewer">
          <Document
            file={resumePdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-document"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={Math.min(window.innerWidth * 0.6, 700)}
              />
            ))}
          </Document>
        </div>
        <button onClick={handleDownload} className="download-button">
          📥 {t.resume.download}
        </button>
      </div>
    </div>
  );
}

export default Resume;
