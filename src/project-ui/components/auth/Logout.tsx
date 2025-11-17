import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";
import { Exit } from '@rsuite/icons'


function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin + '/EventManager/' });
  };

  return (
  <Button onClick={handleLogout} style={{backgroundColor: '#f55656ff'}}>
    <span>
    <h6>Log Out <Exit/> </h6>
    </span>
  </Button>
  );
}

export default LogoutButton;