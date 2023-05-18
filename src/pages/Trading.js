import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { placeholderImage } from '../img';
import { Navbar, InventoryItem, EditTradeModal } from '../components';
import { tradesIcon } from '../img';
import { useEffect, useRef, useState } from 'react';

const Trading = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const myName = location.state.myName;
  const theirName = location.state.theirName;
  const tradeId = location.state.tradeID;
  const tradeData = JSON.parse(location.state.tradeData);

  const receiverSelectedIds = tradeData.receiver_selected.map(item => item._key.path.segments.at(-1));
  const senderSelectedIds = tradeData.sender_selected.map(item => item._key.path.segments.at(-1));

  const receiverId = tradeData.receiver_ref._key.path.segments.at(-1);
  const senderId = tradeData.sender_ref._key.path.segments.at(-1);
  const receiverRef = doc(firestore, 'users', receiverId);
  const senderRef = doc(firestore, 'users', senderId);

  const type = location.state.type;

  const [receiverItems, setReceiverItems] = useState();
  const [senderItems, setSenderItems] = useState();

  const initialReceiverItems = useRef();
  const initialSenderItems = useRef();

  useEffect(() => {
    const getItems = async (ids, setter, ref) => {
      const itemRefs = ids.map(id => doc(firestore, 'items', id));
      const itemPromises = itemRefs.map(ref => getDoc(ref));
      const itemDocs = await Promise.all(itemPromises);
      ref.current = itemDocs;
      setter(itemDocs);
    }
    getItems(receiverSelectedIds, setReceiverItems, initialReceiverItems);
    getItems(senderSelectedIds, setSenderItems, initialSenderItems);
  }, []);

  // Button handlers
  const handleEditOffer = () => {
    document.getElementById('offer-modal').showModal();
  };

  const handleEditRequest = () => {
    document.getElementById('request-modal').showModal();
  }

  const determineUserItems = (itemType) => {
    if (itemType === 'requested') {
      if (type === 'sent' && receiverItems) {
        return receiverItems.map((doc, i) =>
          <InventoryItem key={i}
            thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
          />)
      }
      else if (senderItems) {
        return senderItems.map((doc, i) =>
          <InventoryItem key={i}
            thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
          />)
      }
    } else {
      if (type === 'sent' && senderItems) {
        return senderItems.map((doc, i) =>
          <InventoryItem key={i}
            thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
          />)
      }
      else if (receiverItems) {
        return receiverItems.map((doc, i) =>
          <InventoryItem key={i}
            thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
          />)
      }
    }
  }

  const handleDeleteTrade = async () => {
    const tradeRef = doc(firestore, 'trades', tradeId);
    await deleteDoc(tradeRef);
    navigate('/trades');
  }

  const isTradeChanged = () => {
    return !(JSON.stringify(initialReceiverItems.current) === JSON.stringify(receiverItems) &&
      JSON.stringify(initialSenderItems.current) === JSON.stringify(senderItems))
  }

  const handleConfirmTrade = async () => {

    const tradeRef = doc(firestore, 'trades', tradeId);

    if (isTradeChanged()) {
      const newTrade = {
        receiver_ref: senderRef,
        sender_ref: receiverRef,
        receiver_selected: senderItems.map(item => item.ref),
        sender_selected: receiverItems.map(item => item.ref),
        trade_status: 'incomplete'
      };
      await setDoc(tradeRef, newTrade);
    } else {
      await setDoc(tradeRef, { trade_status: 'complete' }, { merge: true })
    }
    navigate('/trades');
  }

  return (
    <div className='background'>
      {senderItems && <EditTradeModal id='request-modal' isSelectedByRef={senderItems}
        userId={senderId} username={theirName} onEdit={setSenderItems} />}
      {receiverItems && <EditTradeModal id='offer-modal' isSelectedByRef={receiverItems}
        userId={receiverId} username={myName} onEdit={setReceiverItems} />}
      <Navbar title={'Trading'} backArrow={true} />
      <div className='items-card' id='requested-cards'>
        <div className='trading-inventory' id='requested-inventory'>
          {determineUserItems('requested')}
        </div>
        <h1>Requested Items</h1>
      </div>

      <div className='trading-middle'>
        {type === 'incoming' && <button id='offer-button' onClick={handleEditOffer}>Edit Offer</button>}
        <img id='trading-arrows' src={tradesIcon} alt='' />
        {type === 'incoming' && <button id='request-button' onClick={handleEditRequest}>Edit Request</button>}
      </div>

      <div className='items-card' id='offered-cards'>
        <h1>Offered Items</h1>
        <div className='trading-inventory' id='offered-inventory'>
          {determineUserItems('offered')}
        </div>
      </div>
      <div className='trading-footer-buttons'>
        <button id='trading-delete' onClick={handleDeleteTrade}>Delete Trade</button>
        <button id='trading-confirm' onClick={handleConfirmTrade}>{isTradeChanged() ? 'Update Trade' : 'Complete Trade'}</button>
      </div>
    </div>
  )
};

export default Trading;