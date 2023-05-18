import { useState, } from 'react';
import { collection, doc, query, where } from 'firebase/firestore';
import { auth, firestore } from "../config/firebase";
import { Footer, Navbar, Tab, TradeCard } from "../components";
import { useCollectionDataOnce, useCollectionOnce, useDocumentDataOnce } from 'react-firebase-hooks/firestore';

const Trades = () => {
  // States for tabs
  const [incomingSelected, setIncomingSelected] = useState(true);
  const [sentSelected, setSentSelected] = useState(false);

  // Get the current user's name
  const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const [userDoc] = useDocumentDataOnce(userDocRef);

  // Get the list of trades
  const tradesRef = collection(firestore, 'trades');
  const [incomingTradesRef] = useCollectionOnce(query(tradesRef, where('sender_ref', '==', userDocRef), where('trade_status', '==', 'incomplete')));
  const [incomingTrades] = useCollectionDataOnce(query(tradesRef, where('sender_ref', '==', userDocRef), where('trade_status', '==', 'incomplete')));
  const [sentTradesRef] = useCollectionOnce(query(tradesRef, where('receiver_ref', '==', userDocRef), where('trade_status', '==', 'incomplete')));
  const [sentTrades] = useCollectionDataOnce(query(tradesRef, where('receiver_ref', '==', userDocRef), where('trade_status', '==', 'incomplete')));

  // Onclick functions for tabs
  const displayIncoming = () => {
    if (incomingSelected !== true) {
      setIncomingSelected(true);
      setSentSelected(false);
    }
  };

  const displaySent = () => {
    if (sentSelected !== true) {
      setSentSelected(true);
      setIncomingSelected(false);
    }
  };


  return (
    <>
      <Navbar title="Trades" />
      <div className='trades-content'>
        <div className='trade-tabs'>
          <Tab id='incomingTab' onClick={() => displayIncoming()} selected={incomingSelected} tabName='Incoming Offers' />
          <Tab id='sentTab' onClick={() => displaySent()} selected={sentSelected} tabName='Sent Offers' />
        </div>
        <div id='trades'>
          {incomingSelected && incomingTrades &&
            incomingTrades.map((trade, i) =>
              <TradeCard key={i} tradeData={trade} type='incoming' tradeID={incomingTradesRef.docs[i].id} myName={userDoc.first_name + ' ' + userDoc.last_name}/>)
          }
          {sentSelected && sentTrades &&
            sentTrades.map((trade, i) =>
              <TradeCard key={i} tradeData={trade} type='sent' tradeID={sentTradesRef.docs[i].id} myName={userDoc.first_name + ' ' + userDoc.last_name}/>)
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trades;