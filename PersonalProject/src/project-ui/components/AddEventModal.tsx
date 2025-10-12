import { Button, Modal, Input } from 'rsuite';
import { useState, useEffect } from "react";
import { upsertEvent } from '../database/utils';
import { EventDetails } from '../interfaces/Events';


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
  const [title, setTitle] = useState(eventDetails?.title || '');
  const [description, setDescription] = useState(eventDetails?.description || '');

  useEffect(() => {
    if (eventDetails) {
      setTitle(eventDetails.title || '');
      setDescription(eventDetails.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [eventDetails]);

  const handleSubmit = async() => {
    const newEvent = await upsertEvent(token, title, description, user, eventDetails?.id);
    if (eventDetails?.id) {
      const updatedEvent = { 'title': title, 'description': description };
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventDetails.id ? { ...event, ...updatedEvent } : event
        )
      );
    } else {
      console.log(newEvent);
      // Optionally, you can handle adding the new event to the local state here if needed
      setEvents((prevEvents: any) => [...prevEvents, newEvent] );
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
            <Input value={title} onChange={(e) => setTitle(e)}/>
          </div>
          <br/>
          <div>
            <h5>Description:</h5>
            <Input as='textarea' value={description} onChange={(e) => setDescription(e)} />
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