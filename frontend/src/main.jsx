import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Brand fonts, self-hosted as .woff2 (see docs/brand-book.md → Fonts)
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
