
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Panel } from "rsuite";
import { getEvents } from "../database/utils";
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
  console.log(events)

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
  
  // Function to update an event in the local state
  const updateEventInState = (id: string, title: string, description: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  // Function to add a new event to the local state
  const addEventToState = (newEvent: any) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

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
          handleEventUpdate={updateEventInState}
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
              <br/>
              <Button onClick={() => {
                setEventDetails({
                  id: event.id,
                  title: event.title,
                  description: event.description,
                })
                setOpenAddEventModal(true)
              }}>
                Edit
              </Button>
            </Panel>
          </div>
        ))}
        <Button onClick={() => setOpenAddEventModal(true)}>
          Create Event
        </Button>
      </div>
    );
  }
}

export default MyEventsPage