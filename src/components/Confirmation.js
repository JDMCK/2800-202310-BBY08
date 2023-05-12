import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Confirmation = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className='text-center'>
        <h1>Your item has been successfully added!</h1>
      </Modal.Header>
      <Modal.Footer className="d-flex justify-content-center">
        <Button id="goHome" onClick={onConfirm}>
          Back to Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
