import { Outlet} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      loginWithRedirect();
      return null; // Prevent rendering until redirection occurs
    }
  
    // Render the child route if authenticated
    return <Outlet />;
  };

export default PrivateRoute;