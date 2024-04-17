import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";

function Edit({ id, RT_mention }) {
  const [show, setShow] = useState(false);
  const [tweetText, setTweetText] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const tweetData = {
      id: id, // Agregar RTId a los datos del tweet
      texto: tweetText
    };

    console.log("Tweet Data:", tweetData); // Imprimir en consola los datos antes de enviar la solicitud

    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets/edit', tweetData);
      console.log("Response:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{background: 'black', border: '0px', fontSize: '22px', color: 'grey'}}>
        <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{color: 'white', backgroundColor: 'black', border: '0px' }}>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What is happening?!"
                style={{ color: 'white', backgroundColor: 'black' }}
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black', borderBlockColor: 'grey'}}>
          <Button
            variant="primary"
            onClick={handleSubmit} // Cambiado el manejador a `handleSubmit`
            style={{
              backgroundColor: 'blue',
              borderRadius: '25px',
              width: '25%',
              height: '100%'
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
