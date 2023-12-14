import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './LoadingContext.jsx';
import { LoggerProvider } from './LoggerContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(


  <BrowserRouter>

    <LoggerProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </LoggerProvider>
  </BrowserRouter>,

)
