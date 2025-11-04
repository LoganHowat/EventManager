import { Panel, Button } from 'rsuite';
import { EventCardDetails, joinOrLeaveEvent } from "../../";


interface props {
  events: any[],
  user: any,
  token: string,
  setEvents: (events: any[]) => void
}

function EventsPageCard(props: props) {
  const { events, user, token, setEvents } = props;
  const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;

  return (
    <>
      {
        events.map((event, index) => (
          <div key={index} className='event-card'>
            <Panel
              bordered
            >
              <EventCardDetails event={event} />
              {event.date < new Date().toISOString().split('T')[0] ? null : (
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
              )}
            </Panel>
          </div>
        ))
      }
    </>
  )

}

export default EventsPageCard;