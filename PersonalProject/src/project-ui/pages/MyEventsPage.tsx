
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Panel } from "rsuite";
import { getEvents } from "../database/utils";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../database/TokenContext";
import { AddEventModal } from "../components";

function MyEventsPage() {

  const { user } = useAuth0();
  // const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [openAddEventModal, setOpenAddEventModal] = useState<boolean>(false);
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
}

export default MyEventsPage