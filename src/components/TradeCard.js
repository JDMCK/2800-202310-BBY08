import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { firestore } from "../config/firebase";
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { trading, placeholderImage } from '../img';
import InventoryItem from './InventoryItem';

const TradeCard = ({ tradeData, type, tradeID }) => {
  const [theirName, setTheirName] = useState('');

  const mySelected = [];
  const theirSelected = [];
  let theirNameID = '';
  const navigate = useNavigate();

  // The size will always be three or less
  const receiverSize = tradeData.receiver_selected.length > 3 ? 3 : tradeData.receiver_selected.length;
  const senderSize = tradeData.sender_selected.length > 3 ? 3 : tradeData.sender_selected.length; 

  // If type is incoming, reciever will be the current user, otherwise sender is current user
  if (type === 'incoming') {
    for (let i = 0; i < receiverSize; i++) {
      mySelected.push(tradeData.receiver_selected[i].id);
    }
    for (let j = 0; j < senderSize; j++) {
      theirSelected.push(tradeData.sender_selected[j].id);
    }
    theirNameID = tradeData.receiver_ref.id;
  } else {
    for (let i = 0; i < receiverSize; i++) {
      theirSelected.push(tradeData.receiver_selected[i].id);
    }
    for (let j = 0; j < senderSize; j++) {
      mySelected.push(tradeData.sender_selected[j].id); 
    }
    theirNameID = tradeData.sender_ref.id;
  }

  const getTheirName = async () => {
    const docRef = doc(firestore, 'users', theirNameID);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setTheirName(docSnapshot.data().first_name + ' ' + docSnapshot.data().last_name);
      } else {
        setTheirName('No name');
      }
    } catch(error) {
      console.error('Error fetching name: ', error);
    }
  }

  getTheirName();



  // Query the database for items that were selected
  const [mySelectedItems] = useCollectionDataOnce(query(collection(firestore, 'items'), where('__name__', 'in', mySelected)));
  const [theirSelectedItems] = useCollectionDataOnce(query(collection(firestore, 'items'), where('__name__', 'in', theirSelected)));

  const goCurrentTrade = () => {
    navigate('/trading', {state: {tradeData: JSON.stringify(tradeData), type: type, tradeID: tradeID}});
  }

  return (
    <div className='marketplace-card' onClick={goCurrentTrade}>
      <p>Your selected item's</p>
      <section className='selected-inventory'>
        {theirSelectedItems && theirSelectedItems.map((item, i) =>
          <InventoryItem key={i} onClick={undefined} thumbnail={item.picture_URL ? item.picture_URL : placeholderImage} />)
        }
      </section>
      <div className='trade-icon-container'>
        <img id='trading-symbol' src={trading} alt='Trading' />
      </div>
      <p>{theirName}'s selected Items </p>
      <section className='selected-inventory'>
        {mySelectedItems && mySelectedItems.map((item, i) =>
          <InventoryItem key={i} onClick={undefined} thumbnail={item.picture_URL ? item.picture_URL : placeholderImage} />)
        }
      </section>
    </div>
  )
};

export default TradeCard;
