import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";
import { Exit } from '@rsuite/icons'


function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
  <Button onClick={handleLogout}>
    <span>
    <h6>Log Out <Exit/> </h6>
    </span>
  </Button>
  );
}

export default LogoutButton;