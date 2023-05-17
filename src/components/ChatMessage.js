const ChatMessage = ({ me, message }) => {
  return (
    <div className={'chat-container' + (me ? '' : ' recieved')}>
      <div className='chat-message'>
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default ChatMessage;