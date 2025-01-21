import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './project-ui/index.css'
import App from './project-ui/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-ahoke2dpse1ukocx.us.auth0.com"
      clientId="9Bk8a28KwLkRqfNrJcAs3huFEJC5y5Fy"
      redirectUri='http://localhost:5173'
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
