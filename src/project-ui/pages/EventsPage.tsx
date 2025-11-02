import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { getEvents } from "../database/utils";
import { TokenContext } from "../database/TokenContext";
import { EventsPageCard } from "../components";

function EventsPage() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const token = useContext(TokenContext);


  useEffect(() => {
    const getEventsData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const events = await getEvents(token, user);
        setEvents(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
      setLoading(false);
    }
    getEventsData();
  }, [token, user])

  if (loading || !token) {
    return (
      <div className='page-center'>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className='page-center'>
        <EventsPageCard
          events={events}
          user={user}
          token={token}
          setEvents={setEvents}
        />
      </div>
    );
  }
};

export default EventsPage;