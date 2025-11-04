
interface props {
  event: any,
}

function EventCardDetails(props: props) {
  const { event } = props;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <>
      <h2>{event.title}</h2>
      <h5>Description</h5>
      <p>{event.description}</p>
      <h5>Created By:</h5>
      <p>{event.host}</p>
      <h5>Date</h5>
      <p>{formatDate(event.date)}</p>
      <h5>Time</h5>
      <p>{formatTime(event.time)}</p>
      <h5>Attendees:</h5>
      {event.attendees && event.attendees.map((attendee: string, idx: number) => {
        // Has to be 1 as host is always an attendee
        if (event.attendees.length === 1) {
          return <p key={idx}>No attendees</p>
        }
        if (attendee !== event.host) {
          return <p key={idx}>{attendee}</p>
        }
      })}
    </>
  )

}

export default EventCardDetails;