import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Navbar } from '../components';
import { collection, doc, or, query, where } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import ConversationCard from '../components/ConversationCard';

const Conversations = () => {

  const currentUserRef = doc(firestore, 'users', auth.currentUser.uid)
  const conversationsRef = collection(firestore, 'conversations')
  const conversationsQuery = query(conversationsRef, or(
    where('user_1', '==', currentUserRef),
    where('user_2', '==', currentUserRef)
  ));
  const [conversations] = useCollectionOnce(conversationsQuery);

  return (
    <>
      <Navbar title='Conversations' backArrow={true} />
      <section className='conversation-cards'>
        {conversations && conversations.docs.map((doc, i) =>
          <ConversationCard key={i} conversationRef={doc} />)}
      </section>
    </>
  );
}

export default Conversations;