import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";

function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
  <Button onClick={handleLogout}>
    <h6>Log Out</h6>
  </Button>
  );
}

export default LogoutButton;