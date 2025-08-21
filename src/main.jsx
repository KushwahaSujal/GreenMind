import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { UIProvider } from './context/UIContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UIProvider>
    </AuthProvider>
  </React.StrictMode>
)
