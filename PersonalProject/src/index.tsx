import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './project-ui/styling/index.scss'
import { LoginPage, LandingPage, TestPage } from './project-ui/pages'
import { ProtectedRoute, PublicRoute, Navigation } from './project-ui';


export default function App() {

  const pages = [
    {
      name: "Home",
      path: "/home",
      element: <LandingPage/>
    },
    {
      name: "Test",
      path: "/test",
      element: <TestPage/>
    }
  ]


  return (
    <BrowserRouter>
    <Navigation pages={pages}/>
      <Routes>
        {/* Pages only acessible if not logged in */}
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<LoginPage/>}/>
        </Route>

        {/* Pages only acessible if logged in */}
        <Route element={<ProtectedRoute/>}>
          {pages.map((page) => {
            return <Route path={page.path} element={page.element} key={page.name}/>
          })}
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
