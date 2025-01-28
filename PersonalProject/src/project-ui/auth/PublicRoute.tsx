import { Outlet} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
      console.log('isAuthenticated')
      return <Navigate to="/home" replace />;
    }

    return <Outlet />;
  };

export default PublicRoute;