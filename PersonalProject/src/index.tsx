import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './project-ui/index.css'
import { LoginPage, LandingPage } from './project-ui/pages'
import { ProtectedRoute, PublicRoute, Navigation } from './project-ui';


export default function App() {


  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        {/* Pages only acessible if not logged in */}
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<LoginPage/>}/>
        </Route>

        {/* Pages only acessible if logged in */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<LandingPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-sf5nk6apumodlmgm.us.auth0.com"
      clientId="XbmgHfg0Fopy7SRqgd8ALI7AQFOfvItZ"
      redirectUri={window.location.origin + "/home"}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
