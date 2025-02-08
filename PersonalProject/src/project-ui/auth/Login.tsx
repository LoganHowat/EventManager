import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
          loginWithRedirect({
              appState: { returnTo: "/home" },
          })
      }
    >
      Log In
    </Button>
  );
};

export default LoginButton;