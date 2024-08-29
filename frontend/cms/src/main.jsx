import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {MenuButtonProvider} from './context/MenuButtonContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuButtonProvider>
    <App />
    </MenuButtonProvider> 
  </StrictMode>,
)
