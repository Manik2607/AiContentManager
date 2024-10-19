// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import GetStarted from './landing.tsx'
import { useState } from 'react'

 
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* {show ? <App /> : <GetStarted/>} */}
      <App/>
    </ThemeProvider>
  /* </StrictMode> */
)
