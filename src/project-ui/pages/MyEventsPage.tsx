
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Panel } from "rsuite";
import { getEvents, deleteEvent } from "../database/utils";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../database/TokenContext";
import { AddEventModal } from "../components";
import { EventDetails } from "../interfaces/Events";

function MyEventsPage() {

  const { user } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  // This state is used to store the details of the event being edited
  const [eventDetails, setEventDetails] = useState<EventDetails | undefined>(undefined);
  const [openAddEventModal, setOpenAddEventModal] = useState<boolean>(false);
  const token = useContext(TokenContext);

  useEffect(() => {
    const getEventsData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const events = await getEvents(token, user, true);
        setEvents(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
      setLoading(false);
    }
    getEventsData();
  }, [token, user]);

  if (loading || !token) {
    return (
      <div className='page-center'>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className='page-center'>
        <AddEventModal
          open={openAddEventModal}
          onClose={() => setOpenAddEventModal(false)}
          token={token}
          user={user}
          eventDetails={eventDetails}
          setEvents={setEvents}
        />
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
              <h5>Attendees:</h5>
              {event.attendees.map((attendee: string, idx: number) => {
                // Has to be 1 as host is always an attendee
                if (event.attendees.length === 1) {
                  return <p key={idx}>No attendees yet</p>
                }
                if (attendee !== event.host) {
                  return <p key={idx}>{attendee}</p>
                }
              })}
              <br />
              <Button onClick={() => {
                setEventDetails({
                  id: event.id,
                  title: event.title,
                  description: event.description,
                  date: event.date,
                  time: event.time
                })
                setOpenAddEventModal(true)
              }}>
                Edit
              </Button>
              <Button onClick={async () => {
                await deleteEvent(token, event.id);
                setEvents(events.filter(e => e.id !== event.id));
              }}>
                Delete
              </Button>
            </Panel>
          </div>
        ))}
        <Button onClick={() => {
          setEventDetails({
            id: undefined,
            title: '',
            description: '',
            date: '',
            time: ''
          })
          setOpenAddEventModal(true)
        }}>
          Create Event
        </Button>
      </div>
    );
  }
}

export default MyEventsPage