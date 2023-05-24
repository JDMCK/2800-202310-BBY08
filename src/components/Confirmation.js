const Confirmation = ({ onConfirm }) => {
  return (

    <dialog id='confirm-modal'>
      <div className='modal-header'>
        <h2>Your item has been successfully added!</h2>
      </div>
      <div className='modal-footer'>
        <button id='go-home' onClick={onConfirm}>
          <b>Back to Home</b>
        </button>
      </div>
    </dialog>
  );
};

export default Confirmation;
