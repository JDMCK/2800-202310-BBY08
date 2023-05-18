import { collection, doc, limit, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";
import { useCollectionDataOnce, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

const ConversationCard = ({ conversationRef }) => {

  const user1Ref = doc(firestore, 'users', conversationRef.data().user_1.id);
  const user2Ref = doc(firestore, 'users', conversationRef.data().user_2.id);

  const [user1] = useDocumentDataOnce(user1Ref);
  const [user2] = useDocumentDataOnce(user2Ref);

  console.log(conversationRef);

  const navigate = useNavigate();

  let to;
  let toId;
  let from;
  let fromId;


  // Recipient (person who is not the current user)
  if (user1Ref.id === auth.currentUser.uid) {
    to = user2;
    toId = user2Ref.id;
    from = user1;
    fromId = user1Ref.id;
  } else {
    to = user1;
    toId = user1Ref.id;
    from = user2;
    fromId = user2Ref.id;
  }

  const messagesRef = collection(firestore, 'conversations', conversationRef.id, 'messages');
  const messagesQuery = query(messagesRef, orderBy('created_at', 'desc'), limit(1));
  const [lastMessage] = useCollectionDataOnce(messagesQuery);

  const handleClick = () => {
    navigate('/chat', {
      state: {
        conversationId: conversationRef.id, toId: toId, fromId: fromId,
        toName: `${to.first_name} ${to.last_name}`,
        fromName: `${from.first_name} ${from.last_name}`
      }
    });
  }

  const getFormattedDate = (seconds) => {
    const date = new Date(seconds * 1000);
    const timeZone = date.getTimezoneOffset();
    const adjustedDate = new Date((timeZone * 60 + seconds) * 1000);
    return adjustedDate.toLocaleDateString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className='conversation-card' onClick={handleClick}>
      <img src={to && to.profile_picture_URL} alt='' />
      <div className='conversation-card-text'>
        {to && <h3>{`${to.first_name} ${to.last_name}`}</h3>}
        {lastMessage && !!lastMessage.length && <>
          <p>{lastMessage[0].message.substring(0, 30) + (lastMessage[0].message.length >= 30 ? '...' : '')}</p>
          <p className='timestamp'>{getFormattedDate(lastMessage[0].created_at.seconds)}</p>
        </>}
      </div>
    </div>
  );
}

export default ConversationCard;