import { useLocation } from 'react-router-dom';
import { Navbar } from '../components';
import { addDoc, collection, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import { useEffect } from 'react';

const Chat = () => {

  const location = useLocation();
  const conversationId = location.state.conversationId;
  const toName = location.state.toName;
  const fromName = location.state.fromName;

  const conversationRef = collection(firestore, 'conversations', conversationId, 'messages');
  const conversationQuery = query(conversationRef, orderBy('created_at'), limit(50));
  const [messages] = useCollectionData(conversationQuery);

  const sendMessage = async () => {
    const messageInput = document.getElementById('message-textarea');
    const message = messageInput.value;
    if (!message) return;
    messageInput.value = '';
    messageInput.style.height = 'auto';
    const messagesRef = collection(firestore, 'conversations', conversationId, 'messages');
    await addDoc(messagesRef, { created_at: new Date(), sender: fromName, message: message });
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  })

  return (
    <>
      <div className='chat-background'>
        <Navbar title={toName && toName} backArrow={true} />
        <div className='messages'>
          {messages && messages.map((message, i) => <ChatMessage key={i} me={toName !== message.sender} message={message} />
          )}
        </div>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Chat;