import { useAuth0 } from "@auth0/auth0-react";

function EventsPage() {
  const { user } = useAuth0();
  const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;

  return (
    <div>
      <p>Hello World</p>
      <p>{user?.[`${claimUrl}/username`]}</p>
    </div>
  );
};

export default EventsPage;