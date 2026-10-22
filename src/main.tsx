import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Analytics } from '@vercel/analytics/react'

import './styles/globals.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* Only collects on Vercel, once Web Analytics is enabled in the project dashboard */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
