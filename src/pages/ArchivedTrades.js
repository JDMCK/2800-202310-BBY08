import { and, collection, doc, getDocs, or, query, where } from 'firebase/firestore';
import { Navbar, TradeCard } from '../components';
import { firestore, auth } from '../config/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';

const ArchivedTrades = () => {

  const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);

  const [userDoc] = useDocumentDataOnce(userDocRef);

  const tradesCollectionRef = collection(firestore, 'trades');
  const tradeQuery = query(tradesCollectionRef,
    and(or(where('sender_ref', '==', userDocRef), where('receiver_ref', '==', userDocRef)),
      where('trade_status', '==', 'complete')));

  const [archivedTrades, setArchivedTrades] = useState();

  useEffect(() => {
    const getTrades = async () => {
      const tradeDocs = await getDocs(tradeQuery);
      setArchivedTrades(tradeDocs);
    }
    getTrades();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar title='Archive' backArrow={true} />
      <div id='trades'>
        {archivedTrades && archivedTrades.docs.map((trade, i) =>
          <TradeCard key={i} tradeData={trade.data()} type='incoming'
            tradeID={archivedTrades.docs[i].id} myName={userDoc.first_name + ' ' + userDoc.last_name} />)}
      </div>
    </>
  );
}

export default ArchivedTrades;