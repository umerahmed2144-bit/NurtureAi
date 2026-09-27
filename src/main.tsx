import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DemoProvider } from './store/useDemoStore'
import { LangProvider } from './components/lang'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DemoProvider>
        <LangProvider>
          <App />
        </LangProvider>
      </DemoProvider>
    </BrowserRouter>
  </StrictMode>,
)
