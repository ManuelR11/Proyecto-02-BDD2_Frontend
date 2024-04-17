import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaHashtag } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { CiLink } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";

function Example() {
  const [show, setShow] = useState(false);

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
            <FaHashtag />
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <BiWorld />
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <CiLink />
          </Button>
          <Button variant="outline-primary" style={{ marginLeft: '5px', border: '0px', fontSize: '22px'  }}>
            <IoMdPersonAdd />
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
