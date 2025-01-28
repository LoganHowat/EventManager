import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin // Optional: redirect back to the home page after logout
    });
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

export default LogoutButton;