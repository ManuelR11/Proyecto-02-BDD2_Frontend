import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiWorld } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";

function Example3({ location, setLocation }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (inputValue.trim() !== '') {
      setLocation(inputValue.trim()); // Actualiza la variable de location
      setInputValue('');
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{background: 'black', border: '0px', color:'blue', fontSize: '22px' }}>
        <BiWorld />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text" // Cambiado a "text"
                placeholder="Enter your city"
                autoFocus
                style={{ color: 'white', backgroundColor: 'black'}}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black', color: 'white' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example3;
