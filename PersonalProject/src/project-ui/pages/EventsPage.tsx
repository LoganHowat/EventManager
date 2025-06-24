import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "rsuite";
import { addEvent, getEvents } from "../database/utils";
import { useEffect, useState } from "react";

function EventsPage() {
  const { user, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;

  useEffect(() => {
    const fetchToken = async () => {
      const claims = await getIdTokenClaims();
      setToken(claims?.__raw);
    };

    const getEventsData = async () => {
      setLoading(true);
      try {
        const events = await getEvents(token);
        setEvents(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    }

    getEventsData();
    fetchToken();

  }, [])

  if (loading || !token) {
    return (
      <div className='page-center'>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className='page-center'>
        <p>{user?.[`${claimUrl}/username`]}</p>
        {events.map((event, index) => (
          <div key={index}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Host: {event.host}</p>
          </div>
        ))}
        <Button onClick={async() => {await addEvent(token)}}>
          Test
        </Button>
      </div>
    );
  }
};

export default EventsPage;