import { Modal } from 'rsuite';
import { useState } from "react";
import { addEvent } from '../database/utils';


interface props {
    open: boolean,
    onClose: any,
    token: string
}

function AddEventModal(props: props) {
  const { open, onClose, token } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [host, setHost] = useState('');

  const handleSubmit = () => {
    addEvent(token)
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Host:</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;