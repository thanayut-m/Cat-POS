import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Package from './pages/Package.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Package />
    {/* <App /> */}
  </StrictMode>,
)
