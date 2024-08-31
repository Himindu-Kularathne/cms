import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {MenuButtonProvider} from './context/MenuButtonContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <MenuButtonProvider>
    <App />
    </MenuButtonProvider> 
    </UserProvider>
  </StrictMode>,
)
