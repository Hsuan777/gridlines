import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Gridlines from './Gridlines.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gridlines />
  </StrictMode>,
)
