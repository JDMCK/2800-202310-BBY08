import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, or, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { placeholderImage } from '../img';
import { Navbar, InventoryItem, EditTradeModal, Confirmation } from '../components';
import { tradesIcon, chatIcon } from '../img';
import { useEffect, useRef, useState } from 'react';

const Trading = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const myName = location.state.myName;
  const theirName = location.state.theirName;
  const tradeId = location.state.tradeId;
  const tradeData = JSON.parse(location.state.tradeData);
  const initialOffer = location.state.initialOffer;

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
      if (ids.length === 0) {
        setter([]);
        return;
      };
      const itemRefs = ids.map(id => doc(firestore, 'items', id));
      const itemPromises = itemRefs.map(ref => getDoc(ref));
      const itemDocs = await Promise.all(itemPromises);
      if (!initialOffer) ref.current = itemDocs;
      setter(itemDocs.filter(itemDoc => tradeData.trade_status === 'complete' || itemDoc.data().isTraded === false));
    }
    getItems(receiverSelectedIds, setReceiverItems, initialReceiverItems);
    getItems(senderSelectedIds, setSenderItems, initialSenderItems);
    // eslint-disable-next-line
  }, []);

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

  const handleRevokeTrade = async () => {
    const tradeRef = doc(firestore, 'trades', tradeId);

    const confirmedItems = receiverItems.concat(senderItems);
    await confirmedItems.forEach(async item => await setDoc(item.ref, { isTraded: false }, { merge: true }));
    await deleteDoc(tradeRef);

    handleChat('Trade Revoked');

    navigate('/trades');
  }

  const isTradeChanged = () => {
    return !(JSON.stringify(initialReceiverItems.current) === JSON.stringify(receiverItems) &&
      JSON.stringify(initialSenderItems.current) === JSON.stringify(senderItems))
  }

  const handleConfirmTrade = async () => {

    const tradeRef = initialOffer ? '' : doc(firestore, 'trades', tradeId);

    if (senderItems.length === 0 && receiverItems.length === 0) {
      document.getElementById('no-items-modal').showModal();
      return;
    }

    if (isTradeChanged()) {
      const newTrade = {
        receiver_ref: senderRef,
        sender_ref: receiverRef,
        receiver_selected: senderItems.map(item => item.ref),
        sender_selected: receiverItems.map(item => item.ref),
        trade_status: 'incomplete'
      };
      if (initialOffer) {
        const tradeCollection = collection(firestore, 'trades');
        await addDoc(tradeCollection, newTrade);
      } else {
        await setDoc(tradeRef, newTrade);
      }
    } else {
      await setDoc(tradeRef, { trade_status: 'complete' }, { merge: true });

      await handleChat('Trade Confirmed');

      const confirmedItems = receiverItems.concat(senderItems);
      await confirmedItems.forEach(async item => await setDoc(item.ref, { isTraded: true }, { merge: true }));
    }
    navigate('/trades');
  }

  const handleChat = async (systemMessage) => {
    const conversationsRef = collection(firestore, 'conversations');
    const conversationQuery = query(conversationsRef, or(
      and(where('user_1', '==', receiverRef), where('user_2', '==', senderRef)),
      and(where('user_1', '==', senderRef), where('user_2', '==', receiverRef))
    ))
    const conversationDoc = await getDocs(conversationQuery);
    if (conversationDoc.size !== 0) {
      if (systemMessage) {
        const messagesRef = collection(firestore, 'conversations', conversationDoc.docs[0].id, 'messages');
        await addDoc(messagesRef, { created_at: new Date(), message: systemMessage, system_message: true });
      } else {
        navigate('/chat', { state: { conversationId: conversationDoc.docs[0].id, toName: theirName, fromName: myName } })
      }
    } else {
      if (type === 'sent') {
        const conversationRef = await addDoc(conversationsRef, { user_1: senderRef, user_2: receiverRef });
        if (systemMessage) {
          const messagesRef = collection(firestore, 'conversations', conversationRef.id, 'messages');
          await addDoc(messagesRef, { created_at: new Date(), message: systemMessage, system_message: true });
        } else {
          navigate('/chat', { state: { conversationId: conversationRef.id, toName: theirName, fromName: myName } })
        }
      } else {
        const conversationRef = await addDoc(conversationsRef, { user_1: receiverRef, user_2: senderRef });
        if (systemMessage) {
          const messagesRef = collection(firestore, 'conversations', conversationRef.id, 'messages');
          await addDoc(messagesRef, { created_at: new Date(), message: systemMessage, system_message: true });
        } else {
          navigate('/chat', { state: { conversationId: conversationRef.id, toName: theirName, fromName: myName } })
        }
      }
    }
  }

  return (
    <div className='background'>
      {senderItems && <EditTradeModal id='request-modal' isSelectedByRef={senderItems}
        userId={senderId} username={theirName} onEdit={setSenderItems} />}
      {receiverItems && <EditTradeModal id='offer-modal' isSelectedByRef={receiverItems}
        userId={receiverId} username={myName} onEdit={setReceiverItems} />}
      <Confirmation onConfirm={() => document.getElementById('no-items-modal').close()}
        id='no-items-modal' title='No Items Selected' buttonMessage='Back' />
      <Navbar title={'Trading'} backArrow={true} navButtons={!initialOffer &&
        [{
          icon: chatIcon,
          onclick: () => handleChat()
        }]
      } />
      <div className='items-card' id='requested-cards'>
        <div className='trading-inventory' id='requested-inventory'>
          {determineUserItems('requested')}
        </div>
        <h1>Requested Items</h1>
      </div>

      <div className='trading-middle'>
        {type === 'incoming' && tradeData.trade_status !== 'complete' &&
          <button id='offer-button' onClick={handleEditOffer}>Edit Offer</button>}
        <img id='trading-arrows' src={tradesIcon} alt='' />
        {type === 'incoming' && tradeData.trade_status !== 'complete' &&
          <button id='request-button' onClick={handleEditRequest}>Edit Request</button>}
      </div>

      <div className='items-card' id='offered-cards'>
        <h1>Offered Items</h1>
        <div className='trading-inventory' id='offered-inventory'>
          {determineUserItems('offered')}
        </div>
      </div>
      <div className='trading-footer-buttons'>
        {tradeData.trade_status !== 'complete' && !initialOffer && <button id='trading-delete' onClick={handleDeleteTrade}>Delete Trade</button>}
        {type === 'incoming' && tradeData.trade_status !== 'complete' && <button id='trading-confirm'
          onClick={handleConfirmTrade}>{isTradeChanged() ?
            (initialOffer ? 'Send Offer' : 'Update Trade') : 'Complete Trade'}</button>}
        {tradeData.trade_status === 'complete' && <button id='trading-delete' onClick={handleRevokeTrade}>Revoke Trade</button>}
      </div>
    </div>
  )
};

export default Trading;