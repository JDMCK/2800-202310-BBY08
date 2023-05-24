const Confirmation = ({ onConfirm, id, buttonMessage, title }) => {
  return (

    <dialog id={id} className='confirm-modal'>
      <div className='modal-header'>
        <h2>{title}</h2>
      </div>
      <div className='modal-footer'>
        <button id='confirm-button' onClick={onConfirm}>
          <b>{buttonMessage}</b>
        </button>
      </div>
    </dialog>
  );
};

export default Confirmation;
