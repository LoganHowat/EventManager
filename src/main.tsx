import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './project-ui/styling/index.scss'
import 'rsuite/dist/rsuite.min.css';
import { LoginPage, EventsPage, MyEventsPage } from './project-ui/pages'
import { ProtectedRoute, PublicRoute, Navigation } from './project-ui';
import TokenProvider from './project-ui/database/TokenContext';


export default function App() {

  const pages = [
    {
      name: "Home",
      path: "/home",
      element: <EventsPage/>
    },
    {
      name: "My Events",
      path: "/myEvents",
      element: <MyEventsPage/>
    }
  ]


  return (
    <BrowserRouter basename="/EventManager">
    {location.pathname != '/' && <Navigation pages={pages}/>}
      <Routes>
        {/* Pages only acessible if not logged in */}
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<LoginPage/>}/>
        </Route>

        {/* Pages only acessible if logged in */}
        <Route element={<ProtectedRoute/>}>
          {pages.map((page) => {
            return <Route
            path={page.path}
            element={
              <TokenProvider>
                {page.element}
              </TokenProvider>
            }
            key={page.name}/>
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
