import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { placeholderImage } from '../img';
import { Navbar, InventoryItem, EditTradeModal } from '../components';
import { tradesIcon } from '../img';
import { useEffect, useState } from 'react';

const Trading = () => {

  const [receiverItems, setReceiverItems] = useState();
  const [senderItems, setSenderItems] = useState();

  useEffect(() => {
    const getItems = async (ids, setter) => {
      const itemRefs = ids.map(id => doc(firestore, 'items', id));
      const itemPromises = itemRefs.map(ref => getDoc(ref));
      const itemDocs = await Promise.all(itemPromises);
      setter(itemDocs);
    }
    const receiverItemIds = ['YTcryS0p2XEVbav5qPxR'];
    const senderItemIds = ['7cHQr2HPsW0WsadHQ0U4'];
    getItems(receiverItemIds, setReceiverItems);
    getItems(senderItemIds, setSenderItems);
  }, []);

  // Button handlers
  const handleEditOffer = () => {
    document.getElementById('sender-modal').showModal();
  };

  const handleEditRequest = () => {
    document.getElementById('receiver-modal').showModal();
  }

  return (
    <div className='background'>
      <EditTradeModal id='sender-modal' isSelectedById={senderItems}
        userRef username={'Jesse McKenzie'} onEdit={setSenderItems} />
      <EditTradeModal id='receiver-modal' isSelectedById={receiverItems}
        userRef username={'Jane Doe'} onEdit={setReceiverItems} />
      <Navbar title={'Trading'} backArrow={true} />
      <div className='items-card' id='requested-cards'>
        <div className='trading-inventory' id='requested-inventory'>
          {receiverItems && receiverItems.map((doc, i) =>
            <InventoryItem key={i}
              thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
            />)}
        </div>
        <h1>Requested Items</h1>
      </div>

      <div className='trading-middle'>
        <button id='offer-button' onClick={handleEditOffer}>Edit Offer</button>
        <img id='trading-arrows' src={tradesIcon} alt='' />
        <button id='request-button' onClick={handleEditRequest}>Edit Request</button>
      </div>

      <div className='items-card' id='offered-cards'>
        <h1>Offered Items</h1>
        <div className='trading-inventory' id='offered-inventory'>
          {senderItems && senderItems.map((doc, i) =>
            <InventoryItem key={i}
              thumbnail={doc.data().picture_URL ? doc.data().picture_URL : placeholderImage}
            />)}
        </div>
      </div>
      <div className='trading-footer-buttons'>
        <button id='trading-cancel'>Cancel</button>
        <button id='trading-confirm'>Confirm</button>
      </div>
    </div>
  )
};

export default Trading;