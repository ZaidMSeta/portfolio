import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Analytics } from '@vercel/analytics/react'

import './styles/globals.css'
import App from './App'
import { site } from './data/site'

// For anyone who opens devtools
console.log(
  `%czaid.seta%c\n\nYou opened the console, so you're my kind of person.\nThe source is at ${site.repo}\nAnd if you're hiring for Winter or Summer 2027: ${site.email}`,
  'font: 700 20px ui-monospace, monospace; color: #5eead4',
  'font: 13px ui-monospace, monospace; color: inherit',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* Only collects on Vercel, once Web Analytics is enabled in the project dashboard */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
