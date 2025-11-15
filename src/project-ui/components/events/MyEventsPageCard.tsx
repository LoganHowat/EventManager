import { Panel, Button } from 'rsuite';
import { deleteEvent, EventCardDetails } from "../../";


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
            <EventCardDetails event={event} />
            <br />
            {event.date <= new Date().toISOString().split('T')[0] ? null : (
              <Button
                style={{marginRight: '15px'}}
                onClick={() => {
                  setEventDetails({
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time
                  })
                  setOpenAddEventModal(true)
                }}
              >
                Edit
              </Button>
            )}
            <Button
              onClick={async () => {
                await deleteEvent(token, event.id);
                setEvents(events.filter(e => e.id !== event.id));
              }}
            >
              Delete
            </Button>
          </Panel>
        </div>
      ))}
    </>
  )

}

export default EventsPageCard;