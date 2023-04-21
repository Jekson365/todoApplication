import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.scss'


export const PORT = 8080
export const ADDRESS = 'localhost'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
 