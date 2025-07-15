import { Button, Modal, Input } from 'rsuite';
import { useState } from "react";
import { addEvent } from '../database/utils';


interface props {
    open: boolean,
    onClose: any,
    token: string,
    user?: any
}

function AddEventModal(props: props) {
  const { open, onClose, token, user } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [host, setHost] = useState('');

  const handleSubmit = () => {
    addEvent(token, title, description, user)
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
            <Input onChange={(e) => setTitle(e)}/>
          </div>
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