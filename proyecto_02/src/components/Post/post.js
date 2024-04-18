import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Hashtags from '../Hashtags/hashtags.js';
import Example1 from '../Links/links.js'; // Cambia el nombre de la importación a Example1
import Example2 from '../Mentions/mentions.js'; // Cambia el nombre de la importación a Example2
import Example3 from "../Location/location.js";
import axios from 'axios';

function Example() {
  const [show, setShow] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [links, setLinks] = useState([]); // Cambia el nombre de la variable a `links`
  const [mentions, setmentions] = useState([]); // Cambia el nombre de la variable a `mentions`
  const [location, setLocation] = useState('');
  const [tweetText, setTweetText] = useState('');

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

  const handleSubmit = async () => {
    const tweetData = {
      autorId: 'valdecin10', // Utilizar loggedInUser como el autor del tweet
      texto: tweetText,
      hashtags: hashtags,
      links: links,
      pais: location,
      mentions: mentions
    };

    console.log("Tweet Data:", tweetData); // Imprimir en consola los datos antes de enviar la solicitud

    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets', tweetData);
      console.log("Response:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
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
            onClick={handleSubmit} // Cambiado el manejador a `handleSubmit`
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
