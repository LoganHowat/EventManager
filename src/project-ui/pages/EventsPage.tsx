import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { Loader } from "rsuite";
import { getEvents, TokenContext, EventsPageCard, PastEventsFilter } from "../";


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
        <Loader size="lg" />
      </div>
    );
  } else {
    return (
      <div className='page-center'>
        <div className="my-events-buttons">
          <PastEventsFilter setPastEvents={setPastEvents}/>
        </div>
        <h3 className="events-page-header">{pastEvents ? 'Past Events:' : 'Upcoming Events:'}</h3>
        {events.length === 0 ? (
          <p>{pastEvents ? 'There are no past events.' : 'There are no upcoming events.'}</p>
        ) :
          <EventsPageCard
            events={events}
            user={user}
            token={token}
            setEvents={setEvents}
          />
        }
      </div>
    );
  }
};

export default EventsPage;