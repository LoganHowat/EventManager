import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    // Render the child route if authenticated
    return <Outlet />;
  };

export default ProtectedRoute;