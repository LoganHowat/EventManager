import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";
import { addEvent } from "../database/utils";
import { useEffect, useState } from "react";

function EventsPage() {
  const { user, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const claims = await getIdTokenClaims();
      setToken(claims?.__raw);
    };

    fetchToken();
  }, [])

  const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;

  return (
    <div className='page-center'>
      <p>{user?.[`${claimUrl}/username`]}</p>
      <Button onClick={async() => {await addEvent(token)}}>
        Test
      </Button>
    </div>
  );
};

export default EventsPage;