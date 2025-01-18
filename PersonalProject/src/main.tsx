import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './project-ui/index.css'
import App from './project-ui/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
