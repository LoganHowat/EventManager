import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown } from "rsuite";
import { useEffect, useState, useContext } from "react";
import { getEvents, TokenContext, EventsPageCard } from "../";


function EventsPage() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<boolean>(false);
  const token = useContext(TokenContext);


  useEffect(() => {
    const getEventsData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const events = await getEvents(token, user, false, pastEvents);
        setEvents(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
      setLoading(false);
    }
    getEventsData();
  }, [token, user, pastEvents])

  if (loading || !token) {
    return (
      <div className='page-center'>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className='page-center'>
        <Dropdown title={'Filter Events'}>
          <Dropdown.Item onClick={() => setPastEvents(false)}>Show Upcoming Events</Dropdown.Item>
          <Dropdown.Item onClick={() => setPastEvents(true)}>Show Past Events</Dropdown.Item>
        </Dropdown>
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