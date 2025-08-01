import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemesProvider } from '@/context/themeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-bgMain text-textMain">
      <ThemesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemesProvider>
    </div>
  </StrictMode>,
)
