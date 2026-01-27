import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import RoseCalyxBackground from './components/RoseCalyxBackground';
import Home from './pages/Home';
import Resume from './pages/Resume';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import SimpleGame from './pages/SimpleGame';
import Stardust from './pages/Stardust';

function App() {
  return (
    <Router>
      {/* <RoseCalyxBackground /> */}
      <Header /> 
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/simplegame" element={<SimpleGame />} />
          <Route path="/projects/stardust" element={<Stardust />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
