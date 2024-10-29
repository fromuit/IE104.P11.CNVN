import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from "D:\\IE104.P11.CNVN\\Hải Trần's folder\\reactjs + nodejs\\src\\web_truyen.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Header />
  </StrictMode>,
)
