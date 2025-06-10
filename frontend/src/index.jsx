import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/index.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import socket from './services/initSocket.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App socket={socket} />
  </StrictMode>,
)
