import { useAuth0 } from "@auth0/auth0-react";
import { Panel, Button } from "rsuite";
import { useEffect, useState, useContext } from "react";
import { getEvents, joinOrLeaveEvent } from "../database/utils";
import { TokenContext } from "../database/TokenContext";

function EventsPage() {
  const { user } = useAuth0();
  const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;
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
                const joined = event.attendees.includes(user?.[`${claimUrl}/username`]);
                await joinOrLeaveEvent(token, event.id, joined, user);
                // Handles local state update for attendees without refetching
                const eventsChanged = events.map(e => {
                  if (e.id === event.id) {
                    if (joined) {
                      return {
                        ...e,
                        // Remove user from attendees array
                        attendees: e.attendees.filter((a: string) => a !== user?.[`${claimUrl}/username`])
                      };
                    } else {
                      return {
                        ...e,
                        // Add user to attendees array
                        attendees: [...e.attendees, user?.[`${claimUrl}/username`]]
                      };
                    }
                  }
                })
                setEvents(eventsChanged);
              }}>
                {event.attendees.includes(user?.[`${claimUrl}/username`]) ? 
                'Leave Event' : 'Join Event'}
              </Button>
            </Panel>
          </div>
        ))}
      </div>
    );
  }
};

export default EventsPage;