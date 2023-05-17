import { upArrowIcon } from '../img';

const MessageInput = ({ sendMessage }) => {

  const handleInputGrow = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight - 16 + 'px';
  }

  return (
    <div className='message-input'>
      <textarea id='message-textarea' rows={1} onChange={event => handleInputGrow(event)} />
      <button onClick={sendMessage}>
        <img src={upArrowIcon} alt='' />
      </button>
    </div>
  );
}

export default MessageInput;