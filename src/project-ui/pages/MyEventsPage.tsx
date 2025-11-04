
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dropdown } from "rsuite";
import { useEffect, useState, useContext } from "react";
import {
  TokenContext,
  AddEventModal,
  MyEventsPageCard,
  EventDetails,
  getEvents
} from "..";


function MyEventsPage() {

  const { user } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  // This state is used to store the details of the event being edited
  const [eventDetails, setEventDetails] = useState<EventDetails | undefined>(undefined);
  const [openAddEventModal, setOpenAddEventModal] = useState<boolean>(false);
  const [pastEvents, setPastEvents] = useState<boolean>(false);

  const token = useContext(TokenContext);

  useEffect(() => {
    const getEventsData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const events = await getEvents(token, user, true, pastEvents);
        setEvents(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
      setLoading(false);
    }
    getEventsData();
  }, [token, user, pastEvents]);

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
        <AddEventModal
          open={openAddEventModal}
          onClose={() => setOpenAddEventModal(false)}
          token={token}
          user={user}
          eventDetails={eventDetails}
          setEvents={setEvents}
        />
        <MyEventsPageCard
          events={events}
          token={token}
          setEvents={setEvents}
          setOpenAddEventModal={setOpenAddEventModal}
          setEventDetails={setEventDetails}
        />
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