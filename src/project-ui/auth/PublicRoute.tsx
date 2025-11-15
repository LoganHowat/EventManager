import { Outlet} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { Loader } from "rsuite";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Wait for authentication state to resolve
  if (isLoading) {
      return <Loader size="lg" />;
  }

  // Redirect to /home if the user is authenticated
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;