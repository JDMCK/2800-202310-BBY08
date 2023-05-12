// import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const Confirmation = ({ onConfirm }) => {
  return (

    <dialog id='confirm-modal'>
      <div className='modal-header'>
        <h2>Your item has been successfully added!</h2>
      </div>
      <div className='modal-footer'>
        <button id="goHome" onClick={onConfirm}>
          <b>Back to Home</b>
        </button>
      </div>
    </dialog>

    // <Modal show={show} onHide={onHide} centered>
    //   <Modal.Header className='text-center'>
    //     <h1>Your item has been successfully added!</h1>
    //   </Modal.Header>
    //   <Modal.Footer className="d-flex justify-content-center">
    //     <Button id="goHome" onClick={onConfirm}>
    //       Back to Home
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default Confirmation;
