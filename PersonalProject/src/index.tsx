import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './project-ui/index.css'
import { LoginPage, LandingPage } from './project-ui/pages'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="login" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-ahoke2dpse1ukocx.us.auth0.com"
      clientId="9Bk8a28KwLkRqfNrJcAs3huFEJC5y5Fy"
      redirectUri='http://localhost:5173'
      propmt='none'
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
