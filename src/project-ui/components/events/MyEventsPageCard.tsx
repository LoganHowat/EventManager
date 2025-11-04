import { Panel, Button } from 'rsuite';
import { deleteEvent } from "../../";


interface props {
  events: any[],
  token: string,
  setEvents: (events: any[]) => void
  setOpenAddEventModal: (open: boolean) => void,
  setEventDetails: (details: any) => void
}

function EventsPageCard(props: props) {
  const { events, token, setEvents, setEventDetails, setOpenAddEventModal } = props;

  return (
    <>
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
            <h5>Date</h5>
            <p>{event.date}</p>
            <h5>Time</h5>
            <p>{event.time}</p>
            <h5>Attendees:</h5>
            {event.attendees && event.attendees.map((attendee: string, idx: number) => {
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
    </>
  )

}

export default EventsPageCard;