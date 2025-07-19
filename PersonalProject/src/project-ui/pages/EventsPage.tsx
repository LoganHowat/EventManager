import { useAuth0 } from "@auth0/auth0-react";
import { Button, Panel } from "rsuite";
import { getEvents } from "../database/utils";
import { useEffect, useState } from "react";
import { AddEventModal } from "../components";

function EventsPage() {
  const { user, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [openAddEventModal, setOpenAddEventModal] = useState<boolean>(false);

  useEffect(() => {
    const getEventsData = async () => {
      setLoading(true);
      try {
        const claims = await getIdTokenClaims();
        const fetchedToken = claims?.__raw;
        setToken(fetchedToken);

        if (fetchedToken) {
          const events = await getEvents(fetchedToken, user);
          setEvents(events || []);
        }

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
        <AddEventModal
          open={openAddEventModal}
          onClose={() => setOpenAddEventModal(false)}
          token={token}
          user={user}
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
            </Panel>
          </div>
        ))}
        <Button onClick={() => setOpenAddEventModal(true)}>
          Create Event
        </Button>
      </div>
    );
  }
};

export default EventsPage;