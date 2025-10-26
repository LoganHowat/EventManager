import { useAuth0 } from "@auth0/auth0-react";
import { Panel, Button } from "rsuite";
import { useEffect, useState, useContext } from "react";
import { getEvents, addUserToEvent } from "../database/utils";
import { TokenContext } from "../database/TokenContext";

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
        {events.map((event, index) => (
          <div key={index} className='event-card'>
            <Panel
              bordered
            >
              <h2>{event.title}</h2>
              <h5>Description</h5>
              <p>{event.description}</p>
              <h5>Created By:</h5>
              <p>{event.host}</p>
              {event.attendees.map((attendee: string, idx: number) => {
                // Has to be 1 as host is always an attendee
                if (event.attendees.length === 1) {
                  return <p key={idx}>No attendees yet</p>
                }
                if (attendee !== event.host) {
                  return <p key={idx}>{attendee}</p>
                }
              })}
              <Button onClick={async () => {
                await addUserToEvent(token, event.id, user);
                setEvents(events.filter(e => e.id !== event.id));
              }}>
                Join Event
              </Button>
            </Panel>
          </div>
        ))}
      </div>
    );
  }
};

export default EventsPage;