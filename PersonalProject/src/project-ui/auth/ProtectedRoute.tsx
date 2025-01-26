import { Outlet} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
  
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      loginWithRedirect();
      return null; // Prevent rendering until redirection occurs
    }
  
    // Render the child route if authenticated
    return <Outlet />;
  };

export default PrivateRoute;