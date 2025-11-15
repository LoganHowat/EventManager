import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "rsuite";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
        return <Loader size="lg" />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    // Render the child route if authenticated
    return <Outlet />;
  };

export default ProtectedRoute;