import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaHashtag } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { CiLink } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import Hashtags from '../Hashtags/hashtags.js';
import Example1 from '../Links/links.js'; // Cambia el nombre de la importación a Example1
import Example2 from '../Mentions/mentions.js'; // Cambia el nombre de la importación a Example2
import Example3 from "../Location/location.js";

function Example() {
  const [show, setShow] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [links, setLinks] = useState([]); // Cambia el nombre de la variable a `links`
  const [mentions, setmentions] = useState([]); // Cambia el nombre de la variable a `mentions`
  const [location, setLocation] = useState('');

  useEffect(() => {
    console.log(hashtags); // Imprimir la lista de hashtags
  }, [hashtags]);

  useEffect(() => {
    console.log(links); // Imprimir la lista de Links
  }, [links]);

    useEffect(() => {
    console.log(mentions); // Imprimir la lista de mentions
    }, [mentions]);

    useEffect(() => {
    console.log(location); // Imprimir la lista de location
    }, [location]);
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          backgroundColor: 'blue',
          width: '220px',
          height: '60px',
          textAlign: 'center',
          borderRadius: '25px'
        }}
      >
        Post
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
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black', borderBlockColor: 'grey'}}>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px' }}>
            <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <Example3 location={location} setLocation={setLocation}/>
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <Example1 links={links} setLinks={setLinks} /> {/* Cambia el nombre de la variable a `Example1` */}
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <Example2 mentions={mentions} setmentions={setmentions} />
          </Button>

          <Button
            variant="primary"
            onClick={handleClose}
            style={{
              backgroundColor: 'blue',
              borderRadius: '25px',
              width: '25%',
              height: '100%'
            }}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
