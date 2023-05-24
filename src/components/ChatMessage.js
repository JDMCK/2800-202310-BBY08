const ChatMessage = ({ me, message, systemMessage }) => {
  return (
    <div className={'chat-container' + (systemMessage ? ' system-message' : (me ? '' : ' recieved'))}>
      <div className='chat-message'>
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default ChatMessage;