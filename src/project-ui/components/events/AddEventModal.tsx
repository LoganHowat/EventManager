import { Button, Modal, Input, DatePicker, TimePicker } from 'rsuite';
import { useState, useEffect } from "react";
import { EventDetails, upsertEvent } from '../../';
import { isBefore, format } from 'date-fns';


interface props {
  open: boolean,
  onClose: any,
  token: string,
  setEvents: (event: any) => void,
  pastEvents: boolean,
  user?: any
  eventDetails?: EventDetails
}

function AddEventModal(props: props) {
  const { open, onClose, token, user, eventDetails, setEvents, pastEvents } = props;
  const [title, setTitle] = useState<string>(eventDetails?.title || '');
  const [description, setDescription] = useState<string>(eventDetails?.description || '');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    if (eventDetails) {
      setTitle(eventDetails.title);
      setDescription(eventDetails.description);
      setDate(eventDetails.date);
      setTime(eventDetails.time);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
    }
  }, [eventDetails]);

  const handleSubmit = async () => {
    const newEvent = await upsertEvent(
      token,
      title,
      description,
      date,
      time,
      user,
      eventDetails?.id
    );
    if (eventDetails?.id) {
      const updatedEvent = { 'title': title, 'description': description, 'date': date, 'time': time };
      setEvents((prevEvents: EventDetails[]) =>
        prevEvents.map(event =>
          event.id === eventDetails.id ? { ...event, ...updatedEvent } : event
        )
      );
      // As users can only add new upcoming events, we only need to update the local state when editing an event
    } else if (!pastEvents) {
      setEvents((prevEvents: any) => [...(prevEvents || []), newEvent]);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className='add-event-modal'>
      <Modal.Header>
        <h3>Add Event</h3>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <h5>Title: <span style={{ color: 'red' }}>*</span></h5>
            <Input value={title} onChange={(e) => setTitle(e)} />
          </div>
          <br />
          <div>
            <h5>Description: <span style={{ color: 'red' }}>*</span></h5>
            <Input as='textarea' value={description} onChange={(e) => setDescription(e)} />
          </div>
          <br />
          <div>
            <h5>Date: <span style={{ color: 'red' }}>*</span></h5>
            <DatePicker
              format="dd MMM yyyy"
              placeholder="Select Date"
              shouldDisableDate={date => isBefore(date, new Date())}
              block
              value={date ? new Date(date) : null}
              onChange={(value) => {
                value ? setDate(format(value, 'yyyy-MM-dd')) : setDate('');
              }}
            />
          </div>
          <br />
          <div>
            <h5>Time: <span style={{ color: 'red' }}>*</span></h5>
            <TimePicker
              placeholder="Select Time"
              block
              // Date type expects a full date, so we create a dummy date with the time
              value={time ? new Date(`1970-01-01T${time}`) : null}
              onChange={(value) => {
                value ? setTime(format(value, 'HH:mm:ss')) : setTime('');
              }}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: '#5ad15eff' }}
          onClick={handleSubmit}
          disabled={!title || !description || !date || !time}
        >
          Submit
        </Button>
        <Button onClick={onClose} title='Cancel' style={{ backgroundColor: '#ebc034ff' }} >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;