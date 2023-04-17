import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.scss'

export const PORT = 5172
export const ADDRESS = '192.168.0.104'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <div id="particle-js"></div> */}
  </React.StrictMode>,
)
