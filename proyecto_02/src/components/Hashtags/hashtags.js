import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaHashtag } from "react-icons/fa";

function Example({ hashtags, setHashtags }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (inputValue.trim() !== '') {
      const hashtagList = inputValue.trim().split(' '); // Dividir inputValue por espacios
      setHashtags([...hashtags, ...hashtagList]); // Pasar la lista a setHashtags
      setInputValue('');
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{background: 'black', border: '0px', color:'blue', fontSize: '22px' }}>
        <FaHashtag />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hashtags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Don't use '#'"
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

export default Example;
