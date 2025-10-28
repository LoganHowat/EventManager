import { Button, Modal, Input, DatePicker, TimePicker } from 'rsuite';
import { useState, useEffect } from "react";
import { upsertEvent } from '../database/utils';
import { EventDetails } from '../interfaces/Events';
import { isBefore, format } from 'date-fns';


interface props {
  open: boolean,
  onClose: any,
  token: string,
  setEvents: (event: any) => void,
  user?: any
  eventDetails?: EventDetails
}

function AddEventModal(props: props) {
  const { open, onClose, token, user, eventDetails, setEvents } = props;
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
    } else {
      // Optionally, you can handle adding the new event to the local state here if needed
      setEvents((prevEvents: any) => [...prevEvents, newEvent]);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <h3>Add Event</h3>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <h5>Title:</h5>
            <Input value={title} onChange={(e) => setTitle(e)} />
          </div>
          <div>
            <h5>Description:</h5>
            <Input as='textarea' value={description} onChange={(e) => setDescription(e)} />
          </div>
          <div>
            <h5>Date:</h5>
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
          <div>
            <h5>Time:</h5>
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
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={onClose} title='Cancel' >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;