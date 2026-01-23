import { useState } from 'react'
import { useLanguage } from './hooks/useLanguage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';


function App() {
  const [count, setCount] = useState(0)
  const { t } = useLanguage()

  return (
    <>
      <Header /> 
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t.main.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t.main.button} {count}
        </button>
        <p>
          {t.main.description}
        </p>
      </div>
      <p className="read-the-docs">
        {t.main.docs}
      </p>
    </>
  )
}

export default App
